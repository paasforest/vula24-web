import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { password } = await req.json().catch(() => ({}))
  const admin = process.env.ADMIN_PASSWORD
  if (!admin || typeof password !== 'string' || password !== admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const cookieStore = await cookies()
  cookieStore.set('vula24_admin_session', '1', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8,
  })
  return NextResponse.json({ ok: true })
}

export async function DELETE() {
  const cookieStore = await cookies()
  cookieStore.delete('vula24_admin_session')
  return NextResponse.json({ ok: true })
}
