import { buildSitemapXml } from '@/lib/sitemap-xml'

export const dynamic = 'force-static'
export const revalidate = 86400

/**
 * Explicit XML response — avoids MetadataRoute sitemap issues on some hosts (500s).
 * Same URLs as before; Google Search Console: submit only `sitemap.xml` for www property.
 */
export function GET() {
  const xml = buildSitemapXml()
  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
