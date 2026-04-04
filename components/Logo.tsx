'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Logo({ size = 'md', className }: LogoProps) {
  const sizes = {
    sm: { icon: 20, text: 'text-lg' },
    md: { icon: 28, text: 'text-2xl' },
    lg: { icon: 36, text: 'text-3xl' },
  }

  const { icon, text } = sizes[size]

  return (
    <Link href="/" className={cn('flex items-center gap-2', className)}>
      {/* Key Icon */}
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-gold"
      >
        <path
          d="M21 2L19 4M11.3891 11.6109C12.3844 12.6062 13 13.9812 13 15.5C13 18.5376 10.5376 21 7.5 21C4.46243 21 2 18.5376 2 15.5C2 12.4624 4.46243 10 7.5 10C9.01878 10 10.3938 10.6156 11.3891 11.6109ZM11.3891 11.6109L15.5 7.5M15.5 7.5L18 10L21 7L18.5 4.5L15.5 7.5Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {/* Wordmark */}
      <span className={cn('font-heading font-bold tracking-tight', text)}>
        <span className="text-foreground">Vula</span>
        <span className="text-gold">24</span>
      </span>
    </Link>
  )
}
