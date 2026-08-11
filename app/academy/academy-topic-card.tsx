'use client'

import { useCallback } from 'react'

import type { AcademyTopic } from './academy-data'
import styles from './academy.module.css'

interface AcademyTopicCardProps {
  topic: AcademyTopic
  index: number
  onSelect: (slug: string) => void
}

export function AcademyTopicCard({
  topic,
  index,
  onSelect,
}: AcademyTopicCardProps) {
  const handleClick = useCallback(() => {
    onSelect(topic.slug)
  }, [onSelect, topic.slug])

  return (
    <button
      type="button"
      className={styles.topicCard}
      style={{ ['--topic-accent' as string]: topic.accent }}
      onClick={handleClick}
    >
      <span className={styles.topicIndex}>
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className={styles.topicName}>{topic.label}</span>
      <span className={styles.topicTagline}>{topic.tagline}</span>
      <span className={styles.topicDescription}>{topic.description}</span>
      <span className={styles.topicMeta}>
        {topic.lessons.length} {topic.lessons.length === 1 ? 'aula' : 'aulas'} ·
        assistir
      </span>
    </button>
  )
}
