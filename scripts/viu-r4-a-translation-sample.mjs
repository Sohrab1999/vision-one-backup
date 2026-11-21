// R4-a طرح نمونه‌گیری آماری — تضمین کیفیت ترجمه (FA-NEW → سنجش رسمی)
// نقشه راه: «نقشه راه ها/نقشه-راه-کیفیت-استخراج-سه-کتاب-VIU-2026-11-16.md» § فاز R4
// استراتیفای: per-book × per-lesson-band × طول معنی · n≈۳۸۴ برای ±۵٪ در ۹۵٪ (کل ۸٬۸۷۰)
// صفر ساختگی: جمعیت عین src/data/viu-{elem,preint,upper}/vocab.ts (VOCAB_ALL)
// Reproducible: PRNG mulberry32 · seed ثابت 20261119 · بدون جایگذاری در هر استراتوم
import { VOCAB_ALL as ELEM } from "../src/data/viu-elem/vocab.ts";
import { VOCAB_ALL as PREINT } from "../src/data/viu-preint/vocab.ts";
import { VOCAB_ALL as UPPER } from "../src/data/viu-upper/vocab.ts";
import { writeFileSync, mkdirSync } from "node:fs";

const SEED = 20261119;
const TARGET_N = 384;

// ---------- PRNG (mulberry32) — reproducible ----------
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(SEED);
function shuffle(arr) { // Fisher-Yates با PRNG seedable — بدون جایگذاری، انتخاب k اول
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ---------- استراتوم‌ها ----------
const LENGTH_BANDS = [
  { id: "short",  label: "کوتاه (≤۱۲ حرف)",        test: (n) => n <= 12 },
  { id: "medium", label: "متوسط (۱۳-۳۵ حرف)",      test: (n) => n >= 13 && n <= 35 },
  { id: "long",   label: "بلوند (≥۳۶ حرف)",        test: (n) => n >= 36 },
];
function lessonBand(lesson) { // بست‌های ۱۰درسی؛ درس 0 (مرور پایه) band مستقل
  if (lesson === 0) return "L00-review";
  const start = Math.floor((lesson - 1) / 10) * 10 + 1;
  const end = start + 9;
  return `L${String(start).padStart(2, "0")}-${String(end).padStart(2, "0")}`;
}

const BOOKS = [
  { book: "elem",   rows: ELEM,   source: "src/data/viu-elem/vocab.ts" },
  { book: "preint", rows: PREINT, source: "src/data/viu-preint/vocab.ts" },
  { book: "upper",  rows: UPPER,  source: "src/data/viu-upper/vocab.ts" },
];

// ---------- ساخت جمعیت استراتیفای‌شده ----------
const strata = new Map(); // key -> { book, lessonBand, lengthBand, items: [] }
const population = {};
let totalRows = 0;

for (const { book, rows, source } of BOOKS) {
  population[book] = rows.length;
  totalRows += rows.length;
  rows.forEach((r, idx) => {
    const meaning = r.meaning ?? "";
    const charLen = meaning.replace(/\s+/g, "").length;
    const lb = LENGTH_BANDS.find((b) => b.test(charLen));
    if (!lb) throw new Error(`no length band for: ${JSON.stringify({ book, word: r.word, charLen })}`);
    const key = `${book}||${lessonBand(r.lesson)}||${lb.id}`;
    if (!strata.has(key)) strata.set(key, { book, lessonBand: lessonBand(r.lesson), lengthBand: lb.id, items: [] });
    strata.get(key).items.push({
      idx, source, lesson: r.lesson, lessonLabel: r.lessonLabel ?? "",
      word: r.word, pos: r.pos ?? "", meaning, charLen,
    });
  });
}

// ---------- تخصیص متناسب n≈۳۸۴ ----------
const keys = [...strata.keys()].sort();
const alloc = {};
let allocated = 0;
for (const k of keys) {
  const n = Math.max(1, Math.round((strata.get(k).items.length * TARGET_N) / totalRows));
  alloc[k] = n; allocated += n;
}

// ---------- انتخاب بدون جایگذاری + id پایدار ----------
let seq = 0;
const sample = [];
for (const k of keys) {
  const st = strata.get(k);
  const take = Math.min(alloc[k], st.items.length);
  const shuffled = shuffle(st.items.map((_, i) => i));
  for (const i of shuffled.slice(0, take)) {
    const it = st.items[i];
    sample.push({
      id: `R4A-${String(++seq).padStart(3, "0")}`,
      book: st.book, source: it.source, lesson: it.lesson, lessonLabel: it.lessonLabel,
      word: it.word, pos: it.pos, meaning: it.meaning, charLen: it.charLen,
      lessonBand: st.lessonBand, lengthBand: st.lengthBand,
    });
  }
}

// ---------- خروجی ----------
const strataTable = keys.map((k) => ({
  stratum: k, book: strata.get(k).book, lessonBand: strata.get(k).lessonBand,
  lengthBand: strata.get(k).lengthBand, population: strata.get(k).items.length,
  sampled: Math.min(alloc[k], strata.get(k).items.length),
}));

const out = {
  meta: {
    phase: "R4-a",
    mandate: "فرمان مالک «برو سراغ فاز بعدی» (trace 1a1f53d7924ae381) — فاز بعدی نقشه راه کیفیت VIU",
    date: "2026-11-19",
    seed: SEED,
    prng: "mulberry32(seed) — Fisher-Yates — بدون جایگذاری",
    targetN: TARGET_N,
    actualN: sample.length,
    population,
    populationTotal: totalRows,
    method: "استراتیفای سه‌بعدی: per-book × per-lesson-band (بست‌های ۱۰درسی + L00-review) × طول معنی (سه بست ثابت) — تخصیص متناسب با سهم استراتوم",
    lengthBandDef: { short: "≤۱۲ حرف (بدون whitespace)", medium: "۱۳-۳۵ حرف", long: "≥۳۶ حرف" },
    lessonBandDef: "درس 0 = L00-review؛ بقیه: بست‌های ۱۰درسی L01-10 … L91-100",
    classNote: "تمام meaningهای VIU = کلاس FA-NEW (ترجمهٔ ماشینی GLM — header فایل‌های vocab) — این نمونه برای سنجش رسمی است؛ کلاس FA-REVIEWED فقط با بازخوانی انسانی (R4-b) اعطا می‌شود",
  },
  strata: strataTable,
  sample,
};

const outPath = "docs/qa/viu-r4a-translation-sample-2026-11-19.json";
mkdirSync("docs/qa", { recursive: true });
writeFileSync(outPath, JSON.stringify(out, null, 2) + "\n", "utf8");

console.log(`population: elem=${population.elem} preint=${population.preint} upper=${population.upper} total=${totalRows}`);
console.log(`strata: ${keys.length} · sampled: ${sample.length} (target ${TARGET_N})`);
console.log(`written: ${outPath}`);
