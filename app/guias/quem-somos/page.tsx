import type { Metadata } from 'next'

import QuemSomosPage from '@/components/guides/quem-somos-page'

const path = '/guias/quem-somos'

export const metadata: Metadata = {
  title: 'Quem somos?',
  description: 'Somos investidores, como você.',
  alternates: {
    canonical: path,
  },
  openGraph: {
    title: 'Quem somos?',
    description: 'Somos investidores, como você.',
    url: path,
    type: 'article',
  },
}

export default function Page() {
  return <QuemSomosPage />
}
