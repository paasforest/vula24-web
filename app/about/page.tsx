import { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { GoldButton } from '@/components/GoldButton'

export const metadata: Metadata = {
  title: 'Vula24 — About Us | Emergency Locksmith Services',
  description: 'Built in South Africa, for South Africans. Vula24 provides fast, reliable, trusted emergency locksmith services.',
}

const values = [
  {
    title: 'Speed',
    description: 'When you are locked out, every minute matters. We prioritize fast response times so you are never left waiting.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: 'Trust',
    description: 'We only work with verified professionals. You can trust that the person coming to help you is legitimate and skilled.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Reliability',
    description: 'Day or night, weekday or weekend — we are always available. When you need help, we will be there.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Nav />

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 text-balance">
            Built in South Africa,{' '}
            <span className="text-gold">for South Africans</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            We understand the urgency of being locked out. That is why we built Vula24 — to provide fast, reliable access when you need it most.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24 px-4 bg-surface">
        <div className="max-w-4xl mx-auto">
          <div className="bg-background border border-border rounded-xl p-8 md:p-12">
            <h2 className="font-heading font-bold text-2xl md:text-3xl mb-6 text-center">
              Our Mission
            </h2>
            <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
              To provide fast, reliable, and trusted emergency locksmith services across South Africa. When you are locked out, you should not have to worry about finding help. Vula24 is here to make that easy.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-12">
            What We Stand For
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

      {/* Story Section */}
      <section className="py-16 md:py-24 px-4 bg-surface">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-bold text-2xl md:text-3xl mb-6 text-center">
            Why Vula24?
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              {'"Vula"'} means {'"open"'} in Zulu. It is a simple word that captures what we do — we help you get back in when you are locked out.
            </p>
            <p>
              The {'"24"'} represents our commitment to being available around the clock. Emergencies do not wait for business hours, and neither do we.
            </p>
            <p>
              We built Vula24 because we saw too many people struggling to find reliable help in emergency situations. Our goal is to make that process as simple and stress-free as possible.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
            Need help right now?
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            We are here for you, 24 hours a day, 7 days a week.
          </p>
          <GoldButton label="Get Help Now" href="/#request" size="lg" />
        </div>
      </section>

      <Footer />
    </main>
  )
}
