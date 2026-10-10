"use client";

/**
 * ابزار مشترک آزمایشگاه بازی‌های فکری (فاز ۳ نقشه راه جامع ۲۰۲۶).
 *
 * قرارداد همه بازی‌ها:
 * - رکورد شخصی: localStorage با کلید `visionone:game-best:{book}:{game}:{scope}`
 *   (شکل value مالِ خود بازی است — بازی خودش تصمیم می‌گیرد چه چیزی «بهتر» است)
 * - شمارنده دورها: `visionone:game-plays:{book}` → JSON map: game → تعداد
 * - امتیاز سروری: POST /api/attempts با category = نام بازی
 *   → خودکار در آمار/نشان‌ها/نمودارهای موجود می‌نشیند
 * - بعد از هر نوشتن، رویداد "visionone:game-data" پخش می‌شود تا
 *   آزمایشگاه (hub) و کارت‌های رکورد بدون setState-in-effect تازه شوند
 */

// ─── کمکی‌های عمومی ───

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** عدد فارسی */
export function faNum(v: number | string): string {
  return typeof v === "number" ? v.toLocaleString("fa-IR") : String(v);
}

/** mm:ss با ارقام فارسی */
export function fmtTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${faNum(m)}:${faNum(String(s).padStart(2, "0"))}`;
}

/** انتخاب n عضو یکتا (بر اساس کلید) از یک استخر */
export function pickUnique<T>(pool: T[], n: number, keyOf: (item: T) => string): T[] {
  const seen = new Set<string>();
  const candidates = pool.filter((item) => {
    const k = keyOf(item);
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
  return shuffle(candidates).slice(0, Math.min(n, candidates.length));
}

// ─── کلیدها ───

export function bestKeyOf(bookId: string, game: string, scope: string): string {
  return `visionone:game-best:${bookId}:${game}:${scope}`;
}

function playsKeyOf(bookId: string): string {
  return `visionone:game-plays:${bookId}`;
}

// ─── اشتراک تغییرات (بدون setState در effect — الگوی استورهای پروژه) ───

export function subscribeGameData(cb: () => void): () => void {
  window.addEventListener("storage", cb);
  window.addEventListener("visionone:game-data", cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener("visionone:game-data", cb);
  };
}

export function notifyGameData(): void {
  try {
    window.dispatchEvent(new CustomEvent("visionone:game-data"));
  } catch {
    /* noop */
  }
}

// ─── رکورد شخصی ───

export function loadBest<T>(bookId: string, game: string, scope: string): T | null {
  try {
    const raw = localStorage.getItem(bestKeyOf(bookId, game, scope));
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function saveBest<T>(bookId: string, game: string, scope: string, value: T): void {
  try {
    localStorage.setItem(bestKeyOf(bookId, game, scope), JSON.stringify(value));
  } catch {
    /* noop */
  }
  notifyGameData();
}

// ─── شمارنده دورها ───

export function getPlays(bookId: string): Record<string, number> {
  try {
    const raw = localStorage.getItem(playsKeyOf(bookId));
    return raw ? (JSON.parse(raw) as Record<string, number>) : {};
  } catch {
    return {};
  }
}

export function bumpPlays(bookId: string, game: string): void {
  try {
    const map = getPlays(bookId);
    map[game] = (map[game] ?? 0) + 1;
    localStorage.setItem(playsKeyOf(bookId), JSON.stringify(map));
  } catch {
    /* noop */
  }
  notifyGameData();
}

// ─── ثبت امتیاز سروری (مدل Attempt — فاز ۳: category = نام بازی) ───

export interface AttemptPayload {
  lesson: number;
  total: number;
  correct: number;
  /** مدت به ثانیه */
  duration: number;
  detail?: unknown;
}

export function saveAttempt(bookId: string, game: string, p: AttemptPayload): void {
  fetch("/api/attempts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      book: bookId,
      category: game,
      lesson: p.lesson,
      total: p.total,
      correct: p.correct,
      duration: p.duration,
      detail: p.detail,
    }),
  })
    .then(() => {
      try {
        window.dispatchEvent(new CustomEvent("visionone:attempt-saved"));
      } catch {
        /* noop */
      }
    })
    .catch(() => {
      /* آفلاین — امتیاز محلی حفظ شده است */
    });
}
