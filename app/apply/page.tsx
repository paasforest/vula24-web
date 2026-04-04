import { redirect } from 'next/navigation'

/** Legacy URL — application lives on the locksmith account page (Apply tab). */
export default function ApplyRedirectPage() {
  redirect('/for-locksmiths/account?signup=1')
}

