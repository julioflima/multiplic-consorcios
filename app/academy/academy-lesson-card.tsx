'use client'

import { useCallback } from 'react'

import type { AcademyLesson } from './academy-data'
import styles from './academy.module.css'

interface AcademyLessonCardProps {
  lesson: AcademyLesson
  thumbnail: string
  accent: string
  topicSlug: string
  lessonIndex: number
  onOpen: (topicSlug: string, lessonIndex: number) => void
}

export function AcademyLessonCard({
  lesson,
  thumbnail,
  accent,
  topicSlug,
  lessonIndex,
  onOpen,
}: AcademyLessonCardProps) {
  const handleClick = useCallback(() => {
    onOpen(topicSlug, lessonIndex)
  }, [lessonIndex, onOpen, topicSlug])

  return (
    <button
      type="button"
      className={styles.card}
      style={{ ['--topic-accent' as string]: accent }}
      onClick={handleClick}
    >
      <span className={styles.cardArt}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.cardThumb}
          src={thumbnail}
          alt=""
          loading="lazy"
        />
        <span className={styles.cardShade} />
        <span className={styles.cardNumber}>
          {String(lessonIndex + 1).padStart(2, '0')}
        </span>
      </span>

      <span className={styles.cardBody}>
        <span className={styles.cardTitle}>{lesson.title}</span>
        <span className={styles.cardSummary}>{lesson.summary}</span>
      </span>
    </button>
  )
}
