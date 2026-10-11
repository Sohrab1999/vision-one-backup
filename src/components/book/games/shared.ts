"use client";

import { awardGameActivity } from "@/lib/gamification";
import { emitRecord } from "@/lib/xp-store";
import { readUserName } from "@/lib/name-store";

/**
 * ابزار مشترک آزمایشگاه بازی‌های فکری (فاز ۳ نقشه راه جامع ۲۰۲۶).
 *
 * قرارداد همه بازی‌ها:
 * - رکورد شخصی: localStorage با کلید `visionone:game-best:{book}:{game}:{scope}`
 *   (شکل value مالِ خود بازی است — بازی خودش تصمیم می‌گیرد چه چیزی «بهتر» است)
 * - شمارنده دورها: `visionone:game-plays:{book}` → JSON map: game → تعداد
 * - امتیاز سروری: POST /api/attempts با category = نام بازی
 *   → خودکار در آمار/نشان‌ها/نمودارهای موجود می‌نشیند
 * - فاز ۶: هر saveAttempt به موتور گیمیفیکیشن هم می‌رسد (XP/ماموریت/نشان)
 *   و saveBest رکوردهای جدید را با کانفتی/توست اعلام می‌کند.
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

// ─── دسترس‌پذیری مشترک (فاز ۱۱ — WCAG 2.2 AA) ───

/**
 * الگوی اعلام زنده (aria-live) در بازی‌ها:
 * باکس سراسری DOM جاگذاریِ پیچیده‌ای دارد؛ به‌جای آن هر بازی یک باکس محلی
 * `<p role="status" aria-live="polite" className="sr-only">{liveMsg}</p>`
 * کنار ناحیهٔ بازی می‌گذارد و پیام‌های فارسی (درست بود!/جفت غلط/…) را در
 * state خودش نگه می‌دارد. بازخورد رنگی به‌تنهایی به فناوری کمکی نمی‌رسد —
 * هر تغییر وضعیت مهم باید هم‌زمان متن اعلام‌شدنی داشته باشد.
 */

/**
 * توصیف فارسی یک گزینه برای aria-label فناوری‌های کمکی — «گزینه ۲: apple»
 * (بازی‌های گزینه‌ای؛ idx صفر-مبناست و شمارهٔ نمایشی با ارقام فارسی ساخته می‌شود)
 */
export function describeOption(text: string, idx: number): string {
  return `گزینه ${faNum(idx + 1)}: ${text}`;
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

// ─── گیمیفیکیشن (فاز ۶) ───

/** عنوان فارسی بازی‌ها برای توست رکورد (G4-03: export برای کارت چالش کلاس) */
export const GAME_TITLES: Record<string, string> = {
  match: "تطبیق",
  scramble: "اسکرمبل",
  cloze: "جای خالی",
  "word-search": "شکار کلمه",
  "speed-quiz": "تست برقی",
  "flappy-quiz": "فلپی گزینش",
  "snakes-ladders": "مار و پله",
  crossword: "جدول متقاطع",
  wordle: "وردل ویژن",
  hangman: "دارباز",
  "sentence-builder": "سازنده جمله",
  duel: "دوئل دونفره",
  "listening-hunt": "شکار صدا",
  "adventure-map": "نقشه ماجراجویی",
  "fps-shooter": "شوتر آموزشی",
};

function gameTitleOf(game: string): string {
  return GAME_TITLES[game] ?? game;
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
  const key = bestKeyOf(bookId, game, scope);
  try {
    const raw = localStorage.getItem(key);
    const old = raw ? (JSON.parse(raw) as Record<string, unknown>) : null;
    localStorage.setItem(key, JSON.stringify(value));
    // فاز ۶ — تشخیص خودکار رکورد شخصی برای توست/کانفتی
    // (امتیاز بیشتر = رکورد؛ زمان/حرکت کمتر = رکورد)
    if (value && typeof value === "object") {
      const v = value as Record<string, unknown>;
      const num = (x: unknown): x is number => typeof x === "number" && Number.isFinite(x);
      let isRecord = false;
      let label = "";
      if (num(v.score)) {
        const oldScore = num(old?.score) ? (old!.score as number) : -Infinity;
        if (v.score > oldScore) {
          isRecord = true;
          label = `${gameTitleOf(game)} — ${faNum(v.score)} امتیاز`;
        }
      } else if (num(v.time)) {
        const oldTime = num(old?.time) ? (old!.time as number) : Infinity;
        if (v.time < oldTime) {
          isRecord = true;
          label = `${gameTitleOf(game)} — زمان ${fmtTime(v.time)}`;
        }
      } else if (num(v.moves)) {
        const oldMoves = num(old?.moves) ? (old!.moves as number) : Infinity;
        if (v.moves < oldMoves) {
          isRecord = true;
          label = `${gameTitleOf(game)} — ${faNum(v.moves)} حرکت`;
        }
      }
      if (isRecord) emitRecord(label);
    }
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
  // فاز ۶ — XP/ماموریت/نشان حتی آفلاین هم ثبت می‌شود (موتور سمت کلاینت)
  awardGameActivity({ game, correct: p.correct, total: p.total });
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
      // فاز ۶ — نام نمایشی مهمان برای رده‌بندی هفتگی (مهمان بی‌نام = بی‌نام می‌ماند)
      name: readUserName() || undefined,
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
