"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { AcademySlide } from "./academy-data";
import styles from "./academy.module.css";

interface AcademyLessonSlideProps {
  slide: AcademySlide;
  index: number;
  isActive: boolean;
  isNeighbor: boolean;
  muted: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onToggleSound: () => void;
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
  const frameRef = useRef<HTMLIFrameElement | null>(null);
  const [paused, setPaused] = useState(false);

  const embedSrc = useMemo(() => {
    const params = new URLSearchParams({
      autoplay: "1",
      mute: "1",
      controls: "0",
      rel: "0",
      playsinline: "1",
      modestbranding: "1",
      enablejsapi: "1",
      iv_load_policy: "3",
      disablekb: "1",
      fs: "0",
    });

    return `https://www.youtube-nocookie.com/embed/${slide.videoId}?${params.toString()}`;
  }, [slide.videoId]);

  const sendCommand = useCallback(
    (command: string, args: (string | number)[] = []) => {
      frameRef.current?.contentWindow?.postMessage(
        JSON.stringify({ event: "command", func: command, args }),
        "*",
      );
    },
    [],
  );

  useEffect(() => {
    if (!isActive) return;

    const frame = frameRef.current;
    if (!frame) return;

    const subscribe = () => {
      frame.contentWindow?.postMessage(
        JSON.stringify({ event: "listening", id: `slide-${index}` }),
        "*",
      );
    };

    const interval = window.setInterval(subscribe, 600);
    subscribe();

    const handleMessage = (event: MessageEvent) => {
      if (!event.origin.includes("youtube")) return;
      if (event.source !== frame.contentWindow) return;
      if (typeof event.data !== "string") return;

      try {
        const payload = JSON.parse(event.data);
        if (payload?.event !== "infoDelivery") return;

        const state = payload?.info?.playerState;
        if (state === 0) {
          sendCommand("seekTo", [0, 1]);
          sendCommand("playVideo");
        }
        if (state === 1 || state === 2) {
          setPaused(state === 2);
        }
      } catch {
        // mensagens que não são JSON do player são ignoradas
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("message", handleMessage);
    };
  }, [index, isActive, sendCommand]);

  const handleTogglePlay = useCallback(() => {
    setPaused((current) => {
      sendCommand(current ? "playVideo" : "pauseVideo");
      return !current;
    });
  }, [sendCommand]);

  useEffect(() => {
    if (!isActive) {
      const reset = window.setTimeout(() => setPaused(false), 0);
      return () => window.clearTimeout(reset);
    }

    const timer = window.setTimeout(() => sendCommand("playVideo"), 320);

    return () => window.clearTimeout(timer);
  }, [isActive, sendCommand]);

  useEffect(() => {
    if (!isActive) return;

    const timer = window.setTimeout(
      () => sendCommand(muted ? "mute" : "unMute"),
      120,
    );

    return () => window.clearTimeout(timer);
  }, [isActive, muted, sendCommand]);

  useEffect(() => {
    if (isActive) return;
    sendCommand("pauseVideo");
  }, [isActive, sendCommand]);

  return (
    <section
      className={styles.slide}
      data-index={index}
      aria-label={`${slide.topicLabel} — ${slide.lesson.title}`}
      style={{ ["--topic-accent" as string]: slide.topicAccent }}
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
          />

          <div className={styles.tapCenter}>
            <button
              type="button"
              className={`${styles.tapZone} ${styles.tapSound}`}
              onClick={onToggleSound}
              aria-label={muted ? "Ativar som" : "Desativar som"}
            />
            <button
              type="button"
              className={`${styles.tapZone} ${styles.tapPlay}`}
              onClick={handleTogglePlay}
              aria-label={paused ? "Reproduzir" : "Pausar"}
            />
          </div>

          <button
            type="button"
            className={`${styles.tapZone} ${styles.tapNext}`}
            onClick={onNext}
            aria-label="Próxima aula"
          />
        </div>

        {paused ? (
          <div className={styles.pausedBadges} aria-hidden="true">
            <span className={`${styles.badge} ${styles.badgePlay}`}>
              <svg width="26" height="26" viewBox="0 0 24 24">
                <path
                  d="M8.6 5.4l10 6.1a.6.6 0 010 1l-10 6.1a.6.6 0 01-.9-.5V5.9a.6.6 0 01.9-.5z"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        ) : null}

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
