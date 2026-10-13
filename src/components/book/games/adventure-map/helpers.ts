/**
 * توابع خالص «نقشه ماجراجویی» — تفکیک مکانیکی از adventure-map-game.tsx
 * (گام ۷ نقشهٔ docs/refactor-roadmap-2.md — پلی‌بوک games/fps/README.md)
 */

import { notifyGameData } from "../shared";
import {
  DEFAULT_ORDER,
  TOTAL_STAGES,
  type AdventureProgress,
  type ChallengeState,
  type StageType,
} from "./types";

/** واژهٔ پایه — حذف نشانه‌های دستوری داخل پرانتز: "dry (adj.)" → "dry" */
export function baseWord(w: string): string {
  return w.replace(/\s*\([^)]*\)\s*/g, " ").trim();
}

/** ستارهٔ مرحله بر اساس تعداد خطا */
export function starsOf(errors: number): number {
  return errors === 0 ? 3 : errors === 1 ? 2 : 1;
}

export function blankChallenge(idx: number, type: StageType): ChallengeState {
  return {
    idx,
    type,
    errors: 0,
    questions: [],
    qIdx: 0,
    picked: null,
    word: "",
    meaning: "",
    tiles: [],
    slots: [],
    shake: false,
    cards: [],
    sel: null,
    matchedIds: [],
    wrongIds: [],
    saidIds: [],
    resultStars: null,
    timeSecs: 0,
    missed: [],
  };
}

/** خواندن پیشرفت از localStorage با اعتبارسنجی کامل شکل داده */
export function readProgress(key: string): AdventureProgress | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const p = JSON.parse(raw) as Partial<AdventureProgress>;
    if (
      !Array.isArray(p.stars) ||
      p.stars.length !== TOTAL_STAGES ||
      !p.stars.every((s) => typeof s === "number")
    ) {
      return null;
    }
    if (
      !Array.isArray(p.done) ||
      p.done.length !== TOTAL_STAGES ||
      !p.done.every((d) => typeof d === "boolean")
    ) {
      return null;
    }
    const order =
      Array.isArray(p.order) &&
      p.order.length === TOTAL_STAGES &&
      p.order.every((n) => typeof n === "number" && n >= 0 && n <= 3)
        ? (p.order as StageType[])
        : null;
    return { stars: p.stars, done: p.done, order };
  } catch {
    return null;
  }
}

export function writeProgress(key: string, p: AdventureProgress): void {
  try {
    localStorage.setItem(key, JSON.stringify(p));
  } catch {
    /* noop */
  }
  notifyGameData();
}

/** ترتیب چالش‌های این دور — با بازگشت به چرخهٔ پیش‌فرض برای ذخیره‌های قدیمی */
export function orderOf(p: AdventureProgress): StageType[] {
  return p.order && p.order.length === TOTAL_STAGES ? p.order : DEFAULT_ORDER;
}
