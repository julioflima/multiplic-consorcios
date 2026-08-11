'use client'

import { useCallback, useEffect, useRef } from 'react'

import type { AcademyTopic } from './academy-data'
import styles from './academy.module.css'

interface AcademyRailChipProps {
  topic: AcademyTopic
  isActive: boolean
  onSelect: (slug: string) => void
}

export function AcademyRailChip({
  topic,
  isActive,
  onSelect,
}: AcademyRailChipProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (!isActive) return
    buttonRef.current?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    })
  }, [isActive])

  const handleClick = useCallback(() => {
    onSelect(topic.slug)
  }, [onSelect, topic.slug])

  return (
    <button
      ref={buttonRef}
      type="button"
      className={`${styles.railChip} ${isActive ? styles.railChipActive : ''}`}
      aria-current={isActive}
      onClick={handleClick}
    >
      {topic.label}
    </button>
  )
}
