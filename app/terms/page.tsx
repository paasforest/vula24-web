import { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Vula24 — Terms of Service',
  description:
    'Terms of using the Vula24 platform. Software for locksmiths; independent professionals on the network.',
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Nav />

      <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading font-bold text-3xl md:text-4xl mb-8">
            Terms of Service
          </h1>
          
          <div className="prose prose-invert max-w-none space-y-8">
            <p className="text-muted-foreground">
              Last updated: January 2025
            </p>

            <div className="space-y-4">
              <h2 className="font-heading font-bold text-xl">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing or using Vula24 services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-heading font-bold text-xl">2. Description of the platform</h2>
              <p className="text-muted-foreground">
                Vula24 provides a lead generation service (including this website) that connects end users who need locksmith services with independent locksmith professionals who pay a monthly subscription to receive SMS leads. Vula24 is not a locksmith business, does not employ locksmiths, does not process job payments, and does not guarantee response times or the outcome of any job.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-heading font-bold text-xl">3. Availability and coverage</h2>
              <p className="text-muted-foreground">
                Features and coverage depend on your region, network connectivity and whether independent professionals are active on the platform in your area. Nothing on this website promises that a locksmith will be available at a given time or location.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-heading font-bold text-xl">4. User responsibilities</h2>
              <p className="text-muted-foreground">
                When using the platform, you agree to provide accurate information, treat other users professionally, and comply with applicable law. End users are responsible for verifying identity and access rights where relevant. Locksmiths on the platform are responsible for their workmanship, pricing they offer customers, and compliance with their own regulatory obligations (including PSIRA where applicable).
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-heading font-bold text-xl">5. Pricing and subscriptions</h2>
              <p className="text-muted-foreground">
                Locksmiths pay a monthly subscription as described at signup. We do not take a commission or percentage from what locksmiths earn from customers. Pricing for work performed is agreed between the customer and the locksmith directly — cash, EFT or otherwise. Vula24 does not provide a wallet, escrow or payment processing for locksmith services unless expressly stated in a separate written agreement.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-heading font-bold text-xl">6. Independent professionals</h2>
              <p className="text-muted-foreground">
                Locksmiths on the platform are independent service providers, not employees or agents of Vula24. Reviews and verification badges are tools to help customers choose; they do not constitute a guarantee of service quality or timing.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-heading font-bold text-xl">7. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                Vula24 is not liable for any direct, indirect, incidental, special, or consequential damages arising from your use of our services or the services provided by locksmiths. This includes but is not limited to damage to property, personal injury, or financial loss.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-heading font-bold text-xl">8. Indemnification</h2>
              <p className="text-muted-foreground">
                You agree to indemnify and hold harmless Vula24 and its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your use of our services or violation of these terms.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-heading font-bold text-xl">9. Governing Law</h2>
              <p className="text-muted-foreground">
                These Terms of Service shall be governed by and construed in accordance with the laws of the Republic of South Africa. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the South African courts.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-heading font-bold text-xl">10. Changes to Terms</h2>
              <p className="text-muted-foreground">
                We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services after any changes constitutes acceptance of the new terms.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-heading font-bold text-xl">11. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <p className="text-muted-foreground">
                Email: hello@vula24.co.za
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
