// واژگان درس‌های English Vocabulary in Use — Advanced (پارتیت 4) — فاز A5
// word = عین چاپ کتاب (mini-dict) · meaning = ترجمهٔ ماشینی GLM (کلاس FA-NEW — اثبات صحت ترجمه نیست)
// pos ثبت نشده — در mini-dict چاپی کتاب چهارم pos چاپ نشده است (runtimeMapping ثبت‌شده)
import type { VocabWord } from "../types";

type Row = Omit<VocabWord, "lesson"> & { lesson: number; lessonLabel: string };

const ROWS: Row[] = [

];

export const VOCAB_PART_4: Row[] = ROWS;
