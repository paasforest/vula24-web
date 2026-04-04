import { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { GoldButton } from '@/components/GoldButton'
import { PRICING } from '@/lib/constants'
import { LocksmithApplicationForm } from './application-form'

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
          <GoldButton label="Join as a Locksmith" href="#apply" size="lg" />
        </div>
      </section>

      <section id="pricing" className="py-16 md:py-24 px-4 bg-surface scroll-mt-24">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl border border-border bg-background p-6 md:p-10 lg:p-12">
            <div className="text-center mb-10 md:mb-12 max-w-2xl mx-auto">
              <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4 text-balance">
                Simple monthly plans. No hidden fees.
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                One flat monthly fee. We never take a cut from your jobs.
              </p>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mt-2">
                You keep 100% of what you earn from every customer.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto mb-8">
              {PRICING.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative flex flex-col rounded-xl border p-6 md:p-8 ${
                    plan.featured
                      ? 'border-gold bg-surface/80 shadow-[0_0_0_1px_rgba(212,160,23,0.15)]'
                      : 'border-border bg-surface/40'
                  }`}
                >
                  {plan.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-gold text-background text-xs font-bold px-3 py-1 rounded-full">
                        MOST POPULAR
                      </span>
                    </div>
                  )}
                  <h3 className="font-heading font-bold text-2xl mb-1">{plan.name}</h3>
                  <div className="mb-6 pb-6 border-b border-border">
                    <span className="font-heading font-bold text-4xl tracking-tight">
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground text-xl font-medium">
                      /{plan.period}
                    </span>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-gold flex-shrink-0 mt-0.5"
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                        <span className="text-muted-foreground leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <GoldButton
                    label={plan.cta}
                    href="#apply"
                    size="md"
                    variant={plan.featured ? 'solid' : 'outline'}
                    className="w-full mt-auto"
                  />
                </div>
              ))}
            </div>

            <p className="text-center text-sm text-muted-foreground max-w-lg mx-auto pt-2 border-t border-border">
              All plans include a 14-day free trial. No credit card required to start.
            </p>
          </div>
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
