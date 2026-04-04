import { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { PricingTiers } from '@/components/PricingTiers'

export const metadata: Metadata = {
  title: 'Vula24 — Pricing | SMS lead plans for locksmiths',
  description:
    'Starter and Pro monthly plans. SMS leads, no commission on your jobs. 14-day free trial.',
}

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-background">
      <Nav />

      <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-4 bg-surface">
        <div className="max-w-5xl mx-auto">
          <PricingTiers />
        </div>
      </section>

      <Footer />
    </main>
  )
}
