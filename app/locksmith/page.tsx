import { redirect } from 'next/navigation'

/** Old URL — everything lives on /for-locksmiths now. */
export default async function LocksmithLegacyRedirect({
  searchParams,
}: {
  searchParams: Promise<{ signup?: string }>
}) {
  const sp = await searchParams
  redirect(sp.signup === '1' ? '/for-locksmiths?signup=1' : '/for-locksmiths')
}
