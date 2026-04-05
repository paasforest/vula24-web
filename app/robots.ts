import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin',
        '/api/',
        '/locksmith/dashboard',
        '/locksmith/payment',
      ],
    },
    sitemap: 'https://www.vula24.co.za/sitemap.xml',
  }
}
