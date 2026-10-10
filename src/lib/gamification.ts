"use client";

import { awardXp, readXp, currentLevel } from "./xp-store";
import { evaluateBadges, collectGameStats } from "./badge-store";
import { missionProgress, readMissions } from "./mission-store";
import { readStreak, touchStreak } from "./streak-store";

/**
 * موتور یکپارچه گیمیفیکیشن (فاز ۶ نقشه راه جامع ۲۰۲۶).
 *
 * نقطهٔ تماس واحد برای همهٔ فعالیت‌های یادگیری:
 *  - awardGameActivity  ← پایان هر بازی آزمایشگاه (via saveAttempt در shared.ts)
 *  - awardQuizActivity  ← پایان آزمون‌های درس/جمع‌بندی/روزانه/هفتگی
 *  - awardReviewActivity← پایان جلسهٔ مرور SRS
 *  - awardPracticeWords ← گردش واژه در فلش‌کارت/تمرین
 *  - awardLearnedWord   ← علامت‌گذاری واژهٔ تازه
 *  - touchActivity      ← ضربان «امروز فعال باش»
 *
 * هر award = XP (با سقف روزانه) + پیشرفت ماموریت روزانه + ارزیابی نشان‌ها.
 */

/** شمارش واژه‌های یادگرفتهٔ همهٔ کتاب‌ها از localStorage */
function countLearned(): number {
  let n = 0;
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      // فرمت اسکوپ‌شده: visionone:book:<bookId>:learned
      if (!key || !key.startsWith("visionone:book:") || !key.endsWith(":learned")) continue;
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      const arr = JSON.parse(raw) as unknown;
      if (Array.isArray(arr)) n += arr.length;
    }
  } catch {
    /* noop */
  }
  return n;
}

function countReviewSessions(): number {
  try {
    const raw = localStorage.getItem("visionone:srs-sessions");
    return raw ? Number(JSON.parse(raw)) || 0 : 0;
  } catch {
    return 0;
  }
}

function bumpReviewSessions(): number {
  const n = countReviewSessions() + 1;
  try {
    localStorage.setItem("visionone:srs-sessions", JSON.stringify(n));
  } catch {
    /* noop */
  }
  return n;
}

function countQuizPerfect(): number {
  try {
    const raw = localStorage.getItem("visionone:quiz-perfect");
    return raw ? Number(JSON.parse(raw)) || 0 : 0;
  } catch {
    return 0;
  }
}

function bumpQuizPerfect(): number {
  const n = countQuizPerfect() + 1;
  try {
    localStorage.setItem("visionone:quiz-perfect", JSON.stringify(n));
  } catch {
    /* noop */
  }
  return n;
}

/** ارزیابی نشان‌ها با جمع‌کردن کل زمینه از استورها */
function refreshBadges(): void {
  const games = collectGameStats();
  evaluateBadges({
    level: currentLevel(readXp().total),
    streakCount: readStreak().count,
    streakBest: readStreak().best,
    learnedCount: countLearned(),
    reviewSessions: countReviewSessions(),
    quizPerfect: countQuizPerfect(),
    plays: games.plays,
    bestScores: games.bestScores,
  });
}

function touchActivity(): void {
  missionProgress("streak-activity", 1);
  touchStreak();
  refreshBadges();
}

// ─── بازی‌های آزمایشگاه ───

export interface GameActivity {
  /** شناسهٔ بازی (category در Attempt) */
  game: string;
  correct: number;
  total: number;
  /** رکورد شخصی جدید بود؟ */
  record?: boolean;
}

export function awardGameActivity(a: GameActivity): void {
  const accuracy = a.total > 0 ? a.correct / a.total : 0;
  const xp = Math.round(6 + a.correct * 4 + accuracy * 8 + (a.record ? 25 : 0));
  awardXp(xp, "بازی آزمایشگاه");
  missionProgress("game-2", 1);
  // کلیدهای واقعی بازی‌ها در hub: تطبیق حافظه = memory · فلپی = flappy-quiz
  if (a.game === "memory" || a.game === "match") missionProgress("match-1", 1);
  if (a.game === "flappy-quiz") missionProgress("flappy-1", 1);
  touchActivity();
}

// ─── آزمون‌ها ───

export function awardQuizActivity(correct: number, total: number): void {
  const perfect = total > 0 && correct === total;
  const xp = Math.round(10 + correct * 6 + (perfect ? 40 : 0));
  awardXp(xp, "آزمون");
  missionProgress("quiz-1", 1);
  if (perfect) bumpQuizPerfect();
  touchActivity();
}

// ─── مرور SRS ───

export function awardReviewActivity(reviewed: number, correct: number): void {
  if (reviewed <= 0) return;
  const xp = Math.round(5 + correct * 3 + Math.min(10, reviewed));
  awardXp(xp, "مرور هوشمند");
  missionProgress("srs-review-10", reviewed);
  bumpReviewSessions();
  touchActivity();
}

// ─── تمرین واژه (فلش‌کارت/چرخش کارت) ───

export function awardPracticeWords(n: number): void {
  if (n <= 0) return;
  missionProgress("practice-20", n);
  awardXp(Math.min(10, n), "تمرین واژه");
}

// ─── واژهٔ تازهٔ یادگرفته‌شده ───

export function awardLearnedWord(): void {
  awardXp(3, "واژهٔ تازه");
  missionProgress("practice-20", 1);
  touchActivity();
}

/** صدا زدن دستی پس از هر ضربان زنجیرهٔ بیرونی (مثلاً پایان مکالمه) */
export function notifyActivity(): void {
  touchActivity();
}

/** پیشرفت فعلی ماموریت‌ها برای UI هدر/پروفایل */
export function missionSnapshot(): { done: number; total: number } {
  const data = readMissions();
  return { done: data.quests.filter((q) => q.done).length, total: data.quests.length };
}

/** آمار خواندنی برای نشان‌ها در نمای جایزه‌ها */
export function badgeContextSnapshot(): {
  level: number;
  learnedCount: number;
  reviewSessions: number;
  quizPerfect: number;
  streakCount: number;
} {
  const games = collectGameStats();
  const ctx = {
    level: currentLevel(readXp().total),
    streakCount: readStreak().count,
    streakBest: readStreak().best,
    learnedCount: countLearned(),
    reviewSessions: countReviewSessions(),
    quizPerfect: countQuizPerfect(),
    plays: games.plays,
    bestScores: games.bestScores,
  };
  return {
    level: ctx.level,
    learnedCount: ctx.learnedCount,
    reviewSessions: ctx.reviewSessions,
    quizPerfect: ctx.quizPerfect,
    streakCount: ctx.streakCount,
  };
}
