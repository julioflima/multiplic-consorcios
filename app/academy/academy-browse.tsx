'use client'

import Image from 'next/image'
import Link from 'next/link'

import { ACADEMY_PAGE, ACADEMY_TOPICS } from './academy-data'
import { AcademyTopicRow } from './academy-topic-row'
import styles from './academy.module.css'

interface AcademyBrowseProps {
  onOpenLesson: (topicSlug: string, lessonIndex: number) => void
}

export function AcademyBrowse({ onOpenLesson }: AcademyBrowseProps) {
  return (
    <div className={styles.browse}>
      <header className={styles.hero}>
        <div className={styles.brandRow}>
          <Image
            alt={ACADEMY_PAGE.logoAlt}
            className={styles.introLogo}
            src={ACADEMY_PAGE.logo}
            width={3539}
            height={872}
            priority
          />
          <Link href={ACADEMY_PAGE.backHref} className={styles.ghostLink}>
            {ACADEMY_PAGE.backLabel}
          </Link>
        </div>

        <span className={styles.heroEyebrow}>{ACADEMY_PAGE.eyebrow}</span>
        <h1 className={styles.heroTitle}>{ACADEMY_PAGE.title}</h1>
        <p className={styles.heroSubtitle}>{ACADEMY_PAGE.subtitle}</p>
        <p className={styles.heroDescription}>{ACADEMY_PAGE.description}</p>
        <p className={styles.heroHint}>{ACADEMY_PAGE.hint}</p>
      </header>

      <div className={styles.rows}>
        {ACADEMY_TOPICS.map((topic, topicIndex) => (
          <AcademyTopicRow
            key={topic.slug}
            topic={topic}
            topicIndex={topicIndex}
            onOpenLesson={onOpenLesson}
          />
        ))}
      </div>

      <footer className={styles.browseFooter}>
        <span>{ACADEMY_PAGE.logoAlt}</span>
      </footer>
    </div>
  )
}
