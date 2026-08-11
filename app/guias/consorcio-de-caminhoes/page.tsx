import type { Metadata } from 'next'

import CaminhoesPage from '@/components/guides/caminhoes-page'

const path = '/guias/consorcio-de-caminhoes'

export const metadata: Metadata = {
  title: 'Consórcio para Caminhão',
  description: 'Renove sua frota sem juros e sem entrada',
  alternates: {
    canonical: path,
  },
  openGraph: {
    title: 'Consórcio para Caminhão',
    description: 'Renove sua frota sem juros e sem entrada',
    url: path,
    type: 'article',
  },
}

export default function Page() {
  return <CaminhoesPage />
}
