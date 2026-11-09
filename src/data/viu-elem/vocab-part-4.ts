// واژگان درس‌های English Vocabulary in Use — Elementary (پارتیت 4) — استخراج VLM از اسکن PDF
// word = عین چاپ کتاب · meaning = ترجمهٔ ماشینی GLM (کلاس FA-NEW — اثبات صحت ترجمه نیست)
import type { VocabWord } from "../types";

type Row = Omit<VocabWord, "lesson"> & { lesson: number; lessonLabel: string };

const ROWS: Row[] = [
  {
    word: "CD player / music centre",
    meaning: "پخش سی‌دی / مرکز موسیقی",
    lesson: 46,
    lessonLabel: "درس 46 — در اتاق نشیمن (قفسهٔ کتاب، چراغ)"
  },
  {
    word: "phone",
    meaning: "تلفن",
    lesson: 46,
    pos: "n.",
    lessonLabel: "درس 46 — در اتاق نشیمن (قفسهٔ کتاب، چراغ)"
  },
  {
    word: "picture",
    meaning: "تابلو",
    lesson: 46,
    pos: "n.",
    lessonLabel: "درس 46 — در اتاق نشیمن (قفسهٔ کتاب، چراغ)"
  },
  {
    word: "curtains",
    meaning: "پرده‌ها",
    lesson: 46,
    pos: "n.",
    lessonLabel: "درس 46 — در اتاق نشیمن (قفسهٔ کتاب، چراغ)"
  },
  {
    word: "bookshelf",
    meaning: "قفسه کتاب",
    lesson: 46,
    pos: "n.",
    lessonLabel: "درس 46 — در اتاق نشیمن (قفسهٔ کتاب، چراغ)"
  },
  {
    word: "books",
    meaning: "کتاب‌ها",
    lesson: 46,
    pos: "n.",
    lessonLabel: "درس 46 — در اتاق نشیمن (قفسهٔ کتاب، چراغ)"
  },
  {
    word: "table",
    meaning: "میز",
    lesson: 46,
    pos: "n.",
    lessonLabel: "درس 46 — در اتاق نشیمن (قفسهٔ کتاب، چراغ)"
  },
  {
    word: "TV",
    meaning: "تلویزیون",
    lesson: 46,
    pos: "n.",
    lessonLabel: "درس 46 — در اتاق نشیمن (قفسهٔ کتاب، چراغ)"
  },
  {
    word: "light switch",
    meaning: "کلید برق/چراغ",
    lesson: 46,
    pos: "n.",
    lessonLabel: "درس 46 — در اتاق نشیمن (قفسهٔ کتاب، چراغ)"
  },
  {
    word: "power point",
    meaning: "پریز برق",
    lesson: 46,
    pos: "n.",
    lessonLabel: "درس 46 — در اتاق نشیمن (قفسهٔ کتاب، چراغ)"
  },
  {
    word: "armchair",
    meaning: "صندلی راحتی (مبل تک‌نفره)",
    lesson: 46,
    pos: "n.",
    lessonLabel: "درس 46 — در اتاق نشیمن (قفسهٔ کتاب، چراغ)"
  },
  {
    word: "phone book",
    meaning: "دفترچه تلفن",
    lesson: 46,
    pos: "n.",
    lessonLabel: "درس 46 — در اتاق نشیمن (قفسهٔ کتاب، چراغ)"
  },
  {
    word: "coffee table",
    meaning: "میز جلومبلی",
    lesson: 46,
    pos: "n.",
    lessonLabel: "درس 46 — در اتاق نشیمن (قفسهٔ کتاب، چراغ)"
  },
  {
    word: "carpet",
    meaning: "فرش",
    lesson: 46,
    pos: "n.",
    lessonLabel: "درس 46 — در اتاق نشیمن (قفسهٔ کتاب، چراغ)"
  },
  {
    word: "chair",
    meaning: "صندلی",
    lesson: 46,
    pos: "n.",
    lessonLabel: "درس 46 — در اتاق نشیمن (قفسهٔ کتاب، چراغ)"
  },
  {
    word: "near",
    meaning: "نزدیک",
    lesson: 46,
    pos: "prep.",
    lessonLabel: "درس 46 — در اتاق نشیمن (قفسهٔ کتاب، چراغ)"
  },
  {
    word: "next to",
    meaning: "کنارِ، بغلِ",
    lesson: 46,
    pos: "prep.",
    lessonLabel: "درس 46 — در اتاق نشیمن (قفسهٔ کتاب، چراغ)"
  },
  {
    word: "in the corner",
    meaning: "در گوشه",
    lesson: 46,
    pos: "phr.",
    lessonLabel: "درس 46 — در اتاق نشیمن (قفسهٔ کتاب، چراغ)"
  },
  {
    word: "in the middle (of)",
    meaning: "در وسطِ",
    lesson: 46,
    pos: "phr.",
    lessonLabel: "درس 46 — در اتاق نشیمن (قفسهٔ کتاب، چراغ)"
  },
  {
    word: "against",
    meaning: "تکیه به، به دیوار چسبیده",
    lesson: 46,
    pos: "prep.",
    lessonLabel: "درس 46 — در اتاق نشیمن (قفسهٔ کتاب، چراغ)"
  },
  {
    word: "under",
    meaning: "زیرِ",
    lesson: 46,
    pos: "prep.",
    lessonLabel: "درس 46 — در اتاق نشیمن (قفسهٔ کتاب، چراغ)"
  },
  {
    word: "watch television",
    meaning: "تلویزیون تماشا کردن",
    lesson: 46,
    pos: "phr.",
    lessonLabel: "درس 46 — در اتاق نشیمن (قفسهٔ کتاب، چراغ)"
  },
  {
    word: "listen to the radio",
    meaning: "رادیو گوش دادن",
    lesson: 46,
    pos: "phr.",
    lessonLabel: "درس 46 — در اتاق نشیمن (قفسهٔ کتاب، چراغ)"
  },
  {
    word: "listen to music",
    meaning: "موسیقی گوش دادن",
    lesson: 46,
    pos: "phr.",
    lessonLabel: "درس 46 — در اتاق نشیمن (قفسهٔ کتاب، چراغ)"
  },
  {
    word: "read",
    meaning: "خواندن، مطالعه کردن",
    lesson: 46,
    pos: "v.",
    lessonLabel: "درس 46 — در اتاق نشیمن (قفسهٔ کتاب، چراغ)"
  },
  {
    word: "relax",
    meaning: "استراحت کردن (آرام گرفتن)",
    lesson: 46,
    pos: "v.",
    lessonLabel: "درس 46 — در اتاق نشیمن (قفسهٔ کتاب، چراغ)"
  },
  {
    word: "remote control",
    meaning: "کنترل از راه دور",
    lesson: 46,
    pos: "n.",
    lessonLabel: "درس 46 — در اتاق نشیمن (قفسهٔ کتاب، چراغ)"
  },
  {
    word: "reading lamp",
    meaning: "چراغ مطالعه",
    lesson: 46,
    pos: "n.",
    lessonLabel: "درس 46 — در اتاق نشیمن (قفسهٔ کتاب، چراغ)"
  },
  {
    word: "switch the light on",
    meaning: "چراغ را روشن کردن",
    lesson: 46,
    pos: "phr.",
    lessonLabel: "درس 46 — در اتاق نشیمن (قفسهٔ کتاب، چراغ)"
  },
  {
    word: "turn the radio off",
    meaning: "رادیو را خاموش کردن",
    lesson: 46,
    pos: "phr.",
    lessonLabel: "درس 46 — در اتاق نشیمن (قفسهٔ کتاب، چراغ)"
  },
  {
    word: "turn the TV on",
    meaning: "تلویزیون را روشن کردن",
    lesson: 46,
    pos: "phr.",
    lessonLabel: "درس 46 — در اتاق نشیمن (قفسهٔ کتاب، چراغ)"
  },
  {
    word: "doctor",
    meaning: "پزشک",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — شغل‌ها"
  },
  {
    word: "teacher",
    meaning: "معلم",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — شغل‌ها"
  },
  {
    word: "nurse",
    meaning: "پرستار",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — شغل‌ها"
  },
  {
    word: "mechanic",
    meaning: "مکانیک",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — شغل‌ها"
  },
  {
    word: "secretary",
    meaning: "منشی",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — شغل‌ها"
  },
  {
    word: "shop assistant",
    meaning: "فروشندهٔ مغازه",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — شغل‌ها"
  },
  {
    word: "hairdresser",
    meaning: "آرایشگر",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — شغل‌ها"
  },
  {
    word: "engineer",
    meaning: "مهندس",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — شغل‌ها"
  },
  {
    word: "farmer",
    meaning: "کشاورز",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — شغل‌ها"
  },
  {
    word: "job",
    meaning: "شغل",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — شغل‌ها"
  },
  {
    word: "work",
    meaning: "کار کردن",
    lesson: 47,
    pos: "v.",
    lessonLabel: "درس 47 — شغل‌ها"
  },
  {
    word: "waiter",
    meaning: "گارسون",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — شغل‌ها"
  },
  {
    word: "office",
    meaning: "دفتر کار",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — شغل‌ها"
  },
  {
    word: "factory",
    meaning: "کارخانه",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — شغل‌ها"
  },
  {
    word: "shop",
    meaning: "مغازه",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — شغل‌ها"
  },
  {
    word: "hospital",
    meaning: "بیمارستان",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — شغل‌ها"
  },
  {
    word: "school/college",
    meaning: "مدرسه/دانشکده",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — شغل‌ها"
  },
  {
    word: "English",
    meaning: "زبان انگلیسی",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — در مدرسه و دانشگاه"
  },
  {
    word: "mathematics (maths)",
    meaning: "ریاضی",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — در مدرسه و دانشگاه"
  },
  {
    word: "art",
    meaning: "هنر",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — در مدرسه و دانشگاه"
  },
  {
    word: "history",
    meaning: "تاریخ",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — در مدرسه و دانشگاه"
  },
  {
    word: "geography",
    meaning: "جغرافیا",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — در مدرسه و دانشگاه"
  },
  {
    word: "biology",
    meaning: "زیست‌شناسی",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — در مدرسه و دانشگاه"
  },
  {
    word: "information technology",
    meaning: "فناوری اطلاعات",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — در مدرسه و دانشگاه"
  },
  {
    word: "technical drawing",
    meaning: "نقشه‌کشی فنی",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — در مدرسه و دانشگاه"
  },
  {
    word: "physical education",
    meaning: "تربیت بدنی",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — در مدرسه و دانشگاه"
  },
  {
    word: "chemistry",
    meaning: "شیمی",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — در مدرسه و دانشگاه"
  },
  {
    word: "languages",
    meaning: "زبان‌ها",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — در مدرسه و دانشگاه"
  },
  {
    word: "physics",
    meaning: "فیزیک",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — در مدرسه و دانشگاه"
  },
  {
    word: "music",
    meaning: "موسیقی",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — در مدرسه و دانشگاه"
  },
  {
    word: "board",
    meaning: "تخته (وایت‌برد)",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — در مدرسه و دانشگاه"
  },
  {
    word: "noticeboard",
    meaning: "تابلوی اعلانات",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — در مدرسه و دانشگاه"
  },
  {
    word: "cassette",
    meaning: "کاست",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — در مدرسه و دانشگاه"
  },
  {
    word: "piece of paper",
    meaning: "برگه کاغذ",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — در مدرسه و دانشگاه"
  },
  {
    word: "pencil",
    meaning: "مداد",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — در مدرسه و دانشگاه"
  },
  {
    word: "crayon",
    meaning: "پاستل/مداد شمعی",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — در مدرسه و دانشگاه"
  },
  {
    word: "board pen",
    meaning: "ماژیک تخته",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — در مدرسه و دانشگاه"
  },
  {
    word: "paper clip",
    meaning: "گیره کاغذ",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — در مدرسه و دانشگاه"
  },
  {
    word: "textbook",
    meaning: "کتاب درسی",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — در مدرسه و دانشگاه"
  },
  {
    word: "rubber",
    meaning: "پاک‌کن",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — در مدرسه و دانشگاه"
  },
  {
    word: "pencil sharpener",
    meaning: "تراش مداد",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — در مدرسه و دانشگاه"
  },
  {
    word: "board rubber",
    meaning: "پاک‌کن تخته",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — در مدرسه و دانشگاه"
  },
  {
    word: "drawing pin",
    meaning: "سنجاق ته‌گرد",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — در مدرسه و دانشگاه"
  },
  {
    word: "tape recorder",
    meaning: "ضبط صوت",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — در مدرسه و دانشگاه"
  },
  {
    word: "pen",
    meaning: "خودکار/قلم",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — در مدرسه و دانشگاه"
  },
  {
    word: "ruler",
    meaning: "خط‌کش",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — در مدرسه و دانشگاه"
  },
  {
    word: "notebook",
    meaning: "دفتر",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — در مدرسه و دانشگاه"
  },
  {
    word: "desk",
    meaning: "میز تحریر",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — در مدرسه و دانشگاه"
  },
  {
    word: "video recorder",
    meaning: "ضبط ویدئو",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — در مدرسه و دانشگاه"
  },
  {
    word: "computer",
    meaning: "رایانه",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — در مدرسه و دانشگاه"
  },
  {
    word: "OHP",
    meaning: "پروژکتور (اپیک)",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — در مدرسه و دانشگاه"
  },
  {
    word: "teach",
    meaning: "درس دادن",
    lesson: 48,
    pos: "v.",
    lessonLabel: "درس 48 — در مدرسه و دانشگاه"
  },
  {
    word: "study",
    meaning: "درس خواندن",
    lesson: 48,
    pos: "v.",
    lessonLabel: "درس 48 — در مدرسه و دانشگاه"
  },
  {
    word: "do homework",
    meaning: "تکالیف را انجام دادن",
    lesson: 48,
    pos: "phr.",
    lessonLabel: "درس 48 — در مدرسه و دانشگاه"
  },
  {
    word: "learn",
    meaning: "یاد گرفتن",
    lesson: 48,
    pos: "v.",
    lessonLabel: "درس 48 — در مدرسه و دانشگاه"
  },
  {
    word: "give a lecture",
    meaning: "سخنرانی دادن",
    lesson: 48,
    pos: "phr.",
    lessonLabel: "درس 48 — در مدرسه و دانشگاه"
  },
  {
    word: "take notes",
    meaning: "یادداشت برداشتن",
    lesson: 48,
    pos: "phr.",
    lessonLabel: "درس 48 — در مدرسه و دانشگاه"
  },
  {
    word: "do a course",
    meaning: "دوره‌ای را گذراندن",
    lesson: 48,
    pos: "phr.",
    lessonLabel: "درس 48 — در مدرسه و دانشگاه"
  },
  {
    word: "take/do an exam",
    meaning: "امتحان دادن",
    lesson: 48,
    pos: "phr.",
    lessonLabel: "درس 48 — در مدرسه و دانشگاه"
  },
  {
    word: "pass your exams",
    meaning: "قبول شدن در امتحان‌ها",
    lesson: 48,
    pos: "phr.",
    lessonLabel: "درس 48 — در مدرسه و دانشگاه"
  },
  {
    word: "fail your exams",
    meaning: "مردود شدن در امتحان‌ها",
    lesson: 48,
    pos: "phr.",
    lessonLabel: "درس 48 — در مدرسه و دانشگاه"
  },
  {
    word: "get a degree",
    meaning: "مدرک دانشگاهی گرفتن",
    lesson: 48,
    pos: "phr.",
    lessonLabel: "درس 48 — در مدرسه و دانشگاه"
  },
  {
    word: "letter",
    meaning: "نامه",
    lesson: 49,
    pos: "n.",
    lessonLabel: "درس 49 — ارتباطات"
  },
  {
    word: "date",
    meaning: "تاریخ",
    lesson: 49,
    pos: "n.",
    lessonLabel: "درس 49 — ارتباطات"
  },
  {
    word: "address",
    meaning: "آدرس",
    lesson: 49,
    pos: "n.",
    lessonLabel: "درس 49 — ارتباطات"
  },
  {
    word: "envelope",
    meaning: "پاکت نامه",
    lesson: 49,
    pos: "n.",
    lessonLabel: "درس 49 — ارتباطات"
  },
  {
    word: "stamp",
    meaning: "تمبر",
    lesson: 49,
    pos: "n.",
    lessonLabel: "درس 49 — ارتباطات"
  },
  {
    word: "post box",
    meaning: "صندوق پست",
    lesson: 49,
    pos: "n.",
    lessonLabel: "درس 49 — ارتباطات"
  },
  {
    word: "post",
    meaning: "پست کردن، فرستادن (نامه)",
    lesson: 49,
    pos: "v.",
    lessonLabel: "درس 49 — ارتباطات"
  },
  {
    word: "answerphone",
    meaning: "پاسخگوی تلفنی (منشی تلفن)",
    lesson: 49,
    pos: "n.",
    lessonLabel: "درس 49 — ارتباطات"
  },
  {
    word: "mobile phone",
    meaning: "تلفن همراه",
    lesson: 49,
    pos: "n.",
    lessonLabel: "درس 49 — ارتباطات"
  },
  {
    word: "(tele)phone",
    meaning: "تلفن",
    lesson: 49,
    pos: "n.",
    lessonLabel: "درس 49 — ارتباطات"
  },
  {
    word: "phone box",
    meaning: "کابین تلفن عمومی",
    lesson: 49,
    pos: "n.",
    lessonLabel: "درس 49 — ارتباطات"
  },
  {
    word: "fax",
    meaning: "فکس",
    lesson: 49,
    pos: "n.",
    lessonLabel: "درس 49 — ارتباطات"
  },
  {
    word: "phone call",
    meaning: "تماس تلفنی",
    lesson: 49,
    pos: "n.",
    lessonLabel: "درس 49 — ارتباطات"
  },
  {
    word: "phone/fax number",
    meaning: "شماره تلفن/فکس",
    lesson: 49,
    pos: "n.",
    lessonLabel: "درس 49 — ارتباطات"
  },
  {
    word: "e-mail",
    meaning: "ایمیل",
    lesson: 49,
    pos: "n.",
    lessonLabel: "درس 49 — ارتباطات"
  },
  {
    word: "e-mail address",
    meaning: "آدرس ایمیل",
    lesson: 49,
    pos: "n.",
    lessonLabel: "درس 49 — ارتباطات"
  },
  {
    word: "computer",
    meaning: "رایانه",
    lesson: 49,
    pos: "n.",
    lessonLabel: "درس 49 — ارتباطات"
  },
  {
    word: "screen",
    meaning: "صفحهٔ نمایش",
    lesson: 49,
    pos: "n.",
    lessonLabel: "درس 49 — ارتباطات"
  },
  {
    word: "keyboard",
    meaning: "صفحهٔ کلید",
    lesson: 49,
    pos: "n.",
    lessonLabel: "درس 49 — ارتباطات"
  },
  {
    word: "mouse",
    meaning: "موس",
    lesson: 49,
    pos: "n.",
    lessonLabel: "درس 49 — ارتباطات"
  },
  {
    word: "disk",
    meaning: "دیسک",
    lesson: 49,
    pos: "n.",
    lessonLabel: "درس 49 — ارتباطات"
  },
  {
    word: "holiday",
    meaning: "تعطیلات، سفر",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — تعطیلات"
  },
  {
    word: "package holiday",
    meaning: "تور کامل (که همه‌چیز شامل پرواز، هتل و غیره است)",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — تعطیلات"
  },
  {
    word: "winter holiday",
    meaning: "تعطیلات زمستانی",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — تعطیلات"
  },
  {
    word: "camping",
    meaning: "چادرزنی",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — تعطیلات"
  },
  {
    word: "walking holiday",
    meaning: "تعطیلات پیاده‌روی (کوه‌پیمایی)",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — تعطیلات"
  },
  {
    word: "coach tour",
    meaning: "تور اتوبوسی",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — تعطیلات"
  },
  {
    word: "flying",
    meaning: "پرواز کردن (با هواپیما)",
    lesson: 50,
    pos: "v.",
    lessonLabel: "درس 50 — تعطیلات"
  },
  {
    word: "ferry",
    meaning: "کشتی (برای حمل خودرو و مسافر)",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — تعطیلات"
  },
  {
    word: "by car",
    meaning: "با ماشین",
    lesson: 50,
    pos: "phr.",
    lessonLabel: "درس 50 — تعطیلات"
  },
  {
    word: "by train",
    meaning: "با قطار",
    lesson: 50,
    pos: "phr.",
    lessonLabel: "درس 50 — تعطیلات"
  },
  {
    word: "by bus",
    meaning: "با اتوبوس",
    lesson: 50,
    pos: "phr.",
    lessonLabel: "درس 50 — تعطیلات"
  },
  {
    word: "passport",
    meaning: "گذرنامه",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — تعطیلات"
  },
  {
    word: "visa",
    meaning: "ویزا",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — تعطیلات"
  },
  {
    word: "tickets",
    meaning: "بلیط‌ها",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — تعطیلات"
  },
  {
    word: "traveller's cheques",
    meaning: "چک‌های مسافرتی",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — تعطیلات"
  },
  {
    word: "currency",
    meaning: "ارز (پول کشور مقصد)",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — تعطیلات"
  },
  {
    word: "camera",
    meaning: "دوربین عکاسی",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — تعطیلات"
  },
  {
    word: "phrase book",
    meaning: "کتاب عبارت‌های زبان",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — تعطیلات"
  },
  {
    word: "luggage",
    meaning: "چمدان و اسباب‌سفر",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — تعطیلات"
  },
  {
    word: "postcards",
    meaning: "کارت پستال‌ها",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — تعطیلات"
  },
  {
    word: "local food",
    meaning: "غذای محلی",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — تعطیلات"
  },
  {
    word: "nightlife",
    meaning: "زندگی شبانه (دیسکو، کلاب و غیره)",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — تعطیلات"
  },
  {
    word: "speak the language",
    meaning: "صحبت کردن به زبان (محلی)",
    lesson: 50,
    pos: "phr.",
    lessonLabel: "درس 50 — تعطیلات"
  },
  {
    word: "Tourist Information Office",
    meaning: "دفتر اطلاعات گردشگری",
    lesson: 50,
    pos: "phr.",
    lessonLabel: "درس 50 — تعطیلات"
  },
  {
    word: "Tourist Office",
    meaning: "دفتر گردشگری",
    lesson: 50,
    pos: "phr.",
    lessonLabel: "درس 50 — تعطیلات"
  },
  {
    word: "fly",
    meaning: "پرواز کردن",
    lesson: 50,
    pos: "v.",
    lessonLabel: "درس 50 — تعطیلات"
  },
  {
    word: "butcher",
    meaning: "قصاب",
    lesson: 51,
    pos: "n.",
    lessonLabel: "درس 51 — مغازه‌ها و خرید"
  },
  {
    word: "supermarket",
    meaning: "فروشگاه بزرگ / سوپرمارکت",
    lesson: 51,
    pos: "n.",
    lessonLabel: "درس 51 — مغازه‌ها و خرید"
  },
  {
    word: "book shop",
    meaning: "کتاب‌فروشی",
    lesson: 51,
    pos: "n.",
    lessonLabel: "درس 51 — مغازه‌ها و خرید"
  },
  {
    word: "toy shop",
    meaning: "اسباب‌بازی‌فروشی",
    lesson: 51,
    pos: "n.",
    lessonLabel: "درس 51 — مغازه‌ها و خرید"
  },
  {
    word: "post office",
    meaning: "دفتر پست",
    lesson: 51,
    pos: "n.",
    lessonLabel: "درس 51 — مغازه‌ها و خرید"
  },
  {
    word: "hairdresser",
    meaning: "آرایشگر",
    lesson: 51,
    pos: "n.",
    lessonLabel: "درس 51 — مغازه‌ها و خرید"
  },
  {
    word: "baker",
    meaning: "نانوا / نانوایی",
    lesson: 51,
    pos: "n.",
    lessonLabel: "درس 51 — مغازه‌ها و خرید"
  },
  {
    word: "chemist",
    meaning: "داروخانه / دارو فروش",
    lesson: 51,
    pos: "n.",
    lessonLabel: "درس 51 — مغازه‌ها و خرید"
  },
  {
    word: "newsagent",
    meaning: "دست‌فروش روزنامه / روزنامه‌فروشی",
    lesson: 51,
    pos: "n.",
    lessonLabel: "درس 51 — مغازه‌ها و خرید"
  },
  {
    word: "gift shop",
    meaning: "فروشگاه سوغات و کادو",
    lesson: 51,
    pos: "n.",
    lessonLabel: "درس 51 — مغازه‌ها و خرید"
  },
  {
    word: "department store",
    meaning: "فروشگاه چندطبقه",
    lesson: 51,
    pos: "n.",
    lessonLabel: "درس 51 — مغازه‌ها و خرید"
  },
  {
    word: "basement",
    meaning: "زیرزمین",
    lesson: 51,
    pos: "n.",
    lessonLabel: "درس 51 — مغازه‌ها و خرید"
  },
  {
    word: "ground floor",
    meaning: "همکف",
    lesson: 51,
    pos: "n.",
    lessonLabel: "درس 51 — مغازه‌ها و خرید"
  },
  {
    word: "first floor",
    meaning: "طبقه اول",
    lesson: 51,
    pos: "n.",
    lessonLabel: "درس 51 — مغازه‌ها و خرید"
  },
  {
    word: "second floor",
    meaning: "طبقه دوم",
    lesson: 51,
    pos: "n.",
    lessonLabel: "درس 51 — مغازه‌ها و خرید"
  },
  {
    word: "third floor",
    meaning: "طبقه سوم",
    lesson: 51,
    pos: "n.",
    lessonLabel: "درس 51 — مغازه‌ها و خرید"
  },
  {
    word: "fourth floor",
    meaning: "طبقه چهارم",
    lesson: 51,
    pos: "n.",
    lessonLabel: "درس 51 — مغازه‌ها و خرید"
  },
  {
    word: "cosmetics",
    meaning: "لوازم آرایشی",
    lesson: 51,
    pos: "n.",
    lessonLabel: "درس 51 — مغازه‌ها و خرید"
  },
  {
    word: "stationery",
    meaning: "لوازم تحریر",
    lesson: 51,
    pos: "n.",
    lessonLabel: "درس 51 — مغازه‌ها و خرید"
  },
  {
    word: "ladieswear",
    meaning: "پوشاک زنانه",
    lesson: 51,
    pos: "n.",
    lessonLabel: "درس 51 — مغازه‌ها و خرید"
  },
  {
    word: "childrenswear",
    meaning: "پوشاک کودکان",
    lesson: 51,
    pos: "n.",
    lessonLabel: "درس 51 — مغازه‌ها و خرید"
  },
  {
    word: "menswear",
    meaning: "پوشاک مردانه",
    lesson: 51,
    pos: "n.",
    lessonLabel: "درس 51 — مغازه‌ها و خرید"
  },
  {
    word: "electrical goods",
    meaning: "کالاهای برقی",
    lesson: 51,
    pos: "n.",
    lessonLabel: "درس 51 — مغازه‌ها و خرید"
  },
  {
    word: "furniture",
    meaning: "اثاثیه / مبلمان",
    lesson: 51,
    pos: "n.",
    lessonLabel: "درس 51 — مغازه‌ها و خرید"
  },
  {
    word: "restaurant",
    meaning: "رستوران",
    lesson: 51,
    pos: "n.",
    lessonLabel: "درس 51 — مغازه‌ها و خرید"
  },
  {
    word: "shop assistant",
    meaning: "فروشنده / دستیار فروشگاه",
    lesson: 51,
    pos: "n.",
    lessonLabel: "درس 51 — مغازه‌ها و خرید"
  },
  {
    word: "cash desk / till",
    meaning: "صندوق فروش",
    lesson: 51,
    pos: "n.",
    lessonLabel: "درس 51 — مغازه‌ها و خرید"
  },
  {
    word: "receipt",
    meaning: "رسید",
    lesson: 51,
    pos: "n.",
    lessonLabel: "درس 51 — مغازه‌ها و خرید"
  },
  {
    word: "cash",
    meaning: "پول نقد",
    lesson: 51,
    pos: "n.",
    lessonLabel: "درس 51 — مغازه‌ها و خرید"
  },
  {
    word: "coins / change",
    meaning: "سکه‌ها / پول خرد",
    lesson: 51,
    pos: "n.",
    lessonLabel: "درس 51 — مغازه‌ها و خرید"
  },
  {
    word: "cheque book",
    meaning: "دفترچه چک",
    lesson: 51,
    pos: "n.",
    lessonLabel: "درس 51 — مغازه‌ها و خرید"
  },
  {
    word: "credit card",
    meaning: "کارت اعتباری",
    lesson: 51,
    pos: "n.",
    lessonLabel: "درس 51 — مغازه‌ها و خرید"
  },
  {
    word: "note",
    meaning: "اسکناس",
    lesson: 51,
    pos: "n.",
    lessonLabel: "درس 51 — مغازه‌ها و خرید"
  },
  {
    word: "cost",
    meaning: "قیمت داشتن / خرج داشتن",
    lesson: 51,
    pos: "v.",
    lessonLabel: "درس 51 — مغازه‌ها و خرید"
  },
  {
    word: "pay",
    meaning: "پرداخت کردن",
    lesson: 51,
    pos: "v.",
    lessonLabel: "درس 51 — مغازه‌ها و خرید"
  },
  {
    word: "buy",
    meaning: "خریدن",
    lesson: 51,
    pos: "v.",
    lessonLabel: "درس 51 — مغازه‌ها و خرید"
  },
  {
    word: "try on",
    meaning: "پرو کردن (لباس)",
    lesson: 51,
    pos: "phr.",
    lessonLabel: "درس 51 — مغازه‌ها و خرید"
  },
  {
    word: "reception",
    meaning: "پذیرش (هتل)",
    lesson: 52,
    pos: "n.",
    lessonLabel: "درس 52 — در هتل"
  },
  {
    word: "lift",
    meaning: "آسانسور",
    lesson: 52,
    pos: "n.",
    lessonLabel: "درس 52 — در هتل"
  },
  {
    word: "key",
    meaning: "کلید",
    lesson: 52,
    pos: "n.",
    lessonLabel: "درس 52 — در هتل"
  },
  {
    word: "luggage",
    meaning: "چمدان و اسباب‌سفر",
    lesson: 52,
    pos: "n.",
    lessonLabel: "درس 52 — در هتل"
  },
  {
    word: "form",
    meaning: "فرم (برگهٔ اطلاعات)",
    lesson: 52,
    pos: "n.",
    lessonLabel: "درس 52 — در هتل"
  },
  {
    word: "bill",
    meaning: "صورت‌حساب",
    lesson: 52,
    pos: "n.",
    lessonLabel: "درس 52 — در هتل"
  },
  {
    word: "shower",
    meaning: "دوش (حمام)",
    lesson: 52,
    pos: "n.",
    lessonLabel: "درس 52 — در هتل"
  },
  {
    word: "TV",
    meaning: "تلویزیون",
    lesson: 52,
    pos: "n.",
    lessonLabel: "درس 52 — در هتل"
  },
  {
    word: "telephone",
    meaning: "تلفن",
    lesson: 52,
    pos: "n.",
    lessonLabel: "درس 52 — در هتل"
  },
  {
    word: "bathroom",
    meaning: "حمام",
    lesson: 52,
    pos: "n.",
    lessonLabel: "درس 52 — در هتل"
  },
  {
    word: "kettle",
    meaning: "کتری (برقی)",
    lesson: 52,
    pos: "n.",
    lessonLabel: "درس 52 — در هتل"
  },
  {
    word: "hair dryer",
    meaning: "سشوار",
    lesson: 52,
    pos: "n.",
    lessonLabel: "درس 52 — در هتل"
  },
  {
    word: "single room",
    meaning: "اتاق یک‌نفره",
    lesson: 52,
    pos: "n.",
    lessonLabel: "درس 52 — در هتل"
  },
  {
    word: "double room",
    meaning: "اتاق دونفره",
    lesson: 52,
    pos: "n.",
    lessonLabel: "درس 52 — در هتل"
  },
  {
    word: "reservation",
    meaning: "رزرو (رزرواسیون)",
    lesson: 52,
    pos: "n.",
    lessonLabel: "درس 52 — در هتل"
  },
  {
    word: "first floor",
    meaning: "طبقهٔ اول",
    lesson: 52,
    pos: "phr.",
    lessonLabel: "درس 52 — در هتل"
  },
  {
    word: "fill in",
    meaning: "پُر کردن (فرم)",
    lesson: 52,
    pos: "v.",
    lessonLabel: "درس 52 — در هتل"
  },
  {
    word: "sign",
    meaning: "امضا کردن",
    lesson: 52,
    pos: "v.",
    lessonLabel: "درس 52 — در هتل"
  },
  {
    word: "check",
    meaning: "بررسی کردن",
    lesson: 52,
    pos: "v.",
    lessonLabel: "درس 52 — در هتل"
  },
  {
    word: "check out",
    meaning: "تسویه‌حساب و ترک هتل",
    lesson: 52,
    pos: "v.",
    lessonLabel: "درس 52 — در هتل"
  },
  {
    word: "outside line",
    meaning: "خط بیرونی (تلفن)",
    lesson: 52,
    pos: "n.",
    lessonLabel: "درس 52 — در هتل"
  },
  {
    word: "code",
    meaning: "کد (پیش‌شمارهٔ کشور)",
    lesson: 52,
    pos: "n.",
    lessonLabel: "درس 52 — در هتل"
  },
  {
    word: "breakfast in my room",
    meaning: "صبحانه در اتاقم",
    lesson: 52,
    pos: "phr.",
    lessonLabel: "درس 52 — در هتل"
  },
  {
    word: "morning call",
    meaning: "تماس صبحگاهی (بیدارباش)",
    lesson: 52,
    pos: "n.",
    lessonLabel: "درس 52 — در هتل"
  },
  {
    word: "change",
    meaning: "عوض کردن / تبدیل کردن (پول)",
    lesson: 52,
    pos: "v.",
    lessonLabel: "درس 52 — در هتل"
  },
  {
    word: "into",
    meaning: "به (تبدیل به)",
    lesson: 52,
    pos: "phr.",
    lessonLabel: "درس 52 — در هتل"
  },
  {
    word: "How many yen to the pound?",
    meaning: "هر پوند چند یِن است؟",
    lesson: 52,
    pos: "phr.",
    lessonLabel: "درس 52 — در هتل"
  },
  {
    word: "currency",
    meaning: "واحد پول",
    lesson: 52,
    pos: "n.",
    lessonLabel: "درس 52 — در هتل"
  },
  {
    word: "cash",
    meaning: "نقد کردن (چک)",
    lesson: 52,
    pos: "v.",
    lessonLabel: "درس 52 — در هتل"
  },
  {
    word: "traveller's cheque",
    meaning: "چک مسافرتی",
    lesson: 52,
    pos: "n.",
    lessonLabel: "درس 52 — در هتل"
  },
  {
    word: "café",
    meaning: "کافه",
    lesson: 53,
    pos: "n.",
    lessonLabel: "درس 53 — غذا خوردن بیرون از خانه"
  },
  {
    word: "snack",
    meaning: "خوراکی سبک، میان‌وعده",
    lesson: 53,
    pos: "n.",
    lessonLabel: "درس 53 — غذا خوردن بیرون از خانه"
  },
  {
    word: "restaurant",
    meaning: "رستوران",
    lesson: 53,
    pos: "n.",
    lessonLabel: "درس 53 — غذا خوردن بیرون از خانه"
  },
  {
    word: "bar/pub",
    meaning: "بار / پاب (مغازه‌ای که الکل سرو می‌کند)",
    lesson: 53,
    pos: "n.",
    lessonLabel: "درس 53 — غذا خوردن بیرون از خانه"
  },
  {
    word: "soft drinks",
    meaning: "نوشیدنی‌های غیرالکلی",
    lesson: 53,
    lessonLabel: "درس 53 — غذا خوردن بیرون از خانه"
  },
  {
    word: "sandwich bar",
    meaning: "ساندویچ‌فروشی",
    lesson: 53,
    pos: "n.",
    lessonLabel: "درس 53 — غذا خوردن بیرون از خانه"
  },
  {
    word: "fast food restaurant",
    meaning: "رستوران فست‌فود",
    lesson: 53,
    pos: "n.",
    lessonLabel: "درس 53 — غذا خوردن بیرون از خانه"
  },
  {
    word: "self-service restaurant/café",
    meaning: "رستوران/کافه سلف‌سرویس",
    lesson: 53,
    pos: "n.",
    lessonLabel: "درس 53 — غذا خوردن بیرون از خانه"
  },
  {
    word: "wine list",
    meaning: "لیست شراب (منوی نوشیدنی)",
    lesson: 53,
    pos: "n.",
    lessonLabel: "درس 53 — غذا خوردن بیرون از خانه"
  },
  {
    word: "starters",
    meaning: "پیش‌غذاها",
    lesson: 53,
    pos: "n.",
    lessonLabel: "درس 53 — غذا خوردن بیرون از خانه"
  },
  {
    word: "main courses",
    meaning: "غذاهای اصلی",
    lesson: 53,
    pos: "n.",
    lessonLabel: "درس 53 — غذا خوردن بیرون از خانه"
  },
  {
    word: "dessert",
    meaning: "دسر",
    lesson: 53,
    pos: "n.",
    lessonLabel: "درس 53 — غذا خوردن بیرون از خانه"
  },
  {
    word: "tomato soup",
    meaning: "سوپ گوجه‌فرنگی",
    lesson: 53,
    pos: "n.",
    lessonLabel: "درس 53 — غذا خوردن بیرون از خانه"
  },
  {
    word: "melon",
    meaning: "طالبی/خربزه",
    lesson: 53,
    pos: "n.",
    lessonLabel: "درس 53 — غذا خوردن بیرون از خانه"
  },
  {
    word: "orange juice",
    meaning: "آب پرتقال",
    lesson: 53,
    pos: "n.",
    lessonLabel: "درس 53 — غذا خوردن بیرون از خانه"
  },
  {
    word: "roast beef, green peas, carrots and roast potatoes",
    meaning: "گوشت رست‌شده، نخودفرنگی سبز، هویج و سیب‌زمینی رست‌شده",
    lesson: 53,
    pos: "n.",
    lessonLabel: "درس 53 — غذا خوردن بیرون از خانه"
  },
  {
    word: "chicken salad",
    meaning: "سالاد مرغ",
    lesson: 53,
    pos: "n.",
    lessonLabel: "درس 53 — غذا خوردن بیرون از خانه"
  },
  {
    word: "steak, mashed potatoes and mixed vegetables",
    meaning: "استیک، سیب‌زمینی پوره و سبزیجات مخلوط",
    lesson: 53,
    pos: "n.",
    lessonLabel: "درس 53 — غذا خوردن بیرون از خانه"
  },
  {
    word: "fish, chips and beans",
    meaning: "ماهی، سیب‌زمینی سرخ‌کرده و لوبیا",
    lesson: 53,
    pos: "n.",
    lessonLabel: "درس 53 — غذا خوردن بیرون از خانه"
  },
  {
    word: "cheese, ham or plain omelette",
    meaning: "املت پنیر، ژامبون یا ساده",
    lesson: 53,
    pos: "n.",
    lessonLabel: "درس 53 — غذا خوردن بیرون از خانه"
  },
  {
    word: "ice-cream",
    meaning: "بستنی",
    lesson: 53,
    pos: "n.",
    lessonLabel: "درس 53 — غذا خوردن بیرون از خانه"
  },
  {
    word: "strawberries and cream",
    meaning: "توت‌فرنگی با خامه",
    lesson: 53,
    pos: "n.",
    lessonLabel: "درس 53 — غذا خوردن بیرون از خانه"
  },
  {
    word: "fruit salad",
    meaning: "سالاد میوه",
    lesson: 53,
    pos: "n.",
    lessonLabel: "درس 53 — غذا خوردن بیرون از خانه"
  },
  {
    word: "chocolate gateau",
    meaning: "کیک شکلاتی",
    lesson: 53,
    pos: "n.",
    lessonLabel: "درس 53 — غذا خوردن بیرون از خانه"
  },
  {
    word: "rare",
    meaning: "کم‌پز (گوشت)",
    lesson: 53,
    pos: "adj.",
    lessonLabel: "درس 53 — غذا خوردن بیرون از خانه"
  },
  {
    word: "medium",
    meaning: "نیم‌پز (گوشت)",
    lesson: 53,
    pos: "adj.",
    lessonLabel: "درس 53 — غذا خوردن بیرون از خانه"
  },
  {
    word: "well-done",
    meaning: "کاملاً پخته",
    lesson: 53,
    pos: "adj.",
    lessonLabel: "درس 53 — غذا خوردن بیرون از خانه"
  },
  {
    word: "football (soccer)",
    meaning: "فوتبال (سوکر)",
    lesson: 54,
    lessonLabel: "درس 54 — ورزش"
  },
  {
    word: "rugby",
    meaning: "راگبی",
    lesson: 54,
    lessonLabel: "درس 54 — ورزش"
  },
  {
    word: "American football",
    meaning: "فوتبال آمریکایی",
    lesson: 54,
    lessonLabel: "درس 54 — ورزش"
  },
  {
    word: "basketball",
    meaning: "بسکتبال",
    lesson: 54,
    lessonLabel: "درس 54 — ورزش"
  },
  {
    word: "badminton",
    meaning: "بدمینتون",
    lesson: 54,
    lessonLabel: "درس 54 — ورزش"
  },
  {
    word: "baseball",
    meaning: "بیسبال",
    lesson: 54,
    lessonLabel: "درس 54 — ورزش"
  },
  {
    word: "volleyball",
    meaning: "والیبال",
    lesson: 54,
    lessonLabel: "درس 54 — ورزش"
  },
  {
    word: "cricket",
    meaning: "کریکت",
    lesson: 54,
    lessonLabel: "درس 54 — ورزش"
  },
  {
    word: "tennis",
    meaning: "تنیس",
    lesson: 54,
    lessonLabel: "درس 54 — ورزش"
  },
  {
    word: "table tennis",
    meaning: "تنیس روی میز",
    lesson: 54,
    lessonLabel: "درس 54 — ورزش"
  },
  {
    word: "swimming",
    meaning: "شنا",
    lesson: 54,
    lessonLabel: "درس 54 — ورزش"
  },
  {
    word: "running",
    meaning: "دویدن/دو",
    lesson: 54,
    lessonLabel: "درس 54 — ورزش"
  },
  {
    word: "sailing",
    meaning: "قایقرانی بادبانی",
    lesson: 54,
    lessonLabel: "درس 54 — ورزش"
  },
  {
    word: "motor racing",
    meaning: "مسابقات اتومبیلرانی",
    lesson: 54,
    lessonLabel: "درس 54 — ورزش"
  },
  {
    word: "horse racing",
    meaning: "اسب‌دوانی",
    lesson: 54,
    lessonLabel: "درس 54 — ورزش"
  },
  {
    word: "judo/karate",
    meaning: "جودو/کاراته",
    lesson: 54,
    lessonLabel: "درس 54 — ورزش"
  },
  {
    word: "skiing",
    meaning: "اسکی",
    lesson: 54,
    lessonLabel: "درس 54 — ورزش"
  },
  {
    word: "canoeing",
    meaning: "قایق‌رانی با کانو",
    lesson: 54,
    lessonLabel: "درس 54 — ورزش"
  },
  {
    word: "court",
    meaning: "زمین بازی (تنیس/بسکتبال و...)",
    lesson: 54,
    lessonLabel: "درس 54 — ورزش"
  },
  {
    word: "field",
    meaning: "زمین (فوتبال/کریکت/راگبی)",
    lesson: 54,
    lessonLabel: "درس 54 — ورزش"
  },
  {
    word: "pitch",
    meaning: "زمین بازی (چمنی)",
    lesson: 54,
    lessonLabel: "درس 54 — ورزش"
  },
  {
    word: "swimming pool",
    meaning: "استخر",
    lesson: 54,
    lessonLabel: "درس 54 — ورزش"
  },
  {
    word: "western",
    meaning: "فیلم وسترن",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — سینما"
  },
  {
    word: "a horror film",
    meaning: "فیلم ترسناک",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — سینما"
  },
  {
    word: "an action film",
    meaning: "فیلم اکشن",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — سینما"
  },
  {
    word: "a musical",
    meaning: "فیلم موزیکال",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — سینما"
  },
  {
    word: "a cartoon",
    meaning: "فیلم انیمیشن/کارتون",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — سینما"
  },
  {
    word: "a crime/detective film",
    meaning: "فیلم جنایی/کارآگاهی",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — سینما"
  },
  {
    word: "a comedy",
    meaning: "فیلم کمدی",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — سینما"
  },
  {
    word: "a science fiction film",
    meaning: "فیلم علمی–تخیلی",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — سینما"
  },
  {
    word: "a love story / a romantic film",
    meaning: "داستان عاشقانه / فیلم رمانتیک",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — سینما"
  },
  {
    word: "science fiction films",
    meaning: "فیلم‌های علمی–تخیلی",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — سینما"
  },
  {
    word: "action film",
    meaning: "فیلم اکشن",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — سینما"
  },
  {
    word: "horror film",
    meaning: "فیلم ترسناک",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — سینما"
  },
  {
    word: "film star",
    meaning: "ستارهٔ سینما",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — سینما"
  },
  {
    word: "in the new James Bond film",
    meaning: "در فیلم جدید جیمز باند",
    lesson: 55,
    pos: "phr.",
    lessonLabel: "درس 55 — سینما"
  },
  {
    word: "played",
    meaning: "بازی کرد (نقش)",
    lesson: 55,
    pos: "v.",
    lessonLabel: "درس 55 — سینما"
  },
  {
    word: "directors",
    meaning: "کارگردان‌ها",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — سینما"
  },
  {
    word: "to the cinema",
    meaning: "به سینما",
    lesson: 55,
    pos: "phr.",
    lessonLabel: "درس 55 — سینما"
  },
  {
    word: "watch videos",
    meaning: "تماشای ویدیو",
    lesson: 55,
    pos: "phr.",
    lessonLabel: "درس 55 — سینما"
  },
  {
    word: "What's on at the cinema",
    meaning: "چه فیلمی در سینما اکران شده",
    lesson: 55,
    pos: "phr.",
    lessonLabel: "درس 55 — سینما"
  },
  {
    word: "seen",
    meaning: "دیده‌ (اسم فیلم)",
    lesson: 55,
    pos: "v.",
    lessonLabel: "درس 55 — سینما"
  },
  {
    word: "on TV",
    meaning: "از تلویزیون",
    lesson: 55,
    pos: "phr.",
    lessonLabel: "درس 55 — سینما"
  },
  {
    word: "loved it",
    meaning: "خیلی دوستش داشتم",
    lesson: 55,
    pos: "phr.",
    lessonLabel: "درس 55 — سینما"
  },
  {
    word: "enjoyed it",
    meaning: "ازش لذت بردم",
    lesson: 55,
    pos: "phr.",
    lessonLabel: "درس 55 — سینما"
  },
  {
    word: "boring",
    meaning: "خسته‌کننده",
    lesson: 55,
    pos: "adj.",
    lessonLabel: "درس 55 — سینما"
  },
  {
    word: "watch TV",
    meaning: "تماشای تلویزیون",
    lesson: 56,
    pos: "v.",
    lessonLabel: "درس 56 — تفریح در خانه"
  },
  {
    word: "see a film",
    meaning: "دیدن یک فیلم",
    lesson: 56,
    pos: "v.",
    lessonLabel: "درس 56 — تفریح در خانه"
  },
  {
    word: "listen to the radio",
    meaning: "گوش دادن به رادیو",
    lesson: 56,
    pos: "phr.",
    lessonLabel: "درس 56 — تفریح در خانه"
  },
  {
    word: "programmes",
    meaning: "برنامه‌ها",
    lesson: 56,
    pos: "n.",
    lessonLabel: "درس 56 — تفریح در خانه"
  },
  {
    word: "watching films",
    meaning: "تماشای فیلم‌ها",
    lesson: 56,
    pos: "phr.",
    lessonLabel: "درس 56 — تفریح در خانه"
  },
  {
    word: "listening to music",
    meaning: "گوش دادن به موسیقی",
    lesson: 56,
    pos: "phr.",
    lessonLabel: "درس 56 — تفریح در خانه"
  },
  {
    word: "CDs",
    meaning: "لوح‌های فشرده",
    lesson: 56,
    pos: "n.",
    lessonLabel: "درس 56 — تفریح در خانه"
  },
  {
    word: "tapes",
    meaning: "نوارهای کاست",
    lesson: 56,
    pos: "n.",
    lessonLabel: "درس 56 — تفریح در خانه"
  },
  {
    word: "watch a video",
    meaning: "تماشای ویدئو",
    lesson: 56,
    pos: "phr.",
    lessonLabel: "درس 56 — تفریح در خانه"
  },
  {
    word: "play computer games",
    meaning: "بازی‌های کامپیوتری بازی کردن",
    lesson: 56,
    pos: "phr.",
    lessonLabel: "درس 56 — تفریح در خانه"
  },
  {
    word: "use the Internet",
    meaning: "استفاده از اینترنت",
    lesson: 56,
    pos: "phr.",
    lessonLabel: "درس 56 — تفریح در خانه"
  },
  {
    word: "cooking",
    meaning: "آشپزی",
    lesson: 56,
    pos: "n.",
    lessonLabel: "درس 56 — تفریح در خانه"
  },
  {
    word: "gardening",
    meaning: "باغبانی",
    lesson: 56,
    pos: "n.",
    lessonLabel: "درس 56 — تفریح در خانه"
  },
  {
    word: "grow flowers",
    meaning: "گل کاشتن",
    lesson: 56,
    pos: "phr.",
    lessonLabel: "درس 56 — تفریح در خانه"
  },
  {
    word: "vegetables",
    meaning: "سبزیجات",
    lesson: 56,
    pos: "n.",
    lessonLabel: "درس 56 — تفریح در خانه"
  },
  {
    word: "garden",
    meaning: "باغ",
    lesson: 56,
    pos: "n.",
    lessonLabel: "درس 56 — تفریح در خانه"
  },
  {
    word: "house plants",
    meaning: "گیاهان آپارتمانی",
    lesson: 56,
    pos: "n.",
    lessonLabel: "درس 56 — تفریح در خانه"
  },
  {
    word: "read",
    meaning: "خواندن",
    lesson: 56,
    pos: "v.",
    lessonLabel: "درس 56 — تفریح در خانه"
  },
  {
    word: "novels",
    meaning: "رمان‌ها",
    lesson: 56,
    pos: "n.",
    lessonLabel: "درس 56 — تفریح در خانه"
  },
  {
    word: "books about nature",
    meaning: "کتاب‌های درباره طبیعت",
    lesson: 56,
    pos: "phr.",
    lessonLabel: "درس 56 — تفریح در خانه"
  },
  {
    word: "magazines",
    meaning: "مجله‌ها",
    lesson: 56,
    pos: "n.",
    lessonLabel: "درس 56 — تفریح در خانه"
  },
  {
    word: "newspaper",
    meaning: "روزنامه",
    lesson: 56,
    pos: "n.",
    lessonLabel: "درس 56 — تفریح در خانه"
  },
  {
    word: "invite friends around",
    meaning: "دعوت کردن دوستان به خانه",
    lesson: 56,
    pos: "phr.",
    lessonLabel: "درس 56 — تفریح در خانه"
  },
  {
    word: "have friends around",
    meaning: "دوستان را به خانه آوردن",
    lesson: 56,
    pos: "phr.",
    lessonLabel: "درس 56 — تفریح در خانه"
  },
  {
    word: "have people to dinner",
    meaning: "مهمان گرفتن برای شام",
    lesson: 56,
    pos: "phr.",
    lessonLabel: "درس 56 — تفریح در خانه"
  },
  {
    word: "come to stay",
    meaning: "برای اقامت آمدن",
    lesson: 56,
    pos: "phr.",
    lessonLabel: "درس 56 — تفریح در خانه"
  },
  {
    word: "talk on the phone",
    meaning: "با تلفن صحبت کردن",
    lesson: 56,
    pos: "phr.",
    lessonLabel: "درس 56 — تفریح در خانه"
  },
  {
    word: "ring",
    meaning: "تلفن زدن",
    lesson: 56,
    pos: "v.",
    lessonLabel: "درس 56 — تفریح در خانه"
  },
  {
    word: "do nothing",
    meaning: "هیچ کاری نکردن",
    lesson: 56,
    pos: "phr.",
    lessonLabel: "درس 56 — تفریح در خانه"
  },
  {
    word: "have a sleep",
    meaning: "چرت زدن",
    lesson: 56,
    pos: "phr.",
    lessonLabel: "درس 56 — تفریح در خانه"
  },
  {
    word: "robbery",
    meaning: "سرقت (سرقت با زور/تخلف مسلحانه)",
    lesson: 57,
    pos: "n.",
    lessonLabel: "درس 57 — جرم و جنایت"
  },
  {
    word: "a robber",
    meaning: "سارق",
    lesson: 57,
    pos: "n.",
    lessonLabel: "درس 57 — جرم و جنایت"
  },
  {
    word: "to rob somebody or a place (e.g. a bank)",
    meaning: "سرقت کردن از کسی یا جایی (مثلاً بانک)",
    lesson: 57,
    pos: "v.",
    lessonLabel: "درس 57 — جرم و جنایت"
  },
  {
    word: "murder",
    meaning: "قتل",
    lesson: 57,
    pos: "n.",
    lessonLabel: "درس 57 — جرم و جنایت"
  },
  {
    word: "a murderer",
    meaning: "قاتل",
    lesson: 57,
    pos: "n.",
    lessonLabel: "درس 57 — جرم و جنایت"
  },
  {
    word: "to murder somebody",
    meaning: "به قتل رساندن کسی",
    lesson: 57,
    pos: "v.",
    lessonLabel: "درس 57 — جرم و جنایت"
  },
  {
    word: "burglary",
    meaning: "سرقت از منزل",
    lesson: 57,
    pos: "n.",
    lessonLabel: "درس 57 — جرم و جنایت"
  },
  {
    word: "a burglar",
    meaning: "دزد خانه",
    lesson: 57,
    pos: "n.",
    lessonLabel: "درس 57 — جرم و جنایت"
  },
  {
    word: "to break into a house/flat",
    meaning: "نفوذ کردن به خانه/آپارتمان",
    lesson: 57,
    pos: "v.",
    lessonLabel: "درس 57 — جرم و جنایت"
  },
  {
    word: "mugging",
    meaning: "دزدی با زور در خیابان",
    lesson: 57,
    pos: "n.",
    lessonLabel: "درس 57 — جرم و جنایت"
  },
  {
    word: "a mugger",
    meaning: " PERSONی که در خیابان به کسی حمله و سرقت می‌کند",
    lesson: 57,
    pos: "n.",
    lessonLabel: "درس 57 — جرم و جنایت"
  },
  {
    word: "to mug somebody",
    meaning: "زدن و سرقت کردن از کسی در خیابان",
    lesson: 57,
    pos: "v.",
    lessonLabel: "درس 57 — جرم و جنایت"
  },
  {
    word: "car theft",
    meaning: "دزدی ماشین",
    lesson: 57,
    pos: "n.",
    lessonLabel: "درس 57 — جرم و جنایت"
  },
  {
    word: "a car thief",
    meaning: "دزد ماشین",
    lesson: 57,
    pos: "n.",
    lessonLabel: "درس 57 — جرم و جنایت"
  },
  {
    word: "to steal a car",
    meaning: "دزدیدن ماشین",
    lesson: 57,
    pos: "v.",
    lessonLabel: "درس 57 — جرم و جنایت"
  },
  {
    word: "drug pushing/dealing",
    meaning: "فروش/قاچاق مواد مخدر",
    lesson: 57,
    pos: "n.",
    lessonLabel: "درس 57 — جرم و جنایت"
  },
  {
    word: "a drug pusher/dealer",
    meaning: "فروشنده مواد مخدر",
    lesson: 57,
    pos: "n.",
    lessonLabel: "درس 57 — جرم و جنایت"
  },
  {
    word: "to sell drugs",
    meaning: "فروش مواد مخدر",
    lesson: 57,
    pos: "v.",
    lessonLabel: "درس 57 — جرم و جنایت"
  },
  {
    word: "terrorism",
    meaning: "تروریسم",
    lesson: 57,
    pos: "n.",
    lessonLabel: "درس 57 — جرم و جنایت"
  },
  {
    word: "a terrorist",
    meaning: "تروریست",
    lesson: 57,
    pos: "n.",
    lessonLabel: "درس 57 — جرم و جنایت"
  },
  {
    word: "to attack somebody or a place",
    meaning: "حمله کردن به کسی یا جایی",
    lesson: 57,
    pos: "v.",
    lessonLabel: "درس 57 — جرم و جنایت"
  },
  {
    word: "shoplifting",
    meaning: "دزدی از فروشگاه",
    lesson: 57,
    pos: "n.",
    lessonLabel: "درس 57 — جرم و جنایت"
  },
  {
    word: "a shoplifter",
    meaning: "دزد فروشگاهی",
    lesson: 57,
    pos: "n.",
    lessonLabel: "درس 57 — جرم و جنایت"
  },
  {
    word: "to steal things from a shop",
    meaning: "دزدیدن اجناس از فروشگاه",
    lesson: 57,
    pos: "v.",
    lessonLabel: "درس 57 — جرم و جنایت"
  },
  {
    word: "arrest",
    meaning: "دستگیر کردن",
    lesson: 57,
    pos: "v.",
    lessonLabel: "درس 57 — جرم و جنایت"
  },
  {
    word: "the police",
    meaning: "پلیس",
    lesson: 57,
    pos: "n.",
    lessonLabel: "درس 57 — جرم و جنایت"
  },
  {
    word: "go to court",
    meaning: "رفتن به دادگاه",
    lesson: 57,
    pos: "phr.",
    lessonLabel: "درس 57 — جرم و جنایت"
  },
  {
    word: "guilty",
    meaning: "مقصر/مجرم",
    lesson: 57,
    pos: "adj.",
    lessonLabel: "درس 57 — جرم و جنایت"
  },
  {
    word: "pay a fine",
    meaning: "پرداخت جریمه",
    lesson: 57,
    pos: "phr.",
    lessonLabel: "درس 57 — جرم و جنایت"
  },
  {
    word: "innocent",
    meaning: "بی‌گناه",
    lesson: 57,
    pos: "adj.",
    lessonLabel: "درس 57 — جرم و جنایت"
  },
  {
    word: "go to prison",
    meaning: "رفتن به زندان",
    lesson: 57,
    pos: "phr.",
    lessonLabel: "درس 57 — جرم و جنایت"
  },
  {
    word: "vandal",
    meaning: "/person که وسایل عمومی را خراب می‌کند",
    lesson: 57,
    pos: "n.",
    lessonLabel: "درس 57 — جرم و جنایت"
  },
  {
    word: "vandalism",
    meaning: "خرابکاری عمومی",
    lesson: 57,
    pos: "n.",
    lessonLabel: "درس 57 — جرم و جنایت"
  },
  {
    word: "take drugs",
    meaning: "مصرف مواد مخدر",
    lesson: 57,
    pos: "phr.",
    lessonLabel: "درس 57 — جرم و جنایت"
  },
  {
    word: "football hooliganism",
    meaning: "اخلال‌گری هواداران فوتبال",
    lesson: 57,
    pos: "n.",
    lessonLabel: "درس 57 — جرم و جنایت"
  },
  {
    word: "football hooligan",
    meaning: "/person خشن هوادار فوتبال",
    lesson: 57,
    pos: "n.",
    lessonLabel: "درس 57 — جرم و جنایت"
  },
  {
    word: "the news",
    meaning: "اخبار",
    lesson: 58,
    pos: "n.",
    lessonLabel: "درس 58 — رسانه‌ها"
  },
  {
    word: "soap / soap opera",
    meaning: "سریال (آپرا صابونی)",
    lesson: 58,
    pos: "n.",
    lessonLabel: "درس 58 — رسانه‌ها"
  },
  {
    word: "nature programme",
    meaning: "برنامه طبیعت (برنامه‌های درباره حیوانات و پرندگان)",
    lesson: 58,
    pos: "n.",
    lessonLabel: "درس 58 — رسانه‌ها"
  },
  {
    word: "documentary",
    meaning: "فیلم مستند",
    lesson: 58,
    pos: "n.",
    lessonLabel: "درس 58 — رسانه‌ها"
  },
  {
    word: "talk show",
    meaning: "برنامه گفتگو (تاک شو)",
    lesson: 58,
    pos: "n.",
    lessonLabel: "درس 58 — رسانه‌ها"
  },
  {
    word: "cartoon",
    meaning: "کارتون",
    lesson: 58,
    pos: "n.",
    lessonLabel: "درس 58 — رسانه‌ها"
  },
  {
    word: "sport programme",
    meaning: "برنامه ورزشی",
    lesson: 58,
    pos: "n.",
    lessonLabel: "درس 58 — رسانه‌ها"
  },
  {
    word: "morning newspaper",
    meaning: "روزنامه صبح",
    lesson: 58,
    pos: "n.",
    lessonLabel: "درس 58 — رسانه‌ها"
  },
  {
    word: "evening newspaper",
    meaning: "روزنامه عصر",
    lesson: 58,
    pos: "n.",
    lessonLabel: "درس 58 — رسانه‌ها"
  },
  {
    word: "magazine",
    meaning: "مجله",
    lesson: 58,
    pos: "n.",
    lessonLabel: "درس 58 — رسانه‌ها"
  },
  {
    word: "women's magazine",
    meaning: "مجله زنان",
    lesson: 58,
    pos: "n.",
    lessonLabel: "درس 58 — رسانه‌ها"
  },
  {
    word: "news magazine",
    meaning: "مجله خبری",
    lesson: 58,
    pos: "n.",
    lessonLabel: "درس 58 — رسانه‌ها"
  },
  {
    word: "comics",
    meaning: "کتاب‌های مصور",
    lesson: 58,
    pos: "n.",
    lessonLabel: "درس 58 — رسانه‌ها"
  },
  {
    word: "sports magazine",
    meaning: "مجله ورزشی",
    lesson: 58,
    pos: "n.",
    lessonLabel: "درس 58 — رسانه‌ها"
  },
  {
    word: "computer magazine",
    meaning: "مجله کامپیوتری",
    lesson: 58,
    pos: "n.",
    lessonLabel: "درس 58 — رسانه‌ها"
  },
  {
    word: "teenage magazine",
    meaning: "مجله نوجوانان",
    lesson: 58,
    pos: "n.",
    lessonLabel: "درس 58 — رسانه‌ها"
  },
  {
    word: "satellite TV",
    meaning: "تلویزیون ماهواره‌ای",
    lesson: 58,
    pos: "n.",
    lessonLabel: "درس 58 — رسانه‌ها"
  },
  {
    word: "channel",
    meaning: "کانال (شبکه)",
    lesson: 58,
    pos: "n.",
    lessonLabel: "درس 58 — رسانه‌ها"
  },
  {
    word: "the Internet",
    meaning: "اینترنت",
    lesson: 58,
    pos: "n.",
    lessonLabel: "درس 58 — رسانه‌ها"
  },
  {
    word: "satellite dish",
    meaning: "دیش ماهواره (آنتن ماهواره)",
    lesson: 58,
    pos: "n.",
    lessonLabel: "درس 58 — رسانه‌ها"
  },
  {
    word: "computer",
    meaning: "رایانه",
    lesson: 58,
    pos: "n.",
    lessonLabel: "درس 58 — رسانه‌ها"
  },
  {
    word: "interview",
    meaning: "مصاحبه",
    lesson: 58,
    pos: "n.",
    lessonLabel: "درس 58 — رسانه‌ها"
  },
  {
    word: "reporter",
    meaning: "گزارشگر",
    lesson: 58,
    pos: "n.",
    lessonLabel: "درس 58 — رسانه‌ها"
  },
  {
    word: "journalist",
    meaning: "روزنامه‌نگار",
    lesson: 58,
    pos: "n.",
    lessonLabel: "درس 58 — رسانه‌ها"
  },
  {
    word: "repair",
    meaning: "تعمیر کردن",
    lesson: 59,
    pos: "v.",
    lessonLabel: "درس 59 — مشکلات روزمره"
  },
  {
    word: "broken",
    meaning: "خراب / شکسته",
    lesson: 59,
    pos: "adj.",
    lessonLabel: "درس 59 — مشکلات روزمره"
  },
  {
    word: "mend",
    meaning: "ترمیم کردن",
    lesson: 59,
    pos: "v.",
    lessonLabel: "درس 59 — مشکلات روزمره"
  },
  {
    word: "dying",
    meaning: "در حال مردن",
    lesson: 59,
    pos: "adj.",
    lessonLabel: "درس 59 — مشکلات روزمره"
  },
  {
    word: "water",
    meaning: "آب دادن",
    lesson: 59,
    pos: "v.",
    lessonLabel: "درس 59 — مشکلات روزمره"
  },
  {
    word: "untidy",
    meaning: "نامرتب",
    lesson: 59,
    pos: "adj.",
    lessonLabel: "درس 59 — مشکلات روزمره"
  },
  {
    word: "tidy",
    meaning: "مرتب کردن",
    lesson: 59,
    pos: "v.",
    lessonLabel: "درس 59 — مشکلات روزمره"
  },
  {
    word: "lost",
    meaning: "گم شده / گم کردن (گذشته lose)",
    lesson: 59,
    pos: "adj.",
    lessonLabel: "درس 59 — مشکلات روزمره"
  },
  {
    word: "look for",
    meaning: "جستجو کردن",
    lesson: 59,
    pos: "phr.",
    lessonLabel: "درس 59 — مشکلات روزمره"
  },
  {
    word: "cut",
    meaning: "بریدن",
    lesson: 59,
    pos: "v.",
    lessonLabel: "درس 59 — مشکلات روزمره"
  },
  {
    word: "put on a plaster",
    meaning: "چسب زخم زدن",
    lesson: 59,
    pos: "phr.",
    lessonLabel: "درس 59 — مشکلات روزمره"
  },
  {
    word: "a row",
    meaning: "دعوا / بحث",
    lesson: 59,
    pos: "n.",
    lessonLabel: "درس 59 — مشکلات روزمره"
  },
  {
    word: "apologise",
    meaning: "عذرخواهی کردن (معذرت خواستن)",
    lesson: 59,
    pos: "v.",
    lessonLabel: "درس 59 — مشکلات روزمره"
  },
  {
    word: "be late for work",
    meaning: "دیر رسیدن به سر کار",
    lesson: 59,
    pos: "phr.",
    lessonLabel: "درس 59 — مشکلات روزمره"
  },
  {
    word: "too much work",
    meaning: "کار بیش از حد",
    lesson: 59,
    pos: "phr.",
    lessonLabel: "درس 59 — مشکلات روزمره"
  },
  {
    word: "colleague",
    meaning: "همکار",
    lesson: 59,
    pos: "n.",
    lessonLabel: "درس 59 — مشکلات روزمره"
  },
  {
    word: "in a bad mood",
    meaning: "بدخلق",
    lesson: 59,
    pos: "phr.",
    lessonLabel: "درس 59 — مشکلات روزمره"
  },
  {
    word: "computer crashed",
    meaning: "کامپیوتر از کار افتاد (کرش کرد)",
    lesson: 59,
    pos: "phr.",
    lessonLabel: "درس 59 — مشکلات روزمره"
  },
  {
    word: "out of order",
    meaning: "خراب (از کار افتاده)",
    lesson: 59,
    pos: "phr.",
    lessonLabel: "درس 59 — مشکلات روزمره"
  },
  {
    word: "isn't working",
    meaning: "کار نمی‌کند",
    lesson: 59,
    pos: "phr.",
    lessonLabel: "درس 59 — مشکلات روزمره"
  },
  {
    word: "hurricane",
    meaning: "توفان سهمگین",
    lesson: 60,
    pos: "n.",
    lessonLabel: "درس 60 — مشکلات جهانی"
  },
  {
    word: "snowstorm",
    meaning: "کولاک / طوفان برفی",
    lesson: 60,
    pos: "n.",
    lessonLabel: "درس 60 — مشکلات جهانی"
  },
  {
    word: "forest fire",
    meaning: "آتش‌سوزی جنگل",
    lesson: 60,
    pos: "n.",
    lessonLabel: "درس 60 — مشکلات جهانی"
  },
  {
    word: "earthquake",
    meaning: "زمین‌لرزه",
    lesson: 60,
    pos: "n.",
    lessonLabel: "درس 60 — مشکلات جهانی"
  },
  {
    word: "flood",
    meaning: "سیل / طغیان رود",
    lesson: 60,
    pos: "n.",
    lessonLabel: "درس 60 — مشکلات جهانی"
  },
  {
    word: "crowded",
    meaning: "شلوغ و پرازدحام",
    lesson: 60,
    pos: "adj.",
    lessonLabel: "درس 60 — مشکلات جهانی"
  },
  {
    word: "poor",
    meaning: "فقیر",
    lesson: 60,
    pos: "adj.",
    lessonLabel: "درس 60 — مشکلات جهانی"
  },
  {
    word: "hungry",
    meaning: "گرسنه",
    lesson: 60,
    pos: "adj.",
    lessonLabel: "درس 60 — مشکلات جهانی"
  },
  {
    word: "homeless",
    meaning: "بی‌خانمان",
    lesson: 60,
    pos: "adj.",
    lessonLabel: "درس 60 — مشکلات جهانی"
  },
  {
    word: "unemployed",
    meaning: "بیکار",
    lesson: 60,
    pos: "adj.",
    lessonLabel: "درس 60 — مشکلات جهانی"
  },
  {
    word: "pollution",
    meaning: "آلودگی",
    lesson: 60,
    pos: "n.",
    lessonLabel: "درس 60 — مشکلات جهانی"
  },
  {
    word: "air pollution",
    meaning: "آلودگی هوا",
    lesson: 60,
    pos: "n.",
    lessonLabel: "درس 60 — مشکلات جهانی"
  },
  {
    word: "polluted",
    meaning: "آلوده",
    lesson: 60,
    pos: "adj.",
    lessonLabel: "درس 60 — مشکلات جهانی"
  },
  {
    word: "war",
    meaning: "جنگ",
    lesson: 60,
    pos: "n.",
    lessonLabel: "درس 60 — مشکلات جهانی"
  },
  {
    word: "traffic jam",
    meaning: "ترافیک / ازدحام ترافیک",
    lesson: 60,
    pos: "n.",
    lessonLabel: "درس 60 — مشکلات جهانی"
  },
  {
    word: "the rush hour",
    meaning: "ساعت اوج رفت‌وآمد",
    lesson: 60,
    pos: "n.",
    lessonLabel: "درس 60 — مشکلات جهانی"
  },
  {
    word: "car crash",
    meaning: "تصادف ماشین",
    lesson: 60,
    pos: "n.",
    lessonLabel: "درس 60 — مشکلات جهانی"
  },
  {
    word: "strike",
    meaning: "اعصاب / اعتصاب",
    lesson: 60,
    pos: "n.",
    lessonLabel: "درس 60 — مشکلات جهانی"
  },
  {
    word: "on strike",
    meaning: "دست به اعتصاب زدن",
    lesson: 60,
    pos: "phr.",
    lessonLabel: "درس 60 — مشکلات جهانی"
  }
];

export const VOCAB_PART_4: Row[] = ROWS;
