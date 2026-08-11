import type { Metadata } from 'next'

import MotoPage from '@/components/guides/moto-page'

const path = '/guias/consorcio-de-moto'

export const metadata: Metadata = {
  title: 'Consórcio de Motos',
  description: 'Sua moto sem entrada e sem juros',
  alternates: {
    canonical: path,
  },
  openGraph: {
    title: 'Consórcio de Motos',
    description: 'Sua moto sem entrada e sem juros',
    url: path,
    type: 'article',
  },
}

export default function Page() {
  return <MotoPage />
}
