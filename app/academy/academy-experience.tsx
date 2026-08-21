"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { SiteFooter } from "@/components/site-footer";

import {
  ACADEMY_PAGE,
  ACADEMY_SLIDES,
  findSlideIndex,
  findSlideIndexByShareId,
} from "./academy-data";
import { AcademyBrowse } from "./academy-browse";
import { AcademyLessonSlide } from "./academy-lesson-slide";
import { useAcademyMuted } from "./use-academy-muted";
import styles from "./academy.module.css";

/** Cópias da trilha para simular o feed vertical infinito. */
const LOOP_COPIES = 3;

const BASE_LENGTH = ACADEMY_SLIDES.length;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

/**
 * scrollIntoView({behavior:"smooth"}) não dá controle de duração/curva e
 * varia demais entre navegadores (Chrome é abrupto, Safari tem bugs com
 * containers de scroll aninhados). Anima o scrollTop manualmente pra ter
 * uma transição consistente. Retorna uma função pra cancelar se um novo
 * scroll for disparado no meio da animação.
 */
function animateScrollTo(
  container: HTMLElement,
  targetTop: number,
  duration = 420,
) {
  const startTop = container.scrollTop;
  const distance = targetTop - startTop;

  if (distance === 0) return () => {};

  const startTime = performance.now();
  let cancelled = false;

  const step = (now: number) => {
    if (cancelled) return;

    const progress = Math.min((now - startTime) / duration, 1);
    container.scrollTop = startTop + distance * easeInOutCubic(progress);

    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);

  return () => {
    cancelled = true;
  };
}

interface AcademyExperienceProps {
  /** Id da aula vinda da URL (/academy/[shareId]), já resolvida no servidor. */
  initialShareId?: string;
}

export function AcademyExperience({ initialShareId }: AcademyExperienceProps) {
  const initialOffset = initialShareId
    ? findSlideIndexByShareId(initialShareId)
    : -1;

  const [playerOpen, setPlayerOpen] = useState(initialOffset >= 0);
  const [activeIndex, setActiveIndex] = useState(
    initialOffset >= 0 ? BASE_LENGTH + initialOffset : BASE_LENGTH,
  );
  const [muted, setMuted] = useAcademyMuted();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const pendingIndexRef = useRef<number | null>(null);
  const activeIndexRef = useRef(activeIndex);
  const idleTimerRef = useRef<number | null>(null);
  const cancelScrollRef = useRef<() => void>(() => {});

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  /**
   * A Academy é toda preta e imersiva; sem isso, o bounce elástico do iOS ao
   * puxar além do topo/fundo revela o branco do body por trás, quebrando a
   * sensação de app. Escopado ao tempo de vida deste componente para não
   * afetar o resto do site (que é claro por design).
   */
  useEffect(() => {
    const html = document.documentElement;
    const { body } = document;

    const previousHtmlOverscroll = html.style.overscrollBehaviorY;
    const previousBodyOverscroll = body.style.overscrollBehaviorY;
    const previousBodyBackground = body.style.background;

    html.style.overscrollBehaviorY = "none";
    body.style.overscrollBehaviorY = "none";
    body.style.background = "#000";

    return () => {
      html.style.overscrollBehaviorY = previousHtmlOverscroll;
      body.style.overscrollBehaviorY = previousBodyOverscroll;
      body.style.background = previousBodyBackground;
    };
  }, []);

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
      const container = containerRef.current;
      const target = container?.children[index] as HTMLElement | undefined;
      if (!container || !target) return;

      cancelScrollRef.current();

      if (behavior === "smooth") {
        cancelScrollRef.current = animateScrollTo(container, target.offsetTop);
      } else {
        container.scrollTop = target.offsetTop;
      }
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

  const openAtOffset = useCallback((offset: number) => {
    if (offset < 0) return;

    pendingIndexRef.current = BASE_LENGTH + offset;
    setActiveIndex(BASE_LENGTH + offset);
    setPlayerOpen(true);
  }, []);

  const handleOpenLesson = useCallback(
    (topicSlug: string, lessonIndex: number) => {
      openAtOffset(findSlideIndex(topicSlug, lessonIndex));
    },
    [openAtOffset],
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

  /**
   * Mantém a URL como /academy/[shareId] (rota de verdade, não hash) — no
   * reload, o servidor já abre direto na aula certa, sem o "pisca" de
   * aterrissar no browse e só depois pular pro player.
   */
  useEffect(() => {
    if (!playerOpen || !activeSlide) return;
    window.history.replaceState(null, "", `/academy/${activeSlide.shareId}`);
  }, [activeSlide, playerOpen]);

  useEffect(
    () => () => {
      if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current);
      cancelScrollRef.current();
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
                onToggleSound={handleToggleMuted}
              />
            ))}
          </div>

          {/* Desktop não tem swipe — mobile só conhece rolar pra cima/baixo. */}
          <div className={styles.desktopNav}>
            <button
              type="button"
              className={styles.desktopNavButton}
              onClick={handlePrevious}
              aria-label="Aula anterior"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4.5 15L12 7.5L19.5 15" />
              </svg>
            </button>
            <button
              type="button"
              className={styles.desktopNavButton}
              onClick={handleNext}
              aria-label="Próxima aula"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4.5 9L12 16.5L19.5 9" />
              </svg>
            </button>
          </div>
        </div>
      ) : null}

      <SiteFooter className={styles.footer} />
    </main>
  );
}
