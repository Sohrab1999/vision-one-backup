// واژگان کامل ۶۰ درس — تجمیع پارتیت‌ها
import type { VocabEntry, VocabWord } from "../types";
import { VOCAB_PART_1 } from "./vocab-part-1";
import { VOCAB_PART_2 } from "./vocab-part-2";
import { VOCAB_PART_3 } from "./vocab-part-3";
import { VOCAB_PART_4 } from "./vocab-part-4";

const ROWS: (Omit<VocabWord, "lesson"> & { lesson: number; lessonLabel: string })[] = [
  ...VOCAB_PART_1,
  ...VOCAB_PART_2,
  ...VOCAB_PART_3,
  ...VOCAB_PART_4,
];

export const VOCAB_ALL: VocabEntry[] = ROWS.map((r) => {
  const { lessonLabel, ...rest } = r;
  return { ...rest, lessonLabel } as VocabEntry;
});

export const VOCAB_LESSONS = [
  ...new Map(ROWS.map((r) => [r.lesson, { lesson: r.lesson, label: r.lessonLabel }])).values(),
].sort((a, b) => a.lesson - b.lesson);

export const VOCAB_COUNT_BY_LESSON: Record<number, number> = {};
for (const r of ROWS) VOCAB_COUNT_BY_LESSON[r.lesson] = (VOCAB_COUNT_BY_LESSON[r.lesson] ?? 0) + 1;

export function vocabOfLesson(lesson: number): VocabEntry[] {
  return VOCAB_ALL.filter((v) => v.lesson === lesson);
}
