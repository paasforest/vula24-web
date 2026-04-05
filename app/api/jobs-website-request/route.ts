import { NextResponse } from "next/server";

function apiBase(): string {
  const explicit = process.env.JOBS_WEBSITE_REQUEST_URL?.trim();
  if (explicit) {
    return explicit
      .replace(/\/api\/jobs\/website\/request\/?$/i, "")
      .replace(/\/$/, "");
  }
  return (
    process.env.NEXT_PUBLIC_VULA24_API_URL?.trim() ||
    "https://vula24-api-production.up.railway.app"
  ).replace(/\/$/, "");
}

/** Proxies customer lead requests to Railway (optional fallback if client uses Next route). */
export async function POST(request: Request) {
  const upstreamUrl = `${apiBase()}/api/jobs/website/request`;

  try {
    const bodyText = await request.text();
    let forwardBody = bodyText;
    try {
      const parsed = JSON.parse(bodyText) as Record<string, unknown>;
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        if (typeof parsed.address === "string") {
          const t = parsed.address.trim();
          if (t) parsed.address = t;
          else delete parsed.address;
        }
        forwardBody = JSON.stringify(parsed);
      }
    } catch {
      // forward raw body if not JSON
    }
    const upstream = await fetch(upstreamUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: forwardBody,
    });

    const text = await upstream.text();
    let json: unknown;
    try {
      json = JSON.parse(text);
    } catch {
      json = { raw: text };
    }

    return NextResponse.json(json, { status: upstream.status });
  } catch (e) {
    console.error("[POST /api/jobs-website-request]", e);
    return NextResponse.json(
      { error: "Could not reach lead service." },
      { status: 502 }
    );
  }
}
