import type { Metadata, Viewport } from 'next'
import { Syne, DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
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
    default: 'Vula24 — Software platform for South African locksmiths',
    template: '%s | Vula24',
  },
  description:
    'Vula24 is the platform locksmiths use to find customers, manage bookings and get paid. Customers find verified professionals in Gauteng and Western Cape.',
  keywords: [
    'locksmith software',
    'South Africa',
    'Johannesburg',
    'Cape Town',
    'locksmith app',
    'Vula24',
  ],
  authors: [{ name: 'Vula24' }],
  openGraph: {
    title: 'Vula24 — Software for locksmiths',
    description:
      'Subscription software for locksmith businesses. Connect with customers, manage jobs and grow your reputation on the platform.',
    type: 'website',
    locale: 'en_ZA',
    siteName: 'Vula24',
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
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
