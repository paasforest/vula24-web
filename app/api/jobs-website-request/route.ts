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
    console.error("[POST /api/jobs-website-request]", e);
    return NextResponse.json(
      { error: "Could not reach lead service." },
      { status: 502 }
    );
  }
}
