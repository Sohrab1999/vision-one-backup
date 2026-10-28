// Shared content types for the interactive web book library (پایه ۷ تا ۱۲).
// Every data file under src/data must import its types from here.
// این تایپ‌ها بین همه جزوه‌ها مشترک‌اند — قرارداد داده‌ها.

export interface VocabWord {
  /** English word exactly as printed in the book (pos markers like "(n, v)" kept inline) */
  word: string;
  /** Persian meaning exactly as printed in the book */
  meaning: string;
  /** 0 = پایه هفتم تا نهم (مرور), 1..4 = درس‌های پایه دهم */
  lesson: number;
  /** برای واژگان پایه ۷ تا ۹: 7 | 8 | 9 */
  grade?: number;
  /** optional part of speech, e.g. "n.", "v.", "adj.", "prep.", "phr." */
  pos?: string;
}

export interface QuizQuestionSeed {
  /** "grammar" | "vocabulary" */
  category: "grammar" | "vocabulary";
  /** 0 = جمع‌بندی کل کتاب, 1..4 = شماره درس */
  lesson: number;
  /** بخش/محدوده سؤال، مثلاً "جمع‌بندی درس ۱ تا ۴" یا "درس اول" */
  scope: string;
  /** متن سؤال انگلیسی (جای خالی با "________" نمایش داده شود) */
  text: string;
  /** دقیقاً ۴ گزینه بدون پیشوند a./b./c./d. */
  options: string[];
  /** اندیس گزینه صحیح (0-3) */
  answer: number;
  /** "آموزشی" | "متوسط" | "استاندارد" | "کنکوری" */
  level: string;
  /** توضیح کوتاه اختیاری (فارسی) */
  explanation?: string;
}

export interface ReadingParagraph {
  /** پاراگراف انگلیسی */
  en: string;
  /** ترجمه فارسی روان از جزوه */
  fa: string;
}

/** تمرین درک مطلب بعد از یک داستان (کتاب‌های داستانی مثل Steps to Understanding) */
export interface ReadingExercise {
  /** دستور تمرین انگلیسی مثل «Answer these questions.» */
  instruction: string;
  /** دستور تمرین فارسی */
  instructionFa: string;
  items: {
    /** سؤال انگلیسی */
    en: string;
    /** ترجمه فارسی سؤال */
    fa: string;
    /** پاسخ نمونه انگلیسی (از خود داستان) */
    answerEn: string;
    /** ترجمه فارسی پاسخ نمونه */
    answerFa: string;
  }[];
}

export interface Reading {
  id: string;
  lesson: number;
  /** عنوان انگلیسی */
  title: string;
  /** عنوان فارسی */
  titleFa: string;
  /** منبع، مثلاً "کتاب درسی — صفحه ۲۲" */
  source: string;
  paragraphs: ReadingParagraph[];
  /** تمرین درک مطلب اختیاری (کتاب‌های داستانی) — با پاسخ نمونهٔ بازشونده */
  exercise?: ReadingExercise;
}

export interface ConversationLine {
  /** نام گوینده انگلیسی */
  speaker: string;
  /** جمله انگلیسی */
  en: string;
  /** ترجمه فارسی */
  fa: string;
}

export interface Conversation {
  id: string;
  lesson: number;
  title: string;
  titleFa: string;
  /** منبع، مثلاً "کتاب درسی — صفحه ۱۹" */
  source: string;
  /** مقدمه مکالمه */
  intro?: ReadingParagraph;
  lines: ConversationLine[];
}

export interface DictEntry {
  word: string;
  /** تلفظ IPA مثل / əˈlaɪv / */
  phonetic: string;
  /** pos مثل "adj." / "n." / "v." / "prep." / "adv." */
  pos: string;
  /** تعریف انگلیسی به انگلیسی */
  definition: string;
  /** یک یا دو مثال انگلیسی */
  examples: string[];
  lesson: number;
}

export interface IrregularVerb {
  base: string;
  past: string;
  participle: string;
  meaning: string;
}

// ─── تایپ‌های چندکتابی (مشترک بین همه جزوه‌ها) ───

/** یک واژه به‌همراه برچسب درس (برای نمایش در لیست‌ها) */
export type VocabEntry = VocabWord & { lessonLabel: string };

/** متادیتای یک فصل/درس از جزوه */
export interface ChapterMeta {
  id: number;
  number: string;
  title: string;
  titleFa: string;
  quote: { en: string; fa: string; source: string };
  minutes: number;
  color: string;
  grammarTopics: string[];
}

/** مشخصات چاپی جزوه (صفحه شناسنامه کتاب) */
export interface BookInfo {
  title: string;
  subtitle: string;
  author: string;
  edition: string;
  price: string;
  telegram: string;
}

// ─── تایپ‌های درسنامه گرامر (شکل مشترک بین همه جزوه‌ها) ───

export interface GrammarExample {
  en: string;
  fa: string;
}

export interface GrammarBlock {
  kind: "text" | "formula" | "table" | "examples" | "note";
  title?: string;
  text?: string;
  headers?: string[];
  rows?: string[][];
  items?: GrammarExample[];
}

export interface GrammarLesson {
  id: string;
  lesson: number;
  title: string;
  titleFa: string;
  summary: string;
  blocks: GrammarBlock[];
}
