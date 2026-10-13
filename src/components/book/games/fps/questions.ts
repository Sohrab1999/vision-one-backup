"use client";

import { pickUnique, shuffle } from "../shared";
import { ALL_LESSONS, LANE_X } from "./constants";
import { qLabel } from "./helpers";
import type { Conversation, QuizQuestionSeed, VocabEntry } from "@/data/types";
import type { Question, TargetSpec } from "./types";

/** چیدمان هدف‌ها روی ۴ لِین با ارتفاع/عمق/حرکت متفاوت — فاز F10-ب: تا ۷ هدف (زنجیرهٔ ۳ واژه + حواس‌پرتی) */
export function layoutTargets(
  opts: Array<{ text: string; correct: boolean }>,
  wave = 1,
): TargetSpec[] {
  // فاز F10-ب — با بیش از ۴ هدف، لِین‌ها تکرار می‌شوند (هر لِین حداکثر ۲ هدف در عمق متفاوت)؛
  // برای ۴ هدف و کمتر رفتار قبلی عیناً حفظ می‌شود (شانس یکسان لِین‌ها)
  const lanes = shuffle(Array.from({ length: Math.max(opts.length, 4) }, (_, i) => i % 4));
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

// ─── فاز F10-ب — «جملهٔ زنجیره‌ای»: سؤال از خط‌های مکالمهٔ واقعی جزوه (ConversationLine) ───

/** بذر یک جملهٔ قابل‌بازی زنجیره — مستقیم از دادهٔ جزوه، بدون ساخت دادهٔ الکی */
export interface ChainSeed {
  lesson: number;
  /** جملهٔ کامل انگلیسی (عین جزوه) */
  en: string;
  /** ترجمهٔ فارسی (عین جزوه) */
  fa: string;
  /** منبع نمایشی — مثل «مکالمه درس دوم — صفحه ۴۷» */
  source: string;
  /** سه واژهٔ زنجیره به ترتیبِ جمله */
  words: string[];
  /** همهٔ واژه‌های تمیز جمله — حواس‌پرتی‌ها از این‌ها جدا می‌شوند */
  ownWords: string[];
}

/** پاک‌سازی لبهٔ توکن: نقطه‌گذاری لبه‌ها حذف؛ آپاستروف/خط تیرهٔ درونی واژه حفظ می‌شود */
function chainToken(raw: string): string {
  return raw.replace(/^[^A-Za-z0-9'’-]+|[^A-Za-z0-9'’-]+$/g, "");
}

/** واژهٔ محتوای مجاز برای زنجیره/حواس‌پرتی: حروف انگلیسی (با آپاستروف/خط تیره)، ≥ ۳ حرف، بدون عدد */
function chainWordOk(w: string): boolean {
  return /^[A-Za-z][A-Za-z'’-]*$/.test(w) && w.length >= 3;
}

/** گزینش خط‌های قابل‌بازی از مکالمه‌های کتاب فعال (lesson = ALL_LESSONS → همهٔ درس‌ها):
 * جمله‌های ۴ تا ۹ واژه با دست‌کم ۳ واژهٔ محتوای یکتا؛ واژه‌های تکراری در جمله کنار گذاشته می‌شوند
 * تا جای خالی‌ها مبهم نشود. واژه‌های بلندتر (≥۴ حرف) ترجیح داده می‌شوند تا زنجیره معنادار باشد.
 */
export function chainSeedsOfConversations(convs: Conversation[], lesson: number): ChainSeed[] {
  const seeds: ChainSeed[] = [];
  for (const conv of convs) {
    if (lesson !== ALL_LESSONS && conv.lesson !== lesson) continue;
    const page = conv.source.split("—").pop()?.trim() ?? "";
    const source = [conv.titleFa, page].filter(Boolean).join(" — ");
    for (const line of conv.lines) {
      const tokens = line.en.split(/\s+/).map(chainToken);
      const kept = tokens.filter((t) => t.length > 0);
      if (kept.length < 4 || kept.length > 9) continue;
      const words = tokens.filter(chainWordOk);
      const freq = new Map<string, number>();
      for (const w of words) freq.set(w, (freq.get(w) ?? 0) + 1);
      const uniqueWords = [...freq.keys()].filter((w) => freq.get(w) === 1);
      let cand = uniqueWords.filter((w) => w.length >= 4);
      if (cand.length < 3) cand = uniqueWords;
      if (cand.length < 3) continue;
      const chosen = shuffle(cand)
        .slice(0, 3)
        .sort((a, b) => tokens.indexOf(a) - tokens.indexOf(b)); // ترتیبِ جمله حفظ می‌شود
      seeds.push({
        lesson: conv.lesson,
        en: line.en,
        fa: line.fa,
        source,
        words: chosen,
        ownWords: [...new Set(words)],
      });
    }
  }
  return seeds;
}

/** بانک واژه‌های واقعی مکالمه‌ها برای حواس‌پرتی‌های زنجیره (فقط خط‌های دیگر — از خطِ سؤال جدا می‌شود) */
export function chainWordBankOfConversations(convs: Conversation[], lesson: number): string[] {
  const words = new Set<string>();
  for (const conv of convs) {
    if (lesson !== ALL_LESSONS && conv.lesson !== lesson) continue;
    for (const line of conv.lines) {
      for (const w of line.en.split(/\s+/).map(chainToken)) {
        if (chainWordOk(w)) words.add(w);
      }
    }
  }
  return [...words];
}

/** سازندهٔ سؤال زنجیره: ۳ واژهٔ درست (به ترتیب جمله) + حواس‌پرتی‌های واقعی روی لِین‌ها؛
 * promptMain جمله با سه جای خالی «___» است؛ srsKey عمداً خالی می‌ماند (جمله کلید SRS واژگانی ندارد).
 */
export function buildChainQuestion(
  seq: number,
  seed: ChainSeed,
  bank: string[],
  lesson: number,
  maxOthers: number,
  wave = 1,
): Question {
  const others = pickUnique(
    bank.filter((w) => !seed.ownWords.includes(w)),
    maxOthers,
    (w) => w.toLowerCase(),
  );
  const opts = shuffle([
    ...seed.words.map((w) => ({ text: w, correct: true })),
    ...others.map((w) => ({ text: w, correct: false })),
  ]);
  const blanks = new Set(seed.words);
  const blanked = seed.en
    .split(/\s+/)
    .map((tok) => (blanks.has(chainToken(tok)) ? "___" : tok))
    .join(" ");
  return {
    seq,
    mode: "sentence-chain",
    promptFa: "جملهٔ زنجیره — سه واژه را به ترتیب شکار کن",
    promptMain: blanked,
    promptSub: seed.source,
    ltr: true,
    targets: layoutTargets(opts, wave),
    speakText: seed.en,
    srsKey: "",
    lesson,
    sequence: { words: seed.words, en: seed.en, fa: seed.fa, source: seed.source },
  };
}
