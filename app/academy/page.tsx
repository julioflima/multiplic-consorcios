import type { Metadata, Viewport } from 'next'

import { AcademyExperience } from './academy-experience'

export const viewport: Viewport = {
  themeColor: '#000000',
}

export const metadata: Metadata = {
  title: {
    absolute: 'Multicon Academy',
  },
  description:
    'Plataforma de formação em consórcio da Multiplic: aulas curtas em vídeo sobre consórcio, alavancagem, grupo fixo, imóvel e veículo.',
  openGraph: {
    title: 'Multicon Academy',
    description:
      'Formação em consórcio em aulas de um minuto: consórcio, alavancagem, grupo fixo, imóvel e veículo.',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Academy',
  },
}

export default function AcademyPage() {
  return <AcademyExperience />
}
