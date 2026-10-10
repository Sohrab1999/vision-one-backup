"use client";

import { useSyncExternalStore } from "react";

/**
 * استور گیمیفیکیشن (فاز ۶ نقشه راه جامع ۲۰۲۶) — XP، سطح و سکه.
 *
 * - localStorage: `visionone:xp` → XpData
 * - همه رویدادهای یادگیری (بازی/آزمون/مرور/واژهٔ تازه) به awardXp می‌رسند
 * - ضدتقلب: سقف روزانه XP کامل (DAILY_CAP)؛ مازاد با نرخ کمانه‌ای (BOUNCE_RATE)
 *   ثبت می‌شود تا تکرار سریع ارزش‌سازی نکند.
 * - رویداد سراسری «visionone:gamify» برای توست/کانفتی سراسری پخش می‌شود.
 */

const XP_KEY = "visionone:xp";

/** سقف XP کامل روزانه — بعد از آن نرخ کمانه‌ای اعمال می‌شود (ضدتقلب تکرار سریع) */
export const DAILY_CAP = 400;
/** نرخ کمانه‌ای XP مازاد بر سقف روزانه */
export const BOUNCE_RATE = 0.15;

export interface XpData {
  /** مجموع XP کل عمر حساب */
  total: number;
  /** سکهٔ قابل خرج */
  coins: number;
  /** روز اپوک شمارندهٔ روزانه */
  day: number;
  /** XP کسب‌شدهٔ امروز (شامل کمانه‌ای) */
  dayXp: number;
  /** مجموع سکه‌های کسب‌شده */
  earnedCoins: number;
  /** مجموع سکه‌های خرج‌شده */
  spentCoins: number;
}

const EMPTY: XpData = {
  total: 0,
  coins: 0,
  day: 0,
  dayXp: 0,
  earnedCoins: 0,
  spentCoins: 0,
};

let cache: XpData | null = null;
const listeners = new Set<() => void>();

function epochDay(): number {
  return Math.floor(Date.now() / 86400000);
}

export type GamifyEvent =
  | { type: "xp"; amount: number; reason: string; capped: boolean }
  | { type: "levelup"; level: number }
  | { type: "coins"; amount: number; reason: string }
  | { type: "purchase"; item: string }
  | { type: "record"; label: string }
  | {
      type: "badge";
      badge: { id: string; title: string; emoji: string; coins: number };
    }
  | { type: "mission-done"; quest: { id: string; title: string; emoji: string } };

/** اعلام رکورد شخصی از بازی‌ها (برای توست/کانفتی) */
export function emitRecord(label: string): void {
  emitGamify({ type: "record", label });
}

function read(): XpData {
  if (cache) return cache;
  try {
    const raw = localStorage.getItem(XP_KEY);
    cache = raw ? { ...EMPTY, ...(JSON.parse(raw) as Partial<XpData>) } : EMPTY;
    // اگر روز عوض شده، شمارندهٔ روزانه ریست می‌شود (بدون ذخیره — هنگام اولین جایزه)
    if (cache.day !== epochDay()) {
      cache = { ...cache, day: epochDay(), dayXp: 0 };
    }
  } catch {
    cache = EMPTY;
  }
  return cache;
}

function write(next: XpData): void {
  cache = next;
  try {
    localStorage.setItem(XP_KEY, JSON.stringify(next));
  } catch {
    /* noop */
  }
  listeners.forEach((l) => l());
}

export function subscribeXp(cb: () => void): () => void {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

/** پخش رویداد سراسری برای توست/کانفتی */
export function emitGamify(ev: GamifyEvent): void {
  try {
    window.dispatchEvent(new CustomEvent("visionone:gamify", { detail: ev }));
  } catch {
    /* noop */
  }
}

// ─── منحنی سطح ───
// XP لازم برای سطح n → n+1 : ۸۰ + (n-1)×۴۰  (سطح ۱→۲: ۸۰، ۲→۳: ۱۲۰، ۳→۴: ۱۶۰…)

export interface LevelInfo {
  level: number;
  /** XP داخل سطح فعلی */
  inLevel: number;
  /** XP لازم تا سطح بعد */
  need: number;
  /** درصد پیشرفت سطح (۰..۱۰۰) */
  pct: number;
}

export function levelInfo(totalXp: number): LevelInfo {
  let level = 1;
  let acc = 0;
  let need = 80;
  while (totalXp >= acc + need) {
    acc += need;
    level += 1;
    need = 80 + (level - 1) * 40;
  }
  const inLevel = totalXp - acc;
  return {
    level,
    inLevel,
    need,
    pct: Math.min(100, Math.round((inLevel / need) * 100)),
  };
}

/** سطح از کل XP برای کاربردهای موتور نشان‌ها */
export function currentLevel(totalXp: number): number {
  return levelInfo(totalXp).level;
}

// ─── جایزهٔ XP با سقف روزانه (ضدتقلب) ───

export interface AwardResult {
  gained: number;
  capped: boolean;
  /** سطوحی که با این جایزه باز شد */
  levelsBefore: number;
  levelsAfter: number;
}

export function awardXp(amount: number, reason: string): AwardResult {
  const cur = read();
  const today = epochDay();
  const base = cur.day === today ? cur : { ...cur, day: today, dayXp: 0 };

  const before = currentLevel(base.total);
  let gained = Math.max(0, Math.round(amount));
  let capped = false;

  if (base.dayXp >= DAILY_CAP) {
    // مازاد سقف → نرخ کمانه‌ای
    gained = Math.round(gained * BOUNCE_RATE);
    capped = gained !== Math.max(0, Math.round(amount));
  } else if (base.dayXp + gained > DAILY_CAP) {
    // بخشی کامل، بخشی کمانه‌ای
    const full = DAILY_CAP - base.dayXp;
    const rest = gained - full;
    gained = full + Math.round(rest * BOUNCE_RATE);
    capped = true;
  }

  const next: XpData = { ...base, total: base.total + gained, dayXp: base.dayXp + gained };
  const after = currentLevel(next.total);
  write(next);

  if (gained > 0) emitGamify({ type: "xp", amount: gained, reason, capped });
  if (after > before) {
    // پاداش سطح‌جهش: ۵ سکه × سطح تازه — حلقهٔ اقتصادی XP → سکه
    awardCoins(after * 5, `سطح ${after}`);
    emitGamify({ type: "levelup", level: after });
  }

  return { gained, capped, levelsBefore: before, levelsAfter: after };
}

// ─── سکه ───

export function awardCoins(amount: number, reason: string): void {
  const cur = read();
  if (amount <= 0) return;
  write({ ...cur, coins: cur.coins + amount, earnedCoins: cur.earnedCoins + amount });
  emitGamify({ type: "coins", amount, reason });
}

export function spendCoins(amount: number, item: string): boolean {
  const cur = read();
  if (amount <= 0 || cur.coins < amount) return false;
  write({ ...cur, coins: cur.coins - amount, spentCoins: cur.spentCoins + amount });
  emitGamify({ type: "purchase", item });
  return true;
}

export function useXp(): XpData {
  return useSyncExternalStore(subscribeXp, read, () => EMPTY);
}

/** اسنپ‌شات همگام برای موتور نشان‌ها (بدون هوک) */
export function readXp(): XpData {
  return read();
}
