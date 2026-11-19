// R5 — بازآرایی نمایشی بدون تغییر داده (دروازهٔ فرمان مالک «نقشه راه رو ادامه بده» — trace 1a1f583eda56aa41 — ۱۴۰۵/۸/۲۹ / ۲۰۲۶-۱۱-۱۹)
// اثبات مکانیکی چهار قلم R5 (عین نقشه-راه-کیفیت §بخش ۳ فاز R5) — صفر تغییر داده؛ فقط سنجش:
//  R5-1 کلید گروهی تمرین در نمایش گروهی (یافتهٔ ۲-۲ الف — کاهش بلوغ per-item)
//  R5-2 تصمیم grammarTopics = پنهان در مسیرهای UI (یافتهٔ ۲-۴ — فیلد مردهٔ ChapterMeta)
//  R5-3 مستندسازی تنوع گزینه در قرارداد QuizQuestionSeed (یافتهٔ ۲-۳ ب + جدول ۲-۳)
//  R5-4 راستی‌آزمایی attribution منابع (O4 — بخش «منابع» فوتر)
// اجرا: bun scripts/viu-r5-display-reorg.mjs
import { READING_LIST as ELEM_READINGS } from "../src/data/viu-elem/readings.ts";
import { READING_LIST as PREINT_READINGS } from "../src/data/viu-preint/readings.ts";
import { READING_LIST as UPPER_READINGS } from "../src/data/viu-upper/readings.ts";
import { VIU_ELEMENTARY_BOOK } from "../src/data/viu-elem/index.ts";
import { VIU_PREINT_BOOK } from "../src/data/viu-preint/index.ts";
import { VIU_UPPER_BOOK } from "../src/data/viu-upper/index.ts";
import { CHAPTERS as ELEM_CH } from "../src/data/viu-elem/book-meta.ts";
import { CHAPTERS as PREINT_CH } from "../src/data/viu-preint/book-meta.ts";
import { CHAPTERS as UPPER_CH } from "../src/data/viu-upper/book-meta.ts";

const norm = (s) => (s ?? "").trim();
const groupKeyOf = (it) => (norm(it?.answerEn) ? `${norm(it.answerEn)}\u0000${norm(it.answerFa)}` : "");

/** عین الگوریتم buildKeySegments در texts-view.tsx — برای اثبات هم‌ارزی نمایش و سنجش */
function scanGroupKeys(readings) {
  let items = 0, withKey = 0, groups = 0, extraRepeats = 0, groupedItems = 0;
  let largest = null;
  for (const r of readings) {
    const its = r?.exercise?.items ?? [];
    items += its.length;
    let i = 0;
    while (i < its.length) {
      const k = groupKeyOf(its[i]);
      if (!k) { i++; continue; }
      withKey++;
      let j = i + 1;
      while (j < its.length && groupKeyOf(its[j]) === k) j++;
      if (j - i >= 2) {
        groups++; groupedItems += (j - i); extraRepeats += (j - i) - 1;
        if (!largest || (j - i) > largest.runLen) largest = { readingId: r.id, lesson: r.lesson, runLen: j - i, answerEn: k.split("\u0000")[0].slice(0, 90) };
      }
      i = j;
    }
  }
  return { items, withKey, groups, groupedItems, extraRepeats, largest };
}

function scanQuiz(book) {
  const dist = { "2": 0, "3": 0, "4": 0, "5": 0 };
  let total = 0, badIdx = 0, nonGap = 0, emptyOption = 0, dupCaseVariant = 0;
  for (const q of book.quiz.seed) {
    total++;
    const n = q.options.length;
    dist[String(Math.min(n, 5))] = (dist[String(Math.min(n, 5))] ?? 0) + 1;
    if (q.answer < 0 || q.answer >= n) badIdx++;
    if (!q.text.includes("________")) nonGap++;
    const seen = new Set();
    for (const o of q.options) {
      if (!norm(o)) emptyOption++;
      const lower = norm(o).toLowerCase();
      if (seen.has(lower)) dupCaseVariant++;
      seen.add(lower);
    }
  }
  return { total, dist, badIdx, nonGap, emptyOption, dupCaseVariant };
}

function scanChapters(chapters) {
  let empty = 0, filled = 0;
  for (const c of chapters) (c.grammarTopics?.length ? filled++ : empty++);
  return { chapters: chapters.length, emptyGrammarTopics: empty, filledGrammarTopics: filled };
}

const books = [
  { id: "viu-elem", readings: ELEM_READINGS, book: VIU_ELEMENTARY_BOOK, chapters: ELEM_CH },
  { id: "viu-preint", readings: PREINT_READINGS, book: VIU_PREINT_BOOK, chapters: PREINT_CH },
  { id: "viu-upper", readings: UPPER_READINGS, book: VIU_UPPER_BOOK, chapters: UPPER_CH },
];

const perBook = {};
let tot = { items: 0, withKey: 0, groups: 0, groupedItems: 0, extraRepeats: 0 };
for (const b of books) {
  const g = scanGroupKeys(b.readings);
  const q = scanQuiz(b.book);
  const c = scanChapters(b.chapters);
  perBook[b.id] = { R5_1_groupKeys: g, R5_3_quizContract: q, R5_2_grammarTopics: c };
  tot.items += g.items; tot.withKey += g.withKey; tot.groups += g.groups;
  tot.groupedItems += g.groupedItems; tot.extraRepeats += g.extraRepeats;
}

// R5-4 — attribution بخش «منابع» فوتر (O4): سه کتاب VIU + Word Atlas + افشای ترجمه
const footerSrc = await Bun.file("src/components/book/app-footer.tsx").text();
const attribution = {
  resourcesSectionPresent: footerSrc.includes("بخش «منابع»"),
  viuIsbnCount: (footerSrc.match(/ISBN/g) ?? []).length,
  wordAtlasCcBy: footerSrc.includes("CC BY 4.0"),
  faTranslationDisclosure: footerSrc.includes("ترجمه‌های فارسی تولیدی هستند"),
  standingRule: "هر افزودنی آینده با منبع جدید ⇒ به‌روزرسانی اجباری همین بخش «منابع» (قاعدهٔ ماندگار R5-4)",
};

const report = {
  generated: new Date().toISOString().replace("T", " ").slice(0, 19) + " UTC",
  gate: "R5 — بازآرایی نمایشی بدون تغییر داده — فرمان مالک «نقشه راه رو ادامه بده» (trace 1a1f583eda56aa41)",
  method: "سنجش مکانیکی روی دادهٔ tracked — عین الگوریتم buildKeySegments نمایشی — صفر تغییر داده",
  totals: {
    ...tot,
    auditNote: "یافتهٔ ممیزی ۲-۲ الف: ۲٬۹۶۵ آیتم کلید گروهی تکراری (۵۷٪) — سنجش امروز = بلوک‌های پشت‌سرهم ≥۲ آیتم؛ تفاوت تعریف (بلوک vs هر تکرار داخل ریدینگ) صادقانه ثبت شد",
  },
  perBook,
  R5_2_decision: {
    decision: "پنهان در مسیرهای UI (بدون تغییر داده)",
    rationale: "پرکردن از سرصفحهٔ درس = تغییر داده ⇒ مستلزم دروازهٔ مستقل مالک + منبع چاپی (O1/O4) — خارج از دامنهٔ «بدون تغییر دادهٔ R5»",
    uiPathsFixed: ["contents-view.tsx: بج‌های خالی + متریک «۰ گرامر»", "chapter-view.tsx: متن توصیفی خالی کارت گرامر → fallback صادقانه"],
    zeroSideEffect: "کتاب‌های با grammarTopics پر (vision-one/grade-*) بایت‌به‌بیت رفتار قبلی",
  },
  R5_4_attribution: attribution,
};

const out = "docs/qa/viu-r5-display-reorg-2026-11-19.json";
await Bun.write(out, JSON.stringify(report, null, 2) + "\n");
console.log("== R5 DISPLAY REORG EVIDENCE ==");
for (const b of books) {
  const p = perBook[b.id];
  console.log(`${b.id}: items=${p.R5_1_groupKeys.items} withKey=${p.R5_1_groupKeys.withKey} groups=${p.R5_1_groupKeys.groups} extraRepeats=${p.R5_1_groupKeys.extraRepeats} | quiz dist=${JSON.stringify(p.R5_3_quizContract.dist)} badIdx=${p.R5_3_quizContract.badIdx} nonGap=${p.R5_3_quizContract.nonGap} | grammarTopics empty=${p.R5_2_grammarTopics.emptyGrammarTopics}/${p.R5_2_grammarTopics.chapters}`);
}
console.log(`TOTAL: groups=${tot.groups} extraRepeats=${tot.extraRepeats} | attribution ISBNs=${attribution.viuIsbnCount} atlas=${attribution.wordAtlasCcBy}`);
console.log("JSON:", out);
