import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const SESSION_COOKIE = 'vula24_admin_session'

function railwayBase(): string | null {
  const b = process.env.NEXT_PUBLIC_VULA24_API_URL?.trim()
  return b ? b.replace(/\/$/, '') : null
}

function bearerToken(): string | null {
  const t =
    process.env.VULA24_API_ADMIN_TOKEN?.trim() ||
    process.env.ADMIN_PASSWORD?.trim()
  return t || null
}

async function forward(
  request: Request,
  pathSegments: string[],
  method: 'GET' | 'POST'
) {
  const cookieStore = await cookies()
  if (cookieStore.get(SESSION_COOKIE)?.value !== '1') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const token = bearerToken()
  if (!token) {
    return NextResponse.json(
      {
        error:
          'Server missing VULA24_API_ADMIN_TOKEN or ADMIN_PASSWORD for Railway admin API.',
      },
      { status: 500 }
    )
  }

  const base = railwayBase()
  if (!base) {
    return NextResponse.json(
      { error: 'Missing NEXT_PUBLIC_VULA24_API_URL' },
      { status: 500 }
    )
  }

  const suffix = pathSegments.join('/')
  const url = `${base}/api/admin/${suffix}`

  const headers = new Headers()
  headers.set('Authorization', `Bearer ${token}`)

  let body: ArrayBuffer | undefined
  if (method === 'POST') {
    const ct = request.headers.get('content-type')
    if (ct) headers.set('Content-Type', ct)
    body = await request.arrayBuffer()
  }

  const upstream = await fetch(url, { method, headers, body })

  const text = await upstream.text()
  let data: unknown
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = { raw: text }
  }

  return NextResponse.json(data, { status: upstream.status })
}

type RouteCtx = { params: Promise<{ path: string[] }> }

export async function GET(request: Request, context: RouteCtx) {
  const { path } = await context.params
  if (!path?.length) {
    return NextResponse.json({ error: 'Missing path' }, { status: 400 })
  }
  return forward(request, path, 'GET')
}

export async function POST(request: Request, context: RouteCtx) {
  const { path } = await context.params
  if (!path?.length) {
    return NextResponse.json({ error: 'Missing path' }, { status: 400 })
  }
  return forward(request, path, 'POST')
}
