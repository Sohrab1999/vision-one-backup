// واژگان درس‌های English Vocabulary in Use — Advanced (پارتیت 3) — فاز A5
// word = عین چاپ کتاب (mini-dict) · meaning = ترجمهٔ ماشینی GLM (کلاس FA-NEW — اثبات صحت ترجمه نیست)
// pos ثبت نشده — در mini-dict چاپی کتاب چهارم pos چاپ نشده است (runtimeMapping ثبت‌شده)
import type { VocabWord } from "../types";

type Row = Omit<VocabWord, "lesson"> & { lesson: number; lessonLabel: string };

const ROWS: Row[] = [
  {
    word: "Lobby",
    meaning: "سعی کردن تحت تأثیر قرار دادن نظرات نمایندگان مجلس و لردها",
    lesson: 41,
    lessonLabel: "درس 41 — سیاست بریتانیا",
  },
  {
    word: "null",
    meaning: "فرآیند رسمی که شامل ارسال درخواست کتبی به یک نماینده مجلس، با رعایت قالب مشخص، و سپس ارائه آن به مجلس عوام توسط نماینده است",
    lesson: 41,
    lessonLabel: "درس 41 — سیاست بریتانیا",
  },
  {
    word: "legislation",
    meaning: "قوانین بالقوه آینده",
    lesson: 41,
    lessonLabel: "درس 41 — سیاست بریتانیا",
  },
  {
    word: "stage",
    meaning: "دوره‌ای پس از اینکه لایحه پیشنهادی توسط مجلس بحث شده است و در آن توسط گروهی از افراد به طور دقیق بررسی می‌شود",
    lesson: 41,
    lessonLabel: "درس 41 — سیاست بریتانیا",
  },
  {
    word: "Bill",
    meaning: "پیشنهاد قانونی که در حال حاضر در حال بحث است",
    lesson: 41,
    lessonLabel: "درس 41 — سیاست بریتانیا",
  },
  {
    word: "Committee",
    meaning: "کمیته که جنبه‌ای از کار دولت را بررسی و گزارش می‌کند",
    lesson: 41,
    lessonLabel: "درس 41 — سیاست بریتانیا",
  },
  {
    word: "scrutinising",
    meaning: "به طور بسیار دقیق بررسی کردن",
    lesson: 41,
    lessonLabel: "درس 41 — سیاست بریتانیا",
  },
  {
    word: "impeded",
    meaning: "مرتبط با قلب و خون / بیماری در بدن نمی‌تواند با گلوکز [شکر] کنار بیاید زیرا انسولین کافی تولید نمی‌کند [هورمونی که سطح شکر در بدن را کنترل می‌کند]",
    lesson: 54,
    lessonLabel: "درس 54 — رژیم غذایی، ورزش و تناسب اندام",
  },
  {
    word: "cholesterol",
    meaning: "در ورزش خوب یا علاقه‌مند باشد",
    lesson: 54,
    lessonLabel: "درس 54 — رژیم غذایی، ورزش و تناسب اندام",
  },
  {
    word: "stroke",
    meaning: "نرخ هضم غذا در بدن شما",
    lesson: 54,
    lessonLabel: "درس 54 — رژیم غذایی، ورزش و تناسب اندام",
  },
  {
    word: "nutritious",
    meaning: "شاخص توده بدن (BMI) – مقدار چربی در بدن شما به عنوان نسبت وزن شما",
    lesson: 54,
    lessonLabel: "درس 54 — رژیم غذایی، ورزش و تناسب اندام",
  },
  {
    word: "danger",
    meaning: "مصمم به",
    lesson: 54,
    lessonLabel: "درس 54 — رژیم غذایی، ورزش و تناسب اندام",
  },
  {
    word: "fibre",
    meaning: "سریع و پرانرژی",
    lesson: 54,
    lessonLabel: "درس 54 — رژیم غذایی، ورزش و تناسب اندام",
  },
];

export const VOCAB_PART_3: Row[] = ROWS;
