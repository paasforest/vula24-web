import { Metadata } from 'next'
import Link from 'next/link'
import { Nav } from '@/components/Nav'
import { GoldButton } from '@/components/GoldButton'
import { RequestForm } from '@/components/RequestForm'
import { StickyMobileCTA } from '@/components/StickyMobileCTA'
import { WESTERN_CAPE_LOCATIONS } from '@/lib/locations'
import { CONTACT } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Locksmith Western Cape | 24/7 Emergency Locksmith Services',
  description:
    'Need a locksmith in Western Cape? Vula24 connects you with verified locksmiths across Cape Town, Stellenbosch, Bellville and all of Western Cape. Available 24/7, fast response.',
  keywords: [
    'locksmith Western Cape',
    'emergency locksmith Western Cape',
    'locksmith Cape Town',
    'locksmith Stellenbosch',
    '24 hour locksmith Western Cape',
    'locksmith near me Western Cape',
  ],
  alternates: {
    canonical: 'https://www.vula24.co.za/locksmith-western-cape',
  },
  openGraph: {
    title: 'Locksmith Western Cape | Vula24 — 24/7 Emergency Service',
    description:
      'Verified locksmiths across all of Western Cape. Fast response, available 24/7.',
    url: 'https://www.vula24.co.za/locksmith-western-cape',
  },
}

export default function LocksmithWesternCapePage() {
  return (
    <main className="min-h-screen bg-background">
      <Nav />

      <section className="pt-24 pb-16 md:pt-32 md:pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-surface border border-border rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground">
              Available across all of Western Cape — 24/7
            </span>
          </div>
          <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
            Emergency Locksmith in{' '}
            <span className="text-gold">Western Cape</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Verified locksmiths available 24/7 across Cape Town, Stellenbosch,
            Bellville and all of Western Cape. Fast response, no hidden fees.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <GoldButton label="Get Help Now →" href="#request" size="lg" />
            <GoldButton
              label="Call Now"
              href={`tel:${CONTACT.phone}`}
              size="lg"
              variant="outline"
            />
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-surface border-t border-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-center mb-4">
            All areas we cover in Western Cape
          </h2>
          <p className="text-muted-foreground text-center mb-10">
            Click your area for local locksmith information
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {WESTERN_CAPE_LOCATIONS.map((loc) => (
              <Link
                key={loc.slug}
                href={`/locksmith-${loc.slug}`}
                className="bg-background border border-border rounded-xl p-4 text-center hover:border-gold transition-colors group"
              >
                <p className="font-medium group-hover:text-gold transition-colors">
                  {loc.name}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Find a locksmith →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-center mb-10">
            Locksmith services across Western Cape
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '🚗',
                title: 'Car lockout',
                desc: 'Locked out of your car anywhere in Western Cape? We dispatch a locksmith to you fast.',
              },
              {
                icon: '🏠',
                title: 'House lockout',
                desc: 'Locked out of your home in Western Cape? Available 24/7 including nights and weekends.',
              },
              {
                icon: '🔑',
                title: 'Lost car key',
                desc: 'Lost your car keys in Western Cape? We cut and programme replacement keys on site.',
              },
              {
                icon: '🔧',
                title: 'Lock repair',
                desc: 'Broken lock in Western Cape? Our locksmiths repair and replace all lock types.',
              },
              {
                icon: '🔐',
                title: 'Safe opening',
                desc: 'Forgotten your safe combination? Our Western Cape specialists can help.',
              },
              {
                icon: '⚡',
                title: '24/7 emergency',
                desc: 'Emergency locksmith in Western Cape available any time, day or night.',
              },
            ].map((s) => (
              <div
                key={s.title}
                className="bg-surface border border-border rounded-xl p-6"
              >
                <div className="text-2xl mb-3">{s.icon}</div>
                <h3 className="font-heading font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="request"
        className="py-16 md:py-24 px-4 bg-surface border-t border-border scroll-mt-24"
      >
        <div className="max-w-xl mx-auto">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-4">
            Request a locksmith in Western Cape
          </h2>
          <p className="text-muted-foreground text-center mb-8">
            Fill in your details and we will find the nearest verified locksmith
            in your area.
          </p>
          <RequestForm />
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Vula24',
            '@id': 'https://www.vula24.co.za',
            url: 'https://www.vula24.co.za/locksmith-western-cape',
            telephone: CONTACT.phone,
            description:
              'Emergency locksmith services across Western Cape. Available 24/7.',
            areaServed: {
              '@type': 'State',
              name: 'Western Cape',
              containedInPlace: {
                '@type': 'Country',
                name: 'South Africa',
              },
            },
            serviceType: 'Locksmith',
            openingHours: 'Mo-Su 00:00-24:00',
            priceRange: '$$',
          }),
        }}
      />

      <StickyMobileCTA />
    </main>
  )
}
