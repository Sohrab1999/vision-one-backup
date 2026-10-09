import type { VocabWord, VocabEntry } from "../types";
import { VOCAB_LESSON_0 } from "./vocab-lesson-0";
import { VOCAB_LESSON_1 } from "./vocab-lesson-1";
import { VOCAB_LESSON_2 } from "./vocab-lesson-2";
import { VOCAB_LESSON_3 } from "./vocab-lesson-3";
import { VOCAB_LESSON_4 } from "./vocab-lesson-4";
import { VOCAB_LESSON_5 } from "./vocab-lesson-5";
import { VOCAB_LESSON_6 } from "./vocab-lesson-6";
import { VOCAB_LESSON_7 } from "./vocab-lesson-7";
import { VOCAB_LESSON_8 } from "./vocab-lesson-8";

export const VOCAB_LESSONS: { lesson: number; label: string }[] = [
  { lesson: 0, label: "مرور شروع" },
  { lesson: 1, label: "درس ۱ — My Name" },
  { lesson: 2, label: "درس ۲ — My Classmates" },
  { lesson: 3, label: "درس ۳ — My Age" },
  { lesson: 4, label: "درس ۴ — My Family" },
  { lesson: 5, label: "درس ۵ — My Appearance" },
  { lesson: 6, label: "درس ۶ — My House" },
  { lesson: 7, label: "درس ۷ — My Address" },
  { lesson: 8, label: "درس ۸ — My Favorite Food" },
];

function withLabel(list: VocabWord[], label: string): VocabEntry[] {
  return list.map((w) => ({ ...w, lessonLabel: label }));
}

export const ALL_VOCAB: VocabEntry[] = [
  ...withLabel(VOCAB_LESSON_0, "مرور شروع"),
  ...withLabel(VOCAB_LESSON_1, "درس ۱"),
  ...withLabel(VOCAB_LESSON_2, "درس ۲"),
  ...withLabel(VOCAB_LESSON_3, "درس ۳"),
  ...withLabel(VOCAB_LESSON_4, "درس ۴"),
  ...withLabel(VOCAB_LESSON_5, "درس ۵"),
  ...withLabel(VOCAB_LESSON_6, "درس ۶"),
  ...withLabel(VOCAB_LESSON_7, "درس ۷"),
  ...withLabel(VOCAB_LESSON_8, "درس ۸"),
];

export const VOCAB_COUNT_BY_LESSON: Record<number, number> = {
  0: VOCAB_LESSON_0.length,
  1: VOCAB_LESSON_1.length,
  2: VOCAB_LESSON_2.length,
  3: VOCAB_LESSON_3.length,
  4: VOCAB_LESSON_4.length,
  5: VOCAB_LESSON_5.length,
  6: VOCAB_LESSON_6.length,
  7: VOCAB_LESSON_7.length,
  8: VOCAB_LESSON_8.length,
};

export function vocabOfLesson(lesson: number): VocabEntry[] {
  return ALL_VOCAB.filter((w) => w.lesson === lesson);
}
