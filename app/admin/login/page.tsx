'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { GoldButton } from '@/components/GoldButton'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/admin/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (!res.ok) {
        setError('Invalid password.')
        setLoading(false)
        return
      }
      router.push('/admin')
      router.refresh()
    } catch {
      setError('Could not sign in.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 rounded-xl border border-border bg-surface p-8"
      >
        <h1 className="font-heading text-xl font-semibold text-foreground">
          Admin sign-in
        </h1>
        <p className="text-sm text-muted-foreground">
          This page is not linked from the public site. Use the password from your deployment env.
        </p>
        <div>
          <label htmlFor="admin-pw" className="sr-only">
            Password
          </label>
          <input
            id="admin-pw"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-gold"
            placeholder="Password"
          />
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <GoldButton
          type="submit"
          label={loading ? 'Signing in…' : 'Sign in'}
          className="w-full"
          disabled={loading}
        />
      </form>
    </div>
  )
}
