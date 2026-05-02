'use client'

import { GoldButton } from '@/components/GoldButton'
import { CONTACT } from '@/lib/constants'

export function AppDownload() {
  return (
    <section className="py-16 md:py-24 px-4 bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        
        <div>
          <p className="text-sm font-heading font-bold text-gold uppercase tracking-wide mb-2">
            Mobile app
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
            Get a locksmith in minutes — without the stress
          </h2>
          <p className="text-muted-foreground mb-6 max-w-lg">
            The Vula24 app connects you to a verified locksmith near you, shows the
            price upfront, and lets you track them live — so you are never left
            guessing.
          </p>

          <ul className="space-y-3 text-muted-foreground text-sm mb-8">
            <li className="flex gap-2">
              <span className="text-gold font-heading font-bold shrink-0">→</span>
              See the full price before you confirm — no surprises, no price changes on
              arrival.
            </li>
            <li className="flex gap-2">
              <span className="text-gold font-heading font-bold shrink-0">→</span>
              Get help fast, 24/7 — request a locksmith in seconds and get matched
              nearby.
            </li>
            <li className="flex gap-2">
              <span className="text-gold font-heading font-bold shrink-0">→</span>
              Track your locksmith live on the map — know exactly who is coming and
              when.
            </li>
            <li className="flex gap-2">
              <span className="text-gold font-heading font-bold shrink-0">→</span>
              Pay securely through the app — safe, simple, and recorded.
            </li>
            <li className="flex gap-2">
              <span className="text-gold font-heading font-bold shrink-0">→</span>
              Rate and review after the job — only trusted professionals stay on the
              platform.
            </li>
          </ul>

          <div className="flex flex-wrap gap-4">
            <GoldButton
              label="Coming soon on Google Play"
              href={`https://wa.me/${CONTACT.whatsapp}`}
              size="lg"
            />
            <GoldButton
              label="Join early access on WhatsApp"
              href={`https://wa.me/${CONTACT.whatsapp}`}
              size="lg"
              variant="outline"
            />
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            No scams. No price changes. No waiting.
          </p>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="relative">
            <div className="w-64 h-[480px] bg-background border-2 border-border rounded-[36px] flex flex-col overflow-hidden shadow-2xl">
              
              <div className="bg-[#111111] px-4 py-3 flex items-center justify-between border-b border-border">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-border" />
                  <div className="w-2 h-2 rounded-full bg-border" />
                  <div className="w-2 h-2 rounded-full bg-border" />
                </div>
                <span className="text-xs text-muted-foreground font-mono">Vula24</span>
                <div className="w-12" />
              </div>

              <div className="flex-1 bg-[#111111] p-4 flex flex-col gap-3">
                <div className="bg-surface border border-border rounded-xl p-3">
                  <p className="text-xs text-muted-foreground mb-1">Service</p>
                  <p className="text-sm font-heading font-bold text-foreground">Car Lockout</p>
                </div>

                <div className="flex-1 bg-surface border border-border rounded-xl overflow-hidden relative min-h-32">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-gold" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-background border border-border rounded-lg px-2 py-1">
                    <p className="text-xs text-gold font-heading font-bold">Live tracking</p>
                  </div>
                </div>

                <div className="bg-surface border border-border rounded-xl p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center">
                      <span className="text-gold text-xs font-bold">T</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-heading font-bold text-foreground">Test Locksmith</p>
                      <p className="text-xs text-muted-foreground">★ 5.0 · White Sedan</p>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-gold flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.72A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="bg-gold rounded-xl p-3 text-center">
                  <p className="text-xs font-heading font-bold text-[#111111]">
                    Locksmith on the way
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gold/10 border border-gold/20 blur-xl" />
            <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-gold/5 border border-gold/10 blur-xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
