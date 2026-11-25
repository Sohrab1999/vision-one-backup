// مونتاژ داده‌های کتاب «English Vocabulary in Use — Upper-intermediate» به‌شکل قرارداد BookData
// این فایل تنها نقطهٔ ورود کتاب در رجیستری است: src/data/books/registry.ts
// مدل یکپارچه‌سازی: فاز ۲ (docs/architecture/viu-books-data-model-design-2026-11-09.md §C گزینهٔ ① جزوه‌وار ساختاریافته)
// ⚠️ درس ۵۲ «Clothes» مفقود در اسکن — فصل آن در CHAPTERS با برچسب صریح هست ولی هیچ دادهٔ محتوایی ندارد (فاز ۲ §E-۳)
import type { BookData } from "../books/types";

import { BOOK_INFO, CHAPTERS } from "./book-meta";
import { READING_LIST } from "./readings";
import { QUIZ_SEED, QUESTION_COUNTS } from "./quiz-seed";
import { VERBS } from "./verbs";
import { DICTIONARY } from "./dictionary";
import { WORD_FAMILIES } from "./word-families"; // R3-d: خانوادهٔ واژگانی درس‌های word formation ۸/۹/۱۰ (تولید مکانیکی از census)
import { SENSES } from "./senses"; // R3-e: حس‌های چاپی شماره‌دار p.12 — مدخل‌های نمونهٔ دیکشنری (گیت STEP 6)
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

export const VIU_UPPER_BOOK = {
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
  wordFamilies: WORD_FAMILIES, // R3-d — کلیک عضو در متن ⇒ بلوک «خانوادهٔ واژه» (فقط‌خواندنی)
  senses: SENSES, // R3-e — کلیک واژه ⇒ بلوک «حس‌های چاپی کتاب» (فقط‌خواندنی — p.12)
} satisfies BookData;
