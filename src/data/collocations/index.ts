// مونتاژ داده‌های کتاب «۱۰۰۰ کالوکیشن کاربردی» به‌شکل قرارداد BookData
// این فایل تنها نقطهٔ ورود کتاب در رجیستری است: src/data/books/registry.ts
import type { BookData } from "../books/types";

import { BOOK_INFO, CHAPTERS } from "./book-meta";
import { READING_LIST } from "./readings";
import { QUIZ_SEED, QUESTION_COUNTS } from "./quiz-seed";
import { ALL_VOCAB, VOCAB_LESSONS, VOCAB_COUNT_BY_LESSON, vocabOfLesson } from "./vocab";

/** آمار کلی کتاب — یک‌بار در سطح ماژول محاسبه می‌شود */
const STATS = {
  words: ALL_VOCAB.length,
  questions: QUIZ_SEED.length,
  readings: READING_LIST.length,
  conversations: 0,
  dictionary: 0,
  verbs: 0,
  grammarLessons: 0,
};

/** بستهٔ کامل داده کتاب کالوکیشن‌ها (Shayna Oliveira — Espresso English) */
export const COLLOCATIONS_BOOK = {
  info: BOOK_INFO,
  chapters: CHAPTERS,
  stats: STATS,
  vocab: {
    lessons: VOCAB_LESSONS,
    all: ALL_VOCAB,
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
  dictionary: [],
  verbs: [],
} satisfies BookData;
