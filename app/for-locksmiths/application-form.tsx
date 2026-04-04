'use client'

import { useState } from 'react'
import { GoldButton } from '@/components/GoldButton'
import { CITIES, CONTACT } from '@/lib/constants'
import { generateRandomPassword } from '@/lib/generate-password'

export function LocksmithApplicationForm() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [city, setCity] = useState('')
  const [accountType, setAccountType] = useState<'individual' | 'business'>('individual')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!name.trim()) {
      setError('Please enter your full name')
      return
    }
    if (!phone || phone.replace(/\D/g, '').length < 9) {
      setError('Please enter a valid phone number')
      return
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address')
      return
    }
    if (!city) {
      setError('Please select your city or area')
      return
    }

    setIsSubmitting(true)

    const password = generateRandomPassword(8)
    const payload = {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      password,
      accountType: accountType === 'business' ? 'BUSINESS' : 'INDIVIDUAL',
      businessName: city,
    }

    try {
      const res = await fetch('/api/locksmith-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(
          'Something went wrong. Please try again or WhatsApp us directly.'
        )
        setIsSubmitting(false)
        return
      }
      setIsSuccess(true)
    } catch {
      setError(
        'Something went wrong. Please try again or WhatsApp us directly.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="bg-background border border-border rounded-xl p-6 md:p-8 text-center">
        <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-gold"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h3 className="font-heading font-bold text-xl text-foreground mb-2">
          Application received!
        </h3>
        <p className="text-muted-foreground">
          We will review your details and contact you on WhatsApp within 24 hours
          to activate your account and explain how leads work.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-background border border-border rounded-xl p-6 md:p-8">
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Smith"
            autoComplete="name"
            className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-muted-foreground mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="0XX XXX XXXX"
            autoComplete="tel"
            className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium text-muted-foreground mb-2">
            City / Area you operate in
          </label>
          <select
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
          >
            <option value="">Select your city</option>
            <optgroup label="Gauteng">
              {CITIES.gauteng.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </optgroup>
            <optgroup label="Western Cape">
              {CITIES.westernCape.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </optgroup>
          </select>
        </div>

        <div>
          <span className="block text-sm font-medium text-muted-foreground mb-2">
            Account type
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setAccountType('individual')}
              className={`px-4 py-3 rounded-lg text-sm font-medium border transition-colors ${
                accountType === 'individual'
                  ? 'bg-gold text-background border-gold'
                  : 'bg-surface text-muted-foreground border-border hover:border-gold'
              }`}
            >
              Individual locksmith
            </button>
            <button
              type="button"
              onClick={() => setAccountType('business')}
              className={`px-4 py-3 rounded-lg text-sm font-medium border transition-colors ${
                accountType === 'business'
                  ? 'bg-gold text-background border-gold'
                  : 'bg-surface text-muted-foreground border-border hover:border-gold'
              }`}
            >
              Business with a team
            </button>
          </div>
        </div>

        {error && (
          <p className="text-destructive text-sm">{error}</p>
        )}

        <GoldButton
          type="submit"
          label={isSubmitting ? 'Submitting...' : 'Apply to Join Vula24'}
          size="lg"
          className="w-full mt-2"
          disabled={isSubmitting}
        />

        <p className="text-xs text-muted-foreground text-center pt-2">
          Need help?{' '}
          <a
            href={`https://wa.me/${CONTACT.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:underline"
          >
            WhatsApp us
          </a>
        </p>
      </div>
    </form>
  )
}
