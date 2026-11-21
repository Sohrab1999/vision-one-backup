/**
 * موتور تمرین داده‌محور درس VIU — قلب الگوی آموزشی مشترک سه‌کتابی
 * (مأموریت مالک `VIU-LEARNING-EXPERIENCE-UPGRADE-01` — بند ۴-ج: «تمرین‌های غیرقابل
 * پشتیبانی با دادهٔ موجود نباید به‌صورت نمایشی یا با محتوای ساختگی ایجاد شوند»).
 *
 * اصول قطعی:
 *  - صفر تولید محتوا: جمله‌ها عین متن کتاب (word-in-context — ترجمهٔ چاپی با گیت D7)،
 *    معنی‌ها و گزینه‌های انحرافی فقط از واژه‌های واقعی همان درس ساخته می‌شوند (اشتقاق، نه اختراع).
 *  - هر نوع تمرین «شرط داده» دارد؛ اگر داده کافی نبود، صادقانه در skipped با دلیل ثبت
 *    می‌شود و هرگز با محتوای نمایشی جایگزین نمی‌شود.
 *  - کتاب‌مستقل: فقط به شکل داده تکیه دارد (VocabEntry/جمله‌های ورودی) — برای هر سه کتاب
 *    viu-elem/viu-preint/viu-upper و هر کتاب آیندهٔ هم‌شکل یکسان کار می‌کند.
 *  - قطعی (PRNG بذردار) — خروجی هر درس بین رندرها پایدار است (بدون ناهماهنگی hydration).
 *  - صفر وابستگی به React/استورها — تابع خالص ورودی→خروجی (قابل راستی‌آزمایی با bun).
 */

import type { VocabEntry } from "@/data/types";

export type ExerciseKind =
  | "word-meaning-match"
  | "contextual-meaning"
  | "fill-blank"
  | "sentence-completion"
  | "sentence-construction"
  | "active-recall";

/** هدف آموزشی ثبت‌شدهٔ هر نوع تمرین (برچسب صادقانهٔ UI) */
export const EXERCISE_OBJECTIVES: Record<ExerciseKind, { title: string; goal: string }> = {
  "word-meaning-match": { title: "تطبیق واژه با معنی", goal: "پیوند واژه ↔ معنی فارسی" },
  "contextual-meaning": { title: "معنی در بافت", goal: "درک معنی از جملهٔ واقعی کتاب" },
  "fill-blank": { title: "جای خالی", goal: "بازیابی فعال شکل واژه در جمله" },
  "sentence-completion": { title: "تکمیل جمله", goal: "انتخاب واژهٔ درست در بافت" },
  "sentence-construction": { title: "ساخت جمله", goal: "کاربرد فعال واژه در جملهٔ کتاب" },
  "active-recall": { title: "یادآوری فعال", goal: "خودارزیابی و تثبیت در SRS" },
};

/** جملهٔ بافت واقعی (از word-in-context — فقط با ترجمهٔ معتبر D7 به موتور می‌رسد) */
export interface ExerciseSentence {
  /** واژهٔ پایهٔ درس که جمله برای آن یافت شده */
  word: string;
  /** متن انگلیسی عین کتاب */
  en: string;
  /** ترجمهٔ اعتبارسنجی‌شده (D7) */
  fa: string;
  /** بازهٔ واژهٔ هدف روی en (عین ContextSentence) */
  spanStart: number;
  spanEnd: number;
}

// ─── آیتم‌های هر نوع تمرین ───

export interface MatchExercise {
  kind: "word-meaning-match";
  pairs: { word: string; meaning: string; pos?: string }[];
}
export interface ContextMeaningExercise {
  kind: "contextual-meaning";
  word: string;
  en: string;
  fa: string;
  spanStart: number;
  spanEnd: number;
  options: string[];
  answer: number;
}
export interface FillBlankExercise {
  kind: "fill-blank";
  word: string;
  /** جمله با جای خالی به‌جای واژهٔ هدف */
  enWithBlank: string;
  /** شکل صرف‌شدهٔ عین جمله (پاسخ) */
  answer: string;
  fa: string;
}
export interface CompletionExercise {
  kind: "sentence-completion";
  word: string;
  enWithBlank: string;
  fa: string;
  options: string[];
  answer: number;
}
export interface ConstructionExercise {
  kind: "sentence-construction";
  word: string;
  tokens: string[];
  /** ترتیب به‌هم‌ریختهٔ قطعی */
  shuffled: string[];
  fa: string;
}
export interface RecallExercise {
  kind: "active-recall";
  word: string;
  meaning: string;
  pos?: string;
}

export type GeneratedExercise =
  | MatchExercise
  | ContextMeaningExercise
  | FillBlankExercise
  | CompletionExercise
  | ConstructionExercise
  | RecallExercise;

export interface EngineSkipped {
  kind: ExerciseKind;
  reason: string;
}

export interface EngineInput {
  lesson: number;
  words: VocabEntry[];
  sentences: ExerciseSentence[];
  /** بذر قطعی (شمارهٔ درس) */
  seed?: number;
}

export interface EngineOutput {
  items: GeneratedExercise[];
  skipped: EngineSkipped[];
  stats: { words: number; sentencePool: number; usedSentences: number };
}

// ─── سقف‌های آموزشی (نه‌شمارشی — کیفیت بهتر از کمیت) ───
const MAX_MATCH_PAIRS = 6;
const MAX_CONTEXT_MEANING = 3;
const MAX_FILL_BLANK = 3;
const MAX_COMPLETION = 3;
const MAX_CONSTRUCTION = 2;
const MAX_RECALL = 8;
/** واژه‌هایی که برای معدن‌کاری جمله به word-in-context سپرده می‌شوند */
export const SENTENCE_MINING_CAP = 8;

// ─── PRNG قطعی (mulberry32) ───
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffled<T>(arr: readonly T[], rnd: () => number): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** هم‌ارز محلی hasValidFa (توافق با word-in-context — موتور وابستگی ندارد) */
const PERSIAN_RE = /[\u0600-\u06FF]/;
const CJK_RE = /[\u4E00-\u9FFF\u3400-\u4DBF]/;
function validFa(fa: string | undefined | null): boolean {
  if (!fa) return false;
  const t = fa.trim();
  if (!t || CJK_RE.test(t)) return false;
  return PERSIAN_RE.test(t);
}

/** جملهٔ «طبیعی» — صافی صادقانه علیه ردیف‌های تمرینی/برچسب‌های چاپی */
function naturalSentence(en: string): boolean {
  if (en.length < 18 || en.length > 180) return false;
  if (/[[\]|_{}<>]/.test(en)) return false;
  const tokens = en.trim().split(/\s+/);
  if (tokens.length < 4 || tokens.length > 18) return false;
  return true;
}

/** واژهٔ هدف باید یک توکن واژه‌گونه باشد (نه بخشی از کلمهٔ دیگر) */
function spanToken(en: string, spanStart: number, spanEnd: number): string | null {
  if (spanStart < 0 || spanEnd <= spanStart || spanEnd > en.length) return null;
  const tok = en.slice(spanStart, spanEnd);
  if (!/^[A-Za-z][A-Za-z'’-]*$/.test(tok)) return null;
  const before = spanStart > 0 ? en[spanStart - 1] : " ";
  const after = spanEnd < en.length ? en[spanEnd] : " ";
  if (/[\w'’-]/.test(before) || /[\w'’-]/.test(after)) return null;
  return tok;
}

function withBlank(en: string, spanStart: number, spanEnd: number): string {
  return en.slice(0, spanStart) + "______" + en.slice(spanEnd);
}

function normalizeAnswer(s: string): string {
  return s
    .toLowerCase()
    .replace(/[.,!?;:'’"()]+/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// ─── سازندهٔ اصلی ───
export function buildLessonExercises(input: EngineInput): EngineOutput {
  const words = input.words.filter((w) => w.word.trim() && validFa(w.meaning));
  const skipped: EngineSkipped[] = [];
  const items: GeneratedExercise[] = [];
  const rnd = mulberry32((input.seed ?? input.lesson) * 7919 + 13);

  if (words.length < 2) {
    if (input.words.length === 0) {
      skipped.push({ kind: "word-meaning-match", reason: "این درس ردیف واژه در بانک واژگان ندارد" });
    } else {
      skipped.push({ kind: "word-meaning-match", reason: "واژهٔ معنی‌دارِ کافی برای تمرین تطبیق وجود ندارد" });
    }
  }

  // استخر جمله‌های طبیعی واژه‌محور — هر جمله حداکثر یک‌بار مصرف می‌شود
  const sentencePool: ExerciseSentence[] = [];
  const seenSentence = new Set<string>();
  for (const s of input.sentences) {
    if (!validFa(s.fa)) continue;
    if (!naturalSentence(s.en)) continue;
    if (!spanToken(s.en, s.spanStart, s.spanEnd)) continue;
    const key = `${s.en}::${s.spanStart}`;
    if (seenSentence.has(key)) continue;
    seenSentence.add(key);
    sentencePool.push(s);
  }
  let usedSentences = 0;
  const takeSentence = (): ExerciseSentence | null => {
    const s = sentencePool.shift();
    if (!s) return null;
    usedSentences++;
    return s;
  };

  // ۱) تطبیق واژه با معنی — نیاز: ≥۲ واژه
  if (words.length >= 2) {
    const picked = shuffled(words, rnd).slice(0, Math.min(MAX_MATCH_PAIRS, words.length));
    items.push({
      kind: "word-meaning-match",
      pairs: picked.map((w) => ({ word: w.word, meaning: w.meaning, pos: w.pos })),
    });
  }

  // ۲) معنی در بافت — نیاز: جملهٔ طبیعی + ≥۴ واژه برای گزینه‌های انحرافی واقعی و متمایز
  if (words.length >= 4) {
    let made = 0;
    while (made < MAX_CONTEXT_MEANING) {
      const s = takeSentence();
      if (!s) break;
      const correct = words.find((w) => w.word === s.word)?.meaning ?? "";
      if (!validFa(correct)) continue;
      // گزینه‌های انحرافی = معنی‌های واقعی هم‌درس، متمایز و نابرابر با پاسخ درست (گزینهٔ تکراری ممنوع)
      const distractors: string[] = [];
      for (const w of shuffled(words, rnd)) {
        if (w.word === s.word || !validFa(w.meaning)) continue;
        if (w.meaning === correct || distractors.includes(w.meaning)) continue;
        distractors.push(w.meaning);
        if (distractors.length === 3) break;
      }
      if (distractors.length < 3) continue;
      const options = shuffled([correct, ...distractors], rnd);
      items.push({
        kind: "contextual-meaning",
        word: s.word,
        en: s.en,
        fa: s.fa,
        spanStart: s.spanStart,
        spanEnd: s.spanEnd,
        options,
        answer: options.indexOf(correct),
      });
      made++;
    }
    if (made === 0) skipped.push({ kind: "contextual-meaning", reason: "جملهٔ بافتِ واژه‌محور برای این درس یافت نشد" });
  } else {
    skipped.push({ kind: "contextual-meaning", reason: "واژهٔ کافی برای گزینه‌های انحرافی واقعی وجود ندارد" });
  }

  // ۳) جای خالی — نیاز: جملهٔ طبیعی
  {
    let made = 0;
    while (made < MAX_FILL_BLANK) {
      const s = takeSentence();
      if (!s) break;
      items.push({
        kind: "fill-blank",
        word: s.word,
        enWithBlank: withBlank(s.en, s.spanStart, s.spanEnd),
        answer: s.en.slice(s.spanStart, s.spanEnd),
        fa: s.fa,
      });
      made++;
    }
    if (made === 0) skipped.push({ kind: "fill-blank", reason: "جملهٔ بافتِ مناسب برای جای خالی یافت نشد" });
  }

  // ۴) تکمیل جمله — نیاز: جملهٔ طبیعی + ≥۴ واژهٔ هم‌درس به‌عنوان گزینهٔ متمایز
  if (words.length >= 4) {
    let made = 0;
    while (made < MAX_COMPLETION) {
      const s = takeSentence();
      if (!s) break;
      const answer = s.en.slice(s.spanStart, s.spanEnd);
      const answerNorm = answer.toLowerCase();
      // گزینهٔ انحرافی نمی‌تواند با شکل صرف‌شدهٔ پاسخ یکسان باشد (مثلاً went در درس go/went)
      const distractorWords: string[] = [];
      for (const w of shuffled(words, rnd)) {
        if (w.word === s.word) continue;
        if (w.word.toLowerCase() === answerNorm || distractorWords.includes(w.word)) continue;
        distractorWords.push(w.word);
        if (distractorWords.length === 3) break;
      }
      if (distractorWords.length < 3) continue;
      const options = shuffled([answer, ...distractorWords], rnd);
      items.push({
        kind: "sentence-completion",
        word: s.word,
        enWithBlank: withBlank(s.en, s.spanStart, s.spanEnd),
        fa: s.fa,
        options,
        answer: options.indexOf(answer),
      });
      made++;
    }
    if (made === 0) skipped.push({ kind: "sentence-completion", reason: "جملهٔ بافتِ مناسب برای تکمیل یافت نشد" });
  } else {
    skipped.push({ kind: "sentence-completion", reason: "واژهٔ کافی برای گزینه‌های واقعی وجود ندارد" });
  }

  // ۵) ساخت جمله — نیاز: جملهٔ ۴-۹ توکنی
  {
    let made = 0;
    while (made < MAX_CONSTRUCTION) {
      const s = takeSentence();
      if (!s) break;
      const tokens = s.en.trim().split(/\s+/);
      if (tokens.length < 4 || tokens.length > 9) continue;
      let shuffledTokens = tokens;
      for (let tries = 0; tries < 6 && shuffledTokens.join(" ") === tokens.join(" "); tries++) {
        shuffledTokens = shuffled(tokens, rnd);
      }
      if (shuffledTokens.join(" ") === tokens.join(" ")) continue;
      items.push({
        kind: "sentence-construction",
        word: s.word,
        tokens,
        shuffled: shuffledTokens,
        fa: s.fa,
      });
      made++;
    }
    if (made === 0) skipped.push({ kind: "sentence-construction", reason: "جملهٔ کوتاهِ مناسب برای ساخت یافت نشد" });
  }

  // ۶) یادآوری فعال — نیاز: ≥۱ واژه
  if (words.length >= 1) {
    const picked = shuffled(words, rnd).slice(0, Math.min(MAX_RECALL, words.length));
    for (const w of picked) {
      items.push({ kind: "active-recall", word: w.word, meaning: w.meaning, pos: w.pos });
    }
  } else {
    skipped.push({ kind: "active-recall", reason: "واژه‌ای برای یادآوری فعال وجود ندارد" });
  }

  return {
    items,
    skipped,
    stats: { words: words.length, sentencePool: sentencePool.length + usedSentences, usedSentences },
  };
}

/** تفکیک آیتم‌ها برای دو مرحلهٔ «تمرین» (دریافتی) و «کاربرد» (تولیدی) */
export function splitExercises(output: EngineOutput): {
  practice: GeneratedExercise[];
  use: GeneratedExercise[];
} {
  const practice: GeneratedExercise[] = [];
  const use: GeneratedExercise[] = [];
  for (const it of output.items) {
    if (it.kind === "sentence-construction" || it.kind === "active-recall") use.push(it);
    else practice.push(it);
  }
  return { practice, use };
}

/** مقایسهٔ پاسخ جای خالی — نرمال‌سازی نگارشی/بزرگی‌حرف */
export function isFillBlankCorrect(user: string, answer: string): boolean {
  return normalizeAnswer(user) === normalizeAnswer(answer);
}
