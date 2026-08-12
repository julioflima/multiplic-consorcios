import type { Metadata } from 'next'

import { AcademyExperience } from './academy-experience'

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
}

export default function AcademyPage() {
  return <AcademyExperience />
}
