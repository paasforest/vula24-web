import { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { GoldButton } from '@/components/GoldButton'

export const metadata: Metadata = {
  title: 'Vula24 — How It Works | Platform for locksmiths & customers',
  description:
    'How Vula24 works: software for locksmiths to receive job requests and get paid. Customers find verified professionals on the platform.',
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
    title: 'Get job requests',
    description:
      'When a customer near you needs a locksmith, you get notified on your phone. Accept or decline.',
  },
  {
    step: '03',
    title: 'Complete and get paid',
    description:
      'Do the job, get paid through the app. Your rating grows with every 5-star review.',
  },
]

const faqs = [
  {
    question: 'Is Vula24 a locksmith company?',
    answer:
      'No. Vula24 is a software platform. Locksmiths on the network are independent professionals who pay a monthly subscription to use the tools. We do not employ locksmiths or dispatch teams.',
  },
  {
    question: 'How do customers find me?',
    answer:
      'Customers use the Vula24 app or website to browse locksmiths in their area. Your profile, reviews and coverage settings determine when you appear in search.',
  },
  {
    question: 'What areas does the platform cover?',
    answer:
      'The platform is currently live for locksmiths operating in Gauteng and Western Cape, with more provinces on the roadmap.',
  },
  {
    question: 'How does pricing work?',
    answer:
      'You pay a flat monthly subscription (Starter or Pro) plus a small platform fee on top of each job. You set your own rates — you always earn what you configure.',
  },
  {
    question: 'Who is responsible for the quality of work?',
    answer:
      'Each locksmith on the platform is an independent service provider. Vula24 provides the technology to connect customers and professionals; workmanship is between you and the customer, supported by reviews on the platform.',
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
            Software for locksmiths. A simple way for customers to find verified
            professionals on the platform.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 bg-surface">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-center mb-12">
            For locksmiths on the platform
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
            Ready to join the platform?
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Apply as a locksmith and start using Vula24 from your phone.
          </p>
          <GoldButton label="Join as a Locksmith" href="/apply" size="lg" />
        </div>
      </section>

      <Footer />
    </main>
  )
}
