// راستی‌آزمایی بانک تست پایه هشتم — اجرا: bun scripts/validate-quiz8.ts
import { QUIZ_SEED, QUESTION_COUNTS } from "../src/data/grade-8/quiz-seed";
import { QUESTIONS_LESSON_1 } from "../src/data/grade-8/questions-lesson-1";
import { QUESTIONS_LESSON_2 } from "../src/data/grade-8/questions-lesson-2";
import { QUESTIONS_LESSON_3 } from "../src/data/grade-8/questions-lesson-3";
import { QUESTIONS_LESSON_4 } from "../src/data/grade-8/questions-lesson-4";
import { QUESTIONS_LESSON_5 } from "../src/data/grade-8/questions-lesson-5";
import { QUESTIONS_LESSON_6 } from "../src/data/grade-8/questions-lesson-6";
import { QUESTIONS_LESSON_7 } from "../src/data/grade-8/questions-lesson-7";
import { QUESTIONS_FINAL_EXAMS } from "../src/data/grade-8/questions-final-exams";
import type { QuizQuestionSeed } from "../src/data/types";

const files: Array<[string, QuizQuestionSeed[]]> = [
  ["lesson-1", QUESTIONS_LESSON_1],
  ["lesson-2", QUESTIONS_LESSON_2],
  ["lesson-3", QUESTIONS_LESSON_3],
  ["lesson-4", QUESTIONS_LESSON_4],
  ["lesson-5", QUESTIONS_LESSON_5],
  ["lesson-6", QUESTIONS_LESSON_6],
  ["lesson-7", QUESTIONS_LESSON_7],
  ["final-exams", QUESTIONS_FINAL_EXAMS],
];

let errors = 0;
const validLevels = new Set(["آموزشی", "متوسط", "استاندارد", "کنکوری"]);
const counts: Record<string, { total: number; grammar: number; vocabulary: number }> = {};

for (const [name, qs] of files) {
  let grammar = 0;
  let vocabulary = 0;
  qs.forEach((q, i) => {
    const tag = `${name}#${i + 1}`;
    if (q.options.length !== 4) { console.error(`✗ ${tag}: ${q.options.length} گزینه دارد`); errors++; }
    if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer > 3) { console.error(`✗ ${tag}: answer نامجاز = ${q.answer}`); errors++; }
    if (q.options[q.answer] === undefined) { console.error(`✗ ${tag}: گزینه صحیح undefined`); errors++; }
    if (q.category !== "grammar" && q.category !== "vocabulary") { console.error(`✗ ${tag}: category نامعتبر ${q.category}`); errors++; }
    if (!validLevels.has(q.level)) { console.error(`✗ ${tag}: level نامعتبر ${q.level}`); errors++; }
    if (typeof q.text !== "string" || q.text.trim().length < 3) { console.error(`✗ ${tag}: text خالی/کوتاه`); errors++; }
    if (q.options.some((o) => typeof o !== "string" || o.trim().length === 0)) { console.error(`✗ ${tag}: گزینه خالی`); errors++; }
    if (q.lesson === 1 && name !== "lesson-1") { console.error(`✗ ${tag}: lesson ناسازگار`); errors++; }
    if (q.category === "grammar") grammar++; else vocabulary++;
  });
  counts[name] = { total: qs.length, grammar, vocabulary };
}

console.log("── شمارش سؤال‌ها ──");
for (const [name, c] of Object.entries(counts)) {
  console.log(`${name.padEnd(12)} total=${String(c.total).padStart(3)}  grammar=${String(c.grammar).padStart(3)}  vocabulary=${String(c.vocabulary).padStart(3)}`);
}
const grand = Object.values(counts).reduce((a, c) => ({ total: a.total + c.total, grammar: a.grammar + c.grammar, vocabulary: a.vocabulary + c.vocabulary }), { total: 0, grammar: 0, vocabulary: 0 });
console.log(`───────────── total=${grand.total}  grammar=${grand.grammar}  vocabulary=${grand.vocabulary}`);
console.log(`توازن: grammar ${((grand.grammar / grand.total) * 100).toFixed(1)}% / vocabulary ${((grand.vocabulary / grand.total) * 100).toFixed(1)}%`);

// تطبیق QUESTION_COUNTS با داده‌ها
if (QUESTION_COUNTS.total !== grand.total) { console.error(`✗ QUESTION_COUNTS.total=${QUESTION_COUNTS.total} ≠ ${grand.total}`); errors++; }
if (QUESTION_COUNTS.grammar !== grand.grammar) { console.error(`✗ QUESTION_COUNTS.grammar=${QUESTION_COUNTS.grammar} ≠ ${grand.grammar}`); errors++; }
if (QUESTION_COUNTS.vocabulary !== grand.vocabulary) { console.error(`✗ QUESTION_COUNTS.vocabulary=${QUESTION_COUNTS.vocabulary} ≠ ${grand.vocabulary}`); errors++; }
if (QUIZ_SEED.length !== grand.total) { console.error(`✗ QUIZ_SEED.length=${QUIZ_SEED.length} ≠ ${grand.total}`); errors++; }

// توزیع سطح
const levels: Record<string, number> = {};
for (const q of QUIZ_SEED) levels[q.level] = (levels[q.level] ?? 0) + 1;
console.log("سطح‌ها:", JSON.stringify(levels));

console.log(errors === 0 ? "✔ همه بررسی‌ها موفق — صفر خطا" : `✗ ${errors} خطا یافت شد`);
if (errors > 0) process.exit(1);
