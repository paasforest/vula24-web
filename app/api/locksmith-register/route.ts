import { NextResponse } from "next/server";

const DEFAULT_UPSTREAM =
  "https://vula24-production.up.railway.app/api/auth/locksmith/register";

/**
 * Proxies locksmith registration to the Railway API (avoids browser CORS issues).
 */
export async function POST(request: Request) {
  const upstreamUrl =
    process.env.LOCKSMITH_REGISTER_URL?.trim() || DEFAULT_UPSTREAM;

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
