import type { Metadata } from 'next'

import SegurancaPage from '@/components/guides/seguranca-page'

const path = '/guias/seguranca-na-compra'

export const metadata: Metadata = {
  title: 'Segurança na compra',
  description: 'Na Multiplic Consórcios, confiança e segurança são prioridades.',
  alternates: {
    canonical: path,
  },
  openGraph: {
    title: 'Segurança na compra',
    description: 'Na Multiplic Consórcios, confiança e segurança são prioridades.',
    url: path,
    type: 'article',
  },
}

export default function Page() {
  return <SegurancaPage />
}
