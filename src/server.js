"use strict";

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");

// ---------------------------------------------------------------------------
// Database
// ---------------------------------------------------------------------------

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

/**
 * Create tables if they don't already exist.
 * Runs once at startup so the service is self-bootstrapping.
 */
async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS customer_leads (
      id          BIGSERIAL PRIMARY KEY,
      name        TEXT,
      phone       TEXT        NOT NULL,
      city        TEXT        NOT NULL,
      service_type TEXT       NOT NULL,
      urgency     TEXT        NOT NULL,
      notes       TEXT,
      status      TEXT        NOT NULL DEFAULT 'pending',
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS locksmiths (
      id            BIGSERIAL PRIMARY KEY,
      name          TEXT        NOT NULL,
      phone         TEXT        NOT NULL,
      email         TEXT        NOT NULL UNIQUE,
      password_hash TEXT        NOT NULL,
      account_type  TEXT        NOT NULL DEFAULT 'individual',
      business_name TEXT,
      status        TEXT        NOT NULL DEFAULT 'pending',
      created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  console.log("[db] Tables ready.");
}

// ---------------------------------------------------------------------------
// Validation helpers
// ---------------------------------------------------------------------------

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function normalizePhone(value) {
  return value.trim();
}

function isValidPhone(value) {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 9 && digits.length <= 15;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function isValidEmail(value) {
  return EMAIL_RE.test(value.trim());
}

const URGENCY_VALUES = new Set(["ASAP", "30 min", "Flexible"]);
function isValidUrgency(value) {
  return URGENCY_VALUES.has(value.trim());
}

// ---------------------------------------------------------------------------
// Express app
// ---------------------------------------------------------------------------

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// ---------------------------------------------------------------------------
// Health check
// ---------------------------------------------------------------------------

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "vula24-api", version: "1.0.0" });
});

// ---------------------------------------------------------------------------
// POST /api/jobs/website/request
// Accepts a customer lead (name, phone, city, serviceType, urgency, notes)
// and stores it in the customer_leads table.
// ---------------------------------------------------------------------------

app.post("/api/jobs/website/request", async (req, res) => {
  try {
    const body = req.body || {};

    const name = isNonEmptyString(body.name) ? body.name.trim() : "";
    const phone = isNonEmptyString(body.phone)
      ? normalizePhone(body.phone)
      : "";
    const city = isNonEmptyString(body.city) ? body.city.trim() : "";
    const serviceType = isNonEmptyString(body.serviceType)
      ? body.serviceType.trim()
      : "";
    const urgencyRaw = isNonEmptyString(body.urgency)
      ? body.urgency.trim()
      : "";
    const notes = isNonEmptyString(body.notes) ? body.notes.trim() : null;

    // Validation
    if (!isValidPhone(phone)) {
      return res
        .status(400)
        .json({ error: "Please enter a valid phone number." });
    }
    if (!city) {
      return res.status(400).json({ error: "City is required." });
    }
    if (!serviceType) {
      return res.status(400).json({ error: "Service type is required." });
    }
    if (!isValidUrgency(urgencyRaw)) {
      return res
        .status(400)
        .json({ error: "Urgency must be ASAP, 30 min, or Flexible." });
    }

    const result = await pool.query(
      `INSERT INTO customer_leads (name, phone, city, service_type, urgency, notes)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id`,
      [name || null, phone, city, serviceType, urgencyRaw, notes]
    );

    const id = result.rows[0].id;
    console.log(`[POST /api/jobs/website/request] Created lead id=${id}`);
    return res.status(201).json({ ok: true, id });
  } catch (err) {
    console.error("[POST /api/jobs/website/request]", err);
    return res
      .status(500)
      .json({ error: "Could not save your request. Please try again." });
  }
});

// ---------------------------------------------------------------------------
// POST /api/auth/locksmith/register
// Accepts locksmith registration (name, phone, email, password, accountType,
// businessName) and stores in the locksmiths table with a hashed password.
// ---------------------------------------------------------------------------

app.post("/api/auth/locksmith/register", async (req, res) => {
  try {
    const body = req.body || {};

    const name = isNonEmptyString(body.name) ? body.name.trim() : "";
    const phone = isNonEmptyString(body.phone)
      ? normalizePhone(body.phone)
      : "";
    const email = isNonEmptyString(body.email) ? body.email.trim() : "";
    const password = isNonEmptyString(body.password) ? body.password : "";
    const accountType = isNonEmptyString(body.accountType)
      ? body.accountType.trim()
      : "individual";
    const businessName = isNonEmptyString(body.businessName)
      ? body.businessName.trim()
      : null;

    // Validation
    if (!name) {
      return res.status(400).json({ error: "Name is required." });
    }
    if (!isValidPhone(phone)) {
      return res
        .status(400)
        .json({ error: "Please enter a valid phone number." });
    }
    if (!email || !isValidEmail(email)) {
      return res
        .status(400)
        .json({ error: "Please enter a valid email address." });
    }
    if (!password || password.length < 8) {
      return res
        .status(400)
        .json({ error: "Password must be at least 8 characters." });
    }

    // Hash password with bcrypt (cost factor 12)
    const passwordHash = await bcrypt.hash(password, 12);

    const result = await pool.query(
      `INSERT INTO locksmiths (name, phone, email, password_hash, account_type, business_name)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id`,
      [name, phone, email, passwordHash, accountType, businessName]
    );

    const id = result.rows[0].id;
    console.log(
      `[POST /api/auth/locksmith/register] Registered locksmith id=${id}`
    );
    return res.status(201).json({ ok: true, id });
  } catch (err) {
    // Unique constraint on email
    if (err.code === "23505") {
      return res
        .status(409)
        .json({ error: "An account with this email already exists." });
    }
    console.error("[POST /api/auth/locksmith/register]", err);
    return res.status(500).json({
      error: "Could not complete registration. Please try again.",
    });
  }
});

// ---------------------------------------------------------------------------
// 404 catch-all
// ---------------------------------------------------------------------------

app.use((_req, res) => {
  res.status(404).json({ error: "Not found." });
});

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------

const PORT = parseInt(process.env.PORT || "3000", 10);

initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`[server] vula24-api listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("[db] Failed to initialise database:", err);
    process.exit(1);
  });
