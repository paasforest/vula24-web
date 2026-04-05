import { Metadata } from 'next'
import Link from 'next/link'
import { Nav } from '@/components/Nav'
import { GoldButton } from '@/components/GoldButton'
import { StickyMobileCTA } from '@/components/StickyMobileCTA'

export const metadata: Metadata = {
  title: 'What to do when you are locked out | Home, car & office | Vula24',
  description:
    'Locked out of your house or car? Stay calm, stay safe, verify the locksmith, and get back inside. Practical steps before you call for help.',
  keywords: [
    'locked out of house what to do',
    'locked out of car',
    'emergency locksmith tips',
    'lockout safety South Africa',
  ],
  alternates: {
    canonical: 'https://www.vula24.co.za/resources/what-to-do-locked-out',
  },
  openGraph: {
    title: 'What to do when you are locked out | Vula24',
    description:
      'Informational guide: safety, verification, and how to request a verified locksmith.',
    url: 'https://www.vula24.co.za/resources/what-to-do-locked-out',
  },
}

export default function WhatToDoLockedOutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Nav />

      <article className="pt-24 pb-16 md:pt-32 px-4 max-w-3xl mx-auto">
        <nav className="text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span className="mx-2">›</span>
          <Link href="/resources" className="hover:text-foreground transition-colors">
            Resources
          </Link>
          <span className="mx-2">›</span>
          <span className="text-foreground">Locked out</span>
        </nav>

        <h1 className="font-heading font-bold text-3xl md:text-4xl mb-4">
          What to do when you are locked out
        </h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          This guide is for <strong className="text-foreground">informational</strong> use — when
          you are stressed, a clear order of steps helps you stay safe and avoid scams. When you
          are ready to book in a major city,{' '}
          <Link href="/locksmith-johannesburg" className="text-gold hover:underline font-medium">
            locksmith services in Johannesburg
          </Link>{' '}
          are available through the same Vula24 request flow as the rest of our coverage areas.
        </p>

        <h2 className="font-heading font-bold text-xl mb-3">1. Pause and assess safety</h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          If you are on the roadside, stand clear of traffic. If you are outside your home at
          night, wait in a lit area or with someone you trust. Avoid leaving doors visibly
          &quot;half fixed&quot; after a failed DIY attempt — that can attract the wrong attention.
        </p>

        <h2 className="font-heading font-bold text-xl mb-3">2. Car lockout: keys visible?</h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          Check whether a spare is realistic (family, colleague, roadside plan). If not, a
          professional auto locksmith is usually faster than breaking a window — and cheaper than
          glass plus bodywork.
        </p>

        <h2 className="font-heading font-bold text-xl mb-3">3. Home lockout: prove it is your place</h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          Legitimate locksmiths may ask for ID or proof you live there — especially for apartment
          blocks. Have your ID or lease handy on your phone if possible.
        </p>

        <h2 className="font-heading font-bold text-xl mb-3">4. Verify who you hire</h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          Use a known platform or referral. Ask for a clear quote before drilling or replacing
          hardware. On Vula24, locksmiths are verified before they receive leads — see our{' '}
          <Link href="/how-it-works" className="text-gold hover:underline">
            how it works
          </Link>{' '}
          page for the customer journey.
        </p>

        <h2 className="font-heading font-bold text-xl mb-3">5. Book help</h2>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          When you need someone on the way, use our request form or call. For Johannesburg
          specifically, the city page lists suburbs and FAQs so you know what to expect.
        </p>

        <div className="rounded-xl border border-border bg-surface p-5 mb-10">
          <p className="font-heading font-bold text-foreground mb-2">
            Need a locksmith in Johannesburg?
          </p>
          <p className="text-sm text-muted-foreground mb-3">
            Jump to our local page for suburbs, FAQs, and the request form.
          </p>
          <Link
            href="/locksmith-johannesburg"
            className="text-gold font-heading font-bold hover:underline"
          >
            Locksmith Johannesburg →
          </Link>
        </div>

        <div className="flex flex-wrap gap-4">
          <GoldButton label="Request help now →" href="/#request" size="lg" />
          <GoldButton
            label="Johannesburg locksmith page"
            href="/locksmith-johannesburg"
            size="lg"
            variant="outline"
          />
        </div>
      </article>

      <StickyMobileCTA />
    </main>
  )
}
