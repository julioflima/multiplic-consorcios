import type { Metadata } from 'next'

import CarroPage from '@/components/guides/carro-page'

const path = '/guias/consorcio-de-carro'

export const metadata: Metadata = {
  title: 'Consórcio de Carros',
  description: 'Conquiste seu sonho sem obstáculos',
  alternates: {
    canonical: path,
  },
  openGraph: {
    title: 'Consórcio de Carros',
    description: 'Conquiste seu sonho sem obstáculos',
    url: path,
    type: 'article',
  },
}

export default function Page() {
  return <CarroPage />
}
