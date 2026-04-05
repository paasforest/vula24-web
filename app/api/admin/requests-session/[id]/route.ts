import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

type Ctx = { params: Promise<{ id: string }> }

function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}

/** Mark customer request assigned (admin session cookie). */
export async function PATCH(_request: Request, context: Ctx) {
  const c = await cookies()
  if (c.get('vula24_admin_session')?.value !== '1') {
    return unauthorized()
  }

  const { id } = await context.params
  if (!id) {
    return NextResponse.json({ error: 'Missing id.' }, { status: 400 })
  }

  try {
    const existing = await prisma.customerRequest.findUnique({
      where: { id },
    })
    if (!existing) {
      return NextResponse.json({ error: 'Not found.' }, { status: 404 })
    }

    const updated = await prisma.customerRequest.update({
      where: { id },
      data: { status: 'assigned' },
    })

    return NextResponse.json({ ok: true, request: updated })
  } catch (e) {
    console.error('[PATCH /api/admin/requests-session/[id]]', e)
    return NextResponse.json(
      { error: 'Could not update request.' },
      { status: 500 }
    )
  }
}
