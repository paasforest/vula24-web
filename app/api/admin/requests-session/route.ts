import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}

/** Customer requests for logged-in admin UI (cookie session). */
export async function GET() {
  const c = await cookies()
  if (c.get('vula24_admin_session')?.value !== '1') {
    return unauthorized()
  }

  try {
    const requests = await prisma.customerRequest.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ ok: true, requests })
  } catch (e) {
    console.error('[GET /api/admin/requests-session]', e)
    return NextResponse.json(
      { error: 'Could not load requests.' },
      { status: 500 }
    )
  }
}
