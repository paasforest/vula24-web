import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Nav } from '@/components/Nav'
import { GoldButton } from '@/components/GoldButton'
import { RequestForm } from '@/components/RequestForm'
import { StickyMobileCTA } from '@/components/StickyMobileCTA'
import { getLocationBySlug, ALL_LOCATIONS } from '@/lib/locations'
import { CONTACT } from '@/lib/constants'

interface Props {
  params: Promise<{ city: string }>
}

/** Only slugs from generateStaticParams resolve — avoids thin catch-all pages. */
export const dynamicParams = false

export async function generateStaticParams() {
  return ALL_LOCATIONS.map((loc) => ({
    city: loc.slug,
  }))
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { city } = await params
  const location = getLocationBySlug(city)
  if (!location) return {}
  return {
    title: `Locksmith ${location.name} | 24/7 Emergency Locksmith Services`,
    description: `Need a locksmith in ${location.name}? Vula24 connects you with verified locksmiths in ${location.name} fast. Available 24/7, no hidden fees.`,
    keywords: [
      `locksmith ${location.name}`,
      `emergency locksmith ${location.name}`,
      `locksmith near me ${location.name}`,
      `24 hour locksmith ${location.name}`,
      `${location.name} locksmith`,
      `car lockout ${location.name}`,
      `house lockout ${location.name}`,
    ],
    alternates: {
      canonical: `https://www.vula24.co.za/locksmith-${location.slug}`,
    },
    openGraph: {
      title: `Locksmith ${location.name} | Vula24`,
      description: `Verified locksmiths in ${location.name}. Fast response, available 24/7.`,
      url: `https://www.vula24.co.za/locksmith-${location.slug}`,
    },
  }
}

function suburbCoverageParagraph(location: {
  name: string
  suburbs: string[]
  nearbyAreas: string[]
}) {
  const top = location.suburbs.slice(0, 6).join(', ')
  const near = location.nearbyAreas.join(', ')
  return (
    <p className="text-muted-foreground leading-relaxed text-[15px]">
      We provide locksmith services across {location.name}, including {top}
      {location.suburbs.length > 6 ? ', and other suburbs' : ''}. We also
      regularly assist in nearby areas such as {near}. Not listed? Request a
      call-back — we confirm coverage for your street or complex.
    </p>
  )
}

export default async function CityPage({ params }: Props) {
  const { city } = await params
  const location = getLocationBySlug(city)
  if (!location) notFound()

  return (
    <main className="min-h-screen bg-background">
      <Nav />

      <div className="pt-20 px-4 max-w-5xl mx-auto">
        <nav
          className="text-sm text-muted-foreground py-4"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span className="mx-2">›</span>
          <Link
            href={`/locksmith-${location.provinceSlug}`}
            className="hover:text-foreground transition-colors"
          >
            {location.province}
          </Link>
          <span className="mx-2">›</span>
          <span className="text-foreground">{location.name}</span>
        </nav>
      </div>

      <section className="pb-16 md:pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-surface border border-border rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground">
              Available in {location.name} — 24/7
            </span>
          </div>
          <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-4">
            24 Hour Emergency Locksmith in{' '}
            <span className="text-gold">{location.name}</span>
          </h1>
          <p className="text-base text-muted-foreground mb-4 max-w-2xl mx-auto italic">
            {location.tagline}
          </p>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {location.description} Fast response, verified professionals, no
            hidden fees.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-6">
            <GoldButton label="Get Help Now →" href="#request" size="lg" />
            <GoldButton
              label="Call Now"
              href={`tel:${CONTACT.phone}`}
              size="lg"
              variant="outline"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Verified locksmiths · Fast response · Available 24/7
          </p>
        </div>
      </section>

      <section className="py-12 px-4 bg-surface border-y border-border">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-bold text-xl md:text-2xl mb-3 text-center">
            Covering {location.name} and surrounding areas
          </h2>
          {suburbCoverageParagraph(location)}
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-bold text-xl md:text-2xl mb-4 text-center">
            When you might need a locksmith in {location.name}
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground text-[15px] leading-relaxed">
            <li>
              You are locked out of your car, or keys are visible inside the
              vehicle
            </li>
            <li>
              House or apartment keys are lost, stolen, or left inside the
              property
            </li>
            <li>
              A lock is jammed, damaged after a break-in attempt, or a key has
              snapped in the cylinder
            </li>
            <li>
              You need a spare key cut, a remote programmed, or a safe opened
              by a verified professional
            </li>
          </ul>
        </div>
      </section>

      <section className="py-16 px-4 bg-surface border-t border-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-center mb-4">
            Locksmith services in {location.name}
          </h2>
          <p className="text-muted-foreground text-center mb-10">
            Our locksmiths in {location.name} handle all types of lock and key
            emergencies — tap a service for more detail.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Car lockout',
                slug: 'car-lockout' as const,
                desc: `Locked out of your car in ${location.name}? We dispatch a locksmith to your exact location fast.`,
                icon: '🚗',
                urgency: 'Emergency',
              },
              {
                title: 'House lockout',
                slug: 'house-lockout' as const,
                desc: `Locked out of your home in ${location.name}? Our locksmiths are available 24/7 including nights and weekends.`,
                icon: '🏠',
                urgency: 'Emergency',
              },
              {
                title: 'Lost car key replacement',
                slug: 'lost-car-key' as const,
                desc: `Lost your car keys in ${location.name}? We cut and programme replacement keys on site.`,
                icon: '🔑',
                urgency: 'Urgent',
              },
              {
                title: 'Lock repair and replacement',
                slug: 'lock-repair' as const,
                desc: `Broken or damaged lock in ${location.name}? We repair and replace all lock types same day.`,
                icon: '🔧',
                urgency: 'Flexible',
              },
              {
                title: 'Safe opening',
                slug: 'safe-opening' as const,
                desc: `Forgotten your safe combination in ${location.name}? Our specialists can open and reset it.`,
                icon: '🔐',
                urgency: 'Urgent',
              },
              {
                title: '24/7 emergency service',
                slug: null,
                desc: `Emergency locksmith in ${location.name} available any time — midnight, weekends, public holidays.`,
                icon: '⚡',
                urgency: 'Emergency',
              },
            ].map((s) => (
              <div
                key={s.title}
                className="bg-background border border-border rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{s.icon}</span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      s.urgency === 'Emergency'
                        ? 'bg-red-500/10 text-red-400'
                        : s.urgency === 'Urgent'
                          ? 'bg-amber-500/10 text-amber-400'
                          : 'bg-green-500/10 text-green-400'
                    }`}
                  >
                    {s.urgency}
                  </span>
                </div>
                {s.slug ? (
                  <Link href={`/services/${s.slug}`} className="group block">
                    <h3 className="font-heading font-bold text-lg mb-2 group-hover:text-gold transition-colors">
                      {s.title} →
                    </h3>
                  </Link>
                ) : (
                  <h3 className="font-heading font-bold text-lg mb-2">
                    {s.title}
                  </h3>
                )}
                <p className="text-muted-foreground text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-center mb-4">
            Recent locksmith jobs in {location.name}
          </h2>
          <p className="text-muted-foreground text-center mb-10">
            Real jobs completed by Vula24 locksmiths in {location.name}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {location.recentJobs.map((job, i) => (
              <div
                key={`${job.suburb}-${i}`}
                className="bg-surface border border-border rounded-xl p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gold font-heading font-bold text-sm">
                    ✓ {job.service}
                  </span>
                  <span className="text-xs text-muted-foreground bg-background border border-border px-2 py-1 rounded-full">
                    {job.timeAgo}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  📍 {job.suburb}
                </p>
                <p className="text-xs text-muted-foreground mt-1 italic">
                  {job.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-surface border-t border-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-center mb-4">
            Areas covered in {location.name}
          </h2>
          <p className="text-muted-foreground text-center mb-8">
            Our locksmiths cover {location.name} and all surrounding suburbs
          </p>
          <div className="flex flex-wrap gap-3 justify-center mb-6">
            {[...location.suburbs, ...location.nearbyAreas].map((suburb) => (
              <span
                key={suburb}
                className="bg-background border border-border rounded-full px-4 py-2 text-sm text-muted-foreground hover:border-gold hover:text-gold transition-colors"
              >
                {suburb}
              </span>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground">
            Not sure if we cover your area?{' '}
            <a
              href={`https://wa.me/${CONTACT.whatsapp}`}
              className="text-gold hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp us →
            </a>
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-center mb-10">
            Locksmith {location.name} — frequently asked questions
          </h2>
          <div className="space-y-4">
            {location.faqs.map((faq) => (
              <div
                key={faq.q}
                className="bg-surface border border-border rounded-xl p-6"
              >
                <h3 className="font-heading font-bold text-base mb-2">
                  {faq.q}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {faq.a}
                </p>
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
            Request a locksmith in {location.name}
          </h2>
          <p className="text-muted-foreground text-center mb-8">
            Fill in your details and we will find the nearest verified locksmith
            in {location.name}.
          </p>
          <RequestForm />
        </div>
      </section>

      <section className="py-8 px-4 border-t border-border text-center">
        <Link
          href={`/locksmith-${location.provinceSlug}`}
          className="text-gold hover:underline text-sm"
        >
          ← All locksmiths in {location.province}
        </Link>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Vula24',
            '@id': 'https://www.vula24.co.za',
            url: `https://www.vula24.co.za/locksmith-${location.slug}`,
            description: `Emergency locksmith services in ${location.name}. Available 24/7.`,
            areaServed: {
              '@type': 'City',
              name: location.name,
              containedInPlace: {
                '@type': 'State',
                name: location.province,
                containedInPlace: {
                  '@type': 'Country',
                  name: 'South Africa',
                },
              },
            },
            serviceType: 'Locksmith',
            openingHours: 'Mo-Su 00:00-24:00',
            priceRange: '$$',
            makesOffer: {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: `Emergency locksmith services in ${location.name}`,
              },
            },
          }),
        }}
      />

      <StickyMobileCTA />
    </main>
  )
}
