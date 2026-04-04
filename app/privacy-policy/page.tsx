import { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Vula24 — Privacy Policy',
  description: 'Vula24 Privacy Policy. Learn how we collect, use, and protect your personal information.',
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background">
      <Nav />

      <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading font-bold text-3xl md:text-4xl mb-8">
            Privacy Policy
          </h1>
          
          <div className="prose prose-invert max-w-none space-y-8">
            <p className="text-muted-foreground">
              Last updated: January 2025
            </p>

            <div className="space-y-4">
              <h2 className="font-heading font-bold text-xl">1. Introduction</h2>
              <p className="text-muted-foreground">
                Vula24 ({'"we"'}, {'"us"'}, or {'"our"'}) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services. This policy is compliant with the Protection of Personal Information Act 4 of 2013 (POPIA) of South Africa.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-heading font-bold text-xl">2. Information We Collect</h2>
              <p className="text-muted-foreground">
                We collect information that you provide directly to us when using our services:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Contact information (phone number, email address)</li>
                <li>Location or coverage information (city or area)</li>
                <li>Account and application data when you register on the platform</li>
                <li>Service request details when you submit a request as an end user (where applicable)</li>
                <li>For locksmith accounts: business profile, subscription and billing data processed through the platform</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="font-heading font-bold text-xl">3. How We Use Your Information</h2>
              <p className="text-muted-foreground">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Operate the platform and connect end users with independent locksmiths who use our software</li>
                <li>Communicate with you about your account, applications and support requests</li>
                <li>Process monthly subscriptions for locksmith lead-generation accounts</li>
                <li>Improve our services and user experience</li>
                <li>Meet legal and regulatory obligations under POPIA where applicable</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="font-heading font-bold text-xl">4. Information Sharing</h2>
              <p className="text-muted-foreground">
                We may share your information with:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Independent locksmiths on the platform where needed to fulfil a connection or booking initiated through the service</li>
                <li>Hosting, payments and technology partners who assist us in operating the platform</li>
                <li>Law enforcement or government agencies when required by law</li>
              </ul>
              <p className="text-muted-foreground font-medium">
                We do not sell your personal information to third parties.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-heading font-bold text-xl">5. Data Security</h2>
              <p className="text-muted-foreground">
                We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-heading font-bold text-xl">6. Your Rights Under POPIA</h2>
              <p className="text-muted-foreground">
                Under POPIA, you have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Access your personal information we hold</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Object to the processing of your personal information</li>
                <li>Lodge a complaint with the Information Regulator</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="font-heading font-bold text-xl">7. Data Retention</h2>
              <p className="text-muted-foreground">
                We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, or as required by applicable laws.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-heading font-bold text-xl">8. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <p className="text-muted-foreground">
                Email: hello@vula24.co.za
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-heading font-bold text-xl">9. Changes to This Policy</h2>
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the {'"Last updated"'} date.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
