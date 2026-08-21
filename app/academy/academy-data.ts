import content from './academy-content.json'

export interface AcademyLesson {
  title: string
  summary: string
  url: string
}

export interface AcademyTopic {
  slug: string
  label: string
  subtitle: string
  description: string
  accent: string
  lessons: AcademyLesson[]
}

export interface AcademyPageContent {
  eyebrow: string
  title: string
  subtitle: string
  description: string
  hint: string
  backLabel: string
  backHref: string
  logo: string
  logoAlt: string
}

export interface AcademySlide {
  key: string
  /** Id curto e estável derivado da URL de origem do vídeo — usado para compartilhar/linkar direto para esta aula. */
  shareId: string
  topicSlug: string
  topicLabel: string
  topicAccent: string
  topicIndex: number
  lesson: AcademyLesson
  videoId: string
  thumbnail: string
  /** Posição da aula dentro do tópico (1..n). */
  step: number
  lessonsInTopic: number
  isLastOfTopic: boolean
  nextTopicLabel: string
}

export const ACADEMY_PAGE: AcademyPageContent = content.page
export const ACADEMY_TOPICS: AcademyTopic[] = content.topics

export function extractYoutubeId(url: string): string {
  const patterns = [
    /youtube\.com\/shorts\/([\w-]{6,})/,
    /youtu\.be\/([\w-]{6,})/,
    /[?&]v=([\w-]{6,})/,
    /youtube\.com\/embed\/([\w-]{6,})/,
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }

  return url.trim()
}

export function youtubeThumbnail(videoId: string): string {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
}

/** Hash determinístico (FNV-1a) que encurta a URL de origem do vídeo em um id curto e estável. */
export function shareIdFromUrl(url: string): string {
  let hash = 0x811c9dc5

  for (let i = 0; i < url.length; i++) {
    hash ^= url.charCodeAt(i)
    hash = Math.imul(hash, 0x01000193)
  }

  return (hash >>> 0).toString(36)
}

export function buildAcademySlides(topics: AcademyTopic[]): AcademySlide[] {
  return topics.flatMap((topic, topicIndex) =>
    topic.lessons.map((lesson, lessonIndex) => {
      const videoId = extractYoutubeId(lesson.url)

      return {
        key: `${topic.slug}-${lessonIndex}`,
        shareId: shareIdFromUrl(lesson.url),
        topicSlug: topic.slug,
        topicLabel: topic.label,
        topicAccent: topic.accent,
        topicIndex,
        lesson,
        videoId,
        thumbnail: youtubeThumbnail(videoId),
        step: lessonIndex + 1,
        lessonsInTopic: topic.lessons.length,
        isLastOfTopic: lessonIndex === topic.lessons.length - 1,
        nextTopicLabel: topics[(topicIndex + 1) % topics.length].label,
      }
    }),
  )
}

export const ACADEMY_SLIDES = buildAcademySlides(ACADEMY_TOPICS)

export function findSlideIndex(topicSlug: string, lessonIndex: number): number {
  return ACADEMY_SLIDES.findIndex(
    (slide) => slide.key === `${topicSlug}-${lessonIndex}`,
  )
}

export function findSlideIndexByShareId(shareId: string): number {
  return ACADEMY_SLIDES.findIndex((slide) => slide.shareId === shareId)
}
