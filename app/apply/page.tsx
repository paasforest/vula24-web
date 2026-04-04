import { redirect } from 'next/navigation'

/** Legacy URL — application lives on For Locksmiths (Sign up tab). */
export default function ApplyRedirectPage() {
  redirect('/for-locksmiths?signup=1')
}
