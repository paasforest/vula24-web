'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Toaster, toast } from 'sonner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { GoldButton } from '@/components/GoldButton'
import { cn } from '@/lib/utils'

/** Display only — data uses `/api/admin/railway/*` (Bearer token on server). */
function apiBase(): string | null {
  const b = process.env.NEXT_PUBLIC_VULA24_API_URL?.trim()
  return b ? b.replace(/\/$/, '') : null
}

const RW = (path: string) => `/api/admin/railway/${path}`

type PendingApp = {
  id: number
  name?: string
  phone?: string
  email?: string
  province?: string
  city?: string
  tier?: string
  created_at?: string
  status?: string
  services?: string[]
  coverage_areas?: string[]
  base_address?: string
  account_type?: string
}

type PaymentRow = {
  id: number
  name?: string
  phone?: string
  customer_code?: string
  tier?: string
  proof_of_payment?: string
  status?: string
  approved_at?: string
}

type ActiveRow = {
  id: number
  name?: string
  phone?: string
  customer_code?: string
  tier?: string
  province?: string
  coverage_areas?: string[]
  services?: string[]
  activation_date?: string
  expiry_date?: string
  days_remaining?: number
  status?: string
}

type CustomerRequestRow = {
  id: string
  phone: string
  location: string
  service: string
  urgency: string
  status: string
  createdAt: string
  name: string | null
  city: string | null
  suburb: string | null
}

function asArray<T extends Record<string, unknown>>(raw: unknown): T[] {
  if (Array.isArray(raw)) return raw as T[]
  if (raw && typeof raw === 'object') {
    const o = raw as Record<string, unknown>
    for (const k of ['pending', 'items', 'data', 'locksmiths', 'payments', 'active']) {
      if (Array.isArray(o[k])) return o[k] as T[]
    }
  }
  return []
}

function formatDate(iso?: string) {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return new Intl.DateTimeFormat('en-ZA', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(d)
}

function TableSkeleton({ cols = 6 }: { cols?: number }) {
  return (
    <div className="space-y-2 animate-pulse" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex gap-2">
          {Array.from({ length: cols }).map((_, j) => (
            <div
              key={j}
              className="h-10 flex-1 rounded-md bg-muted min-w-[80px]"
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default function AdminPage() {
  const router = useRouter()
  const base = apiBase()

  const [pending, setPending] = useState<PendingApp[]>([])
  const [payments, setPayments] = useState<PaymentRow[]>([])
  const [active, setActive] = useState<ActiveRow[]>([])
  const [requests, setRequests] = useState<CustomerRequestRow[]>([])
  const [requestsWarning, setRequestsWarning] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [actionKey, setActionKey] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const loadRailway = useCallback(async () => {
    const [rp, rpay, ra] = await Promise.all([
      fetch(RW('pending')).then((r) => r.json()),
      fetch(RW('payments')).then((r) => r.json()),
      fetch(RW('active')).then((r) => r.json()),
    ])
    setPending(asArray<PendingApp>(rp))
    setPayments(asArray<PaymentRow>(rpay))
    setActive(asArray<ActiveRow>(ra))
  }, [])

  const loadRequests = useCallback(async () => {
    const res = await fetch('/api/admin/requests-session')
    const j = (await res.json().catch(() => ({}))) as {
      requests?: CustomerRequestRow[]
      warning?: string
      error?: string
    }
    if (!res.ok) {
      throw new Error(
        j.error != null
          ? String(j.error)
          : 'Could not load customer requests.'
      )
    }
    const list = j.requests ?? []
    setRequests(list)
    setRequestsWarning(
      typeof j.warning === 'string' && j.warning.length > 0 ? j.warning : null
    )
  }, [])

  const loadAll = useCallback(async () => {
    setLoading(true)
    try {
      await loadRailway()
    } catch {
      toast.error('Failed to load Railway admin data. Check API URL and network.')
    }
    try {
      await loadRequests()
    } catch (e) {
      toast.error(
        e instanceof Error ? e.message : 'Could not load customer requests.'
      )
    }
    setLastUpdated(new Date())
    setLoading(false)
  }, [loadRailway, loadRequests])

  useEffect(() => {
    void loadAll()
  }, [loadAll])

  useEffect(() => {
    const t = setInterval(() => {
      void loadAll()
    }, 60_000)
    return () => clearInterval(t)
  }, [loadAll])

  const logout = async () => {
    await fetch('/api/admin/session', { method: 'DELETE' })
    router.push('/admin/login')
    router.refresh()
  }

  /** Railway API expects Pascal case: "Starter" | "Pro" (not lowercase). */
  const approve = async (id: number, tier: 'Starter' | 'Pro') => {
    setActionKey(`approve-${id}-${tier}`)
    try {
      const res = await fetch(RW(`approve/${id}`), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier, approved_by: 'admin' }),
      })
      const j = (await res.json().catch(() => ({}))) as {
        error?: string
        customer_code?: string
      }
      if (!res.ok) {
        toast.error(j.error ?? 'Approve failed.')
        return
      }
      let msg = 'Approved.'
      if (j.customer_code) {
        msg += ` Code: ${j.customer_code}.`
      }
      msg +=
        ' SMS is sent by the Railway API when SMSPortal/env is configured there.'
      toast.success(msg)
      setPending((prev) => prev.filter((p) => p.id !== id))
    } catch {
      toast.error('Network error.')
    } finally {
      setActionKey(null)
    }
  }

  const activatePayment = async (id: number) => {
    setActionKey(`activate-${id}`)
    try {
      const res = await fetch(RW(`activate/${id}`), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ activated_by: 'admin' }),
      })
      const j = await res.json().catch(() => ({}))
      if (!res.ok) {
        toast.error(
          typeof j === 'object' && j && 'error' in j
            ? String((j as { error: unknown }).error)
            : 'Activate failed.'
        )
        return
      }
      toast.success('Account activated. Confirmation SMS sent.')
      setPayments((prev) => prev.filter((p) => p.id !== id))
    } catch {
      toast.error('Network error.')
    } finally {
      setActionKey(null)
    }
  }

  const rejectPayment = (id: number) => {
    if (!window.confirm('Reject this payment proof?')) return
    void (async () => {
      setActionKey(`reject-${id}`)
      try {
        const res = await fetch(RW(`suspend/${id}`), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reason: 'payment_rejected' }),
        })
        if (!res.ok) {
          toast.error('Reject failed.')
          return
        }
        toast.message('Payment rejected.')
        setPayments((prev) => prev.filter((p) => p.id !== id))
      } catch {
        toast.error('Network error.')
      } finally {
        setActionKey(null)
      }
    })()
  }

  const suspendActive = async (id: number) => {
    setActionKey(`suspend-${id}`)
    try {
      const res = await fetch(RW(`suspend/${id}`), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason: 'admin_suspended' }),
      })
      if (!res.ok) {
        toast.error('Suspend failed.')
        return
      }
      toast.message('Locksmith suspended.')
      setActive((prev) =>
        prev.map((row) =>
          row.id === id ? { ...row, status: 'suspended' } : row
        )
      )
    } catch {
      toast.error('Network error.')
    } finally {
      setActionKey(null)
    }
  }

  const markRequestAssigned = async (id: string) => {
    setActionKey(`req-${id}`)
    try {
      const res = await fetch(`/api/admin/requests-session/${id}`, {
        method: 'PATCH',
      })
      const j = await res.json().catch(() => ({}))
      if (!res.ok) {
        toast.error(
          typeof j === 'object' && j && 'error' in j
            ? String((j as { error: unknown }).error)
            : 'Update failed.'
        )
        return
      }
      toast.success('Request marked assigned.')
      setRequests((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, status: 'assigned' } : r
        )
      )
    } catch {
      toast.error('Network error.')
    } finally {
      setActionKey(null)
    }
  }

  const counts = useMemo(
    () => ({
      pending: pending.length,
      payments: payments.length,
      active: active.length,
    }),
    [pending.length, payments.length, active.length]
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 space-y-6">
      <Toaster richColors position="top-right" />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-heading text-2xl font-bold text-foreground">
          Vula24 admin
        </h1>
        <div className="flex flex-wrap gap-2 items-center">
          {lastUpdated && (
            <span className="text-xs text-muted-foreground">
              Last updated:{' '}
              {lastUpdated.toLocaleString('en-ZA', {
                dateStyle: 'short',
                timeStyle: 'medium',
              })}
            </span>
          )}
          <button
            type="button"
            onClick={() => void loadAll()}
            className="rounded-lg border border-border px-4 py-2 text-sm text-foreground hover:bg-muted"
            disabled={loading}
          >
            Refresh
          </button>
          <button
            type="button"
            onClick={() => void logout()}
            className="rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground hover:bg-muted"
          >
            Sign out
          </button>
        </div>
      </div>
      <p className="text-xs text-muted-foreground font-mono break-all">
        Railway admin (proxied with Bearer): {base ?? '(set NEXT_PUBLIC_VULA24_API_URL on the server)'}
      </p>
      {!base && (
        <p className="text-xs text-amber-600 dark:text-amber-400">
          Without the public API URL, the proxy cannot reach Railway. Set{' '}
          <code className="font-mono">NEXT_PUBLIC_VULA24_API_URL</code> and{' '}
          <code className="font-mono">VULA24_API_ADMIN_TOKEN</code> (or{' '}
          <code className="font-mono">ADMIN_PASSWORD</code>) to match the API.
        </p>
      )}

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="flex flex-wrap h-auto gap-0 border-b border-border bg-transparent p-0 rounded-none w-full justify-start">
          {(
            [
              ['pending', `Pending (${counts.pending})`],
              ['payments', `Payments (${counts.payments})`],
              ['active', `Active (${counts.active})`],
              ['requests', 'Requests'],
            ] as const
          ).map(([value, label]) => (
            <TabsTrigger
              key={value}
              value={value}
              className={cn(
                'rounded-none border-b-2 border-transparent px-4 py-3 text-sm font-medium data-[state=active]:border-gold data-[state=active]:text-gold data-[state=active]:shadow-none bg-transparent'
              )}
            >
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="pending" className="mt-6">
          {loading ? (
            <TableSkeleton cols={8} />
          ) : pending.length === 0 ? (
            <p className="text-muted-foreground text-sm py-8">
              No pending applications.
            </p>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full min-w-[900px] text-sm text-left">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="p-3 font-medium">Name</th>
                    <th className="p-3 font-medium">Phone</th>
                    <th className="p-3 font-medium">Email</th>
                    <th className="p-3 font-medium">Province</th>
                    <th className="p-3 font-medium">Area / City</th>
                    <th className="p-3 font-medium">Applied</th>
                    <th className="p-3 font-medium w-[280px]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pending.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b border-border/80 hover:bg-muted/30"
                    >
                      <td className="p-3 align-top">{row.name ?? '—'}</td>
                      <td className="p-3 align-top whitespace-nowrap">
                        {row.phone ?? '—'}
                      </td>
                      <td className="p-3 align-top break-all max-w-[200px]">
                        {row.email ?? '—'}
                      </td>
                      <td className="p-3 align-top">{row.province ?? '—'}</td>
                      <td className="p-3 align-top">{row.city ?? '—'}</td>
                      <td className="p-3 align-top whitespace-nowrap">
                        {formatDate(row.created_at)}
                      </td>
                      <td className="p-3 align-top">
                        <div className="flex flex-wrap gap-2">
                          <GoldButton
                            type="button"
                            label="Approve Starter — R499"
                            size="sm"
                            disabled={!!actionKey}
                            onClick={() => void approve(row.id, 'Starter')}
                          />
                          <GoldButton
                            type="button"
                            label="Approve Pro — R899"
                            size="sm"
                            variant="outline"
                            disabled={!!actionKey}
                            onClick={() => void approve(row.id, 'Pro')}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </TabsContent>

        <TabsContent value="payments" className="mt-6">
          {loading ? (
            <TableSkeleton cols={7} />
          ) : payments.length === 0 ? (
            <p className="text-muted-foreground text-sm py-8">
              No payments awaiting verification.
            </p>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full min-w-[960px] text-sm text-left">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="p-3 font-medium">Customer code</th>
                    <th className="p-3 font-medium">Name</th>
                    <th className="p-3 font-medium">Phone</th>
                    <th className="p-3 font-medium">Tier</th>
                    <th className="p-3 font-medium">Proof</th>
                    <th className="p-3 font-medium w-[280px]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((row) => {
                    const hasProof = !!row.proof_of_payment?.trim()
                    return (
                      <tr
                        key={row.id}
                        className="border-b border-border/80 hover:bg-muted/30"
                      >
                        <td className="p-3 align-top font-semibold text-gold">
                          {row.customer_code ?? '—'}
                        </td>
                        <td className="p-3 align-top">{row.name ?? '—'}</td>
                        <td className="p-3 align-top whitespace-nowrap">
                          {row.phone ?? '—'}
                        </td>
                        <td className="p-3 align-top">
                          <TierBadge tier={row.tier} />
                        </td>
                        <td className="p-3 align-top">
                          {hasProof ? (
                            <span className="text-success text-xs">Uploaded</span>
                          ) : (
                            <span className="text-muted-foreground text-xs">—</span>
                          )}
                        </td>
                        <td className="p-3 align-top">
                          <div className="flex flex-wrap gap-2">
                            {hasProof && (
                              <a
                                href={row.proof_of_payment}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center rounded-lg border border-border px-3 py-1.5 text-xs hover:bg-muted"
                              >
                                View Proof
                              </a>
                            )}
                            <GoldButton
                              type="button"
                              label="Activate Account"
                              size="sm"
                              disabled={!!actionKey}
                              onClick={() => void activatePayment(row.id)}
                            />
                            <GoldButton
                              type="button"
                              label="Reject Payment"
                              size="sm"
                              variant="outline"
                              className="!border-destructive/60 !text-destructive hover:!bg-destructive/10"
                              disabled={!!actionKey}
                              onClick={() => void rejectPayment(row.id)}
                            />
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </TabsContent>

        <TabsContent value="active" className="mt-6">
          {loading ? (
            <TableSkeleton cols={9} />
          ) : (
            <>
              <p className="text-sm text-foreground mb-4">
                <span className="font-semibold">{active.length}</span> active
                locksmiths
              </p>
              {active.length === 0 ? (
                <p className="text-muted-foreground text-sm py-8">
                  No active locksmiths.
                </p>
              ) : (
                <div className="overflow-x-auto rounded-lg border border-border">
                  <table className="w-full min-w-[1100px] text-sm text-left">
                    <thead className="bg-muted/50 border-b border-border">
                      <tr>
                        <th className="p-3 font-medium">Code</th>
                        <th className="p-3 font-medium">Name</th>
                        <th className="p-3 font-medium">Phone</th>
                        <th className="p-3 font-medium">Tier</th>
                        <th className="p-3 font-medium">Province</th>
                        <th className="p-3 font-medium">Coverage</th>
                        <th className="p-3 font-medium">Expires</th>
                        <th className="p-3 font-medium">Days left</th>
                        <th className="p-3 font-medium w-[220px]">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {active.map((row) => (
                        <tr
                          key={row.id}
                          className="border-b border-border/80 hover:bg-muted/30"
                        >
                          <td className="p-3 align-top font-medium text-gold whitespace-nowrap">
                            {row.customer_code ?? '—'}
                          </td>
                          <td className="p-3 align-top">{row.name ?? '—'}</td>
                          <td className="p-3 align-top whitespace-nowrap">
                            {row.phone ?? '—'}
                          </td>
                          <td className="p-3 align-top">
                            <TierBadge tier={row.tier} />
                          </td>
                          <td className="p-3 align-top">{row.province ?? '—'}</td>
                          <td className="p-3 align-top max-w-[240px]">
                            <CoveragePills areas={row.coverage_areas} />
                          </td>
                          <td className="p-3 align-top whitespace-nowrap">
                            {formatDate(row.expiry_date)}
                          </td>
                          <td className="p-3 align-top">
                            <DaysBadge days={row.days_remaining} />
                          </td>
                          <td className="p-3 align-top">
                            <div className="flex flex-wrap gap-2">
                              <GoldButton
                                type="button"
                                label="Suspend"
                                size="sm"
                                variant="outline"
                                disabled={!!actionKey}
                                onClick={() => void suspendActive(row.id)}
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  toast.message(
                                    'Reminder feature coming soon.'
                                  )
                                }
                                className="rounded-lg border border-border px-3 py-1.5 text-xs hover:bg-muted"
                              >
                                Send Reminder
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </TabsContent>

        <TabsContent value="requests" className="mt-6">
          {requestsWarning && (
            <div className="mb-4 rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-foreground leading-relaxed">
              {requestsWarning}
            </div>
          )}
          {loading ? (
            <TableSkeleton cols={8} />
          ) : requests.length === 0 ? (
            <p className="text-muted-foreground text-sm py-8">
              {requestsWarning
                ? 'No rows loaded in this tab. (Leads from the homepage are saved on Railway.)'
                : 'No customer requests in this database yet.'}
            </p>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full min-w-[960px] text-sm text-left">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="p-3 font-medium">Name</th>
                    <th className="p-3 font-medium">Phone</th>
                    <th className="p-3 font-medium">City</th>
                    <th className="p-3 font-medium">Service</th>
                    <th className="p-3 font-medium">Urgency</th>
                    <th className="p-3 font-medium">Status</th>
                    <th className="p-3 font-medium">Created</th>
                    <th className="p-3 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((r) => (
                    <tr
                      key={r.id}
                      className="border-b border-border/80 hover:bg-muted/30"
                    >
                      <td className="p-3 align-top">{r.name ?? '—'}</td>
                      <td className="p-3 align-top whitespace-nowrap">
                        {r.phone}
                      </td>
                      <td className="p-3 align-top">
                        {r.city ?? r.suburb ?? r.location}
                      </td>
                      <td className="p-3 align-top">{r.service}</td>
                      <td className="p-3 align-top">{r.urgency}</td>
                      <td className="p-3 align-top">{r.status}</td>
                      <td className="p-3 align-top whitespace-nowrap">
                        {formatDate(r.createdAt)}
                      </td>
                      <td className="p-3 align-top">
                        {r.status === 'assigned' ? (
                          <span className="text-xs text-muted-foreground">
                            Assigned
                          </span>
                        ) : (
                          <GoldButton
                            type="button"
                            label="Mark assigned"
                            size="sm"
                            disabled={!!actionKey}
                            onClick={() => void markRequestAssigned(r.id)}
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function TierBadge({ tier }: { tier?: string }) {
  if (!tier) return <span className="text-muted-foreground">—</span>
  return (
    <span className="inline-flex rounded-full border border-border px-2 py-0.5 text-xs capitalize">
      {tier}
    </span>
  )
}

function CoveragePills({ areas }: { areas?: string[] }) {
  const list = areas ?? []
  const shown = list.slice(0, 3)
  const more = list.length - shown.length
  return (
    <div className="flex flex-wrap gap-1">
      {shown.map((a) => (
        <span
          key={a}
          className="inline-flex rounded-full bg-muted px-2 py-0.5 text-xs"
        >
          {a}
        </span>
      ))}
      {more > 0 && (
        <span className="text-xs text-muted-foreground">+{more} more</span>
      )}
    </div>
  )
}

function DaysBadge({ days }: { days?: number }) {
  if (days == null || Number.isNaN(days)) {
    return <span className="text-muted-foreground">—</span>
  }
  let cls =
    'bg-success/20 text-success border-success/30'
  if (days < 3) cls = 'bg-destructive/20 text-destructive border-destructive/40'
  else if (days < 7)
    cls = 'bg-amber-500/15 text-amber-600 border-amber-500/40 dark:text-amber-400'

  return (
    <span
      className={cn(
        'inline-flex rounded-full border px-2 py-0.5 text-xs font-medium',
        cls
      )}
    >
      {days} days
    </span>
  )
}
