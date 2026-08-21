import type { Metadata, Viewport } from 'next'

import { ACADEMY_SLIDES, findSlideIndexByShareId } from '../academy-data'
import { AcademyExperience } from '../academy-experience'

export const viewport: Viewport = {
  themeColor: '#000000',
}

interface AcademyLessonPageProps {
  params: Promise<{ shareId: string }>
}

export async function generateMetadata({
  params,
}: AcademyLessonPageProps): Promise<Metadata> {
  const { shareId } = await params
  const offset = findSlideIndexByShareId(shareId)
  const slide = offset >= 0 ? ACADEMY_SLIDES[offset] : null

  if (!slide) {
    return {
      title: { absolute: 'Multicon Academy' },
    }
  }

  const title = `${slide.lesson.title} · Multicon Academy`

  return {
    title: { absolute: title },
    description: slide.lesson.summary,
    openGraph: {
      title,
      description: slide.lesson.summary,
      images: [{ url: slide.thumbnail }],
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: 'black-translucent',
      title: 'Academy',
    },
  }
}

export default async function AcademyLessonPage({
  params,
}: AcademyLessonPageProps) {
  const { shareId } = await params

  return <AcademyExperience initialShareId={shareId} />
}
