import { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { LocksmithApplicationForm } from '../for-locksmiths/application-form'

export const metadata: Metadata = {
  title: 'Vula24 — Apply to Join | For Locksmiths',
  description: 'Apply to become a Vula24 locksmith partner. Get real jobs in your area.',
}

export default function ApplyPage() {
  return (
    <main className="min-h-screen bg-background">
      <Nav />

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-center mb-4">
            Apply to Join Vula24
          </h1>
          <p className="text-muted-foreground text-center mb-8">
            Fill out the form below and we will be in touch within 24 hours.
          </p>
          <LocksmithApplicationForm />
        </div>
      </section>

      <Footer />
    </main>
  )
}
