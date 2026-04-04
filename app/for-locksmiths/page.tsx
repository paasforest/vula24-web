import { Metadata } from 'next'
import Link from 'next/link'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { GoldButton } from '@/components/GoldButton'
import { LOCKSMITH_PORTAL_HREF, LOCKSMITH_SIGNUP_HREF } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Vula24 — For Locksmiths | SMS lead generation',
  description:
    'Pay monthly to receive customer leads by SMS. No app — Vula24 connects you with jobs in Gauteng and Western Cape.',
}

export default function ForLocksmithsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Nav />

      <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 text-balance">
            More jobs. Less admin.{' '}
            <span className="text-gold">On Vula24.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Vula24 is a lead generation service. Subscribe monthly to receive
            customer contact details by SMS — you call them, quote the job and get
            paid your way.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <GoldButton label="Apply to join" href={LOCKSMITH_SIGNUP_HREF} size="lg" />
            <GoldButton label="View pricing" href="/pricing" size="lg" variant="outline" />
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            Already on the platform?{' '}
            <Link href={LOCKSMITH_PORTAL_HREF} className="text-gold font-medium hover:underline">
              Log in to your account
            </Link>
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-12">
            Built for locksmith business owners
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Jobs come to you',
                description:
                  'When a customer in your area needs a locksmith, we send their contact details straight to your phone via SMS. You decide whether to call them.',
                icon: (
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                  </svg>
                ),
              },
              {
                title: 'Build your reputation',
                description:
                  'Your profile, reviews and verified badge do the selling for you. The more jobs you complete, the more you earn.',
                icon: (
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                ),
              },
              {
                title: 'Simple and transparent',
                description:
                  'One flat monthly fee. No commission. No percentage taken from your jobs. What you earn is yours — always.',
                icon: (
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-20 h-20 bg-surface border border-border rounded-2xl flex items-center justify-center mx-auto mb-4 text-gold">
                  {item.icon}
                </div>
                <h3 className="font-heading font-bold text-xl mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 border-t border-border bg-surface/30">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading font-bold text-2xl md:text-3xl mb-4">
            Ready for dashboard access?
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Log in and manage your leads on a dedicated account page — separate from this overview.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <GoldButton label="Open account page" href={LOCKSMITH_PORTAL_HREF} size="lg" />
            <GoldButton
              label="Apply to join"
              href={LOCKSMITH_SIGNUP_HREF}
              size="lg"
              variant="outline"
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
