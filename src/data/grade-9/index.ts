// مونتاژ نهایی داده‌های جزوه «زبان انگلیسی نهم» (دکتر حسن لطفی) به‌شکل قرارداد BookData.
// این فایل تنها نقطه ورود کتاب در رجیستری است: src/data/books/registry.ts

import type { BookData } from "../books/types";

import { BOOK_INFO, CHAPTERS } from "./book-meta";
import { READING_LIST } from "./readings";
import { CONVERSATION_LIST } from "./conversations";
import { IRREGULAR_VERBS } from "./irregular-verbs";
import { DICTIONARY } from "./dictionary";
import { QUIZ_SEED, QUESTION_COUNTS } from "./quiz-seed";
import { ALL_VOCAB, VOCAB_LESSONS, VOCAB_COUNT_BY_LESSON, vocabOfLesson } from "./vocab";
import { GRAMMAR_LESSON_LIST, grammarOfLesson } from "./grammar";

/** آمار کلی جزوه — یک‌بار در سطح ماژول محاسبه می‌شود */
const STATS = {
  words: ALL_VOCAB.length,
  questions: QUIZ_SEED.length,
  readings: READING_LIST.length,
  conversations: CONVERSATION_LIST.length,
  dictionary: DICTIONARY.length,
  verbs: IRREGULAR_VERBS.length,
  grammarLessons: GRAMMAR_LESSON_LIST.length,
};

/** بسته کامل داده پایه نهم — جزوه دکتر حسن لطفی */
export const GRADE_NINE_BOOK = {
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
    lessons: GRAMMAR_LESSON_LIST,
    ofLesson: grammarOfLesson,
  },
  readings: READING_LIST,
  conversations: CONVERSATION_LIST,
  dictionary: DICTIONARY,
  verbs: IRREGULAR_VERBS,
} satisfies BookData;
