import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Nav } from '@/components/Nav'
import { GoldButton } from '@/components/GoldButton'
import { RequestForm } from '@/components/RequestForm'
import { StickyMobileCTA } from '@/components/StickyMobileCTA'
import {
  GAUTENG_LOCATIONS,
  SERVICE_PAGES,
  WESTERN_CAPE_LOCATIONS,
} from '@/lib/locations'
import { CONTACT } from '@/lib/constants'

const SITE = 'https://www.vula24.co.za'

const SLUGS = SERVICE_PAGES.map((s) => s.slug)

const cityLinkClass =
  'inline-flex items-center rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground hover:border-primary/40 hover:bg-primary/5 transition-colors'

const COPY: Record<
  string,
  { title: string; lead: string; body: string[]; bullets: string[] }
> = {
  'car-lockout': {
    title: 'Car lockout — emergency auto locksmith',
    lead:
      'Keys inside the car, boot stuck, or remote not working? Vula24 routes you to locksmiths who prioritise non-destructive entry where possible.',
    body: [
      'We focus on fast dispatch across Gauteng and the Western Cape. You get a clear scope before any drilling or hardware replacement.',
      'Whether you are at a mall, estate, or roadside, request help and we match the nearest verified professional.',
    ],
    bullets: [
      'Non-destructive entry where the vehicle allows',
      'Transponder and remote key support on many models',
      'Upfront quotes before work begins',
    ],
  },
  'house-lockout': {
    title: 'House lockout — home and apartment entry',
    lead:
      'Locked out of your house, flat, or complex unit? Our network handles cylinder issues, snapped keys, and failed smart locks.',
    body: [
      'Night-time and weekend call-outs are normal for us — submit a request with your address and situation.',
      'If security needs upgrading after a break-in attempt, locksmiths can advise on stronger cylinders and hardware.',
    ],
    bullets: [
      'Residential and sectional-title complexes',
      'After-hours and public holiday availability',
      'Clear pricing before invasive work',
    ],
  },
  'lost-car-key': {
    title: 'Lost car key replacement',
    lead:
      'Lost or stolen car keys need a careful response: cut, code, and programme replacements without leaving your vehicle stranded for days.',
    body: [
      'Vula24 connects you with locksmiths who handle many popular brands on-site or with a short turnaround.',
      'Bring your vehicle registration and ID where required — legitimate locksmiths follow verification steps.',
    ],
    bullets: [
      'Spare keys and full replacements',
      'Remote and transponder programming',
      'On-site service where equipment allows',
    ],
  },
  'lock-repair': {
    title: 'Lock repair and replacement',
    lead:
      'Worn cylinders, sticky latches, and weather-damaged gates all need different fixes — repair first, replace when necessary.',
    body: [
      'Describe the fault when you request help: front door, gate motor interlock, or office access — we route the right skills.',
      'Same-day visits are often possible for non-emergency repairs in major metros.',
    ],
    bullets: [
      'Mortice, rim, and cylinder locks',
      'Gate and access-control coordination',
      'Security upgrades after incidents',
    ],
  },
  'safe-opening': {
    title: 'Safe opening and combination help',
    lead:
      'Forgotten combinations, failed electronic keypads, and inherited safes need specialist opening — not brute force from the wrong tools.',
    body: [
      'Request a locksmith with safe experience. You may need proof of ownership before opening — that protects everyone.',
      'Plan ahead for business safes after hours — after-hours rates may apply.',
    ],
    bullets: [
      'Mechanical and electronic safes',
      'Combination resets where appropriate',
      'Discretion and verification',
    ],
  },
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const meta = COPY[slug as keyof typeof COPY]
  if (!meta) return {}
  const url = `${SITE}/services/${slug}`
  return {
    title: `${meta.title} | Vula24`,
    description: meta.lead,
    alternates: { canonical: url },
    openGraph: { title: `${meta.title} | Vula24`, description: meta.lead, url },
  }
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const meta = COPY[slug as keyof typeof COPY]
  if (!meta) notFound()

  return (
    <main className="min-h-screen bg-background">
      <Nav />

      <div className="pt-24 pb-12 px-4 max-w-3xl mx-auto">
        <nav
          className="text-sm text-muted-foreground mb-8"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span className="mx-2">›</span>
          <span className="text-foreground">Services</span>
        </nav>

        <h1 className="font-heading font-bold text-3xl md:text-4xl mb-4">
          {meta.title}
        </h1>
        <p className="text-lg text-muted-foreground mb-8">{meta.lead}</p>
        <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
          {meta.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground mb-10">
          {meta.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>

        <section
          className="mb-10 rounded-lg border border-border bg-surface/50 px-4 py-5"
          aria-labelledby="available-in-heading"
        >
          <h2
            id="available-in-heading"
            className="font-heading font-semibold text-base text-foreground mb-4"
          >
            Available in
          </h2>
          <div className="space-y-5">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                Gauteng
              </h3>
              <ul className="flex flex-wrap gap-2">
                {GAUTENG_LOCATIONS.map((loc) => (
                  <li key={loc.slug}>
                    <Link
                      href={`/locksmith-${loc.slug}`}
                      className={cityLinkClass}
                    >
                      {loc.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                Western Cape
              </h3>
              <ul className="flex flex-wrap gap-2">
                {WESTERN_CAPE_LOCATIONS.map((loc) => (
                  <li key={loc.slug}>
                    <Link
                      href={`/locksmith-${loc.slug}`}
                      className={cityLinkClass}
                    >
                      {loc.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <div className="flex flex-wrap gap-4">
          <GoldButton label="Get help now →" href="#request" size="lg" />
          <GoldButton
            label="Call now"
            href={`tel:${CONTACT.phone}`}
            size="lg"
            variant="outline"
          />
        </div>
      </div>

      <section
        id="request"
        className="py-16 px-4 bg-surface border-t border-border scroll-mt-24"
      >
        <div className="max-w-xl mx-auto">
          <h2 className="font-heading font-bold text-2xl text-center mb-4">
            Request a locksmith
          </h2>
          <p className="text-muted-foreground text-center mb-8 text-sm">
            Describe your situation — we&apos;ll match a verified locksmith in
            your area.
          </p>
          <RequestForm />
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: meta.title,
            url: `${SITE}/services/${slug}`,
            provider: {
              '@type': 'Organization',
              name: 'Vula24',
              url: SITE,
            },
            areaServed: ['Gauteng', 'Western Cape'],
          }),
        }}
      />

      <StickyMobileCTA />
    </main>
  )
}
