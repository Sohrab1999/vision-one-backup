// ممیزی مستقل کیفیت استخراج سه کتاب VIU — 2026-11-16
// اجرا: bun run docs/qa/viu-extraction-quality-audit-2026-11-16.ts
// خروجی: docs/qa/viu-extraction-quality-audit-2026-11-16.json + گزارش کنسول
// این اسکریپت فقط دادهٔ runtime زیر src/data/viu-* را می‌خواند — صفر وابستگی به گزارش‌های قدیمی.
import { VIU_ELEMENTARY_BOOK } from "../../src/data/viu-elem/index";
import { VIU_PREINT_BOOK } from "../../src/data/viu-preint/index";
import { VIU_UPPER_BOOK } from "../../src/data/viu-upper/index";
import { writeFileSync } from "node:fs";

const HAS_PERSIAN = /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/;
const MOJIBAKE = /[ØÛÅÂ�]|Ù[^\u0000-\u007F]/;
const norm = (s: string) => s.toLowerCase().replace(/\s+/g, " ").trim();
const blank = (s: unknown) => typeof s !== "string" || s.trim().length === 0;

type Book = typeof VIU_ELEMENTARY_BOOK;
const BOOKS: { id: string; label: string; book: Book; claimed: Record<string, number> }[] = [
  { id: "viu-elem", label: "Elementary", book: VIU_ELEMENTARY_BOOK, claimed: { words: 1492, readings: 60, quiz: 236, verbs: 65, lessons: 60 } },
  { id: "viu-preint", label: "Pre-int&Int", book: VIU_PREINT_BOOK, claimed: { words: 3216, readings: 100, quiz: 684, verbs: 0, lessons: 100 } },
  { id: "viu-upper", label: "Upper-int", book: VIU_UPPER_BOOK, claimed: { words: 4162, readings: 100, quiz: 456, verbs: 0, lessons: 100 } },
];

function auditBook(id: string, book: Book, claimed: Record<string, number>) {
  const R: Record<string, unknown> = { id };
  // ─── chapters ───
  const ch = book.chapters;
  const chIssues: string[] = [];
  const chIds = ch.map((c) => c.id);
  for (const c of ch) {
    if (blank(c.title) || blank(c.titleFa)) chIssues.push(`chapter ${c.id}: عنوان خالی`);
    if (!c.quote || blank(c.quote.en) || blank(c.quote.fa)) chIssues.push(`chapter ${c.id}: quote ناقص`);
    if (!Number.isFinite(c.minutes) || c.minutes <= 0) chIssues.push(`chapter ${c.id}: minutes نامعتبر`);
  }
  R.chapters = {
    count: ch.length,
    claimed: claimed.lessons,
    idsSequential: chIds.every((v, i) => v === i + 1),
    minId: Math.min(...chIds), maxId: Math.max(...chIds),
    grammarTopicsEmpty: ch.filter((c) => !c.grammarTopics || c.grammarTopics.length === 0).length,
    issues: chIssues,
  };
  // ─── vocab ───
  const vocab = book.vocab.all;
  const lessonSet = new Set<number>();
  const perLesson: Record<number, number> = {};
  const wordPerLesson = new Map<string, number>(); // `${normWord}|${lesson}`
  const wordGlobal = new Map<string, number[]>();
  let emptyWord = 0, emptyMeaning = 0, meaningNoPersian = 0, meaningEqWord = 0, wordHasPersian = 0, posMissing = 0, mojibakeMeaning = 0, mojibakeWord = 0;
  let labelMismatch = 0, meaningTooShort = 0, meaningTooLong = 0, wordWithDigit = 0;
  const noPersianSamples: string[] = [], mojibakeSamples: string[] = [], tooShortSamples: string[] = [], tooLongSamples: string[] = [];
  let meaningLenSum = 0;
  const dupInLesson: { word: string; lesson: number; n: number }[] = [];
  for (const v of vocab) {
    lessonSet.add(v.lesson);
    perLesson[v.lesson] = (perLesson[v.lesson] || 0) + 1;
    if (blank(v.word)) emptyWord++;
    if (blank(v.meaning)) emptyMeaning++;
    const w = v.word ?? "";
    const m = v.meaning ?? "";
    if (!blank(w) && HAS_PERSIAN.test(w)) wordHasPersian++;
    if (/\d/.test(w)) wordWithDigit++;
    if (MOJIBAKE.test(w)) { mojibakeWord++; if (mojibakeSamples.length < 8) mojibakeSamples.push(`word:${w}`); }
    if (MOJIBAKE.test(m)) { mojibakeMeaning++; if (mojibakeSamples.length < 8) mojibakeSamples.push(`meaning:${m.slice(0, 40)}`); }
    if (!blank(m) && !HAS_PERSIAN.test(m)) { meaningNoPersian++; if (noPersianSamples.length < 12) noPersianSamples.push(`${v.lesson}:${w} ⇒ ${m.slice(0, 40)}`); }
    if (norm(m) === norm(w) && !blank(w)) meaningEqWord++;
    if (!v.pos) posMissing++;
    if (v.lessonLabel && !v.lessonLabel.includes(String(v.lesson))) labelMismatch++;
    const ml = m.trim().length;
    meaningLenSum += ml;
    if (!blank(m) && ml < 4) { meaningTooShort++; if (tooShortSamples.length < 12) tooShortSamples.push(`${v.lesson}:${w} ⇒ ${m}`); }
    if (ml > 300) { meaningTooLong++; if (tooLongSamples.length < 6) tooLongSamples.push(`${v.lesson}:${w} ⇒ ${m.slice(0, 80)}…`); }
    const k = `${norm(w)}|${v.lesson}`;
    wordPerLesson.set(k, (wordPerLesson.get(k) ?? 0) + 1);
    const wk = norm(w);
    const arr = wordGlobal.get(wk) ?? [];
    arr.push(v.lesson);
    wordGlobal.set(wk, arr);
  }
  for (const [k, n] of wordPerLesson) if (n > 1) { const [w, l] = k.split("|"); dupInLesson.push({ word: w, lesson: Number(l), n }); }
  const crossLessonDups = [...wordGlobal.entries()].filter(([, ls]) => new Set(ls).size > 1);
  const expectedLessons = ch.map((c) => c.id);
  const vocabLessonsMissing = expectedLessons.filter((l) => !perLesson[l]);
  const vocabLessonsExtra = [...lessonSet].filter((l) => !expectedLessons.includes(l));
  // countByLesson consistency
  const cblMismatch: number[] = [];
  for (const [k, n] of Object.entries(book.vocab.countByLesson)) if (perLesson[Number(k)] !== n) cblMismatch.push(Number(k));
  R.vocab = {
    total: vocab.length,
    claimed: claimed.words,
    lessonsCovered: lessonSet.size,
    vocabLessonsMissing, vocabLessonsExtra,
    perLessonMin: Math.min(...Object.values(perLesson)), perLessonMax: Math.max(...Object.values(perLesson)),
    emptyWord, emptyMeaning,
    meaningNoPersian, noPersianSamples,
    meaningEqWord, wordHasPersian, wordWithDigit,
    posMissing, posMissingPct: +((posMissing / vocab.length) * 100).toFixed(1),
    labelMismatch,
    mojibakeWord, mojibakeMeaning, mojibakeSamples,
    meaningTooShort, tooShortSamples, meaningTooLong, tooLongSamples,
    avgMeaningLen: Math.round(meaningLenSum / vocab.length),
    dupInLessonCount: dupInLesson.length, dupInLesson: dupInLesson.slice(0, 20),
    crossLessonDupWords: crossLessonDups.length,
    countByLessonMismatches: cblMismatch,
  };
  // ─── readings ───
  const readings = book.readings;
  const rLessons = new Set(readings.map((r) => r.lesson));
  const rIds = new Set<string>();
  const dupIds: string[] = [];
  let emptyEn = 0, emptyFa = 0, emptyTitle = 0, emptyTitleFa = 0, paraTotal = 0;
  const noParaLessons: number[] = [], smallPara: { lesson: number; n: number }[] = [];
  let exCount = 0, exItemCount = 0, exItemNoKey = 0, exItemShortKey = 0, exItemDupKey = 0;
  const noKeySamples: string[] = [];
  for (const r of readings) {
    if (rIds.has(r.id)) dupIds.push(r.id);
    rIds.add(r.id);
    if (blank(r.title)) emptyTitle++;
    if (blank(r.titleFa)) emptyTitleFa++;
    if (!r.paragraphs || r.paragraphs.length === 0) noParaLessons.push(r.lesson);
    else if (r.paragraphs.length < 3) smallPara.push({ lesson: r.lesson, n: r.paragraphs.length });
    for (const p of r.paragraphs ?? []) {
      paraTotal++;
      if (blank(p.en)) emptyEn++;
      if (blank(p.fa)) emptyFa++;
    }
    if (r.exercise) {
      exCount++;
      const seenKeys = new Map<string, number>();
      for (const it of r.exercise.items ?? []) {
        exItemCount++;
        if (blank(it.answerEn)) { exItemNoKey++; if (noKeySamples.length < 10) noKeySamples.push(`${r.id} item: ${it.en?.slice(0, 40)}`); }
        else if (it.answerEn.trim().length < 6) exItemShortKey++;
        const kk = norm(it.answerEn ?? "");
        seenKeys.set(kk, (seenKeys.get(kk) ?? 0) + 1);
      }
      for (const [, n] of seenKeys) if (n > 1) exItemDupKey += n - 1;
    }
  }
  const readingsMissing = expectedLessons.filter((l) => !rLessons.has(l));
  R.readings = {
    count: readings.length,
    claimed: claimed.readings,
    lessonsWithReading: rLessons.size,
    lessonsMissingReading: readingsMissing,
    lessonsWithNoParagraphs: noParaLessons,
    smallParaLessons: smallPara,
    paraTotal, emptyEn, emptyFa, emptyTitle, emptyTitleFa, dupIds,
    avgParaPerReading: +(paraTotal / Math.max(readings.length, 1)).toFixed(1),
    exerciseCount: exCount, exerciseItemCount: exItemCount,
    exerciseNoKeyItems: exItemNoKey, noKeySamples,
    exerciseShortKeyItems: exItemShortKey, exerciseDupKeyItems: exItemDupKey,
  };
  // ─── quiz ───
  const quiz = book.quiz.seed;
  const qPerLesson: Record<number, number> = {};
  const qLessons = new Set<number>();
  const optLens: Record<number, number> = {};
  let qBadAnswer = 0, qDupOpts = 0, qEmptyText = 0, qNoBlankMark = 0, qExplanation = 0, qEmptyOpt = 0, qBadLesson = 0;
  const qDupTexts = new Map<string, number>();
  const badAnswerSamples: string[] = [], dupOptSamples: string[] = [];
  const texts = new Map<string, number>();
  for (const q of quiz) {
    qLessons.add(q.lesson);
    qPerLesson[q.lesson] = (qPerLesson[q.lesson] ?? 0) + 1;
    if (q.lesson < 0 || q.lesson > claimed.lessons) qBadLesson++;
    if (blank(q.text)) qEmptyText++;
    else { const t = norm(q.text); texts.set(t, (texts.get(t) ?? 0) + 1); if (!t.includes("________")) qNoBlankMark++; }
    const opts = q.options ?? [];
    optLens[opts.length] = (optLens[opts.length] ?? 0) + 1;
    if (opts.some((o) => blank(o))) qEmptyOpt++;
    const nn = opts.map(norm);
    if (new Set(nn).size !== opts.length) { qDupOpts++; if (dupOptSamples.length < 10) dupOptSamples.push(`L${q.lesson}: ${q.text.slice(0, 50)} ⇒ [${opts.join(" | ")}]`); }
    if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= opts.length) {
      qBadAnswer++;
      if (badAnswerSamples.length < 10) badAnswerSamples.push(`L${q.lesson}: ${q.text.slice(0, 50)} (answer=${q.answer}, nOpts=${opts.length})`);
    }
    if (q.explanation && !blank(q.explanation)) qExplanation++;
    const uniqK = `${norm(q.text)}⇒${nn.join("|")}`;
    qDupTexts.set(uniqK, (qDupTexts.get(uniqK) ?? 0) + 1);
  }
  const qDupExact = [...qDupTexts.entries()].filter(([, n]) => n > 1);
  const quizCountsMismatch: string[] = [];
  for (const [k, n] of Object.entries(book.quiz.counts ?? {})) {
    const ln = Number(k);
    if (Number.isFinite(ln) && qPerLesson[ln] !== n) quizCountsMismatch.push(`${k}:claimed=${n}/actual=${qPerLesson[ln] ?? 0}`);
  }
  const quizLessonsMissing = expectedLessons.filter((l) => !qLessons.has(l));
  R.quiz = {
    total: quiz.length,
    claimed: claimed.quiz,
    lessonsCovered: qLessons.size,
    lessonsMissingQuestions: quizLessonsMissing,
    perLessonMin: Math.min(...Object.values(qPerLesson)), perLessonMax: Math.max(...Object.values(qPerLesson)),
    perLessonDistribution: qPerLesson,
    categoryDistribution: quiz.reduce((acc, q) => { acc[q.category] = (acc[q.category] ?? 0) + 1; return acc; }, {} as Record<string, number>),
    levelDistribution: quiz.reduce((acc, q) => { acc[q.level] = (acc[q.level] ?? 0) + 1; return acc; }, {} as Record<string, number>),
    optionLengthDistribution: optLens,
    emptyText: qEmptyText, emptyOption: qEmptyOpt,
    badAnswerIndex: qBadAnswer, badAnswerSamples,
    duplicateOptions: qDupOpts, dupOptSamples,
    noBlankMark: qNoBlankMark,
    explanationPct: +((qExplanation / quiz.length) * 100).toFixed(1),
    exactDuplicateQuestions: qDupExact.length, exactDuplicateSamples: qDupExact.slice(0, 6).map(([k, n]) => `${n}x ${k.slice(0, 90)}`),
    duplicateLessonTexts: [...texts.entries()].filter(([, n]) => n > 1).length,
    countsRecordMismatch: quizCountsMismatch, badLessonRange: qBadLesson,
  };
  // ─── verbs & stats ───
  const verbs = book.verbs ?? [];
  R.verbs = { count: verbs.length, claimed: claimed.verbs, emptyFields: verbs.filter((v) => blank(v.base) || blank(v.past) || blank(v.participle) || blank(v.meaning)).length };
  R.statsVsActual = {
    words: { inStats: book.stats.words, actual: vocab.length },
    questions: { inStats: book.stats.questions, actual: quiz.length },
    readings: { inStats: book.stats.readings, actual: readings.length },
    verbs: { inStats: book.stats.verbs, actual: verbs.length },
    chapters: { actual: ch.length },
  };
  // ─── ماتریس کامل بودن محتوا در سطح درس ───
  const hasVocab = new Set(lessonSet);
  const hasProse = new Set(readings.filter((r) => (r.paragraphs?.length ?? 0) > 0).map((r) => r.lesson));
  const hasEx = new Set(readings.filter((r) => (r.exercise?.items?.length ?? 0) > 0).map((r) => r.lesson));
  const hasQ = qLessons;
  const profile: Record<string, number[]> = { full: [], noQuiz: [], noProse: [], minimal: [], empty: [] };
  for (const l of expectedLessons) {
    const v = hasVocab.has(l), p = hasProse.has(l), e = hasEx.has(l), q = hasQ.has(l);
    if (!v && !p && !e && !q) { profile.empty.push(l); continue; }
    if (v && p && e && q) { profile.full.push(l); continue; }
    if (!q) profile.noQuiz.push(l);
    if (!p) profile.noProse.push(l);
    if (!v && !p && !q) profile.minimal.push(l);
  }
  R.lessonContentMatrix = {
    full_4of4: profile.full,
    onlyVocab_noQuiz_noProse: profile.minimal,
    missingQuiz: expectedLessons.filter((l) => !hasQ.has(l)),
    missingProse: expectedLessons.filter((l) => !hasProse.has(l)),
    emptyLesson: profile.empty,
    counts: {
      lessons: expectedLessons.length,
      full: profile.full.length,
      withVocab: expectedLessons.filter((l) => hasVocab.has(l)).length,
      withProse: expectedLessons.filter((l) => hasProse.has(l)).length,
      withExercise: expectedLessons.filter((l) => hasEx.has(l)).length,
      withQuiz: expectedLessons.filter((l) => hasQ.has(l)).length,
      empty: profile.empty.length,
    },
  };
  return R;
}

// ─── cross-book ───
const globalWords = new Map<string, Set<string>>();
for (const { id, book } of BOOKS) {
  for (const v of book.vocab.all) {
    const k = norm(v.word);
    if (!globalWords.has(k)) globalWords.set(k, new Set());
    globalWords.get(k)!.add(id);
  }
}
const inAllThree = [...globalWords.values()].filter((s) => s.size === 3).length;
const inTwo = [...globalWords.values()].filter((s) => s.size === 2).length;
const cross = {
  totalUniqueNormalizedWords: globalWords.size,
  wordsInAllThreeBooks: inAllThree,
  wordsInTwoBooks: inTwo,
  overlapPct: +((inAllThree / BOOKS.reduce((a, b) => a + b.claimed.words, 0)) * 100).toFixed(1),
};

const report = BOOKS.map((b) => auditBook(b.id, b.book, b.claimed));
const totals = {
  words: BOOKS.reduce((a, b) => a + b.book.vocab.all.length, 0),
  readings: BOOKS.reduce((a, b) => a + b.book.readings.length, 0),
  quiz: BOOKS.reduce((a, b) => a + b.book.quiz.seed.length, 0),
  paragraphs: BOOKS.reduce((a, b) => a + b.book.readings.reduce((s, r) => s + (r.paragraphs?.length ?? 0), 0), 0),
  chapters: BOOKS.reduce((a, b) => a + b.book.chapters.length, 0),
  verbs: BOOKS.reduce((a, b) => a + b.book.verbs.length, 0),
};
const exerciseTotals = BOOKS.map((b) => (b.book.readings as { exercise?: unknown }[]).filter((r) => r.exercise).length);
const exItems = BOOKS.map((b) => b.book.readings.reduce((s, r) => s + (r.exercise?.items?.length ?? 0), 0));

const out = { generated: "2026-11-16", method: "runtime-audit of src/data/viu-* (ground truth)", totals, exercisesPerBook: exerciseTotals, exerciseItemsPerBook: exItems, crossBook: cross, books: report };
writeFileSync(new URL("./viu-extraction-quality-audit-2026-11-16.json", import.meta.url), JSON.stringify(out, null, 2));

// ─── console report ───
console.log("=== TOTALS ===", JSON.stringify(totals));
console.log("=== CROSS-BOOK ===", JSON.stringify(cross));
for (const r of report) {
  console.log(`\n########## ${r.id} ##########`);
  for (const sec of ["chapters", "vocab", "readings", "quiz", "verbs", "statsVsActual"]) {
    const s = r[sec] as Record<string, unknown>;
    const brief: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(s)) {
      if (Array.isArray(v) && v.length > 12) brief[k] = `[${v.length} items — first 3: ${JSON.stringify(v.slice(0, 3))}]`;
      else if (typeof v === "object" && v !== null && k === "perLessonDistribution") brief[k] = `{${Object.keys(v as object).length} lessons}`;
      else brief[k] = v;
    }
    console.log(`--- ${sec} ---`);
    console.log(JSON.stringify(brief, null, 1));
  }
}
console.log("\nJSON written:", "docs/qa/viu-extraction-quality-audit-2026-11-16.json");
