// واژگان درس‌های English Vocabulary in Use — Pre-int & Int (پارتیت 3) — استخراج VLM از اسکن PDF
// word = عین چاپ کتاب · meaning = ترجمهٔ ماشینی GLM (کلاس FA-NEW — اثبات صحت ترجمه نیست)
import type { VocabWord } from "../types";

type Row = Omit<VocabWord, "lesson"> & { lesson: number; lessonLabel: string };

const ROWS: Row[] = [
  {
    word: "be like",
    meaning: "شبیه بودن به",
    lesson: 41,
    pos: "phr.",
    lessonLabel: "درس 41 — شباهت، تفاوت، مقایسه و استثنا"
  },
  {
    word: "similar to",
    meaning: "مشابه با",
    lesson: 41,
    pos: "adj.",
    lessonLabel: "درس 41 — شباهت، تفاوت، مقایسه و استثنا"
  },
  {
    word: "similar",
    meaning: "مشابه",
    lesson: 41,
    pos: "adj.",
    lessonLabel: "درس 41 — شباهت، تفاوت، مقایسه و استثنا"
  },
  {
    word: "similarity",
    meaning: "شباهت",
    lesson: 41,
    pos: "n.",
    lessonLabel: "درس 41 — شباهت، تفاوت، مقایسه و استثنا"
  },
  {
    word: "both",
    meaning: "هر دو",
    lesson: 41,
    pos: "phr.",
    lessonLabel: "درس 41 — شباهت، تفاوت، مقایسه و استثنا"
  },
  {
    word: "neither",
    meaning: "هیچ‌کدام (از دو)",
    lesson: 41,
    pos: "phr.",
    lessonLabel: "درس 41 — شباهت، تفاوت، مقایسه و استثنا"
  },
  {
    word: "have a lot in common",
    meaning: "نقاط مشترک زیادی داشت",
    lesson: 41,
    pos: "phr.",
    lessonLabel: "درس 41 — شباهت، تفاوت، مقایسه و استثنا"
  },
  {
    word: "different from",
    meaning: "متفاوت از",
    lesson: 41,
    pos: "adj.",
    lessonLabel: "درس 41 — شباهت، تفاوت، مقایسه و استثنا"
  },
  {
    word: "completely different",
    meaning: "کاملاً متفاوت",
    lesson: 41,
    pos: "phr.",
    lessonLabel: "درس 41 — شباهت، تفاوت، مقایسه و استثنا"
  },
  {
    word: "quite unlike",
    meaning: "کاملاً نامشابه با",
    lesson: 41,
    pos: "phr.",
    lessonLabel: "درس 41 — شباهت، تفاوت، مقایسه و استثنا"
  },
  {
    word: "have nothing in common",
    meaning: "هیچ وجه مشترکی نداش",
    lesson: 41,
    pos: "phr.",
    lessonLabel: "درس 41 — شباهت، تفاوت، مقایسه و استثنا"
  },
  {
    word: "compare",
    meaning: "مقایسه ک",
    lesson: 41,
    pos: "v.",
    lessonLabel: "درس 41 — شباهت، تفاوت، مقایسه و استثنا"
  },
  {
    word: "comparison",
    meaning: "مقایسه",
    lesson: 41,
    pos: "n.",
    lessonLabel: "درس 41 — شباهت، تفاوت، مقایسه و استثنا"
  },
  {
    word: "in comparison with",
    meaning: "در مقایسه با",
    lesson: 41,
    pos: "phr.",
    lessonLabel: "درس 41 — شباهت، تفاوت، مقایسه و استثنا"
  },
  {
    word: "compared with/to",
    meaning: "در مقایسه با",
    lesson: 41,
    pos: "phr.",
    lessonLabel: "درس 41 — شباهت، تفاوت، مقایسه و استثنا"
  },
  {
    word: "exception",
    meaning: "استثنا",
    lesson: 41,
    pos: "n.",
    lessonLabel: "درس 41 — شباهت، تفاوت، مقایسه و استثنا"
  },
  {
    word: "except",
    meaning: "به جز",
    lesson: 41,
    pos: "phr.",
    lessonLabel: "درس 41 — شباهت، تفاوت، مقایسه و استثنا"
  },
  {
    word: "apart from",
    meaning: "به جز",
    lesson: 41,
    pos: "phr.",
    lessonLabel: "درس 41 — شباهت، تفاوت، مقایسه و استثنا"
  },
  {
    word: "with the exception of",
    meaning: "به استثنای",
    lesson: 41,
    pos: "phr.",
    lessonLabel: "درس 41 — شباهت، تفاوت، مقایسه و استثنا"
  },
  {
    word: "except for",
    meaning: "به جز",
    lesson: 41,
    pos: "phr.",
    lessonLabel: "درس 41 — شباهت، تفاوت، مقایسه و استثنا"
  },
  {
    word: "because",
    meaning: "زیرا",
    lesson: 42,
    pos: "conj.",
    lessonLabel: "درس 42 — علت، هدف، نتیجه و شرط"
  },
  {
    word: "as",
    meaning: "زیرا / چون",
    lesson: 42,
    pos: "conj.",
    lessonLabel: "درس 42 — علت، هدف، نتیجه و شرط"
  },
  {
    word: "so",
    meaning: "بنابراین",
    lesson: 42,
    pos: "conj.",
    lessonLabel: "درس 42 — علت، هدف، نتیجه و شرط"
  },
  {
    word: "reason",
    meaning: "دلیل / علت",
    lesson: 42,
    pos: "n.",
    lessonLabel: "درس 42 — علت، هدف، نتیجه و شرط"
  },
  {
    word: "because of",
    meaning: "به دلیل (+ اسم)",
    lesson: 42,
    pos: "phr.",
    lessonLabel: "درس 42 — علت، هدف، نتیجه و شرط"
  },
  {
    word: "due to",
    meaning: "به علت (+ اسم، اغلب بعد از فعل to be)",
    lesson: 42,
    pos: "phr.",
    lessonLabel: "درس 42 — علت، هدف، نتیجه و شرط"
  },
  {
    word: "purpose",
    meaning: "هدف / منظور",
    lesson: 42,
    pos: "n.",
    lessonLabel: "درس 42 — علت، هدف، نتیجه و شرط"
  },
  {
    word: "so (that)",
    meaning: "به‌طوری‌که / برای اینکه",
    lesson: 42,
    pos: "phr.",
    lessonLabel: "درس 42 — علت، هدف، نتیجه و شرط"
  },
  {
    word: "in order to",
    meaning: "برای اینکه",
    lesson: 42,
    pos: "phr.",
    lessonLabel: "درس 42 — علت، هدف، نتیجه و شرط"
  },
  {
    word: "(in order) to",
    meaning: "برای اینکه (+ فعل)",
    lesson: 42,
    pos: "phr.",
    lessonLabel: "درس 42 — علت، هدف، نتیجه و شرط"
  },
  {
    word: "therefore",
    meaning: "بنابراین (رسمی‌تر)",
    lesson: 42,
    pos: "adv.",
    lessonLabel: "درس 42 — علت، هدف، نتیجه و شرط"
  },
  {
    word: "as a result",
    meaning: "در نتیجه",
    lesson: 42,
    pos: "phr.",
    lessonLabel: "درس 42 — علت، هدف، نتیجه و شرط"
  },
  {
    word: "condition",
    meaning: "شرط",
    lesson: 42,
    pos: "n.",
    lessonLabel: "درس 42 — علت، هدف، نتیجه و شرط"
  },
  {
    word: "if",
    meaning: "اگر",
    lesson: 42,
    pos: "conj.",
    lessonLabel: "درس 42 — علت، هدف، نتیجه و شرط"
  },
  {
    word: "unless",
    meaning: "مگر اینکه / اگر نه",
    lesson: 42,
    pos: "conj.",
    lessonLabel: "درس 42 — علت، هدف، نتیجه و شرط"
  },
  {
    word: "otherwise",
    meaning: "وگرنه",
    lesson: 42,
    pos: "adv.",
    lessonLabel: "درس 42 — علت، هدف، نتیجه و شرط"
  },
  {
    word: "as long as",
    meaning: "تا زمانی که / به شرطی که",
    lesson: 42,
    pos: "phr.",
    lessonLabel: "درس 42 — علت، هدف، نتیجه و شرط"
  },
  {
    word: "space",
    meaning: "فضا",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — جهان فیزیکی"
  },
  {
    word: "the world",
    meaning: "دنیا",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — جهان فیزیکی"
  },
  {
    word: "the earth",
    meaning: "زمین",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — جهان فیزیکی"
  },
  {
    word: "sun",
    meaning: "خورشید",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — جهان فیزیکی"
  },
  {
    word: "stars",
    meaning: "ستاره‌ها",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — جهان فیزیکی"
  },
  {
    word: "moon",
    meaning: "ماه",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — جهان فیزیکی"
  },
  {
    word: "Earth",
    meaning: "کرهٔ زمین",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — جهان فیزیکی"
  },
  {
    word: "northern hemisphere",
    meaning: "نیمکرهٔ شمالی",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — جهان فیزیکی"
  },
  {
    word: "southern hemisphere",
    meaning: "نیمکرهٔ جنوبی",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — جهان فیزیکی"
  },
  {
    word: "north pole",
    meaning: "قطب شمال",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — جهان فیزیکی"
  },
  {
    word: "south pole",
    meaning: "قطب جنوب",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — جهان فیزیکی"
  },
  {
    word: "equator",
    meaning: "خط استوا",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — جهان فیزیکی"
  },
  {
    word: "time difference between",
    meaning: "اختلاف زمانی بین",
    lesson: 43,
    pos: "phr.",
    lessonLabel: "درس 43 — جهان فیزیکی"
  },
  {
    word: "behind",
    meaning: "عقب‌تر (از نظر زمانی)",
    lesson: 43,
    pos: "adv.",
    lessonLabel: "درس 43 — جهان فیزیکی"
  },
  {
    word: "ahead of",
    meaning: "جلوتر (از نظر زمانی)",
    lesson: 43,
    pos: "phr.",
    lessonLabel: "درس 43 — جهان فیزیکی"
  },
  {
    word: "continent",
    meaning: "قاره",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — جهان فیزیکی"
  },
  {
    word: "country",
    meaning: "کشور",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — جهان فیزیکی"
  },
  {
    word: "ocean",
    meaning: "اقیانوس",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — جهان فیزیکی"
  },
  {
    word: "lake",
    meaning: "دریاچه",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — جهان فیزیکی"
  },
  {
    word: "river",
    meaning: "رودخانه",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — جهان فیزیکی"
  },
  {
    word: "sea",
    meaning: "دریا",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — جهان فیزیکی"
  },
  {
    word: "desert",
    meaning: "بیابان",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — جهان فیزیکی"
  },
  {
    word: "rainforest",
    meaning: "جنگل بارانی",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — جهان فیزیکی"
  },
  {
    word: "mountain (Mount Everest)",
    meaning: "کوه (کوه اورست)",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — جهان فیزیکی"
  },
  {
    word: "island",
    meaning: "جزیره",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — جهان فیزیکی"
  },
  {
    word: "coast",
    meaning: "ساحل (کرانه)",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — جهان فیزیکی"
  },
  {
    word: "disaster",
    meaning: "فاجعه/بلای طبیعی",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — جهان فیزیکی"
  },
  {
    word: "physical damage",
    meaning: "خسارت فیزیکی",
    lesson: 43,
    pos: "phr.",
    lessonLabel: "درس 43 — جهان فیزیکی"
  },
  {
    word: "earthquake",
    meaning: "زمین‌لرزه",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — جهان فیزیکی"
  },
  {
    word: "hurricane",
    meaning: "توفان/گردباد",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — جهان فیزیکی"
  },
  {
    word: "flood",
    meaning: "سیل",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — جهان فیزیکی"
  },
  {
    word: "volcano",
    meaning: "آتشفشان",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — جهان فیزیکی"
  },
  {
    word: "volcanic eruption",
    meaning: "فوران آتشفشان",
    lesson: 43,
    pos: "phr.",
    lessonLabel: "درس 43 — جهان فیزیکی"
  },
  {
    word: "destroy",
    meaning: "نابود کردن",
    lesson: 43,
    pos: "v.",
    lessonLabel: "درس 43 — جهان فیزیکی"
  },
  {
    word: "hit",
    meaning: "برخورد کردن/زدن",
    lesson: 43,
    pos: "v.",
    lessonLabel: "درس 43 — جهان فیزیکی"
  },
  {
    word: "drown",
    meaning: "غرق شدن",
    lesson: 43,
    pos: "v.",
    lessonLabel: "درس 43 — جهان فیزیکی"
  },
  {
    word: "active volcanoes",
    meaning: "آتشفشان‌های فعال",
    lesson: 43,
    pos: "phr.",
    lessonLabel: "درس 43 — جهان فیزیکی"
  },
  {
    word: "sun",
    meaning: "خورشید",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — هوا"
  },
  {
    word: "sunny",
    meaning: "آفتابی",
    lesson: 44,
    pos: "adj.",
    lessonLabel: "درس 44 — هوا"
  },
  {
    word: "cloud",
    meaning: "ابر",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — هوا"
  },
  {
    word: "cloudy",
    meaning: "ابری",
    lesson: 44,
    pos: "adj.",
    lessonLabel: "درس 44 — هوا"
  },
  {
    word: "fog",
    meaning: "مه",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — هوا"
  },
  {
    word: "foggy",
    meaning: "مه‌آلود",
    lesson: 44,
    pos: "adj.",
    lessonLabel: "درس 44 — هوا"
  },
  {
    word: "heat",
    meaning: "گرما",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — هوا"
  },
  {
    word: "hot",
    meaning: "داغ/گرم",
    lesson: 44,
    pos: "adj.",
    lessonLabel: "درس 44 — هوا"
  },
  {
    word: "wind",
    meaning: "باد",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — هوا"
  },
  {
    word: "windy",
    meaning: "بادی",
    lesson: 44,
    pos: "adj.",
    lessonLabel: "درس 44 — هوا"
  },
  {
    word: "ice",
    meaning: "یخ",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — هوا"
  },
  {
    word: "icy",
    meaning: "یخ‌زده",
    lesson: 44,
    pos: "adj.",
    lessonLabel: "درس 44 — هوا"
  },
  {
    word: "shower",
    meaning: "رگبار (باران کوتاه)",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — هوا"
  },
  {
    word: "showery",
    meaning: "رگباری",
    lesson: 44,
    pos: "adj.",
    lessonLabel: "درس 44 — هوا"
  },
  {
    word: "humidity",
    meaning: "رطوبت",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — هوا"
  },
  {
    word: "humid",
    meaning: "مرطوب",
    lesson: 44,
    pos: "adj.",
    lessonLabel: "درس 44 — هوا"
  },
  {
    word: "drizzle",
    meaning: "نم‌نم باران",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — هوا"
  },
  {
    word: "pour",
    meaning: "شدیداً باران باریدن",
    lesson: 44,
    pos: "v.",
    lessonLabel: "درس 44 — هوا"
  },
  {
    word: "thermometer",
    meaning: "دماسنج",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — هوا"
  },
  {
    word: "boiling",
    meaning: "خیلی داغ",
    lesson: 44,
    pos: "adj.",
    lessonLabel: "درس 44 — هوا"
  },
  {
    word: "warm",
    meaning: "معتدل/گرم",
    lesson: 44,
    pos: "adj.",
    lessonLabel: "درس 44 — هوا"
  },
  {
    word: "not very warm",
    meaning: "چندان گرم نیست",
    lesson: 44,
    lessonLabel: "درس 44 — هوا"
  },
  {
    word: "cold",
    meaning: "سرد",
    lesson: 44,
    pos: "adj.",
    lessonLabel: "درس 44 — هوا"
  },
  {
    word: "chilly",
    meaning: "خنک/سرد",
    lesson: 44,
    pos: "adj.",
    lessonLabel: "درس 44 — هوا"
  },
  {
    word: "freezing",
    meaning: "خیلی سرد",
    lesson: 44,
    pos: "adj.",
    lessonLabel: "درس 44 — هوا"
  },
  {
    word: "a breeze",
    meaning: "نسیم",
    lesson: 44,
    lessonLabel: "درس 44 — هوا"
  },
  {
    word: "a strong wind",
    meaning: "باد شدید",
    lesson: 44,
    lessonLabel: "درس 44 — هوا"
  },
  {
    word: "a gale",
    meaning: "تندباد",
    lesson: 44,
    lessonLabel: "درس 44 — هوا"
  },
  {
    word: "a hurricane",
    meaning: "گردباد/طوفان",
    lesson: 44,
    lessonLabel: "درس 44 — هوا"
  },
  {
    word: "heatwave",
    meaning: "موج گرما",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — هوا"
  },
  {
    word: "thunderstorm",
    meaning: "رعد و برق همراه با باران/طوفان تندری",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — هوا"
  },
  {
    word: "thunder",
    meaning: "صدای رعد",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — هوا"
  },
  {
    word: "lightning",
    meaning: "آذرخش/برق",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — هوا"
  },
  {
    word: "keep pets",
    meaning: "نگهداری حیوانات خانگی",
    lesson: 45,
    pos: "phr.",
    lessonLabel: "درس 45 — جانوران و حشرات"
  },
  {
    word: "pet",
    meaning: "حیوان خانگی",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — جانوران و حشرات"
  },
  {
    word: "mouse",
    meaning: "موش",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — جانوران و حشرات"
  },
  {
    word: "rabbit",
    meaning: "خرگوش",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — جانوران و حشرات"
  },
  {
    word: "goldfish",
    meaning: "ماهی قرمز",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — جانوران و حشرات"
  },
  {
    word: "sheep",
    meaning: "گوسفند",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — جانوران و حشرات"
  },
  {
    word: "pig",
    meaning: "خوک",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — جانوران و حشرات"
  },
  {
    word: "cow",
    meaning: "گاو",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — جانوران و حشرات"
  },
  {
    word: "horse",
    meaning: "اسب",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — جانوران و حشرات"
  },
  {
    word: "chicken",
    meaning: "مرغ",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — جانوران و حشرات"
  },
  {
    word: "goat",
    meaning: "بز",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — جانوران و حشرات"
  },
  {
    word: "lamb",
    meaning: "بره",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — جانوران و حشرات"
  },
  {
    word: "the wild",
    meaning: "طبیعت وحشی",
    lesson: 45,
    pos: "phr.",
    lessonLabel: "درس 45 — جانوران و حشرات"
  },
  {
    word: "camel",
    meaning: "شتر",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — جانوران و حشرات"
  },
  {
    word: "bear",
    meaning: "خرس",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — جانوران و حشرات"
  },
  {
    word: "tiger",
    meaning: "ببر",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — جانوران و حشرات"
  },
  {
    word: "leopard",
    meaning: "پلنگ",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — جانوران و حشرات"
  },
  {
    word: "giraffe",
    meaning: "زرافه",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — جانوران و حشرات"
  },
  {
    word: "gorilla",
    meaning: "گوریل",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — جانوران و حشرات"
  },
  {
    word: "elephant",
    meaning: "فیل",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — جانوران و حشرات"
  },
  {
    word: "lion",
    meaning: "شیر",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — جانوران و حشرات"
  },
  {
    word: "monkey",
    meaning: "میمون",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — جانوران و حشرات"
  },
  {
    word: "zebra",
    meaning: "گورخر",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — جانوران و حشرات"
  },
  {
    word: "in danger of extinction",
    meaning: "در معرض انقراض",
    lesson: 45,
    pos: "phr.",
    lessonLabel: "درس 45 — جانوران و حشرات"
  },
  {
    word: "protect",
    meaning: "محافظت کردن",
    lesson: 45,
    pos: "v.",
    lessonLabel: "درس 45 — جانوران و حشرات"
  },
  {
    word: "bee",
    meaning: "زنبور عسل",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — جانوران و حشرات"
  },
  {
    word: "ant",
    meaning: "مورچه",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — جانوران و حشرات"
  },
  {
    word: "mosquito",
    meaning: "پشه",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — جانوران و حشرات"
  },
  {
    word: "butterfly",
    meaning: "پروانه",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — جانوران و حشرات"
  },
  {
    word: "fly",
    meaning: "مگس",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — جانوران و حشرات"
  },
  {
    word: "spider",
    meaning: "عنکبوت",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — جانوران و حشرات"
  },
  {
    word: "creature",
    meaning: "موجود",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — جانوران و حشرات"
  },
  {
    word: "move along the ground",
    meaning: "روی زمین حرکت کردن",
    lesson: 45,
    pos: "phr.",
    lessonLabel: "درس 45 — جانوران و حشرات"
  },
  {
    word: "whale",
    meaning: "نهنگ",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — جانوران و حشرات"
  },
  {
    word: "shark",
    meaning: "کوسه",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — جانوران و حشرات"
  },
  {
    word: "eagle",
    meaning: "عقاب",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — جانوران و حشرات"
  },
  {
    word: "snail",
    meaning: "حلزون",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — جانوران و حشرات"
  },
  {
    word: "snake",
    meaning: "مار",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — جانوران و حشرات"
  },
  {
    word: "Argentina",
    meaning: "آرژانتین",
    lesson: 46,
    lessonLabel: "درس 46 — کشورها، ملیت و زبان"
  },
  {
    word: "Argentinian",
    meaning: "آرژانتینی",
    lesson: 46,
    pos: "adj.",
    lessonLabel: "درس 46 — کشورها، ملیت و زبان"
  },
  {
    word: "Spanish",
    meaning: "اسپانیایی",
    lesson: 46,
    pos: "n.",
    lessonLabel: "درس 46 — کشورها، ملیت و زبان"
  },
  {
    word: "Brazil",
    meaning: "برزیل",
    lesson: 46,
    lessonLabel: "درس 46 — کشورها، ملیت و زبان"
  },
  {
    word: "Brazilian",
    meaning: "برزیلی",
    lesson: 46,
    pos: "adj.",
    lessonLabel: "درس 46 — کشورها، ملیت و زبان"
  },
  {
    word: "Portuguese",
    meaning: "پرتغالی",
    lesson: 46,
    pos: "n.",
    lessonLabel: "درس 46 — کشورها، ملیت و زبان"
  },
  {
    word: "Britain",
    meaning: "بریتانیا",
    lesson: 46,
    lessonLabel: "درس 46 — کشورها، ملیت و زبان"
  },
  {
    word: "British",
    meaning: "بریتانیایی",
    lesson: 46,
    pos: "adj.",
    lessonLabel: "درس 46 — کشورها، ملیت و زبان"
  },
  {
    word: "English",
    meaning: "انگلیسی",
    lesson: 46,
    pos: "n.",
    lessonLabel: "درس 46 — کشورها، ملیت و زبان"
  },
  {
    word: "China",
    meaning: "چین",
    lesson: 46,
    lessonLabel: "درس 46 — کشورها، ملیت و زبان"
  },
  {
    word: "Chinese",
    meaning: "چینی",
    lesson: 46,
    pos: "adj.",
    lessonLabel: "درس 46 — کشورها، ملیت و زبان"
  },
  {
    word: "Mandarin (also Cantonese)",
    meaning: "ماندارین (همچنین کانتونی)",
    lesson: 46,
    lessonLabel: "درس 46 — کشورها، ملیت و زبان"
  },
  {
    word: "Egypt",
    meaning: "مصر",
    lesson: 46,
    lessonLabel: "درس 46 — کشورها، ملیت و زبان"
  },
  {
    word: "Egyptian",
    meaning: "مصری",
    lesson: 46,
    pos: "adj.",
    lessonLabel: "درس 46 — کشورها، ملیت و زبان"
  },
  {
    word: "Arabic",
    meaning: "عربی",
    lesson: 46,
    pos: "n.",
    lessonLabel: "درس 46 — کشورها، ملیت و زبان"
  },
  {
    word: "France",
    meaning: "فرانسه",
    lesson: 46,
    lessonLabel: "درس 46 — کشورها، ملیت و زبان"
  },
  {
    word: "French",
    meaning: "فرانسوی",
    lesson: 46,
    pos: "n.",
    lessonLabel: "درس 46 — کشورها، ملیت و زبان"
  },
  {
    word: "Germany",
    meaning: "آلمان",
    lesson: 46,
    lessonLabel: "درس 46 — کشورها، ملیت و زبان"
  },
  {
    word: "German",
    meaning: "آلمانی",
    lesson: 46,
    pos: "n.",
    lessonLabel: "درس 46 — کشورها، ملیت و زبان"
  },
  {
    word: "Greece",
    meaning: "یونان",
    lesson: 46,
    lessonLabel: "درس 46 — کشورها، ملیت و زبان"
  },
  {
    word: "Greek",
    meaning: "یونانی",
    lesson: 46,
    pos: "n.",
    lessonLabel: "درس 46 — کشورها، ملیت و زبان"
  },
  {
    word: "Israel",
    meaning: "اسرائیل",
    lesson: 46,
    lessonLabel: "درس 46 — کشورها، ملیت و زبان"
  },
  {
    word: "Israeli",
    meaning: "اسرائیلی",
    lesson: 46,
    pos: "adj.",
    lessonLabel: "درس 46 — کشورها، ملیت و زبان"
  },
  {
    word: "Hebrew",
    meaning: "عبری",
    lesson: 46,
    pos: "n.",
    lessonLabel: "درس 46 — کشورها، ملیت و زبان"
  },
  {
    word: "Italy",
    meaning: "ایتالیا",
    lesson: 46,
    lessonLabel: "درس 46 — کشورها، ملیت و زبان"
  },
  {
    word: "Italian",
    meaning: "ایتالیایی",
    lesson: 46,
    pos: "n.",
    lessonLabel: "درس 46 — کشورها، ملیت و زبان"
  },
  {
    word: "Japan",
    meaning: "ژاپن",
    lesson: 46,
    lessonLabel: "درس 46 — کشورها، ملیت و زبان"
  },
  {
    word: "Japanese",
    meaning: "ژاپنی",
    lesson: 46,
    pos: "adj.",
    lessonLabel: "درس 46 — کشورها، ملیت و زبان"
  },
  {
    word: "Korea",
    meaning: "کره",
    lesson: 46,
    lessonLabel: "درس 46 — کشورها، ملیت و زبان"
  },
  {
    word: "Korean",
    meaning: "کره‌ای",
    lesson: 46,
    pos: "adj.",
    lessonLabel: "درس 46 — کشورها، ملیت و زبان"
  },
  {
    word: "Mexico",
    meaning: "مکزیک",
    lesson: 46,
    lessonLabel: "درس 46 — کشورها، ملیت و زبان"
  },
  {
    word: "Mexican",
    meaning: "مکزیکی",
    lesson: 46,
    pos: "adj.",
    lessonLabel: "درس 46 — کشورها، ملیت و زبان"
  },
  {
    word: "Poland",
    meaning: "لهستان",
    lesson: 46,
    lessonLabel: "درس 46 — کشورها، ملیت و زبان"
  },
  {
    word: "Polish",
    meaning: "لهستانی",
    lesson: 46,
    pos: "adj.",
    lessonLabel: "درس 46 — کشورها، ملیت و زبان"
  },
  {
    word: "Russia",
    meaning: "روسیه",
    lesson: 46,
    lessonLabel: "درس 46 — کشورها، ملیت و زبان"
  },
  {
    word: "Russian",
    meaning: "روسی",
    lesson: 46,
    pos: "adj.",
    lessonLabel: "درس 46 — کشورها، ملیت و زبان"
  },
  {
    word: "Saudi Arabia",
    meaning: "عربستان سعودی",
    lesson: 46,
    lessonLabel: "درس 46 — کشورها، ملیت و زبان"
  },
  {
    word: "Saudi Arabian",
    meaning: "عربستانی",
    lesson: 46,
    pos: "adj.",
    lessonLabel: "درس 46 — کشورها، ملیت و زبان"
  },
  {
    word: "Spain",
    meaning: "اسپانیا",
    lesson: 46,
    lessonLabel: "درس 46 — کشورها، ملیت و زبان"
  },
  {
    word: "Switzerland",
    meaning: "سوئیس",
    lesson: 46,
    lessonLabel: "درس 46 — کشورها، ملیت و زبان"
  },
  {
    word: "Swiss",
    meaning: "سوئیسی",
    lesson: 46,
    pos: "adj.",
    lessonLabel: "درس 46 — کشورها، ملیت و زبان"
  },
  {
    word: "Swiss-German, French, Italian",
    meaning: "آلمانی سوئیسی، فرانسوی، ایتالیایی",
    lesson: 46,
    lessonLabel: "درس 46 — کشورها، ملیت و زبان"
  },
  {
    word: "The United States (USA)",
    meaning: "ایالات متحده (آمریکا)",
    lesson: 46,
    lessonLabel: "درس 46 — کشورها، ملیت و زبان"
  },
  {
    word: "American",
    meaning: "آمریکایی",
    lesson: 46,
    pos: "adj.",
    lessonLabel: "درس 46 — کشورها، ملیت و زبان"
  },
  {
    word: "Turkey",
    meaning: "ترکیه",
    lesson: 46,
    lessonLabel: "درس 46 — کشورها، ملیت و زبان"
  },
  {
    word: "Turkish",
    meaning: "ترکی",
    lesson: 46,
    pos: "adj.",
    lessonLabel: "درس 46 — کشورها، ملیت و زبان"
  },
  {
    word: "first language",
    meaning: "زبان اول",
    lesson: 46,
    lessonLabel: "درس 46 — کشورها، ملیت و زبان"
  },
  {
    word: "capital",
    meaning: "پایتخت",
    lesson: 46,
    pos: "n.",
    lessonLabel: "درس 46 — کشورها، ملیت و زبان"
  },
  {
    word: "population",
    meaning: "جمعیت",
    lesson: 46,
    pos: "n.",
    lessonLabel: "درس 46 — کشورها، ملیت و زبان"
  },
  {
    word: "Europe",
    meaning: "اروپا",
    lesson: 46,
    lessonLabel: "درس 46 — کشورها، ملیت و زبان"
  },
  {
    word: "the Mediterranean",
    meaning: "مدیترانه",
    lesson: 46,
    lessonLabel: "درس 46 — کشورها، ملیت و زبان"
  },
  {
    word: "the Far East",
    meaning: "خاور دور",
    lesson: 46,
    lessonLabel: "درس 46 — کشورها، ملیت و زبان"
  },
  {
    word: "the Middle East",
    meaning: "خاورمیانه",
    lesson: 46,
    lessonLabel: "درس 46 — کشورها، ملیت و زبان"
  },
  {
    word: "the Caribbean",
    meaning: "کارائیب",
    lesson: 46,
    lessonLabel: "درس 46 — کشورها، ملیت و زبان"
  },
  {
    word: "South/Latin America",
    meaning: "آمریکای جنوبی/لاتین",
    lesson: 46,
    lessonLabel: "درس 46 — کشورها، ملیت و زبان"
  },
  {
    word: "in general",
    meaning: "به طور کلی",
    lesson: 46,
    pos: "phr.",
    lessonLabel: "درس 46 — کشورها، ملیت و زبان"
  },
  {
    word: "tend to be",
    meaning: "متمایل بودن به … بودن",
    lesson: 46,
    pos: "phr.",
    lessonLabel: "درس 46 — کشورها، ملیت و زبان"
  },
  {
    word: "forehead",
    meaning: "پیشانی",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — بدن و کارهایی که می‌کند"
  },
  {
    word: "eyebrow",
    meaning: "ابرو",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — بدن و کارهایی که می‌کند"
  },
  {
    word: "cheek",
    meaning: "گونه",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — بدن و کارهایی که می‌کند"
  },
  {
    word: "lips",
    meaning: "لب‌ها",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — بدن و کارهایی که می‌کند"
  },
  {
    word: "chin",
    meaning: "چانه",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — بدن و کارهایی که می‌کند"
  },
  {
    word: "neck",
    meaning: "گردن",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — بدن و کارهایی که می‌کند"
  },
  {
    word: "chest",
    meaning: "قفسه سینه",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — بدن و کارهایی که می‌کند"
  },
  {
    word: "shoulder",
    meaning: "شانه",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — بدن و کارهایی که می‌کند"
  },
  {
    word: "arm",
    meaning: "بازو",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — بدن و کارهایی که می‌کند"
  },
  {
    word: "elbow",
    meaning: "آرنج",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — بدن و کارهایی که می‌کند"
  },
  {
    word: "wrist",
    meaning: "مچ دست",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — بدن و کارهایی که می‌کند"
  },
  {
    word: "waist",
    meaning: "کمر",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — بدن و کارهایی که می‌کند"
  },
  {
    word: "hand",
    meaning: "دست",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — بدن و کارهایی که می‌کند"
  },
  {
    word: "thumb",
    meaning: "شست",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — بدن و کارهایی که می‌کند"
  },
  {
    word: "hip",
    meaning: "لگن/باسن",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — بدن و کارهایی که می‌کند"
  },
  {
    word: "fingers",
    meaning: "انگشتان دست",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — بدن و کارهایی که می‌کند"
  },
  {
    word: "bottom",
    meaning: "باسن",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — بدن و کارهایی که می‌کند"
  },
  {
    word: "thigh",
    meaning: "ران",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — بدن و کارهایی که می‌کند"
  },
  {
    word: "knee",
    meaning: "زانو",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — بدن و کارهایی که می‌کند"
  },
  {
    word: "ankle",
    meaning: "مچ پا",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — بدن و کارهایی که می‌کند"
  },
  {
    word: "toes",
    meaning: "انگشتان پا",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — بدن و کارهایی که می‌کند"
  },
  {
    word: "foot",
    meaning: "پا",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — بدن و کارهایی که می‌کند"
  },
  {
    word: "heel",
    meaning: "پاشنه",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — بدن و کارهایی که می‌کند"
  },
  {
    word: "skin",
    meaning: "پوست",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — بدن و کارهایی که می‌کند"
  },
  {
    word: "breathe",
    meaning: "نفس کشیدن",
    lesson: 47,
    pos: "v.",
    lessonLabel: "درس 47 — بدن و کارهایی که می‌کند"
  },
  {
    word: "breathe in and out",
    meaning: "دم و بازدم کردن",
    lesson: 47,
    pos: "phr.",
    lessonLabel: "درس 47 — بدن و کارهایی که می‌کند"
  },
  {
    word: "smile",
    meaning: "لبخند زدن",
    lesson: 47,
    pos: "v.",
    lessonLabel: "درس 47 — بدن و کارهایی که می‌کند"
  },
  {
    word: "smile at",
    meaning: "به کسی لبخند زدن",
    lesson: 47,
    pos: "phr.",
    lessonLabel: "درس 47 — بدن و کارهایی که می‌کند"
  },
  {
    word: "laugh",
    meaning: "خندیدن",
    lesson: 47,
    pos: "v.",
    lessonLabel: "درس 47 — بدن و کارهایی که می‌کند"
  },
  {
    word: "cry",
    meaning: "گریه کردن",
    lesson: 47,
    pos: "v.",
    lessonLabel: "درس 47 — بدن و کارهایی که می‌کند"
  },
  {
    word: "yawn",
    meaning: "خمیازه کشیدن",
    lesson: 47,
    pos: "v.",
    lessonLabel: "درس 47 — بدن و کارهایی که می‌کند"
  },
  {
    word: "nod your head",
    meaning: "سر تکان دادن (به نشانهٔ تأیید)",
    lesson: 47,
    pos: "phr.",
    lessonLabel: "درس 47 — بدن و کارهایی که می‌کند"
  },
  {
    word: "shake your head",
    meaning: "سر تکان دادن (به نشانهٔ مخالفت)",
    lesson: 47,
    pos: "phr.",
    lessonLabel: "درس 47 — بدن و کارهایی که می‌کند"
  },
  {
    word: "shake hands with somebody",
    meaning: "با کسی دست دادن",
    lesson: 47,
    pos: "phr.",
    lessonLabel: "درس 47 — بدن و کارهایی که می‌کند"
  },
  {
    word: "bite your nails",
    meaning: "ناخن جویدن",
    lesson: 47,
    pos: "phr.",
    lessonLabel: "درس 47 — بدن و کارهایی که می‌کند"
  },
  {
    word: "fold your arms",
    meaning: "دست به سینه کردن",
    lesson: 47,
    pos: "phr.",
    lessonLabel: "درس 47 — بدن و کارهایی که می‌کند"
  },
  {
    word: "blow your nose",
    meaning: "بینی خود را پاک کردن",
    lesson: 47,
    pos: "phr.",
    lessonLabel: "درس 47 — بدن و کارهایی که می‌کند"
  },
  {
    word: "comb your hair",
    meaning: "موهای خود را شانه کردن",
    lesson: 47,
    pos: "phr.",
    lessonLabel: "درس 47 — بدن و کارهایی که می‌کند"
  },
  {
    word: "beautiful",
    meaning: "زیبا",
    lesson: 48,
    pos: "adj.",
    lessonLabel: "درس 48 — وصف ظاهر آدم‌ها"
  },
  {
    word: "handsome",
    meaning: "خوش‌قیافه (برای مردان)",
    lesson: 48,
    pos: "adj.",
    lessonLabel: "درس 48 — وصف ظاهر آدم‌ها"
  },
  {
    word: "good-looking",
    meaning: "خوش‌ظاهر",
    lesson: 48,
    pos: "adj.",
    lessonLabel: "درس 48 — وصف ظاهر آدم‌ها"
  },
  {
    word: "attractive",
    meaning: "جذاب",
    lesson: 48,
    pos: "adj.",
    lessonLabel: "درس 48 — وصف ظاهر آدم‌ها"
  },
  {
    word: "pretty",
    meaning: "دلربا، خوش‌چهره",
    lesson: 48,
    pos: "adj.",
    lessonLabel: "درس 48 — وصف ظاهر آدم‌ها"
  },
  {
    word: "ugly",
    meaning: "زشت",
    lesson: 48,
    pos: "adj.",
    lessonLabel: "درس 48 — وصف ظاهر آدم‌ها"
  },
  {
    word: "plain",
    meaning: "ساده/معمولی‌چهره",
    lesson: 48,
    pos: "adj.",
    lessonLabel: "درس 48 — وصف ظاهر آدم‌ها"
  },
  {
    word: "tall and slim",
    meaning: "بلند و خوش‌اندام",
    lesson: 48,
    pos: "adj.",
    lessonLabel: "درس 48 — وصف ظاهر آدم‌ها"
  },
  {
    word: "medium height and build",
    meaning: "قد و هیکل متوسط",
    lesson: 48,
    pos: "phr.",
    lessonLabel: "درس 48 — وصف ظاهر آدم‌ها"
  },
  {
    word: "medium height and very muscular",
    meaning: "قد متوسط و بسیار عضلانی",
    lesson: 48,
    pos: "phr.",
    lessonLabel: "درس 48 — وصف ظاهر آدم‌ها"
  },
  {
    word: "short and fat",
    meaning: "کوتاه‌قد و چاق",
    lesson: 48,
    pos: "adj.",
    lessonLabel: "درس 48 — وصف ظاهر آدم‌ها"
  },
  {
    word: "slim",
    meaning: "خوش‌اندام",
    lesson: 48,
    pos: "adj.",
    lessonLabel: "درس 48 — وصف ظاهر آدم‌ها"
  },
  {
    word: "thin",
    meaning: "لاغر (معنای منفی‌تر)",
    lesson: 48,
    pos: "adj.",
    lessonLabel: "درس 48 — وصف ظاهر آدم‌ها"
  },
  {
    word: "fat",
    meaning: "چاق",
    lesson: 48,
    pos: "adj.",
    lessonLabel: "درس 48 — وصف ظاهر آدم‌ها"
  },
  {
    word: "overweight",
    meaning: "اضافه‌وزن",
    lesson: 48,
    pos: "adj.",
    lessonLabel: "درس 48 — وصف ظاهر آدم‌ها"
  },
  {
    word: "blond(e)",
    meaning: "بور (مو)",
    lesson: 48,
    pos: "adj.",
    lessonLabel: "درس 48 — وصف ظاهر آدم‌ها"
  },
  {
    word: "fair",
    meaning: "روشن (مو)",
    lesson: 48,
    pos: "adj.",
    lessonLabel: "درس 48 — وصف ظاهر آدم‌ها"
  },
  {
    word: "brown",
    meaning: "قهوه‌ای (مو)",
    lesson: 48,
    pos: "adj.",
    lessonLabel: "درس 48 — وصف ظاهر آدم‌ها"
  },
  {
    word: "dark",
    meaning: "تیره (مو)",
    lesson: 48,
    pos: "adj.",
    lessonLabel: "درس 48 — وصف ظاهر آدم‌ها"
  },
  {
    word: "black",
    meaning: "سیاه (مو)",
    lesson: 48,
    pos: "adj.",
    lessonLabel: "درس 48 — وصف ظاهر آدم‌ها"
  },
  {
    word: "straight",
    meaning: "صاف (مو)",
    lesson: 48,
    pos: "adj.",
    lessonLabel: "درس 48 — وصف ظاهر آدم‌ها"
  },
  {
    word: "wavy",
    meaning: "موج‌دار (مو)",
    lesson: 48,
    pos: "adj.",
    lessonLabel: "درس 48 — وصف ظاهر آدم‌ها"
  },
  {
    word: "curly hair",
    meaning: "موهای فر",
    lesson: 48,
    pos: "phr.",
    lessonLabel: "درس 48 — وصف ظاهر آدم‌ها"
  },
  {
    word: "pale skin",
    meaning: "پوست کم‌رنگ/روشن",
    lesson: 48,
    pos: "phr.",
    lessonLabel: "درس 48 — وصف ظاهر آدم‌ها"
  },
  {
    word: "broad shoulders",
    meaning: "شانه‌های پهن",
    lesson: 48,
    pos: "phr.",
    lessonLabel: "درس 48 — وصف ظاهر آدم‌ها"
  },
  {
    word: "scar",
    meaning: "زخم/جای زخم",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — وصف ظاهر آدم‌ها"
  },
  {
    word: "dark skin",
    meaning: "پوست تیره",
    lesson: 48,
    pos: "phr.",
    lessonLabel: "درس 48 — وصف ظاهر آدم‌ها"
  },
  {
    word: "beard",
    meaning: "ریش",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — وصف ظاهر آدم‌ها"
  },
  {
    word: "moustache",
    meaning: "سبیل",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — وصف ظاهر آدم‌ها"
  },
  {
    word: "tallish",
    meaning: "نسبتاً بلندقد",
    lesson: 48,
    pos: "adj.",
    lessonLabel: "درس 48 — وصف ظاهر آدم‌ها"
  },
  {
    word: "weigh",
    meaning: "وزن داشتن",
    lesson: 48,
    pos: "v.",
    lessonLabel: "درس 48 — وصف ظاهر آدم‌ها"
  },
  {
    word: "roughly",
    meaning: "تقریباً",
    lesson: 48,
    pos: "adv.",
    lessonLabel: "درس 48 — وصف ظاهر آدم‌ها"
  },
  {
    word: "about",
    meaning: "حدوداً",
    lesson: 48,
    pos: "adv.",
    lessonLabel: "درس 48 — وصف ظاهر آدم‌ها"
  },
  {
    word: "height",
    meaning: "قد",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — وصف ظاهر آدم‌ها"
  },
  {
    word: "weight",
    meaning: "وزن",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — وصف ظاهر آدم‌ها"
  },
  {
    word: "age",
    meaning: "سن",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — وصف ظاهر آدم‌ها"
  },
  {
    word: "longish",
    meaning: "نسبتاً بلند",
    lesson: 48,
    pos: "adj.",
    lessonLabel: "درس 48 — وصف ظاهر آدم‌ها"
  },
  {
    word: "twentyish",
    meaning: "حدوداً بیست‌ساله",
    lesson: 48,
    pos: "adj.",
    lessonLabel: "درس 48 — وصف ظاهر آدم‌ها"
  },
  {
    word: "warm and friendly",
    meaning: "گرم و صمیمی",
    lesson: 49,
    pos: "adj.",
    lessonLabel: "درس 49 — وصف شخصیت"
  },
  {
    word: "kind",
    meaning: "مهربان (= به دیگران اهمیت می‌دهد)",
    lesson: 49,
    pos: "adj.",
    lessonLabel: "درس 49 — وصف شخصیت"
  },
  {
    word: "nice",
    meaning: "خوش‌برخورد",
    lesson: 49,
    pos: "adj.",
    lessonLabel: "درس 49 — وصف شخصیت"
  },
  {
    word: "pleasant",
    meaning: "دلپذیر",
    lesson: 49,
    pos: "adj.",
    lessonLabel: "درس 49 — وصف شخصیت"
  },
  {
    word: "generous",
    meaning: "بخشنده (= دوست دارد ببخشد/سهیم شود)",
    lesson: 49,
    pos: "adj.",
    lessonLabel: "درس 49 — وصف شخصیت"
  },
  {
    word: "optimistic",
    meaning: "خوش‌بین (= مثبت فکر می‌کند)",
    lesson: 49,
    pos: "adj.",
    lessonLabel: "درس 49 — وصف شخصیت"
  },
  {
    word: "easy-going",
    meaning: "آسوده‌خاطر (= راحت، آرام)",
    lesson: 49,
    pos: "adj.",
    lessonLabel: "درس 49 — وصف شخصیت"
  },
  {
    word: "sensitive",
    meaning: "حساس (= به احساسات مردم فکر می‌کند)",
    lesson: 49,
    pos: "adj.",
    lessonLabel: "درس 49 — وصف شخصیت"
  },
  {
    word: "honest",
    meaning: "صادق (= همیشه راست می‌گوید)",
    lesson: 49,
    pos: "adj.",
    lessonLabel: "درس 49 — وصف شخصیت"
  },
  {
    word: "good fun",
    meaning: "بامزه و خوش‌صحبت (= بودن با او لذت‌بخش است)",
    lesson: 49,
    pos: "phr.",
    lessonLabel: "درس 49 — وصف شخصیت"
  },
  {
    word: "broad-minded",
    meaning: "گشاده‌نظر",
    lesson: 49,
    pos: "adj.",
    lessonLabel: "درس 49 — وصف شخصیت"
  },
  {
    word: "cold and unfriendly",
    meaning: "سرد و نامهربان",
    lesson: 49,
    pos: "adj.",
    lessonLabel: "درس 49 — وصف شخصیت"
  },
  {
    word: "unkind",
    meaning: "نامرد",
    lesson: 49,
    pos: "adj.",
    lessonLabel: "درس 49 — وصف شخصیت"
  },
  {
    word: "horrible",
    meaning: "وحشتناک",
    lesson: 49,
    pos: "adj.",
    lessonLabel: "درس 49 — وصف شخصیت"
  },
  {
    word: "unpleasant",
    meaning: "ناخوشایند",
    lesson: 49,
    pos: "adj.",
    lessonLabel: "درس 49 — وصف شخصیت"
  },
  {
    word: "mean",
    meaning: "خسيس (= هرگز به دیگران چیزی نمی‌دهد)",
    lesson: 49,
    pos: "adj.",
    lessonLabel: "درس 49 — وصف شخصیت"
  },
  {
    word: "pessimistic",
    meaning: "بدبین (= منفی فکر می‌کند)",
    lesson: 49,
    pos: "adj.",
    lessonLabel: "درس 49 — وصف شخصیت"
  },
  {
    word: "tense",
    meaning: "مضطرب (= عصبی؛ خیلی نگران؛ آرام نیست)",
    lesson: 49,
    pos: "adj.",
    lessonLabel: "درس 49 — وصف شخصیت"
  },
  {
    word: "insensitive",
    meaning: "بی‌حساس",
    lesson: 49,
    pos: "adj.",
    lessonLabel: "درس 49 — وصف شخصیت"
  },
  {
    word: "dishonest",
    meaning: "دروغگو، غیرصادق",
    lesson: 49,
    pos: "adj.",
    lessonLabel: "درس 49 — وصف شخصیت"
  },
  {
    word: "boring",
    meaning: "حوصله‌سربر",
    lesson: 49,
    pos: "adj.",
    lessonLabel: "درس 49 — وصف شخصیت"
  },
  {
    word: "narrow-minded",
    meaning: "محدود فکر (= نمی‌تواند ایده‌های جدید را بپذیرد)",
    lesson: 49,
    pos: "adj.",
    lessonLabel: "درس 49 — وصف شخصیت"
  },
  {
    word: "self-confident",
    meaning: "خودباور، بااعتمادبه‌نفس",
    lesson: 49,
    pos: "adj.",
    lessonLabel: "درس 49 — وصف شخصیت"
  },
  {
    word: "shy",
    meaning: "خجالتی",
    lesson: 49,
    pos: "adj.",
    lessonLabel: "درس 49 — وصف شخصیت"
  },
  {
    word: "feelings",
    meaning: "احساسات",
    lesson: 49,
    pos: "n.",
    lessonLabel: "درس 49 — وصف شخصیت"
  },
  {
    word: "sense of humour",
    meaning: "حس شوخ‌طبعی",
    lesson: 49,
    pos: "n.",
    lessonLabel: "درس 49 — وصف شخصیت"
  },
  {
    word: "hard-working",
    meaning: "سخت‌کوش",
    lesson: 49,
    pos: "adj.",
    lessonLabel: "درس 49 — وصف شخصیت"
  },
  {
    word: "punctual",
    meaning: "وقت‌شناس (= همیشه سر وقت)",
    lesson: 49,
    pos: "adj.",
    lessonLabel: "درس 49 — وصف شخصیت"
  },
  {
    word: "reliable",
    meaning: "قابل‌اعتماد",
    lesson: 49,
    pos: "adj.",
    lessonLabel: "درس 49 — وصف شخصیت"
  },
  {
    word: "clever",
    meaning: "باهوش",
    lesson: 49,
    pos: "adj.",
    lessonLabel: "درس 49 — وصف شخصیت"
  },
  {
    word: "flexible",
    meaning: "انعطاف‌پذیر",
    lesson: 49,
    pos: "adj.",
    lessonLabel: "درس 49 — وصف شخصیت"
  },
  {
    word: "ambitious",
    meaning: "جاه‌طلب",
    lesson: 49,
    pos: "adj.",
    lessonLabel: "درس 49 — وصف شخصیت"
  },
  {
    word: "common sense",
    meaning: "عقل سلیم",
    lesson: 49,
    pos: "n.",
    lessonLabel: "درس 49 — وصف شخصیت"
  },
  {
    word: "lazy",
    meaning: "تنبل (= هیچ کاری نمی‌کند)",
    lesson: 49,
    pos: "adj.",
    lessonLabel: "درس 49 — وصف شخصیت"
  },
  {
    word: "unreliable",
    meaning: "غیرقابل‌اعتماد (= نمی‌توان به چنین کسی اعتماد/اتکا کرد)",
    lesson: 49,
    pos: "adj.",
    lessonLabel: "درس 49 — وصف شخصیت"
  },
  {
    word: "stupid",
    meaning: "احمق",
    lesson: 49,
    pos: "adj.",
    lessonLabel: "درس 49 — وصف شخصیت"
  },
  {
    word: "inflexible",
    meaning: "انعطاف‌ناپذیر (= تفکر ثابت و بدون توانایی تغییر)",
    lesson: 49,
    pos: "adj.",
    lessonLabel: "درس 49 — وصف شخصیت"
  },
  {
    word: "not ambitious",
    meaning: "بی‌جاه‌طلب (= میلی به موفقیت/شغل بهتر ندارد)",
    lesson: 49,
    pos: "adj.",
    lessonLabel: "درس 49 — وصف شخصیت"
  },
  {
    word: "an idiot",
    meaning: "یک احمق (= آدم احمق)",
    lesson: 49,
    pos: "n.",
    lessonLabel: "درس 49 — وصف شخصیت"
  },
  {
    word: "impression",
    meaning: "برداشت، تأثیر",
    lesson: 49,
    pos: "n.",
    lessonLabel: "درس 49 — وصف شخصیت"
  },
  {
    word: "made a very good impression",
    meaning: "برداشت خیلی خوبی ایجاد کرد",
    lesson: 49,
    pos: "phr.",
    lessonLabel: "درس 49 — وصف شخصیت"
  },
  {
    word: "first impression",
    meaning: "برداشت اولیه",
    lesson: 49,
    pos: "phr.",
    lessonLabel: "درس 49 — وصف شخصیت"
  },
  {
    word: "comes across as",
    meaning: "به نظر می‌رسد",
    lesson: 49,
    pos: "phr.",
    lessonLabel: "درس 49 — وصف شخصیت"
  },
  {
    word: "love (opp hate)",
    meaning: "عشق (متضاد: نفرت)",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — احساسات و کنش‌های انسانی"
  },
  {
    word: "happiness (opp sadness)",
    meaning: "شادی (متضاد: غم)",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — احساسات و کنش‌های انسانی"
  },
  {
    word: "anger",
    meaning: "خشم",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — احساسات و کنش‌های انسانی"
  },
  {
    word: "fear",
    meaning: "ترس",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — احساسات و کنش‌های انسانی"
  },
  {
    word: "pride",
    meaning: "غرور",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — احساسات و کنش‌های انسانی"
  },
  {
    word: "jealousy",
    meaning: "حسادت",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — احساسات و کنش‌های انسانی"
  },
  {
    word: "embarrassment",
    meaning: "خجالت",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — احساسات و کنش‌های انسانی"
  },
  {
    word: "happy (opp sad)",
    meaning: "خوشحال (متضاد: غمگین)",
    lesson: 50,
    pos: "adj.",
    lessonLabel: "درس 50 — احساسات و کنش‌های انسانی"
  },
  {
    word: "angry",
    meaning: "عصبانی",
    lesson: 50,
    pos: "adj.",
    lessonLabel: "درس 50 — احساسات و کنش‌های انسانی"
  },
  {
    word: "afraid (of)/frightened (of)",
    meaning: "ترسیده (از)",
    lesson: 50,
    pos: "adj.",
    lessonLabel: "درس 50 — احساسات و کنش‌های انسانی"
  },
  {
    word: "proud (of)",
    meaning: "مغرور (از)",
    lesson: 50,
    pos: "adj.",
    lessonLabel: "درس 50 — احساسات و کنش‌های انسانی"
  },
  {
    word: "jealous (of)",
    meaning: "حسود (از)",
    lesson: 50,
    pos: "adj.",
    lessonLabel: "درس 50 — احساسات و کنش‌های انسانی"
  },
  {
    word: "embarrassed/embarrassing (see Unit 36)",
    meaning: "خجالت‌زده/خجالت‌آور",
    lesson: 50,
    pos: "adj.",
    lessonLabel: "درس 50 — احساسات و کنش‌های انسانی"
  },
  {
    word: "upset",
    meaning: "دلگیر/ناراحت",
    lesson: 50,
    pos: "adj.",
    lessonLabel: "درس 50 — احساسات و کنش‌های انسانی"
  },
  {
    word: "mixed feelings",
    meaning: "احساسات متناقض (مطمئن نبودن چه فکری یا احساسی داشتن)",
    lesson: 50,
    pos: "phr.",
    lessonLabel: "درس 50 — احساسات و کنش‌های انسانی"
  },
  {
    word: "whisper (= speak very quietly)",
    meaning: "نجوا کردن (خیلی آرم صحبت کردن)",
    lesson: 50,
    pos: "v.",
    lessonLabel: "درس 50 — احساسات و کنش‌های انسانی"
  },
  {
    word: "shout (= speak in a very loud voice)",
    meaning: "داد زدن (با صدای خیلی بلند صحبت کردن)",
    lesson: 50,
    pos: "v.",
    lessonLabel: "درس 50 — احساسات و کنش‌های انسانی"
  },
  {
    word: "glance (at) (= look at sb/sth very quickly)",
    meaning: "نگاه اجمالی انداختن (خیلی سریع نگاه کردن)",
    lesson: 50,
    pos: "v.",
    lessonLabel: "درس 50 — احساسات و کنش‌های انسانی"
  },
  {
    word: "stare (at) (= look at sb/sth for a long time)",
    meaning: "خیره شدن (مدت طولانی نگاه کردن)",
    lesson: 50,
    pos: "v.",
    lessonLabel: "درس 50 — احساسات و کنش‌های انسانی"
  },
  {
    word: "stroll (= walk in a slow casual way)",
    meaning: "قدم زدن (آهسته و بی‌دغدغه راه رفتن)",
    lesson: 50,
    pos: "v.",
    lessonLabel: "درس 50 — احساسات و کنش‌های انسانی"
  },
  {
    word: "march (= walk quickly and with a clear reason)",
    meaning: "با عجله و هدفمند راه رفتن",
    lesson: 50,
    pos: "v.",
    lessonLabel: "درس 50 — احساسات و کنش‌های انسانی"
  },
  {
    word: "knock (on/at a door)",
    meaning: "در زدن",
    lesson: 50,
    pos: "v.",
    lessonLabel: "درس 50 — احساسات و کنش‌های انسانی"
  },
  {
    word: "point (at something/someone)",
    meaning: "اشاره کردن (به چیزی/کسی)",
    lesson: 50,
    pos: "v.",
    lessonLabel: "درس 50 — احساسات و کنش‌های انسانی"
  },
  {
    word: "clap",
    meaning: "دست زدن (تکستان)",
    lesson: 50,
    pos: "v.",
    lessonLabel: "درس 50 — احساسات و کنش‌های انسانی"
  },
  {
    word: "wave (goodbye)",
    meaning: "دست تکان دادن (برای خداحافظی)",
    lesson: 50,
    pos: "v.",
    lessonLabel: "درس 50 — احساسات و کنش‌های انسانی"
  },
  {
    word: "press (a button)",
    meaning: "فشار دادن (دکمه)",
    lesson: 50,
    pos: "v.",
    lessonLabel: "درس 50 — احساسات و کنش‌های انسانی"
  },
  {
    word: "push (something)",
    meaning: "هل دادن (چیزی)",
    lesson: 50,
    pos: "v.",
    lessonLabel: "درس 50 — احساسات و کنش‌های انسانی"
  },
  {
    word: "relatives",
    meaning: "بستگان (اعضای خانواده شما)",
    lesson: 51,
    lessonLabel: "درس 51 — خانواده و دوستان"
  },
  {
    word: "grandfather(s)",
    meaning: "پدربزرگ",
    lesson: 51,
    pos: "n.",
    lessonLabel: "درس 51 — خانواده و دوستان"
  },
  {
    word: "grandmother(s)",
    meaning: "مادربزرگ",
    lesson: 51,
    pos: "n.",
    lessonLabel: "درس 51 — خانواده و دوستان"
  },
  {
    word: "uncle(s)",
    meaning: "دایی/عمو",
    lesson: 51,
    pos: "n.",
    lessonLabel: "درس 51 — خانواده و دوستان"
  },
  {
    word: "aunt(s)",
    meaning: "خاله/عمه",
    lesson: 51,
    pos: "n.",
    lessonLabel: "درس 51 — خانواده و دوستان"
  },
  {
    word: "cousin(s)",
    meaning: "پسرخاله/دوپسر عمو و... (پسرعمو/دخترعمو)",
    lesson: 51,
    pos: "n.",
    lessonLabel: "درس 51 — خانواده و دوستان"
  },
  {
    word: "father-in-law",
    meaning: "پدرزن/پدرشوهر",
    lesson: 51,
    pos: "n.",
    lessonLabel: "درس 51 — خانواده و دوستان"
  },
  {
    word: "mother-in-law",
    meaning: "مادرزن/مادرشوهر",
    lesson: 51,
    pos: "n.",
    lessonLabel: "درس 51 — خانواده و دوستان"
  },
  {
    word: "brother-in-law",
    meaning: "برادرزن/برادرشوهر",
    lesson: 51,
    pos: "n.",
    lessonLabel: "درس 51 — خانواده و دوستان"
  },
  {
    word: "sister-in-law",
    meaning: "خواهرزن/خواهرشوهر",
    lesson: 51,
    pos: "n.",
    lessonLabel: "درس 51 — خانواده و دوستان"
  },
  {
    word: "nephew(s)",
    meaning: "پسربرادر/پسرخواهر",
    lesson: 51,
    pos: "n.",
    lessonLabel: "درس 51 — خانواده و دوستان"
  },
  {
    word: "niece(s)",
    meaning: "دختربرادر/دخترخواهر",
    lesson: 51,
    pos: "n.",
    lessonLabel: "درس 51 — خانواده و دوستان"
  },
  {
    word: "widower",
    meaning: "مرد بیوه",
    lesson: 51,
    pos: "n.",
    lessonLabel: "درس 51 — خانواده و دوستان"
  },
  {
    word: "widow",
    meaning: "زن بیوه",
    lesson: 51,
    pos: "n.",
    lessonLabel: "درس 51 — خانواده و دوستان"
  },
  {
    word: "stepfather",
    meaning: "ناپدری",
    lesson: 51,
    pos: "n.",
    lessonLabel: "درس 51 — خانواده و دوستان"
  },
  {
    word: "stepmother",
    meaning: "نامادری",
    lesson: 51,
    pos: "n.",
    lessonLabel: "درس 51 — خانواده و دوستان"
  },
  {
    word: "twins",
    meaning: "دوقلوها",
    lesson: 51,
    pos: "n.",
    lessonLabel: "درس 51 — خانواده و دوستان"
  },
  {
    word: "take after",
    meaning: "شبیه بودن (به یک والد) در ظاهر و/یا شخصیت",
    lesson: 51,
    pos: "phr.",
    lessonLabel: "درس 51 — خانواده و دوستان"
  },
  {
    word: "looks like",
    meaning: "از نظر ظاهر شبیه بودن به",
    lesson: 51,
    pos: "phr.",
    lessonLabel: "درس 51 — خانواده و دوستان"
  },
  {
    word: "close family",
    meaning: "خانواده صمیمی/با رابطه نزدیک",
    lesson: 51,
    pos: "phr.",
    lessonLabel: "درس 51 — خانواده و دوستان"
  },
  {
    word: "best friend",
    meaning: "بهترین دوست",
    lesson: 51,
    pos: "phr.",
    lessonLabel: "درس 51 — خانواده و دوستان"
  },
  {
    word: "only child",
    meaning: "تک‌فرزند (بدون برادر و خواهر)",
    lesson: 51,
    pos: "phr.",
    lessonLabel: "درس 51 — خانواده و دوستان"
  },
  {
    word: "first name",
    meaning: "نام کوچک",
    lesson: 51,
    pos: "phr.",
    lessonLabel: "درس 51 — خانواده و دوستان"
  },
  {
    word: "family name",
    meaning: "نام خانوادگی",
    lesson: 51,
    pos: "phr.",
    lessonLabel: "درس 51 — خانواده و دوستان"
  },
  {
    word: "surname",
    meaning: "نام خانوادگی",
    lesson: 51,
    pos: "n.",
    lessonLabel: "درس 51 — خانواده و دوستان"
  },
  {
    word: "full name",
    meaning: "نام کامل (تمام نام‌ها)",
    lesson: 51,
    pos: "phr.",
    lessonLabel: "درس 51 — خانواده و دوستان"
  },
  {
    word: "partner",
    meaning: "شریک زندگی",
    lesson: 51,
    pos: "n.",
    lessonLabel: "درس 51 — خانواده و دوستان"
  },
  {
    word: "separated",
    meaning: "جدا شده (از هم‌زندگی/ازدواج)",
    lesson: 51,
    pos: "adj.",
    lessonLabel: "درس 51 — خانواده و دوستان"
  },
  {
    word: "single-parent families",
    meaning: "خانواده‌های تک‌والدی",
    lesson: 51,
    pos: "phr.",
    lessonLabel: "درس 51 — خانواده و دوستان"
  },
  {
    word: "old friend",
    meaning: "دوست قدیمی",
    lesson: 51,
    pos: "phr.",
    lessonLabel: "درس 51 — خانواده و دوستان"
  },
  {
    word: "close friend",
    meaning: "دوست صمیمی",
    lesson: 51,
    pos: "phr.",
    lessonLabel: "درس 51 — خانواده و دوستان"
  },
  {
    word: "classmates",
    meaning: "همکلاسی‌ها",
    lesson: 51,
    pos: "n.",
    lessonLabel: "درس 51 — خانواده و دوستان"
  },
  {
    word: "flatmates",
    meaning: "هم‌خانه‌ای‌ها",
    lesson: 51,
    pos: "n.",
    lessonLabel: "درس 51 — خانواده و دوستان"
  },
  {
    word: "colleagues",
    meaning: "همکاران",
    lesson: 51,
    pos: "n.",
    lessonLabel: "درس 51 — خانواده و دوستان"
  },
  {
    word: "ex-",
    meaning: "پیشوند «سابق» برای رابطه‌ای که در گذشته بوده و اکنون نیست",
    lesson: 51,
    pos: "phr.",
    lessonLabel: "درس 51 — خانواده و دوستان"
  },
  {
    word: "ex-husband",
    meaning: "همسر سابق (شوهر سابق)",
    lesson: 51,
    pos: "n.",
    lessonLabel: "درس 51 — خانواده و دوستان"
  },
  {
    word: "ex-girlfriend",
    meaning: "دوست‌دختر سابق",
    lesson: 51,
    pos: "n.",
    lessonLabel: "درس 51 — خانواده و دوستان"
  },
  {
    word: "adolescence",
    meaning: "نوجوانی (دورهٔ حدوداً ۱۳ تا ۱۷ سالگی)",
    lesson: 52,
    pos: "n.",
    lessonLabel: "درس 52 — سن‌ها و مراحل زندگی"
  },
  {
    word: "adolescent",
    meaning: "نوجوان",
    lesson: 52,
    pos: "n.",
    lessonLabel: "درس 52 — سن‌ها و مراحل زندگی"
  },
  {
    word: "a baby",
    meaning: "نوزاد",
    lesson: 52,
    lessonLabel: "درس 52 — سن‌ها و مراحل زندگی"
  },
  {
    word: "a toddler",
    meaning: "کودک نوپا (۱ تا ۲ سالگی)",
    lesson: 52,
    lessonLabel: "درس 52 — سن‌ها و مراحل زندگی"
  },
  {
    word: "a child",
    meaning: "کودک",
    lesson: 52,
    pos: "n.",
    lessonLabel: "درس 52 — سن‌ها و مراحل زندگی"
  },
  {
    word: "childhood",
    meaning: "دوران کودکی",
    lesson: 52,
    pos: "n.",
    lessonLabel: "درس 52 — سن‌ها و مراحل زندگی"
  },
  {
    word: "a teenager",
    meaning: "نوجوان (۱۳ تا ۱۷ سالگی)",
    lesson: 52,
    lessonLabel: "درس 52 — سن‌ها و مراحل زندگی"
  },
  {
    word: "early teens",
    meaning: "اوایل نوجوانی (حدود ۱۴ سالگی)",
    lesson: 52,
    lessonLabel: "درس 52 — سن‌ها و مراحل زندگی"
  },
  {
    word: "an adult",
    meaning: "بزرگسال",
    lesson: 52,
    pos: "n.",
    lessonLabel: "درس 52 — سن‌ها و مراحل زندگی"
  },
  {
    word: "in your twenties",
    meaning: "در دههٔ بیست زندگی (۲۰ تا ۲۹ سالگی)",
    lesson: 52,
    lessonLabel: "درس 52 — سن‌ها و مراحل زندگی"
  },
  {
    word: "mid-twenties",
    meaning: "اواسط دههٔ بیست (۲۴ تا ۲۶ سالگی)",
    lesson: 52,
    lessonLabel: "درس 52 — سن‌ها و مراحل زندگی"
  },
  {
    word: "in your thirties",
    meaning: "در دههٔ سی زندگی (۳۰ تا ۳۹ سالگی)",
    lesson: 52,
    lessonLabel: "درس 52 — سن‌ها و مراحل زندگی"
  },
  {
    word: "late thirties",
    meaning: "اواخر دههٔ سی (حدود ۳۸ سالگی)",
    lesson: 52,
    lessonLabel: "درس 52 — سن‌ها و مراحل زندگی"
  },
  {
    word: "middle-aged",
    meaning: "میانسال (۴۰ سال به بالا)",
    lesson: 52,
    pos: "adj.",
    lessonLabel: "درس 52 — سن‌ها و مراحل زندگی"
  },
  {
    word: "retirement",
    meaning: "بازنشستگی (وقتی مردم کار را متوقف می‌کنند)",
    lesson: 52,
    pos: "n.",
    lessonLabel: "درس 52 — سن‌ها و مراحل زندگی"
  },
  {
    word: "retired",
    meaning: "بازنشسته",
    lesson: 52,
    pos: "adj.",
    lessonLabel: "درس 52 — سن‌ها و مراحل زندگی"
  },
  {
    word: "old age",
    meaning: "سالیخردی (۷۵ سال به بالا)",
    lesson: 52,
    lessonLabel: "درس 52 — سن‌ها و مراحل زندگی"
  },
  {
    word: "elderly",
    meaning: "سالخورده",
    lesson: 52,
    pos: "adj.",
    lessonLabel: "درس 52 — سن‌ها و مراحل زندگی"
  },
  {
    word: "be born",
    meaning: "به دنیا آمدن",
    lesson: 52,
    pos: "v.",
    lessonLabel: "درس 52 — سن‌ها و مراحل زندگی"
  },
  {
    word: "grow up",
    meaning: "بزرگ شدن",
    lesson: 52,
    pos: "v.",
    lessonLabel: "درس 52 — سن‌ها و مراحل زندگی"
  },
  {
    word: "go to university",
    meaning: "به دانشگاه رفتن",
    lesson: 52,
    pos: "phr.",
    lessonLabel: "درس 52 — سن‌ها و مراحل زندگی"
  },
  {
    word: "meet",
    meaning: "ملاقات کردن، آشنا شدن",
    lesson: 52,
    pos: "v.",
    lessonLabel: "درس 52 — سن‌ها و مراحل زندگی"
  },
  {
    word: "go out with",
    meaning: "دوست بودن با (دختر/پسر)",
    lesson: 52,
    pos: "v.",
    lessonLabel: "درس 52 — سن‌ها و مراحل زندگی"
  },
  {
    word: "girlfriend",
    meaning: "دوست‌دختر",
    lesson: 52,
    pos: "n.",
    lessonLabel: "درس 52 — سن‌ها و مراحل زندگی"
  },
  {
    word: "boyfriend",
    meaning: "دوست‌پسر",
    lesson: 52,
    pos: "n.",
    lessonLabel: "درس 52 — سن‌ها و مراحل زندگی"
  },
  {
    word: "row",
    meaning: "دعوا، بحث",
    lesson: 52,
    pos: "n.",
    lessonLabel: "درس 52 — سن‌ها و مراحل زندگی"
  },
  {
    word: "split up",
    meaning: "از هم جدا شدن (پایان رابطه)",
    lesson: 52,
    pos: "v.",
    lessonLabel: "درس 52 — سن‌ها و مراحل زندگی"
  },
  {
    word: "separated",
    meaning: "جدا شده",
    lesson: 52,
    pos: "adj.",
    lessonLabel: "درس 52 — سن‌ها و مراحل زندگی"
  },
  {
    word: "fall in love",
    meaning: "عاشق شدن",
    lesson: 52,
    pos: "v.",
    lessonLabel: "درس 52 — سن‌ها و مراحل زندگی"
  },
  {
    word: "get married",
    meaning: "ازدواج کردن",
    lesson: 52,
    pos: "v.",
    lessonLabel: "درس 52 — سن‌ها و مراحل زندگی"
  },
  {
    word: "get pregnant",
    meaning: "باردار شدن",
    lesson: 52,
    pos: "v.",
    lessonLabel: "درس 52 — سن‌ها و مراحل زندگی"
  },
  {
    word: "get divorced",
    meaning: "طلاق گرفتن",
    lesson: 52,
    pos: "v.",
    lessonLabel: "درس 52 — سن‌ها و مراحل زندگی"
  },
  {
    word: "remarry",
    meaning: "دوباره ازدواج کردن",
    lesson: 52,
    pos: "v.",
    lessonLabel: "درس 52 — سن‌ها و مراحل زندگی"
  },
  {
    word: "expecting a baby",
    meaning: "باردار بودن (منتظر تولد نوزاد)",
    lesson: 52,
    pos: "phr.",
    lessonLabel: "درس 52 — سن‌ها و مراحل زندگی"
  },
  {
    word: "wake up",
    meaning: "بیدار شدن",
    lesson: 53,
    pos: "v.",
    lessonLabel: "درس 53 — کارهای روزمره"
  },
  {
    word: "lie in bed",
    meaning: "در تخت خوابیدن/ماندن",
    lesson: 53,
    lessonLabel: "درس 53 — کارهای روزمره"
  },
  {
    word: "get up",
    meaning: "از تخت بلند شدن (و لباس پوشیدن)",
    lesson: 53,
    pos: "v.",
    lessonLabel: "درس 53 — کارهای روزمره"
  },
  {
    word: "go to bed",
    meaning: "به رختخواب رفتن",
    lesson: 53,
    pos: "phr.",
    lessonLabel: "درس 53 — کارهای روزمره"
  },
  {
    word: "go to sleep/fall asleep",
    meaning: "به خواب رفتن",
    lesson: 53,
    pos: "phr.",
    lessonLabel: "درس 53 — کارهای روزمره"
  },
  {
    word: "have a late night",
    meaning: "شب بیدار ماندن تا دیر وقت",
    lesson: 53,
    pos: "phr.",
    lessonLabel: "درس 53 — کارهای روزمره"
  },
  {
    word: "an early night",
    meaning: "زود خوابیدن",
    lesson: 53,
    pos: "phr.",
    lessonLabel: "درس 53 — کارهای روزمره"
  },
  {
    word: "oversleep",
    meaning: "زیاد خوابیدن (بیش از حد)",
    lesson: 53,
    pos: "v.",
    lessonLabel: "درس 53 — کارهای روزمره"
  },
  {
    word: "have a sleep",
    meaning: "چرت زدن",
    lesson: 53,
    pos: "phr.",
    lessonLabel: "درس 53 — کارهای روزمره"
  },
  {
    word: "have a lie-in",
    meaning: "تا دیر وقت در تخت ماندن",
    lesson: 53,
    pos: "phr.",
    lessonLabel: "درس 53 — کارهای روزمره"
  },
  {
    word: "have breakfast",
    meaning: "صبحانه خوردن",
    lesson: 53,
    pos: "phr.",
    lessonLabel: "درس 53 — کارهای روزمره"
  },
  {
    word: "lunch",
    meaning: "ناهار",
    lesson: 53,
    pos: "n.",
    lessonLabel: "درس 53 — کارهای روزمره"
  },
  {
    word: "dinner",
    meaning: "شام",
    lesson: 53,
    pos: "n.",
    lessonLabel: "درس 53 — کارهای روزمره"
  },
  {
    word: "snacks",
    meaning: "خوراکی سبک بین وعده‌ها",
    lesson: 53,
    pos: "n.",
    lessonLabel: "درس 53 — کارهای روزمره"
  },
  {
    word: "live alone/on my own",
    meaning: "تنها زندگی کردن",
    lesson: 53,
    pos: "phr.",
    lessonLabel: "درس 53 — کارهای روزمره"
  },
  {
    word: "make my own breakfast and dinner",
    meaning: "خودم صبحانه و شام درست کنم",
    lesson: 53,
    pos: "phr.",
    lessonLabel: "درس 53 — کارهای روزمره"
  },
  {
    word: "don't bother",
    meaning: "زحمت نمی‌کشم",
    lesson: 53,
    pos: "phr.",
    lessonLabel: "درس 53 — کارهای روزمره"
  },
  {
    word: "feed",
    meaning: "غذا دادن",
    lesson: 53,
    pos: "v.",
    lessonLabel: "درس 53 — کارهای روزمره"
  },
  {
    word: "have a shower",
    meaning: "دوش گرفتن",
    lesson: 53,
    pos: "phr.",
    lessonLabel: "درس 53 — کارهای روزمره"
  },
  {
    word: "have a bath",
    meaning: "حمام کردن",
    lesson: 53,
    pos: "phr.",
    lessonLabel: "درس 53 — کارهای روزمره"
  },
  {
    word: "have a shave",
    meaning: "اصلاح کردن",
    lesson: 53,
    pos: "phr.",
    lessonLabel: "درس 53 — کارهای روزمره"
  },
  {
    word: "shave",
    meaning: "اصلاح کردن",
    lesson: 53,
    pos: "v.",
    lessonLabel: "درس 53 — کارهای روزمره"
  },
  {
    word: "have a wash",
    meaning: "شست‌وشو کردن",
    lesson: 53,
    pos: "phr.",
    lessonLabel: "درس 53 — کارهای روزمره"
  },
  {
    word: "clean/brush my teeth",
    meaning: "مسواک زدن",
    lesson: 53,
    pos: "phr.",
    lessonLabel: "درس 53 — کارهای روزمره"
  },
  {
    word: "wash my hair",
    meaning: "شستن موها",
    lesson: 53,
    pos: "phr.",
    lessonLabel: "درس 53 — کارهای روزمره"
  },
  {
    word: "have a rest",
    meaning: "استراحت کردن",
    lesson: 53,
    pos: "phr.",
    lessonLabel: "درس 53 — کارهای روزمره"
  },
  {
    word: "leave home",
    meaning: "خانه را ترک کردن",
    lesson: 53,
    pos: "phr.",
    lessonLabel: "درس 53 — کارهای روزمره"
  },
  {
    word: "get to work",
    meaning: "سر کار رسیدن",
    lesson: 53,
    pos: "phr.",
    lessonLabel: "درس 53 — کارهای روزمره"
  },
  {
    word: "have a lunch break",
    meaning: "زمان استراحت ناهار",
    lesson: 53,
    pos: "phr.",
    lessonLabel: "درس 53 — کارهای روزمره"
  },
  {
    word: "breaks",
    meaning: "زمان‌های کوتاه استراحت",
    lesson: 53,
    pos: "n.",
    lessonLabel: "درس 53 — کارهای روزمره"
  },
  {
    word: "leave work",
    meaning: "ترک کردن محل کار",
    lesson: 53,
    pos: "phr.",
    lessonLabel: "درس 53 — کارهای روزمره"
  },
  {
    word: "get home",
    meaning: "به خانه رسیدن",
    lesson: 53,
    pos: "phr.",
    lessonLabel: "درس 53 — کارهای روزمره"
  },
  {
    word: "spare time",
    meaning: "وقت فراغت",
    lesson: 53,
    pos: "n.",
    lessonLabel: "درس 53 — کارهای روزمره"
  },
  {
    word: "stay in",
    meaning: "در خانه ماندن",
    lesson: 53,
    pos: "phr.",
    lessonLabel: "درس 53 — کارهای روزمره"
  },
  {
    word: "go out",
    meaning: "بیرون رفتن (برای تفریح)",
    lesson: 53,
    pos: "phr.",
    lessonLabel: "درس 53 — کارهای روزمره"
  },
  {
    word: "have friends for dinner",
    meaning: "دعوت دوستان برای شام",
    lesson: 53,
    pos: "phr.",
    lessonLabel: "درس 53 — کارهای روزمره"
  },
  {
    word: "come round",
    meaning: "به خانه‌ام آمدن (دیدار)",
    lesson: 53,
    pos: "phr.",
    lessonLabel: "درس 53 — کارهای روزمره"
  },
  {
    word: "play cards",
    meaning: "بازی ورق کردن",
    lesson: 53,
    pos: "phr.",
    lessonLabel: "درس 53 — کارهای روزمره"
  },
  {
    word: "do the shopping",
    meaning: "خرید کردن",
    lesson: 53,
    pos: "phr.",
    lessonLabel: "درس 53 — کارهای روزمره"
  },
  {
    word: "Fortunately/Luckily",
    meaning: "خوشبختانه",
    lesson: 53,
    pos: "adv.",
    lessonLabel: "درس 53 — کارهای روزمره"
  },
  {
    word: "cleaner",
    meaning: "نظافتچی",
    lesson: 53,
    pos: "n.",
    lessonLabel: "درس 53 — کارهای روزمره"
  },
  {
    word: "housework",
    meaning: "کارهای خانه",
    lesson: 53,
    pos: "n.",
    lessonLabel: "درس 53 — کارهای روزمره"
  },
  {
    word: "do my washing",
    meaning: "شستن لباس‌ها",
    lesson: 53,
    pos: "phr.",
    lessonLabel: "درس 53 — کارهای روزمره"
  },
  {
    word: "do the washing-up",
    meaning: "شستن ظرف‌ها",
    lesson: 53,
    pos: "phr.",
    lessonLabel: "درس 53 — کارهای روزمره"
  },
  {
    word: "the ironing",
    meaning: "اتو کشیدن",
    lesson: 53,
    pos: "n.",
    lessonLabel: "درس 53 — کارهای روزمره"
  },
  {
    word: "outskirts",
    meaning: "حومهٔ شهر (لبهٔ شهر، نزدیک حاشیه)",
    lesson: 54,
    pos: "n.",
    lessonLabel: "درس 54 — جایی که زندگی می‌کنید"
  },
  {
    word: "suburbs",
    meaning: "حومه‌های خارج از مرکز شهر",
    lesson: 54,
    pos: "n.",
    lessonLabel: "درس 54 — جایی که زندگی می‌کنید"
  },
  {
    word: "residential area",
    meaning: "منطقهٔ مسکونی",
    lesson: 54,
    pos: "phr.",
    lessonLabel: "درس 54 — جایی که زندگی می‌کنید"
  },
  {
    word: "quite close to",
    meaning: "نسبتاً نزدیک به",
    lesson: 54,
    pos: "phr.",
    lessonLabel: "درس 54 — جایی که زندگی می‌کنید"
  },
  {
    word: "right in the centre",
    meaning: "دقیقاً در مرکز",
    lesson: 54,
    pos: "phr.",
    lessonLabel: "درس 54 — جایی که زندگی می‌کنید"
  },
  {
    word: "roof",
    meaning: "سقف، پشت‌بام",
    lesson: 54,
    pos: "n.",
    lessonLabel: "درس 54 — جایی که زندگی می‌کنید"
  },
  {
    word: "chimney",
    meaning: "دودکش",
    lesson: 54,
    pos: "n.",
    lessonLabel: "درس 54 — جایی که زندگی می‌کنید"
  },
  {
    word: "doorbell",
    meaning: "زنگ در",
    lesson: 54,
    pos: "n.",
    lessonLabel: "درس 54 — جایی که زندگی می‌کنید"
  },
  {
    word: "front door",
    meaning: "در ورودی",
    lesson: 54,
    pos: "n.",
    lessonLabel: "درس 54 — جایی که زندگی می‌کنید"
  },
  {
    word: "garage",
    meaning: "گاراژ",
    lesson: 54,
    pos: "n.",
    lessonLabel: "درس 54 — جایی که زندگی می‌کنید"
  },
  {
    word: "fence",
    meaning: "حصار، نرده",
    lesson: 54,
    pos: "n.",
    lessonLabel: "درس 54 — جایی که زندگی می‌کنید"
  },
  {
    word: "gate",
    meaning: "دروازه، در حیاط",
    lesson: 54,
    pos: "n.",
    lessonLabel: "درس 54 — جایی که زندگی می‌کنید"
  },
  {
    word: "path",
    meaning: "مسیر، پیاده‌راه",
    lesson: 54,
    pos: "n.",
    lessonLabel: "درس 54 — جایی که زندگی می‌کنید"
  },
  {
    word: "front garden",
    meaning: "باغ جلو",
    lesson: 54,
    pos: "n.",
    lessonLabel: "درس 54 — جایی که زندگی می‌کنید"
  },
  {
    word: "block of flats",
    meaning: "مجتمع آپارتمانی",
    lesson: 54,
    pos: "phr.",
    lessonLabel: "درس 54 — جایی که زندگی می‌کنید"
  },
  {
    word: "ground floor",
    meaning: "همکف",
    lesson: 54,
    pos: "n.",
    lessonLabel: "درس 54 — جایی که زندگی می‌کنید"
  },
  {
    word: "third floor",
    meaning: "طبقهٔ سوم",
    lesson: 54,
    pos: "n.",
    lessonLabel: "درس 54 — جایی که زندگی می‌کنید"
  },
  {
    word: "lift",
    meaning: "آسانسور",
    lesson: 54,
    pos: "n.",
    lessonLabel: "درس 54 — جایی که زندگی می‌کنید"
  },
  {
    word: "climb",
    meaning: "بالا رفتن (با پله)",
    lesson: 54,
    pos: "v.",
    lessonLabel: "درس 54 — جایی که زندگی می‌کنید"
  },
  {
    word: "flights of stairs",
    meaning: "بخش‌های پله‌کان",
    lesson: 54,
    pos: "phr.",
    lessonLabel: "درس 54 — جایی که زندگی می‌کنید"
  },
  {
    word: "balcony",
    meaning: "بالکن، ایوان",
    lesson: 54,
    pos: "n.",
    lessonLabel: "درس 54 — جایی که زندگی می‌کنید"
  },
  {
    word: "view",
    meaning: "منظره، چشم‌انداز",
    lesson: 54,
    pos: "n.",
    lessonLabel: "درس 54 — جایی که زندگی می‌کنید"
  },
  {
    word: "steps",
    meaning: "پله (بیرون یا در ساختمان عمومی)",
    lesson: 54,
    pos: "n.",
    lessonLabel: "درس 54 — جایی که زندگی می‌کنید"
  },
  {
    word: "stairs",
    meaning: "پله (داخل ساختمان)",
    lesson: 54,
    pos: "n.",
    lessonLabel: "درس 54 — جایی که زندگی می‌کنید"
  },
  {
    word: "own",
    meaning: "مالک بودن",
    lesson: 54,
    pos: "v.",
    lessonLabel: "درس 54 — جایی که زندگی می‌کنید"
  },
  {
    word: "rent",
    meaning: "اجاره کردن",
    lesson: 54,
    pos: "v.",
    lessonLabel: "درس 54 — جایی که زندگی می‌کنید"
  },
  {
    word: "tiny",
    meaning: "خیلی کوچک",
    lesson: 54,
    pos: "adj.",
    lessonLabel: "درس 54 — جایی که زندگی می‌کنید"
  },
  {
    word: "light",
    meaning: "روشن",
    lesson: 54,
    pos: "adj.",
    lessonLabel: "درس 54 — جایی که زندگی می‌کنید"
  },
  {
    word: "dark",
    meaning: "تاریک",
    lesson: 54,
    pos: "adj.",
    lessonLabel: "درس 54 — جایی که زندگی می‌کنید"
  },
  {
    word: "noisy",
    meaning: "پرصدا، شلوغ",
    lesson: 54,
    pos: "adj.",
    lessonLabel: "درس 54 — جایی که زندگی می‌کنید"
  },
  {
    word: "quiet",
    meaning: "آرام، ساکت",
    lesson: 54,
    pos: "adj.",
    lessonLabel: "درس 54 — جایی که زندگی می‌کنید"
  },
  {
    word: "draughty",
    meaning: "پرِ جریان هوا (سرد)، بادخور",
    lesson: 54,
    pos: "adj.",
    lessonLabel: "درس 54 — جایی که زندگی می‌کنید"
  },
  {
    word: "heat",
    meaning: "گرم کردن",
    lesson: 54,
    pos: "v.",
    lessonLabel: "درس 54 — جایی که زندگی می‌کنید"
  },
  {
    word: "central heating",
    meaning: "سیستم گرمایش مرکزی",
    lesson: 54,
    pos: "n.",
    lessonLabel: "درس 54 — جایی که زندگی می‌کنید"
  },
  {
    word: "in good condition",
    meaning: "در وضعیت خوب",
    lesson: 54,
    pos: "phr.",
    lessonLabel: "درس 54 — جایی که زندگی می‌کنید"
  },
  {
    word: "living room",
    meaning: "اتاق نشیمن",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — اطراف خانه (۱)"
  },
  {
    word: "lounge",
    meaning: "اتاق نشیمن",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — اطراف خانه (۱)"
  },
  {
    word: "dining room",
    meaning: "اتاق غذاخوری",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — اطراف خانه (۱)"
  },
  {
    word: "kitchen",
    meaning: "آشپزخانه",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — اطراف خانه (۱)"
  },
  {
    word: "bedroom(s)",
    meaning: "اتاق خواب",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — اطراف خانه (۱)"
  },
  {
    word: "bathroom(s)",
    meaning: "حمام",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — اطراف خانه (۱)"
  },
  {
    word: "study",
    meaning: "اتاق کار",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — اطراف خانه (۱)"
  },
  {
    word: "spare room",
    meaning: "اتاق اضافه/مهمان",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — اطراف خانه (۱)"
  },
  {
    word: "hall",
    meaning: "راهرو/ورودی",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — اطراف خانه (۱)"
  },
  {
    word: "video recorder",
    meaning: "ضبط ویدیو",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — اطراف خانه (۱)"
  },
  {
    word: "curtains",
    meaning: "پرده‌ها",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — اطراف خانه (۱)"
  },
  {
    word: "blinds",
    meaning: "کرکره پنجره",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — اطراف خانه (۱)"
  },
  {
    word: "stereo/sound system",
    meaning: "دستگاه stereo/سیستم صوتی",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — اطراف خانه (۱)"
  },
  {
    word: "CD player",
    meaning: "پخش CD",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — اطراف خانه (۱)"
  },
  {
    word: "speaker",
    meaning: "بلندگو",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — اطراف خانه (۱)"
  },
  {
    word: "armchair",
    meaning: "صندلی راحتی",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — اطراف خانه (۱)"
  },
  {
    word: "lamp",
    meaning: "چراغ",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — اطراف خانه (۱)"
  },
  {
    word: "sofa",
    meaning: "مبل",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — اطراف خانه (۱)"
  },
  {
    word: "coffee table",
    meaning: "میز جلومبلی",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — اطراف خانه (۱)"
  },
  {
    word: "vase",
    meaning: "گلدان",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — اطراف خانه (۱)"
  },
  {
    word: "carpet",
    meaning: "فرش",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — اطراف خانه (۱)"
  },
  {
    word: "rug",
    meaning: "قالیچه",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — اطراف خانه (۱)"
  },
  {
    word: "cupboard",
    meaning: "کابینت/گنجه",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — اطراف خانه (۱)"
  },
  {
    word: "freezer",
    meaning: "فریزر",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — اطراف خانه (۱)"
  },
  {
    word: "microwave",
    meaning: "مایکروویو",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — اطراف خانه (۱)"
  },
  {
    word: "cup and saucer",
    meaning: "فنجان و نعلبکی",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — اطراف خانه (۱)"
  },
  {
    word: "sink",
    meaning: "سینک",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — اطراف خانه (۱)"
  },
  {
    word: "tap",
    meaning: "شیر آب",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — اطراف خانه (۱)"
  },
  {
    word: "kettle",
    meaning: "کتری برقی",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — اطراف خانه (۱)"
  },
  {
    word: "saucepan",
    meaning: "قابلمه",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — اطراف خانه (۱)"
  },
  {
    word: "grill",
    meaning: "گریل",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — اطراف خانه (۱)"
  },
  {
    word: "hob",
    meaning: "اجاق رویی",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — اطراف خانه (۱)"
  },
  {
    word: "oven",
    meaning: "فر",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — اطراف خانه (۱)"
  },
  {
    word: "dishwasher",
    meaning: "ماشین ظرفشویی",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — اطراف خانه (۱)"
  },
  {
    word: "cooker",
    meaning: "اجاق گاز/پخت‌وپز",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — اطراف خانه (۱)"
  },
  {
    word: "washing machine",
    meaning: "ماشین لباسشویی",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — اطراف خانه (۱)"
  },
  {
    word: "fridge",
    meaning: "یخچال",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — اطراف خانه (۱)"
  },
  {
    word: "frying pan",
    meaning: "ماهیتابه",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — اطراف خانه (۱)"
  },
  {
    word: "food processor",
    meaning: "غذاساز",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — اطراف خانه (۱)"
  },
  {
    word: "lamp",
    meaning: "چراغ (رومیزی)",
    lesson: 56,
    lessonLabel: "درس 56 — اطراف خانه (۲)"
  },
  {
    word: "alarm clock",
    meaning: "ساعت زنگ‌دار",
    lesson: 56,
    lessonLabel: "درس 56 — اطراف خانه (۲)"
  },
  {
    word: "chest of drawers",
    meaning: "کمد کشودار",
    lesson: 56,
    lessonLabel: "درس 56 — اطراف خانه (۲)"
  },
  {
    word: "pyjamas",
    meaning: "لباس خواب",
    lesson: 56,
    lessonLabel: "درس 56 — اطراف خانه (۲)"
  },
  {
    word: "pillow",
    meaning: "بالش",
    lesson: 56,
    lessonLabel: "درس 56 — اطراف خانه (۲)"
  },
  {
    word: "wardrobe",
    meaning: "کمد لباس",
    lesson: 56,
    lessonLabel: "درس 56 — اطراف خانه (۲)"
  },
  {
    word: "sheet",
    meaning: "ملحفه",
    lesson: 56,
    lessonLabel: "درس 56 — اطراف خانه (۲)"
  },
  {
    word: "blanket",
    meaning: "پتوی",
    lesson: 56,
    lessonLabel: "درس 56 — اطراف خانه (۲)"
  },
  {
    word: "bedside table",
    meaning: "میز پشت‌تخت",
    lesson: 56,
    lessonLabel: "درس 56 — اطراف خانه (۲)"
  },
  {
    word: "bed",
    meaning: "تخت",
    lesson: 56,
    lessonLabel: "درس 56 — اطراف خانه (۲)"
  },
  {
    word: "shower curtain",
    meaning: "پرده دوش",
    lesson: 56,
    lessonLabel: "درس 56 — اطراف خانه (۲)"
  },
  {
    word: "mirror",
    meaning: "آینه",
    lesson: 56,
    lessonLabel: "درس 56 — اطراف خانه (۲)"
  },
  {
    word: "shower",
    meaning: "دوش",
    lesson: 56,
    lessonLabel: "درس 56 — اطراف خانه (۲)"
  },
  {
    word: "washbasin",
    meaning: "روشویی",
    lesson: 56,
    lessonLabel: "درس 56 — اطراف خانه (۲)"
  },
  {
    word: "towel",
    meaning: "حوله",
    lesson: 56,
    lessonLabel: "درس 56 — اطراف خانه (۲)"
  },
  {
    word: "bath",
    meaning: "وان حمام",
    lesson: 56,
    lessonLabel: "درس 56 — اطراف خانه (۲)"
  },
  {
    word: "towel rail",
    meaning: "جامه‌دان حوله (بار حوله)",
    lesson: 56,
    lessonLabel: "درس 56 — اطراف خانه (۲)"
  },
  {
    word: "toilet",
    meaning: "توالت",
    lesson: 56,
    lessonLabel: "درس 56 — اطراف خانه (۲)"
  },
  {
    word: "tidy",
    meaning: "مرتب و منظم",
    lesson: 56,
    pos: "adj.",
    lessonLabel: "درس 56 — اطراف خانه (۲)"
  },
  {
    word: "untidy",
    meaning: "نامرتب",
    lesson: 56,
    pos: "adj.",
    lessonLabel: "درس 56 — اطراف خانه (۲)"
  },
  {
    word: "all over the floor",
    meaning: "همه‌جا روی زمین",
    lesson: 56,
    lessonLabel: "درس 56 — اطراف خانه (۲)"
  },
  {
    word: "make one's bed",
    meaning: "تخت را مرتب کردن",
    lesson: 56,
    lessonLabel: "درس 56 — اطراف خانه (۲)"
  },
  {
    word: "a complete mess",
    meaning: "کاملاً به‌هم‌ریخته",
    lesson: 56,
    lessonLabel: "درس 56 — اطراف خانه (۲)"
  },
  {
    word: "do the washing-up",
    meaning: "ظرف‌ها را شستن",
    lesson: 56,
    lessonLabel: "درس 56 — اطراف خانه (۲)"
  },
  {
    word: "washing",
    meaning: "شست‌وشوی لباس‌ها",
    lesson: 56,
    lessonLabel: "درس 56 — اطراف خانه (۲)"
  },
  {
    word: "ironing",
    meaning: "اتو کردن لباس‌ها",
    lesson: 56,
    lessonLabel: "درس 56 — اطراف خانه (۲)"
  },
  {
    word: "hoover",
    meaning: "جاروبرقی کشیدن",
    lesson: 56,
    pos: "v.",
    lessonLabel: "درس 56 — اطراف خانه (۲)"
  },
  {
    word: "washing machine",
    meaning: "ماشین لباس‌شویی",
    lesson: 56,
    lessonLabel: "درس 56 — اطراف خانه (۲)"
  },
  {
    word: "iron",
    meaning: "اتو",
    lesson: 56,
    lessonLabel: "درس 56 — اطراف خانه (۲)"
  },
  {
    word: "hoover/vacuum cleaner",
    meaning: "جاروبرقی",
    lesson: 56,
    lessonLabel: "درس 56 — اطراف خانه (۲)"
  },
  {
    word: "There's something wrong with",
    meaning: "ایرادی دارد / مشکلی با آن پیش آمده",
    lesson: 57,
    pos: "phr.",
    lessonLabel: "درس 57 — مشکلات روزمره"
  },
  {
    word: "isn't working",
    meaning: "کار نمی‌کند",
    lesson: 57,
    pos: "phr.",
    lessonLabel: "درس 57 — مشکلات روزمره"
  },
  {
    word: "working properly",
    meaning: "درست کار می‌کند",
    lesson: 57,
    pos: "phr.",
    lessonLabel: "درس 57 — مشکلات روزمره"
  },
  {
    word: "out of order",
    meaning: "خراب / از کار افتاده",
    lesson: 57,
    pos: "phr.",
    lessonLabel: "درس 57 — مشکلات روزمره"
  },
  {
    word: "it isn't working",
    meaning: "کار نمی‌کند",
    lesson: 57,
    pos: "phr.",
    lessonLabel: "درس 57 — مشکلات روزمره"
  },
  {
    word: "drop",
    meaning: "انداختن (ناخواسته روی زمین)",
    lesson: 57,
    pos: "v.",
    lessonLabel: "درس 57 — مشکلات روزمره"
  },
  {
    word: "break",
    meaning: "شکستن",
    lesson: 57,
    pos: "v.",
    lessonLabel: "درس 57 — مشکلات روزمره"
  },
  {
    word: "spill",
    meaning: "ریختن (مایع)",
    lesson: 57,
    pos: "v.",
    lessonLabel: "درس 57 — مشکلات روزمره"
  },
  {
    word: "stain",
    meaning: "لکه",
    lesson: 57,
    pos: "n.",
    lessonLabel: "درس 57 — مشکلات روزمره"
  },
  {
    word: "ruined",
    meaning: "خراب‌شده / بی‌استفاده",
    lesson: 57,
    pos: "adj.",
    lessonLabel: "درس 57 — مشکلات روزمره"
  },
  {
    word: "burn",
    meaning: "سوختن / سوزاندن",
    lesson: 57,
    pos: "v.",
    lessonLabel: "درس 57 — مشکلات روزمره"
  },
  {
    word: "run out of",
    meaning: "تمام شدن (ذخیره چیزی)",
    lesson: 57,
    pos: "phr.",
    lessonLabel: "درس 57 — مشکلات روزمره"
  },
  {
    word: "in a bad mood",
    meaning: "بدحال / عصبانی و ناراحت",
    lesson: 57,
    pos: "phr.",
    lessonLabel: "درس 57 — مشکلات روزمره"
  },
  {
    word: "in a good mood",
    meaning: "حال‌وهوای خوب",
    lesson: 57,
    pos: "phr.",
    lessonLabel: "درس 57 — مشکلات روزمره"
  },
  {
    word: "get worse",
    meaning: "بدتر شدن",
    lesson: 57,
    pos: "phr.",
    lessonLabel: "درس 57 — مشکلات روزمره"
  },
  {
    word: "miss the bus",
    meaning: "از دست دادن اتوبوس",
    lesson: 57,
    pos: "phr.",
    lessonLabel: "درس 57 — مشکلات روزمره"
  },
  {
    word: "fall over",
    meaning: "زمین خوردن",
    lesson: 57,
    pos: "phr.",
    lessonLabel: "درس 57 — مشکلات روزمره"
  },
  {
    word: "cut",
    meaning: "بریدن / زخمی کردن",
    lesson: 57,
    pos: "v.",
    lessonLabel: "درس 57 — مشکلات روزمره"
  },
  {
    word: "lose",
    meaning: "گم کردن",
    lesson: 57,
    pos: "v.",
    lessonLabel: "درس 57 — مشکلات روزمره"
  },
  {
    word: "leave",
    meaning: "جا گذاشتن",
    lesson: 57,
    pos: "v.",
    lessonLabel: "درس 57 — مشکلات روزمره"
  },
  {
    word: "forget",
    meaning: "فراموش کردن",
    lesson: 57,
    pos: "v.",
    lessonLabel: "درس 57 — مشکلات روزمره"
  },
  {
    word: "currency",
    meaning: "واحد پول",
    lesson: 58,
    pos: "n.",
    lessonLabel: "درس 58 — پول"
  },
  {
    word: "sterling",
    meaning: "پوند انگلستان",
    lesson: 58,
    pos: "n.",
    lessonLabel: "درس 58 — پول"
  },
  {
    word: "the dollar",
    meaning: "دلار",
    lesson: 58,
    pos: "n.",
    lessonLabel: "درس 58 — پول"
  },
  {
    word: "the euro",
    meaning: "یورو",
    lesson: 58,
    pos: "n.",
    lessonLabel: "درس 58 — پول"
  },
  {
    word: "notes",
    meaning: "اسکناس‌ها",
    lesson: 58,
    pos: "n.",
    lessonLabel: "درس 58 — پول"
  },
  {
    word: "coins",
    meaning: "سکه‌ها",
    lesson: 58,
    pos: "n.",
    lessonLabel: "درس 58 — پول"
  },
  {
    word: "a ten-pound note",
    meaning: "اسکناس ده پوندی",
    lesson: 58,
    pos: "phr.",
    lessonLabel: "درس 58 — پول"
  },
  {
    word: "a 50p coin",
    meaning: "سکه ۵۰ پنسی",
    lesson: 58,
    pos: "phr.",
    lessonLabel: "درس 58 — پول"
  },
  {
    word: "a one-pound coin",
    meaning: "سکه یک پوندی",
    lesson: 58,
    pos: "phr.",
    lessonLabel: "درس 58 — پول"
  },
  {
    word: "spend £££ on (sth)",
    meaning: "خرج کردن (پول) برای چیزی",
    lesson: 58,
    pos: "v.",
    lessonLabel: "درس 58 — پول"
  },
  {
    word: "pay £££ (for sth)",
    meaning: "پرداخت کردن برای چیزی",
    lesson: 58,
    pos: "v.",
    lessonLabel: "درس 58 — پول"
  },
  {
    word: "cost",
    meaning: "قیمت داشتن، هزینه‌اش ... بودن",
    lesson: 58,
    pos: "v.",
    lessonLabel: "درس 58 — پول"
  },
  {
    word: "charge",
    meaning: "مطالبه پول کردن، حساب کردن",
    lesson: 58,
    pos: "v.",
    lessonLabel: "درس 58 — پول"
  },
  {
    word: "lend",
    meaning: "قرض دادن، وام دادن",
    lesson: 58,
    pos: "v.",
    lessonLabel: "درس 58 — پول"
  },
  {
    word: "borrow",
    meaning: "قرض گرفتن",
    lesson: 58,
    pos: "v.",
    lessonLabel: "درس 58 — پول"
  },
  {
    word: "waste £££ (on sth)",
    meaning: "هدر دادن پول (برای چیزی)",
    lesson: 58,
    pos: "v.",
    lessonLabel: "درس 58 — پول"
  },
  {
    word: "save (up) (for sth)",
    meaning: "پس‌انداز کردن (برای چیزی)",
    lesson: 58,
    pos: "v.",
    lessonLabel: "درس 58 — پول"
  },
  {
    word: "price",
    meaning: "قیمت",
    lesson: 58,
    pos: "n.",
    lessonLabel: "درس 58 — پول"
  },
  {
    word: "cheap",
    meaning: "ارزان",
    lesson: 58,
    pos: "adj.",
    lessonLabel: "درس 58 — پول"
  },
  {
    word: "reasonable",
    meaning: "مناسب (قیمت)",
    lesson: 58,
    pos: "adj.",
    lessonLabel: "درس 58 — پول"
  },
  {
    word: "quite expensive",
    meaning: "نسبتاً گران",
    lesson: 58,
    pos: "adj.",
    lessonLabel: "درس 58 — پول"
  },
  {
    word: "very expensive",
    meaning: "خیلی گران",
    lesson: 58,
    pos: "adj.",
    lessonLabel: "درس 58 — پول"
  },
  {
    word: "incredibly expensive",
    meaning: "به‌شدت گران",
    lesson: 58,
    pos: "adj.",
    lessonLabel: "درس 58 — پول"
  },
  {
    word: "free",
    meaning: "رایگان",
    lesson: 58,
    pos: "adj.",
    lessonLabel: "درس 58 — پول"
  },
  {
    word: "can't afford",
    meaning: "پول کافی نداشتن، از عهده (خرید) برنیامدن",
    lesson: 58,
    pos: "phr.",
    lessonLabel: "درس 58 — پول"
  },
  {
    word: "How much is that watch worth?",
    meaning: "آن ساعت چند می‌ارزد؟",
    lesson: 58,
    pos: "phr.",
    lessonLabel: "درس 58 — پول"
  },
  {
    word: "worth",
    meaning: "ارزداشتن، دارای ارزش",
    lesson: 58,
    pos: "adj.",
    lessonLabel: "درس 58 — پول"
  },
  {
    word: "the cost of living",
    meaning: "هزینه زندگی",
    lesson: 58,
    pos: "phr.",
    lessonLabel: "درس 58 — پول"
  },
  {
    word: "standard of living",
    meaning: "سطح زندگی",
    lesson: 58,
    pos: "phr.",
    lessonLabel: "درس 58 — پول"
  },
  {
    word: "cost a fortune",
    meaning: "خیلی گران بودن، خرج سرسام‌آور داشتن",
    lesson: 58,
    pos: "phr.",
    lessonLabel: "درس 58 — پول"
  },
  {
    word: "well-off",
    meaning: "ثروتمند، مرفه",
    lesson: 58,
    pos: "adj.",
    lessonLabel: "درس 58 — پول"
  },
  {
    word: "sneeze",
    meaning: "عطسه کردن",
    lesson: 59,
    pos: "v.",
    lessonLabel: "درس 59 — سلامتی: بیماری"
  },
  {
    word: "cough",
    meaning: "سرفه کردن",
    lesson: 59,
    pos: "v.",
    lessonLabel: "درس 59 — سلامتی: بیماری"
  },
  {
    word: "sore throat",
    meaning: "گلودرد",
    lesson: 59,
    pos: "n.",
    lessonLabel: "درس 59 — سلامتی: بیماری"
  },
  {
    word: "blow one's nose",
    meaning: "بینی خود را فوت کردن",
    lesson: 59,
    pos: "phr.",
    lessonLabel: "درس 59 — سلامتی: بیماری"
  },
  {
    word: "temperature",
    meaning: "تب",
    lesson: 59,
    pos: "n.",
    lessonLabel: "درس 59 — سلامتی: بیماری"
  },
  {
    word: "a cold",
    meaning: "سرماخوردگی",
    lesson: 59,
    pos: "n.",
    lessonLabel: "درس 59 — سلامتی: بیماری"
  },
  {
    word: "flu",
    meaning: "آنفولانزا",
    lesson: 59,
    pos: "n.",
    lessonLabel: "درس 59 — سلامتی: بیماری"
  },
  {
    word: "diarrhoea",
    meaning: "اسهال",
    lesson: 59,
    pos: "n.",
    lessonLabel: "درس 59 — سلامتی: بیماری"
  },
  {
    word: "feel sick",
    meaning: "حالتهای چاشنی/حس تهوع داشتن",
    lesson: 59,
    pos: "phr.",
    lessonLabel: "درس 59 — سلامتی: بیماری"
  },
  {
    word: "vomit",
    meaning: "استفراغ کردن",
    lesson: 59,
    pos: "v.",
    lessonLabel: "درس 59 — سلامتی: بیماری"
  },
  {
    word: "hangover",
    meaning: "مسمومیت الکلی روز بعد",
    lesson: 59,
    pos: "n.",
    lessonLabel: "درس 59 — سلامتی: بیماری"
  },
  {
    word: "symptoms",
    meaning: "نشانه‌های بیماری",
    lesson: 59,
    pos: "n.",
    lessonLabel: "درس 59 — سلامتی: بیماری"
  },
  {
    word: "virus",
    meaning: "ویروس",
    lesson: 59,
    pos: "n.",
    lessonLabel: "درس 59 — سلامتی: بیماری"
  },
  {
    word: "chemist",
    meaning: "داروخانه",
    lesson: 59,
    pos: "n.",
    lessonLabel: "درس 59 — سلامتی: بیماری"
  },
  {
    word: "prescription",
    meaning: "نسخه",
    lesson: 59,
    pos: "n.",
    lessonLabel: "درس 59 — سلامتی: بیماری"
  },
  {
    word: "ache",
    meaning: "درد مبهم و مداوم",
    lesson: 59,
    pos: "n.",
    lessonLabel: "درس 59 — سلامتی: بیماری"
  },
  {
    word: "toothache",
    meaning: "دندان‌درد",
    lesson: 59,
    pos: "n.",
    lessonLabel: "درس 59 — سلامتی: بیماری"
  },
  {
    word: "stomachache",
    meaning: "درد معده",
    lesson: 59,
    pos: "n.",
    lessonLabel: "درس 59 — سلامتی: بیماری"
  },
  {
    word: "backache",
    meaning: "کمر درد",
    lesson: 59,
    pos: "n.",
    lessonLabel: "درس 59 — سلامتی: بیماری"
  },
  {
    word: "earache",
    meaning: "گوش درد",
    lesson: 59,
    pos: "n.",
    lessonLabel: "درس 59 — سلامتی: بیماری"
  },
  {
    word: "headache",
    meaning: "سردرد",
    lesson: 59,
    pos: "n.",
    lessonLabel: "درس 59 — سلامتی: بیماری"
  },
  {
    word: "pain",
    meaning: "درد",
    lesson: 59,
    pos: "n.",
    lessonLabel: "درس 59 — سلامتی: بیماری"
  },
  {
    word: "hurt",
    meaning: "درد داشتن/آزار دادن",
    lesson: 59,
    pos: "v.",
    lessonLabel: "درس 59 — سلامتی: بیماری"
  },
  {
    word: "painful",
    meaning: "دردناک",
    lesson: 59,
    pos: "adj.",
    lessonLabel: "درس 59 — سلامتی: بیماری"
  },
  {
    word: "filling",
    meaning: "پرکردگی دندان",
    lesson: 59,
    pos: "n.",
    lessonLabel: "درس 59 — سلامتی: بیماری"
  },
  {
    word: "injection",
    meaning: "تزریق",
    lesson: 59,
    pos: "n.",
    lessonLabel: "درس 59 — سلامتی: بیماری"
  },
  {
    word: "lung cancer",
    meaning: "سرطان ریه",
    lesson: 59,
    pos: "n.",
    lessonLabel: "درس 59 — سلامتی: بیماری"
  },
  {
    word: "heart attack",
    meaning: "حمله قلبی",
    lesson: 59,
    pos: "n.",
    lessonLabel: "درس 59 — سلامتی: بیماری"
  },
  {
    word: "hepatitis",
    meaning: "هپاتیت",
    lesson: 59,
    pos: "n.",
    lessonLabel: "درس 59 — سلامتی: بیماری"
  },
  {
    word: "disease",
    meaning: "بیماری",
    lesson: 59,
    pos: "n.",
    lessonLabel: "درس 59 — سلامتی: بیماری"
  },
  {
    word: "suffer from",
    meaning: "مبتلا بودن به",
    lesson: 59,
    pos: "phr.",
    lessonLabel: "درس 59 — سلامتی: بیماری"
  },
  {
    word: "asthma",
    meaning: "آسم",
    lesson: 59,
    pos: "n.",
    lessonLabel: "درس 59 — سلامتی: بیماری"
  },
  {
    word: "heart",
    meaning: "قلب",
    lesson: 59,
    pos: "n.",
    lessonLabel: "درس 59 — سلامتی: بیماری"
  },
  {
    word: "lungs",
    meaning: "شش‌ها",
    lesson: 59,
    pos: "n.",
    lessonLabel: "درس 59 — سلامتی: بیماری"
  },
  {
    word: "liver",
    meaning: "کبد",
    lesson: 59,
    pos: "n.",
    lessonLabel: "درس 59 — سلامتی: بیماری"
  },
  {
    word: "stomach",
    meaning: "معده",
    lesson: 59,
    pos: "n.",
    lessonLabel: "درس 59 — سلامتی: بیماری"
  },
  {
    word: "injury",
    meaning: "آسیب، صدمه",
    lesson: 60,
    pos: "n.",
    lessonLabel: "درس 60 — سلامتی: آسیب‌ها"
  },
  {
    word: "cut",
    meaning: "بریدن/بریدگی",
    lesson: 60,
    pos: "n.",
    lessonLabel: "درس 60 — سلامتی: آسیب‌ها"
  },
  {
    word: "bruise",
    meaning: "کبودی/کبود شدن",
    lesson: 60,
    pos: "n.",
    lessonLabel: "درس 60 — سلامتی: آسیب‌ها"
  },
  {
    word: "burn",
    meaning: "سوختگی/سوختن",
    lesson: 60,
    pos: "n.",
    lessonLabel: "درس 60 — سلامتی: آسیب‌ها"
  },
  {
    word: "bandage",
    meaning: "بانداژ/بانداژ کردن",
    lesson: 60,
    pos: "n.",
    lessonLabel: "درس 60 — سلامتی: آسیب‌ها"
  },
  {
    word: "twist",
    meaning: "پیچ خوردن (مچ پا)",
    lesson: 60,
    pos: "v.",
    lessonLabel: "درس 60 — سلامتی: آسیب‌ها"
  },
  {
    word: "bleeding",
    meaning: "خونریزی",
    lesson: 60,
    pos: "adj.",
    lessonLabel: "درس 60 — سلامتی: آسیب‌ها"
  },
  {
    word: "swollen",
    meaning: "متورم",
    lesson: 60,
    pos: "adj.",
    lessonLabel: "درس 60 — سلامتی: آسیب‌ها"
  },
  {
    word: "black and blue",
    meaning: "کبود (سر و سیاه)",
    lesson: 60,
    pos: "phr.",
    lessonLabel: "درس 60 — سلامتی: آسیب‌ها"
  },
  {
    word: "painful",
    meaning: "دردناک",
    lesson: 60,
    pos: "adj.",
    lessonLabel: "درس 60 — سلامتی: آسیب‌ها"
  },
  {
    word: "plaster",
    meaning: "چسب زخم",
    lesson: 60,
    pos: "n.",
    lessonLabel: "درس 60 — سلامتی: آسیب‌ها"
  },
  {
    word: "ice pack",
    meaning: "کیسه یخ",
    lesson: 60,
    pos: "n.",
    lessonLabel: "درس 60 — سلامتی: آسیب‌ها"
  },
  {
    word: "sling",
    meaning: "آویز (بازو)",
    lesson: 60,
    pos: "n.",
    lessonLabel: "درس 60 — سلامتی: آسیب‌ها"
  },
  {
    word: "cream",
    meaning: "کرم",
    lesson: 60,
    pos: "n.",
    lessonLabel: "درس 60 — سلامتی: آسیب‌ها"
  },
  {
    word: "hurt",
    meaning: "آزار دادن، درد گرفتن",
    lesson: 60,
    pos: "v.",
    lessonLabel: "درس 60 — سلامتی: آسیب‌ها"
  },
  {
    word: "hurt oneself",
    meaning: "خودش را آسیب زدن",
    lesson: 60,
    pos: "phr.",
    lessonLabel: "درس 60 — سلامتی: آسیب‌ها"
  },
  {
    word: "treatment",
    meaning: "درمان",
    lesson: 60,
    pos: "n.",
    lessonLabel: "درس 60 — سلامتی: آسیب‌ها"
  },
  {
    word: "unconscious",
    meaning: "بی‌هوش",
    lesson: 60,
    pos: "adj.",
    lessonLabel: "درس 60 — سلامتی: آسیب‌ها"
  },
  {
    word: "rush to hospital",
    meaning: "فوراً به بیمارستان بردن",
    lesson: 60,
    pos: "phr.",
    lessonLabel: "درس 60 — سلامتی: آسیب‌ها"
  },
  {
    word: "come round",
    meaning: "به هوش آمدن",
    lesson: 60,
    pos: "phr.",
    lessonLabel: "درس 60 — سلامتی: آسیب‌ها"
  },
  {
    word: "bump into each other",
    meaning: "به هم خوردن (تصادفی)",
    lesson: 60,
    pos: "phr.",
    lessonLabel: "درس 60 — سلامتی: آسیب‌ها"
  },
  {
    word: "stitches",
    meaning: "بخیه‌ها",
    lesson: 60,
    pos: "n.",
    lessonLabel: "درس 60 — سلامتی: آسیب‌ها"
  },
  {
    word: "wound",
    meaning: "زخم/زخم کردن",
    lesson: 60,
    pos: "n.",
    lessonLabel: "درس 60 — سلامتی: آسیب‌ها"
  },
  {
    word: "weapon",
    meaning: "سلاح",
    lesson: 60,
    pos: "n.",
    lessonLabel: "درس 60 — سلامتی: آسیب‌ها"
  },
  {
    word: "injure",
    meaning: "آسیب رساندن",
    lesson: 60,
    pos: "v.",
    lessonLabel: "درس 60 — سلامتی: آسیب‌ها"
  },
  {
    word: "seriously injured",
    meaning: "به‌شدت آسیب‌دیده",
    lesson: 60,
    pos: "phr.",
    lessonLabel: "درس 60 — سلامتی: آسیب‌ها"
  },
  {
    word: "shot",
    meaning: "شلیک/گلوله‌خوردگی",
    lesson: 60,
    pos: "n.",
    lessonLabel: "درس 60 — سلامتی: آسیب‌ها"
  },
  {
    word: "blood",
    meaning: "خون",
    lesson: 60,
    pos: "n.",
    lessonLabel: "درس 60 — سلامتی: آسیب‌ها"
  },
  {
    word: "beat up",
    meaning: "کتک زدن (شدید)",
    lesson: 60,
    pos: "phr.",
    lessonLabel: "درس 60 — سلامتی: آسیب‌ها"
  }
];

export const VOCAB_PART_3: Row[] = ROWS;
