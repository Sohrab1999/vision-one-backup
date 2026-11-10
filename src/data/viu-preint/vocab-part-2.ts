// واژگان درس‌های English Vocabulary in Use — Pre-int & Int (پارتیت 2) — استخراج VLM از اسکن PDF
// word = عین چاپ کتاب · meaning = ترجمهٔ ماشینی GLM (کلاس FA-NEW — اثبات صحت ترجمه نیست)
import type { VocabWord } from "../types";

type Row = Omit<VocabWord, "lesson"> & { lesson: number; lessonLabel: string };

const ROWS: Row[] = [
  {
    word: "I think so",
    meaning: "فکر می‌کنم (همین‌طور است)",
    lesson: 21,
    pos: "phr.",
    lessonLabel: "درس 21 — پاسخ‌های رایج"
  },
  {
    word: "I don't think so",
    meaning: "فکر نکنم",
    lesson: 21,
    pos: "phr.",
    lessonLabel: "درس 21 — پاسخ‌های رایج"
  },
  {
    word: "I doubt it",
    meaning: "شک دارم / بعید می‌دانم",
    lesson: 21,
    pos: "phr.",
    lessonLabel: "درس 21 — پاسخ‌های رایج"
  },
  {
    word: "Yes, I hope so",
    meaning: "بله، امیدوارم همین‌طور باشد",
    lesson: 21,
    pos: "phr.",
    lessonLabel: "درس 21 — پاسخ‌های رایج"
  },
  {
    word: "I hope not",
    meaning: "امیدوارم نشود / نباشد",
    lesson: 21,
    pos: "phr.",
    lessonLabel: "درس 21 — پاسخ‌های رایج"
  },
  {
    word: "I'm afraid so",
    meaning: "متأسفانه همین‌طور است",
    lesson: 21,
    pos: "phr.",
    lessonLabel: "درس 21 — پاسخ‌های رایج"
  },
  {
    word: "I'm afraid not",
    meaning: "متأسفانه نه",
    lesson: 21,
    pos: "phr.",
    lessonLabel: "درس 21 — پاسخ‌های رایج"
  },
  {
    word: "enthusiasm",
    meaning: "اشتیاق و هیجان شدید",
    lesson: 21,
    pos: "n.",
    lessonLabel: "درس 21 — پاسخ‌های رایج"
  },
  {
    word: "Really? That's great.",
    meaning: "واقعاً؟ عالی است.",
    lesson: 21,
    pos: "phr.",
    lessonLabel: "درس 21 — پاسخ‌های رایج"
  },
  {
    word: "Oh, that's brilliant.",
    meaning: "اه، این فوق‌العاده است.",
    lesson: 21,
    pos: "phr.",
    lessonLabel: "درس 21 — پاسخ‌های رایج"
  },
  {
    word: "Oh, that sounds wonderful.",
    meaning: "اه، به نظر شگفت‌انگیز می‌رسد.",
    lesson: 21,
    pos: "phr.",
    lessonLabel: "درس 21 — پاسخ‌های رایج"
  },
  {
    word: "Really? That sounds interesting.",
    meaning: "واقعاً؟ جالب به نظر می‌رسد.",
    lesson: 21,
    pos: "phr.",
    lessonLabel: "درس 21 — پاسخ‌های رایج"
  },
  {
    word: "Oh, how fantastic.",
    meaning: "اه، چه فوق‌العاده!",
    lesson: 21,
    pos: "phr.",
    lessonLabel: "درس 21 — پاسخ‌های رایج"
  },
  {
    word: "Wow! How exciting.",
    meaning: "وای! چه هیجان‌انگیز!",
    lesson: 21,
    pos: "phr.",
    lessonLabel: "درس 21 — پاسخ‌های رایج"
  },
  {
    word: "dreadful",
    meaning: "حیرت‌آور / وحشتناک (بد خبر)",
    lesson: 21,
    pos: "adj.",
    lessonLabel: "درس 21 — پاسخ‌های رایج"
  },
  {
    word: "terrible",
    meaning: "افتضاح / وحشتناک",
    lesson: 21,
    pos: "adj.",
    lessonLabel: "درس 21 — پاسخ‌های رایج"
  },
  {
    word: "awful",
    meaning: "خیلی بد",
    lesson: 21,
    pos: "adj.",
    lessonLabel: "درس 21 — پاسخ‌های رایج"
  },
  {
    word: "Oh, what a pity/that's a pity.",
    meaning: "اه، چه حیف/چه بد.",
    lesson: 21,
    pos: "phr.",
    lessonLabel: "درس 21 — پاسخ‌های رایج"
  },
  {
    word: "Oh, what a shame/that's a shame.",
    meaning: "اه، چه حیف.",
    lesson: 21,
    pos: "phr.",
    lessonLabel: "درس 21 — پاسخ‌های رایج"
  },
  {
    word: "Oh, what a nuisance/pain.",
    meaning: "اه، چه مزاحمت/عذاب‌دهنده است.",
    lesson: 21,
    pos: "phr.",
    lessonLabel: "درس 21 — پاسخ‌های رایج"
  },
  {
    word: "disappointment",
    meaning: "ناامیدی",
    lesson: 21,
    pos: "n.",
    lessonLabel: "درس 21 — پاسخ‌های رایج"
  },
  {
    word: "Whenever you like.",
    meaning: "هر وقت که تو دوست داری.",
    lesson: 21,
    pos: "phr.",
    lessonLabel: "درس 21 — پاسخ‌های رایج"
  },
  {
    word: "Whatever you like.",
    meaning: "هر کاری که تو دوست داری.",
    lesson: 21,
    pos: "phr.",
    lessonLabel: "درس 21 — پاسخ‌های رایج"
  },
  {
    word: "Wherever you like.",
    meaning: "هر جا که تو دوست داری.",
    lesson: 21,
    pos: "phr.",
    lessonLabel: "درس 21 — پاسخ‌های رایج"
  },
  {
    word: "I don't mind.",
    meaning: "برایم فرقی ندارد.",
    lesson: 21,
    pos: "phr.",
    lessonLabel: "درس 21 — پاسخ‌های رایج"
  },
  {
    word: "Yeah, if you like.",
    meaning: "باشه، اگر تو دوست داری.",
    lesson: 21,
    pos: "phr.",
    lessonLabel: "درس 21 — پاسخ‌های رایج"
  },
  {
    word: "mmm",
    meaning: "هوم (نشانهٔ شنیدن)",
    lesson: 21,
    pos: "phr.",
    lessonLabel: "درس 21 — پاسخ‌های رایج"
  },
  {
    word: "uh huh",
    meaning: "اَه‌هوم (نشانهٔ شنیدن)",
    lesson: 21,
    pos: "phr.",
    lessonLabel: "درس 21 — پاسخ‌های رایج"
  },
  {
    word: "yeah",
    meaning: "آره",
    lesson: 21,
    pos: "phr.",
    lessonLabel: "درس 21 — پاسخ‌های رایج"
  },
  {
    word: "OK",
    meaning: "خوب / باشه",
    lesson: 21,
    pos: "phr.",
    lessonLabel: "درس 21 — پاسخ‌های رایج"
  },
  {
    word: "I know",
    meaning: "می‌دانم",
    lesson: 21,
    pos: "phr.",
    lessonLabel: "درس 21 — پاسخ‌های رایج"
  },
  {
    word: "sure",
    meaning: "حتماً",
    lesson: 21,
    pos: "phr.",
    lessonLabel: "درس 21 — پاسخ‌های رایج"
  },
  {
    word: "right/I see (= I understand)",
    meaning: "درست/می‌فهمم (متوجه شدم)",
    lesson: 21,
    pos: "phr.",
    lessonLabel: "درس 21 — پاسخ‌های رایج"
  },
  {
    word: "How do you do?",
    meaning: "حالتان چطور است؟ (موقع آشنایی رسمی)",
    lesson: 22,
    pos: "phr.",
    lessonLabel: "درس 22 — سلام‌وعلیک، خداحافظی و عبارت‌های ویژه"
  },
  {
    word: "Hello. Nice to meet you.",
    meaning: "سلام. از آشناییتان خوشبختم.",
    lesson: 22,
    pos: "phr.",
    lessonLabel: "درس 22 — سلام‌وعلیک، خداحافظی و عبارت‌های ویژه"
  },
  {
    word: "Hi/Hello. How are you?",
    meaning: "سلام. حالتان چطور است؟",
    lesson: 22,
    pos: "phr.",
    lessonLabel: "درس 22 — سلام‌وعلیک، خداحافظی و عبارت‌های ویژه"
  },
  {
    word: "How's it going?",
    meaning: "چطور می‌گذرد؟ (خودمانی)",
    lesson: 22,
    pos: "phr.",
    lessonLabel: "درس 22 — سلام‌وعلیک، خداحافظی و عبارت‌های ویژه"
  },
  {
    word: "Fine, thanks. And you?",
    meaning: "خوبم، ممنون. شما چطور؟",
    lesson: 22,
    pos: "phr.",
    lessonLabel: "درس 22 — سلام‌وعلیک، خداحافظی و عبارت‌های ویژه"
  },
  {
    word: "Not bad. How about you?",
    meaning: "بد نیستم. شما چطور؟",
    lesson: 22,
    pos: "phr.",
    lessonLabel: "درس 22 — سلام‌وعلیک، خداحافظی و عبارت‌های ویژه"
  },
  {
    word: "Good morning",
    meaning: "صبح بخیر",
    lesson: 22,
    pos: "phr.",
    lessonLabel: "درس 22 — سلام‌وعلیک، خداحافظی و عبارت‌های ویژه"
  },
  {
    word: "good afternoon",
    meaning: "عصر/بعدازظهر بخیر",
    lesson: 22,
    pos: "phr.",
    lessonLabel: "درس 22 — سلام‌وعلیک، خداحافظی و عبارت‌های ویژه"
  },
  {
    word: "good evening",
    meaning: "شب بخیر",
    lesson: 22,
    pos: "phr.",
    lessonLabel: "درس 22 — سلام‌وعلیک، خداحافظی و عبارت‌های ویژه"
  },
  {
    word: "Good day",
    meaning: "روز بخیر",
    lesson: 22,
    pos: "phr.",
    lessonLabel: "درس 22 — سلام‌وعلیک، خداحافظی و عبارت‌های ویژه"
  },
  {
    word: "Nice to meet you.",
    meaning: "از آشناییتان خوشبختم.",
    lesson: 22,
    pos: "phr.",
    lessonLabel: "درس 22 — سلام‌وعلیک، خداحافظی و عبارت‌های ویژه"
  },
  {
    word: "Nice to have met you.",
    meaning: "از آشناییتان خوشبختم (موقع خداحافظی).",
    lesson: 22,
    pos: "phr.",
    lessonLabel: "درس 22 — سلام‌وعلیک، خداحافظی و عبارت‌های ویژه"
  },
  {
    word: "See you later/tomorrow.",
    meaning: "بعداً/فردا می‌بینمت.",
    lesson: 22,
    pos: "phr.",
    lessonLabel: "درس 22 — سلام‌وعلیک، خداحافظی و عبارت‌های ویژه"
  },
  {
    word: "Bye. See you soon.",
    meaning: "خداحافظ. به زودی می‌بینمت.",
    lesson: 22,
    pos: "phr.",
    lessonLabel: "درس 22 — سلام‌وعلیک، خداحافظی و عبارت‌های ویژه"
  },
  {
    word: "Goodnight.",
    meaning: "شب بخیر (موقع خداحافظی شب)",
    lesson: 22,
    pos: "phr.",
    lessonLabel: "درس 22 — سلام‌وعلیک، خداحافظی و عبارت‌های ویژه"
  },
  {
    word: "Have a nice weekend.",
    meaning: "آخر هفته‌ی خوبی داشته باشی.",
    lesson: 22,
    pos: "phr.",
    lessonLabel: "درس 22 — سلام‌وعلیک، خداحافظی و عبارت‌های ویژه"
  },
  {
    word: "Same to you.",
    meaning: "برای تو هم همین‌طور.",
    lesson: 22,
    pos: "phr.",
    lessonLabel: "درس 22 — سلام‌وعلیک، خداحافظی و عبارت‌های ویژه"
  },
  {
    word: "You too.",
    meaning: "تو هم همین‌طور.",
    lesson: 22,
    pos: "phr.",
    lessonLabel: "درس 22 — سلام‌وعلیک، خداحافظی و عبارت‌های ویژه"
  },
  {
    word: "Happy Birthday",
    meaning: "تولدت مبارک",
    lesson: 22,
    pos: "phr.",
    lessonLabel: "درس 22 — سلام‌وعلیک، خداحافظی و عبارت‌های ویژه"
  },
  {
    word: "Many happy returns",
    meaning: "سال‌ها زیاد باشد (تولد)",
    lesson: 22,
    pos: "phr.",
    lessonLabel: "درس 22 — سلام‌وعلیک، خداحافظی و عبارت‌های ویژه"
  },
  {
    word: "Happy/Merry Christmas",
    meaning: "کریسمس مبارک",
    lesson: 22,
    pos: "phr.",
    lessonLabel: "درس 22 — سلام‌وعلیک، خداحافظی و عبارت‌های ویژه"
  },
  {
    word: "Happy New Year",
    meaning: "سال نو مبارک",
    lesson: 22,
    pos: "phr.",
    lessonLabel: "درس 22 — سلام‌وعلیک، خداحافظی و عبارت‌های ویژه"
  },
  {
    word: "Congratulations",
    meaning: "تبریک می‌گویم",
    lesson: 22,
    pos: "phr.",
    lessonLabel: "درس 22 — سلام‌وعلیک، خداحافظی و عبارت‌های ویژه"
  },
  {
    word: "Well done",
    meaning: "آفرین/خوب کردی",
    lesson: 22,
    pos: "phr.",
    lessonLabel: "درس 22 — سلام‌وعلیک، خداحافظی و عبارت‌های ویژه"
  },
  {
    word: "Excuse me",
    meaning: "ببخشید",
    lesson: 22,
    pos: "phr.",
    lessonLabel: "درس 22 — سلام‌وعلیک، خداحافظی و عبارت‌های ویژه"
  },
  {
    word: "Sorry",
    meaning: "متأسفم/ببخشید",
    lesson: 22,
    pos: "phr.",
    lessonLabel: "درس 22 — سلام‌وعلیک، خداحافظی و عبارت‌های ویژه"
  },
  {
    word: "Cheers",
    meaning: "نوش جان/خداحافظ (خودمانی)/ممنون",
    lesson: 22,
    pos: "phr.",
    lessonLabel: "درس 22 — سلام‌وعلیک، خداحافظی و عبارت‌های ویژه"
  },
  {
    word: "Good luck",
    meaning: "موفق باشی",
    lesson: 22,
    pos: "phr.",
    lessonLabel: "درس 22 — سلام‌وعلیک، خداحافظی و عبارت‌های ویژه"
  },
  {
    word: "Bless you",
    meaning: "عافیت باشد (وقتی عطسه می‌کند)",
    lesson: 22,
    pos: "phr.",
    lessonLabel: "درس 22 — سلام‌وعلیک، خداحافظی و عبارت‌های ویژه"
  },
  {
    word: "Enjoy your meal",
    meaning: "نوش جان کنید",
    lesson: 22,
    pos: "phr.",
    lessonLabel: "درس 22 — سلام‌وعلیک، خداحافظی و عبارت‌های ویژه"
  },
  {
    word: "Thank you",
    meaning: "متشکرم",
    lesson: 22,
    pos: "phr.",
    lessonLabel: "درس 22 — سلام‌وعلیک، خداحافظی و عبارت‌های ویژه"
  },
  {
    word: "go up",
    meaning: "بالا رفتن، افزایش یافتن",
    lesson: 23,
    pos: "phr. v.",
    lessonLabel: "درس 23 — فعل‌های عبارتی (۱): ساختار و معنا"
  },
  {
    word: "fall over",
    meaning: "افتادن، زمین خوردن",
    lesson: 23,
    pos: "phr. v.",
    lessonLabel: "درس 23 — فعل‌های عبارتی (۱): ساختار و معنا"
  },
  {
    word: "find out",
    meaning: "فهمیدن، کشف کردن",
    lesson: 23,
    pos: "phr. v.",
    lessonLabel: "درس 23 — فعل‌های عبارتی (۱): ساختار و معنا"
  },
  {
    word: "look after",
    meaning: "مراقبت کردن از",
    lesson: 23,
    pos: "phr. v.",
    lessonLabel: "درس 23 — فعل‌های عبارتی (۱): ساختار و معنا"
  },
  {
    word: "look up",
    meaning: "جست‌وجو کردن (معنی در فرهنگ لغت)",
    lesson: 23,
    pos: "phr. v.",
    lessonLabel: "درس 23 — فعل‌های عبارتی (۱): ساختار و معنا"
  },
  {
    word: "get on with",
    meaning: "رابطهٔ خوب داشتن با",
    lesson: 23,
    pos: "phr. v.",
    lessonLabel: "درس 23 — فعل‌های عبارتی (۱): ساختار و معنا"
  },
  {
    word: "wake up",
    meaning: "بیدار شدن",
    lesson: 23,
    pos: "phr. v.",
    lessonLabel: "درس 23 — فعل‌های عبارتی (۱): ساختار و معنا"
  },
  {
    word: "save up",
    meaning: "پس‌انداز کردن",
    lesson: 23,
    pos: "phr. v.",
    lessonLabel: "درس 23 — فعل‌های عبارتی (۱): ساختار و معنا"
  },
  {
    word: "hurry up",
    meaning: "عجله کردن",
    lesson: 23,
    pos: "phr. v.",
    lessonLabel: "درس 23 — فعل‌های عبارتی (۱): ساختار و معنا"
  },
  {
    word: "stand up",
    meaning: "بلند شدن",
    lesson: 23,
    pos: "phr. v.",
    lessonLabel: "درس 23 — فعل‌های عبارتی (۱): ساختار و معنا"
  },
  {
    word: "go over",
    meaning: "رفتن به سمت",
    lesson: 23,
    pos: "phr. v.",
    lessonLabel: "درس 23 — فعل‌های عبارتی (۱): ساختار و معنا"
  },
  {
    word: "sit down",
    meaning: "نشستن",
    lesson: 23,
    pos: "phr. v.",
    lessonLabel: "درس 23 — فعل‌های عبارتی (۱): ساختار و معنا"
  },
  {
    word: "lie down",
    meaning: "دراز کشیدن",
    lesson: 23,
    pos: "phr. v.",
    lessonLabel: "درس 23 — فعل‌های عبارتی (۱): ساختار و معنا"
  },
  {
    word: "take back",
    meaning: "برگرداندن",
    lesson: 23,
    pos: "phr. v.",
    lessonLabel: "درس 23 — فعل‌های عبارتی (۱): ساختار و معنا"
  },
  {
    word: "put back",
    meaning: "سر جایش گذاشتن",
    lesson: 23,
    pos: "phr. v.",
    lessonLabel: "درس 23 — فعل‌های عبارتی (۱): ساختار و معنا"
  },
  {
    word: "take off",
    meaning: "درآوردن (لباس)؛ برخاستن (هواپیما)",
    lesson: 23,
    pos: "phr. v.",
    lessonLabel: "درس 23 — فعل‌های عبارتی (۱): ساختار و معنا"
  },
  {
    word: "get over",
    meaning: "بهبود یافتن، از روی (مریضی/چیزی) عبور کردن",
    lesson: 23,
    pos: "phr. v.",
    lessonLabel: "درس 23 — فعل‌های عبارتی (۱): ساختار و معنا"
  },
  {
    word: "carry on",
    meaning: "ادامه دادن",
    lesson: 23,
    pos: "phr. v.",
    lessonLabel: "درس 23 — فعل‌های عبارتی (۱): ساختار و معنا"
  },
  {
    word: "give up",
    meaning: "ترک کردن، دست کشیدن از",
    lesson: 23,
    pos: "phr. v.",
    lessonLabel: "درس 23 — فعل‌های عبارتی (۱): ساختار و معنا"
  },
  {
    word: "run out of",
    meaning: "تمام شدن، به پایان رسیدن (موجودی)",
    lesson: 23,
    pos: "phr. v.",
    lessonLabel: "درس 23 — فعل‌های عبارتی (۱): ساختار و معنا"
  },
  {
    word: "put off",
    meaning: "به تعویق انداختن، عقب انداختن",
    lesson: 23,
    pos: "phr. v.",
    lessonLabel: "درس 23 — فعل‌های عبارتی (۱): ساختار و معنا"
  },
  {
    word: "get through",
    meaning: "تمام کردن؛ برقراری تماس",
    lesson: 23,
    pos: "phr. v.",
    lessonLabel: "درس 23 — فعل‌های عبارتی (۱): ساختار و معنا"
  },
  {
    word: "go off",
    meaning: "زنگ زدن؛ منفجر شدن؛ فاسد شدن",
    lesson: 23,
    pos: "phr. v.",
    lessonLabel: "درس 23 — فعل‌های عبارتی (۱): ساختار و معنا"
  },
  {
    word: "pick up",
    meaning: "برداشتن؛ کسی را با ماشین گرفتن",
    lesson: 23,
    pos: "phr. v.",
    lessonLabel: "درس 23 — فعل‌های عبارتی (۱): ساختار و معنا"
  },
  {
    word: "grow up",
    meaning: "بزرگ شدن (سپری کردن دوران کودکی)",
    lesson: 24,
    pos: "v.",
    lessonLabel: "درس 24 — فعل‌های عبارتی (۲): دستور و سبک"
  },
  {
    word: "come in",
    meaning: "وارد شدن",
    lesson: 24,
    pos: "v.",
    lessonLabel: "درس 24 — فعل‌های عبارتی (۲): دستور و سبک"
  },
  {
    word: "stay in",
    meaning: "در خانه ماندن",
    lesson: 24,
    pos: "v.",
    lessonLabel: "درس 24 — فعل‌های عبارتی (۲): دستور و سبک"
  },
  {
    word: "set off",
    meaning: "به راه افتادن، سفر را شروع کردن",
    lesson: 24,
    pos: "v.",
    lessonLabel: "درس 24 — فعل‌های عبارتی (۲): دستور و سبک"
  },
  {
    word: "put on",
    meaning: "پوشیدن",
    lesson: 24,
    pos: "v.",
    lessonLabel: "درس 24 — فعل‌های عبارتی (۲): دستور و سبک"
  },
  {
    word: "turn on",
    meaning: "روشن کردن",
    lesson: 24,
    pos: "v.",
    lessonLabel: "درس 24 — فعل‌های عبارتی (۲): دستور و سبک"
  },
  {
    word: "take off",
    meaning: "درآوردن؛ بلند شدن (هواپیما)",
    lesson: 24,
    pos: "v.",
    lessonLabel: "درس 24 — فعل‌های عبارتی (۲): دستور و سبک"
  },
  {
    word: "carry on",
    meaning: "ادامه دادن",
    lesson: 24,
    pos: "phr.",
    lessonLabel: "درس 24 — فعل‌های عبارتی (۲): دستور و سبک"
  },
  {
    word: "get by",
    meaning: "کیف‌ورو کردن، پس انداز کردن/سر کردن",
    lesson: 24,
    pos: "phr.",
    lessonLabel: "درس 24 — فعل‌های عبارتی (۲): دستور و سبک"
  },
  {
    word: "put sth on",
    meaning: "پوشیدن چیزی",
    lesson: 24,
    pos: "phr.",
    lessonLabel: "درس 24 — فعل‌های عبارتی (۲): دستور و سبک"
  },
  {
    word: "throw sth away",
    meaning: "دور انداختن چیزی",
    lesson: 24,
    pos: "phr.",
    lessonLabel: "درس 24 — فعل‌های عبارتی (۲): دستور و سبک"
  },
  {
    word: "get over sth",
    meaning: "از پس چیزی برآمدن/بهبود یافتن از چیزی",
    lesson: 24,
    pos: "phr.",
    lessonLabel: "درس 24 — فعل‌های عبارتی (۲): دستور و سبک"
  },
  {
    word: "look after sb/sth",
    meaning: "مراقبت کردن از کسی/چیزی",
    lesson: 24,
    pos: "phr.",
    lessonLabel: "درس 24 — فعل‌های عبارتی (۲): دستور و سبک"
  },
  {
    word: "make sth up",
    meaning: "ساختن/از تصور درآوردن چیزی",
    lesson: 24,
    pos: "phr.",
    lessonLabel: "درس 24 — فعل‌های عبارتی (۲): دستور و سبک"
  },
  {
    word: "leave sth out",
    meaning: "حذف کردن چیزی",
    lesson: 24,
    pos: "phr.",
    lessonLabel: "درس 24 — فعل‌های عبارتی (۲): دستور و سبک"
  },
  {
    word: "sort sth out",
    meaning: "حل کردن چیزی",
    lesson: 24,
    pos: "phr.",
    lessonLabel: "درس 24 — فعل‌های عبارتی (۲): دستور و سبک"
  },
  {
    word: "turn sb/sth down",
    meaning: "رد کردن کسی/چیزی",
    lesson: 24,
    pos: "phr.",
    lessonLabel: "درس 24 — فعل‌های عبارتی (۲): دستور و سبک"
  },
  {
    word: "wake up",
    meaning: "بیدار شدن",
    lesson: 24,
    pos: "v.",
    lessonLabel: "درس 24 — فعل‌های عبارتی (۲): دستور و سبک"
  },
  {
    word: "break down",
    meaning: "خراب شدن، از کار افتادن",
    lesson: 24,
    pos: "v.",
    lessonLabel: "درس 24 — فعل‌های عبارتی (۲): دستور و سبک"
  },
  {
    word: "break into sth",
    meaning: "با زور وارد جایی شدن",
    lesson: 24,
    pos: "phr.",
    lessonLabel: "درس 24 — فعل‌های عبارتی (۲): دستور و سبک"
  },
  {
    word: "have got",
    meaning: "داشتن",
    lesson: 25,
    pos: "phr.",
    lessonLabel: "درس 25 — have و have got (داشتن)"
  },
  {
    word: "have a wash",
    meaning: "وانمود کردن / شست‌وشو کردن",
    lesson: 25,
    pos: "phr.",
    lessonLabel: "درس 25 — have و have got (داشتن)"
  },
  {
    word: "have a shower",
    meaning: "دوش گرفتن",
    lesson: 25,
    pos: "phr.",
    lessonLabel: "درس 25 — have و have got (داشتن)"
  },
  {
    word: "have a rest",
    meaning: "استراحت کردن",
    lesson: 25,
    pos: "phr.",
    lessonLabel: "درس 25 — have و have got (داشتن)"
  },
  {
    word: "have a sleep",
    meaning: "چرت زدن",
    lesson: 25,
    pos: "phr.",
    lessonLabel: "درس 25 — have و have got (داشتن)"
  },
  {
    word: "have a try",
    meaning: "امتحان کردن",
    lesson: 25,
    pos: "phr.",
    lessonLabel: "درس 25 — have و have got (داشتن)"
  },
  {
    word: "have a dream",
    meaning: "خواب دیدن",
    lesson: 25,
    pos: "phr.",
    lessonLabel: "درس 25 — have و have got (داشتن)"
  },
  {
    word: "have a think",
    meaning: "فکر کردن (برای مدتی)",
    lesson: 25,
    pos: "phr.",
    lessonLabel: "درس 25 — have و have got (داشتن)"
  },
  {
    word: "be lucky",
    meaning: "شانس آوردن",
    lesson: 25,
    pos: "phr.",
    lessonLabel: "درس 25 — have و have got (داشتن)"
  },
  {
    word: "be hungry",
    meaning: "گرسنه بودن",
    lesson: 25,
    pos: "adj.",
    lessonLabel: "درس 25 — have و have got (داشتن)"
  },
  {
    word: "be thirsty",
    meaning: "تشنه بودن",
    lesson: 25,
    pos: "adj.",
    lessonLabel: "درس 25 — have و have got (داشتن)"
  },
  {
    word: "have breakfast/lunch/a meal",
    meaning: "صبحانه/ناهار/وعده‌ای خوردن",
    lesson: 25,
    pos: "phr.",
    lessonLabel: "درس 25 — have و have got (داشتن)"
  },
  {
    word: "have a drink",
    meaning: "نوشیدنی خوردن",
    lesson: 25,
    pos: "phr.",
    lessonLabel: "درس 25 — have و have got (داشتن)"
  },
  {
    word: "have a party",
    meaning: "مهمانی گرفتن",
    lesson: 25,
    pos: "phr.",
    lessonLabel: "درس 25 — have و have got (داشتن)"
  },
  {
    word: "have a baby",
    meaning: "بچه به دنیا آوردن",
    lesson: 25,
    pos: "phr.",
    lessonLabel: "درس 25 — have و have got (داشتن)"
  },
  {
    word: "have a look",
    meaning: "نگاه کردن / بررسی کردن",
    lesson: 25,
    pos: "phr.",
    lessonLabel: "درس 25 — have و have got (داشتن)"
  },
  {
    word: "have a nice/great/terrible/etc. time",
    meaning: "وقت خوش/بدی گذراندن",
    lesson: 25,
    pos: "phr.",
    lessonLabel: "درس 25 — have و have got (داشتن)"
  },
  {
    word: "have an argument",
    meaning: "بحث و دعوای کلامی کردن",
    lesson: 25,
    pos: "phr.",
    lessonLabel: "درس 25 — have و have got (داشتن)"
  },
  {
    word: "have a word with sb",
    meaning: "با کسی صحبت کردن",
    lesson: 25,
    pos: "phr.",
    lessonLabel: "درس 25 — have و have got (داشتن)"
  },
  {
    word: "have the bill",
    meaning: "صورت‌حساب را گرفتن",
    lesson: 25,
    pos: "phr.",
    lessonLabel: "درس 25 — have و have got (داشتن)"
  },
  {
    word: "have a problem + (with) or (-ing)",
    meaning: "مشکل داشتن (با) یا در انجام کاری",
    lesson: 25,
    pos: "phr.",
    lessonLabel: "درس 25 — have و have got (داشتن)"
  },
  {
    word: "a mistake (= an error)",
    meaning: "اشتباه",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — make، do و take"
  },
  {
    word: "a meal (= prepare)",
    meaning: "غذا (تهیه کردن)",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — make، do و take"
  },
  {
    word: "money (= become rich)",
    meaning: "پول (پولدار شدن)",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — make، do و take"
  },
  {
    word: "friends",
    meaning: "دوستان",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — make، do و take"
  },
  {
    word: "a decision",
    meaning: "تصمیم",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — make، do و take"
  },
  {
    word: "a noise",
    meaning: "سر و صدا",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — make، do و take"
  },
  {
    word: "progress (= become better)",
    meaning: "پیشرفت (بهتر شدن)",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — make، do و take"
  },
  {
    word: "a difference (= have an effect on a situation)",
    meaning: "تفاوت/تغییر (تأثیرگذاشتن روی یک موقعیت)",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — make، do و take"
  },
  {
    word: "homework",
    meaning: "تکلیف",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — make، do و take"
  },
  {
    word: "the housework (= cleaning)",
    meaning: "کارهای خانه (تمیز کردن)",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — make، do و take"
  },
  {
    word: "a subject (= study a subject)",
    meaning: "موضوع درسی (خواندن یک درس)",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — make، do و take"
  },
  {
    word: "a course",
    meaning: "دورهٔ آموزشی",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — make، do و take"
  },
  {
    word: "the shopping (= buy food)",
    meaning: "خرید (خرید مواد غذایی)",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — make، do و take"
  },
  {
    word: "research (= detailed study)",
    meaning: "تحقیق (مطالعهٔ دقیق)",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — make، do و take"
  },
  {
    word: "sb a favour (= do sth to help sb)",
    meaning: "به کسی لطف کردن (کاری برای کمک به کسی انجام دادن)",
    lesson: 26,
    pos: "phr.",
    lessonLabel: "درس 26 — make، do و take"
  },
  {
    word: "well (= succeed; opp badly)",
    meaning: "خوب (موفق شدن؛ متضاد: بد)",
    lesson: 26,
    pos: "adv.",
    lessonLabel: "درس 26 — make، do و take"
  },
  {
    word: "something/nothing/anything",
    meaning: "چیزی/هیچ چیز/هر چیزی",
    lesson: 26,
    pos: "phr.",
    lessonLabel: "درس 26 — make، do و take"
  },
  {
    word: "an exam (also 'do')",
    meaning: "امتحان (با do هم می‌آید)",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — make، do و take"
  },
  {
    word: "a photo",
    meaning: "عکس",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — make، do و take"
  },
  {
    word: "a break (= short period of rest)",
    meaning: "استراحت کوتاه",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — make، do و take"
  },
  {
    word: "a decision (also 'make')",
    meaning: "تصمیم (با make هم می‌آید)",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — make، do و take"
  },
  {
    word: "a shower (also 'have')",
    meaning: "دوش (با have هم می‌آید)",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — make، do و take"
  },
  {
    word: "a bus/train/plane/taxi (also 'get')",
    meaning: "اتوبوس/قطار/هواپیما/تاکسی سوار شدن (با get هم می‌آید)",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — make، do و take"
  },
  {
    word: "periods of time (= time we need to do sth)",
    meaning: "مدت زمان (زمانی که برای انجام کاری لازم است)",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — make، do و take"
  },
  {
    word: "a seat (= sit down)",
    meaning: "جای نشستن (نشستن)",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — make، do و take"
  },
  {
    word: "time off (= time away from work for holidays or to do sth)",
    meaning: "مرخصی (دور بودن از کار برای تعطیلات یا انجام کاری)",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — make، do و take"
  },
  {
    word: "make",
    meaning: "ساختن/انجام دادن",
    lesson: 26,
    pos: "v.",
    lessonLabel: "درس 26 — make، do و take"
  },
  {
    word: "do",
    meaning: "انجام دادن",
    lesson: 26,
    pos: "v.",
    lessonLabel: "درس 26 — make، do و take"
  },
  {
    word: "take",
    meaning: "گرفتن/بردن",
    lesson: 26,
    pos: "v.",
    lessonLabel: "درس 26 — make، do و take"
  },
  {
    word: "give a ring",
    meaning: "زنگ زدن (تماس تلفنی گرفتن)",
    lesson: 27,
    pos: "phr.",
    lessonLabel: "درس 27 — give، keep، break و see"
  },
  {
    word: "give me a hand",
    meaning: "کمک کردن",
    lesson: 27,
    pos: "phr.",
    lessonLabel: "درس 27 — give، keep، break و see"
  },
  {
    word: "give a lift",
    meaning: "با ماشین رساندن/سوار کردن",
    lesson: 27,
    pos: "phr.",
    lessonLabel: "درس 27 — give، keep، break و see"
  },
  {
    word: "gave me a kiss",
    meaning: "بوسه دادن",
    lesson: 27,
    pos: "phr.",
    lessonLabel: "درس 27 — give، keep، break و see"
  },
  {
    word: "gave me a push",
    meaning: "هل دادن",
    lesson: 27,
    pos: "phr.",
    lessonLabel: "درس 27 — give، keep، break و see"
  },
  {
    word: "gave me a (big) smile",
    meaning: "لبخند زدن",
    lesson: 27,
    pos: "phr.",
    lessonLabel: "درس 27 — give، keep، break و see"
  },
  {
    word: "gave me some advice",
    meaning: "توصیه/مشورت دادن",
    lesson: 27,
    pos: "phr.",
    lessonLabel: "درس 27 — give، keep، break و see"
  },
  {
    word: "gave me a hug",
    meaning: "در آغوش گرفتن",
    lesson: 27,
    pos: "phr.",
    lessonLabel: "درس 27 — give، keep، break و see"
  },
  {
    word: "keep (+ noun/pronoun) + adjective",
    meaning: "کسی/چیزی را در حالتی نگه داشتن",
    lesson: 27,
    pos: "phr.",
    lessonLabel: "درس 27 — give، keep، break و see"
  },
  {
    word: "keep fit",
    meaning: "تناسب اندام خود را حفظ کردن",
    lesson: 27,
    pos: "phr.",
    lessonLabel: "درس 27 — give، keep، break و see"
  },
  {
    word: "keep quiet",
    meaning: "ساکت ماندن/ساکت بودن",
    lesson: 27,
    pos: "phr.",
    lessonLabel: "درس 27 — give، keep، break و see"
  },
  {
    word: "keep + -ing",
    meaning: "مدام کاری را انجام دادن",
    lesson: 27,
    pos: "phr.",
    lessonLabel: "درس 27 — give، keep، break و see"
  },
  {
    word: "keep in touch",
    meaning: "در تماس بودن",
    lesson: 27,
    pos: "phr.",
    lessonLabel: "درس 27 — give، keep، break و see"
  },
  {
    word: "keep you waiting",
    meaning: "کسی را معطل نگه داشتن",
    lesson: 27,
    pos: "phr.",
    lessonLabel: "درس 27 — give، keep، break و see"
  },
  {
    word: "break a record",
    meaning: "رکورد زدن/شکستن رکورد",
    lesson: 27,
    pos: "phr.",
    lessonLabel: "درس 27 — give، keep، break و see"
  },
  {
    word: "breaking the law",
    meaning: "مجرم بودن/نقض قانون",
    lesson: 27,
    pos: "phr.",
    lessonLabel: "درس 27 — give، keep، break و see"
  },
  {
    word: "break the news",
    meaning: "خبر را رساندن",
    lesson: 27,
    pos: "phr.",
    lessonLabel: "درس 27 — give، keep، break و see"
  },
  {
    word: "break her heart",
    meaning: "دل کسی را شکستن/خیلی ناراحت کردن",
    lesson: 27,
    pos: "phr.",
    lessonLabel: "درس 27 — give، keep، break و see"
  },
  {
    word: "I see",
    meaning: "می‌فهمم/متوجه شدم",
    lesson: 27,
    pos: "phr.",
    lessonLabel: "درس 27 — give، keep، break و see"
  },
  {
    word: "I see what you mean",
    meaning: "منظورت را می‌فهمم",
    lesson: 27,
    pos: "phr.",
    lessonLabel: "درس 27 — give، keep، break و see"
  },
  {
    word: "see (= find out)",
    meaning: "بفهمم/ببینم",
    lesson: 27,
    pos: "phr.",
    lessonLabel: "درس 27 — give، keep، break و see"
  },
  {
    word: "I don't see the point of",
    meaning: "دلیل/منطقی چیزی را نمی‌فهمم",
    lesson: 27,
    pos: "phr.",
    lessonLabel: "درس 27 — give، keep، break و see"
  },
  {
    word: "leave home/work (= depart/go out from)",
    meaning: "ترک کردن خانه/کار (= خارج شدن از)",
    lesson: 28,
    pos: "v.",
    lessonLabel: "درس 28 — leave، catch و let"
  },
  {
    word: "leave school/work/a husband/a wife (= permanently)",
    meaning: "ترک کردن مدرسه/کار/شوهر/همسر (= برای همیشه)",
    lesson: 28,
    pos: "v.",
    lessonLabel: "درس 28 — leave، catch و let"
  },
  {
    word: "leave sth/sb somewhere (= allow sb/sth to stay/remain in a place)",
    meaning: "جا گذاشتن چیزی/کسی جایی (= گذاشتن چیزی/کسی در جایی)",
    lesson: 28,
    pos: "v.",
    lessonLabel: "درس 28 — leave، catch و let"
  },
  {
    word: "leave sth somewhere (= forget sth)",
    meaning: "جا گذاشتن چیزی جایی (= فراموش کردن چیزی)",
    lesson: 28,
    pos: "v.",
    lessonLabel: "درس 28 — leave، catch و let"
  },
  {
    word: "have got sth left (= the amount that remains)",
    meaning: "چیزی باقی مانده داشتن (= مقدار باقی‌مانده)",
    lesson: 28,
    lessonLabel: "درس 28 — leave، catch و let"
  },
  {
    word: "leave a message",
    meaning: "پیام گذاشتن",
    lesson: 28,
    lessonLabel: "درس 28 — leave، catch و let"
  },
  {
    word: "leave sb alone (= go away/don't disturb sb)",
    meaning: "کسی را تنها گذاشتن (= رهای کردن، مزاحم نشدن)",
    lesson: 28,
    lessonLabel: "درس 28 — leave، catch و let"
  },
  {
    word: "catch a bus (= take/travel by)",
    meaning: "سوار اتوبوس شدن",
    lesson: 28,
    pos: "v.",
    lessonLabel: "درس 28 — leave، catch و let"
  },
  {
    word: "catch a criminal (= find and take)",
    meaning: "گرفتن مجرم",
    lesson: 28,
    pos: "v.",
    lessonLabel: "درس 28 — leave، catch و let"
  },
  {
    word: "catch a cold/flu (= get)",
    meaning: "سرماخوردن/گرفتن آنفلوآنزا",
    lesson: 28,
    pos: "v.",
    lessonLabel: "درس 28 — leave، catch و let"
  },
  {
    word: "not catch (= not hear what sb said)",
    meaning: "نشنیدن حرف کسی",
    lesson: 28,
    pos: "v.",
    lessonLabel: "درس 28 — leave، catch و let"
  },
  {
    word: "catch a ball",
    meaning: "گرفتن توپ",
    lesson: 28,
    lessonLabel: "درس 28 — leave، catch و let"
  },
  {
    word: "catch sb doing sth (= see sb when they are doing sth wrong)",
    meaning: "کسی را در حال انجام کاری (اشتباه) گرفتن",
    lesson: 28,
    lessonLabel: "درس 28 — leave، catch و let"
  },
  {
    word: "let sb do sth (= permit sb to do sth)",
    meaning: "اجازه دادن به کسی برای انجام کاری",
    lesson: 28,
    pos: "v.",
    lessonLabel: "درس 28 — leave، catch و let"
  },
  {
    word: "let sb know (= tell sb 'yes' or 'no')",
    meaning: "خبر دادن به کسی",
    lesson: 28,
    lessonLabel: "درس 28 — leave، catch و let"
  },
  {
    word: "let's ... (= introducing a suggestion)",
    meaning: "بیا ... (برای پیشنهاد دادن)",
    lesson: 28,
    lessonLabel: "درس 28 — leave، catch و let"
  },
  {
    word: "let me see (= a phrase we use to give ourselves time to think)",
    meaning: "ببینم (برای وقت گرفتن برای فکر کردن)",
    lesson: 28,
    lessonLabel: "درس 28 — leave، catch و let"
  },
  {
    word: "let me do sth (= offering to do sth)",
    meaning: "اجازه بده من انجام بدهم (پیشنهاد کمک)",
    lesson: 28,
    lessonLabel: "درس 28 — leave، catch و let"
  },
  {
    word: "get",
    meaning: "گرفتن/خریدن/شدن/رسیدن/آوردن (فعل پرکاربرد غیررسمی)",
    lesson: 29,
    pos: "v.",
    lessonLabel: "درس 29 — get: کاربردها و عبارت‌ها"
  },
  {
    word: "get married",
    meaning: "ازدواج کردن",
    lesson: 29,
    pos: "phr.",
    lessonLabel: "درس 29 — get: کاربردها و عبارت‌ها"
  },
  {
    word: "get divorced",
    meaning: "طلاق گرفتن",
    lesson: 29,
    pos: "phr.",
    lessonLabel: "درس 29 — get: کاربردها و عبارت‌ها"
  },
  {
    word: "get dressed",
    meaning: "لباس پوشیدن",
    lesson: 29,
    pos: "phr.",
    lessonLabel: "درس 29 — get: کاربردها و عبارت‌ها"
  },
  {
    word: "get undressed",
    meaning: "لباس از تن درآوردن",
    lesson: 29,
    pos: "phr.",
    lessonLabel: "درس 29 — get: کاربردها و عبارت‌ها"
  },
  {
    word: "get changed",
    meaning: "تغییر لباس دادن",
    lesson: 29,
    pos: "phr.",
    lessonLabel: "درس 29 — get: کاربردها و عبارت‌ها"
  },
  {
    word: "get lost",
    meaning: "گم شدن",
    lesson: 29,
    pos: "phr.",
    lessonLabel: "درس 29 — get: کاربردها و عبارت‌ها"
  },
  {
    word: "get on very well with",
    meaning: "رابطهٔ خیلی خوبی با کسی داشتن",
    lesson: 29,
    pos: "phr.",
    lessonLabel: "درس 29 — get: کاربردها و عبارت‌ها"
  },
  {
    word: "How are you getting on?",
    meaning: "پیشرفتت چطور است؟",
    lesson: 29,
    pos: "phr.",
    lessonLabel: "درس 29 — get: کاربردها و عبارت‌ها"
  },
  {
    word: "get to know",
    meaning: "آشنا شدن با افراد",
    lesson: 29,
    pos: "phr.",
    lessonLabel: "درس 29 — get: کاربردها و عبارت‌ها"
  },
  {
    word: "get rid of",
    meaning: "خلاص شدن از چنگ چیزی/کسی",
    lesson: 29,
    pos: "phr.",
    lessonLabel: "درس 29 — get: کاربردها و عبارت‌ها"
  },
  {
    word: "get up",
    meaning: "از تخت/رختخواب بلند شدن",
    lesson: 29,
    pos: "phr.",
    lessonLabel: "درس 29 — get: کاربردها و عبارت‌ها"
  },
  {
    word: "get on my nerves",
    meaning: "حوصل‌سرِ کسی را بریدن",
    lesson: 29,
    pos: "phr.",
    lessonLabel: "درس 29 — get: کاربردها و عبارت‌ها"
  },
  {
    word: "It's getting hot/cold",
    meaning: "هوا دارد گرم/سرد می‌شود",
    lesson: 29,
    pos: "phr.",
    lessonLabel: "درس 29 — get: کاربردها و عبارت‌ها"
  },
  {
    word: "It's getting dark",
    meaning: "هوا دارد تاریک می‌شود",
    lesson: 29,
    pos: "phr.",
    lessonLabel: "درس 29 — get: کاربردها و عبارت‌ها"
  },
  {
    word: "It's getting late",
    meaning: "دارد دیر می‌شود",
    lesson: 29,
    pos: "phr.",
    lessonLabel: "درس 29 — get: کاربردها و عبارت‌ها"
  },
  {
    word: "It's getting better/worse",
    meaning: "دارد بهتر/بدتر می‌شود",
    lesson: 29,
    pos: "phr.",
    lessonLabel: "درس 29 — get: کاربردها و عبارت‌ها"
  },
  {
    word: "It's getting busy",
    meaning: "دارد شلوغ می‌شود",
    lesson: 29,
    pos: "phr.",
    lessonLabel: "درس 29 — get: کاربردها و عبارت‌ها"
  },
  {
    word: "I'm getting tired",
    meaning: "دارد خسته می‌شوم",
    lesson: 29,
    pos: "phr.",
    lessonLabel: "درس 29 — get: کاربردها و عبارت‌ها"
  },
  {
    word: "I'm getting hungry",
    meaning: "دارد گرسنه می‌شوم",
    lesson: 29,
    pos: "phr.",
    lessonLabel: "درس 29 — get: کاربردها و عبارت‌ها"
  },
  {
    word: "I'm getting ready",
    meaning: "دارد آماده می‌شوم",
    lesson: 29,
    pos: "phr.",
    lessonLabel: "درس 29 — get: کاربردها و عبارت‌ها"
  },
  {
    word: "go",
    meaning: "رفتن",
    lesson: 30,
    pos: "v.",
    lessonLabel: "درس 30 — go: کاربردها و عبارت‌ها"
  },
  {
    word: "come",
    meaning: "آمدن",
    lesson: 30,
    pos: "v.",
    lessonLabel: "درس 30 — go: کاربردها و عبارت‌ها"
  },
  {
    word: "bring",
    meaning: "آوردن",
    lesson: 30,
    pos: "v.",
    lessonLabel: "درس 30 — go: کاربردها و عبارت‌ها"
  },
  {
    word: "take",
    meaning: "بردن",
    lesson: 30,
    pos: "v.",
    lessonLabel: "درس 30 — go: کاربردها و عبارت‌ها"
  },
  {
    word: "go + -ing form",
    meaning: "رفتن برای انجام فعالیت (فرم -ing)",
    lesson: 30,
    pos: "phr.",
    lessonLabel: "درس 30 — go: کاربردها و عبارت‌ها"
  },
  {
    word: "go (out) for a + noun",
    meaning: "رفتن (بیرون) برای یک فعالیت/چیز",
    lesson: 30,
    pos: "phr.",
    lessonLabel: "درس 30 — go: کاربردها و عبارت‌ها"
  },
  {
    word: "go shopping",
    meaning: "خرید کردن",
    lesson: 30,
    pos: "phr.",
    lessonLabel: "درس 30 — go: کاربردها و عبارت‌ها"
  },
  {
    word: "go sightseeing",
    meaning: "گشت‌وگذار دیدنی‌ها رفتن",
    lesson: 30,
    pos: "phr.",
    lessonLabel: "درس 30 — go: کاربردها و عبارت‌ها"
  },
  {
    word: "go swimming",
    meaning: "شنا رفتن",
    lesson: 30,
    pos: "phr.",
    lessonLabel: "درس 30 — go: کاربردها و عبارت‌ها"
  },
  {
    word: "go for a walk/drive",
    meaning: "پیاده‌روی/رانندگی رفتن",
    lesson: 30,
    pos: "phr.",
    lessonLabel: "درس 30 — go: کاربردها و عبارت‌ها"
  },
  {
    word: "go for a drink",
    meaning: "نوشیدنی خوردن رفتن",
    lesson: 30,
    pos: "phr.",
    lessonLabel: "درس 30 — go: کاربردها و عبارت‌ها"
  },
  {
    word: "go for a meal",
    meaning: "غذا خوردن رفتن",
    lesson: 30,
    pos: "phr.",
    lessonLabel: "درس 30 — go: کاربردها و عبارت‌ها"
  },
  {
    word: "go grey",
    meaning: "خاکستری شدن (مو)",
    lesson: 30,
    pos: "phr.",
    lessonLabel: "درس 30 — go: کاربردها و عبارت‌ها"
  },
  {
    word: "go bald",
    meaning: "کچل شدن",
    lesson: 30,
    pos: "phr.",
    lessonLabel: "درس 30 — go: کاربردها و عبارت‌ها"
  },
  {
    word: "go bankrupt",
    meaning: "ورشکست شدن",
    lesson: 30,
    pos: "phr.",
    lessonLabel: "درس 30 — go: کاربردها و عبارت‌ها"
  },
  {
    word: "go deaf",
    meaning: "کری شدن",
    lesson: 30,
    pos: "phr.",
    lessonLabel: "درس 30 — go: کاربردها و عبارت‌ها"
  },
  {
    word: "go blind",
    meaning: "نابینا شدن",
    lesson: 30,
    pos: "phr.",
    lessonLabel: "درس 30 — go: کاربردها و عبارت‌ها"
  },
  {
    word: "go mad",
    meaning: "دیوانه شدن؛ خیلی عصبانی شدن (غیررسمی)",
    lesson: 30,
    pos: "phr.",
    lessonLabel: "درس 30 — go: کاربردها و عبارت‌ها"
  },
  {
    word: "deaf",
    meaning: "کِر",
    lesson: 30,
    pos: "adj.",
    lessonLabel: "درس 30 — go: کاربردها و عبارت‌ها"
  },
  {
    word: "blind",
    meaning: "نابینا",
    lesson: 30,
    pos: "adj.",
    lessonLabel: "درس 30 — go: کاربردها و عبارت‌ها"
  },
  {
    word: "go and get",
    meaning: "رفتن و آوردن (fetch)",
    lesson: 30,
    pos: "phr.",
    lessonLabel: "درس 30 — go: کاربردها و عبارت‌ها"
  },
  {
    word: "have a go",
    meaning: "امتحان کردن، یک بار امتحان کردن",
    lesson: 30,
    pos: "phr.",
    lessonLabel: "درس 30 — go: کاربردها و عبارت‌ها"
  },
  {
    word: "How's it going?",
    meaning: "چه خبر؟ / اوضاع چطوره؟ (غیررسمی)",
    lesson: 30,
    pos: "phr.",
    lessonLabel: "درس 30 — go: کاربردها و عبارت‌ها"
  },
  {
    word: "go together",
    meaning: "با هم رفتن",
    lesson: 30,
    pos: "phr.",
    lessonLabel: "درس 30 — go: کاربردها و عبارت‌ها"
  },
  {
    word: "It's time to go",
    meaning: "وقت رفتن است",
    lesson: 30,
    pos: "phr.",
    lessonLabel: "درس 30 — go: کاربردها و عبارت‌ها"
  },
  {
    word: "sight",
    meaning: "بینایی",
    lesson: 31,
    pos: "n.",
    lessonLabel: "درس 31 — حواس پنج‌گانه"
  },
  {
    word: "hearing",
    meaning: "شنوایی",
    lesson: 31,
    pos: "n.",
    lessonLabel: "درس 31 — حواس پنج‌گانه"
  },
  {
    word: "taste",
    meaning: "چشایی",
    lesson: 31,
    pos: "n.|v.",
    lessonLabel: "درس 31 — حواس پنج‌گانه"
  },
  {
    word: "touch",
    meaning: "لامسه؛ لمس کردن",
    lesson: 31,
    pos: "n.|v.",
    lessonLabel: "درس 31 — حواس پنج‌گانه"
  },
  {
    word: "smell",
    meaning: "بویایی؛ بوییدن",
    lesson: 31,
    pos: "n.|v.",
    lessonLabel: "درس 31 — حواس پنج‌گانه"
  },
  {
    word: "look",
    meaning: "به نظر رسیدن؛ نگاه کردن",
    lesson: 31,
    pos: "v.",
    lessonLabel: "درس 31 — حواس پنج‌گانه"
  },
  {
    word: "sound",
    meaning: "به نظر رسیدن (از نظر صدا)؛ صدا",
    lesson: 31,
    pos: "v.|n.",
    lessonLabel: "درس 31 — حواس پنج‌گانه"
  },
  {
    word: "feel",
    meaning: "احساس شدن؛ لمس کردن",
    lesson: 31,
    pos: "v.",
    lessonLabel: "درس 31 — حواس پنج‌گانه"
  },
  {
    word: "see",
    meaning: "دیدن، توانایی دیدن",
    lesson: 31,
    pos: "v.",
    lessonLabel: "درس 31 — حواس پنج‌گانه"
  },
  {
    word: "look for sth",
    meaning: "دنبال چیزی گشتن",
    lesson: 31,
    pos: "phr.",
    lessonLabel: "درس 31 — حواس پنج‌گانه"
  },
  {
    word: "look at sth",
    meaning: "به چیزی نگاه کردن",
    lesson: 31,
    pos: "phr.",
    lessonLabel: "درس 31 — حواس پنج‌گانه"
  },
  {
    word: "watch",
    meaning: "تماشا کردن",
    lesson: 31,
    pos: "v.",
    lessonLabel: "درس 31 — حواس پنج‌گانه"
  },
  {
    word: "hear",
    meaning: "شنیدن، توانایی شنیدن",
    lesson: 31,
    pos: "v.",
    lessonLabel: "درس 31 — حواس پنج‌گانه"
  },
  {
    word: "listen (to)",
    meaning: "گوش دادن (به)",
    lesson: 31,
    pos: "v.",
    lessonLabel: "درس 31 — حواس پنج‌گانه"
  },
  {
    word: "press",
    meaning: "فشار دادن (دکمه)",
    lesson: 31,
    pos: "v.",
    lessonLabel: "درس 31 — حواس پنج‌گانه"
  },
  {
    word: "hold",
    meaning: "نگه داشتن",
    lesson: 31,
    pos: "v.",
    lessonLabel: "درس 31 — حواس پنج‌گانه"
  },
  {
    word: "a bag of shopping",
    meaning: "کیف خریداری",
    lesson: 32,
    lessonLabel: "درس 32 — کمیت‌نماها (a bag of…، a bit of…)"
  },
  {
    word: "a bowl of sugar",
    meaning: "کاسه شکر",
    lesson: 32,
    lessonLabel: "درس 32 — کمیت‌نماها (a bag of…، a bit of…)"
  },
  {
    word: "a bottle of wine",
    meaning: "بطری شراب",
    lesson: 32,
    lessonLabel: "درس 32 — کمیت‌نماها (a bag of…، a bit of…)"
  },
  {
    word: "a glass of water",
    meaning: "لیوان آب",
    lesson: 32,
    lessonLabel: "درس 32 — کمیت‌نماها (a bag of…، a bit of…)"
  },
  {
    word: "a can of cola",
    meaning: "قوطی کولا",
    lesson: 32,
    lessonLabel: "درس 32 — کمیت‌نماها (a bag of…، a bit of…)"
  },
  {
    word: "a box of chocolates",
    meaning: "جعبه شکلات",
    lesson: 32,
    lessonLabel: "درس 32 — کمیت‌نماها (a bag of…، a bit of…)"
  },
  {
    word: "a jar of marmalade",
    meaning: "شیشه مربا",
    lesson: 32,
    lessonLabel: "درس 32 — کمیت‌نماها (a bag of…، a bit of…)"
  },
  {
    word: "a jug of milk",
    meaning: "پارچ شیر",
    lesson: 32,
    lessonLabel: "درس 32 — کمیت‌نماها (a bag of…، a bit of…)"
  },
  {
    word: "a packet of cigarettes",
    meaning: "بسته سیگار",
    lesson: 32,
    lessonLabel: "درس 32 — کمیت‌نماها (a bag of…، a bit of…)"
  },
  {
    word: "a carton of orange juice",
    meaning: "کارتن/بسته آب پرتقال",
    lesson: 32,
    lessonLabel: "درس 32 — کمیت‌نماها (a bag of…، a bit of…)"
  },
  {
    word: "a tin of fruit",
    meaning: "قوطی می‌وه کنسرو شده",
    lesson: 32,
    lessonLabel: "درس 32 — کمیت‌نماها (a bag of…، a bit of…)"
  },
  {
    word: "a tube of toothpaste",
    meaning: "لوله خمیردندان",
    lesson: 32,
    lessonLabel: "درس 32 — کمیت‌نماها (a bag of…، a bit of…)"
  },
  {
    word: "a vase of flowers",
    meaning: "گلدان گل",
    lesson: 32,
    lessonLabel: "درس 32 — کمیت‌نماها (a bag of…، a bit of…)"
  },
  {
    word: "a cup of coffee",
    meaning: "فنجان قهوه",
    lesson: 32,
    lessonLabel: "درس 32 — کمیت‌نماها (a bag of…، a bit of…)"
  },
  {
    word: "a sheet of paper",
    meaning: "برگه کاغذ",
    lesson: 32,
    lessonLabel: "درس 32 — کمیت‌نماها (a bag of…، a bit of…)"
  },
  {
    word: "a piece of toast",
    meaning: "تکه نان تست",
    lesson: 32,
    lessonLabel: "درس 32 — کمیت‌نماها (a bag of…، a bit of…)"
  },
  {
    word: "a piece of cake",
    meaning: "تکه کیک",
    lesson: 32,
    lessonLabel: "درس 32 — کمیت‌نماها (a bag of…، a bit of…)"
  },
  {
    word: "a piece of wood",
    meaning: "تکه چوب",
    lesson: 32,
    lessonLabel: "درس 32 — کمیت‌نماها (a bag of…، a bit of…)"
  },
  {
    word: "a slice of ham",
    meaning: "برش ژامبون",
    lesson: 32,
    lessonLabel: "درس 32 — کمیت‌نماها (a bag of…، a bit of…)"
  },
  {
    word: "a slice of bread",
    meaning: "برش نان (= یک تکه نازک)",
    lesson: 32,
    lessonLabel: "درس 32 — کمیت‌نماها (a bag of…، a bit of…)"
  },
  {
    word: "a drop of milk",
    meaning: "قطره‌ای شیر (= مقدار کم)",
    lesson: 32,
    lessonLabel: "درس 32 — کمیت‌نماها (a bag of…، a bit of…)"
  },
  {
    word: "a piece of advice",
    meaning: "یک توصیه",
    lesson: 32,
    lessonLabel: "درس 32 — کمیت‌نماها (a bag of…، a bit of…)"
  },
  {
    word: "a bit of advice",
    meaning: "کمی توصیه",
    lesson: 32,
    lessonLabel: "درس 32 — کمیت‌نماها (a bag of…، a bit of…)"
  },
  {
    word: "a bit of bread",
    meaning: "کمی نان",
    lesson: 32,
    lessonLabel: "درس 32 — کمیت‌نماها (a bag of…، a bit of…)"
  },
  {
    word: "a bit of luck",
    meaning: "کمی شانس",
    lesson: 32,
    lessonLabel: "درس 32 — کمیت‌نماها (a bag of…، a bit of…)"
  },
  {
    word: "a bit of time",
    meaning: "کمی وقت",
    lesson: 32,
    lessonLabel: "درس 32 — کمیت‌نماها (a bag of…، a bit of…)"
  },
  {
    word: "a bit of news",
    meaning: "کمی خبر",
    lesson: 32,
    lessonLabel: "درس 32 — کمیت‌نماها (a bag of…، a bit of…)"
  },
  {
    word: "a pair of skis",
    meaning: "یک جفت اسکی",
    lesson: 32,
    lessonLabel: "درس 32 — کمیت‌نماها (a bag of…، a bit of…)"
  },
  {
    word: "pairs of shoes",
    meaning: "جفت کفش",
    lesson: 32,
    lessonLabel: "درس 32 — کمیت‌نماها (a bag of…، a bit of…)"
  },
  {
    word: "pairs of shorts",
    meaning: "جفت شلوارک",
    lesson: 32,
    lessonLabel: "درس 32 — کمیت‌نماها (a bag of…، a bit of…)"
  },
  {
    word: "a herd of cows",
    meaning: "گله گاو",
    lesson: 32,
    lessonLabel: "درس 32 — کمیت‌نماها (a bag of…، a bit of…)"
  },
  {
    word: "a group of people",
    meaning: "گروهی از مردم",
    lesson: 32,
    lessonLabel: "درس 32 — کمیت‌نماها (a bag of…، a bit of…)"
  },
  {
    word: "a bunch of flowers",
    meaning: "دسته گل",
    lesson: 32,
    lessonLabel: "درس 32 — کمیت‌نماها (a bag of…، a bit of…)"
  },
  {
    word: "a bunch of grapes",
    meaning: "خوشه انگور",
    lesson: 32,
    lessonLabel: "درس 32 — کمیت‌نماها (a bag of…، a bit of…)"
  },
  {
    word: "a gang of youths/kids/teenagers",
    meaning: "باند نوجوانان/بچه‌ها (معنای منفی)",
    lesson: 32,
    lessonLabel: "درس 32 — کمیت‌نماها (a bag of…، a bit of…)"
  },
  {
    word: "information",
    meaning: "اطلاعات",
    lesson: 33,
    pos: "n.",
    lessonLabel: "درس 33 — اسم‌های غیرقابل‌شمارش و اسم جمع"
  },
  {
    word: "homework",
    meaning: "تکالیف خانه",
    lesson: 33,
    pos: "n.",
    lessonLabel: "درس 33 — اسم‌های غیرقابل‌شمارش و اسم جمع"
  },
  {
    word: "advice",
    meaning: "توصیه، مشاوره",
    lesson: 33,
    pos: "n.",
    lessonLabel: "درس 33 — اسم‌های غیرقابل‌شمارش و اسم جمع"
  },
  {
    word: "furniture",
    meaning: "مبلمان",
    lesson: 33,
    pos: "n.",
    lessonLabel: "درس 33 — اسم‌های غیرقابل‌شمارش و اسم جمع"
  },
  {
    word: "knowledge",
    meaning: "دانش، معلومات",
    lesson: 33,
    pos: "n.",
    lessonLabel: "درس 33 — اسم‌های غیرقابل‌شمارش و اسم جمع"
  },
  {
    word: "camping equipment",
    meaning: "تجهیزات کمپینگ",
    lesson: 33,
    pos: "n.",
    lessonLabel: "درس 33 — اسم‌های غیرقابل‌شمارش و اسم جمع"
  },
  {
    word: "progress",
    meaning: "پیشرفت",
    lesson: 33,
    pos: "n.",
    lessonLabel: "درس 33 — اسم‌های غیرقابل‌شمارش و اسم جمع"
  },
  {
    word: "news",
    meaning: "اخبار",
    lesson: 33,
    pos: "n.",
    lessonLabel: "درس 33 — اسم‌های غیرقابل‌شمارش و اسم جمع"
  },
  {
    word: "hand luggage",
    meaning: "چمدان دستی",
    lesson: 33,
    pos: "n.",
    lessonLabel: "درس 33 — اسم‌های غیرقابل‌شمارش و اسم جمع"
  },
  {
    word: "toast",
    meaning: "نان تست",
    lesson: 33,
    pos: "n.",
    lessonLabel: "درس 33 — اسم‌های غیرقابل‌شمارش و اسم جمع"
  },
  {
    word: "book (C)",
    meaning: "کتاب (قابل شمارش)",
    lesson: 33,
    pos: "n.",
    lessonLabel: "درس 33 — اسم‌های غیرقابل‌شمارش و اسم جمع"
  },
  {
    word: "housework (U)",
    meaning: "کارهای خانه (غیرقابل شمارش)",
    lesson: 33,
    pos: "n.",
    lessonLabel: "درس 33 — اسم‌های غیرقابل‌شمارش و اسم جمع"
  },
  {
    word: "hair (U)",
    meaning: "مو (غیرقابل شمارش)",
    lesson: 33,
    pos: "n.",
    lessonLabel: "درس 33 — اسم‌های غیرقابل‌شمارش و اسم جمع"
  },
  {
    word: "hair (C)",
    meaning: "تار مو (قابل شمارش)",
    lesson: 33,
    pos: "n.",
    lessonLabel: "درس 33 — اسم‌های غیرقابل‌شمارش و اسم جمع"
  },
  {
    word: "trousers",
    meaning: "شلوار",
    lesson: 33,
    pos: "n.",
    lessonLabel: "درس 33 — اسم‌های غیرقابل‌شمارش و اسم جمع"
  },
  {
    word: "stairs",
    meaning: "پله‌ها",
    lesson: 33,
    pos: "n.",
    lessonLabel: "درس 33 — اسم‌های غیرقابل‌شمارش و اسم جمع"
  },
  {
    word: "sunglasses",
    meaning: "عینک آفتابی",
    lesson: 33,
    pos: "n.",
    lessonLabel: "درس 33 — اسم‌های غیرقابل‌شمارش و اسم جمع"
  },
  {
    word: "a pair of",
    meaning: "یک جفت",
    lesson: 33,
    pos: "phr.",
    lessonLabel: "درس 33 — اسم‌های غیرقابل‌شمارش و اسم جمع"
  },
  {
    word: "trainers",
    meaning: "کتانی، کفش ورزشی",
    lesson: 33,
    pos: "n.",
    lessonLabel: "درس 33 — اسم‌های غیرقابل‌شمارش و اسم جمع"
  },
  {
    word: "shorts",
    meaning: "شلوارک",
    lesson: 33,
    pos: "n.",
    lessonLabel: "درس 33 — اسم‌های غیرقابل‌شمارش و اسم جمع"
  },
  {
    word: "pyjamas",
    meaning: "لباس خواب",
    lesson: 33,
    pos: "n.",
    lessonLabel: "درس 33 — اسم‌های غیرقابل‌شمارش و اسم جمع"
  },
  {
    word: "scissors",
    meaning: "قیچی",
    lesson: 33,
    pos: "n.",
    lessonLabel: "درس 33 — اسم‌های غیرقابل‌شمارش و اسم جمع"
  },
  {
    word: "scales",
    meaning: "ترازو",
    lesson: 33,
    pos: "n.",
    lessonLabel: "درس 33 — اسم‌های غیرقابل‌شمارش و اسم جمع"
  },
  {
    word: "headphones",
    meaning: "هدفون",
    lesson: 33,
    pos: "n.",
    lessonLabel: "درس 33 — اسم‌های غیرقابل‌شمارش و اسم جمع"
  },
  {
    word: "enjoy",
    meaning: "لذت بردن",
    lesson: 34,
    pos: "v.",
    lessonLabel: "درس 34 — فعل + شکل -ing یا مصدر"
  },
  {
    word: "finish",
    meaning: "تمام کردن",
    lesson: 34,
    pos: "v.",
    lessonLabel: "درس 34 — فعل + شکل -ing یا مصدر"
  },
  {
    word: "imagine",
    meaning: "تصور کردن",
    lesson: 34,
    pos: "v.",
    lessonLabel: "درس 34 — فعل + شکل -ing یا مصدر"
  },
  {
    word: "admit",
    meaning: "اعتراف کردن",
    lesson: 34,
    pos: "v.",
    lessonLabel: "درس 34 — فعل + شکل -ing یا مصدر"
  },
  {
    word: "avoid",
    meaning: "اجتناب کردن",
    lesson: 34,
    pos: "v.",
    lessonLabel: "درس 34 — فعل + شکل -ing یا مصدر"
  },
  {
    word: "feel like (infml)",
    meaning: "میل داشتن (غیررسمی)",
    lesson: 34,
    pos: "phr.",
    lessonLabel: "درس 34 — فعل + شکل -ing یا مصدر"
  },
  {
    word: "(don't) mind",
    meaning: "(ناراحت نبودن) اهمیت دادن",
    lesson: 34,
    pos: "v.",
    lessonLabel: "درس 34 — فعل + شکل -ing یا مصدر"
  },
  {
    word: "can't stand",
    meaning: "نمی‌توانید تحمل کردن",
    lesson: 34,
    pos: "phr.",
    lessonLabel: "درس 34 — فعل + شکل -ing یا مصدر"
  },
  {
    word: "give up",
    meaning: "ترک کردن، دست کشیدن",
    lesson: 34,
    pos: "phr.",
    lessonLabel: "درس 34 — فعل + شکل -ing یا مصدر"
  },
  {
    word: "deny",
    meaning: "انکار کردن",
    lesson: 34,
    pos: "v.",
    lessonLabel: "درس 34 — فعل + شکل -ing یا مصدر"
  },
  {
    word: "decide",
    meaning: "تصمیم گرفتن",
    lesson: 34,
    pos: "v.",
    lessonLabel: "درس 34 — فعل + شکل -ing یا مصدر"
  },
  {
    word: "want",
    meaning: "خواستن",
    lesson: 34,
    pos: "v.",
    lessonLabel: "درس 34 — فعل + شکل -ing یا مصدر"
  },
  {
    word: "seem",
    meaning: "به نظر رسیدن",
    lesson: 34,
    pos: "v.",
    lessonLabel: "درس 34 — فعل + شکل -ing یا مصدر"
  },
  {
    word: "appear",
    meaning: "به نظر آمدن",
    lesson: 34,
    pos: "v.",
    lessonLabel: "درس 34 — فعل + شکل -ing یا مصدر"
  },
  {
    word: "hope",
    meaning: "امیدوار بودن",
    lesson: 34,
    pos: "v.",
    lessonLabel: "درس 34 — فعل + شکل -ing یا مصدر"
  },
  {
    word: "forget",
    meaning: "فراموش کردن",
    lesson: 34,
    pos: "v.",
    lessonLabel: "درس 34 — فعل + شکل -ing یا مصدر"
  },
  {
    word: "expect",
    meaning: "انتظار داشتن",
    lesson: 34,
    pos: "v.",
    lessonLabel: "درس 34 — فعل + شکل -ing یا مصدر"
  },
  {
    word: "mean",
    meaning: "قصد داشتن",
    lesson: 34,
    pos: "v.",
    lessonLabel: "درس 34 — فعل + شکل -ing یا مصدر"
  },
  {
    word: "manage",
    meaning: "توانستن، موفق شدن",
    lesson: 34,
    pos: "v.",
    lessonLabel: "درس 34 — فعل + شکل -ing یا مصدر"
  },
  {
    word: "refuse",
    meaning: "امتناع کردن، رد کردن",
    lesson: 34,
    pos: "v.",
    lessonLabel: "درس 34 — فعل + شکل -ing یا مصدر"
  },
  {
    word: "promise",
    meaning: "قول دادن",
    lesson: 34,
    pos: "v.",
    lessonLabel: "درس 34 — فعل + شکل -ing یا مصدر"
  },
  {
    word: "offer",
    meaning: "پیشنهاد کردن",
    lesson: 34,
    pos: "v.",
    lessonLabel: "درس 34 — فعل + شکل -ing یا مصدر"
  },
  {
    word: "love",
    meaning: "عاشق بودن، دوست داشتن",
    lesson: 34,
    pos: "v.",
    lessonLabel: "درس 34 — فعل + شکل -ing یا مصدر"
  },
  {
    word: "like",
    meaning: "دوست داشتن",
    lesson: 34,
    pos: "v.",
    lessonLabel: "درس 34 — فعل + شکل -ing یا مصدر"
  },
  {
    word: "prefer",
    meaning: "ترجیح دادن",
    lesson: 34,
    pos: "v.",
    lessonLabel: "درس 34 — فعل + شکل -ing یا مصدر"
  },
  {
    word: "remember",
    meaning: "به یاد داشتن، یادآوری کردن",
    lesson: 34,
    pos: "v.",
    lessonLabel: "درس 34 — فعل + شکل -ing یا مصدر"
  },
  {
    word: "make someone do something",
    meaning: "کسی را وادار به کاری کردن",
    lesson: 34,
    pos: "phr.",
    lessonLabel: "درس 34 — فعل + شکل -ing یا مصدر"
  },
  {
    word: "let someone do something",
    meaning: "گذاشتن که کسی کاری بکند",
    lesson: 34,
    pos: "phr.",
    lessonLabel: "درس 34 — فعل + شکل -ing یا مصدر"
  },
  {
    word: "discuss (= talked about)",
    meaning: "بحث کردن (دربارهٔ چیزی حرف زدن)",
    lesson: 35,
    pos: "v.",
    lessonLabel: "درس 35 — الگوهای فعلی"
  },
  {
    word: "answer",
    meaning: "جواب دادن",
    lesson: 35,
    pos: "v.",
    lessonLabel: "درس 35 — الگوهای فعلی"
  },
  {
    word: "explain",
    meaning: "توضیح دادن",
    lesson: 35,
    pos: "v.",
    lessonLabel: "درس 35 — الگوهای فعلی"
  },
  {
    word: "tell",
    meaning: "گفتن (به کسی)",
    lesson: 35,
    pos: "v.",
    lessonLabel: "درس 35 — الگوهای فعلی"
  },
  {
    word: "ask",
    meaning: "پرسیدن؛ از کسی خواستن",
    lesson: 35,
    pos: "v.",
    lessonLabel: "درس 35 — الگوهای فعلی"
  },
  {
    word: "show",
    meaning: "نشان دادن",
    lesson: 35,
    pos: "v.",
    lessonLabel: "درس 35 — الگوهای فعلی"
  },
  {
    word: "advise",
    meaning: "توصیه کردن",
    lesson: 35,
    pos: "v.",
    lessonLabel: "درس 35 — الگوهای فعلی"
  },
  {
    word: "want",
    meaning: "خواستن",
    lesson: 35,
    pos: "v.",
    lessonLabel: "درس 35 — الگوهای فعلی"
  },
  {
    word: "persuade (= make somebody change their mind/opinion)",
    meaning: "قانع کردن (سبب تغییر نظر کسی شدن)",
    lesson: 35,
    pos: "v.",
    lessonLabel: "درس 35 — الگوهای فعلی"
  },
  {
    word: "warn (= tell someone of a possible danger, and often tell them what they should(n't) do)",
    meaning: "هشدار دادن (خطر احتمالی را به کسی گفتن)",
    lesson: 35,
    pos: "v.",
    lessonLabel: "درس 35 — الگوهای فعلی"
  },
  {
    word: "be careful (= think/pay attention)",
    meaning: "مراقب بودن",
    lesson: 35,
    pos: "phr.",
    lessonLabel: "درس 35 — الگوهای فعلی"
  },
  {
    word: "say",
    meaning: "گفتن",
    lesson: 35,
    pos: "v.",
    lessonLabel: "درس 35 — الگوهای فعلی"
  },
  {
    word: "suggest",
    meaning: "پیشنهاد کردن",
    lesson: 35,
    pos: "v.",
    lessonLabel: "درس 35 — الگوهای فعلی"
  },
  {
    word: "mention (= say or write a fact or piece of information)",
    meaning: "اشاره کردن (گفتن یا نوشتن یک واقعیت/اطلاع)",
    lesson: 35,
    pos: "v.",
    lessonLabel: "درس 35 — الگوهای فعلی"
  },
  {
    word: "blame",
    meaning: "مقصر دانستن؛ گردن زدن",
    lesson: 35,
    pos: "v.",
    lessonLabel: "درس 35 — الگوهای فعلی"
  },
  {
    word: "complain (to)(about)",
    meaning: "شکایت کردن (از)(دربارهٔ)",
    lesson: 35,
    pos: "v.",
    lessonLabel: "درس 35 — الگوهای فعلی"
  },
  {
    word: "apologise (for)",
    meaning: "عذرخواهی کردن (بابت)",
    lesson: 35,
    pos: "v.",
    lessonLabel: "درس 35 — الگوهای فعلی"
  },
  {
    word: "terrible",
    meaning: "افتضاح",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — صفت‌ها"
  },
  {
    word: "awful",
    meaning: "وحشتناک",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — صفت‌ها"
  },
  {
    word: "dreadful",
    meaning: "فجیع",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — صفت‌ها"
  },
  {
    word: "(very) bad",
    meaning: "(خیلی) بد",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — صفت‌ها"
  },
  {
    word: "OK",
    meaning: "قابل قبول",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — صفت‌ها"
  },
  {
    word: "(very) good",
    meaning: "(خیلی) خوب",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — صفت‌ها"
  },
  {
    word: "marvellous",
    meaning: "شگفت‌انگیز",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — صفت‌ها"
  },
  {
    word: "terrific",
    meaning: "فوق‌العاده",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — صفت‌ها"
  },
  {
    word: "great",
    meaning: "عالی",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — صفت‌ها"
  },
  {
    word: "(very) small",
    meaning: "(خیلی) کوچک",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — صفت‌ها"
  },
  {
    word: "(absolutely) tiny",
    meaning: "(کاملاً) ریز",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — صفت‌ها"
  },
  {
    word: "big",
    meaning: "بزرگ",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — صفت‌ها"
  },
  {
    word: "huge/enormous",
    meaning: "عظیم/بزرگ",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — صفت‌ها"
  },
  {
    word: "tired",
    meaning: "خسته",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — صفت‌ها"
  },
  {
    word: "exhausted",
    meaning: "از پا افتاده",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — صفت‌ها"
  },
  {
    word: "interesting",
    meaning: "جالب",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — صفت‌ها"
  },
  {
    word: "fascinating",
    meaning: "فریبنده/بسیار جالب",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — صفت‌ها"
  },
  {
    word: "surprised",
    meaning: "متعجب",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — صفت‌ها"
  },
  {
    word: "astonished",
    meaning: "حیرت‌زده",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — صفت‌ها"
  },
  {
    word: "(very) pleased",
    meaning: "(خیلی) خشنود",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — صفت‌ها"
  },
  {
    word: "(absolutely) delighted",
    meaning: "(کاملاً) خوشحال",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — صفت‌ها"
  },
  {
    word: "cold",
    meaning: "سرد",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — صفت‌ها"
  },
  {
    word: "freezing",
    meaning: "یخ‌زده/خیلی سرد",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — صفت‌ها"
  },
  {
    word: "nice",
    meaning: "خوشمزه/خوب",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — صفت‌ها"
  },
  {
    word: "delicious (food only)",
    meaning: "خوشمزه (فقط غذا)",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — صفت‌ها"
  },
  {
    word: "frightened (= afraid of)",
    meaning: "ترسیده",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — صفت‌ها"
  },
  {
    word: "terrified",
    meaning: "وحشت‌زده",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — صفت‌ها"
  },
  {
    word: "hungry",
    meaning: "گرسنه",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — صفت‌ها"
  },
  {
    word: "starving (infml)",
    meaning: "در حال مردن از گرسنگی (خودمانی)",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — صفت‌ها"
  },
  {
    word: "boring",
    meaning: "کسل‌کننده",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — صفت‌ها"
  },
  {
    word: "bored",
    meaning: "کسل‌شده",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — صفت‌ها"
  },
  {
    word: "depressing",
    meaning: "افسرده‌کننده",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — صفت‌ها"
  },
  {
    word: "depressed",
    meaning: "افسرده",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — صفت‌ها"
  },
  {
    word: "surprising/ed",
    meaning: "تعجب‌آور/متعجب",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — صفت‌ها"
  },
  {
    word: "tiring/ed",
    meaning: "خسته‌کننده/خسته",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — صفت‌ها"
  },
  {
    word: "interesting/ed",
    meaning: "جالب/مشتاق و مشغول",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — صفت‌ها"
  },
  {
    word: "frightening/ed",
    meaning: "ترس‌آور/ترسیده",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — صفت‌ها"
  },
  {
    word: "confusing/ed",
    meaning: "گیج‌کننده/گیج",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — صفت‌ها"
  },
  {
    word: "embarrassing/ed",
    meaning: "خجالت‌آور/خجالت‌زده",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — صفت‌ها"
  },
  {
    word: "astonishing/ed",
    meaning: "حیرت‌آور/حیرت‌زده",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — صفت‌ها"
  },
  {
    word: "exhausting/ed",
    meaning: "فرساینده/از پا افتاده",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — صفت‌ها"
  },
  {
    word: "fascinating/ed",
    meaning: "بسیار جالب/مسحور",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — صفت‌ها"
  },
  {
    word: "terrifying/ed",
    meaning: "وحشتناک/وحشت‌زده",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — صفت‌ها"
  },
  {
    word: "exciting/ed",
    meaning: "هیجان‌انگیز/هیجان‌زده",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — صفت‌ها"
  },
  {
    word: "disappointing/ed",
    meaning: "ناامیدکننده/ناامید",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — صفت‌ها"
  },
  {
    word: "at a point/place",
    meaning: "در یک نقطه/مکان",
    lesson: 37,
    pos: "phr.",
    lessonLabel: "درس 37 — حروف اضافه: مکان"
  },
  {
    word: "on a surface",
    meaning: "روی یک سطح",
    lesson: 37,
    pos: "phr.",
    lessonLabel: "درس 37 — حروف اضافه: مکان"
  },
  {
    word: "in an area or space",
    meaning: "در یک ناحیه یا فضا",
    lesson: 37,
    pos: "phr.",
    lessonLabel: "درس 37 — حروف اضافه: مکان"
  },
  {
    word: "up",
    meaning: "بالا",
    lesson: 37,
    pos: "phr.",
    lessonLabel: "درس 37 — حروف اضافه: مکان"
  },
  {
    word: "down",
    meaning: "پایین",
    lesson: 37,
    pos: "phr.",
    lessonLabel: "درس 37 — حروف اضافه: مکان"
  },
  {
    word: "into",
    meaning: "به داخل",
    lesson: 37,
    pos: "phr.",
    lessonLabel: "درس 37 — حروف اضافه: مکان"
  },
  {
    word: "out of",
    meaning: "به بیرون از",
    lesson: 37,
    pos: "phr.",
    lessonLabel: "درس 37 — حروف اضافه: مکان"
  },
  {
    word: "over/above",
    meaning: "بالای/فراز",
    lesson: 37,
    pos: "phr.",
    lessonLabel: "درس 37 — حروف اضافه: مکان"
  },
  {
    word: "under/below",
    meaning: "زیر/پایین‌تر از",
    lesson: 37,
    pos: "phr.",
    lessonLabel: "درس 37 — حروف اضافه: مکان"
  },
  {
    word: "in front of",
    meaning: "جلوی",
    lesson: 37,
    pos: "phr.",
    lessonLabel: "درس 37 — حروف اضافه: مکان"
  },
  {
    word: "behind",
    meaning: "پشت",
    lesson: 37,
    pos: "phr.",
    lessonLabel: "درس 37 — حروف اضافه: مکان"
  },
  {
    word: "along",
    meaning: "در امتداد",
    lesson: 37,
    pos: "phr.",
    lessonLabel: "درس 37 — حروف اضافه: مکان"
  },
  {
    word: "round",
    meaning: "دور",
    lesson: 37,
    pos: "phr.",
    lessonLabel: "درس 37 — حروف اضافه: مکان"
  },
  {
    word: "past",
    meaning: "از کنارِ، گذشته از",
    lesson: 37,
    pos: "phr.",
    lessonLabel: "درس 37 — حروف اضافه: مکان"
  },
  {
    word: "through",
    meaning: "از میان",
    lesson: 37,
    pos: "phr.",
    lessonLabel: "درس 37 — حروف اضافه: مکان"
  },
  {
    word: "over",
    meaning: "از روی (پل)",
    lesson: 37,
    pos: "phr.",
    lessonLabel: "درس 37 — حروف اضافه: مکان"
  },
  {
    word: "next to",
    meaning: "کنارِ",
    lesson: 37,
    pos: "phr.",
    lessonLabel: "درس 37 — حروف اضافه: مکان"
  },
  {
    word: "opposite",
    meaning: "روبروی",
    lesson: 37,
    pos: "phr.",
    lessonLabel: "درس 37 — حروف اضافه: مکان"
  },
  {
    word: "between",
    meaning: "بین",
    lesson: 37,
    pos: "phr.",
    lessonLabel: "درس 37 — حروف اضافه: مکان"
  },
  {
    word: "near",
    meaning: "نزدیک",
    lesson: 37,
    pos: "phr.",
    lessonLabel: "درس 37 — حروف اضافه: مکان"
  },
  {
    word: "across",
    meaning: "از عرضِ، آن‌طرف",
    lesson: 37,
    pos: "phr.",
    lessonLabel: "درس 37 — حروف اضافه: مکان"
  },
  {
    word: "towards",
    meaning: "به سمت",
    lesson: 37,
    pos: "phr.",
    lessonLabel: "درس 37 — حروف اضافه: مکان"
  },
  {
    word: "always",
    meaning: "همیشه",
    lesson: 38,
    pos: "adv.",
    lessonLabel: "درس 38 — قیدها: تکرار و درجه"
  },
  {
    word: "often",
    meaning: "اغلب",
    lesson: 38,
    pos: "adv.",
    lessonLabel: "درس 38 — قیدها: تکرار و درجه"
  },
  {
    word: "frequently",
    meaning: "مکرر، به‌طور مکرر",
    lesson: 38,
    pos: "adv.",
    lessonLabel: "درس 38 — قیدها: تکرار و درجه"
  },
  {
    word: "quite often",
    meaning: "نسبتاً اغلب",
    lesson: 38,
    pos: "adv.",
    lessonLabel: "درس 38 — قیدها: تکرار و درجه"
  },
  {
    word: "sometimes",
    meaning: "گاهی اوقات",
    lesson: 38,
    pos: "adv.",
    lessonLabel: "درس 38 — قیدها: تکرار و درجه"
  },
  {
    word: "occasionally",
    meaning: "گهگاه، بعضی مواقع",
    lesson: 38,
    pos: "adv.",
    lessonLabel: "درس 38 — قیدها: تکرار و درجه"
  },
  {
    word: "seldom",
    meaning: "به‌ندرت",
    lesson: 38,
    pos: "adv.",
    lessonLabel: "درس 38 — قیدها: تکرار و درجه"
  },
  {
    word: "hardly ever",
    meaning: "تقریباً هرگز",
    lesson: 38,
    pos: "adv.",
    lessonLabel: "درس 38 — قیدها: تکرار و درجه"
  },
  {
    word: "rarely",
    meaning: "به‌ندرت",
    lesson: 38,
    pos: "adv.",
    lessonLabel: "درس 38 — قیدها: تکرار و درجه"
  },
  {
    word: "never",
    meaning: "هرگز",
    lesson: 38,
    pos: "adv.",
    lessonLabel: "درس 38 — قیدها: تکرار و درجه"
  },
  {
    word: "a bit",
    meaning: "کمی (کمتر از quite)",
    lesson: 38,
    pos: "adv.",
    lessonLabel: "درس 38 — قیدها: تکرار و درجه"
  },
  {
    word: "slightly",
    meaning: "کمی، اندکی",
    lesson: 38,
    pos: "adv.",
    lessonLabel: "درس 38 — قیدها: تکرار و درجه"
  },
  {
    word: "quite",
    meaning: "نسبتاً، کاملاً (کمتر از very)",
    lesson: 38,
    pos: "adv.",
    lessonLabel: "درس 38 — قیدها: تکرار و درجه"
  },
  {
    word: "fairly",
    meaning: "نسبتاً",
    lesson: 38,
    pos: "adv.",
    lessonLabel: "درس 38 — قیدها: تکرار و درجه"
  },
  {
    word: "rather",
    meaning: "نسبتاً (اغلب برای تعجب مثبت)",
    lesson: 38,
    pos: "adv.",
    lessonLabel: "درس 38 — قیدها: تکرار و درجه"
  },
  {
    word: "pretty",
    meaning: "نسبتاً (غیررسمی)",
    lesson: 38,
    pos: "adv.",
    lessonLabel: "درس 38 — قیدها: تکرار و درجه"
  },
  {
    word: "very",
    meaning: "خیلی",
    lesson: 38,
    pos: "adv.",
    lessonLabel: "درس 38 — قیدها: تکرار و درجه"
  },
  {
    word: "extremely",
    meaning: "بسیار، فوق‌العاده",
    lesson: 38,
    pos: "adv.",
    lessonLabel: "درس 38 — قیدها: تکرار و درجه"
  },
  {
    word: "incredibly",
    meaning: "باورنکردنی، شدیداً",
    lesson: 38,
    pos: "adv.",
    lessonLabel: "درس 38 — قیدها: تکرار و درجه"
  },
  {
    word: "really",
    meaning: "واقعاً",
    lesson: 38,
    pos: "adv.",
    lessonLabel: "درس 38 — قیدها: تکرار و درجه"
  },
  {
    word: "almost",
    meaning: "تقریباً",
    lesson: 38,
    pos: "adv.",
    lessonLabel: "درس 38 — قیدها: تکرار و درجه"
  },
  {
    word: "nearly",
    meaning: "تقریباً",
    lesson: 38,
    pos: "adv.",
    lessonLabel: "درس 38 — قیدها: تکرار و درجه"
  },
  {
    word: "hardly",
    meaning: "به‌سختی، تقریباً هیچ",
    lesson: 38,
    pos: "adv.",
    lessonLabel: "درس 38 — قیدها: تکرار و درجه"
  },
  {
    word: "when",
    meaning: "وقتی که",
    lesson: 39,
    lessonLabel: "درس 39 — زمان و توالی"
  },
  {
    word: "as soon as",
    meaning: "به محض اینکه",
    lesson: 39,
    lessonLabel: "درس 39 — زمان و توالی"
  },
  {
    word: "while",
    meaning: "در حالی که",
    lesson: 39,
    lessonLabel: "درس 39 — زمان و توالی"
  },
  {
    word: "just as",
    meaning: "دقیقاً وقتی که",
    lesson: 39,
    lessonLabel: "درس 39 — زمان و توالی"
  },
  {
    word: "then",
    meaning: "سپس",
    lesson: 39,
    pos: "adv.",
    lessonLabel: "درس 39 — زمان و توالی"
  },
  {
    word: "afterwards",
    meaning: "بعد از آن",
    lesson: 39,
    pos: "adv.",
    lessonLabel: "درس 39 — زمان و توالی"
  },
  {
    word: "after that",
    meaning: "بعد از آن",
    lesson: 39,
    lessonLabel: "درس 39 — زمان و توالی"
  },
  {
    word: "before",
    meaning: "قبل از اینکه",
    lesson: 39,
    lessonLabel: "درس 39 — زمان و توالی"
  },
  {
    word: "after",
    meaning: "بعد از اینکه",
    lesson: 39,
    lessonLabel: "درس 39 — زمان و توالی"
  },
  {
    word: "first of all",
    meaning: "ابتدا",
    lesson: 39,
    lessonLabel: "درس 39 — زمان و توالی"
  },
  {
    word: "finally",
    meaning: "در نهایت",
    lesson: 39,
    pos: "adv.",
    lessonLabel: "درس 39 — زمان و توالی"
  },
  {
    word: "eventually",
    meaning: "سرانجام",
    lesson: 39,
    pos: "adv.",
    lessonLabel: "درس 39 — زمان و توالی"
  },
  {
    word: "in the end",
    meaning: "در پایان",
    lesson: 39,
    lessonLabel: "درس 39 — زمان و توالی"
  },
  {
    word: "first(ly)",
    meaning: "اول، نخست",
    lesson: 39,
    pos: "adv.",
    lessonLabel: "درس 39 — زمان و توالی"
  },
  {
    word: "second(ly)",
    meaning: "دوم",
    lesson: 39,
    pos: "adv.",
    lessonLabel: "درس 39 — زمان و توالی"
  },
  {
    word: "third(ly)",
    meaning: "سوم",
    lesson: 39,
    pos: "adv.",
    lessonLabel: "درس 39 — زمان و توالی"
  },
  {
    word: "for one thing",
    meaning: "یک دلیلش این است",
    lesson: 39,
    lessonLabel: "درس 39 — زمان و توالی"
  },
  {
    word: "and for another (thing)",
    meaning: "و دلیل دیگرش این است",
    lesson: 39,
    lessonLabel: "درس 39 — زمان و توالی"
  },
  {
    word: "anyway",
    meaning: "به هر حال",
    lesson: 39,
    pos: "adv.",
    lessonLabel: "درس 39 — زمان و توالی"
  },
  {
    word: "also",
    meaning: "همچنین",
    lesson: 40,
    pos: "adv.",
    lessonLabel: "درس 40 — افزودن و تقابل"
  },
  {
    word: "as well",
    meaning: "همچنین / هم",
    lesson: 40,
    pos: "phr.",
    lessonLabel: "درس 40 — افزودن و تقابل"
  },
  {
    word: "in addition",
    meaning: "علاوه بر این",
    lesson: 40,
    pos: "phr.",
    lessonLabel: "درس 40 — افزودن و تقابل"
  },
  {
    word: "what's more",
    meaning: "بدان افزونه که / علاوه بر این",
    lesson: 40,
    pos: "phr.",
    lessonLabel: "درس 40 — افزودن و تقابل"
  },
  {
    word: "although",
    meaning: "اگرچه",
    lesson: 40,
    pos: "phr.",
    lessonLabel: "درس 40 — افزودن و تقابل"
  },
  {
    word: "though",
    meaning: "اگرچه / ولی",
    lesson: 40,
    pos: "phr.",
    lessonLabel: "درس 40 — افزودن و تقابل"
  },
  {
    word: "despite",
    meaning: "با وجودِ",
    lesson: 40,
    pos: "phr.",
    lessonLabel: "درس 40 — افزودن و تقابل"
  },
  {
    word: "in spite of",
    meaning: "با وجودِ",
    lesson: 40,
    pos: "phr.",
    lessonLabel: "درس 40 — افزودن و تقابل"
  },
  {
    word: "despite the fact that",
    meaning: "با وجود اینکه",
    lesson: 40,
    pos: "phr.",
    lessonLabel: "درس 40 — افزودن و تقابل"
  },
  {
    word: "however",
    meaning: "با این حال",
    lesson: 40,
    pos: "adv.",
    lessonLabel: "درس 40 — افزودن و تقابل"
  },
  {
    word: "whereas",
    meaning: "در حالی که",
    lesson: 40,
    pos: "phr.",
    lessonLabel: "درس 40 — افزودن و تقابل"
  },
  {
    word: "but",
    meaning: "اما",
    lesson: 40,
    pos: "phr.",
    lessonLabel: "درس 40 — افزودن و تقابل"
  },
  {
    word: "still",
    meaning: "هنوز / با این حال",
    lesson: 40,
    pos: "adv.",
    lessonLabel: "درس 40 — افزودن و تقابل"
  },
  {
    word: "link words",
    meaning: "واژه‌های ربط‌دهنده",
    lesson: 40,
    lessonLabel: "درس 40 — افزودن و تقابل"
  }
];

export const VOCAB_PART_2: Row[] = ROWS;
