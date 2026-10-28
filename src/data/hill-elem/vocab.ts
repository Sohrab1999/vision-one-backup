// واژگان داستان‌های Elementary Steps to Understanding — کلیدواژه‌های هر داستان با معنی فارسی
// lesson = شمارهٔ داستان (۱ تا 27)
import type { VocabEntry, VocabWord } from "../types";

type Row = Omit<VocabWord, "lesson"> & { lesson: number; lessonLabel: string };

const ROWS: Row[] = [
  {
    "word": "worked",
    "meaning": "کار می‌کرد",
    "lesson": 1,
    "pos": "v.",
    "lessonLabel": "داستان ۱"
  },
  {
    "word": "factory",
    "meaning": "کارخانه",
    "lesson": 1,
    "pos": "n.",
    "lessonLabel": "داستان ۱"
  },
  {
    "word": "sandwiches",
    "meaning": "ساندویچ‌ها",
    "lesson": 1,
    "pos": "n.",
    "lessonLabel": "داستان ۱"
  },
  {
    "word": "married",
    "meaning": "ازدواج کرد",
    "lesson": 1,
    "pos": "v.",
    "lessonLabel": "داستان ۱"
  },
  {
    "word": "slices of bread",
    "meaning": "برش‌های نان",
    "lesson": 1,
    "pos": "n.",
    "lessonLabel": "داستان ۱"
  },
  {
    "word": "loaf of bread",
    "meaning": "یک نان کامل",
    "lesson": 1,
    "pos": "n.",
    "lessonLabel": "داستان ۱"
  },
  {
    "word": "cut it in half",
    "meaning": "آن را نصف کردن",
    "lesson": 1,
    "pos": "phr.",
    "lessonLabel": "داستان ۱"
  },
  {
    "word": "piece of meat",
    "meaning": "تکه گوشت",
    "lesson": 1,
    "pos": "n.",
    "lessonLabel": "داستان ۱"
  },
  {
    "word": "enough",
    "meaning": "کافی",
    "lesson": 1,
    "pos": "adj.",
    "lessonLabel": "داستان ۱"
  },
  {
    "word": "weren't",
    "meaning": "نبودند",
    "lesson": 1,
    "pos": "v.",
    "lessonLabel": "داستان ۱"
  },
  {
    "word": "weren't enough",
    "meaning": "کافی نبودند",
    "lesson": 1,
    "pos": "phr.",
    "lessonLabel": "داستان ۱"
  },
  {
    "word": "weren't enough for him",
    "meaning": "بر او کافی نبودند",
    "lesson": 1,
    "pos": "phr.",
    "lessonLabel": "داستان ۱"
  },
  {
    "word": "weren't enough for him either",
    "meaning": "بر او هم کافی نبودند",
    "lesson": 1,
    "pos": "phr.",
    "lessonLabel": "داستان ۱"
  },
  {
    "word": "traffic-lights",
    "meaning": "چراغ‌های راهنمایی و رانندگی",
    "lesson": 2,
    "pos": "n.",
    "lessonLabel": "داستان ۲"
  },
  {
    "word": "hit",
    "meaning": "برخورد کردن",
    "lesson": 2,
    "pos": "v.",
    "lessonLabel": "داستان ۲"
  },
  {
    "word": "jumped out",
    "meaning": "پیاده شدن سریع",
    "lesson": 2,
    "pos": "phr.",
    "lessonLabel": "داستان ۲"
  },
  {
    "word": "frightened",
    "meaning": "ترسیده",
    "lesson": 2,
    "pos": "adj.",
    "lessonLabel": "داستان ۲"
  },
  {
    "word": "nearly",
    "meaning": "تقریباً",
    "lesson": 2,
    "pos": "adv.",
    "lessonLabel": "داستان ۲"
  },
  {
    "word": "killed",
    "meaning": "کشتن",
    "lesson": 2,
    "pos": "v.",
    "lessonLabel": "داستان ۲"
  },
  {
    "word": "sorry",
    "meaning": "متاسف",
    "lesson": 2,
    "pos": "adj.",
    "lessonLabel": "داستان ۲"
  },
  {
    "word": "bottle",
    "meaning": "بطری",
    "lesson": 2,
    "pos": "n.",
    "lessonLabel": "داستان ۲"
  },
  {
    "word": "whisky",
    "meaning": "ویسکی",
    "lesson": 2,
    "pos": "n.",
    "lessonLabel": "داستان ۲"
  },
  {
    "word": "drank",
    "meaning": "نوشید",
    "lesson": 2,
    "pos": "v.",
    "lessonLabel": "داستان ۲"
  },
  {
    "word": "smiled",
    "meaning": "لبخند زد",
    "lesson": 2,
    "pos": "v.",
    "lessonLabel": "داستان ۲"
  },
  {
    "word": "police",
    "meaning": "پلیس",
    "lesson": 2,
    "pos": "n.",
    "lessonLabel": "داستان ۲"
  },
  {
    "word": "rather big",
    "meaning": "نسبتاً بزرگ",
    "lesson": 3,
    "pos": "adj.",
    "lessonLabel": "داستان ۳"
  },
  {
    "word": "furniture",
    "meaning": "مبلمان",
    "lesson": 3,
    "pos": "n.",
    "lessonLabel": "داستان ۳"
  },
  {
    "word": "truck",
    "meaning": "کامیون",
    "lesson": 3,
    "pos": "n.",
    "lessonLabel": "داستان ۳"
  },
  {
    "word": "break",
    "meaning": "شکستن",
    "lesson": 3,
    "pos": "v.",
    "lessonLabel": "داستان ۳"
  },
  {
    "word": "mending",
    "meaning": "تعمیر کردن",
    "lesson": 3,
    "pos": "n.",
    "lessonLabel": "داستان ۳"
  },
  {
    "word": "expensive",
    "meaning": "گران",
    "lesson": 3,
    "pos": "adj.",
    "lessonLabel": "داستان ۳"
  },
  {
    "word": "carry",
    "meaning": "برداشتن و حمل کردن",
    "lesson": 3,
    "pos": "v.",
    "lessonLabel": "داستان ۳"
  },
  {
    "word": "heavy",
    "meaning": "سنگین",
    "lesson": 3,
    "pos": "adj.",
    "lessonLabel": "داستان ۳"
  },
  {
    "word": "have a rest",
    "meaning": "استراحت کردن",
    "lesson": 3,
    "pos": "phr.",
    "lessonLabel": "داستان ۳"
  },
  {
    "word": "stupid",
    "meaning": "احمق",
    "lesson": 3,
    "pos": "adj.",
    "lessonLabel": "داستان ۳"
  },
  {
    "word": "buy a watch",
    "meaning": "خریدن ساعت مچی",
    "lesson": 3,
    "pos": "phr.",
    "lessonLabel": "داستان ۳"
  },
  {
    "word": "everybody else",
    "meaning": "همه بقیه",
    "lesson": 3,
    "pos": "phr.",
    "lessonLabel": "داستان ۳"
  },
  {
    "word": "soldiers",
    "meaning": "سربازها",
    "lesson": 4,
    "pos": "n.",
    "lessonLabel": "داستان ۴"
  },
  {
    "word": "camp",
    "meaning": "اردوگاه",
    "lesson": 4,
    "pos": "n.",
    "lessonLabel": "داستان ۴"
  },
  {
    "word": "piece of paper",
    "meaning": "برگ کاغذ",
    "lesson": 4,
    "pos": "phr.",
    "lessonLabel": "داستان ۴"
  },
  {
    "word": "envelope",
    "meaning": "پاکت",
    "lesson": 4,
    "pos": "n.",
    "lessonLabel": "داستان ۴"
  },
  {
    "word": "pen",
    "meaning": "خودکار",
    "lesson": 4,
    "pos": "n.",
    "lessonLabel": "داستان ۴"
  },
  {
    "word": "stamp",
    "meaning": "تمبر",
    "lesson": 4,
    "pos": "n.",
    "lessonLabel": "داستان ۴"
  },
  {
    "word": "letter",
    "meaning": "نامه",
    "lesson": 4,
    "pos": "n.",
    "lessonLabel": "داستان ۴"
  },
  {
    "word": "office",
    "meaning": "اداره",
    "lesson": 4,
    "pos": "n.",
    "lessonLabel": "داستان ۴"
  },
  {
    "word": "address",
    "meaning": "آدرس",
    "lesson": 4,
    "pos": "n.",
    "lessonLabel": "داستان ۴"
  },
  {
    "word": "girl-friend",
    "meaning": "دوست‌دختر",
    "lesson": 4,
    "pos": "n.",
    "lessonLabel": "داستان ۴"
  },
  {
    "word": "put in",
    "meaning": "گذاشتن در",
    "lesson": 4,
    "pos": "phr.",
    "lessonLabel": "داستان ۴"
  },
  {
    "word": "got up",
    "meaning": "بلند شدن",
    "lesson": 4,
    "pos": "phr.",
    "lessonLabel": "داستان ۴"
  },
  {
    "word": "stopped",
    "meaning": "قطع کردن",
    "lesson": 4,
    "pos": "v.",
    "lessonLabel": "داستان ۴"
  },
  {
    "word": "looked at",
    "meaning": "نگاه کردن به",
    "lesson": 4,
    "pos": "phr.",
    "lessonLabel": "داستان ۴"
  },
  {
    "word": "General Pershing",
    "meaning": "ژنرال پرسینگ",
    "lesson": 5,
    "pos": "n.",
    "lessonLabel": "داستان ۵"
  },
  {
    "word": "famous",
    "meaning": "مشهور",
    "lesson": 5,
    "pos": "adj.",
    "lessonLabel": "داستان ۵"
  },
  {
    "word": "officer",
    "meaning": "افسر",
    "lesson": 5,
    "pos": "n.",
    "lessonLabel": "داستان ۵"
  },
  {
    "word": "army",
    "meaning": "ارتش",
    "lesson": 5,
    "pos": "n.",
    "lessonLabel": "داستان ۵"
  },
  {
    "word": "fought",
    "meaning": "جنگید",
    "lesson": 5,
    "pos": "v.",
    "lessonLabel": "داستان ۵"
  },
  {
    "word": "statue",
    "meaning": "مجسمه",
    "lesson": 5,
    "pos": "n.",
    "lessonLabel": "داستان ۵"
  },
  {
    "word": "hometown",
    "meaning": "شهر زادگاه",
    "lesson": 5,
    "pos": "n.",
    "lessonLabel": "داستان ۵"
  },
  {
    "word": "remember",
    "meaning": "به خاطر سپردن",
    "lesson": 5,
    "pos": "v.",
    "lessonLabel": "داستان ۵"
  },
  {
    "word": "passed",
    "meaning": "رد شدن",
    "lesson": 5,
    "pos": "v.",
    "lessonLabel": "داستان ۵"
  },
  {
    "word": "whenever",
    "meaning": "هر زمان که",
    "lesson": 5,
    "pos": "adv.",
    "lessonLabel": "داستان ۵"
  },
  {
    "word": "smallest",
    "meaning": "کوچک‌ترین",
    "lesson": 5,
    "pos": "adj.",
    "lessonLabel": "داستان ۵"
  },
  {
    "word": "funny man",
    "meaning": "مرد خنده‌دار",
    "lesson": 5,
    "pos": "n.",
    "lessonLabel": "داستان ۵"
  },
  {
    "word": "on his back",
    "meaning": "روی پشتی‌اش",
    "lesson": 5,
    "pos": "phr.",
    "lessonLabel": "داستان ۵"
  },
  {
    "word": "Ma",
    "meaning": "مامان",
    "lesson": 5,
    "pos": "n.",
    "lessonLabel": "داستان ۵"
  },
  {
    "word": "boss",
    "meaning": "سرپرست، مدیر",
    "lesson": 6,
    "pos": "n.",
    "lessonLabel": "داستان ۶"
  },
  {
    "word": "station",
    "meaning": "ایستگاه",
    "lesson": 6,
    "pos": "n.",
    "lessonLabel": "داستان ۶"
  },
  {
    "word": "thought",
    "meaning": "فکر کرد",
    "lesson": 6,
    "pos": "v.",
    "lessonLabel": "داستان ۶"
  },
  {
    "word": "was still looking",
    "meaning": "هنوز در حال جستجو بود",
    "lesson": 6,
    "pos": "phr.",
    "lessonLabel": "داستان ۶"
  },
  {
    "word": "asked",
    "meaning": "پرسید",
    "lesson": 6,
    "pos": "v.",
    "lessonLabel": "داستان ۶"
  },
  {
    "word": "lady",
    "meaning": "خانم",
    "lesson": 6,
    "pos": "n.",
    "lessonLabel": "داستان ۶"
  },
  {
    "word": "straight",
    "meaning": "مستقیم",
    "lesson": 6,
    "pos": "adv.",
    "lessonLabel": "داستان ۶"
  },
  {
    "word": "turn to the left",
    "meaning": "به چپ پیچیدن",
    "lesson": 6,
    "pos": "phr.",
    "lessonLabel": "داستان ۶"
  },
  {
    "word": "surprised",
    "meaning": "شگفت‌زده",
    "lesson": 6,
    "pos": "adj.",
    "lessonLabel": "داستان ۶"
  },
  {
    "word": "a few days later",
    "meaning": "چند روز بعد",
    "lesson": 6,
    "pos": "phr.",
    "lessonLabel": "داستان ۶"
  },
  {
    "word": "the same",
    "meaning": "همان",
    "lesson": 6,
    "pos": "adj.",
    "lessonLabel": "داستان ۶"
  },
  {
    "word": "still looking for",
    "meaning": "هنوز در حال جستجوی",
    "lesson": 6,
    "pos": "phr.",
    "lessonLabel": "داستان ۶"
  },
  {
    "word": "place",
    "meaning": "مکان، جای",
    "lesson": 6,
    "pos": "n.",
    "lessonLabel": "داستان ۶"
  },
  {
    "word": "pictures",
    "meaning": "نقاشی‌ها",
    "lesson": 7,
    "pos": "n.",
    "lessonLabel": "داستان ۷"
  },
  {
    "word": "drew",
    "meaning": "کشید (past of draw)",
    "lesson": 7,
    "pos": "v.",
    "lessonLabel": "داستان ۷"
  },
  {
    "word": "pieces of paper",
    "meaning": "تکه‌های کاغذ",
    "lesson": 7,
    "pos": "phr.",
    "lessonLabel": "داستان ۷"
  },
  {
    "word": "bad at",
    "meaning": "بد در",
    "lesson": 7,
    "pos": "phr.",
    "lessonLabel": "داستان ۷"
  },
  {
    "word": "enjoyed",
    "meaning": "از... لذت برد",
    "lesson": 7,
    "pos": "v.",
    "lessonLabel": "داستان ۷"
  },
  {
    "word": "pencils",
    "meaning": "مدادها",
    "lesson": 7,
    "pos": "n.",
    "lessonLabel": "داستان ۷"
  },
  {
    "word": "drawing book",
    "meaning": "دفتر نقاشی",
    "lesson": 7,
    "pos": "n.",
    "lessonLabel": "داستان ۷"
  },
  {
    "word": "blackboard",
    "meaning": "تخته سیاه",
    "lesson": 7,
    "pos": "n.",
    "lessonLabel": "داستان ۷"
  },
  {
    "word": "chalk",
    "meaning": "گچ",
    "lesson": 7,
    "pos": "n.",
    "lessonLabel": "داستان ۷"
  },
  {
    "word": "duster",
    "meaning": "پاک‌کن",
    "lesson": 7,
    "pos": "n.",
    "lessonLabel": "داستان ۷"
  },
  {
    "word": "rubbed out",
    "meaning": "پاک کرد",
    "lesson": 7,
    "pos": "phr.",
    "lessonLabel": "داستان ۷"
  },
  {
    "word": "tail",
    "meaning": "دم",
    "lesson": 7,
    "pos": "n.",
    "lessonLabel": "داستان ۷"
  },
  {
    "word": "monkey",
    "meaning": "میمون",
    "lesson": 7,
    "pos": "n.",
    "lessonLabel": "داستان ۷"
  },
  {
    "word": "army camp",
    "meaning": "اردوی نظامی",
    "lesson": 8,
    "pos": "n.",
    "lessonLabel": "داستان ۸"
  },
  {
    "word": "church",
    "meaning": "کلیسا",
    "lesson": 8,
    "pos": "n.",
    "lessonLabel": "داستان ۸"
  },
  {
    "word": "choir",
    "meaning": "گروه سرود",
    "lesson": 8,
    "pos": "n.",
    "lessonLabel": "داستان ۸"
  },
  {
    "word": "Captain Jones",
    "meaning": "کاپیتان جونز",
    "lesson": 8,
    "pos": "n.",
    "lessonLabel": "داستان ۸"
  },
  {
    "word": "offered",
    "meaning": "پیشنهاد داد",
    "lesson": 8,
    "pos": "v.",
    "lessonLabel": "داستان ۸"
  },
  {
    "word": "beautiful",
    "meaning": "زیبا",
    "lesson": 8,
    "pos": "adj.",
    "lessonLabel": "داستان ۸"
  },
  {
    "word": "sing",
    "meaning": "خواندن",
    "lesson": 8,
    "pos": "v.",
    "lessonLabel": "داستان ۸"
  },
  {
    "word": "keep",
    "meaning": "نگه داشتن",
    "lesson": 8,
    "pos": "v.",
    "lessonLabel": "داستان ۸"
  },
  {
    "word": "looking in front of them",
    "meaning": "رو به جلو نگاه کردن",
    "lesson": 8,
    "pos": "phr.",
    "lessonLabel": "داستان ۸"
  },
  {
    "word": "that doesn't matter",
    "meaning": "مشکلی نیست",
    "lesson": 8,
    "pos": "expr.",
    "lessonLabel": "داستان ۸"
  },
  {
    "word": "Len",
    "meaning": "لن (نام شخص)",
    "lesson": 9,
    "pos": "n.",
    "lessonLabel": "داستان ۹"
  },
  {
    "word": "thirty years old",
    "meaning": "سی ساله",
    "lesson": 9,
    "pos": "phr.",
    "lessonLabel": "داستان ۹"
  },
  {
    "word": "long hair",
    "meaning": "موهای بلند",
    "lesson": 9,
    "pos": "n.",
    "lessonLabel": "داستان ۹"
  },
  {
    "word": "find work",
    "meaning": "کار پیدا کردن",
    "lesson": 9,
    "pos": "phr.",
    "lessonLabel": "داستان ۹"
  },
  {
    "word": "small town",
    "meaning": "شهر کوچک",
    "lesson": 9,
    "pos": "n.",
    "lessonLabel": "داستان ۹"
  },
  {
    "word": "barber",
    "meaning": "آرایشگر",
    "lesson": 9,
    "pos": "n.",
    "lessonLabel": "داستان ۹"
  },
  {
    "word": "cut hair off",
    "meaning": "مو را کوتاه کردن",
    "lesson": 9,
    "pos": "phr.",
    "lessonLabel": "داستان ۹"
  },
  {
    "word": "cap",
    "meaning": "کلاه",
    "lesson": 9,
    "pos": "n.",
    "lessonLabel": "داستان ۹"
  },
  {
    "word": "old friend",
    "meaning": "دوست قدیمی",
    "lesson": 9,
    "pos": "n.",
    "lessonLabel": "داستان ۹"
  },
  {
    "word": "get some work",
    "meaning": "کار پیدا کردن",
    "lesson": 9,
    "pos": "phr.",
    "lessonLabel": "داستان ۹"
  },
  {
    "word": "a lot of",
    "meaning": "بسیاری از، مقدار زیادی از",
    "lesson": 9,
    "pos": "phr.",
    "lessonLabel": "داستان ۹"
  },
  {
    "word": "teacher",
    "meaning": "معلم",
    "lesson": 10,
    "pos": "n.",
    "lessonLabel": "داستان ۱۰"
  },
  {
    "word": "quick",
    "meaning": "باهوش، سریع در یادگیری",
    "lesson": 10,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۰"
  },
  {
    "word": "carefully",
    "meaning": "با دقت",
    "lesson": 10,
    "pos": "adv.",
    "lessonLabel": "داستان ۱۰"
  },
  {
    "word": "funerals",
    "meaning": "مراسم تشییع جنازه",
    "lesson": 10,
    "pos": "n.",
    "lessonLabel": "داستان ۱۰"
  },
  {
    "word": "marry",
    "meaning": "ازدواج کردن",
    "lesson": 10,
    "pos": "v.",
    "lessonLabel": "داستان ۱۰"
  },
  {
    "word": "quite right",
    "meaning": "کاملاً درست",
    "lesson": 10,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۰"
  },
  {
    "word": "put his hand up",
    "meaning": "دستش را بالا برد",
    "lesson": 10,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۰"
  },
  {
    "word": "ask something",
    "meaning": "چیزی بپرسد",
    "lesson": 10,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۰"
  },
  {
    "word": "black",
    "meaning": "سیاه",
    "lesson": 10,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۰"
  },
  {
    "word": "white",
    "meaning": "سفید",
    "lesson": 10,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۰"
  },
  {
    "word": "happy",
    "meaning": "خوشحال",
    "lesson": 10,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۰"
  },
  {
    "word": "countries",
    "meaning": "کشورها",
    "lesson": 10,
    "pos": "n.",
    "lessonLabel": "داستان ۱۰"
  },
  {
    "word": "Europe",
    "meaning": "اروپا",
    "lesson": 10,
    "pos": "n.",
    "lessonLabel": "داستان ۱۰"
  },
  {
    "word": "Asia",
    "meaning": "آسیا",
    "lesson": 10,
    "pos": "n.",
    "lessonLabel": "داستان ۱۰"
  },
  {
    "word": "America",
    "meaning": "آمریکا",
    "lesson": 10,
    "pos": "n.",
    "lessonLabel": "داستان ۱۰"
  },
  {
    "word": "Miss",
    "meaning": "خانم (برای مجردی)",
    "lesson": 10,
    "pos": "n.",
    "lessonLabel": "داستان ۱۰"
  },
  {
    "word": "hijackings",
    "meaning": "ربوده شدن هواپیما",
    "lesson": 11,
    "pos": "n.",
    "lessonLabel": "داستان ۱۱"
  },
  {
    "word": "aeroplanes",
    "meaning": "هواپیماها",
    "lesson": 11,
    "pos": "n.",
    "lessonLabel": "داستان ۱۱"
  },
  {
    "word": "passengers",
    "meaning": "مسافران",
    "lesson": 11,
    "pos": "n.",
    "lessonLabel": "داستان ۱۱"
  },
  {
    "word": "luggage",
    "meaning": "وسایل مسافرت",
    "lesson": 11,
    "pos": "n.",
    "lessonLabel": "داستان ۱۱"
  },
  {
    "word": "guns",
    "meaning": "اسلحه‌ها",
    "lesson": 11,
    "pos": "n.",
    "lessonLabel": "داستان ۱۱"
  },
  {
    "word": "bombs",
    "meaning": "بمب‌ها",
    "lesson": 11,
    "pos": "n.",
    "lessonLabel": "داستان ۱۱"
  },
  {
    "word": "singers",
    "meaning": "خوانندگان",
    "lesson": 11,
    "pos": "n.",
    "lessonLabel": "داستان ۱۱"
  },
  {
    "word": "travelled",
    "meaning": "سفر کرد",
    "lesson": 11,
    "pos": "v.",
    "lessonLabel": "داستان ۱۱"
  },
  {
    "word": "searched",
    "meaning": "جستجو کرد",
    "lesson": 11,
    "pos": "v.",
    "lessonLabel": "داستان ۱۱"
  },
  {
    "word": "scissors",
    "meaning": "قیچی‌ها",
    "lesson": 11,
    "pos": "n.",
    "lessonLabel": "داستان ۱۱"
  },
  {
    "word": "looked for",
    "meaning": "به دنبال چیزی گشتن",
    "lesson": 11,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۱"
  },
  {
    "word": "Mick",
    "meaning": "میک (نام شخص)",
    "lesson": 12,
    "pos": "n.",
    "lessonLabel": "داستان ۱۲"
  },
  {
    "word": "country",
    "meaning": "روستا، محله",
    "lesson": 12,
    "pos": "n.",
    "lessonLabel": "داستان ۱۲"
  },
  {
    "word": "garden",
    "meaning": "باغ",
    "lesson": 12,
    "pos": "n.",
    "lessonLabel": "داستان ۱۲"
  },
  {
    "word": "vegetables",
    "meaning": "سبزی‌ها",
    "lesson": 12,
    "pos": "n.",
    "lessonLabel": "داستان ۱۲"
  },
  {
    "word": "chickens",
    "meaning": "مرغ‌ها",
    "lesson": 12,
    "pos": "n.",
    "lessonLabel": "داستان ۱۲"
  },
  {
    "word": "sold",
    "meaning": "فروخت",
    "lesson": 12,
    "pos": "v.",
    "lessonLabel": "داستان ۱۲"
  },
  {
    "word": "neighbour",
    "meaning": "همسایه",
    "lesson": 12,
    "pos": "n.",
    "lessonLabel": "داستان ۱۲"
  },
  {
    "word": "wire fence",
    "meaning": "حصار سیمی",
    "lesson": 12,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۲"
  },
  {
    "word": "old",
    "meaning": "قدیمی",
    "lesson": 12,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۲"
  },
  {
    "word": "holes",
    "meaning": "سوراخ‌ها",
    "lesson": 12,
    "pos": "n.",
    "lessonLabel": "داستان ۱۲"
  },
  {
    "word": "strong",
    "meaning": "محکم",
    "lesson": 12,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۲"
  },
  {
    "word": "Mr Biggs",
    "meaning": "آقای بیگز",
    "lesson": 12,
    "pos": "n.",
    "lessonLabel": "داستان ۱۲"
  },
  {
    "word": "build",
    "meaning": "ساختن، بنا کردن",
    "lesson": 12,
    "pos": "v.",
    "lessonLabel": "داستان ۱۲"
  },
  {
    "word": "shopping",
    "meaning": "خرید",
    "lesson": 13,
    "pos": "n.",
    "lessonLabel": "داستان ۱۳"
  },
  {
    "word": "parcels",
    "meaning": "بسته‌های خرید",
    "lesson": 13,
    "pos": "n.",
    "lessonLabel": "داستان ۱۳"
  },
  {
    "word": "dear",
    "meaning": "عزیزم",
    "lesson": 13,
    "pos": "n.",
    "lessonLabel": "داستان ۱۳"
  },
  {
    "word": "dark",
    "meaning": "تاریک",
    "lesson": 13,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۳"
  },
  {
    "word": "tired",
    "meaning": "خسته",
    "lesson": 13,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۳"
  },
  {
    "word": "suddenly",
    "meaning": "ناگهان",
    "lesson": 13,
    "pos": "adv.",
    "lessonLabel": "داستان ۱۳"
  },
  {
    "word": "moon",
    "meaning": "ماه",
    "lesson": 13,
    "pos": "n.",
    "lessonLabel": "داستان ۱۳"
  },
  {
    "word": "look at",
    "meaning": "نگاه کردن به",
    "lesson": 13,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۳"
  },
  {
    "word": "how much",
    "meaning": "چقدر",
    "lesson": 13,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۳"
  },
  {
    "word": "pay for",
    "meaning": "پرداخت کردن برای",
    "lesson": 13,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۳"
  },
  {
    "word": "neighbours",
    "meaning": "همسایگان",
    "lesson": 14,
    "pos": "n.",
    "lessonLabel": "داستان ۱۴"
  },
  {
    "word": "opposite",
    "meaning": "روبروی",
    "lesson": 14,
    "pos": "prep.",
    "lessonLabel": "داستان ۱۴"
  },
  {
    "word": "quite a lot of",
    "meaning": "خیلی زیاد",
    "lesson": 14,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۴"
  },
  {
    "word": "died",
    "meaning": "مردن",
    "lesson": 14,
    "pos": "v.",
    "lessonLabel": "داستان ۱۴"
  },
  {
    "word": "watched",
    "meaning": "تماشا کردن",
    "lesson": 14,
    "pos": "v.",
    "lessonLabel": "داستان ۱۴"
  },
  {
    "word": "kisses",
    "meaning": "بوسیدن",
    "lesson": 14,
    "pos": "v.",
    "lessonLabel": "داستان ۱۴"
  },
  {
    "word": "husband",
    "meaning": "شوهر",
    "lesson": 14,
    "pos": "n.",
    "lessonLabel": "داستان ۱۴"
  },
  {
    "word": "answered",
    "meaning": "پاسخ دادن",
    "lesson": 14,
    "pos": "v.",
    "lessonLabel": "داستان ۱۴"
  },
  {
    "word": "well",
    "meaning": "خوب",
    "lesson": 14,
    "pos": "adv.",
    "lessonLabel": "داستان ۱۴"
  },
  {
    "word": "gets home",
    "meaning": "به خانه رسیدن",
    "lesson": 14,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۴"
  },
  {
    "word": "since then",
    "meaning": "از آن زمان تاکنون",
    "lesson": 14,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۴"
  },
  {
    "word": "lived",
    "meaning": "زندگی کردن",
    "lesson": 14,
    "pos": "v.",
    "lessonLabel": "داستان ۱۴"
  },
  {
    "word": "every morning",
    "meaning": "هر صبح",
    "lesson": 14,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۴"
  },
  {
    "word": "every evening",
    "meaning": "هر عصر",
    "lesson": 14,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۴"
  },
  {
    "word": "children",
    "meaning": "فرزندان",
    "lesson": 15,
    "pos": "n.",
    "lessonLabel": "داستان ۱۵"
  },
  {
    "word": "sister",
    "meaning": "خواهر",
    "lesson": 15,
    "pos": "n.",
    "lessonLabel": "داستان ۱۵"
  },
  {
    "word": "school",
    "meaning": "مدرسه",
    "lesson": 15,
    "pos": "n.",
    "lessonLabel": "داستان ۱۵"
  },
  {
    "word": "cooking",
    "meaning": "آشپزی کردن",
    "lesson": 15,
    "pos": "n.",
    "lessonLabel": "داستان ۱۵"
  },
  {
    "word": "washing",
    "meaning": "شستن",
    "lesson": 15,
    "pos": "n.",
    "lessonLabel": "داستان ۱۵"
  },
  {
    "word": "cleaning",
    "meaning": "تمیز کردن",
    "lesson": 15,
    "pos": "n.",
    "lessonLabel": "داستان ۱۵"
  },
  {
    "word": "toy horse",
    "meaning": "اسب اسباب‌بازی",
    "lesson": 15,
    "pos": "n.",
    "lessonLabel": "داستان ۱۵"
  },
  {
    "word": "broken",
    "meaning": "شکسته",
    "lesson": 15,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۵"
  },
  {
    "word": "head",
    "meaning": "سر",
    "lesson": 15,
    "pos": "n.",
    "lessonLabel": "داستان ۱۵"
  },
  {
    "word": "quietly",
    "meaning": "به آرامی",
    "lesson": 15,
    "pos": "adv.",
    "lessonLabel": "داستان ۱۵"
  },
  {
    "word": "quite",
    "meaning": "کاملاً",
    "lesson": 15,
    "pos": "adv.",
    "lessonLabel": "داستان ۱۵"
  },
  {
    "word": "loudly",
    "meaning": "بلند",
    "lesson": 15,
    "pos": "adv.",
    "lessonLabel": "داستان ۱۵"
  },
  {
    "word": "fishing",
    "meaning": "ماهیگیری",
    "lesson": 16,
    "pos": "n.",
    "lessonLabel": "داستان ۱۶"
  },
  {
    "word": "river",
    "meaning": "رودخانه",
    "lesson": 16,
    "pos": "n.",
    "lessonLabel": "داستان ۱۶"
  },
  {
    "word": "dirty",
    "meaning": "کثیف",
    "lesson": 16,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۶"
  },
  {
    "word": "seaside",
    "meaning": "ساحل دریا",
    "lesson": 16,
    "pos": "n.",
    "lessonLabel": "داستان ۱۶"
  },
  {
    "word": "holidays",
    "meaning": "تعطیلات",
    "lesson": 16,
    "pos": "n.",
    "lessonLabel": "داستان ۱۶"
  },
  {
    "word": "hotel",
    "meaning": "هتل",
    "lesson": 16,
    "pos": "n.",
    "lessonLabel": "داستان ۱۶"
  },
  {
    "word": "catch",
    "meaning": "گرفتن (ماهی)",
    "lesson": 16,
    "pos": "v.",
    "lessonLabel": "داستان ۱۶"
  },
  {
    "word": "guests",
    "meaning": "مهمانان",
    "lesson": 16,
    "pos": "n.",
    "lessonLabel": "داستان ۱۶"
  },
  {
    "word": "bill",
    "meaning": "صورتحساب",
    "lesson": 16,
    "pos": "n.",
    "lessonLabel": "داستان ۱۶"
  },
  {
    "word": "fry",
    "meaning": "سرخ کردن",
    "lesson": 16,
    "pos": "v.",
    "lessonLabel": "داستان ۱۶"
  },
  {
    "word": "oil",
    "meaning": "روغن",
    "lesson": 16,
    "pos": "n.",
    "lessonLabel": "داستان ۱۶"
  },
  {
    "word": "outside this country",
    "meaning": "خارج از این کشور",
    "lesson": 17,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۷"
  },
  {
    "word": "forgot about this",
    "meaning": "این را فراموش کرد",
    "lesson": 17,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۷"
  },
  {
    "word": "busy street",
    "meaning": "خیابان شلوغ",
    "lesson": 17,
    "pos": "n.",
    "lessonLabel": "داستان ۱۷"
  },
  {
    "word": "knocked him down",
    "meaning": "او را به زمین زد",
    "lesson": 17,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۷"
  },
  {
    "word": "lay on the ground",
    "meaning": "روی زمین دراز کشید",
    "lesson": 17,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۷"
  },
  {
    "word": "sat up",
    "meaning": "نشست",
    "lesson": 17,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۷"
  },
  {
    "word": "selling maps",
    "meaning": "فروختن نقشه",
    "lesson": 17,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۷"
  },
  {
    "word": "at once",
    "meaning": "فوراً",
    "lesson": 17,
    "pos": "adv.",
    "lessonLabel": "داستان ۱۷"
  },
  {
    "word": "map of the city",
    "meaning": "نقشه شهر",
    "lesson": 17,
    "pos": "n.",
    "lessonLabel": "داستان ۱۷"
  },
  {
    "word": "sir",
    "meaning": "آقای",
    "lesson": 17,
    "pos": "n.",
    "lessonLabel": "داستان ۱۷"
  },
  {
    "word": "drive on the left",
    "meaning": "از چپ رانندگی کردن",
    "lesson": 17,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۷"
  },
  {
    "word": "drive on the right",
    "meaning": "از راست رانندگی کردن",
    "lesson": 17,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۷"
  },
  {
    "word": "bank",
    "meaning": "بانک",
    "lesson": 18,
    "pos": "n.",
    "lessonLabel": "داستان ۱۸"
  },
  {
    "word": "dance",
    "meaning": "رقص",
    "lesson": 18,
    "pos": "n.",
    "lessonLabel": "داستان ۱۸"
  },
  {
    "word": "nasty",
    "meaning": "بد، زشت",
    "lesson": 18,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۸"
  },
  {
    "word": "angrily",
    "meaning": "با خشم، عصبانیانه",
    "lesson": 18,
    "pos": "adv.",
    "lessonLabel": "داستان ۱۸"
  },
  {
    "word": "laughed",
    "meaning": "خندید",
    "lesson": 18,
    "pos": "v.",
    "lessonLabel": "داستان ۱۸"
  },
  {
    "word": "pointed to",
    "meaning": "به اشاره کردن",
    "lesson": 18,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۸"
  },
  {
    "word": "sent",
    "meaning": "فرستاد",
    "lesson": 18,
    "pos": "v.",
    "lessonLabel": "داستان ۱۸"
  },
  {
    "word": "danced",
    "meaning": "رقصید",
    "lesson": 18,
    "pos": "v.",
    "lessonLabel": "داستان ۱۸"
  },
  {
    "word": "Mr Miller",
    "meaning": "آقای میلر",
    "lesson": 19,
    "pos": "n.",
    "lessonLabel": "داستان ۱۹"
  },
  {
    "word": "shop",
    "meaning": "مغازه",
    "lesson": 19,
    "pos": "n.",
    "lessonLabel": "داستان ۱۹"
  },
  {
    "word": "ladies' clothes",
    "meaning": "لباس‌های زنانه",
    "lesson": 19,
    "pos": "n.",
    "lessonLabel": "داستان ۱۹"
  },
  {
    "word": "shopgirls",
    "meaning": "فروشنده‌های زن",
    "lesson": 19,
    "pos": "n.",
    "lessonLabel": "داستان ۱۹"
  },
  {
    "word": "cheaper",
    "meaning": "ارزان‌تر",
    "lesson": 19,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۹"
  },
  {
    "word": "rather surprised",
    "meaning": "کمی شگفت‌زده",
    "lesson": 19,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۹"
  },
  {
    "word": "spoke to her",
    "meaning": "با او صحبت کرد",
    "lesson": 19,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۹"
  },
  {
    "word": "What did he want to see?",
    "meaning": "چه چیزی را می‌خواست ببیند؟",
    "lesson": 19,
    "pos": "expr.",
    "lessonLabel": "داستان ۱۹"
  },
  {
    "word": "half past five",
    "meaning": "ساعت نیمه شش",
    "lesson": 19,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۹"
  },
  {
    "word": "big town",
    "meaning": "شهر بزرگ",
    "lesson": 19,
    "pos": "n.",
    "lessonLabel": "داستان ۱۹"
  },
  {
    "word": "worked for him",
    "meaning": "برای او کار می‌کرد",
    "lesson": 19,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۹"
  },
  {
    "word": "came into the shop",
    "meaning": "به مغازه وارد شد",
    "lesson": 19,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۹"
  },
  {
    "word": "watches",
    "meaning": "ساعت‌های مچی",
    "lesson": 20,
    "pos": "n.",
    "lessonLabel": "داستان ۲۰"
  },
  {
    "word": "clocks",
    "meaning": "سنگ‌های زمان‌سنج",
    "lesson": 20,
    "pos": "n.",
    "lessonLabel": "داستان ۲۰"
  },
  {
    "word": "mend",
    "meaning": "تعمیر کردن",
    "lesson": 20,
    "pos": "v.",
    "lessonLabel": "داستان ۲۰"
  },
  {
    "word": "captain",
    "meaning": "فرمانده",
    "lesson": 20,
    "pos": "n.",
    "lessonLabel": "داستان ۲۰"
  },
  {
    "word": "owe",
    "meaning": "بدهکار بودن",
    "lesson": 20,
    "pos": "v.",
    "lessonLabel": "داستان ۲۰"
  },
  {
    "word": "pound",
    "meaning": "پوند (واحد پول)",
    "lesson": 20,
    "pos": "n.",
    "lessonLabel": "داستان ۲۰"
  },
  {
    "word": "wheels",
    "meaning": "چرخک‌ها",
    "lesson": 20,
    "pos": "n.",
    "lessonLabel": "داستان ۲۰"
  },
  {
    "word": "teach himself",
    "meaning": "خودش یاد گرفتن",
    "lesson": 20,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۰"
  },
  {
    "word": "brought him",
    "meaning": "برای آوردن",
    "lesson": 20,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۰"
  },
  {
    "word": "put everything back",
    "meaning": "همه چیز را جای گذاشتن",
    "lesson": 20,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۰"
  },
  {
    "word": "Alan",
    "meaning": "الن (نام)",
    "lesson": 21,
    "pos": "n.",
    "lessonLabel": "داستان ۲۱"
  },
  {
    "word": "football",
    "meaning": "فوتبال",
    "lesson": 21,
    "pos": "n.",
    "lessonLabel": "داستان ۲۱"
  },
  {
    "word": "rather fat",
    "meaning": "چندان چاق",
    "lesson": 21,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۱"
  },
  {
    "word": "tennis",
    "meaning": "تنیس",
    "lesson": 21,
    "pos": "n.",
    "lessonLabel": "داستان ۲۱"
  },
  {
    "word": "lessons",
    "meaning": "درس‌ها",
    "lesson": 21,
    "pos": "n.",
    "lessonLabel": "داستان ۲۱"
  },
  {
    "word": "tennis club",
    "meaning": "باشگاه تنیس",
    "lesson": 21,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۱"
  },
  {
    "word": "angry with himself",
    "meaning": "عصبانی از خودش",
    "lesson": 21,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۱"
  },
  {
    "word": "badly",
    "meaning": "بد",
    "lesson": 21,
    "pos": "adv.",
    "lessonLabel": "داستان ۲۱"
  },
  {
    "word": "played against",
    "meaning": "بازی کردن در مقابل",
    "lesson": 21,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۱"
  },
  {
    "word": "young man",
    "meaning": "جوان",
    "lesson": 21,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۱"
  },
  {
    "word": "never",
    "meaning": "هرگز",
    "lesson": 21,
    "pos": "adv.",
    "lessonLabel": "داستان ۲۱"
  },
  {
    "word": "before",
    "meaning": "قبلاً",
    "lesson": 21,
    "pos": "adv.",
    "lessonLabel": "داستان ۲۱"
  },
  {
    "word": "newspaper",
    "meaning": "روزنامه",
    "lesson": 22,
    "pos": "n.",
    "lessonLabel": "داستان ۲۲"
  },
  {
    "word": "Australia",
    "meaning": "استرالیا",
    "lesson": 22,
    "pos": "n.",
    "lessonLabel": "داستان ۲۲"
  },
  {
    "word": "Sydney",
    "meaning": "سیدنی",
    "lesson": 22,
    "pos": "n.",
    "lessonLabel": "داستان ۲۲"
  },
  {
    "word": "England",
    "meaning": "انگلستان",
    "lesson": 22,
    "pos": "n.",
    "lessonLabel": "داستان ۲۲"
  },
  {
    "word": "flew",
    "meaning": "پرواز کرد",
    "lesson": 22,
    "pos": "v.",
    "lessonLabel": "داستان ۲۲"
  },
  {
    "word": "London",
    "meaning": "لندن",
    "lesson": 22,
    "pos": "n.",
    "lessonLabel": "داستان ۲۲"
  },
  {
    "word": "comfortable",
    "meaning": "راحت",
    "lesson": 22,
    "pos": "adj.",
    "lessonLabel": "داستان ۲۲"
  },
  {
    "word": "digging",
    "meaning": "حفر کردن",
    "lesson": 22,
    "pos": "v.",
    "lessonLabel": "داستان ۲۲"
  },
  {
    "word": "plant",
    "meaning": "کاشتن",
    "lesson": 22,
    "pos": "v.",
    "lessonLabel": "داستان ۲۲"
  },
  {
    "word": "bush",
    "meaning": "بوته",
    "lesson": 22,
    "pos": "n.",
    "lessonLabel": "داستان ۲۲"
  },
  {
    "word": "swimming-pool",
    "meaning": "استخر شنا",
    "lesson": 22,
    "pos": "n.",
    "lessonLabel": "داستان ۲۲"
  },
  {
    "word": "going home",
    "meaning": "برگشتن به خانه",
    "lesson": 22,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۲"
  },
  {
    "word": "picnic",
    "meaning": "پیک‌نیک",
    "lesson": 23,
    "pos": "n.",
    "lessonLabel": "داستان ۲۳"
  },
  {
    "word": "cow",
    "meaning": "گاو",
    "lesson": 23,
    "pos": "n.",
    "lessonLabel": "داستان ۲۳"
  },
  {
    "word": "calf",
    "meaning": "گوساله",
    "lesson": 23,
    "pos": "n.",
    "lessonLabel": "داستان ۲۳"
  },
  {
    "word": "kiss",
    "meaning": "بوسه",
    "lesson": 23,
    "pos": "n.",
    "lessonLabel": "داستان ۲۳"
  },
  {
    "word": "pretty",
    "meaning": "قشنگ، زیبا",
    "lesson": 23,
    "pos": "adj.",
    "lessonLabel": "داستان ۲۳"
  },
  {
    "word": "make you want",
    "meaning": "سبب شود بخواهی",
    "lesson": 23,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۳"
  },
  {
    "word": "hold her hand",
    "meaning": "دستش را بگیرد",
    "lesson": 23,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۳"
  },
  {
    "word": "quiet",
    "meaning": "آرام، بی‌صدا",
    "lesson": 23,
    "pos": "adj.",
    "lessonLabel": "داستان ۲۳"
  },
  {
    "word": "headwords",
    "meaning": "واژه‌های اصلی",
    "lesson": 23,
    "pos": "n.",
    "lessonLabel": "داستان ۲۳"
  },
  {
    "word": "build a house",
    "meaning": "ساختن یک خانه",
    "lesson": 24,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۴"
  },
  {
    "word": "village",
    "meaning": "روستا",
    "lesson": 24,
    "pos": "n.",
    "lessonLabel": "داستان ۲۴"
  },
  {
    "word": "weather",
    "meaning": "هوا",
    "lesson": 24,
    "pos": "n.",
    "lessonLabel": "داستان ۲۴"
  },
  {
    "word": "dust",
    "meaning": "گرد و غبار",
    "lesson": 24,
    "pos": "n.",
    "lessonLabel": "داستان ۲۴"
  },
  {
    "word": "thirsty",
    "meaning": "تشنه",
    "lesson": 24,
    "pos": "adj.",
    "lessonLabel": "داستان ۲۴"
  },
  {
    "word": "bar",
    "meaning": "کافه",
    "lesson": 24,
    "pos": "n.",
    "lessonLabel": "داستان ۲۴"
  },
  {
    "word": "gentlemen",
    "meaning": "آقایان",
    "lesson": 24,
    "pos": "n.",
    "lessonLabel": "داستان ۲۴"
  },
  {
    "word": "beer",
    "meaning": "بیر",
    "lesson": 24,
    "pos": "n.",
    "lessonLabel": "داستان ۲۴"
  },
  {
    "word": "pint",
    "meaning": "پینت (واحد اندازه‌گیری مایعات)",
    "lesson": 24,
    "pos": "n.",
    "lessonLabel": "داستان ۲۴"
  },
  {
    "word": "clean glass",
    "meaning": "لیوان تمیز",
    "lesson": 24,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۴"
  },
  {
    "word": "forget",
    "meaning": "فراموش کردن",
    "lesson": 24,
    "pos": "v.",
    "lessonLabel": "داستان ۲۴"
  },
  {
    "word": "rich",
    "meaning": "ثروتمند",
    "lesson": 25,
    "pos": "adj.",
    "lessonLabel": "داستان ۲۵"
  },
  {
    "word": "servants",
    "meaning": "خدمتکارها",
    "lesson": 25,
    "pos": "n.",
    "lessonLabel": "داستان ۲۵"
  },
  {
    "word": "died suddenly",
    "meaning": "ناگهان مرد",
    "lesson": 25,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۵"
  },
  {
    "word": "trial",
    "meaning": "دادگاه",
    "lesson": 25,
    "pos": "n.",
    "lessonLabel": "داستان ۲۵"
  },
  {
    "word": "lawyers",
    "meaning": "وکلا",
    "lesson": 25,
    "pos": "n.",
    "lessonLabel": "داستان ۲۵"
  },
  {
    "word": "witnesses",
    "meaning": "شاهدان",
    "lesson": 25,
    "pos": "n.",
    "lessonLabel": "داستان ۲۵"
  },
  {
    "word": "alone",
    "meaning": "تنها",
    "lesson": 25,
    "pos": "adv.",
    "lessonLabel": "داستان ۲۵"
  },
  {
    "word": "best friend",
    "meaning": "بهترین دوست",
    "lesson": 25,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۵"
  },
  {
    "word": "beautiful house",
    "meaning": "خانه زیبا",
    "lesson": 25,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۵"
  },
  {
    "word": "wanted his money",
    "meaning": "پول او را می‌خواستند",
    "lesson": 25,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۵"
  },
  {
    "word": "killed himself",
    "meaning": "خودکشی کرد",
    "lesson": 25,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۵"
  },
  {
    "word": "asked questions",
    "meaning": "سؤال پرسید",
    "lesson": 25,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۵"
  },
  {
    "word": "never with him",
    "meaning": "هرگز با او نبود",
    "lesson": 25,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۵"
  },
  {
    "word": "began to work",
    "meaning": "شروع به کار کردن",
    "lesson": 26,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۶"
  },
  {
    "word": "important",
    "meaning": "مهم",
    "lesson": 26,
    "pos": "adj.",
    "lessonLabel": "داستان ۲۶"
  },
  {
    "word": "hotels",
    "meaning": "هتل‌ها",
    "lesson": 26,
    "pos": "n.",
    "lessonLabel": "داستان ۲۶"
  },
  {
    "word": "clerk",
    "meaning": "کارمند",
    "lesson": 26,
    "pos": "n.",
    "lessonLabel": "داستان ۲۶"
  },
  {
    "word": "desk",
    "meaning": "میز",
    "lesson": 26,
    "pos": "n.",
    "lessonLabel": "داستان ۲۶"
  },
  {
    "word": "letters",
    "meaning": "نامه‌ها",
    "lesson": 26,
    "pos": "n.",
    "lessonLabel": "داستان ۲۶"
  },
  {
    "word": "pile",
    "meaning": "انبوه",
    "lesson": 26,
    "pos": "n.",
    "lessonLabel": "داستان ۲۶"
  },
  {
    "word": "name",
    "meaning": "نام",
    "lesson": 26,
    "pos": "n.",
    "lessonLabel": "داستان ۲۶"
  },
  {
    "word": "Sheffield",
    "meaning": "شفیلد (نام شهر)",
    "lesson": 26,
    "pos": "n.",
    "lessonLabel": "داستان ۲۶"
  },
  {
    "word": "Good evening",
    "meaning": "خوشبختم",
    "lesson": 26,
    "pos": "expr.",
    "lessonLabel": "داستان ۲۶"
  },
  {
    "word": "What name",
    "meaning": "نام چیست",
    "lesson": 26,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۶"
  },
  {
    "word": "farmer",
    "meaning": "کشاورز",
    "lesson": 27,
    "pos": "n.",
    "lessonLabel": "داستان ۲۷"
  },
  {
    "word": "grew",
    "meaning": "می‌کاشت",
    "lesson": 27,
    "pos": "v.",
    "lessonLabel": "داستان ۲۷"
  },
  {
    "word": "cows",
    "meaning": "گاوها",
    "lesson": 27,
    "pos": "n.",
    "lessonLabel": "داستان ۲۷"
  },
  {
    "word": "hard",
    "meaning": "سخت",
    "lesson": 27,
    "pos": "adv.",
    "lessonLabel": "داستان ۲۷"
  },
  {
    "word": "Portsmouth",
    "meaning": "پورتسموث",
    "lesson": 27,
    "pos": "n.",
    "lessonLabel": "داستان ۲۷"
  },
  {
    "word": "cinema",
    "meaning": "سینما",
    "lesson": 27,
    "pos": "n.",
    "lessonLabel": "داستان ۲۷"
  },
  {
    "word": "train",
    "meaning": "قطار",
    "lesson": 27,
    "pos": "n.",
    "lessonLabel": "داستان ۲۷"
  },
  {
    "word": "restaurants",
    "meaning": "رستوران‌ها",
    "lesson": 27,
    "pos": "n.",
    "lessonLabel": "داستان ۲۷"
  },
  {
    "word": "notice",
    "meaning": "اطلاعیه",
    "lesson": 27,
    "pos": "n.",
    "lessonLabel": "داستان ۲۷"
  }
];

export const VOCAB_ALL: VocabEntry[] = ROWS.map((r) => {
  const { lessonLabel, ...rest } = r;
  return { ...rest, lessonLabel } as VocabEntry;
});

export const VOCAB_LESSONS = [
  ...new Map(ROWS.map((r) => [r.lesson, { lesson: r.lesson, label: r.lessonLabel }])).values(),
].sort((a, b) => a.lesson - b.lesson);

export const VOCAB_COUNT_BY_LESSON: Record<number, number> = {};
for (const r of ROWS) VOCAB_COUNT_BY_LESSON[r.lesson] = (VOCAB_COUNT_BY_LESSON[r.lesson] ?? 0) + 1;

export function vocabOfLesson(lesson: number): VocabEntry[] {
  return VOCAB_ALL.filter((v) => v.lesson === lesson);
}
