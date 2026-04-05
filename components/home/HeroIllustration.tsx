import { KeyRound, MapPin, ShieldCheck } from 'lucide-react'

/** Decorative hero cluster — Lucide + soft glow (no image assets). */
export function HeroIllustration() {
  return (
    <div
      className="relative mx-auto flex h-[min(320px,50vh)] max-w-md items-center justify-center md:h-[380px]"
      aria-hidden
    >
      <div className="absolute inset-0 rounded-[50%] bg-gold/[0.06] blur-3xl" />
      <div className="absolute inset-[8%] rounded-[50%] border border-gold/15" />
      <div className="absolute inset-[22%] rounded-[50%] border border-border/60" />
      <KeyRound
        className="relative z-10 h-32 w-32 text-gold drop-shadow-[0_0_28px_rgba(212,160,23,0.35)] md:h-40 md:w-40"
        strokeWidth={1.15}
      />
      <MapPin
        className="absolute right-2 top-10 z-20 h-11 w-11 text-gold/50 md:right-4 md:top-14 md:h-12 md:w-12"
        strokeWidth={1.25}
      />
      <ShieldCheck
        className="absolute bottom-12 left-0 z-20 h-11 w-11 text-gold/45 md:bottom-14 md:left-2 md:h-12 md:w-12"
        strokeWidth={1.25}
      />
      <div className="absolute right-10 top-1/2 z-0 h-px w-16 -translate-y-1/2 bg-gradient-to-r from-transparent via-gold/25 to-transparent md:w-24" />
      <div className="absolute left-10 top-1/2 z-0 h-px w-16 -translate-y-1/2 bg-gradient-to-l from-transparent via-gold/25 to-transparent md:w-24" />
    </div>
  )
}
