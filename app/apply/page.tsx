import { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { LocksmithApplicationForm } from '../for-locksmiths/application-form'

export const metadata: Metadata = {
  title: 'Vula24 — Apply | Join the platform as a locksmith',
  description:
    'Apply to join Vula24. Software for South African locksmiths to find customers and run bookings from their phone.',
}

export default function ApplyPage() {
  return (
    <main className="min-h-screen bg-background">
      <Nav />

      <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-center mb-4">
            Join Vula24 as a locksmith
          </h1>
          <p className="text-muted-foreground text-center mb-8">
            Apply takes 2 minutes. We review and activate your account within 24 hours.
          </p>
          <LocksmithApplicationForm />
        </div>
      </section>

      <Footer />
    </main>
  )
}
