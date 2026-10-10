import type { QuizQuestionSeed } from "../types";
import { QUESTIONS_LESSON_1 } from "./questions-lesson-1";
import { QUESTIONS_LESSON_2 } from "./questions-lesson-2";
import { QUESTIONS_LESSON_3 } from "./questions-lesson-3";
import { QUESTIONS_COMPREHENSIVE } from "./questions-comprehensive";

export const QUIZ_SEED: QuizQuestionSeed[] = [
  ...QUESTIONS_LESSON_1,
  ...QUESTIONS_LESSON_2,
  ...QUESTIONS_LESSON_3,
  ...QUESTIONS_COMPREHENSIVE,
];

export const QUESTION_COUNTS = {
  grammar:
    QUESTIONS_LESSON_1.filter((q) => q.category === "grammar").length +
    QUESTIONS_LESSON_2.filter((q) => q.category === "grammar").length +
    QUESTIONS_LESSON_3.filter((q) => q.category === "grammar").length +
    QUESTIONS_COMPREHENSIVE.filter((q) => q.category === "grammar").length,
  vocabulary:
    QUESTIONS_LESSON_1.filter((q) => q.category === "vocabulary").length +
    QUESTIONS_LESSON_2.filter((q) => q.category === "vocabulary").length +
    QUESTIONS_LESSON_3.filter((q) => q.category === "vocabulary").length +
    QUESTIONS_COMPREHENSIVE.filter((q) => q.category === "vocabulary").length,
  total: 0,
};
QUESTION_COUNTS.total = QUIZ_SEED.length;
