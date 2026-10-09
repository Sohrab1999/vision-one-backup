import type { DictEntry } from "../types";

/**
 * دیکشنری انگلیسی به انگلیسی جزوه دوازدهم — ۲۴ واژه کلیدی (۸ واژه از هر درس).
 * جزوه دوازدهم برخلاف جزوه یازدهم بخش «English to English Dictionary» چاپی ندارد؛
 * واژه‌ها از جداول «لغات کلیدی و تکمیلی» خود جزوه انتخاب شدند و تعریف‌های انگلیسی به سبک
 * دیکشنری‌های استاندارد زبان‌آموزان تنظیم و مثال‌ها با بافت واژگان و تست‌های همان جزوه هماهنگ است
 * (سیاست مشابه جزوه هشتم — مستند در هدر همان فایل).
 * تلفظ IPA استاندارد واژه‌نامه‌ای است.
 */
export const DICTIONARY: DictEntry[] = [
  // ─── درس ۱ — Sense of Appreciation ───
  { word: "appreciate", phonetic: "/ əˈpriːʃieɪt /", pos: "v.", definition: "to be grateful for something that someone has done, or to understand how good something is", examples: ["I really don't know how to appreciate you.", "We want to show our appreciation to all the staff."], lesson: 1 },
  { word: "attempt", phonetic: "/ əˈtempt /", pos: "n.", definition: "an act of trying to do something, especially something difficult", examples: ["Their first attempt to climb Everest ended in failure."], lesson: 1 },
  { word: "dedicated", phonetic: "/ ˈdedɪkeɪtɪd /", pos: "adj.", definition: "working hard at something because you care about it a lot", examples: ["It's important to appreciate the teachers who are dedicated to their jobs."], lesson: 1 },
  { word: "donate", phonetic: "/ doʊˈneɪt /", pos: "v.", definition: "to give something such as money or blood to help other people", examples: ["After that terrible earthquake, many people were ready to donate blood to the patients."], lesson: 1 },
  { word: "evidence", phonetic: "/ ˈevɪdəns /", pos: "n.", definition: "facts or signs that help you to know that something is true", examples: ["The police had to release him because of lack of evidence."], lesson: 1 },
  { word: "warn", phonetic: "/ wɔːrn /", pos: "v.", definition: "to tell someone about a possible danger or problem so they can avoid it", examples: ["Icy road conditions in Tehran ended in two roads being closed.", "The sign warns the drivers to pause at a yellow signal."], lesson: 1 },
  { word: "grateful", phonetic: "/ ˈɡreɪtfl /", pos: "adj.", definition: "feeling that you want to thank someone for something they have done", examples: ["I tried to say how grateful we all were for his great help."], lesson: 1 },
  { word: "release", phonetic: "/ rɪˈliːs /", pos: "v.", definition: "to let a person or animal go free", examples: ["The police had to release him because of lack of evidence."], lesson: 1 },
  // ─── درس ۲ — Look it Up ───
  { word: "accessible", phonetic: "/ əkˈsesəbl /", pos: "adj.", definition: "easy to reach, enter or use", examples: ["Both monolingual and bilingual dictionaries are available and accessible in electronic format."], lesson: 2 },
  { word: "bilingual", phonetic: "/ baɪˈlɪŋɡwəl /", pos: "adj.", definition: "using or speaking two languages", examples: ["A bilingual dictionary gives the meaning of a word in another language."], lesson: 2 },
  { word: "circumstance", phonetic: "/ ˈsɜːrkəmstæns /", pos: "n.", definition: "the conditions and facts that are connected with and affect a situation", examples: ["In normal circumstances, we go to school every day."], lesson: 2 },
  { word: "collocation", phonetic: "/ kəˌlɑːkeɪʃn /", pos: "n.", definition: "a group of words that are often used together in a language", examples: ["Fast food is a common collocation in English."], lesson: 2 },
  { word: "comprehensible", phonetic: "/ ˌkɑːmprɪˈhensəbl /", pos: "adj.", definition: "easy to understand", examples: ["A good definition makes the meaning of a word comprehensible."], lesson: 2 },
  { word: "monolingual", phonetic: "/ ˌmɑːnəˈlɪŋɡwəl /", pos: "adj.", definition: "using or written in only one language", examples: ["Monolingual dictionaries encourage people to think in English."], lesson: 2 },
  { word: "pronunciation", phonetic: "/ prəˌnʌnsiˈeɪʃn /", pos: "n.", definition: "the way in which a word is said", examples: ["Electronic dictionaries often have an audio feature that lets you check your own pronunciation."], lesson: 2 },
  { word: "recommend", phonetic: "/ ˌrekəˈmend /", pos: "v.", definition: "to tell someone that something is good and useful", examples: ["The teacher recommended a learner's dictionary to his students."], lesson: 2 },
  // ─── درس ۳ — Renewable Energy ───
  { word: "consumption", phonetic: "/ kənˈsʌmpʃn /", pos: "n.", definition: "the amount of something that people use", examples: ["We should reduce our energy consumption."], lesson: 3 },
  { word: "generate", phonetic: "/ ˈdʒenəreɪt /", pos: "v.", definition: "to produce energy or electricity", examples: ["Today, about 19% of all our electricity is generated from hydropower."], lesson: 3 },
  { word: "global warming", phonetic: "/ ˌɡloʊbl ˈwɔːrmɪŋ /", pos: "n.", definition: "the slow increase in the temperature of the Earth", examples: ["Something should be done about global warming."], lesson: 3 },
  { word: "hydropower", phonetic: "/ ˈhaɪdroʊpaʊər /", pos: "n.", definition: "electricity produced from the power of moving water", examples: ["The power of falling or running water is called hydropower."], lesson: 3 },
  { word: "pollute", phonetic: "/ pəˈluːt /", pos: "v.", definition: "to make air, water or land dirty and dangerous", examples: ["Factories have polluted the air and environment."], lesson: 3 },
  { word: "renewable", phonetic: "/ rɪˈnuːəbl /", pos: "adj.", definition: "(of energy) that will not finish, because it is naturally replaced", examples: ["Solar energy is a clean, renewable source of power."], lesson: 3 },
  { word: "environment", phonetic: "/ ɪnˈvaɪrənmənt /", pos: "n.", definition: "the air, water and land around us that people, animals and plants live in", examples: ["We must protect the environment for the next generations.", "Hydropower is one of the cleanest sources for our environment."], lesson: 3 },
  { word: "turbine", phonetic: "/ ˈtɜːrbaɪn /", pos: "n.", definition: "an engine that turns with moving water, air or steam and makes electricity", examples: ["This wind turbine is able to generate a lot of electricity each day."], lesson: 3 },
];
