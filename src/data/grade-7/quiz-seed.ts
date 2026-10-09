import type { QuizQuestionSeed } from "../types";
import { QUESTIONS_LESSON_1 } from "./questions-lesson-1";
import { QUESTIONS_LESSON_2 } from "./questions-lesson-2";
import { QUESTIONS_LESSON_3 } from "./questions-lesson-3";
import { QUESTIONS_LESSON_4 } from "./questions-lesson-4";
import { QUESTIONS_LESSON_5 } from "./questions-lesson-5";
import { QUESTIONS_LESSON_6 } from "./questions-lesson-6";
import { QUESTIONS_LESSON_7 } from "./questions-lesson-7";
import { QUESTIONS_LESSON_8 } from "./questions-lesson-8";
import { QUESTIONS_VOCAB_TEST } from "./questions-vocab-test";

export const QUIZ_SEED: QuizQuestionSeed[] = [
  ...QUESTIONS_VOCAB_TEST,
  ...QUESTIONS_LESSON_1,
  ...QUESTIONS_LESSON_2,
  ...QUESTIONS_LESSON_3,
  ...QUESTIONS_LESSON_4,
  ...QUESTIONS_LESSON_5,
  ...QUESTIONS_LESSON_6,
  ...QUESTIONS_LESSON_7,
  ...QUESTIONS_LESSON_8,
];

export const QUESTION_COUNTS = {
  grammar:
    QUESTIONS_LESSON_1.filter((q) => q.category === "grammar").length +
    QUESTIONS_LESSON_2.filter((q) => q.category === "grammar").length +
    QUESTIONS_LESSON_3.filter((q) => q.category === "grammar").length +
    QUESTIONS_LESSON_4.filter((q) => q.category === "grammar").length +
    QUESTIONS_LESSON_5.filter((q) => q.category === "grammar").length +
    QUESTIONS_LESSON_6.filter((q) => q.category === "grammar").length +
    QUESTIONS_LESSON_7.filter((q) => q.category === "grammar").length +
    QUESTIONS_LESSON_8.filter((q) => q.category === "grammar").length,
  vocabulary:
    QUESTIONS_VOCAB_TEST.length +
    QUESTIONS_LESSON_1.filter((q) => q.category === "vocabulary").length +
    QUESTIONS_LESSON_2.filter((q) => q.category === "vocabulary").length +
    QUESTIONS_LESSON_3.filter((q) => q.category === "vocabulary").length +
    QUESTIONS_LESSON_4.filter((q) => q.category === "vocabulary").length +
    QUESTIONS_LESSON_5.filter((q) => q.category === "vocabulary").length +
    QUESTIONS_LESSON_6.filter((q) => q.category === "vocabulary").length +
    QUESTIONS_LESSON_7.filter((q) => q.category === "vocabulary").length +
    QUESTIONS_LESSON_8.filter((q) => q.category === "vocabulary").length,
  total: 0,
};
QUESTION_COUNTS.total = QUIZ_SEED.length;
