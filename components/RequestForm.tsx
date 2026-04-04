'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { GoldButton } from './GoldButton'
import { SERVICES, CITIES } from '@/lib/constants'

type Urgency = 'asap' | '30min' | 'flexible'

const URGENCY_API: Record<Urgency, string> = {
  asap: 'ASAP',
  '30min': '30 min',
  flexible: 'Flexible',
}

export function RequestForm() {
  const [phone, setPhone] = useState('')
  const [location, setLocation] = useState('')
  const [service, setService] = useState('')
  const [urgency, setUrgency] = useState<Urgency>('asap')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!phone || phone.length < 10) {
      setError('Please enter a valid phone number')
      return
    }
    if (!location) {
      setError('Please select your location')
      return
    }
    if (!service) {
      setError('Please select a service')
      return
    }

    setIsSubmitting(true)

    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone,
          location,
          service,
          urgency: URGENCY_API[urgency],
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(typeof data.error === 'string' ? data.error : 'Something went wrong. Please try again.')
        setIsSubmitting(false)
        return
      }
      setIsSuccess(true)
    } catch {
      setError('Network error. Please check your connection and try again.')
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
          Request Received!
        </h3>
        <p className="text-muted-foreground">
          We are connecting you to a locksmith now. Expect a call within 5 minutes.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-xl p-6 md:p-8">
      <h3 className="font-heading font-bold text-xl text-foreground mb-6">
        Get Help Now
      </h3>

      <div className="space-y-4">
        {/* Phone */}
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
            className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
          />
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-muted-foreground mb-2">
            Your Location
          </label>
          <select
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
          >
            <option value="">Select your city</option>
            <optgroup label="Gauteng">
              {CITIES.gauteng.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </optgroup>
            <optgroup label="Western Cape">
              {CITIES.westernCape.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </optgroup>
          </select>
        </div>

        {/* Service */}
        <div>
          <label htmlFor="service" className="block text-sm font-medium text-muted-foreground mb-2">
            Service Needed
          </label>
          <select
            id="service"
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
          >
            <option value="">Select a service</option>
            {SERVICES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Urgency */}
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            How urgent?
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: 'asap', label: 'ASAP' },
              { value: '30min', label: '30 min' },
              { value: 'flexible', label: 'Flexible' },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setUrgency(option.value as Urgency)}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all border',
                  urgency === option.value
                    ? 'bg-gold text-background border-gold'
                    : 'bg-background text-muted-foreground border-border hover:border-gold'
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Error */}
        {error && (
          <p className="text-destructive text-sm">{error}</p>
        )}

        {/* Submit */}
        <GoldButton
          type="submit"
          label={isSubmitting ? 'Connecting...' : 'Get Help Now'}
          size="lg"
          className="w-full mt-2"
          disabled={isSubmitting}
        />
      </div>
    </form>
  )
}
