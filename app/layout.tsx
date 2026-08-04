import type { Metadata } from 'next'

import './globals.css'

export const metadata: Metadata = {
  title: 'Multcon | Multiplic Seguros',
  description:
    'Simule seu consórcio com a Multcon, uma plataforma da Multiplic Seguros.',
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
