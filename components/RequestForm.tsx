'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { GoldButton } from './GoldButton'
import { CITIES, CONTACT, CUSTOMER_JOB_SERVICES } from '@/lib/constants'

const URGENCY_OPTIONS = [
  { value: 'Right now — emergency', label: 'Right now — emergency' },
  { value: 'Within the hour', label: 'Within the hour' },
  { value: 'Today — flexible time', label: 'Today — flexible time' },
] as const

export function RequestForm() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [serviceType, setServiceType] = useState('')
  const [urgency, setUrgency] = useState<string>(URGENCY_OPTIONS[0].value)
  const [notes, setNotes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [successCity, setSuccessCity] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!name.trim()) {
      setError('Please enter your name')
      return
    }
    if (!phone || phone.replace(/\D/g, '').length < 9) {
      setError('Please enter a valid phone number')
      return
    }
    if (!city) {
      setError('Please select your city')
      return
    }
    if (!serviceType) {
      setError('Please select a service')
      return
    }

    setIsSubmitting(true)

    try {
      const res = await fetch('/api/jobs-website-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          city,
          serviceType,
          urgency,
          notes: notes.trim() || undefined,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError('Something went wrong. Please WhatsApp us directly.')
        setIsSubmitting(false)
        return
      }
      setSuccessCity(city)
      setIsSuccess(true)
    } catch {
      setError('Something went wrong. Please WhatsApp us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="bg-surface border border-border rounded-xl p-8 text-center">
        <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-success"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h3 className="font-heading font-bold text-xl text-foreground mb-2">
          Request received!
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          A locksmith in {successCity} will call you within 15 minutes. If you
          do not hear back, WhatsApp us:{' '}
          <a
            href={`https://wa.me/${CONTACT.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:underline"
          >
            {CONTACT.phone}
          </a>
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-surface border border-border rounded-xl p-6 md:p-8"
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="cust-name" className="block text-sm font-medium text-muted-foreground mb-2">
            Your Name
          </label>
          <input
            type="text"
            id="cust-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
            className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="cust-phone" className="block text-sm font-medium text-muted-foreground mb-2">
            Your Phone Number
          </label>
          <input
            type="tel"
            id="cust-phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            autoComplete="tel"
            placeholder="0XX XXX XXXX"
            className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="cust-city" className="block text-sm font-medium text-muted-foreground mb-2">
            Your City
          </label>
          <select
            id="cust-city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
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
          <label htmlFor="cust-service" className="block text-sm font-medium text-muted-foreground mb-2">
            Service Needed
          </label>
          <select
            id="cust-service"
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            required
            className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
          >
            <option value="">Select a service</option>
            {CUSTOMER_JOB_SERVICES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <span className="block text-sm font-medium text-muted-foreground mb-3">
            How urgent?
          </span>
          <div className="space-y-2">
            {URGENCY_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-colors',
                  urgency === opt.value
                    ? 'border-gold bg-gold/10'
                    : 'border-border bg-background hover:border-gold/50'
                )}
              >
                <input
                  type="radio"
                  name="urgency"
                  value={opt.value}
                  checked={urgency === opt.value}
                  onChange={() => setUrgency(opt.value)}
                  className="text-gold focus:ring-gold"
                />
                <span className="text-sm text-foreground">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="cust-notes" className="block text-sm font-medium text-muted-foreground mb-2">
            Any extra details? <span className="text-muted-foreground/70">(optional)</span>
          </label>
          <textarea
            id="cust-notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="e.g. Blue Toyota Corolla, outside Checkers Worcester"
            className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent resize-y min-h-[88px]"
          />
        </div>

        {error && (
          <p className="text-destructive text-sm">{error}</p>
        )}

        <GoldButton
          type="submit"
          label={isSubmitting ? 'Sending...' : 'Find Me a Locksmith'}
          size="lg"
          className="w-full mt-2"
          disabled={isSubmitting}
        />
      </div>
    </form>
  )
}
