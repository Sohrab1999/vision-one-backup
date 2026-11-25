// مونتاژ داده‌های کتاب «English Vocabulary in Use — Advanced» به‌شکل قرارداد BookData — فاز A5
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
