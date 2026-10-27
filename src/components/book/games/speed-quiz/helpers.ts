/**
 * helpers — منطق خالص بازی «تست برقی» (گام ۹ نقشهٔ docs/refactor-roadmap-2.md).
 * تفکیک مکانیکی از speed-quiz-game.tsx (پلی‌بوک fps/) — بدون اثر جانبی؛
 * scopeOf/scopeFor/quizKeyOf/shapeOptions/smartOrderDeck/rankOf/lessonLabel عیناً از فایل اصلی
 * (تنها دلتا: پسوند export روی توابع؛ Rank خصوصی می‌ماند).
 */

import { Sprout, Trophy, Wind, Zap, type LucideIcon } from "lucide-react";
import type { QuizQuestionSeed } from "@/data/types";
import { optionsFor, scopeWithLevel, type DifficultyKey } from "../kit/difficulty";
import { smartPick } from "../kit/smart-pick";
import { faNum, shuffle } from "../shared";
import { ALL_LESSON, type CatKey, type RoundMode } from "./types";

export function scopeOf(lesson: number, cat: CatKey, duration: number): string {
  return `${lesson === ALL_LESSON ? "all" : lesson}:${cat}:${duration}`;
}

/**
 * فاز G3 — اسکوپ رکورد/تله‌متری دور: عادی = دقیقاً همان scopeOf قدیمی
 * (scopeWithLevel در سطح عادی دست‌نخورده)؛ بی‌پایان = پسوند :endless به‌جای مدت
 * (الگوی بی‌نهایت وردل — امتیاز بی‌پایان ×۱ است و به مدت وابسته نیست).
 */
export function scopeFor(
  lesson: number,
  cat: CatKey,
  duration: number,
  level: DifficultyKey,
  roundMode: RoundMode,
): string {
  if (roundMode === "endless") {
    return `${lesson === ALL_LESSON ? "all" : lesson}:${cat}:endless`;
  }
  return scopeWithLevel(scopeOf(lesson, cat, duration), level);
}

/**
 * فاز G3-02 — کلید SRS یک سؤال: واژهٔ پاسخ سؤال واژگانی، دقیقاً با همان رشته‌ای که
 * seedReviewFromQuiz همین بازی در مرور هوشمند می‌نویسد؛ سؤال‌های گرامر کلید مستقل دارند.
 */
export function quizKeyOf(q: QuizQuestionSeed): string {
  return q.category === "vocabulary" ? q.options[q.answer] : `gq:${q.text}`;
}

/**
 * فاز G3-01 — شکل‌دهی گزینه‌های یک سؤال به تعداد سطح:
 * آسان ۳ گزینه (حذف گزینهٔ انحرافی اضافه — پاسخ هرگز حذف نمی‌شود) · عادی ۴ گزینه
 * (بدون هیچ دخل‌و‌تصرفی — همان سؤال خام بانک تست) · سخت ۵ گزینه (مزاحم از استخر
 * گزینه‌های سایر سؤال‌ها، هرگز برابر گزینه‌های موجود). اگر استخر اجازهٔ افزودن
 * ندهد، سؤال بدون تغییر می‌ماند (شکنندگی صفر).
 */
export function shapeOptions(
  q: QuizQuestionSeed,
  level: DifficultyKey,
  trapPool: string[],
): QuizQuestionSeed {
  const target = optionsFor(level, 3, 5);
  const opts = [...q.options];
  const ans = opts[q.answer];
  if (!ans || opts.length === target) return q;
  if (opts.length > target) {
    // آسان — حذف گزینه‌های غلط اضافه
    const wrongIdx = opts.map((_, i) => i).filter((i) => i !== q.answer);
    const removed = new Set(shuffle(wrongIdx).slice(0, opts.length - target));
    const next = opts.filter((_, i) => !removed.has(i));
    return { ...q, options: next, answer: Math.max(0, next.indexOf(ans)) };
  }
  // سخت — افزودن گزینهٔ مزاحم از استخر مشترک (شافل عادی — همان الگوی قبلی traps)
  const taken = new Set(opts.map((o) => o.trim().toLowerCase()));
  const extra: string[] = [];
  for (const cand of trapPool) {
    if (extra.length >= target - opts.length) break;
    const key = cand.trim().toLowerCase();
    if (!key || taken.has(key)) continue;
    taken.add(key);
    extra.push(cand);
  }
  if (extra.length === 0) return q; // استخر اجازه نداد — بدون تغییر
  const next = shuffle([...opts, ...extra]);
  return { ...q, options: next, answer: Math.max(0, next.indexOf(ans)) };
}

/**
 * فاز G3-02 — چیدن کارت دور با اولویت SRS ضعیف/سررسید/نو: نیمهٔ اول از smartPick
 * (نمونه‌گیری وزن‌دار کیت) و بقیه با شافل عادی — هیچ سؤالی حذف نمی‌شود و چرخهٔ
 * بی‌پایان دست‌نخورده است؛ فقط ترتیب ورود هوشمندتر است. شروع سرد (SRS خالی) =
 * دقیقاً همان شافل قبلی. فیلتر بر اساس هویت شیء است تا تکراری‌های کلید‌دار از دست نروند.
 */
export function smartOrderDeck<T>(pool: T[], keyOf: (item: T) => string): T[] {
  if (pool.length <= 1) return shuffle(pool);
  const n = Math.max(1, Math.min(pool.length - 1, Math.ceil(pool.length / 2)));
  const head = smartPick(pool, n, keyOf);
  const inHead = new Set<T>(head);
  const tail = shuffle(pool.filter((x) => !inHead.has(x)));
  return [...head, ...tail];
}

interface Rank {
  label: string;
  icon: LucideIcon;
  cls: string;
}

/** رتبهٔ شخصی بر اساس امتیاز نهایی */
export function rankOf(score: number): Rank {
  if (score >= 250) return { label: "اسطورهٔ برق", icon: Trophy, cls: "text-amber-600 dark:text-amber-400" };
  if (score >= 150) return { label: "تندباد", icon: Zap, cls: "text-emerald-600 dark:text-emerald-400" };
  if (score >= 70) return { label: "چابک", icon: Wind, cls: "text-teal-600 dark:text-teal-400" };
  return { label: "تازه‌کار", icon: Sprout, cls: "text-muted-foreground" };
}

export function lessonLabel(l: number): string {
  return l === 0 ? "جمع‌بندی" : `درس ${faNum(l)}`;
}
