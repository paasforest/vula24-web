import { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { GoldButton } from '@/components/GoldButton'

export const metadata: Metadata = {
  title: 'Vula24 — Thank you',
  description: 'Your application was received. We will contact you on WhatsApp.',
}

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-background">
      <Nav />

      {/* Content Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-4 flex items-center justify-center min-h-[60vh]">
        <div className="max-w-lg mx-auto text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gold"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>

          <h1 className="font-heading font-bold text-3xl md:text-4xl mb-4">
            We received your application.
          </h1>
          
          <p className="text-muted-foreground text-lg mb-8">
            We will review your details and contact you on WhatsApp within 24 hours.
          </p>

          <GoldButton label="Back to Home" href="/" size="md" />
        </div>
      </section>

      <Footer />
    </main>
  )
}
