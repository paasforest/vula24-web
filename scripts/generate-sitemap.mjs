/**
 * Writes public/sitemap.xml before next build — static file avoids runtime 500s on /sitemap.xml.
 * Run: node scripts/generate-sitemap.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const OUT = path.join(ROOT, 'public', 'sitemap.xml')
const LOC_JSON = path.join(ROOT, 'lib', 'locations-data.json')

const BASE = 'https://www.vula24.co.za'

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** Do not list URLs that only `redirect()` — GSC reports "Page with redirect" for those. */
const staticPaths = [
  { path: '', changefreq: 'weekly', priority: 1.0 },
  { path: '/how-it-works', changefreq: 'monthly', priority: 0.8 },
  { path: '/coverage', changefreq: 'monthly', priority: 0.8 },
  // /pricing → /for-locksmiths, /apply → /for-locksmiths/account, /locksmith → /locksmith/login (omit)
  { path: '/thank-you', changefreq: 'yearly', priority: 0.3 },
  { path: '/for-locksmiths', changefreq: 'monthly', priority: 0.72 },
  { path: '/for-locksmiths/account', changefreq: 'monthly', priority: 0.68 },
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

const serviceSlugs = [
  'car-lockout',
  'house-lockout',
  'lost-car-key',
  'lock-repair',
  'safe-opening',
]

const locData = JSON.parse(fs.readFileSync(LOC_JSON, 'utf8'))
const allLocs = [...locData.gauteng, ...locData.westernCape]
const now = new Date().toISOString()

const entries = []

for (const p of staticPaths) {
  entries.push({
    loc: `${BASE}${p.path}`,
    lastmod: now,
    changefreq: p.changefreq,
    priority: p.priority,
  })
}

for (const loc of allLocs) {
  entries.push({
    loc: `${BASE}/locksmith-${loc.slug}`,
    lastmod: now,
    changefreq: 'weekly',
    priority: 0.85,
  })
}

for (const s of serviceSlugs) {
  entries.push({
    loc: `${BASE}/services/${s}`,
    lastmod: now,
    changefreq: 'monthly',
    priority: 0.75,
  })
}

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

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`

fs.mkdirSync(path.dirname(OUT), { recursive: true })
fs.writeFileSync(OUT, xml, 'utf8')
console.log(`Wrote ${entries.length} URLs → ${path.relative(ROOT, OUT)}`)
