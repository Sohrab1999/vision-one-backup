/**
 * توابع خالص و داده‌های محاسبه‌شدهٔ ماژول «مار و پله» — تفکیک مکانیکی از snakes-ladders-game.tsx
 * (گام ۸ نقشهٔ docs/refactor-roadmap-2.md — پلی‌بوک games/fps/README.md)
 *
 * - ربات تطبیقی G5-03 (شمارندهٔ نشست + مهارت) · هندسهٔ SVG تخته SL1-01 · مکعب تاس SL1-04
 *   · confetti SL1-03 · برچسب درس · گزینهٔ غلط ربات — همهٔ خروجی‌ها خالص/ماژول-اسکوپ‌اند.
 */

import type { QuizQuestionSeed } from "@/data/types";
import { readGameWins } from "@/lib/badge-store";
import { faNum, getPlays } from "../shared";
import {
  ADAPTIVE_MIN_ROUNDS,
  BOT_SKILL,
  BOT_SKILL_MAX,
  BOT_SKILL_MIN,
  GAME_KEY,
  LADDERS,
  SNAKES,
} from "./types";

/**
 * فاز G5-03 — برد/باخت دورهای «مقابل ربات» در همین نشست مرورگر (متغیر ماژول —
 * بدون کلید localStorage جدید؛ با reload صفر می‌شود؛ اسکوپ رکورد vs-bot دست‌نخورده).
 */
const vsBotSession = { wins: 0, losses: 0 };

/** بستن مهارت ربات در بازهٔ مجاز */
function clampBotSkill(s: number): number {
  return Math.min(BOT_SKILL_MAX, Math.max(BOT_SKILL_MIN, s));
}

/**
 * فاز G5-03 — ثبت نتیجهٔ دور «مقابل ربات» در شمارندهٔ نشست مرورگر؛
 * تابع ماژول-اسکوپ (بیرون از کامپوننت) تا تنها نقطهٔ نوشتن شمارنده همین‌جا باشد.
 */
export function recordVsBotSessionResult(humanWon: boolean): void {
  if (humanWon) vsBotSession.wins += 1;
  else vsBotSession.losses += 1;
}

/**
 * فاز G5-03 — مهارت ربات تطبیقی مار و پله برای دور تازه (فقط mode="bot").
 * منبع نرخ برد w (بدون ساخت هیچ کلید/امضای جدید):
 *  ۱) برد/باخت دورهای مقابل رباتِ همین نشست مرورگر (vsBotSession) — اگر ≥۳ دور؛
 *  ۲) وگرنه تخمین محافظه‌کارانه از دادهٔ موجود: wins («visionone:game-wins» کلید
 *     "snakes-ladders" — دور کامل بی‌نقص به‌عنوان پروکسی برد) ÷ plays (کل دورهای
 *     این کتاب از شمارندهٔ مشترک — هر دو اسکوپ)؛
 *  ۳) دادهٔ <۳ دور → BOT_SKILL (رفتار قبلی بایت‌به‌بایت).
 */
export function computeAdaptiveBotSkill(bookId: string): number {
  const rounds = vsBotSession.wins + vsBotSession.losses;
  if (rounds >= ADAPTIVE_MIN_ROUNDS) {
    return clampBotSkill(BOT_SKILL + (vsBotSession.wins / rounds - 0.5) * 0.6);
  }
  try {
    const wins = readGameWins()[GAME_KEY] ?? 0;
    const plays = getPlays(bookId)[GAME_KEY] ?? 0;
    if (plays >= ADAPTIVE_MIN_ROUNDS) {
      return clampBotSkill(BOT_SKILL + (Math.min(1, wins / plays) - 0.5) * 0.6);
    }
  } catch {
    /* localStorage در دسترس نیست — پیش‌فرض */
  }
  return BOT_SKILL;
}

/**
 * موقعیت شبکهٔ هر خانه — شماره‌گذاری مارپیچی کلاسیک:
 * ردیف پایین (b = 0) از چپ بالا می‌رود، ردیف‌های فرد از راست (زیگزاگ).
 * چیدمان RTL است، پس ستون شبکه = ۱۰ − فاصله از چپ؛
 * مثلاً خانهٔ ۱ → col 10/row 10 (پایین-چپ) و خانهٔ ۱۰۰ → col 10/row 1 (بالا-چپ).
 */
export const CELL_POS: { col: number; row: number }[] = Array.from({ length: 100 }, (_, i) => {
  const n = i + 1;
  const b = Math.floor((n - 1) / 10);
  const fromLeft = b % 2 === 0 ? (n - 1) % 10 : 9 - ((n - 1) % 10);
  return { col: 10 - fromLeft, row: 9 - b + 1 };
});

/** فاز SL1-01 — مرکز هر خانه در مختصات SVG تخته (viewBox ۰..۱۰۰۰ — بدون گپ؛ انحراف ≤۱.۵px مثل لایهٔ مهره) */
function cellCenter(n: number): { x: number; y: number } {
  const cpos = CELL_POS[n - 1]!;
  return { x: (10.5 - cpos.col) * 100, y: (cpos.row - 0.5) * 100 };
}

/** فاز SL1-01 — مسیر منحنی S-شکل مار از سر (head) تا دُم (tail) — محاسبهٔ یک‌بار در ماژول */
function snakePath(head: number, tail: number): string {
  const a = cellCenter(head);
  const b = cellCenter(tail);
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const px = -dy / len;
  const py = dx / len;
  const w = Math.min(70, len * 0.22);
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  return `M ${a.x} ${a.y} C ${(mx + px * w).toFixed(1)} ${(my + py * w).toFixed(1)}, ${(mx - px * w).toFixed(1)} ${(my - py * w).toFixed(1)}, ${b.x} ${b.y}`;
}

/** فاز SL1-01 — هندسهٔ پله: دو ریل موازی + پله‌های عرضی — محاسبهٔ یک‌بار در ماژول */
function ladderGeom(base: number, top: number): { railA: string; railB: string; rungs: string[] } {
  const a = cellCenter(base);
  const b = cellCenter(top);
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const px = (-dy / len) * 13;
  const py = (dx / len) * 13;
  const rail = (s: number): string =>
    `M ${(a.x + px * s).toFixed(1)} ${(a.y + py * s).toFixed(1)} L ${(b.x + px * s).toFixed(1)} ${(b.y + py * s).toFixed(1)}`;
  const n = Math.max(2, Math.round(len / 42));
  const rungs: string[] = [];
  for (let i = 1; i < n; i++) {
    const t = i / n;
    const cx = a.x + dx * t;
    const cy = a.y + dy * t;
    rungs.push(`M ${(cx + px).toFixed(1)} ${(cy + py).toFixed(1)} L ${(cx - px).toFixed(1)} ${(cy - py).toFixed(1)}`);
  }
  return { railA: rail(1), railB: rail(-1), rungs };
}

/** فاز SL1-01 — دادهٔ SVG محاسبه‌شده یک‌بار در سطح ماژول (SNAKES/LADDERS ثابت‌اند — صفر هزینهٔ رندر) */
export const SNAKE_PATHS = Object.entries(SNAKES).map(([head, tail]) => ({
  head: Number(head),
  tail,
  d: snakePath(Number(head), tail),
  hc: cellCenter(Number(head)),
}));
export const LADDER_GEOMS = Object.entries(LADDERS).map(([base, top]) => ({
  base: Number(base),
  top,
  ...ladderGeom(Number(base), Number(top)),
}));

/** فاز SL1-04 — وجه‌های مکعب تاس: تبدیل هر وجه به‌سمت بیرون مکعب ۴۴px (نصف ۲۲px) */
export const CUBE_FACES: ReadonlyArray<{ n: number; t: string }> = [
  { n: 1, t: "translateZ(22px)" },
  { n: 2, t: "rotateY(90deg) translateZ(22px)" },
  { n: 3, t: "rotateY(180deg) translateZ(22px)" },
  { n: 4, t: "rotateY(-90deg) translateZ(22px)" },
  { n: 5, t: "rotateX(90deg) translateZ(22px)" },
  { n: 6, t: "rotateX(-90deg) translateZ(22px)" },
];

/**
 * فاز SL1-04 — چرخش مکعب برای نمایش وجه face + چرخش‌های کامل tumble.
 * هر فلیپ dicePop یکی زیاد می‌شود → ‎۳۶۰°×dicePop روی Y اضافه می‌شود تا مکعب همیشه
 * رو به جلو بچرخد (هرگز برگشت نزند)؛ عدد نهایی دقیقاً همان d منطقی است.
 */
export function cubeTransform(face: number, turns: number): string {
  const base: Record<number, [number, number]> = {
    1: [0, 0],
    2: [0, -90],
    3: [0, -180],
    4: [0, -270],
    5: [-90, 0],
    6: [90, 0],
  };
  const [rx, ry] = base[face] ?? [0, 0];
  return `rotateX(${rx}deg) rotateY(${ry + turns * 360}deg)`;
}

/** فاز SL1-03 — ذرات confetti — قطعی (بدون Math.random در رندر) با پالت بازی (زمردی/کهربایی/فیروزه‌ای) */
export const CONFETTI: ReadonlyArray<{ left: number; delay: number; dur: number; cls: string; w: number; h: number }> =
  Array.from({ length: 36 }, (_, i) => ({
    left: (i * 97) % 100,
    delay: (i % 9) * 0.13,
    dur: 2.2 + (i % 5) * 0.3,
    cls: ["bg-emerald-500", "bg-amber-500", "bg-teal-500"][i % 3]!,
    w: 6 + (i % 3) * 2,
    h: 9 + (i % 4) * 2,
  }));

export function lessonLabel(l: number): string {
  return l === 0 ? "جمع‌بندی" : `درس ${faNum(l)}`;
}

/** یک گزینهٔ غلط تصادفی برای جواب ربات */
export function wrongIndexOf(q: QuizQuestionSeed): number {
  const wrongs = [0, 1, 2, 3].filter((i) => i !== q.answer);
  return wrongs[Math.floor(Math.random() * wrongs.length)] ?? q.answer;
}
