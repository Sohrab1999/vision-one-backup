// واژگان درس‌های English Vocabulary in Use — Upper-intermediate (پارتیت 3) — استخراج VLM از اسکن PDF
// word = عین چاپ کتاب · meaning = ترجمهٔ ماشینی GLM (کلاس FA-NEW — اثبات صحت ترجمه نیست)
import type { VocabWord } from "../types";

type Row = Omit<VocabWord, "lesson"> & { lesson: number; lessonLabel: string };

const ROWS: Row[] = [
  {
    word: "power cut",
    meaning: "قطع برق",
    lesson: 41,
    lessonLabel: "درس 41 — مشکلات روزمره"
  },
  {
    word: "flooded",
    meaning: "غرق‌آب شده",
    lesson: 41,
    pos: "adj.",
    lessonLabel: "درس 41 — مشکلات روزمره"
  },
  {
    word: "door-handle",
    meaning: "دستگیرهٔ در",
    lesson: 41,
    pos: "n.",
    lessonLabel: "درس 41 — مشکلات روزمره"
  },
  {
    word: "come off",
    meaning: "جد شدن، وا رفتن",
    lesson: 41,
    pos: "phr.",
    lessonLabel: "درس 41 — مشکلات روزمره"
  },
  {
    word: "broke down",
    meaning: "از کار افتاد",
    lesson: 41,
    lessonLabel: "درس 41 — مشکلات روزمره"
  },
  {
    word: "laundry",
    meaning: "لباس‌شویی، رخت‌شویی",
    lesson: 41,
    pos: "n.",
    lessonLabel: "درس 41 — مشکلات روزمره"
  },
  {
    word: "leaking",
    meaning: "چکه کردن، نشت کردن",
    lesson: 41,
    lessonLabel: "درس 41 — مشکلات روزمره"
  },
  {
    word: "batteries have run out / are dead",
    meaning: "باتری‌ها تمام شده‌اند / خالی هستند",
    lesson: 41,
    lessonLabel: "درس 41 — مشکلات روزمره"
  },
  {
    word: "broken",
    meaning: "شکسته",
    lesson: 41,
    pos: "adj.",
    lessonLabel: "درس 41 — مشکلات روزمره"
  },
  {
    word: "chipped",
    meaning: "تراش‌دار، پرتخته",
    lesson: 41,
    pos: "adj.",
    lessonLabel: "درس 41 — مشکلات روزمره"
  },
  {
    word: "twisted her ankle",
    meaning: "مچ پایش پیچ خورد",
    lesson: 41,
    lessonLabel: "درس 41 — مشکلات روزمره"
  },
  {
    word: "cut",
    meaning: "بریدن، بریدگی",
    lesson: 41,
    lessonLabel: "درس 41 — مشکلات روزمره"
  },
  {
    word: "bumped/banged",
    meaning: "به چیزی خوردن (سر)",
    lesson: 41,
    lessonLabel: "درس 41 — مشکلات روزمره"
  },
  {
    word: "bruise",
    meaning: "کبودی",
    lesson: 41,
    pos: "n.",
    lessonLabel: "درس 41 — مشکلات روزمره"
  },
  {
    word: "fell down",
    meaning: "افتاد",
    lesson: 41,
    lessonLabel: "درس 41 — مشکلات روزمره"
  },
  {
    word: "grazed",
    meaning: "سائیدگی (زخم سطحی)",
    lesson: 41,
    lessonLabel: "درس 41 — مشکلات روزمره"
  },
  {
    word: "mislaid",
    meaning: "گم کرده (جایی گذاشته و یادش رفته)",
    lesson: 41,
    pos: "v. (past of mislay)",
    lessonLabel: "درس 41 — مشکلات روزمره"
  },
  {
    word: "spilt",
    meaning: "ریخت (مایع)",
    lesson: 41,
    lessonLabel: "درس 41 — مشکلات روزمره"
  },
  {
    word: "stain",
    meaning: "لکه گذاشتن",
    lesson: 41,
    pos: "n.",
    lessonLabel: "درس 41 — مشکلات روزمره"
  },
  {
    word: "blocked",
    meaning: "گرفته (لوله/سینک)",
    lesson: 41,
    pos: "adj.",
    lessonLabel: "درس 41 — مشکلات روزمره"
  },
  {
    word: "dented",
    meaning: "تیر، فرورفتگی داشتن",
    lesson: 41,
    lessonLabel: "درس 41 — مشکلات روزمره"
  },
  {
    word: "locked myself out",
    meaning: "خودم را بیرون انداختم (کلید یادم رفت)",
    lesson: 41,
    lessonLabel: "درس 41 — مشکلات روزمره"
  },
  {
    word: "won't start",
    meaning: "روشن نمی‌شود (ماشین)",
    lesson: 41,
    lessonLabel: "درس 41 — مشکلات روزمره"
  },
  {
    word: "flat",
    meaning: "خالی (باتری)",
    lesson: 41,
    pos: "adj.",
    lessonLabel: "درس 41 — مشکلات روزمره"
  },
  {
    word: "slow/fast/stopped",
    meaning: "عقب/جلو/متوقف (ساعت)",
    lesson: 41,
    lessonLabel: "درس 41 — مشکلات روزمره"
  },
  {
    word: "earthquake",
    meaning: "زمین‌لرزه",
    lesson: 42,
    pos: "n.",
    lessonLabel: "درس 42 — مشکلات جهانی"
  },
  {
    word: "drought",
    meaning: "خشکسالی",
    lesson: 42,
    pos: "n.",
    lessonLabel: "درس 42 — مشکلات جهانی"
  },
  {
    word: "explosion",
    meaning: "انفجار",
    lesson: 42,
    pos: "n.",
    lessonLabel: "درس 42 — مشکلات جهانی"
  },
  {
    word: "hurricane",
    meaning: "توفان",
    lesson: 42,
    pos: "n.",
    lessonLabel: "درس 42 — مشکلات جهانی"
  },
  {
    word: "tornado",
    meaning: "گردباد",
    lesson: 42,
    pos: "n.",
    lessonLabel: "درس 42 — مشکلات جهانی"
  },
  {
    word: "typhoon",
    meaning: "تایفون (توفان استوایی)",
    lesson: 42,
    pos: "n.",
    lessonLabel: "درس 42 — مشکلات جهانی"
  },
  {
    word: "volcano",
    meaning: "آتشفشان",
    lesson: 42,
    pos: "n.",
    lessonLabel: "درس 42 — مشکلات جهانی"
  },
  {
    word: "famine",
    meaning: "قحطی",
    lesson: 42,
    pos: "n.",
    lessonLabel: "درس 42 — مشکلات جهانی"
  },
  {
    word: "flood",
    meaning: "سیل",
    lesson: 42,
    pos: "n.",
    lessonLabel: "درس 42 — مشکلات جهانی"
  },
  {
    word: "major accident",
    meaning: "حادثهٔ بزرگ",
    lesson: 42,
    pos: "n.",
    lessonLabel: "درس 42 — مشکلات جهانی"
  },
  {
    word: "plane crash",
    meaning: "سقوط هواپیما",
    lesson: 42,
    pos: "n.",
    lessonLabel: "درس 42 — مشکلات جهانی"
  },
  {
    word: "epidemic",
    meaning: "همه‌گیری (اپیدمی)",
    lesson: 42,
    pos: "n.",
    lessonLabel: "درس 42 — مشکلات جهانی"
  },
  {
    word: "war",
    meaning: "جنگ",
    lesson: 42,
    pos: "n.",
    lessonLabel: "درس 42 — مشکلات جهانی"
  },
  {
    word: "civil war",
    meaning: "جنگ داخلی",
    lesson: 42,
    pos: "n.",
    lessonLabel: "درس 42 — مشکلات جهانی"
  },
  {
    word: "natural disasters",
    meaning: "بلایای طبیعی",
    lesson: 42,
    pos: "n.",
    lessonLabel: "درس 42 — مشکلات جهانی"
  },
  {
    word: "erupt",
    meaning: "فوران کردن",
    lesson: 42,
    pos: "v.",
    lessonLabel: "درس 42 — مشکلات جهانی"
  },
  {
    word: "spread",
    meaning: "گسترش یافتن",
    lesson: 42,
    pos: "v.",
    lessonLabel: "درس 42 — مشکلات جهانی"
  },
  {
    word: "starve",
    meaning: "از گرسنگی مردن",
    lesson: 42,
    pos: "v.",
    lessonLabel: "درس 42 — مشکلات جهانی"
  },
  {
    word: "shake",
    meaning: "لرزاندن",
    lesson: 42,
    pos: "v.",
    lessonLabel: "درس 42 — مشکلات جهانی"
  },
  {
    word: "suffer",
    meaning: "رنج بردن",
    lesson: 42,
    pos: "v.",
    lessonLabel: "درس 42 — مشکلات جهانی"
  },
  {
    word: "break out",
    meaning: "شروع شدن (جنگ، آتش‌سوزی)",
    lesson: 42,
    pos: "v.",
    lessonLabel: "درس 42 — مشکلات جهانی"
  },
  {
    word: "sweep",
    meaning: "جارو کردن، دررفتن",
    lesson: 42,
    pos: "v.",
    lessonLabel: "درس 42 — مشکلات جهانی"
  },
  {
    word: "injure",
    meaning: "زخمی کردن",
    lesson: 42,
    pos: "v.",
    lessonLabel: "درس 42 — مشکلات جهانی"
  },
  {
    word: "damage",
    meaning: "خراب کردن",
    lesson: 42,
    pos: "v.",
    lessonLabel: "درس 42 — مشکلات جهانی"
  },
  {
    word: "casualties",
    meaning: "تلفات (کشته و زخمی)",
    lesson: 42,
    pos: "n.",
    lessonLabel: "درس 42 — مشکلات جهانی"
  },
  {
    word: "victims",
    meaning: "قربانیان",
    lesson: 42,
    pos: "n.",
    lessonLabel: "درس 42 — مشکلات جهانی"
  },
  {
    word: "survivors",
    meaning: "بازماندگان، نجات‌یافتگان",
    lesson: 42,
    pos: "n.",
    lessonLabel: "درس 42 — مشکلات جهانی"
  },
  {
    word: "refugees",
    meaning: "پناهندگان",
    lesson: 42,
    pos: "n.",
    lessonLabel: "درس 42 — مشکلات جهانی"
  },
  {
    word: "the dead",
    meaning: "کشته‌ها",
    lesson: 42,
    pos: "n.",
    lessonLabel: "درس 42 — مشکلات جهانی"
  },
  {
    word: "wounded",
    meaning: "زخمی‌ها (در جنگ)",
    lesson: 42,
    pos: "adj.",
    lessonLabel: "درس 42 — مشکلات جهانی"
  },
  {
    word: "rabies",
    meaning: "هاری",
    lesson: 42,
    pos: "n.",
    lessonLabel: "درس 42 — مشکلات جهانی"
  },
  {
    word: "cholera",
    meaning: "وبا",
    lesson: 42,
    pos: "n.",
    lessonLabel: "درس 42 — مشکلات جهانی"
  },
  {
    word: "typhoid",
    meaning: "حصبه (تیفوئید)",
    lesson: 42,
    pos: "n.",
    lessonLabel: "درس 42 — مشکلات جهانی"
  },
  {
    word: "malaria",
    meaning: "مالاریا",
    lesson: 42,
    pos: "n.",
    lessonLabel: "درس 42 — مشکلات جهانی"
  },
  {
    word: "yellow fever",
    meaning: "تب زرد",
    lesson: 42,
    pos: "n.",
    lessonLabel: "درس 42 — مشکلات جهانی"
  },
  {
    word: "AIDS",
    meaning: "ایدز (نقص ایمنی اکتسابی)",
    lesson: 42,
    pos: "n.",
    lessonLabel: "درس 42 — مشکلات جهانی"
  },
  {
    word: "leprosy",
    meaning: "جذام",
    lesson: 42,
    pos: "n.",
    lessonLabel: "درس 42 — مشکلات جهانی"
  },
  {
    word: "play school/group",
    meaning: "مهد کودک/گروه بازی",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — آموزش"
  },
  {
    word: "nursery school",
    meaning: "مدرسه کودکستان",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — آموزش"
  },
  {
    word: "pre-school",
    meaning: "پیش از دبستان (۲ تا ۵ سال)",
    lesson: 43,
    pos: "adj.",
    lessonLabel: "درس 43 — آموزش"
  },
  {
    word: "infant school",
    meaning: "مدرسه کودکان (دبستان پایین)",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — آموزش"
  },
  {
    word: "junior school",
    meaning: "مدرسه ابتدایی (بالا)",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — آموزش"
  },
  {
    word: "primary",
    meaning: "دبستان (۵/۶ تا ۱۲/۱۳ سالگی)",
    lesson: 43,
    pos: "adj.",
    lessonLabel: "درس 43 — آموزش"
  },
  {
    word: "comprehensive school",
    meaning: "مدرسه جامع (دولتی، برای همه توانایی‌ها)",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — آموزش"
  },
  {
    word: "grammar school",
    meaning: "دبیرستان ورودی با امتحان",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — آموزش"
  },
  {
    word: "sixth form college",
    meaning: "دانشکده دوره پیش‌دانشگاهی (۱۶ تا ۱۸ سالگی)",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — آموزش"
  },
  {
    word: "secondary",
    meaning: "متوسطه (۱۲/۱۳ تا ۱۶/۱۸ سالگی)",
    lesson: 43,
    pos: "adj.",
    lessonLabel: "درس 43 — آموزش"
  },
  {
    word: "college",
    meaning: "دانشکده",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — آموزش"
  },
  {
    word: "university",
    meaning: "دانشگاه",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — آموزش"
  },
  {
    word: "further/higher education",
    meaning: "آموزش عالی/تکمیلی (۱۸ سال به بالا)",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — آموزش"
  },
  {
    word: "public school",
    meaning: "مدرسه خصوصی معتبر در بریتانیا",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — آموزش"
  },
  {
    word: "private school",
    meaning: "مدرسه خصوصی",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — آموزش"
  },
  {
    word: "teacher-training college",
    meaning: "دانشسرای تربیت معلم",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — آموزش"
  },
  {
    word: "technical college",
    meaning: "دانشکده فنی",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — آموزش"
  },
  {
    word: "general college of further education",
    meaning: "دانشکده عمومی آموزش تکمیلی",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — آموزش"
  },
  {
    word: "take/do/sit an exam",
    meaning: "در امتحان شرکت کردن",
    lesson: 43,
    pos: "phr.",
    lessonLabel: "درس 43 — آموزش"
  },
  {
    word: "resit an exam",
    meaning: "در امتحان تجدیدی شرکت کردن",
    lesson: 43,
    pos: "phr.",
    lessonLabel: "درس 43 — آموزش"
  },
  {
    word: "pass an exam",
    meaning: "قبول شدن در امتحان",
    lesson: 43,
    pos: "phr.",
    lessonLabel: "درس 43 — آموزش"
  },
  {
    word: "do well in an exam",
    meaning: "نتیجه خوب گرفتن در امتحان",
    lesson: 43,
    pos: "phr.",
    lessonLabel: "درس 43 — آموزش"
  },
  {
    word: "fail an exam",
    meaning: "مردود شدن در امتحان",
    lesson: 43,
    pos: "phr.",
    lessonLabel: "درس 43 — آموزش"
  },
  {
    word: "do badly in an exam",
    meaning: "نتیجه بد گرفتن در امتحان",
    lesson: 43,
    pos: "phr.",
    lessonLabel: "درس 43 — آموزش"
  },
  {
    word: "revise",
    meaning: "مرور کردن (برای امتحان)",
    lesson: 43,
    pos: "v.",
    lessonLabel: "درس 43 — آموزش"
  },
  {
    word: "skip classes/lectures",
    meaning: "از کلاس/درس غیبت کردن",
    lesson: 43,
    pos: "phr.",
    lessonLabel: "درس 43 — آموزش"
  },
  {
    word: "tests",
    meaning: "آزمون‌ها",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — آموزش"
  },
  {
    word: "school-leaving exams",
    meaning: "امتحانات پایان تحصیل در مدرسه",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — آموزش"
  },
  {
    word: "GCSEs",
    meaning: "مدارک عمومی تحصیلات متوسطه (۱۶ سالگی در انگلستان)",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — آموزش"
  },
  {
    word: "A-levels",
    meaning: "مدارک سطح پیشرفته (۱۸ سالگی در انگلستان)",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — آموزش"
  },
  {
    word: "continuous assessment",
    meaning: "ارزیابی مستمر",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — آموزش"
  },
  {
    word: "marks",
    meaning: "نمرات (به درصد)",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — آموزش"
  },
  {
    word: "grades",
    meaning: "نمرات (حروفی مثل A، B+)",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — آموزش"
  },
  {
    word: "graduate",
    meaning: "فارغ‌التحصیل شدن؛ مدرک گرفتن",
    lesson: 43,
    pos: "v.",
    lessonLabel: "درس 43 — آموزش"
  },
  {
    word: "post-graduate",
    meaning: "تحصیلات تکمیلی",
    lesson: 43,
    pos: "adj.",
    lessonLabel: "درس 43 — آموزش"
  },
  {
    word: "lectures",
    meaning: "سخنرانی‌ها/کلاس‌های سخنرانی",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — آموزش"
  },
  {
    word: "seminars",
    meaning: "سمینارها (کلاس‌های بحث گروهی)",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — آموزش"
  },
  {
    word: "tutorials",
    meaning: "کلاس‌های آموزشی کوچک با استاد",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — آموزش"
  },
  {
    word: "professor",
    meaning: "استاد (دانشیار ارشد دانشگاه)",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — آموزش"
  },
  {
    word: "lecturers",
    meaning: "مدرس‌های دانشگاه",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — آموزش"
  },
  {
    word: "tutors",
    meaning: "استادان راهنما/معلمان خصوصی",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — آموزش"
  },
  {
    word: "school-leaving age",
    meaning: "سن ترک تحصیل از مدرسه",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — آموزش"
  },
  {
    word: "evening classes",
    meaning: "کلاس‌های شبانه",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — آموزش"
  },
  {
    word: "state",
    meaning: "دولتی",
    lesson: 43,
    pos: "adj.",
    lessonLabel: "درس 43 — آموزش"
  },
  {
    word: "private universities",
    meaning: "دانشگاه‌های خصوصی",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — آموزش"
  },
  {
    word: "grants",
    meaning: "کمک‌هزینه تحصیلی",
    lesson: 43,
    pos: "n.",
    lessonLabel: "درس 43 — آموزش"
  },
  {
    word: "director",
    meaning: "عضو هیئت مدیرهٔ شرکت",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "executive",
    meaning: "فرد مهمی که تصمیمات بزرگ می‌گیرد",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "administrator",
    meaning: "کسی که امور دفتر را روزمره اداره می‌کند",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "clerk",
    meaning: "کارمند سادهٔ دفتری",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "skilled worker",
    meaning: "کارگر ماهر (برای کار مشخص آموزش‌دیده)",
    lesson: 44,
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "unskilled worker",
    meaning: "کارگر غیرماهر (شغلی که نیاز به آموزش ندارد)",
    lesson: 44,
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "labourer",
    meaning: "کارگر سخت‌کار (کار بدنی سنگین)",
    lesson: 44,
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "receptionist",
    meaning: "متصدی پذیرش",
    lesson: 44,
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "public relations officer",
    meaning: "مسئول روابط عمومی (ارائهٔ اطلاعات به مطبوعات و تلویزیون)",
    lesson: 44,
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "safety officer",
    meaning: "مسئول ایمنی (مطمئن می‌شود ماشین‌آلات خطرناک نیستند)",
    lesson: 44,
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "security officer",
    meaning: "مسئول امنیت (جلوگیری از ورود سارقان/مجرمان)",
    lesson: 44,
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "union representative",
    meaning: "نمایندهٔ اتحادیه (نگهبان منافع کارکنان)",
    lesson: 44,
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "economist",
    meaning: "اقتصاددان (متخصص امور مالی)",
    lesson: 44,
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "personnel officer",
    meaning: "مسئول امور کارکنان (ادارهٔ امور کارمندان جدید و فعلی)",
    lesson: 44,
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "sales assistant",
    meaning: "فروشنده (فروش کالا به مردم)",
    lesson: 44,
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "education officer",
    meaning: "مسئول آموزش (برگزاری دوره‌ها و کلاس‌ها برای کارکنان)",
    lesson: 44,
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "research-worker",
    meaning: "پژوهشگر (تحقیق و توسعهٔ محصولات جدید)",
    lesson: 44,
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "supervisor",
    meaning: "سرپرست (نظارت بر درست انجام شدن کار کارگران)",
    lesson: 44,
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "profession",
    meaning: "حرفه (شغل نیازمند آموزش و صلاحیت قابل توجه)",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "trade",
    meaning: "صنعت/فن (شغل دستی ماهر نیازمند آموزش حین کار)",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "lawyer",
    meaning: "وکیل",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "dentist",
    meaning: "دندان‌پزشک",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "hairdresser",
    meaning: "آرایشگر",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "mechanic",
    meaning: "مکانیک",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "architect",
    meaning: "معمار",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "priest",
    meaning: "کشیش",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "farmer",
    meaning: "کشاورز",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "vet",
    meaning: "دامپزشک",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "librarian",
    meaning: "کتابدار",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "physiotherapist",
    meaning: "فیزیوتراپیست",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "child-minder",
    meaning: "مراقب کودک",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "police officer",
    meaning: "افسر پلیس",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "accountant",
    meaning: "حسابدار",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "engineer",
    meaning: "مهندس",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "scientist",
    meaning: "دانشمند",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "chef",
    meaning: "سرآشپز",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "firefighter",
    meaning: "آتش‌نشان",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "civil servant",
    meaning: "کارمند دولت",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "tailor/dressmaker",
    meaning: "خیاط",
    lesson: 44,
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "designer",
    meaning: "طراح",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "builder",
    meaning: "بنا/سازنده",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "carpenter",
    meaning: "نجار",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "plumber",
    meaning: "لوله‌کش",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "get/find work",
    meaning: "کار پیدا کردن",
    lesson: 44,
    pos: "phr.",
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "be offered work/a job",
    meaning: "پیشنهاد کار/شغل گرفتن",
    lesson: 44,
    pos: "phr.",
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "do for a living",
    meaning: "برای امرار معاش کاری انجام دادن",
    lesson: 44,
    pos: "phr.",
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "in publishing/banking",
    meaning: "در حوزهٔ نشر/بانکداری",
    lesson: 44,
    pos: "phr.",
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "make a living",
    meaning: "اقرار معاش کردن (به‌قدر کافی درآمد داشتن)",
    lesson: 44,
    pos: "phr.",
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "take on that job",
    meaning: "قبول آن کار (با مسئولیت شخصی)",
    lesson: 44,
    pos: "phr.",
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "do shift-work / work shifts",
    meaning: "کار نوبتی انجام دادن",
    lesson: 44,
    pos: "phr.",
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "be on flexi-time",
    meaning: "ساعت کار منعطف داشتن",
    lesson: 44,
    pos: "phr.",
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "work nine-to-five",
    meaning: "کار اداری معمول (۹ تا ۵) انجام دادن",
    lesson: 44,
    pos: "phr.",
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "go/be on strike",
    meaning: "اعتصاب کردن/در اعتصاب بودن",
    lesson: 44,
    pos: "phr.",
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "get the sack",
    meaning: "اخراج شدن (غیررسمی)",
    lesson: 44,
    pos: "phr.",
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "be fired",
    meaning: "اخراج شدن (رسمی‌تر)",
    lesson: 44,
    pos: "phr.",
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "be made redundant",
    meaning: "تعدیل شدن (دیگر لازم نیست)",
    lesson: 44,
    pos: "phr.",
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "be laid off",
    meaning: "دستی از کار کوتاه شدن (غیررسمی‌تر از made redundant)",
    lesson: 44,
    pos: "phr.",
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "give up work",
    meaning: "کار را ترک کردن (مثلاً برای درس)",
    lesson: 44,
    pos: "phr.",
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "be on / take maternity or paternity leave",
    meaning: "مرخصی زایمان/پدری گرفتن",
    lesson: 44,
    pos: "phr.",
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "be on / take sick leave",
    meaning: "مرخصی استعلاجی گرفتن",
    lesson: 44,
    pos: "phr.",
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "take early retirement",
    meaning: "بازنشستگی پیش از موعد",
    lesson: 44,
    pos: "phr.",
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "be a workaholic",
    meaning: "کارهای more than عاشق کار بودن / معتاد کار بودن",
    lesson: 44,
    pos: "phr.",
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "be promoted",
    meaning: "ارتقا گرفتن",
    lesson: 44,
    pos: "phr.",
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "apply for a job",
    meaning: "برای شغل درخواست دادن",
    lesson: 44,
    pos: "phr.",
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "shift-work",
    meaning: "کار نوبتی",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "flexi-time",
    meaning: "ساعت کار منعطف",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "strike",
    meaning: "اعتصاب",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "sack",
    meaning: "اخراج",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "redundant",
    meaning: "اضافی/تعدیل‌شده",
    lesson: 44,
    pos: "adj.",
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "maternity leave",
    meaning: "مرخصی زایمان",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "paternity leave",
    meaning: "مرخصی پدری",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "sick leave",
    meaning: "مرخصی استعلاجی",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "early retirement",
    meaning: "بازنشستگی پیش از موعد",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "workaholic",
    meaning: "معتاد کار",
    lesson: 44,
    pos: "n.",
    lessonLabel: "درس 44 — کار"
  },
  {
    word: "hang-gliding",
    meaning: "دلتاپلان‌سواری",
    lesson: 45,
    lessonLabel: "درس 45 — ورزش"
  },
  {
    word: "windsurfing",
    meaning: "بادسواری",
    lesson: 45,
    lessonLabel: "درس 45 — ورزش"
  },
  {
    word: "(ten-pin) bowling",
    meaning: "بولینگ (ده‌گوشه)",
    lesson: 45,
    lessonLabel: "درس 45 — ورزش"
  },
  {
    word: "scuba-diving",
    meaning: "غواصی با کپسول اکسیژن",
    lesson: 45,
    lessonLabel: "درس 45 — ورزش"
  },
  {
    word: "cross-country skiing",
    meaning: "اسکی صحرانوردی",
    lesson: 45,
    lessonLabel: "درس 45 — ورزش"
  },
  {
    word: "show-jumping",
    meaning: "پرش با اسب",
    lesson: 45,
    lessonLabel: "درس 45 — ورزش"
  },
  {
    word: "fencing",
    meaning: "شمشیربازی",
    lesson: 45,
    lessonLabel: "درس 45 — ورزش"
  },
  {
    word: "snooker/pool/billiards",
    meaning: "اسنوکر/بیلیارد",
    lesson: 45,
    lessonLabel: "درس 45 — ورزش"
  },
  {
    word: "motor-racing",
    meaning: "مسابقات اتومبیل‌رانی",
    lesson: 45,
    lessonLabel: "درس 45 — ورزش"
  },
  {
    word: "archery",
    meaning: "تیراندازی با کمان",
    lesson: 45,
    lessonLabel: "درس 45 — ورزش"
  },
  {
    word: "club",
    meaning: "چوب گلف",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — ورزش"
  },
  {
    word: "racket",
    meaning: "راکت",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — ورزش"
  },
  {
    word: "dart",
    meaning: "دارت",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — ورزش"
  },
  {
    word: "bow",
    meaning: "کمان",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — ورزش"
  },
  {
    word: "bat",
    meaning: "چوب بیسبال/تنیس روی میز",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — ورزش"
  },
  {
    word: "stick",
    meaning: "چوب هاکی",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — ورزش"
  },
  {
    word: "cue",
    meaning: "چوب بیلیارد",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — ورزش"
  },
  {
    word: "paddle",
    meaning: "پاروی کانو",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — ورزش"
  },
  {
    word: "oar",
    meaning: "پارو",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — ورزش"
  },
  {
    word: "rod/line",
    meaning: "میله/نخ ماهیگیری",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — ورزش"
  },
  {
    word: "discus",
    meaning: "پرتاب دیسک",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — ورزش"
  },
  {
    word: "javelin",
    meaning: "پرتاب نیزه",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — ورزش"
  },
  {
    word: "high-jump",
    meaning: "پرش ارتفاع",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — ورزش"
  },
  {
    word: "long-jump",
    meaning: "پرش طول",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — ورزش"
  },
  {
    word: "pole-vault",
    meaning: "پرش با نیزه",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — ورزش"
  },
  {
    word: "sprinter",
    meaning: "دونده سرعت",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — ورزش"
  },
  {
    word: "final leg",
    meaning: "مرحله پایانی",
    lesson: 45,
    pos: "phr.",
    lessonLabel: "درس 45 — ورزش"
  },
  {
    word: "relay",
    meaning: "میدانی امدادی",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — ورزش"
  },
  {
    word: "baton",
    meaning: "چوب امداد",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — ورزش"
  },
  {
    word: "long-distance runner",
    meaning: "دونده استقامت",
    lesson: 45,
    pos: "phr.",
    lessonLabel: "درس 45 — ورزش"
  },
  {
    word: "jogging",
    meaning: "نرمش دویدن",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — ورزش"
  },
  {
    word: "win",
    meaning: "بردن",
    lesson: 45,
    pos: "v.",
    lessonLabel: "درس 45 — ورزش"
  },
  {
    word: "lose",
    meaning: "باختن",
    lesson: 45,
    pos: "v.",
    lessonLabel: "درس 45 — ورزش"
  },
  {
    word: "break the record",
    meaning: "رکورد را شکستن",
    lesson: 45,
    pos: "phr.",
    lessonLabel: "درس 45 — ورزش"
  },
  {
    word: "hold the record",
    meaning: "رکورد را داشتن",
    lesson: 45,
    pos: "phr.",
    lessonLabel: "درس 45 — ورزش"
  },
  {
    word: "beat",
    meaning: "شکست دادن",
    lesson: 45,
    pos: "v.",
    lessonLabel: "درس 45 — ورزش"
  },
  {
    word: "defeat",
    meaning: "شکست دادن (رسمی‌تر)",
    lesson: 45,
    pos: "v.",
    lessonLabel: "درس 45 — ورزش"
  },
  {
    word: "score",
    meaning: "گل/امتیاز زدن",
    lesson: 45,
    pos: "v.",
    lessonLabel: "درس 45 — ورزش"
  },
  {
    word: "take up",
    meaning: "شروع کردن (یک ورزش)",
    lesson: 45,
    pos: "phr.",
    lessonLabel: "درس 45 — ورزش"
  },
  {
    word: "give up",
    meaning: "کنار گذاشتن",
    lesson: 45,
    pos: "phr.",
    lessonLabel: "درس 45 — ورزش"
  },
  {
    word: "footballer",
    meaning: "فوتبالیست",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — ورزش"
  },
  {
    word: "swimmer",
    meaning: "شناگر",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — ورزش"
  },
  {
    word: "windsurfer",
    meaning: "بادسوار",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — ورزش"
  },
  {
    word: "high-jumper",
    meaning: "پرش ارتفاع‌زن",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — ورزش"
  },
  {
    word: "cricketer",
    meaning: "بازیکن کریکت",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — ورزش"
  },
  {
    word: "golfer",
    meaning: "گلف‌باز",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — ورزش"
  },
  {
    word: "player",
    meaning: "بازیکن",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — ورزش"
  },
  {
    word: "canoeist",
    meaning: "قایقران کانو",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — ورزش"
  },
  {
    word: "mountaineer",
    meaning: "کوهنورد",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — ورزش"
  },
  {
    word: "jockey",
    meaning: "سوارکار مسابقه",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — ورزش"
  },
  {
    word: "archer",
    meaning: "کمانگیر",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — ورزش"
  },
  {
    word: "gymnast",
    meaning: "ژیمناست",
    lesson: 45,
    pos: "n.",
    lessonLabel: "درس 45 — ورزش"
  },
  {
    word: "novels",
    meaning: "رمان‌ها",
    lesson: 46,
    lessonLabel: "درس 46 — هنرها"
  },
  {
    word: "biographies",
    meaning: "زندگی‌نامه‌ها",
    lesson: 46,
    lessonLabel: "درس 46 — هنرها"
  },
  {
    word: "short stories",
    meaning: "داستان‌های کوتاه",
    lesson: 46,
    lessonLabel: "درس 46 — هنرها"
  },
  {
    word: "drama",
    meaning: "نمایش/درام",
    lesson: 46,
    lessonLabel: "درس 46 — هنرها"
  },
  {
    word: "poetry",
    meaning: "شعر",
    lesson: 46,
    lessonLabel: "درس 46 — هنرها"
  },
  {
    word: "LITERATURE",
    meaning: "ادبیات",
    lesson: 46,
    lessonLabel: "درس 46 — هنرها"
  },
  {
    word: "theatre",
    meaning: "تئاتر",
    lesson: 46,
    lessonLabel: "درس 46 — هنرها"
  },
  {
    word: "dance",
    meaning: "رقص",
    lesson: 46,
    lessonLabel: "درس 46 — هنرها"
  },
  {
    word: "cinema",
    meaning: "سینما",
    lesson: 46,
    lessonLabel: "درس 46 — هنرها"
  },
  {
    word: "ballet",
    meaning: "باله",
    lesson: 46,
    lessonLabel: "درس 46 — هنرها"
  },
  {
    word: "opera",
    meaning: "اپرا",
    lesson: 46,
    lessonLabel: "درس 46 — هنرها"
  },
  {
    word: "concerts: classical/rock/country and western",
    meaning: "کنسرت‌ها: کلاسیک/راک/کانتری و وسترن",
    lesson: 46,
    lessonLabel: "درس 46 — هنرها"
  },
  {
    word: "PERFORMING ARTS",
    meaning: "هنرهای نمایشی",
    lesson: 46,
    lessonLabel: "درس 46 — هنرها"
  },
  {
    word: "FINE ART(s)",
    meaning: "هنرهای زیبا",
    lesson: 46,
    lessonLabel: "درس 46 — هنرها"
  },
  {
    word: "sculpture",
    meaning: "مجسمه‌سازی/مجسمه",
    lesson: 46,
    lessonLabel: "درس 46 — هنرها"
  },
  {
    word: "painting",
    meaning: "نقاشی",
    lesson: 46,
    lessonLabel: "درس 46 — هنرها"
  },
  {
    word: "architecture",
    meaning: "معماری",
    lesson: 46,
    lessonLabel: "درس 46 — هنرها"
  },
  {
    word: "ceramics (making pots, bowls, etc.)",
    meaning: "سرامیک (ساختن ظرف، کاسه و غیره)",
    lesson: 46,
    lessonLabel: "درس 46 — هنرها"
  },
  {
    word: "the arts",
    meaning: "هنرها",
    lesson: 46,
    lessonLabel: "درس 46 — هنرها"
  },
  {
    word: "art",
    meaning: "هنر",
    lesson: 46,
    lessonLabel: "درس 46 — هنرها"
  },
  {
    word: "fine art",
    meaning: "هنرهای زیبا",
    lesson: 46,
    lessonLabel: "درس 46 — هنرها"
  },
  {
    word: "arts page",
    meaning: "صفحهٔ هنر (روزنامه)",
    lesson: 46,
    lessonLabel: "درس 46 — هنرها"
  },
  {
    word: "art lover",
    meaning: "دوستدار/عاشق هنر",
    lesson: 46,
    lessonLabel: "درس 46 — هنرها"
  },
  {
    word: "the art of poetry",
    meaning: "هنر شعر",
    lesson: 46,
    lessonLabel: "درس 46 — هنرها"
  },
  {
    word: "modern ballet",
    meaning: "بالهٔ مدرن",
    lesson: 46,
    lessonLabel: "درس 46 — هنرها"
  },
  {
    word: "novel",
    meaning: "رمان",
    lesson: 46,
    pos: "n.",
    lessonLabel: "درس 46 — هنرها"
  },
  {
    word: "short story",
    meaning: "داستان کوتاه",
    lesson: 46,
    lessonLabel: "درس 46 — هنرها"
  },
  {
    word: "sets",
    meaning: "دکور صحنه",
    lesson: 46,
    lessonLabel: "درس 46 — هنرها"
  },
  {
    word: "costumes",
    meaning: "لباس‌های نمایش",
    lesson: 46,
    lessonLabel: "درس 46 — هنرها"
  },
  {
    word: "cast",
    meaning: "همهٔ بازیگران",
    lesson: 46,
    lessonLabel: "درس 46 — هنرها"
  },
  {
    word: "direction",
    meaning: "کارگردانی",
    lesson: 46,
    lessonLabel: "درس 46 — هنرها"
  },
  {
    word: "performance",
    meaning: "اجرا/نمایش",
    lesson: 46,
    lessonLabel: "درس 46 — هنرها"
  },
  {
    word: "rave reviews",
    meaning: "نقدهای بسیار تحسین‌برانگیز",
    lesson: 46,
    lessonLabel: "درس 46 — هنرها"
  },
  {
    word: "exhibition",
    meaning: "نمایشگاه",
    lesson: 46,
    lessonLabel: "درس 46 — هنرها"
  },
  {
    word: "publish",
    meaning: "انتشار دادن",
    lesson: 46,
    pos: "v.",
    lessonLabel: "درس 46 — هنرها"
  },
  {
    word: "new edition",
    meaning: "چاپ/ویراست جدید",
    lesson: 46,
    lessonLabel: "درس 46 — هنرها"
  },
  {
    word: "works",
    meaning: "آثار",
    lesson: 46,
    lessonLabel: "درس 46 — هنرها"
  },
  {
    word: "performance of",
    meaning: "اجرای (یک اثر)",
    lesson: 46,
    lessonLabel: "درس 46 — هنرها"
  },
  {
    word: "showing",
    meaning: "اکران/نمایش دادن",
    lesson: 46,
    lessonLabel: "درس 46 — هنرها"
  },
  {
    word: "What's on",
    meaning: "چه چیزی روی صحنه/در اکران است",
    lesson: 46,
    lessonLabel: "درس 46 — هنرها"
  },
  {
    word: "album",
    meaning: "آلبوم (ضبط مجموعه‌ای از ترانه‌ها/قطعات روی CD یا کاست)",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — موسیقی"
  },
  {
    word: "hit singles",
    meaning: "تک‌آهنگ‌های پرفروش",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — موسیقی"
  },
  {
    word: "lead singer",
    meaning: "خوانندهٔ اصلی گروه",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — موسیقی"
  },
  {
    word: "backing",
    meaning: "همراهی (موسیقی/آواز پس‌زمینه)",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — موسیقی"
  },
  {
    word: "piano music",
    meaning: "موسیقی پیانو",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — موسیقی"
  },
  {
    word: "guitar music",
    meaning: "موسیقی گیتار",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — موسیقی"
  },
  {
    word: "big band music",
    meaning: "موسیقی بیگ‌بند",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — موسیقی"
  },
  {
    word: "instrumental music",
    meaning: "موسیقی بی‌کلام",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — موسیقی"
  },
  {
    word: "electronic music",
    meaning: "موسیقی الکترونیک",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — موسیقی"
  },
  {
    word: "orchestral music",
    meaning: "موسیقی ارکسترال",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — موسیقی"
  },
  {
    word: "chamber music",
    meaning: "موسیقی مجلسی (کامره‌ای)",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — موسیقی"
  },
  {
    word: "country and western",
    meaning: "موسیقی کانتری و وسترن",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — موسیقی"
  },
  {
    word: "blues",
    meaning: "موسیقی بلوز",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — موسیقی"
  },
  {
    word: "classical",
    meaning: "کلاسیک",
    lesson: 47,
    pos: "adj.",
    lessonLabel: "درس 47 — موسیقی"
  },
  {
    word: "heavy metal",
    meaning: "هوی متال",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — موسیقی"
  },
  {
    word: "folk",
    meaning: "موسیقی فولک (سنتی)",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — موسیقی"
  },
  {
    word: "jazz",
    meaning: "جاز",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — موسیقی"
  },
  {
    word: "soul",
    meaning: "موسیقی سول",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — موسیقی"
  },
  {
    word: "pop",
    meaning: "موسیقی پاپ",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — موسیقی"
  },
  {
    word: "background music",
    meaning: "موسیقی پس‌زمینه",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — موسیقی"
  },
  {
    word: "dance music",
    meaning: "موسیقی رقص",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — موسیقی"
  },
  {
    word: "soundtrack",
    meaning: "موسیقی متن فیلم",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — موسیقی"
  },
  {
    word: "muzak",
    meaning: "موسیقی ملایم ضبط‌شده در اماکن عمومی",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — موسیقی"
  },
  {
    word: "canned music",
    meaning: "موسیقی ضبط‌شده (کن‌د)",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — موسیقی"
  },
  {
    word: "piped music",
    meaning: "موسیقی لوله‌کشی‌شده (پخش‌شده)",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — موسیقی"
  },
  {
    word: "contemporary",
    meaning: "معاصر",
    lesson: 47,
    pos: "adj.",
    lessonLabel: "درس 47 — موسیقی"
  },
  {
    word: "modern",
    meaning: "مدرن",
    lesson: 47,
    pos: "adj.",
    lessonLabel: "درس 47 — موسیقی"
  },
  {
    word: "live",
    meaning: "زنده (اجرای زنده)",
    lesson: 47,
    pos: "adj.",
    lessonLabel: "درس 47 — موسیقی"
  },
  {
    word: "recorded",
    meaning: "ضبط‌شده",
    lesson: 47,
    pos: "adj.",
    lessonLabel: "درس 47 — موسیقی"
  },
  {
    word: "deafening",
    meaning: "گوش‌خراش",
    lesson: 47,
    pos: "adj.",
    lessonLabel: "درس 47 — موسیقی"
  },
  {
    word: "loud",
    meaning: "بلند",
    lesson: 47,
    pos: "adj.",
    lessonLabel: "درس 47 — موسیقی"
  },
  {
    word: "rousing",
    meaning: "هیجان‌انگیز",
    lesson: 47,
    pos: "adj.",
    lessonLabel: "درس 47 — موسیقی"
  },
  {
    word: "soft",
    meaning: "ملایم",
    lesson: 47,
    pos: "adj.",
    lessonLabel: "درس 47 — موسیقی"
  },
  {
    word: "sweet",
    meaning: "دلنشین",
    lesson: 47,
    pos: "adj.",
    lessonLabel: "درس 47 — موسیقی"
  },
  {
    word: "innovative",
    meaning: "نوآورانه",
    lesson: 47,
    pos: "adj.",
    lessonLabel: "درس 47 — موسیقی"
  },
  {
    word: "tuneless",
    meaning: "بی‌آهنگ",
    lesson: 47,
    pos: "adj.",
    lessonLabel: "درس 47 — موسیقی"
  },
  {
    word: "discordant",
    meaning: "ناهماهنگ",
    lesson: 47,
    pos: "adj.",
    lessonLabel: "درس 47 — موسیقی"
  },
  {
    word: "tuneful",
    meaning: "آهنگین",
    lesson: 47,
    pos: "adj.",
    lessonLabel: "درس 47 — موسیقی"
  },
  {
    word: "soothing",
    meaning: "آرامش‌بخش",
    lesson: 47,
    pos: "adj.",
    lessonLabel: "درس 47 — موسیقی"
  },
  {
    word: "relaxing",
    meaning: "آرام‌کننده",
    lesson: 47,
    pos: "adj.",
    lessonLabel: "درس 47 — موسیقی"
  },
  {
    word: "peaceful",
    meaning: "آرام",
    lesson: 47,
    pos: "adj.",
    lessonLabel: "درس 47 — موسیقی"
  },
  {
    word: "play the piano",
    meaning: "پیانو نواختن",
    lesson: 47,
    pos: "v.",
    lessonLabel: "درس 47 — موسیقی"
  },
  {
    word: "read music",
    meaning: "نت‌خوانی کردن",
    lesson: 47,
    pos: "v.",
    lessonLabel: "درس 47 — موسیقی"
  },
  {
    word: "got a good ear",
    meaning: "گوش موسیقی خوبی داشتن",
    lesson: 47,
    pos: "phr.",
    lessonLabel: "درس 47 — موسیقی"
  },
  {
    word: "pick out",
    meaning: "(ملودی را) پیدا کردن و نواختن",
    lesson: 47,
    pos: "v.",
    lessonLabel: "درس 47 — موسیقی"
  },
  {
    word: "practise",
    meaning: "تمرین کردن",
    lesson: 47,
    pos: "v.",
    lessonLabel: "درس 47 — موسیقی"
  },
  {
    word: "natural",
    meaning: "استعداد ذاتی",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — موسیقی"
  },
  {
    word: "play by ear",
    meaning: "بدون نت نواختن (با گوش)",
    lesson: 47,
    pos: "phr.",
    lessonLabel: "درس 47 — موسیقی"
  },
  {
    word: "musical",
    meaning: "موسیقی‌دون / بااستعداد در موسیقی",
    lesson: 47,
    pos: "adj.",
    lessonLabel: "درس 47 — موسیقی"
  },
  {
    word: "wrote an arrangement of / arranged",
    meaning: "تنظیم کردن",
    lesson: 47,
    pos: "v.",
    lessonLabel: "درس 47 — موسیقی"
  },
  {
    word: "play a tune",
    meaning: "آهنگی را نواختن",
    lesson: 47,
    pos: "phr.",
    lessonLabel: "درس 47 — موسیقی"
  },
  {
    word: "whistle",
    meaning: "سوت زدن",
    lesson: 47,
    pos: "v.",
    lessonLabel: "درس 47 — موسیقی"
  },
  {
    word: "hum",
    meaning: "زمزمه کردن (با لب بسته)",
    lesson: 47,
    pos: "v.",
    lessonLabel: "درس 47 — موسیقی"
  },
  {
    word: "make music",
    meaning: "موسیقی ساختن/نواختن",
    lesson: 47,
    pos: "phr.",
    lessonLabel: "درس 47 — موسیقی"
  },
  {
    word: "chords",
    meaning: "آکوردها",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — موسیقی"
  },
  {
    word: "scales",
    meaning: "گام‌ها",
    lesson: 47,
    pos: "n.",
    lessonLabel: "درس 47 — موسیقی"
  },
  {
    word: "beef",
    meaning: "گوشت گاو",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "lamb",
    meaning: "گوشت بره",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "mutton",
    meaning: "گوشت گوسفند",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "venison",
    meaning: "گوشت آهو",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "veal",
    meaning: "گوشت گوساله",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "pork",
    meaning: "گوشت خوک",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "ham",
    meaning: "ژامبون",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "bacon",
    meaning: "بیکن (گوشت خوک نمک‌سپاری‌شده)",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "chicken",
    meaning: "گوشت مرغ / جوجه",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "turkey",
    meaning: "گوشت بوقلمون / بوقلمون",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "duck",
    meaning: "گوشت اردک / اردک",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "poultry",
    meaning: "طیور (گوشت پرندگان اهلی)",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "cod",
    meaning: "ماهی روغن پشمک (کاد)",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "hake",
    meaning: "ماهی هاک",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "plaice",
    meaning: "ماهی پلیس (نوع ماهی پهن)",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "mackerel",
    meaning: "ماهی اسکمبرا",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "herring",
    meaning: "ماهی شاهماهی",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "sardine",
    meaning: "ماهی ساردین (ساردین)",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "trout",
    meaning: "ماهی قزل‌آلا",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "salmon",
    meaning: "ماهی سالمون (آزاد)",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "prawns",
    meaning: "میگوی درشت",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "shrimps",
    meaning: "میگوی ریز",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "crab",
    meaning: "خرچنگ",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "lobster",
    meaning: "خرچنگ دریایی (لابستر)",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "crayfish",
    meaning: "خرچنگ رودخانه‌ای",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "squid",
    meaning: "ماهی مرکب (کلمار)",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "cockles",
    meaning: "صدف خوراکی (کاکل)",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "mussels",
    meaning: "صدف دوکفه‌ای خوراکی",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "oysters",
    meaning: "صدف صدفی (اوستر)",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "cabbage",
    meaning: "کلم",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "cauliflower",
    meaning: "گل کلم",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "broccoli",
    meaning: "کلم بروکلی",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "spinach",
    meaning: "اسفناج",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "cucumber",
    meaning: "خیار",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "leeks",
    meaning: "پیازچه (تره‌فرنگی)",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "mushrooms",
    meaning: "قارچ خوراکی",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "courgettes",
    meaning: "کدو سبز",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "zucchini",
    meaning: "کدو سبز (انگلیسی آمریکایی)",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "aubergines",
    meaning: "بادمجان",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "egg plants",
    meaning: "بادمجان (انگلیسی آمریکایی)",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "curry",
    meaning: "غذای کاری / مخلوط ادویه کاری",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "cumin",
    meaning: "زیره",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "cardamom",
    meaning: "هل",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "coriander",
    meaning: "گشنیز",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "paprika",
    meaning: "فلفل قرمز پاپریکا",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "turmeric",
    meaning: "زردچوبه",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "ginger",
    meaning: "زنجبیل",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "cinnamon",
    meaning: "دارچین",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "nutmeg",
    meaning: "جوز هندی",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "parsley",
    meaning: "جعفری",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "chives",
    meaning: "پیازچه خوراکی (پیاز تره)",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "rosemary",
    meaning: "رزماری (اکلیل کوهی)",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "tarragon",
    meaning: "ترخون",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "thyme",
    meaning: "آویشن",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "oregano",
    meaning: "پونه کوهی (اورگانو)",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "sage",
    meaning: "مریم‌گلی",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "sweet",
    meaning: "شیرین",
    lesson: 48,
    pos: "adj.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "bitter",
    meaning: "تلخ",
    lesson: 48,
    pos: "adj.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "sour",
    meaning: "ترش",
    lesson: 48,
    pos: "adj.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "hot",
    meaning: "تند (فلفلی)",
    lesson: 48,
    pos: "adj.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "spicy",
    meaning: "ادویه‌دار / تند",
    lesson: 48,
    pos: "adj.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "mild",
    meaning: "ملایم (غیرتند)",
    lesson: 48,
    pos: "adj.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "bland",
    meaning: "بی‌مزه (نسبتاً منفی)",
    lesson: 48,
    pos: "adj.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "salty",
    meaning: "شور",
    lesson: 48,
    pos: "adj.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "sugary",
    meaning: "پرشکر / شیرین",
    lesson: 48,
    pos: "adj.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "sickly",
    meaning: "گندیده‌طعم (از شیرینی زیاد)",
    lesson: 48,
    pos: "adj.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "savoury",
    meaning: "خوش‌طعم و نمکی",
    lesson: 48,
    pos: "adj.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "tasty",
    meaning: "خوشمزه",
    lesson: 48,
    pos: "adj.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "tasteless",
    meaning: "بی‌مزه",
    lesson: 48,
    pos: "adj.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "delicious",
    meaning: "لذیذ / خیلی خوشمزه",
    lesson: 48,
    pos: "adj.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "greasy",
    meaning: "چرب",
    lesson: 48,
    pos: "adj.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "oily",
    meaning: "روغنی",
    lesson: 48,
    pos: "adj.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "over-cooked/overdone",
    meaning: "زیاد پخته / له‌شده",
    lesson: 48,
    pos: "adj.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "under-cooked/underdone",
    meaning: "کم‌پخته / خام",
    lesson: 48,
    pos: "adj.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "stodgy",
    meaning: "سنگین و هضم‌ناپذیر",
    lesson: 48,
    pos: "adj.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "done to a turn",
    meaning: "درست و حسابی پخته (بی‌نقص)",
    lesson: 48,
    pos: "phr.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "more-ish",
    meaning: "خوشمزه به‌طوری که آدم بخواهد باز هم بخورد",
    lesson: 48,
    pos: "adj.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "boil",
    meaning: "جوشاندن / پختن در آب جوش",
    lesson: 48,
    pos: "v.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "fry",
    meaning: "سرخ کردن",
    lesson: 48,
    pos: "v.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "bake",
    meaning: "پختن (در فر)",
    lesson: 48,
    pos: "v.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "roast",
    meaning: "برشته کردن / کباب کردن در فر",
    lesson: 48,
    pos: "v.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "grill",
    meaning: "گریل کردن",
    lesson: 48,
    pos: "v.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "stir-fry",
    meaning: "تفت‌دادن سریع",
    lesson: 48,
    pos: "v.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "barbecued",
    meaning: "کباب‌شده روی زغال",
    lesson: 48,
    pos: "adj.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "seasoned",
    meaning: "چاشنی‌زده‌شده",
    lesson: 48,
    pos: "adj.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "starter",
    meaning: "پیش‌غذا",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "main course",
    meaning: "غذای اصلی",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "dessert",
    meaning: "دسر",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "sweet/pudding/afters",
    meaning: "دسر (اصطلاح عامیانه)",
    lesson: 48,
    pos: "n.",
    lessonLabel: "درس 48 — غذا"
  },
  {
    word: "countries",
    meaning: "کشورها",
    lesson: 49,
    lessonLabel: "درس 49 — محیط زیست"
  },
  {
    word: "countries which are in a plural form",
    meaning: "کشورهایی که شکل جمع دارند",
    lesson: 49,
    lessonLabel: "درس 49 — محیط زیست"
  },
  {
    word: "countries when limited by time",
    meaning: "کشورها وقتی با زمان محدود می‌شوند",
    lesson: 49,
    lessonLabel: "درس 49 — محیط زیست"
  },
  {
    word: "individual mountains",
    meaning: "کوه‌های منفرد",
    lesson: 49,
    lessonLabel: "درس 49 — محیط زیست"
  },
  {
    word: "mountain chains",
    meaning: "رشته‌کوه‌ها",
    lesson: 49,
    lessonLabel: "درس 49 — محیط زیست"
  },
  {
    word: "islands",
    meaning: "جزیره‌ها",
    lesson: 49,
    lessonLabel: "درس 49 — محیط زیست"
  },
  {
    word: "groups of islands",
    meaning: "گروه‌های جزیره‌ای",
    lesson: 49,
    lessonLabel: "درس 49 — محیط زیست"
  },
  {
    word: "rivers",
    meaning: "رودها",
    lesson: 49,
    lessonLabel: "درس 49 — محیط زیست"
  },
  {
    word: "oceans",
    meaning: "اقیانوس‌ها",
    lesson: 49,
    lessonLabel: "درس 49 — محیط زیست"
  },
  {
    word: "seas",
    meaning: "دریاها",
    lesson: 49,
    lessonLabel: "درس 49 — محیط زیست"
  },
  {
    word: "gulfs, bays and straits",
    meaning: "خلیج‌ها، خلیج‌های کوچک و تنگه‌ها",
    lesson: 49,
    lessonLabel: "درس 49 — محیط زیست"
  },
  {
    word: "lakes",
    meaning: "دریاچه‌ها",
    lesson: 49,
    lessonLabel: "درس 49 — محیط زیست"
  },
  {
    word: "currents",
    meaning: "جریان‌های آبی",
    lesson: 49,
    lessonLabel: "درس 49 — محیط زیست"
  },
  {
    word: "Iceland",
    meaning: "ایسلند",
    lesson: 49,
    lessonLabel: "درس 49 — محیط زیست"
  },
  {
    word: "landscape",
    meaning: "چشم‌انداز",
    lesson: 49,
    lessonLabel: "درس 49 — محیط زیست"
  },
  {
    word: "barren plains",
    meaning: "دشت‌های لم‌یزرع",
    lesson: 49,
    lessonLabel: "درس 49 — محیط زیست"
  },
  {
    word: "mountains",
    meaning: "کوه‌ها",
    lesson: 49,
    pos: "n.",
    lessonLabel: "درس 49 — محیط زیست"
  },
  {
    word: "ice fields",
    meaning: "میدان‌های یخی",
    lesson: 49,
    lessonLabel: "درس 49 — محیط زیست"
  },
  {
    word: "active volcanoes",
    meaning: "آتشفشان‌های فعال",
    lesson: 49,
    lessonLabel: "درس 49 — محیط زیست"
  },
  {
    word: "thermal springs",
    meaning: "چشمه‌های آب گرم",
    lesson: 49,
    pos: "adj.",
    lessonLabel: "درس 49 — محیط زیست"
  },
  {
    word: "geysers",
    meaning: "فوران‌آب‌ها (گیسرها)",
    lesson: 49,
    lessonLabel: "درس 49 — محیط زیست"
  },
  {
    word: "crops",
    meaning: "محصولات کشاورزی",
    lesson: 49,
    lessonLabel: "درس 49 — محیط زیست"
  },
  {
    word: "economy",
    meaning: "اقتصاد",
    lesson: 49,
    lessonLabel: "درس 49 — محیط زیست"
  },
  {
    word: "Population",
    meaning: "جمعیت",
    lesson: 49,
    lessonLabel: "درس 49 — محیط زیست"
  },
  {
    word: "Capital",
    meaning: "پایتخت",
    lesson: 49,
    lessonLabel: "درس 49 — محیط زیست"
  },
  {
    word: "coast",
    meaning: "ساحل (کرانه دریا)",
    lesson: 49,
    pos: "n.",
    lessonLabel: "درس 49 — محیط زیست"
  },
  {
    word: "shore",
    meaning: "کرانه، ساحل",
    lesson: 49,
    pos: "n.",
    lessonLabel: "درس 49 — محیط زیست"
  },
  {
    word: "beach",
    meaning: "ساحل شنی",
    lesson: 49,
    pos: "n.",
    lessonLabel: "درس 49 — محیط زیست"
  },
  {
    word: "cliff",
    meaning: "صخره پرتگاهی",
    lesson: 49,
    pos: "n.",
    lessonLabel: "درس 49 — محیط زیست"
  },
  {
    word: "cape",
    meaning: "دماغه",
    lesson: 49,
    pos: "n.",
    lessonLabel: "درس 49 — محیط زیست"
  },
  {
    word: "peninsula",
    meaning: "شبه‌جزیره",
    lesson: 49,
    pos: "n.",
    lessonLabel: "درس 49 — محیط زیست"
  },
  {
    word: "cove",
    meaning: "خلیج کوچک",
    lesson: 49,
    pos: "n.",
    lessonLabel: "درس 49 — محیط زیست"
  },
  {
    word: "bay",
    meaning: "خلیج",
    lesson: 49,
    pos: "n.",
    lessonLabel: "درس 49 — محیط زیست"
  },
  {
    word: "gulf",
    meaning: "خلیج بزرگ",
    lesson: 49,
    pos: "n.",
    lessonLabel: "درس 49 — محیط زیست"
  },
  {
    word: "source",
    meaning: "سرچشمه",
    lesson: 49,
    pos: "n.",
    lessonLabel: "درس 49 — محیط زیست"
  },
  {
    word: "tributary",
    meaning: "شاخه‌ی رود",
    lesson: 49,
    pos: "n.",
    lessonLabel: "درس 49 — محیط زیست"
  },
  {
    word: "waterfall",
    meaning: "آبشار",
    lesson: 49,
    pos: "n.",
    lessonLabel: "درس 49 — محیط زیست"
  },
  {
    word: "mouth",
    meaning: "مصب رود",
    lesson: 49,
    pos: "n.",
    lessonLabel: "درس 49 — محیط زیست"
  },
  {
    word: "valley",
    meaning: "دره، درّ",
    lesson: 49,
    pos: "n.",
    lessonLabel: "درس 49 — محیط زیست"
  },
  {
    word: "gorge",
    meaning: "تنگه، دره تنگ",
    lesson: 49,
    pos: "n.",
    lessonLabel: "درس 49 — محیط زیست"
  },
  {
    word: "delta",
    meaning: "دلتا",
    lesson: 49,
    pos: "n.",
    lessonLabel: "درس 49 — محیط زیست"
  },
  {
    word: "brook",
    meaning: "جویبار",
    lesson: 49,
    pos: "n.",
    lessonLabel: "درس 49 — محیط زیست"
  },
  {
    word: "stream",
    meaning: "جریان آب، نهر",
    lesson: 49,
    pos: "n.",
    lessonLabel: "درس 49 — محیط زیست"
  },
  {
    word: "estuary",
    meaning: "مصب پهناور رود",
    lesson: 49,
    pos: "n.",
    lessonLabel: "درس 49 — محیط زیست"
  },
  {
    word: "foot",
    meaning: "پایه (کوه)",
    lesson: 49,
    pos: "n.",
    lessonLabel: "درس 49 — محیط زیست"
  },
  {
    word: "ridge",
    meaning: "خط‌الرأس",
    lesson: 49,
    pos: "n.",
    lessonLabel: "درس 49 — محیط زیست"
  },
  {
    word: "peak",
    meaning: "قله",
    lesson: 49,
    pos: "n.",
    lessonLabel: "درس 49 — محیط زیست"
  },
  {
    word: "summit",
    meaning: "قله‌ی بلندتریک",
    lesson: 49,
    pos: "n.",
    lessonLabel: "درس 49 — محیط زیست"
  },
  {
    word: "glacier",
    meaning: "یخچال طبیعی",
    lesson: 49,
    pos: "n.",
    lessonLabel: "درس 49 — محیط زیست"
  },
  {
    word: "polluted",
    meaning: "آلوده",
    lesson: 49,
    pos: "adj.",
    lessonLabel: "درس 49 — محیط زیست"
  },
  {
    word: "over-populated",
    meaning: "پرجمعیت بیش از حد",
    lesson: 49,
    pos: "adj.",
    lessonLabel: "درس 49 — محیط زیست"
  },
  {
    word: "heavily industrialised regions",
    meaning: "مناطق به‌شدت صنعتی‌شده",
    lesson: 49,
    lessonLabel: "درس 49 — محیط زیست"
  },
  {
    word: "pollution",
    meaning: "آلودگی",
    lesson: 49,
    lessonLabel: "درس 49 — محیط زیست"
  },
  {
    word: "Overfishing",
    meaning: "صید بی‌رویه ماهی",
    lesson: 49,
    lessonLabel: "درس 49 — محیط زیست"
  },
  {
    word: "depleted",
    meaning: "کاهش داده",
    lesson: 49,
    pos: "v.",
    lessonLabel: "درس 49 — محیط زیست"
  },
  {
    word: "destruction of the ozone layer",
    meaning: "نابودی لایه ازن",
    lesson: 49,
    lessonLabel: "درس 49 — محیط زیست"
  },
  {
    word: "greenhouse effect",
    meaning: "اثر گلخانه‌ای",
    lesson: 49,
    lessonLabel: "درس 49 — محیط زیست"
  },
  {
    word: "destruction of the rainforests",
    meaning: "نابودی جنگل‌های بارانی",
    lesson: 49,
    lessonLabel: "درس 49 — محیط زیست"
  },
  {
    word: "Battery farming",
    meaning: "دامداری صنعتی (قفس‌ای)",
    lesson: 49,
    lessonLabel: "درس 49 — محیط زیست"
  },
  {
    word: "animals in crowded and unnatural conditions",
    meaning: "جانوران در شرایط شلوغ و غیرطبیعی",
    lesson: 49,
    lessonLabel: "درس 49 — محیط زیست"
  },
  {
    word: "city",
    meaning: "شهر بزرگ",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "town",
    meaning: "شهرک / شهر",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "metropolis",
    meaning: "کلان‌شهر",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "population",
    meaning: "جمعیت",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "business and shopping centre",
    meaning: "مرکز تجاری و خرید",
    lesson: 50,
    pos: "phr.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "within walking distance",
    meaning: "در فاصلهٔ پیاده‌روی",
    lesson: 50,
    pos: "phr.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "one-way traffic system",
    meaning: "سیستم ترافیک یک‌طرفه",
    lesson: 50,
    pos: "phr.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "steeple",
    meaning: "برج ناقه / سر برج کلیسا",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "bell-tower",
    meaning: "برج ناقوس",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "besieged",
    meaning: "محاصره‌شده",
    lesson: 50,
    pos: "adj.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "cathedral",
    meaning: "کلیسای جامع",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "imposing",
    meaning: "با شکوه / مجلل",
    lesson: 50,
    pos: "adj.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "French Gothic style",
    meaning: "سبک گوتیک فرانسوی",
    lesson: 50,
    pos: "phr.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "market",
    meaning: "بازار",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "cater for",
    meaning: "خدمت رساندن به",
    lesson: 50,
    pos: "v.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "atmosphere",
    meaning: "فضا / حال‌وهوا",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "art gallery",
    meaning: "نگارخانه",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "well worth a visit",
    meaning: "کاملاً ارزش بازدید دارد",
    lesson: 50,
    pos: "phr.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "mounts exhibitions",
    meaning: "برگزار می‌کند نمایشگاه را",
    lesson: 50,
    pos: "phr.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "contemporary artists",
    meaning: "هنرمندان معاصر",
    lesson: 50,
    pos: "phr.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "residential districts",
    meaning: "محله‌های مسکونی",
    lesson: 50,
    pos: "phr.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "harbour",
    meaning: "بندر / لنگرگاه",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "outskirts",
    meaning: "حومه / اطراف شهر",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "facilities",
    meaning: "تسهیلات / امکانات",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "swimming pool",
    meaning: "استخر",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "sports centre",
    meaning: "مرکز ورزشی",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "golf course",
    meaning: "زمین گلف",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "tennis courts",
    meaning: "زمین‌های تنیس",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "football pitch",
    meaning: "زمین فوتبال",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "skating rink",
    meaning: "پیست اسکیت",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "theatre",
    meaning: "تئاتر",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "opera house",
    meaning: "خانه اپرا",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "concert hall",
    meaning: "تالار کنسرت",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "radio station",
    meaning: "ایستگاه رادیو",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "school",
    meaning: "مدرسه",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "college",
    meaning: "دانشکده",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "university",
    meaning: "دانشگاه",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "library",
    meaning: "کتابخانه",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "adult education centre",
    meaning: "مرکز آموزش بزرگسالان",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "museum",
    meaning: "موزه",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "restaurant",
    meaning: "رستوران",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "nightclub",
    meaning: "شب‌نشینی / کلاب شبانه",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "take-away",
    meaning: "فروشگاه غذای بیرون‌بر",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "hotel",
    meaning: "هتل",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "B & B (bed and breakfast)",
    meaning: "پانسیون با صبحانه",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "youth hostel",
    meaning: "هتل جوانان",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "disco",
    meaning: "دیسکو",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "estate agency",
    meaning: "مؤسسه املاک",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "housing estate",
    meaning: "مجتمع مسکونی",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "bus service",
    meaning: "سرویس اتوبوس",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "taxi rank",
    meaning: "ایستگاه تاکسی",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "car hire",
    meaning: "کرایه خودرو",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "car park",
    meaning: "پارکینگ",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "parking meters",
    meaning: "پارک‌سنج‌ها",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "health centre",
    meaning: "مرکز بهداشتی",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "law courts",
    meaning: "دادگاه‌ها",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "registry office",
    meaning: "دفتر ثبت احوال",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "citizens' advice bureau",
    meaning: "دفتر مشاوره شهروندان",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "job centre",
    meaning: "مرکز اشتغال",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "bottle bank",
    meaning: "محل تحویل بطری بازیافتی",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "department store",
    meaning: "فروشگاه بزرگ / مغازه بزرگ",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "chemist's",
    meaning: "داروخانه",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "garden centre",
    meaning: "مرکز فروش گیاهان و وسایل باغ",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "police station",
    meaning: "کلانتری",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "Town or City Hall",
    meaning: "شهرداری / تالار شهر",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "suburbs",
    meaning: "حومه شهر",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "industrial estate",
    meaning: "منطقه صنعتی",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "traffic jams",
    meaning: "ترافیک / به‌بن‌بست ترافیکی",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "slums",
    meaning: "محله‌های فقیرنشین / زاغه‌ها",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "vandalism",
    meaning: "خرابکاری و تخریب اموال",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "overcrowding",
    meaning: "تراکم جمعیت بیش از حد",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "pollution",
    meaning: "آلودگی",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "crime",
    meaning: "جرم / جنایت",
    lesson: 50,
    pos: "n.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "picturesque",
    meaning: "بک‌منظره / خوش‌منظره",
    lesson: 50,
    pos: "adj.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "historic",
    meaning: "تاریخی",
    lesson: 50,
    pos: "adj.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "spacious",
    meaning: "جادار / وسیع",
    lesson: 50,
    pos: "adj.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "elegant",
    meaning: "شیک / باوقار",
    lesson: 50,
    pos: "adj.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "magnificent",
    meaning: "شکوه‌مند / باشکوه",
    lesson: 50,
    pos: "adj.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "atmospheric",
    meaning: "دارای فضای خاص",
    lesson: 50,
    pos: "adj.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "quaint",
    meaning: "قدیمی و جذاب / دم‌ومی‌طور",
    lesson: 50,
    pos: "adj.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "lively",
    meaning: "پررونق / پرجنب‌وجوش",
    lesson: 50,
    pos: "adj.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "hectic",
    meaning: "پرمشغله / شلوغ و پرتنش",
    lesson: 50,
    pos: "adj.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "deserted",
    meaning: "خالی / متروک",
    lesson: 50,
    pos: "adj.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "bustling",
    meaning: "پراجوش‌وخروش / شلوغ",
    lesson: 50,
    pos: "adj.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "crowded",
    meaning: "شلوغ / پرجمعیت",
    lesson: 50,
    pos: "adj.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "packed",
    meaning: "پر از جمعیت",
    lesson: 50,
    pos: "adj.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "filthy",
    meaning: "بسیار کثیف",
    lesson: 50,
    pos: "adj.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "run-down",
    meaning: "فرسوده / رو به زوال",
    lesson: 50,
    pos: "adj.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "shabby",
    meaning: "ژولیده / مستهلک",
    lesson: 50,
    pos: "adj.",
    lessonLabel: "درس 50 — شهرها"
  },
  {
    word: "beak",
    meaning: "منقار",
    lesson: 51,
    lessonLabel: "درس 51 — جهان طبیعی"
  },
  {
    word: "wing",
    meaning: "بال",
    lesson: 51,
    lessonLabel: "درس 51 — جهان طبیعی"
  },
  {
    word: "breast",
    meaning: "سینه (پرنده)",
    lesson: 51,
    lessonLabel: "درس 51 — جهان طبیعی"
  },
  {
    word: "nest",
    meaning: "لانه",
    lesson: 51,
    lessonLabel: "درس 51 — جهان طبیعی"
  },
  {
    word: "eggs",
    meaning: "تخم‌ها",
    lesson: 51,
    lessonLabel: "درس 51 — جهان طبیعی"
  },
  {
    word: "tail",
    meaning: "دُم",
    lesson: 51,
    lessonLabel: "درس 51 — جهان طبیعی"
  },
  {
    word: "scales",
    meaning: "پولک",
    lesson: 51,
    lessonLabel: "درس 51 — جهان طبیعی"
  },
  {
    word: "gills",
    meaning: "آبشش",
    lesson: 51,
    lessonLabel: "درس 51 — جهان طبیعی"
  },
  {
    word: "whiskers",
    meaning: "سبیل (حیوان)",
    lesson: 51,
    lessonLabel: "درس 51 — جهان طبیعی"
  },
  {
    word: "claws",
    meaning: "پنجه / چنگال",
    lesson: 51,
    lessonLabel: "درس 51 — جهان طبیعی"
  },
  {
    word: "paw",
    meaning: "کف پای حیوان",
    lesson: 51,
    lessonLabel: "درس 51 — جهان طبیعی"
  },
  {
    word: "mane",
    meaning: "یال",
    lesson: 51,
    lessonLabel: "درس 51 — جهان طبیعی"
  },
  {
    word: "hoof",
    meaning: "سم",
    lesson: 51,
    lessonLabel: "درس 51 — جهان طبیعی"
  },
  {
    word: "bud",
    meaning: "غنچه",
    lesson: 51,
    lessonLabel: "درس 51 — جهان طبیعی"
  },
  {
    word: "petals",
    meaning: "گلبرگ‌ها",
    lesson: 51,
    lessonLabel: "درس 51 — جهان طبیعی"
  },
  {
    word: "pollen",
    meaning: "گردهٔ گل",
    lesson: 51,
    lessonLabel: "درس 51 — جهان طبیعی"
  },
  {
    word: "thorn",
    meaning: "خار",
    lesson: 51,
    lessonLabel: "درس 51 — جهان طبیعی"
  },
  {
    word: "stalk",
    meaning: "ساقه",
    lesson: 51,
    lessonLabel: "درس 51 — جهان طبیعی"
  },
  {
    word: "leaf",
    meaning: "برگ",
    lesson: 51,
    lessonLabel: "درس 51 — جهان طبیعی"
  },
  {
    word: "leaves",
    meaning: "برگ‌ها",
    lesson: 51,
    lessonLabel: "درس 51 — جهان طبیعی"
  },
  {
    word: "twig",
    meaning: "شاخهٔ نازک",
    lesson: 51,
    lessonLabel: "درس 51 — جهان طبیعی"
  },
  {
    word: "branch",
    meaning: "شاخه",
    lesson: 51,
    lessonLabel: "درس 51 — جهان طبیعی"
  },
  {
    word: "bough",
    meaning: "شاخهٔ ضخیم",
    lesson: 51,
    lessonLabel: "درس 51 — جهان طبیعی"
  },
  {
    word: "trunk",
    meaning: "تنهٔ درخت",
    lesson: 51,
    lessonLabel: "درس 51 — جهان طبیعی"
  },
  {
    word: "bark",
    meaning: "پوست درخت",
    lesson: 51,
    lessonLabel: "درس 51 — جهان طبیعی"
  },
  {
    word: "roots",
    meaning: "ریشه‌ها",
    lesson: 51,
    lessonLabel: "درس 51 — جهان طبیعی"
  },
  {
    word: "frog",
    meaning: "قورباغه",
    lesson: 51,
    lessonLabel: "درس 51 — جهان طبیعی"
  },
  {
    word: "bee",
    meaning: "زنبور عسل",
    lesson: 51,
    lessonLabel: "درس 51 — جهان طبیعی"
  },
  {
    word: "seagull",
    meaning: "مرغ دریایی",
    lesson: 51,
    lessonLabel: "درس 51 — جهان طبیعی"
  },
  {
    word: "parrot",
    meaning: "طوطی",
    lesson: 51,
    lessonLabel: "درس 51 — جهان طبیعی"
  },
  {
    word: "shark",
    meaning: "کوسه",
    lesson: 51,
    lessonLabel: "درس 51 — جهان طبیعی"
  },
  {
    word: "bat",
    meaning: "خفاش",
    lesson: 51,
    lessonLabel: "درس 51 — جهان طبیعی"
  },
  {
    word: "worm",
    meaning: "کرم",
    lesson: 51,
    lessonLabel: "درس 51 — جهان طبیعی"
  },
  {
    word: "dolphin",
    meaning: "دلفین",
    lesson: 51,
    lessonLabel: "درس 51 — جهان طبیعی"
  },
  {
    word: "snail",
    meaning: "حلزون",
    lesson: 51,
    lessonLabel: "درس 51 — جهان طبیعی"
  },
  {
    word: "crab",
    meaning: "خرچنگ",
    lesson: 51,
    lessonLabel: "درس 51 — جهان طبیعی"
  },
  {
    word: "pigeon",
    meaning: "کبوتر",
    lesson: 51,
    lessonLabel: "درس 51 — جهان طبیعی"
  },
  {
    word: "peacock",
    meaning: "طاووس",
    lesson: 51,
    lessonLabel: "درس 51 — جهان طبیعی"
  },
  {
    word: "seal",
    meaning: "فک (جانور)",
    lesson: 51,
    lessonLabel: "درس 51 — جهان طبیعی"
  },
  {
    word: "eagle",
    meaning: "عقاب",
    lesson: 51,
    lessonLabel: "درس 51 — جهان طبیعی"
  },
  {
    word: "hedgehog",
    meaning: "جوجه‌تیغی",
    lesson: 51,
    lessonLabel: "درس 51 — جهان طبیعی"
  },
  {
    word: "oak",
    meaning: "بلوط",
    lesson: 51,
    lessonLabel: "درس 51 — جهان طبیعی"
  },
  {
    word: "willow",
    meaning: "بید",
    lesson: 51,
    lessonLabel: "درس 51 — جهان طبیعی"
  },
  {
    word: "chestnut",
    meaning: "شاه‌بلوط",
    lesson: 51,
    lessonLabel: "درس 51 — جهان طبیعی"
  },
  {
    word: "fir",
    meaning: "نراد",
    lesson: 51,
    lessonLabel: "درس 51 — جهان طبیعی"
  },
  {
    word: "pine",
    meaning: "کاج",
    lesson: 51,
    lessonLabel: "درس 51 — جهان طبیعی"
  },
  {
    word: "flower/blossom",
    meaning: "گل دادن",
    lesson: 51,
    pos: "v.",
    lessonLabel: "درس 51 — جهان طبیعی"
  },
  {
    word: "pick",
    meaning: "چیدن (گل)",
    lesson: 51,
    pos: "v.",
    lessonLabel: "درس 51 — جهان طبیعی"
  },
  {
    word: "plant",
    meaning: "کاشتن",
    lesson: 51,
    pos: "v.",
    lessonLabel: "درس 51 — جهان طبیعی"
  },
  {
    word: "fertilise",
    meaning: "کود دادن",
    lesson: 51,
    pos: "v.",
    lessonLabel: "درس 51 — جهان طبیعی"
  },
  {
    word: "harvest",
    meaning: "درودو کردن، برداشت محصول",
    lesson: 51,
    pos: "v.",
    lessonLabel: "درس 51 — جهان طبیعی"
  },
  {
    word: "rash",
    meaning: "جوش پوستی",
    lesson: 53,
    pos: "n.",
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "bruise",
    meaning: "کبودی",
    lesson: 53,
    pos: "n.",
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "lump",
    meaning: "برجستگی/توده",
    lesson: 53,
    pos: "n.",
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "spots",
    meaning: "جاهای لک‌مانند روی پوست",
    lesson: 53,
    pos: "n.",
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "a black eye",
    meaning: "چشم سیاه‌شده",
    lesson: 53,
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "a cold",
    meaning: "سرماخوردگی",
    lesson: 53,
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "a cough",
    meaning: "سرفه",
    lesson: 53,
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "a sore throat",
    meaning: "گلودرد",
    lesson: 53,
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "a temperature",
    meaning: "تب (دمای بدن بالاتر از_normal)",
    lesson: 53,
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "a stomach ache",
    meaning: "درد معده",
    lesson: 53,
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "chest pains",
    meaning: "درد قفسه سینه",
    lesson: 53,
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "earache",
    meaning: "درد گوش",
    lesson: 53,
    pos: "n.",
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "a pain in my side",
    meaning: "درد پهلو",
    lesson: 53,
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "sickness and diarrhoea",
    meaning: "تهوع و اسهال",
    lesson: 53,
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "an upset stomach",
    meaning: "دل‌به‌هم‌ریختگی",
    lesson: 53,
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "sunburn",
    meaning: "آفتاب‌سوختگی",
    lesson: 53,
    pos: "n.",
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "painful joints",
    meaning: "مفاصل دردناک",
    lesson: 53,
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "blisters",
    meaning: "تاول",
    lesson: 53,
    pos: "n.",
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "feel sick",
    meaning: "حالت تهوع داشتن",
    lesson: 53,
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "dizzy",
    meaning: "دچار سرگیجه",
    lesson: 53,
    pos: "adj.",
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "breathless",
    meaning: "نفس‌نفس زدن، بی‌نفس",
    lesson: 53,
    pos: "adj.",
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "shivery",
    meaning: "لرزنده (یک‌سر سرد و یک‌سر گرم)",
    lesson: 53,
    pos: "adj.",
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "faint",
    meaning: "نزدیق به غش، سرگیجه",
    lesson: 53,
    pos: "adj.",
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "depressed",
    meaning: "افسرده",
    lesson: 53,
    pos: "adj.",
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "constipated",
    meaning: "دچار یبوست",
    lesson: 53,
    pos: "adj.",
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "tired",
    meaning: "خسته",
    lesson: 53,
    pos: "adj.",
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "lost my appetite",
    meaning: "اهتم غذا را از دست دادن",
    lesson: 53,
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "lost my voice",
    meaning: "صدا拉升 را از دست دادن",
    lesson: 53,
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "itch",
    meaning: "خاریدن، می‌خارد",
    lesson: 53,
    pos: "v.",
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "hurt",
    meaning: "درد کردن",
    lesson: 53,
    pos: "v.",
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "take your temperature",
    meaning: "تب گرفتن (اندازه‌گیری دمای بدن)",
    lesson: 53,
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "listen to your chest",
    meaning: "گوش دادن به قفسه سینه",
    lesson: 53,
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "examine",
    meaning: "معاینه کردن",
    lesson: 53,
    pos: "v.",
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "take your blood pressure",
    meaning: "فشار خون گرفتن",
    lesson: 53,
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "weigh and measure",
    meaning: "وزن و قد کردن",
    lesson: 53,
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "flu",
    meaning: "آنفولانزا",
    lesson: 53,
    pos: "n.",
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "chickenpox",
    meaning: "آبله مرغان",
    lesson: 53,
    pos: "n.",
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "mumps",
    meaning: "اکاف (بیماری)",
    lesson: 53,
    pos: "n.",
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "pneumonia",
    meaning: "ذات‌الریه",
    lesson: 53,
    pos: "n.",
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "rheumatism",
    meaning: "رماتیسم",
    lesson: 53,
    pos: "n.",
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "an ulcer",
    meaning: "زخم معده",
    lesson: 53,
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "a virus",
    meaning: "ویروس",
    lesson: 53,
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "a bug",
    meaning: "میکروب/بیماری مسری",
    lesson: 53,
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "something that's going round",
    meaning: "بیماری‌ای که در حال شیوع است",
    lesson: 53,
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "broken",
    meaning: "شکسته",
    lesson: 53,
    pos: "adj.",
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "sprained",
    meaning: "پیچ‌خورده",
    lesson: 53,
    pos: "adj.",
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "dislocated",
    meaning: "دررفته",
    lesson: 53,
    pos: "adj.",
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "pregnant",
    meaning: "باردار",
    lesson: 53,
    pos: "adj.",
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "a hypochondriac",
    meaning: "بیمار وهمی (کسی که فکر می‌کند مریض است)",
    lesson: 53,
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "lung cancer",
    meaning: "سرطان ریه",
    lesson: 53,
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "a heart attack",
    meaning: "حمله قلبی",
    lesson: 53,
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "a brain haemorrhage",
    meaning: "خونریزی مغزی",
    lesson: 53,
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "AIDS",
    meaning: "ایدز",
    lesson: 53,
    pos: "n.",
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "tablet",
    meaning: "قرص",
    lesson: 53,
    pos: "n.",
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "medicine",
    meaning: "دارو (مایع)",
    lesson: 53,
    pos: "n.",
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "ointment",
    meaning: "پماد",
    lesson: 53,
    pos: "n.",
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "suncream",
    meaning: "کرم ضدآفتاب",
    lesson: 53,
    pos: "n.",
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "bandage",
    meaning: "بانداژ/پانسمان",
    lesson: 53,
    pos: "n.",
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "injection",
    meaning: "تزریق/آمپول",
    lesson: 53,
    pos: "n.",
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "surgeon",
    meaning: "جراح",
    lesson: 53,
    pos: "n.",
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "operation",
    meaning: "عمل جراحی",
    lesson: 53,
    pos: "n.",
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "plaster",
    meaning: "گچ",
    lesson: 53,
    pos: "n.",
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "mend",
    meaning: "جوش خوردن (استخوان)",
    lesson: 53,
    pos: "v.",
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "bed rest",
    meaning: "استراحت مطلق در بستر",
    lesson: 53,
    pos: "n.",
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "health insurance",
    meaning: "بیمه درمانی",
    lesson: 53,
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "medication",
    meaning: "دارو",
    lesson: 53,
    pos: "n.",
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "allergic",
    meaning: "حساسیت‌دار (آلرژیک)",
    lesson: 53,
    pos: "adj.",
    lessonLabel: "درس 53 — سلامتی و پزشکی"
  },
  {
    word: "sports car",
    meaning: "خودروی اسپرت",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "estate car",
    meaning: "خودروی استیشن (کومی)",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "bus",
    meaning: "اتوبوس",
    lesson: 54,
    pos: "n.",
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "coach",
    meaning: "اتوبوس بین‌شهری",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "tram",
    meaning: "تراموا",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "van",
    meaning: "ون",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "lorry",
    meaning: "کامیون",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "boot",
    meaning: "صندوق عقب خودرو",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "engine",
    meaning: "موتور",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "gears",
    meaning: "دنده‌ها",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "steering-wheel",
    meaning: "فرمان",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "brakes",
    meaning: "ترمزها",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "tyres",
    meaning: "لاستیک‌ها",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "driver",
    meaning: "راننده",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "mechanic",
    meaning: "مکانیک",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "chauffeur",
    meaning: "راننده مخصوص",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "bus-conductor",
    meaning: "بیلانس‌دار اتوبوس",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "petrol station",
    meaning: "جایگاه سوخت",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "garage",
    meaning: "تعمیرگاه",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "service station",
    meaning: "ایستگاه خدمات",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "passenger train",
    meaning: "قطار مسافری",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "freight train",
    meaning: "قطار باری",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "local train",
    meaning: "قطار محلی",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "express",
    meaning: "قطار سریع‌السیر",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "sleeping-car",
    meaning: "واگن خواب",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "buffet",
    meaning: "بوفه قطار",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "restaurant-car",
    meaning: "واگن رستوران",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "compartment",
    meaning: "کوپه",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "engine-driver",
    meaning: "لکوموتیو‌ران",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "ticket collector",
    meaning: "کنترل‌کننده بلیط",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "guard",
    meaning: "سرموزر",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "porter",
    meaning: "باربر",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "waiting-room",
    meaning: "اتاق انتظار",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "ticket office",
    meaning: "بلیط‌فروشی",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "signal-box",
    meaning: "اتاقک راهنمایی و علائم راه‌آهن",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "fishing-/rowing-boat",
    meaning: "قایق ماهیگیری/قایق پارویی",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "liner",
    meaning: "کشتی اقیانوس‌پیما",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "ferry",
    meaning: "کشتی تفریحی/عبور و مرور",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "yacht",
    meaning: "قایق بادبانی تفریحی",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "engine-room",
    meaning: "اتاق موتور کشتی",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "deck",
    meaning: "عرشه",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "bridge",
    meaning: "پل فرمان کشتی",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "gangplank",
    meaning: "پلکه سوار شدن به کشتی",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "captain",
    meaning: "ناخدا",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "purser",
    meaning: "مفتش/افسر خدمات کشتی",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "docker",
    meaning: "کارگر بندرگاه",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "steward(ess)",
    meaning: "مهماندار",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "port",
    meaning: "بندر",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "buoy",
    meaning: "شناور (بوکه)",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "customs",
    meaning: "گمرک",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "light-house",
    meaning: "فانوس دریایی",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "docks",
    meaning: "اسکله‌ها",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "aeroplane",
    meaning: "هواپیما",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "jet",
    meaning: "هواپیمای جت",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "helicopter",
    meaning: "هلیکوپتر",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "supersonic aircraft",
    meaning: "هواپیمای مافوق صوت",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "cockpit",
    meaning: "کابین خلبان",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "nose",
    meaning: "دماغه/سوته هواپیما",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "tail",
    meaning: "دم هواپیما",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "wings",
    meaning: "بال‌ها",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "aisle",
    meaning: "راهرو",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "joystick",
    meaning: "اهرم فرمان هواپیما",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "pilot",
    meaning: "خلبان",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "ground staff",
    meaning: "کارکنان زمینی",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "steward",
    meaning: "مهماندار",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "cabin crew",
    meaning: "خدمه کابین",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "air traffic controller",
    meaning: "مراقب پرواز",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "duty-free shop",
    meaning: "فروشگاه معاف از عوارض",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "departure lounge",
    meaning: "سالن انتظار پرواز",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "runway",
    meaning: "باند فرودگاه",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "cabin",
    meaning: "کابین (اتاق خواب کشتی/هواپیما)",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "bunk",
    meaning: "تخت‌خواب دو طبقه کشتی",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "galley",
    meaning: "آشپزخانه کشتی",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "starboard",
    meaning: "سمت راست کشتی",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "crew",
    meaning: "خدمه کشتی",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "journey",
    meaning: "سفر (مسافت طولانی)",
    lesson: 54,
    pos: "n.",
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "trip",
    meaning: "سفر کوتاه",
    lesson: 54,
    pos: "n.",
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "travel",
    meaning: "سفر کردن/سفر (غیرقابل‌شمارش)",
    lesson: 54,
    pos: "n.",
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "voyage",
    meaning: "سفر دریایی",
    lesson: 54,
    pos: "n.",
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "fly",
    meaning: "پرواز کردن",
    lesson: 54,
    pos: "v.",
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "flight",
    meaning: "پرواز",
    lesson: 54,
    pos: "n.",
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "take off",
    meaning: "برخاستن (هواپیما)",
    lesson: 54,
    pos: "phr.",
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "land",
    meaning: "فرود آمدن",
    lesson: 54,
    pos: "v.",
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "stranded",
    meaning: "سرگردان/گرفتار",
    lesson: 54,
    pos: "adj.",
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "delayed",
    meaning: "به تأخیر افتاده",
    lesson: 54,
    pos: "adj.",
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "run on time",
    meaning: "سر وقت حرکت کردن",
    lesson: 54,
    pos: "phr.",
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "change trains",
    meaning: "تعویض قطار (وسیله عوض کردن)",
    lesson: 54,
    pos: "phr.",
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "sail",
    meaning: "لنگر انداختن/سفر دریایی",
    lesson: 54,
    pos: "v.",
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "set sail",
    meaning: "بادبان برافراشتن/حرکت کردن",
    lesson: 54,
    pos: "phr.",
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "dock",
    meaning: "به اسکله رسیدن",
    lesson: 54,
    pos: "v.",
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "rough",
    meaning: "متلاطم (دریا)",
    lesson: 54,
    pos: "adj.",
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "seasick",
    meaning: "دچار دریازدگی",
    lesson: 54,
    pos: "adj.",
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "wrecked",
    meaning: "کشتی‌شکسته/نابود شده",
    lesson: 54,
    pos: "adj.",
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "marooned",
    meaning: "بی‌پناه/گرفتار در جزیره",
    lesson: 54,
    pos: "adj.",
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "overtake",
    meaning: "سبقت گرفتن",
    lesson: 54,
    pos: "v.",
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "swerve",
    meaning: "ناگهان پیچیدن",
    lesson: 54,
    pos: "v.",
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "cyclist",
    meaning: "دوچرخه‌سوار",
    lesson: 54,
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "back",
    meaning: "عقب راندن (خودرو)",
    lesson: 54,
    pos: "v.",
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "reverse",
    meaning: "عقب راندن",
    lesson: 54,
    pos: "v.",
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "drive",
    meaning: "باغچه جلوی خانه/راه ورودی",
    lesson: 54,
    pos: "n.",
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "park",
    meaning: "پارک کردن",
    lesson: 54,
    pos: "v.",
    lessonLabel: "درس 54 — سفر"
  },
  {
    word: "camp-site",
    meaning: "محل کمپ (جایی برای چادر زدن یا پارک کردن کاروان)",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — تعطیلات"
  },
  {
    word: "tent",
    meaning: "چادر",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — تعطیلات"
  },
  {
    word: "caravan",
    meaning: "کاروان (تخت‌روی متحرک)",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — تعطیلات"
  },
  {
    word: "self-catering flat",
    meaning: "آپارتمان خودپز (آپارتمان اجاره‌ای که خودتان غذا می‌پزید)",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — تعطیلات"
  },
  {
    word: "guesthouse",
    meaning: "مسافرخانه (اقامتگاه ارزان‌تر از هتل با خدمات کمتر)",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — تعطیلات"
  },
  {
    word: "youth hostel",
    meaning: "آسایشگاه جوانان (اقامتگاه ارزان برای جوانان با تخت‌های دوطبقه)",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — تعطیلات"
  },
  {
    word: "bunk beds",
    meaning: "تخت‌های دوطبقه",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — تعطیلات"
  },
  {
    word: "holiday camp",
    meaning: "اردوگاه تعطیلات (محل اقامت با شاله‌های کوچک و امکانات تفریحی)",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — تعطیلات"
  },
  {
    word: "chalets",
    meaning: "شاله‌ها / کلبه‌های چوبی",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — تعطیلات"
  },
  {
    word: "time-share apartment",
    meaning: "آپارتمان مالکیت مشترک",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — تعطیلات"
  },
  {
    word: "package holiday",
    meaning: "تور کامل (تعطیلاتی که هزینه رفت‌وآمد، اقامت و غذا از قبل پرداخت می‌شود)",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — تعطیلات"
  },
  {
    word: "excursions",
    meaning: "گردش‌های کوتاه / اکسکورسیون",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — تعطیلات"
  },
  {
    word: "cruise",
    meaning: "سفر دریایی با کشتی",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — تعطیلات"
  },
  {
    word: "sight-seeing",
    meaning: "بازدید از جاهای دیدنی",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — تعطیلات"
  },
  {
    word: "brochure",
    meaning: "راهنما / بروشور",
    lesson: 55,
    pos: "n.",
    lessonLabel: "درس 55 — تعطیلات"
  },
  {
    word: "breath-taking",
    meaning: "باورنکردنی، نفس‌گیر (شگفت‌انگیز به حدی که نفس را بند می‌آورد)",
    lesson: 55,
    pos: "adj.",
    lessonLabel: "درس 55 — تعطیلات"
  },
  {
    word: "stunning",
    meaning: "خیره‌کننده",
    lesson: 55,
    pos: "adj.",
    lessonLabel: "درس 55 — تعطیلات"
  },
  {
    word: "exclusive",
    meaning: "مخصوص افراد خاص، انحصاری",
    lesson: 55,
    pos: "adj.",
    lessonLabel: "درس 55 — تعطیلات"
  },
  {
    word: "exhilarating",
    meaning: "هیجان‌انگیز و نشاط‌آور",
    lesson: 55,
    pos: "adj.",
    lessonLabel: "درس 55 — تعطیلات"
  },
  {
    word: "exotic",
    meaning: "غیرمعمولی و جذاب (عجیب و هیجان‌انگیز)",
    lesson: 55,
    pos: "adj.",
    lessonLabel: "درس 55 — تعطیلات"
  },
  {
    word: "glamorous",
    meaning: "پر زرق و برق، جذاب",
    lesson: 55,
    pos: "adj.",
    lessonLabel: "درس 55 — تعطیلات"
  },
  {
    word: "intoxicating",
    meaning: "مست‌کننده (هیجان‌آور و احساس‌برانگیز)",
    lesson: 55,
    pos: "adj.",
    lessonLabel: "درس 55 — تعطیلات"
  },
  {
    word: "legendary",
    meaning: "افسانه‌ای، مشهور",
    lesson: 55,
    pos: "adj.",
    lessonLabel: "درس 55 — تعطیلات"
  },
  {
    word: "luxurious",
    meaning: "لاکچری، بسیار مجلل",
    lesson: 55,
    pos: "adj.",
    lessonLabel: "درس 55 — تعطیلات"
  },
  {
    word: "mighty",
    meaning: "عظیم و قدرتمند",
    lesson: 55,
    pos: "adj.",
    lessonLabel: "درس 55 — تعطیلات"
  },
  {
    word: "picturesque",
    meaning: "خوش‌منظره، به‌اندازهٔ یک نقاشی زیبا",
    lesson: 55,
    pos: "adj.",
    lessonLabel: "درس 55 — تعطیلات"
  },
  {
    word: "sublime",
    meaning: "عالی و آسمانی",
    lesson: 55,
    pos: "adj.",
    lessonLabel: "درس 55 — تعطیلات"
  },
  {
    word: "unsurpassed",
    meaning: "بی‌همتا، بی‌نظیر",
    lesson: 55,
    pos: "adj.",
    lessonLabel: "درس 55 — تعطیلات"
  },
  {
    word: "unspoilt",
    meaning: "دست‌نخورده و بکر (در حالت طبیعی و زیبا)",
    lesson: 55,
    pos: "adj.",
    lessonLabel: "درس 55 — تعطیلات"
  },
  {
    word: "28% twenty-eight per cent",
    meaning: "بیست‌وهشت درصد",
    lesson: 56,
    lessonLabel: "درس 56 — عددها و شکل‌ها"
  },
  {
    word: "10 m × 12 m ten metres by twelve metres",
    meaning: "ده متر در دوازده متر",
    lesson: 56,
    lessonLabel: "درس 56 — عددها و شکل‌ها"
  },
  {
    word: "10.3 ten point three",
    meaning: "ده ممیز سه",
    lesson: 56,
    lessonLabel: "درس 56 — عددها و شکل‌ها"
  },
  {
    word: "1⅔ one and two thirds",
    meaning: "یک و دو سوم",
    lesson: 56,
    lessonLabel: "درس 56 — عددها و شکل‌ها"
  },
  {
    word: "⅘ four fifths",
    meaning: "چهار پنجم",
    lesson: 56,
    lessonLabel: "درس 56 — عددها و شکل‌ها"
  },
  {
    word: "⁹⁄₁₃ nine thirteenths or nine over thirteen",
    meaning: "نه سیزدهم یا نه تقسیم بر سیزده",
    lesson: 56,
    lessonLabel: "درس 56 — عددها و شکل‌ها"
  },
  {
    word: "4² four squared",
    meaning: "چهار به توان دو",
    lesson: 56,
    lessonLabel: "درس 56 — عددها و شکل‌ها"
  },
  {
    word: "7³ seven cubed",
    meaning: "هفت به توان سه / هفت مکعب",
    lesson: 56,
    lessonLabel: "درس 56 — عددها و شکل‌ها"
  },
  {
    word: "8⁴ eight to the power of four",
    meaning: "هشت به توان چهار",
    lesson: 56,
    lessonLabel: "درس 56 — عددها و شکل‌ها"
  },
  {
    word: "32°C or F thirty-two degrees centigrade/Celsius or Fahrenheit",
    meaning: "سی‌ودو درجه سانتی‌گراد یا فارنهایت",
    lesson: 56,
    lessonLabel: "درس 56 — عددها و شکل‌ها"
  },
  {
    word: "1,623,457 one million, six hundred and twenty-three thousand, four hundred and fifty-seven",
    meaning: "یک میلیون و ششصد و بیست‌وسه هزار و چهارصد و پنجاه‌وهفت",
    lesson: 56,
    pos: "n.",
    lessonLabel: "درس 56 — عددها و شکل‌ها"
  },
  {
    word: "circle",
    meaning: "دایره",
    lesson: 56,
    pos: "n.",
    lessonLabel: "درس 56 — عددها و شکل‌ها"
  },
  {
    word: "pentagon",
    meaning: "پنج‌ضلعی",
    lesson: 56,
    pos: "n.",
    lessonLabel: "درس 56 — عددها و شکل‌ها"
  },
  {
    word: "rectangle",
    meaning: "مستطیل",
    lesson: 56,
    pos: "n.",
    lessonLabel: "درس 56 — عددها و شکل‌ها"
  },
  {
    word: "triangle",
    meaning: "مثلث",
    lesson: 56,
    pos: "n.",
    lessonLabel: "درس 56 — عددها و شکل‌ها"
  },
  {
    word: "square",
    meaning: "مربع",
    lesson: 56,
    pos: "n.",
    lessonLabel: "درس 56 — عددها و شکل‌ها"
  },
  {
    word: "octagon",
    meaning: "هشت‌ضلعی",
    lesson: 56,
    pos: "n.",
    lessonLabel: "درس 56 — عددها و شکل‌ها"
  },
  {
    word: "oval",
    meaning: "بیضی",
    lesson: 56,
    pos: "n.",
    lessonLabel: "درس 56 — عددها و شکل‌ها"
  },
  {
    word: "right angle",
    meaning: "زاویه قائمه (۹۰ درجه)",
    lesson: 56,
    pos: "n.",
    lessonLabel: "درس 56 — عددها و شکل‌ها"
  },
  {
    word: "diameter",
    meaning: "قطر",
    lesson: 56,
    pos: "n.",
    lessonLabel: "درس 56 — عددها و شکل‌ها"
  },
  {
    word: "semi-circle",
    meaning: "نیم‌دایره",
    lesson: 56,
    pos: "n.",
    lessonLabel: "درس 56 — عددها و شکل‌ها"
  },
  {
    word: "radius",
    meaning: "شعاع",
    lesson: 56,
    pos: "n.",
    lessonLabel: "درس 56 — عددها و شکل‌ها"
  },
  {
    word: "circumference",
    meaning: "محیط دایره",
    lesson: 56,
    pos: "n.",
    lessonLabel: "درس 56 — عددها و شکل‌ها"
  },
  {
    word: "sphere",
    meaning: "کره (هندسه)",
    lesson: 56,
    pos: "n.",
    lessonLabel: "درس 56 — عددها و شکل‌ها"
  },
  {
    word: "cube",
    meaning: "مکعب",
    lesson: 56,
    pos: "n.",
    lessonLabel: "درس 56 — عددها و شکل‌ها"
  },
  {
    word: "pyramid",
    meaning: "هرم",
    lesson: 56,
    pos: "n.",
    lessonLabel: "درس 56 — عددها و شکل‌ها"
  },
  {
    word: "spiral",
    meaning: "مارپیچ",
    lesson: 56,
    pos: "n.",
    lessonLabel: "درس 56 — عددها و شکل‌ها"
  },
  {
    word: "hemisphere",
    meaning: "نیم‌کره",
    lesson: 56,
    pos: "n.",
    lessonLabel: "درس 56 — عددها و شکل‌ها"
  },
  {
    word: "addition",
    meaning: "جمع",
    lesson: 56,
    pos: "n.",
    lessonLabel: "درس 56 — عددها و شکل‌ها"
  },
  {
    word: "subtraction",
    meaning: "تفریق",
    lesson: 56,
    pos: "n.",
    lessonLabel: "درس 56 — عددها و شکل‌ها"
  },
  {
    word: "multiplication",
    meaning: "ضرب",
    lesson: 56,
    pos: "n.",
    lessonLabel: "درس 56 — عددها و شکل‌ها"
  },
  {
    word: "division",
    meaning: "تقسیم",
    lesson: 56,
    pos: "n.",
    lessonLabel: "درس 56 — عددها و شکل‌ها"
  },
  {
    word: "genetic engineering",
    meaning: "مهندسی ژنتیک",
    lesson: 57,
    lessonLabel: "درس 57 — علم و فناوری"
  },
  {
    word: "ergonomics",
    meaning: "ارگونومی (مطالعه طراحی فضاهای کاری)",
    lesson: 57,
    lessonLabel: "درس 57 — علم و فناوری"
  },
  {
    word: "molecular biology",
    meaning: "زیست‌شناسی مولکولی",
    lesson: 57,
    lessonLabel: "درس 57 — علم و فناوری"
  },
  {
    word: "cybernetics",
    meaning: "سایبرنتیک",
    lesson: 57,
    lessonLabel: "درس 57 — علم و فناوری"
  },
  {
    word: "information technology",
    meaning: "فناوری اطلاعات",
    lesson: 57,
    lessonLabel: "درس 57 — علم و فناوری"
  },
  {
    word: "bioclimatology",
    meaning: "زیست‌اقلیم‌شناسی",
    lesson: 57,
    lessonLabel: "درس 57 — علم و فناوری"
  },
  {
    word: "geopolitics",
    meaning: "ژئوپلیتیک",
    lesson: 57,
    lessonLabel: "درس 57 — علم و فناوری"
  },
  {
    word: "nuclear engineering",
    meaning: "مهندسی هسته‌ای",
    lesson: 57,
    lessonLabel: "درس 57 — علم و فناوری"
  },
  {
    word: "cryogenics",
    meaning: "برودتی (کرایوژنیک)",
    lesson: 57,
    lessonLabel: "درس 57 — علم و فناوری"
  },
  {
    word: "astrophysics",
    meaning: "اخترفیزیک",
    lesson: 57,
    lessonLabel: "درس 57 — علم و فناوری"
  },
  {
    word: "voice technology",
    meaning: "فناوری صدا",
    lesson: 57,
    lessonLabel: "درس 57 — علم و فناوری"
  },
  {
    word: "computer",
    meaning: "رایانه",
    lesson: 57,
    pos: "n.",
    lessonLabel: "درس 57 — علم و فناوری"
  },
  {
    word: "CD player",
    meaning: "پخش‌کننده سی‌دی",
    lesson: 57,
    lessonLabel: "درس 57 — علم و فناوری"
  },
  {
    word: "food processor",
    meaning: "غذاساز",
    lesson: 57,
    lessonLabel: "درس 57 — علم و فناوری"
  },
  {
    word: "video recorder",
    meaning: "ضبط‌کننده ویدیو",
    lesson: 57,
    lessonLabel: "درس 57 — علم و فناوری"
  },
  {
    word: "mobile phone",
    meaning: "تلفن همراه",
    lesson: 57,
    lessonLabel: "درس 57 — علم و فناوری"
  },
  {
    word: "microwave (oven)",
    meaning: "مایکروویو",
    lesson: 57,
    lessonLabel: "درس 57 — علم و فناوری"
  },
  {
    word: "keyboard",
    meaning: "صفحه‌کلید",
    lesson: 57,
    lessonLabel: "درس 57 — علم و فناوری"
  },
  {
    word: "mouse",
    meaning: "موس",
    lesson: 57,
    lessonLabel: "درس 57 — علم و فناوری"
  },
  {
    word: "mouse mat",
    meaning: "زیرموس",
    lesson: 57,
    lessonLabel: "درس 57 — علم و فناوری"
  },
  {
    word: "fax machine",
    meaning: "دورنگار (فکس)",
    lesson: 57,
    lessonLabel: "درس 57 — علم و فناوری"
  },
  {
    word: "answerphone",
    meaning: "پاسخگوی تلفنی",
    lesson: 57,
    lessonLabel: "درس 57 — علم و فناوری"
  },
  {
    word: "personal organiser",
    meaning: "دستیار دیجیتال شخصی",
    lesson: 57,
    lessonLabel: "درس 57 — علم و فناوری"
  },
  {
    word: "personal stereo",
    meaning: "ضبط‌صوت شخصی",
    lesson: 57,
    lessonLabel: "درس 57 — علم و فناوری"
  },
  {
    word: "cordless iron",
    meaning: "اتو بی‌سیم",
    lesson: 57,
    lessonLabel: "درس 57 — علم و فناوری"
  },
  {
    word: "experiment",
    meaning: "آزمایش کردن",
    lesson: 57,
    pos: "v.",
    lessonLabel: "درس 57 — علم و فناوری"
  },
  {
    word: "press",
    meaning: "فشار دادن",
    lesson: 57,
    pos: "v.",
    lessonLabel: "درس 57 — علم و فناوری"
  },
  {
    word: "flash",
    meaning: "چشمک زدن / فلش زدن",
    lesson: 57,
    pos: "v.",
    lessonLabel: "درس 57 — علم و فناوری"
  },
  {
    word: "pull",
    meaning: "کشیدن",
    lesson: 57,
    pos: "v.",
    lessonLabel: "درس 57 — علم و فناوری"
  },
  {
    word: "rotate",
    meaning: "چرخیدن",
    lesson: 57,
    pos: "v.",
    lessonLabel: "درس 57 — علم و فناوری"
  },
  {
    word: "dissect",
    meaning: "تشریح کردن",
    lesson: 57,
    pos: "v.",
    lessonLabel: "درس 57 — علم و فناوری"
  },
  {
    word: "combine",
    meaning: "ترکیب کردن",
    lesson: 57,
    pos: "v.",
    lessonLabel: "درس 57 — علم و فناوری"
  },
  {
    word: "react",
    meaning: "واکنش نشان دادن",
    lesson: 57,
    pos: "v.",
    lessonLabel: "درس 57 — علم و فناوری"
  },
  {
    word: "analyse",
    meaning: "تحلیل کردن",
    lesson: 57,
    pos: "v.",
    lessonLabel: "درس 57 — علم و فناوری"
  },
  {
    word: "conclude",
    meaning: "نتیجه‌گیری کردن",
    lesson: 57,
    pos: "v.",
    lessonLabel: "درس 57 — علم و فناوری"
  },
  {
    word: "invent",
    meaning: "اختراع کردن",
    lesson: 57,
    pos: "v.",
    lessonLabel: "درس 57 — علم و فناوری"
  },
  {
    word: "discover",
    meaning: "کشف کردن",
    lesson: 57,
    pos: "v.",
    lessonLabel: "درس 57 — علم و فناوری"
  },
  {
    word: "switch on",
    meaning: "روشن کردن",
    lesson: 57,
    lessonLabel: "درس 57 — علم و فناوری"
  },
  {
    word: "insert",
    meaning: "درج کردن / قرار دادن",
    lesson: 57,
    pos: "v.",
    lessonLabel: "درس 57 — علم و فناوری"
  },
  {
    word: "patent",
    meaning: "ثبت اختراع کردن",
    lesson: 57,
    pos: "v.",
    lessonLabel: "درس 57 — علم و فناوری"
  },
  {
    word: "personal computer / PC / desktop computer",
    meaning: "رایانه شخصی / PC / رایانه رومیزی",
    lesson: 58,
    pos: "n.",
    lessonLabel: "درس 58 — رایانه و اینترنت"
  },
  {
    word: "laptop (computer)",
    meaning: "رایانه کیفی (لپ‌تاپ)",
    lesson: 58,
    pos: "n.",
    lessonLabel: "درس 58 — رایانه و اینترنت"
  },
  {
    word: "palmtop (computer)",
    meaning: "رایانه کف‌دستی",
    lesson: 58,
    pos: "n.",
    lessonLabel: "درس 58 — رایانه و اینترنت"
  },
  {
    word: "hardware",
    meaning: "سخت‌افزار",
    lesson: 58,
    pos: "n.",
    lessonLabel: "درس 58 — رایانه و اینترنت"
  },
  {
    word: "software",
    meaning: "نرم‌افزار",
    lesson: 58,
    pos: "n.",
    lessonLabel: "درس 58 — رایانه و اینترنت"
  },
  {
    word: "floppy (disk) / diskette",
    meaning: "دیسک فلاپی / دیسکت",
    lesson: 58,
    pos: "n.",
    lessonLabel: "درس 58 — رایانه و اینترنت"
  },
  {
    word: "hard disk",
    meaning: "دیسک سخت (هارد)",
    lesson: 58,
    pos: "n.",
    lessonLabel: "درس 58 — رایانه و اینترنت"
  },
  {
    word: "disk drive",
    meaning: "درایو دیسک",
    lesson: 58,
    pos: "n.",
    lessonLabel: "درس 58 — رایانه و اینترنت"
  },
  {
    word: "modem",
    meaning: "مودم",
    lesson: 58,
    pos: "n.",
    lessonLabel: "درس 58 — رایانه و اینترنت"
  },
  {
    word: "scanner",
    meaning: "اسکنر (دستگاه پویش)",
    lesson: 58,
    pos: "n.",
    lessonLabel: "درس 58 — رایانه و اینترنت"
  },
  {
    word: "to download",
    meaning: "دانلود کردن؛ انتقال داده از رایانه بزرگ به کوچک‌تر",
    lesson: 58,
    pos: "v.",
    lessonLabel: "درس 58 — رایانه و اینترنت"
  },
  {
    word: "RAM (random access memory / memory",
    meaning: "حافظه دسترسی تصادفی (RAM)",
    lesson: 58,
    pos: "n.",
    lessonLabel: "درس 58 — رایانه و اینترنت"
  },
  {
    word: "megabytes",
    meaning: "مگابایت‌ها",
    lesson: 58,
    pos: "n.",
    lessonLabel: "درس 58 — رایانه و اینترنت"
  },
  {
    word: "spreadsheet (program)",
    meaning: "برنامه صفحه‌گسترده",
    lesson: 58,
    pos: "n.",
    lessonLabel: "درس 58 — رایانه و اینترنت"
  },
  {
    word: "computer graphics",
    meaning: "گرافیک رایانه‌ای",
    lesson: 58,
    pos: "n.",
    lessonLabel: "درس 58 — رایانه و اینترنت"
  },
  {
    word: "word processing",
    meaning: "واژه‌پردازی",
    lesson: 58,
    pos: "n.",
    lessonLabel: "درس 58 — رایانه و اینترنت"
  },
  {
    word: "virus",
    meaning: "ویروس (دستورات پنهان مخرب در برنامه)",
    lesson: 58,
    pos: "n.",
    lessonLabel: "درس 58 — رایانه و اینترنت"
  },
  {
    word: "the Internet / 'the net'",
    meaning: "اینترنت",
    lesson: 58,
    pos: "n.",
    lessonLabel: "درس 58 — رایانه و اینترنت"
  },
  {
    word: "e-mail (electronic mail)",
    meaning: "پست الکترونیکی",
    lesson: 58,
    pos: "n.",
    lessonLabel: "درس 58 — رایانه و اینترنت"
  },
  {
    word: "World Wide Web / 'the Web'",
    meaning: "وب جهانی",
    lesson: 58,
    pos: "n.",
    lessonLabel: "درس 58 — رایانه و اینترنت"
  },
  {
    word: "pages",
    meaning: "صفحه‌ها (اسناد پیوسته وب)",
    lesson: 58,
    pos: "n.",
    lessonLabel: "درس 58 — رایانه و اینترنت"
  },
  {
    word: "to surf the net / the Web",
    meaning: "گشت‌وگذار در اینترنت / وب",
    lesson: 58,
    pos: "v.",
    lessonLabel: "درس 58 — رایانه و اینترنت"
  },
  {
    word: "website / home page",
    meaning: "وب‌سایت / صفحه اصلی",
    lesson: 58,
    pos: "n.",
    lessonLabel: "درس 58 — رایانه و اینترنت"
  },
  {
    word: "newsgroup",
    meaning: "گروه خبری",
    lesson: 58,
    pos: "n.",
    lessonLabel: "درس 58 — رایانه و اینترنت"
  },
  {
    word: "chat room / chat forum",
    meaning: "اتاق گفتگو / انجمن گفتگو",
    lesson: 58,
    pos: "n.",
    lessonLabel: "درس 58 — رایانه و اینترنت"
  },
  {
    word: "FAQ",
    meaning: "پرسش‌های پرتکرار (فهرست پرسش‌های رایج و پاسخ‌های مفید)",
    lesson: 58,
    pos: "n.",
    lessonLabel: "درس 58 — رایانه و اینترنت"
  },
  {
    word: "the mass media",
    meaning: "رسانه‌های گروهی",
    lesson: 59,
    lessonLabel: "درس 59 — مطبوعات و رسانه‌ها"
  },
  {
    word: "publishing",
    meaning: "نشر",
    lesson: 59,
    lessonLabel: "درس 59 — مطبوعات و رسانه‌ها"
  },
  {
    word: "documentaries",
    meaning: "مستندها",
    lesson: 59,
    lessonLabel: "درس 59 — مطبوعات و رسانه‌ها"
  },
  {
    word: "news broadcasts",
    meaning: "پخش اخبار",
    lesson: 59,
    lessonLabel: "درس 59 — مطبوعات و رسانه‌ها"
  },
  {
    word: "current affairs programmes",
    meaning: "برنامه‌های اخبار و رویدادهای جاری",
    lesson: 59,
    lessonLabel: "درس 59 — مطبوعات و رسانه‌ها"
  },
  {
    word: "soap operas",
    meaning: "سریال‌های تلویزیونی (داستان‌های پیوسته درباره زندگی مجموعه‌ای از شخصیت‌ها)",
    lesson: 59,
    lessonLabel: "درس 59 — مطبوعات و رسانه‌ها"
  },
  {
    word: "quizzes",
    meaning: "مسابقه‌های علمی/سرگرمی",
    lesson: 59,
    lessonLabel: "درس 59 — مطبوعات و رسانه‌ها"
  },
  {
    word: "sitcoms",
    meaning: "کمدی‌های موقعیت (طنزهایی حول مجموعه‌ای از شخصیت‌ها در موقعیتی معین)",
    lesson: 59,
    lessonLabel: "درس 59 — مطبوعات و رسانه‌ها"
  },
  {
    word: "drama",
    meaning: "نمایش/درام",
    lesson: 59,
    lessonLabel: "درس 59 — مطبوعات و رسانه‌ها"
  },
  {
    word: "chat shows",
    meaning: "برنامه‌های گفتگو محور",
    lesson: 59,
    lessonLabel: "درس 59 — مطبوعات و رسانه‌ها"
  },
  {
    word: "detective stories",
    meaning: "داستان‌های جنایی/کارآگاهی",
    lesson: 59,
    lessonLabel: "درس 59 — مطبوعات و رسانه‌ها"
  },
  {
    word: "sports programmes",
    meaning: "برنامه‌های ورزشی",
    lesson: 59,
    lessonLabel: "درس 59 — مطبوعات و رسانه‌ها"
  },
  {
    word: "weather forecasts",
    meaning: "پیش‌بینی هوا",
    lesson: 59,
    lessonLabel: "درس 59 — مطبوعات و رسانه‌ها"
  },
  {
    word: "music programmes",
    meaning: "برنامه‌های موسیقی",
    lesson: 59,
    lessonLabel: "درس 59 — مطبوعات و رسانه‌ها"
  },
  {
    word: "game shows",
    meaning: "برنامه‌های مسابقه‌ای (که شرکت‌کنندگان بر سر جایزه رقابت می‌کنند)",
    lesson: 59,
    lessonLabel: "درس 59 — مطبوعات و رسانه‌ها"
  },
  {
    word: "variety shows",
    meaning: "شوهای واریته/برنامه‌های متنوع",
    lesson: 59,
    lessonLabel: "درس 59 — مطبوعات و رسانه‌ها"
  },
  {
    word: "commercials",
    meaning: "آگهی‌های تبلیغاتی",
    lesson: 59,
    lessonLabel: "درس 59 — مطبوعات و رسانه‌ها"
  },
  {
    word: "serial",
    meaning: "سریال (داستانی که از یک قسمت به قسمت بعد ادامه دارد)",
    lesson: 59,
    pos: "n.",
    lessonLabel: "درس 59 — مطبوعات و رسانه‌ها"
  },
  {
    word: "programme",
    meaning: "برنامه",
    lesson: 59,
    pos: "n.",
    lessonLabel: "درس 59 — مطبوعات و رسانه‌ها"
  },
  {
    word: "episode",
    meaning: "قسمت (از یک سریال)",
    lesson: 59,
    pos: "n.",
    lessonLabel: "درس 59 — مطبوعات و رسانه‌ها"
  },
  {
    word: "series",
    meaning: "مجموعه/سری (هر برنامه‌اش کامل است)",
    lesson: 59,
    pos: "n.",
    lessonLabel: "درس 59 — مطبوعات و رسانه‌ها"
  },
  {
    word: "sub-titles",
    meaning: "زیرنویس",
    lesson: 59,
    lessonLabel: "درس 59 — مطبوعات و رسانه‌ها"
  },
  {
    word: "dubbed",
    meaning: "دوبله‌شده",
    lesson: 59,
    lessonLabel: "درس 59 — مطبوعات و رسانه‌ها"
  },
  {
    word: "TV aerial",
    meaning: "آنتن تلویزیون",
    lesson: 59,
    lessonLabel: "درس 59 — مطبوعات و رسانه‌ها"
  },
  {
    word: "satellite dish",
    meaning: "دیش ماهواره",
    lesson: 59,
    lessonLabel: "درس 59 — مطبوعات و رسانه‌ها"
  },
  {
    word: "camcorder",
    meaning: "دوربین فیلم‌برداری دستی",
    lesson: 59,
    lessonLabel: "درس 59 — مطبوعات و رسانه‌ها"
  },
  {
    word: "headset/headphones",
    meaning: "هدفون/هدست",
    lesson: 59,
    lessonLabel: "درس 59 — مطبوعات و رسانه‌ها"
  },
  {
    word: "headlines",
    meaning: "تیترها",
    lesson: 59,
    lessonLabel: "درس 59 — مطبوعات و رسانه‌ها"
  },
  {
    word: "news reports",
    meaning: "گزارش‌های خبری",
    lesson: 59,
    lessonLabel: "درس 59 — مطبوعات و رسانه‌ها"
  },
  {
    word: "editorial",
    meaning: "سرمقاله (مقاله نظر نگارش‌شده توسط سردبیر)",
    lesson: 59,
    lessonLabel: "درس 59 — مطبوعات و رسانه‌ها"
  },
  {
    word: "feature articles",
    meaning: "مقاله‌های ویژه، مثلاً درباره مد یا روندهای اجتماعی",
    lesson: 59,
    lessonLabel: "درس 59 — مطبوعات و رسانه‌ها"
  },
  {
    word: "horoscope",
    meaning: "ستون فال و طالع‌بینی",
    lesson: 59,
    lessonLabel: "درس 59 — مطبوعات و رسانه‌ها"
  },
  {
    word: "cartoons",
    meaning: "کاریاتورها/کارتون‌ها",
    lesson: 59,
    lessonLabel: "درس 59 — مطبوعات و رسانه‌ها"
  },
  {
    word: "crossword",
    meaning: "جدول کلمات متقاطع",
    lesson: 59,
    lessonLabel: "درس 59 — مطبوعات و رسانه‌ها"
  },
  {
    word: "small ads",
    meaning: "آگهی‌های کوچک/درج‌آگهی",
    lesson: 59,
    lessonLabel: "درس 59 — مطبوعات و رسانه‌ها"
  },
  {
    word: "business news",
    meaning: "اخبار اقتصادی",
    lesson: 59,
    lessonLabel: "درس 59 — مطبوعات و رسانه‌ها"
  },
  {
    word: "sports reports",
    meaning: "گزارش‌های ورزشی",
    lesson: 59,
    lessonLabel: "درس 59 — مطبوعات و رسانه‌ها"
  },
  {
    word: "scandal",
    meaning: "رسوایی/رسوایی‌های مطبوعاتی",
    lesson: 59,
    lessonLabel: "درس 59 — مطبوعات و رسانه‌ها"
  },
  {
    word: "the letters page",
    meaning: "صفحه نامه‌های خوانندگان",
    lesson: 59,
    lessonLabel: "درس 59 — مطبوعات و رسانه‌ها"
  },
  {
    word: "popular or tabloid newspaper",
    meaning: "روزنامه عامه‌پسند یا تابلوئید (بیشتر بر حس‌گرایی تمرکز دارد)",
    lesson: 59,
    lessonLabel: "درس 59 — مطبوعات و رسانه‌ها"
  },
  {
    word: "quality newspaper",
    meaning: "روزنامه باکیفیت/کمیجد (بیشتر به خبر واقعی می‌پردازد)",
    lesson: 59,
    lessonLabel: "درس 59 — مطبوعات و رسانه‌ها"
  },
  {
    word: "tabloid",
    meaning: "تابلوئید (قطع کوچک‌تر، تیترهای بزرگ‌تر و خبرهای کوتاه‌تر)",
    lesson: 59,
    pos: "n.",
    lessonLabel: "درس 59 — مطبوعات و رسانه‌ها"
  },
  {
    word: "quality paper",
    meaning: "روزنامه باکیفیت",
    lesson: 59,
    lessonLabel: "درس 59 — مطبوعات و رسانه‌ها"
  },
  {
    word: "journal",
    meaning: "مجله علمی/آکادمیک",
    lesson: 59,
    pos: "n.",
    lessonLabel: "درس 59 — مطبوعات و رسانه‌ها"
  },
  {
    word: "magazine",
    meaning: "مجله",
    lesson: 59,
    pos: "n.",
    lessonLabel: "درس 59 — مطبوعات و رسانه‌ها"
  },
  {
    word: "colour supplement",
    meaning: "پیوست رنگی (مجله‌ای که هفته‌ای یک‌بار، معمولاً یکشنبه‌ها، همراه روزنامه منتشر می‌شود)",
    lesson: 59,
    lessonLabel: "درس 59 — مطبوعات و رسانه‌ها"
  },
  {
    word: "comic",
    meaning: "مجله کمیک (معمولاً برای کودکان یا نوجوانان، پر از داستان مصور و کاریکاتور)",
    lesson: 59,
    pos: "n.",
    lessonLabel: "درس 59 — مطبوعات و رسانه‌ها"
  },
  {
    word: "broadcasts",
    meaning: "پخش می‌کند",
    lesson: 59,
    pos: "v.",
    lessonLabel: "درس 59 — مطبوعات و رسانه‌ها"
  },
  {
    word: "receive / pick up",
    meaning: "دریافت می‌کند (سیگنال)",
    lesson: 59,
    pos: "v.",
    lessonLabel: "درس 59 — مطبوعات و رسانه‌ها"
  },
  {
    word: "showing",
    meaning: "پخش/نمایش می‌دهند",
    lesson: 59,
    pos: "v.",
    lessonLabel: "درس 59 — مطبوعات و رسانه‌ها"
  },
  {
    word: "published",
    meaning: "منتشر شد",
    lesson: 59,
    pos: "v.",
    lessonLabel: "درس 59 — مطبوعات و رسانه‌ها"
  },
  {
    word: "printed",
    meaning: "چاپ شد",
    lesson: 59,
    pos: "v.",
    lessonLabel: "درس 59 — مطبوعات و رسانه‌ها"
  },
  {
    word: "shot / made on location",
    meaning: "فیلم‌برداری/ساخته شد در لوکیشن",
    lesson: 59,
    lessonLabel: "درس 59 — مطبوعات و رسانه‌ها"
  },
  {
    word: "cut/censored",
    meaning: "برش/سانسور شد",
    lesson: 59,
    pos: "v.",
    lessonLabel: "درس 59 — مطبوعات و رسانه‌ها"
  },
  {
    word: "edited",
    meaning: "ویرایش شده",
    lesson: 59,
    pos: "v.",
    lessonLabel: "درس 59 — مطبوعات و رسانه‌ها"
  },
  {
    word: "republic",
    meaning: "جمهوری: کشوری که توسط نمایندگان و معمولاً یک رئیس‌جمهور اداره می‌شود",
    lesson: 60,
    pos: "n.",
    lessonLabel: "درس 60 — سیاست و نهادهای عمومی"
  },
  {
    word: "monarchy",
    meaning: "پادشاهی: کشوری که توسط پادشاه یا ملکه اداره می‌شود",
    lesson: 60,
    pos: "n.",
    lessonLabel: "درس 60 — سیاست و نهادهای عمومی"
  },
  {
    word: "federation",
    meaning: "فدراسیون: اتحادیه‌ای از واحدهای سیاسی زیر یک دولت مرکزی",
    lesson: 60,
    pos: "n.",
    lessonLabel: "درس 60 — سیاست و نهادهای عمومی"
  },
  {
    word: "democracy",
    meaning: "دموکراسی: حکومت مردم، به دست مردم و برای مردم",
    lesson: 60,
    pos: "n.",
    lessonLabel: "درس 60 — سیاست و نهادهای عمومی"
  },
  {
    word: "dictatorship",
    meaning: "دیکتاتوری: نظام حکومتی اداره‌شده توسط یک دیکتاتور",
    lesson: 60,
    pos: "n.",
    lessonLabel: "درس 60 — سیاست و نهادهای عمومی"
  },
  {
    word: "independence",
    meaning: "استقلال: آزادی از کنترل خارجی؛ خودمختاری",
    lesson: 60,
    pos: "n.",
    lessonLabel: "درس 60 — سیاست و نهادهای عمومی"
  },
  {
    word: "presidential government",
    meaning: "حکومت ریاست‌جمهوری",
    lesson: 60,
    lessonLabel: "درس 60 — سیاست و نهادهای عمومی"
  },
  {
    word: "legislature",
    meaning: "قوه مقننه",
    lesson: 60,
    pos: "n.",
    lessonLabel: "درس 60 — سیاست و نهادهای عمومی"
  },
  {
    word: "Congress",
    meaning: "کنگره ( آمریکا)",
    lesson: 60,
    pos: "n.",
    lessonLabel: "درس 60 — سیاست و نهادهای عمومی"
  },
  {
    word: "branch (of government)",
    meaning: "شاخه (حکومت)",
    lesson: 60,
    pos: "n.",
    lessonLabel: "درس 60 — سیاست و نهادهای عمومی"
  },
  {
    word: "elect",
    meaning: "انتخاب کردن",
    lesson: 60,
    pos: "v.",
    lessonLabel: "درس 60 — سیاست و نهادهای عمومی"
  },
  {
    word: "term",
    meaning: "دوره (تصدی)",
    lesson: 60,
    pos: "n.",
    lessonLabel: "درس 60 — سیاست و نهادهای عمومی"
  },
  {
    word: "appoint",
    meaning: "منصوب کردن",
    lesson: 60,
    pos: "v.",
    lessonLabel: "درس 60 — سیاست و نهادهای عمومی"
  },
  {
    word: "nominate",
    meaning: "نامزد کردن",
    lesson: 60,
    pos: "v.",
    lessonLabel: "درس 60 — سیاست و نهادهای عمومی"
  },
  {
    word: "official",
    meaning: "مقام رسمی",
    lesson: 60,
    pos: "n.",
    lessonLabel: "درس 60 — سیاست و نهادهای عمومی"
  },
  {
    word: "cabinet",
    meaning: "کابینه (هیئت وزیران)",
    lesson: 60,
    pos: "n.",
    lessonLabel: "درس 60 — سیاست و نهادهای عمومی"
  },
  {
    word: "federal judge",
    meaning: "قاضی فدرال",
    lesson: 60,
    lessonLabel: "درس 60 — سیاست و نهادهای عمومی"
  },
  {
    word: "majority party",
    meaning: "حزب اکثریت",
    lesson: 60,
    lessonLabel: "درس 60 — سیاست و نهادهای عمومی"
  },
  {
    word: "House of Representatives",
    meaning: "مجلس نمایندگان ( آمریکا)",
    lesson: 60,
    lessonLabel: "درس 60 — سیاست و نهادهای عمومی"
  },
  {
    word: "Senate",
    meaning: "مجلس سنا",
    lesson: 60,
    pos: "n.",
    lessonLabel: "درس 60 — سیاست و نهادهای عمومی"
  },
  {
    word: "Senator",
    meaning: "سناتور",
    lesson: 60,
    pos: "n.",
    lessonLabel: "درس 60 — سیاست و نهادهای عمومی"
  },
  {
    word: "fixed term",
    meaning: "دورهٔ ثابت",
    lesson: 60,
    lessonLabel: "درس 60 — سیاست و نهادهای عمومی"
  },
  {
    word: "judiciary",
    meaning: "قوه قضاییه",
    lesson: 60,
    pos: "n.",
    lessonLabel: "درس 60 — سیاست و نهادهای عمومی"
  },
  {
    word: "Supreme Court",
    meaning: "دیوان عالی",
    lesson: 60,
    lessonLabel: "درس 60 — سیاست و نهادهای عمومی"
  },
  {
    word: "overrule",
    meaning: "رد کردن/ملغی کردن",
    lesson: 60,
    pos: "v.",
    lessonLabel: "درس 60 — سیاست و نهادهای عمومی"
  },
  {
    word: "parliamentary government",
    meaning: "حکومت پارلمانی",
    lesson: 60,
    lessonLabel: "درس 60 — سیاست و نهادهای عمومی"
  },
  {
    word: "Parliament",
    meaning: "پارلمان",
    lesson: 60,
    pos: "n.",
    lessonLabel: "درس 60 — سیاست و نهادهای عمومی"
  },
  {
    word: "Cabinet of Ministers",
    meaning: "هیئت وزیران",
    lesson: 60,
    lessonLabel: "درس 60 — سیاست و نهادهای عمومی"
  },
  {
    word: "Prime Minister",
    meaning: "نخست‌وزیر",
    lesson: 60,
    lessonLabel: "درس 60 — سیاست و نهادهای عمومی"
  },
  {
    word: "House of Commons",
    meaning: "مجلس عوام (بریتانیا)",
    lesson: 60,
    lessonLabel: "درس 60 — سیاست و نهادهای عمومی"
  },
  {
    word: "chamber",
    meaning: "مجلس/اتاق (پارلمانی)",
    lesson: 60,
    pos: "n.",
    lessonLabel: "درس 60 — سیاست و نهادهای عمومی"
  },
  {
    word: "House of Lords",
    meaning: "مجلس لردها (بریتانیا)",
    lesson: 60,
    lessonLabel: "درس 60 — سیاست و نهادهای عمومی"
  },
  {
    word: "MP (member of parliament)",
    meaning: "عضو پارلمان",
    lesson: 60,
    lessonLabel: "درس 60 — سیاست و نهادهای عمومی"
  },
  {
    word: "constituency",
    meaning: "حوزهٔ انتخاباتی",
    lesson: 60,
    pos: "n.",
    lessonLabel: "درس 60 — سیاست و نهادهای عمومی"
  },
  {
    word: "general election",
    meaning: "انتخابات سراسری",
    lesson: 60,
    lessonLabel: "درس 60 — سیاست و نهادهای عمومی"
  },
  {
    word: "politician",
    meaning: "سیاستمدار",
    lesson: 60,
    pos: "n.",
    lessonLabel: "درس 60 — سیاست و نهادهای عمومی"
  },
  {
    word: "candidate",
    meaning: "نامزد انتخاباتی",
    lesson: 60,
    pos: "n.",
    lessonLabel: "درس 60 — سیاست و نهادهای عمومی"
  },
  {
    word: "stand (or run) for Parliament",
    meaning: "نامزد شدن برای پارلمان",
    lesson: 60,
    lessonLabel: "درس 60 — سیاست و نهادهای عمومی"
  },
  {
    word: "policy",
    meaning: "سیاست (برنامهٔ سیاسی)",
    lesson: 60,
    pos: "n.",
    lessonLabel: "درس 60 — سیاست و نهادهای عمومی"
  },
  {
    word: "polling day",
    meaning: "روز رأی‌گیری",
    lesson: 60,
    lessonLabel: "درس 60 — سیاست و نهادهای عمومی"
  },
  {
    word: "polling station",
    meaning: "محل رأی‌گیری",
    lesson: 60,
    lessonLabel: "درس 60 — سیاست و نهادهای عمومی"
  },
  {
    word: "cast a vote",
    meaning: "رأی دادن",
    lesson: 60,
    lessonLabel: "درس 60 — سیاست و نهادهای عمومی"
  },
  {
    word: "ballot paper",
    meaning: "ورقهٔ رأی",
    lesson: 60,
    lessonLabel: "درس 60 — سیاست و نهادهای عمومی"
  },
  {
    word: "majority of votes",
    meaning: "اکثریت آرا",
    lesson: 60,
    lessonLabel: "درس 60 — سیاست و نهادهای عمومی"
  },
  {
    word: "seat",
    meaning: "کرسی (پارلمانی)",
    lesson: 60,
    pos: "n.",
    lessonLabel: "درس 60 — سیاست و نهادهای عمومی"
  },
  {
    word: "marginal seat",
    meaning: "کرسی پرتنش/نزدیک",
    lesson: 60,
    lessonLabel: "درس 60 — سیاست و نهادهای عمومی"
  },
  {
    word: "by(e)-election",
    meaning: "انتخابات میان‌دوره‌ای (تک‌حوزه‌ای)",
    lesson: 60,
    lessonLabel: "درس 60 — سیاست و نهادهای عمومی"
  },
  {
    word: "referendum",
    meaning: "همه‌پرسی",
    lesson: 60,
    pos: "n.",
    lessonLabel: "درس 60 — سیاست و نهادهای عمومی"
  },
  {
    word: "vote",
    meaning: "رأی / رأی دادن",
    lesson: 60,
    pos: "n.",
    lessonLabel: "درس 60 — سیاست و نهادهای عمومی"
  },
  {
    word: "representation",
    meaning: "نمایندگی",
    lesson: 60,
    pos: "n.",
    lessonLabel: "درس 60 — سیاست و نهادهای عمومی"
  },
  {
    word: "election",
    meaning: "انتخابات",
    lesson: 60,
    pos: "n.",
    lessonLabel: "درس 60 — سیاست و نهادهای عمومی"
  },
  {
    word: "presidency",
    meaning: "ریاست‌جمهوری",
    lesson: 60,
    pos: "n.",
    lessonLabel: "درس 60 — سیاست و نهادهای عمومی"
  },
  {
    word: "revolution",
    meaning: "انقلاب",
    lesson: 60,
    pos: "n.",
    lessonLabel: "درس 60 — سیاست و نهادهای عمومی"
  },
  {
    word: "revolutionary",
    meaning: "انقلابی / انقلابی‌گر",
    lesson: 60,
    pos: "adj.",
    lessonLabel: "درس 60 — سیاست و نهادهای عمومی"
  },
  {
    word: "revolutionise",
    meaning: "انقلابی کردن",
    lesson: 60,
    pos: "v.",
    lessonLabel: "درس 60 — سیاست و نهادهای عمومی"
  }
];

export const VOCAB_PART_3: Row[] = ROWS;
