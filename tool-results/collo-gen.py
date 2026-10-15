#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Generate src/data/collocations/*.ts from collo-extract.json + collo-fa.json (translation may be partial)."""
import json, re, os

EX = json.load(open("/home/z/my-project/tool-results/collo-extract.json"))
FA_PATH = "/home/z/my-project/tool-results/collo-fa.json"
FA = json.load(open(FA_PATH)) if os.path.exists(FA_PATH) else {}
OUTDIR = "/home/z/my-project/src/data/collocations"
os.makedirs(OUTDIR, exist_ok=True)

TOPIC_FA = {
    1: "خانواده", 2: "روابط", 3: "ظاهر و چهره", 4: "شخصیت و رفتار", 5: "احساسات",
    6: "خانه و آپارتمان", 7: "خوراک", 8: "فیلم و کتاب", 9: "موسیقی", 10: "ورزش",
    11: "سلامتی و بیماری", 12: "رایانه", 13: "تحصیل", 14: "زبان آکادمیک", 15: "کار",
    16: "کسب‌وکار", 17: "پول", 18: "سفر", 19: "هوا", 20: "شهر",
    21: "حومه و روستا", 22: "جرم", 23: "قانون و دادگستری", 24: "جنگ و صلح", 25: "مسائل جهانی",
    26: "زمان", 27: "صدا", 28: "اندازه", 29: "نور", 30: "رنگ",
    31: "بافت", 32: "بو", 33: "طعم", 34: "آمار", 35: "حرکت و سرعت",
    36: "تغییرات", 37: "گفتار", 38: "شروع و پایان", 39: "موفقیت و شکست", 40: "علت و معلول",
    41: "خاطرات", 42: "موافقت و مخالفت", 43: "باور و تردید", 44: "تصمیم و انتخاب", 45: "ادعا و انکار",
    46: "علاقه و بیزاری", 47: "تحسین و نقد", 48: "استعاره", 49: "واژه‌های گیج‌کننده", 50: "افعال روزمره",
}
COLORS = ["emerald", "teal", "violet", "amber", "rose", "orange"]

def ts_str(s):
    if s is None:
        s = ""
    s = str(s).replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")
    return s

def fa_num(n):
    return str(n).translate(str.maketrans("0123456789", "۰۱۲۳۴۵۶۷۸۹"))

# ── book-meta.ts ──
chapters = []
for L in EX["lessons"]:
    n = L["num"]
    tr = FA.get(str(n)) or FA.get(n) or {}
    title_fa = tr.get("titleFa") or TOPIC_FA.get(n, "")
    quote_en = tr.get("quoteEn") or ((L["paragraphs"][0].split(". ")[0] + ".") if L["paragraphs"] else L["topic"])
    quote_fa = tr.get("quoteFa") or ""
    chapters.append(f"""  {{
    id: {n},
    number: "درس {fa_num(n)}",
    title: `{ts_str(L['topic'])}`,
    titleFa: `{ts_str(title_fa)}`,
    quote: {{
      en: `{ts_str(quote_en)}`,
      fa: `{ts_str(quote_fa)}`,
      source: "1000 English Collocations — Espresso English",
    }},
    minutes: 10,
    color: "{COLORS[(n - 1) % 6]}",
    grammarTopics: [],
  }}""")

book_meta = f"""// داده‌های متای کتاب «۱۰۰۰ کالوکیشن کاربردی» — 1000 English Collocations in 10 Minutes a Day
// منبع: Shayna Oliveira / Espresso English (۲۰۱۳) — استخراج خودکار از PDF آپلودشده کاربر
import type {{ ChapterMeta, BookInfo }} from "../types";

export const BOOK_INFO: BookInfo = {{
  title: "۱۰۰۰ کالوکیشن کاربردی",
  subtitle: "1000 English Collocations in 10 Minutes a Day",
  author: "Shayna Oliveira — Espresso English",
  edition: "ویرایش ۲۰۱۳ — ۵۰ درس",
  price: "رایگان",
  telegram: "@PracticalEnglishInKonkour",
}};

export const CHAPTERS: ChapterMeta[] = [
{",\n".join(chapters)}
];
"""
open(f"{OUTDIR}/book-meta.ts", "w", encoding="utf-8").write(book_meta)

# ── quiz-seed.ts ──
seed_items = []
count = 0
for L in EX["lessons"]:
    n = L["num"]
    title_fa = (FA.get(str(n)) or FA.get(n) or {}).get("titleFa") or TOPIC_FA.get(n, "")
    for q in L["quiz"]:
        count += 1
        opts = ", ".join(f"`{ts_str(o)}`" for o in q["options"])
        seed_items.append(f"""  {{
    category: "vocabulary",
    lesson: {n},
    scope: `درس {fa_num(n)} — {ts_str(title_fa)}`,
    text: `{ts_str(q['text'])}`,
    options: [{opts}],
    answer: {q['answer']},
    level: "آموزشی",
  }}""")

quiz_seed = f"""// بانک سؤال کتاب کالوکیشن‌ها — استخراج‌شده از کوئیزهای ۵۰ درس کتاب (۳ فرمت: چندگزینه‌ای خطی، حرف‌دار، جای‌خالی با بانک واژه)
// scope/lesson مطابق قرارداد QuizQuestionSeed — پاسخ هر سؤال از کلید پاسخ خود کتاب
import type {{ QuizQuestionSeed }} from "../types";

export const QUIZ_SEED: QuizQuestionSeed[] = [
{",\n".join(seed_items)}
];

export const QUESTION_COUNTS = {{
  grammar: 0,
  vocabulary: QUIZ_SEED.length,
  total: QUIZ_SEED.length,
}};
"""
open(f"{OUTDIR}/quiz-seed.ts", "w", encoding="utf-8").write(quiz_seed)

# ── readings.ts (needs translation; fa falls back to "") ──
readings = []
for L in EX["lessons"]:
    n = L["num"]
    tr = FA.get(str(n)) or FA.get(n) or {}
    title_fa = tr.get("titleFa") or TOPIC_FA.get(n, "")
    paras_fa = tr.get("paragraphsFa") or []
    paras = []
    for i, p in enumerate(L["paragraphs"]):
        fa_p = paras_fa[i] if i < len(paras_fa) else ""
        paras.append(f"""      {{ en: `{ts_str(p)}`, fa: `{ts_str(fa_p)}` }}""")
    readings.append(f"""  {{
    id: "collo-{n}",
    lesson: {n},
    title: `Lesson {n} — {ts_str(L['topic'])}`,
    titleFa: `{ts_str(title_fa)}`,
    source: "1000 English Collocations — Lesson {fa_num(n)}",
    paragraphs: [
{",\n".join(paras)}
    ],
  }}""")

readings_ts = f"""// متن کامل ۵۰ درس کتاب کالوکیشن‌ها به‌شکل Reading (متن انگلیسی + ترجمهٔ فارسی)
// هر درس = یک Reading؛ ترجمهٔ فارسی به‌صورت خودکار تولید شده است
import type {{ Reading }} from "../types";

export const READING_LIST: Reading[] = [
{",\n".join(readings)}
];
"""
open(f"{OUTDIR}/readings.ts", "w", encoding="utf-8").write(readings_ts)

# ── vocab.ts — عبارت‌های کالوکیشن (گذر ۲) + گِلاس واژه‌های پاسخ (گذر ۱) ──
PHR = {}
if os.path.exists("/home/z/my-project/tool-results/collo-phrases.json"):
    PHR = json.load(open("/home/z/my-project/tool-results/collo-phrases.json"))
vocab_by_lesson = {}
total_gloss = 0
total_phr = 0
for L in EX["lessons"]:
    n = L["num"]
    tr = FA.get(str(n)) or FA.get(n) or {}
    gl = tr.get("glosses") or {}
    label = f"درس {fa_num(n)} — {tr.get('titleFa') or TOPIC_FA.get(n, '')}"
    entries = []
    seen = set()
    # ۱) کالوکیشن‌های کامل استخراج‌شده از متن درس (قلب کتاب)
    for it in (PHR.get(str(n)) or PHR.get(n) or []):
        key = it["p"].lower()
        if key in seen:
            continue
        seen.add(key)
        total_phr += 1
        entries.append((it["p"], it["fa"], "phr."))
    # ۲) گِلاس واژه‌های پاسخِ کوئیز (واژه‌های تکی که در عبارت‌ها نیستند)
    for q in L["quiz"]:
        w = q["options"][q["answer"]]
        key = w.lower()
        if key in seen:
            continue
        seen.add(key)
        meaning = gl.get(w) or gl.get(w.lower()) or ""
        if not meaning:
            continue
        total_gloss += 1
        entries.append((w, meaning, "colloc." if " " in w else ""))
    if entries:
        vocab_by_lesson[n] = (label, entries)

lessons_list = ",\n".join(
    f"  {{ lesson: {n}, label: `{ts_str(lbl)}` }}" for n, (lbl, _) in sorted(vocab_by_lesson.items())
)
entries_blocks = []
for n, (lbl, entries) in sorted(vocab_by_lesson.items()):
    for w, m, pos in entries:
        pos_ts = f'"{pos}"' if pos else "undefined"
        entries_blocks.append(f"""  {{ word: `{ts_str(w)}`, meaning: `{ts_str(m)}`, lesson: {n}, lessonLabel: `{ts_str(lbl)}`, pos: {pos_ts} }}""")

vocab_ts = f"""// واژگان (کالوکیشن‌های کلیدی) هر درس — از گزینه‌های صحیح کوئیزها + گِلاس فارسی
// فقط کالوکیشن‌هایی که ترجمهٔ فارسی معتبر دارند وارد می‌شوند
import type {{ VocabEntry }} from "../types";

export const VOCAB_LESSONS = [
{lessons_list}
];

export const ALL_VOCAB: VocabEntry[] = [
{",\n".join(entries_blocks)}
];

export const VOCAB_COUNT_BY_LESSON: Record<number, number> = {{
{chr(10).join(f"  {n}: {len(entries)}," for n, (_, entries) in sorted(vocab_by_lesson.items()))}
}};

export function vocabOfLesson(lesson: number): VocabEntry[] {{
  return ALL_VOCAB.filter((v) => v.lesson === lesson);
}}
"""
open(f"{OUTDIR}/vocab.ts", "w", encoding="utf-8").write(vocab_ts)

# ── index.ts ──
index_ts = """// مونتاژ داده‌های کتاب «۱۰۰۰ کالوکیشن کاربردی» به‌شکل قرارداد BookData
// این فایل تنها نقطهٔ ورود کتاب در رجیستری است: src/data/books/registry.ts
import type { BookData } from "../books/types";

import { BOOK_INFO, CHAPTERS } from "./book-meta";
import { READING_LIST } from "./readings";
import { QUIZ_SEED, QUESTION_COUNTS } from "./quiz-seed";
import { ALL_VOCAB, VOCAB_LESSONS, VOCAB_COUNT_BY_LESSON, vocabOfLesson } from "./vocab";

/** آمار کلی کتاب — یک‌بار در سطح ماژول محاسبه می‌شود */
const STATS = {
  words: ALL_VOCAB.length,
  questions: QUIZ_SEED.length,
  readings: READING_LIST.length,
  conversations: 0,
  dictionary: 0,
  verbs: 0,
  grammarLessons: 0,
};

/** بستهٔ کامل داده کتاب کالوکیشن‌ها (Shayna Oliveira — Espresso English) */
export const COLLOCATIONS_BOOK = {
  info: BOOK_INFO,
  chapters: CHAPTERS,
  stats: STATS,
  vocab: {
    lessons: VOCAB_LESSONS,
    all: ALL_VOCAB,
    countByLesson: VOCAB_COUNT_BY_LESSON,
    ofLesson: vocabOfLesson,
  },
  quiz: {
    seed: QUIZ_SEED,
    counts: QUESTION_COUNTS,
  },
  grammar: {
    lessons: [],
    ofLesson: () => [],
  },
  readings: READING_LIST,
  conversations: [],
  dictionary: [],
  verbs: [],
} satisfies BookData;
"""
open(f"{OUTDIR}/index.ts", "w", encoding="utf-8").write(index_ts)

print(f"generated: chapters=50 quiz={count} readings=50 vocab_lessons={len(vocab_by_lesson)} phrases={total_phr} words={total_gloss} translated={len(FA)}")
