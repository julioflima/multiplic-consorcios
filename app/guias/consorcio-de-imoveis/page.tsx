import type { Metadata } from 'next'

import ImoveisPage from '@/components/guides/imoveis-page'

const path = '/guias/consorcio-de-imoveis'

export const metadata: Metadata = {
  title: 'Consórcio de Imóveis — Comprar imóvel novo ou usado',
  description: 'Com o consórcio de imóveis você compra qualquer imóvel sem juros. Não é empréstimo e nem financiamento. E ainda bem.',
  alternates: {
    canonical: path,
  },
  openGraph: {
    title: 'Consórcio de Imóveis — Comprar imóvel novo ou usado',
    description: 'Com o consórcio de imóveis você compra qualquer imóvel sem juros. Não é empréstimo e nem financiamento. E ainda bem.',
    url: path,
    type: 'article',
  },
}

export default function Page() {
  return <ImoveisPage />
}
