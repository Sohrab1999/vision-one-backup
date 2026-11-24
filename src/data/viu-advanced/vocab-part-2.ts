// واژگان درس‌های English Vocabulary in Use — Advanced (پارتیت 2) — فاز A5
// word = عین چاپ کتاب (mini-dict) · meaning = ترجمهٔ ماشینی GLM (کلاس FA-NEW — اثبات صحت ترجمه نیست)
// pos ثبت نشده — در mini-dict چاپی کتاب چهارم pos چاپ نشده است (runtimeMapping ثبت‌شده)
import type { VocabWord } from "../types";

type Row = Omit<VocabWord, "lesson"> & { lesson: number; lessonLabel: string };

const ROWS: Row[] = [
  {
    word: "gripping",
    meaning: "چنان جالب یا هیجان‌انگیز که توجه شما را کاملاً درگیر می‌کند",
    lesson: 22,
    lessonLabel: "درس 22 — در مورد کتاب‌ها صحبت کردن",
  },
  {
    word: "enigmatic",
    meaning: "مرموز",
    lesson: 22,
    lessonLabel: "درس 22 — در مورد کتاب‌ها صحبت کردن",
  },
  {
    word: "breathtaking",
    meaning: "شگفت‌انگیز",
    lesson: 22,
    lessonLabel: "درس 22 — در مورد کتاب‌ها صحبت کردن",
  },
  {
    word: "wry",
    meaning: "در مقابل یک موقعیت بد",
    lesson: 22,
    lessonLabel: "درس 22 — در مورد کتاب‌ها صحبت کردن",
  },
];

export const VOCAB_PART_2: Row[] = ROWS;
