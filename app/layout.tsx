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
  title: 'Vula24 — Emergency Locksmith Services | 24/7 South Africa',
  description: '24/7 emergency locksmith services across South Africa. Verified professionals, fast response, no surprises. Available in Gauteng and Western Cape.',
  keywords: ['locksmith', 'emergency locksmith', 'car lockout', 'house lockout', 'South Africa', 'Johannesburg', 'Cape Town', '24/7'],
  authors: [{ name: 'Vula24' }],
  openGraph: {
    title: 'Vula24 — Emergency Locksmith Services',
    description: '24/7 emergency locksmith services across South Africa. Verified professionals, fast response.',
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
