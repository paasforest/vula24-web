import { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { GoldButton } from '@/components/GoldButton'
import { PRICING, CITIES } from '@/lib/constants'
import { LocksmithApplicationForm } from './application-form'

export const metadata: Metadata = {
  title: 'Vula24 — For Locksmiths | Join Our Network',
  description: 'Get more jobs with Vula24. We send you real jobs in your area. Founder pricing locked in for your first 3 months.',
}

export default function ForLocksmithsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Nav />

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 text-balance">
            Get more jobs with{' '}
            <span className="text-gold">Vula24</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            We send you real jobs in your area. Founder pricing — locked in for your first 3 months.
          </p>
          <GoldButton label="Apply Now" href="#apply" size="lg" />
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 md:py-24 px-4 bg-surface">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Choose the plan that works for your business
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
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
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-12">
            Why Join Vula24
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Only Pay for Real Leads',
                description: 'No wasted money on fake inquiries. Every job request is from a real customer who needs help.',
                icon: (
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M16 8h-6a2 2 0 100 4h4a2 2 0 110 4H8" />
                    <path d="M12 18V6" />
                  </svg>
                ),
              },
              {
                title: 'Jobs in Your Area',
                description: 'We only send you jobs that are within your coverage area. No long drives for nothing.',
                icon: (
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                ),
              },
              {
                title: 'Build Your Reputation',
                description: 'Get verified status and build trust with customers. Stand out from the competition.',
                icon: (
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
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

      {/* Application Form Section */}
      <section id="apply" className="py-16 md:py-24 px-4 bg-surface scroll-mt-24">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-4">
            Apply to Join
          </h2>
          <p className="text-muted-foreground text-center mb-8">
            Fill out the form below and we will be in touch within 24 hours.
          </p>
          <LocksmithApplicationForm />
        </div>
      </section>

      <Footer />
    </main>
  )
}
