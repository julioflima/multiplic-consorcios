import type { Metadata } from 'next'

import ConstrucaoPage from '@/components/guides/construcao-page'

const path = '/guias/construcao-e-reforma'

export const metadata: Metadata = {
  title: 'Consórcio para Construção e Reforma',
  description: 'Transforme seu imóvel com a Multiplic Consórcios',
  alternates: {
    canonical: path,
  },
  openGraph: {
    title: 'Consórcio para Construção e Reforma',
    description: 'Transforme seu imóvel com a Multiplic Consórcios',
    url: path,
    type: 'article',
  },
}

export default function Page() {
  return <ConstrucaoPage />
}
