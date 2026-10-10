"use client";

import { useSyncExternalStore } from "react";
import { awardXp, awardCoins, emitGamify } from "./xp-store";

/**
 * ماموریت‌های روزانه (فاز ۶ نقشه راه جامع ۲۰۲۶).
 *
 * - هر روز ۳ کوئست از استخر با seed روزِ اپوک انتخاب می‌شود (دترمینیستیک —
 *   همهٔ تب‌ها/ریفرش‌ها یک لیست می‌بینند).
 * - localStorage: `visionone:missions:{day}` → { day, quests }
 * - پیشرفت از نقاط رویدادی می‌آید: missionProgress(id, delta)
 * - گرفتن جایزه (claim) فقط از UI و پس از done شدن.
 */

const POOL_PREFIX = "visionone:missions:";

export interface QuestDef {
  id: string;
  title: string;
  emoji: string;
  target: number;
  xp: number;
  coins: number;
}

export const QUEST_POOL: QuestDef[] = [
  { id: "srs-review-10", title: "۱۰ کارت مرور SRS را بزن", emoji: "🧠", target: 10, xp: 40, coins: 8 },
  { id: "quiz-1", title: "۱ آزمون کامل بده", emoji: "📋", target: 1, xp: 30, coins: 6 },
  { id: "game-2", title: "۲ دور از آزمایشگاه بازی کن", emoji: "🎮", target: 2, xp: 35, coins: 8 },
  { id: "practice-20", title: "۲۰ واژه تمرین کن", emoji: "📚", target: 20, xp: 40, coins: 8 },
  { id: "match-1", title: "۱ دور بازی تطبیق بزن", emoji: "🧩", target: 1, xp: 25, coins: 5 },
  { id: "flappy-1", title: "۱ دور فلپی گزینش پرواز کن", emoji: "✈️", target: 1, xp: 25, coins: 5 },
];

export interface Mission {
  id: string;
  progress: number;
  done: boolean;
  claimed: boolean;
}

interface MissionData {
  day: number;
  quests: Mission[];
}

function epochDay(): number {
  return Math.floor(Date.now() / 86400000);
}

/** انتخاب دترمینیستیک ۳ کوئست از استخر بر اساس seed روز */
function pickQuests(day: number): Mission[] {
  // ساده و بی‌وابستگی به Math.random: hash ضرب‌شده
  let h = (day * 2654435761) % 4294967296;
  const pick = (): number => {
    h = (h * 1103515245 + 12345) % 2147483648;
    return h / 2147483648;
  };
  const pool = [...QUEST_POOL];
  const chosen: QuestDef[] = [];
  while (chosen.length < Math.min(3, pool.length)) {
    const idx = Math.floor(pick() * pool.length);
    chosen.push(pool.splice(idx, 1)[0]!);
  }
  return chosen.map((q) => ({ id: q.id, progress: 0, done: false, claimed: false }));
}

function keyOf(day: number): string {
  return `${POOL_PREFIX}${day}`;
}

let cachedDay = 0;
let cache: MissionData | null = null;
const listeners = new Set<() => void>();

function read(): MissionData {
  const today = epochDay();
  if (cache && cachedDay === today) return cache;
  try {
    const raw = localStorage.getItem(keyOf(today));
    cache = raw ? (JSON.parse(raw) as MissionData) : { day: today, quests: pickQuests(today) };
    cachedDay = today;
  } catch {
    cache = { day: today, quests: pickQuests(today) };
    cachedDay = today;
  }
  return cache;
}

function write(data: MissionData): void {
  cache = data;
  cachedDay = data.day;
  try {
    localStorage.setItem(keyOf(data.day), JSON.stringify(data));
    // پاک‌سازی ماموریت‌های ۱۴ روز پیش
    const old = keyOf(data.day - 14);
    localStorage.removeItem(old);
  } catch {
    /* noop */
  }
  listeners.forEach((l) => l());
}

export function subscribeMissions(cb: () => void): () => void {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

/** ثبت پیشرفت یک کوئست — از نقاط رویدادی (نه رندر) */
export function missionProgress(id: string, delta: number): boolean {
  if (!delta) return false;
  const data = read();
  const q = data.quests.find((m) => m.id === id);
  if (!q || q.done) return false;
  const def = QUEST_POOL.find((d) => d.id === id);
  if (!def) return false;
  q.progress = Math.min(def.target, q.progress + delta);
  if (q.progress >= def.target) {
    q.done = true;
    emitGamify({ type: "mission-done", quest: { id: def.id, title: def.title, emoji: def.emoji } });
  }
  write(data);
  return q.done;
}

/** گرفتن جایزهٔ کوئست کامل‌شده — از UI */
export function claimMission(id: string): boolean {
  const data = read();
  const q = data.quests.find((m) => m.id === id);
  const def = QUEST_POOL.find((d) => d.id === id);
  if (!q || !def || !q.done || q.claimed) return false;
  q.claimed = true;
  write(data);
  awardXp(def.xp, `ماموریت: ${def.title}`);
  awardCoins(def.coins, `ماموریت: ${def.title}`);
  return true;
}

export interface MissionView extends Mission {
  def: QuestDef;
}

/** اسنپ‌شات پایدار سرور — ارجاع ثابت (الزام React برای getServerSnapshot) */
const SERVER_MISSIONS: { day: number; quests: MissionView[] } = { day: 0, quests: [] };

export function useMissions(): { day: number; quests: MissionView[] } {
  // اسنپ‌شات پایدار سرور — ارجاع ثابت (الزام React برای getServerSnapshot)
  const data = useSyncExternalStore(subscribeMissions, read, () => SERVER_MISSIONS);
  return {
    day: data.day,
    quests: data.quests
      .map((q) => {
        const def = QUEST_POOL.find((d) => d.id === q.id);
        return def ? { ...q, def } : null;
      })
      .filter((q): q is MissionView => q !== null),
  };
}

/** اسنپ‌شات همگام برای موتورها */
export function readMissions(): MissionData {
  return read();
}
