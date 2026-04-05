import { Metadata } from 'next'
import Link from 'next/link'
import { Nav } from '@/components/Nav'
import { GoldButton } from '@/components/GoldButton'
import { StickyMobileCTA } from '@/components/StickyMobileCTA'

export const metadata: Metadata = {
  title: 'Locksmith resources | Guides & pricing | Vula24',
  description:
    'Practical guides on locksmith prices in South Africa and what to do when you are locked out. Request a verified locksmith in minutes.',
  alternates: {
    canonical: 'https://www.vula24.co.za/resources',
  },
  openGraph: {
    title: 'Locksmith resources | Vula24',
    description:
      'Guides on pricing, lockouts, and how to get help fast across Gauteng and Western Cape.',
    url: 'https://www.vula24.co.za/resources',
  },
}

const articles = [
  {
    href: '/resources/locksmith-cost-south-africa',
    title: 'How much does a locksmith cost in South Africa?',
    blurb:
      'Typical call-out fees, after-hours rates, and what affects the final bill — before anyone drills or replaces hardware.',
  },
  {
    href: '/resources/what-to-do-locked-out',
    title: 'What to do when you are locked out',
    blurb:
      'Stay safe, verify who you are dealing with, and get back inside without panic — home, car, or office.',
  },
]

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Nav />

      <section className="pt-24 pb-12 md:pt-32 md:pb-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-heading font-bold text-gold uppercase tracking-wide mb-3">
            Resources
          </p>
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
            Locksmith guides
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Straight answers on pricing and emergencies — then{' '}
            <Link
              href="/locksmith-johannesburg"
              className="text-gold hover:underline font-medium"
            >
              get a locksmith in Johannesburg
            </Link>{' '}
            (or anywhere we cover) when you are ready to book.
          </p>
          <GoldButton label="Request a locksmith →" href="/#request" size="lg" />
        </div>
      </section>

      <section className="py-12 px-4 border-t border-border bg-surface/40">
        <div className="max-w-3xl mx-auto space-y-4">
          {articles.map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className="block rounded-xl border border-border bg-background p-6 hover:border-gold transition-colors group"
            >
              <h2 className="font-heading font-bold text-xl mb-2 group-hover:text-gold transition-colors">
                {a.title}
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {a.blurb}
              </p>
              <p className="text-gold text-sm font-medium mt-3">Read guide →</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-12 px-4 border-t border-border">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-muted-foreground text-sm mb-4">
            Need help in Joburg right now? Our city page lists areas we cover and
            the fastest way to request a verified pro.
          </p>
          <Link
            href="/locksmith-johannesburg"
            className="inline-flex items-center justify-center rounded-lg border border-gold bg-gold/10 px-5 py-2.5 text-sm font-heading font-bold text-gold hover:bg-gold/20 transition-colors"
          >
            Locksmith Johannesburg →
          </Link>
        </div>
      </section>

      <StickyMobileCTA />
    </main>
  )
}
