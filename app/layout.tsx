import type { Metadata } from 'next'

import './globals.css'

export const metadata: Metadata = {
  title: 'Multiplic Consórcios',
  description:
    'Simule seu consórcio com a Multiplic Consórcios e receba atendimento consultivo.',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
