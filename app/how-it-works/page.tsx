import { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { GoldButton } from '@/components/GoldButton'
import { LOCKSMITH_SIGNUP_HREF } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Vula24 — How It Works | SMS leads for locksmiths',
  description:
    'How Vula24 works: monthly subscription, customer leads by SMS. No app — locksmiths contact customers directly.',
}

const locksmithSteps = [
  {
    step: '01',
    title: 'Sign up',
    description:
      'Create your profile, set your services and coverage area. Takes less than 10 minutes.',
  },
  {
    step: '02',
    title: 'Get leads by SMS',
    description:
      'When a customer near you needs a locksmith, we send their contact details to your phone by SMS.',
  },
  {
    step: '03',
    title: 'Get the lead, close the deal',
    description:
      'We send you the customer contact details by SMS. You call them directly, do the job and get paid your way — cash, EFT, whatever works.',
  },
]

const faqs = [
  {
    question: 'Is Vula24 a locksmith company?',
    answer:
      'No. Vula24 is a lead generation service. Locksmiths on the network are independent professionals who pay a monthly subscription to receive SMS leads. We do not employ locksmiths.',
  },
  {
    question: 'How do customers find me?',
    answer:
      'Customers submit a request on our website. We match them with a verified locksmith in their area and share contact details by SMS so you can call them directly.',
  },
  {
    question: 'What areas does Vula24 cover?',
    answer:
      'We currently operate in Gauteng and Western Cape, with more provinces planned.',
  },
  {
    question: 'How does pricing work for locksmiths?',
    answer:
      'You pay a flat monthly subscription (Starter or Pro). We do not take a commission or percentage from what you earn from customers.',
  },
  {
    question: 'Do I need to install an app?',
    answer:
      'No. Leads are delivered by SMS. You contact the customer by phone and arrange the job and payment directly.',
  },
]

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-background">
      <Nav />

      <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 text-balance">
            How Vula24 works
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Lead generation for locksmiths — SMS alerts, no app required.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 bg-surface">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-center mb-12">
            For locksmiths on the network
          </h2>
          <div className="space-y-12">
            {locksmithSteps.map((step, index) => (
              <div key={step.step} className="flex gap-6 md:gap-8">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gold/10 rounded-full flex items-center justify-center">
                    <span className="font-heading font-bold text-gold text-lg md:text-xl">
                      {step.step}
                    </span>
                  </div>
                  {index < locksmithSteps.length - 1 && (
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

      <section className="py-16 md:py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-12">
            Frequently asked questions
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

      <section className="py-16 md:py-24 px-4 bg-surface">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
            Ready to receive SMS leads?
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Apply as a locksmith and we will get you set up on WhatsApp.
          </p>
          <GoldButton label="Join as a Locksmith" href={LOCKSMITH_SIGNUP_HREF} size="lg" />
        </div>
      </section>

      <Footer />
    </main>
  )
}
