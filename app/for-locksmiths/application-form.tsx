'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { GoldButton } from '@/components/GoldButton'
import { CITIES } from '@/lib/constants'

export function LocksmithApplicationForm() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [experience, setExperience] = useState('')
  const [vehicle, setVehicle] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!name.trim()) {
      setError('Please enter your name')
      return
    }
    if (!phone || phone.length < 10) {
      setError('Please enter a valid phone number')
      return
    }
    if (!city) {
      setError('Please select your city')
      return
    }
    if (!experience) {
      setError('Please select your experience level')
      return
    }
    if (!vehicle) {
      setError('Please indicate if you have a vehicle')
      return
    }

    setIsSubmitting(true)

    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone,
          city,
          experience,
          vehicle,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(typeof data.error === 'string' ? data.error : 'Something went wrong. Please try again.')
        setIsSubmitting(false)
        return
      }
      router.push('/thank-you')
    } catch {
      setError('Network error. Please check your connection and try again.')
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-background border border-border rounded-xl p-6 md:p-8">
      <div className="space-y-4">
        {/* Name */}
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
            className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
          />
        </div>

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
            className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
          />
        </div>

        {/* City */}
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-muted-foreground mb-2">
            Your City
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

        {/* Experience */}
        <div>
          <label htmlFor="experience" className="block text-sm font-medium text-muted-foreground mb-2">
            Years of Experience
          </label>
          <select
            id="experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
          >
            <option value="">Select experience</option>
            <option value="0-1">Less than 1 year</option>
            <option value="1-3">1-3 years</option>
            <option value="3-5">3-5 years</option>
            <option value="5+">5+ years</option>
          </select>
        </div>

        {/* Vehicle */}
        <div>
          <label htmlFor="vehicle" className="block text-sm font-medium text-muted-foreground mb-2">
            Do you have your own vehicle?
          </label>
          <select
            id="vehicle"
            value={vehicle}
            onChange={(e) => setVehicle(e.target.value)}
            className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
          >
            <option value="">Select an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {/* Error */}
        {error && (
          <p className="text-destructive text-sm">{error}</p>
        )}

        {/* Submit */}
        <GoldButton
          type="submit"
          label={isSubmitting ? 'Submitting...' : 'Submit Application'}
          size="lg"
          className="w-full mt-2"
          disabled={isSubmitting}
        />
      </div>
    </form>
  )
}
