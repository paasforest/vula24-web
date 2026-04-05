'use client'

import Link from 'next/link'
import { useCallback, useState } from 'react'
import { Toaster, toast } from 'sonner'
import { GoldButton } from '@/components/GoldButton'
import { cn } from '@/lib/utils'

function apiBase(): string | null {
  const b = process.env.NEXT_PUBLIC_VULA24_API_URL?.trim()
  return b ? b.replace(/\/$/, '') : null
}

type DashboardData = {
  id: number
  name?: string
  tier?: string
  status?: string
  customer_code?: string
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

function tierAmount(tier?: string) {
  const t = norm(tier ?? '')
  if (t.includes('pro')) return { amount: 'R899', label: 'Pro' }
  return { amount: 'R499', label: 'Starter' }
}

export default function LocksmithPaymentPage() {
  const base = apiBase()
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [codeInput, setCodeInput] = useState('')
  const [lookupBusy, setLookupBusy] = useState(false)
  const [dash, setDash] = useState<DashboardData | null>(null)
  const [bank, setBank] = useState<BankDetails | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [progress, setProgress] = useState(0)
  const [uploadBusy, setUploadBusy] = useState(false)
  const [uploadDone, setUploadDone] = useState(false)
  const [drag, setDrag] = useState(false)

  const loadBank = useCallback(async () => {
    const res = await fetch('/api/bank-details')
    setBank((await res.json()) as BankDetails)
  }, [])

  const lookup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!base) {
      toast.error('API URL is not configured.')
      return
    }
    const code = codeInput.trim()
    if (!code) {
      toast.error('Enter your customer code.')
      return
    }
    setLookupBusy(true)
    try {
      const res = await fetch(
        `${base}/api/locksmith/dashboard/${encodeURIComponent(code)}`
      )
      const j = (await res.json().catch(() => ({}))) as DashboardData & {
        error?: string
      }
      if (res.status === 404 || !res.ok) {
        toast.error(
          'Code not found. Check your activation SMS.'
        )
        setDash(null)
        return
      }
      setDash(j)
      await loadBank()
      setStep(2)
    } catch {
      toast.error('Network error.')
    } finally {
      setLookupBusy(false)
    }
  }

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

  const submitProof = async () => {
    if (!base || !dash?.customer_code) {
      toast.error('Missing code.')
      return
    }
    if (!file) {
      toast.error('Choose a file.')
      return
    }
    setUploadBusy(true)
    setProgress(0)
    const fd = new FormData()
    fd.append('file', file)
    fd.append('customer_code', dash.customer_code)

    const xhr = new XMLHttpRequest()
    await new Promise<void>((resolve, reject) => {
      xhr.upload.onprogress = (ev) => {
        if (ev.lengthComputable) {
          setProgress(Math.round((ev.loaded / ev.total) * 100))
        }
      }
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) resolve()
        else reject(new Error('fail'))
      }
      xhr.onerror = () => reject(new Error('network'))
      xhr.open('POST', `${base}/api/locksmith/upload-proof`)
      xhr.send(fd)
    })
      .then(() => {
        setUploadDone(true)
      })
      .catch(() => {
        toast.error('Upload failed.')
      })
      .finally(() => {
        setUploadBusy(false)
        setProgress(0)
      })
  }

  const tier = tierAmount(dash?.tier)
  const code = dash?.customer_code ?? codeInput.trim()

  if (!base) {
    return (
      <div className="mx-auto max-w-lg px-4 py-10">
        <Toaster richColors position="top-right" />
        <p className="text-destructive text-sm">
          Set <code className="font-mono">NEXT_PUBLIC_VULA24_API_URL</code>.
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-10 space-y-8">
      <Toaster richColors position="top-right" />
      <h1 className="font-heading text-2xl font-bold text-foreground">
        Payment & proof
      </h1>

      {step === 1 && (
        <form onSubmit={lookup} className="space-y-4">
          <div>
            <label htmlFor="code" className="block text-sm text-muted-foreground mb-2">
              Enter your customer code
            </label>
            <input
              id="code"
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
              placeholder="VL-2025-GP-001"
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground font-mono"
              autoComplete="off"
            />
          </div>
          <GoldButton
            type="submit"
            label={lookupBusy ? 'Looking up…' : 'Look up account'}
            className="w-full"
            disabled={lookupBusy}
          />
        </form>
      )}

      {step >= 2 && dash && (
        <div className="space-y-2 text-sm">
          <p>
            <span className="text-muted-foreground">Name:</span>{' '}
            <span className="text-foreground font-medium">{dash.name ?? '—'}</span>
          </p>
          <p>
            <span className="text-muted-foreground">Status:</span>{' '}
            <span className="text-foreground">{dash.status ?? '—'}</span>
          </p>
        </div>
      )}

      {step >= 2 && dash && (
        <section className="space-y-3">
          <h2 className="font-heading font-semibold text-lg">Bank details</h2>
          <p className="text-foreground">
            Amount due:{' '}
            <span className="font-bold text-gold">{tier.amount}/month</span> (
            {tier.label})
          </p>
          {!bank ? (
            <p className="text-muted-foreground text-sm">Loading…</p>
          ) : (
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
                <p className="font-heading text-xl font-bold text-gold">{code}</p>
              </div>
            </div>
          )}
          {step === 2 && (
            <GoldButton
              type="button"
              label="Continue to upload"
              className="w-full"
              onClick={() => setStep(3)}
            />
          )}
        </section>
      )}

      {step === 3 && dash && !uploadDone && (
        <section className="space-y-4">
          <h2 className="font-heading font-semibold text-lg">
            Upload proof of payment
          </h2>
          <p className="text-sm text-muted-foreground">
            Upload your bank receipt or screenshot after payment.
          </p>
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
              id="pay-proof"
              onChange={(e) => onPick(e.target.files?.[0] ?? null)}
            />
            <label htmlFor="pay-proof" className="cursor-pointer text-sm">
              Drag and drop or <span className="text-gold font-medium">browse</span>
            </label>
          </div>
          {file && (
            <p className="text-xs text-muted-foreground truncate">{file.name}</p>
          )}
          {uploadBusy && (
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-gold transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
          <GoldButton
            type="button"
            label={uploadBusy ? 'Uploading…' : 'Submit Proof'}
            className="w-full"
            disabled={uploadBusy || !file}
            onClick={() => void submitProof()}
          />
        </section>
      )}

      {uploadDone && dash && (
        <div className="rounded-xl border border-success/40 bg-success/10 p-6 space-y-4 text-sm">
          <p className="font-semibold text-success">
            ✓ Proof submitted successfully!
          </p>
          <p className="text-muted-foreground leading-relaxed">
            We will verify within 24 hours and SMS you when active.
          </p>
          <Link
            href={`/locksmith/dashboard?code=${encodeURIComponent(code)}`}
            className="inline-flex items-center justify-center rounded-lg bg-gold px-4 py-3 font-heading font-bold text-background w-full text-center hover:opacity-90"
          >
            Go to your dashboard →
          </Link>
        </div>
      )}
    </div>
  )
}
