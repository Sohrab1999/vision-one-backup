// واژگان درس‌های English Vocabulary in Use — Elementary (پارتیت 3) — استخراج VLM از اسکن PDF
// word = عین چاپ کتاب · meaning = ترجمهٔ ماشینی GLM (کلاس FA-NEW — اثبات صحت ترجمه نیست)
import type { VocabWord } from "../types";

type Row = Omit<VocabWord, "lesson"> & { lesson: number; lessonLabel: string };

const ROWS: Row[] = [
  {
    word: "hat",
    meaning: "کلاه",
    lesson: 31,
    pos: "n.",
    lessonLabel: "درس 31 — لباس (کلاه، پیراهن)"
  },
  {
    word: "socks",
    meaning: "جوراب",
    lesson: 31,
    pos: "n.",
    lessonLabel: "درس 31 — لباس (کلاه، پیراهن)"
  },
  {
    word: "T-shirt",
    meaning: "تی‌شرت",
    lesson: 31,
    pos: "n.",
    lessonLabel: "درس 31 — لباس (کلاه، پیراهن)"
  },
  {
    word: "coat",
    meaning: "پالتو",
    lesson: 31,
    pos: "n.",
    lessonLabel: "درس 31 — لباس (کلاه، پیراهن)"
  },
  {
    word: "watch",
    meaning: "ساعت (مچی)",
    lesson: 31,
    pos: "n.",
    lessonLabel: "درس 31 — لباس (کلاه، پیراهن)"
  },
  {
    word: "jacket",
    meaning: "کت",
    lesson: 31,
    pos: "n.",
    lessonLabel: "درس 31 — لباس (کلاه، پیراهن)"
  },
  {
    word: "shirt",
    meaning: "پیراهن",
    lesson: 31,
    pos: "n.",
    lessonLabel: "درس 31 — لباس (کلاه، پیراهن)"
  },
  {
    word: "scarf",
    meaning: "شال/دستمال گردن",
    lesson: 31,
    pos: "n.",
    lessonLabel: "درس 31 — لباس (کلاه، پیراهن)"
  },
  {
    word: "dress",
    meaning: "پیراهن (زنانه)",
    lesson: 31,
    pos: "n.",
    lessonLabel: "درس 31 — لباس (کلاه، پیراهن)"
  },
  {
    word: "gloves",
    meaning: "دستکش",
    lesson: 31,
    pos: "n.",
    lessonLabel: "درس 31 — لباس (کلاه، پیراهن)"
  },
  {
    word: "ring",
    meaning: "انگشتر",
    lesson: 31,
    pos: "n.",
    lessonLabel: "درس 31 — لباس (کلاه، پیراهن)"
  },
  {
    word: "shoes",
    meaning: "کفش",
    lesson: 31,
    pos: "n.",
    lessonLabel: "درس 31 — لباس (کلاه، پیراهن)"
  },
  {
    word: "skirt",
    meaning: "دامن",
    lesson: 31,
    pos: "n.",
    lessonLabel: "درس 31 — لباس (کلاه، پیراهن)"
  },
  {
    word: "belt",
    meaning: "کمربند",
    lesson: 31,
    pos: "n.",
    lessonLabel: "درس 31 — لباس (کلاه، پیراهن)"
  },
  {
    word: "trainers",
    meaning: "کفش اسپرت",
    lesson: 31,
    pos: "n.",
    lessonLabel: "درس 31 — لباس (کلاه، پیراهن)"
  },
  {
    word: "tie",
    meaning: "کراوات",
    lesson: 31,
    pos: "n.",
    lessonLabel: "درس 31 — لباس (کلاه، پیراهن)"
  },
  {
    word: "sweater/jumper",
    meaning: "پلیور",
    lesson: 31,
    pos: "n.",
    lessonLabel: "درس 31 — لباس (کلاه، پیراهن)"
  },
  {
    word: "boots",
    meaning: "چکمه/بوت",
    lesson: 31,
    pos: "n.",
    lessonLabel: "درس 31 — لباس (کلاه، پیراهن)"
  },
  {
    word: "suit",
    meaning: "کت‌وشلوار",
    lesson: 31,
    pos: "n.",
    lessonLabel: "درس 31 — لباس (کلاه، پیراهن)"
  },
  {
    word: "trousers",
    meaning: "شلوار",
    lesson: 31,
    pos: "n.",
    lessonLabel: "درس 31 — لباس (کلاه، پیراهن)"
  },
  {
    word: "jeans",
    meaning: "شلوار جین",
    lesson: 31,
    pos: "n.",
    lessonLabel: "درس 31 — لباس (کلاه، پیراهن)"
  },
  {
    word: "shorts",
    meaning: "شلوارک",
    lesson: 31,
    pos: "n.",
    lessonLabel: "درس 31 — لباس (کلاه، پیراهن)"
  },
  {
    word: "tights",
    meaning: "جوراب شلواری",
    lesson: 31,
    pos: "n.",
    lessonLabel: "درس 31 — لباس (کلاه، پیراهن)"
  },
  {
    word: "glasses",
    meaning: "عینک",
    lesson: 31,
    pos: "n.",
    lessonLabel: "درس 31 — لباس (کلاه، پیراهن)"
  },
  {
    word: "sunglasses",
    meaning: "عینک آفتابی",
    lesson: 31,
    pos: "n.",
    lessonLabel: "درس 31 — لباس (کلاه، پیراهن)"
  },
  {
    word: "wear",
    meaning: "پوشیدن",
    lesson: 31,
    pos: "v.",
    lessonLabel: "درس 31 — لباس (کلاه، پیراهن)"
  },
  {
    word: "carry",
    meaning: "حمل کردن/با خود بردن",
    lesson: 31,
    pos: "v.",
    lessonLabel: "درس 31 — لباس (کلاه، پیراهن)"
  },
  {
    word: "have ... on",
    meaning: "(لباس) به تن داشتن",
    lesson: 31,
    pos: "phr.",
    lessonLabel: "درس 31 — لباس (کلاه، پیراهن)"
  },
  {
    word: "suitcase",
    meaning: "چمدان",
    lesson: 31,
    pos: "n.",
    lessonLabel: "درس 31 — لباس (کلاه، پیراهن)"
  },
  {
    word: "handbag",
    meaning: "کیف دستی",
    lesson: 31,
    pos: "n.",
    lessonLabel: "درس 31 — لباس (کلاه، پیراهن)"
  },
  {
    word: "briefcase",
    meaning: "کیف کار/پرونده",
    lesson: 31,
    pos: "n.",
    lessonLabel: "درس 31 — لباس (کلاه، پیراهن)"
  },
  {
    word: "umbrella",
    meaning: "چتر",
    lesson: 31,
    pos: "n.",
    lessonLabel: "درس 31 — لباس (کلاه، پیراهن)"
  },
  {
    word: "get dressed",
    meaning: "لباس پوشیدن",
    lesson: 31,
    pos: "phr.",
    lessonLabel: "درس 31 — لباس (کلاه، پیراهن)"
  },
  {
    word: "put your clothes on",
    meaning: "لباس پوشیدن",
    lesson: 31,
    pos: "phr.",
    lessonLabel: "درس 31 — لباس (کلاه، پیراهن)"
  },
  {
    word: "get undressed",
    meaning: "لباس درآوردن",
    lesson: 31,
    pos: "phr.",
    lessonLabel: "درس 31 — لباس (کلاه، پیراهن)"
  },
  {
    word: "take your clothes off",
    meaning: "لباس درآوردن",
    lesson: 31,
    pos: "phr.",
    lessonLabel: "درس 31 — لباس (کلاه، پیراهن)"
  },
  {
    word: "tall",
    meaning: "بلندقد",
    lesson: 32,
    pos: "adj.",
    lessonLabel: "درس 32 — وصف آدم‌ها (بلندقامت، گندمگون، خوش‌قیافه)"
  },
  {
    word: "short",
    meaning: "کوتاه‌قد",
    lesson: 32,
    pos: "adj.",
    lessonLabel: "درس 32 — وصف آدم‌ها (بلندقامت، گندمگون، خوش‌قیافه)"
  },
  {
    word: "medium height",
    meaning: "قد متوسط",
    lesson: 32,
    lessonLabel: "درس 32 — وصف آدم‌ها (بلندقامت، گندمگون، خوش‌قیافه)"
  },
  {
    word: "How tall ...?",
    meaning: "قدش چقدر است؟",
    lesson: 32,
    pos: "phr.",
    lessonLabel: "درس 32 — وصف آدم‌ها (بلندقامت، گندمگون، خوش‌قیافه)"
  },
  {
    word: "slim",
    meaning: "ظریف و خوش‌اندام",
    lesson: 32,
    pos: "adj.",
    lessonLabel: "درس 32 — وصف آدم‌ها (بلندقامت، گندمگون، خوش‌قیافه)"
  },
  {
    word: "thin",
    meaning: "لاغر (منفی‌تر)",
    lesson: 32,
    pos: "adj.",
    lessonLabel: "درس 32 — وصف آدم‌ها (بلندقامت، گندمگون، خوش‌قیافه)"
  },
  {
    word: "fat",
    meaning: "چاق (تقریباً منفی)",
    lesson: 32,
    pos: "adj.",
    lessonLabel: "درس 32 — وصف آدم‌ها (بلندقامت، گندمگون، خوش‌قیافه)"
  },
  {
    word: "overweight",
    meaning: "اضافه‌وزن",
    lesson: 32,
    pos: "adj.",
    lessonLabel: "درس 32 — وصف آدم‌ها (بلندقامت، گندمگون، خوش‌قیافه)"
  },
  {
    word: "How much do you weigh?",
    meaning: "چند کیلو وزن داری؟",
    lesson: 32,
    pos: "phr.",
    lessonLabel: "درس 32 — وصف آدم‌ها (بلندقامت، گندمگون، خوش‌قیافه)"
  },
  {
    word: "weigh",
    meaning: "وزن داشتن",
    lesson: 32,
    pos: "v.",
    lessonLabel: "درس 32 — وصف آدم‌ها (بلندقامت، گندمگون، خوش‌قیافه)"
  },
  {
    word: "dark hair",
    meaning: "موهای تیره",
    lesson: 32,
    pos: "phr.",
    lessonLabel: "درس 32 — وصف آدم‌ها (بلندقامت، گندمگون، خوش‌قیافه)"
  },
  {
    word: "dark skin",
    meaning: "پوست تیره",
    lesson: 32,
    pos: "phr.",
    lessonLabel: "درس 32 — وصف آدم‌ها (بلندقامت، گندمگون، خوش‌قیافه)"
  },
  {
    word: "brown eyes",
    meaning: "چشمان قهوه‌ای",
    lesson: 32,
    pos: "phr.",
    lessonLabel: "درس 32 — وصف آدم‌ها (بلندقامت، گندمگون، خوش‌قیافه)"
  },
  {
    word: "blonde (or fair) hair",
    meaning: "موهای بور (روشن)",
    lesson: 32,
    pos: "phr.",
    lessonLabel: "درس 32 — وصف آدم‌ها (بلندقامت، گندمگون، خوش‌قیافه)"
  },
  {
    word: "fair skin",
    meaning: "پوست روشن",
    lesson: 32,
    pos: "phr.",
    lessonLabel: "درس 32 — وصف آدم‌ها (بلندقامت، گندمگون، خوش‌قیافه)"
  },
  {
    word: "blue eyes",
    meaning: "چشمان آبی",
    lesson: 32,
    pos: "phr.",
    lessonLabel: "درس 32 — وصف آدم‌ها (بلندقامت، گندمگون، خوش‌قیافه)"
  },
  {
    word: "beard",
    meaning: "ریش",
    lesson: 32,
    pos: "n.",
    lessonLabel: "درس 32 — وصف آدم‌ها (بلندقامت، گندمگون، خوش‌قیافه)"
  },
  {
    word: "green eyes",
    meaning: "چشمان سبز",
    lesson: 32,
    pos: "phr.",
    lessonLabel: "درس 32 — وصف آدم‌ها (بلندقامت، گندمگون، خوش‌قیافه)"
  },
  {
    word: "a moustache",
    meaning: "سبیل",
    lesson: 32,
    pos: "phr.",
    lessonLabel: "درس 32 — وصف آدم‌ها (بلندقامت، گندمگون، خوش‌قیافه)"
  },
  {
    word: "has got",
    meaning: "دارد",
    lesson: 32,
    pos: "phr.",
    lessonLabel: "درس 32 — وصف آدم‌ها (بلندقامت، گندمگون، خوش‌قیافه)"
  },
  {
    word: "old",
    meaning: "پیر",
    lesson: 32,
    pos: "adj.",
    lessonLabel: "درس 32 — وصف آدم‌ها (بلندقامت، گندمگون، خوش‌قیافه)"
  },
  {
    word: "young",
    meaning: "جوان",
    lesson: 32,
    pos: "adj.",
    lessonLabel: "درس 32 — وصف آدم‌ها (بلندقامت، گندمگون، خوش‌قیافه)"
  },
  {
    word: "older",
    meaning: "بزرگ‌تر",
    lesson: 32,
    pos: "adj.",
    lessonLabel: "درس 32 — وصف آدم‌ها (بلندقامت، گندمگون، خوش‌قیافه)"
  },
  {
    word: "middle-aged",
    meaning: "میان‌سال",
    lesson: 32,
    pos: "adj.",
    lessonLabel: "درس 32 — وصف آدم‌ها (بلندقامت، گندمگون، خوش‌قیافه)"
  },
  {
    word: "younger",
    meaning: "جوان‌تر",
    lesson: 32,
    pos: "adj.",
    lessonLabel: "درس 32 — وصف آدم‌ها (بلندقامت، گندمگون، خوش‌قیافه)"
  },
  {
    word: "elderly",
    meaning: "سالخورده (مؤدبانه‌تر از old)",
    lesson: 32,
    pos: "adj.",
    lessonLabel: "درس 32 — وصف آدم‌ها (بلندقامت، گندمگون، خوش‌قیافه)"
  },
  {
    word: "pretty",
    meaning: "خوش‌چهره (معمولاً برای زن)",
    lesson: 32,
    pos: "adj.",
    lessonLabel: "درس 32 — وصف آدم‌ها (بلندقامت، گندمگون، خوش‌قیافه)"
  },
  {
    word: "beautiful",
    meaning: "زیبا",
    lesson: 32,
    pos: "adj.",
    lessonLabel: "درس 32 — وصف آدم‌ها (بلندقامت، گندمگون، خوش‌قیافه)"
  },
  {
    word: "handsome",
    meaning: "خوش‌قیافه (معمولاً برای مرد)",
    lesson: 32,
    pos: "adj.",
    lessonLabel: "درس 32 — وصف آدم‌ها (بلندقامت، گندمگون، خوش‌قیافه)"
  },
  {
    word: "ugly",
    meaning: "زشت",
    lesson: 32,
    pos: "adj.",
    lessonLabel: "درس 32 — وصف آدم‌ها (بلندقامت، گندمگون، خوش‌قیافه)"
  },
  {
    word: "ordinary-looking",
    meaning: "عادی‌چهره",
    lesson: 32,
    pos: "adj.",
    lessonLabel: "درس 32 — وصف آدم‌ها (بلندقامت، گندمگون، خوش‌قیافه)"
  },
  {
    word: "well",
    meaning: "خوب (سلامت)",
    lesson: 33,
    pos: "adj.",
    lessonLabel: "درس 33 — سلامتی و بیماری (سردرد، حملهٔ قلبی)"
  },
  {
    word: "fine",
    meaning: "خوب",
    lesson: 33,
    pos: "adj.",
    lessonLabel: "درس 33 — سلامتی و بیماری (سردرد، حملهٔ قلبی)"
  },
  {
    word: "I don't feel very well",
    meaning: "حالم خیلی خوب نیست",
    lesson: 33,
    pos: "phr.",
    lessonLabel: "درس 33 — سلامتی و بیماری (سردرد، حملهٔ قلبی)"
  },
  {
    word: "rest",
    meaning: "استراحت کردن",
    lesson: 33,
    pos: "v.",
    lessonLabel: "درس 33 — سلامتی و بیماری (سردرد، حملهٔ قلبی)"
  },
  {
    word: "ill",
    meaning: "مریض",
    lesson: 33,
    pos: "adj.",
    lessonLabel: "درس 33 — سلامتی و بیماری (سردرد، حملهٔ قلبی)"
  },
  {
    word: "doctor",
    meaning: "پزشک",
    lesson: 33,
    pos: "n.",
    lessonLabel: "درس 33 — سلامتی و بیماری (سردرد، حملهٔ قلبی)"
  },
  {
    word: "sick",
    meaning: "مریض / حالش را آوردن (استفراغ)",
    lesson: 33,
    pos: "adj.",
    lessonLabel: "درس 33 — سلامتی و بیماری (سردرد، حملهٔ قلبی)"
  },
  {
    word: "vomit",
    meaning: "استفراغ کردن",
    lesson: 33,
    pos: "v.",
    lessonLabel: "درس 33 — سلامتی و بیماری (سردرد، حملهٔ قلبی)"
  },
  {
    word: "aspirin",
    meaning: "آسپرین",
    lesson: 33,
    pos: "n.",
    lessonLabel: "درس 33 — سلامتی و بیماری (سردرد، حملهٔ قلبی)"
  },
  {
    word: "headache",
    meaning: "سردرد",
    lesson: 33,
    pos: "n.",
    lessonLabel: "درس 33 — سلامتی و بیماری (سردرد، حملهٔ قلبی)"
  },
  {
    word: "toothache",
    meaning: "دندان‌درد",
    lesson: 33,
    pos: "n.",
    lessonLabel: "درس 33 — سلامتی و بیماری (سردرد، حملهٔ قلبی)"
  },
  {
    word: "dentist",
    meaning: "دندان‌پزشک",
    lesson: 33,
    pos: "n.",
    lessonLabel: "درس 33 — سلامتی و بیماری (سردرد، حملهٔ قلبی)"
  },
  {
    word: "a cold",
    meaning: "سرماخوردگی",
    lesson: 33,
    pos: "n.",
    lessonLabel: "درس 33 — سلامتی و بیماری (سردرد، حملهٔ قلبی)"
  },
  {
    word: "hay-fever",
    meaning: "تب یونجه (آلرژی فصلی)",
    lesson: 33,
    pos: "n.",
    lessonLabel: "درس 33 — سلامتی و بیماری (سردرد، حملهٔ قلبی)"
  },
  {
    word: "sneeze",
    meaning: "عطسه کردن",
    lesson: 33,
    pos: "v.",
    lessonLabel: "درس 33 — سلامتی و بیماری (سردرد، حملهٔ قلبی)"
  },
  {
    word: "asthma",
    meaning: "آسم",
    lesson: 33,
    pos: "n.",
    lessonLabel: "درس 33 — سلامتی و بیماری (سردرد، حملهٔ قلبی)"
  },
  {
    word: "breathe",
    meaning: "نفس کشیدن",
    lesson: 33,
    pos: "v.",
    lessonLabel: "درس 33 — سلامتی و بیماری (سردرد، حملهٔ قلبی)"
  },
  {
    word: "mosquito",
    meaning: "پشه",
    lesson: 33,
    pos: "n.",
    lessonLabel: "درس 33 — سلامتی و بیماری (سردرد، حملهٔ قلبی)"
  },
  {
    word: "malaria",
    meaning: "مالاریا",
    lesson: 33,
    pos: "n.",
    lessonLabel: "درس 33 — سلامتی و بیماری (سردرد، حملهٔ قلبی)"
  },
  {
    word: "cholera",
    meaning: "وبا",
    lesson: 33,
    pos: "n.",
    lessonLabel: "درس 33 — سلامتی و بیماری (سردرد، حملهٔ قلبی)"
  },
  {
    word: "heart attack",
    meaning: "حمله قلبی",
    lesson: 33,
    pos: "n.",
    lessonLabel: "درس 33 — سلامتی و بیماری (سردرد، حملهٔ قلبی)"
  },
  {
    word: "hospital",
    meaning: "بیمارستان",
    lesson: 33,
    pos: "n.",
    lessonLabel: "درس 33 — سلامتی و بیماری (سردرد، حملهٔ قلبی)"
  },
  {
    word: "cancer",
    meaning: "سرطان",
    lesson: 33,
    pos: "n.",
    lessonLabel: "درس 33 — سلامتی و بیماری (سردرد، حملهٔ قلبی)"
  },
  {
    word: "diet",
    meaning: "رژیم غذایی",
    lesson: 33,
    pos: "n.",
    lessonLabel: "درس 33 — سلامتی و بیماری (سردرد، حملهٔ قلبی)"
  },
  {
    word: "exercise",
    meaning: "ورزش",
    lesson: 33,
    pos: "n.",
    lessonLabel: "درس 33 — سلامتی و بیماری (سردرد، حملهٔ قلبی)"
  },
  {
    word: "swimming",
    meaning: "شنا کردن",
    lesson: 33,
    pos: "n.",
    lessonLabel: "درس 33 — سلامتی و بیماری (سردرد، حملهٔ قلبی)"
  },
  {
    word: "jogging",
    meaning: "دویدن نرم (جاگینگ)",
    lesson: 33,
    pos: "n.",
    lessonLabel: "درس 33 — سلامتی و بیماری (سردرد، حملهٔ قلبی)"
  },
  {
    word: "cycling",
    meaning: "دوچرخه‌سواری",
    lesson: 33,
    pos: "n.",
    lessonLabel: "درس 33 — سلامتی و بیماری (سردرد، حملهٔ قلبی)"
  },
  {
    word: "stress",
    meaning: "استرس",
    lesson: 33,
    pos: "n.",
    lessonLabel: "درس 33 — سلامتی و بیماری (سردرد، حملهٔ قلبی)"
  },
  {
    word: "relax",
    meaning: "آرام بودن / آرامش یافتن",
    lesson: 33,
    pos: "v.",
    lessonLabel: "درس 33 — سلامتی و بیماری (سردرد، حملهٔ قلبی)"
  },
  {
    word: "panic",
    meaning: "وحشت کردن",
    lesson: 33,
    pos: "v.",
    lessonLabel: "درس 33 — سلامتی و بیماری (سردرد، حملهٔ قلبی)"
  },
  {
    word: "love",
    meaning: "عشق داشتن؛ دوست داشتن",
    lesson: 34,
    pos: "v.",
    lessonLabel: "درس 34 — احساسات (عشق، خسته)"
  },
  {
    word: "like",
    meaning: "پسندیدن",
    lesson: 34,
    pos: "v.",
    lessonLabel: "درس 34 — احساسات (عشق، خسته)"
  },
  {
    word: "don't like (dislike)",
    meaning: "نپسندیدن",
    lesson: 34,
    pos: "v.",
    lessonLabel: "درس 34 — احساسات (عشق، خسته)"
  },
  {
    word: "hate",
    meaning: "متنفر بودن",
    lesson: 34,
    pos: "v.",
    lessonLabel: "درس 34 — احساسات (عشق، خسته)"
  },
  {
    word: "prefer",
    meaning: "ترجیح دادن",
    lesson: 34,
    pos: "v.",
    lessonLabel: "درس 34 — احساسات (عشق، خسته)"
  },
  {
    word: "want",
    meaning: "خواستن",
    lesson: 34,
    pos: "v.",
    lessonLabel: "درس 34 — احساسات (عشق، خسته)"
  },
  {
    word: "a new car",
    meaning: "یک ماشین جدید",
    lesson: 34,
    pos: "phr.",
    lessonLabel: "درس 34 — احساسات (عشق، خسته)"
  },
  {
    word: "want to buy",
    meaning: "خواستن که بخرید",
    lesson: 34,
    pos: "phr.",
    lessonLabel: "درس 34 — احساسات (عشق، خسته)"
  },
  {
    word: "want my father to buy",
    meaning: "می‌خواهم پدرم بخرد",
    lesson: 34,
    pos: "phr.",
    lessonLabel: "درس 34 — احساسات (عشق، خسته)"
  },
  {
    word: "hope to do well",
    meaning: "امیدوار بودن که خوب عمل کنم",
    lesson: 34,
    pos: "phr.",
    lessonLabel: "درس 34 — احساسات (عشق، خسته)"
  },
  {
    word: "hope (that)",
    meaning: "امیدوار بودن که",
    lesson: 34,
    pos: "phr.",
    lessonLabel: "درس 34 — احساسات (عشق، خسته)"
  },
  {
    word: "happy",
    meaning: "خوشحال",
    lesson: 34,
    pos: "adj.",
    lessonLabel: "درس 34 — احساسات (عشق، خسته)"
  },
  {
    word: "sad",
    meaning: "غمگین",
    lesson: 34,
    pos: "adj.",
    lessonLabel: "درس 34 — احساسات (عشق، خسته)"
  },
  {
    word: "angry",
    meaning: "عصبانی",
    lesson: 34,
    pos: "adj.",
    lessonLabel: "درس 34 — احساسات (عشق، خسته)"
  },
  {
    word: "tired",
    meaning: "خسته",
    lesson: 34,
    pos: "adj.",
    lessonLabel: "درس 34 — احساسات (عشق، خسته)"
  },
  {
    word: "surprised",
    meaning: "متعجب",
    lesson: 34,
    pos: "adj.",
    lessonLabel: "درس 34 — احساسات (عشق، خسته)"
  },
  {
    word: "upset",
    meaning: "دلخور؛ ناراحت",
    lesson: 34,
    pos: "adj.",
    lessonLabel: "درس 34 — احساسات (عشق، خسته)"
  },
  {
    word: "hungry",
    meaning: "گرسنه",
    lesson: 34,
    pos: "adj.",
    lessonLabel: "درس 34 — احساسات (عشق، خسته)"
  },
  {
    word: "thirsty",
    meaning: "تشنه",
    lesson: 34,
    pos: "adj.",
    lessonLabel: "درس 34 — احساسات (عشق، خسته)"
  },
  {
    word: "ill",
    meaning: "مریض",
    lesson: 34,
    pos: "adj.",
    lessonLabel: "درس 34 — احساسات (عشق، خسته)"
  },
  {
    word: "well",
    meaning: "خوب (سلامت)",
    lesson: 34,
    pos: "adj.",
    lessonLabel: "درس 34 — احساسات (عشق، خسته)"
  },
  {
    word: "cold",
    meaning: "سرد",
    lesson: 34,
    pos: "adj.",
    lessonLabel: "درس 34 — احساسات (عشق، خسته)"
  },
  {
    word: "warm",
    meaning: "گرم",
    lesson: 34,
    pos: "adj.",
    lessonLabel: "درس 34 — احساسات (عشق، خسته)"
  },
  {
    word: "hot",
    meaning: "داغ؛ خیلی گرم",
    lesson: 34,
    pos: "adj.",
    lessonLabel: "درس 34 — احساسات (عشق، خسته)"
  },
  {
    word: "good morning",
    meaning: "صبح بخیر",
    lesson: 35,
    lessonLabel: "درس 35 — سلام و احوال‌پرسی و عبارت‌های مفید"
  },
  {
    word: "good afternoon",
    meaning: "عصر (اوایل روز) بخیر",
    lesson: 35,
    lessonLabel: "درس 35 — سلام و احوال‌پرسی و عبارت‌های مفید"
  },
  {
    word: "good evening",
    meaning: "عصر بخیر",
    lesson: 35,
    lessonLabel: "درس 35 — سلام و احوال‌پرسی و عبارت‌های مفید"
  },
  {
    word: "Hello",
    meaning: "سلام",
    lesson: 35,
    lessonLabel: "درس 35 — سلام و احوال‌پرسی و عبارت‌های مفید"
  },
  {
    word: "Hi",
    meaning: "سلام (خودمانی)",
    lesson: 35,
    lessonLabel: "درس 35 — سلام و احوال‌پرسی و عبارت‌های مفید"
  },
  {
    word: "How are you?",
    meaning: "حالت چطور است؟",
    lesson: 35,
    lessonLabel: "درس 35 — سلام و احوال‌پرسی و عبارت‌های مفید"
  },
  {
    word: "Fine thanks. And you?",
    meaning: "خوبم، ممنون. تو چطور؟",
    lesson: 35,
    lessonLabel: "درس 35 — سلام و احوال‌پرسی و عبارت‌های مفید"
  },
  {
    word: "Not too bad, thanks.",
    meaning: "بد نیستم، ممنون",
    lesson: 35,
    lessonLabel: "درس 35 — سلام و احوال‌پرسی و عبارت‌های مفید"
  },
  {
    word: "Goodbye",
    meaning: "خداحافظ",
    lesson: 35,
    lessonLabel: "درس 35 — سلام و احوال‌پرسی و عبارت‌های مفید"
  },
  {
    word: "See you soon!",
    meaning: "به‌زودی می‌بینمت!",
    lesson: 35,
    lessonLabel: "درس 35 — سلام و احوال‌پرسی و عبارت‌های مفید"
  },
  {
    word: "Goodnight",
    meaning: "شب بخیر",
    lesson: 35,
    lessonLabel: "درس 35 — سلام و احوال‌پرسی و عبارت‌های مفید"
  },
  {
    word: "Sleep well",
    meaning: "خواب راحتی داشته باشی",
    lesson: 35,
    lessonLabel: "درس 35 — سلام و احوال‌پرسی و عبارت‌های مفید"
  },
  {
    word: "Please",
    meaning: "لطفاً",
    lesson: 35,
    lessonLabel: "درس 35 — سلام و احوال‌پرسی و عبارت‌های مفید"
  },
  {
    word: "Thank you",
    meaning: "متشکرم",
    lesson: 35,
    lessonLabel: "درس 35 — سلام و احوال‌پرسی و عبارت‌های مفید"
  },
  {
    word: "Cheers!",
    meaning: "نوش جان! / سلام خیاطی!",
    lesson: 35,
    lessonLabel: "درس 35 — سلام و احوال‌پرسی و عبارت‌های مفید"
  },
  {
    word: "Excuse me!",
    meaning: "ببخشید!",
    lesson: 35,
    lessonLabel: "درس 35 — سلام و احوال‌پرسی و عبارت‌های مفید"
  },
  {
    word: "Sorry!",
    meaning: "متأسفم! / ببخشید!",
    lesson: 35,
    lessonLabel: "درس 35 — سلام و احوال‌پرسی و عبارت‌های مفید"
  },
  {
    word: "Bless you!",
    meaning: "عافیتی باشد! (بعد از عطسه)",
    lesson: 35,
    lessonLabel: "درس 35 — سلام و احوال‌پرسی و عبارت‌های مفید"
  },
  {
    word: "Happy Birthday",
    meaning: "تولدت مبارک",
    lesson: 35,
    lessonLabel: "درس 35 — سلام و احوال‌پرسی و عبارت‌های مفید"
  },
  {
    word: "Happy / Merry Christmas",
    meaning: "کریسمس مبارک",
    lesson: 35,
    lessonLabel: "درس 35 — سلام و احوال‌پرسی و عبارت‌های مفید"
  },
  {
    word: "Happy New Year",
    meaning: "سال نو مبارک",
    lesson: 35,
    lessonLabel: "درس 35 — سلام و احوال‌پرسی و عبارت‌های مفید"
  },
  {
    word: "Good luck!",
    meaning: "موفق باشی!",
    lesson: 35,
    lessonLabel: "درس 35 — سلام و احوال‌پرسی و عبارت‌های مفید"
  },
  {
    word: "Congratulations!",
    meaning: "تبریک می‌گویم!",
    lesson: 35,
    lessonLabel: "درس 35 — سلام و احوال‌پرسی و عبارت‌های مفید"
  },
  {
    word: "Well done!",
    meaning: "آفرین! / خیلی خوب بود!",
    lesson: 35,
    lessonLabel: "درس 35 — سلام و احوال‌پرسی و عبارت‌های مفید"
  },
  {
    word: "Africa",
    meaning: "آفریقا",
    lesson: 36,
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "North America",
    meaning: "آمریکای شمالی",
    lesson: 36,
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "South America",
    meaning: "آمریکای جنوبی",
    lesson: 36,
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Europe",
    meaning: "اروپا",
    lesson: 36,
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Asia",
    meaning: "آسیا",
    lesson: 36,
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Australia",
    meaning: "استرالیا",
    lesson: 36,
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "New Zealand",
    meaning: "نیوزیلند",
    lesson: 36,
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Antarctica",
    meaning: "قطب جنوب (انتارکتیکا)",
    lesson: 36,
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Canada",
    meaning: "کانادا",
    lesson: 36,
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "USA",
    meaning: "ایالات متحده آمریکا",
    lesson: 36,
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Norway",
    meaning: "نروژ",
    lesson: 36,
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Sweden",
    meaning: "سوئد",
    lesson: 36,
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Germany",
    meaning: "آلمان",
    lesson: 36,
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Netherlands",
    meaning: "هلند",
    lesson: 36,
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "UK",
    meaning: "بریتانیا",
    lesson: 36,
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Switerland",
    meaning: "سوئیس (چاپ: Switzerland)",
    lesson: 36,
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "France",
    meaning: "فرانسه",
    lesson: 36,
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Spain",
    meaning: "اسپانیا",
    lesson: 36,
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Portugal",
    meaning: "پرتغال",
    lesson: 36,
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Italy",
    meaning: "ایتالیا",
    lesson: 36,
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Finland",
    meaning: "فنلاند",
    lesson: 36,
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Czech Republic",
    meaning: "جمهوری چک",
    lesson: 36,
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Poland",
    meaning: "لهستان",
    lesson: 36,
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Slovakia",
    meaning: "اسلواکی",
    lesson: 36,
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Hungary",
    meaning: "مجارستان",
    lesson: 36,
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Bulgaria",
    meaning: "بلغارستان",
    lesson: 36,
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Turkey",
    meaning: "ترکیه",
    lesson: 36,
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Greece",
    meaning: "یونان",
    lesson: 36,
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Russia",
    meaning: "روسیه",
    lesson: 36,
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Mongolia",
    meaning: "مغولستان",
    lesson: 36,
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Afghanistan",
    meaning: "افغانستان",
    lesson: 36,
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Pakistan",
    meaning: "پاکستان",
    lesson: 36,
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "India",
    meaning: "هند",
    lesson: 36,
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Sri Lanka",
    meaning: "سری‌لانکا",
    lesson: 36,
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Bangladesh",
    meaning: "بنگلادش",
    lesson: 36,
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Japan",
    meaning: "ژاپن",
    lesson: 36,
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "China",
    meaning: "چین",
    lesson: 36,
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Philippines",
    meaning: "فیلیپین",
    lesson: 36,
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Thailand",
    meaning: "تایلند",
    lesson: 36,
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Singapore",
    meaning: "سنگاپور",
    lesson: 36,
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Colombia",
    meaning: "کلمبیا",
    lesson: 36,
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Ecuador",
    meaning: "اکوادور",
    lesson: 36,
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Venezuela",
    meaning: "ونزوئلا",
    lesson: 36,
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Brazil",
    meaning: "برزیل",
    lesson: 36,
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Peru",
    meaning: "پرو",
    lesson: 36,
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Bolivia",
    meaning: "بولیویا",
    lesson: 36,
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Chile",
    meaning: "شیلی",
    lesson: 36,
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Paraguay",
    meaning: "پاراگوئه",
    lesson: 36,
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Uruguay",
    meaning: "اروگوئه",
    lesson: 36,
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Argentina",
    meaning: "آرژانتین",
    lesson: 36,
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "German",
    meaning: "آلمانی",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Mexican",
    meaning: "مکزیکی",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Jamaican",
    meaning: "جامائیکایی",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Russian",
    meaning: "روسی",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Canadian",
    meaning: "کانادایی",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Australian",
    meaning: "استرالیایی",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Brazilian",
    meaning: "برزیلی",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Egyptian",
    meaning: "مصری",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Peruvian",
    meaning: "پرویی",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Korean",
    meaning: "کره‌ای",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Argentinian",
    meaning: "آرژانتینی",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "British",
    meaning: "بریتانیایی",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "English",
    meaning: "انگلیسی",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Irish",
    meaning: "ایرلندی",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Scottish",
    meaning: "اسکاتلندی",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Polish",
    meaning: "لهستانی",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Swedish",
    meaning: "سوئدی",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Finnish",
    meaning: "فنلاندی",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Spanish",
    meaning: "اسپانیایی",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Turkish",
    meaning: "ترکیه‌ای",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Chinese",
    meaning: "چینی",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Portuguese",
    meaning: "پرتغالی",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Japanese",
    meaning: "ژاپنی",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Vietnamese",
    meaning: "ویتنامی",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Nepalese",
    meaning: "نپالی",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "French (from France)",
    meaning: "فرانسوی (از فرانسه)",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Dutch (from Holland)",
    meaning: "هلندی (از هلند)",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Swiss (from Switzerland)",
    meaning: "سوئیسی (از سوئیس)",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Greek",
    meaning: "یونانی",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Iraqi",
    meaning: "عراقی",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Thai",
    meaning: "تایلندی",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Icelandic",
    meaning: "ایسلندی",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Arab",
    meaning: "عرب",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Israeli",
    meaning: "اسرائیلی",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "French",
    meaning: "زبان فرانسوی",
    lesson: 36,
    pos: "n.",
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Norwegian (from Norway)",
    meaning: "زبان نروژی (از نروژ)",
    lesson: 36,
    pos: "n.",
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "Arabic",
    meaning: "زبان عربی",
    lesson: 36,
    pos: "n.",
    lessonLabel: "درس 36 — کشورها، زبان‌ها و مردم"
  },
  {
    word: "sun",
    meaning: "خورشید",
    lesson: 37,
    pos: "n.",
    lessonLabel: "درس 37 — هوا (سرد، باران)"
  },
  {
    word: "rain",
    meaning: "باران",
    lesson: 37,
    pos: "n.",
    lessonLabel: "درس 37 — هوا (سرد، باران)"
  },
  {
    word: "cloud",
    meaning: "ابر",
    lesson: 37,
    pos: "n.",
    lessonLabel: "درس 37 — هوا (سرد، باران)"
  },
  {
    word: "snow",
    meaning: "برف",
    lesson: 37,
    pos: "n.",
    lessonLabel: "درس 37 — هوا (سرد، باران)"
  },
  {
    word: "fog",
    meaning: "مه",
    lesson: 37,
    pos: "n.",
    lessonLabel: "درس 37 — هوا (سرد، باران)"
  },
  {
    word: "wind",
    meaning: "باد",
    lesson: 37,
    pos: "n.",
    lessonLabel: "درس 37 — هوا (سرد، باران)"
  },
  {
    word: "thunder",
    meaning: "رعد",
    lesson: 37,
    pos: "n.",
    lessonLabel: "درس 37 — هوا (سرد، باران)"
  },
  {
    word: "lightning",
    meaning: "آذرخش / برق",
    lesson: 37,
    pos: "n.",
    lessonLabel: "درس 37 — هوا (سرد، باران)"
  },
  {
    word: "sunny",
    meaning: "آفتابی",
    lesson: 37,
    pos: "adj.",
    lessonLabel: "درس 37 — هوا (سرد، باران)"
  },
  {
    word: "rainy",
    meaning: "بارانی",
    lesson: 37,
    pos: "adj.",
    lessonLabel: "درس 37 — هوا (سرد، باران)"
  },
  {
    word: "windy",
    meaning: "بادی",
    lesson: 37,
    pos: "adj.",
    lessonLabel: "درس 37 — هوا (سرد، باران)"
  },
  {
    word: "cloudy",
    meaning: "ابری",
    lesson: 37,
    pos: "adj.",
    lessonLabel: "درس 37 — هوا (سرد، باران)"
  },
  {
    word: "snowy",
    meaning: "برفی",
    lesson: 37,
    pos: "adj.",
    lessonLabel: "درس 37 — هوا (سرد، باران)"
  },
  {
    word: "foggy",
    meaning: "مه‌آلود",
    lesson: 37,
    pos: "adj.",
    lessonLabel: "درس 37 — هوا (سرد، باران)"
  },
  {
    word: "thundery",
    meaning: "رعدآلود",
    lesson: 37,
    pos: "adj.",
    lessonLabel: "درس 37 — هوا (سرد، باران)"
  },
  {
    word: "hot",
    meaning: "داغ / گرم",
    lesson: 37,
    pos: "adj.",
    lessonLabel: "درس 37 — هوا (سرد، باران)"
  },
  {
    word: "cold",
    meaning: "سرد",
    lesson: 37,
    pos: "adj.",
    lessonLabel: "درس 37 — هوا (سرد، باران)"
  },
  {
    word: "wet",
    meaning: "مرطوب / بارانی",
    lesson: 37,
    pos: "adj.",
    lessonLabel: "درس 37 — هوا (سرد، باران)"
  },
  {
    word: "dry",
    meaning: "خشک",
    lesson: 37,
    pos: "adj.",
    lessonLabel: "درس 37 — هوا (سرد، باران)"
  },
  {
    word: "45 degrees",
    meaning: "چهل و پنج درجه",
    lesson: 37,
    pos: "phr.",
    lessonLabel: "درس 37 — هوا (سرد، باران)"
  },
  {
    word: "minus 50 degrees",
    meaning: "منفی پنجاه درجه",
    lesson: 37,
    pos: "phr.",
    lessonLabel: "درس 37 — هوا (سرد، باران)"
  },
  {
    word: "umbrella",
    meaning: "چتر",
    lesson: 37,
    pos: "n.",
    lessonLabel: "درس 37 — هوا (سرد، باران)"
  },
  {
    word: "hurricane",
    meaning: "توفان",
    lesson: 37,
    pos: "n.",
    lessonLabel: "درس 37 — هوا (سرد، باران)"
  },
  {
    word: "storm",
    meaning: "طوفان",
    lesson: 37,
    pos: "n.",
    lessonLabel: "درس 37 — هوا (سرد، باران)"
  },
  {
    word: "thunderstorm",
    meaning: "طوفان رعد و برق",
    lesson: 37,
    pos: "n.",
    lessonLabel: "درس 37 — هوا (سرد، باران)"
  },
  {
    word: "town centre",
    meaning: "مرکز شهر",
    lesson: 38,
    lessonLabel: "درس 38 — در شهر (ایستگاه قطار، بانک)"
  },
  {
    word: "library",
    meaning: "کتابخانه",
    lesson: 38,
    pos: "n.",
    lessonLabel: "درس 38 — در شهر (ایستگاه قطار، بانک)"
  },
  {
    word: "tourist information office",
    meaning: "دفتر اطلاعات گردشگری",
    lesson: 38,
    pos: "n.",
    lessonLabel: "درس 38 — در شهر (ایستگاه قطار، بانک)"
  },
  {
    word: "town hall",
    meaning: "تالار شهر",
    lesson: 38,
    pos: "n.",
    lessonLabel: "درس 38 — در شهر (ایستگاه قطار، بانک)"
  },
  {
    word: "museum",
    meaning: "موزه",
    lesson: 38,
    pos: "n.",
    lessonLabel: "درس 38 — در شهر (ایستگاه قطار، بانک)"
  },
  {
    word: "car park",
    meaning: "پارکینگ",
    lesson: 38,
    pos: "n.",
    lessonLabel: "درس 38 — در شهر (ایستگاه قطار، بانک)"
  },
  {
    word: "bus station",
    meaning: "ایستگاه اتوبوس",
    lesson: 38,
    pos: "n.",
    lessonLabel: "درس 38 — در شهر (ایستگاه قطار، بانک)"
  },
  {
    word: "railway station",
    meaning: "ایستگاه راه‌آهن",
    lesson: 38,
    pos: "n.",
    lessonLabel: "درس 38 — در شهر (ایستگاه قطار، بانک)"
  },
  {
    word: "bank",
    meaning: "بانک",
    lesson: 38,
    pos: "n.",
    lessonLabel: "درس 38 — در شهر (ایستگاه قطار، بانک)"
  },
  {
    word: "post office",
    meaning: "دفتر پست",
    lesson: 38,
    pos: "n.",
    lessonLabel: "درس 38 — در شهر (ایستگاه قطار، بانک)"
  },
  {
    word: "train",
    meaning: "قطار",
    lesson: 38,
    pos: "n.",
    lessonLabel: "درس 38 — در شهر (ایستگاه قطار، بانک)"
  },
  {
    word: "change money",
    meaning: "پول عوض کردن",
    lesson: 38,
    lessonLabel: "درس 38 — در شهر (ایستگاه قطار، بانک)"
  },
  {
    word: "read",
    meaning: "خواندن",
    lesson: 38,
    pos: "v.",
    lessonLabel: "درس 38 — در شهر (ایستگاه قطار، بانک)"
  },
  {
    word: "park",
    meaning: "پارک کردن (خودرو)",
    lesson: 38,
    pos: "v.",
    lessonLabel: "درس 38 — در شهر (ایستگاه قطار، بانک)"
  },
  {
    word: "streets and roads",
    meaning: "خیابان‌ها و جاده‌ها",
    lesson: 38,
    lessonLabel: "درس 38 — در شهر (ایستگاه قطار، بانک)"
  },
  {
    word: "pedestrian area",
    meaning: "منطقهٔ پیاده",
    lesson: 38,
    pos: "n.",
    lessonLabel: "درس 38 — در شهر (ایستگاه قطار، بانک)"
  },
  {
    word: "shopping centre",
    meaning: "مرکز خرید",
    lesson: 38,
    pos: "n.",
    lessonLabel: "درس 38 — در شهر (ایستگاه قطار، بانک)"
  },
  {
    word: "square",
    meaning: "میدان",
    lesson: 38,
    pos: "n.",
    lessonLabel: "درس 38 — در شهر (ایستگاه قطار، بانک)"
  },
  {
    word: "roundabout",
    meaning: "میدان (چهارراه دایره‌ای)",
    lesson: 38,
    pos: "n.",
    lessonLabel: "درس 38 — در شهر (ایستگاه قطار، بانک)"
  },
  {
    word: "police officer",
    meaning: "افسر پلیس",
    lesson: 38,
    pos: "n.",
    lessonLabel: "درس 38 — در شهر (ایستگاه قطار، بانک)"
  },
  {
    word: "traffic warden",
    meaning: "مأمور راهنمایی و رانندگی",
    lesson: 38,
    pos: "n.",
    lessonLabel: "درس 38 — در شهر (ایستگاه قطار، بانک)"
  },
  {
    word: "shop assistant",
    meaning: "فروشندهٔ مغازه",
    lesson: 38,
    pos: "n.",
    lessonLabel: "درس 38 — در شهر (ایستگاه قطار، بانک)"
  },
  {
    word: "librarian",
    meaning: "کتابدار",
    lesson: 38,
    pos: "n.",
    lessonLabel: "درس 38 — در شهر (ایستگاه قطار، بانک)"
  },
  {
    word: "bank clerk",
    meaning: "کارمند بانک",
    lesson: 38,
    pos: "n.",
    lessonLabel: "درس 38 — در شهر (ایستگاه قطار، بانک)"
  },
  {
    word: "signs",
    meaning: "تابلوها، علائم",
    lesson: 38,
    lessonLabel: "درس 38 — در شهر (ایستگاه قطار، بانک)"
  },
  {
    word: "no parking",
    meaning: "پارک ممنوع",
    lesson: 38,
    lessonLabel: "درس 38 — در شهر (ایستگاه قطار، بانک)"
  },
  {
    word: "no entry",
    meaning: "ورود ممنوع",
    lesson: 38,
    lessonLabel: "درس 38 — در شهر (ایستگاه قطار، بانک)"
  },
  {
    word: "bus stop",
    meaning: "ایستگاه اتوبوس",
    lesson: 38,
    pos: "n.",
    lessonLabel: "درس 38 — در شهر (ایستگاه قطار، بانک)"
  },
  {
    word: "crossroads",
    meaning: "چهارراه",
    lesson: 38,
    pos: "n.",
    lessonLabel: "درس 38 — در شهر (ایستگاه قطار، بانک)"
  },
  {
    word: "traffic lights",
    meaning: "چراغ‌های راهنمایی",
    lesson: 38,
    pos: "n.",
    lessonLabel: "درس 38 — در شهر (ایستگاه قطار، بانک)"
  },
  {
    word: "the countryside",
    meaning: "منطقهٔ روستایی، بیرون شهر",
    lesson: 39,
    pos: "n.",
    lessonLabel: "درس 39 — در حومهٔ شهر (تپه، مزرعه)"
  },
  {
    word: "the country",
    meaning: "حومه/دهکده؛ همچنین به معنی کشور",
    lesson: 39,
    pos: "n.",
    lessonLabel: "درس 39 — در حومهٔ شهر (تپه، مزرعه)"
  },
  {
    word: "mountains",
    meaning: "کوه‌ها",
    lesson: 39,
    pos: "n.",
    lessonLabel: "درس 39 — در حومهٔ شهر (تپه، مزرعه)"
  },
  {
    word: "forest",
    meaning: "جنگل",
    lesson: 39,
    pos: "n.",
    lessonLabel: "درس 39 — در حومهٔ شهر (تپه، مزرعه)"
  },
  {
    word: "village",
    meaning: "دهکده، روستا",
    lesson: 39,
    pos: "n.",
    lessonLabel: "درس 39 — در حومهٔ شهر (تپه، مزرعه)"
  },
  {
    word: "hills",
    meaning: "تپه‌ها",
    lesson: 39,
    pos: "n.",
    lessonLabel: "درس 39 — در حومهٔ شهر (تپه، مزرعه)"
  },
  {
    word: "wood",
    meaning: "جنگل کوچک، بیشه",
    lesson: 39,
    pos: "n.",
    lessonLabel: "درس 39 — در حومهٔ شهر (تپه، مزرعه)"
  },
  {
    word: "lake",
    meaning: "دریاچه",
    lesson: 39,
    pos: "n.",
    lessonLabel: "درس 39 — در حومهٔ شهر (تپه، مزرعه)"
  },
  {
    word: "fields",
    meaning: "مزرعه‌ها، کشتزارها",
    lesson: 39,
    pos: "n.",
    lessonLabel: "درس 39 — در حومهٔ شهر (تپه، مزرعه)"
  },
  {
    word: "path",
    meaning: "مسیر، راهروی روستایی",
    lesson: 39,
    pos: "n.",
    lessonLabel: "درس 39 — در حومهٔ شهر (تپه، مزرعه)"
  },
  {
    word: "country road",
    meaning: "جادهٔ روستایی",
    lesson: 39,
    pos: "n.",
    lessonLabel: "درس 39 — در حومهٔ شهر (تپه، مزرعه)"
  },
  {
    word: "river",
    meaning: "رودخانه",
    lesson: 39,
    pos: "n.",
    lessonLabel: "درس 39 — در حومهٔ شهر (تپه، مزرعه)"
  },
  {
    word: "farm",
    meaning: "مزرعه",
    lesson: 39,
    pos: "n.",
    lessonLabel: "درس 39 — در حومهٔ شهر (تپه، مزرعه)"
  },
  {
    word: "small town",
    meaning: "شهر کوچک",
    lesson: 39,
    pos: "n.",
    lessonLabel: "درس 39 — در حومهٔ شهر (تپه، مزرعه)"
  },
  {
    word: "farmer",
    meaning: "کشاورز",
    lesson: 39,
    pos: "n.",
    lessonLabel: "درس 39 — در حومهٔ شهر (تپه، مزرعه)"
  },
  {
    word: "a farm",
    meaning: "یک مزرعه",
    lesson: 39,
    pos: "n.",
    lessonLabel: "درس 39 — در حومهٔ شهر (تپه، مزرعه)"
  },
  {
    word: "cottage",
    meaning: "کلبه (خانهٔ کوچک در روستا)",
    lesson: 39,
    pos: "n.",
    lessonLabel: "درس 39 — در حومهٔ شهر (تپه، مزرعه)"
  },
  {
    word: "nature",
    meaning: "طبیعت",
    lesson: 39,
    pos: "n.",
    lessonLabel: "درس 39 — در حومهٔ شهر (تپه، مزرعه)"
  },
  {
    word: "conservation",
    meaning: "حفاظت (از طبیعت)",
    lesson: 39,
    pos: "n.",
    lessonLabel: "درس 39 — در حومهٔ شهر (تپه، مزرعه)"
  },
  {
    word: "wildlife",
    meaning: "حیات وحش",
    lesson: 39,
    pos: "n.",
    lessonLabel: "درس 39 — در حومهٔ شهر (تپه، مزرعه)"
  },
  {
    word: "conservation area",
    meaning: "منطقهٔ حفاظت‌شده",
    lesson: 39,
    pos: "n.",
    lessonLabel: "درس 39 — در حومهٔ شهر (تپه، مزرعه)"
  },
  {
    word: "national park",
    meaning: "پارک ملی",
    lesson: 39,
    pos: "n.",
    lessonLabel: "درس 39 — در حومهٔ شهر (تپه، مزرعه)"
  },
  {
    word: "picnic",
    meaning: "پیکنیک",
    lesson: 39,
    pos: "n.",
    lessonLabel: "درس 39 — در حومهٔ شهر (تپه، مزرعه)"
  },
  {
    word: "walking/skiing",
    meaning: "پیاده‌گردی / اسکی",
    lesson: 39,
    pos: "n.",
    lessonLabel: "درس 39 — در حومهٔ شهر (تپه، مزرعه)"
  },
  {
    word: "horse",
    meaning: "اسب",
    lesson: 40,
    pos: "n.",
    lessonLabel: "درس 40 — جانوران و حیوانات خانگی (اسب، زرافه)"
  },
  {
    word: "pig",
    meaning: "خوک",
    lesson: 40,
    pos: "n.",
    lessonLabel: "درس 40 — جانوران و حیوانات خانگی (اسب، زرافه)"
  },
  {
    word: "hen",
    meaning: "مرغ",
    lesson: 40,
    pos: "n.",
    lessonLabel: "درس 40 — جانوران و حیوانات خانگی (اسب، زرافه)"
  },
  {
    word: "sheep",
    meaning: "گوسفند",
    lesson: 40,
    pos: "n.",
    lessonLabel: "درس 40 — جانوران و حیوانات خانگی (اسب، زرافه)"
  },
  {
    word: "cow",
    meaning: "گاو",
    lesson: 40,
    pos: "n.",
    lessonLabel: "درس 40 — جانوران و حیوانات خانگی (اسب، زرافه)"
  },
  {
    word: "foal",
    meaning: "کرّه اسب",
    lesson: 40,
    pos: "n.",
    lessonLabel: "درس 40 — جانوران و حیوانات خانگی (اسب، زرافه)"
  },
  {
    word: "milk",
    meaning: "شیر",
    lesson: 40,
    pos: "n.",
    lessonLabel: "درس 40 — جانوران و حیوانات خانگی (اسب، زرافه)"
  },
  {
    word: "leather",
    meaning: "چرم",
    lesson: 40,
    pos: "n.",
    lessonLabel: "درس 40 — جانوران و حیوانات خانگی (اسب، زرافه)"
  },
  {
    word: "meat (beef)",
    meaning: "گوشت (گوشت گاو)",
    lesson: 40,
    pos: "n.",
    lessonLabel: "درس 40 — جانوران و حیوانات خانگی (اسب، زرافه)"
  },
  {
    word: "calf",
    meaning: "گوساله",
    lesson: 40,
    pos: "n.",
    lessonLabel: "درس 40 — جانوران و حیوانات خانگی (اسب، زرافه)"
  },
  {
    word: "wool",
    meaning: "پشم",
    lesson: 40,
    pos: "n.",
    lessonLabel: "درس 40 — جانوران و حیوانات خانگی (اسب، زرافه)"
  },
  {
    word: "meat (lamb)",
    meaning: "گوشت (بره)",
    lesson: 40,
    pos: "n.",
    lessonLabel: "درس 40 — جانوران و حیوانات خانگی (اسب، زرافه)"
  },
  {
    word: "lamb",
    meaning: "بره",
    lesson: 40,
    pos: "n.",
    lessonLabel: "درس 40 — جانوران و حیوانات خانگی (اسب، زرافه)"
  },
  {
    word: "meat (pork, bacon, ham)",
    meaning: "گوشت (گوشت خوک، بیکن، ژامبون)",
    lesson: 40,
    pos: "n.",
    lessonLabel: "درس 40 — جانوران و حیوانات خانگی (اسب، زرافه)"
  },
  {
    word: "piglet",
    meaning: "بچه‌خوک",
    lesson: 40,
    pos: "n.",
    lessonLabel: "درس 40 — جانوران و حیوانات خانگی (اسب، زرافه)"
  },
  {
    word: "eggs",
    meaning: "تخم‌مرغ‌ها",
    lesson: 40,
    pos: "n.",
    lessonLabel: "درس 40 — جانوران و حیوانات خانگی (اسب، زرافه)"
  },
  {
    word: "meat (chicken)",
    meaning: "گوشت (مرغ)",
    lesson: 40,
    pos: "n.",
    lessonLabel: "درس 40 — جانوران و حیوانات خانگی (اسب، زرافه)"
  },
  {
    word: "chick",
    meaning: "جوجه",
    lesson: 40,
    pos: "n.",
    lessonLabel: "درس 40 — جانوران و حیوانات خانگی (اسب، زرافه)"
  },
  {
    word: "monkey",
    meaning: "میمون",
    lesson: 40,
    pos: "n.",
    lessonLabel: "درس 40 — جانوران و حیوانات خانگی (اسب، زرافه)"
  },
  {
    word: "tiger",
    meaning: "ببر",
    lesson: 40,
    pos: "n.",
    lessonLabel: "درس 40 — جانوران و حیوانات خانگی (اسب، زرافه)"
  },
  {
    word: "giraffe",
    meaning: "زرافه",
    lesson: 40,
    pos: "n.",
    lessonLabel: "درس 40 — جانوران و حیوانات خانگی (اسب، زرافه)"
  },
  {
    word: "elephant",
    meaning: "فیل",
    lesson: 40,
    pos: "n.",
    lessonLabel: "درس 40 — جانوران و حیوانات خانگی (اسب، زرافه)"
  },
  {
    word: "snake",
    meaning: "مار",
    lesson: 40,
    pos: "n.",
    lessonLabel: "درس 40 — جانوران و حیوانات خانگی (اسب، زرافه)"
  },
  {
    word: "lion",
    meaning: "شیر",
    lesson: 40,
    pos: "n.",
    lessonLabel: "درس 40 — جانوران و حیوانات خانگی (اسب، زرافه)"
  },
  {
    word: "pet",
    meaning: "حیوان خانگی",
    lesson: 40,
    pos: "n.",
    lessonLabel: "درس 40 — جانوران و حیوانات خانگی (اسب، زرافه)"
  },
  {
    word: "fish",
    meaning: "ماهی",
    lesson: 40,
    pos: "n.",
    lessonLabel: "درس 40 — جانوران و حیوانات خانگی (اسب، زرافه)"
  },
  {
    word: "budgie",
    meaning: "طوطی کوچک (بودژی)",
    lesson: 40,
    pos: "n.",
    lessonLabel: "درس 40 — جانوران و حیوانات خانگی (اسب، زرافه)"
  },
  {
    word: "tortoise",
    meaning: "لاک‌پشت",
    lesson: 40,
    pos: "n.",
    lessonLabel: "درس 40 — جانوران و حیوانات خانگی (اسب، زرافه)"
  },
  {
    word: "cat",
    meaning: "گربه",
    lesson: 40,
    pos: "n.",
    lessonLabel: "درس 40 — جانوران و حیوانات خانگی (اسب، زرافه)"
  },
  {
    word: "parrot",
    meaning: "طوطی",
    lesson: 40,
    pos: "n.",
    lessonLabel: "درس 40 — جانوران و حیوانات خانگی (اسب، زرافه)"
  },
  {
    word: "dog",
    meaning: "سگ",
    lesson: 40,
    pos: "n.",
    lessonLabel: "درس 40 — جانوران و حیوانات خانگی (اسب، زرافه)"
  },
  {
    word: "bird",
    meaning: "پرنده",
    lesson: 40,
    pos: "n.",
    lessonLabel: "درس 40 — جانوران و حیوانات خانگی (اسب، زرافه)"
  },
  {
    word: "take your dog for a walk",
    meaning: "سگ را پیاده‌روی بردن",
    lesson: 40,
    pos: "phr.",
    lessonLabel: "درس 40 — جانوران و حیوانات خانگی (اسب، زرافه)"
  },
  {
    word: "train",
    meaning: "قطار",
    lesson: 41,
    pos: "n.",
    lessonLabel: "درس 41 — سفر (قطار، نقشه)"
  },
  {
    word: "(aero)plane",
    meaning: "هواپیما",
    lesson: 41,
    pos: "n.",
    lessonLabel: "درس 41 — سفر (قطار، نقشه)"
  },
  {
    word: "car",
    meaning: "ماشین",
    lesson: 41,
    pos: "n.",
    lessonLabel: "درس 41 — سفر (قطار، نقشه)"
  },
  {
    word: "bus",
    meaning: "اتوبوس",
    lesson: 41,
    pos: "n.",
    lessonLabel: "درس 41 — سفر (قطار، نقشه)"
  },
  {
    word: "bicycle/bike",
    meaning: "دوچرخه",
    lesson: 41,
    pos: "n.",
    lessonLabel: "درس 41 — سفر (قطار، نقشه)"
  },
  {
    word: "taxi",
    meaning: "تاکسی",
    lesson: 41,
    pos: "n.",
    lessonLabel: "درس 41 — سفر (قطار، نقشه)"
  },
  {
    word: "motorbike/motorcycle",
    meaning: "موتورسیکلت",
    lesson: 41,
    pos: "n.",
    lessonLabel: "درس 41 — سفر (قطار، نقشه)"
  },
  {
    word: "underground",
    meaning: "مترو",
    lesson: 41,
    pos: "n.",
    lessonLabel: "درس 41 — سفر (قطار، نقشه)"
  },
  {
    word: "boat",
    meaning: "قایق",
    lesson: 41,
    pos: "n.",
    lessonLabel: "درس 41 — سفر (قطار، نقشه)"
  },
  {
    word: "ship",
    meaning: "کشتی",
    lesson: 41,
    pos: "n.",
    lessonLabel: "درس 41 — سفر (قطار، نقشه)"
  },
  {
    word: "helicopter",
    meaning: "بالگرد",
    lesson: 41,
    pos: "n.",
    lessonLabel: "درس 41 — سفر (قطار، نقشه)"
  },
  {
    word: "map",
    meaning: "نقشه",
    lesson: 41,
    pos: "n.",
    lessonLabel: "درس 41 — سفر (قطار، نقشه)"
  },
  {
    word: "timetable",
    meaning: "جدول زمان‌بندی",
    lesson: 41,
    pos: "n.",
    lessonLabel: "درس 41 — سفر (قطار، نقشه)"
  },
  {
    word: "customs",
    meaning: "گمرک",
    lesson: 41,
    pos: "n.",
    lessonLabel: "درس 41 — سفر (قطار، نقشه)"
  },
  {
    word: "luggage",
    meaning: "چمدان و اسباب‌سفر",
    lesson: 41,
    pos: "n.",
    lessonLabel: "درس 41 — سفر (قطار، نقشه)"
  },
  {
    word: "passport",
    meaning: "گذرنامه",
    lesson: 41,
    pos: "n.",
    lessonLabel: "درس 41 — سفر (قطار، نقشه)"
  },
  {
    word: "single/return (ticket)",
    meaning: "بلیط یک‌طرفه/رفت‌وبرگشت",
    lesson: 41,
    pos: "n.",
    lessonLabel: "درس 41 — سفر (قطار، نقشه)"
  },
  {
    word: "book/reserve a seat in advance",
    meaning: "رزرو کردن صندلی از قبل",
    lesson: 41,
    pos: "phr.",
    lessonLabel: "درس 41 — سفر (قطار، نقشه)"
  },
  {
    word: "fare",
    meaning: "کرایه",
    lesson: 41,
    pos: "n.",
    lessonLabel: "درس 41 — سفر (قطار، نقشه)"
  },
  {
    word: "journey",
    meaning: "سفر",
    lesson: 41,
    pos: "n.",
    lessonLabel: "درس 41 — سفر (قطار، نقشه)"
  },
  {
    word: "platform",
    meaning: "سکوی (ایستگاه قطار)",
    lesson: 41,
    pos: "n.",
    lessonLabel: "درس 41 — سفر (قطار، نقشه)"
  },
  {
    word: "departs/leaves from",
    meaning: "حرکت کردن/از ... خارج شدن",
    lesson: 41,
    pos: "v.",
    lessonLabel: "درس 41 — سفر (قطار، نقشه)"
  },
  {
    word: "buffet/restaurant car",
    meaning: "واگن رستوران/بوفه",
    lesson: 41,
    pos: "n.",
    lessonLabel: "درس 41 — سفر (قطار، نقشه)"
  },
  {
    word: "change trains",
    meaning: "تعویض قطار",
    lesson: 41,
    pos: "phr.",
    lessonLabel: "درس 41 — سفر (قطار، نقشه)"
  },
  {
    word: "check in",
    meaning: "پرواز ثبت‌نام کردن",
    lesson: 41,
    pos: "phr.",
    lessonLabel: "درس 41 — سفر (قطار، نقشه)"
  },
  {
    word: "takes off",
    meaning: "برخاستن (هواپیما)",
    lesson: 41,
    pos: "phr.",
    lessonLabel: "درس 41 — سفر (قطار، نقشه)"
  },
  {
    word: "went through customs",
    meaning: "از گمرک گذشتن",
    lesson: 41,
    pos: "phr.",
    lessonLabel: "درس 41 — سفر (قطار، نقشه)"
  },
  {
    word: "checked",
    meaning: "بازرسی کرد",
    lesson: 41,
    pos: "v.",
    lessonLabel: "درس 41 — سفر (قطار، نقشه)"
  },
  {
    word: "boarding card",
    meaning: "کارت پرواز",
    lesson: 41,
    pos: "n.",
    lessonLabel: "درس 41 — سفر (قطار، نقشه)"
  },
  {
    word: "flight stewards",
    meaning: "مهمانداران پرواز",
    lesson: 41,
    pos: "n.",
    lessonLabel: "درس 41 — سفر (قطار، نقشه)"
  },
  {
    word: "landed",
    meaning: "فرود آمد",
    lesson: 41,
    pos: "v.",
    lessonLabel: "درس 41 — سفر (قطار، نقشه)"
  },
  {
    word: "hired a car",
    meaning: "ماشین اجاره کرد",
    lesson: 41,
    pos: "phr.",
    lessonLabel: "درس 41 — سفر (قطار، نقشه)"
  },
  {
    word: "fill it up with petrol",
    meaning: "بنزین‌زدن",
    lesson: 41,
    pos: "phr.",
    lessonLabel: "درس 41 — سفر (قطار، نقشه)"
  },
  {
    word: "give you a lift",
    meaning: "سوارت کنم",
    lesson: 41,
    pos: "phr.",
    lessonLabel: "درس 41 — سفر (قطار، نقشه)"
  },
  {
    word: "No smoking (here)",
    meaning: "اینجا سیگار کشیدن ممنوع است",
    lesson: 42,
    pos: "phr.",
    lessonLabel: "درس 42 — اعلان‌ها (کشیدن سیگار ممنوع، خراب است)"
  },
  {
    word: "EXIT / WAY OUT",
    meaning: "خروج",
    lesson: 42,
    pos: "phr.",
    lessonLabel: "درس 42 — اعلان‌ها (کشیدن سیگار ممنوع، خراب است)"
  },
  {
    word: "ENTRANCE / WAY IN",
    meaning: "ورود",
    lesson: 42,
    pos: "phr.",
    lessonLabel: "درس 42 — اعلان‌ها (کشیدن سیگار ممنوع، خراب است)"
  },
  {
    word: "PUSH",
    meaning: "هُل بده (برای باز کردن در)",
    lesson: 42,
    pos: "phr.",
    lessonLabel: "درس 42 — اعلان‌ها (کشیدن سیگار ممنوع، خراب است)"
  },
  {
    word: "PULL",
    meaning: "بکش (برای باز کردن در)",
    lesson: 42,
    pos: "phr.",
    lessonLabel: "درس 42 — اعلان‌ها (کشیدن سیگار ممنوع، خراب است)"
  },
  {
    word: "PLEASE RING FOR ATTENTION",
    meaning: "برای دریافت خدمات زنگ را بزنید",
    lesson: 42,
    pos: "phr.",
    lessonLabel: "درس 42 — اعلان‌ها (کشیدن سیگار ممنوع، خراب است)"
  },
  {
    word: "OPEN",
    meaning: "(فروشگاه) باز است",
    lesson: 42,
    pos: "adj.",
    lessonLabel: "درس 42 — اعلان‌ها (کشیدن سیگار ممنوع، خراب است)"
  },
  {
    word: "CLOSED",
    meaning: "(فروشگاه) بسته است",
    lesson: 42,
    pos: "adj.",
    lessonLabel: "درس 42 — اعلان‌ها (کشیدن سیگار ممنوع، خراب است)"
  },
  {
    word: "SALE",
    meaning: "حراج",
    lesson: 42,
    pos: "n.",
    lessonLabel: "درس 42 — اعلان‌ها (کشیدن سیگار ممنوع، خراب است)"
  },
  {
    word: "PLEASE PAY HERE",
    meaning: "لطفاً اینجا پرداخت کنید",
    lesson: 42,
    pos: "phr.",
    lessonLabel: "درس 42 — اعلان‌ها (کشیدن سیگار ممنوع، خراب است)"
  },
  {
    word: "QUEUE THIS SIDE",
    meaning: "صف در این سمت",
    lesson: 42,
    pos: "phr.",
    lessonLabel: "درس 42 — اعلان‌ها (کشیدن سیگار ممنوع، خراب است)"
  },
  {
    word: "PLEASE DO NOT WALK ON THE GRASS",
    meaning: "لطفاً روی چمن راه نروید",
    lesson: 42,
    pos: "phr.",
    lessonLabel: "درس 42 — اعلان‌ها (کشیدن سیگار ممنوع، خراب است)"
  },
  {
    word: "OUT OF ORDER",
    meaning: "خراب است",
    lesson: 42,
    pos: "phr.",
    lessonLabel: "درس 42 — اعلان‌ها (کشیدن سیگار ممنوع، خراب است)"
  },
  {
    word: "public toilets",
    meaning: "دستشویی عمومی",
    lesson: 42,
    pos: "n.",
    lessonLabel: "درس 42 — اعلان‌ها (کشیدن سیگار ممنوع، خراب است)"
  },
  {
    word: "Men",
    meaning: "آقایان",
    lesson: 42,
    pos: "n.",
    lessonLabel: "درس 42 — اعلان‌ها (کشیدن سیگار ممنوع، خراب است)"
  },
  {
    word: "Women",
    meaning: "بانوان",
    lesson: 42,
    pos: "n.",
    lessonLabel: "درس 42 — اعلان‌ها (کشیدن سیگار ممنوع، خراب است)"
  },
  {
    word: "Toilets",
    meaning: "دستشویی",
    lesson: 42,
    pos: "n.",
    lessonLabel: "درس 42 — اعلان‌ها (کشیدن سیگار ممنوع، خراب است)"
  },
  {
    word: "WC",
    meaning: "دستشویی (واژهٔ مخفف water closet)",
    lesson: 42,
    pos: "n.",
    lessonLabel: "درس 42 — اعلان‌ها (کشیدن سیگار ممنوع، خراب است)"
  },
  {
    word: "bread",
    meaning: "نان",
    lesson: 43,
    lessonLabel: "درس 43 — خوردنی و نوشیدنی (برنج، چای)"
  },
  {
    word: "rice",
    meaning: "برنج",
    lesson: 43,
    lessonLabel: "درس 43 — خوردنی و نوشیدنی (برنج، چای)"
  },
  {
    word: "pasta",
    meaning: "ماکارونی/پاستا",
    lesson: 43,
    lessonLabel: "درس 43 — خوردنی و نوشیدنی (برنج، چای)"
  },
  {
    word: "meat",
    meaning: "گوشت",
    lesson: 43,
    lessonLabel: "درس 43 — خوردنی و نوشیدنی (برنج، چای)"
  },
  {
    word: "fish",
    meaning: "ماهی",
    lesson: 43,
    lessonLabel: "درس 43 — خوردنی و نوشیدنی (برنج، چای)"
  },
  {
    word: "hot-dog",
    meaning: "هات‌داگ",
    lesson: 43,
    lessonLabel: "درس 43 — خوردنی و نوشیدنی (برنج، چای)"
  },
  {
    word: "hamburger",
    meaning: "همبرگر",
    lesson: 43,
    lessonLabel: "درس 43 — خوردنی و نوشیدنی (برنج، چای)"
  },
  {
    word: "pizza",
    meaning: "پیتزا",
    lesson: 43,
    lessonLabel: "درس 43 — خوردنی و نوشیدنی (برنج، چای)"
  },
  {
    word: "fish and chips",
    meaning: "ماهی و سیب‌زمینی سرخ‌کرده",
    lesson: 43,
    pos: "phr.",
    lessonLabel: "درس 43 — خوردنی و نوشیدنی (برنج، چای)"
  },
  {
    word: "vegetables",
    meaning: "سبزیجات",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — خوردنی و نوشیدنی (برنج، چای)"
  },
  {
    word: "fruit",
    meaning: "میوه",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — خوردنی و نوشیدنی (برنج، چای)"
  },
  {
    word: "carrots",
    meaning: "هویج",
    lesson: 43,
    lessonLabel: "درس 43 — خوردنی و نوشیدنی (برنج، چای)"
  },
  {
    word: "beans",
    meaning: "لوبیا",
    lesson: 43,
    lessonLabel: "درس 43 — خوردنی و نوشیدنی (برنج، چای)"
  },
  {
    word: "potatoes",
    meaning: "سیب‌زمینی",
    lesson: 43,
    lessonLabel: "درس 43 — خوردنی و نوشیدنی (برنج، چای)"
  },
  {
    word: "tomatoes",
    meaning: "گوجه‌فرنگی",
    lesson: 43,
    lessonLabel: "درس 43 — خوردنی و نوشیدنی (برنج، چای)"
  },
  {
    word: "peas",
    meaning: "نخود فرنگی",
    lesson: 43,
    lessonLabel: "درس 43 — خوردنی و نوشیدنی (برنج، چای)"
  },
  {
    word: "onions",
    meaning: "پیاز",
    lesson: 43,
    lessonLabel: "درس 43 — خوردنی و نوشیدنی (برنج، چای)"
  },
  {
    word: "garlic",
    meaning: "سیر",
    lesson: 43,
    lessonLabel: "درس 43 — خوردنی و نوشیدنی (برنج، چای)"
  },
  {
    word: "mushrooms",
    meaning: "قارچ",
    lesson: 43,
    lessonLabel: "درس 43 — خوردنی و نوشیدنی (برنج، چای)"
  },
  {
    word: "apple",
    meaning: "سیب",
    lesson: 43,
    lessonLabel: "درس 43 — خوردنی و نوشیدنی (برنج، چای)"
  },
  {
    word: "orange",
    meaning: "پرتقال",
    lesson: 43,
    lessonLabel: "درس 43 — خوردنی و نوشیدنی (برنج، چای)"
  },
  {
    word: "banana",
    meaning: "موز",
    lesson: 43,
    lessonLabel: "درس 43 — خوردنی و نوشیدنی (برنج، چای)"
  },
  {
    word: "pear",
    meaning: "گلابی",
    lesson: 43,
    lessonLabel: "درس 43 — خوردنی و نوشیدنی (برنج، چای)"
  },
  {
    word: "grapes",
    meaning: "انگور",
    lesson: 43,
    lessonLabel: "درس 43 — خوردنی و نوشیدنی (برنج، چای)"
  },
  {
    word: "strawberries",
    meaning: "توت‌فرنگی",
    lesson: 43,
    lessonLabel: "درس 43 — خوردنی و نوشیدنی (برنج، چای)"
  },
  {
    word: "pineapple",
    meaning: "آناناس",
    lesson: 43,
    lessonLabel: "درس 43 — خوردنی و نوشیدنی (برنج، چای)"
  },
  {
    word: "tea",
    meaning: "چای",
    lesson: 43,
    lessonLabel: "درس 43 — خوردنی و نوشیدنی (برنج، چای)"
  },
  {
    word: "coffee",
    meaning: "قهوه",
    lesson: 43,
    lessonLabel: "درس 43 — خوردنی و نوشیدنی (برنج، چای)"
  },
  {
    word: "milk",
    meaning: "شیر",
    lesson: 43,
    lessonLabel: "درس 43 — خوردنی و نوشیدنی (برنج، چای)"
  },
  {
    word: "fruit juice",
    meaning: "آبمیوه",
    lesson: 43,
    pos: "phr.",
    lessonLabel: "درس 43 — خوردنی و نوشیدنی (برنج، چای)"
  },
  {
    word: "beer",
    meaning: "آبجو",
    lesson: 43,
    lessonLabel: "درس 43 — خوردنی و نوشیدنی (برنج، چای)"
  },
  {
    word: "wine",
    meaning: "شراب",
    lesson: 43,
    lessonLabel: "درس 43 — خوردنی و نوشیدنی (برنج، چای)"
  },
  {
    word: "mineral water",
    meaning: "آب معدنی",
    lesson: 43,
    pos: "phr.",
    lessonLabel: "درس 43 — خوردنی و نوشیدنی (برنج، چای)"
  },
  {
    word: "cupboard",
    meaning: "کابینت / گنجه",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — در آشپزخانه (یخچال، لیوان)"
  },
  {
    word: "shelf",
    meaning: "طاقچه / قفسه",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — در آشپزخانه (یخچال، لیوان)"
  },
  {
    word: "sink",
    meaning: "سینک (ظرفشویی)",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — در آشپزخانه (یخچال، لیوان)"
  },
  {
    word: "taps",
    meaning: "شیر آب",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — در آشپزخانه (یخچال، لیوان)"
  },
  {
    word: "worktop",
    meaning: "صفحهٔ کار (رویهٔ کابینت)",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — در آشپزخانه (یخچال، لیوان)"
  },
  {
    word: "cooker",
    meaning: "اجاق گاز / پلوپز",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — در آشپزخانه (یخچال، لیوان)"
  },
  {
    word: "microwave",
    meaning: "مایکروویو",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — در آشپزخانه (یخچال، لیوان)"
  },
  {
    word: "fridge",
    meaning: "یخچال",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — در آشپزخانه (یخچال، لیوان)"
  },
  {
    word: "freezer",
    meaning: "فریزر",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — در آشپزخانه (یخچال، لیوان)"
  },
  {
    word: "wastebin",
    meaning: "سطل زباله",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — در آشپزخانه (یخچال، لیوان)"
  },
  {
    word: "washing-up liquid",
    meaning: "مایع ظرفشویی",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — در آشپزخانه (یخچال، لیوان)"
  },
  {
    word: "tea towel",
    meaning: "دستمال آشپزخانه",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — در آشپزخانه (یخچال، لیوان)"
  },
  {
    word: "saucepan",
    meaning: "قابلمهٔ کوچک",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — در آشپزخانه (یخچال، لیوان)"
  },
  {
    word: "frying pan",
    meaning: "تابه / ماهیتابه",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — در آشپزخانه (یخچال، لیوان)"
  },
  {
    word: "cloth",
    meaning: "پارچه / دستمال",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — در آشپزخانه (یخچال، لیوان)"
  },
  {
    word: "teapot",
    meaning: "قوری",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — در آشپزخانه (یخچال، لیوان)"
  },
  {
    word: "coffee maker",
    meaning: "قهوه‌ساز",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — در آشپزخانه (یخچال، لیوان)"
  },
  {
    word: "kitchen paper/roll",
    meaning: "دستمال کاغذی آشپزخانه",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — در آشپزخانه (یخچال، لیوان)"
  },
  {
    word: "cup",
    meaning: "فنجان",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — در آشپزخانه (یخچال، لیوان)"
  },
  {
    word: "saucer",
    meaning: "نعلبکی",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — در آشپزخانه (یخچال، لیوان)"
  },
  {
    word: "plate",
    meaning: "بشقاب",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — در آشپزخانه (یخچال، لیوان)"
  },
  {
    word: "bowl",
    meaning: "کاسه",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — در آشپزخانه (یخچال، لیوان)"
  },
  {
    word: "knife",
    meaning: "چاقو",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — در آشپزخانه (یخچال، لیوان)"
  },
  {
    word: "fork",
    meaning: "چنگال",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — در آشپزخانه (یخچال، لیوان)"
  },
  {
    word: "spoon",
    meaning: "قاشق",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — در آشپزخانه (یخچال، لیوان)"
  },
  {
    word: "chopsticks",
    meaning: "چاپ‌استیک / ونگ‌های چینی",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — در آشپزخانه (یخچال، لیوان)"
  },
  {
    word: "mug",
    meaning: "ماگ / لیوان بزرگ",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — در آشپزخانه (یخچال، لیوان)"
  },
  {
    word: "glass",
    meaning: "لیوان",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — در آشپزخانه (یخچال، لیوان)"
  },
  {
    word: "bed",
    meaning: "تخت",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — در اتاق‌خواب و حمام (کمد لباس، شامپو)"
  },
  {
    word: "bedside lamp",
    meaning: "چراغ کنار تخت",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — در اتاق‌خواب و حمام (کمد لباس، شامپو)"
  },
  {
    word: "cupboard",
    meaning: "کابینت / گنجه",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — در اتاق‌خواب و حمام (کمد لباس، شامپو)"
  },
  {
    word: "mirror",
    meaning: "آینه",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — در اتاق‌خواب و حمام (کمد لباس، شامپو)"
  },
  {
    word: "hairbrush",
    meaning: "برس مو",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — در اتاق‌خواب و حمام (کمد لباس، شامپو)"
  },
  {
    word: "comb",
    meaning: "شانه",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — در اتاق‌خواب و حمام (کمد لباس، شامپو)"
  },
  {
    word: "dressing table",
    meaning: "میز آرایش",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — در اتاق‌خواب و حمام (کمد لباس، شامپو)"
  },
  {
    word: "chest of drawers",
    meaning: "کمد کشودار / پاتختی",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — در اتاق‌خواب و حمام (کمد لباس، شامپو)"
  },
  {
    word: "alarm clock",
    meaning: "ساعت زنگ‌دار",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — در اتاق‌خواب و حمام (کمد لباس، شامپو)"
  },
  {
    word: "bedside table",
    meaning: "میز کنار تخت",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — در اتاق‌خواب و حمام (کمد لباس، شامپو)"
  },
  {
    word: "nightdress/nightie",
    meaning: "لباس شب (شب‌خواب زنانه)",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — در اتاق‌خواب و حمام (کمد لباس، شامپو)"
  },
  {
    word: "wardrobe",
    meaning: "کمد لباس",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — در اتاق‌خواب و حمام (کمد لباس، شامپو)"
  },
  {
    word: "pyjamas",
    meaning: "لباس خواب (پیژامه)",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — در اتاق‌خواب و حمام (کمد لباس، شامپو)"
  },
  {
    word: "shower",
    meaning: "دوش / حمام گرفتن",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — در اتاق‌خواب و حمام (کمد لباس، شامپو)"
  },
  {
    word: "soap",
    meaning: "صابون",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — در اتاق‌خواب و حمام (کمد لباس، شامپو)"
  },
  {
    word: "toothpaste",
    meaning: "خمیردندان",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — در اتاق‌خواب و حمام (کمد لباس، شامپو)"
  },
  {
    word: "toothbrush",
    meaning: "مسواک",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — در اتاق‌خواب و حمام (کمد لباس، شامپو)"
  },
  {
    word: "bath",
    meaning: "وان حمام / حمام کردن",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — در اتاق‌خواب و حمام (کمد لباس، شامپو)"
  },
  {
    word: "shampoo",
    meaning: "شامپو",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — در اتاق‌خواب و حمام (کمد لباس، شامپو)"
  },
  {
    word: "toilet",
    meaning: "توالت / دست‌شویی",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — در اتاق‌خواب و حمام (کمد لباس، شامپو)"
  },
  {
    word: "shelf",
    meaning: "قفسه",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — در اتاق‌خواب و حمام (کمد لباس، شامپو)"
  },
  {
    word: "basin",
    meaning: "روشویی / لگن",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — در اتاق‌خواب و حمام (کمد لباس، شامپو)"
  },
  {
    word: "towel",
    meaning: "حوله",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — در اتاق‌خواب و حمام (کمد لباس، شامپو)"
  }
];

export const VOCAB_PART_3: Row[] = ROWS;
