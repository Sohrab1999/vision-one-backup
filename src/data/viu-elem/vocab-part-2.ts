// واژگان درس‌های English Vocabulary in Use — Elementary (پارتیت 2) — استخراج VLM از اسکن PDF
// word = عین چاپ کتاب · meaning = ترجمهٔ ماشینی GLM (کلاس FA-NEW — اثبات صحت ترجمه نیست)
import type { VocabWord } from "../types";

type Row = Omit<VocabWord, "lesson"> & { lesson: number; lessonLabel: string };

const ROWS: Row[] = [
  {
    word: "year",
    meaning: "سال",
    lesson: 16,
    pos: "n.",
    lessonLabel: "درس 16 — واژه‌های زمان (۱): روزها، ماه‌ها و فصل‌ها"
  },
  {
    word: "day",
    meaning: "روز",
    lesson: 16,
    pos: "n.",
    lessonLabel: "درس 16 — واژه‌های زمان (۱): روزها، ماه‌ها و فصل‌ها"
  },
  {
    word: "month",
    meaning: "ماه",
    lesson: 16,
    pos: "n.",
    lessonLabel: "درس 16 — واژه‌های زمان (۱): روزها، ماه‌ها و فصل‌ها"
  },
  {
    word: "week",
    meaning: "هفته",
    lesson: 16,
    pos: "n.",
    lessonLabel: "درس 16 — واژه‌های زمان (۱): روزها، ماه‌ها و فصل‌ها"
  },
  {
    word: "fortnight",
    meaning: "دو هفته",
    lesson: 16,
    pos: "n.",
    lessonLabel: "درس 16 — واژه‌های زمان (۱): روزها، ماه‌ها و فصل‌ها"
  },
  {
    word: "hour",
    meaning: "ساعت",
    lesson: 16,
    pos: "n.",
    lessonLabel: "درس 16 — واژه‌های زمان (۱): روزها، ماه‌ها و فصل‌ها"
  },
  {
    word: "minute",
    meaning: "دقیقه",
    lesson: 16,
    pos: "n.",
    lessonLabel: "درس 16 — واژه‌های زمان (۱): روزها، ماه‌ها و فصل‌ها"
  },
  {
    word: "second",
    meaning: "ثانیه",
    lesson: 16,
    pos: "n.",
    lessonLabel: "درس 16 — واژه‌های زمان (۱): روزها، ماه‌ها و فصل‌ها"
  },
  {
    word: "century",
    meaning: "قرن",
    lesson: 16,
    pos: "n.",
    lessonLabel: "درس 16 — واژه‌های زمان (۱): روزها، ماه‌ها و فصل‌ها"
  },
  {
    word: "Sunday",
    meaning: "یکشنبه",
    lesson: 16,
    pos: "n.",
    lessonLabel: "درس 16 — واژه‌های زمان (۱): روزها، ماه‌ها و فصل‌ها"
  },
  {
    word: "Monday",
    meaning: "دوشنبه",
    lesson: 16,
    pos: "n.",
    lessonLabel: "درس 16 — واژه‌های زمان (۱): روزها، ماه‌ها و فصل‌ها"
  },
  {
    word: "Tuesday",
    meaning: "سه‌شنبه",
    lesson: 16,
    pos: "n.",
    lessonLabel: "درس 16 — واژه‌های زمان (۱): روزها، ماه‌ها و فصل‌ها"
  },
  {
    word: "Wednesday",
    meaning: "چهارشنبه",
    lesson: 16,
    pos: "n.",
    lessonLabel: "درس 16 — واژه‌های زمان (۱): روزها، ماه‌ها و فصل‌ها"
  },
  {
    word: "Thursday",
    meaning: "پنجشنبه",
    lesson: 16,
    pos: "n.",
    lessonLabel: "درس 16 — واژه‌های زمان (۱): روزها، ماه‌ها و فصل‌ها"
  },
  {
    word: "Friday",
    meaning: "جمعه",
    lesson: 16,
    pos: "n.",
    lessonLabel: "درس 16 — واژه‌های زمان (۱): روزها، ماه‌ها و فصل‌ها"
  },
  {
    word: "Saturday",
    meaning: "شنبه",
    lesson: 16,
    pos: "n.",
    lessonLabel: "درس 16 — واژه‌های زمان (۱): روزها، ماه‌ها و فصل‌ها"
  },
  {
    word: "the weekend",
    meaning: "آخر هفته",
    lesson: 16,
    pos: "n.",
    lessonLabel: "درس 16 — واژه‌های زمان (۱): روزها، ماه‌ها و فصل‌ها"
  },
  {
    word: "the day before yesterday",
    meaning: "پریروز",
    lesson: 16,
    pos: "phr.",
    lessonLabel: "درس 16 — واژه‌های زمان (۱): روزها، ماه‌ها و فصل‌ها"
  },
  {
    word: "yesterday",
    meaning: "دیروز",
    lesson: 16,
    pos: "adv.",
    lessonLabel: "درس 16 — واژه‌های زمان (۱): روزها، ماه‌ها و فصل‌ها"
  },
  {
    word: "today",
    meaning: "امروز",
    lesson: 16,
    pos: "adv.",
    lessonLabel: "درس 16 — واژه‌های زمان (۱): روزها، ماه‌ها و فصل‌ها"
  },
  {
    word: "tomorrow",
    meaning: "فردا",
    lesson: 16,
    pos: "adv.",
    lessonLabel: "درس 16 — واژه‌های زمان (۱): روزها، ماه‌ها و فصل‌ها"
  },
  {
    word: "the day after tomorrow",
    meaning: "پس‌فردا",
    lesson: 16,
    pos: "phr.",
    lessonLabel: "درس 16 — واژه‌های زمان (۱): روزها، ماه‌ها و فصل‌ها"
  },
  {
    word: "Monday morning",
    meaning: "صبح دوشنبه",
    lesson: 16,
    pos: "phr.",
    lessonLabel: "درس 16 — واژه‌های زمان (۱): روزها، ماه‌ها و فصل‌ها"
  },
  {
    word: "Monday afternoon",
    meaning: "بعدازظهر دوشنبه",
    lesson: 16,
    pos: "phr.",
    lessonLabel: "درس 16 — واژه‌های زمان (۱): روزها، ماه‌ها و فصل‌ها"
  },
  {
    word: "Monday evening",
    meaning: "عصر دوشنبه",
    lesson: 16,
    pos: "phr.",
    lessonLabel: "درس 16 — واژه‌های زمان (۱): روزها، ماه‌ها و فصل‌ها"
  },
  {
    word: "January",
    meaning: "ژانویه",
    lesson: 16,
    pos: "n.",
    lessonLabel: "درس 16 — واژه‌های زمان (۱): روزها، ماه‌ها و فصل‌ها"
  },
  {
    word: "February",
    meaning: "فوریه",
    lesson: 16,
    pos: "n.",
    lessonLabel: "درس 16 — واژه‌های زمان (۱): روزها، ماه‌ها و فصل‌ها"
  },
  {
    word: "March",
    meaning: "مارس",
    lesson: 16,
    pos: "n.",
    lessonLabel: "درس 16 — واژه‌های زمان (۱): روزها، ماه‌ها و فصل‌ها"
  },
  {
    word: "April",
    meaning: "آوریل",
    lesson: 16,
    pos: "n.",
    lessonLabel: "درس 16 — واژه‌های زمان (۱): روزها، ماه‌ها و فصل‌ها"
  },
  {
    word: "May",
    meaning: "مه",
    lesson: 16,
    pos: "n.",
    lessonLabel: "درس 16 — واژه‌های زمان (۱): روزها، ماه‌ها و فصل‌ها"
  },
  {
    word: "June",
    meaning: "ژوئن",
    lesson: 16,
    pos: "n.",
    lessonLabel: "درس 16 — واژه‌های زمان (۱): روزها، ماه‌ها و فصل‌ها"
  },
  {
    word: "July",
    meaning: "ژوئیه",
    lesson: 16,
    pos: "n.",
    lessonLabel: "درس 16 — واژه‌های زمان (۱): روزها، ماه‌ها و فصل‌ها"
  },
  {
    word: "August",
    meaning: "اوت",
    lesson: 16,
    pos: "n.",
    lessonLabel: "درس 16 — واژه‌های زمان (۱): روزها، ماه‌ها و فصل‌ها"
  },
  {
    word: "September",
    meaning: "سپتامبر",
    lesson: 16,
    pos: "n.",
    lessonLabel: "درس 16 — واژه‌های زمان (۱): روزها، ماه‌ها و فصل‌ها"
  },
  {
    word: "October",
    meaning: "اکتبر",
    lesson: 16,
    pos: "n.",
    lessonLabel: "درس 16 — واژه‌های زمان (۱): روزها، ماه‌ها و فصل‌ها"
  },
  {
    word: "November",
    meaning: "نوامبر",
    lesson: 16,
    pos: "n.",
    lessonLabel: "درس 16 — واژه‌های زمان (۱): روزها، ماه‌ها و فصل‌ها"
  },
  {
    word: "December",
    meaning: "دسامبر",
    lesson: 16,
    pos: "n.",
    lessonLabel: "درس 16 — واژه‌های زمان (۱): روزها، ماه‌ها و فصل‌ها"
  },
  {
    word: "spring",
    meaning: "بهار",
    lesson: 16,
    pos: "n.",
    lessonLabel: "درس 16 — واژه‌های زمان (۱): روزها، ماه‌ها و فصل‌ها"
  },
  {
    word: "summer",
    meaning: "تابستان",
    lesson: 16,
    pos: "n.",
    lessonLabel: "درس 16 — واژه‌های زمان (۱): روزها، ماه‌ها و فصل‌ها"
  },
  {
    word: "autumn",
    meaning: "پاییز",
    lesson: 16,
    pos: "n.",
    lessonLabel: "درس 16 — واژه‌های زمان (۱): روزها، ماه‌ها و فصل‌ها"
  },
  {
    word: "winter",
    meaning: "زمستان",
    lesson: 16,
    pos: "n.",
    lessonLabel: "درس 16 — واژه‌های زمان (۱): روزها، ماه‌ها و فصل‌ها"
  },
  {
    word: "now",
    meaning: "اکنون، الان",
    lesson: 17,
    pos: "adv.",
    lessonLabel: "درس 17 — واژه‌های زمان (۲) (سال آینده، اغلب)"
  },
  {
    word: "then",
    meaning: "آنگاه، در آن زمان",
    lesson: 17,
    pos: "adv.",
    lessonLabel: "درس 17 — واژه‌های زمان (۲) (سال آینده، اغلب)"
  },
  {
    word: "ago",
    meaning: "پیش، قبل",
    lesson: 17,
    pos: "adv.",
    lessonLabel: "درس 17 — واژه‌های زمان (۲) (سال آینده، اغلب)"
  },
  {
    word: "an hour ago",
    meaning: "یک ساعت پیش",
    lesson: 17,
    pos: "phr.",
    lessonLabel: "درس 17 — واژه‌های زمان (۲) (سال آینده، اغلب)"
  },
  {
    word: "two years ago",
    meaning: "دو سال پیش",
    lesson: 17,
    pos: "phr.",
    lessonLabel: "درس 17 — واژه‌های زمان (۲) (سال آینده، اغلب)"
  },
  {
    word: "for two years",
    meaning: "به مدت دو سال",
    lesson: 17,
    pos: "phr.",
    lessonLabel: "درس 17 — واژه‌های زمان (۲) (سال آینده، اغلب)"
  },
  {
    word: "from 1994 to 1996",
    meaning: "از ۱۹۹۴ تا ۱۹۹۶",
    lesson: 17,
    pos: "phr.",
    lessonLabel: "درس 17 — واژه‌های زمان (۲) (سال آینده، اغلب)"
  },
  {
    word: "last year",
    meaning: "سال گذشته",
    lesson: 17,
    pos: "phr.",
    lessonLabel: "درس 17 — واژه‌های زمان (۲) (سال آینده، اغلب)"
  },
  {
    word: "last week",
    meaning: "هفتهٔ گذشته",
    lesson: 17,
    pos: "phr.",
    lessonLabel: "درس 17 — واژه‌های زمان (۲) (سال آینده، اغلب)"
  },
  {
    word: "last Saturday",
    meaning: "شنبهٔ گذشته",
    lesson: 17,
    pos: "phr.",
    lessonLabel: "درس 17 — واژه‌های زمان (۲) (سال آینده، اغلب)"
  },
  {
    word: "next year",
    meaning: "سال آینده",
    lesson: 17,
    pos: "phr.",
    lessonLabel: "درس 17 — واژه‌های زمان (۲) (سال آینده، اغلب)"
  },
  {
    word: "next week",
    meaning: "هفتهٔ آینده",
    lesson: 17,
    pos: "phr.",
    lessonLabel: "درس 17 — واژه‌های زمان (۲) (سال آینده، اغلب)"
  },
  {
    word: "next summer",
    meaning: "تابستان آینده",
    lesson: 17,
    pos: "phr.",
    lessonLabel: "درس 17 — واژه‌های زمان (۲) (سال آینده، اغلب)"
  },
  {
    word: "last month",
    meaning: "ماه گذشته",
    lesson: 17,
    pos: "phr.",
    lessonLabel: "درس 17 — واژه‌های زمان (۲) (سال آینده، اغلب)"
  },
  {
    word: "next month",
    meaning: "ماه آینده",
    lesson: 17,
    pos: "phr.",
    lessonLabel: "درس 17 — واژه‌های زمان (۲) (سال آینده، اغلب)"
  },
  {
    word: "the past",
    meaning: "گذشته",
    lesson: 17,
    pos: "n.",
    lessonLabel: "درس 17 — واژه‌های زمان (۲) (سال آینده، اغلب)"
  },
  {
    word: "the present",
    meaning: "حال، زمان حال",
    lesson: 17,
    pos: "n.",
    lessonLabel: "درس 17 — واژه‌های زمان (۲) (سال آینده، اغلب)"
  },
  {
    word: "the future",
    meaning: "آینده",
    lesson: 17,
    pos: "n.",
    lessonLabel: "درس 17 — واژه‌های زمان (۲) (سال آینده، اغلب)"
  },
  {
    word: "in a moment",
    meaning: "در یک لحظه (به‌زودی)",
    lesson: 17,
    pos: "phr.",
    lessonLabel: "درس 17 — واژه‌های زمان (۲) (سال آینده، اغلب)"
  },
  {
    word: "at the moment",
    meaning: "در حال حاضر",
    lesson: 17,
    pos: "phr.",
    lessonLabel: "درس 17 — واژه‌های زمان (۲) (سال آینده، اغلب)"
  },
  {
    word: "soon",
    meaning: "به‌زودی",
    lesson: 17,
    pos: "adv.",
    lessonLabel: "درس 17 — واژه‌های زمان (۲) (سال آینده، اغلب)"
  },
  {
    word: "recently",
    meaning: "اخیراً",
    lesson: 17,
    pos: "adv.",
    lessonLabel: "درس 17 — واژه‌های زمان (۲) (سال آینده، اغلب)"
  },
  {
    word: "always",
    meaning: "همیشه",
    lesson: 17,
    pos: "adv.",
    lessonLabel: "درس 17 — واژه‌های زمان (۲) (سال آینده، اغلب)"
  },
  {
    word: "often",
    meaning: "اغلب",
    lesson: 17,
    pos: "adv.",
    lessonLabel: "درس 17 — واژه‌های زمان (۲) (سال آینده، اغلب)"
  },
  {
    word: "now and then",
    meaning: "گاهی اوقات",
    lesson: 17,
    pos: "phr.",
    lessonLabel: "درس 17 — واژه‌های زمان (۲) (سال آینده، اغلب)"
  },
  {
    word: "not often",
    meaning: "زیاد نه",
    lesson: 17,
    pos: "phr.",
    lessonLabel: "درس 17 — واژه‌های زمان (۲) (سال آینده، اغلب)"
  },
  {
    word: "rarely",
    meaning: "به‌ندرت",
    lesson: 17,
    pos: "adv.",
    lessonLabel: "درس 17 — واژه‌های زمان (۲) (سال آینده، اغلب)"
  },
  {
    word: "usually",
    meaning: "معمولاً",
    lesson: 17,
    pos: "adv.",
    lessonLabel: "درس 17 — واژه‌های زمان (۲) (سال آینده، اغلب)"
  },
  {
    word: "sometimes",
    meaning: "گاهی",
    lesson: 17,
    pos: "adv.",
    lessonLabel: "درس 17 — واژه‌های زمان (۲) (سال آینده، اغلب)"
  },
  {
    word: "occasionally",
    meaning: "گهگاه",
    lesson: 17,
    pos: "adv.",
    lessonLabel: "درس 17 — واژه‌های زمان (۲) (سال آینده، اغلب)"
  },
  {
    word: "hardly ever",
    meaning: "تقریباً هرگز",
    lesson: 17,
    pos: "adv.",
    lessonLabel: "درس 17 — واژه‌های زمان (۲) (سال آینده، اغلب)"
  },
  {
    word: "never",
    meaning: "هرگز",
    lesson: 17,
    pos: "adv.",
    lessonLabel: "درس 17 — واژه‌های زمان (۲) (سال آینده، اغلب)"
  },
  {
    word: "once a week",
    meaning: "یک بار در هفته",
    lesson: 17,
    pos: "phr.",
    lessonLabel: "درس 17 — واژه‌های زمان (۲) (سال آینده، اغلب)"
  },
  {
    word: "twice a day",
    meaning: "دو بار در روز",
    lesson: 17,
    pos: "phr.",
    lessonLabel: "درس 17 — واژه‌های زمان (۲) (سال آینده، اغلب)"
  },
  {
    word: "three times a year",
    meaning: "سه بار در سال",
    lesson: 17,
    pos: "phr.",
    lessonLabel: "درس 17 — واژه‌های زمان (۲) (سال آینده، اغلب)"
  },
  {
    word: "four or five times a month",
    meaning: "چهار یا پنج بار در ماه",
    lesson: 17,
    pos: "phr.",
    lessonLabel: "درس 17 — واژه‌های زمان (۲) (سال آینده، اغلب)"
  },
  {
    word: "here",
    meaning: "اینجا",
    lesson: 18,
    pos: "adv.",
    lessonLabel: "درس 18 — مکان‌ها (وسط، جلو، خارج از کشور)"
  },
  {
    word: "there",
    meaning: "آنجا",
    lesson: 18,
    pos: "adv.",
    lessonLabel: "درس 18 — مکان‌ها (وسط، جلو، خارج از کشور)"
  },
  {
    word: "back",
    meaning: "برگشتن (به این‌جا دوباره)",
    lesson: 18,
    pos: "adv.",
    lessonLabel: "درس 18 — مکان‌ها (وسط، جلو، خارج از کشور)"
  },
  {
    word: "everywhere",
    meaning: "همه‌جا",
    lesson: 18,
    pos: "adv.",
    lessonLabel: "درس 18 — مکان‌ها (وسط، جلو، خارج از کشور)"
  },
  {
    word: "top",
    meaning: "بالا، قله",
    lesson: 18,
    pos: "n.",
    lessonLabel: "درس 18 — مکان‌ها (وسط، جلو، خارج از کشور)"
  },
  {
    word: "middle",
    meaning: "وسط",
    lesson: 18,
    pos: "n.",
    lessonLabel: "درس 18 — مکان‌ها (وسط، جلو، خارج از کشور)"
  },
  {
    word: "bottom",
    meaning: "پایین، ته",
    lesson: 18,
    pos: "n.",
    lessonLabel: "درس 18 — مکان‌ها (وسط، جلو، خارج از کشور)"
  },
  {
    word: "front",
    meaning: "جلو",
    lesson: 18,
    pos: "n.",
    lessonLabel: "درس 18 — مکان‌ها (وسط، جلو، خارج از کشور)"
  },
  {
    word: "side",
    meaning: "کنار، سمت",
    lesson: 18,
    pos: "n.",
    lessonLabel: "درس 18 — مکان‌ها (وسط، جلو، خارج از کشور)"
  },
  {
    word: "beginning",
    meaning: "ابتدا، آغاز",
    lesson: 18,
    pos: "n.",
    lessonLabel: "درس 18 — مکان‌ها (وسط، جلو، خارج از کشور)"
  },
  {
    word: "end",
    meaning: "انتها",
    lesson: 18,
    pos: "n.",
    lessonLabel: "درس 18 — مکان‌ها (وسط، جلو، خارج از کشور)"
  },
  {
    word: "left",
    meaning: "چپ",
    lesson: 18,
    pos: "adj.",
    lessonLabel: "درس 18 — مکان‌ها (وسط، جلو، خارج از کشور)"
  },
  {
    word: "right",
    meaning: "راست",
    lesson: 18,
    pos: "adj.",
    lessonLabel: "درس 18 — مکان‌ها (وسط، جلو، خارج از کشور)"
  },
  {
    word: "on the left",
    meaning: "سمت چپ",
    lesson: 18,
    pos: "phr.",
    lessonLabel: "درس 18 — مکان‌ها (وسط، جلو، خارج از کشور)"
  },
  {
    word: "on the right",
    meaning: "سمت راست",
    lesson: 18,
    pos: "phr.",
    lessonLabel: "درس 18 — مکان‌ها (وسط، جلو، خارج از کشور)"
  },
  {
    word: "at home",
    meaning: "در خانه",
    lesson: 18,
    pos: "phr.",
    lessonLabel: "درس 18 — مکان‌ها (وسط، جلو، خارج از کشور)"
  },
  {
    word: "out",
    meaning: "بیرون (از خانه)",
    lesson: 18,
    pos: "adv.",
    lessonLabel: "درس 18 — مکان‌ها (وسط، جلو، خارج از کشور)"
  },
  {
    word: "away",
    meaning: "دور (در شهر/کشور دیگر)",
    lesson: 18,
    pos: "adv.",
    lessonLabel: "درس 18 — مکان‌ها (وسط، جلو، خارج از کشور)"
  },
  {
    word: "abroad",
    meaning: "خارج از کشور",
    lesson: 18,
    pos: "adv.",
    lessonLabel: "درس 18 — مکان‌ها (وسط، جلو، خارج از کشور)"
  },
  {
    word: "fast",
    meaning: "سریع",
    lesson: 19,
    pos: "adj.",
    lessonLabel: "درس 19 — حالت و چگونگی (سریع، بلند)"
  },
  {
    word: "slow",
    meaning: "آهسته، کند",
    lesson: 19,
    pos: "adj.",
    lessonLabel: "درس 19 — حالت و چگونگی (سریع، بلند)"
  },
  {
    word: "slowly",
    meaning: "به‌آرامی، آهسته",
    lesson: 19,
    pos: "adv.",
    lessonLabel: "درس 19 — حالت و چگونگی (سریع، بلند)"
  },
  {
    word: "right",
    meaning: "درست",
    lesson: 19,
    pos: "adj.",
    lessonLabel: "درس 19 — حالت و چگونگی (سریع، بلند)"
  },
  {
    word: "wrong",
    meaning: "غلط، نادرست",
    lesson: 19,
    pos: "adj.",
    lessonLabel: "درس 19 — حالت و چگونگی (سریع، بلند)"
  },
  {
    word: "loud",
    meaning: "بلند (صدا)",
    lesson: 19,
    pos: "adj.",
    lessonLabel: "درس 19 — حالت و چگونگی (سریع، بلند)"
  },
  {
    word: "quiet",
    meaning: "آرام، ساکت",
    lesson: 19,
    pos: "adj.",
    lessonLabel: "درس 19 — حالت و چگونگی (سریع، بلند)"
  },
  {
    word: "quietly",
    meaning: "آرام، با صدای کم",
    lesson: 19,
    pos: "adv.",
    lessonLabel: "درس 19 — حالت و چگونگی (سریع، بلند)"
  },
  {
    word: "loudly",
    meaning: "با صدای بلند",
    lesson: 19,
    pos: "adv.",
    lessonLabel: "درس 19 — حالت و چگونگی (سریع، بلند)"
  },
  {
    word: "well",
    meaning: "خوب",
    lesson: 19,
    pos: "adv.",
    lessonLabel: "درس 19 — حالت و چگونگی (سریع، بلند)"
  },
  {
    word: "badly",
    meaning: "بد",
    lesson: 19,
    pos: "adv.",
    lessonLabel: "درس 19 — حالت و چگونگی (سریع، بلند)"
  },
  {
    word: "good",
    meaning: "خوب",
    lesson: 19,
    pos: "adj.",
    lessonLabel: "درس 19 — حالت و چگونگی (سریع، بلند)"
  },
  {
    word: "bad",
    meaning: "بد",
    lesson: 19,
    pos: "adj.",
    lessonLabel: "درس 19 — حالت و چگونگی (سریع، بلند)"
  },
  {
    word: "way",
    meaning: "شیوه، طرز",
    lesson: 19,
    pos: "n.",
    lessonLabel: "درس 19 — حالت و چگونگی (سریع، بلند)"
  },
  {
    word: "in a friendly way",
    meaning: "به شیوه‌ای دوستانه",
    lesson: 19,
    pos: "phr.",
    lessonLabel: "درس 19 — حالت و چگونگی (سریع، بلند)"
  },
  {
    word: "in an unfriendly way",
    meaning: "به شیوه‌ای نادوستانه",
    lesson: 19,
    pos: "phr.",
    lessonLabel: "درس 19 — حالت و چگونگی (سریع، بلند)"
  },
  {
    word: "apples",
    meaning: "سیب‌ها",
    lesson: 21,
    lessonLabel: "درس 21 — واژه‌های غیرقابل‌شمارش پرکاربرد (نان، پول)"
  },
  {
    word: "shoes",
    meaning: "کفش‌ها",
    lesson: 21,
    lessonLabel: "درس 21 — واژه‌های غیرقابل‌شمارش پرکاربرد (نان، پول)"
  },
  {
    word: "plates",
    meaning: "بشقاب‌ها",
    lesson: 21,
    lessonLabel: "درس 21 — واژه‌های غیرقابل‌شمارش پرکاربرد (نان، پول)"
  },
  {
    word: "sugar",
    meaning: "شکر",
    lesson: 21,
    lessonLabel: "درس 21 — واژه‌های غیرقابل‌شمارش پرکاربرد (نان، پول)"
  },
  {
    word: "money",
    meaning: "پول",
    lesson: 21,
    lessonLabel: "درس 21 — واژه‌های غیرقابل‌شمارش پرکاربرد (نان، پول)"
  },
  {
    word: "luggage",
    meaning: "چمدان و بار",
    lesson: 21,
    lessonLabel: "درس 21 — واژه‌های غیرقابل‌شمارش پرکاربرد (نان، پول)"
  },
  {
    word: "furniture",
    meaning: "مبلمان",
    lesson: 21,
    lessonLabel: "درس 21 — واژه‌های غیرقابل‌شمارش پرکاربرد (نان، پول)"
  },
  {
    word: "traffic",
    meaning: "ترافیک",
    lesson: 21,
    lessonLabel: "درس 21 — واژه‌های غیرقابل‌شمارش پرکاربرد (نان، پول)"
  },
  {
    word: "advice",
    meaning: "توصیه",
    lesson: 21,
    lessonLabel: "درس 21 — واژه‌های غیرقابل‌شمارش پرکاربرد (نان، پول)"
  },
  {
    word: "information",
    meaning: "اطلاعات",
    lesson: 21,
    lessonLabel: "درس 21 — واژه‌های غیرقابل‌شمارش پرکاربرد (نان، پول)"
  },
  {
    word: "news",
    meaning: "اخبار",
    lesson: 21,
    lessonLabel: "درس 21 — واژه‌های غیرقابل‌شمارش پرکاربرد (نان، پول)"
  },
  {
    word: "accommodation",
    meaning: "جا و مکان، اقامتگاه",
    lesson: 21,
    lessonLabel: "درس 21 — واژه‌های غیرقابل‌شمارش پرکاربرد (نان، پول)"
  },
  {
    word: "weather",
    meaning: "آب‌وهوا",
    lesson: 21,
    lessonLabel: "درس 21 — واژه‌های غیرقابل‌شمارش پرکاربرد (نان، پول)"
  },
  {
    word: "air",
    meaning: "هوا",
    lesson: 21,
    lessonLabel: "درس 21 — واژه‌های غیرقابل‌شمارش پرکاربرد (نان، پول)"
  },
  {
    word: "work",
    meaning: "کار",
    lesson: 21,
    lessonLabel: "درس 21 — واژه‌های غیرقابل‌شمارش پرکاربرد (نان، پول)"
  },
  {
    word: "travel",
    meaning: "سفر",
    lesson: 21,
    lessonLabel: "درس 21 — واژه‌های غیرقابل‌شمارش پرکاربرد (نان، پول)"
  },
  {
    word: "rice",
    meaning: "برنج",
    lesson: 21,
    lessonLabel: "درس 21 — واژه‌های غیرقابل‌شمارش پرکاربرد (نان، پول)"
  },
  {
    word: "spaghetti",
    meaning: "ماکارونی (اسپاگتی)",
    lesson: 21,
    lessonLabel: "درس 21 — واژه‌های غیرقابل‌شمارش پرکاربرد (نان، پول)"
  },
  {
    word: "butter",
    meaning: "کره",
    lesson: 21,
    lessonLabel: "درس 21 — واژه‌های غیرقابل‌شمارش پرکاربرد (نان، پول)"
  },
  {
    word: "bread",
    meaning: "نان",
    lesson: 21,
    lessonLabel: "درس 21 — واژه‌های غیرقابل‌شمارش پرکاربرد (نان، پول)"
  },
  {
    word: "milk",
    meaning: "شیر",
    lesson: 21,
    lessonLabel: "درس 21 — واژه‌های غیرقابل‌شمارش پرکاربرد (نان، پول)"
  },
  {
    word: "water",
    meaning: "آب",
    lesson: 21,
    lessonLabel: "درس 21 — واژه‌های غیرقابل‌شمارش پرکاربرد (نان، پول)"
  },
  {
    word: "tea",
    meaning: "چای",
    lesson: 21,
    lessonLabel: "درس 21 — واژه‌های غیرقابل‌شمارش پرکاربرد (نان، پول)"
  },
  {
    word: "coffee",
    meaning: "قهوه",
    lesson: 21,
    lessonLabel: "درس 21 — واژه‌های غیرقابل‌شمارش پرکاربرد (نان، پول)"
  },
  {
    word: "good",
    meaning: "خوب",
    lesson: 22,
    pos: "adj.",
    lessonLabel: "درس 22 — صفت‌های پرکاربرد: چیزهای خوب و بد (خوب، وحشتناک)"
  },
  {
    word: "better",
    meaning: "بهتر",
    lesson: 22,
    pos: "adj.",
    lessonLabel: "درس 22 — صفت‌های پرکاربرد: چیزهای خوب و بد (خوب، وحشتناک)"
  },
  {
    word: "best",
    meaning: "بهترین",
    lesson: 22,
    pos: "adj.",
    lessonLabel: "درس 22 — صفت‌های پرکاربرد: چیزهای خوب و بد (خوب، وحشتناک)"
  },
  {
    word: "nice",
    meaning: "خوش‌دل/قشنگ",
    lesson: 22,
    pos: "adj.",
    lessonLabel: "درس 22 — صفت‌های پرکاربرد: چیزهای خوب و بد (خوب، وحشتناک)"
  },
  {
    word: "lovely",
    meaning: "دلپذیر/دلنشین",
    lesson: 22,
    pos: "adj.",
    lessonLabel: "درس 22 — صفت‌های پرکاربرد: چیزهای خوب و بد (خوب، وحشتناک)"
  },
  {
    word: "wonderful",
    meaning: "شگفت‌انگیز/عالی",
    lesson: 22,
    pos: "adj.",
    lessonLabel: "درس 22 — صفت‌های پرکاربرد: چیزهای خوب و بد (خوب، وحشتناک)"
  },
  {
    word: "excellent",
    meaning: "فوق‌العاده خوب",
    lesson: 22,
    pos: "adj.",
    lessonLabel: "درس 22 — صفت‌های پرکاربرد: چیزهای خوب و بد (خوب، وحشتناک)"
  },
  {
    word: "Great",
    meaning: "عالی",
    lesson: 22,
    pos: "adj.",
    lessonLabel: "درس 22 — صفت‌های پرکاربرد: چیزهای خوب و بد (خوب، وحشتناک)"
  },
  {
    word: "Perfect",
    meaning: "کامل/بی‌نقص",
    lesson: 22,
    pos: "adj.",
    lessonLabel: "درس 22 — صفت‌های پرکاربرد: چیزهای خوب و بد (خوب، وحشتناک)"
  },
  {
    word: "bad",
    meaning: "بد",
    lesson: 22,
    pos: "adj.",
    lessonLabel: "درس 22 — صفت‌های پرکاربرد: چیزهای خوب و بد (خوب، وحشتناک)"
  },
  {
    word: "awful",
    meaning: "حالت، افتضاح",
    lesson: 22,
    pos: "adj.",
    lessonLabel: "درس 22 — صفت‌های پرکاربرد: چیزهای خوب و بد (خوب، وحشتناک)"
  },
  {
    word: "terrible",
    meaning: "وحشتناک",
    lesson: 22,
    pos: "adj.",
    lessonLabel: "درس 22 — صفت‌های پرکاربرد: چیزهای خوب و بد (خوب، وحشتناک)"
  },
  {
    word: "horrible",
    meaning: "زننده/فتضاح",
    lesson: 22,
    pos: "adj.",
    lessonLabel: "درس 22 — صفت‌های پرکاربرد: چیزهای خوب و بد (خوب، وحشتناک)"
  },
  {
    word: "not bad",
    meaning: "بد نیست (یعنی خوب)",
    lesson: 22,
    pos: "phr.",
    lessonLabel: "درس 22 — صفت‌های پرکاربرد: چیزهای خوب و بد (خوب، وحشتناک)"
  },
  {
    word: "nice",
    meaning: "خوب / دلپذیر",
    lesson: 23,
    pos: "adj.",
    lessonLabel: "درس 23 — صفت‌های پرکاربرد: آدم‌ها (خوشحال، نفرت‌انگیز)"
  },
  {
    word: "wonderful",
    meaning: "فوق‌العاده / عالی",
    lesson: 23,
    pos: "adj.",
    lessonLabel: "درس 23 — صفت‌های پرکاربرد: آدم‌ها (خوشحال، نفرت‌انگیز)"
  },
  {
    word: "kind",
    meaning: "مهربان",
    lesson: 23,
    pos: "adj.",
    lessonLabel: "درس 23 — صفت‌های پرکاربرد: آدم‌ها (خوشحال، نفرت‌انگیز)"
  },
  {
    word: "lovely",
    meaning: "دوست‌داشتنی",
    lesson: 23,
    pos: "adj.",
    lessonLabel: "درس 23 — صفت‌های پرکاربرد: آدم‌ها (خوشحال، نفرت‌انگیز)"
  },
  {
    word: "easy-going",
    meaning: "خوش‌برخورد / راحت",
    lesson: 23,
    pos: "adj.",
    lessonLabel: "درس 23 — صفت‌های پرکاربرد: آدم‌ها (خوشحال، نفرت‌انگیز)"
  },
  {
    word: "happy",
    meaning: "خوشحال",
    lesson: 23,
    pos: "adj.",
    lessonLabel: "درس 23 — صفت‌های پرکاربرد: آدم‌ها (خوشحال، نفرت‌انگیز)"
  },
  {
    word: "unhappy",
    meaning: "ناراضی / ناخوشحال",
    lesson: 23,
    pos: "adj.",
    lessonLabel: "درس 23 — صفت‌های پرکاربرد: آدم‌ها (خوشحال، نفرت‌انگیز)"
  },
  {
    word: "intelligent",
    meaning: "باهوش",
    lesson: 23,
    pos: "adj.",
    lessonLabel: "درس 23 — صفت‌های پرکاربرد: آدم‌ها (خوشحال، نفرت‌انگیز)"
  },
  {
    word: "horrible",
    meaning: "وحشتناک / بدجنس",
    lesson: 23,
    pos: "adj.",
    lessonLabel: "درس 23 — صفت‌های پرکاربرد: آدم‌ها (خوشحال، نفرت‌انگیز)"
  },
  {
    word: "difficult",
    meaning: "بدعنق / سخت",
    lesson: 23,
    pos: "adj.",
    lessonLabel: "درس 23 — صفت‌های پرکاربرد: آدم‌ها (خوشحال، نفرت‌انگیز)"
  },
  {
    word: "stupid",
    meaning: "احمق",
    lesson: 23,
    pos: "adj.",
    lessonLabel: "درس 23 — صفت‌های پرکاربرد: آدم‌ها (خوشحال، نفرت‌انگیز)"
  },
  {
    word: "selfish",
    meaning: "خودخواه",
    lesson: 23,
    pos: "adj.",
    lessonLabel: "درس 23 — صفت‌های پرکاربرد: آدم‌ها (خوشحال، نفرت‌انگیز)"
  },
  {
    word: "good",
    meaning: "خوب / خوش‌رفتار",
    lesson: 23,
    pos: "adj.",
    lessonLabel: "درس 23 — صفت‌های پرکاربرد: آدم‌ها (خوشحال، نفرت‌انگیز)"
  },
  {
    word: "well-behaved",
    meaning: "خوش‌رفتار",
    lesson: 23,
    pos: "adj.",
    lessonLabel: "درس 23 — صفت‌های پرکاربرد: آدم‌ها (خوشحال، نفرت‌انگیز)"
  },
  {
    word: "naughty",
    meaning: "شورشی / ناقلا",
    lesson: 23,
    pos: "adj.",
    lessonLabel: "درس 23 — صفت‌های پرکاربرد: آدم‌ها (خوشحال، نفرت‌انگیز)"
  },
  {
    word: "listen to",
    meaning: "گوش دادن به",
    lesson: 24,
    pos: "v.",
    lessonLabel: "درس 24 — واژه‌ها و حروف اضافه (منتظر بودن، ماهر بودن)"
  },
  {
    word: "wait for",
    meaning: "منتظر شدن",
    lesson: 24,
    pos: "v.",
    lessonLabel: "درس 24 — واژه‌ها و حروف اضافه (منتظر بودن، ماهر بودن)"
  },
  {
    word: "ask for",
    meaning: "درخواست کردن",
    lesson: 24,
    pos: "v.",
    lessonLabel: "درس 24 — واژه‌ها و حروف اضافه (منتظر بودن، ماهر بودن)"
  },
  {
    word: "pay for",
    meaning: "پرداخت کردن (پول چیزی)",
    lesson: 24,
    pos: "v.",
    lessonLabel: "درس 24 — واژه‌ها و حروف اضافه (منتظر بودن، ماهر بودن)"
  },
  {
    word: "belong to",
    meaning: "متعلق بودن به",
    lesson: 24,
    pos: "v.",
    lessonLabel: "درس 24 — واژه‌ها و حروف اضافه (منتظر بودن، ماهر بودن)"
  },
  {
    word: "think about",
    meaning: "فکر کردن دربارهٔ",
    lesson: 24,
    pos: "v.",
    lessonLabel: "درس 24 — واژه‌ها و حروف اضافه (منتظر بودن، ماهر بودن)"
  },
  {
    word: "thank (someone) for",
    meaning: "تشکر کردن از (کسی) بابت",
    lesson: 24,
    pos: "v.",
    lessonLabel: "درس 24 — واژه‌ها و حروف اضافه (منتظر بودن، ماهر بودن)"
  },
  {
    word: "apologise for",
    meaning: "عذرخواهی کردن بابت",
    lesson: 24,
    pos: "v.",
    lessonLabel: "درس 24 — واژه‌ها و حروف اضافه (منتظر بودن، ماهر بودن)"
  },
  {
    word: "look at",
    meaning: "نگاه کردن به",
    lesson: 24,
    pos: "v.",
    lessonLabel: "درس 24 — واژه‌ها و حروف اضافه (منتظر بودن، ماهر بودن)"
  },
  {
    word: "look for",
    meaning: "دنبال چیزی گشتن",
    lesson: 24,
    pos: "v.",
    lessonLabel: "درس 24 — واژه‌ها و حروف اضافه (منتظر بودن، ماهر بودن)"
  },
  {
    word: "look after",
    meaning: "مراقبت کردن از",
    lesson: 24,
    pos: "v.",
    lessonLabel: "درس 24 — واژه‌ها و حروف اضافه (منتظر بودن، ماهر بودن)"
  },
  {
    word: "look forward to",
    meaning: "بی‌صبرانه منتظر چیزی بودن",
    lesson: 24,
    pos: "v.",
    lessonLabel: "درس 24 — واژه‌ها و حروف اضافه (منتظر بودن، ماهر بودن)"
  },
  {
    word: "good at",
    meaning: "خوب در (کاری)",
    lesson: 24,
    pos: "adj.",
    lessonLabel: "درس 24 — واژه‌ها و حروف اضافه (منتظر بودن، ماهر بودن)"
  },
  {
    word: "bad at",
    meaning: "بد در (کاری)",
    lesson: 24,
    pos: "adj.",
    lessonLabel: "درس 24 — واژه‌ها و حروف اضافه (منتظر بودن، ماهر بودن)"
  },
  {
    word: "interested in",
    meaning: "علاقه‌مند به",
    lesson: 24,
    pos: "adj.",
    lessonLabel: "درس 24 — واژه‌ها و حروف اضافه (منتظر بودن، ماهر بودن)"
  },
  {
    word: "afraid of",
    meaning: "ترسیده از",
    lesson: 24,
    pos: "adj.",
    lessonLabel: "درس 24 — واژه‌ها و حروف اضافه (منتظر بودن، ماهر بودن)"
  },
  {
    word: "proud of",
    meaning: "مفتخر به",
    lesson: 24,
    pos: "adj.",
    lessonLabel: "درس 24 — واژه‌ها و حروف اضافه (منتظر بودن، ماهر بودن)"
  },
  {
    word: "used to",
    meaning: "عادت‌کرده به",
    lesson: 24,
    pos: "adj.",
    lessonLabel: "درس 24 — واژه‌ها و حروف اضافه (منتظر بودن، ماهر بودن)"
  },
  {
    word: "accustomed to",
    meaning: "خوگرفته به",
    lesson: 24,
    pos: "adj.",
    lessonLabel: "درس 24 — واژه‌ها و حروف اضافه (منتظر بودن، ماهر بودن)"
  },
  {
    word: "get used to",
    meaning: "عادت کردن به",
    lesson: 24,
    pos: "phr.",
    lessonLabel: "درس 24 — واژه‌ها و حروف اضافه (منتظر بودن، ماهر بودن)"
  },
  {
    word: "ex (+noun)",
    meaning: "پیشوند «اِکس» (همسر/مقام سابق؛ بود اما اکنون نیست)",
    lesson: 25,
    lessonLabel: "درس 25 — پیشوندها (ناممکن، رئیس‌سابق)"
  },
  {
    word: "ex-wife",
    meaning: "همسر سابق (زن مطلقه)",
    lesson: 25,
    lessonLabel: "درس 25 — پیشوندها (ناممکن، رئیس‌سابق)"
  },
  {
    word: "ex-president",
    meaning: "رئیس‌جمهور سابق",
    lesson: 25,
    lessonLabel: "درس 25 — پیشوندها (ناممکن، رئیس‌سابق)"
  },
  {
    word: "half (+noun or adjective)",
    meaning: "پیشوند «نیم/نصف» (۵۰٪ چیزی)",
    lesson: 25,
    lessonLabel: "درس 25 — پیشوندها (ناممکن، رئیس‌سابق)"
  },
  {
    word: "half-price",
    meaning: "نصف قیمت",
    lesson: 25,
    lessonLabel: "درس 25 — پیشوندها (ناممکن، رئیس‌سابق)"
  },
  {
    word: "half-hour",
    meaning: "نیم‌ساعت",
    lesson: 25,
    lessonLabel: "درس 25 — پیشوندها (ناممکن، رئیس‌سابق)"
  },
  {
    word: "in, im (+adjective)",
    meaning: "پیشوند «نفی» (ن+ صفت = نه/غیر...)",
    lesson: 25,
    lessonLabel: "درس 25 — پیشوندها (ناممکن، رئیس‌سابق)"
  },
  {
    word: "informal",
    meaning: "غیررسمی",
    lesson: 25,
    pos: "adj.",
    lessonLabel: "درس 25 — پیشوندها (ناممکن، رئیس‌سابق)"
  },
  {
    word: "impossible",
    meaning: "غیرممکن",
    lesson: 25,
    pos: "adj.",
    lessonLabel: "درس 25 — پیشوندها (ناممکن، رئیس‌سابق)"
  },
  {
    word: "non (+adjective or noun)",
    meaning: "پیشوند «غیر/بدون» (نفی)",
    lesson: 25,
    lessonLabel: "درس 25 — پیشوندها (ناممکن، رئیس‌سابق)"
  },
  {
    word: "non-smoking",
    meaning: "غیرسیگاری (ممنوع‌الاستعمال سیگار)",
    lesson: 25,
    pos: "adj.",
    lessonLabel: "درس 25 — پیشوندها (ناممکن، رئیس‌سابق)"
  },
  {
    word: "pre",
    meaning: "پیشوند «پیش/قبل» (قبل از)",
    lesson: 25,
    lessonLabel: "درس 25 — پیشوندها (ناممکن، رئیس‌سابق)"
  },
  {
    word: "pre-school",
    meaning: "پیش‌دبستانی (قبل از سن مدرسه)",
    lesson: 25,
    pos: "adj.",
    lessonLabel: "درس 25 — پیشوندها (ناممکن، رئیس‌سابق)"
  },
  {
    word: "re (+verb)",
    meaning: "پیشوند «دوباره» (تکرار فعل)",
    lesson: 25,
    lessonLabel: "درس 25 — پیشوندها (ناممکن، رئیس‌سابق)"
  },
  {
    word: "redo",
    meaning: "دوباره انجام دادن",
    lesson: 25,
    pos: "v.",
    lessonLabel: "درس 25 — پیشوندها (ناممکن، رئیس‌سابق)"
  },
  {
    word: "rewrite",
    meaning: "بازنویسی کردن",
    lesson: 25,
    pos: "v.",
    lessonLabel: "درس 25 — پیشوندها (ناممکن، رئیس‌سابق)"
  },
  {
    word: "un (+adjective or noun)",
    meaning: "پیشوند «نفی» (ن+ صفت/اسم = غیر...)",
    lesson: 25,
    lessonLabel: "درس 25 — پیشوندها (ناممکن، رئیس‌سابق)"
  },
  {
    word: "unhappy",
    meaning: "ناشاد، غمگین",
    lesson: 25,
    pos: "adj.",
    lessonLabel: "درس 25 — پیشوندها (ناممکن، رئیس‌سابق)"
  },
  {
    word: "unsafe",
    meaning: "ناایمن، خطرناک",
    lesson: 25,
    pos: "adj.",
    lessonLabel: "درس 25 — پیشوندها (ناممکن، رئیس‌سابق)"
  },
  {
    word: "formal",
    meaning: "رسمی",
    lesson: 25,
    pos: "adj.",
    lessonLabel: "درس 25 — پیشوندها (ناممکن، رئیس‌سابق)"
  },
  {
    word: "prefix",
    meaning: "پیشوند (اول کلمه)",
    lesson: 25,
    pos: "n.",
    lessonLabel: "درس 25 — پیشوندها (ناممکن، رئیس‌سابق)"
  },
  {
    word: "er, or (noun)",
    meaning: "پسوند سازنده اسم شخص (کارگر، شناگر، مربی)",
    lesson: 26,
    pos: "phr.",
    lessonLabel: "درس 26 — پسوندها (مفید، بی‌فایده)"
  },
  {
    word: "ful (adjective)",
    meaning: "پسوند «پر از» برای ساختن صفت",
    lesson: 26,
    pos: "phr.",
    lessonLabel: "درس 26 — پسوندها (مفید، بی‌فایده)"
  },
  {
    word: "ology (noun)",
    meaning: "پسوند «موضوع مطالعه/علم» برای ساختن اسم",
    lesson: 26,
    pos: "phr.",
    lessonLabel: "درس 26 — پسوندها (مفید، بی‌فایده)"
  },
  {
    word: "ics (noun, singular)",
    meaning: "پسوند «موضوع مطالعه» (اسم مفرد)",
    lesson: 26,
    pos: "phr.",
    lessonLabel: "درس 26 — پسوندها (مفید، بی‌فایده)"
  },
  {
    word: "less (adjective)",
    meaning: "پسوند «بدون/بی» برای ساختن صفت",
    lesson: 26,
    pos: "phr.",
    lessonLabel: "درس 26 — پسوندها (مفید، بی‌فایده)"
  },
  {
    word: "ly",
    meaning: "پسوندی که از صفت قید می‌سازد",
    lesson: 26,
    pos: "phr.",
    lessonLabel: "درس 26 — پسوندها (مفید، بی‌فایده)"
  },
  {
    word: "ness",
    meaning: "پسوندی که از صفت اسم انتزاعی می‌سازد",
    lesson: 26,
    pos: "phr.",
    lessonLabel: "درس 26 — پسوندها (مفید، بی‌فایده)"
  },
  {
    word: "y",
    meaning: "پسوندی که از اسم صفت می‌سازد",
    lesson: 26,
    pos: "phr.",
    lessonLabel: "درس 26 — پسوندها (مفید، بی‌فایده)"
  },
  {
    word: "worker",
    meaning: "کارگر",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — پسوندها (مفید، بی‌فایده)"
  },
  {
    word: "swimmer",
    meaning: "شناگر",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — پسوندها (مفید، بی‌فایده)"
  },
  {
    word: "instructor",
    meaning: "مربی",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — پسوندها (مفید، بی‌فایده)"
  },
  {
    word: "cooker",
    meaning: "اجاق گاز",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — پسوندها (مفید، بی‌فایده)"
  },
  {
    word: "word processor",
    meaning: "واژه‌پرداز (نرم‌افزار تایپ)",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — پسوندها (مفید، بی‌فایده)"
  },
  {
    word: "useful",
    meaning: "مفید",
    lesson: 26,
    pos: "adj.",
    lessonLabel: "درس 26 — پسوندها (مفید، بی‌فایده)"
  },
  {
    word: "beautiful",
    meaning: "زیبا",
    lesson: 26,
    pos: "adj.",
    lessonLabel: "درس 26 — پسوندها (مفید، بی‌فایده)"
  },
  {
    word: "sociology",
    meaning: "جامعه‌شناسی",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — پسوندها (مفید، بی‌فایده)"
  },
  {
    word: "psychology",
    meaning: "روان‌شناسی",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — پسوندها (مفید، بی‌فایده)"
  },
  {
    word: "economics",
    meaning: "اقتصاد",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — پسوندها (مفید، بی‌فایده)"
  },
  {
    word: "politics",
    meaning: "سیاست",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — پسوندها (مفید، بی‌فایده)"
  },
  {
    word: "useless",
    meaning: "بی‌فایده",
    lesson: 26,
    pos: "adj.",
    lessonLabel: "درس 26 — پسوندها (مفید، بی‌فایده)"
  },
  {
    word: "endless",
    meaning: "بی‌پایان",
    lesson: 26,
    pos: "adj.",
    lessonLabel: "درس 26 — پسوندها (مفید، بی‌فایده)"
  },
  {
    word: "sadly",
    meaning: "با غم، متأسفانه",
    lesson: 26,
    pos: "adv.",
    lessonLabel: "درس 26 — پسوندها (مفید، بی‌فایده)"
  },
  {
    word: "happily",
    meaning: "با خوشحالی",
    lesson: 26,
    pos: "adv.",
    lessonLabel: "درس 26 — پسوندها (مفید، بی‌فایده)"
  },
  {
    word: "happiness",
    meaning: "خوشبختی",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — پسوندها (مفید، بی‌فایده)"
  },
  {
    word: "sadness",
    meaning: "غم",
    lesson: 26,
    pos: "n.",
    lessonLabel: "درس 26 — پسوندها (مفید، بی‌فایده)"
  },
  {
    word: "sandy",
    meaning: "شنی",
    lesson: 26,
    pos: "adj.",
    lessonLabel: "درس 26 — پسوندها (مفید، بی‌فایده)"
  },
  {
    word: "sunny",
    meaning: "آفتابی",
    lesson: 26,
    pos: "adj.",
    lessonLabel: "درس 26 — پسوندها (مفید، بی‌فایده)"
  },
  {
    word: "quite",
    meaning: "کاملاً، نسبتاً",
    lesson: 27,
    pos: "adv.",
    lessonLabel: "درس 27 — واژه‌های گیج‌کننده (quick/quiet؛ lend/borrow)"
  },
  {
    word: "quiet",
    meaning: "آرام، ساکت",
    lesson: 27,
    pos: "adj.",
    lessonLabel: "درس 27 — واژه‌های گیج‌کننده (quick/quiet؛ lend/borrow)"
  },
  {
    word: "lose",
    meaning: "گم کردن",
    lesson: 27,
    pos: "v.",
    lessonLabel: "درس 27 — واژه‌های گیج‌کننده (quick/quiet؛ lend/borrow)"
  },
  {
    word: "loose",
    meaning: "گشاد، آزاد",
    lesson: 27,
    pos: "adj.",
    lessonLabel: "درس 27 — واژه‌های گیج‌کننده (quick/quiet؛ lend/borrow)"
  },
  {
    word: "fell",
    meaning: "افتاد (از fall)",
    lesson: 27,
    lessonLabel: "درس 27 — واژه‌های گیج‌کننده (quick/quiet؛ lend/borrow)"
  },
  {
    word: "felt",
    meaning: "حس کرد (از feel)",
    lesson: 27,
    lessonLabel: "درس 27 — واژه‌های گیج‌کننده (quick/quiet؛ lend/borrow)"
  },
  {
    word: "cooker",
    meaning: "اجاق گاز / وسیله پخت‌وپز",
    lesson: 27,
    pos: "n.",
    lessonLabel: "درس 27 — واژه‌های گیج‌کننده (quick/quiet؛ lend/borrow)"
  },
  {
    word: "cook",
    meaning: "آشپز (شخص) / پختن",
    lesson: 27,
    pos: "n.",
    lessonLabel: "درس 27 — واژه‌های گیج‌کننده (quick/quiet؛ lend/borrow)"
  },
  {
    word: "lend",
    meaning: "قرض دادن",
    lesson: 27,
    pos: "v.",
    lessonLabel: "درس 27 — واژه‌های گیج‌کننده (quick/quiet؛ lend/borrow)"
  },
  {
    word: "borrow",
    meaning: "قرض گرفتن",
    lesson: 27,
    pos: "v.",
    lessonLabel: "درس 27 — واژه‌های گیج‌کننده (quick/quiet؛ lend/borrow)"
  },
  {
    word: "check",
    meaning: "بررسی کردن",
    lesson: 27,
    pos: "v.",
    lessonLabel: "درس 27 — واژه‌های گیج‌کننده (quick/quiet؛ lend/borrow)"
  },
  {
    word: "control",
    meaning: "کنترل کردن",
    lesson: 27,
    pos: "v.",
    lessonLabel: "درس 27 — واژه‌های گیج‌کننده (quick/quiet؛ lend/borrow)"
  },
  {
    word: "afternoon",
    meaning: "بعدازظهر",
    lesson: 27,
    pos: "n.",
    lessonLabel: "درس 27 — واژه‌های گیج‌کننده (quick/quiet؛ lend/borrow)"
  },
  {
    word: "evening",
    meaning: "عصر",
    lesson: 27,
    pos: "n.",
    lessonLabel: "درس 27 — واژه‌های گیج‌کننده (quick/quiet؛ lend/borrow)"
  },
  {
    word: "night",
    meaning: "شب",
    lesson: 27,
    pos: "n.",
    lessonLabel: "درس 27 — واژه‌های گیج‌کننده (quick/quiet؛ lend/borrow)"
  },
  {
    word: "waiting for",
    meaning: "منتظر بودن",
    lesson: 27,
    lessonLabel: "درس 27 — واژه‌های گیج‌کننده (quick/quiet؛ lend/borrow)"
  },
  {
    word: "hope",
    meaning: "امیدوار بودن",
    lesson: 27,
    pos: "v.",
    lessonLabel: "درس 27 — واژه‌های گیج‌کننده (quick/quiet؛ lend/borrow)"
  },
  {
    word: "expect",
    meaning: "انتظار داشتن",
    lesson: 27,
    pos: "v.",
    lessonLabel: "درس 27 — واژه‌های گیج‌کننده (quick/quiet؛ lend/borrow)"
  },
  {
    word: "have a baby",
    meaning: "بچه به دنیا آوردن",
    lesson: 28,
    pos: "phr.",
    lessonLabel: "درس 28 — تولد، ازدواج و مرگ (تولد، متأهل)"
  },
  {
    word: "be born",
    meaning: "به دنیا آمدن",
    lesson: 28,
    pos: "phr.",
    lessonLabel: "درس 28 — تولد، ازدواج و مرگ (تولد، متأهل)"
  },
  {
    word: "weigh",
    meaning: "وزن داشتن",
    lesson: 28,
    pos: "v.",
    lessonLabel: "درس 28 — تولد، ازدواج و مرگ (تولد، متأهل)"
  },
  {
    word: "call (him John)",
    meaning: "اسم گذاشتن (او را جان صدا زدن)",
    lesson: 28,
    pos: "v.",
    lessonLabel: "درس 28 — تولد، ازدواج و مرگ (تولد، متأهل)"
  },
  {
    word: "birthday",
    meaning: "تولد",
    lesson: 28,
    pos: "n.",
    lessonLabel: "درس 28 — تولد، ازدواج و مرگ (تولد، متأهل)"
  },
  {
    word: "single",
    meaning: "مجرد",
    lesson: 28,
    pos: "adj.",
    lessonLabel: "درس 28 — تولد، ازدواج و مرگ (تولد، متأهل)"
  },
  {
    word: "married",
    meaning: "متأهل",
    lesson: 28,
    pos: "adj.",
    lessonLabel: "درس 28 — تولد، ازدواج و مرگ (تولد، متأهل)"
  },
  {
    word: "widowed",
    meaning: "بیوه",
    lesson: 28,
    pos: "adj.",
    lessonLabel: "درس 28 — تولد، ازدواج و مرگ (تولد، متأهل)"
  },
  {
    word: "separated",
    meaning: "جدا شده",
    lesson: 28,
    pos: "adj.",
    lessonLabel: "درس 28 — تولد، ازدواج و مرگ (تولد، متأهل)"
  },
  {
    word: "divorced",
    meaning: "مطلقه",
    lesson: 28,
    pos: "adj.",
    lessonLabel: "درس 28 — تولد، ازدواج و مرگ (تولد، متأهل)"
  },
  {
    word: "wedding",
    meaning: "عروسی",
    lesson: 28,
    pos: "n.",
    lessonLabel: "درس 28 — تولد، ازدواج و مرگ (تولد، متأهل)"
  },
  {
    word: "bride",
    meaning: "عروس",
    lesson: 28,
    pos: "n.",
    lessonLabel: "درس 28 — تولد، ازدواج و مرگ (تولد، متأهل)"
  },
  {
    word: "(bride)groom",
    meaning: "داماد",
    lesson: 28,
    pos: "n.",
    lessonLabel: "درس 28 — تولد، ازدواج و مرگ (تولد، متأهل)"
  },
  {
    word: "get married",
    meaning: "ازدواج کردن",
    lesson: 28,
    pos: "phr.",
    lessonLabel: "درس 28 — تولد، ازدواج و مرگ (تولد، متأهل)"
  },
  {
    word: "church",
    meaning: "کلیسا",
    lesson: 28,
    pos: "n.",
    lessonLabel: "درس 28 — تولد، ازدواج و مرگ (تولد، متأهل)"
  },
  {
    word: "go on honeymoon",
    meaning: "رفتن به ماه عسل",
    lesson: 28,
    pos: "phr.",
    lessonLabel: "درس 28 — تولد، ازدواج و مرگ (تولد، متأهل)"
  },
  {
    word: "become ill",
    meaning: "بیمار شدن",
    lesson: 28,
    pos: "phr.",
    lessonLabel: "درس 28 — تولد، ازدواج و مرگ (تولد، متأهل)"
  },
  {
    word: "die",
    meaning: "مردن",
    lesson: 28,
    pos: "v.",
    lessonLabel: "درس 28 — تولد، ازدواج و مرگ (تولد، متأهل)"
  },
  {
    word: "dead",
    meaning: "مرده",
    lesson: 28,
    pos: "adj.",
    lessonLabel: "درس 28 — تولد، ازدواج و مرگ (تولد، متأهل)"
  },
  {
    word: "death",
    meaning: "مرگ",
    lesson: 28,
    pos: "n.",
    lessonLabel: "درس 28 — تولد، ازدواج و مرگ (تولد، متأهل)"
  },
  {
    word: "funeral",
    meaning: "مراسم تشییع جنازه",
    lesson: 28,
    pos: "n.",
    lessonLabel: "درس 28 — تولد، ازدواج و مرگ (تولد، متأهل)"
  },
  {
    word: "relative(s)",
    meaning: "خویشاوند(ها)",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — خانواده (مادر، دایی/عمو)"
  },
  {
    word: "relation(s)",
    meaning: "بستگان",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — خانواده (مادر، دایی/عمو)"
  },
  {
    word: "husband",
    meaning: "شوهر",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — خانواده (مادر، دایی/عمو)"
  },
  {
    word: "wife",
    meaning: "همسر (زن)",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — خانواده (مادر، دایی/عمو)"
  },
  {
    word: "father",
    meaning: "پدر",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — خانواده (مادر، دایی/عمو)"
  },
  {
    word: "mother",
    meaning: "مادر",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — خانواده (مادر، دایی/عمو)"
  },
  {
    word: "parents",
    meaning: "والدین",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — خانواده (مادر، دایی/عمو)"
  },
  {
    word: "daughter",
    meaning: "دختر (فرزند)",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — خانواده (مادر، دایی/عمو)"
  },
  {
    word: "son",
    meaning: "پسر (فرزند)",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — خانواده (مادر، دایی/عمو)"
  },
  {
    word: "sister",
    meaning: "خواهر",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — خانواده (مادر، دایی/عمو)"
  },
  {
    word: "brother",
    meaning: "برادر",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — خانواده (مادر، دایی/عمو)"
  },
  {
    word: "grandfather",
    meaning: "پدربزرگ",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — خانواده (مادر، دایی/عمو)"
  },
  {
    word: "grandmother",
    meaning: "مادربزرگ",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — خانواده (مادر، دایی/عمو)"
  },
  {
    word: "grandparents",
    meaning: "پدربزرگ و مادربزرگ",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — خانواده (مادر، دایی/عمو)"
  },
  {
    word: "granddaughter",
    meaning: "نوهٔ دختر",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — خانواده (مادر، دایی/عمو)"
  },
  {
    word: "grandson",
    meaning: "نوهٔ پسر",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — خانواده (مادر، دایی/عمو)"
  },
  {
    word: "uncles",
    meaning: "دایی/عموها",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — خانواده (مادر، دایی/عمو)"
  },
  {
    word: "aunts",
    meaning: "خاله/عمه‌ها",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — خانواده (مادر، دایی/عمو)"
  },
  {
    word: "niece",
    meaning: "برادرزاده/خواهرزاده",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — خانواده (مادر، دایی/عمو)"
  },
  {
    word: "nephew",
    meaning: "برادرزاده/خواهرزاده (پسر)",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — خانواده (مادر، دایی/عمو)"
  },
  {
    word: "cousins",
    meaning: "پسرعمو/دخترعموها و...",
    lesson: 29,
    pos: "n.",
    lessonLabel: "درس 29 — خانواده (مادر، دایی/عمو)"
  },
  {
    word: "hair",
    meaning: "مو",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — اعضای بدن (سر، پا)"
  },
  {
    word: "eye",
    meaning: "چشم",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — اعضای بدن (سر، پا)"
  },
  {
    word: "ear",
    meaning: "گوش",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — اعضای بدن (سر، پا)"
  },
  {
    word: "nose",
    meaning: "بینی",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — اعضای بدن (سر، پا)"
  },
  {
    word: "mouth",
    meaning: "دهان",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — اعضای بدن (سر، پا)"
  },
  {
    word: "lip",
    meaning: "لب",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — اعضای بدن (سر، پا)"
  },
  {
    word: "tooth (teeth)",
    meaning: "دندان",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — اعضای بدن (سر، پا)"
  },
  {
    word: "neck",
    meaning: "گردن",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — اعضای بدن (سر، پا)"
  },
  {
    word: "shoulder",
    meaning: "شانه",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — اعضای بدن (سر، پا)"
  },
  {
    word: "arm",
    meaning: "بازو",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — اعضای بدن (سر، پا)"
  },
  {
    word: "thumb",
    meaning: "شست دست",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — اعضای بدن (سر، پا)"
  },
  {
    word: "nail",
    meaning: "ناخن",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — اعضای بدن (سر، پا)"
  },
  {
    word: "finger",
    meaning: "انگشت",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — اعضای بدن (سر، پا)"
  },
  {
    word: "hand",
    meaning: "دست",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — اعضای بدن (سر، پا)"
  },
  {
    word: "leg",
    meaning: "پا",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — اعضای بدن (سر، پا)"
  },
  {
    word: "knee",
    meaning: "زانو",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — اعضای بدن (سر، پا)"
  },
  {
    word: "foot (feet)",
    meaning: "پا (کف پا)",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — اعضای بدن (سر، پا)"
  },
  {
    word: "toe",
    meaning: "انگشت پا",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — اعضای بدن (سر، پا)"
  },
  {
    word: "chest / bust (women only)",
    meaning: "سینه (فقط زنان)",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — اعضای بدن (سر، پا)"
  },
  {
    word: "skin",
    meaning: "پوست",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — اعضای بدن (سر، پا)"
  },
  {
    word: "back",
    meaning: "پشت",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — اعضای بدن (سر، پا)"
  },
  {
    word: "side",
    meaning: "پهلو",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — اعضای بدن (سر، پا)"
  },
  {
    word: "waist",
    meaning: "کمر",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — اعضای بدن (سر، پا)"
  },
  {
    word: "stomach",
    meaning: "شکم",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — اعضای بدن (سر، پا)"
  },
  {
    word: "hips",
    meaning: "باسن",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — اعضای بدن (سر، پا)"
  },
  {
    word: "heart",
    meaning: "قلب",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — اعضای بدن (سر، پا)"
  },
  {
    word: "brain",
    meaning: "مغز",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — اعضای بدن (سر، پا)"
  },
  {
    word: "blood",
    meaning: "خون",
    lesson: 30,
    pos: "n.",
    lessonLabel: "درس 30 — اعضای بدن (سر، پا)"
  }
];

export const VOCAB_PART_2: Row[] = ROWS;
