import Link from 'next/link'
import { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { LocksmithPortal } from '@/components/LocksmithPortal'

export const metadata: Metadata = {
  title: 'Vula24 — Join as a Locksmith',
  description:
    'Apply to join the Vula24 network. Receive SMS leads from customers in your area. Gauteng and Western Cape.',
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
              <span className="text-foreground font-medium">Apply</span>
            </nav>
            <h1 className="font-heading font-bold text-3xl md:text-4xl tracking-tight mb-3">
              Join Vula24 as a Locksmith
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-xl leading-relaxed">
              Fill in your details below. We will review your application and contact you on WhatsApp
              within 24 hours.
            </p>
          </div>
        </section>
      </div>

      <section id="apply" className="px-4 py-10 md:py-14 scroll-mt-24">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl border border-border bg-surface/40 p-6 md:p-10 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.45)]">
            <LocksmithPortal />
          </div>
          <p className="text-center text-sm text-muted-foreground mt-8">
            <Link href="/for-locksmiths" className="text-gold hover:underline">
              ← Back to For Locksmiths
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}
