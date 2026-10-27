/**
 * راستی‌آزمایی دادهٔ جزوهٔ «1000 English Collocations» — الگوی اسکریپت‌های u8-sim/u9-sim.
 * اجرا: bun tool-results/loc-check.ts
 */
import type { QuizQuestionSeed } from "../src/data/types";

import { ALL_VOCAB, VOCAB_LESSONS, VOCAB_COUNT_BY_LESSON, vocabOfLesson } from "../src/data/collocations/vocab";
import { QUIZ_SEED, QUESTION_COUNTS } from "../src/data/collocations/quiz-seed";
import { READING_LIST } from "../src/data/collocations/readings";
import { COLLOCATIONS_BOOK } from "../src/data/collocations/index";
import { CHAPTERS } from "../src/data/collocations/book-meta";

let pass = 0;
let fail = 0;
function check(name: string, cond: boolean, detail = ""): void {
  if (cond) {
    pass += 1;
  } else {
    fail += 1;
    console.error(`✗ ${name}${detail ? " — " + detail : ""}`);
  }
}

// ─── واژگان ───
check("vocab>1000", ALL_VOCAB.length >= 1000, `actual=${ALL_VOCAB.length}`);
check("vocab lessons=50", VOCAB_LESSONS.length === 50);
check("vocab every lesson nonempty", Array.from({ length: 50 }, (_, i) => i + 1).every((n) => (VOCAB_COUNT_BY_LESSON[n] ?? 0) >= 10), JSON.stringify(VOCAB_COUNT_BY_LESSON));
check("vocab ofLesson==filter", vocabOfLesson(7).length === (VOCAB_COUNT_BY_LESSON[7] ?? 0));
check("vocab all have lessonLabel", ALL_VOCAB.every((w) => typeof w.lessonLabel === "string" && w.lessonLabel.length > 0));
check("vocab no empty word/meaning", ALL_VOCAB.every((w) => w.word.trim().length > 0 && w.meaning.trim().length > 0));
check("vocab lesson in 1..50", ALL_VOCAB.every((w) => w.lesson >= 1 && w.lesson <= 50));
check("vocab no grade field", ALL_VOCAB.every((w) => w.grade === undefined));
check("vocab no broken U+FFFE", ALL_VOCAB.every((w) => !w.word.includes("\uFFFE") && !w.meaning.includes("\uFFFE")));
const dupWithin = new Map<number, Set<string>>();
let dupFound = false;
for (const w of ALL_VOCAB) {
  const set = dupWithin.get(w.lesson) ?? new Set<string>();
  if (set.has(w.word.toLowerCase())) dupFound = true;
  set.add(w.word.toLowerCase());
  dupWithin.set(w.lesson, set);
}
check("vocab no duplicate within lesson", !dupFound);

// ─── آزمون ───
check("quiz>500", QUIZ_SEED.length >= 500, `actual=${QUIZ_SEED.length}`);
check("counts.total==seed", QUESTION_COUNTS.total === QUIZ_SEED.length);
check("counts.vocabulary==seed", QUESTION_COUNTS.vocabulary === QUIZ_SEED.length);
check("quiz options=4 each", QUIZ_SEED.every((q) => q.options.length === 4));
check("quiz answer 0..3", QUIZ_SEED.every((q) => q.answer >= 0 && q.answer <= 3));
check("quiz options unique", QUIZ_SEED.every((q) => new Set(q.options).size === 4));
check("quiz options nonempty", QUIZ_SEED.every((q) => q.options.every((o) => o.trim().length > 0)));
check("quiz text nonempty", QUIZ_SEED.every((q) => q.text.trim().length > 0));
check("quiz category vocabulary", QUIZ_SEED.every((q) => q.category === "vocabulary"));
check("quiz level متوسط", QUIZ_SEED.every((q) => q.level === "متوسط"));
check("quiz lesson in 1..50", QUIZ_SEED.every((q) => q.lesson >= 1 && q.lesson <= 50));
check("quiz no lesson 33", QUIZ_SEED.every((q) => q.lesson !== 33));
check("quiz scope درس N", QUIZ_SEED.every((q) => q.scope.startsWith("درس ")));
check("quiz no prefix a.", QUIZ_SEED.every((q) => q.options.every((o) => !/^[a-d]\)/.test(o))));
check("quiz no U+FFFE", QUIZ_SEED.every((q) => !q.text.includes("\uFFFE") && q.options.every((o) => !o.includes("\uFFFE"))));
const qByLesson = new Map<number, number>();
for (const q of QUIZ_SEED) qByLesson.set(q.lesson, (qByLesson.get(q.lesson) ?? 0) + 1);
check("quiz 49 lessons covered (33 has none)", qByLesson.size === 49, `covered=${qByLesson.size}`);

// ─── ریدینگ ───
check("readings=50", READING_LIST.length === 50, `actual=${READING_LIST.length}`);
check("reading ids unique", new Set(READING_LIST.map((r) => r.id)).size === 50);
check("reading ids r-loc-N", READING_LIST.every((r) => /^r-loc-\d+$/.test(r.id)));
check("reading lessons 1..50 all", new Set(READING_LIST.map((r) => r.lesson)).size === 50);
check("reading paragraphs nonempty", READING_LIST.every((r) => r.paragraphs.length > 0));
check("reading en+fa nonempty", READING_LIST.every((r) => r.paragraphs.every((p) => p.en.trim().length > 0 && p.fa.trim().length > 0)));
check("reading no U+FFFE", READING_LIST.every((r) => r.paragraphs.every((p) => !p.en.includes("\uFFFE") && !p.fa.includes("\uFFFE"))));

// ─── فصل‌ها و مونتاژ ───
check("chapters=50", CHAPTERS.length === 50);
check("chapter ids 1..50", CHAPTERS.every((c, i) => c.id === i + 1));
check("chapter minutes=10", CHAPTERS.every((c) => c.minutes === 10));
check("chapter quote en+fa", CHAPTERS.every((c) => c.quote.en.length > 0 && c.quote.fa.length > 0));
check("book stats words==vocab", COLLOCATIONS_BOOK.stats.words === ALL_VOCAB.length);
check("book stats questions==quiz", COLLOCATIONS_BOOK.stats.questions === QUIZ_SEED.length);
check("book stats readings==readings", COLLOCATIONS_BOOK.stats.readings === READING_LIST.length);
check("book empty sections", COLLOCATIONS_BOOK.conversations.length === 0 && COLLOCATIONS_BOOK.dictionary.length === 0 && COLLOCATIONS_BOOK.verbs.length === 0 && COLLOCATIONS_BOOK.grammar.lessons.length === 0);

console.log(`\nRESULT: ${pass} passed / ${fail} failed`);
console.log(`stats: vocab=${ALL_VOCAB.length} quiz=${QUIZ_SEED.length} readings=${READING_LIST.length} chapters=${CHAPTERS.length}`);
if (fail > 0) process.exit(1);
