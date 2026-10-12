"use client";

import { pickUnique, shuffle } from "../shared";
import { LANE_X } from "./constants";
import { qLabel } from "./helpers";
import type { QuizQuestionSeed, VocabEntry } from "@/data/types";
import type { Question, TargetSpec } from "./types";

/** چیدمان هدف‌ها روی ۴ لِین با ارتفاع/عمق/حرکت متفاوت */
export function layoutTargets(
  opts: Array<{ text: string; correct: boolean }>,
  wave = 1,
): TargetSpec[] {
  const lanes = shuffle([0, 1, 2, 3]);
  // فاز T1 — همهٔ هدف‌ها «پهپاد متخاصم» با بدنهٔ فولادی تیره‌اند؛ تشخیص گزینهٔ درست فقط با خواندن واژه
  const colors = [0x3d4654, 0x38424e, 0x424c5a, 0x39424e];
  // فاز F8 — موج‌بندی: حرکت سریع‌تر و چیدمان عمیق‌تر در موج‌های بالاتر
  const sp = 1 + (wave - 1) * 0.16;
  const depthExtra = Math.min(wave - 1, 4) * 0.55;
  return opts.map((o, i) => ({
    id: `t${i}`,
    text: o.text,
    correct: o.correct,
    lane: LANE_X[lanes[i]],
    baseY: 1.35 + (i % 2) * 0.85 + Math.random() * 0.35,
    baseZ: -(5.5 + Math.floor(i / 2) * 3.4) - Math.random() * 2.6 - depthExtra,
    spin: (0.5 + Math.random() * 0.7) * sp,
    bobSpeed: (0.8 + Math.random() * 0.7) * sp,
    driftAmp: (0.5 + Math.random() * 0.8) * (1 + (wave - 1) * 0.1),
    colorHex: colors[i % colors.length],
  }));
}

/** فاز G2-e — maxOthers: تعداد حواس‌پرتی (کیفیت سبک = ۳ هدف هم‌زمان) */
export function buildWordQuestion(
  seq: number,
  target: VocabEntry,
  distrPool: VocabEntry[],
  lesson: number,
  maxOthers: number,
  wave = 1,
): Question {
  const others = pickUnique(
    distrPool.filter((w) => w.word !== target.word),
    maxOthers,
    (w) => w.word,
  );
  const opts = shuffle([
    { text: target.word, correct: true },
    ...others.map((w) => ({ text: w.word, correct: false })),
  ]);
  return {
    seq,
    mode: "word-hunt",
    promptFa: "معنی را خواندی؟ واژهٔ درست را شکار کن!",
    promptMain: target.meaning,
    promptSub: target.pos ?? "واژهٔ درس",
    ltr: false,
    targets: layoutTargets(opts, wave),
    speakText: target.word,
    srsKey: target.word,
    lesson,
  };
}

/** فاز F10-a — حالت شنیداری: مثل شکار واژه، ولی سؤال «صدا» است و متن واژه مخفی می‌ماند.
 * promptMain عمداً فقط نماد بلندگوست — تشخیص درست فقط با شنیدن (قانون آموزشی)؛
 * پخش خودکار و «پخش دوباره» در index.tsx روی همین mode کلید می‌خورند.
 */
export function buildListeningQuestion(
  seq: number,
  target: VocabEntry,
  distrPool: VocabEntry[],
  lesson: number,
  maxOthers: number,
  wave = 1,
): Question {
  const others = pickUnique(
    distrPool.filter((w) => w.word !== target.word),
    maxOthers,
    (w) => w.word,
  );
  const opts = shuffle([
    { text: target.word, correct: true },
    ...others.map((w) => ({ text: w.word, correct: false })),
  ]);
  return {
    seq,
    mode: "listening-hunt",
    promptFa: "شنیداری — گوش کن و شکار کن",
    promptMain: "🔊؟",
    promptSub: "واژه را شنیدی؟ پهپادِ همان واژه را پیدا کن",
    ltr: false,
    targets: layoutTargets(opts, wave),
    speakText: target.word,
    srsKey: target.word,
    lesson,
  };
}

/** فاز G2-e — maxOthers: در کیفیت سبک گزینهٔ درست + ۲ حواس‌پرتی (چیدمان لِین‌ها شافل است) */
export function buildGrammarQuestion(seq: number, s: QuizQuestionSeed, lesson: number, maxOthers: number, wave = 1): Question {
  const optsAll = s.options.map((text, i) => ({ text, correct: i === s.answer }));
  const opts = [optsAll[s.answer], ...optsAll.filter((o) => !o.correct).slice(0, maxOthers)];
  return {
    seq,
    mode: "grammar-gate",
    promptFa: "سد گرامری! گزینهٔ درست را شکار کن",
    promptMain: qLabel(s.text),
    promptSub: s.scope,
    ltr: true,
    targets: layoutTargets(opts, wave),
    speakText: s.text.replace(/_+/, s.options[s.answer]),
    srsKey: s.options[s.answer],
    lesson,
  };
}
