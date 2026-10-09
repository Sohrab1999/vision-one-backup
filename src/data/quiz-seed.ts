import type { QuizQuestionSeed } from "./types";
import { GRAMMAR_100 } from "./questions-grammar-comprehensive";
import { GRAMMAR_LESSONS } from "./questions-grammar-lessons";
import { VOCAB_120 as VOCAB_FIRST_120 } from "./questions-vocab";
import { VOCAB_110 } from "./questions-vocab-2";
import { VOCAB_120 as VOCAB_LAST_120 } from "./questions-vocab-3";

export const QUIZ_SEED: QuizQuestionSeed[] = [
  ...GRAMMAR_LESSONS,
  ...GRAMMAR_100,
  ...VOCAB_FIRST_120,
  ...VOCAB_110,
  ...VOCAB_LAST_120,
];

export const QUESTION_COUNTS = {
  grammar: GRAMMAR_LESSONS.length + GRAMMAR_100.length,
  vocabulary: VOCAB_FIRST_120.length + VOCAB_110.length + VOCAB_LAST_120.length,
  total: QUIZ_SEED.length,
};
