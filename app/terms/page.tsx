import { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Vula24 — Terms of Service',
  description: 'Vula24 Terms of Service. Read our terms and conditions for using our emergency locksmith services.',
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
              <h2 className="font-heading font-bold text-xl">2. Description of Service</h2>
              <p className="text-muted-foreground">
                Vula24 provides emergency locksmith services across South Africa. We connect customers who need locksmith assistance with verified locksmith professionals in their area.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-heading font-bold text-xl">3. Service Availability</h2>
              <p className="text-muted-foreground">
                While we strive to provide 24/7 service coverage, availability may vary based on your location and the availability of locksmith professionals in your area. We do not guarantee that a locksmith will be available at all times in all locations.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-heading font-bold text-xl">4. User Responsibilities</h2>
              <p className="text-muted-foreground">
                When using our services, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Provide accurate contact and location information</li>
                <li>Be available to receive calls from our team or the assigned locksmith</li>
                <li>Provide proof of ownership or authorisation when requested</li>
                <li>Pay the locksmith directly for services rendered</li>
                <li>Treat our staff and locksmith partners with respect</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="font-heading font-bold text-xl">5. Pricing and Payment</h2>
              <p className="text-muted-foreground">
                Service pricing is determined by the individual locksmith based on the type of service, time of day, and location. The locksmith will provide you with a quote before starting any work. Payment is made directly to the locksmith upon completion of the service.
              </p>
              <p className="text-muted-foreground">
                Vula24 does not process payments for locksmith services and is not responsible for any pricing disputes between you and the locksmith.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-heading font-bold text-xl">6. Locksmith Verification</h2>
              <p className="text-muted-foreground">
                We verify all locksmiths in our network, but we do not employ them directly. Locksmiths are independent service providers. While we take reasonable steps to verify their credentials, we cannot guarantee the quality of their work.
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
