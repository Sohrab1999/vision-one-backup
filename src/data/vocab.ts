import type { VocabWord } from "./types";
import { VOCAB_LESSON_1 } from "./vocab-lesson-1";
import { VOCAB_LESSON_2 } from "./vocab-lesson-2";
import { VOCAB_LESSON_3 } from "./vocab-lesson-3";
import { VOCAB_LESSON_4 } from "./vocab-lesson-4";
import { VOCAB_JUNIOR } from "./vocab-junior";

export type VocabEntry = VocabWord & { lessonLabel: string };

export const VOCAB_LESSONS: { lesson: number; label: string }[] = [
  { lesson: 0, label: "پایه ۷ تا ۹" },
  { lesson: 1, label: "درس ۱ — Saving Nature" },
  { lesson: 2, label: "درس ۲ — Wonders of Creation" },
  { lesson: 3, label: "درس ۳ — The Value of Knowledge" },
  { lesson: 4, label: "درس ۴ — Traveling the World" },
];

function withLabel(list: VocabWord[], label: string): VocabEntry[] {
  return list.map((w) => ({ ...w, lessonLabel: label }));
}

export const ALL_VOCAB: VocabEntry[] = [
  ...withLabel(VOCAB_JUNIOR, "پایه ۷ تا ۹"),
  ...withLabel(VOCAB_LESSON_1, "درس ۱"),
  ...withLabel(VOCAB_LESSON_2, "درس ۲"),
  ...withLabel(VOCAB_LESSON_3, "درس ۳"),
  ...withLabel(VOCAB_LESSON_4, "درس ۴"),
];

export const VOCAB_COUNT_BY_LESSON: Record<number, number> = {
  0: VOCAB_JUNIOR.length,
  1: VOCAB_LESSON_1.length,
  2: VOCAB_LESSON_2.length,
  3: VOCAB_LESSON_3.length,
  4: VOCAB_LESSON_4.length,
};

export function vocabOfLesson(lesson: number): VocabEntry[] {
  return ALL_VOCAB.filter((w) => w.lesson === lesson);
}
