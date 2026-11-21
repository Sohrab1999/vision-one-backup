// سؤال‌های آزمون موج R1 (نقشه راه کیفیت استخراج سه کتاب VIU — فاز R1-b، 2026-11-17)
// فقط از تمرین‌های دارای کلید چاپی کتاب در درس‌هایی که پیش‌تر هیچ سؤال بانکی نداشتند (درس‌های بی‌سؤالِ ممیزی ۲۰۲۶-۱۱-۱۶).
// قاعدهٔ طلایی §E-۳ پابرجا: هر پاسخ = عین Answer key چاپی؛ همهٔ گزینه‌ها فقط از منابع چاپی همان تمرین
// (بانک چاپی / ستون راست چاپی / کلیدهای چاپی آیتم‌های مجاور / واژگان چاپی همان درس) — صفر گزینهٔ ساخته.
// تولید ماشینی بازتولیدپذیر: bun scripts/viu-r1-quiz-convert.mjs convert — صفر دست‌کاری دستی.
// پروونانس کامل تک‌سؤال: docs/qa/viu-r1-quiz-conversion-2026-11-17.json
import type { QuizQuestionSeed } from "../types";

export const QUIZ_R1: QuizQuestionSeed[] = [
  {
    category: "vocabulary",
    lesson: 1,
    scope: "درس 1 — تمرین 1.1",
    text: "1 Is it better to plan regular self-study, or just study when you've got some free time?",
    options: [
      "Yes, it usually is necessary.",
      "No, study the units that interest you.",
      "Yes.",
      "It is better to plan regular self-study."
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 1، تمرین 1.1."
  },
  {
    category: "vocabulary",
    lesson: 1,
    scope: "درس 1 — تمرین 1.1",
    text: "2 Is it a good idea to study the units in the same order as they appear in the book?",
    options: [
      "Yes.",
      "It is better to plan regular self-study.",
      "No, study the units that interest you.",
      "Yes, it usually is necessary."
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 1، تمرین 1.1."
  },
  {
    category: "vocabulary",
    lesson: 1,
    scope: "درس 1 — تمرین 1.1",
    text: "3 Is it a good idea to write down new words in a notebook when you are studying a unit?",
    options: [
      "It is better to plan regular self-study.",
      "Yes.",
      "No, study the units that interest you.",
      "Yes, it usually is necessary."
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 1، تمرین 1.1."
  },
  {
    category: "vocabulary",
    lesson: 1,
    scope: "درس 1 — تمرین 1.1",
    text: "4 Is it necessary to revise vocabulary (= study it again for a second or third time)?",
    options: [
      "Yes, it usually is necessary.",
      "It is better to plan regular self-study.",
      "No, study the units that interest you.",
      "Yes."
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 1، تمرین 1.1."
  },
  {
    category: "vocabulary",
    lesson: 1,
    scope: "درس 1 — تمرین 1.1",
    text: "5 Is it better to revise vocabulary occasionally for long periods of time, or is it better to revise regularly for short periods of time?",
    options: [
      "Yes.",
      "It is better to plan regular self-study.",
      "No, study the units that interest you.",
      "It is probably better to revise for short periods but do it often."
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 1، تمرین 1.1."
  },
  {
    category: "vocabulary",
    lesson: 1,
    scope: "درس 1 — تمرین 1.4",
    text: "1 Did you make all of the exercises?",
    options: [
      "I spent twenty minutes",
      "for half an hour",
      "the left-hand page",
      "Did you do"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 1، تمرین 1.4."
  },
  {
    category: "vocabulary",
    lesson: 1,
    scope: "درس 1 — تمرین 1.4",
    text: "2 I studied for one half hour.",
    options: [
      "the left-hand page",
      "Did you do",
      "for half an hour",
      "I spent twenty minutes"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 1، تمرین 1.4."
  },
  {
    category: "vocabulary",
    lesson: 1,
    scope: "درس 1 — تمرین 1.4",
    text: "3 Do you always read the left page first?",
    options: [
      "Did you do",
      "the left-hand page",
      "for half an hour",
      "I spent twenty minutes"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 1، تمرین 1.4."
  },
  {
    category: "vocabulary",
    lesson: 1,
    scope: "درس 1 — تمرین 1.4",
    text: "4 I passed twenty minutes on the first exercise.",
    options: [
      "I spent twenty minutes",
      "Did you do",
      "for half an hour",
      "the left-hand page"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 1، تمرین 1.4."
  },
  {
    category: "vocabulary",
    lesson: 1,
    scope: "درس 1 — تمرین 1.4",
    text: "5 I read the all page.",
    options: [
      "the left-hand page",
      "Did you do",
      "for half an hour",
      "the whole page"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 1، تمرین 1.4."
  },
  {
    category: "vocabulary",
    lesson: 4,
    scope: "درس 4 — تمرین 4.3",
    text: "She broke her leg.",
    options: [
      "transitive",
      "intransitive",
      "noun",
      "verb"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 4، تمرین 4.3."
  },
  {
    category: "vocabulary",
    lesson: 4,
    scope: "درس 4 — تمرین 4.3",
    text: "Take off your jacket.",
    options: [
      "verb",
      "intransitive",
      "noun",
      "transitive"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 4، تمرین 4.3."
  },
  {
    category: "vocabulary",
    lesson: 4,
    scope: "درس 4 — تمرین 4.3",
    text: "I got up at 7.30.",
    options: [
      "noun",
      "transitive",
      "intransitive",
      "verb"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 4، تمرین 4.3."
  },
  {
    category: "vocabulary",
    lesson: 4,
    scope: "درس 4 — تمرین 4.3",
    text: "She doesn't like Chinese food.",
    options: [
      "intransitive",
      "transitive",
      "noun",
      "verb"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 4، تمرین 4.3."
  },
  {
    category: "vocabulary",
    lesson: 4,
    scope: "درس 4 — تمرین 4.3",
    text: "We arrived late.",
    options: [
      "intransitive",
      "transitive",
      "noun",
      "verb"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 4، تمرین 4.3."
  },
  {
    category: "vocabulary",
    lesson: 4,
    scope: "درس 4 — تمرین 4.3",
    text: "He told me to sit down.",
    options: [
      "verb",
      "transitive",
      "noun",
      "intransitive"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 4، تمرین 4.3."
  },
  {
    category: "vocabulary",
    lesson: 4,
    scope: "درس 4 — تمرین 4.5",
    text: "What part of speech are these words?",
    options: [
      "adjectives",
      "happy",
      "lucky",
      "dangerous"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 4، تمرین 4.5."
  },
  {
    category: "vocabulary",
    lesson: 4,
    scope: "درس 4 — تمرین 4.5",
    text: "Change each one into an adverb.",
    options: [
      "un- (unhappy; unlucky)",
      "adjectives",
      "happy",
      "happily; luckily; dangerously; cheaply"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 4، تمرین 4.5."
  },
  {
    category: "vocabulary",
    lesson: 4,
    scope: "درس 4 — تمرین 4.5",
    text: "Write down a synonym for the first two words.",
    options: [
      "dangerous",
      "lucky",
      "happy",
      "cheap"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 4، تمرین 4.5."
  },
  {
    category: "vocabulary",
    lesson: 4,
    scope: "درس 4 — تمرین 4.5",
    text: "Which prefix do you need to form the opposite of the first two words?",
    options: [
      "happy",
      "un- (unhappy; unlucky)",
      "lucky",
      "dangerous"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 4، تمرین 4.5."
  },
  {
    category: "vocabulary",
    lesson: 4,
    scope: "درس 4 — تمرین 4.5",
    text: "Write down the opposite of the last two words.",
    options: [
      "dangerous",
      "happy",
      "lucky",
      "cheap"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 4، تمرین 4.5."
  },
  {
    category: "vocabulary",
    lesson: 6,
    scope: "درس 6 — تمرین 6.1",
    text: "2 ________ correct",
    options: [
      "illegible",
      "incorrect",
      "impossible",
      "impatient"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 6، تمرین 6.1."
  },
  {
    category: "vocabulary",
    lesson: 6,
    scope: "درس 6 — تمرین 6.1",
    text: "3 ________ legible",
    options: [
      "illegible",
      "incorrect",
      "impossible",
      "impatient"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 6، تمرین 6.1."
  },
  {
    category: "vocabulary",
    lesson: 6,
    scope: "درس 6 — تمرین 6.1",
    text: "4 ________ possible",
    options: [
      "impatient",
      "incorrect",
      "illegible",
      "impossible"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 6، تمرین 6.1."
  },
  {
    category: "vocabulary",
    lesson: 6,
    scope: "درس 6 — تمرین 6.1",
    text: "5 ________ patient",
    options: [
      "illegible",
      "incorrect",
      "impatient",
      "impossible"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 6، تمرین 6.1."
  },
  {
    category: "vocabulary",
    lesson: 6,
    scope: "درس 6 — تمرین 6.1",
    text: "6 ________ regular",
    options: [
      "incorrect",
      "irregular",
      "illegible",
      "impossible"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 6، تمرین 6.1."
  },
  {
    category: "vocabulary",
    lesson: 6,
    scope: "درس 6 — تمرین 6.1",
    text: "7 ________ friendly",
    options: [
      "unfriendly",
      "incorrect",
      "illegible",
      "impossible"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 6، تمرین 6.1."
  },
  {
    category: "vocabulary",
    lesson: 6,
    scope: "درس 6 — تمرین 6.1",
    text: "8 ________ formal",
    options: [
      "impossible",
      "incorrect",
      "illegible",
      "informal"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 6، تمرین 6.1."
  },
  {
    category: "vocabulary",
    lesson: 6,
    scope: "درس 6 — تمرین 6.1",
    text: "9 ________ polite",
    options: [
      "illegible",
      "incorrect",
      "impolite",
      "impossible"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 6، تمرین 6.1."
  },
  {
    category: "vocabulary",
    lesson: 6,
    scope: "درس 6 — تمرین 6.1",
    text: "10 ________ visible",
    options: [
      "incorrect",
      "invisible",
      "illegible",
      "impossible"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 6، تمرین 6.1."
  },
  {
    category: "vocabulary",
    lesson: 6,
    scope: "درس 6 — تمرین 6.1",
    text: "11 ________ employed",
    options: [
      "unemployed",
      "incorrect",
      "illegible",
      "impossible"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 6، تمرین 6.1."
  },
  {
    category: "vocabulary",
    lesson: 6,
    scope: "درس 6 — تمرین 6.1",
    text: "12 ________ honest",
    options: [
      "impossible",
      "incorrect",
      "illegible",
      "dishonest"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 6، تمرین 6.1."
  },
  {
    category: "vocabulary",
    lesson: 6,
    scope: "درس 6 — تمرین 6.1",
    text: "13 ________ lock",
    options: [
      "illegible",
      "incorrect",
      "unlock",
      "impossible"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 6، تمرین 6.1."
  },
  {
    category: "vocabulary",
    lesson: 6,
    scope: "درس 6 — تمرین 6.1",
    text: "14 ________ pack",
    options: [
      "incorrect",
      "unpack",
      "illegible",
      "impossible"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 6، تمرین 6.1."
  },
  {
    category: "vocabulary",
    lesson: 6,
    scope: "درس 6 — تمرین 6.1",
    text: "15 ________ agree",
    options: [
      "disagree",
      "incorrect",
      "illegible",
      "impossible"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 6، تمرین 6.1."
  },
  {
    category: "vocabulary",
    lesson: 6,
    scope: "درس 6 — تمرین 6.1",
    text: "16 ________ like",
    options: [
      "impossible",
      "incorrect",
      "illegible",
      "dislike"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 6، تمرین 6.1."
  },
  {
    category: "vocabulary",
    lesson: 6,
    scope: "درس 6 — تمرین 6.3",
    text: "2 His room is always in a mess, isn't it? Yes, it's very ________ ",
    options: [
      "he got undressed",
      "it's very untidy",
      "it's completely illegible",
      "she's very impatient"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 6، تمرین 6.3."
  },
  {
    category: "vocabulary",
    lesson: 6,
    scope: "درس 6 — تمرین 6.3",
    text: "3 He took off his clothes! Yes, he got ________ ",
    options: [
      "he got undressed",
      "it's very untidy",
      "it's completely illegible",
      "she's very impatient"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 6، تمرین 6.3."
  },
  {
    category: "vocabulary",
    lesson: 6,
    scope: "درس 6 — تمرین 6.3",
    text: "4 This handwriting is impossible to read. Yes I know, it's completely ________ ",
    options: [
      "she's very impatient",
      "it's very untidy",
      "he got undressed",
      "it's completely illegible"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 6، تمرین 6.3."
  },
  {
    category: "vocabulary",
    lesson: 6,
    scope: "درس 6 — تمرین 6.3",
    text: "5 She can never wait for five minutes, can she? No, she's very ________ ",
    options: [
      "he got undressed",
      "it's very untidy",
      "she's very impatient",
      "it's completely illegible"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 6، تمرین 6.3."
  },
  {
    category: "vocabulary",
    lesson: 6,
    scope: "درس 6 — تمرین 6.3",
    text: "6 The conference centre wasn't good enough for 500 people, was it? No, it was completely ________ for that number.",
    options: [
      "it's very untidy",
      "inadequate",
      "he got undressed",
      "it's completely illegible"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 6، تمرین 6.3."
  },
  {
    category: "vocabulary",
    lesson: 6,
    scope: "درس 6 — تمرین 6.3",
    text: "7 She's horrible sometimes. Yes, she can be very ________ ",
    options: [
      "unpleasant",
      "it's very untidy",
      "he got undressed",
      "it's completely illegible"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 6، تمرین 6.3."
  },
  {
    category: "vocabulary",
    lesson: 6,
    scope: "درس 6 — تمرین 6.3",
    text: "8 I'm afraid they sometimes steal things and tell lies. I know. They're both ________ ",
    options: [
      "it's completely illegible",
      "it's very untidy",
      "he got undressed",
      "dishonest"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 6، تمرین 6.3."
  },
  {
    category: "vocabulary",
    lesson: 6,
    scope: "درس 6 — تمرین 6.4",
    text: "2 I'm sorry, I mis ________ her message.",
    options: [
      "unpacked",
      "misunderstood",
      "disappeared",
      "redo"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 6، تمرین 6.4."
  },
  {
    category: "vocabulary",
    lesson: 6,
    scope: "درس 6 — تمرین 6.4",
    text: "3 We un ________ as soon as we got to the hotel, then went out for a walk.",
    options: [
      "unpacked",
      "misunderstood",
      "disappeared",
      "redo"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 6، تمرین 6.4."
  },
  {
    category: "vocabulary",
    lesson: 6,
    scope: "درس 6 — تمرین 6.4",
    text: "4 She was here a minute ago, then she dis ________ . I don't know where she is now.",
    options: [
      "redo",
      "misunderstood",
      "unpacked",
      "disappeared"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 6، تمرین 6.4."
  },
  {
    category: "vocabulary",
    lesson: 6,
    scope: "درس 6 — تمرین 6.4",
    text: "5 My homework was so bad that I'll have to re ________ it.",
    options: [
      "unpacked",
      "misunderstood",
      "redo",
      "disappeared"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 6، تمرین 6.4."
  },
  {
    category: "vocabulary",
    lesson: 6,
    scope: "درس 6 — تمرین 6.4",
    text: "6 Her alarm clock didn't go off and she over ________ ",
    options: [
      "misunderstood",
      "overslept",
      "unpacked",
      "disappeared"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 6، تمرین 6.4."
  },
  {
    category: "vocabulary",
    lesson: 6,
    scope: "درس 6 — تمرین 6.4",
    text: "7 She finally managed to un ________ the door and we were able to go inside.",
    options: [
      "unlock",
      "misunderstood",
      "unpacked",
      "disappeared"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 6، تمرین 6.4."
  },
  {
    category: "vocabulary",
    lesson: 6,
    scope: "درس 6 — تمرین 6.4",
    text: "8 I dis ________ the film, but the others enjoyed it.",
    options: [
      "disappeared",
      "misunderstood",
      "unpacked",
      "disliked"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 6، تمرین 6.4."
  },
  {
    category: "vocabulary",
    lesson: 6,
    scope: "درس 6 — تمرین 6.4",
    text: "9 I don't think I'll pass the exam, but I can always re ________ it in September.",
    options: [
      "unpacked",
      "misunderstood",
      "redo",
      "disappeared"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 6، تمرین 6.4."
  },
  {
    category: "vocabulary",
    lesson: 6,
    scope: "درس 6 — تمرین 6.4",
    text: "10 She's over ________ things at the moment. She needs a complete break from her job.",
    options: [
      "misunderstood",
      "overdoing",
      "unpacked",
      "disappeared"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 6، تمرین 6.4."
  },
  {
    category: "vocabulary",
    lesson: 6,
    scope: "درس 6 — تمرین 6.4",
    text: "11 The post office shuts for lunch but it should re ________ at 2.00 pm.",
    options: [
      "reopen",
      "misunderstood",
      "unpacked",
      "disappeared"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 6، تمرین 6.4."
  },
  {
    category: "vocabulary",
    lesson: 6,
    scope: "درس 6 — تمرین 6.4",
    text: "12 I was very angry because they over ________ me by about £5 in that shop.",
    options: [
      "disappeared",
      "misunderstood",
      "unpacked",
      "overcharged"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 6، تمرین 6.4."
  },
  {
    category: "vocabulary",
    lesson: 7,
    scope: "درس 7 — تمرین 7.3",
    text: "2 translate ________ ",
    options: [
      "translator",
      "actor",
      "psychologist",
      "economist"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 7، تمرین 7.3."
  },
  {
    category: "vocabulary",
    lesson: 7,
    scope: "درس 7 — تمرین 7.3",
    text: "3 act ________ ",
    options: [
      "economist",
      "translator",
      "psychologist",
      "actor"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 7، تمرین 7.3."
  },
  {
    category: "vocabulary",
    lesson: 7,
    scope: "درس 7 — تمرین 7.3",
    text: "4 psychology ________ ",
    options: [
      "actor",
      "translator",
      "psychologist",
      "economist"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 7، تمرین 7.3."
  },
  {
    category: "vocabulary",
    lesson: 7,
    scope: "درس 7 — تمرین 7.3",
    text: "5 economics ________ ",
    options: [
      "translator",
      "economist",
      "actor",
      "psychologist"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 7، تمرین 7.3."
  },
  {
    category: "vocabulary",
    lesson: 7,
    scope: "درس 7 — تمرین 7.3",
    text: "6 football ________ ",
    options: [
      "footballer",
      "translator",
      "actor",
      "psychologist"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 7، تمرین 7.3."
  },
  {
    category: "vocabulary",
    lesson: 7,
    scope: "درس 7 — تمرین 7.5",
    text: "2 A murderer is a person who ________ ",
    options: [
      "murders someone",
      "manages a bank",
      "acts on TV",
      "translates books and articles, etc."
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 7، تمرین 7.5."
  },
  {
    category: "vocabulary",
    lesson: 7,
    scope: "درس 7 — تمرین 7.5",
    text: "3 A bank manager is a person who ________ ",
    options: [
      "translates books and articles, etc.",
      "murders someone",
      "acts on TV",
      "manages a bank"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 7، تمرین 7.5."
  },
  {
    category: "vocabulary",
    lesson: 7,
    scope: "درس 7 — تمرین 7.5",
    text: "4 A television actor is a person who ________ ",
    options: [
      "manages a bank",
      "murders someone",
      "acts on TV",
      "translates books and articles, etc."
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 7، تمرین 7.5."
  },
  {
    category: "vocabulary",
    lesson: 7,
    scope: "درس 7 — تمرین 7.5",
    text: "5 A translator is a person who ________ ",
    options: [
      "murders someone",
      "translates books and articles, etc.",
      "manages a bank",
      "acts on TV"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 7، تمرین 7.5."
  },
  {
    category: "vocabulary",
    lesson: 7,
    scope: "درس 7 — تمرین 7.5",
    text: "6 A lorry driver is a person who ________ ",
    options: [
      "drives a lorry",
      "murders someone",
      "manages a bank",
      "acts on TV"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 7، تمرین 7.5."
  },
  {
    category: "vocabulary",
    lesson: 7,
    scope: "درس 7 — تمرین 7.5",
    text: "7 A journalist is a person who ________ ",
    options: [
      "acts on TV",
      "murders someone",
      "manages a bank",
      "writes articles in newspapers and magazines"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 7، تمرین 7.5."
  },
  {
    category: "vocabulary",
    lesson: 7,
    scope: "درس 7 — تمرین 7.5",
    text: "8 An artist such as Picasso is a person who ________ ",
    options: [
      "manages a bank",
      "murders someone",
      "paints pictures",
      "acts on TV"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 7، تمرین 7.5."
  },
  {
    category: "vocabulary",
    lesson: 8,
    scope: "درس 8 — تمرین 8.1",
    text: "2 attract",
    options: [
      "(un)suitable",
      "creative",
      "cloudy",
      "attractive"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 8، تمرین 8.1."
  },
  {
    category: "vocabulary",
    lesson: 8,
    scope: "درس 8 — تمرین 8.1",
    text: "3 create",
    options: [
      "cloudy",
      "attractive",
      "creative",
      "(un)suitable"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 8، تمرین 8.1."
  },
  {
    category: "vocabulary",
    lesson: 8,
    scope: "درس 8 — تمرین 8.1",
    text: "4 cloud",
    options: [
      "attractive",
      "cloudy",
      "creative",
      "(un)suitable"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 8، تمرین 8.1."
  },
  {
    category: "vocabulary",
    lesson: 8,
    scope: "درس 8 — تمرین 8.1",
    text: "5 suit",
    options: [
      "(un)suitable",
      "attractive",
      "creative",
      "cloudy"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 8، تمرین 8.1."
  },
  {
    category: "vocabulary",
    lesson: 8,
    scope: "درس 8 — تمرین 8.1",
    text: "6 use",
    options: [
      "cloudy",
      "attractive",
      "creative",
      "useful"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 8، تمرین 8.1."
  },
  {
    category: "vocabulary",
    lesson: 8,
    scope: "درس 8 — تمرین 8.1",
    text: "7 care",
    options: [
      "creative",
      "attractive",
      "careful",
      "cloudy"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 8، تمرین 8.1."
  },
  {
    category: "vocabulary",
    lesson: 8,
    scope: "درس 8 — تمرین 8.1",
    text: "8 thought",
    options: [
      "attractive",
      "thoughtful",
      "creative",
      "cloudy"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 8، تمرین 8.1."
  },
  {
    category: "vocabulary",
    lesson: 8,
    scope: "درس 8 — تمرین 8.1",
    text: "9 politics",
    options: [
      "political",
      "attractive",
      "creative",
      "cloudy"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 8، تمرین 8.1."
  },
  {
    category: "vocabulary",
    lesson: 8,
    scope: "درس 8 — تمرین 8.1",
    text: "10 enjoy",
    options: [
      "cloudy",
      "attractive",
      "creative",
      "enjoyable"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 8، تمرین 8.1."
  },
  {
    category: "vocabulary",
    lesson: 8,
    scope: "درس 8 — تمرین 8.1",
    text: "11 pain",
    options: [
      "creative",
      "attractive",
      "painful",
      "cloudy"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 8، تمرین 8.1."
  },
  {
    category: "vocabulary",
    lesson: 8,
    scope: "درس 8 — تمرین 8.1",
    text: "12 dirt",
    options: [
      "attractive",
      "dirty",
      "creative",
      "cloudy"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 8، تمرین 8.1."
  },
  {
    category: "vocabulary",
    lesson: 8,
    scope: "درس 8 — تمرین 8.1",
    text: "13 sun",
    options: [
      "sunny",
      "attractive",
      "creative",
      "cloudy"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 8، تمرین 8.1."
  },
  {
    category: "vocabulary",
    lesson: 8,
    scope: "درس 8 — تمرین 8.1",
    text: "14 music",
    options: [
      "cloudy",
      "attractive",
      "creative",
      "musical"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 8، تمرین 8.1."
  },
  {
    category: "vocabulary",
    lesson: 8,
    scope: "درس 8 — تمرین 8.1",
    text: "15 comfort",
    options: [
      "creative",
      "attractive",
      "(un)comfortable",
      "cloudy"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 8، تمرین 8.1."
  },
  {
    category: "vocabulary",
    lesson: 8,
    scope: "درس 8 — تمرین 8.1",
    text: "16 fame",
    options: [
      "attractive",
      "famous",
      "creative",
      "cloudy"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 8، تمرین 8.1."
  },
  {
    category: "vocabulary",
    lesson: 8,
    scope: "درس 8 — تمرین 8.1",
    text: "17 rely",
    options: [
      "(un)reliable",
      "attractive",
      "creative",
      "cloudy"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 8، تمرین 8.1."
  },
  {
    category: "vocabulary",
    lesson: 8,
    scope: "درس 8 — تمرین 8.1",
    text: "18 emotion",
    options: [
      "cloudy",
      "attractive",
      "creative",
      "emotional"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 8، تمرین 8.1."
  },
  {
    category: "vocabulary",
    lesson: 8,
    scope: "درس 8 — تمرین 8.2",
    text: "Everyone in my country has heard of her; she's very ________ ",
    options: [
      "painful",
      "helpful",
      "dangerous",
      "famous"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 8، تمرین 8.2."
  },
  {
    category: "vocabulary",
    lesson: 8,
    scope: "درس 8 — تمرین 8.2",
    text: "The tourist information office was very ________ , and told us everything we needed to know.",
    options: [
      "dangerous",
      "famous",
      "helpful",
      "painful"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 8، تمرین 8.2."
  },
  {
    category: "vocabulary",
    lesson: 8,
    scope: "درس 8 — تمرین 8.2",
    text: "This is a very ________ road, you know. There were three serious accidents on it last year.",
    options: [
      "famous",
      "dangerous",
      "helpful",
      "painful"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 8، تمرین 8.2."
  },
  {
    category: "vocabulary",
    lesson: 8,
    scope: "درس 8 — تمرین 8.2",
    text: "It was very ________ when I hit my leg against the corner of that table.",
    options: [
      "painful",
      "famous",
      "helpful",
      "dangerous"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 8، تمرین 8.2."
  },
  {
    category: "vocabulary",
    lesson: 8,
    scope: "درس 8 — تمرین 8.2",
    text: "This bag is very ________ : I take it to work and when I go on holiday.",
    options: [
      "dangerous",
      "famous",
      "helpful",
      "useful"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 8، تمرین 8.2."
  },
  {
    category: "vocabulary",
    lesson: 8,
    scope: "درس 8 — تمرین 8.2",
    text: "We've never had problems with our TV in ten years; it's been very ________ ",
    options: [
      "helpful",
      "famous",
      "reliable",
      "dangerous"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 8، تمرین 8.2."
  },
  {
    category: "vocabulary",
    lesson: 8,
    scope: "درس 8 — تمرین 8.2",
    text: "The factory is in the ________ part of the city, and it's not very attractive.",
    options: [
      "famous",
      "industrial",
      "helpful",
      "dangerous"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 8، تمرین 8.2."
  },
  {
    category: "vocabulary",
    lesson: 8,
    scope: "درس 8 — تمرین 8.2",
    text: "A 100 gram bag is 80 pence, but the 200 gram bag is only £1.20, so it's more ________ to buy the larger bag.",
    options: [
      "economical",
      "famous",
      "helpful",
      "dangerous"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 8، تمرین 8.2."
  },
  {
    category: "vocabulary",
    lesson: 8,
    scope: "درس 8 — تمرین 8.2",
    text: "It's terrible that there are so many ________ people in a country that is so rich.",
    options: [
      "dangerous",
      "famous",
      "helpful",
      "homeless"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 8، تمرین 8.2."
  },
  {
    category: "vocabulary",
    lesson: 8,
    scope: "درس 8 — تمرین 8.2",
    text: "Teenagers want to be ________ , and wear all the latest styles.",
    options: [
      "helpful",
      "famous",
      "fashionable",
      "dangerous"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 8، تمرین 8.2."
  },
  {
    category: "vocabulary",
    lesson: 8,
    scope: "درس 8 — تمرین 8.2",
    text: "I can't understand a word of these instructions – they're ________ ",
    options: [
      "famous",
      "incomprehensible",
      "helpful",
      "dangerous"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 8، تمرین 8.2."
  },
  {
    category: "vocabulary",
    lesson: 10,
    scope: "درس 10 — تمرین 10.2",
    text: "2 I'm sorry I'm late. There was a terrible ________  ________ on the motorway.",
    options: [
      "film star",
      "traffic jam",
      "traffic lights",
      "waiting room"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 10، تمرین 10.2."
  },
  {
    category: "vocabulary",
    lesson: 10,
    scope: "درس 10 — تمرین 10.2",
    text: "3 Humphrey Bogart was a famous ________  ________ in the 1940s and 50s.",
    options: [
      "film star",
      "traffic jam",
      "traffic lights",
      "waiting room"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 10، تمرین 10.2."
  },
  {
    category: "vocabulary",
    lesson: 10,
    scope: "درس 10 — تمرین 10.2",
    text: "4 The ________  ________ were red but he still didn't stop.",
    options: [
      "waiting room",
      "traffic jam",
      "film star",
      "traffic lights"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 10، تمرین 10.2."
  },
  {
    category: "vocabulary",
    lesson: 10,
    scope: "درس 10 — تمرین 10.2",
    text: "5 When I got to the dentist, I had to sit in the ________  ________ for 40 minutes.",
    options: [
      "film star",
      "traffic jam",
      "waiting room",
      "traffic lights"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 10، تمرین 10.2."
  },
  {
    category: "vocabulary",
    lesson: 10,
    scope: "درس 10 — تمرین 10.2",
    text: "6 Mary wanted to go out, but she couldn't find a ________ for the children.",
    options: [
      "traffic jam",
      "babysitter",
      "film star",
      "traffic lights"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 10، تمرین 10.2."
  },
  {
    category: "vocabulary",
    lesson: 10,
    scope: "درس 10 — تمرین 10.2",
    text: "7 When I'm driving I always wear ________ if it's very bright and sunny.",
    options: [
      "sunglasses",
      "traffic jam",
      "film star",
      "traffic lights"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 10، تمرین 10.2."
  },
  {
    category: "vocabulary",
    lesson: 10,
    scope: "درس 10 — تمرین 10.2",
    text: "8 Most people have to pay ________  ________ on their salary; the more you earn, the more you pay.",
    options: [
      "traffic lights",
      "traffic jam",
      "film star",
      "income tax"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 10، تمرین 10.2."
  },
  {
    category: "vocabulary",
    lesson: 10,
    scope: "درس 10 — تمرین 10.2",
    text: "9 I washed my hair; then I discovered that the ________  ________ wasn't working.",
    options: [
      "film star",
      "traffic jam",
      "hair dryer",
      "traffic lights"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 10، تمرین 10.2."
  },
  {
    category: "vocabulary",
    lesson: 10,
    scope: "درس 10 — تمرین 10.2",
    text: "10 We waited at the ________  ________ for 20 minutes, then three arrived at the same time.",
    options: [
      "traffic jam",
      "bus stop",
      "film star",
      "traffic lights"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 10، تمرین 10.2."
  },
  {
    category: "vocabulary",
    lesson: 10,
    scope: "درس 10 — تمرین 10.2",
    text: "11 My brother loves ________  ________ , but I never read stuff like that about the future.",
    options: [
      "science fiction",
      "traffic jam",
      "film star",
      "traffic lights"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 10، تمرین 10.2."
  },
  {
    category: "vocabulary",
    lesson: 10,
    scope: "درس 10 — تمرین 10.2",
    text: "12 Your jeans were dirty so I put them in the ________  ________ with mine.",
    options: [
      "traffic lights",
      "traffic jam",
      "film star",
      "washing machine"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 10، تمرین 10.2."
  },
  {
    category: "vocabulary",
    lesson: 14,
    scope: "درس 14 — تمرین 14.1",
    text: "A: What subjects is she good ________ ?  B: ________ ",
    options: [
      "for B: Her brother, I think.",
      "at B: French and German.",
      "for B: Assistant manager.",
      "to B: I think it's a comedy programme."
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 14، تمرین 14.1."
  },
  {
    category: "vocabulary",
    lesson: 14,
    scope: "درس 14 — تمرین 14.1",
    text: "A: Who is she waiting ________ ?  B: ________ ",
    options: [
      "for B: Her brother, I think.",
      "at B: French and German.",
      "for B: Assistant manager.",
      "to B: I think it's a comedy programme."
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 14، تمرین 14.1."
  },
  {
    category: "vocabulary",
    lesson: 14,
    scope: "درس 14 — تمرین 14.1",
    text: "A: What job is she applying ________ ?  B: ________ ",
    options: [
      "to B: I think it's a comedy programme.",
      "at B: French and German.",
      "for B: Her brother, I think.",
      "for B: Assistant manager."
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 14، تمرین 14.1."
  },
  {
    category: "vocabulary",
    lesson: 14,
    scope: "درس 14 — تمرین 14.1",
    text: "A: What programme is she listening ________ ?  B: ________ ",
    options: [
      "for B: Her brother, I think.",
      "at B: French and German.",
      "to B: I think it's a comedy programme.",
      "for B: Assistant manager."
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 14، تمرین 14.1."
  },
  {
    category: "vocabulary",
    lesson: 14,
    scope: "درس 14 — تمرین 14.1",
    text: "A: What did she complain ________ ?  B: ________ ",
    options: [
      "at B: French and German.",
      "about B: She said the vegetables were cold.",
      "for B: Her brother, I think.",
      "for B: Assistant manager."
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 14، تمرین 14.1."
  },
  {
    category: "vocabulary",
    lesson: 14,
    scope: "درس 14 — تمرین 14.1",
    text: "A: What did she apologise ________ ?  B: ________ ",
    options: [
      "for B: The fact that she was late twice last week.",
      "at B: French and German.",
      "for B: Her brother, I think.",
      "for B: Assistant manager."
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 14، تمرین 14.1."
  },
  {
    category: "vocabulary",
    lesson: 14,
    scope: "درس 14 — تمرین 14.1",
    text: "A: Who does this car belong ________ ?  B: ________ ",
    options: [
      "for B: Assistant manager.",
      "at B: French and German.",
      "for B: Her brother, I think.",
      "to B: The man over there."
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 14، تمرین 14.1."
  },
  {
    category: "vocabulary",
    lesson: 14,
    scope: "درس 14 — تمرین 14.1",
    text: "A: I know she's angry but who's she shouting ________ ?  B: ________ ",
    options: [
      "for B: Her brother, I think.",
      "at B: French and German.",
      "at B: One of the students in her class.",
      "for B: Assistant manager."
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 14، تمرین 14.1."
  },
  {
    category: "vocabulary",
    lesson: 14,
    scope: "درس 14 — تمرین 14.1",
    text: "A: What kind of films is she interested ________ ?  B: ________ ",
    options: [
      "at B: French and German.",
      "in B: Thrillers, I think.",
      "for B: Her brother, I think.",
      "for B: Assistant manager."
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 14، تمرین 14.1."
  },
  {
    category: "vocabulary",
    lesson: 14,
    scope: "درس 14 — تمرین 14.1",
    text: "A: What does the decision depend ________ ?  B: ________ ",
    options: [
      "on B: How much it costs, I expect.",
      "at B: French and German.",
      "for B: Her brother, I think.",
      "for B: Assistant manager."
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 14، تمرین 14.1."
  },
  {
    category: "vocabulary",
    lesson: 14,
    scope: "درس 14 — تمرین 14.1",
    text: "A: What is she afraid ________ ?  B: ________ ",
    options: [
      "for B: Assistant manager.",
      "at B: French and German.",
      "for B: Her brother, I think.",
      "of B: The fact that she can't get out; she's claustrophobic."
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 14، تمرین 14.1."
  },
  {
    category: "vocabulary",
    lesson: 14,
    scope: "درس 14 — تمرین 14.2",
    text: "2 She wasn't aware",
    options: [
      "at me, but it missed.",
      "of her mistakes.",
      "for a job in Australia.",
      "of working at weekends."
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 14، تمرین 14.2."
  },
  {
    category: "vocabulary",
    lesson: 14,
    scope: "درس 14 — تمرین 14.2",
    text: "3 He threw the book",
    options: [
      "at me, but it missed.",
      "for a job in Australia.",
      "of working at weekends.",
      "to the man across the lake."
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 14، تمرین 14.2."
  },
  {
    category: "vocabulary",
    lesson: 14,
    scope: "درس 14 — تمرین 14.2",
    text: "4 She complained",
    options: [
      "of working at weekends.",
      "at me, but it missed.",
      "for a job in Australia.",
      "about the bad service."
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 14، تمرین 14.2."
  },
  {
    category: "vocabulary",
    lesson: 14,
    scope: "درس 14 — تمرین 14.2",
    text: "5 She said it was similar",
    options: [
      "for a job in Australia.",
      "at me, but it missed.",
      "to the one she has.",
      "of working at weekends."
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 14، تمرین 14.2."
  },
  {
    category: "vocabulary",
    lesson: 14,
    scope: "درس 14 — تمرین 14.2",
    text: "6 She applied",
    options: [
      "at me, but it missed.",
      "for a job in Australia.",
      "of working at weekends.",
      "to the man across the lake."
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 14، تمرین 14.2."
  },
  {
    category: "vocabulary",
    lesson: 14,
    scope: "درس 14 — تمرین 14.2",
    text: "7 She shouted",
    options: [
      "to the man across the lake.",
      "at me, but it missed.",
      "for a job in Australia.",
      "of working at weekends."
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 14، تمرین 14.2."
  },
  {
    category: "vocabulary",
    lesson: 14,
    scope: "درس 14 — تمرین 14.2",
    text: "8 He said it depends",
    options: [
      "of working at weekends.",
      "at me, but it missed.",
      "for a job in Australia.",
      "on the time they get there."
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 14، تمرین 14.2."
  },
  {
    category: "vocabulary",
    lesson: 14,
    scope: "درس 14 — تمرین 14.2",
    text: "9 The suitcase was full",
    options: [
      "for a job in Australia.",
      "at me, but it missed.",
      "of clothes.",
      "of working at weekends."
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 14، تمرین 14.2."
  },
  {
    category: "vocabulary",
    lesson: 14,
    scope: "درس 14 — تمرین 14.2",
    text: "10 She spent over £200",
    options: [
      "at me, but it missed.",
      "on that coat.",
      "for a job in Australia.",
      "of working at weekends."
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 14، تمرین 14.2."
  },
  {
    category: "vocabulary",
    lesson: 14,
    scope: "درس 14 — تمرین 14.2",
    text: "11 She apologised",
    options: [
      "for the mistake.",
      "at me, but it missed.",
      "for a job in Australia.",
      "of working at weekends."
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 14، تمرین 14.2."
  },
  {
    category: "vocabulary",
    lesson: 14,
    scope: "درس 14 — تمرین 14.2",
    text: "12 I was very surprised",
    options: [
      "of working at weekends.",
      "at me, but it missed.",
      "for a job in Australia.",
      "at his choice."
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 14، تمرین 14.2."
  },
  {
    category: "vocabulary",
    lesson: 14,
    scope: "درس 14 — تمرین 14.3",
    text: "2 When I was a child I sometimes wore clothes that belonged ________ ",
    options: [
      "with her homework",
      "to my brother",
      "from hay fever",
      "with this TV"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 14، تمرین 14.3."
  },
  {
    category: "vocabulary",
    lesson: 14,
    scope: "درس 14 — تمرین 14.3",
    text: "3 Her teacher wasn't very satisfied ________ ",
    options: [
      "with her homework",
      "to my brother",
      "from hay fever",
      "with this TV"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 14، تمرین 14.3."
  },
  {
    category: "vocabulary",
    lesson: 14,
    scope: "درس 14 — تمرین 14.3",
    text: "4 In the summer a lot of people suffer ________ ",
    options: [
      "with this TV",
      "to my brother",
      "with her homework",
      "from hay fever"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 14، تمرین 14.3."
  },
  {
    category: "vocabulary",
    lesson: 14,
    scope: "درس 14 — تمرین 14.3",
    text: "5 I'm afraid there's something wrong ________ ",
    options: [
      "with her homework",
      "to my brother",
      "with this TV",
      "from hay fever"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 14، تمرین 14.3."
  },
  {
    category: "vocabulary",
    lesson: 14,
    scope: "درس 14 — تمرین 14.3",
    text: "6 The book is very successful and has been translated ________ ",
    options: [
      "to my brother",
      "into five languages",
      "with her homework",
      "from hay fever"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 14، تمرین 14.3."
  },
  {
    category: "vocabulary",
    lesson: 14,
    scope: "درس 14 — تمرین 14.3",
    text: "7 A lot of people are afraid ________ ",
    options: [
      "of flying",
      "to my brother",
      "with her homework",
      "from hay fever"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 14، تمرین 14.3."
  },
  {
    category: "vocabulary",
    lesson: 14,
    scope: "درس 14 — تمرین 14.3",
    text: "8 I've always been interested ________ ",
    options: [
      "from hay fever",
      "to my brother",
      "with her homework",
      "in art"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 14، تمرین 14.3."
  },
  {
    category: "vocabulary",
    lesson: 14,
    scope: "درس 14 — تمرین 14.3",
    text: "9 I'm not very keen ________ ",
    options: [
      "with her homework",
      "to my brother",
      "on sport",
      "from hay fever"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 14، تمرین 14.3."
  },
  {
    category: "vocabulary",
    lesson: 14,
    scope: "درس 14 — تمرین 14.3",
    text: "10 People in my country are very different ________ ",
    options: [
      "to my brother",
      "from British people",
      "with her homework",
      "from hay fever"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 14، تمرین 14.3."
  },
  {
    category: "vocabulary",
    lesson: 14,
    scope: "درس 14 — تمرین 14.3",
    text: "11 For my next holiday, I'm thinking ________ ",
    options: [
      "of going to Greece",
      "to my brother",
      "with her homework",
      "from hay fever"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 14، تمرین 14.3."
  },
  {
    category: "vocabulary",
    lesson: 14,
    scope: "درس 14 — تمرین 14.3",
    text: "12 In the summer, places like Spain and Greece are full ________ ",
    options: [
      "from hay fever",
      "to my brother",
      "with her homework",
      "of tourists"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 14، تمرین 14.3."
  },
  {
    category: "vocabulary",
    lesson: 16,
    scope: "درس 16 — تمرین 16.1",
    text: "A: I'm sorry ________ late. The 7.30 train was ________ and I had to catch the 7.50. B: That's OK. No ________ ",
    options: [
      "lot",
      "keep; mind",
      "sort",
      "I'm; cancelled; problem"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 16، تمرین 16.1."
  },
  {
    category: "vocabulary",
    lesson: 16,
    scope: "درس 16 — تمرین 16.1",
    text: "A: Sorry to ________ you waiting. B: That's OK. Never ________ ",
    options: [
      "sort",
      "I'm; cancelled; problem",
      "keep; mind",
      "lot"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 16، تمرین 16.1."
  },
  {
    category: "vocabulary",
    lesson: 16,
    scope: "درس 16 — تمرین 16.1",
    text: "A: I think the boss has got a real problem with this contract. B: Yes, but I'm sure he'll ________ it out.",
    options: [
      "I'm; cancelled; problem",
      "sort",
      "keep; mind",
      "lot"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 16، تمرین 16.1."
  },
  {
    category: "vocabulary",
    lesson: 16,
    scope: "درس 16 — تمرین 16.1",
    text: "A: I've got your CDs. B: Oh, thanks a ________ ",
    options: [
      "lot",
      "I'm; cancelled; problem",
      "keep; mind",
      "sort"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 16، تمرین 16.1."
  },
  {
    category: "vocabulary",
    lesson: 16,
    scope: "درس 16 — تمرین 16.1",
    text: "A: I must ________ for missing the meeting. B: That's OK. It doesn't ________ ",
    options: [
      "sort",
      "I'm; cancelled; problem",
      "keep; mind",
      "apologise; matter"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 16، تمرین 16.1."
  },
  {
    category: "vocabulary",
    lesson: 16,
    scope: "درس 16 — تمرین 16.1",
    text: "A: I'm busy right now but I won't be ________ B: That's OK. Don't ________ ",
    options: [
      "keep; mind",
      "I'm; cancelled; problem",
      "long; worry",
      "sort"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 16، تمرین 16.1."
  },
  {
    category: "vocabulary",
    lesson: 16,
    scope: "درس 16 — تمرین 16.1",
    text: "A: I'll carry your bags for you. B: Thanks. That's very ________ of you.",
    options: [
      "I'm; cancelled; problem",
      "kind",
      "keep; mind",
      "sort"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 16، تمرین 16.1."
  },
  {
    category: "vocabulary",
    lesson: 16,
    scope: "درس 16 — تمرین 16.1",
    text: "A: I ________ your pardon. B: That's OK. No ________ ",
    options: [
      "beg; problem",
      "I'm; cancelled; problem",
      "keep; mind",
      "sort"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 16، تمرین 16.1."
  },
  {
    category: "vocabulary",
    lesson: 16,
    scope: "درس 16 — تمرین 16.1",
    text: "A: I'm sorry ________ the room; it's very untidy. B: That's OK. I'll clear it ________ later.",
    options: [
      "sort",
      "I'm; cancelled; problem",
      "keep; mind",
      "about; up"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 16، تمرین 16.1."
  },
  {
    category: "vocabulary",
    lesson: 16,
    scope: "درس 16 — تمرین 16.2",
    text: "You arrange to meet friends in the centre of town but you are 20 minutes late.",
    options: [
      "I'm very sorry to disturb you, but ...",
      "Oh, thank you. That's very kind of you.",
      "Don't worry. It doesn't matter.",
      "I'm sorry I'm late, but I missed the bus."
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 16، تمرین 16.2."
  },
  {
    category: "vocabulary",
    lesson: 16,
    scope: "درس 16 — تمرین 16.2",
    text: "Your car has broken down. You're pushing it to the side of the road and a stranger offers to help.",
    options: [
      "Don't worry. It doesn't matter.",
      "I'm sorry I'm late, but I missed the bus.",
      "Oh, thank you. That's very kind of you.",
      "I'm very sorry to disturb you, but ..."
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 16، تمرین 16.2."
  },
  {
    category: "vocabulary",
    lesson: 16,
    scope: "درس 16 — تمرین 16.2",
    text: "A friend borrows a pen, then loses it. When they apologise, you want to reassure them.",
    options: [
      "I'm sorry I'm late, but I missed the bus.",
      "Don't worry. It doesn't matter.",
      "Oh, thank you. That's very kind of you.",
      "I'm very sorry to disturb you, but ..."
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 16، تمرین 16.2."
  },
  {
    category: "vocabulary",
    lesson: 16,
    scope: "درس 16 — تمرین 16.2",
    text: "You need to see your boss, but she's busy. What do you say as you go into her office:",
    options: [
      "I'm very sorry to disturb you, but ...",
      "I'm sorry I'm late, but I missed the bus.",
      "Oh, thank you. That's very kind of you.",
      "Don't worry. It doesn't matter."
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 16، تمرین 16.2."
  },
  {
    category: "vocabulary",
    lesson: 16,
    scope: "درس 16 — تمرین 16.2",
    text: "A colleague at work tells you that a number of files are in the wrong order and he doesn't know what to do. When he apologises, how can you reassure him, and what can you offer to do?",
    options: [
      "Don't worry. It doesn't matter.",
      "I'm sorry I'm late, but I missed the bus.",
      "Oh, thank you. That's very kind of you.",
      "Never mind. Don't worry. I'll sort it out."
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 16، تمرین 16.2."
  },
  {
    category: "vocabulary",
    lesson: 16,
    scope: "درس 16 — تمرین 16.2",
    text: "You were unable to go to a meeting with a client. Now you phone to explain.",
    options: [
      "Oh, thank you. That's very kind of you.",
      "I'm sorry I'm late, but I missed the bus.",
      "I must apologise for not coming to the meeting yesterday. Unfortunately, ...",
      "Don't worry. It doesn't matter."
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 16، تمرین 16.2."
  },
  {
    category: "vocabulary",
    lesson: 20,
    scope: "درس 20 — تمرین 20.1",
    text: "2 A: Are you ________ ?",
    options: [
      "get",
      "single",
      "special",
      "What"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 20، تمرین 20.1."
  },
  {
    category: "vocabulary",
    lesson: 20,
    scope: "درس 20 — تمرین 20.1",
    text: "B: Nothing ________ . Why?",
    options: [
      "get",
      "single",
      "special",
      "longer"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 20، تمرین 20.1."
  },
  {
    category: "vocabulary",
    lesson: 20,
    scope: "درس 20 — تمرین 20.2",
    text: "2 Yes, it's almost four o'clock.",
    options: [
      "What sort",
      "How old are you?",
      "How far is it?",
      "Have you got the time?"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 20، تمرین 20.2."
  },
  {
    category: "vocabulary",
    lesson: 20,
    scope: "درس 20 — تمرین 20.2",
    text: "3 I'm 23 next month.",
    options: [
      "How far is it?",
      "Have you got the time?",
      "How old are you?",
      "What sort"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 20، تمرین 20.2."
  },
  {
    category: "vocabulary",
    lesson: 20,
    scope: "درس 20 — تمرین 20.2",
    text: "4 It's about five kilometres.",
    options: [
      "Have you got the time?",
      "How far is it?",
      "How old are you?",
      "What sort"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 20، تمرین 20.2."
  },
  {
    category: "vocabulary",
    lesson: 20,
    scope: "درس 20 — تمرین 20.2",
    text: "5 Usually French or Italian, but occasionally Chinese food.",
    options: [
      "What sort",
      "Have you got the time?",
      "How old are you?",
      "How far is it?"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 20، تمرین 20.2."
  },
  {
    category: "vocabulary",
    lesson: 20,
    scope: "درس 20 — تمرین 20.2",
    text: "6 Sorry, I don't know. I'm a stranger here myself.",
    options: [
      "How far is it?",
      "Have you got the time?",
      "How old are you?",
      "Excuse me. How do I get to (the national museum)?"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 20، تمرین 20.2."
  },
  {
    category: "vocabulary",
    lesson: 20,
    scope: "درس 20 — تمرین 20.2",
    text: "7 It's very large — there are six bedrooms and the kitchen is fabulous.",
    options: [
      "How old are you?",
      "Have you got the time?",
      "What's their new flat like?",
      "How far is it?"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 20، تمرین 20.2."
  },
  {
    category: "vocabulary",
    lesson: 20,
    scope: "درس 20 — تمرین 20.2",
    text: "8 I have no plans at all. I'll probably watch TV.",
    options: [
      "Have you got the time?",
      "What are you doing this evening?",
      "How old are you?",
      "How far is it?"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 20، تمرین 20.2."
  },
  {
    category: "vocabulary",
    lesson: 20,
    scope: "درس 20 — تمرین 20.2",
    text: "9 We arrived last Sunday.",
    options: [
      "How long have you been here? / When did you get here?",
      "Have you got the time?",
      "How old are you?",
      "How far is it?"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 20، تمرین 20.2."
  },
  {
    category: "vocabulary",
    lesson: 20,
    scope: "درس 20 — تمرین 20.3",
    text: "B: Two weeks.",
    options: [
      "... the first time you've been to ...",
      "Whereabouts do you live ...",
      "What's your steak like?",
      "How's it going? (Also 'How are things going?')"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 20، تمرین 20.3."
  },
  {
    category: "vocabulary",
    lesson: 20,
    scope: "درس 20 — تمرین 20.3",
    text: "2 A: How are you?",
    options: [
      "What's your steak like?",
      "How's it going? (Also 'How are things going?')",
      "Whereabouts do you live ...",
      "... the first time you've been to ..."
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 20، تمرین 20.3."
  },
  {
    category: "vocabulary",
    lesson: 20,
    scope: "درس 20 — تمرین 20.3",
    text: "B: Fine. And you?",
    options: [
      "How's it going? (Also 'How are things going?')",
      "What's your steak like?",
      "Whereabouts do you live ...",
      "... the first time you've been to ..."
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 20، تمرین 20.3."
  },
  {
    category: "vocabulary",
    lesson: 20,
    scope: "درس 20 — تمرین 20.3",
    text: "3 A: Where exactly do you live in Italy?",
    options: [
      "... the first time you've been to ...",
      "How's it going? (Also 'How are things going?')",
      "Whereabouts do you live ...",
      "What's your steak like?"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 20، تمرین 20.3."
  },
  {
    category: "vocabulary",
    lesson: 20,
    scope: "درس 20 — تمرین 20.3",
    text: "B: In Rome.",
    options: [
      "What's your steak like?",
      "How's it going? (Also 'How are things going?')",
      "Whereabouts do you live ...",
      "matter"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 20، تمرین 20.3."
  },
  {
    category: "vocabulary",
    lesson: 23,
    scope: "درس 23 — تمرین 23.1",
    text: "The children went round the school and ________ up all the rubbish.",
    options: [
      "picked",
      "gone",
      "get",
      "gets"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 23، تمرین 23.1."
  },
  {
    category: "vocabulary",
    lesson: 23,
    scope: "درس 23 — تمرین 23.1",
    text: "This milk smells horrible; I think it has ________ off.",
    options: [
      "gets",
      "picked",
      "get",
      "gone"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 23، تمرین 23.1."
  },
  {
    category: "vocabulary",
    lesson: 23,
    scope: "درس 23 — تمرین 23.1",
    text: "I rang the tourist information office but I couldn't ________ through. It's engaged all the time.",
    options: [
      "gone",
      "picked",
      "get",
      "gets"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 23، تمرین 23.1."
  },
  {
    category: "vocabulary",
    lesson: 23,
    scope: "درس 23 — تمرین 23.1",
    text: "The relationship was difficult at first, but I think she ________ on with him quite well now.",
    options: [
      "picked",
      "gets",
      "gone",
      "get"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 23، تمرین 23.1."
  },
  {
    category: "vocabulary",
    lesson: 23,
    scope: "درس 23 — تمرین 23.1",
    text: "If she's still ill tomorrow, we'll have to ________ off the trip to France until later in the month.",
    options: [
      "put",
      "picked",
      "gone",
      "get"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 23، تمرین 23.1."
  },
  {
    category: "vocabulary",
    lesson: 23,
    scope: "درس 23 — تمرین 23.1",
    text: "I agreed to ________ after my sister's cat when she goes to France.",
    options: [
      "get",
      "picked",
      "gone",
      "look"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 23، تمرین 23.1."
  },
  {
    category: "vocabulary",
    lesson: 23,
    scope: "درس 23 — تمرین 23.1",
    text: "We can ________ on with this exercise while the others are in the library.",
    options: [
      "gone",
      "picked",
      "carry",
      "get"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 23، تمرین 23.1."
  },
  {
    category: "vocabulary",
    lesson: 23,
    scope: "درس 23 — تمرین 23.1",
    text: "Our English teacher said we should ________ through the textbook by the end of the course.",
    options: [
      "picked",
      "get",
      "gone",
      "gets"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 23، تمرین 23.1."
  },
  {
    category: "vocabulary",
    lesson: 23,
    scope: "درس 23 — تمرین 23.1",
    text: "I'm afraid this photocopier has ________ out of paper, but you can use the one in my office.",
    options: [
      "run",
      "picked",
      "gone",
      "get"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 23، تمرین 23.1."
  },
  {
    category: "vocabulary",
    lesson: 23,
    scope: "درس 23 — تمرین 23.2",
    text: "The plane took off ________ .",
    options: [
      "an hour late",
      "in a dictionary",
      "my boss",
      "her coat"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 23، تمرین 23.2."
  },
  {
    category: "vocabulary",
    lesson: 23,
    scope: "درس 23 — تمرین 23.2",
    text: "He had to look it up ________ .",
    options: [
      "her coat",
      "an hour late",
      "my boss",
      "in a dictionary"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 23، تمرین 23.2."
  },
  {
    category: "vocabulary",
    lesson: 23,
    scope: "درس 23 — تمرین 23.2",
    text: "I don't really get on with ________ .",
    options: [
      "in a dictionary",
      "an hour late",
      "my boss",
      "her coat"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 23، تمرین 23.2."
  },
  {
    category: "vocabulary",
    lesson: 23,
    scope: "درس 23 — تمرین 23.2",
    text: "She came in and took off ________ .",
    options: [
      "an hour late",
      "her coat",
      "in a dictionary",
      "my boss"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 23، تمرین 23.2."
  },
  {
    category: "vocabulary",
    lesson: 23,
    scope: "درس 23 — تمرین 23.2",
    text: "I've decided to give up ________ .",
    options: [
      "smoking",
      "an hour late",
      "in a dictionary",
      "my boss"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 23، تمرین 23.2."
  },
  {
    category: "vocabulary",
    lesson: 23,
    scope: "درس 23 — تمرین 23.2",
    text: "Who is going to look after ________ ?",
    options: [
      "my boss",
      "an hour late",
      "in a dictionary",
      "the cat"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 23، تمرین 23.2."
  },
  {
    category: "vocabulary",
    lesson: 23,
    scope: "درس 23 — تمرین 23.2",
    text: "I went to the garage to pick up ________ .",
    options: [
      "in a dictionary",
      "an hour late",
      "the car",
      "my boss"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 23، تمرین 23.2."
  },
  {
    category: "vocabulary",
    lesson: 23,
    scope: "درس 23 — تمرین 23.2",
    text: "My rent is going up ________ .",
    options: [
      "by ten pounds",
      "an hour late",
      "in a dictionary",
      "my boss"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 23، تمرین 23.2."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.1",
    text: "I don't have a job at the moment.",
    options: [
      "She doesn't have much money.",
      "Does he have any change for the machine?",
      "I haven't got a job at the moment.",
      "We haven't got a video at school."
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.1."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.1",
    text: "Has he got any change for the machine?",
    options: [
      "I haven't got a job at the moment.",
      "Does he have any change for the machine?",
      "She doesn't have much money.",
      "We haven't got a video at school."
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.1."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.1",
    text: "She hasn't got much money.",
    options: [
      "She doesn't have much money.",
      "I haven't got a job at the moment.",
      "Does he have any change for the machine?",
      "We haven't got a video at school."
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.1."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.1",
    text: "We don't have a video at school.",
    options: [
      "She doesn't have much money.",
      "I haven't got a job at the moment.",
      "Does he have any change for the machine?",
      "We haven't got a video at school."
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.1."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.1",
    text: "A: Do you have an English dictionary? B: Yes, I do.",
    options: [
      "Does he have any change for the machine?",
      "I haven't got a job at the moment.",
      "A: Have you got an English dictionary? B: Yes, I have.",
      "She doesn't have much money."
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.1."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.2",
    text: "We have a small garden.",
    options: [
      "I think I've got a cold.",
      "We've got a small garden.",
      "A: Have you got a spare pen?",
      "... she's got a new boyfriend."
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.2."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.2",
    text: "I think I have a cold.",
    options: [
      "I think I've got a cold.",
      "We've got a small garden.",
      "A: Have you got a spare pen?",
      "... she's got a new boyfriend."
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.2."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.2",
    text: "A: Do you have a spare pen? B: No, sorry.",
    options: [
      "... she's got a new boyfriend.",
      "We've got a small garden.",
      "I think I've got a cold.",
      "A: Have you got a spare pen?"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.2."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.2",
    text: "Someone told me she has a new boyfriend.",
    options: [
      "I think I've got a cold.",
      "We've got a small garden.",
      "... she's got a new boyfriend.",
      "A: Have you got a spare pen?"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.2."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.2",
    text: "Let's have lunch.",
    options: [
      "We've got a small garden.",
      "cannot change",
      "I think I've got a cold.",
      "A: Have you got a spare pen?"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.2."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.2",
    text: "They had an exam yesterday.",
    options: [
      "cannot change",
      "We've got a small garden.",
      "I think I've got a cold.",
      "A: Have you got a spare pen?"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.2."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.2",
    text: "I have a new computer.",
    options: [
      "A: Have you got a spare pen?",
      "We've got a small garden.",
      "I think I've got a cold.",
      "I've got a new computer."
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.2."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.2",
    text: "Excuse me. Do you have the time?",
    options: [
      "I think I've got a cold.",
      "We've got a small garden.",
      "Have you got the time?",
      "A: Have you got a spare pen?"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.2."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.3",
    text: "I had a funny ________ about you last night. I woke up laughing.",
    options: [
      "party",
      "rest",
      "dream",
      "think"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.3."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.3",
    text: "I'm exhausted. Can we have a ________ ?",
    options: [
      "dream",
      "rest",
      "party",
      "think"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.3."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.3",
    text: "She's having her 21st birthday ________ next week. Are you going?",
    options: [
      "party",
      "dream",
      "rest",
      "think"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.3."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.3",
    text: "I need to have a ________ before I decide what to do.",
    options: [
      "party",
      "dream",
      "rest",
      "think"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.3."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.3",
    text: "Did you have a ________ finding the place without a map?",
    options: [
      "rest",
      "dream",
      "problem",
      "party"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.3."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.3",
    text: "The weather was terrible on our holiday. We didn't have a very good ________ ",
    options: [
      "dream",
      "time",
      "rest",
      "party"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.3."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.3",
    text: "We had ________ in a little restaurant, then went for a walk in the afternoon.",
    options: [
      "lunch",
      "dream",
      "rest",
      "party"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.3."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.3",
    text: "There's a problem with the car, so I asked the garage to have a ________ at it.",
    options: [
      "party",
      "dream",
      "rest",
      "look"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.3."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.3",
    text: "I had a terrible ________ with my sister; I haven't spoken to her for days.",
    options: [
      "rest",
      "dream",
      "argument",
      "party"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.3."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.4",
    text: "You would like to look at someone's newspaper.",
    options: [
      "Could I have a drink",
      "Could I have a word with you?",
      "Could I have a look at your paper?",
      "Could I have a think about it?"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.4."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.4",
    text: "You want to speak to your teacher.",
    options: [
      "Could I have a look at your paper?",
      "Could I have a word with you?",
      "Could I have a drink",
      "Could I have a think about it?"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.4."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.4",
    text: "You are in a friend's house and you are thirsty.",
    options: [
      "Could I have a drink",
      "Could I have a look at your paper?",
      "Could I have a word with you?",
      "Could I have a think about it?"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.4."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.4",
    text: "Someone asks you if you want to buy their CD player, but you're not 100% sure if you want it.",
    options: [
      "Could I have a drink",
      "Could I have a look at your paper?",
      "Could I have a word with you?",
      "Could I have a think about it?"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.4."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.5",
    text: "Mary is pregnant.",
    options: [
      "Mary had a look at my bad shoulder.",
      "Mary had a problem working the video",
      "Mary is having a baby",
      "Mary had a great time in Ireland."
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.5."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.5",
    text: "Mary found it very difficult to work the video.",
    options: [
      "Mary is having a baby",
      "Mary had a problem working the video",
      "Mary had a look at my bad shoulder.",
      "Mary had a great time in Ireland."
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.5."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.5",
    text: "Mary examined my bad shoulder.",
    options: [
      "Mary had a look at my bad shoulder.",
      "Mary is having a baby",
      "Mary had a problem working the video",
      "Mary had a great time in Ireland."
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.5."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.5",
    text: "Mary really enjoyed herself in Ireland.",
    options: [
      "Mary had a look at my bad shoulder.",
      "Mary is having a baby",
      "Mary had a problem working the video",
      "Mary had a great time in Ireland."
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.5."
  },
  {
    category: "vocabulary",
    lesson: 29,
    scope: "درس 29 — تمرین 29.1",
    text: "Where can I get something to eat round here?",
    options: [
      "became",
      "fetch",
      "arrive",
      "buy"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 29، تمرین 29.1."
  },
  {
    category: "vocabulary",
    lesson: 29,
    scope: "درس 29 — تمرین 29.1",
    text: "I'm just going to get some paper from the office. I'll be back in a minute.",
    options: [
      "arrive",
      "buy",
      "fetch",
      "became"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 29، تمرین 29.1."
  },
  {
    category: "vocabulary",
    lesson: 29,
    scope: "درس 29 — تمرین 29.1",
    text: "What time did they get here last night?",
    options: [
      "buy",
      "arrive",
      "fetch",
      "became"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 29، تمرین 29.1."
  },
  {
    category: "vocabulary",
    lesson: 29,
    scope: "درس 29 — تمرین 29.1",
    text: "He got very angry when I told him what you did with his CDs.",
    options: [
      "became",
      "buy",
      "fetch",
      "arrive"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 29، تمرین 29.1."
  },
  {
    category: "vocabulary",
    lesson: 29,
    scope: "درس 29 — تمرین 29.1",
    text: "I couldn't get a room; all the hotels were full.",
    options: [
      "arrive",
      "buy",
      "fetch",
      "find"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 29، تمرین 29.1."
  },
  {
    category: "vocabulary",
    lesson: 29,
    scope: "درس 29 — تمرین 29.1",
    text: "I normally get about four or five letters a week.",
    options: [
      "fetch",
      "buy",
      "receive",
      "arrive"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 29، تمرین 29.1."
  },
  {
    category: "vocabulary",
    lesson: 29,
    scope: "درس 29 — تمرین 29.1",
    text: "This book is getting quite interesting.",
    options: [
      "buy",
      "becoming",
      "fetch",
      "arrive"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 29، تمرین 29.1."
  },
  {
    category: "vocabulary",
    lesson: 29,
    scope: "درس 29 — تمرین 29.1",
    text: "I must get some stamps before I go home.",
    options: [
      "buy",
      "fetch",
      "arrive",
      "became"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 29، تمرین 29.1."
  },
  {
    category: "vocabulary",
    lesson: 29,
    scope: "درس 29 — تمرین 29.1",
    text: "He sent the letter last week but I didn't get it until yesterday.",
    options: [
      "arrive",
      "buy",
      "fetch",
      "receive"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 29، تمرین 29.1."
  },
  {
    category: "vocabulary",
    lesson: 29,
    scope: "درس 29 — تمرین 29.1",
    text: "Do they often get here early?",
    options: [
      "fetch",
      "buy",
      "arrive",
      "became"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 29، تمرین 29.1."
  },
  {
    category: "vocabulary",
    lesson: 29,
    scope: "درس 29 — تمرین 29.2",
    text: "A: I'm ________ / B: OK, let's have something to eat then.",
    options: [
      "It's getting late.",
      "I'm getting hot.",
      "I'm getting hungry.",
      "It's getting dark."
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 29، تمرین 29.2."
  },
  {
    category: "vocabulary",
    lesson: 29,
    scope: "درس 29 — تمرین 29.2",
    text: "A: I'm ________ / B: Yes, me too. I'll open the window.",
    options: [
      "I'm getting hungry.",
      "I'm getting hot.",
      "It's getting late.",
      "It's getting dark."
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 29، تمرین 29.2."
  },
  {
    category: "vocabulary",
    lesson: 29,
    scope: "درس 29 — تمرین 29.2",
    text: "A: It's ________ / B: Yes, it is. I think I'll go to bed.",
    options: [
      "It's getting late.",
      "I'm getting hungry.",
      "I'm getting hot.",
      "It's getting dark."
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 29، تمرین 29.2."
  },
  {
    category: "vocabulary",
    lesson: 29,
    scope: "درس 29 — تمرین 29.2",
    text: "A: It's ________ / B: Yes, it is. I'll put the lights on.",
    options: [
      "It's getting late.",
      "I'm getting hungry.",
      "I'm getting hot.",
      "It's getting dark."
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 29، تمرین 29.2."
  },
  {
    category: "vocabulary",
    lesson: 29,
    scope: "درس 29 — تمرین 29.2",
    text: "A: I'm ________ / B: No, you're not. You're getting much better. You understand a lot now.",
    options: [
      "I'm getting hot.",
      "I'm getting hungry.",
      "I'm getting worse at English.",
      "It's getting late."
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 29، تمرین 29.2."
  },
  {
    category: "vocabulary",
    lesson: 29,
    scope: "درس 29 — تمرین 29.3",
    text: "How do you meet people and make friends in this country? / How do you ________ ?",
    options: [
      "get rid of most of the furniture in this room",
      "get on (very) well with my boss",
      "get to know people in this country",
      "How are you getting on?"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 29، تمرین 29.3."
  },
  {
    category: "vocabulary",
    lesson: 29,
    scope: "درس 29 — تمرین 29.3",
    text: "I have a good relationship with my boss. / I ________ ",
    options: [
      "get to know people in this country",
      "get on (very) well with my boss",
      "get rid of most of the furniture in this room",
      "How are you getting on?"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 29، تمرین 29.3."
  },
  {
    category: "vocabulary",
    lesson: 29,
    scope: "درس 29 — تمرین 29.3",
    text: "We would like to throw away most of the furniture in this room. / We would like to ________ ",
    options: [
      "get rid of most of the furniture in this room",
      "get to know people in this country",
      "get on (very) well with my boss",
      "How are you getting on?"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 29، تمرین 29.3."
  },
  {
    category: "vocabulary",
    lesson: 29,
    scope: "درس 29 — تمرین 29.3",
    text: "Someone told me you're doing a new course. How's it going? / Someone told me you're doing a new course. ________ ?",
    options: [
      "get rid of most of the furniture in this room",
      "get to know people in this country",
      "get on (very) well with my boss",
      "How are you getting on?"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 29، تمرین 29.3."
  },
  {
    category: "vocabulary",
    lesson: 29,
    scope: "درس 29 — تمرین 29.3",
    text: "The people in my class really annoy me. / The people in my class ________ ",
    options: [
      "get on (very) well with my boss",
      "get to know people in this country",
      "really get on my nerves",
      "get rid of most of the furniture in this room"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 29، تمرین 29.3."
  },
  {
    category: "vocabulary",
    lesson: 29,
    scope: "درس 29 — تمرین 29.3",
    text: "They're preparing to go out. / They're ________ ",
    options: [
      "get to know people in this country",
      "getting ready to go out",
      "get on (very) well with my boss",
      "get rid of most of the furniture in this room"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 29، تمرین 29.3."
  },
  {
    category: "vocabulary",
    lesson: 29,
    scope: "درس 29 — تمرین 29.3",
    text: "My sister told me to get out of bed. / My sister told me to ________ ",
    options: [
      "get up",
      "get to know people in this country",
      "get on (very) well with my boss",
      "get rid of most of the furniture in this room"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 29، تمرین 29.3."
  },
  {
    category: "vocabulary",
    lesson: 33,
    scope: "درس 33 — تمرین 33.2",
    text: "The teacher has a news about the school trip.",
    options: [
      "The furniture is very old.",
      "I need some information.",
      "The teacher has (some) news about the school trip.",
      "I'm looking for a new pair of jeans. or I'm looking for (some) new jeans."
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 33، تمرین 33.2."
  },
  {
    category: "vocabulary",
    lesson: 33,
    scope: "درس 33 — تمرین 33.2",
    text: "The furnitures are very old.",
    options: [
      "I need some information.",
      "The furniture is very old.",
      "The teacher has (some) news about the school trip.",
      "I'm looking for a new pair of jeans. or I'm looking for (some) new jeans."
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 33، تمرین 33.2."
  },
  {
    category: "vocabulary",
    lesson: 33,
    scope: "درس 33 — تمرین 33.2",
    text: "I'm looking for a new jeans.",
    options: [
      "I'm looking for a new pair of jeans. or I'm looking for (some) new jeans.",
      "I need some information.",
      "The teacher has (some) news about the school trip.",
      "The furniture is very old."
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 33، تمرین 33.2."
  },
  {
    category: "vocabulary",
    lesson: 33,
    scope: "درس 33 — تمرین 33.2",
    text: "Your hairs are getting very long.",
    options: [
      "The furniture is very old.",
      "I need some information.",
      "The teacher has (some) news about the school trip.",
      "Your hair is getting very long."
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 33، تمرین 33.2."
  },
  {
    category: "vocabulary",
    lesson: 33,
    scope: "درس 33 — تمرین 33.2",
    text: "Do you have a scissors?",
    options: [
      "The teacher has (some) news about the school trip.",
      "I need some information.",
      "Do you have any scissors? or Do you have a pair of scissors?",
      "The furniture is very old."
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 33، تمرین 33.2."
  },
  {
    category: "vocabulary",
    lesson: 33,
    scope: "درس 33 — تمرین 33.2",
    text: "We had a lot of homeworks yesterday.",
    options: [
      "I need some information.",
      "We had a lot of homework yesterday.",
      "The teacher has (some) news about the school trip.",
      "The furniture is very old."
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 33، تمرین 33.2."
  },
  {
    category: "vocabulary",
    lesson: 33,
    scope: "درس 33 — تمرین 33.2",
    text: "Do you think she's making a progress with her English?",
    options: [
      "Do you think she's making progress with her English?",
      "I need some information.",
      "The teacher has (some) news about the school trip.",
      "The furniture is very old."
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 33، تمرین 33.2."
  },
  {
    category: "vocabulary",
    lesson: 33,
    scope: "درس 33 — تمرین 33.2",
    text: "These trousers is too small.",
    options: [
      "The furniture is very old.",
      "I need some information.",
      "The teacher has (some) news about the school trip.",
      "These trousers are too small."
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 33، تمرین 33.2."
  },
  {
    category: "vocabulary",
    lesson: 33,
    scope: "درس 33 — تمرین 33.4",
    text: "A: I have to cut this paper into three pieces. B: You need ________ ",
    options: [
      "some advice",
      "some scissors",
      "some sunglasses",
      "some furniture"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 33، تمرین 33.4."
  },
  {
    category: "vocabulary",
    lesson: 33,
    scope: "درس 33 — تمرین 33.4",
    text: "A: I can't see because the sun is in my eyes. B: You need ________ ",
    options: [
      "some scissors",
      "some advice",
      "some sunglasses",
      "some furniture"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 33، تمرین 33.4."
  },
  {
    category: "vocabulary",
    lesson: 33,
    scope: "درس 33 — تمرین 33.4",
    text: "A: I don't know what to do when I leave school. B: You need ________ ",
    options: [
      "some furniture",
      "some scissors",
      "some sunglasses",
      "some advice"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 33، تمرین 33.4."
  },
  {
    category: "vocabulary",
    lesson: 33,
    scope: "درس 33 — تمرین 33.4",
    text: "A: My room looks so empty. B: You need ________ ",
    options: [
      "some advice",
      "some scissors",
      "some sunglasses",
      "some scales"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 33، تمرین 33.4."
  },
  {
    category: "vocabulary",
    lesson: 33,
    scope: "درس 33 — تمرین 33.4",
    text: "A: I want to find out how much I weigh. B: You need ________ ",
    options: [
      "some sunglasses",
      "some scissors",
      "some headphones",
      "some advice"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 33، تمرین 33.4."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.1",
    text: "2 small ..................",
    options: [
      "fascinating",
      "exhausted",
      "astonished",
      "tiny"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.1."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.1",
    text: "3 tired ..................",
    options: [
      "astonished",
      "tiny",
      "exhausted",
      "fascinating"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.1."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.1",
    text: "4 surprised ..................",
    options: [
      "tiny",
      "astonished",
      "exhausted",
      "fascinating"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.1."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.1",
    text: "5 interesting ..................",
    options: [
      "fascinating",
      "tiny",
      "exhausted",
      "astonished"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.1."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.1",
    text: "7 cold ..................",
    options: [
      "exhausted",
      "tiny",
      "freezing",
      "astonished"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.1."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.1",
    text: "8 big ..................",
    options: [
      "tiny",
      "enormous",
      "exhausted",
      "astonished"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.1."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.1",
    text: "9 hungry ..................",
    options: [
      "starving",
      "tiny",
      "exhausted",
      "astonished"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.1."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.1",
    text: "10 frightened ..................",
    options: [
      "astonished",
      "tiny",
      "exhausted",
      "terrified"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.1."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.3",
    text: "2 A: You weren't frightened, were you? B: Yes, it was absolutely ..................",
    options: [
      "starving",
      "astonished",
      "exhausted",
      "terrifying"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.3."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.3",
    text: "3 A: It was a surprising decision, wasn't it? B: Yes, everyone was ..................",
    options: [
      "exhausted",
      "terrifying",
      "astonished",
      "starving"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.3."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.3",
    text: "4 A: Was the journey very tiring? B: Yes, I was ..................",
    options: [
      "terrifying",
      "exhausted",
      "astonished",
      "starving"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.3."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.3",
    text: "5 A: Are you hungry? B: Yes, I'm absolutely ..................",
    options: [
      "starving",
      "terrifying",
      "astonished",
      "exhausted"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.3."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.3",
    text: "6 A: I expect you were very pleased with your score. B: Yes, I was absolutely ..................",
    options: [
      "exhausted",
      "terrifying",
      "astonished",
      "delighted"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.3."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.1",
    text: "brother often us Sundays visits on my",
    options: [
      "I have never broken my leg.",
      "She hardly ever phones me.",
      "My brother often visits us on Sundays.",
      "I hardly ever saw him during the summer."
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.1."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.1",
    text: "me ever phones she hardly",
    options: [
      "My brother often visits us on Sundays.",
      "She hardly ever phones me.",
      "I have never broken my leg.",
      "I hardly ever saw him during the summer."
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.1."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.1",
    text: "have leg my broken never I",
    options: [
      "I have never broken my leg.",
      "My brother often visits us on Sundays.",
      "She hardly ever phones me.",
      "I hardly ever saw him during the summer."
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.1."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.1",
    text: "summer ever saw I hardly him the during",
    options: [
      "I have never broken my leg.",
      "My brother often visits us on Sundays.",
      "She hardly ever phones me.",
      "I hardly ever saw him during the summer."
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.1."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.1",
    text: "get occasionally I early up",
    options: [
      "She hardly ever phones me.",
      "My brother often visits us on Sundays.",
      "I occasionally get up early. ('occasionally' could also begin or end the sentence)",
      "I have never broken my leg."
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.1."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.1",
    text: "lose often I glasses quite my",
    options: [
      "My brother often visits us on Sundays.",
      "I quite often lose my glasses. ('quite often' could also end the sentence)",
      "She hardly ever phones me.",
      "I have never broken my leg."
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.1."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.2",
    text: "She seldom goes to conferences now.",
    options: [
      "nearly",
      "quite",
      "hardly ever",
      "slightly"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.2."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.2",
    text: "The cinema was fairly full.",
    options: [
      "hardly ever",
      "quite",
      "nearly",
      "slightly"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.2."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.2",
    text: "There were almost 50 people there, you know.",
    options: [
      "nearly",
      "hardly ever",
      "quite",
      "slightly"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.2."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.2",
    text: "I thought it was a bit disappointing, didn't you?",
    options: [
      "nearly",
      "hardly ever",
      "quite",
      "slightly"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.2."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.2",
    text: "I'm afraid I'm extremely busy next week.",
    options: [
      "quite",
      "hardly ever",
      "incredibly",
      "nearly"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.2."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.2",
    text: "We frequently ask them to turn their music down.",
    options: [
      "hardly ever",
      "often",
      "quite",
      "nearly"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.2."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.3",
    text: "A: Were the children very noisy? B: No, they ________ ",
    options: [
      "No, it was rather good (actually).",
      "No, it's rather clean (actually).",
      "No, they were rather quiet (actually)."
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.3."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.3",
    text: "A: I've heard it's a very dirty town. Is that true? B: No, it ________ ",
    options: [
      "No, it was rather good (actually).",
      "No, they were rather quiet (actually).",
      "No, it's rather clean (actually)."
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.3."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.3",
    text: "A: Was the weather bad? B: No, it ________ ",
    options: [
      "No, it's rather clean (actually).",
      "No, they were rather quiet (actually).",
      "No, it was rather good (actually)."
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.3."
  },
  {
    category: "vocabulary",
    lesson: 47,
    scope: "درس 47 — تمرین 47.2",
    text: "2 ________ ",
    options: [
      "cheek",
      "forehead",
      "chin",
      "arm"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 47، تمرین 47.2."
  },
  {
    category: "vocabulary",
    lesson: 47,
    scope: "درس 47 — تمرین 47.2",
    text: "3 ________ ",
    options: [
      "arm",
      "forehead",
      "cheek",
      "chin"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 47، تمرین 47.2."
  },
  {
    category: "vocabulary",
    lesson: 47,
    scope: "درس 47 — تمرین 47.2",
    text: "4 ________ ",
    options: [
      "cheek",
      "forehead",
      "arm",
      "chin"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 47، تمرین 47.2."
  },
  {
    category: "vocabulary",
    lesson: 47,
    scope: "درس 47 — تمرین 47.2",
    text: "5 ________ ",
    options: [
      "forehead",
      "chest",
      "cheek",
      "chin"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 47، تمرین 47.2."
  },
  {
    category: "vocabulary",
    lesson: 47,
    scope: "درس 47 — تمرین 47.2",
    text: "6 ________ ",
    options: [
      "hip",
      "forehead",
      "cheek",
      "chin"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 47، تمرین 47.2."
  },
  {
    category: "vocabulary",
    lesson: 47,
    scope: "درس 47 — تمرین 47.2",
    text: "7 ________ ",
    options: [
      "chin",
      "forehead",
      "cheek",
      "thigh"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 47، تمرین 47.2."
  },
  {
    category: "vocabulary",
    lesson: 47,
    scope: "درس 47 — تمرین 47.2",
    text: "8 ________ ",
    options: [
      "cheek",
      "forehead",
      "knee",
      "chin"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 47، تمرین 47.2."
  },
  {
    category: "vocabulary",
    lesson: 47,
    scope: "درس 47 — تمرین 47.2",
    text: "9 ________ ",
    options: [
      "forehead",
      "foot",
      "cheek",
      "chin"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 47، تمرین 47.2."
  },
  {
    category: "vocabulary",
    lesson: 47,
    scope: "درس 47 — تمرین 47.2",
    text: "10 ________ ",
    options: [
      "toes",
      "forehead",
      "cheek",
      "chin"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 47، تمرین 47.2."
  },
  {
    category: "vocabulary",
    lesson: 47,
    scope: "درس 47 — تمرین 47.2",
    text: "11 ________ ",
    options: [
      "chin",
      "forehead",
      "cheek",
      "neck"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 47، تمرین 47.2."
  },
  {
    category: "vocabulary",
    lesson: 47,
    scope: "درس 47 — تمرین 47.2",
    text: "12 ________ ",
    options: [
      "cheek",
      "forehead",
      "shoulder",
      "chin"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 47، تمرین 47.2."
  },
  {
    category: "vocabulary",
    lesson: 47,
    scope: "درس 47 — تمرین 47.2",
    text: "13 ________ ",
    options: [
      "forehead",
      "elbow",
      "cheek",
      "chin"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 47، تمرین 47.2."
  },
  {
    category: "vocabulary",
    lesson: 47,
    scope: "درس 47 — تمرین 47.2",
    text: "14 ________ ",
    options: [
      "waist",
      "forehead",
      "cheek",
      "chin"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 47، تمرین 47.2."
  },
  {
    category: "vocabulary",
    lesson: 47,
    scope: "درس 47 — تمرین 47.2",
    text: "15 ________ ",
    options: [
      "chin",
      "forehead",
      "cheek",
      "bottom"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 47، تمرین 47.2."
  },
  {
    category: "vocabulary",
    lesson: 47,
    scope: "درس 47 — تمرین 47.2",
    text: "16 ________ ",
    options: [
      "cheek",
      "forehead",
      "wrist",
      "chin"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 47، تمرین 47.2."
  },
  {
    category: "vocabulary",
    lesson: 47,
    scope: "درس 47 — تمرین 47.2",
    text: "17 ________ ",
    options: [
      "forehead",
      "hand",
      "cheek",
      "chin"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 47، تمرین 47.2."
  },
  {
    category: "vocabulary",
    lesson: 47,
    scope: "درس 47 — تمرین 47.2",
    text: "18 ________ ",
    options: [
      "fingers",
      "forehead",
      "cheek",
      "chin"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 47، تمرین 47.2."
  },
  {
    category: "vocabulary",
    lesson: 47,
    scope: "درس 47 — تمرین 47.2",
    text: "19 ________ ",
    options: [
      "chin",
      "forehead",
      "cheek",
      "heel"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 47، تمرین 47.2."
  },
  {
    category: "vocabulary",
    lesson: 47,
    scope: "درس 47 — تمرین 47.2",
    text: "20 ________ ",
    options: [
      "cheek",
      "forehead",
      "ankle",
      "chin"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 47، تمرین 47.2."
  },
  {
    category: "vocabulary",
    lesson: 47,
    scope: "درس 47 — تمرین 47.3",
    text: "2 bite ________ ",
    options: [
      "your nails",
      "your arms",
      "your nose",
      "your head"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 47، تمرین 47.3."
  },
  {
    category: "vocabulary",
    lesson: 47,
    scope: "درس 47 — تمرین 47.3",
    text: "3 comb ________ ",
    options: [
      "your nails",
      "your arms",
      "your nose",
      "your hair"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 47، تمرین 47.3."
  },
  {
    category: "vocabulary",
    lesson: 47,
    scope: "درس 47 — تمرین 47.3",
    text: "4 fold ________ ",
    options: [
      "your nails",
      "your nose",
      "your arms",
      "your head"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 47، تمرین 47.3."
  },
  {
    category: "vocabulary",
    lesson: 47,
    scope: "درس 47 — تمرین 47.3",
    text: "5 blow ________ ",
    options: [
      "your arms",
      "your nose",
      "your nails",
      "your head"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 47، تمرین 47.3."
  },
  {
    category: "vocabulary",
    lesson: 47,
    scope: "درس 47 — تمرین 47.3",
    text: "6 nod ________ ",
    options: [
      "your head",
      "your arms",
      "your nose",
      "your nails"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 47، تمرین 47.3."
  },
  {
    category: "vocabulary",
    lesson: 47,
    scope: "درس 47 — تمرین 47.4",
    text: "2 They often breathe quickly after ________ ",
    options: [
      "running",
      "they're happy or when someone says something funny",
      "when they're nervous",
      "when they have a cold"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 47، تمرین 47.4."
  },
  {
    category: "vocabulary",
    lesson: 47,
    scope: "درس 47 — تمرین 47.4",
    text: "3 They laugh when ________ ",
    options: [
      "when they have a cold",
      "running",
      "when they're nervous",
      "they're happy or when someone says something funny"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 47، تمرین 47.4."
  },
  {
    category: "vocabulary",
    lesson: 47,
    scope: "درس 47 — تمرین 47.4",
    text: "4 They may bite their nails ________ ",
    options: [
      "they're happy or when someone says something funny",
      "running",
      "when they're nervous",
      "when they have a cold"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 47، تمرین 47.4."
  },
  {
    category: "vocabulary",
    lesson: 47,
    scope: "درس 47 — تمرین 47.4",
    text: "5 They blow their nose ________ ",
    options: [
      "running",
      "when they have a cold",
      "they're happy or when someone says something funny",
      "when they're nervous"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 47، تمرین 47.4."
  },
  {
    category: "vocabulary",
    lesson: 47,
    scope: "درس 47 — تمرین 47.4",
    text: "6 They shake their head ________ ",
    options: [
      "when they want to say 'no'",
      "running",
      "they're happy or when someone says something funny",
      "when they're nervous"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 47، تمرین 47.4."
  },
  {
    category: "vocabulary",
    lesson: 47,
    scope: "درس 47 — تمرین 47.4",
    text: "7 And nod their head ________ ",
    options: [
      "when they're nervous",
      "running",
      "they're happy or when someone says something funny",
      "when they mean 'yes'"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 47، تمرین 47.4."
  },
  {
    category: "vocabulary",
    lesson: 47,
    scope: "درس 47 — تمرین 47.4",
    text: "9 They yawn when ________ ",
    options: [
      "running",
      "they're tired or bored",
      "they're happy or when someone says something funny",
      "when they're nervous"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 47، تمرین 47.4."
  },
  {
    category: "vocabulary",
    lesson: 52,
    scope: "درس 52 — تمرین 52.1",
    text: "Albert was a bus driver for 40 years but stopped work two years ago, so he's now ________ ",
    options: [
      "(early) thirties",
      "(mid-) twenties",
      "(late) forties (NOT in her middle age)",
      "retired"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 52، تمرین 52.1."
  },
  {
    category: "vocabulary",
    lesson: 52,
    scope: "درس 52 — تمرین 52.1",
    text: "Susan is 25, so she is in her ________ ",
    options: [
      "(late) forties (NOT in her middle age)",
      "retired",
      "(mid-) twenties",
      "(early) thirties"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 52، تمرین 52.1."
  },
  {
    category: "vocabulary",
    lesson: 52,
    scope: "درس 52 — تمرین 52.1",
    text: "Caroline is 48 this year so she is now in her ________ ",
    options: [
      "retired",
      "(late) forties (NOT in her middle age)",
      "(mid-) twenties",
      "(early) thirties"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 52، تمرین 52.1."
  },
  {
    category: "vocabulary",
    lesson: 52,
    scope: "درس 52 — تمرین 52.1",
    text: "Ron is 33 and his wife is 32, so they are both in their ________ ",
    options: [
      "(early) thirties",
      "retired",
      "(mid-) twenties",
      "(late) forties (NOT in her middle age)"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 52، تمرین 52.1."
  },
  {
    category: "vocabulary",
    lesson: 52,
    scope: "درس 52 — تمرین 52.1",
    text: "Joan is 75 this year, so she is quite ________ ",
    options: [
      "(late) forties (NOT in her middle age)",
      "retired",
      "(mid-) twenties",
      "elderly"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 52، تمرین 52.1."
  },
  {
    category: "vocabulary",
    lesson: 52,
    scope: "درس 52 — تمرین 52.1",
    text: "Jason was born six weeks ago, so he's a ________ ",
    options: [
      "(mid-) twenties",
      "retired",
      "baby",
      "(late) forties (NOT in her middle age)"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 52، تمرین 52.1."
  },
  {
    category: "vocabulary",
    lesson: 52,
    scope: "درس 52 — تمرین 52.1",
    text: "Leyla is 13 this year, so she'll soon be a ________ ",
    options: [
      "retired",
      "teenager",
      "(mid-) twenties",
      "(late) forties (NOT in her middle age)"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 52، تمرین 52.1."
  },
  {
    category: "vocabulary",
    lesson: 52,
    scope: "درس 52 — تمرین 52.1",
    text: "Ravi is 18 this year, so legally he becomes an ________ ",
    options: [
      "adult",
      "retired",
      "(mid-) twenties",
      "(late) forties (NOT in her middle age)"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 52، تمرین 52.1."
  },
  {
    category: "vocabulary",
    lesson: 52,
    scope: "درس 52 — تمرین 52.1",
    text: "15 is often a difficult age for boys going through ________ ",
    options: [
      "(late) forties (NOT in her middle age)",
      "retired",
      "(mid-) twenties",
      "adolescence (NOT teenage)"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 52، تمرین 52.1."
  },
  {
    category: "vocabulary",
    lesson: 52,
    scope: "درس 52 — تمرین 52.2",
    text: "He grew up in the south of Ireland.",
    options: [
      "False",
      "True"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 52، تمرین 52.2."
  },
  {
    category: "vocabulary",
    lesson: 52,
    scope: "درس 52 — تمرین 52.2",
    text: "He went out with Anthea for two years.",
    options: [
      "True",
      "False"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 52، تمرین 52.2."
  },
  {
    category: "vocabulary",
    lesson: 52,
    scope: "درس 52 — تمرین 52.2",
    text: "They split up because Sam went to live in Japan.",
    options: [
      "False",
      "True"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 52، تمرین 52.2."
  },
  {
    category: "vocabulary",
    lesson: 52,
    scope: "درس 52 — تمرین 52.2",
    text: "Sam fell in love with Marie.",
    options: [
      "True",
      "False"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 52، تمرین 52.2."
  },
  {
    category: "vocabulary",
    lesson: 52,
    scope: "درس 52 — تمرین 52.2",
    text: "They had a baby a year after they got married.",
    options: [
      "False",
      "True"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 52، تمرین 52.2."
  },
  {
    category: "vocabulary",
    lesson: 52,
    scope: "درس 52 — تمرین 52.2",
    text: "Marie is now expecting her third child.",
    options: [
      "True",
      "False"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 52، تمرین 52.2."
  },
  {
    category: "vocabulary",
    lesson: 52,
    scope: "درس 52 — تمرین 52.2",
    text: "Marie left Sam.",
    options: [
      "False",
      "True"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 52، تمرین 52.2."
  },
  {
    category: "vocabulary",
    lesson: 56,
    scope: "درس 56 — تمرین 56.1",
    text: "1 I cleaned",
    options: [
      "my teeth",
      "the light",
      "into bed",
      "wash"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 56، تمرین 56.1."
  },
  {
    category: "vocabulary",
    lesson: 56,
    scope: "درس 56 — تمرین 56.1",
    text: "2 I went",
    options: [
      "wash",
      "the light",
      "into bed",
      "I had a wash."
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 56، تمرین 56.1."
  },
  {
    category: "vocabulary",
    lesson: 56,
    scope: "درس 56 — تمرین 56.1",
    text: "3 I set",
    options: [
      "into bed",
      "the light",
      "my pyjamas",
      "wash"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 56، تمرین 56.1."
  },
  {
    category: "vocabulary",
    lesson: 56,
    scope: "درس 56 — تمرین 56.1",
    text: "4 I switched off",
    options: [
      "the light",
      "into bed",
      "wash",
      "my teeth"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 56، تمرین 56.1."
  },
  {
    category: "vocabulary",
    lesson: 56,
    scope: "درس 56 — تمرین 56.1",
    text: "5 I had",
    options: [
      "the alarm clock",
      "the light",
      "into bed",
      "wash"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 56، تمرین 56.1."
  },
  {
    category: "vocabulary",
    lesson: 56,
    scope: "درس 56 — تمرین 56.1",
    text: "6 I put on",
    options: [
      "my teeth",
      "into bed",
      "wash",
      "the light"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 56، تمرین 56.1."
  },
  {
    category: "vocabulary",
    lesson: 56,
    scope: "درس 56 — تمرین 56.1",
    text: "7 I got",
    options: [
      "into bed",
      "the light",
      "to sleep",
      "wash"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 56، تمرین 56.1."
  },
  {
    category: "vocabulary",
    lesson: 56,
    scope: "درس 56 — تمرین 56.2",
    text: "2 He ________ ",
    options: [
      "He did the washing-up.",
      "He did the ironing.",
      "He did the washing.",
      "He hoovered the living room."
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 56، تمرین 56.2."
  },
  {
    category: "vocabulary",
    lesson: 56,
    scope: "درس 56 — تمرین 56.2",
    text: "3 He ________ ",
    options: [
      "He did the washing.",
      "He hoovered the living room.",
      "He did the ironing.",
      "He did the washing-up."
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 56، تمرین 56.2."
  },
  {
    category: "vocabulary",
    lesson: 56,
    scope: "درس 56 — تمرین 56.2",
    text: "4 He ________ ",
    options: [
      "He hoovered the living room.",
      "He did the washing.",
      "He did the ironing.",
      "He did the washing-up."
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 56، تمرین 56.2."
  },
  {
    category: "vocabulary",
    lesson: 56,
    scope: "درس 56 — تمرین 56.2",
    text: "5 He ________ ",
    options: [
      "He did the washing-up.",
      "He hoovered the living room.",
      "He did the ironing.",
      "He did the washing."
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 56، تمرین 56.2."
  },
  {
    category: "vocabulary",
    lesson: 56,
    scope: "درس 56 — تمرین 56.2",
    text: "6 He ________ ",
    options: [
      "He did the washing.",
      "He hoovered the living room.",
      "He did the ironing.",
      "He made the bed."
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 56، تمرین 56.2."
  },
  {
    category: "vocabulary",
    lesson: 56,
    scope: "درس 56 — تمرین 56.4",
    text: "1 Does the alarm clock show 11.30?",
    options: [
      "Yes",
      "Two pillows",
      "Three (that we can see)",
      "No"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 56، تمرین 56.4."
  },
  {
    category: "vocabulary",
    lesson: 56,
    scope: "درس 56 — تمرین 56.4",
    text: "2 Does the bed have one pillow or two?",
    options: [
      "No",
      "Yes",
      "Three (that we can see)",
      "Two pillows"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 56، تمرین 56.4."
  },
  {
    category: "vocabulary",
    lesson: 56,
    scope: "درس 56 — تمرین 56.4",
    text: "3 Is the wardrobe open?",
    options: [
      "Three (that we can see)",
      "Two pillows",
      "Yes",
      "No"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 56، تمرین 56.4."
  },
  {
    category: "vocabulary",
    lesson: 56,
    scope: "درس 56 — تمرین 56.4",
    text: "4 How many drawers does the chest of drawers have?",
    options: [
      "Yes",
      "Three (that we can see)",
      "Two pillows",
      "No"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 56، تمرین 56.4."
  },
  {
    category: "vocabulary",
    lesson: 56,
    scope: "درس 56 — تمرین 56.4",
    text: "5 Is the woman in the bathroom holding a towel?",
    options: [
      "No",
      "Yes",
      "Two pillows",
      "Three (that we can see)"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 56، تمرین 56.4."
  },
  {
    category: "vocabulary",
    lesson: 56,
    scope: "درس 56 — تمرین 56.4",
    text: "6 Is the shower above the bath?",
    options: [
      "No",
      "Two pillows",
      "Three (that we can see)",
      "Yes"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 56، تمرین 56.4."
  },
  {
    category: "vocabulary",
    lesson: 57,
    scope: "درس 57 — تمرین 57.4",
    text: "2 How did you break that wine glass?",
    options: [
      "It's not working properly.",
      "I fell over",
      "I dropped it (on the floor).",
      "(I'm afraid) I lost it."
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 57، تمرین 57.4."
  },
  {
    category: "vocabulary",
    lesson: 57,
    scope: "درس 57 — تمرین 57.4",
    text: "3 How did you cut your knee like that?",
    options: [
      "I dropped it (on the floor).",
      "I fell over",
      "It's not working properly.",
      "(I'm afraid) I lost it."
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 57، تمرین 57.4."
  },
  {
    category: "vocabulary",
    lesson: 57,
    scope: "درس 57 — تمرین 57.4",
    text: "4 I'm cold. What's wrong with the central heating?",
    options: [
      "It's not working properly.",
      "I dropped it (on the floor).",
      "I fell over",
      "(I'm afraid) I lost it."
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 57، تمرین 57.4."
  },
  {
    category: "vocabulary",
    lesson: 57,
    scope: "درس 57 — تمرین 57.4",
    text: "5 What happened to the money I gave you?",
    options: [
      "It's not working properly.",
      "I dropped it (on the floor).",
      "I fell over",
      "(I'm afraid) I lost it."
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 57، تمرین 57.4."
  },
  {
    category: "vocabulary",
    lesson: 57,
    scope: "درس 57 — تمرین 57.4",
    text: "6 Where's your homework?",
    options: [
      "I fell over",
      "I dropped it (on the floor).",
      "I left it at home.",
      "It's not working properly."
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 57، تمرین 57.4."
  },
  {
    category: "vocabulary",
    lesson: 57,
    scope: "درس 57 — تمرین 57.4",
    text: "7 What's wrong with this radio?",
    options: [
      "I dropped it (on the floor).",
      "It's not working.",
      "I fell over",
      "It's not working properly."
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 57، تمرین 57.4."
  },
  {
    category: "vocabulary",
    lesson: 57,
    scope: "درس 57 — تمرین 57.4",
    text: "8 Why can't you use the public phone in the station?",
    options: [
      "It's out of order.",
      "I dropped it (on the floor).",
      "I fell over",
      "It's not working properly."
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 57، تمرین 57.4."
  },
  {
    category: "vocabulary",
    lesson: 60,
    scope: "درس 60 — تمرین 60.2",
    text: "cut — (verb)",
    options: [
      "noun",
      "cut",
      "injury",
      "shot"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 60، تمرین 60.2."
  },
  {
    category: "vocabulary",
    lesson: 60,
    scope: "درس 60 — تمرین 60.2",
    text: "injury — (verb)",
    options: [
      "shot",
      "cut",
      "injury",
      "injury – injure"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 60، تمرین 60.2."
  },
  {
    category: "vocabulary",
    lesson: 60,
    scope: "درس 60 — تمرین 60.2",
    text: "shot — (verb)",
    options: [
      "injury",
      "cut",
      "shot – shoot",
      "shot"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 60، تمرین 60.2."
  },
  {
    category: "vocabulary",
    lesson: 60,
    scope: "درس 60 — تمرین 60.2",
    text: "blood — (verb)",
    options: [
      "cut",
      "blood – bleed",
      "injury",
      "shot"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 60، تمرین 60.2."
  },
  {
    category: "vocabulary",
    lesson: 60,
    scope: "درس 60 — تمرین 60.2",
    text: "bruise — (verb)",
    options: [
      "bruise – bruise",
      "cut",
      "injury",
      "shot"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 60، تمرین 60.2."
  },
  {
    category: "vocabulary",
    lesson: 60,
    scope: "درس 60 — تمرین 60.2",
    text: "treatment — (verb)",
    options: [
      "shot",
      "cut",
      "injury",
      "treatment – treat"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 60، تمرین 60.2."
  },
  {
    category: "vocabulary",
    lesson: 63,
    scope: "درس 63 — تمرین 63.1",
    text: "1 beginning with the letter 'p'",
    options: [
      "beans",
      "potato",
      "mushroom; melon",
      "carrot"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 63، تمرین 63.1."
  },
  {
    category: "vocabulary",
    lesson: 63,
    scope: "درس 63 — تمرین 63.1",
    text: "2 beginning with the letter 'b'",
    options: [
      "beans",
      "potato",
      "mushroom; melon",
      "carrot"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 63، تمرین 63.1."
  },
  {
    category: "vocabulary",
    lesson: 63,
    scope: "درس 63 — تمرین 63.1",
    text: "3 beginning with the letter 'm'",
    options: [
      "carrot",
      "potato",
      "beans",
      "mushroom; melon"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 63، تمرین 63.1."
  },
  {
    category: "vocabulary",
    lesson: 63,
    scope: "درس 63 — تمرین 63.1",
    text: "4 beginning with the letter 'c'",
    options: [
      "beans",
      "potato",
      "carrot",
      "mushroom; melon"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 63، تمرین 63.1."
  },
  {
    category: "vocabulary",
    lesson: 63,
    scope: "درس 63 — تمرین 63.1",
    text: "5 beginning with the letter 'a'",
    options: [
      "potato",
      "aubergine; apple",
      "beans",
      "mushroom; melon"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 63، تمرین 63.1."
  },
  {
    category: "vocabulary",
    lesson: 63,
    scope: "درس 63 — تمرین 63.5",
    text: "1 the meat from a cow?",
    options: [
      "veal",
      "beef",
      "pork",
      "lettuce"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 63، تمرین 63.5."
  },
  {
    category: "vocabulary",
    lesson: 63,
    scope: "درس 63 — تمرین 63.5",
    text: "2 the meat from a calf?",
    options: [
      "veal",
      "beef",
      "pork",
      "lettuce"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 63، تمرین 63.5."
  },
  {
    category: "vocabulary",
    lesson: 63,
    scope: "درس 63 — تمرین 63.5",
    text: "3 the meat from a pig?",
    options: [
      "lettuce",
      "beef",
      "veal",
      "pork"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 63، تمرین 63.5."
  },
  {
    category: "vocabulary",
    lesson: 63,
    scope: "درس 63 — تمرین 63.5",
    text: "4 the main vegetable in a green salad?",
    options: [
      "veal",
      "beef",
      "lettuce",
      "pork"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 63، تمرین 63.5."
  },
  {
    category: "vocabulary",
    lesson: 63,
    scope: "درس 63 — تمرین 63.5",
    text: "5 the two things we often put on salad? Oil and ________ or ________ ",
    options: [
      "beef",
      "vinegar or lemon juice",
      "veal",
      "pork"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 63، تمرین 63.5."
  },
  {
    category: "vocabulary",
    lesson: 64,
    scope: "درس 64 — تمرین 64.2",
    text: "2 Which dish contains pasta?",
    options: [
      "steak in a pepper sauce",
      "steak",
      "roast fillet of pork",
      "spaghetti with courgette and bacon"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 64، تمرین 64.2."
  },
  {
    category: "vocabulary",
    lesson: 64,
    scope: "درس 64 — تمرین 64.2",
    text: "3 Which main course may be rare or well-done?",
    options: [
      "roast fillet of pork",
      "spaghetti with courgette and bacon",
      "steak",
      "steak in a pepper sauce"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 64، تمرین 64.2."
  },
  {
    category: "vocabulary",
    lesson: 64,
    scope: "درس 64 — تمرین 64.2",
    text: "4 Which main course is definitely cooked in the oven?",
    options: [
      "spaghetti with courgette and bacon",
      "roast fillet of pork",
      "steak",
      "steak in a pepper sauce"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 64، تمرین 64.2."
  },
  {
    category: "vocabulary",
    lesson: 64,
    scope: "درس 64 — تمرین 64.2",
    text: "5 Which main course will probably be quite spicy?",
    options: [
      "steak in a pepper sauce",
      "spaghetti with courgette and bacon",
      "steak",
      "roast fillet of pork"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 64، تمرین 64.2."
  },
  {
    category: "vocabulary",
    lesson: 64,
    scope: "درس 64 — تمرین 64.2",
    text: "6 Which main course contains alcohol?",
    options: [
      "roast fillet of pork",
      "spaghetti with courgette and bacon",
      "steak",
      "breast of chicken in a white wine sauce"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 64، تمرین 64.2."
  },
  {
    category: "vocabulary",
    lesson: 64,
    scope: "درس 64 — تمرین 64.2",
    text: "7 Which dessert(s) will be quite sweet?",
    options: [
      "steak",
      "spaghetti with courgette and bacon",
      "ice cream and chocolate mousse",
      "roast fillet of pork"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 64، تمرین 64.2."
  },
  {
    category: "vocabulary",
    lesson: 64,
    scope: "درس 64 — تمرین 64.2",
    text: "8 If you don't want to put on weight, which would probably be the best dish for the main course?",
    options: [
      "spaghetti with courgette and bacon",
      "probably: the salmon",
      "steak",
      "roast fillet of pork"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 64، تمرین 64.2."
  },
  {
    category: "vocabulary",
    lesson: 65,
    scope: "درس 65 — تمرین 65.2",
    text: "A: There are cinemas, theatres, museums, art galleries and everything.\nB: Yes, I know, there are lots of ..................",
    options: [
      "nightlife",
      "wide range; whatever (or anything)",
      "cultural activities",
      "opportunities"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 65، تمرین 65.2."
  },
  {
    category: "vocabulary",
    lesson: 65,
    scope: "درس 65 — تمرین 65.2",
    text: "A: There's a .................. .................. of shops.\nB: Oh yes. You can buy .................. you want.",
    options: [
      "cultural activities",
      "wide range; whatever (or anything)",
      "nightlife",
      "opportunities"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 65، تمرین 65.2."
  },
  {
    category: "vocabulary",
    lesson: 65,
    scope: "درس 65 — تمرین 65.2",
    text: "A: There's plenty to do in the evening.\nB: Yes, the .................. is great.",
    options: [
      "nightlife",
      "cultural activities",
      "wide range; whatever (or anything)",
      "opportunities"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 65، تمرین 65.2."
  },
  {
    category: "vocabulary",
    lesson: 65,
    scope: "درس 65 — تمرین 65.2",
    text: "A: There's a better chance of finding work.\nB: Yes, there are more job ..................",
    options: [
      "nightlife",
      "cultural activities",
      "wide range; whatever (or anything)",
      "opportunities"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 65، تمرین 65.2."
  },
  {
    category: "vocabulary",
    lesson: 65,
    scope: "درس 65 — تمرین 65.2",
    text: "A: The transport system has to .................. with the people who live in the country but work in town.\nB: Yes, I know, there are too many ..................",
    options: [
      "wide range; whatever (or anything)",
      "cultural activities",
      "cope; commuters",
      "nightlife"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 65، تمرین 65.2."
  },
  {
    category: "vocabulary",
    lesson: 69,
    scope: "درس 69 — تمرین 69.3",
    text: "Example I'm a banker. / I work in ________ ",
    options: [
      "My total income is £30,000.",
      "I work for the government.",
      "My salary is $50,000.",
      "What's your job?"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 69، تمرین 69.3."
  },
  {
    category: "vocabulary",
    lesson: 69,
    scope: "درس 69 — تمرین 69.3",
    text: "1 What do you do? / What's ________ ",
    options: [
      "My salary is $50,000.",
      "What's your job?",
      "I work for the government.",
      "My total income is £30,000."
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 69، تمرین 69.3."
  },
  {
    category: "vocabulary",
    lesson: 69,
    scope: "درس 69 — تمرین 69.3",
    text: "2 I'm employed by the government. / I work ________ ",
    options: [
      "What's your job?",
      "My salary is $50,000.",
      "I work for the government.",
      "My total income is £30,000."
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 69، تمرین 69.3."
  },
  {
    category: "vocabulary",
    lesson: 69,
    scope: "درس 69 — تمرین 69.3",
    text: "3 I earn $50,000. / My ________ ",
    options: [
      "My total income is £30,000.",
      "What's your job?",
      "I work for the government.",
      "My salary is $50,000."
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 69، تمرین 69.3."
  },
  {
    category: "vocabulary",
    lesson: 69,
    scope: "درس 69 — تمرین 69.3",
    text: "4 I get £20,000 from my teaching job and another £10,000 from writing. / My total ________ ",
    options: [
      "My salary is $50,000.",
      "What's your job?",
      "I work for the government.",
      "My job involves looking after all the computers."
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 69، تمرین 69.3."
  },
  {
    category: "vocabulary",
    lesson: 69,
    scope: "درس 69 — تمرین 69.3",
    text: "5 In my job I look after all the computers in the building. / My job involves ________ ",
    options: [
      "I work for the government.",
      "What's your job?",
      "I'm in charge of one of the departments.",
      "My salary is $50,000."
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 69، تمرین 69.3."
  },
  {
    category: "vocabulary",
    lesson: 69,
    scope: "درس 69 — تمرین 69.4",
    text: "A: ________ ?  B: I start at nine and finish at four.",
    options: [
      "A: Do you get sick pay?",
      "A: Do you do",
      "A: How much holiday",
      "A: What are your working hours?"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 69، تمرین 69.4."
  },
  {
    category: "vocabulary",
    lesson: 69,
    scope: "درس 69 — تمرین 69.4",
    text: "A: ________ ?  B: Yes, a bit. On certain courses I work until 5.30.",
    options: [
      "A: How much holiday",
      "A: What are your working hours?",
      "A: Do you do",
      "A: Do you get sick pay?"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 69، تمرین 69.4."
  },
  {
    category: "vocabulary",
    lesson: 69,
    scope: "درس 69 — تمرین 69.4",
    text: "A: ________ ?  B: 12 weeks. That's one of the good things.",
    options: [
      "A: What are your working hours?",
      "A: How much holiday",
      "A: Do you do",
      "A: Do you get sick pay?"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 69، تمرین 69.4."
  },
  {
    category: "vocabulary",
    lesson: 69,
    scope: "درس 69 — تمرین 69.4",
    text: "A: ________ ?  B: Yes, we do, but we have to have a doctor's note.",
    options: [
      "A: Do you get sick pay?",
      "A: What are your working hours?",
      "A: Do you do",
      "A: How much holiday"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 69، تمرین 69.4."
  },
  {
    category: "vocabulary",
    lesson: 70,
    scope: "درس 70 — تمرین 70.1",
    text: "2 Someone with very bad eyesight (= cannot see very well)",
    options: [
      "a sailor",
      "a pilot",
      "a mechanic",
      "a police officer"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 70، تمرین 70.1."
  },
  {
    category: "vocabulary",
    lesson: 70,
    scope: "درس 70 — تمرین 70.1",
    text: "3 Someone who is always seasick on a boat",
    options: [
      "a sailor",
      "a pilot",
      "a mechanic",
      "a police officer"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 70، تمرین 70.1."
  },
  {
    category: "vocabulary",
    lesson: 70,
    scope: "درس 70 — تمرین 70.1",
    text: "4 Someone who understands nothing about cars",
    options: [
      "a police officer",
      "a pilot",
      "a sailor",
      "a mechanic"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 70، تمرین 70.1."
  },
  {
    category: "vocabulary",
    lesson: 70,
    scope: "درس 70 — تمرین 70.1",
    text: "5 Someone who will not work in the evening or at weekends",
    options: [
      "a sailor",
      "a pilot",
      "a police officer",
      "a mechanic"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 70، تمرین 70.1."
  },
  {
    category: "vocabulary",
    lesson: 70,
    scope: "درس 70 — تمرین 70.1",
    text: "6 Someone who is afraid of dogs",
    options: [
      "a pilot",
      "a vet",
      "a sailor",
      "a mechanic"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 70، تمرین 70.1."
  },
  {
    category: "vocabulary",
    lesson: 70,
    scope: "درس 70 — تمرین 70.1",
    text: "7 Someone who is afraid of heights and high places",
    options: [
      "a firefighter",
      "a pilot",
      "a sailor",
      "a mechanic"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 70، تمرین 70.1."
  },
  {
    category: "vocabulary",
    lesson: 70,
    scope: "درس 70 — تمرین 70.1",
    text: "8 Someone who is terrible at numbers and maths",
    options: [
      "a mechanic",
      "a pilot",
      "a sailor",
      "an accountant"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 70، تمرین 70.1."
  },
  {
    category: "vocabulary",
    lesson: 70,
    scope: "درس 70 — تمرین 70.1",
    text: "10 Someone who is a pacifist (= is anti-war)",
    options: [
      "a pilot",
      "someone in the army, navy or air force",
      "a sailor",
      "a mechanic"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 70، تمرین 70.1."
  },
  {
    category: "vocabulary",
    lesson: 70,
    scope: "درس 70 — تمرین 70.2",
    text: "2 An architect ________ ",
    options: [
      "controls the financial situation of people and companies",
      "designs buildings",
      "treats animals",
      "represents people with legal problems"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 70، تمرین 70.2."
  },
  {
    category: "vocabulary",
    lesson: 70,
    scope: "درس 70 — تمرین 70.2",
    text: "3 An accountant ________ ",
    options: [
      "controls the financial situation of people and companies",
      "designs buildings",
      "treats animals",
      "represents people with legal problems"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 70، تمرین 70.2."
  },
  {
    category: "vocabulary",
    lesson: 70,
    scope: "درس 70 — تمرین 70.2",
    text: "4 A vet ________ ",
    options: [
      "represents people with legal problems",
      "designs buildings",
      "controls the financial situation of people and companies",
      "treats animals"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 70، تمرین 70.2."
  },
  {
    category: "vocabulary",
    lesson: 70,
    scope: "درس 70 — تمرین 70.2",
    text: "5 A lawyer ________ ",
    options: [
      "controls the financial situation of people and companies",
      "designs buildings",
      "represents people with legal problems",
      "treats animals"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 70، تمرین 70.2."
  },
  {
    category: "vocabulary",
    lesson: 70,
    scope: "درس 70 — تمرین 70.2",
    text: "7 A bricklayer ________ ",
    options: [
      "builds walls",
      "designs buildings",
      "controls the financial situation of people and companies",
      "treats animals"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 70، تمرین 70.2."
  },
  {
    category: "vocabulary",
    lesson: 70,
    scope: "درس 70 — تمرین 70.2",
    text: "8 A stockbroker ________ ",
    options: [
      "treats animals",
      "designs buildings",
      "controls the financial situation of people and companies",
      "buys and sells shares"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 70، تمرین 70.2."
  },
  {
    category: "vocabulary",
    lesson: 70,
    scope: "درس 70 — تمرین 70.2",
    text: "9 A mechanic ________ ",
    options: [
      "controls the financial situation of people and companies",
      "designs buildings",
      "repairs cars",
      "treats animals"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 70، تمرین 70.2."
  },
  {
    category: "vocabulary",
    lesson: 70,
    scope: "درس 70 — تمرین 70.2",
    text: "10 A surgeon ________ ",
    options: [
      "designs buildings",
      "operates on people",
      "controls the financial situation of people and companies",
      "treats animals"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 70، تمرین 70.2."
  },
  {
    category: "vocabulary",
    lesson: 70,
    scope: "درس 70 — تمرین 70.3",
    text: "Example A: She's a police officer. B: Really? When did she join the police force?",
    options: [
      "Really? When did he join the air force?",
      "Really? When did he join the navy?",
      "Really? When did she join the army?",
      "Really? When did he join the fire brigade?"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 70، تمرین 70.3."
  },
  {
    category: "vocabulary",
    lesson: 70,
    scope: "درس 70 — تمرین 70.3",
    text: "1 A: She's a soldier. B: ________ ?",
    options: [
      "Really? When did she join the army?",
      "Really? When did he join the navy?",
      "Really? When did he join the air force?",
      "Really? When did he join the fire brigade?"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 70، تمرین 70.3."
  },
  {
    category: "vocabulary",
    lesson: 70,
    scope: "درس 70 — تمرین 70.3",
    text: "2 A: He's a sailor. B: ________ ?",
    options: [
      "Really? When did he join the air force?",
      "Really? When did she join the army?",
      "Really? When did he join the navy?",
      "Really? When did he join the fire brigade?"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 70، تمرین 70.3."
  },
  {
    category: "vocabulary",
    lesson: 70,
    scope: "درس 70 — تمرین 70.3",
    text: "3 A: He's a fighter pilot. B: ________ ?",
    options: [
      "Really? When did he join the air force?",
      "Really? When did she join the army?",
      "Really? When did he join the navy?",
      "Really? When did he join the fire brigade?"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 70، تمرین 70.3."
  },
  {
    category: "vocabulary",
    lesson: 80,
    scope: "درس 80 — تمرین 80.2",
    text: "B: Good morning. Could I (1) ________ Alicia James?",
    options: [
      "message",
      "speak to",
      "My name is",
      "Speaking"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 80، تمرین 80.2."
  },
  {
    category: "vocabulary",
    lesson: 80,
    scope: "درس 80 — تمرین 80.2",
    text: "A: (2) ________ ",
    options: [
      "Speaking",
      "speak to",
      "My name is",
      "message"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 80، تمرین 80.2."
  },
  {
    category: "vocabulary",
    lesson: 80,
    scope: "درس 80 — تمرین 80.2",
    text: "B: Yes. (3) ________ Paul Mathews and I'm trying to contact Mr Patterson. He left a (4) ________ on my answerphone yesterday afternoon.",
    options: [
      "My name is",
      "speak to",
      "Speaking",
      "back"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 80، تمرین 80.2."
  },
  {
    category: "vocabulary",
    lesson: 80,
    scope: "درس 80 — تمرین 80.2",
    text: "A: I see. Well, I'm afraid Mr Patterson's (5) ________ at the moment. Can I ask him to phone you (6) ________ later?",
    options: [
      "Speaking",
      "speak to",
      "(phone) number",
      "My name is"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 80، تمرین 80.2."
  },
  {
    category: "vocabulary",
    lesson: 80,
    scope: "درس 80 — تمرین 80.2",
    text: "B: Yes, please. I shall be here until lunchtime. My (7) ________ is 748 7267.",
    options: [
      "speak to",
      "Is that",
      "Speaking",
      "My name is"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 80، تمرین 80.2."
  },
  {
    category: "vocabulary",
    lesson: 80,
    scope: "درس 80 — تمرین 80.2",
    text: "B: Hi. (8) ________ Sandra?",
    options: [
      "My name is",
      "speak to",
      "Speaking",
      "be"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 80، تمرین 80.2."
  },
  {
    category: "vocabulary",
    lesson: 80,
    scope: "درس 80 — تمرین 80.2",
    text: "A: No, sorry. Sandra's not (9) ________ at the moment.",
    options: [
      "Speaking",
      "speak to",
      "leave",
      "My name is"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 80، تمرین 80.2."
  },
  {
    category: "vocabulary",
    lesson: 80,
    scope: "درس 80 — تمرین 80.2",
    text: "B: Oh. Do you know when she'll (10) ________ back?",
    options: [
      "speak to",
      "message",
      "Speaking",
      "My name is"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 80، تمرین 80.2."
  },
  {
    category: "vocabulary",
    lesson: 80,
    scope: "درس 80 — تمرین 80.2",
    text: "B: OK. Well, in that case, could I (11) ________ a (12) ________ for her?",
    options: [
      "My name is",
      "speak to",
      "Speaking",
      "ring"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 80، تمرین 80.2."
  },
  {
    category: "vocabulary",
    lesson: 80,
    scope: "درس 80 — تمرین 80.2",
    text: "B: Could you ask her to (13) ________ me a (14) ________ this evening?",
    options: [
      "speak to",
      "Is that",
      "Speaking",
      "My name is"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 80، تمرین 80.2."
  },
  {
    category: "vocabulary",
    lesson: 80,
    scope: "درس 80 — تمرین 80.2",
    text: "B: Catherine. I'm a colleague from work. She's got my (15) ________ ",
    options: [
      "My name is",
      "speak to",
      "Speaking",
      "through"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 80، تمرین 80.2."
  },
  {
    category: "vocabulary",
    lesson: 82,
    scope: "درس 82 — تمرین 82.1",
    text: "2 cnecsei ________ ",
    options: [
      "technology",
      "science",
      "art",
      "French"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 82، تمرین 82.1."
  },
  {
    category: "vocabulary",
    lesson: 82,
    scope: "درس 82 — تمرین 82.1",
    text: "3 hogtecynlo ________ ",
    options: [
      "technology",
      "science",
      "art",
      "French"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 82، تمرین 82.1."
  },
  {
    category: "vocabulary",
    lesson: 82,
    scope: "درس 82 — تمرین 82.1",
    text: "4 rat ________ ",
    options: [
      "French",
      "science",
      "technology",
      "art"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 82، تمرین 82.1."
  },
  {
    category: "vocabulary",
    lesson: 82,
    scope: "درس 82 — تمرین 82.1",
    text: "5 ehnfcr ________ ",
    options: [
      "technology",
      "science",
      "French",
      "art"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 82، تمرین 82.1."
  },
  {
    category: "vocabulary",
    lesson: 82,
    scope: "درس 82 — تمرین 82.1",
    text: "6 irthosy ________ ",
    options: [
      "science",
      "history",
      "technology",
      "art"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 82، تمرین 82.1."
  },
  {
    category: "vocabulary",
    lesson: 82,
    scope: "درس 82 — تمرین 82.1",
    text: "7 nisgehl ________ ",
    options: [
      "English",
      "science",
      "technology",
      "art"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 82، تمرین 82.1."
  },
  {
    category: "vocabulary",
    lesson: 82,
    scope: "درس 82 — تمرین 82.1",
    text: "8 ehgoragpy ________ ",
    options: [
      "art",
      "science",
      "technology",
      "geography"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 82، تمرین 82.1."
  },
  {
    category: "vocabulary",
    lesson: 82,
    scope: "درس 82 — تمرین 82.1",
    text: "9 simcu ________ ",
    options: [
      "technology",
      "science",
      "music",
      "art"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 82، تمرین 82.1."
  },
  {
    category: "vocabulary",
    lesson: 82,
    scope: "درس 82 — تمرین 82.1",
    text: "10 srheyictm ________ ",
    options: [
      "science",
      "chemistry",
      "technology",
      "art"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 82، تمرین 82.1."
  },
  {
    category: "vocabulary",
    lesson: 82,
    scope: "درس 82 — تمرین 82.2",
    text: "1 At what age do English children go to nursery school?",
    options: [
      "11",
      "5",
      "3",
      "16"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 82، تمرین 82.2."
  },
  {
    category: "vocabulary",
    lesson: 82,
    scope: "درس 82 — تمرین 82.2",
    text: "2 When do they start primary school?",
    options: [
      "3",
      "5",
      "11",
      "16"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 82، تمرین 82.2."
  },
  {
    category: "vocabulary",
    lesson: 82,
    scope: "درس 82 — تمرین 82.2",
    text: "3 When do they go to secondary school?",
    options: [
      "11",
      "3",
      "5",
      "16"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 82، تمرین 82.2."
  },
  {
    category: "vocabulary",
    lesson: 82,
    scope: "درس 82 — تمرین 82.2",
    text: "4 At what age can children leave school?",
    options: [
      "11",
      "3",
      "5",
      "16"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 82، تمرین 82.2."
  },
  {
    category: "vocabulary",
    lesson: 82,
    scope: "درس 82 — تمرین 82.2",
    text: "5 What can they do if they pass all their exams at the age of 18?",
    options: [
      "5",
      "3",
      "go to university or college",
      "11"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 82، تمرین 82.2."
  },
  {
    category: "vocabulary",
    lesson: 82,
    scope: "درس 82 — تمرین 82.4",
    text: "2 He didn't go to school last term. He was very ill and he had to go ________ ",
    options: [
      "to bed",
      "into hospital",
      "to university",
      "to church"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 82، تمرین 82.4."
  },
  {
    category: "vocabulary",
    lesson: 82,
    scope: "درس 82 — تمرین 82.4",
    text: "3 I was very tired, so after I finished my homework I went ________ ",
    options: [
      "to bed",
      "into hospital",
      "to university",
      "to church"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 82، تمرین 82.4."
  },
  {
    category: "vocabulary",
    lesson: 82,
    scope: "درس 82 — تمرین 82.4",
    text: "4 When I left school I went ________ and studied medicine.",
    options: [
      "to church",
      "into hospital",
      "to bed",
      "to university"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 82، تمرین 82.4."
  },
  {
    category: "vocabulary",
    lesson: 82,
    scope: "درس 82 — تمرین 82.4",
    text: "5 It was a religious school, so we had to go ________ quite a lot.",
    options: [
      "to bed",
      "into hospital",
      "to church",
      "to university"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 82، تمرین 82.4."
  },
  {
    category: "vocabulary",
    lesson: 82,
    scope: "درس 82 — تمرین 82.4",
    text: "6 The police caught him and he went ________ for six months.",
    options: [
      "into hospital",
      "to prison",
      "to bed",
      "to university"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 82، تمرین 82.4."
  },
  {
    category: "vocabulary",
    lesson: 82,
    scope: "درس 82 — تمرین 82.5",
    text: "1 I passed my exam.",
    options: [
      "I'm hopeless",
      "I did very badly.",
      "I failed my exam.",
      "I got a very low mark."
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 82، تمرین 82.5."
  },
  {
    category: "vocabulary",
    lesson: 82,
    scope: "درس 82 — تمرین 82.5",
    text: "2 I did very well.",
    options: [
      "I failed my exam.",
      "I did very badly.",
      "I'm hopeless",
      "I got a very low mark."
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 82، تمرین 82.5."
  },
  {
    category: "vocabulary",
    lesson: 82,
    scope: "درس 82 — تمرین 82.5",
    text: "3 I'm very good at English.",
    options: [
      "I'm hopeless",
      "I failed my exam.",
      "I did very badly.",
      "I got a very low mark."
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 82، تمرین 82.5."
  },
  {
    category: "vocabulary",
    lesson: 82,
    scope: "درس 82 — تمرین 82.5",
    text: "4 I got a very high mark.",
    options: [
      "I'm hopeless",
      "I failed my exam.",
      "I did very badly.",
      "I got a very low mark."
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 82، تمرین 82.5."
  },
  {
    category: "vocabulary",
    lesson: 86,
    scope: "درس 86 — تمرین 86.1",
    text: "1 The country is ruled by a king or queen.",
    options: [
      "dictatorship",
      "republic",
      "monarchy"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 86، تمرین 86.1."
  },
  {
    category: "vocabulary",
    lesson: 86,
    scope: "درس 86 — تمرین 86.1",
    text: "2 The country is governed by men and women who are chosen by the people.",
    options: [
      "dictatorship",
      "monarchy",
      "republic"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 86، تمرین 86.1."
  },
  {
    category: "vocabulary",
    lesson: 86,
    scope: "درس 86 — تمرین 86.1",
    text: "3 The country is ruled by one person.",
    options: [
      "republic",
      "monarchy",
      "dictatorship"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 86، تمرین 86.1."
  },
  {
    category: "vocabulary",
    lesson: 86,
    scope: "درس 86 — تمرین 86.3",
    text: "Example It's in every part of the world. ALL — It's all over the world.",
    options: [
      "I believe in democracy.",
      "The government is left-wing.",
      "Elections are held every five years.",
      "Who is in power at the moment?"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 86، تمرین 86.3."
  },
  {
    category: "vocabulary",
    lesson: 86,
    scope: "درس 86 — تمرین 86.3",
    text: "1 Elections take place every five years. Elections ________ ",
    options: [
      "Elections are held every five years.",
      "The government is left-wing.",
      "I believe in democracy.",
      "Who is in power at the moment?"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 86، تمرین 86.3."
  },
  {
    category: "vocabulary",
    lesson: 86,
    scope: "درس 86 — تمرین 86.3",
    text: "2 The government is socialist. The government is ________ ",
    options: [
      "I believe in democracy.",
      "Elections are held every five years.",
      "The government is left-wing.",
      "Who is in power at the moment?"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 86، تمرین 86.3."
  },
  {
    category: "vocabulary",
    lesson: 86,
    scope: "درس 86 — تمرین 86.3",
    text: "3 I'm a democrat. I ________ ",
    options: [
      "I believe in democracy.",
      "Elections are held every five years.",
      "The government is left-wing.",
      "Who is in power at the moment?"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 86، تمرین 86.3."
  },
  {
    category: "vocabulary",
    lesson: 87,
    scope: "درس 87 — تمرین 87.3",
    text: "2 I was surprised that nobody ________ my passport when we arrived in France.",
    options: [
      "checked",
      "fill",
      "sign",
      "signature"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 87، تمرین 87.3."
  },
  {
    category: "vocabulary",
    lesson: 87,
    scope: "درس 87 — تمرین 87.3",
    text: "3 Could you ________ in this form for me, please?",
    options: [
      "signature",
      "checked",
      "sign",
      "fill"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 87، تمرین 87.3."
  },
  {
    category: "vocabulary",
    lesson: 87,
    scope: "درس 87 — تمرین 87.3",
    text: "4 They sent the form back to me because I forgot to ________ it at the bottom.",
    options: [
      "fill",
      "checked",
      "sign",
      "signature"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 87، تمرین 87.3."
  },
  {
    category: "vocabulary",
    lesson: 87,
    scope: "درس 87 — تمرین 87.3",
    text: "5 A: Do I have to put my ________ at the bottom of this form? B: Yes, please – and then print your full name underneath.",
    options: [
      "checked",
      "signature",
      "fill",
      "sign"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 87، تمرین 87.3."
  },
  {
    category: "vocabulary",
    lesson: 87,
    scope: "درس 87 — تمرین 87.3",
    text: "6 A: I only had a visa for six months and it ________ next week. B: Are you going to ________ it? A: Yes, if I can. I don't think it'll be a problem.",
    options: [
      "runs out",
      "checked",
      "fill",
      "sign"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 87، تمرین 87.3."
  },
  {
    category: "vocabulary",
    lesson: 87,
    scope: "درس 87 — تمرین 87.3",
    text: "7 Write your first name here and your ________ underneath.",
    options: [
      "sign",
      "checked",
      "fill",
      "surname"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 87، تمرین 87.3."
  },
  {
    category: "vocabulary",
    lesson: 87,
    scope: "درس 87 — تمرین 87.3",
    text: "8 I want to do a course, so I wrote to the school and asked them to send a(n) ________ form.",
    options: [
      "fill",
      "checked",
      "enrolment",
      "sign"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 87، تمرین 87.3."
  },
  {
    category: "vocabulary",
    lesson: 87,
    scope: "درس 87 — تمرین 87.5",
    text: "2 What's your country of origin? ________ ?",
    options: [
      "Where do you come from?",
      "Are you single or married?",
      "When did you arrive?",
      "When are you leaving?"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 87، تمرین 87.5."
  },
  {
    category: "vocabulary",
    lesson: 87,
    scope: "درس 87 — تمرین 87.5",
    text: "3 What's your marital status? ________ ?",
    options: [
      "When are you leaving?",
      "Where do you come from?",
      "When did you arrive?",
      "Are you single or married?"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 87، تمرین 87.5."
  },
  {
    category: "vocabulary",
    lesson: 87,
    scope: "درس 87 — تمرین 87.5",
    text: "4 What was your date of arrival? ________ ?",
    options: [
      "Are you single or married?",
      "Where do you come from?",
      "When did you arrive?",
      "When are you leaving?"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 87، تمرین 87.5."
  },
  {
    category: "vocabulary",
    lesson: 87,
    scope: "درس 87 — تمرین 87.5",
    text: "5 When's your date of departure? ________ ?",
    options: [
      "Where do you come from?",
      "When are you leaving?",
      "Are you single or married?",
      "When did you arrive?"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 87، تمرین 87.5."
  },
  {
    category: "vocabulary",
    lesson: 91,
    scope: "درس 91 — تمرین 91.3",
    text: "Example A: You've got quite a few pictures, haven't you? B: Yes, I took lots of photos.",
    options: [
      "Yes, it's very cosmopolitan.",
      "Yes, it's a great place.",
      "Yes, it was (absolutely) packed.",
      "Yes, the nightlife is very good."
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 91، تمرین 91.3."
  },
  {
    category: "vocabulary",
    lesson: 91,
    scope: "درس 91 — تمرین 91.3",
    text: "1 A: It's a fabulous city, isn't it? B: Yes, it's a ________ ",
    options: [
      "Yes, it's very cosmopolitan.",
      "Yes, it's a great place.",
      "Yes, it was (absolutely) packed.",
      "Yes, the nightlife is very good."
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 91، تمرین 91.3."
  },
  {
    category: "vocabulary",
    lesson: 91,
    scope: "درس 91 — تمرین 91.3",
    text: "2 A: There's a big mix of people in London, isn't there? B: Yes, it's very ________ ",
    options: [
      "Yes, the nightlife is very good.",
      "Yes, it's a great place.",
      "Yes, it's very cosmopolitan.",
      "Yes, it was (absolutely) packed."
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 91، تمرین 91.3."
  },
  {
    category: "vocabulary",
    lesson: 91,
    scope: "درس 91 — تمرین 91.3",
    text: "3 A: It was very crowded, wasn't it? B: Yes, it was ________ ",
    options: [
      "Yes, it's very cosmopolitan.",
      "Yes, it's a great place.",
      "Yes, the nightlife is very good.",
      "Yes, it was (absolutely) packed."
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 91، تمرین 91.3."
  },
  {
    category: "vocabulary",
    lesson: 91,
    scope: "درس 91 — تمرین 91.3",
    text: "4 A: There's a lot to do in the evenings, isn't there? B: Yes, the ________ is very good.",
    options: [
      "Yes, it's a great place.",
      "Yes, we had a great time.",
      "Yes, it's very cosmopolitan.",
      "Yes, it was (absolutely) packed."
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 91، تمرین 91.3."
  },
  {
    category: "vocabulary",
    lesson: 91,
    scope: "درس 91 — تمرین 91.3",
    text: "5 A: Did you enjoy yourselves? B: Yes, we had a ________ ",
    options: [
      "Yes, Kyoto is definitely worth seeing",
      "Yes, it's a great place.",
      "Yes, it's very cosmopolitan.",
      "Yes, it was (absolutely) packed."
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 91، تمرین 91.3."
  },
  {
    category: "vocabulary",
    lesson: 95,
    scope: "درس 95 — تمرین 95.3",
    text: "A: He's quite tall, isn't he? B: No, ________ ",
    options: [
      "No, it's great",
      "No, it's quite big (or it's a great big place).",
      "No, he's fairly short."
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 95، تمرین 95.3."
  },
  {
    category: "vocabulary",
    lesson: 95,
    scope: "درس 95 — تمرین 95.3",
    text: "A: They only live in a small place, don't they? B: No, it's ________ ",
    options: [
      "No, it's great",
      "No, he's fairly short.",
      "No, it's quite big (or it's a great big place)."
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 95، تمرین 95.3."
  },
  {
    category: "vocabulary",
    lesson: 95,
    scope: "درس 95 — تمرین 95.3",
    text: "A: It's a fairly boring place, isn't it? B: No, ________ ",
    options: [
      "No, it's quite big (or it's a great big place).",
      "No, he's fairly short.",
      "No, it's great"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 95، تمرین 95.3."
  },
  {
    category: "vocabulary",
    lesson: 98,
    scope: "درس 98 — تمرین 98.1",
    text: "This thing has got stuck in the lock.",
    options: [
      "whisky",
      "the key",
      "knives and forks",
      "flour"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 98، تمرین 98.1."
  },
  {
    category: "vocabulary",
    lesson: 98,
    scope: "درس 98 — تمرین 98.1",
    text: "I bought a couple of bottles when I was in Scotland. It's great stuff.",
    options: [
      "whisky",
      "the key",
      "knives and forks",
      "flour"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 98، تمرین 98.1."
  },
  {
    category: "vocabulary",
    lesson: 98,
    scope: "درس 98 — تمرین 98.1",
    text: "We don't need these things on a picnic. We can eat the food with our fingers.",
    options: [
      "flour",
      "the key",
      "whisky",
      "knives and forks"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 98، تمرین 98.1."
  },
  {
    category: "vocabulary",
    lesson: 98,
    scope: "درس 98 — تمرین 98.1",
    text: "What's that white stuff called that you mix with water to make bread?",
    options: [
      "whisky",
      "the key",
      "flour",
      "knives and forks"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 98، تمرین 98.1."
  },
  {
    category: "vocabulary",
    lesson: 98,
    scope: "درس 98 — تمرین 98.1",
    text: "There was a great thing on television last night about elephants.",
    options: [
      "the key",
      "programme",
      "whisky",
      "knives and forks"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 98، تمرین 98.1."
  },
  {
    category: "vocabulary",
    lesson: 98,
    scope: "درس 98 — تمرین 98.1",
    text: "I couldn't get any more stuff in my suitcase.",
    options: [
      "clothes",
      "the key",
      "whisky",
      "knives and forks"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 98، تمرین 98.1."
  },
  {
    category: "vocabulary",
    lesson: 98,
    scope: "درس 98 — تمرین 98.1",
    text: "It's a wonderful thing and keeps my young children occupied for ages.",
    options: [
      "knives and forks",
      "the key",
      "whisky",
      "a type of toy"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 98، تمرین 98.1."
  },
  {
    category: "vocabulary",
    lesson: 98,
    scope: "درس 98 — تمرین 98.1",
    text: "I don't know why I bought that thing – it's too heavy for me to carry even when it's empty.",
    options: [
      "whisky",
      "the key",
      "a suitcase",
      "knives and forks"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 98، تمرین 98.1."
  },
  {
    category: "vocabulary",
    lesson: 98,
    scope: "درس 98 — تمرین 98.1",
    text: "It's good stuff. My hair feels really soft, and it didn't cost a lot.",
    options: [
      "the key",
      "shampoo",
      "whisky",
      "knives and forks"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 98، تمرین 98.1."
  },
  {
    category: "vocabulary",
    lesson: 98,
    scope: "درس 98 — تمرین 98.2",
    text: "B: (1) ________ 400.",
    options: [
      "About",
      "sort of",
      "things",
      "a bit"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 98، تمرین 98.2."
  },
  {
    category: "vocabulary",
    lesson: 98,
    scope: "درس 98 — تمرین 98.2",
    text: "B: Er, I (2) ________ enjoyed it.",
    options: [
      "things",
      "About",
      "sort of",
      "a bit"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 98، تمرین 98.2."
  },
  {
    category: "vocabulary",
    lesson: 98,
    scope: "درس 98 — تمرین 98.2",
    text: "B: Well, there were some good (3) ________ , but it was (4) ________ too long.",
    options: [
      "About",
      "and things",
      "sort of",
      "things"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 98، تمرین 98.2."
  },
  {
    category: "vocabulary",
    lesson: 98,
    scope: "درس 98 — تمرین 98.3",
    text: "A: Did you say the walls were blue? B: Yeah, ________ ",
    options: [
      "more or less",
      "sort of",
      "a bit",
      "any time"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 98، تمرین 98.3."
  },
  {
    category: "vocabulary",
    lesson: 98,
    scope: "درس 98 — تمرین 98.3",
    text: "A: Will there be 20 chairs in the room? B: Yeah, ________ ",
    options: [
      "more or less",
      "sort of",
      "a bit",
      "any time"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 98، تمرین 98.3."
  },
  {
    category: "vocabulary",
    lesson: 98,
    scope: "درس 98 — تمرین 98.3",
    text: "A: Is it a very serious film? B: Yeah, ________ ",
    options: [
      "any time",
      "more or less",
      "a bit",
      "sort of"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 98، تمرین 98.3."
  },
  {
    category: "vocabulary",
    lesson: 98,
    scope: "درس 98 — تمرین 98.3",
    text: "A: Are you tired? B: Yeah, ________ ",
    options: [
      "more or less",
      "sort of",
      "a bit",
      "any time"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 98، تمرین 98.3."
  },
  {
    category: "vocabulary",
    lesson: 98,
    scope: "درس 98 — تمرین 98.3",
    text: "A: Can I collect it tomorrow? B: Yes, ________ ",
    options: [
      "sort of",
      "any time",
      "more or less",
      "a bit"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 98، تمرین 98.3."
  },
  {
    category: "vocabulary",
    lesson: 99,
    scope: "درس 99 — تمرین 99.5",
    text: "I thought the film was a drag.",
    options: [
      "pinched (infml) = stolen",
      "a drag (infml) = boring",
      "patrons (fml) = People who use a hotel",
      "bloke (infml) = man"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 99، تمرین 99.5."
  },
  {
    category: "vocabulary",
    lesson: 99,
    scope: "درس 99 — تمرین 99.5",
    text: "Patrons only.",
    options: [
      "pinched (infml) = stolen",
      "a drag (infml) = boring",
      "patrons (fml) = People who use a hotel",
      "bloke (infml) = man"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 99، تمرین 99.5."
  },
  {
    category: "vocabulary",
    lesson: 99,
    scope: "درس 99 — تمرین 99.5",
    text: "It was too much hassle to go.",
    options: [
      "bloke (infml) = man",
      "a drag (infml) = boring",
      "pinched (infml) = stolen",
      "patrons (fml) = People who use a hotel"
    ],
    answer: 3,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 99، تمرین 99.5."
  },
  {
    category: "vocabulary",
    lesson: 99,
    scope: "درس 99 — تمرین 99.5",
    text: "Someone has pinched my pen.",
    options: [
      "pinched (infml) = stolen",
      "a drag (infml) = boring",
      "bloke (infml) = man",
      "patrons (fml) = People who use a hotel"
    ],
    answer: 2,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 99، تمرین 99.5."
  },
  {
    category: "vocabulary",
    lesson: 99,
    scope: "درس 99 — تمرین 99.5",
    text: "He's a nice bloke.",
    options: [
      "a drag (infml) = boring",
      "hassle (infml) = trouble or inconvenience",
      "pinched (infml) = stolen",
      "patrons (fml) = People who use a hotel"
    ],
    answer: 1,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 99، تمرین 99.5."
  },
  {
    category: "vocabulary",
    lesson: 99,
    scope: "درس 99 — تمرین 99.5",
    text: "Smoking isn't permitted.",
    options: [
      "permitted (fml) = allowed",
      "a drag (infml) = boring",
      "pinched (infml) = stolen",
      "patrons (fml) = People who use a hotel"
    ],
    answer: 0,
    level: "متوسط",
    explanation: "پاسخ عین Answer key کتاب — واحد 99، تمرین 99.5."
  }
];
