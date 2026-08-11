'use client'

import Image from 'next/image'
import Link from 'next/link'

import { ACADEMY_TOPICS } from './academy-data'
import { AcademyTopicCard } from './academy-topic-card'
import styles from './academy.module.css'

interface AcademyIntroProps {
  onSelectTopic: (slug: string) => void
}

export function AcademyIntro({ onSelectTopic }: AcademyIntroProps) {
  return (
    <div className={styles.intro}>
      <div className={styles.introInner}>
        <div className={styles.brandRow}>
          <Image
            alt="Multiplic Consórcios"
            className={styles.introLogo}
            src="/brand/logo-horizontal-branco.png"
            width={3539}
            height={872}
            priority
          />
          <Link href="/" className={styles.ghostLink}>
            Voltar ao site
          </Link>
        </div>

        <h1 className={styles.introTitle}>
          Formação em <em>consórcio</em> em aulas de um minuto.
        </h1>
        <p className={styles.introText}>
          A Multiplic Academy é a plataforma de treinamento para quem quer
          dominar consórcio de ponta a ponta: da mecânica do grupo às
          estratégias de alavancagem usadas por quem constrói patrimônio.
        </p>
        <p className={styles.introText}>
          Escolha um tópico e assista em sequência. Role para baixo para a
          próxima aula — ao terminar um tópico, o próximo começa
          automaticamente.
        </p>
        <p className={styles.introHint}>
          Toque em um tópico para começar · role para navegar · a trilha é
          contínua e recomeça sozinha
        </p>

        <div className={styles.topicGrid}>
          {ACADEMY_TOPICS.map((topic, index) => (
            <AcademyTopicCard
              key={topic.slug}
              topic={topic}
              index={index}
              onSelect={onSelectTopic}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
