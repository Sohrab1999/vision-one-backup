// واژگان درس‌های English Vocabulary in Use — Elementary (پارتیت 1) — استخراج VLM از اسکن PDF
// word = عین چاپ کتاب · meaning = ترجمهٔ ماشینی GLM (کلاس FA-NEW — اثبات صحت ترجمه نیست)
import type { VocabWord } from "../types";

type Row = Omit<VocabWord, "lesson"> & { lesson: number; lessonLabel: string };

const ROWS: Row[] = [
  {
    word: "noun",
    meaning: "اسم (کلمه‌ای که شخص یا چیزی را نام می‌برد)",
    lesson: 1,
    pos: "n.",
    lessonLabel: "درس 1 — گفت‌وگو دربارهٔ زبان (اسم، فعل، جمع و…)"
  },
  {
    word: "verb",
    meaning: "فعل (کاری که انجام می‌دهیم)",
    lesson: 1,
    pos: "n.",
    lessonLabel: "درس 1 — گفت‌وگو دربارهٔ زبان (اسم، فعل، جمع و…)"
  },
  {
    word: "adjective",
    meaning: "صفت (شخص یا چیزی را توصیف می‌کند)",
    lesson: 1,
    pos: "n.",
    lessonLabel: "درس 1 — گفت‌وگو دربارهٔ زبان (اسم، فعل، جمع و…)"
  },
  {
    word: "adverb",
    meaning: "قید (فعل را توصیف می‌کند)",
    lesson: 1,
    pos: "n.",
    lessonLabel: "درس 1 — گفت‌وگو دربارهٔ زبان (اسم، فعل، جمع و…)"
  },
  {
    word: "preposition",
    meaning: "حرف اضافه (کلمهٔ کوچکی که قبل از اسم یا ضمیر می‌آید)",
    lesson: 1,
    pos: "n.",
    lessonLabel: "درس 1 — گفت‌وگو دربارهٔ زبان (اسم، فعل، جمع و…)"
  },
  {
    word: "singular",
    meaning: "مفرد (فقط یکی)",
    lesson: 1,
    pos: "n.",
    lessonLabel: "درس 1 — گفت‌وگو دربارهٔ زبان (اسم، فعل، جمع و…)"
  },
  {
    word: "plural",
    meaning: "جمع (بیشتر از یکی)",
    lesson: 1,
    pos: "n.",
    lessonLabel: "درس 1 — گفت‌وگو دربارهٔ زبان (اسم، فعل، جمع و…)"
  },
  {
    word: "phrase",
    meaning: "عبارت (گروهی از کلمات، نه جملهٔ کامل)",
    lesson: 1,
    pos: "n.",
    lessonLabel: "درس 1 — گفت‌وگو دربارهٔ زبان (اسم، فعل، جمع و…)"
  },
  {
    word: "sentence",
    meaning: "جمله (یک ایدهٔ کامل در نوشتار، با حرف بزرگ شروع و با نقطه پایان می‌یابد)",
    lesson: 1,
    pos: "n.",
    lessonLabel: "درس 1 — گفت‌وگو دربارهٔ زبان (اسم، فعل، جمع و…)"
  },
  {
    word: "capital letter",
    meaning: "حرف بزرگ الفبا",
    lesson: 1,
    pos: "n.",
    lessonLabel: "درس 1 — گفت‌وگو دربارهٔ زبان (اسم، فعل، جمع و…)"
  },
  {
    word: "full stop",
    meaning: "نقطه (علامت پایان جمله)",
    lesson: 1,
    pos: "n.",
    lessonLabel: "درس 1 — گفت‌وگو دربارهٔ زبان (اسم، فعل، جمع و…)"
  },
  {
    word: "paragraph",
    meaning: "پاراگراف (بخش کوتاهی از متن که در خط جدیدی شروع می‌شود)",
    lesson: 1,
    pos: "n.",
    lessonLabel: "درس 1 — گفت‌وگو دربارهٔ زبان (اسم، فعل، جمع و…)"
  },
  {
    word: "dialogue",
    meaning: "گفت‌وگو (مکالمه بین دو نفر)",
    lesson: 1,
    pos: "n.",
    lessonLabel: "درس 1 — گفت‌وگو دربارهٔ زبان (اسم، فعل، جمع و…)"
  },
  {
    word: "question",
    meaning: "سؤال (مجموعه‌ای از کلمات که با حرف بزرگ شروع و با علامت سؤال پایان می‌یابد)",
    lesson: 1,
    pos: "n.",
    lessonLabel: "درس 1 — گفت‌وگو دربارهٔ زبان (اسم، فعل، جمع و…)"
  },
  {
    word: "question mark",
    meaning: "علامت سؤال",
    lesson: 1,
    pos: "n.",
    lessonLabel: "درس 1 — گفت‌وگو دربارهٔ زبان (اسم، فعل، جمع و…)"
  },
  {
    word: "answer",
    meaning: "پاسخ (جواب یک سؤال)",
    lesson: 1,
    pos: "n.",
    lessonLabel: "درس 1 — گفت‌وگو دربارهٔ زبان (اسم، فعل، جمع و…)"
  },
  {
    word: "Match the words on the left with the words on the right. Draw lines.",
    meaning: "کلمات سمت چپ را به کلمات سمت راست وصل کنید. خط بکشید.",
    lesson: 1,
    pos: "phr.",
    lessonLabel: "درس 1 — گفت‌وگو دربارهٔ زبان (اسم، فعل، جمع و…)"
  },
  {
    word: "Fill the gaps in the sentence.",
    meaning: "جای خالی‌های جمله را پر کنید.",
    lesson: 1,
    pos: "phr.",
    lessonLabel: "درس 1 — گفت‌وگو دربارهٔ زبان (اسم، فعل، جمع و…)"
  },
  {
    word: "Correct the mistakes in the sentences.",
    meaning: "اشتباهات جمله‌ها را تصحیح کنید.",
    lesson: 1,
    pos: "phr.",
    lessonLabel: "درس 1 — گفت‌وگو دربارهٔ زبان (اسم، فعل، جمع و…)"
  },
  {
    word: "Complete the sentence for yourself.",
    meaning: "جمله را برای خودتان کامل کنید.",
    lesson: 1,
    pos: "phr.",
    lessonLabel: "درس 1 — گفت‌وگو دربارهٔ زبان (اسم، فعل، جمع و…)"
  },
  {
    word: "Add another example.",
    meaning: "یک مثال دیگر اضافه کنید.",
    lesson: 1,
    pos: "phr.",
    lessonLabel: "درس 1 — گفت‌وگو دربارهٔ زبان (اسم، فعل، جمع و…)"
  },
  {
    word: "do an exercise",
    meaning: "انجام دادن تمرین",
    lesson: 2,
    pos: "phr.",
    lessonLabel: "درس 2 — یادگیری واژگان (هم‌نشینی، تصویرها و نمودارها)"
  },
  {
    word: "make a mistake",
    meaning: "اشتباه کردن",
    lesson: 2,
    pos: "phr.",
    lessonLabel: "درس 2 — یادگیری واژگان (هم‌نشینی، تصویرها و نمودارها)"
  },
  {
    word: "make mistakes",
    meaning: "اشتباه کردن",
    lesson: 2,
    pos: "phr.",
    lessonLabel: "درس 2 — یادگیری واژگان (هم‌نشینی، تصویرها و نمودارها)"
  },
  {
    word: "collocation",
    meaning: "هم‌آیی (هم‌نشینی واژگانی)",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — یادگیری واژگان (هم‌نشینی، تصویرها و نمودارها)"
  },
  {
    word: "go by train",
    meaning: "با قطار رفتن",
    lesson: 2,
    pos: "phr.",
    lessonLabel: "درس 2 — یادگیری واژگان (هم‌نشینی، تصویرها و نمودارها)"
  },
  {
    word: "on foot",
    meaning: "پیاده (= راه رفتن)",
    lesson: 2,
    pos: "phr.",
    lessonLabel: "درس 2 — یادگیری واژگان (هم‌نشینی، تصویرها و نمودارها)"
  },
  {
    word: "preposition",
    meaning: "حرف اضافه",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — یادگیری واژگان (هم‌نشینی، تصویرها و نمودارها)"
  },
  {
    word: "noun",
    meaning: "اسم",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — یادگیری واژگان (هم‌نشینی، تصویرها و نمودارها)"
  },
  {
    word: "good at",
    meaning: "خوب بودن در",
    lesson: 2,
    pos: "adj.",
    lessonLabel: "درس 2 — یادگیری واژگان (هم‌نشینی، تصویرها و نمودارها)"
  },
  {
    word: "adjective",
    meaning: "صفت",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — یادگیری واژگان (هم‌نشینی، تصویرها و نمودارها)"
  },
  {
    word: "tall man",
    meaning: "مرد بلندقد",
    lesson: 2,
    pos: "phr.",
    lessonLabel: "درس 2 — یادگیری واژگان (هم‌نشینی، تصویرها و نمودارها)"
  },
  {
    word: "word family",
    meaning: "خانوادهٔ واژگانی",
    lesson: 2,
    pos: "phr.",
    lessonLabel: "درس 2 — یادگیری واژگان (هم‌نشینی، تصویرها و نمودارها)"
  },
  {
    word: "temperature",
    meaning: "دما",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — یادگیری واژگان (هم‌نشینی، تصویرها و نمودارها)"
  },
  {
    word: "hot",
    meaning: "داغ",
    lesson: 2,
    pos: "adj.",
    lessonLabel: "درس 2 — یادگیری واژگان (هم‌نشینی، تصویرها و نمودارها)"
  },
  {
    word: "warm",
    meaning: "گرم",
    lesson: 2,
    pos: "adj.",
    lessonLabel: "درس 2 — یادگیری واژگان (هم‌نشینی، تصویرها و نمودارها)"
  },
  {
    word: "cool",
    meaning: "خنک",
    lesson: 2,
    pos: "adj.",
    lessonLabel: "درس 2 — یادگیری واژگان (هم‌نشینی، تصویرها و نمودارها)"
  },
  {
    word: "cold",
    meaning: "سرد",
    lesson: 2,
    pos: "adj.",
    lessonLabel: "درس 2 — یادگیری واژگان (هم‌نشینی، تصویرها و نمودارها)"
  },
  {
    word: "travel",
    meaning: "سفر",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — یادگیری واژگان (هم‌نشینی، تصویرها و نمودارها)"
  },
  {
    word: "ticket",
    meaning: "بلیت",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — یادگیری واژگان (هم‌نشینی، تصویرها و نمودارها)"
  },
  {
    word: "passport",
    meaning: "گذرنامه",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — یادگیری واژگان (هم‌نشینی، تصویرها و نمودارها)"
  },
  {
    word: "suitcase",
    meaning: "چمدان",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — یادگیری واژگان (هم‌نشینی، تصویرها و نمودارها)"
  },
  {
    word: "car",
    meaning: "ماشین",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — یادگیری واژگان (هم‌نشینی، تصویرها و نمودارها)"
  },
  {
    word: "windscreen",
    meaning: "شیشهٔ جلوی ماشین",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — یادگیری واژگان (هم‌نشینی، تصویرها و نمودارها)"
  },
  {
    word: "boot",
    meaning: "صندوق عقب ماشین",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — یادگیری واژگان (هم‌نشینی، تصویرها و نمودارها)"
  },
  {
    word: "window",
    meaning: "پنجره",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — یادگیری واژگان (هم‌نشینی، تصویرها و نمودارها)"
  },
  {
    word: "wheel",
    meaning: "چرخ",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — یادگیری واژگان (هم‌نشینی، تصویرها و نمودارها)"
  },
  {
    word: "door",
    meaning: "در",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — یادگیری واژگان (هم‌نشینی، تصویرها و نمودارها)"
  },
  {
    word: "headlight",
    meaning: "چراغ جلو ماشین",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — یادگیری واژگان (هم‌نشینی، تصویرها و نمودارها)"
  },
  {
    word: "knife",
    meaning: "چنگال نه — چاقو",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — یادگیری واژگان (هم‌نشینی، تصویرها و نمودارها)"
  },
  {
    word: "fork",
    meaning: "چنگال",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — یادگیری واژگان (هم‌نشینی، تصویرها و نمودارها)"
  },
  {
    word: "spoon",
    meaning: "قاشق",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — یادگیری واژگان (هم‌نشینی، تصویرها و نمودارها)"
  },
  {
    word: "eat",
    meaning: "خوردن",
    lesson: 2,
    pos: "v.",
    lessonLabel: "درس 2 — یادگیری واژگان (هم‌نشینی، تصویرها و نمودارها)"
  },
  {
    word: "glass",
    meaning: "لیوان",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — یادگیری واژگان (هم‌نشینی، تصویرها و نمودارها)"
  },
  {
    word: "cup",
    meaning: "فنجان",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — یادگیری واژگان (هم‌نشینی، تصویرها و نمودارها)"
  },
  {
    word: "mug",
    meaning: "ماگ",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — یادگیری واژگان (هم‌نشینی، تصویرها و نمودارها)"
  },
  {
    word: "drink",
    meaning: "نوشیدن",
    lesson: 2,
    pos: "v.",
    lessonLabel: "درس 2 — یادگیری واژگان (هم‌نشینی، تصویرها و نمودارها)"
  },
  {
    word: "diagram",
    meaning: "نمودار",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — یادگیری واژگان (هم‌نشینی، تصویرها و نمودارها)"
  },
  {
    word: "have lunch",
    meaning: "ناهار خوردن",
    lesson: 3,
    lessonLabel: "درس 3 — have و had (صبحانه خوردن، وقت داشتن)"
  },
  {
    word: "have a party",
    meaning: "مهمانی گرفتن",
    lesson: 3,
    lessonLabel: "درس 3 — have و had (صبحانه خوردن، وقت داشتن)"
  },
  {
    word: "have a lesson",
    meaning: "درس داشتن / کلاس داشتن",
    lesson: 3,
    lessonLabel: "درس 3 — have و had (صبحانه خوردن، وقت داشتن)"
  },
  {
    word: "have a cup of tea/coffee",
    meaning: "یک فنجان چای/قهوه نوشیدن",
    lesson: 3,
    lessonLabel: "درس 3 — have و had (صبحانه خوردن، وقت داشتن)"
  },
  {
    word: "have a shower",
    meaning: "دوش گرفتن",
    lesson: 3,
    lessonLabel: "درس 3 — have و had (صبحانه خوردن، وقت داشتن)"
  },
  {
    word: "lunch",
    meaning: "ناهار",
    lesson: 3,
    pos: "n.",
    lessonLabel: "درس 3 — have و had (صبحانه خوردن، وقت داشتن)"
  },
  {
    word: "dinner",
    meaning: "شام",
    lesson: 3,
    pos: "n.",
    lessonLabel: "درس 3 — have و had (صبحانه خوردن، وقت داشتن)"
  },
  {
    word: "breakfast",
    meaning: "صبحانه",
    lesson: 3,
    pos: "n.",
    lessonLabel: "درس 3 — have و had (صبحانه خوردن، وقت داشتن)"
  },
  {
    word: "a meal",
    meaning: "یک وعده غذایی",
    lesson: 3,
    pos: "n.",
    lessonLabel: "درس 3 — have و had (صبحانه خوردن، وقت داشتن)"
  },
  {
    word: "something to eat",
    meaning: "چیزی برای خوردن",
    lesson: 3,
    lessonLabel: "درس 3 — have و had (صبحانه خوردن، وقت داشتن)"
  },
  {
    word: "a party",
    meaning: "مهمانی",
    lesson: 3,
    pos: "n.",
    lessonLabel: "درس 3 — have و had (صبحانه خوردن، وقت داشتن)"
  },
  {
    word: "a meeting",
    meaning: "جلسه",
    lesson: 3,
    pos: "n.",
    lessonLabel: "درس 3 — have و had (صبحانه خوردن، وقت داشتن)"
  },
  {
    word: "a competition",
    meaning: "مسابقه",
    lesson: 3,
    pos: "n.",
    lessonLabel: "درس 3 — have و had (صبحانه خوردن، وقت داشتن)"
  },
  {
    word: "a game (of football/chess/cards)",
    meaning: "یک بازی (فوتبال/شطرنج/ورق)",
    lesson: 3,
    pos: "n.",
    lessonLabel: "درس 3 — have و had (صبحانه خوردن، وقت داشتن)"
  },
  {
    word: "a lesson",
    meaning: "درس، کلاس",
    lesson: 3,
    pos: "n.",
    lessonLabel: "درس 3 — have و had (صبحانه خوردن، وقت داشتن)"
  },
  {
    word: "an exam",
    meaning: "امتحان",
    lesson: 3,
    pos: "n.",
    lessonLabel: "درس 3 — have و had (صبحانه خوردن، وقت داشتن)"
  },
  {
    word: "homework",
    meaning: "تکالیف",
    lesson: 3,
    pos: "n.",
    lessonLabel: "درس 3 — have و had (صبحانه خوردن، وقت داشتن)"
  },
  {
    word: "an appointment (with the dentist)",
    meaning: "وقت ملاقات (با دندان‌پزشک)",
    lesson: 3,
    pos: "n.",
    lessonLabel: "درس 3 — have و had (صبحانه خوردن، وقت داشتن)"
  },
  {
    word: "tea/coffee",
    meaning: "چای/قهوه",
    lesson: 3,
    pos: "n.",
    lessonLabel: "درس 3 — have و had (صبحانه خوردن، وقت داشتن)"
  },
  {
    word: "a drink",
    meaning: "یک نوشیدنی",
    lesson: 3,
    pos: "n.",
    lessonLabel: "درس 3 — have و had (صبحانه خوردن، وقت داشتن)"
  },
  {
    word: "a sandwich",
    meaning: "یک ساندویچ",
    lesson: 3,
    pos: "n.",
    lessonLabel: "درس 3 — have و had (صبحانه خوردن، وقت داشتن)"
  },
  {
    word: "an ice-cream",
    meaning: "یک بستنی",
    lesson: 3,
    pos: "n.",
    lessonLabel: "درس 3 — have و had (صبحانه خوردن، وقت داشتن)"
  },
  {
    word: "some cheese",
    meaning: "کمی پنیر",
    lesson: 3,
    pos: "n.",
    lessonLabel: "درس 3 — have و had (صبحانه خوردن، وقت داشتن)"
  },
  {
    word: "a shower",
    meaning: "دوش",
    lesson: 3,
    pos: "n.",
    lessonLabel: "درس 3 — have و had (صبحانه خوردن، وقت داشتن)"
  },
  {
    word: "a bath",
    meaning: "حمام (وان)",
    lesson: 3,
    pos: "n.",
    lessonLabel: "درس 3 — have و had (صبحانه خوردن، وقت داشتن)"
  },
  {
    word: "a swim",
    meaning: "شنا کردن (یک بار شنا)",
    lesson: 3,
    pos: "n.",
    lessonLabel: "درس 3 — have و had (صبحانه خوردن، وقت داشتن)"
  },
  {
    word: "a sauna",
    meaning: "سونا",
    lesson: 3,
    pos: "n.",
    lessonLabel: "درس 3 — have و had (صبحانه خوردن، وقت داشتن)"
  },
  {
    word: "have a look",
    meaning: "نگاه کردن (به چیزی)",
    lesson: 3,
    lessonLabel: "درس 3 — have و had (صبحانه خوردن، وقت داشتن)"
  },
  {
    word: "have a go",
    meaning: "امتحان کردن، یک بار امتحان کردن",
    lesson: 3,
    lessonLabel: "درس 3 — have و had (صبحانه خوردن، وقت داشتن)"
  },
  {
    word: "have a good journey",
    meaning: "سفر خوبی داشته باشی",
    lesson: 3,
    lessonLabel: "درس 3 — have و had (صبحانه خوردن، وقت داشتن)"
  },
  {
    word: "have a moment",
    meaning: "چند لحظه وقت داشتن",
    lesson: 3,
    lessonLabel: "درس 3 — have و had (صبحانه خوردن، وقت داشتن)"
  },
  {
    word: "have a word with you",
    meaning: "چند کلمه صحبت کردن با شما",
    lesson: 3,
    lessonLabel: "درس 3 — have و had (صبحانه خوردن، وقت داشتن)"
  },
  {
    word: "have a good time",
    meaning: "وقت خوشی داشتن",
    lesson: 3,
    lessonLabel: "درس 3 — have و had (صبحانه خوردن، وقت داشتن)"
  },
  {
    word: "have my hair cut",
    meaning: "موهایم را کوتاه کردن",
    lesson: 3,
    lessonLabel: "درس 3 — have و had (صبحانه خوردن، وقت داشتن)"
  },
  {
    word: "have the time",
    meaning: "وقت داشتن",
    lesson: 3,
    lessonLabel: "درس 3 — have و had (صبحانه خوردن، وقت داشتن)"
  },
  {
    word: "have got",
    meaning: "داشتن (محاوره‌ای)",
    lesson: 3,
    lessonLabel: "درس 3 — have و had (صبحانه خوردن، وقت داشتن)"
  },
  {
    word: "haven't got",
    meaning: "نداشتن (محاوره‌ای)",
    lesson: 3,
    lessonLabel: "درس 3 — have و had (صبحانه خوردن، وقت داشتن)"
  },
  {
    word: "have to",
    meaning: "مجبور بودن، باید",
    lesson: 3,
    lessonLabel: "درس 3 — have و had (صبحانه خوردن، وقت داشتن)"
  },
  {
    word: "go",
    meaning: "رفتن",
    lesson: 4,
    pos: "v.",
    lessonLabel: "درس 4 — go و went (رفتن، خرید رفتن)"
  },
  {
    word: "goes",
    meaning: "می‌رود (سوم شخص مفرد)",
    lesson: 4,
    lessonLabel: "درس 4 — go و went (رفتن، خرید رفتن)"
  },
  {
    word: "went",
    meaning: "رفت",
    lesson: 4,
    lessonLabel: "درس 4 — go و went (رفتن، خرید رفتن)"
  },
  {
    word: "walking",
    meaning: "پیاده‌روی کردن",
    lesson: 4,
    lessonLabel: "درس 4 — go و went (رفتن، خرید رفتن)"
  },
  {
    word: "go in(to)",
    meaning: "وارد شدن",
    lesson: 4,
    lessonLabel: "درس 4 — go و went (رفتن، خرید رفتن)"
  },
  {
    word: "go out of",
    meaning: "بیرون رفتن از",
    lesson: 4,
    lessonLabel: "درس 4 — go و went (رفتن، خرید رفتن)"
  },
  {
    word: "go up",
    meaning: "بالا رفتن",
    lesson: 4,
    lessonLabel: "درس 4 — go و went (رفتن، خرید رفتن)"
  },
  {
    word: "go down",
    meaning: "پایین رفتن",
    lesson: 4,
    lessonLabel: "درس 4 — go و went (رفتن، خرید رفتن)"
  },
  {
    word: "go away",
    meaning: "دور شدن، بریدن",
    lesson: 4,
    lessonLabel: "درس 4 — go و went (رفتن، خرید رفتن)"
  },
  {
    word: "go back",
    meaning: "برگشتن",
    lesson: 4,
    lessonLabel: "درس 4 — go و went (رفتن، خرید رفتن)"
  },
  {
    word: "go shopping",
    meaning: "خرید کردن",
    lesson: 4,
    lessonLabel: "درس 4 — go و went (رفتن، خرید رفتن)"
  },
  {
    word: "go swimming",
    meaning: "شنا رفتن",
    lesson: 4,
    lessonLabel: "درس 4 — go و went (رفتن، خرید رفتن)"
  },
  {
    word: "go dancing",
    meaning: "رقص رفتن",
    lesson: 4,
    lessonLabel: "درس 4 — go و went (رفتن، خرید رفتن)"
  },
  {
    word: "go sightseeing",
    meaning: "گردش/بازدید از دیدنی‌ها",
    lesson: 4,
    lessonLabel: "درس 4 — go و went (رفتن، خرید رفتن)"
  },
  {
    word: "go skiing",
    meaning: "اسکی رفتن",
    lesson: 4,
    lessonLabel: "درس 4 — go و went (رفتن، خرید رفتن)"
  },
  {
    word: "go fishing",
    meaning: "ماهیگیری رفتن",
    lesson: 4,
    lessonLabel: "درس 4 — go و went (رفتن، خرید رفتن)"
  },
  {
    word: "be going to",
    meaning: "قصد داشتن (آینده)",
    lesson: 4,
    lessonLabel: "درس 4 — go و went (رفتن، خرید رفتن)"
  },
  {
    word: "do",
    meaning: "انجام دادن",
    lesson: 5,
    pos: "v.",
    lessonLabel: "درس 5 — do و did (تمرین انجام دادن، تلاش کردن)"
  },
  {
    word: "do the housework",
    meaning: "کارهای خانه را انجام دادن",
    lesson: 5,
    pos: "phr.",
    lessonLabel: "درس 5 — do و did (تمرین انجام دادن، تلاش کردن)"
  },
  {
    word: "do the gardening",
    meaning: "کار باغبانی را انجام دادن",
    lesson: 5,
    pos: "phr.",
    lessonLabel: "درس 5 — do و did (تمرین انجام دادن، تلاش کردن)"
  },
  {
    word: "do the washing",
    meaning: "لباس‌شویی کردن",
    lesson: 5,
    pos: "phr.",
    lessonLabel: "درس 5 — do و did (تمرین انجام دادن، تلاش کردن)"
  },
  {
    word: "do the washing-up",
    meaning: "ظرف‌شویی کردن",
    lesson: 5,
    pos: "phr.",
    lessonLabel: "درس 5 — do و did (تمرین انجام دادن، تلاش کردن)"
  },
  {
    word: "do your homework",
    meaning: "تکالیفت را انجام دادن",
    lesson: 5,
    pos: "phr.",
    lessonLabel: "درس 5 — do و did (تمرین انجام دادن، تلاش کردن)"
  },
  {
    word: "do some exercises",
    meaning: "چند تمرین انجام دادن",
    lesson: 5,
    pos: "phr.",
    lessonLabel: "درس 5 — do و did (تمرین انجام دادن، تلاش کردن)"
  },
  {
    word: "do business with",
    meaning: "با ... تجارت کردن",
    lesson: 5,
    pos: "phr.",
    lessonLabel: "درس 5 — do و did (تمرین انجام دادن، تلاش کردن)"
  },
  {
    word: "do your best",
    meaning: "نهایت تلاشت را کردن",
    lesson: 5,
    pos: "phr.",
    lessonLabel: "درس 5 — do و did (تمرین انجام دادن، تلاش کردن)"
  },
  {
    word: "make",
    meaning: "ساختن / درست کردن",
    lesson: 6,
    pos: "v.",
    lessonLabel: "درس 6 — make و made (قهوه درست کردن، اشتباه کردن)"
  },
  {
    word: "make coffee",
    meaning: "قهوه درست کردن",
    lesson: 6,
    pos: "phr.",
    lessonLabel: "درس 6 — make و made (قهوه درست کردن، اشتباه کردن)"
  },
  {
    word: "make dinner",
    meaning: "شام درست کردن",
    lesson: 6,
    pos: "phr.",
    lessonLabel: "درس 6 — make و made (قهوه درست کردن، اشتباه کردن)"
  },
  {
    word: "make tea/hot chocolate",
    meaning: "چای/شکلات داغ درست کردن",
    lesson: 6,
    pos: "phr.",
    lessonLabel: "درس 6 — make و made (قهوه درست کردن، اشتباه کردن)"
  },
  {
    word: "make breakfast/lunch/supper",
    meaning: "صبحانه/ناهار/شام (قبل از خواب) درست کردن",
    lesson: 6,
    pos: "phr.",
    lessonLabel: "درس 6 — make و made (قهوه درست کردن، اشتباه کردن)"
  },
  {
    word: "supper",
    meaning: "شام سبک قبل از خواب",
    lesson: 6,
    pos: "n.",
    lessonLabel: "درس 6 — make و made (قهوه درست کردن، اشتباه کردن)"
  },
  {
    word: "make a photocopy",
    meaning: "فتوکپی گرفتن",
    lesson: 6,
    pos: "phr.",
    lessonLabel: "درس 6 — make و made (قهوه درست کردن، اشتباه کردن)"
  },
  {
    word: "make a film/video",
    meaning: "فیلم/ویدیو ساختن",
    lesson: 6,
    pos: "phr.",
    lessonLabel: "درس 6 — make و made (قهوه درست کردن، اشتباه کردن)"
  },
  {
    word: "make a noise",
    meaning: "سر و صدا کردن",
    lesson: 6,
    pos: "phr.",
    lessonLabel: "درس 6 — make و made (قهوه درست کردن، اشتباه کردن)"
  },
  {
    word: "make a mistake",
    meaning: "اشتباه کردن",
    lesson: 6,
    pos: "phr.",
    lessonLabel: "درس 6 — make و made (قهوه درست کردن، اشتباه کردن)"
  },
  {
    word: "make my bed",
    meaning: "تخت را مرتب کردن",
    lesson: 6,
    pos: "phr.",
    lessonLabel: "درس 6 — make و made (قهوه درست کردن، اشتباه کردن)"
  },
  {
    word: "make an appointment",
    meaning: "وقت گرفتن (ملاقات)",
    lesson: 6,
    pos: "phr.",
    lessonLabel: "درس 6 — make و made (قهوه درست کردن، اشتباه کردن)"
  },
  {
    word: "make a photo",
    meaning: "عکس گرفتن (نادرست؛ درست: take a photo)",
    lesson: 6,
    pos: "phr.",
    lessonLabel: "درس 6 — make و made (قهوه درست کردن، اشتباه کردن)"
  },
  {
    word: "do my homework",
    meaning: "تکالیفم را انجام دادن",
    lesson: 6,
    pos: "phr.",
    lessonLabel: "درس 6 — make و made (قهوه درست کردن، اشتباه کردن)"
  },
  {
    word: "take/do an exam",
    meaning: "امتحان دادن",
    lesson: 6,
    pos: "phr.",
    lessonLabel: "درس 6 — make و made (قهوه درست کردن، اشتباه کردن)"
  },
  {
    word: "take a photo",
    meaning: "عکس گرفتن",
    lesson: 6,
    pos: "phr.",
    lessonLabel: "درس 6 — make و made (قهوه درست کردن، اشتباه کردن)"
  },
  {
    word: "do the dishes",
    meaning: "ظرف‌ها را شستن",
    lesson: 6,
    pos: "phr.",
    lessonLabel: "درس 6 — make و made (قهوه درست کردن، اشتباه کردن)"
  },
  {
    word: "makes me (feel) tired",
    meaning: "مرا خسته می‌کند",
    lesson: 6,
    pos: "phr.",
    lessonLabel: "درس 6 — make و made (قهوه درست کردن، اشتباه کردن)"
  },
  {
    word: "makes me (feel) angry",
    meaning: "مرا عصبانی می‌کند",
    lesson: 6,
    pos: "phr.",
    lessonLabel: "درس 6 — make و made (قهوه درست کردن، اشتباه کردن)"
  },
  {
    word: "makes me (feel) sad",
    meaning: "مرا غمگین می‌کند",
    lesson: 6,
    pos: "phr.",
    lessonLabel: "درس 6 — make و made (قهوه درست کردن، اشتباه کردن)"
  },
  {
    word: "go",
    meaning: "رفتن",
    lesson: 7,
    pos: "v.",
    lessonLabel: "درس 7 — come و came (آمدن، اهل جایی بودن)"
  },
  {
    word: "come",
    meaning: "آمدن",
    lesson: 7,
    pos: "v.",
    lessonLabel: "درس 7 — come و came (آمدن، اهل جایی بودن)"
  },
  {
    word: "come in",
    meaning: "وارد شدن (داخل)",
    lesson: 7,
    pos: "phr.",
    lessonLabel: "درس 7 — come و came (آمدن، اهل جایی بودن)"
  },
  {
    word: "come out",
    meaning: "بیرون آمدن",
    lesson: 7,
    pos: "phr.",
    lessonLabel: "درس 7 — come و came (آمدن، اهل جایی بودن)"
  },
  {
    word: "come back",
    meaning: "برگشتن (به اینجا)",
    lesson: 7,
    pos: "phr.",
    lessonLabel: "درس 7 — come و came (آمدن، اهل جایی بودن)"
  },
  {
    word: "come home",
    meaning: "به خانه آمدن",
    lesson: 7,
    pos: "phr.",
    lessonLabel: "درس 7 — come و came (آمدن، اهل جایی بودن)"
  },
  {
    word: "come from",
    meaning: "اهل ... بودن؛ از ... آمدن",
    lesson: 7,
    pos: "phr.",
    lessonLabel: "درس 7 — come و came (آمدن، اهل جایی بودن)"
  },
  {
    word: "come along",
    meaning: "همراه آمدن",
    lesson: 7,
    pos: "phr.",
    lessonLabel: "درس 7 — come و came (آمدن، اهل جایی بودن)"
  },
  {
    word: "take",
    meaning: "بردن، گرفتن",
    lesson: 8,
    pos: "v.",
    lessonLabel: "درس 8 — take و took (سوار شدن، عکس گرفتن)"
  },
  {
    word: "take the bus",
    meaning: "اتوبوس سوار شدن",
    lesson: 8,
    pos: "phr.",
    lessonLabel: "درس 8 — take و took (سوار شدن، عکس گرفتن)"
  },
  {
    word: "take the metro",
    meaning: "مترو سوار شدن",
    lesson: 8,
    pos: "phr.",
    lessonLabel: "درس 8 — take و took (سوار شدن، عکس گرفتن)"
  },
  {
    word: "take the train",
    meaning: "قطار سوار شدن",
    lesson: 8,
    pos: "phr.",
    lessonLabel: "درس 8 — take و took (سوار شدن، عکس گرفتن)"
  },
  {
    word: "take an exam",
    meaning: "در امتحان شرکت کردن",
    lesson: 8,
    pos: "phr.",
    lessonLabel: "درس 8 — take و took (سوار شدن، عکس گرفتن)"
  },
  {
    word: "take a course",
    meaning: "در یک دوره شرکت کردن",
    lesson: 8,
    pos: "phr.",
    lessonLabel: "درس 8 — take و took (سوار شدن، عکس گرفتن)"
  },
  {
    word: "take lessons",
    meaning: "درس گرفتن",
    lesson: 8,
    pos: "phr.",
    lessonLabel: "درس 8 — take و took (سوار شدن، عکس گرفتن)"
  },
  {
    word: "take an umbrella",
    meaning: "چتر بردن",
    lesson: 8,
    pos: "phr.",
    lessonLabel: "درس 8 — take و took (سوار شدن، عکس گرفتن)"
  },
  {
    word: "take some water with you",
    meaning: "کمی آب با خود بردن",
    lesson: 8,
    pos: "phr.",
    lessonLabel: "درس 8 — take و took (سوار شدن، عکس گرفتن)"
  },
  {
    word: "take a photograph",
    meaning: "عکس گرفتن",
    lesson: 8,
    pos: "phr.",
    lessonLabel: "درس 8 — take و took (سوار شدن، عکس گرفتن)"
  },
  {
    word: "get to work",
    meaning: "به سر کار رسیدن",
    lesson: 8,
    pos: "phr.",
    lessonLabel: "درس 8 — take و took (سوار شدن، عکس گرفتن)"
  },
  {
    word: "take",
    meaning: "بردن",
    lesson: 9,
    pos: "v.",
    lessonLabel: "درس 9 — bring و brought (آوردن، برگرداندن)"
  },
  {
    word: "bring",
    meaning: "آوردن",
    lesson: 9,
    pos: "v.",
    lessonLabel: "درس 9 — bring و brought (آوردن، برگرداندن)"
  },
  {
    word: "bring somebody something",
    meaning: "برای کسی چیزی آوردن",
    lesson: 9,
    pos: "phr.",
    lessonLabel: "درس 9 — bring و brought (آوردن، برگرداندن)"
  },
  {
    word: "bring something back",
    meaning: "چیزی را برگرداندن / پس آوردن",
    lesson: 9,
    pos: "phr.",
    lessonLabel: "درس 9 — bring و brought (آوردن، برگرداندن)"
  },
  {
    word: "get",
    meaning: "",
    lesson: 10,
    pos: "v.",
    lessonLabel: "درس 10 — get و got (کار گرفتن، خسته شدن)"
  },
  {
    word: "get dark",
    meaning: "",
    lesson: 10,
    pos: "phr.",
    lessonLabel: "درس 10 — get و got (کار گرفتن، خسته شدن)"
  },
  {
    word: "get better",
    meaning: "",
    lesson: 10,
    pos: "phr.",
    lessonLabel: "درس 10 — get و got (کار گرفتن، خسته شدن)"
  },
  {
    word: "get well",
    meaning: "",
    lesson: 10,
    pos: "phr.",
    lessonLabel: "درس 10 — get و got (کار گرفتن، خسته شدن)"
  },
  {
    word: "get tired",
    meaning: "",
    lesson: 10,
    pos: "phr.",
    lessonLabel: "درس 10 — get و got (کار گرفتن، خسته شدن)"
  },
  {
    word: "get wet",
    meaning: "",
    lesson: 10,
    pos: "phr.",
    lessonLabel: "درس 10 — get و got (کار گرفتن، خسته شدن)"
  },
  {
    word: "get a stamp",
    meaning: "",
    lesson: 10,
    pos: "phr.",
    lessonLabel: "درس 10 — get و got (کار گرفتن، خسته شدن)"
  },
  {
    word: "get a job",
    meaning: "",
    lesson: 10,
    pos: "phr.",
    lessonLabel: "درس 10 — get و got (کار گرفتن، خسته شدن)"
  },
  {
    word: "get a doctor",
    meaning: "",
    lesson: 10,
    pos: "phr.",
    lessonLabel: "درس 10 — get و got (کار گرفتن، خسته شدن)"
  },
  {
    word: "get some coffee",
    meaning: "",
    lesson: 10,
    pos: "phr.",
    lessonLabel: "درس 10 — get و got (کار گرفتن، خسته شدن)"
  },
  {
    word: "get a newspaper",
    meaning: "",
    lesson: 10,
    pos: "phr.",
    lessonLabel: "درس 10 — get و got (کار گرفتن، خسته شدن)"
  },
  {
    word: "get a taxi",
    meaning: "",
    lesson: 10,
    pos: "phr.",
    lessonLabel: "درس 10 — get و got (کار گرفتن، خسته شدن)"
  },
  {
    word: "get to",
    meaning: "",
    lesson: 10,
    pos: "phr.",
    lessonLabel: "درس 10 — get و got (کار گرفتن، خسته شدن)"
  },
  {
    word: "get married",
    meaning: "",
    lesson: 10,
    pos: "phr.",
    lessonLabel: "درس 10 — get و got (کار گرفتن، خسته شدن)"
  },
  {
    word: "get back",
    meaning: "",
    lesson: 10,
    pos: "phr.",
    lessonLabel: "درس 10 — get و got (کار گرفتن، خسته شدن)"
  },
  {
    word: "get up",
    meaning: "",
    lesson: 10,
    pos: "phr.",
    lessonLabel: "درس 10 — get و got (کار گرفتن، خسته شدن)"
  },
  {
    word: "get home",
    meaning: "",
    lesson: 10,
    pos: "phr.",
    lessonLabel: "درس 10 — get و got (کار گرفتن، خسته شدن)"
  },
  {
    word: "get there",
    meaning: "",
    lesson: 10,
    pos: "phr.",
    lessonLabel: "درس 10 — get و got (کار گرفتن، خسته شدن)"
  },
  {
    word: "get up",
    meaning: "بیدار شدن",
    lesson: 11,
    pos: "v.",
    lessonLabel: "درس 11 — فعل‌های عبارتی (put on، turn down)"
  },
  {
    word: "get on",
    meaning: "با کسی کنار آمدن/رابطه خوب داشتن",
    lesson: 11,
    pos: "v.",
    lessonLabel: "درس 11 — فعل‌های عبارتی (put on، turn down)"
  },
  {
    word: "get over",
    meaning: "بهبود یافتن؛ عبور کردن از (بیماری/مشکل)",
    lesson: 11,
    pos: "v.",
    lessonLabel: "درس 11 — فعل‌های عبارتی (put on، turn down)"
  },
  {
    word: "turn on",
    meaning: "روشن کردن",
    lesson: 11,
    pos: "v.",
    lessonLabel: "درس 11 — فعل‌های عبارتی (put on، turn down)"
  },
  {
    word: "turn off",
    meaning: "خاموش کردن",
    lesson: 11,
    pos: "v.",
    lessonLabel: "درس 11 — فعل‌های عبارتی (put on، turn down)"
  },
  {
    word: "turn up",
    meaning: "بالا بردن (صدا)",
    lesson: 11,
    pos: "v.",
    lessonLabel: "درس 11 — فعل‌های عبارتی (put on، turn down)"
  },
  {
    word: "turn down",
    meaning: "پایین آوردن (صدا)؛ رد کردن (دعوت)",
    lesson: 11,
    pos: "v.",
    lessonLabel: "درس 11 — فعل‌های عبارتی (put on، turn down)"
  },
  {
    word: "go on",
    meaning: "ادامه دادن",
    lesson: 11,
    pos: "v.",
    lessonLabel: "درس 11 — فعل‌های عبارتی (put on، turn down)"
  },
  {
    word: "go off",
    meaning: "منفجر شدن",
    lesson: 11,
    pos: "v.",
    lessonLabel: "درس 11 — فعل‌های عبارتی (put on، turn down)"
  },
  {
    word: "put something on",
    meaning: "پوشیدن (لباس)",
    lesson: 11,
    pos: "v.",
    lessonLabel: "درس 11 — فعل‌های عبارتی (put on، turn down)"
  },
  {
    word: "come on",
    meaning: "اجازه! زود باش!",
    lesson: 11,
    pos: "phr.",
    lessonLabel: "درس 11 — فعل‌های عبارتی (put on، turn down)"
  },
  {
    word: "do up",
    meaning: "بستن (کاپشن)؛ بازسازی/تعمیر کردن (آپارتمان)",
    lesson: 11,
    pos: "v.",
    lessonLabel: "درس 11 — فعل‌های عبارتی (put on، turn down)"
  },
  {
    word: "take off",
    meaning: "برخاستن (هواپیما)؛ درآوردن (کفش)",
    lesson: 11,
    pos: "v.",
    lessonLabel: "درس 11 — فعل‌های عبارتی (put on، turn down)"
  },
  {
    word: "wake up",
    meaning: "بیدار شدن",
    lesson: 12,
    pos: "v.",
    lessonLabel: "درس 12 — کارهای روزمره (تلویزیون تماشا کردن، لباس شستن)"
  },
  {
    word: "get up",
    meaning: "از خواب برخاستن",
    lesson: 12,
    pos: "v.",
    lessonLabel: "درس 12 — کارهای روزمره (تلویزیون تماشا کردن، لباس شستن)"
  },
  {
    word: "go to the bathroom",
    meaning: "به دستشویی/حمام رفتن",
    lesson: 12,
    pos: "phr.",
    lessonLabel: "درس 12 — کارهای روزمره (تلویزیون تماشا کردن، لباس شستن)"
  },
  {
    word: "have a shower",
    meaning: "دوش گرفتن",
    lesson: 12,
    pos: "phr.",
    lessonLabel: "درس 12 — کارهای روزمره (تلویزیون تماشا کردن، لباس شستن)"
  },
  {
    word: "have breakfast",
    meaning: "صبحانه خوردن",
    lesson: 12,
    pos: "phr.",
    lessonLabel: "درس 12 — کارهای روزمره (تلویزیون تماشا کردن، لباس شستن)"
  },
  {
    word: "listen to the radio",
    meaning: "به رادیو گوش دادن",
    lesson: 12,
    pos: "phr.",
    lessonLabel: "درس 12 — کارهای روزمره (تلویزیون تماشا کردن، لباس شستن)"
  },
  {
    word: "go to work",
    meaning: "به سر کار رفتن",
    lesson: 12,
    pos: "phr.",
    lessonLabel: "درس 12 — کارهای روزمره (تلویزیون تماشا کردن، لباس شستن)"
  },
  {
    word: "come home",
    meaning: "به خانه آمدن",
    lesson: 12,
    pos: "phr.",
    lessonLabel: "درس 12 — کارهای روزمره (تلویزیون تماشا کردن، لباس شستن)"
  },
  {
    word: "make dinner",
    meaning: "شام درست کردن",
    lesson: 12,
    pos: "phr.",
    lessonLabel: "درس 12 — کارهای روزمره (تلویزیون تماشا کردن، لباس شستن)"
  },
  {
    word: "phone (or call) a friend",
    meaning: "به یک دوست تلفن زدن",
    lesson: 12,
    pos: "phr.",
    lessonLabel: "درس 12 — کارهای روزمره (تلویزیون تماشا کردن، لباس شستن)"
  },
  {
    word: "watch TV",
    meaning: "تلویزیون تماشا کردن",
    lesson: 12,
    pos: "phr.",
    lessonLabel: "درس 12 — کارهای روزمره (تلویزیون تماشا کردن، لباس شستن)"
  },
  {
    word: "go to bed",
    meaning: "به رختخواب رفتن",
    lesson: 12,
    pos: "phr.",
    lessonLabel: "درس 12 — کارهای روزمره (تلویزیون تماشا کردن، لباس شستن)"
  },
  {
    word: "wash clothes",
    meaning: "لباس شستن",
    lesson: 12,
    pos: "phr.",
    lessonLabel: "درس 12 — کارهای روزمره (تلویزیون تماشا کردن، لباس شستن)"
  },
  {
    word: "clean the house",
    meaning: "خانه را تمیز کردن",
    lesson: 12,
    pos: "phr.",
    lessonLabel: "درس 12 — کارهای روزمره (تلویزیون تماشا کردن، لباس شستن)"
  },
  {
    word: "go for a walk",
    meaning: "پیاده‌روی رفتن",
    lesson: 12,
    pos: "phr.",
    lessonLabel: "درس 12 — کارهای روزمره (تلویزیون تماشا کردن، لباس شستن)"
  },
  {
    word: "write letters",
    meaning: "نامه نوشتن",
    lesson: 12,
    pos: "phr.",
    lessonLabel: "درس 12 — کارهای روزمره (تلویزیون تماشا کردن، لباس شستن)"
  },
  {
    word: "usually/normally",
    meaning: "معمولاً/به‌طور عادی",
    lesson: 12,
    pos: "adv.",
    lessonLabel: "درس 12 — کارهای روزمره (تلویزیون تماشا کردن، لباس شستن)"
  },
  {
    word: "say",
    meaning: "گفتن",
    lesson: 13,
    pos: "v.",
    lessonLabel: "درس 13 — گفت‌وگو کردن (say، tell)"
  },
  {
    word: "tell",
    meaning: "گفتن (به کسی)",
    lesson: 13,
    pos: "v.",
    lessonLabel: "درس 13 — گفت‌وگو کردن (say، tell)"
  },
  {
    word: "ask",
    meaning: "پرسیدن؛ درخواست کردن",
    lesson: 13,
    pos: "v.",
    lessonLabel: "درس 13 — گفت‌وگو کردن (say، tell)"
  },
  {
    word: "speak",
    meaning: "صحبت کردن (به یک زبان)",
    lesson: 13,
    pos: "v.",
    lessonLabel: "درس 13 — گفت‌وگو کردن (say، tell)"
  },
  {
    word: "talk",
    meaning: "گپ زدن، صحبت کردن",
    lesson: 13,
    pos: "v.",
    lessonLabel: "درس 13 — گفت‌وگو کردن (say، tell)"
  },
  {
    word: "answer",
    meaning: "جواب دادن",
    lesson: 13,
    pos: "v.",
    lessonLabel: "درس 13 — گفت‌وگو کردن (say، tell)"
  },
  {
    word: "reply",
    meaning: "پاسخ دادن (به نامه/ایمیل)",
    lesson: 13,
    pos: "v.",
    lessonLabel: "درس 13 — گفت‌وگو کردن (say، tell)"
  },
  {
    word: "say hello / goodbye",
    meaning: "سلام کردن / خداحافظی کردن",
    lesson: 13,
    pos: "phr.",
    lessonLabel: "درس 13 — گفت‌وگو کردن (say، tell)"
  },
  {
    word: "please / thank you",
    meaning: "لطفاً / متشکرم",
    lesson: 13,
    pos: "phr.",
    lessonLabel: "درس 13 — گفت‌وگو کردن (say، tell)"
  },
  {
    word: "Happy Birthday",
    meaning: "تولدت مبارک",
    lesson: 13,
    pos: "phr.",
    lessonLabel: "درس 13 — گفت‌وگو کردن (say، tell)"
  },
  {
    word: "Merry Christmas",
    meaning: "کریسمس مبارک",
    lesson: 13,
    pos: "phr.",
    lessonLabel: "درس 13 — گفت‌وگو کردن (say، tell)"
  },
  {
    word: "Happy New Year",
    meaning: "سال نو مبارک",
    lesson: 13,
    pos: "phr.",
    lessonLabel: "درس 13 — گفت‌وگو کردن (say، tell)"
  },
  {
    word: "Congratulations",
    meaning: "تبریک می‌گویم",
    lesson: 13,
    pos: "phr.",
    lessonLabel: "درس 13 — گفت‌وگو کردن (say، tell)"
  },
  {
    word: "tell someone the time / a story / a joke / your name / address / telephone number",
    meaning: "به کسی ساعت / قصه / جوک / اسم / آدرس / شماره تلفن گفتن",
    lesson: 13,
    pos: "phr.",
    lessonLabel: "درس 13 — گفت‌وگو کردن (say، tell)"
  },
  {
    word: "ask someone the way / the time / a question",
    meaning: "از کسی راه / ساعت / سؤال پرسیدن",
    lesson: 13,
    pos: "phr.",
    lessonLabel: "درس 13 — گفت‌وگو کردن (say، tell)"
  },
  {
    word: "ask somebody to do something",
    meaning: "از کسی بخواهید کاری انجام دهد",
    lesson: 13,
    pos: "phr.",
    lessonLabel: "درس 13 — گفت‌وگو کردن (say، tell)"
  },
  {
    word: "ask someone for something",
    meaning: "از کسی چیزی را خواستن",
    lesson: 13,
    pos: "phr.",
    lessonLabel: "درس 13 — گفت‌وگو کردن (say، tell)"
  },
  {
    word: "answer the telephone / the door",
    meaning: "تلفن / در را جواب دادن",
    lesson: 13,
    pos: "phr.",
    lessonLabel: "درس 13 — گفت‌وگو کردن (say، tell)"
  },
  {
    word: "walk",
    meaning: "راه رفتن",
    lesson: 14,
    pos: "v.",
    lessonLabel: "درس 14 — جابه‌جایی (قدم زدن، حمل کردن)"
  },
  {
    word: "run",
    meaning: "دویدن",
    lesson: 14,
    pos: "v.",
    lessonLabel: "درس 14 — جابه‌جایی (قدم زدن، حمل کردن)"
  },
  {
    word: "jump",
    meaning: "پریدن",
    lesson: 14,
    pos: "v.",
    lessonLabel: "درس 14 — جابه‌جایی (قدم زدن، حمل کردن)"
  },
  {
    word: "dance",
    meaning: "رقصیدن",
    lesson: 14,
    pos: "v.",
    lessonLabel: "درس 14 — جابه‌جایی (قدم زدن، حمل کردن)"
  },
  {
    word: "swim",
    meaning: "شنا کردن",
    lesson: 14,
    pos: "v.",
    lessonLabel: "درس 14 — جابه‌جایی (قدم زدن، حمل کردن)"
  },
  {
    word: "jog",
    meaning: "آهسته دویدن (جاگینگ)",
    lesson: 14,
    pos: "v.",
    lessonLabel: "درس 14 — جابه‌جایی (قدم زدن، حمل کردن)"
  },
  {
    word: "climb",
    meaning: "بالارفتن، صخره‌نوردی کردن",
    lesson: 14,
    pos: "v.",
    lessonLabel: "درس 14 — جابه‌جایی (قدم زدن، حمل کردن)"
  },
  {
    word: "fall",
    meaning: "افتادن",
    lesson: 14,
    pos: "v.",
    lessonLabel: "درس 14 — جابه‌جایی (قدم زدن، حمل کردن)"
  },
  {
    word: "car",
    meaning: "ماشین",
    lesson: 14,
    pos: "n.",
    lessonLabel: "درس 14 — جابه‌جایی (قدم زدن، حمل کردن)"
  },
  {
    word: "plane",
    meaning: "هواپیما",
    lesson: 14,
    pos: "n.",
    lessonLabel: "درس 14 — جابه‌جایی (قدم زدن، حمل کردن)"
  },
  {
    word: "bus",
    meaning: "اتوبوس",
    lesson: 14,
    pos: "n.",
    lessonLabel: "درس 14 — جابه‌جایی (قدم زدن، حمل کردن)"
  },
  {
    word: "train",
    meaning: "قطار",
    lesson: 14,
    pos: "n.",
    lessonLabel: "درس 14 — جابه‌جایی (قدم زدن، حمل کردن)"
  },
  {
    word: "bike",
    meaning: "دوچرخه",
    lesson: 14,
    pos: "n.",
    lessonLabel: "درس 14 — جابه‌جایی (قدم زدن، حمل کردن)"
  },
  {
    word: "motorbike",
    meaning: "موتورسیکلت",
    lesson: 14,
    pos: "n.",
    lessonLabel: "درس 14 — جابه‌جایی (قدم زدن، حمل کردن)"
  },
  {
    word: "ship",
    meaning: "کشتی",
    lesson: 14,
    pos: "n.",
    lessonLabel: "درس 14 — جابه‌جایی (قدم زدن، حمل کردن)"
  },
  {
    word: "taxi",
    meaning: "تاکسی",
    lesson: 14,
    pos: "n.",
    lessonLabel: "درس 14 — جابه‌جایی (قدم زدن، حمل کردن)"
  },
  {
    word: "underground",
    meaning: "مترو",
    lesson: 14,
    pos: "n.",
    lessonLabel: "درس 14 — جابه‌جایی (قدم زدن، حمل کردن)"
  },
  {
    word: "take",
    meaning: "سوار شدن (وسیله نقلیه)",
    lesson: 14,
    pos: "v.",
    lessonLabel: "درس 14 — جابه‌جایی (قدم زدن، حمل کردن)"
  },
  {
    word: "ride",
    meaning: "راندن، سوار شدن (دوچرخه/اسب)",
    lesson: 14,
    pos: "v.",
    lessonLabel: "درس 14 — جابه‌جایی (قدم زدن، حمل کردن)"
  },
  {
    word: "bicycle",
    meaning: "دوچرخه",
    lesson: 14,
    pos: "n.",
    lessonLabel: "درس 14 — جابه‌جایی (قدم زدن، حمل کردن)"
  },
  {
    word: "horse",
    meaning: "اسب",
    lesson: 14,
    pos: "n.",
    lessonLabel: "درس 14 — جابه‌جایی (قدم زدن، حمل کردن)"
  },
  {
    word: "drive",
    meaning: "رانندگی کردن",
    lesson: 14,
    pos: "v.",
    lessonLabel: "درس 14 — جابه‌جایی (قدم زدن، حمل کردن)"
  },
  {
    word: "pilot",
    meaning: "خلبان",
    lesson: 14,
    pos: "n.",
    lessonLabel: "درس 14 — جابه‌جایی (قدم زدن، حمل کردن)"
  },
  {
    word: "fly",
    meaning: "پرواز کردن",
    lesson: 14,
    pos: "v.",
    lessonLabel: "درس 14 — جابه‌جایی (قدم زدن، حمل کردن)"
  },
  {
    word: "get to",
    meaning: "رسیدن به (جایی)",
    lesson: 14,
    pos: "phr.",
    lessonLabel: "درس 14 — جابه‌جایی (قدم زدن، حمل کردن)"
  },
  {
    word: "catch",
    meaning: "به‌موقع رسیدن (به اتوبوس/قطار)",
    lesson: 14,
    pos: "v.",
    lessonLabel: "درس 14 — جابه‌جایی (قدم زدن، حمل کردن)"
  },
  {
    word: "miss",
    meaning: "جا ماندن (از اتوبوس/قطار)",
    lesson: 14,
    pos: "v.",
    lessonLabel: "درس 14 — جابه‌جایی (قدم زدن، حمل کردن)"
  },
  {
    word: "arrive",
    meaning: "رسیدن",
    lesson: 14,
    pos: "v.",
    lessonLabel: "درس 14 — جابه‌جایی (قدم زدن، حمل کردن)"
  },
  {
    word: "pull",
    meaning: "کشیدن",
    lesson: 14,
    pos: "v.",
    lessonLabel: "درس 14 — جابه‌جایی (قدم زدن، حمل کردن)"
  },
  {
    word: "push",
    meaning: "هل دادن",
    lesson: 14,
    pos: "v.",
    lessonLabel: "درس 14 — جابه‌جایی (قدم زدن، حمل کردن)"
  },
  {
    word: "carry",
    meaning: "حمل کردن، بردن",
    lesson: 14,
    pos: "v.",
    lessonLabel: "درس 14 — جابه‌جایی (قدم زدن، حمل کردن)"
  },
  {
    word: "luggage",
    meaning: "چمدان و بار",
    lesson: 14,
    pos: "n.",
    lessonLabel: "درس 14 — جابه‌جایی (قدم زدن، حمل کردن)"
  },
  {
    word: "pass",
    meaning: "رد دادن، پاس دادن",
    lesson: 14,
    pos: "v.",
    lessonLabel: "درس 14 — جابه‌جایی (قدم زدن، حمل کردن)"
  },
  {
    word: "and",
    meaning: "و",
    lesson: 15,
    pos: "conj.",
    lessonLabel: "درس 15 — حروف ربط و واژه‌های پیوند (because، only)"
  },
  {
    word: "but",
    meaning: "اما",
    lesson: 15,
    pos: "conj.",
    lessonLabel: "درس 15 — حروف ربط و واژه‌های پیوند (because، only)"
  },
  {
    word: "because",
    meaning: "زیرا / چون",
    lesson: 15,
    pos: "conj.",
    lessonLabel: "درس 15 — حروف ربط و واژه‌های پیوند (because، only)"
  },
  {
    word: "so",
    meaning: "بنابراین",
    lesson: 15,
    pos: "conj.",
    lessonLabel: "درس 15 — حروف ربط و واژه‌های پیوند (because، only)"
  },
  {
    word: "when",
    meaning: "وقتی که",
    lesson: 15,
    pos: "conj.",
    lessonLabel: "درس 15 — حروف ربط و واژه‌های پیوند (because، only)"
  },
  {
    word: "before",
    meaning: "قبل از اینکه",
    lesson: 15,
    pos: "conj.",
    lessonLabel: "درس 15 — حروف ربط و واژه‌های پیوند (because، only)"
  },
  {
    word: "after",
    meaning: "بعد از اینکه",
    lesson: 15,
    pos: "conj.",
    lessonLabel: "درس 15 — حروف ربط و واژه‌های پیوند (because، only)"
  },
  {
    word: "although",
    meaning: "اگرچه",
    lesson: 15,
    pos: "conj.",
    lessonLabel: "درس 15 — حروف ربط و واژه‌های پیوند (because، only)"
  },
  {
    word: "though",
    meaning: "اگرچه",
    lesson: 15,
    pos: "conj.",
    lessonLabel: "درس 15 — حروف ربط و واژه‌های پیوند (because، only)"
  },
  {
    word: "if",
    meaning: "اگر",
    lesson: 15,
    pos: "conj.",
    lessonLabel: "درس 15 — حروف ربط و واژه‌های پیوند (because، only)"
  },
  {
    word: "only",
    meaning: "فقط",
    lesson: 15,
    pos: "adv.",
    lessonLabel: "درس 15 — حروف ربط و واژه‌های پیوند (because، only)"
  },
  {
    word: "even",
    meaning: "حتی",
    lesson: 15,
    pos: "adv.",
    lessonLabel: "درس 15 — حروف ربط و واژه‌های پیوند (because، only)"
  },
  {
    word: "like",
    meaning: "مثل",
    lesson: 15,
    pos: "prep.",
    lessonLabel: "درس 15 — حروف ربط و واژه‌های پیوند (because، only)"
  },
  {
    word: "than",
    meaning: "از (برای مقایسه)",
    lesson: 15,
    pos: "conj.",
    lessonLabel: "درس 15 — حروف ربط و واژه‌های پیوند (because، only)"
  },
  {
    word: "also",
    meaning: "همچنین",
    lesson: 15,
    pos: "adv.",
    lessonLabel: "درس 15 — حروف ربط و واژه‌های پیوند (because، only)"
  },
  {
    word: "too",
    meaning: "هم",
    lesson: 15,
    pos: "adv.",
    lessonLabel: "درس 15 — حروف ربط و واژه‌های پیوند (because، only)"
  },
  {
    word: "as well",
    meaning: "همچنین",
    lesson: 15,
    pos: "phr.",
    lessonLabel: "درس 15 — حروف ربط و واژه‌های پیوند (because، only)"
  }
];

export const VOCAB_PART_1: Row[] = ROWS;
