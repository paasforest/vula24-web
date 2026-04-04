import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { GoldButton } from '@/components/GoldButton'
import { RequestForm } from '@/components/RequestForm'
import { StickyMobileCTA } from '@/components/StickyMobileCTA'
import { CITIES, CONTACT } from '@/lib/constants'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Nav />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-surface border border-border rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
                <span className="text-sm text-muted-foreground">
                  Available across Gauteng & Western Cape — 24/7
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 text-balance">
                A locksmith. Near you.{' '}
                <span className="text-gold">Now.</span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg text-pretty">
                24/7 emergency locksmith services across South Africa. Verified professionals, no surprises.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 mb-12">
                <GoldButton label="Get Help Now" href="#request" size="lg" />
                <GoldButton 
                  label="Call Now" 
                  href={`tel:${CONTACT.phone}`} 
                  size="lg" 
                  variant="outline" 
                />
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8">
                <div>
                  <p className="font-heading font-bold text-2xl text-foreground">15min</p>
                  <p className="text-sm text-muted-foreground">avg response</p>
                </div>
                <div>
                  <p className="font-heading font-bold text-2xl text-foreground">200+</p>
                  <p className="text-sm text-muted-foreground">jobs done</p>
                </div>
                <div>
                  <p className="font-heading font-bold text-2xl text-foreground">4.9</p>
                  <p className="text-sm text-muted-foreground">avg rating</p>
                </div>
              </div>
            </div>

            {/* Right Content - Request Form */}
            <div id="request" className="scroll-mt-24">
              <RequestForm />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 px-4 bg-surface">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Get help in 3 simple steps
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Request',
                description: 'Tell us where you are and what you need. Takes 30 seconds.',
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                  </svg>
                ),
              },
              {
                step: '02',
                title: 'Matched',
                description: 'We connect you with a verified locksmith in your area.',
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                  </svg>
                ),
              },
              {
                step: '03',
                title: 'Job Done',
                description: 'Your locksmith arrives and solves your problem. Fast.',
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <path d="M22 4L12 14.01l-3-3" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div key={item.step} className="bg-background border border-border rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 text-gold">
                  {item.icon}
                </div>
                <p className="text-gold font-heading font-bold text-sm mb-2">{item.step}</p>
                <h3 className="font-heading font-bold text-xl mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-12">
            Why Choose Vula24
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Verified',
                description: 'Every locksmith is vetted and verified. No strangers at your door.',
                icon: (
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                ),
              },
              {
                title: 'Fast',
                description: 'Average response time of 15 minutes. Help when you need it.',
                icon: (
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                ),
              },
              {
                title: '24/7',
                description: 'Day or night, weekday or weekend. We are always available.',
                icon: (
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a7 7 0 00-7 7" />
                    <path d="M12 22a7 7 0 007-7" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-20 h-20 bg-surface border border-border rounded-2xl flex items-center justify-center mx-auto mb-4 text-gold">
                  {item.icon}
                </div>
                <h3 className="font-heading font-bold text-xl mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage Section */}
      <section className="py-16 md:py-24 px-4 bg-surface">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-4">
            Coverage Areas
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Available across Gauteng and Western Cape
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Gauteng */}
            <div className="bg-background border border-border rounded-xl p-6">
              <h3 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
                <span className="w-3 h-3 bg-gold rounded-full" />
                Gauteng
              </h3>
              <div className="flex flex-wrap gap-2">
                {CITIES.gauteng.map((city) => (
                  <span
                    key={city}
                    className="bg-surface border border-border rounded-full px-3 py-1 text-sm text-muted-foreground"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>

            {/* Western Cape */}
            <div className="bg-background border border-border rounded-xl p-6">
              <h3 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
                <span className="w-3 h-3 bg-gold rounded-full" />
                Western Cape
              </h3>
              <div className="flex flex-wrap gap-2">
                {CITIES.westernCape.map((city) => (
                  <span
                    key={city}
                    className="bg-surface border border-border rounded-full px-3 py-1 text-sm text-muted-foreground"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
            Need help right now?
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Get connected to a verified locksmith in your area within minutes.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <GoldButton label="Get Help Now" href="#request" size="lg" />
            <a
              href={`https://wa.me/${CONTACT.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-success text-white px-6 py-4 rounded-lg font-heading font-bold text-lg hover:opacity-90 transition-opacity"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <StickyMobileCTA />
    </main>
  )
}
