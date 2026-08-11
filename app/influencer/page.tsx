import type { Metadata } from 'next'

import { InfluencerExperience } from './influencer-experience'

export const metadata: Metadata = {
  title: 'Parceria para influenciadores',
  description:
    'Ajude seus seguidores a conquistar casa ou carro sem juros com consórcio e ganhe até R$ 10 mil por conversão.',
  openGraph: {
    title: 'Parceria para influenciadores | Multiplic Consórcios',
    description:
      'Indique consórcio, ajude sua audiência a realizar o sonho da casa própria e ganhe até R$ 10 mil por conversão.',
  },
}

export const viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
}

export default function InfluencerPage() {
  return <InfluencerExperience />
}
