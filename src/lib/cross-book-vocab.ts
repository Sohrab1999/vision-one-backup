"use client";

/**
 * Cross-Book Vocabulary Lookup (F-CV-1) — جست‌وجوی واژگان بین‌کتابی، کاملاً سمت کلاینت و آفلاین.
 *
 * تصمیم‌های قطعی محصول (مأموریت IMPLEMENTATION F-CV-1 §۲ و §۴):
 *  - واژگان اختصاصی هر کتاب مستقل می‌مانند؛ هیچ داده‌ای کپی/ادغام/تغییر نمی‌کند (بدون Migration).
 *  - عملکرد اصلی بدون هیچ درخواست شبکه‌ای به API/سرور — فقط dynamic import ماژول‌های سبک.
 *  - فقط ماژول‌های سبک هر کتاب بارگذاری می‌شوند: vocab + dictionary + irregular-verbs —
 *    هرگز BookData کامل (readings/quiz/grammar/conversations را نمی‌کشد).
 *  - جلوگیری از بارگذاری غیرضروری همه کتاب‌ها: دو موج —
 *    موج ۱ = شش کتاب مدرسه‌ای (۷ تا ۱۲) به‌ترتیب نزدیکی پایه به کتاب فعال؛
 *    موج ۲ = کالوکیشن‌ها و کتاب‌های Hill فقط اگر موج ۱ نتیجه‌ای نداشت.
 *  - ایندکس هر کتاب یک‌بار در عمر صفحه ساخته و در کش ماژولی می‌ماند → انتخاب‌های بعدی بی‌هزینه‌اند؛
 *    chunkهای JS توسط Service Worker کش می‌شوند → آفلاین هم پس از اولین بار در دسترس است.
 *  - normalize و قواعد صرفی، آینهٔ همان قواعد `word-lookup.tsx` کتاب فعال است (رفتار فعلی دست‌نخورده).
 *  - نگاشت فعل بی‌قاعده فقط از جدول verbs چاپی خود هر کتاب (نگاشت معتبر؛ بدون ریشه‌یابی حدسی).
 *  - هویت واژه = رشتهٔ نرمال‌شده در محدودهٔ کتاب (بدون id) — هم‌قرارداد با SRS فعلی (book, cardKey).
 *
 * این سرویس فقط «کتاب‌های دیگر» را می‌گردد؛ کتاب فعال را همیشه لایهٔ محلیِ پاپ‌آپ
 * (word-lookup.tsx → lookup) جواب می‌دهد — اولویت مطلق کتاب فعال دست‌نخورده می‌ماند.
 */

import type { BookId } from "../data/books/types";
import { BOOKS, getBookMeta } from "../data/books/registry";
import type { DictEntry, IrregularVerb, VocabEntry } from "../data/types";

// ─── انواع عمومی ───

/** یک نتیجهٔ بین‌کتابی — فقط نمایش؛ هیچ نوشتنی در استورهای یادگیری انجام نمی‌شود (§۷ مأموریت) */
export interface CrossBookHit {
  bookId: BookId;
  /** نام جلد کتاب، مثل «زبان انگلیسی دوازدهم» */
  bookTitle: string;
  emoji: string;
  gradeLabel: string;
  /** برچسب درس از دادهٔ خود کتاب، مثل «درس ۱» — برای مدخل جدول فعل بدون درس null است */
  lessonLabel: string | null;
  /** مدخل یافت‌شده (شکل چاپی/پایه) — شکل اصلی انتخاب دانش‌آموز در هدر پاپ‌آپ حفظ می‌شود */
  word: string;
  /** معنی فارسی — برای مدخل دیکشنری-محض خالی است (تعریف EN نمایش داده می‌شود) */
  meaning: string;
  pos?: string;
  phonetic?: string;
  /** تعریف EN-EN کتاب منبع، در صورت هم‌نشینی با واژه در دیکشنری همان کتاب */
  definition?: string;
  kind: "vocab" | "dict" | "verb";
  /** نمای مقصد برای «رفتن به منبع» — الگوی موجود setBook + requestView */
  view: "vocab" | "dict" | "verbs";
}

// ─── نزدیکی پایهٔ تحصیلی (تصمیم §۲-۵: منابع نزدیک‌تر اولویت دارند) ───

/** پایهٔ کتاب‌های مدرسه‌ای — کتاب‌های بدون پایه (کالوکیشن/Hill) در این جدول نیستند */
const GRADE_RANK: Partial<Record<BookId, number>> = {
  "grade-7": 7,
  "grade-8": 8,
  "grade-9": 9,
  "vision-one": 10,
  "grade-11": 11,
  "grade-12": 12,
};

/** ترتیب پایدار کتاب‌های بی‌پایه — همیشه بعد از کتاب‌های مدرسه‌ای */
const UNGRADED_ORDER: BookId[] = ["collocations", "hill-intro", "hill-elem", "hill-inter", "hill-adv"];

/** رتبهٔ نزدیکی: هرچه کمتر، نزدیک‌تر. کتاب‌های بی‌پایه همیشه بعد از مدرسه‌ای‌ها (۱۰۰+) */
export function proximityRank(active: BookId, other: BookId): number {
  const a = GRADE_RANK[active];
  const b = GRADE_RANK[other];
  if (a !== undefined && b !== undefined) return Math.abs(a - b);
  if (b === undefined) return 100 + Math.max(0, UNGRADED_ORDER.indexOf(other));
  // کتاب فعال بی‌پایه است → کتاب‌های مدرسه‌ای به‌ترتیب پایه (۷ → ۱۲)
  return 50 + b;
}

// ─── نرمال‌سازی و قواعد صرفی — آینهٔ word-lookup.tsx (کتاب فعال) ───

function normalize(raw: string): string {
  return raw
    .replace(/[’‘]/g, "'")
    .replace(/[^A-Za-z' \-]/g, "")
    .trim()
    .toLowerCase();
}

/** همان زنجیرهٔ ساده‌سازی صرفیِ `lookup()` کتاب فعال: 's ، ies ، es ، s ، ed ، ing */
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

// ─── ایندکس سبک هر کتاب + بارگذارهای تنبل (فقط ماژول‌های سبک) ───

interface BookLightIndex {
  /** واژهٔ نرمال‌شده → مدخل واژگان (اولین مدخل برنده — هم‌قرارداد buildMaps کتاب فعال) */
  vocab: Map<string, VocabEntry>;
  dict: Map<string, DictEntry>;
  /** فرم‌های صرفی بی‌قاعده (past/participle) → ردیف جدول فعل همان کتاب */
  verbByForm: Map<string, IrregularVerb>;
  /** برچسب درس‌ها — برای مدخل‌های دیکشنری که فقط شمارهٔ درس دارند */
  lessonLabels: Map<number, string>;
}

function buildIndex(vocabList: VocabEntry[], dictList: DictEntry[], verbs: IrregularVerb[], lessonLabels: { lesson: number; label: string }[]): BookLightIndex {
  const vocab = new Map<string, VocabEntry>();
  for (const v of vocabList) {
    const key = normalize(v.word);
    if (key && !vocab.has(key)) vocab.set(key, v);
  }
  const dict = new Map<string, DictEntry>();
  for (const d of dictList) {
    const key = normalize(d.word);
    if (key && !dict.has(key)) dict.set(key, d);
  }
  const verbByForm = new Map<string, IrregularVerb>();
  for (const vb of verbs) {
    for (const form of [vb.past, vb.participle]) {
      const key = normalize(form);
      if (key && !verbByForm.has(key)) verbByForm.set(key, vb);
    }
  }
  const labels = new Map<number, string>();
  for (const l of lessonLabels) labels.set(l.lesson, l.label);
  return { vocab, dict, verbByForm, lessonLabels: labels };
}

/** بارگذارهای سبک — هر کتاب فقط vocab/dictionary/irregular-verbs (هرگز index.ts کامل) */
const LIGHT_LOADERS: Partial<Record<BookId, () => Promise<BookLightIndex>>> = {
  "vision-one": async () => {
    const [v, d, w] = await Promise.all([
      import("../data/vision-one/vocab"),
      import("../data/vision-one/dictionary"),
      import("../data/vision-one/irregular-verbs"),
    ]);
    return buildIndex(v.ALL_VOCAB, d.DICTIONARY, w.IRREGULAR_VERBS, v.VOCAB_LESSONS);
  },
  "grade-7": async () => {
    const [v, d, w] = await Promise.all([
      import("../data/grade-7/vocab"),
      import("../data/grade-7/dictionary"),
      import("../data/grade-7/irregular-verbs"),
    ]);
    return buildIndex(v.ALL_VOCAB, d.DICTIONARY, w.IRREGULAR_VERBS, v.VOCAB_LESSONS);
  },
  "grade-8": async () => {
    const [v, d, w] = await Promise.all([
      import("../data/grade-8/vocab"),
      import("../data/grade-8/dictionary"),
      import("../data/grade-8/irregular-verbs"),
    ]);
    return buildIndex(v.ALL_VOCAB, d.DICTIONARY, w.IRREGULAR_VERBS, v.VOCAB_LESSONS);
  },
  "grade-9": async () => {
    const [v, d, w] = await Promise.all([
      import("../data/grade-9/vocab"),
      import("../data/grade-9/dictionary"),
      import("../data/grade-9/irregular-verbs"),
    ]);
    return buildIndex(v.ALL_VOCAB, d.DICTIONARY, w.IRREGULAR_VERBS, v.VOCAB_LESSONS);
  },
  "grade-11": async () => {
    const [v, d, w] = await Promise.all([
      import("../data/grade-11/vocab"),
      import("../data/grade-11/dictionary"),
      import("../data/grade-11/irregular-verbs"),
    ]);
    return buildIndex(v.ALL_VOCAB, d.DICTIONARY, w.IRREGULAR_VERBS, v.VOCAB_LESSONS);
  },
  "grade-12": async () => {
    const [v, d, w] = await Promise.all([
      import("../data/grade-12/vocab"),
      import("../data/grade-12/dictionary"),
      import("../data/grade-12/irregular-verbs"),
    ]);
    return buildIndex(v.ALL_VOCAB, d.DICTIONARY, w.IRREGULAR_VERBS, v.VOCAB_LESSONS);
  },
  // کتاب‌های بدون دیکشنری/جدول فعل — فقط واژگان (ساختار مستند در گزارش کشف §۱-۸)
  collocations: async () => {
    const v = await import("../data/collocations/vocab");
    return buildIndex(v.ALL_VOCAB, [], [], v.VOCAB_LESSONS);
  },
  "hill-intro": async () => {
    const v = await import("../data/hill-intro/vocab");
    return buildIndex(v.VOCAB_ALL, [], [], v.VOCAB_LESSONS);
  },
  "hill-elem": async () => {
    const v = await import("../data/hill-elem/vocab");
    return buildIndex(v.VOCAB_ALL, [], [], v.VOCAB_LESSONS);
  },
  "hill-inter": async () => {
    const v = await import("../data/hill-inter/vocab");
    return buildIndex(v.VOCAB_ALL, [], [], v.VOCAB_LESSONS);
  },
  "hill-adv": async () => {
    const v = await import("../data/hill-adv/vocab");
    return buildIndex(v.VOCAB_ALL, [], [], v.VOCAB_LESSONS);
  },
};

// ─── کش ماژولی ایندکس‌ها — هر کتاب حداکثر یک‌بار در عمر صفحه بارگذاری می‌شود ───

const indexCache = new Map<BookId, BookLightIndex>();
const pendingLoads = new Map<BookId, Promise<BookLightIndex | null>>();

/** شکست بارگذاری (مثلاً آفلاین و چانک هرگز دیده‌نشده) → null و تنزل بی‌صدا به رفتار فعلی */
function loadIndex(id: BookId): Promise<BookLightIndex | null> {
  const cached = indexCache.get(id);
  if (cached) return Promise.resolve(cached);
  const pending = pendingLoads.get(id);
  if (pending) return pending;
  const loader = LIGHT_LOADERS[id];
  const p = loader
    ? loader()
        .then((idx) => {
          indexCache.set(id, idx);
          return idx;
        })
        .catch(() => null)
    : Promise.resolve(null);
  pendingLoads.set(id, p);
  return p;
}

// ─── جمع‌آوری نتایج ───

/** سقف نتایج نمایشی — پاپ‌آپ شلوغ نشود (تصمیم UX §۶ مأموریت) */
export const CROSS_BOOK_MAX_HITS = 6;

function collectHits(norm: string, bookIds: BookId[]): CrossBookHit[] {
  const candidates = inflectionCandidates(norm);
  const hits: CrossBookHit[] = [];
  for (const id of bookIds) {
    const idx = indexCache.get(id);
    const meta = getBookMeta(id);
    if (!idx || !meta) continue;

    let row: CrossBookHit | null = null;
    for (const c of candidates) {
      if (!c) continue;

      // ① واژگان کتاب منبع — معنی فارسی چاپی + برچسب درس
      const v = idx.vocab.get(c);
      if (v) {
        const d = idx.dict.get(c);
        row = {
          bookId: id,
          bookTitle: meta.title,
          emoji: meta.emoji,
          gradeLabel: meta.gradeLabel,
          lessonLabel: v.lessonLabel,
          word: v.word,
          meaning: v.meaning,
          pos: v.pos,
          phonetic: d?.phonetic,
          definition: d?.definition,
          kind: "vocab",
          view: "vocab",
        };
        break;
      }

      // ② دیکشنری EN-EN کتاب منبع
      const d = idx.dict.get(c);
      if (d) {
        row = {
          bookId: id,
          bookTitle: meta.title,
          emoji: meta.emoji,
          gradeLabel: meta.gradeLabel,
          lessonLabel: idx.lessonLabels.get(d.lesson) ?? null,
          word: d.word,
          meaning: "",
          pos: d.pos,
          phonetic: d.phonetic,
          definition: d.definition,
          kind: "dict",
          view: "dict",
        };
        break;
      }

      // ③ نگاشت فعل بی‌قاعده — فقط از جدول چاپی خود کتاب (بدون حدس)
      const vb = idx.verbByForm.get(c);
      if (vb) {
        const base = normalize(vb.base);
        const bv = base ? idx.vocab.get(base) : undefined;
        if (bv) {
          row = {
            bookId: id,
            bookTitle: meta.title,
            emoji: meta.emoji,
            gradeLabel: meta.gradeLabel,
            lessonLabel: bv.lessonLabel,
            word: bv.word,
            meaning: bv.meaning,
            pos: bv.pos,
            kind: "vocab",
            view: "vocab",
          };
          break;
        }
        const bd = base ? idx.dict.get(base) : undefined;
        if (bd) {
          row = {
            bookId: id,
            bookTitle: meta.title,
            emoji: meta.emoji,
            gradeLabel: meta.gradeLabel,
            lessonLabel: idx.lessonLabels.get(bd.lesson) ?? null,
            word: bd.word,
            meaning: "",
            pos: bd.pos,
            phonetic: bd.phonetic,
            definition: bd.definition,
            kind: "dict",
            view: "dict",
          };
          break;
        }
        // پایه در واژگان/دیکشنری همان کتاب نبود — معنی خودِ ردیف جدول فعل (بدون درس)
        row = {
          bookId: id,
          bookTitle: meta.title,
          emoji: meta.emoji,
          gradeLabel: meta.gradeLabel,
          lessonLabel: null,
          word: vb.base,
          meaning: vb.meaning,
          kind: "verb",
          view: "verbs",
        };
        break;
      }
    }
    if (row) hits.push(row);
  }
  // ترتیب ورود = ترتیب bookIds = نزدیکی پایه به کتاب فعال (wave1 از پیش مرتب است؛ sort پایدار)
  return hits.slice(0, CROSS_BOOK_MAX_HITS);
}

// ─── API اصلی ───

const GRADED_IDS: BookId[] = ["grade-7", "grade-8", "grade-9", "vision-one", "grade-11", "grade-12"];

/**
 * جست‌وجوی بین‌کتابی یک واژهٔ نرمال‌شدهٔ miss‌شده در کتاب فعال.
 * کتاب فعال همیشه حذف می‌شود (لایهٔ محلی جوابش را می‌دهد — تصمیم §۲-۱۲).
 * خروجی مرتب بر اساس نزدیکی پایه؛ در نبود شبکه/چانک، آرایهٔ خالی (رفتار فعلی پاپ‌آپ حفظ).
 */
export async function lookupCrossBook(activeBookId: BookId, rawNorm: string): Promise<CrossBookHit[]> {
  const norm = normalize(rawNorm);
  if (!norm || norm.length < 2) return [];

  // موج ۱ — کتاب‌های مدرسه‌ای به‌ترتیب نزدیکی پایه
  const wave1 = GRADED_IDS.filter((id) => id !== activeBookId).sort(
    (x, y) => proximityRank(activeBookId, x) - proximityRank(activeBookId, y),
  );
  await Promise.all(wave1.map(loadIndex));
  const wave1Hits = collectHits(norm, wave1);
  if (wave1Hits.length > 0) return wave1Hits;

  // موج ۲ — کالوکیشن‌ها و کتاب‌های داستانی؛ فقط وقتی مدرسه‌ای‌ها نتیجه‌ای نداشتند
  const wave2 = UNGRADED_ORDER.filter((id) => id !== activeBookId);
  await Promise.all(wave2.map(loadIndex));
  return collectHits(norm, wave2);
}

/** شمارش ایندکس‌های آماده (تشخیصی/QA — وضعیت بارگذاری تدریجی را نشان می‌دهد) */
export function loadedIndexCount(): number {
  return indexCache.size;
}

/** فهرست متادیتای همهٔ کتاب‌ها (برای QA) */
export function allBookMetas() {
  return BOOKS;
}
