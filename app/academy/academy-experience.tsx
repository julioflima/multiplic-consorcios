'use client'

import Image from 'next/image'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { ACADEMY_SLIDES, ACADEMY_TOPICS } from './academy-data'
import { AcademyIntro } from './academy-intro'
import { AcademyLessonSlide } from './academy-lesson-slide'
import { AcademyRailChip } from './academy-rail-chip'
import { AcademyTopicCover } from './academy-topic-cover'
import styles from './academy.module.css'

type AcademyView = 'home' | 'feed'

/** Cópias da trilha para simular o carrossel infinito. */
const LOOP_COPIES = 3

const BASE_LENGTH = ACADEMY_SLIDES.length

export function AcademyExperience() {
  const [view, setView] = useState<AcademyView>('home')
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
      if (slide.kind === 'cover') map.set(slide.topicSlug, index)
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

  const handleSelectTopic = useCallback(
    (slug: string) => {
      const offset = topicStartIndex.get(slug)
      if (offset === undefined) return

      const index = BASE_LENGTH + offset

      if (containerRef.current) {
        goToIndex(index)
        return
      }

      pendingIndexRef.current = index
      setActiveIndex(index)
      setView('feed')
    },
    [goToIndex, topicStartIndex],
  )

  const handleStartTopic = useCallback(
    (index: number) => {
      goToIndex(index + 1)
    },
    [goToIndex],
  )

  const handleBackToTopics = useCallback(() => {
    setView('home')
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

  // Abre direto no tópico quando a URL traz um hash (ex.: /academy#imovel).
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const slug = window.location.hash.replace('#', '')
      if (!slug) return

      const offset = topicStartIndex.get(slug)
      if (offset === undefined) return

      pendingIndexRef.current = BASE_LENGTH + offset
      setActiveIndex(BASE_LENGTH + offset)
      setView('feed')
    })

    return () => window.cancelAnimationFrame(frame)
  }, [topicStartIndex])

  useEffect(() => {
    const container = containerRef.current
    if (view !== 'feed' || !container) return

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
  }, [scrollToIndex, view])

  useEffect(() => {
    if (view !== 'feed') return

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
        handleBackToTopics()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleBackToTopics, handleNext, handlePrevious, view])

  useEffect(() => {
    if (view !== 'feed' || !activeSlide) return
    window.history.replaceState(null, '', `/academy#${activeSlide.topicSlug}`)
  }, [activeSlide, view])

  useEffect(
    () => () => {
      if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current)
    },
    [],
  )

  if (view === 'home') {
    return (
      <main className={styles.shell}>
        <AcademyIntro onSelectTopic={handleSelectTopic} />
      </main>
    )
  }

  const stepsInTopic = activeSlide.lessonsInTopic + 1

  return (
    <main
      className={styles.shell}
      style={{ ['--topic-accent' as string]: activeSlide.topicAccent }}
    >
      <div className={styles.topBar}>
        <div className={styles.topBarRow}>
          <button
            type="button"
            className={styles.iconButton}
            onClick={handleBackToTopics}
            aria-label="Voltar para os tópicos"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
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

          <Image
            alt="Multiplic Consórcios"
            className={styles.barLogo}
            src="/brand/logo-horizontal-branco.png"
            width={3539}
            height={872}
            priority
          />

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
          aria-valuemin={0}
          aria-valuemax={activeSlide.lessonsInTopic}
          aria-valuenow={activeSlide.stepInTopic}
          aria-label={`${activeSlide.topicLabel}: etapa ${activeSlide.stepInTopic + 1} de ${stepsInTopic}`}
        >
          {Array.from({ length: stepsInTopic }).map((_, segment) => (
            <span
              key={segment}
              className={[
                styles.progressSegment,
                segment < activeSlide.stepInTopic
                  ? styles.progressSegmentDone
                  : '',
                segment === activeSlide.stepInTopic
                  ? styles.progressSegmentActive
                  : '',
              ]
                .filter(Boolean)
                .join(' ')}
            />
          ))}
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
        {loopSlides.map((slide, index) =>
          slide.kind === 'cover' ? (
            <AcademyTopicCover
              key={slide.loopKey}
              slide={slide}
              index={index}
              isActive={index === activeIndex}
              onStart={handleStartTopic}
            />
          ) : (
            <AcademyLessonSlide
              key={slide.loopKey}
              slide={slide}
              index={index}
              isActive={index === activeIndex}
              isNeighbor={Math.abs(index - activeIndex) === 1}
              muted={muted}
            />
          ),
        )}
      </div>

      <div className={styles.sideControls}>
        <button
          type="button"
          className={styles.iconButton}
          onClick={handlePrevious}
          aria-label="Anterior"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
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
          aria-label="Próximo"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
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

      {activeSlide.kind === 'lesson' && activeSlide.stepInTopic === 1 ? (
        <span className={styles.navHint}>Role para a próxima aula</span>
      ) : null}
    </main>
  )
}
