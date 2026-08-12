import type { Metadata } from 'next'

import { InfluencerExperience } from './influencer-experience'

export const metadata: Metadata = {
  title: 'Parceria para influenciadores',
  description:
    'Ajude seus seguidores a conquistar casa ou carro sem juros com consórcio e receba 1% de cada carta de crédito contratada.',
  openGraph: {
    title: 'Parceria para influenciadores | Multiplic Consórcios',
    description:
      'Indique consórcio, ajude sua audiência a realizar o sonho da casa própria e receba 1% de cada carta de crédito contratada.',
  },
}

export const viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
}

export default async function InfluencerPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = await searchParams
  const rawEmail = params.email ?? params.e
  const email = Array.isArray(rawEmail) ? rawEmail[0] : rawEmail

  return <InfluencerExperience prefilledEmail={email?.trim() ?? ''} />
}
