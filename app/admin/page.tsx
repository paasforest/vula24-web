'use client'

import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useRouter } from 'next/navigation'
import { Toaster, toast } from 'sonner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { GoldButton } from '@/components/GoldButton'
import { cn } from '@/lib/utils'
import { getServiceLabel } from '@/lib/api-services'
import {
  FIRST_PLATFORM_BILLING_MONTH,
  LAUNCH_FREE_PLATFORM,
} from '@/lib/constants'

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

type JobRow = {
  id: number
  job_code: string
  service: string
  urgency: string
  suburb: string
  province?: string
  status: string
  notified_count?: number
  claimed_by?: string | null
  created_at?: string
}

type ProviderRow = {
  id: number
  name?: string
  phone?: string
  email?: string
  customer_code?: string
  tier?: string
  status?: string
  province?: string
  coverage_areas?: string[]
  services?: unknown
  base_address?: string
  activation_date?: string
  expiry_date?: string
  amount_paid?: number | string | null
  payment_date?: string
  created_at?: string
  days_remaining?: number | string | null
}

type FinanceSummary = {
  totalRevenue?: number
  thisMonthRevenue?: number
  lastMonthRevenue?: number
  activeCount?: number
  starterCount?: number
  proCount?: number
  pendingCount?: number
  expiredCount?: number
  suspendedCount?: number
  projectedNextMonth?: number
}

type FinancePaymentRow = {
  id: number
  customerCode?: string
  name?: string
  phone?: string
  tier?: string
  amountPaid?: number | null
  paymentDate?: string
  activationDate?: string
  expiryDate?: string
  status?: string
  daysRemaining?: number | null
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

const TIER_EXPECTED_AMOUNT: Record<string, number> = {
  Starter: 499,
  Pro: 899,
  starter: 499,
  pro: 899,
}

function expectedTierAmount(tier?: string): number {
  if (LAUNCH_FREE_PLATFORM) return 0
  if (!tier) return TIER_EXPECTED_AMOUNT.Starter
  const t = String(tier).trim()
  return TIER_EXPECTED_AMOUNT[t] ?? (t.toLowerCase() === 'pro' ? 899 : 499)
}

function parseServicesField(raw: unknown): string[] {
  if (Array.isArray(raw)) return raw.map((x) => String(x))
  if (typeof raw === 'string') {
    try {
      const p = JSON.parse(raw) as unknown
      if (Array.isArray(p)) return p.map((x) => String(x))
    } catch {
      /* ignore */
    }
  }
  return []
}

function csvEscapeCell(v: unknown): string {
  const s = v == null ? '' : String(v)
  if (/[",\n\r]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`
  }
  return s
}

function exportFinanceToCsv(payments: FinancePaymentRow[]) {
  const headers = [
    'Customer Code',
    'Name',
    'Phone',
    'Tier',
    'Amount Paid',
    'Payment Date',
    'Activation Date',
    'Expiry Date',
    'Status',
  ]
  const rows = payments.map((p) => [
    p.customerCode ?? '',
    p.name ?? '',
    p.phone ?? '',
    p.tier ?? '',
    p.amountPaid ?? '',
    p.paymentDate
      ? new Date(p.paymentDate).toLocaleDateString('en-ZA')
      : '',
    p.activationDate
      ? new Date(p.activationDate).toLocaleDateString('en-ZA')
      : '',
    p.expiryDate
      ? new Date(p.expiryDate).toLocaleDateString('en-ZA')
      : '',
    p.status ?? '',
  ])
  const csv = [headers, ...rows]
    .map((r) => r.map(csvEscapeCell).join(','))
    .join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `vula24-finance-${new Date().toISOString().split('T')[0]}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

export default function AdminPage() {
  const router = useRouter()
  const base = apiBase()

  const [pending, setPending] = useState<PendingApp[]>([])
  const [payments, setPayments] = useState<PaymentRow[]>([])
  const [active, setActive] = useState<ActiveRow[]>([])
  const [requests, setRequests] = useState<CustomerRequestRow[]>([])
  const [requestsWarning, setRequestsWarning] = useState<string | null>(null)
  const [jobs, setJobs] = useState<JobRow[]>([])
  const [jobsUnavailable, setJobsUnavailable] = useState(false)
  const [providers, setProviders] = useState<ProviderRow[]>([])
  const [financeSummary, setFinanceSummary] = useState<FinanceSummary | null>(
    null
  )
  const [financePayments, setFinancePayments] = useState<FinancePaymentRow[]>(
    []
  )
  const [providerSearch, setProviderSearch] = useState('')
  const [providerStatus, setProviderStatus] = useState<string>('all')
  const [providerProvince, setProviderProvince] = useState<string>('all')
  const [providerTier, setProviderTier] = useState<string>('all')
  const [expandedProviders, setExpandedProviders] = useState<Set<number>>(
    () => new Set()
  )
  const [activateTarget, setActivateTarget] = useState<PaymentRow | null>(null)
  const [activateAmountStr, setActivateAmountStr] = useState('')
  const [activateMismatchStep, setActivateMismatchStep] = useState(false)
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

  const loadJobs = useCallback(async () => {
    if (!base) {
      setJobsUnavailable(true)
      return
    }
    try {
      const res = await fetch(RW('jobs'))
      if (!res.ok) {
        setJobs([])
        setJobsUnavailable(true)
        return
      }
      const j = (await res.json()) as { jobs?: JobRow[] }
      setJobs(Array.isArray(j.jobs) ? j.jobs : [])
      setJobsUnavailable(false)
    } catch {
      setJobs([])
      setJobsUnavailable(true)
    }
  }, [base])

  const loadProviders = useCallback(async () => {
    if (!base) {
      setProviders([])
      return
    }
    try {
      const res = await fetch(RW('providers'))
      const j = (await res.json().catch(() => ({}))) as {
        providers?: ProviderRow[]
      }
      if (!res.ok) {
        setProviders([])
        return
      }
      setProviders(Array.isArray(j.providers) ? j.providers : [])
    } catch {
      setProviders([])
    }
  }, [base])

  const loadFinance = useCallback(async () => {
    if (!base) {
      setFinanceSummary(null)
      setFinancePayments([])
      return
    }
    try {
      const res = await fetch(RW('finance'))
      const j = (await res.json().catch(() => ({}))) as {
        summary?: FinanceSummary
        payments?: FinancePaymentRow[]
      }
      if (!res.ok) {
        setFinanceSummary(null)
        setFinancePayments([])
        return
      }
      setFinanceSummary(j.summary ?? null)
      setFinancePayments(Array.isArray(j.payments) ? j.payments : [])
    } catch {
      setFinanceSummary(null)
      setFinancePayments([])
    }
  }, [base])

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
    try {
      await loadJobs()
    } catch {
      setJobsUnavailable(true)
    }
    try {
      await loadProviders()
    } catch {
      setProviders([])
    }
    try {
      await loadFinance()
    } catch {
      setFinanceSummary(null)
      setFinancePayments([])
    }
    setLastUpdated(new Date())
    setLoading(false)
  }, [loadRailway, loadRequests, loadJobs, loadProviders, loadFinance])

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
      const msg =
        j.customer_code != null && j.customer_code !== ''
          ? `Approved. Code: ${j.customer_code}.`
          : 'Approved.'
      toast.success(msg)
      setPending((prev) => prev.filter((p) => p.id !== id))
    } catch {
      toast.error('Network error.')
    } finally {
      setActionKey(null)
    }
  }

  const closeActivateModal = () => {
    setActivateTarget(null)
    setActivateMismatchStep(false)
    setActivateAmountStr('')
  }

  const submitActivatePayment = async (row: PaymentRow, amountPaid: number) => {
    setActionKey(`activate-${row.id}`)
    try {
      const res = await fetch(RW(`activate/${row.id}`), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          activatedBy: 'admin',
          amountPaid,
          proofUrl: row.proof_of_payment?.trim() || undefined,
        }),
      })
      const j = (await res.json().catch(() => ({}))) as {
        error?: string
        amountMatches?: boolean
      }
      if (!res.ok) {
        toast.error(
          typeof j.error === 'string' ? j.error : 'Activate failed.'
        )
        return
      }
      toast.success('Account activated. SMS sent.')
      setPayments((prev) => prev.filter((p) => p.id !== row.id))
      closeActivateModal()
    } catch {
      toast.error('Network error.')
    } finally {
      setActionKey(null)
    }
  }

  const onActivateModalConfirm = () => {
    if (!activateTarget) return
    const row = activateTarget
    const amountPaid = parseFloat(activateAmountStr) || 0
    if (LAUNCH_FREE_PLATFORM) {
      void submitActivatePayment(row, amountPaid)
      return
    }
    const expected = expectedTierAmount(row.tier)
    if (amountPaid !== expected && !activateMismatchStep) {
      setActivateMismatchStep(true)
      return
    }
    void submitActivatePayment(row, amountPaid)
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

  const redispatchJob = async (id: number) => {
    setActionKey(`redispatch-job-${id}`)
    try {
      const res = await fetch(RW(`jobs/${id}/redispatch`), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
      const j = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) {
        toast.error(j.error ?? 'Redispatch failed.')
        return
      }
      toast.success('Job redispatched')
      await loadJobs()
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
      jobs: jobs.length,
      providers: providers.length,
    }),
    [pending.length, payments.length, active.length, jobs.length, providers.length]
  )

  const filteredProviders = useMemo(() => {
    return providers.filter((p) => {
      if (providerStatus !== 'all') {
        if (
          String(p.status || '').toLowerCase() !==
          providerStatus.toLowerCase()
        ) {
          return false
        }
      }
      if (providerProvince !== 'all') {
        if (
          String(p.province || '').toUpperCase() !==
          providerProvince.toUpperCase()
        ) {
          return false
        }
      }
      if (providerTier !== 'all') {
        if (
          String(p.tier || '').toLowerCase() !== providerTier.toLowerCase()
        ) {
          return false
        }
      }
      if (providerSearch.trim()) {
        const q = providerSearch.trim().toLowerCase()
        const name = (p.name || '').toLowerCase()
        const phone = (p.phone || '').toLowerCase()
        if (!name.includes(q) && !phone.includes(q)) {
          return false
        }
      }
      return true
    })
  }, [
    providers,
    providerStatus,
    providerProvince,
    providerTier,
    providerSearch,
  ])

  const financeMismatchCount = useMemo(() => {
    if (LAUNCH_FREE_PLATFORM) return 0
    return financePayments.filter((p) => {
      if (p.amountPaid == null) return false
      const exp = expectedTierAmount(p.tier)
      return Number(p.amountPaid) !== exp
    }).length
  }, [financePayments])

  const financeMonthLabels = useMemo(() => {
    const now = new Date()
    const thisL = new Intl.DateTimeFormat('en-ZA', {
      month: 'long',
      year: 'numeric',
    }).format(now)
    const last = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const lastL = new Intl.DateTimeFormat('en-ZA', {
      month: 'long',
      year: 'numeric',
    }).format(last)
    return { thisMonthLabel: thisL, lastMonthLabel: lastL }
  }, [])

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

      {LAUNCH_FREE_PLATFORM && (
        <div className="rounded-xl border border-gold/40 bg-gold/10 px-4 py-3 text-sm text-foreground">
          <p className="font-semibold text-gold">Launch mode</p>
          <p className="text-muted-foreground mt-1 leading-relaxed">
            Approvals assign Starter or Pro and move applicants through onboarding — not a
            monthly subscription. No platform subscription is due before{' '}
            <strong className="text-foreground">{FIRST_PLATFORM_BILLING_MONTH}</strong>{' '}
            (we will give notice). Keep approving to verify identity, PSIRA and capacity per
            city.
          </p>
        </div>
      )}

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="flex flex-wrap h-auto gap-0 border-b border-border bg-transparent p-0 rounded-none w-full justify-start">
          {(
            [
              ['pending', `Pending (${counts.pending})`],
              ['payments', `Payments (${counts.payments})`],
              ['active', `Active (${counts.active})`],
              ['requests', 'Requests'],
              ['jobs', `Jobs (${counts.jobs})`],
              ['providers', `Providers (${counts.providers})`],
              ['finance', 'Finance'],
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
                            label={`Approve Starter — free until ${FIRST_PLATFORM_BILLING_MONTH}`}
                            size="sm"
                            disabled={!!actionKey}
                            onClick={() => void approve(row.id, 'Starter')}
                          />
                          <GoldButton
                            type="button"
                            label={`Approve Pro — free until ${FIRST_PLATFORM_BILLING_MONTH}`}
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
                              onClick={() => {
                                setActivateTarget(row)
                                setActivateAmountStr(
                                  String(expectedTierAmount(row.tier))
                                )
                                setActivateMismatchStep(false)
                              }}
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

        <TabsContent value="jobs" className="mt-6">
          {jobsUnavailable ? (
            <p className="text-muted-foreground text-sm py-8">
              Jobs dashboard coming soon
            </p>
          ) : loading ? (
            <TableSkeleton cols={8} />
          ) : jobs.length === 0 ? (
            <p className="text-muted-foreground text-sm py-8">No jobs yet.</p>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full min-w-[960px] text-sm text-left">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="p-3 font-medium">Job code</th>
                    <th className="p-3 font-medium">Service</th>
                    <th className="p-3 font-medium">Suburb</th>
                    <th className="p-3 font-medium">Urgency</th>
                    <th className="p-3 font-medium">Status</th>
                    <th className="p-3 font-medium">Notified</th>
                    <th className="p-3 font-medium">Claimed by</th>
                    <th className="p-3 font-medium">Created</th>
                    <th className="p-3 font-medium w-[120px]">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b border-border/80 hover:bg-muted/30"
                    >
                      <td className="p-3 align-top font-heading font-bold text-gold whitespace-nowrap">
                        {row.job_code}
                      </td>
                      <td className="p-3 align-top">{row.service}</td>
                      <td className="p-3 align-top">{row.suburb}</td>
                      <td className="p-3 align-top">
                        <UrgencyBadge urgency={row.urgency} />
                      </td>
                      <td className="p-3 align-top">
                        <JobStatusBadge status={row.status} />
                      </td>
                      <td className="p-3 align-top">{row.notified_count ?? 0}</td>
                      <td className="p-3 align-top whitespace-nowrap">
                        {row.claimed_by ?? '—'}
                      </td>
                      <td className="p-3 align-top whitespace-nowrap text-muted-foreground">
                        {formatTimeAgo(row.created_at)}
                      </td>
                      <td className="p-3 align-top">
                        <GoldButton
                          type="button"
                          label="Redispatch"
                          size="sm"
                          variant="outline"
                          disabled={!!actionKey}
                          onClick={() => void redispatchJob(row.id)}
                        />
                      </td>
                    </tr>
                  ))}
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

        <TabsContent value="providers" className="mt-6">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3 items-end">
              <div className="min-w-[200px] flex-1">
                <label className="block text-xs text-muted-foreground mb-1">
                  Search
                </label>
                <input
                  type="search"
                  placeholder="Search by name or phone"
                  value={providerSearch}
                  onChange={(e) => setProviderSearch(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">
                  Status
                </label>
                <select
                  value={providerStatus}
                  onChange={(e) => setProviderStatus(e.target.value)}
                  className="rounded-lg border border-border bg-background px-3 py-2 text-sm min-w-[140px]"
                >
                  <option value="all">All statuses</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="expired">Expired</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">
                  Province
                </label>
                <select
                  value={providerProvince}
                  onChange={(e) => setProviderProvince(e.target.value)}
                  className="rounded-lg border border-border bg-background px-3 py-2 text-sm min-w-[160px]"
                >
                  <option value="all">All provinces</option>
                  <option value="GP">Gauteng (GP)</option>
                  <option value="WC">Western Cape (WC)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">
                  Tier
                </label>
                <select
                  value={providerTier}
                  onChange={(e) => setProviderTier(e.target.value)}
                  className="rounded-lg border border-border bg-background px-3 py-2 text-sm min-w-[120px]"
                >
                  <option value="all">All tiers</option>
                  <option value="starter">Starter</option>
                  <option value="pro">Pro</option>
                </select>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">
                {providers.length}
              </span>{' '}
              locksmiths on the platform
            </p>
            {loading ? (
              <TableSkeleton cols={9} />
            ) : filteredProviders.length === 0 ? (
              <p className="text-muted-foreground text-sm py-8">
                No locksmiths found.
              </p>
            ) : (
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full min-w-[1100px] text-sm text-left">
                  <thead className="bg-muted/50 border-b border-border">
                    <tr>
                      <th className="p-3 font-medium">Code</th>
                      <th className="p-3 font-medium">Name</th>
                      <th className="p-3 font-medium">Phone</th>
                      <th className="p-3 font-medium">Province</th>
                      <th className="p-3 font-medium">Tier</th>
                      <th className="p-3 font-medium">Status</th>
                      <th className="p-3 font-medium">Coverage</th>
                      <th className="p-3 font-medium">Services</th>
                      <th className="p-3 font-medium">Expiry / Days</th>
                      <th className="p-3 font-medium w-[100px]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProviders.map((row) => {
                      const areas = row.coverage_areas ?? []
                      const shownAreas = areas.slice(0, 2)
                      const moreAreas = areas.length - shownAreas.length
                      const svcList = parseServicesField(row.services)
                      const expanded = expandedProviders.has(row.id)
                      const dr =
                        row.days_remaining != null &&
                        row.days_remaining !== ''
                          ? Number(row.days_remaining)
                          : null
                      return (
                        <Fragment key={row.id}>
                          <tr className="border-b border-border/80 hover:bg-muted/30">
                            <td className="p-3 align-top font-heading text-xs font-bold text-gold whitespace-nowrap">
                              {row.customer_code ?? '—'}
                            </td>
                            <td className="p-3 align-top">{row.name ?? '—'}</td>
                            <td className="p-3 align-top whitespace-nowrap">
                              {row.phone ? (
                                <a
                                  href={`tel:${row.phone}`}
                                  className="text-gold hover:underline"
                                >
                                  {row.phone}
                                </a>
                              ) : (
                                '—'
                              )}
                            </td>
                            <td className="p-3 align-top">
                              <ProvinceBadge p={row.province} />
                            </td>
                            <td className="p-3 align-top">
                              <ProviderTierBadge tier={row.tier} />
                            </td>
                            <td className="p-3 align-top">
                              <ProviderStatusBadge status={row.status} />
                            </td>
                            <td className="p-3 align-top max-w-[200px]">
                              <div className="flex flex-wrap gap-1">
                                {shownAreas.map((a) => (
                                  <span
                                    key={a}
                                    className="inline-flex rounded-full bg-muted px-2 py-0.5 text-xs"
                                  >
                                    {a}
                                  </span>
                                ))}
                                {moreAreas > 0 && (
                                  <span className="text-xs text-muted-foreground">
                                    +{moreAreas} more
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="p-3 align-top text-muted-foreground text-xs">
                              {svcList.length} services
                            </td>
                            <td className="p-3 align-top">
                              <ProviderExpiryDays days={dr} expiry={row.expiry_date} />
                            </td>
                            <td className="p-3 align-top">
                              <GoldButton
                                type="button"
                                label={expanded ? 'Hide' : 'View'}
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  setExpandedProviders((prev) => {
                                    const n = new Set(prev)
                                    if (n.has(row.id)) n.delete(row.id)
                                    else n.add(row.id)
                                    return n
                                  })
                                }
                              />
                            </td>
                          </tr>
                          {expanded && (
                            <tr className="bg-muted/20 border-b border-border/80">
                              <td colSpan={10} className="p-4 text-sm">
                                <div className="grid gap-3 md:grid-cols-2">
                                  <div>
                                    <p className="text-xs font-medium text-muted-foreground mb-1">
                                      Coverage areas
                                    </p>
                                    <div className="flex flex-wrap gap-1">
                                      {areas.map((a) => (
                                        <span
                                          key={a}
                                          className="inline-flex rounded-full bg-muted px-2 py-0.5 text-xs"
                                        >
                                          {a}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                  <div>
                                    <p className="text-xs font-medium text-muted-foreground mb-1">
                                      Services
                                    </p>
                                    <div className="flex flex-wrap gap-1">
                                      {svcList.map((s) => (
                                        <span
                                          key={s}
                                          className="inline-flex rounded-full border border-border px-2 py-0.5 text-xs"
                                        >
                                          {getServiceLabel(s)}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                  <div>
                                    <p className="text-xs text-muted-foreground">
                                      Base address
                                    </p>
                                    <p>{row.base_address ?? '—'}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-muted-foreground">
                                      Email
                                    </p>
                                    <p className="break-all">{row.email ?? '—'}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-muted-foreground">
                                      Activation date
                                    </p>
                                    <p>{formatDate(row.activation_date)}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-muted-foreground">
                                      Amount paid
                                    </p>
                                    <p>
                                      {row.amount_paid != null && row.amount_paid !== ''
                                        ? `R${Number(row.amount_paid).toLocaleString('en-ZA')}`
                                        : '—'}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-muted-foreground">
                                      Payment date
                                    </p>
                                    <p>{formatDate(row.payment_date)}</p>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </Fragment>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="finance" className="mt-6 space-y-6">
          {financeMismatchCount > 0 && (
            <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-foreground">
              ⚠️ {financeMismatchCount} payment(s) have amount mismatches. Review
              the payment history below.
            </div>
          )}
          {loading && !financeSummary ? (
            <TableSkeleton cols={3} />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="rounded-xl border border-gold/40 bg-gold/10 p-4">
                  <p className="text-xs text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold text-gold mt-1">
                    R
                    {(financeSummary?.totalRevenue ?? 0).toLocaleString('en-ZA')}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">All time</p>
                </div>
                <div className="rounded-xl border border-success/40 bg-success/10 p-4">
                  <p className="text-xs text-muted-foreground">This Month</p>
                  <p className="text-2xl font-bold text-success mt-1">
                    R
                    {(financeSummary?.thisMonthRevenue ?? 0).toLocaleString(
                      'en-ZA'
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {financeMonthLabels.thisMonthLabel}
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-muted/30 p-4">
                  <p className="text-xs text-muted-foreground">Last Month</p>
                  <p className="text-2xl font-bold text-foreground mt-1">
                    R
                    {(financeSummary?.lastMonthRevenue ?? 0).toLocaleString(
                      'en-ZA'
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {financeMonthLabels.lastMonthLabel}
                  </p>
                </div>
                <div className="rounded-xl border border-blue-500/40 bg-blue-500/10 p-4">
                  <p className="text-xs text-muted-foreground">
                    Projected Next Month
                  </p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">
                    R
                    {(financeSummary?.projectedNextMonth ?? 0).toLocaleString(
                      'en-ZA'
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {LAUNCH_FREE_PLATFORM
                      ? `From active members · first platform billing ${FIRST_PLATFORM_BILLING_MONTH}`
                      : 'Based on active subscribers'}
                  </p>
                </div>
                <div className="rounded-xl border border-success/40 bg-success/10 p-4">
                  <p className="text-xs text-muted-foreground">
                    Active Subscribers
                  </p>
                  <p className="text-2xl font-bold text-success mt-1">
                    {financeSummary?.activeCount ?? 0}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Currently active
                  </p>
                </div>
                <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-4">
                  <p className="text-xs text-muted-foreground">Starter / Pro</p>
                  <p className="text-2xl font-bold text-amber-700 dark:text-amber-400 mt-1">
                    {financeSummary?.starterCount ?? 0} /{' '}
                    {financeSummary?.proCount ?? 0}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Starter / Pro
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-heading text-lg font-semibold">
                  Payment History
                </h2>
                <GoldButton
                  type="button"
                  label="Export CSV"
                  size="sm"
                  variant="outline"
                  onClick={() => exportFinanceToCsv(financePayments)}
                />
              </div>

              {loading ? (
                <TableSkeleton cols={8} />
              ) : financePayments.length === 0 ? (
                <p className="text-muted-foreground text-sm py-8">
                  No payment rows yet.
                </p>
              ) : (
                <div className="overflow-x-auto rounded-lg border border-border">
                  <table className="w-full min-w-[1000px] text-sm text-left">
                    <thead className="bg-muted/50 border-b border-border">
                      <tr>
                        <th className="p-3 font-medium">Code</th>
                        <th className="p-3 font-medium">Name</th>
                        <th className="p-3 font-medium">Tier</th>
                        <th className="p-3 font-medium">Amount</th>
                        <th className="p-3 font-medium">Payment date</th>
                        <th className="p-3 font-medium">Activation</th>
                        <th className="p-3 font-medium">Expiry</th>
                        <th className="p-3 font-medium">Days left</th>
                        <th className="p-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {financePayments.map((p) => (
                        <tr
                          key={p.id}
                          className="border-b border-border/80 hover:bg-muted/30"
                        >
                          <td className="p-3 align-top font-bold text-gold text-xs whitespace-nowrap">
                            {p.customerCode ?? '—'}
                          </td>
                          <td className="p-3 align-top">{p.name ?? '—'}</td>
                          <td className="p-3 align-top">
                            <ProviderTierBadge tier={p.tier} />
                          </td>
                          <td className="p-3 align-top">
                            {p.amountPaid != null
                              ? `R${Number(p.amountPaid).toLocaleString('en-ZA')}`
                              : '—'}
                          </td>
                          <td className="p-3 align-top whitespace-nowrap">
                            {p.paymentDate
                              ? new Date(p.paymentDate).toLocaleDateString(
                                  'en-ZA'
                                )
                              : '—'}
                          </td>
                          <td className="p-3 align-top whitespace-nowrap">
                            {p.activationDate
                              ? new Date(p.activationDate).toLocaleDateString(
                                  'en-ZA'
                                )
                              : '—'}
                          </td>
                          <td className="p-3 align-top whitespace-nowrap">
                            {p.expiryDate
                              ? new Date(p.expiryDate).toLocaleDateString(
                                  'en-ZA'
                                )
                              : '—'}
                          </td>
                          <td className="p-3 align-top">
                            <FinanceDaysBadge days={p.daysRemaining} />
                          </td>
                          <td className="p-3 align-top">
                            <ProviderStatusBadge status={p.status} />
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
      </Tabs>

      <Dialog
        open={activateTarget != null}
        onOpenChange={(open) => {
          if (!open) closeActivateModal()
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Activate Account</DialogTitle>
            <DialogDescription>
              {activateTarget?.name ?? 'Locksmith'} · Code{' '}
              <span className="font-mono text-gold">
                {activateTarget?.customer_code ?? '—'}
              </span>
            </DialogDescription>
          </DialogHeader>
          {!activateMismatchStep ? (
            <div className="space-y-2 py-2">
              <label
                htmlFor="activate-amount"
                className="text-sm font-medium text-foreground"
              >
                {LAUNCH_FREE_PLATFORM
                  ? 'Amount on proof (if any)'
                  : 'Amount on proof of payment'}
              </label>
              <input
                id="activate-amount"
                type="number"
                min={0}
                step={0.01}
                value={activateAmountStr}
                onChange={(e) => setActivateAmountStr(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />
              <p className="text-xs text-muted-foreground">
                {LAUNCH_FREE_PLATFORM ? (
                  <>
                    Launch: no subscription due before {FIRST_PLATFORM_BILLING_MONTH}. Use{' '}
                    <strong className="text-foreground">0</strong> if there is no charge, or
                    enter any verification or onboarding amount on the proof (
                    {activateTarget?.tier ?? '—'} tier).
                  </>
                ) : (
                  <>
                    Expected: R
                    {activateTarget
                      ? expectedTierAmount(activateTarget.tier).toLocaleString(
                          'en-ZA'
                        )
                      : '—'}{' '}
                    ({activateTarget?.tier ?? '—'})
                  </>
                )}
              </p>
            </div>
          ) : (
            <p className="text-sm text-amber-700 dark:text-amber-400 py-2 leading-relaxed">
              ⚠️ Amount paid (R
              {(parseFloat(activateAmountStr) || 0).toLocaleString('en-ZA')})
              does not match expected (R
              {activateTarget
                ? expectedTierAmount(activateTarget.tier).toLocaleString(
                    'en-ZA'
                  )
                : '—'}
              ).
              <br />
              Activate anyway?
            </p>
          )}
          <DialogFooter className="gap-2 sm:gap-0">
            {!activateMismatchStep ? (
              <>
                <button
                  type="button"
                  onClick={closeActivateModal}
                  className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-muted"
                >
                  Cancel
                </button>
                <GoldButton
                  type="button"
                  label="Activate Account"
                  size="sm"
                  disabled={!!actionKey}
                  onClick={() => void onActivateModalConfirm()}
                />
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setActivateMismatchStep(false)}
                  className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-muted"
                >
                  Back
                </button>
                <GoldButton
                  type="button"
                  label="Yes, activate anyway"
                  size="sm"
                  disabled={!!actionKey}
                  onClick={() => {
                    if (!activateTarget) return
                    void submitActivatePayment(
                      activateTarget,
                      parseFloat(activateAmountStr) || 0
                    )
                  }}
                />
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function ProvinceBadge({ p }: { p?: string }) {
  if (!p) return <span className="text-muted-foreground">—</span>
  return (
    <span className="inline-flex rounded-full border border-border px-2 py-0.5 text-xs font-medium">
      {p}
    </span>
  )
}

function ProviderTierBadge({ tier }: { tier?: string }) {
  if (!tier) return <span className="text-muted-foreground">—</span>
  const low = tier.toLowerCase()
  const cls =
    low === 'pro'
      ? 'border-gold/60 bg-gold/10 text-gold'
      : 'border-amber-500/50 bg-amber-500/10 text-amber-700 dark:text-amber-400'
  return (
    <span
      className={cn(
        'inline-flex rounded-full border px-2 py-0.5 text-xs font-medium capitalize',
        cls
      )}
    >
      {tier}
    </span>
  )
}

function ProviderStatusBadge({ status }: { status?: string }) {
  if (!status) return <span className="text-muted-foreground">—</span>
  const s = status.toLowerCase()
  let cls = 'border-border bg-muted text-foreground'
  if (s === 'active') cls = 'border-success/50 bg-success/15 text-success'
  else if (s === 'pending') cls = 'border-blue-500/50 bg-blue-500/10 text-blue-600'
  else if (s === 'approved')
    cls = 'border-amber-500/50 bg-amber-500/10 text-amber-700 dark:text-amber-400'
  else if (s === 'expired' || s === 'suspended')
    cls = 'border-destructive/50 bg-destructive/10 text-destructive'
  return (
    <span
      className={cn(
        'inline-flex rounded-full border px-2 py-0.5 text-xs font-medium capitalize',
        cls
      )}
    >
      {status}
    </span>
  )
}

function ProviderExpiryDays({
  days,
  expiry,
}: {
  days: number | null
  expiry?: string
}) {
  if (!expiry) {
    return <span className="text-xs text-muted-foreground">No expiry yet</span>
  }
  if (days == null || Number.isNaN(days)) {
    return <span className="text-muted-foreground">—</span>
  }
  let cls = 'text-success'
  if (days < 3) cls = 'text-destructive font-medium'
  else if (days < 7) cls = 'text-amber-600 dark:text-amber-400'
  else if (days > 7) cls = 'text-success'
  return (
    <span className={cn('text-xs', cls)}>
      {Math.round(days)} days
    </span>
  )
}

function FinanceDaysBadge({ days }: { days?: number | null }) {
  if (days == null || Number.isNaN(Number(days))) {
    return <span className="text-muted-foreground text-xs">—</span>
  }
  const d = Number(days)
  let cls =
    'bg-success/20 text-success border-success/30'
  if (d < 3) cls = 'bg-destructive/20 text-destructive border-destructive/40'
  else if (d < 7)
    cls = 'bg-amber-500/15 text-amber-600 border-amber-500/40 dark:text-amber-400'
  return (
    <span
      className={cn(
        'inline-flex rounded-full border px-2 py-0.5 text-xs font-medium',
        cls
      )}
    >
      {Math.round(d)} days
    </span>
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

function formatTimeAgo(iso?: string) {
  if (!iso) return '—'
  const t = new Date(iso).getTime()
  if (Number.isNaN(t)) return '—'
  const s = Math.floor((Date.now() - t) / 1000)
  if (s < 60) return `${s}s ago`
  const m = Math.floor(s / 60)
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 48) return `${h}h ago`
  const d = Math.floor(h / 24)
  return `${d}d ago`
}

function UrgencyBadge({ urgency }: { urgency: string }) {
  const u = urgency.toLowerCase()
  let cls =
    'bg-success/20 text-success border-success/30'
  if (u.includes('emergency'))
    cls =
      'bg-destructive/20 text-destructive border-destructive/40'
  else if (u.includes('urgent'))
    cls =
      'bg-amber-500/15 text-amber-600 border-amber-500/40 dark:text-amber-400'

  return (
    <span
      className={cn(
        'inline-flex rounded-full border px-2 py-0.5 text-xs font-medium',
        cls
      )}
    >
      {urgency}
    </span>
  )
}

function JobStatusBadge({ status }: { status: string }) {
  const s = status.toLowerCase().replace(/_/g, ' ')
  let cls = 'bg-muted text-foreground border-border'
  if (s === 'pending')
    cls = 'bg-muted text-muted-foreground border-border'
  else if (s === 'dispatched')
    cls = 'bg-blue-500/15 text-blue-600 border-blue-500/40 dark:text-blue-400'
  else if (s === 'claimed')
    cls = 'bg-gold/10 text-gold border-gold/40'
  else if (s === 'no coverage')
    cls =
      'bg-destructive/15 text-destructive border-destructive/40'
  else if (s === 'completed')
    cls = 'bg-success/20 text-success border-success/30'

  return (
    <span
      className={cn(
        'inline-flex rounded-full border px-2 py-0.5 text-xs font-medium capitalize',
        cls
      )}
    >
      {status.replace(/_/g, ' ')}
    </span>
  )
}
