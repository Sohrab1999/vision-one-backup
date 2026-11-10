// واژگان درس‌های English Vocabulary in Use — Pre-int & Int (پارتیت 1) — استخراج VLM از اسکن PDF
// word = عین چاپ کتاب · meaning = ترجمهٔ ماشینی GLM (کلاس FA-NEW — اثبات صحت ترجمه نیست)
import type { VocabWord } from "../types";

type Row = Omit<VocabWord, "lesson"> & { lesson: number; lessonLabel: string };

const ROWS: Row[] = [
  {
    word: "routine",
    meaning: "روتین؛ کارهای تکراری روزمره",
    lesson: 1,
    pos: "n.",
    lessonLabel: "درس 1 — یادگیری و مرور با این کتاب"
  },
  {
    word: "self-study",
    meaning: "خودخوانی؛ مطالعهٔ مستقل (تنها)",
    lesson: 1,
    pos: "n.",
    lessonLabel: "درس 1 — یادگیری و مرور با این کتاب"
  },
  {
    word: "spend (time)",
    meaning: "صرف کردن (وقت)",
    lesson: 1,
    pos: "v.",
    lessonLabel: "درس 1 — یادگیری و مرور با این کتاب"
  },
  {
    word: "at least",
    meaning: "حداقل",
    lesson: 1,
    pos: "phr.",
    lessonLabel: "درس 1 — یادگیری و مرور با این کتاب"
  },
  {
    word: "revise",
    meaning: "مرور کردن",
    lesson: 1,
    pos: "v.",
    lessonLabel: "درس 1 — یادگیری و مرور با این کتاب"
  },
  {
    word: "revision",
    meaning: "مرور",
    lesson: 1,
    pos: "n.",
    lessonLabel: "درس 1 — یادگیری و مرور با این کتاب"
  },
  {
    word: "maintain your interest",
    meaning: "حفظ علاقه/علاقه‌مندی خود را بالا نگه داشتن",
    lesson: 1,
    pos: "phr.",
    lessonLabel: "درس 1 — یادگیری و مرور با این کتاب"
  },
  {
    word: "choose",
    meaning: "انتخاب کردن",
    lesson: 1,
    pos: "v.",
    lessonLabel: "درس 1 — یادگیری و مرور با این کتاب"
  },
  {
    word: "interest",
    meaning: "علاقه‌مند کردن؛ جذب کردن",
    lesson: 1,
    pos: "v.",
    lessonLabel: "درس 1 — یادگیری و مرور با این کتاب"
  },
  {
    word: "the whole",
    meaning: "تمام؛ کل",
    lesson: 1,
    pos: "phr.",
    lessonLabel: "درس 1 — یادگیری و مرور با این کتاب"
  },
  {
    word: "left-hand page",
    meaning: "صفحهٔ سمت چپ",
    lesson: 1,
    pos: "phr.",
    lessonLabel: "درس 1 — یادگیری و مرور با این کتاب"
  },
  {
    word: "do the exercises",
    meaning: "تمرین‌ها را انجام دادن",
    lesson: 1,
    pos: "phr.",
    lessonLabel: "درس 1 — یادگیری و مرور با این کتاب"
  },
  {
    word: "active",
    meaning: "فعال",
    lesson: 1,
    pos: "adj.",
    lessonLabel: "درس 1 — یادگیری و مرور با این کتاب"
  },
  {
    word: "highlighter",
    meaning: "ماژیک هایلایت",
    lesson: 1,
    pos: "n.",
    lessonLabel: "درس 1 — یادگیری و مرور با این کتاب"
  },
  {
    word: "say the words aloud",
    meaning: "کلمات را با صدای بلند گفتن",
    lesson: 1,
    pos: "phr.",
    lessonLabel: "درس 1 — یادگیری و مرور با این کتاب"
  },
  {
    word: "pronounce",
    meaning: "تلفظ کردن",
    lesson: 1,
    pos: "v.",
    lessonLabel: "درس 1 — یادگیری و مرور با این کتاب"
  },
  {
    word: "pronunciation",
    meaning: "تلفظ",
    lesson: 1,
    pos: "n.",
    lessonLabel: "درس 1 — یادگیری و مرور با این کتاب"
  },
  {
    word: "silently",
    meaning: "بی‌صدا؛ در ذهن",
    lesson: 1,
    pos: "adv.",
    lessonLabel: "درس 1 — یادگیری و مرور با این کتاب"
  },
  {
    word: "notebook",
    meaning: "دفترچه یادداشت",
    lesson: 1,
    pos: "n.",
    lessonLabel: "درس 1 — یادگیری و مرور با این کتاب"
  },
  {
    word: "rub them out",
    meaning: "پاک کردن (با پاک‌کن)",
    lesson: 1,
    pos: "phr.",
    lessonLabel: "درس 1 — یادگیری و مرور با این کتاب"
  },
  {
    word: "rubber",
    meaning: "پاک‌کن",
    lesson: 1,
    pos: "n.",
    lessonLabel: "درس 1 — یادگیری و مرور با این کتاب"
  },
  {
    word: "blank piece of paper",
    meaning: "برگهٔ کاغذ سفید/خالی",
    lesson: 1,
    pos: "phr.",
    lessonLabel: "درس 1 — یادگیری و مرور با این کتاب"
  },
  {
    word: "in bold",
    meaning: "با حروف پررنگ (بولد)",
    lesson: 1,
    pos: "phr.",
    lessonLabel: "درس 1 — یادگیری و مرور با این کتاب"
  },
  {
    word: "brackets",
    meaning: "پرانتز",
    lesson: 1,
    pos: "n.",
    lessonLabel: "درس 1 — یادگیری و مرور با این کتاب"
  },
  {
    word: "cover",
    meaning: "پوشاندن",
    lesson: 1,
    pos: "v.",
    lessonLabel: "درس 1 — یادگیری و مرور با این کتاب"
  },
  {
    word: "define",
    meaning: "تعریف کردن؛ معنی دادن",
    lesson: 1,
    pos: "v.",
    lessonLabel: "درس 1 — یادگیری و مرور با این کتاب"
  },
  {
    word: "definition",
    meaning: "تعریف؛ معنی",
    lesson: 1,
    pos: "n.",
    lessonLabel: "درس 1 — یادگیری و مرور با این کتاب"
  },
  {
    word: "Five minutes a day",
    meaning: "روزی پنج دقیقه",
    lesson: 1,
    pos: "phr.",
    lessonLabel: "درس 1 — یادگیری و مرور با این کتاب"
  },
  {
    word: "test yourself",
    meaning: "خود را آزمودن",
    lesson: 1,
    pos: "phr.",
    lessonLabel: "درس 1 — یادگیری و مرور با این کتاب"
  },
  {
    word: "write down",
    meaning: "نوشتن؛ یادداشت کردن",
    lesson: 1,
    pos: "phr.",
    lessonLabel: "درس 1 — یادگیری و مرور با این کتاب"
  },
  {
    word: "remember",
    meaning: "به یاد داشتن، یادآوری کردن",
    lesson: 2,
    pos: "v.",
    lessonLabel: "درس 2 — نگه‌داشتن دفترچهٔ واژگان"
  },
  {
    word: "pond",
    meaning: "حوض، برکه",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — نگه‌داشتن دفترچهٔ واژگان"
  },
  {
    word: "awful",
    meaning: "وحشتناک",
    lesson: 2,
    pos: "adj.",
    lessonLabel: "درس 2 — نگه‌داشتن دفترچهٔ واژگان"
  },
  {
    word: "ugly",
    meaning: "زشت",
    lesson: 2,
    pos: "adj.",
    lessonLabel: "درس 2 — نگه‌داشتن دفترچهٔ واژگان"
  },
  {
    word: "beautiful",
    meaning: "زیبا",
    lesson: 2,
    pos: "adj.",
    lessonLabel: "درس 2 — نگه‌داشتن دفترچهٔ واژگان"
  },
  {
    word: "terrible",
    meaning: "افتضاح، وحشتناک",
    lesson: 2,
    pos: "adj.",
    lessonLabel: "درس 2 — نگه‌داشتن دفترچهٔ واژگان"
  },
  {
    word: "saucepan",
    meaning: "قابلمه",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — نگه‌داشتن دفترچهٔ واژگان"
  },
  {
    word: "put on my gloves",
    meaning: "دستکش‌هایم را پوشیدن",
    lesson: 2,
    pos: "phr.",
    lessonLabel: "درس 2 — نگه‌داشتن دفترچهٔ واژگان"
  },
  {
    word: "ache",
    meaning: "درد",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — نگه‌داشتن دفترچهٔ واژگان"
  },
  {
    word: "gloves",
    meaning: "دستکش‌ها",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — نگه‌داشتن دفترچهٔ واژگان"
  },
  {
    word: "careful",
    meaning: "مراقب، مواظب",
    lesson: 2,
    pos: "adj.",
    lessonLabel: "درس 2 — نگه‌داشتن دفترچهٔ واژگان"
  },
  {
    word: "enjoy + -ing form",
    meaning: "لذت بردن (فعل + شکل ing)",
    lesson: 2,
    pos: "phr.",
    lessonLabel: "درس 2 — نگه‌داشتن دفترچهٔ واژگان"
  },
  {
    word: "weather",
    meaning: "هوا (آب‌وهوا)",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — نگه‌داشتن دفترچهٔ واژگان"
  },
  {
    word: "make a mistake",
    meaning: "اشتباه کردن",
    lesson: 2,
    pos: "phr.",
    lessonLabel: "درس 2 — نگه‌داشتن دفترچهٔ واژگان"
  },
  {
    word: "on the phone",
    meaning: "در حال صحبت تلفنی",
    lesson: 2,
    pos: "phr.",
    lessonLabel: "درس 2 — نگه‌داشتن دفترچهٔ واژگان"
  },
  {
    word: "(a) black coffee",
    meaning: "قهوه تلخ (بدون شیر)",
    lesson: 2,
    pos: "phr.",
    lessonLabel: "درس 2 — نگه‌داشتن دفترچهٔ واژگان"
  },
  {
    word: "purchase",
    meaning: "خریدن (رسمی)",
    lesson: 2,
    pos: "v.",
    lessonLabel: "درس 2 — نگه‌داشتن دفترچهٔ واژگان"
  },
  {
    word: "kids",
    meaning: "بچه‌ها (غیررسمی)",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — نگه‌داشتن دفترچهٔ واژگان"
  },
  {
    word: "blonde hair",
    meaning: "موی بلوند",
    lesson: 2,
    pos: "phr.",
    lessonLabel: "درس 2 — نگه‌داشتن دفترچهٔ واژگان"
  },
  {
    word: "black hair",
    meaning: "موی سیاه",
    lesson: 2,
    pos: "phr.",
    lessonLabel: "درس 2 — نگه‌داشتن دفترچهٔ واژگان"
  },
  {
    word: "get off the bus",
    meaning: "از اتوبوس پیاده شدن",
    lesson: 2,
    pos: "phr.",
    lessonLabel: "درس 2 — نگه‌داشتن دفترچهٔ واژگان"
  },
  {
    word: "finger",
    meaning: "انگشت",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — نگه‌داشتن دفترچهٔ واژگان"
  },
  {
    word: "thumb",
    meaning: "انگشت شست",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — نگه‌داشتن دفترچهٔ واژگان"
  },
  {
    word: "hand",
    meaning: "دست",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — نگه‌داشتن دفترچهٔ واژگان"
  },
  {
    word: "wrist",
    meaning: "مچ دست",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — نگه‌داشتن دفترچهٔ واژگان"
  },
  {
    word: "a decision",
    meaning: "تصمیم",
    lesson: 2,
    pos: "phr.",
    lessonLabel: "درس 2 — نگه‌داشتن دفترچهٔ واژگان"
  },
  {
    word: "a shower",
    meaning: "دوش (حمام)",
    lesson: 2,
    pos: "phr.",
    lessonLabel: "درس 2 — نگه‌داشتن دفترچهٔ واژگان"
  },
  {
    word: "a photograph",
    meaning: "عکس",
    lesson: 2,
    pos: "phr.",
    lessonLabel: "درس 2 — نگه‌داشتن دفترچهٔ واژگان"
  },
  {
    word: "take",
    meaning: "گرفتن، انجام دادن",
    lesson: 2,
    pos: "v.",
    lessonLabel: "درس 2 — نگه‌داشتن دفترچهٔ واژگان"
  },
  {
    word: "smile",
    meaning: "لبخند",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — نگه‌داشتن دفترچهٔ واژگان"
  },
  {
    word: "rise",
    meaning: "بالا رفتن، افزایش یافتن",
    lesson: 2,
    pos: "v.",
    lessonLabel: "درس 2 — نگه‌داشتن دفترچهٔ واژگان"
  },
  {
    word: "fall",
    meaning: "پایین آمدن، کاهش یافتن",
    lesson: 2,
    pos: "v.",
    lessonLabel: "درس 2 — نگه‌داشتن دفترچهٔ واژگان"
  },
  {
    word: "rise slowly",
    meaning: "به آرامی بالا رفتن",
    lesson: 2,
    pos: "phr.",
    lessonLabel: "درس 2 — نگه‌داشتن دفترچهٔ واژگان"
  },
  {
    word: "rise sharply",
    meaning: "به شدت بالا رفتن",
    lesson: 2,
    pos: "phr.",
    lessonLabel: "درس 2 — نگه‌داشتن دفترچهٔ واژگان"
  },
  {
    word: "fall slowly",
    meaning: "به آرامی پایین آمدن",
    lesson: 2,
    pos: "phr.",
    lessonLabel: "درس 2 — نگه‌داشتن دفترچهٔ واژگان"
  },
  {
    word: "fall sharply",
    meaning: "به شدت پایین آمدن",
    lesson: 2,
    pos: "phr.",
    lessonLabel: "درس 2 — نگه‌داشتن دفترچهٔ واژگان"
  },
  {
    word: "bilingual dictionary",
    meaning: "دیکشنری دوزبانه",
    lesson: 3,
    pos: "phr.",
    lessonLabel: "درس 3 — استفاده از فرهنگ لغت"
  },
  {
    word: "English–English dictionary",
    meaning: "دیکشنری انگلیسی به انگلیسی",
    lesson: 3,
    pos: "phr.",
    lessonLabel: "درس 3 — استفاده از فرهنگ لغت"
  },
  {
    word: "large dictionaries",
    meaning: "دیکشنری‌های بزرگ",
    lesson: 3,
    pos: "phr.",
    lessonLabel: "درس 3 — استفاده از فرهنگ لغت"
  },
  {
    word: "medium-sized dictionaries",
    meaning: "دیکشنری‌های متوسط",
    lesson: 3,
    pos: "phr.",
    lessonLabel: "درس 3 — استفاده از فرهنگ لغت"
  },
  {
    word: "look up a word",
    meaning: "جست‌وجوی یک کلمه (در دیکشنری)",
    lesson: 3,
    pos: "phr.",
    lessonLabel: "درس 3 — استفاده از فرهنگ لغت"
  },
  {
    word: "homesick",
    meaning: "دلتنگ خانه، دلتنگ وطن",
    lesson: 3,
    pos: "adj.",
    lessonLabel: "درس 3 — استفاده از فرهنگ لغت"
  },
  {
    word: "pronunciation",
    meaning: "تلفظ",
    lesson: 3,
    pos: "n.",
    lessonLabel: "درس 3 — استفاده از فرهنگ لغت"
  },
  {
    word: "part of speech",
    meaning: "قسمت речи / نقش دستوری کلمه",
    lesson: 3,
    pos: "phr.",
    lessonLabel: "درس 3 — استفاده از فرهنگ لغت"
  },
  {
    word: "dirty",
    meaning: "کثیف",
    lesson: 3,
    pos: "adj.",
    lessonLabel: "درس 3 — استفاده از فرهنگ لغت"
  },
  {
    word: "choose",
    meaning: "انتخاب کردن",
    lesson: 3,
    pos: "v.",
    lessonLabel: "درس 3 — استفاده از فرهنگ لغت"
  },
  {
    word: "law",
    meaning: "قانون",
    lesson: 3,
    pos: "n.",
    lessonLabel: "درس 3 — استفاده از فرهنگ لغت"
  },
  {
    word: "advice",
    meaning: "توصیه، نصیحت",
    lesson: 3,
    pos: "n.",
    lessonLabel: "درس 3 — استفاده از فرهنگ لغت"
  },
  {
    word: "begin",
    meaning: "شروع کردن",
    lesson: 3,
    pos: "v.",
    lessonLabel: "درس 3 — استفاده از فرهنگ لغت"
  },
  {
    word: "collocation",
    meaning: "هم‌آیی، ترکیب رایج کلمات",
    lesson: 3,
    pos: "n.",
    lessonLabel: "درس 3 — استفاده از فرهنگ لغت"
  },
  {
    word: "do homework",
    meaning: "تکالیف را انجام دادن",
    lesson: 3,
    pos: "phr.",
    lessonLabel: "درس 3 — استفاده از فرهنگ لغت"
  },
  {
    word: "depend on",
    meaning: "بستگی داشتن به",
    lesson: 3,
    pos: "phr.",
    lessonLabel: "درس 3 — استفاده از فرهنگ لغت"
  },
  {
    word: "platform",
    meaning: "سکوی ایستگاه قطار",
    lesson: 3,
    pos: "n.",
    lessonLabel: "درس 3 — استفاده از فرهنگ لغت"
  },
  {
    word: "polite",
    meaning: "مؤدب، باادب",
    lesson: 3,
    pos: "adj.",
    lessonLabel: "درس 3 — استفاده از فرهنگ لغت"
  },
  {
    word: "courteous",
    meaning: "مؤدب، محترمانه",
    lesson: 3,
    pos: "adj.",
    lessonLabel: "درس 3 — استفاده از فرهنگ لغت"
  },
  {
    word: "impolite",
    meaning: "بی‌ادب",
    lesson: 3,
    pos: "adj.",
    lessonLabel: "درس 3 — استفاده از فرهنگ لغت"
  },
  {
    word: "seat",
    meaning: "صندلی، جای نشستن",
    lesson: 3,
    pos: "n.",
    lessonLabel: "درس 3 — استفاده از فرهنگ لغت"
  },
  {
    word: "put a tick",
    meaning: "تیک زدن",
    lesson: 3,
    pos: "phr.",
    lessonLabel: "درس 3 — استفاده از فرهنگ لغت"
  },
  {
    word: "guess the meaning",
    meaning: "حدس زدن معنی",
    lesson: 3,
    pos: "phr.",
    lessonLabel: "درس 3 — استفاده از فرهنگ لغت"
  },
  {
    word: "carry on",
    meaning: "ادامه دادن",
    lesson: 3,
    pos: "phr.",
    lessonLabel: "درس 3 — استفاده از فرهنگ لغت"
  },
  {
    word: "see (= find out)",
    meaning: "فهمیدن، متوجه شدن",
    lesson: 3,
    pos: "v.",
    lessonLabel: "درس 3 — استفاده از فرهنگ لغت"
  },
  {
    word: "check the meaning",
    meaning: "بررسی کردن معنی",
    lesson: 3,
    pos: "phr.",
    lessonLabel: "درس 3 — استفاده از فرهنگ لغت"
  },
  {
    word: "monolingual dictionary",
    meaning: "دیکشنری تک‌زبانه",
    lesson: 3,
    pos: "phr.",
    lessonLabel: "درس 3 — استفاده از فرهنگ لغت"
  },
  {
    word: "definition",
    meaning: "تعریف",
    lesson: 3,
    pos: "n.",
    lessonLabel: "درس 3 — استفاده از فرهنگ لغت"
  },
  {
    word: "grammatical features",
    meaning: "ویژگی‌های دستوری",
    lesson: 3,
    pos: "phr.",
    lessonLabel: "درس 3 — استفاده از فرهنگ لغت"
  },
  {
    word: "common collocations",
    meaning: "هم‌آیی‌های رایج",
    lesson: 3,
    pos: "phr.",
    lessonLabel: "درس 3 — استفاده از فرهنگ لغت"
  },
  {
    word: "noun",
    meaning: "اسم",
    lesson: 4,
    pos: "n.",
    lessonLabel: "درس 4 — واژه‌های مربوط به زبان انگلیسی"
  },
  {
    word: "verb",
    meaning: "فعل",
    lesson: 4,
    pos: "n.",
    lessonLabel: "درس 4 — واژه‌های مربوط به زبان انگلیسی"
  },
  {
    word: "adjective",
    meaning: "صفت",
    lesson: 4,
    pos: "n.",
    lessonLabel: "درس 4 — واژه‌های مربوط به زبان انگلیسی"
  },
  {
    word: "adverb",
    meaning: "قید",
    lesson: 4,
    pos: "n.",
    lessonLabel: "درس 4 — واژه‌های مربوط به زبان انگلیسی"
  },
  {
    word: "preposition",
    meaning: "حرف اضافه",
    lesson: 4,
    pos: "n.",
    lessonLabel: "درس 4 — واژه‌های مربوط به زبان انگلیسی"
  },
  {
    word: "article",
    meaning: "حرف تعریف",
    lesson: 4,
    pos: "n.",
    lessonLabel: "درس 4 — واژه‌های مربوط به زبان انگلیسی"
  },
  {
    word: "definite article (the)",
    meaning: "حرف تعریف معین (the)",
    lesson: 4,
    pos: "phr.",
    lessonLabel: "درس 4 — واژه‌های مربوط به زبان انگلیسی"
  },
  {
    word: "indefinite article (a/an)",
    meaning: "حرف تعریف نامعین (a/an)",
    lesson: 4,
    pos: "phr.",
    lessonLabel: "درس 4 — واژه‌های مربوط به زبان انگلیسی"
  },
  {
    word: "uncountable noun (U)",
    meaning: "اسم غیرقابل شمارش",
    lesson: 4,
    pos: "n.",
    lessonLabel: "درس 4 — واژه‌های مربوط به زبان انگلیسی"
  },
  {
    word: "plural noun (pl)",
    meaning: "اسم جمع",
    lesson: 4,
    pos: "n.",
    lessonLabel: "درس 4 — واژه‌های مربوط به زبان انگلیسی"
  },
  {
    word: "infinitive",
    meaning: "مصدر",
    lesson: 4,
    pos: "n.",
    lessonLabel: "درس 4 — واژه‌های مربوط به زبان انگلیسی"
  },
  {
    word: "phrasal verb",
    meaning: "فعل عبارتی",
    lesson: 4,
    pos: "n.",
    lessonLabel: "درس 4 — واژه‌های مربوط به زبان انگلیسی"
  },
  {
    word: "idiom",
    meaning: "اصطلاح",
    lesson: 4,
    pos: "n.",
    lessonLabel: "درس 4 — واژه‌های مربوط به زبان انگلیسی"
  },
  {
    word: "transitive verb",
    meaning: "فعل متعدی",
    lesson: 4,
    pos: "n.",
    lessonLabel: "درس 4 — واژه‌های مربوط به زبان انگلیسی"
  },
  {
    word: "intransitive",
    meaning: "لازم (غیرمتعدی)",
    lesson: 4,
    pos: "adj.",
    lessonLabel: "درس 4 — واژه‌های مربوط به زبان انگلیسی"
  },
  {
    word: "informal",
    meaning: "غیررسمی",
    lesson: 4,
    pos: "adj.",
    lessonLabel: "درس 4 — واژه‌های مربوط به زبان انگلیسی"
  },
  {
    word: "formal",
    meaning: "رسمی",
    lesson: 4,
    pos: "adj.",
    lessonLabel: "درس 4 — واژه‌های مربوط به زبان انگلیسی"
  },
  {
    word: "synonym",
    meaning: "مترادف",
    lesson: 4,
    pos: "n.",
    lessonLabel: "درس 4 — واژه‌های مربوط به زبان انگلیسی"
  },
  {
    word: "opposite",
    meaning: "متضاد",
    lesson: 4,
    pos: "n.",
    lessonLabel: "درس 4 — واژه‌های مربوط به زبان انگلیسی"
  },
  {
    word: "prefix",
    meaning: "پیشوند",
    lesson: 4,
    pos: "n.",
    lessonLabel: "درس 4 — واژه‌های مربوط به زبان انگلیسی"
  },
  {
    word: "root",
    meaning: "ریشهٔ واژه",
    lesson: 4,
    pos: "n.",
    lessonLabel: "درس 4 — واژه‌های مربوط به زبان انگلیسی"
  },
  {
    word: "suffix",
    meaning: "پسوند",
    lesson: 4,
    pos: "n.",
    lessonLabel: "درس 4 — واژه‌های مربوط به زبان انگلیسی"
  },
  {
    word: "phonemic symbols",
    meaning: "نمادهای آوایی",
    lesson: 4,
    pos: "phr.",
    lessonLabel: "درس 4 — واژه‌های مربوط به زبان انگلیسی"
  },
  {
    word: "syllable",
    meaning: "هجا",
    lesson: 4,
    pos: "n.",
    lessonLabel: "درس 4 — واژه‌های مربوط به زبان انگلیسی"
  },
  {
    word: "main stress",
    meaning: "تکیهٔ اصلی",
    lesson: 4,
    pos: "phr.",
    lessonLabel: "درس 4 — واژه‌های مربوط به زبان انگلیسی"
  },
  {
    word: "full stop",
    meaning: "نقطه",
    lesson: 4,
    pos: "n.",
    lessonLabel: "درس 4 — واژه‌های مربوط به زبان انگلیسی"
  },
  {
    word: "comma",
    meaning: "ویرگول",
    lesson: 4,
    pos: "n.",
    lessonLabel: "درس 4 — واژه‌های مربوط به زبان انگلیسی"
  },
  {
    word: "brackets",
    meaning: "پرانتز",
    lesson: 4,
    pos: "n.",
    lessonLabel: "درس 4 — واژه‌های مربوط به زبان انگلیسی"
  },
  {
    word: "hyphen",
    meaning: "خط تیره",
    lesson: 4,
    pos: "n.",
    lessonLabel: "درس 4 — واژه‌های مربوط به زبان انگلیسی"
  },
  {
    word: "question mark",
    meaning: "علامت سؤال",
    lesson: 4,
    pos: "n.",
    lessonLabel: "درس 4 — واژه‌های مربوط به زبان انگلیسی"
  },
  {
    word: "chalk",
    meaning: "گچ",
    lesson: 5,
    pos: "n.",
    lessonLabel: "درس 5 — زبان کلاس درس"
  },
  {
    word: "rubber",
    meaning: "پاک‌کن",
    lesson: 5,
    pos: "n.",
    lessonLabel: "درس 5 — زبان کلاس درس"
  },
  {
    word: "OHP (overhead projector)",
    meaning: "پروژکتور (اپی‌اسکوپ)",
    lesson: 5,
    pos: "n.",
    lessonLabel: "درس 5 — زبان کلاس درس"
  },
  {
    word: "OHT (overhead transparency)",
    meaning: "شفاف (اسلاید) مخصوص پروژکتور",
    lesson: 5,
    pos: "n.",
    lessonLabel: "درس 5 — زبان کلاس درس"
  },
  {
    word: "board pen",
    meaning: "ماژیک تخته",
    lesson: 5,
    pos: "n.",
    lessonLabel: "درس 5 — زبان کلاس درس"
  },
  {
    word: "board",
    meaning: "تخته",
    lesson: 5,
    pos: "n.",
    lessonLabel: "درس 5 — زبان کلاس درس"
  },
  {
    word: "file",
    meaning: "پوشه/کلاسور",
    lesson: 5,
    pos: "n.",
    lessonLabel: "درس 5 — زبان کلاس درس"
  },
  {
    word: "notebook",
    meaning: "دفترچه یادداشت",
    lesson: 5,
    pos: "n.",
    lessonLabel: "درس 5 — زبان کلاس درس"
  },
  {
    word: "pencil",
    meaning: "مداد",
    lesson: 5,
    pos: "n.",
    lessonLabel: "درس 5 — زبان کلاس درس"
  },
  {
    word: "pencil sharpener",
    meaning: "مدادتراش",
    lesson: 5,
    pos: "n.",
    lessonLabel: "درس 5 — زبان کلاس درس"
  },
  {
    word: "socket",
    meaning: "پریز برق",
    lesson: 5,
    pos: "n.",
    lessonLabel: "درس 5 — زبان کلاس درس"
  },
  {
    word: "highlighter (pen)",
    meaning: "ماژیک هایلایتر",
    lesson: 5,
    pos: "n.",
    lessonLabel: "درس 5 — زبان کلاس درس"
  },
  {
    word: "plug",
    meaning: "دوشاخه برق",
    lesson: 5,
    pos: "n.",
    lessonLabel: "درس 5 — زبان کلاس درس"
  },
  {
    word: "bag",
    meaning: "کیف/کوله",
    lesson: 5,
    pos: "n.",
    lessonLabel: "درس 5 — زبان کلاس درس"
  },
  {
    word: "tape recorder/cassette recorder",
    meaning: "ضبط صوت (ماشین کاست)",
    lesson: 5,
    pos: "n.",
    lessonLabel: "درس 5 — زبان کلاس درس"
  },
  {
    word: "cassette/tape",
    meaning: "کاست",
    lesson: 5,
    pos: "n.",
    lessonLabel: "درس 5 — زبان کلاس درس"
  },
  {
    word: "photocopier",
    meaning: "ماشین فتوکپی",
    lesson: 5,
    pos: "n.",
    lessonLabel: "درس 5 — زبان کلاس درس"
  },
  {
    word: "briefcase",
    meaning: "کیف کوچک اداری",
    lesson: 5,
    pos: "n.",
    lessonLabel: "درس 5 — زبان کلاس درس"
  },
  {
    word: "video",
    meaning: "ویدئو (ضبط‌کننده ویدئو)",
    lesson: 5,
    pos: "n.",
    lessonLabel: "درس 5 — زبان کلاس درس"
  },
  {
    word: "video a programme",
    meaning: "برنامه‌ای را با ویدئو ضبط کردن",
    lesson: 5,
    pos: "v.",
    lessonLabel: "درس 5 — زبان کلاس درس"
  },
  {
    word: "photocopy",
    meaning: "فتوکپی گرفتن",
    lesson: 5,
    pos: "v.",
    lessonLabel: "درس 5 — زبان کلاس درس"
  },
  {
    word: "highlight",
    meaning: "با هایلایتر علامت گذاشتن",
    lesson: 5,
    pos: "v.",
    lessonLabel: "درس 5 — زبان کلاس درس"
  },
  {
    word: "file some papers",
    meaning: "کاغذها را در پوشه گذاشتن",
    lesson: 5,
    pos: "v.",
    lessonLabel: "درس 5 — زبان کلاس درس"
  },
  {
    word: "look up a word",
    meaning: "پیدا کردن معنای یک واژه در فرهنگ لغت",
    lesson: 5,
    pos: "phr.",
    lessonLabel: "درس 5 — زبان کلاس درس"
  },
  {
    word: "borrow",
    meaning: "قرض گرفتن (چیزی را استفاده و سپس برگرداندن)",
    lesson: 5,
    pos: "v.",
    lessonLabel: "درس 5 — زبان کلاس درس"
  },
  {
    word: "rub out",
    meaning: "پاک کردن (با پاک‌کن)",
    lesson: 5,
    pos: "phr.",
    lessonLabel: "درس 5 — زبان کلاس درس"
  },
  {
    word: "plug in",
    meaning: "به برق زدن (دوشاخه را در پریز گذاشتن)",
    lesson: 5,
    pos: "phr.",
    lessonLabel: "درس 5 — زبان کلاس درس"
  },
  {
    word: "turn up",
    meaning: "بلند کردن (صدا)",
    lesson: 5,
    pos: "phr.",
    lessonLabel: "درس 5 — زبان کلاس درس"
  },
  {
    word: "turn down",
    meaning: "کم کردن (صدا)",
    lesson: 5,
    pos: "phr.",
    lessonLabel: "درس 5 — زبان کلاس درس"
  },
  {
    word: "rub things off the board",
    meaning: "پاک کردن نوشته‌ها از تخته",
    lesson: 5,
    pos: "phr.",
    lessonLabel: "درس 5 — زبان کلاس درس"
  },
  {
    word: "correct",
    meaning: "تصحیح کردن",
    lesson: 5,
    pos: "v.",
    lessonLabel: "درس 5 — زبان کلاس درس"
  },
  {
    word: "clean the board",
    meaning: "پاک کردن تمام نوشته‌های تخته",
    lesson: 5,
    pos: "phr.",
    lessonLabel: "درس 5 — زبان کلاس درس"
  },
  {
    word: "write (these words) down",
    meaning: "نوشتن (روی کاغذ/در دفتر)",
    lesson: 5,
    pos: "phr.",
    lessonLabel: "درس 5 — زبان کلاس درس"
  },
  {
    word: "swap places",
    meaning: "جابه‌جا شدن (جا عوض کردن)",
    lesson: 5,
    pos: "phr.",
    lessonLabel: "درس 5 — زبان کلاس درس"
  },
  {
    word: "share",
    meaning: "استفاده مشترک از چیزی با کسی",
    lesson: 5,
    pos: "v.",
    lessonLabel: "درس 5 — زبان کلاس درس"
  },
  {
    word: "repeat",
    meaning: "تکرار کردن",
    lesson: 5,
    pos: "v.",
    lessonLabel: "درس 5 — زبان کلاس درس"
  },
  {
    word: "What does 'plug' mean?",
    meaning: "«plug» یعنی چه؟",
    lesson: 5,
    pos: "phr.",
    lessonLabel: "درس 5 — زبان کلاس درس"
  },
  {
    word: "How do you pronounce it?",
    meaning: "چطور تلفظ می‌شود؟",
    lesson: 5,
    pos: "phr.",
    lessonLabel: "درس 5 — زبان کلاس درس"
  },
  {
    word: "How do you spell 'bicycle'?",
    meaning: "«bicycle» چطور املای (هجی) می‌شود؟",
    lesson: 5,
    pos: "phr.",
    lessonLabel: "درس 5 — زبان کلاس درس"
  },
  {
    word: "How do you use 'anyway' in a sentence?",
    meaning: "«anyway» را چطور در جمله به کار می‌برند؟",
    lesson: 5,
    pos: "phr.",
    lessonLabel: "درس 5 — زبان کلاس درس"
  },
  {
    word: "What's the difference between 'lend' and 'borrow'?",
    meaning: "تفاوت بین «lend» و «borrow» چیست؟",
    lesson: 5,
    pos: "phr.",
    lessonLabel: "درس 5 — زبان کلاس درس"
  },
  {
    word: "unhappy",
    meaning: "ناراحت، شاد نیست",
    lesson: 6,
    pos: "adj.",
    lessonLabel: "درس 6 — پیشوندها"
  },
  {
    word: "impossible",
    meaning: "غیرممکن",
    lesson: 6,
    pos: "adj.",
    lessonLabel: "درس 6 — پیشوندها"
  },
  {
    word: "incorrect",
    meaning: "نادرست",
    lesson: 6,
    pos: "adj.",
    lessonLabel: "درس 6 — پیشوندها"
  },
  {
    word: "dislike",
    meaning: "دوست نداشتن",
    lesson: 6,
    pos: "v.",
    lessonLabel: "درس 6 — پیشوندها"
  },
  {
    word: "illegal",
    meaning: "غیرقانونی (= بر خلاف قانون/نادرست)",
    lesson: 6,
    pos: "adj.",
    lessonLabel: "درس 6 — پیشوندها"
  },
  {
    word: "irregular",
    meaning: "بی‌قاعده، نامنظم",
    lesson: 6,
    pos: "adj.",
    lessonLabel: "درس 6 — پیشوندها"
  },
  {
    word: "unfriendly",
    meaning: "غیردوستانه، سرد",
    lesson: 6,
    pos: "adj.",
    lessonLabel: "درس 6 — پیشوندها"
  },
  {
    word: "unable",
    meaning: "ناتوان",
    lesson: 6,
    pos: "adj.",
    lessonLabel: "درس 6 — پیشوندها"
  },
  {
    word: "unusual",
    meaning: "غیرمعمولی",
    lesson: 6,
    pos: "adj.",
    lessonLabel: "درس 6 — پیشوندها"
  },
  {
    word: "unnecessary",
    meaning: "غیرضروری",
    lesson: 6,
    pos: "adj.",
    lessonLabel: "درس 6 — پیشوندها"
  },
  {
    word: "unemployed",
    meaning: "بیکار (= بدون شغل)",
    lesson: 6,
    pos: "adj.",
    lessonLabel: "درس 6 — پیشوندها"
  },
  {
    word: "untidy",
    meaning: "نامرتب (= درهم‌ریخته)",
    lesson: 6,
    pos: "adj.",
    lessonLabel: "درس 6 — پیشوندها"
  },
  {
    word: "unkind",
    meaning: "بدجنس، نامهربان",
    lesson: 6,
    pos: "adj.",
    lessonLabel: "درس 6 — پیشوندها"
  },
  {
    word: "unpleasant",
    meaning: "ناخوشایند (= وحشتناک/بد)",
    lesson: 6,
    pos: "adj.",
    lessonLabel: "درس 6 — پیشوندها"
  },
  {
    word: "invisible",
    meaning: "نامرئی (= دیده نمی‌شود)",
    lesson: 6,
    pos: "adj.",
    lessonLabel: "درس 6 — پیشوندها"
  },
  {
    word: "informal",
    meaning: "غیررسمی",
    lesson: 6,
    pos: "adj.",
    lessonLabel: "درس 6 — پیشوندها"
  },
  {
    word: "inadequate",
    meaning: "ناکافی (= به اندازه کافی خوب نیست)",
    lesson: 6,
    pos: "adj.",
    lessonLabel: "درس 6 — پیشوندها"
  },
  {
    word: "impolite",
    meaning: "بی‌ادب",
    lesson: 6,
    pos: "adj.",
    lessonLabel: "درس 6 — پیشوندها"
  },
  {
    word: "impatient",
    meaning: "بی‌حوصله، کم‌طاقت",
    lesson: 6,
    pos: "adj.",
    lessonLabel: "درس 6 — پیشوندها"
  },
  {
    word: "immoral",
    meaning: "غیراخلاقی",
    lesson: 6,
    pos: "adj.",
    lessonLabel: "درس 6 — پیشوندها"
  },
  {
    word: "illegible",
    meaning: "ناخوانا (= به‌خاطر بدخطی خوانده نمی‌شود)",
    lesson: 6,
    pos: "adj.",
    lessonLabel: "درس 6 — پیشوندها"
  },
  {
    word: "irresponsible",
    meaning: "بی‌مسئولیت",
    lesson: 6,
    pos: "adj.",
    lessonLabel: "درس 6 — پیشوندها"
  },
  {
    word: "dishonest",
    meaning: "دروغگو، ناآدم‌حال‌به‌کن",
    lesson: 6,
    pos: "adj.",
    lessonLabel: "درس 6 — پیشوندها"
  },
  {
    word: "disagree",
    meaning: "مخالفت کردن، موافق نبودن",
    lesson: 6,
    pos: "v.",
    lessonLabel: "درس 6 — پیشوندها"
  },
  {
    word: "disappear",
    meaning: "ناپدید شدن",
    lesson: 6,
    pos: "v.",
    lessonLabel: "درس 6 — پیشوندها"
  },
  {
    word: "unlock",
    meaning: "قفل را باز کردن",
    lesson: 6,
    pos: "v.",
    lessonLabel: "درس 6 — پیشوندها"
  },
  {
    word: "get dressed",
    meaning: "لباس پوشیدن (= لباس‌هایش را پوشیدن)",
    lesson: 6,
    pos: "phr.",
    lessonLabel: "درس 6 — پیشوندها"
  },
  {
    word: "get undressed",
    meaning: "لباس درآوردن (= لباس‌هایش را درآوردن)",
    lesson: 6,
    pos: "phr.",
    lessonLabel: "درس 6 — پیشوندها"
  },
  {
    word: "pack my suitcase/do my packing",
    meaning: "چمدان بستن/بار بستن",
    lesson: 6,
    pos: "phr.",
    lessonLabel: "درس 6 — پیشوندها"
  },
  {
    word: "unpack",
    meaning: "بار خالی کردن (= چیزها را بیرون آوردن)",
    lesson: 6,
    pos: "v.",
    lessonLabel: "درس 6 — پیشوندها"
  },
  {
    word: "reopen",
    meaning: "دوباره باز کردن/شدن",
    lesson: 6,
    pos: "v.",
    lessonLabel: "درس 6 — پیشوندها"
  },
  {
    word: "retake/redo",
    meaning: "دوباره شرکت کردن/دوباره انجام دادن",
    lesson: 6,
    pos: "v.",
    lessonLabel: "درس 6 — پیشوندها"
  },
  {
    word: "overdo",
    meaning: "زیاده‌روی کردن (= بیش از حد کار کردن)",
    lesson: 6,
    pos: "v.",
    lessonLabel: "درس 6 — پیشوندها"
  },
  {
    word: "oversleep",
    meaning: "بیش از حد خوابیدن، از خواب پریدن",
    lesson: 6,
    pos: "v.",
    lessonLabel: "درس 6 — پیشوندها"
  },
  {
    word: "overcharge",
    meaning: "گران فروختن، بیش از اندازه پول گرفتن (= پول زیادی خواستن)",
    lesson: 6,
    pos: "v.",
    lessonLabel: "درس 6 — پیشوندها"
  },
  {
    word: "misunderstand",
    meaning: "بد فهمیدن، سوءتفاهم کردن",
    lesson: 6,
    pos: "v.",
    lessonLabel: "درس 6 — پیشوندها"
  },
  {
    word: "misread",
    meaning: "بد خواندن، نادرست خواندن",
    lesson: 6,
    pos: "v.",
    lessonLabel: "درس 6 — پیشوندها"
  },
  {
    word: "overate",
    meaning: "پرخوری کرد",
    lesson: 6,
    pos: "v.",
    lessonLabel: "درس 6 — پیشوندها"
  },
  {
    word: "improve (= get better)",
    meaning: "بهبود یافتن",
    lesson: 7,
    pos: "v.",
    lessonLabel: "درس 7 — پسوندهای اسم"
  },
  {
    word: "improvement",
    meaning: "بهبود",
    lesson: 7,
    pos: "n.",
    lessonLabel: "درس 7 — پسوندهای اسم"
  },
  {
    word: "govern (= control affairs of a city or country)",
    meaning: "حکومت کردن",
    lesson: 7,
    pos: "v.",
    lessonLabel: "درس 7 — پسوندهای اسم"
  },
  {
    word: "government",
    meaning: "دولت؛ حکومت",
    lesson: 7,
    pos: "n.",
    lessonLabel: "درس 7 — پسوندهای اسم"
  },
  {
    word: "manage (= direct or control a business)",
    meaning: "مدیریت کردن",
    lesson: 7,
    pos: "v.",
    lessonLabel: "درس 7 — پسوندهای اسم"
  },
  {
    word: "management",
    meaning: "مدیریت",
    lesson: 7,
    pos: "n.",
    lessonLabel: "درس 7 — پسوندهای اسم"
  },
  {
    word: "elect (= choose somebody by voting)",
    meaning: "انتخاب کردن (با رأی)",
    lesson: 7,
    pos: "v.",
    lessonLabel: "درس 7 — پسوندهای اسم"
  },
  {
    word: "election",
    meaning: "انتخابات",
    lesson: 7,
    pos: "n.",
    lessonLabel: "درس 7 — پسوندهای اسم"
  },
  {
    word: "discuss (= talk about something seriously)",
    meaning: "بحث کردن",
    lesson: 7,
    pos: "v.",
    lessonLabel: "درس 7 — پسوندهای اسم"
  },
  {
    word: "discussion",
    meaning: "بحث",
    lesson: 7,
    pos: "n.",
    lessonLabel: "درس 7 — پسوندهای اسم"
  },
  {
    word: "inform (= tell someone something)",
    meaning: "اطلاع دادن",
    lesson: 7,
    pos: "v.",
    lessonLabel: "درس 7 — پسوندهای اسم"
  },
  {
    word: "information",
    meaning: "اطلاعات",
    lesson: 7,
    pos: "n.",
    lessonLabel: "درس 7 — پسوندهای اسم"
  },
  {
    word: "jog (= running to keep fit or for pleasure)",
    meaning: "نرم دویدن",
    lesson: 7,
    pos: "v.",
    lessonLabel: "درس 7 — پسوندهای اسم"
  },
  {
    word: "jogging",
    meaning: "نرم دویدن",
    lesson: 7,
    pos: "n.",
    lessonLabel: "درس 7 — پسوندهای اسم"
  },
  {
    word: "spell (e.g. S-P-E-L-L)",
    meaning: "هجی کردن",
    lesson: 7,
    pos: "v.",
    lessonLabel: "درس 7 — پسوندهای اسم"
  },
  {
    word: "spelling",
    meaning: "املا",
    lesson: 7,
    pos: "n.",
    lessonLabel: "درس 7 — پسوندهای اسم"
  },
  {
    word: "weak (opp strong)",
    meaning: "ضعیف",
    lesson: 7,
    pos: "adj.",
    lessonLabel: "درس 7 — پسوندهای اسم"
  },
  {
    word: "weakness",
    meaning: "ضعف",
    lesson: 7,
    pos: "n.",
    lessonLabel: "درس 7 — پسوندهای اسم"
  },
  {
    word: "happy",
    meaning: "خوشحال",
    lesson: 7,
    pos: "adj.",
    lessonLabel: "درس 7 — پسوندهای اسم"
  },
  {
    word: "happiness",
    meaning: "خوشحالی",
    lesson: 7,
    pos: "n.",
    lessonLabel: "درس 7 — پسوندهای اسم"
  },
  {
    word: "ill (= sick/not well)",
    meaning: "بیمار",
    lesson: 7,
    pos: "adj.",
    lessonLabel: "درس 7 — پسوندهای اسم"
  },
  {
    word: "illness",
    meaning: "بیماری",
    lesson: 7,
    pos: "n.",
    lessonLabel: "درس 7 — پسوندهای اسم"
  },
  {
    word: "stupid (opp intelligent, clever)",
    meaning: "احمق",
    lesson: 7,
    pos: "adj.",
    lessonLabel: "درس 7 — پسوندهای اسم"
  },
  {
    word: "stupidity",
    meaning: "حماقت",
    lesson: 7,
    pos: "n.",
    lessonLabel: "درس 7 — پسوندهای اسم"
  },
  {
    word: "active",
    meaning: "فعال",
    lesson: 7,
    pos: "adj.",
    lessonLabel: "درس 7 — پسوندهای اسم"
  },
  {
    word: "activity",
    meaning: "فعالیت",
    lesson: 7,
    pos: "n.",
    lessonLabel: "درس 7 — پسوندهای اسم"
  },
  {
    word: "similar (= almost the same; opp different)",
    meaning: "مشابه",
    lesson: 7,
    pos: "adj.",
    lessonLabel: "درس 7 — پسوندهای اسم"
  },
  {
    word: "similarity",
    meaning: "شباهت",
    lesson: 7,
    pos: "n.",
    lessonLabel: "درس 7 — پسوندهای اسم"
  },
  {
    word: "educate",
    meaning: "آموزش دادن",
    lesson: 7,
    pos: "v.",
    lessonLabel: "درس 7 — پسوندهای اسم"
  },
  {
    word: "education",
    meaning: "آموزش",
    lesson: 7,
    pos: "n.",
    lessonLabel: "درس 7 — پسوندهای اسم"
  },
  {
    word: "advertise",
    meaning: "تبلیغ کردن",
    lesson: 7,
    pos: "v.",
    lessonLabel: "درس 7 — پسوندهای اسم"
  },
  {
    word: "advertisement",
    meaning: "آگهی",
    lesson: 7,
    pos: "n.",
    lessonLabel: "درس 7 — پسوندهای اسم"
  },
  {
    word: "-er",
    meaning: "پسوند فاعل/شغل",
    lesson: 7,
    lessonLabel: "درس 7 — پسوندهای اسم"
  },
  {
    word: "-or",
    meaning: "پسوند فاعل/شغل",
    lesson: 7,
    lessonLabel: "درس 7 — پسوندهای اسم"
  },
  {
    word: "-ist",
    meaning: "پسوند فاعل/شغل",
    lesson: 7,
    lessonLabel: "درس 7 — پسوندهای اسم"
  },
  {
    word: "ballet dancer",
    meaning: "رقصنده باله",
    lesson: 7,
    pos: "n.",
    lessonLabel: "درس 7 — پسوندهای اسم"
  },
  {
    word: "pop singer",
    meaning: "خواننده پاپ",
    lesson: 7,
    pos: "n.",
    lessonLabel: "درس 7 — پسوندهای اسم"
  },
  {
    word: "murderer (= person who kills someone)",
    meaning: "قاتل",
    lesson: 7,
    pos: "n.",
    lessonLabel: "درس 7 — پسوندهای اسم"
  },
  {
    word: "bus driver",
    meaning: "راننده اتوبوس",
    lesson: 7,
    pos: "n.",
    lessonLabel: "درس 7 — پسوندهای اسم"
  },
  {
    word: "shop manager",
    meaning: "مدیر مغازه",
    lesson: 7,
    pos: "n.",
    lessonLabel: "درس 7 — پسوندهای اسم"
  },
  {
    word: "professional footballer",
    meaning: "فوتبالیست حرفه‌ای",
    lesson: 7,
    pos: "n.",
    lessonLabel: "درس 7 — پسوندهای اسم"
  },
  {
    word: "employer",
    meaning: "کارفرما",
    lesson: 7,
    pos: "n.",
    lessonLabel: "درس 7 — پسوندهای اسم"
  },
  {
    word: "television actor",
    meaning: "بازیگر تلویزیون",
    lesson: 7,
    pos: "n.",
    lessonLabel: "درس 7 — پسوندهای اسم"
  },
  {
    word: "film director",
    meaning: "کارگردان فیلم",
    lesson: 7,
    pos: "n.",
    lessonLabel: "درس 7 — پسوندهای اسم"
  },
  {
    word: "translator",
    meaning: "مترجم",
    lesson: 7,
    pos: "n.",
    lessonLabel: "درس 7 — پسوندهای اسم"
  },
  {
    word: "computer operator",
    meaning: "اپراتور رایانه",
    lesson: 7,
    pos: "n.",
    lessonLabel: "درس 7 — پسوندهای اسم"
  },
  {
    word: "artist, e.g. Picasso",
    meaning: "هنرمند، مثل پیکاسو",
    lesson: 7,
    pos: "n.",
    lessonLabel: "درس 7 — پسوندهای اسم"
  },
  {
    word: "economist",
    meaning: "اقتصاددان",
    lesson: 7,
    pos: "n.",
    lessonLabel: "درس 7 — پسوندهای اسم"
  },
  {
    word: "psychologist",
    meaning: "روانشناس",
    lesson: 7,
    pos: "n.",
    lessonLabel: "درس 7 — پسوندهای اسم"
  },
  {
    word: "journalist",
    meaning: "روزنامه‌نگار",
    lesson: 7,
    pos: "n.",
    lessonLabel: "درس 7 — پسوندهای اسم"
  },
  {
    word: "dangerous",
    meaning: "خطرناک",
    lesson: 8,
    pos: "adj.",
    lessonLabel: "درس 8 — پسوندهای صفت"
  },
  {
    word: "famous",
    meaning: "مشهور، معروف",
    lesson: 8,
    pos: "adj.",
    lessonLabel: "درس 8 — پسوندهای صفت"
  },
  {
    word: "musical",
    meaning: "موسیقی‌ related",
    lesson: 8,
    pos: "adj.",
    lessonLabel: "درس 8 — پسوندهای صفت"
  },
  {
    word: "political",
    meaning: "سیاسی",
    lesson: 8,
    pos: "adj.",
    lessonLabel: "درس 8 — پسوندهای صفت"
  },
  {
    word: "emotional",
    meaning: "احساسی",
    lesson: 8,
    pos: "adj.",
    lessonLabel: "درس 8 — پسوندهای صفت"
  },
  {
    word: "economical",
    meaning: "صرفه‌جویانه، اقتصادی",
    lesson: 8,
    pos: "adj.",
    lessonLabel: "درس 8 — پسوندهای صفت"
  },
  {
    word: "industrial",
    meaning: "صنعتی",
    lesson: 8,
    pos: "adj.",
    lessonLabel: "درس 8 — پسوندهای صفت"
  },
  {
    word: "cloudy",
    meaning: "ابری",
    lesson: 8,
    pos: "adj.",
    lessonLabel: "درس 8 — پسوندهای صفت"
  },
  {
    word: "sunny",
    meaning: "آفتابی",
    lesson: 8,
    pos: "adj.",
    lessonLabel: "درس 8 — پسوندهای صفت"
  },
  {
    word: "foggy",
    meaning: "مه‌آلود",
    lesson: 8,
    pos: "adj.",
    lessonLabel: "درس 8 — پسوندهای صفت"
  },
  {
    word: "dirty",
    meaning: "کثیف",
    lesson: 8,
    pos: "adj.",
    lessonLabel: "درس 8 — پسوندهای صفت"
  },
  {
    word: "attractive",
    meaning: "جذاب",
    lesson: 8,
    pos: "adj.",
    lessonLabel: "درس 8 — پسوندهای صفت"
  },
  {
    word: "creative",
    meaning: "خلاق",
    lesson: 8,
    pos: "adj.",
    lessonLabel: "درس 8 — پسوندهای صفت"
  },
  {
    word: "enjoyable",
    meaning: "لذت‌بخش",
    lesson: 8,
    pos: "adj.",
    lessonLabel: "درس 8 — پسوندهای صفت"
  },
  {
    word: "comfortable",
    meaning: "راحت",
    lesson: 8,
    pos: "adj.",
    lessonLabel: "درس 8 — پسوندهای صفت"
  },
  {
    word: "fashionable",
    meaning: "مد روز، شیک",
    lesson: 8,
    pos: "adj.",
    lessonLabel: "درس 8 — پسوندهای صفت"
  },
  {
    word: "suitable",
    meaning: "مناسب",
    lesson: 8,
    pos: "adj.",
    lessonLabel: "درس 8 — پسوندهای صفت"
  },
  {
    word: "washable",
    meaning: "شست‌وشو (قابل شستن)",
    lesson: 8,
    pos: "adj.",
    lessonLabel: "درس 8 — پسوندهای صفت"
  },
  {
    word: "reliable",
    meaning: "قابل اعتماد",
    lesson: 8,
    pos: "adj.",
    lessonLabel: "درس 8 — پسوندهای صفت"
  },
  {
    word: "unsuitable",
    meaning: "نامناسب",
    lesson: 8,
    pos: "adj.",
    lessonLabel: "درس 8 — پسوندهای صفت"
  },
  {
    word: "unbreakable",
    meaning: "نشکن، شکست‌ناپذیر",
    lesson: 8,
    pos: "adj.",
    lessonLabel: "درس 8 — پسوندهای صفت"
  },
  {
    word: "incomprehensible",
    meaning: "غیرقابل فهم",
    lesson: 8,
    pos: "adj.",
    lessonLabel: "درس 8 — پسوندهای صفت"
  },
  {
    word: "invisible",
    meaning: "نامرئی",
    lesson: 8,
    pos: "adj.",
    lessonLabel: "درس 8 — پسوندهای صفت"
  },
  {
    word: "careful",
    meaning: "بااحتیاط، مراقب",
    lesson: 8,
    pos: "adj.",
    lessonLabel: "درس 8 — پسوندهای صفت"
  },
  {
    word: "helpful",
    meaning: "مفید، کمک‌کننده",
    lesson: 8,
    pos: "adj.",
    lessonLabel: "درس 8 — پسوندهای صفت"
  },
  {
    word: "painful",
    meaning: "دردناک، دردآور",
    lesson: 8,
    pos: "adj.",
    lessonLabel: "درس 8 — پسوندهای صفت"
  },
  {
    word: "useful",
    meaning: "مفید",
    lesson: 8,
    pos: "adj.",
    lessonLabel: "درس 8 — پسوندهای صفت"
  },
  {
    word: "thoughtful",
    meaning: "مهربان و بافکر، باملاحظه",
    lesson: 8,
    pos: "adj.",
    lessonLabel: "درس 8 — پسوندهای صفت"
  },
  {
    word: "careless",
    meaning: "بی‌دقت، سهل‌انگار",
    lesson: 8,
    pos: "adj.",
    lessonLabel: "درس 8 — پسوندهای صفت"
  },
  {
    word: "useless",
    meaning: "بی‌فایده",
    lesson: 8,
    pos: "adj.",
    lessonLabel: "درس 8 — پسوندهای صفت"
  },
  {
    word: "homeless",
    meaning: "بي‌خانمان",
    lesson: 8,
    pos: "adj.",
    lessonLabel: "درس 8 — پسوندهای صفت"
  },
  {
    word: "rain",
    meaning: "باران / باران باریدن",
    lesson: 9,
    lessonLabel: "درس 9 — اسم‌ها و فعل‌های هم‌شکل"
  },
  {
    word: "laugh",
    meaning: "خندیدن / خنده",
    lesson: 9,
    pos: "n.|v.",
    lessonLabel: "درس 9 — اسم‌ها و فعل‌های هم‌شکل"
  },
  {
    word: "smile",
    meaning: "لبخند زدن / لبخند",
    lesson: 9,
    pos: "n.|v.",
    lessonLabel: "درس 9 — اسم‌ها و فعل‌های هم‌شکل"
  },
  {
    word: "taste",
    meaning: "چشیدن / مزه",
    lesson: 9,
    pos: "n.|v.",
    lessonLabel: "درس 9 — اسم‌ها و فعل‌های هم‌شکل"
  },
  {
    word: "kiss",
    meaning: "بوسیدن / بوسه",
    lesson: 9,
    pos: "n.|v.",
    lessonLabel: "درس 9 — اسم‌ها و فعل‌های هم‌شکل"
  },
  {
    word: "smell",
    meaning: "بو کردن / بو",
    lesson: 9,
    pos: "n.|v.",
    lessonLabel: "درس 9 — اسم‌ها و فعل‌های هم‌شکل"
  },
  {
    word: "dream",
    meaning: "خواب دیدن / رؤیا",
    lesson: 9,
    pos: "n.|v.",
    lessonLabel: "درس 9 — اسم‌ها و فعل‌های هم‌شکل"
  },
  {
    word: "brake",
    meaning: "ترمز کردن (ترمز ماشین را گرفتن)",
    lesson: 9,
    pos: "v.",
    lessonLabel: "درس 9 — اسم‌ها و فعل‌های هم‌شکل"
  },
  {
    word: "diet",
    meaning: "رژیم گرفتن (کمتر خوردن برای لاغر شدن)",
    lesson: 9,
    pos: "v.",
    lessonLabel: "درس 9 — اسم‌ها و فعل‌های هم‌شکل"
  },
  {
    word: "guess",
    meaning: "حدس زدن (جواب دادن بدون دانستن واقعیت)",
    lesson: 9,
    pos: "v.",
    lessonLabel: "درس 9 — اسم‌ها و فعل‌های هم‌شکل"
  },
  {
    word: "ring",
    meaning: "زنگ زدن / تلفن کردن (تلفن)",
    lesson: 9,
    pos: "n.|v.",
    lessonLabel: "درس 9 — اسم‌ها و فعل‌های هم‌شکل"
  },
  {
    word: "queue",
    meaning: "صف ایستادن (صف)",
    lesson: 9,
    pos: "n.|v.",
    lessonLabel: "درس 9 — اسم‌ها و فعل‌های هم‌شکل"
  },
  {
    word: "murder",
    meaning: "کُشتن (قتل)",
    lesson: 9,
    pos: "n.|v.",
    lessonLabel: "درس 9 — اسم‌ها و فعل‌های هم‌شکل"
  },
  {
    word: "chat",
    meaning: "گپ زدن (گفتگوی دوستانه)",
    lesson: 9,
    pos: "n.|v.",
    lessonLabel: "درس 9 — اسم‌ها و فعل‌های هم‌شکل"
  },
  {
    word: "drink",
    meaning: "نوشیدن / نوشیدنی",
    lesson: 9,
    pos: "n.|v.",
    lessonLabel: "درس 9 — اسم‌ها و فعل‌های هم‌شکل"
  },
  {
    word: "rest",
    meaning: "استراحت کردن / استراحت",
    lesson: 9,
    pos: "n.|v.",
    lessonLabel: "درس 9 — اسم‌ها و فعل‌های هم‌شکل"
  },
  {
    word: "look",
    meaning: "نگاه کردن / نگاه",
    lesson: 9,
    pos: "n.|v.",
    lessonLabel: "درس 9 — اسم‌ها و فعل‌های هم‌شکل"
  },
  {
    word: "cost",
    meaning: "هزینه داشتن / هزینه",
    lesson: 9,
    pos: "n.|v.",
    lessonLabel: "درس 9 — اسم‌ها و فعل‌های هم‌شکل"
  },
  {
    word: "swim",
    meaning: "شنا کردن / شنا",
    lesson: 9,
    pos: "n.|v.",
    lessonLabel: "درس 9 — اسم‌ها و فعل‌های هم‌شکل"
  },
  {
    word: "wash",
    meaning: "شستن / شست‌وشو",
    lesson: 9,
    pos: "n.|v.",
    lessonLabel: "درس 9 — اسم‌ها و فعل‌های هم‌شکل"
  },
  {
    word: "push",
    meaning: "هل دادن / هل",
    lesson: 9,
    pos: "n.|v.",
    lessonLabel: "درس 9 — اسم‌ها و فعل‌های هم‌شکل"
  },
  {
    word: "pull",
    meaning: "کشیدن / کشش",
    lesson: 9,
    pos: "n.|v.",
    lessonLabel: "درس 9 — اسم‌ها و فعل‌های هم‌شکل"
  },
  {
    word: "reply",
    meaning: "پاسخ دادن / پاسخ",
    lesson: 9,
    pos: "n.|v.",
    lessonLabel: "درس 9 — اسم‌ها و فعل‌های هم‌شکل"
  },
  {
    word: "practise (v)",
    meaning: "تمرین کردن",
    lesson: 9,
    lessonLabel: "درس 9 — اسم‌ها و فعل‌های هم‌شکل"
  },
  {
    word: "practice (n)",
    meaning: "تمرین",
    lesson: 9,
    lessonLabel: "درس 9 — اسم‌ها و فعل‌های هم‌شکل"
  },
  {
    word: "frying pan",
    meaning: "تابه",
    lesson: 10,
    pos: "n.",
    lessonLabel: "درس 10 — اسم‌های مرکب"
  },
  {
    word: "tin opener",
    meaning: "بازکن کنسرو",
    lesson: 10,
    pos: "n.",
    lessonLabel: "درس 10 — اسم‌های مرکب"
  },
  {
    word: "washing machine",
    meaning: "ماشین لباسشویی",
    lesson: 10,
    pos: "n.",
    lessonLabel: "درس 10 — اسم‌های مرکب"
  },
  {
    word: "sunglasses",
    meaning: "عینک آفتابی",
    lesson: 10,
    pos: "n.",
    lessonLabel: "درس 10 — اسم‌های مرکب"
  },
  {
    word: "credit card",
    meaning: "کارت اعتباری",
    lesson: 10,
    pos: "n.",
    lessonLabel: "درس 10 — اسم‌های مرکب"
  },
  {
    word: "earrings",
    meaning: "گوشواره",
    lesson: 10,
    pos: "n.",
    lessonLabel: "درس 10 — اسم‌های مرکب"
  },
  {
    word: "toothbrush",
    meaning: "مسواک",
    lesson: 10,
    pos: "n.",
    lessonLabel: "درس 10 — اسم‌های مرکب"
  },
  {
    word: "traffic lights",
    meaning: "چراغ‌های راهنمایی",
    lesson: 10,
    pos: "n.",
    lessonLabel: "درس 10 — اسم‌های مرکب"
  },
  {
    word: "hair dryer",
    meaning: "سشوار",
    lesson: 10,
    pos: "n.",
    lessonLabel: "درس 10 — اسم‌های مرکب"
  },
  {
    word: "cash machine",
    meaning: "خودپرداز / عابربانک",
    lesson: 10,
    pos: "n.",
    lessonLabel: "درس 10 — اسم‌های مرکب"
  },
  {
    word: "T-shirt",
    meaning: "تی‌شرت",
    lesson: 10,
    pos: "n.",
    lessonLabel: "درس 10 — اسم‌های مرکب"
  },
  {
    word: "dining room",
    meaning: "اتاق غذاخوری (اتاقی که در آن غذا می‌خورید)",
    lesson: 10,
    pos: "n.",
    lessonLabel: "درس 10 — اسم‌های مرکب"
  },
  {
    word: "science fiction",
    meaning: "داستان علمی‌تخیلی (داستان‌هایی درباره آینده)",
    lesson: 10,
    pos: "n.",
    lessonLabel: "درس 10 — اسم‌های مرکب"
  },
  {
    word: "writing paper",
    meaning: "کاغذ نامه‌نگاری (کاغذی برای نوشتن نامه)",
    lesson: 10,
    pos: "n.",
    lessonLabel: "درس 10 — اسم‌های مرکب"
  },
  {
    word: "mother tongue",
    meaning: "زبان مادری (زبان اول شما)",
    lesson: 10,
    pos: "n.",
    lessonLabel: "درس 10 — اسم‌های مرکب"
  },
  {
    word: "bus driver",
    meaning: "راننده اتوبوس (کسی که اتوبوس می‌راند)",
    lesson: 10,
    pos: "n.",
    lessonLabel: "درس 10 — اسم‌های مرکب"
  },
  {
    word: "bus stop",
    meaning: "ایستگاه اتوبوس (جایی که اتوبوس‌ها برای سوار شدن مردم توقف می‌کنند)",
    lesson: 10,
    pos: "n.",
    lessonLabel: "درس 10 — اسم‌های مرکب"
  },
  {
    word: "haircut",
    meaning: "اصلاح مو / کوتاه کردن مو",
    lesson: 10,
    pos: "n.",
    lessonLabel: "درس 10 — اسم‌های مرکب"
  },
  {
    word: "traffic jam",
    meaning: "ترافیک سنگین (صف طولانی ماشین‌هایی که خیلی آهسته حرکت می‌کنند)",
    lesson: 10,
    pos: "n.",
    lessonLabel: "درس 10 — اسم‌های مرکب"
  },
  {
    word: "babysitter",
    meaning: "پرستار بچه (کسی که وقتی والدین بیرون هستند از بچه‌ها مراقبت می‌کند)",
    lesson: 10,
    pos: "n.",
    lessonLabel: "درس 10 — اسم‌های مرکب"
  },
  {
    word: "box office",
    meaning: "بلیط‌فروشی (جایی که بلیط سینما یا تئاتر می‌خرید)",
    lesson: 10,
    pos: "n.",
    lessonLabel: "درس 10 — اسم‌های مرکب"
  },
  {
    word: "travel agent",
    meaning: "کارگزار مسافرتی (شغل کسی که برای ما ترتیبات سفر را فراهم می‌کند)",
    lesson: 10,
    pos: "n.",
    lessonLabel: "درس 10 — اسم‌های مرکب"
  },
  {
    word: "film star",
    meaning: "ستاره سینما (مثلاً تام کروز، مگ رایان)",
    lesson: 10,
    pos: "n.",
    lessonLabel: "درس 10 — اسم‌های مرکب"
  },
  {
    word: "income tax",
    meaning: "مالیات بر درآمد (مالیاتی که روی حقوقتان می‌پردازید)",
    lesson: 10,
    pos: "n.",
    lessonLabel: "درس 10 — اسم‌های مرکب"
  },
  {
    word: "dishwasher",
    meaning: "ماشین ظرفشویی (ماشینی برای شستن ظرف‌ها)",
    lesson: 10,
    pos: "n.",
    lessonLabel: "درس 10 — اسم‌های مرکب"
  },
  {
    word: "brother-in-law",
    meaning: "داماد / برادرزن / برادرشوهر (شوهر خواهر شما یا برادر همسرتان)",
    lesson: 10,
    pos: "n.",
    lessonLabel: "درس 10 — اسم‌های مرکب"
  },
  {
    word: "bedroom",
    meaning: "اتاق خواب",
    lesson: 10,
    pos: "n.",
    lessonLabel: "درس 10 — اسم‌های مرکب"
  },
  {
    word: "postman",
    meaning: "پستچی",
    lesson: 10,
    pos: "n.",
    lessonLabel: "درس 10 — اسم‌های مرکب"
  },
  {
    word: "make-up",
    meaning: "آرایش (موادّی که روی صورت، اغلب روی لب‌ها و اطراف چشم‌ها می‌زنید تا جذاب‌تر باشید)",
    lesson: 10,
    pos: "n.",
    lessonLabel: "درس 10 — اسم‌های مرکب"
  },
  {
    word: "post office",
    meaning: "دفتر پست",
    lesson: 10,
    pos: "n.",
    lessonLabel: "درس 10 — اسم‌های مرکب"
  },
  {
    word: "postbox",
    meaning: "صندوق پست",
    lesson: 10,
    pos: "n.",
    lessonLabel: "درس 10 — اسم‌های مرکب"
  },
  {
    word: "pop star",
    meaning: "ستاره پاپ",
    lesson: 10,
    pos: "n.",
    lessonLabel: "درس 10 — اسم‌های مرکب"
  },
  {
    word: "rock star",
    meaning: "ستاره راک",
    lesson: 10,
    pos: "n.",
    lessonLabel: "درس 10 — اسم‌های مرکب"
  },
  {
    word: "toothpaste",
    meaning: "خمیردندان",
    lesson: 10,
    pos: "n.",
    lessonLabel: "درس 10 — اسم‌های مرکب"
  },
  {
    word: "toothache",
    meaning: "دندان‌درد",
    lesson: 10,
    pos: "n.",
    lessonLabel: "درس 10 — اسم‌های مرکب"
  },
  {
    word: "living room",
    meaning: "اتاق نشیمن",
    lesson: 10,
    pos: "n.",
    lessonLabel: "درس 10 — اسم‌های مرکب"
  },
  {
    word: "waiting room",
    meaning: "اتاق انتظار",
    lesson: 10,
    pos: "n.",
    lessonLabel: "درس 10 — اسم‌های مرکب"
  },
  {
    word: "chat room",
    meaning: "اتاق گفتگو (فضایی برای ارتباط در اینترنت)",
    lesson: 10,
    pos: "n.",
    lessonLabel: "درس 10 — اسم‌های مرکب"
  },
  {
    word: "well-known",
    meaning: "مشهور، معروف",
    lesson: 11,
    pos: "adj.",
    lessonLabel: "درس 11 — صفت‌های مرکب"
  },
  {
    word: "good-looking",
    meaning: "خوش‌سیما، جذاب",
    lesson: 11,
    pos: "adj.",
    lessonLabel: "درس 11 — صفت‌های مرکب"
  },
  {
    word: "well off",
    meaning: "مرفه، ثروتمند",
    lesson: 11,
    pos: "adj.",
    lessonLabel: "درس 11 — صفت‌های مرکب"
  },
  {
    word: "easy-going",
    meaning: "خوش‌برخورد، راحت",
    lesson: 11,
    pos: "adj.",
    lessonLabel: "درس 11 — صفت‌های مرکب"
  },
  {
    word: "short-sleeved",
    meaning: "آستین‌کوتاه",
    lesson: 11,
    pos: "adj.",
    lessonLabel: "درس 11 — صفت‌های مرکب"
  },
  {
    word: "brand-new",
    meaning: "کاملاً نو",
    lesson: 11,
    pos: "adj.",
    lessonLabel: "درس 11 — صفت‌های مرکب"
  },
  {
    word: "well-organised",
    meaning: "منظم و سازمان‌یافته",
    lesson: 11,
    pos: "adj.",
    lessonLabel: "درس 11 — صفت‌های مرکب"
  },
  {
    word: "well-equipped",
    meaning: "مجهز",
    lesson: 11,
    pos: "adj.",
    lessonLabel: "درس 11 — صفت‌های مرکب"
  },
  {
    word: "well-written",
    meaning: "خوش‌نوشته",
    lesson: 11,
    pos: "adj.",
    lessonLabel: "درس 11 — صفت‌های مرکب"
  },
  {
    word: "well-paid",
    meaning: "با حقوق خوب",
    lesson: 11,
    pos: "adj.",
    lessonLabel: "درس 11 — صفت‌های مرکب"
  },
  {
    word: "badly-behaved",
    meaning: "بدرفتار",
    lesson: 11,
    pos: "adj.",
    lessonLabel: "درس 11 — صفت‌های مرکب"
  },
  {
    word: "badly-dressed",
    meaning: "بدپوش",
    lesson: 11,
    pos: "adj.",
    lessonLabel: "درس 11 — صفت‌های مرکب"
  },
  {
    word: "ten-minute",
    meaning: "ده‌دقیقه‌ای",
    lesson: 11,
    pos: "adj.",
    lessonLabel: "درس 11 — صفت‌های مرکب"
  },
  {
    word: "four-star",
    meaning: "چهارستاره",
    lesson: 11,
    pos: "adj.",
    lessonLabel: "درس 11 — صفت‌های مرکب"
  },
  {
    word: "twenty-pound",
    meaning: "بیست‌پوندی",
    lesson: 11,
    pos: "adj.",
    lessonLabel: "درس 11 — صفت‌های مرکب"
  },
  {
    word: "two-hour",
    meaning: "دوساعته",
    lesson: 11,
    pos: "adj.",
    lessonLabel: "درس 11 — صفت‌های مرکب"
  },
  {
    word: "ten-year-old",
    meaning: "ده‌ساله",
    lesson: 11,
    pos: "adj.",
    lessonLabel: "درس 11 — صفت‌های مرکب"
  },
  {
    word: "fifty-euro",
    meaning: "پنجاه‌یورویی",
    lesson: 11,
    pos: "adj.",
    lessonLabel: "درس 11 — صفت‌های مرکب"
  },
  {
    word: "part-time",
    meaning: "پاره‌وقت",
    lesson: 11,
    pos: "adj.",
    lessonLabel: "درس 11 — صفت‌های مرکب"
  },
  {
    word: "full-time",
    meaning: "تمام‌وقت",
    lesson: 11,
    pos: "adj.",
    lessonLabel: "درس 11 — صفت‌های مرکب"
  },
  {
    word: "right-handed",
    meaning: "راست‌دست",
    lesson: 11,
    pos: "adj.",
    lessonLabel: "درس 11 — صفت‌های مرکب"
  },
  {
    word: "left-handed",
    meaning: "چپ‌دست",
    lesson: 11,
    pos: "adj.",
    lessonLabel: "درس 11 — صفت‌های مرکب"
  },
  {
    word: "first class",
    meaning: "درجه‌یک",
    lesson: 11,
    pos: "adj.",
    lessonLabel: "درس 11 — صفت‌های مرکب"
  },
  {
    word: "second-hand",
    meaning: "دست‌دوم",
    lesson: 11,
    pos: "adj.",
    lessonLabel: "درس 11 — صفت‌های مرکب"
  },
  {
    word: "miss the bus",
    meaning: "اتوبوس را از دست دادن",
    lesson: 12,
    pos: "phr.",
    lessonLabel: "درس 12 — هم‌نشینی واژه‌ها (شریک‌های واژگانی)"
  },
  {
    word: "serious injury",
    meaning: "آسیب جدی",
    lesson: 12,
    pos: "phr.",
    lessonLabel: "درس 12 — هم‌نشینی واژه‌ها (شریک‌های واژگانی)"
  },
  {
    word: "bitterly disappointed",
    meaning: "شدیداً ناامید",
    lesson: 12,
    pos: "phr.",
    lessonLabel: "درس 12 — هم‌نشینی واژه‌ها (شریک‌های واژگانی)"
  },
  {
    word: "start a car",
    meaning: "ماشین را روشن کردن",
    lesson: 12,
    pos: "phr.",
    lessonLabel: "درس 12 — هم‌نشینی واژه‌ها (شریک‌های واژگانی)"
  },
  {
    word: "start a family",
    meaning: "خانواده تشکیل دادن",
    lesson: 12,
    pos: "phr.",
    lessonLabel: "درس 12 — هم‌نشینی واژه‌ها (شریک‌های واژگانی)"
  },
  {
    word: "tell a story",
    meaning: "داستان گفتن",
    lesson: 12,
    pos: "phr.",
    lessonLabel: "درس 12 — هم‌نشینی واژه‌ها (شریک‌های واژگانی)"
  },
  {
    word: "tell a joke",
    meaning: "جوک گفتن",
    lesson: 12,
    pos: "phr.",
    lessonLabel: "درس 12 — هم‌نشینی واژه‌ها (شریک‌های واژگانی)"
  },
  {
    word: "tell the truth",
    meaning: "حقیقت را گفتن",
    lesson: 12,
    pos: "phr.",
    lessonLabel: "درس 12 — هم‌نشینی واژه‌ها (شریک‌های واژگانی)"
  },
  {
    word: "tell a lie",
    meaning: "دروغ گفتن",
    lesson: 12,
    pos: "phr.",
    lessonLabel: "درس 12 — هم‌نشینی واژه‌ها (شریک‌های واژگانی)"
  },
  {
    word: "miss a person",
    meaning: "دل تنگ کسی شدن",
    lesson: 12,
    pos: "phr.",
    lessonLabel: "درس 12 — هم‌نشینی واژه‌ها (شریک‌های واژگانی)"
  },
  {
    word: "miss a lesson",
    meaning: "کلاس را از دست دادن",
    lesson: 12,
    pos: "phr.",
    lessonLabel: "درس 12 — هم‌نشینی واژه‌ها (شریک‌های واژگانی)"
  },
  {
    word: "get on a bus",
    meaning: "سوار اتوبوس شدن",
    lesson: 12,
    pos: "phr.",
    lessonLabel: "درس 12 — هم‌نشینی واژه‌ها (شریک‌های واژگانی)"
  },
  {
    word: "get off a bus",
    meaning: "از اتوبوس پیاده شدن",
    lesson: 12,
    pos: "phr.",
    lessonLabel: "درس 12 — هم‌نشینی واژه‌ها (شریک‌های واژگانی)"
  },
  {
    word: "waste time/money",
    meaning: "وقت/پول را هدر دادن",
    lesson: 12,
    pos: "phr.",
    lessonLabel: "درس 12 — هم‌نشینی واژه‌ها (شریک‌های واژگانی)"
  },
  {
    word: "a soft drink",
    meaning: "نوشیدنی غیر الکلی",
    lesson: 12,
    pos: "phr.",
    lessonLabel: "درس 12 — هم‌نشینی واژه‌ها (شریک‌های واژگانی)"
  },
  {
    word: "a soft voice",
    meaning: "صدای ملایم",
    lesson: 12,
    pos: "phr.",
    lessonLabel: "درس 12 — هم‌نشینی واژه‌ها (شریک‌های واژگانی)"
  },
  {
    word: "dry wine",
    meaning: "شراب خشک",
    lesson: 12,
    pos: "phr.",
    lessonLabel: "درس 12 — هم‌نشینی واژه‌ها (شریک‌های واژگانی)"
  },
  {
    word: "dry weather",
    meaning: "هوای خشک",
    lesson: 12,
    pos: "phr.",
    lessonLabel: "درس 12 — هم‌نشینی واژه‌ها (شریک‌های واژگانی)"
  },
  {
    word: "a strong accent",
    meaning: "لهجهٔ شدید",
    lesson: 12,
    pos: "phr.",
    lessonLabel: "درس 12 — هم‌نشینی واژه‌ها (شریک‌های واژگانی)"
  },
  {
    word: "a slight accent",
    meaning: "لهجهٔ خفیف",
    lesson: 12,
    pos: "phr.",
    lessonLabel: "درس 12 — هم‌نشینی واژه‌ها (شریک‌های واژگانی)"
  },
  {
    word: "strong coffee",
    meaning: "قهوهٔ غلیظ",
    lesson: 12,
    pos: "phr.",
    lessonLabel: "درس 12 — هم‌نشینی واژه‌ها (شریک‌های واژگانی)"
  },
  {
    word: "weak coffee",
    meaning: "قهوهٔ شیرین/رقیق",
    lesson: 12,
    pos: "phr.",
    lessonLabel: "درس 12 — هم‌نشینی واژه‌ها (شریک‌های واژگانی)"
  },
  {
    word: "heavy traffic",
    meaning: "ترافیک سنگین",
    lesson: 12,
    pos: "phr.",
    lessonLabel: "درس 12 — هم‌نشینی واژه‌ها (شریک‌های واژگانی)"
  },
  {
    word: "heavy rain",
    meaning: "باران شدید",
    lesson: 12,
    pos: "phr.",
    lessonLabel: "درس 12 — هم‌نشینی واژه‌ها (شریک‌های واژگانی)"
  },
  {
    word: "heavy smoker",
    meaning: "سیگاری سنگین",
    lesson: 12,
    pos: "phr.",
    lessonLabel: "درس 12 — هم‌نشینی واژه‌ها (شریک‌های واژگانی)"
  },
  {
    word: "hard work",
    meaning: "کار سخت",
    lesson: 12,
    pos: "phr.",
    lessonLabel: "درس 12 — هم‌نشینی واژه‌ها (شریک‌های واژگانی)"
  },
  {
    word: "a hard question",
    meaning: "سؤال دشوار",
    lesson: 12,
    pos: "phr.",
    lessonLabel: "درس 12 — هم‌نشینی واژه‌ها (شریک‌های واژگانی)"
  },
  {
    word: "a great success",
    meaning: "موفقیت بزرگ",
    lesson: 12,
    pos: "phr.",
    lessonLabel: "درس 12 — هم‌نشینی واژه‌ها (شریک‌های واژگانی)"
  },
  {
    word: "a great time",
    meaning: "وقت خوش",
    lesson: 12,
    pos: "phr.",
    lessonLabel: "درس 12 — هم‌نشینی واژه‌ها (شریک‌های واژگانی)"
  },
  {
    word: "terribly",
    meaning: "بسیار/شدید",
    lesson: 12,
    pos: "adv.",
    lessonLabel: "درس 12 — هم‌نشینی واژه‌ها (شریک‌های واژگانی)"
  },
  {
    word: "well aware",
    meaning: "کاملاً آگاه",
    lesson: 12,
    pos: "phr.",
    lessonLabel: "درس 12 — هم‌نشینی واژه‌ها (شریک‌های واژگانی)"
  },
  {
    word: "vitally important",
    meaning: "بسیار مهم",
    lesson: 12,
    pos: "phr.",
    lessonLabel: "درس 12 — هم‌نشینی واژه‌ها (شریک‌های واژگانی)"
  },
  {
    word: "fast asleep",
    meaning: "عمیقاً خواب",
    lesson: 12,
    pos: "phr.",
    lessonLabel: "درس 12 — هم‌نشینی واژه‌ها (شریک‌های واژگانی)"
  },
  {
    word: "wide awake",
    meaning: "کاملاً بیدار",
    lesson: 12,
    pos: "phr.",
    lessonLabel: "درس 12 — هم‌نشینی واژه‌ها (شریک‌های واژگانی)"
  },
  {
    word: "change my mind",
    meaning: "نظر یا تصمیم خود را عوض کردن",
    lesson: 13,
    lessonLabel: "درس 13 — اصطلاح‌ها و عبارت‌های ثابت"
  },
  {
    word: "have a late night",
    meaning: "دیرتر از معمول به رختخواب رفتن",
    lesson: 13,
    lessonLabel: "درس 13 — اصطلاح‌ها و عبارت‌های ثابت"
  },
  {
    word: "get nowhere",
    meaning: "به جایی نرسیدن؛ پیشرفت نکردن",
    lesson: 13,
    lessonLabel: "درس 13 — اصطلاح‌ها و عبارت‌های ثابت"
  },
  {
    word: "all over the place",
    meaning: "همه جا",
    lesson: 13,
    lessonLabel: "درس 13 — اصطلاح‌ها و عبارت‌های ثابت"
  },
  {
    word: "take it in turns",
    meaning: "به نوبت انجام دادن",
    lesson: 13,
    lessonLabel: "درس 13 — اصطلاح‌ها و عبارت‌های ثابت"
  },
  {
    word: "make it",
    meaning: "توانستن بیاید (= come)",
    lesson: 13,
    lessonLabel: "درس 13 — اصطلاح‌ها و عبارت‌های ثابت"
  },
  {
    word: "keep an eye on",
    meaning: "مواظب/نگهبان چیزی بودن (= watch/look after)",
    lesson: 13,
    lessonLabel: "درس 13 — اصطلاح‌ها و عبارت‌های ثابت"
  },
  {
    word: "feel like",
    meaning: "هوس کردن؛ میل داشتن (= want)",
    lesson: 13,
    lessonLabel: "درس 13 — اصطلاح‌ها و عبارت‌های ثابت"
  },
  {
    word: "get rid of",
    meaning: "خلاص شدن از شر چیزی (= remove it/throw it away)",
    lesson: 13,
    lessonLabel: "درس 13 — اصطلاح‌ها و عبارت‌های ثابت"
  },
  {
    word: "get on my nerves",
    meaning: "روی اعصابم بودن؛ خیلی آزاردهنده بودن",
    lesson: 13,
    lessonLabel: "درس 13 — اصطلاح‌ها و عبارت‌های ثابت"
  },
  {
    word: "on the tip of my tongue",
    meaning: "نوک زبانم بودن (یادم است ولی همین لحظه به یاد نمی‌آورم)",
    lesson: 13,
    lessonLabel: "درس 13 — اصطلاح‌ها و عبارت‌های ثابت"
  },
  {
    word: "on the one hand / on the other hand",
    meaning: "از یک طرف / از طرف دیگر (برای مقابل قرار دادن دو دیدگاه متضاد)",
    lesson: 13,
    lessonLabel: "درس 13 — اصطلاح‌ها و عبارت‌های ثابت"
  },
  {
    word: "in the short term / in the long term",
    meaning: "در کوتاه‌مدت / در بلندمدت",
    lesson: 13,
    lessonLabel: "درس 13 — اصطلاح‌ها و عبارت‌های ثابت"
  },
  {
    word: "in theory / in practice",
    meaning: "در تئوری / در عمل",
    lesson: 13,
    lessonLabel: "درس 13 — اصطلاح‌ها و عبارت‌های ثابت"
  },
  {
    word: "hang on",
    meaning: "صبر کردن (= wait a minute)",
    lesson: 13,
    lessonLabel: "درس 13 — اصطلاح‌ها و عبارت‌های ثابت"
  },
  {
    word: "go ahead",
    meaning: "بفرما؛ خودت بردار (= help yourself; take it; do it)",
    lesson: 13,
    lessonLabel: "درس 13 — اصطلاح‌ها و عبارت‌های ثابت"
  },
  {
    word: "What's up?",
    meaning: "چه خبر؟ (= What's the matter?)",
    lesson: 13,
    lessonLabel: "درس 13 — اصطلاح‌ها و عبارت‌های ثابت"
  },
  {
    word: "Never mind.",
    meaning: "مهم نیست؛ اشکالی ندارد",
    lesson: 13,
    lessonLabel: "درس 13 — اصطلاح‌ها و عبارت‌های ثابت"
  },
  {
    word: "if you like",
    meaning: "اگر تو بخواهی؛ من موافقم (= I am happy to do that)",
    lesson: 13,
    lessonLabel: "درس 13 — اصطلاح‌ها و عبارت‌های ثابت"
  },
  {
    word: "make up your mind",
    meaning: "تصمیم خود را گرفتن (= make a decision)",
    lesson: 13,
    lessonLabel: "درس 13 — اصطلاح‌ها و عبارت‌های ثابت"
  },
  {
    word: "I haven't a clue.",
    meaning: "من ایده‌ای ندارم؛ نمی‌دانم",
    lesson: 13,
    lessonLabel: "درس 13 — اصطلاح‌ها و عبارت‌های ثابت"
  },
  {
    word: "It's up to you.",
    meaning: "بستگی به تو دارد (= it's your decision)",
    lesson: 13,
    lessonLabel: "درس 13 — اصطلاح‌ها و عبارت‌های ثابت"
  },
  {
    word: "listen to",
    meaning: "گوش دادن به",
    lesson: 14,
    pos: "v.",
    lessonLabel: "درس 14 — فعل یا صفت + حرف اضافه"
  },
  {
    word: "agree with",
    meaning: "موافق بودن با (هم‌عقیده بودن)",
    lesson: 14,
    pos: "v.",
    lessonLabel: "درس 14 — فعل یا صفت + حرف اضافه"
  },
  {
    word: "depend on",
    meaning: "بستگی داشتن به",
    lesson: 14,
    pos: "v.",
    lessonLabel: "درس 14 — فعل یا صفت + حرف اضافه"
  },
  {
    word: "suffer from",
    meaning: "رنج بردن از (مبتلا بودن به)",
    lesson: 14,
    pos: "v.",
    lessonLabel: "درس 14 — فعل یا صفت + حرف اضافه"
  },
  {
    word: "get married to",
    meaning: "ازدواج کردن با",
    lesson: 14,
    pos: "phr.",
    lessonLabel: "درس 14 — فعل یا صفت + حرف اضافه"
  },
  {
    word: "apologise for",
    meaning: "عذرخواهی کردن برای",
    lesson: 14,
    pos: "v.",
    lessonLabel: "درس 14 — فعل یا صفت + حرف اضافه"
  },
  {
    word: "apply for",
    meaning: "درخواست دادن برای",
    lesson: 14,
    pos: "v.",
    lessonLabel: "درس 14 — فعل یا صفت + حرف اضافه"
  },
  {
    word: "wait for",
    meaning: "منتظر بودن",
    lesson: 14,
    pos: "v.",
    lessonLabel: "درس 14 — فعل یا صفت + حرف اضافه"
  },
  {
    word: "worry about",
    meaning: "نگران بودن دربارهٔ",
    lesson: 14,
    pos: "v.",
    lessonLabel: "درس 14 — فعل یا صفت + حرف اضافه"
  },
  {
    word: "satisfied with",
    meaning: "راضی بودن از",
    lesson: 14,
    pos: "adj.",
    lessonLabel: "درس 14 — فعل یا صفت + حرف اضافه"
  },
  {
    word: "complain to (someone) about (something)",
    meaning: "شکایت کردن به (کسی) دربارهٔ (چیزی)",
    lesson: 14,
    pos: "v.",
    lessonLabel: "درس 14 — فعل یا صفت + حرف اضافه"
  },
  {
    word: "spend (money) on",
    meaning: "خرج کردن (پول) برای",
    lesson: 14,
    pos: "v.",
    lessonLabel: "درس 14 — فعل یا صفت + حرف اضافه"
  },
  {
    word: "belong to",
    meaning: "مال کسی بودن، تعلق داشتن به",
    lesson: 14,
    pos: "v.",
    lessonLabel: "درس 14 — فعل یا صفت + حرف اضافه"
  },
  {
    word: "translate (something) into",
    meaning: "ترجمه کردن به (زبان)",
    lesson: 14,
    pos: "v.",
    lessonLabel: "درس 14 — فعل یا صفت + حرف اضافه"
  },
  {
    word: "think of",
    meaning: "فکر کردن به (احتمال دادن)",
    lesson: 14,
    pos: "v.",
    lessonLabel: "درس 14 — فعل یا صفت + حرف اضافه"
  },
  {
    word: "shout to",
    meaning: "صدا زدن (برای ارتباط از فاصله)",
    lesson: 14,
    pos: "v.",
    lessonLabel: "درس 14 — فعل یا صفت + حرف اضافه"
  },
  {
    word: "shout at",
    meaning: "داد زدن سرِ (از روی عصبانیت)",
    lesson: 14,
    pos: "v.",
    lessonLabel: "درس 14 — فعل یا صفت + حرف اضافه"
  },
  {
    word: "throw ... to",
    meaning: "پرتاب کردن به سمتِ کسی (برای گرفتن)",
    lesson: 14,
    pos: "v.",
    lessonLabel: "درس 14 — فعل یا صفت + حرف اضافه"
  },
  {
    word: "throw ... at",
    meaning: "پرتاب کردن به سمتِ کسی (برای اصابت/از روی عصبانیت)",
    lesson: 14,
    pos: "v.",
    lessonLabel: "درس 14 — فعل یا صفت + حرف اضافه"
  },
  {
    word: "good at",
    meaning: "خوب بودن در",
    lesson: 14,
    pos: "adj.",
    lessonLabel: "درس 14 — فعل یا صفت + حرف اضافه"
  },
  {
    word: "bad at",
    meaning: "بد بودن در",
    lesson: 14,
    pos: "adj.",
    lessonLabel: "درس 14 — فعل یا صفت + حرف اضافه"
  },
  {
    word: "afraid of",
    meaning: "ترسیدن از",
    lesson: 14,
    pos: "adj.",
    lessonLabel: "درس 14 — فعل یا صفت + حرف اضافه"
  },
  {
    word: "keen on",
    meaning: "علاقه‌مند به",
    lesson: 14,
    pos: "adj.",
    lessonLabel: "درس 14 — فعل یا صفت + حرف اضافه"
  },
  {
    word: "similar to",
    meaning: "مشابه، شبیه به",
    lesson: 14,
    pos: "adj.",
    lessonLabel: "درس 14 — فعل یا صفت + حرف اضافه"
  },
  {
    word: "different from",
    meaning: "متفاوت از",
    lesson: 14,
    pos: "adj.",
    lessonLabel: "درس 14 — فعل یا صفت + حرف اضافه"
  },
  {
    word: "interested in",
    meaning: "علاقه‌مند به، مشغولِ علاقه به",
    lesson: 14,
    pos: "adj.",
    lessonLabel: "درس 14 — فعل یا صفت + حرف اضافه"
  },
  {
    word: "surprised at (or by)",
    meaning: "متعجب از",
    lesson: 14,
    pos: "adj.",
    lessonLabel: "درس 14 — فعل یا صفت + حرف اضافه"
  },
  {
    word: "aware of",
    meaning: "آگاه از، مطلع از",
    lesson: 14,
    pos: "adj.",
    lessonLabel: "درس 14 — فعل یا صفت + حرف اضافه"
  },
  {
    word: "tired of",
    meaning: "خسته/بیزار از",
    lesson: 14,
    pos: "adj.",
    lessonLabel: "درس 14 — فعل یا صفت + حرف اضافه"
  },
  {
    word: "full of",
    meaning: "پر از",
    lesson: 14,
    pos: "adj.",
    lessonLabel: "درس 14 — فعل یا صفت + حرف اضافه"
  },
  {
    word: "wrong with",
    meaning: "ایراد/مشکل در",
    lesson: 14,
    pos: "adj.",
    lessonLabel: "درس 14 — فعل یا صفت + حرف اضافه"
  },
  {
    word: "by Stephen King / by Steven Spielberg / by Elton John",
    meaning: "اثرِ (نویسنده/کارگردان/خواننده): از ساخته‌های ...",
    lesson: 15,
    pos: "phr.",
    lessonLabel: "درس 15 — حرف اضافه + اسم"
  },
  {
    word: "on the radio",
    meaning: "از رادیو",
    lesson: 15,
    pos: "phr.",
    lessonLabel: "درس 15 — حرف اضافه + اسم"
  },
  {
    word: "on TV",
    meaning: "از تلویزیون",
    lesson: 15,
    pos: "phr.",
    lessonLabel: "درس 15 — حرف اضافه + اسم"
  },
  {
    word: "on the phone",
    meaning: "از طریق تلفن",
    lesson: 15,
    pos: "phr.",
    lessonLabel: "درس 15 — حرف اضافه + اسم"
  },
  {
    word: "in the newspaper",
    meaning: "در روزنامه",
    lesson: 15,
    pos: "phr.",
    lessonLabel: "درس 15 — حرف اضافه + اسم"
  },
  {
    word: "for a walk",
    meaning: "برای پیاده‌روی",
    lesson: 15,
    pos: "phr.",
    lessonLabel: "درس 15 — حرف اضافه + اسم"
  },
  {
    word: "for a swim",
    meaning: "برای شنا",
    lesson: 15,
    pos: "phr.",
    lessonLabel: "درس 15 — حرف اضافه + اسم"
  },
  {
    word: "for a drive",
    meaning: "برای رانندگی",
    lesson: 15,
    pos: "phr.",
    lessonLabel: "درس 15 — حرف اضافه + اسم"
  },
  {
    word: "for a run",
    meaning: "برای دویدن",
    lesson: 15,
    pos: "phr.",
    lessonLabel: "درس 15 — حرف اضافه + اسم"
  },
  {
    word: "in the morning",
    meaning: "صبح‌ها",
    lesson: 15,
    pos: "phr.",
    lessonLabel: "درس 15 — حرف اضافه + اسم"
  },
  {
    word: "in the afternoon",
    meaning: "بعدازظهرها",
    lesson: 15,
    pos: "phr.",
    lessonLabel: "درس 15 — حرف اضافه + اسم"
  },
  {
    word: "in the evening",
    meaning: "عصرها",
    lesson: 15,
    pos: "phr.",
    lessonLabel: "درس 15 — حرف اضافه + اسم"
  },
  {
    word: "at night",
    meaning: "شب‌ها",
    lesson: 15,
    pos: "phr.",
    lessonLabel: "درس 15 — حرف اضافه + اسم"
  },
  {
    word: "by car",
    meaning: "با ماشین",
    lesson: 15,
    pos: "phr.",
    lessonLabel: "درس 15 — حرف اضافه + اسم"
  },
  {
    word: "by train",
    meaning: "با قطار",
    lesson: 15,
    pos: "phr.",
    lessonLabel: "درس 15 — حرف اضافه + اسم"
  },
  {
    word: "by plane",
    meaning: "با هواپیما",
    lesson: 15,
    pos: "phr.",
    lessonLabel: "درس 15 — حرف اضافه + اسم"
  },
  {
    word: "by bus",
    meaning: "با اتوبوس",
    lesson: 15,
    pos: "phr.",
    lessonLabel: "درس 15 — حرف اضافه + اسم"
  },
  {
    word: "on foot",
    meaning: "پیاده",
    lesson: 15,
    pos: "phr.",
    lessonLabel: "درس 15 — حرف اضافه + اسم"
  },
  {
    word: "in the blue jumper",
    meaning: "با پلیور آبی (پوشیده)",
    lesson: 15,
    pos: "phr.",
    lessonLabel: "درس 15 — حرف اضافه + اسم"
  },
  {
    word: "in the dark glasses",
    meaning: "با عینک تیره",
    lesson: 15,
    pos: "phr.",
    lessonLabel: "درس 15 — حرف اضافه + اسم"
  },
  {
    word: "by mistake",
    meaning: "اشتباهی، ناخواسته",
    lesson: 15,
    pos: "phr.",
    lessonLabel: "درس 15 — حرف اضافه + اسم"
  },
  {
    word: "by myself",
    meaning: "خودم، بدون کمک دیگران",
    lesson: 15,
    pos: "phr.",
    lessonLabel: "درس 15 — حرف اضافه + اسم"
  },
  {
    word: "on my own",
    meaning: "تنها، بدون کمک دیگران",
    lesson: 15,
    pos: "phr.",
    lessonLabel: "درس 15 — حرف اضافه + اسم"
  },
  {
    word: "made by hand",
    meaning: "دست‌ساز (نه با ماشین)",
    lesson: 15,
    pos: "phr.",
    lessonLabel: "درس 15 — حرف اضافه + اسم"
  },
  {
    word: "on strike",
    meaning: "در حال اعتصاب",
    lesson: 15,
    pos: "phr.",
    lessonLabel: "درس 15 — حرف اضافه + اسم"
  },
  {
    word: "by chance",
    meaning: "تصادفیً، اتفاقی",
    lesson: 15,
    pos: "phr.",
    lessonLabel: "درس 15 — حرف اضافه + اسم"
  },
  {
    word: "on holiday",
    meaning: "در تعطیلات",
    lesson: 15,
    pos: "phr.",
    lessonLabel: "درس 15 — حرف اضافه + اسم"
  },
  {
    word: "out of work",
    meaning: "بیکار",
    lesson: 15,
    pos: "phr.",
    lessonLabel: "درس 15 — حرف اضافه + اسم"
  },
  {
    word: "in love with",
    meaning: "عاشق",
    lesson: 15,
    pos: "phr.",
    lessonLabel: "درس 15 — حرف اضافه + اسم"
  },
  {
    word: "on fire",
    meaning: "در حال سوختن، آتش‌گرفته",
    lesson: 15,
    pos: "phr.",
    lessonLabel: "درس 15 — حرف اضافه + اسم"
  },
  {
    word: "in a hurry",
    meaning: "عجله‌ای، با عجله",
    lesson: 15,
    pos: "phr.",
    lessonLabel: "درس 15 — حرف اضافه + اسم"
  },
  {
    word: "by accident",
    meaning: "ناخواسته، تصادفی",
    lesson: 15,
    pos: "phr.",
    lessonLabel: "درس 15 — حرف اضافه + اسم"
  },
  {
    word: "on purpose",
    meaning: "عمداً",
    lesson: 15,
    pos: "phr.",
    lessonLabel: "درس 15 — حرف اضافه + اسم"
  },
  {
    word: "on time",
    meaning: "سر وقت (دقیقاً در زمان مقرر)",
    lesson: 15,
    pos: "phr.",
    lessonLabel: "درس 15 — حرف اضافه + اسم"
  },
  {
    word: "in time",
    meaning: "به‌موقع (قبل از زمان لازم)",
    lesson: 15,
    pos: "phr.",
    lessonLabel: "درس 15 — حرف اضافه + اسم"
  },
  {
    word: "in the end",
    meaning: "در نهایت، سرانجام",
    lesson: 15,
    pos: "phr.",
    lessonLabel: "درس 15 — حرف اضافه + اسم"
  },
  {
    word: "at the end of",
    meaning: "در پایانِ (مثلاً کتاب)",
    lesson: 15,
    pos: "phr.",
    lessonLabel: "درس 15 — حرف اضافه + اسم"
  },
  {
    word: "in business",
    meaning: "در کار تجارت، تاجر",
    lesson: 15,
    pos: "phr.",
    lessonLabel: "درس 15 — حرف اضافه + اسم"
  },
  {
    word: "on business",
    meaning: "برای کار (نه تعطیلات)",
    lesson: 15,
    pos: "phr.",
    lessonLabel: "درس 15 — حرف اضافه + اسم"
  },
  {
    word: "in a moment",
    meaning: "به‌زودی",
    lesson: 15,
    pos: "phr.",
    lessonLabel: "درس 15 — حرف اضافه + اسم"
  },
  {
    word: "at the moment",
    meaning: "در حال حاضر، الان",
    lesson: 15,
    pos: "phr.",
    lessonLabel: "درس 15 — حرف اضافه + اسم"
  },
  {
    word: "(I'm) sorry.",
    meaning: "متأسفم",
    lesson: 16,
    pos: "phr.",
    lessonLabel: "درس 16 — عذرخواهی، بهانه و تشکر"
  },
  {
    word: "I'm (very/terribly) sorry.",
    meaning: "خیلی/شدیداً متأسفم",
    lesson: 16,
    pos: "phr.",
    lessonLabel: "درس 16 — عذرخواهی، بهانه و تشکر"
  },
  {
    word: "I beg your pardon. (fml)",
    meaning: "عذر می‌خواهم (رسمی)",
    lesson: 16,
    pos: "phr.",
    lessonLabel: "درس 16 — عذرخواهی، بهانه و تشکر"
  },
  {
    word: "I'm sorry to disturb you.",
    meaning: "ببخشید که مزاحم شما می‌شوم",
    lesson: 16,
    pos: "phr.",
    lessonLabel: "درس 16 — عذرخواهی، بهانه و تشکر"
  },
  {
    word: "I'm sorry I'm late.",
    meaning: "ببخشید که دیر کردم",
    lesson: 16,
    pos: "phr.",
    lessonLabel: "درس 16 — عذرخواهی، بهانه و تشکر"
  },
  {
    word: "(I'm) sorry to keep you waiting.",
    meaning: "ببخشید که منتظر نگهتان داشتم",
    lesson: 16,
    pos: "phr.",
    lessonLabel: "درس 16 — عذرخواهی، بهانه و تشکر"
  },
  {
    word: "I won't be long.",
    meaning: "زودی برمی‌گردم/دیر نمی‌کنم",
    lesson: 16,
    pos: "phr.",
    lessonLabel: "درس 16 — عذرخواهی، بهانه و تشکر"
  },
  {
    word: "apologise",
    meaning: "عذرخواهی کردن",
    lesson: 16,
    pos: "v.",
    lessonLabel: "درس 16 — عذرخواهی، بهانه و تشکر"
  },
  {
    word: "apology",
    meaning: "عذرخواهی",
    lesson: 16,
    pos: "n.",
    lessonLabel: "درس 16 — عذرخواهی، بهانه و تشکر"
  },
  {
    word: "excuse",
    meaning: "بهانه، عذر",
    lesson: 16,
    pos: "n.",
    lessonLabel: "درس 16 — عذرخواهی، بهانه و تشکر"
  },
  {
    word: "delayed",
    meaning: "دچار تأخیر شده",
    lesson: 16,
    pos: "adj.",
    lessonLabel: "درس 16 — عذرخواهی، بهانه و تشکر"
  },
  {
    word: "got held up",
    meaning: "گرفتار شدن، معطل شدن",
    lesson: 16,
    pos: "phr.",
    lessonLabel: "درس 16 — عذرخواهی، بهانه و تشکر"
  },
  {
    word: "was cancelled",
    meaning: "لغو شد",
    lesson: 16,
    pos: "phr.",
    lessonLabel: "درس 16 — عذرخواهی، بهانه و تشکر"
  },
  {
    word: "clear it up",
    meaning: "مرتب کردن، جمع کردن",
    lesson: 16,
    pos: "phr.",
    lessonLabel: "درس 16 — عذرخواهی، بهانه و تشکر"
  },
  {
    word: "sort it out",
    meaning: "حل کردن مشکل",
    lesson: 16,
    pos: "phr.",
    lessonLabel: "درس 16 — عذرخواهی، بهانه و تشکر"
  },
  {
    word: "reassure",
    meaning: "اطمینان دادن",
    lesson: 16,
    pos: "v.",
    lessonLabel: "درس 16 — عذرخواهی، بهانه و تشکر"
  },
  {
    word: "That's OK. Don't worry.",
    meaning: "اشکالی ندارد، نگران نباشید",
    lesson: 16,
    pos: "phr.",
    lessonLabel: "درس 16 — عذرخواهی، بهانه و تشکر"
  },
  {
    word: "Never mind. It doesn't matter.",
    meaning: "مهم نیست، اشکالی ندارد",
    lesson: 16,
    pos: "phr.",
    lessonLabel: "درس 16 — عذرخواهی، بهانه و تشکر"
  },
  {
    word: "thank you (very much)",
    meaning: "خیلی ممنون",
    lesson: 16,
    pos: "phr.",
    lessonLabel: "درس 16 — عذرخواهی، بهانه و تشکر"
  },
  {
    word: "thanks (a lot)",
    meaning: "ممنون (خیلی)",
    lesson: 16,
    pos: "phr.",
    lessonLabel: "درس 16 — عذرخواهی، بهانه و تشکر"
  },
  {
    word: "No problem.",
    meaning: "مشکلی نیست",
    lesson: 16,
    pos: "phr.",
    lessonLabel: "درس 16 — عذرخواهی، بهانه و تشکر"
  },
  {
    word: "That's very kind of you.",
    meaning: "خیلی لطف شماست",
    lesson: 16,
    pos: "phr.",
    lessonLabel: "درس 16 — عذرخواهی، بهانه و تشکر"
  },
  {
    word: "pass me the salt",
    meaning: "نمک را به من بده",
    lesson: 17,
    pos: "phr.",
    lessonLabel: "درس 17 — درخواست، دعوت و پیشنهاد"
  },
  {
    word: "Could you possibly",
    meaning: "ممکن است لطفاً...",
    lesson: 17,
    pos: "phr.",
    lessonLabel: "درس 17 — درخواست، دعوت و پیشنهاد"
  },
  {
    word: "borrow",
    meaning: "قرض گرفتن",
    lesson: 17,
    pos: "v.",
    lessonLabel: "درس 17 — درخواست، دعوت و پیشنهاد"
  },
  {
    word: "lend",
    meaning: "قرض دادن",
    lesson: 17,
    pos: "v.",
    lessonLabel: "درس 17 — درخواست، دعوت و پیشنهاد"
  },
  {
    word: "help yourself",
    meaning: "بفرمایید، خودتان بردارید",
    lesson: 17,
    pos: "phr.",
    lessonLabel: "درس 17 — درخواست، دعوت و پیشنهاد"
  },
  {
    word: "I'm afraid I can't",
    meaning: "متأسفانه نمی‌توانم",
    lesson: 17,
    pos: "phr.",
    lessonLabel: "درس 17 — درخواست، دعوت و پیشنهاد"
  },
  {
    word: "on me",
    meaning: "با خودم",
    lesson: 17,
    pos: "phr.",
    lessonLabel: "درس 17 — درخواست، دعوت و پیشنهاد"
  },
  {
    word: "I was wondering if I could",
    meaning: "می‌خواستم بپرسم آیا می‌توانم...",
    lesson: 17,
    pos: "phr.",
    lessonLabel: "درس 17 — درخواست، دعوت و پیشنهاد"
  },
  {
    word: "Would you like to",
    meaning: "دوست دارید...",
    lesson: 17,
    pos: "phr.",
    lessonLabel: "درس 17 — درخواست، دعوت و پیشنهاد"
  },
  {
    word: "I'd love to",
    meaning: "خیلی دوست دارم",
    lesson: 17,
    pos: "phr.",
    lessonLabel: "درس 17 — درخواست، دعوت و پیشنهاد"
  },
  {
    word: "I'm sorry, I can't",
    meaning: "متأسفم، نمی‌توانم",
    lesson: 17,
    pos: "phr.",
    lessonLabel: "درس 17 — درخواست، دعوت و پیشنهاد"
  },
  {
    word: "We were wondering if you'd like to",
    meaning: "می‌خواستیم بپرسیم آیا دوست دارید...",
    lesson: 17,
    pos: "phr.",
    lessonLabel: "درس 17 — درخواست، دعوت و پیشنهاد"
  },
  {
    word: "suggestion",
    meaning: "پیشنهاد",
    lesson: 17,
    pos: "n.",
    lessonLabel: "درس 17 — درخواست، دعوت و پیشنهاد"
  },
  {
    word: "invitation",
    meaning: "دعوت",
    lesson: 17,
    pos: "n.",
    lessonLabel: "درس 17 — درخواست، دعوت و پیشنهاد"
  },
  {
    word: "request",
    meaning: "درخواست",
    lesson: 17,
    pos: "n.",
    lessonLabel: "درس 17 — درخواست، دعوت و پیشنهاد"
  },
  {
    word: "What shall we do?",
    meaning: "چه کار کنیم؟",
    lesson: 17,
    pos: "phr.",
    lessonLabel: "درس 17 — درخواست، دعوت و پیشنهاد"
  },
  {
    word: "fancy",
    meaning: "دلخواستن، میل داشتن",
    lesson: 17,
    pos: "v.",
    lessonLabel: "درس 17 — درخواست، دعوت و پیشنهاد"
  },
  {
    word: "How about / What about + -ing",
    meaning: "چطور است که...",
    lesson: 17,
    pos: "phr.",
    lessonLabel: "درس 17 — درخواست، دعوت و پیشنهاد"
  },
  {
    word: "Perhaps we could",
    meaning: "شاید بتوانیم...",
    lesson: 17,
    pos: "phr.",
    lessonLabel: "درس 17 — درخواست، دعوت و پیشنهاد"
  },
  {
    word: "Why don't we",
    meaning: "چرا ما... نکنیم",
    lesson: 17,
    pos: "phr.",
    lessonLabel: "درس 17 — درخواست، دعوت و پیشنهاد"
  },
  {
    word: "Do you fancy going to",
    meaning: "دوست داری برویم به...",
    lesson: 17,
    pos: "phr.",
    lessonLabel: "درس 17 — درخواست، دعوت و پیشنهاد"
  },
  {
    word: "that's a good idea",
    meaning: " idea خوبی است",
    lesson: 17,
    pos: "phr.",
    lessonLabel: "درس 17 — درخواست، دعوت و پیشنهاد"
  },
  {
    word: "that sounds great",
    meaning: "به نظر عالی می‌آید",
    lesson: 17,
    pos: "phr.",
    lessonLabel: "درس 17 — درخواست، دعوت و پیشنهاد"
  },
  {
    word: "if you like",
    meaning: "اگر بخواهی",
    lesson: 17,
    pos: "phr.",
    lessonLabel: "درس 17 — درخواست، دعوت و پیشنهاد"
  },
  {
    word: "I don't mind",
    meaning: "برای من فرقی ندارد",
    lesson: 17,
    pos: "phr.",
    lessonLabel: "درس 17 — درخواست، دعوت و پیشنهاد"
  },
  {
    word: "I'd rather",
    meaning: "ترجیح می‌دهم",
    lesson: 17,
    pos: "phr.",
    lessonLabel: "درس 17 — درخواست، دعوت و پیشنهاد"
  },
  {
    word: "What do you think of ...?",
    meaning: "نظرت دربارهٔ ... چیه؟ (دربارهٔ شخص/چیز خاص)",
    lesson: 18,
    pos: "phr.",
    lessonLabel: "درس 18 — نظرها، موافقت و مخالفت"
  },
  {
    word: "What do you think about ...?",
    meaning: "نظرت دربارهٔ ... چیه؟ (دربارهٔ موضوع کلی)",
    lesson: 18,
    pos: "phr.",
    lessonLabel: "درس 18 — نظرها، موافقت و مخالفت"
  },
  {
    word: "How do you feel about ...?",
    meaning: "نظرت دربارهٔ ... چیه؟ / چه حسی دربارهٔ ... داری؟",
    lesson: 18,
    pos: "phr.",
    lessonLabel: "درس 18 — نظرها، موافقت و مخالفت"
  },
  {
    word: "(Personally) I think ...",
    meaning: "(شخصاً) فکر می‌کنم ...",
    lesson: 18,
    pos: "phr.",
    lessonLabel: "درس 18 — نظرها، موافقت و مخالفت"
  },
  {
    word: "(Personally) I don't think it's a good idea",
    meaning: "(شخصاً) فکر نمی‌کنم ایدهٔ خوبی باشه",
    lesson: 18,
    pos: "phr.",
    lessonLabel: "درس 18 — نظرها، موافقت و مخالفت"
  },
  {
    word: "In my opinion",
    meaning: "به نظر من",
    lesson: 18,
    pos: "phr.",
    lessonLabel: "درس 18 — نظرها، موافقت و مخالفت"
  },
  {
    word: "brilliant",
    meaning: "فوق‌العاده، عالی",
    lesson: 18,
    pos: "adj.",
    lessonLabel: "درس 18 — نظرها، موافقت و مخالفت"
  },
  {
    word: "disgusting",
    meaning: "وحشتناک، خیلی ناخوشایند، غیرقابل قبول",
    lesson: 18,
    pos: "adj.",
    lessonLabel: "درس 18 — نظرها، موافقت و مخالفت"
  },
  {
    word: "ridiculous",
    meaning: "پوچ و مسخره، احمقانه",
    lesson: 18,
    pos: "adj.",
    lessonLabel: "درس 18 — نظرها، موافقت و مخالفت"
  },
  {
    word: "original",
    meaning: "بدیع، جدید و متفاوت",
    lesson: 18,
    pos: "adj.",
    lessonLabel: "درس 18 — نظرها، موافقت و مخالفت"
  },
  {
    word: "According to ...",
    meaning: "طبق / بر اساس (نظر روزنامه و ...)",
    lesson: 18,
    pos: "phr.",
    lessonLabel: "درس 18 — نظرها، موافقت و مخالفت"
  },
  {
    word: "I agree (with you)",
    meaning: "موافقم (با تو)",
    lesson: 18,
    pos: "phr.",
    lessonLabel: "درس 18 — نظرها، موافقت و مخالفت"
  },
  {
    word: "You're (absolutely) right",
    meaning: "(کاملاً) حق با توئه",
    lesson: 18,
    pos: "phr.",
    lessonLabel: "درس 18 — نظرها، موافقت و مخالفت"
  },
  {
    word: "possibly",
    meaning: "شاید، ممکنه",
    lesson: 18,
    pos: "adv.",
    lessonLabel: "درس 18 — نظرها، موافقت و مخالفت"
  },
  {
    word: "perhaps/maybe",
    meaning: "شاید",
    lesson: 18,
    pos: "adv.",
    lessonLabel: "درس 18 — نظرها، موافقت و مخالفت"
  },
  {
    word: "you could be right",
    meaning: "ممکنه حق با تو باشه",
    lesson: 18,
    pos: "phr.",
    lessonLabel: "درس 18 — نظرها، موافقت و مخالفت"
  },
  {
    word: "but don't you think ...",
    meaning: "اما فکر نمی‌کنی که ...",
    lesson: 18,
    pos: "phr.",
    lessonLabel: "درس 18 — نظرها، موافقت و مخالفت"
  },
  {
    word: "but I'm not sure that ...",
    meaning: "اما مطمئن نیستم که ...",
    lesson: 18,
    pos: "phr.",
    lessonLabel: "درس 18 — نظرها، موافقت و مخالفت"
  },
  {
    word: "but don't forget ...",
    meaning: "اما فراموش نکن که ...",
    lesson: 18,
    pos: "phr.",
    lessonLabel: "درس 18 — نظرها، موافقت و مخالفت"
  },
  {
    word: "I see what you mean",
    meaning: "منظورت رو می‌فهمم",
    lesson: 18,
    pos: "phr.",
    lessonLabel: "درس 18 — نظرها، موافقت و مخالفت"
  },
  {
    word: "I take your point",
    meaning: "حرفت رو قبول دارم / منظورت رو می‌گیرم",
    lesson: 18,
    pos: "phr.",
    lessonLabel: "درس 18 — نظرها، موافقت و مخالفت"
  },
  {
    word: "I totally disagree (with you)",
    meaning: "کاملاً مخالفم (با تو)",
    lesson: 18,
    pos: "phr.",
    lessonLabel: "درس 18 — نظرها، موافقت و مخالفت"
  },
  {
    word: "I'm afraid I don't agree (with you) at all",
    meaning: "متأسفانه اصلاً موافق نیستم (با تو)",
    lesson: 18,
    pos: "phr.",
    lessonLabel: "درس 18 — نظرها، موافقت و مخالفت"
  },
  {
    word: "love",
    meaning: "عاشق بودن، خیلی دوست داشتن",
    lesson: 19,
    pos: "v.",
    lessonLabel: "درس 19 — علاقه‌ها، ترجیح‌ها و علایق"
  },
  {
    word: "be really into",
    meaning: "خیلی به چیزی علاقه داشتن (غیررسمی)",
    lesson: 19,
    pos: "phr.",
    lessonLabel: "درس 19 — علاقه‌ها، ترجیح‌ها و علایق"
  },
  {
    word: "like",
    meaning: "دوست داشتن",
    lesson: 19,
    pos: "v.",
    lessonLabel: "درس 19 — علاقه‌ها، ترجیح‌ها و علایق"
  },
  {
    word: "quite like",
    meaning: "تا حدی دوست داشتن",
    lesson: 19,
    pos: "phr.",
    lessonLabel: "درس 19 — علاقه‌ها، ترجیح‌ها و علایق"
  },
  {
    word: "don't mind",
    meaning: "مهم نیست، اشکالی ندارد",
    lesson: 19,
    pos: "phr.",
    lessonLabel: "درس 19 — علاقه‌ها، ترجیح‌ها و علایق"
  },
  {
    word: "be not very keen on",
    meaning: "زیاد علاقه نداشتن به",
    lesson: 19,
    pos: "phr.",
    lessonLabel: "درس 19 — علاقه‌ها، ترجیح‌ها و علایق"
  },
  {
    word: "can't stand",
    meaning: "نمی‌توانم تحمل کنم",
    lesson: 19,
    pos: "phr.",
    lessonLabel: "درس 19 — علاقه‌ها، ترجیح‌ها و علایق"
  },
  {
    word: "hate",
    meaning: "متنفر بودن از",
    lesson: 19,
    pos: "v.",
    lessonLabel: "درس 19 — علاقه‌ها، ترجیح‌ها و علایق"
  },
  {
    word: "dislike",
    meaning: "دوست نداشتن",
    lesson: 19,
    pos: "v.",
    lessonLabel: "درس 19 — علاقه‌ها، ترجیح‌ها و علایق"
  },
  {
    word: "and that sort of thing",
    meaning: "و چیزهایی از این قبیل",
    lesson: 19,
    pos: "phr.",
    lessonLabel: "درس 19 — علاقه‌ها، ترجیح‌ها و علایق"
  },
  {
    word: "and stuff like that",
    meaning: "و چیزهایی مثل آن",
    lesson: 19,
    pos: "phr.",
    lessonLabel: "درس 19 — علاقه‌ها، ترجیح‌ها و علایق"
  },
  {
    word: "things like that",
    meaning: "چیزهای این‌چنینی",
    lesson: 19,
    pos: "phr.",
    lessonLabel: "درس 19 — علاقه‌ها، ترجیح‌ها و علایق"
  },
  {
    word: "What kind of things/sort of stuff do you like?",
    meaning: "چه نوع چیزهایی دوست داری؟",
    lesson: 19,
    pos: "phr.",
    lessonLabel: "درس 19 — علاقه‌ها، ترجیح‌ها و علایق"
  },
  {
    word: "look forward to",
    meaning: "بی‌صبرانه منتظر چیزی بودن",
    lesson: 19,
    pos: "phr.",
    lessonLabel: "درس 19 — علاقه‌ها، ترجیح‌ها و علایق"
  },
  {
    word: "I look forward to hearing from you",
    meaning: "منتظر پاسخ شما هستم (پایان‌نامه رسمی)",
    lesson: 19,
    pos: "phr.",
    lessonLabel: "درس 19 — علاقه‌ها، ترجیح‌ها و علایق"
  },
  {
    word: "prefer",
    meaning: "ترجیح دادن",
    lesson: 19,
    pos: "v.",
    lessonLabel: "درس 19 — علاقه‌ها، ترجیح‌ها و علایق"
  },
  {
    word: "would prefer",
    meaning: "ترجیح دادن (موقعیت خاص)",
    lesson: 19,
    pos: "phr.",
    lessonLabel: "درس 19 — علاقه‌ها، ترجیح‌ها و علایق"
  },
  {
    word: "would rather",
    meaning: "بیشتر دوست داشتن (در گفتار رایج‌تر)",
    lesson: 19,
    pos: "phr.",
    lessonLabel: "درس 19 — علاقه‌ها، ترجیح‌ها و علایق"
  },
  {
    word: "be interested in",
    meaning: "علاقه‌مند بودن به",
    lesson: 19,
    pos: "phr.",
    lessonLabel: "درس 19 — علاقه‌ها، ترجیح‌ها و علایق"
  },
  {
    word: "interest",
    meaning: "علاقه‌مند کردن / جالب بودن برای",
    lesson: 19,
    pos: "v.",
    lessonLabel: "درس 19 — علاقه‌ها، ترجیح‌ها و علایق"
  },
  {
    word: "Where are you from?",
    meaning: "اهل کجایی؟ / اهل کجا هستید؟",
    lesson: 20,
    pos: "phr.",
    lessonLabel: "درس 20 — پرسش‌های پرتکرار"
  },
  {
    word: "Where do you come from?",
    meaning: "از کجا می‌آیی؟ / اهل کجایی؟",
    lesson: 20,
    pos: "phr.",
    lessonLabel: "درس 20 — پرسش‌های پرتکرار"
  },
  {
    word: "What do you do?",
    meaning: "شغل شما چیست؟",
    lesson: 20,
    pos: "phr.",
    lessonLabel: "درس 20 — پرسش‌های پرتکرار"
  },
  {
    word: "What are you doing at the moment?",
    meaning: "الان چه کار می‌کنی؟",
    lesson: 20,
    pos: "phr.",
    lessonLabel: "درس 20 — پرسش‌های پرتکرار"
  },
  {
    word: "Are you married?",
    meaning: "متأهل هستی؟",
    lesson: 20,
    pos: "phr.",
    lessonLabel: "درس 20 — پرسش‌های پرتکرار"
  },
  {
    word: "How old are you?",
    meaning: "چند سالت است؟",
    lesson: 20,
    pos: "phr.",
    lessonLabel: "درس 20 — پرسش‌های پرتکرار"
  },
  {
    word: "What's your address/phone number?",
    meaning: "آدرس/شماره تلفنت چیست؟",
    lesson: 20,
    pos: "phr.",
    lessonLabel: "درس 20 — پرسش‌های پرتکرار"
  },
  {
    word: "How are you?",
    meaning: "حالت چطور است؟",
    lesson: 20,
    pos: "phr.",
    lessonLabel: "درس 20 — پرسش‌های پرتکرار"
  },
  {
    word: "How's it going?",
    meaning: "چطور پیش می‌رود؟ (غیررسمی)",
    lesson: 20,
    pos: "phr.",
    lessonLabel: "درس 20 — پرسش‌های پرتکرار"
  },
  {
    word: "What are you doing this evening?",
    meaning: "امشب چه کار می‌کنی؟",
    lesson: 20,
    pos: "phr.",
    lessonLabel: "درس 20 — پرسش‌های پرتکرار"
  },
  {
    word: "What's the matter?",
    meaning: "مشکل چیست؟",
    lesson: 20,
    pos: "phr.",
    lessonLabel: "درس 20 — پرسش‌های پرتکرار"
  },
  {
    word: "Have you got the time?",
    meaning: "ساعت را می‌دانی؟ / وقت را داری؟",
    lesson: 20,
    pos: "phr.",
    lessonLabel: "درس 20 — پرسش‌های پرتکرار"
  },
  {
    word: "How much is that (necklace)?",
    meaning: "قیمت آن (گردنبند) چقدر است؟",
    lesson: 20,
    pos: "phr.",
    lessonLabel: "درس 20 — پرسش‌های پرتکرار"
  },
  {
    word: "What sort/kind of (cheese do you like)?",
    meaning: "چه نوع (پنیری دوست داری)؟",
    lesson: 20,
    pos: "phr.",
    lessonLabel: "درس 20 — پرسش‌های پرتکرار"
  },
  {
    word: "How was (the party)?",
    meaning: "(مهمانی) چطور بود؟",
    lesson: 20,
    pos: "phr.",
    lessonLabel: "درس 20 — پرسش‌های پرتکرار"
  },
  {
    word: "What's (the flat) like?",
    meaning: "(آپارتمان) چطور است؟ / (آپارتمان) را توصیف کن",
    lesson: 20,
    pos: "phr.",
    lessonLabel: "درس 20 — پرسش‌های پرتکرار"
  },
  {
    word: "Whereabouts?",
    meaning: "دقیقاً کجا؟",
    lesson: 20,
    pos: "phr.",
    lessonLabel: "درس 20 — پرسش‌های پرتکرار"
  },
  {
    word: "How far is it?",
    meaning: "چه قدر راه است؟ / فاصله‌اش چقدر است؟",
    lesson: 20,
    pos: "phr.",
    lessonLabel: "درس 20 — پرسش‌های پرتکرار"
  },
  {
    word: "How do I get to the (railway station)?",
    meaning: "چطور به (ایستگاه راه‌آهن) بروم؟",
    lesson: 20,
    pos: "phr.",
    lessonLabel: "درس 20 — پرسش‌های پرتکرار"
  },
  {
    word: "How long have you been here?",
    meaning: "چه مدت اینجا هستی؟",
    lesson: 20,
    pos: "phr.",
    lessonLabel: "درس 20 — پرسش‌های پرتکرار"
  },
  {
    word: "How long are you staying?",
    meaning: "چه مدت می‌مانی؟",
    lesson: 20,
    pos: "phr.",
    lessonLabel: "درس 20 — پرسش‌های پرتکرار"
  },
  {
    word: "How long are you here for?",
    meaning: "برای چه مدت اینجا هستی؟",
    lesson: 20,
    pos: "phr.",
    lessonLabel: "درس 20 — پرسش‌های پرتکرار"
  },
  {
    word: "How much longer are you staying?",
    meaning: "هنوز چه قدر دیگر می‌مانی؟",
    lesson: 20,
    pos: "phr.",
    lessonLabel: "درس 20 — پرسش‌های پرتکرار"
  },
  {
    word: "Is this the first time you've been to (Dublin)?",
    meaning: "اولین بار است که به (دوبلین) آمده‌ای؟",
    lesson: 20,
    pos: "phr.",
    lessonLabel: "درس 20 — پرسش‌های پرتکرار"
  }
];

export const VOCAB_PART_1: Row[] = ROWS;
