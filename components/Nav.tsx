'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Logo } from './Logo'
import { GoldButton } from './GoldButton'
import { LOCKSMITH_LOGIN_URL, NAV_LINKS } from '@/lib/constants'

export function Nav() {
  const [isOpen, setIsOpen] = useState(false)

  const loginHref = LOCKSMITH_LOGIN_URL || '#'

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo size="md" />

          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={loginHref}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Locksmith Login
            </Link>
            <GoldButton label="Find a Locksmith" href="/#coverage" size="sm" />
          </div>

          <div className="flex md:hidden items-center gap-3">
            <GoldButton label="Find a Locksmith" href="/#coverage" size="sm" />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-foreground"
              aria-label="Toggle menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {isOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M3 12h18M3 6h18M3 18h18" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        className={cn(
          'md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-background border-b border-border',
          isOpen ? 'max-h-[28rem] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="px-4 py-4 space-y-3">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-muted-foreground hover:text-foreground transition-colors text-base font-medium py-2"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={loginHref}
            onClick={() => setIsOpen(false)}
            className="block text-foreground font-medium py-2"
          >
            Locksmith Login
          </Link>
        </div>
      </div>
    </nav>
  )
}
