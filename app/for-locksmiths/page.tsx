import { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { GoldButton } from '@/components/GoldButton'
import { LOCKSMITH_PORTAL_HREF } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Vula24 — For Locksmiths | Get more locksmith jobs',
  description:
    'Join the Vula24 network. Receive SMS leads from customers in Gauteng and Western Cape. Simple monthly plans, no commission.',
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
            Vula24 is a lead generation service. During launch, founding locksmiths
            join free — receive customer contact details by SMS, call them, quote
            the job and get paid your way.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <GoldButton label="Join as a Locksmith" href={LOCKSMITH_PORTAL_HREF} size="lg" />
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
                  'Launch period is free — no subscription while we grow the network. Later, founding members get locked-in preferential pricing.',
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

      <section
        id="pricing"
        className="py-16 md:py-24 px-4 border-t border-border bg-[#1A1A1A] scroll-mt-24"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <p className="inline-flex items-center rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-gold mb-6">
              Launch offer — Limited time
            </p>
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 text-balance">
              Free for founding locksmiths
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              We are building our network across Gauteng and Western Cape. Join
              now at no cost and be the first locksmith customers find in your
              area.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-10 md:mb-12">
            {[
              {
                title: '6 months free',
                body: 'No payment required during our launch period. Get leads, build your profile and grow your reputation — completely free.',
                icon: (
                  <svg
                    className="w-8 h-8"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                    <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
                  </svg>
                ),
              },
              {
                title: 'Founding member pricing',
                body: 'Locksmiths who join during launch lock in our lowest rate forever when paid plans launch. Early members always pay less.',
                icon: (
                  <svg
                    className="w-8 h-8"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M12 8v4M12 16h.01" />
                  </svg>
                ),
              },
              {
                title: 'Limited spots per city',
                body: 'We only accept a small number of locksmiths per city to ensure every member gets quality leads. Apply before your city fills up.',
                icon: (
                  <svg
                    className="w-8 h-8"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                  </svg>
                ),
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-xl border border-border bg-background/60 p-6 md:p-8 flex flex-col"
              >
                <div className="w-14 h-14 rounded-xl border border-gold/25 bg-gold/10 flex items-center justify-center text-gold mb-4">
                  {card.icon}
                </div>
                <h3 className="font-heading font-bold text-lg md:text-xl text-foreground mb-3">
                  {card.title}
                </h3>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed flex-1">
                  {card.body}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <GoldButton
              label="Apply Now — It's Free"
              href={`${LOCKSMITH_PORTAL_HREF}#apply`}
              size="lg"
              className="w-full sm:w-auto min-w-[240px]"
            />
            <p className="text-muted-foreground text-sm mt-4 max-w-md mx-auto">
              No credit card. No commitment. Cancel anytime during the free
              period.
            </p>
          </div>

          <hr className="border-border my-12 md:my-14" />

          <p className="text-center text-xs md:text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Paid plans will be introduced after the launch period. Founding
            members will receive 30 days notice and will always receive
            preferential pricing.
          </p>
        </div>
      </section>
    </main>
  )
}
