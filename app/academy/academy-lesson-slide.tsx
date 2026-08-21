"use client";

import type { AcademySlide } from "./academy-data";
import styles from "./academy.module.css";

interface AcademyLessonSlideProps {
  slide: AcademySlide;
  index: number;
  muted: boolean;
  isPlaying: boolean;
  onTap: () => void;
}

/**
 * O vídeo em si não vive aqui: existe UM player só, montado em
 * academy-experience, que percorre o feed. Cada slide é o pôster de fundo
 * mais a camada de UI (som, textos) por cima.
 */
export function AcademyLessonSlide({
  slide,
  index,
  muted,
  isPlaying,
  onTap,
}: AcademyLessonSlideProps) {
  const tapLabel = !isPlaying
    ? "Reproduzir"
    : muted
      ? "Ativar som"
      : "Pausar";

  return (
    <section
      className={styles.slide}
      data-index={index}
      aria-label={`${slide.topicLabel} — ${slide.lesson.title}`}
      style={{ ["--topic-accent" as string]: slide.topicAccent }}
    >
      <div className={styles.stage}>
        <div className={styles.stageGlow} />

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.poster}
          src={slide.thumbnail}
          alt=""
          loading="lazy"
        />

        <div className={styles.playerVeil} />

        <div className={styles.tapLayer}>
          <button
            type="button"
            className={`${styles.tapZone} ${styles.tapSound}`}
            onClick={onTap}
            aria-label={tapLabel}
          />
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
  );
}
