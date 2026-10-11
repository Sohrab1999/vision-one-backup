"use client";

import { useSyncExternalStore } from "react";
import { emitGamify, awardCoins, readXp, currentLevel } from "./xp-store";

/**
 * نشان‌ها (فاز ۶ نقشه راه جامع ۲۰۲۶).
 *
 * - localStorage: `visionone:badges` → { [badgeId]: epochDay }
 * - موتور ارزیابی: evaluateBadges(ctx) — فقط از نقاط رویدادی صدا زده می‌شود
 *   (پایان بازی/آزمون/مرور، زنجیره، واژهٔ تازه) نه در رندر.
 * - باز شدن نشان = سکهٔ جایزه + رویداد سراسری برای توست/کانفتی.
 * - فاز G3-04: دوازده نشان مخصوص بازی آزمایشگاه (افزودنی) + شمارندهٔ برد
 *   کامل هر بازی در کلید localStorage جدید `visionone:game-wins`
 *   (JSON map: game → count) — الگوی read/cache/listeners همین فایل.
 */

const BADGES_KEY = "visionone:badges";
// فاز G3-04 — کلید localStorage «افزودنی» شمارندهٔ برد کامل هر بازی
const WINS_KEY = "visionone:game-wins";

export interface BadgeContext {
  /** سطح فعلی کاربر */
  level: number;
  /** زنجیرهٔ فعلی */
  streakCount: number;
  /** بهترین زنجیره */
  streakBest: number;
  /** تعداد واژه‌های یادگرفته (همه کتاب‌ها) */
  learnedCount: number;
  /** تعداد جلسهٔ مرور SRS پایان‌یافته */
  reviewSessions: number;
  /** تعداد آزمون کامل با درصد ۱۰۰ */
  quizPerfect: number;
  /** تعداد دورهای هر بازی: game → count (همه کتاب‌ها) */
  plays: Record<string, number>;
  /** رکوردهای عددی بازی‌ها: `${game}:${scope}` → عدد (برای رکوردهای score) */
  bestScores: Record<string, number>;
  /** فاز G3-04 — تعداد برد کامل هر بازی: game → count (از `visionone:game-wins`) */
  wins: Record<string, number>;
}

export interface BadgeDef {
  id: string;
  title: string;
  desc: string;
  emoji: string;
  coins: number;
  check: (ctx: BadgeContext) => boolean;
}

/** استخراج آمار بازی‌ها از localStorage (همه کتاب‌ها) — برای ctx نشان‌ها */
export function collectGameStats(): { plays: Record<string, number>; bestScores: Record<string, number> } {
  const plays: Record<string, number> = {};
  const bestScores: Record<string, number> = {};
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;
      if (key.startsWith("visionone:game-plays:")) {
        const raw = localStorage.getItem(key);
        if (!raw) continue;
        const map = JSON.parse(raw) as Record<string, number>;
        for (const [g, n] of Object.entries(map)) plays[g] = (plays[g] ?? 0) + (n ?? 0);
      } else if (key.startsWith("visionone:game-best:")) {
        const raw = localStorage.getItem(key);
        if (!raw) continue;
        const val = JSON.parse(raw) as { score?: number };
        if (typeof val?.score === "number") bestScores[key] = val.score;
      }
    }
  } catch {
    /* noop */
  }
  return { plays, bestScores };
}

export const BADGES: BadgeDef[] = [
  {
    id: "quiz-100",
    title: "اولین آزمون ۱۰۰",
    desc: "یک آزمون کامل با درصد ۱۰۰ بزن",
    emoji: "💯",
    coins: 25,
    check: (c) => c.quizPerfect >= 1,
  },
  {
    id: "streak-7",
    title: "۷ روز پیاپی",
    desc: "زنجیرهٔ روزانه‌ات را به ۷ روز برسان",
    emoji: "🔥",
    coins: 30,
    check: (c) => c.streakCount >= 7 || c.streakBest >= 7,
  },
  {
    id: "word-hunter",
    title: "شکارچی واژه",
    desc: "۱۰۰ واژه را به فهرست یادگرفته‌ها اضافه کن",
    emoji: "🏹",
    coins: 35,
    check: (c) => c.learnedCount >= 100,
  },
  {
    id: "duel-hero",
    title: "قهرمان دوئل",
    desc: "۵ دور دوئل دونفره بازی کن",
    emoji: "⚔️",
    coins: 25,
    check: (c) => (c.plays["duel"] ?? 0) >= 5,
  },
  {
    id: "flappy-pilot",
    title: "خلبان فلپی",
    desc: "در فلپی گزینش امتیاز ۵۰ بگیر",
    emoji: "✈️",
    coins: 25,
    check: (c) => [...Object.entries(c.bestScores)].some(([k, v]) => k.includes(":flappy-quiz:") && v >= 50),
  },
  {
    id: "game-explorer",
    title: "کاوشگر آزمایشگاه",
    desc: "۱۰ بازی متفاوت از آزمایشگاه را امتحان کن",
    emoji: "🧪",
    coins: 30,
    check: (c) => Object.keys(c.plays).length >= 10,
  },
  {
    id: "srs-master",
    title: "مرورگر حرفه‌ای",
    desc: "۱۰ جلسهٔ مرور هوشمند را تمام کن",
    emoji: "🧠",
    coins: 25,
    check: (c) => c.reviewSessions >= 10,
  },
  {
    id: "level-5",
    title: "ستارهٔ پنج",
    desc: "به سطح ۵ برس",
    emoji: "⭐",
    coins: 40,
    check: (c) => c.level >= 5,
  },
  // ── فاز G3-04 — دوازده نشان مخصوص بازی آزمایشگاه (فقط افزودنی؛ idهای قبلی دست‌نخورده) ──
  // شرط هر نشان دقیقاً قابل‌اندازه‌گیری از ctx است (wins / plays / bestScores).
  {
    id: "wordle-champion",
    title: "وردل‌باز",
    desc: "۵ بار واژهٔ وردل ویژن را درست حدس بزن",
    emoji: "🟩",
    coins: 30,
    check: (c) => (c.wins["wordle"] ?? 0) >= 5,
  },
  {
    id: "word-search-perfect",
    title: "شکارچی بی‌نقص",
    desc: "یک دور شکار کلمه را با پیدا کردن همهٔ واژه‌ها تمام کن",
    emoji: "🎯",
    coins: 25,
    check: (c) => (c.wins["word-search"] ?? 0) >= 1,
  },
  {
    id: "memory-veteran",
    title: "دوست حافظه",
    desc: "۱۰ دور تطبیق حافظه بازی کن",
    emoji: "🧠",
    coins: 25,
    check: (c) => (c.plays["memory"] ?? 0) >= 10,
  },
  {
    id: "speed-150",
    title: "برق‌باز",
    desc: "در تست برقی به امتیاز ۱۵۰ برس",
    emoji: "⚡",
    coins: 30,
    check: (c) => [...Object.entries(c.bestScores)].some(([k, v]) => k.includes(":speed-quiz:") && v >= 150),
  },
  {
    id: "hangman-rescuer",
    title: "نجات‌باز دارباز",
    desc: "۵ بار بادکنک دارباز را نجات بده",
    emoji: "🎈",
    coins: 30,
    check: (c) => (c.wins["hangman"] ?? 0) >= 5,
  },
  {
    id: "cloze-master",
    title: "جای‌خالی‌باز",
    desc: "۷ دور جای خالی را کامل کن",
    emoji: "✍️",
    coins: 25,
    check: (c) => (c.plays["cloze"] ?? 0) >= 7,
  },
  {
    id: "sentence-architect",
    title: "معمار جمله",
    desc: "۳ بار جملهٔ درهم‌ریخته را درست بچین",
    emoji: "🏗️",
    coins: 30,
    check: (c) => (c.wins["sentence-builder"] ?? 0) >= 3,
  },
  {
    id: "listening-ear",
    title: "گوش تیز",
    desc: "۳ دور شکار صدا را ببر",
    emoji: "👂",
    coins: 30,
    check: (c) => (c.wins["listening-hunt"] ?? 0) >= 3,
  },
  {
    id: "snake-charmer",
    title: "مارباز",
    desc: "۵ دور مار و پله بازی کن",
    emoji: "🐍",
    coins: 25,
    check: (c) => (c.plays["snakes-ladders"] ?? 0) >= 5,
  },
  {
    id: "crossword-cracker",
    title: "جدول‌باز",
    desc: "یک جدول متقاطع را کامل حل کن",
    emoji: "🧩",
    coins: 35,
    check: (c) => (c.wins["crossword"] ?? 0) >= 1,
  },
  {
    id: "sharpshooter",
    title: "تک‌تیرانداز",
    desc: "در شوتر آموزشی به امتیاز ۳۰۰ برس",
    emoji: "🎯",
    coins: 35,
    check: (c) => [...Object.entries(c.bestScores)].some(([k, v]) => k.includes(":fps-shooter:") && v >= 300),
  },
  {
    id: "lab-regular",
    title: "بومرد آزمایشگاه",
    desc: "مجموع ۴۰ دور از بازی‌های آزمایشگاه انجام بده",
    emoji: "🔁",
    coins: 40,
    check: (c) => Object.values(c.plays).reduce((s, n) => s + n, 0) >= 40,
  },
];

let badgeCache: Record<string, number> | null = null;

/** خواندن کش‌شده — useSyncExternalStore به ارجاع پایدار نیاز دارد */
function read(): Record<string, number> {
  if (badgeCache) return badgeCache;
  try {
    const raw = localStorage.getItem(BADGES_KEY);
    badgeCache = raw ? (JSON.parse(raw) as Record<string, number>) : EMPTY_UNLOCKED;
  } catch {
    badgeCache = EMPTY_UNLOCKED;
  }
  return badgeCache;
}

function write(data: Record<string, number>): void {
  badgeCache = data;
  try {
    localStorage.setItem(BADGES_KEY, JSON.stringify(data));
  } catch {
    /* noop */
  }
  listeners.forEach((l) => l());
}

const listeners = new Set<() => void>();

/** اسنپ‌شات پایدار سرور — ارجاع ثابت (الزام React برای getServerSnapshot) */
const EMPTY_UNLOCKED: Record<string, number> = {};

export function subscribeBadges(cb: () => void): () => void {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

// ─── فاز G3-04 — شمارندهٔ برد کامل بازی‌ها (الگوی read/cache/listeners خود فایل) ───

let winsCache: Record<string, number> | null = null;

/** خواندن کش‌شدهٔ شمارندهٔ برد (game → count) — useSyncExternalStore به ارجاع پایدار نیاز دارد */
function readWins(): Record<string, number> {
  if (winsCache) return winsCache;
  try {
    const raw = localStorage.getItem(WINS_KEY);
    winsCache = raw ? (JSON.parse(raw) as Record<string, number>) : {};
  } catch {
    winsCache = {};
  }
  return winsCache;
}

/** فاز G3-04 — خواندنی برای ctx ارزیابی نشان‌ها (refreshBadges در gamification) */
export function readGameWins(): Record<string, number> {
  return readWins();
}

/** فاز G3-04 — ثبت یک برد کامل؛ فقط از نقطهٔ رویدادی (awardGameActivity) صدا زده شود */
export function recordGameWin(game: string): void {
  const wins = readWins();
  const next: Record<string, number> = { ...wins, [game]: (wins[game] ?? 0) + 1 };
  winsCache = next;
  try {
    localStorage.setItem(WINS_KEY, JSON.stringify(next));
  } catch {
    /* noop */
  }
  listeners.forEach((l) => l());
}

/**
 * ارزیابی همهٔ نشان‌ها با دادهٔ آماری — فقط از نقاط رویدادی صدا زده شود
 *
 * فاز G3-04 — فیلد اختیاری `wins` (برد کامل هر بازی) با پیش‌فرض {} به ctx
 * افزودنی شد؛ امضای قبلی برای صدا زننده‌های موجود دست‌نخورده است.
 */
export function evaluateBadges(
  ctx: Omit<BadgeContext, "level" | "wins"> & { level?: number; wins?: Record<string, number> },
): BadgeDef[] {
  const xp = readXp();
  const full: BadgeContext = { ...ctx, wins: ctx.wins ?? {}, level: ctx.level ?? currentLevel(xp.total) };
  const owned = read();
  const unlocked: BadgeDef[] = [];
  for (const b of BADGES) {
    if (owned[b.id]) continue;
    let ok = false;
    try {
      ok = b.check(full);
    } catch {
      ok = false;
    }
    if (ok) {
      unlocked.push(b);
    }
  }
  if (unlocked.length) {
    const next = { ...owned };
    const today = Math.floor(Date.now() / 86400000);
    for (const b of unlocked) {
      next[b.id] = today;
      awardCoins(b.coins, `نشان ${b.title}`);
      emitGamify({ type: "badge", badge: { id: b.id, title: b.title, emoji: b.emoji, coins: b.coins } });
    }
    write(next);
  }
  return unlocked;
}

export function useBadges(): Record<string, number> {
  return useSyncExternalStore(subscribeBadges, read, () => EMPTY_UNLOCKED);
}

export function badgeUnlockedDay(id: string): number | null {
  return read()[id] ?? null;
}
