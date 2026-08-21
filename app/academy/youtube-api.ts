/**
 * Tipos mínimos da YouTube IFrame Player API — só o que a Academy usa.
 * https://developers.google.com/youtube/iframe_api_reference
 */
declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

/** Estados do player (YT.PlayerState). */
export const YT_ENDED = 0;
export const YT_PLAYING = 1;
export const YT_PAUSED = 2;
export const YT_BUFFERING = 3;

export interface YTPlayer {
  playVideo(): void;
  pauseVideo(): void;
  mute(): void;
  unMute(): void;
  isMuted(): boolean;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  loadVideoById(videoId: string): void;
  getPlayerState(): number;
  getCurrentTime(): number;
  getDuration(): number;
  destroy(): void;
}

export interface YTPlayerEvent {
  target: YTPlayer;
  data: number;
}

interface YTPlayerOptions {
  videoId: string;
  playerVars?: Record<string, number | string>;
  events?: {
    onReady?: (event: YTPlayerEvent) => void;
    onStateChange?: (event: YTPlayerEvent) => void;
  };
}

interface YTNamespace {
  Player: new (
    target: HTMLElement | string,
    options: YTPlayerOptions,
  ) => YTPlayer;
}

let apiPromise: Promise<YTNamespace> | null = null;

/** Carrega o script oficial da IFrame API uma única vez por sessão. */
export function loadYouTubeApi(): Promise<YTNamespace> {
  if (apiPromise) return apiPromise;

  apiPromise = new Promise((resolve) => {
    if (window.YT?.Player) {
      resolve(window.YT);
      return;
    }

    const previousReady = window.onYouTubeIframeAPIReady;

    window.onYouTubeIframeAPIReady = () => {
      previousReady?.();
      resolve(window.YT as YTNamespace);
    };

    const existing = document.querySelector(
      'script[src="https://www.youtube.com/iframe_api"]',
    );

    if (!existing) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(script);
    }
  });

  return apiPromise;
}
