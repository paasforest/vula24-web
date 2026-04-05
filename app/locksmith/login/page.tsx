'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Toaster, toast } from 'sonner'
import { GoldButton } from '@/components/GoldButton'
import { getVula24ApiBase } from '@/lib/vula24-api'
import { setLocksmithToken } from '@/lib/locksmith-auth-storage'

export default function LocksmithLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !password) {
      toast.error('Enter your email and password.')
      return
    }
    setBusy(true)
    try {
      const base = getVula24ApiBase()
      const res = await fetch(`${base}/api/auth/locksmith/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      })
      const j = (await res.json().catch(() => ({}))) as {
        error?: string
        token?: string
      }
      if (!res.ok) {
        toast.error(j.error ?? 'Sign in failed.')
        return
      }
      if (!j.token) {
        toast.error('Sign in failed.')
        return
      }
      setLocksmithToken(j.token)
      toast.success('Welcome back.')
      router.push('/locksmith/dashboard')
      router.refresh()
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
          Locksmith sign in
        </h1>
        <p className="text-sm text-muted-foreground">
          Use the email and password you chose when you applied to join Vula24.
        </p>
      </div>

      <form onSubmit={(e) => void submit(e)} className="space-y-4 rounded-xl border border-border bg-surface p-6">
        <div>
          <label htmlFor="lemail" className="block text-sm text-muted-foreground mb-2">
            Email
          </label>
          <input
            id="lemail"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground"
          />
        </div>
        <div>
          <label htmlFor="lpass" className="block text-sm text-muted-foreground mb-2">
            Password
          </label>
          <input
            id="lpass"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground"
          />
        </div>
        <GoldButton
          type="submit"
          label={busy ? 'Signing in…' : 'Sign in'}
          className="w-full"
          disabled={busy}
        />
      </form>

      <p className="text-center text-sm text-muted-foreground">
        New to Vula24?{' '}
        <Link href="/for-locksmiths/account" className="text-gold hover:underline">
          Apply to join
        </Link>
      </p>
      <p className="text-center text-xs text-muted-foreground">
        If you have a link from your SMS with a code, you can also{' '}
        <Link href="/locksmith/payment" className="text-gold hover:underline">
          open payment & proof
        </Link>{' '}
        and enter your customer code.
      </p>
    </div>
  )
}
