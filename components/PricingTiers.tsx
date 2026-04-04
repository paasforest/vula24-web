import { GoldButton } from '@/components/GoldButton'
import { PRICING } from '@/lib/constants'

/** Full Starter / Pro tier cards — used on /pricing only. */
export function PricingTiers() {
  return (
    <div className="rounded-2xl border border-border bg-background p-6 md:p-10 lg:p-12">
      <div className="text-center mb-10 md:mb-12 max-w-2xl mx-auto">
        <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4 text-balance">
          Simple monthly plans. No hidden fees.
        </h2>
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
          One flat monthly fee. We never take a cut from your jobs.
        </p>
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed mt-2">
          You keep 100% of what you earn from every customer.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto mb-8">
        {PRICING.map((plan) => (
          <div
            key={plan.name}
            className={`relative flex flex-col rounded-xl border p-6 md:p-8 ${
              plan.featured
                ? 'border-gold bg-surface/80 shadow-[0_0_0_1px_rgba(212,160,23,0.15)]'
                : 'border-border bg-surface/40'
            }`}
          >
            {plan.featured && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-gold text-background text-xs font-bold px-3 py-1 rounded-full">
                  MOST POPULAR
                </span>
              </div>
            )}
            <h3 className="font-heading font-bold text-2xl mb-1">{plan.name}</h3>
            <div className="mb-6 pb-6 border-b border-border">
              <span className="font-heading font-bold text-4xl tracking-tight">
                {plan.price}
              </span>
              <span className="text-muted-foreground text-xl font-medium">
                /{plan.period}
              </span>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gold flex-shrink-0 mt-0.5"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span className="text-muted-foreground leading-snug">{feature}</span>
                </li>
              ))}
            </ul>
            <GoldButton
              label={plan.cta}
              href="/apply"
              size="md"
              variant={plan.featured ? 'solid' : 'outline'}
              className="w-full mt-auto"
            />
          </div>
        ))}
      </div>

      <p className="text-center text-sm text-muted-foreground max-w-lg mx-auto pt-2 border-t border-border">
        All plans include a 14-day free trial. No credit card required to start.
      </p>
    </div>
  )
}
