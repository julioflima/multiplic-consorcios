"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { SiteFooter } from "@/components/site-footer";

import { ACADEMY_PAGE, ACADEMY_SLIDES, findSlideIndex } from "./academy-data";
import { AcademyBrowse } from "./academy-browse";
import { AcademyLessonSlide } from "./academy-lesson-slide";
import { useAcademyMuted } from "./use-academy-muted";
import styles from "./academy.module.css";

/** Cópias da trilha para simular o feed vertical infinito. */
const LOOP_COPIES = 3;

const BASE_LENGTH = ACADEMY_SLIDES.length;

export function AcademyExperience() {
  const [playerOpen, setPlayerOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(BASE_LENGTH);
  const [muted, setMuted] = useAcademyMuted();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const pendingIndexRef = useRef<number | null>(null);
  const activeIndexRef = useRef(activeIndex);
  const idleTimerRef = useRef<number | null>(null);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const loopSlides = useMemo(
    () =>
      Array.from({ length: LOOP_COPIES }).flatMap((_, copy) =>
        ACADEMY_SLIDES.map((slide) => ({
          ...slide,
          loopKey: `${copy}-${slide.key}`,
        })),
      ),
    [],
  );

  const activeSlide = loopSlides[activeIndex] ?? loopSlides[BASE_LENGTH];

  const scrollToIndex = useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      const target = containerRef.current?.children[index] as
        | HTMLElement
        | undefined;
      target?.scrollIntoView({ behavior, block: "start" });
    },
    [],
  );

  const goToIndex = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(loopSlides.length - 1, index));
      setActiveIndex(clamped);
      scrollToIndex(clamped);
    },
    [loopSlides.length, scrollToIndex],
  );

  const handleOpenLesson = useCallback(
    (topicSlug: string, lessonIndex: number) => {
      const offset = findSlideIndex(topicSlug, lessonIndex);
      if (offset < 0) return;

      pendingIndexRef.current = BASE_LENGTH + offset;
      setActiveIndex(BASE_LENGTH + offset);
      setPlayerOpen(true);
    },
    [],
  );

  const handleClosePlayer = useCallback(() => {
    setPlayerOpen(false);
    window.history.replaceState(null, "", "/academy");
  }, []);

  const handleToggleMuted = useCallback(() => {
    setMuted((current) => !current);
  }, [setMuted]);

  const handlePrevious = useCallback(() => {
    goToIndex(activeIndexRef.current - 1);
  }, [goToIndex]);

  const handleNext = useCallback(() => {
    goToIndex(activeIndexRef.current + 1);
  }, [goToIndex]);

  /** Reposiciona o scroll na cópia central mantendo o loop imperceptível. */
  const recenter = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const slideHeight = container.clientHeight;
    const index = activeIndexRef.current;

    if (index < BASE_LENGTH) {
      container.scrollTop += BASE_LENGTH * slideHeight;
      setActiveIndex(index + BASE_LENGTH);
      return;
    }

    if (index >= BASE_LENGTH * 2) {
      container.scrollTop -= BASE_LENGTH * slideHeight;
      setActiveIndex(index - BASE_LENGTH);
    }
  }, []);

  const handleFeedScroll = useCallback(() => {
    if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current);
    idleTimerRef.current = window.setTimeout(recenter, 220);
  }, [recenter]);

  useEffect(() => {
    const container = containerRef.current;
    if (!playerOpen || !container) return;

    scrollToIndex(pendingIndexRef.current ?? activeIndexRef.current, "auto");
    pendingIndexRef.current = null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number(
            (entry.target as HTMLElement).dataset.index ?? "0",
          );
          setActiveIndex(index);
        });
      },
      { root: container, threshold: 0.6 },
    );

    Array.from(container.children).forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, [playerOpen, scrollToIndex]);

  useEffect(() => {
    if (!playerOpen) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown" || event.key === "PageDown") {
        event.preventDefault();
        handleNext();
        return;
      }

      if (event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault();
        handlePrevious();
        return;
      }

      if (event.key === "Escape") {
        handleClosePlayer();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClosePlayer, handleNext, handlePrevious, playerOpen]);

  useEffect(() => {
    if (!playerOpen || !activeSlide) return;
    window.history.replaceState(null, "", `/academy#${activeSlide.topicSlug}`);
  }, [activeSlide, playerOpen]);

  useEffect(
    () => () => {
      if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current);
    },
    [],
  );

  return (
    <main className={styles.shell}>
      <AcademyBrowse onOpenLesson={handleOpenLesson} />

      {playerOpen ? (
        <div
          className={styles.playerOverlay}
          style={{ ["--topic-accent" as string]: activeSlide.topicAccent }}
          role="dialog"
          aria-modal="true"
          aria-label={`${ACADEMY_PAGE.title} — player`}
        >
          <div className={styles.topBar}>
            <div
              className={styles.progressRow}
              role="progressbar"
              aria-valuemin={1}
              aria-valuemax={activeSlide.lessonsInTopic}
              aria-valuenow={activeSlide.step}
              aria-label={`${activeSlide.topicLabel}: aula ${activeSlide.step} de ${activeSlide.lessonsInTopic}`}
            >
              {Array.from({ length: activeSlide.lessonsInTopic }).map(
                (_, segment) => (
                  <span
                    key={segment}
                    className={[
                      styles.progressSegment,
                      segment < activeSlide.step - 1
                        ? styles.progressSegmentDone
                        : "",
                      segment === activeSlide.step - 1
                        ? styles.progressSegmentActive
                        : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  />
                ),
              )}
            </div>

            <div className={styles.topBarRow}>
              <button
                type="button"
                className={`${styles.topIcon} ${styles.topBack}`}
                onClick={handleClosePlayer}
                aria-label="Voltar"
              >
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 4.5L7.5 12l7.5 7.5" />
                </svg>
              </button>

              <button
                type="button"
                className={styles.topIcon}
                onClick={handleToggleMuted}
                aria-label={muted ? "Ativar som" : "Desativar som"}
              >
                {muted ? (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      d="M11.4 5.2L6.9 8.9H4.1a1.1 1.1 0 00-1.1 1.1v4a1.1 1.1 0 001.1 1.1h2.8l4.5 3.7a.7.7 0 001.15-.54V5.74a.7.7 0 00-1.15-.54z"
                      fill="currentColor"
                    />
                    <path
                      d="M15.8 9.2a4 4 0 010 5.6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.1"
                      strokeLinecap="round"
                    />
                    <path
                      d="M5.6 4.6L19.4 19.6"
                      fill="none"
                      stroke="#000"
                      strokeWidth="3.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M5.6 4.6L19.4 19.6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.1"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      d="M11.4 5.2L6.9 8.9H4.1a1.1 1.1 0 00-1.1 1.1v4a1.1 1.1 0 001.1 1.1h2.8l4.5 3.7a.7.7 0 001.15-.54V5.74a.7.7 0 00-1.15-.54z"
                      fill="currentColor"
                    />
                    <path
                      d="M15.8 9.2a4 4 0 010 5.6M18.7 6.6a8 8 0 010 10.8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.1"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div
            className={styles.feed}
            ref={containerRef}
            onScroll={handleFeedScroll}
          >
            {loopSlides.map((slide, index) => (
              <AcademyLessonSlide
                key={slide.loopKey}
                slide={slide}
                index={index}
                isActive={index === activeIndex}
                isNeighbor={Math.abs(index - activeIndex) === 1}
                muted={muted}
                onPrevious={handlePrevious}
                onNext={handleNext}
                onToggleSound={handleToggleMuted}
              />
            ))}
          </div>
        </div>
      ) : null}

      <SiteFooter className={styles.footer} />
    </main>
  );
}
