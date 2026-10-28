// واژگان داستان‌های تکمیلی Advanced Steps to Understanding (داستان‌های ۳، ۱۴، ۱۸ و ۲۴ تا ۳۰)
// کلیدواژه‌های هر داستان با معنی فارسی — شکل ردیف‌ها مثل vocab.ts اصلی
import type { VocabWord } from "../types";

type Row = Omit<VocabWord, "lesson"> & { lesson: number; lessonLabel: string };

export const EXTRA_ROWS: Row[] = [
  // ─── داستان ۳ — The New Bath ───
  {
    "word": "local chief",
    "meaning": "رئیس محلی",
    "lesson": 3,
    "pos": "n.",
    "lessonLabel": "داستان ۳"
  },
  {
    "word": "bath-house",
    "meaning": "ساختمان حمام",
    "lesson": 3,
    "pos": "n.",
    "lessonLabel": "داستان ۳"
  },
  {
    "word": "tap",
    "meaning": "شیر آب",
    "lesson": 3,
    "pos": "n.",
    "lessonLabel": "داستان ۳"
  },
  {
    "word": "frightened",
    "meaning": "وحشت‌زده",
    "lesson": 3,
    "pos": "adj.",
    "lessonLabel": "داستان ۳"
  },
  {
    "word": "hole",
    "meaning": "سوراخ",
    "lesson": 3,
    "pos": "n.",
    "lessonLabel": "داستان ۳"
  },
  {
    "word": "petrol tin",
    "meaning": "پتری‌کان (قوطی نفت)",
    "lesson": 3,
    "pos": "n.",
    "lessonLabel": "داستان ۳"
  },
  {
    "word": "funnel",
    "meaning": "قیف",
    "lesson": 3,
    "pos": "n.",
    "lessonLabel": "داستان ۳"
  },
  {
    "word": "pour in",
    "meaning": "داخل چیزی ریختن",
    "lesson": 3,
    "pos": "phr.",
    "lessonLabel": "داستان ۳"
  },
  {
    "word": "angrily",
    "meaning": "با خشم",
    "lesson": 3,
    "pos": "adv.",
    "lessonLabel": "داستان ۳"
  },
  {
    "word": "politely",
    "meaning": "با ادب و مؤدبانه",
    "lesson": 3,
    "pos": "adv.",
    "lessonLabel": "داستان ۳"
  },
  // ─── داستان ۱۴ — My Name's Stonebreaker ───
  {
    "word": "strict",
    "meaning": "سخت‌گیر",
    "lesson": 14,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۴"
  },
  {
    "word": "train",
    "meaning": "آموزش دادن",
    "lesson": 14,
    "pos": "v.",
    "lessonLabel": "داستان ۱۴"
  },
  {
    "word": "harder than stone",
    "meaning": "از سنگ هم سخت‌تر",
    "lesson": 14,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۴"
  },
  {
    "word": "trick",
    "meaning": "ترفند",
    "lesson": 14,
    "pos": "n.",
    "lessonLabel": "داستان ۱۴"
  },
  {
    "word": "get on well together",
    "meaning": "با هم خوب کنار آمدن",
    "lesson": 14,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۴"
  },
  {
    "word": "one after the other",
    "meaning": "یکی پس از دیگری",
    "lesson": 14,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۴"
  },
  {
    "word": "speak loudly",
    "meaning": "بلند حرف زدن",
    "lesson": 14,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۴"
  },
  {
    "word": "remain silent",
    "meaning": "ساکت ماندن",
    "lesson": 14,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۴"
  },
  {
    "word": "shout at",
    "meaning": "سر کسی داد زدن",
    "lesson": 14,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۴"
  },
  {
    "word": "unhappy",
    "meaning": "ناراحت",
    "lesson": 14,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۴"
  },
  {
    "word": "nervously",
    "meaning": "با نگرانی",
    "lesson": 14,
    "pos": "adv.",
    "lessonLabel": "داستان ۱۴"
  },
  {
    "word": "reply",
    "meaning": "پاسخ دادن",
    "lesson": 14,
    "pos": "v.",
    "lessonLabel": "داستان ۱۴"
  },
  // ─── داستان ۱۸ — Envy. Only Envy. ───
  {
    "word": "fortunate",
    "meaning": "خوش‌شانس",
    "lesson": 18,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۸"
  },
  {
    "word": "collect great wealth",
    "meaning": "ثروت هنگفتی جمع کردن",
    "lesson": 18,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۸"
  },
  {
    "word": "favourite niece",
    "meaning": "خواهرزادهٔ مورد علاقه",
    "lesson": 18,
    "pos": "n.",
    "lessonLabel": "داستان ۱۸"
  },
  {
    "word": "valuable",
    "meaning": "گران‌بها",
    "lesson": 18,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۸"
  },
  {
    "word": "come round",
    "meaning": "فرا رسیدن (زمان)",
    "lesson": 18,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۸"
  },
  {
    "word": "really special",
    "meaning": "واقعاً خاص",
    "lesson": 18,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۸"
  },
  {
    "word": "wealthy",
    "meaning": "ثروتمند",
    "lesson": 18,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۸"
  },
  {
    "word": "shop assistant",
    "meaning": "فروشندهٔ مغازه",
    "lesson": 18,
    "pos": "n.",
    "lessonLabel": "داستان ۱۸"
  },
  {
    "word": "helpful",
    "meaning": "کمک‌حال",
    "lesson": 18,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۸"
  },
  {
    "word": "sigh",
    "meaning": "آه کشیدن",
    "lesson": 18,
    "pos": "v.",
    "lessonLabel": "داستان ۱۸"
  },
  {
    "word": "envy",
    "meaning": "حسادت",
    "lesson": 18,
    "pos": "n.",
    "lessonLabel": "داستان ۱۸"
  },
  // ─── داستان ۲۴ — When the Bear Shot Back ───
  {
    "word": "shooting",
    "meaning": "تیراندازی",
    "lesson": 24,
    "pos": "n.",
    "lessonLabel": "داستان ۲۴"
  },
  {
    "word": "wild animals",
    "meaning": "حیوانات وحشی",
    "lesson": 24,
    "pos": "n.",
    "lessonLabel": "داستان ۲۴"
  },
  {
    "word": "practice",
    "meaning": "تمرین",
    "lesson": 24,
    "pos": "n.",
    "lessonLabel": "داستان ۲۴"
  },
  {
    "word": "glasses",
    "meaning": "عینک",
    "lesson": 24,
    "pos": "n.",
    "lessonLabel": "داستان ۲۴"
  },
  {
    "word": "get wet",
    "meaning": "خیس شدن",
    "lesson": 24,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۴"
  },
  {
    "word": "by mistake",
    "meaning": "به اشتباه",
    "lesson": 24,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۴"
  },
  {
    "word": "shoot at",
    "meaning": "شلیک کردن به سمت",
    "lesson": 24,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۴"
  },
  {
    "word": "hunter",
    "meaning": "شکارچی",
    "lesson": 24,
    "pos": "n.",
    "lessonLabel": "داستان ۲۴"
  },
  {
    "word": "hit him in the leg",
    "meaning": "پای او را زدن (گلوله)",
    "lesson": 24,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۴"
  },
  {
    "word": "court case",
    "meaning": "پروندهٔ دادگاه",
    "lesson": 24,
    "pos": "n.",
    "lessonLabel": "داستان ۲۴"
  },
  {
    "word": "lawyer",
    "meaning": "وکیل",
    "lesson": 24,
    "pos": "n.",
    "lessonLabel": "داستان ۲۴"
  },
  {
    "word": "realize",
    "meaning": "پی بردن، فهمیدن",
    "lesson": 24,
    "pos": "v.",
    "lessonLabel": "داستان ۲۴"
  },
  {
    "word": "shoot back",
    "meaning": "شلیک متقابل کردن",
    "lesson": 24,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۴"
  },
  // ─── داستان ۲۵ — Halt! Who Goes There? ───
  {
    "word": "army camp",
    "meaning": "اردوگاه نظامی",
    "lesson": 25,
    "pos": "n.",
    "lessonLabel": "داستان ۲۵"
  },
  {
    "word": "guard",
    "meaning": "نگهبان؛ نگهبانی کردن",
    "lesson": 25,
    "pos": "n./v.",
    "lessonLabel": "داستان ۲۵"
  },
  {
    "word": "permission",
    "meaning": "اجازه",
    "lesson": 25,
    "pos": "n.",
    "lessonLabel": "داستان ۲۵"
  },
  {
    "word": "otherwise",
    "meaning": "در غیر این صورت",
    "lesson": 25,
    "pos": "adv.",
    "lessonLabel": "داستان ۲۵"
  },
  {
    "word": "composed of",
    "meaning": "متشکل از",
    "lesson": 25,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۵"
  },
  {
    "word": "take turns",
    "meaning": "نوبتی انجام دادن",
    "lesson": 25,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۵"
  },
  {
    "word": "gun",
    "meaning": "اسلحه",
    "lesson": 25,
    "pos": "n.",
    "lessonLabel": "داستان ۲۵"
  },
  {
    "word": "pass",
    "meaning": "برگهٔ عبور",
    "lesson": 25,
    "pos": "n.",
    "lessonLabel": "داستان ۲۵"
  },
  {
    "word": "halt",
    "meaning": "ایست! (به‌اصطلاح نگهبان)",
    "lesson": 25,
    "pos": "v.",
    "lessonLabel": "داستان ۲۵"
  },
  {
    "word": "on guard",
    "meaning": "در حال نگهبانی",
    "lesson": 25,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۵"
  },
  {
    "word": "nervous",
    "meaning": "مضطرب، نگران",
    "lesson": 25,
    "pos": "adj.",
    "lessonLabel": "داستان ۲۵"
  },
  // ─── داستان ۲۶ — If You Pretend You're Asleep, He Stops! ───
  {
    "word": "resist",
    "meaning": "مقاومت کردن، سر باز زدن",
    "lesson": 26,
    "pos": "v.",
    "lessonLabel": "داستان ۲۶"
  },
  {
    "word": "go to bed",
    "meaning": "به رختخواب رفتن",
    "lesson": 26,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۶"
  },
  {
    "word": "complain to",
    "meaning": "شکایت کردن از کسی",
    "lesson": 26,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۶"
  },
  {
    "word": "week-end",
    "meaning": "تعطیلات آخر هفته",
    "lesson": 26,
    "pos": "n.",
    "lessonLabel": "داستان ۲۶"
  },
  {
    "word": "consider",
    "meaning": "به حساب آوردن، دانستن",
    "lesson": 26,
    "pos": "v.",
    "lessonLabel": "داستان ۲۶"
  },
  {
    "word": "singer",
    "meaning": "خواننده",
    "lesson": 26,
    "pos": "n.",
    "lessonLabel": "داستان ۲۶"
  },
  {
    "word": "not at all musical",
    "meaning": "هیچ آهنگینی نداشتن",
    "lesson": 26,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۶"
  },
  {
    "word": "relax",
    "meaning": "آرمیدن، آرام گرفتن",
    "lesson": 26,
    "pos": "v.",
    "lessonLabel": "داستان ۲۶"
  },
  {
    "word": "gradually",
    "meaning": "به‌تدریج، کم‌کم",
    "lesson": 26,
    "pos": "adv.",
    "lessonLabel": "داستان ۲۶"
  },
  {
    "word": "whisper",
    "meaning": "نجوا کردن",
    "lesson": 26,
    "pos": "v.",
    "lessonLabel": "داستان ۲۶"
  },
  {
    "word": "pretend",
    "meaning": "خود را وانمود کردن",
    "lesson": 26,
    "pos": "v.",
    "lessonLabel": "داستان ۲۶"
  },
  {
    "word": "asleep",
    "meaning": "خوابیده",
    "lesson": 26,
    "pos": "adj.",
    "lessonLabel": "داستان ۲۶"
  },
  // ─── داستان ۲۷ — First with the News ───
  {
    "word": "owner",
    "meaning": "مالک",
    "lesson": 27,
    "pos": "n.",
    "lessonLabel": "داستان ۲۷"
  },
  {
    "word": "editor",
    "meaning": "سردبیر",
    "lesson": 27,
    "pos": "n.",
    "lessonLabel": "داستان ۲۷"
  },
  {
    "word": "latest news",
    "meaning": "تازه‌ترین اخبار",
    "lesson": 27,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۷"
  },
  {
    "word": "excited",
    "meaning": "هیجان‌زده",
    "lesson": 27,
    "pos": "adj.",
    "lessonLabel": "داستان ۲۷"
  },
  {
    "word": "claim",
    "meaning": "ادعا کردن",
    "lesson": 27,
    "pos": "v.",
    "lessonLabel": "داستان ۲۷"
  },
  {
    "word": "flood",
    "meaning": "سیل",
    "lesson": 27,
    "pos": "n.",
    "lessonLabel": "داستان ۲۷"
  },
  {
    "word": "in great detail",
    "meaning": "با جزئیات فراوان",
    "lesson": 27,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۷"
  },
  {
    "word": "write down",
    "meaning": "یادداشت کردن",
    "lesson": 27,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۷"
  },
  {
    "word": "print",
    "meaning": "چاپ کردن",
    "lesson": 27,
    "pos": "v.",
    "lessonLabel": "داستان ۲۷"
  },
  {
    "word": "delighted",
    "meaning": "خوشحال، شادمان",
    "lesson": 27,
    "pos": "adj.",
    "lessonLabel": "داستان ۲۷"
  },
  {
    "word": "get hold of",
    "meaning": "به دست آوردن",
    "lesson": 27,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۷"
  },
  {
    "word": "trick",
    "meaning": "فریب دادن",
    "lesson": 27,
    "pos": "v.",
    "lessonLabel": "داستان ۲۷"
  },
  {
    "word": "false",
    "meaning": "نادرست، غلط",
    "lesson": 27,
    "pos": "adj.",
    "lessonLabel": "داستان ۲۷"
  },
  // ─── داستان ۲۸ — Eleven Metres and Forty-Eight Centimetres ───
  {
    "word": "rapidly",
    "meaning": "با سرعت، به‌سرعت",
    "lesson": 28,
    "pos": "adv.",
    "lessonLabel": "داستان ۲۸"
  },
  {
    "word": "certain to",
    "meaning": "مطمئن، حتماً",
    "lesson": 28,
    "pos": "adj.",
    "lessonLabel": "داستان ۲۸"
  },
  {
    "word": "accident",
    "meaning": "تصادف",
    "lesson": 28,
    "pos": "n.",
    "lessonLabel": "داستان ۲۸"
  },
  {
    "word": "violently",
    "meaning": "به‌شدت، محکم",
    "lesson": 28,
    "pos": "adv.",
    "lessonLabel": "داستان ۲۸"
  },
  {
    "word": "damage",
    "meaning": "خسارت",
    "lesson": 28,
    "pos": "n.",
    "lessonLabel": "داستان ۲۸"
  },
  {
    "word": "hurt",
    "meaning": "آسیب دیدن",
    "lesson": 28,
    "pos": "v.",
    "lessonLabel": "داستان ۲۸"
  },
  {
    "word": "witness",
    "meaning": "شاهد",
    "lesson": 28,
    "pos": "n.",
    "lessonLabel": "داستان ۲۸"
  },
  {
    "word": "trial",
    "meaning": "محاکمه در دادگاه",
    "lesson": 28,
    "pos": "n.",
    "lessonLabel": "داستان ۲۸"
  },
  {
    "word": "judge",
    "meaning": "قاضی",
    "lesson": 28,
    "pos": "n.",
    "lessonLabel": "داستان ۲۸"
  },
  {
    "word": "astonished",
    "meaning": "حیرت‌زده، شگفت‌زده",
    "lesson": 28,
    "pos": "adj.",
    "lessonLabel": "داستان ۲۸"
  },
  {
    "word": "distance",
    "meaning": "فاصله",
    "lesson": 28,
    "pos": "n.",
    "lessonLabel": "داستان ۲۸"
  },
  {
    "word": "exactly",
    "meaning": "دقیقاً",
    "lesson": 28,
    "pos": "adv.",
    "lessonLabel": "داستان ۲۸"
  },
  {
    "word": "fool",
    "meaning": "احمق",
    "lesson": 28,
    "pos": "n.",
    "lessonLabel": "داستان ۲۸"
  },
  {
    "word": "expect",
    "meaning": "انتظار داشتن",
    "lesson": 28,
    "pos": "v.",
    "lessonLabel": "داستان ۲۸"
  },
  // ─── داستان ۲۹ — You Must Have Eaten Here Before! ───
  {
    "word": "drive up",
    "meaning": "با خودرو رفتن (به سمت شمال)",
    "lesson": 29,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۹"
  },
  {
    "word": "quieter",
    "meaning": "خلوت‌تر",
    "lesson": 29,
    "pos": "adj.",
    "lessonLabel": "داستان ۲۹"
  },
  {
    "word": "at the side of the road",
    "meaning": "کنار جاده",
    "lesson": 29,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۹"
  },
  {
    "word": "terrible",
    "meaning": "افتضاح، وحشتناک",
    "lesson": 29,
    "pos": "adj.",
    "lessonLabel": "داستان ۲۹"
  },
  {
    "word": "I don't suppose",
    "meaning": "فکر نمی‌کنم",
    "lesson": 29,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۹"
  },
  {
    "word": "feel hungry",
    "meaning": "گرسنه شدن",
    "lesson": 29,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۹"
  },
  {
    "word": "open all night",
    "meaning": "تمام شب باز",
    "lesson": 29,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۹"
  },
  {
    "word": "waiter",
    "meaning": "گارسون",
    "lesson": 29,
    "pos": "n.",
    "lessonLabel": "داستان ۲۹"
  },
  {
    "word": "ham",
    "meaning": "ژامبون",
    "lesson": 29,
    "pos": "n.",
    "lessonLabel": "داستان ۲۹"
  },
  {
    "word": "raw",
    "meaning": "خام، نپخته",
    "lesson": 29,
    "pos": "adj.",
    "lessonLabel": "داستان ۲۹"
  },
  {
    "word": "quite cold",
    "meaning": "کاملاً سرد",
    "lesson": 29,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۹"
  },
  // ─── داستان ۳۰ — The Electric Light Switch ───
  {
    "word": "win money",
    "meaning": "پول بردن",
    "lesson": 30,
    "pos": "phr.",
    "lessonLabel": "داستان ۳۰"
  },
  {
    "word": "football pools",
    "meaning": "شرط‌بندی فوتبال",
    "lesson": 30,
    "pos": "n.",
    "lessonLabel": "داستان ۳۰"
  },
  {
    "word": "money matters",
    "meaning": "مسائل مالی",
    "lesson": 30,
    "pos": "phr.",
    "lessonLabel": "داستان ۳۰"
  },
  {
    "word": "modern paintings",
    "meaning": "تابلوهای نقاشی مدرن",
    "lesson": 30,
    "pos": "n.",
    "lessonLabel": "داستان ۳۰"
  },
  {
    "word": "value",
    "meaning": "ارزش",
    "lesson": 30,
    "pos": "n.",
    "lessonLabel": "داستان ۳۰"
  },
  {
    "word": "go up",
    "meaning": "بالا رفتن",
    "lesson": 30,
    "pos": "phr.",
    "lessonLabel": "داستان ۳۰"
  },
  {
    "word": "art shop",
    "meaning": "هنرفروشی، گالری فروش تابلو",
    "lesson": 30,
    "pos": "n.",
    "lessonLabel": "داستان ۳۰"
  },
  {
    "word": "square",
    "meaning": "مربع",
    "lesson": 30,
    "pos": "adj.",
    "lessonLabel": "داستان ۳۰"
  },
  {
    "word": "spot",
    "meaning": "نقطه، لکه",
    "lesson": 30,
    "pos": "n.",
    "lessonLabel": "داستان ۳۰"
  },
  {
    "word": "brass frame",
    "meaning": "قاب برنجی",
    "lesson": 30,
    "pos": "n.",
    "lessonLabel": "داستان ۳۰"
  },
  {
    "word": "shopkeeper",
    "meaning": "مغازه‌دار، فروشنده",
    "lesson": 30,
    "pos": "n.",
    "lessonLabel": "داستان ۳۰"
  },
  {
    "word": "electric light switch",
    "meaning": "کلید برق",
    "lesson": 30,
    "pos": "n.",
    "lessonLabel": "داستان ۳۰"
  }
];
