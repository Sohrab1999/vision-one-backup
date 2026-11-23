// VIU Advanced (AVU-3) — Phase A5 build: src/data/viu-advanced/ from the A2/A3/A4 capture artifacts.
//
// Owner gate: G5 authorized by owner ("مجاز هستی" — trace session 2026-11-22) per the registered
// roadmap «نقشه-راه-استخراج-باکیفیت-Advanced-Vocabulary-in-Use-ویرایش-سوم-2026-11-20.md» فاز A5.
//
// Registered policies applied (docs/qa/viu-adv-g3-gate-report-2026-11-21.md §۴ رأی‌نامهٔ ۶بندی):
//   ① Quiz pool = keyed exercises ONLY — 42 print-keyless stay honestly key-less (labelled in fa) — zero fabricated answers.
//   ② Matching letter sequences → multiple-choice from the exercise's OWN printed letter columns (no guessing);
//      inline sequence (3.1) parsed mechanically; two-part duplicateNumbers exercises whose columns are not
//      mechanically identifiable stay verbatim in the reading layer (golden rule: nothing is forced).
//   ③ Possible-answers rows≠items exercises → ALL printed rows preserved verbatim as a labelled key listing
//      («پاسخ‌های ممکن») in the reading layer — no per-item mapping is claimed.
//   ⑤ U+E022 stays verbatim in evidence; none enters runtime data (Index is evidence-only — see report).
//   A4 population note: quiz items/options/answers have NO Persian (three-book quiz contract);
//   instructions/titles/prose/margins/mini-dict meanings carry FA-NEW (GLM machine translation — coverage ≠ correctness).
//
// Data mapping (registered runtimeMapping in every capture unit):
//   VocabWord  ← leftPage.miniDict (word←headword · meaning←A4 d-segment · pos omitted — not printed)
//   QuizQuestionSeed ← rightPage.exercises convertible classes (M/B/F below; answer = عین Answer key چاپی)
//   Reading    ← leftPage prose + margin glosses + non-convertible exercises verbatim with printed key
//   ChapterMeta ← leftPage.title
//   DICTIONARY ← miniDict entries (printed gloss definitions) + IPA from Index where cleanly matched
//                (Index itself has NO printed definitions → stays evidence-only; honest limitation recorded)
//
// Distractor policy (viu-upper phase-5 precedent — «فریب‌دهنده‌ها فقط از واژگان همان درس/تمرین»):
//   F-class options = the printed answer + sibling printed answers of the SAME exercise (then same unit) —
//   nothing invented; every distractor is itself a printed key word of this book.
//
// Deterministic build: no randomness anywhere — byte-stable output.

import { writeFileSync, mkdirSync, readFileSync } from 'node:fs';

const CAP = 'docs/qa/viu-adv-capture';
const OUT = 'src/data/viu-advanced';
const TOTAL_UNITS = 101;
const PART_SIZE = 20; // 6 parts: 20×5 + 1
const COLORS = ['emerald', 'amber', 'teal', 'violet', 'orange', 'rose'];

const pad3 = (n) => String(n).padStart(3, '0');
const readJson = (p) => JSON.parse(readFileSync(p, 'utf8'));

function esc(s) {
  return String(s).replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}
// JSON-ish string literal for TS output (single-quoted strings could clash with apostrophes — use double quotes with escapes)
function tsStr(s) {
  return JSON.stringify(String(s));
}

const faCache = readJson(`${CAP}/fa-cache.json`).segments;
const indexEntries = readJson(`${CAP}/index.json`).entries;

// ── normalized headword → first Index IPA without U+E022 ────────────────────
const norm = (s) => String(s ?? '').trim().toLowerCase().replace(/\s+/g, ' ');
const ipaByWord = new Map();
for (const e of indexEntries) {
  if (!e.ipa || typeof e.ipa !== 'string') continue;
  if (e.ipa.includes('\uE022')) continue; // U+E022 — verbatim queue only, never enters runtime (vote ⑤)
  const k = norm(e.headword);
  if (!ipaByWord.has(k)) ipaByWord.set(k, e.ipa);
}

const units = [];
for (let n = 1; n <= TOTAL_UNITS; n++) units.push(readJson(`${CAP}/unit-${pad3(n)}.json`));

// ── conversion classes ───────────────────────────────────────────────────────
// returns { cls: 'M'|'B'|'F', quiz: [...seed rows] } or null (→ reading layer)
function convertExercise(unitNo, ex, unitPool) {
  const rows = ((ex.keyed || {}).rows || []).slice().sort((a, b) => a.n - b.n);
  const items = (ex.items || []).slice().sort((a, b) => a.n - b.n);
  const no = ex.no;

  // ── CLASS M — matching from printed letter columns ──
  const letterOf = (t) => {
    const m = /____\s*([a-z])(?![a-z])/.exec(t);
    return m ? m[1] : null;
  };
  if (items.length >= 2 && rows.length === items.length) {
    const allLetters = items.every((it) => letterOf(it.text));
    const oneToOne = rows.every((r) => typeof r.letter === 'string' && r.letter.length === 1);
    const bijectiveN = new Set(rows.map((r) => r.n)).size === rows.length && new Set(items.map((it) => it.n)).size === items.length;
    if (allLetters && oneToOne && bijectiveN) {
      const letters = [...new Set(items.map((it) => letterOf(it.text)))].sort();
      if (letters.length === items.length && rows.every((r) => letters.includes(r.letter))) {
        const entryByLetter = new Map();
        for (const it of items) {
          const m = /____\s*([a-z])(?![a-z])\s*(.*)$/s.exec(it.text);
          const entry = (m[2] || '').trim();
          entryByLetter.set(letterOf(it.text), entry);
        }
        const options = letters.map((l) => entryByLetter.get(l));
        if (options.every((o) => o && o.length > 0)) {
          const quiz = items.map((it, idx) => {
            const left = it.text.split(/____/)[0].trim();
            const letter = rows[idx].letter;
            return {
              category: 'vocabulary',
              lesson: unitNo,
              scope: `درس ${unitNo} — تمرین ${no}`,
              text: `${left} ________`,
              options,
              answer: letters.indexOf(letter),
              level: 'استاندارد',
              explanation: `پاسخ عین Answer key چاپی کتاب — واحد ${unitNo}، تمرین ${no}.`,
            };
          });
          return { cls: 'M', quiz };
        }
      }
    }
    // inline sequence (single row «1 c 2 h 3 a …») — registered A3 pattern (3.1)
    if (rows.length === 1 && allLetters && items.every((it) => it.blankCount === 1)) {
      const seq = [...rows[0].text.matchAll(/(\d{1,2})\s+([a-z])(?![a-z])/g)];
      if (seq.length === items.length) {
        const letters = [...new Set(items.map((it) => letterOf(it.text)))].sort();
        if (letters.length === items.length) {
          const entryByLetter = new Map();
          for (const it of items) {
            const m = /____\s*([a-z])(?![a-z])\s*(.*)$/s.exec(it.text);
            entryByLetter.set(letterOf(it.text), (m[2] || '').trim());
          }
          const options = letters.map((l) => entryByLetter.get(l));
          const numByItemN = new Map(seq.map((m) => [Number(m[1]), m[2]]));
          const allMapped = items.every((it) => numByItemN.has(it.n) && letters.includes(numByItemN.get(it.n)));
          if (options.every((o) => o && o.length > 0) && allMapped) {
            const quiz = items.map((it) => {
              const left = it.text.split(/____/)[0].trim();
              return {
                category: 'vocabulary',
                lesson: unitNo,
                scope: `درس ${unitNo} — تمرین ${no}`,
                text: `${left} ________`,
                options,
                answer: letters.indexOf(numByItemN.get(it.n)),
                level: 'استاندارد',
                explanation: `پاسخ عین Answer key چاپی کتاب — واحد ${unitNo}، تمرین ${no} (توالی تطبیقی چاپی).`,
              };
            });
            return { cls: 'M', quiz };
          }
        }
      }
    }
  }

  // ── CLASS B — printed word box → options = printed bank tokens ──
  if (ex.bank && Array.isArray(ex.bank) && typeof ex.bank[0] === 'string' && items.length >= 2) {
    const tokens = [...new Set(ex.bank[0].split(/\s+/).map((t) => t.trim()).filter(Boolean))];
    const rowsEq = rows.length === items.length && new Set(rows.map((r) => r.n)).size === rows.length;
    const blanks = items.every((it) => it.blankCount === 1);
    const inBank = rowsEq && rows.every((r) => !r.letter && tokens.includes(r.text));
    if (blanks && inBank) {
      const quiz = items.map((it) => {
        const text = it.text.replace(/_{2,}/g, '________');
        return {
          category: 'vocabulary',
          lesson: unitNo,
          scope: `درس ${unitNo} — تمرین ${no}`,
          text,
          options: tokens,
          answer: tokens.indexOf(rows.find((r) => r.n === it.n).text),
          level: 'استاندارد',
          explanation: `پاسخ عین Answer key چاپی کتاب — واحد ${unitNo}، تمرین ${no} (گزینه‌ها عین جدول واژگان چاپی تمرین).`,
        };
      });
      return { cls: 'B', quiz };
    }
  }

  // ── CLASS F — keyed single-word answers → options = answer + sibling printed answers ──
  const singleWord = (t) => /^[A-Za-z][A-Za-z'’\- ]*$/.test(String(t ?? '').trim());
  const rowsEq = rows.length === items.length && new Set(rows.map((r) => r.n)).size === rows.length && rows.length >= 2;
  const shifted =
    items.length >= 3 &&
    rows.length === items.length - 1 &&
    rows.every((r, i) => r.n === i + 2) &&
    !rows.some((r) => r.letter);
  if ((rowsEq || shifted) && items.every((it) => it.blankCount === 1) && !items.some((it) => it.n === null)) {
    const pairs = shifted
      ? items.filter((it) => it.n >= 2).map((it) => ({ it, row: rows[it.n - 2] }))
      : items.map((it) => ({ it, row: rows[it.n - 1] }));
    if (pairs.length >= 2 && pairs.every((p) => p.row && !p.row.letter && singleWord(p.row.text))) {
      const answers = pairs.map((p) => p.row.text.trim());
      const answerSet = new Set(answers.map(norm));
      const pool = unitPool.filter((w) => !answerSet.has(norm(w)));
      const quiz = pairs.map((p, idx) => {
        const answer = p.row.text.trim();
        const sibs = [];
        for (let k = 1; k <= answers.length && sibs.length < 3; k++) {
          const cand = answers[(idx + k) % answers.length];
          if (norm(cand) !== norm(answer) && !sibs.some((s) => norm(s) === norm(cand))) sibs.push(cand);
        }
        for (const cand of pool) {
          if (sibs.length >= 3) break;
          if (norm(cand) !== norm(answer) && !sibs.some((s) => norm(s) === norm(cand))) sibs.push(cand);
        }
        const options = [answer, ...sibs];
        const rot = p.it.n % options.length;
        const rotated = options.slice(rot).concat(options.slice(0, rot));
        return {
          category: 'vocabulary',
          lesson: unitNo,
          scope: `درس ${unitNo} — تمرین ${no}`,
          text: p.it.text.replace(/_{2,}/g, '________'),
          options: rotated,
          answer: rotated.findIndex((o) => norm(o) === norm(answer)),
          level: 'استاندارد',
          explanation: `پاسخ عین Answer key چاپی کتاب — واحد ${unitNo}، تمرین ${no} (گزینه‌های انحرافی از کلید همان تمرین/درس).`,
        };
      });
      return { cls: 'F', quiz, shiftedExample: shifted ? items.find((it) => it.n === 1) : null };
    }
  }
  return null;
}

// ── build all units ──────────────────────────────────────────────────────────
const report = {
  generatedBy: 'scripts/viu-adv-a5-build.mjs (A5-1)',
  policy: 'G3 vote ①+②+③ + golden rule — zero fabricated answers; convert-only-what-converts',
  units: TOTAL_UNITS,
  counts: { quizQuestions: 0, clsM: 0, clsB: 0, clsF: 0, clsFshifted: 0, readingExercises: 0, printKeyless: 0, readingItems: 0, keyListings: 0, vocab: 0, dictionary: 0, proseParagraphs: 0, marginNotes: 0 },
  perClassExamples: { M: [], B: [], F: [] },
  notConvertible: [],
};

const perUnit = [];
for (let n = 1; n <= 101; n++) {
  const u = units[n - 1];
  const left = u.leftPage;
  const right = u.rightPage || {};
  const titleFa = faCache[`t-${n}`]?.fa ?? '';
  const printed = u.provenance.printedPages;

  // F unit pool — single-word answers from this unit's F-class exercises (distractor pool)
  const unitPool = [];
  for (const ex of right.exercises || []) {
    const rows = ((ex.keyed || {}).rows || []).slice().sort((a, b) => a.n - b.n);
    for (const r of rows) if (!r.letter && /^[A-Za-z][A-Za-z'’\- ]*$/.test(r.text.trim())) unitPool.push(r.text.trim());
  }
  unitPool.splice(0, unitPool.length, ...[...new Set(unitPool.map(norm))].map((k) => unitPool.find((w) => norm(w) === k)));

  const quiz = [];
  const exerciseItems = []; // reading-layer items — pushed in exercise order (items + key listings + model answers)
  const instructions = []; // {no, en, fa, keyless}
  const prose = []; // {en, fa}
  const margins = []; // {en, fa}
  const vocabRows = [];

  // prose + margins (left page)
  for (const s of left.sections || []) {
    for (const b of s.blocks || []) {
      if (b.kind !== 'paragraph') continue;
      const seg = faCache[`p-${n}-${s.letter}-${b.y}`];
      prose.push({ en: b.text, fa: seg?.fa ?? '' });
    }
    for (const mn of s.marginNotes || []) {
      const seg = faCache[`m-${n}-${s.letter}-${mn.y}`];
      margins.push({ en: mn.text, fa: seg?.fa ?? '' });
    }
  }

  // mini-dict → vocab + dictionary
  for (const md of left.miniDict || []) {
    const seg = faCache[`d-${n}-${md.n}`];
    vocabRows.push({ word: md.headword, meaning: seg?.fa ?? '', lesson: n, lessonLabel: `درس ${n} — ${titleFa}` });
  }

  // exercises — sorted by printed number (two-column capture order is y-based)
  const exercises = (right.exercises || [])
    .slice()
    .sort((a, b) => {
      const [au, an] = String(a.no).split('.').map(Number);
      const [bu, bn] = String(b.no).split('.').map(Number);
      return au - bu || an - bn;
    });
  for (const ex of exercises) {
    const rows = ((ex.keyed || {}).rows || []).slice().sort((a, b) => a.n - b.n);
    const items = (ex.items || []).slice().sort((a, b) => a.n - b.n);
    const extras = (ex.keyed || {}).extras || [];
    const iSeg = faCache[`i-${n}-${ex.no}`];
    const conv = convertExercise(n, ex, unitPool);
    if (conv) {
      quiz.push(...conv.quiz);
      report.counts[`cls${conv.cls}`]++;
      if (conv.cls === 'F' && conv.shiftedExample) {
        // worked example item (solved in the printed book) → reading layer, honest label
        readingItems.push({ en: `1 ${conv.shiftedExample.text}`, fa: 'مثال حل‌شدهٔ چاپی — پاسخ در خود کتاب', answerEn: '', answerFa: '' });
        report.counts.clsFshifted++;
      }
      if (report.perClassExamples[conv.cls].length < 3) report.perClassExamples[conv.cls].push(`${ex.no}`);
      continue;
    }
    // ── non-convertible → honest reading layer ──
    const instructionOnly = ex.kind === 'instruction' && items.length === 0 && rows.length === 0;
    const printKeyless = instructionOnly && !ex.keyed; // a3: keyed=null — 42 exercises, honest no-key label
    if (printKeyless) report.counts.printKeyless++;
    instructions.push({ no: ex.no, en: iSeg?.en ?? ex.instruction ?? '', fa: iSeg?.fa ?? '', keyless: printKeyless });
    if (instructionOnly) {
      if (!printKeyless) {
        // keyed instruction-only (34 = 27 model-answer notes + 7 key tables) → printed key as a reveal item of THIS exercise
        const noteText = extras.filter((e) => e.kind === 'note').map((e) => e.text).join(' ').trim();
        const tableText = extras.filter((e) => e.kind !== 'note').map((e) => e.text).join(' | ').trim();
        const keyText = [tableText, noteText].filter(Boolean).join(' | ');
        if (keyText) {
          exerciseItems.push({ en: `${ex.no} printed key`, fa: 'کلید چاپی این تمرین (پاسخ نمونه/جدول)', answerEn: keyText, answerFa: '' });
          report.counts.keyListings++;
        }
      }
    } else if (items.length > 0 && rows.length > 0 && items.length === rows.length && new Set(rows.map((r) => r.n)).size === rows.length && !rows.some((r) => r.letter)) {
      // rows==items 1:1 — safe per-item verbatim answers
      for (const it of items) {
        const row = rows.find((r) => r.n === it.n);
        exerciseItems.push({ en: `${it.n} ${it.text}`, fa: '', answerEn: row?.text ?? '', answerFa: '' });
      }
      report.counts.readingItems += items.length;
    } else if (items.length > 0) {
      // items without a safe 1:1 key mapping — items verbatim, then ALL printed rows as a labelled listing (G3 vote ③)
      for (const it of items) exerciseItems.push({ en: `${it.n} ${it.text}`, fa: '', answerEn: '', answerFa: '' });
      report.counts.readingItems += items.length;
      if (rows.length > 0) {
        exerciseItems.push({
          en: `${ex.no} printed key (${rows.length} row${rows.length > 1 ? 's' : ''})`,
          fa: 'کلید چاپی کامل این تمرین — نگاشت تک‌به‌تک مکانیکی نداشت',
          answerEn: rows.map((r) => r.text).join(' | '),
          answerFa: '',
        });
        report.counts.keyListings++;
      }
    } else if (rows.length > 0) {
      exerciseItems.push({
        en: `${ex.no} printed key (${rows.length} row${rows.length > 1 ? 's' : ''})`,
        fa: 'کلید چاپی کامل این تمرین — نگاشت تک‌به‌تک مکانیکی نداشت',
        answerEn: rows.map((r) => r.text).join(' | '),
        answerFa: '',
      });
      report.counts.keyListings++;
    } else {
      // items-only without key (personal answers type) — items verbatim, honest absence
      for (const it of items) exerciseItems.push({ en: `${it.n} ${it.text}`, fa: '', answerEn: '', answerFa: '' });
      report.counts.readingItems += items.length;
    }
    report.counts.readingExercises++;
    report.notConvertible.push({ unit: n, no: ex.no, kind: ex.kind, items: items.length, rows: rows.length, reason: printKeyless ? 'printKeyless' : instructionOnly ? 'keyed-instruction' : 'no-mechanical-1:1-or-options' });
  }

  // (no post-hoc listing assembly — listings/keys were pushed inline in exercise order above)

  perUnit.push({ n, u, left, titleFa, printed, prose, margins, vocabRows, quiz, exerciseItems, instructions });
}

// ── emit files ───────────────────────────────────────────────────────────────
mkdirSync(OUT, { recursive: true });

// book-meta.ts
{
  const chapters = perUnit.map(({ n, left, titleFa, printed }) => ({
    id: n,
    number: `درس ${n}`,
    title: left.title,
    titleFa,
    quote: { en: left.title, fa: titleFa, source: `درس ${n} — AVU-3 (کتاب ص${printed.left})` },
    minutes: 8,
    color: COLORS[(n - 1) % COLORS.length],
    grammarTopics: [],
  }));
  const faTitles = perUnit.map(({ n, titleFa }) => `  ${n}: ${tsStr(titleFa)},`).join('\n');
  const src = `// متادیتای کتاب «English Vocabulary in Use — Advanced» (3rd ed) — McCarthy & O'Dell (Cambridge, 2017)
// استخراج متنی مکانیکی از اسکن PDF آپلودشدهٔ مالک (فازهای A0..A4 کتاب چهارم VIU) — فاز A5
// عنوان‌های فارسی = ترجمهٔ ماشینی GLM (کلاس FA-NEW — قانون «پوشش ≠ صحت»)
import type { ChapterMeta, BookInfo } from "../types";

export const BOOK_INFO: BookInfo = {
  title: "English Vocabulary in Use — Advanced",
  subtitle: "Michael McCarthy & Felicity O'Dell — Cambridge — سطح پیشرفته",
  author: "Michael McCarthy & Felicity O'Dell",
  edition: "Cambridge University Press — 3rd Edition (2017, with answers)",
  price: "رایگان",
  telegram: "@PracticalEnglishInKonkour",
};

// عنوان‌های فارسی ۱۰۱ درس (FA-NEW — از fa-cache فاز A4)
export const FA_TITLES: Record<number, string> = {
${faTitles}
};

export const CHAPTERS: ChapterMeta[] = [
${chapters
  .map(
    (c) => `  {
    id: ${c.id},
    number: ${tsStr(c.number)},
    title: ${tsStr(c.title)},
    titleFa: ${tsStr(c.titleFa)},
    quote: { en: ${tsStr(c.quote.en)}, fa: ${tsStr(c.quote.fa)}, source: ${tsStr(c.quote.source)} },
    minutes: 8,
    color: "${c.color}",
    grammarTopics: [],
  },`,
  )
  .join('\n')}
];
`;
  writeFileSync(`${OUT}/book-meta.ts`, src);
}

// vocab parts
{
  const parts = Math.ceil(TOTAL_UNITS / PART_SIZE);
  for (let p = 1; p <= parts; p++) {
    const rows = perUnit
      .filter(({ n }) => n > (p - 1) * PART_SIZE && n <= p * PART_SIZE)
      .flatMap(({ vocabRows }) => vocabRows);
    const src = `// واژگان درس‌های English Vocabulary in Use — Advanced (پارتیت ${p}) — فاز A5
// word = عین چاپ کتاب (mini-dict) · meaning = ترجمهٔ ماشینی GLM (کلاس FA-NEW — اثبات صحت ترجمه نیست)
// pos ثبت نشده — در mini-dict چاپی کتاب چهارم pos چاپ نشده است (runtimeMapping ثبت‌شده)
import type { VocabWord } from "../types";

type Row = Omit<VocabWord, "lesson"> & { lesson: number; lessonLabel: string };

const ROWS: Row[] = [
${rows
  .map(
    (r) => `  {
    word: ${tsStr(r.word)},
    meaning: ${tsStr(r.meaning)},
    lesson: ${r.lesson},
    lessonLabel: ${tsStr(r.lessonLabel)},
  },`,
  )
  .join('\n')}
];

export const VOCAB_PART_${p}: Row[] = ROWS;
`;
    writeFileSync(`${OUT}/vocab-part-${p}.ts`, src);
    report.counts.vocab += rows.length;
  }
}

// vocab.ts (aggregation — same contract as viu-upper)
{
  const parts = Math.ceil(TOTAL_UNITS / PART_SIZE);
  const imports = Array.from({ length: parts }, (_, i) => `import { VOCAB_PART_${i + 1} } from "./vocab-part-${i + 1}";`).join('\n');
  const spreads = Array.from({ length: parts }, (_, i) => `  ...VOCAB_PART_${i + 1},`).join('\n');
  writeFileSync(
    `${OUT}/vocab.ts`,
    `// واژگان کامل درس‌های کتاب چهارم — تجمیع پارتیت‌ها (فاز A5)
import type { VocabEntry, VocabWord } from "../types";
${imports}

const ROWS: (Omit<VocabWord, "lesson"> & { lesson: number; lessonLabel: string })[] = [
${spreads}
];

export const VOCAB_ALL: VocabEntry[] = ROWS.map((r) => {
  const { lessonLabel, ...rest } = r;
  return { ...rest, lessonLabel } as VocabEntry;
});

export const VOCAB_LESSONS = [
  ...new Map(ROWS.map((r) => [r.lesson, { lesson: r.lesson, label: r.lessonLabel }])).values(),
].sort((a, b) => a.lesson - b.lesson);

export const VOCAB_COUNT_BY_LESSON: Record<number, number> = {};
for (const r of ROWS) VOCAB_COUNT_BY_LESSON[r.lesson] = (VOCAB_COUNT_BY_LESSON[r.lesson] ?? 0) + 1;

export function vocabOfLesson(lesson: number): VocabEntry[] {
  return VOCAB_ALL.filter((v) => v.lesson === lesson);
}
`,
  );
}

// quiz parts
{
  const parts = Math.ceil(TOTAL_UNITS / PART_SIZE);
  for (let p = 1; p <= parts; p++) {
    const rows = perUnit.filter(({ n }) => n > (p - 1) * PART_SIZE && n <= p * PART_SIZE).flatMap(({ quiz }) => quiz);
    const src = `// سؤالات آزمون درس‌های VIU Advanced (پارتیت ${p}) — فاز A5
// فقط تمرین‌های کلیددار چاپی که تبدیل مکانیکی بدون حدس ممکن بود (رأی‌نامهٔ G3 — بندهای ۱+۲+۳)؛
// پاسخ هر سؤال = عین Answer key چاپی کتاب — صفر پاسخ ساخته‌شده — گزینه‌ها عین ستون‌ها/جدول چاپی تمرین
// (F-class: گزینه‌های انحرافی فقط از کلید همان تمرین/درس — الگوی فاز ۵ سه‌کتابی) · level = «استاندارد»
import type { QuizQuestionSeed } from "../types";

export const QUIZ_PART_${p}: QuizQuestionSeed[] = [
${rows
  .map(
    (q) => `  {
    category: "vocabulary",
    lesson: ${q.lesson},
    scope: ${tsStr(q.scope)},
    text: ${tsStr(q.text)},
    options: [
${q.options.map((o) => `      ${tsStr(o)},`).join('\n')}
    ],
    answer: ${q.answer},
    level: "استاندارد",
    explanation: ${tsStr(q.explanation)},
  },`,
  )
  .join('\n')}
];
`;
    writeFileSync(`${OUT}/quiz-part-${p}.ts`, src);
    report.counts.quizQuestions += rows.length;
  }
}

// quiz-seed.ts
{
  const parts = Math.ceil(TOTAL_UNITS / PART_SIZE);
  const imports = Array.from({ length: parts }, (_, i) => `import { QUIZ_PART_${i + 1} } from "./quiz-part-${i + 1}";`).join('\n');
  const spreads = Array.from({ length: parts }, (_, i) => `  ...QUIZ_PART_${i + 1},`).join('\n');
  writeFileSync(
    `${OUT}/quiz-seed.ts`,
    `// آزمون کامل کتاب چهارم — تجمیع پارتیت‌ها (فاز A5)
import type { QuizQuestionSeed } from "../types";
${imports}

export const QUIZ_SEED: QuizQuestionSeed[] = [
${spreads}
];

export const QUESTION_COUNTS: Record<string, number> = {
  grammar: QUIZ_SEED.filter((q) => q.category === "grammar").length,
  vocabulary: QUIZ_SEED.filter((q) => q.category === "vocabulary").length,
};
`,
  );
}

// readings parts
{
  const parts = Math.ceil(TOTAL_UNITS / PART_SIZE);
  for (let p = 1; p <= parts; p++) {
    const readings = perUnit
      .filter(({ n }) => n > (p - 1) * PART_SIZE && n <= p * PART_SIZE)
      .map(({ n, titleFa, printed, prose, margins, exerciseItems, instructions }) => {
        const hasExercise = exerciseItems.length + instructions.length > 0;
        const instructionEn = instructions.map((i) => `${i.no} ${i.en}`).join(' — ');
        const instructionFa = instructions
          .map((i) => (i.keyless ? `${i.fa} (بی‌کلید چاپی)` : i.fa))
          .join(' — ');
        const items = exerciseItems;
        const paraLines = prose
          .map((x) => `      { en: ${tsStr(x.en)}, fa: ${tsStr(x.fa)} },`)
          .join('\n');
        const marginLines = margins
          .map((x) => `      { en: ${tsStr(x.en)}, fa: ${tsStr(x.fa)} },`)
          .join('\n');
        const itemLines = items
          .map(
            (x) => `      {
        en: ${tsStr(x.en)},
        fa: ${tsStr(x.fa)},
        answerEn: ${tsStr(x.answerEn)},
        answerFa: ${tsStr(x.answerFa)},
      },`,
          )
          .join('\n');
        const exerciseBlock = hasExercise
          ? `    exercise: {
      instruction: ${tsStr(instructionEn)},
      instructionFa: ${tsStr(instructionFa)},
      items: [
${items
  .map(
    (x) => `      {
        en: ${tsStr(x.en)},
        fa: ${tsStr(x.fa)},
        answerEn: ${tsStr(x.answerEn)},
        answerFa: ${tsStr(x.answerFa)},
      },`,
  )
  .join('\n')}
      ],
    },`
          : '';
        return `  {
    id: "viu-advanced-l${n}",
    lesson: ${n},
    title: ${tsStr(perUnit[n - 1].left.title)},
    titleFa: ${tsStr(titleFa)},
    source: ${tsStr(`AVU-3 3rd ed — درس ${n} (کتاب ص${printed.left}-${printed.right})`)},
    paragraphs: [
${paraLines}
${marginLines ? marginLines + '\n' : ''}    ],
${exerciseBlock}
  },`;
      });
    const src = `// متن ارائهٔ درس‌های VIU Advanced (پارتیت ${p}) + تمرین‌های غیرقابل‌تبدیل با کلید چاپی عین کتاب — فاز A5
// prose/margin/instruction fa = ترجمهٔ ماشینی GLM (کلاس FA-NEW) — آیتم‌ها و کلیدها بدون ترجمه (قرارداد سه‌کتابی)
// کلیدهای rows≠items صادقانه به‌صورت فهرست کامل برچسب‌دار می‌آیند (رأی ③ گیت G3 — «پاسخ‌های ممکن»)
import type { Reading } from "../types";

export const READINGS_PART_${p}: Reading[] = [
${readings.join('\n')}
];
`;
    writeFileSync(`${OUT}/readings-part-${p}.ts`, src);
    report.counts.proseParagraphs += perUnit.filter(({ n }) => n > (p - 1) * PART_SIZE && n <= p * PART_SIZE).reduce((a, u) => a + u.prose.length, 0);
    report.counts.marginNotes += perUnit.filter(({ n }) => n > (p - 1) * PART_SIZE && n <= p * PART_SIZE).reduce((a, u) => a + u.margins.length, 0);
  }
}

// readings.ts
{
  const parts = Math.ceil(TOTAL_UNITS / PART_SIZE);
  const imports = Array.from({ length: parts }, (_, i) => `import { READINGS_PART_${i + 1} } from "./readings-part-${i + 1}";`).join('\n');
  const spreads = Array.from({ length: parts }, (_, i) => `  ...READINGS_PART_${i + 1},`).join('\n');
  writeFileSync(
    `${OUT}/readings.ts`,
    `// متن ارائهٔ کامل کتاب چهارم — تجمیع پارتیت‌ها (فاز A5)
import type { Reading } from "../types";
${imports}

export const READING_LIST: Reading[] = [
${spreads}
];
`,
  );
}

// verbs.ts — empty (AVU-3 has no irregular-verb table captured; honesty = zero fabricated rows)
writeFileSync(
  `${OUT}/verbs.ts`,
  `// افعال بی‌قاعدهٔ کتاب چهارم — AVU-3 جدول فعل بی‌قاعدهٔ چاپی ندارد (طبق قرارداد runtimeMapping)
// صفر ردیف ساختگی — عین الگوی verbs.ts کتاب‌های VIU
import type { IrregularVerb } from "../types";

export const VERBS: IrregularVerb[] = [];
`,
);

// dictionary.ts — miniDict entries (printed gloss definitions) + IPA from Index where clean
{
  const dictRows = [];
  for (const { n, left } of perUnit) {
    for (const md of left.miniDict || []) {
      dictRows.push({
        word: md.headword,
        phonetic: ipaByWord.get(norm(md.headword)) ?? '',
        definition: md.text,
        lesson: n,
      });
    }
  }
  writeFileSync(
    `${OUT}/dictionary.ts`,
    `// دیکشنری کتاب چهارم — از mini-dict چاپی هر درس (تعریف چاپی واقعی) — فاز A5
// phonetic = از فهرست پایانی کتاب فقط برای تطبیق تمیز بدون U+E022 (صف بازبینی IPA پابرجاست — رأی ⑤)
// pos/examples ثبت نشده — چاپی نیستند (صفر مقدار ساختگی) · فهرست کامل ۳٬۳۳۰ ورودی Index (بدون تعریف چاپی)
// در لایهٔ شواهد می‌ماند — محدودیت صادقانهٔ ثبت‌شده در گزارش A5
import type { DictEntry } from "../types";

export const DICTIONARY: DictEntry[] = [
${dictRows
  .map(
    (d) => `  { word: ${tsStr(d.word)}, phonetic: ${tsStr(d.phonetic)}, pos: "", definition: ${tsStr(d.definition)}, examples: [], lesson: ${d.lesson} },`,
  )
  .join('\n')}
];
`,
  );
  report.counts.dictionary = dictRows.length;
}

// index.ts — BookData assembly (same contract as viu-upper)
writeFileSync(
  `${OUT}/index.ts`,
  `// مونتاژ داده‌های کتاب «English Vocabulary in Use — Advanced» به‌شکل قرارداد BookData — فاز A5
// این فایل تنها نقطهٔ ورود کتاب در رجیستری است: src/data/books/registry.ts
// مدل یکپارچه‌سازی: عین ساختار viu-upper (فاز ۵ سه‌کتابی) · صفر تصویر از اسکن (O2/O6 بدون تغییر)
import type { BookData } from "../books/types";

import { BOOK_INFO, CHAPTERS } from "./book-meta";
import { READING_LIST } from "./readings";
import { QUIZ_SEED, QUESTION_COUNTS } from "./quiz-seed";
import { VERBS } from "./verbs";
import { DICTIONARY } from "./dictionary";
import { VOCAB_ALL, VOCAB_LESSONS, VOCAB_COUNT_BY_LESSON, vocabOfLesson } from "./vocab";

const STATS = {
  words: VOCAB_ALL.length,
  questions: QUIZ_SEED.length,
  readings: READING_LIST.length,
  conversations: 0,
  dictionary: DICTIONARY.length,
  verbs: VERBS.length,
  grammarLessons: 0,
};

export const VIU_ADVANCED_BOOK = {
  info: BOOK_INFO,
  chapters: CHAPTERS,
  stats: STATS,
  vocab: {
    lessons: VOCAB_LESSONS,
    all: VOCAB_ALL,
    countByLesson: VOCAB_COUNT_BY_LESSON,
    ofLesson: vocabOfLesson,
  },
  quiz: {
    seed: QUIZ_SEED,
    counts: QUESTION_COUNTS,
  },
  grammar: {
    lessons: [],
    ofLesson: () => [],
  },
  readings: READING_LIST,
  conversations: [],
  dictionary: DICTIONARY,
  verbs: VERBS,
} satisfies BookData;
`,
);

writeFileSync(`docs/qa/viu-adv-a5-integration-2026-11-22.json`, JSON.stringify(report, null, 1));

console.log('A5 build complete:');
console.log(JSON.stringify(report.counts, null, 1));
console.log('quiz questions:', report.counts.quizQuestions);
console.log('cls examples:', JSON.stringify(report.perClassExamples));
