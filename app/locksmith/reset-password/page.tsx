'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import { Toaster, toast } from 'sonner'
import { GoldButton } from '@/components/GoldButton'
import { getVula24ApiBase } from '@/lib/vula24-api'

function ResetPasswordBody() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')?.trim() ?? ''

  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!token) {
      toast.error('Invalid link. Use the link from your SMS or email.')
      return
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters.')
      return
    }
    if (password !== confirm) {
      toast.error('Passwords do not match.')
      return
    }
    setBusy(true)
    try {
      const base = getVula24ApiBase()
      const res = await fetch(`${base}/api/auth/locksmith/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      })
      const j = (await res.json().catch(() => ({}))) as { error?: string; message?: string }
      if (!res.ok) {
        toast.error(j.error ?? 'Could not reset password.')
        return
      }
      toast.success(j.message ?? 'Password updated.')
      router.push('/locksmith/login')
    } catch {
      toast.error('Network error.')
    } finally {
      setBusy(false)
    }
  }

  if (!token) {
    return (
      <div className="mx-auto max-w-md px-4 py-12 text-center space-y-4">
        <p className="text-foreground font-medium">This link is invalid or incomplete.</p>
        <p className="text-sm text-muted-foreground">
          Open the link from your SMS or email, or request a new reset.
        </p>
        <Link href="/locksmith/forgot-password" className="text-gold hover:underline text-sm">
          Request a new link
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12 space-y-8">
      <Toaster richColors position="top-right" />
      <div className="text-center space-y-2">
        <h1 className="font-heading text-2xl font-bold text-foreground">Set a new password</h1>
        <p className="text-sm text-muted-foreground">Choose a password you will remember (min. 6 characters).</p>
      </div>

      <form onSubmit={(e) => void submit(e)} className="space-y-4 rounded-xl border border-border bg-surface p-6">
        <div>
          <label htmlFor="np" className="block text-sm text-muted-foreground mb-2">
            New password
          </label>
          <input
            id="np"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground"
          />
        </div>
        <div>
          <label htmlFor="npc" className="block text-sm text-muted-foreground mb-2">
            Confirm password
          </label>
          <input
            id="npc"
            type="password"
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            minLength={6}
            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground"
          />
        </div>
        <GoldButton
          type="submit"
          label={busy ? 'Saving…' : 'Save password'}
          className="w-full"
          disabled={busy}
        />
      </form>

      <p className="text-center text-sm">
        <Link href="/locksmith/login" className="text-gold hover:underline">
          Back to sign in
        </Link>
      </p>
    </div>
  )
}

export default function LocksmithResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-md px-4 py-12 animate-pulse h-40 bg-muted rounded-xl" />
      }
    >
      <ResetPasswordBody />
    </Suspense>
  )
}
