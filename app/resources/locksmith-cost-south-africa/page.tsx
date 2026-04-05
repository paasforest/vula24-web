import { Metadata } from 'next'
import Link from 'next/link'
import { Nav } from '@/components/Nav'
import { GoldButton } from '@/components/GoldButton'
import { StickyMobileCTA } from '@/components/StickyMobileCTA'

export const metadata: Metadata = {
  title:
    'Locksmith price South Africa | How much does a locksmith cost? | Vula24',
  description:
    'Locksmith price in South Africa: call-out fees, after-hours rates, car vs home jobs, and how to avoid surprise bills. Compare expectations before you book.',
  keywords: [
    'locksmith price',
    'how much locksmith cost',
    'locksmith call out fee South Africa',
    'emergency locksmith price',
    'locksmith cost Johannesburg',
  ],
  alternates: {
    canonical:
      'https://www.vula24.co.za/resources/locksmith-cost-south-africa',
  },
  openGraph: {
    title: 'Locksmith price South Africa | Vula24',
    description:
      'What drives locksmith prices in SA — and how Vula24 keeps quotes upfront.',
    url: 'https://www.vula24.co.za/resources/locksmith-cost-south-africa',
  },
}

export default function LocksmithCostSouthAfricaPage() {
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
          <span className="text-foreground">Locksmith cost</span>
        </nav>

        <h1 className="font-heading font-bold text-3xl md:text-4xl mb-4">
          How much does a locksmith cost in South Africa?
        </h1>
        <p className="text-muted-foreground mb-8">
          If you are searching for <strong className="text-foreground">locksmith price</strong> or{' '}
          <strong className="text-foreground">how much locksmith cost</strong>, the honest answer
          is: it depends on the job, the time of day, and what parts are needed — but you should
          always get an <strong className="text-foreground">upfront scope</strong> before anyone
          drills your door or opens your car.
        </p>

        <div className="rounded-xl border border-border bg-surface p-5 mb-10">
          <p className="text-sm text-muted-foreground mb-3">
            Ready to book in a major metro? Start on our Johannesburg page — same Vula24 flow
            applies across areas we cover.
          </p>
          <Link
            href="/locksmith-johannesburg"
            className="text-gold font-heading font-bold hover:underline"
          >
            Locksmith Johannesburg — request help →
          </Link>
        </div>

        <h2 className="font-heading font-bold text-xl mb-3">
          What usually affects the price
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground mb-8">
          <li>
            <strong className="text-foreground">Call-out / attendance</strong> — travel and time
            on site, especially after hours or on public holidays.
          </li>
          <li>
            <strong className="text-foreground">Type of job</strong> — car lockout vs house
            lockout vs replacing a full lock cylinder or dealing with high-security hardware.
          </li>
          <li>
            <strong className="text-foreground">Parts</strong> — if a cylinder, padlock, or
            electronic component must be replaced, material costs are added clearly.
          </li>
          <li>
            <strong className="text-foreground">Complexity</strong> — some vehicles and safes need
            specialist tools and more time.
          </li>
        </ul>

        <h2 className="font-heading font-bold text-xl mb-3">
          Why &quot;cheap&quot; quotes can cost more later
        </h2>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          A price given without seeing the lock or vehicle can change once someone arrives. On
          Vula24, locksmiths in our network are expected to agree a clear quote or scope{' '}
          <strong className="text-foreground">before invasive work</strong>. If anything sounds
          vague, ask again — especially for emergency call-outs at night.
        </p>

        <h2 className="font-heading font-bold text-xl mb-3">
          Typical ranges (indicative only)
        </h2>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          Figures vary by city and provider; treat these as orientation, not a promise:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground mb-8">
          <li>Simple unlock where no parts are needed — often the lowest total.</li>
          <li>After-midnight or public holiday — higher attendance component.</li>
          <li>New keys or reprogramming — priced once the vehicle or lock type is known.</li>
        </ul>

        <h2 className="font-heading font-bold text-xl mb-3">Next step</h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          For a real number, submit a request with your address and situation — you will be
          matched with a verified locksmith who can quote for your case. In Johannesburg, use our
          dedicated page below.
        </p>
        <div className="flex flex-wrap gap-4">
          <GoldButton label="Get a locksmith in Johannesburg →" href="/locksmith-johannesburg" size="lg" />
          <GoldButton label="Home — request form" href="/#request" size="lg" variant="outline" />
        </div>
      </article>

      <StickyMobileCTA />
    </main>
  )
}
