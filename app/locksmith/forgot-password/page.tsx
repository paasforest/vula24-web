'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Toaster, toast } from 'sonner'
import { GoldButton } from '@/components/GoldButton'
import { getVula24ApiBase } from '@/lib/vula24-api'

export default function LocksmithForgotPasswordPage() {
  const [value, setValue] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const v = value.trim()
    if (!v) {
      toast.error('Enter your email or phone number.')
      return
    }
    setBusy(true)
    try {
      const base = getVula24ApiBase()
      const body =
        v.includes('@') ? { email: v } : { phone: v }
      const res = await fetch(`${base}/api/auth/locksmith/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const j = (await res.json().catch(() => ({}))) as {
        error?: string
        message?: string
      }
      if (!res.ok) {
        toast.error(j.error ?? 'Something went wrong.')
        return
      }
      toast.success(
        j.message ??
          'If an account exists, check your phone for an SMS and your email for a link.'
      )
      setValue('')
    } catch {
      toast.error('Network error.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12 space-y-8">
      <Toaster richColors position="top-right" />
      <div className="text-center space-y-2">
        <h1 className="font-heading text-2xl font-bold text-foreground">
          Forgot password
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Enter the email or mobile number you used when you applied. We will send a reset link by{' '}
          <strong className="text-foreground">SMS</strong> to your phone and, if configured, by{' '}
          <strong className="text-foreground">email</strong>.
        </p>
      </div>

      <form onSubmit={(e) => void submit(e)} className="space-y-4 rounded-xl border border-border bg-surface p-6">
        <div>
          <label htmlFor="ident" className="block text-sm text-muted-foreground mb-2">
            Email or phone number
          </label>
          <input
            id="ident"
            type="text"
            autoComplete="username"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="you@example.com or 082 123 4567"
            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground"
          />
        </div>
        <GoldButton
          type="submit"
          label={busy ? 'Sending…' : 'Send reset link'}
          className="w-full"
          disabled={busy}
        />
      </form>

      <p className="text-center text-sm">
        <Link href="/locksmith/login" className="text-gold hover:underline">
          ← Back to sign in
        </Link>
      </p>
    </div>
  )
}
