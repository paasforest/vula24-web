import { NextResponse } from "next/server";

function apiBase(): string {
  const explicit = process.env.LOCKSMITH_REGISTER_URL?.trim();
  if (explicit) {
    return explicit
      .replace(/\/api\/auth\/locksmith\/register\/?$/i, "")
      .replace(/\/$/, "");
  }
  return (
    process.env.NEXT_PUBLIC_VULA24_API_URL?.trim() ||
    "https://vula24-api-production.up.railway.app"
  ).replace(/\/$/, "");
}

/**
 * Proxies locksmith registration to the Railway API (optional fallback).
 */
export async function POST(request: Request) {
  const upstreamUrl = `${apiBase()}/api/auth/locksmith/register`;

  try {
    const body = await request.text();
    const upstream = await fetch(upstreamUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
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
    console.error("[POST /api/locksmith-register]", e);
    return NextResponse.json(
      { error: "Could not reach registration service." },
      { status: 502 }
    );
  }
}
