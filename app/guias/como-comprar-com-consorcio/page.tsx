import type { Metadata } from 'next'

import ComoComprarPage from '@/components/guides/como-comprar-page'

const path = '/guias/como-comprar-com-consorcio'

export const metadata: Metadata = {
  title: 'Como Comprar?',
  description: 'Comprar um consórcio da Multiplic Consórcios é simples e muito seguro. Você faz tudo pelo celular!',
  alternates: {
    canonical: path,
  },
  openGraph: {
    title: 'Como Comprar?',
    description: 'Comprar um consórcio da Multiplic Consórcios é simples e muito seguro. Você faz tudo pelo celular!',
    url: path,
    type: 'article',
  },
}

export default function Page() {
  return <ComoComprarPage />
}
