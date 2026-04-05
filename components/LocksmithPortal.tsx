import { LocksmithApplicationForm } from '@/app/for-locksmiths/application-form'

export function LocksmithPortal() {
  return (
    <div id="portal" className="max-w-xl mx-auto">
      <p className="text-muted-foreground text-center text-sm md:text-base mb-8">
        Takes about 2 minutes. You will choose a password and, after approval, use the{' '}
        <strong className="text-foreground">customer code</strong> from your SMS to open the payment portal.
      </p>
      <LocksmithApplicationForm />
    </div>
  )
}
