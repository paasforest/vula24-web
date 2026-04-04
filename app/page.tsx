import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { GoldButton } from '@/components/GoldButton'
import { RequestForm } from '@/components/RequestForm'
import { StickyMobileCTA } from '@/components/StickyMobileCTA'
import { CITIES } from '@/lib/constants'

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
                  Lead generation for locksmiths — Gauteng & Western Cape
                </span>
              </div>

              <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 text-balance">
                More jobs. Less admin.{' '}
                <span className="text-gold">Grow your locksmith business.</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg text-pretty">
                Vula24 is a lead generation service for South African locksmiths.
                Pay monthly to receive customer leads by SMS — no app, no wallet,
                no payment processing on our side.
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
                Vula24 connects customers who need a locksmith with independent
                professionals who subscribe to receive SMS leads. You stay in
                control of pricing and how you get paid — cash, EFT, whatever
                works for you.
              </p>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-gold font-heading font-bold">→</span>
                  You choose which leads to follow up.
                </li>
                <li className="flex gap-2">
                  <span className="text-gold font-heading font-bold">→</span>
                  Vula24 does not employ locksmiths or guarantee response times.
                </li>
                <li className="flex gap-2">
                  <span className="text-gold font-heading font-bold">→</span>
                  One flat monthly fee — we never take a cut from your jobs.
                </li>
              </ul>
              <div className="mt-6">
                <GoldButton
                  label="View pricing"
                  href="/pricing"
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
            Why locksmiths choose Vula24
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Jobs come to you',
                body: 'When a customer in your area needs a locksmith, we send their contact details straight to your phone via SMS. You decide whether to call them.',
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
                title: 'Simple and transparent',
                body: 'One flat monthly fee. No commission. No percentage taken from your jobs. What you earn is yours — always.',
                icon: (
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
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
            From sign-up to closing the deal — built around SMS leads.
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
                title: 'Get leads by SMS',
                description:
                  'When a customer near you needs a locksmith, we send their contact details to your phone by SMS.',
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                  </svg>
                ),
              },
              {
                step: '03',
                title: 'Get the lead, close the deal',
                description:
                  'We send you the customer contact details by SMS. You call them directly, do the job and get paid your way — cash, EFT, whatever works.',
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

      {/* For customers — intro */}
      <section id="customers" className="py-16 md:py-24 px-4 scroll-mt-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
            Need a locksmith right now?
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Tell us where you are and what you need. We find a verified locksmith
            in your area and send them your details. They will contact you directly.
          </p>
          <GoldButton label="Request a Locksmith" href="#request" size="lg" />
          <p className="text-xs text-muted-foreground max-w-xl mx-auto leading-relaxed mt-8">
            Vula24 is a lead generation service that connects customers with
            independent locksmith professionals. Locksmiths on the network are
            independent service providers. Vula24 does not employ locksmiths or
            guarantee response times.
          </p>
        </div>
      </section>

      {/* Customer request form */}
      <section id="request" className="py-16 md:py-24 px-4 bg-surface scroll-mt-24">
        <div className="max-w-xl mx-auto">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-4">
            Request a locksmith
          </h2>
          <p className="text-muted-foreground text-center mb-8">
            Fill in your details and we will find a verified locksmith in your area.
          </p>
          <RequestForm />
        </div>
      </section>

      {/* Coverage */}
      <section id="coverage" className="py-16 md:py-24 px-4 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-4">
            Where Vula24 locksmiths operate
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Our service is live in Gauteng and Western Cape. More provinces coming soon.
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
            Join locksmiths receiving SMS leads — apply in minutes, hear back within 24 hours.
          </p>
          <GoldButton label="Join as a Locksmith" href="/apply" size="lg" />
        </div>
      </section>

      <Footer />
      <StickyMobileCTA />
    </main>
  )
}
