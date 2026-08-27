'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import type { AcademyTopic } from './academy-data'
import { extractYoutubeId, youtubeThumbnail } from './academy-data'
import { AcademyLessonCard } from './academy-lesson-card'
import styles from './academy.module.css'

/** Cópias da lista para simular o carrossel horizontal infinito. */
const LOOP_COPIES = 3

interface AcademyTopicRowProps {
  topic: AcademyTopic
  topicIndex: number
  onOpenLesson: (topicSlug: string, lessonIndex: number) => void
}

export function AcademyTopicRow({
  topic,
  topicIndex,
  onOpenLesson,
}: AcademyTopicRowProps) {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const idleTimerRef = useRef<number | null>(null)

  /**
   * Só faz sentido duplicar a lista (e mostrar setas) se as aulas do tópico
   * não couberem na tela. Cabendo, o loop mostraria a primeira aula duas
   * vezes lado a lado, e as setas não teriam pra onde rolar.
   */
  const [overflows, setOverflows] = useState(false)
  const copies = overflows ? LOOP_COPIES : 1

  const loopItems = useMemo(
    () =>
      Array.from({ length: copies }).flatMap((_, copy) =>
        topic.lessons.map((lesson, lessonIndex) => ({
          copy,
          lessonIndex,
          lesson,
          thumbnail: youtubeThumbnail(extractYoutubeId(lesson.url)),
        })),
      ),
    [copies, topic.lessons],
  )

  /**
   * Mede UM conjunto pela distância entre o primeiro e o último item dele —
   * não por scrollWidth, que dependeria de quantas cópias estão na tela (e o
   * número de cópias é justamente o que esta medição decide, o que realimen-
   * taria o ResizeObserver).
   *
   * offsetLeft/offsetWidth de propósito: ignoram transform, então o scale do
   * hover não infla a medida como getBoundingClientRect() faria.
   */
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const measure = () => {
      const items = Array.from(track.children) as HTMLElement[]
      const count = Math.min(topic.lessons.length, items.length)
      if (count === 0) return

      const first = items[0]
      const last = items[count - 1]
      // A diferença entre os offsets já inclui os gaps intermediários.
      const setWidth = last.offsetLeft + last.offsetWidth - first.offsetLeft

      const trackStyle = getComputedStyle(track)
      const padding =
        parseFloat(trackStyle.paddingLeft) + parseFloat(trackStyle.paddingRight)

      // +1px de tolerância pra arredondamento de subpixel não ligar o loop à toa.
      setOverflows(setWidth + padding > track.clientWidth + 1)
    }

    measure()

    const observer = new ResizeObserver(measure)
    observer.observe(track)

    return () => observer.disconnect()
  }, [topic.lessons.length])

  const recenter = useCallback(() => {
    const track = trackRef.current
    if (!track || !overflows) return

    const setWidth = track.scrollWidth / LOOP_COPIES
    if (setWidth <= 0) return

    if (track.scrollLeft < setWidth * 0.5) {
      track.scrollLeft += setWidth
      return
    }

    if (track.scrollLeft > setWidth * 1.5) {
      track.scrollLeft -= setWidth
    }
  }, [overflows])

  const handleScroll = useCallback(() => {
    if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current)
    idleTimerRef.current = window.setTimeout(recenter, 160)
  }, [recenter])

  const handleScrollLeft = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    track.scrollBy({ left: -track.clientWidth * 0.8, behavior: 'smooth' })
  }, [])

  const handleScrollRight = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    track.scrollBy({ left: track.clientWidth * 0.8, behavior: 'smooth' })
  }, [])

  // Posiciona a trilha na cópia central para permitir rolagem nos dois sentidos.
  useEffect(() => {
    const track = trackRef.current
    if (!track || !overflows) return

    const frame = window.requestAnimationFrame(() => {
      track.scrollLeft = track.scrollWidth / LOOP_COPIES
    })

    return () => window.cancelAnimationFrame(frame)
  }, [overflows])

  useEffect(
    () => () => {
      if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current)
    },
    [],
  )

  return (
    <section
      className={styles.row}
      style={{ ['--topic-accent' as string]: topic.accent }}
      aria-label={topic.label}
    >
      <header className={styles.rowHeader}>
        <span className={styles.rowEyebrow}>
          Tópico {String(topicIndex + 1).padStart(2, '0')} · {topic.subtitle}
        </span>
        <h2 className={styles.rowTitle}>{topic.label}</h2>
        <p className={styles.rowDescription}>{topic.description}</p>
      </header>

      <div className={styles.rowTrackWrapper}>
        {overflows ? (
          <button
            type="button"
            className={`${styles.rowArrow} ${styles.rowArrowLeft}`}
            onClick={handleScrollLeft}
            aria-label={`Ver aulas anteriores de ${topic.label}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M15 5l-7 7 7 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ) : null}

        <div
          className={styles.rowTrack}
          ref={trackRef}
          onScroll={handleScroll}
          role="list"
        >
          {loopItems.map((item) => (
            <div
              className={styles.rowItem}
              role="listitem"
              key={`${item.copy}-${item.lessonIndex}`}
            >
              <AcademyLessonCard
                lesson={item.lesson}
                thumbnail={item.thumbnail}
                accent={topic.accent}
                topicSlug={topic.slug}
                lessonIndex={item.lessonIndex}
                onOpen={onOpenLesson}
              />
            </div>
          ))}
        </div>

        {overflows ? (
          <button
            type="button"
            className={`${styles.rowArrow} ${styles.rowArrowRight}`}
            onClick={handleScrollRight}
            aria-label={`Ver mais aulas de ${topic.label}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M9 5l7 7-7 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ) : null}
      </div>
    </section>
  )
}
