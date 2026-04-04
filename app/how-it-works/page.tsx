import { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { GoldButton } from '@/components/GoldButton'

export const metadata: Metadata = {
  title: 'Vula24 — How It Works | Emergency Locksmith Services',
  description: 'Learn how Vula24 connects you with verified locksmiths in minutes. Simple 3-step process for emergency locksmith services.',
}

const steps = [
  {
    step: '01',
    title: 'Submit Your Request',
    description: 'Fill out our simple form with your phone number, location, and what service you need. It takes less than 30 seconds. You can also call us directly or send a WhatsApp message.',
  },
  {
    step: '02',
    title: 'Get Matched',
    description: 'We immediately connect you with a verified locksmith in your area. They will call you within minutes to confirm your location and provide an estimated arrival time.',
  },
  {
    step: '03',
    title: 'Problem Solved',
    description: 'Your locksmith arrives, assesses the situation, and gets the job done. Payment is made directly to the locksmith once the work is complete.',
  },
]

const faqs = [
  {
    question: 'How fast will a locksmith arrive?',
    answer: 'Our average response time is 15 minutes. Depending on your location and the time of day, a locksmith can arrive within 10-30 minutes.',
  },
  {
    question: 'Are your locksmiths verified?',
    answer: 'Yes. Every locksmith in our network goes through a verification process. We check their credentials, experience, and reviews before they can receive jobs through Vula24.',
  },
  {
    question: 'What areas do you cover?',
    answer: 'We currently cover Gauteng (including Johannesburg, Pretoria, Sandton, and surrounding areas) and Western Cape (including Cape Town, Stellenbosch, and surrounding areas). We are expanding to more areas soon.',
  },
  {
    question: 'What services do you offer?',
    answer: 'Our locksmiths handle car lockouts, house lockouts, key replacements, lock changes, safe opening, and other locksmith services. If you are unsure, just ask — we will connect you with someone who can help.',
  },
  {
    question: 'Is there a call-out fee?',
    answer: 'Call-out fees vary by locksmith and location. The locksmith will provide you with a quote before they start any work, so there are no surprises.',
  },
]

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-background">
      <Nav />

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 text-balance">
            How It Works
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Getting help is simple. Here is exactly what happens when you reach out.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 md:py-24 px-4 bg-surface">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={step.step} className="flex gap-6 md:gap-8">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gold/10 rounded-full flex items-center justify-center">
                    <span className="font-heading font-bold text-gold text-lg md:text-xl">
                      {step.step}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-px h-12 bg-border mx-auto mt-4" />
                  )}
                </div>
                <div className="pt-2 md:pt-4">
                  <h3 className="font-heading font-bold text-xl md:text-2xl mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-surface border border-border rounded-xl p-6">
                <h3 className="font-heading font-bold text-lg mb-2">
                  {faq.question}
                </h3>
                <p className="text-muted-foreground">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 bg-surface">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
            Ready to get help?
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Get connected to a verified locksmith in your area within minutes.
          </p>
          <GoldButton label="Get Help Now" href="/#request" size="lg" />
        </div>
      </section>

      <Footer />
    </main>
  )
}
