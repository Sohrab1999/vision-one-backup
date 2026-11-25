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
    lesson: 7,
    scope: "درس 7 — تمرین 7.2",
    text: "1 Above the trees at the edge of the meadow, a buzzard hangs for a moment on the wind before soaring towards the hills.",
    options: [
      "A vole must be a kind of small animal, something like a mouse perhaps.",
      "Buzzards must be some kind of big bird, a sort that eats small animals.",
      "A chisel is something you use for shaping marble. It's a kind of tool used by sculptors.",
      "To ladle is a way of serving soup by using something like a very large spoon."
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 7، تمرین 7.2."
  },
  {
    category: "vocabulary",
    lesson: 7,
    scope: "درس 7 — تمرین 7.2",
    text: "2 According to some sources, the water vole is one of the most rapidly declining creatures in Britain and a new survey is now being carried out to determine how serious the threat of extinction really is.",
    options: [
      "A vole must be a kind of small animal, something like a mouse perhaps.",
      "Buzzards must be some kind of big bird, a sort that eats small animals.",
      "A chisel is something you use for shaping marble. It's a kind of tool used by sculptors.",
      "To ladle is a way of serving soup by using something like a very large spoon."
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 7، تمرین 7.2."
  },
  {
    category: "vocabulary",
    lesson: 7,
    scope: "درس 7 — تمرین 7.2",
    text: "3 Using a large chisel the police broke through the front door and surprised the robbers.",
    options: [
      "To ladle is a way of serving soup by using something like a very large spoon.",
      "Buzzards must be some kind of big bird, a sort that eats small animals.",
      "A vole must be a kind of small animal, something like a mouse perhaps.",
      "A chisel is something you use for shaping marble. It's a kind of tool used by sculptors."
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 7، تمرین 7.2."
  },
  {
    category: "vocabulary",
    lesson: 7,
    scope: "درس 7 — تمرین 7.2",
    text: "5 When the soup is ready, ladle it into six warmed bowls.",
    options: [
      "Buzzards must be some kind of big bird, a sort that eats small animals.",
      "To ladle is a way of serving soup by using something like a very large spoon.",
      "A vole must be a kind of small animal, something like a mouse perhaps.",
      "A chisel is something you use for shaping marble. It's a kind of tool used by sculptors."
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 7، تمرین 7.2."
  },
  {
    category: "vocabulary",
    lesson: 7,
    scope: "درس 7 — تمرین 7.2",
    text: "6 We often used to walk up to the cliff top where we would clamber over the farmer's gate and go right to the edge where the view was better.",
    options: [
      "To clamber means something like climbing with difficulty.",
      "Buzzards must be some kind of big bird, a sort that eats small animals.",
      "A vole must be a kind of small animal, something like a mouse perhaps.",
      "A chisel is something you use for shaping marble. It's a kind of tool used by sculptors."
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 7، تمرین 7.2."
  },
  {
    category: "vocabulary",
    lesson: 7,
    scope: "درس 7 — تمرین 7.2",
    text: "7 Some people get really ratty when they haven't had enough sleep.",
    options: [
      "A chisel is something you use for shaping marble. It's a kind of tool used by sculptors.",
      "Buzzards must be some kind of big bird, a sort that eats small animals.",
      "A vole must be a kind of small animal, something like a mouse perhaps.",
      "Ratty must be a bit like bad-tempered."
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 7، تمرین 7.2."
  },
  {
    category: "vocabulary",
    lesson: 7,
    scope: "درس 7 — تمرین 7.3",
    text: "1 It says on the can that this drink is sugar-free.",
    options: [
      "More and more shops now have their own special credit cards that can only be used in one specific chain of shops and offer you a discount if you use one of them.",
      "It says on the can that this drink contains no sugar.",
      "I find Mo a very kind person.",
      "I've been terribly busy with work ever since I got back from holiday."
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 7، تمرین 7.3."
  },
  {
    category: "vocabulary",
    lesson: 7,
    scope: "درس 7 — تمرین 7.3",
    text: "2 More and more shops now have their own special store cards and offer you a discount if you use one of them.",
    options: [
      "More and more shops now have their own special credit cards that can only be used in one specific chain of shops and offer you a discount if you use one of them.",
      "It says on the can that this drink contains no sugar.",
      "I find Mo a very kind person.",
      "I've been terribly busy with work ever since I got back from holiday."
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 7، تمرین 7.3."
  },
  {
    category: "vocabulary",
    lesson: 7,
    scope: "درس 7 — تمرین 7.3",
    text: "3 I find Mo a very warm-hearted person.",
    options: [
      "I've been terribly busy with work ever since I got back from holiday.",
      "It says on the can that this drink contains no sugar.",
      "More and more shops now have their own special credit cards that can only be used in one specific chain of shops and offer you a discount if you use one of them.",
      "I find Mo a very kind person."
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 7، تمرین 7.3."
  },
  {
    category: "vocabulary",
    lesson: 7,
    scope: "درس 7 — تمرین 7.3",
    text: "4 I've been up to my eyes in work ever since I got back from holiday.",
    options: [
      "More and more shops now have their own special credit cards that can only be used in one specific chain of shops and offer you a discount if you use one of them.",
      "It says on the can that this drink contains no sugar.",
      "I've been terribly busy with work ever since I got back from holiday.",
      "I find Mo a very kind person."
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 7، تمرین 7.3."
  },
  {
    category: "vocabulary",
    lesson: 7,
    scope: "درس 7 — تمرین 7.3",
    text: "5 We walked down a tree-lined street towards the station.",
    options: [
      "It says on the can that this drink contains no sugar.",
      "We walked down a street with trees along both sides of it towards the station.",
      "More and more shops now have their own special credit cards that can only be used in one specific chain of shops and offer you a discount if you use one of them.",
      "I find Mo a very kind person."
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 7، تمرین 7.3."
  },
  {
    category: "vocabulary",
    lesson: 7,
    scope: "درس 7 — تمرین 7.3",
    text: "6 The little boys were fascinated by the cement-mixer.",
    options: [
      "The little boys were fascinated by the machine used for mixing cement.",
      "It says on the can that this drink contains no sugar.",
      "More and more shops now have their own special credit cards that can only be used in one specific chain of shops and offer you a discount if you use one of them.",
      "I find Mo a very kind person."
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 7، تمرین 7.3."
  },
  {
    category: "vocabulary",
    lesson: 7,
    scope: "درس 7 — تمرین 7.4",
    text: "1 to re-direct an envelope",
    options: [
      "anger that can't be controlled",
      "to change the address on an envelope so that it is sent somewhere else",
      "drinks before dinner",
      "a report that comes out either twice every month or every two months (both meanings of bi-monthly exist)"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 7، تمرین 7.4."
  },
  {
    category: "vocabulary",
    lesson: 7,
    scope: "درس 7 — تمرین 7.4",
    text: "2 uncontrollable anger",
    options: [
      "anger that can't be controlled",
      "to change the address on an envelope so that it is sent somewhere else",
      "drinks before dinner",
      "a report that comes out either twice every month or every two months (both meanings of bi-monthly exist)"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 7، تمرین 7.4."
  },
  {
    category: "vocabulary",
    lesson: 7,
    scope: "درس 7 — تمرین 7.4",
    text: "3 pre-dinner drinks",
    options: [
      "a report that comes out either twice every month or every two months (both meanings of bi-monthly exist)",
      "to change the address on an envelope so that it is sent somewhere else",
      "anger that can't be controlled",
      "drinks before dinner"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 7، تمرین 7.4."
  },
  {
    category: "vocabulary",
    lesson: 7,
    scope: "درس 7 — تمرین 7.4",
    text: "4 bi-monthly report",
    options: [
      "anger that can't be controlled",
      "to change the address on an envelope so that it is sent somewhere else",
      "a report that comes out either twice every month or every two months (both meanings of bi-monthly exist)",
      "drinks before dinner"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 7، تمرین 7.4."
  },
  {
    category: "vocabulary",
    lesson: 7,
    scope: "درس 7 — تمرین 7.4",
    text: "5 my ex-boss",
    options: [
      "to change the address on an envelope so that it is sent somewhere else",
      "the person who used to be my boss (and no longer is)",
      "anger that can't be controlled",
      "drinks before dinner"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 7، تمرین 7.4."
  },
  {
    category: "vocabulary",
    lesson: 7,
    scope: "درس 7 — تمرین 7.4",
    text: "6 anti-tourist feelings",
    options: [
      "feelings that are hostile to tourists",
      "to change the address on an envelope so that it is sent somewhere else",
      "anger that can't be controlled",
      "drinks before dinner"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 7، تمرین 7.4."
  },
  {
    category: "vocabulary",
    lesson: 15,
    scope: "درس 15 — تمرین 15.5",
    text: "1 military ________ ",
    options: [
      "kindergarten",
      "military coup",
      "casino",
      "vendetta"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 15، تمرین 15.5."
  },
  {
    category: "vocabulary",
    lesson: 15,
    scope: "درس 15 — تمرین 15.5",
    text: "2 strawberry ________ ",
    options: [
      "strawberry yoghurt",
      "kindergarten",
      "casino",
      "vendetta"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 15، تمرین 15.5."
  },
  {
    category: "vocabulary",
    lesson: 15,
    scope: "درس 15 — تمرین 15.5",
    text: "3 pop ________ ",
    options: [
      "vendetta",
      "kindergarten",
      "casino",
      "psychology"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 15، تمرین 15.5."
  },
  {
    category: "vocabulary",
    lesson: 15,
    scope: "درس 15 — تمرین 15.5",
    text: "4 Chinese ________ ",
    options: [
      "casino",
      "kindergarten",
      "Chinese cuisine",
      "vendetta"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 15، تمرین 15.5."
  },
  {
    category: "vocabulary",
    lesson: 15,
    scope: "درس 15 — تمرین 15.5",
    text: "5 ankle ________ ",
    options: [
      "kindergarten",
      "ankle tattoo",
      "casino",
      "vendetta"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 15، تمرین 15.5."
  },
  {
    category: "vocabulary",
    lesson: 15,
    scope: "درس 15 — تمرین 15.5",
    text: "6 total ________ ",
    options: [
      "total embargo",
      "kindergarten",
      "casino",
      "vendetta"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 15، تمرین 15.5."
  },
  {
    category: "vocabulary",
    lesson: 15,
    scope: "درس 15 — تمرین 15.5",
    text: "7 long-standing ________ ",
    options: [
      "embargo",
      "kindergarten",
      "casino",
      "vendetta"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 15، تمرین 15.5."
  },
  {
    category: "vocabulary",
    lesson: 15,
    scope: "درس 15 — تمرین 15.5",
    text: "8 noisy ________ ",
    options: [
      "vendetta",
      "casino",
      "kindergarten",
      "embargo"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 15، تمرین 15.5."
  },
  {
    category: "vocabulary",
    lesson: 15,
    scope: "درس 15 — تمرین 15.5",
    text: "9 double ________ ",
    options: [
      "kindergarten",
      "double duvet",
      "casino",
      "vendetta"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 15، تمرین 15.5."
  },
  {
    category: "vocabulary",
    lesson: 15,
    scope: "درس 15 — تمرین 15.5",
    text: "10 all-night ________ ",
    options: [
      "all-night casino",
      "kindergarten",
      "casino",
      "vendetta"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 15، تمرین 15.5."
  },
  {
    category: "vocabulary",
    lesson: 15,
    scope: "درس 15 — تمرین 15.6",
    text: "1 karate ________ ",
    options: [
      "paddle a kayak",
      "karate",
      "kayak",
      "futon"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 15، تمرین 15.6."
  },
  {
    category: "vocabulary",
    lesson: 15,
    scope: "درس 15 — تمرین 15.6",
    text: "2 kayak ________ ",
    options: [
      "place an embargo",
      "practise karate",
      "paddle a kayak",
      "sit on / sleep on a futon"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 15، تمرین 15.6."
  },
  {
    category: "vocabulary",
    lesson: 15,
    scope: "درس 15 — تمرین 15.6",
    text: "3 futon ________ ",
    options: [
      "kayak",
      "karate",
      "place an embargo",
      "futon"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 15، تمرین 15.6."
  },
  {
    category: "vocabulary",
    lesson: 15,
    scope: "درس 15 — تمرین 15.6",
    text: "4 embargo ________ ",
    options: [
      "karate",
      "be a guerrilla",
      "kayak",
      "futon"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 15، تمرین 15.6."
  },
  {
    category: "vocabulary",
    lesson: 15,
    scope: "درس 15 — تمرین 15.6",
    text: "5 guerrilla ________ ",
    options: [
      "live in a cul de sac",
      "practise karate",
      "paddle a kayak",
      "sit on / sleep on a futon"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 15، تمرین 15.6."
  },
  {
    category: "vocabulary",
    lesson: 15,
    scope: "درس 15 — تمرین 15.6",
    text: "6 cul de sac ________ ",
    options: [
      "futon",
      "karate",
      "kayak",
      "attempt a coup"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 15، تمرین 15.6."
  },
  {
    category: "vocabulary",
    lesson: 15,
    scope: "درس 15 — تمرین 15.6",
    text: "7 coup ________ ",
    options: [
      "kayak",
      "karate",
      "throw confetti",
      "futon"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 15، تمرین 15.6."
  },
  {
    category: "vocabulary",
    lesson: 15,
    scope: "درس 15 — تمرین 15.6",
    text: "8 confetti ________ ",
    options: [
      "karate",
      "have a siesta",
      "kayak",
      "futon"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 15، تمرین 15.6."
  },
  {
    category: "vocabulary",
    lesson: 15,
    scope: "درس 15 — تمرین 15.6",
    text: "9 siesta ________ ",
    options: [
      "go on / take a cruise",
      "practise karate",
      "paddle a kayak",
      "sit on / sleep on a futon"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 15، تمرین 15.6."
  },
  {
    category: "vocabulary",
    lesson: 15,
    scope: "درس 15 — تمرین 15.6",
    text: "10 cruise ________ ",
    options: [
      "futon",
      "karate",
      "kayak",
      "take"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 15، تمرین 15.6."
  },
  {
    category: "vocabulary",
    lesson: 15,
    scope: "درس 15 — تمرین 15.6",
    text: "11 sauna ________ ",
    options: [
      "kayak",
      "karate",
      "attend",
      "futon"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 15، تمرین 15.6."
  },
  {
    category: "vocabulary",
    lesson: 18,
    scope: "درس 18 — تمرین 18.1",
    text: "He should have whistled as he fastened his sword to his belt.",
    options: [
      "He should have whistled as he fastened his sword to his belt. (Note that the 'h' in 'have' is not really pronounced when following an auxiliary verb as in this sentence and the next one.)",
      "The psychiatrist was knifed in the knee as he was walking home.",
      "You could have left me half the Christmas cake on Wednesday."
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 18، تمرین 18.1."
  },
  {
    category: "vocabulary",
    lesson: 18,
    scope: "درس 18 — تمرین 18.3",
    text: "enough",
    options: [
      "now",
      "stuff",
      "threw",
      "off"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 18، تمرین 18.3."
  },
  {
    category: "vocabulary",
    lesson: 18,
    scope: "درس 18 — تمرین 18.3",
    text: "plough",
    options: [
      "now",
      "stuff",
      "threw",
      "off"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 18، تمرین 18.3."
  },
  {
    category: "vocabulary",
    lesson: 18,
    scope: "درس 18 — تمرین 18.3",
    text: "through",
    options: [
      "off",
      "stuff",
      "now",
      "threw"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 18، تمرین 18.3."
  },
  {
    category: "vocabulary",
    lesson: 18,
    scope: "درس 18 — تمرین 18.3",
    text: "cough",
    options: [
      "now",
      "stuff",
      "off",
      "threw"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 18، تمرین 18.3."
  },
  {
    category: "vocabulary",
    lesson: 18,
    scope: "درس 18 — تمرین 18.3",
    text: "though",
    options: [
      "stuff",
      "go",
      "now",
      "threw"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 18، تمرین 18.3."
  },
  {
    category: "vocabulary",
    lesson: 18,
    scope: "درس 18 — تمرین 18.4",
    text: "They paid a £1 million transfer fee for transferring the player to their team.",
    options: [
      "conflicting; conflict",
      "suspected; suspect",
      "transfer; transferring",
      "upset; upset"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 18، تمرین 18.4."
  },
  {
    category: "vocabulary",
    lesson: 18,
    scope: "درس 18 — تمرین 18.4",
    text: "Although they suspected several people were partly involved, the police decided to concentrate on Jo as the main suspect.",
    options: [
      "transfer; transferring",
      "suspected; suspect",
      "conflicting; conflict",
      "upset; upset"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 18، تمرین 18.4."
  },
  {
    category: "vocabulary",
    lesson: 18,
    scope: "درس 18 — تمرین 18.4",
    text: "There are conflicting views as to the cause of the conflict.",
    options: [
      "conflicting; conflict",
      "transfer; transferring",
      "suspected; suspect",
      "upset; upset"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 18، تمرین 18.4."
  },
  {
    category: "vocabulary",
    lesson: 18,
    scope: "درس 18 — تمرین 18.4",
    text: "All this upset over the wedding has really upset them.",
    options: [
      "conflicting; conflict",
      "transfer; transferring",
      "suspected; suspect",
      "upset; upset"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 18، تمرین 18.4."
  },
  {
    category: "vocabulary",
    lesson: 18,
    scope: "درس 18 — تمرین 18.4",
    text: "The cost of living has increased while there has been a decrease in wages.",
    options: [
      "suspected; suspect",
      "transfer; transferring",
      "increased; decrease",
      "conflicting; conflict"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 18، تمرین 18.4."
  },
  {
    category: "vocabulary",
    lesson: 18,
    scope: "درس 18 — تمرین 18.4",
    text: "A work permit permits you to work for a period of six months.",
    options: [
      "transfer; transferring",
      "permit; permits",
      "suspected; suspect",
      "conflicting; conflict"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 18، تمرین 18.4."
  },
  {
    category: "vocabulary",
    lesson: 18,
    scope: "درس 18 — تمرین 18.4",
    text: "I wish I could record a hit record!",
    options: [
      "record; record",
      "transfer; transferring",
      "suspected; suspect",
      "conflicting; conflict"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 18، تمرین 18.4."
  },
  {
    category: "vocabulary",
    lesson: 18,
    scope: "درس 18 — تمرین 18.4",
    text: "Despite the disgraceful conduct of the audience, James went on conducting the orchestra.",
    options: [
      "conflicting; conflict",
      "transfer; transferring",
      "suspected; suspect",
      "conduct; conducting"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 18، تمرین 18.4."
  },
  {
    category: "vocabulary",
    lesson: 18,
    scope: "درس 18 — تمرین 18.5",
    text: "/'mʌsəl/",
    options: [
      "handkerchief",
      "catastrophe",
      "muscle",
      "chemical"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 18، تمرین 18.5."
  },
  {
    category: "vocabulary",
    lesson: 18,
    scope: "درس 18 — تمرین 18.5",
    text: "/kə'tæstrəfi/",
    options: [
      "muscle",
      "catastrophe",
      "handkerchief",
      "chemical"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 18، تمرین 18.5."
  },
  {
    category: "vocabulary",
    lesson: 18,
    scope: "درس 18 — تمرین 18.5",
    text: "/'hæŋkətʃi:f/",
    options: [
      "handkerchief",
      "muscle",
      "catastrophe",
      "chemical"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 18، تمرین 18.5."
  },
  {
    category: "vocabulary",
    lesson: 18,
    scope: "درس 18 — تمرین 18.5",
    text: "/'kemikəl/",
    options: [
      "handkerchief",
      "muscle",
      "catastrophe",
      "chemical"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 18، تمرین 18.5."
  },
  {
    category: "vocabulary",
    lesson: 18,
    scope: "درس 18 — تمرین 18.5",
    text: "/'sʌtəl/",
    options: [
      "catastrophe",
      "muscle",
      "subtle",
      "handkerchief"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 18، تمرین 18.5."
  },
  {
    category: "vocabulary",
    lesson: 18,
    scope: "درس 18 — تمرین 18.5",
    text: "/rə'si:t/",
    options: [
      "muscle",
      "receipt",
      "catastrophe",
      "handkerchief"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 18، تمرین 18.5."
  },
  {
    category: "vocabulary",
    lesson: 18,
    scope: "درس 18 — تمرین 18.5",
    text: "/hait/",
    options: [
      "height",
      "muscle",
      "catastrophe",
      "handkerchief"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 18، تمرین 18.5."
  },
  {
    category: "vocabulary",
    lesson: 18,
    scope: "درس 18 — تمرین 18.5",
    text: "/'resipi:/",
    options: [
      "handkerchief",
      "muscle",
      "catastrophe",
      "recipe"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 18، تمرین 18.5."
  },
  {
    category: "vocabulary",
    lesson: 18,
    scope: "درس 18 — تمرین 18.6",
    text: "telephone telephonist",
    options: [
      "about",
      "telephone, telephonist",
      "wander",
      "last"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 18، تمرین 18.6."
  },
  {
    category: "vocabulary",
    lesson: 20,
    scope: "درس 20 — تمرین 20.3",
    text: "/peɪl/",
    options: [
      "They're going to take their aunt to have dinner there this evening.",
      "It's the first time the car has left its garage this year.",
      "Let's practise with these grammar exercises first and then do some vocabulary practice.",
      "It's great to see such a lovely fire burning in the grate."
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 20، تمرین 20.3."
  },
  {
    category: "vocabulary",
    lesson: 20,
    scope: "درس 20 — تمرین 20.3",
    text: "/beə/",
    options: [
      "It's great to see such a lovely fire burning in the grate.",
      "They're going to take their aunt to have dinner there this evening.",
      "Let's practise with these grammar exercises first and then do some vocabulary practice.",
      "It's the first time the car has left its garage this year."
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 20، تمرین 20.3."
  },
  {
    category: "vocabulary",
    lesson: 20,
    scope: "درس 20 — تمرین 20.3",
    text: "/ɪts/",
    options: [
      "It's the first time the car has left its garage this year.",
      "They're going to take their aunt to have dinner there this evening.",
      "Let's practise with these grammar exercises first and then do some vocabulary practice.",
      "It's great to see such a lovely fire burning in the grate."
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 20، تمرین 20.3."
  },
  {
    category: "vocabulary",
    lesson: 20,
    scope: "درس 20 — تمرین 20.3",
    text: "/ˈpræktɪs/",
    options: [
      "They're going to take their aunt to have dinner there this evening.",
      "It's great to see such a lovely fire burning in the grate.",
      "It's the first time the car has left its garage this year.",
      "Let's practise with these grammar exercises first and then do some vocabulary practice."
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 20، تمرین 20.3."
  },
  {
    category: "vocabulary",
    lesson: 20,
    scope: "درس 20 — تمرین 20.3",
    text: "/greɪt/",
    options: [
      "Don't whine so much, just because the wine's finished.",
      "They're going to take their aunt to have dinner there this evening.",
      "It's the first time the car has left its garage this year.",
      "Let's practise with these grammar exercises first and then do some vocabulary practice."
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 20، تمرین 20.3."
  },
  {
    category: "vocabulary",
    lesson: 20,
    scope: "درس 20 — تمرین 20.3",
    text: "/waɪnd/",
    options: [
      "Let's practise with these grammar exercises first and then do some vocabulary practice.",
      "They're going to take their aunt to have dinner there this evening.",
      "It's the first time the car has left its garage this year.",
      "Brake now or you'll break that toy in the road."
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 20، تمرین 20.3."
  },
  {
    category: "vocabulary",
    lesson: 20,
    scope: "درس 20 — تمرین 20.3",
    text: "/breɪk/",
    options: [
      "It's the first time the car has left its garage this year.",
      "They're going to take their aunt to have dinner there this evening.",
      "The archaeological site was a marvellous sight at sunset.",
      "Let's practise with these grammar exercises first and then do some vocabulary practice."
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 20، تمرین 20.3."
  },
  {
    category: "vocabulary",
    lesson: 20,
    scope: "درس 20 — تمرین 20.3",
    text: "/saɪt/",
    options: [
      "They're going to take their aunt to have dinner there this evening.",
      "Let us pray that we may never be prey to evil thoughts.",
      "It's the first time the car has left its garage this year.",
      "Let's practise with these grammar exercises first and then do some vocabulary practice."
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 20، تمرین 20.3."
  },
  {
    category: "vocabulary",
    lesson: 20,
    scope: "درس 20 — تمرین 20.3",
    text: "/preɪ/",
    options: [
      "Although she was a little hoarse it did not put her off horse riding in the snow.",
      "They're going to take their aunt to have dinner there this evening.",
      "It's the first time the car has left its garage this year.",
      "Let's practise with these grammar exercises first and then do some vocabulary practice."
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 20، تمرین 20.3."
  },
  {
    category: "vocabulary",
    lesson: 20,
    scope: "درس 20 — تمرین 20.3",
    text: "/hɔːs/",
    options: [
      "Let's practise with these grammar exercises first and then do some vocabulary practice.",
      "They're going to take their aunt to have dinner there this evening.",
      "It's the first time the car has left its garage this year.",
      "The beautiful sight of the moon's rays reflected in the lake did a great deal to raise her spirits."
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 20، تمرین 20.3."
  },
  {
    category: "vocabulary",
    lesson: 20,
    scope: "درس 20 — تمرین 20.5",
    text: "1a / 1b",
    options: [
      "tea and tee",
      "pair and pear",
      "waste and waist",
      "toe and tow"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 20، تمرین 20.5."
  },
  {
    category: "vocabulary",
    lesson: 20,
    scope: "درس 20 — تمرین 20.5",
    text: "2a / 2b",
    options: [
      "toe and tow",
      "tea and tee",
      "waste and waist",
      "pair and pear"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 20، تمرین 20.5."
  },
  {
    category: "vocabulary",
    lesson: 20,
    scope: "درس 20 — تمرین 20.5",
    text: "3a / 3b",
    options: [
      "pair and pear",
      "tea and tee",
      "waste and waist",
      "toe and tow"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 20، تمرین 20.5."
  },
  {
    category: "vocabulary",
    lesson: 20,
    scope: "درس 20 — تمرین 20.5",
    text: "4a / 4b",
    options: [
      "tea and tee",
      "toe and tow",
      "pair and pear",
      "waste and waist"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 20، تمرین 20.5."
  },
  {
    category: "vocabulary",
    lesson: 21,
    scope: "درس 21 — تمرین 21.1",
    text: "Her next trip after Glasgow is on 24th. ________ she can have a quiet time at home.",
    options: [
      "While",
      "By the time / When",
      "Till then",
      "Previously"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 21، تمرین 21.1."
  },
  {
    category: "vocabulary",
    lesson: 21,
    scope: "درس 21 — تمرین 21.1",
    text: "She was in Paris for over a week. ________ she got home there was a big pile of mail waiting for her.",
    options: [
      "Till then",
      "By the time / When",
      "While",
      "Previously"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 21، تمرین 21.1."
  },
  {
    category: "vocabulary",
    lesson: 21,
    scope: "درس 21 — تمرین 21.1",
    text: " ________ she was at Nick's place on the 16th, she met Maura.",
    options: [
      "While",
      "Till then",
      "By the time / When",
      "Previously"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 21، تمرین 21.1."
  },
  {
    category: "vocabulary",
    lesson: 21,
    scope: "درس 21 — تمرین 21.1",
    text: "She went to the theatre in Paris on Monday. ________ , she had been to the Pompidou Centre.",
    options: [
      "While",
      "Till then",
      "By the time / When",
      "Previously"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 21، تمرین 21.1."
  },
  {
    category: "vocabulary",
    lesson: 21,
    scope: "درس 21 — تمرین 21.1",
    text: " ________ she had said goodbye to Nick, she left.",
    options: [
      "By the time / When",
      "Till then",
      "As soon as",
      "While"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 21، تمرین 21.1."
  },
  {
    category: "vocabulary",
    lesson: 21,
    scope: "درس 21 — تمرین 21.1",
    text: " ________ she answered all her letters, she felt she could watch TV for a while.",
    options: [
      "Till then",
      "When",
      "By the time / When",
      "While"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 21، تمرین 21.1."
  },
  {
    category: "vocabulary",
    lesson: 21,
    scope: "درس 21 — تمرین 21.1",
    text: " ________ she put the phone down it rang again. This time it was Dougy.",
    options: [
      "The moment",
      "Till then",
      "By the time / When",
      "While"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 21، تمرین 21.1."
  },
  {
    category: "vocabulary",
    lesson: 21,
    scope: "درس 21 — تمرین 21.3",
    text: "After I've eaten too much, ...",
    options: [
      "... lived in the same house.",
      "... switch on the radio.",
      "... I usually feel guilty and go on a diet for a while.",
      "... reading a story."
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 21، تمرین 21.3."
  },
  {
    category: "vocabulary",
    lesson: 21,
    scope: "درس 21 — تمرین 21.3",
    text: "The moment I wake up, I ...",
    options: [
      "... I usually feel guilty and go on a diet for a while.",
      "... switch on the radio.",
      "... lived in the same house.",
      "... reading a story."
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 21، تمرین 21.3."
  },
  {
    category: "vocabulary",
    lesson: 21,
    scope: "درس 21 — تمرین 21.3",
    text: "Throughout my childhood I ...",
    options: [
      "... lived in the same house.",
      "... I usually feel guilty and go on a diet for a while.",
      "... switch on the radio.",
      "... reading a story."
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 21، تمرین 21.3."
  },
  {
    category: "vocabulary",
    lesson: 21,
    scope: "درس 21 — تمرین 21.3",
    text: "I'm doing vocabulary right now. Earlier on, I was ...",
    options: [
      "... lived in the same house.",
      "... I usually feel guilty and go on a diet for a while.",
      "... switch on the radio.",
      "... reading a story."
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 21، تمرین 21.3."
  },
  {
    category: "vocabulary",
    lesson: 21,
    scope: "درس 21 — تمرین 21.3",
    text: "Once I've finished my language course, I'll ...",
    options: [
      "... switch on the radio.",
      "... I usually feel guilty and go on a diet for a while.",
      "... go back home and look for a job.",
      "... lived in the same house."
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 21، تمرین 21.3."
  },
  {
    category: "vocabulary",
    lesson: 21,
    scope: "درس 21 — تمرین 21.3",
    text: "Before I go on holiday, I always ...",
    options: [
      "... I usually feel guilty and go on a diet for a while.",
      "... double-check that everything is booked.",
      "... switch on the radio.",
      "... lived in the same house."
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 21، تمرین 21.3."
  },
  {
    category: "vocabulary",
    lesson: 21,
    scope: "درس 21 — تمرین 21.3",
    text: "Following an argument with someone, I always feel ...",
    options: [
      "... upset and want to make it up as soon as possible.",
      "... I usually feel guilty and go on a diet for a while.",
      "... switch on the radio.",
      "... lived in the same house."
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 21، تمرین 21.3."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.2",
    text: "Physical labour can exhaust the body very quickly. Excessive study can rapidly reduce mental powers too. (equally)",
    options: [
      "She was my teacher and a good friend into the bargain.",
      "My cousin turned up, along with some schoolmates of his.",
      "As well as owning a big chemical factory, he runs a massive oil business in the USA. or He owns a big chemical factory as well as running a massive oil business in the USA.",
      "Physical labour can exhaust the body very quickly. Equally, excessive study can rapidly reduce mental powers."
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.2."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.2",
    text: "My cousin turned up and some schoolmates of his came with him. (along with)",
    options: [
      "As well as owning a big chemical factory, he runs a massive oil business in the USA. or He owns a big chemical factory as well as running a massive oil business in the USA.",
      "Physical labour can exhaust the body very quickly. Equally, excessive study can rapidly reduce mental powers.",
      "My cousin turned up, along with some schoolmates of his.",
      "She was my teacher and a good friend into the bargain."
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.2."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.2",
    text: "He owns a big chemical factory and he runs a massive oil business in the USA. (as well as)",
    options: [
      "Physical labour can exhaust the body very quickly. Equally, excessive study can rapidly reduce mental powers.",
      "As well as owning a big chemical factory, he runs a massive oil business in the USA. or He owns a big chemical factory as well as running a massive oil business in the USA.",
      "My cousin turned up, along with some schoolmates of his.",
      "She was my teacher and a good friend into the bargain."
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.2."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.2",
    text: "She was my teacher and she was a good friend. (into the bargain)",
    options: [
      "She was my teacher and a good friend into the bargain.",
      "Physical labour can exhaust the body very quickly. Equally, excessive study can rapidly reduce mental powers.",
      "My cousin turned up, along with some schoolmates of his.",
      "As well as owning a big chemical factory, he runs a massive oil business in the USA. or He owns a big chemical factory as well as running a massive oil business in the USA."
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.2."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.2",
    text: "I'm their scientific adviser and act as a consultant to the Managing Director. (in addition to)",
    options: [
      "As well as owning a big chemical factory, he runs a massive oil business in the USA. or He owns a big chemical factory as well as running a massive oil business in the USA.",
      "Physical labour can exhaust the body very quickly. Equally, excessive study can rapidly reduce mental powers.",
      "My cousin turned up, along with some schoolmates of his.",
      "In addition to being their scientific adviser, I also act as consultant to the Managing Director."
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.2."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.3",
    text: "I work part-time as well as I am a student, so I have a busy life.",
    options: [
      "My father won't agree. Likewise, my mother's sure to find something to object to.",
      "Besides having a good job, my ambition is to meet someone nice to share my life with.",
      "Alongside my many other responsibilities, I now have to be in charge of staff training.",
      "I work part time as well as being a student, so I have a busy life."
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.3."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.3",
    text: "Besides to have a good job, my ambition is to meet someone nice to share my life with.",
    options: [
      "Alongside my many other responsibilities, I now have to be in charge of staff training.",
      "I work part time as well as being a student, so I have a busy life.",
      "Besides having a good job, my ambition is to meet someone nice to share my life with.",
      "My father won't agree. Likewise, my mother's sure to find something to object to."
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.3."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.3",
    text: "Alongside I have many other responsibilities, I now have to be in charge of staff training.",
    options: [
      "I work part time as well as being a student, so I have a busy life.",
      "Alongside my many other responsibilities, I now have to be in charge of staff training.",
      "Besides having a good job, my ambition is to meet someone nice to share my life with.",
      "My father won't agree. Likewise, my mother's sure to find something to object to."
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.3."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.3",
    text: "Likewise my father won't agree, my mother's sure to find something to object to.",
    options: [
      "Alongside my many other responsibilities, I now have to be in charge of staff training.",
      "I work part time as well as being a student, so I have a busy life.",
      "Besides having a good job, my ambition is to meet someone nice to share my life with.",
      "My father won't agree. Likewise, my mother's sure to find something to object to."
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.3."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.3",
    text: "To boot she is a good footballer, she's a good athlete.",
    options: [
      "Besides having a good job, my ambition is to meet someone nice to share my life with.",
      "I work part time as well as being a student, so I have a busy life.",
      "She is a good footballer and she's a good athlete to boot.",
      "Alongside my many other responsibilities, I now have to be in charge of staff training."
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.3."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.4",
    text: "1",
    options: [
      "on top of (all) that",
      "into the bargain",
      "plus (+)",
      "to boot"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.4."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.4",
    text: "2",
    options: [
      "plus (+)",
      "to boot",
      "into the bargain",
      "on top of (all) that"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.4."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.4",
    text: "3",
    options: [
      "to boot",
      "plus (+)",
      "into the bargain",
      "on top of (all) that"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.4."
  },
  {
    category: "vocabulary",
    lesson: 25,
    scope: "درس 25 — تمرین 25.4",
    text: "4",
    options: [
      "on top of (all) that",
      "to boot",
      "into the bargain",
      "plus (+)"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 25، تمرین 25.4."
  },
  {
    category: "vocabulary",
    lesson: 27,
    scope: "درس 27 — تمرین 27.2",
    text: "1 A: Are you a football fan? B: I like it; I wouldn't say I was a fan.",
    options: [
      "A: It was last Monday. I was coming home from work. I saw this ragged old man approaching me. Anyway, I stopped him ... B: Jim Dibble! A: Hang on! Let me tell you what happened first.",
      "A: Are you a football fan? B: Well, I like it; I wouldn't say I was a fan."
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 27، تمرین 27.2."
  },
  {
    category: "vocabulary",
    lesson: 27,
    scope: "درس 27 — تمرین 27.2",
    text: "3 A: It was last Monday. I was coming home from work. I saw this ragged old man approaching me. I stopped him … B: Jim Dibble! A: Let me tell you what happened first.",
    options: [
      "A: Are you a football fan? B: Well, I like it; I wouldn't say I was a fan.",
      "A: It was last Monday. I was coming home from work. I saw this ragged old man approaching me. Anyway, I stopped him ... B: Jim Dibble! A: Hang on! Let me tell you what happened first."
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 27، تمرین 27.2."
  },
  {
    category: "vocabulary",
    lesson: 28,
    scope: "درس 28 — تمرین 28.2",
    text: "1 Leaving aside ...",
    options: [
      "this will not be discussed",
      "change the topic",
      "read something earlier in the text",
      "this document is about another one"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 28، تمرین 28.2."
  },
  {
    category: "vocabulary",
    lesson: 28,
    scope: "درس 28 — تمرین 28.2",
    text: "2 In parenthesis, ...",
    options: [
      "this will not be discussed",
      "change the topic",
      "read something earlier in the text",
      "as an aside / secondary issue"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 28، تمرین 28.2."
  },
  {
    category: "vocabulary",
    lesson: 28,
    scope: "درس 28 — تمرین 28.2",
    text: "3 Turning to ...",
    options: [
      "this will not be discussed",
      "read something earlier in the text",
      "change the topic",
      "this document is about another one"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 28، تمرین 28.2."
  },
  {
    category: "vocabulary",
    lesson: 28,
    scope: "درس 28 — تمرین 28.2",
    text: "4 In conclusion ...",
    options: [
      "change the topic",
      "to finish off",
      "read something earlier in the text",
      "this will not be discussed"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 28، تمرین 28.2."
  },
  {
    category: "vocabulary",
    lesson: 28,
    scope: "درس 28 — تمرین 28.2",
    text: "5 With reference to ...",
    options: [
      "this document is about another one",
      "change the topic",
      "read something earlier in the text",
      "this will not be discussed"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 28، تمرین 28.2."
  },
  {
    category: "vocabulary",
    lesson: 28,
    scope: "درس 28 — تمرین 28.2",
    text: "6 See above ...",
    options: [
      "this document is about another one",
      "change the topic",
      "this will not be discussed",
      "read something earlier in the text"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 28، تمرین 28.2."
  },
  {
    category: "vocabulary",
    lesson: 28,
    scope: "درس 28 — تمرین 28.3",
    text: "1 is based on the verb 'to say'?",
    options: [
      "say, meaning 'for example'",
      "the following (introducing a list)",
      "further (as in further details",
      "overleaf (meaning turn the page)"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 28، تمرین 28.3."
  },
  {
    category: "vocabulary",
    lesson: 28,
    scope: "درس 28 — تمرین 28.3",
    text: "2 is based on the verb 'to follow'?",
    options: [
      "overleaf (meaning turn the page)",
      "say, meaning 'for example'",
      "further (as in further details",
      "the following (introducing a list)"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 28، تمرین 28.3."
  },
  {
    category: "vocabulary",
    lesson: 28,
    scope: "درس 28 — تمرین 28.3",
    text: "3 is a form of the word 'far'?",
    options: [
      "the following (introducing a list)",
      "say, meaning 'for example'",
      "further (as in further details",
      "overleaf (meaning turn the page)"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 28، تمرین 28.3."
  },
  {
    category: "vocabulary",
    lesson: 28,
    scope: "درس 28 — تمرین 28.3",
    text: "4 contains something you find on trees?",
    options: [
      "say, meaning 'for example'",
      "overleaf (meaning turn the page)",
      "the following (introducing a list)",
      "further (as in further details"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 28، تمرین 28.3."
  },
  {
    category: "vocabulary",
    lesson: 31,
    scope: "درس 31 — تمرین 31.1",
    text: "1 a cloth",
    options: [
      "It is not likely that most people will have a wood. A wood is a rather big area of land covered with trees (a small forest).",
      "Yes, most people have a cloth somewhere in the kitchen to wipe the work surfaces and in case somebody spills something.",
      "Some people have a fish (or several fish) swimming around in a tank in their living room."
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 31، تمرین 31.1."
  },
  {
    category: "vocabulary",
    lesson: 31,
    scope: "درس 31 — تمرین 31.1",
    text: "2 a wood",
    options: [
      "Yes, most people have a cloth somewhere in the kitchen to wipe the work surfaces and in case somebody spills something.",
      "It is not likely that most people will have a wood. A wood is a rather big area of land covered with trees (a small forest).",
      "Some people have a fish (or several fish) swimming around in a tank in their living room."
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 31، تمرین 31.1."
  },
  {
    category: "vocabulary",
    lesson: 31,
    scope: "درس 31 — تمرین 31.1",
    text: "3 a fish",
    options: [
      "Yes, most people have a cloth somewhere in the kitchen to wipe the work surfaces and in case somebody spills something.",
      "Some people have a fish (or several fish) swimming around in a tank in their living room.",
      "It is not likely that most people will have a wood. A wood is a rather big area of land covered with trees (a small forest)."
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 31، تمرین 31.1."
  },
  {
    category: "vocabulary",
    lesson: 31,
    scope: "درس 31 — تمرین 31.3",
    text: "1 How did you get that puncture in your car tyre? (glass)",
    options: [
      "No, she's living in a home now.",
      "I drove over some glass. or There was glass in",
      "Perhaps he should get a trade, become a carpenter or something.",
      "Well, it had a lot of land with it."
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 31، تمرین 31.3."
  },
  {
    category: "vocabulary",
    lesson: 31,
    scope: "درس 31 — تمرین 31.3",
    text: "2 I was surprised to hear that old Mrs Jones doesn't live with her family any more. (home)",
    options: [
      "No, she's living in a home now.",
      "I drove over some glass. or There was glass in",
      "Perhaps he should get a trade, become a carpenter or something.",
      "Well, it had a lot of land with it."
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 31، تمرین 31.3."
  },
  {
    category: "vocabulary",
    lesson: 31,
    scope: "درس 31 — تمرین 31.3",
    text: "3 What do you think my son should do? He's just left school and he's not really academic. He needs a job. (trade)",
    options: [
      "Well, it had a lot of land with it.",
      "I drove over some glass. or There was glass in",
      "No, she's living in a home now.",
      "Perhaps he should get a trade, become a carpenter or something."
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 31، تمرین 31.3."
  },
  {
    category: "vocabulary",
    lesson: 31,
    scope: "درس 31 — تمرین 31.3",
    text: "4 Why did you choose this house in the end? (land)",
    options: [
      "No, she's living in a home now.",
      "I drove over some glass. or There was glass in",
      "Well, it had a lot of land with it.",
      "Perhaps he should get a trade, become a carpenter or something."
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 31، تمرین 31.3."
  },
  {
    category: "vocabulary",
    lesson: 31,
    scope: "درس 31 — تمرین 31.3",
    text: "5 Mum, what's the Mona Lisa? (work)",
    options: [
      "I drove over some glass. or There was glass in",
      "It's a very famous work of art, a painting.",
      "No, she's living in a home now.",
      "Perhaps he should get a trade, become a carpenter or something."
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 31، تمرین 31.3."
  },
  {
    category: "vocabulary",
    lesson: 31,
    scope: "درس 31 — تمرین 31.3",
    text: "6 How can I find out what the restrictions are on this car insurance? (policy)",
    options: [
      "Well, look at the policy; that should tell you everything you need to know.",
      "I drove over some glass. or There was glass in",
      "No, she's living in a home now.",
      "Perhaps he should get a trade, become a carpenter or something."
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 31، تمرین 31.3."
  },
  {
    category: "vocabulary",
    lesson: 34,
    scope: "درس 34 — تمرین 34.1",
    text: "4 ............... of cola",
    options: [
      "cans of cola | a tin of condensed milk | a packet",
      "bottles",
      "packets of crisps"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 34، تمرین 34.1."
  },
  {
    category: "vocabulary",
    lesson: 34,
    scope: "درس 34 — تمرین 34.1",
    text: "a ............... of chocolate biscuits",
    options: [
      "bottles",
      "cans of cola | a tin of condensed milk | a packet",
      "packets of crisps"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 34، تمرین 34.1."
  },
  {
    category: "vocabulary",
    lesson: 34,
    scope: "درس 34 — تمرین 34.1",
    text: "a large ............... of matches",
    options: [
      "bottles",
      "packets of crisps",
      "cans of cola | a tin of condensed milk | a packet"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 34، تمرین 34.1."
  },
  {
    category: "vocabulary",
    lesson: 34,
    scope: "درس 34 — تمرین 34.4",
    text: "1 ............... box",
    options: [
      "chocolate",
      "wine",
      "carrier",
      "milk"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 34، تمرین 34.4."
  },
  {
    category: "vocabulary",
    lesson: 34,
    scope: "درس 34 — تمرین 34.4",
    text: "2 ............... bottle",
    options: [
      "carrier",
      "chocolate",
      "wine",
      "milk"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 34، تمرین 34.4."
  },
  {
    category: "vocabulary",
    lesson: 34,
    scope: "درس 34 — تمرین 34.4",
    text: "3 ............... bag",
    options: [
      "carrier",
      "chocolate",
      "wine",
      "milk"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 34، تمرین 34.4."
  },
  {
    category: "vocabulary",
    lesson: 34,
    scope: "درس 34 — تمرین 34.4",
    text: "4 ............... jug",
    options: [
      "carrier",
      "chocolate",
      "wine",
      "milk"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 34، تمرین 34.4."
  },
  {
    category: "vocabulary",
    lesson: 34,
    scope: "درس 34 — تمرین 34.4",
    text: "5 ............... glass",
    options: [
      "chocolate",
      "flower",
      "wine",
      "carrier"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 34، تمرین 34.4."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.1",
    text: "1 thunder",
    options: [
      "thunderstorm",
      "stones",
      "drift",
      "storm"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.1."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.1",
    text: "2 torrential",
    options: [
      "storm",
      "stones",
      "drift",
      "torrential rain"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.1."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.1",
    text: "3 down",
    options: [
      "drift",
      "stones",
      "downpour",
      "storm"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.1."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.1",
    text: "4 heat",
    options: [
      "stones",
      "heatwave",
      "drift",
      "storm"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.1."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.1",
    text: "5 hail",
    options: [
      "hailstones",
      "stones",
      "drift",
      "storm"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.1."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.1",
    text: "6 snow",
    options: [
      "storm",
      "stones",
      "drift",
      "snowdrift"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.1."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.1",
    text: "7 gale",
    options: [
      "drift",
      "stones",
      "gale warning",
      "storm"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.1."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.3",
    text: "1 We had to sit in the shade every afternoon.",
    options: [
      "There was a heatwave in July. or It was scorching",
      "It was terrible muggy and humid as we worked.",
      "It was absolutely stifling today.",
      "There was ice"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.3."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.3",
    text: "2 The sweat was pouring out of us.",
    options: [
      "There was ice",
      "There was a heatwave in July. or It was scorching",
      "It was absolutely stifling today.",
      "It was terrible muggy and humid as we worked."
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.3."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.3",
    text: "3 I could hardly breathe; I wished it would rain to cool us down.",
    options: [
      "It was terrible muggy and humid as we worked.",
      "There was a heatwave in July. or It was scorching",
      "It was absolutely stifling today.",
      "There was ice"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.3."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.3",
    text: "4 Cars were skidding out of control.",
    options: [
      "There was a heatwave in July. or It was scorching",
      "There was ice",
      "It was terrible muggy and humid as we worked.",
      "It was absolutely stifling today."
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.3."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.3",
    text: "5 The postman had to use a boat to get around.",
    options: [
      "We had terrible floods that winter.",
      "There was a heatwave in July. or It was scorching",
      "It was terrible muggy and humid as we worked.",
      "It was absolutely stifling today."
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.3."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.3",
    text: "6 They had to close the airport; the snow was a metre deep.",
    options: [
      "It was absolutely stifling today.",
      "There was a heatwave in July. or It was scorching",
      "It was terrible muggy and humid as we worked.",
      "There was a heavy blizzard that night."
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.3."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.3",
    text: "7 We were able to sit in the garden in the middle of winter.",
    options: [
      "It was terrible muggy and humid as we worked.",
      "There was a heatwave in July. or It was scorching",
      "Do you remember how mild it was that year?",
      "It was absolutely stifling today."
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.3."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.3",
    text: "8 The earth became rock-hard and a lot of plants died.",
    options: [
      "There was a heatwave in July. or It was scorching",
      "There was a very bad drought that summer.",
      "It was terrible muggy and humid as we worked.",
      "It was absolutely stifling today."
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.3."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.3",
    text: "9 It blew the newspaper right out of my hands.",
    options: [
      "Suddenly there was a very strong gust of wind.",
      "There was a heatwave in July. or It was scorching",
      "It was terrible muggy and humid as we worked.",
      "It was absolutely stifling today."
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.3."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.3",
    text: "10 A row of very big trees had been blown over.",
    options: [
      "It was absolutely stifling today.",
      "There was a heatwave in July. or It was scorching",
      "It was terrible muggy and humid as we worked.",
      "After the hurricane"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.3."
  },
  {
    category: "vocabulary",
    lesson: 36,
    scope: "درس 36 — تمرین 36.3",
    text: "11 I could hardly see my hand in front of my face.",
    options: [
      "It was terrible muggy and humid as we worked.",
      "There was a heatwave in July. or It was scorching",
      "There was a very dense fog that morning.",
      "It was absolutely stifling today."
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 36، تمرین 36.3."
  },
  {
    category: "vocabulary",
    lesson: 37,
    scope: "درس 37 — تمرین 37.1",
    text: "EXAMPLE A: I thought you said he was the short, chubby one. B: No, no, no, not at all, he's the tall, thin-faced one.",
    options: [
      "... unattractive, in fact. (You could also say he",
      "... scruffy and untidy-looking",
      "... that slim, dark-haired woman over there.",
      "... the fair, bald guy. or straight-"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 37، تمرین 37.1."
  },
  {
    category: "vocabulary",
    lesson: 37,
    scope: "درس 37 — تمرین 37.1",
    text: "1 A: Was that his brother, the dark-skinned, wavy-haired one? B: No, completely the opposite, his brother's ...",
    options: [
      "... that slim, dark-haired woman over there.",
      "... the fair, bald guy. or straight-",
      "... scruffy and untidy-looking",
      "... unattractive, in fact. (You could also say he"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 37، تمرین 37.1."
  },
  {
    category: "vocabulary",
    lesson: 37,
    scope: "درس 37 — تمرین 37.1",
    text: "2 A: She's always quite well-dressed, so I've heard. B: What! Who told you that? Every time I see her, she's ...",
    options: [
      "... the fair, bald guy. or straight-",
      "... that slim, dark-haired woman over there.",
      "... scruffy and untidy-looking",
      "... unattractive, in fact. (You could also say he"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 37، تمرین 37.1."
  },
  {
    category: "vocabulary",
    lesson: 37,
    scope: "درس 37 — تمرین 37.1",
    text: "3 A: So Charlene's that rather plump, fair-haired woman, is she? B: No, you're looking at the wrong one. Charlene's ...",
    options: [
      "... unattractive, in fact. (You could also say he",
      "... the fair, bald guy. or straight-",
      "... scruffy and untidy-looking",
      "... that slim, dark-haired woman over there."
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 37، تمرین 37.1."
  },
  {
    category: "vocabulary",
    lesson: 37,
    scope: "درس 37 — تمرین 37.1",
    text: "4 A: So, tell us about the new boss; good looking? B: No, I'm afraid not; rather ...",
    options: [
      "... that slim, dark-haired woman over there.",
      "... the fair, bald guy. or straight-",
      "... scruffy and untidy-looking",
      "... a teenager / in her twenties. (Another useful expression is 'she's a youngster', for a person who is a teenager or who is still very young.)"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 37، تمرین 37.1."
  },
  {
    category: "vocabulary",
    lesson: 37,
    scope: "درس 37 — تمرین 37.3",
    text: "EXAMPLE good-looking",
    options: [
      "mixed",
      "looking",
      "round",
      "complexion"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 37، تمرین 37.3."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.1",
    text: "1 clever",
    options: [
      "tight-fisted",
      "introverted",
      "half-witted",
      "courteous"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.1."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.1",
    text: "2 extroverted",
    options: [
      "tight-fisted",
      "introverted",
      "courteous",
      "gregarious"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.1."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.1",
    text: "3 rude",
    options: [
      "courteous",
      "introverted",
      "tight-fisted",
      "gregarious"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.1."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.1",
    text: "4 cruel",
    options: [
      "courteous",
      "introverted",
      "tight-fisted",
      "kind-hearted"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.1."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.1",
    text: "5 generous",
    options: [
      "courteous",
      "introverted",
      "tight-fisted",
      "gregarious"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.1."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.1",
    text: "6 unsociable",
    options: [
      "introverted",
      "gregarious",
      "tight-fisted",
      "courteous"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.1."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.2",
    text: "1 Di's very thrifty.",
    options: [
      "intelligent",
      "dislikes",
      "likes",
      "bright"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.2."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.2",
    text: "2 Molly's usually frank.",
    options: [
      "dislikes",
      "likes",
      "intelligent",
      "bright"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.2."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.2",
    text: "3 Liz is quite broad-minded.",
    options: [
      "likes",
      "dislikes",
      "intelligent",
      "bright"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.2."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.2",
    text: "4 Sam can be aggressive.",
    options: [
      "bright",
      "likes",
      "intelligent",
      "dislikes"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.2."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.2",
    text: "5 Dick's quite bossy.",
    options: [
      "intelligent",
      "likes",
      "dislikes",
      "bright"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.2."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.2",
    text: "6 I find Dave self-important.",
    options: [
      "likes",
      "dislikes",
      "intelligent",
      "bright"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.2."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.2",
    text: "7 Don't you think Jim's nosy?",
    options: [
      "dislikes",
      "likes",
      "intelligent",
      "bright"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.2."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.2",
    text: "8 Jill is very original.",
    options: [
      "bright",
      "dislikes",
      "intelligent",
      "likes"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.2."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.4",
    text: "EXAMPLE If you arrange to meet at 7 p.m., do you arrive at 7 p.m.?",
    options: [
      "argumentative",
      "pessimistic",
      "sociable",
      "sensitive"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.4."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.4",
    text: "1 Do you prefer to be in the company of other people?",
    options: [
      "argumentative",
      "pessimistic",
      "sensitive",
      "sociable"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.4."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.4",
    text: "2 Look at the picture. Do you think 'my glass is half empty'?",
    options: [
      "assertive",
      "pessimistic",
      "argumentative",
      "sensitive"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.4."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.4",
    text: "3 Do you find it easy to tell your boss if you feel he or she has treated you badly?",
    options: [
      "sensitive",
      "pessimistic",
      "argumentative",
      "inquisitive"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.4."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.4",
    text: "4 Do you always look out of the window if you hear a car draw up?",
    options: [
      "argumentative",
      "pessimistic",
      "extravagant",
      "sensitive"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.4."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.4",
    text: "5 Do you often buy your friends presents for no particular reason?",
    options: [
      "pessimistic",
      "argumentative",
      "sensitive",
      "sociable"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.4."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.4",
    text: "6 Do you frequently disagree with what other people say?",
    options: [
      "sensitive",
      "pessimistic",
      "argumentative",
      "sociable"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.4."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.5",
    text: "1 thrifty",
    options: [
      "sensible - If you won a lot of money, would you put it in the bank rather than spend it on a luxury you have always wanted?",
      "blunt - If a friend asks you if you like her awful new dress, would you say 'No'?",
      "thrifty - Do you always keep old pieces of string in case they come in handy (might be useful)?",
      "even-tempered - If someone spills soup on some new clothes of yours, do you just sigh and say 'That's life'?"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.5."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.5",
    text: "2 blunt",
    options: [
      "thrifty - Do you always keep old pieces of string in case they come in handy (might be useful)?",
      "blunt - If a friend asks you if you like her awful new dress, would you say 'No'?",
      "sensible - If you won a lot of money, would you put it in the bank rather than spend it on a luxury you have always wanted?",
      "even-tempered - If someone spills soup on some new clothes of yours, do you just sigh and say 'That's life'?"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.5."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.5",
    text: "3 sensible",
    options: [
      "sensible - If you won a lot of money, would you put it in the bank rather than spend it on a luxury you have always wanted?",
      "thrifty - Do you always keep old pieces of string in case they come in handy (might be useful)?",
      "blunt - If a friend asks you if you like her awful new dress, would you say 'No'?",
      "even-tempered - If someone spills soup on some new clothes of yours, do you just sigh and say 'That's life'?"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.5."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.5",
    text: "5 even-tempered",
    options: [
      "blunt - If a friend asks you if you like her awful new dress, would you say 'No'?",
      "thrifty - Do you always keep old pieces of string in case they come in handy (might be useful)?",
      "even-tempered - If someone spills soup on some new clothes of yours, do you just sigh and say 'That's life'?",
      "sensible - If you won a lot of money, would you put it in the bank rather than spend it on a luxury you have always wanted?"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.5."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.5",
    text: "6 original",
    options: [
      "thrifty - Do you always keep old pieces of string in case they come in handy (might be useful)?",
      "original - Do you never wear blue jeans?",
      "blunt - If a friend asks you if you like her awful new dress, would you say 'No'?",
      "sensible - If you won a lot of money, would you put it in the bank rather than spend it on a luxury you have always wanted?"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.5."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.5",
    text: "7 obstinate",
    options: [
      "obstinate - Do you become even more determined to do something, if people try to persuade you not to?",
      "thrifty - Do you always keep old pieces of string in case they come in handy (might be useful)?",
      "blunt - If a friend asks you if you like her awful new dress, would you say 'No'?",
      "sensible - If you won a lot of money, would you put it in the bank rather than spend it on a luxury you have always wanted?"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.5."
  },
  {
    category: "vocabulary",
    lesson: 38,
    scope: "درس 38 — تمرین 38.5",
    text: "8 stressed-out",
    options: [
      "sensible - If you won a lot of money, would you put it in the bank rather than spend it on a luxury you have always wanted?",
      "thrifty - Do you always keep old pieces of string in case they come in handy (might be useful)?",
      "blunt - If a friend asks you if you like her awful new dress, would you say 'No'?",
      "stressed out - Do you find it hard to sleep at night because problems are going round in your head?"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 38، تمرین 38.5."
  },
  {
    category: "vocabulary",
    lesson: 39,
    scope: "درس 39 — تمرین 39.1",
    text: "1 This is Jack. He and I share a flat.",
    options: [
      "My grandad still writes to his old (or former) shipmates.",
      "This is Jack. He's my flatmate. or He and I are flatmates.",
      "We were classmates in 1988, weren't we? or You were a classmate of mine ...",
      "She's not really a friend, she's just a workmate."
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 39، تمرین 39.1."
  },
  {
    category: "vocabulary",
    lesson: 39,
    scope: "درس 39 — تمرین 39.1",
    text: "2 My grandad still writes to his old friends he was at sea with.",
    options: [
      "My grandad still writes to his old (or former) shipmates.",
      "This is Jack. He's my flatmate. or He and I are flatmates.",
      "We were classmates in 1988, weren't we? or You were a classmate of mine ...",
      "She's not really a friend, she's just a workmate."
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 39، تمرین 39.1."
  },
  {
    category: "vocabulary",
    lesson: 39,
    scope: "درس 39 — تمرین 39.1",
    text: "3 We were in the same class together in 1988, weren't we?",
    options: [
      "She's not really a friend, she's just a workmate.",
      "This is Jack. He's my flatmate. or He and I are flatmates.",
      "My grandad still writes to his old (or former) shipmates.",
      "We were classmates in 1988, weren't we? or You were a classmate of mine ..."
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 39، تمرین 39.1."
  },
  {
    category: "vocabulary",
    lesson: 39,
    scope: "درس 39 — تمرین 39.1",
    text: "4 She's not really a friend, she's just someone I work with.",
    options: [
      "My grandad still writes to his old (or former) shipmates.",
      "This is Jack. He's my flatmate. or He and I are flatmates.",
      "She's not really a friend, she's just a workmate.",
      "We were classmates in 1988, weren't we? or You were a classmate of mine ..."
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 39، تمرین 39.1."
  },
  {
    category: "vocabulary",
    lesson: 39,
    scope: "درس 39 — تمرین 39.3",
    text: "1 teenage music fan (a) parents (b) pop star (c) strict teacher (d) mate",
    options: [
      "A 45-year-old may well dislike teenagers or look down on them, or secretly fancy them if they are attractive; he",
      "A teenage music fan might not see eye to eye with his"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 39، تمرین 39.3."
  },
  {
    category: "vocabulary",
    lesson: 39,
    scope: "درس 39 — تمرین 39.3",
    text: "3 45-year-old (a) teenagers (b) ex-husband/wife",
    options: [
      "A teenage music fan might not see eye to eye with his",
      "A 45-year-old may well dislike teenagers or look down on them, or secretly fancy them if they are attractive; he"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 39، تمرین 39.3."
  },
  {
    category: "vocabulary",
    lesson: 39,
    scope: "درس 39 — تمرین 39.4",
    text: "1 Jo and Phil don't get on eye to eye.",
    options: [
      "I fell out with my parents ...",
      "Jo and Phil don't see eye to eye. or ... don't get on with each other.",
      "We had a quarrel but now we've made it up.",
      "Do you think Jim and Nora are having an affair?"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 39، تمرین 39.4."
  },
  {
    category: "vocabulary",
    lesson: 39,
    scope: "درس 39 — تمرین 39.4",
    text: "2 I fell up with my parents last night. It wasn't my fault.",
    options: [
      "I fell out with my parents ...",
      "Jo and Phil don't see eye to eye. or ... don't get on with each other.",
      "We had a quarrel but now we've made it up.",
      "Do you think Jim and Nora are having an affair?"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 39، تمرین 39.4."
  },
  {
    category: "vocabulary",
    lesson: 39,
    scope: "درس 39 — تمرین 39.4",
    text: "3 We had a quarrel but now we've made it well.",
    options: [
      "Do you think Jim and Nora are having an affair?",
      "Jo and Phil don't see eye to eye. or ... don't get on with each other.",
      "I fell out with my parents ...",
      "We had a quarrel but now we've made it up."
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 39، تمرین 39.4."
  },
  {
    category: "vocabulary",
    lesson: 39,
    scope: "درس 39 — تمرین 39.4",
    text: "4 Do you think Jim and Nora are making an affair? I do.",
    options: [
      "I fell out with my parents ...",
      "Jo and Phil don't see eye to eye. or ... don't get on with each other.",
      "Do you think Jim and Nora are having an affair?",
      "We had a quarrel but now we've made it up."
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 39، تمرین 39.4."
  },
  {
    category: "vocabulary",
    lesson: 39,
    scope: "درس 39 — تمرین 39.4",
    text: "5 I see very well with all my colleagues at work.",
    options: [
      "Jo and Phil don't see eye to eye. or ... don't get on with each other.",
      "I get on very well with my colleagues at work.",
      "I fell out with my parents ...",
      "We had a quarrel but now we've made it up."
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 39، تمرین 39.4."
  },
  {
    category: "vocabulary",
    lesson: 39,
    scope: "درس 39 — تمرین 39.4",
    text: "6 She should learn to respect her olders.",
    options: [
      "She should learn to respect her elders.",
      "Jo and Phil don't see eye to eye. or ... don't get on with each other.",
      "I fell out with my parents ...",
      "We had a quarrel but now we've made it up."
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 39، تمرین 39.4."
  },
  {
    category: "vocabulary",
    lesson: 39,
    scope: "درس 39 — تمرین 39.4",
    text: "7 Jo's attractive, but her mate just makes me cold completely.",
    options: [
      "We had a quarrel but now we've made it up.",
      "Jo and Phil don't see eye to eye. or ... don't get on with each other.",
      "I fell out with my parents ...",
      "Jo's attractive, but her mate just leaves me completely cold."
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 39، تمرین 39.4."
  },
  {
    category: "vocabulary",
    lesson: 41,
    scope: "درس 41 — تمرین 41.1",
    text: "EXAMPLE We had to send for a plumber.",
    options: [
      "Oh dear! I've cut my finger. It's bleeding.",
      "Our washing machine broke down / stopped working.",
      "Maybe the door-handle has come off, or something that was held on with a screw or screws.",
      "My car broke down / wouldn't start."
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 41، تمرین 41.1."
  },
  {
    category: "vocabulary",
    lesson: 41,
    scope: "درس 41 — تمرین 41.1",
    text: "1 I had to call out our local mechanic.",
    options: [
      "Maybe the door-handle has come off, or something that was held on with a screw or screws.",
      "My car broke down / wouldn't start.",
      "Our washing machine broke down / stopped working.",
      "Oh dear! I've cut my finger. It's bleeding."
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 41، تمرین 41.1."
  },
  {
    category: "vocabulary",
    lesson: 41,
    scope: "درس 41 — تمرین 41.1",
    text: "2 Our neighbours let us use their washing machine.",
    options: [
      "My car broke down / wouldn't start.",
      "Maybe the door-handle has come off, or something that was held on with a screw or screws.",
      "Our washing machine broke down / stopped working.",
      "Oh dear! I've cut my finger. It's bleeding."
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 41، تمرین 41.1."
  },
  {
    category: "vocabulary",
    lesson: 41,
    scope: "درس 41 — تمرین 41.1",
    text: "3 Don't worry, it often does that; I'll screw it back on.",
    options: [
      "Oh dear! I've cut my finger. It's bleeding.",
      "My car broke down / wouldn't start.",
      "Our washing machine broke down / stopped working.",
      "Maybe the door-handle has come off, or something that was held on with a screw or screws."
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 41، تمرین 41.1."
  },
  {
    category: "vocabulary",
    lesson: 41,
    scope: "درس 41 — تمرین 41.1",
    text: "4 Come here and I'll put a plaster on it.",
    options: [
      "Maybe the door-handle has come off, or something that was held on with a screw or screws.",
      "My car broke down / wouldn't start.",
      "Our washing machine broke down / stopped working.",
      "I fell and grazed my knee."
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 41، تمرین 41.1."
  },
  {
    category: "vocabulary",
    lesson: 41,
    scope: "درس 41 — تمرین 41.1",
    text: "5 Luckily, that was all it was; the skin was broken a bit, but there was no blood.",
    options: [
      "Our washing machine broke down / stopped working.",
      "My car broke down / wouldn't start.",
      "The batteries have run out / are dead on my radio/walkman. (You can also use run down.)",
      "Maybe the door-handle has come off, or something that was held on with a screw or screws."
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 41، تمرین 41.1."
  },
  {
    category: "vocabulary",
    lesson: 41,
    scope: "درس 41 — تمرین 41.1",
    text: "6 How many batteries does it take? I'll get some for you.",
    options: [
      "My car broke down / wouldn't start.",
      "I seem to have mislaid my glasses / false teeth, etc.",
      "Our washing machine broke down / stopped working.",
      "Maybe the door-handle has come off, or something that was held on with a screw or screws."
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 41، تمرین 41.1."
  },
  {
    category: "vocabulary",
    lesson: 41,
    scope: "درس 41 — تمرین 41.3",
    text: "1 you mislaid your credit card?",
    options: [
      "Get it repaired.",
      "Apologise and offer to get them a new one.",
      "Sew it back on again.",
      "Contact the bank / credit agency and get them to cancel it at once."
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 41، تمرین 41.3."
  },
  {
    category: "vocabulary",
    lesson: 41,
    scope: "درس 41 — تمرین 41.3",
    text: "2 you noticed your guest's glass was chipped?",
    options: [
      "Sew it back on again.",
      "Contact the bank / credit agency and get them to cancel it at once.",
      "Apologise and offer to get them a new one.",
      "Get it repaired."
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 41، تمرین 41.3."
  },
  {
    category: "vocabulary",
    lesson: 41,
    scope: "درس 41 — تمرین 41.3",
    text: "3 one of your coat-buttons came off?",
    options: [
      "Contact the bank / credit agency and get them to cancel it at once.",
      "Sew it back on again.",
      "Apologise and offer to get them a new one.",
      "Get it repaired."
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 41، تمرین 41.3."
  },
  {
    category: "vocabulary",
    lesson: 41,
    scope: "درس 41 — تمرین 41.3",
    text: "4 your dishwasher broke down?",
    options: [
      "Get it repaired.",
      "Contact the bank / credit agency and get them to cancel it at once.",
      "Apologise and offer to get them a new one.",
      "Sew it back on again."
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 41، تمرین 41.3."
  },
  {
    category: "vocabulary",
    lesson: 41,
    scope: "درس 41 — تمرین 41.3",
    text: "5 you bruised your forehead?",
    options: [
      "Sew it back on again.",
      "Contact the bank / credit agency and get them to cancel it at once.",
      "Apologise and offer to get them a new one.",
      "Put an ice-cube on it. (There are lots of remedies for this, including rubbing good butter on it!)"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 41، تمرین 41.3."
  },
  {
    category: "vocabulary",
    lesson: 41,
    scope: "درس 41 — تمرین 41.3",
    text: "6 your watch was slow?",
    options: [
      "Apologise and offer to get them a new one.",
      "Contact the bank / credit agency and get them to cancel it at once.",
      "Put it right by moving the hands forward / changing the setting.",
      "Sew it back on again."
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 41، تمرین 41.3."
  },
  {
    category: "vocabulary",
    lesson: 41,
    scope: "درس 41 — تمرین 41.5",
    text: "1 I didn't look where I was going as I walked through the low doorway and ...",
    options: [
      "... mislaid her number.",
      "... banged",
      "... locked myself out.",
      "... broken down / not working. (It could also be jammed which means mechanically stuck, e.g. by some broken film.)"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 41، تمرین 41.5."
  },
  {
    category: "vocabulary",
    lesson: 41,
    scope: "درس 41 — تمرین 41.5",
    text: "2 The wind blew the door shut and I realised I'd ...",
    options: [
      "... banged",
      "... mislaid her number.",
      "... locked myself out.",
      "... broken down / not working. (It could also be jammed which means mechanically stuck, e.g. by some broken film.)"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 41، تمرین 41.5."
  },
  {
    category: "vocabulary",
    lesson: 41,
    scope: "درس 41 — تمرین 41.5",
    text: "3 I would ring her but I'm afraid I've ...",
    options: [
      "... broken down / not working. (It could also be jammed which means mechanically stuck, e.g. by some broken film.)",
      "... banged",
      "... locked myself out.",
      "... mislaid her number."
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 41، تمرین 41.5."
  },
  {
    category: "vocabulary",
    lesson: 41,
    scope: "درس 41 — تمرین 41.5",
    text: "4 I can't take a photo, my camera's ...",
    options: [
      "... mislaid her number.",
      "... banged",
      "... locked myself out.",
      "... fell and twisted my ankle / cut my leg/knee, etc."
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 41، تمرین 41.5."
  },
  {
    category: "vocabulary",
    lesson: 43,
    scope: "درس 43 — تمرین 43.2",
    text: "1 I can't come out. I'm studying. I'm passing an examination tomorrow.",
    options: [
      "I hear you passed / did well in your examination!",
      "I'm taking",
      "You can study a lot of different subjects / take a lot of different courses at this university. (a career is a job or profession you follow for life or for many years)",
      "I got some good marks"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 43، تمرین 43.2."
  },
  {
    category: "vocabulary",
    lesson: 43,
    scope: "درس 43 — تمرین 43.2",
    text: "2 Congratulations! I hear you succeeded your examination!",
    options: [
      "I hear you passed / did well in your examination!",
      "I'm taking",
      "You can study a lot of different subjects / take a lot of different courses at this university. (a career is a job or profession you follow for life or for many years)",
      "I got some good marks"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 43، تمرین 43.2."
  },
  {
    category: "vocabulary",
    lesson: 43,
    scope: "درس 43 — تمرین 43.2",
    text: "3 You can study a lot of different careers at this university.",
    options: [
      "I got some good marks",
      "I'm taking",
      "I hear you passed / did well in your examination!",
      "You can study a lot of different subjects / take a lot of different courses at this university. (a career is a job or profession you follow for life or for many years)"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 43، تمرین 43.2."
  },
  {
    category: "vocabulary",
    lesson: 43,
    scope: "درس 43 — تمرین 43.2",
    text: "4 I got some good notes in my continuous assessment this term.",
    options: [
      "I hear you passed / did well in your examination!",
      "I'm taking",
      "I got some good marks",
      "You can study a lot of different subjects / take a lot of different courses at this university. (a career is a job or profession you follow for life or for many years)"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 43، تمرین 43.2."
  },
  {
    category: "vocabulary",
    lesson: 43,
    scope: "درس 43 — تمرین 43.2",
    text: "5 She's a professor in a primary school.",
    options: [
      "I'm taking",
      "She's a teacher in a primary school. (Professors are only in universities and are very senior teachers.)",
      "I hear you passed / did well in your examination!",
      "You can study a lot of different subjects / take a lot of different courses at this university. (a career is a job or profession you follow for life or for many years)"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 43، تمرین 43.2."
  },
  {
    category: "vocabulary",
    lesson: 43,
    scope: "درس 43 — تمرین 43.2",
    text: "6 He gave an interesting 45-minute conference on Goethe.",
    options: [
      "He gave an interesting 45-minute lecture on Goethe. (A conference is a big meeting of people with the same interests, usually lasting several days.)",
      "I'm taking",
      "I hear you passed / did well in your examination!",
      "You can study a lot of different subjects / take a lot of different courses at this university. (a career is a job or profession you follow for life or for many years)"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 43، تمرین 43.2."
  },
  {
    category: "vocabulary",
    lesson: 43,
    scope: "درس 43 — تمرین 43.2",
    text: "7 She got a degree in personnel management from a private college.",
    options: [
      "You can study a lot of different subjects / take a lot of different courses at this university. (a career is a job or profession you follow for life or for many years)",
      "I'm taking",
      "I hear you passed / did well in your examination!",
      "She got a diploma in personnel management. (Only universities can give degrees.)"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 43، تمرین 43.2."
  },
  {
    category: "vocabulary",
    lesson: 43,
    scope: "درس 43 — تمرین 43.2",
    text: "8 When I was 12, we started having French seminars at school, and I fell in love with the language.",
    options: [
      "I hear you passed / did well in your examination!",
      "I'm taking",
      "... we started having French classes",
      "You can study a lot of different subjects / take a lot of different courses at this university. (a career is a job or profession you follow for life or for many years)"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 43، تمرین 43.2."
  },
  {
    category: "vocabulary",
    lesson: 43,
    scope: "درس 43 — تمرین 43.3",
    text: "1 No, they have to finance their own studies.",
    options: [
      "What's the difference between a state university and a private one?",
      "Do students in your country get a grant?",
      "What goes on at playschools and nursery schools?",
      "Why did you choose a teacher-training college instead of a university?"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 43، تمرین 43.3."
  },
  {
    category: "vocabulary",
    lesson: 43,
    scope: "درس 43 — تمرین 43.3",
    text: "2 There isn't much difference; it's just that one gets money from the government and the courses are free, the other depends on fee-paying students.",
    options: [
      "What's the difference between a state university and a private one?",
      "Do students in your country get a grant?",
      "What goes on at playschools and nursery schools?",
      "Why did you choose a teacher-training college instead of a university?"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 43، تمرین 43.3."
  },
  {
    category: "vocabulary",
    lesson: 43,
    scope: "درس 43 — تمرین 43.3",
    text: "3 Well, they learn one or two things, like recognising a few numbers, but most of the time they just play.",
    options: [
      "Why did you choose a teacher-training college instead of a university?",
      "Do students in your country get a grant?",
      "What's the difference between a state university and a private one?",
      "What goes on at playschools and nursery schools?"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 43، تمرین 43.3."
  },
  {
    category: "vocabulary",
    lesson: 43,
    scope: "درس 43 — تمرین 43.3",
    text: "4 Because I wanted to be a teacher, no other reason.",
    options: [
      "What's the difference between a state university and a private one?",
      "Do students in your country get a grant?",
      "Why did you choose a teacher-training college instead of a university?",
      "What goes on at playschools and nursery schools?"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 43، تمرین 43.3."
  },
  {
    category: "vocabulary",
    lesson: 43,
    scope: "درس 43 — تمرین 43.3",
    text: "5 It's sixteen, but a lot of kids stay on until eighteen.",
    options: [
      "Do students in your country get a grant?",
      "What's the school-leaving age in Britain now?",
      "What's the difference between a state university and a private one?",
      "What goes on at playschools and nursery schools?"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 43، تمرین 43.3."
  },
  {
    category: "vocabulary",
    lesson: 43,
    scope: "درس 43 — تمرین 43.3",
    text: "6 I've been revising/studying for an exam.",
    options: [
      "You look terribly tired. What've you been doing?",
      "Do students in your country get a grant?",
      "What's the difference between a state university and a private one?",
      "What goes on at playschools and nursery schools?"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 43، تمرین 43.3."
  },
  {
    category: "vocabulary",
    lesson: 43,
    scope: "درس 43 — تمرین 43.3",
    text: "7 No, ours are given in grades, you know, B+, C, A, that sort of thing.",
    options: [
      "What goes on at playschools and nursery schools?",
      "Do students in your country get a grant?",
      "What's the difference between a state university and a private one?",
      "Do you get marks"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 43، تمرین 43.3."
  },
  {
    category: "vocabulary",
    lesson: 43,
    scope: "درس 43 — تمرین 43.3",
    text: "8 No, I was ill. I didn't miss it deliberately.",
    options: [
      "What's the difference between a state university and a private one?",
      "Do students in your country get a grant?",
      "Did you skip yesterday's lecture?",
      "What goes on at playschools and nursery schools?"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 43، تمرین 43.3."
  },
  {
    category: "vocabulary",
    lesson: 48,
    scope: "درس 48 — تمرین 48.2",
    text: "1 Indian curry",
    options: [
      "hot, spicy",
      "savoury",
      "salty",
      "sour"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 48، تمرین 48.2."
  },
  {
    category: "vocabulary",
    lesson: 48,
    scope: "درس 48 — تمرین 48.2",
    text: "2 pizza",
    options: [
      "sour",
      "hot, spicy",
      "salty",
      "savoury"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 48، تمرین 48.2."
  },
  {
    category: "vocabulary",
    lesson: 48,
    scope: "درس 48 — تمرین 48.2",
    text: "3 sea water",
    options: [
      "savoury",
      "hot, spicy",
      "salty",
      "sour"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 48، تمرین 48.2."
  },
  {
    category: "vocabulary",
    lesson: 48,
    scope: "درس 48 — تمرین 48.2",
    text: "4 an unripe apple",
    options: [
      "hot, spicy",
      "sour",
      "savoury",
      "salty"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 48، تمرین 48.2."
  },
  {
    category: "vocabulary",
    lesson: 48,
    scope: "درس 48 — تمرین 48.2",
    text: "5 a cup of tea with five spoonfuls of sugar",
    options: [
      "sugary, sickly",
      "hot, spicy",
      "savoury",
      "salty"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 48، تمرین 48.2."
  },
  {
    category: "vocabulary",
    lesson: 48,
    scope: "درس 48 — تمرین 48.2",
    text: "6 strong black coffee with no sugar",
    options: [
      "salty",
      "hot, spicy",
      "savoury",
      "bitter, strong"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 48، تمرین 48.2."
  },
  {
    category: "vocabulary",
    lesson: 48,
    scope: "درس 48 — تمرین 48.2",
    text: "7 factory-made white bread",
    options: [
      "savoury",
      "hot, spicy",
      "bland, tasteless",
      "salty"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 48، تمرین 48.2."
  },
  {
    category: "vocabulary",
    lesson: 48,
    scope: "درس 48 — تمرین 48.4",
    text: "1 your chips had too much oil/fat on them?",
    options: [
      "These chips are rather oily",
      "This dish is over-cooked.",
      "This meat is done to a turn.",
      "This is just tasteless / very bland."
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 48، تمرین 48.4."
  },
  {
    category: "vocabulary",
    lesson: 48,
    scope: "درس 48 — تمرین 48.4",
    text: "2 your dish had obviously been cooked too much / too long?",
    options: [
      "This is just tasteless / very bland.",
      "These chips are rather oily",
      "This meat is done to a turn.",
      "This dish is over-cooked."
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 48، تمرین 48.4."
  },
  {
    category: "vocabulary",
    lesson: 48,
    scope: "درس 48 — تمرین 48.4",
    text: "3 your piece of meat was absolutely perfectly cooked?",
    options: [
      "This dish is over-cooked.",
      "These chips are rather oily",
      "This meat is done to a turn.",
      "This is just tasteless / very bland."
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 48، تمرین 48.4."
  },
  {
    category: "vocabulary",
    lesson: 48,
    scope: "درس 48 — تمرین 48.4",
    text: "4 your dish seemed to have no flavours at all?",
    options: [
      "These chips are rather oily",
      "This is just tasteless / very bland.",
      "This dish is over-cooked.",
      "This meat is done to a turn."
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 48، تمرین 48.4."
  },
  {
    category: "vocabulary",
    lesson: 48,
    scope: "درس 48 — تمرین 48.6",
    text: "1 Which are fish and which are usually called seafood? prawns sardines squid oysters mackerel mussels hake crab plaice trout lobster cod sole whiting",
    options: [
      "Fish: sardines mackerel hake plaice trout cod sole whiting; Seafood: prawns squid oysters mussels crab lobster",
      "Students' own answers."
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 48، تمرین 48.6."
  },
  {
    category: "vocabulary",
    lesson: 48,
    scope: "درس 48 — تمرین 48.6",
    text: "3 Which of these fruit grow in your country/region? Are there others not listed here? peach plum grapefruit grape nectarine star-fruit blackcurrant raspberry strawberry melon lime kiwi-fruit mango pear pineapple",
    options: [
      "beef",
      "Fish: sardines mackerel hake plaice trout cod sole whiting; Seafood: prawns squid oysters mussels crab lobster",
      "Students' own answers.",
      "lamb"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 48، تمرین 48.6."
  },
  {
    category: "vocabulary",
    lesson: 49,
    scope: "درس 49 — تمرین 49.1",
    text: "1 ________ ",
    options: [
      "peninsula",
      "cliff",
      "glacier",
      "waterfall"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 49، تمرین 49.1."
  },
  {
    category: "vocabulary",
    lesson: 49,
    scope: "درس 49 — تمرین 49.1",
    text: "2 ________ ",
    options: [
      "glacier",
      "waterfall",
      "cliff",
      "peninsula"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 49، تمرین 49.1."
  },
  {
    category: "vocabulary",
    lesson: 49,
    scope: "درس 49 — تمرین 49.1",
    text: "3 ________ ",
    options: [
      "waterfall",
      "glacier",
      "cliff",
      "peninsula"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 49، تمرین 49.1."
  },
  {
    category: "vocabulary",
    lesson: 49,
    scope: "درس 49 — تمرین 49.1",
    text: "4 ________ ",
    options: [
      "peninsula",
      "waterfall",
      "cliff",
      "glacier"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 49، تمرین 49.1."
  },
  {
    category: "vocabulary",
    lesson: 49,
    scope: "درس 49 — تمرین 49.1",
    text: "5 ________ ",
    options: [
      "glacier",
      "waterfall",
      "cliff",
      "estuary"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 49، تمرین 49.1."
  },
  {
    category: "vocabulary",
    lesson: 49,
    scope: "درس 49 — تمرین 49.1",
    text: "6 ________ ",
    options: [
      "cliff",
      "waterfall",
      "tributary",
      "glacier"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 49، تمرین 49.1."
  },
  {
    category: "vocabulary",
    lesson: 49,
    scope: "درس 49 — تمرین 49.1",
    text: "7 ________ ",
    options: [
      "waterfall",
      "volcano",
      "cliff",
      "glacier"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 49، تمرین 49.1."
  },
  {
    category: "vocabulary",
    lesson: 49,
    scope: "درس 49 — تمرین 49.1",
    text: "8 ________ ",
    options: [
      "straits",
      "waterfall",
      "cliff",
      "glacier"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 49، تمرین 49.1."
  },
  {
    category: "vocabulary",
    lesson: 49,
    scope: "درس 49 — تمرین 49.1",
    text: "9 ________ ",
    options: [
      "glacier",
      "waterfall",
      "cliff",
      "geyser"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 49، تمرین 49.1."
  },
  {
    category: "vocabulary",
    lesson: 49,
    scope: "درس 49 — تمرین 49.1",
    text: "10 ________ ",
    options: [
      "cliff",
      "waterfall",
      "gorge",
      "glacier"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 49، تمرین 49.1."
  },
  {
    category: "vocabulary",
    lesson: 49,
    scope: "درس 49 — تمرین 49.1",
    text: "11 ________ ",
    options: [
      "waterfall",
      "summit or peak of a mountain",
      "cliff",
      "glacier"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 49، تمرین 49.1."
  },
  {
    category: "vocabulary",
    lesson: 49,
    scope: "درس 49 — تمرین 49.1",
    text: "12 ________ ",
    options: [
      "chain of mountains",
      "waterfall",
      "cliff",
      "glacier"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 49، تمرین 49.1."
  },
  {
    category: "vocabulary",
    lesson: 49,
    scope: "درس 49 — تمرین 49.3",
    text: "1 What is the highest mountain in Africa?",
    options: [
      "New Zealand",
      "The Volga",
      "Venezuela (The Angel Falls)",
      "Mount Kilimanjaro"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 49، تمرین 49.3."
  },
  {
    category: "vocabulary",
    lesson: 49,
    scope: "درس 49 — تمرین 49.3",
    text: "2 What is the longest river in Europe?",
    options: [
      "Venezuela (The Angel Falls)",
      "Mount Kilimanjaro",
      "The Volga",
      "New Zealand"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 49، تمرین 49.3."
  },
  {
    category: "vocabulary",
    lesson: 49,
    scope: "درس 49 — تمرین 49.3",
    text: "3 Where is the highest waterfall in the world?",
    options: [
      "Mount Kilimanjaro",
      "Venezuela (The Angel Falls)",
      "The Volga",
      "New Zealand"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 49، تمرین 49.3."
  },
  {
    category: "vocabulary",
    lesson: 49,
    scope: "درس 49 — تمرین 49.3",
    text: "4 Name another country, apart from Iceland, which has geysers and hot springs.",
    options: [
      "New Zealand",
      "Mount Kilimanjaro",
      "The Volga",
      "Venezuela (The Angel Falls)"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 49، تمرین 49.3."
  },
  {
    category: "vocabulary",
    lesson: 49,
    scope: "درس 49 — تمرین 49.3",
    text: "5 What is a delta and which famous river has one?",
    options: [
      "Venezuela (The Angel Falls)",
      "Mount Kilimanjaro",
      "The Volga",
      "A delta is at the mouth of a river where the river divides and flows into the sea in a number of different channels. The River Nile has one."
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 49، تمرین 49.3."
  },
  {
    category: "vocabulary",
    lesson: 49,
    scope: "درس 49 — تمرین 49.3",
    text: "6 Where are the Straits of Gibraltar and the Cape of Good Hope?",
    options: [
      "The Volga",
      "Mount Kilimanjaro",
      "The Straits of Gibraltar are at the western entrance to the Mediterranean and the Cape of Good Hope is at the southern tip of Africa.",
      "Venezuela (The Angel Falls)"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 49، تمرین 49.3."
  },
  {
    category: "vocabulary",
    lesson: 49,
    scope: "درس 49 — تمرین 49.5",
    text: "1 sandy",
    options: [
      "3 shallow",
      "1 sandy",
      "2 steep",
      "sandy beach"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 49، تمرین 49.5."
  },
  {
    category: "vocabulary",
    lesson: 49,
    scope: "درس 49 — تمرین 49.5",
    text: "2 steep",
    options: [
      "2 steep",
      "1 sandy",
      "steep gorge",
      "3 shallow"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 49، تمرین 49.5."
  },
  {
    category: "vocabulary",
    lesson: 49,
    scope: "درس 49 — تمرین 49.5",
    text: "3 shallow",
    options: [
      "1 sandy",
      "shallow brook",
      "2 steep",
      "3 shallow"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 49، تمرین 49.5."
  },
  {
    category: "vocabulary",
    lesson: 49,
    scope: "درس 49 — تمرین 49.5",
    text: "4 rocky",
    options: [
      "rocky coast",
      "1 sandy",
      "2 steep",
      "3 shallow"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 49، تمرین 49.5."
  },
  {
    category: "vocabulary",
    lesson: 49,
    scope: "درس 49 — تمرین 49.5",
    text: "5 turbulent",
    options: [
      "3 shallow",
      "1 sandy",
      "2 steep",
      "turbulent river"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 49، تمرین 49.5."
  },
  {
    category: "vocabulary",
    lesson: 49,
    scope: "درس 49 — تمرین 49.5",
    text: "6 dangerous",
    options: [
      "2 steep",
      "1 sandy",
      "dangerous cliff",
      "3 shallow"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 49، تمرین 49.5."
  },
  {
    category: "vocabulary",
    lesson: 50,
    scope: "درس 50 — تمرین 50.1",
    text: "Where is Cork?",
    options: [
      "It has a desperately complex one-way traffic system. Moreover, its buses are terribly crowded.",
      "It lies on an island between two channels of the River Lee.",
      "Cork is in the south of the Republic of Ireland.",
      "St Anne's Church was built on a site where another church stood previously. That church was destroyed during a siege of the city."
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 50، تمرین 50.1."
  },
  {
    category: "vocabulary",
    lesson: 50,
    scope: "درس 50 — تمرین 50.1",
    text: "Where is the shopping and business centre of Cork?",
    options: [
      "Cork is in the south of the Republic of Ireland.",
      "It lies on an island between two channels of the River Lee.",
      "It has a desperately complex one-way traffic system. Moreover, its buses are terribly crowded.",
      "St Anne's Church was built on a site where another church stood previously. That church was destroyed during a siege of the city."
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 50، تمرین 50.1."
  },
  {
    category: "vocabulary",
    lesson: 50,
    scope: "درس 50 — تمرین 50.1",
    text: "What is Cork's traffic system like?",
    options: [
      "It has a desperately complex one-way traffic system. Moreover, its buses are terribly crowded.",
      "Cork is in the south of the Republic of Ireland.",
      "It lies on an island between two channels of the River Lee.",
      "St Anne's Church was built on a site where another church stood previously. That church was destroyed during a siege of the city."
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 50، تمرین 50.1."
  },
  {
    category: "vocabulary",
    lesson: 50,
    scope: "درس 50 — تمرین 50.1",
    text: "What is special about the site of St Anne's Church?",
    options: [
      "It has a desperately complex one-way traffic system. Moreover, its buses are terribly crowded.",
      "Cork is in the south of the Republic of Ireland.",
      "It lies on an island between two channels of the River Lee.",
      "St Anne's Church was built on a site where another church stood previously. That church was destroyed during a siege of the city."
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 50، تمرین 50.1."
  },
  {
    category: "vocabulary",
    lesson: 50,
    scope: "درس 50 — تمرین 50.1",
    text: "In what style is the architecture of Cork Cathedral?",
    options: [
      "It lies on an island between two channels of the River Lee.",
      "Cork is in the south of the Republic of Ireland.",
      "In the French Gothic style.",
      "It has a desperately complex one-way traffic system. Moreover, its buses are terribly crowded."
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 50، تمرین 50.1."
  },
  {
    category: "vocabulary",
    lesson: 50,
    scope: "درس 50 — تمرین 50.1",
    text: "Can you buy souvenirs at the markets?",
    options: [
      "Cork is in the south of the Republic of Ireland.",
      "Probably not as they do not cater specifically for tourists.",
      "It lies on an island between two channels of the River Lee.",
      "It has a desperately complex one-way traffic system. Moreover, its buses are terribly crowded."
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 50، تمرین 50.1."
  },
  {
    category: "vocabulary",
    lesson: 50,
    scope: "درس 50 — تمرین 50.1",
    text: "Why is the Crawford Gallery worth visiting?",
    options: [
      "The Crawford Gallery is worth visiting because it regularly puts on interesting exhibitions of modern art.",
      "Cork is in the south of the Republic of Ireland.",
      "It lies on an island between two channels of the River Lee.",
      "It has a desperately complex one-way traffic system. Moreover, its buses are terribly crowded."
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 50، تمرین 50.1."
  },
  {
    category: "vocabulary",
    lesson: 50,
    scope: "درس 50 — تمرین 50.1",
    text: "Where do Cork people live?",
    options: [
      "It has a desperately complex one-way traffic system. Moreover, its buses are terribly crowded.",
      "Cork is in the south of the Republic of Ireland.",
      "It lies on an island between two channels of the River Lee.",
      "Well-off people live in fashionable residential areas overlooking the harbour while others live in suburbs on the edge of the city."
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 50، تمرین 50.1."
  },
  {
    category: "vocabulary",
    lesson: 50,
    scope: "درس 50 — تمرین 50.4",
    text: " ________ museum",
    options: [
      "art music community",
      "leisure shopping city",
      "natural history science folk",
      "basketball squash royal"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 50، تمرین 50.4."
  },
  {
    category: "vocabulary",
    lesson: 50,
    scope: "درس 50 — تمرین 50.4",
    text: " ________ centre",
    options: [
      "natural history science folk",
      "leisure shopping city",
      "art music community",
      "basketball squash royal"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 50، تمرین 50.4."
  },
  {
    category: "vocabulary",
    lesson: 50,
    scope: "درس 50 — تمرین 50.4",
    text: " ________ college",
    options: [
      "art music community",
      "natural history science folk",
      "leisure shopping city",
      "basketball squash royal"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 50، تمرین 50.4."
  },
  {
    category: "vocabulary",
    lesson: 50,
    scope: "درس 50 — تمرین 50.4",
    text: " ________ court",
    options: [
      "art music community",
      "natural history science folk",
      "leisure shopping city",
      "basketball squash royal"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 50، تمرین 50.4."
  },
  {
    category: "vocabulary",
    lesson: 50,
    scope: "درس 50 — تمرین 50.4",
    text: " ________ club",
    options: [
      "leisure shopping city",
      "natural history science folk",
      "night tennis social",
      "art music community"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 50، تمرین 50.4."
  },
  {
    category: "vocabulary",
    lesson: 50,
    scope: "درس 50 — تمرین 50.4",
    text: " ________ agency",
    options: [
      "natural history science folk",
      "employment accommodation press",
      "leisure shopping city",
      "art music community"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 50، تمرین 50.4."
  },
  {
    category: "vocabulary",
    lesson: 53,
    scope: "درس 53 — تمرین 53.2",
    text: "1 thermometer",
    options: [
      "For doing operations.",
      "For weighing people.",
      "For taking blood or giving injections.",
      "For measuring"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 53، تمرین 53.2."
  },
  {
    category: "vocabulary",
    lesson: 53,
    scope: "درس 53 — تمرین 53.2",
    text: "2 scales",
    options: [
      "For taking blood or giving injections.",
      "For measuring",
      "For weighing people.",
      "For doing operations."
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 53، تمرین 53.2."
  },
  {
    category: "vocabulary",
    lesson: 53,
    scope: "درس 53 — تمرین 53.2",
    text: "3 syringe",
    options: [
      "For measuring",
      "For taking blood or giving injections.",
      "For weighing people.",
      "For doing operations."
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 53، تمرین 53.2."
  },
  {
    category: "vocabulary",
    lesson: 53,
    scope: "درس 53 — تمرین 53.2",
    text: "4 scalpel",
    options: [
      "For doing operations.",
      "For measuring",
      "For weighing people.",
      "For taking blood or giving injections."
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 53، تمرین 53.2."
  },
  {
    category: "vocabulary",
    lesson: 53,
    scope: "درس 53 — تمرین 53.5",
    text: "1 you wear shoes that rub?",
    options: [
      "bruises",
      "indigestion",
      "lung cancer",
      "blisters"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 53، تمرین 53.5."
  },
  {
    category: "vocabulary",
    lesson: 53,
    scope: "درس 53 — تمرین 53.5",
    text: "2 you eat too fast?",
    options: [
      "lung cancer",
      "blisters",
      "indigestion",
      "bruises"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 53، تمرین 53.5."
  },
  {
    category: "vocabulary",
    lesson: 53,
    scope: "درس 53 — تمرین 53.5",
    text: "3 you smoke a lot?",
    options: [
      "blisters",
      "lung cancer",
      "indigestion",
      "bruises"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 53، تمرین 53.5."
  },
  {
    category: "vocabulary",
    lesson: 53,
    scope: "درس 53 — تمرین 53.5",
    text: "4 you play football?",
    options: [
      "bruises",
      "blisters",
      "indigestion",
      "lung cancer"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 53، تمرین 53.5."
  },
  {
    category: "vocabulary",
    lesson: 53,
    scope: "درس 53 — تمرین 53.5",
    text: "5 you go skiing?",
    options: [
      "lung cancer",
      "blisters",
      "indigestion",
      "a broken leg"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 53، تمرین 53.5."
  },
  {
    category: "vocabulary",
    lesson: 53,
    scope: "درس 53 — تمرین 53.5",
    text: "6 you stay out in the sun too long?",
    options: [
      "indigestion",
      "blisters",
      "sunburn",
      "lung cancer"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 53، تمرین 53.5."
  },
  {
    category: "vocabulary",
    lesson: 53,
    scope: "درس 53 — تمرین 53.5",
    text: "7 you eat food you're allergic to?",
    options: [
      "blisters",
      "a rash",
      "indigestion",
      "lung cancer"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 53، تمرین 53.5."
  },
  {
    category: "vocabulary",
    lesson: 53,
    scope: "درس 53 — تمرین 53.5",
    text: "8 you run unusually fast for a bus?",
    options: [
      "breathlessness",
      "blisters",
      "indigestion",
      "lung cancer"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 53، تمرین 53.5."
  },
  {
    category: "vocabulary",
    lesson: 53,
    scope: "درس 53 — تمرین 53.5",
    text: "9 you eat food that is bad?",
    options: [
      "lung cancer",
      "blisters",
      "indigestion",
      "sickness and diarrhoea"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 53، تمرین 53.5."
  },
  {
    category: "vocabulary",
    lesson: 53,
    scope: "درس 53 — تمرین 53.5",
    text: "10 a mosquito bites you?",
    options: [
      "indigestion",
      "blisters",
      "an itch",
      "lung cancer"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 53، تمرین 53.5."
  },
  {
    category: "vocabulary",
    lesson: 53,
    scope: "درس 53 — تمرین 53.5",
    text: "12 you think you're ill all the time?",
    options: [
      "hypochondria",
      "blisters",
      "indigestion",
      "lung cancer"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 53، تمرین 53.5."
  },
  {
    category: "vocabulary",
    lesson: 56,
    scope: "درس 56 — تمرین 56.2",
    text: "1 2% of the British population owned 90% of the country's wealth in 1992.",
    options: [
      "Two per cent of the British population owned ninety per cent of the country's wealth in nineteen ninety-two.",
      "Nought degrees Centigrade (or Celsius) equals thirty-two degrees Fahrenheit.",
      "Sixty-two point three per cent of adults have false teeth.",
      "Two thirds plus one quarter times or multiplied by four squared, equals fourteen and two thirds."
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 56، تمرین 56.2."
  },
  {
    category: "vocabulary",
    lesson: 56,
    scope: "درس 56 — تمرین 56.2",
    text: "2 0°C = 32°F",
    options: [
      "Two thirds plus one quarter times or multiplied by four squared, equals fourteen and two thirds.",
      "Two per cent of the British population owned ninety per cent of the country's wealth in nineteen ninety-two.",
      "Sixty-two point three per cent of adults have false teeth.",
      "Nought degrees Centigrade (or Celsius) equals thirty-two degrees Fahrenheit."
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 56، تمرین 56.2."
  },
  {
    category: "vocabulary",
    lesson: 56,
    scope: "درس 56 — تمرین 56.2",
    text: "3 62.3% of adults have false teeth.",
    options: [
      "Nought degrees Centigrade (or Celsius) equals thirty-two degrees Fahrenheit.",
      "Two per cent of the British population owned ninety per cent of the country's wealth in nineteen ninety-two.",
      "Sixty-two point three per cent of adults have false teeth.",
      "Two thirds plus one quarter times or multiplied by four squared, equals fourteen and two thirds."
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 56، تمرین 56.2."
  },
  {
    category: "vocabulary",
    lesson: 56,
    scope: "درس 56 — تمرین 56.2",
    text: "4 ⅔ + ¼ × 4² = 14⅔.",
    options: [
      "Two per cent of the British population owned ninety per cent of the country's wealth in nineteen ninety-two.",
      "Two thirds plus one quarter times or multiplied by four squared, equals fourteen and two thirds.",
      "Nought degrees Centigrade (or Celsius) equals thirty-two degrees Fahrenheit.",
      "Sixty-two point three per cent of adults have false teeth."
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 56، تمرین 56.2."
  },
  {
    category: "vocabulary",
    lesson: 56,
    scope: "درس 56 — تمرین 56.4",
    text: "1 Oxygen accounts for 46.6% of the earth's crust.",
    options: [
      "forty-six point six per cent",
      "nine hundred and seventy-nine metres",
      "one thousand eight hundred and ninety-two cups",
      "one hundred and seventy-three metres or five hundred and sixty-eight feet high"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 56، تمرین 56.4."
  },
  {
    category: "vocabulary",
    lesson: 56,
    scope: "درس 56 — تمرین 56.4",
    text: "2 The highest waterfall in the world is Angel Falls in Venezuela with a drop of 979 m.",
    options: [
      "one hundred and seventy-three metres or five hundred and sixty-eight feet high",
      "forty-six point six per cent",
      "one thousand eight hundred and ninety-two cups",
      "nine hundred and seventy-nine metres"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 56، تمرین 56.4."
  },
  {
    category: "vocabulary",
    lesson: 56,
    scope: "درس 56 — تمرین 56.4",
    text: "3 The top coffee-drinking country in the world is Finland where 1,892 cups per annum are consumed per head of the population.",
    options: [
      "nine hundred and seventy-nine metres",
      "forty-six point six per cent",
      "one thousand eight hundred and ninety-two cups",
      "one hundred and seventy-three metres or five hundred and sixty-eight feet high"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 56، تمرین 56.4."
  },
  {
    category: "vocabulary",
    lesson: 56,
    scope: "درس 56 — تمرین 56.4",
    text: "4 The tallest church is the Chicago Methodist Temple which is 173 m or 568 ft high.",
    options: [
      "forty-six point six per cent",
      "one hundred and seventy-three metres or five hundred and sixty-eight feet high",
      "nine hundred and seventy-nine metres",
      "one thousand eight hundred and ninety-two cups"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 56، تمرین 56.4."
  },
  {
    category: "vocabulary",
    lesson: 56,
    scope: "درس 56 — تمرین 56.4",
    text: "5 The commonest item of lost property on London transport is the umbrella. 23,250 umbrellas were handed in to London transport lost property offices in 1987/8.",
    options: [
      "twenty-three thousand, two hundred and fifty umbrellas; nineteen eighty-seven to nineteen eighty-eight",
      "forty-six point six per cent",
      "nine hundred and seventy-nine metres",
      "one thousand eight hundred and ninety-two cups"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 56، تمرین 56.4."
  },
  {
    category: "vocabulary",
    lesson: 56,
    scope: "درس 56 — تمرین 56.4",
    text: "6 The country with the most telephones in the world is Monaco. It has 733 telephones per 1,000 population.",
    options: [
      "one thousand eight hundred and ninety-two cups",
      "forty-six point six per cent",
      "nine hundred and seventy-nine metres",
      "seven hundred and thirty-three telephones per thousand population"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 56، تمرین 56.4."
  },
  {
    category: "vocabulary",
    lesson: 56,
    scope: "درس 56 — تمرین 56.4",
    text: "7 The smallest country in the world is the Vatican City with an area of 0.4 sq km.",
    options: [
      "nine hundred and seventy-nine metres",
      "forty-six point six per cent",
      "nought point four square kilometres",
      "one thousand eight hundred and ninety-two cups"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 56، تمرین 56.4."
  },
  {
    category: "vocabulary",
    lesson: 57,
    scope: "درس 57 — تمرین 57.2",
    text: "1 video recorder",
    options: [
      "kind of sophisticated typewriter using a computer",
      "video recorder – a machine which records and plays back sound and pictures"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 57، تمرین 57.2."
  },
  {
    category: "vocabulary",
    lesson: 57,
    scope: "درس 57 — تمرین 57.2",
    text: "2 photocopier",
    options: [
      "photocopier – a machine which makes copies of documents",
      "kind of sophisticated typewriter using a computer"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 57، تمرین 57.2."
  },
  {
    category: "vocabulary",
    lesson: 57,
    scope: "درس 57 — تمرین 57.2",
    text: "3 fax machine",
    options: [
      "kind of sophisticated typewriter using a computer",
      "fax machine – a machine which makes copies of documents and sends them down telephone lines to another place"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 57، تمرین 57.2."
  },
  {
    category: "vocabulary",
    lesson: 57,
    scope: "درس 57 — تمرین 57.2",
    text: "4 tape recorder",
    options: [
      "tape recorder – a machine which records and plays back sound",
      "kind of sophisticated typewriter using a computer"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 57، تمرین 57.2."
  },
  {
    category: "vocabulary",
    lesson: 57,
    scope: "درس 57 — تمرین 57.2",
    text: "5 modem",
    options: [
      "kind of sophisticated typewriter using a computer",
      "modem – a piece of equipment allowing you to send information from one computer down telephone lines to another computer"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 57، تمرین 57.2."
  },
  {
    category: "vocabulary",
    lesson: 57,
    scope: "درس 57 — تمرین 57.2",
    text: "6 camcorder",
    options: [
      "camcorder – a camera which records moving pictures and sound",
      "kind of sophisticated typewriter using a computer"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 57، تمرین 57.2."
  },
  {
    category: "vocabulary",
    lesson: 57,
    scope: "درس 57 — تمرین 57.3",
    text: "1 [picture: computer]",
    options: [
      "An alarm clock is a clock with an alarm which goes off at the time that you want to wake up in the morning.",
      "A cordless iron is an iron which gets its power from a base unit on which it stands when not in use. It is not connected to the base unit by a flex and so can be used freely and easily.",
      "A coffee percolator is a useful piece of kitchen equipment which allows you to make fresh coffee.",
      "VDU stands for visual display unit and it is the part of the computer which includes the screen or monitor, on which you look at your work as you do it."
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 57، تمرین 57.3."
  },
  {
    category: "vocabulary",
    lesson: 57,
    scope: "درس 57 — تمرین 57.3",
    text: "2 [picture: iron]",
    options: [
      "A coffee percolator is a useful piece of kitchen equipment which allows you to make fresh coffee.",
      "VDU stands for visual display unit and it is the part of the computer which includes the screen or monitor, on which you look at your work as you do it.",
      "A cordless iron is an iron which gets its power from a base unit on which it stands when not in use. It is not connected to the base unit by a flex and so can be used freely and easily.",
      "An alarm clock is a clock with an alarm which goes off at the time that you want to wake up in the morning."
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 57، تمرین 57.3."
  },
  {
    category: "vocabulary",
    lesson: 57,
    scope: "درس 57 — تمرین 57.3",
    text: "3 [picture: coffee machine]",
    options: [
      "VDU stands for visual display unit and it is the part of the computer which includes the screen or monitor, on which you look at your work as you do it.",
      "A coffee percolator is a useful piece of kitchen equipment which allows you to make fresh coffee.",
      "A cordless iron is an iron which gets its power from a base unit on which it stands when not in use. It is not connected to the base unit by a flex and so can be used freely and easily.",
      "An alarm clock is a clock with an alarm which goes off at the time that you want to wake up in the morning."
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 57، تمرین 57.3."
  },
  {
    category: "vocabulary",
    lesson: 57,
    scope: "درس 57 — تمرین 57.3",
    text: "5 [picture: alarm clock]",
    options: [
      "A coffee percolator is a useful piece of kitchen equipment which allows you to make fresh coffee.",
      "VDU stands for visual display unit and it is the part of the computer which includes the screen or monitor, on which you look at your work as you do it.",
      "A cordless iron is an iron which gets its power from a base unit on which it stands when not in use. It is not connected to the base unit by a flex and so can be used freely and easily.",
      "An alarm clock is a clock with an alarm which goes off at the time that you want to wake up in the morning."
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 57، تمرین 57.3."
  },
  {
    category: "vocabulary",
    lesson: 57,
    scope: "درس 57 — تمرین 57.4",
    text: "1 discover",
    options: [
      "conclusion",
      "invention",
      "rotation",
      "discovery"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 57، تمرین 57.4."
  },
  {
    category: "vocabulary",
    lesson: 57,
    scope: "درس 57 — تمرین 57.4",
    text: "2 invent",
    options: [
      "rotation",
      "discovery",
      "invention",
      "conclusion"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 57، تمرین 57.4."
  },
  {
    category: "vocabulary",
    lesson: 57,
    scope: "درس 57 — تمرین 57.4",
    text: "3 rotate",
    options: [
      "discovery",
      "rotation",
      "invention",
      "conclusion"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 57، تمرین 57.4."
  },
  {
    category: "vocabulary",
    lesson: 57,
    scope: "درس 57 — تمرین 57.4",
    text: "4 conclude",
    options: [
      "conclusion",
      "discovery",
      "invention",
      "rotation"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 57، تمرین 57.4."
  },
  {
    category: "vocabulary",
    lesson: 57,
    scope: "درس 57 — تمرین 57.4",
    text: "6 analyse",
    options: [
      "invention",
      "discovery",
      "analysis",
      "rotation"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 57، تمرین 57.4."
  },
  {
    category: "vocabulary",
    lesson: 57,
    scope: "درس 57 — تمرین 57.4",
    text: "7 dissect",
    options: [
      "discovery",
      "dissection",
      "invention",
      "rotation"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 57، تمرین 57.4."
  },
  {
    category: "vocabulary",
    lesson: 57,
    scope: "درس 57 — تمرین 57.4",
    text: "9 combine",
    options: [
      "rotation",
      "discovery",
      "invention",
      "combination | Follow-up: Time and Newsweek often have articles on general scientific interest as does the newspaper, The Times."
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 57، تمرین 57.4."
  },
  {
    category: "vocabulary",
    lesson: 66,
    scope: "درس 66 — تمرین 66.1",
    text: "'It was me who broke the vase,' he ...................",
    options: [
      "whisper",
      "boasted",
      "murmur",
      "mumble"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 66، تمرین 66.1."
  },
  {
    category: "vocabulary",
    lesson: 66,
    scope: "درس 66 — تمرین 66.1",
    text: "'I am the cleverest person in the class,' the little boy ...................",
    options: [
      "shrieked",
      "whisper",
      "murmur",
      "mumble"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 66، تمرین 66.1."
  },
  {
    category: "vocabulary",
    lesson: 66,
    scope: "درس 66 — تمرین 66.1",
    text: "'Look, there's a mouse over there!' he ...................",
    options: [
      "mumble",
      "whisper",
      "murmur",
      "threatened"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 66، تمرین 66.1."
  },
  {
    category: "vocabulary",
    lesson: 66,
    scope: "درس 66 — تمرین 66.1",
    text: "'I'll stop your pocket money if you don't behave,' she ...................",
    options: [
      "murmur",
      "whisper",
      "stammered",
      "mumble"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 66، تمرین 66.1."
  },
  {
    category: "vocabulary",
    lesson: 66,
    scope: "درس 66 — تمرین 66.1",
    text: "'I-d-d-d-did it,' he ...................",
    options: [
      "whisper",
      "begged",
      "murmur",
      "mumble"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 66، تمرین 66.1."
  },
  {
    category: "vocabulary",
    lesson: 66,
    scope: "درس 66 — تمرین 66.1",
    text: "'Please, please, help me,' he ...................",
    options: [
      "complained",
      "whisper",
      "murmur",
      "mumble"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 66، تمرین 66.1."
  },
  {
    category: "vocabulary",
    lesson: 66,
    scope: "درس 66 — تمرین 66.1",
    text: "'This hotel is filthy,' she ...................",
    options: [
      "mumble",
      "whisper",
      "murmur",
      "urged"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 66، تمرین 66.1."
  },
  {
    category: "vocabulary",
    lesson: 66,
    scope: "درس 66 — تمرین 66.4",
    text: "EXAMPLE How do you describe a person who boasts a lot? boastful",
    options: [
      "an objection",
      "a complaint",
      "a threat",
      "a beggar"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 66، تمرین 66.4."
  },
  {
    category: "vocabulary",
    lesson: 66,
    scope: "درس 66 — تمرین 66.4",
    text: "What do you call: 1 what you make when you threaten?",
    options: [
      "a threat",
      "a complaint",
      "an objection",
      "a beggar"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 66، تمرین 66.4."
  },
  {
    category: "vocabulary",
    lesson: 66,
    scope: "درس 66 — تمرین 66.4",
    text: "2 what you make when you complain?",
    options: [
      "an objection",
      "a threat",
      "a complaint",
      "a beggar"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 66، تمرین 66.4."
  },
  {
    category: "vocabulary",
    lesson: 66,
    scope: "درس 66 — تمرین 66.4",
    text: "3 what you make when you object?",
    options: [
      "an objection",
      "a threat",
      "a complaint",
      "a beggar"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 66، تمرین 66.4."
  },
  {
    category: "vocabulary",
    lesson: 66,
    scope: "درس 66 — تمرین 66.4",
    text: "4 a person who begs for money on the streets?",
    options: [
      "a complaint",
      "a threat",
      "insistent",
      "an objection"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 66، تمرین 66.4."
  },
  {
    category: "vocabulary",
    lesson: 66,
    scope: "درس 66 — تمرین 66.4",
    text: "How do you describe: 5 someone who insists a lot?",
    options: [
      "a threat",
      "argumentative",
      "a complaint",
      "an objection"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 66، تمرین 66.4."
  },
  {
    category: "vocabulary",
    lesson: 66,
    scope: "درس 66 — تمرین 66.5",
    text: "1 Which verbs could replace ask in the sentence 'She asked me to dance with her', without changing the grammar of the sentence?",
    options: [
      "threatened",
      "a) to b) on c) about",
      "urged",
      "all except urge and beg"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 66، تمرین 66.5."
  },
  {
    category: "vocabulary",
    lesson: 66,
    scope: "درس 66 — تمرین 66.5",
    text: "2 Which prepositions usually follow a) object  b) insist  c) complain?",
    options: [
      "urged",
      "a) to b) on c) about",
      "threatened",
      "all except urge and beg"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 66، تمرین 66.5."
  },
  {
    category: "vocabulary",
    lesson: 66,
    scope: "درس 66 — تمرین 66.5",
    text: "3 Which verb could grammatically replace promise in 'He promised to do it'?",
    options: [
      "threatened",
      "urged",
      "a) to b) on c) about",
      "all except urge and beg"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 66، تمرین 66.5."
  },
  {
    category: "vocabulary",
    lesson: 66,
    scope: "درس 66 — تمرین 66.5",
    text: "4 Which of the verbs can be followed by 'that' and a clause?",
    options: [
      "threatened",
      "urged",
      "a) to b) on c) about",
      "all except urge and beg"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 66، تمرین 66.5."
  },
  {
    category: "vocabulary",
    lesson: 66,
    scope: "درس 66 — تمرین 66.5",
    text: "5 Find a synonym for each of the six verbs in the fourth column of the table.",
    options: [
      "a) to b) on c) about",
      "urged",
      "complain – grumble; maintain – declare; confess – admit; urge – encourage; beg – plead; grumble – moan.",
      "threatened"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 66، تمرین 66.5."
  },
  {
    category: "vocabulary",
    lesson: 68,
    scope: "درس 68 — تمرین 68.2",
    text: "EXAMPLE (Parent to child) Take your thumb out of your mouth! The child is sucking its thumb.",
    options: [
      "Someone is snoring.",
      "Someone is yawning.",
      "Someone is hiccoughing.",
      "Someone is coughing and"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 68، تمرین 68.2."
  },
  {
    category: "vocabulary",
    lesson: 68,
    scope: "درس 68 — تمرین 68.2",
    text: "1 Listen to that! I can't sleep in the same room as him.",
    options: [
      "Someone is coughing and",
      "Someone is snoring.",
      "Someone is hiccoughing.",
      "Someone is yawning."
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 68، تمرین 68.2."
  },
  {
    category: "vocabulary",
    lesson: 68,
    scope: "درس 68 — تمرین 68.2",
    text: "2 Am I boring you?",
    options: [
      "Someone is yawning.",
      "Someone is snoring.",
      "Someone is hiccoughing.",
      "Someone is coughing and"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 68، تمرین 68.2."
  },
  {
    category: "vocabulary",
    lesson: 68,
    scope: "درس 68 — تمرین 68.2",
    text: "3 If you have a drink of water, it might stop!",
    options: [
      "Someone is snoring.",
      "Someone is coughing and",
      "Someone is yawning.",
      "Someone is hiccoughing."
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 68، تمرین 68.2."
  },
  {
    category: "vocabulary",
    lesson: 68,
    scope: "درس 68 — تمرین 68.2",
    text: "4 I'd have a honey and lemon drink if I were you!",
    options: [
      "Someone's stomach is rumbling.",
      "Someone is snoring.",
      "Someone is yawning.",
      "Someone is hiccoughing."
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 68، تمرین 68.2."
  },
  {
    category: "vocabulary",
    lesson: 68,
    scope: "درس 68 — تمرین 68.2",
    text: "5 Are you hungry?",
    options: [
      "Someone is hiccoughing.",
      "Someone is snoring.",
      "Someone is yawning.",
      "Someone has burped."
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 68، تمرین 68.2."
  },
  {
    category: "vocabulary",
    lesson: 68,
    scope: "درس 68 — تمرین 68.3",
    text: "2",
    options: [
      "sigh",
      "frown",
      "grin",
      "blush"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 68، تمرین 68.3."
  },
  {
    category: "vocabulary",
    lesson: 68,
    scope: "درس 68 — تمرین 68.3",
    text: "3",
    options: [
      "grin",
      "blush",
      "frown",
      "sigh"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 68، تمرین 68.3."
  },
  {
    category: "vocabulary",
    lesson: 68,
    scope: "درس 68 — تمرین 68.3",
    text: "4",
    options: [
      "blush",
      "grin",
      "frown",
      "sigh"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 68، تمرین 68.3."
  },
  {
    category: "vocabulary",
    lesson: 68,
    scope: "درس 68 — تمرین 68.3",
    text: "5",
    options: [
      "sigh",
      "blush",
      "frown",
      "grin"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 68، تمرین 68.3."
  },
  {
    category: "vocabulary",
    lesson: 68,
    scope: "درس 68 — تمرین 68.3",
    text: "6",
    options: [
      "grin",
      "blush",
      "frown",
      "sneeze"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 68، تمرین 68.3."
  },
  {
    category: "vocabulary",
    lesson: 68,
    scope: "درس 68 — تمرین 68.3",
    text: "7",
    options: [
      "frown",
      "blush",
      "snore",
      "grin"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 68، تمرین 68.3."
  },
  {
    category: "vocabulary",
    lesson: 68,
    scope: "درس 68 — تمرین 68.3",
    text: "8",
    options: [
      "blush",
      "wink",
      "frown",
      "grin"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 68، تمرین 68.3."
  },
  {
    category: "vocabulary",
    lesson: 68,
    scope: "درس 68 — تمرین 68.3",
    text: "9",
    options: [
      "yawn",
      "blush",
      "frown",
      "grin"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 68، تمرین 68.3."
  },
  {
    category: "vocabulary",
    lesson: 68,
    scope: "درس 68 — تمرین 68.4",
    text: "1 a special kind of gum",
    options: [
      "chewing",
      "perspiring",
      "lick",
      "swallow"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 68، تمرین 68.4."
  },
  {
    category: "vocabulary",
    lesson: 68,
    scope: "درس 68 — تمرین 68.4",
    text: "2 a more formal word for sweating",
    options: [
      "swallow",
      "chewing",
      "lick",
      "perspiring"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 68، تمرین 68.4."
  },
  {
    category: "vocabulary",
    lesson: 68,
    scope: "درس 68 — تمرین 68.4",
    text: "3 what you need to do to a stamp",
    options: [
      "perspiring",
      "chewing",
      "lick",
      "swallow"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 68، تمرین 68.4."
  },
  {
    category: "vocabulary",
    lesson: 68,
    scope: "درس 68 — تمرین 68.4",
    text: "4 try to do this quickly with pills",
    options: [
      "chewing",
      "swallow",
      "perspiring",
      "lick"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 68، تمرین 68.4."
  },
  {
    category: "vocabulary",
    lesson: 68,
    scope: "درس 68 — تمرین 68.4",
    text: "5 smile broadly",
    options: [
      "grin",
      "chewing",
      "perspiring",
      "lick"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 68، تمرین 68.4."
  },
  {
    category: "vocabulary",
    lesson: 68,
    scope: "درس 68 — تمرین 68.4",
    text: "6 James Bond liked to have his drinks ........................ not stirred.",
    options: [
      "lick",
      "chewing",
      "perspiring",
      "shaken"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 68، تمرین 68.4."
  },
  {
    category: "vocabulary",
    lesson: 74,
    scope: "درس 74 — تمرین 74.1",
    text: "1 Oh no, we own it. Most houses here are owner-occupied.",
    options: [
      "Which room have I been allocated?",
      "Could I possibly borrow your camera? / Would you lend me your camera?",
      "Do you rent this house?",
      "Does the school provide exercise books and things?"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 74، تمرین 74.1."
  },
  {
    category: "vocabulary",
    lesson: 74,
    scope: "درس 74 — تمرین 74.1",
    text: "2 Well, sorry, no; I need it to take photos myself.",
    options: [
      "Do you rent this house?",
      "Could I possibly borrow your camera? / Would you lend me your camera?",
      "Which room have I been allocated?",
      "Does the school provide exercise books and things?"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 74، تمرین 74.1."
  },
  {
    category: "vocabulary",
    lesson: 74,
    scope: "درس 74 — تمرین 74.1",
    text: "3 You will be in Room 44B. It's quite a big office.",
    options: [
      "Which room have I been allocated?",
      "Do you rent this house?",
      "Could I possibly borrow your camera? / Would you lend me your camera?",
      "Does the school provide exercise books and things?"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 74، تمرین 74.1."
  },
  {
    category: "vocabulary",
    lesson: 74,
    scope: "درس 74 — تمرین 74.1",
    text: "4 No, you have to buy exercise books and pens yourself. The school doesn't do that.",
    options: [
      "Which room have I been allocated?",
      "Do you rent this house?",
      "Could I possibly borrow your camera? / Would you lend me your camera?",
      "Does the school provide exercise books and things?"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 74، تمرین 74.1."
  },
  {
    category: "vocabulary",
    lesson: 74,
    scope: "درس 74 — تمرین 74.1",
    text: "5 Actually, I've already given something. Sorry.",
    options: [
      "Could I possibly borrow your camera? / Would you lend me your camera?",
      "Do you rent this house?",
      "Would you like to contribute to our collection for the disabled?",
      "Which room have I been allocated?"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 74، تمرین 74.1."
  },
  {
    category: "vocabulary",
    lesson: 74,
    scope: "درس 74 — تمرین 74.1",
    text: "6 Oh, just a small house with a garden, you know, typical.",
    options: [
      "Do you rent this house?",
      "What sort of property do you have / live in / own?",
      "Could I possibly borrow your camera? / Would you lend me your camera?",
      "Which room have I been allocated?"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 74، تمرین 74.1."
  },
  {
    category: "vocabulary",
    lesson: 74,
    scope: "درس 74 — تمرین 74.1",
    text: "7 Yes, the charge is £200 for one that seats 30 people.",
    options: [
      "Is it possible to hire a room for a meeting?",
      "Do you rent this house?",
      "Could I possibly borrow your camera? / Would you lend me your camera?",
      "Which room have I been allocated?"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 74، تمرین 74.1."
  },
  {
    category: "vocabulary",
    lesson: 74,
    scope: "درس 74 — تمرین 74.2",
    text: "1 A millionaire ________ his entire library to the school.",
    options: [
      "presented",
      "provided",
      "The millionaire donated his entire library to the school.",
      "donated"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 74، تمرین 74.2."
  },
  {
    category: "vocabulary",
    lesson: 74,
    scope: "درس 74 — تمرین 74.2",
    text: "2 The Director was ________ the best parking-place.",
    options: [
      "provided",
      "allocated",
      "presented",
      "donated"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 74، تمرین 74.2."
  },
  {
    category: "vocabulary",
    lesson: 74,
    scope: "درس 74 — تمرین 74.2",
    text: "3 My mother's cousin ________ me £5,000 in her will.",
    options: [
      "My mother's cousin left me £5,000 in her will.",
      "provided",
      "presented",
      "donated"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 74، تمرین 74.2."
  },
  {
    category: "vocabulary",
    lesson: 74,
    scope: "درس 74 — تمرین 74.2",
    text: "4 A farmer nearby ________ us with logs for the fire.",
    options: [
      "catered",
      "presented",
      "donated",
      "provided"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 74، تمرین 74.2."
  },
  {
    category: "vocabulary",
    lesson: 74,
    scope: "درس 74 — تمرین 74.2",
    text: "5 When I retired they ________ me with a camcorder.",
    options: [
      "donated",
      "provided",
      "presented",
      "catered"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 74، تمرین 74.2."
  },
  {
    category: "vocabulary",
    lesson: 74,
    scope: "درس 74 — تمرین 74.2",
    text: "6 The restaurant ________ for vegetarians.",
    options: [
      "provided",
      "The restaurant catered for vegetarians.",
      "presented",
      "donated"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 74، تمرین 74.2."
  },
  {
    category: "vocabulary",
    lesson: 74,
    scope: "درس 74 — تمرین 74.3",
    text: "1 That bed has been ________ in the family. It was my great-grandmother's originally.",
    options: [
      "give out",
      "hand over",
      "handed down",
      "let go of"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 74، تمرین 74.3."
  },
  {
    category: "vocabulary",
    lesson: 74,
    scope: "درس 74 — تمرین 74.3",
    text: "2 Would you help us ________ some leaflets in the shopping-centre?",
    options: [
      "hand over",
      "give out",
      "let go of",
      "give away"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 74، تمرین 74.3."
  },
  {
    category: "vocabulary",
    lesson: 74,
    scope: "درس 74 — تمرین 74.3",
    text: "3 I don't want to ________ that old painting. It might be valuable one day.",
    options: [
      "let go of",
      "hand over",
      "give out",
      "give away"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 74، تمرین 74.3."
  },
  {
    category: "vocabulary",
    lesson: 74,
    scope: "درس 74 — تمرین 74.3",
    text: "4 When Tim's bike got too small for him we ________ it ________ ; it wasn't worth trying to sell it, too much bother.",
    options: [
      "let go of",
      "hand over",
      "give out",
      "gave ... away"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 74، تمرین 74.3."
  },
  {
    category: "vocabulary",
    lesson: 74,
    scope: "درس 74 — تمرین 74.3",
    text: "5 The landlord will ________ the keys as soon as you pay the deposit and the first month's rent.",
    options: [
      "let go of",
      "give out",
      "hand over",
      "give away"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 74، تمرین 74.3."
  },
  {
    category: "vocabulary",
    lesson: 74,
    scope: "درس 74 — تمرین 74.4",
    text: "1 you would hand over to a mugger if threatened.",
    options: [
      "a book / a picture of someone",
      "jewellery",
      "your wallet",
      "hand-outs / tests"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 74، تمرین 74.4."
  },
  {
    category: "vocabulary",
    lesson: 74,
    scope: "درس 74 — تمرین 74.4",
    text: "2 has been handed down in your family.",
    options: [
      "your wallet",
      "jewellery",
      "a book / a picture of someone",
      "hand-outs / tests"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 74، تمرین 74.4."
  },
  {
    category: "vocabulary",
    lesson: 74,
    scope: "درس 74 — تمرین 74.4",
    text: "3 you have given away at some time in your life.",
    options: [
      "a book / a picture of someone",
      "your wallet",
      "jewellery",
      "hand-outs / tests"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 74، تمرین 74.4."
  },
  {
    category: "vocabulary",
    lesson: 74,
    scope: "درس 74 — تمرین 74.4",
    text: "4 is often given out in classrooms.",
    options: [
      "a book / a picture of someone",
      "your wallet",
      "jewellery",
      "hand-outs / tests"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 74، تمرین 74.4."
  },
  {
    category: "vocabulary",
    lesson: 74,
    scope: "درس 74 — تمرین 74.4",
    text: "5 you value and would not want to let go of.",
    options: [
      "jewellery",
      "your wallet",
      "an antique / a set of books",
      "a book / a picture of someone"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 74، تمرین 74.4."
  },
  {
    category: "vocabulary",
    lesson: 76,
    scope: "درس 76 — تمرین 76.1",
    text: "The cover of a well-produced brochure.",
    options: [
      "glossy",
      "downy",
      "slippery",
      "prickly"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 76، تمرین 76.1."
  },
  {
    category: "vocabulary",
    lesson: 76,
    scope: "درس 76 — تمرین 76.1",
    text: "The feathers in a pillow or duvet.",
    options: [
      "prickly",
      "glossy",
      "slippery",
      "downy"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 76، تمرین 76.1."
  },
  {
    category: "vocabulary",
    lesson: 76,
    scope: "درس 76 — تمرین 76.1",
    text: "A wet bar of soap.",
    options: [
      "downy",
      "glossy",
      "slippery",
      "prickly"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 76، تمرین 76.1."
  },
  {
    category: "vocabulary",
    lesson: 76,
    scope: "درس 76 — تمرین 76.1",
    text: "The branches of a rose-bush.",
    options: [
      "glossy",
      "prickly",
      "downy",
      "slippery"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 76، تمرین 76.1."
  },
  {
    category: "vocabulary",
    lesson: 76,
    scope: "درس 76 — تمرین 76.1",
    text: "A gravel pathway.",
    options: [
      "rough",
      "glossy",
      "downy",
      "slippery"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 76، تمرین 76.1."
  },
  {
    category: "vocabulary",
    lesson: 76,
    scope: "درس 76 — تمرین 76.1",
    text: "The inside of a pair of sheepskin gloves.",
    options: [
      "slippery",
      "glossy",
      "downy",
      "furry"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 76، تمرین 76.1."
  },
  {
    category: "vocabulary",
    lesson: 76,
    scope: "درس 76 — تمرین 76.1",
    text: "The edge of a piece of broken, rusty metal.",
    options: [
      "downy",
      "glossy",
      "jagged",
      "slippery"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 76، تمرین 76.1."
  },
  {
    category: "vocabulary",
    lesson: 76,
    scope: "درس 76 — تمرین 76.1",
    text: "Heavy, stone-ground wholemeal flour.",
    options: [
      "glossy",
      "coarse",
      "downy",
      "slippery"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 76، تمرین 76.1."
  },
  {
    category: "vocabulary",
    lesson: 76,
    scope: "درس 76 — تمرین 76.1",
    text: "The surface of a mirror.",
    options: [
      "polished",
      "glossy",
      "downy",
      "slippery"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 76، تمرین 76.1."
  },
  {
    category: "vocabulary",
    lesson: 76,
    scope: "درس 76 — تمرین 76.1",
    text: "An old, dead log on the forest floor.",
    options: [
      "slippery",
      "glossy",
      "downy",
      "gnarled"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 76، تمرین 76.1."
  },
  {
    category: "vocabulary",
    lesson: 76,
    scope: "درس 76 — تمرین 76.2",
    text: "something sleek to the touch.",
    options: [
      "a heavy-duty carpet; a garden path",
      "a pair of silk stockings or a silk blouse or pyjamas; the metal surface of a hi-fi or television.",
      "a highly-varnished table-top; a mirror; a brass object"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 76، تمرین 76.2."
  },
  {
    category: "vocabulary",
    lesson: 76,
    scope: "درس 76 — تمرین 76.2",
    text: "something rough underfoot.",
    options: [
      "a pair of silk stockings or a silk blouse or pyjamas; the metal surface of a hi-fi or television.",
      "a heavy-duty carpet; a garden path",
      "a highly-varnished table-top; a mirror; a brass object"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 76، تمرین 76.2."
  },
  {
    category: "vocabulary",
    lesson: 76,
    scope: "درس 76 — تمرین 76.2",
    text: "something with a polished surface.",
    options: [
      "a pair of silk stockings or a silk blouse or pyjamas; the metal surface of a hi-fi or television.",
      "a highly-varnished table-top; a mirror; a brass object",
      "a heavy-duty carpet; a garden path"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 76، تمرین 76.2."
  },
  {
    category: "vocabulary",
    lesson: 76,
    scope: "درس 76 — تمرین 76.4",
    text: "A creature with a sleek coat.",
    options: [
      "a big cat such as a panther or leopard",
      "a fish; an eel",
      "a hedgehog; a porcupine",
      "a bear; a panda"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 76، تمرین 76.4."
  },
  {
    category: "vocabulary",
    lesson: 76,
    scope: "درس 76 — تمرین 76.4",
    text: "A slippery creature.",
    options: [
      "a bear; a panda",
      "a big cat such as a panther or leopard",
      "a hedgehog; a porcupine",
      "a fish; an eel"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 76، تمرین 76.4."
  },
  {
    category: "vocabulary",
    lesson: 76,
    scope: "درس 76 — تمرین 76.4",
    text: "A prickly creature.",
    options: [
      "a fish; an eel",
      "a big cat such as a panther or leopard",
      "a hedgehog; a porcupine",
      "a bear; a panda"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 76، تمرین 76.4."
  },
  {
    category: "vocabulary",
    lesson: 76,
    scope: "درس 76 — تمرین 76.4",
    text: "A creature with a furry coat.",
    options: [
      "a big cat such as a panther or leopard",
      "a bear; a panda",
      "a fish; an eel",
      "a hedgehog; a porcupine"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 76، تمرین 76.4."
  },
  {
    category: "vocabulary",
    lesson: 76,
    scope: "درس 76 — تمرین 76.4",
    text: "A creature with a downy coat.",
    options: [
      "a baby chick or duckling; the new-born of many animals",
      "a big cat such as a panther or leopard",
      "a fish; an eel",
      "a hedgehog; a porcupine"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 76، تمرین 76.4."
  },
  {
    category: "vocabulary",
    lesson: 78,
    scope: "درس 78 — تمرین 78.1",
    text: "The small amount of money donated is just a drop in the ________ compared with the vast sum we need. [tiny contribution compared with what is needed]",
    options: [
      "clanger",
      "ocean",
      "shot",
      "plate"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 78، تمرین 78.1."
  },
  {
    category: "vocabulary",
    lesson: 78,
    scope: "درس 78 — تمرین 78.1",
    text: "You really dropped a ________ when you criticised the Americans last night; that man opposite you was from New York! [said something inappropriate/embarrassing]",
    options: [
      "clanger",
      "shot",
      "ocean",
      "plate"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 78، تمرین 78.1."
  },
  {
    category: "vocabulary",
    lesson: 78,
    scope: "درس 78 — تمرین 78.1",
    text: "I can't do that job as well; I've got enough on my ________ as it is. [have more than enough work]",
    options: [
      "ocean",
      "clanger",
      "shot",
      "plate"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 78، تمرین 78.1."
  },
  {
    category: "vocabulary",
    lesson: 78,
    scope: "درس 78 — تمرین 78.1",
    text: "When I told her she just flew off the ________ and shouted at me. [lost her temper]",
    options: [
      "shot",
      "clanger",
      "handle",
      "ocean"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 78، تمرین 78.1."
  },
  {
    category: "vocabulary",
    lesson: 78,
    scope: "درس 78 — تمرین 78.1",
    text: "His father was a gambler too. He's a real chip off the old ________ . [just like one's parents/grandparents]",
    options: [
      "clanger",
      "block",
      "shot",
      "ocean"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 78، تمرین 78.1."
  },
  {
    category: "vocabulary",
    lesson: 78,
    scope: "درس 78 — تمرین 78.1",
    text: "I wasn't really sure; I guessed it; it was just a ________ in the dark. [a wild guess]",
    options: [
      "shot",
      "clanger",
      "ocean",
      "plate"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 78، تمرین 78.1."
  },
  {
    category: "vocabulary",
    lesson: 78,
    scope: "درس 78 — تمرین 78.4",
    text: "It's midnight. Time to hit the sack.",
    options: [
      "go to bed",
      "not talking; behaving in an unfriendly way",
      "infrequently / not often"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 78، تمرین 78.4."
  },
  {
    category: "vocabulary",
    lesson: 78,
    scope: "درس 78 — تمرین 78.4",
    text: "I can't understand why he's giving me the cold shoulder. He's usually so friendly.",
    options: [
      "not talking; behaving in an unfriendly way",
      "go to bed",
      "infrequently / not often"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 78، تمرین 78.4."
  },
  {
    category: "vocabulary",
    lesson: 78,
    scope: "درس 78 — تمرین 78.4",
    text: "I haven't seen Sam for ages. We only get together once in a blue moon.",
    options: [
      "infrequently / not often",
      "go to bed",
      "not talking; behaving in an unfriendly way"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 78، تمرین 78.4."
  },
  {
    category: "vocabulary",
    lesson: 82,
    scope: "درس 82 — تمرین 82.5",
    text: "1",
    options: [
      "middle-of-the-road",
      "an odd ball",
      "over the top"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 82، تمرین 82.5."
  },
  {
    category: "vocabulary",
    lesson: 82,
    scope: "درس 82 — تمرین 82.5",
    text: "2",
    options: [
      "an odd ball",
      "middle-of-the-road",
      "over the top"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 82، تمرین 82.5."
  },
  {
    category: "vocabulary",
    lesson: 82,
    scope: "درس 82 — تمرین 82.5",
    text: "3",
    options: [
      "an odd ball",
      "over the top",
      "middle-of-the-road"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 82، تمرین 82.5."
  },
  {
    category: "vocabulary",
    lesson: 83,
    scope: "درس 83 — تمرین 83.2",
    text: "2 your boss said you had to do again a piece of work you'd already done three times.",
    options: [
      "On cloud nine, over the moon.",
      "Probably like a bear with a sore head and in a (black) mood!",
      "Probably quite browned off, or even in a (black) mood."
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 83، تمرین 83.2."
  },
  {
    category: "vocabulary",
    lesson: 83,
    scope: "درس 83 — تمرین 83.2",
    text: "4 you had a bad toothache and your neighbour was making a lot of noise late at night.",
    options: [
      "On cloud nine, over the moon.",
      "Probably quite browned off, or even in a (black) mood.",
      "Probably like a bear with a sore head and in a (black) mood!"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 83، تمرین 83.2."
  },
  {
    category: "vocabulary",
    lesson: 83,
    scope: "درس 83 — تمرین 83.2",
    text: "6 someone you were secretly in love with told you they were in love with you.",
    options: [
      "Probably like a bear with a sore head and in a (black) mood!",
      "Probably quite browned off, or even in a (black) mood.",
      "On cloud nine, over the moon."
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 83، تمرین 83.2."
  },
  {
    category: "vocabulary",
    lesson: 83,
    scope: "درس 83 — تمرین 83.5",
    text: "1 I can't decide about that job in Paris.",
    options: [
      "I've been on the edge of my seat all day. What's happened? Tell me!",
      "I'm in two minds about that job in Paris.",
      "Her son got itchy feet and went off to Uruguay.",
      "Everyone was up in arms when they cancelled the trip."
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 83، تمرین 83.5."
  },
  {
    category: "vocabulary",
    lesson: 83,
    scope: "درس 83 — تمرین 83.5",
    text: "2 I've been in suspense all day. What's happened? Tell me!",
    options: [
      "I've been on the edge of my seat all day. What's happened? Tell me!",
      "I'm in two minds about that job in Paris.",
      "Her son got itchy feet and went off to Uruguay.",
      "Everyone was up in arms when they cancelled the trip."
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 83، تمرین 83.5."
  },
  {
    category: "vocabulary",
    lesson: 83,
    scope: "درس 83 — تمرین 83.5",
    text: "3 Her son became restless to travel and went off to Uruguay.",
    options: [
      "Everyone was up in arms when they cancelled the trip.",
      "I'm in two minds about that job in Paris.",
      "I've been on the edge of my seat all day. What's happened? Tell me!",
      "Her son got itchy feet and went off to Uruguay."
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 83، تمرین 83.5."
  },
  {
    category: "vocabulary",
    lesson: 83,
    scope: "درس 83 — تمرین 83.5",
    text: "4 Everyone protested loudly when they cancelled the trip.",
    options: [
      "I've been on the edge of my seat all day. What's happened? Tell me!",
      "I'm in two minds about that job in Paris.",
      "Everyone was up in arms when they cancelled the trip.",
      "Her son got itchy feet and went off to Uruguay."
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 83، تمرین 83.5."
  },
  {
    category: "vocabulary",
    lesson: 84,
    scope: "درس 84 — تمرین 84.1",
    text: "2 be in a fix",
    options: [
      "to be in a fix (be in difficulty) get a fix on your position (find out exactly where you are) something is fixed in your mind",
      "pour oil on troubled waters (calm a problematic situation) pour cold water on an idea / a plan (criticise something so that people don't want to do it any more) pour your heart out to somebody (tell them all your troubles) it's pouring with rain (raining very heavily)",
      "stir things up (cause trouble"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 84، تمرین 84.1."
  },
  {
    category: "vocabulary",
    lesson: 84,
    scope: "درس 84 — تمرین 84.1",
    text: "3 to pour oil on troubled waters",
    options: [
      "pour oil on troubled waters (calm a problematic situation) pour cold water on an idea / a plan (criticise something so that people don't want to do it any more) pour your heart out to somebody (tell them all your troubles) it's pouring with rain (raining very heavily)",
      "to be in a fix (be in difficulty) get a fix on your position (find out exactly where you are) something is fixed in your mind",
      "stir things up (cause trouble"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 84، تمرین 84.1."
  },
  {
    category: "vocabulary",
    lesson: 84,
    scope: "درس 84 — تمرین 84.1",
    text: "4 to stir things up",
    options: [
      "stir things up (cause trouble",
      "to be in a fix (be in difficulty) get a fix on your position (find out exactly where you are) something is fixed in your mind",
      "pour oil on troubled waters (calm a problematic situation) pour cold water on an idea / a plan (criticise something so that people don't want to do it any more) pour your heart out to somebody (tell them all your troubles) it's pouring with rain (raining very heavily)"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 84، تمرین 84.1."
  },
  {
    category: "vocabulary",
    lesson: 84,
    scope: "درس 84 — تمرین 84.3",
    text: "2 The teachers want one thing, the students want the exact opposite. I'm sure we can find a happy medium.",
    options: [
      "behave yourself / follow the rules",
      "in great suspense",
      "are found together in the same place and connected to one another",
      "a compromise"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 84، تمرین 84.3."
  },
  {
    category: "vocabulary",
    lesson: 84,
    scope: "درس 84 — تمرین 84.3",
    text: "3 We were on tenterhooks all night waiting for news from the hospital. They finally rang us at 6.30 a.m.",
    options: [
      "are found together in the same place and connected to one another",
      "a compromise",
      "in great suspense",
      "behave yourself / follow the rules"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 84، تمرین 84.3."
  },
  {
    category: "vocabulary",
    lesson: 84,
    scope: "درس 84 — تمرین 84.3",
    text: "4 Poverty and crime go hand in hand in this part of town.",
    options: [
      "a compromise",
      "are found together in the same place and connected to one another",
      "in great suspense",
      "behave yourself / follow the rules"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 84، تمرین 84.3."
  },
  {
    category: "vocabulary",
    lesson: 84,
    scope: "درس 84 — تمرین 84.3",
    text: "5 You've been in a lot of trouble lately; you'd better toe the line from now on.",
    options: [
      "behave yourself / follow the rules",
      "a compromise",
      "in great suspense",
      "are found together in the same place and connected to one another"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 84، تمرین 84.3."
  },
  {
    category: "vocabulary",
    lesson: 84,
    scope: "درس 84 — تمرین 84.4",
    text: "1 Well, we've buried the hatchet for the moment, but I'm sure it's not for good.",
    options: [
      "Are you still quarrelling all the time with Mabel?",
      "Has the new job been a success?",
      "Should I ring Maurice? Or send him a little gift, perhaps?"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 84، تمرین 84.4."
  },
  {
    category: "vocabulary",
    lesson: 84,
    scope: "درس 84 — تمرین 84.4",
    text: "2 Yes, it's been a real turning-point in my career.",
    options: [
      "Has the new job been a success?",
      "Are you still quarrelling all the time with Mabel?",
      "Should I ring Maurice? Or send him a little gift, perhaps?"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 84، تمرین 84.4."
  },
  {
    category: "vocabulary",
    lesson: 84,
    scope: "درس 84 — تمرین 84.4",
    text: "3 Yes, I think it would go a long way. You know how sensitive he is, and how he appreciates little gestures.",
    options: [
      "Should I ring Maurice? Or send him a little gift, perhaps?",
      "Are you still quarrelling all the time with Mabel?",
      "Has the new job been a success?"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 84، تمرین 84.4."
  },
  {
    category: "vocabulary",
    lesson: 85,
    scope: "درس 85 — تمرین 85.1",
    text: "The hotel we were staying in was absolutely superb.",
    options: [
      "You're streets ahead of me in understanding all this new technology; I'm impressed.",
      "Joe is head and shoulders above the other kids when it comes to doing hard sums.",
      "This restaurant knocks spots off all the other restaurants in town.",
      "The hotel we were staying in was out of this world."
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 85، تمرین 85.1."
  },
  {
    category: "vocabulary",
    lesson: 85,
    scope: "درس 85 — تمرین 85.1",
    text: "Joe is a long way above the other kids when it comes to doing hard sums.",
    options: [
      "This restaurant knocks spots off all the other restaurants in town.",
      "The hotel we were staying in was out of this world.",
      "Joe is head and shoulders above the other kids when it comes to doing hard sums.",
      "You're streets ahead of me in understanding all this new technology; I'm impressed."
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 85، تمرین 85.1."
  },
  {
    category: "vocabulary",
    lesson: 85,
    scope: "درس 85 — تمرین 85.1",
    text: "This restaurant is much, much better than all the other restaurants in town.",
    options: [
      "The hotel we were staying in was out of this world.",
      "This restaurant knocks spots off all the other restaurants in town.",
      "Joe is head and shoulders above the other kids when it comes to doing hard sums.",
      "You're streets ahead of me in understanding all this new technology; I'm impressed."
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 85، تمرین 85.1."
  },
  {
    category: "vocabulary",
    lesson: 85,
    scope: "درس 85 — تمرین 85.1",
    text: "You're a long way ahead of me in understanding all this new technology; I'm impressed.",
    options: [
      "You're streets ahead of me in understanding all this new technology; I'm impressed.",
      "The hotel we were staying in was out of this world.",
      "Joe is head and shoulders above the other kids when it comes to doing hard sums.",
      "This restaurant knocks spots off all the other restaurants in town."
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 85، تمرین 85.1."
  },
  {
    category: "vocabulary",
    lesson: 85,
    scope: "درس 85 — تمرین 85.4",
    text: "She said I was the best boss they'd ever had. It was obvious she was praising me sincerely. I wonder what she wants?",
    options: [
      "He often runs down his school.",
      "She said I was the best boss they'd ever had. It was obvious she was buttering me up. I wonder what she wants?",
      "She always picks holes in everything I say."
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 85، تمرین 85.4."
  },
  {
    category: "vocabulary",
    lesson: 85,
    scope: "درس 85 — تمرین 85.4",
    text: "He often says how wonderful his school is.",
    options: [
      "She said I was the best boss they'd ever had. It was obvious she was buttering me up. I wonder what she wants?",
      "He often runs down his school.",
      "She always picks holes in everything I say."
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 85، تمرین 85.4."
  },
  {
    category: "vocabulary",
    lesson: 85,
    scope: "درس 85 — تمرین 85.4",
    text: "She always praises everything I say.",
    options: [
      "She said I was the best boss they'd ever had. It was obvious she was buttering me up. I wonder what she wants?",
      "She always picks holes in everything I say.",
      "He often runs down his school."
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 85، تمرین 85.4."
  },
  {
    category: "vocabulary",
    lesson: 87,
    scope: "درس 87 — تمرین 87.1",
    text: "A: I'll give you $85. B: No, $100 or nothing. A: Oh, come on. Look, $90, there. B: No, I said $100 and I mean $100. What's B doing?",
    options: [
      "A could be described as someone who has a finger in every pie.",
      "B is driving a hard bargain.",
      "A seems to have the song 'Lady in Red' on the brain.",
      "A seems to have bought a real pig in a poke."
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 87، تمرین 87.1."
  },
  {
    category: "vocabulary",
    lesson: 87,
    scope: "درس 87 — تمرین 87.1",
    text: "A: I'm president of the squash club, I'm on the teacher-parent committee and I run three youth clubs. B: Really? A: Yes, oh, and I'm on that working party at the Social Centre, and there's the Union … What sort of person could A be described as?",
    options: [
      "A could be described as someone who has a finger in every pie.",
      "B is driving a hard bargain.",
      "A seems to have the song 'Lady in Red' on the brain.",
      "A seems to have bought a real pig in a poke."
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 87، تمرین 87.1."
  },
  {
    category: "vocabulary",
    lesson: 87,
    scope: "درس 87 — تمرین 87.1",
    text: "A: Lady in red, la-da-da-di-da … B: I wish you'd stop singing that blasted song! A: What? Oh, sorry … Lady in red, la-la … What's A's problem?",
    options: [
      "A seems to have bought a real pig in a poke.",
      "B is driving a hard bargain.",
      "A could be described as someone who has a finger in every pie.",
      "A seems to have the song 'Lady in Red' on the brain."
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 87، تمرین 87.1."
  },
  {
    category: "vocabulary",
    lesson: 87,
    scope: "درس 87 — تمرین 87.1",
    text: "A: Oh, no! You know that box of wine glasses I bought from that guy in the street? Half of them are cracked! B: Well, you should have looked at them first. It's your stupid fault. What has A done?",
    options: [
      "A could be described as someone who has a finger in every pie.",
      "B is driving a hard bargain.",
      "A seems to have bought a real pig in a poke.",
      "A seems to have the song 'Lady in Red' on the brain."
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 87، تمرین 87.1."
  },
  {
    category: "vocabulary",
    lesson: 87,
    scope: "درس 87 — تمرین 87.2",
    text: "Can I tell you about a problem I have? I just have to tell somebody. It's been bothering me for a while now.",
    options: [
      "They charged us £100 for a tiny room without a bath. It was a real rip-off! or They really ripped us off!",
      "Can I tell you about a problem I have? I just have to get it off my chest. It's been bothering me for a while now.",
      "There'll just be time to have a bite to eat before the show.",
      "I think I'll just go upstairs and have a nap, if nobody objects."
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 87، تمرین 87.2."
  },
  {
    category: "vocabulary",
    lesson: 87,
    scope: "درس 87 — تمرین 87.2",
    text: "They charged us £100 for a tiny room without a bath. It was just robbery!",
    options: [
      "They charged us £100 for a tiny room without a bath. It was a real rip-off! or They really ripped us off!",
      "Can I tell you about a problem I have? I just have to get it off my chest. It's been bothering me for a while now.",
      "There'll just be time to have a bite to eat before the show.",
      "I think I'll just go upstairs and have a nap, if nobody objects."
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 87، تمرین 87.2."
  },
  {
    category: "vocabulary",
    lesson: 87,
    scope: "درس 87 — تمرین 87.2",
    text: "There'll just be time to have a quick meal before the show.",
    options: [
      "I think I'll just go upstairs and have a nap, if nobody objects.",
      "Can I tell you about a problem I have? I just have to get it off my chest. It's been bothering me for a while now.",
      "They charged us £100 for a tiny room without a bath. It was a real rip-off! or They really ripped us off!",
      "There'll just be time to have a bite to eat before the show."
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 87، تمرین 87.2."
  },
  {
    category: "vocabulary",
    lesson: 87,
    scope: "درس 87 — تمرین 87.2",
    text: "I think I'll just go upstairs and have a sleep for a while, if nobody objects.",
    options: [
      "Can I tell you about a problem I have? I just have to get it off my chest. It's been bothering me for a while now.",
      "I think I'll just go upstairs and have a nap, if nobody objects.",
      "They charged us £100 for a tiny room without a bath. It was a real rip-off! or They really ripped us off!",
      "There'll just be time to have a bite to eat before the show."
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 87، تمرین 87.2."
  },
  {
    category: "vocabulary",
    lesson: 87,
    scope: "درس 87 — تمرین 87.4",
    text: "1",
    options: [
      "put your feet up",
      "foot the bill",
      "a pig in a poke",
      "pay over the odds"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 87، تمرین 87.4."
  },
  {
    category: "vocabulary",
    lesson: 87,
    scope: "درس 87 — تمرین 87.4",
    text: "2",
    options: [
      "put your feet up",
      "foot the bill"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 87، تمرین 87.4."
  },
  {
    category: "vocabulary",
    lesson: 92,
    scope: "درس 92 — تمرین 92.1",
    text: "They have recently set up a committee on teenage smoking.",
    options: [
      "They have recently established a committee on teenage smoking.",
      "We try to reserve some money for our holiday every week.",
      "Ignore all your negative feelings and listen with an open mind.",
      "If we hadn't left home so late, we would have arrived on time."
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 92، تمرین 92.1."
  },
  {
    category: "vocabulary",
    lesson: 92,
    scope: "درس 92 — تمرین 92.1",
    text: "We try to set aside some money for our holiday every week.",
    options: [
      "If we hadn't left home so late, we would have arrived on time.",
      "They have recently established a committee on teenage smoking.",
      "Ignore all your negative feelings and listen with an open mind.",
      "We try to reserve some money for our holiday every week."
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 92، تمرین 92.1."
  },
  {
    category: "vocabulary",
    lesson: 92,
    scope: "درس 92 — تمرین 92.1",
    text: "Set aside all your negative feelings and listen with an open mind.",
    options: [
      "We try to reserve some money for our holiday every week.",
      "They have recently established a committee on teenage smoking.",
      "Ignore all your negative feelings and listen with an open mind.",
      "If we hadn't left home so late, we would have arrived on time."
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 92، تمرین 92.1."
  },
  {
    category: "vocabulary",
    lesson: 92,
    scope: "درس 92 — تمرین 92.1",
    text: "If we hadn't set off so late, we would have arrived on time.",
    options: [
      "They have recently established a committee on teenage smoking.",
      "If we hadn't left home so late, we would have arrived on time.",
      "We try to reserve some money for our holiday every week.",
      "Ignore all your negative feelings and listen with an open mind."
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 92، تمرین 92.1."
  },
  {
    category: "vocabulary",
    lesson: 92,
    scope: "درس 92 — تمرین 92.1",
    text: "The government's unpopular proposals set off a wave of protests.",
    options: [
      "The government's unpopular proposals caused a wave of protests.",
      "They have recently established a committee on teenage smoking.",
      "We try to reserve some money for our holiday every week.",
      "Ignore all your negative feelings and listen with an open mind."
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 92، تمرین 92.1."
  },
  {
    category: "vocabulary",
    lesson: 92,
    scope: "درس 92 — تمرین 92.2",
    text: "1 put out",
    options: [
      "put out a bonfire / your host / the rubbish",
      "put forward an idea / a proposal / a suggestion",
      "put off a football match / an appointment / customers",
      "put across your feelings"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 92، تمرین 92.2."
  },
  {
    category: "vocabulary",
    lesson: 92,
    scope: "درس 92 — تمرین 92.2",
    text: "2 put forward",
    options: [
      "put across your feelings",
      "put out a bonfire / your host / the rubbish",
      "put off a football match / an appointment / customers",
      "put forward an idea / a proposal / a suggestion"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 92، تمرین 92.2."
  },
  {
    category: "vocabulary",
    lesson: 92,
    scope: "درس 92 — تمرین 92.2",
    text: "3 put off",
    options: [
      "put forward an idea / a proposal / a suggestion",
      "put out a bonfire / your host / the rubbish",
      "put off a football match / an appointment / customers",
      "put across your feelings"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 92، تمرین 92.2."
  },
  {
    category: "vocabulary",
    lesson: 92,
    scope: "درس 92 — تمرین 92.2",
    text: "4 put across",
    options: [
      "put out a bonfire / your host / the rubbish",
      "put across your feelings",
      "put forward an idea / a proposal / a suggestion",
      "put off a football match / an appointment / customers"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 92، تمرین 92.2."
  },
  {
    category: "vocabulary",
    lesson: 92,
    scope: "درس 92 — تمرین 92.2",
    text: "5 put up",
    options: [
      "put up an umbrella / prices / a picture",
      "put out a bonfire / your host / the rubbish",
      "put forward an idea / a proposal / a suggestion",
      "put off a football match / an appointment / customers"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 92، تمرین 92.2."
  },
  {
    category: "vocabulary",
    lesson: 92,
    scope: "درس 92 — تمرین 92.2",
    text: "6 put on",
    options: [
      "put off a football match / an appointment / customers",
      "put out a bonfire / your host / the rubbish",
      "put forward an idea / a proposal / a suggestion",
      "put on a concert / a limp / clothes"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 92، تمرین 92.2."
  },
  {
    category: "vocabulary",
    lesson: 92,
    scope: "درس 92 — تمرین 92.2",
    text: "7 put away",
    options: [
      "put forward an idea / a proposal / a suggestion",
      "put out a bonfire / your host / the rubbish",
      "put away papers",
      "put off a football match / an appointment / customers"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 92، تمرین 92.2."
  },
  {
    category: "vocabulary",
    lesson: 92,
    scope: "درس 92 — تمرین 92.2",
    text: "8 put up with",
    options: [
      "put out a bonfire / your host / the rubbish",
      "put up with someone's behaviour / bad manners / temper",
      "put forward an idea / a proposal / a suggestion",
      "put off a football match / an appointment / customers"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 92، تمرین 92.2."
  },
  {
    category: "vocabulary",
    lesson: 92,
    scope: "درس 92 — تمرین 92.4",
    text: "He never wants to do anything in a new or different way.",
    options: [
      "He is very set in his ways.",
      "He's bound to put two and two together if you keep on behaving like that.",
      "She has set her sights on becoming Prime Minister.",
      "She really puts my back up."
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 92، تمرین 92.4."
  },
  {
    category: "vocabulary",
    lesson: 92,
    scope: "درس 92 — تمرین 92.4",
    text: "He's bound to draw the obvious conclusion if you keep on behaving like that.",
    options: [
      "She really puts my back up.",
      "He is very set in his ways.",
      "She has set her sights on becoming Prime Minister.",
      "He's bound to put two and two together if you keep on behaving like that."
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 92، تمرین 92.4."
  },
  {
    category: "vocabulary",
    lesson: 92,
    scope: "درس 92 — تمرین 92.4",
    text: "Her aim is to become Prime Minister.",
    options: [
      "He's bound to put two and two together if you keep on behaving like that.",
      "He is very set in his ways.",
      "She has set her sights on becoming Prime Minister.",
      "She really puts my back up."
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 92، تمرین 92.4."
  },
  {
    category: "vocabulary",
    lesson: 92,
    scope: "درس 92 — تمرین 92.4",
    text: "I find her terribly irritating.",
    options: [
      "He is very set in his ways.",
      "She really puts my back up.",
      "He's bound to put two and two together if you keep on behaving like that.",
      "She has set her sights on becoming Prime Minister."
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 92، تمرین 92.4."
  },
  {
    category: "vocabulary",
    lesson: 92,
    scope: "درس 92 — تمرین 92.4",
    text: "It's sound business advice not to risk everything at once.",
    options: [
      "It's sound business advice not to put all your eggs in one basket.",
      "He is very set in his ways.",
      "He's bound to put two and two together if you keep on behaving like that.",
      "She has set her sights on becoming Prime Minister."
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 92، تمرین 92.4."
  },
  {
    category: "vocabulary",
    lesson: 92,
    scope: "درس 92 — تمرین 92.4",
    text: "Please concentrate on the problem in hand.",
    options: [
      "She has set her sights on becoming Prime Minister.",
      "He is very set in his ways.",
      "He's bound to put two and two together if you keep on behaving like that.",
      "Please put your mind to the problem in hand."
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 92، تمرین 92.4."
  },
  {
    category: "vocabulary",
    lesson: 92,
    scope: "درس 92 — تمرین 92.4",
    text: "She is determined to get a seat in Parliament.",
    options: [
      "He's bound to put two and two together if you keep on behaving like that.",
      "He is very set in his ways.",
      "She has set her heart on getting a seat in Parliament.",
      "She has set her sights on becoming Prime Minister."
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 92، تمرین 92.4."
  },
  {
    category: "vocabulary",
    lesson: 92,
    scope: "درس 92 — تمرین 92.4",
    text: "She threw petrol on the rubbish and put a match to it.",
    options: [
      "He is very set in his ways.",
      "She threw petrol on the rubbish and set fire to it.",
      "He's bound to put two and two together if you keep on behaving like that.",
      "She has set her sights on becoming Prime Minister."
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 92، تمرین 92.4."
  },
  {
    category: "vocabulary",
    lesson: 92,
    scope: "درس 92 — تمرین 92.4",
    text: "She's very good at stating things succinctly.",
    options: [
      "She's very good at putting things in a nutshell.",
      "He is very set in his ways.",
      "He's bound to put two and two together if you keep on behaving like that.",
      "She has set her sights on becoming Prime Minister."
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 92، تمرین 92.4."
  },
  {
    category: "vocabulary",
    lesson: 92,
    scope: "درس 92 — تمرین 92.4",
    text: "The building started burning because of terrorist action.",
    options: [
      "She has set her sights on becoming Prime Minister.",
      "He is very set in his ways.",
      "He's bound to put two and two together if you keep on behaving like that.",
      "The building was set on fire by terrorist action."
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 92، تمرین 92.4."
  },
  {
    category: "vocabulary",
    lesson: 92,
    scope: "درس 92 — تمرین 92.4",
    text: "This is the first time I've ever been to the southern hemisphere.",
    options: [
      "He's bound to put two and two together if you keep on behaving like that.",
      "He is very set in his ways.",
      "This is the first time I've ever set foot in the southern hemisphere.",
      "She has set her sights on becoming Prime Minister."
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 92، تمرین 92.4."
  },
  {
    category: "vocabulary",
    lesson: 92,
    scope: "درس 92 — تمرین 92.4",
    text: "We spent most of our evenings discussing the problems of the world rather than studying.",
    options: [
      "He is very set in his ways.",
      "We spent most of our evenings setting",
      "He's bound to put two and two together if you keep on behaving like that.",
      "She has set her sights on becoming Prime Minister."
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 92، تمرین 92.4."
  },
  {
    category: "vocabulary",
    lesson: 92,
    scope: "درس 92 — تمرین 92.4",
    text: "You really should be firm with him or there'll be trouble later.",
    options: [
      "You really should put your foot down (with him) or there'll be trouble later.",
      "He is very set in his ways.",
      "He's bound to put two and two together if you keep on behaving like that.",
      "She has set her sights on becoming Prime Minister."
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 92، تمرین 92.4."
  },
  {
    category: "vocabulary",
    lesson: 92,
    scope: "درس 92 — تمرین 92.4",
    text: "If the teacher doesn't behave properly, the children certainly won't.",
    options: [
      "She has set her sights on becoming Prime Minister.",
      "He is very set in his ways.",
      "He's bound to put two and two together if you keep on behaving like that.",
      "If the teacher doesn't set a good example, the children certainly won't behave properly."
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 92، تمرین 92.4."
  },
  {
    category: "vocabulary",
    lesson: 95,
    scope: "درس 95 — تمرین 95.1",
    text: "1 kip",
    options: [
      "a pal – a friend; nowadays, mate is perhaps the most common informal word for 'friend' in British English",
      "kip – to sleep / have a sleep",
      "a chap – a man; chap does have associations of being a middle-class word and perhaps not used so much by young people",
      "swot – study hard, e.g. for an exam; you can call someone a swot too"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 95، تمرین 95.1."
  },
  {
    category: "vocabulary",
    lesson: 95,
    scope: "درس 95 — تمرین 95.1",
    text: "2 a pal",
    options: [
      "a pal – a friend; nowadays, mate is perhaps the most common informal word for 'friend' in British English",
      "kip – to sleep / have a sleep",
      "a chap – a man; chap does have associations of being a middle-class word and perhaps not used so much by young people",
      "swot – study hard, e.g. for an exam; you can call someone a swot too"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 95، تمرین 95.1."
  },
  {
    category: "vocabulary",
    lesson: 95,
    scope: "درس 95 — تمرین 95.1",
    text: "3 a chap",
    options: [
      "swot – study hard, e.g. for an exam; you can call someone a swot too",
      "kip – to sleep / have a sleep",
      "a pal – a friend; nowadays, mate is perhaps the most common informal word for 'friend' in British English",
      "a chap – a man; chap does have associations of being a middle-class word and perhaps not used so much by young people"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 95، تمرین 95.1."
  },
  {
    category: "vocabulary",
    lesson: 95,
    scope: "درس 95 — تمرین 95.1",
    text: "4 swot",
    options: [
      "a pal – a friend; nowadays, mate is perhaps the most common informal word for 'friend' in British English",
      "kip – to sleep / have a sleep",
      "swot – study hard, e.g. for an exam; you can call someone a swot too",
      "a chap – a man; chap does have associations of being a middle-class word and perhaps not used so much by young people"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 95، تمرین 95.1."
  },
  {
    category: "vocabulary",
    lesson: 95,
    scope: "درس 95 — تمرین 95.1",
    text: "5 ta!",
    options: [
      "kip – to sleep / have a sleep",
      "ta – thank you, or (slightly less formal) thanks",
      "a pal – a friend; nowadays, mate is perhaps the most common informal word for 'friend' in British English",
      "a chap – a man; chap does have associations of being a middle-class word and perhaps not used so much by young people"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 95، تمرین 95.1."
  },
  {
    category: "vocabulary",
    lesson: 95,
    scope: "درس 95 — تمرین 95.1",
    text: "6 brainy",
    options: [
      "brainy – clever",
      "kip – to sleep / have a sleep",
      "a pal – a friend; nowadays, mate is perhaps the most common informal word for 'friend' in British English",
      "a chap – a man; chap does have associations of being a middle-class word and perhaps not used so much by young people"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 95، تمرین 95.1."
  },
  {
    category: "vocabulary",
    lesson: 95,
    scope: "درس 95 — تمرین 95.3",
    text: "1 (Teenage boy to teenage girl at disco): D'you fancy an appointment one night next week?",
    options: [
      "There is a clash here between the very formal style of the letter ('I should like to enquire …') and the rather informal 'ad'. 'Advertisements' would be more suitable.",
      "As with 2, this would be heard as humorous",
      "A teenage boy would probably say a date (or 'Fancy going out?'), not an appointment in this situation; appointment is for business contexts; too formal."
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 95، تمرین 95.3."
  },
  {
    category: "vocabulary",
    lesson: 95,
    scope: "درس 95 — تمرین 95.3",
    text: "3 (Dinner-guest to host/hostess): No thanks, I never consume alcoholic beverages when I'm driving.",
    options: [
      "There is a clash here between the very formal style of the letter ('I should like to enquire …') and the rather informal 'ad'. 'Advertisements' would be more suitable.",
      "A teenage boy would probably say a date (or 'Fancy going out?'), not an appointment in this situation; appointment is for business contexts; too formal.",
      "As with 2, this would be heard as humorous"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 95، تمرین 95.3."
  },
  {
    category: "vocabulary",
    lesson: 95,
    scope: "درس 95 — تمرین 95.3",
    text: "5 (Business letter to a newspaper office): Dear Sir/Madam, I should like to enquire about the current charges for ads in your newspaper. My company is considering ..., etc.",
    options: [
      "As with 2, this would be heard as humorous",
      "A teenage boy would probably say a date (or 'Fancy going out?'), not an appointment in this situation; appointment is for business contexts; too formal.",
      "There is a clash here between the very formal style of the letter ('I should like to enquire …') and the rather informal 'ad'. 'Advertisements' would be more suitable."
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 95، تمرین 95.3."
  },
  {
    category: "vocabulary",
    lesson: 95,
    scope: "درس 95 — تمرین 95.4",
    text: "1 The opposite of stationary.",
    options: [
      "to alight",
      "in motion",
      "a) to regret b) to purchase c) to address",
      "Hi! and Bye!"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 95، تمرین 95.4."
  },
  {
    category: "vocabulary",
    lesson: 95,
    scope: "درس 95 — تمرین 95.4",
    text: "2 The opposite of to board.",
    options: [
      "to alight",
      "in motion",
      "a) to regret b) to purchase c) to address",
      "Hi! and Bye!"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 95، تمرین 95.4."
  },
  {
    category: "vocabulary",
    lesson: 95,
    scope: "درس 95 — تمرین 95.4",
    text: "3 a) to be sorry  b) to buy  c) to speak to",
    options: [
      "Hi! and Bye!",
      "in motion",
      "to alight",
      "a) to regret b) to purchase c) to address"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 95، تمرین 95.4."
  },
  {
    category: "vocabulary",
    lesson: 95,
    scope: "درس 95 — تمرین 95.4",
    text: "4 Informal versions of Greetings! and Farewell!",
    options: [
      "to alight",
      "in motion",
      "Hi! and Bye!",
      "a) to regret b) to purchase c) to address"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 95، تمرین 95.4."
  },
  {
    category: "vocabulary",
    lesson: 97,
    scope: "درس 97 — تمرین 97.1",
    text: "labor",
    options: [
      "American; a Brit would spell it theatre (and would call it cinema).",
      "Brit; an American would write center.",
      "American; a Brit would be much less likely to use a word of this type, probably preferring a phrase like 'taken into hospital'. If s",
      "American; a Brit would write labour."
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 97، تمرین 97.1."
  },
  {
    category: "vocabulary",
    lesson: 97,
    scope: "درس 97 — تمرین 97.1",
    text: "centre",
    options: [
      "American; a Brit would be much less likely to use a word of this type, probably preferring a phrase like 'taken into hospital'. If s",
      "American; a Brit would write labour.",
      "Brit; an American would write center.",
      "American; a Brit would spell it theatre (and would call it cinema)."
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 97، تمرین 97.1."
  },
  {
    category: "vocabulary",
    lesson: 97,
    scope: "درس 97 — تمرین 97.1",
    text: "hospitalized",
    options: [
      "American; a Brit would write labour.",
      "American; a Brit would be much less likely to use a word of this type, probably preferring a phrase like 'taken into hospital'. If s",
      "Brit; an American would write center.",
      "American; a Brit would spell it theatre (and would call it cinema)."
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 97، تمرین 97.1."
  },
  {
    category: "vocabulary",
    lesson: 97,
    scope: "درس 97 — تمرین 97.1",
    text: "a movie theater",
    options: [
      "American; a Brit would spell it theatre (and would call it cinema).",
      "American; a Brit would write labour.",
      "Brit; an American would write center.",
      "American; a Brit would be much less likely to use a word of this type, probably preferring a phrase like 'taken into hospital'. If s"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 97، تمرین 97.1."
  },
  {
    category: "vocabulary",
    lesson: 97,
    scope: "درس 97 — تمرین 97.1",
    text: "favour",
    options: [
      "American; a Brit would be much less likely to use a word of this type, probably preferring a phrase like 'taken into hospital'. If s",
      "American; a Brit would write labour.",
      "Brit; an American would write center.",
      "Brit; an American would write favor."
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 97، تمرین 97.1."
  },
  {
    category: "vocabulary",
    lesson: 97,
    scope: "درس 97 — تمرین 97.1",
    text: "thru",
    options: [
      "Brit; an American would write center.",
      "American; a Brit would write labour.",
      "American, writing in an informal context; a Brit would write through.",
      "American; a Brit would be much less likely to use a word of this type, probably preferring a phrase like 'taken into hospital'. If s"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 97، تمرین 97.1."
  },
  {
    category: "vocabulary",
    lesson: 97,
    scope: "درس 97 — تمرین 97.2",
    text: "1 [picture: antenna/aerial]",
    options: [
      "vest / undershirt",
      "wardrobe / closet",
      "lift / elevator",
      "TV aerial / TV antenna"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 97، تمرین 97.2."
  },
  {
    category: "vocabulary",
    lesson: 97,
    scope: "درس 97 — تمرین 97.2",
    text: "2 [picture: wardrobe/closet]",
    options: [
      "lift / elevator",
      "TV aerial / TV antenna",
      "wardrobe / closet",
      "vest / undershirt"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 97، تمرین 97.2."
  },
  {
    category: "vocabulary",
    lesson: 97,
    scope: "درس 97 — تمرین 97.2",
    text: "3 [picture: lift/elevator]",
    options: [
      "TV aerial / TV antenna",
      "lift / elevator",
      "wardrobe / closet",
      "vest / undershirt"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 97، تمرین 97.2."
  },
  {
    category: "vocabulary",
    lesson: 97,
    scope: "درس 97 — تمرین 97.2",
    text: "4 [picture: vest/undershirt]",
    options: [
      "vest / undershirt",
      "TV aerial / TV antenna",
      "wardrobe / closet",
      "lift / elevator"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 97، تمرین 97.2."
  },
  {
    category: "vocabulary",
    lesson: 97,
    scope: "درس 97 — تمرین 97.2",
    text: "5 [picture: sweets/candy]",
    options: [
      "lift / elevator",
      "TV aerial / TV antenna",
      "wardrobe / closet",
      "sweets / candy"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 97، تمرین 97.2."
  },
  {
    category: "vocabulary",
    lesson: 97,
    scope: "درس 97 — تمرین 97.2",
    text: "6 [picture: nappy/diaper]",
    options: [
      "wardrobe / closet",
      "TV aerial / TV antenna",
      "nappy / diaper",
      "lift / elevator"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 97، تمرین 97.2."
  },
  {
    category: "vocabulary",
    lesson: 97,
    scope: "درس 97 — تمرین 97.2",
    text: "7 [picture: pram/baby carriage]",
    options: [
      "TV aerial / TV antenna",
      "pram / baby carriage",
      "wardrobe / closet",
      "lift / elevator"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 97، تمرین 97.2."
  },
  {
    category: "vocabulary",
    lesson: 97,
    scope: "درس 97 — تمرین 97.2",
    text: "8 [picture: curtains/drapes]",
    options: [
      "curtains / drapes",
      "TV aerial / TV antenna",
      "wardrobe / closet",
      "lift / elevator"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 97، تمرین 97.2."
  },
  {
    category: "vocabulary",
    lesson: 97,
    scope: "درس 97 — تمرین 97.2",
    text: "9 [picture: bathtub]",
    options: [
      "lift / elevator",
      "TV aerial / TV antenna",
      "wardrobe / closet",
      "sellotape / Scotch tape"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 97، تمرین 97.2."
  },
  {
    category: "vocabulary",
    lesson: 97,
    scope: "درس 97 — تمرین 97.2",
    text: "10 [picture: lorry/truck]",
    options: [
      "wardrobe / closet",
      "TV aerial / TV antenna",
      "lorry / truck",
      "lift / elevator"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 97، تمرین 97.2."
  },
  {
    category: "vocabulary",
    lesson: 97,
    scope: "درس 97 — تمرین 97.4",
    text: "I had a blow-out.",
    options: [
      "Open the curtains.",
      "Pass me the biscuits.",
      "It's in the wardrobe.",
      "I had a puncture"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 97، تمرین 97.4."
  },
  {
    category: "vocabulary",
    lesson: 97,
    scope: "درس 97 — تمرین 97.4",
    text: "Pass me the cookies.",
    options: [
      "It's in the wardrobe.",
      "I had a puncture",
      "Pass me the biscuits.",
      "Open the curtains."
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 97، تمرین 97.4."
  },
  {
    category: "vocabulary",
    lesson: 97,
    scope: "درس 97 — تمرین 97.4",
    text: "It's in the closet.",
    options: [
      "I had a puncture",
      "It's in the wardrobe.",
      "Pass me the biscuits.",
      "Open the curtains."
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 97، تمرین 97.4."
  },
  {
    category: "vocabulary",
    lesson: 97,
    scope: "درس 97 — تمرین 97.4",
    text: "Open the drapes.",
    options: [
      "Open the curtains.",
      "I had a puncture",
      "Pass me the biscuits.",
      "It's in the wardrobe."
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 97، تمرین 97.4."
  },
  {
    category: "vocabulary",
    lesson: 97,
    scope: "درس 97 — تمرین 97.4",
    text: "We've run out of gas.",
    options: [
      "It's in the wardrobe.",
      "I had a puncture",
      "Pass me the biscuits.",
      "We've run out of petrol."
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 97، تمرین 97.4."
  },
  {
    category: "vocabulary",
    lesson: 97,
    scope: "درس 97 — تمرین 97.4",
    text: "Our bags are in the trunk.",
    options: [
      "Pass me the biscuits.",
      "I had a puncture",
      "Our bags are in the boot.",
      "It's in the wardrobe."
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 97، تمرین 97.4."
  },
  {
    category: "vocabulary",
    lesson: 97,
    scope: "درس 97 — تمرین 97.4",
    text: "One-way or round trip?",
    options: [
      "I had a puncture",
      "Single or return?",
      "Pass me the biscuits.",
      "It's in the wardrobe."
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 97، تمرین 97.4."
  },
  {
    category: "vocabulary",
    lesson: 97,
    scope: "درس 97 — تمرین 97.4",
    text: "Buy a one-way ticket.",
    options: [
      "Buy a single ticket.",
      "I had a puncture",
      "Pass me the biscuits.",
      "It's in the wardrobe."
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 97، تمرین 97.4."
  },
  {
    category: "vocabulary",
    lesson: 97,
    scope: "درس 97 — تمرین 97.4",
    text: "We're leaving in the fall.",
    options: [
      "It's in the wardrobe.",
      "I had a puncture",
      "Pass me the biscuits.",
      "We're leaving in the autumn."
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 97، تمرین 97.4."
  },
  {
    category: "vocabulary",
    lesson: 97,
    scope: "درس 97 — تمرین 97.4",
    text: "I hate waiting in line.",
    options: [
      "Pass me the biscuits.",
      "I had a puncture",
      "I hate standing in a queue.",
      "It's in the wardrobe."
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 97، تمرین 97.4."
  },
  {
    category: "vocabulary",
    lesson: 97,
    scope: "درس 97 — تمرین 97.5",
    text: "Where would you take (a) an American visitor (b) a British visitor who said they wanted to wash up – the kitchen or the bathroom?",
    options: [
      "An American would be in a bank and a Brit in a café.",
      "The Brit, because people do not usually talk about needing to change their underwear although you might well say that you want to change outer clothes.",
      "One flight for the American but two for the Brit.",
      "You'd take the American to the bathroom and the Brit to the kitchen."
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 97، تمرین 97.5."
  },
  {
    category: "vocabulary",
    lesson: 97,
    scope: "درس 97 — تمرین 97.5",
    text: "Which would surprise you more – an American or a British man telling you that he wanted to go and change his pants?",
    options: [
      "One flight for the American but two for the Brit.",
      "You'd take the American to the bathroom and the Brit to the kitchen.",
      "The Brit, because people do not usually talk about needing to change their underwear although you might well say that you want to change outer clothes.",
      "An American would be in a bank and a Brit in a café."
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 97، تمرین 97.5."
  },
  {
    category: "vocabulary",
    lesson: 97,
    scope: "درس 97 — تمرین 97.5",
    text: "You have just come into an unknown office block. If (a) an American (b) a Brit says that the office you need is on the second floor, how many flights of stairs do you need to climb?",
    options: [
      "You'd take the American to the bathroom and the Brit to the kitchen.",
      "One flight for the American but two for the Brit.",
      "The Brit, because people do not usually talk about needing to change their underwear although you might well say that you want to change outer clothes.",
      "An American would be in a bank and a Brit in a café."
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 97، تمرین 97.5."
  },
  {
    category: "vocabulary",
    lesson: 97,
    scope: "درس 97 — تمرین 97.5",
    text: "If (a) an American (b) a Brit asks for a bill, is he or she more likely to be in a bank or a café?",
    options: [
      "An American would be in a bank and a Brit in a café.",
      "You'd take the American to the bathroom and the Brit to the kitchen.",
      "The Brit, because people do not usually talk about needing to change their underwear although you might well say that you want to change outer clothes.",
      "One flight for the American but two for the Brit."
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 97، تمرین 97.5."
  },
  {
    category: "vocabulary",
    lesson: 97,
    scope: "درس 97 — تمرین 97.5",
    text: "Would a man wear a vest under or over his shirt (a) if he is British (b) if he is from the USA?",
    options: [
      "One flight for the American but two for the Brit.",
      "You'd take the American to the bathroom and the Brit to the kitchen.",
      "The Brit, because people do not usually talk about needing to change their underwear although you might well say that you want to change outer clothes.",
      "The American would wear it over his shirt and the Brit would wear it under his shirt."
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 97، تمرین 97.5."
  },
  {
    category: "vocabulary",
    lesson: 98,
    scope: "درس 98 — تمرین 98.1",
    text: "I'm exhausted – let's have a smoko!",
    options: [
      "mosquitoes; barbecue",
      "journalist; university",
      "smoking (or tea or coffee) break",
      "business"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 98، تمرین 98.1."
  },
  {
    category: "vocabulary",
    lesson: 98,
    scope: "درس 98 — تمرین 98.1",
    text: "She wants to be a journo when she leaves uni.",
    options: [
      "smoko",
      "journalist; university",
      "journo",
      "uni"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 98، تمرین 98.1."
  },
  {
    category: "vocabulary",
    lesson: 98,
    scope: "درس 98 — تمرین 98.1",
    text: "We got terribly bitten by mozzies at yesterday's barbie.",
    options: [
      "mosquitoes; barbecue",
      "smoko",
      "journo",
      "uni"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 98، تمرین 98.1."
  },
  {
    category: "vocabulary",
    lesson: 98,
    scope: "درس 98 — تمرین 98.1",
    text: "He's planning to do a bit of farming bizzo while he's in the States.",
    options: [
      "uni",
      "smoko",
      "journo",
      "business"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 98، تمرین 98.1."
  },
  {
    category: "vocabulary",
    lesson: 98,
    scope: "درس 98 — تمرین 98.1",
    text: "What are you doing this arvo?",
    options: [
      "journo",
      "smoko",
      "afternoon",
      "uni"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 98، تمرین 98.1."
  },
  {
    category: "vocabulary",
    lesson: 98,
    scope: "درس 98 — تمرین 98.1",
    text: "We decided to have a party as the olds had gone away for the weekend.",
    options: [
      "smoko",
      "adults",
      "journo",
      "uni"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 98، تمرین 98.1."
  },
  {
    category: "vocabulary",
    lesson: 98,
    scope: "درس 98 — تمرین 98.2",
    text: "abscond",
    options: [
      "capture/obtain",
      "catch (e.g. by police)",
      "flee",
      "man who annoys girls"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 98، تمرین 98.2."
  },
  {
    category: "vocabulary",
    lesson: 98,
    scope: "درس 98 — تمرین 98.2",
    text: "nab",
    options: [
      "flee",
      "catch (e.g. by police)",
      "capture/obtain",
      "man who annoys girls"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 98، تمرین 98.2."
  },
  {
    category: "vocabulary",
    lesson: 98,
    scope: "درس 98 — تمرین 98.2",
    text: "bag (i.e. a seat in an election)",
    options: [
      "capture/obtain",
      "flee",
      "catch (e.g. by police)",
      "man who annoys girls"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 98، تمرین 98.2."
  },
  {
    category: "vocabulary",
    lesson: 98,
    scope: "درس 98 — تمرین 98.2",
    text: "Eve-teaser",
    options: [
      "capture/obtain",
      "flee",
      "catch (e.g. by police)",
      "man who annoys girls"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 98، تمرین 98.2."
  },
  {
    category: "vocabulary",
    lesson: 98,
    scope: "درس 98 — تمرین 98.2",
    text: "car-lifter",
    options: [
      "catch (e.g. by police)",
      "flee",
      "car thief",
      "capture/obtain"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 98، تمرین 98.2."
  },
  {
    category: "vocabulary",
    lesson: 98,
    scope: "درس 98 — تمرین 98.2",
    text: "fleetfoots",
    options: [
      "flee",
      "plimsolls, sneakers",
      "catch (e.g. by police)",
      "capture/obtain"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 98، تمرین 98.2."
  },
  {
    category: "vocabulary",
    lesson: 98,
    scope: "درس 98 — تمرین 98.2",
    text: "undertrials",
    options: [
      "people awaiting trial",
      "flee",
      "catch (e.g. by police)",
      "capture/obtain"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 98، تمرین 98.2."
  },
  {
    category: "vocabulary",
    lesson: 98,
    scope: "درس 98 — تمرین 98.2",
    text: "wearunders",
    options: [
      "capture/obtain",
      "flee",
      "catch (e.g. by police)",
      "underwear"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 98، تمرین 98.2."
  },
  {
    category: "vocabulary",
    lesson: 98,
    scope: "درس 98 — تمرین 98.3",
    text: "Mary had a bonny wee lassie last night. What happened to Mary yesterday?",
    options: [
      "Looking after the school buildings.",
      "Church-bells.",
      "She gave birth to a baby girl.",
      "A glass of whisky (in theory, a small one)."
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 98، تمرین 98.3."
  },
  {
    category: "vocabulary",
    lesson: 98,
    scope: "درس 98 — تمرین 98.3",
    text: "They stay next to the kirk. What noise is likely to wake them on Sunday mornings?",
    options: [
      "She gave birth to a baby girl.",
      "Church-bells.",
      "Looking after the school buildings.",
      "A glass of whisky (in theory, a small one)."
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 98، تمرین 98.3."
  },
  {
    category: "vocabulary",
    lesson: 98,
    scope: "درس 98 — تمرین 98.3",
    text: "He's got a new job as janitor at the school. What kind of duties will he have?",
    options: [
      "A glass of whisky (in theory, a small one).",
      "She gave birth to a baby girl.",
      "Church-bells.",
      "Looking after the school buildings."
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 98، تمرین 98.3."
  },
  {
    category: "vocabulary",
    lesson: 98,
    scope: "درس 98 — تمرین 98.3",
    text: "Would you like a wee dram? If you say 'yes', what will you get?",
    options: [
      "Church-bells.",
      "She gave birth to a baby girl.",
      "A glass of whisky (in theory, a small one).",
      "Looking after the school buildings."
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 98، تمرین 98.3."
  },
  {
    category: "vocabulary",
    lesson: 98,
    scope: "درس 98 — تمرین 98.3",
    text: "'Are you coming, Jim?' 'Aye.' Is Jim coming or isn't he?",
    options: [
      "She gave birth to a baby girl.",
      "Yes, he is.",
      "Church-bells.",
      "Looking after the school buildings."
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 98، تمرین 98.3."
  },
  {
    category: "vocabulary",
    lesson: 98,
    scope: "درس 98 — تمرین 98.3",
    text: "They have a wonderful view of the loch from their window. What can they see from the window?",
    options: [
      "A lake.",
      "She gave birth to a baby girl.",
      "Church-bells.",
      "Looking after the school buildings."
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 98، تمرین 98.3."
  },
  {
    category: "vocabulary",
    lesson: 98,
    scope: "درس 98 — تمرین 98.4",
    text: "Would you be pleased to be called square?",
    options: [
      "When you have been working or exercising very hard, for instance.",
      "It is in lots of small very tight plaits.",
      "Probably not."
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 98، تمرین 98.4."
  },
  {
    category: "vocabulary",
    lesson: 98,
    scope: "درس 98 — تمرین 98.4",
    text: "What does hair that is in dreadlocks look like?",
    options: [
      "When you have been working or exercising very hard, for instance.",
      "Probably not.",
      "It is in lots of small very tight plaits."
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 98، تمرین 98.4."
  },
  {
    category: "vocabulary",
    lesson: 98,
    scope: "درس 98 — تمرین 98.4",
    text: "When might you feel dead beat?",
    options: [
      "It is in lots of small very tight plaits.",
      "Probably not.",
      "When you have been working or exercising very hard, for instance."
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 98، تمرین 98.4."
  },
  {
    category: "vocabulary",
    lesson: 99,
    scope: "درس 99 — تمرین 99.2",
    text: "EXAMPLE SHOP BLAZE 5 DEAD. Five people died in a fire in a shop.",
    options: [
      "Approval has been given to a plan to place restrictions on people's use of water.",
      "Steps are being taken with the aim of providing more work for people.",
      "A woman resigned from her job after undergoing some kind of unpleasant experience there.",
      "A public opinion survey has looked into how people spend their money."
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 99، تمرین 99.2."
  },
  {
    category: "vocabulary",
    lesson: 99,
    scope: "درس 99 — تمرین 99.2",
    text: "MOVE TO CREATE MORE JOBS",
    options: [
      "Approval has been given to a plan to place restrictions on people's use of water.",
      "Steps are being taken with the aim of providing more work for people.",
      "A woman resigned from her job after undergoing some kind of unpleasant experience there.",
      "A public opinion survey has looked into how people spend their money."
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 99، تمرین 99.2."
  },
  {
    category: "vocabulary",
    lesson: 99,
    scope: "درس 99 — تمرین 99.2",
    text: "GO-AHEAD FOR WATER CURBS",
    options: [
      "A public opinion survey has looked into how people spend their money.",
      "Steps are being taken with the aim of providing more work for people.",
      "Approval has been given to a plan to place restrictions on people's use of water.",
      "A woman resigned from her job after undergoing some kind of unpleasant experience there."
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 99، تمرین 99.2."
  },
  {
    category: "vocabulary",
    lesson: 99,
    scope: "درس 99 — تمرین 99.2",
    text: "Woman quits after job ordeal",
    options: [
      "Approval has been given to a plan to place restrictions on people's use of water.",
      "Steps are being taken with the aim of providing more work for people.",
      "A public opinion survey has looked into how people spend their money.",
      "A woman resigned from her job after undergoing some kind of unpleasant experience there."
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 99، تمرین 99.2."
  },
  {
    category: "vocabulary",
    lesson: 99,
    scope: "درس 99 — تمرین 99.2",
    text: "POLL PROBES SPENDING HABITS",
    options: [
      "Steps are being taken with the aim of providing more work for people.",
      "An attempt has been made to remove the Prime Minister from his",
      "Approval has been given to a plan to place restrictions on people's use of water.",
      "A woman resigned from her job after undergoing some kind of unpleasant experience there."
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 99، تمرین 99.2."
  },
  {
    category: "vocabulary",
    lesson: 99,
    scope: "درس 99 — تمرین 99.2",
    text: "BID TO OUST PM",
    options: [
      "The Prince has promised to give support to his family or to family values, in general.",
      "Steps are being taken with the aim of providing more work for people.",
      "Approval has been given to a plan to place restrictions on people's use of water.",
      "A woman resigned from her job after undergoing some kind of unpleasant experience there."
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 99، تمرین 99.2."
  },
  {
    category: "vocabulary",
    lesson: 99,
    scope: "درس 99 — تمرین 99.3",
    text: "EXAMPLE PM TO CURB SPENDING limit",
    options: [
      "reduces",
      "makes a connection between",
      "explodes in",
      "promises"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 99، تمرین 99.3."
  },
  {
    category: "vocabulary",
    lesson: 99,
    scope: "درس 99 — تمرین 99.3",
    text: "1 BOOK LINKS M15 WITH KGB",
    options: [
      "reduces",
      "makes a connection between",
      "explodes in",
      "promises"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 99، تمرین 99.3."
  },
  {
    category: "vocabulary",
    lesson: 99,
    scope: "درس 99 — تمرین 99.3",
    text: "2 CHANCELLOR CUTS INTEREST RATES",
    options: [
      "promises",
      "makes a connection between",
      "reduces",
      "explodes in"
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 99، تمرین 99.3."
  },
  {
    category: "vocabulary",
    lesson: 99,
    scope: "درس 99 — تمرین 99.3",
    text: "3 BOMB BLASTS CENTRAL LONDON",
    options: [
      "reduces",
      "makes a connection between",
      "promises",
      "explodes in"
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 99، تمرین 99.3."
  },
  {
    category: "vocabulary",
    lesson: 99,
    scope: "درس 99 — تمرین 99.3",
    text: "4 PM PLEDGES BACKING FOR EUROPE",
    options: [
      "makes a connection between",
      "leads / is a major figure in | Follow-up: Make sure that you note down not only the headline but also a brief indication of what the story was about so that the headline makes sense when you revise your work later.",
      "reduces",
      "explodes in"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 99، تمرین 99.3."
  },
  {
    category: "vocabulary",
    lesson: 100,
    scope: "درس 100 — تمرین 100.3",
    text: "1 SHOPLIFTERS WILL BE PROSECUTED",
    options: [
      "You would see this notice in a shop and it lets people know that people who take things from the shop without paying will be taken to court.",
      "You would see this in a shop and it lets people know that the staff there speak French as well as English.",
      "You would see this at Customs and it lets people know that this is the way to go if they do not have any goods to pay duty on.",
      "You would see this in a shop window and it tells people that things are going to be sold off cheaply because the shop wants to get rid of its stock, perhaps because the shop is about to close down."
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 100، تمرین 100.3."
  },
  {
    category: "vocabulary",
    lesson: 100,
    scope: "درس 100 — تمرین 100.3",
    text: "2 French spoken here",
    options: [
      "You would see this in a shop window and it tells people that things are going to be sold off cheaply because the shop wants to get rid of its stock, perhaps because the shop is about to close down.",
      "You would see this notice in a shop and it lets people know that people who take things from the shop without paying will be taken to court.",
      "You would see this at Customs and it lets people know that this is the way to go if they do not have any goods to pay duty on.",
      "You would see this in a shop and it lets people know that the staff there speak French as well as English."
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 100، تمرین 100.3."
  },
  {
    category: "vocabulary",
    lesson: 100,
    scope: "درس 100 — تمرین 100.3",
    text: "3 Nothing to declare",
    options: [
      "You would see this in a shop and it lets people know that the staff there speak French as well as English.",
      "You would see this notice in a shop and it lets people know that people who take things from the shop without paying will be taken to court.",
      "You would see this at Customs and it lets people know that this is the way to go if they do not have any goods to pay duty on.",
      "You would see this in a shop window and it tells people that things are going to be sold off cheaply because the shop wants to get rid of its stock, perhaps because the shop is about to close down."
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 100، تمرین 100.3."
  },
  {
    category: "vocabulary",
    lesson: 100,
    scope: "درس 100 — تمرین 100.3",
    text: "4 Clearance sale starts today",
    options: [
      "You would see this notice in a shop and it lets people know that people who take things from the shop without paying will be taken to court.",
      "You would see this in a shop window and it tells people that things are going to be sold off cheaply because the shop wants to get rid of its stock, perhaps because the shop is about to close down.",
      "You would see this in a shop and it lets people know that the staff there speak French as well as English.",
      "You would see this at Customs and it lets people know that this is the way to go if they do not have any goods to pay duty on."
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 100، تمرین 100.3."
  },
  {
    category: "vocabulary",
    lesson: 100,
    scope: "درس 100 — تمرین 100.3",
    text: "5 Admission to ticket holders only",
    options: [
      "You would see this outside an exhibition or a dance or concert hall perhaps and it lets people know that they need a ticket to get in.",
      "You would see this notice in a shop and it lets people know that people who take things from the shop without paying will be taken to court.",
      "You would see this in a shop and it lets people know that the staff there speak French as well as English.",
      "You would see this at Customs and it lets people know that this is the way to go if they do not have any goods to pay duty on."
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 100، تمرین 100.3."
  },
  {
    category: "vocabulary",
    lesson: 100,
    scope: "درس 100 — تمرین 100.3",
    text: "6 No vacancies",
    options: [
      "You would see this at Customs and it lets people know that this is the way to go if they do not have any goods to pay duty on.",
      "You would see this notice in a shop and it lets people know that people who take things from the shop without paying will be taken to court.",
      "You would see this in a shop and it lets people know that the staff there speak French as well as English.",
      "You would see this in the window of a hotel or bed and breakfast and it tells people that there are no free rooms there."
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 100، تمرین 100.3."
  },
  {
    category: "vocabulary",
    lesson: 100,
    scope: "درس 100 — تمرین 100.3",
    text: "7 FISHING STRICTLY PROHIBITED",
    options: [
      "You would see this in a shop and it lets people know that the staff there speak French as well as English.",
      "You would see this notice in a shop and it lets people know that people who take things from the shop without paying will be taken to court.",
      "You would see this on a river bank and it tells people that fishing is not allowed.",
      "You would see this at Customs and it lets people know that this is the way to go if they do not have any goods to pay duty on."
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 100، تمرین 100.3."
  },
  {
    category: "vocabulary",
    lesson: 100,
    scope: "درس 100 — تمرین 100.3",
    text: "8 Cycles for hire or sale",
    options: [
      "You would see this notice in a shop and it lets people know that people who take things from the shop without paying will be taken to court.",
      "You would see this notice outside a bicycle shop and it tells people that they can either hire or buy bicycles there.",
      "You would see this in a shop and it lets people know that the staff there speak French as well as English.",
      "You would see this at Customs and it lets people know that this is the way to go if they do not have any goods to pay duty on."
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 100، تمرین 100.3."
  },
  {
    category: "vocabulary",
    lesson: 100,
    scope: "درس 100 — تمرین 100.3",
    text: "9 Flat to let",
    options: [
      "You would see this outside a block of flats or a house and it tells people that a flat is vacant for renting.",
      "You would see this notice in a shop and it lets people know that people who take things from the shop without paying will be taken to court.",
      "You would see this in a shop and it lets people know that the staff there speak French as well as English.",
      "You would see this at Customs and it lets people know that this is the way to go if they do not have any goods to pay duty on."
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 100، تمرین 100.3."
  },
  {
    category: "vocabulary",
    lesson: 100,
    scope: "درس 100 — تمرین 100.3",
    text: "10 Sold out",
    options: [
      "You would see this at Customs and it lets people know that this is the way to go if they do not have any goods to pay duty on.",
      "You would see this notice in a shop and it lets people know that people who take things from the shop without paying will be taken to court.",
      "You would see this in a shop and it lets people know that the staff there speak French as well as English.",
      "You would see this notice at the start of an escalator and it tells people that if they have a dog with them, they must carry it."
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 100، تمرین 100.3."
  },
  {
    category: "vocabulary",
    lesson: 100,
    scope: "درس 100 — تمرین 100.4",
    text: "1 indicate that their café was now open for coffee?",
    options: [
      "Coffee now being served.",
      "Spanish spoken here.",
      "Kindly",
      "Free-range eggs for sale."
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 100، تمرین 100.4."
  },
  {
    category: "vocabulary",
    lesson: 100,
    scope: "درس 100 — تمرین 100.4",
    text: "2 let people know that the café staff can speak Spanish?",
    options: [
      "Free-range eggs for sale.",
      "Coffee now being served.",
      "Kindly",
      "Spanish spoken here."
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 100، تمرین 100.4."
  },
  {
    category: "vocabulary",
    lesson: 100,
    scope: "درس 100 — تمرین 100.4",
    text: "3 stop people from smoking in their café?",
    options: [
      "Spanish spoken here.",
      "Coffee now being served.",
      "Kindly",
      "Free-range eggs for sale."
    ],
    answer: 2,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 100، تمرین 100.4."
  },
  {
    category: "vocabulary",
    lesson: 100,
    scope: "درس 100 — تمرین 100.4",
    text: "4 let people know that they can buy free-range eggs there too?",
    options: [
      "Coffee now being served.",
      "Free-range eggs for sale.",
      "Spanish spoken here.",
      "Kindly"
    ],
    answer: 1,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 100، تمرین 100.4."
  },
  {
    category: "vocabulary",
    lesson: 100,
    scope: "درس 100 — تمرین 100.4",
    text: "5 ask people not to fix notices on to their wall?",
    options: [
      "No bill-sticking.",
      "Coffee now being served.",
      "Spanish spoken here.",
      "Kindly"
    ],
    answer: 0,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 100، تمرین 100.4."
  },
  {
    category: "vocabulary",
    lesson: 100,
    scope: "درس 100 — تمرین 100.4",
    text: "6 tell people that they could rent rooms there overnight?",
    options: [
      "Kindly",
      "Coffee now being served.",
      "Spanish spoken here.",
      "Rooms to let."
    ],
    answer: 3,
    level: "استاندارد",
    explanation: "پاسخ عین Answer key کتاب — واحد 100، تمرین 100.4."
  }
];
