import { redirect } from 'next/navigation'

/** Locksmith portal entry — sign in (apply lives under /for-locksmiths/account). */
export default function LocksmithLegacyRedirect() {
  redirect('/locksmith/login')
}
