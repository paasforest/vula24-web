import { MetadataRoute } from 'next'
import { ALL_LOCATIONS } from '@/lib/locations'

const BASE = 'https://www.vula24.co.za'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE, priority: 1.0, changeFrequency: 'weekly' as const },
    { url: `${BASE}/how-it-works`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${BASE}/coverage`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${BASE}/pricing`, priority: 0.65, changeFrequency: 'monthly' as const },
    { url: `${BASE}/apply`, priority: 0.65, changeFrequency: 'monthly' as const },
    { url: `${BASE}/thank-you`, priority: 0.3, changeFrequency: 'yearly' as const },
    { url: `${BASE}/for-locksmiths`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${BASE}/locksmith`, priority: 0.68, changeFrequency: 'monthly' as const },
    { url: `${BASE}/about`, priority: 0.6, changeFrequency: 'monthly' as const },
    { url: `${BASE}/contact`, priority: 0.6, changeFrequency: 'monthly' as const },
    { url: `${BASE}/terms`, priority: 0.35, changeFrequency: 'yearly' as const },
    { url: `${BASE}/privacy-policy`, priority: 0.35, changeFrequency: 'yearly' as const },
    { url: `${BASE}/resources`, priority: 0.72, changeFrequency: 'monthly' as const },
    {
      url: `${BASE}/resources/locksmith-cost-south-africa`,
      priority: 0.7,
      changeFrequency: 'monthly' as const,
    },
    {
      url: `${BASE}/resources/what-to-do-locked-out`,
      priority: 0.7,
      changeFrequency: 'monthly' as const,
    },
    { url: `${BASE}/locksmith-gauteng`, priority: 0.95, changeFrequency: 'weekly' as const },
    { url: `${BASE}/locksmith-western-cape`, priority: 0.95, changeFrequency: 'weekly' as const },
  ].map((p) => ({
    ...p,
    lastModified: new Date(),
  }))

  const locationPages = ALL_LOCATIONS.map((loc) => ({
    url: `${BASE}/locksmith-${loc.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  const servicePages = [
    'car-lockout',
    'house-lockout',
    'lost-car-key',
    'lock-repair',
    'safe-opening',
  ].map((s) => ({
    url: `${BASE}/services/${s}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  return [...staticPages, ...locationPages, ...servicePages]
}
