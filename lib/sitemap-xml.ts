import { ALL_LOCATIONS } from '@/lib/locations'

const BASE = 'https://www.vula24.co.za'

export type SitemapEntry = {
  loc: string
  lastmod: string
  changefreq: string
  priority: number
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** All public URLs for sitemap.xml (single source of truth). */
export function getSitemapEntries(): SitemapEntry[] {
  const now = new Date().toISOString()

  const staticPaths: { path: string; changefreq: string; priority: number }[] =
    [
      { path: '', changefreq: 'weekly', priority: 1.0 },
      { path: '/how-it-works', changefreq: 'monthly', priority: 0.8 },
      { path: '/coverage', changefreq: 'monthly', priority: 0.8 },
      { path: '/pricing', changefreq: 'monthly', priority: 0.65 },
      { path: '/apply', changefreq: 'monthly', priority: 0.65 },
      { path: '/thank-you', changefreq: 'yearly', priority: 0.3 },
      { path: '/for-locksmiths', changefreq: 'monthly', priority: 0.7 },
      { path: '/locksmith', changefreq: 'monthly', priority: 0.68 },
      { path: '/about', changefreq: 'monthly', priority: 0.6 },
      { path: '/contact', changefreq: 'monthly', priority: 0.6 },
      { path: '/terms', changefreq: 'yearly', priority: 0.35 },
      { path: '/privacy-policy', changefreq: 'yearly', priority: 0.35 },
      { path: '/resources', changefreq: 'monthly', priority: 0.72 },
      {
        path: '/resources/locksmith-cost-south-africa',
        changefreq: 'monthly',
        priority: 0.7,
      },
      {
        path: '/resources/what-to-do-locked-out',
        changefreq: 'monthly',
        priority: 0.7,
      },
      { path: '/locksmith-gauteng', changefreq: 'weekly', priority: 0.95 },
      { path: '/locksmith-western-cape', changefreq: 'weekly', priority: 0.95 },
    ]

  const staticEntries: SitemapEntry[] = staticPaths.map((p) => ({
    loc: `${BASE}${p.path}`,
    lastmod: now,
    changefreq: p.changefreq,
    priority: p.priority,
  }))

  const locationEntries: SitemapEntry[] = ALL_LOCATIONS.map((loc) => ({
    loc: `${BASE}/locksmith-${loc.slug}`,
    lastmod: now,
    changefreq: 'weekly',
    priority: 0.85,
  }))

  const serviceSlugs = [
    'car-lockout',
    'house-lockout',
    'lost-car-key',
    'lock-repair',
    'safe-opening',
  ]
  const serviceEntries: SitemapEntry[] = serviceSlugs.map((s) => ({
    loc: `${BASE}/services/${s}`,
    lastmod: now,
    changefreq: 'monthly',
    priority: 0.75,
  }))

  return [...staticEntries, ...locationEntries, ...serviceEntries]
}

export function buildSitemapXml(): string {
  const entries = getSitemapEntries()
  const body = entries
    .map(
      (e) => `  <url>
    <loc>${escapeXml(e.loc)}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`
}
