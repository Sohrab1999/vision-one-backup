// واژگان درس‌های English Vocabulary in Use — Pre-int & Int (پارتیت 5) — استخراج VLM از اسکن PDF
// word = عین چاپ کتاب · meaning = ترجمهٔ ماشینی GLM (کلاس FA-NEW — اثبات صحت ترجمه نیست)
import type { VocabWord } from "../types";

type Row = Omit<VocabWord, "lesson"> & { lesson: number; lessonLabel: string };

const ROWS: Row[] = [
  {
    word: "laptop",
    meaning: "لپ‌تاپ",
    lesson: 81,
    pos: "n.",
    lessonLabel: "درس 81 — رایانه و اینترنت"
  },
  {
    word: "laser printer",
    meaning: "چاپگر لیزری",
    lesson: 81,
    pos: "n.",
    lessonLabel: "درس 81 — رایانه و اینترنت"
  },
  {
    word: "monitor",
    meaning: "مانیتور",
    lesson: 81,
    pos: "n.",
    lessonLabel: "درس 81 — رایانه و اینترنت"
  },
  {
    word: "screen",
    meaning: "صفحهٔ نمایش",
    lesson: 81,
    pos: "n.",
    lessonLabel: "درس 81 — رایانه و اینترنت"
  },
  {
    word: "tower",
    meaning: "کیس (برج رایانه)",
    lesson: 81,
    pos: "n.",
    lessonLabel: "درس 81 — رایانه و اینترنت"
  },
  {
    word: "CD-ROM",
    meaning: "سی‌دی‌رام",
    lesson: 81,
    pos: "n.",
    lessonLabel: "درس 81 — رایانه و اینترنت"
  },
  {
    word: "floppy disks/floppies",
    meaning: "دیسک‌های نرم",
    lesson: 81,
    pos: "n.",
    lessonLabel: "درس 81 — رایانه و اینترنت"
  },
  {
    word: "keyboard",
    meaning: "صفحه‌کلید",
    lesson: 81,
    pos: "n.",
    lessonLabel: "درس 81 — رایانه و اینترنت"
  },
  {
    word: "mouse",
    meaning: "موس",
    lesson: 81,
    pos: "n.",
    lessonLabel: "درس 81 — رایانه و اینترنت"
  },
  {
    word: "hardware",
    meaning: "سخت‌افزار",
    lesson: 81,
    pos: "n.",
    lessonLabel: "درس 81 — رایانه و اینترنت"
  },
  {
    word: "software",
    meaning: "نرم‌افزار",
    lesson: 81,
    pos: "n.",
    lessonLabel: "درس 81 — رایانه و اینترنت"
  },
  {
    word: "store",
    meaning: "ذخیره کردن",
    lesson: 81,
    pos: "v.",
    lessonLabel: "درس 81 — رایانه و اینترنت"
  },
  {
    word: "hard disk",
    meaning: "هارد دیسک",
    lesson: 81,
    pos: "n.",
    lessonLabel: "درس 81 — رایانه و اینترنت"
  },
  {
    word: "DVD",
    meaning: "دی‌وی‌دی",
    lesson: 81,
    pos: "n.",
    lessonLabel: "درس 81 — رایانه و اینترنت"
  },
  {
    word: "open a new document",
    meaning: "باز کردن یک سند جدید",
    lesson: 81,
    pos: "phr.",
    lessonLabel: "درس 81 — رایانه و اینترنت"
  },
  {
    word: "open an existing document",
    meaning: "باز کردن یک سند موجود",
    lesson: 81,
    pos: "phr.",
    lessonLabel: "درس 81 — رایانه و اینترنت"
  },
  {
    word: "save the data in this document",
    meaning: "ذخیرهٔ داده‌های این سند",
    lesson: 81,
    pos: "phr.",
    lessonLabel: "درس 81 — رایانه و اینترنت"
  },
  {
    word: "print",
    meaning: "چاپ کردن",
    lesson: 81,
    pos: "v.",
    lessonLabel: "درس 81 — رایانه و اینترنت"
  },
  {
    word: "cut",
    meaning: "بریدن",
    lesson: 81,
    pos: "v.",
    lessonLabel: "درس 81 — رایانه و اینترنت"
  },
  {
    word: "copy",
    meaning: "کپی کردن",
    lesson: 81,
    pos: "v.",
    lessonLabel: "درس 81 — رایانه و اینترنت"
  },
  {
    word: "paste",
    meaning: "چسباندن",
    lesson: 81,
    pos: "v.",
    lessonLabel: "درس 81 — رایانه و اینترنت"
  },
  {
    word: "print out",
    meaning: "چاپ کردن (خروجی گرفتن)",
    lesson: 81,
    pos: "v.",
    lessonLabel: "درس 81 — رایانه و اینترنت"
  },
  {
    word: "save",
    meaning: "ذخیره کردن",
    lesson: 81,
    pos: "v.",
    lessonLabel: "درس 81 — رایانه و اینترنت"
  },
  {
    word: "file",
    meaning: "پرونده",
    lesson: 81,
    pos: "n.",
    lessonLabel: "درس 81 — رایانه و اینترنت"
  },
  {
    word: "the Internet/the Net",
    meaning: "اینترنت",
    lesson: 81,
    pos: "n.",
    lessonLabel: "درس 81 — رایانه و اینترنت"
  },
  {
    word: "connect",
    meaning: "وصل کردن",
    lesson: 81,
    pos: "v.",
    lessonLabel: "درس 81 — رایانه و اینترنت"
  },
  {
    word: "worldwide",
    meaning: "در سراسر جهان",
    lesson: 81,
    pos: "adv.",
    lessonLabel: "درس 81 — رایانه و اینترنت"
  },
  {
    word: "get online",
    meaning: "آنلاین شدن",
    lesson: 81,
    pos: "phr.",
    lessonLabel: "درس 81 — رایانه و اینترنت"
  },
  {
    word: "modem",
    meaning: "مودم",
    lesson: 81,
    pos: "n.",
    lessonLabel: "درس 81 — رایانه و اینترنت"
  },
  {
    word: "Internet Service Provider (ISP)",
    meaning: "ارائه‌دهندهٔ خدمات اینترنتی",
    lesson: 81,
    pos: "n.",
    lessonLabel: "درس 81 — رایانه و اینترنت"
  },
  {
    word: "search engine",
    meaning: "موتور جستجو",
    lesson: 81,
    pos: "n.",
    lessonLabel: "درس 81 — رایانه و اینترنت"
  },
  {
    word: "go online",
    meaning: "وارد اینترنت شدن",
    lesson: 81,
    pos: "phr.",
    lessonLabel: "درس 81 — رایانه و اینترنت"
  },
  {
    word: "browse",
    meaning: "مرور کردن",
    lesson: 81,
    pos: "v.",
    lessonLabel: "درس 81 — رایانه و اینترنت"
  },
  {
    word: "website",
    meaning: "وب‌سایت",
    lesson: 81,
    pos: "n.",
    lessonLabel: "درس 81 — رایانه و اینترنت"
  },
  {
    word: "download",
    meaning: "دانلود کردن",
    lesson: 81,
    pos: "v.",
    lessonLabel: "درس 81 — رایانه و اینترنت"
  },
  {
    word: "e-mail",
    meaning: "ایمیل",
    lesson: 81,
    pos: "n.",
    lessonLabel: "درس 81 — رایانه و اینترنت"
  },
  {
    word: "e-mail address",
    meaning: "نشانی ایمیل",
    lesson: 81,
    pos: "n.",
    lessonLabel: "درس 81 — رایانه و اینترنت"
  },
  {
    word: "check your e-mail",
    meaning: "بررسی کردن ایمیل",
    lesson: 81,
    pos: "phr.",
    lessonLabel: "درس 81 — رایانه و اینترنت"
  },
  {
    word: "e-mail (verb)",
    meaning: "ایمیل فرستادن",
    lesson: 81,
    pos: "v.",
    lessonLabel: "درس 81 — رایانه و اینترنت"
  },
  {
    word: "user-friendly",
    meaning: "کاربرپسند",
    lesson: 81,
    pos: "adj.",
    lessonLabel: "درس 81 — رایانه و اینترنت"
  },
  {
    word: "virus",
    meaning: "ویروس",
    lesson: 81,
    pos: "n.",
    lessonLabel: "درس 81 — رایانه و اینترنت"
  },
  {
    word: "crash",
    meaning: "از کار افتادن",
    lesson: 81,
    pos: "v.",
    lessonLabel: "درس 81 — رایانه و اینترنت"
  },
  {
    word: "back-up copy",
    meaning: "نسخهٔ پشتیبان",
    lesson: 81,
    pos: "n.",
    lessonLabel: "درس 81 — رایانه و اینترنت"
  },
  {
    word: "nursery school",
    meaning: "مهدکودک",
    lesson: 82,
    lessonLabel: "درس 82 — آموزش: مدرسه"
  },
  {
    word: "primary school",
    meaning: "دبستان",
    lesson: 82,
    lessonLabel: "درس 82 — آموزش: مدرسه"
  },
  {
    word: "pupil",
    meaning: "دانش‌آموز",
    lesson: 82,
    pos: "n.",
    lessonLabel: "درس 82 — آموزش: مدرسه"
  },
  {
    word: "secondary school",
    meaning: "دبیرستان",
    lesson: 82,
    lessonLabel: "درس 82 — آموزش: مدرسه"
  },
  {
    word: "vocational training",
    meaning: "آموزش حرفه‌ای",
    lesson: 82,
    lessonLabel: "درس 82 — آموزش: مدرسه"
  },
  {
    word: "leave school",
    meaning: "ترک تحصیل/مدرسه را ترک کردن",
    lesson: 82,
    lessonLabel: "درس 82 — آموزش: مدرسه"
  },
  {
    word: "go to university",
    meaning: "رفتن به دانشگاه",
    lesson: 82,
    lessonLabel: "درس 82 — آموزش: مدرسه"
  },
  {
    word: "further education",
    meaning: "آموزش عالی/تکمیلی",
    lesson: 82,
    lessonLabel: "درس 82 — آموزش: مدرسه"
  },
  {
    word: "go to school",
    meaning: "به مدرسه رفتن",
    lesson: 82,
    lessonLabel: "درس 82 — آموزش: مدرسه"
  },
  {
    word: "go to church",
    meaning: "به کلیسا رفتن",
    lesson: 82,
    lessonLabel: "درس 82 — آموزش: مدرسه"
  },
  {
    word: "go into hospital",
    meaning: "بستری شدن در بیمارستان",
    lesson: 82,
    lessonLabel: "درس 82 — آموزش: مدرسه"
  },
  {
    word: "go to bed",
    meaning: "به رختخواب رفتن",
    lesson: 82,
    lessonLabel: "درس 82 — آموزش: مدرسه"
  },
  {
    word: "go to prison",
    meaning: "به زندان رفتن",
    lesson: 82,
    lessonLabel: "درس 82 — آموزش: مدرسه"
  },
  {
    word: "public/independent/private schools",
    meaning: "مدارس غیردولتی/خصوصی",
    lesson: 82,
    lessonLabel: "درس 82 — آموزش: مدرسه"
  },
  {
    word: "school fees",
    meaning: "شهریه مدرسه",
    lesson: 82,
    lessonLabel: "درس 82 — آموزش: مدرسه"
  },
  {
    word: "subject",
    meaning: "موضوع درسی",
    lesson: 82,
    pos: "n.",
    lessonLabel: "درس 82 — آموزش: مدرسه"
  },
  {
    word: "English",
    meaning: "زبان انگلیسی",
    lesson: 82,
    lessonLabel: "درس 82 — آموزش: مدرسه"
  },
  {
    word: "French",
    meaning: "زبان فرانسه",
    lesson: 82,
    lessonLabel: "درس 82 — آموزش: مدرسه"
  },
  {
    word: "German",
    meaning: "زبان آلمانی",
    lesson: 82,
    lessonLabel: "درس 82 — آموزش: مدرسه"
  },
  {
    word: "Spanish",
    meaning: "زبان اسپانیایی",
    lesson: 82,
    lessonLabel: "درس 82 — آموزش: مدرسه"
  },
  {
    word: "history",
    meaning: "تاریخ",
    lesson: 82,
    pos: "n.",
    lessonLabel: "درس 82 — آموزش: مدرسه"
  },
  {
    word: "geography",
    meaning: "جغرافیا",
    lesson: 82,
    pos: "n.",
    lessonLabel: "درس 82 — آموزش: مدرسه"
  },
  {
    word: "art",
    meaning: "هنر",
    lesson: 82,
    pos: "n.",
    lessonLabel: "درس 82 — آموزش: مدرسه"
  },
  {
    word: "music",
    meaning: "موسیقی",
    lesson: 82,
    pos: "n.",
    lessonLabel: "درس 82 — آموزش: مدرسه"
  },
  {
    word: "maths",
    meaning: "ریاضی",
    lesson: 82,
    pos: "n.",
    lessonLabel: "درس 82 — آموزش: مدرسه"
  },
  {
    word: "physics",
    meaning: "فیزیک",
    lesson: 82,
    pos: "n.",
    lessonLabel: "درس 82 — آموزش: مدرسه"
  },
  {
    word: "chemistry",
    meaning: "شیمی",
    lesson: 82,
    pos: "n.",
    lessonLabel: "درس 82 — آموزش: مدرسه"
  },
  {
    word: "biology",
    meaning: "زیست‌شناسی",
    lesson: 82,
    pos: "n.",
    lessonLabel: "درس 82 — آموزش: مدرسه"
  },
  {
    word: "information technology",
    meaning: "فناوری اطلاعات",
    lesson: 82,
    lessonLabel: "درس 82 — آموزش: مدرسه"
  },
  {
    word: "divide into",
    meaning: "تقسیم کردن به",
    lesson: 82,
    lessonLabel: "درس 82 — آموزش: مدرسه"
  },
  {
    word: "break",
    meaning: "زنگ تفریح",
    lesson: 82,
    pos: "n.",
    lessonLabel: "درس 82 — آموزش: مدرسه"
  },
  {
    word: "lunch break",
    meaning: "زنگ ناهار",
    lesson: 82,
    lessonLabel: "درس 82 — آموزش: مدرسه"
  },
  {
    word: "term",
    meaning: "ترم/نیم‌سال تحصیلی",
    lesson: 82,
    pos: "n.",
    lessonLabel: "درس 82 — آموزش: مدرسه"
  },
  {
    word: "do/take an exam",
    meaning: "امتحان دادن",
    lesson: 82,
    lessonLabel: "درس 82 — آموزش: مدرسه"
  },
  {
    word: "go back",
    meaning: "بازگشتن",
    lesson: 82,
    lessonLabel: "درس 82 — آموزش: مدرسه"
  },
  {
    word: "pass",
    meaning: "قبول شدن (در امتحان)",
    lesson: 82,
    pos: "v.",
    lessonLabel: "درس 82 — آموزش: مدرسه"
  },
  {
    word: "fail",
    meaning: "مردود شدن",
    lesson: 82,
    pos: "v.",
    lessonLabel: "درس 82 — آموزش: مدرسه"
  },
  {
    word: "mark",
    meaning: "نمره",
    lesson: 82,
    pos: "n.",
    lessonLabel: "درس 82 — آموزش: مدرسه"
  },
  {
    word: "grade",
    meaning: "معدل/رتبه نمره",
    lesson: 82,
    pos: "n.",
    lessonLabel: "درس 82 — آموزش: مدرسه"
  },
  {
    word: "good at",
    meaning: "خوب بودن در",
    lesson: 82,
    lessonLabel: "درس 82 — آموزش: مدرسه"
  },
  {
    word: "hopeless at",
    meaning: "بسیار بد بودن در",
    lesson: 82,
    lessonLabel: "درس 82 — آموزش: مدرسه"
  },
  {
    word: "medicine",
    meaning: "پزشکی",
    lesson: 83,
    lessonLabel: "درس 83 — آموزش: دانشگاه"
  },
  {
    word: "law",
    meaning: "حقوق",
    lesson: 83,
    lessonLabel: "درس 83 — آموزش: دانشگاه"
  },
  {
    word: "philosophy",
    meaning: "فلسفه",
    lesson: 83,
    lessonLabel: "درس 83 — آموزش: دانشگاه"
  },
  {
    word: "engineering",
    meaning: "مهندسی",
    lesson: 83,
    lessonLabel: "درس 83 — آموزش: دانشگاه"
  },
  {
    word: "psychology",
    meaning: "روان‌شناسی",
    lesson: 83,
    lessonLabel: "درس 83 — آموزش: دانشگاه"
  },
  {
    word: "sociology",
    meaning: "جامعه‌شناسی",
    lesson: 83,
    lessonLabel: "درس 83 — آموزش: دانشگاه"
  },
  {
    word: "architecture",
    meaning: "معماری",
    lesson: 83,
    lessonLabel: "درس 83 — آموزش: دانشگاه"
  },
  {
    word: "politics",
    meaning: "علوم سیاسی",
    lesson: 83,
    lessonLabel: "درس 83 — آموزش: دانشگاه"
  },
  {
    word: "business studies",
    meaning: "مطالعات تجاری",
    lesson: 83,
    lessonLabel: "درس 83 — آموزش: دانشگاه"
  },
  {
    word: "agriculture",
    meaning: "کشاورزی",
    lesson: 83,
    lessonLabel: "درس 83 — آموزش: دانشگاه"
  },
  {
    word: "history of art",
    meaning: "تاریخ هنر",
    lesson: 83,
    lessonLabel: "درس 83 — آموزش: دانشگاه"
  },
  {
    word: "economics",
    meaning: "اقتصاد",
    lesson: 83,
    lessonLabel: "درس 83 — آموزش: دانشگاه"
  },
  {
    word: "go to (university)",
    meaning: "وارد دانشگاه شدن",
    lesson: 83,
    lessonLabel: "درس 83 — آموزش: دانشگاه"
  },
  {
    word: "pass examinations",
    meaning: "در امتحانات قبول شدن",
    lesson: 83,
    lessonLabel: "درس 83 — آموزش: دانشگاه"
  },
  {
    word: "'A' levels",
    meaning: "آزمون‌های سطح A (در انگلستان)",
    lesson: 83,
    lessonLabel: "درس 83 — آموزش: دانشگاه"
  },
  {
    word: "get a place",
    meaning: "جا (پذیرش) گرفتن در دانشگاه",
    lesson: 83,
    lessonLabel: "درس 83 — آموزش: دانشگاه"
  },
  {
    word: "tuition fees",
    meaning: "شهریه",
    lesson: 83,
    lessonLabel: "درس 83 — آموزش: دانشگاه"
  },
  {
    word: "grant",
    meaning: "بورس/کمک‌هزینه دولتی",
    lesson: 83,
    lessonLabel: "درس 83 — آموزش: دانشگاه"
  },
  {
    word: "a loan",
    meaning: "وام",
    lesson: 83,
    lessonLabel: "درس 83 — آموزش: دانشگاه"
  },
  {
    word: "cover the cost of",
    meaning: "تأمین هزینهٔ",
    lesson: 83,
    lessonLabel: "درس 83 — آموزش: دانشگاه"
  },
  {
    word: "undergraduate",
    meaning: "دانشجوی دورهٔ کارشناسی",
    lesson: 83,
    lessonLabel: "درس 83 — آموزش: دانشگاه"
  },
  {
    word: "last",
    meaning: "به طول انجامیدن",
    lesson: 83,
    pos: "v.",
    lessonLabel: "درس 83 — آموزش: دانشگاه"
  },
  {
    word: "do a degree",
    meaning: "مدرک گرفتن",
    lesson: 83,
    lessonLabel: "درس 83 — آموزش: دانشگاه"
  },
  {
    word: "have a degree",
    meaning: "مدرک داشتن",
    lesson: 83,
    lessonLabel: "درس 83 — آموزش: دانشگاه"
  },
  {
    word: "BA (bachelor of arts)",
    meaning: "کارشناسی هنر",
    lesson: 83,
    lessonLabel: "درس 83 — آموزش: دانشگاه"
  },
  {
    word: "BSc (bachelor of science)",
    meaning: "کارشناسی علوم",
    lesson: 83,
    lessonLabel: "درس 83 — آموزش: دانشگاه"
  },
  {
    word: "graduate",
    meaning: "دانش‌آموخته",
    lesson: 83,
    lessonLabel: "درس 83 — آموزش: دانشگاه"
  },
  {
    word: "postgraduate course/degree (postgrad course)",
    meaning: "دوره/مدرک تحصیلات تکمیلی",
    lesson: 83,
    lessonLabel: "درس 83 — آموزش: دانشگاه"
  },
  {
    word: "postgraduate",
    meaning: "دانشجوی تحصیلات تکمیلی",
    lesson: 83,
    lessonLabel: "درس 83 — آموزش: دانشگاه"
  },
  {
    word: "MA (Master of Arts)",
    meaning: "کارشناسی ارشد هنر",
    lesson: 83,
    lessonLabel: "درس 83 — آموزش: دانشگاه"
  },
  {
    word: "do a Masters",
    meaning: "مدرک ارشد گرفتن",
    lesson: 83,
    lessonLabel: "درس 83 — آموزش: دانشگاه"
  },
  {
    word: "MSc (Master of Science)",
    meaning: "کارشناسی ارشد علوم",
    lesson: 83,
    lessonLabel: "درس 83 — آموزش: دانشگاه"
  },
  {
    word: "PhD (Doctor of Philosophy)",
    meaning: "دکترا",
    lesson: 83,
    lessonLabel: "درس 83 — آموزش: دانشگاه"
  },
  {
    word: "do research",
    meaning: "تحقیق کردن",
    lesson: 83,
    lessonLabel: "درس 83 — آموزش: دانشگاه"
  },
  {
    word: "teacher",
    meaning: "معلم",
    lesson: 83,
    lessonLabel: "درس 83 — آموزش: دانشگاه"
  },
  {
    word: "lesson",
    meaning: "درس/زنگ",
    lesson: 83,
    lessonLabel: "درس 83 — آموزش: دانشگاه"
  },
  {
    word: "lecturer",
    meaning: "استاد دانشگاه",
    lesson: 83,
    lessonLabel: "درس 83 — آموزش: دانشگاه"
  },
  {
    word: "lecture",
    meaning: "سخنرانی/درس دانشگاهی",
    lesson: 83,
    lessonLabel: "درس 83 — آموزش: دانشگاه"
  },
  {
    word: "head of department",
    meaning: "رئیس دانشکده/گروه ('faculty')",
    lesson: 83,
    lessonLabel: "درس 83 — آموزش: دانشگاه"
  },
  {
    word: "professor",
    meaning: "استاد (پروفسر)",
    lesson: 83,
    lessonLabel: "درس 83 — آموزش: دانشگاه"
  },
  {
    word: "commit a crime",
    meaning: "مرتکب جرم شدن",
    lesson: 84,
    pos: "phr.",
    lessonLabel: "درس 84 — قانون و نظم"
  },
  {
    word: "the law",
    meaning: "قانون",
    lesson: 84,
    pos: "n.",
    lessonLabel: "درس 84 — قانون و نظم"
  },
  {
    word: "illegal",
    meaning: "غیرقانونی",
    lesson: 84,
    pos: "adj.",
    lessonLabel: "درس 84 — قانون و نظم"
  },
  {
    word: "investigate",
    meaning: "تحقیق کردن، بررسی کردن",
    lesson: 84,
    pos: "v.",
    lessonLabel: "درس 84 — قانون و نظم"
  },
  {
    word: "catch",
    meaning: "گرفتن",
    lesson: 84,
    pos: "v.",
    lessonLabel: "درس 84 — قانون و نظم"
  },
  {
    word: "arrest",
    meaning: "دستگیر کردن",
    lesson: 84,
    pos: "v.",
    lessonLabel: "درس 84 — قانون و نظم"
  },
  {
    word: "question",
    meaning: "بازجویی کردن از",
    lesson: 84,
    pos: "v.",
    lessonLabel: "درس 84 — قانون و نظم"
  },
  {
    word: "be charged with (a crime)",
    meaning: "متهم شدن به (جرم)",
    lesson: 84,
    pos: "phr.",
    lessonLabel: "درس 84 — قانون و نظم"
  },
  {
    word: "court",
    meaning: "دادگاه",
    lesson: 84,
    pos: "n.",
    lessonLabel: "درس 84 — قانون و نظم"
  },
  {
    word: "trial",
    meaning: "محاکمه",
    lesson: 84,
    pos: "n.",
    lessonLabel: "درس 84 — قانون و نظم"
  },
  {
    word: "judge",
    meaning: "قاضی",
    lesson: 84,
    pos: "n.",
    lessonLabel: "درس 84 — قانون و نظم"
  },
  {
    word: "witness",
    meaning: "شاهد",
    lesson: 84,
    pos: "n.",
    lessonLabel: "درس 84 — قانون و نظم"
  },
  {
    word: "jury",
    meaning: "هیئت منصفه",
    lesson: 84,
    pos: "n.",
    lessonLabel: "درس 84 — قانون و نظم"
  },
  {
    word: "barrister",
    meaning: "وکیل دادگستری (انگلستان)",
    lesson: 84,
    pos: "n.",
    lessonLabel: "درس 84 — قانون و نظم"
  },
  {
    word: "defendant",
    meaning: "متهم",
    lesson: 84,
    pos: "n.",
    lessonLabel: "درس 84 — قانون و نظم"
  },
  {
    word: "prove",
    meaning: "اثبات کردن",
    lesson: 84,
    pos: "v.",
    lessonLabel: "درس 84 — قانون و نظم"
  },
  {
    word: "innocent",
    meaning: "بی‌گناه",
    lesson: 84,
    pos: "adj.",
    lessonLabel: "درس 84 — قانون و نظم"
  },
  {
    word: "guilty",
    meaning: "مقصر، مجرم",
    lesson: 84,
    pos: "adj.",
    lessonLabel: "درس 84 — قانون و نظم"
  },
  {
    word: "evidence",
    meaning: "دلیل، مدرک",
    lesson: 84,
    pos: "n.",
    lessonLabel: "درس 84 — قانون و نظم"
  },
  {
    word: "punishment",
    meaning: "مجازات",
    lesson: 84,
    pos: "n.",
    lessonLabel: "درس 84 — قانون و نظم"
  },
  {
    word: "sentence",
    meaning: "حکم (دادگاه)",
    lesson: 84,
    pos: "n.",
    lessonLabel: "درس 84 — قانون و نظم"
  },
  {
    word: "prison",
    meaning: "زندان",
    lesson: 84,
    pos: "n.",
    lessonLabel: "درس 84 — قانون و نظم"
  },
  {
    word: "prisoner",
    meaning: "زندانی",
    lesson: 84,
    pos: "n.",
    lessonLabel: "درس 84 — قانون و نظم"
  },
  {
    word: "minor offence",
    meaning: "خلاف کوچک",
    lesson: 84,
    pos: "phr.",
    lessonLabel: "درس 84 — قانون و نظم"
  },
  {
    word: "fine",
    meaning: "جریمه",
    lesson: 84,
    pos: "n.",
    lessonLabel: "درس 84 — قانون و نظم"
  },
  {
    word: "illegal/against the law",
    meaning: "غیرقانونی/برخلاف قانون",
    lesson: 85,
    pos: "adj.",
    lessonLabel: "درس 85 — جرم"
  },
  {
    word: "commit a crime",
    meaning: "مرتکب جرم شدن",
    lesson: 85,
    pos: "phr.",
    lessonLabel: "درس 85 — جرم"
  },
  {
    word: "break the law",
    meaning: "قانون را شکستن",
    lesson: 85,
    pos: "phr.",
    lessonLabel: "درس 85 — جرم"
  },
  {
    word: "get into trouble",
    meaning: "گیر کردن، درگیر دردسر شدن",
    lesson: 85,
    pos: "phr.",
    lessonLabel: "درس 85 — جرم"
  },
  {
    word: "theft",
    meaning: "دزدی (واژهٔ عمومی برای دزدیدن)",
    lesson: 85,
    pos: "n.",
    lessonLabel: "درس 85 — جرم"
  },
  {
    word: "robbery",
    meaning: "سرقت (از افراد یا مکان‌ها مثل بانک)",
    lesson: 85,
    pos: "n.",
    lessonLabel: "درس 85 — جرم"
  },
  {
    word: "burglary",
    meaning: "سرقت با ورود به مغازه/خانه",
    lesson: 85,
    pos: "n.",
    lessonLabel: "درس 85 — جرم"
  },
  {
    word: "shoplifting",
    meaning: "دزدیدن کالا از مغازه",
    lesson: 85,
    pos: "n.",
    lessonLabel: "درس 85 — جرم"
  },
  {
    word: "murder",
    meaning: "قتل عمد",
    lesson: 85,
    pos: "n.",
    lessonLabel: "درس 85 — جرم"
  },
  {
    word: "manslaughter",
    meaning: "قتل غیرعمد",
    lesson: 85,
    pos: "n.",
    lessonLabel: "درس 85 — جرم"
  },
  {
    word: "thief",
    meaning: "دزد",
    lesson: 85,
    pos: "n.",
    lessonLabel: "درس 85 — جرم"
  },
  {
    word: "robber",
    meaning: "سارق/راهزن",
    lesson: 85,
    pos: "n.",
    lessonLabel: "درس 85 — جرم"
  },
  {
    word: "burglar",
    meaning: "سارق منزل",
    lesson: 85,
    pos: "n.",
    lessonLabel: "درس 85 — جرم"
  },
  {
    word: "shoplifter",
    meaning: "دزد مغازه",
    lesson: 85,
    pos: "n.",
    lessonLabel: "درس 85 — جرم"
  },
  {
    word: "murderer",
    meaning: "قاتل",
    lesson: 85,
    pos: "n.",
    lessonLabel: "درس 85 — جرم"
  },
  {
    word: "steal",
    meaning: "دزدیدن",
    lesson: 85,
    pos: "v.",
    lessonLabel: "درس 85 — جرم"
  },
  {
    word: "rob",
    meaning: "سرقت کردن",
    lesson: 85,
    pos: "v.",
    lessonLabel: "درس 85 — جرم"
  },
  {
    word: "break in",
    meaning: "با زور وارد شدن",
    lesson: 85,
    pos: "phr.",
    lessonLabel: "درس 85 — جرم"
  },
  {
    word: "shoplift",
    meaning: "دزدیدن از مغازه",
    lesson: 85,
    pos: "v.",
    lessonLabel: "درس 85 — جرم"
  },
  {
    word: "witness",
    meaning: "شاهد (کسی که جرم را می‌بیند)",
    lesson: 85,
    pos: "n.",
    lessonLabel: "درس 85 — جرم"
  },
  {
    word: "get away/escape",
    meaning: "فرار کردن",
    lesson: 85,
    pos: "phr.",
    lessonLabel: "درس 85 — جرم"
  },
  {
    word: "armed",
    meaning: "مسلح",
    lesson: 85,
    pos: "adj.",
    lessonLabel: "درس 85 — جرم"
  },
  {
    word: "prevent crime",
    meaning: "جلوگیری از جرم",
    lesson: 85,
    pos: "phr.",
    lessonLabel: "درس 85 — جرم"
  },
  {
    word: "reduce it",
    meaning: "کاهش دادن آن",
    lesson: 85,
    pos: "phr.",
    lessonLabel: "درس 85 — جرم"
  },
  {
    word: "carry guns",
    meaning: "اسلحه حمل کردن",
    lesson: 85,
    pos: "phr.",
    lessonLabel: "درس 85 — جرم"
  },
  {
    word: "be allowed to",
    meaning: "مجاز بودن به",
    lesson: 85,
    pos: "phr.",
    lessonLabel: "درس 85 — جرم"
  },
  {
    word: "punishment",
    meaning: "مجازات",
    lesson: 85,
    pos: "n.",
    lessonLabel: "درس 85 — جرم"
  },
  {
    word: "tough",
    meaning: "سخت و شدید",
    lesson: 85,
    pos: "adj.",
    lessonLabel: "درس 85 — جرم"
  },
  {
    word: "capital punishment",
    meaning: "مجازات اعدام",
    lesson: 85,
    pos: "n.",
    lessonLabel: "درس 85 — جرم"
  },
  {
    word: "protect themselves",
    meaning: "از خود محافظت کردن",
    lesson: 85,
    pos: "phr.",
    lessonLabel: "درس 85 — جرم"
  },
  {
    word: "property",
    meaning: "ملک و املاک",
    lesson: 85,
    pos: "n.",
    lessonLabel: "درس 85 — جرم"
  },
  {
    word: "avoid",
    meaning: "دور بودن از، پرهیز کردن",
    lesson: 85,
    pos: "v.",
    lessonLabel: "درس 85 — جرم"
  },
  {
    word: "late at night",
    meaning: "اواخر شب",
    lesson: 85,
    pos: "phr.",
    lessonLabel: "درس 85 — جرم"
  },
  {
    word: "wearing",
    meaning: "پوشیدن",
    lesson: 85,
    pos: "n.",
    lessonLabel: "درس 85 — جرم"
  },
  {
    word: "burglar alarm",
    meaning: "زنگ ضد سرقت",
    lesson: 85,
    pos: "n.",
    lessonLabel: "درس 85 — جرم"
  },
  {
    word: "valuables",
    meaning: "اشیای گران‌بها",
    lesson: 85,
    pos: "n.",
    lessonLabel: "درس 85 — جرم"
  },
  {
    word: "safe",
    meaning: "گاوصندوق",
    lesson: 85,
    pos: "n.",
    lessonLabel: "درس 85 — جرم"
  },
  {
    word: "lock",
    meaning: "قفل",
    lesson: 85,
    pos: "n.",
    lessonLabel: "درس 85 — جرم"
  },
  {
    word: "monarchy",
    meaning: "پادشاهی",
    lesson: 86,
    pos: "n.",
    lessonLabel: "درس 86 — سیاست"
  },
  {
    word: "monarch",
    meaning: "پادشاه/فرمانروا",
    lesson: 86,
    pos: "n.",
    lessonLabel: "درس 86 — سیاست"
  },
  {
    word: "ruler",
    meaning: "حاکم",
    lesson: 86,
    pos: "n.",
    lessonLabel: "درس 86 — سیاست"
  },
  {
    word: "republic",
    meaning: "جمهوری",
    lesson: 86,
    pos: "n.",
    lessonLabel: "درس 86 — سیاست"
  },
  {
    word: "republican",
    meaning: "جمهوری‌خواه",
    lesson: 86,
    pos: "n.",
    lessonLabel: "درس 86 — سیاست"
  },
  {
    word: "democracy",
    meaning: "دموکراسی",
    lesson: 86,
    pos: "n.",
    lessonLabel: "درس 86 — سیاست"
  },
  {
    word: "democrat",
    meaning: "دموکرات",
    lesson: 86,
    pos: "n.",
    lessonLabel: "درس 86 — سیاست"
  },
  {
    word: "dictatorship",
    meaning: "دیکتاتوری",
    lesson: 86,
    pos: "n.",
    lessonLabel: "درس 86 — سیاست"
  },
  {
    word: "dictator",
    meaning: "دیکتاتور",
    lesson: 86,
    pos: "n.",
    lessonLabel: "درس 86 — سیاست"
  },
  {
    word: "politics",
    meaning: "سیاست",
    lesson: 86,
    pos: "n.",
    lessonLabel: "درس 86 — سیاست"
  },
  {
    word: "politician",
    meaning: "سیاستمدار",
    lesson: 86,
    pos: "n.",
    lessonLabel: "درس 86 — سیاست"
  },
  {
    word: "political",
    meaning: "سیاسی",
    lesson: 86,
    pos: "adj.",
    lessonLabel: "درس 86 — سیاست"
  },
  {
    word: "conservatism",
    meaning: "محافظه‌کاری",
    lesson: 86,
    pos: "n.",
    lessonLabel: "درس 86 — سیاست"
  },
  {
    word: "conservative",
    meaning: "محافظه‌کار",
    lesson: 86,
    pos: "n.|adj.",
    lessonLabel: "درس 86 — سیاست"
  },
  {
    word: "socialism",
    meaning: "سوسیالیسم",
    lesson: 86,
    pos: "n.",
    lessonLabel: "درس 86 — سیاست"
  },
  {
    word: "socialist",
    meaning: "سوسیالیست",
    lesson: 86,
    pos: "n.|adj.",
    lessonLabel: "درس 86 — سیاست"
  },
  {
    word: "social democracy",
    meaning: "دموکراسی اجتماعی/سوسیال‌دموکراسی",
    lesson: 86,
    pos: "n.",
    lessonLabel: "درس 86 — سیاست"
  },
  {
    word: "social democrat",
    meaning: "سوسیال‌دموکرات",
    lesson: 86,
    pos: "n.",
    lessonLabel: "درس 86 — سیاست"
  },
  {
    word: "democratic",
    meaning: "دموکراتیک",
    lesson: 86,
    pos: "adj.",
    lessonLabel: "درس 86 — سیاست"
  },
  {
    word: "liberalism",
    meaning: "لیبرالیسم",
    lesson: 86,
    pos: "n.",
    lessonLabel: "درس 86 — سیاست"
  },
  {
    word: "liberal",
    meaning: "لیبرال",
    lesson: 86,
    pos: "n.|adj.",
    lessonLabel: "درس 86 — سیاست"
  },
  {
    word: "communism",
    meaning: "کمونیسم",
    lesson: 86,
    pos: "n.",
    lessonLabel: "درس 86 — سیاست"
  },
  {
    word: "communist",
    meaning: "کمونیست",
    lesson: 86,
    pos: "n.|adj.",
    lessonLabel: "درس 86 — سیاست"
  },
  {
    word: "reactionary",
    meaning: "واروگرا/مخالف تغییر",
    lesson: 86,
    pos: "adj.",
    lessonLabel: "درس 86 — سیاست"
  },
  {
    word: "opposition",
    meaning: "اپوزیسیون/احزاب مخالف",
    lesson: 86,
    pos: "n.",
    lessonLabel: "درس 86 — سیاست"
  },
  {
    word: "radical",
    meaning: "رادیکال/بن‌بنیادی",
    lesson: 86,
    pos: "adj.",
    lessonLabel: "درس 86 — سیاست"
  },
  {
    word: "right-wing",
    meaning: "راست‌گرا",
    lesson: 86,
    pos: "adj.",
    lessonLabel: "درس 86 — سیاست"
  },
  {
    word: "left-wing",
    meaning: "چپ‌گرا",
    lesson: 86,
    pos: "adj.",
    lessonLabel: "درس 86 — سیاست"
  },
  {
    word: "vote for",
    meaning: "رأی دادن به",
    lesson: 86,
    pos: "v.",
    lessonLabel: "درس 86 — سیاست"
  },
  {
    word: "political party",
    meaning: "حزب سیاسی",
    lesson: 86,
    pos: "n.",
    lessonLabel: "درس 86 — سیاست"
  },
  {
    word: "election",
    meaning: "انتخابات",
    lesson: 86,
    pos: "n.",
    lessonLabel: "درس 86 — سیاست"
  },
  {
    word: "take place/are held",
    meaning: "برگزار شدن/اتفاق افتادن",
    lesson: 86,
    pos: "phr.",
    lessonLabel: "درس 86 — سیاست"
  },
  {
    word: "elect",
    meaning: "انتخاب کردن",
    lesson: 86,
    pos: "v.",
    lessonLabel: "درس 86 — سیاست"
  },
  {
    word: "president",
    meaning: "رئیس‌جمهور",
    lesson: 86,
    pos: "n.",
    lessonLabel: "درس 86 — سیاست"
  },
  {
    word: "form the government",
    meaning: "تشکیل دولت دادن",
    lesson: 86,
    pos: "phr.",
    lessonLabel: "درس 86 — سیاست"
  },
  {
    word: "all over the world",
    meaning: "در سراسر جهان",
    lesson: 86,
    pos: "phr.",
    lessonLabel: "درس 86 — سیاست"
  },
  {
    word: "majority",
    meaning: "اکثریت",
    lesson: 86,
    pos: "n.",
    lessonLabel: "درس 86 — سیاست"
  },
  {
    word: "seat",
    meaning: "کرسی (پارلمان)",
    lesson: 86,
    pos: "n.",
    lessonLabel: "درس 86 — سیاست"
  },
  {
    word: "in power",
    meaning: "در قدرت",
    lesson: 86,
    pos: "phr.",
    lessonLabel: "درس 86 — سیاست"
  },
  {
    word: "leader",
    meaning: "رهبر",
    lesson: 86,
    pos: "n.",
    lessonLabel: "درس 86 — سیاست"
  },
  {
    word: "Prime Minister",
    meaning: "نخست‌وزیر",
    lesson: 86,
    pos: "n.",
    lessonLabel: "درس 86 — سیاست"
  },
  {
    word: "policy",
    meaning: "سیاست (برنامه اقدام)",
    lesson: 86,
    pos: "n.",
    lessonLabel: "درس 86 — سیاست"
  },
  {
    word: "run",
    meaning: "اداره کردن/مدیریت کردن",
    lesson: 86,
    pos: "v.",
    lessonLabel: "درس 86 — سیاست"
  },
  {
    word: "economic policy",
    meaning: "سیاست اقتصادی",
    lesson: 86,
    pos: "n.",
    lessonLabel: "درس 86 — سیاست"
  },
  {
    word: "foreign policy",
    meaning: "سیاست خارجی",
    lesson: 86,
    pos: "n.",
    lessonLabel: "درس 86 — سیاست"
  },
  {
    word: "bureaucracy",
    meaning: "دیوان‌سالاری / بوروکراسی",
    lesson: 87,
    pos: "n.",
    lessonLabel: "درس 87 — بوروکراسی و اداره‌نویسی"
  },
  {
    word: "official",
    meaning: "مقام رسمی / کارمند دولت",
    lesson: 87,
    pos: "n.",
    lessonLabel: "درس 87 — بوروکراسی و اداره‌نویسی"
  },
  {
    word: "bureaucrat",
    meaning: "دیوان‌سالار (کارمند اداری)",
    lesson: 87,
    pos: "n.",
    lessonLabel: "درس 87 — بوروکراسی و اداره‌نویسی"
  },
  {
    word: "filing in",
    meaning: "پُر کردن (فرم‌ها)",
    lesson: 87,
    pos: "phr.",
    lessonLabel: "درس 87 — بوروکراسی و اداره‌نویسی"
  },
  {
    word: "documents",
    meaning: "اسناد / مدارک",
    lesson: 87,
    pos: "n.",
    lessonLabel: "درس 87 — بوروکراسی و اداره‌نویسی"
  },
  {
    word: "identity card",
    meaning: "کارت شناسایی",
    lesson: 87,
    pos: "n.",
    lessonLabel: "درس 87 — بوروکراسی و اداره‌نویسی"
  },
  {
    word: "driving licence",
    meaning: "گواهینامه رانندگی",
    lesson: 87,
    pos: "n.",
    lessonLabel: "درس 87 — بوروکراسی و اداره‌نویسی"
  },
  {
    word: "visa",
    meaning: "ویزا (روادید)",
    lesson: 87,
    pos: "n.",
    lessonLabel: "درس 87 — بوروکراسی و اداره‌نویسی"
  },
  {
    word: "check",
    meaning: "بازرسی کردن / چک کردن",
    lesson: 87,
    pos: "v.",
    lessonLabel: "درس 87 — بوروکراسی و اداره‌نویسی"
  },
  {
    word: "certificate",
    meaning: "گواهینامه",
    lesson: 87,
    pos: "n.",
    lessonLabel: "درس 87 — بوروکراسی و اداره‌نویسی"
  },
  {
    word: "birth certificate",
    meaning: "گواهی تولد",
    lesson: 87,
    pos: "n.",
    lessonLabel: "درس 87 — بوروکراسی و اداره‌نویسی"
  },
  {
    word: "exam certificate",
    meaning: "گواهی امتحانی (دیپلم/مدرک آزمون)",
    lesson: 87,
    pos: "n.",
    lessonLabel: "درس 87 — بوروکراسی و اداره‌نویسی"
  },
  {
    word: "marriage certificate",
    meaning: "گواهی ازدواج",
    lesson: 87,
    pos: "n.",
    lessonLabel: "درس 87 — بوروکراسی و اداره‌نویسی"
  },
  {
    word: "run out",
    meaning: "تمام شدن (اعتبار)",
    lesson: 87,
    pos: "phr.",
    lessonLabel: "درس 87 — بوروکراسی و اداره‌نویسی"
  },
  {
    word: "expire",
    meaning: "منقضی شدن",
    lesson: 87,
    pos: "v.",
    lessonLabel: "درس 87 — بوروکراسی و اداره‌نویسی"
  },
  {
    word: "renew",
    meaning: "تمدید کردن",
    lesson: 87,
    pos: "v.",
    lessonLabel: "درس 87 — بوروکراسی و اداره‌نویسی"
  },
  {
    word: "fill in",
    meaning: "پُر کردن (فرم)",
    lesson: 87,
    pos: "phr.",
    lessonLabel: "درس 87 — بوروکراسی و اداره‌نویسی"
  },
  {
    word: "landing card",
    meaning: "کارت ورود به کشور",
    lesson: 87,
    pos: "n.",
    lessonLabel: "درس 87 — بوروکراسی و اداره‌نویسی"
  },
  {
    word: "enrolment form",
    meaning: "فرم ثبت‌نام",
    lesson: 87,
    pos: "n.",
    lessonLabel: "درس 87 — بوروکراسی و اداره‌نویسی"
  },
  {
    word: "registration form",
    meaning: "فرم ثبت‌نام",
    lesson: 87,
    pos: "n.",
    lessonLabel: "درس 87 — بوروکراسی و اداره‌نویسی"
  },
  {
    word: "application form",
    meaning: "فرم درخواست / تقاضانامه",
    lesson: 87,
    pos: "n.",
    lessonLabel: "درس 87 — بوروکراسی و اداره‌نویسی"
  },
  {
    word: "sign",
    meaning: "امضا کردن",
    lesson: 87,
    pos: "v.",
    lessonLabel: "درس 87 — بوروکراسی و اداره‌نویسی"
  },
  {
    word: "signature",
    meaning: "امضا",
    lesson: 87,
    pos: "n.",
    lessonLabel: "درس 87 — بوروکراسی و اداره‌نویسی"
  },
  {
    word: "print (your full name)",
    meaning: "با حروف واضح/بزرگ نوشتن نام کامل",
    lesson: 87,
    pos: "v.",
    lessonLabel: "درس 87 — بوروکراسی و اداره‌نویسی"
  },
  {
    word: "surname",
    meaning: "نام خانوادگی",
    lesson: 87,
    pos: "n.",
    lessonLabel: "درس 87 — بوروکراسی و اداره‌نویسی"
  },
  {
    word: "date of birth",
    meaning: "تاریخ تولد",
    lesson: 87,
    pos: "n.",
    lessonLabel: "درس 87 — بوروکراسی و اداره‌نویسی"
  },
  {
    word: "place of birth",
    meaning: "محل تولد",
    lesson: 87,
    pos: "n.",
    lessonLabel: "درس 87 — بوروکراسی و اداره‌نویسی"
  },
  {
    word: "country of origin",
    meaning: "کشور مبدأ",
    lesson: 87,
    pos: "n.",
    lessonLabel: "درس 87 — بوروکراسی و اداره‌نویسی"
  },
  {
    word: "marital status",
    meaning: "وضعیت تأهل",
    lesson: 87,
    pos: "n.",
    lessonLabel: "درس 87 — بوروکراسی و اداره‌نویسی"
  },
  {
    word: "date of arrival",
    meaning: "تاریخ ورود",
    lesson: 87,
    pos: "n.",
    lessonLabel: "درس 87 — بوروکراسی و اداره‌نویسی"
  },
  {
    word: "date of departure",
    meaning: "تاریخ خروج / عزیمت",
    lesson: 87,
    pos: "n.",
    lessonLabel: "درس 87 — بوروکراسی و اداره‌نویسی"
  },
  {
    word: "the environment",
    meaning: "محیط زیست",
    lesson: 88,
    pos: "n.",
    lessonLabel: "درس 88 — مشکلات جهانی"
  },
  {
    word: "destroy",
    meaning: "نابود کردن",
    lesson: 88,
    pos: "v.",
    lessonLabel: "درس 88 — مشکلات جهانی"
  },
  {
    word: "pollute",
    meaning: "آلوده کردن",
    lesson: 88,
    pos: "v.",
    lessonLabel: "درس 88 — مشکلات جهانی"
  },
  {
    word: "cut down",
    meaning: "قطع کردن (درخت‌ها)",
    lesson: 88,
    pos: "phr.",
    lessonLabel: "درس 88 — مشکلات جهانی"
  },
  {
    word: "rainforest",
    meaning: "جنگل استوایی",
    lesson: 88,
    pos: "n.",
    lessonLabel: "درس 88 — مشکلات جهانی"
  },
  {
    word: "increase",
    meaning: "افزایش دادن",
    lesson: 88,
    pos: "v.",
    lessonLabel: "درس 88 — مشکلات جهانی"
  },
  {
    word: "global warming",
    meaning: "گرمایش جهانی",
    lesson: 88,
    pos: "n.",
    lessonLabel: "درس 88 — مشکلات جهانی"
  },
  {
    word: "planet",
    meaning: "سیاره",
    lesson: 88,
    pos: "n.",
    lessonLabel: "درس 88 — مشکلات جهانی"
  },
  {
    word: "survive",
    meaning: "بقا یافتن",
    lesson: 88,
    pos: "v.",
    lessonLabel: "درس 88 — مشکلات جهانی"
  },
  {
    word: "save/conserve",
    meaning: "صرفه‌جویی کردن، حفظ کردن",
    lesson: 88,
    pos: "v.",
    lessonLabel: "درس 88 — مشکلات جهانی"
  },
  {
    word: "natural resources",
    meaning: "منابع طبیعی",
    lesson: 88,
    pos: "n.",
    lessonLabel: "درس 88 — مشکلات جهانی"
  },
  {
    word: "waste",
    meaning: "هدر دادن",
    lesson: 88,
    pos: "v.",
    lessonLabel: "درس 88 — مشکلات جهانی"
  },
  {
    word: "protect",
    meaning: "محافظت کردن",
    lesson: 88,
    pos: "v.",
    lessonLabel: "درس 88 — مشکلات جهانی"
  },
  {
    word: "throw away",
    meaning: "دور انداختن",
    lesson: 88,
    pos: "phr.",
    lessonLabel: "درس 88 — مشکلات جهانی"
  },
  {
    word: "recycle",
    meaning: "بازیافت کردن",
    lesson: 88,
    pos: "v.",
    lessonLabel: "درس 88 — مشکلات جهانی"
  },
  {
    word: "destruction",
    meaning: "نابودی",
    lesson: 88,
    pos: "n.",
    lessonLabel: "درس 88 — مشکلات جهانی"
  },
  {
    word: "survival",
    meaning: "بقا",
    lesson: 88,
    pos: "n.",
    lessonLabel: "درس 88 — مشکلات جهانی"
  },
  {
    word: "pollution",
    meaning: "آلودگی",
    lesson: 88,
    pos: "n.",
    lessonLabel: "درس 88 — مشکلات جهانی"
  },
  {
    word: "protection",
    meaning: "محافظت",
    lesson: 88,
    pos: "n.",
    lessonLabel: "درس 88 — مشکلات جهانی"
  },
  {
    word: "recycling",
    meaning: "بازیافت",
    lesson: 88,
    pos: "n.",
    lessonLabel: "درس 88 — مشکلات جهانی"
  },
  {
    word: "disaster",
    meaning: "فاجعه، بلا",
    lesson: 88,
    pos: "n.",
    lessonLabel: "درس 88 — مشکلات جهانی"
  },
  {
    word: "natural disaster",
    meaning: "بلای طبیعی",
    lesson: 88,
    pos: "n.",
    lessonLabel: "درس 88 — مشکلات جهانی"
  },
  {
    word: "famine",
    meaning: "قحطی",
    lesson: 88,
    pos: "n.",
    lessonLabel: "درس 88 — مشکلات جهانی"
  },
  {
    word: "drought",
    meaning: "خشکسالی",
    lesson: 88,
    pos: "n.",
    lessonLabel: "درس 88 — مشکلات جهانی"
  },
  {
    word: "floods",
    meaning: "سیل‌ها",
    lesson: 88,
    pos: "n.",
    lessonLabel: "درس 88 — مشکلات جهانی"
  },
  {
    word: "earthquakes",
    meaning: "زمین‌لرزه‌ها",
    lesson: 88,
    pos: "n.",
    lessonLabel: "درس 88 — مشکلات جهانی"
  },
  {
    word: "war",
    meaning: "جنگ",
    lesson: 88,
    pos: "n.",
    lessonLabel: "درس 88 — مشکلات جهانی"
  },
  {
    word: "at war",
    meaning: "در حال جنگ",
    lesson: 88,
    pos: "phr.",
    lessonLabel: "درس 88 — مشکلات جهانی"
  },
  {
    word: "civil wars",
    meaning: "جنگ‌های داخلی",
    lesson: 88,
    pos: "n.",
    lessonLabel: "درس 88 — مشکلات جهانی"
  },
  {
    word: "soldiers",
    meaning: "سربازان",
    lesson: 88,
    pos: "n.",
    lessonLabel: "درس 88 — مشکلات جهانی"
  },
  {
    word: "civilians",
    meaning: "غيرنظامی‌ها",
    lesson: 88,
    pos: "n.",
    lessonLabel: "درس 88 — مشکلات جهانی"
  },
  {
    word: "peace settlement",
    meaning: "توافق‌نامه صلح",
    lesson: 88,
    pos: "n.",
    lessonLabel: "درس 88 — مشکلات جهانی"
  },
  {
    word: "terrorism",
    meaning: "تروریسم",
    lesson: 88,
    pos: "n.",
    lessonLabel: "درس 88 — مشکلات جهانی"
  },
  {
    word: "terrorists",
    meaning: "تروریست‌ها",
    lesson: 88,
    pos: "n.",
    lessonLabel: "درس 88 — مشکلات جهانی"
  },
  {
    word: "planting bombs",
    meaning: "کار گذاشتن بمب",
    lesson: 88,
    pos: "phr.",
    lessonLabel: "درس 88 — مشکلات جهانی"
  },
  {
    word: "kill/assassinate",
    meaning: "کشتن/ترور کردن",
    lesson: 88,
    pos: "v.",
    lessonLabel: "درس 88 — مشکلات جهانی"
  },
  {
    word: "hijack",
    meaning: "سرقت (هواپیما و...)",
    lesson: 88,
    pos: "v.",
    lessonLabel: "درس 88 — مشکلات جهانی"
  },
  {
    word: "hostages",
    meaning: "گروگان‌ها",
    lesson: 88,
    pos: "n.",
    lessonLabel: "درس 88 — مشکلات جهانی"
  },
  {
    word: "release",
    meaning: "آزاد کردن",
    lesson: 88,
    pos: "v.",
    lessonLabel: "درس 88 — مشکلات جهانی"
  },
  {
    word: "demands",
    meaning: "خواسته‌ها",
    lesson: 88,
    pos: "n.",
    lessonLabel: "درس 88 — مشکلات جهانی"
  },
  {
    word: "departures board",
    meaning: "تابلوی پروازهای خارج‌شده",
    lesson: 89,
    pos: "n.",
    lessonLabel: "درس 89 — سفر هوایی"
  },
  {
    word: "flight number",
    meaning: "شمارهٔ پرواز",
    lesson: 89,
    pos: "n.",
    lessonLabel: "درس 89 — سفر هوایی"
  },
  {
    word: "departure times",
    meaning: "ساعت‌های پرواز",
    lesson: 89,
    pos: "n.",
    lessonLabel: "درس 89 — سفر هوایی"
  },
  {
    word: "destination",
    meaning: "مقصد",
    lesson: 89,
    pos: "n.",
    lessonLabel: "درس 89 — سفر هوایی"
  },
  {
    word: "check-in desk",
    meaning: "میز پذیرش (تحویل چمدان)",
    lesson: 89,
    pos: "n.",
    lessonLabel: "درس 89 — سفر هوایی"
  },
  {
    word: "weigh your luggage",
    meaning: "وزن کردن چمدان شما",
    lesson: 89,
    pos: "phr.",
    lessonLabel: "درس 89 — سفر هوایی"
  },
  {
    word: "excess baggage",
    meaning: "اضافه‌بار (چمدان سنگین‌تر از حد مجاز)",
    lesson: 89,
    pos: "n.",
    lessonLabel: "درس 89 — سفر هوایی"
  },
  {
    word: "boarding card",
    meaning: "کارت سوارشدن به هواپیما",
    lesson: 89,
    pos: "n.",
    lessonLabel: "درس 89 — سفر هوایی"
  },
  {
    word: "passport control",
    meaning: "کنترل گذرنامه",
    lesson: 89,
    pos: "n.",
    lessonLabel: "درس 89 — سفر هوایی"
  },
  {
    word: "departure lounge",
    meaning: "سالن انتظار پروازها",
    lesson: 89,
    pos: "n.",
    lessonLabel: "درس 89 — سفر هوایی"
  },
  {
    word: "duty free",
    meaning: "فروشگاه معاف از عوارض",
    lesson: 89,
    pos: "n.",
    lessonLabel: "درس 89 — سفر هوایی"
  },
  {
    word: "take-off",
    meaning: "برخاستن هواپیما",
    lesson: 89,
    pos: "n.",
    lessonLabel: "درس 89 — سفر هوایی"
  },
  {
    word: "gate",
    meaning: "دروازهٔ (شمارهٔ) پرواز",
    lesson: 89,
    pos: "n.",
    lessonLabel: "درس 89 — سفر هوایی"
  },
  {
    word: "get on",
    meaning: "سوار شدن",
    lesson: 89,
    pos: "phr.",
    lessonLabel: "درس 89 — سفر هوایی"
  },
  {
    word: "board",
    meaning: "سوار هواپیما شدن",
    lesson: 89,
    pos: "v.",
    lessonLabel: "درس 89 — سفر هوایی"
  },
  {
    word: "hand luggage",
    meaning: "چمدان دستی",
    lesson: 89,
    pos: "n.",
    lessonLabel: "درس 89 — سفر هوایی"
  },
  {
    word: "overhead locker",
    meaning: "قفسهٔ بالای سر",
    lesson: 89,
    pos: "n.",
    lessonLabel: "درس 89 — سفر هوایی"
  },
  {
    word: "delay",
    meaning: "تأخیر",
    lesson: 89,
    pos: "n.|v.",
    lessonLabel: "درس 89 — سفر هوایی"
  },
  {
    word: "runway",
    meaning: "باند فرودگاه",
    lesson: 89,
    pos: "n.",
    lessonLabel: "درس 89 — سفر هوایی"
  },
  {
    word: "captain",
    meaning: "خلبان (کاپیتان)",
    lesson: 89,
    pos: "n.",
    lessonLabel: "درس 89 — سفر هوایی"
  },
  {
    word: "cabin crew",
    meaning: "خدمهٔ کابین",
    lesson: 89,
    pos: "n.",
    lessonLabel: "درس 89 — سفر هوایی"
  },
  {
    word: "steward",
    meaning: "مهماندار مرد",
    lesson: 89,
    pos: "n.",
    lessonLabel: "درس 89 — سفر هوایی"
  },
  {
    word: "stewardess",
    meaning: "مهماندار زن",
    lesson: 89,
    pos: "n.",
    lessonLabel: "درس 89 — سفر هوایی"
  },
  {
    word: "flight attendant",
    meaning: "مهماندار",
    lesson: 89,
    pos: "n.",
    lessonLabel: "درس 89 — سفر هوایی"
  },
  {
    word: "fasten your seat belt",
    meaning: "کمربند ایمنی را ببندید",
    lesson: 89,
    pos: "phr.",
    lessonLabel: "درس 89 — سفر هوایی"
  },
  {
    word: "upright position",
    meaning: "وضعیت عمودی",
    lesson: 89,
    pos: "n.",
    lessonLabel: "درس 89 — سفر هوایی"
  },
  {
    word: "remind",
    meaning: "یادآوری کردن",
    lesson: 89,
    pos: "v.",
    lessonLabel: "درس 89 — سفر هوایی"
  },
  {
    word: "terminal building",
    meaning: "ساختمان ترمینال (فرودگاه)",
    lesson: 89,
    pos: "n.",
    lessonLabel: "درس 89 — سفر هوایی"
  },
  {
    word: "landing card",
    meaning: "کارت ورود به کشور",
    lesson: 89,
    pos: "n.",
    lessonLabel: "درس 89 — سفر هوایی"
  },
  {
    word: "land",
    meaning: "فرود آمدن",
    lesson: 89,
    pos: "v.",
    lessonLabel: "درس 89 — سفر هوایی"
  },
  {
    word: "get off",
    meaning: "پیاده شدن",
    lesson: 89,
    pos: "phr.",
    lessonLabel: "درس 89 — سفر هوایی"
  },
  {
    word: "baggage reclaim",
    meaning: "محل تحویل چمدان‌ها",
    lesson: 89,
    pos: "n.",
    lessonLabel: "درس 89 — سفر هوایی"
  },
  {
    word: "go through customs",
    meaning: "عبور از گمرک",
    lesson: 89,
    pos: "phr.",
    lessonLabel: "درس 89 — سفر هوایی"
  },
  {
    word: "hire",
    meaning: "اجاره کردن (برای مدت کوتاه)",
    lesson: 89,
    pos: "v.",
    lessonLabel: "درس 89 — سفر هوایی"
  },
  {
    word: "rent",
    meaning: "اجاره کردن (برای مدت طولانی)",
    lesson: 89,
    pos: "v.",
    lessonLabel: "درس 89 — سفر هوایی"
  },
  {
    word: "luggage trolley",
    meaning: "چرخ‌دستی چمدان",
    lesson: 89,
    pos: "n.",
    lessonLabel: "درس 89 — سفر هوایی"
  },
  {
    word: "a single room",
    meaning: "اتاق یک‌نفره (با یک تخت یک‌نفره)",
    lesson: 90,
    pos: "n.",
    lessonLabel: "درس 90 — هتل و رستوران"
  },
  {
    word: "a double room",
    meaning: "اتاق دونفره (با یک تخت بزرگ)",
    lesson: 90,
    pos: "n.",
    lessonLabel: "درس 90 — هتل و رستوران"
  },
  {
    word: "a twin room",
    meaning: "اتاق دونفره (با دو تخت یک‌نفره)",
    lesson: 90,
    pos: "n.",
    lessonLabel: "درس 90 — هتل و رستوران"
  },
  {
    word: "full board",
    meaning: "اقامت با صبحانه، ناهار و شام",
    lesson: 90,
    pos: "n.",
    lessonLabel: "درس 90 — هتل و رستوران"
  },
  {
    word: "half board",
    meaning: "اقامت با صبحانه و شام",
    lesson: 90,
    pos: "n.",
    lessonLabel: "درس 90 — هتل و رستوران"
  },
  {
    word: "B&B",
    meaning: "فقط اتاق و صبحانه",
    lesson: 90,
    pos: "n.",
    lessonLabel: "درس 90 — هتل و رستوران"
  },
  {
    word: "book",
    meaning: "رزرو کردن",
    lesson: 90,
    pos: "v.",
    lessonLabel: "درس 90 — هتل و رستوران"
  },
  {
    word: "in advance",
    meaning: "از قبل، پیشاپیش",
    lesson: 90,
    pos: "phr.",
    lessonLabel: "درس 90 — هتل و رستوران"
  },
  {
    word: "check in",
    meaning: "پذیرش شدن (در هتل)",
    lesson: 90,
    pos: "phr.",
    lessonLabel: "درس 90 — هتل و رستوران"
  },
  {
    word: "reception",
    meaning: "پذیرش (هتل)",
    lesson: 90,
    pos: "n.",
    lessonLabel: "درس 90 — هتل و رستوران"
  },
  {
    word: "tip",
    meaning: "انعام دادن",
    lesson: 90,
    pos: "v.",
    lessonLabel: "درس 90 — هتل و رستوران"
  },
  {
    word: "waiter/waitress",
    meaning: "گارسون (مرد/زن)",
    lesson: 90,
    pos: "n.",
    lessonLabel: "درس 90 — هتل و رستوران"
  },
  {
    word: "porter",
    meaning: "باربر (کسی که چمدان‌ها را حمل می‌کند)",
    lesson: 90,
    pos: "n.",
    lessonLabel: "درس 90 — هتل و رستوران"
  },
  {
    word: "pay the bill",
    meaning: "صورت‌حساب را پرداخت کردن",
    lesson: 90,
    pos: "phr.",
    lessonLabel: "درس 90 — هتل و رستوران"
  },
  {
    word: "menu",
    meaning: "منو، لیست غذاها",
    lesson: 90,
    pos: "n.",
    lessonLabel: "درس 90 — هتل و رستوران"
  },
  {
    word: "wine list",
    meaning: "لیست شراب‌ها",
    lesson: 90,
    pos: "n.",
    lessonLabel: "درس 90 — هتل و رستوران"
  },
  {
    word: "starter",
    meaning: "پیش‌غذا",
    lesson: 90,
    pos: "n.",
    lessonLabel: "درس 90 — هتل و رستوران"
  },
  {
    word: "main course",
    meaning: "غذای اصلی",
    lesson: 90,
    pos: "n.",
    lessonLabel: "درس 90 — هتل و رستوران"
  },
  {
    word: "dessert",
    meaning: "دسر",
    lesson: 90,
    pos: "n.",
    lessonLabel: "درس 90 — هتل و رستوران"
  },
  {
    word: "aperitif",
    meaning: "نوشیدنی قبل از غذا",
    lesson: 90,
    pos: "n.",
    lessonLabel: "درس 90 — هتل و رستوران"
  },
  {
    word: "spoon",
    meaning: "قاشق",
    lesson: 90,
    pos: "n.",
    lessonLabel: "درس 90 — هتل و رستوران"
  },
  {
    word: "wine glass",
    meaning: "لیوان شراب",
    lesson: 90,
    pos: "n.",
    lessonLabel: "درس 90 — هتل و رستوران"
  },
  {
    word: "knife",
    meaning: "چاقو",
    lesson: 90,
    pos: "n.",
    lessonLabel: "درس 90 — هتل و رستوران"
  },
  {
    word: "napkin",
    meaning: "دستمال سفره",
    lesson: 90,
    pos: "n.",
    lessonLabel: "درس 90 — هتل و رستوران"
  },
  {
    word: "fork",
    meaning: "چنگال",
    lesson: 90,
    pos: "n.",
    lessonLabel: "درس 90 — هتل و رستوران"
  },
  {
    word: "plate",
    meaning: "بشقاب",
    lesson: 90,
    pos: "n.",
    lessonLabel: "درس 90 — هتل و رستوران"
  },
  {
    word: "stay",
    meaning: "اقامت",
    lesson: 90,
    pos: "n.",
    lessonLabel: "درس 90 — هتل و رستوران"
  },
  {
    word: "fully booked",
    meaning: "کاملاً پر (تکمیل ظرفیت)",
    lesson: 90,
    pos: "adj.",
    lessonLabel: "درس 90 — هتل و رستوران"
  },
  {
    word: "rooms available",
    meaning: "اتاق‌های خالی/آزاد",
    lesson: 90,
    pos: "phr.",
    lessonLabel: "درس 90 — هتل و رستوران"
  },
  {
    word: "included",
    meaning: "شامل/در قیمت محاسبه‌شده",
    lesson: 90,
    pos: "adj.",
    lessonLabel: "درس 90 — هتل و رستوران"
  },
  {
    word: "lift",
    meaning: "آسانسور",
    lesson: 90,
    pos: "n.",
    lessonLabel: "درس 90 — هتل و رستوران"
  },
  {
    word: "check out",
    meaning: "تحویل اتاق دادن و ترک هتل",
    lesson: 90,
    pos: "phr.",
    lessonLabel: "درس 90 — هتل و رستوران"
  },
  {
    word: "order",
    meaning: "سفارش دادن",
    lesson: 90,
    pos: "v.",
    lessonLabel: "درس 90 — هتل و رستوران"
  },
  {
    word: "try the wine",
    meaning: "مزه کردن شراب",
    lesson: 90,
    pos: "phr.",
    lessonLabel: "درس 90 — هتل و رستوران"
  },
  {
    word: "Is everything all right with your meal?",
    meaning: "آیا همه‌چیز با غذایتان خوب است؟",
    lesson: 90,
    pos: "phr.",
    lessonLabel: "درس 90 — هتل و رستوران"
  },
  {
    word: "I'll have the (soup) to start",
    meaning: "من (سوپ) را برای شروع می‌خورم",
    lesson: 90,
    pos: "phr.",
    lessonLabel: "درس 90 — هتل و رستوران"
  },
  {
    word: "palace",
    meaning: "کاخ",
    lesson: 91,
    pos: "n.",
    lessonLabel: "درس 91 — تعطیلات گردشی در شهر"
  },
  {
    word: "market",
    meaning: "بازار",
    lesson: 91,
    pos: "n.",
    lessonLabel: "درس 91 — تعطیلات گردشی در شهر"
  },
  {
    word: "temple",
    meaning: "معبد",
    lesson: 91,
    pos: "n.",
    lessonLabel: "درس 91 — تعطیلات گردشی در شهر"
  },
  {
    word: "statue",
    meaning: "مجسمه",
    lesson: 91,
    pos: "n.",
    lessonLabel: "درس 91 — تعطیلات گردشی در شهر"
  },
  {
    word: "castle",
    meaning: "قلعه",
    lesson: 91,
    pos: "n.",
    lessonLabel: "درس 91 — تعطیلات گردشی در شهر"
  },
  {
    word: "cathedral",
    meaning: "کلیسای جامع",
    lesson: 91,
    pos: "n.",
    lessonLabel: "درس 91 — تعطیلات گردشی در شهر"
  },
  {
    word: "sightseeing tour",
    meaning: "تور بازدید از جاذبه‌های شهر",
    lesson: 91,
    pos: "phr.",
    lessonLabel: "درس 91 — تعطیلات گردشی در شهر"
  },
  {
    word: "guidebook",
    meaning: "کتاب راهنمای گردشگری",
    lesson: 91,
    pos: "n.",
    lessonLabel: "درس 91 — تعطیلات گردشی در شهر"
  },
  {
    word: "map",
    meaning: "نقشه",
    lesson: 91,
    pos: "n.",
    lessonLabel: "درس 91 — تعطیلات گردشی در شهر"
  },
  {
    word: "go sightseeing",
    meaning: "به بازدید از جاذبه‌ها رفتن",
    lesson: 91,
    pos: "phr.",
    lessonLabel: "درس 91 — تعطیلات گردشی در شهر"
  },
  {
    word: "do a bit of/a lot of sightseeing",
    meaning: "کمی/زیاد گشت‌وگذار کردن",
    lesson: 91,
    pos: "phr.",
    lessonLabel: "درس 91 — تعطیلات گردشی در شهر"
  },
  {
    word: "have a look round (= visit somewhere casually)",
    meaning: "نگاهی به اطراف انداختن (بازدید اتفاقی)",
    lesson: 91,
    pos: "phr.",
    lessonLabel: "درس 91 — تعطیلات گردشی در شهر"
  },
  {
    word: "take pictures (= photos)",
    meaning: "عکس گرفتن",
    lesson: 91,
    pos: "phr.",
    lessonLabel: "درس 91 — تعطیلات گردشی در شهر"
  },
  {
    word: "spend money",
    meaning: "پول خرج کردن",
    lesson: 91,
    pos: "phr.",
    lessonLabel: "درس 91 — تعطیلات گردشی در شهر"
  },
  {
    word: "get lost (= lose one's way)",
    meaning: "گم شدن",
    lesson: 91,
    pos: "phr.",
    lessonLabel: "درس 91 — تعطیلات گردشی در شهر"
  },
  {
    word: "have a great/nice/terrible time",
    meaning: "وقت خوش/بدی داشتن",
    lesson: 91,
    pos: "phr.",
    lessonLabel: "درس 91 — تعطیلات گردشی در شهر"
  },
  {
    word: "go out (= leave home/your hotel to go to a social event, e.g. restaurant or disco)",
    meaning: "بیرون رفتن",
    lesson: 91,
    pos: "phr.",
    lessonLabel: "درس 91 — تعطیلات گردشی در شهر"
  },
  {
    word: "place",
    meaning: "جا، مکان",
    lesson: 91,
    pos: "n.",
    lessonLabel: "درس 91 — تعطیلات گردشی در شهر"
  },
  {
    word: "packed (= very crowded)",
    meaning: "شلوغ",
    lesson: 91,
    pos: "adj.",
    lessonLabel: "درس 91 — تعطیلات گردشی در شهر"
  },
  {
    word: "cosmopolitan",
    meaning: "جهانی، پر از مردم کشورهای مختلف",
    lesson: 91,
    pos: "adj.",
    lessonLabel: "درس 91 — تعطیلات گردشی در شهر"
  },
  {
    word: "historic monuments",
    meaning: "بناهای تاریخی",
    lesson: 91,
    pos: "phr.",
    lessonLabel: "درس 91 — تعطیلات گردشی در شهر"
  },
  {
    word: "touristy",
    meaning: "پرگردشگر (منفی)",
    lesson: 91,
    pos: "adj.",
    lessonLabel: "درس 91 — تعطیلات گردشی در شهر"
  },
  {
    word: "lively",
    meaning: "زنده و پرجنب‌وجوش",
    lesson: 91,
    pos: "adj.",
    lessonLabel: "درس 91 — تعطیلات گردشی در شهر"
  },
  {
    word: "nightlife",
    meaning: "زندگی شبانه",
    lesson: 91,
    pos: "n.",
    lessonLabel: "درس 91 — تعطیلات گردشی در شهر"
  },
  {
    word: "be worth + -ing or noun",
    meaning: "ارزش داشتن",
    lesson: 91,
    pos: "phr.",
    lessonLabel: "درس 91 — تعطیلات گردشی در شهر"
  },
  {
    word: "go on holiday",
    meaning: "به تعطیلات رفتن",
    lesson: 92,
    pos: "phr.",
    lessonLabel: "درس 92 — تعطیلات کنار دریا"
  },
  {
    word: "hotel",
    meaning: "هتل",
    lesson: 92,
    pos: "n.",
    lessonLabel: "درس 92 — تعطیلات کنار دریا"
  },
  {
    word: "rent an apartment (a holiday flat)",
    meaning: "آپارتمان (خانه تعطیلات) اجاره کردن",
    lesson: 92,
    pos: "phr.",
    lessonLabel: "درس 92 — تعطیلات کنار دریا"
  },
  {
    word: "go camping",
    meaning: "کمپینگ رفتن",
    lesson: 92,
    pos: "phr.",
    lessonLabel: "درس 92 — تعطیلات کنار دریا"
  },
  {
    word: "tent",
    meaning: "چادر",
    lesson: 92,
    pos: "n.",
    lessonLabel: "درس 92 — تعطیلات کنار دریا"
  },
  {
    word: "seaside resort",
    meaning: "دهکده/شهر ساحلی توریستی",
    lesson: 92,
    pos: "n.",
    lessonLabel: "درس 92 — تعطیلات کنار دریا"
  },
  {
    word: "the beach",
    meaning: "ساحل",
    lesson: 92,
    pos: "n.",
    lessonLabel: "درس 92 — تعطیلات کنار دریا"
  },
  {
    word: "yacht",
    meaning: "قایق بادبانی",
    lesson: 92,
    pos: "n.",
    lessonLabel: "درس 92 — تعطیلات کنار دریا"
  },
  {
    word: "cliff",
    meaning: "صخره/منگنه ساحلی",
    lesson: 92,
    pos: "n.",
    lessonLabel: "درس 92 — تعطیلات کنار دریا"
  },
  {
    word: "the horizon",
    meaning: "افق",
    lesson: 92,
    pos: "n.",
    lessonLabel: "درس 92 — تعطیلات کنار دریا"
  },
  {
    word: "beach umbrella",
    meaning: "چتر ساحلی",
    lesson: 92,
    pos: "n.",
    lessonLabel: "درس 92 — تعطیلات کنار دریا"
  },
  {
    word: "waves",
    meaning: "موج‌ها",
    lesson: 92,
    pos: "n.",
    lessonLabel: "درس 92 — تعطیلات کنار دریا"
  },
  {
    word: "rocks",
    meaning: "صخره‌ها/سنگ‌ها",
    lesson: 92,
    pos: "n.",
    lessonLabel: "درس 92 — تعطیلات کنار دریا"
  },
  {
    word: "sand",
    meaning: "شن/ماسه",
    lesson: 92,
    pos: "n.",
    lessonLabel: "درس 92 — تعطیلات کنار دریا"
  },
  {
    word: "towel",
    meaning: "حوله",
    lesson: 92,
    pos: "n.",
    lessonLabel: "درس 92 — تعطیلات کنار دریا"
  },
  {
    word: "breeze",
    meaning: "نسیم (باد ملایم و مطبوع)",
    lesson: 92,
    pos: "n.",
    lessonLabel: "درس 92 — تعطیلات کنار دریا"
  },
  {
    word: "burn",
    meaning: "آفتاب‌سوختگی دادن/سوزاندن",
    lesson: 92,
    pos: "v.",
    lessonLabel: "درس 92 — تعطیلات کنار دریا"
  },
  {
    word: "walk along the cliffs",
    meaning: "پیاده‌روی در امتداد صخره‌ها",
    lesson: 92,
    pos: "phr.",
    lessonLabel: "درس 92 — تعطیلات کنار دریا"
  },
  {
    word: "play volleyball",
    meaning: "والیبال بازی کردن",
    lesson: 92,
    pos: "phr.",
    lessonLabel: "درس 92 — تعطیلات کنار دریا"
  },
  {
    word: "windsurfing",
    meaning: "بادسواری",
    lesson: 92,
    pos: "n.",
    lessonLabel: "درس 92 — تعطیلات کنار دریا"
  },
  {
    word: "snorkelling",
    meaning: "غواصی با لوله تنفسی",
    lesson: 92,
    pos: "n.",
    lessonLabel: "درس 92 — تعطیلات کنار دریا"
  },
  {
    word: "diving",
    meaning: "غواصی",
    lesson: 92,
    pos: "n.",
    lessonLabel: "درس 92 — تعطیلات کنار دریا"
  },
  {
    word: "have a paddle",
    meaning: "پای خود را در دریا زدن",
    lesson: 92,
    pos: "phr.",
    lessonLabel: "درس 92 — تعطیلات کنار دریا"
  },
  {
    word: "have a swim",
    meaning: "شنا کردن",
    lesson: 92,
    pos: "phr.",
    lessonLabel: "درس 92 — تعطیلات کنار دریا"
  },
  {
    word: "rough",
    meaning: "موحوش/پرآشوب (دریا)",
    lesson: 92,
    pos: "adj.",
    lessonLabel: "درس 92 — تعطیلات کنار دریا"
  },
  {
    word: "calm",
    meaning: "آرام",
    lesson: 92,
    pos: "adj.",
    lessonLabel: "درس 92 — تعطیلات کنار دریا"
  },
  {
    word: "sunbathe",
    meaning: "آفتاب گرفتن",
    lesson: 92,
    pos: "v.",
    lessonLabel: "درس 92 — تعطیلات کنار دریا"
  },
  {
    word: "get a suntan",
    meaning: "برنزه شدن",
    lesson: 92,
    pos: "phr.",
    lessonLabel: "درس 92 — تعطیلات کنار دریا"
  },
  {
    word: "suntan lotion",
    meaning: "لوسیون ضدآفتاب",
    lesson: 92,
    pos: "n.",
    lessonLabel: "درس 92 — تعطیلات کنار دریا"
  },
  {
    word: "get a tan",
    meaning: "برنزه شدن",
    lesson: 92,
    pos: "phr.",
    lessonLabel: "درس 92 — تعطیلات کنار دریا"
  },
  {
    word: "protect your skin",
    meaning: "از پوست خود محافظت کردن",
    lesson: 92,
    pos: "phr.",
    lessonLabel: "درس 92 — تعطیلات کنار دریا"
  },
  {
    word: "sunburn",
    meaning: "آفتاب‌سوختگی",
    lesson: 92,
    pos: "n.",
    lessonLabel: "درس 92 — تعطیلات کنار دریا"
  },
  {
    word: "sunblock",
    meaning: "ضدآفتاب کامل",
    lesson: 92,
    pos: "n.",
    lessonLabel: "درس 92 — تعطیلات کنار دریا"
  },
  {
    word: "at a specific time",
    meaning: "در زمان مشخص",
    lesson: 93,
    pos: "phr.",
    lessonLabel: "درس 93 — زمان"
  },
  {
    word: "on a day",
    meaning: "در یک روز",
    lesson: 93,
    pos: "phr.",
    lessonLabel: "درس 93 — زمان"
  },
  {
    word: "in a period",
    meaning: "در یک بازهٔ زمانی",
    lesson: 93,
    pos: "phr.",
    lessonLabel: "درس 93 — زمان"
  },
  {
    word: "at Christmas",
    meaning: "در کریسمس",
    lesson: 93,
    pos: "phr.",
    lessonLabel: "درس 93 — زمان"
  },
  {
    word: "at Easter",
    meaning: "در عید پاک",
    lesson: 93,
    pos: "phr.",
    lessonLabel: "درس 93 — زمان"
  },
  {
    word: "at the weekend",
    meaning: "در تعطیلات آخر هفته",
    lesson: 93,
    pos: "phr.",
    lessonLabel: "درس 93 — زمان"
  },
  {
    word: "at night",
    meaning: "در شب",
    lesson: 93,
    pos: "phr.",
    lessonLabel: "درس 93 — زمان"
  },
  {
    word: "until",
    meaning: "تا وقتی که / تا",
    lesson: 93,
    lessonLabel: "درس 93 — زمان"
  },
  {
    word: "by",
    meaning: "حداکثر تا (نه دیرتر از)",
    lesson: 93,
    lessonLabel: "درس 93 — زمان"
  },
  {
    word: "for",
    meaning: "به مدت (برای مدت زمان)",
    lesson: 93,
    lessonLabel: "درس 93 — زمان"
  },
  {
    word: "since",
    meaning: "از (نقطه‌ای در گذشته)",
    lesson: 93,
    lessonLabel: "درس 93 — زمان"
  },
  {
    word: "during",
    meaning: "در طولِ",
    lesson: 93,
    lessonLabel: "درس 93 — زمان"
  },
  {
    word: "in ten days' time",
    meaning: "ده روز دیگر",
    lesson: 93,
    pos: "phr.",
    lessonLabel: "درس 93 — زمان"
  },
  {
    word: "for ages",
    meaning: "مدت زیادی / سال‌ها",
    lesson: 93,
    pos: "phr.",
    lessonLabel: "درس 93 — زمان"
  },
  {
    word: "recently",
    meaning: "اخیراً",
    lesson: 93,
    pos: "adv.",
    lessonLabel: "درس 93 — زمان"
  },
  {
    word: "lately",
    meaning: "اخیراً",
    lesson: 93,
    pos: "adv.",
    lessonLabel: "درس 93 — زمان"
  },
  {
    word: "a long time ago",
    meaning: "مدت‌ها پیش / خیلی وقت پیش",
    lesson: 93,
    pos: "phr.",
    lessonLabel: "درس 93 — زمان"
  },
  {
    word: "the other day",
    meaning: "چند روز پیش",
    lesson: 93,
    pos: "phr.",
    lessonLabel: "درس 93 — زمان"
  },
  {
    word: "these days",
    meaning: "این روزها / آخری‌ها",
    lesson: 93,
    pos: "phr.",
    lessonLabel: "درس 93 — زمان"
  },
  {
    word: "for the time being",
    meaning: "برای حالا / فعلاً",
    lesson: 93,
    pos: "phr.",
    lessonLabel: "درس 93 — زمان"
  },
  {
    word: "one day",
    meaning: "روزی (در آینده)",
    lesson: 93,
    pos: "phr.",
    lessonLabel: "درس 93 — زمان"
  },
  {
    word: "second",
    meaning: "ثانیه",
    lesson: 93,
    pos: "n.",
    lessonLabel: "درس 93 — زمان"
  },
  {
    word: "minute",
    meaning: "دقیقه",
    lesson: 93,
    pos: "n.",
    lessonLabel: "درس 93 — زمان"
  },
  {
    word: "hour",
    meaning: "ساعت",
    lesson: 93,
    pos: "n.",
    lessonLabel: "درس 93 — زمان"
  },
  {
    word: "day",
    meaning: "روز",
    lesson: 93,
    pos: "n.",
    lessonLabel: "درس 93 — زمان"
  },
  {
    word: "week",
    meaning: "هفته",
    lesson: 93,
    pos: "n.",
    lessonLabel: "درس 93 — زمان"
  },
  {
    word: "fortnight",
    meaning: "دو هفته",
    lesson: 93,
    pos: "n.",
    lessonLabel: "درس 93 — زمان"
  },
  {
    word: "year",
    meaning: "سال",
    lesson: 93,
    pos: "n.",
    lessonLabel: "درس 93 — زمان"
  },
  {
    word: "decade",
    meaning: "دهه",
    lesson: 93,
    pos: "n.",
    lessonLabel: "درس 93 — زمان"
  },
  {
    word: "century",
    meaning: "قرن",
    lesson: 93,
    pos: "n.",
    lessonLabel: "درس 93 — زمان"
  },
  {
    word: "take",
    meaning: "طول کشیدن (نیاز داشتن زمان)",
    lesson: 93,
    pos: "v.",
    lessonLabel: "درس 93 — زمان"
  },
  {
    word: "last",
    meaning: "طول کشیدن (ادامه داشتن)",
    lesson: 93,
    pos: "v.",
    lessonLabel: "درس 93 — زمان"
  },
  {
    word: "hundred",
    meaning: "صد",
    lesson: 94,
    pos: "n.",
    lessonLabel: "درس 94 — عددها"
  },
  {
    word: "thousand",
    meaning: "هزار",
    lesson: 94,
    pos: "n.",
    lessonLabel: "درس 94 — عددها"
  },
  {
    word: "million",
    meaning: "میلیون",
    lesson: 94,
    pos: "n.",
    lessonLabel: "درس 94 — عددها"
  },
  {
    word: "billion",
    meaning: "بیلیون / میلیارد",
    lesson: 94,
    pos: "n.",
    lessonLabel: "درس 94 — عددها"
  },
  {
    word: "thousands of people",
    meaning: "هزاران نفر",
    lesson: 94,
    pos: "phr.",
    lessonLabel: "درس 94 — عددها"
  },
  {
    word: "millions of insects",
    meaning: "میلیون‌ها حشره",
    lesson: 94,
    pos: "phr.",
    lessonLabel: "درس 94 — عددها"
  },
  {
    word: "the fourth of January",
    meaning: "چهارم ژانویه",
    lesson: 94,
    pos: "phr.",
    lessonLabel: "درس 94 — عددها"
  },
  {
    word: "January the fourth",
    meaning: "ژانویهٔ چهارم",
    lesson: 94,
    pos: "phr.",
    lessonLabel: "درس 94 — عددها"
  },
  {
    word: "the twenty-first of May",
    meaning: "بیست‌ویکم می",
    lesson: 94,
    pos: "phr.",
    lessonLabel: "درس 94 — عددها"
  },
  {
    word: "May the twenty-first",
    meaning: "میِ بیست‌ویکم",
    lesson: 94,
    pos: "phr.",
    lessonLabel: "درس 94 — عددها"
  },
  {
    word: "one and a quarter",
    meaning: "یک و یک‌چهارم",
    lesson: 94,
    pos: "phr.",
    lessonLabel: "درس 94 — عددها"
  },
  {
    word: "one and a half",
    meaning: "یک و نیم",
    lesson: 94,
    pos: "phr.",
    lessonLabel: "درس 94 — عددها"
  },
  {
    word: "one and three quarters",
    meaning: "یک و سه‌چهارم",
    lesson: 94,
    pos: "phr.",
    lessonLabel: "درس 94 — عددها"
  },
  {
    word: "one point two five",
    meaning: "یک ممیز دو پنج",
    lesson: 94,
    pos: "phr.",
    lessonLabel: "درس 94 — عددها"
  },
  {
    word: "one point five",
    meaning: "یک ممیز پنج",
    lesson: 94,
    pos: "phr.",
    lessonLabel: "درس 94 — عددها"
  },
  {
    word: "one point seven five",
    meaning: "یک ممیز هفت پنج",
    lesson: 94,
    pos: "phr.",
    lessonLabel: "درس 94 — عددها"
  },
  {
    word: "per cent",
    meaning: "درصد",
    lesson: 94,
    pos: "phr.",
    lessonLabel: "درس 94 — عددها"
  },
  {
    word: "the majority",
    meaning: "اکثریت",
    lesson: 94,
    pos: "n.",
    lessonLabel: "درس 94 — عددها"
  },
  {
    word: "the minority",
    meaning: "اقلیت",
    lesson: 94,
    pos: "n.",
    lessonLabel: "درس 94 — عددها"
  },
  {
    word: "addition",
    meaning: "جمع",
    lesson: 94,
    pos: "n.",
    lessonLabel: "درس 94 — عددها"
  },
  {
    word: "subtraction",
    meaning: "تفریق",
    lesson: 94,
    pos: "n.",
    lessonLabel: "درس 94 — عددها"
  },
  {
    word: "multiplication",
    meaning: "ضرب",
    lesson: 94,
    pos: "n.",
    lessonLabel: "درس 94 — عددها"
  },
  {
    word: "division",
    meaning: "تقسیم",
    lesson: 94,
    pos: "n.",
    lessonLabel: "درس 94 — عددها"
  },
  {
    word: "plus",
    meaning: "به‌علاوه / بعلاوه",
    lesson: 94,
    pos: "prep.",
    lessonLabel: "درس 94 — عددها"
  },
  {
    word: "minus",
    meaning: "منهای / منفی",
    lesson: 94,
    pos: "prep.",
    lessonLabel: "درس 94 — عددها"
  },
  {
    word: "times / multiplied by",
    meaning: "ضربدر",
    lesson: 94,
    pos: "phr.",
    lessonLabel: "درس 94 — عددها"
  },
  {
    word: "divided by",
    meaning: "تقسیم بر",
    lesson: 94,
    pos: "phr.",
    lessonLabel: "درس 94 — عددها"
  },
  {
    word: "equals / is",
    meaning: "مساوی است با",
    lesson: 94,
    pos: "phr.",
    lessonLabel: "درس 94 — عددها"
  },
  {
    word: "working out",
    meaning: "حساب کردن",
    lesson: 94,
    pos: "phr.",
    lessonLabel: "درس 94 — عددها"
  },
  {
    word: "mental arithmetic",
    meaning: "حساب ذهنی",
    lesson: 94,
    pos: "phr.",
    lessonLabel: "درس 94 — عددها"
  },
  {
    word: "get stuck",
    meaning: "گیر کردن / به مشکل خوردن",
    lesson: 94,
    pos: "phr.",
    lessonLabel: "درس 94 — عددها"
  },
  {
    word: "work something out",
    meaning: "حساب کردن چیزی / راه‌حل چیزی را پیدا کردن",
    lesson: 94,
    pos: "phr.",
    lessonLabel: "درس 94 — عددها"
  },
  {
    word: "calculator",
    meaning: "ماشین‌حساب",
    lesson: 94,
    pos: "n.",
    lessonLabel: "درس 94 — عددها"
  },
  {
    word: "nought",
    meaning: "صفر",
    lesson: 94,
    pos: "n.",
    lessonLabel: "درس 94 — عددها"
  },
  {
    word: "oh",
    meaning: "صفر (در گفتار، مثل شماره تلفن)",
    lesson: 94,
    pos: "n.",
    lessonLabel: "درس 94 — عددها"
  },
  {
    word: "zero",
    meaning: "صفر",
    lesson: 94,
    pos: "n.",
    lessonLabel: "درس 94 — عددها"
  },
  {
    word: "degrees below zero",
    meaning: "درجه زیر صفر",
    lesson: 94,
    pos: "phr.",
    lessonLabel: "درس 94 — عددها"
  },
  {
    word: "How far is it?",
    meaning: "چقدر فاصله دارد؟",
    lesson: 95,
    pos: "phr.",
    lessonLabel: "درس 95 — فاصله، اندازه و بُعد"
  },
  {
    word: "the nearest one",
    meaning: "نزدیک‌ترین",
    lesson: 95,
    pos: "phr.",
    lessonLabel: "درس 95 — فاصله، اندازه و بُعد"
  },
  {
    word: "Is it far?",
    meaning: "دور است؟",
    lesson: 95,
    pos: "phr.",
    lessonLabel: "درس 95 — فاصله، اندازه و بُعد"
  },
  {
    word: "just round the corner",
    meaning: "همین گوشه، خیلی نزدیک",
    lesson: 95,
    pos: "phr.",
    lessonLabel: "درس 95 — فاصله، اندازه و بُعد"
  },
  {
    word: "Is it a long way?",
    meaning: "فاصله زیادی دارد؟",
    lesson: 95,
    pos: "phr.",
    lessonLabel: "درس 95 — فاصله، اندازه و بُعد"
  },
  {
    word: "ten minutes' walk",
    meaning: "ده دقیقه پیاده",
    lesson: 95,
    pos: "phr.",
    lessonLabel: "درس 95 — فاصله، اندازه و بُعد"
  },
  {
    word: "quite a long way",
    meaning: "مسیر نسبتاً طولانی",
    lesson: 95,
    pos: "phr.",
    lessonLabel: "درس 95 — فاصله، اندازه و بُعد"
  },
  {
    word: "too far to walk",
    meaning: "آن‌قدر دور که نمی‌شود پیاده رفت",
    lesson: 95,
    pos: "phr.",
    lessonLabel: "درس 95 — فاصله، اندازه و بُعد"
  },
  {
    word: "far",
    meaning: "دور",
    lesson: 95,
    pos: "adv.",
    lessonLabel: "درس 95 — فاصله، اندازه و بُعد"
  },
  {
    word: "width",
    meaning: "عرض",
    lesson: 95,
    pos: "n.",
    lessonLabel: "درس 95 — فاصله، اندازه و بُعد"
  },
  {
    word: "length",
    meaning: "طول",
    lesson: 95,
    pos: "n.",
    lessonLabel: "درس 95 — فاصله، اندازه و بُعد"
  },
  {
    word: "height",
    meaning: "ارتفاع",
    lesson: 95,
    pos: "n.",
    lessonLabel: "درس 95 — فاصله، اندازه و بُعد"
  },
  {
    word: "shallow end",
    meaning: "قسمت کم‌عمق",
    lesson: 95,
    pos: "phr.",
    lessonLabel: "درس 95 — فاصله، اندازه و بُعد"
  },
  {
    word: "deep end",
    meaning: "قسمت عمیق (استخر)",
    lesson: 95,
    pos: "phr.",
    lessonLabel: "درس 95 — فاصله، اندازه و بُعد"
  },
  {
    word: "depth",
    meaning: "عمق",
    lesson: 95,
    pos: "n.",
    lessonLabel: "درس 95 — فاصله، اندازه و بُعد"
  },
  {
    word: "long",
    meaning: "طولانی/بلند",
    lesson: 95,
    pos: "adj.",
    lessonLabel: "درس 95 — فاصله، اندازه و بُعد"
  },
  {
    word: "wide",
    meaning: "پهن",
    lesson: 95,
    pos: "adj.",
    lessonLabel: "درس 95 — فاصله، اندازه و بُعد"
  },
  {
    word: "high",
    meaning: "بلند (دیوار، کوه)",
    lesson: 95,
    pos: "adj.",
    lessonLabel: "درس 95 — فاصله، اندازه و بُعد"
  },
  {
    word: "deep",
    meaning: "عمیق",
    lesson: 95,
    pos: "adj.",
    lessonLabel: "درس 95 — فاصله، اندازه و بُعد"
  },
  {
    word: "tall",
    meaning: "بلند (قد)",
    lesson: 95,
    pos: "adj.",
    lessonLabel: "درس 95 — فاصله، اندازه و بُعد"
  },
  {
    word: "short",
    meaning: "کوتاه",
    lesson: 95,
    pos: "adj.",
    lessonLabel: "درس 95 — فاصله، اندازه و بُعد"
  },
  {
    word: "fat",
    meaning: "چاق",
    lesson: 95,
    pos: "adj.",
    lessonLabel: "درس 95 — فاصله، اندازه و بُعد"
  },
  {
    word: "thin",
    meaning: "لاغر/نازک",
    lesson: 95,
    pos: "adj.",
    lessonLabel: "درس 95 — فاصله، اندازه و بُعد"
  },
  {
    word: "thick",
    meaning: "ضخیم",
    lesson: 95,
    pos: "adj.",
    lessonLabel: "درس 95 — فاصله، اندازه و بُعد"
  },
  {
    word: "narrow",
    meaning: "باریک",
    lesson: 95,
    pos: "adj.",
    lessonLabel: "درس 95 — فاصله، اندازه و بُعد"
  },
  {
    word: "big",
    meaning: "بزرگ",
    lesson: 95,
    pos: "adj.",
    lessonLabel: "درس 95 — فاصله، اندازه و بُعد"
  },
  {
    word: "large",
    meaning: "بزرگ",
    lesson: 95,
    pos: "adj.",
    lessonLabel: "درس 95 — فاصله، اندازه و بُعد"
  },
  {
    word: "great",
    meaning: "عالی (در معنای محاوره‌ای)، بزرگ",
    lesson: 95,
    pos: "adj.",
    lessonLabel: "درس 95 — فاصله، اندازه و بُعد"
  },
  {
    word: "great big",
    meaning: "خیلی بزرگ",
    lesson: 95,
    pos: "phr.",
    lessonLabel: "درس 95 — فاصله، اندازه و بُعد"
  },
  {
    word: "shallow",
    meaning: "کم‌عمق",
    lesson: 95,
    pos: "adj.",
    lessonLabel: "درس 95 — فاصله، اندازه و بُعد"
  },
  {
    word: "deep lake",
    meaning: "دریاچه عمیق",
    lesson: 95,
    pos: "phr.",
    lessonLabel: "درس 95 — فاصله، اندازه و بُعد"
  },
  {
    word: "long book",
    meaning: "کتاب طولانی",
    lesson: 95,
    pos: "phr.",
    lessonLabel: "درس 95 — فاصله، اندازه و بُعد"
  },
  {
    word: "tall girl",
    meaning: "دختر بلندقد",
    lesson: 95,
    pos: "phr.",
    lessonLabel: "درس 95 — فاصله، اندازه و بُعد"
  },
  {
    word: "fat people",
    meaning: "افراد چاق",
    lesson: 95,
    pos: "phr.",
    lessonLabel: "درس 95 — فاصله، اندازه و بُعد"
  },
  {
    word: "wide road",
    meaning: "جاده پهن",
    lesson: 95,
    pos: "phr.",
    lessonLabel: "درس 95 — فاصله، اندازه و بُعد"
  },
  {
    word: "thick book",
    meaning: "کتاب ضخیم",
    lesson: 95,
    pos: "phr.",
    lessonLabel: "درس 95 — فاصله، اندازه و بُعد"
  },
  {
    word: "square",
    meaning: "مربع",
    lesson: 96,
    pos: "n.",
    lessonLabel: "درس 96 — شکل‌ها، رنگ‌ها و نقش‌ها"
  },
  {
    word: "rectangular",
    meaning: "مستطیلی‌شکل",
    lesson: 96,
    pos: "adj.",
    lessonLabel: "درس 96 — شکل‌ها، رنگ‌ها و نقش‌ها"
  },
  {
    word: "circle",
    meaning: "دایره",
    lesson: 96,
    pos: "n.",
    lessonLabel: "درس 96 — شکل‌ها، رنگ‌ها و نقش‌ها"
  },
  {
    word: "round",
    meaning: "گرد، دایره‌ای",
    lesson: 96,
    pos: "adj.",
    lessonLabel: "درس 96 — شکل‌ها، رنگ‌ها و نقش‌ها"
  },
  {
    word: "semi-circle",
    meaning: "نیم‌دایره",
    lesson: 96,
    pos: "n.",
    lessonLabel: "درس 96 — شکل‌ها، رنگ‌ها و نقش‌ها"
  },
  {
    word: "triangle",
    meaning: "مثلث",
    lesson: 96,
    pos: "n.",
    lessonLabel: "درس 96 — شکل‌ها، رنگ‌ها و نقش‌ها"
  },
  {
    word: "point",
    meaning: "نوک، گوشهٔ تیز",
    lesson: 96,
    pos: "n.",
    lessonLabel: "درس 96 — شکل‌ها، رنگ‌ها و نقش‌ها"
  },
  {
    word: "pointed",
    meaning: "تیزب‌نوک",
    lesson: 96,
    pos: "adj.",
    lessonLabel: "درس 96 — شکل‌ها، رنگ‌ها و نقش‌ها"
  },
  {
    word: "star",
    meaning: "ستاره",
    lesson: 96,
    pos: "n.",
    lessonLabel: "درس 96 — شکل‌ها، رنگ‌ها و نقش‌ها"
  },
  {
    word: "diamond",
    meaning: "لوزی",
    lesson: 96,
    pos: "n.",
    lessonLabel: "درس 96 — شکل‌ها، رنگ‌ها و نقش‌ها"
  },
  {
    word: "turquoise",
    meaning: "فیروزه‌ای",
    lesson: 96,
    pos: "adj.",
    lessonLabel: "درس 96 — شکل‌ها، رنگ‌ها و نقش‌ها"
  },
  {
    word: "beige",
    meaning: "بژ",
    lesson: 96,
    pos: "adj.",
    lessonLabel: "درس 96 — شکل‌ها، رنگ‌ها و نقش‌ها"
  },
  {
    word: "pink",
    meaning: "صورتی",
    lesson: 96,
    pos: "adj.",
    lessonLabel: "درس 96 — شکل‌ها، رنگ‌ها و نقش‌ها"
  },
  {
    word: "purple",
    meaning: "بنفش",
    lesson: 96,
    pos: "adj.",
    lessonLabel: "درس 96 — شکل‌ها، رنگ‌ها و نقش‌ها"
  },
  {
    word: "grey",
    meaning: "خاکستری",
    lesson: 96,
    pos: "adj.",
    lessonLabel: "درس 96 — شکل‌ها، رنگ‌ها و نقش‌ها"
  },
  {
    word: "shade",
    meaning: "سایه‌روشن، طیف رنگ",
    lesson: 96,
    pos: "n.",
    lessonLabel: "درس 96 — شکل‌ها، رنگ‌ها و نقش‌ها"
  },
  {
    word: "pale",
    meaning: "کم‌رنگ",
    lesson: 96,
    pos: "adj.",
    lessonLabel: "درس 96 — شکل‌ها، رنگ‌ها و نقش‌ها"
  },
  {
    word: "light",
    meaning: "روشن",
    lesson: 96,
    pos: "adj.",
    lessonLabel: "درس 96 — شکل‌ها، رنگ‌ها و نقش‌ها"
  },
  {
    word: "dark",
    meaning: "تیره",
    lesson: 96,
    pos: "adj.",
    lessonLabel: "درس 96 — شکل‌ها، رنگ‌ها و نقش‌ها"
  },
  {
    word: "pattern",
    meaning: "طرح، نقش",
    lesson: 96,
    pos: "n.",
    lessonLabel: "درس 96 — شکل‌ها، رنگ‌ها و نقش‌ها"
  },
  {
    word: "design",
    meaning: "طرح",
    lesson: 96,
    pos: "n.",
    lessonLabel: "درس 96 — شکل‌ها، رنگ‌ها و نقش‌ها"
  },
  {
    word: "striped shirt",
    meaning: "پیراهن راه‌راه",
    lesson: 96,
    lessonLabel: "درس 96 — شکل‌ها، رنگ‌ها و نقش‌ها"
  },
  {
    word: "tartan skirt",
    meaning: "دامن چهارخانه (تارتان)",
    lesson: 96,
    lessonLabel: "درس 96 — شکل‌ها، رنگ‌ها و نقش‌ها"
  },
  {
    word: "check dress",
    meaning: "پیراهن خانه‌خانه",
    lesson: 96,
    lessonLabel: "درس 96 — شکل‌ها، رنگ‌ها و نقش‌ها"
  },
  {
    word: "-ish (suffix)",
    meaning: "پسوند «ـ‌مانند / کمی»",
    lesson: 96,
    lessonLabel: "درس 96 — شکل‌ها، رنگ‌ها و نقش‌ها"
  },
  {
    word: "roundish",
    meaning: "تقریباً گرد",
    lesson: 96,
    pos: "adj.",
    lessonLabel: "درس 96 — شکل‌ها، رنگ‌ها و نقش‌ها"
  },
  {
    word: "greenish",
    meaning: "سبزفام، کمی سبز",
    lesson: 96,
    pos: "adj.",
    lessonLabel: "درس 96 — شکل‌ها، رنگ‌ها و نقش‌ها"
  },
  {
    word: "yellowish",
    meaning: "زردفام، کمی زرد",
    lesson: 96,
    pos: "adj.",
    lessonLabel: "درس 96 — شکل‌ها، رنگ‌ها و نقش‌ها"
  },
  {
    word: "Out of order",
    meaning: "خراب است (خارج از سرویس)",
    lesson: 97,
    pos: "phr.",
    lessonLabel: "درس 97 — اعلان‌ها و هشدارها"
  },
  {
    word: "No vacancies",
    meaning: "جای خالی نداریم (هتل پر است)",
    lesson: 97,
    pos: "phr.",
    lessonLabel: "درس 97 — اعلان‌ها و هشدارها"
  },
  {
    word: "Sold out",
    meaning: "بلیت‌ها تمام شده",
    lesson: 97,
    pos: "phr.",
    lessonLabel: "درس 97 — اعلان‌ها و هشدارها"
  },
  {
    word: "Please queue other side",
    meaning: "لطفاً در سمت دیگر صف ببندید",
    lesson: 97,
    pos: "phr.",
    lessonLabel: "درس 97 — اعلان‌ها و هشدارها"
  },
  {
    word: "Keep right",
    meaning: "سمت راست بمانید",
    lesson: 97,
    pos: "phr.",
    lessonLabel: "درس 97 — اعلان‌ها و هشدارها"
  },
  {
    word: "Keep off the grass",
    meaning: "روی چمن نروید",
    lesson: 97,
    pos: "phr.",
    lessonLabel: "درس 97 — اعلان‌ها و هشدارها"
  },
  {
    word: "Silence — Examination in progress",
    meaning: "سکوت — آزمون در جریان است",
    lesson: 97,
    pos: "phr.",
    lessonLabel: "درس 97 — اعلان‌ها و هشدارها"
  },
  {
    word: "No smoking",
    meaning: "کشیدن سیگار ممنوع",
    lesson: 97,
    pos: "phr.",
    lessonLabel: "درس 97 — اعلان‌ها و هشدارها"
  },
  {
    word: "No parking",
    meaning: "پارک ممنوع",
    lesson: 97,
    pos: "phr.",
    lessonLabel: "درس 97 — اعلان‌ها و هشدارها"
  },
  {
    word: "Do not lean out of the window",
    meaning: "از پنجره بیرون نزنید",
    lesson: 97,
    pos: "phr.",
    lessonLabel: "درس 97 — اعلان‌ها و هشدارها"
  },
  {
    word: "Do not leave bags unattended",
    meaning: "کیسه‌ها را بی‌سرپرست رها نکنید",
    lesson: 97,
    pos: "phr.",
    lessonLabel: "درس 97 — اعلان‌ها و هشدارها"
  },
  {
    word: "No exit",
    meaning: "خروجی ندارد",
    lesson: 97,
    pos: "phr.",
    lessonLabel: "درس 97 — اعلان‌ها و هشدارها"
  },
  {
    word: "Do not disturb",
    meaning: "مزاحم نشوید / مزاحم ممنوع",
    lesson: 97,
    pos: "phr.",
    lessonLabel: "درس 97 — اعلان‌ها و هشدارها"
  },
  {
    word: "Please do not feed the animals",
    meaning: "لطفاً به حیوانات غذا ندهید",
    lesson: 97,
    pos: "phr.",
    lessonLabel: "درس 97 — اعلان‌ها و هشدارها"
  },
  {
    word: "Mind your head",
    meaning: "مراقب سرت باش",
    lesson: 97,
    pos: "phr.",
    lessonLabel: "درس 97 — اعلان‌ها و هشدارها"
  },
  {
    word: "Mind the step",
    meaning: "مراقب پله باش",
    lesson: 97,
    pos: "phr.",
    lessonLabel: "درس 97 — اعلان‌ها و هشدارها"
  },
  {
    word: "Fragile",
    meaning: "شکستنی / ظریف",
    lesson: 97,
    pos: "adj.",
    lessonLabel: "درس 97 — اعلان‌ها و هشدارها"
  },
  {
    word: "Beware of pickpockets",
    meaning: "مراقب جیب‌برها باشید",
    lesson: 97,
    pos: "phr.",
    lessonLabel: "درس 97 — اعلان‌ها و هشدارها"
  },
  {
    word: "Nothing to declare",
    meaning: "چیزی برای اظهار ندارم (گمرک)",
    lesson: 97,
    pos: "phr.",
    lessonLabel: "درس 97 — اعلان‌ها و هشدارها"
  },
  {
    word: "thing(s)",
    meaning: "چیز",
    lesson: 98,
    pos: "n.",
    lessonLabel: "درس 98 — زبان مبهم"
  },
  {
    word: "stuff",
    meaning: "وسایل/جنس",
    lesson: 98,
    pos: "n.",
    lessonLabel: "درس 98 — زبان مبهم"
  },
  {
    word: "a sort of",
    meaning: "نوعی، مدلِ",
    lesson: 98,
    pos: "phr.",
    lessonLabel: "درس 98 — زبان مبهم"
  },
  {
    word: "and things like that",
    meaning: "و چیزهایی از این قبیل",
    lesson: 98,
    pos: "phr.",
    lessonLabel: "درس 98 — زبان مبهم"
  },
  {
    word: "and that sort of thing",
    meaning: "و آن جور چیزها",
    lesson: 98,
    pos: "phr.",
    lessonLabel: "درس 98 — زبان مبهم"
  },
  {
    word: "sometime",
    meaning: "某个وقتی، فلان وقت",
    lesson: 98,
    pos: "adv.",
    lessonLabel: "درس 98 — زبان مبهم"
  },
  {
    word: "any time",
    meaning: "هر وقت",
    lesson: 98,
    pos: "phr.",
    lessonLabel: "درس 98 — زبان مبهم"
  },
  {
    word: "a bit",
    meaning: "کمی، تا حدی",
    lesson: 98,
    pos: "phr.",
    lessonLabel: "درس 98 — زبان مبهم"
  },
  {
    word: "approximately",
    meaning: "تقریباً",
    lesson: 98,
    pos: "adv.",
    lessonLabel: "درس 98 — زبان مبهم"
  },
  {
    word: "about/around",
    meaning: "حدوداً",
    lesson: 98,
    pos: "adv.",
    lessonLabel: "درس 98 — زبان مبهم"
  },
  {
    word: "roughly",
    meaning: "تقریباً",
    lesson: 98,
    pos: "adv.",
    lessonLabel: "درس 98 — زبان مبهم"
  },
  {
    word: "more or less",
    meaning: "بیش‌تر یا کمتر، تقریباً",
    lesson: 98,
    pos: "phr.",
    lessonLabel: "درس 98 — زبان مبهم"
  },
  {
    word: "or so",
    meaning: "حدوداً",
    lesson: 98,
    pos: "phr.",
    lessonLabel: "درس 98 — زبان مبهم"
  },
  {
    word: "purchase",
    meaning: "خریدن",
    lesson: 99,
    pos: "v.",
    lessonLabel: "درس 99 — انگلیسی رسمی و غیررسمی"
  },
  {
    word: "apprehend",
    meaning: "دستگیر کردن",
    lesson: 99,
    pos: "v.",
    lessonLabel: "درس 99 — انگلیسی رسمی و غیررسمی"
  },
  {
    word: "commence",
    meaning: "شروع کردن",
    lesson: 99,
    pos: "v.",
    lessonLabel: "درس 99 — انگلیسی رسمی و غیررسمی"
  },
  {
    word: "resume",
    meaning: "از سر گرفتن",
    lesson: 99,
    pos: "v.",
    lessonLabel: "درس 99 — انگلیسی رسمی و غیررسمی"
  },
  {
    word: "thus",
    meaning: "بنابراین",
    lesson: 99,
    pos: "adv.",
    lessonLabel: "درس 99 — انگلیسی رسمی و غیررسمی"
  },
  {
    word: "inform",
    meaning: "اطلاع دادن",
    lesson: 99,
    pos: "v.",
    lessonLabel: "درس 99 — انگلیسی رسمی و غیررسمی"
  },
  {
    word: "unable to",
    meaning: "ناتوان از",
    lesson: 99,
    pos: "adj.",
    lessonLabel: "درس 99 — انگلیسی رسمی و غیررسمی"
  },
  {
    word: "require",
    meaning: "نیاز داشتن",
    lesson: 99,
    pos: "v.",
    lessonLabel: "درس 99 — انگلیسی رسمی و غیررسمی"
  },
  {
    word: "further assistance",
    meaning: "کمک بیشتر",
    lesson: 99,
    pos: "phr.",
    lessonLabel: "درس 99 — انگلیسی رسمی و غیررسمی"
  },
  {
    word: "contact",
    meaning: "تماس گرفتن",
    lesson: 99,
    pos: "v.",
    lessonLabel: "درس 99 — انگلیسی رسمی و غیررسمی"
  },
  {
    word: "proceed to",
    meaning: "رفتن به / حرکت کردن به سمت",
    lesson: 99,
    pos: "phr.",
    lessonLabel: "درس 99 — انگلیسی رسمی و غیررسمی"
  },
  {
    word: "get",
    meaning: "گرفتن (غیررسمی)",
    lesson: 99,
    pos: "v.",
    lessonLabel: "درس 99 — انگلیسی رسمی و غیررسمی"
  },
  {
    word: "phrasal verbs",
    meaning: "افعال عبارتی",
    lesson: 99,
    pos: "n.",
    lessonLabel: "درس 99 — انگلیسی رسمی و غیررسمی"
  },
  {
    word: "idioms",
    meaning: "اصطلاح‌ها",
    lesson: 99,
    pos: "n.",
    lessonLabel: "درس 99 — انگلیسی رسمی و غیررسمی"
  },
  {
    word: "shortened words",
    meaning: "واژه‌های کوتاه‌شده",
    lesson: 99,
    pos: "n.",
    lessonLabel: "درس 99 — انگلیسی رسمی و غیررسمی"
  },
  {
    word: "pick up",
    meaning: "برداشتن / گرفتن کسی",
    lesson: 99,
    pos: "phr.",
    lessonLabel: "درس 99 — انگلیسی رسمی و غیررسمی"
  },
  {
    word: "kids",
    meaning: "بچه‌ها",
    lesson: 99,
    pos: "n.",
    lessonLabel: "درس 99 — انگلیسی رسمی و غیررسمی"
  },
  {
    word: "reckon",
    meaning: "فکر کردن",
    lesson: 99,
    pos: "v.",
    lessonLabel: "درس 99 — انگلیسی رسمی و غیررسمی"
  },
  {
    word: "pretty",
    meaning: "نسبتاً / خیلی",
    lesson: 99,
    pos: "adv.",
    lessonLabel: "درس 99 — انگلیسی رسمی و غیررسمی"
  },
  {
    word: "loo",
    meaning: "توالت",
    lesson: 99,
    pos: "n.",
    lessonLabel: "درس 99 — انگلیسی رسمی و غیررسمی"
  },
  {
    word: "fancy",
    meaning: "مایل بودن (غیررسمی)",
    lesson: 99,
    pos: "v.",
    lessonLabel: "درس 99 — انگلیسی رسمی و غیررسمی"
  },
  {
    word: "fix up",
    meaning: "هماهنگ کردن / ترتیب دادن",
    lesson: 99,
    pos: "phr.",
    lessonLabel: "درس 99 — انگلیسی رسمی و غیررسمی"
  },
  {
    word: "handy",
    meaning: "نزدیک و مناسب",
    lesson: 99,
    pos: "adj.",
    lessonLabel: "درس 99 — انگلیسی رسمی و غیررسمی"
  },
  {
    word: "terrific",
    meaning: "فوق‌العاده",
    lesson: 99,
    pos: "adj.",
    lessonLabel: "درس 99 — انگلیسی رسمی و غیررسمی"
  },
  {
    word: "bright",
    meaning: "باهوش",
    lesson: 99,
    pos: "adj.",
    lessonLabel: "درس 99 — انگلیسی رسمی و غیررسمی"
  },
  {
    word: "thick",
    meaning: "کم‌هوش (غیررسمی)",
    lesson: 99,
    pos: "adj.",
    lessonLabel: "درس 99 — انگلیسی رسمی و غیررسمی"
  },
  {
    word: "What's up?",
    meaning: "چه خبر؟ / مسئله چیست؟",
    lesson: 99,
    pos: "phr.",
    lessonLabel: "درس 99 — انگلیسی رسمی و غیررسمی"
  },
  {
    word: "get in touch with",
    meaning: "تماس گرفتن با",
    lesson: 99,
    pos: "phr.",
    lessonLabel: "درس 99 — انگلیسی رسمی و غیررسمی"
  },
  {
    word: "get to",
    meaning: "رسیدن به",
    lesson: 99,
    pos: "phr.",
    lessonLabel: "درس 99 — انگلیسی رسمی و غیررسمی"
  },
  {
    word: "have a word with",
    meaning: "چند کلمه‌ای گفتن با",
    lesson: 99,
    pos: "phr.",
    lessonLabel: "درس 99 — انگلیسی رسمی و غیررسمی"
  },
  {
    word: "quid",
    meaning: "پوند (غیررسمی)",
    lesson: 99,
    pos: "n.",
    lessonLabel: "درس 99 — انگلیسی رسمی و غیررسمی"
  },
  {
    word: "guy",
    meaning: "مرد / آقا",
    lesson: 99,
    pos: "n.",
    lessonLabel: "درس 99 — انگلیسی رسمی و غیررسمی"
  },
  {
    word: "cheers",
    meaning: "ممنون / خداحافظ (غیررسمی)",
    lesson: 99,
    pos: "phr.",
    lessonLabel: "درس 99 — انگلیسی رسمی و غیررسمی"
  },
  {
    word: "bike",
    meaning: "دوچرخه",
    lesson: 99,
    pos: "n.",
    lessonLabel: "درس 99 — انگلیسی رسمی و غیررسمی"
  },
  {
    word: "slang",
    meaning: "زبان عامیانه",
    lesson: 99,
    pos: "n.",
    lessonLabel: "درس 99 — انگلیسی رسمی و غیررسمی"
  },
  {
    word: "dope",
    meaning: "مواد مخدر (عامیانه)",
    lesson: 99,
    pos: "n.",
    lessonLabel: "درس 99 — انگلیسی رسمی و غیررسمی"
  },
  {
    word: "piss",
    meaning: "ادرار کردن (عامیانه)",
    lesson: 99,
    pos: "v.",
    lessonLabel: "درس 99 — انگلیسی رسمی و غیررسمی"
  },
  {
    word: "Piss off!",
    meaning: "گمشو! (عامیانه)",
    lesson: 99,
    pos: "phr.",
    lessonLabel: "درس 99 — انگلیسی رسمی و غیررسمی"
  },
  {
    word: "pissed",
    meaning: "مست (عامیانه)",
    lesson: 99,
    pos: "adj.",
    lessonLabel: "درس 99 — انگلیسی رسمی و غیررسمی"
  },
  {
    word: "pissing with rain",
    meaning: "شدیداً باران باریدن (عامیانه)",
    lesson: 99,
    pos: "phr.",
    lessonLabel: "درس 99 — انگلیسی رسمی و غیررسمی"
  },
  {
    word: "BBC",
    meaning: "سازمان پخش برنامه‌های بریتانیا",
    lesson: 100,
    lessonLabel: "درس 100 — کوتاه‌نویسی‌ها و واژه‌های کوتاه‌شده"
  },
  {
    word: "UN",
    meaning: "سازمان ملل متحد",
    lesson: 100,
    lessonLabel: "درس 100 — کوتاه‌نویسی‌ها و واژه‌های کوتاه‌شده"
  },
  {
    word: "EU",
    meaning: "اتحادیه اروپا",
    lesson: 100,
    lessonLabel: "درس 100 — کوتاه‌نویسی‌ها و واژه‌های کوتاه‌شده"
  },
  {
    word: "USA",
    meaning: "ایالات متحده آمریکا",
    lesson: 100,
    lessonLabel: "درس 100 — کوتاه‌نویسی‌ها و واژه‌های کوتاه‌شده"
  },
  {
    word: "WWW",
    meaning: "وب جهان‌گستر",
    lesson: 100,
    lessonLabel: "درس 100 — کوتاه‌نویسی‌ها و واژه‌های کوتاه‌شده"
  },
  {
    word: "ISP",
    meaning: "ارائه‌دهنده خدمات اینترنت",
    lesson: 100,
    lessonLabel: "درس 100 — کوتاه‌نویسی‌ها و واژه‌های کوتاه‌شده"
  },
  {
    word: "MP",
    meaning: "عضو پارلمان",
    lesson: 100,
    lessonLabel: "درس 100 — کوتاه‌نویسی‌ها و واژه‌های کوتاه‌شده"
  },
  {
    word: "PM",
    meaning: "نخست‌وزیر",
    lesson: 100,
    lessonLabel: "درس 100 — کوتاه‌نویسی‌ها و واژه‌های کوتاه‌شده"
  },
  {
    word: "ID",
    meaning: "شناسنامه/کارت شناسایی",
    lesson: 100,
    lessonLabel: "درس 100 — کوتاه‌نویسی‌ها و واژه‌های کوتاه‌شده"
  },
  {
    word: "PC",
    meaning: "رایانه شخصی",
    lesson: 100,
    lessonLabel: "درس 100 — کوتاه‌نویسی‌ها و واژه‌های کوتاه‌شده"
  },
  {
    word: "CV",
    meaning: "رزومه",
    lesson: 100,
    lessonLabel: "درس 100 — کوتاه‌نویسی‌ها و واژه‌های کوتاه‌شده"
  },
  {
    word: "CD",
    meaning: "لوح فشرده",
    lesson: 100,
    lessonLabel: "درس 100 — کوتاه‌نویسی‌ها و واژه‌های کوتاه‌شده"
  },
  {
    word: "AIDS",
    meaning: "ایدز (سندروم نقص ایمنی اکتسابی)",
    lesson: 100,
    lessonLabel: "درس 100 — کوتاه‌نویسی‌ها و واژه‌های کوتاه‌شده"
  },
  {
    word: "VAT",
    meaning: "مالیات بر ارزش افزوده",
    lesson: 100,
    lessonLabel: "درس 100 — کوتاه‌نویسی‌ها و واژه‌های کوتاه‌شده"
  },
  {
    word: "Mr",
    meaning: "آقا",
    lesson: 100,
    lessonLabel: "درس 100 — کوتاه‌نویسی‌ها و واژه‌های کوتاه‌شده"
  },
  {
    word: "Mrs",
    meaning: "خانم (زن متأهل)",
    lesson: 100,
    lessonLabel: "درس 100 — کوتاه‌نویسی‌ها و واژه‌های کوتاه‌شده"
  },
  {
    word: "Ms",
    meaning: "خانم/آنسا (زن، بدون تصریح تأهل)",
    lesson: 100,
    lessonLabel: "درس 100 — کوتاه‌نویسی‌ها و واژه‌های کوتاه‌شده"
  },
  {
    word: "St",
    meaning: "سنت / خیابان",
    lesson: 100,
    lessonLabel: "درس 100 — کوتاه‌نویسی‌ها و واژه‌های کوتاه‌شده"
  },
  {
    word: "Dr",
    meaning: "دکتر",
    lesson: 100,
    lessonLabel: "درس 100 — کوتاه‌نویسی‌ها و واژه‌های کوتاه‌شده"
  },
  {
    word: "etc.",
    meaning: "و غیره",
    lesson: 100,
    pos: "phr.",
    lessonLabel: "درس 100 — کوتاه‌نویسی‌ها و واژه‌های کوتاه‌شده"
  },
  {
    word: "e.g.",
    meaning: "برای مثال",
    lesson: 100,
    pos: "phr.",
    lessonLabel: "درس 100 — کوتاه‌نویسی‌ها و واژه‌های کوتاه‌شده"
  },
  {
    word: "i.e.",
    meaning: "یعنی / به عبارت دیگر",
    lesson: 100,
    pos: "phr.",
    lessonLabel: "درس 100 — کوتاه‌نویسی‌ها و واژه‌های کوتاه‌شده"
  },
  {
    word: "phone (telephone)",
    meaning: "تلفن",
    lesson: 100,
    lessonLabel: "درس 100 — کوتاه‌نویسی‌ها و واژه‌های کوتاه‌شده"
  },
  {
    word: "maths (mathematics)",
    meaning: "ریاضی",
    lesson: 100,
    lessonLabel: "درس 100 — کوتاه‌نویسی‌ها و واژه‌های کوتاه‌شده"
  },
  {
    word: "board (blackboard)",
    meaning: "تخته سیاه",
    lesson: 100,
    lessonLabel: "درس 100 — کوتاه‌نویسی‌ها و واژه‌های کوتاه‌شده"
  },
  {
    word: "case (suitcase)",
    meaning: "چمدان",
    lesson: 100,
    lessonLabel: "درس 100 — کوتاه‌نویسی‌ها و واژه‌های کوتاه‌شده"
  },
  {
    word: "ad/advert (advertisement)",
    meaning: "آگهی",
    lesson: 100,
    lessonLabel: "درس 100 — کوتاه‌نویسی‌ها و واژه‌های کوتاه‌شده"
  },
  {
    word: "lab (laboratory)",
    meaning: "آزمایشگاه",
    lesson: 100,
    lessonLabel: "درس 100 — کوتاه‌نویسی‌ها و واژه‌های کوتاه‌شده"
  },
  {
    word: "fridge (refrigerator)",
    meaning: "یخچال",
    lesson: 100,
    lessonLabel: "درس 100 — کوتاه‌نویسی‌ها و واژه‌های کوتاه‌شده"
  },
  {
    word: "exam (examination)",
    meaning: "امتحان",
    lesson: 100,
    lessonLabel: "درس 100 — کوتاه‌نویسی‌ها و واژه‌های کوتاه‌شده"
  },
  {
    word: "plane (aeroplane)",
    meaning: "هواپیما",
    lesson: 100,
    lessonLabel: "درس 100 — کوتاه‌نویسی‌ها و واژه‌های کوتاه‌شده"
  },
  {
    word: "photo (photograph)",
    meaning: "عکس",
    lesson: 100,
    lessonLabel: "درس 100 — کوتاه‌نویسی‌ها و واژه‌های کوتاه‌شده"
  },
  {
    word: "flu (influenza)",
    meaning: "آنفلوانزا",
    lesson: 100,
    lessonLabel: "درس 100 — کوتاه‌نویسی‌ها و واژه‌های کوتاه‌شده"
  },
  {
    word: "bike (bicycle)",
    meaning: "دوچرخه",
    lesson: 100,
    lessonLabel: "درس 100 — کوتاه‌نویسی‌ها و واژه‌های کوتاه‌شده"
  },
  {
    word: "TV/telly (television)",
    meaning: "تلویزیون",
    lesson: 100,
    lessonLabel: "درس 100 — کوتاه‌نویسی‌ها و واژه‌های کوتاه‌شده"
  },
  {
    word: "a paper (newspaper)",
    meaning: "روزنامه",
    lesson: 100,
    lessonLabel: "درس 100 — کوتاه‌نویسی‌ها و واژه‌های کوتاه‌شده"
  },
  {
    word: "vet (veterinary surgeon)",
    meaning: "دامپزشک",
    lesson: 100,
    lessonLabel: "درس 100 — کوتاه‌نویسی‌ها و واژه‌های کوتاه‌شده"
  },
  {
    word: "gym (gymnasium)",
    meaning: "سالن ورزشی",
    lesson: 100,
    lessonLabel: "درس 100 — کوتاه‌نویسی‌ها و واژه‌های کوتاه‌شده"
  },
  {
    word: "sales rep (sales representative)",
    meaning: "نماینده فروش",
    lesson: 100,
    lessonLabel: "درس 100 — کوتاه‌نویسی‌ها و واژه‌های کوتاه‌شده"
  }
];

export const VOCAB_PART_5: Row[] = ROWS;
