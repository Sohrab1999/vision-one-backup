"use client";

/**
 * تله‌متری جلسهٔ بازی — فاز G1-10 نقشه راه بازی‌ها (docs/games-roadmap.md).
 *
 * قرارداد حریم خصوصی نوجوان (بخش ۲ سند):
 * - فقط و فقط این فیلدها ارسال می‌شود: نام بازی، شناسهٔ سطح/اسکوپ (اختیاری)،
 *   مدت رُند‌شده به ثانیه، دلیل پایان — هیچ PII (نام/کلید کلاس/شناسهٔ دستگاه) نیست
 * - مسیر: POST /api/client-log → یک خط JSON در console سرور (dev.log قابل grep)
 * - fire-and-forget با keepalive؛ شکست شبکه و rate-limit کاملاً ساکت است
 *
 * قالب رویداد در dev.log:
 *   {"t":"ISO","route":"client-log","event":"log","message":"game_session_end",
 *    "url":"","extra":{"game":"memory","level":"1:6","duration":"84","reason":"finish"}}
 *
 * reason های مجاز: finish | exit | hidden | unmount | restart
 * الگوی مصرف در بازی:
 *   const session = useRef(createGameSession({ game: GAME_KEY }));
 *   start() → session.current = createGameSession({game, level}); session.current.start();
 *   finish() → session.current.end("finish")
 *   نگهبان خروج → session.current.abandon("exit")
 *   unmount cleanup → session.current.abandon("unmount")  (اگر گزارش نشده باشد no-op است)
 */

export type GameSessionReason = "finish" | "exit" | "hidden" | "unmount" | "restart";

interface SessionMeta {
  /** کلید بازی — دقیقاً همان GAME_KEY بازی (برای join با رکوردها) */
  game: string;
  /** شناسهٔ سطح/اسکوپ — رشتهٔ آزاد بدون PII مثل "1:6" یا "all" یا "hard" */
  level?: string;
}

export interface GameSessionTracker {
  start: () => void;
  /** پایان عادی دور — پیش‌فرض reason=finish */
  end: (reason?: GameSessionReason) => void;
  /** رهاکردن دور نیمه‌کاره — پیش‌فرض reason=exit */
  abandon: (reason?: GameSessionReason) => void;
}

function post(message: string, meta: SessionMeta, extra: Record<string, string>): void {
  try {
    if (typeof window === "undefined") return;
    const payload = {
      level: "log",
      message,
      url: "",
      extra: {
        game: meta.game,
        ...(meta.level ? { level: meta.level } : {}),
        ...extra,
      },
    };
    void fetch("/api/client-log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {
      /* ساکت — تله‌متری هرگز بازی را نمی‌شکند */
    });
  } catch {
    /* noop */
  }
}

/**
 * ردیاب جلسهٔ یک دور بازی — یک نمونه تازه به‌ازای هر دور.
 * duration = فاصلهٔ start تا گزارش، رُند به ثانیه (حداقل ۱).
 * هر جلسه فقط یک‌بار گزارش می‌دهد (end/abandon دوباره no-op است) تا دور یک‌بار شمرده شود.
 */
export function createGameSession(meta: SessionMeta): GameSessionTracker {
  let startedAt: number | null = null;
  let reported = false;

  const duration = (): string =>
    String(startedAt ? Math.max(1, Math.round((Date.now() - startedAt) / 1000)) : 0);

  return {
    start: () => {
      startedAt = Date.now();
      reported = false;
      post("game_session_start", meta, {});
    },
    end: (reason: GameSessionReason = "finish") => {
      if (reported || !startedAt) return;
      reported = true;
      post("game_session_end", meta, { duration: duration(), reason });
    },
    abandon: (reason: GameSessionReason = "exit") => {
      if (reported || !startedAt) return;
      reported = true;
      post("game_session_abandon", meta, { duration: duration(), reason });
    },
  };
}
