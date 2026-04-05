'use client'

import { useState } from 'react'
import { GoldButton } from '@/components/GoldButton'
import { CONTACT } from '@/lib/constants'
import { API_SERVICE_OPTIONS, SUBURBS } from '@/lib/api-services'
import { getVula24ApiBase } from '@/lib/vula24-api'

const EMERGENCY_SERVICE_KEYS = [
  'car_lockout',
  'house_lockout',
  'office_lockout',
] as const
const URGENT_SERVICE_KEYS = [
  'lost_car_key',
  'car_key_programming',
  'broken_key_extraction',
  'house_key_replacement',
  'safe_opening',
  'padlock_removal',
  'ignition_repair',
] as const
const FLEXIBLE_SERVICE_KEYS = [
  'car_key_duplication',
  'house_key_duplication',
  'lock_repair',
  'lock_replacement',
  'lock_upgrade',
  'gate_motor',
  'access_control',
  'garage_door',
] as const

type Province = 'GP' | 'WC'
type Tier = 'Starter' | 'Pro'

const STARTER_MAX_SUBURBS = 3

export function LocksmithApplicationForm() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [baseAddress, setBaseAddress] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [province, setProvince] = useState<Province>('GP')
  const [tier, setTier] = useState<Tier>('Starter')
  const [coverageAreas, setCoverageAreas] = useState<string[]>([])
  const [accountType, setAccountType] = useState<'individual' | 'business'>('individual')
  const [services, setServices] = useState<string[]>([])
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const suburbs = SUBURBS[province]

  const toggleSuburb = (suburb: string) => {
    setCoverageAreas((prev) => {
      const has = prev.includes(suburb)
      if (has) return prev.filter((s) => s !== suburb)
      if (tier === 'Starter' && prev.length >= STARTER_MAX_SUBURBS) {
        setError(`Starter covers up to ${STARTER_MAX_SUBURBS} suburbs. Switch to Pro or remove one.`)
        return prev
      }
      setError('')
      return [...prev, suburb]
    })
  }

  const handleProvinceChange = (p: Province) => {
    setProvince(p)
    setCoverageAreas([])
    setError('')
  }

  const handleTierChange = (t: Tier) => {
    setTier(t)
    if (t === 'Starter' && coverageAreas.length > STARTER_MAX_SUBURBS) {
      setCoverageAreas((prev) => prev.slice(0, STARTER_MAX_SUBURBS))
    }
    setError('')
  }

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
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (!baseAddress.trim()) {
      setError('Please enter your base address (street or area)')
      return
    }
    if (accountType === 'business' && !businessName.trim()) {
      setError('Please enter your business name')
      return
    }
    if (coverageAreas.length === 0) {
      setError('Select at least one suburb you cover')
      return
    }
    if (tier === 'Starter' && coverageAreas.length > STARTER_MAX_SUBURBS) {
      setError(`Starter allows at most ${STARTER_MAX_SUBURBS} suburbs`)
      return
    }
    if (services.length === 0) {
      setError('Select at least one service you offer')
      return
    }

    setIsSubmitting(true)

    const resolvedBusiness =
      accountType === 'business'
        ? businessName.trim()
        : businessName.trim() || `${name.trim()} (Individual)`

    const payload = {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      password,
      accountType: accountType === 'business' ? 'BUSINESS' : 'INDIVIDUAL',
      businessName: resolvedBusiness,
      services,
      province,
      coverageAreas,
      baseAddress: baseAddress.trim(),
    }

    try {
      const base = getVula24ApiBase()
      const res = await fetch(`${base}/api/auth/locksmith/register`, {
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
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gold"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h3 className="font-heading font-bold text-xl text-foreground mb-2">
          Application received!
        </h3>
        <p className="text-muted-foreground text-left leading-relaxed">
          We will review your details and contact you on WhatsApp within 24 hours to activate your
          account.
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
          <label htmlFor="accountPassword" className="block text-sm font-medium text-muted-foreground mb-2">
            Password <span className="text-destructive" aria-hidden>*</span>
          </label>
          <p className="text-xs text-muted-foreground mb-2">
            Choose a password for your account. Minimum 6 characters.
          </p>
          <input
            type="password"
            id="accountPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            minLength={6}
            className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-muted-foreground mb-2">
            Confirm password <span className="text-destructive" aria-hidden>*</span>
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
            minLength={6}
            className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="baseAddress" className="block text-sm font-medium text-muted-foreground mb-2">
            Base address
          </label>
          <input
            type="text"
            id="baseAddress"
            value={baseAddress}
            onChange={(e) => setBaseAddress(e.target.value)}
            placeholder="Street, suburb, or landmark you operate from"
            autoComplete="street-address"
            className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
          />
        </div>

        <div>
          <span className="block text-sm font-medium text-muted-foreground mb-2">
            Province
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleProvinceChange('GP')}
              className={`px-4 py-3 rounded-lg text-sm font-medium border transition-colors ${
                province === 'GP'
                  ? 'bg-gold text-background border-gold'
                  : 'bg-surface text-muted-foreground border-border hover:border-gold'
              }`}
            >
              Gauteng (GP)
            </button>
            <button
              type="button"
              onClick={() => handleProvinceChange('WC')}
              className={`px-4 py-3 rounded-lg text-sm font-medium border transition-colors ${
                province === 'WC'
                  ? 'bg-gold text-background border-gold'
                  : 'bg-surface text-muted-foreground border-border hover:border-gold'
              }`}
            >
              Western Cape (WC)
            </button>
          </div>
        </div>

        <div>
          <span className="block text-sm font-medium text-muted-foreground mb-2">
            Coverage tier
          </span>
          <p className="text-xs text-muted-foreground mb-2">
            Starter: up to {STARTER_MAX_SUBURBS} suburbs. Pro: full province list.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleTierChange('Starter')}
              className={`px-4 py-3 rounded-lg text-sm font-medium border transition-colors ${
                tier === 'Starter'
                  ? 'bg-gold text-background border-gold'
                  : 'bg-surface text-muted-foreground border-border hover:border-gold'
              }`}
            >
              Starter
            </button>
            <button
              type="button"
              onClick={() => handleTierChange('Pro')}
              className={`px-4 py-3 rounded-lg text-sm font-medium border transition-colors ${
                tier === 'Pro'
                  ? 'bg-gold text-background border-gold'
                  : 'bg-surface text-muted-foreground border-border hover:border-gold'
              }`}
            >
              Pro
            </button>
          </div>
        </div>

        <div>
          <span className="block text-sm font-medium text-muted-foreground mb-2">
            Suburbs you cover <span className="text-destructive" aria-hidden>*</span>
          </span>
          <p className="text-xs text-muted-foreground mb-3">
            {tier === 'Starter'
              ? `Select up to ${STARTER_MAX_SUBURBS} suburbs.`
              : 'Select all suburbs you want to receive leads in.'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[min(280px,50vh)] overflow-y-auto rounded-lg border border-border bg-surface/50 p-3">
            {suburbs.map((suburb) => {
              const checked = coverageAreas.includes(suburb)
              const disabled =
                !checked &&
                tier === 'Starter' &&
                coverageAreas.length >= STARTER_MAX_SUBURBS
              return (
                <label
                  key={suburb}
                  className={`flex cursor-pointer items-start gap-2 rounded-md px-2 py-2 text-sm transition-colors hover:bg-background/80 ${
                    disabled ? 'opacity-50 cursor-not-allowed' : ''
                  } ${checked ? 'text-foreground' : 'text-muted-foreground'}`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    disabled={disabled}
                    onChange={() => toggleSuburb(suburb)}
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-border text-gold focus:ring-gold"
                  />
                  <span>{suburb}</span>
                </label>
              )
            })}
          </div>
        </div>

        <div>
          <span className="block text-sm font-medium text-muted-foreground mb-2">
            Services you offer{' '}
            <span className="text-destructive" aria-hidden>
              *
            </span>
          </span>
          <p className="text-xs text-muted-foreground mb-3">
            Tick everything you can take — we match you to customers who need these jobs. At least one
            service is required.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-lg border border-border bg-surface/50 p-3 space-y-2">
              <p className="text-xs font-semibold text-foreground">
                🔴 Emergency
              </p>
              <p className="text-[11px] text-muted-foreground">Emergency services</p>
              {EMERGENCY_SERVICE_KEYS.map((value) => {
                const opt = API_SERVICE_OPTIONS.find((o) => o.value === value)
                if (!opt) return null
                const checked = services.includes(value)
                return (
                  <label
                    key={value}
                    className={`flex cursor-pointer items-start gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-background/80 ${
                      checked ? 'text-foreground' : 'text-muted-foreground'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => {
                        setServices((prev) =>
                          checked ? prev.filter((s) => s !== value) : [...prev, value]
                        )
                      }}
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-border text-gold focus:ring-gold"
                    />
                    <span>
                      <span className="mr-1.5 inline-block h-2 w-2 shrink-0 rounded-full bg-red-500" aria-hidden />
                      {opt.label}
                    </span>
                  </label>
                )
              })}
            </div>
            <div className="rounded-lg border border-border bg-surface/50 p-3 space-y-2">
              <p className="text-xs font-semibold text-foreground">
                🟡 Urgent
              </p>
              <p className="text-[11px] text-muted-foreground">Urgent services</p>
              {URGENT_SERVICE_KEYS.map((value) => {
                const opt = API_SERVICE_OPTIONS.find((o) => o.value === value)
                if (!opt) return null
                const checked = services.includes(value)
                return (
                  <label
                    key={value}
                    className={`flex cursor-pointer items-start gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-background/80 ${
                      checked ? 'text-foreground' : 'text-muted-foreground'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => {
                        setServices((prev) =>
                          checked ? prev.filter((s) => s !== value) : [...prev, value]
                        )
                      }}
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-border text-gold focus:ring-gold"
                    />
                    <span>
                      <span className="mr-1.5 inline-block h-2 w-2 shrink-0 rounded-full bg-amber-500" aria-hidden />
                      {opt.label}
                    </span>
                  </label>
                )
              })}
            </div>
            <div className="rounded-lg border border-border bg-surface/50 p-3 space-y-2 md:col-span-1">
              <p className="text-xs font-semibold text-foreground">
                🟢 Flexible
              </p>
              <p className="text-[11px] text-muted-foreground">Flexible services</p>
              {FLEXIBLE_SERVICE_KEYS.map((value) => {
                const opt = API_SERVICE_OPTIONS.find((o) => o.value === value)
                if (!opt) return null
                const checked = services.includes(value)
                return (
                  <label
                    key={value}
                    className={`flex cursor-pointer items-start gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-background/80 ${
                      checked ? 'text-foreground' : 'text-muted-foreground'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => {
                        setServices((prev) =>
                          checked ? prev.filter((s) => s !== value) : [...prev, value]
                        )
                      }}
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-border text-gold focus:ring-gold"
                    />
                    <span>
                      <span className="mr-1.5 inline-block h-2 w-2 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                      {opt.label}
                    </span>
                  </label>
                )
              })}
            </div>
          </div>
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

        {accountType === 'business' && (
          <div>
            <label htmlFor="businessName" className="block text-sm font-medium text-muted-foreground mb-2">
              Business name
            </label>
            <input
              type="text"
              id="businessName"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="Registered trading name"
              className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
            />
          </div>
        )}

        {accountType === 'individual' && (
          <div>
            <label htmlFor="tradingName" className="block text-sm font-medium text-muted-foreground mb-2">
              Trading name <span className="text-muted-foreground/70">(optional)</span>
            </label>
            <input
              type="text"
              id="tradingName"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="How customers know you — defaults to your name if empty"
              className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
            />
          </div>
        )}

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
