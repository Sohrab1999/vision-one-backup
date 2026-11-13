// واژگان درس‌های English Vocabulary in Use — Upper-intermediate (پارتیت 1) — استخراج VLM از اسکن PDF
// word = عین چاپ کتاب · meaning = ترجمهٔ ماشینی GLM (کلاس FA-NEW — اثبات صحت ترجمه نیست)
import type { VocabWord } from "../types";

type Row = Omit<VocabWord, "lesson"> & { lesson: number; lessonLabel: string };

const ROWS: Row[] = [
  {
    word: "coin",
    meaning: "ضرب کردن (واژهٔ جدید)، ساختن واژهٔ نو",
    lesson: 1,
    pos: "v.",
    lessonLabel: "درس 1 — یادگیری واژگان — توصیه‌های کلی"
  },
  {
    word: "range",
    meaning: "دامنه، گستره",
    lesson: 1,
    pos: "n.",
    lessonLabel: "درس 1 — یادگیری واژگان — توصیه‌های کلی"
  },
  {
    word: "flexibility",
    meaning: "انعطاف‌پذیری",
    lesson: 1,
    pos: "n.",
    lessonLabel: "درس 1 — یادگیری واژگان — توصیه‌های کلی"
  },
  {
    word: "adaptability",
    meaning: "قابلیت سازگاری",
    lesson: 1,
    pos: "n.",
    lessonLabel: "درس 1 — یادگیری واژگان — توصیه‌های کلی"
  },
  {
    word: "readiness",
    meaning: "آمادگی",
    lesson: 1,
    pos: "n.",
    lessonLabel: "درس 1 — یادگیری واژگان — توصیه‌های کلی"
  },
  {
    word: "core vocabulary",
    meaning: "واژگان اصلی/هسته‌ای",
    lesson: 1,
    pos: "phr.",
    lessonLabel: "درس 1 — یادگیری واژگان — توصیه‌های کلی"
  },
  {
    word: "kingly",
    meaning: "شاهانه، پادشاهی",
    lesson: 1,
    pos: "adj.",
    lessonLabel: "درس 1 — یادگیری واژگان — توصیه‌های کلی"
  },
  {
    word: "royal",
    meaning: "سلطنتی، سلطنتی‌مانند (از فرانسوی)",
    lesson: 1,
    pos: "adj.",
    lessonLabel: "درس 1 — یادگیری واژگان — توصیه‌های کلی"
  },
  {
    word: "regal",
    meaning: "باجلال، شاهانه (از لاتین)",
    lesson: 1,
    pos: "adj.",
    lessonLabel: "درس 1 — یادگیری واژگان — توصیه‌های کلی"
  },
  {
    word: "subtle",
    meaning: "ظریف",
    lesson: 1,
    pos: "adj.",
    lessonLabel: "درس 1 — یادگیری واژگان — توصیه‌های کلی"
  },
  {
    word: "shades of meaning",
    meaning: "سایه‌معنایی‌ها، تفاوت‌های ظریف معنایی",
    lesson: 1,
    pos: "phr.",
    lessonLabel: "درس 1 — یادگیری واژگان — توصیه‌های کلی"
  },
  {
    word: "at various levels of style",
    meaning: "در سطوح گوناگون سبک",
    lesson: 1,
    pos: "phr.",
    lessonLabel: "درس 1 — یادگیری واژگان — توصیه‌های کلی"
  },
  {
    word: "contact",
    meaning: "تماس، ارتباط",
    lesson: 1,
    pos: "n.",
    lessonLabel: "درس 1 — یادگیری واژگان — توصیه‌های کلی"
  },
  {
    word: "add",
    meaning: "افزودن",
    lesson: 1,
    pos: "v.",
    lessonLabel: "درس 1 — یادگیری واژگان — توصیه‌های کلی"
  },
  {
    word: "opportunities",
    meaning: "فرصت‌ها",
    lesson: 1,
    pos: "n.",
    lessonLabel: "درس 1 — یادگیری واژگان — توصیه‌های کلی"
  },
  {
    word: "collocations",
    meaning: "هم‌آیندها (واژه‌هایی که معمولاً با هم می‌آیند)",
    lesson: 1,
    pos: "n.",
    lessonLabel: "درس 1 — یادگیری واژگان — توصیه‌های کلی"
  },
  {
    word: "register",
    meaning: "سطح زبانی (رسمی/غیررسمی بودن واژه)",
    lesson: 1,
    pos: "n.",
    lessonLabel: "درس 1 — یادگیری واژگان — توصیه‌های کلی"
  },
  {
    word: "in isolation",
    meaning: "به‌تنهایی، منفرد",
    lesson: 1,
    pos: "phr.",
    lessonLabel: "درس 1 — یادگیری واژگان — توصیه‌های کلی"
  },
  {
    word: "whiskers",
    meaning: "سبیل (حیوان)",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "mew",
    meaning: "میومیو کردن",
    lesson: 2,
    pos: "v.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "paw",
    meaning: "پنجه",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "tomcat",
    meaning: "گربهٔ نر",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "kitten",
    meaning: "بچه‌گربه",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "scratch",
    meaning: "چنگ زدن",
    lesson: 2,
    pos: "v.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "purr",
    meaning: "خرخر کردن (گربه)",
    lesson: 2,
    pos: "v.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "lick",
    meaning: "لیسیدن",
    lesson: 2,
    pos: "v.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "child",
    meaning: "کودک",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "tooth",
    meaning: "دندان",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "mouse",
    meaning: "موش",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "information",
    meaning: "اطلاعات",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "furniture",
    meaning: "مبلمان",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "luggage",
    meaning: "چمدان و اسباب‌سفر",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "price",
    meaning: "قیمت",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "priceless",
    meaning: "بی‌قیمت، بسیار ارزشمند",
    lesson: 2,
    pos: "adj.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "overpriced",
    meaning: "گران‌قیمت (بیش از حد گران)",
    lesson: 2,
    pos: "adj.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "handy",
    meaning: "مفید، در دسترس",
    lesson: 2,
    pos: "adj.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "single-handed",
    meaning: "تنها، بدون کمک دیگران",
    lesson: 2,
    pos: "adj.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "give me a hand",
    meaning: "به من کمک کن",
    lesson: 2,
    pos: "phr.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "lungs",
    meaning: "ریه‌ها",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "liver",
    meaning: "کبد",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "heart",
    meaning: "قلب",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "stomach",
    meaning: "معده",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "kidneys",
    meaning: "کلیه‌ها",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "intestines",
    meaning: "روده‌ها",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "triangle",
    meaning: "مثلث",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "much-needed",
    meaning: "بسیار مورد نیاز",
    lesson: 2,
    pos: "adj.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "relaxing",
    meaning: "آرام‌بخش",
    lesson: 2,
    pos: "adj.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "enjoyable",
    meaning: "لذت‌بخش",
    lesson: 2,
    pos: "adj.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "spend",
    meaning: "گذراندن (وقت)",
    lesson: 2,
    pos: "v.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "book",
    meaning: "رزرو کردن",
    lesson: 2,
    pos: "v.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "plan",
    meaning: "برنامه‌ریزی کردن",
    lesson: 2,
    pos: "v.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "look forward to",
    meaning: "مشتاقانه منتظر بودن",
    lesson: 2,
    pos: "phr.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "perfect",
    meaning: "کامل",
    lesson: 2,
    pos: "adj.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "sailing",
    meaning: "قایقرانی بادبانی",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "walking",
    meaning: "پیاده‌روی",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "skiing",
    meaning: "اسکی",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "sight-seeing",
    meaning: "بازدید از دیدنی‌ها",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "package",
    meaning: "تور کامل (تعطیلات)",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "beach",
    meaning: "ساحل",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "summer",
    meaning: "تابستان",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "family",
    meaning: "خانواده",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "school",
    meaning: "مدرسه",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "original",
    meaning: "اصیل، بدیع",
    lesson: 2,
    pos: "adj.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "brilliant",
    meaning: "درخشان، عالی",
    lesson: 2,
    pos: "adj.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "unusual",
    meaning: "غیرعادی",
    lesson: 2,
    pos: "adj.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "great",
    meaning: "عالی",
    lesson: 2,
    pos: "adj.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "excellent",
    meaning: "فوق‌العاده",
    lesson: 2,
    pos: "adj.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "idea",
    meaning: "ایده",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "shoot",
    meaning: "فیلم‌برداری کردن",
    lesson: 2,
    pos: "v.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "edit",
    meaning: "ویرایش کردن",
    lesson: 2,
    pos: "v.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "direct",
    meaning: "کارگردانی کردن",
    lesson: 2,
    pos: "v.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "star in",
    meaning: "بازی نقش اصلی در",
    lesson: 2,
    pos: "phr.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "review",
    meaning: "نقد کردن",
    lesson: 2,
    pos: "v.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "a film",
    meaning: "یک فیلم",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "magnificent",
    meaning: "شکوه‌مند",
    lesson: 2,
    pos: "adj.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "breath-taking",
    meaning: "تأمین‌کننده، نفس‌گیر",
    lesson: 2,
    pos: "adj.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "superb",
    meaning: "عالی",
    lesson: 2,
    pos: "adj.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "view",
    meaning: "منظره",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "kick",
    meaning: "ضربه زدن",
    lesson: 2,
    pos: "v.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "hit",
    meaning: "زدن، اصابت کردن",
    lesson: 2,
    pos: "v.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "bounce",
    meaning: "بیسکویت دادن، جهیدن",
    lesson: 2,
    pos: "v.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "a ball",
    meaning: "توپ",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "out of my sight",
    meaning: "از دید من خارج",
    lesson: 2,
    pos: "phr.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "get over",
    meaning: "از پس ... برآمدن، بهبود یافتن",
    lesson: 2,
    pos: "phr.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "an illness",
    meaning: "یک بیماری",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "get up",
    meaning: "از خواب بیدار شدن",
    lesson: 2,
    pos: "phr.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "in the morning",
    meaning: "صبح‌ها",
    lesson: 2,
    pos: "phr.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "get through",
    meaning: "تلفنی وصل شدن",
    lesson: 2,
    pos: "phr.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "on the phone",
    meaning: "از طریق تلفن",
    lesson: 2,
    pos: "phr.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "make",
    meaning: "ساختن",
    lesson: 2,
    pos: "v.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "to fly",
    meaning: "پرواز کردن / هواپیما راندن",
    lesson: 2,
    pos: "v.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "to drive",
    meaning: "رانندگی کردن",
    lesson: 2,
    pos: "v.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "to ride",
    meaning: "سوار شدن/راندن",
    lesson: 2,
    pos: "v.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "a car",
    meaning: "خودرو",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "a motorbike",
    meaning: "موتورسیکلت",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "a train",
    meaning: "قطار",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "a horse",
    meaning: "اسب",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "a plane",
    meaning: "هواپیما",
    lesson: 2,
    pos: "n.",
    lessonLabel: "درس 2 — یادگیری واژگان — ابزارهای یادگیری"
  },
  {
    word: "HOLIDAYS",
    meaning: "تعطیلات",
    lesson: 3,
    lessonLabel: "درس 3 — سازمان‌دهی دفترچهٔ واژگان"
  },
  {
    word: "ACTIVITIES",
    meaning: "فعالیت‌ها",
    lesson: 3,
    lessonLabel: "درس 3 — سازمان‌دهی دفترچهٔ واژگان"
  },
  {
    word: "ACCOMMODATION",
    meaning: "اقامت / محل اقامت",
    lesson: 3,
    lessonLabel: "درس 3 — سازمان‌دهی دفترچهٔ واژگان"
  },
  {
    word: "swimming",
    meaning: "شنا",
    lesson: 3,
    lessonLabel: "درس 3 — سازمان‌دهی دفترچهٔ واژگان"
  },
  {
    word: "sightseeing",
    meaning: "بازدید از دیدنی‌ها",
    lesson: 3,
    lessonLabel: "درس 3 — سازمان‌دهی دفترچهٔ واژگان"
  },
  {
    word: "hiking",
    meaning: "پیاده‌گردی",
    lesson: 3,
    lessonLabel: "درس 3 — سازمان‌دهی دفترچهٔ واژگان"
  },
  {
    word: "camp-site",
    meaning: "محلهٔ چادرزنی / کمپ",
    lesson: 3,
    lessonLabel: "درس 3 — سازمان‌دهی دفترچهٔ واژگان"
  },
  {
    word: "hotel",
    meaning: "هتل",
    lesson: 3,
    lessonLabel: "درس 3 — سازمان‌دهی دفترچهٔ واژگان"
  },
  {
    word: "BOOKING",
    meaning: "رزرو",
    lesson: 3,
    lessonLabel: "درس 3 — سازمان‌دهی دفترچهٔ واژگان"
  },
  {
    word: "single/double room",
    meaning: "اتاق یک‌نفره/دونفره",
    lesson: 3,
    lessonLabel: "درس 3 — سازمان‌دهی دفترچهٔ واژگان"
  },
  {
    word: "check-out time",
    meaning: "زمان تخلیهٔ اتاق",
    lesson: 3,
    lessonLabel: "درس 3 — سازمان‌دهی دفترچهٔ واژگان"
  },
  {
    word: "TRAVEL",
    meaning: "سفر",
    lesson: 3,
    lessonLabel: "درس 3 — سازمان‌دهی دفترچهٔ واژگان"
  },
  {
    word: "road",
    meaning: "جاده",
    lesson: 3,
    lessonLabel: "درس 3 — سازمان‌دهی دفترچهٔ واژگان"
  },
  {
    word: "sea",
    meaning: "دریا",
    lesson: 3,
    lessonLabel: "درس 3 — سازمان‌دهی دفترچهٔ واژگان"
  },
  {
    word: "rail",
    meaning: "ریل / راه‌آهن",
    lesson: 3,
    lessonLabel: "درس 3 — سازمان‌دهی دفترچهٔ واژگان"
  },
  {
    word: "air",
    meaning: "هوا / سفر هوایی",
    lesson: 3,
    lessonLabel: "درس 3 — سازمان‌دهی دفترچهٔ واژگان"
  },
  {
    word: "coach",
    meaning: "اتوبوس مسافربری",
    lesson: 3,
    lessonLabel: "درس 3 — سازمان‌دهی دفترچهٔ واژگان"
  },
  {
    word: "motorway",
    meaning: "بزرگراه",
    lesson: 3,
    lessonLabel: "درس 3 — سازمان‌دهی دفترچهٔ واژگان"
  },
  {
    word: "ferry",
    meaning: "کشتی تفریحی / فرِی",
    lesson: 3,
    lessonLabel: "درس 3 — سازمان‌دهی دفترچهٔ واژگان"
  },
  {
    word: "cruise",
    meaning: "کروز / سفر دریایی",
    lesson: 3,
    lessonLabel: "درس 3 — سازمان‌دهی دفترچهٔ واژگان"
  },
  {
    word: "rail pass",
    meaning: "بلیت راه‌آهن",
    lesson: 3,
    lessonLabel: "درس 3 — سازمان‌دهی دفترچهٔ واژگان"
  },
  {
    word: "single/return",
    meaning: "یک‌طرفه/رفت‌وبرگشت",
    lesson: 3,
    lessonLabel: "درس 3 — سازمان‌دهی دفترچهٔ واژگان"
  },
  {
    word: "charter flight",
    meaning: "پرواز چارتر",
    lesson: 3,
    lessonLabel: "درس 3 — سازمان‌دهی دفترچهٔ واژگان"
  },
  {
    word: "apex fare",
    meaning: "کرایهٔ ویژهٔ زودخرید",
    lesson: 3,
    lessonLabel: "درس 3 — سازمان‌دهی دفترچهٔ واژگان"
  },
  {
    word: "synonym",
    meaning: "مترادف",
    lesson: 3,
    pos: "n.",
    lessonLabel: "درس 3 — سازمان‌دهی دفترچهٔ واژگان"
  },
  {
    word: "antonym",
    meaning: "متضاد",
    lesson: 3,
    pos: "n.",
    lessonLabel: "درس 3 — سازمان‌دهی دفترچهٔ واژگان"
  },
  {
    word: "stop",
    meaning: "متوقف کردن",
    lesson: 3,
    pos: "v.",
    lessonLabel: "درس 3 — سازمان‌دهی دفترچهٔ واژگان"
  },
  {
    word: "cease",
    meaning: "پایان دادن / متوقف کردن (رسمی‌تر)",
    lesson: 3,
    pos: "v.",
    lessonLabel: "درس 3 — سازمان‌دهی دفترچهٔ واژگان"
  },
  {
    word: "urban",
    meaning: "شهری",
    lesson: 3,
    pos: "adj.",
    lessonLabel: "درس 3 — سازمان‌دهی دفترچهٔ واژگان"
  },
  {
    word: "rural",
    meaning: "روستایی",
    lesson: 3,
    pos: "adj.",
    lessonLabel: "درس 3 — سازمان‌دهی دفترچهٔ واژگان"
  },
  {
    word: "article",
    meaning: "حرف تعریف",
    lesson: 4,
    pos: "n.",
    lessonLabel: "درس 4 — نام واژه‌های زبان انگلیسی"
  },
  {
    word: "noun",
    meaning: "اسم",
    lesson: 4,
    pos: "n.",
    lessonLabel: "درس 4 — نام واژه‌های زبان انگلیسی"
  },
  {
    word: "adverb",
    meaning: "قید",
    lesson: 4,
    pos: "n.",
    lessonLabel: "درس 4 — نام واژه‌های زبان انگلیسی"
  },
  {
    word: "conjunction",
    meaning: "حرف ربط",
    lesson: 4,
    pos: "n.",
    lessonLabel: "درس 4 — نام واژه‌های زبان انگلیسی"
  },
  {
    word: "gerund",
    meaning: "اسم مصدر",
    lesson: 4,
    pos: "n.",
    lessonLabel: "درس 4 — نام واژه‌های زبان انگلیسی"
  },
  {
    word: "adjective",
    meaning: "صفت",
    lesson: 4,
    pos: "n.",
    lessonLabel: "درس 4 — نام واژه‌های زبان انگلیسی"
  },
  {
    word: "verb",
    meaning: "فعل",
    lesson: 4,
    pos: "n.",
    lessonLabel: "درس 4 — نام واژه‌های زبان انگلیسی"
  },
  {
    word: "preposition",
    meaning: "حرف اضافه",
    lesson: 4,
    pos: "n.",
    lessonLabel: "درس 4 — نام واژه‌های زبان انگلیسی"
  },
  {
    word: "pronoun",
    meaning: "ضمیر",
    lesson: 4,
    pos: "n.",
    lessonLabel: "درس 4 — نام واژه‌های زبان انگلیسی"
  },
  {
    word: "countable",
    meaning: "قابل شمارش",
    lesson: 4,
    pos: "adj.",
    lessonLabel: "درس 4 — نام واژه‌های زبان انگلیسی"
  },
  {
    word: "uncountable",
    meaning: "غیرقابل شمارش",
    lesson: 4,
    pos: "adj.",
    lessonLabel: "درس 4 — نام واژه‌های زبان انگلیسی"
  },
  {
    word: "subject",
    meaning: "نهاد / فاعل",
    lesson: 4,
    pos: "n.",
    lessonLabel: "درس 4 — نام واژه‌های زبان انگلیسی"
  },
  {
    word: "object",
    meaning: "مفعول",
    lesson: 4,
    pos: "n.",
    lessonLabel: "درس 4 — نام واژه‌های زبان انگلیسی"
  },
  {
    word: "infinitive (go)",
    meaning: "مصدر (go)",
    lesson: 4,
    pos: "n.",
    lessonLabel: "درس 4 — نام واژه‌های زبان انگلیسی"
  },
  {
    word: "-ing form (going)",
    meaning: "فرم -ing (going)",
    lesson: 4,
    pos: "n.",
    lessonLabel: "درس 4 — نام واژه‌های زبان انگلیسی"
  },
  {
    word: "past participle (gone)",
    meaning: "اسم مفعول (gone)",
    lesson: 4,
    pos: "n.",
    lessonLabel: "درس 4 — نام واژه‌های زبان انگلیسی"
  },
  {
    word: "past tense (went)",
    meaning: "زمان گذشته (went)",
    lesson: 4,
    pos: "n.",
    lessonLabel: "درس 4 — نام واژه‌های زبان انگلیسی"
  },
  {
    word: "irregular",
    meaning: "بی‌قاعده",
    lesson: 4,
    pos: "adj.",
    lessonLabel: "درس 4 — نام واژه‌های زبان انگلیسی"
  },
  {
    word: "regular",
    meaning: "با قاعده",
    lesson: 4,
    pos: "adj.",
    lessonLabel: "درس 4 — نام واژه‌های زبان انگلیسی"
  },
  {
    word: "intransitive",
    meaning: "لازم",
    lesson: 4,
    pos: "adj.",
    lessonLabel: "درس 4 — نام واژه‌های زبان انگلیسی"
  },
  {
    word: "transitive",
    meaning: "متعدی",
    lesson: 4,
    pos: "adj.",
    lessonLabel: "درس 4 — نام واژه‌های زبان انگلیسی"
  },
  {
    word: "prefix",
    meaning: "پیشوند",
    lesson: 4,
    pos: "n.",
    lessonLabel: "درس 4 — نام واژه‌های زبان انگلیسی"
  },
  {
    word: "root",
    meaning: "ریشهٔ واژه",
    lesson: 4,
    pos: "n.",
    lessonLabel: "درس 4 — نام واژه‌های زبان انگلیسی"
  },
  {
    word: "suffix",
    meaning: "پسوند",
    lesson: 4,
    pos: "n.",
    lessonLabel: "درس 4 — نام واژه‌های زبان انگلیسی"
  },
  {
    word: "antonym",
    meaning: "متضاد",
    lesson: 4,
    pos: "n.",
    lessonLabel: "درس 4 — نام واژه‌های زبان انگلیسی"
  },
  {
    word: "synonym",
    meaning: "مترادف",
    lesson: 4,
    pos: "n.",
    lessonLabel: "درس 4 — نام واژه‌های زبان انگلیسی"
  },
  {
    word: "word family",
    meaning: "خانوادهٔ واژگانی",
    lesson: 4,
    lessonLabel: "درس 4 — نام واژه‌های زبان انگلیسی"
  },
  {
    word: "phrase",
    meaning: "عبارت",
    lesson: 4,
    pos: "n.",
    lessonLabel: "درس 4 — نام واژه‌های زبان انگلیسی"
  },
  {
    word: "sentence",
    meaning: "جمله",
    lesson: 4,
    pos: "n.",
    lessonLabel: "درس 4 — نام واژه‌های زبان انگلیسی"
  },
  {
    word: "main verb",
    meaning: "فعل اصلی",
    lesson: 4,
    lessonLabel: "درس 4 — نام واژه‌های زبان انگلیسی"
  },
  {
    word: "capital letter",
    meaning: "حرف بزرگ",
    lesson: 4,
    lessonLabel: "درس 4 — نام واژه‌های زبان انگلیسی"
  },
  {
    word: "syllable",
    meaning: "بخش (هجای آوایی)",
    lesson: 4,
    pos: "n.",
    lessonLabel: "درس 4 — نام واژه‌های زبان انگلیسی"
  },
  {
    word: "stress",
    meaning: "تأکید تلفظی",
    lesson: 4,
    pos: "n.",
    lessonLabel: "درس 4 — نام واژه‌های زبان انگلیسی"
  },
  {
    word: "slang",
    meaning: "زبان عامیانه",
    lesson: 4,
    pos: "n.",
    lessonLabel: "درس 4 — نام واژه‌های زبان انگلیسی"
  },
  {
    word: "colloquial",
    meaning: "محاوره‌ای",
    lesson: 4,
    pos: "adj.",
    lessonLabel: "درس 4 — نام واژه‌های زبان انگلیسی"
  },
  {
    word: "pejorative",
    meaning: "تحقیرآمیز / با بار منفی",
    lesson: 4,
    pos: "adj.",
    lessonLabel: "درس 4 — نام واژه‌های زبان انگلیسی"
  },
  {
    word: "collocation",
    meaning: "هم‌آیی واژگانی",
    lesson: 4,
    pos: "n.",
    lessonLabel: "درس 4 — نام واژه‌های زبان انگلیسی"
  },
  {
    word: "full stop",
    meaning: "نقطه",
    lesson: 4,
    lessonLabel: "درس 4 — نام واژه‌های زبان انگلیسی"
  },
  {
    word: "comma",
    meaning: "ویرگول",
    lesson: 4,
    pos: "n.",
    lessonLabel: "درس 4 — نام واژه‌های زبان انگلیسی"
  },
  {
    word: "semi-colon",
    meaning: "نقطه‌ویرگول",
    lesson: 4,
    pos: "n.",
    lessonLabel: "درس 4 — نام واژه‌های زبان انگلیسی"
  },
  {
    word: "apostrophe",
    meaning: "آپاستروف",
    lesson: 4,
    pos: "n.",
    lessonLabel: "درس 4 — نام واژه‌های زبان انگلیسی"
  },
  {
    word: "hyphen",
    meaning: "خط تیره (در کلمه)",
    lesson: 4,
    pos: "n.",
    lessonLabel: "درس 4 — نام واژه‌های زبان انگلیسی"
  },
  {
    word: "dash",
    meaning: "خط تیره (میان جمله)",
    lesson: 4,
    pos: "n.",
    lessonLabel: "درس 4 — نام واژه‌های زبان انگلیسی"
  },
  {
    word: "exclamation mark",
    meaning: "علامت تعجب",
    lesson: 4,
    lessonLabel: "درس 4 — نام واژه‌های زبان انگلیسی"
  },
  {
    word: "question mark",
    meaning: "علامت سؤال",
    lesson: 4,
    lessonLabel: "درس 4 — نام واژه‌های زبان انگلیسی"
  },
  {
    word: "brackets",
    meaning: "پرانتز",
    lesson: 4,
    pos: "n.",
    lessonLabel: "درس 4 — نام واژه‌های زبان انگلیسی"
  },
  {
    word: "inverted commas",
    meaning: "گیومه",
    lesson: 4,
    lessonLabel: "درس 4 — نام واژه‌های زبان انگلیسی"
  },
  {
    word: "block capitals",
    meaning: "حروف بزرگ (همه با حروف بزرگ)",
    lesson: 4,
    lessonLabel: "درس 4 — نام واژه‌های زبان انگلیسی"
  },
  {
    word: "mislay",
    meaning: "گم کردن (اشیاء)",
    lesson: 5,
    pos: "v.",
    lessonLabel: "درس 5 — استفاده از فرهنگ لغت"
  },
  {
    word: "misplace",
    meaning: "جا به جا گذاشتن، گم کردن",
    lesson: 5,
    pos: "v.",
    lessonLabel: "درس 5 — استفاده از فرهنگ لغت"
  },
  {
    word: "friend",
    meaning: "دوست",
    lesson: 5,
    pos: "n.",
    lessonLabel: "درس 5 — استفاده از فرهنگ لغت"
  },
  {
    word: "enemy",
    meaning: "دشمن",
    lesson: 5,
    pos: "n.",
    lessonLabel: "درس 5 — استفاده از فرهنگ لغت"
  },
  {
    word: "foe",
    meaning: "دشمن (ادبی)",
    lesson: 5,
    pos: "n.",
    lessonLabel: "درس 5 — استفاده از فرهنگ لغت"
  },
  {
    word: "living",
    meaning: "معاش، زندگی",
    lesson: 5,
    pos: "n.",
    lessonLabel: "درس 5 — استفاده از فرهنگ لغت"
  },
  {
    word: "cost of living",
    meaning: "هزینهٔ زندگی",
    lesson: 5,
    pos: "phr.",
    lessonLabel: "درس 5 — استفاده از فرهنگ لغت"
  },
  {
    word: "make a living",
    meaning: "نانی درآوردن",
    lesson: 5,
    pos: "phr.",
    lessonLabel: "درس 5 — استفاده از فرهنگ لغت"
  },
  {
    word: "standard of living",
    meaning: "سطح زندگی",
    lesson: 5,
    pos: "phr.",
    lessonLabel: "درس 5 — استفاده از فرهنگ لغت"
  },
  {
    word: "do something for a living",
    meaning: "کاری را برای امرار معاش انجام دادن",
    lesson: 5,
    pos: "phr.",
    lessonLabel: "درس 5 — استفاده از فرهنگ لغت"
  },
  {
    word: "suggest",
    meaning: "پیشنهاد کردن",
    lesson: 5,
    pos: "v.",
    lessonLabel: "درس 5 — استفاده از فرهنگ لغت"
  },
  {
    word: "malignant",
    meaning: "بدخیم؛ خراب‌کننده",
    lesson: 5,
    pos: "adj.",
    lessonLabel: "درس 5 — استفاده از فرهنگ لغت"
  },
  {
    word: "malignancy",
    meaning: "بدخیمی",
    lesson: 5,
    pos: "n.",
    lessonLabel: "درس 5 — استفاده از فرهنگ لغت"
  },
  {
    word: "malignantly",
    meaning: "به‌طور بدخیمانه",
    lesson: 5,
    pos: "adv.",
    lessonLabel: "درس 5 — استفاده از فرهنگ لغت"
  },
  {
    word: "hairy",
    meaning: "پرمو؛ (غیررسمی) ترسناک و هیجان‌انگیز",
    lesson: 5,
    pos: "adj.",
    lessonLabel: "درس 5 — استفاده از فرهنگ لغت"
  },
  {
    word: "revising",
    meaning: "مرور کردن",
    lesson: 6,
    pos: "n.",
    lessonLabel: "درس 6 — مرور واژگان"
  },
  {
    word: "target language",
    meaning: "زبان هدف",
    lesson: 6,
    pos: "phr.",
    lessonLabel: "درس 6 — مرور واژگان"
  },
  {
    word: "intervals",
    meaning: "فاصله‌های زمانی",
    lesson: 6,
    pos: "n.",
    lessonLabel: "درس 6 — مرور واژگان"
  },
  {
    word: "automatic",
    meaning: "خودکار (بدون فکر کردن)",
    lesson: 6,
    pos: "adj.",
    lessonLabel: "درس 6 — مرور واژگان"
  },
  {
    word: "recombining",
    meaning: "ترکیب مجدد",
    lesson: 6,
    pos: "v.",
    lessonLabel: "درس 6 — مرور واژگان"
  },
  {
    word: "highlight",
    meaning: "با ماژیک مشخص کردن",
    lesson: 6,
    pos: "v.",
    lessonLabel: "درس 6 — مرور واژگان"
  },
  {
    word: "heart",
    meaning: "قلب",
    lesson: 6,
    pos: "n.",
    lessonLabel: "درس 6 — مرور واژگان"
  },
  {
    word: "heart-broken",
    meaning: "دل‌شکسته",
    lesson: 6,
    pos: "adj.",
    lessonLabel: "درس 6 — مرور واژگان"
  },
  {
    word: "have your heart in your mouth",
    meaning: "شدیداً ترسیدن",
    lesson: 6,
    pos: "phr.",
    lessonLabel: "درس 6 — مرور واژگان"
  },
  {
    word: "employment",
    meaning: "اشتغال؛ استخدام",
    lesson: 6,
    pos: "n.",
    lessonLabel: "درس 6 — مرور واژگان"
  },
  {
    word: "employ",
    meaning: "استخدام کردن",
    lesson: 6,
    pos: "v.",
    lessonLabel: "درس 6 — مرور واژگان"
  },
  {
    word: "employer",
    meaning: "کارفرما",
    lesson: 6,
    pos: "n.",
    lessonLabel: "درس 6 — مرور واژگان"
  },
  {
    word: "employee",
    meaning: "کارمند",
    lesson: 6,
    pos: "n.",
    lessonLabel: "درس 6 — مرور واژگان"
  },
  {
    word: "employable",
    meaning: "قابل استخدام",
    lesson: 6,
    pos: "adj.",
    lessonLabel: "درس 6 — مرور واژگان"
  },
  {
    word: "unemployed",
    meaning: "بیکار",
    lesson: 6,
    pos: "adj.",
    lessonLabel: "درس 6 — مرور واژگان"
  },
  {
    word: "self-employed",
    meaning: "خوداشتغال",
    lesson: 6,
    pos: "adj.",
    lessonLabel: "درس 6 — مرور واژگان"
  },
  {
    word: "phonetic script",
    meaning: "آوانگاری",
    lesson: 6,
    pos: "phr.",
    lessonLabel: "درس 6 — مرور واژگان"
  },
  {
    word: "network",
    meaning: "شبکه (واژگانی)",
    lesson: 6,
    pos: "n.",
    lessonLabel: "درس 6 — مرور واژگان"
  },
  {
    word: "make the step",
    meaning: "گام برداشتن",
    lesson: 6,
    pos: "phr.",
    lessonLabel: "درس 6 — مرور واژگان"
  },
  {
    word: "receptive vocabulary",
    meaning: "واژگان منفعل (دریافتی)",
    lesson: 6,
    pos: "phr.",
    lessonLabel: "درس 6 — مرور واژگان"
  },
  {
    word: "active vocabulary",
    meaning: "واژگان فعال",
    lesson: 6,
    pos: "phr.",
    lessonLabel: "درس 6 — مرور واژگان"
  },
  {
    word: "make a point of",
    meaning: "تأکید کردن بر؛ حتماً انجام دادن",
    lesson: 6,
    pos: "phr.",
    lessonLabel: "درس 6 — مرور واژگان"
  },
  {
    word: "learning diary",
    meaning: "دفترچه یادداشت یادگیری",
    lesson: 6,
    pos: "phr.",
    lessonLabel: "درس 6 — مرور واژگان"
  },
  {
    word: "come across",
    meaning: "بر خوردن به",
    lesson: 6,
    pos: "phr.",
    lessonLabel: "درس 6 — مرور واژگان"
  },
  {
    word: "paragraph",
    meaning: "پاراگراف",
    lesson: 6,
    pos: "n.",
    lessonLabel: "درس 6 — مرور واژگان"
  },
  {
    word: "infer",
    meaning: "استنتاج کردن، برداشت کردن",
    lesson: 7,
    pos: "v.",
    lessonLabel: "درس 7 — حدس زدن و توضیح معنا"
  },
  {
    word: "clue",
    meaning: "سرنخ",
    lesson: 7,
    pos: "n.",
    lessonLabel: "درس 7 — حدس زدن و توضیح معنا"
  },
  {
    word: "work out",
    meaning: "پی بردن، فهمیدن",
    lesson: 7,
    pos: "phr.",
    lessonLabel: "درس 7 — حدس زدن و توضیح معنا"
  },
  {
    word: "unfamiliar",
    meaning: "ناآشنا",
    lesson: 7,
    pos: "adj.",
    lessonLabel: "درس 7 — حدس زدن و توضیح معنا"
  },
  {
    word: "visual clue",
    meaning: "سرنخ بصری",
    lesson: 7,
    pos: "phr.",
    lessonLabel: "درس 7 — حدس زدن و توضیح معنا"
  },
  {
    word: "footage",
    meaning: "تصاویر فیلم",
    lesson: 7,
    pos: "n.",
    lessonLabel: "درس 7 — حدس زدن و توضیح معنا"
  },
  {
    word: "background knowledge",
    meaning: "دانش پیشین",
    lesson: 7,
    pos: "phr.",
    lessonLabel: "درس 7 — حدس زدن و توضیح معنا"
  },
  {
    word: "earthquake",
    meaning: "زلزله",
    lesson: 7,
    pos: "n.",
    lessonLabel: "درس 7 — حدس زدن و توضیح معنا"
  },
  {
    word: "immediate context",
    meaning: "بستر بی‌درنگ (کلمات اطراف کلمهٔ ناآشنا)",
    lesson: 7,
    pos: "phr.",
    lessonLabel: "درس 7 — حدس زدن و توضیح معنا"
  },
  {
    word: "gladiolus",
    meaning: "گل نرگسی (گلادیولوس)",
    lesson: 7,
    pos: "n.",
    lessonLabel: "درس 7 — حدس زدن و توضیح معنا"
  },
  {
    word: "obvious",
    meaning: "بدیهی، آشکار",
    lesson: 7,
    pos: "adj.",
    lessonLabel: "درس 7 — حدس زدن و توضیح معنا"
  },
  {
    word: "superstitious",
    meaning: "خرافاتی",
    lesson: 7,
    pos: "adj.",
    lessonLabel: "درس 7 — حدس زدن و توضیح معنا"
  },
  {
    word: "gingerly",
    meaning: "با احتیاط",
    lesson: 7,
    pos: "adv.",
    lessonLabel: "درس 7 — حدس زدن و توضیح معنا"
  },
  {
    word: "tiptoe",
    meaning: "پنجه‌راه رفتن",
    lesson: 7,
    pos: "v.",
    lessonLabel: "درس 7 — حدس زدن و توضیح معنا"
  },
  {
    word: "component",
    meaning: "جزء، مؤلفه",
    lesson: 7,
    pos: "n.",
    lessonLabel: "درس 7 — حدس زدن و توضیح معنا"
  },
  {
    word: "build up",
    meaning: "ساختن، ایجاد کردن",
    lesson: 7,
    pos: "phr.",
    lessonLabel: "درس 7 — حدس زدن و توضیح معنا"
  },
  {
    word: "concept",
    meaning: "مفهوم",
    lesson: 7,
    pos: "n.",
    lessonLabel: "درس 7 — حدس زدن و توضیح معنا"
  },
  {
    word: "prefix",
    meaning: "پیشوند",
    lesson: 7,
    pos: "n.",
    lessonLabel: "درس 7 — حدس زدن و توضیح معنا"
  },
  {
    word: "suffix",
    meaning: "پسوند",
    lesson: 7,
    pos: "n.",
    lessonLabel: "درس 7 — حدس زدن و توضیح معنا"
  },
  {
    word: "word formation",
    meaning: "ساخت واژه",
    lesson: 7,
    pos: "phr.",
    lessonLabel: "درس 7 — حدس زدن و توضیح معنا"
  },
  {
    word: "exploit",
    meaning: "بهره گرفتن از",
    lesson: 7,
    pos: "v.",
    lessonLabel: "درس 7 — حدس زدن و توضیح معنا"
  },
  {
    word: "make sense of",
    meaning: "معنا کردن، فهمیدن",
    lesson: 7,
    pos: "phr.",
    lessonLabel: "درس 7 — حدس زدن و توضیح معنا"
  },
  {
    word: "resemble",
    meaning: "شباهت داشتن به",
    lesson: 7,
    pos: "v.",
    lessonLabel: "درس 7 — حدس زدن و توضیح معنا"
  },
  {
    word: "false friends",
    meaning: "دوستان کاذب (واژه‌هایی که شبیه‌اند اما معنای متفاوت دارند)",
    lesson: 7,
    pos: "phr.",
    lessonLabel: "درس 7 — حدس زدن و توضیح معنا"
  },
  {
    word: "crucial",
    meaning: "حیاتی، بسیار مهم",
    lesson: 7,
    pos: "adj.",
    lessonLabel: "درس 7 — حدس زدن و توضیح معنا"
  },
  {
    word: "It's (a bit) like (a chair) ...",
    meaning: "شبیه (صندلی) است ...",
    lesson: 7,
    pos: "phr.",
    lessonLabel: "درس 7 — حدس زدن و توضیح معنا"
  },
  {
    word: "It's something you use for (painting pictures / cleaning the kitchen floor ...)",
    meaning: "چیزی است که برای (نقاشی کشیدن / تمیز کردن کف آشپزخانه ...) استفاده می‌شود",
    lesson: 7,
    pos: "phr.",
    lessonLabel: "درس 7 — حدس زدن و توضیح معنا"
  },
  {
    word: "It's a kind of (bird / musical instrument / building ...)",
    meaning: "نوعی (پرنده / ساز / ساختمان ...) است",
    lesson: 7,
    pos: "phr.",
    lessonLabel: "درس 7 — حدس زدن و توضیح معنا"
  },
  {
    word: "It must / could be ...",
    meaning: "حتماً / ممکن است ... باشد",
    lesson: 7,
    pos: "phr.",
    lessonLabel: "درس 7 — حدس زدن و توضیح معنا"
  },
  {
    word: "writer",
    meaning: "نویسنده",
    lesson: 8,
    pos: "n.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "painter",
    meaning: "نقاش",
    lesson: 8,
    pos: "n.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "worker",
    meaning: "کارگر",
    lesson: 8,
    pos: "n.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "shopper",
    meaning: "خریدار",
    lesson: 8,
    pos: "n.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "teacher",
    meaning: "معلم",
    lesson: 8,
    pos: "n.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "actor",
    meaning: "بازیگر",
    lesson: 8,
    pos: "n.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "operator",
    meaning: "اپراتور",
    lesson: 8,
    pos: "n.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "sailor",
    meaning: "دریانورد",
    lesson: 8,
    pos: "n.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "supervisor",
    meaning: "سرپرست",
    lesson: 8,
    pos: "n.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "pencil-sharpener",
    meaning: "تراش مداد",
    lesson: 8,
    pos: "n.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "bottle-opener",
    meaning: "بازکن بطری",
    lesson: 8,
    pos: "n.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "grater",
    meaning: "رنده (رنده آشپزخانه)",
    lesson: 8,
    pos: "n.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "projector",
    meaning: "پروژکتور (دستگاه نمایش)",
    lesson: 8,
    pos: "n.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "employer",
    meaning: "کارفرما",
    lesson: 8,
    pos: "n.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "employee",
    meaning: "کارمند",
    lesson: 8,
    pos: "n.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "sender",
    meaning: "فرستنده",
    lesson: 8,
    pos: "n.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "addressee",
    meaning: "گیرنده (نامه)",
    lesson: 8,
    pos: "n.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "payee",
    meaning: "ذی‌نفع (گیرنده پول)",
    lesson: 8,
    pos: "n.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "complication",
    meaning: "عارضه/پیچیدگی",
    lesson: 8,
    pos: "n.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "pollution",
    meaning: "آلودگی",
    lesson: 8,
    pos: "n.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "reduction",
    meaning: "کاهش",
    lesson: 8,
    pos: "n.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "alteration",
    meaning: "تغییر",
    lesson: 8,
    pos: "n.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "donation",
    meaning: "اهدا/کمک مالی",
    lesson: 8,
    pos: "n.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "promotion",
    meaning: "ارتقا/تبلیغ",
    lesson: 8,
    pos: "n.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "admission",
    meaning: "پذیرش/اجازه ورود",
    lesson: 8,
    pos: "n.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "Buddhism",
    meaning: "آیین بودایی",
    lesson: 8,
    pos: "n.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "journalism",
    meaning: "روزنامه‌نگاری",
    lesson: 8,
    pos: "n.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "Marxist",
    meaning: "مارکسیست",
    lesson: 8,
    pos: "n.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "typist",
    meaning: "تایپیست",
    lesson: 8,
    pos: "n.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "physicist",
    meaning: "فیزیک‌دان",
    lesson: 8,
    pos: "n.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "terrorist",
    meaning: "تروریست",
    lesson: 8,
    pos: "n.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "pianist",
    meaning: "پیانیست",
    lesson: 8,
    pos: "n.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "violinist",
    meaning: "ویلنیست",
    lesson: 8,
    pos: "n.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "cellist",
    meaning: "ویلون‌سل‌نواز",
    lesson: 8,
    pos: "n.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "goodness",
    meaning: "خوش‌جنسی/نیکی",
    lesson: 8,
    pos: "n.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "readiness",
    meaning: "آمادگی",
    lesson: 8,
    pos: "n.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "forgetfulness",
    meaning: "فراموش‌کاری",
    lesson: 8,
    pos: "n.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "happiness",
    meaning: "خوشبختی",
    lesson: 8,
    pos: "n.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "sadness",
    meaning: "غم",
    lesson: 8,
    pos: "n.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "weakness",
    meaning: "ضعف",
    lesson: 8,
    pos: "n.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "drinkable",
    meaning: "قابل آشامیدن",
    lesson: 8,
    pos: "adj.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "washable",
    meaning: "قابل شستشو",
    lesson: 8,
    pos: "adj.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "readable",
    meaning: "خوانا/قابل خواندن",
    lesson: 8,
    pos: "adj.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "forgivable",
    meaning: "قابل بخشش",
    lesson: 8,
    pos: "adj.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "edible",
    meaning: "خوراکی",
    lesson: 8,
    pos: "adj.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "flexible",
    meaning: "انعطاف‌پذیر",
    lesson: 8,
    pos: "adj.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "modernise",
    meaning: "مدرن کردن",
    lesson: 8,
    pos: "v.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "commercialise",
    meaning: "تجاری کردن",
    lesson: 8,
    pos: "v.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "industrialise",
    meaning: "صنعتی کردن",
    lesson: 8,
    pos: "v.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "excitement",
    meaning: "هیجان",
    lesson: 8,
    pos: "n.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "enjoyment",
    meaning: "لذت",
    lesson: 8,
    pos: "n.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "replacement",
    meaning: "جایگزینی",
    lesson: 8,
    pos: "n.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "flexibility",
    meaning: "انعطاف‌پذیری",
    lesson: 8,
    pos: "n.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "productivity",
    meaning: "بهره‌وری",
    lesson: 8,
    pos: "n.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "scarcity",
    meaning: "کمیابی",
    lesson: 8,
    pos: "n.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "childhood",
    meaning: "کودکی",
    lesson: 8,
    pos: "n.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "motherhood",
    meaning: "مادری",
    lesson: 8,
    pos: "n.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "friendship",
    meaning: "دوستی",
    lesson: 8,
    pos: "n.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "partnership",
    meaning: "شراکت",
    lesson: 8,
    pos: "n.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "membership",
    meaning: "عضویت",
    lesson: 8,
    pos: "n.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "passive",
    meaning: "منفعل",
    lesson: 8,
    pos: "adj.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "productive",
    meaning: "پُرمحصول",
    lesson: 8,
    pos: "adj.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "active",
    meaning: "فعال",
    lesson: 8,
    pos: "adj.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "brutal",
    meaning: "بی‌رحم",
    lesson: 8,
    pos: "adj.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "legal",
    meaning: "قانونی",
    lesson: 8,
    pos: "adj.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "refusal",
    meaning: "امتناع/سرباز زدن",
    lesson: 8,
    pos: "n.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "arrival",
    meaning: "رسیدن/ورود",
    lesson: 8,
    pos: "n.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "delicious",
    meaning: "خوشمزه",
    lesson: 8,
    pos: "adj.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "outrageous",
    meaning: "فجیع/اسفناک",
    lesson: 8,
    pos: "adj.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "furious",
    meaning: "خشمگین",
    lesson: 8,
    pos: "adj.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "forgetful",
    meaning: "فراموش‌کار",
    lesson: 8,
    pos: "adj.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "hopeful",
    meaning: "امیدوار",
    lesson: 8,
    pos: "adj.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "useful",
    meaning: "مفید",
    lesson: 8,
    pos: "adj.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "useless",
    meaning: "بی‌فایده",
    lesson: 8,
    pos: "adj.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "harmless",
    meaning: "بی‌خطر",
    lesson: 8,
    pos: "adj.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "homeless",
    meaning: "بی‌خانمان",
    lesson: 8,
    pos: "adj.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "beautify",
    meaning: "زیبا کردن",
    lesson: 8,
    pos: "v.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "purify",
    meaning: "تصفیه کردن",
    lesson: 8,
    pos: "v.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "terrify",
    meaning: "ترساندن",
    lesson: 8,
    pos: "v.",
    lessonLabel: "درس 8 — پسوندها"
  },
  {
    word: "unjust",
    meaning: "ناعادلانه",
    lesson: 9,
    pos: "adj.",
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "inedible",
    meaning: "خوردنی‌نبودنی، غیرخوراکی",
    lesson: 9,
    pos: "adj.",
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "disloyal",
    meaning: "بی‌وفا، خائن",
    lesson: 9,
    pos: "adj.",
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "immature",
    meaning: "نابالغ، ناپخته",
    lesson: 9,
    pos: "adj.",
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "impatient",
    meaning: "بی‌حوصله، صبورنبودن",
    lesson: 9,
    pos: "adj.",
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "impartial",
    meaning: "بی‌طرف",
    lesson: 9,
    pos: "adj.",
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "improbable",
    meaning: "بعید، غیرمحتمل",
    lesson: 9,
    pos: "adj.",
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "irreplaceable",
    meaning: "جایگزین‌ناپذیر",
    lesson: 9,
    pos: "adj.",
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "irreversible",
    meaning: "برگشت‌ناپذیر",
    lesson: 9,
    pos: "adj.",
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "illegal",
    meaning: "غیرقانونی",
    lesson: 9,
    pos: "adj.",
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "illegible",
    meaning: "ناخوانا",
    lesson: 9,
    pos: "adj.",
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "illiterate",
    meaning: "بی‌سواد",
    lesson: 9,
    pos: "adj.",
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "internal",
    meaning: "داخلی",
    lesson: 9,
    pos: "adj.",
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "import",
    meaning: "وارد کردن/واردات",
    lesson: 9,
    pos: "v.",
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "insert",
    meaning: "درج کردن، داخل کردن",
    lesson: 9,
    pos: "v.",
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "income",
    meaning: "درآمد",
    lesson: 9,
    pos: "n.",
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "untie",
    meaning: "بازکردن (گره)",
    lesson: 9,
    pos: "v.",
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "disappear",
    meaning: "ناپدید شدن",
    lesson: 9,
    pos: "v.",
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "disagree",
    meaning: "مخالفت کردن",
    lesson: 9,
    pos: "v.",
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "disapprove",
    meaning: "نپسندیدن، رد کردن",
    lesson: 9,
    pos: "v.",
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "disbelieve",
    meaning: "باور نکردن",
    lesson: 9,
    pos: "v.",
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "disconnect",
    meaning: "قطع کردن (اتصال)",
    lesson: 9,
    pos: "v.",
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "discredit",
    meaning: "بی‌اعتبار کردن",
    lesson: 9,
    pos: "v.",
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "dislike",
    meaning: "نپسندیدن",
    lesson: 9,
    pos: "v.",
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "dismount",
    meaning: "پیاده شدن (از اسب/دوچرخه)",
    lesson: 9,
    pos: "v.",
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "disprove",
    meaning: "رد کردن (اثبات نکردن)",
    lesson: 9,
    pos: "v.",
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "disqualify",
    meaning: "حذف صلاحیت کردن",
    lesson: 9,
    pos: "v.",
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "unbend",
    meaning: "صاف کردن (خمیده)",
    lesson: 9,
    pos: "v.",
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "undo",
    meaning: "باز کردن، خنثی کردن",
    lesson: 9,
    pos: "v.",
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "undress",
    meaning: "لباس تن‌کردن",
    lesson: 9,
    pos: "v.",
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "unfold",
    meaning: "باز کردن (تاشده)",
    lesson: 9,
    pos: "v.",
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "unload",
    meaning: "تخلیه کردن (بار)",
    lesson: 9,
    pos: "v.",
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "unlock",
    meaning: "باز کردن قفل",
    lesson: 9,
    pos: "v.",
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "unveil",
    meaning: "پرده‌برداری کردن",
    lesson: 9,
    pos: "v.",
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "unwrap",
    meaning: "باز کردن (بسته‌بندی)",
    lesson: 9,
    pos: "v.",
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "unzip",
    meaning: "باز کردن زیپ",
    lesson: 9,
    pos: "v.",
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "anti-war",
    meaning: "ضدجنگ",
    lesson: 9,
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "antisocial",
    meaning: "ضد اجتماعی، ویرانگر",
    lesson: 9,
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "antibiotic",
    meaning: "آنتی‌بیوتیک، ضدعفونی‌کننده",
    lesson: 9,
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "autograph",
    meaning: "امضا، دست‌نوشته",
    lesson: 9,
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "auto-pilot",
    meaning: "خلبان خودکار",
    lesson: 9,
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "autobiography",
    meaning: "خودزندگی‌نامه",
    lesson: 9,
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "bicycle",
    meaning: "دوچرخه",
    lesson: 9,
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "bilateral",
    meaning: "دوطرفه",
    lesson: 9,
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "biannual",
    meaning: "دوبار در سال، شش‌ماهه",
    lesson: 9,
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "bilingual",
    meaning: "دوزبانه",
    lesson: 9,
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "ex-wife",
    meaning: "همسر سابق",
    lesson: 9,
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "ex-smoker",
    meaning: "سیگاری سابق",
    lesson: 9,
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "ex-boss",
    meaning: "رئیس سابق",
    lesson: 9,
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "extract",
    meaning: "استخراج کردن، عصاره",
    lesson: 9,
    pos: "v.",
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "exhale",
    meaning: "بازدم کردن",
    lesson: 9,
    pos: "v.",
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "excommunicate",
    meaning: "محو کردن از جامعه، تکفیر کردن",
    lesson: 9,
    pos: "v.",
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "micro-cassette",
    meaning: "ریزمغناطیس، میکروکاست",
    lesson: 9,
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "microwave",
    meaning: "مایکروویو",
    lesson: 9,
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "microscopic",
    meaning: "میکروسکوپی، بسیار ریز",
    lesson: 9,
    pos: "adj.",
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "misunderstand",
    meaning: "سوءتفاهم کردن، اشتباه فهمیدن",
    lesson: 9,
    pos: "v.",
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "mistranslate",
    meaning: "بد ترجمه کردن",
    lesson: 9,
    pos: "v.",
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "misinform",
    meaning: "اطلاعات غلط دادن",
    lesson: 9,
    pos: "v.",
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "monotonous",
    meaning: "یکنواخت",
    lesson: 9,
    pos: "adj.",
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "monologue",
    meaning: "تک‌گویی",
    lesson: 9,
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "monogamous",
    meaning: "تک‌همسری",
    lesson: 9,
    pos: "adj.",
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "multi-national",
    meaning: "چندملیتی",
    lesson: 9,
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "multi-purpose",
    meaning: "چندمنظوره",
    lesson: 9,
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "multi-media",
    meaning: "چندرسانه‌ای",
    lesson: 9,
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "overdo",
    meaning: "زیاده‌روی کردن",
    lesson: 9,
    pos: "v.",
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "overtired",
    meaning: "بیش از حد خسته",
    lesson: 9,
    pos: "adj.",
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "oversleep",
    meaning: "از خواب‌ماندن",
    lesson: 9,
    pos: "v.",
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "overeat",
    meaning: "پرخوری کردن",
    lesson: 9,
    pos: "v.",
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "postwar",
    meaning: "بعد از جنگ",
    lesson: 9,
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "postgraduate",
    meaning: "تحصیلات تکمیلی",
    lesson: 9,
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "post-impressionist",
    meaning: "پسادربیمی‌گرا",
    lesson: 9,
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "preconceived",
    meaning: "از پیش تصورشده",
    lesson: 9,
    pos: "adj.",
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "pre-war",
    meaning: "قبل از جنگ",
    lesson: 9,
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "pre-judge",
    meaning: "از پیش قضاوت کردن",
    lesson: 9,
    pos: "v.",
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "pro-government",
    meaning: "موافق دولت",
    lesson: 9,
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "pro-revolutionary",
    meaning: "موافق انقلاب",
    lesson: 9,
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "pseudo-scientific",
    meaning: "شبه‌علمی",
    lesson: 9,
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "pseudo-intellectual",
    meaning: "شبه‌روشنفکر",
    lesson: 9,
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "retype",
    meaning: "دوباره تایپ کردن",
    lesson: 9,
    pos: "v.",
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "reread",
    meaning: "دوباره خواندن",
    lesson: 9,
    pos: "v.",
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "replace",
    meaning: "جایگزین کردن",
    lesson: 9,
    pos: "v.",
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "rewind",
    meaning: "عقب‌گرداندن (نوار)",
    lesson: 9,
    pos: "v.",
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "semicircular",
    meaning: "نیم‌دایره‌ای",
    lesson: 9,
    pos: "adj.",
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "semi-final",
    meaning: "نیمه‌نهایی",
    lesson: 9,
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "semi-detached",
    meaning: "نیمه‌مجزا (خانه چسبیده)",
    lesson: 9,
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "subway",
    meaning: "مترو (آمریکا)",
    lesson: 9,
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "submarine",
    meaning: "زیردریایی",
    lesson: 9,
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "subdivision",
    meaning: "زیرشاخه، تقسیم‌بندی فرعی",
    lesson: 9,
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "underworked",
    meaning: "کم‌کار",
    lesson: 9,
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "underused",
    meaning: "کم‌استفاده",
    lesson: 9,
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "undercooked",
    meaning: "کم‌پخته",
    lesson: 9,
    pos: "adj.",
    lessonLabel: "درس 9 — پیشوندها"
  },
  {
    word: "SPECT",
    meaning: "ریشه لاتین به معنای دیدن، نگاه کردن",
    lesson: 10,
    lessonLabel: "درس 10 — ریشه‌ها"
  },
  {
    word: "respect",
    meaning: "احترام گذاشتن",
    lesson: 10,
    pos: "v.",
    lessonLabel: "درس 10 — ریشه‌ها"
  },
  {
    word: "suspect",
    meaning: "ظن بردن، مشکوک بودن",
    lesson: 10,
    pos: "v.",
    lessonLabel: "درس 10 — ریشه‌ها"
  },
  {
    word: "prospect",
    meaning: "جست‌وجو کردن (برای طلا)",
    lesson: 10,
    pos: "v.",
    lessonLabel: "درس 10 — ریشه‌ها"
  },
  {
    word: "VERT",
    meaning: "ریشه لاتین به معنای چرخیدن",
    lesson: 10,
    lessonLabel: "درس 10 — ریشه‌ها"
  },
  {
    word: "revert",
    meaning: "بازگشتن",
    lesson: 10,
    pos: "v.",
    lessonLabel: "درس 10 — ریشه‌ها"
  },
  {
    word: "convert",
    meaning: "تغییر مذهب دادن، تغییر دادن",
    lesson: 10,
    pos: "v.",
    lessonLabel: "درس 10 — ریشه‌ها"
  },
  {
    word: "divert",
    meaning: "منحرف کردن",
    lesson: 10,
    pos: "v.",
    lessonLabel: "درس 10 — ریشه‌ها"
  },
  {
    word: "PORT",
    meaning: "ریشه لاتین به معنای حمل کردن، بردن",
    lesson: 10,
    lessonLabel: "درس 10 — ریشه‌ها"
  },
  {
    word: "transport",
    meaning: "حمل کردن",
    lesson: 10,
    pos: "v.",
    lessonLabel: "درس 10 — ریشه‌ها"
  },
  {
    word: "import",
    meaning: "وارد کردن",
    lesson: 10,
    pos: "v.",
    lessonLabel: "درس 10 — ریشه‌ها"
  },
  {
    word: "export",
    meaning: "صادر کردن",
    lesson: 10,
    pos: "v.",
    lessonLabel: "درس 10 — ریشه‌ها"
  },
  {
    word: "support",
    meaning: "حمایت کردن",
    lesson: 10,
    pos: "v.",
    lessonLabel: "درس 10 — ریشه‌ها"
  },
  {
    word: "DUC, DUCT",
    meaning: "ریشه لاتین به معنای رهبری کردن",
    lesson: 10,
    lessonLabel: "درس 10 — ریشه‌ها"
  },
  {
    word: "educate",
    meaning: "تحصیل کردن، آموزش دادن",
    lesson: 10,
    pos: "v.",
    lessonLabel: "درس 10 — ریشه‌ها"
  },
  {
    word: "conduct",
    meaning: "رهبری کردن (ارکستر)",
    lesson: 10,
    pos: "v.",
    lessonLabel: "درس 10 — ریشه‌ها"
  },
  {
    word: "produce",
    meaning: "تولید کردن",
    lesson: 10,
    pos: "v.",
    lessonLabel: "درس 10 — ریشه‌ها"
  },
  {
    word: "PRESS",
    meaning: "ریشه لاتین به معنای فشار دادن",
    lesson: 10,
    lessonLabel: "درس 10 — ریشه‌ها"
  },
  {
    word: "impress",
    meaning: "تحت‌تأثیر قرار دادن",
    lesson: 10,
    pos: "v.",
    lessonLabel: "درس 10 — ریشه‌ها"
  },
  {
    word: "depress",
    meaning: "افسرده کردن",
    lesson: 10,
    pos: "v.",
    lessonLabel: "درس 10 — ریشه‌ها"
  },
  {
    word: "express",
    meaning: "ابراز کردن",
    lesson: 10,
    pos: "v.",
    lessonLabel: "درس 10 — ریشه‌ها"
  },
  {
    word: "POSE, PONE",
    meaning: "ریشه لاتین به معنای گذاشتن، قرار دادن",
    lesson: 10,
    lessonLabel: "درس 10 — ریشه‌ها"
  },
  {
    word: "postpone",
    meaning: "به تعویق انداختن",
    lesson: 10,
    pos: "v.",
    lessonLabel: "درس 10 — ریشه‌ها"
  },
  {
    word: "depose",
    meaning: "از سلطنت برکنار کردن",
    lesson: 10,
    pos: "v.",
    lessonLabel: "درس 10 — ریشه‌ها"
  },
  {
    word: "impose",
    meaning: "تحمیل کردن",
    lesson: 10,
    pos: "v.",
    lessonLabel: "درس 10 — ریشه‌ها"
  },
  {
    word: "inspect",
    meaning: "بازرسی کردن",
    lesson: 10,
    pos: "v.",
    lessonLabel: "درس 10 — ریشه‌ها"
  },
  {
    word: "inspector",
    meaning: "بازرس",
    lesson: 10,
    pos: "n.",
    lessonLabel: "درس 10 — ریشه‌ها"
  },
  {
    word: "inspecting",
    meaning: "در حال بازرسی",
    lesson: 10,
    pos: "adj.",
    lessonLabel: "درس 10 — ریشه‌ها"
  },
  {
    word: "inspection",
    meaning: "بازرسی",
    lesson: 10,
    pos: "n.",
    lessonLabel: "درس 10 — ریشه‌ها"
  },
  {
    word: "advertise",
    meaning: "تبلیغ کردن",
    lesson: 10,
    pos: "v.",
    lessonLabel: "درس 10 — ریشه‌ها"
  },
  {
    word: "advertiser",
    meaning: "تبلیغ‌کننده",
    lesson: 10,
    pos: "n.",
    lessonLabel: "درس 10 — ریشه‌ها"
  },
  {
    word: "advertising",
    meaning: "تبلیغات",
    lesson: 10,
    pos: "n.",
    lessonLabel: "درس 10 — ریشه‌ها"
  },
  {
    word: "advertisement",
    meaning: "آگهی",
    lesson: 10,
    pos: "n.",
    lessonLabel: "درس 10 — ریشه‌ها"
  },
  {
    word: "deport",
    meaning: "اخراج کردن (از کشور)",
    lesson: 10,
    pos: "v.",
    lessonLabel: "درس 10 — ریشه‌ها"
  },
  {
    word: "deportee",
    meaning: "اخراج‌شده",
    lesson: 10,
    pos: "n.",
    lessonLabel: "درس 10 — ریشه‌ها"
  },
  {
    word: "deported",
    meaning: "اخراج‌شده",
    lesson: 10,
    pos: "adj.",
    lessonLabel: "درس 10 — ریشه‌ها"
  },
  {
    word: "deportation",
    meaning: "اخراج",
    lesson: 10,
    pos: "n.",
    lessonLabel: "درس 10 — ریشه‌ها"
  },
  {
    word: "introduce",
    meaning: "معرفی کردن",
    lesson: 10,
    pos: "v.",
    lessonLabel: "درس 10 — ریشه‌ها"
  },
  {
    word: "introducer",
    meaning: "معرفی‌کننده",
    lesson: 10,
    pos: "n.",
    lessonLabel: "درس 10 — ریشه‌ها"
  },
  {
    word: "introductory",
    meaning: "مقدماتی",
    lesson: 10,
    pos: "adj.",
    lessonLabel: "درس 10 — ریشه‌ها"
  },
  {
    word: "introduction",
    meaning: "معرفی",
    lesson: 10,
    pos: "n.",
    lessonLabel: "درس 10 — ریشه‌ها"
  },
  {
    word: "oppress",
    meaning: "ستم کردن",
    lesson: 10,
    pos: "v.",
    lessonLabel: "درس 10 — ریشه‌ها"
  },
  {
    word: "oppressor",
    meaning: "ستمگر",
    lesson: 10,
    pos: "n.",
    lessonLabel: "درس 10 — ریشه‌ها"
  },
  {
    word: "oppressive",
    meaning: "ستمگرانه",
    lesson: 10,
    pos: "adj.",
    lessonLabel: "درس 10 — ریشه‌ها"
  },
  {
    word: "oppression",
    meaning: "ستم",
    lesson: 10,
    pos: "n.",
    lessonLabel: "درس 10 — ریشه‌ها"
  },
  {
    word: "compose",
    meaning: "آهنگ ساختن",
    lesson: 10,
    pos: "v.",
    lessonLabel: "درس 10 — ریشه‌ها"
  },
  {
    word: "composer",
    meaning: "آهنگساز",
    lesson: 10,
    pos: "n.",
    lessonLabel: "درس 10 — ریشه‌ها"
  },
  {
    word: "composite",
    meaning: "ترکیبی",
    lesson: 10,
    pos: "adj.",
    lessonLabel: "درس 10 — ریشه‌ها"
  },
  {
    word: "composition",
    meaning: "ساختن، اثر",
    lesson: 10,
    pos: "n.",
    lessonLabel: "درس 10 — ریشه‌ها"
  },
  {
    word: "happiness",
    meaning: "شادی",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "intention",
    meaning: "نیت، قصد",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "shock",
    meaning: "شوک، ضربه روحی",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "achievement",
    meaning: "دستاورد",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "action",
    meaning: "عمل، اقدام",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "aggressiveness",
    meaning: "تهاجمی بودن",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "absurdity",
    meaning: "پوچی، بی‌معنایی",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "adjustment",
    meaning: "تنظیم، وفق دادن",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "collection",
    meaning: "مجموعه، کلکسیون",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "attractiveness",
    meaning: "جاذبه، جذابیت",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "anonymity",
    meaning: "گمنامی",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "amazement",
    meaning: "حیرت",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "combination",
    meaning: "ترکیب",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "bitterness",
    meaning: "تلخی",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "complexity",
    meaning: "پیچیدگی",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "discouragement",
    meaning: "ناامیدی، دلسردی",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "illusion",
    meaning: "توهم",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "carelessness",
    meaning: "بی‌دقتی",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "curiosity",
    meaning: "کنجکاوی",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "improvement",
    meaning: "بهبود",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "imagination",
    meaning: "تخیل",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "consciousness",
    meaning: "آگاهی، هشیاری",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "generosity",
    meaning: "سخاوت",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "investment",
    meaning: "سرمایه‌گذاری",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "production",
    meaning: "تولید",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "friendliness",
    meaning: "دوستانه بودن",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "hostility",
    meaning: "دشمنی",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "replacement",
    meaning: "جایگزینی",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "recognition",
    meaning: "شناسایی، قدردانی",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "tenderness",
    meaning: "نرمی، مهربانی",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "prosperity",
    meaning: "رفاه، خوشبختی",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "retirement",
    meaning: "بازنشستگی",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "reduction",
    meaning: "کاهش",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "ugliness",
    meaning: "زشتی",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "sensitivity",
    meaning: "حساسیت",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "apprenticeship",
    meaning: "دوران شاگردی",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "boredom",
    meaning: "کسالت",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "breadth",
    meaning: "پهنا",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "adulthood",
    meaning: "بزرگسالی",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "companionship",
    meaning: "همراهی، مصاحبت",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "freedom",
    meaning: "آزادی",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "depth",
    meaning: "عمق",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "brotherhood",
    meaning: "برادری",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "membership",
    meaning: "عضویت",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "kingdom",
    meaning: "پادشاهی",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "length",
    meaning: "طول",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "childhood",
    meaning: "کودکی",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "ownership",
    meaning: "مالکیت",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "martyrdom",
    meaning: "شهادت",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "strength",
    meaning: "قدرت",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "motherhood",
    meaning: "مادری",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "partnership",
    meaning: "شراکت",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "stardom",
    meaning: "ستاره شدن، شهرت",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "warmth",
    meaning: "گرما، صمیمیت",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "neighbourhood",
    meaning: "محله",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "relationship",
    meaning: "رابطه",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "wisdom",
    meaning: "حکمت، خرد",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "width",
    meaning: "عرض",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "(wo)manhood",
    meaning: "مردانگی/زنانگی",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "anger",
    meaning: "خشم",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "belief",
    meaning: "باور",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "calm",
    meaning: "آرامش",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "chance",
    meaning: "شانس",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "faith",
    meaning: "ایمان",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "fear",
    meaning: "ترس",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "humour",
    meaning: "شوخ‌طبعی",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "idea",
    meaning: "ایده",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "luck",
    meaning: "شانس، بخت",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "principle",
    meaning: "اصل",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "rage",
    meaning: "غضب",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "reason",
    meaning: "دلیل، عقل",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "sense",
    meaning: "حس",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "sight",
    meaning: "بینایی",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "speed",
    meaning: "سرعت",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "thought",
    meaning: "فکر",
    lesson: 11,
    pos: "n.",
    lessonLabel: "درس 11 — اسم‌های انتزاعی"
  },
  {
    word: "well-dressed",
    meaning: "خوش‌پوش",
    lesson: 12,
    pos: "adj.",
    lessonLabel: "درس 12 — صفت‌های مرکب"
  },
  {
    word: "never-ending",
    meaning: "بی‌پایان",
    lesson: 12,
    pos: "adj.",
    lessonLabel: "درس 12 — صفت‌های مرکب"
  },
  {
    word: "shocking-pink",
    meaning: "صورتی تند و زننده",
    lesson: 12,
    pos: "adj.",
    lessonLabel: "درس 12 — صفت‌های مرکب"
  },
  {
    word: "far-fetched",
    meaning: "دور از ذهن، غیرواقعی",
    lesson: 12,
    pos: "adj.",
    lessonLabel: "درس 12 — صفت‌های مرکب"
  },
  {
    word: "curly-haired",
    meaning: "موج‌دار (موهای فرفری)",
    lesson: 12,
    pos: "adj.",
    lessonLabel: "درس 12 — صفت‌های مرکب"
  },
  {
    word: "sun-tanned",
    meaning: "برنزه",
    lesson: 12,
    pos: "adj.",
    lessonLabel: "درس 12 — صفت‌های مرکب"
  },
  {
    word: "blue-eyed",
    meaning: "آبی‌چشم",
    lesson: 12,
    pos: "adj.",
    lessonLabel: "درس 12 — صفت‌های مرکب"
  },
  {
    word: "rosy-cheeked",
    meaning: "گلودار (گونه‌های گلگون)",
    lesson: 12,
    pos: "adj.",
    lessonLabel: "درس 12 — صفت‌های مرکب"
  },
  {
    word: "thin-lipped",
    meaning: "لب‌باریک",
    lesson: 12,
    pos: "adj.",
    lessonLabel: "درس 12 — صفت‌های مرکب"
  },
  {
    word: "broad-shouldered",
    meaning: "شانه‌پهن",
    lesson: 12,
    pos: "adj.",
    lessonLabel: "درس 12 — صفت‌های مرکب"
  },
  {
    word: "left-handed",
    meaning: "چپ‌دست",
    lesson: 12,
    pos: "adj.",
    lessonLabel: "درس 12 — صفت‌های مرکب"
  },
  {
    word: "slim-hipped",
    meaning: "باسن باریک",
    lesson: 12,
    pos: "adj.",
    lessonLabel: "درس 12 — صفت‌های مرکب"
  },
  {
    word: "long-legged",
    meaning: "پاقلمه (پابلند)",
    lesson: 12,
    pos: "adj.",
    lessonLabel: "درس 12 — صفت‌های مرکب"
  },
  {
    word: "flat-footed",
    meaning: "کف‌پای صاف",
    lesson: 12,
    pos: "adj.",
    lessonLabel: "درس 12 — صفت‌های مرکب"
  },
  {
    word: "open-necked",
    meaning: "یقه‌باز",
    lesson: 12,
    pos: "adj.",
    lessonLabel: "درس 12 — صفت‌های مرکب"
  },
  {
    word: "brand-new",
    meaning: "برند و نو",
    lesson: 12,
    pos: "adj.",
    lessonLabel: "درس 12 — صفت‌های مرکب"
  },
  {
    word: "tight-fitting",
    meaning: "تنگ و چسبان",
    lesson: 12,
    pos: "adj.",
    lessonLabel: "درس 12 — صفت‌های مرکب"
  },
  {
    word: "open-toed",
    meaning: "پنجه‌باز (دم‌پایی)",
    lesson: 12,
    pos: "adj.",
    lessonLabel: "درس 12 — صفت‌های مرکب"
  },
  {
    word: "absent-minded",
    meaning: "حواس‌پرت",
    lesson: 12,
    pos: "adj.",
    lessonLabel: "درس 12 — صفت‌های مرکب"
  },
  {
    word: "easy-going",
    meaning: "راحت و بی‌تکلف",
    lesson: 12,
    pos: "adj.",
    lessonLabel: "درس 12 — صفت‌های مرکب"
  },
  {
    word: "good-tempered",
    meaning: "خوش‌اخلاق",
    lesson: 12,
    pos: "adj.",
    lessonLabel: "درس 12 — صفت‌های مرکب"
  },
  {
    word: "warm-hearted",
    meaning: "خوش‌قلب، مهربان",
    lesson: 12,
    pos: "adj.",
    lessonLabel: "درس 12 — صفت‌های مرکب"
  },
  {
    word: "quick-witted",
    meaning: "باهوش، تیزفهم",
    lesson: 12,
    pos: "adj.",
    lessonLabel: "درس 12 — صفت‌های مرکب"
  },
  {
    word: "big-headed",
    meaning: "مغرور، لفت‌باز",
    lesson: 12,
    pos: "adj.",
    lessonLabel: "درس 12 — صفت‌های مرکب"
  },
  {
    word: "two-faced",
    meaning: "دورو",
    lesson: 12,
    pos: "adj.",
    lessonLabel: "درس 12 — صفت‌های مرکب"
  },
  {
    word: "self-centred",
    meaning: "خودمحور",
    lesson: 12,
    pos: "adj.",
    lessonLabel: "درس 12 — صفت‌های مرکب"
  },
  {
    word: "stuck-up",
    meaning: "مغرور و متکبر (محاوره‌ای)",
    lesson: 12,
    pos: "adj.",
    lessonLabel: "درس 12 — صفت‌های مرکب"
  },
  {
    word: "all-out",
    meaning: "تمام‌عیار، کامل",
    lesson: 12,
    pos: "adj.",
    lessonLabel: "درس 12 — صفت‌های مرکب"
  },
  {
    word: "built-up",
    meaning: "ساخته‌شده (پر از ساختمان)",
    lesson: 12,
    pos: "adj.",
    lessonLabel: "درس 12 — صفت‌های مرکب"
  },
  {
    word: "well-off",
    meaning: "مرفه، ثروتمند",
    lesson: 12,
    pos: "adj.",
    lessonLabel: "درس 12 — صفت‌های مرکب"
  },
  {
    word: "hard-up",
    meaning: "تنگ‌دست",
    lesson: 12,
    pos: "adj.",
    lessonLabel: "درس 12 — صفت‌های مرکب"
  },
  {
    word: "worn-out",
    meaning: "فرسوده، کهنه",
    lesson: 12,
    pos: "adj.",
    lessonLabel: "درس 12 — صفت‌های مرکب"
  },
  {
    word: "run-down",
    meaning: "افتاده و خراب‌حال",
    lesson: 12,
    pos: "adj.",
    lessonLabel: "درس 12 — صفت‌های مرکب"
  },
  {
    word: "air-conditioned",
    meaning: "دارای تهویه مطبوع",
    lesson: 12,
    pos: "adj.",
    lessonLabel: "درس 12 — صفت‌های مرکب"
  },
  {
    word: "bullet-proof",
    meaning: "گلوله‌خش‌گیر",
    lesson: 12,
    pos: "adj.",
    lessonLabel: "درس 12 — صفت‌های مرکب"
  },
  {
    word: "cut-price",
    meaning: "با قیمت کاهش‌یافته",
    lesson: 12,
    pos: "adj.",
    lessonLabel: "درس 12 — صفت‌های مرکب"
  },
  {
    word: "duty-free",
    meaning: "معاف از عوارض",
    lesson: 12,
    pos: "adj.",
    lessonLabel: "درس 12 — صفت‌های مرکب"
  },
  {
    word: "hand-made",
    meaning: "دست‌ساز",
    lesson: 12,
    pos: "adj.",
    lessonLabel: "درس 12 — صفت‌های مرکب"
  },
  {
    word: "interest-free",
    meaning: "بدون بهره",
    lesson: 12,
    pos: "adj.",
    lessonLabel: "درس 12 — صفت‌های مرکب"
  },
  {
    word: "last-minute",
    meaning: "لحظه آخری",
    lesson: 12,
    pos: "adj.",
    lessonLabel: "درس 12 — صفت‌های مرکب"
  },
  {
    word: "long-distance",
    meaning: "مسافت طولانی",
    lesson: 12,
    pos: "adj.",
    lessonLabel: "درس 12 — صفت‌های مرکب"
  },
  {
    word: "long-standing",
    meaning: "دیرینه، طولانی‌مدت",
    lesson: 12,
    pos: "adj.",
    lessonLabel: "درس 12 — صفت‌های مرکب"
  },
  {
    word: "off-peak",
    meaning: "خارج از ساعت اوج",
    lesson: 12,
    pos: "adj.",
    lessonLabel: "درس 12 — صفت‌های مرکب"
  },
  {
    word: "part-time",
    meaning: "پاره‌وقت",
    lesson: 12,
    pos: "adj.",
    lessonLabel: "درس 12 — صفت‌های مرکب"
  },
  {
    word: "remote-controlled",
    meaning: "کنترل از راه دور",
    lesson: 12,
    pos: "adj.",
    lessonLabel: "درس 12 — صفت‌های مرکب"
  },
  {
    word: "second-class",
    meaning: "درجه دو",
    lesson: 12,
    pos: "adj.",
    lessonLabel: "درس 12 — صفت‌های مرکب"
  },
  {
    word: "so-called",
    meaning: "مدعی، به اصطلاح",
    lesson: 12,
    pos: "adj.",
    lessonLabel: "درس 12 — صفت‌های مرکب"
  },
  {
    word: "sugar-free",
    meaning: "بدون شکر",
    lesson: 12,
    pos: "adj.",
    lessonLabel: "درس 12 — صفت‌های مرکب"
  },
  {
    word: "time-consuming",
    meaning: "وقت‌گیر",
    lesson: 12,
    pos: "adj.",
    lessonLabel: "درس 12 — صفت‌های مرکب"
  },
  {
    word: "top-secret",
    meaning: "فوق‌سری",
    lesson: 12,
    pos: "adj.",
    lessonLabel: "درس 12 — صفت‌های مرکب"
  },
  {
    word: "world-famous",
    meaning: "مشهور جهانی",
    lesson: 12,
    pos: "adj.",
    lessonLabel: "درس 12 — صفت‌های مرکب"
  },
  {
    word: "long-haired",
    meaning: "موبلند",
    lesson: 12,
    pos: "adj.",
    lessonLabel: "درس 12 — صفت‌های مرکب"
  },
  {
    word: "red-haired",
    meaning: "موی قرمز",
    lesson: 12,
    pos: "adj.",
    lessonLabel: "درس 12 — صفت‌های مرکب"
  },
  {
    word: "straight-haired",
    meaning: "موی صاف",
    lesson: 12,
    pos: "adj.",
    lessonLabel: "درس 12 — صفت‌های مرکب"
  },
  {
    word: "first-hand",
    meaning: "مستقیم، دست اول",
    lesson: 12,
    pos: "adj.",
    lessonLabel: "درس 12 — صفت‌های مرکب"
  },
  {
    word: "first-class",
    meaning: "درجه یک",
    lesson: 12,
    pos: "adj.",
    lessonLabel: "درس 12 — صفت‌های مرکب"
  },
  {
    word: "first-born",
    meaning: "نخزاده، نخستین‌فرزند",
    lesson: 12,
    pos: "adj.",
    lessonLabel: "درس 12 — صفت‌های مرکب"
  },
  {
    word: "second-hand",
    meaning: "دست دوم",
    lesson: 12,
    pos: "adj.",
    lessonLabel: "درس 12 — صفت‌های مرکب"
  },
  {
    word: "address book",
    meaning: "دفترچه آدرس",
    lesson: 13,
    pos: "n.",
    lessonLabel: "درس 13 — اسم‌های مرکب (۱): اسم + اسم"
  },
  {
    word: "human being",
    meaning: "انسان",
    lesson: 13,
    pos: "n.",
    lessonLabel: "درس 13 — اسم‌های مرکب (۱): اسم + اسم"
  },
  {
    word: "science fiction",
    meaning: "علمی-تخیلی",
    lesson: 13,
    pos: "n.",
    lessonLabel: "درس 13 — اسم‌های مرکب (۱): اسم + اسم"
  },
  {
    word: "tin opener",
    meaning: "بازکن قوطی",
    lesson: 13,
    pos: "n.",
    lessonLabel: "درس 13 — اسم‌های مرکب (۱): اسم + اسم"
  },
  {
    word: "bank account",
    meaning: "حساب بانکی",
    lesson: 13,
    pos: "n.",
    lessonLabel: "درس 13 — اسم‌های مرکب (۱): اسم + اسم"
  },
  {
    word: "pedestrian crossing",
    meaning: "خط عابر پیاده",
    lesson: 13,
    pos: "n.",
    lessonLabel: "درس 13 — اسم‌های مرکب (۱): اسم + اسم"
  },
  {
    word: "pen-name",
    meaning: "نام مستعار نویسنده",
    lesson: 13,
    pos: "n.",
    lessonLabel: "درس 13 — اسم‌های مرکب (۱): اسم + اسم"
  },
  {
    word: "baby-sitter",
    meaning: "پرستار بچه",
    lesson: 13,
    pos: "n.",
    lessonLabel: "درس 13 — اسم‌های مرکب (۱): اسم + اسم"
  },
  {
    word: "earring",
    meaning: "گوشواره",
    lesson: 13,
    pos: "n.",
    lessonLabel: "درس 13 — اسم‌های مرکب (۱): اسم + اسم"
  },
  {
    word: "trademark",
    meaning: "نشان تجاری",
    lesson: 13,
    pos: "n.",
    lessonLabel: "درس 13 — اسم‌های مرکب (۱): اسم + اسم"
  },
  {
    word: "alarm clock",
    meaning: "ساعت زنگ‌دار",
    lesson: 13,
    pos: "n.",
    lessonLabel: "درس 13 — اسم‌های مرکب (۱): اسم + اسم"
  },
  {
    word: "answering machine",
    meaning: "پاسخگوی تلفنی",
    lesson: 13,
    pos: "n.",
    lessonLabel: "درس 13 — اسم‌های مرکب (۱): اسم + اسم"
  },
  {
    word: "blood donor",
    meaning: "اهداکننده خون",
    lesson: 13,
    pos: "n.",
    lessonLabel: "درس 13 — اسم‌های مرکب (۱): اسم + اسم"
  },
  {
    word: "book token",
    meaning: "کوپن خرید کتاب",
    lesson: 13,
    pos: "n.",
    lessonLabel: "درس 13 — اسم‌های مرکب (۱): اسم + اسم"
  },
  {
    word: "burglar alarm",
    meaning: "دزدگیر",
    lesson: 13,
    pos: "n.",
    lessonLabel: "درس 13 — اسم‌های مرکب (۱): اسم + اسم"
  },
  {
    word: "bus stop",
    meaning: "ایستگاه اتوبوس",
    lesson: 13,
    pos: "n.",
    lessonLabel: "درس 13 — اسم‌های مرکب (۱): اسم + اسم"
  },
  {
    word: "contact lens",
    meaning: "عدسی تماسی",
    lesson: 13,
    pos: "n.",
    lessonLabel: "درس 13 — اسم‌های مرکب (۱): اسم + اسم"
  },
  {
    word: "credit card",
    meaning: "کارت اعتباری",
    lesson: 13,
    pos: "n.",
    lessonLabel: "درس 13 — اسم‌های مرکب (۱): اسم + اسم"
  },
  {
    word: "heart attack",
    meaning: "سکته قلبی",
    lesson: 13,
    pos: "n.",
    lessonLabel: "درس 13 — اسم‌های مرکب (۱): اسم + اسم"
  },
  {
    word: "package holiday",
    meaning: "تور مسافرتی همه‌چیزهمراه",
    lesson: 13,
    pos: "n.",
    lessonLabel: "درس 13 — اسم‌های مرکب (۱): اسم + اسم"
  },
  {
    word: "steering wheel",
    meaning: "فرمان خودرو",
    lesson: 13,
    pos: "n.",
    lessonLabel: "درس 13 — اسم‌های مرکب (۱): اسم + اسم"
  },
  {
    word: "shoe horn",
    meaning: "قیف کفش",
    lesson: 13,
    pos: "n.",
    lessonLabel: "درس 13 — اسم‌های مرکب (۱): اسم + اسم"
  },
  {
    word: "tea-bag",
    meaning: "کیسه چای",
    lesson: 13,
    pos: "n.",
    lessonLabel: "درس 13 — اسم‌های مرکب (۱): اسم + اسم"
  },
  {
    word: "windscreen",
    meaning: "شیشه جلوی خودرو",
    lesson: 13,
    pos: "n.",
    lessonLabel: "درس 13 — اسم‌های مرکب (۱): اسم + اسم"
  },
  {
    word: "windscreen wiper",
    meaning: "برف‌پاک‌کن",
    lesson: 13,
    pos: "n.",
    lessonLabel: "درس 13 — اسم‌های مرکب (۱): اسم + اسم"
  },
  {
    word: "youth hostel",
    meaning: "هتل جوانان (جوان‌پرور)",
    lesson: 13,
    pos: "n.",
    lessonLabel: "درس 13 — اسم‌های مرکب (۱): اسم + اسم"
  },
  {
    word: "air-traffic control",
    meaning: "کنترل ترافیک هوایی",
    lesson: 13,
    pos: "n.",
    lessonLabel: "درس 13 — اسم‌های مرکب (۱): اسم + اسم"
  },
  {
    word: "birth control",
    meaning: "کنترل تولد",
    lesson: 13,
    pos: "n.",
    lessonLabel: "درس 13 — اسم‌های مرکب (۱): اسم + اسم"
  },
  {
    word: "blood pressure",
    meaning: "فشار خون",
    lesson: 13,
    pos: "n.",
    lessonLabel: "درس 13 — اسم‌های مرکب (۱): اسم + اسم"
  },
  {
    word: "computer technology",
    meaning: "فناوری رایانه",
    lesson: 13,
    pos: "n.",
    lessonLabel: "درس 13 — اسم‌های مرکب (۱): اسم + اسم"
  },
  {
    word: "cotton wool",
    meaning: "پنبه",
    lesson: 13,
    pos: "n.",
    lessonLabel: "درس 13 — اسم‌های مرکب (۱): اسم + اسم"
  },
  {
    word: "data-processing",
    meaning: "پردازش داده",
    lesson: 13,
    pos: "n.",
    lessonLabel: "درس 13 — اسم‌های مرکب (۱): اسم + اسم"
  },
  {
    word: "food poisoning",
    meaning: "مسومیت غذایی",
    lesson: 13,
    pos: "n.",
    lessonLabel: "درس 13 — اسم‌های مرکب (۱): اسم + اسم"
  },
  {
    word: "hay fever",
    meaning: "تب یونجه (حساسیت به گرده)",
    lesson: 13,
    pos: "n.",
    lessonLabel: "درس 13 — اسم‌های مرکب (۱): اسم + اسم"
  },
  {
    word: "income tax",
    meaning: "مالیات بر درآمد",
    lesson: 13,
    pos: "n.",
    lessonLabel: "درس 13 — اسم‌های مرکب (۱): اسم + اسم"
  },
  {
    word: "junk food",
    meaning: "غذای بی‌ارزش (فست‌فود)",
    lesson: 13,
    pos: "n.",
    lessonLabel: "درس 13 — اسم‌های مرکب (۱): اسم + اسم"
  },
  {
    word: "mail order",
    meaning: "خرید پستی",
    lesson: 13,
    pos: "n.",
    lessonLabel: "درس 13 — اسم‌های مرکب (۱): اسم + اسم"
  },
  {
    word: "pocket money",
    meaning: "پول توجیبی",
    lesson: 13,
    pos: "n.",
    lessonLabel: "درس 13 — اسم‌های مرکب (۱): اسم + اسم"
  },
  {
    word: "arms race",
    meaning: "مسابقه تسلیحاتی",
    lesson: 13,
    pos: "n.",
    lessonLabel: "درس 13 — اسم‌های مرکب (۱): اسم + اسم"
  },
  {
    word: "brain drain",
    meaning: "فرار مغزها",
    lesson: 13,
    pos: "n.",
    lessonLabel: "درس 13 — اسم‌های مرکب (۱): اسم + اسم"
  },
  {
    word: "death penalty",
    meaning: "حکم اعدام",
    lesson: 13,
    pos: "n.",
    lessonLabel: "درس 13 — اسم‌های مرکب (۱): اسم + اسم"
  },
  {
    word: "generation gap",
    meaning: "شکاف نسلی",
    lesson: 13,
    pos: "n.",
    lessonLabel: "درس 13 — اسم‌های مرکب (۱): اسم + اسم"
  },
  {
    word: "global warming",
    meaning: "گرمایش جهانی",
    lesson: 13,
    pos: "n.",
    lessonLabel: "درس 13 — اسم‌های مرکب (۱): اسم + اسم"
  },
  {
    word: "greenhouse effect",
    meaning: "اثر گلخانه‌ای",
    lesson: 13,
    pos: "n.",
    lessonLabel: "درس 13 — اسم‌های مرکب (۱): اسم + اسم"
  },
  {
    word: "labour force",
    meaning: "نیروی کار",
    lesson: 13,
    pos: "n.",
    lessonLabel: "درس 13 — اسم‌های مرکب (۱): اسم + اسم"
  },
  {
    word: "mother-tongue",
    meaning: "زبان مادری",
    lesson: 13,
    pos: "n.",
    lessonLabel: "درس 13 — اسم‌های مرکب (۱): اسم + اسم"
  },
  {
    word: "sound barrier",
    meaning: "دیوار صوتی",
    lesson: 13,
    pos: "n.",
    lessonLabel: "درس 13 — اسم‌های مرکب (۱): اسم + اسم"
  },
  {
    word: "welfare state",
    meaning: "دولت رفاه",
    lesson: 13,
    pos: "n.",
    lessonLabel: "درس 13 — اسم‌های مرکب (۱): اسم + اسم"
  },
  {
    word: "grass roots",
    meaning: "قشر پایین جامعه / ریشه‌های مردمی",
    lesson: 13,
    pos: "n.",
    lessonLabel: "درس 13 — اسم‌های مرکب (۱): اسم + اسم"
  },
  {
    word: "human rights",
    meaning: "حقوق بشر",
    lesson: 13,
    pos: "n.",
    lessonLabel: "درس 13 — اسم‌های مرکب (۱): اسم + اسم"
  },
  {
    word: "kitchen scissors",
    meaning: "قیچی آشپزخانه",
    lesson: 13,
    pos: "n.",
    lessonLabel: "درس 13 — اسم‌های مرکب (۱): اسم + اسم"
  },
  {
    word: "luxury goods",
    meaning: "کالاهای لوکس",
    lesson: 13,
    pos: "n.",
    lessonLabel: "درس 13 — اسم‌های مرکب (۱): اسم + اسم"
  },
  {
    word: "race relations",
    meaning: "روابط نژادی",
    lesson: 13,
    pos: "n.",
    lessonLabel: "درس 13 — اسم‌های مرکب (۱): اسم + اسم"
  },
  {
    word: "roadworks",
    meaning: "عملیات جاده‌ای (تعمیر جاده)",
    lesson: 13,
    pos: "n.",
    lessonLabel: "درس 13 — اسم‌های مرکب (۱): اسم + اسم"
  },
  {
    word: "sunglasses",
    meaning: "عینک آفتابی",
    lesson: 13,
    pos: "n.",
    lessonLabel: "درس 13 — اسم‌های مرکب (۱): اسم + اسم"
  },
  {
    word: "traffic lights",
    meaning: "چراغ‌های راهنمایی",
    lesson: 13,
    pos: "n.",
    lessonLabel: "درس 13 — اسم‌های مرکب (۱): اسم + اسم"
  },
  {
    word: "takeover",
    meaning: "تملک/خرید یک شرکت توسط شرکت دیگر",
    lesson: 14,
    pos: "n.",
    lessonLabel: "درس 14 — اسم‌های مرکب (۲): فعل + حرف اضافه"
  },
  {
    word: "pin-ups",
    meaning: "عکس‌های زیبایی که به دیوار زده می‌شود",
    lesson: 14,
    pos: "n.",
    lessonLabel: "درس 14 — اسم‌های مرکب (۲): فعل + حرف اضافه"
  },
  {
    word: "walk-out",
    meaning: "اعتصاب/ترک محل کار",
    lesson: 14,
    pos: "n.",
    lessonLabel: "درس 14 — اسم‌های مرکب (۲): فعل + حرف اضافه"
  },
  {
    word: "crack-down",
    meaning: "برخورد شدید/اقدام برای جلوگیری",
    lesson: 14,
    pos: "n.",
    lessonLabel: "درس 14 — اسم‌های مرکب (۲): فعل + حرف اضافه"
  },
  {
    word: "break-out",
    meaning: "فرار از زندان",
    lesson: 14,
    pos: "n.",
    lessonLabel: "درس 14 — اسم‌های مرکب (۲): فعل + حرف اضافه"
  },
  {
    word: "shake-up",
    meaning: "تغییر بزرگ/سازمان‌دهی مجدد",
    lesson: 14,
    pos: "n.",
    lessonLabel: "درس 14 — اسم‌های مرکب (۲): فعل + حرف اضافه"
  },
  {
    word: "break-up",
    meaning: "فروپاشی/از هم گسیختن",
    lesson: 14,
    pos: "n.",
    lessonLabel: "درس 14 — اسم‌های مرکب (۲): فعل + حرف اضافه"
  },
  {
    word: "outlets",
    meaning: "محل‌های فروش",
    lesson: 14,
    pos: "n.",
    lessonLabel: "درس 14 — اسم‌های مرکب (۲): فعل + حرف اضافه"
  },
  {
    word: "check-out",
    meaning: "صندوق پرداخت",
    lesson: 14,
    pos: "n.",
    lessonLabel: "درس 14 — اسم‌های مرکب (۲): فعل + حرف اضافه"
  },
  {
    word: "cutbacks",
    meaning: "کاهش‌ها/صرفه‌جویی",
    lesson: 14,
    pos: "n.",
    lessonLabel: "درس 14 — اسم‌های مرکب (۲): فعل + حرف اضافه"
  },
  {
    word: "turnover",
    meaning: "گردش پول/گردش کار",
    lesson: 14,
    pos: "n.",
    lessonLabel: "درس 14 — اسم‌های مرکب (۲): فعل + حرف اضافه"
  },
  {
    word: "input",
    meaning: "اطلاعات ورودی",
    lesson: 14,
    pos: "n.",
    lessonLabel: "درس 14 — اسم‌های مرکب (۲): فعل + حرف اضافه"
  },
  {
    word: "output",
    meaning: "تولید/برون‌ده",
    lesson: 14,
    pos: "n.",
    lessonLabel: "درس 14 — اسم‌های مرکب (۲): فعل + حرف اضافه"
  },
  {
    word: "dropout",
    meaning: "انسانی که از اجتماع کنار می‌کشد",
    lesson: 14,
    pos: "n.",
    lessonLabel: "درس 14 — اسم‌های مرکب (۲): فعل + حرف اضافه"
  },
  {
    word: "fallout",
    meaning: "غبار رادیواکتیو در جو",
    lesson: 14,
    pos: "n.",
    lessonLabel: "درس 14 — اسم‌های مرکب (۲): فعل + حرف اضافه"
  },
  {
    word: "printout",
    meaning: "چاپ‌خروجی کاغذی",
    lesson: 14,
    pos: "n.",
    lessonLabel: "درس 14 — اسم‌های مرکب (۲): فعل + حرف اضافه"
  },
  {
    word: "breakthrough",
    meaning: "کشف/پیشرفت مهم",
    lesson: 14,
    pos: "n.",
    lessonLabel: "درس 14 — اسم‌های مرکب (۲): فعل + حرف اضافه"
  },
  {
    word: "breakdown",
    meaning: "خرابی/شکست",
    lesson: 14,
    pos: "n.",
    lessonLabel: "درس 14 — اسم‌های مرکب (۲): فعل + حرف اضافه"
  },
  {
    word: "outlook",
    meaning: "چشم‌انداز/پیش‌بینی",
    lesson: 14,
    pos: "n.",
    lessonLabel: "درس 14 — اسم‌های مرکب (۲): فعل + حرف اضافه"
  },
  {
    word: "drawbacks",
    meaning: "جنبه‌های منفی",
    lesson: 14,
    pos: "n.",
    lessonLabel: "درس 14 — اسم‌های مرکب (۲): فعل + حرف اضافه"
  },
  {
    word: "outcome",
    meaning: "نتیجه/حاصل",
    lesson: 14,
    pos: "n.",
    lessonLabel: "درس 14 — اسم‌های مرکب (۲): فعل + حرف اضافه"
  },
  {
    word: "feedback",
    meaning: "بازخورد/نظرات",
    lesson: 14,
    pos: "n.",
    lessonLabel: "درس 14 — اسم‌های مرکب (۲): فعل + حرف اضافه"
  },
  {
    word: "outset",
    meaning: "شروع",
    lesson: 14,
    pos: "n.",
    lessonLabel: "درس 14 — اسم‌های مرکب (۲): فعل + حرف اضافه"
  },
  {
    word: "set-up",
    meaning: "وضعیت/ساختار",
    lesson: 14,
    pos: "n.",
    lessonLabel: "درس 14 — اسم‌های مرکب (۲): فعل + حرف اضافه"
  },
  {
    word: "lay-by",
    meaning: "جای پارک کنار جاده",
    lesson: 14,
    pos: "n.",
    lessonLabel: "درس 14 — اسم‌های مرکب (۲): فعل + حرف اضافه"
  },
  {
    word: "by-pass",
    meaning: "جاده کمربندی",
    lesson: 14,
    pos: "n.",
    lessonLabel: "درس 14 — اسم‌های مرکب (۲): فعل + حرف اضافه"
  },
  {
    word: "outbreak",
    meaning: "شروع چیزی ناخوشایند",
    lesson: 14,
    pos: "n.",
    lessonLabel: "درس 14 — اسم‌های مرکب (۲): فعل + حرف اضافه"
  },
  {
    word: "tycoon",
    meaning: "تاجر بزرگ و ثروتمند",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "karate",
    meaning: "کاراته",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "origami",
    meaning: "اوریگامی (هنر تا کردن کاغذ)",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "judo",
    meaning: "جودو",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "futon",
    meaning: "فوتون (تشک ژاپنی)",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "bonsai",
    meaning: "بونسای (درخت کوچک شده در گلدان)",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "mattress",
    meaning: "تشک",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "cipher",
    meaning: "رمز؛ صفر",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "alcove",
    meaning: "طاقچه؛ فرورفتگی دیوار",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "carafe",
    meaning: "پارچ آب (بدون درپوش)",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "algebra",
    meaning: "جبر (ریاضی)",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "harem",
    meaning: "حرمسرا",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "yashmak",
    meaning: "نقاب زنانه",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "yoghurt",
    meaning: "ماست",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "jackal",
    meaning: "شغال",
    lesson: 15,
    pos: "n.",
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "kiosk",
    meaning: "کشک؛ دکه",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "tulip",
    meaning: "گل لاله",
    lesson: 15,
    pos: "n.",
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "caftan",
    meaning: "قبا؛ پیراهن بلند",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "caravan",
    meaning: "کاروان؛ تریلر",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "shawl",
    meaning: "شال",
    lesson: 15,
    pos: "n.",
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "bazaar",
    meaning: "بازار",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "sherbet",
    meaning: "شربت",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "kayak",
    meaning: "قایق کایاک",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "igloo",
    meaning: "خانه برفی اسکیمویی",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "anorak",
    meaning: "کاپشن بارانی (پارکا)",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "fjord",
    meaning: "آبدره (خلاب باریک ساحلی)",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "lemming",
    meaning: "جل‌جل (جانور قطبی شبیه موش)",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "ski",
    meaning: "اسکی",
    lesson: 15,
    pos: "n.",
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "sauna",
    meaning: "سونا",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "ombudsman",
    meaning: "مامور رسیدگی به شکایات مردمی",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "bistro",
    meaning: "بسترو (رستوران کوچک)",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "cosmonaut",
    meaning: "فضانورد (روسی)",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "mammoth",
    meaning: "ماموت؛ پلیوفیل",
    lesson: 15,
    pos: "adj.",
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "sputnik",
    meaning: "اسپوتنیک (ماهواره)",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "steppe",
    meaning: "استپ (دشت وسیع)",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "tsar",
    meaning: "تزار (پادشاه روسیه)",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "tundra",
    meaning: "تندرا (دشت یخ‌بسته)",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "cruise",
    meaning: "کروز؛ سفر دریایی",
    lesson: 15,
    pos: "n.",
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "easel",
    meaning: "دستگاه نقاشی (سه‌پایه بوم)",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "tattoo",
    meaning: "تاتو",
    lesson: 15,
    pos: "n.",
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "yacht",
    meaning: "قایق بادبانی تفریحی",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "blitz",
    meaning: "حمله هوایی سنگین؛ تلاش شدید",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "dachshund",
    meaning: "سگ دششهوند",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "delicatessen",
    meaning: "فروشگاه مواد غذایی آماده",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "frankfurter",
    meaning: "سوسیس کوچک (هات‌داگ)",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "hamburger",
    meaning: "همبرگر",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "kindergarten",
    meaning: "مهد کودک",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "poodle",
    meaning: "سگ پودل",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "rottweiler",
    meaning: "سگ روتوایلر",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "seminar",
    meaning: "سمینار؛ کلاس بحث",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "snorkel",
    meaning: "لوله تنفس غواصی",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "waltz",
    meaning: "والس",
    lesson: 15,
    pos: "n.",
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "bonanza",
    meaning: "منبع ثروت؛ بخت بلند",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "embargo",
    meaning: "تحریم تجاری",
    lesson: 15,
    pos: "n.",
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "guerrilla",
    meaning: "چریک",
    lesson: 15,
    pos: "n.",
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "junta",
    meaning: "خونتا (حکومت نظامی)",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "lasso",
    meaning: "طناب کمند",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "macho",
    meaning: "مردنما؛ ماخو",
    lesson: 15,
    pos: "adj.",
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "mosquito",
    meaning: "پشه",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "patio",
    meaning: "حیاط داخلی؛ بالکن‌مانند",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "siesta",
    meaning: "چرت بعدازظهر",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "cobra",
    meaning: "کبرا",
    lesson: 15,
    pos: "n.",
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "dodo",
    meaning: "دُدو (پرنده منقرض شده)",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "marmalade",
    meaning: "مربا (ترشیجات مرکبات)",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "aubergine",
    meaning: "بادمجان",
    lesson: 15,
    pos: "n.",
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "avant garde",
    meaning: "پیشرو (نوآورانه)",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "boutique",
    meaning: "بوتیک",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "chauffeur",
    meaning: "راننده شخصی",
    lesson: 15,
    pos: "n.",
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "coup",
    meaning: "کودتا",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "creche",
    meaning: "مهد کودک؛ پرورشگاه",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "cuisine",
    meaning: "شیوه پخت‌وپز؛ آشپزی",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "cul de sac",
    meaning: "بن‌بست",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "duvet",
    meaning: "رختخواب پر (لحاف پَر)",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "elite",
    meaning: "نخبگان",
    lesson: 15,
    pos: "n.",
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "gateau",
    meaning: "کیک (لوکس)",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "sauté",
    meaning: "تفت‌داده (سرخ‌شده)",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "ballerina",
    meaning: "بالرین (رقاص زن)",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "bandit",
    meaning: "راهزن",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "casino",
    meaning: "کازینو (سالن قمار)",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "confetti",
    meaning: "کاغذرنگ‌های جشن",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "fiasco",
    meaning: "شکست کامل؛ فسقاد",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "ghetto",
    meaning: "محله فقیرنشین/یهودی‌نشین",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "piano",
    meaning: "پیانو",
    lesson: 15,
    pos: "n.",
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "soprano",
    meaning: "سوپرانو (صدای زیر)",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "spaghetti",
    meaning: "اسپاگتی",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "vendetta",
    meaning: "دشمنی خانوادگی؛ کینه‌ورزی",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "dogma",
    meaning: "دوگما؛ عقیده تعصبی",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "drama",
    meaning: "درام؛ نمایش",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "hippopotamus",
    meaning: "هیپوپوتاموس (اسب آبی)",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "pseudonym",
    meaning: "تخلص؛ نام مستعار",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "psychology",
    meaning: "روانشناسی",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "synonym",
    meaning: "مترادف",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "theory",
    meaning: "نظریه",
    lesson: 15,
    lessonLabel: "درس 15 — واژه‌هایی از زبان‌های دیگر"
  },
  {
    word: "WHO",
    meaning: "سازمان جهانی بهداشت (World Health Organisation)",
    lesson: 16,
    lessonLabel: "درس 16 — کوتاه‌نویسی‌ها و سرنام‌ها"
  },
  {
    word: "ID",
    meaning: "شناسنامه/کارت شناسایی (Identity)",
    lesson: 16,
    lessonLabel: "درس 16 — کوتاه‌نویسی‌ها و سرنام‌ها"
  },
  {
    word: "BBC",
    meaning: "شرکت پخش بریتانیا (British Broadcasting Corporation)",
    lesson: 16,
    lessonLabel: "درس 16 — کوتاه‌نویسی‌ها و سرنام‌ها"
  },
  {
    word: "GM(O)",
    meaning: "اصلاح‌شده ژنتیکی (ارگانیسم) (genetically modified (organism))",
    lesson: 16,
    lessonLabel: "درس 16 — کوتاه‌نویسی‌ها و سرنام‌ها"
  },
  {
    word: "IRA",
    meaning: "ارتش جمهوری‌خواهان ایرلند (Irish Republican Army)",
    lesson: 16,
    lessonLabel: "درس 16 — کوتاه‌نویسی‌ها و سرنام‌ها"
  },
  {
    word: "UN",
    meaning: "سازمان ملل متحد (United Nations)",
    lesson: 16,
    lessonLabel: "درس 16 — کوتاه‌نویسی‌ها و سرنام‌ها"
  },
  {
    word: "PM",
    meaning: "نخست‌وزیر (Prime Minister)",
    lesson: 16,
    lessonLabel: "درس 16 — کوتاه‌نویسی‌ها و سرنام‌ها"
  },
  {
    word: "MP",
    meaning: "عضو پارلمان (Member of Parliament)",
    lesson: 16,
    lessonLabel: "درس 16 — کوتاه‌نویسی‌ها و سرنام‌ها"
  },
  {
    word: "CIA",
    meaning: "آژانس اطلاعات مرکزی آمریکا (USA)",
    lesson: 16,
    lessonLabel: "درس 16 — کوتاه‌نویسی‌ها و سرنام‌ها"
  },
  {
    word: "MI5",
    meaning: "اداره اطلاعات داخلی بریتانیا (UK)",
    lesson: 16,
    lessonLabel: "درس 16 — کوتاه‌نویسی‌ها و سرنام‌ها"
  },
  {
    word: "KGB",
    meaning: "کمیته امنیت دولتی اتحاد جماهیر شوروی سابق (of the former USSR)",
    lesson: 16,
    lessonLabel: "درس 16 — کوتاه‌نویسی‌ها و سرنام‌ها"
  },
  {
    word: "NATO",
    meaning: "سازمان پیمان آتلانتیک شمالی (North Atlantic Treaty Organisation)",
    lesson: 16,
    lessonLabel: "درس 16 — کوتاه‌نویسی‌ها و سرنام‌ها"
  },
  {
    word: "OPEC",
    meaning: "سازمان کشورهای صادرکننده نفت (Organisation of Petroleum Exporting Countries)",
    lesson: 16,
    lessonLabel: "درس 16 — کوتاه‌نویسی‌ها و سرنام‌ها"
  },
  {
    word: "AIDS",
    meaning: "سندرم نقص ایمنی اکتسابی (Acquired Immune Deficiency Syndrome)",
    lesson: 16,
    lessonLabel: "درس 16 — کوتاه‌نویسی‌ها و سرنام‌ها"
  },
  {
    word: "PIN",
    meaning: "شماره شناسایی شخصی (Personal Identity Number)",
    lesson: 16,
    lessonLabel: "درس 16 — کوتاه‌نویسی‌ها و سرنام‌ها"
  },
  {
    word: "laser",
    meaning: "لیزر",
    lesson: 16,
    lessonLabel: "درس 16 — کوتاه‌نویسی‌ها و سرنام‌ها"
  },
  {
    word: "radar",
    meaning: "رادار",
    lesson: 16,
    lessonLabel: "درس 16 — کوتاه‌نویسی‌ها و سرنام‌ها"
  },
  {
    word: "yuppy",
    meaning: "جوان مرفه شهری",
    lesson: 16,
    lessonLabel: "درس 16 — کوتاه‌نویسی‌ها و سرنام‌ها"
  },
  {
    word: "Esso",
    meaning: "اکسو (نام شرکت نفت)",
    lesson: 16,
    lessonLabel: "درس 16 — کوتاه‌نویسی‌ها و سرنام‌ها"
  },
  {
    word: "Mr (Mister)",
    meaning: "آقا",
    lesson: 16,
    lessonLabel: "درس 16 — کوتاه‌نویسی‌ها و سرنام‌ها"
  },
  {
    word: "Dr (Doctor)",
    meaning: "دکتر",
    lesson: 16,
    lessonLabel: "درس 16 — کوتاه‌نویسی‌ها و سرنام‌ها"
  },
  {
    word: "St (Saint or Street)",
    meaning: "سنت یا خیابان",
    lesson: 16,
    lessonLabel: "درس 16 — کوتاه‌نویسی‌ها و سرنام‌ها"
  },
  {
    word: "Rd (Road)",
    meaning: "جاده/راه",
    lesson: 16,
    lessonLabel: "درس 16 — کوتاه‌نویسی‌ها و سرنام‌ها"
  },
  {
    word: "etc.",
    meaning: "و غیره (et cetera)",
    lesson: 16,
    lessonLabel: "درس 16 — کوتاه‌نویسی‌ها و سرنام‌ها"
  },
  {
    word: "PTO",
    meaning: "لطفاً برگه را ورق بزنید (please turn over)",
    lesson: 16,
    lessonLabel: "درس 16 — کوتاه‌نویسی‌ها و سرنام‌ها"
  },
  {
    word: "i.e.",
    meaning: "یعنی (that is to say؛ id est)",
    lesson: 16,
    lessonLabel: "درس 16 — کوتاه‌نویسی‌ها و سرنام‌ها"
  },
  {
    word: "NB",
    meaning: "توجه کنید (please note؛ nota bene)",
    lesson: 16,
    lessonLabel: "درس 16 — کوتاه‌نویسی‌ها و سرنام‌ها"
  },
  {
    word: "e.g.",
    meaning: "برای مثال (for example؛ exempli gratia)",
    lesson: 16,
    lessonLabel: "درس 16 — کوتاه‌نویسی‌ها و سرنام‌ها"
  },
  {
    word: "ad/advert (advertisement)",
    meaning: "آگهی",
    lesson: 16,
    lessonLabel: "درس 16 — کوتاه‌نویسی‌ها و سرنام‌ها"
  },
  {
    word: "bike (bicycle)",
    meaning: "دوچرخه",
    lesson: 16,
    lessonLabel: "درس 16 — کوتاه‌نویسی‌ها و سرنام‌ها"
  },
  {
    word: "board (blackboard)",
    meaning: "تخته (سیاه)",
    lesson: 16,
    lessonLabel: "درس 16 — کوتاه‌نویسی‌ها و سرنام‌ها"
  },
  {
    word: "case (suitcase)",
    meaning: "چمدان",
    lesson: 16,
    lessonLabel: "درس 16 — کوتاه‌نویسی‌ها و سرنام‌ها"
  },
  {
    word: "exam (examination)",
    meaning: "امتحان",
    lesson: 16,
    lessonLabel: "درس 16 — کوتاه‌نویسی‌ها و سرنام‌ها"
  },
  {
    word: "fridge (refrigerator)",
    meaning: "یخچال",
    lesson: 16,
    lessonLabel: "درس 16 — کوتاه‌نویسی‌ها و سرنام‌ها"
  },
  {
    word: "lab (laboratory)",
    meaning: "آزمایشگاه",
    lesson: 16,
    lessonLabel: "درس 16 — کوتاه‌نویسی‌ها و سرنام‌ها"
  },
  {
    word: "phone (telephone)",
    meaning: "تلفن",
    lesson: 16,
    lessonLabel: "درس 16 — کوتاه‌نویسی‌ها و سرنام‌ها"
  },
  {
    word: "plane (aeroplane)",
    meaning: "هواپیما",
    lesson: 16,
    lessonLabel: "درس 16 — کوتاه‌نویسی‌ها و سرنام‌ها"
  },
  {
    word: "rep (business representative)",
    meaning: "نماینده تجاری",
    lesson: 16,
    lessonLabel: "درس 16 — کوتاه‌نویسی‌ها و سرنام‌ها"
  },
  {
    word: "TV or telly (television)",
    meaning: "تلویزیون",
    lesson: 16,
    lessonLabel: "درس 16 — کوتاه‌نویسی‌ها و سرنام‌ها"
  },
  {
    word: "c/o",
    meaning: "به نمایندگی از/در ضمن پست (care of)",
    lesson: 16,
    lessonLabel: "درس 16 — کوتاه‌نویسی‌ها و سرنام‌ها"
  },
  {
    word: "enc.",
    meaning: "پیوست (enclosed)",
    lesson: 16,
    lessonLabel: "درس 16 — کوتاه‌نویسی‌ها و سرنام‌ها"
  },
  {
    word: "PS",
    meaning: "پس‌نوشت (postscript)",
    lesson: 16,
    lessonLabel: "درس 16 — کوتاه‌نویسی‌ها و سرنام‌ها"
  },
  {
    word: "asap",
    meaning: "در اسرع وقت (as soon as possible)",
    lesson: 16,
    lessonLabel: "درس 16 — کوتاه‌نویسی‌ها و سرنام‌ها"
  },
  {
    word: "RSVP",
    meaning: "لطفاً پاسخ دهید (répondez s'il vous plaît)",
    lesson: 16,
    lessonLabel: "درس 16 — کوتاه‌نویسی‌ها و سرنام‌ها"
  },
  {
    word: "cyberspace",
    meaning: "فضای سایبر؛ قلمرویی که داده‌های الکترونیکی توسط رایانه‌ها ذخیره یا منتقل می‌شوند",
    lesson: 17,
    lessonLabel: "درس 17 — واژه‌های تازه در انگلیسی"
  },
  {
    word: "junk e-mail",
    meaning: "هرزنامه؛ مطالب ناخواسته مانند تبلیغات که با ایمیل فرستاده می‌شود",
    lesson: 17,
    lessonLabel: "درس 17 — واژه‌های تازه در انگلیسی"
  },
  {
    word: "keypal",
    meaning: "دوست مکاتبه‌ای اینترنتی؛ نوعی دوست مکاتبه‌ای که با او به جای نامه، ایمیل رد و بدل می‌کنید",
    lesson: 17,
    lessonLabel: "درس 17 — واژه‌های تازه در انگلیسی"
  },
  {
    word: "surfing the net",
    meaning: "گشت‌وگذار در وب جهان‌گستر",
    lesson: 17,
    lessonLabel: "درس 17 — واژه‌های تازه در انگلیسی"
  },
  {
    word: "e-commerce",
    meaning: "تجارت الکترونیک؛ تجارت مبتنی بر اینترنت",
    lesson: 17,
    lessonLabel: "درس 17 — واژه‌های تازه در انگلیسی"
  },
  {
    word: "mouse potato",
    meaning: "کسی که زمان زیادی را جلوی رایانه، به‌ویژه آنلاین، می‌گذراند",
    lesson: 17,
    lessonLabel: "درس 17 — واژه‌های تازه در انگلیسی"
  },
  {
    word: "information fatigue syndrome",
    meaning: "سندرم خستگی اطلاعاتی؛ حالت استرس روانی ناشی از تلاش برای مدیریت اطلاعات بیش از حد",
    lesson: 17,
    lessonLabel: "درس 17 — واژه‌های تازه در انگلیسی"
  },
  {
    word: "eating disorder",
    meaning: "اختلال خوردن؛ اختلال جدی در عادات غذا خوردن که اغلب از مشکلات عاطفی ناشی می‌شود",
    lesson: 17,
    lessonLabel: "درس 17 — واژه‌های تازه در انگلیسی"
  },
  {
    word: "GM foods",
    meaning: "غذاهای تراریخته؛ غذای اصلاح‌شده ژنتیکی با استفاده از زیست‌فناوری",
    lesson: 17,
    lessonLabel: "درس 17 — واژه‌های تازه در انگلیسی"
  },
  {
    word: "snowboarding",
    meaning: "اسنوبورد؛ سُرخوردن روی برف به‌صورت ایستاده روی یک اسکی بزرگ و تکی",
    lesson: 17,
    lessonLabel: "درس 17 — واژه‌های تازه در انگلیسی"
  },
  {
    word: "in-line skating",
    meaning: "اسکیت خطی؛ اسکیت با چرخ‌های لاستیکی در یک خط مستقیم",
    lesson: 17,
    lessonLabel: "درس 17 — واژه‌های تازه در انگلیسی"
  },
  {
    word: "video jockey (VJ)",
    meaning: "وی‌جی؛ مجری تلویزیونی ویدیوهای موسیقی",
    lesson: 17,
    lessonLabel: "درس 17 — واژه‌های تازه در انگلیسی"
  },
  {
    word: "audio book",
    meaning: "کتاب صوتی؛ ضبط صدای کتاب خوانده‌شده، گاهی به‌صورت خلاصه",
    lesson: 17,
    lessonLabel: "درس 17 — واژه‌های تازه در انگلیسی"
  },
  {
    word: "drop-dead gorgeous",
    meaning: "بسیار خیره‌کننده و جذاب",
    lesson: 17,
    lessonLabel: "درس 17 — واژه‌های تازه در انگلیسی"
  },
  {
    word: "bad hair day",
    meaning: "روزی که همه‌چیز خراب می‌شود و احساس جذاب نبودن می‌کنید",
    lesson: 17,
    lessonLabel: "درس 17 — واژه‌های تازه در انگلیسی"
  },
  {
    word: "docusoap",
    meaning: "سریال مستند؛ ژانر تلویزیونی که زندگی روزمره عادی مردم را نشان می‌دهد",
    lesson: 17,
    lessonLabel: "درس 17 — واژه‌های تازه در انگلیسی"
  },
  {
    word: "cybercafé",
    meaning: "کافه‌اینترنت؛ کافه‌ای که مشتریان می‌توانند در آن خوراک بخورند و از اینترنت هم استفاده کنند",
    lesson: 17,
    lessonLabel: "درس 17 — واژه‌های تازه در انگلیسی"
  },
  {
    word: "road rage",
    meaning: "خشم جاده‌ای؛ خشم شدید رانندگان در شرایط استرس‌زا که به رانندگی خطرناک یا حمله به دیگران می‌انجامد",
    lesson: 17,
    lessonLabel: "درس 17 — واژه‌های تازه در انگلیسی"
  },
  {
    word: "singleton",
    meaning: "مرد یا زن مجرد",
    lesson: 17,
    lessonLabel: "درس 17 — واژه‌های تازه در انگلیسی"
  },
  {
    word: "spin doctor",
    meaning: "کارشناس رسانه‌ای؛ کسی که شغلش دستکاری افکار عمومی به نفع سیاستمداران یا چهره‌های عمومی است",
    lesson: 17,
    lessonLabel: "درس 17 — واژه‌های تازه در انگلیسی"
  },
  {
    word: "decluttering",
    meaning: "هنر دور انداختن وسایل غیرضروری",
    lesson: 17,
    lessonLabel: "درس 17 — واژه‌های تازه در انگلیسی"
  },
  {
    word: "off-message",
    meaning: "خارج از موضع رسمی حزب",
    lesson: 17,
    lessonLabel: "درس 17 — واژه‌های تازه در انگلیسی"
  },
  {
    word: "grey vote, grey pound",
    meaning: "قدرت رأی یا خرید افراد سالمند",
    lesson: 17,
    lessonLabel: "درس 17 — واژه‌های تازه در انگلیسی"
  },
  {
    word: "down-sizing",
    meaning: "کوچک‌سازی؛ کاهش اندازه شرکت یا سازمان، معمولاً با اخراج کارکنان",
    lesson: 17,
    lessonLabel: "درس 17 — واژه‌های تازه در انگلیسی"
  },
  {
    word: "outsourcing",
    meaning: "برون‌سپاری؛ به‌کارگیری نیروهای بیرونی برای انجام کار خارج از محل شرکت",
    lesson: 17,
    lessonLabel: "درس 17 — واژه‌های تازه در انگلیسی"
  },
  {
    word: "hot-desking",
    meaning: "اشتراک میز یا ایستگاه کاری میان کارکنان به‌جای داشتن میز شخصی",
    lesson: 17,
    lessonLabel: "درس 17 — واژه‌های تازه در انگلیسی"
  },
  {
    word: "waitperson",
    meaning: "گارسون (مرد یا زن)",
    lesson: 17,
    lessonLabel: "درس 17 — واژه‌های تازه در انگلیسی"
  },
  {
    word: "about",
    meaning: "درباره",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "wander",
    meaning: "سرگردان شدن",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "last",
    meaning: "آخرین",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "late",
    meaning: "دیر",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "alive",
    meaning: "زنده",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "give",
    meaning: "دادن",
    lesson: 18,
    pos: "v.",
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "put",
    meaning: "گذاشتن",
    lesson: 18,
    pos: "v.",
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "cut",
    meaning: "بریدن",
    lesson: 18,
    pos: "v.",
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "cupid",
    meaning: "کوپید (خدای عشق)",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "fiend",
    meaning: "شیطان",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "friend",
    meaning: "دوست",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "science",
    meaning: "علم",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "rein",
    meaning: "مهار (اسب)",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "receive",
    meaning: "دریافت کردن",
    lesson: 18,
    pos: "v.",
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "reinforce",
    meaning: "تقویت کردن",
    lesson: 18,
    pos: "v.",
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "met",
    meaning: "ملاقات کرد (past of meet)",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "meter",
    meaning: "متر",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "sorry",
    meaning: "متاسف",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "go",
    meaning: "رفتن",
    lesson: 18,
    pos: "v.",
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "love",
    meaning: "عشق",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "to",
    meaning: "به",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "head",
    meaning: "سر",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "team",
    meaning: "تیم",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "react",
    meaning: "واکنش نشان دادن",
    lesson: 18,
    pos: "v.",
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "our",
    meaning: "مال ما",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "route",
    meaning: "مسیر",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "would",
    meaning: "خواهد (فعل کمکی)",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "cool",
    meaning: "خنک",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "cook",
    meaning: "آشپز",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "coopt",
    meaning: "انتخاب کردن",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "psychic",
    meaning: "روانی، ذهنی",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "psychiatry",
    meaning: "روان‌پزشکی",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "pneumatic",
    meaning: "بادی، هوایی",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "receipt",
    meaning: "رسید",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "pseudonym",
    meaning: "نام مستعار",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "psychology",
    meaning: "روان‌شناسی",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "comb",
    meaning: "شانه",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "dumb",
    meaning: "کم‌حرف، خاموش",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "numb",
    meaning: "بی‌حس",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "tomb",
    meaning: "قبر",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "climb",
    meaning: "بالارفتن",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "womb",
    meaning: "رحم",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "lamb",
    meaning: "بره",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "doubt",
    meaning: "شک",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "subtle",
    meaning: "ظریف",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "debt",
    meaning: "بدهی",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "debtor",
    meaning: "بدهکار",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "could",
    meaning: "می‌توانست",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "should",
    meaning: "باید",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "calm",
    meaning: "آرام",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "half",
    meaning: "نصف",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "talk",
    meaning: "حرف زدن",
    lesson: 18,
    pos: "v.",
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "palm",
    meaning: "کف دست؛ نخل",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "walk",
    meaning: "قدم زدن",
    lesson: 18,
    pos: "v.",
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "salmon",
    meaning: "ماهی سالمون",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "chalk",
    meaning: "گچ",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "honour",
    meaning: "افتخار",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "honourable",
    meaning: "شریف، محترم",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "honest",
    meaning: "صادق",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "hour",
    meaning: "ساعت",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "hourly",
    meaning: "هر ساعتی",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "heir",
    meaning: "وارث",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "heiress",
    meaning: "وارثه",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "whistle",
    meaning: "سوت",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "castle",
    meaning: "قلعه",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "listen",
    meaning: "گوش دادن",
    lesson: 18,
    pos: "v.",
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "fasten",
    meaning: "بستن",
    lesson: 18,
    pos: "v.",
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "soften",
    meaning: "نرم کردن",
    lesson: 18,
    pos: "v.",
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "Christmas",
    meaning: "کریسمس",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "knee",
    meaning: "زانو",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "knife",
    meaning: "چاقو",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "know",
    meaning: "دانستن",
    lesson: 18,
    pos: "v.",
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "knob",
    meaning: "دسته‌درب",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "knowledge",
    meaning: "دانش",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "knot",
    meaning: "گره",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "knit",
    meaning: "بافتنی",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "card",
    meaning: "کارت",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "park",
    meaning: "پارک",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "farm",
    meaning: "مزرعه",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "burn",
    meaning: "سوختن",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "work",
    meaning: "کار",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "storm",
    meaning: "طوفان",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "tart",
    meaning: "تارت",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "mother",
    meaning: "مادر",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "sister",
    meaning: "خواهر",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "teacher",
    meaning: "معلم",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "water",
    meaning: "آب",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "export",
    meaning: "صادرات / صادر کردن",
    lesson: 18,
    pos: "n.|v.",
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "conduct",
    meaning: "رفتار / هدایت کردن",
    lesson: 18,
    pos: "n.|v.",
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "conflict",
    meaning: "تعارض / تعارض داشتن",
    lesson: 18,
    pos: "n.|v.",
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "contest",
    meaning: "مسابقه / رقابت کردن",
    lesson: 18,
    pos: "n.|v.",
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "decrease",
    meaning: "کاهش / کاهش دادن",
    lesson: 18,
    pos: "n.|v.",
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "suspect",
    meaning: "مظنون / مظنون بودن",
    lesson: 18,
    pos: "n.|v.",
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "desert",
    meaning: "بیابان",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "import",
    meaning: "واردات / وارد کردن",
    lesson: 18,
    pos: "n.|v.",
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "increase",
    meaning: "افزایش / افزایش دادن",
    lesson: 18,
    pos: "n.|v.",
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "insult",
    meaning: "توهین / توهین کردن",
    lesson: 18,
    pos: "n.|v.",
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "transfer",
    meaning: "انتقال / منتقل کردن",
    lesson: 18,
    pos: "n.|v.",
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "permit",
    meaning: "مجوز / اجازه دادن",
    lesson: 18,
    pos: "n.|v.",
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "present",
    meaning: "هدیه / ارائه دادن",
    lesson: 18,
    pos: "n.|v.",
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "progress",
    meaning: "پیشرفت / پیشرفت کردن",
    lesson: 18,
    pos: "n.|v.",
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "protest",
    meaning: "اعتراض / اعتراض کردن",
    lesson: 18,
    pos: "n.|v.",
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "transport",
    meaning: "حمل‌ونقل / حمل کردن",
    lesson: 18,
    pos: "n.|v.",
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "record",
    meaning: "رکورد / ضبط کردن",
    lesson: 18,
    pos: "n.|v.",
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "reject",
    meaning: "مردود / رد کردن",
    lesson: 18,
    pos: "n.|v.",
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "reprint",
    meaning: "بازچاپ / بازچاپ کردن",
    lesson: 18,
    pos: "n.|v.",
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "subject",
    meaning: "موضوع",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "upset",
    meaning: "ناراحت / ناراحت کردن",
    lesson: 18,
    pos: "adj.|v.",
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "apostrophe",
    meaning: "علامت آپاستروف",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "catastrophe",
    meaning: "فاجعه",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "cupboard",
    meaning: "کابینت، گنجه",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "recipe",
    meaning: "دستور پخت",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "hiccough",
    meaning: "سکسکه",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "sword",
    meaning: "شمشیر",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "plough",
    meaning: "گاوآهن",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "muscle",
    meaning: "ماهیچه",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "interesting",
    meaning: "جالب",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "photograph",
    meaning: "عکس",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "photography",
    meaning: "عکاسی",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "photographically",
    meaning: "از نظر عکاسی",
    lesson: 18,
    lessonLabel: "درس 18 — واژه‌هایی که معمولاً بد تلفظ می‌شوند"
  },
  {
    word: "moo",
    meaning: "صدا کردن (گاو: موقردن)",
    lesson: 19,
    pos: "v.",
    lessonLabel: "درس 19 — واژه‌های نمادصوتی"
  },
  {
    word: "neigh",
    meaning: "شیهه کشیدن",
    lesson: 19,
    pos: "v.",
    lessonLabel: "درس 19 — واژه‌های نمادصوتی"
  },
  {
    word: "pip",
    meaning: "صدای کوتاه و تیز (بیپ)",
    lesson: 19,
    pos: "n.",
    lessonLabel: "درس 19 — واژه‌های نمادصوتی"
  },
  {
    word: "peep",
    meaning: "صدای بلند و کشیده",
    lesson: 19,
    pos: "n.",
    lessonLabel: "درس 19 — واژه‌های نمادصوتی"
  },
  {
    word: "groan",
    meaning: "ناله زدن",
    lesson: 19,
    pos: "v.",
    lessonLabel: "درس 19 — واژه‌های نمادصوتی"
  },
  {
    word: "grumble",
    meaning: "غر زدن",
    lesson: 19,
    pos: "v.",
    lessonLabel: "درس 19 — واژه‌های نمادصوتی"
  },
  {
    word: "grumpy",
    meaning: "بدعنق",
    lesson: 19,
    pos: "adj.",
    lessonLabel: "درس 19 — واژه‌های نمادصوتی"
  },
  {
    word: "grunt",
    meaning: "غرغر کردن",
    lesson: 19,
    pos: "v.",
    lessonLabel: "درس 19 — واژه‌های نمادصوتی"
  },
  {
    word: "growl",
    meaning: "غرش کردن",
    lesson: 19,
    pos: "v.",
    lessonLabel: "درس 19 — واژه‌های نمادصوتی"
  },
  {
    word: "click",
    meaning: "تق‌تق کردن (صدای کوتاه تیز)",
    lesson: 19,
    pos: "v.",
    lessonLabel: "درس 19 — واژه‌های نمادصوتی"
  },
  {
    word: "clang",
    meaning: "صدای برخورد فلز (جینگ)",
    lesson: 19,
    pos: "v.",
    lessonLabel: "درس 19 — واژه‌های نمادصوتی"
  },
  {
    word: "clank",
    meaning: "صدای خش‌خش فلزی",
    lesson: 19,
    pos: "v.",
    lessonLabel: "درس 19 — واژه‌های نمادصوتی"
  },
  {
    word: "clash",
    meaning: "برخورد با صدای بلند و آشفته",
    lesson: 19,
    pos: "v.",
    lessonLabel: "درس 19 — واژه‌های نمادصوتی"
  },
  {
    word: "clink",
    meaning: "صدای برخورد تکه‌های کوچک فلز یا شیشه",
    lesson: 19,
    pos: "v.",
    lessonLabel: "درس 19 — واژه‌های نمادصوتی"
  },
  {
    word: "clip-clop",
    meaning: "صدای سم اسب",
    lesson: 19,
    pos: "phr.",
    lessonLabel: "درس 19 — واژه‌های نمادصوتی"
  },
  {
    word: "splash",
    meaning: "پاشیدن مایع",
    lesson: 19,
    pos: "v.",
    lessonLabel: "درس 19 — واژه‌های نمادصوتی"
  },
  {
    word: "spit",
    meaning: "تف کردن",
    lesson: 19,
    pos: "v.",
    lessonLabel: "درس 19 — واژه‌های نمادصوتی"
  },
  {
    word: "splutter",
    meaning: "صدای تف‌تف پشت سر هم",
    lesson: 19,
    pos: "v.",
    lessonLabel: "درس 19 — واژه‌های نمادصوتی"
  },
  {
    word: "spray",
    meaning: "اسپری کردن، افشاندن",
    lesson: 19,
    pos: "v.",
    lessonLabel: "درس 19 — واژه‌های نمادصوتی"
  },
  {
    word: "sprinkle",
    meaning: "پاشیدن قطره‌های ریز",
    lesson: 19,
    pos: "v.",
    lessonLabel: "درس 19 — واژه‌های نمادصوتی"
  },
  {
    word: "spurt",
    meaning: "فوران کردن",
    lesson: 19,
    pos: "v.",
    lessonLabel: "درس 19 — واژه‌های نمادصوتی"
  },
  {
    word: "whistle",
    meaning: "سوت زدن",
    lesson: 19,
    pos: "v.",
    lessonLabel: "درس 19 — واژه‌های نمادصوتی"
  },
  {
    word: "whirr",
    meaning: "صدای بال‌زدن سریع / وزوز",
    lesson: 19,
    pos: "v.",
    lessonLabel: "درس 19 — واژه‌های نمادصوتی"
  },
  {
    word: "whizz",
    meaning: "صدای عبور سریع از هوا",
    lesson: 19,
    pos: "v.",
    lessonLabel: "درس 19 — واژه‌های نمادصوتی"
  },
  {
    word: "wheeze",
    meaning: "خس‌خس سینه کشیدن",
    lesson: 19,
    pos: "v.",
    lessonLabel: "درس 19 — واژه‌های نمادصوتی"
  },
  {
    word: "whip",
    meaning: "شلاق / با شلاق زدن",
    lesson: 19,
    pos: "n.",
    lessonLabel: "درس 19 — واژه‌های نمادصوتی"
  },
  {
    word: "smash",
    meaning: "مخروبه کردن، تکه‌تکه کردن",
    lesson: 19,
    pos: "v.",
    lessonLabel: "درس 19 — واژه‌های نمادصوتی"
  },
  {
    word: "dash",
    meaning: "شدیداً دویدن/پرتاب شدن",
    lesson: 19,
    pos: "v.",
    lessonLabel: "درس 19 — واژه‌های نمادصوتی"
  },
  {
    word: "crash",
    meaning: "تصادم کردن با سر و صدا",
    lesson: 19,
    pos: "v.",
    lessonLabel: "درس 19 — واژه‌های نمادصوتی"
  },
  {
    word: "bash",
    meaning: "محکم کوبیدن",
    lesson: 19,
    pos: "v.",
    lessonLabel: "درس 19 — واژه‌های نمادصوتی"
  },
  {
    word: "mash",
    meaning: "له کردن",
    lesson: 19,
    pos: "v.",
    lessonLabel: "درس 19 — واژه‌های نمادصوتی"
  },
  {
    word: "gash",
    meaning: "بریدگی عمیق",
    lesson: 19,
    pos: "n.",
    lessonLabel: "درس 19 — واژه‌های نمادصوتی"
  },
  {
    word: "trickle",
    meaning: "ن-chan چکه کردن",
    lesson: 19,
    pos: "v.",
    lessonLabel: "درس 19 — واژه‌های نمادصوتی"
  },
  {
    word: "crackle",
    meaning: "تق‌تق کردن (آتش و…)",
    lesson: 19,
    pos: "v.",
    lessonLabel: "درس 19 — واژه‌های نمادصوتی"
  },
  {
    word: "tinkle",
    meaning: "صدای زنگ زنگ خفیف",
    lesson: 19,
    pos: "v.",
    lessonLabel: "درس 19 — واژه‌های نمادصوتی"
  },
  {
    word: "giggle",
    meaning: "قهقهه زدن / پوزخند کودکانه",
    lesson: 19,
    pos: "v.",
    lessonLabel: "درس 19 — واژه‌های نمادصوتی"
  },
  {
    word: "wriggle",
    meaning: "پیچ‌وتاب خوردن",
    lesson: 19,
    pos: "v.",
    lessonLabel: "درس 19 — واژه‌های نمادصوتی"
  },
  {
    word: "sizzle",
    meaning: "صدای سرخ شدن",
    lesson: 19,
    pos: "v.",
    lessonLabel: "درس 19 — واژه‌های نمادصوتی"
  },
  {
    word: "drizzle",
    meaning: "نم‌نم باران",
    lesson: 19,
    pos: "n.",
    lessonLabel: "درس 19 — واژه‌های نمادصوتی"
  },
  {
    word: "homonyms",
    meaning: "هم‌نام‌ها (واژه‌هایی با تلفظ یا املای یکسان اما معنای متفاوت)",
    lesson: 20,
    pos: "n.",
    lessonLabel: "درس 20 — هم‌نام‌ها"
  },
  {
    word: "homographs",
    meaning: "هم‌نگاره‌ها (واژه‌هایی که یکسان نوشته می‌شوند اما معانی متفاوت دارند و ممکن است تلفظ متفاوتی داشته باشند)",
    lesson: 20,
    pos: "n.",
    lessonLabel: "درس 20 — هم‌نام‌ها"
  },
  {
    word: "homophones",
    meaning: "هم‌آواها (واژه‌هایی با معنای متفاوت که یکسان تلفظ می‌شوند اما املای متفاوت دارند)",
    lesson: 20,
    pos: "n.",
    lessonLabel: "درس 20 — هم‌نام‌ها"
  },
  {
    word: "bow",
    meaning: "۱) تعظیم/فرود آوردن سر ۲) پاپیون",
    lesson: 20,
    pos: "n.",
    lessonLabel: "درس 20 — هم‌نام‌ها"
  },
  {
    word: "bough",
    meaning: "شاخهٔ درخت",
    lesson: 20,
    pos: "n.",
    lessonLabel: "درس 20 — هم‌نام‌ها"
  },
  {
    word: "live",
    meaning: "۱) زندگی کردن /lɪv/ ۲) زنده، پخش مستقیم /laɪv/",
    lesson: 20,
    pos: "v.|adj.",
    lessonLabel: "درس 20 — هم‌نام‌ها"
  },
  {
    word: "read",
    meaning: "۱) خواندن (حال) /riːd/ ۲) خواندن (گذشته) /red/",
    lesson: 20,
    pos: "v.",
    lessonLabel: "درس 20 — هم‌نام‌ها"
  },
  {
    word: "lead",
    meaning: "۱) خوانندهٔ اصلی /liːd/ ۲) سرب (فلز) /led/",
    lesson: 20,
    pos: "n.",
    lessonLabel: "درس 20 — هم‌نام‌ها"
  },
  {
    word: "wind",
    meaning: "۱) باد /wɪnd/ ۲) پیچاندن /waɪnd/",
    lesson: 20,
    pos: "n.|v.",
    lessonLabel: "درس 20 — هم‌نام‌ها"
  },
  {
    word: "wound",
    meaning: "۱) پیچاندن (گذشتهٔ wind) /waʊnd/ ۲) زخم /wuːnd/",
    lesson: 20,
    pos: "n.|v.",
    lessonLabel: "درس 20 — هم‌نام‌ها"
  },
  {
    word: "row",
    meaning: "۱) پارو زدن /rəʊ/ ۲) دعوا، اختلاف /raʊ/ ۳) ردیف /rəʊ/",
    lesson: 20,
    pos: "n.|v.",
    lessonLabel: "درس 20 — هم‌نام‌ها"
  },
  {
    word: "use",
    meaning: "۱) استفاده (اسم) /juːs/ ۲) استفاده کردن (فعل) /juːz/",
    lesson: 20,
    pos: "n.|v.",
    lessonLabel: "درس 20 — هم‌نام‌ها"
  },
  {
    word: "house",
    meaning: "۱) خانه /haʊs/ ۲) در بر گرفتن، جای دادن /haʊz/",
    lesson: 20,
    pos: "n.|v.",
    lessonLabel: "درس 20 — هم‌نام‌ها"
  },
  {
    word: "sow",
    meaning: "۱) خوک ماده /saʊ/ ۲) کاشتن (بذر) /səʊ/",
    lesson: 20,
    pos: "n.|v.",
    lessonLabel: "درس 20 — هم‌نام‌ها"
  },
  {
    word: "bathing",
    meaning: "۱) حمام کردن /bɑːðɪŋ/ ۲) شنا کردن، تن‌آوری /beɪðɪŋ/",
    lesson: 20,
    pos: "n.",
    lessonLabel: "درس 20 — هم‌نام‌ها"
  },
  {
    word: "air/heir",
    meaning: "هوا / وارث",
    lesson: 20,
    lessonLabel: "درس 20 — هم‌نام‌ها"
  },
  {
    word: "aloud/allowed",
    meaning: "بلند / مجاز",
    lesson: 20,
    lessonLabel: "درس 20 — هم‌نام‌ها"
  },
  {
    word: "break/brake",
    meaning: "شکستن / ترمز",
    lesson: 20,
    lessonLabel: "درس 20 — هم‌نام‌ها"
  },
  {
    word: "fare/fair",
    meaning: "کرایه / منصف، زیبا",
    lesson: 20,
    lessonLabel: "درس 20 — هم‌نام‌ها"
  },
  {
    word: "faze/phase",
    meaning: "منگ کردن / مرحله",
    lesson: 20,
    lessonLabel: "درس 20 — هم‌نام‌ها"
  },
  {
    word: "flu/flew",
    meaning: "آنفلوانزا / پرواز کرد",
    lesson: 20,
    lessonLabel: "درس 20 — هم‌نام‌ها"
  },
  {
    word: "grate/great",
    meaning: "رنده کردن / عالی",
    lesson: 20,
    lessonLabel: "درس 20 — هم‌نام‌ها"
  },
  {
    word: "groan/grown",
    meaning: "ناله / رشدیافته",
    lesson: 20,
    lessonLabel: "درس 20 — هم‌نام‌ها"
  },
  {
    word: "hoarse/horse",
    meaning: "خشن (صدا) / اسب",
    lesson: 20,
    lessonLabel: "درس 20 — هم‌نام‌ها"
  },
  {
    word: "its/it’s",
    meaning: "مال آن / آن است",
    lesson: 20,
    lessonLabel: "درس 20 — هم‌نام‌ها"
  },
  {
    word: "lays/laze",
    meaning: "می‌چیند / تن‌پروری کردن",
    lesson: 20,
    lessonLabel: "درس 20 — هم‌نام‌ها"
  },
  {
    word: "mail/male",
    meaning: "پست / مرد",
    lesson: 20,
    lessonLabel: "درس 20 — هم‌نام‌ها"
  },
  {
    word: "meat/meet",
    meaning: "گوشت / ملاقات کردن",
    lesson: 20,
    lessonLabel: "درس 20 — هم‌نام‌ها"
  },
  {
    word: "mown/moan",
    meaning: "درو شده / ناله",
    lesson: 20,
    lessonLabel: "درس 20 — هم‌نام‌ها"
  },
  {
    word: "our/hour",
    meaning: "مال ما / ساعت",
    lesson: 20,
    lessonLabel: "درس 20 — هم‌نام‌ها"
  },
  {
    word: "pale/pail",
    meaning: "رنگ‌پریده / سطل",
    lesson: 20,
    lessonLabel: "درس 20 — هم‌نام‌ها"
  },
  {
    word: "pane/pain",
    meaning: "قطعه شیشه / درد",
    lesson: 20,
    lessonLabel: "درس 20 — هم‌نام‌ها"
  },
  {
    word: "pair/pear/pare",
    meaning: "جفت / گلابی / پوست کندن",
    lesson: 20,
    lessonLabel: "درس 20 — هم‌نام‌ها"
  },
  {
    word: "peal/peel",
    meaning: "صدای زنگ / پوست",
    lesson: 20,
    lessonLabel: "درس 20 — هم‌نام‌ها"
  },
  {
    word: "place/plaice",
    meaning: "مکان / نوعی ماهی",
    lesson: 20,
    lessonLabel: "درس 20 — هم‌نام‌ها"
  },
  {
    word: "practise/practice",
    meaning: "تمرین کردن (فعل) / تمرین (اسم)",
    lesson: 20,
    lessonLabel: "درس 20 — هم‌نام‌ها"
  },
  {
    word: "pray/prey",
    meaning: "دعا کردن / طعمه",
    lesson: 20,
    lessonLabel: "درس 20 — هم‌نام‌ها"
  },
  {
    word: "raise/rays",
    meaning: "بالا بردن / پرتوها",
    lesson: 20,
    lessonLabel: "درس 20 — هم‌نام‌ها"
  },
  {
    word: "read/reed",
    meaning: "خواندن / نی",
    lesson: 20,
    lessonLabel: "درس 20 — هم‌نام‌ها"
  },
  {
    word: "rein/rain",
    meaning: "عنان / باران",
    lesson: 20,
    lessonLabel: "درس 20 — هم‌نام‌ها"
  },
  {
    word: "right/rite/write",
    meaning: "درست / آیین / نوشتن",
    lesson: 20,
    lessonLabel: "درس 20 — هم‌نام‌ها"
  },
  {
    word: "sale/sail",
    meaning: "فروش / بادبان",
    lesson: 20,
    lessonLabel: "درس 20 — هم‌نام‌ها"
  },
  {
    word: "scene/seen",
    meaning: "صحنه / دیده‌شده",
    lesson: 20,
    lessonLabel: "درس 20 — هم‌نام‌ها"
  },
  {
    word: "sight/site",
    meaning: "دید / محل",
    lesson: 20,
    lessonLabel: "درس 20 — هم‌نام‌ها"
  },
  {
    word: "so/sew",
    meaning: "پس / دوختن",
    lesson: 20,
    lessonLabel: "درس 20 — هم‌نام‌ها"
  },
  {
    word: "sole/soul",
    meaning: "کف پا، تنها / روح",
    lesson: 20,
    lessonLabel: "درس 20 — هم‌نام‌ها"
  },
  {
    word: "some/sum",
    meaning: "چند / مجموع",
    lesson: 20,
    lessonLabel: "درس 20 — هم‌نام‌ها"
  },
  {
    word: "steak/stake",
    meaning: "استیک / میخ، سهم",
    lesson: 20,
    lessonLabel: "درس 20 — هم‌نام‌ها"
  },
  {
    word: "tea/tee",
    meaning: "چای / جای مخصوص توپ گلف",
    lesson: 20,
    lessonLabel: "درس 20 — هم‌نام‌ها"
  },
  {
    word: "there/their/they’re",
    meaning: "آنجا / مال آنها / آنها هستند",
    lesson: 20,
    lessonLabel: "درس 20 — هم‌نام‌ها"
  },
  {
    word: "through/threw",
    meaning: "از میان / پرتاب کرد",
    lesson: 20,
    lessonLabel: "درس 20 — هم‌نام‌ها"
  },
  {
    word: "tire/tyre",
    meaning: "خسته کردن / لاستیک",
    lesson: 20,
    lessonLabel: "درس 20 — هم‌نام‌ها"
  },
  {
    word: "toe/tow",
    meaning: "پنجه پا / یدک کشیدن",
    lesson: 20,
    lessonLabel: "درس 20 — هم‌نام‌ها"
  },
  {
    word: "waist/waste",
    meaning: "کمر / هدررفتگی",
    lesson: 20,
    lessonLabel: "درس 20 — هم‌نام‌ها"
  },
  {
    word: "wait/weight",
    meaning: "منتظر ماندن / وزن",
    lesson: 20,
    lessonLabel: "درس 20 — هم‌نام‌ها"
  },
  {
    word: "weak/week",
    meaning: "ضعیف / هفته",
    lesson: 20,
    lessonLabel: "درس 20 — هم‌نام‌ها"
  },
  {
    word: "weather/whether",
    meaning: "آب‌وهوا / اینکه",
    lesson: 20,
    lessonLabel: "درس 20 — هم‌نام‌ها"
  },
  {
    word: "whine/wine",
    meaning: "زاری / شراب",
    lesson: 20,
    lessonLabel: "درس 20 — هم‌نام‌ها"
  },
  {
    word: "would/wood",
    meaning: "خواهد (گذشتهٔ will) / چوب",
    lesson: 20,
    lessonLabel: "درس 20 — هم‌نام‌ها"
  }
];

export const VOCAB_PART_1: Row[] = ROWS;
