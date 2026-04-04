import { Suspense } from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { LocksmithPortal } from '@/components/LocksmithPortal'

export const metadata: Metadata = {
  title: 'Vula24 — Locksmith account | Log in or apply',
  description:
    'Log in to your locksmith dashboard or apply to receive SMS leads in Gauteng and Western Cape.',
}

function PortalFallback() {
  return (
    <div className="min-h-[24rem] flex items-center justify-center text-muted-foreground text-sm">
      Loading…
    </div>
  )
}

export default function LocksmithAccountPage() {
  return (
    <main className="min-h-screen bg-background">
      <Nav />

      <div className="relative border-b border-border">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(212,160,23,0.12),transparent)]"
          aria-hidden
        />
        <section className="relative pt-24 pb-10 md:pt-28 md:pb-12 px-4">
          <div className="max-w-3xl mx-auto">
            <nav className="text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
              <Link href="/for-locksmiths" className="hover:text-foreground transition-colors">
                For Locksmiths
              </Link>
              <span className="mx-2 text-border" aria-hidden>
                /
              </span>
              <span className="text-foreground font-medium">Account</span>
            </nav>
            <h1 className="font-heading font-bold text-3xl md:text-4xl tracking-tight mb-3">
              Locksmith account
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-xl leading-relaxed">
              Access your dashboard or submit an application to join the network. One place for
              members and new applicants.
            </p>
          </div>
        </section>
      </div>

      <section className="px-4 py-10 md:py-14">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl border border-border bg-surface/40 p-6 md:p-10 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.45)]">
            <Suspense fallback={<PortalFallback />}>
              <LocksmithPortal variant="page" />
            </Suspense>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-8">
            <Link href="/for-locksmiths" className="text-gold hover:underline">
              ← Back to For Locksmiths
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
