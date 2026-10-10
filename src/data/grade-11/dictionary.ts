import type { DictEntry } from "../types";

/**
 * دیکشنری انگلیسی به انگلیسی جزوه پایه یازدهم (Vision Two) — ۲۴ واژه کلیدی (۸ واژه از هر درس).
 * منبع: بخش «English to English Dictionary» خود جزوه — درس ۱: صفحات ۱۴۶-۱۵۳ (۱۴۸ مدخل)،
 * درس ۲: صفحات ۱۵۴-۱۶۲ (۱۶۹ مدخل)، درس ۳: صفحات ۱۶۳-۱۷۰ (۱۳۸ مدخل).
 * تعریف‌ها، تلفظ IPA و مثال‌ها عین چاپ جزوه است؛ ۸ سرواژهٔ مشهور و پرکاربرد هر درس انتخاب شد
 * و هیچ واژه‌ای بین درس‌ها تکرار نشده است.
 *
 * نکته‌های وفاداری به متن:
 * - لیگاتور چاپی «ﬂ» به «fl» نرمال شد (مثلاً ﬂuently → fluently).
 * - IPA «calligraphy» عین چاپ جزوه یعنی / kəˈlɪɡrəf / ثبت شد (در چاپ جزوه «i» پایانی در IPA نیامده است).
 * - واژه‌های دارای غلط چاپی در جزوه (مثل bring با IPA اشتباه / brɒːt / یا loaf با pos اشتباه)
 *   برای این انتخاب کنار گذاشته شدند تا مدخل ناسالم ثبت نشود.
 */
export const DICTIONARY: DictEntry[] = [
  // ─── درس ۱ — صفحات ۱۴۶-۱۵۳ ───
  { word: "ability", phonetic: "/ əˈbɪləti /", pos: "n.", definition: "the power and knowledge to do something", examples: ["She has the ability to pass the exam, but she must work harder."], lesson: 1 },
  { word: "absolutely", phonetic: "/ ˈæbsəluːtli /", pos: "adv.", definition: "completely", examples: ["It's absolutely freezing outside!"], lesson: 1 },
  { word: "access", phonetic: "/ ˈækses /", pos: "n.", definition: "the right to enter a place, use sth, see sb etc", examples: ["All students have access to the library."], lesson: 1 },
  { word: "borrow", phonetic: "/ ˈbɒrəʊ /", pos: "v.", definition: "to take and use something that you will give back after a short time", examples: ["Can I borrow your pen?"], lesson: 1 },
  { word: "capital", phonetic: "/ ˈkæpətl /", pos: "n.", definition: "the most important city in a country, where the government is", examples: ["Tokyo is the capital of Japan."], lesson: 1 },
  { word: "century", phonetic: "/ ˈsentʃəri /", pos: "n.", definition: "a period of 100 years", examples: ["A century is one hundred years."], lesson: 1 },
  { word: "honest", phonetic: "/ ˈɒnɪst /", pos: "adj.", definition: "a person who is honest says what is true and does not steal, lie or cheat", examples: ["She's a very honest person."], lesson: 1 },
  { word: "society", phonetic: "/ səˈsaɪəti /", pos: "n.", definition: "a large group of people who live in the same country or area and have the same ideas about how to live", examples: ["A family is the smallest unit of society."], lesson: 1 },

  // ─── درس ۲ — صفحات ۱۵۴-۱۶۲ ───
  { word: "addiction", phonetic: "/ əˈdɪkʃən /", pos: "n.", definition: "the need to take a harmful drug regularly, without being able to stop", examples: ["Drug addiction is a cancer in modern society."], lesson: 2 },
  { word: "calm", phonetic: "/ kɑːm /", pos: "adj.", definition: "relaxed and quiet, not angry, nervous, or upset", examples: ["We must keep calm."], lesson: 2 },
  { word: "cure", phonetic: "/ kjʊə /", pos: "n.", definition: "a medicine or medical treatment that makes an illness go away", examples: ["There is still no cure for AIDS."], lesson: 2 },
  { word: "decrease", phonetic: "/ dɪˈkriːs /", pos: "v.", definition: "to become less or go down to a lower level, or to make sth do this", examples: ["We want to decrease our reliance on oil."], lesson: 2 },
  { word: "diet", phonetic: "/ ˈdaɪət /", pos: "n.", definition: "the kind of food that a person or animal eats each day", examples: ["She doesn't eat a very healthy diet."], lesson: 2 },
  { word: "habit", phonetic: "/ ˈhæbɪt /", pos: "n.", definition: "a regular tendency or practice, especially one that is hard to give up", examples: ["He is in the habit of reading the newspaper while eating."], lesson: 2 },
  { word: "prevent", phonetic: "/ prɪˈvent /", pos: "v.", definition: "to stop sth from happening, or stop sb from doing sth", examples: ["The rules are intended to prevent accidents."], lesson: 2 },
  { word: "technology", phonetic: "/ tekˈnɒlədʒi /", pos: "n.", definition: "new machines, equipment, and ways of doing things that are based on modern knowledge about science and computers", examples: ["Modern technology has made our lives more comfortable."], lesson: 2 },

  // ─── درس ۳ — صفحات ۱۶۳-۱۷۰ ───
  { word: "appreciate", phonetic: "/ əˈpriːʃieɪt /", pos: "v.", definition: "to understand how important a situation or problem is or what sb's feelings are", examples: ["My boss doesn't appreciate me."], lesson: 3 },
  { word: "calligraphy", phonetic: "/ kəˈlɪɡrəf /", pos: "n.", definition: "the art of producing beautiful writing using special pens or brushes, or the writing produced in this way", examples: ["Chinese calligraphy is considered an art form."], lesson: 3 },
  { word: "custom", phonetic: "/ ˈkʌstəm /", pos: "n.", definition: "sth that is done by people in a particular society because it is traditional", examples: ["It's a custom to celebrate Christmas."], lesson: 3 },
  { word: "decorative", phonetic: "/ ˈdekərətɪv /", pos: "adj.", definition: "pretty or attractive, but not always necessary or useful", examples: ["The birthday cake was decorative."], lesson: 3 },
  { word: "handicraft", phonetic: "/ ˈhændikrɑːft /", pos: "n.", definition: "sth that someone has made in a skillful way using their hands", examples: ["He works in a shop selling handicrafts."], lesson: 3 },
  { word: "identity", phonetic: "/ aɪˈdentəti /", pos: "n.", definition: "who or what a person or thing is", examples: ["The identity of the killer is not known."], lesson: 3 },
  { word: "pottery", phonetic: "/ ˈpɒtəri /", pos: "n.", definition: "cups, plates and other things that are made from clay (= heavy earth that becomes hard when it is baked in an oven)", examples: ["This shop sells beautiful pottery."], lesson: 3 },
  { word: "souvenir", phonetic: "/ ˌsuːvəˈnɪə /", pos: "n.", definition: "sth that you keep to remember a place or a special event", examples: ["Are there any souvenir shops here?"], lesson: 3 },
];
