"use client";

/**
 * Word in Real Context (F-CV-3 — Phase 14) — نمایش واژه در جمله‌های واقعی جزوه‌ها.
 *
 * قراردادهای قطعی محصول (سند UX: docs/spec/word-in-context-ux-fcv3-2026-11-02.md):
 *  - فقط منابع عین جزوه: readings + conversations (+intro) + grammar(examples) + quotes —
 *    DictEntry.examples و متن سؤال‌های آزمون هرگز (تصمیم D7 ✅ مالک).
 *  - فقط واحدهای دارای ترجمهٔ معتبر (fa فارسیِ غیرخالی و غیرچینی) در نتایج می‌آیند —
 *    مقدار خالی یا متن چینی هرگز نمایش داده نمی‌شود (D7 + پیامد §۷؛ برای پاراگراف‌های
 *    بی‌fa/چینیِ collocations = حذف از نتایج، نه ساخت ترجمه).
 *  - ترجمهٔ ریدینگ پاراگراف‌محور است → سطح «paragraph» با برچسب صادقانه در UI (D3).
 *  - هیچ درخواست شبکه‌ای نیست — فقط dynamic import زیرماژول‌های متنی سبک
 *    (الگوی LIGHT_LOADERS اثبات‌شدهٔ F-CV-1)؛ هرگز BookData کامل ایمپورت نمی‌شود.
 *  - ایندکس هر کتاب یک‌بار در عمر صفحه ساخته و در کش ماژولی می‌ماند.
 *  - هویت یادگیری (SRS/ستاره/یاد گرفتم) اینجا کاملاً بی‌طرف است — سرویس فقط‌خواندنی است.
 *  - کلید یکتای نتیجه: (bookId, refKind, refId, sentIdx) — حذف تکرار (§۶ سند UX).
 *  - ترتیب درون کتاب (§۶): مکالمه > مثال گرامر > ریدینگ > نقل‌قول.
 *
 * دامنهٔ V1 (تصمیم D1 ✅ مالک): کتاب فعال + کتاب‌های پایه‌دار ۷→۱۲.
 * موج‌بندی (همان الگوی اثبات‌شدهٔ F-CV-1):
 *  - موج ۱ = کتاب فعال — در هر دو جایگاه hit و miss پاپ‌آپ (D2/D4).
 *  - موج ۲ = پایه‌دارهای ۷→۱۲ منهای فعال، فقط در جایگاه miss کامل پاپ‌آپ (D4/§۱۲ سند UX)؛
 *    ادغام §۶-۴: ① نتایج کتاب فعال ② پایه‌دارها با |Δپایه| صعودی (proximityRank سرویس
 *    بین‌کتابی — منبع یگانهٔ قاعدهٔ نزدیکی) با tie-breaker ثبت‌شده = پایهٔ صعودی ۷→۱۲
 *    (رفتار پایدار sort در F-CV-1).
 *  - سقف ۱۲ در سطح کل سکشن (نه هر موج/کتاب — §۶ بند ۵ سند UX و §۳-۵ مأموریت گام ۲).
 */

import type { BookId } from "../data/books/types";
import type { ChapterMeta, Conversation, GrammarLesson, Reading } from "../data/types";
import { isGradedBookId, proximityRank } from "./cross-book-vocab";

// ─── انواع عمومی ───

/** خانوادهٔ منبع یک جمله — ترتیب کیفیت تراز ترجمه (§۶ سند UX) */
export type ContextRefKind = "conversation" | "grammar" | "reading" | "quote";

/** سطح ترجمهٔ صادقانه (§۷ سند UX): جمله‌به‌جملهٔ چاپی یا پاراگراف‌محور (برچسب‌دار در UI) */
export type TranslationLevel = "sentence" | "paragraph";

/** خط منبع ۵جزئی (D8): ایموجی/عنوان کتاب در UI از BookMeta می‌آید؛ اینجا دادهٔ خود واحد */
export interface ContextSourceInfo {
  /** چیپ درس/فصل از دادهٔ خود کتاب («درس ۲» / «داستان ۴») */
  lessonLabel: string | null;
  /** نوع محتوا: مکالمه / مثال گرامر / متن خواندنی / نقل‌قول */
  contentType: string;
  /** رشتهٔ source چاپی جزوه (در صورت وجود) */
  printedSource: string | null;
}

/** یک جملهٔ واقعی یافت‌شده — فقط نمایش؛ هیچ نوشتنی در استورهای یادگیری انجام نمی‌شود */
export interface ContextSentence {
  bookId: BookId;
  refKind: ContextRefKind;
  refId: string;
  /** اندیس جمله در واحد خودش (برای ریدینگ: اندیس در پاراگراف) — جزء کلید یکتا */
  sentIdx: number;
  /** متن انگلیسی عین جزوه (برای ریدینگ: برش عین رشتهٔ پاراگراف) */
  en: string;
  /** ترجمهٔ چاپی معتبر (اعتبارسنجی‌شده — D7) */
  fa: string;
  level: TranslationLevel;
  /** بازهٔ برجسته‌شونده روی en (مرزهای توکن — علائم دست نمی‌خورند) */
  spanStart: number;
  spanEnd: number;
  source: ContextSourceInfo;
  /** فقط برای سطح paragraph: پاراگراف کامل عین جزوه (جمع‌شوندهٔ C-3 با تصمیم D3) */
  paraEn?: string;
  paraFa?: string;
  /** آفست en درون paraEn (برای mark داخل پاراگراف کامل) */
  paraSentenceStart?: number;
}

export interface WordContextResult {
  sentences: ContextSentence[];
  /** true = ایندکس کتاب اصلاً بارگذاری نشد (آفلاین سرد/شکست چانک) —
   *  تمایز صادقانهٔ «یافت نشد» از «جست‌وجو انجام نشد» (الگوی WithStatus در F-CV-2) */
  degraded: boolean;
}

/** سقف داخلی نتایج به‌ازای دامنه (§۶ بند ۵ — نمایش UI: ۲+۲+۲ تا ۶، تصمیم D5) */
export const WORD_CONTEXT_MAX_RESULTS = 12;

// ─── نرمال‌سازی — آینهٔ word-lookup.tsx / cross-book-vocab.ts (بدون دوباره‌کاری) ───

function normalize(raw: string): string {
  return raw
    .replace(/[’‘]/g, "'")
    .replace(/[^A-Za-z' \-]/g, "")
    .trim()
    .toLowerCase();
}

/** همان زنجیرهٔ ساده‌سازی صرفیِ `lookup()` پاپ‌آپ و سرویس بین‌کتابی (رفتار یکدست) */
function inflectionCandidates(norm: string): string[] {
  const candidates = [norm];
  if (norm.endsWith("'s")) candidates.push(norm.slice(0, -2));
  if (norm.endsWith("ies")) candidates.push(norm.slice(0, -3) + "y");
  if (norm.endsWith("es")) candidates.push(norm.slice(0, -2));
  if (norm.endsWith("s") && !norm.endsWith("ss")) candidates.push(norm.slice(0, -1));
  if (norm.endsWith("ed")) candidates.push(norm.slice(0, -2), norm.slice(0, -1));
  if (norm.endsWith("ing")) candidates.push(norm.slice(0, -3), norm.slice(0, -3) + "e");
  return candidates;
}

/**
 * شکل‌های سطحی منظم یک پایه (§۶ بند ۱ سند UX): +s / +es / +'s / +ing (حذف e) / +ed،+d
 * — دوبرابرشدن صامت پایانی و جمع‌های بی‌قاعدهٔ غیرفعل عمداً تولید نمی‌شوند (محدودیت
 * مستند؛ هم‌سطح تقریبِ زنجیرهٔ فعلی پاپ‌آپ)؛ گذشته/اسم‌مفعول بی‌قاعده فقط از جدول
 * چاپی فعل‌های خود هر کتاب (بدون ریشه‌یابی حدسی — قرارداد F-CV-1).
 */
function forwardForms(base: string): string[] {
  const forms = new Set<string>();
  forms.add(base);
  if (!base.endsWith("s")) {
    forms.add(base + "'s");
    forms.add(base + "s");
    forms.add(base + "ing");
    if (base.endsWith("e") && base.length > 2) forms.add(base.slice(0, -1) + "ing");
    if (/(?:[^aeiou]y)$/.test(base)) {
      forms.add(base.slice(0, -1) + "ies"); // study → studies
      forms.add(base.slice(0, -1) + "ied"); // study → studied
    } else {
      forms.add(base + (base.endsWith("e") ? "d" : "ed")); // take → taking/taked فرم‌های نامعتبر بی‌ضررند (فقط مجموعهٔ تطبیق‌اند)
      if (/(?:s|sh|ch|x|z|o)$/.test(base)) forms.add(base + "es"); // go → goes, box → boxes
    }
  }
  return [...forms];
}

/** مجموعهٔ توکن‌های منطبق برای یک واژهٔ کوئری (زنجیرهٔ معکوس + جدول فعل کتاب، هر دو جهت) */
function buildFormSet(
  norm: string,
  verbReverse: Map<string, string>,
  verbForward: Map<string, { past: string; participle: string }>,
): Set<string> {
  const set = new Set<string>();
  const seeds = inflectionCandidates(norm);
  for (const c of seeds) {
    if (!c) continue;
    set.add(c);
    for (const f of forwardForms(c)) set.add(f);
    // جدول چاپی فعل‌های خود کتاب — تنها منبع نگاشت بی‌قاعده (قرارداد F-CV-1)
    const base = verbReverse.get(c);
    if (base) {
      set.add(base);
      for (const f of forwardForms(base)) set.add(f);
      const irregular = verbForward.get(base);
      if (irregular) {
        set.add(irregular.past);
        set.add(irregular.participle);
      }
    }
  }
  // واژهٔ پایه → شکل‌های بی‌قاعدهٔ خودش (مثلاً کلیک روی go → went/gone)
  const directIrregular = verbForward.get(norm);
  if (directIrregular) {
    set.add(directIrregular.past);
    set.add(directIrregular.participle);
  }
  set.delete("");
  return set;
}

// ─── اعتبارسنجی ترجمه (D7 — §۷ سند UX و پیوست ب-۳) ───

const CJK_RE = /[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]/;
const PERSIAN_RE = /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/;

/** «ترجمهٔ معتبر» فقط fa فارسی چاپی است — خالی/چینی/بدون حرف فارسی = نامعتبر (هرگز رندر نمی‌شود) */
export function hasValidFa(fa: string | undefined | null): boolean {
  if (!fa) return false;
  const t = fa.trim();
  if (!t) return false;
  if (CJK_RE.test(t)) return false;
  return PERSIAN_RE.test(t);
}

// ─── تقسیم جملهٔ ریدینگ (§۶ بند ۲ — برش عین رشته، حفاظت اختصارات و اعداد اعشاری) ───

const ABBREV_RE = /\b(?:Mr|Mrs|Ms|Dr|a\.m|p\.m|e\.g|i\.e|etc)\./g;
const DECIMAL_RE = /(\d)\.(\d)/g;
/** نگه‌دارندهٔ هم‌طول: «.» → «¤» تا آفست‌ها ۱:۱ بمانند و برش، عین رشتهٔ اصلی باشد */
const DOT_SENTINEL = "¤";

function splitSentences(en: string): string[] {
  const protectedText = en
    .replace(ABBREV_RE, (m) => m.replace(/\./g, DOT_SENTINEL))
    .replace(DECIMAL_RE, "$1¤$2");
  const pieces: string[] = [];
  let start = 0;
  const boundary = /[.!?]+["')\]]*(?=\s|$)/g;
  for (const m of protectedText.matchAll(boundary)) {
    const end = (m.index ?? 0) + m[0].length;
    if (end > start) pieces.push(protectedText.slice(start, end));
    start = end;
  }
  if (start < protectedText.length) pieces.push(protectedText.slice(start));
  return pieces
    .map((p) => p.split(DOT_SENTINEL).join(".").trim())
    .filter((p) => p.length > 0);
}

// ─── توکنایز — آینهٔ WORD_RE پاپ‌آپ ───

const WORD_RE = /[A-Za-z]+(?:['’-][A-Za-z]+)*/g;

interface Token {
  norm: string;
  start: number;
  end: number;
}

function tokenize(en: string): Token[] {
  const tokens: Token[] = [];
  for (const m of en.matchAll(WORD_RE)) {
    const start = m.index ?? 0;
    const raw = m[0];
    const norm = normalize(raw);
    if (norm) tokens.push({ norm, start, end: start + raw.length });
  }
  return tokens;
}

// ─── ایندکس ماژولی هر کتاب ───

interface StoredSentence {
  sentence: ContextSentence;
  tokens: Token[];
}

interface SentenceIndex {
  sentences: StoredSentence[];
  byToken: Map<string, number[]>;
  /** گذشته/اسم‌مفعول → پایه (فقط از جدول چاپی خود کتاب) */
  verbReverse: Map<string, string>;
  /** پایه → گذشته/اسم‌مفعول */
  verbForward: Map<string, { past: string; participle: string }>;
}

const KIND_RANK: Record<ContextRefKind, number> = { conversation: 0, grammar: 1, reading: 2, quote: 3 };

function lessonLabelFor(lesson: number, chapters: ChapterMeta[]): string | null {
  const ch = chapters.find((c) => c.id === lesson);
  if (ch) return ch.number;
  return lesson > 0 ? `درس ${lesson.toLocaleString("fa-IR")}` : null;
}

/** افزودن یک واحد متنی به ایندکس — فقط در صورت داشتن متن EN (برش عین رشته) */
function pushUnit(store: StoredSentence[], unit: ContextSentence) {
  const en = unit.en.trim();
  if (!en) return;
  const sentence: ContextSentence = { ...unit, en };
  if (unit.paraEn !== undefined) sentence.paraSentenceStart = unit.paraEn.indexOf(en);
  store.push({ sentence, tokens: tokenize(en) });
}

function buildSentenceIndex(
  bookId: BookId,
  readings: Reading[],
  conversations: Conversation[],
  grammar: GrammarLesson[],
  chapters: ChapterMeta[],
  verbs: { base: string; past: string; participle: string }[],
): SentenceIndex {
  const sentences: StoredSentence[] = [];

  // ① مکالمه‌ها (خط‌به‌خط — جمله‌به‌جملهٔ چاپی) + intro مکالمه (پاراگراف‌محور — برچسب D3 در UI)
  for (const conv of conversations) {
    const source: ContextSourceInfo = {
      lessonLabel: lessonLabelFor(conv.lesson, chapters),
      contentType: "مکالمه",
      printedSource: conv.source ?? null,
    };
    const intro = conv.intro;
    conv.lines.forEach((line, li) => {
      if (!hasValidFa(line.fa)) return; // D7 — خط بی‌ترجمهٔ معتبر هرگز نمایش داده نمی‌شود
      pushUnit(sentences, {
        bookId,
        refKind: "conversation",
        refId: conv.id,
        sentIdx: li,
        en: line.en,
        fa: line.fa,
        level: "sentence",
        spanStart: 0,
        spanEnd: 0,
        source,
      });
    });
    if (intro && hasValidFa(intro.fa)) {
      const pieces = splitSentences(intro.en);
      pieces.forEach((piece, pi) => {
        pushUnit(sentences, {
          bookId,
          refKind: "conversation",
          refId: `${conv.id}#intro`,
          sentIdx: pi,
          en: piece,
          fa: intro.fa,
          level: "paragraph",
          spanStart: 0,
          spanEnd: 0,
          source,
          paraEn: intro.en,
          paraFa: intro.fa,
        });
      });
    }
  }

  // ② مثال‌های گرامر (kind=examples — جمله‌به‌جملهٔ چاپی)
  for (const gl of grammar) {
    const source: ContextSourceInfo = {
      lessonLabel: lessonLabelFor(gl.lesson, chapters),
      contentType: "مثال گرامر",
      printedSource: null,
    };
    let itemIdx = 0;
    for (const block of gl.blocks) {
      if (block.kind !== "examples" || !block.items) continue;
      for (const item of block.items) {
        if (hasValidFa(item.fa)) {
          pushUnit(sentences, {
            bookId,
            refKind: "grammar",
            refId: gl.id,
            sentIdx: itemIdx,
            en: item.en,
            fa: item.fa,
            level: "sentence",
            spanStart: 0,
            spanEnd: 0,
            source,
          });
        }
        itemIdx += 1;
      }
    }
  }

  // ③ ریدینگ‌ها (پاراگراف‌محور) — پاراگراف بی‌fa/چینی = حذف کامل واحد از نتایج (D7)
  for (const reading of readings) {
    const source: ContextSourceInfo = {
      lessonLabel: lessonLabelFor(reading.lesson, chapters),
      contentType: "متن خواندنی",
      printedSource: reading.source ?? null,
    };
    reading.paragraphs.forEach((para, pi) => {
      if (!hasValidFa(para.fa)) return;
      const pieces = splitSentences(para.en);
      pieces.forEach((piece, si) => {
        pushUnit(sentences, {
          bookId,
          refKind: "reading",
          refId: `${reading.id}#p${pi}`,
          sentIdx: si,
          en: piece,
          fa: para.fa,
          level: "paragraph",
          spanStart: 0,
          spanEnd: 0,
          source,
          paraEn: para.en,
          paraFa: para.fa,
        });
      });
    });
  }

  // ④ نقل‌قول فصل‌ها (جمله‌به‌جملهٔ چاپی)
  for (const ch of chapters) {
    if (!ch.quote || !hasValidFa(ch.quote.fa)) continue;
    pushUnit(sentences, {
      bookId,
      refKind: "quote",
      refId: `ch${ch.id}`,
      sentIdx: 0,
      en: ch.quote.en,
      fa: ch.quote.fa,
      level: "sentence",
      spanStart: 0,
      spanEnd: 0,
      source: {
        lessonLabel: ch.number,
        contentType: "نقل‌قول",
        printedSource: ch.quote.source ?? null,
      },
    });
  }

  // ایندکس توکن → جمله‌ها
  const byToken = new Map<string, number[]>();
  sentences.forEach((s, i) => {
    for (const t of s.tokens) {
      const list = byToken.get(t.norm);
      if (list) list.push(i);
      else byToken.set(t.norm, [i]);
    }
  });

  const verbReverse = new Map<string, string>();
  const verbForward = new Map<string, { past: string; participle: string }>();
  for (const vb of verbs) {
    const base = normalize(vb.base);
    const past = normalize(vb.past);
    const part = normalize(vb.participle);
    if (base && past && !verbReverse.has(past)) verbReverse.set(past, base);
    if (base && part && !verbReverse.has(part)) verbReverse.set(part, base);
    if (base && !verbForward.has(base)) verbForward.set(base, { past, participle: part });
  }

  return { sentences, byToken, verbReverse, verbForward };
}

// ─── بارگذارهای تنبل — فقط زیرماژول‌های متنی سبک (هرگز index.ts کامل / BookData) ───
// مسیرهای import استاتیک‌اند (دقیقاً قرارداد LIGHT_LOADERS اثبات‌شدهٔ F-CV-1) تا
// چانک‌سازی/SW رفتار قطعی داشته باشد.

type SentenceLoader = () => Promise<SentenceIndex>;

/** کتاب‌های پایه‌دار: readings + conversations + grammar + chapters + جدول فعل چاپی */
function gradedLoader(
  bookId: BookId,
  mods: {
    readings: () => Promise<{ READING_LIST: Reading[] }>;
    conversations: () => Promise<{ CONVERSATION_LIST: Conversation[] }>;
    grammar: () => Promise<{ GRAMMAR_LESSON_LIST: GrammarLesson[] }>;
    meta: () => Promise<{ CHAPTERS: ChapterMeta[] }>;
    verbs: () => Promise<{ IRREGULAR_VERBS: { base: string; past: string; participle: string }[] }>;
  },
): SentenceLoader {
  return async () => {
    const [r, c, g, m, v] = await Promise.all([mods.readings(), mods.conversations(), mods.grammar(), mods.meta(), mods.verbs()]);
    return buildSentenceIndex(bookId, r.READING_LIST, c.CONVERSATION_LIST, g.GRAMMAR_LESSON_LIST, m.CHAPTERS, v.IRREGULAR_VERBS);
  };
}

/** hill/collocations: فقط readings + chapters (بدون مکالمه/گرامر/جدول فعل — ساختار مستند Discovery §۲) */
function readingsOnlyLoader(
  bookId: BookId,
  mods: {
    readings: () => Promise<{ READING_LIST: Reading[] }>;
    meta: () => Promise<{ CHAPTERS: ChapterMeta[] }>;
  },
): SentenceLoader {
  return async () => {
    const [r, m] = await Promise.all([mods.readings(), mods.meta()]);
    return buildSentenceIndex(bookId, r.READING_LIST, [], [], m.CHAPTERS, []);
  };
}

/**
 * جدول SENTENCE_LOADERS (الگوی سند UX §۳): هر ۱۱ کتاب به‌عنوان «کتاب فعال»
 * قابل جست‌وجو هستند (D1) — کتاب‌های پایه‌دار مکالمه/گرامر/جدول فعل هم دارند؛
 * hill/collocations فقط ریدینگ + نقل‌قول. dynamic import فقط زیرماژول‌های متنی.
 */
export const SENTENCE_LOADERS: Record<BookId, SentenceLoader> = {
  "vision-one": gradedLoader("vision-one", {
    readings: () => import("../data/vision-one/readings"),
    conversations: () => import("../data/vision-one/conversations"),
    grammar: () => import("../data/vision-one/grammar"),
    meta: () => import("../data/vision-one/book-meta"),
    verbs: () => import("../data/vision-one/irregular-verbs"),
  }),
  "grade-7": gradedLoader("grade-7", {
    readings: () => import("../data/grade-7/readings"),
    conversations: () => import("../data/grade-7/conversations"),
    grammar: () => import("../data/grade-7/grammar"),
    meta: () => import("../data/grade-7/book-meta"),
    verbs: () => import("../data/grade-7/irregular-verbs"),
  }),
  "grade-8": gradedLoader("grade-8", {
    readings: () => import("../data/grade-8/readings"),
    conversations: () => import("../data/grade-8/conversations"),
    grammar: () => import("../data/grade-8/grammar"),
    meta: () => import("../data/grade-8/book-meta"),
    verbs: () => import("../data/grade-8/irregular-verbs"),
  }),
  "grade-9": gradedLoader("grade-9", {
    readings: () => import("../data/grade-9/readings"),
    conversations: () => import("../data/grade-9/conversations"),
    grammar: () => import("../data/grade-9/grammar"),
    meta: () => import("../data/grade-9/book-meta"),
    verbs: () => import("../data/grade-9/irregular-verbs"),
  }),
  "grade-11": gradedLoader("grade-11", {
    readings: () => import("../data/grade-11/readings"),
    conversations: () => import("../data/grade-11/conversations"),
    grammar: () => import("../data/grade-11/grammar"),
    meta: () => import("../data/grade-11/book-meta"),
    verbs: () => import("../data/grade-11/irregular-verbs"),
  }),
  "grade-12": gradedLoader("grade-12", {
    readings: () => import("../data/grade-12/readings"),
    conversations: () => import("../data/grade-12/conversations"),
    grammar: () => import("../data/grade-12/grammar"),
    meta: () => import("../data/grade-12/book-meta"),
    verbs: () => import("../data/grade-12/irregular-verbs"),
  }),
  collocations: readingsOnlyLoader("collocations", {
    readings: () => import("../data/collocations/readings"),
    meta: () => import("../data/collocations/book-meta"),
  }),
  "hill-intro": readingsOnlyLoader("hill-intro", {
    readings: () => import("../data/hill-intro/readings"),
    meta: () => import("../data/hill-intro/book-meta"),
  }),
  "hill-elem": readingsOnlyLoader("hill-elem", {
    readings: () => import("../data/hill-elem/readings"),
    meta: () => import("../data/hill-elem/book-meta"),
  }),
  "hill-inter": readingsOnlyLoader("hill-inter", {
    readings: () => import("../data/hill-inter/readings"),
    meta: () => import("../data/hill-inter/book-meta"),
  }),
  "hill-adv": readingsOnlyLoader("hill-adv", {
    readings: () => import("../data/hill-adv/readings"),
    meta: () => import("../data/hill-adv/book-meta"),
  }),
};

const indexCache = new Map<BookId, SentenceIndex>();
const pendingLoads = new Map<BookId, Promise<SentenceIndex | null>>();

/** شکست بارگذاری (آفلاین سرد/چانک دیده‌نشده) → null (پرچم degraded در نتیجه) */
function loadSentenceIndex(id: BookId): Promise<SentenceIndex | null> {
  const cached = indexCache.get(id);
  if (cached) return Promise.resolve(cached);
  const pending = pendingLoads.get(id);
  if (pending) return pending;
  const loader = SENTENCE_LOADERS[id];
  const p = loader()
    .then((idx) => {
      indexCache.set(id, idx);
      return idx;
    })
    .catch(() => null);
  pendingLoads.set(id, p);
  return p;
}

// ─── تطبیق و جمع‌آوری ───

/** پیدا کردن اولین بازهٔ منطبق روی توکن‌های جمله — علائم و ترتیب کلمات دست نمی‌خورند */
function firstSpan(tokens: Token[], set: Set<string>): { start: number; end: number } | null {
  for (const t of tokens) {
    if (set.has(t.norm)) return { start: t.start, end: t.end };
  }
  return null;
}

/** تطبیق عبارت چندواژه‌ای (۲ تا ۴ واژه) — واژه‌به‌واژه با احترام به علائم (فقط فاصله میان واژه‌ها) */
function phraseSpan(tokens: Token[], en: string, sets: Set<string>[]): { start: number; end: number } | null {
  const n = sets.length;
  if (tokens.length < n) return null;
  for (let i = 0; i + n <= tokens.length; i++) {
    let ok = true;
    for (let j = 0; j < n; j++) {
      if (!sets[j].has(tokens[i + j].norm)) {
        ok = false;
        break;
      }
      // احترام به علائم: میان واژه‌های عبارت فقط فاصله مجاز است
      if (j > 0) {
        const gap = en.slice(tokens[i + j - 1].end, tokens[i + j].start);
        if (!/^\s+$/.test(gap)) {
          ok = false;
          break;
        }
      }
    }
    if (ok) return { start: tokens[i].start, end: tokens[i + n - 1].end };
  }
  return null;
}

/**
 * جست‌وجوی جمله‌های واقعی یک واژه/عبارت در «کتاب فعال» — موج ۱ (رفتار گام ۱ دست‌نخورده).
 * خروجی: حذف‌تکرارشده، مرتب‌شده (مکالمه > گرامر > ریدینگ > نقل‌قول)، سقف ۱۲ داخلی.
 */
export async function lookupSentencesInActiveBook(bookId: BookId, rawNorm: string): Promise<WordContextResult> {
  const norm = normalize(rawNorm);
  if (!norm || norm.length < 2) return { sentences: [], degraded: false };

  const idx = await loadSentenceIndex(bookId);
  if (!idx) return { sentences: [], degraded: true };

  return { sentences: searchIndex(idx, norm).slice(0, WORD_CONTEXT_MAX_RESULTS), degraded: false };
}

/**
 * موتور تطبیق واحد — «تنها» مسیر جست‌وجوی جمله (موج ۱ و موج ۲ هر دو همین را صدا می‌زنند؛
 * بدون موتور موازی یا تکرار منطق — §۶ مأموریت گام ۲). منطق دقیقاً همان بدنهٔ پیشین
 * lookupSentencesInActiveBook است (استخراج بدون تغییر رفتار).
 */
function searchIndex(idx: SentenceIndex, norm: string): ContextSentence[] {
  const words = norm.split(/\s+/).filter((w) => w.length > 0).slice(0, 4); // n-gram حداکثر ۴واژه‌ای (§۶)
  const sets = words.map((w) => buildFormSet(w, idx.verbReverse, idx.verbForward));

  // نامزدها: از پستینگِ نخستین واژه (سبک‌ترین مسیر)
  const candidateIdx = new Set<number>();
  for (const t of sets[0]) {
    const list = idx.byToken.get(t);
    if (list) for (const i of list) candidateIdx.add(i);
  }

  const seen = new Set<string>();
  const hits: ContextSentence[] = [];
  for (const i of candidateIdx) {
    const stored = idx.sentences[i];
    const span =
      words.length === 1 ? firstSpan(stored.tokens, sets[0]) : phraseSpan(stored.tokens, stored.sentence.en, sets);
    if (!span) continue;
    const key = `${stored.sentence.refKind}::${stored.sentence.refId}::${stored.sentence.sentIdx}`;
    if (seen.has(key)) continue;
    seen.add(key);
    hits.push({ ...stored.sentence, spanStart: span.start, spanEnd: span.end });
  }

  // ترتیب §۶: مکالمه > مثال گرامر > ریدینگ > نقل‌قول؛ سپس پایدار بر (refId, sentIdx)
  hits.sort((a, b) => {
    const k = KIND_RANK[a.refKind] - KIND_RANK[b.refKind];
    if (k !== 0) return k;
    if (a.refId !== b.refId) return a.refId < b.refId ? -1 : 1;
    return a.sentIdx - b.sentIdx;
  });
  return hits;
}

// ─── موج ۲ — بین‌کتابی پایه‌دار ۷→۱۲ (Phase 14 / Step 2) ───

/** لنگر بی‌پایه برای مشتق‌کردن «پایهٔ مطلق» از proximityRank — بدون hardcode پراکنده:
 *  proximityRank(کتاب بی‌پایه, کتاب پایه‌دار) = 50 + پایه ⇒ اختلافش = اختلاف پایه.
 *  منبع یگانهٔ اعداد پایه همان GRADE_RANK سرویس بین‌کتابی F-CV-1 می‌ماند. */
const GRADE_ANCHOR: BookId = "collocations";

/** کلید tie-breaker ثبت‌شده (§۶ سند UX): فاصلهٔ برابر → پایهٔ صعودی ۷→۱۲
 *  (دقیقاً رفتار sort پایدار F-CV-1 روی آرایهٔ صعودی GRADED_IDS). */
function gradeAsc(book: BookId): number {
  return proximityRank(GRADE_ANCHOR, book);
}

/** کتاب‌های پایه‌دارِ دارای ایندکس جمله (۷→۱۲) — مشتق از SENTENCE_LOADERS + تعریف
 *  پایه‌دار در F-CV-1 (isGradedBookId) — بدون فهرست hardcode پراکنده (§۳-۱ مأموریت گام ۲). */
const GRADED_SENTENCE_BOOKS: BookId[] = (Object.keys(SENTENCE_LOADERS) as BookId[]).filter(isGradedBookId);

/**
 * ترتیب deterministic موج ۲ برای کتاب فعال: پایه‌دارهای ۷→۱۲ منهای فعال، مرتبشده با
 * |Δپایه| صعودی و tie-breaker «پایهٔ صعودی». کتاب‌های بی‌پایه (hill/collocations) هرگز
 * وارد موج ۲ نمی‌شوند (D1) — برای فعالِ بی‌پایه، ترتیب = صعودی پایه (رفتار proximityRank).
 * صادرشده برای آزمون‌پذیری مستقیم در QA.
 */
export function gradedWave2Order(activeBookId: BookId): BookId[] {
  return GRADED_SENTENCE_BOOKS.filter((id) => id !== activeBookId).sort((a, b) => {
    const d = proximityRank(activeBookId, a) - proximityRank(activeBookId, b);
    if (d !== 0) return d;
    return gradeAsc(a) - gradeAsc(b);
  });
}

export interface WordContextLookupOptions {
  /** موج ۲ بین‌کتابی — فقط برای جایگاه miss کامل پاپ‌آپ (D4/§۱۲)؛ در hit هرگز فعال نمی‌شود */
  includeWave2?: boolean;
}

/**
 * همان lookupSentencesInActiveBook با گزینهٔ موج ۲ (الگوی WithStatus در F-CV-2):
 *  - includeWave2=false → خروجی بایت‌به‌بایت همان موج ۱ (مسیر hit دست‌نخورده).
 *  - includeWave2=true (فقط جایگاه miss کامل پاپ‌آپ) → ادغام §۶-۴: ① نتایج کتاب فعال
 *    (ترتیب درون‌کتاب §۶) ② سپس پایه‌دارهای ۷→۱۲ با |Δپایه| صعودی و tie-breaker پایهٔ
 *    صعودی؛ درون هر کتاب همان ترتیب §۶. کلید یکتا با bookId؛ سقف ۱۲ در سطح کل سکشن
 *    (نه هر موج/کتاب — §۶-۵ سند UX و §۳-۵ مأموریت گام ۲).
 *  - degraded (تمایز صادقانهٔ C-5 — دقیقاً معنای F-CV-1): فقط وقتی هیچ ایندکسی از هیچ
 *    موجی بارگذاری نشد؛ جست‌وجوی جزئی + صفر نتیجه = «خالی» نه «انجام نشد».
 */
export async function lookupSentencesWithStatus(
  activeBookId: BookId,
  rawNorm: string,
  options?: WordContextLookupOptions,
): Promise<WordContextResult> {
  const norm = normalize(rawNorm);
  if (!norm || norm.length < 2) return { sentences: [], degraded: false };

  // ① موج ۱ — کتاب فعال (رفتار گام ۱ دست‌نخورده؛ در hit هم همین مسیر است)
  const wave1 = await lookupSentencesInActiveBook(activeBookId, rawNorm);
  if (!options?.includeWave2) return wave1;

  // ② موج ۲ — پایه‌دارهای ۷→۱۲ منهای فعال (فقط جایگاه miss کامل؛ D1)
  const ordered = gradedWave2Order(activeBookId);
  const indexes = await Promise.all(ordered.map((id) => loadSentenceIndex(id)));
  const loaded2 = indexes.filter(Boolean).length;

  const seen = new Set<string>();
  const merged: ContextSentence[] = [];
  for (const s of wave1.sentences) {
    const key = `${s.bookId}::${s.refKind}::${s.refId}::${s.sentIdx}`;
    if (!seen.has(key)) {
      seen.add(key);
      merged.push(s);
    }
  }
  for (let i = 0; i < ordered.length; i++) {
    const idx = indexes[i];
    if (!idx) continue;
    for (const s of searchIndex(idx, norm)) {
      // کلید یکتای §۶ با bookId — حذف تکرار در سطح سکشن (درون هر کتاب در searchIndex یکتاست)
      const key = `${s.bookId}::${s.refKind}::${s.refId}::${s.sentIdx}`;
      if (seen.has(key)) continue;
      seen.add(key);
      merged.push(s);
    }
  }
  return { sentences: merged.slice(0, WORD_CONTEXT_MAX_RESULTS), degraded: wave1.degraded && loaded2 === 0 };
}

/** شمارش ایندکس‌های آماده (تشخیصی/QA) */
export function loadedSentenceIndexCount(): number {
  return indexCache.size;
}
