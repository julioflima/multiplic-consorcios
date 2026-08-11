'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import {
  ACADEMY_PAGE,
  ACADEMY_SLIDES,
  ACADEMY_TOPICS,
  findSlideIndex,
} from './academy-data'
import { AcademyBrowse } from './academy-browse'
import { AcademyLessonSlide } from './academy-lesson-slide'
import { AcademyRailChip } from './academy-rail-chip'
import styles from './academy.module.css'

/** Cópias da trilha para simular o feed vertical infinito. */
const LOOP_COPIES = 3

const BASE_LENGTH = ACADEMY_SLIDES.length

export function AcademyExperience() {
  const [playerOpen, setPlayerOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(BASE_LENGTH)
  const [muted, setMuted] = useState(true)

  const containerRef = useRef<HTMLDivElement | null>(null)
  const pendingIndexRef = useRef<number | null>(null)
  const activeIndexRef = useRef(activeIndex)
  const idleTimerRef = useRef<number | null>(null)

  useEffect(() => {
    activeIndexRef.current = activeIndex
  }, [activeIndex])

  const loopSlides = useMemo(
    () =>
      Array.from({ length: LOOP_COPIES }).flatMap((_, copy) =>
        ACADEMY_SLIDES.map((slide) => ({
          ...slide,
          loopKey: `${copy}-${slide.key}`,
        })),
      ),
    [],
  )

  const activeSlide = loopSlides[activeIndex] ?? loopSlides[BASE_LENGTH]

  const topicStartIndex = useMemo(() => {
    const map = new Map<string, number>()
    ACADEMY_SLIDES.forEach((slide, index) => {
      if (!map.has(slide.topicSlug)) map.set(slide.topicSlug, index)
    })
    return map
  }, [])

  const scrollToIndex = useCallback(
    (index: number, behavior: ScrollBehavior = 'smooth') => {
      const target = containerRef.current?.children[index] as
        | HTMLElement
        | undefined
      target?.scrollIntoView({ behavior, block: 'start' })
    },
    [],
  )

  const goToIndex = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(loopSlides.length - 1, index))
      setActiveIndex(clamped)
      scrollToIndex(clamped)
    },
    [loopSlides.length, scrollToIndex],
  )

  const handleOpenLesson = useCallback(
    (topicSlug: string, lessonIndex: number) => {
      const offset = findSlideIndex(topicSlug, lessonIndex)
      if (offset < 0) return

      pendingIndexRef.current = BASE_LENGTH + offset
      setActiveIndex(BASE_LENGTH + offset)
      setPlayerOpen(true)
    },
    [],
  )

  const handleSelectTopic = useCallback(
    (slug: string) => {
      const offset = topicStartIndex.get(slug)
      if (offset === undefined) return
      goToIndex(BASE_LENGTH + offset)
    },
    [goToIndex, topicStartIndex],
  )

  const handleClosePlayer = useCallback(() => {
    setPlayerOpen(false)
    window.history.replaceState(null, '', '/academy')
  }, [])

  const handleToggleMuted = useCallback(() => {
    setMuted((current) => !current)
  }, [])

  const handlePrevious = useCallback(() => {
    goToIndex(activeIndexRef.current - 1)
  }, [goToIndex])

  const handleNext = useCallback(() => {
    goToIndex(activeIndexRef.current + 1)
  }, [goToIndex])

  /** Reposiciona o scroll na cópia central mantendo o loop imperceptível. */
  const recenter = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const slideHeight = container.clientHeight
    const index = activeIndexRef.current

    if (index < BASE_LENGTH) {
      container.scrollTop += BASE_LENGTH * slideHeight
      setActiveIndex(index + BASE_LENGTH)
      return
    }

    if (index >= BASE_LENGTH * 2) {
      container.scrollTop -= BASE_LENGTH * slideHeight
      setActiveIndex(index - BASE_LENGTH)
    }
  }, [])

  const handleFeedScroll = useCallback(() => {
    if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current)
    idleTimerRef.current = window.setTimeout(recenter, 220)
  }, [recenter])

  useEffect(() => {
    const container = containerRef.current
    if (!playerOpen || !container) return

    scrollToIndex(pendingIndexRef.current ?? activeIndexRef.current, 'auto')
    pendingIndexRef.current = null

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const index = Number(
            (entry.target as HTMLElement).dataset.index ?? '0',
          )
          setActiveIndex(index)
        })
      },
      { root: container, threshold: 0.6 },
    )

    Array.from(container.children).forEach((child) => observer.observe(child))

    return () => observer.disconnect()
  }, [playerOpen, scrollToIndex])

  useEffect(() => {
    if (!playerOpen) return

    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown' || event.key === 'PageDown') {
        event.preventDefault()
        handleNext()
        return
      }

      if (event.key === 'ArrowUp' || event.key === 'PageUp') {
        event.preventDefault()
        handlePrevious()
        return
      }

      if (event.key === 'Escape') {
        handleClosePlayer()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleClosePlayer, handleNext, handlePrevious, playerOpen])

  useEffect(() => {
    if (!playerOpen || !activeSlide) return
    window.history.replaceState(null, '', `/academy#${activeSlide.topicSlug}`)
  }, [activeSlide, playerOpen])

  useEffect(
    () => () => {
      if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current)
    },
    [],
  )

  return (
    <main className={styles.shell}>
      <AcademyBrowse onOpenLesson={handleOpenLesson} />

      {playerOpen ? (
        <div
          className={styles.playerOverlay}
          style={{ ['--topic-accent' as string]: activeSlide.topicAccent }}
          role="dialog"
          aria-modal="true"
          aria-label={`${ACADEMY_PAGE.title} — player`}
        >
          <div className={styles.topBar}>
            <div className={styles.topBarRow}>
              <button
                type="button"
                className={styles.iconButton}
                onClick={handleClosePlayer}
                aria-label="Fechar player"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>

              <span className={styles.playerTopicName}>
                {activeSlide.topicLabel}
              </span>

              <button
                type="button"
                className={styles.iconButton}
                onClick={handleToggleMuted}
                aria-label={muted ? 'Ativar som' : 'Desativar som'}
              >
                {muted ? (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M11 5L6 9H3v6h3l5 4z" />
                    <path d="M17 9l4 6M21 9l-4 6" />
                  </svg>
                ) : (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M11 5L6 9H3v6h3l5 4z" />
                    <path d="M16 8.5a4.5 4.5 0 010 7M19 6a8 8 0 010 12" />
                  </svg>
                )}
              </button>
            </div>

            <div
              className={styles.progressRow}
              role="progressbar"
              aria-valuemin={1}
              aria-valuemax={activeSlide.lessonsInTopic}
              aria-valuenow={activeSlide.step}
              aria-label={`${activeSlide.topicLabel}: aula ${activeSlide.step} de ${activeSlide.lessonsInTopic}`}
            >
              {Array.from({ length: activeSlide.lessonsInTopic }).map(
                (_, segment) => (
                  <span
                    key={segment}
                    className={[
                      styles.progressSegment,
                      segment < activeSlide.step - 1
                        ? styles.progressSegmentDone
                        : '',
                      segment === activeSlide.step - 1
                        ? styles.progressSegmentActive
                        : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  />
                ),
              )}
            </div>

            <div className={styles.topicRail}>
              {ACADEMY_TOPICS.map((topic) => (
                <AcademyRailChip
                  key={topic.slug}
                  topic={topic}
                  isActive={topic.slug === activeSlide.topicSlug}
                  onSelect={handleSelectTopic}
                />
              ))}
            </div>
          </div>

          <div
            className={styles.feed}
            ref={containerRef}
            onScroll={handleFeedScroll}
          >
            {loopSlides.map((slide, index) => (
              <AcademyLessonSlide
                key={slide.loopKey}
                slide={slide}
                index={index}
                isActive={index === activeIndex}
                isNeighbor={Math.abs(index - activeIndex) === 1}
                muted={muted}
              />
            ))}
          </div>

          <div className={styles.sideControls}>
            <button
              type="button"
              className={styles.iconButton}
              onClick={handlePrevious}
              aria-label="Aula anterior"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M5 15l7-7 7 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              className={styles.iconButton}
              onClick={handleNext}
              aria-label="Próxima aula"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M5 9l7 7 7-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      ) : null}
    </main>
  )
}
