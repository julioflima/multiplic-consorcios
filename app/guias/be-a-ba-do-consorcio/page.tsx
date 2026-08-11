import type { Metadata } from 'next'

import BeABaPage from '@/components/guides/be-a-ba-page'

const path = '/guias/be-a-ba-do-consorcio'

export const metadata: Metadata = {
  title: 'O bê-á-bá do Consórcio',
  description: 'Faça acontecer com a Multiplic Consórcios.',
  alternates: {
    canonical: path,
  },
  openGraph: {
    title: 'O bê-á-bá do Consórcio',
    description: 'Faça acontecer com a Multiplic Consórcios.',
    url: path,
    type: 'article',
  },
}

export default function Page() {
  return <BeABaPage />
}
