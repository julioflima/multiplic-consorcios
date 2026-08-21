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

  // Congela a preferência de som no instante em que o vídeo vira o ativo —
  // um scroll/tap é um gesto do usuário, então o navegador permite autoplay
  // com som já nascendo com o valor correto, sem precisar de unMute via
  // postMessage depois (que o navegador bloqueia/pausa sem gesto novo).
  const [committedMuted, setCommittedMuted] = useState(muted);
  const [prevIsActive, setPrevIsActive] = useState(isActive);
  if (isActive !== prevIsActive) {
    setPrevIsActive(isActive);
    if (isActive) setCommittedMuted(muted);
  }

  const embedSrc = useMemo(() => {
    const params = new URLSearchParams({
      autoplay: isActive ? "1" : "0",
      mute: committedMuted ? "1" : "0",
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
  }, [slide.videoId, committedMuted, isActive]);

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

  useEffect(() => {
    if (!isActive) return;

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
            src={embedSrc}
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
          </div>

          <button
            type="button"
            className={`${styles.tapZone} ${styles.tapNext}`}
            onClick={onNext}
            aria-label="Próxima aula"
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
