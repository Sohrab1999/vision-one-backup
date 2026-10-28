// قرارداد چندکتابی — کتابخانه جزوه‌های زبان انگلیسی (پایه ۷ تا ۱۲)
// هر جزوه یک پوشه در src/data/<book-id>/ دارد و یک شیء BookData می‌سازد.

import type {
  VocabEntry,
  QuizQuestionSeed,
  Reading,
  Conversation,
  DictEntry,
  IrregularVerb,
  ChapterMeta,
  BookInfo,
  GrammarLesson,
} from "../types";

/** شناسه یکتای هر جزوه — افزودن جزوه جدید = افزودن عضو جدید به این union */
export type BookId =
  | "vision-one" // پایه دهم — ویژن وان
  | "grade-7"
  | "grade-8"
  | "grade-9"
  | "grade-11"
  | "grade-12"
  | "collocations" // ۱۰۰۰ کالوکیشن کاربردی — Espresso English
  | "hill-intro" // Introductory Steps to Understanding — L. A. Hill (PDF)
  | "hill-elem" // Elementary Steps to Understanding — L. A. Hill (PDF)
  | "hill-inter" // Intermediate Steps to Understanding — L. A. Hill (PDF)
  | "hill-adv"; // Advanced Steps to Understanding — L. A. Hill (PDF)

/** نام‌های مجاز برای بخش‌های scoped در localStorage (پیشرفت مخصوص هر کتاب) */
export const SCOPED_STORE_NAMES = [
  "learned",
  "srs",
  "starred",
  "qstars",
  "mistakes",
  "goal",
  "daily",
  "weekly",
  "rounds",
  "srs-settings",
  "srs-daily",
] as const;

export type ScopedStoreName = (typeof SCOPED_STORE_NAMES)[number];

/** API واژگان هر کتاب — هم‌شکل exportهای قدیمی src/data/vocab.ts */
export interface BookVocabApi {
  /** فهرست درس‌ها با برچسب فارسی */
  lessons: { lesson: number; label: string }[];
  /** همه واژه‌ها با lessonLabel */
  all: VocabEntry[];
  /** تعداد واژه هر درس */
  countByLesson: Record<number, number>;
  ofLesson(lesson: number): VocabEntry[];
}

/** API گرامر هر کتاب — هم‌شکل exportهای قدیمی src/data/grammar.ts */
export interface BookGrammarApi {
  lessons: GrammarLesson[];
  ofLesson(lesson: number): GrammarLesson[];
}

/** بسته کامل داده یک جزوه — چیزی که هر پوشه جزوه باید بسازد */
export interface BookData {
  info: BookInfo;
  chapters: ChapterMeta[];
  stats: {
    words: number;
    questions: number;
    readings: number;
    conversations: number;
    dictionary: number;
    verbs: number;
    grammarLessons: number;
  };
  vocab: BookVocabApi;
  quiz: { seed: QuizQuestionSeed[]; counts: Record<string, number> };
  grammar: BookGrammarApi;
  readings: Reading[];
  conversations: Conversation[];
  dictionary: DictEntry[];
  verbs: IrregularVerb[];
}

/** رنگ‌های مجاز کارت جلد — بدون آبی/ایندیگو */
export type BookColor = "emerald" | "amber" | "teal" | "violet" | "orange" | "rose";

/** متادیتای قفسه — مستقل از داده محتوایی */
export interface BookMeta {
  id: BookId;
  /** نام جلد، مثل «ویژن وان» */
  title: string;
  /** مثل «پایه دهم» */
  gradeLabel: string;
  /** مؤلف/گردآورنده */
  author: string;
  /** توضیح یک‌خطی روی کارت */
  tagline: string;
  color: BookColor;
  /** ایموجی جلد موقت (جلد گرافیکی در فاز هر جزوه تولید می‌شود) */
  emoji: string;
  /** آیا محتوای کتاب بارگذاری شده و قابل ورود است؟ */
  available: boolean;
}
