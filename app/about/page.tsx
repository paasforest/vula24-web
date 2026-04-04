import { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { GoldButton } from '@/components/GoldButton'
import { LOCKSMITH_PORTAL_HREF } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Vula24 — About | Lead generation for locksmiths',
  description:
    'Vula24 connects customers with locksmiths through SMS leads. Built in South Africa for independent professionals.',
}

const values = [
  {
    title: 'Clarity',
    description:
      'We are upfront that Vula24 is a lead generation service — not a locksmith brand. Locksmiths on the network are independent owners who subscribe for SMS leads.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4M12 8h.01" />
      </svg>
    ),
  },
  {
    title: 'Trust',
    description:
      'Profiles, reviews and verification help customers choose with confidence. Professionals build reputation on the platform over time.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Independence',
    description:
      'You set your coverage, your prices and which jobs you take. The platform connects demand with supply — it does not replace your business.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Nav />

      <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 text-balance">
            Built in South Africa,{' '}
            <span className="text-gold">for South African locksmiths</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Vula24 is a lead generation service. We connect customers who need a
            locksmith with independent professionals who subscribe to receive SMS
            leads in their area.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 bg-surface">
        <div className="max-w-4xl mx-auto">
          <div className="bg-background border border-border rounded-xl p-8 md:p-12">
            <h2 className="font-heading font-bold text-2xl md:text-3xl mb-6 text-center">
              What we do
            </h2>
            <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
              Locksmiths pay a monthly fee to receive customer contact details by
              SMS. There is no app, no wallet and no payment processing through
              Vula24 — you agree the job and payment directly with the customer.
              We are not a locksmith employer and we do not guarantee response
              times.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-12">
            What we stand for
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="w-20 h-20 bg-surface border border-border rounded-2xl flex items-center justify-center mx-auto mb-4 text-gold">
                  {value.icon}
                </div>
                <h3 className="font-heading font-bold text-xl mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 bg-surface">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-bold text-2xl md:text-3xl mb-6 text-center">
            The name
          </h2>
          <div className="space-y-4 text-muted-foreground text-center">
            <p>
              {'"Vula"'} means {'"open"'} in Zulu — fitting for a product built
              around access and opportunity.
            </p>
            <p>
              The {'"24"'} reflects real-world urgency — many lockouts happen
              outside normal hours, and SMS leads help locksmiths respond when
              they are on the road.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
            Use the platform for your business
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Apply in a few minutes. We review and get back to you on WhatsApp.
          </p>
          <GoldButton label="Join as a Locksmith" href={LOCKSMITH_PORTAL_HREF} size="lg" />
        </div>
      </section>

      <Footer />
    </main>
  )
}
