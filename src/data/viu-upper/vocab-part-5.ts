// واژگان درس‌های English Vocabulary in Use — Upper-intermediate (پارتیت 5) — استخراج VLM از اسکن PDF
// word = عین چاپ کتاب · meaning = ترجمهٔ ماشینی GLM (کلاس FA-NEW — اثبات صحت ترجمه نیست)
import type { VocabWord } from "../types";

type Row = Omit<VocabWord, "lesson"> & { lesson: number; lessonLabel: string };

const ROWS: Row[] = [
  {
    word: "odds and ends",
    meaning: "چیزهای خرد و من‌و‌مزهٔ بی‌اهمیت",
    lesson: 81,
    pos: "phr.",
    lessonLabel: "درس 81 — جفت‌واژه‌ها"
  },
  {
    word: "give and take",
    meaning: "روحیهٔ سازش و احترام متقابل",
    lesson: 81,
    pos: "phr.",
    lessonLabel: "درس 81 — جفت‌واژه‌ها"
  },
  {
    word: "part and parcel",
    meaning: "بخش جدایی‌ناپذیر",
    lesson: 81,
    pos: "phr.",
    lessonLabel: "درس 81 — جفت‌واژه‌ها"
  },
  {
    word: "ranting and raving",
    meaning: "داد و بیداد کردن، عصبانی شدن شدید",
    lesson: 81,
    pos: "phr.",
    lessonLabel: "درس 81 — جفت‌واژه‌ها"
  },
  {
    word: "rack and ruin",
    meaning: "ویرانی و خرابی کامل",
    lesson: 81,
    pos: "phr.",
    lessonLabel: "درس 81 — جفت‌واژه‌ها"
  },
  {
    word: "prim and proper",
    meaning: "خیلی رسمی و متکلف",
    lesson: 81,
    pos: "phr.",
    lessonLabel: "درس 81 — جفت‌واژه‌ها"
  },
  {
    word: "rough and ready",
    meaning: "ساده و بی‌سروکاره با کیفیت پایین",
    lesson: 81,
    pos: "phr.",
    lessonLabel: "درس 81 — جفت‌واژه‌ها"
  },
  {
    word: "wine and dine",
    meaning: "مهمان‌داری کردن (پذیرایی مفصل)",
    lesson: 81,
    pos: "v.",
    lessonLabel: "درس 81 — جفت‌واژه‌ها"
  },
  {
    word: "pick and choose",
    meaning: "با وسواس انتخاب کردن، از میان گزینه‌ها انتخاب کردن",
    lesson: 81,
    pos: "phr.",
    lessonLabel: "درس 81 — جفت‌واژه‌ها"
  },
  {
    word: "leaps and bounds",
    meaning: "به سرعت و با جهش‌های بزرگ",
    lesson: 81,
    pos: "phr.",
    lessonLabel: "درس 81 — جفت‌واژه‌ها"
  },
  {
    word: "peace and quiet",
    meaning: "آرامش و سکوت",
    lesson: 81,
    pos: "phr.",
    lessonLabel: "درس 81 — جفت‌واژه‌ها"
  },
  {
    word: "rest and recreation / R and R",
    meaning: "استراحت و تفریح",
    lesson: 81,
    pos: "phr.",
    lessonLabel: "درس 81 — جفت‌واژه‌ها"
  },
  {
    word: "first and foremost",
    meaning: "اول از همه، مهم‌تر از همه",
    lesson: 81,
    pos: "phr.",
    lessonLabel: "درس 81 — جفت‌واژه‌ها"
  },
  {
    word: "here and there",
    meaning: "اینجا و آنجا، پراکنده",
    lesson: 81,
    pos: "phr.",
    lessonLabel: "درس 81 — جفت‌واژه‌ها"
  },
  {
    word: "on and off",
    meaning: "قطعه‌قطعه، گاهی اوقات",
    lesson: 81,
    pos: "phr.",
    lessonLabel: "درس 81 — جفت‌واژه‌ها"
  },
  {
    word: "back and forth",
    meaning: "رفت‌وآمد، عقب و جلو",
    lesson: 81,
    pos: "phr.",
    lessonLabel: "درس 81 — جفت‌واژه‌ها"
  },
  {
    word: "to and fro",
    meaning: "رفت‌وآمد (مثل back and forth)",
    lesson: 81,
    pos: "phr.",
    lessonLabel: "درس 81 — جفت‌واژه‌ها"
  },
  {
    word: "down and out",
    meaning: "بی‌خانمان و بی‌پول",
    lesson: 81,
    pos: "phr.",
    lessonLabel: "درس 81 — جفت‌واژه‌ها"
  },
  {
    word: "out and about",
    meaning: "بیرون رفتن، سرحال و سرپا",
    lesson: 81,
    pos: "phr.",
    lessonLabel: "درس 81 — جفت‌واژه‌ها"
  },
  {
    word: "up and down",
    meaning: "بالا و پایین، در دو جهت",
    lesson: 81,
    pos: "phr.",
    lessonLabel: "درس 81 — جفت‌واژه‌ها"
  },
  {
    word: "black and white",
    meaning: "سیاه‌وسفید",
    lesson: 81,
    pos: "phr.",
    lessonLabel: "درس 81 — جفت‌واژه‌ها"
  },
  {
    word: "Ladies and gentlemen",
    meaning: "خانم‌ها و آقایان",
    lesson: 81,
    pos: "phr.",
    lessonLabel: "درس 81 — جفت‌واژه‌ها"
  },
  {
    word: "hot and cold",
    meaning: "گرم و سرد",
    lesson: 81,
    pos: "phr.",
    lessonLabel: "درس 81 — جفت‌واژه‌ها"
  },
  {
    word: "back to front",
    meaning: "برعکس، وارونه",
    lesson: 81,
    pos: "phr.",
    lessonLabel: "درس 81 — جفت‌واژه‌ها"
  },
  {
    word: "sink or swim",
    meaning: "توفیق اجباری؛ یا غرق شدن یا شنا کردن",
    lesson: 81,
    pos: "phr.",
    lessonLabel: "درس 81 — جفت‌واژه‌ها"
  },
  {
    word: "slowly but surely",
    meaning: "آرام اما مطمئن، به‌تدریج",
    lesson: 81,
    pos: "phr.",
    lessonLabel: "درس 81 — جفت‌واژه‌ها"
  },
  {
    word: "sooner or later",
    meaning: "دیر یا زود، بالاخره",
    lesson: 81,
    pos: "phr.",
    lessonLabel: "درس 81 — جفت‌واژه‌ها"
  },
  {
    word: "all or nothing",
    meaning: "همه یا هیچ",
    lesson: 81,
    pos: "phr.",
    lessonLabel: "درس 81 — جفت‌واژه‌ها"
  },
  {
    word: "take it or leave it",
    meaning: "قبول کن یا ولش کن",
    lesson: 81,
    pos: "phr.",
    lessonLabel: "درس 81 — جفت‌واژه‌ها"
  },
  {
    word: "give or take",
    meaning: "کم‌وزیاد، حدوداً",
    lesson: 81,
    pos: "phr.",
    lessonLabel: "درس 81 — جفت‌واژه‌ها"
  },
  {
    word: "have a heart of gold",
    meaning: "دلِ طلایی داشتن؛ بسیار مهربان و بخشنده بودن",
    lesson: 82,
    pos: "phr.",
    lessonLabel: "درس 82 — اصطلاح‌های وصف آدم‌ها"
  },
  {
    word: "as hard as nails",
    meaning: "بی‌رحم و بی‌احساس؛ بدون هیچ ترحمی",
    lesson: 82,
    pos: "phr.",
    lessonLabel: "درس 82 — اصطلاح‌های وصف آدم‌ها"
  },
  {
    word: "as good as gold",
    meaning: "بسیار خوب و خوش‌رفتار (معمولاً برای کودکان)",
    lesson: 82,
    pos: "phr.",
    lessonLabel: "درس 82 — اصطلاح‌های وصف آدم‌ها"
  },
  {
    word: "a cold fish",
    meaning: "آدم سرد و بی‌علاقه؛ دور و غیردوستانه",
    lesson: 82,
    pos: "phr.",
    lessonLabel: "درس 82 — اصطلاح‌های وصف آدم‌ها"
  },
  {
    word: "an awkward customer",
    meaning: "آدم دست‌اندازدار؛ فردی که سر و کار با او دشوار است",
    lesson: 82,
    pos: "phr.",
    lessonLabel: "درس 82 — اصطلاح‌های وصف آدم‌ها"
  },
  {
    word: "a pain in the neck",
    meaning: "آدم مزاحم و اعصاب‌خردکن",
    lesson: 82,
    pos: "phr.",
    lessonLabel: "درس 82 — اصطلاح‌های وصف آدم‌ها"
  },
  {
    word: "get on someone's nerves",
    meaning: "اعصاب کسی را خرد کردن",
    lesson: 82,
    pos: "phr.",
    lessonLabel: "درس 82 — اصطلاح‌های وصف آدم‌ها"
  },
  {
    word: "quick off the mark",
    meaning: "تیز و سریع در درک و واکنش",
    lesson: 82,
    pos: "phr.",
    lessonLabel: "درس 82 — اصطلاح‌های وصف آدم‌ها"
  },
  {
    word: "a fast worker",
    meaning: "کسی که خیلی سریع پیش می‌رود (مثلاً در روابط)",
    lesson: 82,
    pos: "phr.",
    lessonLabel: "درس 82 — اصطلاح‌های وصف آدم‌ها"
  },
  {
    word: "slow off the mark",
    meaning: "کُند در واکنش و درک",
    lesson: 82,
    pos: "phr.",
    lessonLabel: "درس 82 — اصطلاح‌های وصف آدم‌ها"
  },
  {
    word: "slowcoach",
    meaning: "آدم کُند و تنبل",
    lesson: 82,
    pos: "n.",
    lessonLabel: "درس 82 — اصطلاح‌های وصف آدم‌ها"
  },
  {
    word: "an odd-ball",
    meaning: "آدم عجیب و غریب",
    lesson: 82,
    pos: "n.",
    lessonLabel: "درس 82 — اصطلاح‌های وصف آدم‌ها"
  },
  {
    word: "over the top",
    meaning: "بیش از حد اغراق‌آمیز و افراطی در رفتار",
    lesson: 82,
    pos: "phr.",
    lessonLabel: "درس 82 — اصطلاح‌های وصف آدم‌ها"
  },
  {
    word: "round the bend",
    meaning: "دیوانه؛ کاملاً مجنون",
    lesson: 82,
    pos: "phr.",
    lessonLabel: "درس 82 — اصطلاح‌های وصف آدم‌ها"
  },
  {
    word: "middle-of-the-road",
    meaning: "معتدل و میانه‌رو؛ بدون عقاید رادیکال",
    lesson: 82,
    pos: "adj.",
    lessonLabel: "درس 82 — اصطلاح‌های وصف آدم‌ها"
  },
  {
    word: "teacher's pet",
    meaning: "نفر موردعلم معلم؛ شاژهٔ معلم",
    lesson: 82,
    pos: "n.",
    lessonLabel: "درس 82 — اصطلاح‌های وصف آدم‌ها"
  },
  {
    word: "top of the class",
    meaning: "اول کلاس؛ دارای بهترین نمره‌ها",
    lesson: 82,
    pos: "phr.",
    lessonLabel: "درس 82 — اصطلاح‌های وصف آدم‌ها"
  },
  {
    word: "a know-all",
    meaning: "آدم مایه‌دانی که همه‌چیزی می‌داند",
    lesson: 82,
    pos: "n.",
    lessonLabel: "درس 82 — اصطلاح‌های وصف آدم‌ها"
  },
  {
    word: "a big-head",
    meaning: "آدم لاف‌زن و خودبزرگ‌بین",
    lesson: 82,
    pos: "n.",
    lessonLabel: "درس 82 — اصطلاح‌های وصف آدم‌ها"
  },
  {
    word: "a lazy-bones",
    meaning: "آدم تنبل",
    lesson: 82,
    pos: "n.",
    lessonLabel: "درس 82 — اصطلاح‌های وصف آدم‌ها"
  },
  {
    word: "classroom situation",
    meaning: "موقعیت و فضای کلاس درس",
    lesson: 82,
    pos: "phr.",
    lessonLabel: "درس 82 — اصطلاح‌های وصف آدم‌ها"
  },
  {
    word: "on cloud nine",
    meaning: "بسیار خوشحال/ذوق‌زده",
    lesson: 83,
    pos: "phr.",
    lessonLabel: "درس 83 — اصطلاح‌های وصف احساس یا حال روحی"
  },
  {
    word: "in high spirits",
    meaning: "سرحال و پرانرژی",
    lesson: 83,
    pos: "phr.",
    lessonLabel: "درس 83 — اصطلاح‌های وصف احساس یا حال روحی"
  },
  {
    word: "keep one's chin up",
    meaning: "با وجود مشکلات شاد و امیدوار ماندن",
    lesson: 83,
    pos: "phr.",
    lessonLabel: "درس 83 — اصطلاح‌های وصف احساس یا حال روحی"
  },
  {
    word: "as happy as the day is long",
    meaning: "بسیار راضی و خوشحال",
    lesson: 83,
    pos: "phr.",
    lessonLabel: "درس 83 — اصطلاح‌های وصف احساس یا حال روحی"
  },
  {
    word: "face as long as a fiddle",
    meaning: "خیلی افسرده/ناشاد به نظر رسیدن",
    lesson: 83,
    pos: "phr.",
    lessonLabel: "درس 83 — اصطلاح‌های وصف احساس یا حال روحی"
  },
  {
    word: "down in the dumps",
    meaning: "افسرده و غمگین",
    lesson: 83,
    pos: "phr.",
    lessonLabel: "درس 83 — اصطلاح‌های وصف احساس یا حال روحی"
  },
  {
    word: "in a (black) mood",
    meaning: "بدخلش/عصبانی",
    lesson: 83,
    pos: "phr.",
    lessonLabel: "درس 83 — اصطلاح‌های وصف احساس یا حال روحی"
  },
  {
    word: "like a bear with a sore head",
    meaning: "بسیار بداخلاق و زودرنج",
    lesson: 83,
    pos: "phr.",
    lessonLabel: "درس 83 — اصطلاح‌های وصف احساس یا حال روحی"
  },
  {
    word: "I could eat a horse",
    meaning: "خیلی گرسنه‌ام",
    lesson: 83,
    pos: "phr.",
    lessonLabel: "درس 83 — اصطلاح‌های وصف احساس یا حال روحی"
  },
  {
    word: "all in",
    meaning: "خسته و از پا افتاده",
    lesson: 83,
    pos: "phr.",
    lessonLabel: "درس 83 — اصطلاح‌های وصف احساس یا حال روحی"
  },
  {
    word: "under the weather",
    meaning: "کمی مریض/حالم خوب نیست",
    lesson: 83,
    pos: "phr.",
    lessonLabel: "درس 83 — اصطلاح‌های وصف احساس یا حال روحی"
  },
  {
    word: "on top form",
    meaning: "در بهترین وضعیت جسمی",
    lesson: 83,
    pos: "phr.",
    lessonLabel: "درس 83 — اصطلاح‌های وصف احساس یا حال روحی"
  },
  {
    word: "as if one's head was going round",
    meaning: "سرگیجه داشتن",
    lesson: 83,
    pos: "phr.",
    lessonLabel: "درس 83 — اصطلاح‌های وصف احساس یا حال روحی"
  },
  {
    word: "at death's door",
    meaning: "خیلی بد حال داشتن/در آستانهٔ مرگ",
    lesson: 83,
    pos: "phr.",
    lessonLabel: "درس 83 — اصطلاح‌های وصف احساس یا حال روحی"
  },
  {
    word: "as fit as a fiddle",
    meaning: "بسیار سالم و سرحال",
    lesson: 83,
    pos: "phr.",
    lessonLabel: "درس 83 — اصطلاح‌های وصف احساس یا حال روحی"
  },
  {
    word: "scared stiff",
    meaning: "خیلی ترسیده",
    lesson: 83,
    pos: "phr.",
    lessonLabel: "درس 83 — اصطلاح‌های وصف احساس یا حال روحی"
  },
  {
    word: "frighten the life out of someone",
    meaning: "جان کسی را گرفتن/خیلی ترساندن",
    lesson: 83,
    pos: "phr.",
    lessonLabel: "درس 83 — اصطلاح‌های وصف احساس یا حال روحی"
  },
  {
    word: "shaking in one's shoes",
    meaning: "از ترس لرزیدن",
    lesson: 83,
    pos: "phr.",
    lessonLabel: "درس 83 — اصطلاح‌های وصف احساس یا حال روحی"
  },
  {
    word: "scared out of one's wits",
    meaning: "خیلی ترسیده/مبهوت از ترس",
    lesson: 83,
    pos: "phr.",
    lessonLabel: "درس 83 — اصطلاح‌های وصف احساس یا حال روحی"
  },
  {
    word: "jump out of one's skin",
    meaning: "جا خوردن و پریدن از ترس",
    lesson: 83,
    pos: "phr.",
    lessonLabel: "درس 83 — اصطلاح‌های وصف احساس یا حال روحی"
  },
  {
    word: "exaggeration",
    meaning: "اغراق",
    lesson: 83,
    pos: "n.",
    lessonLabel: "درس 83 — اصطلاح‌های وصف احساس یا حال روحی"
  },
  {
    word: "get carried away",
    meaning: "فریب خوردن/از خود بی‌خود شدن",
    lesson: 83,
    pos: "phr.",
    lessonLabel: "درس 83 — اصطلاح‌های وصف احساس یا حال روحی"
  },
  {
    word: "keep a cool head",
    meaning: "آرامش خود را حفظ کردن",
    lesson: 83,
    pos: "phr.",
    lessonLabel: "درس 83 — اصطلاح‌های وصف احساس یا حال روحی"
  },
  {
    word: "make you swell with pride",
    meaning: "خیلی مغرور و افتخار کردن",
    lesson: 83,
    pos: "phr.",
    lessonLabel: "درس 83 — اصطلاح‌های وصف احساس یا حال روحی"
  },
  {
    word: "feel on top of the world",
    meaning: "خیلی خوشحال بودن",
    lesson: 83,
    pos: "phr.",
    lessonLabel: "درس 83 — اصطلاح‌های وصف احساس یا حال روحی"
  },
  {
    word: "to be in a fix",
    meaning: "در مخمصه بودن",
    lesson: 84,
    lessonLabel: "درس 84 — اصطلاح‌های وصف موقعیت‌های مشکل‌دار"
  },
  {
    word: "to be in a tight corner",
    meaning: "در موقعیت دشواری بودن که خروج از آن سخت است",
    lesson: 84,
    lessonLabel: "درس 84 — اصطلاح‌های وصف موقعیت‌های مشکل‌دار"
  },
  {
    word: "to be in a muddle",
    meaning: "گیج و آشفته بودن",
    lesson: 84,
    lessonLabel: "درس 84 — اصطلاح‌های وصف موقعیت‌های مشکل‌دار"
  },
  {
    word: "to take a back seat",
    meaning: "کاری نکردن؛ اجازه دادن دیگران عمل کنند",
    lesson: 84,
    lessonLabel: "درس 84 — اصطلاح‌های وصف موقعیت‌های مشکل‌دار"
  },
  {
    word: "to take the bull by the horns",
    meaning: "مثبت و فعال با مشکل روبه‌رو شدن",
    lesson: 84,
    lessonLabel: "درس 84 — اصطلاح‌های وصف موقعیت‌های مشکل‌دار"
  },
  {
    word: "to stir things up",
    meaning: "کارها را بدتر کردن",
    lesson: 84,
    lessonLabel: "درس 84 — اصطلاح‌های وصف موقعیت‌های مشکل‌دار"
  },
  {
    word: "to pour oil on troubled waters",
    meaning: "آرام کردن اوضاع",
    lesson: 84,
    lessonLabel: "درس 84 — اصطلاح‌های وصف موقعیت‌های مشکل‌دار"
  },
  {
    word: "to keep one's cards close to one's chest",
    meaning: "اطلاعات را پنهان کردن",
    lesson: 84,
    lessonLabel: "درس 84 — اصطلاح‌های وصف موقعیت‌های مشکل‌دار"
  },
  {
    word: "to lay one's cards on the table",
    meaning: "صادقانه و شفاف موضع خود را گفتن",
    lesson: 84,
    lessonLabel: "درس 84 — اصطلاح‌های وصف موقعیت‌های مشکل‌دار"
  },
  {
    word: "get our act together",
    meaning: "خودمان را سازمان‌دهی کنیم",
    lesson: 84,
    lessonLabel: "درس 84 — اصطلاح‌های وصف موقعیت‌های مشکل‌دار"
  },
  {
    word: "get to the bottom of things",
    meaning: "حقیقت ماجرا را کشف کردن",
    lesson: 84,
    lessonLabel: "درس 84 — اصطلاح‌های وصف موقعیت‌های مشکل‌دار"
  },
  {
    word: "get people to sit up and take notice",
    meaning: "مورد توجه قرار دادن",
    lesson: 84,
    lessonLabel: "درس 84 — اصطلاح‌های وصف موقعیت‌های مشکل‌دار"
  },
  {
    word: "get a grasp of",
    meaning: "فهمیدن/درک کردن",
    lesson: 84,
    lessonLabel: "درس 84 — اصطلاح‌های وصف موقعیت‌های مشکل‌دار"
  },
  {
    word: "The tide has turned",
    meaning: "اوضاع رو به بهبود گذاشته",
    lesson: 84,
    lessonLabel: "درس 84 — اصطلاح‌های وصف موقعیت‌های مشکل‌دار"
  },
  {
    word: "light at the end of the tunnel",
    meaning: "نشانه‌ای از بهبود وضعیت",
    lesson: 84,
    lessonLabel: "درس 84 — اصطلاح‌های وصف موقعیت‌های مشکل‌دار"
  },
  {
    word: "come to a dead end",
    meaning: "به بن‌بست رسیدن",
    lesson: 84,
    lessonLabel: "درس 84 — اصطلاح‌های وصف موقعیت‌های مشکل‌دار"
  },
  {
    word: "reached a turning-point",
    meaning: "به نقطه عطف رسیدن",
    lesson: 84,
    lessonLabel: "درس 84 — اصطلاح‌های وصف موقعیت‌های مشکل‌دار"
  },
  {
    word: "buried the hatchet",
    meaning: "صلح کردن/دشمنی را کنار گذاشتن",
    lesson: 84,
    lessonLabel: "درس 84 — اصطلاح‌های وصف موقعیت‌های مشکل‌دار"
  },
  {
    word: "swept under the carpet",
    meaning: "ناگفته ماندن/عمداً نادیده گرفتن",
    lesson: 84,
    lessonLabel: "درس 84 — اصطلاح‌های وصف موقعیت‌های مشکل‌دار"
  },
  {
    word: "It would go a long way",
    meaning: "خیلی مفید بودن",
    lesson: 84,
    lessonLabel: "درس 84 — اصطلاح‌های وصف موقعیت‌های مشکل‌دار"
  },
  {
    word: "head and shoulders above",
    meaning: "بسیار بهتر از (بقیه)",
    lesson: 85,
    pos: "phr.",
    lessonLabel: "درس 85 — اصطلاح‌های مرتبط با تحسین و انتقاد"
  },
  {
    word: "miles better",
    meaning: "خیلی بهتر",
    lesson: 85,
    pos: "phr.",
    lessonLabel: "درس 85 — اصطلاح‌های مرتبط با تحسین و انتقاد"
  },
  {
    word: "streets ahead",
    meaning: "خیلی جلوتر",
    lesson: 85,
    pos: "phr.",
    lessonLabel: "درس 85 — اصطلاح‌های مرتبط با تحسین و انتقاد"
  },
  {
    word: "knocks spots off",
    meaning: "از ... خیلی بهتر است",
    lesson: 85,
    pos: "phr.",
    lessonLabel: "درس 85 — اصطلاح‌های مرتبط با تحسین و انتقاد"
  },
  {
    word: "out of this world",
    meaning: "فوق‌العاده، عالی",
    lesson: 85,
    pos: "phr.",
    lessonLabel: "درس 85 — اصطلاح‌های مرتبط با تحسین و انتقاد"
  },
  {
    word: "dab-hand",
    meaning: "متخصص، استادکار",
    lesson: 85,
    pos: "n.",
    lessonLabel: "درس 85 — اصطلاح‌های مرتبط با تحسین و انتقاد"
  },
  {
    word: "first-rate",
    meaning: "درجه‌یک، عالی",
    lesson: 85,
    pos: "adj.",
    lessonLabel: "درس 85 — اصطلاح‌های مرتبط با تحسین و انتقاد"
  },
  {
    word: "top-notch",
    meaning: "درجه‌یک، ممتاز",
    lesson: 85,
    pos: "adj.",
    lessonLabel: "درس 85 — اصطلاح‌های مرتبط با تحسین و انتقاد"
  },
  {
    word: "really on the ball",
    meaning: "خیلی باسواد و تیز",
    lesson: 85,
    pos: "phr.",
    lessonLabel: "درس 85 — اصطلاح‌های مرتبط با تحسین و انتقاد"
  },
  {
    word: "has a way with",
    meaning: "رابطهٔ خوبی با ... دارد",
    lesson: 85,
    pos: "phr.",
    lessonLabel: "درس 85 — اصطلاح‌های مرتبط با تحسین و انتقاد"
  },
  {
    word: "has green fingers",
    meaning: "دستش سبز است (در باغبانی ماهر است)",
    lesson: 85,
    pos: "phr.",
    lessonLabel: "درس 85 — اصطلاح‌های مرتبط با تحسین و انتقاد"
  },
  {
    word: "got the gift of the gab",
    meaning: "زبان‌باز و خوش‌صحبت است",
    lesson: 85,
    pos: "phr.",
    lessonLabel: "درس 85 — اصطلاح‌های مرتبط با تحسین و انتقاد"
  },
  {
    word: "the cat's whiskers",
    meaning: "خیلی خودش را عالی می‌داند",
    lesson: 85,
    pos: "phr.",
    lessonLabel: "درس 85 — اصطلاح‌های مرتبط با تحسین و انتقاد"
  },
  {
    word: "the bee's knees",
    meaning: "خیلی خودش را فوق‌العاده می‌داند",
    lesson: 85,
    pos: "phr.",
    lessonLabel: "درس 85 — اصطلاح‌های مرتبط با تحسین و انتقاد"
  },
  {
    word: "dog's dinner",
    meaning: "پوشیده به شکلی گزنده و پرنقش‌ونگار",
    lesson: 85,
    pos: "phr.",
    lessonLabel: "درس 85 — اصطلاح‌های مرتبط با تحسین و انتقاد"
  },
  {
    word: "the world's worst",
    meaning: "بدترین در دنیا",
    lesson: 85,
    pos: "phr.",
    lessonLabel: "درس 85 — اصطلاح‌های مرتبط با تحسین و انتقاد"
  },
  {
    word: "dog's breakfast",
    meaning: "یک آش‌وشور، کار خیلی بد",
    lesson: 85,
    pos: "phr.",
    lessonLabel: "درس 85 — اصطلاح‌های مرتبط با تحسین و انتقاد"
  },
  {
    word: "takes the biscuit",
    meaning: "از همه هم بدتر (شاخص‌ترین مثال یک کیفیت منفی)",
    lesson: 85,
    pos: "phr.",
    lessonLabel: "درس 85 — اصطلاح‌های مرتبط با تحسین و انتقاد"
  },
  {
    word: "wants to have her cake and eat it",
    meaning: "می‌خواهد هم کیک داشته باشد و هم بخورد (همه‌چیز را بدون دادن چیزی بخواهد)",
    lesson: 85,
    pos: "phr.",
    lessonLabel: "درس 85 — اصطلاح‌های مرتبط با تحسین و انتقاد"
  },
  {
    word: "butter me up",
    meaning: "پاچه‌خویسی کردن",
    lesson: 85,
    pos: "phr.",
    lessonLabel: "درس 85 — اصطلاح‌های مرتبط با تحسین و انتقاد"
  },
  {
    word: "want jam on it",
    meaning: "انتظارات کاملاً نامعقول داشتن",
    lesson: 85,
    pos: "phr.",
    lessonLabel: "درس 85 — اصطلاح‌های مرتبط با تحسین و انتقاد"
  },
  {
    word: "run down",
    meaning: "بدگویی کردن، تحقیر کردن",
    lesson: 85,
    pos: "phr.",
    lessonLabel: "درس 85 — اصطلاح‌های مرتبط با تحسین و انتقاد"
  },
  {
    word: "pick holes",
    meaning: "نقص‌گیری کردن، عیب‌جویی کردن",
    lesson: 85,
    pos: "phr.",
    lessonLabel: "درس 85 — اصطلاح‌های مرتبط با تحسین و انتقاد"
  },
  {
    word: "criticise",
    meaning: "انتقاد کردن",
    lesson: 85,
    pos: "v.",
    lessonLabel: "درس 85 — اصطلاح‌های مرتبط با تحسین و انتقاد"
  },
  {
    word: "talk at cross-purposes",
    meaning: "دو نفر درباره چیزهای متفاوتی حرف بزنند و متوجه منظور هم نشوند",
    lesson: 86,
    lessonLabel: "درس 86 — اصطلاح‌های مرتبط با به‌کارگیری زبان"
  },
  {
    word: "get the wrong end of the stick",
    meaning: "برداشت اشتباه کردن؛ سوءتفاهم شدن",
    lesson: 86,
    lessonLabel: "درس 86 — اصطلاح‌های مرتبط با به‌کارگیری زبان"
  },
  {
    word: "can't get a word in edgeways",
    meaning: "نشدن فرصت حرف زدن چون دیگری مدام حرف می‌زند",
    lesson: 86,
    lessonLabel: "درس 86 — اصطلاح‌های مرتبط با به‌کارگیری زبان"
  },
  {
    word: "can't make head or tail of something",
    meaning: "نشنین چیزی از چیزی فهمیدن",
    lesson: 86,
    lessonLabel: "درس 86 — اصطلاح‌های مرتبط با به‌کارگیری زبان"
  },
  {
    word: "talk down to someone",
    meaning: "با لحن تحقیرآمیز حرف زدن",
    lesson: 86,
    lessonLabel: "درس 86 — اصطلاح‌های مرتبط با به‌کارگیری زبان"
  },
  {
    word: "talk behind someone's back",
    meaning: "پشت سر کسی حرف زدن",
    lesson: 86,
    lessonLabel: "درس 86 — اصطلاح‌های مرتبط با به‌کارگیری زبان"
  },
  {
    word: "small talk",
    meaning: "گفتگوی اجتماعی و سبک، بحث جدی",
    lesson: 86,
    lessonLabel: "درس 86 — اصطلاح‌های مرتبط با به‌کارگیری زبان"
  },
  {
    word: "talk shop",
    meaning: "حرف زدن درباره کار",
    lesson: 86,
    lessonLabel: "درس 86 — اصطلاح‌های مرتبط با به‌کارگیری زبان"
  },
  {
    word: "talking-point",
    meaning: "موضوعی که همه می‌خواهند درباره‌اش حرف بزنند",
    lesson: 86,
    lessonLabel: "درس 86 — اصطلاح‌های مرتبط با به‌کارگیری زبان"
  },
  {
    word: "give someone a talking to",
    meaning: "سرزنش کردن؛ توبیخ کردن",
    lesson: 86,
    lessonLabel: "درس 86 — اصطلاح‌های مرتبط با به‌کارگیری زبان"
  },
  {
    word: "start the ball rolling",
    meaning: "شروع کردن بحث",
    lesson: 86,
    lessonLabel: "درس 86 — اصطلاح‌های مرتبط با به‌کارگیری زبان"
  },
  {
    word: "to put it in a nutshell",
    meaning: "خلاصه بگویم",
    lesson: 86,
    lessonLabel: "درس 86 — اصطلاح‌های مرتبط با به‌کارگیری زبان"
  },
  {
    word: "get to the point",
    meaning: "نکته اصلی مطلب رسیدن",
    lesson: 86,
    lessonLabel: "درس 86 — اصطلاح‌های مرتبط با به‌کارگیری زبان"
  },
  {
    word: "speak one's mind",
    meaning: "صادقانه و مستقیم نظر خود گفتن",
    lesson: 86,
    lessonLabel: "درس 86 — اصطلاح‌های مرتبط با به‌کارگیری زبان"
  },
  {
    word: "wrap up the discussion",
    meaning: "بحث را تمام کردن",
    lesson: 86,
    lessonLabel: "درس 86 — اصطلاح‌های مرتبط با به‌کارگیری زبان"
  },
  {
    word: "talk sense",
    meaning: "چیزهای منطقی و معقول گفتن",
    lesson: 86,
    lessonLabel: "درس 86 — اصطلاح‌های مرتبط با به‌کارگیری زبان"
  },
  {
    word: "talk rubbish",
    meaning: "چرت و پرت گفتن",
    lesson: 86,
    lessonLabel: "درس 86 — اصطلاح‌های مرتبط با به‌کارگیری زبان"
  },
  {
    word: "long-winded",
    meaning: "پرحرف؛ طولانی و پرحاشیه حرف زدن",
    lesson: 86,
    lessonLabel: "درس 86 — اصطلاح‌های مرتبط با به‌کارگیری زبان"
  },
  {
    word: "a pig in a poke",
    meaning: "چیزی که بدون بررسی قبلی خریده شده و معمولاً بد از آب درآمده",
    lesson: 87,
    pos: "phr.",
    lessonLabel: "درس 87 — اصطلاح‌های متفرقه"
  },
  {
    word: "pay over the odds",
    meaning: "بیشتر از نرخ معمول پرداخت کردن",
    lesson: 87,
    pos: "phr.",
    lessonLabel: "درس 87 — اصطلاح‌های متفرقه"
  },
  {
    word: "foot the bill",
    meaning: "قبض (هزینهٔ سنگین) را پرداخت کردن",
    lesson: 87,
    pos: "phr.",
    lessonLabel: "درس 87 — اصطلاح‌های متفرقه"
  },
  {
    word: "a (real) rip-off",
    meaning: "کلاه‌برداری؛ پرداخت بیش از حد",
    lesson: 87,
    pos: "n.",
    lessonLabel: "درس 87 — اصطلاح‌های متفرقه"
  },
  {
    word: "rip off (ripped us off)",
    meaning: "کلاه گذاشتن؛ گران‌فروشی به کسی",
    lesson: 87,
    pos: "v.",
    lessonLabel: "درس 87 — اصطلاح‌های متفرقه"
  },
  {
    word: "drive a hard bargain",
    meaning: "سخت‌گیری در چانه‌زنی و معامله",
    lesson: 87,
    pos: "phr.",
    lessonLabel: "درس 87 — اصطلاح‌های متفرقه"
  },
  {
    word: "pay through the nose",
    meaning: "مبلغ هنگفتی پرداخت کردن",
    lesson: 87,
    pos: "phr.",
    lessonLabel: "درس 87 — اصطلاح‌های متفرقه"
  },
  {
    word: "make quite a bit of headway",
    meaning: "پیشرفت قابل‌توجهی کردن",
    lesson: 87,
    pos: "phr.",
    lessonLabel: "درس 87 — اصطلاح‌های متفرقه"
  },
  {
    word: "have something/song on the brain",
    meaning: "ذهنش اشغال شده باشد؛ مدام به چیزی فکر کردن",
    lesson: 87,
    pos: "phr.",
    lessonLabel: "درس 87 — اصطلاح‌های متفرقه"
  },
  {
    word: "get it off my chest",
    meaning: "حرف دل را از دل بیرون کشیدن و گفتن",
    lesson: 87,
    pos: "phr.",
    lessonLabel: "درس 87 — اصطلاح‌های متفرقه"
  },
  {
    word: "hand it to someone",
    meaning: "اعتراف کردن به شایستگی/قدرت کسی",
    lesson: 87,
    pos: "phr.",
    lessonLabel: "درس 87 — اصطلاح‌های متفرقه"
  },
  {
    word: "have/keep a finger in every pie",
    meaning: "در همهٔ کارها دست داشتن",
    lesson: 87,
    pos: "phr.",
    lessonLabel: "درس 87 — اصطلاح‌های متفرقه"
  },
  {
    word: "rise and shine",
    meaning: "بخیز و بدرخش! (دستور بیدار شدن)",
    lesson: 87,
    pos: "phr.",
    lessonLabel: "درس 87 — اصطلاح‌های متفرقه"
  },
  {
    word: "get a bite to eat",
    meaning: "چیزی سریع خوردن؛ میان‌وعده خوردن",
    lesson: 87,
    pos: "phr.",
    lessonLabel: "درس 87 — اصطلاح‌های متفرقه"
  },
  {
    word: "have a nap",
    meaning: "چرت کوتاه زدن",
    lesson: 87,
    pos: "phr.",
    lessonLabel: "درس 87 — اصطلاح‌های متفرقه"
  },
  {
    word: "freshen up",
    meaning: "خود را شست‌وشو و مرتب کردن",
    lesson: 87,
    pos: "phr.",
    lessonLabel: "درس 87 — اصطلاح‌های متفرقه"
  },
  {
    word: "be ready to crash out",
    meaning: "از خستگی خم شدن؛ آمادگی خوابیدن در هر جا",
    lesson: 87,
    pos: "phr.",
    lessonLabel: "درس 87 — اصطلاح‌های متفرقه"
  },
  {
    word: "put our feet up",
    meaning: "استراحت کردن؛ لم دادن",
    lesson: 87,
    pos: "phr.",
    lessonLabel: "درس 87 — اصطلاح‌های متفرقه"
  },
  {
    word: "watch the box",
    meaning: "تلویزیون تماشا کردن",
    lesson: 87,
    pos: "phr.",
    lessonLabel: "درس 87 — اصطلاح‌های متفرقه"
  },
  {
    word: "Don't count your chickens before they are hatched.",
    meaning: "قبل از اینکه جوجه‌ها از تخم دربیایند آن‌ها را نشمار (قبل از نتیجه قطعی، عجله نکن)",
    lesson: 88,
    pos: "phr.",
    lessonLabel: "درس 88 — ضرب‌المثل‌ها"
  },
  {
    word: "Don't put all your eggs in one basket.",
    meaning: "همهٔ تخم‌مرغ‌ها را در یک سبد نگذار (همهٔ منابع را روی یک چیز شرط ببند)",
    lesson: 88,
    pos: "phr.",
    lessonLabel: "درس 88 — ضرب‌المثل‌ها"
  },
  {
    word: "Never judge a book by its cover.",
    meaning: "هرگز ظاهر را ملاک قضاوت نکن",
    lesson: 88,
    pos: "phr.",
    lessonLabel: "درس 88 — ضرب‌المثل‌ها"
  },
  {
    word: "Never look a gift-horse in the mouth.",
    meaning: "دندان اسب هدیه را نشمار",
    lesson: 88,
    pos: "phr.",
    lessonLabel: "درس 88 — ضرب‌المثل‌ها"
  },
  {
    word: "Take care of the pence and the pounds will take care of themselves.",
    meaning: "از پول‌های خرد مراقب کن، پول‌های کلان خودشان سر و سامان می‌یابند",
    lesson: 88,
    pos: "phr.",
    lessonLabel: "درس 88 — ضرب‌المثل‌ها"
  },
  {
    word: "When the cat's away, the mice will play.",
    meaning: "وقتی گربه غایب است، موش‌ها می‌رقصند",
    lesson: 88,
    pos: "phr.",
    lessonLabel: "درس 88 — ضرب‌المثل‌ها"
  },
  {
    word: "You can lead a horse to water but you can't make it drink.",
    meaning: "می‌توانی اسب را تا کنار آب ببری اما نمی‌توانی وادارش به نوشیدن کنی",
    lesson: 88,
    pos: "phr.",
    lessonLabel: "درس 88 — ضرب‌المثل‌ها"
  },
  {
    word: "One swallow doesn't make a summer.",
    meaning: "یک پرستو بهار نمی‌سازد",
    lesson: 88,
    pos: "phr.",
    lessonLabel: "درس 88 — ضرب‌المثل‌ها"
  },
  {
    word: "There's no smoke without fire. or Where there's smoke, there's fire.",
    meaning: "بدون آتش دودی درنمی‌گیرد (شایعه معمولاً بخشی حقیقت دارد)",
    lesson: 88,
    pos: "phr.",
    lessonLabel: "درس 88 — ضرب‌المثل‌ها"
  },
  {
    word: "Too many cooks spoil the broth.",
    meaning: "آشپز که دو تا شد، یا آش می‌سوزد یا دوقلو",
    lesson: 88,
    pos: "phr.",
    lessonLabel: "درس 88 — ضرب‌المثل‌ها"
  },
  {
    word: "People who live in glass houses shouldn't throw stones.",
    meaning: "کسانی که خانه‌شان شیشه‌ای است نباید سنگ پرت کنند (اگر خودت عیب داری عیب دیگران را مگیر)",
    lesson: 88,
    pos: "phr.",
    lessonLabel: "درس 88 — ضرب‌المثل‌ها"
  },
  {
    word: "Many hands make light work.",
    meaning: "دست‌های زیاد کار را سبک می‌کند",
    lesson: 88,
    pos: "phr.",
    lessonLabel: "درس 88 — ضرب‌المثل‌ها"
  },
  {
    word: "do without",
    meaning: "بدون چیزی سر کردن، بی‌چیزی گذراندن",
    lesson: 89,
    pos: "phr.",
    lessonLabel: "درس 89 — عبارت‌های با do و make"
  },
  {
    word: "do away with",
    meaning: "لغو کردن، منسوخ کردن",
    lesson: 89,
    pos: "phr.",
    lessonLabel: "درس 89 — عبارت‌های با do و make"
  },
  {
    word: "do out of",
    meaning: "محروم کردن (با فریب)",
    lesson: 89,
    pos: "phr.",
    lessonLabel: "درس 89 — عبارت‌های با do و make"
  },
  {
    word: "make for",
    meaning: "به سمت چیزی رفتن",
    lesson: 89,
    pos: "phr.",
    lessonLabel: "درس 89 — عبارت‌های با do و make"
  },
  {
    word: "make of",
    meaning: "عقیده داشتن دربارهٔ چیزی",
    lesson: 89,
    pos: "phr.",
    lessonLabel: "درس 89 — عبارت‌های با do و make"
  },
  {
    word: "make off",
    meaning: "به‌سرعت فرار کردن",
    lesson: 89,
    pos: "phr.",
    lessonLabel: "درس 89 — عبارت‌های با do و make"
  },
  {
    word: "make up for",
    meaning: "جبران کردن",
    lesson: 89,
    pos: "phr.",
    lessonLabel: "درس 89 — عبارت‌های با do و make"
  },
  {
    word: "make up to",
    meaning: "خوش‌رفتاری برای گرفتن چیزی",
    lesson: 89,
    pos: "phr.",
    lessonLabel: "درس 89 — عبارت‌های با do و make"
  },
  {
    word: "do up",
    meaning: "بستن؛ بازسازی؛ بسته‌بندی کردن",
    lesson: 89,
    pos: "phr.",
    lessonLabel: "درس 89 — عبارت‌های با do و make"
  },
  {
    word: "make out",
    meaning: "ادعا کردن؛ تشخیص دادن؛ نوشتن/تکمیل کردن",
    lesson: 89,
    pos: "phr.",
    lessonLabel: "درس 89 — عبارت‌های با do و make"
  },
  {
    word: "make up",
    meaning: "ساختن/دروغ‌بافیدن؛ تشکیل دادن؛ آرایش کردن؛ آماده کردن؛ جبران کمبود کردن",
    lesson: 89,
    pos: "phr.",
    lessonLabel: "درس 89 — عبارت‌های با do و make"
  },
  {
    word: "do the housework",
    meaning: "کارهای خانه را انجام دادن",
    lesson: 89,
    pos: "phr.",
    lessonLabel: "درس 89 — عبارت‌های با do و make"
  },
  {
    word: "do some gardening",
    meaning: "کار باغبانی کردن",
    lesson: 89,
    pos: "phr.",
    lessonLabel: "درس 89 — عبارت‌های با do و make"
  },
  {
    word: "do the washing up",
    meaning: "ظرف‌شویی کردن",
    lesson: 89,
    pos: "phr.",
    lessonLabel: "درس 89 — عبارت‌های با do و make"
  },
  {
    word: "do homework",
    meaning: "تکلیف درسی انجام دادن",
    lesson: 89,
    pos: "phr.",
    lessonLabel: "درس 89 — عبارت‌های با do و make"
  },
  {
    word: "do your best",
    meaning: "نهایت تلاش خود را کردن",
    lesson: 89,
    pos: "phr.",
    lessonLabel: "درس 89 — عبارت‌های با do و make"
  },
  {
    word: "do the shopping",
    meaning: "خرید کردن",
    lesson: 89,
    pos: "phr.",
    lessonLabel: "درس 89 — عبارت‌های با do و make"
  },
  {
    word: "do the cooking",
    meaning: "غذا پختن",
    lesson: 89,
    pos: "phr.",
    lessonLabel: "درس 89 — عبارت‌های با do و make"
  },
  {
    word: "do business with",
    meaning: "با کسی معامله/کار کردن",
    lesson: 89,
    pos: "phr.",
    lessonLabel: "درس 89 — عبارت‌های با do و make"
  },
  {
    word: "make arrangements",
    meaning: "ترتیبات دادن",
    lesson: 89,
    pos: "phr.",
    lessonLabel: "درس 89 — عبارت‌های با do و make"
  },
  {
    word: "make an agreement",
    meaning: "توافق کردن",
    lesson: 89,
    pos: "phr.",
    lessonLabel: "درس 89 — عبارت‌های با do و make"
  },
  {
    word: "make a suggestion",
    meaning: "پیشنهاد دادن",
    lesson: 89,
    pos: "phr.",
    lessonLabel: "درس 89 — عبارت‌های با do و make"
  },
  {
    word: "make a decision",
    meaning: "تصمیم گرفتن",
    lesson: 89,
    pos: "phr.",
    lessonLabel: "درس 89 — عبارت‌های با do و make"
  },
  {
    word: "make a cup of tea",
    meaning: "چای درست کردن",
    lesson: 89,
    pos: "phr.",
    lessonLabel: "درس 89 — عبارت‌های با do و make"
  },
  {
    word: "make war",
    meaning: "جنگ راه انداختن",
    lesson: 89,
    pos: "phr.",
    lessonLabel: "درس 89 — عبارت‌های با do و make"
  },
  {
    word: "make an attempt",
    meaning: "تلاش کردن",
    lesson: 89,
    pos: "phr.",
    lessonLabel: "درس 89 — عبارت‌های با do و make"
  },
  {
    word: "make a phone call",
    meaning: "تماس تلفنی برقرار کردن",
    lesson: 89,
    pos: "phr.",
    lessonLabel: "درس 89 — عبارت‌های با do و make"
  },
  {
    word: "make the best of",
    meaning: "بهترین استفاده را کردن",
    lesson: 89,
    pos: "phr.",
    lessonLabel: "درس 89 — عبارت‌های با do و make"
  },
  {
    word: "make an effort",
    meaning: "تلاش کردن",
    lesson: 89,
    pos: "phr.",
    lessonLabel: "درس 89 — عبارت‌های با do و make"
  },
  {
    word: "make an excuse",
    meaning: "بهانه آوردن",
    lesson: 89,
    pos: "phr.",
    lessonLabel: "درس 89 — عبارت‌های با do و make"
  },
  {
    word: "make a mistake",
    meaning: "اشتباه کردن",
    lesson: 89,
    pos: "phr.",
    lessonLabel: "درس 89 — عبارت‌های با do و make"
  },
  {
    word: "make a profit",
    meaning: "سود کردن",
    lesson: 89,
    pos: "phr.",
    lessonLabel: "درس 89 — عبارت‌های با do و make"
  },
  {
    word: "make a loss",
    meaning: "ضرر کردن",
    lesson: 89,
    pos: "phr.",
    lessonLabel: "درس 89 — عبارت‌های با do و make"
  },
  {
    word: "make love",
    meaning: "عشق‌بازی کردن",
    lesson: 89,
    pos: "phr.",
    lessonLabel: "درس 89 — عبارت‌های با do و make"
  },
  {
    word: "make the most of",
    meaning: "بهترین بهره را بردن از",
    lesson: 89,
    pos: "phr.",
    lessonLabel: "درس 89 — عبارت‌های با do و make"
  },
  {
    word: "make a noise",
    meaning: "سر و صدا کردن",
    lesson: 89,
    pos: "phr.",
    lessonLabel: "درس 89 — عبارت‌های با do و make"
  },
  {
    word: "make a good or bad impression",
    meaning: "تأثیر خوب یا بد گذاشتن",
    lesson: 89,
    pos: "phr.",
    lessonLabel: "درس 89 — عبارت‌های با do و make"
  },
  {
    word: "make a success of",
    meaning: "موفق شدن در",
    lesson: 89,
    pos: "phr.",
    lessonLabel: "درس 89 — عبارت‌های با do و make"
  },
  {
    word: "make a point of",
    meaning: "اهمییت دادن به، تاکید کردن بر",
    lesson: 89,
    pos: "phr.",
    lessonLabel: "درس 89 — عبارت‌های با do و make"
  },
  {
    word: "make allowances for",
    meaning: "چشم‌پوشی کردن از، گذشت داشتن",
    lesson: 89,
    pos: "phr.",
    lessonLabel: "درس 89 — عبارت‌های با do و make"
  },
  {
    word: "make a gesture",
    meaning: "اشاره کردن، حرکتی نشان دادن",
    lesson: 89,
    pos: "phr.",
    lessonLabel: "درس 89 — عبارت‌های با do و make"
  },
  {
    word: "make a face",
    meaning: "قلمبه سولمبه درآوردن",
    lesson: 89,
    pos: "phr.",
    lessonLabel: "درس 89 — عبارت‌های با do و make"
  },
  {
    word: "make fun of",
    meaning: "مسخره کردن",
    lesson: 89,
    pos: "phr.",
    lessonLabel: "درس 89 — عبارت‌های با do و make"
  },
  {
    word: "make a fuss of",
    meaning: "سروصدا راه انداختن، از کسی استقبال گرم کردن",
    lesson: 89,
    pos: "phr.",
    lessonLabel: "درس 89 — عبارت‌های با do و make"
  },
  {
    word: "make a go (a success) of",
    meaning: "موفق شدن در کاری",
    lesson: 89,
    pos: "phr.",
    lessonLabel: "درس 89 — عبارت‌های با do و make"
  },
  {
    word: "bring up",
    meaning: "بزرگ کردن (کودک)",
    lesson: 90,
    pos: "phr.",
    lessonLabel: "درس 90 — عبارت‌های با bring و take"
  },
  {
    word: "bring it off",
    meaning: "موفق شدن در کاری",
    lesson: 90,
    pos: "phr.",
    lessonLabel: "درس 90 — عبارت‌های با bring و take"
  },
  {
    word: "bring on",
    meaning: "تحریک کردن، باعث شروع شدن شدن",
    lesson: 90,
    pos: "phr.",
    lessonLabel: "درس 90 — عبارت‌های با bring و take"
  },
  {
    word: "bring about",
    meaning: "موجب شدن، سبب وقوع شدن",
    lesson: 90,
    pos: "phr.",
    lessonLabel: "درس 90 — عبارت‌های با bring و take"
  },
  {
    word: "bring back",
    meaning: "دوباره برقرار کردن",
    lesson: 90,
    pos: "phr.",
    lessonLabel: "درس 90 — عبارت‌های با bring و take"
  },
  {
    word: "bring down",
    meaning: "کاهش دادن / ساقط کردن (حکومت)",
    lesson: 90,
    pos: "phr.",
    lessonLabel: "درس 90 — عبارت‌های با bring و take"
  },
  {
    word: "bring out",
    meaning: "عرضه کردن، معرفی کردن",
    lesson: 90,
    pos: "phr.",
    lessonLabel: "درس 90 — عبارت‌های با bring و take"
  },
  {
    word: "bring him round",
    meaning: "متقاعد کردن",
    lesson: 90,
    pos: "phr.",
    lessonLabel: "درس 90 — عبارت‌های با bring و take"
  },
  {
    word: "take after",
    meaning: "شبیه بودن",
    lesson: 90,
    pos: "phr.",
    lessonLabel: "درس 90 — عبارت‌های با bring و take"
  },
  {
    word: "take back",
    meaning: "پس گرفتن (حرف)",
    lesson: 90,
    pos: "phr.",
    lessonLabel: "درس 90 — عبارت‌های با bring و take"
  },
  {
    word: "take in",
    meaning: "درک کردن / فریب خوردن",
    lesson: 90,
    pos: "phr.",
    lessonLabel: "درس 90 — عبارت‌های با bring و take"
  },
  {
    word: "taken in",
    meaning: "فریفته شدن",
    lesson: 90,
    pos: "phr.",
    lessonLabel: "درس 90 — عبارت‌های با bring و take"
  },
  {
    word: "take off",
    meaning: "رونق گرفتن / برخاستن هواپیما / تقلید کردن",
    lesson: 90,
    pos: "phr.",
    lessonLabel: "درس 90 — عبارت‌های با bring و take"
  },
  {
    word: "take on",
    meaning: "استخدام کردن؛ پذیرفتن",
    lesson: 90,
    pos: "phr.",
    lessonLabel: "درس 90 — عبارت‌های با bring و take"
  },
  {
    word: "take to",
    meaning: "بلافاصله علاقه‌مند شدن به",
    lesson: 90,
    pos: "phr.",
    lessonLabel: "درس 90 — عبارت‌های با bring و take"
  },
  {
    word: "take up",
    meaning: "شروع کردن (سرگرمی)",
    lesson: 90,
    pos: "phr.",
    lessonLabel: "درس 90 — عبارت‌های با bring و take"
  },
  {
    word: "be brought into force",
    meaning: "اجرا شدن (قانون)",
    lesson: 90,
    pos: "phr.",
    lessonLabel: "درس 90 — عبارت‌های با bring و take"
  },
  {
    word: "bring to light",
    meaning: "آشکار کردن",
    lesson: 90,
    pos: "phr.",
    lessonLabel: "درس 90 — عبارت‌های با bring و take"
  },
  {
    word: "bring to a head",
    meaning: "به نقطهٔ بحران رساندن",
    lesson: 90,
    pos: "phr.",
    lessonLabel: "درس 90 — عبارت‌های با bring و take"
  },
  {
    word: "bring into the open",
    meaning: "علنی کردن",
    lesson: 90,
    pos: "phr.",
    lessonLabel: "درس 90 — عبارت‌های با bring و take"
  },
  {
    word: "bring out of the best in him",
    meaning: "بهترین ویژگی‌های او را شکوفا کردن",
    lesson: 90,
    pos: "phr.",
    lessonLabel: "درس 90 — عبارت‌های با bring و take"
  },
  {
    word: "take advantage of",
    meaning: "سوءاستفاده کردن از",
    lesson: 90,
    pos: "phr.",
    lessonLabel: "درس 90 — عبارت‌های با bring و take"
  },
  {
    word: "take her for granted",
    meaning: "او را بدیهی فرض کردن، قدرش ندانستن",
    lesson: 90,
    pos: "phr.",
    lessonLabel: "درس 90 — عبارت‌های با bring و take"
  },
  {
    word: "take it for granted",
    meaning: "فرض قطعی کردن",
    lesson: 90,
    pos: "phr.",
    lessonLabel: "درس 90 — عبارت‌های با bring و take"
  },
  {
    word: "take control",
    meaning: "کنترل امور را به دست گرفتن",
    lesson: 90,
    pos: "phr.",
    lessonLabel: "درس 90 — عبارت‌های با bring و take"
  },
  {
    word: "take my breath away",
    meaning: "بهت‌زده کردن",
    lesson: 90,
    pos: "phr.",
    lessonLabel: "درس 90 — عبارت‌های با bring و take"
  },
  {
    word: "take care",
    meaning: "مراقبت کردن",
    lesson: 90,
    pos: "phr.",
    lessonLabel: "درس 90 — عبارت‌های با bring و take"
  },
  {
    word: "take part in",
    meaning: "شرکت کردن در",
    lesson: 90,
    pos: "phr.",
    lessonLabel: "درس 90 — عبارت‌های با bring و take"
  },
  {
    word: "take place",
    meaning: "اتفاق افتادن، رخ دادن",
    lesson: 90,
    pos: "phr.",
    lessonLabel: "درس 90 — عبارت‌های با bring و take"
  },
  {
    word: "take pride in",
    meaning: "افتخار کردن به، از کاری رضایت گرفتن",
    lesson: 90,
    pos: "phr.",
    lessonLabel: "درس 90 — عبارت‌های با bring و take"
  },
  {
    word: "take in her stride",
    meaning: "خونسردانه پذیرفتن",
    lesson: 90,
    pos: "phr.",
    lessonLabel: "درس 90 — عبارت‌های با bring و take"
  },
  {
    word: "get",
    meaning: "گرفتن، تهیه کردن، شدن",
    lesson: 91,
    pos: "v.",
    lessonLabel: "درس 91 — عبارت‌های با get"
  },
  {
    word: "get dinner",
    meaning: "شام/غذا درست کردن",
    lesson: 91,
    pos: "phr.",
    lessonLabel: "درس 91 — عبارت‌های با get"
  },
  {
    word: "get it",
    meaning: "متوجه شدن",
    lesson: 91,
    pos: "phr.",
    lessonLabel: "درس 91 — عبارت‌های با get"
  },
  {
    word: "get someone",
    meaning: "اعصاب کسی را خرد کردن، اذیت کردن",
    lesson: 91,
    pos: "phr.",
    lessonLabel: "درس 91 — عبارت‌های با get"
  },
  {
    word: "get to know",
    meaning: "آشنا شدن",
    lesson: 91,
    pos: "phr.",
    lessonLabel: "درس 91 — عبارت‌های با get"
  },
  {
    word: "get at",
    meaning: "رسیدن، پیدا کردن",
    lesson: 91,
    pos: "phr.",
    lessonLabel: "درس 91 — عبارت‌های با get"
  },
  {
    word: "get away with",
    meaning: "بدون مجازات از پس کار خلاف برآمدن",
    lesson: 91,
    pos: "phr.",
    lessonLabel: "درس 91 — عبارت‌های با get"
  },
  {
    word: "get behind",
    meaning: "از انجام کاری عقب افتادن",
    lesson: 91,
    pos: "phr.",
    lessonLabel: "درس 91 — عبارت‌های با get"
  },
  {
    word: "get by",
    meaning: "（از نظر مالی) امرار معاش کردن",
    lesson: 91,
    pos: "phr.",
    lessonLabel: "درس 91 — عبارت‌های با get"
  },
  {
    word: "get down",
    meaning: "افسرده کردن",
    lesson: 91,
    pos: "phr.",
    lessonLabel: "درس 91 — عبارت‌های با get"
  },
  {
    word: "get down to",
    meaning: "شروع به جدی گرفتن کاری کردن",
    lesson: 91,
    pos: "phr.",
    lessonLabel: "درس 91 — عبارت‌های با get"
  },
  {
    word: "get on",
    meaning: "خوب مدیریت کردن",
    lesson: 91,
    pos: "phr.",
    lessonLabel: "درس 91 — عبارت‌های با get"
  },
  {
    word: "get out of",
    meaning: "از زیر مسئولیت شانه خالی کردن",
    lesson: 91,
    pos: "phr.",
    lessonLabel: "درس 91 — عبارت‌های با get"
  },
  {
    word: "get over",
    meaning: "بهبود یافتن، غلبه کردن",
    lesson: 91,
    pos: "phr.",
    lessonLabel: "درس 91 — عبارت‌های با get"
  },
  {
    word: "get round",
    meaning: "پیچیدن (خبر)",
    lesson: 91,
    pos: "phr.",
    lessonLabel: "درس 91 — عبارت‌های با get"
  },
  {
    word: "get through",
    meaning: "با موفقیت به پایان رساندن",
    lesson: 91,
    pos: "phr.",
    lessonLabel: "درس 91 — عبارت‌های با get"
  },
  {
    word: "get up to",
    meaning: "انجام دادن (به‌خصوص کار بد)",
    lesson: 91,
    pos: "phr.",
    lessonLabel: "درس 91 — عبارت‌های با get"
  },
  {
    word: "get out of bed on the wrong side",
    meaning: "از طرف بد رختخواب بلند شدن؛ بدخلق بودن",
    lesson: 91,
    pos: "phr.",
    lessonLabel: "درس 91 — عبارت‌های با get"
  },
  {
    word: "get off to a good/bad start",
    meaning: "شروع خوب/بد کردن",
    lesson: 91,
    pos: "phr.",
    lessonLabel: "درس 91 — عبارت‌های با get"
  },
  {
    word: "get-together",
    meaning: "مهمانی/جمع دوستانه غیررسمی",
    lesson: 91,
    pos: "n.",
    lessonLabel: "درس 91 — عبارت‌های با get"
  },
  {
    word: "get rid of",
    meaning: "خلاص شدن از شر",
    lesson: 91,
    pos: "phr.",
    lessonLabel: "درس 91 — عبارت‌های با get"
  },
  {
    word: "get my own back",
    meaning: "انتقام گرفتن",
    lesson: 91,
    pos: "phr.",
    lessonLabel: "درس 91 — عبارت‌های با get"
  },
  {
    word: "set aside",
    meaning: "کنار گذاشتن (پول کنار گذاشتن؛ نادیده گرفتن احساسات)",
    lesson: 92,
    pos: "v.",
    lessonLabel: "درس 92 — عبارت‌های با set و put"
  },
  {
    word: "set off",
    meaning: "به راه افتادن (سفر)؛ باعث شدن",
    lesson: 92,
    pos: "v.",
    lessonLabel: "درس 92 — عبارت‌های با set و put"
  },
  {
    word: "set out",
    meaning: "شروع کردن کار با هدفی مشخص",
    lesson: 92,
    pos: "v.",
    lessonLabel: "درس 92 — عبارت‌های با set و put"
  },
  {
    word: "set up",
    meaning: "تأسیس کردن، برپا کردن",
    lesson: 92,
    pos: "v.",
    lessonLabel: "درس 92 — عبارت‌های با set و put"
  },
  {
    word: "put (one's name) forward",
    meaning: "پیشنهاد کردن، نامزد کردن",
    lesson: 92,
    pos: "v.",
    lessonLabel: "درس 92 — عبارت‌های با set و put"
  },
  {
    word: "put in",
    meaning: " ارائه دادن؛ نصب کردن؛ اظهار کردن",
    lesson: 92,
    pos: "v.",
    lessonLabel: "درس 92 — عبارت‌های با set و put"
  },
  {
    word: "put (ideas) across",
    meaning: "رساندن (افکار) به دیگران، منتقل کردن",
    lesson: 92,
    pos: "v.",
    lessonLabel: "درس 92 — عبارت‌های با set و put"
  },
  {
    word: "put (opponents) down",
    meaning: "کوچک کردن، تحقیر کردن کسی",
    lesson: 92,
    pos: "v.",
    lessonLabel: "درس 92 — عبارت‌های با set و put"
  },
  {
    word: "put on",
    meaning: "اجرا کردن (نمایش)؛ خود را به داشتن چیزی زدن",
    lesson: 92,
    pos: "v.",
    lessonLabel: "درس 92 — عبارت‌های با set و put"
  },
  {
    word: "put (members) out",
    meaning: "مزاحم کسی شدن، دلخور/رنجانده کردن",
    lesson: 92,
    pos: "v.",
    lessonLabel: "درس 92 — عبارت‌های با set و put"
  },
  {
    word: "put away",
    meaning: "سرِ جای خود گذاشتن، مرتب کردن",
    lesson: 92,
    pos: "v.",
    lessonLabel: "درس 92 — عبارت‌های با set و put"
  },
  {
    word: "put up",
    meaning: "جا دادن (اسکان دادن)؛ افزایش دادن؛ نصب/چسباندن",
    lesson: 92,
    pos: "v.",
    lessonLabel: "درس 92 — عبارت‌های با set و put"
  },
  {
    word: "put off",
    meaning: "به تعویق انداختن؛ حواس‌پرت کردن",
    lesson: 92,
    pos: "v.",
    lessonLabel: "درس 92 — عبارت‌های با set و put"
  },
  {
    word: "put out",
    meaning: "خاموش کردن (آتش)",
    lesson: 92,
    pos: "v.",
    lessonLabel: "درس 92 — عبارت‌های با set و put"
  },
  {
    word: "put up with",
    meaning: "تحمل کردن",
    lesson: 92,
    pos: "v.",
    lessonLabel: "درس 92 — عبارت‌های با set و put"
  },
  {
    word: "set one's heart/sights on",
    meaning: "آرزوی شدید داشتن، طمع بستن به",
    lesson: 92,
    pos: "phr.",
    lessonLabel: "درس 92 — عبارت‌های با set و put"
  },
  {
    word: "set/put the world to rights",
    meaning: "گفت‌وگو دربارهٔ مسائل مهم جهان",
    lesson: 92,
    pos: "phr.",
    lessonLabel: "درس 92 — عبارت‌های با set و put"
  },
  {
    word: "set fire to",
    meaning: "آتش زدن",
    lesson: 92,
    pos: "phr.",
    lessonLabel: "درس 92 — عبارت‌های با set و put"
  },
  {
    word: "set on fire",
    meaning: "شعله‌ور شدن/کردن",
    lesson: 92,
    pos: "phr.",
    lessonLabel: "درس 92 — عبارت‌های با set و put"
  },
  {
    word: "set foot in",
    meaning: "قدم گذاشتن در، رفتن به",
    lesson: 92,
    pos: "phr.",
    lessonLabel: "درس 92 — عبارت‌های با set و put"
  },
  {
    word: "set in one's ways",
    meaning: "خوگرفته، مقید به عادت‌های خود",
    lesson: 92,
    pos: "phr.",
    lessonLabel: "درس 92 — عبارت‌های با set و put"
  },
  {
    word: "set a good example",
    meaning: "الگوی خوبی بودن",
    lesson: 92,
    pos: "phr.",
    lessonLabel: "درس 92 — عبارت‌های با set و put"
  },
  {
    word: "put your foot down",
    meaning: "محکم بودن دربارهٔ چیزی",
    lesson: 92,
    pos: "phr.",
    lessonLabel: "درس 92 — عبارت‌های با set و put"
  },
  {
    word: "put all your eggs in one basket",
    meaning: "ریسک کردن همهٔ دارایی روی یک کار واحد",
    lesson: 92,
    pos: "phr.",
    lessonLabel: "درس 92 — عبارت‌های با set و put"
  },
  {
    word: "put your mind to",
    meaning: "تمام فکر و ذهن را معطوف چیزی کردن",
    lesson: 92,
    pos: "phr.",
    lessonLabel: "درس 92 — عبارت‌های با set و put"
  },
  {
    word: "put two and two together",
    meaning: "نتیجهٔ بدیهی گرفتن",
    lesson: 92,
    pos: "phr.",
    lessonLabel: "درس 92 — عبارت‌های با set و put"
  },
  {
    word: "put something in a nutshell",
    meaning: "چیزی را مختصر و دقیق بیان کردن",
    lesson: 92,
    pos: "phr.",
    lessonLabel: "درس 92 — عبارت‌های با set و put"
  },
  {
    word: "put someone's back up",
    meaning: "کسی را عصبانی/رنجانده کردن",
    lesson: 92,
    pos: "phr.",
    lessonLabel: "درس 92 — عبارت‌های با set و put"
  },
  {
    word: "a put-up job",
    meaning: "کاری از پیش طراحی‌شده برای ایجاد تصور نادرست",
    lesson: 92,
    pos: "phr.",
    lessonLabel: "درس 92 — عبارت‌های با set و put"
  },
  {
    word: "come off",
    meaning: "برگزار شدن / موفق شدن",
    lesson: 93,
    pos: "v.",
    lessonLabel: "درس 93 — عبارت‌های با come و go"
  },
  {
    word: "come out",
    meaning: "منتشر شدن",
    lesson: 93,
    pos: "v.",
    lessonLabel: "درس 93 — عبارت‌های با come و go"
  },
  {
    word: "come up",
    meaning: "مطرح شدن",
    lesson: 93,
    pos: "v.",
    lessonLabel: "درس 93 — عبارت‌های با come و go"
  },
  {
    word: "come round",
    meaning: "سر زدن (دیدار غیررسمی)",
    lesson: 93,
    pos: "v.",
    lessonLabel: "درس 93 — عبارت‌های با come و go"
  },
  {
    word: "come between",
    meaning: "فاصله انداختن بین؛ جدا کردن",
    lesson: 93,
    pos: "v.",
    lessonLabel: "درس 93 — عبارت‌های با come و go"
  },
  {
    word: "come across",
    meaning: "اتفاقی پیدا کردن",
    lesson: 93,
    pos: "v.",
    lessonLabel: "درس 93 — عبارت‌های با come و go"
  },
  {
    word: "come by",
    meaning: "به دست آوردن",
    lesson: 93,
    pos: "v.",
    lessonLabel: "درس 93 — عبارت‌های با come و go"
  },
  {
    word: "come to",
    meaning: "رسیدن به (توافق، نتیجه و...)",
    lesson: 93,
    pos: "v.",
    lessonLabel: "درس 93 — عبارت‌های با come و go"
  },
  {
    word: "come into",
    meaning: "به ارث رسیدن / شروع شدن",
    lesson: 93,
    pos: "v.",
    lessonLabel: "درس 93 — عبارت‌های با come و go"
  },
  {
    word: "go on",
    meaning: "اتفاق افتادن؛ ادامه دادن",
    lesson: 93,
    pos: "v.",
    lessonLabel: "درس 93 — عبارت‌های با come و go"
  },
  {
    word: "go through",
    meaning: "تجربه کردن؛ بررسی کردن؛ خرج کردن",
    lesson: 93,
    pos: "v.",
    lessonLabel: "درس 93 — عبارت‌های با come و go"
  },
  {
    word: "go for",
    meaning: "حمله کردن؛ علاقه داشتن؛ انتخاب کردن",
    lesson: 93,
    pos: "v.",
    lessonLabel: "درس 93 — عبارت‌های با come و go"
  },
  {
    word: "go with",
    meaning: "هماهنگ بودن، جور بودن",
    lesson: 93,
    pos: "v.",
    lessonLabel: "درس 93 — عبارت‌های با come و go"
  },
  {
    word: "go back on",
    meaning: "پشت سر هم گذاشتن (قول)",
    lesson: 93,
    pos: "v.",
    lessonLabel: "درس 93 — عبارت‌های با come و go"
  },
  {
    word: "make a go of",
    meaning: "موفق شدن در",
    lesson: 93,
    pos: "phr.",
    lessonLabel: "درس 93 — عبارت‌های با come و go"
  },
  {
    word: "on the go",
    meaning: "خیلی سرخکل، در حال فعالیت",
    lesson: 93,
    pos: "phr.",
    lessonLabel: "درس 93 — عبارت‌های با come و go"
  },
  {
    word: "go without saying",
    meaning: "بدون گفتن بدیهی است",
    lesson: 93,
    pos: "phr.",
    lessonLabel: "درس 93 — عبارت‌های با come و go"
  },
  {
    word: "as far as it goes",
    meaning: "تا جایی که (کیفیتش) است؛ محدود",
    lesson: 93,
    pos: "phr.",
    lessonLabel: "درس 93 — عبارت‌های با come و go"
  },
  {
    word: "go far",
    meaning: "بسیار موفق شدن",
    lesson: 93,
    pos: "phr.",
    lessonLabel: "درس 93 — عبارت‌های با come و go"
  },
  {
    word: "go to great lengths",
    meaning: "زحمت زیادی کشیدن",
    lesson: 93,
    pos: "phr.",
    lessonLabel: "درس 93 — عبارت‌های با come و go"
  },
  {
    word: "go bankrupt",
    meaning: "ورشکسته شدن",
    lesson: 93,
    pos: "phr.",
    lessonLabel: "درس 93 — عبارت‌های با come و go"
  },
  {
    word: "come to a standstill",
    meaning: "متوقف شدن",
    lesson: 93,
    pos: "phr.",
    lessonLabel: "درس 93 — عبارت‌های با come و go"
  },
  {
    word: "come to blows",
    meaning: "درگیر شدن، دعوا کردن",
    lesson: 93,
    pos: "phr.",
    lessonLabel: "درس 93 — عبارت‌های با come و go"
  },
  {
    word: "come to terms with",
    meaning: "پذیرفتن (روانی)",
    lesson: 93,
    pos: "phr.",
    lessonLabel: "درس 93 — عبارت‌های با come و go"
  },
  {
    word: "come to one's senses",
    meaning: "به خود آمدن؛ عقل آمدن",
    lesson: 93,
    pos: "phr.",
    lessonLabel: "درس 93 — عبارت‌های با come و go"
  },
  {
    word: "come into bloom",
    meaning: "شکفتن",
    lesson: 93,
    pos: "phr.",
    lessonLabel: "درس 93 — عبارت‌های با come و go"
  },
  {
    word: "come into flower",
    meaning: "گل دادن",
    lesson: 93,
    pos: "phr.",
    lessonLabel: "درس 93 — عبارت‌های با come و go"
  },
  {
    word: "come into contact",
    meaning: "در تماس بودن",
    lesson: 93,
    pos: "phr.",
    lessonLabel: "درس 93 — عبارت‌های با come و go"
  },
  {
    word: "come into a fortune",
    meaning: "به ارث رسیدن (ثروت)",
    lesson: 93,
    pos: "phr.",
    lessonLabel: "درس 93 — عبارت‌های با come و go"
  },
  {
    word: "come into a legacy",
    meaning: "به ارث رسیدن",
    lesson: 93,
    pos: "phr.",
    lessonLabel: "درس 93 — عبارت‌های با come و go"
  },
  {
    word: "come into operation",
    meaning: "شروع به کار کردن",
    lesson: 93,
    pos: "phr.",
    lessonLabel: "درس 93 — عبارت‌های با come و go"
  },
  {
    word: "come into sight",
    meaning: "پیدا شدن، دیدار شدن",
    lesson: 93,
    pos: "phr.",
    lessonLabel: "درس 93 — عبارت‌های با come و go"
  },
  {
    word: "come into view",
    meaning: "پیدا شدن",
    lesson: 93,
    pos: "phr.",
    lessonLabel: "درس 93 — عبارت‌های با come و go"
  },
  {
    word: "come into power",
    meaning: "به قدرت رسیدن",
    lesson: 93,
    pos: "phr.",
    lessonLabel: "درس 93 — عبارت‌های با come و go"
  },
  {
    word: "come into existence",
    meaning: "به وجود آمدن",
    lesson: 93,
    pos: "phr.",
    lessonLabel: "درس 93 — عبارت‌های با come و go"
  },
  {
    word: "come into fashion",
    meaning: "مد شدن",
    lesson: 93,
    pos: "phr.",
    lessonLabel: "درس 93 — عبارت‌های با come و go"
  },
  {
    word: "come into use",
    meaning: "مورد استفاده قرار گرفتن",
    lesson: 93,
    pos: "phr.",
    lessonLabel: "درس 93 — عبارت‌های با come و go"
  },
  {
    word: "look it up",
    meaning: "جست‌وجو کردن (در مرجع/دیکشنری)",
    lesson: 94,
    lessonLabel: "درس 94 — عبارت‌های متفرقه"
  },
  {
    word: "look forward to",
    meaning: "مشتاقانه منتظر بودن",
    lesson: 94,
    lessonLabel: "درس 94 — عبارت‌های متفرقه"
  },
  {
    word: "look out",
    meaning: "مواظب بودن، حواس‌مان باشد",
    lesson: 94,
    lessonLabel: "درس 94 — عبارت‌های متفرقه"
  },
  {
    word: "look down her nose at",
    meaning: "تحقیر نگاه کردن به، زیر لب نگاه کردن",
    lesson: 94,
    lessonLabel: "درس 94 — عبارت‌های متفرقه"
  },
  {
    word: "look on the bright side",
    meaning: "به جنبهٔ مثبت Things نگاه کردن، خوش‌بین بودن",
    lesson: 94,
    lessonLabel: "درس 94 — عبارت‌های متفرقه"
  },
  {
    word: "see about/to",
    meaning: "رسیدگی کردن به، هماهنگ کردن",
    lesson: 94,
    lessonLabel: "درس 94 — عبارت‌های متفرقه"
  },
  {
    word: "see your way to",
    meaning: "موافقت کردن به (لطفی کردن)",
    lesson: 94,
    lessonLabel: "درس 94 — عبارت‌های متفرقه"
  },
  {
    word: "see Jim off",
    meaning: "بدرقه کردن کسی",
    lesson: 94,
    lessonLabel: "درس 94 — عبارت‌های متفرقه"
  },
  {
    word: "see the wood for the trees",
    meaning: "چیزهای مهم را از جزئیات تشخیص دادن",
    lesson: 94,
    lessonLabel: "درس 94 — عبارت‌های متفرقه"
  },
  {
    word: "seeing things",
    meaning: "توهم دیدن، چیزهایی دیدن که واقعی نیست",
    lesson: 94,
    lessonLabel: "درس 94 — عبارت‌های متفرقه"
  },
  {
    word: "ran into",
    meaning: "اتفاقی بر خوردن با کسی",
    lesson: 94,
    lessonLabel: "درس 94 — عبارت‌های متفرقه"
  },
  {
    word: "run out",
    meaning: "تمام شدن (صبر و...)، صبرش سر رفت",
    lesson: 94,
    lessonLabel: "درس 94 — عبارت‌های متفرقه"
  },
  {
    word: "run over",
    meaning: "مرور کردن، بازبینی کردن",
    lesson: 94,
    lessonLabel: "درس 94 — عبارت‌های متفرقه"
  },
  {
    word: "run me off my feet",
    meaning: "خسته و کلافه کردن از سر کار زیاد",
    lesson: 94,
    lessonLabel: "درس 94 — عبارت‌های متفرقه"
  },
  {
    word: "runs the business",
    meaning: "اداره کردن کسب‌وکار",
    lesson: 94,
    lessonLabel: "درس 94 — عبارت‌های متفرقه"
  },
  {
    word: "turnout",
    meaning: "میزان حضور، جمعیت حاضر",
    lesson: 94,
    pos: "n.",
    lessonLabel: "درس 94 — عبارت‌های متفرقه"
  },
  {
    word: "turned down",
    meaning: "رد کردن (پیشنهاد)",
    lesson: 94,
    lessonLabel: "درس 94 — عبارت‌های متفرقه"
  },
  {
    word: "turned up",
    meaning: "ظاهر شدن، سرزده آمدن",
    lesson: 94,
    lessonLabel: "درس 94 — عبارت‌های متفرقه"
  },
  {
    word: "turn over a new leaf",
    meaning: "ورق برگرداندن، صفحهٔ تازه‌ای را آغاز کردن",
    lesson: 94,
    lessonLabel: "درس 94 — عبارت‌های متفرقه"
  },
  {
    word: "good turn",
    meaning: "لطف، خدمت",
    lesson: 94,
    lessonLabel: "درس 94 — عبارت‌های متفرقه"
  },
  {
    word: "your turn",
    meaning: "نوبت تو",
    lesson: 94,
    lessonLabel: "درس 94 — عبارت‌های متفرقه"
  },
  {
    word: "let down",
    meaning: "ناامید کردن، پشت کسی را خالی کردن",
    lesson: 94,
    lessonLabel: "درس 94 — عبارت‌های متفرقه"
  },
  {
    word: "let go",
    meaning: "رها کردن، ول کردن",
    lesson: 94,
    lessonLabel: "درس 94 — عبارت‌های متفرقه"
  },
  {
    word: "let me be",
    meaning: "رهایم کن، ول کن",
    lesson: 94,
    lessonLabel: "درس 94 — عبارت‌های متفرقه"
  },
  {
    word: "let it slip",
    meaning: "ناخواسته لو دادن، فوت کردن",
    lesson: 94,
    lessonLabel: "درس 94 — عبارت‌های متفرقه"
  },
  {
    word: "lets up",
    meaning: "کاهش یافتن، فروکش کردن (باران)",
    lesson: 94,
    lessonLabel: "درس 94 — عبارت‌های متفرقه"
  },
  {
    word: "broke down",
    meaning: "خراب شدن (خودرو/ماشین)",
    lesson: 94,
    lessonLabel: "درس 94 — عبارت‌های متفرقه"
  },
  {
    word: "broke into",
    meaning: "به‌زور وارد شدن، سرقت کردن",
    lesson: 94,
    lessonLabel: "درس 94 — عبارت‌های متفرقه"
  },
  {
    word: "breaking the bad news",
    meaning: "خبر بد را دادن",
    lesson: 94,
    lessonLabel: "درس 94 — عبارت‌های متفرقه"
  },
  {
    word: "broke her heart",
    meaning: "دلش را شکست",
    lesson: 94,
    lessonLabel: "درس 94 — عبارت‌های متفرقه"
  },
  {
    word: "broke the record",
    meaning: "رکورد را شکست",
    lesson: 94,
    lessonLabel: "درس 94 — عبارت‌های متفرقه"
  },
  {
    word: "offspring",
    meaning: "فرزندان",
    lesson: 95,
    pos: "n.",
    lessonLabel: "درس 95 — واژه‌های رسمی و غیررسمی (۱)"
  },
  {
    word: "abode/residence",
    meaning: "مسکن/اقامتگاه",
    lesson: 95,
    pos: "n.",
    lessonLabel: "درس 95 — واژه‌های رسمی و غیررسمی (۱)"
  },
  {
    word: "goodbye",
    meaning: "خداحافظ",
    lesson: 95,
    pos: "n.",
    lessonLabel: "درس 95 — واژه‌های رسمی و غیررسمی (۱)"
  },
  {
    word: "alcoholic beverages",
    meaning: "نوشیدنی‌های الکلی",
    lesson: 95,
    pos: "phr.",
    lessonLabel: "درس 95 — واژه‌های رسمی و غیررسمی (۱)"
  },
  {
    word: "go amiss",
    meaning: "خراب شدن، بد پیش رفتن",
    lesson: 95,
    pos: "phr.",
    lessonLabel: "درس 95 — واژه‌های رسمی و غیررسمی (۱)"
  },
  {
    word: "children",
    meaning: "بچه‌ها",
    lesson: 95,
    pos: "n.",
    lessonLabel: "درس 95 — واژه‌های رسمی و غیررسمی (۱)"
  },
  {
    word: "house/flat",
    meaning: "خانه/آپارتمان",
    lesson: 95,
    pos: "n.",
    lessonLabel: "درس 95 — واژه‌های رسمی و غیررسمی (۱)"
  },
  {
    word: "bye-bye",
    meaning: "خداحافظ (کودکانه)",
    lesson: 95,
    pos: "n.",
    lessonLabel: "درس 95 — واژه‌های رسمی و غیررسمی (۱)"
  },
  {
    word: "drink",
    meaning: "نوشیدنی",
    lesson: 95,
    pos: "n.",
    lessonLabel: "درس 95 — واژه‌های رسمی و غیررسمی (۱)"
  },
  {
    word: "go wrong",
    meaning: "خراب شدن",
    lesson: 95,
    pos: "phr.",
    lessonLabel: "درس 95 — واژه‌های رسمی و غیررسمی (۱)"
  },
  {
    word: "kids",
    meaning: "بچه‌ها (غیررسمی)",
    lesson: 95,
    pos: "n.",
    lessonLabel: "درس 95 — واژه‌های رسمی و غیررسمی (۱)"
  },
  {
    word: "place",
    meaning: "جا، مکان",
    lesson: 95,
    pos: "n.",
    lessonLabel: "درس 95 — واژه‌های رسمی و غیررسمی (۱)"
  },
  {
    word: "bye or cheerio",
    meaning: "خداحافظ (غیررسمی)",
    lesson: 95,
    pos: "n.",
    lessonLabel: "درس 95 — واژه‌های رسمی و غیررسمی (۱)"
  },
  {
    word: "booze",
    meaning: "مشروب (غیررسمی)",
    lesson: 95,
    pos: "n.",
    lessonLabel: "درس 95 — واژه‌های رسمی و غیررسمی (۱)"
  },
  {
    word: "go pear-shaped",
    meaning: "به هم ریختن، خراب شدن (غیررسمی)",
    lesson: 95,
    pos: "phr.",
    lessonLabel: "درس 95 — واژه‌های رسمی و غیررسمی (۱)"
  },
  {
    word: "quid",
    meaning: "پوند (غیررسمی)",
    lesson: 95,
    pos: "n.",
    lessonLabel: "درس 95 — واژه‌های رسمی و غیررسمی (۱)"
  },
  {
    word: "spuds",
    meaning: "سیب‌زمینی‌ها (غیررسمی)",
    lesson: 95,
    pos: "n.",
    lessonLabel: "درس 95 — واژه‌های رسمی و غیررسمی (۱)"
  },
  {
    word: "bike",
    meaning: "دوچرخه",
    lesson: 95,
    pos: "n.",
    lessonLabel: "درس 95 — واژه‌های رسمی و غیررسمی (۱)"
  },
  {
    word: "Mum and Dad",
    meaning: "مامان و بابا",
    lesson: 95,
    pos: "n.",
    lessonLabel: "درس 95 — واژه‌های رسمی و غیررسمی (۱)"
  },
  {
    word: "tube",
    meaning: "متروی لندن (غیررسمی)",
    lesson: 95,
    pos: "n.",
    lessonLabel: "درس 95 — واژه‌های رسمی و غیررسمی (۱)"
  },
  {
    word: "cab",
    meaning: "تاکسی",
    lesson: 95,
    pos: "n.",
    lessonLabel: "درس 95 — واژه‌های رسمی و غیررسمی (۱)"
  },
  {
    word: "lab(oratory)",
    meaning: "آزمایشگاه",
    lesson: 95,
    pos: "n.",
    lessonLabel: "درس 95 — واژه‌های رسمی و غیررسمی (۱)"
  },
  {
    word: "telly",
    meaning: "تلویزیون (غیررسمی)",
    lesson: 95,
    pos: "n.",
    lessonLabel: "درس 95 — واژه‌های رسمی و غیررسمی (۱)"
  },
  {
    word: "ad(vertisement) / advert(isement)",
    meaning: "آگهی",
    lesson: 95,
    pos: "n.",
    lessonLabel: "درس 95 — واژه‌های رسمی و غیررسمی (۱)"
  },
  {
    word: "(news)paper",
    meaning: "روزنامه",
    lesson: 95,
    pos: "n.",
    lessonLabel: "درس 95 — واژه‌های رسمی و غیررسمی (۱)"
  },
  {
    word: "(tele)phone",
    meaning: "تلفن زدن",
    lesson: 95,
    pos: "v.",
    lessonLabel: "درس 95 — واژه‌های رسمی و غیررسمی (۱)"
  },
  {
    word: "vet(erinary surgeon)",
    meaning: "دامپزشک",
    lesson: 95,
    pos: "n.",
    lessonLabel: "درس 95 — واژه‌های رسمی و غیررسمی (۱)"
  },
  {
    word: "mobile (phone)",
    meaning: "موبایل",
    lesson: 95,
    pos: "n.",
    lessonLabel: "درس 95 — واژه‌های رسمی و غیررسمی (۱)"
  },
  {
    word: "alight",
    meaning: "پیاده شدن (از وسیله نقلیه)",
    lesson: 95,
    pos: "v.",
    lessonLabel: "درس 95 — واژه‌های رسمی و غیررسمی (۱)"
  },
  {
    word: "stationary",
    meaning: "بی‌حرکت، ساکن",
    lesson: 95,
    pos: "adj.",
    lessonLabel: "درس 95 — واژه‌های رسمی و غیررسمی (۱)"
  },
  {
    word: "deposit",
    meaning: "گذاشتن، سپردن",
    lesson: 95,
    pos: "v.",
    lessonLabel: "درس 95 — واژه‌های رسمی و غیررسمی (۱)"
  },
  {
    word: "purchase",
    meaning: "خریدن",
    lesson: 95,
    pos: "v.",
    lessonLabel: "درس 95 — واژه‌های رسمی و غیررسمی (۱)"
  },
  {
    word: "board",
    meaning: "سوار شدن",
    lesson: 95,
    pos: "v.",
    lessonLabel: "درس 95 — واژه‌های رسمی و غیررسمی (۱)"
  },
  {
    word: "regret",
    meaning: "متأسف بودن",
    lesson: 95,
    pos: "v.",
    lessonLabel: "درس 95 — واژه‌های رسمی و غیررسمی (۱)"
  },
  {
    word: "slang",
    meaning: "زبان عامیانه؛ اصطلاحات خیلی غیررسمی",
    lesson: 96,
    pos: "n.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "coppers",
    meaning: "پلیس‌ها (عامیانه، معمولاً بی‌مشکل)",
    lesson: 96,
    pos: "n.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "pigs",
    meaning: "خوک‌ها (اصطلاح توهین‌آمیز برای پلیس)",
    lesson: 96,
    pos: "n.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "sozzled",
    meaning: "مست (عامیانه قابل‌استفاده در جمع)",
    lesson: 96,
    pos: "adj.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "pissed",
    meaning: "مست (عامیانه و ناپسند)",
    lesson: 96,
    pos: "adj.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "arseholed",
    meaning: "خیلی مست (خیلی زننده)",
    lesson: 96,
    pos: "adj.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "top-hole",
    meaning: "عالی (عامیانه قدیمی، قبل از جنگ)",
    lesson: 96,
    pos: "adj.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "wizard",
    meaning: "شگفت‌انگیز (عامیانه دهه ۴۰)",
    lesson: 96,
    pos: "adj.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "fab",
    meaning: "فوق‌العاده (عامیانه دهه ۶۰)",
    lesson: 96,
    pos: "adj.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "groovy",
    meaning: "عالی، باحال (عامیانه دهه ۶۰)",
    lesson: 96,
    pos: "adj.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "ace",
    meaning: "عالی (عامیانه دهه ۷۰)",
    lesson: 96,
    pos: "adj.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "cosmic",
    meaning: "فوق‌العاده (عامیانه دهه ۷۰)",
    lesson: 96,
    pos: "adj.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "brill",
    meaning: "عالی (عامیانه دهه ۸۰)",
    lesson: 96,
    pos: "adj.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "wicked",
    meaning: "باحال، عالی (عامیانه دهه ۸۰)",
    lesson: 96,
    pos: "adj.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "cool",
    meaning: "عالی، باحال (عامیانه دهه ۹۰)",
    lesson: 96,
    pos: "adj.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "class",
    meaning: "درجه‌یک، عالی (عامیانه دهه ۹۰)",
    lesson: 96,
    pos: "adj.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "dough",
    meaning: "پول (عامیانه)",
    lesson: 96,
    pos: "n.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "bread",
    meaning: "پول (عامیانه)",
    lesson: 96,
    pos: "n.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "dosh",
    meaning: "پول (عامیانه)",
    lesson: 96,
    pos: "n.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "loot",
    meaning: "پول (عامیانه)",
    lesson: 96,
    pos: "n.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "brass",
    meaning: "پول (عامیانه)",
    lesson: 96,
    pos: "n.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "readies",
    meaning: "پول نقد (عامیانه)",
    lesson: 96,
    pos: "n.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "fuzz",
    meaning: "پلیس (عامیانه)",
    lesson: 96,
    pos: "n.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "cop(pers)",
    meaning: "پلیس (عامیانه)",
    lesson: 96,
    pos: "n.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "bill",
    meaning: "پلیس (عامیانه)",
    lesson: 96,
    pos: "n.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "pie-eyed",
    meaning: "مست (عامیانه)",
    lesson: 96,
    pos: "adj.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "paralytic",
    meaning: "خیلی مست (ناپسند)",
    lesson: 96,
    pos: "adj.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "legless",
    meaning: "خیلی مست",
    lesson: 96,
    pos: "adj.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "wally",
    meaning: "آدم احمق (عامیانه)",
    lesson: 96,
    pos: "n.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "prat",
    meaning: "احمق، خنگ (عامیانه)",
    lesson: 96,
    pos: "n.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "wanker",
    meaning: "کون‌... (توهین شدید)",
    lesson: 96,
    pos: "n.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "jerk",
    meaning: "خنگ، احمق (عامیانه)",
    lesson: 96,
    pos: "n.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "dickhead",
    meaning: "توهین شدید برای آدم احمق",
    lesson: 96,
    pos: "n.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "plonker",
    meaning: "احمق (عامیانه)",
    lesson: 96,
    pos: "n.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "pillock",
    meaning: "خنگ، احمق (ناپسند)",
    lesson: 96,
    pos: "n.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "dork",
    meaning: "خنگ (عامیانه)",
    lesson: 96,
    pos: "n.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "clueless",
    meaning: "نما‌گیر، بی‌سواد از موضوع",
    lesson: 96,
    pos: "adj.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "out-to-lunch",
    meaning: "حواسش جای دیگه است (عامیانه)",
    lesson: 96,
    pos: "phr.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "doesn't know his arse from his elbow",
    meaning: "کاملاً گیج و بی‌عقل (توهین‌آمیز)",
    lesson: 96,
    pos: "phr.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "loo",
    meaning: "توالت (عامیانه ولی قابل قبول)",
    lesson: 96,
    pos: "n.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "lav",
    meaning: "توالت (عامیانه)",
    lesson: 96,
    pos: "n.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "bog",
    meaning: "توالت (ناپسند)",
    lesson: 96,
    pos: "n.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "john",
    meaning: "توالت (عامیانه آمریکایی)",
    lesson: 96,
    pos: "n.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "booze",
    meaning: "الکل (عامیانه)",
    lesson: 96,
    pos: "n.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "plonk",
    meaning: "شراب ارزان (عامیانه)",
    lesson: 96,
    pos: "n.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "a bevvy",
    meaning: "یک نوشیدنی (عامیانه)",
    lesson: 96,
    pos: "n.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "a fix",
    meaning: "یک بار تزریق مواد مخدر (عامیانه)",
    lesson: 96,
    pos: "n.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "dope",
    meaning: "مواد مخدر (عامیانه)",
    lesson: 96,
    pos: "n.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "grass",
    meaning: "ماری‌جوانا (عامیانه)",
    lesson: 96,
    pos: "n.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "high",
    meaning: "نشئه، سرخوش از مواد",
    lesson: 96,
    pos: "adj.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "stoned",
    meaning: "نشئه از مواد مخدر",
    lesson: 96,
    pos: "adj.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "snow",
    meaning: "هروئین (عامیانه)",
    lesson: 96,
    pos: "n.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "nick",
    meaning: "زندان (عامیانه)",
    lesson: 96,
    pos: "n.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "nark",
    meaning: "جاسوس، خبرچین (عامیانه)",
    lesson: 96,
    pos: "n.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "screw",
    meaning: "زندان‌بان (عامیانه)",
    lesson: 96,
    pos: "n.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "grandma lane",
    meaning: "خط آهسته (عامیانه رانندگان کامیون آمریکا)",
    lesson: 96,
    pos: "n.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "five finger discount",
    meaning: "کالای دزدی (عامیانه)",
    lesson: 96,
    pos: "phr.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "super cola",
    meaning: "آب‌جو (عامیانه)",
    lesson: 96,
    pos: "n.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "doughnuts",
    meaning: "لاستیک‌ها (عامیانه رانندگان)",
    lesson: 96,
    pos: "n.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "anklebiters",
    meaning: "بچه‌ها (عامیانه)",
    lesson: 96,
    pos: "n.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "affirmative",
    meaning: "بله، تأیید (عامیانه بی‌سیم)",
    lesson: 96,
    pos: "adj.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "motion lotion",
    meaning: "سوخت (عامیانه)",
    lesson: 96,
    pos: "n.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "eyeballs",
    meaning: "چراغ‌های جلو (عامیانه)",
    lesson: 96,
    pos: "n.",
    lessonLabel: "درس 96 — واژه‌های رسمی و غیررسمی (۲)"
  },
  {
    word: "gasoline",
    meaning: "بنزین",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "petrol",
    meaning: "بنزین (بریتانیایی)",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "truck",
    meaning: "کامیون",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "lorry",
    meaning: "کامیون (بریتانیایی)",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "baggage",
    meaning: "چمدان و بار مسافر",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "luggage",
    meaning: "بار و چمدان (بریتانیایی)",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "sidewalk",
    meaning: "پیاده‌رو",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "pavement",
    meaning: "پیاده‌رو (بریتانیایی)",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "crosswalk",
    meaning: "خط عابر پیاده",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "zebra crossing",
    meaning: "خط عابر پیاده (بریتانیایی)",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "line",
    meaning: "صف",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "queue",
    meaning: "صف (بریتانیایی)",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "vacation",
    meaning: "تعطیلات",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "holiday",
    meaning: "تعطیلات (بریتانیایی)",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "parking lot",
    meaning: "پارکینگ",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "car park",
    meaning: "پارکینگ (بریتانیایی)",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "trunk (of car)",
    meaning: "صندوق عقب ماشین",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "boot",
    meaning: "صندوق عقب ماشین (بریتانیایی)",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "hood (of car)",
    meaning: "کاپوت ماشین",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "bonnet",
    meaning: "کاپوت ماشین (بریتانیایی)",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "freeway/highway",
    meaning: "بزرگراه",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "motorway",
    meaning: "اتوبان (بریتانیایی)",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "round trip",
    meaning: "رفت و برگشت",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "return",
    meaning: "رفت و برگشت (بریتانیایی)",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "one way",
    meaning: "یک‌طرفه",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "single",
    meaning: "یک‌طرفه (بریتانیایی)",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "railway car",
    meaning: "واگن قطار",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "railway carriage",
    meaning: "واگن قطار (بریتانیایی)",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "engineer (on train)",
    meaning: "موتوربان قطار",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "engine driver",
    meaning: "موتوربان قطار (بریتانیایی)",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "baby carriage",
    meaning: "کالسکه نوزاد",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "pram",
    meaning: "کالسکه نوزاد (بریتانیایی)",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "subway",
    meaning: "مترو",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "underground",
    meaning: "مترو (بریتانیایی)",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "antenna",
    meaning: "آنتن",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "aerial",
    meaning: "آنتن (بریتانیایی)",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "elevator",
    meaning: "آسانسور",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "lift",
    meaning: "آسانسور (بریتانیایی)",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "eraser",
    meaning: "پاک‌کن",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "rubber",
    meaning: "پاک‌کن (بریتانیایی)",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "apartment",
    meaning: "آپارتمان",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "flat",
    meaning: "آپارتمان (بریتانیایی)",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "closet",
    meaning: "کمد لباس",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "wardrobe",
    meaning: "کمد لباس (بریتانیایی)",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "yard",
    meaning: "حیاط",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "garden",
    meaning: "حیاط/باغچه (بریتانیایی)",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "drapes",
    meaning: "پرده‌ها",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "curtains",
    meaning: "پرده‌ها (بریتانیایی)",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "flashlight",
    meaning: "چراغ‌قوه",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "torch",
    meaning: "چراغ‌قوه (بریتانیایی)",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "kerosene",
    meaning: "نفت",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "paraffin",
    meaning: "نفت (بریتانیایی)",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "Scotch tape",
    meaning: "چسب نواری",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "sellotape",
    meaning: "چسب نواری (بریتانیایی)",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "cookie",
    meaning: "بیسکویت/شیرینی",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "biscuit",
    meaning: "بیسکویت (بریتانیایی)",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "candy",
    meaning: "شکلات و آبنبات",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "sweets",
    meaning: "شیرینی‌جات (بریتانیایی)",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "bathroom, rest room",
    meaning: "دستشویی، سرویس بهداشتی",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "toilet, WC",
    meaning: "دستشویی (بریتانیایی)",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "garbage, trash",
    meaning: "آشغال",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "rubbish",
    meaning: "آشغال (بریتانیایی)",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "diaper",
    meaning: "پوشک",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "nappy",
    meaning: "پوشک (بریتانیایی)",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "pantihose",
    meaning: "جوراب‌شلواری",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "tights",
    meaning: "جوراب‌شلواری (بریتانیایی)",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "french fries",
    meaning: "سیب‌زمینی سرخ‌کرده",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "chips",
    meaning: "سیب‌زمینی سرخ‌کرده (بریتانیایی)",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "the fall",
    meaning: "پاییز",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "semester",
    meaning: "نیم‌سال تحصیلی",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "undershirt",
    meaning: "زیرپیراهن (آمریکایی)",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "vest",
    meaning: "زیرپیراهن (بریتانیایی) / جلیقه (آمریکایی)",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "underpants",
    meaning: "زیرشلواری",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "pants",
    meaning: "شلوار (آمریکایی) / زیرشلواری (بریتانیایی)",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "trousers",
    meaning: "شلوار (بریتانیایی)",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "waistcoat",
    meaning: "جلیقه (بریتانیایی)",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "check (AmE)",
    meaning: "برگه حساب (آمریکایی)",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "bill",
    meaning: "برگه حساب/اسکناس",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "(bank) note",
    meaning: "اسکناس (بریتانیایی)",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "wash the dishes",
    meaning: "ظرف شستن",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "wash up (AmE)",
    meaning: "دست و صورت شستن (آمریکایی)",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "wash up (BrE)",
    meaning: "ظرف شستن (بریتانیایی)",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "wash your hands",
    meaning: "دست شستن (بریتانیایی)",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "the second floor",
    meaning: "طبقه دوم (بریتانیایی) / طبقه سوم (آمریکایی)",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "the first floor",
    meaning: "طبقه اول (بریتانیایی)",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "the ground floor",
    meaning: "طبقه همکف (بریتانیایی) / طبقه اول (آمریکایی)",
    lesson: 97,
    lessonLabel: "درس 97 — انگلیسی آمریکایی"
  },
  {
    word: "truckie",
    meaning: "راننده کامیون",
    lesson: 98,
    pos: "n.",
    lessonLabel: "درس 98 — انگلیسی‌های دیگر"
  },
  {
    word: "milko",
    meaning: "شیرفروش",
    lesson: 98,
    pos: "n.",
    lessonLabel: "درس 98 — انگلیسی‌های دیگر"
  },
  {
    word: "beaut",
    meaning: "عالی، فوق‌العاده",
    lesson: 98,
    pos: "adj.",
    lessonLabel: "درس 98 — انگلیسی‌های دیگر"
  },
  {
    word: "biggie",
    meaning: "چیز بزرگ",
    lesson: 98,
    pos: "n.",
    lessonLabel: "درس 98 — انگلیسی‌های دیگر"
  },
  {
    word: "Oz",
    meaning: "استرالیا (کوتاه‌شده)",
    lesson: 98,
    pos: "n.",
    lessonLabel: "درس 98 — انگلیسی‌های دیگر"
  },
  {
    word: "Aussie",
    meaning: "استرالیایی",
    lesson: 98,
    pos: "n.",
    lessonLabel: "درس 98 — انگلیسی‌های دیگر"
  },
  {
    word: "bereaved",
    meaning: "داغدیده",
    lesson: 98,
    pos: "adj.",
    lessonLabel: "درس 98 — انگلیسی‌های دیگر"
  },
  {
    word: "condoled",
    meaning: "تسلیت‌گفته‌شده",
    lesson: 98,
    pos: "v.",
    lessonLabel: "درس 98 — انگلیسی‌های دیگر"
  },
  {
    word: "felicitated",
    meaning: "تبریک‌گفته‌شده",
    lesson: 98,
    pos: "v.",
    lessonLabel: "درس 98 — انگلیسی‌های دیگر"
  },
  {
    word: "bosom",
    meaning: "سینه",
    lesson: 98,
    pos: "n.",
    lessonLabel: "درس 98 — انگلیسی‌های دیگر"
  },
  {
    word: "miscreant",
    meaning: "یاغی، راهزن",
    lesson: 98,
    pos: "n.",
    lessonLabel: "درس 98 — انگلیسی‌های دیگر"
  },
  {
    word: "aye",
    meaning: "بله",
    lesson: 98,
    pos: "adv.",
    lessonLabel: "درس 98 — انگلیسی‌های دیگر"
  },
  {
    word: "loch",
    meaning: "دریاچه",
    lesson: 98,
    pos: "n.",
    lessonLabel: "درس 98 — انگلیسی‌های دیگر"
  },
  {
    word: "dreich",
    meaning: "کسل‌کننده، ملال‌آور",
    lesson: 98,
    pos: "adj.",
    lessonLabel: "درس 98 — انگلیسی‌های دیگر"
  },
  {
    word: "ben",
    meaning: "کوه",
    lesson: 98,
    pos: "n.",
    lessonLabel: "درس 98 — انگلیسی‌های دیگر"
  },
  {
    word: "to mind",
    meaning: "به یاد آوردن",
    lesson: 98,
    pos: "phr.",
    lessonLabel: "درس 98 — انگلیسی‌های دیگر"
  },
  {
    word: "janitor",
    meaning: "سرایدار",
    lesson: 98,
    pos: "n.",
    lessonLabel: "درس 98 — انگلیسی‌های دیگر"
  },
  {
    word: "brae",
    meaning: "کرانه (رودخانه)",
    lesson: 98,
    pos: "n.",
    lessonLabel: "درس 98 — انگلیسی‌های دیگر"
  },
  {
    word: "bairn",
    meaning: "کودک",
    lesson: 98,
    pos: "n.",
    lessonLabel: "درس 98 — انگلیسی‌های دیگر"
  },
  {
    word: "lassie",
    meaning: "دختر",
    lesson: 98,
    pos: "n.",
    lessonLabel: "درس 98 — انگلیسی‌های دیگر"
  },
  {
    word: "dram",
    meaning: "نوشیدنی (معمولاً ویسکی)",
    lesson: 98,
    pos: "n.",
    lessonLabel: "درس 98 — انگلیسی‌های دیگر"
  },
  {
    word: "bonny",
    meaning: "زیبا",
    lesson: 98,
    pos: "adj.",
    lessonLabel: "درس 98 — انگلیسی‌های دیگر"
  },
  {
    word: "outwith",
    meaning: "بیرون از",
    lesson: 98,
    pos: "prep.",
    lessonLabel: "درس 98 — انگلیسی‌های دیگر"
  },
  {
    word: "glen",
    meaning: "دره",
    lesson: 98,
    pos: "n.",
    lessonLabel: "درس 98 — انگلیسی‌های دیگر"
  },
  {
    word: "burn",
    meaning: "جویبار",
    lesson: 98,
    pos: "n.",
    lessonLabel: "درس 98 — انگلیسی‌های دیگر"
  },
  {
    word: "wee",
    meaning: "کوچک",
    lesson: 98,
    pos: "adj.",
    lessonLabel: "درس 98 — انگلیسی‌های دیگر"
  },
  {
    word: "kirk",
    meaning: "کلیسا",
    lesson: 98,
    pos: "n.",
    lessonLabel: "درس 98 — انگلیسی‌های دیگر"
  },
  {
    word: "stay",
    meaning: "زندگی کردن",
    lesson: 98,
    pos: "v.",
    lessonLabel: "درس 98 — انگلیسی‌های دیگر"
  },
  {
    word: "ken",
    meaning: "دانستن",
    lesson: 98,
    pos: "v.",
    lessonLabel: "درس 98 — انگلیسی‌های دیگر"
  },
  {
    word: "dreadlocks",
    meaning: "مدل موی راستافاری",
    lesson: 98,
    pos: "n.",
    lessonLabel: "درس 98 — انگلیسی‌های دیگر"
  },
  {
    word: "beat",
    meaning: "خسته و کوفته",
    lesson: 98,
    pos: "adj.",
    lessonLabel: "درس 98 — انگلیسی‌های دیگر"
  },
  {
    word: "chick",
    meaning: "دختر",
    lesson: 98,
    pos: "n.",
    lessonLabel: "درس 98 — انگلیسی‌های دیگر"
  },
  {
    word: "dig",
    meaning: "فهمیدن",
    lesson: 98,
    pos: "v.",
    lessonLabel: "درس 98 — انگلیسی‌های دیگر"
  },
  {
    word: "jam",
    meaning: "بداهه‌نوازی کردن",
    lesson: 98,
    pos: "v.",
    lessonLabel: "درس 98 — انگلیسی‌های دیگر"
  },
  {
    word: "pad",
    meaning: "تخت‌خواب",
    lesson: 98,
    pos: "n.",
    lessonLabel: "درس 98 — انگلیسی‌های دیگر"
  },
  {
    word: "rap",
    meaning: "گفتگوی خیابانی",
    lesson: 98,
    pos: "n.",
    lessonLabel: "درس 98 — انگلیسی‌های دیگر"
  },
  {
    word: "square",
    meaning: "کسل‌کننده، قدیمی",
    lesson: 98,
    pos: "adj.",
    lessonLabel: "درس 98 — انگلیسی‌های دیگر"
  },
  {
    word: "aid*",
    meaning: "کمک کردن/کمک",
    lesson: 99,
    pos: "n.",
    lessonLabel: "درس 99 — انگلیسی تیترها"
  },
  {
    word: "axe*",
    meaning: "قطع کردن، حذف کردن",
    lesson: 99,
    lessonLabel: "درس 99 — انگلیسی تیترها"
  },
  {
    word: "back (verb)",
    meaning: "حمایت کردن",
    lesson: 99,
    pos: "v.",
    lessonLabel: "درس 99 — انگلیسی تیترها"
  },
  {
    word: "bar*",
    meaning: "ممنوع کردن، محروم کردن",
    lesson: 99,
    lessonLabel: "درس 99 — انگلیسی تیترها"
  },
  {
    word: "bid*",
    meaning: "تلاش، کوشش",
    lesson: 99,
    lessonLabel: "درس 99 — انگلیسی تیترها"
  },
  {
    word: "blast*",
    meaning: "انفجار",
    lesson: 99,
    lessonLabel: "درس 99 — انگلیسی تیترها"
  },
  {
    word: "blaze*",
    meaning: "آتش‌سوزی",
    lesson: 99,
    lessonLabel: "درس 99 — انگلیسی تیترها"
  },
  {
    word: "boost*",
    meaning: "تشویق، تقویت",
    lesson: 99,
    lessonLabel: "درس 99 — انگلیسی تیترها"
  },
  {
    word: "boss*",
    meaning: "مدیر، رئیس",
    lesson: 99,
    lessonLabel: "درس 99 — انگلیسی تیترها"
  },
  {
    word: "head*",
    meaning: "مدیر، رئیس",
    lesson: 99,
    lessonLabel: "درس 99 — انگلیسی تیترها"
  },
  {
    word: "clash*",
    meaning: "اختلاف، درگیری",
    lesson: 99,
    lessonLabel: "درس 99 — انگلیسی تیترها"
  },
  {
    word: "curb*",
    meaning: "مهار، محدودیت",
    lesson: 99,
    lessonLabel: "درس 99 — انگلیسی تیترها"
  },
  {
    word: "cut*",
    meaning: "کاهش",
    lesson: 99,
    lessonLabel: "درس 99 — انگلیسی تیترها"
  },
  {
    word: "drama",
    meaning: "موقعیت پرمخاطره، درام",
    lesson: 99,
    pos: "n.",
    lessonLabel: "درس 99 — انگلیسی تیترها"
  },
  {
    word: "drive*",
    meaning: "کارزار، تلاش",
    lesson: 99,
    lessonLabel: "درس 99 — انگلیسی تیترها"
  },
  {
    word: "gems (noun)",
    meaning: "جواهرات",
    lesson: 99,
    pos: "n.",
    lessonLabel: "درس 99 — انگلیسی تیترها"
  },
  {
    word: "go-ahead",
    meaning: "اجازه، تأیید",
    lesson: 99,
    lessonLabel: "درس 99 — انگلیسی تیترها"
  },
  {
    word: "hit (verb)",
    meaning: "به‌شدت آسیب زدن",
    lesson: 99,
    pos: "v.",
    lessonLabel: "درس 99 — انگلیسی تیترها"
  },
  {
    word: "key (adj.)",
    meaning: "اساسی، حیاتی",
    lesson: 99,
    pos: "adj.",
    lessonLabel: "درس 99 — انگلیسی تیترها"
  },
  {
    word: "link*",
    meaning: "ارتباط",
    lesson: 99,
    lessonLabel: "درس 99 — انگلیسی تیترها"
  },
  {
    word: "move*",
    meaning: "گامی به سوی هدف مطلوب",
    lesson: 99,
    lessonLabel: "درس 99 — انگلیسی تیترها"
  },
  {
    word: "ordeal (noun)",
    meaning: "تجربهٔ دردناک",
    lesson: 99,
    pos: "n.",
    lessonLabel: "درس 99 — انگلیسی تیترها"
  },
  {
    word: "oust (verb)",
    meaning: "بیرون راندن، برکنار کردن",
    lesson: 99,
    pos: "v.",
    lessonLabel: "درس 99 — انگلیسی تیترها"
  },
  {
    word: "plea (noun)",
    meaning: "درخواست",
    lesson: 99,
    pos: "n.",
    lessonLabel: "درس 99 — انگلیسی تیترها"
  },
  {
    word: "pledge*",
    meaning: "قول دادن، عهد",
    lesson: 99,
    lessonLabel: "درس 99 — انگلیسی تیترها"
  },
  {
    word: "ploy (noun)",
    meaning: "نقشهٔ هوشمندانه",
    lesson: 99,
    pos: "n.",
    lessonLabel: "درس 99 — انگلیسی تیترها"
  },
  {
    word: "poll*",
    meaning: "انتخابات / نظرسنجی افکار عمومی",
    lesson: 99,
    lessonLabel: "درس 99 — انگلیسی تیترها"
  },
  {
    word: "probe*",
    meaning: "تحقیق، بررسی",
    lesson: 99,
    lessonLabel: "درس 99 — انگلیسی تیترها"
  },
  {
    word: "quit (verb)",
    meaning: "ترک کردن، استعفا دادن",
    lesson: 99,
    pos: "v.",
    lessonLabel: "درس 99 — انگلیسی تیترها"
  },
  {
    word: "riddle (noun)",
    meaning: "معما",
    lesson: 99,
    pos: "n.",
    lessonLabel: "درس 99 — انگلیسی تیترها"
  },
  {
    word: "strife (noun)",
    meaning: "اختلاف، منازعه",
    lesson: 99,
    pos: "n.",
    lessonLabel: "درس 99 — انگلیسی تیترها"
  },
  {
    word: "talks (noun)",
    meaning: "مذاکرات",
    lesson: 99,
    pos: "n.",
    lessonLabel: "درس 99 — انگلیسی تیترها"
  },
  {
    word: "threat",
    meaning: "خطر، تهدید",
    lesson: 99,
    pos: "n.",
    lessonLabel: "درس 99 — انگلیسی تیترها"
  },
  {
    word: "vow*",
    meaning: "قسم دادن، عهد",
    lesson: 99,
    lessonLabel: "درس 99 — انگلیسی تیترها"
  },
  {
    word: "wed (verb)",
    meaning: "ازدواج کردن",
    lesson: 99,
    pos: "v.",
    lessonLabel: "درس 99 — انگلیسی تیترها"
  },
  {
    word: "Do not alight from the bus whilst it is in motion",
    meaning: "در حالی که اتوبوس در حرکت است از آن پیاده نشوید",
    lesson: 100,
    lessonLabel: "درس 100 — زبان علائم و اعلان‌ها"
  },
  {
    word: "NO ADMISSION TO UNACCOMPANIED MINORS",
    meaning: "ورود نابالغ‌های بدون همراه ممنوع",
    lesson: 100,
    lessonLabel: "درس 100 — زبان علائم و اعلان‌ها"
  },
  {
    word: "This packet carries a government health warning",
    meaning: "این بسته هشدار بهداشتی دولتی دارد",
    lesson: 100,
    lessonLabel: "درس 100 — زبان علائم و اعلان‌ها"
  },
  {
    word: "People who walk on this private land will be taken to court",
    meaning: "افرادی که روی این زمین خصوصی راه بروند به دادگاه برده می‌شوند",
    lesson: 100,
    lessonLabel: "درس 100 — زبان علائم و اعلان‌ها"
  },
  {
    word: "FEEDING THE ANIMALS STRICTLY PROHIBITED",
    meaning: "غذا دادن به حیوانات کاملاً ممنوع",
    lesson: 100,
    lessonLabel: "درس 100 — زبان علائم و اعلان‌ها"
  },
  {
    word: "Reduce speed now",
    meaning: "اکنون سرعت را کم کنید",
    lesson: 100,
    lessonLabel: "درس 100 — زبان علائم و اعلان‌ها"
  },
  {
    word: "KINDLY REFRAIN FROM SMOKING IN THE AUDITORIUM",
    meaning: "خواهشمندیم در سالن تئاتر سیگار نکشید",
    lesson: 100,
    lessonLabel: "درس 100 — زبان علائم و اعلان‌ها"
  },
  {
    word: "No through road for motor vehicles",
    meaning: "این مسیر برای خودروهای موتوری عبوری نیست",
    lesson: 100,
    lessonLabel: "درس 100 — زبان علائم و اعلان‌ها"
  },
  {
    word: "Buy a ticket and put it in a place where it can easily be seen",
    meaning: "بلیطی بخرید و آن را جایی قرار دهید که به‌راحتی دیده شود",
    lesson: 100,
    lessonLabel: "درس 100 — زبان علائم و اعلان‌ها"
  },
  {
    word: "PENALTY FOR DROPPING LITTER – UP TO £100 FINE",
    meaning: "جریمهٔ انداختن زباله – جریمه تا ۱۰۰ پوند",
    lesson: 100,
    lessonLabel: "درس 100 — زبان علائم و اعلان‌ها"
  },
  {
    word: "NO BILL-STICKING",
    meaning: "چسباندن اعلان ممنوع",
    lesson: 100,
    lessonLabel: "درس 100 — زبان علائم و اعلان‌ها"
  },
  {
    word: "Cyclists dismount here",
    meaning: "دوچرخه‌سواران اینجا پیاده شوند",
    lesson: 100,
    lessonLabel: "درس 100 — زبان علائم و اعلان‌ها"
  },
  {
    word: "Lunches now being served",
    meaning: "اکنون ناهار سرو می‌شود",
    lesson: 100,
    lessonLabel: "درس 100 — زبان علائم و اعلان‌ها"
  },
  {
    word: "Please place your purchases here",
    meaning: "لطفاً خریدهای خود را اینجا بگذارید",
    lesson: 100,
    lessonLabel: "درس 100 — زبان علائم و اعلان‌ها"
  },
  {
    word: "FISHING: PERMIT HOLDERS ONLY",
    meaning: "ماهیگیری: فقط دارندگان مجوز",
    lesson: 100,
    lessonLabel: "درس 100 — زبان علائم و اعلان‌ها"
  },
  {
    word: "to prosecute",
    meaning: "اقدام قانونی کردن؛ تعقیب قضایی کردن",
    lesson: 100,
    pos: "v.",
    lessonLabel: "درس 100 — زبان علائم و اعلان‌ها"
  },
  {
    word: "a penalty",
    meaning: "جریمه؛ مجازات",
    lesson: 100,
    pos: "n.",
    lessonLabel: "درس 100 — زبان علائم و اعلان‌ها"
  },
  {
    word: "a purchase",
    meaning: "خرید؛ کالای خریداری‌شده",
    lesson: 100,
    pos: "n.",
    lessonLabel: "درس 100 — زبان علائم و اعلان‌ها"
  },
  {
    word: "a trespasser",
    meaning: "متجاوز به ملک خصوصی",
    lesson: 100,
    pos: "n.",
    lessonLabel: "درس 100 — زبان علائم و اعلان‌ها"
  },
  {
    word: "to refrain",
    meaning: "خودداری کردن",
    lesson: 100,
    pos: "v.",
    lessonLabel: "درس 100 — زبان علائم و اعلان‌ها"
  },
  {
    word: "to alight from",
    meaning: "پیاده شدن از وسیلهٔ نقلیه",
    lesson: 100,
    pos: "v.",
    lessonLabel: "درس 100 — زبان علائم و اعلان‌ها"
  },
  {
    word: "to prohibit",
    meaning: "ممنوع کردن",
    lesson: 100,
    pos: "v.",
    lessonLabel: "درس 100 — زبان علائم و اعلان‌ها"
  },
  {
    word: "an auditorium",
    meaning: "سالن نمایش؛ سالن اجتماعات",
    lesson: 100,
    pos: "n.",
    lessonLabel: "درس 100 — زبان علائم و اعلان‌ها"
  },
  {
    word: "to dismount",
    meaning: "پیاده شدن (از دوچرخه یا اسب)",
    lesson: 100,
    pos: "v.",
    lessonLabel: "درس 100 — زبان علائم و اعلان‌ها"
  },
  {
    word: "a minor",
    meaning: "نابالغ؛ فرد زیر ۱۸ سال",
    lesson: 100,
    pos: "n.",
    lessonLabel: "درس 100 — زبان علائم و اعلان‌ها"
  },
  {
    word: "a vehicle",
    meaning: "وسیلهٔ نقلیه",
    lesson: 100,
    pos: "n.",
    lessonLabel: "درس 100 — زبان علائم و اعلان‌ها"
  }
];

export const VOCAB_PART_5: Row[] = ROWS;
