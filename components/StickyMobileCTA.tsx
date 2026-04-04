'use client'

import Link from 'next/link'

export function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
      <Link
        href="/#request"
        className="flex items-center justify-center gap-2 bg-gold text-background font-heading font-bold py-4 px-6 w-full hover:opacity-90 transition-opacity"
      >
        Find a Locksmith
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  )
}
