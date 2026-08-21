import type { Metadata } from 'next'
import { Fraunces, Manrope } from 'next/font/google'

import './globals.css'

import { SITE_URL } from '@/lib/seo'
import { Providers } from './providers'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Multiplic Consórcios',
    template: '%s | Multiplic Consórcios',
  },
  description:
    'Simule seu consórcio com a Multiplic Consórcios e receba atendimento consultivo.',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Multiplic Consórcios',
    title: 'Multiplic Consórcios',
    description:
      'Simule seu consórcio com a Multiplic Consórcios e receba atendimento consultivo.',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${manrope.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
