// GENERATED FILE — do not edit by hand (re-generate: bun scripts/viu-r3-d-wordfamily-upper.mjs)
// VIU R3-d (motive 2) — خانوادهٔ واژگانی چاپی درس‌های word formation کتاب English Vocabulary in Use — Upper-Intermediate
// منبع (tracked): docs/qa/viu-r3-capture-upper/census/unit-008.json / unit-009.json / unit-010.json
//   — کپچر دوگذر verbatim (census + verify — صفر FAIL — سربرگ ۹۱مین SNAPSHOT)
// قواعد استخراج صفر-ساختگی (گزارش اثبات: docs/qa/viu-r3-d-wordfamily-upper-2026-11-19.json):
//   واحدهای ۸/۹ — اعضا فقط از رشتهٔ مثال چاپی خود سطر affix با توکنایزر محافظه‌کار: حذف glossهای
//   براکتی balanced (مثل «[can be eaten]» و gloss آسیب‌دیدهٔ OCR چاپی «[ake modern]» = [make modern])؛
//   اگر براکت unbalanced در سگمنت باقی می‌ماند کل سگمنت حذف و verbatim در گزارش افشا می‌شود
//   (در این موج: صفر مورد — damageLog خالی — همهٔ براکت‌های کپچر balanced بودند)؛
//   واحد ۱۰ — اعضا فقط از فیلد group خود census (چیدمان چاپی کتاب): ۱۹ عضو group=ریشه + ۲۴ سطر
//   کلاس-واژه جدول خانواده (verb/person noun/adjective/abstract noun ×۶)؛ ارتباط ریشه↔کلاس-واژه در
//   census ثبت نشده و بنابراین استنتاج نمی‌شود (صفر استنتاج).
// کلیدها = عضو verbatim + واریانت‌های صرفی با همان قواعد ساده‌سازی پاپ‌آپ (عین الگوی جدول افعال R3-d).
// مکانیزم: word-lookup.tsx LookupMaps.family — کلیک روی عضو در متن هر درس ⇒ بلوک
//   «خانوادهٔ واژه — جدول word formation کتاب» (فقط‌خواندنی — صفر نوشتن در استورها).
import type { WordFamilyRow } from "../types";

export const WORD_FAMILIES: WordFamilyRow[] = [
  {
    entry: "-er",
    lesson: 8,
    group: "Common noun suffixes",
    pos: "",
    definition: "is used for the person who does an activity",
    phonetic: "/ə/",
    example: "e.g. writer, painter, worker, shopper, teacher.",
    members: [
    { word: "writer", keys: ["writer"] },
    { word: "painter", keys: ["painter"] },
    { word: "worker", keys: ["worker"] },
    { word: "shopper", keys: ["shopper"] },
    { word: "teacher", keys: ["teacher"] }
    ],
  },
  {
    entry: "-er/-or",
    lesson: 8,
    group: "Common noun suffixes",
    pos: "",
    definition: "are also used for things which do a particular job",
    phonetic: "",
    example: "e.g. pencil-sharpener, bottle-opener, grater, projector.",
    members: [
    { word: "pencil-sharpener", keys: ["pencil-sharpener"] },
    { word: "bottle-opener", keys: ["bottle-opener"] },
    { word: "grater", keys: ["grater"] },
    { word: "projector", keys: ["projector"] }
    ],
  },
  {
    entry: "-er and -ee",
    lesson: 8,
    group: "Common noun suffixes",
    pos: "",
    definition: "can contrast with each other meaning 'person who does something' (-er) and 'person who receives or experiences the action' (-ee)",
    phonetic: "",
    example: "employer/employee /emplɔi'iː/, sender/addressee, payee (e.g. of a cheque).",
    members: [
    { word: "employer", keys: ["employer"] },
    { word: "employee", keys: ["employee"] },
    { word: "sender", keys: ["sender"] },
    { word: "addressee", keys: ["addressee"] },
    { word: "payee", keys: ["payee"] }
    ],
  },
  {
    entry: "-(t)ion/-sion/-ion",
    lesson: 8,
    group: "Common noun suffixes",
    pos: "",
    definition: "are used to form nouns from verbs",
    phonetic: "",
    example: "complication pollution reduction alteration donation promotion admission",
    members: [
    { word: "complication", keys: ["complication"] },
    { word: "pollution", keys: ["pollution"] },
    { word: "reduction", keys: ["reduction"] },
    { word: "alteration", keys: ["alteration"] },
    { word: "donation", keys: ["donation"] },
    { word: "promotion", keys: ["promotion"] },
    { word: "admission", keys: ["admission"] }
    ],
  },
  {
    entry: "-ist",
    lesson: 8,
    group: "Common noun suffixes",
    pos: "",
    definition: "[a person] and -ism [an activity or ideology]: used for people's politics, beliefs and ideologies, and sometimes their profession (compare with -er/-or professions above)",
    phonetic: "",
    example: "e.g. Buddhism, journalism, Marxist, typist, physicist, terrorist.",
    members: [
    { word: "Buddhism", keys: ["buddhism"] },
    { word: "journalism", keys: ["journalism"] },
    { word: "Marxist", keys: ["marxist"] },
    { word: "typist", keys: ["typist"] },
    { word: "physicist", keys: ["physicist"] },
    { word: "terrorist", keys: ["terrorist"] }
    ],
  },
  {
    entry: "-ist",
    lesson: 8,
    group: "Common noun suffixes",
    pos: "",
    definition: "is also often used for people who play musical instruments",
    phonetic: "",
    example: "e.g. pianist, violinist, cellist",
    members: [
    { word: "pianist", keys: ["pianist"] },
    { word: "violinist", keys: ["violinist"] },
    { word: "cellist", keys: ["cellist"] }
    ],
  },
  {
    entry: "-ness",
    lesson: 8,
    group: "Common noun suffixes",
    pos: "",
    definition: "is used to make nouns from adjectives",
    phonetic: "",
    example: "goodness, readiness, forgetfulness, happiness, sadness, weakness.",
    members: [
    { word: "goodness", keys: ["goodness"] },
    { word: "readiness", keys: ["readiness"] },
    { word: "forgetfulness", keys: ["forgetfulness"] },
    { word: "happiness", keys: ["happiness"] },
    { word: "sadness", keys: ["sadness"] },
    { word: "weakness", keys: ["weakness"] }
    ],
  },
  {
    entry: "-able/-ible",
    lesson: 8,
    group: "Adjective suffixes",
    pos: "",
    definition: "with verbs, means 'can be done'",
    phonetic: "/əbl/",
    example: "drinkable washable readable forgivable edible [can be eaten] flexible [can be bent]",
    members: [
    { word: "drinkable", keys: ["drinkable"] },
    { word: "washable", keys: ["washable"] },
    { word: "readable", keys: ["readable"] },
    { word: "forgivable", keys: ["forgivable"] },
    { word: "edible", keys: ["edible"] },
    { word: "flexible", keys: ["flexible"] }
    ],
  },
  {
    entry: "-ise (or -ize)",
    lesson: 8,
    group: "Verbs",
    pos: "",
    definition: "forms verbs from adjectives",
    phonetic: "",
    example: "e.g. modernise [make modern], commercialise, industrialise.",
    members: [
    { word: "modernise", keys: ["modernise"] },
    { word: "commercialise", keys: ["commercialise"] },
    { word: "industrialise", keys: ["industrialise"] }
    ],
  },
  {
    entry: "-ment:",
    lesson: 8,
    group: "Other suffixes that can help you recognise the word-class",
    pos: "(nouns)",
    definition: "",
    phonetic: "",
    example: "excitement enjoyment replacement",
    members: [
    { word: "excitement", keys: ["excitement"] },
    { word: "enjoyment", keys: ["enjoyment"] },
    { word: "replacement", keys: ["replacement"] }
    ],
  },
  {
    entry: "-ity:",
    lesson: 8,
    group: "Other suffixes that can help you recognise the word-class",
    pos: "(nouns)",
    definition: "",
    phonetic: "",
    example: "flexibility productivity scarcity",
    members: [
    { word: "flexibility", keys: ["flexibility"] },
    { word: "productivity", keys: ["productivity"] },
    { word: "scarcity", keys: ["scarcity"] }
    ],
  },
  {
    entry: "-hood:",
    lesson: 8,
    group: "Other suffixes that can help you recognise the word-class",
    pos: "(abstract nouns especially family terms)",
    definition: "",
    phonetic: "",
    example: "childhood motherhood",
    members: [
    { word: "childhood", keys: ["childhood"] },
    { word: "motherhood", keys: ["motherhood"] }
    ],
  },
  {
    entry: "-ship:",
    lesson: 8,
    group: "Other suffixes that can help you recognise the word-class",
    pos: "(abstract nouns especially status)",
    definition: "",
    phonetic: "",
    example: "friendship partnership membership",
    members: [
    { word: "friendship", keys: ["friendship"] },
    { word: "partnership", keys: ["partnership"] },
    { word: "membership", keys: ["membership"] }
    ],
  },
  {
    entry: "-ive:",
    lesson: 8,
    group: "Other suffixes that can help you recognise the word-class",
    pos: "(adjectives)",
    definition: "",
    phonetic: "",
    example: "passive productive active",
    members: [
    { word: "passive", keys: ["passive"] },
    { word: "productive", keys: ["productive"] },
    { word: "active", keys: ["active"] }
    ],
  },
  {
    entry: "-al:",
    lesson: 8,
    group: "Other suffixes that can help you recognise the word-class",
    pos: "(adjectives)",
    definition: "",
    phonetic: "",
    example: "brutal legal (nouns) refusal arrival",
    members: [
    { word: "brutal", keys: ["brutal"] },
    { word: "legal", keys: ["legal"] },
    { word: "refusal", keys: ["refusal"] },
    { word: "arrival", keys: ["arrival"] }
    ],
  },
  {
    entry: "-ous:",
    lesson: 8,
    group: "Other suffixes that can help you recognise the word-class",
    pos: "(adjectives)",
    definition: "",
    phonetic: "",
    example: "delicious outrageous furious",
    members: [
    { word: "delicious", keys: ["delicious","deliciou"] },
    { word: "outrageous", keys: ["outrageous","outrageou"] },
    { word: "furious", keys: ["furious","furiou"] }
    ],
  },
  {
    entry: "-ful:",
    lesson: 8,
    group: "Other suffixes that can help you recognise the word-class",
    pos: "(adjectives)",
    definition: "",
    phonetic: "",
    example: "forgetful hopeful useful",
    members: [
    { word: "forgetful", keys: ["forgetful"] },
    { word: "hopeful", keys: ["hopeful"] },
    { word: "useful", keys: ["useful"] }
    ],
  },
  {
    entry: "-less:",
    lesson: 8,
    group: "Other suffixes that can help you recognise the word-class",
    pos: "(adjectives)",
    definition: "",
    phonetic: "",
    example: "useless harmless homeless",
    members: [
    { word: "useless", keys: ["useless"] },
    { word: "harmless", keys: ["harmless"] },
    { word: "homeless", keys: ["homeless"] }
    ],
  },
  {
    entry: "-ify:",
    lesson: 8,
    group: "Other suffixes that can help you recognise the word-class",
    pos: "(verbs)",
    definition: "",
    phonetic: "",
    example: "beautify purify terrify",
    members: [
    { word: "beautify", keys: ["beautify"] },
    { word: "purify", keys: ["purify"] },
    { word: "terrify", keys: ["terrify"] }
    ],
  },
  {
    entry: "anti",
    lesson: 9,
    group: "",
    pos: "",
    definition: "against",
    phonetic: "",
    example: "anti-war",
    members: [
    { word: "anti-war", keys: ["anti-war"] }
    ],
  },
  {
    entry: "auto",
    lesson: 9,
    group: "",
    pos: "",
    definition: "of or by oneself",
    phonetic: "",
    example: "autograph",
    members: [
    { word: "autograph", keys: ["autograph"] }
    ],
  },
  {
    entry: "bi",
    lesson: 9,
    group: "",
    pos: "",
    definition: "two, twice",
    phonetic: "",
    example: "bicycle",
    members: [
    { word: "bicycle", keys: ["bicycle"] }
    ],
  },
  {
    entry: "ex",
    lesson: 9,
    group: "",
    pos: "",
    definition: "former",
    phonetic: "",
    example: "ex-wife",
    members: [
    { word: "ex-wife", keys: ["ex-wife"] }
    ],
  },
  {
    entry: "ex",
    lesson: 9,
    group: "",
    pos: "",
    definition: "out of",
    phonetic: "",
    example: "extract",
    members: [
    { word: "extract", keys: ["extract"] }
    ],
  },
  {
    entry: "micro",
    lesson: 9,
    group: "",
    pos: "",
    definition: "small",
    phonetic: "",
    example: "micro-cassette",
    members: [
    { word: "micro-cassette", keys: ["micro-cassette"] }
    ],
  },
  {
    entry: "mis",
    lesson: 9,
    group: "",
    pos: "",
    definition: "badly/wrongly",
    phonetic: "",
    example: "misunderstand",
    members: [
    { word: "misunderstand", keys: ["misunderstand"] }
    ],
  },
  {
    entry: "mono",
    lesson: 9,
    group: "",
    pos: "",
    definition: "one/single",
    phonetic: "",
    example: "monotonous",
    members: [
    { word: "monotonous", keys: ["monotonous","monotonou"] }
    ],
  },
  {
    entry: "multi",
    lesson: 9,
    group: "",
    pos: "",
    definition: "many",
    phonetic: "",
    example: "multi-national",
    members: [
    { word: "multi-national", keys: ["multi-national"] }
    ],
  },
  {
    entry: "over",
    lesson: 9,
    group: "",
    pos: "",
    definition: "too much",
    phonetic: "",
    example: "overdo",
    members: [
    { word: "overdo", keys: ["overdo"] }
    ],
  },
  {
    entry: "post",
    lesson: 9,
    group: "",
    pos: "",
    definition: "after",
    phonetic: "",
    example: "postwar",
    members: [
    { word: "postwar", keys: ["postwar"] }
    ],
  },
  {
    entry: "pre",
    lesson: 9,
    group: "",
    pos: "",
    definition: "before",
    phonetic: "",
    example: "preconceived",
    members: [
    { word: "preconceived", keys: ["preconceived","preconceiv","preconceive"] }
    ],
  },
  {
    entry: "pro",
    lesson: 9,
    group: "",
    pos: "",
    definition: "in favour of",
    phonetic: "",
    example: "pro-government",
    members: [
    { word: "pro-government", keys: ["pro-government"] }
    ],
  },
  {
    entry: "pseudo",
    lesson: 9,
    group: "",
    pos: "",
    definition: "false",
    phonetic: "",
    example: "pseudo-scientific",
    members: [
    { word: "pseudo-scientific", keys: ["pseudo-scientific"] }
    ],
  },
  {
    entry: "re",
    lesson: 9,
    group: "",
    pos: "",
    definition: "again or back",
    phonetic: "",
    example: "retype",
    members: [
    { word: "retype", keys: ["retype"] }
    ],
  },
  {
    entry: "semi",
    lesson: 9,
    group: "",
    pos: "",
    definition: "half",
    phonetic: "",
    example: "semicircular",
    members: [
    { word: "semicircular", keys: ["semicircular"] }
    ],
  },
  {
    entry: "sub",
    lesson: 9,
    group: "",
    pos: "",
    definition: "under",
    phonetic: "",
    example: "subway",
    members: [
    { word: "subway", keys: ["subway"] }
    ],
  },
  {
    entry: "under",
    lesson: 9,
    group: "",
    pos: "",
    definition: "not enough",
    phonetic: "",
    example: "underworked",
    members: [
    { word: "underworked", keys: ["underworked","underwork","underworke"] }
    ],
  },
  {
    entry: "SPECT",
    lesson: 10,
    group: "",
    pos: "",
    definition: "see, look",
    phonetic: "",
    example: "",
    members: [
    { word: "respect", keys: ["respect"], example: "You should respect your parents / the laws of a country. [look up to]" },
    { word: "suspected", keys: ["suspected","suspect","suspecte"], example: "The police suspected he was guilty but they had no proof. [had a feeling]" },
    { word: "prospect", keys: ["prospect"], example: "Many pioneers travelled west in America to prospect for gold. [search]" }
    ],
  },
  {
    entry: "VERT",
    lesson: 10,
    group: "",
    pos: "",
    definition: "turn",
    phonetic: "",
    example: "",
    members: [
    { word: "reverted", keys: ["reverted","revert","reverte"], example: "I tried the new make of coffee but I soon reverted to my old favourite brand. [went back]" },
    { word: "convert", keys: ["convert"], example: "Missionaries went to Africa to convert people to Christianity. [change beliefs]" },
    { word: "diverted", keys: ["diverted","divert","diverte"], example: "The royal scandal diverted attention from the political crisis. [took attention away]" }
    ],
  },
  {
    entry: "PORT",
    lesson: 10,
    group: "",
    pos: "",
    definition: "carry, take",
    phonetic: "",
    example: "",
    members: [
    { word: "transport", keys: ["transport"], example: "How are you going to transport your things to the States? [send across]" },
    { word: "imports", keys: ["imports","import"], example: "Britain imports cotton and exports wool. [buys in, sells out]" },
    { word: "exports", keys: ["exports","export"], example: "Britain imports cotton and exports wool. [buys in, sells out]" },
    { word: "supported", keys: ["supported","support","supporte"], example: "Our opinions are supported by a considerable amount of research. [held up]" }
    ],
  },
  {
    entry: "DUC, DUCT",
    lesson: 10,
    group: "",
    pos: "",
    definition: "lead",
    phonetic: "",
    example: "",
    members: [
    { word: "educated", keys: ["educated","educat","educate"], example: "She was educated at a very small private school. [went to school]" },
    { word: "conducted", keys: ["conducted","conduct","conducte"], example: "He conducted the orchestra with great vigour. [led]" },
    { word: "produces", keys: ["produces","produc","produce"], example: "Japan produces a lot of electronic equipment. [makes]" }
    ],
  },
  {
    entry: "PRESS",
    lesson: 10,
    group: "",
    pos: "",
    definition: "press, push",
    phonetic: "",
    example: "",
    members: [
    { word: "impressed", keys: ["impressed","impress","impresse"], example: "She was impressed by his presentation. [full of admiration and respect]" },
    { word: "depresses", keys: ["depresses","depress","depresse"], example: "This weather depresses me. [makes me feel miserable]" },
    { word: "expresses", keys: ["expresses","express","expresse"], example: "She always expresses herself very articulately. [puts her thoughts into words]" }
    ],
  },
  {
    entry: "POSE, PONE",
    lesson: 10,
    group: "",
    pos: "",
    definition: "place, put",
    phonetic: "",
    example: "",
    members: [
    { word: "postponed", keys: ["postponed","postpon","postpone"], example: "The meeting has been postponed until next week. [changed to a later date]" },
    { word: "deposed", keys: ["deposed","depos","depose"], example: "The king was deposed by his own son. [put off the throne]" },
    { word: "imposed", keys: ["imposed","impos","impose"], example: "The government have imposed a sizeable tax increase. [put into force]" }
    ],
  },
  {
    entry: "inspect",
    lesson: 10,
    group: "verb",
    pos: "",
    definition: "",
    phonetic: "",
    example: "",
    members: [
    { word: "inspect", keys: ["inspect"] }
    ],
  },
  {
    entry: "advertise",
    lesson: 10,
    group: "verb",
    pos: "",
    definition: "",
    phonetic: "",
    example: "",
    members: [
    { word: "advertise", keys: ["advertise"] }
    ],
  },
  {
    entry: "deport",
    lesson: 10,
    group: "verb",
    pos: "",
    definition: "",
    phonetic: "",
    example: "",
    members: [
    { word: "deport", keys: ["deport"] }
    ],
  },
  {
    entry: "introduce",
    lesson: 10,
    group: "verb",
    pos: "",
    definition: "",
    phonetic: "",
    example: "",
    members: [
    { word: "introduce", keys: ["introduce"] }
    ],
  },
  {
    entry: "oppress",
    lesson: 10,
    group: "verb",
    pos: "",
    definition: "",
    phonetic: "",
    example: "",
    members: [
    { word: "oppress", keys: ["oppress"] }
    ],
  },
  {
    entry: "compose",
    lesson: 10,
    group: "verb",
    pos: "",
    definition: "",
    phonetic: "",
    example: "",
    members: [
    { word: "compose", keys: ["compose"] }
    ],
  },
  {
    entry: "inspector",
    lesson: 10,
    group: "person noun",
    pos: "",
    definition: "",
    phonetic: "",
    example: "",
    members: [
    { word: "inspector", keys: ["inspector"] }
    ],
  },
  {
    entry: "advertiser",
    lesson: 10,
    group: "person noun",
    pos: "",
    definition: "",
    phonetic: "",
    example: "",
    members: [
    { word: "advertiser", keys: ["advertiser"] }
    ],
  },
  {
    entry: "deportee",
    lesson: 10,
    group: "person noun",
    pos: "",
    definition: "",
    phonetic: "",
    example: "",
    members: [
    { word: "deportee", keys: ["deportee"] }
    ],
  },
  {
    entry: "introducer",
    lesson: 10,
    group: "person noun",
    pos: "",
    definition: "",
    phonetic: "",
    example: "",
    members: [
    { word: "introducer", keys: ["introducer"] }
    ],
  },
  {
    entry: "oppressor",
    lesson: 10,
    group: "person noun",
    pos: "",
    definition: "",
    phonetic: "",
    example: "",
    members: [
    { word: "oppressor", keys: ["oppressor"] }
    ],
  },
  {
    entry: "composer",
    lesson: 10,
    group: "person noun",
    pos: "",
    definition: "",
    phonetic: "",
    example: "",
    members: [
    { word: "composer", keys: ["composer"] }
    ],
  },
  {
    entry: "inspecting",
    lesson: 10,
    group: "adjective",
    pos: "",
    definition: "",
    phonetic: "",
    example: "",
    members: [
    { word: "inspecting", keys: ["inspecting","inspect","inspecte"] }
    ],
  },
  {
    entry: "advertising",
    lesson: 10,
    group: "adjective",
    pos: "",
    definition: "",
    phonetic: "",
    example: "",
    members: [
    { word: "advertising", keys: ["advertising","advertis","advertise"] }
    ],
  },
  {
    entry: "deported",
    lesson: 10,
    group: "adjective",
    pos: "",
    definition: "",
    phonetic: "",
    example: "",
    members: [
    { word: "deported", keys: ["deported","deport","deporte"] }
    ],
  },
  {
    entry: "introductory",
    lesson: 10,
    group: "adjective",
    pos: "",
    definition: "",
    phonetic: "",
    example: "",
    members: [
    { word: "introductory", keys: ["introductory"] }
    ],
  },
  {
    entry: "oppressive",
    lesson: 10,
    group: "adjective",
    pos: "",
    definition: "",
    phonetic: "",
    example: "",
    members: [
    { word: "oppressive", keys: ["oppressive"] }
    ],
  },
  {
    entry: "composite",
    lesson: 10,
    group: "adjective",
    pos: "",
    definition: "",
    phonetic: "",
    example: "",
    members: [
    { word: "composite", keys: ["composite"] }
    ],
  },
  {
    entry: "inspection",
    lesson: 10,
    group: "abstract noun",
    pos: "",
    definition: "",
    phonetic: "",
    example: "",
    members: [
    { word: "inspection", keys: ["inspection"] }
    ],
  },
  {
    entry: "advertisement",
    lesson: 10,
    group: "abstract noun",
    pos: "",
    definition: "",
    phonetic: "",
    example: "",
    members: [
    { word: "advertisement", keys: ["advertisement"] }
    ],
  },
  {
    entry: "deportation",
    lesson: 10,
    group: "abstract noun",
    pos: "",
    definition: "",
    phonetic: "",
    example: "",
    members: [
    { word: "deportation", keys: ["deportation"] }
    ],
  },
  {
    entry: "introduction",
    lesson: 10,
    group: "abstract noun",
    pos: "",
    definition: "",
    phonetic: "",
    example: "",
    members: [
    { word: "introduction", keys: ["introduction"] }
    ],
  },
  {
    entry: "oppression",
    lesson: 10,
    group: "abstract noun",
    pos: "",
    definition: "",
    phonetic: "",
    example: "",
    members: [
    { word: "oppression", keys: ["oppression"] }
    ],
  },
  {
    entry: "composition",
    lesson: 10,
    group: "abstract noun",
    pos: "",
    definition: "",
    phonetic: "",
    example: "",
    members: [
    { word: "composition", keys: ["composition"] }
    ],
  },
];
