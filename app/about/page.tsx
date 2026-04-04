import { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { GoldButton } from '@/components/GoldButton'
import { LOCKSMITH_PORTAL_HREF } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Vula24 — About | Built in South Africa',
  description:
    'Vula24 connects customers with verified locksmiths across Gauteng and Western Cape. Fast, trusted, available 24/7.',
}

const values = [
  {
    title: 'Speed',
    description:
      'When you are locked out, every minute counts. We built Vula24 around fast response — connecting you with help in minutes, not hours.',
  },
  {
    title: 'Trust',
    description:
      'Every locksmith on our network is verified and rated by real customers. You always know who is coming.',
  },
  {
    title: 'Reliability',
    description:
      'Available 24 hours a day, 7 days a week. Emergencies do not keep office hours and neither do we.',
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Nav />

      <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 text-balance">
            Built in South Africa,
            <br />
            <span className="text-gold">for South Africans.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            We believe getting a trusted locksmith should be fast, simple, and stress-free — wherever you are in South Africa.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-12">
            What we stand for
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="border-l-2 border-gold pl-6"
              >
                <h3 className="font-heading font-bold text-xl mb-2 text-foreground">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
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
            Are you a locksmith?
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Join the Vula24 network and receive jobs in your area directly to your phone.
          </p>
          <GoldButton label="Join as a Locksmith" href={LOCKSMITH_PORTAL_HREF} size="lg" />
        </div>
      </section>

      <Footer />
    </main>
  )
}
