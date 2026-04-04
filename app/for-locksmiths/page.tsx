import { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { GoldButton } from '@/components/GoldButton'
import { PRICING } from '@/lib/constants'
import { LocksmithApplicationForm } from './application-form'

export const metadata: Metadata = {
  title: 'Vula24 — For Locksmiths | Grow your business on the platform',
  description:
    'Vula24 is software for South African locksmiths: job requests, bookings and payments from your phone. Simple monthly plans.',
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
            The platform connects you with customers in your area. You choose
            your jobs, your prices and how you run your business — we provide the
            software.
          </p>
          <GoldButton label="Join as a Locksmith" href="#apply" size="lg" />
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 bg-surface">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-4">
            Simple monthly plans. No hidden fees.
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Pay one flat monthly fee plus a 25% platform fee added on top of
            each job. You always earn your full set price.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-8">
            {PRICING.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-background border rounded-xl p-8 ${
                  plan.featured ? 'border-gold' : 'border-border'
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-gold text-background text-xs font-bold px-3 py-1 rounded-full">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                <h3 className="font-heading font-bold text-2xl mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="font-heading font-bold text-4xl">{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-gold flex-shrink-0"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <GoldButton
                  label={plan.cta}
                  href="#apply"
                  size="md"
                  variant={plan.featured ? 'solid' : 'outline'}
                  className="w-full"
                />
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-muted-foreground max-w-lg mx-auto">
            All plans include a 14-day free trial. No credit card required to start.
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
                  'Customers in your area find you on the platform. You get notified and decide whether to accept.',
                icon: (
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                  </svg>
                ),
              },
              {
                title: 'Build your reputation',
                description:
                  'Your profile and reviews do the selling. The more you complete on the platform, the stronger your presence.',
                icon: (
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                ),
              },
              {
                title: 'Get paid faster',
                description:
                  'Payments run through the platform so you spend less time chasing invoices.',
                icon: (
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <path d="M2 10h20" />
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

      <section id="apply" className="py-16 md:py-24 px-4 bg-surface scroll-mt-24">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-4">
            Join Vula24 as a locksmith
          </h2>
          <p className="text-muted-foreground text-center mb-8">
            Apply takes 2 minutes. We review and activate your account within 24 hours.
          </p>
          <LocksmithApplicationForm />
        </div>
      </section>

      <Footer />
    </main>
  )
}
