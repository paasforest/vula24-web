import locData from './locations-data.json'

export type Province = 'Gauteng' | 'Western Cape'

export interface RecentJob {
  service: string
  suburb: string
  timeAgo: string
  note: string
}

export interface LocationData {
  slug: string
  name: string
  province: Province
  provinceSlug: string
  /** Unique local hook for SEO (not shared template copy). */
  localSeoLine: string
  tagline: string
  description: string
  suburbs: string[]
  nearbyAreas: string[]
  recentJobs: RecentJob[]
  faqs: { q: string; a: string }[]
}

export const GAUTENG_LOCATIONS = locData.gauteng as LocationData[]
export const WESTERN_CAPE_LOCATIONS = locData.westernCape as LocationData[]

export const ALL_LOCATIONS: LocationData[] = [
  ...GAUTENG_LOCATIONS,
  ...WESTERN_CAPE_LOCATIONS,
]

export function getLocationBySlug(slug: string): LocationData | undefined {
  return ALL_LOCATIONS.find((l) => l.slug === slug)
}

export const SERVICE_PAGES = [
  {
    slug: 'car-lockout',
    label: 'Car lockout',
    urgency: 'emergency',
  },
  {
    slug: 'house-lockout',
    label: 'House lockout',
    urgency: 'emergency',
  },
  {
    slug: 'lost-car-key',
    label: 'Lost car key replacement',
    urgency: 'urgent',
  },
  {
    slug: 'lock-repair',
    label: 'Lock repair',
    urgency: 'flexible',
  },
  {
    slug: 'safe-opening',
    label: 'Safe opening',
    urgency: 'urgent',
  },
] as const
