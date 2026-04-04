import { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { GoldButton } from '@/components/GoldButton'
import { CITIES } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Vula24 — Coverage Areas | Emergency Locksmith Services',
  description: 'Vula24 emergency locksmith services available across Gauteng and Western Cape. Johannesburg, Pretoria, Cape Town, and more.',
}

export default function CoveragePage() {
  return (
    <main className="min-h-screen bg-background">
      <Nav />

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 text-balance">
            Available Across{' '}
            <span className="text-gold">South Africa</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            We are currently operating in Gauteng and Western Cape, with more provinces coming soon.
          </p>
        </div>
      </section>

      {/* Gauteng Section */}
      <section className="py-16 md:py-24 px-4 bg-surface">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-4 h-4 bg-gold rounded-full" />
            <h2 className="font-heading font-bold text-2xl md:text-3xl">
              Gauteng
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CITIES.gauteng.map((city) => (
              <div
                key={city}
                className="bg-background border border-border rounded-xl p-4 text-center hover:border-gold transition-colors"
              >
                <p className="font-medium">{city}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Western Cape Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-4 h-4 bg-gold rounded-full" />
            <h2 className="font-heading font-bold text-2xl md:text-3xl">
              Western Cape
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CITIES.westernCape.map((city) => (
              <div
                key={city}
                className="bg-surface border border-border rounded-xl p-4 text-center hover:border-gold transition-colors"
              >
                <p className="font-medium">{city}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-16 md:py-24 px-4 bg-surface">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading font-bold text-2xl md:text-3xl mb-4">
            More Cities Coming Soon
          </h2>
          <p className="text-muted-foreground mb-8">
            We are expanding to KwaZulu-Natal, Eastern Cape, and more provinces. Want us in your area? Let us know.
          </p>
          <GoldButton label="Contact Us" href="/contact" size="md" variant="outline" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
            Need a locksmith now?
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            If you are in one of our coverage areas, we can have someone to you in minutes.
          </p>
          <GoldButton label="Get Help Now" href="/#request" size="lg" />
        </div>
      </section>

      <Footer />
    </main>
  )
}
