import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const apiUrl = process.env
      .NEXT_PUBLIC_VULA24_API_URL?.trim()

    if (apiUrl) {
      await fetch(
        `${apiUrl}/api/sms/incoming`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        }
      )
    }
  } catch (e) {
    console.error('SMS webhook error:', e)
  }

  return NextResponse.json(
    { ok: true },
    { status: 200 }
  )
}
