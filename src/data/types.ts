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
  /**
   * متن سؤال انگلیسی — قالب‌های مجاز عین تمرین چاپی کتاب:
   * جای‌خالی با "________" (۴۲٪ سؤال‌ها) و قالب‌های غیرجای‌خالی مثل جفت‌واژه «mean / thrifty»،
   * odd-one-out، تطبیق تعریف و True-False (۵۸٪ — یافتهٔ ۲-۳ ب ممیزی کیفیت VIU — عین قالب تمرین کتاب، عیب نیست).
   * متن سؤال بدون fa است (قرارداد ترجمه — سؤال‌های آزمون بدون ترجمه).
   */
  text: string;
  /**
   * گزینه‌ها بدون پیشوند a./b./c./d. — تعداد گزینه عین تمرین چاپی متنوع است (۲ تا ۵ گزینه):
   * توزیع ثبت‌شدهٔ زندهٔ ۲۰۲۶-۱۱-۱۹ (کل ۲٬۸۷۲ سؤال — شامل موج R1):
   * ۲-گزینه‌ای ۵۲ · ۳-گزینه‌ای ۱۸۹ · ۴-گزینه‌ای ۲٬۶۲۵ (اکثریت) · ۵-گزینه‌ای ۶ (upper) —
   * صفر گزینهٔ تکراری case-variant (باگ L42 در R0 تعمیر شد) — صفر گزینهٔ خالی.
   */
  options: string[];
  /**
   * اندیس گزینه صحیح — بازهٔ معتبر 0 تا options.length - 1 (مستقل از تعداد گزینه‌های همان سؤال؛
   * ممیزی زندهٔ ۲۰۲۶-۱۱-۱۹: صفر ایندکس نامعتبر).
   */
  answer: number;
  /** "آموزشی" | "متوسط" | "استاندارد" | "کنکوری" */
  level: string;
  /** توضیح کوتاه اختیاری (فارسی) — در VIU ۱۰۰٪ سؤال‌ها explanation دارند با ارجاع به کلید چاپی */
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

/** R3-d: عضو خانوادهٔ واژگانی چاپی — واژهٔ عضو عین کتاب + کلیدهای جست‌وجو
 *  (verbatim + واریانت‌های صرفی با همان قواعد ساده‌سازی پاپ‌آپ) */
export interface WordFamilyMember {
  /** واژهٔ عضو عین چاپ کتاب (مثل "writer" یا "anti-war" یا "supported") */
  word: string;
  /** کلیدهای نرمال‌شدهٔ جست‌وجو — تولید مکانیکی (verbatim + ساده‌سازی صرفی) */
  keys: string[];
  /** مثال چاپی مخصوص این عضو (فقط unit 10 — سطر خود عضو در census) — وگرنه خالی */
  example?: string;
}

/** R3-d: سطر خانوادهٔ واژگانی چاپی کتاب (درس‌های word formation) — عین census tracked
 *  منبع تولید: کپچر دوگذر census (صفر مقدار ساختگی — قواعد در اسکریپت تولیدکننده) */
export interface WordFamilyRow {
  /** مدخل چاپی عین کتاب — مثل "-er" / "anti" / "SPECT" / "inspector" */
  entry: string;
  /** شماره درس کتاب */
  lesson: number;
  /** گروه چاپی census — مثل "Common noun suffixes" یا برچسب کلاس-واژه */
  group: string;
  /** pos چاپی اگر چاپ شده باشد (مثل "(nouns)") — وگرنه خالی */
  pos: string;
  /** تعریف چاپی اگر چاپ شده باشد — وگرنه خالی */
  definition: string;
  /** IPA چاپی اگر چاپ شده باشد — وگرنه خالی */
  phonetic: string;
  /** مثال چاپی verbatim سطر (منبع اعضا برای واحدهای ۸/۹) — وگرنه خالی */
  example: string;
  members: WordFamilyMember[];
}

/** R3-e (گیت STEP 6 — فرمان مالک trace 1a2043987aa69c95 — ۱۴۰۵/۹/۱): سطر حس چاپی شماره‌دار کتاب.
 *  فقط از مدخل‌های نمونهٔ دیکشنری که کتاب خودش در صفحات آموزش دیکشنری‌به‌کاری چاپ کرده است
 *  (upper p.12 واحدهای malignant/hairy · preint p.8 seat¹) — عین کپچر راستی‌آزمایی‌شدهٔ
 *  docs/qa/viu-r3e-capture-<book>/ (رونویسی 300DPI + پروب 500DPI + cross-check دوگذر) — صفر استنتاج.
 *  خوشه‌های اپراتوری/تمرینی (elem u11 · upper u86) و آرتیفکت‌ها (upper 36/100) با کنترل منفی/سند رد شدند. */
export interface WordSenseRow {
  /** واژهٔ چاپی عین کتاب — مثل "ma·lig·nant" یا "seat¹" (نقطهٔ هجایی/بالانویس عین چاپ) */
  word: string;
  /** شمارهٔ درس کتاب */
  lesson: number;
  /** شمارهٔ حس چاپی — عین عدد چاپ‌شده در مدخل */
  sense: string;
  /** pos چاپی اگر چاپ شده باشد — وگرنه خالی */
  pos: string;
  /** برچسب دستوری چاپی مثل [C]/[U] — وگرنه خالی */
  labels: string;
  /** برچسب موضوعی چاپی مثل SIT — وگرنه خالی */
  subject: string;
  /** IPA چاپی — هستهٔ پایدار خوانش‌های هم‌خوان گذرها (نویسه‌های ناسازگار حذف و ثبت شده‌اند) */
  phonetic: string;
  /** تعریف چاپی verbatim — زیرحس‌های چاپی (a)/(b) داخل همین متن هستند */
  definition: string;
  /** مثال‌های چاپی verbatim به ترتیب چاپ */
  examples: string[];
  /** برچسب صفحهٔ چاپی کتاب */
  page: string;
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
