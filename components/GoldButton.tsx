'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'

interface GoldButtonProps {
  label: string
  href?: string
  onClick?: () => void
  size?: 'sm' | 'md' | 'lg'
  variant?: 'solid' | 'outline'
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
}

export function GoldButton({
  label,
  href,
  onClick,
  size = 'md',
  variant = 'solid',
  className,
  type = 'button',
  disabled = false,
}: GoldButtonProps) {
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const variants = {
    solid: 'bg-gold text-background hover:opacity-90',
    outline: 'bg-transparent border-2 border-foreground text-foreground hover:bg-foreground hover:text-background',
  }

  const baseClasses = cn(
    'font-heading font-bold rounded-lg transition-all duration-200 inline-flex items-center justify-center gap-2',
    sizes[size],
    variants[variant],
    disabled && 'opacity-50 cursor-not-allowed',
    className
  )

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {label}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
    >
      {label}
    </button>
  )
}
