"use client";

/**
 * chain — موتور تصمیم «جملهٔ زنجیره‌ای» (فاز F10-ب — نقشهٔ docs/fps-roadmap.md).
 *
 * منطق خالصِ شکار ترتیبی از handleHit/handleVolley/handleTimeout جدا شد تا index
 * فقط ارکستراسیون بماند (پلی‌بوک games/fps/README.md — ماژول کوچک تک‌مسئولی):
 * اینجا فقط «تصمیم» گرفته می‌شود (واژهٔ انتظاری، نتیجهٔ برخورد، هدف فلاش، برندهٔ والی)؛
 * اثرهای جانبی (صدا/امتیاز/قلب/زمان‌بندی سؤال بعد) در index.tsx می‌ماند.
 */

import { faNum } from "../shared";
import type { Question, QuestionSequence } from "./types";

/** نتیجهٔ برخورد یک هدف در حالت زنجیره */
export type ChainHit =
  | { kind: "ok"; nextProgress: number; done: boolean; msg: string }
  | { kind: "bad"; msg: string };

/** تصمیم برخورد ترتیبی: آیا واژهٔ شکارشده همان واژهٔ انتظاریِ نوبت جاری است؟ (خالص — بدون اثر جانبی) */
export function chainResolve(seq: QuestionSequence, hitText: string, progress: number): ChainHit {
  const expected = seq.words[progress];
  if (hitText === expected) {
    const nextProgress = progress + 1;
    const done = nextProgress >= seq.words.length;
    return {
      kind: "ok",
      nextProgress,
      done,
      // پیام میانی فقط برای واژه‌های غیرپایانی؛ پیام کامل‌شدن در index ساخته می‌شود (کمبو/امتیاز دارد)
      msg: done ? "" : `واژهٔ ${faNum(nextProgress)} از ${faNum(seq.words.length)} درست!`,
    };
  }
  return { kind: "bad", msg: `واژهٔ نادرست — نوبتِ «${expected}» بود — یک ❤ کم شد` };
}

/** شناسهٔ هدف واژهٔ انتظاری — برای فلاش سبز در مسیر برخورد غلط (راهنمای «جایش این بود») */
export function chainExpectedTargetId(q: Question, progress: number): string | undefined {
  if (!q.sequence) return undefined;
  const expected = q.sequence.words[progress];
  return q.targets.find((t) => t.text === expected)?.id;
}

/** واژه‌های شکارنشدهٔ زنجیره — برای فلاش سبز در پایان زمان */
export function chainRemainingTexts(seq: QuestionSequence, progress: number): string[] {
  return seq.words.slice(progress);
}

/** برندهٔ والی پمپ در حالت زنجیره: واژهٔ انتظاری > هدف طلایی > نخستین برخورد (جریمه فقط یک‌بار) */
export function chainVolleyPick(q: Question, progress: number, hits: string[]): string {
  if (q.sequence) {
    const expected = q.sequence.words[progress];
    const expectedId = q.targets.find((t) => t.text === expected)?.id;
    if (expectedId !== undefined && hits.includes(expectedId)) return expectedId;
  }
  if (hits.includes("golden")) return "golden";
  return hits[0];
}
