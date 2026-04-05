import { LocksmithApplicationForm } from '@/app/for-locksmiths/application-form'

export function LocksmithPortal() {
  return (
    <div id="portal" className="max-w-xl mx-auto">
      <p className="text-muted-foreground text-center text-sm md:text-base mb-8">
        Takes about 2 minutes. We review every application and respond within 24 hours.
      </p>
      <LocksmithApplicationForm />
    </div>
  )
}
