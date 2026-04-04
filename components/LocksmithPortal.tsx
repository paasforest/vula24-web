'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { LocksmithApplicationForm } from '@/app/for-locksmiths/application-form'
import { LOCKSMITH_LOGIN_URL } from '@/lib/constants'
import { GoldButton } from '@/components/GoldButton'
import { cn } from '@/lib/utils'

type Variant = 'page' | 'compact'

export function LocksmithPortal({ variant = 'compact' }: { variant?: Variant }) {
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
  const isPage = variant === 'page'

  return (
    <div id="portal" className={cn('scroll-mt-24', isPage ? 'max-w-xl mx-auto' : 'max-w-2xl mx-auto')}>
      {!isPage && (
        <div className="text-center mb-8">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-2">
            Log in or sign up
          </h2>
          <p className="text-muted-foreground">
            Log in to your dashboard, or sign up if you don&apos;t have an account yet.
          </p>
        </div>
      )}

      <div className="flex gap-0 border-b border-border mb-8" role="tablist" aria-label="Account type">
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'login'}
          onClick={() => setMode('login')}
          className={cn(
            'flex-1 py-3 text-sm font-heading font-semibold transition-colors border-b-2 -mb-px',
            mode === 'login'
              ? 'border-gold text-foreground'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          )}
        >
          Log in
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'signup'}
          onClick={() => setMode('signup')}
          className={cn(
            'flex-1 py-3 text-sm font-heading font-semibold transition-colors border-b-2 -mb-px',
            mode === 'signup'
              ? 'border-gold text-foreground'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          )}
        >
          Apply to join
        </button>
      </div>

      {mode === 'login' && (
        <div className="text-center px-0 md:px-2">
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-8">
            {loginUrl
              ? 'Use your Vula24 dashboard to manage leads, your profile, and subscription.'
              : 'Your dashboard login link is not configured on this environment yet. If you already have access, use the link we sent you by email or WhatsApp. New applicants can use Apply to join.'}
          </p>
          {loginUrl ? (
            <GoldButton
              label="Open dashboard"
              href={loginUrl}
              size="lg"
              className="w-full sm:w-auto min-w-[14rem]"
            />
          ) : null}
          <p className="text-sm text-muted-foreground mt-8 pt-6 border-t border-border">
            New to Vula24?{' '}
            <button
              type="button"
              onClick={() => setMode('signup')}
              className="text-gold font-medium hover:underline"
            >
              Submit an application
            </button>
          </p>
        </div>
      )}

      {mode === 'signup' && (
        <div id="signup" className="scroll-mt-24">
          <h2
            className={cn(
              'font-heading font-bold text-center mb-2',
              isPage ? 'text-xl md:text-2xl' : 'text-2xl'
            )}
          >
            Join Vula24 as a locksmith
          </h2>
          <p className="text-muted-foreground text-center text-sm md:text-base mb-8">
            About two minutes. We review and usually respond within 24 hours.
          </p>
          <LocksmithApplicationForm />
          <p className="text-center text-sm text-muted-foreground mt-8 pt-6 border-t border-border">
            Already approved?{' '}
            <button
              type="button"
              onClick={() => setMode('login')}
              className="text-gold font-medium hover:underline"
            >
              Log in to dashboard
            </button>
          </p>
        </div>
      )}
    </div>
  )
}
