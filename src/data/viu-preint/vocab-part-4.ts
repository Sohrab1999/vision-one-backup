// واژگان درس‌های English Vocabulary in Use — Pre-int & Int (پارتیت 4) — استخراج VLM از اسکن PDF
// word = عین چاپ کتاب · meaning = ترجمهٔ ماشینی GLM (کلاس FA-NEW — اثبات صحت ترجمه نیست)
import type { VocabWord } from "../types";

type Row = Omit<VocabWord, "lesson"> & { lesson: number; lessonLabel: string };

const ROWS: Row[] = [
  {
    word: "earrings",
    meaning: "گوشواره",
    lesson: 61,
    pos: "n.",
    lessonLabel: "درس 61 — لباس"
  },
  {
    word: "necklace",
    meaning: "گردنبند",
    lesson: 61,
    pos: "n.",
    lessonLabel: "درس 61 — لباس"
  },
  {
    word: "blouse/top",
    meaning: "بلوز/تاپ",
    lesson: 61,
    pos: "n.",
    lessonLabel: "درس 61 — لباس"
  },
  {
    word: "V-neck",
    meaning: "یقه هفت",
    lesson: 61,
    pos: "n.",
    lessonLabel: "درس 61 — لباس"
  },
  {
    word: "jacket",
    meaning: "کاپشن/کت کوتاه",
    lesson: 61,
    pos: "n.",
    lessonLabel: "درس 61 — لباس"
  },
  {
    word: "jumper",
    meaning: "پلیور",
    lesson: 61,
    pos: "n.",
    lessonLabel: "درس 61 — لباس"
  },
  {
    word: "hat",
    meaning: "کلاه",
    lesson: 61,
    pos: "n.",
    lessonLabel: "درس 61 — لباس"
  },
  {
    word: "belt",
    meaning: "کمربند",
    lesson: 61,
    pos: "n.",
    lessonLabel: "درس 61 — لباس"
  },
  {
    word: "sleeve",
    meaning: "آستین",
    lesson: 61,
    pos: "n.",
    lessonLabel: "درس 61 — لباس"
  },
  {
    word: "coat",
    meaning: "پالتو",
    lesson: 61,
    pos: "n.",
    lessonLabel: "درس 61 — لباس"
  },
  {
    word: "scarf",
    meaning: "شال/روسری",
    lesson: 61,
    pos: "n.",
    lessonLabel: "درس 61 — لباس"
  },
  {
    word: "collar",
    meaning: "یقه",
    lesson: 61,
    pos: "n.",
    lessonLabel: "درس 61 — لباس"
  },
  {
    word: "shirt",
    meaning: "پیراهن",
    lesson: 61,
    pos: "n.",
    lessonLabel: "درس 61 — لباس"
  },
  {
    word: "button",
    meaning: "دکمه",
    lesson: 61,
    pos: "n.",
    lessonLabel: "درس 61 — لباس"
  },
  {
    word: "tie",
    meaning: "کراوات",
    lesson: 61,
    pos: "n.",
    lessonLabel: "درس 61 — لباس"
  },
  {
    word: "pocket",
    meaning: "جیب",
    lesson: 61,
    pos: "n.",
    lessonLabel: "درس 61 — لباس"
  },
  {
    word: "suit",
    meaning: "کت‌وشلوار",
    lesson: 61,
    pos: "n.",
    lessonLabel: "درس 61 — لباس"
  },
  {
    word: "handbag",
    meaning: "کیف دستی",
    lesson: 61,
    pos: "n.",
    lessonLabel: "درس 61 — لباس"
  },
  {
    word: "jeans",
    meaning: "شلوار جین",
    lesson: 61,
    pos: "n.",
    lessonLabel: "درس 61 — لباس"
  },
  {
    word: "ring",
    meaning: "انگشتر",
    lesson: 61,
    pos: "n.",
    lessonLabel: "درس 61 — لباس"
  },
  {
    word: "skirt",
    meaning: "دامن",
    lesson: 61,
    pos: "n.",
    lessonLabel: "درس 61 — لباس"
  },
  {
    word: "glove",
    meaning: "دستکش",
    lesson: 61,
    pos: "n.",
    lessonLabel: "درس 61 — لباس"
  },
  {
    word: "tights",
    meaning: "جوراب شلواری",
    lesson: 61,
    pos: "n.",
    lessonLabel: "درس 61 — لباس"
  },
  {
    word: "sock",
    meaning: "جوراب",
    lesson: 61,
    pos: "n.",
    lessonLabel: "درس 61 — لباس"
  },
  {
    word: "shoe",
    meaning: "کفش",
    lesson: 61,
    pos: "n.",
    lessonLabel: "درس 61 — لباس"
  },
  {
    word: "boot",
    meaning: "چکمه/بوت",
    lesson: 61,
    pos: "n.",
    lessonLabel: "درس 61 — لباس"
  },
  {
    word: "do up",
    meaning: "بستن (دکمه/زیپ)",
    lesson: 61,
    pos: "phr.",
    lessonLabel: "درس 61 — لباس"
  },
  {
    word: "undo",
    meaning: "باز کردن (دکمه/زیپ)",
    lesson: 61,
    pos: "v.",
    lessonLabel: "درس 61 — لباس"
  },
  {
    word: "get dressed",
    meaning: "لباس پوشیدن",
    lesson: 61,
    pos: "phr.",
    lessonLabel: "درس 61 — لباس"
  },
  {
    word: "put on",
    meaning: "پوشیدن",
    lesson: 61,
    pos: "phr.",
    lessonLabel: "درس 61 — لباس"
  },
  {
    word: "take off",
    meaning: "درآوردن (لباس)",
    lesson: 61,
    pos: "phr.",
    lessonLabel: "درس 61 — لباس"
  },
  {
    word: "hang up",
    meaning: "آویختن (لباس)",
    lesson: 61,
    pos: "phr.",
    lessonLabel: "درس 61 — لباس"
  },
  {
    word: "try on",
    meaning: "پرو کردن (لباس)",
    lesson: 61,
    pos: "phr.",
    lessonLabel: "درس 61 — لباس"
  },
  {
    word: "fit",
    meaning: "اندازه بودن",
    lesson: 61,
    pos: "v.",
    lessonLabel: "درس 61 — لباس"
  },
  {
    word: "change into",
    meaning: "تغییر کردن به (لباس دیگر)",
    lesson: 61,
    pos: "phr.",
    lessonLabel: "درس 61 — لباس"
  },
  {
    word: "shop assistant",
    meaning: "فروشندهٔ فروشگاه",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — مغازه‌ها و خرید"
  },
  {
    word: "sales assistant",
    meaning: "فروشنده (هم‌معنی shop assistant)",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — مغازه‌ها و خرید"
  },
  {
    word: "shop window",
    meaning: "ویترین مغازه",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — مغازه‌ها و خرید"
  },
  {
    word: "shopping centre",
    meaning: "مرکز خرید",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — مغازه‌ها و خرید"
  },
  {
    word: "window shopping",
    meaning: "ویترین‌گردی (بدون خرید)",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — مغازه‌ها و خرید"
  },
  {
    word: "shopping list",
    meaning: "لیست خرید",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — مغازه‌ها و خرید"
  },
  {
    word: "go shopping",
    meaning: "خرید کردن",
    lesson: 62,
    pos: "phr.",
    lessonLabel: "درس 62 — مغازه‌ها و خرید"
  },
  {
    word: "do the shopping",
    meaning: "خرید مواد غذایی و لوازم خانه کردن",
    lesson: 62,
    pos: "phr.",
    lessonLabel: "درس 62 — مغازه‌ها و خرید"
  },
  {
    word: "shop around",
    meaning: "برای یافتن بهترین قیمت بین مغازه‌های مختلف گشتن",
    lesson: 62,
    pos: "phr.",
    lessonLabel: "درس 62 — مغازه‌ها و خرید"
  },
  {
    word: "department store",
    meaning: "فروشگاه بزرگ (کالاهای متفرقه)",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — مغازه‌ها و خرید"
  },
  {
    word: "electrical appliances",
    meaning: "لوازم برقی",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — مغازه‌ها و خرید"
  },
  {
    word: "toys",
    meaning: "اسباب‌بازی‌ها",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — مغازه‌ها و خرید"
  },
  {
    word: "jewellery",
    meaning: "جواهرات",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — مغازه‌ها و خرید"
  },
  {
    word: "supermarket",
    meaning: "فروشگاه بزرگ مواد غذایی",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — مغازه‌ها و خرید"
  },
  {
    word: "household goods",
    meaning: "کالاهای خانگی",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — مغازه‌ها و خرید"
  },
  {
    word: "meat counter",
    meaning: "پیشخوان فروش گوشت",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — مغازه‌ها و خرید"
  },
  {
    word: "fish counter",
    meaning: "پیشخوان فروش ماهی",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — مغازه‌ها و خرید"
  },
  {
    word: "newsagent('s)",
    meaning: "دست‌فروش/مغازهٔ روزنامه و لوازم تحریر",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — مغازه‌ها و خرید"
  },
  {
    word: "butcher('s)",
    meaning: "قصابی/مغازهٔ گوشت‌فروشی",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — مغازه‌ها و خرید"
  },
  {
    word: "chemist('s)",
    meaning: "داروخانه",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — مغازه‌ها و خرید"
  },
  {
    word: "off-licence",
    meaning: "مغازهٔ فروش مشروبات و نوشیدنی‌ها",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — مغازه‌ها و خرید"
  },
  {
    word: "stationery",
    meaning: "لوازم تحریر",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — مغازه‌ها و خرید"
  },
  {
    word: "look for",
    meaning: "دنبال چیزی گشتن، خواستن",
    lesson: 62,
    pos: "phr.",
    lessonLabel: "درس 62 — مغازه‌ها و خرید"
  },
  {
    word: "I'm just looking",
    meaning: "فقط دارم نگاه می‌کنم (نیازی به کمک نیست)",
    lesson: 62,
    pos: "phr.",
    lessonLabel: "درس 62 — مغازه‌ها و خرید"
  },
  {
    word: "I'm being served",
    meaning: "فرد دیگری مشغول خدمات به من است",
    lesson: 62,
    pos: "phr.",
    lessonLabel: "درس 62 — مغازه‌ها و خرید"
  },
  {
    word: "size",
    meaning: "سایز، اندازه",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — مغازه‌ها و خرید"
  },
  {
    word: "changing room",
    meaning: "اتاق پرو",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — مغازه‌ها و خرید"
  },
  {
    word: "fitting room",
    meaning: "اتاق پرو",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — مغازه‌ها و خرید"
  },
  {
    word: "try on",
    meaning: "پرو کردن (لباس)",
    lesson: 62,
    pos: "phr.",
    lessonLabel: "درس 62 — مغازه‌ها و خرید"
  },
  {
    word: "I'll take this one/these",
    meaning: "همین را برمی‌دارم/می‌خرم",
    lesson: 62,
    pos: "phr.",
    lessonLabel: "درس 62 — مغازه‌ها و خرید"
  },
  {
    word: "I'll leave it",
    meaning: "نمی‌خرم، صرف‌نظر می‌کنم",
    lesson: 62,
    pos: "phr.",
    lessonLabel: "درس 62 — مغازه‌ها و خرید"
  },
  {
    word: "cash desk",
    meaning: "صندوق پرداخت",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — مغازه‌ها و خرید"
  },
  {
    word: "till",
    meaning: "صندوق (هم‌معنی cash desk)",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — مغازه‌ها و خرید"
  },
  {
    word: "pay by credit card",
    meaning: "پرداخت با کارت اعتباری",
    lesson: 62,
    pos: "phr.",
    lessonLabel: "درس 62 — مغازه‌ها و خرید"
  },
  {
    word: "kiosk",
    meaning: "دکه",
    lesson: 62,
    pos: "n.",
    lessonLabel: "درس 62 — مغازه‌ها و خرید"
  },
  {
    word: "pineapple",
    meaning: "آناناس",
    lesson: 63,
    lessonLabel: "درس 63 — غذا"
  },
  {
    word: "banana",
    meaning: "موز",
    lesson: 63,
    lessonLabel: "درس 63 — غذا"
  },
  {
    word: "lemon",
    meaning: "لیمو ترش",
    lesson: 63,
    lessonLabel: "درس 63 — غذا"
  },
  {
    word: "plum",
    meaning: "آلو",
    lesson: 63,
    lessonLabel: "درس 63 — غذا"
  },
  {
    word: "melon",
    meaning: "خربزه/طالبی",
    lesson: 63,
    lessonLabel: "درس 63 — غذا"
  },
  {
    word: "apple",
    meaning: "سیب",
    lesson: 63,
    lessonLabel: "درس 63 — غذا"
  },
  {
    word: "pear",
    meaning: "گلابی",
    lesson: 63,
    lessonLabel: "درس 63 — غذا"
  },
  {
    word: "raspberry",
    meaning: "تمشک",
    lesson: 63,
    lessonLabel: "درس 63 — غذا"
  },
  {
    word: "cherries",
    meaning: "گیلاس‌ها",
    lesson: 63,
    lessonLabel: "درس 63 — غذا"
  },
  {
    word: "orange",
    meaning: "پرتقال",
    lesson: 63,
    lessonLabel: "درس 63 — غذا"
  },
  {
    word: "strawberry",
    meaning: "توت‌فرنگی",
    lesson: 63,
    lessonLabel: "درس 63 — غذا"
  },
  {
    word: "grapes",
    meaning: "انگور",
    lesson: 63,
    lessonLabel: "درس 63 — غذا"
  },
  {
    word: "peach",
    meaning: "هلو",
    lesson: 63,
    lessonLabel: "درس 63 — غذا"
  },
  {
    word: "peel",
    meaning: "پوست کندن",
    lesson: 63,
    pos: "v.",
    lessonLabel: "درس 63 — غذا"
  },
  {
    word: "potato",
    meaning: "سیب‌زمینی",
    lesson: 63,
    lessonLabel: "درس 63 — غذا"
  },
  {
    word: "green beans",
    meaning: "لوبیا سبز",
    lesson: 63,
    lessonLabel: "درس 63 — غذا"
  },
  {
    word: "peas",
    meaning: "نخودفرنگی‌ها",
    lesson: 63,
    lessonLabel: "درس 63 — غذا"
  },
  {
    word: "onion",
    meaning: "پیاز",
    lesson: 63,
    lessonLabel: "درس 63 — غذا"
  },
  {
    word: "garlic",
    meaning: "سیر",
    lesson: 63,
    lessonLabel: "درس 63 — غذا"
  },
  {
    word: "carrot",
    meaning: "هویج",
    lesson: 63,
    lessonLabel: "درس 63 — غذا"
  },
  {
    word: "mushrooms",
    meaning: "قارچ‌ها",
    lesson: 63,
    lessonLabel: "درس 63 — غذا"
  },
  {
    word: "aubergine",
    meaning: "بادمجان",
    lesson: 63,
    lessonLabel: "درس 63 — غذا"
  },
  {
    word: "courgette",
    meaning: "کدو سبز",
    lesson: 63,
    lessonLabel: "درس 63 — غذا"
  },
  {
    word: "red pepper",
    meaning: "فلفل دلمه‌ای قرمز",
    lesson: 63,
    lessonLabel: "درس 63 — غذا"
  },
  {
    word: "cabbage",
    meaning: "کلم",
    lesson: 63,
    lessonLabel: "درس 63 — غذا"
  },
  {
    word: "broccoli",
    meaning: "کلم بروکلی",
    lesson: 63,
    lessonLabel: "درس 63 — غذا"
  },
  {
    word: "leeks",
    meaning: "پیازچه/تره",
    lesson: 63,
    lessonLabel: "درس 63 — غذا"
  },
  {
    word: "celery",
    meaning: "کرفس",
    lesson: 63,
    lessonLabel: "درس 63 — غذا"
  },
  {
    word: "cauliflower",
    meaning: "گل‌کلم",
    lesson: 63,
    lessonLabel: "درس 63 — غذا"
  },
  {
    word: "chop",
    meaning: "خرد کردن",
    lesson: 63,
    pos: "v.",
    lessonLabel: "درس 63 — غذا"
  },
  {
    word: "salad",
    meaning: "سالاد",
    lesson: 63,
    pos: "n.",
    lessonLabel: "درس 63 — غذا"
  },
  {
    word: "lettuce",
    meaning: "کاهو",
    lesson: 63,
    lessonLabel: "درس 63 — غذا"
  },
  {
    word: "tomato",
    meaning: "گوجه‌فرنگی",
    lesson: 63,
    lessonLabel: "درس 63 — غذا"
  },
  {
    word: "cucumber",
    meaning: "خیار",
    lesson: 63,
    lessonLabel: "درس 63 — غذا"
  },
  {
    word: "salad dressing",
    meaning: "سس سالاد",
    lesson: 63,
    lessonLabel: "درس 63 — غذا"
  },
  {
    word: "vinegar",
    meaning: "سرکه",
    lesson: 63,
    lessonLabel: "درس 63 — غذا"
  },
  {
    word: "oil",
    meaning: "روغن",
    lesson: 63,
    lessonLabel: "درس 63 — غذا"
  },
  {
    word: "cow",
    meaning: "گاو",
    lesson: 63,
    lessonLabel: "درس 63 — غذا"
  },
  {
    word: "calf",
    meaning: "گوساله (= گاو جوان)",
    lesson: 63,
    lessonLabel: "درس 63 — غذا"
  },
  {
    word: "lamb",
    meaning: "بره (= گوسفند جوان)؛ گوشت بره",
    lesson: 63,
    lessonLabel: "درس 63 — غذا"
  },
  {
    word: "pig",
    meaning: "خوک",
    lesson: 63,
    lessonLabel: "درس 63 — غذا"
  },
  {
    word: "chicken",
    meaning: "مرغ",
    lesson: 63,
    lessonLabel: "درس 63 — غذا"
  },
  {
    word: "beef",
    meaning: "گوشت گاو",
    lesson: 63,
    lessonLabel: "درس 63 — غذا"
  },
  {
    word: "veal",
    meaning: "گوشت گوساله",
    lesson: 63,
    lessonLabel: "درس 63 — غذا"
  },
  {
    word: "pork",
    meaning: "گوشت خوک",
    lesson: 63,
    lessonLabel: "درس 63 — غذا"
  },
  {
    word: "salmon",
    meaning: "ماهی سالمون",
    lesson: 63,
    lessonLabel: "درس 63 — غذا"
  },
  {
    word: "prawn",
    meaning: "میگو",
    lesson: 63,
    lessonLabel: "درس 63 — غذا"
  },
  {
    word: "oyster",
    meaning: "صدف خوراکی",
    lesson: 63,
    lessonLabel: "درس 63 — غذا"
  },
  {
    word: "mussels",
    meaning: "صدف‌های دوکفه‌ای",
    lesson: 63,
    lessonLabel: "درس 63 — غذا"
  },
  {
    word: "lobster",
    meaning: "خرچنگ دریایی (لابستر)",
    lesson: 63,
    lessonLabel: "درس 63 — غذا"
  },
  {
    word: "crab",
    meaning: "خرچنگ",
    lesson: 63,
    lessonLabel: "درس 63 — غذا"
  },
  {
    word: "vegetarian",
    meaning: "گیاه‌خوار",
    lesson: 63,
    pos: "n.",
    lessonLabel: "درس 63 — غذا"
  },
  {
    word: "boil",
    meaning: "جوشاندن (در آب)",
    lesson: 64,
    pos: "v.",
    lessonLabel: "درس 64 — آشپزی و رستوران"
  },
  {
    word: "fry",
    meaning: "سرخ کردن (در روغن یا کره روی حرارت)",
    lesson: 64,
    pos: "v.",
    lessonLabel: "درس 64 — آشپزی و رستوران"
  },
  {
    word: "grill",
    meaning: "کباب/گریل کردن (زیر حرارت)",
    lesson: 64,
    pos: "v.",
    lessonLabel: "درس 64 — آشپزی و رستوران"
  },
  {
    word: "roast",
    meaning: "برشته کردن (در فر با روغن، مثلاً گوشت)",
    lesson: 64,
    pos: "v.",
    lessonLabel: "درس 64 — آشپزی و رستوران"
  },
  {
    word: "bake",
    meaning: "پختن در فر بدون روغن (مثلاً کیک)",
    lesson: 64,
    pos: "v.",
    lessonLabel: "درس 64 — آشپزی و رستوران"
  },
  {
    word: "raw",
    meaning: "خام (پخته‌نشده)",
    lesson: 64,
    pos: "adj.",
    lessonLabel: "درس 64 — آشپزی و رستوران"
  },
  {
    word: "rare",
    meaning: "کم‌پز (سریع پخته و داخلش قرمز)",
    lesson: 64,
    pos: "adj.",
    lessonLabel: "درس 64 — آشپزی و رستوران"
  },
  {
    word: "medium-rare",
    meaning: "نیمه‌کم‌پز (بیشتر پخته ولی هنوز وسطش قرمز)",
    lesson: 64,
    pos: "adj.",
    lessonLabel: "درس 64 — آشپزی و رستوران"
  },
  {
    word: "medium",
    meaning: "متوسط (بیشتر پخته و صورتی)",
    lesson: 64,
    pos: "adj.",
    lessonLabel: "درس 64 — آشپزی و رستوران"
  },
  {
    word: "well-done",
    meaning: "کاملاً پخته (طولانی‌تر پخته و صورتی نباشد)",
    lesson: 64,
    pos: "adj.",
    lessonLabel: "درس 64 — آشپزی و رستوران"
  },
  {
    word: "taste",
    meaning: "چشیدن/مزه کردن",
    lesson: 64,
    pos: "v.",
    lessonLabel: "درس 64 — آشپزی و رستوران"
  },
  {
    word: "tasty",
    meaning: "خوشمزه (پر از طعم؛ واژه مثبت)",
    lesson: 64,
    pos: "adj.",
    lessonLabel: "درس 64 — آشپزی و رستوران"
  },
  {
    word: "salty",
    meaning: "شور",
    lesson: 64,
    pos: "adj.",
    lessonLabel: "درس 64 — آشپزی و رستوران"
  },
  {
    word: "hot/spicy",
    meaning: "تند (پر از ادویه)",
    lesson: 64,
    pos: "adj.",
    lessonLabel: "درس 64 — آشپزی و رستوران"
  },
  {
    word: "sweet",
    meaning: "شیرین",
    lesson: 64,
    pos: "adj.",
    lessonLabel: "درس 64 — آشپزی و رستوران"
  },
  {
    word: "bitter",
    meaning: "تلخ",
    lesson: 64,
    pos: "adj.",
    lessonLabel: "درس 64 — آشپزی و رستوران"
  },
  {
    word: "sour",
    meaning: "ترش",
    lesson: 64,
    pos: "adj.",
    lessonLabel: "درس 64 — آشپزی و رستوران"
  },
  {
    word: "fresh",
    meaning: "تازه",
    lesson: 64,
    pos: "adj.",
    lessonLabel: "درس 64 — آشپزی و رستوران"
  },
  {
    word: "fattening",
    meaning: "چاق‌کننده",
    lesson: 64,
    pos: "adj.",
    lessonLabel: "درس 64 — آشپزی و رستوران"
  },
  {
    word: "healthy",
    meaning: "سالم (مفید برای سلامتی)",
    lesson: 64,
    pos: "adj.",
    lessonLabel: "درس 64 — آشپزی و رستوران"
  },
  {
    word: "chilled",
    meaning: "سردشده (خیلی سرد)",
    lesson: 64,
    pos: "adj.",
    lessonLabel: "درس 64 — آشپزی و رستوران"
  },
  {
    word: "still",
    meaning: "بدون گاز (آب بدون گاز)",
    lesson: 64,
    pos: "adj.",
    lessonLabel: "درس 64 — آشپزی و رستوران"
  },
  {
    word: "sparkling",
    meaning: "گازدار (آب گازدار؛ همچنین آب فیزکی)",
    lesson: 64,
    pos: "adj.",
    lessonLabel: "درس 64 — آشپزی و رستوران"
  },
  {
    word: "fizzy water",
    meaning: "آب گازدار",
    lesson: 64,
    pos: "n.",
    lessonLabel: "درس 64 — آشپزی و رستوران"
  },
  {
    word: "menu",
    meaning: "منو / برگهٔ غذا",
    lesson: 64,
    pos: "n.",
    lessonLabel: "درس 64 — آشپزی و رستوران"
  },
  {
    word: "starter",
    meaning: "پیش‌غذا",
    lesson: 64,
    pos: "n.",
    lessonLabel: "درس 64 — آشپزی و رستوران"
  },
  {
    word: "main course",
    meaning: "غذای اصلی",
    lesson: 64,
    pos: "n.",
    lessonLabel: "درس 64 — آشپزی و رستوران"
  },
  {
    word: "dessert",
    meaning: "دسر",
    lesson: 64,
    pos: "n.",
    lessonLabel: "درس 64 — آشپزی و رستوران"
  },
  {
    word: "salt and pepper",
    meaning: "نمک و فلفل",
    lesson: 64,
    pos: "n.",
    lessonLabel: "درس 64 — آشپزی و رستوران"
  },
  {
    word: "napkins",
    meaning: "دستمال سفره",
    lesson: 64,
    pos: "n.",
    lessonLabel: "درس 64 — آشپزی و رستوران"
  },
  {
    word: "toothpicks",
    meaning: "دندان‌ PICK — خلال دندان",
    lesson: 64,
    pos: "n.",
    lessonLabel: "درس 64 — آشپزی و رستوران"
  },
  {
    word: "vinegar",
    meaning: "سرکه",
    lesson: 64,
    pos: "n.",
    lessonLabel: "درس 64 — آشپزی و رستوران"
  },
  {
    word: "oil",
    meaning: "روغن",
    lesson: 64,
    pos: "n.",
    lessonLabel: "درس 64 — آشپزی و رستوران"
  },
  {
    word: "commercial centre",
    meaning: "مرکز تجاری (= منطقه‌ای با بانک‌ها و دفاتر شرکت‌های زیاد)",
    lesson: 65,
    lessonLabel: "درس 65 — زندگی شهری"
  },
  {
    word: "shopping centre",
    meaning: "مرکز خرید (= مکانی با فروشگاه‌های زیاد، سرپوشیده یا فضای باز)",
    lesson: 65,
    lessonLabel: "درس 65 — زندگی شهری"
  },
  {
    word: "car parks",
    meaning: "پارکینگ‌ها (= مکان‌هایی برای پارک خودروهای زیاد)",
    lesson: 65,
    lessonLabel: "درس 65 — زندگی شهری"
  },
  {
    word: "factories",
    meaning: "کارخانه‌ها (= ساختمان‌هایی که در آن‌ها چیزهایی مثلاً خودرو تولید می‌کنند)",
    lesson: 65,
    lessonLabel: "درس 65 — زندگی شهری"
  },
  {
    word: "skyscrapers",
    meaning: "آسمان‌خراش‌ها",
    lesson: 65,
    lessonLabel: "درس 65 — زندگی شهری"
  },
  {
    word: "high-rise buildings",
    meaning: "ساختمان‌های مرتفع/چندطبقه (= ساختمان‌های دارای طبقات زیاد)",
    lesson: 65,
    lessonLabel: "درس 65 — زندگی شهری"
  },
  {
    word: "libraries",
    meaning: "کتابخانه‌ها (= مکان‌هایی که می‌توان کتاب امانت گرفت)",
    lesson: 65,
    lessonLabel: "درس 65 — زندگی شهری"
  },
  {
    word: "suburbs",
    meaning: "حاشیه/حومهٔ شهر (= مناطق خارج از مرکز شهر که مردم در آن زندگی می‌کنند)",
    lesson: 65,
    pos: "n.",
    lessonLabel: "درس 65 — زندگی شهری"
  },
  {
    word: "rush hour",
    meaning: "ساعت شلوغی ترافیک (= زمانی که مردم به سر کار می‌روند و برمی‌گردند، مثلاً ۷–۹ صبح)",
    lesson: 65,
    lessonLabel: "درس 65 — زندگی شهری"
  },
  {
    word: "public transport system",
    meaning: "سیستم حمل‌ونقل عمومی (= قطارها و اتوبوس‌ها)",
    lesson: 65,
    lessonLabel: "درس 65 — زندگی شهری"
  },
  {
    word: "cope with",
    meaning: "از پسِ (کار دشوار) برآمدن، کنار آمدن با",
    lesson: 65,
    pos: "phr.",
    lessonLabel: "درس 65 — زندگی شهری"
  },
  {
    word: "commuters",
    meaning: "مسافران روزانه (= افرادی که در حومه زندگی می‌کنند اما برای کار به شهر می‌روند)",
    lesson: 65,
    lessonLabel: "درس 65 — زندگی شهری"
  },
  {
    word: "congested",
    meaning: "شلوغ و پر از ماشین، متراکم",
    lesson: 65,
    pos: "adj.",
    lessonLabel: "درس 65 — زندگی شهری"
  },
  {
    word: "in a hurry",
    meaning: "عجله داشتن (= می‌خواهند خیلی زود به جای دیگری برسند)",
    lesson: 65,
    pos: "phr.",
    lessonLabel: "درس 65 — زندگی شهری"
  },
  {
    word: "stressful",
    meaning: "پراسترس، استرس‌زا (= اعصاب را فرسوده و مضطرب می‌کند)",
    lesson: 65,
    pos: "adj.",
    lessonLabel: "درس 65 — زندگی شهری"
  },
  {
    word: "go out",
    meaning: "بیرون رفتن (= رفتن به مکان‌ها به دلایل اجتماعی)",
    lesson: 65,
    pos: "phr.",
    lessonLabel: "درس 65 — زندگی شهری"
  },
  {
    word: "go into town",
    meaning: "به مرکز شهر رفتن",
    lesson: 65,
    pos: "phr.",
    lessonLabel: "درس 65 — زندگی شهری"
  },
  {
    word: "lively",
    meaning: "پر جنب‌وجوش، سرزنده (= مردم زیاد و اتفاق‌های زیاد)",
    lesson: 65,
    pos: "adj.",
    lessonLabel: "درس 65 — زندگی شهری"
  },
  {
    word: "there's plenty to do",
    meaning: "کارهای زیادی برای انجام هست (= امکانات زیاد، مثلاً بار، دیسکو و ...)",
    lesson: 65,
    lessonLabel: "درس 65 — زندگی شهری"
  },
  {
    word: "there's nowhere to park",
    meaning: "جایی برای پارک کردن نیست",
    lesson: 65,
    lessonLabel: "درس 65 — زندگی شهری"
  },
  {
    word: "get/take a bus",
    meaning: "اتوبوس سوار شدن",
    lesson: 65,
    lessonLabel: "درس 65 — زندگی شهری"
  },
  {
    word: "take/get a taxi",
    meaning: "تاکسی گرفتن/سوار شدن",
    lesson: 65,
    lessonLabel: "درس 65 — زندگی شهری"
  },
  {
    word: "there's nothing to do",
    meaning: "کاری برای انجام دادن نیست",
    lesson: 65,
    lessonLabel: "درس 65 — زندگی شهری"
  },
  {
    word: "there's plenty to see",
    meaning: "چیزهای زیادی برای دیدن هست",
    lesson: 65,
    lessonLabel: "درس 65 — زندگی شهری"
  },
  {
    word: "there's nowhere to go",
    meaning: "جایی برای رفتن نیست",
    lesson: 65,
    lessonLabel: "درس 65 — زندگی شهری"
  },
  {
    word: "nightlife",
    meaning: "زندگی شبانه (= مکان‌هایی برای شب، مثلاً بار، دیسکو، سینما)",
    lesson: 65,
    lessonLabel: "درس 65 — زندگی شهری"
  },
  {
    word: "a wide range of shops",
    meaning: "طیف گسترده‌ای از فروشگاه‌ها (= فروشگاه‌های متعدد با کالاهای مختلف)",
    lesson: 65,
    lessonLabel: "درس 65 — زندگی شهری"
  },
  {
    word: "get whatever you want",
    meaning: "هر چه بخواهی به دست آوردن (= خرید هر چیزی که بخواهی)",
    lesson: 65,
    lessonLabel: "درس 65 — زندگی شهری"
  },
  {
    word: "cultural activities",
    meaning: "فعالیت‌های فرهنگی (مثلاً موزه، کنسرت، فیلم)",
    lesson: 65,
    lessonLabel: "درس 65 — زندگی شهری"
  },
  {
    word: "cosmopolitan",
    meaning: "جهانی، بین‌المللی (= پر از مردم از کشورها و فرهنگ‌های مختلف)",
    lesson: 65,
    pos: "adj.",
    lessonLabel: "درس 65 — زندگی شهری"
  },
  {
    word: "job opportunities",
    meaning: "فرصت‌های شغلی (= پیدا کردن کار آسان‌تر)",
    lesson: 65,
    lessonLabel: "درس 65 — زندگی شهری"
  },
  {
    word: "crowded",
    meaning: "شلوغ، پر از مردم",
    lesson: 65,
    pos: "adj.",
    lessonLabel: "درس 65 — زندگی شهری"
  },
  {
    word: "aggressive",
    meaning: "پرخاشگر، تند و عبوس (= عصبانی و خیلی نامهربان به نظر می‌رسند)",
    lesson: 65,
    pos: "adj.",
    lessonLabel: "درس 65 — زندگی شهری"
  },
  {
    word: "noisy",
    meaning: "پرصدا (متضاد: quiet)",
    lesson: 65,
    pos: "adj.",
    lessonLabel: "درس 65 — زندگی شهری"
  },
  {
    word: "dangerous",
    meaning: "خطرناک (متضاد: safe)",
    lesson: 65,
    pos: "adj.",
    lessonLabel: "درس 65 — زندگی شهری"
  },
  {
    word: "dirty",
    meaning: "کثیف (متضاد: clean)",
    lesson: 65,
    pos: "adj.",
    lessonLabel: "درس 65 — زندگی شهری"
  },
  {
    word: "polluted",
    meaning: "آلوده (= هوای کثیف)",
    lesson: 65,
    pos: "adj.",
    lessonLabel: "درس 65 — زندگی شهری"
  },
  {
    word: "traffic congestion",
    meaning: "ترافیک سنگین/ازدحام ترافیکی (= ماشین‌های خیلی زیاد)",
    lesson: 65,
    lessonLabel: "درس 65 — زندگی شهری"
  },
  {
    word: "parking",
    meaning: "پارک کردن، جای پارک",
    lesson: 65,
    lessonLabel: "درس 65 — زندگی شهری"
  },
  {
    word: "crime rate",
    meaning: "میزان جرم (= تعداد جرایم)",
    lesson: 65,
    lessonLabel: "درس 65 — زندگی شهری"
  },
  {
    word: "cost of living",
    meaning: "هزینهٔ زندگی (مثلاً خانه‌ها گران‌ترند، حمل‌ونقل هم همین‌طور)",
    lesson: 65,
    lessonLabel: "درس 65 — زندگی شهری"
  },
  {
    word: "grow up",
    meaning: "بزرگ شدن",
    lesson: 66,
    pos: "phr.",
    lessonLabel: "درس 66 — زندگی در روستا"
  },
  {
    word: "rural area",
    meaning: "منطقهٔ روستایی",
    lesson: 66,
    lessonLabel: "درس 66 — زندگی در روستا"
  },
  {
    word: "urban area",
    meaning: "منطقهٔ شهری",
    lesson: 66,
    lessonLabel: "درس 66 — زندگی در روستا"
  },
  {
    word: "remote area",
    meaning: "منطقهٔ دورافتاده",
    lesson: 66,
    lessonLabel: "درس 66 — زندگی در روستا"
  },
  {
    word: "cottage",
    meaning: "کلبهٔ روستایی",
    lesson: 66,
    pos: "n.",
    lessonLabel: "درس 66 — زندگی در روستا"
  },
  {
    word: "woods",
    meaning: "جنگل کوچک",
    lesson: 66,
    pos: "n.",
    lessonLabel: "درس 66 — زندگی در روستا"
  },
  {
    word: "village",
    meaning: "روستا",
    lesson: 66,
    pos: "n.",
    lessonLabel: "درس 66 — زندگی در روستا"
  },
  {
    word: "the country",
    meaning: "حومه/دهستان",
    lesson: 66,
    lessonLabel: "درس 66 — زندگی در روستا"
  },
  {
    word: "tree",
    meaning: "درخت",
    lesson: 66,
    pos: "n.",
    lessonLabel: "درس 66 — زندگی در روستا"
  },
  {
    word: "leaves",
    meaning: "برگ‌ها",
    lesson: 66,
    pos: "n.",
    lessonLabel: "درس 66 — زندگی در روستا"
  },
  {
    word: "branches",
    meaning: "شاخه‌ها",
    lesson: 66,
    pos: "n.",
    lessonLabel: "درس 66 — زندگی در روستا"
  },
  {
    word: "plants",
    meaning: "گیاهان",
    lesson: 66,
    pos: "n.",
    lessonLabel: "درس 66 — زندگی در روستا"
  },
  {
    word: "grass",
    meaning: "چمن",
    lesson: 66,
    pos: "n.",
    lessonLabel: "درس 66 — زندگی در روستا"
  },
  {
    word: "flowers",
    meaning: "گل‌ها",
    lesson: 66,
    pos: "n.",
    lessonLabel: "درس 66 — زندگی در روستا"
  },
  {
    word: "soil",
    meaning: "خاک",
    lesson: 66,
    pos: "n.",
    lessonLabel: "درس 66 — زندگی در روستا"
  },
  {
    word: "roots",
    meaning: "ریشه‌ها",
    lesson: 66,
    pos: "n.",
    lessonLabel: "درس 66 — زندگی در روستا"
  },
  {
    word: "land",
    meaning: "زمین",
    lesson: 66,
    pos: "n.",
    lessonLabel: "درس 66 — زندگی در روستا"
  },
  {
    word: "countryside",
    meaning: "منطقهٔ روستایی",
    lesson: 66,
    pos: "n.",
    lessonLabel: "درس 66 — زندگی در روستا"
  },
  {
    word: "agriculture",
    meaning: "کشاورزی",
    lesson: 66,
    pos: "n.",
    lessonLabel: "درس 66 — زندگی در روستا"
  },
  {
    word: "farming",
    meaning: "کشاورزی/دامداری",
    lesson: 66,
    pos: "n.",
    lessonLabel: "درس 66 — زندگی در روستا"
  },
  {
    word: "crops",
    meaning: "محصولات زراعی",
    lesson: 66,
    pos: "n.",
    lessonLabel: "درس 66 — زندگی در روستا"
  },
  {
    word: "farm",
    meaning: "مزرعه",
    lesson: 66,
    pos: "n.",
    lessonLabel: "درس 66 — زندگی در روستا"
  },
  {
    word: "valley",
    meaning: "دره",
    lesson: 66,
    pos: "n.",
    lessonLabel: "درس 66 — زندگی در روستا"
  },
  {
    word: "farmhouse",
    meaning: "خانهٔ مزرعه",
    lesson: 66,
    pos: "n.",
    lessonLabel: "درس 66 — زندگی در روستا"
  },
  {
    word: "river",
    meaning: "رودخانه",
    lesson: 66,
    pos: "n.",
    lessonLabel: "درس 66 — زندگی در روستا"
  },
  {
    word: "fence",
    meaning: "حصار",
    lesson: 66,
    pos: "n.",
    lessonLabel: "درس 66 — زندگی در روستا"
  },
  {
    word: "field",
    meaning: "مزرعه/دشت",
    lesson: 66,
    pos: "n.",
    lessonLabel: "درس 66 — زندگی در روستا"
  },
  {
    word: "gate",
    meaning: "دروازه",
    lesson: 66,
    pos: "n.",
    lessonLabel: "درس 66 — زندگی در روستا"
  },
  {
    word: "footpath",
    meaning: "پیاده‌رو",
    lesson: 66,
    pos: "n.",
    lessonLabel: "درس 66 — زندگی در روستا"
  },
  {
    word: "tractor",
    meaning: "تراکتور",
    lesson: 66,
    pos: "n.",
    lessonLabel: "درس 66 — زندگی در روستا"
  },
  {
    word: "peace and quiet",
    meaning: "آرامش",
    lesson: 66,
    pos: "phr.",
    lessonLabel: "درس 66 — زندگی در روستا"
  },
  {
    word: "fresh air",
    meaning: "هوای تازه",
    lesson: 66,
    pos: "phr.",
    lessonLabel: "درس 66 — زندگی در روستا"
  },
  {
    word: "scenery",
    meaning: "منظره",
    lesson: 66,
    pos: "n.",
    lessonLabel: "درس 66 — زندگی در روستا"
  },
  {
    word: "the pace of life",
    meaning: "ریتم زندگی",
    lesson: 66,
    pos: "phr.",
    lessonLabel: "درس 66 — زندگی در روستا"
  },
  {
    word: "nightlife",
    meaning: "زندگی شبانه",
    lesson: 66,
    pos: "n.",
    lessonLabel: "درس 66 — زندگی در روستا"
  },
  {
    word: "public transport",
    meaning: "حمل و نقل عمومی",
    lesson: 66,
    pos: "n.",
    lessonLabel: "درس 66 — زندگی در روستا"
  },
  {
    word: "hopeless",
    meaning: "افتضاح",
    lesson: 66,
    pos: "adj.",
    lessonLabel: "درس 66 — زندگی در روستا"
  },
  {
    word: "privacy",
    meaning: "حریم خصوصی",
    lesson: 66,
    pos: "n.",
    lessonLabel: "درس 66 — زندگی در روستا"
  },
  {
    word: "traffic lights",
    meaning: "چراغ‌های راهنمایی",
    lesson: 67,
    pos: "n.",
    lessonLabel: "درس 67 — در جاده"
  },
  {
    word: "junction",
    meaning: "تقاطع، چهارراه",
    lesson: 67,
    pos: "n.",
    lessonLabel: "درس 67 — در جاده"
  },
  {
    word: "a bend in the road",
    meaning: "پیچ جاده",
    lesson: 67,
    pos: "phr.",
    lessonLabel: "درس 67 — در جاده"
  },
  {
    word: "pedestrian crossing",
    meaning: "خط عابر پیاده",
    lesson: 67,
    pos: "n.",
    lessonLabel: "درس 67 — در جاده"
  },
  {
    word: "road signs",
    meaning: "علائم راهنمایی",
    lesson: 67,
    pos: "n.",
    lessonLabel: "درس 67 — در جاده"
  },
  {
    word: "inside/slow lane",
    meaning: "خط داخلی/آهسته",
    lesson: 67,
    pos: "n.",
    lessonLabel: "درس 67 — در جاده"
  },
  {
    word: "outside/fast lane",
    meaning: "خط بیرونی/تندرو",
    lesson: 67,
    pos: "n.",
    lessonLabel: "درس 67 — در جاده"
  },
  {
    word: "motorway",
    meaning: "بزرگراه",
    lesson: 67,
    pos: "n.",
    lessonLabel: "درس 67 — در جاده"
  },
  {
    word: "lorry",
    meaning: "کامیون",
    lesson: 67,
    pos: "n.",
    lessonLabel: "درس 67 — در جاده"
  },
  {
    word: "break down",
    meaning: "از کار افتادن (وسیله نقلیه)",
    lesson: 67,
    pos: "v.",
    lessonLabel: "درس 67 — در جاده"
  },
  {
    word: "block the road",
    meaning: "جاده را بستن",
    lesson: 67,
    pos: "phr.",
    lessonLabel: "درس 67 — در جاده"
  },
  {
    word: "tailback",
    meaning: "صف طولانی خودروها",
    lesson: 67,
    pos: "n.",
    lessonLabel: "درس 67 — در جاده"
  },
  {
    word: "pull out",
    meaning: "از کنار بیرون آمدن به وسط جاده",
    lesson: 67,
    pos: "v.",
    lessonLabel: "درس 67 — در جاده"
  },
  {
    word: "in the opposite direction",
    meaning: "در جهت مخالف",
    lesson: 67,
    pos: "phr.",
    lessonLabel: "درس 67 — در جاده"
  },
  {
    word: "brake",
    meaning: "ترمز کردن",
    lesson: 67,
    pos: "v.",
    lessonLabel: "درس 67 — در جاده"
  },
  {
    word: "prevent",
    meaning: "جلوگیری کردن",
    lesson: 67,
    pos: "v.",
    lessonLabel: "درس 67 — در جاده"
  },
  {
    word: "crash into",
    meaning: "خوردن به، تصادف کردن با",
    lesson: 67,
    pos: "phr.",
    lessonLabel: "درس 67 — در جاده"
  },
  {
    word: "badly injured",
    meaning: "به‌شدت مجروح",
    lesson: 67,
    pos: "adj.",
    lessonLabel: "درس 67 — در جاده"
  },
  {
    word: "badly damaged",
    meaning: "به‌شدت آسیب‌دیده",
    lesson: 67,
    pos: "adj.",
    lessonLabel: "درس 67 — در جاده"
  },
  {
    word: "go along",
    meaning: "در امتداد... رفتن",
    lesson: 67,
    pos: "phr.",
    lessonLabel: "درس 67 — در جاده"
  },
  {
    word: "turn right",
    meaning: "راست برگشتن",
    lesson: 67,
    pos: "phr.",
    lessonLabel: "درس 67 — در جاده"
  },
  {
    word: "take the first turning on your left",
    meaning: "اولین کوچه/مسیر سمت چپ را گرفتن",
    lesson: 67,
    pos: "phr.",
    lessonLabel: "درس 67 — در جاده"
  },
  {
    word: "keep going",
    meaning: "به راه خود ادامه دادن",
    lesson: 67,
    pos: "phr.",
    lessonLabel: "درس 67 — در جاده"
  },
  {
    word: "get to",
    meaning: "رسیدن به",
    lesson: 67,
    pos: "phr.",
    lessonLabel: "درس 67 — در جاده"
  },
  {
    word: "pedestrian",
    meaning: "عابر پیاده",
    lesson: 67,
    pos: "n.",
    lessonLabel: "درس 67 — در جاده"
  },
  {
    word: "pavement",
    meaning: "پیاده‌رو",
    lesson: 67,
    pos: "n.",
    lessonLabel: "درس 67 — در جاده"
  },
  {
    word: "speed limit",
    meaning: "محدودیت سرعت",
    lesson: 67,
    pos: "n.",
    lessonLabel: "درس 67 — در جاده"
  },
  {
    word: "speed camera",
    meaning: "دوربین ثبت تخلف سرعت",
    lesson: 67,
    pos: "n.",
    lessonLabel: "درس 67 — در جاده"
  },
  {
    word: "speeding / breaking the speed limit",
    meaning: "تندروی / تخطی از محدودیت سرعت",
    lesson: 67,
    pos: "phr.",
    lessonLabel: "درس 67 — در جاده"
  },
  {
    word: "petrol station",
    meaning: "پمپ بنزین",
    lesson: 67,
    pos: "n.",
    lessonLabel: "درس 67 — در جاده"
  },
  {
    word: "self-service",
    meaning: "خودخدمتی",
    lesson: 67,
    pos: "adj.",
    lessonLabel: "درس 67 — در جاده"
  },
  {
    word: "overtake",
    meaning: "سبقت گرفتن",
    lesson: 67,
    pos: "v.",
    lessonLabel: "درس 67 — در جاده"
  },
  {
    word: "vehicle",
    meaning: "وسیلهٔ نقلیه",
    lesson: 68,
    pos: "n.",
    lessonLabel: "درس 68 — حمل‌ونقل"
  },
  {
    word: "bus",
    meaning: "اتوبوس",
    lesson: 68,
    pos: "n.",
    lessonLabel: "درس 68 — حمل‌ونقل"
  },
  {
    word: "coach",
    meaning: "اتوبوس بین‌شهری",
    lesson: 68,
    pos: "n.",
    lessonLabel: "درس 68 — حمل‌ونقل"
  },
  {
    word: "bicycle",
    meaning: "دوچرخه",
    lesson: 68,
    pos: "n.",
    lessonLabel: "درس 68 — حمل‌ونقل"
  },
  {
    word: "motorbike",
    meaning: "موتورسیکلت",
    lesson: 68,
    pos: "n.",
    lessonLabel: "درس 68 — حمل‌ونقل"
  },
  {
    word: "van",
    meaning: "وان/خودرو باری کوچک",
    lesson: 68,
    pos: "n.",
    lessonLabel: "درس 68 — حمل‌ونقل"
  },
  {
    word: "lorry",
    meaning: "کامیون",
    lesson: 68,
    pos: "n.",
    lessonLabel: "درس 68 — حمل‌ونقل"
  },
  {
    word: "taxi",
    meaning: "تاکسی",
    lesson: 68,
    pos: "n.",
    lessonLabel: "درس 68 — حمل‌ونقل"
  },
  {
    word: "train",
    meaning: "قطار",
    lesson: 68,
    pos: "n.",
    lessonLabel: "درس 68 — حمل‌ونقل"
  },
  {
    word: "plane",
    meaning: "هواپیما",
    lesson: 68,
    pos: "n.",
    lessonLabel: "درس 68 — حمل‌ونقل"
  },
  {
    word: "car",
    meaning: "خودرو",
    lesson: 68,
    pos: "n.",
    lessonLabel: "درس 68 — حمل‌ونقل"
  },
  {
    word: "driver",
    meaning: "راننده",
    lesson: 68,
    pos: "n.",
    lessonLabel: "درس 68 — حمل‌ونقل"
  },
  {
    word: "drive",
    meaning: "رانندگی کردن",
    lesson: 68,
    pos: "v.",
    lessonLabel: "درس 68 — حمل‌ونقل"
  },
  {
    word: "fly",
    meaning: "پرواز کردن",
    lesson: 68,
    pos: "v.",
    lessonLabel: "درس 68 — حمل‌ونقل"
  },
  {
    word: "fare",
    meaning: "کرایه",
    lesson: 68,
    pos: "n.",
    lessonLabel: "درس 68 — حمل‌ونقل"
  },
  {
    word: "air fare",
    meaning: "کرایهٔ هواپیما",
    lesson: 68,
    pos: "n.",
    lessonLabel: "درس 68 — حمل‌ونقل"
  },
  {
    word: "get/catch/take",
    meaning: "گرفتن/سوار شدن (وسیلهٔ نقلیه)",
    lesson: 68,
    pos: "phr.",
    lessonLabel: "درس 68 — حمل‌ونقل"
  },
  {
    word: "get/take",
    meaning: "گرفتن/سوار شدن",
    lesson: 68,
    pos: "phr.",
    lessonLabel: "درس 68 — حمل‌ونقل"
  },
  {
    word: "get on/off",
    meaning: "سوار شدن/پیاده شدن",
    lesson: 68,
    pos: "phr.",
    lessonLabel: "درس 68 — حمل‌ونقل"
  },
  {
    word: "get in/out (of)",
    meaning: "سوار شدن/پیاده شدن (خودرو)",
    lesson: 68,
    pos: "phr.",
    lessonLabel: "درس 68 — حمل‌ونقل"
  },
  {
    word: "journey",
    meaning: "سفر",
    lesson: 68,
    pos: "n.",
    lessonLabel: "درس 68 — حمل‌ونقل"
  },
  {
    word: "bus station",
    meaning: "پایانهٔ اتوبوس",
    lesson: 68,
    pos: "n.",
    lessonLabel: "درس 68 — حمل‌ونقل"
  },
  {
    word: "railway station",
    meaning: "ایستگاه راه‌آهن",
    lesson: 68,
    pos: "n.",
    lessonLabel: "درس 68 — حمل‌ونقل"
  },
  {
    word: "flight",
    meaning: "پرواز",
    lesson: 68,
    pos: "n.",
    lessonLabel: "درس 68 — حمل‌ونقل"
  },
  {
    word: "airport",
    meaning: "فرودگاه",
    lesson: 68,
    pos: "n.",
    lessonLabel: "درس 68 — حمل‌ونقل"
  },
  {
    word: "taxi rank",
    meaning: "پایانهٔ تاکسی",
    lesson: 68,
    pos: "n.",
    lessonLabel: "درس 68 — حمل‌ونقل"
  },
  {
    word: "cyclist",
    meaning: "دوچرخه‌سوار",
    lesson: 68,
    pos: "n.",
    lessonLabel: "درس 68 — حمل‌ونقل"
  },
  {
    word: "ride",
    meaning: "سوار شدن/راندن (دوچرخه)",
    lesson: 68,
    pos: "v.",
    lessonLabel: "درس 68 — حمل‌ونقل"
  },
  {
    word: "go on (my)",
    meaning: "رفتن با (دوچرخه‌ام)",
    lesson: 68,
    pos: "phr.",
    lessonLabel: "درس 68 — حمل‌ونقل"
  },
  {
    word: "go in (my)",
    meaning: "رفتن با (خودرویم)",
    lesson: 68,
    pos: "phr.",
    lessonLabel: "درس 68 — حمل‌ونقل"
  },
  {
    word: "passenger",
    meaning: "مسافر",
    lesson: 68,
    pos: "n.",
    lessonLabel: "درس 68 — حمل‌ونقل"
  },
  {
    word: "single",
    meaning: "بلیت یک‌طرفه",
    lesson: 68,
    pos: "n.",
    lessonLabel: "درس 68 — حمل‌ونقل"
  },
  {
    word: "return",
    meaning: "بلیت رفت‌وبرگشت",
    lesson: 68,
    pos: "n.",
    lessonLabel: "درس 68 — حمل‌ونقل"
  },
  {
    word: "and back",
    meaning: "رفت‌وبرگشت",
    lesson: 68,
    pos: "phr.",
    lessonLabel: "درس 68 — حمل‌ونقل"
  },
  {
    word: "change",
    meaning: "تغییر خط (قطار)",
    lesson: 68,
    pos: "v.",
    lessonLabel: "درس 68 — حمل‌ونقل"
  },
  {
    word: "stopping train",
    meaning: "قطار محلی (در همهٔ ایستگاه‌ها توقف می‌کند)",
    lesson: 68,
    pos: "n.",
    lessonLabel: "درس 68 — حمل‌ونقل"
  },
  {
    word: "platform",
    meaning: "سکو (ایستگاه)",
    lesson: 68,
    pos: "n.",
    lessonLabel: "درس 68 — حمل‌ونقل"
  },
  {
    word: "due to arrive",
    meaning: "موقتِ رسیدن/طبق برنامه برسد",
    lesson: 68,
    pos: "phr.",
    lessonLabel: "درس 68 — حمل‌ونقل"
  },
  {
    word: "punctual",
    meaning: "وقت‌شناس",
    lesson: 68,
    pos: "adj.",
    lessonLabel: "درس 68 — حمل‌ونقل"
  },
  {
    word: "run",
    meaning: "حرکت کردن/سرویس دادن (اتوبوس)",
    lesson: 68,
    pos: "v.",
    lessonLabel: "درس 68 — حمل‌ونقل"
  },
  {
    word: "queue",
    meaning: "صف",
    lesson: 68,
    pos: "n.",
    lessonLabel: "درس 68 — حمل‌ونقل"
  },
  {
    word: "full up",
    meaning: "پر (ظرفیت تکمیل)",
    lesson: 68,
    pos: "adj.",
    lessonLabel: "درس 68 — حمل‌ونقل"
  },
  {
    word: "miss",
    meaning: "جا ماندن از (اتوبوس)",
    lesson: 68,
    pos: "v.",
    lessonLabel: "درس 68 — حمل‌ونقل"
  },
  {
    word: "meter",
    meaning: "کنتور (تاکسی)",
    lesson: 68,
    pos: "n.",
    lessonLabel: "درس 68 — حمل‌ونقل"
  },
  {
    word: "drop me here",
    meaning: "اینجا پیاده‌ام کن",
    lesson: 68,
    pos: "phr.",
    lessonLabel: "درس 68 — حمل‌ونقل"
  },
  {
    word: "tip",
    meaning: "انعام",
    lesson: 68,
    pos: "n.",
    lessonLabel: "درس 68 — حمل‌ونقل"
  },
  {
    word: "What do you do?",
    meaning: "شغل شما چیست؟",
    lesson: 69,
    pos: "phr.",
    lessonLabel: "درس 69 — کار: وظایف، حقوق و شرایط"
  },
  {
    word: "What's your job?",
    meaning: "شغل شما چیست؟",
    lesson: 69,
    pos: "phr.",
    lessonLabel: "درس 69 — کار: وظایف، حقوق و شرایط"
  },
  {
    word: "What do you do for a living?",
    meaning: "چه کاری برای امرار معاش انجام می‌دهید؟",
    lesson: 69,
    pos: "phr.",
    lessonLabel: "درس 69 — کار: وظایف، حقوق و شرایط"
  },
  {
    word: "I'm a banker/an engineer/a builder",
    meaning: "من بانکدار/مهندس/ساختمان‌کار هستم",
    lesson: 69,
    pos: "phr.",
    lessonLabel: "درس 69 — کار: وظایف، حقوق و شرایط"
  },
  {
    word: "work in",
    meaning: "کار کردن در (مکان یا نوع کار)",
    lesson: 69,
    pos: "phr.",
    lessonLabel: "درس 69 — کار: وظایف، حقوق و شرایط"
  },
  {
    word: "work for",
    meaning: "برای (شرکتی) کار کردن",
    lesson: 69,
    pos: "phr.",
    lessonLabel: "درس 69 — کار: وظایف، حقوق و شرایط"
  },
  {
    word: "be employed by",
    meaning: "استخدام/کار کردن برای",
    lesson: 69,
    pos: "phr.",
    lessonLabel: "درس 69 — کار: وظایف، حقوق و شرایط"
  },
  {
    word: "self-employed",
    meaning: "خوداشتغال",
    lesson: 69,
    pos: "adj.",
    lessonLabel: "درس 69 — کار: وظایف، حقوق و شرایط"
  },
  {
    word: "responsibilities",
    meaning: "مسئولیت‌ها (وظایف)",
    lesson: 69,
    pos: "n.",
    lessonLabel: "درس 69 — کار: وظایف، حقوق و شرایط"
  },
  {
    word: "duties",
    meaning: "وظایف",
    lesson: 69,
    pos: "n.",
    lessonLabel: "درس 69 — کار: وظایف، حقوق و شرایط"
  },
  {
    word: "daily routine",
    meaning: "کارهای روزمره",
    lesson: 69,
    pos: "phr.",
    lessonLabel: "درس 69 — کار: وظایف، حقوق و شرایط"
  },
  {
    word: "What does that involve?",
    meaning: "آن شامل چه کارهایی می‌شود؟",
    lesson: 69,
    pos: "phr.",
    lessonLabel: "درس 69 — کار: وظایف، حقوق و شرایط"
  },
  {
    word: "in charge of",
    meaning: "مسئولِ / در رأسِ",
    lesson: 69,
    pos: "phr.",
    lessonLabel: "درس 69 — کار: وظایف، حقوق و شرایط"
  },
  {
    word: "responsible for",
    meaning: "مسئولِ",
    lesson: 69,
    pos: "phr.",
    lessonLabel: "درس 69 — کار: وظایف، حقوق و شرایط"
  },
  {
    word: "factory",
    meaning: "کارخانه",
    lesson: 69,
    pos: "n.",
    lessonLabel: "درس 69 — کار: وظایف، حقوق و شرایط"
  },
  {
    word: "deal with",
    meaning: "رسیدگی کردن به",
    lesson: 69,
    pos: "phr.",
    lessonLabel: "درس 69 — کار: وظایف، حقوق و شرایط"
  },
  {
    word: "handle",
    meaning: "رسیدگی کردن به",
    lesson: 69,
    pos: "v.",
    lessonLabel: "درس 69 — کار: وظایف، حقوق و شرایط"
  },
  {
    word: "complaints",
    meaning: "شکایات",
    lesson: 69,
    pos: "n.",
    lessonLabel: "درس 69 — کار: وظایف، حقوق و شرایط"
  },
  {
    word: "run",
    meaning: "اداره کردن / مدیریت کردن",
    lesson: 69,
    pos: "v.",
    lessonLabel: "درس 69 — کار: وظایف، حقوق و شرایط"
  },
  {
    word: "attend",
    meaning: "حضور داشتن در (رسیدگی/رفتن به)",
    lesson: 69,
    pos: "v.",
    lessonLabel: "درس 69 — کار: وظایف، حقوق و شرایط"
  },
  {
    word: "meeting",
    meaning: "جلسه",
    lesson: 69,
    pos: "n.",
    lessonLabel: "درس 69 — کار: وظایف، حقوق و شرایط"
  },
  {
    word: "clients",
    meaning: "مشتریان/موکلان",
    lesson: 69,
    pos: "n.",
    lessonLabel: "درس 69 — کار: وظایف، حقوق و شرایط"
  },
  {
    word: "advise",
    meaning: "مشاوره دادن",
    lesson: 69,
    pos: "v.",
    lessonLabel: "درس 69 — کار: وظایف، حقوق و شرایط"
  },
  {
    word: "My job involves travelling.",
    meaning: "کار من مستلزم سفر کردن است.",
    lesson: 69,
    pos: "phr.",
    lessonLabel: "درس 69 — کار: وظایف، حقوق و شرایط"
  },
  {
    word: "working hours",
    meaning: "ساعات کار",
    lesson: 69,
    pos: "phr.",
    lessonLabel: "درس 69 — کار: وظایف، حقوق و شرایط"
  },
  {
    word: "nine-to-five job",
    meaning: "کار ۹ تا ۵ (با ساعات کاری منظم)",
    lesson: 69,
    pos: "phr.",
    lessonLabel: "درس 69 — کار: وظایف، حقوق و شرایط"
  },
  {
    word: "flexitime",
    meaning: "ساعات کاری انعطاف‌پذیر",
    lesson: 69,
    pos: "n.",
    lessonLabel: "درس 69 — کار: وظایف، حقوق و شرایط"
  },
  {
    word: "shiftwork",
    meaning: "کار نوبتی",
    lesson: 69,
    pos: "n.",
    lessonLabel: "درس 69 — کار: وظایف، حقوق و شرایط"
  },
  {
    word: "overtime",
    meaning: "اضافه‌کاری",
    lesson: 69,
    pos: "n.",
    lessonLabel: "درس 69 — کار: وظایف، حقوق و شرایط"
  },
  {
    word: "paid",
    meaning: "حقوق‌بگیر / پرداخت‌شده",
    lesson: 69,
    pos: "adj.",
    lessonLabel: "درس 69 — کار: وظایف، حقوق و شرایط"
  },
  {
    word: "salary",
    meaning: "حقوق (ماهانه)",
    lesson: 69,
    pos: "n.",
    lessonLabel: "درس 69 — کار: وظایف، حقوق و شرایط"
  },
  {
    word: "earn/make",
    meaning: "درآمد داشتن / پول درآوردن",
    lesson: 69,
    pos: "phr.",
    lessonLabel: "درس 69 — کار: وظایف، حقوق و شرایط"
  },
  {
    word: "minimum wage",
    meaning: "حداقل دستمزد",
    lesson: 69,
    pos: "phr.",
    lessonLabel: "درس 69 — کار: وظایف، حقوق و شرایط"
  },
  {
    word: "paid holiday",
    meaning: "مرخصی با حقوق",
    lesson: 69,
    pos: "phr.",
    lessonLabel: "درس 69 — کار: وظایف، حقوق و شرایط"
  },
  {
    word: "sick pay",
    meaning: "حق بیماری (دستمزد زمان بیماری)",
    lesson: 69,
    pos: "phr.",
    lessonLabel: "درس 69 — کار: وظایف، حقوق و شرایط"
  },
  {
    word: "income",
    meaning: "درآمد",
    lesson: 69,
    pos: "n.",
    lessonLabel: "درس 69 — کار: وظایف، حقوق و شرایط"
  },
  {
    word: "income tax",
    meaning: "مالیات بر درآمد",
    lesson: 69,
    pos: "phr.",
    lessonLabel: "درس 69 — کار: وظایف، حقوق و شرایط"
  },
  {
    word: "bricklayer (builds walls with bricks)",
    meaning: "بنّا (کسی که با آجر دیوار می‌سازد)",
    lesson: 70,
    pos: "n.",
    lessonLabel: "درس 70 — شغل‌ها"
  },
  {
    word: "carpenter (makes things using wood)",
    meaning: "نجار (چیزهایی با چوب می‌سازد)",
    lesson: 70,
    pos: "n.",
    lessonLabel: "درس 70 — شغل‌ها"
  },
  {
    word: "plumber (installs and repairs water pipes, etc.)",
    meaning: "لوله‌کش (لوله‌های آب را نصب و تعمیر می‌کند)",
    lesson: 70,
    pos: "n.",
    lessonLabel: "درس 70 — شغل‌ها"
  },
  {
    word: "electrician (installs and repairs electrical things)",
    meaning: "برق‌کار (وسایل برقی را نصب و تعمیر می‌کند)",
    lesson: 70,
    pos: "n.",
    lessonLabel: "درس 70 — شغل‌ها"
  },
  {
    word: "mechanic (repairs cars)",
    meaning: "مکانیک (ماشین‌ها را تعمیر می‌کند)",
    lesson: 70,
    pos: "n.",
    lessonLabel: "درس 70 — شغل‌ها"
  },
  {
    word: "architect",
    meaning: "معمار (طراح ساختمان)",
    lesson: 70,
    pos: "n.",
    lessonLabel: "درس 70 — شغل‌ها"
  },
  {
    word: "lawyer",
    meaning: "وکیل",
    lesson: 70,
    pos: "n.",
    lessonLabel: "درس 70 — شغل‌ها"
  },
  {
    word: "engineer",
    meaning: "مهندس",
    lesson: 70,
    pos: "n.",
    lessonLabel: "درس 70 — شغل‌ها"
  },
  {
    word: "accountant",
    meaning: "حسابدار",
    lesson: 70,
    pos: "n.",
    lessonLabel: "درس 70 — شغل‌ها"
  },
  {
    word: "university lecturer",
    meaning: "استاد دانشگاه",
    lesson: 70,
    pos: "n.",
    lessonLabel: "درس 70 — شغل‌ها"
  },
  {
    word: "stockbroker (on the stock market)",
    meaning: "کارگزار بورس",
    lesson: 70,
    pos: "n.",
    lessonLabel: "درس 70 — شغل‌ها"
  },
  {
    word: "sales/personnel manager",
    meaning: "مدیر فروش/مدیر کارگزینی",
    lesson: 70,
    pos: "n.",
    lessonLabel: "درس 70 — شغل‌ها"
  },
  {
    word: "doctor",
    meaning: "پزشک",
    lesson: 70,
    pos: "n.",
    lessonLabel: "درس 70 — شغل‌ها"
  },
  {
    word: "nurse",
    meaning: "پرستار",
    lesson: 70,
    pos: "n.",
    lessonLabel: "درس 70 — شغل‌ها"
  },
  {
    word: "surgeon (= specialist doctors who operate on people)",
    meaning: "جراح",
    lesson: 70,
    pos: "n.",
    lessonLabel: "درس 70 — شغل‌ها"
  },
  {
    word: "GP (= general practitioner – doctors who treat people with general problems)",
    meaning: "پزشک عمومی",
    lesson: 70,
    pos: "n.",
    lessonLabel: "درس 70 — شغل‌ها"
  },
  {
    word: "dentist",
    meaning: "دندان‌پزشک",
    lesson: 70,
    pos: "n.",
    lessonLabel: "درس 70 — شغل‌ها"
  },
  {
    word: "vet (= animal doctors)",
    meaning: "دامپزشک",
    lesson: 70,
    pos: "n.",
    lessonLabel: "درس 70 — شغل‌ها"
  },
  {
    word: "surgeries",
    meaning: "مطب‌ها",
    lesson: 70,
    pos: "n.",
    lessonLabel: "درس 70 — شغل‌ها"
  },
  {
    word: "treat (= give medical help, e.g. advice, medicines)",
    meaning: "درمان کردن",
    lesson: 70,
    pos: "v.",
    lessonLabel: "درس 70 — شغل‌ها"
  },
  {
    word: "look after (= care for/take care of)",
    meaning: "مراقبت کردن",
    lesson: 70,
    pos: "phr.",
    lessonLabel: "درس 70 — شغل‌ها"
  },
  {
    word: "soldier (in the army)",
    meaning: "سرباز",
    lesson: 70,
    pos: "n.",
    lessonLabel: "درس 70 — شغل‌ها"
  },
  {
    word: "sailor (in the navy)",
    meaning: "ملوان",
    lesson: 70,
    pos: "n.",
    lessonLabel: "درس 70 — شغل‌ها"
  },
  {
    word: "pilot (in the air force)",
    meaning: "خلبان",
    lesson: 70,
    pos: "n.",
    lessonLabel: "درس 70 — شغل‌ها"
  },
  {
    word: "police officer/policeman/policewoman (in the police force)",
    meaning: "افسر پلیس",
    lesson: 70,
    pos: "n.",
    lessonLabel: "درس 70 — شغل‌ها"
  },
  {
    word: "firefighter/fireman (in the fire brigade)",
    meaning: "آتش‌نشان",
    lesson: 70,
    pos: "n.",
    lessonLabel: "درس 70 — شغل‌ها"
  },
  {
    word: "skilled",
    meaning: "ماهر، نیازمند آموزش زیاد",
    lesson: 70,
    pos: "adj.",
    lessonLabel: "درس 70 — شغل‌ها"
  },
  {
    word: "apply for",
    meaning: "درخواست دادن (برای کار)",
    lesson: 71,
    pos: "v.",
    lessonLabel: "درس 71 — نردبان شغلی"
  },
  {
    word: "trainee",
    meaning: "کارآموز",
    lesson: 71,
    pos: "n.",
    lessonLabel: "درس 71 — نردبان شغلی"
  },
  {
    word: "earn",
    meaning: "کسب کردن (پول)",
    lesson: 71,
    pos: "v.",
    lessonLabel: "درس 71 — نردبان شغلی"
  },
  {
    word: "low salary",
    meaning: "حقوق کم",
    lesson: 71,
    pos: "phr.",
    lessonLabel: "درس 71 — نردبان شغلی"
  },
  {
    word: "in-house training",
    meaning: "آموزش داخل شرکت",
    lesson: 71,
    pos: "phr.",
    lessonLabel: "درس 71 — نردبان شغلی"
  },
  {
    word: "training course",
    meaning: "دورهٔ آموزشی",
    lesson: 71,
    pos: "phr.",
    lessonLabel: "درس 71 — نردبان شغلی"
  },
  {
    word: "prospects",
    meaning: "چشم‌اندازهای شغلی",
    lesson: 71,
    pos: "n.",
    lessonLabel: "درس 71 — نردبان شغلی"
  },
  {
    word: "manager",
    meaning: "مدیر",
    lesson: 71,
    pos: "n.",
    lessonLabel: "درس 71 — نردبان شغلی"
  },
  {
    word: "boss",
    meaning: "رئیس",
    lesson: 71,
    pos: "n.",
    lessonLabel: "درس 71 — نردبان شغلی"
  },
  {
    word: "pay rise",
    meaning: "افزایش حقوق",
    lesson: 71,
    pos: "phr.",
    lessonLabel: "درس 71 — نردبان شغلی"
  },
  {
    word: "be promoted",
    meaning: "ارتقا یافتن",
    lesson: 71,
    pos: "phr.",
    lessonLabel: "درس 71 — نردبان شغلی"
  },
  {
    word: "in charge of",
    meaning: "مسئول، سرپرستِ",
    lesson: 71,
    pos: "phr.",
    lessonLabel: "درس 71 — نردبان شغلی"
  },
  {
    word: "employee",
    meaning: "کارمند",
    lesson: 71,
    pos: "n.",
    lessonLabel: "درس 71 — نردبان شغلی"
  },
  {
    word: "under her",
    meaning: "زیر نظر او",
    lesson: 71,
    pos: "phr.",
    lessonLabel: "درس 71 — نردبان شغلی"
  },
  {
    word: "employer",
    meaning: "کارفرما",
    lesson: 71,
    pos: "n.",
    lessonLabel: "درس 71 — نردبان شغلی"
  },
  {
    word: "trainer",
    meaning: "مربی",
    lesson: 71,
    pos: "n.",
    lessonLabel: "درس 71 — نردبان شغلی"
  },
  {
    word: "fresh challenge",
    meaning: "چالش تازه",
    lesson: 71,
    pos: "phr.",
    lessonLabel: "درس 71 — نردبان شغلی"
  },
  {
    word: "career change",
    meaning: "تغییر شغل",
    lesson: 71,
    pos: "phr.",
    lessonLabel: "درس 71 — نردبان شغلی"
  },
  {
    word: "work abroad",
    meaning: "کار در خارج از کشور",
    lesson: 71,
    pos: "phr.",
    lessonLabel: "درس 71 — نردبان شغلی"
  },
  {
    word: "resign",
    meaning: "استعفا دادن",
    lesson: 71,
    pos: "v.",
    lessonLabel: "درس 71 — نردبان شغلی"
  },
  {
    word: "quit",
    meaning: "ترک کردن (شغل)",
    lesson: 71,
    pos: "v.",
    lessonLabel: "درس 71 — نردبان شغلی"
  },
  {
    word: "involve",
    meaning: "شامل بودن",
    lesson: 71,
    pos: "v.",
    lessonLabel: "درس 71 — نردبان شغلی"
  },
  {
    word: "dismiss",
    meaning: "اخراج کردن",
    lesson: 71,
    pos: "v.",
    lessonLabel: "درس 71 — نردبان شغلی"
  },
  {
    word: "sack",
    meaning: "اخراج کردن",
    lesson: 71,
    pos: "v.",
    lessonLabel: "درس 71 — نردبان شغلی"
  },
  {
    word: "unemployed",
    meaning: "بیکار",
    lesson: 71,
    pos: "adj.",
    lessonLabel: "درس 71 — نردبان شغلی"
  },
  {
    word: "out of work",
    meaning: "بی‌کار",
    lesson: 71,
    pos: "phr.",
    lessonLabel: "درس 71 — نردبان شغلی"
  },
  {
    word: "part-time job",
    meaning: "کار پاره‌وقت",
    lesson: 71,
    pos: "phr.",
    lessonLabel: "درس 71 — نردبان شغلی"
  },
  {
    word: "take over",
    meaning: "کنترل/تصاحب کردن",
    lesson: 71,
    pos: "v.",
    lessonLabel: "درس 71 — نردبان شغلی"
  },
  {
    word: "retire",
    meaning: "بازنشسته شدن",
    lesson: 71,
    pos: "v.",
    lessonLabel: "درس 71 — نردبان شغلی"
  },
  {
    word: "calendar",
    meaning: "تقویم",
    lesson: 72,
    pos: "n.",
    lessonLabel: "درس 72 — در دفتر کار"
  },
  {
    word: "keyboard",
    meaning: "صفحه‌کلید",
    lesson: 72,
    pos: "n.",
    lessonLabel: "درس 72 — در دفتر کار"
  },
  {
    word: "monitor",
    meaning: "نمایشگر",
    lesson: 72,
    pos: "n.",
    lessonLabel: "درس 72 — در دفتر کار"
  },
  {
    word: "filing cabinet",
    meaning: "کمد بایگانی",
    lesson: 72,
    pos: "n.",
    lessonLabel: "درس 72 — در دفتر کار"
  },
  {
    word: "files",
    meaning: "پرونده‌ها",
    lesson: 72,
    pos: "n.",
    lessonLabel: "درس 72 — در دفتر کار"
  },
  {
    word: "noticeboard",
    meaning: "تابلوی اعلانات",
    lesson: 72,
    pos: "n.",
    lessonLabel: "درس 72 — در دفتر کار"
  },
  {
    word: "computer",
    meaning: "رایانه",
    lesson: 72,
    pos: "n.",
    lessonLabel: "درس 72 — در دفتر کار"
  },
  {
    word: "drawers",
    meaning: "کشوها",
    lesson: 72,
    pos: "n.",
    lessonLabel: "درس 72 — در دفتر کار"
  },
  {
    word: "wastepaper basket",
    meaning: "سبد کاغذهای باطله",
    lesson: 72,
    pos: "n.",
    lessonLabel: "درس 72 — در دفتر کار"
  },
  {
    word: "briefcase",
    meaning: "کیف کاغذی",
    lesson: 72,
    pos: "n.",
    lessonLabel: "درس 72 — در دفتر کار"
  },
  {
    word: "calculator",
    meaning: "ماشین‌حساب",
    lesson: 72,
    pos: "n.",
    lessonLabel: "درس 72 — در دفتر کار"
  },
  {
    word: "diary",
    meaning: "دفتر یادداشت روزانه",
    lesson: 72,
    pos: "n.",
    lessonLabel: "درس 72 — در دفتر کار"
  },
  {
    word: "desk",
    meaning: "میز کار",
    lesson: 72,
    pos: "n.",
    lessonLabel: "درس 72 — در دفتر کار"
  },
  {
    word: "produce",
    meaning: "تولید کردن",
    lesson: 72,
    pos: "v.",
    lessonLabel: "درس 72 — در دفتر کار"
  },
  {
    word: "manufacture",
    meaning: "ساختن/تولید کردن (رسمی)",
    lesson: 72,
    pos: "v.",
    lessonLabel: "درس 72 — در دفتر کار"
  },
  {
    word: "factory",
    meaning: "کارخانه",
    lesson: 72,
    pos: "n.",
    lessonLabel: "درس 72 — در دفتر کار"
  },
  {
    word: "work at a computer",
    meaning: "با رایانه کار کردن",
    lesson: 72,
    pos: "phr.",
    lessonLabel: "درس 72 — در دفتر کار"
  },
  {
    word: "type",
    meaning: "تایپ کردن",
    lesson: 72,
    pos: "v.",
    lessonLabel: "درس 72 — در دفتر کار"
  },
  {
    word: "send e-mails",
    meaning: "ایمیل فرستادن",
    lesson: 72,
    pos: "phr.",
    lessonLabel: "درس 72 — در دفتر کار"
  },
  {
    word: "invoice",
    meaning: "صورتحساب/فاکتور",
    lesson: 72,
    pos: "n.",
    lessonLabel: "درس 72 — در دفتر کار"
  },
  {
    word: "paperwork",
    meaning: "کارهای کاغذی/اداری",
    lesson: 72,
    pos: "n.",
    lessonLabel: "درس 72 — در دفتر کار"
  },
  {
    word: "filing reports",
    meaning: "بایگانی کردن گزارش‌ها",
    lesson: 72,
    pos: "phr.",
    lessonLabel: "درس 72 — در دفتر کار"
  },
  {
    word: "show people round the factory",
    meaning: "مردم را از کارخانه دیدن کردن",
    lesson: 72,
    pos: "phr.",
    lessonLabel: "درس 72 — در دفتر کار"
  },
  {
    word: "make appointments",
    meaning: "وقت ملاقات گذاشتن",
    lesson: 72,
    pos: "phr.",
    lessonLabel: "درس 72 — در دفتر کار"
  },
  {
    word: "arrange meetings",
    meaning: "جلسه ترتیب دادن",
    lesson: 72,
    pos: "phr.",
    lessonLabel: "درس 72 — در دفتر کار"
  },
  {
    word: "agenda",
    meaning: "دستور جلسه",
    lesson: 72,
    pos: "n.",
    lessonLabel: "درس 72 — در دفتر کار"
  },
  {
    word: "attend",
    meaning: "حاضر شدن/شرکت کردن",
    lesson: 72,
    pos: "v.",
    lessonLabel: "درس 72 — در دفتر کار"
  },
  {
    word: "take the minutes",
    meaning: "صورت‌جلسه نوشتن",
    lesson: 72,
    pos: "phr.",
    lessonLabel: "درس 72 — در دفتر کار"
  },
  {
    word: "photocopier",
    meaning: "دستگاه فتوکپی",
    lesson: 72,
    pos: "n.",
    lessonLabel: "درس 72 — در دفتر کار"
  },
  {
    word: "broken",
    meaning: "خراب",
    lesson: 72,
    pos: "adj.",
    lessonLabel: "درس 72 — در دفتر کار"
  },
  {
    word: "printer",
    meaning: "چاپگر/پرینتر",
    lesson: 72,
    pos: "n.",
    lessonLabel: "درس 72 — در دفتر کار"
  },
  {
    word: "run out of",
    meaning: "تمام شدن (ذخیره)",
    lesson: 72,
    pos: "phr.",
    lessonLabel: "درس 72 — در دفتر کار"
  },
  {
    word: "down",
    meaning: "از کار افتاده",
    lesson: 72,
    pos: "adj.",
    lessonLabel: "درس 72 — در دفتر کار"
  },
  {
    word: "colleague",
    meaning: "همکار",
    lesson: 72,
    pos: "n.",
    lessonLabel: "درس 72 — در دفتر کار"
  },
  {
    word: "off",
    meaning: "در حال مرخصی/غایب",
    lesson: 72,
    pos: "adj.",
    lessonLabel: "درس 72 — در دفتر کار"
  },
  {
    word: "loads of work",
    meaning: "کار فراوان",
    lesson: 72,
    pos: "phr.",
    lessonLabel: "درس 72 — در دفتر کار"
  },
  {
    word: "finance",
    meaning: "تمویل کردن، تأمین مالی",
    lesson: 73,
    pos: "v.",
    lessonLabel: "درس 73 — کسب‌وکار و امور مالی"
  },
  {
    word: "investment",
    meaning: "سرمایه‌گذاری",
    lesson: 73,
    pos: "n.",
    lessonLabel: "درس 73 — کسب‌وکار و امور مالی"
  },
  {
    word: "loan",
    meaning: "وام",
    lesson: 73,
    pos: "n.",
    lessonLabel: "درس 73 — کسب‌وکار و امور مالی"
  },
  {
    word: "interest",
    meaning: "بهره (سود وام)",
    lesson: 73,
    pos: "n.",
    lessonLabel: "درس 73 — کسب‌وکار و امور مالی"
  },
  {
    word: "interest rate",
    meaning: "نرخ بهره",
    lesson: 73,
    pos: "n.",
    lessonLabel: "درس 73 — کسب‌وکار و امور مالی"
  },
  {
    word: "main aim/objective",
    meaning: "هدف اصلی",
    lesson: 73,
    pos: "n.",
    lessonLabel: "درس 73 — کسب‌وکار و امور مالی"
  },
  {
    word: "make a profit",
    meaning: "سود کردن",
    lesson: 73,
    pos: "phr.",
    lessonLabel: "درس 73 — کسب‌وکار و امور مالی"
  },
  {
    word: "make a loss",
    meaning: "ضرر کردن",
    lesson: 73,
    pos: "phr.",
    lessonLabel: "درس 73 — کسب‌وکار و امور مالی"
  },
  {
    word: "break even",
    meaning: "سر به سر شدن (نه سود نه ضرر)",
    lesson: 73,
    pos: "phr.",
    lessonLabel: "درس 73 — کسب‌وکار و امور مالی"
  },
  {
    word: "turnover",
    meaning: "گردش مالی (فروش کل)",
    lesson: 73,
    pos: "n.",
    lessonLabel: "درس 73 — کسب‌وکار و امور مالی"
  },
  {
    word: "expenditure",
    meaning: "هزینه‌ها، مخارج",
    lesson: 73,
    pos: "n.",
    lessonLabel: "درس 73 — کسب‌وکار و امور مالی"
  },
  {
    word: "raw materials",
    meaning: "مواد خام",
    lesson: 73,
    pos: "n.",
    lessonLabel: "درس 73 — کسب‌وکار و امور مالی"
  },
  {
    word: "overheads",
    meaning: "هزینه‌های ثابت (اجاره، برق و...)",
    lesson: 73,
    pos: "n.",
    lessonLabel: "درس 73 — کسب‌وکار و امور مالی"
  },
  {
    word: "labour costs",
    meaning: "هزینه‌های نیروی کار",
    lesson: 73,
    pos: "n.",
    lessonLabel: "درس 73 — کسب‌وکار و امور مالی"
  },
  {
    word: "trend",
    meaning: "روند",
    lesson: 73,
    pos: "n.",
    lessonLabel: "درس 73 — کسب‌وکار و امور مالی"
  },
  {
    word: "rise/go up/increase",
    meaning: "بالا رفتن، افزایش یافتن",
    lesson: 73,
    pos: "v.",
    lessonLabel: "درس 73 — کسب‌وکار و امور مالی"
  },
  {
    word: "rise slowly (also gradually)",
    meaning: "آهسته (تدریجی) افزایش یافتن",
    lesson: 73,
    pos: "phr.",
    lessonLabel: "درس 73 — کسب‌وکار و امور مالی"
  },
  {
    word: "go up steadily",
    meaning: "پیوسته/مداوم بالا رفتن",
    lesson: 73,
    pos: "phr.",
    lessonLabel: "درس 73 — کسب‌وکار و امور مالی"
  },
  {
    word: "rise sharply",
    meaning: "به‌شدت بالا رفتن",
    lesson: 73,
    pos: "phr.",
    lessonLabel: "درس 73 — کسب‌وکار و امور مالی"
  },
  {
    word: "fall/go down/drop",
    meaning: "پایین آمدن، افت کردن",
    lesson: 73,
    pos: "v.",
    lessonLabel: "درس 73 — کسب‌وکار و امور مالی"
  },
  {
    word: "fall slowly",
    meaning: "آهسته پایین آمدن",
    lesson: 73,
    pos: "phr.",
    lessonLabel: "درس 73 — کسب‌وکار و امور مالی"
  },
  {
    word: "fall steadily",
    meaning: "پیوسته پایین آمدن",
    lesson: 73,
    pos: "phr.",
    lessonLabel: "درس 73 — کسب‌وکار و امور مالی"
  },
  {
    word: "drop sharply",
    meaning: "ناگهانی/شدید افت کردن",
    lesson: 73,
    pos: "phr.",
    lessonLabel: "درس 73 — کسب‌وکار و امور مالی"
  },
  {
    word: "a rise of 10%",
    meaning: "افزایش ۱۰ درصدی",
    lesson: 73,
    pos: "n.",
    lessonLabel: "درس 73 — کسب‌وکار و امور مالی"
  },
  {
    word: "a fall of $3.5 million",
    meaning: "افت ۳/۵ میلیون دلاری",
    lesson: 73,
    pos: "n.",
    lessonLabel: "درس 73 — کسب‌وکار و امور مالی"
  },
  {
    word: "an increase in sales",
    meaning: "افزایش در فروش",
    lesson: 73,
    pos: "n.",
    lessonLabel: "درس 73 — کسب‌وکار و امور مالی"
  },
  {
    word: "a fall in profits",
    meaning: "کاهش در سودها",
    lesson: 73,
    pos: "n.",
    lessonLabel: "درس 73 — کسب‌وکار و امور مالی"
  },
  {
    word: "grow/expand",
    meaning: "رشد کردن/گسترش یافتن",
    lesson: 73,
    pos: "v.",
    lessonLabel: "درس 73 — کسب‌وکار و امور مالی"
  },
  {
    word: "successful",
    meaning: "موفق",
    lesson: 73,
    pos: "adj.",
    lessonLabel: "درس 73 — کسب‌وکار و امور مالی"
  },
  {
    word: "inflation",
    meaning: "تورم",
    lesson: 73,
    pos: "n.",
    lessonLabel: "درس 73 — کسب‌وکار و امور مالی"
  },
  {
    word: "low interest rates",
    meaning: "نرخ‌های بهره پایین",
    lesson: 73,
    pos: "n.",
    lessonLabel: "درس 73 — کسب‌وکار و امور مالی"
  },
  {
    word: "economic and political stability",
    meaning: "ثبات اقتصادی و سیاسی",
    lesson: 73,
    pos: "n.",
    lessonLabel: "درس 73 — کسب‌وکار و امور مالی"
  },
  {
    word: "a healthy/strong economy",
    meaning: "اقتصاد سالم/قوی",
    lesson: 73,
    pos: "n.",
    lessonLabel: "درس 73 — کسب‌وکار و امور مالی"
  },
  {
    word: "an economy in recession",
    meaning: "اقتصاد در دوره رکود",
    lesson: 73,
    pos: "n.",
    lessonLabel: "درس 73 — کسب‌وکار و امور مالی"
  },
  {
    word: "tax cuts",
    meaning: "کاهش مالیات",
    lesson: 73,
    pos: "n.",
    lessonLabel: "درس 73 — کسب‌وکار و امور مالی"
  },
  {
    word: "football",
    meaning: "فوتبال",
    lesson: 74,
    lessonLabel: "درس 74 — ورزش: بازی‌های توپی"
  },
  {
    word: "basketball",
    meaning: "بسکتبال",
    lesson: 74,
    lessonLabel: "درس 74 — ورزش: بازی‌های توپی"
  },
  {
    word: "tennis",
    meaning: "تنیس",
    lesson: 74,
    lessonLabel: "درس 74 — ورزش: بازی‌های توپی"
  },
  {
    word: "table tennis",
    meaning: "تنیس روی میز",
    lesson: 74,
    lessonLabel: "درس 74 — ورزش: بازی‌های توپی"
  },
  {
    word: "volleyball",
    meaning: "والیبال",
    lesson: 74,
    lessonLabel: "درس 74 — ورزش: بازی‌های توپی"
  },
  {
    word: "rugby",
    meaning: "راگبی",
    lesson: 74,
    lessonLabel: "درس 74 — ورزش: بازی‌های توپی"
  },
  {
    word: "golf",
    meaning: "گلف",
    lesson: 74,
    lessonLabel: "درس 74 — ورزش: بازی‌های توپی"
  },
  {
    word: "baseball",
    meaning: "بیسبال",
    lesson: 74,
    lessonLabel: "درس 74 — ورزش: بازی‌های توپی"
  },
  {
    word: "hockey",
    meaning: "هاکی",
    lesson: 74,
    lessonLabel: "درس 74 — ورزش: بازی‌های توپی"
  },
  {
    word: "equipment",
    meaning: "تجهیزات، وسایل مورد نیاز برای بازی",
    lesson: 74,
    lessonLabel: "درس 74 — ورزش: بازی‌های توپی"
  },
  {
    word: "boots",
    meaning: "چکمه، کفش فوتبال",
    lesson: 74,
    lessonLabel: "درس 74 — ورزش: بازی‌های توپی"
  },
  {
    word: "training shoes",
    meaning: "کتانی ورزشی",
    lesson: 74,
    pos: "phr.",
    lessonLabel: "درس 74 — ورزش: بازی‌های توپی"
  },
  {
    word: "trainers",
    meaning: "کتانی ورزشی (غیررسمی)",
    lesson: 74,
    lessonLabel: "درس 74 — ورزش: بازی‌های توپی"
  },
  {
    word: "racket",
    meaning: "راکت",
    lesson: 74,
    lessonLabel: "درس 74 — ورزش: بازی‌های توپی"
  },
  {
    word: "bat",
    meaning: "چوب بیسبال/راکت پینگ‌پنگ",
    lesson: 74,
    lessonLabel: "درس 74 — ورزش: بازی‌های توپی"
  },
  {
    word: "stick",
    meaning: "چوب هاکی",
    lesson: 74,
    lessonLabel: "درس 74 — ورزش: بازی‌های توپی"
  },
  {
    word: "clubs",
    meaning: "چوب‌های گلف",
    lesson: 74,
    lessonLabel: "درس 74 — ورزش: بازی‌های توپی"
  },
  {
    word: "net",
    meaning: "تور",
    lesson: 74,
    lessonLabel: "درس 74 — ورزش: بازی‌های توپی"
  },
  {
    word: "court",
    meaning: "زمین بازی (تنیس، والیبال، بسکتبال)",
    lesson: 74,
    lessonLabel: "درس 74 — ورزش: بازی‌های توپی"
  },
  {
    word: "goal",
    meaning: "دروازه، گل",
    lesson: 74,
    lessonLabel: "درس 74 — ورزش: بازی‌های توپی"
  },
  {
    word: "throw it",
    meaning: "پرتابش کردن",
    lesson: 74,
    pos: "phr.",
    lessonLabel: "درس 74 — ورزش: بازی‌های توپی"
  },
  {
    word: "head it",
    meaning: "با سر زدن",
    lesson: 74,
    pos: "phr.",
    lessonLabel: "درس 74 — ورزش: بازی‌های توپی"
  },
  {
    word: "pass it",
    meaning: "پاس دادن",
    lesson: 74,
    pos: "phr.",
    lessonLabel: "درس 74 — ورزش: بازی‌های توپی"
  },
  {
    word: "hit it",
    meaning: "زدن (توپ)",
    lesson: 74,
    pos: "phr.",
    lessonLabel: "درس 74 — ورزش: بازی‌های توپی"
  },
  {
    word: "catch it",
    meaning: "گرفتن (توپ)",
    lesson: 74,
    pos: "phr.",
    lessonLabel: "درس 74 — ورزش: بازی‌های توپی"
  },
  {
    word: "kick it",
    meaning: "شوت/ضربه زدن با پا",
    lesson: 74,
    pos: "phr.",
    lessonLabel: "درس 74 — ورزش: بازی‌های توپی"
  },
  {
    word: "pitch",
    meaning: "زمین بازی (فوتبال و راگبی)",
    lesson: 74,
    lessonLabel: "درس 74 — ورزش: بازی‌های توپی"
  },
  {
    word: "spectators",
    meaning: "تماشاگران",
    lesson: 74,
    lessonLabel: "درس 74 — ورزش: بازی‌های توپی"
  },
  {
    word: "the crowd",
    meaning: "تماشاگران، جمعیت",
    lesson: 74,
    pos: "phr.",
    lessonLabel: "درس 74 — ورزش: بازی‌های توپی"
  },
  {
    word: "stadium",
    meaning: "استادیوم",
    lesson: 74,
    lessonLabel: "درس 74 — ورزش: بازی‌های توپی"
  },
  {
    word: "course",
    meaning: "زمین گلف",
    lesson: 74,
    lessonLabel: "درس 74 — ورزش: بازی‌های توپی"
  },
  {
    word: "officials",
    meaning: "داوران، مسئولان مسابقه",
    lesson: 74,
    lessonLabel: "درس 74 — ورزش: بازی‌های توپی"
  },
  {
    word: "referee",
    meaning: "داور",
    lesson: 74,
    lessonLabel: "درس 74 — ورزش: بازی‌های توپی"
  },
  {
    word: "umpire",
    meaning: "داور (تنیس و بیسبال)",
    lesson: 74,
    lessonLabel: "درس 74 — ورزش: بازی‌های توپی"
  },
  {
    word: "whistle",
    meaning: "سوت",
    lesson: 74,
    lessonLabel: "درس 74 — ورزش: بازی‌های توپی"
  },
  {
    word: "beat",
    meaning: "شکست دادن",
    lesson: 74,
    pos: "v.",
    lessonLabel: "درس 74 — ورزش: بازی‌های توپی"
  },
  {
    word: "lose",
    meaning: "باختن، شکست خوردن",
    lesson: 74,
    pos: "v.",
    lessonLabel: "درس 74 — ورزش: بازی‌های توپی"
  },
  {
    word: "win",
    meaning: "بردن",
    lesson: 74,
    pos: "v.",
    lessonLabel: "درس 74 — ورزش: بازی‌های توپی"
  },
  {
    word: "winners",
    meaning: "برندگان",
    lesson: 74,
    lessonLabel: "درس 74 — ورزش: بازی‌های توپی"
  },
  {
    word: "losers",
    meaning: "بازندگان",
    lesson: 74,
    lessonLabel: "درس 74 — ورزش: بازی‌های توپی"
  },
  {
    word: "score",
    meaning: "نتیجه، امتیاز",
    lesson: 74,
    pos: "n.",
    lessonLabel: "درس 74 — ورزش: بازی‌های توپی"
  },
  {
    word: "full-time",
    meaning: "پایان بازی",
    lesson: 74,
    pos: "phr.",
    lessonLabel: "درس 74 — ورزش: بازی‌های توپی"
  },
  {
    word: "draw",
    meaning: "مساوی کردن، تساوی",
    lesson: 74,
    pos: "v.",
    lessonLabel: "درس 74 — ورزش: بازی‌های توپی"
  },
  {
    word: "lead",
    meaning: "پیش افتادن، جلو بودن",
    lesson: 74,
    pos: "v.",
    lessonLabel: "درس 74 — ورزش: بازی‌های توپی"
  },
  {
    word: "latest",
    meaning: "آخرین، جدیدترین",
    lesson: 74,
    pos: "adj.",
    lessonLabel: "درس 74 — ورزش: بازی‌های توپی"
  },
  {
    word: "athletics",
    meaning: "دو و میدانی",
    lesson: 75,
    pos: "n.",
    lessonLabel: "درس 75 — ورزش و تفریح"
  },
  {
    word: "motor racing",
    meaning: "مسابقه‌های اتومبیل‌رانی",
    lesson: 75,
    pos: "n.",
    lessonLabel: "درس 75 — ورزش و تفریح"
  },
  {
    word: "swimming",
    meaning: "شنا",
    lesson: 75,
    pos: "n.",
    lessonLabel: "درس 75 — ورزش و تفریح"
  },
  {
    word: "track",
    meaning: "پیست (دو و میدانی)",
    lesson: 75,
    pos: "n.",
    lessonLabel: "درس 75 — ورزش و تفریح"
  },
  {
    word: "circuit",
    meaning: "پیست مسابقه",
    lesson: 75,
    pos: "n.",
    lessonLabel: "درس 75 — ورزش و تفریح"
  },
  {
    word: "pool",
    meaning: "استخر",
    lesson: 75,
    pos: "n.",
    lessonLabel: "درس 75 — ورزش و تفریح"
  },
  {
    word: "vest",
    meaning: "پیراهن ورزشی بدون آستین",
    lesson: 75,
    pos: "n.",
    lessonLabel: "درس 75 — ورزش و تفریح"
  },
  {
    word: "shorts",
    meaning: "شلوارک",
    lesson: 75,
    pos: "n.",
    lessonLabel: "درس 75 — ورزش و تفریح"
  },
  {
    word: "running shoes",
    meaning: "کفش دویدن",
    lesson: 75,
    pos: "n.",
    lessonLabel: "درس 75 — ورزش و تفریح"
  },
  {
    word: "crash helmet",
    meaning: "کلاه ایمنی",
    lesson: 75,
    pos: "n.",
    lessonLabel: "درس 75 — ورزش و تفریح"
  },
  {
    word: "swimming costume (women)",
    meaning: "مایوی زنانه",
    lesson: 75,
    pos: "n.",
    lessonLabel: "درس 75 — ورزش و تفریح"
  },
  {
    word: "trunks (men)",
    meaning: "مایوی مردانه",
    lesson: 75,
    pos: "n.",
    lessonLabel: "درس 75 — ورزش و تفریح"
  },
  {
    word: "boxing",
    meaning: "مشت‌زنی",
    lesson: 75,
    pos: "n.",
    lessonLabel: "درس 75 — ورزش و تفریح"
  },
  {
    word: "ice hockey",
    meaning: "هاکی روی یخ",
    lesson: 75,
    pos: "n.",
    lessonLabel: "درس 75 — ورزش و تفریح"
  },
  {
    word: "skiing",
    meaning: "اسکی",
    lesson: 75,
    pos: "n.",
    lessonLabel: "درس 75 — ورزش و تفریح"
  },
  {
    word: "ring",
    meaning: "حلقه (محل مبارزه بوکس)",
    lesson: 75,
    pos: "n.",
    lessonLabel: "درس 75 — ورزش و تفریح"
  },
  {
    word: "rink",
    meaning: "پیست یخ",
    lesson: 75,
    pos: "n.",
    lessonLabel: "درس 75 — ورزش و تفریح"
  },
  {
    word: "ski slopes",
    meaning: "شیب‌های اسکی",
    lesson: 75,
    pos: "n.",
    lessonLabel: "درس 75 — ورزش و تفریح"
  },
  {
    word: "gloves",
    meaning: "دستکش",
    lesson: 75,
    pos: "n.",
    lessonLabel: "درس 75 — ورزش و تفریح"
  },
  {
    word: "boots",
    meaning: "چکمه",
    lesson: 75,
    pos: "n.",
    lessonLabel: "درس 75 — ورزش و تفریح"
  },
  {
    word: "sticks",
    meaning: "چوب (هاکی/اسکی)",
    lesson: 75,
    pos: "n.",
    lessonLabel: "درس 75 — ورزش و تفریح"
  },
  {
    word: "skates",
    meaning: "کفش‌های اسکیت/یخ‌نورد",
    lesson: 75,
    pos: "n.",
    lessonLabel: "درس 75 — ورزش و تفریح"
  },
  {
    word: "puck",
    meaning: "دیسک (توپ هاکی)",
    lesson: 75,
    pos: "n.",
    lessonLabel: "درس 75 — ورزش و تفریح"
  },
  {
    word: "skis",
    meaning: "اسکی‌ها",
    lesson: 75,
    pos: "n.",
    lessonLabel: "درس 75 — ورزش و تفریح"
  },
  {
    word: "ski suit",
    meaning: "لباس اسکی",
    lesson: 75,
    pos: "n.",
    lessonLabel: "درس 75 — ورزش و تفریح"
  },
  {
    word: "ski boots",
    meaning: "چکمه اسکی",
    lesson: 75,
    pos: "n.",
    lessonLabel: "درس 75 — ورزش و تفریح"
  },
  {
    word: "hiking",
    meaning: "پیاده‌روی در طبیعت",
    lesson: 75,
    pos: "n.",
    lessonLabel: "درس 75 — ورزش و تفریح"
  },
  {
    word: "camping",
    meaning: "چادرزنی، کمپ‌زدن",
    lesson: 75,
    pos: "n.",
    lessonLabel: "درس 75 — ورزش و تفریح"
  },
  {
    word: "rock climbing",
    meaning: "صخره‌نوردی",
    lesson: 75,
    pos: "n.",
    lessonLabel: "درس 75 — ورزش و تفریح"
  },
  {
    word: "jogging",
    meaning: "نرم دویدن",
    lesson: 75,
    pos: "n.",
    lessonLabel: "درس 75 — ورزش و تفریح"
  },
  {
    word: "keep fit",
    meaning: "تناسب اندام خود را حفظ کردن",
    lesson: 75,
    pos: "phr.",
    lessonLabel: "درس 75 — ورزش و تفریح"
  },
  {
    word: "do exercise",
    meaning: "ورزش کردن",
    lesson: 75,
    pos: "phr.",
    lessonLabel: "درس 75 — ورزش و تفریح"
  },
  {
    word: "play a game",
    meaning: "بازی کردن",
    lesson: 75,
    pos: "phr.",
    lessonLabel: "درس 75 — ورزش و تفریح"
  },
  {
    word: "do much sport",
    meaning: "ورزش زیاد انجام دادن",
    lesson: 75,
    pos: "phr.",
    lessonLabel: "درس 75 — ورزش و تفریح"
  },
  {
    word: "go skiing",
    meaning: "اسکی رفتن",
    lesson: 75,
    pos: "phr.",
    lessonLabel: "درس 75 — ورزش و تفریح"
  },
  {
    word: "play ice hockey",
    meaning: "هاکی روی یخ بازی کردن",
    lesson: 75,
    pos: "phr.",
    lessonLabel: "درس 75 — ورزش و تفریح"
  },
  {
    word: "go to the gym",
    meaning: "به باشگاه رفتن",
    lesson: 75,
    pos: "phr.",
    lessonLabel: "درس 75 — ورزش و تفریح"
  },
  {
    word: "do aerobics",
    meaning: "هوازی انجام دادن",
    lesson: 75,
    pos: "phr.",
    lessonLabel: "درس 75 — ورزش و تفریح"
  },
  {
    word: "weight training",
    meaning: "تمرین با وزنه",
    lesson: 75,
    pos: "n.",
    lessonLabel: "درس 75 — ورزش و تفریح"
  },
  {
    word: "join",
    meaning: "عضو شدن",
    lesson: 75,
    pos: "v.",
    lessonLabel: "درس 75 — ورزش و تفریح"
  },
  {
    word: "take up",
    meaning: "شروع کردن (سرگرمی/ورزش)",
    lesson: 75,
    pos: "phr. v.",
    lessonLabel: "درس 75 — ورزش و تفریح"
  },
  {
    word: "give up",
    meaning: "کنار گذاشتن، ترك کردن",
    lesson: 75,
    pos: "phr. v.",
    lessonLabel: "درس 75 — ورزش و تفریح"
  },
  {
    word: "be good for you",
    meaning: "برای سلامتی مفید بودن",
    lesson: 75,
    pos: "phr.",
    lessonLabel: "درس 75 — ورزش و تفریح"
  },
  {
    word: "get fit",
    meaning: "تناسب اندام پیدا کردن",
    lesson: 75,
    pos: "phr.",
    lessonLabel: "درس 75 — ورزش و تفریح"
  },
  {
    word: "support",
    meaning: "هواداری کردن",
    lesson: 75,
    pos: "v.",
    lessonLabel: "درس 75 — ورزش و تفریح"
  },
  {
    word: "take sport seriously",
    meaning: "ورزش را جدی گرفتن",
    lesson: 75,
    pos: "phr.",
    lessonLabel: "درس 75 — ورزش و تفریح"
  },
  {
    word: "competitive",
    meaning: "رقابتی، رقابت‌جو",
    lesson: 75,
    pos: "adj.",
    lessonLabel: "درس 75 — ورزش و تفریح"
  },
  {
    word: "the complete opposite",
    meaning: "کاملاً متضاد",
    lesson: 75,
    pos: "phr.",
    lessonLabel: "درس 75 — ورزش و تفریح"
  },
  {
    word: "play for fun",
    meaning: "برای تفریح بازی کردن",
    lesson: 75,
    pos: "phr.",
    lessonLabel: "درس 75 — ورزش و تفریح"
  },
  {
    word: "box",
    meaning: "باکس (طبقه جعبه‌ای سالن تئاتر)",
    lesson: 76,
    pos: "n.",
    lessonLabel: "درس 76 — سینما و تئاتر"
  },
  {
    word: "curtain",
    meaning: "پرده صحنه",
    lesson: 76,
    pos: "n.",
    lessonLabel: "درس 76 — سینما و تئاتر"
  },
  {
    word: "stage",
    meaning: "صحنه",
    lesson: 76,
    pos: "n.",
    lessonLabel: "درس 76 — سینما و تئاتر"
  },
  {
    word: "stalls",
    meaning: "صندلی‌های طبقه همکف سالن",
    lesson: 76,
    pos: "n.",
    lessonLabel: "درس 76 — سینما و تئاتر"
  },
  {
    word: "aisle",
    meaning: "راهرو بین صندلی‌ها",
    lesson: 76,
    pos: "n.",
    lessonLabel: "درس 76 — سینما و تئاتر"
  },
  {
    word: "row",
    meaning: "ردیف (صندلی‌ها)",
    lesson: 76,
    pos: "n.",
    lessonLabel: "درس 76 — سینما و تئاتر"
  },
  {
    word: "circle",
    meaning: "طبقه بالا (بالکن) سالن",
    lesson: 76,
    pos: "n.",
    lessonLabel: "درس 76 — سینما و تئاتر"
  },
  {
    word: "audience",
    meaning: "تماشاگران",
    lesson: 76,
    pos: "n.",
    lessonLabel: "درس 76 — سینما و تئاتر"
  },
  {
    word: "book",
    meaning: "رزرو کردن (بلیت)",
    lesson: 76,
    pos: "v.",
    lessonLabel: "درس 76 — سینما و تئاتر"
  },
  {
    word: "in advance",
    meaning: "از قبل، پیشاپیش",
    lesson: 76,
    pos: "phr.",
    lessonLabel: "درس 76 — سینما و تئاتر"
  },
  {
    word: "performance",
    meaning: "نمایش، اجرا",
    lesson: 76,
    pos: "n.",
    lessonLabel: "درس 76 — سینما و تئاتر"
  },
  {
    word: "screen",
    meaning: "پرده (سینما)، صفحه نمایش",
    lesson: 76,
    pos: "n.",
    lessonLabel: "درس 76 — سینما و تئاتر"
  },
  {
    word: "subtitles",
    meaning: "زیرنویس",
    lesson: 76,
    pos: "n.",
    lessonLabel: "درس 76 — سینما و تئاتر"
  },
  {
    word: "dubbed",
    meaning: "دوبله‌شده",
    lesson: 76,
    pos: "adj.",
    lessonLabel: "درس 76 — سینما و تئاتر"
  },
  {
    word: "director",
    meaning: "کارگردان",
    lesson: 76,
    pos: "n.",
    lessonLabel: "درس 76 — سینما و تئاتر"
  },
  {
    word: "actors",
    meaning: "بازیگران",
    lesson: 76,
    pos: "n.",
    lessonLabel: "درس 76 — سینما و تئاتر"
  },
  {
    word: "film star",
    meaning: "ستاره سینما",
    lesson: 76,
    pos: "n.",
    lessonLabel: "درس 76 — سینما و تئاتر"
  },
  {
    word: "war film",
    meaning: "فیلم جنگی",
    lesson: 76,
    pos: "n.",
    lessonLabel: "درس 76 — سینما و تئاتر"
  },
  {
    word: "action film",
    meaning: "فیلم اکشن",
    lesson: 76,
    pos: "n.",
    lessonLabel: "درس 76 — سینما و تئاتر"
  },
  {
    word: "romance",
    meaning: "فیلم عاشقانه",
    lesson: 76,
    pos: "n.",
    lessonLabel: "درس 76 — سینما و تئاتر"
  },
  {
    word: "horror film",
    meaning: "فیلم ترسناک",
    lesson: 76,
    pos: "n.",
    lessonLabel: "درس 76 — سینما و تئاتر"
  },
  {
    word: "thriller",
    meaning: "فیلم هیجانی/مهیج",
    lesson: 76,
    pos: "n.",
    lessonLabel: "درس 76 — سینما و تئاتر"
  },
  {
    word: "comedy",
    meaning: "کمدی (فیلم خنده‌دار)",
    lesson: 76,
    pos: "n.",
    lessonLabel: "درس 76 — سینما و تئاتر"
  },
  {
    word: "disaster movie",
    meaning: "فیلم فاجعه‌ای",
    lesson: 76,
    pos: "n.",
    lessonLabel: "درس 76 — سینما و تئاتر"
  },
  {
    word: "romantic comedy",
    meaning: "کمدی رمانتیک",
    lesson: 76,
    pos: "n.",
    lessonLabel: "درس 76 — سینما و تئاتر"
  },
  {
    word: "critic",
    meaning: "منتقد",
    lesson: 76,
    pos: "n.",
    lessonLabel: "درس 76 — سینما و تئاتر"
  },
  {
    word: "review",
    meaning: "نقد و بررسی",
    lesson: 76,
    pos: "n.",
    lessonLabel: "درس 76 — سینما و تئاتر"
  },
  {
    word: "brilliant/superb acting",
    meaning: "بازی فوق‌العاده",
    lesson: 76,
    pos: "phr.",
    lessonLabel: "درس 76 — سینما و تئاتر"
  },
  {
    word: "awful/dreadful film",
    meaning: "فیلم افتضاح/وحشتناک",
    lesson: 76,
    pos: "phr.",
    lessonLabel: "درس 76 — سینما و تئاتر"
  },
  {
    word: "very moving",
    meaning: "بسیار تأثیرگذار (احساسی)",
    lesson: 76,
    pos: "phr.",
    lessonLabel: "درس 76 — سینما و تئاتر"
  },
  {
    word: "slow film",
    meaning: "فیلم کسل‌کننده",
    lesson: 76,
    pos: "phr.",
    lessonLabel: "درس 76 — سینما و تئاتر"
  },
  {
    word: "gripping story",
    meaning: "داستان مهیج و جذاب",
    lesson: 76,
    pos: "phr.",
    lessonLabel: "درس 76 — سینما و تئاتر"
  },
  {
    word: "violent scenes",
    meaning: "صحنه‌های خشونت‌آمیز",
    lesson: 76,
    pos: "phr.",
    lessonLabel: "درس 76 — سینما و تئاتر"
  },
  {
    word: "good fun",
    meaning: "سرگرم‌کننده و خوش‌گذران (جدی نیست)",
    lesson: 76,
    pos: "phr.",
    lessonLabel: "درس 76 — سینما و تئاتر"
  },
  {
    word: "complex plot",
    meaning: "پیرنگ پیچیده",
    lesson: 76,
    pos: "phr.",
    lessonLabel: "درس 76 — سینما و تئاتر"
  },
  {
    word: "be set",
    meaning: "اتفاق افتادن (در زمان/مکان خاص)",
    lesson: 76,
    pos: "phr.",
    lessonLabel: "درس 76 — سینما و تئاتر"
  },
  {
    word: "about",
    meaning: "درباره (موضوع/داستان)",
    lesson: 76,
    pos: "phr.",
    lessonLabel: "درس 76 — سینما و تئاتر"
  },
  {
    word: "background",
    meaning: "پیشینه خانوادگی و شرایط",
    lesson: 76,
    pos: "n.",
    lessonLabel: "درس 76 — سینما و تئاتر"
  },
  {
    word: "fall in love",
    meaning: "عاشق شدن",
    lesson: 76,
    pos: "phr.",
    lessonLabel: "درس 76 — سینما و تئاتر"
  },
  {
    word: "run away",
    meaning: "فرار کردن",
    lesson: 76,
    pos: "phr.",
    lessonLabel: "درس 76 — سینما و تئاتر"
  },
  {
    word: "at first",
    meaning: "در ابتدا",
    lesson: 76,
    pos: "phr.",
    lessonLabel: "درس 76 — سینما و تئاتر"
  },
  {
    word: "things go wrong",
    meaning: "مشکلات پیش می‌آید",
    lesson: 76,
    pos: "phr.",
    lessonLabel: "درس 76 — سینما و تئاتر"
  },
  {
    word: "classical music",
    meaning: "موسیقی کلاسیک",
    lesson: 77,
    pos: "n.",
    lessonLabel: "درس 77 — موسیقی"
  },
  {
    word: "opera",
    meaning: "اپرا (نمایشی که واژه‌های آن خوانده می‌شود)",
    lesson: 77,
    pos: "n.",
    lessonLabel: "درس 77 — موسیقی"
  },
  {
    word: "rock and pop music",
    meaning: "موسیقی راک و پاپ",
    lesson: 77,
    pos: "n.",
    lessonLabel: "درس 77 — موسیقی"
  },
  {
    word: "jazz",
    meaning: "جاز",
    lesson: 77,
    pos: "n.",
    lessonLabel: "درس 77 — موسیقی"
  },
  {
    word: "punk",
    meaning: "پانک",
    lesson: 77,
    pos: "n.",
    lessonLabel: "درس 77 — موسیقی"
  },
  {
    word: "reggae",
    meaning: "رگی",
    lesson: 77,
    pos: "n.",
    lessonLabel: "درس 77 — موسیقی"
  },
  {
    word: "rap",
    meaning: "رپ",
    lesson: 77,
    pos: "n.",
    lessonLabel: "درس 77 — موسیقی"
  },
  {
    word: "garage",
    meaning: "گاراژ (نوعی موسیقی)",
    lesson: 77,
    pos: "n.",
    lessonLabel: "درس 77 — موسیقی"
  },
  {
    word: "hip-hop",
    meaning: "هیپ‌هاپ",
    lesson: 77,
    pos: "n.",
    lessonLabel: "درس 77 — موسیقی"
  },
  {
    word: "cello",
    meaning: "ویلنسل",
    lesson: 77,
    pos: "n.",
    lessonLabel: "درس 77 — موسیقی"
  },
  {
    word: "cellist",
    meaning: "ویلنسل‌نواز",
    lesson: 77,
    pos: "n.",
    lessonLabel: "درس 77 — موسیقی"
  },
  {
    word: "piano",
    meaning: "پیانو",
    lesson: 77,
    pos: "n.",
    lessonLabel: "درس 77 — موسیقی"
  },
  {
    word: "pianist",
    meaning: "پیانیست، پیانونواز",
    lesson: 77,
    pos: "n.",
    lessonLabel: "درس 77 — موسیقی"
  },
  {
    word: "violin",
    meaning: "ویلن",
    lesson: 77,
    pos: "n.",
    lessonLabel: "درس 77 — موسیقی"
  },
  {
    word: "violinist",
    meaning: "ویلن‌نواز",
    lesson: 77,
    pos: "n.",
    lessonLabel: "درس 77 — موسیقی"
  },
  {
    word: "guitar",
    meaning: "گیتار",
    lesson: 77,
    pos: "n.",
    lessonLabel: "درس 77 — موسیقی"
  },
  {
    word: "guitarist",
    meaning: "گیتاریست، گیتارنواز",
    lesson: 77,
    pos: "n.",
    lessonLabel: "درس 77 — موسیقی"
  },
  {
    word: "saxophone",
    meaning: "ساکسیفون",
    lesson: 77,
    pos: "n.",
    lessonLabel: "درس 77 — موسیقی"
  },
  {
    word: "saxophonist",
    meaning: "ساکسیفون‌نواز",
    lesson: 77,
    pos: "n.",
    lessonLabel: "درس 77 — موسیقی"
  },
  {
    word: "drums",
    meaning: "درامز، طبل",
    lesson: 77,
    pos: "n.",
    lessonLabel: "درس 77 — موسیقی"
  },
  {
    word: "drummer",
    meaning: "درامر، نوازندهٔ طبل",
    lesson: 77,
    pos: "n.",
    lessonLabel: "درس 77 — موسیقی"
  },
  {
    word: "performed",
    meaning: "اجرا شد، نواخته/اجرای عمومی شد",
    lesson: 77,
    pos: "v.",
    lessonLabel: "درس 77 — موسیقی"
  },
  {
    word: "group/band",
    meaning: "گروه موسیقی",
    lesson: 77,
    pos: "n.",
    lessonLabel: "درس 77 — موسیقی"
  },
  {
    word: "lead singer",
    meaning: "خوانندهٔ اصلی",
    lesson: 77,
    pos: "n.",
    lessonLabel: "درس 77 — موسیقی"
  },
  {
    word: "lead guitarist",
    meaning: "گیتاریست اصلی",
    lesson: 77,
    pos: "n.",
    lessonLabel: "درس 77 — موسیقی"
  },
  {
    word: "bass guitarist",
    meaning: "گیتاریست باس",
    lesson: 77,
    pos: "n.",
    lessonLabel: "درس 77 — موسیقی"
  },
  {
    word: "solo artists",
    meaning: "هنرمندان تک‌نواز/تک‌خوان",
    lesson: 77,
    pos: "n.",
    lessonLabel: "درس 77 — موسیقی"
  },
  {
    word: "backing group",
    meaning: "گروه پشتیبان",
    lesson: 77,
    pos: "n.",
    lessonLabel: "درس 77 — موسیقی"
  },
  {
    word: "songwriters",
    meaning: "ترانه‌سراها/آهنگ‌سازها",
    lesson: 77,
    pos: "n.",
    lessonLabel: "درس 77 — موسیقی"
  },
  {
    word: "composer",
    meaning: "آهنگساز",
    lesson: 77,
    pos: "n.",
    lessonLabel: "درس 77 — موسیقی"
  },
  {
    word: "orchestra",
    meaning: "ارکستر (گروه بزرگ نوازندگان)",
    lesson: 77,
    pos: "n.",
    lessonLabel: "درس 77 — موسیقی"
  },
  {
    word: "conductor",
    meaning: "رهبر ارکستر",
    lesson: 77,
    pos: "n.",
    lessonLabel: "درس 77 — موسیقی"
  },
  {
    word: "choir",
    meaning: "گروه کر",
    lesson: 77,
    pos: "n.",
    lessonLabel: "درس 77 — موسیقی"
  },
  {
    word: "hit record",
    meaning: "آهنگ محبوب و پرفروش",
    lesson: 77,
    pos: "n.",
    lessonLabel: "درس 77 — موسیقی"
  },
  {
    word: "hit single",
    meaning: "تک‌آهنگ پرفروش",
    lesson: 77,
    pos: "n.",
    lessonLabel: "درس 77 — موسیقی"
  },
  {
    word: "single",
    meaning: "تک‌آهنگ",
    lesson: 77,
    pos: "n.",
    lessonLabel: "درس 77 — موسیقی"
  },
  {
    word: "produce albums",
    meaning: "آلبوم تولید کردن",
    lesson: 77,
    pos: "phr.",
    lessonLabel: "درس 77 — موسیقی"
  },
  {
    word: "album",
    meaning: "آلبوم",
    lesson: 77,
    pos: "n.",
    lessonLabel: "درس 77 — موسیقی"
  },
  {
    word: "is out",
    meaning: "منتشر شده/به بازار می‌آید",
    lesson: 77,
    pos: "phr.",
    lessonLabel: "درس 77 — موسیقی"
  },
  {
    word: "release a new record",
    meaning: "انتشار یک صفحهٔ جدید",
    lesson: 77,
    pos: "phr.",
    lessonLabel: "درس 77 — موسیقی"
  },
  {
    word: "the latest album",
    meaning: "جدیدترین آلبوم",
    lesson: 77,
    pos: "phr.",
    lessonLabel: "درس 77 — موسیقی"
  },
  {
    word: "number one",
    meaning: "رتبهٔ اول، محبوب‌ترین",
    lesson: 77,
    pos: "phr.",
    lessonLabel: "درس 77 — موسیقی"
  },
  {
    word: "favourite track",
    meaning: "قطعهٔ (آهنگ) مورد علاقه",
    lesson: 77,
    pos: "phr.",
    lessonLabel: "درس 77 — موسیقی"
  },
  {
    word: "taste in music",
    meaning: "سلیقهٔ موسیقی",
    lesson: 77,
    pos: "phr.",
    lessonLabel: "درس 77 — موسیقی"
  },
  {
    word: "daily",
    meaning: "روزانه (روزنامه‌ای که هر روز منتشر می‌شود)",
    lesson: 78,
    pos: "adj.",
    lessonLabel: "درس 78 — روزنامه‌ها"
  },
  {
    word: "come out / published",
    meaning: "منتشر شدن",
    lesson: 78,
    pos: "phr.",
    lessonLabel: "درس 78 — روزنامه‌ها"
  },
  {
    word: "national",
    meaning: "ملی",
    lesson: 78,
    pos: "adj.",
    lessonLabel: "درس 78 — روزنامه‌ها"
  },
  {
    word: "local",
    meaning: "محلی",
    lesson: 78,
    pos: "adj.",
    lessonLabel: "درس 78 — روزنامه‌ها"
  },
  {
    word: "weekly",
    meaning: "هفته‌نامه (هفته‌ای یک بار منتشر می‌شود)",
    lesson: 78,
    pos: "adj.",
    lessonLabel: "درس 78 — روزنامه‌ها"
  },
  {
    word: "monthly",
    meaning: "ماه‌نامه (ماهی یک بار منتشر می‌شود)",
    lesson: 78,
    pos: "adj.",
    lessonLabel: "درس 78 — روزنامه‌ها"
  },
  {
    word: "tabloid",
    meaning: "تبلوید (روزنامه‌ی کوچک‌تر در اندازه)",
    lesson: 78,
    pos: "n.",
    lessonLabel: "درس 78 — روزنامه‌ها"
  },
  {
    word: "popular press",
    meaning: "مطبوعات عامه‌پسند (مقالات کوتاه با تصاویر زیاد)",
    lesson: 78,
    pos: "phr.",
    lessonLabel: "درس 78 — روزنامه‌ها"
  },
  {
    word: "circulation",
    meaning: "شمارگان (تعداد خوانندگان)",
    lesson: 78,
    pos: "n.",
    lessonLabel: "درس 78 — روزنامه‌ها"
  },
  {
    word: "the press",
    meaning: "مطبوعات",
    lesson: 78,
    pos: "phr.",
    lessonLabel: "درس 78 — روزنامه‌ها"
  },
  {
    word: "reports",
    meaning: "گزارش‌ها (نوشته درباره‌ی خبرها)",
    lesson: 78,
    pos: "n.",
    lessonLabel: "درس 78 — روزنامه‌ها"
  },
  {
    word: "report",
    meaning: "گزارش",
    lesson: 78,
    pos: "n.",
    lessonLabel: "درس 78 — روزنامه‌ها"
  },
  {
    word: "articles",
    meaning: "مقاله‌ها (نوشته درباره‌ی موضوع مهم)",
    lesson: 78,
    pos: "n.",
    lessonLabel: "درس 78 — روزنامه‌ها"
  },
  {
    word: "article",
    meaning: "مقاله",
    lesson: 78,
    pos: "n.",
    lessonLabel: "درس 78 — روزنامه‌ها"
  },
  {
    word: "headlines",
    meaning: "تیترها (عنوان با حروف بزرگ بالای گزارش/مقاله)",
    lesson: 78,
    pos: "n.",
    lessonLabel: "درس 78 — روزنامه‌ها"
  },
  {
    word: "front-page headline",
    meaning: "تیتر صفحه‌ی اول",
    lesson: 78,
    pos: "phr.",
    lessonLabel: "درس 78 — روزنامه‌ها"
  },
  {
    word: "reviews",
    meaning: "نقد و بررسی‌ها (مقاله‌ای که نظر می‌دهد درباره‌ی فیلم و کتاب جدید)",
    lesson: 78,
    pos: "n.",
    lessonLabel: "درس 78 — روزنامه‌ها"
  },
  {
    word: "review",
    meaning: "نقد و بررسی",
    lesson: 78,
    pos: "n.",
    lessonLabel: "درس 78 — روزنامه‌ها"
  },
  {
    word: "adverts",
    meaning: "آگهی‌ها (کلمات و تصاویر درباره‌ی محصول برای تشویق به خرید)",
    lesson: 78,
    pos: "n.",
    lessonLabel: "درس 78 — روزنامه‌ها"
  },
  {
    word: "ad",
    meaning: "آگهی",
    lesson: 78,
    pos: "n.",
    lessonLabel: "درس 78 — روزنامه‌ها"
  },
  {
    word: "editor",
    meaning: "سردبیر (مسئول تولید روزانه)",
    lesson: 78,
    pos: "n.",
    lessonLabel: "درس 78 — روزنامه‌ها"
  },
  {
    word: "reporters/journalists",
    meaning: "خبرنگاران/روزنامه‌نگاران (افرادی که خبر گزارش می‌کنند و مقاله می‌نویسند)",
    lesson: 78,
    pos: "n.",
    lessonLabel: "درس 78 — روزنامه‌ها"
  },
  {
    word: "photographers",
    meaning: "عکاسان (افرادی که عکس‌های روزنامه را می‌گیرند)",
    lesson: 78,
    pos: "n.",
    lessonLabel: "درس 78 — روزنامه‌ها"
  },
  {
    word: "row",
    meaning: "بحث و دعوا",
    lesson: 78,
    pos: "n.",
    lessonLabel: "درس 78 — روزنامه‌ها"
  },
  {
    word: "back",
    meaning: "حمایت کردن",
    lesson: 78,
    pos: "v.",
    lessonLabel: "درس 78 — روزنامه‌ها"
  },
  {
    word: "quit",
    meaning: "استعفا دادن/ترک کردن شغل",
    lesson: 78,
    pos: "v.",
    lessonLabel: "درس 78 — روزنامه‌ها"
  },
  {
    word: "hit",
    meaning: "اثر بد گذاشتن بر",
    lesson: 78,
    pos: "v.",
    lessonLabel: "درس 78 — روزنامه‌ها"
  },
  {
    word: "bid",
    meaning: "تلاش/کوشش",
    lesson: 78,
    pos: "n.",
    lessonLabel: "درس 78 — روزنامه‌ها"
  },
  {
    word: "talks",
    meaning: "مذاکرات/گفت‌وگوها",
    lesson: 78,
    pos: "n.",
    lessonLabel: "درس 78 — روزنامه‌ها"
  },
  {
    word: "cut",
    meaning: "کاهش دادن",
    lesson: 78,
    pos: "v.",
    lessonLabel: "درس 78 — روزنامه‌ها"
  },
  {
    word: "key",
    meaning: "بسیار مهم/کلیدی",
    lesson: 78,
    pos: "adj.",
    lessonLabel: "درس 78 — روزنامه‌ها"
  },
  {
    word: "It said in ... that ...",
    meaning: "در (روزنامه)... نوشته بود که...",
    lesson: 78,
    pos: "phr.",
    lessonLabel: "درس 78 — روزنامه‌ها"
  },
  {
    word: "According to ...",
    meaning: "طبق (روزنامه).../ به گفته‌ی...",
    lesson: 78,
    pos: "phr.",
    lessonLabel: "درس 78 — روزنامه‌ها"
  },
  {
    word: "television / telly / TV",
    meaning: "تلویزیون",
    lesson: 79,
    lessonLabel: "درس 79 — تلویزیون"
  },
  {
    word: "remote control",
    meaning: "کنترل از راه دور",
    lesson: 79,
    pos: "n.",
    lessonLabel: "درس 79 — تلویزیون"
  },
  {
    word: "plug it in",
    meaning: "دوشاخه‌اش را به پریز بزن",
    lesson: 79,
    pos: "phr.",
    lessonLabel: "درس 79 — تلویزیون"
  },
  {
    word: "turn it on",
    meaning: "روشنش کن",
    lesson: 79,
    pos: "phr.",
    lessonLabel: "درس 79 — تلویزیون"
  },
  {
    word: "turn it off",
    meaning: "خاموشش کن",
    lesson: 79,
    pos: "phr.",
    lessonLabel: "درس 79 — تلویزیون"
  },
  {
    word: "turn it up",
    meaning: "صدایش را بلندتر کن",
    lesson: 79,
    pos: "phr.",
    lessonLabel: "درس 79 — تلویزیون"
  },
  {
    word: "turn it down",
    meaning: "صدایش را کمتر کن",
    lesson: 79,
    pos: "phr.",
    lessonLabel: "درس 79 — تلویزیون"
  },
  {
    word: "turn over",
    meaning: "کانال را عوض کن",
    lesson: 79,
    pos: "phr.",
    lessonLabel: "درس 79 — تلویزیون"
  },
  {
    word: "channel",
    meaning: "کانال",
    lesson: 79,
    pos: "n.",
    lessonLabel: "درس 79 — تلویزیون"
  },
  {
    word: "switch on",
    meaning: "روشن کردن",
    lesson: 79,
    pos: "phr.",
    lessonLabel: "درس 79 — تلویزیون"
  },
  {
    word: "switch off",
    meaning: "خاموش کردن",
    lesson: 79,
    pos: "phr.",
    lessonLabel: "درس 79 — تلویزیون"
  },
  {
    word: "switch over",
    meaning: "عوض کردن کانال",
    lesson: 79,
    pos: "phr.",
    lessonLabel: "درس 79 — تلویزیون"
  },
  {
    word: "soap opera",
    meaning: "سریال (آمیزه‌ای/پرسری)",
    lesson: 79,
    pos: "n.",
    lessonLabel: "درس 79 — تلویزیون"
  },
  {
    word: "quiz show",
    meaning: "مسابقه تلویزیونی",
    lesson: 79,
    pos: "n.",
    lessonLabel: "درس 79 — تلویزیون"
  },
  {
    word: "game show",
    meaning: "برنامه بازی و مسابقه",
    lesson: 79,
    pos: "n.",
    lessonLabel: "درس 79 — تلویزیون"
  },
  {
    word: "contestant",
    meaning: "مسابقه‌دهنده",
    lesson: 79,
    pos: "n.",
    lessonLabel: "درس 79 — تلویزیون"
  },
  {
    word: "prize",
    meaning: "جایزه",
    lesson: 79,
    pos: "n.",
    lessonLabel: "درس 79 — تلویزیون"
  },
  {
    word: "chat show",
    meaning: "برنامه گفتگو محور",
    lesson: 79,
    pos: "n.",
    lessonLabel: "درس 79 — تلویزیون"
  },
  {
    word: "presenter",
    meaning: "مجری",
    lesson: 79,
    pos: "n.",
    lessonLabel: "درس 79 — تلویزیون"
  },
  {
    word: "documentary",
    meaning: "فیلم مستند",
    lesson: 79,
    pos: "n.",
    lessonLabel: "درس 79 — تلویزیون"
  },
  {
    word: "series",
    meaning: "سریال/مجموعه برنامه‌ها",
    lesson: 79,
    pos: "n.",
    lessonLabel: "درس 79 — تلویزیون"
  },
  {
    word: "comedy series",
    meaning: "سریال کمدی",
    lesson: 79,
    pos: "n.",
    lessonLabel: "درس 79 — تلویزیون"
  },
  {
    word: "drama series",
    meaning: "سریال درام",
    lesson: 79,
    pos: "n.",
    lessonLabel: "درس 79 — تلویزیون"
  },
  {
    word: "current affairs",
    meaning: "برنامه‌های سیاسی-اجتماعی (اخبار روز)",
    lesson: 79,
    pos: "n.",
    lessonLabel: "درس 79 — تلویزیون"
  },
  {
    word: "current",
    meaning: "اکنونی/جاری",
    lesson: 79,
    pos: "adj.",
    lessonLabel: "درس 79 — تلویزیون"
  },
  {
    word: "stations",
    meaning: "ایستگاه‌ها (شبکه‌ها)",
    lesson: 79,
    pos: "n.",
    lessonLabel: "درس 79 — تلویزیون"
  },
  {
    word: "satellite dish",
    meaning: "دیش ماهواره",
    lesson: 79,
    pos: "n.",
    lessonLabel: "درس 79 — تلویزیون"
  },
  {
    word: "satellite TV",
    meaning: "تلویزیون ماهواره‌ای",
    lesson: 79,
    pos: "n.",
    lessonLabel: "درس 79 — تلویزیون"
  },
  {
    word: "cable TV",
    meaning: "تلویزیون کابلی",
    lesson: 79,
    pos: "n.",
    lessonLabel: "درس 79 — تلویزیون"
  },
  {
    word: "What's on TV tonight?",
    meaning: "امشب چه برنامه‌ای روی آنتن است؟",
    lesson: 79,
    pos: "phr.",
    lessonLabel: "درس 79 — تلویزیون"
  },
  {
    word: "Is there anything on TV tonight?",
    meaning: "امشب برنامه‌ای روی آنتن هست؟",
    lesson: 79,
    pos: "phr.",
    lessonLabel: "درس 79 — تلویزیون"
  },
  {
    word: "What time's the film on?",
    meaning: "فیلم چه ساعتی است؟",
    lesson: 79,
    pos: "phr.",
    lessonLabel: "درس 79 — تلویزیون"
  },
  {
    word: "television commercials",
    meaning: "تبلیغات تلویزیونی",
    lesson: 79,
    pos: "n.",
    lessonLabel: "درس 79 — تلویزیون"
  },
  {
    word: "live",
    meaning: "مستقیم/زنده",
    lesson: 79,
    pos: "adv.",
    lessonLabel: "درس 79 — تلویزیون"
  },
  {
    word: "recorded highlights",
    meaning: "خلاصه بازی ضبط‌شده",
    lesson: 79,
    pos: "n.",
    lessonLabel: "درس 79 — تلویزیون"
  },
  {
    word: "repeat",
    meaning: "پخش تکراری",
    lesson: 79,
    pos: "n.",
    lessonLabel: "درس 79 — تلویزیون"
  },
  {
    word: "favourite programme",
    meaning: "برنامه محبوب",
    lesson: 79,
    pos: "n.",
    lessonLabel: "درس 79 — تلویزیون"
  },
  {
    word: "mobile phone",
    meaning: "گوشی همراه",
    lesson: 80,
    pos: "n.",
    lessonLabel: "درس 80 — تلفن"
  },
  {
    word: "telephone directory",
    meaning: "دفترچه تلفن",
    lesson: 80,
    pos: "n.",
    lessonLabel: "درس 80 — تلفن"
  },
  {
    word: "answerphone",
    meaning: "پیام‌گیر تلفن",
    lesson: 80,
    pos: "n.",
    lessonLabel: "درس 80 — تلفن"
  },
  {
    word: "phone box",
    meaning: "کابین تلفن عمومی",
    lesson: 80,
    pos: "n.",
    lessonLabel: "درس 80 — تلفن"
  },
  {
    word: "phone number",
    meaning: "شماره تلفن",
    lesson: 80,
    pos: "n.",
    lessonLabel: "درس 80 — تلفن"
  },
  {
    word: "phone card",
    meaning: "کارت تلفن",
    lesson: 80,
    pos: "n.",
    lessonLabel: "درس 80 — تلفن"
  },
  {
    word: "put (you) through",
    meaning: "وصل کردن (تماس)",
    lesson: 80,
    pos: "phr.",
    lessonLabel: "درس 80 — تلفن"
  },
  {
    word: "Speaking",
    meaning: "«بفرمایید، خودم هستم»",
    lesson: 80,
    pos: "phr.",
    lessonLabel: "درس 80 — تلفن"
  },
  {
    word: "engaged",
    meaning: "اشغال (خط تلفن)",
    lesson: 80,
    pos: "adj.",
    lessonLabel: "درس 80 — تلفن"
  },
  {
    word: "on the phone",
    meaning: "در حال صحبت با تلفن",
    lesson: 80,
    pos: "phr.",
    lessonLabel: "درس 80 — تلفن"
  },
  {
    word: "I think you've got the wrong number",
    meaning: "فکر کنم شماره‌تان اشتباه است",
    lesson: 80,
    pos: "phr.",
    lessonLabel: "درس 80 — تلفن"
  },
  {
    word: "dial",
    meaning: "گوشی شماره‌گیری کردن",
    lesson: 80,
    pos: "v.",
    lessonLabel: "درس 80 — تلفن"
  },
  {
    word: "get through (to)",
    meaning: "وصل شدن (به)",
    lesson: 80,
    pos: "phr.",
    lessonLabel: "درس 80 — تلفن"
  },
  {
    word: "out",
    meaning: "بیرون (خانه نیست)",
    lesson: 80,
    pos: "adj.",
    lessonLabel: "درس 80 — تلفن"
  },
  {
    word: "won't be back",
    meaning: "برنمی‌گردد",
    lesson: 80,
    pos: "phr.",
    lessonLabel: "درس 80 — تلفن"
  },
  {
    word: "leave a message",
    meaning: "پیام گذاشتن",
    lesson: 80,
    pos: "phr.",
    lessonLabel: "درس 80 — تلفن"
  },
  {
    word: "gets back",
    meaning: "برمی‌گردد",
    lesson: 80,
    pos: "phr.",
    lessonLabel: "درس 80 — تلفن"
  },
  {
    word: "I'll tell her you called",
    meaning: "به او می‌گویم که تماس گرفتید",
    lesson: 80,
    pos: "phr.",
    lessonLabel: "درس 80 — تلفن"
  },
  {
    word: "phone (you) back",
    meaning: "تماس را جواب دادن / دوباره زنگ زدن",
    lesson: 80,
    pos: "phr.",
    lessonLabel: "درس 80 — تلفن"
  },
  {
    word: "I'm just returning your call",
    meaning: "دارم تماس‌تان را جواب می‌دهم",
    lesson: 80,
    pos: "phr.",
    lessonLabel: "درس 80 — تلفن"
  },
  {
    word: "give (you) a ring",
    meaning: "به (تو) زنگ بزنم",
    lesson: 80,
    pos: "phr.",
    lessonLabel: "درس 80 — تلفن"
  },
  {
    word: "(dialling) code",
    meaning: "کد (پیش‌شماره) تلفن",
    lesson: 80,
    pos: "n.",
    lessonLabel: "درس 80 — تلفن"
  },
  {
    word: "local calls",
    meaning: "تماس‌های محلی",
    lesson: 80,
    pos: "n.",
    lessonLabel: "درس 80 — تلفن"
  },
  {
    word: "international calls",
    meaning: "تماس‌های بین‌المللی",
    lesson: 80,
    pos: "n.",
    lessonLabel: "درس 80 — تلفن"
  },
  {
    word: "text messages",
    meaning: "پیامک‌ها",
    lesson: 80,
    pos: "n.",
    lessonLabel: "درس 80 — تلفن"
  }
];

export const VOCAB_PART_4: Row[] = ROWS;
