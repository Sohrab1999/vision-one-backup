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
    scope: "درس 1 — تمرین 1.5",
    text: "2 Do you speak English?",
    options: [
      "phrase",
      "question",
      "sentence"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 1، تمرین 1.5."
  },
  {
    category: "vocabulary",
    lesson: 1,
    scope: "درس 1 — تمرین 1.5",
    text: "3 a black cat",
    options: [
      "question",
      "phrase",
      "sentence"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 1، تمرین 1.5."
  },
  {
    category: "vocabulary",
    lesson: 1,
    scope: "درس 1 — تمرین 1.5",
    text: "4 She's writing a book.",
    options: [
      "question",
      "sentence",
      "phrase"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 1، تمرین 1.5."
  },
  {
    category: "vocabulary",
    lesson: 1,
    scope: "درس 1 — تمرین 1.5",
    text: "5 What's your name?",
    options: [
      "phrase",
      "question",
      "sentence"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 1، تمرین 1.5."
  },
  {
    category: "vocabulary",
    lesson: 1,
    scope: "درس 1 — تمرین 1.5",
    text: "6 I like English.",
    options: [
      "question",
      "sentence",
      "phrase"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 1، تمرین 1.5."
  },
  {
    category: "vocabulary",
    lesson: 1,
    scope: "درس 1 — تمرین 1.7",
    text: "3 Correct these words. speek, inglish",
    options: [
      "It depends where you live.",
      "speak, English",
      "make a mistake; do homework; have a shower"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 1، تمرین 1.7."
  },
  {
    category: "vocabulary",
    lesson: 1,
    scope: "درس 1 — تمرین 1.7",
    text: "4 Answer this question. Is there a river in your town?",
    options: [
      "speak, English",
      "It depends where you live.",
      "make a mistake; do homework; have a shower"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 1، تمرین 1.7."
  },
  {
    category: "vocabulary",
    lesson: 1,
    scope: "درس 1 — تمرین 1.7",
    text: "5 Match the verbs on the left with the nouns on the right. Draw lines. make — homework, do — a shower, have — a mistake",
    options: [
      "speak, English",
      "make a mistake; do homework; have a shower",
      "It depends where you live."
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 1، تمرین 1.7."
  },
  {
    category: "vocabulary",
    lesson: 2,
    scope: "درس 2 — تمرین 2.4",
    text: "Example: to cry",
    options: [
      "under the table",
      "sunny weather",
      "a plane lands"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 2، تمرین 2.4."
  },
  {
    category: "vocabulary",
    lesson: 2,
    scope: "درس 2 — تمرین 2.4",
    text: "1 a plane lands",
    options: [
      "under the table",
      "a plane lands",
      "sunny weather"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 2، تمرین 2.4."
  },
  {
    category: "vocabulary",
    lesson: 2,
    scope: "درس 2 — تمرین 2.4",
    text: "2 sunny weather",
    options: [
      "sunny weather",
      "a plane lands",
      "under the table"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 2، تمرین 2.4."
  },
  {
    category: "vocabulary",
    lesson: 4,
    scope: "درس 4 — تمرین 4.1",
    text: "2 Soraya and Mehmet ________ ",
    options: [
      "Natasha is going fishing.",
      "Imran is going to Cairo.",
      "The Patels are going to the beach.",
      "Soraya and Mehmet are going shopping."
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 4، تمرین 4.1."
  },
  {
    category: "vocabulary",
    lesson: 4,
    scope: "درس 4 — تمرین 4.1",
    text: "3 Imran ________ ",
    options: [
      "The Patels are going to the beach.",
      "Soraya and Mehmet are going shopping.",
      "Imran is going to Cairo.",
      "Natasha is going fishing."
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 4، تمرین 4.1."
  },
  {
    category: "vocabulary",
    lesson: 4,
    scope: "درس 4 — تمرین 4.1",
    text: "4 The Patels ________ ",
    options: [
      "Soraya and Mehmet are going shopping.",
      "The Patels are going to the beach.",
      "Imran is going to Cairo.",
      "Natasha is going fishing."
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 4، تمرین 4.1."
  },
  {
    category: "vocabulary",
    lesson: 4,
    scope: "درس 4 — تمرین 4.1",
    text: "5 Natasha ________ ",
    options: [
      "Natasha is going fishing.",
      "Soraya and Mehmet are going shopping.",
      "Imran is going to Cairo.",
      "The Patels are going to the beach."
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 4، تمرین 4.1."
  },
  {
    category: "vocabulary",
    lesson: 4,
    scope: "درس 4 — تمرین 4.2",
    text: "2 We're going sightsee today.",
    options: [
      "She went out of the shop.",
      "Jo went up to the top of the hill. or Jo went down to the bottom of the hill.",
      "Let's go fishing today.",
      "We're going sightseeing today."
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 4، تمرین 4.2."
  },
  {
    category: "vocabulary",
    lesson: 4,
    scope: "درس 4 — تمرین 4.2",
    text: "3 Jo went down to the top of the hill.",
    options: [
      "Let's go fishing today.",
      "We're going sightseeing today.",
      "Jo went up to the top of the hill. or Jo went down to the bottom of the hill.",
      "She went out of the shop."
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 4، تمرین 4.2."
  },
  {
    category: "vocabulary",
    lesson: 4,
    scope: "درس 4 — تمرین 4.2",
    text: "4 Let's go to fish today.",
    options: [
      "We're going sightseeing today.",
      "Let's go fishing today.",
      "Jo went up to the top of the hill. or Jo went down to the bottom of the hill.",
      "She went out of the shop."
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 4، تمرین 4.2."
  },
  {
    category: "vocabulary",
    lesson: 4,
    scope: "درس 4 — تمرین 4.2",
    text: "5 She went out off the shop.",
    options: [
      "She went out of the shop.",
      "We're going sightseeing today.",
      "Jo went up to the top of the hill. or Jo went down to the bottom of the hill.",
      "Let's go fishing today."
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 4، تمرین 4.2."
  },
  {
    category: "vocabulary",
    lesson: 4,
    scope: "درس 4 — تمرین 4.4",
    text: "2 On Tuesday ________ ",
    options: [
      "On Friday Alison is going to go to the cinema.",
      "On Wednesday she is going to watch the World Cup on TV.",
      "On Thursday she is going to have a tennis lesson.",
      "On Tuesday Alison is going to write to Juan."
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 4، تمرین 4.4."
  },
  {
    category: "vocabulary",
    lesson: 4,
    scope: "درس 4 — تمرین 4.4",
    text: "3 On Wednesday ________ ",
    options: [
      "On Thursday she is going to have a tennis lesson.",
      "On Tuesday Alison is going to write to Juan.",
      "On Wednesday she is going to watch the World Cup on TV.",
      "On Friday Alison is going to go to the cinema."
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 4، تمرین 4.4."
  },
  {
    category: "vocabulary",
    lesson: 4,
    scope: "درس 4 — تمرین 4.4",
    text: "4 On Thursday ________ ",
    options: [
      "On Tuesday Alison is going to write to Juan.",
      "On Thursday she is going to have a tennis lesson.",
      "On Wednesday she is going to watch the World Cup on TV.",
      "On Friday Alison is going to go to the cinema."
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 4، تمرین 4.4."
  },
  {
    category: "vocabulary",
    lesson: 4,
    scope: "درس 4 — تمرین 4.4",
    text: "5 On Friday ________ ",
    options: [
      "On Friday Alison is going to go to the cinema.",
      "On Tuesday Alison is going to write to Juan.",
      "On Wednesday she is going to watch the World Cup on TV.",
      "On Thursday she is going to have a tennis lesson."
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 4، تمرین 4.4."
  },
  {
    category: "vocabulary",
    lesson: 5,
    scope: "درس 5 — تمرین 5.1",
    text: "2 (the woman) ________ ",
    options: [
      "What is the man in the house doing? He's washing-up. / He's doing the washing-up.",
      "What are the girls doing? They are playing tennis.",
      "What is the woman doing? She's reading a book.",
      "What is the dog doing? It's sleeping."
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 5، تمرین 5.1."
  },
  {
    category: "vocabulary",
    lesson: 5,
    scope: "درس 5 — تمرین 5.1",
    text: "3 (the girls) ________ ",
    options: [
      "What is the woman doing? She's reading a book.",
      "What are the girls doing? They are playing tennis.",
      "What is the man in the house doing? He's washing-up. / He's doing the washing-up.",
      "What is the dog doing? It's sleeping."
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 5، تمرین 5.1."
  },
  {
    category: "vocabulary",
    lesson: 5,
    scope: "درس 5 — تمرین 5.1",
    text: "4 (the man in the house) ________ ",
    options: [
      "What is the man in the house doing? He's washing-up. / He's doing the washing-up.",
      "What is the woman doing? She's reading a book.",
      "What are the girls doing? They are playing tennis.",
      "What is the dog doing? It's sleeping."
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 5، تمرین 5.1."
  },
  {
    category: "vocabulary",
    lesson: 5,
    scope: "درس 5 — تمرین 5.1",
    text: "5 (the dog) ________ ",
    options: [
      "What is the man in the house doing? He's washing-up. / He's doing the washing-up.",
      "What is the woman doing? She's reading a book.",
      "What are the girls doing? They are playing tennis.",
      "What is the dog doing? It's sleeping."
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 5، تمرین 5.1."
  },
  {
    category: "vocabulary",
    lesson: 5,
    scope: "درس 5 — تمرین 5.1",
    text: "6 (the man in the garden) ________ ",
    options: [
      "What are the girls doing? They are playing tennis.",
      "What is the woman doing? She's reading a book.",
      "What is the man in the garden doing? He's gardening. / He's doing the gardening.",
      "What is the man in the house doing? He's washing-up. / He's doing the washing-up."
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 5، تمرین 5.1."
  },
  {
    category: "vocabulary",
    lesson: 5,
    scope: "درس 5 — تمرین 5.2",
    text: "2 ________ ",
    options: [
      "What do Ted and Joe do? They're students.",
      "What does Sophie Hicks do? She's a doctor.",
      "What does Lara Brown do? She's a secretary."
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 5، تمرین 5.2."
  },
  {
    category: "vocabulary",
    lesson: 5,
    scope: "درس 5 — تمرین 5.2",
    text: "3 ________ ",
    options: [
      "What do Ted and Joe do? They're students.",
      "What does Lara Brown do? She's a secretary.",
      "What does Sophie Hicks do? She's a doctor."
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 5، تمرین 5.2."
  },
  {
    category: "vocabulary",
    lesson: 5,
    scope: "درس 5 — تمرین 5.2",
    text: "4 ________ ",
    options: [
      "What does Sophie Hicks do? She's a doctor.",
      "What does Lara Brown do? She's a secretary.",
      "What do Ted and Joe do? They're students."
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 5، تمرین 5.2."
  },
  {
    category: "vocabulary",
    lesson: 5,
    scope: "درس 5 — تمرین 5.3",
    text: "2 ________ ",
    options: [
      "What did Ted and Jo do? They wrote an essay.",
      "What did Sophie Hicks do? She talked to five patients.",
      "What did Lara Brown do? She went to a meeting."
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 5، تمرین 5.3."
  },
  {
    category: "vocabulary",
    lesson: 5,
    scope: "درس 5 — تمرین 5.3",
    text: "3 ________ ",
    options: [
      "What did Ted and Jo do? They wrote an essay.",
      "What did Lara Brown do? She went to a meeting.",
      "What did Sophie Hicks do? She talked to five patients."
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 5، تمرین 5.3."
  },
  {
    category: "vocabulary",
    lesson: 5,
    scope: "درس 5 — تمرین 5.3",
    text: "4 ________ ",
    options: [
      "What did Sophie Hicks do? She talked to five patients.",
      "What did Lara Brown do? She went to a meeting.",
      "What did Ted and Jo do? They wrote an essay."
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 5، تمرین 5.3."
  },
  {
    category: "vocabulary",
    lesson: 17,
    scope: "درس 17 — تمرین 17.3",
    text: "1 Peter will get his exam results very soon. Do you think Peter will get them next year, next month or tomorrow?",
    options: [
      "In a few minutes.",
      "Probably a week ago.",
      "Probably tomorrow."
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 17، تمرین 17.3."
  },
  {
    category: "vocabulary",
    lesson: 17,
    scope: "درس 17 — تمرین 17.3",
    text: "2 Harriet and Rupert met for the first time recently. Do you think they first met last year, six months ago or a week ago?",
    options: [
      "In a few minutes.",
      "Probably tomorrow.",
      "Probably a week ago."
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 17، تمرین 17.3."
  },
  {
    category: "vocabulary",
    lesson: 17,
    scope: "درس 17 — تمرین 17.5",
    text: "John: play tennis — Mondays and Thursdays; practise the piano — Saturdays; have a business meeting in Germany — the first Friday every month",
    options: [
      "Sally and Amy play tennis three times a week. They practise the piano twice a day. They go to Germany for a business meeting six times a year. or They have a business meeting in Germany six times a year.",
      "John plays tennis twice a week. He practises the piano once a week and he has a business meeting in Germany once a month."
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 17، تمرین 17.5."
  },
  {
    category: "vocabulary",
    lesson: 17,
    scope: "درس 17 — تمرین 17.5",
    text: "Sally and Amy: play tennis — Tuesdays, Fridays and Saturdays; practise the piano — every morning and every evening; have a business meeting in Germany — once in January, March, May, July, August and December every year.",
    options: [
      "Sally and Amy play tennis three times a week. They practise the piano twice a day. They go to Germany for a business meeting six times a year. or They have a business meeting in Germany six times a year.",
      "John plays tennis twice a week. He practises the piano once a week and he has a business meeting in Germany once a month."
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 17، تمرین 17.5."
  },
  {
    category: "vocabulary",
    lesson: 19,
    scope: "درس 19 — تمرین 19.1",
    text: "He is a bad singer. He sings very .........................",
    options: [
      "badly",
      "loudly",
      "fast",
      "quietly"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 19، تمرین 19.1."
  },
  {
    category: "vocabulary",
    lesson: 19,
    scope: "درس 19 — تمرین 19.1",
    text: "She is always loud. She speaks very .........................",
    options: [
      "quietly",
      "badly",
      "fast",
      "loudly"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 19، تمرین 19.1."
  },
  {
    category: "vocabulary",
    lesson: 19,
    scope: "درس 19 — تمرین 19.1",
    text: "This girl is quiet. She always speaks .........................",
    options: [
      "badly",
      "quietly",
      "loudly",
      "fast"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 19، تمرین 19.1."
  },
  {
    category: "vocabulary",
    lesson: 19,
    scope: "درس 19 — تمرین 19.1",
    text: "He’s a good English-speaker. He speaks English .........................",
    options: [
      "well",
      "badly",
      "loudly",
      "fast"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 19، تمرین 19.1."
  },
  {
    category: "vocabulary",
    lesson: 19,
    scope: "درس 19 — تمرین 19.2",
    text: "A loud person or a quiet person?",
    options: [
      "Most people like a fast bus.",
      "Usually, a quiet person is better.",
      "A friendly person!",
      "A right answer is best in class!"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 19، تمرین 19.2."
  },
  {
    category: "vocabulary",
    lesson: 19,
    scope: "درس 19 — تمرین 19.2",
    text: "A fast bus or a slow bus?",
    options: [
      "Most people like a fast bus.",
      "Usually, a quiet person is better.",
      "A friendly person!",
      "A right answer is best in class!"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 19، تمرین 19.2."
  },
  {
    category: "vocabulary",
    lesson: 19,
    scope: "درس 19 — تمرین 19.2",
    text: "A friendly person or an unfriendly person?",
    options: [
      "A right answer is best in class!",
      "Usually, a quiet person is better.",
      "Most people like a fast bus.",
      "A friendly person!"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 19، تمرین 19.2."
  },
  {
    category: "vocabulary",
    lesson: 19,
    scope: "درس 19 — تمرین 19.2",
    text: "A right answer or a wrong answer?",
    options: [
      "Most people like a fast bus.",
      "Usually, a quiet person is better.",
      "A right answer is best in class!",
      "A friendly person!"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 19، تمرین 19.2."
  },
  {
    category: "vocabulary",
    lesson: 19,
    scope: "درس 19 — تمرین 19.2",
    text: "To speak politely or impolitely?",
    options: [
      "Usually, a quiet person is better.",
      "To speak politely – always.",
      "Most people like a fast bus.",
      "A friendly person!"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 19، تمرین 19.2."
  },
  {
    category: "vocabulary",
    lesson: 19,
    scope: "درس 19 — تمرین 19.2",
    text: "To speak in a strange way or in a normal way?",
    options: [
      "Usually it's better to speak in a normal way.",
      "Usually, a quiet person is better.",
      "Most people like a fast bus.",
      "A friendly person!"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 19، تمرین 19.2."
  },
  {
    category: "vocabulary",
    lesson: 22,
    scope: "درس 22 — تمرین 22.1",
    text: "My hair's ...awful.... I must go to the hairdresser's.",
    options: [
      "awful",
      "excellent",
      "terrible",
      "wonderful"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 22، تمرین 22.1."
  },
  {
    category: "vocabulary",
    lesson: 22,
    scope: "درس 22 — تمرین 22.1",
    text: "The weather's ________ . I don't want to go out.",
    options: [
      "excellent",
      "terrible",
      "awful",
      "wonderful"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 22، تمرین 22.1."
  },
  {
    category: "vocabulary",
    lesson: 22,
    scope: "درس 22 — تمرین 22.1",
    text: "The traffic is ________ in the city centre. Take the train.",
    options: [
      "excellent",
      "terrible",
      "awful",
      "wonderful"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 22، تمرین 22.1."
  },
  {
    category: "vocabulary",
    lesson: 22,
    scope: "درس 22 — تمرین 22.1",
    text: "That's a(n) ________ idea! Let's do it!",
    options: [
      "wonderful",
      "terrible",
      "excellent",
      "awful"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 22، تمرین 22.1."
  },
  {
    category: "vocabulary",
    lesson: 22,
    scope: "درس 22 — تمرین 22.1",
    text: "How ________ ! Three exams on the same day!",
    options: [
      "excellent",
      "terrible",
      "wonderful",
      "awful"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 22، تمرین 22.1."
  },
  {
    category: "vocabulary",
    lesson: 22,
    scope: "درس 22 — تمرین 22.1",
    text: "What a ________ house! The sea is only 100 metres away!",
    options: [
      "terrible",
      "bad",
      "excellent",
      "awful"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 22، تمرین 22.1."
  },
  {
    category: "vocabulary",
    lesson: 22,
    scope: "درس 22 — تمرین 22.2",
    text: "Do you like my new jacket?",
    options: [
      "That's an excellent idea. or Yes, great!",
      "Oh, how awful!",
      "Yes, it's very nice. / Yes it's lovely.",
      "Yes, there's the Ritz. It's the best restaurant in town."
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 22، تمرین 22.2."
  },
  {
    category: "vocabulary",
    lesson: 22,
    scope: "درس 22 — تمرین 22.2",
    text: "I have to get up at 4.30 tomorrow morning.",
    options: [
      "Yes, it's very nice. / Yes it's lovely.",
      "Oh, how awful!",
      "That's an excellent idea. or Yes, great!",
      "Yes, there's the Ritz. It's the best restaurant in town."
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 22، تمرین 22.2."
  },
  {
    category: "vocabulary",
    lesson: 22,
    scope: "درس 22 — تمرین 22.2",
    text: "Shall we go out for dinner tonight?",
    options: [
      "That's an excellent idea. or Yes, great!",
      "Yes, it's very nice. / Yes it's lovely.",
      "Oh, how awful!",
      "Yes, there's the Ritz. It's the best restaurant in town."
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 22، تمرین 22.2."
  },
  {
    category: "vocabulary",
    lesson: 22,
    scope: "درس 22 — تمرین 22.2",
    text: "(In your town) Excuse me. Is there a good restaurant in this town?",
    options: [
      "That's an excellent idea. or Yes, great!",
      "Yes, it's very nice. / Yes it's lovely.",
      "Oh, how awful!",
      "Yes, there's the Ritz. It's the best restaurant in town."
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 22، تمرین 22.2."
  },
  {
    category: "vocabulary",
    lesson: 22,
    scope: "درس 22 — تمرین 22.2",
    text: "What sort of person is your English teacher?",
    options: [
      "Oh, how awful!",
      "Yes, it's very nice. / Yes it's lovely.",
      "She",
      "That's an excellent idea. or Yes, great!"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 22، تمرین 22.2."
  },
  {
    category: "vocabulary",
    lesson: 24,
    scope: "درس 24 — تمرین 24.1",
    text: "1 John is waiting",
    options: [
      "for a train to London.",
      "for his mistake.",
      "about the holidays.",
      "to the hotel."
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 24، تمرین 24.1."
  },
  {
    category: "vocabulary",
    lesson: 24,
    scope: "درس 24 — تمرین 24.1",
    text: "2 This bicycle belongs",
    options: [
      "for a train to London.",
      "for his mistake.",
      "about the holidays.",
      "to the hotel."
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 24، تمرین 24.1."
  },
  {
    category: "vocabulary",
    lesson: 24,
    scope: "درس 24 — تمرین 24.1",
    text: "3 The children thanked their grandmother",
    options: [
      "about the holidays.",
      "for his mistake.",
      "for the money.",
      "for a train to London."
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 24، تمرین 24.1."
  },
  {
    category: "vocabulary",
    lesson: 24,
    scope: "درس 24 — تمرین 24.1",
    text: "4 Sally is listening",
    options: [
      "for his mistake.",
      "to her walkman.",
      "about the holidays.",
      "for a train to London."
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 24، تمرین 24.1."
  },
  {
    category: "vocabulary",
    lesson: 24,
    scope: "درس 24 — تمرین 24.1",
    text: "5 He apologised",
    options: [
      "for his mistake.",
      "about the holidays.",
      "for a train to London.",
      "to the hotel."
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 24، تمرین 24.1."
  },
  {
    category: "vocabulary",
    lesson: 24,
    scope: "درس 24 — تمرین 24.1",
    text: "6 Let me pay",
    options: [
      "for a train to London.",
      "for his mistake.",
      "about the holidays.",
      "for our tickets."
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 24، تمرین 24.1."
  },
  {
    category: "vocabulary",
    lesson: 24,
    scope: "درس 24 — تمرین 24.1",
    text: "7 Billy is thinking",
    options: [
      "for a train to London.",
      "for his mistake.",
      "about the holidays.",
      "to the hotel."
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 24، تمرین 24.1."
  },
  {
    category: "vocabulary",
    lesson: 24,
    scope: "درس 24 — تمرین 24.2",
    text: "2 A nurse looks ________ ",
    options: [
      "at me",
      "for them.",
      "forward to it.",
      "after people."
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 24، تمرین 24.2."
  },
  {
    category: "vocabulary",
    lesson: 24,
    scope: "درس 24 — تمرین 24.2",
    text: "3 I can't find my glasses? Could you help me look ________ ?",
    options: [
      "forward to it.",
      "after people.",
      "for them.",
      "at me"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 24، تمرین 24.2."
  },
  {
    category: "vocabulary",
    lesson: 24,
    scope: "درس 24 — تمرین 24.2",
    text: "4 It's my birthday soon. I'm really looking ________ ",
    options: [
      "after people.",
      "forward to it.",
      "for them.",
      "at me"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 24، تمرین 24.2."
  },
  {
    category: "vocabulary",
    lesson: 24,
    scope: "درس 24 — تمرین 24.2",
    text: "5 Why are you looking ________ in that way? Is my face dirty?",
    options: [
      "at me",
      "after people.",
      "for them.",
      "forward to it."
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 24، تمرین 24.2."
  },
  {
    category: "vocabulary",
    lesson: 24,
    scope: "درس 24 — تمرین 24.2",
    text: "6 I don't like my job very much. I'm looking ________ ",
    options: [
      "forward to it.",
      "after people.",
      "for them.",
      "for a new one."
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 24، تمرین 24.2."
  },
  {
    category: "vocabulary",
    lesson: 24,
    scope: "درس 24 — تمرین 24.2",
    text: "7 Alex is going to France in July. He is looking ________ ",
    options: [
      "for them.",
      "after people.",
      "forward to it.",
      "at me"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 24، تمرین 24.2."
  },
  {
    category: "vocabulary",
    lesson: 24,
    scope: "درس 24 — تمرین 24.2",
    text: "8 I often look ________ when their parents go out.",
    options: [
      "after people.",
      "after the children",
      "for them.",
      "forward to it."
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 24، تمرین 24.2."
  },
  {
    category: "vocabulary",
    lesson: 24,
    scope: "درس 24 — تمرین 24.4",
    text: "3 eating British food ✗",
    options: [
      "He was used to expensive shops.",
      "He was used to traffic jams.",
      "Hiroshi wasn't used to eating British food.",
      "He wasn't used to British money."
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 24، تمرین 24.4."
  },
  {
    category: "vocabulary",
    lesson: 24,
    scope: "درس 24 — تمرین 24.4",
    text: "4 traffic jams ✓",
    options: [
      "Hiroshi wasn't used to eating British food.",
      "He was used to traffic jams.",
      "He was used to expensive shops.",
      "He wasn't used to British money."
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 24، تمرین 24.4."
  },
  {
    category: "vocabulary",
    lesson: 24,
    scope: "درس 24 — تمرین 24.4",
    text: "5 expensive shops ✓",
    options: [
      "He was used to expensive shops.",
      "Hiroshi wasn't used to eating British food.",
      "He was used to traffic jams.",
      "He wasn't used to British money."
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 24، تمرین 24.4."
  },
  {
    category: "vocabulary",
    lesson: 24,
    scope: "درس 24 — تمرین 24.4",
    text: "6 British money ✗",
    options: [
      "He was used to expensive shops.",
      "Hiroshi wasn't used to eating British food.",
      "He was used to traffic jams.",
      "He wasn't used to British money."
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 24، تمرین 24.4."
  },
  {
    category: "vocabulary",
    lesson: 24,
    scope: "درس 24 — تمرین 24.5",
    text: "1 What were you good at at school? What were you bad at?",
    options: [
      "I was good at languages and bad at physical education.",
      "I usually ask for a black coffee.",
      "I am proud of my family.",
      "I am afraid of going to the dentist."
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 24، تمرین 24.5."
  },
  {
    category: "vocabulary",
    lesson: 24,
    scope: "درس 24 — تمرین 24.5",
    text: "2 What do you usually ask for when you go to a café?",
    options: [
      "I am afraid of going to the dentist.",
      "I was good at languages and bad at physical education.",
      "I am proud of my family.",
      "I usually ask for a black coffee."
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 24، تمرین 24.5."
  },
  {
    category: "vocabulary",
    lesson: 24,
    scope: "درس 24 — تمرین 24.5",
    text: "3 What are you proud of?",
    options: [
      "I usually ask for a black coffee.",
      "I was good at languages and bad at physical education.",
      "I am proud of my family.",
      "I am afraid of going to the dentist."
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 24، تمرین 24.5."
  },
  {
    category: "vocabulary",
    lesson: 24,
    scope: "درس 24 — تمرین 24.5",
    text: "4 What are you afraid of?",
    options: [
      "I was good at languages and bad at physical education.",
      "I am afraid of going to the dentist.",
      "I usually ask for a black coffee.",
      "I am proud of my family."
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 24، تمرین 24.5."
  },
  {
    category: "vocabulary",
    lesson: 24,
    scope: "درس 24 — تمرین 24.5",
    text: "5 What kind of music do you like listening to?",
    options: [
      "I like listening to folk music.",
      "I was good at languages and bad at physical education.",
      "I usually ask for a black coffee.",
      "I am proud of my family."
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 24، تمرین 24.5."
  },
  {
    category: "vocabulary",
    lesson: 24,
    scope: "درس 24 — تمرین 24.5",
    text: "6 What are you looking forward to?",
    options: [
      "I am proud of my family.",
      "I was good at languages and bad at physical education.",
      "I usually ask for a black coffee.",
      "I am looking forward to my holiday."
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 24، تمرین 24.5."
  },
  {
    category: "vocabulary",
    lesson: 24,
    scope: "درس 24 — تمرین 24.5",
    text: "7 Do you belong to any clubs?",
    options: [
      "I usually ask for a black coffee.",
      "I was good at languages and bad at physical education.",
      "I belong to a teachers' club.",
      "I am proud of my family."
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 24، تمرین 24.5."
  },
  {
    category: "vocabulary",
    lesson: 24,
    scope: "درس 24 — تمرین 24.5",
    text: "8 Are you used to eating different kinds of food?",
    options: [
      "I was good at languages and bad at physical education.",
      "I am used to eating lots of different kinds of food.",
      "I usually ask for a black coffee.",
      "I am proud of my family."
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 24، تمرین 24.5."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.1",
    text: "I can't read this. Please ................ your homework.",
    options: [
      "non-smoking",
      "rewrite (or redo)",
      "informal"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.1."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.1",
    text: "In ................ English we often say 'Hi'.",
    options: [
      "non-smoking",
      "informal",
      "rewrite",
      "unhappy"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.1."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.1",
    text: "I liked school but my sister was very ................ there.",
    options: [
      "unhappy",
      "non-smoking",
      "rewrite",
      "informal"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.1."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.1",
    text: "I bought two T-shirts because they were ................ in the sale.",
    options: [
      "informal",
      "non-smoking",
      "rewrite",
      "half-price"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.1."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.1",
    text: "Don't walk on that wall – the notice says it is ................",
    options: [
      "rewrite",
      "non-smoking",
      "unsafe",
      "informal"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.1."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.3",
    text: "pre-exam nerves",
    options: [
      "a book that has not been read",
      "a wrong answer, an answer that is not correct",
      "nerves before an exam",
      "to tell a story again"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.3."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.3",
    text: "an incorrect answer",
    options: [
      "nerves before an exam",
      "a wrong answer, an answer that is not correct",
      "a book that has not been read",
      "to tell a story again"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.3."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.3",
    text: "an unread book",
    options: [
      "a book that has not been read",
      "nerves before an exam",
      "a wrong answer, an answer that is not correct",
      "to tell a story again"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.3."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.3",
    text: "to retell a story",
    options: [
      "a book that has not been read",
      "nerves before an exam",
      "a wrong answer, an answer that is not correct",
      "to tell a story again"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.3."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.3",
    text: "a half-brother",
    options: [
      "a wrong answer, an answer that is not correct",
      "nerves before an exam",
      "a brother with one parent the same (for example, perhaps with the same mother but not the same father)",
      "a book that has not been read"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.3."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.6",
    text: "comfortable",
    options: [
      "informal",
      "unsafe",
      "uncomfortable",
      "non-smoking"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.6."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.6",
    text: "safe",
    options: [
      "uncomfortable",
      "unsafe",
      "informal",
      "non-smoking"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.6."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.6",
    text: "formal",
    options: [
      "informal",
      "uncomfortable",
      "unsafe",
      "non-smoking"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.6."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.6",
    text: "smoking",
    options: [
      "informal",
      "uncomfortable",
      "unsafe",
      "non-smoking"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.6."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.6",
    text: "happy",
    options: [
      "unsafe",
      "uncomfortable",
      "unhappy",
      "informal"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.6."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.6",
    text: "polite",
    options: [
      "uncomfortable",
      "impolite",
      "unsafe",
      "informal"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.6."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.6",
    text: "correct",
    options: [
      "incorrect",
      "uncomfortable",
      "unsafe",
      "informal"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.6."
  },
  {
    category: "vocabulary",
    lesson: 26,
    scope: "درس 26 — تمرین 26.1",
    text: "He's smiling h................",
    options: [
      "instructor",
      "happily",
      "word processor",
      "swimmer"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 26، تمرین 26.1."
  },
  {
    category: "vocabulary",
    lesson: 26,
    scope: "درس 26 — تمرین 26.1",
    text: "a golf i......................",
    options: [
      "instructor",
      "happily",
      "word processor",
      "swimmer"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 26، تمرین 26.1."
  },
  {
    category: "vocabulary",
    lesson: 26,
    scope: "درس 26 — تمرین 26.1",
    text: "a w..........................",
    options: [
      "swimmer",
      "happily",
      "instructor",
      "word processor"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 26، تمرین 26.1."
  },
  {
    category: "vocabulary",
    lesson: 26,
    scope: "درس 26 — تمرین 26.1",
    text: "a s...........................",
    options: [
      "instructor",
      "happily",
      "swimmer",
      "word processor"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 26، تمرین 26.1."
  },
  {
    category: "vocabulary",
    lesson: 26,
    scope: "درس 26 — تمرین 26.1",
    text: "a u...................... thing",
    options: [
      "happily",
      "useful",
      "instructor",
      "word processor"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 26، تمرین 26.1."
  },
  {
    category: "vocabulary",
    lesson: 26,
    scope: "درس 26 — تمرین 26.2",
    text: "2 fast",
    options: [
      "electric cooker / guitar",
      "fast worker",
      "worker",
      "cooker"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 26، تمرین 26.2."
  },
  {
    category: "vocabulary",
    lesson: 26,
    scope: "درس 26 — تمرین 26.2",
    text: "3 beautiful",
    options: [
      "beautiful picture",
      "electric cooker / guitar",
      "worker",
      "cooker"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 26، تمرین 26.2."
  },
  {
    category: "vocabulary",
    lesson: 26,
    scope: "درس 26 — تمرین 26.2",
    text: "4 sandy",
    options: [
      "cooker",
      "electric cooker / guitar",
      "worker",
      "sandy beach"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 26، تمرین 26.2."
  },
  {
    category: "vocabulary",
    lesson: 26,
    scope: "درس 26 — تمرین 26.2",
    text: "5 sunny",
    options: [
      "worker",
      "electric cooker / guitar",
      "sunny weather",
      "cooker"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 26، تمرین 26.2."
  },
  {
    category: "vocabulary",
    lesson: 26,
    scope: "درس 26 — تمرین 26.2",
    text: "6 hard",
    options: [
      "electric cooker / guitar",
      "hard worker",
      "worker",
      "cooker"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 26، تمرین 26.2."
  },
  {
    category: "vocabulary",
    lesson: 26,
    scope: "درس 26 — تمرین 26.2",
    text: "7 useful",
    options: [
      "useful idea",
      "electric cooker / guitar",
      "worker",
      "cooker"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 26، تمرین 26.2."
  },
  {
    category: "vocabulary",
    lesson: 26,
    scope: "درس 26 — تمرین 26.2",
    text: "8 endless",
    options: [
      "cooker",
      "electric cooker / guitar",
      "worker",
      "endless beach"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 26، تمرین 26.2."
  },
  {
    category: "vocabulary",
    lesson: 26,
    scope: "درس 26 — تمرین 26.2",
    text: "9 useless",
    options: [
      "worker",
      "electric cooker / guitar",
      "useless idea",
      "cooker"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 26، تمرین 26.2."
  },
  {
    category: "vocabulary",
    lesson: 26,
    scope: "درس 26 — تمرین 26.3",
    text: "The Role of the President in the US Congress",
    options: [
      "psychology",
      "sociology",
      "politics",
      "economics"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 26، تمرین 26.3."
  },
  {
    category: "vocabulary",
    lesson: 26,
    scope: "درس 26 — تمرین 26.3",
    text: "British Society in the 1950s",
    options: [
      "psychology",
      "sociology",
      "economics",
      "politics"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 26، تمرین 26.3."
  },
  {
    category: "vocabulary",
    lesson: 26,
    scope: "درس 26 — تمرین 26.3",
    text: "Banking Today",
    options: [
      "economics",
      "sociology",
      "psychology",
      "politics"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 26، تمرین 26.3."
  },
  {
    category: "vocabulary",
    lesson: 26,
    scope: "درس 26 — تمرین 26.3",
    text: "Why People Smile",
    options: [
      "politics",
      "sociology",
      "economics",
      "psychology"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 26، تمرین 26.3."
  },
  {
    category: "vocabulary",
    lesson: 26,
    scope: "درس 26 — تمرین 26.5",
    text: "a traveller",
    options: [
      "the opposite of fast",
      "a person who travels",
      "with lots of hope",
      "weather when it is raining"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 26، تمرین 26.5."
  },
  {
    category: "vocabulary",
    lesson: 26,
    scope: "درس 26 — تمرین 26.5",
    text: "slowly",
    options: [
      "the opposite of fast",
      "a person who travels",
      "with lots of hope",
      "weather when it is raining"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 26، تمرین 26.5."
  },
  {
    category: "vocabulary",
    lesson: 26,
    scope: "درس 26 — تمرین 26.5",
    text: "hopeful",
    options: [
      "weather when it is raining",
      "a person who travels",
      "the opposite of fast",
      "with lots of hope"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 26، تمرین 26.5."
  },
  {
    category: "vocabulary",
    lesson: 26,
    scope: "درس 26 — تمرین 26.5",
    text: "rainy",
    options: [
      "the opposite of fast",
      "a person who travels",
      "weather when it is raining",
      "with lots of hope"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 26، تمرین 26.5."
  },
  {
    category: "vocabulary",
    lesson: 26,
    scope: "درس 26 — تمرین 26.5",
    text: "painless",
    options: [
      "a person who travels",
      "it doesn't hurt",
      "the opposite of fast",
      "with lots of hope"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 26، تمرین 26.5."
  },
  {
    category: "vocabulary",
    lesson: 26,
    scope: "درس 26 — تمرین 26.5",
    text: "badly",
    options: [
      "the opposite of doing something well",
      "a person who travels",
      "the opposite of fast",
      "with lots of hope"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 26، تمرین 26.5."
  },
  {
    category: "vocabulary",
    lesson: 26,
    scope: "درس 26 — تمرین 26.5",
    text: "a tin opener",
    options: [
      "with lots of hope",
      "a person who travels",
      "the opposite of fast",
      "a thing for opening tins"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 26، تمرین 26.5."
  },
  {
    category: "vocabulary",
    lesson: 26,
    scope: "درس 26 — تمرین 26.5",
    text: "mathematics",
    options: [
      "the opposite of fast",
      "a person who travels",
      "the study of maths",
      "with lots of hope"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 26، تمرین 26.5."
  },
  {
    category: "vocabulary",
    lesson: 26,
    scope: "درس 26 — تمرین 26.5",
    text: "a footballer",
    options: [
      "a person who travels",
      "a person who plays football",
      "the opposite of fast",
      "with lots of hope"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 26، تمرین 26.5."
  },
  {
    category: "vocabulary",
    lesson: 27,
    scope: "درس 27 — تمرین 27.1",
    text: "2 If you l............. your passport you must call the Embassy.",
    options: [
      "lose",
      "felt",
      "cooker",
      "fell"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 27، تمرین 27.1."
  },
  {
    category: "vocabulary",
    lesson: 27,
    scope: "درس 27 — تمرین 27.1",
    text: "3 I f............. tired this morning, but I am OK now.",
    options: [
      "fell",
      "lose",
      "cooker",
      "felt"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 27، تمرین 27.1."
  },
  {
    category: "vocabulary",
    lesson: 27,
    scope: "درس 27 — تمرین 27.1",
    text: "4 We are going to buy a c.............. for our new kitchen.",
    options: [
      "felt",
      "lose",
      "cooker",
      "fell"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 27، تمرین 27.1."
  },
  {
    category: "vocabulary",
    lesson: 27,
    scope: "درس 27 — تمرین 27.1",
    text: "5 She f.............. and broke her leg. She had to go to hospital.",
    options: [
      "lose",
      "fell",
      "felt",
      "cooker"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 27، تمرین 27.1."
  },
  {
    category: "vocabulary",
    lesson: 27,
    scope: "درس 27 — تمرین 27.1",
    text: "6 It's q.............. cold today.",
    options: [
      "quite",
      "lose",
      "felt",
      "cooker"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 27، تمرین 27.1."
  },
  {
    category: "vocabulary",
    lesson: 27,
    scope: "درس 27 — تمرین 27.1",
    text: "7 These shoes are very l.............. I need smaller ones.",
    options: [
      "cooker",
      "lose",
      "felt",
      "loose"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 27، تمرین 27.1."
  },
  {
    category: "vocabulary",
    lesson: 27,
    scope: "درس 27 — تمرین 27.1",
    text: "8 My sister is a good c.............. I love eating at her house.",
    options: [
      "felt",
      "lose",
      "cook",
      "cooker"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 27، تمرین 27.1."
  },
  {
    category: "vocabulary",
    lesson: 27,
    scope: "درس 27 — تمرین 27.2",
    text: "lose — juice / shoes",
    options: [
      "loose: juice ✓, shoes –",
      "lose: juice –, shoes ✓",
      "quite: right ✓, higher –",
      "quiet: right –, higher ✓"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 27، تمرین 27.2."
  },
  {
    category: "vocabulary",
    lesson: 27,
    scope: "درس 27 — تمرین 27.2",
    text: "loose — juice / shoes",
    options: [
      "loose: juice ✓, shoes –",
      "lose: juice –, shoes ✓",
      "quite: right ✓, higher –",
      "quiet: right –, higher ✓"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 27، تمرین 27.2."
  },
  {
    category: "vocabulary",
    lesson: 27,
    scope: "درس 27 — تمرین 27.2",
    text: "quite — right / higher",
    options: [
      "quiet: right –, higher ✓",
      "lose: juice –, shoes ✓",
      "loose: juice ✓, shoes –",
      "quite: right ✓, higher –"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 27، تمرین 27.2."
  },
  {
    category: "vocabulary",
    lesson: 27,
    scope: "درس 27 — تمرین 27.2",
    text: "quiet — right / higher",
    options: [
      "loose: juice ✓, shoes –",
      "lose: juice –, shoes ✓",
      "quiet: right –, higher ✓",
      "quite: right ✓, higher –"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 27، تمرین 27.2."
  },
  {
    category: "vocabulary",
    lesson: 27,
    scope: "درس 27 — تمرین 27.3",
    text: "2 What does the passport officer do to your passport? He/She ........",
    options: [
      "He",
      "Can I borrow your camera?",
      "Good afternoon.",
      "They wait for the bus."
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 27، تمرین 27.3."
  },
  {
    category: "vocabulary",
    lesson: 27,
    scope: "درس 27 — تمرین 27.3",
    text: "3 If you want to use someone's camera for two hours, what do you say? Can I ........",
    options: [
      "They wait for the bus.",
      "He",
      "Good afternoon.",
      "Can I borrow your camera?"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 27، تمرین 27.3."
  },
  {
    category: "vocabulary",
    lesson: 27,
    scope: "درس 27 — تمرین 27.3",
    text: "4 What do you say to someone at 3 p.m.? Good ........",
    options: [
      "Can I borrow your camera?",
      "He",
      "Good afternoon.",
      "They wait for the bus."
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 27، تمرین 27.3."
  },
  {
    category: "vocabulary",
    lesson: 27,
    scope: "درس 27 — تمرین 27.3",
    text: "5 What do people do at a bus stop? They ........",
    options: [
      "He",
      "They wait for the bus.",
      "Can I borrow your camera?",
      "Good afternoon."
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 27، تمرین 27.3."
  },
  {
    category: "vocabulary",
    lesson: 27,
    scope: "درس 27 — تمرین 27.3",
    text: "6 What do you say to a friend if you need £1 for the phone? Can you ........",
    options: [
      "Can you lend me £1 for the phone?",
      "He",
      "Can I borrow your camera?",
      "Good afternoon."
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 27، تمرین 27.3."
  },
  {
    category: "vocabulary",
    lesson: 27,
    scope: "درس 27 — تمرین 27.3",
    text: "7 What do you say if someone makes too much noise? Please be ........",
    options: [
      "Good afternoon.",
      "He",
      "Can I borrow your camera?",
      "Please be quiet."
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 27، تمرین 27.3."
  },
  {
    category: "vocabulary",
    lesson: 27,
    scope: "درس 27 — تمرین 27.4",
    text: "1 Are you expecting any visitors today?",
    options: [
      "I hope to learn a lot of new words. (= I really want to learn new words)",
      "I am expecting my brother at 5.30. (= He said he would come at 5.30)",
      "Sometimes I borrow books and tapes.",
      "Yes, but only to my best friend!"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 27، تمرین 27.4."
  },
  {
    category: "vocabulary",
    lesson: 27,
    scope: "درس 27 — تمرین 27.4",
    text: "2 What do you hope to do with this book?",
    options: [
      "I hope to learn a lot of new words. (= I really want to learn new words)",
      "I am expecting my brother at 5.30. (= He said he would come at 5.30)",
      "Sometimes I borrow books and tapes.",
      "Yes, but only to my best friend!"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 27، تمرین 27.4."
  },
  {
    category: "vocabulary",
    lesson: 27,
    scope: "درس 27 — تمرین 27.4",
    text: "3 Do you borrow things from your friends? What things?",
    options: [
      "Yes, but only to my best friend!",
      "I am expecting my brother at 5.30. (= He said he would come at 5.30)",
      "I hope to learn a lot of new words. (= I really want to learn new words)",
      "Sometimes I borrow books and tapes."
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 27، تمرین 27.4."
  },
  {
    category: "vocabulary",
    lesson: 27,
    scope: "درس 27 — تمرین 27.4",
    text: "4 Would you lend your best friend £200?",
    options: [
      "I hope to learn a lot of new words. (= I really want to learn new words)",
      "I am expecting my brother at 5.30. (= He said he would come at 5.30)",
      "Yes, but only to my best friend!",
      "Sometimes I borrow books and tapes."
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 27، تمرین 27.4."
  },
  {
    category: "vocabulary",
    lesson: 29,
    scope: "درس 29 — تمرین 29.1",
    text: "2 Peter is Emily's ________ ",
    options: [
      "uncle",
      "aunt",
      "brother",
      "grandmother"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 29، تمرین 29.1."
  },
  {
    category: "vocabulary",
    lesson: 29,
    scope: "درس 29 — تمرین 29.1",
    text: "3 Anne is Emily's ________ ",
    options: [
      "brother",
      "aunt",
      "uncle",
      "grandmother"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 29، تمرین 29.1."
  },
  {
    category: "vocabulary",
    lesson: 29,
    scope: "درس 29 — تمرین 29.1",
    text: "4 Paul is Peter's ________ ",
    options: [
      "uncle",
      "brother",
      "aunt",
      "grandmother"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 29، تمرین 29.1."
  },
  {
    category: "vocabulary",
    lesson: 29,
    scope: "درس 29 — تمرین 29.1",
    text: "5 Diana is Peter's ________ ",
    options: [
      "uncle",
      "brother",
      "aunt",
      "grandmother"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 29، تمرین 29.1."
  },
  {
    category: "vocabulary",
    lesson: 29,
    scope: "درس 29 — تمرین 29.1",
    text: "6 Henry is Emily's ________ ",
    options: [
      "aunt",
      "brother",
      "grandfather",
      "uncle"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 29، تمرین 29.1."
  },
  {
    category: "vocabulary",
    lesson: 29,
    scope: "درس 29 — تمرین 29.1",
    text: "7 Peter is Paul's ________ ",
    options: [
      "brother",
      "nephew",
      "aunt",
      "uncle"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 29، تمرین 29.1."
  },
  {
    category: "vocabulary",
    lesson: 29,
    scope: "درس 29 — تمرین 29.1",
    text: "8 Emily is Paul's ________ ",
    options: [
      "niece",
      "brother",
      "aunt",
      "uncle"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 29، تمرین 29.1."
  },
  {
    category: "vocabulary",
    lesson: 29,
    scope: "درس 29 — تمرین 29.1",
    text: "9 Sandra is Emily's ________ ",
    options: [
      "uncle",
      "brother",
      "aunt",
      "mother"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 29، تمرین 29.1."
  },
  {
    category: "vocabulary",
    lesson: 29,
    scope: "درس 29 — تمرین 29.1",
    text: "10 Sandra is George's ________ ",
    options: [
      "aunt",
      "brother",
      "wife",
      "uncle"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 29، تمرین 29.1."
  },
  {
    category: "vocabulary",
    lesson: 29,
    scope: "درس 29 — تمرین 29.1",
    text: "11 Sarah is Peter's ________ ",
    options: [
      "brother",
      "cousin",
      "aunt",
      "uncle"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 29، تمرین 29.1."
  },
  {
    category: "vocabulary",
    lesson: 29,
    scope: "درس 29 — تمرین 29.4",
    text: "1 Have you got any brothers and sisters?",
    options: [
      "Chen has / has got only one grandmother now.",
      "Chen has / has got two cousins.",
      "Chen has / has got two nephews but I haven't got any nieces.",
      "Chen has / has got one brother and one sister."
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 29، تمرین 29.4."
  },
  {
    category: "vocabulary",
    lesson: 29,
    scope: "درس 29 — تمرین 29.4",
    text: "2 Have you got any cousins?",
    options: [
      "Chen has / has got two nephews but I haven't got any nieces.",
      "Chen has / has got one brother and one sister.",
      "Chen has / has got two cousins.",
      "Chen has / has got only one grandmother now."
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 29، تمرین 29.4."
  },
  {
    category: "vocabulary",
    lesson: 29,
    scope: "درس 29 — تمرین 29.4",
    text: "3 Have you got any nieces or nephews?",
    options: [
      "Chen has / has got one brother and one sister.",
      "Chen has / has got two nephews but I haven't got any nieces.",
      "Chen has / has got two cousins.",
      "Chen has / has got only one grandmother now."
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 29، تمرین 29.4."
  },
  {
    category: "vocabulary",
    lesson: 29,
    scope: "درس 29 — تمرین 29.4",
    text: "4 Have you got any grandparents?",
    options: [
      "Chen has / has got only one grandmother now.",
      "Chen has / has got one brother and one sister.",
      "Chen has / has got two cousins.",
      "Chen has / has got two nephews but I haven't got any nieces."
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 29، تمرین 29.4."
  },
  {
    category: "vocabulary",
    lesson: 30,
    scope: "درس 30 — تمرین 30.1",
    text: "2 osen",
    options: [
      "heart",
      "nose",
      "stomach",
      "shoulder"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 30، تمرین 30.1."
  },
  {
    category: "vocabulary",
    lesson: 30,
    scope: "درس 30 — تمرین 30.1",
    text: "3 rathe",
    options: [
      "heart",
      "nose",
      "stomach",
      "shoulder"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 30، تمرین 30.1."
  },
  {
    category: "vocabulary",
    lesson: 30,
    scope: "درس 30 — تمرین 30.1",
    text: "4 hamcost",
    options: [
      "shoulder",
      "nose",
      "heart",
      "stomach"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 30، تمرین 30.1."
  },
  {
    category: "vocabulary",
    lesson: 30,
    scope: "درس 30 — تمرین 30.1",
    text: "5 olderush",
    options: [
      "heart",
      "nose",
      "shoulder",
      "stomach"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 30، تمرین 30.1."
  },
  {
    category: "vocabulary",
    lesson: 30,
    scope: "درس 30 — تمرین 30.1",
    text: "6 are",
    options: [
      "nose",
      "ear",
      "heart",
      "stomach"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 30، تمرین 30.1."
  },
  {
    category: "vocabulary",
    lesson: 30,
    scope: "درس 30 — تمرین 30.1",
    text: "7 hotot",
    options: [
      "tooth",
      "nose",
      "heart",
      "stomach"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 30، تمرین 30.1."
  },
  {
    category: "vocabulary",
    lesson: 30,
    scope: "درس 30 — تمرین 30.2",
    text: "2 A foot has five ________ .",
    options: [
      "teeth",
      "toes",
      "nose",
      "heart"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 30، تمرین 30.2."
  },
  {
    category: "vocabulary",
    lesson: 30,
    scope: "درس 30 — تمرین 30.2",
    text: "3 An adult has 32 ________ .",
    options: [
      "teeth",
      "toes",
      "nose",
      "heart"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 30، تمرین 30.2."
  },
  {
    category: "vocabulary",
    lesson: 30,
    scope: "درس 30 — تمرین 30.2",
    text: "4 You smell with your ________ .",
    options: [
      "heart",
      "toes",
      "teeth",
      "nose"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 30، تمرین 30.2."
  },
  {
    category: "vocabulary",
    lesson: 30,
    scope: "درس 30 — تمرین 30.2",
    text: "5 The ________ is a symbol of love.",
    options: [
      "teeth",
      "toes",
      "heart",
      "nose"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 30، تمرین 30.2."
  },
  {
    category: "vocabulary",
    lesson: 30,
    scope: "درس 30 — تمرین 30.2",
    text: "6 You hear with your ________ .",
    options: [
      "toes",
      "ears",
      "teeth",
      "nose"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 30، تمرین 30.2."
  },
  {
    category: "vocabulary",
    lesson: 30,
    scope: "درس 30 — تمرین 30.2",
    text: "7 The child sat on her dad's ________ .",
    options: [
      "knee",
      "toes",
      "teeth",
      "nose"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 30، تمرین 30.2."
  },
  {
    category: "vocabulary",
    lesson: 30,
    scope: "درس 30 — تمرین 30.2",
    text: "8 Your ________ type can be A, B, AB or O.",
    options: [
      "nose",
      "toes",
      "teeth",
      "blood"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 30، تمرین 30.2."
  },
  {
    category: "vocabulary",
    lesson: 30,
    scope: "درس 30 — تمرین 30.3",
    text: "1 A chair has arms, legs and a back. What do you think they are?",
    options: [
      "The face is the front of the clock (with the numbers on it). The big hand shows the minutes and the little hand shows the hours.",
      "The eye is the hole in the needle.",
      "a back b arms c legs",
      "The neck is the narrow part at the top of the bottle."
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 30، تمرین 30.3."
  },
  {
    category: "vocabulary",
    lesson: 30,
    scope: "درس 30 — تمرین 30.3",
    text: "2 This is a needle. Where is its eye?",
    options: [
      "a back b arms c legs",
      "The eye is the hole in the needle.",
      "The face is the front of the clock (with the numbers on it). The big hand shows the minutes and the little hand shows the hours.",
      "The neck is the narrow part at the top of the bottle."
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 30، تمرین 30.3."
  },
  {
    category: "vocabulary",
    lesson: 30,
    scope: "درس 30 — تمرین 30.3",
    text: "3 This is a clock. Where is its face? Where are its hands?",
    options: [
      "The face is the front of the clock (with the numbers on it). The big hand shows the minutes and the little hand shows the hours.",
      "a back b arms c legs",
      "The eye is the hole in the needle.",
      "The neck is the narrow part at the top of the bottle."
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 30، تمرین 30.3."
  },
  {
    category: "vocabulary",
    lesson: 30,
    scope: "درس 30 — تمرین 30.3",
    text: "4 This is a bottle. Where is its neck?",
    options: [
      "The face is the front of the clock (with the numbers on it). The big hand shows the minutes and the little hand shows the hours.",
      "a back b arms c legs",
      "The eye is the hole in the needle.",
      "The neck is the narrow part at the top of the bottle."
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 30، تمرین 30.3."
  },
  {
    category: "vocabulary",
    lesson: 30,
    scope: "درس 30 — تمرین 30.3",
    text: "5 This is a mountain. Where is its foot?",
    options: [
      "The eye is the hole in the needle.",
      "a back b arms c legs",
      "The foot of the mountain is the bottom of the mountain (the lowest part).",
      "The face is the front of the clock (with the numbers on it). The big hand shows the minutes and the little hand shows the hours."
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 30، تمرین 30.3."
  },
  {
    category: "vocabulary",
    lesson: 30,
    scope: "درس 30 — تمرین 30.4",
    text: "2 ________ ball",
    options: [
      "lipstick",
      "football",
      "hairbrush",
      "headscarf"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 30، تمرین 30.4."
  },
  {
    category: "vocabulary",
    lesson: 30,
    scope: "درس 30 — تمرین 30.4",
    text: "3 ________ stick",
    options: [
      "lipstick",
      "football",
      "hairbrush",
      "headscarf"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 30، تمرین 30.4."
  },
  {
    category: "vocabulary",
    lesson: 30,
    scope: "درس 30 — تمرین 30.4",
    text: "4 ________ brush",
    options: [
      "headscarf",
      "football",
      "lipstick",
      "hairbrush"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 30، تمرین 30.4."
  },
  {
    category: "vocabulary",
    lesson: 30,
    scope: "درس 30 — تمرین 30.4",
    text: "5 ________ scarf",
    options: [
      "lipstick",
      "football",
      "headscarf",
      "hairbrush"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 30، تمرین 30.4."
  },
  {
    category: "vocabulary",
    lesson: 30,
    scope: "درس 30 — تمرین 30.4",
    text: "6 ________ bag",
    options: [
      "football",
      "handbag",
      "lipstick",
      "hairbrush"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 30، تمرین 30.4."
  },
  {
    category: "vocabulary",
    lesson: 34,
    scope: "درس 34 — تمرین 34.1",
    text: "1 chocolate",
    options: [
      "I like aeroplanes.",
      "I hate cowboy films.",
      "I love chocolate.",
      "I like tea."
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 34، تمرین 34.1."
  },
  {
    category: "vocabulary",
    lesson: 34,
    scope: "درس 34 — تمرین 34.1",
    text: "2 cowboy films",
    options: [
      "I love chocolate.",
      "I hate cowboy films.",
      "I like aeroplanes.",
      "I like tea."
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 34، تمرین 34.1."
  },
  {
    category: "vocabulary",
    lesson: 34,
    scope: "درس 34 — تمرین 34.1",
    text: "3 aeroplanes",
    options: [
      "I like aeroplanes.",
      "I love chocolate.",
      "I hate cowboy films.",
      "I like tea."
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 34، تمرین 34.1."
  },
  {
    category: "vocabulary",
    lesson: 34,
    scope: "درس 34 — تمرین 34.1",
    text: "4 tea",
    options: [
      "I like aeroplanes.",
      "I love chocolate.",
      "I hate cowboy films.",
      "I like tea."
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 34، تمرین 34.1."
  },
  {
    category: "vocabulary",
    lesson: 34,
    scope: "درس 34 — تمرین 34.1",
    text: "5 football",
    options: [
      "I hate cowboy films.",
      "I love chocolate.",
      "I don't like football.",
      "I like aeroplanes."
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 34، تمرین 34.1."
  },
  {
    category: "vocabulary",
    lesson: 34,
    scope: "درس 34 — تمرین 34.1",
    text: "6 cats",
    options: [
      "I love chocolate.",
      "I love cats.",
      "I hate cowboy films.",
      "I like aeroplanes."
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 34، تمرین 34.1."
  },
  {
    category: "vocabulary",
    lesson: 34,
    scope: "درس 34 — تمرین 34.1",
    text: "7 cars",
    options: [
      "I like cars.",
      "I love chocolate.",
      "I hate cowboy films.",
      "I like aeroplanes."
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 34، تمرین 34.1."
  },
  {
    category: "vocabulary",
    lesson: 34,
    scope: "درس 34 — تمرین 34.1",
    text: "8 jazz music",
    options: [
      "I like aeroplanes.",
      "I love chocolate.",
      "I hate cowboy films.",
      "I don't like jazz music."
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 34، تمرین 34.1."
  },
  {
    category: "vocabulary",
    lesson: 34,
    scope: "درس 34 — تمرین 34.2",
    text: "2 dogs or cats?",
    options: [
      "I prefer sightseeing to sunbathing.",
      "I prefer cats to dogs.",
      "I prefer BMWs to Rolls Royces.",
      "I prefer strawberry to chocolate ice-cream."
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 34، تمرین 34.2."
  },
  {
    category: "vocabulary",
    lesson: 34,
    scope: "درس 34 — تمرین 34.2",
    text: "3 sunbathing or sightseeing?",
    options: [
      "I prefer sightseeing to sunbathing.",
      "I prefer cats to dogs.",
      "I prefer BMWs to Rolls Royces.",
      "I prefer strawberry to chocolate ice-cream."
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 34، تمرین 34.2."
  },
  {
    category: "vocabulary",
    lesson: 34,
    scope: "درس 34 — تمرین 34.2",
    text: "4 BMWs or Rolls Royces?",
    options: [
      "I prefer strawberry to chocolate ice-cream.",
      "I prefer cats to dogs.",
      "I prefer sightseeing to sunbathing.",
      "I prefer BMWs to Rolls Royces."
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 34، تمرین 34.2."
  },
  {
    category: "vocabulary",
    lesson: 34,
    scope: "درس 34 — تمرین 34.2",
    text: "5 strawberry or chocolate ice-cream?",
    options: [
      "I prefer sightseeing to sunbathing.",
      "I prefer cats to dogs.",
      "I prefer strawberry to chocolate ice-cream.",
      "I prefer BMWs to Rolls Royces."
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 34، تمرین 34.2."
  },
  {
    category: "vocabulary",
    lesson: 34,
    scope: "درس 34 — تمرین 34.2",
    text: "6 watching sport or doing sport?",
    options: [
      "I prefer cats to dogs.",
      "I prefer watching sport to doing sport.",
      "I prefer sightseeing to sunbathing.",
      "I prefer BMWs to Rolls Royces."
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 34، تمرین 34.2."
  },
  {
    category: "vocabulary",
    lesson: 34,
    scope: "درس 34 — تمرین 34.3",
    text: "2 The lesson feels very long. What do you hope?",
    options: [
      "I want some food.",
      "I hope (that) the lesson ends soon.",
      "I hope (that) my friend feels better soon.",
      "I want to go to bed."
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 34، تمرین 34.3."
  },
  {
    category: "vocabulary",
    lesson: 34,
    scope: "درس 34 — تمرین 34.3",
    text: "3 You're hungry. What do you want?",
    options: [
      "I want some food.",
      "I hope (that) the lesson ends soon.",
      "I hope (that) my friend feels better soon.",
      "I want to go to bed."
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 34، تمرین 34.3."
  },
  {
    category: "vocabulary",
    lesson: 34,
    scope: "درس 34 — تمرین 34.3",
    text: "4 Your friend feels ill. What do you hope?",
    options: [
      "I want to go to bed.",
      "I hope (that) the lesson ends soon.",
      "I want some food.",
      "I hope (that) my friend feels better soon."
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 34، تمرین 34.3."
  },
  {
    category: "vocabulary",
    lesson: 34,
    scope: "درس 34 — تمرین 34.3",
    text: "5 You're tired. What do you want?",
    options: [
      "I want some food.",
      "I hope (that) the lesson ends soon.",
      "I want to go to bed.",
      "I hope (that) my friend feels better soon."
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 34، تمرین 34.3."
  },
  {
    category: "vocabulary",
    lesson: 34,
    scope: "درس 34 — تمرین 34.3",
    text: "6 You're upset. What do you want?",
    options: [
      "I hope (that) the lesson ends soon.",
      "I want to cry.",
      "I want some food.",
      "I hope (that) my friend feels better soon."
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 34، تمرین 34.3."
  },
  {
    category: "vocabulary",
    lesson: 34,
    scope: "درس 34 — تمرین 34.3",
    text: "7 It is very cold weather. What do you hope?",
    options: [
      "I hope (that) it gets warmer soon.",
      "I hope (that) the lesson ends soon.",
      "I want some food.",
      "I hope (that) my friend feels better soon."
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 34، تمرین 34.3."
  },
  {
    category: "vocabulary",
    lesson: 34,
    scope: "درس 34 — تمرین 34.4",
    text: "2 Fred ________ ",
    options: [
      "happy",
      "Fred is thirsty.",
      "sad",
      "angry"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 34، تمرین 34.4."
  },
  {
    category: "vocabulary",
    lesson: 34,
    scope: "درس 34 — تمرین 34.4",
    text: "3 The children ________ ",
    options: [
      "The children are happy.",
      "Fred is thirsty.",
      "William is cold.",
      "Mrs Jones is tired."
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 34، تمرین 34.4."
  },
  {
    category: "vocabulary",
    lesson: 34,
    scope: "درس 34 — تمرین 34.4",
    text: "4 William ________ ",
    options: [
      "angry",
      "happy",
      "sad",
      "William is cold."
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 34، تمرین 34.4."
  },
  {
    category: "vocabulary",
    lesson: 34,
    scope: "درس 34 — تمرین 34.4",
    text: "5 Mrs Jones ________ ",
    options: [
      "The children are happy.",
      "Fred is thirsty.",
      "Mrs Jones is tired.",
      "William is cold."
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 34، تمرین 34.4."
  },
  {
    category: "vocabulary",
    lesson: 34,
    scope: "درس 34 — تمرین 34.4",
    text: "6 Mr Jones ________ ",
    options: [
      "Fred is thirsty.",
      "Mr Jones is angry.",
      "The children are happy.",
      "William is cold."
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 34، تمرین 34.4."
  },
  {
    category: "vocabulary",
    lesson: 34,
    scope: "درس 34 — تمرین 34.4",
    text: "7 Fiona ________ ",
    options: [
      "Fiona is surprised.",
      "happy",
      "sad",
      "angry"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 34، تمرین 34.4."
  },
  {
    category: "vocabulary",
    lesson: 34,
    scope: "درس 34 — تمرین 34.5",
    text: "2 surprised?",
    options: [
      "I felt upset when my boss was rude to me.",
      "I felt surprised yesterday when an old friend rang me."
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 34، تمرین 34.5."
  },
  {
    category: "vocabulary",
    lesson: 34,
    scope: "درس 34 — تمرین 34.5",
    text: "3 upset?",
    options: [
      "I felt upset when my boss was rude to me.",
      "I felt surprised yesterday when an old friend rang me."
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 34، تمرین 34.5."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.1",
    text: "2 The Sahara",
    options: [
      "The Volga is in Europe.",
      "The Amazon is in South America.",
      "Wogga Wogga is in Australia.",
      "The Sahara is in Africa."
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.1."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.1",
    text: "3 The Amazon",
    options: [
      "Wogga Wogga is in Australia.",
      "The Sahara is in Africa.",
      "The Amazon is in South America.",
      "The Volga is in Europe."
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.1."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.1",
    text: "4 Wogga Wogga",
    options: [
      "The Sahara is in Africa.",
      "Wogga Wogga is in Australia.",
      "The Amazon is in South America.",
      "The Volga is in Europe."
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.1."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.1",
    text: "5 The Volga",
    options: [
      "The Volga is in Europe.",
      "The Sahara is in Africa.",
      "The Amazon is in South America.",
      "Wogga Wogga is in Australia."
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.1."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.1",
    text: "6 Mount Kilimanjaro",
    options: [
      "Wogga Wogga is in Australia.",
      "The Sahara is in Africa.",
      "The Amazon is in South America.",
      "Mount Kilimanjaro is in Africa."
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.1."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.1",
    text: "7 The Mississippi",
    options: [
      "The Amazon is in South America.",
      "The Sahara is in Africa.",
      "The Mississippi is in North America.",
      "Wogga Wogga is in Australia."
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.1."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.1",
    text: "8 Mount Fuji",
    options: [
      "The Sahara is in Africa.",
      "Mount Fuji is in Asia.",
      "The Amazon is in South America.",
      "Wogga Wogga is in Australia."
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.1."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.1",
    text: "9 Lake Titicaca",
    options: [
      "Lake Titicaca is in South America.",
      "The Sahara is in Africa.",
      "The Amazon is in South America.",
      "Wogga Wogga is in Australia."
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.1."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.2",
    text: "1",
    options: [
      "China",
      "Brazil",
      "Spain",
      "Russia"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.2."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.2",
    text: "2",
    options: [
      "Russia",
      "Brazil",
      "Spain",
      "Sweden"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.2."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.2",
    text: "3",
    options: [
      "Spain",
      "Brazil",
      "Thailand",
      "Russia"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.2."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.2",
    text: "4",
    options: [
      "Spain",
      "Brazil",
      "Russia",
      "China"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.2."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.2",
    text: "5",
    options: [
      "Spain",
      "Brazil",
      "Russia",
      "China"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.2."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.2",
    text: "6",
    options: [
      "China",
      "Brazil",
      "Spain",
      "Russia"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.2."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.3",
    text: "2 Rome",
    options: [
      "Cairo is the capital of Egypt.",
      "Canberra is the capital of Australia.",
      "Bogota is the capital of Colombia.",
      "Rome is the capital of Italy."
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.3."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.3",
    text: "3 Canberra",
    options: [
      "Bogota is the capital of Colombia.",
      "Rome is the capital of Italy.",
      "Canberra is the capital of Australia.",
      "Cairo is the capital of Egypt."
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.3."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.3",
    text: "4 Bogota",
    options: [
      "Rome is the capital of Italy.",
      "Bogota is the capital of Colombia.",
      "Canberra is the capital of Australia.",
      "Cairo is the capital of Egypt."
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.3."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.3",
    text: "5 Cairo",
    options: [
      "Cairo is the capital of Egypt.",
      "Rome is the capital of Italy.",
      "Canberra is the capital of Australia.",
      "Bogota is the capital of Colombia."
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.3."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.3",
    text: "6 Vienna",
    options: [
      "Bogota is the capital of Colombia.",
      "Rome is the capital of Italy.",
      "Canberra is the capital of Australia.",
      "Vienna is the capital of Austria."
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.3."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.3",
    text: "7 Edinburgh",
    options: [
      "Canberra is the capital of Australia.",
      "Rome is the capital of Italy.",
      "Edinburgh is the capital of Scotland.",
      "Bogota is the capital of Colombia."
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.3."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.3",
    text: "8 Ankara",
    options: [
      "Rome is the capital of Italy.",
      "Ankara is the capital of Turkey.",
      "Canberra is the capital of Australia.",
      "Bogota is the capital of Colombia."
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.3."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.3",
    text: "9 Buenos Aires",
    options: [
      "Buenos Aires is the capital of Argentina.",
      "Rome is the capital of Italy.",
      "Canberra is the capital of Australia.",
      "Bogota is the capital of Colombia."
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.3."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.3",
    text: "10 Madrid",
    options: [
      "Bogota is the capital of Colombia.",
      "Rome is the capital of Italy.",
      "Canberra is the capital of Australia.",
      "Madrid is the capital of Spain."
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.3."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.6",
    text: "2 Vietnam",
    options: [
      "Iraqi",
      "Korean",
      "Thai",
      "Vietnamese"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.6."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.6",
    text: "3 Korea",
    options: [
      "Thai",
      "Vietnamese",
      "Korean",
      "Iraqi"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.6."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.6",
    text: "5 Iraq",
    options: [
      "Iraqi",
      "Vietnamese",
      "Korean",
      "Thai"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.6."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.6",
    text: "7 Egypt",
    options: [
      "Korean",
      "Vietnamese",
      "Egyptian",
      "Thai"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.6."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.6",
    text: "8 Argentina",
    options: [
      "Vietnamese",
      "Argentinian",
      "Korean",
      "Thai"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.6."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.6",
    text: "9 Holland",
    options: [
      "Dutch",
      "Vietnamese",
      "Korean",
      "Thai"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.6."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.6",
    text: "10 Spain",
    options: [
      "Thai",
      "Vietnamese",
      "Korean",
      "Spanish"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.6."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.6",
    text: "11 Peru",
    options: [
      "Korean",
      "Vietnamese",
      "Peruvian",
      "Thai"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.6."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.6",
    text: "12 China",
    options: [
      "Vietnamese",
      "Chinese",
      "Korean",
      "Thai"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.6."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.6",
    text: "13 Britain",
    options: [
      "British",
      "Vietnamese",
      "Korean",
      "Thai"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.6."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.6",
    text: "14 Greece",
    options: [
      "Thai",
      "Vietnamese",
      "Korean",
      "Greek"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.6."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.6",
    text: "15 Australia",
    options: [
      "Korean",
      "Vietnamese",
      "Australian",
      "Thai"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.6."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.6",
    text: "16 Poland",
    options: [
      "Vietnamese",
      "Polish",
      "Korean",
      "Thai"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.6."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.6",
    text: "17 India",
    options: [
      "Indian",
      "Vietnamese",
      "Korean",
      "Thai"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.6."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.1",
    text: "Where can I get information about hotels?",
    options: [
      "At the bank.",
      "At the tourist information office.",
      "In",
      "At the museum."
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.1."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.1",
    text: "Where can I change money?",
    options: [
      "At the bank.",
      "At the tourist information office.",
      "In",
      "At the museum."
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.1."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.1",
    text: "Where can I park?",
    options: [
      "At the museum.",
      "At the tourist information office.",
      "At the bank.",
      "In"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.1."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.1",
    text: "Where can I see very old things?",
    options: [
      "At the bank.",
      "At the tourist information office.",
      "At the museum.",
      "In"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.1."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.1",
    text: "Where can I post a letter?",
    options: [
      "At the tourist information office.",
      "At the post office.",
      "At the bank.",
      "In"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.1."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.2",
    text: " ________ In the square.",
    options: [
      "How do I get to the museum?",
      "Where's the town hall?",
      "Is there a shopping centre?",
      "Where can I park?"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.2."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.2",
    text: " ________ Go left at York Street.",
    options: [
      "How do I get to the museum?",
      "Where's the town hall?",
      "Is there a shopping centre?",
      "Where can I park?"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.2."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.2",
    text: " ________ In the pedestrian area.",
    options: [
      "Where can I park?",
      "Where's the town hall?",
      "How do I get to the museum?",
      "Is there a shopping centre?"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.2."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.2",
    text: " ________ London Road car park is best.",
    options: [
      "How do I get to the museum?",
      "Where's the town hall?",
      "Where can I park?",
      "Is there a shopping centre?"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.2."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.2",
    text: " ________ There's a bank in Queen Street.",
    options: [
      "Where's the town hall?",
      "Where can I change money?",
      "How do I get to the museum?",
      "Is there a shopping centre?"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.2."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.3",
    text: "nowt hlal",
    options: [
      "library",
      "town hall",
      "car park",
      "railway station"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.3."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.3",
    text: "brilyra",
    options: [
      "library",
      "town hall",
      "car park",
      "railway station"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.3."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.3",
    text: "rac prak",
    options: [
      "railway station",
      "town hall",
      "library",
      "car park"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.3."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.3",
    text: "ywrlaai nttoisa",
    options: [
      "library",
      "town hall",
      "railway station",
      "car park"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.3."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.3",
    text: "dtaeepsrin raae",
    options: [
      "town hall",
      "pedestrian area",
      "library",
      "car park"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.3."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.3",
    text: "frtafci dnearw",
    options: [
      "traffic warden",
      "town hall",
      "library",
      "car park"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.3."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.4",
    text: "Sign 1 (PARKING PROHIBITED)",
    options: [
      "Bus stop",
      "No entry (you must not drive in)",
      "No parking (do not leave your car here)",
      "Information"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.4."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.4",
    text: "Sign 2",
    options: [
      "No parking (do not leave your car here)",
      "No entry (you must not drive in)",
      "Bus stop",
      "Information"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.4."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.4",
    text: "Sign 3",
    options: [
      "Bus stop",
      "No parking (do not leave your car here)",
      "No entry (you must not drive in)",
      "Information"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.4."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.4",
    text: "Sign 4",
    options: [
      "Bus stop",
      "No parking (do not leave your car here)",
      "No entry (you must not drive in)",
      "Information"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.4."
  },
  {
    category: "vocabulary",
    lesson: 40,
    scope: "درس 40 — تمرین 40.1",
    text: "2 A ............ has a very long neck.",
    options: [
      "horse; elephant",
      "Parrots; budgies; hens",
      "Tigers; lions",
      "giraffe"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 40، تمرین 40.1."
  },
  {
    category: "vocabulary",
    lesson: 40,
    scope: "درس 40 — تمرین 40.1",
    text: "3 ............, ............ and ............ are birds.",
    options: [
      "Tigers; lions",
      "giraffe",
      "Parrots; budgies; hens",
      "horse; elephant"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 40، تمرین 40.1."
  },
  {
    category: "vocabulary",
    lesson: 40,
    scope: "درس 40 — تمرین 40.1",
    text: "4 ............ and ............ are large cats.",
    options: [
      "giraffe",
      "Tigers; lions",
      "Parrots; budgies; hens",
      "horse; elephant"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 40، تمرین 40.1."
  },
  {
    category: "vocabulary",
    lesson: 40,
    scope: "درس 40 — تمرین 40.1",
    text: "5 You can ride a ............ and an ............",
    options: [
      "horse; elephant",
      "giraffe",
      "Parrots; budgies; hens",
      "Tigers; lions"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 40، تمرین 40.1."
  },
  {
    category: "vocabulary",
    lesson: 40,
    scope: "درس 40 — تمرین 40.1",
    text: "6 ............ swim and ............ fly.",
    options: [
      "Tigers; lions",
      "giraffe",
      "Parrots; budgies; hens",
      "Fish; birds"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 40، تمرین 40.1."
  },
  {
    category: "vocabulary",
    lesson: 40,
    scope: "درس 40 — تمرین 40.1",
    text: "7 You can buy ............ at a butcher's.",
    options: [
      "Parrots; budgies; hens",
      "giraffe",
      "meat",
      "Tigers; lions"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 40، تمرین 40.1."
  },
  {
    category: "vocabulary",
    lesson: 40,
    scope: "درس 40 — تمرین 40.1",
    text: "8 ............ and ............ give us things for breakfast.",
    options: [
      "giraffe",
      "Hens; cows (or pigs)",
      "Parrots; budgies; hens",
      "Tigers; lions"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 40، تمرین 40.1."
  },
  {
    category: "vocabulary",
    lesson: 41,
    scope: "درس 41 — تمرین 41.1",
    text: "1 land",
    options: [
      "it travels on water e.g. the Titanic",
      "what you must pay when you travel",
      "a place to eat on a train",
      "planes do this at airports"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 41، تمرین 41.1."
  },
  {
    category: "vocabulary",
    lesson: 41,
    scope: "درس 41 — تمرین 41.1",
    text: "2 fare",
    options: [
      "a place to eat on a train",
      "planes do this at airports",
      "what you must pay when you travel",
      "it travels on water e.g. the Titanic"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 41، تمرین 41.1."
  },
  {
    category: "vocabulary",
    lesson: 41,
    scope: "درس 41 — تمرین 41.1",
    text: "3 buffet car",
    options: [
      "planes do this at airports",
      "a place to eat on a train",
      "what you must pay when you travel",
      "it travels on water e.g. the Titanic"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 41، تمرین 41.1."
  },
  {
    category: "vocabulary",
    lesson: 41,
    scope: "درس 41 — تمرین 41.1",
    text: "4 ship",
    options: [
      "it travels on water e.g. the Titanic",
      "planes do this at airports",
      "what you must pay when you travel",
      "a place to eat on a train"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 41، تمرین 41.1."
  },
  {
    category: "vocabulary",
    lesson: 41,
    scope: "درس 41 — تمرین 41.1",
    text: "5 timetable",
    options: [
      "a place to eat on a train",
      "planes do this at airports",
      "what you must pay when you travel",
      "it says when trains depart and arrive"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 41، تمرین 41.1."
  },
  {
    category: "vocabulary",
    lesson: 41,
    scope: "درس 41 — تمرین 41.1",
    text: "6 platform",
    options: [
      "what you must pay when you travel",
      "planes do this at airports",
      "where you stand when you are waiting for a train",
      "a place to eat on a train"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 41، تمرین 41.1."
  },
  {
    category: "vocabulary",
    lesson: 41,
    scope: "درس 41 — تمرین 41.1",
    text: "7 luggage",
    options: [
      "planes do this at airports",
      "bags and suitcases",
      "what you must pay when you travel",
      "a place to eat on a train"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 41، تمرین 41.1."
  },
  {
    category: "vocabulary",
    lesson: 41,
    scope: "درس 41 — تمرین 41.2",
    text: "1 What is the difference between a single ticket and a return ticket?",
    options: [
      "You can get on a plane or a boat.",
      "He or she checks what people bring into a country.",
      "No, it lands at the end of a journey and takes off at the beginning of a journey.",
      "A single takes you to a place and a return takes you to that place and back again."
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 41، تمرین 41.2."
  },
  {
    category: "vocabulary",
    lesson: 41,
    scope: "درس 41 — تمرین 41.2",
    text: "2 What does a customs officer do?",
    options: [
      "No, it lands at the end of a journey and takes off at the beginning of a journey.",
      "A single takes you to a place and a return takes you to that place and back again.",
      "He or she checks what people bring into a country.",
      "You can get on a plane or a boat."
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 41، تمرین 41.2."
  },
  {
    category: "vocabulary",
    lesson: 41,
    scope: "درس 41 — تمرین 41.2",
    text: "3 Does a plane take off at the end of a journey?",
    options: [
      "A single takes you to a place and a return takes you to that place and back again.",
      "No, it lands at the end of a journey and takes off at the beginning of a journey.",
      "He or she checks what people bring into a country.",
      "You can get on a plane or a boat."
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 41، تمرین 41.2."
  },
  {
    category: "vocabulary",
    lesson: 41,
    scope: "درس 41 — تمرین 41.2",
    text: "4 What do you do with a boarding card?",
    options: [
      "You can get on a plane or a boat.",
      "A single takes you to a place and a return takes you to that place and back again.",
      "He or she checks what people bring into a country.",
      "No, it lands at the end of a journey and takes off at the beginning of a journey."
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 41، تمرین 41.2."
  },
  {
    category: "vocabulary",
    lesson: 41,
    scope: "درس 41 — تمرین 41.2",
    text: "5 What is the difference between hiring a car and buying a car?",
    options: [
      "No, it lands at the end of a journey and takes off at the beginning of a journey.",
      "A single takes you to a place and a return takes you to that place and back again.",
      "He or she checks what people bring into a country.",
      "If you hire a car you have it for a day or a week. If you buy it it is your car."
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 41، تمرین 41.2."
  },
  {
    category: "vocabulary",
    lesson: 41,
    scope: "درس 41 — تمرین 41.2",
    text: "6 If you ask someone for a lift, do you want to go to the top floor?",
    options: [
      "He or she checks what people bring into a country.",
      "A single takes you to a place and a return takes you to that place and back again.",
      "No, you want to go somewhere in their car.",
      "No, it lands at the end of a journey and takes off at the beginning of a journey."
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 41، تمرین 41.2."
  },
  {
    category: "vocabulary",
    lesson: 45,
    scope: "درس 45 — تمرین 45.1",
    text: "2 ________ ",
    options: [
      "chest of drawers",
      "bed",
      "wardrobe",
      "bedside table"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 45، تمرین 45.1."
  },
  {
    category: "vocabulary",
    lesson: 45,
    scope: "درس 45 — تمرین 45.1",
    text: "3 ________ ",
    options: [
      "bed",
      "chest of drawers",
      "wardrobe",
      "bedside table"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 45، تمرین 45.1."
  },
  {
    category: "vocabulary",
    lesson: 45,
    scope: "درس 45 — تمرین 45.1",
    text: "4 ________ ",
    options: [
      "bedside table",
      "bed",
      "wardrobe",
      "chest of drawers"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 45، تمرین 45.1."
  },
  {
    category: "vocabulary",
    lesson: 45,
    scope: "درس 45 — تمرین 45.1",
    text: "5 ________ ",
    options: [
      "chest of drawers",
      "bed",
      "wardrobe",
      "alarm clock"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 45، تمرین 45.1."
  },
  {
    category: "vocabulary",
    lesson: 45,
    scope: "درس 45 — تمرین 45.1",
    text: "6 ________ ",
    options: [
      "wardrobe",
      "bed",
      "bedside lamp",
      "chest of drawers"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 45، تمرین 45.1."
  },
  {
    category: "vocabulary",
    lesson: 45,
    scope: "درس 45 — تمرین 45.1",
    text: "7 ________ ",
    options: [
      "bed",
      "brush",
      "wardrobe",
      "chest of drawers"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 45، تمرین 45.1."
  },
  {
    category: "vocabulary",
    lesson: 45,
    scope: "درس 45 — تمرین 45.1",
    text: "8 ________ ",
    options: [
      "mirror",
      "bed",
      "wardrobe",
      "chest of drawers"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 45، تمرین 45.1."
  },
  {
    category: "vocabulary",
    lesson: 45,
    scope: "درس 45 — تمرین 45.1",
    text: "9 ________ ",
    options: [
      "chest of drawers",
      "bed",
      "wardrobe",
      "comb"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 45، تمرین 45.1."
  },
  {
    category: "vocabulary",
    lesson: 45,
    scope: "درس 45 — تمرین 45.3",
    text: "2 Selim and Umit ________ ",
    options: [
      "Mr Park is having a bath.",
      "Mrs Park is going downstairs.",
      "Selim and Umit are washing their faces.",
      "Jaime is getting dressed."
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 45، تمرین 45.3."
  },
  {
    category: "vocabulary",
    lesson: 45,
    scope: "درس 45 — تمرین 45.3",
    text: "3 Mrs Park ________ ",
    options: [
      "Selim and Umit are washing their faces.",
      "Mrs Park is going downstairs.",
      "Mr Park is having a bath.",
      "Jaime is getting dressed."
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 45، تمرین 45.3."
  },
  {
    category: "vocabulary",
    lesson: 45,
    scope: "درس 45 — تمرین 45.3",
    text: "4 Mr Park ________ ",
    options: [
      "Mr Park is having a bath.",
      "Selim and Umit are washing their faces.",
      "Mrs Park is going downstairs.",
      "Jaime is getting dressed."
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 45، تمرین 45.3."
  },
  {
    category: "vocabulary",
    lesson: 45,
    scope: "درس 45 — تمرین 45.3",
    text: "5 Jaime ________ ",
    options: [
      "Mr Park is having a bath.",
      "Selim and Umit are washing their faces.",
      "Mrs Park is going downstairs.",
      "Jaime is getting dressed."
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 45، تمرین 45.3."
  },
  {
    category: "vocabulary",
    lesson: 45,
    scope: "درس 45 — تمرین 45.3",
    text: "6 Lee ________ ",
    options: [
      "Mrs Park is going downstairs.",
      "Selim and Umit are washing their faces.",
      "Lee is turning off the light.",
      "Mr Park is having a bath."
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 45، تمرین 45.3."
  },
  {
    category: "vocabulary",
    lesson: 47,
    scope: "درس 47 — تمرین 47.1",
    text: "2 A doctor ________ ",
    options: [
      "A doctor works in a hospital (or a clinic, or a surgery).",
      "A waiter works in a restaurant (or a café).",
      "A secretary works in an office.",
      "A shop assistant works in a shop."
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 47، تمرین 47.1."
  },
  {
    category: "vocabulary",
    lesson: 47,
    scope: "درس 47 — تمرین 47.1",
    text: "3 A waiter ________ ",
    options: [
      "A shop assistant works in a shop.",
      "A doctor works in a hospital (or a clinic, or a surgery).",
      "A secretary works in an office.",
      "A waiter works in a restaurant (or a café)."
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 47، تمرین 47.1."
  },
  {
    category: "vocabulary",
    lesson: 47,
    scope: "درس 47 — تمرین 47.1",
    text: "4 A secretary ________ ",
    options: [
      "A waiter works in a restaurant (or a café).",
      "A doctor works in a hospital (or a clinic, or a surgery).",
      "A secretary works in an office.",
      "A shop assistant works in a shop."
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 47، تمرین 47.1."
  },
  {
    category: "vocabulary",
    lesson: 47,
    scope: "درس 47 — تمرین 47.1",
    text: "5 A shop assistant ________ ",
    options: [
      "A doctor works in a hospital (or a clinic, or a surgery).",
      "A shop assistant works in a shop.",
      "A waiter works in a restaurant (or a café).",
      "A secretary works in an office."
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 47، تمرین 47.1."
  },
  {
    category: "vocabulary",
    lesson: 47,
    scope: "درس 47 — تمرین 47.1",
    text: "6 A hairdresser ________ ",
    options: [
      "A hairdresser works in a hairdresser's (or a salon).",
      "A doctor works in a hospital (or a clinic, or a surgery).",
      "A waiter works in a restaurant (or a café).",
      "A secretary works in an office."
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 47، تمرین 47.1."
  },
  {
    category: "vocabulary",
    lesson: 47,
    scope: "درس 47 — تمرین 47.2",
    text: "1",
    options: [
      "farmer",
      "engineer",
      "taxi-driver",
      "mechanic"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 47، تمرین 47.2."
  },
  {
    category: "vocabulary",
    lesson: 47,
    scope: "درس 47 — تمرین 47.2",
    text: "2",
    options: [
      "farmer",
      "engineer",
      "taxi-driver",
      "mechanic"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 47، تمرین 47.2."
  },
  {
    category: "vocabulary",
    lesson: 47,
    scope: "درس 47 — تمرین 47.2",
    text: "3",
    options: [
      "mechanic",
      "farmer",
      "engineer",
      "taxi-driver"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 47، تمرین 47.2."
  },
  {
    category: "vocabulary",
    lesson: 47,
    scope: "درس 47 — تمرین 47.2",
    text: "4",
    options: [
      "engineer",
      "farmer",
      "nurse",
      "taxi-driver"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 47، تمرین 47.2."
  },
  {
    category: "vocabulary",
    lesson: 47,
    scope: "درس 47 — تمرین 47.2",
    text: "5",
    options: [
      "farmer",
      "mechanic",
      "engineer",
      "taxi-driver"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 47، تمرین 47.2."
  },
  {
    category: "vocabulary",
    lesson: 47,
    scope: "درس 47 — تمرین 47.2",
    text: "6",
    options: [
      "secretary",
      "farmer",
      "engineer",
      "taxi-driver"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 47، تمرین 47.2."
  },
  {
    category: "vocabulary",
    lesson: 47,
    scope: "درس 47 — تمرین 47.3",
    text: "1 What do you do?",
    options: [
      "Yes, very interesting.",
      "In a university.",
      "I'm a teacher."
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 47، تمرین 47.3."
  },
  {
    category: "vocabulary",
    lesson: 47,
    scope: "درس 47 — تمرین 47.3",
    text: "2 Where do you work?",
    options: [
      "Yes, very interesting.",
      "I'm a teacher.",
      "In a university."
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 47، تمرین 47.3."
  },
  {
    category: "vocabulary",
    lesson: 47,
    scope: "درس 47 — تمرین 47.3",
    text: "3 Is it an interesting job?",
    options: [
      "In a university.",
      "I'm a teacher.",
      "Yes, very interesting."
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 47، تمرین 47.3."
  },
  {
    category: "vocabulary",
    lesson: 51,
    scope: "درس 51 — تمرین 51.1",
    text: "aspirin",
    options: [
      "toy shop",
      "chemist's",
      "butcher's",
      "baker's"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 51، تمرین 51.1."
  },
  {
    category: "vocabulary",
    lesson: 51,
    scope: "درس 51 — تمرین 51.1",
    text: "beach ball",
    options: [
      "toy shop",
      "butcher's",
      "baker's",
      "gift shop"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 51، تمرین 51.1."
  },
  {
    category: "vocabulary",
    lesson: 51,
    scope: "درس 51 — تمرین 51.1",
    text: "sausages",
    options: [
      "gift shop",
      "toy shop",
      "baker's",
      "butcher's"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 51، تمرین 51.1."
  },
  {
    category: "vocabulary",
    lesson: 51,
    scope: "درس 51 — تمرین 51.1",
    text: "postcards",
    options: [
      "butcher's",
      "toy shop",
      "newsagent's",
      "baker's"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 51، تمرین 51.1."
  },
  {
    category: "vocabulary",
    lesson: 51,
    scope: "درس 51 — تمرین 51.1",
    text: "souvenir T-shirt",
    options: [
      "toy shop",
      "gift shop",
      "butcher's",
      "baker's"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 51، تمرین 51.1."
  },
  {
    category: "vocabulary",
    lesson: 51,
    scope: "درس 51 — تمرین 51.1",
    text: "bread",
    options: [
      "baker's",
      "toy shop",
      "butcher's",
      "gift shop"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 51، تمرین 51.1."
  },
  {
    category: "vocabulary",
    lesson: 51,
    scope: "درس 51 — تمرین 51.2",
    text: "I want to buy everything in one shop.",
    options: [
      "A department store (or a supermarket).",
      "The hairdresser's.",
      "The post office.",
      "A gift shop."
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 51، تمرین 51.2."
  },
  {
    category: "vocabulary",
    lesson: 51,
    scope: "درس 51 — تمرین 51.3",
    text: "an armchair?",
    options: [
      "ground",
      "3rd",
      "4th",
      "basement"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 51، تمرین 51.3."
  },
  {
    category: "vocabulary",
    lesson: 51,
    scope: "درس 51 — تمرین 51.3",
    text: "lipstick?",
    options: [
      "ground",
      "3rd",
      "4th",
      "basement"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 51، تمرین 51.3."
  },
  {
    category: "vocabulary",
    lesson: 51,
    scope: "درس 51 — تمرین 51.3",
    text: "a cup of tea?",
    options: [
      "basement",
      "3rd",
      "ground",
      "4th"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 51، تمرین 51.3."
  },
  {
    category: "vocabulary",
    lesson: 51,
    scope: "درس 51 — تمرین 51.3",
    text: "a packet of tea?",
    options: [
      "ground",
      "3rd",
      "basement",
      "4th"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 51، تمرین 51.3."
  },
  {
    category: "vocabulary",
    lesson: 51,
    scope: "درس 51 — تمرین 51.3",
    text: "a skirt?",
    options: [
      "3rd",
      "1st",
      "ground",
      "4th"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 51، تمرین 51.3."
  },
  {
    category: "vocabulary",
    lesson: 51,
    scope: "درس 51 — تمرین 51.3",
    text: "some tennis balls?",
    options: [
      "basement",
      "3rd",
      "ground",
      "4th"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 51، تمرین 51.3."
  },
  {
    category: "vocabulary",
    lesson: 51,
    scope: "درس 51 — تمرین 51.3",
    text: "a pair of boots?",
    options: [
      "basement",
      "3rd",
      "4th",
      "ground"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 51، تمرین 51.3."
  },
  {
    category: "vocabulary",
    lesson: 51,
    scope: "درس 51 — تمرین 51.3",
    text: "some baby clothes?",
    options: [
      "ground",
      "3rd",
      "2nd",
      "4th"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 51، تمرین 51.3."
  },
  {
    category: "vocabulary",
    lesson: 51,
    scope: "درس 51 — تمرین 51.3",
    text: "a tie?",
    options: [
      "3rd",
      "2nd",
      "ground",
      "4th"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 51، تمرین 51.3."
  },
  {
    category: "vocabulary",
    lesson: 51,
    scope: "درس 51 — تمرین 51.3",
    text: "a TV?",
    options: [
      "3rd",
      "ground",
      "4th",
      "basement"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 51، تمرین 51.3."
  },
  {
    category: "vocabulary",
    lesson: 51,
    scope: "درس 51 — تمرین 51.3",
    text: "pens?",
    options: [
      "basement",
      "3rd",
      "4th",
      "ground"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 51، تمرین 51.3."
  },
  {
    category: "vocabulary",
    lesson: 51,
    scope: "درس 51 — تمرین 51.3",
    text: "a doll?",
    options: [
      "ground",
      "3rd",
      "2nd",
      "4th"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 51، تمرین 51.3."
  },
  {
    category: "vocabulary",
    lesson: 51,
    scope: "درس 51 — تمرین 51.4",
    text: "money not a cheque or credit card",
    options: [
      "cash",
      "a hairdresser",
      "a credit card",
      "the basement"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 51، تمرین 51.4."
  },
  {
    category: "vocabulary",
    lesson: 51,
    scope: "درس 51 — تمرین 51.4",
    text: "a person who cuts hair",
    options: [
      "the basement",
      "cash",
      "a credit card",
      "a hairdresser"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 51، تمرین 51.4."
  },
  {
    category: "vocabulary",
    lesson: 51,
    scope: "درس 51 — تمرین 51.4",
    text: "'plastic money'",
    options: [
      "a hairdresser",
      "cash",
      "a credit card",
      "the basement"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 51، تمرین 51.4."
  },
  {
    category: "vocabulary",
    lesson: 51,
    scope: "درس 51 — تمرین 51.4",
    text: "a floor lower than the ground floor",
    options: [
      "cash",
      "the basement",
      "a hairdresser",
      "a credit card"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 51، تمرین 51.4."
  },
  {
    category: "vocabulary",
    lesson: 51,
    scope: "درس 51 — تمرین 51.4",
    text: "a £5 note",
    options: [
      "a piece of paper that is worth five pounds",
      "cash",
      "a hairdresser",
      "a credit card"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 51، تمرین 51.4."
  },
  {
    category: "vocabulary",
    lesson: 51,
    scope: "درس 51 — تمرین 51.4",
    text: "the first floor",
    options: [
      "a credit card",
      "cash",
      "a hairdresser",
      "the floor above the ground floor (in a British building)"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 51، تمرین 51.4."
  },
  {
    category: "vocabulary",
    lesson: 51,
    scope: "درس 51 — تمرین 51.4",
    text: "a receipt",
    options: [
      "a hairdresser",
      "cash",
      "a piece of paper that you get when you buy something",
      "a credit card"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 51، تمرین 51.4."
  },
  {
    category: "vocabulary",
    lesson: 51,
    scope: "درس 51 — تمرین 51.4",
    text: "a cash desk",
    options: [
      "cash",
      "the place where you pay for things in a shop",
      "a hairdresser",
      "a credit card"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 51، تمرین 51.4."
  },
  {
    category: "vocabulary",
    lesson: 51,
    scope: "درس 51 — تمرین 51.6",
    text: "CUSTOMER: How much does this shirt ________ ?",
    options: [
      "cost",
      "pay",
      "(carrier) bag"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 51، تمرین 51.6."
  },
  {
    category: "vocabulary",
    lesson: 51,
    scope: "درس 51 — تمرین 51.6",
    text: "CUSTOMER: I'll take it, please. Can I ________ by credit card?",
    options: [
      "(carrier) bag",
      "cost",
      "pay"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 51، تمرین 51.6."
  },
  {
    category: "vocabulary",
    lesson: 52,
    scope: "درس 52 — تمرین 52.2",
    text: "1 to have a cup of tea in your room",
    options: [
      "a kettle",
      "the lift",
      "an outside line",
      "a shower"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 52، تمرین 52.2."
  },
  {
    category: "vocabulary",
    lesson: 52,
    scope: "درس 52 — تمرین 52.2",
    text: "2 to go to the top floor",
    options: [
      "a kettle",
      "an outside line",
      "a shower",
      "the lift"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 52، تمرین 52.2."
  },
  {
    category: "vocabulary",
    lesson: 52,
    scope: "درس 52 — تمرین 52.2",
    text: "3 to open your door",
    options: [
      "an outside line",
      "the lift",
      "a key",
      "a shower"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 52، تمرین 52.2."
  },
  {
    category: "vocabulary",
    lesson: 52,
    scope: "درس 52 — تمرین 52.2",
    text: "4 to get up at 6 a.m.",
    options: [
      "the lift",
      "a morning call",
      "an outside line",
      "a shower"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 52، تمرین 52.2."
  },
  {
    category: "vocabulary",
    lesson: 52,
    scope: "درس 52 — تمرین 52.2",
    text: "5 to phone your country",
    options: [
      "an outside line",
      "the lift",
      "a shower",
      "a kettle"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 52، تمرین 52.2."
  },
  {
    category: "vocabulary",
    lesson: 52,
    scope: "درس 52 — تمرین 52.2",
    text: "6 to watch the news",
    options: [
      "a shower",
      "the lift",
      "an outside line",
      "a TV"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 52، تمرین 52.2."
  },
  {
    category: "vocabulary",
    lesson: 52,
    scope: "درس 52 — تمرین 52.2",
    text: "7 to wash your hair",
    options: [
      "an outside line",
      "the lift",
      "a shower",
      "a kettle"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 52، تمرین 52.2."
  },
  {
    category: "vocabulary",
    lesson: 52,
    scope: "درس 52 — تمرین 52.2",
    text: "8 to dry your hair",
    options: [
      "the lift",
      "a hair dryer",
      "an outside line",
      "a shower"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 52، تمرین 52.2."
  },
  {
    category: "vocabulary",
    lesson: 53,
    scope: "درس 53 — تمرین 53.1",
    text: "2 want a romantic dinner for two?",
    options: [
      "café",
      "fast food restaurant",
      "restaurant",
      "bar"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 53، تمرین 53.1."
  },
  {
    category: "vocabulary",
    lesson: 53,
    scope: "درس 53 — تمرین 53.1",
    text: "3 have three small children with you?",
    options: [
      "restaurant",
      "fast food restaurant",
      "café",
      "bar"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 53، تمرین 53.1."
  },
  {
    category: "vocabulary",
    lesson: 53,
    scope: "درس 53 — تمرین 53.1",
    text: "4 arrive half an hour early to meet a friend?",
    options: [
      "café",
      "restaurant",
      "fast food restaurant",
      "bar"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 53، تمرین 53.1."
  },
  {
    category: "vocabulary",
    lesson: 53,
    scope: "درس 53 — تمرین 53.1",
    text: "5 are very thirsty?",
    options: [
      "café",
      "restaurant",
      "fast food restaurant",
      "bar"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 53، تمرین 53.1."
  },
  {
    category: "vocabulary",
    lesson: 53,
    scope: "درس 53 — تمرین 53.3",
    text: "1 What would you eat from the menu opposite?",
    options: [
      "A vegetarian would choose melon or tomato soup and a cheese or plain omelette and any of the desserts.",
      "I'd choose tomato soup, chicken salad and strawberries and cream."
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 53، تمرین 53.3."
  },
  {
    category: "vocabulary",
    lesson: 53,
    scope: "درس 53 — تمرین 53.3",
    text: "2 What would a vegetarian eat? (Vegetarians don't eat meat.)",
    options: [
      "A vegetarian would choose melon or tomato soup and a cheese or plain omelette and any of the desserts.",
      "I'd choose tomato soup, chicken salad and strawberries and cream."
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 53، تمرین 53.3."
  },
  {
    category: "vocabulary",
    lesson: 53,
    scope: "درس 53 — تمرین 53.4",
    text: "2 Would you like a cheese / ham / plain ..............?",
    options: [
      "potatoes",
      "steak",
      "omelette",
      "gateau"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 53، تمرین 53.4."
  },
  {
    category: "vocabulary",
    lesson: 53,
    scope: "درس 53 — تمرین 53.4",
    text: "3 I'll have the chicken / ham / fruit ..............",
    options: [
      "steak",
      "salad",
      "omelette",
      "potatoes"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 53، تمرین 53.4."
  },
  {
    category: "vocabulary",
    lesson: 53,
    scope: "درس 53 — تمرین 53.4",
    text: "4 I'd like some roast / mashed / new ..............",
    options: [
      "potatoes",
      "steak",
      "omelette",
      "gateau"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 53، تمرین 53.4."
  },
  {
    category: "vocabulary",
    lesson: 53,
    scope: "درس 53 — تمرین 53.4",
    text: "5 Can I have the chocolate / strawberry / apricot .............., please.",
    options: [
      "potatoes",
      "steak",
      "omelette",
      "gateau"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 53، تمرین 53.4."
  },
  {
    category: "vocabulary",
    lesson: 53,
    scope: "درس 53 — تمرین 53.4",
    text: "6 Do you like your .............. well-done / medium / rare?",
    options: [
      "potatoes",
      "omelette",
      "steak",
      "gateau"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 53، تمرین 53.4."
  },
  {
    category: "vocabulary",
    lesson: 53,
    scope: "درس 53 — تمرین 53.5",
    text: "WAITER: Are you ready for order?",
    options: [
      "CUSTOMER: Rare, please.",
      "CUSTOMER: Yes. I'd like vegetable soup and steak, please.",
      "WAITER: How would you like your steak? Rare, medium or well-done?",
      "WAITER: Are you ready to order?"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 53، تمرین 53.5."
  },
  {
    category: "vocabulary",
    lesson: 53,
    scope: "درس 53 — تمرین 53.5",
    text: "CUSTOMER: Yes. I like vegetable soup and steak, please.",
    options: [
      "WAITER: How would you like your steak? Rare, medium or well-done?",
      "WAITER: Are you ready to order?",
      "CUSTOMER: Yes. I'd like vegetable soup and steak, please.",
      "CUSTOMER: Rare, please."
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 53، تمرین 53.5."
  },
  {
    category: "vocabulary",
    lesson: 53,
    scope: "درس 53 — تمرین 53.5",
    text: "WAITER: What would you like your steak? Rare, medium or done good?",
    options: [
      "WAITER: Are you ready to order?",
      "WAITER: How would you like your steak? Rare, medium or well-done?",
      "CUSTOMER: Yes. I'd like vegetable soup and steak, please.",
      "CUSTOMER: Rare, please."
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 53، تمرین 53.5."
  },
  {
    category: "vocabulary",
    lesson: 53,
    scope: "درس 53 — تمرین 53.5",
    text: "WAITER: What you would like to drink?",
    options: [
      "WAITER: How would you like your steak? Rare, medium or well-done?",
      "WAITER: Are you ready to order?",
      "CUSTOMER: Yes. I'd like vegetable soup and steak, please.",
      "WAITER: What would you like to drink?"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 53، تمرین 53.5."
  },
  {
    category: "vocabulary",
    lesson: 53,
    scope: "درس 53 — تمرین 53.5",
    text: "CUSTOMER: A orange juice, please.",
    options: [
      "CUSTOMER: Yes. I'd like vegetable soup and steak, please.",
      "WAITER: Are you ready to order?",
      "CUSTOMER: An orange juice, please.",
      "WAITER: How would you like your steak? Rare, medium or well-done?"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 53، تمرین 53.5."
  },
  {
    category: "vocabulary",
    lesson: 57,
    scope: "درس 57 — تمرین 57.1",
    text: "a person who kills someone?",
    options: [
      "a burglar",
      "a shoplifter",
      "a murderer",
      "a mugger"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 57، تمرین 57.1."
  },
  {
    category: "vocabulary",
    lesson: 57,
    scope: "درس 57 — تمرین 57.1",
    text: "a person who steals things from shops?",
    options: [
      "a murderer",
      "a shoplifter",
      "a burglar",
      "a mugger"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 57، تمرین 57.1."
  },
  {
    category: "vocabulary",
    lesson: 57,
    scope: "درس 57 — تمرین 57.1",
    text: "a person who robs people's houses and flats?",
    options: [
      "a burglar",
      "a murderer",
      "a shoplifter",
      "a mugger"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 57، تمرین 57.1."
  },
  {
    category: "vocabulary",
    lesson: 57,
    scope: "درس 57 — تمرین 57.1",
    text: "a person who attacks someone in the street and steals their money?",
    options: [
      "a burglar",
      "a murderer",
      "a shoplifter",
      "a mugger"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 57، تمرین 57.1."
  },
  {
    category: "vocabulary",
    lesson: 57,
    scope: "درس 57 — تمرین 57.1",
    text: "a person who sells dangerous drugs?",
    options: [
      "a shoplifter",
      "a murderer",
      "a drug pusher",
      "a burglar"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 57، تمرین 57.1."
  },
  {
    category: "vocabulary",
    lesson: 57,
    scope: "درس 57 — تمرین 57.2",
    text: "The police officer a ________ her for shoplifting.",
    options: [
      "fine",
      "vandals",
      "arrested",
      "burglaries"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 57، تمرین 57.2."
  },
  {
    category: "vocabulary",
    lesson: 57,
    scope: "درس 57 — تمرین 57.2",
    text: "Some v ________ destroyed all the flowers in the park.",
    options: [
      "arrested",
      "vandals",
      "fine",
      "burglaries"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 57، تمرین 57.2."
  },
  {
    category: "vocabulary",
    lesson: 57,
    scope: "درس 57 — تمرین 57.2",
    text: "He had to pay a f ________ of £50 for parking his car in the wrong place.",
    options: [
      "fine",
      "arrested",
      "vandals",
      "burglaries"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 57، تمرین 57.2."
  },
  {
    category: "vocabulary",
    lesson: 57,
    scope: "درس 57 — تمرین 57.2",
    text: "There are a lot of b ________ in this part of the city, so always close the windows.",
    options: [
      "fine",
      "arrested",
      "vandals",
      "burglaries"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 57، تمرین 57.2."
  },
  {
    category: "vocabulary",
    lesson: 57,
    scope: "درس 57 — تمرین 57.2",
    text: "The police made a mistake; she was i ________ . She did not steal the money.",
    options: [
      "vandals",
      "arrested",
      "innocent",
      "fine"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 57، تمرین 57.2."
  },
  {
    category: "vocabulary",
    lesson: 57,
    scope: "درس 57 — تمرین 57.2",
    text: "People who t ________ drugs often do other crimes too.",
    options: [
      "arrested",
      "take",
      "vandals",
      "fine"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 57، تمرین 57.2."
  },
  {
    category: "vocabulary",
    lesson: 57,
    scope: "درس 57 — تمرین 57.2",
    text: "A group of t ________ have attacked the airport.",
    options: [
      "terrorists",
      "arrested",
      "vandals",
      "fine"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 57، تمرین 57.2."
  },
  {
    category: "vocabulary",
    lesson: 57,
    scope: "درس 57 — تمرین 57.2",
    text: "He murdered his wife. He was in p ________ for 20 years.",
    options: [
      "fine",
      "arrested",
      "vandals",
      "prison"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 57، تمرین 57.2."
  },
  {
    category: "vocabulary",
    lesson: 57,
    scope: "درس 57 — تمرین 57.3",
    text: "A woman parked her car and blocked the traffic.",
    options: [
      "death",
      "30 years in prison",
      "six months in prison",
      "fine of £100"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 57، تمرین 57.3."
  },
  {
    category: "vocabulary",
    lesson: 58,
    scope: "درس 58 — تمرین 58.1",
    text: "Ten million people watch this ................. every week. It's very popular.",
    options: [
      "documentary",
      "soap (opera) / talk show",
      "nature",
      "teenage"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 58، تمرین 58.1."
  },
  {
    category: "vocabulary",
    lesson: 58,
    scope: "درس 58 — تمرین 58.1",
    text: "There was a ................. about traffic problems in cities on TV last night.",
    options: [
      "documentary",
      "soap (opera) / talk show",
      "nature",
      "teenage"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 58، تمرین 58.1."
  },
  {
    category: "vocabulary",
    lesson: 58,
    scope: "درس 58 — تمرین 58.1",
    text: "I saw a ................. programme about birds in Antarctica.",
    options: [
      "teenage",
      "soap (opera) / talk show",
      "documentary",
      "nature"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 58، تمرین 58.1."
  },
  {
    category: "vocabulary",
    lesson: 58,
    scope: "درس 58 — تمرین 58.1",
    text: "My sister is 13; she reads ................. magazines every week. She likes the love stories.",
    options: [
      "documentary",
      "soap (opera) / talk show",
      "teenage",
      "nature"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 58، تمرین 58.1."
  },
  {
    category: "vocabulary",
    lesson: 58,
    scope: "درس 58 — تمرین 58.1",
    text: "With my computer I can get the sports news on the .................",
    options: [
      "soap (opera) / talk show",
      "Internet",
      "documentary",
      "nature"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 58، تمرین 58.1."
  },
  {
    category: "vocabulary",
    lesson: 58,
    scope: "درس 58 — تمرین 58.1",
    text: "Most young children don't read newspapers, they prefer .................",
    options: [
      "comics",
      "soap (opera) / talk show",
      "documentary",
      "nature"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 58، تمرین 58.1."
  },
  {
    category: "vocabulary",
    lesson: 58,
    scope: "درس 58 — تمرین 58.2",
    text: "Talking about family problems",
    options: [
      "Sports programme",
      "International news",
      "Talk show",
      "Soap opera"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 58، تمرین 58.2."
  },
  {
    category: "vocabulary",
    lesson: 58,
    scope: "درس 58 — تمرین 58.2",
    text: "Film of elephants in Africa",
    options: [
      "International news",
      "Nature programme",
      "Sports programme",
      "Soap opera"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 58، تمرین 58.2."
  },
  {
    category: "vocabulary",
    lesson: 58,
    scope: "درس 58 — تمرین 58.2",
    text: "Football cup final",
    options: [
      "Sports programme",
      "International news",
      "Soap opera",
      "Nature programme"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 58، تمرین 58.2."
  },
  {
    category: "vocabulary",
    lesson: 58,
    scope: "درس 58 — تمرین 58.2",
    text: "Reports from all over the world",
    options: [
      "Nature programme",
      "Sports programme",
      "Soap opera",
      "International news"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 58، تمرین 58.2."
  },
  {
    category: "vocabulary",
    lesson: 58,
    scope: "درس 58 — تمرین 58.2",
    text: "Maria decides not to marry Philip",
    options: [
      "Sports programme",
      "International news",
      "Soap opera",
      "Nature programme"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 58، تمرین 58.2."
  },
  {
    category: "vocabulary",
    lesson: 58,
    scope: "درس 58 — تمرین 58.3",
    text: "a computer magazine",
    options: [
      "pictures of pop music stars",
      "articles about health",
      "news about the Internet",
      "interviews with politicians"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 58، تمرین 58.3."
  },
  {
    category: "vocabulary",
    lesson: 58,
    scope: "درس 58 — تمرین 58.3",
    text: "a women's magazine",
    options: [
      "pictures of pop music stars",
      "articles about health",
      "news about the Internet",
      "interviews with politicians"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 58، تمرین 58.3."
  },
  {
    category: "vocabulary",
    lesson: 58,
    scope: "درس 58 — تمرین 58.3",
    text: "a news magazine",
    options: [
      "interviews with politicians",
      "articles about health",
      "pictures of pop music stars",
      "news about the Internet"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 58، تمرین 58.3."
  },
  {
    category: "vocabulary",
    lesson: 58,
    scope: "درس 58 — تمرین 58.3",
    text: "a teenage magazine",
    options: [
      "interviews with politicians",
      "articles about health",
      "news about the Internet",
      "pictures of pop music stars"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 58، تمرین 58.3."
  },
  {
    category: "vocabulary",
    lesson: 58,
    scope: "درس 58 — تمرین 58.4",
    text: "a person who writes articles in newspapers and magazines?",
    options: [
      "An evening (news)paper",
      "A journalist",
      "A comic",
      "A nature programme"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 58، تمرین 58.4."
  },
  {
    category: "vocabulary",
    lesson: 58,
    scope: "درس 58 — تمرین 58.4",
    text: "a newspaper you can buy every day after about 5 p.m.?",
    options: [
      "An evening (news)paper",
      "A journalist",
      "A comic",
      "A nature programme"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 58، تمرین 58.4."
  },
  {
    category: "vocabulary",
    lesson: 58,
    scope: "درس 58 — تمرین 58.4",
    text: "a magazine that children read, with cartoon pictures?",
    options: [
      "A nature programme",
      "A journalist",
      "An evening (news)paper",
      "A comic"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 58، تمرین 58.4."
  },
  {
    category: "vocabulary",
    lesson: 58,
    scope: "درس 58 — تمرین 58.4",
    text: "a programme on TV about animals, birds, etc?",
    options: [
      "An evening (news)paper",
      "A journalist",
      "A nature programme",
      "A comic"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 58، تمرین 58.4."
  },
  {
    category: "vocabulary",
    lesson: 58,
    scope: "درس 58 — تمرین 58.5",
    text: "Do you read a morning or an evening newspaper?",
    options: [
      "Satellite TV is getting more popular in Britain every year.",
      "In Britain, most people have four or five channels. They have more if they have satellite TV.",
      "I always read an evening newspaper.",
      "I watch two or three hours every day."
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 58، تمرین 58.5."
  },
  {
    category: "vocabulary",
    lesson: 58,
    scope: "درس 58 — تمرین 58.5",
    text: "How many TV channels do you have?",
    options: [
      "I always read an evening newspaper.",
      "In Britain, most people have four or five channels. They have more if they have satellite TV.",
      "Satellite TV is getting more popular in Britain every year.",
      "I watch two or three hours every day."
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 58، تمرین 58.5."
  },
  {
    category: "vocabulary",
    lesson: 58,
    scope: "درس 58 — تمرین 58.5",
    text: "Is satellite TV popular in your country?",
    options: [
      "Satellite TV is getting more popular in Britain every year.",
      "I always read an evening newspaper.",
      "In Britain, most people have four or five channels. They have more if they have satellite TV.",
      "I watch two or three hours every day."
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 58، تمرین 58.5."
  },
  {
    category: "vocabulary",
    lesson: 58,
    scope: "درس 58 — تمرین 58.5",
    text: "How many hours of TV do you watch every day?",
    options: [
      "Satellite TV is getting more popular in Britain every year.",
      "I always read an evening newspaper.",
      "In Britain, most people have four or five channels. They have more if they have satellite TV.",
      "I watch two or three hours every day."
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 58، تمرین 58.5."
  },
  {
    category: "vocabulary",
    lesson: 58,
    scope: "درس 58 — تمرین 58.5",
    text: "What are your favourite kinds of TV programmes?",
    options: [
      "In Britain, most people have four or five channels. They have more if they have satellite TV.",
      "I always read an evening newspaper.",
      "Documentaries and nature programmes.",
      "Satellite TV is getting more popular in Britain every year."
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 58، تمرین 58.5."
  },
  {
    category: "vocabulary",
    lesson: 59,
    scope: "درس 59 — تمرین 59.1",
    text: "2 Sarah ________ ",
    options: [
      "Her computer has crashed.",
      "The cup is broken.",
      "The phone is out of order.",
      "She has too much work."
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 59، تمرین 59.1."
  },
  {
    category: "vocabulary",
    lesson: 59,
    scope: "درس 59 — تمرین 59.1",
    text: "3 Maria ________ ",
    options: [
      "She has too much work.",
      "Her computer has crashed.",
      "The phone is out of order.",
      "The cup is broken."
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 59، تمرین 59.1."
  },
  {
    category: "vocabulary",
    lesson: 59,
    scope: "درس 59 — تمرین 59.1",
    text: "4 Tommy ________ ",
    options: [
      "The cup is broken.",
      "Her computer has crashed.",
      "The phone is out of order.",
      "She has too much work."
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 59، تمرین 59.1."
  },
  {
    category: "vocabulary",
    lesson: 59,
    scope: "درس 59 — تمرین 59.1",
    text: "5 Tina ________ ",
    options: [
      "Her computer has crashed.",
      "She has too much work.",
      "The cup is broken.",
      "The phone is out of order."
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 59، تمرین 59.1."
  },
  {
    category: "vocabulary",
    lesson: 59,
    scope: "درس 59 — تمرین 59.1",
    text: "6 Ross ________ ",
    options: [
      "His hand is cut.",
      "Her computer has crashed.",
      "The cup is broken.",
      "The phone is out of order."
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 59، تمرین 59.1."
  },
  {
    category: "vocabulary",
    lesson: 59,
    scope: "درس 59 — تمرین 59.1",
    text: "7 Delia ________ ",
    options: [
      "The phone is out of order.",
      "Her computer has crashed.",
      "The cup is broken.",
      "The room is untidy."
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 59، تمرین 59.1."
  },
  {
    category: "vocabulary",
    lesson: 59,
    scope: "درس 59 — تمرین 59.1",
    text: "8 Kim ________ ",
    options: [
      "The cup is broken.",
      "Her computer has crashed.",
      "She is late for work.",
      "The phone is out of order."
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 59، تمرین 59.1."
  },
  {
    category: "vocabulary",
    lesson: 59,
    scope: "درس 59 — تمرین 59.2",
    text: "2 cut ________ ",
    options: [
      "cut finger",
      "untidy room",
      "late for school / an appointment / a concert",
      "a camera"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 59، تمرین 59.2."
  },
  {
    category: "vocabulary",
    lesson: 59,
    scope: "درس 59 — تمرین 59.2",
    text: "3 untidy ________ ",
    options: [
      "a camera",
      "cut finger",
      "late for school / an appointment / a concert",
      "untidy room"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 59، تمرین 59.2."
  },
  {
    category: "vocabulary",
    lesson: 59,
    scope: "درس 59 — تمرین 59.2",
    text: "4 late for ________ ",
    options: [
      "untidy room",
      "cut finger",
      "late for school / an appointment / a concert",
      "a camera"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 59، تمرین 59.2."
  },
  {
    category: "vocabulary",
    lesson: 59,
    scope: "درس 59 — تمرین 59.2",
    text: "5 a ________ that isn't working",
    options: [
      "cut finger",
      "a camera",
      "untidy room",
      "late for school / an appointment / a concert"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 59، تمرین 59.2."
  },
  {
    category: "vocabulary",
    lesson: 59,
    scope: "درس 59 — تمرین 59.2",
    text: "6 too much ________ ",
    options: [
      "too much work",
      "cut finger",
      "untidy room",
      "late for school / an appointment / a concert"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 59، تمرین 59.2."
  },
  {
    category: "vocabulary",
    lesson: 60,
    scope: "درس 60 — تمرین 60.1",
    text: "2 ________ ",
    options: [
      "earthquake",
      "flood",
      "war",
      "car crash"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 60، تمرین 60.1."
  },
  {
    category: "vocabulary",
    lesson: 60,
    scope: "درس 60 — تمرین 60.1",
    text: "3 ________ ",
    options: [
      "war",
      "car crash",
      "flood",
      "earthquake"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 60، تمرین 60.1."
  },
  {
    category: "vocabulary",
    lesson: 60,
    scope: "درس 60 — تمرین 60.1",
    text: "4 ________ ",
    options: [
      "car crash",
      "war",
      "flood",
      "earthquake"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 60، تمرین 60.1."
  },
  {
    category: "vocabulary",
    lesson: 60,
    scope: "درس 60 — تمرین 60.1",
    text: "5 ________ ",
    options: [
      "earthquake",
      "car crash",
      "flood",
      "war"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 60، تمرین 60.1."
  },
  {
    category: "vocabulary",
    lesson: 60,
    scope: "درس 60 — تمرین 60.1",
    text: "6 ________ ",
    options: [
      "war",
      "car crash",
      "flood",
      "forest fire"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 60، تمرین 60.1."
  },
  {
    category: "vocabulary",
    lesson: 60,
    scope: "درس 60 — تمرین 60.1",
    text: "7 ________ ",
    options: [
      "flood",
      "car crash",
      "hurricane",
      "war"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 60، تمرین 60.1."
  },
  {
    category: "vocabulary",
    lesson: 60,
    scope: "درس 60 — تمرین 60.1",
    text: "8 ________ ",
    options: [
      "car crash",
      "traffic jam",
      "flood",
      "war"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 60، تمرین 60.1."
  },
  {
    category: "vocabulary",
    lesson: 60,
    scope: "درس 60 — تمرین 60.1",
    text: "9 ________ ",
    options: [
      "snowstorm",
      "car crash",
      "flood",
      "war"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 60، تمرین 60.1."
  },
  {
    category: "vocabulary",
    lesson: 60,
    scope: "درس 60 — تمرین 60.5",
    text: "2 Their wages were very low so the workers went on ________ .",
    options: [
      "earthquakes; snowstorms",
      "War",
      "car crash",
      "strike"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 60، تمرین 60.5."
  },
  {
    category: "vocabulary",
    lesson: 60,
    scope: "درس 60 — تمرین 60.5",
    text: "3 My great-grandfather died in the First World ________ .",
    options: [
      "car crash",
      "strike",
      "War",
      "earthquakes; snowstorms"
    ],
    answer: 2,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 60، تمرین 60.5."
  },
  {
    category: "vocabulary",
    lesson: 60,
    scope: "درس 60 — تمرین 60.5",
    text: "4 Jack had a ________ last year but fortunately no-one was hurt.",
    options: [
      "strike",
      "car crash",
      "War",
      "earthquakes; snowstorms"
    ],
    answer: 1,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 60، تمرین 60.5."
  },
  {
    category: "vocabulary",
    lesson: 60,
    scope: "درس 60 — تمرین 60.5",
    text: "5 Japan often has ________ and Siberia often has ________ .",
    options: [
      "earthquakes; snowstorms",
      "strike",
      "War",
      "car crash"
    ],
    answer: 0,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 60، تمرین 60.5."
  },
  {
    category: "vocabulary",
    lesson: 60,
    scope: "درس 60 — تمرین 60.5",
    text: "6 When people are ________ , they sometimes have to sleep on the streets.",
    options: [
      "car crash",
      "strike",
      "War",
      "homeless"
    ],
    answer: 3,
    level: "آموزشی",
    explanation: "پاسخ عین Answer key کتاب — واحد 60، تمرین 60.5."
  }
];
