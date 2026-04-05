import { MapPin } from 'lucide-react'

/** Region cards + pins — reinforces Gauteng & WC without a heavy map image. */
export function CoverageVisual() {
  return (
    <div className="mx-auto mb-10 flex max-w-lg flex-wrap items-stretch justify-center gap-6 md:gap-10">
      <div className="flex min-w-[140px] flex-1 flex-col items-center gap-3 rounded-2xl border border-gold/20 bg-surface/80 px-6 py-5 shadow-[0_0_0_1px_rgba(212,160,23,0.08)]">
        <div className="rounded-full bg-gold/10 p-3 ring-1 ring-gold/25">
          <MapPin className="h-8 w-8 text-gold" strokeWidth={1.5} />
        </div>
        <span className="font-heading text-sm font-bold tracking-wide text-foreground">Gauteng</span>
        <span className="text-center text-xs text-muted-foreground">Johannesburg, Pretoria &amp; surrounds</span>
      </div>
      <div className="hidden items-center md:flex" aria-hidden>
        <div className="h-px w-8 bg-gradient-to-r from-transparent via-border to-transparent md:w-12" />
      </div>
      <div className="flex min-w-[140px] flex-1 flex-col items-center gap-3 rounded-2xl border border-gold/20 bg-surface/80 px-6 py-5 shadow-[0_0_0_1px_rgba(212,160,23,0.08)]">
        <div className="rounded-full bg-gold/10 p-3 ring-1 ring-gold/25">
          <MapPin className="h-8 w-8 text-gold" strokeWidth={1.5} />
        </div>
        <span className="font-heading text-sm font-bold tracking-wide text-foreground">Western Cape</span>
        <span className="text-center text-xs text-muted-foreground">Cape Town, Winelands &amp; Garden Route</span>
      </div>
    </div>
  )
}
