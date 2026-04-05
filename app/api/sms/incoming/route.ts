import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    let body: unknown = {}
    try {
      body = await request.json()
    } catch {
      body = {}
    }
    const apiUrl = process.env.NEXT_PUBLIC_VULA24_API_URL?.trim().replace(/\/$/, '')
    if (apiUrl) {
      await fetch(`${apiUrl}/api/sms/incoming`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
    }
  } catch (e) {
    console.error('SMS webhook error:', e)
  }
  return NextResponse.json({ ok: true }, { status: 200 })
}
