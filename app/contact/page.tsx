import { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { CONTACT } from '@/lib/constants'
import { ContactForm } from './contact-form'

export const metadata: Metadata = {
  title: 'Vula24 — Contact Us',
  description:
    'Get in touch with Vula24. WhatsApp, phone or email — we are here to help.',
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Nav />

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 text-balance">
            Get in touch
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Need help or have a question? Reach us on WhatsApp, phone or email — we respond fast.
          </p>
        </div>
      </section>

      {/* Contact Options Section */}
      <section className="py-16 md:py-24 px-4 bg-surface">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {/* WhatsApp */}
            <a
              href={`https://wa.me/${CONTACT.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-success text-white rounded-xl p-6 text-center hover:opacity-90 transition-opacity"
            >
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <h3 className="font-heading font-bold text-lg mb-1">WhatsApp</h3>
              <p className="text-white/80 text-sm">Fastest response</p>
            </a>

            {/* Phone */}
            <a
              href={`tel:${CONTACT.phone}`}
              className="bg-background border border-border rounded-xl p-6 text-center hover:border-gold transition-colors"
            >
              <div className="w-14 h-14 bg-surface rounded-full flex items-center justify-center mx-auto mb-4 text-gold">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
              </div>
              <h3 className="font-heading font-bold text-lg mb-1">Phone</h3>
              <p className="text-muted-foreground text-sm">{CONTACT.phone}</p>
            </a>

            {/* Email */}
            <a
              href={`mailto:${CONTACT.email}`}
              className="bg-background border border-border rounded-xl p-6 text-center hover:border-gold transition-colors"
            >
              <div className="w-14 h-14 bg-surface rounded-full flex items-center justify-center mx-auto mb-4 text-gold">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <h3 className="font-heading font-bold text-lg mb-1">Email</h3>
              <p className="text-muted-foreground text-sm">{CONTACT.email}</p>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-center mb-8">
            Send us a message
          </h2>
          <ContactForm />
        </div>
      </section>

      <Footer />
    </main>
  )
}
