import type { QuizQuestionSeed } from "./types";
import { GRAMMAR_100 } from "./questions-grammar-comprehensive";
import { GRAMMAR_LESSONS } from "./questions-grammar-lessons";
import { VOCAB_120 } from "./questions-vocab";

export const QUIZ_SEED: QuizQuestionSeed[] = [
  ...GRAMMAR_LESSONS,
  ...GRAMMAR_100,
  ...VOCAB_120,
];

export const QUESTION_COUNTS = {
  grammar: GRAMMAR_LESSONS.length + GRAMMAR_100.length,
  vocabulary: VOCAB_120.length,
  total: QUIZ_SEED.length,
};
