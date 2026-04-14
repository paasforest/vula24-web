import { redirect } from 'next/navigation'

/** Legacy URL — pricing content lives under For Locksmiths (#pricing). */
export default function PricingPage() {
  redirect('/for-locksmiths')
}
