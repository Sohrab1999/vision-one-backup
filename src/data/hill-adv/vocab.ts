// واژگان داستان‌های Advanced Steps to Understanding — کلیدواژه‌های هر داستان با معنی فارسی
// lesson = شمارهٔ داستان (۱ تا 20)
import type { VocabEntry, VocabWord } from "../types";

type Row = Omit<VocabWord, "lesson"> & { lesson: number; lessonLabel: string };

const ROWS: Row[] = [
  {
    "word": "driving examiner",
    "meaning": "کارشناس آزمون رانندگی",
    "lesson": 1,
    "pos": "n.",
    "lessonLabel": "داستان ۱"
  },
  {
    "word": "driving-licence",
    "meaning": "گواهینامه رانندگی",
    "lesson": 1,
    "pos": "n.",
    "lessonLabel": "داستان ۱"
  },
  {
    "word": "faultlessly",
    "meaning": "بدون هیچ نقصی",
    "lesson": 1,
    "pos": "adv.",
    "lessonLabel": "داستان ۱"
  },
  {
    "word": "promptly",
    "meaning": "سریع و به موقع",
    "lesson": 1,
    "pos": "adv.",
    "lessonLabel": "داستان ۱"
  },
  {
    "word": "side road",
    "meaning": "کوچه یا فرعی جاده",
    "lesson": 1,
    "pos": "n.",
    "lessonLabel": "داستان ۱"
  },
  {
    "word": "passing through",
    "meaning": "عبور کردن از",
    "lesson": 1,
    "pos": "phr.",
    "lessonLabel": "داستان ۱"
  },
  {
    "word": "look at my map",
    "meaning": "نگاه کردن به نقشه‌ام",
    "lesson": 1,
    "pos": "phr.",
    "lessonLabel": "داستان ۱"
  },
  {
    "word": "check the lights",
    "meaning": "بررسی کردن چراغ‌ها",
    "lesson": 1,
    "pos": "phr.",
    "lessonLabel": "داستان ۱"
  },
  {
    "word": "check the brakes",
    "meaning": "بررسی کردن ترمزها",
    "lesson": 1,
    "pos": "phr.",
    "lessonLabel": "داستان ۱"
  },
  {
    "word": "start his engine",
    "meaning": "روشن کردن موتور",
    "lesson": 1,
    "pos": "phr.",
    "lessonLabel": "داستان ۱"
  },
  {
    "word": "drive forward",
    "meaning": "رانندگی به جلو",
    "lesson": 1,
    "pos": "phr.",
    "lessonLabel": "داستان ۱"
  },
  {
    "word": "turn right",
    "meaning": "پیچیدن به راست",
    "lesson": 1,
    "pos": "phr.",
    "lessonLabel": "داستان ۱"
  },
  {
    "word": "go backwards",
    "meaning": "رفتن به عقب",
    "lesson": 1,
    "pos": "phr.",
    "lessonLabel": "داستان ۱"
  },
  {
    "word": "by mistake",
    "meaning": "اشتباهی",
    "lesson": 1,
    "pos": "phr.",
    "lessonLabel": "داستان ۱"
  },
  {
    "word": "politely",
    "meaning": "با ادب و محترمانه",
    "lesson": 1,
    "pos": "adv.",
    "lessonLabel": "داستان ۱"
  },
  {
    "word": "reporter",
    "meaning": "روزنامه‌نگار",
    "lesson": 2,
    "pos": "n.",
    "lessonLabel": "داستان ۲"
  },
  {
    "word": "newspaper",
    "meaning": "روزنامه",
    "lesson": 2,
    "pos": "n.",
    "lessonLabel": "داستان ۲"
  },
  {
    "word": "local",
    "meaning": "محلی",
    "lesson": 2,
    "pos": "adj.",
    "lessonLabel": "داستان ۲"
  },
  {
    "word": "boss",
    "meaning": "مدیر، سرپرست",
    "lesson": 2,
    "pos": "n.",
    "lessonLabel": "داستان ۲"
  },
  {
    "word": "speech",
    "meaning": "سخنرانی",
    "lesson": 2,
    "pos": "n.",
    "lessonLabel": "داستان ۲"
  },
  {
    "word": "report on",
    "meaning": "گزارش کردن درباره",
    "lesson": 2,
    "pos": "phr.",
    "lessonLabel": "داستان ۲"
  },
  {
    "word": "terrible",
    "meaning": "فاجعه‌بار، بسیار بد",
    "lesson": 2,
    "pos": "adj.",
    "lessonLabel": "داستان ۲"
  },
  {
    "word": "fool",
    "meaning": "احمق",
    "lesson": 2,
    "pos": "n.",
    "lessonLabel": "داستان ۲"
  },
  {
    "word": "politician",
    "meaning": "سیاستمدار",
    "lesson": 2,
    "pos": "n.",
    "lessonLabel": "داستان ۲"
  },
  {
    "word": "without stopping",
    "meaning": "بدون توقف",
    "lesson": 2,
    "pos": "phr.",
    "lessonLabel": "داستان ۲"
  },
  {
    "word": "absolutely",
    "meaning": "مطلقاً، کاملاً",
    "lesson": 2,
    "pos": "adv.",
    "lessonLabel": "داستان ۲"
  },
  {
    "word": "columns",
    "meaning": "ستون‌های روزنامه",
    "lesson": 2,
    "pos": "n.",
    "lessonLabel": "داستان ۲"
  },
  {
    "word": "friends",
    "meaning": "دوستان",
    "lesson": 4,
    "pos": "n.",
    "lessonLabel": "داستان ۴"
  },
  {
    "word": "sitting in a train",
    "meaning": "نشسته در قطار",
    "lesson": 4,
    "pos": "phr.",
    "lessonLabel": "داستان ۴"
  },
  {
    "word": "election",
    "meaning": "انتخابات",
    "lesson": 4,
    "pos": "n.",
    "lessonLabel": "داستان ۴"
  },
  {
    "word": "politics",
    "meaning": "سیاست",
    "lesson": 4,
    "pos": "n.",
    "lessonLabel": "داستان ۴"
  },
  {
    "word": "supported",
    "meaning": "حمایت می‌کرد",
    "lesson": 4,
    "pos": "v.",
    "lessonLabel": "داستان ۴"
  },
  {
    "word": "Labour Party",
    "meaning": "حزب کارگران",
    "lesson": 4,
    "pos": "n.",
    "lessonLabel": "داستان ۴"
  },
  {
    "word": "argue",
    "meaning": "بحث کردن",
    "lesson": 4,
    "pos": "v.",
    "lessonLabel": "داستان ۴"
  },
  {
    "word": "Conservatives",
    "meaning": "محافظه‌کاران",
    "lesson": 4,
    "pos": "n.",
    "lessonLabel": "داستان ۴"
  },
  {
    "word": "change one's mind",
    "meaning": "تغییر نظر دادن",
    "lesson": 4,
    "pos": "phr.",
    "lessonLabel": "داستان ۴"
  },
  {
    "word": "agreement",
    "meaning": "توافق",
    "lesson": 4,
    "pos": "n.",
    "lessonLabel": "داستان ۴"
  },
  {
    "word": "vote",
    "meaning": "رأی دادن",
    "lesson": 4,
    "pos": "v.",
    "lessonLabel": "داستان ۴"
  },
  {
    "word": "stay at home",
    "meaning": "در خانه ماندن",
    "lesson": 4,
    "pos": "phr.",
    "lessonLabel": "داستان ۴"
  },
  {
    "word": "got out",
    "meaning": "پیاده شدن",
    "lesson": 4,
    "pos": "phr.",
    "lessonLabel": "داستان ۴"
  },
  {
    "word": "drove",
    "meaning": "رانندگی کردن",
    "lesson": 4,
    "pos": "v.",
    "lessonLabel": "داستان ۴"
  },
  {
    "word": "fifteenth person",
    "meaning": "پانزدهمین شخص",
    "lesson": 4,
    "pos": "n.",
    "lessonLabel": "داستان ۴"
  },
  {
    "word": "queuing",
    "meaning": "در صف ایستادن",
    "lesson": 5,
    "pos": "v.",
    "lessonLabel": "داستان ۵"
  },
  {
    "word": "Scala Theatre",
    "meaning": "تئاتر اسکالا",
    "lesson": 5,
    "pos": "n.",
    "lessonLabel": "داستان ۵"
  },
  {
    "word": "trumpet",
    "meaning": "ترومپت",
    "lesson": 5,
    "pos": "n.",
    "lessonLabel": "داستان ۵"
  },
  {
    "word": "beggar",
    "meaning": "گدا",
    "lesson": 5,
    "pos": "n.",
    "lessonLabel": "داستان ۵"
  },
  {
    "word": "practise",
    "meaning": "تمرین کردن",
    "lesson": 5,
    "pos": "v.",
    "lessonLabel": "داستان ۵"
  },
  {
    "word": "fresh air",
    "meaning": "هوای تازه",
    "lesson": 5,
    "pos": "phr.",
    "lessonLabel": "داستان ۵"
  },
  {
    "word": "entertained",
    "meaning": "سرگرم کردن",
    "lesson": 5,
    "pos": "v.",
    "lessonLabel": "داستان ۵"
  },
  {
    "word": "queue",
    "meaning": "صف",
    "lesson": 5,
    "pos": "n.",
    "lessonLabel": "داستان ۵"
  },
  {
    "word": "popular",
    "meaning": "محبوب",
    "lesson": 5,
    "pos": "adj.",
    "lessonLabel": "داستان ۵"
  },
  {
    "word": "studying",
    "meaning": "در حال تحصیل",
    "lesson": 5,
    "pos": "v.",
    "lessonLabel": "داستان ۵"
  },
  {
    "word": "band",
    "meaning": "ارکستر",
    "lesson": 5,
    "pos": "n.",
    "lessonLabel": "داستان ۵"
  },
  {
    "word": "several",
    "meaning": "چندین",
    "lesson": 5,
    "pos": "adj.",
    "lessonLabel": "داستان ۵"
  },
  {
    "word": "hearing-aid",
    "meaning": "دستگاه کم‌شنوایی",
    "lesson": 6,
    "pos": "n.",
    "lessonLabel": "داستان ۶"
  },
  {
    "word": "gentleman",
    "meaning": "آقای مسن/مجید",
    "lesson": 6,
    "pos": "n.",
    "lessonLabel": "داستان ۶"
  },
  {
    "word": "faulty",
    "meaning": "معیوب، خراب",
    "lesson": 6,
    "pos": "adj.",
    "lessonLabel": "داستان ۶"
  },
  {
    "word": "deaf",
    "meaning": "ناشنوا",
    "lesson": 6,
    "pos": "adj.",
    "lessonLabel": "داستان ۶"
  },
  {
    "word": "loudly",
    "meaning": "با صدای بلند",
    "lesson": 6,
    "pos": "adv.",
    "lessonLabel": "داستان ۶"
  },
  {
    "word": "shouted",
    "meaning": "فریاد زد",
    "lesson": 6,
    "pos": "v.",
    "lessonLabel": "داستان ۶"
  },
  {
    "word": "operation",
    "meaning": "عمل جراحی",
    "lesson": 6,
    "pos": "n.",
    "lessonLabel": "داستان ۶"
  },
  {
    "word": "throat",
    "meaning": "گلو",
    "lesson": 6,
    "pos": "n.",
    "lessonLabel": "داستان ۶"
  },
  {
    "word": "piece of paper",
    "meaning": "تکه کاغذ",
    "lesson": 6,
    "pos": "phr.",
    "lessonLabel": "داستان ۶"
  },
  {
    "word": "repaired",
    "meaning": "تعمیر کرد",
    "lesson": 6,
    "pos": "v.",
    "lessonLabel": "داستان ۶"
  },
  {
    "word": "entered",
    "meaning": "وارد شد",
    "lesson": 6,
    "pos": "v.",
    "lessonLabel": "داستان ۶"
  },
  {
    "word": "necessary",
    "meaning": "لازم، ضروری",
    "lesson": 6,
    "pos": "adj.",
    "lessonLabel": "داستان ۶"
  },
  {
    "word": "court",
    "meaning": "دادگاه",
    "lesson": 7,
    "pos": "n.",
    "lessonLabel": "داستان ۷"
  },
  {
    "word": "accusing",
    "meaning": "متهم کردن",
    "lesson": 7,
    "pos": "v.",
    "lessonLabel": "داستان ۷"
  },
  {
    "word": "neighbour",
    "meaning": "همسایه",
    "lesson": 7,
    "pos": "n.",
    "lessonLabel": "داستان ۷"
  },
  {
    "word": "arrangement",
    "meaning": "توافق، ترتیب",
    "lesson": 7,
    "pos": "n.",
    "lessonLabel": "داستان ۷"
  },
  {
    "word": "settle the matter",
    "meaning": "حل مسئله",
    "lesson": 7,
    "pos": "phr.",
    "lessonLabel": "داستان ۷"
  },
  {
    "word": "representing",
    "meaning": "وکالت کردن",
    "lesson": 7,
    "pos": "v.",
    "lessonLabel": "داستان ۷"
  },
  {
    "word": "action",
    "meaning": "دادخواست، شکایت",
    "lesson": 7,
    "pos": "n.",
    "lessonLabel": "داستان ۷"
  },
  {
    "word": "take",
    "meaning": "قبول کردن، دریافت کردن",
    "lesson": 7,
    "pos": "v.",
    "lessonLabel": "داستان ۷"
  },
  {
    "word": "damage",
    "meaning": "خراب کردن، آسیب زدن",
    "lesson": 7,
    "pos": "v.",
    "lessonLabel": "داستان ۷"
  },
  {
    "word": "chickens",
    "meaning": "مرغ‌ها",
    "lesson": 7,
    "pos": "n.",
    "lessonLabel": "داستان ۷"
  },
  {
    "word": "cheapest",
    "meaning": "ارزان‌ترین",
    "lesson": 7,
    "pos": "adj.",
    "lessonLabel": "داستان ۷"
  },
  {
    "word": "repeat",
    "meaning": "تکرار کردن",
    "lesson": 7,
    "pos": "v.",
    "lessonLabel": "داستان ۷"
  },
  {
    "word": "bored with",
    "meaning": "خسته شده از",
    "lesson": 8,
    "pos": "phr.",
    "lessonLabel": "داستان ۸"
  },
  {
    "word": "desired to",
    "meaning": "میل داشت به",
    "lesson": 8,
    "pos": "phr.",
    "lessonLabel": "داستان ۸"
  },
  {
    "word": "within a stone's throw",
    "meaning": "در فاصله یک پرتاب سنگ",
    "lesson": 8,
    "pos": "expr.",
    "lessonLabel": "داستان ۸"
  },
  {
    "word": "frequent",
    "meaning": "مکرر",
    "lesson": 8,
    "pos": "adj.",
    "lessonLabel": "داستان ۸"
  },
  {
    "word": "house agency",
    "meaning": "آژانس املاک",
    "lesson": 8,
    "pos": "n.",
    "lessonLabel": "داستان ۸"
  },
  {
    "word": "arranged to",
    "meaning": "ترتیب داد به",
    "lesson": 8,
    "pos": "phr.",
    "lessonLabel": "داستان ۸"
  },
  {
    "word": "have a look at",
    "meaning": "نگاه کردن به",
    "lesson": 8,
    "pos": "phr.",
    "lessonLabel": "داستان ۸"
  },
  {
    "word": "house agent",
    "meaning": "نماینده املاک",
    "lesson": 8,
    "pos": "n.",
    "lessonLabel": "داستان ۸"
  },
  {
    "word": "objected",
    "meaning": "اعتراض کرد",
    "lesson": 8,
    "pos": "v.",
    "lessonLabel": "داستان ۸"
  },
  {
    "word": "claimed",
    "meaning": "ادعا کرد",
    "lesson": 8,
    "pos": "v.",
    "lessonLabel": "داستان ۸"
  },
  {
    "word": "met him",
    "meaning": "به او رسید",
    "lesson": 8,
    "pos": "phr.",
    "lessonLabel": "داستان ۸"
  },
  {
    "word": "at least",
    "meaning": "حداقل",
    "lesson": 8,
    "pos": "phr.",
    "lessonLabel": "داستان ۸"
  },
  {
    "word": "famous writer",
    "meaning": "نویسنده مشهور",
    "lesson": 9,
    "pos": "n. phr.",
    "lessonLabel": "داستان ۹"
  },
  {
    "word": "interpreter",
    "meaning": "مترجم",
    "lesson": 9,
    "pos": "n.",
    "lessonLabel": "داستان ۹"
  },
  {
    "word": "lecture",
    "meaning": "سخنرانی",
    "lesson": 9,
    "pos": "n.",
    "lessonLabel": "داستان ۹"
  },
  {
    "word": "amusing story",
    "meaning": "داستان خنده‌دار",
    "lesson": 9,
    "pos": "n. phr.",
    "lessonLabel": "داستان ۹"
  },
  {
    "word": "rather a long time",
    "meaning": "مدت زمان نسبتاً طولانی",
    "lesson": 9,
    "pos": "expr.",
    "lessonLabel": "داستان ۹"
  },
  {
    "word": "translate",
    "meaning": "ترجمه کردن",
    "lesson": 9,
    "pos": "v.",
    "lessonLabel": "داستان ۹"
  },
  {
    "word": "surprised",
    "meaning": "شگفت‌زده",
    "lesson": 9,
    "pos": "adj.",
    "lessonLabel": "داستان ۹"
  },
  {
    "word": "laugh loudly",
    "meaning": "به شدت خندیدن",
    "lesson": 9,
    "pos": "v. phr.",
    "lessonLabel": "داستان ۹"
  },
  {
    "word": "honourable lecturer",
    "meaning": "استاد محترم",
    "lesson": 9,
    "pos": "n. phr.",
    "lessonLabel": "داستان ۹"
  },
  {
    "word": "funny story",
    "meaning": "داستان خنده‌دار",
    "lesson": 9,
    "pos": "n. phr.",
    "lessonLabel": "داستان ۹"
  },
  {
    "word": "invite",
    "meaning": "دعوت کردن",
    "lesson": 9,
    "pos": "v.",
    "lessonLabel": "داستان ۹"
  },
  {
    "word": "understand",
    "meaning": "درک کردن",
    "lesson": 9,
    "pos": "v.",
    "lessonLabel": "داستان ۹"
  },
  {
    "word": "gardener",
    "meaning": "باغبان",
    "lesson": 10,
    "pos": "n.",
    "lessonLabel": "داستان ۱۰"
  },
  {
    "word": "interfering",
    "meaning": "مداخله‌کننده",
    "lesson": 10,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۰"
  },
  {
    "word": "got angry",
    "meaning": "عصبانی شد",
    "lesson": 10,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۰"
  },
  {
    "word": "accused of",
    "meaning": "متهم به",
    "lesson": 10,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۰"
  },
  {
    "word": "magistrate",
    "meaning": "قاضی",
    "lesson": 10,
    "pos": "n.",
    "lessonLabel": "داستان ۱۰"
  },
  {
    "word": "guilty",
    "meaning": "مجرم",
    "lesson": 10,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۰"
  },
  {
    "word": "allowed",
    "meaning": "مجاز",
    "lesson": 10,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۰"
  },
  {
    "word": "certainly",
    "meaning": "قطعاً",
    "lesson": 10,
    "pos": "adv.",
    "lessonLabel": "داستان ۱۰"
  },
  {
    "word": "looked at",
    "meaning": "نگاه کرد به",
    "lesson": 10,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۰"
  },
  {
    "word": "lawyer",
    "meaning": "وکیل",
    "lesson": 10,
    "pos": "n.",
    "lessonLabel": "داستان ۱۰"
  },
  {
    "word": "rich",
    "meaning": "ثروتمند",
    "lesson": 10,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۰"
  },
  {
    "word": "fat",
    "meaning": "چاق",
    "lesson": 10,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۰"
  },
  {
    "word": "old",
    "meaning": "پیر",
    "lesson": 10,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۰"
  },
  {
    "word": "decide",
    "meaning": "تصمیم گرفتن",
    "lesson": 10,
    "pos": "v.",
    "lessonLabel": "داستان ۱۰"
  },
  {
    "word": "Christian groups",
    "meaning": "گروه‌های مسیحی",
    "lesson": 11,
    "pos": "n. phr.",
    "lessonLabel": "داستان ۱۱"
  },
  {
    "word": "motto",
    "meaning": "شعار",
    "lesson": 11,
    "pos": "n.",
    "lessonLabel": "داستان ۱۱"
  },
  {
    "word": "opportunities",
    "meaning": "فرصت‌ها",
    "lesson": 11,
    "pos": "n.",
    "lessonLabel": "داستان ۱۱"
  },
  {
    "word": "difficulties",
    "meaning": "مشکلات، موانع",
    "lesson": 11,
    "pos": "n.",
    "lessonLabel": "داستان ۱۱"
  },
  {
    "word": "deeds",
    "meaning": "کارها، اعمال",
    "lesson": 11,
    "pos": "n.",
    "lessonLabel": "داستان ۱۱"
  },
  {
    "word": "conference",
    "meaning": "کنفرانس، گردهمایی",
    "lesson": 11,
    "pos": "n.",
    "lessonLabel": "داستان ۱۱"
  },
  {
    "word": "inquiries desk",
    "meaning": "میز اطلاعات",
    "lesson": 11,
    "pos": "n. phr.",
    "lessonLabel": "داستان ۱۱"
  },
  {
    "word": "patiently",
    "meaning": "با صبر، با حوصله",
    "lesson": 11,
    "pos": "adv.",
    "lessonLabel": "داستان ۱۱"
  },
  {
    "word": "adopt",
    "meaning": "پذیرفتن، برگزیدن",
    "lesson": 11,
    "pos": "v.",
    "lessonLabel": "داستان ۱۱"
  },
  {
    "word": "prevent",
    "meaning": "مانع شدن، جلوگیری کردن",
    "lesson": 11,
    "pos": "v.",
    "lessonLabel": "داستان ۱۱"
  },
  {
    "word": "refused",
    "meaning": "نپذیرفتن، رد کردن",
    "lesson": 11,
    "pos": "v.",
    "lessonLabel": "داستان ۱۱"
  },
  {
    "word": "whatever you like",
    "meaning": "هر چه دوست داری",
    "lesson": 11,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۱"
  },
  {
    "word": "cautious",
    "meaning": "محتاط",
    "lesson": 12,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۲"
  },
  {
    "word": "qualified pilot",
    "meaning": "ناخدا با صلاحیت",
    "lesson": 12,
    "pos": "n. phr.",
    "lessonLabel": "داستان ۱۲"
  },
  {
    "word": "unfamiliar",
    "meaning": "ناآشنا",
    "lesson": 12,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۲"
  },
  {
    "word": "pretended",
    "meaning": "وانمود کرد",
    "lesson": 12,
    "pos": "v.",
    "lessonLabel": "داستان ۱۲"
  },
  {
    "word": "suspect",
    "meaning": "شک کردن",
    "lesson": 12,
    "pos": "v.",
    "lessonLabel": "داستان ۱۲"
  },
  {
    "word": "qualified",
    "meaning": "با صلاحیت",
    "lesson": 12,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۲"
  },
  {
    "word": "rock",
    "meaning": "صخره",
    "lesson": 12,
    "pos": "n.",
    "lessonLabel": "داستان ۱۲"
  },
  {
    "word": "tearing sound",
    "meaning": "صدای ترکیدن",
    "lesson": 12,
    "pos": "n. phr.",
    "lessonLabel": "داستان ۱۲"
  },
  {
    "word": "steer",
    "meaning": "هدایت کردن",
    "lesson": 12,
    "pos": "v.",
    "lessonLabel": "داستان ۱۲"
  },
  {
    "word": "fisherman",
    "meaning": "ماهیگیر",
    "lesson": 12,
    "pos": "n.",
    "lessonLabel": "داستان ۱۲"
  },
  {
    "word": "added",
    "meaning": "افزود",
    "lesson": 12,
    "pos": "v.",
    "lessonLabel": "داستان ۱۲"
  },
  {
    "word": "guide",
    "meaning": "راهنمایی کردن",
    "lesson": 12,
    "pos": "v.",
    "lessonLabel": "داستان ۱۲"
  },
  {
    "word": "seaside",
    "meaning": "ساحل دریا",
    "lesson": 13,
    "pos": "n.",
    "lessonLabel": "داستان ۱۳"
  },
  {
    "word": "holidays",
    "meaning": "تعطیلات",
    "lesson": 13,
    "pos": "n.",
    "lessonLabel": "داستان ۱۳"
  },
  {
    "word": "entertainment",
    "meaning": "برنامه‌های تفریحی",
    "lesson": 13,
    "pos": "n.",
    "lessonLabel": "داستان ۱۳"
  },
  {
    "word": "outdoors",
    "meaning": "در فضای باز",
    "lesson": 13,
    "pos": "adv.",
    "lessonLabel": "داستان ۱۳"
  },
  {
    "word": "unfortunately",
    "meaning": "متأسفانه",
    "lesson": 13,
    "pos": "adv.",
    "lessonLabel": "داستان ۱۳"
  },
  {
    "word": "audience",
    "meaning": "تماشاچیان",
    "lesson": 13,
    "pos": "n.",
    "lessonLabel": "داستان ۱۳"
  },
  {
    "word": "under cover",
    "meaning": "زیر سرپناه",
    "lesson": 13,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۳"
  },
  {
    "word": "waterproof",
    "meaning": "ضدآب",
    "lesson": 13,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۳"
  },
  {
    "word": "conductor",
    "meaning": "رهبر گروه موسیقی",
    "lesson": 13,
    "pos": "n.",
    "lessonLabel": "داستان ۱۳"
  },
  {
    "word": "inquired",
    "meaning": "پرسید",
    "lesson": 13,
    "pos": "v.",
    "lessonLabel": "داستان ۱۳"
  },
  {
    "word": "keeper",
    "meaning": "نگهبان",
    "lesson": 13,
    "pos": "n.",
    "lessonLabel": "داستان ۱۳"
  },
  {
    "word": "lock the gates",
    "meaning": "قفل کردن درها",
    "lesson": 13,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۳"
  },
  {
    "word": "admiral",
    "meaning": "امیر دریا",
    "lesson": 15,
    "pos": "n.",
    "lessonLabel": "داستان ۱۵"
  },
  {
    "word": "bad temper",
    "meaning": "خلق بد",
    "lesson": 15,
    "pos": "n.",
    "lessonLabel": "داستان ۱۵"
  },
  {
    "word": "navy",
    "meaning": "نیروی دریایی",
    "lesson": 15,
    "pos": "n.",
    "lessonLabel": "داستان ۱۵"
  },
  {
    "word": "annoy",
    "meaning": "ناراحت کردن",
    "lesson": 15,
    "pos": "v.",
    "lessonLabel": "داستان ۱۵"
  },
  {
    "word": "international exercise",
    "meaning": "تمرین بین‌المللی",
    "lesson": 15,
    "pos": "n.",
    "lessonLabel": "داستان ۱۵"
  },
  {
    "word": "on board",
    "meaning": "روی کشتی",
    "lesson": 15,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۵"
  },
  {
    "word": "bridge",
    "meaning": "پل فرماندهی",
    "lesson": 15,
    "pos": "n.",
    "lessonLabel": "داستان ۱۵"
  },
  {
    "word": "cruiser",
    "meaning": "ناوچه",
    "lesson": 15,
    "pos": "n.",
    "lessonLabel": "داستان ۱۵"
  },
  {
    "word": "dare",
    "meaning": "جرأت کردن",
    "lesson": 15,
    "pos": "v.",
    "lessonLabel": "داستان ۱۵"
  },
  {
    "word": "courage",
    "meaning": "شجاعت",
    "lesson": 15,
    "pos": "n.",
    "lessonLabel": "داستان ۱۵"
  },
  {
    "word": "fools",
    "meaning": "احمقان",
    "lesson": 15,
    "pos": "n.",
    "lessonLabel": "داستان ۱۵"
  },
  {
    "word": "mistake",
    "meaning": "اشتباه",
    "lesson": 15,
    "pos": "n.",
    "lessonLabel": "داستان ۱۵"
  },
  {
    "word": "teaches mathematics",
    "meaning": "ریاضی تدریس می‌کند",
    "lesson": 16,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۶"
  },
  {
    "word": "arithmetic",
    "meaning": "حساب",
    "lesson": 16,
    "pos": "n.",
    "lessonLabel": "داستان ۱۶"
  },
  {
    "word": "amusing",
    "meaning": "خنده‌دار",
    "lesson": 16,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۶"
  },
  {
    "word": "dozen",
    "meaning": "دزن (ده‌تایی)",
    "lesson": 16,
    "pos": "n.",
    "lessonLabel": "داستان ۱۶"
  },
  {
    "word": "pence",
    "meaning": "پنس (واحد پول بریتانیا)",
    "lesson": 16,
    "pos": "n.",
    "lessonLabel": "داستان ۱۶"
  },
  {
    "word": "exercise-books",
    "meaning": "دفتر تمرین",
    "lesson": 16,
    "pos": "n.",
    "lessonLabel": "داستان ۱۶"
  },
  {
    "word": "interrupted",
    "meaning": "قطع کرد",
    "lesson": 16,
    "pos": "v.",
    "lessonLabel": "داستان ۱۶"
  },
  {
    "word": "work it out",
    "meaning": "حل کردن مسئله",
    "lesson": 16,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۶"
  },
  {
    "word": "cabbages",
    "meaning": "کلم",
    "lesson": 16,
    "pos": "n.",
    "lessonLabel": "داستان ۱۶"
  },
  {
    "word": "university",
    "meaning": "دانشگاه",
    "lesson": 17,
    "pos": "n.",
    "lessonLabel": "داستان ۱۷"
  },
  {
    "word": "oil company",
    "meaning": "شرکت نفت",
    "lesson": 17,
    "pos": "n.",
    "lessonLabel": "داستان ۱۷"
  },
  {
    "word": "change",
    "meaning": "تغییر",
    "lesson": 17,
    "pos": "n.",
    "lessonLabel": "داستان ۱۷"
  },
  {
    "word": "position",
    "meaning": "موقعیت، جایگاه",
    "lesson": 17,
    "pos": "n.",
    "lessonLabel": "داستان ۱۷"
  },
  {
    "word": "advertisement",
    "meaning": "آگهی",
    "lesson": 17,
    "pos": "n.",
    "lessonLabel": "داستان ۱۷"
  },
  {
    "word": "experience",
    "meaning": "تجربه",
    "lesson": 17,
    "pos": "n.",
    "lessonLabel": "داستان ۱۷"
  },
  {
    "word": "employer",
    "meaning": "کارفرما",
    "lesson": 17,
    "pos": "n.",
    "lessonLabel": "داستان ۱۷"
  },
  {
    "word": "ambitious",
    "meaning": "جاه‌طلب، طمع‌کار",
    "lesson": 17,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۷"
  },
  {
    "word": "quiet",
    "meaning": "آرام، ساکت",
    "lesson": 17,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۷"
  },
  {
    "word": "responsible",
    "meaning": "مسئولیت‌پذیر",
    "lesson": 17,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۷"
  },
  {
    "word": "satisfied",
    "meaning": "راضی",
    "lesson": 17,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۷"
  },
  {
    "word": "perhaps",
    "meaning": "شاید",
    "lesson": 17,
    "pos": "adv.",
    "lessonLabel": "داستان ۱۷"
  },
  {
    "word": "put an advertisement",
    "meaning": "آگهی گذاشتن",
    "lesson": 17,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۷"
  },
  {
    "word": "be kind enough to",
    "meaning": "لطفاً",
    "lesson": 17,
    "pos": "expr.",
    "lessonLabel": "داستان ۱۷"
  },
  {
    "word": "look for a job",
    "meaning": "به دنبال کار بودن",
    "lesson": 17,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۷"
  },
  {
    "word": "teacher",
    "meaning": "معلم",
    "lesson": 19,
    "pos": "n.",
    "lessonLabel": "داستان ۱۹"
  },
  {
    "word": "chemistry",
    "meaning": "شیمی",
    "lesson": 19,
    "pos": "n.",
    "lessonLabel": "داستان ۱۹"
  },
  {
    "word": "rapidly",
    "meaning": "به سرعت",
    "lesson": 19,
    "pos": "adv.",
    "lessonLabel": "داستان ۱۹"
  },
  {
    "word": "slowly",
    "meaning": "به کندی",
    "lesson": 19,
    "pos": "adv.",
    "lessonLabel": "داستان ۱۹"
  },
  {
    "word": "suddenly",
    "meaning": "ناگهان",
    "lesson": 19,
    "pos": "adv.",
    "lessonLabel": "داستان ۱۹"
  },
  {
    "word": "silence",
    "meaning": "سکوت",
    "lesson": 19,
    "pos": "n.",
    "lessonLabel": "داستان ۱۹"
  },
  {
    "word": "sad",
    "meaning": "ناامید، غمگین",
    "lesson": 19,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۹"
  },
  {
    "word": "encouragingly",
    "meaning": "تشویق‌کننده",
    "lesson": 19,
    "pos": "adv.",
    "lessonLabel": "داستان ۱۹"
  },
  {
    "word": "liquid",
    "meaning": "مایع",
    "lesson": 19,
    "pos": "n.",
    "lessonLabel": "داستان ۱۹"
  },
  {
    "word": "confidence",
    "meaning": "اطمینان، اعتماد به نفس",
    "lesson": 19,
    "pos": "n.",
    "lessonLabel": "داستان ۱۹"
  },
  {
    "word": "crash",
    "meaning": "تصادف",
    "lesson": 20,
    "pos": "n.",
    "lessonLabel": "داستان ۲۰"
  },
  {
    "word": "avenue",
    "meaning": "خیابان",
    "lesson": 20,
    "pos": "n.",
    "lessonLabel": "داستان ۲۰"
  },
  {
    "word": "argument",
    "meaning": "بحث",
    "lesson": 20,
    "pos": "n.",
    "lessonLabel": "داستان ۲۰"
  },
  {
    "word": "witness",
    "meaning": "شاهد",
    "lesson": 20,
    "pos": "n.",
    "lessonLabel": "داستان ۲۰"
  },
  {
    "word": "court case",
    "meaning": "دادگاه",
    "lesson": 20,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۰"
  },
  {
    "word": "questioning",
    "meaning": "پرسیدن سؤال",
    "lesson": 20,
    "pos": "v.",
    "lessonLabel": "داستان ۲۰"
  },
  {
    "word": "objection",
    "meaning": "اعتراض",
    "lesson": 20,
    "pos": "n.",
    "lessonLabel": "داستان ۲۰"
  },
  {
    "word": "facts",
    "meaning": "حقایق",
    "lesson": 20,
    "pos": "n.",
    "lessonLabel": "داستان ۲۰"
  },
  {
    "word": "opinions",
    "meaning": "نظرات",
    "lesson": 20,
    "pos": "n.",
    "lessonLabel": "داستان ۲۰"
  },
  {
    "word": "collected round",
    "meaning": "دور و بر جمع شدن",
    "lesson": 20,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۰"
  },
  {
    "word": "concerning",
    "meaning": "در مورد",
    "lesson": 20,
    "pos": "prep.",
    "lessonLabel": "داستان ۲۰"
  },
  {
    "word": "arose",
    "meaning": "پدید آمد",
    "lesson": 20,
    "pos": "v.",
    "lessonLabel": "داستان ۲۰"
  },
  {
    "word": "willing",
    "meaning": "مصمم، حاضر",
    "lesson": 20,
    "pos": "adj.",
    "lessonLabel": "داستان ۲۰"
  },
  {
    "word": "During World War Two",
    "meaning": "در طول جنگ جهانی دوم",
    "lesson": 21,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۱"
  },
  {
    "word": "armed forces",
    "meaning": "نیروهای نظامی",
    "lesson": 21,
    "pos": "n.",
    "lessonLabel": "داستان ۲۱"
  },
  {
    "word": "camp",
    "meaning": "اردوگاه",
    "lesson": 21,
    "pos": "n.",
    "lessonLabel": "داستان ۲۱"
  },
  {
    "word": "officers",
    "meaning": "افسران",
    "lesson": 21,
    "pos": "n.",
    "lessonLabel": "داستان ۲۱"
  },
  {
    "word": "soldiers",
    "meaning": "سربازان",
    "lesson": 21,
    "pos": "n.",
    "lessonLabel": "داستان ۲۱"
  },
  {
    "word": "dance",
    "meaning": "رقص",
    "lesson": 21,
    "pos": "n.",
    "lessonLabel": "داستان ۲۱"
  },
  {
    "word": "abroad",
    "meaning": "به خارج از کشور",
    "lesson": 21,
    "pos": "adv.",
    "lessonLabel": "داستان ۲۱"
  },
  {
    "word": "wounded",
    "meaning": "زخمی",
    "lesson": 21,
    "pos": "adj.",
    "lessonLabel": "داستان ۲۱"
  },
  {
    "word": "matron",
    "meaning": "مدیر بیمارستان",
    "lesson": 21,
    "pos": "n.",
    "lessonLabel": "داستان ۲۱"
  },
  {
    "word": "relatives",
    "meaning": "اعضای خانواده",
    "lesson": 21,
    "pos": "n.",
    "lessonLabel": "داستان ۲۱"
  },
  {
    "word": "patients",
    "meaning": "بیماران",
    "lesson": 21,
    "pos": "n.",
    "lessonLabel": "داستان ۲۱"
  },
  {
    "word": "sister",
    "meaning": "خواهر",
    "lesson": 21,
    "pos": "n.",
    "lessonLabel": "داستان ۲۱"
  },
  {
    "word": "mother",
    "meaning": "مادر",
    "lesson": 21,
    "pos": "n.",
    "lessonLabel": "داستان ۲۱"
  },
  {
    "word": "splendid house",
    "meaning": "خانه‌ی باشکوه",
    "lesson": 22,
    "pos": "n. phr.",
    "lessonLabel": "داستان ۲۲"
  },
  {
    "word": "valuable things",
    "meaning": "اشیاء گران‌بها",
    "lesson": 22,
    "pos": "n. phr.",
    "lessonLabel": "داستان ۲۲"
  },
  {
    "word": "funeral",
    "meaning": "مراسم تشییع",
    "lesson": 22,
    "pos": "n.",
    "lessonLabel": "داستان ۲۲"
  },
  {
    "word": "service",
    "meaning": "مراسم دینی",
    "lesson": 22,
    "pos": "n.",
    "lessonLabel": "داستان ۲۲"
  },
  {
    "word": "hearse",
    "meaning": "خودروی حامل جنازه",
    "lesson": 22,
    "pos": "n.",
    "lessonLabel": "داستان ۲۲"
  },
  {
    "word": "cousin",
    "meaning": "فامیل درجه دوم",
    "lesson": 22,
    "pos": "n.",
    "lessonLabel": "داستان ۲۲"
  },
  {
    "word": "poorly dressed",
    "meaning": "با پوشش کهنه‌پوش",
    "lesson": 22,
    "pos": "adj. phr.",
    "lessonLabel": "داستان ۲۲"
  },
  {
    "word": "bitterly",
    "meaning": "بسیار تلخانه",
    "lesson": 22,
    "pos": "adv.",
    "lessonLabel": "داستان ۲۲"
  },
  {
    "word": "relative",
    "meaning": "فامیل",
    "lesson": 22,
    "pos": "n.",
    "lessonLabel": "داستان ۲۲"
  },
  {
    "word": "dead woman",
    "meaning": "زن مرده",
    "lesson": 22,
    "pos": "n. phr.",
    "lessonLabel": "داستان ۲۲"
  },
  {
    "word": "get anything",
    "meaning": "چیزی به دست آوردن",
    "lesson": 22,
    "pos": "v. phr.",
    "lessonLabel": "داستان ۲۲"
  },
  {
    "word": "find jobs",
    "meaning": "پیدا کردن کار",
    "lesson": 23,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۳"
  },
  {
    "word": "north-east",
    "meaning": "شمال شرقی",
    "lesson": 23,
    "pos": "n.",
    "lessonLabel": "داستان ۲۳"
  },
  {
    "word": "spent all his money",
    "meaning": "تمام پولش را خرج کرد",
    "lesson": 23,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۳"
  },
  {
    "word": "go down to",
    "meaning": "رفتن به سمت جنوب",
    "lesson": 23,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۳"
  },
  {
    "word": "compartment",
    "meaning": "کوپه قطار",
    "lesson": 23,
    "pos": "n.",
    "lessonLabel": "داستان ۲۳"
  },
  {
    "word": "burst in",
    "meaning": "ناگهان وارد شدن",
    "lesson": 23,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۳"
  },
  {
    "word": "carrying a gun",
    "meaning": "با اسلحه حمل کردن",
    "lesson": 23,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۳"
  },
  {
    "word": "in fright",
    "meaning": "با ترس",
    "lesson": 23,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۳"
  },
  {
    "word": "trembling",
    "meaning": "لرزش",
    "lesson": 23,
    "pos": "n.",
    "lessonLabel": "داستان ۲۳"
  },
  {
    "word": "ticket-collector",
    "meaning": "بلیت‌بین",
    "lesson": 23,
    "pos": "n.",
    "lessonLabel": "داستان ۲۳"
  },
  {
    "word": "impossible",
    "meaning": "غیرممکن",
    "lesson": 23,
    "pos": "adj.",
    "lessonLabel": "داستان ۲۳"
  },
  {
    "word": "passenger",
    "meaning": "مسافر",
    "lesson": 23,
    "pos": "n.",
    "lessonLabel": "داستان ۲۳"
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
