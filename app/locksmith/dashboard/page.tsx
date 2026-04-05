'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useCallback, useEffect, useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { Toaster, toast } from 'sonner'
import { GoldButton } from '@/components/GoldButton'
import { CONTACT } from '@/lib/constants'
import { API_SERVICE_OPTIONS } from '@/lib/api-services'
import { cn } from '@/lib/utils'

const SERVICE_LABELS: Record<string, string> = Object.fromEntries(
  API_SERVICE_OPTIONS.map((o) => [o.value, o.label])
)

function apiBase(): string | null {
  const b = process.env.NEXT_PUBLIC_VULA24_API_URL?.trim()
  return b ? b.replace(/\/$/, '') : null
}

type DashboardData = {
  id: number
  name?: string
  phone?: string
  email?: string
  customer_code?: string
  tier?: string
  status?: string
  activation_date?: string | null
  expiry_date?: string | null
  days_remaining?: number | null
  coverage_areas?: string[]
  services?: string[]
  province?: string
  proof_of_payment?: string | null
}

type BankDetails = {
  bankName: string
  accountName: string
  accountNumber: string
  branchCode: string
  accountType: string
}

function norm(s: string) {
  return s.toLowerCase().trim()
}

function statusPresentation(statusRaw?: string) {
  const s = norm(statusRaw ?? '')
  if (/\bactive\b/i.test(s) && !/\binactive\b/i.test(s)) {
    return { label: 'Active', className: 'bg-success/20 text-success border-success/40' }
  }
  if (s.includes('approved') && s.includes('await')) {
    return {
      label: 'Approved — Awaiting Payment',
      className: 'bg-amber-500/20 text-amber-700 border-amber-500/40 dark:text-amber-300',
    }
  }
  if (s.includes('pending')) {
    return { label: 'Pending Review', className: 'bg-blue-500/20 text-blue-600 border-blue-500/40' }
  }
  if (s.includes('expired')) {
    return { label: 'Expired', className: 'bg-destructive/20 text-destructive border-destructive/40' }
  }
  if (s.includes('suspend')) {
    return { label: 'Suspended', className: 'bg-destructive/20 text-destructive border-destructive/40' }
  }
  return { label: statusRaw ?? 'Unknown', className: 'bg-muted text-foreground border-border' }
}

function tierAmountLabel(tier?: string) {
  const t = norm(tier ?? '')
  if (t.includes('pro')) return { amount: 'R899', label: 'Pro' }
  return { amount: 'R499', label: 'Starter' }
}

function BankCard({
  bank,
  reference,
  onCopyRef,
  copied,
}: {
  bank: BankDetails | null
  reference: string
  onCopyRef: () => void
  copied: boolean
}) {
  if (!bank) {
    return (
      <p className="text-sm text-muted-foreground rounded-lg border border-border p-4">
        Loading bank details…
      </p>
    )
  }
  return (
    <div className="rounded-xl border border-border bg-surface p-5 space-y-2 text-sm">
      <p>
        <span className="text-muted-foreground">Bank: </span>
        {bank.bankName || '—'}
      </p>
      <p>
        <span className="text-muted-foreground">Account name: </span>
        {bank.accountName || '—'}
      </p>
      <p>
        <span className="text-muted-foreground">Account number: </span>
        {bank.accountNumber || '—'}
      </p>
      <p>
        <span className="text-muted-foreground">Branch code: </span>
        {bank.branchCode || '—'}
      </p>
      <p>
        <span className="text-muted-foreground">Account type: </span>
        {bank.accountType || '—'}
      </p>
      <div className="pt-3 border-t border-border">
        <p className="text-muted-foreground text-xs mb-1">Reference</p>
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-heading text-xl md:text-2xl font-bold text-gold tracking-tight">
            {reference}
          </span>
          <button
            type="button"
            onClick={onCopyRef}
            className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs hover:bg-muted"
          >
            {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            {copied ? 'Copied' : 'Copy reference'}
          </button>
        </div>
      </div>
    </div>
  )
}

function ProofUploadSection({
  base,
  customerCode,
  onSuccess,
}: {
  base: string
  customerCode: string
  onSuccess: () => void
}) {
  const [file, setFile] = useState<File | null>(null)
  const [progress, setProgress] = useState(0)
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)
  const [drag, setDrag] = useState(false)

  const onPick = (f: File | null) => {
    if (!f) {
      setFile(null)
      return
    }
    if (f.size > 5 * 1024 * 1024) {
      toast.error('File must be 5MB or smaller.')
      return
    }
    setFile(f)
  }

  const submit = async () => {
    if (!file) {
      toast.error('Choose a file first.')
      return
    }
    setBusy(true)
    setProgress(0)
    const xhr = new XMLHttpRequest()
    const fd = new FormData()
    fd.append('file', file)
    fd.append('customer_code', customerCode)

    await new Promise<void>((resolve, reject) => {
      xhr.upload.onprogress = (ev) => {
        if (ev.lengthComputable) {
          setProgress(Math.round((ev.loaded / ev.total) * 100))
        }
      }
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve()
        } else {
          reject(new Error('Upload failed'))
        }
      }
      xhr.onerror = () => reject(new Error('Network error'))
      xhr.open('POST', `${base}/api/locksmith/upload-proof`)
      xhr.send(fd)
    })
      .then(() => {
        setDone(true)
        onSuccess()
      })
      .catch(() => {
        toast.error('Upload failed.')
      })
      .finally(() => {
        setBusy(false)
        setProgress(0)
      })
  }

  if (done) {
    return (
      <div className="rounded-xl border border-success/40 bg-success/10 p-6 text-sm text-foreground space-y-2">
        <p className="font-semibold text-success">✓ Proof received!</p>
        <p className="text-muted-foreground leading-relaxed">
          We will verify your payment and activate your account within 24 hours.
          We will SMS you when active.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-heading font-semibold text-lg text-foreground">
          Upload proof of payment
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Upload your bank receipt or screenshot after payment.
        </p>
      </div>
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setDrag(true)
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDrag(false)
          onPick(e.dataTransfer.files?.[0] ?? null)
        }}
        className={cn(
          'rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors',
          drag ? 'border-gold bg-gold/5' : 'border-border bg-background/50'
        )}
      >
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf"
          className="hidden"
          id="proof-file"
          onChange={(e) => onPick(e.target.files?.[0] ?? null)}
        />
        <label htmlFor="proof-file" className="cursor-pointer text-sm text-foreground">
          Drag and drop here, or{' '}
          <span className="text-gold font-medium">browse</span>
        </label>
        <p className="text-xs text-muted-foreground mt-2">
          JPG, PNG or PDF · max 5MB
        </p>
      </div>
      {file && (
        <p className="text-xs text-muted-foreground truncate">
          Selected: {file.name}
        </p>
      )}
      {busy && (
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-gold transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
      <GoldButton
        type="button"
        label={busy ? 'Uploading…' : 'Submit Proof'}
        className="w-full sm:w-auto"
        disabled={busy || !file}
        onClick={() => void submit()}
      />
    </div>
  )
}

function DashboardBody() {
  const searchParams = useSearchParams()
  const code = searchParams.get('code')?.trim() ?? ''
  const base = apiBase()

  const [data, setData] = useState<DashboardData | null>(null)
  const [bank, setBank] = useState<BankDetails | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [copied, setCopied] = useState(false)

  const loadBank = useCallback(async () => {
    const res = await fetch('/api/bank-details')
    const j = (await res.json()) as BankDetails
    setBank(j)
  }, [])

  const loadDash = useCallback(async () => {
    if (!base || !code) return
    setLoading(true)
    setError('')
    setNotFound(false)
    try {
      const res = await fetch(
        `${base}/api/locksmith/dashboard/${encodeURIComponent(code)}`
      )
      if (res.status === 404) {
        setNotFound(true)
        setData(null)
        return
      }
      const j = (await res.json()) as DashboardData & { error?: string }
      if (!res.ok) {
        setError(j.error ?? 'Could not load dashboard.')
        setData(null)
        return
      }
      setData(j)
    } catch {
      setError('Network error.')
      setData(null)
    } finally {
      setLoading(false)
    }
  }, [base, code])

  useEffect(() => {
    void loadBank()
  }, [loadBank])

  useEffect(() => {
    if (!code || !base) return
    void loadDash()
  }, [code, base, loadDash])

  const copyCode = async (c: string) => {
    try {
      await navigator.clipboard.writeText(c)
      setCopied(true)
      toast.success('Copied!')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Could not copy.')
    }
  }

  if (!base) {
    return (
      <p className="text-destructive text-sm">
        Missing <code className="font-mono">NEXT_PUBLIC_VULA24_API_URL</code>.
      </p>
    )
  }

  if (!code) {
    return (
      <p className="text-destructive text-sm max-w-md">
        No account code provided. Check your activation SMS.
      </p>
    )
  }

  if (loading && !data && !notFound && !error) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-10 bg-muted rounded-lg max-w-md" />
        <div className="h-40 bg-muted rounded-xl" />
      </div>
    )
  }

  if (notFound) {
    return (
      <div className="rounded-xl border border-border bg-surface p-8 text-center space-y-2">
        <p className="font-medium text-foreground">Account not found.</p>
        <p className="text-sm text-muted-foreground">
          Check your customer code.
        </p>
      </div>
    )
  }

  if (error) {
    return <p className="text-destructive text-sm">{error}</p>
  }

  if (!data) return null

  const st = statusPresentation(data.status)
  const tierInfo = tierAmountLabel(data.tier)
  const codeStr = data.customer_code ?? code
  const days = data.days_remaining ?? null
  const barPct =
    days != null ? Math.min(100, Math.max(0, (days / 30) * 100)) : 0
  let barColor = 'bg-success'
  if (days != null) {
    if (days < 3) barColor = 'bg-destructive'
    else if (days < 7) barColor = 'bg-amber-500'
  }

  const s = norm(data.status ?? '')
  const showPaymentBlock =
    s.includes('approved') ||
    s.includes('expired') ||
    s.includes('pending') ||
    s.includes('await')

  const isActive = /\bactive\b/i.test(norm(data.status ?? '')) && !/\binactive\b/i.test(norm(data.status ?? ''))
  const hasProof = !!data.proof_of_payment?.trim()
  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? CONTACT.whatsapp

  return (
    <div className="space-y-10">
      <section className="space-y-3">
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
          Welcome, {data.name ?? 'locksmith'}
        </h1>
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-heading text-3xl md:text-4xl font-bold text-gold tracking-tight">
            {codeStr}
          </span>
          <button
            type="button"
            onClick={() => void copyCode(codeStr)}
            className="inline-flex items-center justify-center rounded-lg border border-border p-2 hover:bg-muted"
            aria-label="Copy customer code"
          >
            {copied ? (
              <Check className="size-5 text-success" />
            ) : (
              <Copy className="size-5 text-muted-foreground" />
            )}
          </button>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-surface p-6 space-y-4">
        <div
          className={cn(
            'inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold',
            st.className
          )}
        >
          {st.label}
        </div>
        {isActive && days != null && (
          <>
            <p className="text-foreground font-medium">
              {days} days remaining
            </p>
            <div className="h-3 rounded-full bg-muted overflow-hidden">
              <div
                className={cn('h-full rounded-full transition-all', barColor)}
                style={{ width: `${barPct}%` }}
              />
            </div>
          </>
        )}
        <div className="grid gap-2 text-sm text-muted-foreground">
          <p>
            <span className="text-foreground font-medium">Tier:</span>{' '}
            {tierInfo.label}
          </p>
          {data.activation_date && (
            <p>
              <span className="text-foreground font-medium">Activated:</span>{' '}
              {formatDate(data.activation_date)}
            </p>
          )}
          {data.expiry_date && (
            <p>
              <span className="text-foreground font-medium">Expires:</span>{' '}
              {formatDate(data.expiry_date)}
            </p>
          )}
        </div>
      </section>

      {showPaymentBlock && (
        <section className="space-y-4">
          <h2 className="font-heading text-xl font-semibold text-foreground">
            {s.includes('expired')
              ? 'Renew your subscription'
              : s.includes('pending')
                ? 'Complete your registration'
                : 'Activate your account'}
          </h2>
          <p className="text-lg text-foreground">
            Amount:{' '}
            <span className="font-bold text-gold">{tierInfo.amount}/month</span>{' '}
            ({tierInfo.label})
          </p>
          <BankCard
            bank={bank}
            reference={codeStr}
            onCopyRef={() => void copyCode(codeStr)}
            copied={copied}
          />

          {hasProof && !isActive && (
            <div className="rounded-lg border border-border bg-background/80 p-4 text-sm space-y-2">
              <p className="text-foreground">
                ✓ Proof already submitted. Status: Awaiting verification.
                We will SMS you when your account is activated.
              </p>
              <a
                href={data.proof_of_payment!}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold text-xs underline break-all"
              >
                View uploaded proof
              </a>
            </div>
          )}

          {!hasProof && (
            <ProofUploadSection
              base={base}
              customerCode={codeStr}
              onSuccess={() => void loadDash()}
            />
          )}
        </section>
      )}

      {isActive && (
        <section className="space-y-4">
          <h2 className="font-heading text-xl font-semibold text-foreground">
            Your coverage & services
          </h2>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Coverage areas</p>
            <div className="flex flex-wrap gap-2">
              {(data.coverage_areas ?? []).map((a) => (
                <span
                  key={a}
                  className="rounded-full border border-gold/50 bg-gold/10 px-3 py-1 text-xs text-gold"
                >
                  {a}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Services</p>
            <div className="flex flex-wrap gap-2">
              {(data.services ?? []).map((svc) => (
                <span
                  key={svc}
                  className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
                >
                  {SERVICE_LABELS[svc] ?? svc}
                </span>
              ))}
            </div>
          </div>
          <div className="text-sm space-y-1">
            <p>
              <span className="text-muted-foreground">Phone:</span>{' '}
              {data.phone ?? '—'}
            </p>
            <p>
              <span className="text-muted-foreground">Email:</span>{' '}
              {data.email ?? '—'}
            </p>
          </div>
          <div className="pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground mb-3">Need help? WhatsApp us:</p>
            <a
              href={`https://wa.me/${wa}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-success px-4 py-3 text-sm font-medium text-white hover:opacity-90"
            >
              WhatsApp support
            </a>
          </div>
        </section>
      )}
    </div>
  )
}

function formatDate(iso: string) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return new Intl.DateTimeFormat('en-ZA', { dateStyle: 'long' }).format(d)
}

export default function LocksmithDashboardPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 space-y-6">
      <Toaster richColors position="top-right" />
      <Suspense
        fallback={
          <div className="animate-pulse h-40 bg-muted rounded-xl" aria-hidden />
        }
      >
        <DashboardBody />
      </Suspense>
    </div>
  )
}
