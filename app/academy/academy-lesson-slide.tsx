'use client'

import { useCallback, useEffect, useMemo, useRef } from 'react'

import type { AcademySlide } from './academy-data'
import styles from './academy.module.css'

interface AcademyLessonSlideProps {
  slide: AcademySlide
  index: number
  isActive: boolean
  isNeighbor: boolean
  muted: boolean
  onPrevious: () => void
  onNext: () => void
  onToggleSound: () => void
}

export function AcademyLessonSlide({
  slide,
  index,
  isActive,
  isNeighbor,
  muted,
  onPrevious,
  onNext,
  onToggleSound,
}: AcademyLessonSlideProps) {
  const frameRef = useRef<HTMLIFrameElement | null>(null)

  const embedSrc = useMemo(() => {
    const params = new URLSearchParams({
      autoplay: '1',
      mute: '1',
      controls: '0',
      rel: '0',
      loop: '1',
      playsinline: '1',
      modestbranding: '1',
      enablejsapi: '1',
      iv_load_policy: '3',
      disablekb: '1',
      fs: '0',
      playlist: slide.videoId,
    })

    return `https://www.youtube-nocookie.com/embed/${slide.videoId}?${params.toString()}`
  }, [slide.videoId])

  const sendCommand = useCallback((command: string) => {
    frameRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func: command, args: [] }),
      '*',
    )
  }, [])

  useEffect(() => {
    if (!isActive) return

    const timer = window.setTimeout(() => {
      sendCommand(muted ? 'mute' : 'unMute')
      sendCommand('playVideo')
    }, 320)

    return () => window.clearTimeout(timer)
  }, [isActive, muted, sendCommand])

  useEffect(() => {
    if (isActive) return
    sendCommand('pauseVideo')
  }, [isActive, sendCommand])

  return (
    <section
      className={styles.slide}
      data-index={index}
      aria-label={`${slide.topicLabel} — ${slide.lesson.title}`}
      style={{ ['--topic-accent' as string]: slide.topicAccent }}
    >
      <div className={styles.stage}>
        <div className={styles.stageGlow} />

        {isActive || isNeighbor ? (
          <iframe
            ref={frameRef}
            className={styles.player}
            src={isActive ? embedSrc : `${embedSrc}&autoplay=0`}
            title={slide.lesson.title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className={styles.poster}
            src={slide.thumbnail}
            alt=""
            loading="lazy"
          />
        )}

        <div className={styles.playerVeil} />

        <div className={styles.tapLayer}>
          <button
            type="button"
            className={`${styles.tapZone} ${styles.tapPrev}`}
            onClick={onPrevious}
            aria-label="Aula anterior"
          >
            <span className={styles.tapLabel}>VOLTAR</span>
          </button>
          <div className={styles.tapCenter}>
            <button
              type="button"
              className={`${styles.tapZone} ${styles.tapSound}`}
              onClick={onToggleSound}
              aria-label={muted ? 'Ativar som' : 'Desativar som'}
            >
              <span className={styles.tapLabel}>SOM</span>
            </button>
            <div className={styles.tapFree} />
          </div>
          <button
            type="button"
            className={`${styles.tapZone} ${styles.tapNext}`}
            onClick={onNext}
            aria-label="Próxima aula"
          >
            <span className={styles.tapLabel}>PASSAR</span>
          </button>
        </div>

        <div className={styles.slideBody}>
          <span className={styles.slideTopic}>
            {slide.topicLabel} · aula {slide.step}/{slide.lessonsInTopic}
          </span>
          <h2 className={styles.slideTitle}>{slide.lesson.title}</h2>
          <p className={styles.slideSummary}>{slide.lesson.summary}</p>

          {slide.isLastOfTopic ? (
            <span className={styles.nextTopicHint}>
              Fim do tópico · a seguir: {slide.nextTopicLabel}
            </span>
          ) : null}
        </div>
      </div>
    </section>
  )
}
