// واژگان داستان‌های Introductory Steps to Understanding — کلیدواژه‌های هر داستان با معنی فارسی
// lesson = شمارهٔ داستان (۱ تا 27)
import type { VocabEntry, VocabWord } from "../types";

type Row = Omit<VocabWord, "lesson"> & { lesson: number; lessonLabel: string };

const ROWS: Row[] = [
  {
    "word": "holiday",
    "meaning": "مرخصی",
    "lesson": 1,
    "pos": "n.",
    "lessonLabel": "داستان ۱"
  },
  {
    "word": "mountains",
    "meaning": "کوهستان‌ها",
    "lesson": 1,
    "pos": "n.",
    "lessonLabel": "داستان ۱"
  },
  {
    "word": "by train",
    "meaning": "با قطار",
    "lesson": 1,
    "pos": "phr.",
    "lessonLabel": "داستان ۱"
  },
  {
    "word": "best clothes",
    "meaning": "بهترین لباس‌ها",
    "lesson": 1,
    "pos": "phr.",
    "lessonLabel": "داستان ۱"
  },
  {
    "word": "carriage",
    "meaning": "واگن",
    "lesson": 1,
    "pos": "n.",
    "lessonLabel": "داستان ۱"
  },
  {
    "word": "hat",
    "meaning": "کلاه",
    "lesson": 1,
    "pos": "n.",
    "lessonLabel": "داستان ۱"
  },
  {
    "word": "threw",
    "meaning": "انداخت",
    "lesson": 1,
    "pos": "v.",
    "lessonLabel": "داستان ۱"
  },
  {
    "word": "laughed",
    "meaning": "خندید",
    "lesson": 1,
    "pos": "v.",
    "lessonLabel": "داستان ۱"
  },
  {
    "word": "address",
    "meaning": "آدرس",
    "lesson": 1,
    "pos": "n.",
    "lessonLabel": "داستان ۱"
  },
  {
    "word": "find",
    "meaning": "پیدا کردن",
    "lesson": 1,
    "pos": "v.",
    "lessonLabel": "داستان ۱"
  },
  {
    "word": "send",
    "meaning": "فرستادن",
    "lesson": 1,
    "pos": "v.",
    "lessonLabel": "داستان ۱"
  },
  {
    "word": "quickly",
    "meaning": "به سرعت",
    "lesson": 1,
    "pos": "adv.",
    "lessonLabel": "داستان ۱"
  },
  {
    "word": "old lady",
    "meaning": "پیرزن",
    "lesson": 2,
    "pos": "n.",
    "lessonLabel": "داستان ۲"
  },
  {
    "word": "shopping",
    "meaning": "خرید",
    "lesson": 2,
    "pos": "n.",
    "lessonLabel": "داستان ۲"
  },
  {
    "word": "bank",
    "meaning": "بانک",
    "lesson": 2,
    "pos": "n.",
    "lessonLabel": "داستان ۲"
  },
  {
    "word": "keys",
    "meaning": "کلیدها",
    "lesson": 2,
    "pos": "n.",
    "lessonLabel": "داستان ۲"
  },
  {
    "word": "lock",
    "meaning": "قفل",
    "lesson": 2,
    "pos": "n.",
    "lessonLabel": "داستان ۲"
  },
  {
    "word": "gun",
    "meaning": "تفنگ",
    "lesson": 2,
    "pos": "n.",
    "lessonLabel": "داستان ۲"
  },
  {
    "word": "clerk",
    "meaning": "کارمند",
    "lesson": 2,
    "pos": "n.",
    "lessonLabel": "داستان ۲"
  },
  {
    "word": "stupid",
    "meaning": "احمق",
    "lesson": 2,
    "pos": "adj.",
    "lessonLabel": "داستان ۲"
  },
  {
    "word": "steal",
    "meaning": "دزدیدن",
    "lesson": 2,
    "pos": "v.",
    "lessonLabel": "داستان ۲"
  },
  {
    "word": "drove away",
    "meaning": "فرار کردن با ماشین",
    "lesson": 2,
    "pos": "phr.",
    "lessonLabel": "داستان ۲"
  },
  {
    "word": "without any money",
    "meaning": "بدون هیچ پولی",
    "lesson": 2,
    "pos": "phr.",
    "lessonLabel": "داستان ۲"
  },
  {
    "word": "followed",
    "meaning": "دنبال کردن",
    "lesson": 2,
    "pos": "v.",
    "lessonLabel": "داستان ۲"
  },
  {
    "word": "demanded",
    "meaning": "خواستن",
    "lesson": 2,
    "pos": "v.",
    "lessonLabel": "داستان ۲"
  },
  {
    "word": "put the keys in his hand",
    "meaning": "کلیدها را در دستش گذاشتن",
    "lesson": 2,
    "pos": "phr.",
    "lessonLabel": "داستان ۲"
  },
  {
    "word": "English girl",
    "meaning": "دختر انگلیسی",
    "lesson": 3,
    "pos": "n.",
    "lessonLabel": "داستان ۳"
  },
  {
    "word": "lived in Rome",
    "meaning": "در زندگی می‌کرد",
    "lesson": 3,
    "pos": "phr.",
    "lessonLabel": "داستان ۳"
  },
  {
    "word": "begin going to school",
    "meaning": "شروع به رفتن به مدرسه کردن",
    "lesson": 3,
    "pos": "phr.",
    "lessonLabel": "داستان ۳"
  },
  {
    "word": "nice school",
    "meaning": "مدرسه خوب",
    "lesson": 3,
    "pos": "n.",
    "lessonLabel": "داستان ۳"
  },
  {
    "word": "English school",
    "meaning": "مدرسه انگلیسی",
    "lesson": 3,
    "pos": "n.",
    "lessonLabel": "داستان ۳"
  },
  {
    "word": "enjoyed her lessons",
    "meaning": "از درس‌هایش لذت برد",
    "lesson": 3,
    "pos": "phr.",
    "lessonLabel": "داستان ۳"
  },
  {
    "word": "took her to school",
    "meaning": "او را به مدرسه برد",
    "lesson": 3,
    "pos": "phr.",
    "lessonLabel": "داستان ۳"
  },
  {
    "word": "brought her home",
    "meaning": "او را به خانه آورد",
    "lesson": 3,
    "pos": "phr.",
    "lessonLabel": "داستان ۳"
  },
  {
    "word": "ran out of her class",
    "meaning": "از کلاسش دوید بیرون",
    "lesson": 3,
    "pos": "phr.",
    "lessonLabel": "داستان ۳"
  },
  {
    "word": "new girl",
    "meaning": "دختر جدید",
    "lesson": 3,
    "pos": "n.",
    "lessonLabel": "داستان ۳"
  },
  {
    "word": "German",
    "meaning": "آلمانی",
    "lesson": 3,
    "pos": "adj.",
    "lessonLabel": "داستان ۳"
  },
  {
    "word": "laughs in English",
    "meaning": "به زبان انگلیسی می‌خندد",
    "lesson": 3,
    "pos": "phr.",
    "lessonLabel": "داستان ۳"
  },
  {
    "word": "happily",
    "meaning": "با خوشحالی",
    "lesson": 3,
    "pos": "adv.",
    "lessonLabel": "داستان ۳"
  },
  {
    "word": "last year",
    "meaning": "سال گذشته",
    "lesson": 3,
    "pos": "phr.",
    "lessonLabel": "داستان ۳"
  },
  {
    "word": "last Monday",
    "meaning": "دوشنبه گذشته",
    "lesson": 3,
    "pos": "phr.",
    "lessonLabel": "داستان ۳"
  },
  {
    "word": "did not have",
    "meaning": "نداشتن",
    "lesson": 4,
    "pos": "phr.",
    "lessonLabel": "داستان ۴"
  },
  {
    "word": "husband",
    "meaning": "شوهر",
    "lesson": 4,
    "pos": "n.",
    "lessonLabel": "داستان ۴"
  },
  {
    "word": "lazy",
    "meaning": "تنبل",
    "lesson": 4,
    "pos": "adj.",
    "lessonLabel": "داستان ۴"
  },
  {
    "word": "cut the grass",
    "meaning": "چمن زدن",
    "lesson": 4,
    "pos": "phr.",
    "lessonLabel": "داستان ۴"
  },
  {
    "word": "garden",
    "meaning": "باغ",
    "lesson": 4,
    "pos": "n.",
    "lessonLabel": "داستان ۴"
  },
  {
    "word": "magazine",
    "meaning": "مجله",
    "lesson": 4,
    "pos": "n.",
    "lessonLabel": "داستان ۴"
  },
  {
    "word": "lawn-mower",
    "meaning": "ماشین چمن‌زنی",
    "lesson": 4,
    "pos": "n.",
    "lessonLabel": "داستان ۴"
  },
  {
    "word": "seat",
    "meaning": "صندلی",
    "lesson": 4,
    "pos": "n.",
    "lessonLabel": "داستان ۴"
  },
  {
    "word": "driving",
    "meaning": "رانندگی کردن",
    "lesson": 4,
    "pos": "v.",
    "lessonLabel": "داستان ۴"
  },
  {
    "word": "every week",
    "meaning": "هر هفته",
    "lesson": 4,
    "pos": "phr.",
    "lessonLabel": "داستان ۴"
  },
  {
    "word": "strong",
    "meaning": "قوی",
    "lesson": 4,
    "pos": "adj.",
    "lessonLabel": "داستان ۴"
  },
  {
    "word": "picture",
    "meaning": "تصویر",
    "lesson": 4,
    "pos": "n.",
    "lessonLabel": "داستان ۴"
  },
  {
    "word": "beautiful",
    "meaning": "زیبا",
    "lesson": 4,
    "pos": "adj.",
    "lessonLabel": "داستان ۴"
  },
  {
    "word": "sitting",
    "meaning": "نشسته",
    "lesson": 4,
    "pos": "v.",
    "lessonLabel": "داستان ۴"
  },
  {
    "word": "feet",
    "meaning": "پاها",
    "lesson": 5,
    "pos": "n.",
    "lessonLabel": "داستان ۵"
  },
  {
    "word": "boots and shoes",
    "meaning": "کفش و چکمه",
    "lesson": 5,
    "pos": "n.",
    "lessonLabel": "داستان ۵"
  },
  {
    "word": "shoemaker",
    "meaning": "کفاش",
    "lesson": 5,
    "pos": "n.",
    "lessonLabel": "داستان ۵"
  },
  {
    "word": "expensive",
    "meaning": "گران",
    "lesson": 5,
    "pos": "adj.",
    "lessonLabel": "داستان ۵"
  },
  {
    "word": "cheap",
    "meaning": "ارزان",
    "lesson": 5,
    "pos": "adj.",
    "lessonLabel": "داستان ۵"
  },
  {
    "word": "angrily",
    "meaning": "با خشم",
    "lesson": 5,
    "pos": "adv.",
    "lessonLabel": "داستان ۵"
  },
  {
    "word": "silly",
    "meaning": "احمقانه",
    "lesson": 5,
    "pos": "adj.",
    "lessonLabel": "داستان ۵"
  },
  {
    "word": "bigger than",
    "meaning": "بزرگتر از",
    "lesson": 5,
    "pos": "phr.",
    "lessonLabel": "داستان ۵"
  },
  {
    "word": "smaller than",
    "meaning": "کوچکتر از",
    "lesson": 5,
    "pos": "phr.",
    "lessonLabel": "داستان ۵"
  },
  {
    "word": "a few days later",
    "meaning": "چند روز بعد",
    "lesson": 5,
    "pos": "phr.",
    "lessonLabel": "داستان ۵"
  },
  {
    "word": "a week later",
    "meaning": "یک هفته بعد",
    "lesson": 5,
    "pos": "phr.",
    "lessonLabel": "داستان ۵"
  },
  {
    "word": "looked at",
    "meaning": "نگاه کرد به",
    "lesson": 5,
    "pos": "phr.",
    "lessonLabel": "داستان ۵"
  },
  {
    "word": "make shoes",
    "meaning": "کفش ساخت",
    "lesson": 5,
    "pos": "phr.",
    "lessonLabel": "داستان ۵"
  },
  {
    "word": "gave it to",
    "meaning": "داد به",
    "lesson": 5,
    "pos": "phr.",
    "lessonLabel": "داستان ۵"
  },
  {
    "word": "finished school",
    "meaning": "فارغ‌التحصیل شدن از مدرسه",
    "lesson": 6,
    "pos": "phr.",
    "lessonLabel": "داستان ۶"
  },
  {
    "word": "passed his examinations",
    "meaning": "گذراندن امتحانات با موفقیت",
    "lesson": 6,
    "pos": "phr.",
    "lessonLabel": "داستان ۶"
  },
  {
    "word": "got good marks",
    "meaning": "گرفتن نمرات خوب",
    "lesson": 6,
    "pos": "phr.",
    "lessonLabel": "داستان ۶"
  },
  {
    "word": "clever people",
    "meaning": "افراد باهوش",
    "lesson": 6,
    "pos": "n.",
    "lessonLabel": "داستان ۶"
  },
  {
    "word": "clerks",
    "meaning": "کارمندان",
    "lesson": 6,
    "pos": "n.",
    "lessonLabel": "داستان ۶"
  },
  {
    "word": "quite a lot of money",
    "meaning": "پول خوبی",
    "lesson": 6,
    "pos": "phr.",
    "lessonLabel": "داستان ۶"
  },
  {
    "word": "asked for work",
    "meaning": "درخواست کردن کار",
    "lesson": 6,
    "pos": "phr.",
    "lessonLabel": "داستان ۶"
  },
  {
    "word": "questions",
    "meaning": "سوالات",
    "lesson": 6,
    "pos": "n.",
    "lessonLabel": "داستان ۶"
  },
  {
    "word": "answers",
    "meaning": "پاسخ‌ها",
    "lesson": 6,
    "pos": "n.",
    "lessonLabel": "داستان ۶"
  },
  {
    "word": "birthday",
    "meaning": "تاریخ تولد",
    "lesson": 6,
    "pos": "n.",
    "lessonLabel": "داستان ۶"
  },
  {
    "word": "sir",
    "meaning": "آقا",
    "lesson": 6,
    "pos": "n.",
    "lessonLabel": "داستان ۶"
  },
  {
    "word": "every year",
    "meaning": "هر سال",
    "lesson": 6,
    "pos": "phr.",
    "lessonLabel": "داستان ۶"
  },
  {
    "word": "examinations",
    "meaning": "امتحانات",
    "lesson": 6,
    "pos": "n.",
    "lessonLabel": "داستان ۶"
  },
  {
    "word": "get some good work",
    "meaning": "پیدا کردن کار خوب",
    "lesson": 6,
    "pos": "phr.",
    "lessonLabel": "داستان ۶"
  },
  {
    "word": "factory",
    "meaning": "کارخانه",
    "lesson": 7,
    "pos": "n.",
    "lessonLabel": "داستان ۷"
  },
  {
    "word": "gets quite a lot of money",
    "meaning": "پول زیادی به دست می‌آورد",
    "lesson": 7,
    "pos": "phr.",
    "lessonLabel": "داستان ۷"
  },
  {
    "word": "loves cars",
    "meaning": "به ماشین‌ها علاقه دارد",
    "lesson": 7,
    "pos": "phr.",
    "lessonLabel": "داستان ۷"
  },
  {
    "word": "driving very fast",
    "meaning": "رانندگی با سرعت زیاد",
    "lesson": 7,
    "pos": "phr.",
    "lessonLabel": "داستان ۷"
  },
  {
    "word": "takes his mother out",
    "meaning": "مادرش را با خود بیرون می‌برد",
    "lesson": 7,
    "pos": "phr.",
    "lessonLabel": "داستان ۷"
  },
  {
    "word": "laughs",
    "meaning": "می‌خندد",
    "lesson": 7,
    "pos": "v.",
    "lessonLabel": "داستان ۷"
  },
  {
    "word": "tall",
    "meaning": "قد بلند",
    "lesson": 7,
    "pos": "adj.",
    "lessonLabel": "داستان ۷"
  },
  {
    "word": "fat",
    "meaning": "چاق",
    "lesson": 7,
    "pos": "adj.",
    "lessonLabel": "داستان ۷"
  },
  {
    "word": "came out of a shop",
    "meaning": "از یک فروشگاه خارج شد",
    "lesson": 7,
    "pos": "phr.",
    "lessonLabel": "داستان ۷"
  },
  {
    "word": "beautiful red car",
    "meaning": "ماchine قرمز زیبا",
    "lesson": 7,
    "pos": "n.",
    "lessonLabel": "داستان ۷"
  },
  {
    "word": "get into",
    "meaning": "وارد شدن",
    "lesson": 7,
    "pos": "phr.",
    "lessonLabel": "داستان ۷"
  },
  {
    "word": "put it on",
    "meaning": "روی خود گذاشتن",
    "lesson": 7,
    "pos": "phr.",
    "lessonLabel": "داستان ۷"
  },
  {
    "word": "Mr and Mrs Yates",
    "meaning": "آقای و خانم ییتس",
    "lesson": 8,
    "pos": "n.",
    "lessonLabel": "داستان ۸"
  },
  {
    "word": "daughter",
    "meaning": "دختر",
    "lesson": 8,
    "pos": "n.",
    "lessonLabel": "داستان ۸"
  },
  {
    "word": "nineteen",
    "meaning": "نوزده",
    "lesson": 8,
    "pos": "adj.",
    "lessonLabel": "داستان ۸"
  },
  {
    "word": "office",
    "meaning": "دفتر کار",
    "lesson": 8,
    "pos": "n.",
    "lessonLabel": "داستان ۸"
  },
  {
    "word": "met",
    "meaning": "ملاقات کرد",
    "lesson": 8,
    "pos": "v.",
    "lessonLabel": "داستان ۸"
  },
  {
    "word": "young man",
    "meaning": "جوان",
    "lesson": 8,
    "pos": "n.",
    "lessonLabel": "داستان ۸"
  },
  {
    "word": "marry",
    "meaning": "ازدواج کردن",
    "lesson": 8,
    "pos": "v.",
    "lessonLabel": "داستان ۸"
  },
  {
    "word": "Daddy",
    "meaning": "پدر",
    "lesson": 8,
    "pos": "n.",
    "lessonLabel": "داستان ۸"
  },
  {
    "word": "money",
    "meaning": "پول",
    "lesson": 8,
    "pos": "n.",
    "lessonLabel": "داستان ۸"
  },
  {
    "word": "first of June",
    "meaning": "اول ژوئن",
    "lesson": 8,
    "pos": "phr.",
    "lessonLabel": "داستان ۸"
  },
  {
    "word": "second",
    "meaning": "دوم",
    "lesson": 8,
    "pos": "n.",
    "lessonLabel": "داستان ۸"
  },
  {
    "word": "Has he got any money?",
    "meaning": "آیا پول دارد؟",
    "lesson": 8,
    "pos": "expr.",
    "lessonLabel": "داستان ۸"
  },
  {
    "word": "Miss Williams",
    "meaning": "خانم ویلیامز",
    "lesson": 9,
    "pos": "n.",
    "lessonLabel": "داستان ۹"
  },
  {
    "word": "teacher",
    "meaning": "معلم",
    "lesson": 9,
    "pos": "n.",
    "lessonLabel": "داستان ۹"
  },
  {
    "word": "small children",
    "meaning": "کودکان کوچک",
    "lesson": 9,
    "pos": "n.",
    "lessonLabel": "داستان ۹"
  },
  {
    "word": "liked",
    "meaning": "دوست داشت",
    "lesson": 9,
    "pos": "v.",
    "lessonLabel": "داستان ۹"
  },
  {
    "word": "lost",
    "meaning": "گم کردن",
    "lesson": 9,
    "pos": "v.",
    "lessonLabel": "داستان ۹"
  },
  {
    "word": "clothes",
    "meaning": "لباس‌ها",
    "lesson": 9,
    "pos": "n.",
    "lessonLabel": "داستان ۹"
  },
  {
    "word": "winter",
    "meaning": "زمستان",
    "lesson": 9,
    "pos": "n.",
    "lessonLabel": "داستان ۹"
  },
  {
    "word": "cold",
    "meaning": "سرد",
    "lesson": 9,
    "pos": "adj.",
    "lessonLabel": "داستان ۹"
  },
  {
    "word": "coats",
    "meaning": "کاپشن‌ها",
    "lesson": 9,
    "pos": "n.",
    "lessonLabel": "داستان ۹"
  },
  {
    "word": "gloves",
    "meaning": "دستکش‌ها",
    "lesson": 9,
    "pos": "n.",
    "lessonLabel": "داستان ۹"
  },
  {
    "word": "hooks",
    "meaning": "قلاب‌ها",
    "lesson": 9,
    "pos": "n.",
    "lessonLabel": "داستان ۹"
  },
  {
    "word": "found",
    "meaning": "پیدا کردن",
    "lesson": 9,
    "pos": "v.",
    "lessonLabel": "داستان ۹"
  },
  {
    "word": "answered",
    "meaning": "پاسخ دادن",
    "lesson": 9,
    "pos": "v.",
    "lessonLabel": "داستان ۹"
  },
  {
    "word": "Haven't you got",
    "meaning": "تو نداری؟",
    "lesson": 9,
    "pos": "expr.",
    "lessonLabel": "داستان ۹"
  },
  {
    "word": "village",
    "meaning": "دهکاده",
    "lesson": 10,
    "pos": "n.",
    "lessonLabel": "داستان ۱۰"
  },
  {
    "word": "old people",
    "meaning": "افراد مسن",
    "lesson": 10,
    "pos": "n.",
    "lessonLabel": "داستان ۱۰"
  },
  {
    "word": "furniture",
    "meaning": "مبلمان",
    "lesson": 10,
    "pos": "n.",
    "lessonLabel": "داستان ۱۰"
  },
  {
    "word": "put out",
    "meaning": "بیرون گذاشتن",
    "lesson": 10,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۰"
  },
  {
    "word": "ugly",
    "meaning": "زشت",
    "lesson": 10,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۰"
  },
  {
    "word": "bear's head",
    "meaning": "سر خرس",
    "lesson": 10,
    "pos": "n.",
    "lessonLabel": "داستان ۱۰"
  },
  {
    "word": "lonely",
    "meaning": "تنها",
    "lesson": 10,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۰"
  },
  {
    "word": "take me",
    "meaning": "مرا با خود ببر",
    "lesson": 10,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۰"
  },
  {
    "word": "in the evening",
    "meaning": "وقت عصر",
    "lesson": 10,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۰"
  },
  {
    "word": "another",
    "meaning": "دیگری",
    "lesson": 10,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۰"
  },
  {
    "word": "Mr and Mrs",
    "meaning": "آقای و خانم",
    "lesson": 10,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۰"
  },
  {
    "word": "every Saturday",
    "meaning": "هر شنبه",
    "lesson": 10,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۰"
  },
  {
    "word": "gentlemen",
    "meaning": "آقایان، مردان محترم",
    "lesson": 11,
    "pos": "n.",
    "lessonLabel": "داستان ۱۱"
  },
  {
    "word": "neighbours",
    "meaning": "همسایه‌ها",
    "lesson": 11,
    "pos": "n.",
    "lessonLabel": "داستان ۱۱"
  },
  {
    "word": "went for walks",
    "meaning": "پیاده‌روی کردن",
    "lesson": 11,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۱"
  },
  {
    "word": "fine",
    "meaning": "خوب، عالی",
    "lesson": 11,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۱"
  },
  {
    "word": "river",
    "meaning": "رIVER",
    "lesson": 11,
    "pos": "n.",
    "lessonLabel": "داستان ۱۱"
  },
  {
    "word": "shone",
    "meaning": "می‌درخشید",
    "lesson": 11,
    "pos": "v.",
    "lessonLabel": "داستان ۱۱"
  },
  {
    "word": "quietly",
    "meaning": "به آرامی، بی‌صدا",
    "lesson": 11,
    "pos": "adv.",
    "lessonLabel": "داستان ۱۱"
  },
  {
    "word": "smiled",
    "meaning": "لبخند زد",
    "lesson": 11,
    "pos": "v.",
    "lessonLabel": "داستان ۱۱"
  },
  {
    "word": "behind us",
    "meaning": "پشت ما",
    "lesson": 11,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۱"
  },
  {
    "word": "eyes",
    "meaning": "چشم‌ها",
    "lesson": 11,
    "pos": "n.",
    "lessonLabel": "داستان ۱۱"
  },
  {
    "word": "towards us",
    "meaning": "به سمت ما",
    "lesson": 11,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۱"
  },
  {
    "word": "soldier",
    "meaning": "سرباز",
    "lesson": 12,
    "pos": "n.",
    "lessonLabel": "داستان ۱۲"
  },
  {
    "word": "camp",
    "meaning": "اردوگاه",
    "lesson": 12,
    "pos": "n.",
    "lessonLabel": "داستان ۱۲"
  },
  {
    "word": "officer",
    "meaning": "افسر",
    "lesson": 12,
    "pos": "n.",
    "lessonLabel": "داستان ۱۲"
  },
  {
    "word": "inspect",
    "meaning": "بازرسی کردن",
    "lesson": 12,
    "pos": "v.",
    "lessonLabel": "داستان ۱۲"
  },
  {
    "word": "barber",
    "meaning": "آرایشگر",
    "lesson": 12,
    "pos": "n.",
    "lessonLabel": "داستان ۱۲"
  },
  {
    "word": "sad",
    "meaning": "ناراحت",
    "lesson": 12,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۲"
  },
  {
    "word": "boots",
    "meaning": "چکمه‌ها",
    "lesson": 12,
    "pos": "n.",
    "lessonLabel": "داستان ۱۲"
  },
  {
    "word": "clean",
    "meaning": "تمیز",
    "lesson": 12,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۲"
  },
  {
    "word": "better",
    "meaning": "بهتر",
    "lesson": 12,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۲"
  },
  {
    "word": "next week",
    "meaning": "هفتهٔ بعد",
    "lesson": 12,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۲"
  },
  {
    "word": "during the week",
    "meaning": "در طول هفته",
    "lesson": 12,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۲"
  },
  {
    "word": "go into the town",
    "meaning": "رفتن به شهر",
    "lesson": 12,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۲"
  },
  {
    "word": "come back",
    "meaning": "برگشتن",
    "lesson": 12,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۲"
  },
  {
    "word": "look at",
    "meaning": "نگاه کردن به",
    "lesson": 12,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۲"
  },
  {
    "word": "Mrs Harris",
    "meaning": "خانم هریس",
    "lesson": 13,
    "pos": "n.",
    "lessonLabel": "داستان ۱۳"
  },
  {
    "word": "got work",
    "meaning": "کار پیدا کرد",
    "lesson": 13,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۳"
  },
  {
    "word": "quite a long way",
    "meaning": "فاصله‌ی نسبتاً زیادی",
    "lesson": 13,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۳"
  },
  {
    "word": "send you some",
    "meaning": "برایت مقداری بفرستم",
    "lesson": 13,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۳"
  },
  {
    "word": "angry",
    "meaning": "عصبانی",
    "lesson": 13,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۳"
  },
  {
    "word": "phone",
    "meaning": "تلفن",
    "lesson": 13,
    "pos": "n.",
    "lessonLabel": "داستان ۱۳"
  },
  {
    "word": "never",
    "meaning": "هرگز",
    "lesson": 13,
    "pos": "adv.",
    "lessonLabel": "داستان ۱۳"
  },
  {
    "word": "there",
    "meaning": "آنجا",
    "lesson": 13,
    "pos": "adv.",
    "lessonLabel": "داستان ۱۳"
  },
  {
    "word": "then",
    "meaning": "سپس، بعداً",
    "lesson": 13,
    "pos": "adv.",
    "lessonLabel": "داستان ۱۳"
  },
  {
    "word": "after that",
    "meaning": "بعد از آن",
    "lesson": 13,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۳"
  },
  {
    "word": "about this",
    "meaning": "در مورد این موضوع",
    "lesson": 13,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۳"
  },
  {
    "word": "dentist",
    "meaning": "دندان‌پزشک",
    "lesson": 14,
    "pos": "n.",
    "lessonLabel": "داستان ۱۴"
  },
  {
    "word": "afraid",
    "meaning": "ترسیده، ترس",
    "lesson": 14,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۴"
  },
  {
    "word": "teeth",
    "meaning": "دندان‌ها",
    "lesson": 14,
    "pos": "n.",
    "lessonLabel": "داستان ۱۴"
  },
  {
    "word": "hurting",
    "meaning": "درد کردن",
    "lesson": 14,
    "pos": "v.",
    "lessonLabel": "داستان ۱۴"
  },
  {
    "word": "a lot",
    "meaning": "خیلی، بسیار",
    "lesson": 14,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۴"
  },
  {
    "word": "work",
    "meaning": "کار",
    "lesson": 14,
    "pos": "n.",
    "lessonLabel": "داستان ۱۴"
  },
  {
    "word": "cost",
    "meaning": "هزینه داشتن",
    "lesson": 14,
    "pos": "v.",
    "lessonLabel": "داستان ۱۴"
  },
  {
    "word": "pounds",
    "meaning": "پوند (واحد پول)",
    "lesson": 14,
    "pos": "n.",
    "lessonLabel": "داستان ۱۴"
  },
  {
    "word": "gentleman",
    "meaning": "آقا، مرد محترم",
    "lesson": 14,
    "pos": "n.",
    "lessonLabel": "داستان ۱۴"
  },
  {
    "word": "live",
    "meaning": "زندگی کردن",
    "lesson": 14,
    "pos": "v.",
    "lessonLabel": "داستان ۱۴"
  },
  {
    "word": "pay",
    "meaning": "پرداخت کردن",
    "lesson": 14,
    "pos": "v.",
    "lessonLabel": "داستان ۱۴"
  },
  {
    "word": "wait for",
    "meaning": "صبر کردن برای",
    "lesson": 14,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۴"
  },
  {
    "word": "phoned",
    "meaning": "زنگ زدن",
    "lesson": 14,
    "pos": "v.",
    "lessonLabel": "داستان ۱۴"
  },
  {
    "word": "ask for",
    "meaning": "درخواست کردن",
    "lesson": 14,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۴"
  },
  {
    "word": "football",
    "meaning": "فوتبال",
    "lesson": 15,
    "pos": "n.",
    "lessonLabel": "داستان ۱۵"
  },
  {
    "word": "matches",
    "meaning": "مسابقات",
    "lesson": 15,
    "pos": "n.",
    "lessonLabel": "داستان ۱۵"
  },
  {
    "word": "cloudy",
    "meaning": "ابری",
    "lesson": 15,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۵"
  },
  {
    "word": "sun shone",
    "meaning": "آفتاب درآمد",
    "lesson": 15,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۵"
  },
  {
    "word": "benches",
    "meaning": "نیمکت‌ها",
    "lesson": 15,
    "pos": "n.",
    "lessonLabel": "داستان ۱۵"
  },
  {
    "word": "fat man",
    "meaning": "مرد چاق",
    "lesson": 15,
    "pos": "n.",
    "lessonLabel": "داستان ۱۵"
  },
  {
    "word": "took his coat off",
    "meaning": "کتش را درآورد",
    "lesson": 15,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۵"
  },
  {
    "word": "fell",
    "meaning": "افتاد",
    "lesson": 15,
    "pos": "v.",
    "lessonLabel": "داستان ۱۵"
  },
  {
    "word": "trousers",
    "meaning": "شلوارها",
    "lesson": 15,
    "pos": "n.",
    "lessonLabel": "داستان ۱۵"
  },
  {
    "word": "eight and a half years old",
    "meaning": "هشت و نیم ساله",
    "lesson": 16,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۶"
  },
  {
    "word": "on foot",
    "meaning": "پیاده",
    "lesson": 16,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۶"
  },
  {
    "word": "got back on time",
    "meaning": "به موقع برگشت",
    "lesson": 16,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۶"
  },
  {
    "word": "headmaster",
    "meaning": "مدیر مدرسه",
    "lesson": 16,
    "pos": "n.",
    "lessonLabel": "داستان ۱۶"
  },
  {
    "word": "none of the children",
    "meaning": "هیچکدام از بچه‌ها",
    "lesson": 16,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۶"
  },
  {
    "word": "stupid children",
    "meaning": "بچه‌های احمق",
    "lesson": 16,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۶"
  },
  {
    "word": "glue",
    "meaning": "چسب",
    "lesson": 16,
    "pos": "n.",
    "lessonLabel": "داستان ۱۶"
  },
  {
    "word": "chair",
    "meaning": "صندلی",
    "lesson": 16,
    "pos": "n.",
    "lessonLabel": "داستان ۱۶"
  },
  {
    "word": "after our lessons",
    "meaning": "بعد از کلاس‌ها",
    "lesson": 16,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۶"
  },
  {
    "word": "gave her the answer",
    "meaning": "به او جواب داد",
    "lesson": 16,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۶"
  },
  {
    "word": "put glue on",
    "meaning": "چسب را روی چیزی ریختن",
    "lesson": 16,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۶"
  },
  {
    "word": "ill",
    "meaning": "بیمار",
    "lesson": 17,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۷"
  },
  {
    "word": "tired",
    "meaning": "خسته",
    "lesson": 17,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۷"
  },
  {
    "word": "examined",
    "meaning": "معاینه کرد",
    "lesson": 17,
    "pos": "v.",
    "lessonLabel": "داستان ۱۷"
  },
  {
    "word": "whisky",
    "meaning": "ویسکین",
    "lesson": 17,
    "pos": "n.",
    "lessonLabel": "داستان ۱۷"
  },
  {
    "word": "preferred",
    "meaning": "ترجیح می‌داد",
    "lesson": 17,
    "pos": "v.",
    "lessonLabel": "داستان ۱۷"
  },
  {
    "word": "dangerous",
    "meaning": "خطرناک",
    "lesson": 17,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۷"
  },
  {
    "word": "killed",
    "meaning": "کشت",
    "lesson": 17,
    "pos": "v.",
    "lessonLabel": "داستان ۱۷"
  },
  {
    "word": "friend",
    "meaning": "دوست",
    "lesson": 17,
    "pos": "n.",
    "lessonLabel": "داستان ۱۷"
  },
  {
    "word": "cow",
    "meaning": "گاو",
    "lesson": 17,
    "pos": "n.",
    "lessonLabel": "داستان ۱۷"
  },
  {
    "word": "fell on",
    "meaning": "روی افتادن",
    "lesson": 17,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۷"
  },
  {
    "word": "last month",
    "meaning": "ماه گذشته",
    "lesson": 17,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۷"
  },
  {
    "word": "last week",
    "meaning": "هفته گذشته",
    "lesson": 17,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۷"
  },
  {
    "word": "small shop",
    "meaning": "مغازهٔ کوچک",
    "lesson": 18,
    "pos": "n. phr.",
    "lessonLabel": "داستان ۱۸"
  },
  {
    "word": "sells pictures",
    "meaning": "نقاشی می‌فروشد",
    "lesson": 18,
    "pos": "v. phr.",
    "lessonLabel": "داستان ۱۸"
  },
  {
    "word": "quite pretty",
    "meaning": "خیلی زیبا",
    "lesson": 18,
    "pos": "adj. phr.",
    "lessonLabel": "داستان ۱۸"
  },
  {
    "word": "a lot of",
    "meaning": "تعداد زیادی",
    "lesson": 18,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۸"
  },
  {
    "word": "took Mr White to",
    "meaning": "آقای وایت را به... برد",
    "lesson": 18,
    "pos": "v. phr.",
    "lessonLabel": "داستان ۱۸"
  },
  {
    "word": "a picture of horses",
    "meaning": "نقاشی اسب‌ها",
    "lesson": 18,
    "pos": "n. phr.",
    "lessonLabel": "داستان ۱۸"
  },
  {
    "word": "brought his book",
    "meaning": "کتابش را آورد",
    "lesson": 18,
    "pos": "v. phr.",
    "lessonLabel": "داستان ۱۸"
  },
  {
    "word": "shut her eyes",
    "meaning": "چشمانش را بست",
    "lesson": 18,
    "pos": "v. phr.",
    "lessonLabel": "داستان ۱۸"
  },
  {
    "word": "the canvas",
    "meaning": "بوم نقاشی",
    "lesson": 18,
    "pos": "n.",
    "lessonLabel": "داستان ۱۸"
  },
  {
    "word": "it was clean",
    "meaning": "تمیز بود",
    "lesson": 18,
    "pos": "expr.",
    "lessonLabel": "داستان ۱۸"
  },
  {
    "word": "cupboard",
    "meaning": "کمد",
    "lesson": 19,
    "pos": "n.",
    "lessonLabel": "داستان ۱۹"
  },
  {
    "word": "heavy",
    "meaning": "سنگین",
    "lesson": 19,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۹"
  },
  {
    "word": "bedroom",
    "meaning": "اتاق خواب",
    "lesson": 19,
    "pos": "n.",
    "lessonLabel": "داستان ۱۹"
  },
  {
    "word": "small",
    "meaning": "کوچک",
    "lesson": 19,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۹"
  },
  {
    "word": "big",
    "meaning": "بزرگ",
    "lesson": 19,
    "pos": "adj.",
    "lessonLabel": "داستان ۱۹"
  },
  {
    "word": "carry",
    "meaning": "بردن، حمل کردن",
    "lesson": 19,
    "pos": "v.",
    "lessonLabel": "داستان ۱۹"
  },
  {
    "word": "stairs",
    "meaning": "پله‌ها",
    "lesson": 19,
    "pos": "n.",
    "lessonLabel": "داستان ۱۹"
  },
  {
    "word": "push",
    "meaning": "هل دادن",
    "lesson": 19,
    "pos": "v.",
    "lessonLabel": "داستان ۱۹"
  },
  {
    "word": "pull",
    "meaning": "کشیدن",
    "lesson": 19,
    "pos": "v.",
    "lessonLabel": "داستان ۱۹"
  },
  {
    "word": "upstairs",
    "meaning": "به طبقه بالا",
    "lesson": 19,
    "pos": "adv.",
    "lessonLabel": "داستان ۱۹"
  },
  {
    "word": "downstairs",
    "meaning": "به طبقه پایین",
    "lesson": 19,
    "pos": "adv.",
    "lessonLabel": "داستان ۱۹"
  },
  {
    "word": "make tea",
    "meaning": "چای درست کردن",
    "lesson": 19,
    "pos": "phr.",
    "lessonLabel": "داستان ۱۹"
  },
  {
    "word": "likes singing",
    "meaning": "دوست داشتن آواز خواندن",
    "lesson": 20,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۰"
  },
  {
    "word": "very bad at it",
    "meaning": "در آن بسیار بد بودن",
    "lesson": 20,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۰"
  },
  {
    "word": "guests",
    "meaning": "مهمان‌ها",
    "lesson": 20,
    "pos": "n.",
    "lessonLabel": "داستان ۲۰"
  },
  {
    "word": "hostess",
    "meaning": "میزبان زن",
    "lesson": 20,
    "pos": "n.",
    "lessonLabel": "داستان ۲۰"
  },
  {
    "word": "an old song",
    "meaning": "یک آهنگ قدیمی",
    "lesson": 20,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۰"
  },
  {
    "word": "dark hair",
    "meaning": "موهای تیره",
    "lesson": 20,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۰"
  },
  {
    "word": "put his hand on her back",
    "meaning": "داشتن دستش را روی پشتش",
    "lesson": 20,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۰"
  },
  {
    "word": "don't cry",
    "meaning": "گریه نکن",
    "lesson": 20,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۰"
  },
  {
    "word": "a singer",
    "meaning": "یک خواننده",
    "lesson": 20,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۰"
  },
  {
    "word": "love music",
    "meaning": "دوست داشتن موسیقی",
    "lesson": 20,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۰"
  },
  {
    "word": "never been to",
    "meaning": "هرگز به ... نرفتن",
    "lesson": 20,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۰"
  },
  {
    "word": "drive",
    "meaning": "رانندگی کردن",
    "lesson": 21,
    "pos": "v.",
    "lessonLabel": "داستان ۲۱"
  },
  {
    "word": "difficult",
    "meaning": "سخت",
    "lesson": 21,
    "pos": "adj.",
    "lessonLabel": "داستان ۲۱"
  },
  {
    "word": "ship",
    "meaning": "کشتی",
    "lesson": 21,
    "pos": "n.",
    "lessonLabel": "داستان ۲۱"
  },
  {
    "word": "map",
    "meaning": "نقشه",
    "lesson": 21,
    "pos": "n.",
    "lessonLabel": "داستان ۲۱"
  },
  {
    "word": "round and round",
    "meaning": "دور و بر",
    "lesson": 21,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۱"
  },
  {
    "word": "corner",
    "meaning": "گوشه",
    "lesson": 21,
    "pos": "n.",
    "lessonLabel": "داستان ۲۱"
  },
  {
    "word": "turned left",
    "meaning": "چپ کرد",
    "lesson": 21,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۱"
  },
  {
    "word": "crossed",
    "meaning": "عبور کردن",
    "lesson": 21,
    "pos": "v.",
    "lessonLabel": "داستان ۲۱"
  },
  {
    "word": "along",
    "meaning": "به طول",
    "lesson": 21,
    "pos": "prep.",
    "lessonLabel": "داستان ۲۱"
  },
  {
    "word": "reached",
    "meaning": "رسیدن",
    "lesson": 21,
    "pos": "v.",
    "lessonLabel": "داستان ۲۱"
  },
  {
    "word": "wife",
    "meaning": "همسر",
    "lesson": 22,
    "pos": "n.",
    "lessonLabel": "داستان ۲۲"
  },
  {
    "word": "big dog",
    "meaning": "سگ بزرگ",
    "lesson": 22,
    "pos": "n.",
    "lessonLabel": "داستان ۲۲"
  },
  {
    "word": "small car",
    "meaning": "ماشین کوچک",
    "lesson": 22,
    "pos": "n.",
    "lessonLabel": "داستان ۲۲"
  },
  {
    "word": "tennis",
    "meaning": "تنیس",
    "lesson": 22,
    "pos": "n.",
    "lessonLabel": "داستان ۲۲"
  },
  {
    "word": "club",
    "meaning": "باشگاه",
    "lesson": 22,
    "pos": "n.",
    "lessonLabel": "داستان ۲۲"
  },
  {
    "word": "ran out",
    "meaning": "بیرون دوید",
    "lesson": 22,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۲"
  },
  {
    "word": "jumped into",
    "meaning": "به داخلش پرید",
    "lesson": 22,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۲"
  },
  {
    "word": "silly dog",
    "meaning": "سگ احمق",
    "lesson": 22,
    "pos": "n.",
    "lessonLabel": "داستان ۲۲"
  },
  {
    "word": "shouted",
    "meaning": "فریاد زد",
    "lesson": 22,
    "pos": "v.",
    "lessonLabel": "داستان ۲۲"
  },
  {
    "word": "key",
    "meaning": "کلید",
    "lesson": 22,
    "pos": "n.",
    "lessonLabel": "داستان ۲۲"
  },
  {
    "word": "wrong car",
    "meaning": "ماشین اشتباه",
    "lesson": 22,
    "pos": "n.",
    "lessonLabel": "داستان ۲۲"
  },
  {
    "word": "right car",
    "meaning": "ماشین درست",
    "lesson": 22,
    "pos": "n.",
    "lessonLabel": "داستان ۲۲"
  },
  {
    "word": "worked",
    "meaning": "کار می‌کرد",
    "lesson": 23,
    "pos": "v.",
    "lessonLabel": "داستان ۲۳"
  },
  {
    "word": "lunch time",
    "meaning": "زمان ناهار",
    "lesson": 23,
    "pos": "n.",
    "lessonLabel": "داستان ۲۳"
  },
  {
    "word": "newspapers",
    "meaning": "روزنامه‌ها",
    "lesson": 23,
    "pos": "n.",
    "lessonLabel": "داستان ۲۳"
  },
  {
    "word": "married",
    "meaning": "ازدواج کرد",
    "lesson": 23,
    "pos": "v.",
    "lessonLabel": "داستان ۲۳"
  },
  {
    "word": "hate",
    "meaning": "نفرت داشتن، متنفر بودن",
    "lesson": 23,
    "pos": "v.",
    "lessonLabel": "داستان ۲۳"
  },
  {
    "word": "something very nice",
    "meaning": "چیز خیلی خوب",
    "lesson": 23,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۳"
  },
  {
    "word": "brought",
    "meaning": "آورد",
    "lesson": 23,
    "pos": "v.",
    "lessonLabel": "داستان ۲۳"
  },
  {
    "word": "hall",
    "meaning": "راهرو",
    "lesson": 23,
    "pos": "n.",
    "lessonLabel": "داستان ۲۳"
  },
  {
    "word": "said",
    "meaning": "گفت",
    "lesson": 23,
    "pos": "v.",
    "lessonLabel": "داستان ۲۳"
  },
  {
    "word": "seldom",
    "meaning": "به ندرت، نادر",
    "lesson": 24,
    "pos": "adv.",
    "lessonLabel": "داستان ۲۴"
  },
  {
    "word": "cinema",
    "meaning": "سینما",
    "lesson": 24,
    "pos": "n.",
    "lessonLabel": "داستان ۲۴"
  },
  {
    "word": "enjoyed",
    "meaning": "از آن لذت برد",
    "lesson": 24,
    "pos": "v.",
    "lessonLabel": "داستان ۲۴"
  },
  {
    "word": "dark",
    "meaning": "تاریک",
    "lesson": 24,
    "pos": "adj.",
    "lessonLabel": "داستان ۲۴"
  },
  {
    "word": "running after",
    "meaning": "دنبال دویدن",
    "lesson": 24,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۴"
  },
  {
    "word": "slowly",
    "meaning": "آهسته",
    "lesson": 24,
    "pos": "adv.",
    "lessonLabel": "داستان ۲۴"
  },
  {
    "word": "help you",
    "meaning": "کمکتان کنم",
    "lesson": 24,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۴"
  },
  {
    "word": "wash the dishes",
    "meaning": "ظرف‌ها را بشوی",
    "lesson": 24,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۴"
  },
  {
    "word": "last one",
    "meaning": "آخرین نفر",
    "lesson": 24,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۴"
  },
  {
    "word": "after the cinema",
    "meaning": "بعد از سینما",
    "lesson": 24,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۴"
  },
  {
    "word": "at home",
    "meaning": "در خانه",
    "lesson": 24,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۴"
  },
  {
    "word": "quite happy",
    "meaning": "خوشحال بود",
    "lesson": 24,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۴"
  },
  {
    "word": "men's clubs",
    "meaning": "باشگاه‌های مردانه",
    "lesson": 25,
    "pos": "n.",
    "lessonLabel": "داستان ۲۵"
  },
  {
    "word": "servants",
    "meaning": "خدمتکاران",
    "lesson": 25,
    "pos": "n.",
    "lessonLabel": "داستان ۲۵"
  },
  {
    "word": "doorman",
    "meaning": "سرایدار",
    "lesson": 25,
    "pos": "n.",
    "lessonLabel": "داستان ۲۵"
  },
  {
    "word": "grey hair",
    "meaning": "موهای خاکستری",
    "lesson": 25,
    "pos": "n.",
    "lessonLabel": "داستان ۲۵"
  },
  {
    "word": "moustache",
    "meaning": "سبیل",
    "lesson": 25,
    "pos": "n.",
    "lessonLabel": "داستان ۲۵"
  },
  {
    "word": "message",
    "meaning": "پیام",
    "lesson": 25,
    "pos": "n.",
    "lessonLabel": "داستان ۲۵"
  },
  {
    "word": "necessary",
    "meaning": "لازم",
    "lesson": 25,
    "pos": "adj.",
    "lessonLabel": "داستان ۲۵"
  },
  {
    "word": "read newspapers",
    "meaning": "خواندن روزنامه",
    "lesson": 25,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۵"
  },
  {
    "word": "had meals",
    "meaning": "خوردن غذا",
    "lesson": 25,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۵"
  },
  {
    "word": "give a message",
    "meaning": "دادن پیام",
    "lesson": 25,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۵"
  },
  {
    "word": "at the club",
    "meaning": "در باشگاه",
    "lesson": 25,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۵"
  },
  {
    "word": "isn't necessary",
    "meaning": "لازم نیست",
    "lesson": 25,
    "pos": "expr.",
    "lessonLabel": "داستان ۲۵"
  },
  {
    "word": "ever at the club",
    "meaning": "هرگز در باشگاه نیست",
    "lesson": 25,
    "pos": "expr.",
    "lessonLabel": "داستان ۲۵"
  },
  {
    "word": "Jimmy",
    "meaning": "جیمی",
    "lesson": 26,
    "pos": "n.",
    "lessonLabel": "داستان ۲۶"
  },
  {
    "word": "London",
    "meaning": "لندن",
    "lesson": 26,
    "pos": "n.",
    "lessonLabel": "داستان ۲۶"
  },
  {
    "word": "swimming",
    "meaning": "شنا کردن",
    "lesson": 26,
    "pos": "n.",
    "lessonLabel": "داستان ۲۶"
  },
  {
    "word": "swimming-pool",
    "meaning": "استخر",
    "lesson": 26,
    "pos": "n.",
    "lessonLabel": "داستان ۲۶"
  },
  {
    "word": "quite well",
    "meaning": "خیلی خوب",
    "lesson": 26,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۶"
  },
  {
    "word": "the sea",
    "meaning": "دریا",
    "lesson": 26,
    "pos": "n.",
    "lessonLabel": "داستان ۲۶"
  },
  {
    "word": "harbour",
    "meaning": "بندر",
    "lesson": 26,
    "pos": "n.",
    "lessonLabel": "داستان ۲۶"
  },
  {
    "word": "shallow end",
    "meaning": "طرف کم‌عمق",
    "lesson": 26,
    "pos": "n.",
    "lessonLabel": "داستان ۲۶"
  },
  {
    "word": "a few months",
    "meaning": "چند ماه",
    "lesson": 26,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۶"
  },
  {
    "word": "on Sunday",
    "meaning": "یکشنبه",
    "lesson": 26,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۶"
  },
  {
    "word": "got out",
    "meaning": "پیاده شد",
    "lesson": 26,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۶"
  },
  {
    "word": "Mrs Green",
    "meaning": "خانم گرین",
    "lesson": 27,
    "pos": "n.",
    "lessonLabel": "داستان ۲۷"
  },
  {
    "word": "drove",
    "meaning": "رانندگی کرد",
    "lesson": 27,
    "pos": "v.",
    "lessonLabel": "داستان ۲۷"
  },
  {
    "word": "shops",
    "meaning": "مغازه‌ها",
    "lesson": 27,
    "pos": "n.",
    "lessonLabel": "داستان ۲۷"
  },
  {
    "word": "drove well",
    "meaning": "خوب رانندگی می‌کرد",
    "lesson": 27,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۷"
  },
  {
    "word": "hit",
    "meaning": "برخورد کردن",
    "lesson": 27,
    "pos": "v.",
    "lessonLabel": "داستان ۲۷"
  },
  {
    "word": "grandchildren",
    "meaning": "نوه‌ها",
    "lesson": 27,
    "pos": "n.",
    "lessonLabel": "داستان ۲۷"
  },
  {
    "word": "take you",
    "meaning": "تو را بردن",
    "lesson": 27,
    "pos": "phr.",
    "lessonLabel": "داستان ۲۷"
  },
  {
    "word": "traffic-lights",
    "meaning": "چراغ‌های راهنمایی",
    "lesson": 27,
    "pos": "n.",
    "lessonLabel": "داستان ۲۷"
  },
  {
    "word": "policeman",
    "meaning": "پلیس",
    "lesson": 27,
    "pos": "n.",
    "lessonLabel": "داستان ۲۷"
  },
  {
    "word": "kindly",
    "meaning": "با مهربانی",
    "lesson": 27,
    "pos": "adv.",
    "lessonLabel": "داستان ۲۷"
  },
  {
    "word": "colours",
    "meaning": "رنگ‌ها",
    "lesson": 27,
    "pos": "n.",
    "lessonLabel": "داستان ۲۷"
  },
  {
    "word": "food",
    "meaning": "غذا",
    "lesson": 27,
    "pos": "n.",
    "lessonLabel": "داستان ۲۷"
  },
  {
    "word": "engine",
    "meaning": "موتور",
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
