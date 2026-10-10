import type { VocabWord, VocabEntry } from "../types";
import { VOCAB_LESSON_1 } from "./vocab-lesson-1";
import { VOCAB_LESSON_2 } from "./vocab-lesson-2";
import { VOCAB_LESSON_3 } from "./vocab-lesson-3";

/** برچسب درس‌ها — عین عنوان‌های چاپی جزوه Vision Two */
export const VOCAB_LESSONS: { lesson: number; label: string }[] = [
  { lesson: 1, label: "درس ۱ — Understanding People" },
  { lesson: 2, label: "درس ۲ — A healthy Lifestyle" },
  { lesson: 3, label: "درس ۳ — Art and Culture" },
];

function withLabel(list: VocabWord[], label: string): VocabEntry[] {
  return list.map((w) => ({ ...w, lessonLabel: label }));
}

export const ALL_VOCAB: VocabEntry[] = [
  ...withLabel(VOCAB_LESSON_1, "درس ۱"),
  ...withLabel(VOCAB_LESSON_2, "درس ۲"),
  ...withLabel(VOCAB_LESSON_3, "درس ۳"),
];

export const VOCAB_COUNT_BY_LESSON: Record<number, number> = {
  1: VOCAB_LESSON_1.length,
  2: VOCAB_LESSON_2.length,
  3: VOCAB_LESSON_3.length,
};

export function vocabOfLesson(lesson: number): VocabEntry[] {
  return ALL_VOCAB.filter((w) => w.lesson === lesson);
}
