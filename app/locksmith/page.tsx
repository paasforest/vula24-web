import { redirect } from 'next/navigation'

/** Legacy URL — redirects to apply page. */
export default function LocksmithLegacyRedirect() {
  redirect('/for-locksmiths/account')
}
