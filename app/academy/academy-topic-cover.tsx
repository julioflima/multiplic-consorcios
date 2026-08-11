'use client'

import { useCallback } from 'react'

import type { AcademySlide } from './academy-data'
import styles from './academy.module.css'

interface AcademyTopicCoverProps {
  slide: AcademySlide
  index: number
  isActive: boolean
  onStart: (index: number) => void
}

export function AcademyTopicCover({
  slide,
  index,
  isActive,
  onStart,
}: AcademyTopicCoverProps) {
  const handleStart = useCallback(() => {
    onStart(index)
  }, [index, onStart])

  return (
    <section
      className={`${styles.slide} ${styles.coverSlide}`}
      data-index={index}
      aria-label={`Tópico ${slide.topicLabel}`}
      style={{ ['--topic-accent' as string]: slide.topicAccent }}
    >
      <div className={styles.coverInner} data-active={isActive}>
        <span className={styles.coverEyebrow}>
          Tópico {String(slide.topicIndex + 1).padStart(2, '0')}
        </span>
        <h2 className={styles.coverTitle}>{slide.topicLabel}</h2>
        <span className={styles.coverTagline}>{slide.topicTagline}</span>
        <p className={styles.coverDescription}>{slide.topicDescription}</p>

        <div className={styles.coverMetaRow}>
          <span className={styles.coverBadge}>
            {slide.lessonsInTopic} aulas
          </span>
          <span className={styles.coverBadge}>~1 min cada</span>
          <span className={styles.coverBadge}>
            depois: {slide.nextTopicLabel}
          </span>
        </div>

        <button
          type="button"
          className={styles.coverButton}
          onClick={handleStart}
        >
          Assistir o tópico
          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 5v14M5 12l7 7 7-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  )
}
