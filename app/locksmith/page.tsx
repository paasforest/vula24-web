import { redirect } from 'next/navigation'

/** Old URL — account lives under /for-locksmiths/account. */
export default async function LocksmithLegacyRedirect({
  searchParams,
}: {
  searchParams: Promise<{ signup?: string }>
}) {
  const sp = await searchParams
  redirect(
    sp.signup === '1'
      ? '/for-locksmiths/account?signup=1'
      : '/for-locksmiths/account'
  )
}
