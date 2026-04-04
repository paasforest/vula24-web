'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { LocksmithApplicationForm } from '@/app/for-locksmiths/application-form'
import { LOCKSMITH_LOGIN_URL } from '@/lib/constants'
import { GoldButton } from '@/components/GoldButton'
import { cn } from '@/lib/utils'

export function LocksmithPortal() {
  const searchParams = useSearchParams()
  const [mode, setMode] = useState<'login' | 'signup'>('login')

  useEffect(() => {
    if (searchParams.get('signup') === '1') {
      setMode('signup')
    }
  }, [searchParams])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.location.hash === '#signup') {
      setMode('signup')
    }
  }, [])

  const loginUrl = LOCKSMITH_LOGIN_URL || ''

  return (
    <section id="portal" className="max-w-2xl mx-auto scroll-mt-24">
      <div className="text-center mb-8">
        <h2 className="font-heading font-bold text-3xl md:text-4xl mb-2">
          Log in or sign up
        </h2>
        <p className="text-muted-foreground">
          Log in to your dashboard, or sign up if you don&apos;t have an account yet.
        </p>
      </div>

      <div className="flex rounded-lg border border-border bg-surface p-1 mb-8">
        <button
          type="button"
          onClick={() => setMode('login')}
          className={cn(
            'flex-1 py-2.5 text-sm font-heading font-bold rounded-md transition-colors',
            mode === 'login'
              ? 'bg-gold text-background'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          Log in
        </button>
        <button
          type="button"
          onClick={() => setMode('signup')}
          className={cn(
            'flex-1 py-2.5 text-sm font-heading font-bold rounded-md transition-colors',
            mode === 'signup'
              ? 'bg-gold text-background'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          Sign up
        </button>
      </div>

      {mode === 'login' && (
        <div className="rounded-xl border border-border bg-background p-6 md:p-8 text-center">
          <p className="text-muted-foreground mb-6">
            {loginUrl
              ? 'Open your locksmith dashboard to manage leads and your profile.'
              : 'Dashboard login is not configured on this site yet. New to Vula24? Use Sign up to apply — we will send you access after approval.'}
          </p>
          {loginUrl ? (
            <GoldButton
              label="Open dashboard login"
              href={loginUrl}
              size="lg"
              className="w-full sm:w-auto"
            />
          ) : null}
          <p className="text-sm text-muted-foreground mt-6">
            Don&apos;t have an account?{' '}
            <button
              type="button"
              onClick={() => setMode('signup')}
              className="text-gold font-medium hover:underline"
            >
              Sign up here
            </button>
          </p>
        </div>
      )}

      {mode === 'signup' && (
        <div id="signup" className="scroll-mt-24">
          <h2 className="font-heading font-bold text-2xl mb-2 text-center">
            Join Vula24 as a locksmith
          </h2>
          <p className="text-muted-foreground text-center mb-8">
            Apply takes 2 minutes. We review and activate your account within 24 hours.
          </p>
          <LocksmithApplicationForm />
          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => setMode('login')}
              className="text-gold font-medium hover:underline"
            >
              Log in
            </button>
          </p>
        </div>
      )}
    </section>
  )
}
