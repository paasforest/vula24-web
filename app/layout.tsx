import type { Metadata, Viewport } from 'next'
import { Syne, DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Footer } from '@/components/Footer'
import './globals.css'

const syne = Syne({ 
  subsets: ["latin"],
  variable: '--font-heading',
  display: 'swap',
})

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Vula24 — Emergency Locksmith Services | Gauteng & Western Cape',
    template: '%s | Vula24',
  },
  description:
    'Get a verified locksmith in minutes. 24/7 emergency locksmith services across Gauteng and Western Cape. Fast response, no hidden fees.',
  keywords: [
    'locksmith',
    'emergency locksmith',
    'locksmith near me',
    'locksmith Johannesburg',
    'locksmith Cape Town',
    'locksmith Gauteng',
    'locksmith Western Cape',
    'car lockout',
    'house lockout',
    '24 hour locksmith',
    'locksmith South Africa',
  ],
  authors: [{ name: 'Vula24' }],
  metadataBase: new URL('https://www.vula24.co.za'),
  openGraph: {
    title: 'Vula24 — Emergency Locksmith Services',
    description:
      'Get a verified locksmith in minutes. 24/7 emergency services across Gauteng and Western Cape.',
    type: 'website',
    locale: 'en_ZA',
    siteName: 'Vula24',
    url: 'https://www.vula24.co.za',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vula24 — Emergency Locksmith Services',
    description:
      'Get a verified locksmith in minutes. 24/7 emergency services across Gauteng and Western Cape.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#111111',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        <div className="flex min-h-screen flex-col">
          <div className="flex-1 min-w-0">{children}</div>
          <Footer />
        </div>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
