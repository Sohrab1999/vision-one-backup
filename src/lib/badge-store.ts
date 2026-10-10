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
 */

const BADGES_KEY = "visionone:badges";

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

/** ارزیابی همهٔ نشان‌ها با دادهٔ آماری — فقط از نقاط رویدادی صدا زده شود */
export function evaluateBadges(ctx: Omit<BadgeContext, "level"> & { level?: number }): BadgeDef[] {
  const xp = readXp();
  const full: BadgeContext = { ...ctx, level: ctx.level ?? currentLevel(xp.total) };
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
