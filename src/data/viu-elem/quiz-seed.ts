// آزمون کامل — تجمیع پارتیت‌ها
import type { QuizQuestionSeed } from "../types";
import { QUIZ_PART_1 } from "./quiz-part-1";
import { QUIZ_PART_2 } from "./quiz-part-2";
import { QUIZ_PART_3 } from "./quiz-part-3";
import { QUIZ_PART_4 } from "./quiz-part-4";

export const QUIZ_SEED: QuizQuestionSeed[] = [...QUIZ_PART_1, ...QUIZ_PART_2, ...QUIZ_PART_3, ...QUIZ_PART_4];

export const QUESTION_COUNTS: Record<string, number> = {
  grammar: QUIZ_SEED.filter((q) => q.category === "grammar").length,
  vocabulary: QUIZ_SEED.filter((q) => q.category === "vocabulary").length,
};
