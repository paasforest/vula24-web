import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}

/**
 * Customer requests stored in **this app's** Postgres (Prisma).
 * The public homepage form posts leads to **Railway** by default, so this table
 * is often empty unless you dual-write or point the form at `/api/requests`.
 */
export async function GET() {
  const c = await cookies()
  if (c.get('vula24_admin_session')?.value !== '1') {
    return unauthorized()
  }

  if (!process.env.DATABASE_URL?.trim()) {
    return NextResponse.json({
      ok: true,
      requests: [],
      warning:
        'DATABASE_URL is not set on Vercel — customer rows cannot be loaded here. Website leads are stored on Railway; configure the DB or add a Railway list endpoint to show them in this tab.',
    })
  }

  try {
    const requests = await prisma.customerRequest.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ ok: true, requests })
  } catch (e) {
    console.error('[GET /api/admin/requests-session]', e)
    return NextResponse.json({
      ok: true,
      requests: [],
      warning:
        'Could not read customer requests from the database (check DATABASE_URL, network, and Prisma migrations).',
    })
  }
}
