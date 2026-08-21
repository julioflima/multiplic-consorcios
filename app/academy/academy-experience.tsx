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
import {
  loadYouTubeApi,
  YT_BUFFERING,
  YT_ENDED,
  YT_PAUSED,
  YT_PLAYING,
  type YTPlayer,
} from "./youtube-api";
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

  const [isPlaying, setIsPlaying] = useState(false);

  const playerHostRef = useRef<HTMLDivElement | null>(null);
  /** Só recebe valor no onReady — ver comentário na criação do player. */
  const playerRef = useRef<YTPlayer | null>(null);
  const playerCreatedRef = useRef(false);
  const mutedRef = useRef(muted);
  const loadedVideoIdRef = useRef<string | null>(null);
  const soundFallbackRef = useRef<number | null>(null);
  const hasPlayedRef = useRef(false);
  const progressFillRef = useRef<HTMLSpanElement | null>(null);
  const playerLayerRef = useRef<HTMLDivElement | null>(null);

  /**
   * O player só aparece quando está de fato tocando. Entre o fim de uma aula
   * e o início da próxima ele exibiria a tela final do YouTube (a thumb do
   * vídeo que acabou) já na posição do slide seguinte — escondê-lo deixa o
   * pôster do slide correto à mostra durante a transição.
   */
  const setPlayerVisible = useCallback((visible: boolean) => {
    if (!playerLayerRef.current) return;
    playerLayerRef.current.style.opacity = visible ? "1" : "0";
  }, []);

  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);

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
      // Busca por data-index (e não por children[i]): a camada do player
      // também é filha do feed, então a posição no DOM ≠ índice do slide.
      const target = container?.querySelector<HTMLElement>(
        `[data-index="${index}"]`,
      );
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

  const clearSoundFallback = useCallback(() => {
    if (soundFallbackRef.current === null) return;
    window.clearTimeout(soundFallbackRef.current);
    soundFallbackRef.current = null;
  }, []);

  /**
   * Toque sobre o vídeo, em três estágios (o estado real vem do player, não
   * de um espelho local, que dessincroniza fácil):
   *   tocando + mudo    → liga o som
   *   tocando + com som → pausa
   *   pausado           → retoma, preservando a preferência de som
   */
  const handleStageTap = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;

    // A partir daqui quem manda é o usuário: mata qualquer fallback pendente
    // pra ele não desfazer o pause/som logo em seguida.
    clearSoundFallback();

    if (player.getPlayerState() !== YT_PLAYING) {
      player.playVideo();
      return;
    }

    if (mutedRef.current) {
      player.unMute();
      setMuted(false);
      return;
    }

    player.pauseVideo();
  }, [clearSoundFallback, setMuted]);

  const handlePrevious = useCallback(() => {
    goToIndex(activeIndexRef.current - 1);
  }, [goToIndex]);

  const handleNext = useCallback(() => {
    goToIndex(activeIndexRef.current + 1);
  }, [goToIndex]);

  // O player é criado uma vez só; guardar handleNext num ref evita que o
  // onStateChange fique preso na versão daquele render — e evita ter que
  // colocá-lo nas deps do efeito, o que recriaria o player (e perderia a
  // permissão de áudio) sempre que ele mudasse.
  const handleNextRef = useRef(handleNext);

  useEffect(() => {
    handleNextRef.current = handleNext;
  }, [handleNext]);

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

    container
      .querySelectorAll("[data-index]")
      .forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, [playerOpen, scrollToIndex]);

  /**
   * Toca respeitando a preferência de som. Se o navegador recusar o áudio,
   * o vídeo simplesmente não começa — então cai pra mudo em vez de deixar a
   * tela parada. Isso respeita a política de autoplay, não a contorna.
   *
   * O fallback é cheio de guardas porque ele não pode confundir "o navegador
   * bloqueou" com "o usuário mexeu": qualquer engano aqui vira vídeo mudando
   * de estado sozinho.
   */
  const startPlayback = useCallback(
    (player: YTPlayer) => {
      clearSoundFallback();
      hasPlayedRef.current = false;

      if (mutedRef.current) {
        player.mute();
        player.playVideo();
        return;
      }

      player.unMute();
      player.playVideo();

      soundFallbackRef.current = window.setTimeout(() => {
        soundFallbackRef.current = null;

        if (playerRef.current !== player) return;
        // Chegou a tocar: o áudio foi liberado. Se parou depois disso, foi o
        // usuário — não é caso de fallback.
        if (hasPlayedRef.current) return;

        const state = player.getPlayerState();
        // Pausado = o usuário pausou. Buffering = está a caminho, só lento.
        if (state === YT_PAUSED || state === YT_BUFFERING) return;

        player.mute();
        player.playVideo();
        setMuted(true);
      }, 1200);
    },
    [clearSoundFallback, setMuted],
  );

  /**
   * UM player para o feed inteiro. O iframe é criado uma única vez e nunca
   * é recarregado: trocar de aula usa loadVideoById, que mantém o MESMO
   * documento — e com ele a permissão de áudio que o clique do usuário já
   * concedeu. Apontar um src novo criaria um documento novo, e aí o
   * navegador voltaria a exigir mudo.
   */
  useEffect(() => {
    if (!playerOpen) return;

    let cancelled = false;

    loadYouTubeApi().then((YT) => {
      const host = playerHostRef.current;
      if (cancelled || !host || playerCreatedRef.current) return;
      playerCreatedRef.current = true;

      const slide =
        loopSlides[activeIndexRef.current] ?? loopSlides[BASE_LENGTH];
      loadedVideoIdRef.current = slide.videoId;

      new YT.Player(host, {
        videoId: slide.videoId,
        playerVars: {
          controls: 0,
          rel: 0,
          playsinline: 1,
          modestbranding: 1,
          iv_load_policy: 3,
          disablekb: 1,
          fs: 0,
        },
        events: {
          onReady: (event) => {
            // Só publica o player aqui: o construtor devolve o objeto na
            // hora, mas os métodos (getDuration, getPlayerState...) só são
            // anexados depois do handshake com o iframe. Publicar antes faz
            // qualquer chamada estourar "is not a function".
            playerRef.current = event.target;

            // O usuário pode ter rolado enquanto o player carregava: garante
            // que quem toca é a aula que está na tela agora.
            const current =
              loopSlides[activeIndexRef.current] ?? loopSlides[BASE_LENGTH];

            if (loadedVideoIdRef.current !== current.videoId) {
              loadedVideoIdRef.current = current.videoId;
              event.target.loadVideoById(current.videoId);
            }

            startPlayback(event.target);
          },
          onStateChange: (event) => {
            if (event.data === YT_PLAYING) {
              hasPlayedRef.current = true;
              setIsPlaying(true);
              setPlayerVisible(true);
            }
            if (event.data === YT_PAUSED) setIsPlaying(false);

            // Fim da aula: segue pra próxima, como num feed de stories.
            if (event.data !== YT_ENDED) return;
            setPlayerVisible(false);
            handleNextRef.current();
          },
        },
      });
    });

    return () => {
      cancelled = true;
    };
  }, [loopSlides, playerOpen, setPlayerVisible, startPlayback]);

  /**
   * Troca de aula: mesmo player, vídeo novo (loadVideoById, nunca src novo).
   * Fechar o overlay pausa — senão o áudio continuaria tocando escondido.
   */
  useEffect(() => {
    const player = playerRef.current;
    if (!player || !activeSlide) return;

    if (!playerOpen) {
      player.pauseVideo();
      return;
    }

    if (loadedVideoIdRef.current !== activeSlide.videoId) {
      loadedVideoIdRef.current = activeSlide.videoId;
      // Zera na hora: se o segmento ativo for o mesmo índice da aula anterior,
      // React reusa o elemento e a largura antiga ficaria até o próximo tick.
      if (progressFillRef.current) progressFillRef.current.style.width = "0%";
      // Esconde até a aula nova tocar, senão o último quadro da anterior
      // aparece no slide novo enquanto o vídeo carrega.
      setPlayerVisible(false);
      player.loadVideoById(activeSlide.videoId);
    }

    startPlayback(player);
  }, [activeSlide, playerOpen, setPlayerVisible, startPlayback]);

  /** Botão de som: aplica direto no player já vivo. */
  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;

    if (muted) player.mute();
    else player.unMute();
  }, [muted]);

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

  /**
   * A IFrame API não emite evento de progresso, então é polling mesmo.
   * Escreve direto no DOM em vez de usar estado: a barra atualiza várias
   * vezes por segundo e um setState re-renderizaria o feed inteiro a cada
   * tick. O transition no CSS cobre o intervalo entre as amostras.
   */
  useEffect(() => {
    if (!playerOpen) return;

    const tick = () => {
      const player = playerRef.current;
      const fill = progressFillRef.current;
      if (!player || !fill) return;

      const duration = player.getDuration();
      if (!duration) return;

      const ratio = Math.min(player.getCurrentTime() / duration, 1);
      fill.style.width = `${ratio * 100}%`;
    };

    const interval = window.setInterval(tick, 250);
    tick();

    return () => window.clearInterval(interval);
  }, [playerOpen]);

  useEffect(
    () => () => {
      if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current);
      if (soundFallbackRef.current) {
        window.clearTimeout(soundFallbackRef.current);
      }
      cancelScrollRef.current();
    },
    [],
  );

  return (
    <main className={styles.shell}>
      <AcademyBrowse onOpenLesson={handleOpenLesson} />

      {/*
        Fica sempre montado (só escondido) de propósito: desmontar destruiria
        o iframe do player e, com ele, a permissão de áudio já concedida —
        aí toda reabertura voltaria a começar muda.
      */}
      <div
        className={`${styles.playerOverlay} ${
          playerOpen ? "" : styles.playerOverlayHidden
        }`}
        style={{ ["--topic-accent" as string]: activeSlide.topicAccent }}
        role="dialog"
        aria-modal="true"
        aria-hidden={playerOpen ? undefined : true}
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
                  >
                    {segment === activeSlide.step - 1 ? (
                      <span
                        ref={progressFillRef}
                        className={styles.progressFill}
                      />
                    ) : null}
                  </span>
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
            {/*
              O player único é ancorado na altura do slide ativo em vez de ser
              movido no DOM: reparentar um iframe faz o navegador recarregá-lo,
              que é exatamente o que precisamos evitar.
            */}
            <div
              ref={playerLayerRef}
              className={styles.playerLayer}
              style={{ ["--slide-offset" as string]: activeIndex }}
              aria-hidden="true"
            >
              <div className={styles.playerLayerInner}>
                <div ref={playerHostRef} />
              </div>
            </div>

            {loopSlides.map((slide, index) => (
              <AcademyLessonSlide
                key={slide.loopKey}
                slide={slide}
                index={index}
                muted={muted}
                isPlaying={isPlaying}
                onTap={handleStageTap}
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

      <SiteFooter className={styles.footer} />
    </main>
  );
}
