// واژگان درس‌های English Vocabulary in Use — Upper-intermediate (پارتیت 2) — استخراج VLM از اسکن PDF
// word = عین چاپ کتاب · meaning = ترجمهٔ ماشینی GLM (کلاس FA-NEW — اثبات صحت ترجمه نیست)
import type { VocabWord } from "../types";

type Row = Omit<VocabWord, "lesson"> & { lesson: number; lessonLabel: string };

const ROWS: Row[] = [
  {
    word: "prior to",
    meaning: "پیش از، قبل از",
    lesson: 21,
    pos: "phr.",
    lessonLabel: "درس 21 — زمان"
  },
  {
    word: "previously",
    meaning: "قبلاً، پیش‌تر",
    lesson: 21,
    pos: "adv.",
    lessonLabel: "درس 21 — زمان"
  },
  {
    word: "before that",
    meaning: "قبل از آن",
    lesson: 21,
    pos: "phr.",
    lessonLabel: "درس 21 — زمان"
  },
  {
    word: "earlier on",
    meaning: "پیش‌تر، قبل‌تر از آن",
    lesson: 21,
    pos: "phr.",
    lessonLabel: "درس 21 — زمان"
  },
  {
    word: "formerly",
    meaning: "سابقاً، پیش‌تر",
    lesson: 21,
    pos: "adv.",
    lessonLabel: "درس 21 — زمان"
  },
  {
    word: "while",
    meaning: "در حالی که، هنگامی که",
    lesson: 21,
    pos: "conj.",
    lessonLabel: "درس 21 — زمان"
  },
  {
    word: "as",
    meaning: "هنگامی که، در حالی که",
    lesson: 21,
    pos: "conj.",
    lessonLabel: "درس 21 — زمان"
  },
  {
    word: "just as",
    meaning: "دقیقاً همان لحظه که",
    lesson: 21,
    pos: "phr.",
    lessonLabel: "درس 21 — زمان"
  },
  {
    word: "at the very time / the very moment",
    meaning: "درست در همان زمان/لحظه",
    lesson: 21,
    pos: "phr.",
    lessonLabel: "درس 21 — زمان"
  },
  {
    word: "whenever",
    meaning: "هر وقت که",
    lesson: 21,
    pos: "conj.",
    lessonLabel: "درس 21 — زمان"
  },
  {
    word: "during",
    meaning: "در طول، در مدت",
    lesson: 21,
    pos: "prep.",
    lessonLabel: "درس 21 — زمان"
  },
  {
    word: "throughout",
    meaning: "در سراسر، در تمام مدت",
    lesson: 21,
    pos: "prep.",
    lessonLabel: "درس 21 — زمان"
  },
  {
    word: "after",
    meaning: "بعد از",
    lesson: 21,
    pos: "conj.",
    lessonLabel: "درس 21 — زمان"
  },
  {
    word: "then / after that",
    meaning: "سپس / بعد از آن",
    lesson: 21,
    pos: "phr.",
    lessonLabel: "درس 21 — زمان"
  },
  {
    word: "afterwards",
    meaning: "پس از آن، بعدها",
    lesson: 21,
    pos: "adv.",
    lessonLabel: "درس 21 — زمان"
  },
  {
    word: "following",
    meaning: "به‌دنبال، پس از",
    lesson: 21,
    pos: "prep.",
    lessonLabel: "درس 21 — زمان"
  },
  {
    word: "when",
    meaning: "وقتی که",
    lesson: 21,
    pos: "conj.",
    lessonLabel: "درس 21 — زمان"
  },
  {
    word: "as soon as",
    meaning: "به محض اینکه",
    lesson: 21,
    pos: "phr.",
    lessonLabel: "درس 21 — زمان"
  },
  {
    word: "once",
    meaning: "وقتی که (بعد از اینکه)",
    lesson: 21,
    pos: "conj.",
    lessonLabel: "درس 21 — زمان"
  },
  {
    word: "the moment / the minute",
    meaning: "لحظه‌ای که",
    lesson: 21,
    pos: "phr.",
    lessonLabel: "درس 21 — زمان"
  },
  {
    word: "the time (that)",
    meaning: "موقتی که",
    lesson: 21,
    pos: "phr.",
    lessonLabel: "درس 21 — زمان"
  },
  {
    word: "on that occasion",
    meaning: "در آن موقعیت/مناسبت",
    lesson: 21,
    pos: "phr.",
    lessonLabel: "درس 21 — زمان"
  },
  {
    word: "in the meantime",
    meaning: "در این میان، در فاصلهٔ این زمان",
    lesson: 21,
    pos: "phr.",
    lessonLabel: "درس 21 — زمان"
  },
  {
    word: "till then",
    meaning: "تا آن موقع",
    lesson: 21,
    pos: "phr.",
    lessonLabel: "درس 21 — زمان"
  },
  {
    word: "since then",
    meaning: "از آن پس",
    lesson: 21,
    pos: "phr.",
    lessonLabel: "درس 21 — زمان"
  },
  {
    word: "by the time",
    meaning: "تا زمانی که",
    lesson: 21,
    pos: "phr.",
    lessonLabel: "درس 21 — زمان"
  },
  {
    word: "unless",
    meaning: "مگر اینکه، به‌جز اینکه اگر",
    lesson: 22,
    pos: "conj.",
    lessonLabel: "درس 22 — شرط"
  },
  {
    word: "on condition that",
    meaning: "به شرط آنکه",
    lesson: 22,
    pos: "phr.",
    lessonLabel: "درس 22 — شرط"
  },
  {
    word: "in case of",
    meaning: "در صورتِ (اتفاقی)",
    lesson: 22,
    pos: "phr.",
    lessonLabel: "درس 22 — شرط"
  },
  {
    word: "in the event of",
    meaning: "در صورت وقوعِ",
    lesson: 22,
    pos: "phr.",
    lessonLabel: "درس 22 — شرط"
  },
  {
    word: "as long as",
    meaning: "تا زمانی که، به شرطی که",
    lesson: 22,
    pos: "phr.",
    lessonLabel: "درس 22 — شرط"
  },
  {
    word: "so long as",
    meaning: "تا زمانی که، به شرطی که",
    lesson: 22,
    pos: "phr.",
    lessonLabel: "درس 22 — شرط"
  },
  {
    word: "providing (that)",
    meaning: "به شرط آنکه",
    lesson: 22,
    pos: "phr.",
    lessonLabel: "درس 22 — شرط"
  },
  {
    word: "provided (that)",
    meaning: "مشروط بر اینکه",
    lesson: 22,
    pos: "phr.",
    lessonLabel: "درس 22 — شرط"
  },
  {
    word: "supposing",
    meaning: "فرض کن، اگر فرض کنیم",
    lesson: 22,
    pos: "conj.",
    lessonLabel: "درس 22 — شرط"
  },
  {
    word: "what if",
    meaning: "اگر چه شود؟، چه می‌شود اگر",
    lesson: 22,
    pos: "phr.",
    lessonLabel: "درس 22 — شرط"
  },
  {
    word: "however",
    meaning: "هر طور که، به هر نحو",
    lesson: 22,
    pos: "adv.",
    lessonLabel: "درس 22 — شرط"
  },
  {
    word: "whichever",
    meaning: "هر کدام که",
    lesson: 22,
    pos: "pron.",
    lessonLabel: "درس 22 — شرط"
  },
  {
    word: "whoever",
    meaning: "هر کس که",
    lesson: 22,
    pos: "pron.",
    lessonLabel: "درس 22 — شرط"
  },
  {
    word: "wherever",
    meaning: "هر جا که",
    lesson: 22,
    pos: "adv.",
    lessonLabel: "درس 22 — شرط"
  },
  {
    word: "no matter",
    meaning: "اهمیت ندارد که (صرف‌نظر از اینکه)",
    lesson: 22,
    pos: "phr.",
    lessonLabel: "درس 22 — شرط"
  },
  {
    word: "condition",
    meaning: "شرط، قید و شرایط",
    lesson: 22,
    pos: "n.",
    lessonLabel: "درس 22 — شرط"
  },
  {
    word: "prerequisite",
    meaning: "پیش‌نیاز، شرط لازم",
    lesson: 22,
    pos: "n.",
    lessonLabel: "درس 22 — شرط"
  },
  {
    word: "entry requirements",
    meaning: "شرایط پذیرش",
    lesson: 22,
    pos: "n.",
    lessonLabel: "درس 22 — شرط"
  },
  {
    word: "under any circumstances",
    meaning: "تحت هیچ شرایطی",
    lesson: 22,
    pos: "phr.",
    lessonLabel: "درس 22 — شرط"
  },
  {
    word: "turn up",
    meaning: "ظاهر شدن، سر زدن",
    lesson: 22,
    pos: "v.",
    lessonLabel: "درس 22 — شرط"
  },
  {
    word: "because",
    meaning: "زیرا",
    lesson: 23,
    pos: "conj.",
    lessonLabel: "درس 23 — علت، دلیل، هدف و نتیجه"
  },
  {
    word: "since",
    meaning: "از آنجا که",
    lesson: 23,
    pos: "conj.",
    lessonLabel: "درس 23 — علت، دلیل، هدف و نتیجه"
  },
  {
    word: "as",
    meaning: "چون",
    lesson: 23,
    pos: "conj.",
    lessonLabel: "درس 23 — علت، دلیل، هدف و نتیجه"
  },
  {
    word: "cause",
    meaning: "علت",
    lesson: 23,
    pos: "n.",
    lessonLabel: "درس 23 — علت، دلیل، هدف و نتیجه"
  },
  {
    word: "reason",
    meaning: "دلیل",
    lesson: 23,
    pos: "n.",
    lessonLabel: "درس 23 — علت، دلیل، هدف و نتیجه"
  },
  {
    word: "owing to",
    meaning: "به دلیل",
    lesson: 23,
    pos: "phr.",
    lessonLabel: "درس 23 — علت، دلیل، هدف و نتیجه"
  },
  {
    word: "owing to the fact that",
    meaning: "به دلیل اینکه",
    lesson: 23,
    pos: "phr.",
    lessonLabel: "درس 23 — علت، دلیل، هدف و نتیجه"
  },
  {
    word: "due to",
    meaning: "ناشی از / به علت",
    lesson: 23,
    pos: "phr.",
    lessonLabel: "درس 23 — علت، دلیل، هدف و نتیجه"
  },
  {
    word: "caused by",
    meaning: "معلولِ / ناشی از",
    lesson: 23,
    pos: "phr.",
    lessonLabel: "درس 23 — علت، دلیل، هدف و نتیجه"
  },
  {
    word: "spark (off)",
    meaning: "برانگیختن (واکنش شدید)",
    lesson: 23,
    pos: "v.",
    lessonLabel: "درس 23 — علت، دلیل، هدف و نتیجه"
  },
  {
    word: "give rise to",
    meaning: "زاده‌شدن / باعث شدن",
    lesson: 23,
    pos: "phr.",
    lessonLabel: "درس 23 — علت، دلیل، هدف و نتیجه"
  },
  {
    word: "provoke",
    meaning: "برانگیختن",
    lesson: 23,
    pos: "v.",
    lessonLabel: "درس 23 — علت، دلیل، هدف و نتیجه"
  },
  {
    word: "generate",
    meaning: "تولید کردن / ایجاد کردن",
    lesson: 23,
    pos: "v.",
    lessonLabel: "درس 23 — علت، دلیل، هدف و نتیجه"
  },
  {
    word: "bring about",
    meaning: "به‌وجود آوردن",
    lesson: 23,
    pos: "phr.",
    lessonLabel: "درس 23 — علت، دلیل، هدف و نتیجه"
  },
  {
    word: "lead to",
    meaning: "منجر شدن به",
    lesson: 23,
    pos: "phr.",
    lessonLabel: "درس 23 — علت، دلیل، هدف و نتیجه"
  },
  {
    word: "stem from",
    meaning: "ناشی شدن از / ریشه داشتن در",
    lesson: 23,
    pos: "phr.",
    lessonLabel: "درس 23 — علت، دلیل، هدف و نتیجه"
  },
  {
    word: "arise from/out of",
    meaning: "پدید آمدن از",
    lesson: 23,
    pos: "phr.",
    lessonLabel: "درس 23 — علت، دلیل، هدف و نتیجه"
  },
  {
    word: "motive",
    meaning: "انگیزه",
    lesson: 23,
    pos: "n.",
    lessonLabel: "درس 23 — علت، دلیل، هدف و نتیجه"
  },
  {
    word: "prompt",
    meaning: "وادار کردن / برانگیختن",
    lesson: 23,
    pos: "v.",
    lessonLabel: "درس 23 — علت، دلیل، هدف و نتیجه"
  },
  {
    word: "with the aim of",
    meaning: "با هدف",
    lesson: 23,
    pos: "phr.",
    lessonLabel: "درس 23 — علت، دلیل، هدف و نتیجه"
  },
  {
    word: "with a view to",
    meaning: "با نظر به / با هدف",
    lesson: 23,
    pos: "phr.",
    lessonLabel: "درس 23 — علت، دلیل، هدف و نتیجه"
  },
  {
    word: "on the grounds that",
    meaning: "به این دلیل که",
    lesson: 23,
    pos: "phr.",
    lessonLabel: "درس 23 — علت، دلیل، هدف و نتیجه"
  },
  {
    word: "purpose",
    meaning: "هدف / منظور",
    lesson: 23,
    pos: "n.",
    lessonLabel: "درس 23 — علت، دلیل، هدف و نتیجه"
  },
  {
    word: "as a result",
    meaning: "در نتیجه",
    lesson: 23,
    pos: "phr.",
    lessonLabel: "درس 23 — علت، دلیل، هدف و نتیجه"
  },
  {
    word: "as a consequence",
    meaning: "در نتیجه",
    lesson: 23,
    pos: "phr.",
    lessonLabel: "درس 23 — علت، دلیل، هدف و نتیجه"
  },
  {
    word: "consequently",
    meaning: "در نتیجه",
    lesson: 23,
    pos: "adv.",
    lessonLabel: "درس 23 — علت، دلیل، هدف و نتیجه"
  },
  {
    word: "result in",
    meaning: "منجر شدن به",
    lesson: 23,
    pos: "phr.",
    lessonLabel: "درس 23 — علت، دلیل، هدف و نتیجه"
  },
  {
    word: "outcome",
    meaning: "نتیجه / حاصل",
    lesson: 23,
    pos: "n.",
    lessonLabel: "درس 23 — علت، دلیل، هدف و نتیجه"
  },
  {
    word: "upshot",
    meaning: "نتیجه نهایی",
    lesson: 23,
    pos: "n.",
    lessonLabel: "درس 23 — علت، دلیل، هدف و نتیجه"
  },
  {
    word: "ensue",
    meaning: "درپی آمدن / رخ دادن",
    lesson: 23,
    pos: "v.",
    lessonLabel: "درس 23 — علت، دلیل، هدف و نتیجه"
  },
  {
    word: "concession",
    meaning: "اقرار؛ پذیرش بخشی از یک ادعا در برابر ادعای مهم‌تر",
    lesson: 24,
    pos: "n.",
    lessonLabel: "درس 24 — اگرچه، علی‌رغم و تضاد"
  },
  {
    word: "although",
    meaning: "اگرچه",
    lesson: 24,
    pos: "conj.",
    lessonLabel: "درس 24 — اگرچه، علی‌رغم و تضاد"
  },
  {
    word: "nevertheless",
    meaning: "با این حال",
    lesson: 24,
    pos: "adv.",
    lessonLabel: "درس 24 — اگرچه، علی‌رغم و تضاد"
  },
  {
    word: "acknowledge",
    meaning: "اعتراف‌کردن؛ تصدیق‌کردن",
    lesson: 24,
    pos: "v.",
    lessonLabel: "درس 24 — اگرچه، علی‌رغم و تضاد"
  },
  {
    word: "accept",
    meaning: "پذیرفتن",
    lesson: 24,
    pos: "v.",
    lessonLabel: "درس 24 — اگرچه، علی‌رغم و تضاد"
  },
  {
    word: "admit",
    meaning: "اعتراف‌کردن",
    lesson: 24,
    pos: "v.",
    lessonLabel: "درس 24 — اگرچه، علی‌رغم و تضاد"
  },
  {
    word: "concede",
    meaning: "اقرار‌کردن (در بحث/مناظره)",
    lesson: 24,
    pos: "v.",
    lessonLabel: "درس 24 — اگرچه، علی‌رغم و تضاد"
  },
  {
    word: "all well and good",
    meaning: "خیلی هم خوب، اما... (عبارت نیمه‌رسمی تقابل)",
    lesson: 24,
    pos: "phr.",
    lessonLabel: "درس 24 — اگرچه، علی‌رغم و تضاد"
  },
  {
    word: "after all",
    meaning: "بالاخره؛ مگر نه این‌که",
    lesson: 24,
    pos: "phr.",
    lessonLabel: "درس 24 — اگرچه، علی‌رغم و تضاد"
  },
  {
    word: "it's all very well ... but",
    meaning: "خوب است گفتنِ... اما (انتقاد آمیخته با تقابل)",
    lesson: 24,
    pos: "phr.",
    lessonLabel: "درس 24 — اگرچه، علی‌رغم و تضاد"
  },
  {
    word: "for all that",
    meaning: "با وجود همهٔ آن",
    lesson: 24,
    pos: "phr.",
    lessonLabel: "درس 24 — اگرچه، علی‌رغم و تضاد"
  },
  {
    word: "admittedly",
    meaning: "البته؛ باید اعتراف‌کرد که",
    lesson: 24,
    pos: "adv.",
    lessonLabel: "درس 24 — اگرچه، علی‌رغم و تضاد"
  },
  {
    word: "on the contrary",
    meaning: "برعکس؛ برخلاف آن",
    lesson: 24,
    pos: "phr.",
    lessonLabel: "درس 24 — اگرچه، علی‌رغم و تضاد"
  },
  {
    word: "the reverse was true",
    meaning: "برعکس آن درست بود",
    lesson: 24,
    pos: "phr.",
    lessonLabel: "درس 24 — اگرچه، علی‌رغم و تضاد"
  },
  {
    word: "quite the opposite",
    meaning: "کاملاً برعکس",
    lesson: 24,
    pos: "phr.",
    lessonLabel: "درس 24 — اگرچه، علی‌رغم و تضاد"
  },
  {
    word: "in contrast",
    meaning: "در مقابل؛ در تضاد با",
    lesson: 24,
    pos: "phr.",
    lessonLabel: "درس 24 — اگرچه، علی‌رغم و تضاد"
  },
  {
    word: "on the other hand",
    meaning: "از طرف دیگر",
    lesson: 24,
    pos: "phr.",
    lessonLabel: "درس 24 — اگرچه، علی‌رغم و تضاد"
  },
  {
    word: "poles apart",
    meaning: "کاملاً متفاوت؛ در دو قطب مخالف",
    lesson: 24,
    pos: "phr.",
    lessonLabel: "درس 24 — اگرچه، علی‌رغم و تضاد"
  },
  {
    word: "a world of difference",
    meaning: "تفاوت بسیار زیاد",
    lesson: 24,
    pos: "phr.",
    lessonLabel: "درس 24 — اگرچه، علی‌رغم و تضاد"
  },
  {
    word: "a great divide",
    meaning: "شکاف بزرگی",
    lesson: 24,
    pos: "phr.",
    lessonLabel: "درس 24 — اگرچه، علی‌رغم و تضاد"
  },
  {
    word: "a yawning gap",
    meaning: "شکاف عمیق",
    lesson: 24,
    pos: "phr.",
    lessonLabel: "درس 24 — اگرچه، علی‌رغم و تضاد"
  },
  {
    word: "a huge discrepancy",
    meaning: "ناهماهنگی/ناهم‌خوانی بزرگی",
    lesson: 24,
    pos: "phr.",
    lessonLabel: "درس 24 — اگرچه، علی‌رغم و تضاد"
  },
  {
    word: "in addition",
    meaning: "علاوه بر این",
    lesson: 25,
    pos: "phr.",
    lessonLabel: "درس 25 — افزودن"
  },
  {
    word: "furthermore",
    meaning: "علاوه بر این، افزون بر این",
    lesson: 25,
    lessonLabel: "درس 25 — افزودن"
  },
  {
    word: "moreover",
    meaning: "بعلاوه",
    lesson: 25,
    lessonLabel: "درس 25 — افزودن"
  },
  {
    word: "what's more",
    meaning: "حتی مهم‌تر اینکه",
    lesson: 25,
    pos: "phr.",
    lessonLabel: "درس 25 — افزودن"
  },
  {
    word: "what is more",
    meaning: "حتی مهم‌تر اینکه",
    lesson: 25,
    pos: "phr.",
    lessonLabel: "درس 25 — افزودن"
  },
  {
    word: "besides",
    meaning: "علاوه بر این",
    lesson: 25,
    lessonLabel: "درس 25 — افزودن"
  },
  {
    word: "equally",
    meaning: "به همان اندازه",
    lesson: 25,
    lessonLabel: "درس 25 — افزودن"
  },
  {
    word: "likewise",
    meaning: "به همین صورت",
    lesson: 25,
    lessonLabel: "درس 25 — افزودن"
  },
  {
    word: "on top of (all) that",
    meaning: "در کنار همهٔ این‌ها",
    lesson: 25,
    pos: "phr.",
    lessonLabel: "درس 25 — افزودن"
  },
  {
    word: "plus",
    meaning: "به‌علاوهٔ",
    lesson: 25,
    lessonLabel: "درس 25 — افزودن"
  },
  {
    word: "and so on",
    meaning: "و غیره",
    lesson: 25,
    pos: "phr.",
    lessonLabel: "درس 25 — افزودن"
  },
  {
    word: "etc.",
    meaning: "و غیره",
    lesson: 25,
    lessonLabel: "درس 25 — افزودن"
  },
  {
    word: "and so on and so forth",
    meaning: "و همین‌طور همین‌طور",
    lesson: 25,
    pos: "phr.",
    lessonLabel: "درس 25 — افزودن"
  },
  {
    word: "into the bargain",
    meaning: "علاوه بر آن",
    lesson: 25,
    pos: "phr.",
    lessonLabel: "درس 25 — افزودن"
  },
  {
    word: "to boot",
    meaning: "ضمناً، علاوه بر آن",
    lesson: 25,
    pos: "phr.",
    lessonLabel: "درس 25 — افزودن"
  },
  {
    word: "further to",
    meaning: "در ادامهٔ (نامه)",
    lesson: 25,
    pos: "phr.",
    lessonLabel: "درس 25 — افزودن"
  },
  {
    word: "in addition to",
    meaning: "علاوه بر",
    lesson: 25,
    pos: "phr.",
    lessonLabel: "درس 25 — افزودن"
  },
  {
    word: "as well as",
    meaning: "همراه با، علاوه بر",
    lesson: 25,
    pos: "phr.",
    lessonLabel: "درس 25 — افزودن"
  },
  {
    word: "besides / apart from",
    meaning: "علاوه بر",
    lesson: 25,
    pos: "phr.",
    lessonLabel: "درس 25 — افزودن"
  },
  {
    word: "apart from",
    meaning: "غیر از، به‌علاوهٔ",
    lesson: 25,
    pos: "phr.",
    lessonLabel: "درس 25 — افزودن"
  },
  {
    word: "along with",
    meaning: "همراه با",
    lesson: 25,
    pos: "phr.",
    lessonLabel: "درس 25 — افزودن"
  },
  {
    word: "problem",
    meaning: "مسئله",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — واژه‌های ارجاع به متن"
  },
  {
    word: "solution",
    meaning: "راه‌حل",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — واژه‌های ارجاع به متن"
  },
  {
    word: "issue",
    meaning: "مسئلهٔ بحث‌برانگیز (موضوعی که بحث و جدل برانگیخته می‌کند)",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — واژه‌های ارجاع به متن"
  },
  {
    word: "question",
    meaning: "پرسش/مسئله",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — واژه‌های ارجاع به متن"
  },
  {
    word: "topic",
    meaning: "موضوع (برای بحث یا مقاله)",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — واژه‌های ارجاع به متن"
  },
  {
    word: "aspect",
    meaning: "جنبه (بخشی از موضوع)",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — واژه‌های ارجاع به متن"
  },
  {
    word: "situation",
    meaning: "وضعیت",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — واژه‌های ارجاع به متن"
  },
  {
    word: "feature",
    meaning: "ویژگی/صفت بارز",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — واژه‌های ارجاع به متن"
  },
  {
    word: "affect",
    meaning: "تأثیر گذاشتن بر",
    lesson: 26,
    pos: "v.",
    lessonLabel: "درس 26 — واژه‌های ارجاع به متن"
  },
  {
    word: "approach",
    meaning: "رویکرد/روش",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — واژه‌های ارجاع به متن"
  },
  {
    word: "dilemma",
    meaning: "دوراهی (موقعیت دشوار انتخاب بین دو گزینه)",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — واژه‌های ارجاع به متن"
  },
  {
    word: "claim",
    meaning: "ادعا",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — واژه‌های ارجاع به متن"
  },
  {
    word: "fact",
    meaning: "واقعیت/حقیقت",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — واژه‌های ارجاع به متن"
  },
  {
    word: "point",
    meaning: "نکته",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — واژه‌های ارجاع به متن"
  },
  {
    word: "argument",
    meaning: "استدلال/دلیل",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — واژه‌های ارجاع به متن"
  },
  {
    word: "position",
    meaning: "موضع/دیدگاه",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — واژه‌های ارجاع به متن"
  },
  {
    word: "view",
    meaning: "نظر/دیدگاه",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — واژه‌های ارجاع به متن"
  },
  {
    word: "state of affairs",
    meaning: "وضعیت اوضاع و احوال",
    lesson: 26,
    pos: "phr.",
    lessonLabel: "درس 26 — واژه‌های ارجاع به متن"
  },
  {
    word: "with regard to",
    meaning: "در مورد/با توجه به",
    lesson: 26,
    pos: "phr.",
    lessonLabel: "درس 26 — واژه‌های ارجاع به متن"
  },
  {
    word: "difficulty",
    meaning: "دشواری (رسمی‌تر)",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — واژه‌های ارجاع به متن"
  },
  {
    word: "crisis",
    meaning: "بحران",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — واژه‌های ارجاع به متن"
  },
  {
    word: "matter",
    meaning: "مسئله/موضوع",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — واژه‌های ارجاع به متن"
  },
  {
    word: "response",
    meaning: "واکنش/پاسخ",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — واژه‌های ارجاع به متن"
  },
  {
    word: "reaction",
    meaning: "واکنش (به)",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — واژه‌های ارجاع به متن"
  },
  {
    word: "attitude",
    meaning: "نگرش (به)",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — واژه‌های ارجاع به متن"
  },
  {
    word: "answer",
    meaning: "پاسخ (به)",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — واژه‌های ارجاع به متن"
  },
  {
    word: "resolution",
    meaning: "راه‌حل (به)",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — واژه‌های ارجاع به متن"
  },
  {
    word: "key",
    meaning: "کلید (راه‌حل) (به)",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — واژه‌های ارجاع به متن"
  },
  {
    word: "way out",
    meaning: "راه برون‌رفت (از)",
    lesson: 26,
    pos: "phr.",
    lessonLabel: "درس 26 — واژه‌های ارجاع به متن"
  },
  {
    word: "evaluation",
    meaning: "ارزیابی [راه‌حل]",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — واژه‌های ارجاع به متن"
  },
  {
    word: "assessment",
    meaning: "ارزیابی/سنجش",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — واژه‌های ارجاع به متن"
  },
  {
    word: "judgement",
    meaning: "قضاوت",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — واژه‌های ارجاع به متن"
  },
  {
    word: "belief",
    meaning: "باور",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — واژه‌های ارجاع به متن"
  },
  {
    word: "well",
    meaning: "خب (نشانهٔ آگاهی از تغییر جهت گفت‌وگو)",
    lesson: 27,
    pos: "phr.",
    lessonLabel: "درس 27 — واژه‌های پیوند گفتار"
  },
  {
    word: "right",
    meaning: "خب / بسیار خوب (برای سازمان‌دهی کلاس)",
    lesson: 27,
    lessonLabel: "درس 27 — واژه‌های پیوند گفتار"
  },
  {
    word: "OK",
    meaning: "خیلی خب (برای سازمان‌دهی کلاس)",
    lesson: 27,
    lessonLabel: "درس 27 — واژه‌های پیوند گفتار"
  },
  {
    word: "Now",
    meaning: "حالا / خب (شروع مرحله‌ای از گفت‌وگو)",
    lesson: 27,
    lessonLabel: "درس 27 — واژه‌های پیوند گفتار"
  },
  {
    word: "So",
    meaning: "خب پس (هدایت گفت‌وگو)",
    lesson: 27,
    lessonLabel: "درس 27 — واژه‌های پیوند گفتار"
  },
  {
    word: "Good",
    meaning: "خیلی خب (بستن مرحله)",
    lesson: 27,
    lessonLabel: "درس 27 — واژه‌های پیوند گفتار"
  },
  {
    word: "Well then",
    meaning: "خب پس (شروع موضوع)",
    lesson: 27,
    lessonLabel: "درس 27 — واژه‌های پیوند گفتار"
  },
  {
    word: "Now then",
    meaning: "حالا ببین (توسط فردِ کنترل‌کنندهٔ گفت‌وگو)",
    lesson: 27,
    lessonLabel: "درس 27 — واژه‌های پیوند گفتار"
  },
  {
    word: "Fine/Great",
    meaning: "خب / عالی (پایان دادن به بحث)",
    lesson: 27,
    lessonLabel: "درس 27 — واژه‌های پیوند گفتار"
  },
  {
    word: "Mind you",
    meaning: "البته / اما باید گفت (تأمل afterwards، مثل however)",
    lesson: 27,
    lessonLabel: "درس 27 — واژه‌های پیوند گفتار"
  },
  {
    word: "Listen/Look",
    meaning: "ببین / گوش کن (معرفی پیشنهاد یا نکته)",
    lesson: 27,
    lessonLabel: "درس 27 — واژه‌های پیوند گفتار"
  },
  {
    word: "Let me see",
    meaning: "بگذار ببینم (مکث، گرفتن وقت)",
    lesson: 27,
    lessonLabel: "درس 27 — واژه‌های پیوند گفتار"
  },
  {
    word: "Hang on / Hold on",
    meaning: "صبر کن (جلوگیری از قطع حرف)",
    lesson: 27,
    lessonLabel: "درس 27 — واژه‌های پیوند گفتار"
  },
  {
    word: "You see",
    meaning: "می‌بینید که (توضیح دادن)",
    lesson: 27,
    lessonLabel: "درس 27 — واژه‌های پیوند گفتار"
  },
  {
    word: "you know",
    meaning: "می‌دانید / یعنی (مکث)",
    lesson: 27,
    lessonLabel: "درس 27 — واژه‌های پیوند گفتار"
  },
  {
    word: "sort of",
    meaning: "تقریباً / یه جورایی (مکث)",
    lesson: 27,
    lessonLabel: "درس 27 — واژه‌های پیوند گفتار"
  },
  {
    word: "Anyway",
    meaning: "به هر حال (نشانهٔ قابل بستن بودن موضوع)",
    lesson: 27,
    lessonLabel: "درس 27 — واژه‌های پیوند گفتار"
  },
  {
    word: "Still",
    meaning: "با این حال (تقابل دو ایده)",
    lesson: 27,
    lessonLabel: "درس 27 — واژه‌های پیوند گفتار"
  },
  {
    word: "At the end of the day",
    meaning: "در نهایت / آخرش (مهم‌ترین نکته)",
    lesson: 27,
    lessonLabel: "درس 27 — واژه‌های پیوند گفتار"
  },
  {
    word: "First / Firstly / First of all",
    meaning: "اول / نخست / ابتدا",
    lesson: 28,
    lessonLabel: "درس 28 — واژه‌های پیوند نوشتار"
  },
  {
    word: "Next",
    meaning: "سپس",
    lesson: 28,
    lessonLabel: "درس 28 — واژه‌های پیوند نوشتار"
  },
  {
    word: "secondly and thirdly",
    meaning: "دوم و سوم",
    lesson: 28,
    lessonLabel: "درس 28 — واژه‌های پیوند نوشتار"
  },
  {
    word: "Finally/Lastly",
    meaning: "در نهایت",
    lesson: 28,
    lessonLabel: "درس 28 — واژه‌های پیوند نوشتار"
  },
  {
    word: "Turning to",
    meaning: "در مورد (موضوع جدید)",
    lesson: 28,
    lessonLabel: "درس 28 — واژه‌های پیوند نوشتار"
  },
  {
    word: "Leaving aside",
    meaning: "کنار گذاشتن (موضوعی)",
    lesson: 28,
    lessonLabel: "درس 28 — واژه‌های پیوند نوشتار"
  },
  {
    word: "In parenthesis",
    meaning: "به‌عنوان اشاره‌ای حاشیه‌ای",
    lesson: 28,
    lessonLabel: "درس 28 — واژه‌های پیوند نوشتار"
  },
  {
    word: "In summary, to sum up",
    meaning: "خلاصه اینکه",
    lesson: 28,
    lessonLabel: "درس 28 — واژه‌های پیوند نوشتار"
  },
  {
    word: "In sum",
    meaning: "به طور خلاصه",
    lesson: 28,
    lessonLabel: "درس 28 — واژه‌های پیوند نوشتار"
  },
  {
    word: "In conclusion / to conclude",
    meaning: "در نتیجه",
    lesson: 28,
    lessonLabel: "درس 28 — واژه‌های پیوند نوشتار"
  },
  {
    word: "in other words / that is to say",
    meaning: "به عبارت دیگر",
    lesson: 28,
    lessonLabel: "درس 28 — واژه‌های پیوند نوشتار"
  },
  {
    word: "for example / for instance",
    meaning: "برای مثال",
    lesson: 28,
    lessonLabel: "درس 28 — واژه‌های پیوند نوشتار"
  },
  {
    word: "say",
    meaning: "مثلاً",
    lesson: 28,
    lessonLabel: "درس 28 — واژه‌های پیوند نوشتار"
  },
  {
    word: "Briefly",
    meaning: "به‌طور مختصر",
    lesson: 28,
    lessonLabel: "درس 28 — واژه‌های پیوند نوشتار"
  },
  {
    word: "so to speak / as it were",
    meaning: "اگر بتوان گفت",
    lesson: 28,
    lessonLabel: "درس 28 — واژه‌های پیوند نوشتار"
  },
  {
    word: "The following",
    meaning: "موارد زیر",
    lesson: 28,
    lessonLabel: "درس 28 — واژه‌های پیوند نوشتار"
  },
  {
    word: "above/earlier",
    meaning: "(در متن) بالاتر/پیش‌تر",
    lesson: 28,
    lessonLabel: "درس 28 — واژه‌های پیوند نوشتار"
  },
  {
    word: "below",
    meaning: "(در متن) پایین‌تر",
    lesson: 28,
    lessonLabel: "درس 28 — واژه‌های پیوند نوشتار"
  },
  {
    word: "overleaf",
    meaning: "در صفحهٔ بعد",
    lesson: 28,
    lessonLabel: "درس 28 — واژه‌های پیوند نوشتار"
  },
  {
    word: "further",
    meaning: "بیشتر",
    lesson: 28,
    lessonLabel: "درس 28 — واژه‌های پیوند نوشتار"
  },
  {
    word: "refer you to",
    meaning: "ارجاع دادن شما به",
    lesson: 28,
    lessonLabel: "درس 28 — واژه‌های پیوند نوشتار"
  },
  {
    word: "With reference to",
    meaning: "با اشاره به",
    lesson: 28,
    lessonLabel: "درس 28 — واژه‌های پیوند نوشتار"
  },
  {
    word: "luggage",
    meaning: "چمدان و بار مسافرتی",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "baggage (Am. Eng.)",
    meaning: "بار و چمدان (انگلیسی آمریکایی)",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "accommodation",
    meaning: "جا و محل اقامت",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "money",
    meaning: "پول",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "currency",
    meaning: "ارز، پول رایج",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "equipment",
    meaning: "تجهیزات (مثلاً برای اسکی)",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "information",
    meaning: "اطلاعات",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "soap",
    meaning: "صابون",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "toothpaste",
    meaning: "خمیر دندان",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "paper",
    meaning: "کاغذ",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "washing-up liquid",
    meaning: "مایع ظرفشویی",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "shoe polish",
    meaning: "واکس کفش",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "washing powder",
    meaning: "پودر لباسشویی",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "food",
    meaning: "غذا",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "sugar",
    meaning: "شکر",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "rice",
    meaning: "برنج",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "spaghetti",
    meaning: "اسپاگتی",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "butter",
    meaning: "کره",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "flour",
    meaning: "آرد",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "soup",
    meaning: "سوپ",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "advice",
    meaning: "توصیه، مشورت",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "knowledge",
    meaning: "دانش، معرفت",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "progress",
    meaning: "پیشرفت",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "research",
    meaning: "تحقیق، پژوهش",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "work",
    meaning: "کار",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "cloth",
    meaning: "پارچه",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "cotton",
    meaning: "پنبه، نخ پنبه‌ای",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "silk",
    meaning: "ابریشم",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "leather",
    meaning: "چرم",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "wool",
    meaning: "پشم",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "stone",
    meaning: "سنگ",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "brick",
    meaning: "آجر",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "plastic",
    meaning: "پلاستیک",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "wood/timber",
    meaning: "چوب",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "concrete",
    meaning: "بتن",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "glass",
    meaning: "شیشه",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "coal",
    meaning: "زغال‌سنگ",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "oil",
    meaning: "نفت، روغن",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "petrol",
    meaning: "بنزین",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "gas",
    meaning: "گاز",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "electricity",
    meaning: "برق",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "travel",
    meaning: "سفر",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "hair",
    meaning: "مو",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "news",
    meaning: "اخبار",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "furniture",
    meaning: "اثاثیه، مبلمان",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "scissors",
    meaning: "قیچی",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — واژه‌هایی که فقط جمع هستند"
  },
  {
    word: "pliers",
    meaning: "انبردست",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — واژه‌هایی که فقط جمع هستند"
  },
  {
    word: "pincers",
    meaning: "پنس/انبردست",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — واژه‌هایی که فقط جمع هستند"
  },
  {
    word: "tweezers",
    meaning: "پنس کوچک",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — واژه‌هایی که فقط جمع هستند"
  },
  {
    word: "tongs",
    meaning: "انبر (آشپزخانه)",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — واژه‌هایی که فقط جمع هستند"
  },
  {
    word: "headphones",
    meaning: "هدفون",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — واژه‌هایی که فقط جمع هستند"
  },
  {
    word: "binoculars",
    meaning: "دوربین دوچشمی",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — واژه‌هایی که فقط جمع هستند"
  },
  {
    word: "scales",
    meaning: "ترازو",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — واژه‌هایی که فقط جمع هستند"
  },
  {
    word: "handcuffs",
    meaning: "دستبند",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — واژه‌هایی که فقط جمع هستند"
  },
  {
    word: "shears",
    meaning: "قیچی باغبانی",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — واژه‌هایی که فقط جمع هستند"
  },
  {
    word: "glasses/spectacles",
    meaning: "عینک",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — واژه‌هایی که فقط جمع هستند"
  },
  {
    word: "goggles",
    meaning: "عینک محافظ",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — واژه‌هایی که فقط جمع هستند"
  },
  {
    word: "clothes",
    meaning: "لباس‌ها",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — واژه‌هایی که فقط جمع هستند"
  },
  {
    word: "pyjamas",
    meaning: "لباس خواب",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — واژه‌هایی که فقط جمع هستند"
  },
  {
    word: "knickers/pants",
    meaning: "شلوارک زنانه/کالسن‌شورت",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — واژه‌هایی که فقط جمع هستند"
  },
  {
    word: "underpants/pants",
    meaning: "شلوارک زیر مردانه",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — واژه‌هایی که فقط جمع هستند"
  },
  {
    word: "jeans",
    meaning: "شلوار جین",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — واژه‌هایی که فقط جمع هستند"
  },
  {
    word: "tights",
    meaning: "جوراب شلواری",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — واژه‌هایی که فقط جمع هستند"
  },
  {
    word: "jodhpurs",
    meaning: "شلوار سوارکاری",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — واژه‌هایی که فقط جمع هستند"
  },
  {
    word: "leggings",
    meaning: "لگ",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — واژه‌هایی که فقط جمع هستند"
  },
  {
    word: "dungarees",
    meaning: "لباس کار/سرهمی",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — واژه‌هایی که فقط جمع هستند"
  },
  {
    word: "shorts",
    meaning: "شلوارک",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — واژه‌هایی که فقط جمع هستند"
  },
  {
    word: "trousers",
    meaning: "شلوار",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — واژه‌هایی که فقط جمع هستند"
  },
  {
    word: "braces",
    meaning: "بند شلوار",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — واژه‌هایی که فقط جمع هستند"
  },
  {
    word: "(swimming) trunks",
    meaning: "شلوارک شنا",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — واژه‌هایی که فقط جمع هستند"
  },
  {
    word: "lodgings",
    meaning: "خانه/اقامتگاه اجاره‌ای",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — واژه‌هایی که فقط جمع هستند"
  },
  {
    word: "goods",
    meaning: "کالاها",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — واژه‌هایی که فقط جمع هستند"
  },
  {
    word: "foundations",
    meaning: "پی‌ها (زیر ساختمان)",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — واژه‌هایی که فقط جمع هستند"
  },
  {
    word: "premises",
    meaning: "مغازه/ساختمان",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — واژه‌هایی که فقط جمع هستند"
  },
  {
    word: "authorities",
    meaning: "مقامات",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — واژه‌هایی که فقط جمع هستند"
  },
  {
    word: "headquarters",
    meaning: "ستاد مرکزی",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — واژه‌هایی که فقط جمع هستند"
  },
  {
    word: "acoustics",
    meaning: "ویژگی‌های صوتی فضا",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — واژه‌هایی که فقط جمع هستند"
  },
  {
    word: "contents",
    meaning: "محتویات",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — واژه‌هایی که فقط جمع هستند"
  },
  {
    word: "looks",
    meaning: "ظاهر/قیافه",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — واژه‌هایی که فقط جمع هستند"
  },
  {
    word: "outskirts",
    meaning: "حاشیه/اطراف شهر",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — واژه‌هایی که فقط جمع هستند"
  },
  {
    word: "traffic-lights",
    meaning: "چراغ راهنمایی",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — واژه‌هایی که فقط جمع هستند"
  },
  {
    word: "stairs",
    meaning: "پله‌ها",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — واژه‌هایی که فقط جمع هستند"
  },
  {
    word: "proceeds",
    meaning: "درآمد/عواید",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — واژه‌هایی که فقط جمع هستند"
  },
  {
    word: "whereabouts",
    meaning: "محل حضور/گمشدگی",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — واژه‌هایی که فقط جمع هستند"
  },
  {
    word: "billiards",
    meaning: "بیلیارد",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — واژه‌هایی که فقط جمع هستند"
  },
  {
    word: "dominoes",
    meaning: "دومینو",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — واژه‌هایی که فقط جمع هستند"
  },
  {
    word: "draughts",
    meaning: "شطرنج (دوز)",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — واژه‌هایی که فقط جمع هستند"
  },
  {
    word: "darts",
    meaning: "دارت",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — واژه‌هایی که فقط جمع هستند"
  },
  {
    word: "bowls",
    meaning: "بوئلز (بازی گوی)",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — واژه‌هایی که فقط جمع هستند"
  },
  {
    word: "cards",
    meaning: "بازی ورق",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — واژه‌هایی که فقط جمع هستند"
  },
  {
    word: "physics",
    meaning: "فیزیک",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — واژه‌هایی که فقط جمع هستند"
  },
  {
    word: "economics",
    meaning: "اقتصاد",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — واژه‌هایی که فقط جمع هستند"
  },
  {
    word: "classics",
    meaning: "مطالعات کلاسیک",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — واژه‌هایی که فقط جمع هستند"
  },
  {
    word: "gymnastics",
    meaning: "ژیمناستیک",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — واژه‌هایی که فقط جمع هستند"
  },
  {
    word: "aerobics",
    meaning: "ایروبیک",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — واژه‌هایی که فقط جمع هستند"
  },
  {
    word: "athletics",
    meaning: "دو و میدانی",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — واژه‌هایی که فقط جمع هستند"
  },
  {
    word: "maths",
    meaning: "ریاضی",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — واژه‌هایی که فقط جمع هستند"
  },
  {
    word: "means",
    meaning: "وسیله/روش",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — واژه‌هایی که فقط جمع هستند"
  },
  {
    word: "news",
    meaning: "اخبار",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — واژه‌هایی که فقط جمع هستند"
  },
  {
    word: "spaghetti",
    meaning: "اسپاگتی",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — واژه‌هایی که فقط جمع هستند"
  },
  {
    word: "series",
    meaning: "مجموعه/سریال",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — واژه‌هایی که فقط جمع هستند"
  },
  {
    word: "glass",
    meaning: "شیشه (ماده) / لیوان (ظرف)",
    lesson: 31,
    pos: "n.",
    lessonLabel: "درس 31 — اسم‌های شمارش‌پذیر و ناپذیر با معناهای متفاوت"
  },
  {
    word: "cloth",
    meaning: "پارچه / دستمال",
    lesson: 31,
    pos: "n.",
    lessonLabel: "درس 31 — اسم‌های شمارش‌پذیر و ناپذیر با معناهای متفاوت"
  },
  {
    word: "fish",
    meaning: "ماهی (به‌عنوان غذا) / ماهی (موجود زنده)",
    lesson: 31,
    pos: "n.",
    lessonLabel: "درس 31 — اسم‌های شمارش‌پذیر و ناپذیر با معناهای متفاوت"
  },
  {
    word: "work",
    meaning: "کار / اثر (شاهکار)",
    lesson: 31,
    pos: "n.",
    lessonLabel: "درس 31 — اسم‌های شمارش‌پذیر و ناپذیر با معناهای متفاوت"
  },
  {
    word: "drink / a drink",
    meaning: "نوشیدنی/الکل / یک نوشیدنی",
    lesson: 31,
    pos: "n.",
    lessonLabel: "درس 31 — اسم‌های شمارش‌پذیر و ناپذیر با معناهای متفاوت"
  },
  {
    word: "hair / a hair",
    meaning: "مو (مجموعه) / یک تار مو",
    lesson: 31,
    pos: "n.",
    lessonLabel: "درس 31 — اسم‌های شمارش‌پذیر و ناپذیر با معناهای متفاوت"
  },
  {
    word: "paper / a paper",
    meaning: "کاغذ / روزنامه",
    lesson: 31,
    pos: "n.",
    lessonLabel: "درس 31 — اسم‌های شمارش‌پذیر و ناپذیر با معناهای متفاوت"
  },
  {
    word: "land / a land",
    meaning: "زمین / سرزمین",
    lesson: 31,
    pos: "n.",
    lessonLabel: "درس 31 — اسم‌های شمارش‌پذیر و ناپذیر با معناهای متفاوت"
  },
  {
    word: "people / a people",
    meaning: "مردم / قوم، ملت",
    lesson: 31,
    pos: "n.",
    lessonLabel: "درس 31 — اسم‌های شمارش‌پذیر و ناپذیر با معناهای متفاوت"
  },
  {
    word: "home / a home",
    meaning: "خانه (محل زندگی) / مؤسسه نگهداری",
    lesson: 31,
    pos: "n.",
    lessonLabel: "درس 31 — اسم‌های شمارش‌پذیر و ناپذیر با معناهای متفاوت"
  },
  {
    word: "policy / a policy",
    meaning: "سیاست / بیمه‌نامه، سند",
    lesson: 31,
    pos: "n.",
    lessonLabel: "درس 31 — اسم‌های شمارش‌پذیر و ناپذیر با معناهای متفاوت"
  },
  {
    word: "trade / a trade",
    meaning: "تجارت / شغل، حرفه",
    lesson: 31,
    pos: "n.",
    lessonLabel: "درس 31 — اسم‌های شمارش‌پذیر و ناپذیر با معناهای متفاوت"
  },
  {
    word: "coffee/tea",
    meaning: "قهوه/چای (ماده)",
    lesson: 31,
    pos: "n.",
    lessonLabel: "درس 31 — اسم‌های شمارش‌پذیر و ناپذیر با معناهای متفاوت"
  },
  {
    word: "a coffee and two teas",
    meaning: "یک قهوه و دو چای",
    lesson: 31,
    pos: "n.",
    lessonLabel: "درس 31 — اسم‌های شمارش‌پذیر و ناپذیر با معناهای متفاوت"
  },
  {
    word: "potato",
    meaning: "سیب‌زمینی",
    lesson: 31,
    pos: "n.",
    lessonLabel: "درس 31 — اسم‌های شمارش‌پذیر و ناپذیر با معناهای متفاوت"
  },
  {
    word: "chocolate",
    meaning: "شکلات (ماده) / یک شکلات",
    lesson: 31,
    pos: "n.",
    lessonLabel: "درس 31 — اسم‌های شمارش‌پذیر و ناپذیر با معناهای متفاوت"
  },
  {
    word: "salt and pepper",
    meaning: "نمک و فلفل",
    lesson: 31,
    pos: "n.",
    lessonLabel: "درس 31 — اسم‌های شمارش‌پذیر و ناپذیر با معناهای متفاوت"
  },
  {
    word: "a pepper",
    meaning: "یک فلفل دلمه‌ای",
    lesson: 31,
    pos: "n.",
    lessonLabel: "درس 31 — اسم‌های شمارش‌پذیر و ناپذیر با معناهای متفاوت"
  },
  {
    word: "a hot dog with onion",
    meaning: "یک هات‌داگ با پیاز",
    lesson: 31,
    pos: "n.",
    lessonLabel: "درس 31 — اسم‌های شمارش‌پذیر و ناپذیر با معناهای متفاوت"
  },
  {
    word: "an onion",
    meaning: "یک پیاز",
    lesson: 31,
    pos: "n.",
    lessonLabel: "درس 31 — اسم‌های شمارش‌پذیر و ناپذیر با معناهای متفاوت"
  },
  {
    word: "an iron",
    meaning: "اتو / آهن (فلز)",
    lesson: 31,
    pos: "n.",
    lessonLabel: "درس 31 — اسم‌های شمارش‌پذیر و ناپذیر با معناهای متفاوت"
  },
  {
    word: "a wood",
    meaning: "یک جنگل کوچک / چوب",
    lesson: 31,
    pos: "n.",
    lessonLabel: "درس 31 — اسم‌های شمارش‌پذیر و ناپذیر با معناهای متفاوت"
  },
  {
    word: "a rubber",
    meaning: "پاک‌کن / لاستیک",
    lesson: 31,
    pos: "n.",
    lessonLabel: "درس 31 — اسم‌های شمارش‌پذیر و ناپذیر با معناهای متفاوت"
  },
  {
    word: "a tape",
    meaning: "یک نوار (ضبط صدا)",
    lesson: 31,
    pos: "n.",
    lessonLabel: "درس 31 — اسم‌های شمارش‌پذیر و ناپذیر با معناهای متفاوت"
  },
  {
    word: "a group of people",
    meaning: "گروهی از مردم (تعداد کمتر)",
    lesson: 32,
    pos: "phr.",
    lessonLabel: "درس 32 — اسم‌های گروهی"
  },
  {
    word: "a crowd of people",
    meaning: "جمعیت زیادی از مردم",
    lesson: 32,
    pos: "phr.",
    lessonLabel: "درس 32 — اسم‌های گروهی"
  },
  {
    word: "a gang of thieves",
    meaning: "باند دزدها (بار منفی)",
    lesson: 32,
    pos: "phr.",
    lessonLabel: "درس 32 — اسم‌های گروهی"
  },
  {
    word: "a flock of",
    meaning: "گله‌ای از (گوسفند یا پرندگان)",
    lesson: 32,
    pos: "phr.",
    lessonLabel: "درس 32 — اسم‌های گروهی"
  },
  {
    word: "a herd of",
    meaning: "گله‌ای از (گاو، آهو، بز)",
    lesson: 32,
    pos: "phr.",
    lessonLabel: "درس 32 — اسم‌های گروهی"
  },
  {
    word: "a shoal of",
    meaning: "گله‌ای از (ماهی)",
    lesson: 32,
    pos: "phr.",
    lessonLabel: "درس 32 — اسم‌های گروهی"
  },
  {
    word: "a swarm of",
    meaning: "دسته‌ای از (حشرات، معمولاً پرنده)",
    lesson: 32,
    pos: "phr.",
    lessonLabel: "درس 32 — اسم‌های گروهی"
  },
  {
    word: "a pack of",
    meaning: "گله/دسته‌ای از (سگ، کفتار، گرگ؛ نیز ورق‌بازی)",
    lesson: 32,
    pos: "phr.",
    lessonLabel: "درس 32 — اسم‌های گروهی"
  },
  {
    word: "a team of",
    meaning: "تیمی از (جراحان/متخصصان/...)",
    lesson: 32,
    pos: "phr.",
    lessonLabel: "درس 32 — اسم‌های گروهی"
  },
  {
    word: "crew",
    meaning: "خدمه (کشتی/آمبولانس/هواپیما)",
    lesson: 32,
    pos: "n.",
    lessonLabel: "درس 32 — اسم‌های گروهی"
  },
  {
    word: "company",
    meaning: "گروه بازیگران",
    lesson: 32,
    pos: "n.",
    lessonLabel: "درس 32 — اسم‌های گروهی"
  },
  {
    word: "cast",
    meaning: "بازیگران یک فیلم یا نمایش",
    lesson: 32,
    pos: "n.",
    lessonLabel: "درس 32 — اسم‌های گروهی"
  },
  {
    word: "public",
    meaning: "مردم/عامه",
    lesson: 32,
    pos: "n.",
    lessonLabel: "درس 32 — اسم‌های گروهی"
  },
  {
    word: "staff",
    meaning: "کارکنان",
    lesson: 32,
    pos: "n.",
    lessonLabel: "درس 32 — اسم‌های گروهی"
  },
  {
    word: "a row of",
    meaning: "رديفی از",
    lesson: 32,
    pos: "phr.",
    lessonLabel: "درس 32 — اسم‌های گروهی"
  },
  {
    word: "a clump of",
    meaning: "دسته/خوشه‌ای از (درختان)",
    lesson: 32,
    pos: "phr.",
    lessonLabel: "درس 32 — اسم‌های گروهی"
  },
  {
    word: "a range of",
    meaning: "رشته‌ای از (تپه‌ها/کوه‌ها)",
    lesson: 32,
    pos: "phr.",
    lessonLabel: "درس 32 — اسم‌های گروهی"
  },
  {
    word: "a group of islands",
    meaning: "گروهی از جزیره‌ها",
    lesson: 32,
    pos: "phr.",
    lessonLabel: "درس 32 — اسم‌های گروهی"
  },
  {
    word: "a pair of",
    meaning: "یک جفت",
    lesson: 32,
    pos: "phr.",
    lessonLabel: "درس 32 — اسم‌های گروهی"
  },
  {
    word: "a couple of",
    meaning: "دو تا (تقریبی)",
    lesson: 32,
    pos: "phr.",
    lessonLabel: "درس 32 — اسم‌های گروهی"
  },
  {
    word: "a pile/heap of",
    meaning: "توده/کپه‌ای از (کاغذ، لباس و... )",
    lesson: 32,
    pos: "phr.",
    lessonLabel: "درس 32 — اسم‌های گروهی"
  },
  {
    word: "a bunch of",
    meaning: "دسته‌ای از (گل، انگور، موز)",
    lesson: 32,
    pos: "phr.",
    lessonLabel: "درس 32 — اسم‌های گروهی"
  },
  {
    word: "a stack of",
    meaning: "پشته‌ای از (صندلی، جعبه و... )",
    lesson: 32,
    pos: "phr.",
    lessonLabel: "درس 32 — اسم‌های گروهی"
  },
  {
    word: "a set of",
    meaning: "مجموعه‌ای از (ابزار و... )",
    lesson: 32,
    pos: "phr.",
    lessonLabel: "درس 32 — اسم‌های گروهی"
  },
  {
    word: "a piece of",
    meaning: "یک تکه/قطعه از",
    lesson: 33,
    pos: "phr.",
    lessonLabel: "درس 33 — قابل‌شمارش کردن اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "a (little) bit of",
    meaning: "یک (کمی) تکه/مقدار از",
    lesson: 33,
    pos: "phr.",
    lessonLabel: "درس 33 — قابل‌شمارش کردن اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "pieces of",
    meaning: "تکه‌های",
    lesson: 33,
    pos: "phr.",
    lessonLabel: "درس 33 — قابل‌شمارش کردن اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "bits of",
    meaning: "تکه‌ها/مقدارهای",
    lesson: 33,
    pos: "phr.",
    lessonLabel: "درس 33 — قابل‌شمارش کردن اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "showers (of rain)",
    meaning: "رگبارهای (باران)",
    lesson: 33,
    pos: "phr.",
    lessonLabel: "درس 33 — قابل‌شمارش کردن اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "spell (of weather)",
    meaning: "دورهٔ (آب‌وهوایی)",
    lesson: 33,
    pos: "phr.",
    lessonLabel: "درس 33 — قابل‌شمارش کردن اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "rumbles of thunder",
    meaning: "غرش‌های تندر",
    lesson: 33,
    pos: "phr.",
    lessonLabel: "درس 33 — قابل‌شمارش کردن اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "flashes of lightning",
    meaning: "برق‌های آذرخش",
    lesson: 33,
    pos: "phr.",
    lessonLabel: "درس 33 — قابل‌شمارش کردن اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "claps of thunder",
    meaning: "تک‌تک‌های صدای تندر",
    lesson: 33,
    pos: "phr.",
    lessonLabel: "درس 33 — قابل‌شمارش کردن اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "spots of rain",
    meaning: "قطره‌های باران",
    lesson: 33,
    pos: "phr.",
    lessonLabel: "درس 33 — قابل‌شمارش کردن اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "gusts of wind",
    meaning: "وزش‌های باد",
    lesson: 33,
    pos: "phr.",
    lessonLabel: "درس 33 — قابل‌شمارش کردن اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "a loaf of bread",
    meaning: "یک قرص نان",
    lesson: 33,
    pos: "phr.",
    lessonLabel: "درس 33 — قابل‌شمارش کردن اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "slices of ham",
    meaning: "برش‌های ژامبون",
    lesson: 33,
    pos: "phr.",
    lessonLabel: "درس 33 — قابل‌شمارش کردن اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "bars of chocolate",
    meaning: "قالب‌های شکلات",
    lesson: 33,
    pos: "phr.",
    lessonLabel: "درس 33 — قابل‌شمارش کردن اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "a tube of toothpaste",
    meaning: "یک تیوب خمیردندان",
    lesson: 33,
    pos: "phr.",
    lessonLabel: "درس 33 — قابل‌شمارش کردن اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "cartons of milk",
    meaning: "بسته‌های شیر",
    lesson: 33,
    pos: "phr.",
    lessonLabel: "درس 33 — قابل‌شمارش کردن اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "bars of soap",
    meaning: "تکه‌های صابون",
    lesson: 33,
    pos: "phr.",
    lessonLabel: "درس 33 — قابل‌شمارش کردن اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "blade of grass",
    meaning: "تیغهٔ علف",
    lesson: 33,
    pos: "phr.",
    lessonLabel: "درس 33 — قابل‌شمارش کردن اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "cloud of smoke",
    meaning: "ابر دود",
    lesson: 33,
    pos: "phr.",
    lessonLabel: "درس 33 — قابل‌شمارش کردن اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "puffs of smoke",
    meaning: "پف‌های دود",
    lesson: 33,
    pos: "phr.",
    lessonLabel: "درس 33 — قابل‌شمارش کردن اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "a breath of fresh air",
    meaning: "یک نفس هوای تازه",
    lesson: 33,
    pos: "phr.",
    lessonLabel: "درس 33 — قابل‌شمارش کردن اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "lump of coal",
    meaning: "تکهٔ زغال",
    lesson: 33,
    pos: "phr.",
    lessonLabel: "درس 33 — قابل‌شمارش کردن اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "a stroke of luck",
    meaning: "یک اقبال/شانس",
    lesson: 33,
    pos: "phr.",
    lessonLabel: "درس 33 — قابل‌شمارش کردن اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "a stroke of work",
    meaning: "یک ذره کار",
    lesson: 33,
    pos: "phr.",
    lessonLabel: "درس 33 — قابل‌شمارش کردن اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "a fit of temper",
    meaning: "یک دورهٔ عصبانیت",
    lesson: 33,
    pos: "phr.",
    lessonLabel: "درس 33 — قابل‌شمارش کردن اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "means of transport",
    meaning: "وسیلهٔ حمل‌ونقل",
    lesson: 33,
    pos: "phr.",
    lessonLabel: "درس 33 — قابل‌شمارش کردن اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "article/item of clothing",
    meaning: "قلم/قطعهٔ لباس",
    lesson: 33,
    pos: "phr.",
    lessonLabel: "درس 33 — قابل‌شمارش کردن اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "item of news",
    meaning: "قلم خبر",
    lesson: 33,
    pos: "phr.",
    lessonLabel: "درس 33 — قابل‌شمارش کردن اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "a state of",
    meaning: "وضعیت/حالتِ",
    lesson: 33,
    pos: "phr.",
    lessonLabel: "درس 33 — قابل‌شمارش کردن اسم‌های غیرقابل‌شمارش"
  },
  {
    word: "bag",
    meaning: "کیسه، ساک",
    lesson: 34,
    pos: "n.",
    lessonLabel: "درس 34 — ظرف‌ها و محتویات"
  },
  {
    word: "barrel",
    meaning: "بشکه",
    lesson: 34,
    pos: "n.",
    lessonLabel: "درس 34 — ظرف‌ها و محتویات"
  },
  {
    word: "basket",
    meaning: "سبد",
    lesson: 34,
    pos: "n.",
    lessonLabel: "درس 34 — ظرف‌ها و محتویات"
  },
  {
    word: "bottle",
    meaning: "بطری",
    lesson: 34,
    pos: "n.",
    lessonLabel: "درس 34 — ظرف‌ها و محتویات"
  },
  {
    word: "bowl",
    meaning: "کاسه",
    lesson: 34,
    pos: "n.",
    lessonLabel: "درس 34 — ظرف‌ها و محتویات"
  },
  {
    word: "box",
    meaning: "جعبه",
    lesson: 34,
    pos: "n.",
    lessonLabel: "درس 34 — ظرف‌ها و محتویات"
  },
  {
    word: "bucket",
    meaning: "سطل",
    lesson: 34,
    pos: "n.",
    lessonLabel: "درس 34 — ظرف‌ها و محتویات"
  },
  {
    word: "can",
    meaning: "قوطی",
    lesson: 34,
    pos: "n.",
    lessonLabel: "درس 34 — ظرف‌ها و محتویات"
  },
  {
    word: "carton",
    meaning: "جعبه مقوایی (مثل بسته شیر)",
    lesson: 34,
    pos: "n.",
    lessonLabel: "درس 34 — ظرف‌ها و محتویات"
  },
  {
    word: "case",
    meaning: "جعبه/صندوق (مثل جعبه عینک)",
    lesson: 34,
    pos: "n.",
    lessonLabel: "درس 34 — ظرف‌ها و محتویات"
  },
  {
    word: "crate",
    meaning: "صندوق (جعبه چوبی)",
    lesson: 34,
    pos: "n.",
    lessonLabel: "درس 34 — ظرف‌ها و محتویات"
  },
  {
    word: "glass",
    meaning: "لیوان",
    lesson: 34,
    pos: "n.",
    lessonLabel: "درس 34 — ظرف‌ها و محتویات"
  },
  {
    word: "jar",
    meaning: "شیشه/ظرف دردار",
    lesson: 34,
    pos: "n.",
    lessonLabel: "درس 34 — ظرف‌ها و محتویات"
  },
  {
    word: "jug",
    meaning: "کوزه، پارچ",
    lesson: 34,
    pos: "n.",
    lessonLabel: "درس 34 — ظرف‌ها و محتویات"
  },
  {
    word: "mug",
    meaning: "ماگ، استکان بزرگ",
    lesson: 34,
    pos: "n.",
    lessonLabel: "درس 34 — ظرف‌ها و محتویات"
  },
  {
    word: "pack",
    meaning: "بسته (مثل بسته کارت)",
    lesson: 34,
    pos: "n.",
    lessonLabel: "درس 34 — ظرف‌ها و محتویات"
  },
  {
    word: "packet",
    meaning: "بسته کوچک، پاکت",
    lesson: 34,
    pos: "n.",
    lessonLabel: "درس 34 — ظرف‌ها و محتویات"
  },
  {
    word: "pan",
    meaning: "قابلمه",
    lesson: 34,
    pos: "n.",
    lessonLabel: "درس 34 — ظرف‌ها و محتویات"
  },
  {
    word: "pot",
    meaning: "گلدان، دیگ، ظرف",
    lesson: 34,
    pos: "n.",
    lessonLabel: "درس 34 — ظرف‌ها و محتویات"
  },
  {
    word: "sack",
    meaning: "گونی، کیسه بزرگ",
    lesson: 34,
    pos: "n.",
    lessonLabel: "درس 34 — ظرف‌ها و محتویات"
  },
  {
    word: "tin",
    meaning: "قوطی حلبی",
    lesson: 34,
    pos: "n.",
    lessonLabel: "درس 34 — ظرف‌ها و محتویات"
  },
  {
    word: "tub",
    meaning: "تشتی، پالته، کاسه دردار",
    lesson: 34,
    pos: "n.",
    lessonLabel: "درس 34 — ظرف‌ها و محتویات"
  },
  {
    word: "tube",
    meaning: "لوله خمیری (مثل خمیردندان)",
    lesson: 34,
    pos: "n.",
    lessonLabel: "درس 34 — ظرف‌ها و محتویات"
  },
  {
    word: "The United States / US(A)",
    meaning: "ایالات متحده آمریکا",
    lesson: 35,
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "The United Kingdom / UK",
    meaning: "بریتانیا",
    lesson: 35,
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "The Netherlands",
    meaning: "هلند",
    lesson: 35,
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "The Philippines",
    meaning: "فیلیپین",
    lesson: 35,
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "The Commonwealth",
    meaning: "همسود",
    lesson: 35,
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "Lebanon",
    meaning: "لبنان",
    lesson: 35,
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "Gambia",
    meaning: "گامبیا",
    lesson: 35,
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "Ukraine",
    meaning: "اوکراین",
    lesson: 35,
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "Sudan",
    meaning: "سودان",
    lesson: 35,
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "British",
    meaning: "بریتانیایی",
    lesson: 35,
    pos: "adj.",
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "Danish",
    meaning: "دانمارکی",
    lesson: 35,
    pos: "adj.",
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "Flemish",
    meaning: "فلاندرسی",
    lesson: 35,
    pos: "adj.",
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "Irish",
    meaning: "ایرلندی",
    lesson: 35,
    pos: "adj.",
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "Polish",
    meaning: "لهستانی",
    lesson: 35,
    pos: "adj.",
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "Spanish",
    meaning: "اسپانیایی",
    lesson: 35,
    pos: "adj.",
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "Turkish",
    meaning: "ترکیه‌ای",
    lesson: 35,
    pos: "adj.",
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "American",
    meaning: "آمریکایی",
    lesson: 35,
    pos: "adj.",
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "Australian",
    meaning: "استرالیایی",
    lesson: 35,
    pos: "adj.",
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "Brazilian",
    meaning: "برزیلی",
    lesson: 35,
    pos: "adj.",
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "Canadian",
    meaning: "کانادایی",
    lesson: 35,
    pos: "adj.",
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "Korean",
    meaning: "کره‌ای",
    lesson: 35,
    pos: "adj.",
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "Russian",
    meaning: "روسی",
    lesson: 35,
    pos: "adj.",
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "Chinese",
    meaning: "چینی",
    lesson: 35,
    pos: "adj.",
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "Japanese",
    meaning: "ژاپنی",
    lesson: 35,
    pos: "adj.",
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "Maltese",
    meaning: "مالتی",
    lesson: 35,
    pos: "adj.",
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "Portuguese",
    meaning: "پرتغالی",
    lesson: 35,
    pos: "adj.",
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "Taiwanese",
    meaning: "تایوانی",
    lesson: 35,
    pos: "adj.",
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "Vietnamese",
    meaning: "ویتنامی",
    lesson: 35,
    pos: "adj.",
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "Bangladeshi",
    meaning: "بنگلادشی",
    lesson: 35,
    pos: "adj.",
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "Iraqi",
    meaning: "عراقی",
    lesson: 35,
    pos: "adj.",
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "Israeli",
    meaning: "اسرائیلی",
    lesson: 35,
    pos: "adj.",
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "Kuwaiti",
    meaning: "کویتی",
    lesson: 35,
    pos: "adj.",
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "Pakistani",
    meaning: "پاکستانی",
    lesson: 35,
    pos: "adj.",
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "Yemeni",
    meaning: "یمنی",
    lesson: 35,
    pos: "adj.",
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "Arabic",
    meaning: "عربی",
    lesson: 35,
    pos: "adj.",
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "Icelandic",
    meaning: "ایسلندی",
    lesson: 35,
    pos: "adj.",
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "Slavonic",
    meaning: "اسلاوی",
    lesson: 35,
    pos: "adj.",
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "Cypriot",
    meaning: "قبرسی",
    lesson: 35,
    pos: "adj.",
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "Dutch",
    meaning: "هلندی",
    lesson: 35,
    pos: "adj.",
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "Greek",
    meaning: "یونانی",
    lesson: 35,
    pos: "adj.",
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "Swiss",
    meaning: "سوئیسی",
    lesson: 35,
    pos: "adj.",
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "Thai",
    meaning: "تایلندی",
    lesson: 35,
    pos: "adj.",
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "a Finn",
    meaning: "یک فنلاندی",
    lesson: 35,
    pos: "n.",
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "a Swede",
    meaning: "یک سوئدی",
    lesson: 35,
    pos: "n.",
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "a Turk",
    meaning: "یک ترک",
    lesson: 35,
    pos: "n.",
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "a Spaniard",
    meaning: "یک اسپانیایی",
    lesson: 35,
    pos: "n.",
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "a Dane",
    meaning: "یک دانمارکی",
    lesson: 35,
    pos: "n.",
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "a Briton",
    meaning: "یک بریتانیایی",
    lesson: 35,
    pos: "n.",
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "an Arab",
    meaning: "یک عرب",
    lesson: 35,
    pos: "n.",
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "a German",
    meaning: "یک آلمانی",
    lesson: 35,
    pos: "n.",
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "an Italian",
    meaning: "یک ایتالیایی",
    lesson: 35,
    pos: "n.",
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "a Belgian",
    meaning: "یک بلژیکی",
    lesson: 35,
    pos: "n.",
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "a Catalan",
    meaning: "یک کاتالان",
    lesson: 35,
    pos: "n.",
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "a Greek",
    meaning: "یک یونانی",
    lesson: 35,
    pos: "n.",
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "an African",
    meaning: "یک آفریقایی",
    lesson: 35,
    pos: "n.",
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "a European",
    meaning: "یک اروپایی",
    lesson: 35,
    pos: "n.",
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "a Dutch man",
    meaning: "یک مرد هلندی",
    lesson: 35,
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "a French woman",
    meaning: "یک زن فرانسوی",
    lesson: 35,
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "an Irish person",
    meaning: "یک شخص ایرلندی",
    lesson: 35,
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "an Icelandic man",
    meaning: "یک مرد ایسلندی",
    lesson: 35,
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "The Arctic",
    meaning: "قطب شمال",
    lesson: 35,
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "Scandinavia",
    meaning: "اسکاندیناوی",
    lesson: 35,
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "North America",
    meaning: "آمریکای شمالی",
    lesson: 35,
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "Europe",
    meaning: "اروپا",
    lesson: 35,
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "Asia",
    meaning: "آسیا",
    lesson: 35,
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "The Atlantic",
    meaning: "اقیانوس اطلس",
    lesson: 35,
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "The Mediterranean",
    meaning: "دریای مدیترانه",
    lesson: 35,
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "North Africa",
    meaning: "شمال آفریقا",
    lesson: 35,
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "The Middle East",
    meaning: "خاورمیانه",
    lesson: 35,
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "The Far East",
    meaning: "خاور دور",
    lesson: 35,
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "The Caribbean",
    meaning: "منطقه کارائیب",
    lesson: 35,
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "The Pacific",
    meaning: "اقیانوس آرام",
    lesson: 35,
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "Latin America",
    meaning: "آمریکای لاتین",
    lesson: 35,
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "Central Africa",
    meaning: "آفریقای مرکزی",
    lesson: 35,
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "The Indian Ocean",
    meaning: "اقیانوس هند",
    lesson: 35,
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "Southern Africa",
    meaning: "آفریقای جنوبی",
    lesson: 35,
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "Australasia",
    meaning: "استرالازیا",
    lesson: 35,
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "The Antarctic",
    meaning: "قطب جنوب",
    lesson: 35,
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "ethnic groups",
    meaning: "گروه‌های قومی",
    lesson: 35,
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "regional groups",
    meaning: "گروه‌های منطقه‌ای",
    lesson: 35,
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "Afro-Caribbeans",
    meaning: "آفریقا-کارائیبی‌ها",
    lesson: 35,
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "Asians",
    meaning: "آسیایی‌ها",
    lesson: 35,
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "Latin Americans",
    meaning: "آمریکایی‌های لاتین",
    lesson: 35,
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "North African",
    meaning: "شمال آفریقایی",
    lesson: 35,
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "Southern African",
    meaning: "جنوب آفریقایی",
    lesson: 35,
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "Melanesian",
    meaning: "ملانزی",
    lesson: 35,
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "dialects",
    meaning: "گویش‌ها",
    lesson: 35,
    pos: "n.",
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "native language",
    meaning: "زبان مادری",
    lesson: 35,
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "first language",
    meaning: "زبان اول",
    lesson: 35,
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "second and third languages",
    meaning: "زبان‌های دوم و سوم",
    lesson: 35,
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "bilingual",
    meaning: "دوزبانه",
    lesson: 35,
    pos: "adj.",
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "multilingual",
    meaning: "چندزبانه",
    lesson: 35,
    pos: "adj.",
    lessonLabel: "درس 35 — کشورها، ملیت‌ها و زبان‌ها"
  },
  {
    word: "chilly",
    meaning: "خنک و سرد",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — هوا"
  },
  {
    word: "frost",
    meaning: "یخ‌زدگی/شبنم یخ، پوسته یخ",
    lesson: 36,
    pos: "n.",
    lessonLabel: "درس 36 — هوا"
  },
  {
    word: "icy",
    meaning: "یخ‌زده، پر از یخ",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — هوا"
  },
  {
    word: "sleet",
    meaning: "باران و برف مخلوط",
    lesson: 36,
    pos: "n.",
    lessonLabel: "درس 36 — هوا"
  },
  {
    word: "slush",
    meaning: "برف آب‌شده کثیف",
    lesson: 36,
    pos: "n.",
    lessonLabel: "درس 36 — هوا"
  },
  {
    word: "settle",
    meaning: "نشستن (برف به‌صورت پوشش سفید)",
    lesson: 36,
    lessonLabel: "درس 36 — هوا"
  },
  {
    word: "blizzard",
    meaning: "کولاک، برف‌بوران شدید",
    lesson: 36,
    pos: "n.",
    lessonLabel: "درس 36 — هوا"
  },
  {
    word: "snowdrift",
    meaning: "تپه برف ناشی از باد",
    lesson: 36,
    pos: "n.",
    lessonLabel: "درس 36 — هوا"
  },
  {
    word: "freezing",
    meaning: "زیر صفر، یخ‌زن",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — هوا"
  },
  {
    word: "thaw",
    meaning: "آب شدن (یخ/زمین یخ‌زده)",
    lesson: 36,
    pos: "v.",
    lessonLabel: "درس 36 — هوا"
  },
  {
    word: "melt",
    meaning: "ذوب شدن",
    lesson: 36,
    pos: "v.",
    lessonLabel: "درس 36 — هوا"
  },
  {
    word: "close",
    meaning: "خفه، گرم و ناخوشایند",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — هوا"
  },
  {
    word: "stifling",
    meaning: "تند و خفه‌کننده (گرما)",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — هوا"
  },
  {
    word: "muggy",
    meaning: "گرم و کمی مرطوب",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — هوا"
  },
  {
    word: "humid",
    meaning: "مرطوب و گرم",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — هوا"
  },
  {
    word: "scorching",
    meaning: "سوزان (غالباً مثبت)",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — هوا"
  },
  {
    word: "boiling",
    meaning: "جوشان، خیلی داغ (غالباً منفی)",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — هوا"
  },
  {
    word: "mild",
    meaning: "معتدل",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — هوا"
  },
  {
    word: "heatwave",
    meaning: "موج گرما",
    lesson: 36,
    pos: "n.",
    lessonLabel: "درس 36 — هوا"
  },
  {
    word: "damp",
    meaning: "نم‌دار، مرطوب",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — هوا"
  },
  {
    word: "drizzle",
    meaning: "نم‌نم باران",
    lesson: 36,
    pos: "n.",
    lessonLabel: "درس 36 — هوا"
  },
  {
    word: "pour down",
    meaning: "شدید باریدن",
    lesson: 36,
    pos: "phr.",
    lessonLabel: "درس 36 — هوا"
  },
  {
    word: "downpour",
    meaning: "بارش شدید",
    lesson: 36,
    pos: "n.",
    lessonLabel: "درس 36 — هوا"
  },
  {
    word: "torrential rain",
    meaning: "باران سیل‌آسا",
    lesson: 36,
    pos: "phr.",
    lessonLabel: "درس 36 — هوا"
  },
  {
    word: "flood",
    meaning: "سیل",
    lesson: 36,
    pos: "n.",
    lessonLabel: "درس 36 — هوا"
  },
  {
    word: "shower",
    meaning: "رگبار کوتاه",
    lesson: 36,
    pos: "n.",
    lessonLabel: "درس 36 — هوا"
  },
  {
    word: "storm",
    meaning: "طوفان",
    lesson: 36,
    pos: "n.",
    lessonLabel: "درس 36 — هوا"
  },
  {
    word: "thunderstorm",
    meaning: "رعد و برق و باران شدید",
    lesson: 36,
    pos: "n.",
    lessonLabel: "درس 36 — هوا"
  },
  {
    word: "hailstones",
    meaning: "تخته‌سنگ‌های تگرگ، دانه‌های تگرگ",
    lesson: 36,
    pos: "n.",
    lessonLabel: "درس 36 — هوا"
  },
  {
    word: "hail",
    meaning: "تگرگ",
    lesson: 36,
    pos: "n.",
    lessonLabel: "درس 36 — هوا"
  },
  {
    word: "overcast",
    meaning: "ابری، ابری و تیره",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — هوا"
  },
  {
    word: "drought",
    meaning: "خشکسالی",
    lesson: 36,
    pos: "n.",
    lessonLabel: "درس 36 — هوا"
  },
  {
    word: "haze",
    meaning: "غبار مه‌آلود ناشی از گرما",
    lesson: 36,
    pos: "n.",
    lessonLabel: "درس 36 — هوا"
  },
  {
    word: "hazy",
    meaning: "مه‌آلود",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — هوا"
  },
  {
    word: "mist",
    meaning: "مه رقیق",
    lesson: 36,
    pos: "n.",
    lessonLabel: "درس 36 — هوا"
  },
  {
    word: "misty",
    meaning: "مه‌آلود",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — هوا"
  },
  {
    word: "fog",
    meaning: "مه غلیظ",
    lesson: 36,
    pos: "n.",
    lessonLabel: "درس 36 — هوا"
  },
  {
    word: "foggy",
    meaning: "مه‌گرفته",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — هوا"
  },
  {
    word: "smog",
    meaning: "دود و مه (مه آلوده)",
    lesson: 36,
    pos: "n.",
    lessonLabel: "درس 36 — هوا"
  },
  {
    word: "breeze",
    meaning: "نسیم",
    lesson: 36,
    pos: "n.",
    lessonLabel: "درس 36 — هوا"
  },
  {
    word: "wind",
    meaning: "باد",
    lesson: 36,
    pos: "n.",
    lessonLabel: "درس 36 — هوا"
  },
  {
    word: "blustery",
    meaning: "بادی و تند",
    lesson: 36,
    pos: "adj.",
    lessonLabel: "درس 36 — هوا"
  },
  {
    word: "gale",
    meaning: "باد شدید",
    lesson: 36,
    pos: "n.",
    lessonLabel: "درس 36 — هوا"
  },
  {
    word: "hurricane",
    meaning: "گردباد، توفان",
    lesson: 36,
    pos: "n.",
    lessonLabel: "درس 36 — هوا"
  },
  {
    word: "straight hair",
    meaning: "مو صاف",
    lesson: 37,
    lessonLabel: "درس 37 — وصف آدم‌ها: ظاهر"
  },
  {
    word: "thin-faced",
    meaning: "دارای چهره باریک",
    lesson: 37,
    pos: "adj.",
    lessonLabel: "درس 37 — وصف آدم‌ها: ظاهر"
  },
  {
    word: "wavy hair",
    meaning: "مو موج‌دار",
    lesson: 37,
    lessonLabel: "درس 37 — وصف آدم‌ها: ظاهر"
  },
  {
    word: "round-faced",
    meaning: "گردصورت",
    lesson: 37,
    pos: "adj.",
    lessonLabel: "درس 37 — وصف آدم‌ها: ظاهر"
  },
  {
    word: "curly hair",
    meaning: "مو فرفری",
    lesson: 37,
    lessonLabel: "درس 37 — وصف آدم‌ها: ظاهر"
  },
  {
    word: "dark-skinned",
    meaning: "تیره‌پوست",
    lesson: 37,
    pos: "adj.",
    lessonLabel: "درس 37 — وصف آدم‌ها: ظاهر"
  },
  {
    word: "crew-cut",
    meaning: "مو کوتاه یکدست (اصلاح سربازی)",
    lesson: 37,
    pos: "n.",
    lessonLabel: "درس 37 — وصف آدم‌ها: ظاهر"
  },
  {
    word: "bald",
    meaning: "کچل",
    lesson: 37,
    pos: "adj.",
    lessonLabel: "درس 37 — وصف آدم‌ها: ظاهر"
  },
  {
    word: "freckles",
    meaning: "کک و مک",
    lesson: 37,
    pos: "n.",
    lessonLabel: "درس 37 — وصف آدم‌ها: ظاهر"
  },
  {
    word: "beard",
    meaning: "ریش",
    lesson: 37,
    pos: "n.",
    lessonLabel: "درس 37 — وصف آدم‌ها: ظاهر"
  },
  {
    word: "moustache",
    meaning: "سبیل",
    lesson: 37,
    pos: "n.",
    lessonLabel: "درس 37 — وصف آدم‌ها: ظاهر"
  },
  {
    word: "chubby",
    meaning: "تپل، گوشت‌پره",
    lesson: 37,
    pos: "adj.",
    lessonLabel: "درس 37 — وصف آدم‌ها: ظاهر"
  },
  {
    word: "receding hair",
    meaning: "موهای عقب‌رفته",
    lesson: 37,
    lessonLabel: "درس 37 — وصف آدم‌ها: ظاهر"
  },
  {
    word: "wrinkles",
    meaning: "چین و چروک",
    lesson: 37,
    pos: "n.",
    lessonLabel: "درس 37 — وصف آدم‌ها: ظاهر"
  },
  {
    word: "blonde",
    meaning: "مو بلوند",
    lesson: 37,
    pos: "adj.",
    lessonLabel: "درس 37 — وصف آدم‌ها: ظاهر"
  },
  {
    word: "fair",
    meaning: "روشن (مو یا پوست)",
    lesson: 37,
    pos: "adj.",
    lessonLabel: "درس 37 — وصف آدم‌ها: ظاهر"
  },
  {
    word: "dark",
    meaning: "تیره (مو یا پوست)",
    lesson: 37,
    pos: "adj.",
    lessonLabel: "درس 37 — وصف آدم‌ها: ظاهر"
  },
  {
    word: "ginger-haired / red-haired",
    meaning: "مویو (دارای موی قرمز)",
    lesson: 37,
    pos: "adj.",
    lessonLabel: "درس 37 — وصف آدم‌ها: ظاهر"
  },
  {
    word: "auburn",
    meaning: "مسی (قهوه‌ای-قرمز)",
    lesson: 37,
    pos: "adj.",
    lessonLabel: "درس 37 — وصف آدم‌ها: ظاهر"
  },
  {
    word: "complexion",
    meaning: "رنگ و روى (چهره)",
    lesson: 37,
    pos: "n.",
    lessonLabel: "درس 37 — وصف آدم‌ها: ظاهر"
  },
  {
    word: "plump",
    meaning: "تاحدی چاق و تپل",
    lesson: 37,
    pos: "adj.",
    lessonLabel: "درس 37 — وصف آدم‌ها: ظاهر"
  },
  {
    word: "stout",
    meaning: "چهل‌تکه، تنومند",
    lesson: 37,
    pos: "adj.",
    lessonLabel: "درس 37 — وصف آدم‌ها: ظاهر"
  },
  {
    word: "slim",
    meaning: "خوش‌اندام و لاغر",
    lesson: 37,
    pos: "adj.",
    lessonLabel: "درس 37 — وصف آدم‌ها: ظاهر"
  },
  {
    word: "skinny",
    meaning: "استخوانی، لاغر مفرط",
    lesson: 37,
    pos: "adj.",
    lessonLabel: "درس 37 — وصف آدم‌ها: ظاهر"
  },
  {
    word: "obese",
    meaning: "بسیار چاق (منفی)",
    lesson: 37,
    pos: "adj.",
    lessonLabel: "درس 37 — وصف آدم‌ها: ظاهر"
  },
  {
    word: "fat",
    meaning: "چاق",
    lesson: 37,
    pos: "adj.",
    lessonLabel: "درس 37 — وصف آدم‌ها: ظاهر"
  },
  {
    word: "a bit overweight",
    meaning: "کمی اضافه‌وزن",
    lesson: 37,
    lessonLabel: "درس 37 — وصف آدم‌ها: ظاهر"
  },
  {
    word: "stocky",
    meaning: "تنومند و چهارشانه",
    lesson: 37,
    pos: "adj.",
    lessonLabel: "درس 37 — وصف آدم‌ها: ظاهر"
  },
  {
    word: "well-built",
    meaning: "تنومند و عضلانی",
    lesson: 37,
    pos: "adj.",
    lessonLabel: "درس 37 — وصف آدم‌ها: ظاهر"
  },
  {
    word: "muscular",
    meaning: "عضلانی",
    lesson: 37,
    pos: "adj.",
    lessonLabel: "درس 37 — وصف آدم‌ها: ظاهر"
  },
  {
    word: "anorexic",
    meaning: "دچار بی‌اشتهایی عصبی",
    lesson: 37,
    pos: "adj.",
    lessonLabel: "درس 37 — وصف آدم‌ها: ظاهر"
  },
  {
    word: "smart",
    meaning: "شیک و مرتب",
    lesson: 37,
    pos: "adj.",
    lessonLabel: "درس 37 — وصف آدم‌ها: ظاهر"
  },
  {
    word: "elegant",
    meaning: "باوقار و شیک",
    lesson: 37,
    pos: "adj.",
    lessonLabel: "درس 37 — وصف آدم‌ها: ظاهر"
  },
  {
    word: "well-dressed",
    meaning: "خوش‌پوش",
    lesson: 37,
    pos: "adj.",
    lessonLabel: "درس 37 — وصف آدم‌ها: ظاهر"
  },
  {
    word: "scruffy",
    meaning: "ژولیده",
    lesson: 37,
    pos: "adj.",
    lessonLabel: "درس 37 — وصف آدم‌ها: ظاهر"
  },
  {
    word: "untidy-looking / messy-looking",
    meaning: "با ظاهر نامرتب",
    lesson: 37,
    pos: "adj.",
    lessonLabel: "درس 37 — وصف آدم‌ها: ظاهر"
  },
  {
    word: "good-looking",
    meaning: "خوش‌سیما",
    lesson: 37,
    pos: "adj.",
    lessonLabel: "درس 37 — وصف آدم‌ها: ظاهر"
  },
  {
    word: "unattractive",
    meaning: "جذاب‌نبودن، ناخوش‌چهره",
    lesson: 37,
    pos: "adj.",
    lessonLabel: "درس 37 — وصف آدم‌ها: ظاهر"
  },
  {
    word: "beautiful",
    meaning: "زیبا",
    lesson: 37,
    pos: "adj.",
    lessonLabel: "درس 37 — وصف آدم‌ها: ظاهر"
  },
  {
    word: "handsome",
    meaning: "خوش‌قیافه (برای مرد)",
    lesson: 37,
    pos: "adj.",
    lessonLabel: "درس 37 — وصف آدم‌ها: ظاهر"
  },
  {
    word: "personality",
    meaning: "شخصیت",
    lesson: 37,
    pos: "n.",
    lessonLabel: "درس 37 — وصف آدم‌ها: ظاهر"
  },
  {
    word: "first impressions",
    meaning: "برداشت اولیه (نخستین برخورد)",
    lesson: 37,
    pos: "n.",
    lessonLabel: "درس 37 — وصف آدم‌ها: ظاهر"
  },
  {
    word: "tallish",
    meaning: "کمی بلندقد",
    lesson: 37,
    pos: "adj.",
    lessonLabel: "درس 37 — وصف آدم‌ها: ظاهر"
  },
  {
    word: "brownish",
    meaning: "قربه‌ای قهوه‌ای",
    lesson: 37,
    pos: "adj.",
    lessonLabel: "درس 37 — وصف آدم‌ها: ظاهر"
  },
  {
    word: "thirtyish",
    meaning: "حدود سی‌سالگی",
    lesson: 37,
    pos: "adj.",
    lessonLabel: "درس 37 — وصف آدم‌ها: ظاهر"
  },
  {
    word: "intelligent",
    meaning: "باهوش",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "bright",
    meaning: "زیرک",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "clever",
    meaning: "باهوش و زیرک",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "sharp",
    meaning: "تیزبین",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "shrewd",
    meaning: "زیرک و حسابگر",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "able",
    meaning: "توانا",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "gifted",
    meaning: "بااستعداد",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "talented",
    meaning: "باستعداد",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "brainy (colloquial)",
    meaning: "باهوش (محاوره‌ای)",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "stupid",
    meaning: "احمق",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "foolish",
    meaning: "نادان",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "half-witted",
    meaning: "کم‌عقل",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "simple",
    meaning: "ساده‌لوح",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "silly",
    meaning: "بچه‌گانه و احمقانه",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "brainless",
    meaning: "بی‌عقل",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "daft",
    meaning: "خنگ",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "dumb",
    meaning: "کله‌گنجشکی",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "dim",
    meaning: "کم‌ذهن",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "cunning",
    meaning: "مکار",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "crafty",
    meaning: "حیله‌گر",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "sly",
    meaning: "مکّار و شوخ",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "guile",
    meaning: "حیله و مکر",
    lesson: 38,
    pos: "n.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "pessimistic",
    meaning: "بدبین",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "optimistic",
    meaning: "خوش‌بین",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "extroverted",
    meaning: "برون‌گرا",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "introverted",
    meaning: "درون‌گرا",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "tense",
    meaning: "عصبی و پرتنش",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "wound-up",
    meaning: "پرتنش",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "stressed-out",
    meaning: "زیر فشار عصبی",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "relaxed",
    meaning: "آرام",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "sensible",
    meaning: "عاقل و منطقی",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "down-to-earth",
    meaning: "واقع‌بین و ساده",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "sensitive",
    meaning: "حساس",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "upset",
    meaning: "دل‌مق هر و آزرده",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "worked-up",
    meaning: "عصبانی و آشفته",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "sociable",
    meaning: "اجتماعی",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "gregarious",
    meaning: "اجتماعی و قلم‌دوست",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "quarrelsome",
    meaning: "دعایی‌گو",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "argumentative",
    meaning: "جدلی و بحث‌جو",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "cruel",
    meaning: "بی‌رحمانه",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "sadistic",
    meaning: "سادیستی و آزارگر",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "easy-going",
    meaning: "ساده‌گیر",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "even-tempered",
    meaning: "آرام و متعادل",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "laid-back",
    meaning: "راحت و بی‌خیال",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "impolite",
    meaning: "بی‌ادب",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "rude",
    meaning: "گستاخ",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "ill-mannered",
    meaning: "بداخلاق",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "discourteous",
    meaning: "بی‌ملاحظه و بی‌ادب",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "honest",
    meaning: "صادق",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "trustworthy",
    meaning: "قابل اعتماد",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "reliable",
    meaning: "قابل اتکا",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "sincere",
    meaning: "صمیمی و صادق",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "jealous",
    meaning: "حسادت‌جو",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "envious",
    meaning: "حسود",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "determined",
    meaning: "سیست و مصمم",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "thrifty/economical",
    meaning: "صرفه‌جو",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "self-assured/confident",
    meaning: "مطمئن و با اعتماد به نفس",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "unconventional/original",
    meaning: "نوگرا و غیرمتعارف",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "frank/direct/open",
    meaning: "صریح و رک",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "broad-minded",
    meaning: "آزاداندیش",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "inquiring",
    meaning: "کنجکاو",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "generous",
    meaning: "سخاوتمند",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "innocent",
    meaning: "معصوم و ساده",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "ambitious",
    meaning: "جاه‌طلب",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "assertive",
    meaning: "پرانگیزه و با اعتماد به نفس",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "obstinate",
    meaning: "لجوج",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "stubborn",
    meaning: "یکدنده",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "pig-headed",
    meaning: "کله‌شق",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "stingy",
    meaning: "خسیس",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "mean",
    meaning: "خسیس و پست",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "tight-fisted",
    meaning: "خسیس و دست‌تنگ",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "miserly",
    meaning: "خسیس",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "self-important",
    meaning: "مغرور و خودبزرگ‌بین",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "arrogant",
    meaning: "متکبر",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "full of oneself",
    meaning: "خیلی به خودش مغرور",
    lesson: 38,
    pos: "phr.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "eccentric",
    meaning: "عجیب و غریب",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "odd",
    meaning: "عجیب",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "peculiar",
    meaning: "غیرعادی",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "weird",
    meaning: "عجیب و خلو",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "blunt",
    meaning: "رک و بی‌ملاحظه",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "abrupt",
    meaning: "خشک و ناگهانی",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "brusque",
    meaning: "زبر و خشن",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "curt",
    meaning: "کوتاه و تند",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "unprincipled",
    meaning: "بی‌اصول",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "permissive",
    meaning: "آزاد و بی‌قید",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "inquisitive",
    meaning: "کنجکاو و فضول",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "nosy",
    meaning: "فضول",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "extravagant",
    meaning: "ولخرج",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "naive",
    meaning: "ساده و ناب",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "pushy",
    meaning: "پرشور و تحمیلی",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "aggressive",
    meaning: "تهاجمی و پرخاشگر",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "bossy",
    meaning: "دستوری و زورگو",
    lesson: 38,
    pos: "adj.",
    lessonLabel: "درس 38 — وصف آدم‌ها: شخصیت"
  },
  {
    word: "closeness",
    meaning: "نزدیکی",
    lesson: 39,
    pos: "n.",
    lessonLabel: "درس 39 — روابط"
  },
  {
    word: "distance",
    meaning: "دوری؛ فاصله",
    lesson: 39,
    pos: "n.",
    lessonLabel: "درس 39 — روابط"
  },
  {
    word: "best friend",
    meaning: "بهترین دوست",
    lesson: 39,
    pos: "n.",
    lessonLabel: "درس 39 — روابط"
  },
  {
    word: "good friend",
    meaning: "دوست صمیمی",
    lesson: 39,
    pos: "n.",
    lessonLabel: "درس 39 — روابط"
  },
  {
    word: "friend (casual)",
    meaning: "دوست معمولی/صمیمی‌نشدگی",
    lesson: 39,
    pos: "n.",
    lessonLabel: "درس 39 — روابط"
  },
  {
    word: "acquaintance",
    meaning: "آشنا",
    lesson: 39,
    pos: "n.",
    lessonLabel: "درس 39 — روابط"
  },
  {
    word: "close colleague",
    meaning: "همکار صمیمی",
    lesson: 39,
    pos: "n.",
    lessonLabel: "درس 39 — روابط"
  },
  {
    word: "colleague",
    meaning: "همکار",
    lesson: 39,
    pos: "n.",
    lessonLabel: "درس 39 — روابط"
  },
  {
    word: "workmate",
    meaning: "همکار (غیررسمی)",
    lesson: 39,
    pos: "n.",
    lessonLabel: "درس 39 — روابط"
  },
  {
    word: "lover",
    meaning: "عاشق/معشوق",
    lesson: 39,
    pos: "n.",
    lessonLabel: "درس 39 — روابط"
  },
  {
    word: "steady boy/girlfriend",
    meaning: "دوست‌پسر/دوست‌دختر ثابت",
    lesson: 39,
    pos: "n.",
    lessonLabel: "درس 39 — روابط"
  },
  {
    word: "ex-",
    meaning: "سابق (پیشوند)",
    lesson: 39,
    pos: "phr.",
    lessonLabel: "درس 39 — روابط"
  },
  {
    word: "wife/husband/partner",
    meaning: "همسر/شریک زندگی",
    lesson: 39,
    pos: "n.",
    lessonLabel: "درس 39 — روابط"
  },
  {
    word: "mate",
    meaning: "رفيق",
    lesson: 39,
    pos: "n.",
    lessonLabel: "درس 39 — روابط"
  },
  {
    word: "classmate",
    meaning: "همکلاسی",
    lesson: 39,
    pos: "n.",
    lessonLabel: "درس 39 — روابط"
  },
  {
    word: "shipmate",
    meaning: "هم‌کشتی",
    lesson: 39,
    pos: "n.",
    lessonLabel: "درس 39 — روابط"
  },
  {
    word: "flatmate",
    meaning: "همخانه",
    lesson: 39,
    pos: "n.",
    lessonLabel: "درس 39 — روابط"
  },
  {
    word: "fiancé/ée",
    meaning: "نامزد",
    lesson: 39,
    pos: "n.",
    lessonLabel: "درس 39 — روابط"
  },
  {
    word: "husband-/wife-to-be",
    meaning: "همسر آینده",
    lesson: 39,
    pos: "n.",
    lessonLabel: "درس 39 — روابط"
  },
  {
    word: "partner",
    meaning: "شریک زندگی",
    lesson: 39,
    pos: "n.",
    lessonLabel: "درس 39 — روابط"
  },
  {
    word: "like",
    meaning: "دوست داشتن",
    lesson: 39,
    pos: "v.",
    lessonLabel: "درس 39 — روابط"
  },
  {
    word: "love",
    meaning: "عشق ورزیدن",
    lesson: 39,
    pos: "v.",
    lessonLabel: "درس 39 — روابط"
  },
  {
    word: "adore",
    meaning: "پرستیدن؛ خیلی دوست داشتن",
    lesson: 39,
    pos: "v.",
    lessonLabel: "درس 39 — روابط"
  },
  {
    word: "dislike",
    meaning: "دوست نداشتن",
    lesson: 39,
    pos: "v.",
    lessonLabel: "درس 39 — روابط"
  },
  {
    word: "hate",
    meaning: "متنفر بودن",
    lesson: 39,
    pos: "v.",
    lessonLabel: "درس 39 — روابط"
  },
  {
    word: "worship",
    meaning: "پرستش کردن",
    lesson: 39,
    pos: "v.",
    lessonLabel: "درس 39 — روابط"
  },
  {
    word: "idolise",
    meaning: "بت کردن",
    lesson: 39,
    pos: "v.",
    lessonLabel: "درس 39 — روابط"
  },
  {
    word: "can't stand",
    meaning: "طاقت آوردن (منفی)",
    lesson: 39,
    pos: "phr.",
    lessonLabel: "درس 39 — روابط"
  },
  {
    word: "loathe",
    meaning: "متنفر بودن (شدید)",
    lesson: 39,
    pos: "v.",
    lessonLabel: "درس 39 — روابط"
  },
  {
    word: "respect",
    meaning: "احترام گذاشتن",
    lesson: 39,
    pos: "v.",
    lessonLabel: "درس 39 — روابط"
  },
  {
    word: "look up to",
    meaning: "تحسین کردن؛ احترام داشتن",
    lesson: 39,
    pos: "phr.",
    lessonLabel: "درس 39 — روابط"
  },
  {
    word: "admire",
    meaning: "تحسین کردن",
    lesson: 39,
    pos: "v.",
    lessonLabel: "درس 39 — روابط"
  },
  {
    word: "look down on",
    meaning: "تحقیر کردن؛ به چشم پایین دیدن",
    lesson: 39,
    pos: "phr.",
    lessonLabel: "درس 39 — روابط"
  },
  {
    word: "despise",
    meaning: "خوار شمردن",
    lesson: 39,
    pos: "v.",
    lessonLabel: "درس 39 — روابط"
  },
  {
    word: "attract",
    meaning: "جذب کردن",
    lesson: 39,
    pos: "v.",
    lessonLabel: "درس 39 — روابط"
  },
  {
    word: "be attracted to",
    meaning: "جذب شدن",
    lesson: 39,
    pos: "phr.",
    lessonLabel: "درس 39 — روابط"
  },
  {
    word: "fancy",
    meaning: "علاقه داشتن (غیررسمی)",
    lesson: 39,
    pos: "v.",
    lessonLabel: "درس 39 — روابط"
  },
  {
    word: "repel",
    meaning: "مطلوب بودن معکوس؛ دفع کردن",
    lesson: 39,
    pos: "v.",
    lessonLabel: "درس 39 — روابط"
  },
  {
    word: "leave someone cold",
    meaning: "کسی را جذب نکردن",
    lesson: 39,
    pos: "phr.",
    lessonLabel: "درس 39 — روابط"
  },
  {
    word: "doesn't do anything for me",
    meaning: "برایم جذابیتی ندارد",
    lesson: 39,
    pos: "phr.",
    lessonLabel: "درس 39 — روابط"
  },
  {
    word: "get on well (with each other)",
    meaning: "رابطه خوب داشتن",
    lesson: 39,
    pos: "phr.",
    lessonLabel: "درس 39 — روابط"
  },
  {
    word: "don't see eye to eye",
    meaning: "هم‌نظر نبودن؛ با هم بحث می‌کنند",
    lesson: 39,
    pos: "phr.",
    lessonLabel: "درس 39 — روابط"
  },
  {
    word: "fall out with",
    meaning: "قت و قاطی شدن",
    lesson: 39,
    pos: "phr.",
    lessonLabel: "درس 39 — روابط"
  },
  {
    word: "break up",
    meaning: "قطع رابطه کردن",
    lesson: 39,
    pos: "phr.",
    lessonLabel: "درس 39 — روابط"
  },
  {
    word: "split up",
    meaning: "از هم جدا شدن",
    lesson: 39,
    pos: "phr.",
    lessonLabel: "درس 39 — روابط"
  },
  {
    word: "have an affair",
    meaning: "رابطه پنهانی داشتن",
    lesson: 39,
    pos: "phr.",
    lessonLabel: "درس 39 — روابط"
  },
  {
    word: "their elders",
    meaning: "بزرگ‌ترها",
    lesson: 39,
    pos: "phr.",
    lessonLabel: "درس 39 — روابط"
  },
  {
    word: "make it up",
    meaning: "آشتی کردن",
    lesson: 39,
    pos: "phr.",
    lessonLabel: "درس 39 — روابط"
  },
  {
    word: "junior",
    meaning: "مأمور رده پایین‌تر",
    lesson: 39,
    pos: "n.",
    lessonLabel: "درس 39 — روابط"
  },
  {
    word: "senior",
    meaning: "رده بالاتر؛ ارشد",
    lesson: 39,
    pos: "adj.",
    lessonLabel: "درس 39 — روابط"
  },
  {
    word: "master/main bedroom",
    meaning: "اتاق خواب اصلی بزرگ‌ترین و مهم‌ترین اتاق خواب",
    lesson: 40,
    lessonLabel: "درس 40 — در خانه"
  },
  {
    word: "spare bedroom/guest (bed)room",
    meaning: "اتاق خواب مهمان؛ هر روز استفاده نمی‌شود؛ مهمان‌ها می‌توانند آنجا بمانند",
    lesson: 40,
    lessonLabel: "درس 40 — در خانه"
  },
  {
    word: "utility room",
    meaning: "اتاق کاربری؛ معمولاً فقط برای ماشین لباسشویی، فریزر و غیره",
    lesson: 40,
    lessonLabel: "درس 40 — در خانه"
  },
  {
    word: "shed",
    meaning: "انبار کوچک جدا از خانه؛ معمولاً برای نگهداری ابزار باغ",
    lesson: 40,
    pos: "n.",
    lessonLabel: "درس 40 — در خانه"
  },
  {
    word: "attic/loft",
    meaning: "فضای زیر شیروانی برای نگهداری وسایل؛ می‌تواند به فضای زندگی اضافی تبدیل شود",
    lesson: 40,
    pos: "n.",
    lessonLabel: "درس 40 — در خانه"
  },
  {
    word: "loft/attic conversion",
    meaning: "تبدیل زیرشیروانی به فضای قابل سکونت",
    lesson: 40,
    lessonLabel: "درس 40 — در خانه"
  },
  {
    word: "cellar",
    meaning: "زیرزمین بدون پنجره برای نگهداری وسایل",
    lesson: 40,
    pos: "n.",
    lessonLabel: "درس 40 — در خانه"
  },
  {
    word: "basement",
    meaning: "زیرزمین با پنجره، برای زندگی/کار",
    lesson: 40,
    pos: "n.",
    lessonLabel: "درس 40 — در خانه"
  },
  {
    word: "study",
    meaning: "اتاق مطالعه برای خواندن/نوشتن/درس خواندن",
    lesson: 40,
    pos: "n.",
    lessonLabel: "درس 40 — در خانه"
  },
  {
    word: "landing",
    meaning: "سکوی صاف بالای پله‌ها",
    lesson: 40,
    pos: "n.",
    lessonLabel: "درس 40 — در خانه"
  },
  {
    word: "hall/hallway",
    meaning: "راهرو/فضای ورودی خانه",
    lesson: 40,
    pos: "n.",
    lessonLabel: "درس 40 — در خانه"
  },
  {
    word: "porch",
    meaning: "ایوان سرپوشیده قبل از در ورودی",
    lesson: 40,
    pos: "n.",
    lessonLabel: "درس 40 — در خانه"
  },
  {
    word: "pantry or larder",
    meaning: "کمد بزرگ (معمولاً قابل ورود) برای نگهداری غذا",
    lesson: 40,
    pos: "n.",
    lessonLabel: "درس 40 — در خانه"
  },
  {
    word: "terrace or patio",
    meaning: "حیاط سنگ‌فرشی بین خانه و باغ برای نشستن و غذا خوردن",
    lesson: 40,
    pos: "n.",
    lessonLabel: "درس 40 — در خانه"
  },
  {
    word: "drive",
    meaning: "جاده کوتاه از خیابان تا خانه یا گاراژ؛ می‌شود روی آن رانندگی/پارک کرد",
    lesson: 40,
    pos: "n.",
    lessonLabel: "درس 40 — در خانه"
  },
  {
    word: "remote control",
    meaning: "کنترل از راه دور",
    lesson: 40,
    lessonLabel: "درس 40 — در خانه"
  },
  {
    word: "power point and plug",
    meaning: "پریز برق و دوشاخه",
    lesson: 40,
    lessonLabel: "درس 40 — در خانه"
  },
  {
    word: "table-mat",
    meaning: "زیرسیگاری/زیرلیوانی بزرگ برای میز",
    lesson: 40,
    lessonLabel: "درس 40 — در خانه"
  },
  {
    word: "coaster",
    meaning: "زیرلیوانی",
    lesson: 40,
    lessonLabel: "درس 40 — در خانه"
  },
  {
    word: "corkscrew",
    meaning: "بازکن بطری (در بازکن)",
    lesson: 40,
    lessonLabel: "درس 40 — در خانه"
  },
  {
    word: "tea-towel",
    meaning: "دستمال آشپزخانه",
    lesson: 40,
    lessonLabel: "درس 40 — در خانه"
  },
  {
    word: "washing-up liquid",
    meaning: "مایع ظرفشویی",
    lesson: 40,
    lessonLabel: "درس 40 — در خانه"
  },
  {
    word: "grater",
    meaning: "رنده",
    lesson: 40,
    lessonLabel: "درس 40 — در خانه"
  },
  {
    word: "ironing-board",
    meaning: "میز اتو",
    lesson: 40,
    lessonLabel: "درس 40 — در خانه"
  },
  {
    word: "dust-pan and brush",
    meaning: "خاک‌گیر و جاروی کوچک",
    lesson: 40,
    lessonLabel: "درس 40 — در خانه"
  },
  {
    word: "bin-liners",
    meaning: "کیسه زباله",
    lesson: 40,
    lessonLabel: "درس 40 — در خانه"
  },
  {
    word: "chopping board",
    meaning: "تخته برش (ورداشکن)",
    lesson: 40,
    lessonLabel: "درس 40 — در خانه"
  },
  {
    word: "detached house",
    meaning: "خانه ویلایی (متصل به هیچ خانه دیگری نیست)",
    lesson: 40,
    lessonLabel: "درس 40 — در خانه"
  },
  {
    word: "semi-detached house (informal: semi-)",
    meaning: "خانه دوبلکس (متصل به یک خانه دیگر)",
    lesson: 40,
    lessonLabel: "درس 40 — در خانه"
  },
  {
    word: "self-contained flat",
    meaning: "آپارتمان مستقل (تسهیلات مشترک با دیگران ندارد)",
    lesson: 40,
    lessonLabel: "درس 40 — در خانه"
  },
  {
    word: "terraced house",
    meaning: "خانه صفی (متصل به چند خانه در یک ردیف)",
    lesson: 40,
    lessonLabel: "درس 40 — در خانه"
  },
  {
    word: "cottage",
    meaning: "کلبه؛ خانه کوچک در حومه یا روستا",
    lesson: 40,
    pos: "n.",
    lessonLabel: "درس 40 — در خانه"
  },
  {
    word: "bungalow",
    meaning: "خانه یک‌طبقه (بدون طبقه بالا)",
    lesson: 40,
    pos: "n.",
    lessonLabel: "درس 40 — در خانه"
  },
  {
    word: "bedsit",
    meaning: "اتاق‌نشیمن؛ اتاق خواب و نشیمن در یک فضا",
    lesson: 40,
    pos: "n.",
    lessonLabel: "درس 40 — در خانه"
  },
  {
    word: "villa",
    meaning: "ویلا؛ خانه بزرگ با باغ بزرگ یا خانه استیجاری در منطقه توریستی",
    lesson: 40,
    pos: "n.",
    lessonLabel: "درس 40 — در خانه"
  },
  {
    word: "time-share",
    meaning: "ملک وقت‌گیری؛ آپارتمان/خانه تعطیلاتی که حق یک یا دو هفته اقامت در سال دارید",
    lesson: 40,
    lessonLabel: "درس 40 — در خانه"
  }
];

export const VOCAB_PART_2: Row[] = ROWS;
