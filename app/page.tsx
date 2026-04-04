import { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { GoldButton } from '@/components/GoldButton'
import { RequestForm } from '@/components/RequestForm'
import { StickyMobileCTA } from '@/components/StickyMobileCTA'
import { CITIES, CONTACT } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Vula24 — Emergency Locksmith Services | Gauteng & Western Cape',
  description:
    'Get a verified locksmith in minutes. 24/7 emergency locksmith services across Gauteng and Western Cape. Fast response, no hidden fees.',
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Nav />

      {/* Hero — customers */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-surface border border-border rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground">
              Available in Gauteng & Western Cape — 24/7
            </span>
          </div>

          <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 text-balance">
            A locksmith.
            <br />
            Near you.
            <br />
            <span className="text-gold">Now.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg text-pretty">
            24/7 emergency locksmith services across South Africa. Verified professionals, no surprises.
          </p>

          <div className="flex flex-wrap gap-4 mb-8">
            <GoldButton label="Get Help Now →" href="#request" size="lg" />
            <GoldButton
              label="Call Now"
              href={`tel:${CONTACT.phone}`}
              size="lg"
              variant="outline"
            />
          </div>

          <div className="flex flex-wrap items-center gap-4 md:gap-0 text-sm text-muted-foreground">
            <div className="flex items-center gap-2 md:gap-4">
              <div>
                <span className="font-heading font-bold text-foreground">15 min</span>
                <span className="text-muted-foreground"> — Avg response</span>
              </div>
              <span className="hidden md:inline w-px h-4 bg-border shrink-0" aria-hidden />
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              <div>
                <span className="font-heading font-bold text-foreground">200+</span>
                <span className="text-muted-foreground"> — Jobs done</span>
              </div>
              <span className="hidden md:inline w-px h-4 bg-border shrink-0" aria-hidden />
            </div>
            <div>
              <span className="font-heading font-bold text-foreground">4.9 ★</span>
              <span className="text-muted-foreground"> — Avg rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* How it works — customers */}
      <section id="how-it-works" className="py-16 md:py-24 px-4 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative bg-surface border border-border rounded-xl p-6">
              <p className="text-5xl md:text-6xl font-heading font-bold text-muted-foreground/30 absolute top-4 right-4 leading-none">
                01
              </p>
              <div className="w-14 h-14 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold mb-4 relative z-10">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
                </svg>
              </div>
              <h3 className="font-heading font-bold text-xl mb-2 relative z-10">Request help</h3>
              <p className="text-muted-foreground text-sm relative z-10">
                Fill in the quick form below or call us directly. Tell us where you are and what you need.
              </p>
            </div>

            <div className="relative bg-surface border border-border rounded-xl p-6">
              <p className="text-5xl md:text-6xl font-heading font-bold text-muted-foreground/30 absolute top-4 right-4 leading-none">
                02
              </p>
              <div className="w-14 h-14 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold mb-4 relative z-10">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <h3 className="font-heading font-bold text-xl mb-2 relative z-10">Matched instantly</h3>
              <p className="text-muted-foreground text-sm relative z-10">
                We connect you with the nearest available verified locksmith in your area. Expect a call within minutes.
              </p>
            </div>

            <div className="relative bg-surface border border-border rounded-xl p-6">
              <p className="text-5xl md:text-6xl font-heading font-bold text-muted-foreground/30 absolute top-4 right-4 leading-none">
                03
              </p>
              <div className="w-14 h-14 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold mb-4 relative z-10">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <path d="M22 4L12 14.01l-3-3" />
                </svg>
              </div>
              <h3 className="font-heading font-bold text-xl mb-2 relative z-10">Job done</h3>
              <p className="text-muted-foreground text-sm relative z-10">
                Your locksmith arrives and solves the problem. No hidden fees, no surprises — just back inside.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust — customers */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4 bg-background border border-border rounded-xl p-6">
              <div className="w-14 h-14 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shrink-0">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg mb-2">Verified locksmiths</h3>
                <p className="text-muted-foreground text-sm">
                  Every locksmith is background-checked and rated by real customers before they join.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-background border border-border rounded-xl p-6">
              <div className="w-14 h-14 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shrink-0">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg mb-2">Fast response</h3>
                <p className="text-muted-foreground text-sm">
                  Average 15-minute response time. We hold our network accountable to that standard.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-background border border-border rounded-xl p-6">
              <div className="w-14 h-14 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shrink-0">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                </svg>
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg mb-2">Available 24/7</h3>
                <p className="text-muted-foreground text-sm">
                  Emergencies don&apos;t keep office hours. We are here at 2am on a Sunday.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Request form — customers */}
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

      {/* For locksmiths */}
      <section className="py-16 md:py-24 px-4 bg-surface border-t border-border">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm font-heading font-bold text-gold uppercase tracking-wide mb-2">For locksmiths</p>
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">Get more jobs with Vula24</h2>
            <p className="text-muted-foreground mb-6 max-w-lg">
              Receive jobs in your area directly to your phone. Simple monthly plans, no commission ever.
            </p>
            <GoldButton label="Learn More →" href="/for-locksmiths" size="lg" />
          </div>
          <ul className="space-y-3 text-muted-foreground text-sm">
            <li className="flex gap-2">
              <span className="text-gold font-heading font-bold shrink-0">→</span>
              Jobs sent straight to your phone
            </li>
            <li className="flex gap-2">
              <span className="text-gold font-heading font-bold shrink-0">→</span>
              You set your own prices
            </li>
            <li className="flex gap-2">
              <span className="text-gold font-heading font-bold shrink-0">→</span>
              One flat monthly fee
            </li>
          </ul>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
            Need help right <span className="text-gold">now?</span>
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Don&apos;t wait. A verified locksmith is ready in your area.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <GoldButton label="Get Help Now →" href="#request" size="lg" />
            <GoldButton
              label="WhatsApp Us"
              href={`https://wa.me/${CONTACT.whatsapp}`}
              size="lg"
              variant="outline"
            />
          </div>
        </div>
      </section>

      <Footer />
      <StickyMobileCTA />
    </main>
  )
}
