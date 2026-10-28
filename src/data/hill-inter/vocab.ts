// واژگان داستان‌های Intermediate Steps to Understanding — کلیدواژه‌های هر داستان با معنی فارسی
// lesson = شمارهٔ داستان (۱ تا 30)
import type { VocabEntry, VocabWord } from "../types";

type Row = Omit<VocabWord, "lesson"> & { lesson: number; lessonLabel: string };

const ROWS: Row[] = [
  {
    "word": "expecting",
    "meaning": "منتظر بودن، باردار بودن",
    "lesson": 1,
    "pos": "v.",
    "lessonLabel": "داستان ۱"
  },
  {
    "word": "delighted",
    "meaning": "بسیار خوشحال، مسرور",
    "lesson": 1,
    "pos": "adj.",
    "lessonLabel": "داستان ۱"
  },
  {
    "word": "arrival",
    "meaning": "آمدن، ورود",
    "lesson": 1,
    "pos": "n.",
    "lessonLabel": "داستان ۱"
  },
  {
    "word": "large",
    "meaning": "بزرگ، وسیع",
    "lesson": 1,
    "pos": "adj.",
    "lessonLabel": "داستان ۱"
  },
  {
    "word": "move",
    "meaning": "جابجا شدن، نقل مکان کردن",
    "lesson": 1,
    "pos": "v.",
    "lessonLabel": "داستان ۱"
  },
  {
    "word": "hopelessly",
    "meaning": "با ناامیدی، بی‌امیدانه",
    "lesson": 1,
    "pos": "adv.",
    "lessonLabel": "داستان ۱"
  },
  {
    "word": "follow",
    "meaning": "دنبال کردن",
    "lesson": 1,
    "pos": "v.",
    "lessonLabel": "داستان ۱"
  },
  {
    "word": "It's no use",
    "meaning": "فایده‌ای ندارد، بی‌فایده است",
    "lesson": 1,
    "pos": "phr.",
    "lessonLabel": "داستان ۱"
  },
  {
    "word": "suppose",
    "meaning": "فکر کردن، فرض کردن",
    "lesson": 1,
    "pos": "v.",
    "lessonLabel": "داستان ۱"
  },
  {
    "word": "making plans",
    "meaning": "برنامه‌ریزی کردن",
    "lesson": 1,
    "pos": "phr.",
    "lessonLabel": "داستان ۱"
  },
  {
    "word": "big enough",
    "meaning": "بزرگ enough",
    "lesson": 1,
    "pos": "phr.",
    "lessonLabel": "داستان ۱"
  },
  {
    "word": "in the room",
    "meaning": "در اتاق",
    "lesson": 1,
    "pos": "phr.",
    "lessonLabel": "داستان ۱"
  },
  {
    "word": "businessman",
    "meaning": "تاجر",
    "lesson": 2,
    "pos": "n.",
    "lessonLabel": "داستان ۲"
  },
  {
    "word": "doctor",
    "meaning": "پزشک",
    "lesson": 2,
    "pos": "n.",
    "lessonLabel": "داستان ۲"
  },
  {
    "word": "examine",
    "meaning": "معاینه کردن",
    "lesson": 2,
    "pos": "v.",
    "lessonLabel": "داستان ۲"
  },
  {
    "word": "trouble",
    "meaning": "مشکل",
    "lesson": 2,
    "pos": "n.",
    "lessonLabel": "داستان ۲"
  },
  {
    "word": "relax",
    "meaning": "استراحت کردن",
    "lesson": 2,
    "pos": "v.",
    "lessonLabel": "داستان ۲"
  },
  {
    "word": "hobbies",
    "meaning": "سرگرمی‌ها",
    "lesson": 2,
    "pos": "n.",
    "lessonLabel": "داستان ۲"
  },
  {
    "word": "main",
    "meaning": "اصلی",
    "lesson": 2,
    "pos": "adj.",
    "lessonLabel": "داستان ۲"
  },
  {
    "word": "dead",
    "meaning": "مرده",
    "lesson": 2,
    "pos": "adj.",
    "lessonLabel": "داستان ۲"
  },
  {
    "word": "paint pictures",
    "meaning": "نقاشی کردن",
    "lesson": 2,
    "pos": "phr.",
    "lessonLabel": "داستان ۲"
  },
  {
    "word": "advised",
    "meaning": "توصیه کرد",
    "lesson": 2,
    "pos": "v.",
    "lessonLabel": "داستان ۲"
  },
  {
    "word": "follow his advice",
    "meaning": "دنبال کردن توصیه‌های او",
    "lesson": 2,
    "pos": "phr.",
    "lessonLabel": "داستان ۲"
  },
  {
    "word": "telephone",
    "meaning": "زنگ زدن",
    "lesson": 2,
    "pos": "v.",
    "lessonLabel": "داستان ۲"
  },
  {
    "word": "idea",
    "meaning": "ایده",
    "lesson": 2,
    "pos": "n.",
    "lessonLabel": "داستان ۲"
  },
  {
    "word": "already",
    "meaning": "قبلاً",
    "lesson": 2,
    "pos": "adv.",
    "lessonLabel": "داستان ۲"
  },
  {
    "word": "since",
    "meaning": "از زمانی که",
    "lesson": 2,
    "pos": "conj.",
    "lessonLabel": "داستان ۲"
  },
  {
    "word": "nearly seventy",
    "meaning": "تقریباً هفتاد ساله",
    "lesson": 3,
    "pos": "phr.",
    "lessonLabel": "داستان ۳"
  },
  {
    "word": "old lady",
    "meaning": "خانم مسن",
    "lesson": 3,
    "pos": "n.",
    "lessonLabel": "داستان ۳"
  },
  {
    "word": "present",
    "meaning": "هدیه",
    "lesson": 3,
    "pos": "n.",
    "lessonLabel": "داستان ۳"
  },
  {
    "word": "electric machine",
    "meaning": "دستگاه برقی",
    "lesson": 3,
    "pos": "n.",
    "lessonLabel": "داستان ۳"
  },
  {
    "word": "wrapped",
    "meaning": "پیچید",
    "lesson": 3,
    "pos": "v.",
    "lessonLabel": "داستان ۳"
  },
  {
    "word": "package",
    "meaning": "بسته",
    "lesson": 3,
    "pos": "n.",
    "lessonLabel": "داستان ۳"
  },
  {
    "word": "switch on",
    "meaning": "روشن کردن",
    "lesson": 3,
    "pos": "phr.",
    "lessonLabel": "داستان ۳"
  },
  {
    "word": "kettle",
    "meaning": "کتری",
    "lesson": 3,
    "pos": "n.",
    "lessonLabel": "داستان ۳"
  },
  {
    "word": "confused",
    "meaning": "گیج شده",
    "lesson": 3,
    "pos": "adj.",
    "lessonLabel": "داستان ۳"
  },
  {
    "word": "silly",
    "meaning": "احمقانه",
    "lesson": 3,
    "pos": "adj.",
    "lessonLabel": "داستان ۳"
  },
  {
    "word": "rather",
    "meaning": "تقریباً",
    "lesson": 3,
    "pos": "adv.",
    "lessonLabel": "داستان ۳"
  },
  {
    "word": "make the tea",
    "meaning": "چای درست کردن",
    "lesson": 3,
    "pos": "phr.",
    "lessonLabel": "داستان ۳"
  },
  {
    "word": "manager",
    "meaning": "مدیر",
    "lesson": 4,
    "pos": "n.",
    "lessonLabel": "داستان ۴"
  },
  {
    "word": "office",
    "meaning": "دفتر کار",
    "lesson": 4,
    "pos": "n.",
    "lessonLabel": "داستان ۴"
  },
  {
    "word": "country",
    "meaning": "روستا، محیط روستایی",
    "lesson": 4,
    "pos": "n.",
    "lessonLabel": "داستان ۴"
  },
  {
    "word": "exercise",
    "meaning": "ورزش",
    "lesson": 4,
    "pos": "n.",
    "lessonLabel": "داستان ۴"
  },
  {
    "word": "stranger",
    "meaning": "غریبه",
    "lesson": 4,
    "pos": "n.",
    "lessonLabel": "داستان ۴"
  },
  {
    "word": "penny",
    "meaning": "پول ناچیز، پول کم",
    "lesson": 4,
    "pos": "n.",
    "lessonLabel": "داستان ۴"
  },
  {
    "word": "lend",
    "meaning": "قرض دادن",
    "lesson": 4,
    "pos": "v.",
    "lessonLabel": "داستان ۴"
  },
  {
    "word": "willing",
    "meaning": "مصمم، حاضر",
    "lesson": 4,
    "pos": "adj.",
    "lessonLabel": "داستان ۴"
  },
  {
    "word": "take a chance",
    "meaning": "ریسک کردن",
    "lesson": 4,
    "pos": "phr.",
    "lessonLabel": "داستان ۴"
  },
  {
    "word": "success",
    "meaning": "موفقیت",
    "lesson": 4,
    "pos": "n.",
    "lessonLabel": "داستان ۴"
  },
  {
    "word": "moments",
    "meaning": "لحظات",
    "lesson": 4,
    "pos": "n.",
    "lessonLabel": "داستان ۴"
  },
  {
    "word": "along",
    "meaning": "در طول، به سمت",
    "lesson": 4,
    "pos": "adv.",
    "lessonLabel": "داستان ۴"
  },
  {
    "word": "Second World War",
    "meaning": "جنگ جهانی دوم",
    "lesson": 5,
    "pos": "n.",
    "lessonLabel": "داستان ۵"
  },
  {
    "word": "civilian",
    "meaning": "غیرنظامی",
    "lesson": 5,
    "pos": "n.",
    "lessonLabel": "داستان ۵"
  },
  {
    "word": "secret work",
    "meaning": "کار محرمانه",
    "lesson": 5,
    "pos": "n.",
    "lessonLabel": "داستان ۵"
  },
  {
    "word": "lecture",
    "meaning": "سخنرانی",
    "lesson": 5,
    "pos": "n.",
    "lessonLabel": "داستان ۵"
  },
  {
    "word": "top people",
    "meaning": "افراد مهم",
    "lesson": 5,
    "pos": "n.",
    "lessonLabel": "داستان ۵"
  },
  {
    "word": "army officer",
    "meaning": "افسر نظامی",
    "lesson": 5,
    "pos": "n.",
    "lessonLabel": "داستان ۵"
  },
  {
    "word": "at the last minute",
    "meaning": "در آخرین لحظه",
    "lesson": 5,
    "pos": "phr.",
    "lessonLabel": "داستان ۵"
  },
  {
    "word": "discover",
    "meaning": "کشف کردن، متوجه شدن",
    "lesson": 5,
    "pos": "v.",
    "lessonLabel": "داستان ۵"
  },
  {
    "word": "take someone's seat",
    "meaning": "گرفتن صندلی کسی",
    "lesson": 5,
    "pos": "phr.",
    "lessonLabel": "داستان ۵"
  },
  {
    "word": "fly to",
    "meaning": "پرواز کردن به",
    "lesson": 5,
    "pos": "phr.",
    "lessonLabel": "داستان ۵"
  },
  {
    "word": "give a lecture",
    "meaning": "ارائه دادن سخنرانی",
    "lesson": 5,
    "pos": "phr.",
    "lessonLabel": "داستان ۵"
  },
  {
    "word": "be not able to",
    "meaning": "ناتوان بودن در",
    "lesson": 5,
    "pos": "phr.",
    "lessonLabel": "داستان ۵"
  },
  {
    "word": "reach the city",
    "meaning": "رسیدن به شهر",
    "lesson": 5,
    "pos": "phr.",
    "lessonLabel": "داستان ۵"
  },
  {
    "word": "hear a lecture",
    "meaning": "شنیدن سخنرانی",
    "lesson": 5,
    "pos": "phr.",
    "lessonLabel": "داستان ۵"
  },
  {
    "word": "joined the army",
    "meaning": "به ارتش پیوست",
    "lesson": 6,
    "pos": "phr.",
    "lessonLabel": "داستان ۶"
  },
  {
    "word": "soldier",
    "meaning": "سرباز",
    "lesson": 6,
    "pos": "n.",
    "lessonLabel": "داستان ۶"
  },
  {
    "word": "practising",
    "meaning": "تمرین کردن",
    "lesson": 6,
    "pos": "v.",
    "lessonLabel": "داستان ۶"
  },
  {
    "word": "target",
    "meaning": "هدف",
    "lesson": 6,
    "pos": "n.",
    "lessonLabel": "داستان ۶"
  },
  {
    "word": "officer",
    "meaning": "افسر",
    "lesson": 6,
    "pos": "n.",
    "lessonLabel": "داستان ۶"
  },
  {
    "word": "hopeless",
    "meaning": "بی‌مصرف، بی‌امید",
    "lesson": 6,
    "pos": "adj.",
    "lessonLabel": "داستان ۶"
  },
  {
    "word": "waste",
    "meaning": "هدر دادن",
    "lesson": 6,
    "pos": "v.",
    "lessonLabel": "داستان ۶"
  },
  {
    "word": "bullet",
    "meaning": "گلوله",
    "lesson": 6,
    "pos": "n.",
    "lessonLabel": "داستان ۶"
  },
  {
    "word": "ashamed",
    "meaning": "شرمنده",
    "lesson": 6,
    "pos": "adj.",
    "lessonLabel": "داستان ۶"
  },
  {
    "word": "sound",
    "meaning": "صدا",
    "lesson": 6,
    "pos": "n.",
    "lessonLabel": "داستان ۶"
  },
  {
    "word": "anxiously",
    "meaning": "با اضطراب",
    "lesson": 6,
    "pos": "adv.",
    "lessonLabel": "داستان ۶"
  },
  {
    "word": "missed",
    "meaning": "نزد، خطا رفت",
    "lesson": 6,
    "pos": "v.",
    "lessonLabel": "داستان ۶"
  },
  {
    "word": "seaside town",
    "meaning": "شهر ساحلی",
    "lesson": 7,
    "pos": "n.",
    "lessonLabel": "داستان ۷"
  },
  {
    "word": "comfortable",
    "meaning": "راحت، آسوده",
    "lesson": 7,
    "pos": "adj.",
    "lessonLabel": "داستان ۷"
  },
  {
    "word": "relatives",
    "meaning": "فامیل‌ها، اقوام",
    "lesson": 7,
    "pos": "n.",
    "lessonLabel": "داستان ۷"
  },
  {
    "word": "intends",
    "meaning": "قصد دارد",
    "lesson": 7,
    "pos": "v.",
    "lessonLabel": "داستان ۷"
  },
  {
    "word": "complained",
    "meaning": "شکایت کرد",
    "lesson": 7,
    "pos": "v.",
    "lessonLabel": "داستان ۷"
  },
  {
    "word": "intelligent",
    "meaning": "باهوش، زیرک",
    "lesson": 7,
    "pos": "adj.",
    "lessonLabel": "داستان ۷"
  },
  {
    "word": "prevent",
    "meaning": "جلوگیری کردن، مانع شدن",
    "lesson": 7,
    "pos": "v.",
    "lessonLabel": "داستان ۷"
  },
  {
    "word": "borrow",
    "meaning": "قرض گرفتن",
    "lesson": 7,
    "pos": "v.",
    "lessonLabel": "داستان ۷"
  },
  {
    "word": "rich ones",
    "meaning": "افراد ثروتمند",
    "lesson": 7,
    "pos": "phr.",
    "lessonLabel": "داستان ۷"
  },
  {
    "word": "poor ones",
    "meaning": "افراد فقیر",
    "lesson": 7,
    "pos": "phr.",
    "lessonLabel": "داستان ۷"
  },
  {
    "word": "holiday",
    "meaning": "تعطیلات",
    "lesson": 7,
    "pos": "n.",
    "lessonLabel": "داستان ۷"
  },
  {
    "word": "bought",
    "meaning": "خرید",
    "lesson": 8,
    "pos": "v.",
    "lessonLabel": "داستان ۸"
  },
  {
    "word": "painted",
    "meaning": "رنگ‌آمیزی شده",
    "lesson": 8,
    "pos": "v.",
    "lessonLabel": "داستان ۸"
  },
  {
    "word": "curtains",
    "meaning": "پرده‌ها",
    "lesson": 8,
    "pos": "n.",
    "lessonLabel": "داستان ۸"
  },
  {
    "word": "go with",
    "meaning": "هماهنگ با",
    "lesson": 8,
    "pos": "phr.",
    "lessonLabel": "داستان ۸"
  },
  {
    "word": "discovered",
    "meaning": "کشف کرد",
    "lesson": 8,
    "pos": "v.",
    "lessonLabel": "داستان ۸"
  },
  {
    "word": "comb",
    "meaning": "شانه",
    "lesson": 8,
    "pos": "n.",
    "lessonLabel": "داستان ۸"
  },
  {
    "word": "cloth",
    "meaning": "پارچه",
    "lesson": 8,
    "pos": "n.",
    "lessonLabel": "داستان ۸"
  },
  {
    "word": "shopkeeper",
    "meaning": "مغازه‌دار",
    "lesson": 8,
    "pos": "n.",
    "lessonLabel": "داستان ۸"
  },
  {
    "word": "various",
    "meaning": "مختلف",
    "lesson": 8,
    "pos": "adj.",
    "lessonLabel": "داستان ۸"
  },
  {
    "word": "got tired",
    "meaning": "خسته شد",
    "lesson": 8,
    "pos": "phr.",
    "lessonLabel": "داستان ۸"
  },
  {
    "word": "easier",
    "meaning": "آسان‌تر",
    "lesson": 8,
    "pos": "adj.",
    "lessonLabel": "داستان ۸"
  },
  {
    "word": "advice",
    "meaning": "توصیه",
    "lesson": 8,
    "pos": "n.",
    "lessonLabel": "داستان ۸"
  },
  {
    "word": "neither of them",
    "meaning": "هیچ‌کدام از آن‌ها",
    "lesson": 9,
    "pos": "phr.",
    "lessonLabel": "داستان ۹"
  },
  {
    "word": "married",
    "meaning": "ازدواج کردن",
    "lesson": 9,
    "pos": "v.",
    "lessonLabel": "داستان ۹"
  },
  {
    "word": "traffic",
    "meaning": "ترافیک",
    "lesson": 9,
    "pos": "n.",
    "lessonLabel": "داستان ۹"
  },
  {
    "word": "whistle",
    "meaning": "سوت/سوت زدن",
    "lesson": 9,
    "pos": "n./v.",
    "lessonLabel": "داستان ۹"
  },
  {
    "word": "motor-cycle",
    "meaning": "موتورسیکلت",
    "lesson": 9,
    "pos": "n.",
    "lessonLabel": "داستان ۹"
  },
  {
    "word": "ordered",
    "meaning": "فرمان داد",
    "lesson": 9,
    "pos": "v.",
    "lessonLabel": "داستان ۹"
  },
  {
    "word": "admitted",
    "meaning": "اعتراف کرد",
    "lesson": 9,
    "pos": "v.",
    "lessonLabel": "داستان ۹"
  },
  {
    "word": "politely",
    "meaning": "با ادب",
    "lesson": 9,
    "pos": "adv.",
    "lessonLabel": "داستان ۹"
  },
  {
    "word": "meant",
    "meaning": "منظورش بود",
    "lesson": 9,
    "pos": "v.",
    "lessonLabel": "داستان ۹"
  },
  {
    "word": "look at",
    "meaning": "نگاه کردن به",
    "lesson": 9,
    "pos": "phr.",
    "lessonLabel": "داستان ۹"
  },
  {
    "word": "had been to",
    "meaning": "رفته بود به",
    "lesson": 9,
    "pos": "phr.",
    "lessonLabel": "داستان ۹"
  },
  {
    "word": "got on to",
    "meaning": "سوار شدن به",
    "lesson": 9,
    "pos": "phr.",
    "lessonLabel": "داستان ۹"
  },
  {
    "word": "never to stop",
    "meaning": "هرگز نایستیدن",
    "lesson": 9,
    "pos": "phr.",
    "lessonLabel": "داستان ۹"
  },
  {
    "word": "public bar",
    "meaning": "بار عمومی",
    "lesson": 10,
    "pos": "n.",
    "lessonLabel": "داستان ۱۰"
  },
  {
    "word": "allowed to drink",
    "meaning": "اجازه نوشیدن داشتن",
    "lesson": 10,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۰"
  },
  {
    "word": "used to go",
    "meaning": "معمولاً می‌رفت",
    "lesson": 10,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۰"
  },
  {
    "word": "take someone to",
    "meaning": "کسی را بردن به",
    "lesson": 10,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۰"
  },
  {
    "word": "eighteenth birthday",
    "meaning": "تولد هجده سالگی",
    "lesson": 10,
    "pos": "n.",
    "lessonLabel": "داستان ۱۰"
  },
  {
    "word": "usual bar",
    "meaning": "بار معمولی",
    "lesson": 10,
    "pos": "n.",
    "lessonLabel": "داستان ۱۰"
  },
  {
    "word": "useful lesson",
    "meaning": "درس مفید",
    "lesson": 10,
    "pos": "n.",
    "lessonLabel": "داستان ۱۰"
  },
  {
    "word": "careful not to",
    "meaning": "مراقب بودن که",
    "lesson": 10,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۰"
  },
  {
    "word": "drink too much",
    "meaning": "زیاد نوشیدن",
    "lesson": 10,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۰"
  },
  {
    "word": "had enough",
    "meaning": "کافی نوشیدن",
    "lesson": 10,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۰"
  },
  {
    "word": "seem to have become",
    "meaning": "به نظر رسیدن که شده",
    "lesson": 10,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۰"
  },
  {
    "word": "at the end of",
    "meaning": "انتهای",
    "lesson": 10,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۰"
  },
  {
    "word": "go home",
    "meaning": "رفتن خونه",
    "lesson": 10,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۰"
  },
  {
    "word": "only see",
    "meaning": "فقط دیدن",
    "lesson": 10,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۰"
  },
  {
    "word": "because he was too young",
    "meaning": "چون خیلی کوچک بود",
    "lesson": 10,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۰"
  },
  {
    "word": "for the first time",
    "meaning": "برای اولین بار",
    "lesson": 10,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۰"
  },
  {
    "word": "fun-fair",
    "meaning": "شهربازی",
    "lesson": 11,
    "pos": "n.",
    "lessonLabel": "داستان ۱۱"
  },
  {
    "word": "doubtful",
    "meaning": "مردد",
    "lesson": 11,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۱"
  },
  {
    "word": "behaving",
    "meaning": "رفتار کردن",
    "lesson": 11,
    "pos": "v.",
    "lessonLabel": "داستان ۱۱"
  },
  {
    "word": "sweets",
    "meaning": "شیرینی‌ها",
    "lesson": 11,
    "pos": "n.",
    "lessonLabel": "داستان ۱۱"
  },
  {
    "word": "nuts",
    "meaning": "آجیل",
    "lesson": 11,
    "pos": "n.",
    "lessonLabel": "داستان ۱۱"
  },
  {
    "word": "eager",
    "meaning": "مشتاق",
    "lesson": 11,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۱"
  },
  {
    "word": "enjoyed",
    "meaning": "لذت بردن",
    "lesson": 11,
    "pos": "v.",
    "lessonLabel": "داستان ۱۱"
  },
  {
    "word": "hurried",
    "meaning": "عجله کردن",
    "lesson": 11,
    "pos": "v.",
    "lessonLabel": "داستان ۱۱"
  },
  {
    "word": "tired of",
    "meaning": "خسته شدن از",
    "lesson": 11,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۱"
  },
  {
    "word": "following",
    "meaning": "دنبال کردن",
    "lesson": 11,
    "pos": "v.",
    "lessonLabel": "داستان ۱۱"
  },
  {
    "word": "worse than",
    "meaning": "بدتر از",
    "lesson": 11,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۱"
  },
  {
    "word": "forget about it",
    "meaning": "از آن بگذر",
    "lesson": 11,
    "pos": "expr.",
    "lessonLabel": "داستان ۱۱"
  },
  {
    "word": "free",
    "meaning": "آزاد",
    "lesson": 11,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۱"
  },
  {
    "word": "finish",
    "meaning": "تمام کردن",
    "lesson": 11,
    "pos": "v.",
    "lessonLabel": "داستان ۱۱"
  },
  {
    "word": "bill",
    "meaning": "صورتحساب",
    "lesson": 12,
    "pos": "n.",
    "lessonLabel": "داستان ۱۲"
  },
  {
    "word": "mistake",
    "meaning": "اشتباه",
    "lesson": 12,
    "pos": "n.",
    "lessonLabel": "داستان ۱۲"
  },
  {
    "word": "Accounts Department",
    "meaning": "بخش حسابداری",
    "lesson": 12,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۲"
  },
  {
    "word": "telephone operator",
    "meaning": "اپراتور تلفن",
    "lesson": 12,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۲"
  },
  {
    "word": "it doesn't matter",
    "meaning": "فرقی ندارد",
    "lesson": 12,
    "pos": "expr.",
    "lessonLabel": "داستان ۱۲"
  },
  {
    "word": "patiently",
    "meaning": "با حوصله",
    "lesson": 12,
    "pos": "adv.",
    "lessonLabel": "داستان ۱۲"
  },
  {
    "word": "Hullo",
    "meaning": "آلو (سلام تلفنی)",
    "lesson": 12,
    "pos": "expr.",
    "lessonLabel": "داستان ۱۲"
  },
  {
    "word": "wrong",
    "meaning": "اشتباه",
    "lesson": 12,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۲"
  },
  {
    "word": "believed",
    "meaning": "باور داشت",
    "lesson": 12,
    "pos": "v.",
    "lessonLabel": "داستان ۱۲"
  },
  {
    "word": "answered",
    "meaning": "پاسخ داد",
    "lesson": 12,
    "pos": "v.",
    "lessonLabel": "داستان ۱۲"
  },
  {
    "word": "in",
    "meaning": "در محل",
    "lesson": 12,
    "pos": "prep.",
    "lessonLabel": "داستان ۱۲"
  },
  {
    "word": "chicken farmer",
    "meaning": "مزرعه‌دار مرغ",
    "lesson": 13,
    "pos": "n.",
    "lessonLabel": "داستان ۱۳"
  },
  {
    "word": "laid",
    "meaning": "تخم‌گذاری کرد",
    "lesson": 13,
    "pos": "v.",
    "lessonLabel": "داستان ۱۳"
  },
  {
    "word": "hardly any",
    "meaning": "تقریباً هیچ",
    "lesson": 13,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۳"
  },
  {
    "word": "air-conditioning",
    "meaning": "کولر آبی",
    "lesson": 13,
    "pos": "n.",
    "lessonLabel": "داستان ۱۳"
  },
  {
    "word": "persuade",
    "meaning": "قانع کردن",
    "lesson": 13,
    "pos": "v.",
    "lessonLabel": "داستان ۱۳"
  },
  {
    "word": "happier",
    "meaning": "خوشحال‌تر",
    "lesson": 13,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۳"
  },
  {
    "word": "interested",
    "meaning": "علاقه‌مند",
    "lesson": 13,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۳"
  },
  {
    "word": "earn",
    "meaning": "به دست آوردن پول",
    "lesson": 13,
    "pos": "v.",
    "lessonLabel": "داستان ۱۳"
  },
  {
    "word": "owner",
    "meaning": "مالک",
    "lesson": 13,
    "pos": "n.",
    "lessonLabel": "داستان ۱۳"
  },
  {
    "word": "company",
    "meaning": "شرکت",
    "lesson": 13,
    "pos": "n.",
    "lessonLabel": "داستان ۱۳"
  },
  {
    "word": "reason",
    "meaning": "دلیل",
    "lesson": 13,
    "pos": "n.",
    "lessonLabel": "داستان ۱۳"
  },
  {
    "word": "answer",
    "meaning": "پاسخ",
    "lesson": 13,
    "pos": "n.",
    "lessonLabel": "داستان ۱۳"
  },
  {
    "word": "decided",
    "meaning": "تصمیم گرفت",
    "lesson": 13,
    "pos": "v.",
    "lessonLabel": "داستان ۱۳"
  },
  {
    "word": "clever journalist",
    "meaning": "روزنامه‌نگار باهوش",
    "lesson": 14,
    "pos": "n. phr.",
    "lessonLabel": "داستان ۱۴"
  },
  {
    "word": "arguing",
    "meaning": "بحث کردن",
    "lesson": 14,
    "pos": "n.",
    "lessonLabel": "داستان ۱۴"
  },
  {
    "word": "stupid",
    "meaning": "احمق",
    "lesson": 14,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۴"
  },
  {
    "word": "amusing",
    "meaning": "خنده‌دار",
    "lesson": 14,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۴"
  },
  {
    "word": "argument",
    "meaning": "بحث",
    "lesson": 14,
    "pos": "n.",
    "lessonLabel": "داستان ۱۴"
  },
  {
    "word": "newspaper",
    "meaning": "روزنامه",
    "lesson": 14,
    "pos": "n.",
    "lessonLabel": "داستان ۱۴"
  },
  {
    "word": "understand",
    "meaning": "متوجه شدن",
    "lesson": 14,
    "pos": "v.",
    "lessonLabel": "داستان ۱۴"
  },
  {
    "word": "correct answer",
    "meaning": "پاسخ درست",
    "lesson": 14,
    "pos": "n. phr.",
    "lessonLabel": "داستان ۱۴"
  },
  {
    "word": "remembered",
    "meaning": "به خاطر سپردن",
    "lesson": 14,
    "pos": "v.",
    "lessonLabel": "داستان ۱۴"
  },
  {
    "word": "less clever",
    "meaning": "کم‌هوش‌تر",
    "lesson": 14,
    "pos": "adj. phr.",
    "lessonLabel": "داستان ۱۴"
  },
  {
    "word": "never mind",
    "meaning": "اصلاً مهم نیست",
    "lesson": 14,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۴"
  },
  {
    "word": "came over",
    "meaning": "آمدن، مهاجرت کردن",
    "lesson": 15,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۵"
  },
  {
    "word": "to find work",
    "meaning": "برای پیدا کردن کار",
    "lesson": 15,
    "pos": "expr.",
    "lessonLabel": "داستان ۱۵"
  },
  {
    "word": "building company",
    "meaning": "شرکت ساختمانی",
    "lesson": 15,
    "pos": "n.",
    "lessonLabel": "داستان ۱۵"
  },
  {
    "word": "to drink",
    "meaning": "نوشیدن (مشروبات الکلی)",
    "lesson": 15,
    "pos": "v.",
    "lessonLabel": "داستان ۱۵"
  },
  {
    "word": "to smoke",
    "meaning": "سیگار کشیدن",
    "lesson": 15,
    "pos": "v.",
    "lessonLabel": "داستان ۱۵"
  },
  {
    "word": "to save up",
    "meaning": "پس‌انداز کردن",
    "lesson": 15,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۵"
  },
  {
    "word": "mother-in-law",
    "meaning": "مادر همسر",
    "lesson": 15,
    "pos": "n.",
    "lessonLabel": "داستان ۱۵"
  },
  {
    "word": "telegram",
    "meaning": "تلگرام",
    "lesson": 15,
    "pos": "n.",
    "lessonLabel": "داستان ۱۵"
  },
  {
    "word": "priest",
    "meaning": "کشیش",
    "lesson": 15,
    "pos": "n.",
    "lessonLabel": "داستان ۱۵"
  },
  {
    "word": "to write down",
    "meaning": "نوشتن، یادداشت کردن",
    "lesson": 15,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۵"
  },
  {
    "word": "to excuse",
    "meaning": "بخشیدن، عذرخواهی کردن",
    "lesson": 15,
    "pos": "v.",
    "lessonLabel": "داستان ۱۵"
  },
  {
    "word": "spelling",
    "meaning": "املای کلمات",
    "lesson": 15,
    "pos": "n.",
    "lessonLabel": "داستان ۱۵"
  },
  {
    "word": "barber's shop",
    "meaning": "آرایشگاه مردانه",
    "lesson": 16,
    "pos": "n.",
    "lessonLabel": "داستان ۱۶"
  },
  {
    "word": "had his hair cut",
    "meaning": "موهایش را کوتاه کرد",
    "lesson": 16,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۶"
  },
  {
    "word": "was not happy with",
    "meaning": "از... راضی نبود",
    "lesson": 16,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۶"
  },
  {
    "word": "result",
    "meaning": "نتیجه",
    "lesson": 16,
    "pos": "n.",
    "lessonLabel": "داستان ۱۶"
  },
  {
    "word": "satisfied with",
    "meaning": "راضی از",
    "lesson": 16,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۶"
  },
  {
    "word": "agreed",
    "meaning": "موافقت کرد",
    "lesson": 16,
    "pos": "v.",
    "lessonLabel": "داستان ۱۶"
  },
  {
    "word": "whose",
    "meaning": "که متعلق به اوست",
    "lesson": 16,
    "pos": "pron.",
    "lessonLabel": "داستان ۱۶"
  },
  {
    "word": "foolish",
    "meaning": "احمقانه",
    "lesson": 16,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۶"
  },
  {
    "word": "cut",
    "meaning": "کوتاه کردن",
    "lesson": 16,
    "pos": "v.",
    "lessonLabel": "داستان ۱۶"
  },
  {
    "word": "worse",
    "meaning": "بدتر",
    "lesson": 16,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۶"
  },
  {
    "word": "must have been",
    "meaning": "حتماً بوده است",
    "lesson": 16,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۶"
  },
  {
    "word": "another",
    "meaning": "دیگری",
    "lesson": 16,
    "pos": "pron.",
    "lessonLabel": "داستان ۱۶"
  },
  {
    "word": "died",
    "meaning": "درگذشت",
    "lesson": 17,
    "pos": "v.",
    "lessonLabel": "داستان ۱۷"
  },
  {
    "word": "widow",
    "meaning": "زن بیوه",
    "lesson": 17,
    "pos": "n.",
    "lessonLabel": "داستان ۱۷"
  },
  {
    "word": "met",
    "meaning": "ملاقات کرد",
    "lesson": 17,
    "pos": "v.",
    "lessonLabel": "داستان ۱۷"
  },
  {
    "word": "wedding",
    "meaning": "مراسم عروسی",
    "lesson": 17,
    "pos": "n.",
    "lessonLabel": "داستان ۱۷"
  },
  {
    "word": "village church",
    "meaning": "کلیسای روستا",
    "lesson": 17,
    "pos": "n. phr.",
    "lessonLabel": "داستان ۱۷"
  },
  {
    "word": "party",
    "meaning": "مهمانی",
    "lesson": 17,
    "pos": "n.",
    "lessonLabel": "داستان ۱۷"
  },
  {
    "word": "hurried in",
    "meaning": "با عجله وارد شد",
    "lesson": 17,
    "pos": "v. phr.",
    "lessonLabel": "داستان ۱۷"
  },
  {
    "word": "kissed",
    "meaning": "بوسید",
    "lesson": 17,
    "pos": "v.",
    "lessonLabel": "داستان ۱۷"
  },
  {
    "word": "everywhere",
    "meaning": "هر جا",
    "lesson": 17,
    "pos": "adv.",
    "lessonLabel": "داستان ۱۷"
  },
  {
    "word": "card",
    "meaning": "کارت",
    "lesson": 17,
    "pos": "n.",
    "lessonLabel": "داستان ۱۷"
  },
  {
    "word": "quiet",
    "meaning": "آرام",
    "lesson": 17,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۷"
  },
  {
    "word": "aeroplanes",
    "meaning": "هواپیماها",
    "lesson": 18,
    "pos": "n.",
    "lessonLabel": "داستان ۱۸"
  },
  {
    "word": "passengers",
    "meaning": "مسافران",
    "lesson": 18,
    "pos": "n.",
    "lessonLabel": "داستان ۱۸"
  },
  {
    "word": "luggage",
    "meaning": "چمدان‌ها",
    "lesson": 18,
    "pos": "n.",
    "lessonLabel": "داستان ۱۸"
  },
  {
    "word": "weighed",
    "meaning": "وزن شدند",
    "lesson": 18,
    "pos": "v.",
    "lessonLabel": "داستان ۱۸"
  },
  {
    "word": "measured",
    "meaning": "اندازه‌گیری شدند",
    "lesson": 18,
    "pos": "v.",
    "lessonLabel": "داستان ۱۸"
  },
  {
    "word": "airlines",
    "meaning": "شرکت‌های هواپیمایی",
    "lesson": 18,
    "pos": "n.",
    "lessonLabel": "داستان ۱۸"
  },
  {
    "word": "Hawaiian Airlines",
    "meaning": "شرکت هواپیمایی هاوایی",
    "lesson": 18,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۸"
  },
  {
    "word": "fat man",
    "meaning": "مرد چاق",
    "lesson": 18,
    "pos": "n.",
    "lessonLabel": "داستان ۱۸"
  },
  {
    "word": "clerk",
    "meaning": "کارمند",
    "lesson": 18,
    "pos": "n.",
    "lessonLabel": "داستان ۱۸"
  },
  {
    "word": "without my clothes",
    "meaning": "بدون لباس",
    "lesson": 18,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۸"
  },
  {
    "word": "planning to travel",
    "meaning": "قصد سفر کردن",
    "lesson": 18,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۸"
  },
  {
    "word": "strong",
    "meaning": "محکم",
    "lesson": 18,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۸"
  },
  {
    "word": "size",
    "meaning": "اندازه",
    "lesson": 18,
    "pos": "n.",
    "lessonLabel": "داستان ۱۸"
  },
  {
    "word": "weight",
    "meaning": "وزن",
    "lesson": 18,
    "pos": "n.",
    "lessonLabel": "داستان ۱۸"
  },
  {
    "word": "seconds",
    "meaning": "ثانیه‌ها",
    "lesson": 18,
    "pos": "n.",
    "lessonLabel": "داستان ۱۸"
  },
  {
    "word": "stayed with",
    "meaning": "نزد ... اقامت کردن",
    "lesson": 19,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۹"
  },
  {
    "word": "grandparents",
    "meaning": "پدربزرگ و مادربزرگ",
    "lesson": 19,
    "pos": "n.",
    "lessonLabel": "داستان ۱۹"
  },
  {
    "word": "interesting things",
    "meaning": "چیزهای جالب",
    "lesson": 19,
    "pos": "n.",
    "lessonLabel": "داستان ۱۹"
  },
  {
    "word": "born",
    "meaning": "متولد شدن",
    "lesson": 19,
    "pos": "v.",
    "lessonLabel": "داستان ۱۹"
  },
  {
    "word": "Daddy",
    "meaning": "پapa",
    "lesson": 19,
    "pos": "n.",
    "lessonLabel": "داستان ۱۹"
  },
  {
    "word": "really",
    "meaning": "واقعاً، به طور واقعی",
    "lesson": 19,
    "pos": "adv.",
    "lessonLabel": "داستان ۱۹"
  },
  {
    "word": "continued",
    "meaning": "ادامه داد",
    "lesson": 19,
    "pos": "v.",
    "lessonLabel": "داستان ۱۹"
  },
  {
    "word": "Granny",
    "meaning": "مادربزرگ",
    "lesson": 19,
    "pos": "n.",
    "lessonLabel": "داستان ۱۹"
  },
  {
    "word": "couldn't understand",
    "meaning": "نمی‌توانست بفهمد",
    "lesson": 19,
    "pos": "expr.",
    "lessonLabel": "داستان ۱۹"
  },
  {
    "word": "headwords",
    "meaning": "واژه‌های کلیدی",
    "lesson": 19,
    "pos": "n.",
    "lessonLabel": "داستان ۱۹"
  },
  {
    "word": "games",
    "meaning": "بازی‌ها",
    "lesson": 20,
    "pos": "n.",
    "lessonLabel": "داستان ۲۰"
  },
  {
    "word": "thin",
    "meaning": "لاغر",
    "lesson": 20,
    "pos": "adj.",
    "lessonLabel": "داستان ۲۰"
  },
  {
    "word": "fat",
    "meaning": "چاق",
    "lesson": 20,
    "pos": "adj.",
    "lessonLabel": "داستان ۲۰"
  },
  {
    "word": "slow",
    "meaning": "کند",
    "lesson": 20,
    "pos": "adj.",
    "lessonLabel": "داستان ۲۰"
  },
  {
    "word": "breathe",
    "meaning": "نفس کشیدن",
    "lesson": 20,
    "pos": "v.",
    "lessonLabel": "داستان ۲۰"
  },
  {
    "word": "heart",
    "meaning": "قلب",
    "lesson": 20,
    "pos": "n.",
    "lessonLabel": "داستان ۲۰"
  },
  {
    "word": "beat painfully",
    "meaning": "دردناک تپیدن",
    "lesson": 20,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۰"
  },
  {
    "word": "anxious",
    "meaning": "نگران",
    "lesson": 20,
    "pos": "adj.",
    "lessonLabel": "داستان ۲۰"
  },
  {
    "word": "mislead",
    "meaning": "گمراه کردن",
    "lesson": 20,
    "pos": "v.",
    "lessonLabel": "داستان ۲۰"
  },
  {
    "word": "unlikely",
    "meaning": "غیرمحتمل",
    "lesson": 20,
    "pos": "adj.",
    "lessonLabel": "داستان ۲۰"
  },
  {
    "word": "arrange",
    "meaning": "فراهم کردن",
    "lesson": 20,
    "pos": "v.",
    "lessonLabel": "داستان ۲۰"
  },
  {
    "word": "trust",
    "meaning": "اعتماد کردن",
    "lesson": 20,
    "pos": "v.",
    "lessonLabel": "داستان ۲۰"
  },
  {
    "word": "love the sound of their own voice",
    "meaning": "عاشق صدای خودش بودن",
    "lesson": 21,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۱"
  },
  {
    "word": "talked and talked",
    "meaning": "مدام حرف زدن",
    "lesson": 21,
    "pos": "expr.",
    "lessonLabel": "داستان ۲۱"
  },
  {
    "word": "reminded him of",
    "meaning": "یادش می‌انداخت",
    "lesson": 21,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۱"
  },
  {
    "word": "invited to a party",
    "meaning": "به مهمانی دعوت شدن",
    "lesson": 21,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۱"
  },
  {
    "word": "met only a few days before",
    "meaning": "فقط چند روز پیش ملاقات شده بود",
    "lesson": 21,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۱"
  },
  {
    "word": "did not know him very well yet",
    "meaning": "هنوز او را خوب نمی‌شناخت",
    "lesson": 21,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۱"
  },
  {
    "word": "a good meal",
    "meaning": "یک شام خوب",
    "lesson": 21,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۱"
  },
  {
    "word": "music and dancing",
    "meaning": "موسیقی و رقص",
    "lesson": 21,
    "pos": "n.",
    "lessonLabel": "داستان ۲۱"
  },
  {
    "word": "a pretty girl",
    "meaning": "یک دختر زیبا",
    "lesson": 21,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۱"
  },
  {
    "word": "suggested that",
    "meaning": "پیشنهاد داد",
    "lesson": 21,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۱"
  },
  {
    "word": "reminds me of",
    "meaning": "یادم می‌اندازد",
    "lesson": 21,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۱"
  },
  {
    "word": "look how late it is",
    "meaning": "نگاه کن چه وقت شده",
    "lesson": 21,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۱"
  },
  {
    "word": "I must go",
    "meaning": "باید بروم",
    "lesson": 21,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۱"
  },
  {
    "word": "cut him off",
    "meaning": "او را قطع کردن",
    "lesson": 21,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۱"
  },
  {
    "word": "monologue",
    "meaning": "تک‌گویی",
    "lesson": 21,
    "pos": "n.",
    "lessonLabel": "داستان ۲۱"
  },
  {
    "word": "rambling",
    "meaning": "گنگ و بی‌هدف",
    "lesson": 21,
    "pos": "adj.",
    "lessonLabel": "داستان ۲۱"
  },
  {
    "word": "pupil",
    "meaning": "شاگرد",
    "lesson": 22,
    "pos": "n.",
    "lessonLabel": "داستان ۲۲"
  },
  {
    "word": "lazy",
    "meaning": "تنبل",
    "lesson": 22,
    "pos": "adj.",
    "lessonLabel": "داستان ۲۲"
  },
  {
    "word": "rude",
    "meaning": "بی‌ادب",
    "lesson": 22,
    "pos": "adj.",
    "lessonLabel": "داستان ۲۲"
  },
  {
    "word": "obey the rules",
    "meaning": "قانون را رعایت کردن",
    "lesson": 22,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۲"
  },
  {
    "word": "headmaster",
    "meaning": "مدیر مدرسه",
    "lesson": 22,
    "pos": "n.",
    "lessonLabel": "داستان ۲۲"
  },
  {
    "word": "behave",
    "meaning": "رفتار کردن",
    "lesson": 22,
    "pos": "v.",
    "lessonLabel": "داستان ۲۲"
  },
  {
    "word": "influence",
    "meaning": "تأثیر",
    "lesson": 22,
    "pos": "n.",
    "lessonLabel": "داستان ۲۲"
  },
  {
    "word": "get a job",
    "meaning": "شاغل شدن",
    "lesson": 22,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۲"
  },
  {
    "word": "honest",
    "meaning": "صادق",
    "lesson": 22,
    "pos": "adj.",
    "lessonLabel": "داستان ۲۲"
  },
  {
    "word": "lucky",
    "meaning": "خوش‌شانس",
    "lesson": 22,
    "pos": "adj.",
    "lessonLabel": "داستان ۲۲"
  },
  {
    "word": "came to",
    "meaning": "نزد کسی رفت",
    "lesson": 23,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۳"
  },
  {
    "word": "having her breakfast",
    "meaning": "صبحانه خوردن",
    "lesson": 23,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۳"
  },
  {
    "word": "cleaners",
    "meaning": "نظافتچی‌ها",
    "lesson": 23,
    "pos": "n.",
    "lessonLabel": "داستان ۲۳"
  },
  {
    "word": "bus drivers",
    "meaning": "رانندگان اتوبوس",
    "lesson": 23,
    "pos": "n.",
    "lessonLabel": "داستان ۲۳"
  },
  {
    "word": "perhaps",
    "meaning": "شاید",
    "lesson": 23,
    "pos": "adv.",
    "lessonLabel": "داستان ۲۳"
  },
  {
    "word": "responsible",
    "meaning": "مقصر",
    "lesson": 23,
    "pos": "adj.",
    "lessonLabel": "داستان ۲۳"
  },
  {
    "word": "change",
    "meaning": "تغییر کردن",
    "lesson": 23,
    "pos": "v.",
    "lessonLabel": "داستان ۲۳"
  },
  {
    "word": "garage",
    "meaning": "گاراژ",
    "lesson": 23,
    "pos": "n.",
    "lessonLabel": "داستان ۲۳"
  },
  {
    "word": "besides that",
    "meaning": "علاوه بر این",
    "lesson": 23,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۳"
  },
  {
    "word": "quite well",
    "meaning": "کاملاً سالم",
    "lesson": 23,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۳"
  },
  {
    "word": "doctor's wife",
    "meaning": "همسر دکتر",
    "lesson": 24,
    "pos": "n. phr.",
    "lessonLabel": "داستان ۲۴"
  },
  {
    "word": "neighbour",
    "meaning": "همسایه",
    "lesson": 24,
    "pos": "n.",
    "lessonLabel": "داستان ۲۴"
  },
  {
    "word": "shopping",
    "meaning": "خرید",
    "lesson": 24,
    "pos": "n.",
    "lessonLabel": "داستان ۲۴"
  },
  {
    "word": "ill",
    "meaning": "بیمار",
    "lesson": 24,
    "pos": "adj.",
    "lessonLabel": "داستان ۲۴"
  },
  {
    "word": "sheep's kidney",
    "meaning": "کلیهٔ گوسفندی",
    "lesson": 24,
    "pos": "n. phr.",
    "lessonLabel": "داستان ۲۴"
  },
  {
    "word": "waiting-room",
    "meaning": "اتاق انتظار",
    "lesson": 24,
    "pos": "n.",
    "lessonLabel": "داستان ۲۴"
  },
  {
    "word": "lavatory",
    "meaning": "دستشرفته",
    "lesson": 24,
    "pos": "n.",
    "lessonLabel": "داستان ۲۴"
  },
  {
    "word": "crowded",
    "meaning": "شلوغ",
    "lesson": 24,
    "pos": "adj.",
    "lessonLabel": "داستان ۲۴"
  },
  {
    "word": "catch",
    "meaning": "گرفتن",
    "lesson": 24,
    "pos": "v.",
    "lessonLabel": "داستان ۲۴"
  },
  {
    "word": "parcel",
    "meaning": "بسته",
    "lesson": 24,
    "pos": "n.",
    "lessonLabel": "داستان ۲۴"
  },
  {
    "word": "offer",
    "meaning": "پیشنهاد دادن",
    "lesson": 24,
    "pos": "v.",
    "lessonLabel": "داستان ۲۴"
  },
  {
    "word": "just in time",
    "meaning": "درست به موقع",
    "lesson": 24,
    "pos": "adv. phr.",
    "lessonLabel": "داستان ۲۴"
  },
  {
    "word": "shouted",
    "meaning": "فریاد زد",
    "lesson": 24,
    "pos": "v.",
    "lessonLabel": "داستان ۲۴"
  },
  {
    "word": "hated",
    "meaning": "ناپسندید، از متنفر بود",
    "lesson": 25,
    "pos": "v.",
    "lessonLabel": "داستان ۲۵"
  },
  {
    "word": "hard work",
    "meaning": "کار سخت، تلاش زیاد",
    "lesson": 25,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۵"
  },
  {
    "word": "government",
    "meaning": "دولت، حکومت",
    "lesson": 25,
    "pos": "n.",
    "lessonLabel": "داستان ۲۵"
  },
  {
    "word": "thief",
    "meaning": "دزد",
    "lesson": 25,
    "pos": "n.",
    "lessonLabel": "داستان ۲۵"
  },
  {
    "word": "stealing",
    "meaning": "دزدی، سرقت",
    "lesson": 25,
    "pos": "n.",
    "lessonLabel": "داستان ۲۵"
  },
  {
    "word": "arranged",
    "meaning": "برنامه‌ریزی کرد، چید",
    "lesson": 25,
    "pos": "v.",
    "lessonLabel": "داستان ۲۵"
  },
  {
    "word": "rob",
    "meaning": "دزدی کردن، غارت کردن",
    "lesson": 25,
    "pos": "v.",
    "lessonLabel": "داستان ۲۵"
  },
  {
    "word": "duet",
    "meaning": "دو نوازی",
    "lesson": 25,
    "pos": "n.",
    "lessonLabel": "داستان ۲۵"
  },
  {
    "word": "piano",
    "meaning": "پیانو",
    "lesson": 25,
    "pos": "n.",
    "lessonLabel": "داستان ۲۵"
  },
  {
    "word": "bar",
    "meaning": "بار",
    "lesson": 26,
    "pos": "n.",
    "lessonLabel": "داستان ۲۶"
  },
  {
    "word": "seldom",
    "meaning": "به ندرت",
    "lesson": 26,
    "pos": "adv.",
    "lessonLabel": "داستان ۲۶"
  },
  {
    "word": "draughts",
    "meaning": "دوز (بازی تخته‌ای)",
    "lesson": 26,
    "pos": "n.",
    "lessonLabel": "داستان ۲۶"
  },
  {
    "word": "opposite",
    "meaning": "روبروی",
    "lesson": 26,
    "pos": "prep.",
    "lessonLabel": "داستان ۲۶"
  },
  {
    "word": "surprised",
    "meaning": "متعجب",
    "lesson": 26,
    "pos": "adj.",
    "lessonLabel": "داستان ۲۶"
  },
  {
    "word": "clever",
    "meaning": "باهوش",
    "lesson": 26,
    "pos": "adj.",
    "lessonLabel": "داستان ۲۶"
  },
  {
    "word": "back legs",
    "meaning": "پاهای عقب",
    "lesson": 26,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۶"
  },
  {
    "word": "watched",
    "meaning": "تماشا کرد",
    "lesson": 26,
    "pos": "v.",
    "lessonLabel": "داستان ۲۶"
  },
  {
    "word": "lost",
    "meaning": "باخت",
    "lesson": 26,
    "pos": "v.",
    "lessonLabel": "داستان ۲۶"
  },
  {
    "word": "win",
    "meaning": "برنده شدن",
    "lesson": 26,
    "pos": "v.",
    "lessonLabel": "داستان ۲۶"
  },
  {
    "word": "charges",
    "meaning": "هزینه دریافت می‌کند",
    "lesson": 27,
    "pos": "v.",
    "lessonLabel": "داستان ۲۷"
  },
  {
    "word": "patients",
    "meaning": "بیماران",
    "lesson": 27,
    "pos": "n.",
    "lessonLabel": "داستان ۲۷"
  },
  {
    "word": "visit",
    "meaning": "ملاقات",
    "lesson": 27,
    "pos": "n.",
    "lessonLabel": "داستان ۲۷"
  },
  {
    "word": "save",
    "meaning": "پس‌انداز کردن",
    "lesson": 27,
    "pos": "v.",
    "lessonLabel": "داستان ۲۷"
  },
  {
    "word": "nodded",
    "meaning": "سرش را تکان داد",
    "lesson": 27,
    "pos": "v.",
    "lessonLabel": "داستان ۲۷"
  },
  {
    "word": "examined",
    "meaning": "معاینه کرد",
    "lesson": 27,
    "pos": "v.",
    "lessonLabel": "داستان ۲۷"
  },
  {
    "word": "continue",
    "meaning": "ادامه دادن",
    "lesson": 27,
    "pos": "v.",
    "lessonLabel": "داستان ۲۷"
  },
  {
    "word": "medicine",
    "meaning": "دارو",
    "lesson": 27,
    "pos": "n.",
    "lessonLabel": "داستان ۲۷"
  },
  {
    "word": "feeling well",
    "meaning": "احساس خوبی داشتن",
    "lesson": 27,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۷"
  },
  {
    "word": "as it should do",
    "meaning": "همانطور که باید باشد",
    "lesson": 27,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۷"
  },
  {
    "word": "restaurant",
    "meaning": "رستوران",
    "lesson": 28,
    "pos": "n.",
    "lessonLabel": "داستان ۲۸"
  },
  {
    "word": "port",
    "meaning": "بندر",
    "lesson": 28,
    "pos": "n.",
    "lessonLabel": "داستان ۲۸"
  },
  {
    "word": "waitress",
    "meaning": "گارسون زن",
    "lesson": 28,
    "pos": "n.",
    "lessonLabel": "داستان ۲۸"
  },
  {
    "word": "cook",
    "meaning": "آشپز",
    "lesson": 28,
    "pos": "n.",
    "lessonLabel": "داستان ۲۸"
  },
  {
    "word": "sailor",
    "meaning": "ملوان",
    "lesson": 28,
    "pos": "n.",
    "lessonLabel": "داستان ۲۸"
  },
  {
    "word": "fried rabbit",
    "meaning": "خرچنگ سرخ‌شده",
    "lesson": 28,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۸"
  },
  {
    "word": "terrible noise",
    "meaning": "صدای وحشتناک",
    "lesson": 28,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۸"
  },
  {
    "word": "quickly",
    "meaning": "به سرعت",
    "lesson": 28,
    "pos": "adv.",
    "lessonLabel": "داستان ۲۸"
  },
  {
    "word": "by mistake",
    "meaning": "اشتباهی",
    "lesson": 28,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۸"
  },
  {
    "word": "stepped on",
    "meaning": "روی چیزی قدم گذاشتن",
    "lesson": 28,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۸"
  },
  {
    "word": "instead of",
    "meaning": "به جای",
    "lesson": 28,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۸"
  },
  {
    "word": "prison",
    "meaning": "زندان",
    "lesson": 29,
    "pos": "n.",
    "lessonLabel": "داستان ۲۹"
  },
  {
    "word": "prisoners",
    "meaning": "زندانیان",
    "lesson": 29,
    "pos": "n.",
    "lessonLabel": "داستان ۲۹"
  },
  {
    "word": "guards",
    "meaning": "نگهبانان",
    "lesson": 29,
    "pos": "n.",
    "lessonLabel": "داستان ۲۹"
  },
  {
    "word": "farms",
    "meaning": "مزارع",
    "lesson": 29,
    "pos": "n.",
    "lessonLabel": "داستان ۲۹"
  },
  {
    "word": "promise",
    "meaning": "قول دادن",
    "lesson": 29,
    "pos": "v.",
    "lessonLabel": "داستان ۲۹"
  },
  {
    "word": "disturbed",
    "meaning": "مزاحم شده",
    "lesson": 29,
    "pos": "adj.",
    "lessonLabel": "داستان ۲۹"
  },
  {
    "word": "angrily",
    "meaning": "با عصبانیت",
    "lesson": 29,
    "pos": "adv.",
    "lessonLabel": "داستان ۲۹"
  },
  {
    "word": "let in",
    "meaning": "درون کردن",
    "lesson": 29,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۹"
  },
  {
    "word": "invited",
    "meaning": "دعوت شده",
    "lesson": 29,
    "pos": "adj.",
    "lessonLabel": "داستان ۲۹"
  },
  {
    "word": "knock",
    "meaning": "زدن",
    "lesson": 29,
    "pos": "v.",
    "lessonLabel": "داستان ۲۹"
  },
  {
    "word": "threaten",
    "meaning": "تهدید کردن",
    "lesson": 29,
    "pos": "v.",
    "lessonLabel": "داستان ۲۹"
  },
  {
    "word": "evening meal",
    "meaning": "شام",
    "lesson": 29,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۹"
  },
  {
    "word": "painting lessons",
    "meaning": "دروس نقاشی",
    "lesson": 30,
    "pos": "phr.",
    "lessonLabel": "داستان ۳۰"
  },
  {
    "word": "private class",
    "meaning": "کلاس خصوصی",
    "lesson": 30,
    "pos": "n.",
    "lessonLabel": "داستان ۳۰"
  },
  {
    "word": "Christmas holidays",
    "meaning": "تعطیلات کریسمس",
    "lesson": 30,
    "pos": "n.",
    "lessonLabel": "داستان ۳۰"
  },
  {
    "word": "telephone book",
    "meaning": "دفتر تلفن",
    "lesson": 30,
    "pos": "n.",
    "lessonLabel": "داستان ۳۰"
  },
  {
    "word": "daughter",
    "meaning": "دختر",
    "lesson": 30,
    "pos": "n.",
    "lessonLabel": "داستان ۳۰"
  },
  {
    "word": "rather a long time",
    "meaning": "مدتی طولانی",
    "lesson": 30,
    "pos": "phr.",
    "lessonLabel": "داستان ۳۰"
  },
  {
    "word": "excuse me",
    "meaning": "ببخشید",
    "lesson": 30,
    "pos": "expr.",
    "lessonLabel": "داستان ۳۰"
  },
  {
    "word": "get out of her bath",
    "meaning": "از وان حمام بیرون آمدن",
    "lesson": 30,
    "pos": "phr.",
    "lessonLabel": "داستان ۳۰"
  },
  {
    "word": "answer the telephone",
    "meaning": "پاسخ دادن به تلفن",
    "lesson": 30,
    "pos": "phr.",
    "lessonLabel": "داستان ۳۰"
  },
  {
    "word": "invite",
    "meaning": "دعوت کردن",
    "lesson": 30,
    "pos": "v.",
    "lessonLabel": "داستان ۳۰"
  },
  {
    "word": "address",
    "meaning": "آدرس",
    "lesson": 30,
    "pos": "n.",
    "lessonLabel": "داستان ۳۰"
  },
  {
    "word": "annoyed",
    "meaning": "ناراحت",
    "lesson": 30,
    "pos": "adj.",
    "lessonLabel": "داستان ۳۰"
  },
  {
    "word": "inconvenienced",
    "meaning": "مزاحم شده",
    "lesson": 30,
    "pos": "adj.",
    "lessonLabel": "داستان ۳۰"
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
