import { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { GoldButton } from '@/components/GoldButton'
import { LOCKSMITH_PORTAL_HREF } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Vula24 — How It Works | Emergency locksmith services',
  description:
    'How to get a locksmith with Vula24. Request help, get matched instantly, job done. Available 24/7 across Gauteng and Western Cape.',
}

const customerSteps = [
  {
    step: '01',
    title: 'Request help',
    description:
      'Fill in the quick form on our homepage or call us directly. Tell us where you are and what you need — takes 30 seconds.',
  },
  {
    step: '02',
    title: 'Get matched',
    description:
      'We connect you with the nearest available verified locksmith in your area. Expect a call within minutes.',
  },
  {
    step: '03',
    title: 'Job done',
    description:
      'Your locksmith arrives and sorts the problem. No hidden fees, no surprises.',
  },
]

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
      'Vula24 is a service that connects customers with verified independent locksmiths in their area. We do not employ locksmiths directly.',
  },
  {
    question: 'How do customers find me?',
    answer:
      'Customers submit a request on our website. We match them with a verified locksmith in their area and share contact details so you can call them directly.',
  },
  {
    question: 'What areas does Vula24 cover?',
    answer:
      'We currently operate in Gauteng and Western Cape, with more provinces planned soon.',
  },
  {
    question: 'How does pricing work for locksmiths?',
    answer:
      'Locksmiths pay a simple flat monthly fee. We never take a commission or percentage from what you earn.',
  },
  {
    question: 'Do I need to install an app?',
    answer:
      'No app needed. Everything works via SMS and phone calls — simple and straightforward.',
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
            Simple, fast, and available 24/7 across Gauteng and Western Cape.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-center mb-12">
            For customers
          </h2>
          <div className="space-y-12">
            {customerSteps.map((step, index) => (
              <div key={step.step} className="flex gap-6 md:gap-8">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gold/10 rounded-full flex items-center justify-center">
                    <span className="font-heading font-bold text-gold text-lg md:text-xl">
                      {step.step}
                    </span>
                  </div>
                  {index < customerSteps.length - 1 && (
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
          <div className="mt-12 flex justify-center">
            <GoldButton label="Request a Locksmith" href="/#request" size="lg" />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 bg-surface">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-center mb-12">
            For locksmiths
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
            Are you a locksmith?
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Join the network and start receiving jobs in your area.
          </p>
          <GoldButton label="Join as a Locksmith" href={LOCKSMITH_PORTAL_HREF} size="lg" />
        </div>
      </section>

      <Footer />
    </main>
  )
}
