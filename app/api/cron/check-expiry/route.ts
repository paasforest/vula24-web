import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET?.trim()
  const auth = request.headers.get('authorization')
  const bearer =
    auth?.startsWith('Bearer ') ? auth.slice(7).trim() : ''
  const xCron = request.headers.get('x-cron-secret')?.trim() ?? ''
  const ok =
    cronSecret &&
    (cronSecret === bearer || cronSecret === xCron)
  if (!ok) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const apiUrl = process.env.NEXT_PUBLIC_VULA24_API_URL?.trim().replace(/\/$/, '')
  if (!apiUrl) {
    return NextResponse.json(
      { error: 'Missing NEXT_PUBLIC_VULA24_API_URL' },
      { status: 500 }
    )
  }

  const res = await fetch(`${apiUrl}/api/cron/check-expiry`, {
    headers: {
      'x-cron-secret': process.env.CRON_SECRET ?? '',
    },
  })
  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>
  return NextResponse.json(data, { status: res.status })
}
