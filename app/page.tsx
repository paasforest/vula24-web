import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { GoldButton } from '@/components/GoldButton'
import { StickyMobileCTA } from '@/components/StickyMobileCTA'
import { CITIES, PRICING } from '@/lib/constants'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Nav />

      {/* Hero */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-surface border border-border rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
                <span className="text-sm text-muted-foreground">
                  Software for locksmith businesses — Gauteng & Western Cape
                </span>
              </div>

              <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 text-balance">
                More jobs. Less admin.{' '}
                <span className="text-gold">Grow your locksmith business.</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg text-pretty">
                Vula24 is the platform South African locksmiths use to find new
                customers, manage bookings and get paid — all from their phone.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <GoldButton label="Join as a Locksmith" href="#apply" size="lg" />
                <GoldButton
                  label="See How It Works"
                  href="#how-it-works"
                  size="lg"
                  variant="outline"
                />
              </div>
            </div>

            <div className="bg-surface border border-border rounded-xl p-6 md:p-8">
              <h2 className="font-heading font-bold text-xl text-foreground mb-4">
                Built for owners, not corporates
              </h2>
              <p className="text-muted-foreground text-sm mb-6">
                Vula24 is a monthly subscription tool. The platform connects
                customers who need a locksmith with independent professionals on
                the network — you stay in control of pricing, jobs and your
                reputation.
              </p>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-gold font-heading font-bold">→</span>
                  You choose which job requests to accept.
                </li>
                <li className="flex gap-2">
                  <span className="text-gold font-heading font-bold">→</span>
                  Vula24 does not employ locksmiths or guarantee response times.
                </li>
                <li className="flex gap-2">
                  <span className="text-gold font-heading font-bold">→</span>
                  One flat monthly fee plus a small platform fee on jobs — you
                  set your rates.
                </li>
              </ul>
              <div className="mt-6">
                <GoldButton
                  label="View pricing"
                  href="#pricing"
                  size="md"
                  className="w-full sm:w-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value proposition */}
      <section className="py-16 md:py-24 px-4 bg-surface">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-12">
            Why locksmiths choose the platform
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Jobs come to you',
                body: 'Customers in your area find you on Vula24. You get notified instantly and decide whether to accept.',
                icon: (
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                  </svg>
                ),
              },
              {
                title: 'Build your reputation',
                body: 'Your profile, reviews and verified badge do the selling for you. The more jobs you complete, the more you earn.',
                icon: (
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                ),
              },
              {
                title: 'Get paid faster',
                body: 'Payments are handled through the platform. No more chasing cash or waiting to be paid.',
                icon: (
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <path d="M2 10h20" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div key={item.title} className="text-center bg-background border border-border rounded-xl p-6">
                <div className="w-20 h-20 bg-surface border border-border rounded-2xl flex items-center justify-center mx-auto mb-4 text-gold">
                  {item.icon}
                </div>
                <h3 className="font-heading font-bold text-xl mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works — locksmiths */}
      <section id="how-it-works" className="py-16 md:py-24 px-4 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-4">
            How Vula24 works for locksmiths
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            From sign-up to getting paid — built around your business.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Sign up',
                description:
                  'Create your profile, set your services and coverage area. Takes less than 10 minutes.',
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <line x1="20" y1="8" x2="20" y2="14" />
                    <line x1="23" y1="11" x2="17" y2="11" />
                  </svg>
                ),
              },
              {
                step: '02',
                title: 'Get job requests',
                description:
                  'When a customer near you needs a locksmith, you get notified on your phone. Accept or decline.',
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                  </svg>
                ),
              },
              {
                step: '03',
                title: 'Complete and get paid',
                description:
                  'Do the job, get paid through the app. Your rating grows with every 5-star review.',
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <path d="M22 4L12 14.01l-3-3" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div key={item.step} className="bg-surface border border-border rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 text-gold">
                  {item.icon}
                </div>
                <p className="text-gold font-heading font-bold text-sm mb-2">{item.step}</p>
                <h3 className="font-heading font-bold text-xl mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 md:py-24 px-4 bg-surface scroll-mt-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-4">
            Simple monthly plans. No hidden fees.
          </h2>
          <p className="text-muted-foreground text-center mb-4 max-w-2xl mx-auto">
            Pay one flat monthly fee plus a 25% platform fee on top of each job.
            You always earn your full set price.
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

      {/* For customers */}
      <section id="customers" className="py-16 md:py-24 px-4 scroll-mt-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
            Need a locksmith right now?
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Vula24 connects you with verified, reviewed locksmiths in your area.
            Download the app or browse locksmiths near you.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <GoldButton label="Download the App" href="#download" size="lg" />
            <GoldButton
              label="Browse Locksmiths"
              href="#coverage"
              size="lg"
              variant="outline"
            />
          </div>
          <p className="text-xs text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Vula24 is a platform that connects customers with independent locksmith
            professionals. All locksmiths on the network are independent service
            providers. Vula24 does not employ locksmiths or guarantee response times.
          </p>
        </div>
      </section>

      <section id="download" className="py-8 px-4 border-t border-border scroll-mt-24">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            Mobile apps for customers and locksmiths are rolling out across South Africa.
            Follow us on WhatsApp for launch updates in your city.
          </p>
        </div>
      </section>

      {/* Coverage */}
      <section id="coverage" className="py-16 md:py-24 px-4 bg-surface scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-4">
            Where Vula24 locksmiths operate
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Our platform is live in Gauteng and Western Cape. More provinces coming soon.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-background border border-border rounded-xl p-6">
              <h3 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
                <span className="w-3 h-3 bg-gold rounded-full" />
                Gauteng
              </h3>
              <div className="flex flex-wrap gap-2">
                {CITIES.gauteng.map((city) => (
                  <span
                    key={city}
                    className="bg-surface border border-border rounded-full px-3 py-1 text-sm text-muted-foreground"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-background border border-border rounded-xl p-6">
              <h3 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
                <span className="w-3 h-3 bg-gold rounded-full" />
                Western Cape
              </h3>
              <div className="flex flex-wrap gap-2">
                {CITIES.westernCape.map((city) => (
                  <span
                    key={city}
                    className="bg-surface border border-border rounded-full px-3 py-1 text-sm text-muted-foreground"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Apply CTA */}
      <section id="apply" className="py-16 md:py-24 px-4 scroll-mt-24">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
            Ready to grow with Vula24?
          </h2>
          <p className="text-muted-foreground mb-8">
            Join locksmiths on the platform — apply in minutes, get reviewed within 24 hours.
          </p>
          <GoldButton label="Join as a Locksmith" href="/apply" size="lg" />
        </div>
      </section>

      <Footer />
      <StickyMobileCTA />
    </main>
  )
}
