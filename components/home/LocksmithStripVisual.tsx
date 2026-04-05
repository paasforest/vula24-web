import { Bell, Smartphone } from 'lucide-react'

/** Visual for “jobs to your phone” strip. */
export function LocksmithStripVisual() {
  return (
    <div
      className="relative mx-auto flex max-w-sm items-center justify-center py-4 md:mx-0 md:justify-end"
      aria-hidden
    >
      <div className="absolute inset-0 rounded-3xl bg-gold/[0.04] blur-2xl" />
      <div className="relative flex items-center gap-4 rounded-2xl border border-border bg-background/80 px-6 py-5 shadow-sm">
        <Smartphone className="h-14 w-14 shrink-0 text-gold/80" strokeWidth={1.1} />
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <Bell className="h-3.5 w-3.5 text-gold" />
            New job in your area
          </div>
          <div className="h-2 w-36 max-w-full rounded-full bg-muted/40">
            <div className="h-full w-2/3 rounded-full bg-gold/50" />
          </div>
          <div className="h-2 w-28 rounded-full bg-muted/30" />
        </div>
      </div>
    </div>
  )
}
