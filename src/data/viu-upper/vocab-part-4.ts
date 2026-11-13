// واژگان درس‌های English Vocabulary in Use — Upper-intermediate (پارتیت 4) — استخراج VLM از اسکن PDF
// word = عین چاپ کتاب · meaning = ترجمهٔ ماشینی GLM (کلاس FA-NEW — اثبات صحت ترجمه نیست)
import type { VocabWord } from "../types";

type Row = Omit<VocabWord, "lesson"> & { lesson: number; lessonLabel: string };

const ROWS: Row[] = [
  {
    word: "steal",
    meaning: "دزدیدن",
    lesson: 61,
    pos: "v.",
    lessonLabel: "درس 61 — جرم"
  },
  {
    word: "rob",
    meaning: "سرقت کردن (از شخص یا مکان)",
    lesson: 61,
    pos: "v.",
    lessonLabel: "درس 61 — جرم"
  },
  {
    word: "murder",
    meaning: "قتل",
    lesson: 61,
    pos: "n.",
    lessonLabel: "درس 61 — جرم"
  },
  {
    word: "murderer",
    meaning: "قاتل",
    lesson: 61,
    pos: "n.",
    lessonLabel: "درس 61 — جرم"
  },
  {
    word: "shoplifting",
    meaning: "خریدِ دزدی از فروشگاه",
    lesson: 61,
    pos: "n.",
    lessonLabel: "درس 61 — جرم"
  },
  {
    word: "shoplifter",
    meaning: "دزد مغازه",
    lesson: 61,
    pos: "n.",
    lessonLabel: "درس 61 — جرم"
  },
  {
    word: "shoplift",
    meaning: "دزدیدن کالا از مغازه",
    lesson: 61,
    pos: "v.",
    lessonLabel: "درس 61 — جرم"
  },
  {
    word: "burglary",
    meaning: "سرقت از منزل",
    lesson: 61,
    pos: "n.",
    lessonLabel: "درس 61 — جرم"
  },
  {
    word: "burglar",
    meaning: "سارق منزل",
    lesson: 61,
    pos: "n.",
    lessonLabel: "درس 61 — جرم"
  },
  {
    word: "burgle",
    meaning: "سرقت کردن از منزل",
    lesson: 61,
    pos: "v.",
    lessonLabel: "درس 61 — جرم"
  },
  {
    word: "smuggling",
    meaning: "قاچاق",
    lesson: 61,
    pos: "n.",
    lessonLabel: "درس 61 — جرم"
  },
  {
    word: "smuggler",
    meaning: "قاچاقچی",
    lesson: 61,
    pos: "n.",
    lessonLabel: "درس 61 — جرم"
  },
  {
    word: "smuggle",
    meaning: "قاچاق کردن",
    lesson: 61,
    pos: "v.",
    lessonLabel: "درس 61 — جرم"
  },
  {
    word: "kidnapping",
    meaning: "آدم‌ربایی",
    lesson: 61,
    pos: "n.",
    lessonLabel: "درس 61 — جرم"
  },
  {
    word: "kidnapper",
    meaning: "آدم‌ربا",
    lesson: 61,
    pos: "n.",
    lessonLabel: "درس 61 — جرم"
  },
  {
    word: "kidnap",
    meaning: "ربودن (آدم)",
    lesson: 61,
    pos: "v.",
    lessonLabel: "درس 61 — جرم"
  },
  {
    word: "commit a crime",
    meaning: "مرتکب جرم شدن",
    lesson: 61,
    pos: "phr.",
    lessonLabel: "درس 61 — جرم"
  },
  {
    word: "witness",
    meaning: "شاهد بودن / شاهد",
    lesson: 61,
    pos: "v.",
    lessonLabel: "درس 61 — جرم"
  },
  {
    word: "charge (someone) with",
    meaning: "متهم کردن (کسی) به",
    lesson: 61,
    pos: "phr.",
    lessonLabel: "درس 61 — جرم"
  },
  {
    word: "accuse (someone) of",
    meaning: "متهم کردن (کسی) به",
    lesson: 61,
    pos: "phr.",
    lessonLabel: "درس 61 — جرم"
  },
  {
    word: "accomplice",
    meaning: "همدست",
    lesson: 61,
    pos: "n.",
    lessonLabel: "درس 61 — جرم"
  },
  {
    word: "be tried",
    meaning: "محاکمه شدن",
    lesson: 61,
    pos: "phr.",
    lessonLabel: "درس 61 — جرم"
  },
  {
    word: "trial",
    meaning: "محاکمه",
    lesson: 61,
    pos: "n.",
    lessonLabel: "درس 61 — جرم"
  },
  {
    word: "plead not guilty",
    meaning: "اعلام بی‌گناهی در دادگاه",
    lesson: 61,
    pos: "phr.",
    lessonLabel: "درس 61 — جرم"
  },
  {
    word: "defend",
    meaning: "دفاع کردن",
    lesson: 61,
    pos: "v.",
    lessonLabel: "درس 61 — جرم"
  },
  {
    word: "prosecuting",
    meaning: "کیفرخواست‌کننده، شاکی",
    lesson: 61,
    pos: "adj.",
    lessonLabel: "درس 61 — جرم"
  },
  {
    word: "pass verdict",
    meaning: "رأی صادر کردن",
    lesson: 61,
    pos: "phr.",
    lessonLabel: "درس 61 — جرم"
  },
  {
    word: "guilty",
    meaning: "مقصر، مجرم",
    lesson: 61,
    pos: "adj.",
    lessonLabel: "درس 61 — جرم"
  },
  {
    word: "innocent",
    meaning: "بی‌گناه",
    lesson: 61,
    pos: "adj.",
    lessonLabel: "درس 61 — جرم"
  },
  {
    word: "acquit",
    meaning: "تبرئه کردن",
    lesson: 61,
    pos: "v.",
    lessonLabel: "درس 61 — جرم"
  },
  {
    word: "sentence",
    meaning: "محکوم کردن (به مجازات)",
    lesson: 61,
    pos: "v.",
    lessonLabel: "درس 61 — جرم"
  },
  {
    word: "pay a fine",
    meaning: "جریمه پرداخت کردن",
    lesson: 61,
    pos: "phr.",
    lessonLabel: "درس 61 — جرم"
  },
  {
    word: "serve (two years)",
    meaning: "(دو سال) دوران محکومیت را گذراندن",
    lesson: 61,
    pos: "phr.",
    lessonLabel: "درس 61 — جرم"
  },
  {
    word: "be released from prison",
    meaning: "از زندان آزاد شدن",
    lesson: 61,
    pos: "phr.",
    lessonLabel: "درس 61 — جرم"
  },
  {
    word: "get time off for good behaviour",
    meaning: "به دلیل رفتار خوب کاهش محکومیت گرفتن",
    lesson: 61,
    pos: "phr.",
    lessonLabel: "درس 61 — جرم"
  },
  {
    word: "case",
    meaning: "پرونده",
    lesson: 61,
    pos: "n.",
    lessonLabel: "درس 61 — جرم"
  },
  {
    word: "evidence",
    meaning: "ادله، شواهد",
    lesson: 61,
    pos: "n.",
    lessonLabel: "درس 61 — جرم"
  },
  {
    word: "proof",
    meaning: "اثبات، مدرک قاطع",
    lesson: 61,
    pos: "n.",
    lessonLabel: "درس 61 — جرم"
  },
  {
    word: "judge",
    meaning: "قاضی",
    lesson: 61,
    pos: "n.",
    lessonLabel: "درس 61 — جرم"
  },
  {
    word: "sentence (punishment)",
    meaning: "حکم (مجازات)",
    lesson: 61,
    pos: "n.",
    lessonLabel: "درس 61 — جرم"
  },
  {
    word: "jury",
    meaning: "هیئت منصفه",
    lesson: 61,
    pos: "n.",
    lessonLabel: "درس 61 — جرم"
  },
  {
    word: "verdict",
    meaning: "رأی هیئت منصفه",
    lesson: 61,
    pos: "n.",
    lessonLabel: "درس 61 — جرم"
  },
  {
    word: "cash",
    meaning: "پول نقد",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "cheque",
    meaning: "چک",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "credit card",
    meaning: "کارت اعتباری",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "bank",
    meaning: "بانک",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "current account",
    meaning: "حساب جاری",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "pay in your salary",
    meaning: "حقوق خود را واریز کردن",
    lesson: 62,
    pos: "phr.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "withdraw",
    meaning: "برداشت کردن (پول)",
    lesson: 62,
    pos: "v.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "pay your everyday bills",
    meaning: "پرداخت قبض‌های روزمره",
    lesson: 62,
    pos: "phr.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "bank statement",
    meaning: "صورت‌حساب بانکی",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "savings account",
    meaning: "حساب پس‌انداز",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "deposit",
    meaning: "سپرده گذاشتن؛ واریز کردن",
    lesson: 62,
    pos: "v.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "take money out",
    meaning: "پول برداشتن",
    lesson: 62,
    pos: "phr.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "spend",
    meaning: "خرج کردن",
    lesson: 62,
    pos: "v.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "overdraft",
    meaning: "برداشت بیش از موجودی",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "charge",
    meaning: "دستمزد/کارمزد گرفتن",
    lesson: 62,
    pos: "v.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "interest",
    meaning: "بهره (سود بانکی)",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "overdrawn",
    meaning: "بدهکار (حساب بیش از موجودی برداشت‌شده)",
    lesson: 62,
    pos: "adj.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "in the red",
    meaning: "در وضعیت بدهی (منفی)",
    lesson: 62,
    pos: "phr.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "in the black",
    meaning: "در وضعیت بستانکار (مثبت)",
    lesson: 62,
    pos: "phr.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "in credit",
    meaning: "بستانکار",
    lesson: 62,
    pos: "phr.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "bank loan",
    meaning: "وام بانکی",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "building society",
    meaning: "مؤسسه وام مسکن",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "mortgage",
    meaning: "وام رهنی (مسکن)",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "buy",
    meaning: "خریدن",
    lesson: 62,
    pos: "v.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "purchase",
    meaning: "خریدن (رسمی‌تر)",
    lesson: 62,
    pos: "v.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "pay for it outright",
    meaning: "تمام پول را یک‌جا پرداخت کردن",
    lesson: 62,
    pos: "phr.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "on credit",
    meaning: "نسیه؛ اعتباری",
    lesson: 62,
    pos: "phr.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "discount",
    meaning: "تخفیف",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "reduction",
    meaning: "کاهش قیمت",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "buy in bulk",
    meaning: "خرید عمده",
    lesson: 62,
    pos: "phr.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "haggle",
    meaning: "چانه زدن (روی قیمت)",
    lesson: 62,
    pos: "v.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "refund",
    meaning: "بازپرداخت؛ پس گرفتن پول",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "receipt",
    meaning: "رسید؛ فاکتور",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "fee / fees",
    meaning: "حق‌الزحمه؛ شهریه",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "fare",
    meaning: "کرایه (سفر)",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "good value",
    meaning: "ارزش خرید خوب",
    lesson: 62,
    pos: "phr.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "bargain",
    meaning: "خرید خوب و ارزان",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "not worth",
    meaning: "ن.nickارزش نداشتن",
    lesson: 62,
    pos: "phr.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "a rip-off",
    meaning: "کلاهی؛ گران‌فروشی",
    lesson: 62,
    pos: "phr.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "taxes",
    meaning: "مالیات‌ها",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "income tax",
    meaning: "مالیات بر درآمد",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "wages",
    meaning: "دستمزد",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "salaries",
    meaning: "حقوق‌ها",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "inheritance tax",
    meaning: "مالیات بر ارث",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "customs / excise duties",
    meaning: "عوارض گمرکی / مالیات بر کالاهای داخلی",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "VAT / value added tax",
    meaning: "مالیات بر ارزش افزوده",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "corporation tax",
    meaning: "مالیات شرکتی",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "tax rebate",
    meaning: "بازپرداخت مالیات",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "unemployment benefit",
    meaning: "مزایای بیکاری",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "the dole",
    meaning: "بیمه بیکاری (غیررسمی)",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "disability allowances",
    meaning: "مستمری معلولیت",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "student loans",
    meaning: "وام دانشجویی",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "draw a pension",
    meaning: "مستمری گرفتن",
    lesson: 62,
    pos: "phr.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "on social security",
    meaning: "دریافت‌کننده کمک‌های اجتماعی",
    lesson: 62,
    pos: "phr.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "currency",
    meaning: "واحد پول",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "rates of exchange",
    meaning: "نرخ تبدیل ارز",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "shares",
    meaning: "سهام",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "invested",
    meaning: "سرمایه‌گذاری کرده",
    lesson: 62,
    pos: "v.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "dividend",
    meaning: "سود سهام",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "investment",
    meaning: "سرمایه‌گذاری",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "profit",
    meaning: "سود",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "loss",
    meaning: "زیان",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — پول — خرید، فروش و پرداخت"
  },
  {
    word: "think",
    meaning: "فکر کردن",
    lesson: 63,
    pos: "v.",
    lessonLabel: "درس 63 — باور و نظر"
  },
  {
    word: "believe",
    meaning: "باور داشتن",
    lesson: 63,
    pos: "v.",
    lessonLabel: "درس 63 — باور و نظر"
  },
  {
    word: "be convinced",
    meaning: "مطمئن/متقاعد بودن",
    lesson: 63,
    pos: "v.",
    lessonLabel: "درس 63 — باور و نظر"
  },
  {
    word: "hold",
    meaning: "(باور یا عقیده‌ای را) داشتن",
    lesson: 63,
    pos: "v.",
    lessonLabel: "درس 63 — باور و نظر"
  },
  {
    word: "maintain",
    meaning: "پافشاری کردن بر عقیده‌ای",
    lesson: 63,
    pos: "v.",
    lessonLabel: "درس 63 — باور و نظر"
  },
  {
    word: "feel",
    meaning: "احساس کردن، عقیده داشتن",
    lesson: 63,
    pos: "v.",
    lessonLabel: "درس 63 — باور و نظر"
  },
  {
    word: "reckon",
    meaning: "(غیررسمی) گمان کردن، فکر کردن",
    lesson: 63,
    pos: "v.",
    lessonLabel: "درس 63 — باور و نظر"
  },
  {
    word: "doubt",
    meaning: "تردید داشتن، شک کردن",
    lesson: 63,
    pos: "v.",
    lessonLabel: "درس 63 — باور و نظر"
  },
  {
    word: "suspect",
    meaning: "گمان (منفی) داشتن",
    lesson: 63,
    pos: "v.",
    lessonLabel: "درس 63 — باور و نظر"
  },
  {
    word: "In my view",
    meaning: "به نظر من",
    lesson: 63,
    pos: "phr.",
    lessonLabel: "درس 63 — باور و نظر"
  },
  {
    word: "In my opinion",
    meaning: "به عقیده من",
    lesson: 63,
    pos: "phr.",
    lessonLabel: "درس 63 — باور و نظر"
  },
  {
    word: "to my mind",
    meaning: "به عقیده من (نسباً غیررسمی)",
    lesson: 63,
    pos: "phr.",
    lessonLabel: "درس 63 — باور و نظر"
  },
  {
    word: "If you ask me",
    meaning: "اگر بپرسی/نظر بخواهی",
    lesson: 63,
    pos: "phr.",
    lessonLabel: "درس 63 — باور و نظر"
  },
  {
    word: "point of view",
    meaning: "دیدگاه، نقطه نظر",
    lesson: 63,
    pos: "n.",
    lessonLabel: "درس 63 — باور و نظر"
  },
  {
    word: "believe in",
    meaning: "ایمان داشتن به",
    lesson: 63,
    pos: "phr.",
    lessonLabel: "درس 63 — باور و نظر"
  },
  {
    word: "views on",
    meaning: "نظرات دربارهٔ",
    lesson: 63,
    pos: "phr.",
    lessonLabel: "درس 63 — باور و نظر"
  },
  {
    word: "think of",
    meaning: "عقیده داشتن دربارهٔ",
    lesson: 63,
    pos: "phr.",
    lessonLabel: "درس 63 — باور و نظر"
  },
  {
    word: "for",
    meaning: "موافق",
    lesson: 63,
    pos: "phr.",
    lessonLabel: "درس 63 — باور و نظر"
  },
  {
    word: "against",
    meaning: "مخالف",
    lesson: 63,
    pos: "phr.",
    lessonLabel: "درس 63 — باور و نظر"
  },
  {
    word: "in favour of",
    meaning: "موافق، طرفدار",
    lesson: 63,
    pos: "phr.",
    lessonLabel: "درس 63 — باور و نظر"
  },
  {
    word: "opposed to",
    meaning: "مخالف با",
    lesson: 63,
    pos: "phr.",
    lessonLabel: "درس 63 — باور و نظر"
  },
  {
    word: "have one's doubts about",
    meaning: "دربارهٔ چیزی تردید داشتن",
    lesson: 63,
    pos: "phr.",
    lessonLabel: "درس 63 — باور و نظر"
  },
  {
    word: "beliefs",
    meaning: "باورها",
    lesson: 63,
    pos: "n.",
    lessonLabel: "درس 63 — باور و نظر"
  },
  {
    word: "ideologies",
    meaning: "ایدئولوژی‌ها",
    lesson: 63,
    pos: "n.",
    lessonLabel: "درس 63 — باور و نظر"
  },
  {
    word: "philosophies",
    meaning: "فلسفه‌ها",
    lesson: 63,
    pos: "n.",
    lessonLabel: "درس 63 — باور و نظر"
  },
  {
    word: "convictions",
    meaning: "عقاید راسخ",
    lesson: 63,
    pos: "n.",
    lessonLabel: "درس 63 — باور و نظر"
  },
  {
    word: "left-/right-wing",
    meaning: "چپ‌گرا/راست‌گرا",
    lesson: 63,
    pos: "adj.",
    lessonLabel: "درس 63 — باور و نظر"
  },
  {
    word: "socialist",
    meaning: "سوسیالیست",
    lesson: 63,
    pos: "n.",
    lessonLabel: "درس 63 — باور و نظر"
  },
  {
    word: "conservative",
    meaning: "محافظه‌کار",
    lesson: 63,
    pos: "adj.",
    lessonLabel: "درس 63 — باور و نظر"
  },
  {
    word: "intellectual",
    meaning: "روشنفکر",
    lesson: 63,
    pos: "adj.",
    lessonLabel: "درس 63 — باور و نظر"
  },
  {
    word: "personal",
    meaning: "شخصی",
    lesson: 63,
    pos: "adj.",
    lessonLabel: "درس 63 — باور و نظر"
  },
  {
    word: "Darwinist",
    meaning: "داروینیست",
    lesson: 63,
    pos: "n.",
    lessonLabel: "درس 63 — باور و نظر"
  },
  {
    word: "vegetarian",
    meaning: "گیاه‌خوار",
    lesson: 63,
    pos: "n.",
    lessonLabel: "درس 63 — باور و نظر"
  },
  {
    word: "religious",
    meaning: "مذهبی",
    lesson: 63,
    pos: "adj.",
    lessonLabel: "درس 63 — باور و نظر"
  },
  {
    word: "Muslim",
    meaning: "مسلمان",
    lesson: 63,
    pos: "n.",
    lessonLabel: "درس 63 — باور و نظر"
  },
  {
    word: "morals",
    meaning: "اخلاقیات",
    lesson: 63,
    pos: "n.",
    lessonLabel: "درس 63 — باور و نظر"
  },
  {
    word: "pacifist",
    meaning: "صلح‌جو، صلح‌طلب",
    lesson: 63,
    pos: "n.",
    lessonLabel: "درس 63 — باور و نظر"
  },
  {
    word: "fanatical",
    meaning: "متعصب، افراطی",
    lesson: 63,
    pos: "adj.",
    lessonLabel: "درس 63 — باور و نظر"
  },
  {
    word: "obsessive",
    meaning: "وسواسی، افراطی",
    lesson: 63,
    pos: "adj.",
    lessonLabel: "درس 63 — باور و نظر"
  },
  {
    word: "eccentric",
    meaning: "عجیب و غریب",
    lesson: 63,
    pos: "adj.",
    lessonLabel: "درس 63 — باور و نظر"
  },
  {
    word: "odd",
    meaning: "عجیب، عومی",
    lesson: 63,
    pos: "adj.",
    lessonLabel: "درس 63 — باور و نظر"
  },
  {
    word: "traditional",
    meaning: "سنتی، سنت‌گرا",
    lesson: 63,
    pos: "adj.",
    lessonLabel: "درس 63 — باور و نظر"
  },
  {
    word: "middle-of-the-road",
    meaning: "اعتدالی",
    lesson: 63,
    pos: "adj.",
    lessonLabel: "درس 63 — باور و نظر"
  },
  {
    word: "moderate",
    meaning: "معتدل",
    lesson: 63,
    pos: "adj.",
    lessonLabel: "درس 63 — باور و نظر"
  },
  {
    word: "dedicated",
    meaning: "ازخودگذشته، وقف‌شده",
    lesson: 63,
    pos: "adj.",
    lessonLabel: "درس 63 — باور و نظر"
  },
  {
    word: "committed",
    meaning: "متعهد",
    lesson: 63,
    pos: "adj.",
    lessonLabel: "درس 63 — باور و نظر"
  },
  {
    word: "firm",
    meaning: "محکم، راسخ",
    lesson: 63,
    pos: "adj.",
    lessonLabel: "درس 63 — باور و نظر"
  },
  {
    word: "strong",
    meaning: "قوی، راسخ",
    lesson: 63,
    pos: "adj.",
    lessonLabel: "درس 63 — باور و نظر"
  },
  {
    word: "ecstatic",
    meaning: "سرخوش / بی‌حال از خوشی",
    lesson: 64,
    pos: "adj.",
    lessonLabel: "درس 64 — احساسات خوشایند و ناخوشایند"
  },
  {
    word: "content(ed)",
    meaning: "راضی، خرسند",
    lesson: 64,
    pos: "adj.",
    lessonLabel: "درس 64 — احساسات خوشایند و ناخوشایند"
  },
  {
    word: "cheerful",
    meaning: "شاد و سرزنده",
    lesson: 64,
    pos: "adj.",
    lessonLabel: "درس 64 — احساسات خوشایند و ناخوشایند"
  },
  {
    word: "grateful",
    meaning: "سپاسگزار، ممنون",
    lesson: 64,
    pos: "adj.",
    lessonLabel: "درس 64 — احساسات خوشایند و ناخوشایند"
  },
  {
    word: "thoughtful",
    meaning: "مهربان و باملاحظه",
    lesson: 64,
    pos: "adj.",
    lessonLabel: "درس 64 — احساسات خوشایند و ناخوشایند"
  },
  {
    word: "delighted",
    meaning: "خوشحال و مسرور",
    lesson: 64,
    pos: "adj.",
    lessonLabel: "درس 64 — احساسات خوشایند و ناخوشایند"
  },
  {
    word: "miserable",
    meaning: "بدبخت، تیره‌روز",
    lesson: 64,
    pos: "adj.",
    lessonLabel: "درس 64 — احساسات خوشایند و ناخوشایند"
  },
  {
    word: "discontented",
    meaning: "ناراضی",
    lesson: 64,
    pos: "adj.",
    lessonLabel: "درس 64 — احساسات خوشایند و ناخوشایند"
  },
  {
    word: "satisfaction",
    meaning: "رضایت",
    lesson: 64,
    pos: "n.",
    lessonLabel: "درس 64 — احساسات خوشایند و ناخوشایند"
  },
  {
    word: "fed-up / sick and tired",
    meaning: "خیلی حظرم رفته، به‌هوآل شده",
    lesson: 64,
    pos: "adj.",
    lessonLabel: "درس 64 — احساسات خوشایند و ناخوشایند"
  },
  {
    word: "depressed",
    meaning: "افسرده",
    lesson: 64,
    pos: "adj.",
    lessonLabel: "درس 64 — احساسات خوشایند و ناخوشایند"
  },
  {
    word: "depression",
    meaning: "افسردگی",
    lesson: 64,
    pos: "n.",
    lessonLabel: "درس 64 — احساسات خوشایند و ناخوشایند"
  },
  {
    word: "frustrated",
    meaning: "کلافه و محروم از نتیجه",
    lesson: 64,
    pos: "adj.",
    lessonLabel: "درس 64 — احساسات خوشایند و ناخوشایند"
  },
  {
    word: "confused / mixed up",
    meaning: "گیج و آشفته",
    lesson: 64,
    pos: "adj.",
    lessonLabel: "درس 64 — احساسات خوشایند و ناخوشایند"
  },
  {
    word: "excited",
    meaning: "هیجان‌زده",
    lesson: 64,
    pos: "adj.",
    lessonLabel: "درس 64 — احساسات خوشایند و ناخوشایند"
  },
  {
    word: "inspired",
    meaning: "الهام‌گرفته",
    lesson: 64,
    pos: "adj.",
    lessonLabel: "درس 64 — احساسات خوشایند و ناخوشایند"
  },
  {
    word: "enthusiastic",
    meaning: "پرشور، مشتاق",
    lesson: 64,
    pos: "adj.",
    lessonLabel: "درس 64 — احساسات خوشایند و ناخوشایند"
  },
  {
    word: "thrilled",
    meaning: "ذوق‌زده (غیررسمی)",
    lesson: 64,
    pos: "adj.",
    lessonLabel: "درس 64 — احساسات خوشایند و ناخوشایند"
  },
  {
    word: "cross",
    meaning: "عصبانی (غیررسمی، معمولاً درباره بچه‌ها)",
    lesson: 64,
    pos: "adj.",
    lessonLabel: "درس 64 — احساسات خوشایند و ناخوشایند"
  },
  {
    word: "furious",
    meaning: "خیلی عصبانی، خشمگین",
    lesson: 64,
    pos: "adj.",
    lessonLabel: "درس 64 — احساسات خوشایند و ناخوشایند"
  },
  {
    word: "livid",
    meaning: "خشمگین (غیررسمی)",
    lesson: 64,
    pos: "adj.",
    lessonLabel: "درس 64 — احساسات خوشایند و ناخوشایند"
  },
  {
    word: "seething",
    meaning: "در حال جوش خوردن از خشم (غیررسمی)",
    lesson: 64,
    pos: "adj.",
    lessonLabel: "درس 64 — احساسات خوشایند و ناخوشایند"
  },
  {
    word: "in a rage/fury",
    meaning: "در حال خشم و غضب",
    lesson: 64,
    pos: "phr.",
    lessonLabel: "درس 64 — احساسات خوشایند و ناخوشایند"
  },
  {
    word: "anxious",
    meaning: "نگران و مضطرب",
    lesson: 64,
    pos: "adj.",
    lessonLabel: "درس 64 — احساسات خوشایند و ناخوشایند"
  },
  {
    word: "nervous",
    meaning: "دل‌مورور، عصبی",
    lesson: 64,
    pos: "adj.",
    lessonLabel: "درس 64 — احساسات خوشایند و ناخوشایند"
  },
  {
    word: "apprehensive",
    meaning: "دل‌نگران (درباره آینده)",
    lesson: 64,
    pos: "adj.",
    lessonLabel: "درس 64 — احساسات خوشایند و ناخوشایند"
  },
  {
    word: "worried",
    meaning: "نگران",
    lesson: 64,
    pos: "adj.",
    lessonLabel: "درس 64 — احساسات خوشایند و ناخوشایند"
  },
  {
    word: "upset",
    meaning: "دل‌شکسته، آزرده",
    lesson: 64,
    pos: "adj.",
    lessonLabel: "درس 64 — احساسات خوشایند و ناخوشایند"
  },
  {
    word: "like",
    meaning: "دوست داشتن، لایک بودن",
    lesson: 65,
    pos: "v.",
    lessonLabel: "درس 65 — علاقه، بی‌علاقگی و خواسته"
  },
  {
    word: "fancy",
    meaning: "علاقه داشتن به، دل داشتن به",
    lesson: 65,
    pos: "v.",
    lessonLabel: "درس 65 — علاقه، بی‌علاقگی و خواسته"
  },
  {
    word: "tempted",
    meaning: "وسوسه‌شده",
    lesson: 65,
    pos: "adj.",
    lessonLabel: "درس 65 — علاقه، بی‌علاقگی و خواسته"
  },
  {
    word: "enjoy",
    meaning: "لذت بردن از",
    lesson: 65,
    pos: "v.",
    lessonLabel: "درس 65 — علاقه، بی‌علاقگی و خواسته"
  },
  {
    word: "fascinate",
    meaning: "مسحور کردن",
    lesson: 65,
    pos: "v.",
    lessonLabel: "درس 65 — علاقه، بی‌علاقگی و خواسته"
  },
  {
    word: "attract",
    meaning: "جذب کردن",
    lesson: 65,
    pos: "v.",
    lessonLabel: "درس 65 — علاقه، بی‌علاقگی و خواسته"
  },
  {
    word: "keen on",
    meaning: "علاقه‌مند به",
    lesson: 65,
    pos: "adj.",
    lessonLabel: "درس 65 — علاقه، بی‌علاقگی و خواسته"
  },
  {
    word: "fall in love (with)",
    meaning: "عاشق شدن",
    lesson: 65,
    pos: "phr.",
    lessonLabel: "درس 65 — علاقه، بی‌علاقگی و خواسته"
  },
  {
    word: "appeal to",
    meaning: "خوش آمدن، جذاب بودن برای",
    lesson: 65,
    pos: "phr.",
    lessonLabel: "درس 65 — علاقه، بی‌علاقگی و خواسته"
  },
  {
    word: "captivated by",
    meaning: "افسون‌شده توسط",
    lesson: 65,
    pos: "adj.",
    lessonLabel: "درس 65 — علاقه، بی‌علاقگی و خواسته"
  },
  {
    word: "adore",
    meaning: "پرستیدن، عاشق بودن",
    lesson: 65,
    pos: "v.",
    lessonLabel: "درس 65 — علاقه، بی‌علاقگی و خواسته"
  },
  {
    word: "fall for",
    meaning: "دل باختن به",
    lesson: 65,
    pos: "phr.",
    lessonLabel: "درس 65 — علاقه، بی‌علاقگی و خواسته"
  },
  {
    word: "caring",
    meaning: "مهربان، با محبت",
    lesson: 65,
    pos: "adj.",
    lessonLabel: "درس 65 — علاقه، بی‌علاقگی و خواسته"
  },
  {
    word: "fond of",
    meaning: "علاقه‌مند به",
    lesson: 65,
    pos: "adj.",
    lessonLabel: "درس 65 — علاقه، بی‌علاقگی و خواسته"
  },
  {
    word: "affectionate",
    meaning: "دلسوز و محبت‌آمیز",
    lesson: 65,
    pos: "adj.",
    lessonLabel: "درس 65 — علاقه، بی‌علاقگی و خواسته"
  },
  {
    word: "loving",
    meaning: "بامحبت",
    lesson: 65,
    pos: "adj.",
    lessonLabel: "درس 65 — علاقه، بی‌علاقگی و خواسته"
  },
  {
    word: "passionate about",
    meaning: "پرخاشگر و عاشق نسبت به",
    lesson: 65,
    pos: "adj.",
    lessonLabel: "درس 65 — علاقه، بی‌علاقگی و خواسته"
  },
  {
    word: "care for",
    meaning: "مراقبت کردن از، دوست داشتن",
    lesson: 65,
    pos: "phr.",
    lessonLabel: "درس 65 — علاقه، بی‌علاقگی و خواسته"
  },
  {
    word: "worship",
    meaning: "پرستیدن",
    lesson: 65,
    pos: "v.",
    lessonLabel: "درس 65 — علاقه، بی‌علاقگی و خواسته"
  },
  {
    word: "devoted to",
    meaning: "متعهد و دلبسته به",
    lesson: 65,
    pos: "adj.",
    lessonLabel: "درس 65 — علاقه، بی‌علاقگی و خواسته"
  },
  {
    word: "loathe",
    meaning: "بیزار بودن از، متنفر شدید بودن",
    lesson: 65,
    pos: "v.",
    lessonLabel: "درس 65 — علاقه، بی‌علاقگی و خواسته"
  },
  {
    word: "detest",
    meaning: "متنفر بودن از",
    lesson: 65,
    pos: "v.",
    lessonLabel: "درس 65 — علاقه، بی‌علاقگی و خواسته"
  },
  {
    word: "despise",
    meaning: "تحقیر کردن، حقیر شمردن",
    lesson: 65,
    pos: "v.",
    lessonLabel: "درس 65 — علاقه، بی‌علاقگی و خواسته"
  },
  {
    word: "hate",
    meaning: "متنفر بودن از",
    lesson: 65,
    pos: "v.",
    lessonLabel: "درس 65 — علاقه، بی‌علاقگی و خواسته"
  },
  {
    word: "cannot stand",
    meaning: "تحمل نکردن",
    lesson: 65,
    pos: "phr.",
    lessonLabel: "درس 65 — علاقه، بی‌علاقگی و خواسته"
  },
  {
    word: "cannot bear",
    meaning: "تاب نیاوردن",
    lesson: 65,
    pos: "phr.",
    lessonLabel: "درس 65 — علاقه، بی‌علاقگی و خواسته"
  },
  {
    word: "repel",
    meaning: "دفع کردن، نفرت‌انگیز بودن",
    lesson: 65,
    pos: "v.",
    lessonLabel: "درس 65 — علاقه، بی‌علاقگی و خواسته"
  },
  {
    word: "revolt",
    meaning: "مأوس کردن، برآشفتن",
    lesson: 65,
    pos: "v.",
    lessonLabel: "درس 65 — علاقه، بی‌علاقگی و خواسته"
  },
  {
    word: "appal",
    meaning: "قفل کردن، وحشت‌زده کردن",
    lesson: 65,
    pos: "v.",
    lessonLabel: "درس 65 — علاقه، بی‌علاقگی و خواسته"
  },
  {
    word: "disgust",
    meaning: "حالت آوردن، نفرت‌انگیز بودن",
    lesson: 65,
    pos: "v.",
    lessonLabel: "درس 65 — علاقه، بی‌علاقگی و خواسته"
  },
  {
    word: "desire",
    meaning: "خواستن، اشتیاق داشتن",
    lesson: 65,
    pos: "v.",
    lessonLabel: "درس 65 — علاقه، بی‌علاقگی و خواسته"
  },
  {
    word: "look forward to",
    meaning: "بی‌صبرانه منتظر بودن",
    lesson: 65,
    pos: "phr.",
    lessonLabel: "درس 65 — علاقه، بی‌علاقگی و خواسته"
  },
  {
    word: "dread",
    meaning: "از چیزی هراس داشتن",
    lesson: 65,
    pos: "v.",
    lessonLabel: "درس 65 — علاقه، بی‌علاقگی و خواسته"
  },
  {
    word: "long for",
    meaning: "شدیداً آرزو کردن",
    lesson: 65,
    pos: "phr.",
    lessonLabel: "درس 65 — علاقه، بی‌علاقگی و خواسته"
  },
  {
    word: "yearn for",
    meaning: "تشنه و مشتاق بودن به",
    lesson: 65,
    pos: "phr.",
    lessonLabel: "درس 65 — علاقه، بی‌علاقگی و خواسته"
  },
  {
    word: "dearest",
    meaning: "عزیزترین (خطاب محبت‌آمیز)",
    lesson: 65,
    lessonLabel: "درس 65 — علاقه، بی‌علاقگی و خواسته"
  },
  {
    word: "sweetheart",
    meaning: "عزیزجان، معشوق",
    lesson: 65,
    pos: "n.",
    lessonLabel: "درس 65 — علاقه، بی‌علاقگی و خواسته"
  },
  {
    word: "darling",
    meaning: "عزیزم",
    lesson: 65,
    pos: "n.",
    lessonLabel: "درس 65 — علاقه، بی‌علاقگی و خواسته"
  },
  {
    word: "love",
    meaning: "عزیزم (خطاب محبت‌آمیز)",
    lesson: 65,
    pos: "n.",
    lessonLabel: "درس 65 — علاقه، بی‌علاقگی و خواسته"
  },
  {
    word: "dear",
    meaning: "عزیزم",
    lesson: 65,
    pos: "n.",
    lessonLabel: "درس 65 — علاقه، بی‌علاقگی و خواسته"
  },
  {
    word: "pet",
    meaning: "گلم (خطاب محبت‌آمیز، عمدتاً برای کودکان)",
    lesson: 65,
    pos: "n.",
    lessonLabel: "درس 65 — علاقه، بی‌علاقگی و خواسته"
  },
  {
    word: "whisper",
    meaning: "آهسته گفتن، زمزمه کردن",
    lesson: 66,
    pos: "v.",
    lessonLabel: "درس 66 — گفتن (صحبت کردن)"
  },
  {
    word: "murmur",
    meaning: "زمزمه کردن",
    lesson: 66,
    pos: "v.",
    lessonLabel: "درس 66 — گفتن (صحبت کردن)"
  },
  {
    word: "mumble",
    meaning: "زیر لب گفتن (نامفهوم)",
    lesson: 66,
    pos: "v.",
    lessonLabel: "درس 66 — گفتن (صحبت کردن)"
  },
  {
    word: "mutter",
    meaning: "غر زدن، زیر لب غرغر کردن",
    lesson: 66,
    pos: "v.",
    lessonLabel: "درس 66 — گفتن (صحبت کردن)"
  },
  {
    word: "shout",
    meaning: "بلند فریاد زدن",
    lesson: 66,
    pos: "v.",
    lessonLabel: "درس 66 — گفتن (صحبت کردن)"
  },
  {
    word: "scream",
    meaning: "جیغ زدن",
    lesson: 66,
    pos: "v.",
    lessonLabel: "درس 66 — گفتن (صحبت کردن)"
  },
  {
    word: "shriek",
    meaning: "جیغ تیز کشیدن",
    lesson: 66,
    pos: "v.",
    lessonLabel: "درس 66 — گفتن (صحبت کردن)"
  },
  {
    word: "stutter",
    meaning: "لکنت زبان داشتن",
    lesson: 66,
    pos: "v.",
    lessonLabel: "درس 66 — گفتن (صحبت کردن)"
  },
  {
    word: "stammer",
    meaning: "لکنت داشتن",
    lesson: 66,
    pos: "v.",
    lessonLabel: "درس 66 — گفتن (صحبت کردن)"
  },
  {
    word: "boast",
    meaning: "لاف زدن، پز دادن",
    lesson: 66,
    pos: "v.",
    lessonLabel: "درس 66 — گفتن (صحبت کردن)"
  },
  {
    word: "insist",
    meaning: "اصرار کردن، پافشاری کردن",
    lesson: 66,
    pos: "v.",
    lessonLabel: "درس 66 — گفتن (صحبت کردن)"
  },
  {
    word: "object",
    meaning: "اعتراض کردن",
    lesson: 66,
    pos: "v.",
    lessonLabel: "درس 66 — گفتن (صحبت کردن)"
  },
  {
    word: "threaten",
    meaning: "تهدید کردن",
    lesson: 66,
    pos: "v.",
    lessonLabel: "درس 66 — گفتن (صحبت کردن)"
  },
  {
    word: "argue",
    meaning: "بحث و جدل کردن",
    lesson: 66,
    pos: "v.",
    lessonLabel: "درس 66 — گفتن (صحبت کردن)"
  },
  {
    word: "groan",
    meaning: "ناله کردن",
    lesson: 66,
    pos: "v.",
    lessonLabel: "درس 66 — گفتن (صحبت کردن)"
  },
  {
    word: "complain",
    meaning: "شکایت کردن",
    lesson: 66,
    pos: "v.",
    lessonLabel: "درس 66 — گفتن (صحبت کردن)"
  },
  {
    word: "maintain",
    meaning: "اظهار کردن، معتقد بودن",
    lesson: 66,
    pos: "v.",
    lessonLabel: "درس 66 — گفتن (صحبت کردن)"
  },
  {
    word: "confess",
    meaning: "اعتراف کردن",
    lesson: 66,
    pos: "v.",
    lessonLabel: "درس 66 — گفتن (صحبت کردن)"
  },
  {
    word: "urge",
    meaning: "ترغیب و تشویق کردن",
    lesson: 66,
    pos: "v.",
    lessonLabel: "درس 66 — گفتن (صحبت کردن)"
  },
  {
    word: "beg",
    meaning: "التماس کردن، گدایی کردن",
    lesson: 66,
    pos: "v.",
    lessonLabel: "درس 66 — گفتن (صحبت کردن)"
  },
  {
    word: "grumble",
    meaning: "غرغر کردن",
    lesson: 66,
    pos: "v.",
    lessonLabel: "درس 66 — گفتن (صحبت کردن)"
  },
  {
    word: "crossly",
    meaning: "با عصبانیت",
    lesson: 66,
    pos: "adv.",
    lessonLabel: "درس 66 — گفتن (صحبت کردن)"
  },
  {
    word: "furiously",
    meaning: "با شدت و خشم",
    lesson: 66,
    pos: "adv.",
    lessonLabel: "درس 66 — گفتن (صحبت کردن)"
  },
  {
    word: "bitterly",
    meaning: "با تلخی",
    lesson: 66,
    pos: "adv.",
    lessonLabel: "درس 66 — گفتن (صحبت کردن)"
  },
  {
    word: "unhappily",
    meaning: "با ناخوشی",
    lesson: 66,
    pos: "adv.",
    lessonLabel: "درس 66 — گفتن (صحبت کردن)"
  },
  {
    word: "gloomily",
    meaning: "با افسردگی",
    lesson: 66,
    pos: "adv.",
    lessonLabel: "درس 66 — گفتن (صحبت کردن)"
  },
  {
    word: "miserably",
    meaning: "با بدبختی/تیرگی",
    lesson: 66,
    pos: "adv.",
    lessonLabel: "درس 66 — گفتن (صحبت کردن)"
  },
  {
    word: "uneasily",
    meaning: "با نگرانی و بی‌قراری",
    lesson: 66,
    pos: "adv.",
    lessonLabel: "درس 66 — گفتن (صحبت کردن)"
  },
  {
    word: "sadly",
    meaning: "با غم و اندوه",
    lesson: 66,
    pos: "adv.",
    lessonLabel: "درس 66 — گفتن (صحبت کردن)"
  },
  {
    word: "happily",
    meaning: "با خوشحالی",
    lesson: 66,
    pos: "adv.",
    lessonLabel: "درس 66 — گفتن (صحبت کردن)"
  },
  {
    word: "cheerfully",
    meaning: "با شادابی",
    lesson: 66,
    pos: "adv.",
    lessonLabel: "درس 66 — گفتن (صحبت کردن)"
  },
  {
    word: "gladly",
    meaning: "با کمال میل",
    lesson: 66,
    pos: "adv.",
    lessonLabel: "درس 66 — گفتن (صحبت کردن)"
  },
  {
    word: "hopefully",
    meaning: "با امید",
    lesson: 66,
    pos: "adv.",
    lessonLabel: "درس 66 — گفتن (صحبت کردن)"
  },
  {
    word: "eagerly",
    meaning: "با اشتیاق",
    lesson: 66,
    pos: "adv.",
    lessonLabel: "درس 66 — گفتن (صحبت کردن)"
  },
  {
    word: "anxiously",
    meaning: "با نگرانی و اضطراب",
    lesson: 66,
    pos: "adv.",
    lessonLabel: "درس 66 — گفتن (صحبت کردن)"
  },
  {
    word: "nervously",
    meaning: "با عصبی بودن",
    lesson: 66,
    pos: "adv.",
    lessonLabel: "درس 66 — گفتن (صحبت کردن)"
  },
  {
    word: "desperately",
    meaning: "با ناامیدی و شدت",
    lesson: 66,
    pos: "adv.",
    lessonLabel: "درس 66 — گفتن (صحبت کردن)"
  },
  {
    word: "hopelessly",
    meaning: "با ناامیدی",
    lesson: 66,
    pos: "adv.",
    lessonLabel: "درس 66 — گفتن (صحبت کردن)"
  },
  {
    word: "boldly",
    meaning: "با جسارت",
    lesson: 66,
    pos: "adv.",
    lessonLabel: "درس 66 — گفتن (صحبت کردن)"
  },
  {
    word: "excitedly",
    meaning: "با هیجان",
    lesson: 66,
    pos: "adv.",
    lessonLabel: "درس 66 — گفتن (صحبت کردن)"
  },
  {
    word: "gratefully",
    meaning: "با قدردانی",
    lesson: 66,
    pos: "adv.",
    lessonLabel: "درس 66 — گفتن (صحبت کردن)"
  },
  {
    word: "impatiently",
    meaning: "با بی‌صبری",
    lesson: 66,
    pos: "adv.",
    lessonLabel: "درس 66 — گفتن (صحبت کردن)"
  },
  {
    word: "passionately",
    meaning: "با شدت احساسات",
    lesson: 66,
    pos: "adv.",
    lessonLabel: "درس 66 — گفتن (صحبت کردن)"
  },
  {
    word: "reluctantly",
    meaning: "با اکراه",
    lesson: 66,
    pos: "adv.",
    lessonLabel: "درس 66 — گفتن (صحبت کردن)"
  },
  {
    word: "shyly",
    meaning: "با خجالت",
    lesson: 66,
    pos: "adv.",
    lessonLabel: "درس 66 — گفتن (صحبت کردن)"
  },
  {
    word: "sincerely",
    meaning: "با صداقت",
    lesson: 66,
    pos: "adv.",
    lessonLabel: "درس 66 — گفتن (صحبت کردن)"
  },
  {
    word: "speech impediment",
    meaning: "عیب و نقص گفتار",
    lesson: 66,
    pos: "phr.",
    lessonLabel: "درس 66 — گفتن (صحبت کردن)"
  },
  {
    word: "sight",
    meaning: "بینایی",
    lesson: 67,
    pos: "n.",
    lessonLabel: "درس 67 — حس‌های شش‌گانه"
  },
  {
    word: "hearing",
    meaning: "شنوایی",
    lesson: 67,
    pos: "n.",
    lessonLabel: "درس 67 — حس‌های شش‌گانه"
  },
  {
    word: "taste",
    meaning: "چشایی",
    lesson: 67,
    pos: "n.",
    lessonLabel: "درس 67 — حس‌های شش‌گانه"
  },
  {
    word: "touch",
    meaning: "لمس",
    lesson: 67,
    pos: "n.",
    lessonLabel: "درس 67 — حس‌های شش‌گانه"
  },
  {
    word: "smell",
    meaning: "بویایی",
    lesson: 67,
    pos: "n.",
    lessonLabel: "درس 67 — حس‌های شش‌گانه"
  },
  {
    word: "sixth sense",
    meaning: "حس ششم",
    lesson: 67,
    pos: "n.",
    lessonLabel: "درس 67 — حس‌های شش‌گانه"
  },
  {
    word: "extrasensory perception",
    meaning: "ادراک فراحسی",
    lesson: 67,
    pos: "n.",
    lessonLabel: "درس 67 — حس‌های شش‌گانه"
  },
  {
    word: "supernatural",
    meaning: "فراطبیعی",
    lesson: 67,
    pos: "adj.",
    lessonLabel: "درس 67 — حس‌های شش‌گانه"
  },
  {
    word: "glance",
    meaning: "نگاهی انداختن (سریع)",
    lesson: 67,
    pos: "v.",
    lessonLabel: "درس 67 — حس‌های شش‌گانه"
  },
  {
    word: "notice",
    meaning: "متوجه شدن",
    lesson: 67,
    pos: "v.",
    lessonLabel: "درس 67 — حس‌های شش‌گانه"
  },
  {
    word: "observe",
    meaning: "مشاهده کردن",
    lesson: 67,
    pos: "v.",
    lessonLabel: "درس 67 — حس‌های شش‌گانه"
  },
  {
    word: "glimpse",
    meaning: "نگاهی گذرا داشتن",
    lesson: 67,
    pos: "v.",
    lessonLabel: "درس 67 — حس‌های شش‌گانه"
  },
  {
    word: "peer",
    meaning: "زیر و زبر نگاه کردن",
    lesson: 67,
    pos: "v.",
    lessonLabel: "درس 67 — حس‌های شش‌گانه"
  },
  {
    word: "gaze",
    meaning: "خیره شدن",
    lesson: 67,
    pos: "v.",
    lessonLabel: "درس 67 — حس‌های شش‌گانه"
  },
  {
    word: "stare",
    meaning: "خیره خیره نگاه کردن",
    lesson: 67,
    pos: "v.",
    lessonLabel: "درس 67 — حس‌های شش‌گانه"
  },
  {
    word: "witness",
    meaning: "شاهد بودن",
    lesson: 67,
    pos: "v.",
    lessonLabel: "درس 67 — حس‌های شش‌گانه"
  },
  {
    word: "noiseless",
    meaning: "بی‌صدا",
    lesson: 67,
    pos: "adj.",
    lessonLabel: "درس 67 — حس‌های شش‌گانه"
  },
  {
    word: "silent",
    meaning: "ساکت",
    lesson: 67,
    pos: "adj.",
    lessonLabel: "درس 67 — حس‌های شش‌گانه"
  },
  {
    word: "quiet",
    meaning: "آرام",
    lesson: 67,
    pos: "adj.",
    lessonLabel: "درس 67 — حس‌های شش‌گانه"
  },
  {
    word: "noisy",
    meaning: "پرصدا",
    lesson: 67,
    pos: "adj.",
    lessonLabel: "درس 67 — حس‌های شش‌گانه"
  },
  {
    word: "loud",
    meaning: "بلند",
    lesson: 67,
    pos: "adj.",
    lessonLabel: "درس 67 — حس‌های شش‌گانه"
  },
  {
    word: "deafening",
    meaning: "گوش‌خراش",
    lesson: 67,
    pos: "adj.",
    lessonLabel: "درس 67 — حس‌های شش‌گانه"
  },
  {
    word: "sweet",
    meaning: "شیرین",
    lesson: 67,
    pos: "adj.",
    lessonLabel: "درس 67 — حس‌های شش‌گانه"
  },
  {
    word: "salty",
    meaning: "شور",
    lesson: 67,
    pos: "adj.",
    lessonLabel: "درس 67 — حس‌های شش‌گانه"
  },
  {
    word: "bitter",
    meaning: "تلخ",
    lesson: 67,
    pos: "adj.",
    lessonLabel: "درس 67 — حس‌های شش‌گانه"
  },
  {
    word: "sour",
    meaning: "ترش",
    lesson: 67,
    pos: "adj.",
    lessonLabel: "درس 67 — حس‌های شش‌گانه"
  },
  {
    word: "spicy",
    meaning: "تند (ادویه‌دار)",
    lesson: 67,
    pos: "adj.",
    lessonLabel: "درس 67 — حس‌های شش‌گانه"
  },
  {
    word: "hot",
    meaning: "تند/داغ",
    lesson: 67,
    pos: "adj.",
    lessonLabel: "درس 67 — حس‌های شش‌گانه"
  },
  {
    word: "tasty",
    meaning: "خوش‌مزه",
    lesson: 67,
    pos: "adj.",
    lessonLabel: "درس 67 — حس‌های شش‌گانه"
  },
  {
    word: "tasteful",
    meaning: "با سلیقه",
    lesson: 67,
    pos: "adj.",
    lessonLabel: "درس 67 — حس‌های شش‌گانه"
  },
  {
    word: "tasteless",
    meaning: "بی‌مزه/بی‌سلیقه",
    lesson: 67,
    pos: "adj.",
    lessonLabel: "درس 67 — حس‌های شش‌گانه"
  },
  {
    word: "finger",
    meaning: "لمس کردن با انگشت",
    lesson: 67,
    pos: "v.",
    lessonLabel: "درس 67 — حس‌های شش‌گانه"
  },
  {
    word: "stroke",
    meaning: "نوازش کردن",
    lesson: 67,
    pos: "v.",
    lessonLabel: "درس 67 — حس‌های شش‌گانه"
  },
  {
    word: "pat",
    meaning: "زدن آرام (دست‌مالی)",
    lesson: 67,
    pos: "v.",
    lessonLabel: "درس 67 — حس‌های شش‌گانه"
  },
  {
    word: "tap",
    meaning: "ضربه زدن (سبک)",
    lesson: 67,
    pos: "v.",
    lessonLabel: "درس 67 — حس‌های شش‌گانه"
  },
  {
    word: "grasp",
    meaning: "محکم گرفتن",
    lesson: 67,
    pos: "v.",
    lessonLabel: "درس 67 — حس‌های شش‌گانه"
  },
  {
    word: "grab",
    meaning: "چنگ زدن",
    lesson: 67,
    pos: "v.",
    lessonLabel: "درس 67 — حس‌های شش‌گانه"
  },
  {
    word: "snatch",
    meaning: "قاپیدن",
    lesson: 67,
    pos: "v.",
    lessonLabel: "درس 67 — حس‌های شش‌گانه"
  },
  {
    word: "press",
    meaning: "فشار دادن",
    lesson: 67,
    pos: "v.",
    lessonLabel: "درس 67 — حس‌های شش‌گانه"
  },
  {
    word: "handle",
    meaning: "دست زدن/جابجا کردن",
    lesson: 67,
    pos: "v.",
    lessonLabel: "درس 67 — حس‌های شش‌گانه"
  },
  {
    word: "stinking",
    meaning: "گندیده/بوی گند",
    lesson: 67,
    pos: "adj.",
    lessonLabel: "درس 67 — حس‌های شش‌گانه"
  },
  {
    word: "evil-smelling",
    meaning: "بدبو",
    lesson: 67,
    pos: "adj.",
    lessonLabel: "درس 67 — حس‌های شش‌گانه"
  },
  {
    word: "putrid",
    meaning: "پوسیده",
    lesson: 67,
    pos: "adj.",
    lessonLabel: "درس 67 — حس‌های شش‌گانه"
  },
  {
    word: "aromatic",
    meaning: "معطر",
    lesson: 67,
    pos: "adj.",
    lessonLabel: "درس 67 — حس‌های شش‌گانه"
  },
  {
    word: "pungent",
    meaning: "تند و تیز (بو)",
    lesson: 67,
    pos: "adj.",
    lessonLabel: "درس 67 — حس‌های شش‌گانه"
  },
  {
    word: "musty",
    meaning: "بو گرفته (نمناکی)",
    lesson: 67,
    pos: "adj.",
    lessonLabel: "درس 67 — حس‌های شش‌گانه"
  },
  {
    word: "fragrant",
    meaning: "خوشبو",
    lesson: 67,
    pos: "adj.",
    lessonLabel: "درس 67 — حس‌های شش‌گانه"
  },
  {
    word: "sweet-smelling",
    meaning: "خوشبو",
    lesson: 67,
    pos: "adj.",
    lessonLabel: "درس 67 — حس‌های شش‌گانه"
  },
  {
    word: "perfumed/scented",
    meaning: "معطر/خوشبو",
    lesson: 67,
    pos: "adj.",
    lessonLabel: "درس 67 — حس‌های شش‌گانه"
  },
  {
    word: "telepathy",
    meaning: "تله‌پاتی (ارتباط ذهنی)",
    lesson: 67,
    pos: "n.",
    lessonLabel: "درس 67 — حس‌های شش‌گانه"
  },
  {
    word: "premonition",
    meaning: "پیش‌احساس",
    lesson: 67,
    pos: "n.",
    lessonLabel: "درس 67 — حس‌های شش‌گانه"
  },
  {
    word: "intuition",
    meaning: "شهود/درک درونی",
    lesson: 67,
    pos: "n.",
    lessonLabel: "درس 67 — حس‌های شش‌گانه"
  },
  {
    word: "déjà vu",
    meaning: "دژاوو (احساس تکرار یک تجربه)",
    lesson: 67,
    pos: "n.",
    lessonLabel: "درس 67 — حس‌های شش‌گانه"
  },
  {
    word: "breathe",
    meaning: "نفس کشیدن",
    lesson: 68,
    pos: "v.",
    lessonLabel: "درس 68 — کارهایی که بدن می‌کند"
  },
  {
    word: "yawn",
    meaning: "خمیازه کشیدن",
    lesson: 68,
    pos: "v.",
    lessonLabel: "درس 68 — کارهایی که بدن می‌کند"
  },
  {
    word: "cough",
    meaning: "سرفه کردن",
    lesson: 68,
    pos: "v.",
    lessonLabel: "درس 68 — کارهایی که بدن می‌کند"
  },
  {
    word: "sneeze",
    meaning: "عطسه کردن",
    lesson: 68,
    pos: "v.",
    lessonLabel: "درس 68 — کارهایی که بدن می‌کند"
  },
  {
    word: "sigh",
    meaning: "آه کشیدن",
    lesson: 68,
    pos: "v.",
    lessonLabel: "درس 68 — کارهایی که بدن می‌کند"
  },
  {
    word: "hiccough",
    meaning: "سکسکه کردن",
    lesson: 68,
    pos: "v.",
    lessonLabel: "درس 68 — کارهایی که بدن می‌کند"
  },
  {
    word: "snore",
    meaning: "خروپف کردن",
    lesson: 68,
    pos: "v.",
    lessonLabel: "درس 68 — کارهایی که بدن می‌کند"
  },
  {
    word: "burp",
    meaning: "آروغ زدن",
    lesson: 68,
    pos: "v.",
    lessonLabel: "درس 68 — کارهایی که بدن می‌کند"
  },
  {
    word: "chew",
    meaning: "جویدن",
    lesson: 68,
    pos: "v.",
    lessonLabel: "درس 68 — کارهایی که بدن می‌کند"
  },
  {
    word: "rumble",
    meaning: "قار و قور کردن (شکم)",
    lesson: 68,
    pos: "v.",
    lessonLabel: "درس 68 — کارهایی که بدن می‌کند"
  },
  {
    word: "swallow",
    meaning: "بلعیدن",
    lesson: 68,
    pos: "v.",
    lessonLabel: "درس 68 — کارهایی که بدن می‌کند"
  },
  {
    word: "suck",
    meaning: "مکیدن",
    lesson: 68,
    pos: "v.",
    lessonLabel: "درس 68 — کارهایی که بدن می‌کند"
  },
  {
    word: "lick",
    meaning: "لیسیدن",
    lesson: 68,
    pos: "v.",
    lessonLabel: "درس 68 — کارهایی که بدن می‌کند"
  },
  {
    word: "bite",
    meaning: "گاز گرفتن",
    lesson: 68,
    pos: "v.",
    lessonLabel: "درس 68 — کارهایی که بدن می‌کند"
  },
  {
    word: "blink",
    meaning: "پلک زدن (هر دو چشم)",
    lesson: 68,
    pos: "v.",
    lessonLabel: "درس 68 — کارهایی که بدن می‌کند"
  },
  {
    word: "wink",
    meaning: "چشمک زدن (یک چشم)",
    lesson: 68,
    pos: "v.",
    lessonLabel: "درس 68 — کارهایی که بدن می‌کند"
  },
  {
    word: "frown",
    meaning: "اخم کردن",
    lesson: 68,
    pos: "v.",
    lessonLabel: "درس 68 — کارهایی که بدن می‌کند"
  },
  {
    word: "grin",
    meaning: "پوزخند زدن، دندانی خندیدن",
    lesson: 68,
    pos: "v.",
    lessonLabel: "درس 68 — کارهایی که بدن می‌کند"
  },
  {
    word: "blush",
    meaning: "سرخ شدن (از خجالت)",
    lesson: 68,
    pos: "v.",
    lessonLabel: "درس 68 — کارهایی که بدن می‌کند"
  },
  {
    word: "perspire",
    meaning: "عرق کردن (رسمی‌تر)",
    lesson: 68,
    pos: "v.",
    lessonLabel: "درس 68 — کارهایی که بدن می‌کند"
  },
  {
    word: "sweat",
    meaning: "عرق کردن",
    lesson: 68,
    pos: "v.",
    lessonLabel: "درس 68 — کارهایی که بدن می‌کند"
  },
  {
    word: "tremble",
    meaning: "لرزیدن",
    lesson: 68,
    pos: "v.",
    lessonLabel: "درس 68 — کارهایی که بدن می‌کند"
  },
  {
    word: "shiver",
    meaning: "برفک کردن، لرزیدن از سرما",
    lesson: 68,
    pos: "v.",
    lessonLabel: "درس 68 — کارهایی که بدن می‌کند"
  },
  {
    word: "shake",
    meaning: "تکان خوردن، لرزیدن",
    lesson: 68,
    pos: "v.",
    lessonLabel: "درس 68 — کارهایی که بدن می‌کند"
  },
  {
    word: "tiny",
    meaning: "ناچیز، بسیار کوچک",
    lesson: 69,
    pos: "adj.",
    lessonLabel: "درس 69 — عدد، کمیت، درجه و شدت"
  },
  {
    word: "small",
    meaning: "کوچک",
    lesson: 69,
    pos: "adj.",
    lessonLabel: "درس 69 — عدد، کمیت، درجه و شدت"
  },
  {
    word: "average",
    meaning: "متوسط",
    lesson: 69,
    pos: "adj.",
    lessonLabel: "درس 69 — عدد، کمیت، درجه و شدت"
  },
  {
    word: "large/considerable",
    meaning: "بزرگ/قابل‌توجه",
    lesson: 69,
    pos: "adj.",
    lessonLabel: "درس 69 — عدد، کمیت، درجه و شدت"
  },
  {
    word: "gigantic",
    meaning: "غول‌آسا",
    lesson: 69,
    pos: "adj.",
    lessonLabel: "درس 69 — عدد، کمیت، درجه و شدت"
  },
  {
    word: "enormous/huge/vast",
    meaning: "عظیم/بزرگ/پهناور",
    lesson: 69,
    pos: "adj.",
    lessonLabel: "درس 69 — عدد، کمیت، درجه و شدت"
  },
  {
    word: "a tiny amount of",
    meaning: "مقدار بسیار کم از",
    lesson: 69,
    pos: "phr.",
    lessonLabel: "درس 69 — عدد، کمیت، درجه و شدت"
  },
  {
    word: "a large number of",
    meaning: "تعداد زیادی از",
    lesson: 69,
    pos: "phr.",
    lessonLabel: "درس 69 — عدد، کمیت، درجه و شدت"
  },
  {
    word: "a large amount of",
    meaning: "مقدار زیادی از",
    lesson: 69,
    pos: "phr.",
    lessonLabel: "درس 69 — عدد، کمیت، درجه و شدت"
  },
  {
    word: "much/many",
    meaning: "خیلی/زیاد",
    lesson: 69,
    pos: "phr.",
    lessonLabel: "درس 69 — عدد، کمیت، درجه و شدت"
  },
  {
    word: "a lot",
    meaning: "زیاد، خیلی",
    lesson: 69,
    pos: "phr.",
    lessonLabel: "درس 69 — عدد، کمیت، درجه و شدت"
  },
  {
    word: "lots",
    meaning: "خیلی زیاد",
    lesson: 69,
    pos: "phr.",
    lessonLabel: "درس 69 — عدد، کمیت، درجه و شدت"
  },
  {
    word: "plenty",
    meaning: "کافی و فراوان",
    lesson: 69,
    pos: "phr.",
    lessonLabel: "درس 69 — عدد، کمیت، درجه و شدت"
  },
  {
    word: "a good/great deal",
    meaning: "مقدار زیاد",
    lesson: 69,
    pos: "phr.",
    lessonLabel: "درس 69 — عدد، کمیت، درجه و شدت"
  },
  {
    word: "dozens of",
    meaning: "عده/تعداد زیادی از",
    lesson: 69,
    pos: "phr.",
    lessonLabel: "درس 69 — عدد، کمیت، درجه و شدت"
  },
  {
    word: "heaps/bags/loads of",
    meaning: "انبوهی از",
    lesson: 69,
    pos: "phr.",
    lessonLabel: "درس 69 — عدد، کمیت، درجه و شدت"
  },
  {
    word: "tons of",
    meaning: "مقدار بسیار زیادی از",
    lesson: 69,
    pos: "phr.",
    lessonLabel: "درس 69 — عدد، کمیت، درجه و شدت"
  },
  {
    word: "a drop of",
    meaning: "یک قطره (مقدار ناچیز) از",
    lesson: 69,
    pos: "phr.",
    lessonLabel: "درس 69 — عدد، کمیت، درجه و شدت"
  },
  {
    word: "a bit",
    meaning: "کمی",
    lesson: 69,
    pos: "adv.",
    lessonLabel: "درس 69 — عدد، کمیت، درجه و شدت"
  },
  {
    word: "quite",
    meaning: "نسبتاً",
    lesson: 69,
    pos: "adv.",
    lessonLabel: "درس 69 — عدد، کمیت، درجه و شدت"
  },
  {
    word: "rather",
    meaning: "نسبتاً",
    lesson: 69,
    pos: "adv.",
    lessonLabel: "درس 69 — عدد، کمیت، درجه و شدت"
  },
  {
    word: "fairly",
    meaning: "نسبتاً",
    lesson: 69,
    pos: "adv.",
    lessonLabel: "درس 69 — عدد، کمیت، درجه و شدت"
  },
  {
    word: "very",
    meaning: "خیلی",
    lesson: 69,
    pos: "adv.",
    lessonLabel: "درس 69 — عدد، کمیت، درجه و شدت"
  },
  {
    word: "really",
    meaning: "واقعاً",
    lesson: 69,
    pos: "adv.",
    lessonLabel: "درس 69 — عدد، کمیت، درجه و شدت"
  },
  {
    word: "awfully",
    meaning: "شدیداً",
    lesson: 69,
    pos: "adv.",
    lessonLabel: "درس 69 — عدد، کمیت، درجه و شدت"
  },
  {
    word: "extremely",
    meaning: "بسیار، به‌شدت",
    lesson: 69,
    pos: "adv.",
    lessonLabel: "درس 69 — عدد، کمیت، درجه و شدت"
  },
  {
    word: "totally",
    meaning: "کاملاً",
    lesson: 69,
    pos: "adv.",
    lessonLabel: "درس 69 — عدد، کمیت، درجه و شدت"
  },
  {
    word: "absolutely",
    meaning: "مطلقاً، کاملاً",
    lesson: 69,
    pos: "adv.",
    lessonLabel: "درس 69 — عدد، کمیت، درجه و شدت"
  },
  {
    word: "completely",
    meaning: "به‌طور کامل",
    lesson: 69,
    pos: "adv.",
    lessonLabel: "درس 69 — عدد، کمیت، درجه و شدت"
  },
  {
    word: "utterly",
    meaning: "مطلقاً، تماماً",
    lesson: 69,
    pos: "adv.",
    lessonLabel: "درس 69 — عدد، کمیت، درجه و شدت"
  },
  {
    word: "the Ice Age",
    meaning: "عصر یخبندان",
    lesson: 70,
    lessonLabel: "درس 70 — زمان"
  },
  {
    word: "the Stone Age",
    meaning: "عصر سنگ",
    lesson: 70,
    lessonLabel: "درس 70 — زمان"
  },
  {
    word: "the Middle Ages",
    meaning: "قرون وسطی",
    lesson: 70,
    lessonLabel: "درس 70 — زمان"
  },
  {
    word: "the computer age",
    meaning: "عصر رایانه",
    lesson: 70,
    lessonLabel: "درس 70 — زمان"
  },
  {
    word: "era",
    meaning: "دوره/عصر (طولانی، شاید چند دهه)",
    lesson: 70,
    pos: "n.",
    lessonLabel: "درس 70 — زمان"
  },
  {
    word: "period",
    meaning: "دوره (واژه بسیار عمومی)",
    lesson: 70,
    pos: "n.",
    lessonLabel: "درس 70 — زمان"
  },
  {
    word: "spell",
    meaning: "مدت کوتاه ولی نامعین",
    lesson: 70,
    pos: "n.",
    lessonLabel: "درس 70 — زمان"
  },
  {
    word: "a time",
    meaning: "مدتی (کلی و نامعین)",
    lesson: 70,
    lessonLabel: "درس 70 — زمان"
  },
  {
    word: "a while",
    meaning: "مدتی (نامعین ولی زیاد طولانی نیست)",
    lesson: 70,
    lessonLabel: "درس 70 — زمان"
  },
  {
    word: "for the time being",
    meaning: "فعلاً/برای حالا",
    lesson: 70,
    pos: "phr.",
    lessonLabel: "درس 70 — زمان"
  },
  {
    word: "at times",
    meaning: "گاهی اوقات",
    lesson: 70,
    pos: "phr.",
    lessonLabel: "درس 70 — زمان"
  },
  {
    word: "by the time",
    meaning: "تا زمانی که",
    lesson: 70,
    pos: "phr.",
    lessonLabel: "درس 70 — زمان"
  },
  {
    word: "one at a time",
    meaning: "یکی در هر بار",
    lesson: 70,
    pos: "phr.",
    lessonLabel: "درس 70 — زمان"
  },
  {
    word: "just in time",
    meaning: "درست به موقع",
    lesson: 70,
    pos: "phr.",
    lessonLabel: "درس 70 — زمان"
  },
  {
    word: "on time",
    meaning: "به موقع (سر وقت)",
    lesson: 70,
    pos: "phr.",
    lessonLabel: "درس 70 — زمان"
  },
  {
    word: "time and time again",
    meaning: "بارها و بارها",
    lesson: 70,
    pos: "phr.",
    lessonLabel: "درس 70 — زمان"
  },
  {
    word: "pass",
    meaning: "گذشتن (زمان)",
    lesson: 70,
    pos: "v.",
    lessonLabel: "درس 70 — زمان"
  },
  {
    word: "elapse",
    meaning: "سپری شدن (رسمی‌تر)",
    lesson: 70,
    pos: "v.",
    lessonLabel: "درس 70 — زمان"
  },
  {
    word: "take",
    meaning: "طول کشیدن (برای انجام کاری)",
    lesson: 70,
    pos: "v.",
    lessonLabel: "درس 70 — زمان"
  },
  {
    word: "last",
    meaning: "دوام آوردن/طول کشیدن",
    lesson: 70,
    pos: "v.",
    lessonLabel: "درس 70 — زمان"
  },
  {
    word: "run",
    meaning: "ادامه یافتن/کار کردن (نوار ویدیو)",
    lesson: 70,
    pos: "v.",
    lessonLabel: "درس 70 — زمان"
  },
  {
    word: "go on",
    meaning: "ادامه داشتن (معمولاً بیشتر از انتظار)",
    lesson: 70,
    pos: "v.",
    lessonLabel: "درس 70 — زمان"
  },
  {
    word: "take your time",
    meaning: "با آرامش و بدون عجله انجام بده",
    lesson: 70,
    pos: "phr.",
    lessonLabel: "درس 70 — زمان"
  },
  {
    word: "temporary",
    meaning: "موقتی",
    lesson: 70,
    pos: "adj.",
    lessonLabel: "درس 70 — زمان"
  },
  {
    word: "permanent",
    meaning: "دائمی",
    lesson: 70,
    pos: "adj.",
    lessonLabel: "درس 70 — زمان"
  },
  {
    word: "provisional",
    meaning: "موقتی/مشروط و غیرقطعی",
    lesson: 70,
    pos: "adj.",
    lessonLabel: "درس 70 — زمان"
  },
  {
    word: "timeless",
    meaning: "بی‌زمان/جاودانه",
    lesson: 70,
    pos: "adj.",
    lessonLabel: "درس 70 — زمان"
  },
  {
    word: "eternal",
    meaning: "ابدی",
    lesson: 70,
    pos: "adj.",
    lessonLabel: "درس 70 — زمان"
  },
  {
    word: "wide",
    meaning: "پهن، عریض",
    lesson: 71,
    pos: "adj.",
    lessonLabel: "درس 71 — فاصله‌ها و ابعاد"
  },
  {
    word: "broad",
    meaning: "پهن (اغلب انتزاعی یا مساحت زیاد)",
    lesson: 71,
    pos: "adj.",
    lessonLabel: "درس 71 — فاصله‌ها و ابعاد"
  },
  {
    word: "tall",
    meaning: "بلند (برای افراد و چیزهای باریک بلند)",
    lesson: 71,
    pos: "adj.",
    lessonLabel: "درس 71 — فاصله‌ها و ابعاد"
  },
  {
    word: "high",
    meaning: "بلند، مرتفع",
    lesson: 71,
    pos: "adj.",
    lessonLabel: "درس 71 — فاصله‌ها و ابعاد"
  },
  {
    word: "deep",
    meaning: "عمیق",
    lesson: 71,
    pos: "adj.",
    lessonLabel: "درس 71 — فاصله‌ها و ابعاد"
  },
  {
    word: "shallow",
    meaning: "کم‌عمق",
    lesson: 71,
    pos: "adj.",
    lessonLabel: "درس 71 — فاصله‌ها و ابعاد"
  },
  {
    word: "long",
    meaning: "بلند، دراز",
    lesson: 71,
    pos: "adj.",
    lessonLabel: "درس 71 — فاصله‌ها و ابعاد"
  },
  {
    word: "length",
    meaning: "طول",
    lesson: 71,
    pos: "n.",
    lessonLabel: "درس 71 — فاصله‌ها و ابعاد"
  },
  {
    word: "lengthen",
    meaning: "بلندتر کردن",
    lesson: 71,
    pos: "v.",
    lessonLabel: "درس 71 — فاصله‌ها و ابعاد"
  },
  {
    word: "lengthy",
    meaning: "طولانی (معمولاً دربارهٔ زمان؛ با بار منفی)",
    lesson: 71,
    pos: "adj.",
    lessonLabel: "درس 71 — فاصله‌ها و ابعاد"
  },
  {
    word: "long-distance",
    meaning: "راه دور",
    lesson: 71,
    pos: "adj.",
    lessonLabel: "درس 71 — فاصله‌ها و ابعاد"
  },
  {
    word: "short",
    meaning: "کوتاه",
    lesson: 71,
    pos: "adj.",
    lessonLabel: "درس 71 — فاصله‌ها و ابعاد"
  },
  {
    word: "shorten",
    meaning: "کوتاه کردن",
    lesson: 71,
    pos: "v.",
    lessonLabel: "درس 71 — فاصله‌ها و ابعاد"
  },
  {
    word: "short cut",
    meaning: "میان‌بر",
    lesson: 71,
    pos: "n.",
    lessonLabel: "درس 71 — فاصله‌ها و ابعاد"
  },
  {
    word: "width",
    meaning: "عرض",
    lesson: 71,
    pos: "n.",
    lessonLabel: "درس 71 — فاصله‌ها و ابعاد"
  },
  {
    word: "widen",
    meaning: "پهن‌تر کردن",
    lesson: 71,
    pos: "v.",
    lessonLabel: "درس 71 — فاصله‌ها و ابعاد"
  },
  {
    word: "broaden",
    meaning: "گسترش دادن (معمولاً در بافت‌های انتزاعی‌تر)",
    lesson: 71,
    pos: "v.",
    lessonLabel: "درس 71 — فاصله‌ها و ابعاد"
  },
  {
    word: "broad-minded",
    meaning: "روحیهٔ باز و آزاده‌منش",
    lesson: 71,
    pos: "adj.",
    lessonLabel: "درس 71 — فاصله‌ها و ابعاد"
  },
  {
    word: "height",
    meaning: "ارتفاع",
    lesson: 71,
    pos: "n.",
    lessonLabel: "درس 71 — فاصله‌ها و ابعاد"
  },
  {
    word: "heighten",
    meaning: "تشدید کردن (معمولاً فقط برای احساسات و هیجانات)",
    lesson: 71,
    pos: "v.",
    lessonLabel: "درس 71 — فاصله‌ها و ابعاد"
  },
  {
    word: "low",
    meaning: "کم‌ارتفاع، پایین",
    lesson: 71,
    pos: "adj.",
    lessonLabel: "درس 71 — فاصله‌ها و ابعاد"
  },
  {
    word: "lower",
    meaning: "پایین آوردن",
    lesson: 71,
    pos: "v.",
    lessonLabel: "درس 71 — فاصله‌ها و ابعاد"
  },
  {
    word: "faraway",
    meaning: "دور، دوردست",
    lesson: 71,
    pos: "adj.",
    lessonLabel: "درس 71 — فاصله‌ها و ابعاد"
  },
  {
    word: "depth",
    meaning: "عمق",
    lesson: 71,
    pos: "n.",
    lessonLabel: "درس 71 — فاصله‌ها و ابعاد"
  },
  {
    word: "deepen",
    meaning: "عمیق‌تر کردن (اغلب با احساسات)",
    lesson: 71,
    pos: "v.",
    lessonLabel: "درس 71 — فاصله‌ها و ابعاد"
  },
  {
    word: "stretch",
    meaning: "کشیده شدن، امتداد داشتن",
    lesson: 71,
    pos: "v.",
    lessonLabel: "درس 71 — فاصله‌ها و ابعاد"
  },
  {
    word: "extend",
    meaning: "گسترش دادن، توسعه دادن",
    lesson: 71,
    pos: "v.",
    lessonLabel: "درس 71 — فاصله‌ها و ابعاد"
  },
  {
    word: "spreading",
    meaning: "گسترده شدن (بزرگ‌تر شدن)",
    lesson: 71,
    pos: "v.",
    lessonLabel: "درس 71 — فاصله‌ها و ابعاد"
  },
  {
    word: "shrinking",
    meaning: "کوچک شدن، جمع شدن",
    lesson: 71,
    pos: "v.",
    lessonLabel: "درس 71 — فاصله‌ها و ابعاد"
  },
  {
    word: "must",
    meaning: "باید (فرمان یا ضرورت شدید)",
    lesson: 72,
    pos: "modal",
    lessonLabel: "درس 72 — الزام، نیاز، امکان و احتمال"
  },
  {
    word: "have (got) to",
    meaning: "مجبور بودن (به دلیل شرایط)",
    lesson: 72,
    pos: "phr.",
    lessonLabel: "درس 72 — الزام، نیاز، امکان و احتمال"
  },
  {
    word: "obliged",
    meaning: "ملزم",
    lesson: 72,
    pos: "adj.",
    lessonLabel: "درس 72 — الزام، نیاز، امکان و احتمال"
  },
  {
    word: "liable /ˈlaɪəbəl/",
    meaning: "مسئول و پاسخگو (از نظر مالی/حقوقی)",
    lesson: 72,
    pos: "adj.",
    lessonLabel: "درس 72 — الزام، نیاز، امکان و احتمال"
  },
  {
    word: "forced",
    meaning: "مجبور/وادار شده",
    lesson: 72,
    pos: "adj.",
    lessonLabel: "درس 72 — الزام، نیاز، امکان و احتمال"
  },
  {
    word: "had no choice/alternative but",
    meaning: "چاره‌ای جز ... نداشت",
    lesson: 72,
    pos: "phr.",
    lessonLabel: "درس 72 — الزام، نیاز، امکان و احتمال"
  },
  {
    word: "mandatory /ˈmændətri/",
    meaning: "اجباری، الزامی",
    lesson: 72,
    pos: "adj.",
    lessonLabel: "درس 72 — الزام، نیاز، امکان و احتمال"
  },
  {
    word: "compulsory /kəmˈpʌlsəri/",
    meaning: "اجباری",
    lesson: 72,
    pos: "adj.",
    lessonLabel: "درس 72 — الزام، نیاز، امکان و احتمال"
  },
  {
    word: "obligatory /əˈblɪgətri/",
    meaning: "الزامی",
    lesson: 72,
    pos: "adj.",
    lessonLabel: "درس 72 — الزام، نیاز، امکان و احتمال"
  },
  {
    word: "optional /ˈɒpʃənəl/",
    meaning: "اختیاری",
    lesson: 72,
    pos: "adj.",
    lessonLabel: "درس 72 — الزام، نیاز، امکان و احتمال"
  },
  {
    word: "exempt /ɪgˈzempt/",
    meaning: "معاف",
    lesson: 72,
    pos: "adj.",
    lessonLabel: "درس 72 — الزام، نیاز، امکان و احتمال"
  },
  {
    word: "needn't / don't need to / don't have to",
    meaning: "لازم نیست",
    lesson: 72,
    pos: "phr.",
    lessonLabel: "درس 72 — الزام، نیاز، امکان و احتمال"
  },
  {
    word: "need",
    meaning: "نیاز داشتن",
    lesson: 72,
    pos: "v.",
    lessonLabel: "درس 72 — الزام، نیاز، امکان و احتمال"
  },
  {
    word: "wants",
    meaning: "خواستن (غیررسمی، برای نیاز)",
    lesson: 72,
    pos: "v.",
    lessonLabel: "درس 72 — الزام، نیاز، امکان و احتمال"
  },
  {
    word: "in need of",
    meaning: "محتاج به، نیازمند",
    lesson: 72,
    pos: "phr.",
    lessonLabel: "درس 72 — الزام، نیاز، امکان و احتمال"
  },
  {
    word: "lack of",
    meaning: "کمبود، فقدان",
    lesson: 72,
    pos: "n.",
    lessonLabel: "درس 72 — الزام، نیاز، امکان و احتمال"
  },
  {
    word: "shortage",
    meaning: "کمبود",
    lesson: 72,
    pos: "n.",
    lessonLabel: "درس 72 — الزام، نیاز، امکان و احتمال"
  },
  {
    word: "need for",
    meaning: "نیاز به",
    lesson: 72,
    pos: "phr.",
    lessonLabel: "درس 72 — الزام، نیاز، امکان و احتمال"
  },
  {
    word: "impossible",
    meaning: "ناممکن",
    lesson: 72,
    pos: "adj.",
    lessonLabel: "درس 72 — الزام، نیاز، امکان و احتمال"
  },
  {
    word: "unlikely",
    meaning: "بعید، محتمل‌الوقوع نیست",
    lesson: 72,
    pos: "adj.",
    lessonLabel: "درس 72 — الزام، نیاز، امکان و احتمال"
  },
  {
    word: "possible",
    meaning: "ممکن",
    lesson: 72,
    pos: "adj.",
    lessonLabel: "درس 72 — الزام، نیاز، امکان و احتمال"
  },
  {
    word: "probable",
    meaning: "محتمل",
    lesson: 72,
    pos: "adj.",
    lessonLabel: "درس 72 — الزام، نیاز، امکان و احتمال"
  },
  {
    word: "certain",
    meaning: "مطمئن، حتمی",
    lesson: 72,
    pos: "adj.",
    lessonLabel: "درس 72 — الزام، نیاز، امکان و احتمال"
  },
  {
    word: "inevitable",
    meaning: "ناگزیر، اجتناب‌ناپذیر",
    lesson: 72,
    pos: "adj.",
    lessonLabel: "درس 72 — الزام، نیاز، امکان و احتمال"
  },
  {
    word: "opportunity",
    meaning: "فرصت",
    lesson: 72,
    pos: "n.",
    lessonLabel: "درس 72 — الزام، نیاز، امکان و احتمال"
  },
  {
    word: "chance/possibility",
    meaning: "شانس/احتمال",
    lesson: 72,
    pos: "n.",
    lessonLabel: "درس 72 — الزام، نیاز، امکان و احتمال"
  },
  {
    word: "sound",
    meaning: "صدا",
    lesson: 73,
    pos: "n.",
    lessonLabel: "درس 73 — صدا و نور"
  },
  {
    word: "noise",
    meaning: "سر و صدا",
    lesson: 73,
    pos: "n.",
    lessonLabel: "درس 73 — صدا و نور"
  },
  {
    word: "racket",
    meaning: "غوغا، هیاهوی شدید",
    lesson: 73,
    pos: "n.",
    lessonLabel: "درس 73 — صدا و نور"
  },
  {
    word: "continual",
    meaning: "مستمر، پیوسته",
    lesson: 73,
    pos: "adj.",
    lessonLabel: "درس 73 — صدا و نور"
  },
  {
    word: "patter",
    meaning: "تپ تپ (باران)، تق تق قدم",
    lesson: 73,
    pos: "n.|v.",
    lessonLabel: "درس 73 — صدا و نور"
  },
  {
    word: "bang",
    meaning: "تق (صداي در يا بادکنک)",
    lesson: 73,
    pos: "n.|v.",
    lessonLabel: "درس 73 — صدا و نور"
  },
  {
    word: "rustle",
    meaning: "خش خش",
    lesson: 73,
    pos: "n.|v.",
    lessonLabel: "درس 73 — صدا و نور"
  },
  {
    word: "thud",
    meaning: "صدای افتادن جسم سنگین",
    lesson: 73,
    pos: "n.|v.",
    lessonLabel: "درس 73 — صدا و نور"
  },
  {
    word: "crash",
    meaning: "صدای برخورد/سقوط سنگین",
    lesson: 73,
    pos: "n.|v.",
    lessonLabel: "درس 73 — صدا و نور"
  },
  {
    word: "clang",
    meaning: "صدای زنگ فلز",
    lesson: 73,
    pos: "n.|v.",
    lessonLabel: "درس 73 — صدا و نور"
  },
  {
    word: "clatter",
    meaning: "صدای برخورد اجسام فلزی",
    lesson: 73,
    pos: "n.|v.",
    lessonLabel: "درس 73 — صدا و نور"
  },
  {
    word: "hiss",
    meaning: "هیس، صدای خروج گاز/بخار",
    lesson: 73,
    pos: "n.|v.",
    lessonLabel: "درس 73 — صدا و نور"
  },
  {
    word: "rumble",
    meaning: "غرش دور، صدای غرغره‌مانند",
    lesson: 73,
    pos: "n.|v.",
    lessonLabel: "درس 73 — صدا و نور"
  },
  {
    word: "roar",
    meaning: "غرش، مهیب",
    lesson: 73,
    pos: "n.|v.",
    lessonLabel: "درس 73 — صدا و نور"
  },
  {
    word: "ring",
    meaning: "زنگ زدن",
    lesson: 73,
    pos: "n.|v.",
    lessonLabel: "درس 73 — صدا و نور"
  },
  {
    word: "gloomy",
    meaning: "تاریک و دلگیر",
    lesson: 73,
    pos: "adj.",
    lessonLabel: "درس 73 — صدا و نور"
  },
  {
    word: "dim",
    meaning: "کم‌نور",
    lesson: 73,
    pos: "adj.",
    lessonLabel: "درس 73 — صدا و نور"
  },
  {
    word: "sombre",
    meaning: "درهم، تیره و جدی",
    lesson: 73,
    pos: "adj.",
    lessonLabel: "درس 73 — صدا و نور"
  },
  {
    word: "shine",
    meaning: "تابیدن",
    lesson: 73,
    pos: "v.",
    lessonLabel: "درس 73 — صدا و نور"
  },
  {
    word: "rays",
    meaning: "پرتوها",
    lesson: 73,
    pos: "n.",
    lessonLabel: "درس 73 — صدا و نور"
  },
  {
    word: "beam",
    meaning: "پرتو (مثل چراغ‌قوه)",
    lesson: 73,
    pos: "n.",
    lessonLabel: "درس 73 — صدا و نور"
  },
  {
    word: "flash",
    meaning: "برق، فلاش",
    lesson: 73,
    pos: "n.",
    lessonLabel: "درس 73 — صدا و نور"
  },
  {
    word: "twinkle",
    meaning: "سوسو زدن",
    lesson: 73,
    pos: "v.",
    lessonLabel: "درس 73 — صدا و نور"
  },
  {
    word: "flicker",
    meaning: "لرزش شعله",
    lesson: 73,
    pos: "v.",
    lessonLabel: "درس 73 — صدا و نور"
  },
  {
    word: "glow",
    meaning: "تابیدن ملایم، سرخ شدن",
    lesson: 73,
    pos: "v.",
    lessonLabel: "درس 73 — صدا و نور"
  },
  {
    word: "sparkle",
    meaning: "برق زدن",
    lesson: 73,
    pos: "v.",
    lessonLabel: "درس 73 — صدا و نور"
  },
  {
    word: "glitter",
    meaning: "جلا زدن، برق خیره‌کننده",
    lesson: 73,
    pos: "v.",
    lessonLabel: "درس 73 — صدا و نور"
  },
  {
    word: "possessions",
    meaning: "دارایی‌ها / وسایل شخصی",
    lesson: 74,
    pos: "n.",
    lessonLabel: "درس 74 — مالکیت، دادن و قرض دادن"
  },
  {
    word: "belongings",
    meaning: "متعلقات شخصی (همیشه جمع)",
    lesson: 74,
    pos: "n.",
    lessonLabel: "درس 74 — مالکیت، دادن و قرض دادن"
  },
  {
    word: "estate",
    meaning: "ملک و املاک بزرگ / کل ثروت شخص متوفی",
    lesson: 74,
    pos: "n.",
    lessonLabel: "درس 74 — مالکیت، دادن و قرض دادن"
  },
  {
    word: "property",
    meaning: "ملک، دارایی (غیرقابل‌شمارش) / یک ساختمان یا زمین (قابل‌شمارش)",
    lesson: 74,
    pos: "n.",
    lessonLabel: "درس 74 — مالکیت، دادن و قرض دادن"
  },
  {
    word: "properties",
    meaning: "املاک",
    lesson: 74,
    pos: "n.",
    lessonLabel: "درس 74 — مالکیت، دادن و قرض دادن"
  },
  {
    word: "proprietor",
    meaning: "صاحب/مالک (رسمی، برای مغازه‌ها و کسب‌وکارها)",
    lesson: 74,
    pos: "n.",
    lessonLabel: "درس 74 — مالکیت، دادن و قرض دادن"
  },
  {
    word: "owner",
    meaning: "مالک",
    lesson: 74,
    pos: "n.",
    lessonLabel: "درس 74 — مالکیت، دادن و قرض دادن"
  },
  {
    word: "landlord/lady",
    meaning: "صاحب خانهٔ اجاره‌ای / موجر",
    lesson: 74,
    pos: "n.",
    lessonLabel: "درس 74 — مالکیت، دادن و قرض دادن"
  },
  {
    word: "tenant",
    meaning: "مستأجر",
    lesson: 74,
    pos: "n.",
    lessonLabel: "درس 74 — مالکیت، دادن و قرض دادن"
  },
  {
    word: "provide",
    meaning: "تأمین/فراهم کردن",
    lesson: 74,
    pos: "v.",
    lessonLabel: "درس 74 — مالکیت، دادن و قرض دادن"
  },
  {
    word: "contribute",
    meaning: "مشارکت دادن/کمک کردن",
    lesson: 74,
    pos: "v.",
    lessonLabel: "درس 74 — مالکیت، دادن و قرض دادن"
  },
  {
    word: "donate",
    meaning: "اهداء کردن (به مؤسسات)",
    lesson: 74,
    pos: "v.",
    lessonLabel: "درس 74 — مالکیت، دادن و قرض دادن"
  },
  {
    word: "supply",
    meaning: "تأمین و توزیع کردن (کالا)",
    lesson: 74,
    pos: "v.",
    lessonLabel: "درس 74 — مالکیت، دادن و قرض دادن"
  },
  {
    word: "present",
    meaning: "هدیه دادن",
    lesson: 74,
    pos: "v.",
    lessonLabel: "درس 74 — مالکیت، دادن و قرض دادن"
  },
  {
    word: "cater for",
    meaning: "رسیدگی به نیازهای (افراد)",
    lesson: 74,
    pos: "phr.",
    lessonLabel: "درس 74 — مالکیت، دادن و قرض دادن"
  },
  {
    word: "left",
    meaning: "باقی گذاشتن (در وصیت)",
    lesson: 74,
    pos: "v.",
    lessonLabel: "درس 74 — مالکیت، دادن و قرض دادن"
  },
  {
    word: "allocate",
    meaning: "تخصیص دادن",
    lesson: 74,
    pos: "v.",
    lessonLabel: "درس 74 — مالکیت، دادن و قرض دادن"
  },
  {
    word: "hire",
    meaning: "کرایه/اجاره کردن (برای مدت کوتاه)",
    lesson: 74,
    pos: "v.",
    lessonLabel: "درس 74 — مالکیت، دادن و قرض دادن"
  },
  {
    word: "rent",
    meaning: "اجاره کردن (خانه یا ماشین)",
    lesson: 74,
    pos: "v.",
    lessonLabel: "درس 74 — مالکیت، دادن و قرض دادن"
  },
  {
    word: "car-hire/car-rental",
    meaning: "شرکت اجارهٔ ماشین",
    lesson: 74,
    pos: "n.",
    lessonLabel: "درس 74 — مالکیت، دادن و قرض دادن"
  },
  {
    word: "lend",
    meaning: "قرض دادن",
    lesson: 74,
    pos: "v.",
    lessonLabel: "درس 74 — مالکیت، دادن و قرض دادن"
  },
  {
    word: "borrow",
    meaning: "قرض گرفتن",
    lesson: 74,
    pos: "v.",
    lessonLabel: "درس 74 — مالکیت، دادن و قرض دادن"
  },
  {
    word: "loan",
    meaning: "وام",
    lesson: 74,
    pos: "n.",
    lessonLabel: "درس 74 — مالکیت، دادن و قرض دادن"
  },
  {
    word: "own",
    meaning: "مالک بودن",
    lesson: 74,
    pos: "v.",
    lessonLabel: "درس 74 — مالکیت، دادن و قرض دادن"
  },
  {
    word: "move",
    meaning: "حرکت کردن؛ اسباب‌کشی کردن",
    lesson: 75,
    pos: "v.",
    lessonLabel: "درس 75 — حرکت و سرعت"
  },
  {
    word: "travel/drive",
    meaning: "سفر کردن/رانندگی کردن",
    lesson: 75,
    pos: "v.",
    lessonLabel: "درس 75 — حرکت و سرعت"
  },
  {
    word: "sail",
    meaning: "حرکت کردن (قایق/کشتی)، دریانوردی کردن",
    lesson: 75,
    pos: "v.",
    lessonLabel: "درس 75 — حرکت و سرعت"
  },
  {
    word: "flow/run",
    meaning: "جاری بودن/جریان داشتن",
    lesson: 75,
    pos: "v.",
    lessonLabel: "درس 75 — حرکت و سرعت"
  },
  {
    word: "drift",
    meaning: "آرام رانده شدن، سرگردان حرکت کردن",
    lesson: 75,
    pos: "v.",
    lessonLabel: "درس 75 — حرکت و سرعت"
  },
  {
    word: "flutter",
    meaning: "بال‌بال زدن، تکان‌خوردن (در باد)",
    lesson: 75,
    pos: "v.",
    lessonLabel: "درس 75 — حرکت و سرعت"
  },
  {
    word: "stir",
    meaning: "تکان خوردن (آرام)",
    lesson: 75,
    pos: "v.",
    lessonLabel: "درس 75 — حرکت و سرعت"
  },
  {
    word: "sway",
    meaning: "تلو تلو خوردن، تاب خوردن",
    lesson: 75,
    pos: "v.",
    lessonLabel: "درس 75 — حرکت و سرعت"
  },
  {
    word: "swerve",
    meaning: "ناگهان از مسیر منحرف شدن",
    lesson: 75,
    pos: "v.",
    lessonLabel: "درس 75 — حرکت و سرعت"
  },
  {
    word: "crawl along",
    meaning: "به‌کندی خزیدن/حرکت کردن",
    lesson: 75,
    pos: "phr.",
    lessonLabel: "درس 75 — حرکت و سرعت"
  },
  {
    word: "dawdle",
    meaning: " locale وقت‌تلف کردن، تنبلی کردن",
    lesson: 75,
    pos: "v.",
    lessonLabel: "درس 75 — حرکت و سرعت"
  },
  {
    word: "tear along",
    meaning: "با سرعت زیاد رفتن",
    lesson: 75,
    pos: "phr.",
    lessonLabel: "درس 75 — حرکت و سرعت"
  },
  {
    word: "shoot past",
    meaning: "مانند گلوله رد شدن",
    lesson: 75,
    pos: "phr.",
    lessonLabel: "درس 75 — حرکت و سرعت"
  },
  {
    word: "hurry/rush",
    meaning: "عجله کردن",
    lesson: 75,
    pos: "v.",
    lessonLabel: "درس 75 — حرکت و سرعت"
  },
  {
    word: "creep/plod along",
    meaning: "به‌آرامی/به‌زحمت حرکت کردن",
    lesson: 75,
    pos: "phr.",
    lessonLabel: "درس 75 — حرکت و سرعت"
  },
  {
    word: "speed",
    meaning: "سرعت",
    lesson: 75,
    pos: "n.",
    lessonLabel: "درس 75 — حرکت و سرعت"
  },
  {
    word: "rate",
    meaning: "نرخ، میزان",
    lesson: 75,
    pos: "n.",
    lessonLabel: "درس 75 — حرکت و سرعت"
  },
  {
    word: "pace",
    meaning: "گام، آهنگ (سرعت)",
    lesson: 75,
    pos: "n.",
    lessonLabel: "درس 75 — حرکت و سرعت"
  },
  {
    word: "velocity",
    meaning: "سرعت (اصطلاح علمی/فنی)",
    lesson: 75,
    pos: "n.",
    lessonLabel: "درس 75 — حرکت و سرعت"
  },
  {
    word: "smooth",
    meaning: "صاف / لطیف",
    lesson: 76,
    pos: "adj.",
    lessonLabel: "درس 76 — بافت، روشنایی، وزن و تراکم"
  },
  {
    word: "polished",
    meaning: "پولیش‌خورده / جلا داده‌شده",
    lesson: 76,
    pos: "adj.",
    lessonLabel: "درس 76 — بافت، روشنایی، وزن و تراکم"
  },
  {
    word: "silky",
    meaning: "ابریشمی",
    lesson: 76,
    pos: "adj.",
    lessonLabel: "درس 76 — بافت، روشنایی، وزن و تراکم"
  },
  {
    word: "sleek",
    meaning: "صاف و براق",
    lesson: 76,
    pos: "adj.",
    lessonLabel: "درس 76 — بافت، روشنایی، وزن و تراکم"
  },
  {
    word: "downy",
    meaning: "پَرمانند / کرک‌مانند",
    lesson: 76,
    pos: "adj.",
    lessonLabel: "درس 76 — بافت، روشنایی، وزن و تراکم"
  },
  {
    word: "slippery",
    meaning: "لغزنده",
    lesson: 76,
    pos: "adj.",
    lessonLabel: "درس 76 — بافت، روشنایی، وزن و تراکم"
  },
  {
    word: "furry",
    meaning: "پشمالو / خزمانند",
    lesson: 76,
    pos: "adj.",
    lessonLabel: "درس 76 — بافت، روشنایی، وزن و تراکم"
  },
  {
    word: "rough",
    meaning: "زبر / ناصاف",
    lesson: 76,
    pos: "adj.",
    lessonLabel: "درس 76 — بافت، روشنایی، وزن و تراکم"
  },
  {
    word: "coarse",
    meaning: "درشت‌بافت / زبر",
    lesson: 76,
    pos: "adj.",
    lessonLabel: "درس 76 — بافت، روشنایی، وزن و تراکم"
  },
  {
    word: "jagged",
    meaning: "دندانه‌دار و تیز",
    lesson: 76,
    pos: "adj.",
    lessonLabel: "درس 76 — بافت، روشنایی، وزن و تراکم"
  },
  {
    word: "prickly",
    meaning: "خاردار",
    lesson: 76,
    pos: "adj.",
    lessonLabel: "درس 76 — بافت، روشنایی، وزن و تراکم"
  },
  {
    word: "gnarled",
    meaning: "گره‌دار / پیچ‌وخم‌دار",
    lesson: 76,
    pos: "adj.",
    lessonLabel: "درس 76 — بافت، روشنایی، وزن و تراکم"
  },
  {
    word: "feel",
    meaning: "حس لمس",
    lesson: 76,
    pos: "n.",
    lessonLabel: "درس 76 — بافت، روشنایی، وزن و تراکم"
  },
  {
    word: "to the touch",
    meaning: "از نظر لمسی",
    lesson: 76,
    lessonLabel: "درس 76 — بافت، روشنایی، وزن و تراکم"
  },
  {
    word: "surface",
    meaning: "سطح",
    lesson: 76,
    pos: "n.",
    lessonLabel: "درس 76 — بافت، روشنایی، وزن و تراکم"
  },
  {
    word: "underfoot",
    meaning: "زیر پا",
    lesson: 76,
    pos: "adv.",
    lessonLabel: "درس 76 — بافت، روشنایی، وزن و تراکم"
  },
  {
    word: "shiny",
    meaning: "براق",
    lesson: 76,
    pos: "adj.",
    lessonLabel: "درس 76 — بافت، روشنایی، وزن و تراکم"
  },
  {
    word: "vivid",
    meaning: "زنده و شفاف (رنگ)",
    lesson: 76,
    pos: "adj.",
    lessonLabel: "درس 76 — بافت، روشنایی، وزن و تراکم"
  },
  {
    word: "shady",
    meaning: "سایه‌دار",
    lesson: 76,
    pos: "adj.",
    lessonLabel: "درس 76 — بافت، روشنایی، وزن و تراکم"
  },
  {
    word: "dazzling",
    meaning: "خیره‌کننده",
    lesson: 76,
    pos: "adj.",
    lessonLabel: "درس 76 — بافت، روشنایی، وزن و تراکم"
  },
  {
    word: "dull",
    meaning: "کدر / مات",
    lesson: 76,
    pos: "adj.",
    lessonLabel: "درس 76 — بافت، روشنایی، وزن و تراکم"
  },
  {
    word: "brighter",
    meaning: "روشن‌تر",
    lesson: 76,
    pos: "adj.",
    lessonLabel: "درس 76 — بافت، روشنایی، وزن و تراکم"
  },
  {
    word: "dim",
    meaning: "کم‌نور",
    lesson: 76,
    pos: "adj.",
    lessonLabel: "درس 76 — بافت، روشنایی، وزن و تراکم"
  },
  {
    word: "glare",
    meaning: "خیرگی نور",
    lesson: 76,
    pos: "n.",
    lessonLabel: "درس 76 — بافت، روشنایی، وزن و تراکم"
  },
  {
    word: "solid",
    meaning: "توپُر / جامد",
    lesson: 76,
    pos: "adj.",
    lessonLabel: "درس 76 — بافت، روشنایی، وزن و تراکم"
  },
  {
    word: "hollow",
    meaning: "توخالی",
    lesson: 76,
    pos: "adj.",
    lessonLabel: "درس 76 — بافت، روشنایی، وزن و تراکم"
  },
  {
    word: "thick",
    meaning: "پُرپشت / کلفت",
    lesson: 76,
    pos: "adj.",
    lessonLabel: "درس 76 — بافت، روشنایی، وزن و تراکم"
  },
  {
    word: "thin",
    meaning: "نازک",
    lesson: 76,
    pos: "adj.",
    lessonLabel: "درس 76 — بافت، روشنایی، وزن و تراکم"
  },
  {
    word: "fine",
    meaning: "ریز / نازک",
    lesson: 76,
    pos: "adj.",
    lessonLabel: "درس 76 — بافت، روشنایی، وزن و تراکم"
  },
  {
    word: "dense",
    meaning: "انبوه / متراکم",
    lesson: 76,
    pos: "adj.",
    lessonLabel: "درس 76 — بافت، روشنایی، وزن و تراکم"
  },
  {
    word: "sparse",
    meaning: "تنک / پراکنده",
    lesson: 76,
    pos: "adj.",
    lessonLabel: "درس 76 — بافت، روشنایی، وزن و تراکم"
  },
  {
    word: "weighty",
    meaning: "سنگین",
    lesson: 76,
    pos: "adj.",
    lessonLabel: "درس 76 — بافت، روشنایی، وزن و تراکم"
  },
  {
    word: "as light as a feather",
    meaning: "سبک مثل پر",
    lesson: 76,
    pos: "phr.",
    lessonLabel: "درس 76 — بافت، روشنایی، وزن و تراکم"
  },
  {
    word: "as heavy as lead",
    meaning: "سنگین مثل سرب",
    lesson: 76,
    pos: "phr.",
    lessonLabel: "درس 76 — بافت، روشنایی، وزن و تراکم"
  },
  {
    word: "bulky",
    meaning: "حجیم و دست‌وپاگیر",
    lesson: 76,
    pos: "adj.",
    lessonLabel: "درس 76 — بافت، روشنایی، وزن و تراکم"
  },
  {
    word: "cumbersome",
    meaning: "دست‌وپاگیر",
    lesson: 76,
    pos: "adj.",
    lessonLabel: "درس 76 — بافت، روشنایی، وزن و تراکم"
  },
  {
    word: "succeed in",
    meaning: "موفق شدن در",
    lesson: 77,
    pos: "v.",
    lessonLabel: "درس 77 — موفقیت، شکست و دشواری"
  },
  {
    word: "manage",
    meaning: "توانستن، تدبیر کردن",
    lesson: 77,
    pos: "v.",
    lessonLabel: "درس 77 — موفقیت، شکست و دشواری"
  },
  {
    word: "achieve",
    meaning: "به دست آوردن، محقق کردن",
    lesson: 77,
    pos: "v.",
    lessonLabel: "درس 77 — موفقیت، شکست و دشواری"
  },
  {
    word: "accomplish",
    meaning: "انجام دادن، تحقق بخشیدن",
    lesson: 77,
    pos: "v.",
    lessonLabel: "درس 77 — موفقیت، شکست و دشواری"
  },
  {
    word: "goal",
    meaning: "هدف",
    lesson: 77,
    pos: "n.",
    lessonLabel: "درس 77 — موفقیت، شکست و دشواری"
  },
  {
    word: "aim",
    meaning: "هدف",
    lesson: 77,
    pos: "n.",
    lessonLabel: "درس 77 — موفقیت، شکست و دشواری"
  },
  {
    word: "target",
    meaning: "هدف، نشانه",
    lesson: 77,
    pos: "n.",
    lessonLabel: "درس 77 — موفقیت، شکست و دشواری"
  },
  {
    word: "ambition",
    meaning: "جاه‌طلبی، آرزو",
    lesson: 77,
    pos: "n.",
    lessonLabel: "درس 77 — موفقیت، شکست و دشواری"
  },
  {
    word: "come off",
    meaning: "موفق شدن (غیررسمی)",
    lesson: 77,
    pos: "phr.",
    lessonLabel: "درس 77 — موفقیت، شکست و دشواری"
  },
  {
    word: "reach",
    meaning: "رسیدن به",
    lesson: 77,
    pos: "v.",
    lessonLabel: "درس 77 — موفقیت، شکست و دشواری"
  },
  {
    word: "attain",
    meaning: "نایل شدن، کسب کردن",
    lesson: 77,
    pos: "v.",
    lessonLabel: "درس 77 — موفقیت، شکست و دشواری"
  },
  {
    word: "secure",
    meaning: "به دست آوردن، تضمین کردن",
    lesson: 77,
    pos: "v.",
    lessonLabel: "درس 77 — موفقیت، شکست و دشواری"
  },
  {
    word: "realise",
    meaning: "محقق کردن",
    lesson: 77,
    pos: "v.",
    lessonLabel: "درس 77 — موفقیت، شکست و دشواری"
  },
  {
    word: "fulfil",
    meaning: "برآورده کردن",
    lesson: 77,
    pos: "v.",
    lessonLabel: "درس 77 — موفقیت، شکست و دشواری"
  },
  {
    word: "an agreement",
    meaning: "توافق",
    lesson: 77,
    pos: "n.",
    lessonLabel: "درس 77 — موفقیت، شکست و دشواری"
  },
  {
    word: "an obligation",
    meaning: "التزام، تکلیف",
    lesson: 77,
    pos: "n.",
    lessonLabel: "درس 77 — موفقیت، شکست و دشواری"
  },
  {
    word: "a compromise",
    meaning: "مصالحه، سازش",
    lesson: 77,
    pos: "n.",
    lessonLabel: "درس 77 — موفقیت، شکست و دشواری"
  },
  {
    word: "go wrong",
    meaning: "از روند خارج شدن، خراب شدن",
    lesson: 77,
    pos: "phr.",
    lessonLabel: "درس 77 — موفقیت، شکست و دشواری"
  },
  {
    word: "backfire",
    meaning: "عکس اثر داشتن",
    lesson: 77,
    pos: "v.",
    lessonLabel: "درس 77 — موفقیت، شکست و دشواری"
  },
  {
    word: "fold",
    meaning: "تعطیل شدن، ورشکست شدن",
    lesson: 77,
    pos: "v.",
    lessonLabel: "درس 77 — موفقیت، شکست و دشواری"
  },
  {
    word: "go under",
    meaning: "ورشکست شدن",
    lesson: 77,
    pos: "phr.",
    lessonLabel: "درس 77 — موفقیت، شکست و دشواری"
  },
  {
    word: "falter",
    meaning: "سستی کردن، فلج شدن",
    lesson: 77,
    pos: "v.",
    lessonLabel: "درس 77 — موفقیت، شکست و دشواری"
  },
  {
    word: "come to nothing",
    meaning: "بی‌نتیجه شدن",
    lesson: 77,
    pos: "phr.",
    lessonLabel: "درس 77 — موفقیت، شکست و دشواری"
  },
  {
    word: "difficulty",
    meaning: "دشواری",
    lesson: 77,
    pos: "n.",
    lessonLabel: "درس 77 — موفقیت، شکست و دشواری"
  },
  {
    word: "find it difficult",
    meaning: "دشوار یافتن (کاری را)",
    lesson: 77,
    pos: "phr.",
    lessonLabel: "درس 77 — موفقیت، شکست و دشواری"
  },
  {
    word: "hard",
    meaning: "سخت",
    lesson: 77,
    pos: "adj.",
    lessonLabel: "درس 77 — موفقیت، شکست و دشواری"
  },
  {
    word: "have trouble",
    meaning: "مشکل داشتن (در انجام کاری)",
    lesson: 77,
    pos: "phr.",
    lessonLabel: "درس 77 — موفقیت، شکست و دشواری"
  },
  {
    word: "have a lot of bother with",
    meaning: "درگیر دردسر زیاد بودن با",
    lesson: 77,
    pos: "phr.",
    lessonLabel: "درس 77 — موفقیت، شکست و دشواری"
  },
  {
    word: "cope with",
    meaning: "کنار آمدن با، از عهده برآمدن",
    lesson: 77,
    pos: "phr.",
    lessonLabel: "درس 77 — موفقیت، شکست و دشواری"
  },
  {
    word: "can't cope",
    meaning: "نمی‌تواند از عهده برآید",
    lesson: 77,
    pos: "phr.",
    lessonLabel: "درس 77 — موفقیت، شکست و دشواری"
  },
  {
    word: "success",
    meaning: "موفقیت",
    lesson: 77,
    pos: "n.",
    lessonLabel: "درس 77 — موفقیت، شکست و دشواری"
  },
  {
    word: "successful",
    meaning: "موفق",
    lesson: 77,
    pos: "adj.",
    lessonLabel: "درس 77 — موفقیت، شکست و دشواری"
  },
  {
    word: "successfully",
    meaning: "با موفقیت",
    lesson: 77,
    pos: "adv.",
    lessonLabel: "درس 77 — موفقیت، شکست و دشواری"
  },
  {
    word: "accomplishment",
    meaning: "دستاورد، إنجاز",
    lesson: 77,
    pos: "n.",
    lessonLabel: "درس 77 — موفقیت، شکست و دشواری"
  },
  {
    word: "accomplished",
    meaning: "ماهر، انجام‌شده",
    lesson: 77,
    pos: "adj.",
    lessonLabel: "درس 77 — موفقیت، شکست و دشواری"
  },
  {
    word: "achievement",
    meaning: "دستاورد",
    lesson: 77,
    pos: "n.",
    lessonLabel: "درس 77 — موفقیت، شکست و دشواری"
  },
  {
    word: "achievable",
    meaning: "قابل دستیابی",
    lesson: 77,
    pos: "adj.",
    lessonLabel: "درس 77 — موفقیت، شکست و دشواری"
  },
  {
    word: "attainment",
    meaning: "کسب، دستاورد",
    lesson: 77,
    pos: "n.",
    lessonLabel: "درس 77 — موفقیت، شکست و دشواری"
  },
  {
    word: "attainable",
    meaning: "قابل حصول",
    lesson: 77,
    pos: "adj.",
    lessonLabel: "درس 77 — موفقیت، شکست و دشواری"
  },
  {
    word: "fulfilment",
    meaning: "تحقق، برآورده شدن",
    lesson: 77,
    pos: "n.",
    lessonLabel: "درس 77 — موفقیت، شکست و دشواری"
  },
  {
    word: "fulfilling",
    meaning: "رضایت‌بخش",
    lesson: 77,
    pos: "adj.",
    lessonLabel: "درس 77 — موفقیت، شکست و دشواری"
  },
  {
    word: "harden",
    meaning: "سخت کردن",
    lesson: 77,
    pos: "v.",
    lessonLabel: "درس 77 — موفقیت، شکست و دشواری"
  },
  {
    word: "hardness",
    meaning: "سختی",
    lesson: 77,
    pos: "n.",
    lessonLabel: "درس 77 — موفقیت، شکست و دشواری"
  },
  {
    word: "to feel under the weather",
    meaning: "حال آدم بد بودن / مریض بودن",
    lesson: 78,
    pos: "phr.",
    lessonLabel: "درس 78 — اصطلاح‌ها و عبارت‌های ثابت — کلیات"
  },
  {
    word: "has seen better days",
    meaning: "روزگار بهتری داشته (کهنه و از رفته است)",
    lesson: 78,
    pos: "phr.",
    lessonLabel: "درس 78 — اصطلاح‌ها و عبارت‌های ثابت — کلیات"
  },
  {
    word: "take the weight off your feet",
    meaning: "بنشین (استراحت کن)",
    lesson: 78,
    pos: "phr.",
    lessonLabel: "درس 78 — اصطلاح‌ها و عبارت‌های ثابت — کلیات"
  },
  {
    word: "get the wrong end of the stick",
    meaning: "برداشت اشتباه کردن، سوءتفاهم پیدا کردن",
    lesson: 78,
    pos: "phr.",
    lessonLabel: "درس 78 — اصطلاح‌ها و عبارت‌های ثابت — کلیات"
  },
  {
    word: "pull a fast one",
    meaning: "فریب دادن، کلک زدن",
    lesson: 78,
    pos: "phr.",
    lessonLabel: "درس 78 — اصطلاح‌ها و عبارت‌های ثابت — کلیات"
  },
  {
    word: "poke your nose in(to)",
    meaning: "دست‌انداز کردن، دخالت کردن در کار دیگران",
    lesson: 78,
    pos: "phr.",
    lessonLabel: "درس 78 — اصطلاح‌ها و عبارت‌های ثابت — کلیات"
  },
  {
    word: "be over the moon",
    meaning: "خیلی خوشحال بودن، از خوشحالی در آسمان بودن",
    lesson: 78,
    pos: "phr.",
    lessonLabel: "درس 78 — اصطلاح‌ها و عبارت‌های ثابت — کلیات"
  },
  {
    word: "feel down in the dumps",
    meaning: "افسرده و دل‌شکسته بودن",
    lesson: 78,
    pos: "phr.",
    lessonLabel: "درس 78 — اصطلاح‌ها و عبارت‌های ثابت — کلیات"
  },
  {
    word: "be in the red",
    meaning: "بدهی بانکی داشتن، حساب بانکی منفی داشتن",
    lesson: 78,
    pos: "phr.",
    lessonLabel: "درس 78 — اصطلاح‌ها و عبارت‌های ثابت — کلیات"
  },
  {
    word: "as daft as a brush",
    meaning: "خیلی احمق و خنگ بودن",
    lesson: 78,
    pos: "phr.",
    lessonLabel: "درس 78 — اصطلاح‌ها و عبارت‌های ثابت — کلیات"
  },
  {
    word: "take the biscuit",
    meaning: "از همه بدتر / عجیب‌تر بودن، تِکه داشتن",
    lesson: 78,
    pos: "phr.",
    lessonLabel: "درس 78 — اصطلاح‌ها و عبارت‌های ثابت — کلیات"
  },
  {
    word: "a pain in the neck",
    meaning: "آدم عذاب‌دهنده و دردسرساز",
    lesson: 78,
    pos: "phr.",
    lessonLabel: "درس 78 — اصطلاح‌ها و عبارت‌های ثابت — کلیات"
  },
  {
    word: "make a meal out of",
    meaning: "از چیزی فراتر از حد اغراق کردن",
    lesson: 78,
    pos: "phr.",
    lessonLabel: "درس 78 — اصطلاح‌ها و عبارت‌های ثابت — کلیات"
  },
  {
    word: "make a move",
    meaning: "راه افتادن، رفتن",
    lesson: 78,
    pos: "phr.",
    lessonLabel: "درس 78 — اصطلاح‌ها و عبارت‌های ثابت — کلیات"
  },
  {
    word: "on the make",
    meaning: "دنبال پول و قدرت برای خود بودن",
    lesson: 78,
    pos: "phr.",
    lessonLabel: "درس 78 — اصطلاح‌ها و عبارت‌های ثابت — کلیات"
  },
  {
    word: "bark up the wrong tree",
    meaning: "اشتباه گرفتن، به گانهٔ اشتباه رفتن",
    lesson: 78,
    pos: "phr.",
    lessonLabel: "درس 78 — اصطلاح‌ها و عبارت‌های ثابت — کلیات"
  },
  {
    word: "As I was saying",
    meaning: "همان‌طور که می‌گفتم",
    lesson: 79,
    pos: "phr.",
    lessonLabel: "درس 79 — عبارت‌های روزمره"
  },
  {
    word: "As I/you say",
    meaning: "همان‌طور که من/تو می‌گویی",
    lesson: 79,
    pos: "phr.",
    lessonLabel: "درس 79 — عبارت‌های روزمره"
  },
  {
    word: "Talking of",
    meaning: "از این صحبت، ...",
    lesson: 79,
    pos: "phr.",
    lessonLabel: "درس 79 — عبارت‌های روزمره"
  },
  {
    word: "If you ask me",
    meaning: "اگر نظر من را بخواهی / به نظر من",
    lesson: 79,
    pos: "phr.",
    lessonLabel: "درس 79 — عبارت‌های روزمره"
  },
  {
    word: "That reminds me",
    meaning: "این یاده‌کردنی شد",
    lesson: 79,
    pos: "phr.",
    lessonLabel: "درس 79 — عبارت‌های روزمره"
  },
  {
    word: "Come to think of it",
    meaning: "حالا که فکرش را می‌کنم",
    lesson: 79,
    pos: "phr.",
    lessonLabel: "درس 79 — عبارت‌های روزمره"
  },
  {
    word: "This is it",
    meaning: "این نکتهٔ مهم است",
    lesson: 79,
    pos: "phr.",
    lessonLabel: "درس 79 — عبارت‌های روزمره"
  },
  {
    word: "That's it",
    meaning: "همین است؛ کار تمام است",
    lesson: 79,
    pos: "phr.",
    lessonLabel: "درس 79 — عبارت‌های روزمره"
  },
  {
    word: "this and that",
    meaning: "این و آن (کارهای بی‌اهمیت)",
    lesson: 79,
    pos: "phr.",
    lessonLabel: "درس 79 — عبارت‌های روزمره"
  },
  {
    word: "this, that and the other",
    meaning: "این و آن و یک‌سری کارهای دیگر",
    lesson: 79,
    pos: "phr.",
    lessonLabel: "درس 79 — عبارت‌های روزمره"
  },
  {
    word: "So, that's that, then",
    meaning: "خب، پس قضیه حل شد",
    lesson: 79,
    pos: "phr.",
    lessonLabel: "درس 79 — عبارت‌های روزمره"
  },
  {
    word: "If the worst comes to the worst",
    meaning: "اگر وضعیت خیلی بد شود",
    lesson: 79,
    pos: "phr.",
    lessonLabel: "درس 79 — عبارت‌های روزمره"
  },
  {
    word: "If all else fails",
    meaning: "اگر هیچ چیز دیگر جواب ندهد",
    lesson: 79,
    pos: "phr.",
    lessonLabel: "درس 79 — عبارت‌های روزمره"
  },
  {
    word: "What with one thing and another",
    meaning: "به‌خاطر این‌ور و آن‌ور رفتن کارها",
    lesson: 79,
    pos: "phr.",
    lessonLabel: "درس 79 — عبارت‌های روزمره"
  },
  {
    word: "When it comes to",
    meaning: "وقتی پای ... در میان باشد",
    lesson: 79,
    pos: "phr.",
    lessonLabel: "درس 79 — عبارت‌های روزمره"
  },
  {
    word: "As far as I'm concerned",
    meaning: "تا جایی که به من مربوط است / از نظر من",
    lesson: 79,
    pos: "phr.",
    lessonLabel: "درس 79 — عبارت‌های روزمره"
  },
  {
    word: "As luck would have it",
    meaning: "اتفاقی / از قضا",
    lesson: 79,
    pos: "phr.",
    lessonLabel: "درس 79 — عبارت‌های روزمره"
  },
  {
    word: "as dead as a doornail",
    meaning: "کاملاً مُرده",
    lesson: 80,
    pos: "phr.",
    lessonLabel: "درس 80 — تشدیه‌ها"
  },
  {
    word: "as blind as a bat*",
    meaning: "کور مثل خفاش (کور مطلق)",
    lesson: 80,
    pos: "phr.",
    lessonLabel: "درس 80 — تشدیه‌ها"
  },
  {
    word: "as thin as a rake*",
    meaning: "لاغر مثل چنگک (استخوانی)",
    lesson: 80,
    pos: "phr.",
    lessonLabel: "درس 80 — تشدیه‌ها"
  },
  {
    word: "as strong as an ox",
    meaning: "قوی مثل گاو",
    lesson: 80,
    pos: "phr.",
    lessonLabel: "درس 80 — تشدیه‌ها"
  },
  {
    word: "as quiet as a mouse",
    meaning: "ساکت و بی‌صدا مثل موش",
    lesson: 80,
    pos: "phr.",
    lessonLabel: "درس 80 — تشدیه‌ها"
  },
  {
    word: "as heavy as lead",
    meaning: "سنگین مثل سرب",
    lesson: 80,
    pos: "phr.",
    lessonLabel: "درس 80 — تشدیه‌ها"
  },
  {
    word: "as light as a feather",
    meaning: "سبک مثل پر",
    lesson: 80,
    pos: "phr.",
    lessonLabel: "درس 80 — تشدیه‌ها"
  },
  {
    word: "as drunk as a lord*",
    meaning: "به‌شدت مست",
    lesson: 80,
    pos: "phr.",
    lessonLabel: "درس 80 — تشدیه‌ها"
  },
  {
    word: "as sober as a judge",
    meaning: "کاملاً هوشیار و مست",
    lesson: 80,
    pos: "phr.",
    lessonLabel: "درس 80 — تشدیه‌ها"
  },
  {
    word: "as black as night",
    meaning: "سیاه مثل شب",
    lesson: 80,
    pos: "phr.",
    lessonLabel: "درس 80 — تشدیه‌ها"
  },
  {
    word: "as white as snow",
    meaning: "سفید مثل برف",
    lesson: 80,
    pos: "phr.",
    lessonLabel: "درس 80 — تشدیه‌ها"
  },
  {
    word: "as brown as a berry",
    meaning: "برنزه/قهوه‌ای مثل توت",
    lesson: 80,
    pos: "phr.",
    lessonLabel: "درس 80 — تشدیه‌ها"
  },
  {
    word: "as good as gold",
    meaning: "خیلی خوش‌رفتار (دربارهٔ رفتار کودکان)",
    lesson: 80,
    pos: "phr.",
    lessonLabel: "درس 80 — تشدیه‌ها"
  },
  {
    word: "as cool as a cucumber",
    meaning: "خیلی خونسرد و آرام",
    lesson: 80,
    pos: "phr.",
    lessonLabel: "درس 80 — تشدیه‌ها"
  },
  {
    word: "as busy as a bee",
    meaning: "پرکار مثل زنبور",
    lesson: 80,
    pos: "phr.",
    lessonLabel: "درس 80 — تشدیه‌ها"
  },
  {
    word: "as hard as iron",
    meaning: "سخت مثل آهن",
    lesson: 80,
    pos: "phr.",
    lessonLabel: "درس 80 — تشدیه‌ها"
  },
  {
    word: "dry as a bone",
    meaning: "خشک مثل استخوان",
    lesson: 80,
    pos: "phr.",
    lessonLabel: "درس 80 — تشدیه‌ها"
  },
  {
    word: "as mad as a hatter*",
    meaning: "دیوانه‌وار",
    lesson: 80,
    pos: "phr.",
    lessonLabel: "درس 80 — تشدیه‌ها"
  },
  {
    word: "as bold as brass",
    meaning: "با پررویی و بی‌شرمی",
    lesson: 80,
    pos: "phr.",
    lessonLabel: "درس 80 — تشدیه‌ها"
  },
  {
    word: "as deaf as a post*",
    meaning: "کاملاً کر",
    lesson: 80,
    pos: "phr.",
    lessonLabel: "درس 80 — تشدیه‌ها"
  },
  {
    word: "as easy as falling off a log",
    meaning: "خیلی آسان",
    lesson: 80,
    pos: "phr.",
    lessonLabel: "درس 80 — تشدیه‌ها"
  },
  {
    word: "as quick as a flash",
    meaning: "به‌سرعت مثل برق",
    lesson: 80,
    pos: "phr.",
    lessonLabel: "درس 80 — تشدیه‌ها"
  },
  {
    word: "as red as a beetroot",
    meaning: "سرخ مثل لبو",
    lesson: 80,
    pos: "phr.",
    lessonLabel: "درس 80 — تشدیه‌ها"
  },
  {
    word: "as white as a sheet",
    meaning: "پریده‌رنگ (از ترس)",
    lesson: 80,
    pos: "phr.",
    lessonLabel: "درس 80 — تشدیه‌ها"
  },
  {
    word: "as sick as a dog",
    meaning: "به‌شدت استفراغ‌آور مریض",
    lesson: 80,
    pos: "phr.",
    lessonLabel: "درس 80 — تشدیه‌ها"
  },
  {
    word: "as sick as a parrot",
    meaning: "حس احساس ناامیدی و سرخوردگی شدید",
    lesson: 80,
    pos: "phr.",
    lessonLabel: "درس 80 — تشدیه‌ها"
  },
  {
    word: "as ... as can be",
    meaning: "ساختار تشبیهی «تا حد امکان»",
    lesson: 80,
    pos: "phr.",
    lessonLabel: "درس 80 — تشدیه‌ها"
  },
  {
    word: "work like a dream",
    meaning: "عالی جواب دادن (برنامه)",
    lesson: 80,
    pos: "phr.",
    lessonLabel: "درس 80 — تشدیه‌ها"
  },
  {
    word: "have eyes like a hawk",
    meaning: "چشم تیزبین داشتن",
    lesson: 80,
    pos: "phr.",
    lessonLabel: "درس 80 — تشدیه‌ها"
  },
  {
    word: "eat like a horse",
    meaning: "خیلی زیاد خوردن",
    lesson: 80,
    pos: "phr.",
    lessonLabel: "درس 80 — تشدیه‌ها"
  },
  {
    word: "drink like a fish*",
    meaning: "خیلی زیاد نوشیدن (الکل)",
    lesson: 80,
    pos: "phr.",
    lessonLabel: "درس 80 — تشدیه‌ها"
  },
  {
    word: "sleep like a log",
    meaning: "مثل مرده خوابیدن",
    lesson: 80,
    pos: "phr.",
    lessonLabel: "درس 80 — تشدیه‌ها"
  },
  {
    word: "a brain/head like a sieve",
    meaning: "حافظهٔ خیلی بد",
    lesson: 80,
    pos: "phr.",
    lessonLabel: "درس 80 — تشدیه‌ها"
  },
  {
    word: "like a bear with a sore head",
    meaning: "در بدخویی و عصبانیت شدید",
    lesson: 80,
    pos: "phr.",
    lessonLabel: "درس 80 — تشدیه‌ها"
  },
  {
    word: "like a bull in a china shop*",
    meaning: "دست‌وپاچلفتی و بی‌ملاحظه",
    lesson: 80,
    pos: "phr.",
    lessonLabel: "درس 80 — تشدیه‌ها"
  },
  {
    word: "like a red rag to a bull",
    meaning: "محرک خشم (قطعاً کسی را عصبانی می‌کند)",
    lesson: 80,
    pos: "phr.",
    lessonLabel: "درس 80 — تشدیه‌ها"
  },
  {
    word: "as flat as a pancake",
    meaning: "کاملاً صاف/مسطح",
    lesson: 80,
    pos: "phr.",
    lessonLabel: "درس 80 — تشدیه‌ها"
  },
  {
    word: "as fresh as a daisy",
    meaning: "سرحال و پرانرژی",
    lesson: 80,
    pos: "phr.",
    lessonLabel: "درس 80 — تشدیه‌ها"
  }
];

export const VOCAB_PART_4: Row[] = ROWS;
