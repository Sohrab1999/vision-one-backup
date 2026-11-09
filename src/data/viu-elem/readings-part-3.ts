// متن ارائهٔ درس‌های VIU Elementary (پارتیت 3) + تمرین‌های غیرقابل‌تبدیل با پاسخ عین Answer key
// fa همهٔ پاراگراف‌ها = ترجمهٔ ماشینی GLM (کلاس FA-NEW) — هیچ متن فارسی چاپی در کتاب وجود ندارد
import type { Reading } from "../types";

export const READINGS_PART_3: Reading[] = [
  {
    id: "viu-elem-l31",
    lesson: 31,
    title: "Clothes",
    titleFa: "لباس (کلاه، پیراهن)",
    source: "VIU Elementary 2nd ed — درس 31 (کتاب ص66-67)",
    paragraphs: [
      {
        en: "My suit is new but these trousers are old. Her shorts/jeans/tights are blue.",
        fa: "کت‌وشلوار من نو است ولی این شلوارها کهنه‌اند. شلوارک/جین/جوراب‌شلواریِ او آبی است."
      },
      {
        en: "You wear clothes but you carry things. [NOT you use clothes]",
        fa: "شما لباس «می‌پوشید» ولی چیزها را «حمل می‌کنید». [نه use clothes]"
      },
      {
        en: "Naomi is wearing a long red coat. She's carrying a suitcase and a small handbag.",
        fa: "نائومی یک پالتوی قرمز بلند پوشیده است. او یک چمدان و یک کیف دستی کوچک حمل می‌کند."
      },
      {
        en: "You can also say: Naomi has (got) a red coat on.",
        fa: "همچنین می‌توانید بگویید: نائومی یک پالتوی قرمز به تن دارد."
      },
      {
        en: "You carry a briefcase and an umbrella.",
        fa: "شما یک کیف کار و یک چتر حمل می‌کنید."
      },
      {
        en: "In the morning you get dressed or put your clothes on. At night you get undressed or take your clothes off.",
        fa: "صبح‌ها لباس می‌پوشید. شب‌ها لباس درمی‌آورید."
      }
    ],
    exercise: {
      instruction: "31.1 Put these words into one or both columns. — 31.2 Match the part of the body with the item of clothing. — 31.4 Look at the picture and write the names next to the numbers. — 31.5 Write a paragraph about what you are wearing today.",
      instructionFa: "این کلمات را در یک یا هر دو ستون قرار دهید. — بخش بدن را با لباس متناظر آن وصل کنید. — به تصویر نگاه کنید و نام‌ها را کنار شماره‌ها بنویسید. — یک بند دربارهٔ لباسی که امروز پوشیده‌اید بنویسید.",
      items: [
        {
          en: "men / women (coat / coat given as examples)",
          fa: "مردان / زنان (coat به‌عنوان نمونه داده شده)",
          answerEn: "All the words fit into both columns except for tie – men; skirt, dress, handbag – women.",
          answerFa: "تمام کلمات در هر دو ستینج می‌آیند به جز بند – مردان; دامن، پیراهن، کیف دستی – زنان."
        },
        {
          en: "1 ________",
          fa: "۱ ________",
          answerEn: "foot – shoe",
          answerFa: "پا – کفش"
        },
        {
          en: "2 ________",
          fa: "۲ ________",
          answerEn: "finger – ring",
          answerFa: "انگشت – حلقه"
        },
        {
          en: "3 ________",
          fa: "۳ ________",
          answerEn: "legs – tights",
          answerFa: "پاها – جوراب شلواری"
        },
        {
          en: "4 ________",
          fa: "۴ ________",
          answerEn: "eyes – glasses",
          answerFa: "چشمها – عینک"
        },
        {
          en: "5 ________",
          fa: "۵ ________",
          answerEn: "waist – belt",
          answerFa: "کمر – کمربند"
        },
        {
          en: "6 ________",
          fa: "۶ ________",
          answerEn: "head – hat",
          answerFa: "سر – کلاه"
        },
        {
          en: "7 ________",
          fa: "۷ ________",
          answerEn: "neck – scarf",
          answerFa: "گردن – شال گردن"
        },
        {
          en: "8 ________",
          fa: "۸ ________",
          answerEn: "hand – glove",
          answerFa: "دست – دستکش"
        },
        {
          en: "1 ________ to 10 ________ (labels on the picture)",
          fa: "۱ تا ۱۰ (برچسب‌های تصویر)",
          answerEn: "1 sunglasses | 2 jersey | 3 watch | 4 skirt | 5 brief-case | 6 hat | 7 shirt | 8 coat | 9 umbrella | 10 boots",
          answerFa: "1 عینک آفتابی | 2 پیراهن ورزشی | 3 ساعت مچی | 4 دامن | 5 کفش دستی | 6 کلاه | 7 پیراهن | 8 کت | 9 چتر | 10 چکمه‌ها"
        },
        {
          en: "I'm wearing a white T-shirt and a blue jumper. I've got a pair of black trousers on. I'm wearing blue socks and white trainers. I've also got a watch and a pair of glasses on.",
          fa: "(نوشتهٔ نمونه) یک تی‌شرت سفید و یک پلیور آبی پوشیده‌ام. یک شلوار مشکی به تن دارم. جوراب آبی و کفش اسپرت سفید پوشیده‌ام. همچنین ساعت و عینک دارم.",
          answerEn: "Possible answer: I am wearing a blue T-shirt and black trousers. I have got white shoes on. I'm wearing a watch, three rings and a pair of glasses.",
          answerFa: "پاسخ ممکن: من یک تی‌شرت آبی و شلوار سیاه به تن دارم. کفش سفید به پا دارم. من یک ساعت مچی، سه حلقه و یک عینک به چشم دارم."
        }
      ]
    }
  },
  {
    id: "viu-elem-l32",
    lesson: 32,
    title: "Describing people",
    titleFa: "وصف آدم‌ها (بلندقامت، گندمگون، خوش‌قیافه)",
    source: "VIU Elementary 2nd ed — درس 32 (کتاب ص68-69)",
    paragraphs: [
      {
        en: "Mary Pimm is a very tall woman. [NOT Mary Pimm is a very high woman.]",
        fa: "مری پیم زنی بسیار بلندقد است. (نه: زنی بسیار high)"
      },
      {
        en: "Tom Jakes is quite short. [NOT Tom Jakes is quite low.]",
        fa: "تام جیکس نسبتاً کوتاه‌قد است. (نه: نسبتاً low)"
      },
      {
        en: "If you aren't tall or short, you are medium height.",
        fa: "اگر نه بلندقد هستی نه کوتاه‌قد، قدت متوسط است."
      },
      {
        en: "To ask if someone is tall or short, we say: How tall is Mary/Tom? She's 1.60 metres tall. / He's 1.48 metres tall.",
        fa: "برای پرسیدن قد کسی می‌گوییم: قد مری/تام چقدر است؟ او ۱٫۶۰ متر قد دارد / او ۱٫۴۸ متر قد دارد."
      },
      {
        en: "Dolly Ryan is really slim.",
        fa: "دالی رایان واقعاً خوش‌اندام است."
      },
      {
        en: "I was very thin when I was in hospital. (thin is a more negative word)",
        fa: "وقتی در بیمارستان بودم خیلی لاغر بودم. (thin واژه منفی‌تری است)"
      },
      {
        en: "A rather fat man opened the door. (fat is quite negative)",
        fa: "مرد نسبتاً چاقی در را باز کرد. (fat تقریباً منفی است)"
      },
      {
        en: "The doctor said I am overweight. (= more kilos than is good for me)",
        fa: "دکتر گفت من اضافه‌وزن دارم. (= کیلوی بیشتر از حد خوب برایم)"
      },
      {
        en: "How much do you weigh? I weigh 62 kilos / 74 kilos, etc.",
        fa: "وزنت چند کیلو است؟ من ۶۲ کیلو / ۷۴ کیلو وزن دارم و غیره."
      },
      {
        en: "Sally has dark hair and dark skin. She has brown eyes.",
        fa: "سالی موی تیره و پوست تیره دارد. او چشمان قهوه‌ای دارد."
      },
      {
        en: "Polly has blonde (or fair) hair and fair skin. She has blue eyes.",
        fa: "پالی موی بور (روشن) و پوست روشن دارد. او چشمان آبی دارد."
      },
      {
        en: "Billy has a beard and long hair. He has green eyes.",
        fa: "بیلی ریش و موهای بلند دارد. او چشمان سبز دارد."
      },
      {
        en: "Harry has a moustache and short hair.",
        fa: "هری سبیل و موهای کوتاه دارد."
      },
      {
        en: "You can also use has got, for example, Sally has got dark hair and dark skin.",
        fa: "می‌توانید از has got هم استفاده کنید، مثلاً سالی موی تیره و پوست تیره دارد."
      },
      {
        en: "My grandmother is 97. She's very old. My sister is 14. She's young, but would like to be older. My father is 56. He's middle-aged, but would like to be younger!",
        fa: "مادربزرگم ۹۷ ساله است. او خیلی پیر است. خواهرم ۱۴ ساله است. او جوان است اما دوست دارد بزرگ‌تر باشد. پدرم ۵۶ ساله است. او میان‌سال است اما دوست دارد جوان‌تر باشد!"
      },
      {
        en: "This hospital is for elderly people. (more polite than old)",
        fa: "این بیمارستان برای سالخوردگان است. (مؤدبانه‌تر از old)"
      },
      {
        en: "My sister is quite pretty. (++) (usually girls/women only). She's a very beautiful girl. (+++) Jim's a very handsome man. (+++) (usually for men only) Bob's a rather ugly man. (---)",
        fa: "خواهرم نسبتاً خوش‌چهره است (+++) (معمولاً فقط برای دختران/زنان). او دختر بسیار زیبایی است (+++). جیم مرد بسیار خوش‌قیافه‌ای است (+++) (معمولاً فقط برای مردان). باب مرد نسبتاً زشتی است (---)."
      },
      {
        en: "I'm not ugly or beautiful, I'm just ordinary-looking! (+/-)",
        fa: "من نه زشت هستم نه زیبا، من فقط عادی‌چهره‌ام! (+/-)"
      }
    ],
    exercise: {
      instruction: "32.1 Fill the gaps in the sentences. — 32.2 Ask questions for these answers. Use the words in brackets. — 32.4 Write down the names of three people you know. Then write about:",
      instructionFa: "جاهای خالی جمله‌ها را پر کنید. — برای این پاسخ‌ها سؤال بسازید. از واژه‌های داخل پرانتز استفاده کنید. — نام سه نفری که می‌شناسید را بنویسید. سپس درباره‌ی این‌ها بنویسید:",
      items: [
        {
          en: "He's only one metre 52. He's quite ________",
          fa: "او فقط قدش ۱ متر ۵۲ است. او نسبتاً ________ است.",
          answerEn: "2 tall | 3 slim/thin | 4 fair | 5 young | 6 fat/overweight | 7 elderly",
          answerFa: "2 بلند | 3 لاغر/کم‌جان | 4 روشن (رنگ مو) | 5 جوان | 6 چاق/اضافه وزن | 7 مسن"
        },
        {
          en: "Very ________ people are often good at basketball.",
          fa: "افراد بسیار ________ اغلب در بسکتبال خوب هستند.",
          answerEn: "2 tall | 3 slim/thin | 4 fair | 5 young | 6 fat/overweight | 7 elderly",
          answerFa: "2 بلند | 3 لاغر/کم‌جان | 4 روشن (رنگ مو) | 5 جوان | 6 چاق/اضافه وزن | 7 مسن"
        },
        {
          en: "Models are usually ________.",
          fa: "مانکن‌ها معمولاً ________ هستند.",
          answerEn: "2 tall | 3 slim/thin | 4 fair | 5 young | 6 fat/overweight | 7 elderly",
          answerFa: "2 بلند | 3 لاغر/کم‌جان | 4 روشن (رنگ مو) | 5 جوان | 6 چاق/اضافه وزن | 7 مسن"
        },
        {
          en: "Is her skin dark? No it's ________",
          fa: "پوستش تیره است؟ نه، ________ است.",
          answerEn: "2 tall | 3 slim/thin | 4 fair | 5 young | 6 fat/overweight | 7 elderly",
          answerFa: "2 بلند | 3 لاغر/کم‌جان | 4 روشن (رنگ مو) | 5 جوان | 6 چاق/اضافه وزن | 7 مسن"
        },
        {
          en: "She's only 12. She's very ________",
          fa: "او فقط ۱۲ سال دارد. او خیلی ________ است.",
          answerEn: "2 tall | 3 slim/thin | 4 fair | 5 young | 6 fat/overweight | 7 elderly",
          answerFa: "2 بلند | 3 لاغر/کم‌جان | 4 روشن (رنگ مو) | 5 جوان | 6 چاق/اضافه وزن | 7 مسن"
        },
        {
          en: "If I eat too much I'll be ________",
          fa: "اگر زیادی بخورم ________ می‌شوم.",
          answerEn: "2 tall | 3 slim/thin | 4 fair | 5 young | 6 fat/overweight | 7 elderly",
          answerFa: "2 بلند | 3 لاغر/کم‌جان | 4 روشن (رنگ مو) | 5 جوان | 6 چاق/اضافه وزن | 7 مسن"
        },
        {
          en: "My grandmother is in this hospital. It's a hospital for ________ people. (don't use 'old')",
          fa: "مادربزرگم در این بیمارستان است. این بیمارستانی برای افراد ________ است. (از old استفاده نکنید)",
          answerEn: "2 tall | 3 slim/thin | 4 fair | 5 young | 6 fat/overweight | 7 elderly",
          answerFa: "2 بلند | 3 لاغر/کم‌جان | 4 روشن (رنگ مو) | 5 جوان | 6 چاق/اضافه وزن | 7 مسن"
        },
        {
          en: "________ (your brother) He's about one metre 75.",
          fa: "________ (برادرت) او حدوداً قدش ۱ متر ۷۵ است.",
          answerEn: "Possible questions: 2 Is Elena's hair blonde/fair? Has Elena got blonde/fair hair? Does Elena have blonde/fair hair? | 3 Is Mike's hair long? Does Mike have long hair? Has Mike got long hair? | 4 Are your parents old? (or more polite: Are your parents elderly?) | 5 Is his sister pretty/beautiful? | 6 Why is Sara so thin? Why does Sara look so thin? Sara looks very thin, doesn't she?",
          answerFa: "سوالات ممکن: 2 موهای النا بلوند/روشن است؟ النا موهای بلوند/روشن دارد؟ النا موهای بلوند/روشن دارد؟ | 3 موهای مایک بلند است؟ مایک موهای بلند دارد؟ مایک موهای بلند دارد؟ | 4 پدر و مادر شما مسن هستند؟ (یا محترمانه‌تر: پدر و مادر شما مسن هستند؟) | 5 خواهرش زیبا/خوشگله؟ | 6 چرا سارا اینقدر لاغر است؟ چرا سارا اینقدر لاغر به نظر می‌رسد؟ سارا خیلی لاغر به نظر می‌رسه، نه؟"
        },
        {
          en: "Is ________ ? (Elena's hair) No, her hair's dark.",
          fa: "آیا ________؟ (موی النا) نه، مویش تیره است.",
          answerEn: "Possible questions: 2 Is Elena's hair blonde/fair? Has Elena got blonde/fair hair? Does Elena have blonde/fair hair? | 3 Is Mike's hair long? Does Mike have long hair? Has Mike got long hair? | 4 Are your parents old? (or more polite: Are your parents elderly?) | 5 Is his sister pretty/beautiful? | 6 Why is Sara so thin? Why does Sara look so thin? Sara looks very thin, doesn't she?",
          answerFa: "سوالات ممکن: 2 موهای النا بلوند/روشن است؟ النا موهای بلوند/روشن دارد؟ النا موهای بلوند/روشن دارد؟ | 3 موهای مایک بلند است؟ مایک موهای بلند دارد؟ مایک موهای بلند دارد؟ | 4 پدر و مادر شما مسن هستند؟ (یا محترمانه‌تر: پدر و مادر شما مسن هستند؟) | 5 خواهرش زیبا/خوشگله؟ | 6 چرا سارا اینقدر لاغر است؟ چرا سارا اینقدر لاغر به نظر می‌رسد؟ سارا خیلی لاغر به نظر می‌رسه، نه؟"
        },
        {
          en: "Is ________ ? (Mike's hair) Yes, it is quite long.",
          fa: "آیا ________؟ (موی مایک) بله، نسبتاً بلند است.",
          answerEn: "Possible questions: 2 Is Elena's hair blonde/fair? Has Elena got blonde/fair hair? Does Elena have blonde/fair hair? | 3 Is Mike's hair long? Does Mike have long hair? Has Mike got long hair? | 4 Are your parents old? (or more polite: Are your parents elderly?) | 5 Is his sister pretty/beautiful? | 6 Why is Sara so thin? Why does Sara look so thin? Sara looks very thin, doesn't she?",
          answerFa: "سوالات ممکن: 2 موهای النا بلوند/روشن است؟ النا موهای بلوند/روشن دارد؟ النا موهای بلوند/روشن دارد؟ | 3 موهای مایک بلند است؟ مایک موهای بلند دارد؟ مایک موهای بلند دارد؟ | 4 پدر و مادر شما مسن هستند؟ (یا محترمانه‌تر: پدر و مادر شما مسن هستند؟) | 5 خواهرش زیبا/خوشگله؟ | 6 چرا سارا اینقدر لاغر است؟ چرا سارا اینقدر لاغر به نظر می‌رسد؟ سارا خیلی لاغر به نظر می‌رسه، نه؟"
        },
        {
          en: "Are ________ ? (your parents) Not really, they're middle-aged.",
          fa: "آیا ________؟ (والدینت) چندان، آن‌ها میان‌سال هستند.",
          answerEn: "Possible questions: 2 Is Elena's hair blonde/fair? Has Elena got blonde/fair hair? Does Elena have blonde/fair hair? | 3 Is Mike's hair long? Does Mike have long hair? Has Mike got long hair? | 4 Are your parents old? (or more polite: Are your parents elderly?) | 5 Is his sister pretty/beautiful? | 6 Why is Sara so thin? Why does Sara look so thin? Sara looks very thin, doesn't she?",
          answerFa: "سوالات ممکن: 2 موهای النا بلوند/روشن است؟ النا موهای بلوند/روشن دارد؟ النا موهای بلوند/روشن دارد؟ | 3 موهای مایک بلند است؟ مایک موهای بلند دارد؟ مایک موهای بلند دارد؟ | 4 پدر و مادر شما مسن هستند؟ (یا محترمانه‌تر: پدر و مادر شما مسن هستند؟) | 5 خواهرش زیبا/خوشگله؟ | 6 چرا سارا اینقدر لاغر است؟ چرا سارا اینقدر لاغر به نظر می‌رسد؟ سارا خیلی لاغر به نظر می‌رسه، نه؟"
        },
        {
          en: "Is ________ ? (his sister) Yes, all the boys want to go out with her.",
          fa: "آیا ________؟ (خواهرش) بله، همه پسرها می‌خواهند با او بیرون بروند.",
          answerEn: "Possible questions: 2 Is Elena's hair blonde/fair? Has Elena got blonde/fair hair? Does Elena have blonde/fair hair? | 3 Is Mike's hair long? Does Mike have long hair? Has Mike got long hair? | 4 Are your parents old? (or more polite: Are your parents elderly?) | 5 Is his sister pretty/beautiful? | 6 Why is Sara so thin? Why does Sara look so thin? Sara looks very thin, doesn't she?",
          answerFa: "سوالات ممکن: 2 موهای النا بلوند/روشن است؟ النا موهای بلوند/روشن دارد؟ النا موهای بلوند/روشن دارد؟ | 3 موهای مایک بلند است؟ مایک موهای بلند دارد؟ مایک موهای بلند دارد؟ | 4 پدر و مادر شما مسن هستند؟ (یا محترمانه‌تر: پدر و مادر شما مسن هستند؟) | 5 خواهرش زیبا/خوشگله؟ | 6 چرا سارا اینقدر لاغر است؟ چرا سارا اینقدر لاغر به نظر می‌رسد؟ سارا خیلی لاغر به نظر می‌رسه، نه؟"
        },
        {
          en: "Why ________ ? (Sara - thin) She has been very ill.",
          fa: "چرا ________؟ (سارا – لاغر) او خیلی مریض بوده است.",
          answerEn: "Possible questions: 2 Is Elena's hair blonde/fair? Has Elena got blonde/fair hair? Does Elena have blonde/fair hair? | 3 Is Mike's hair long? Does Mike have long hair? Has Mike got long hair? | 4 Are your parents old? (or more polite: Are your parents elderly?) | 5 Is his sister pretty/beautiful? | 6 Why is Sara so thin? Why does Sara look so thin? Sara looks very thin, doesn't she?",
          answerFa: "سوالات ممکن: 2 موهای النا بلوند/روشن است؟ النا موهای بلوند/روشن دارد؟ النا موهای بلوند/روشن دارد؟ | 3 موهای مایک بلند است؟ مایک موهای بلند دارد؟ مایک موهای بلند دارد؟ | 4 پدر و مادر شما مسن هستند؟ (یا محترمانه‌تر: پدر و مادر شما مسن هستند؟) | 5 خواهرش زیبا/خوشگله؟ | 6 چرا سارا اینقدر لاغر است؟ چرا سارا اینقدر لاغر به نظر می‌رسد؟ سارا خیلی لاغر به نظر می‌رسه، نه؟"
        },
        {
          en: "- their height (tall, short, medium height)",
          fa: "– قدشان (بلند، کوتاه، قد متوسط)",
          answerEn: "Possible answers: Joanna: Joanna is tall. She has long black hair and brown eyes. She's very pretty. | Kevin: Kevin is medium height. He has fair hair and a beard. His eyes are blue. He's quite ordinary-looking. | My mother: My mother is short, with grey hair. She has green eyes. She is a beautiful woman.",
          answerFa: "پاسخ‌های ممکن: جوآنا: جوآنا بلند است. او موهای بلند و مشکی و چشمان قهوه‌ای دارد. خیلی خوشگل است. | کوین: کوین قد متوسطی دارد. موهای روشنی دارد و ریش. چشمانش آبی است. او ظاهر کاملاً معمولی دارد. | مادرم: مادرم کوتاه قد است، با موهای خاکستری. او چشمان سبز دارد. او یک زن زیباست."
        },
        {
          en: "- their hair (colour, long, short, beard)",
          fa: "– موهایشان (رنگ، بلند، کوتاه، ریش)",
          answerEn: "Possible answers: Joanna: Joanna is tall. She has long black hair and brown eyes. She's very pretty. | Kevin: Kevin is medium height. He has fair hair and a beard. His eyes are blue. He's quite ordinary-looking. | My mother: My mother is short, with grey hair. She has green eyes. She is a beautiful woman.",
          answerFa: "پاسخ‌های ممکن: جوآنا: جوآنا بلند است. او موهای بلند و مشکی و چشمان قهوه‌ای دارد. خیلی خوشگل است. | کوین: کوین قد متوسطی دارد. موهای روشنی دارد و ریش. چشمانش آبی است. او ظاهر کاملاً معمولی دارد. | مادرم: مادرم کوتاه قد است، با موهای خاکستری. او چشمان سبز دارد. او یک زن زیباست."
        },
        {
          en: "- their eyes (colour)",
          fa: "– چشمانشان (رنگ)",
          answerEn: "Possible answers: Joanna: Joanna is tall. She has long black hair and brown eyes. She's very pretty. | Kevin: Kevin is medium height. He has fair hair and a beard. His eyes are blue. He's quite ordinary-looking. | My mother: My mother is short, with grey hair. She has green eyes. She is a beautiful woman.",
          answerFa: "پاسخ‌های ممکن: جوآنا: جوآنا بلند است. او موهای بلند و مشکی و چشمان قهوه‌ای دارد. خیلی خوشگل است. | کوین: کوین قد متوسطی دارد. موهای روشنی دارد و ریش. چشمانش آبی است. او ظاهر کاملاً معمولی دارد. | مادرم: مادرم کوتاه قد است، با موهای خاکستری. او چشمان سبز دارد. او یک زن زیباست."
        },
        {
          en: "- their looks (ordinary, handsome, etc.)",
          fa: "– ظاهرشان (عادی، خوش‌قیافه و غیره)",
          answerEn: "Possible answers: Joanna: Joanna is tall. She has long black hair and brown eyes. She's very pretty. | Kevin: Kevin is medium height. He has fair hair and a beard. His eyes are blue. He's quite ordinary-looking. | My mother: My mother is short, with grey hair. She has green eyes. She is a beautiful woman.",
          answerFa: "پاسخ‌های ممکن: جوآنا: جوآنا بلند است. او موهای بلند و مشکی و چشمان قهوه‌ای دارد. خیلی خوشگل است. | کوین: کوین قد متوسطی دارد. موهای روشنی دارد و ریش. چشمانش آبی است. او ظاهر کاملاً معمولی دارد. | مادرم: مادرم کوتاه قد است، با موهای خاکستری. او چشمان سبز دارد. او یک زن زیباست."
        }
      ]
    }
  },
  {
    id: "viu-elem-l33",
    lesson: 33,
    title: "Health and illness",
    titleFa: "سلامتی و بیماری (سردرد، حملهٔ قلبی)",
    source: "VIU Elementary 2nd ed — درس 33 (کتاب ص70-71)",
    paragraphs: [
      {
        en: "I am very well, thanks. I'm fine, thanks.",
        fa: "خیلی خوبم، ممنون. خوبم، ممنون."
      },
      {
        en: "I don't feel very well. I must go home and rest. (I'll probably be OK tomorrow)",
        fa: "حالم خیلی خوب نیست. باید به خانه بروم و استراحت کنم. (فردا احتمالاً خوب می‌شوم)"
      },
      {
        en: "I feel ill. Can you get a doctor please. (Perhaps a serious problem.)",
        fa: "حالم بد است. لطفاً می‌توانید پزشک بیاورید؟ (شاید مشکل جدی باشد.)"
      },
      {
        en: "That fish was bad. I think I'm going to be sick! (I want to vomit.)",
        fa: "آن ماهی خراب بود. فکر می‌کنم حالم می‌آد! (می‌خواهم استفراغ کنم.)"
      },
      {
        en: "Have you got an aspirin? I've got a headache.",
        fa: "آسپرین داری؟ سردرد دارم."
      },
      {
        en: "I've got toothache. I need to go to the dentist.",
        fa: "دندان‌درد دارم. باید به دندان‌پزشک بروم."
      },
      {
        en: "I'm going to bed with a hot drink. I've got a cold.",
        fa: "با یک نوشیدنی گرم می‌روم بخوابم. سرما خورده‌ام."
      },
      {
        en: "I get hay-fever every summer, from flowers and grass. I sneeze all day.",
        fa: "هر تابستان از گل‌ها و چمن‌ها تب یونجه می‌گیرم. همه روز عطسه می‌کنم."
      },
      {
        en: "My little brother has asthma; sometimes he can't breathe.",
        fa: "براد کوچکم آسم دارد؛ گاهی نمی‌تواند نفس بکشد."
      },
      {
        en: "In some countries, mosquitoes can give people malaria.",
        fa: "در بعضی کشورها پشه‌ها می‌توانند مالاریا به مردم منتقل کنند."
      },
      {
        en: "The drinking water was bad, and many children had cholera.",
        fa: "آب آشامیدنی آلوده بود و بسیاری از کودکان به وبا مبتلا شدند."
      },
      {
        en: "My father had a heart attack. He is in hospital.",
        fa: "پدرم حمله قلبی داشت. او در بیمارستان است."
      },
      {
        en: "Cancer kills many people who smoke ever year.",
        fa: "سرطان هر سال بسیاری از افراد سیگاری را می‌کشد."
      },
      {
        en: "Have a good diet: eat lots of fruit and vegetables.",
        fa: "رژیم غذایی خوب داشته باشید: مقدار زیادی میوه و سبزیجات بخورید."
      },
      {
        en: "Get some exercise: swimming, jogging, cycling are good for you.",
        fa: "کمی ورزش کنید: شنا، دویدن و دوچرخه‌سواری برای شما مفید است."
      },
      {
        en: "Don't have too much stress: relax after work, and don't panic about work!",
        fa: "استرس زیادی نداشته باشید: بعد از کار آرام باشید و درباره کار وحشت نکنید!"
      }
    ],
    exercise: {
      instruction: "33.1 Put these health problems in the three columns. Do you think they are not serious, more serious or very serious? — 33.3 Answer these questions for yourself. Use a dictionary if you have to. — 33.4 What illnesses are connected with ...",
      instructionFa: "این مشکلات سلامتی را در سه ستون قرار دهید. فکر می‌کنید کدام جدی نیست، نسبتاً جدی یا خیلی جدی است؟ — به این سؤال‌ها برای خودتان پاسخ دهید. در صورت نیاز از فرهنگ لغت استفاده کنید. — چه بیماری‌هایی با ... مرتبط هستند؟",
      items: [
        {
          en: "not serious / more serious / very serious (example: a headache)",
          fa: "جدی نیست / نسبتاً جدی / خیلی جدی (مثال: سردرد)",
          answerEn: "Possible answers: not serious: a headache, a cold, toothache | more serious: hay-fever, asthma | very serious: cancer, cholera, a heart attack",
          answerFa: "پاسخ‌های ممکن: جدی نیست: سردرد، سرماخوردگی، درد دندان | جدی‌تر: تب یونجه، آسم | بسیار جدی: سرطان، کولرا، سکته قلبی"
        },
        {
          en: "1 What do you think is a good diet?",
          fa: "به نظر شما رژیم غذایی خوب چیست؟",
          answerEn: "A lot of fruit and vegetables, not so many sweet things.",
          answerFa: "میوه و سبزیجات زیاد، شیرینی‌ها آنقدر زیاد نیست."
        },
        {
          en: "2 What sort of exercise do you like?",
          fa: "چه نوع ورزشی را دوست دارید؟",
          answerEn: "I like/love swimming/cycling/playing golf/skiing/jogging/playing tennis, etc.",
          answerFa: "من شنا/دوچرخه‌سواری/گلف‌بازی/اسکی/دویدن/تنیس و... را دوست دارم/عاشقش هستم."
        },
        {
          en: "3 Do you have a lot of stress in your life?",
          fa: "آیا در زندگی‌تان استرس زیادی دارید؟",
          answerEn: "Sometimes I have a lot of stress at work / when I have exams.",
          answerFa: "گاهی اوقات در محل کار/وقتی امتحان دارم استرس زیادی دارم."
        },
        {
          en: "4 Have you ever been in hospital?",
          fa: "آیا تا به حال در بیمارستان بستری بوده‌اید؟",
          answerEn: "Yes, I had an operation once / I broke my leg, etc. ('Be in hospital' means you are ill, you are a patient. 'Be in a hospital' can just mean you are visiting someone.)",
          answerFa: "بله، یک بار جراحی داشتم / پاهام شکست، و... . ('در بیمارستان بودن' به این معنی است که بیمار هستید، شما یک بیمارید. 'در یک بیمارستان بودن' فقط می‌تواند به این معنی باشد که برای دیدن کسی آنجا هستید.)"
        },
        {
          en: "1 a mosquito? malaria",
          fa: "پشه؟ مالاریا",
          answerEn: "2 cholera | 3 asthma | 4 hay-fever | 5 cancer / heart attacks (or heart disease)",
          answerFa: "2 کولرا | 3 آسم | 4 تب یونجه | 5 سرطان / سکته قلبی (یا بیماری قلبی)"
        },
        {
          en: "2 bad drinking water?",
          fa: "آب آشامیدنی آلوده؟",
          answerEn: "2 cholera | 3 asthma | 4 hay-fever | 5 cancer / heart attacks (or heart disease)",
          answerFa: "2 کولرا | 3 آسم | 4 تب یونجه | 5 سرطان / سکته قلبی (یا بیماری قلبی)"
        },
        {
          en: "3 pollution, traffic fumes?",
          fa: "آلودگی و دود ترافیک؟",
          answerEn: "2 cholera | 3 asthma | 4 hay-fever | 5 cancer / heart attacks (or heart disease)",
          answerFa: "2 کولرا | 3 آسم | 4 تب یونجه | 5 سرطان / سکته قلبی (یا بیماری قلبی)"
        },
        {
          en: "4 grass, flowers, etc.?",
          fa: "چمن، گل و غیره؟",
          answerEn: "2 cholera | 3 asthma | 4 hay-fever | 5 cancer / heart attacks (or heart disease)",
          answerFa: "2 کولرا | 3 آسم | 4 تب یونجه | 5 سرطان / سکته قلبی (یا بیماری قلبی)"
        },
        {
          en: "5 smoking?",
          fa: "سیگار کشیدن؟",
          answerEn: "2 cholera | 3 asthma | 4 hay-fever | 5 cancer / heart attacks (or heart disease)",
          answerFa: "2 کولرا | 3 آسم | 4 تب یونجه | 5 سرطان / سکته قلبی (یا بیماری قلبی)"
        }
      ]
    }
  },
  {
    id: "viu-elem-l34",
    lesson: 34,
    title: "Feelings",
    titleFa: "احساسات (عشق، خسته)",
    source: "VIU Elementary 2nd ed — درس 34 (کتاب ص72-73)",
    paragraphs: [
      {
        en: "I love my family and my best friend.",
        fa: "من خانواده‌ام و بهترین دوستم را دوست دارم."
      },
      {
        en: "I like my job.",
        fa: "من شغلم را دوست دارم."
      },
      {
        en: "I don't like horror films. (I dislike (horror films) is less common.)",
        fa: "من فیلم‌های ترسناک را دوست ندارم. (dislike کمتر رایج است.)"
      },
      {
        en: "I hate my boss.",
        fa: "از رئیسم متنفرم."
      },
      {
        en: "I prefer coffee to tea. (= I like coffee more than I like tea.)",
        fa: "قهوه را به چای ترجیح می‌دهم. (یعنی قهوه را بیشتر از چای دوست دارم.)"
      },
      {
        en: "I want (= I would like) a new car. (want + noun)",
        fa: "من یک ماشین جدید می‌خواهم. (want + اسم)"
      },
      {
        en: "I want to buy a new car. (want + infinitive)",
        fa: "می‌خواهم یک ماشین جدید بخرم. (want + مصدر)"
      },
      {
        en: "Note: I want my father to buy a new car. (verb + object + infinitive) [NOT I want that ...]",
        fa: "نکته: می‌خواهم پدرم ماشین جدید بخرد. (فعل + مفعول + مصدر) [نه I want that...]"
      },
      {
        en: "I hope to do well in my exam. (hope + infinitive)",
        fa: "امیدوارم در امتحانم خوب عمل کنم. (hope + مصدر)"
      },
      {
        en: "I hope (that) my friend does well in his exam. (hope + that clause)",
        fa: "امیدوارم دوستم در امتحانش خوب عمل کند. (hope + جمله با that)"
      }
    ],
    exercise: {
      instruction: "34.1 Do you love, like, not like or hate these things? Write sentences. — 34.2 Which do you prefer – tea or coffee? Write answers as in the example. — 34.3 Answer these questions using want or hope. — 34.4 Look at the pictures. How do they feel? Use one of the words from B opposite. — 34.5 When did you last feel ...",
      instructionFa: "آیا این چیزها را دوست دارید، می‌پسندید، نمی‌پسندید یا از آن‌ها متنفرید؟ جمله بنویسید. — کدام را ترجیح می‌دهید — چای یا قهوه؟ مانند مثال پاسخ بنویسید. — به این سؤال‌ها با استفاده از want یا hope پاسخ دهید. — به تصویرها نگاه کن. حال آن‌ها چطور است؟ از یکی از واژه‌های بخش B صفحهٔ مقابل استفاده کن. — آخرین بار کی احساس ... داشتی؟",
      items: [
        {
          en: "1 chocolate",
          fa: "شکلات",
          answerEn: "I love chocolate.",
          answerFa: "من شکلات را دوست دارم."
        },
        {
          en: "2 cowboy films",
          fa: "فیلم‌های وسترن (کابویی)",
          answerEn: "I hate cowboy films.",
          answerFa: "من فیلم‌های وسترن را بیزارم."
        },
        {
          en: "3 aeroplanes",
          fa: "هواپیماها",
          answerEn: "I like aeroplanes.",
          answerFa: "من هواپیما را دوست دارم."
        },
        {
          en: "4 tea",
          fa: "چای",
          answerEn: "I like tea.",
          answerFa: "من چای را دوست دارم."
        },
        {
          en: "5 football",
          fa: "فوتبال",
          answerEn: "I don't like football.",
          answerFa: "من فوتبال را دوست ندارم."
        },
        {
          en: "6 cats",
          fa: "گربه‌ها",
          answerEn: "I love cats.",
          answerFa: "من گربه‌ها را دوست دارم."
        },
        {
          en: "7 cars",
          fa: "ماشین‌ها",
          answerEn: "I like cars.",
          answerFa: "من ماشین را دوست دارم."
        },
        {
          en: "8 jazz music",
          fa: "موسیقی جاز",
          answerEn: "I don't like jazz music.",
          answerFa: "من موسیقی جاز را دوست ندارم."
        },
        {
          en: "1 tea or coffee? I prefer coffee to tea.",
          fa: "چای یا قهوه؟ قهوه را به چای ترجیح می‌دهم.",
          answerEn: "Possible answers: 2 I prefer cats to dogs. | 3 I prefer sightseeing to sunbathing. | 4 I prefer BMWs to Rolls Royces. | 5 I prefer strawberry to chocolate ice-cream. | 6 I prefer watching sport to doing sport.",
          answerFa: "پاسخ‌های ممکن: 2 من گربه‌ها را نسبت به سگ‌ها ترجیح می‌دهم. | 3 من观光 را نسبت به آفتاب‌گیری ترجیح می‌دهم. | 4 من بی‌ام‌وها را نسبت به رولزرویس‌ها ترجیح می‌دهم. | 5 من توت‌فرنگی را نسبت به بستنی شکلاتی ترجیح می‌دهم. | 6 من تماشای ورزش را نسبت به انجام ورزش ترجیح می‌دهم."
        },
        {
          en: "2 dogs or cats?",
          fa: "سگ یا گربه؟",
          answerEn: "Possible answers: 2 I prefer cats to dogs. | 3 I prefer sightseeing to sunbathing. | 4 I prefer BMWs to Rolls Royces. | 5 I prefer strawberry to chocolate ice-cream. | 6 I prefer watching sport to doing sport.",
          answerFa: "پاسخ‌های ممکن: 2 من گربه‌ها را نسبت به سگ‌ها ترجیح می‌دهم. | 3 من观光 را نسبت به آفتاب‌گیری ترجیح می‌دهم. | 4 من بی‌ام‌وها را نسبت به رولزرویس‌ها ترجیح می‌دهم. | 5 من توت‌فرنگی را نسبت به بستنی شکلاتی ترجیح می‌دهم. | 6 من تماشای ورزش را نسبت به انجام ورزش ترجیح می‌دهم."
        },
        {
          en: "3 sunbathing or sightseeing?",
          fa: "آفتاب گرفتن یا بازدید از دیدنی‌ها؟",
          answerEn: "Possible answers: 2 I prefer cats to dogs. | 3 I prefer sightseeing to sunbathing. | 4 I prefer BMWs to Rolls Royces. | 5 I prefer strawberry to chocolate ice-cream. | 6 I prefer watching sport to doing sport.",
          answerFa: "پاسخ‌های ممکن: 2 من گربه‌ها را نسبت به سگ‌ها ترجیح می‌دهم. | 3 من观光 را نسبت به آفتاب‌گیری ترجیح می‌دهم. | 4 من بی‌ام‌وها را نسبت به رولزرویس‌ها ترجیح می‌دهم. | 5 من توت‌فرنگی را نسبت به بستنی شکلاتی ترجیح می‌دهم. | 6 من تماشای ورزش را نسبت به انجام ورزش ترجیح می‌دهم."
        },
        {
          en: "4 BMWs or Rolls Royces?",
          fa: "بی‌ام‌و یا رولز رویس؟",
          answerEn: "Possible answers: 2 I prefer cats to dogs. | 3 I prefer sightseeing to sunbathing. | 4 I prefer BMWs to Rolls Royces. | 5 I prefer strawberry to chocolate ice-cream. | 6 I prefer watching sport to doing sport.",
          answerFa: "پاسخ‌های ممکن: 2 من گربه‌ها را نسبت به سگ‌ها ترجیح می‌دهم. | 3 من观光 را نسبت به آفتاب‌گیری ترجیح می‌دهم. | 4 من بی‌ام‌وها را نسبت به رولزرویس‌ها ترجیح می‌دهم. | 5 من توت‌فرنگی را نسبت به بستنی شکلاتی ترجیح می‌دهم. | 6 من تماشای ورزش را نسبت به انجام ورزش ترجیح می‌دهم."
        },
        {
          en: "5 strawberry or chocolate ice-cream?",
          fa: "بستنی توت‌فرنگی یا شکلاتی؟",
          answerEn: "Possible answers: 2 I prefer cats to dogs. | 3 I prefer sightseeing to sunbathing. | 4 I prefer BMWs to Rolls Royces. | 5 I prefer strawberry to chocolate ice-cream. | 6 I prefer watching sport to doing sport.",
          answerFa: "پاسخ‌های ممکن: 2 من گربه‌ها را نسبت به سگ‌ها ترجیح می‌دهم. | 3 من观光 را نسبت به آفتاب‌گیری ترجیح می‌دهم. | 4 من بی‌ام‌وها را نسبت به رولزرویس‌ها ترجیح می‌دهم. | 5 من توت‌فرنگی را نسبت به بستنی شکلاتی ترجیح می‌دهم. | 6 من تماشای ورزش را نسبت به انجام ورزش ترجیح می‌دهم."
        },
        {
          en: "6 watching sport or doing sport?",
          fa: "تماشای ورزش یا انجام ورزش؟",
          answerEn: "Possible answers: 2 I prefer cats to dogs. | 3 I prefer sightseeing to sunbathing. | 4 I prefer BMWs to Rolls Royces. | 5 I prefer strawberry to chocolate ice-cream. | 6 I prefer watching sport to doing sport.",
          answerFa: "پاسخ‌های ممکن: 2 من گربه‌ها را نسبت به سگ‌ها ترجیح می‌دهم. | 3 من观光 را نسبت به آفتاب‌گیری ترجیح می‌دهم. | 4 من بی‌ام‌وها را نسبت به رولزرویس‌ها ترجیح می‌دهم. | 5 من توت‌فرنگی را نسبت به بستنی شکلاتی ترجیح می‌دهم. | 6 من تماشای ورزش را نسبت به انجام ورزش ترجیح می‌دهم."
        },
        {
          en: "1 You're thirsty. What do you want? I want a cup of tea.",
          fa: "تشنه‌ای. چه می‌خواهی؟ یک فنجان چای می‌خواهم.",
          answerEn: "Possible answers: 2 I hope (that) the lesson ends soon. | 3 I want some food. | 4 I hope (that) my friend feels better soon. | 5 I want to go to bed. | 6 I want to cry. | 7 I hope (that) it gets warmer soon.",
          answerFa: "پاسخ‌های ممکن: 2 امیدوارم درس زود تمام شود. | 3 من به غذا نیاز دارم. | 4 امیدوارم دوستم زود بهتر شود. | 5 می‌خواهم به رختخواب بروم. | 6 می‌خواهم گریه کنم. | 7 امیدوارم زود گرم‌تر شود."
        },
        {
          en: "2 The lesson feels very long. What do you hope?",
          fa: "کلاس خیلی طولانی به نظر می‌رسد. چه چیزی را امیدواری؟",
          answerEn: "Possible answers: 2 I hope (that) the lesson ends soon. | 3 I want some food. | 4 I hope (that) my friend feels better soon. | 5 I want to go to bed. | 6 I want to cry. | 7 I hope (that) it gets warmer soon.",
          answerFa: "پاسخ‌های ممکن: 2 امیدوارم درس زود تمام شود. | 3 من به غذا نیاز دارم. | 4 امیدوارم دوستم زود بهتر شود. | 5 می‌خواهم به رختخواب بروم. | 6 می‌خواهم گریه کنم. | 7 امیدوارم زود گرم‌تر شود."
        },
        {
          en: "3 You're hungry. What do you want?",
          fa: "گرسنه‌ای. چه می‌خواهی؟",
          answerEn: "Possible answers: 2 I hope (that) the lesson ends soon. | 3 I want some food. | 4 I hope (that) my friend feels better soon. | 5 I want to go to bed. | 6 I want to cry. | 7 I hope (that) it gets warmer soon.",
          answerFa: "پاسخ‌های ممکن: 2 امیدوارم درس زود تمام شود. | 3 من به غذا نیاز دارم. | 4 امیدوارم دوستم زود بهتر شود. | 5 می‌خواهم به رختخواب بروم. | 6 می‌خواهم گریه کنم. | 7 امیدوارم زود گرم‌تر شود."
        },
        {
          en: "4 Your friend feels ill. What do you hope?",
          fa: "دوستت حالش بد است. چه چیزی را امیدواری؟",
          answerEn: "Possible answers: 2 I hope (that) the lesson ends soon. | 3 I want some food. | 4 I hope (that) my friend feels better soon. | 5 I want to go to bed. | 6 I want to cry. | 7 I hope (that) it gets warmer soon.",
          answerFa: "پاسخ‌های ممکن: 2 امیدوارم درس زود تمام شود. | 3 من به غذا نیاز دارم. | 4 امیدوارم دوستم زود بهتر شود. | 5 می‌خواهم به رختخواب بروم. | 6 می‌خواهم گریه کنم. | 7 امیدوارم زود گرم‌تر شود."
        },
        {
          en: "5 You're tired. What do you want?",
          fa: "خسته‌ای. چه می‌خواهی؟",
          answerEn: "Possible answers: 2 I hope (that) the lesson ends soon. | 3 I want some food. | 4 I hope (that) my friend feels better soon. | 5 I want to go to bed. | 6 I want to cry. | 7 I hope (that) it gets warmer soon.",
          answerFa: "پاسخ‌های ممکن: 2 امیدوارم درس زود تمام شود. | 3 من به غذا نیاز دارم. | 4 امیدوارم دوستم زود بهتر شود. | 5 می‌خواهم به رختخواب بروم. | 6 می‌خواهم گریه کنم. | 7 امیدوارم زود گرم‌تر شود."
        },
        {
          en: "6 You're upset. What do you want?",
          fa: "دلخوری. چه می‌خواهی؟",
          answerEn: "Possible answers: 2 I hope (that) the lesson ends soon. | 3 I want some food. | 4 I hope (that) my friend feels better soon. | 5 I want to go to bed. | 6 I want to cry. | 7 I hope (that) it gets warmer soon.",
          answerFa: "پاسخ‌های ممکن: 2 امیدوارم درس زود تمام شود. | 3 من به غذا نیاز دارم. | 4 امیدوارم دوستم زود بهتر شود. | 5 می‌خواهم به رختخواب بروم. | 6 می‌خواهم گریه کنم. | 7 امیدوارم زود گرم‌تر شود."
        },
        {
          en: "7 It is very cold weather. What do you hope?",
          fa: "هوا خیلی سرد است. چه چیزی را امیدواری؟",
          answerEn: "Possible answers: 2 I hope (that) the lesson ends soon. | 3 I want some food. | 4 I hope (that) my friend feels better soon. | 5 I want to go to bed. | 6 I want to cry. | 7 I hope (that) it gets warmer soon.",
          answerFa: "پاسخ‌های ممکن: 2 امیدوارم درس زود تمام شود. | 3 من به غذا نیاز دارم. | 4 امیدوارم دوستم زود بهتر شود. | 5 می‌خواهم به رختخواب بروم. | 6 می‌خواهم گریه کنم. | 7 امیدوارم زود گرم‌تر شود."
        },
        {
          en: "1 Diana ________",
          fa: "دیانا ________",
          answerEn: "2 Fred is thirsty. | 3 The children are happy. | 4 William is cold. | 5 Mrs Jones is tired. | 6 Mr Jones is angry. | 7 Fiona is surprised.",
          answerFa: "2 فرد تشنه است. | 3 بچه‌ها خوشحال هستند. | 4 ویلیام سرد است. | 5 خانم جونز خسته است. | 6 آقای جونز عصبانی است. | 7 فیونا شگفت‌زده است."
        },
        {
          en: "2 Fred ________",
          fa: "فرد ________",
          answerEn: "2 Fred is thirsty. | 3 The children are happy. | 4 William is cold. | 5 Mrs Jones is tired. | 6 Mr Jones is angry. | 7 Fiona is surprised.",
          answerFa: "2 فرد تشنه است. | 3 بچه‌ها خوشحال هستند. | 4 ویلیام سرد است. | 5 خانم جونز خسته است. | 6 آقای جونز عصبانی است. | 7 فیونا شگفت‌زده است."
        },
        {
          en: "3 The children ________",
          fa: "بچه‌ها ________",
          answerEn: "2 Fred is thirsty. | 3 The children are happy. | 4 William is cold. | 5 Mrs Jones is tired. | 6 Mr Jones is angry. | 7 Fiona is surprised.",
          answerFa: "2 فرد تشنه است. | 3 بچه‌ها خوشحال هستند. | 4 ویلیام سرد است. | 5 خانم جونز خسته است. | 6 آقای جونز عصبانی است. | 7 فیونا شگفت‌زده است."
        },
        {
          en: "4 William ________",
          fa: "ویلیام ________",
          answerEn: "2 Fred is thirsty. | 3 The children are happy. | 4 William is cold. | 5 Mrs Jones is tired. | 6 Mr Jones is angry. | 7 Fiona is surprised.",
          answerFa: "2 فرد تشنه است. | 3 بچه‌ها خوشحال هستند. | 4 ویلیام سرد است. | 5 خانم جونز خسته است. | 6 آقای جونز عصبانی است. | 7 فیونا شگفت‌زده است."
        },
        {
          en: "5 Mrs Jones ________",
          fa: "خانم جونز ________",
          answerEn: "2 Fred is thirsty. | 3 The children are happy. | 4 William is cold. | 5 Mrs Jones is tired. | 6 Mr Jones is angry. | 7 Fiona is surprised.",
          answerFa: "2 فرد تشنه است. | 3 بچه‌ها خوشحال هستند. | 4 ویلیام سرد است. | 5 خانم جونز خسته است. | 6 آقای جونز عصبانی است. | 7 فیونا شگفت‌زده است."
        },
        {
          en: "6 Mr Jones ________",
          fa: "آقای جونز ________",
          answerEn: "2 Fred is thirsty. | 3 The children are happy. | 4 William is cold. | 5 Mrs Jones is tired. | 6 Mr Jones is angry. | 7 Fiona is surprised.",
          answerFa: "2 فرد تشنه است. | 3 بچه‌ها خوشحال هستند. | 4 ویلیام سرد است. | 5 خانم جونز خسته است. | 6 آقای جونز عصبانی است. | 7 فیونا شگفت‌زده است."
        },
        {
          en: "7 Fiona ________",
          fa: "فیونا ________",
          answerEn: "2 Fred is thirsty. | 3 The children are happy. | 4 William is cold. | 5 Mrs Jones is tired. | 6 Mr Jones is angry. | 7 Fiona is surprised.",
          answerFa: "2 فرد تشنه است. | 3 بچه‌ها خوشحال هستند. | 4 ویلیام سرد است. | 5 خانم جونز خسته است. | 6 آقای جونز عصبانی است. | 7 فیونا شگفت‌زده است."
        },
        {
          en: "1 angry?",
          fa: "عصبانی؟",
          answerEn: "Possible answers: 2 I felt surprised yesterday when an old friend rang me. | 3 I felt upset when my boss was rude to me.",
          answerFa: "پاسخ‌های ممکن: 2 دیروز وقتی یک دوست قدیمی من را صدا زد، شگفت‌زده شدم. | 3 وقتی رئیسم با من بی‌احترامی کرد، ناراحت شدم."
        },
        {
          en: "2 surprised?",
          fa: "متعجب؟",
          answerEn: "Possible answers: 2 I felt surprised yesterday when an old friend rang me. | 3 I felt upset when my boss was rude to me.",
          answerFa: "پاسخ‌های ممکن: 2 دیروز وقتی یک دوست قدیمی من را صدا زد، شگفت‌زده شدم. | 3 وقتی رئیسم با من بی‌احترامی کرد، ناراحت شدم."
        },
        {
          en: "3 upset?",
          fa: "دلخور؟",
          answerEn: "Possible answers: 2 I felt surprised yesterday when an old friend rang me. | 3 I felt upset when my boss was rude to me.",
          answerFa: "پاسخ‌های ممکن: 2 دیروز وقتی یک دوست قدیمی من را صدا زد، شگفت‌زده شدم. | 3 وقتی رئیسم با من بی‌احترامی کرد، ناراحت شدم."
        },
        {
          en: "I felt angry this morning when I read the newspaper.",
          fa: "امروز صبح وقتی روزنامه خواندم عصبانی شدم.",
          answerEn: "Possible answers: 2 I felt surprised yesterday when an old friend rang me. | 3 I felt upset when my boss was rude to me.",
          answerFa: "پاسخ‌های ممکن: 2 دیروز وقتی یک دوست قدیمی من را صدا زد، شگفت‌زده شدم. | 3 وقتی رئیسم با من بی‌احترامی کرد، ناراحت شدم."
        }
      ]
    }
  },
  {
    id: "viu-elem-l35",
    lesson: 35,
    title: "Greetings and other useful phrases",
    titleFa: "سلام و احوال‌پرسی و عبارت‌های مفید",
    source: "VIU Elementary 2nd ed — درس 35 (کتاب ص74-75)",
    paragraphs: [
      {
        en: "When we leave someone we usually both say Goodbye and perhaps, See you soon!",
        fa: "وقتی از کسی خداحافظی می‌کنیم معمولاً هر دو می‌گوییم Goodbye و شاید «به‌زودی می‌بینمت!»"
      },
      {
        en: "When someone goes to bed, we usually say Goodnight. We sometimes also say Sleep well.",
        fa: "وقتی کسی می‌خوابد معمولاً می‌گوییم شب بخیر، و گاهی «خواب راحتی داشته باشی»."
      },
      {
        en: "If you ask for something you usually say Please.",
        fa: "وقتی چیزی می‌خواهی معمولاً می‌گویی «لطفاً»."
      },
      {
        en: "If someone does something nice for you, you say Thank you.",
        fa: "اگر کسی کار خوبی برایت انجام دهد می‌گویی «متشکرم»."
      },
      {
        en: "When it is someone's birthday we say Happy Birthday [NOT Congratulations].",
        fa: "روز تولد کسی می‌گوییم تولدت مبارک [نه Congratulations]."
      },
      {
        en: "On (or near to) the 25th December (Christmas Day) we say Happy or Merry Christmas.",
        fa: "در یا نزدیک ۲۵ دسامبر (روز کریسمس) می‌گوییم کریسمس مبارک."
      },
      {
        en: "On (or near to) the 1st January (New Year's Day) we say Happy New Year.",
        fa: "در یا نزدیک اول ژانویه (روز سال نو) می‌گوییم سال نو مبارک."
      },
      {
        en: "If someone is going to do something difficult (for example, take an exam or have an interview for a job) we say Good luck!",
        fa: "اگر کسی قرار است کار دشواری انجام دهد (مثلاً امتحان بدهد یا مصاحبه شغلی داشته باشد) می‌گوییم موفق باشی!"
      },
      {
        en: "If someone has done something special (for example, done well in an exam, got a new job, had a baby) we say Congratulations! or Well done!",
        fa: "اگر کسی کار خاصی انجام داده باشد (مثلاً در امتحان خوب شده، کار جدید گرفته یا بچه دار شده) می‌گوییم تبریک! یا آفرین!"
      }
    ],
    exercise: {
      instruction: "35.2 What is the person saying in the pictures? — 35.3 What do you say? Choose a phrase opposite. — 35.4 Ann and Bill meet in a bar. Bill usually says the wrong thing. Correct his mistakes. — 35.5 Write a conversation using as many as possible of the phrases from the opposite page.",
      instructionFa: "شخص در تصویرها چه می‌گوید؟ — چه می‌گویید؟ یک عبارت از صفحه مقابل انتخاب کنید. — آن و بیل در بار هم را ملاقات می‌کنند. بیل معمولاً چیز اشتباهی می‌گوید. اشتباهاتش را اصلاح کنید. — یک گفتگو بنویسید و در آن تا حد امکان از عبارت‌های صفحه مقابل استفاده کنید.",
      items: [
        {
          en: "1 (picture)",
          fa: "تصویر ۱",
          answerEn: "Excuse me!",
          answerFa: "ببخشید!"
        },
        {
          en: "2 (picture)",
          fa: "تصویر ۲",
          answerEn: "Happy Christmas!",
          answerFa: "کریسمس مبارک!"
        },
        {
          en: "3 (picture)",
          fa: "تصویر ۳",
          answerEn: "Sorry!",
          answerFa: "متاسفم!"
        },
        {
          en: "4 (picture)",
          fa: "تصویر ۴",
          answerEn: "Congratulations!",
          answerFa: "تبریک!"
        },
        {
          en: "5 (picture)",
          fa: "تصویر ۵",
          answerEn: "Cheers!",
          answerFa: "سرورا!"
        },
        {
          en: "6 (picture)",
          fa: "تصویر ۶",
          answerEn: "Good morning!",
          answerFa: "صبح بخیر!"
        },
        {
          en: "You want to order a coffee. The waiter is reading the newspaper.",
          fa: "می‌خواهید قهوه سفارش دهید. پیشخدمت روزنامه می‌خواند.",
          answerEn: "Excuse me.",
          answerFa: "ببخشید."
        },
        {
          en: "A friend buys you a drink.",
          fa: "دوستی برایتان نوشیدنی می‌خرد.",
          answerEn: "Thank you. Cheers!",
          answerFa: "ممنون. سرورا!"
        },
        {
          en: "A child says 'Goodnight' to you.",
          fa: "کودکی به شما می‌گوید «شب بخیر».",
          answerEn: "Goodnight. Sleep well.",
          answerFa: "شب بخیر. خواب آرامی داشته باش."
        },
        {
          en: "You answer the phone at work. It is 10.30 a.m.",
          fa: "در محل کار تلفن را جواب می‌دهید. ساعت ۱۰:۳۰ صبح است.",
          answerEn: "Good morning.",
          answerFa: "صبح بخیر."
        },
        {
          en: "You answer the phone at work. It is 3 p.m.",
          fa: "در محل کار تلفن را جواب می‌دهید. ساعت ۳ بعدازظهر است.",
          answerEn: "Good afternoon.",
          answerFa: "ظهر بخیر."
        },
        {
          en: "It is 2 a.m. on January 1st. You meet a friend on the street.",
          fa: "ساعت ۲ بامداد اول ژانویه است. دوستی را در خیابان ملاقات می‌کنید.",
          answerEn: "Happy New Year!",
          answerFa: "سال نو مبارک!"
        },
        {
          en: "A friend spoke too quickly. You don't understand.",
          fa: "دوستی خیلی سریع حرف زد. نمی‌فهمید.",
          answerEn: "Sorry / Excuse me. I didn't understand.",
          answerFa: "متاسفم/ببخشید. نفهمیدم."
        },
        {
          en: "It is 24th December. You meet a friend on the bus.",
          fa: "۲۴ دسامبر است. دوستی را در اتوبوس ملاقات می‌کنید.",
          answerEn: "Happy Christmas!",
          answerFa: "کریسمس مبارک!"
        },
        {
          en: "ANN: Good evening. BILL: Good day.",
          fa: "آن: عصر بخیر. بیل: روز بخیر.",
          answerEn: "ANN: Good morning. | BILL: Good morning. | ANN: How are you? | BILL: Fine thanks. And you?* | ANN: It's my birthday today. | BILL: Happy Birthday. | ANN: Would you like a drink? | BILL: Yes, please. A coke. | ANN: With ice? | BILL: No, thanks. | ANN: Here you are. Cheers. | BILL: Cheers! | * You can say 'Terrible.' as Bill did, but usually we say 'Fine' even if we feel terrible.",
          answerFa: "آن: صبح بخیر. | بیل: صبح بخیر. | آن: حالت چطوره؟ | بیل: خب، متشکرم. تو چطور؟* | آن: امروز تولد من است. | بیل: تبریک تولد. | آن: دوست دارید چی بنوشید؟ | بیل: بله، لطفا. یک کوکا. | آن: با یخ؟ | بیل: نه، متشکرم. | آن: اینا برات. سلام. | بیل: سلام!* شما می‌توانید مثل بیل بگویید 'وحشتناک.'، اما معمولاً حتی اگر وحشتناک حس می‌کنیم، می‌گوییم 'خب'."
        },
        {
          en: "ANN: How are you? BILL: Terrible. I've got a bad cold and ...",
          fa: "آن: حالت چطور است؟ بیل: افتضاح است. سرماخوردگی شدیدی دارم و...",
          answerEn: "ANN: Good morning. | BILL: Good morning. | ANN: How are you? | BILL: Fine thanks. And you?* | ANN: It's my birthday today. | BILL: Happy Birthday. | ANN: Would you like a drink? | BILL: Yes, please. A coke. | ANN: With ice? | BILL: No, thanks. | ANN: Here you are. Cheers. | BILL: Cheers! | * You can say 'Terrible.' as Bill did, but usually we say 'Fine' even if we feel terrible.",
          answerFa: "آن: صبح بخیر. | بیل: صبح بخیر. | آن: حالت چطوره؟ | بیل: خب، متشکرم. تو چطور؟* | آن: امروز تولد من است. | بیل: تبریک تولد. | آن: دوست دارید چی بنوشید؟ | بیل: بله، لطفا. یک کوکا. | آن: با یخ؟ | بیل: نه، متشکرم. | آن: اینا برات. سلام. | بیل: سلام!* شما می‌توانید مثل بیل بگویید 'وحشتناک.'، اما معمولاً حتی اگر وحشتناک حس می‌کنیم، می‌گوییم 'خب'."
        },
        {
          en: "ANN: It's my birthday today. BILL: Congratulations.",
          fa: "آن: امروز تولد من است. بیل: تبریک.",
          answerEn: "ANN: Good morning. | BILL: Good morning. | ANN: How are you? | BILL: Fine thanks. And you?* | ANN: It's my birthday today. | BILL: Happy Birthday. | ANN: Would you like a drink? | BILL: Yes, please. A coke. | ANN: With ice? | BILL: No, thanks. | ANN: Here you are. Cheers. | BILL: Cheers! | * You can say 'Terrible.' as Bill did, but usually we say 'Fine' even if we feel terrible.",
          answerFa: "آن: صبح بخیر. | بیل: صبح بخیر. | آن: حالت چطوره؟ | بیل: خب، متشکرم. تو چطور؟* | آن: امروز تولد من است. | بیل: تبریک تولد. | آن: دوست دارید چی بنوشید؟ | بیل: بله، لطفا. یک کوکا. | آن: با یخ؟ | بیل: نه، متشکرم. | آن: اینا برات. سلام. | بیل: سلام!* شما می‌توانید مثل بیل بگویید 'وحشتناک.'، اما معمولاً حتی اگر وحشتناک حس می‌کنیم، می‌گوییم 'خب'."
        },
        {
          en: "ANN: Would you like a drink? BILL: No, thank you. A coke.",
          fa: "آن: نوشیدنی می‌خواهی؟ بیل: نه، ممنون. یک کوکاکولا.",
          answerEn: "ANN: Good morning. | BILL: Good morning. | ANN: How are you? | BILL: Fine thanks. And you?* | ANN: It's my birthday today. | BILL: Happy Birthday. | ANN: Would you like a drink? | BILL: Yes, please. A coke. | ANN: With ice? | BILL: No, thanks. | ANN: Here you are. Cheers. | BILL: Cheers! | * You can say 'Terrible.' as Bill did, but usually we say 'Fine' even if we feel terrible.",
          answerFa: "آن: صبح بخیر. | بیل: صبح بخیر. | آن: حالت چطوره؟ | بیل: خب، متشکرم. تو چطور؟* | آن: امروز تولد من است. | بیل: تبریک تولد. | آن: دوست دارید چی بنوشید؟ | بیل: بله، لطفا. یک کوکا. | آن: با یخ؟ | بیل: نه، متشکرم. | آن: اینا برات. سلام. | بیل: سلام!* شما می‌توانید مثل بیل بگویید 'وحشتناک.'، اما معمولاً حتی اگر وحشتناک حس می‌کنیم، می‌گوییم 'خب'."
        },
        {
          en: "ANN: With ice? BILL: No, please.",
          fa: "آن: با یخ؟ بیل: نه، لطفاً.",
          answerEn: "ANN: Good morning. | BILL: Good morning. | ANN: How are you? | BILL: Fine thanks. And you?* | ANN: It's my birthday today. | BILL: Happy Birthday. | ANN: Would you like a drink? | BILL: Yes, please. A coke. | ANN: With ice? | BILL: No, thanks. | ANN: Here you are. Cheers. | BILL: Cheers! | * You can say 'Terrible.' as Bill did, but usually we say 'Fine' even if we feel terrible.",
          answerFa: "آن: صبح بخیر. | بیل: صبح بخیر. | آن: حالت چطوره؟ | بیل: خب، متشکرم. تو چطور؟* | آن: امروز تولد من است. | بیل: تبریک تولد. | آن: دوست دارید چی بنوشید؟ | بیل: بله، لطفا. یک کوکا. | آن: با یخ؟ | بیل: نه، متشکرم. | آن: اینا برات. سلام. | بیل: سلام!* شما می‌توانید مثل بیل بگویید 'وحشتناک.'، اما معمولاً حتی اگر وحشتناک حس می‌کنیم، می‌گوییم 'خب'."
        },
        {
          en: "ANN: Here you are. Cheers. BILL: Bless you!",
          fa: "آن: بفرمایید. سلام. بیل: عافیتی باشد!",
          answerEn: "ANN: Good morning. | BILL: Good morning. | ANN: How are you? | BILL: Fine thanks. And you?* | ANN: It's my birthday today. | BILL: Happy Birthday. | ANN: Would you like a drink? | BILL: Yes, please. A coke. | ANN: With ice? | BILL: No, thanks. | ANN: Here you are. Cheers. | BILL: Cheers! | * You can say 'Terrible.' as Bill did, but usually we say 'Fine' even if we feel terrible.",
          answerFa: "آن: صبح بخیر. | بیل: صبح بخیر. | آن: حالت چطوره؟ | بیل: خب، متشکرم. تو چطور؟* | آن: امروز تولد من است. | بیل: تبریک تولد. | آن: دوست دارید چی بنوشید؟ | بیل: بله، لطفا. یک کوکا. | آن: با یخ؟ | بیل: نه، متشکرم. | آن: اینا برات. سلام. | بیل: سلام!* شما می‌توانید مثل بیل بگویید 'وحشتناک.'، اما معمولاً حتی اگر وحشتناک حس می‌کنیم، می‌گوییم 'خب'."
        }
      ]
    }
  },
  {
    id: "viu-elem-l36",
    lesson: 36,
    title: "Countries, languages and people",
    titleFa: "کشورها، زبان‌ها و مردم",
    source: "VIU Elementary 2nd ed — درس 36 (کتاب ص76-77)",
    paragraphs: [],
    exercise: {
      instruction: "36.1 In which continents are these places? — 36.2 Which countries are these ? Write their names on them. — 36.3 Where are these capital cities? Write sentences. — 36.4 Write down in English: — 36.5 Which country is different? (Think of the languages they speak there.) Write sentences. — 36.6 What is the adjective for these countries?",
      instructionFa: "این مکان‌ها در کدام قاره‌ها هستند؟ — این‌ها کدام کشورها هستند؟ نامشان را روی آن‌ها بنویسید. — این پایتخت‌ها کجا هستند؟ جمله بنویسید. — به انگلیسی بنویسید: — کدام کشور متفاوت است؟ (به زبان‌هایی که آنجا صحبت می‌کنند فکر کنید.) جمله بنویسید. — صفت این کشورها چیست؟",
      items: [
        {
          en: "1 Mount Everest Asia",
          fa: "کوه اورست — آسیا",
          answerEn: "2 The Sahara is in Africa. | 3 The Amazon is in South America. | 4 Wogga Wogga is in Australia. | 5 The Volga is in Europe. | 6 Mount Kilimanjaro is in Africa. | 7 The Mississippi is in North America. | 8 Mount Fuji is in Asia. | 9 Lake Titicaca is in South America.",
          answerFa: "2 صحرا در آفریقا قرار دارد. | 3 آمازون در آمریکای جنوبی قرار دارد. | 4 ووگا ووگا در استرالیا قرار دارد. | 5 ولگا در اروپا قرار دارد. | 6 کوه کلیمانجارو در آفریقا قرار دارد. | 7 میسیسیپی در آمریکای شمالی قرار دارد. | 8 کوه فوجی در آسیا قرار دارد. | 9 دریاچه تیتیکاکا در آمریکای جنوبی قرار دارد."
        },
        {
          en: "2 The Sahara",
          fa: "صحرای آفریقا",
          answerEn: "2 The Sahara is in Africa. | 3 The Amazon is in South America. | 4 Wogga Wogga is in Australia. | 5 The Volga is in Europe. | 6 Mount Kilimanjaro is in Africa. | 7 The Mississippi is in North America. | 8 Mount Fuji is in Asia. | 9 Lake Titicaca is in South America.",
          answerFa: "2 صحرا در آفریقا قرار دارد. | 3 آمازون در آمریکای جنوبی قرار دارد. | 4 ووگا ووگا در استرالیا قرار دارد. | 5 ولگا در اروپا قرار دارد. | 6 کوه کلیمانجارو در آفریقا قرار دارد. | 7 میسیسیپی در آمریکای شمالی قرار دارد. | 8 کوه فوجی در آسیا قرار دارد. | 9 دریاچه تیتیکاکا در آمریکای جنوبی قرار دارد."
        },
        {
          en: "3 The Amazon",
          fa: "رود آمازون",
          answerEn: "2 The Sahara is in Africa. | 3 The Amazon is in South America. | 4 Wogga Wogga is in Australia. | 5 The Volga is in Europe. | 6 Mount Kilimanjaro is in Africa. | 7 The Mississippi is in North America. | 8 Mount Fuji is in Asia. | 9 Lake Titicaca is in South America.",
          answerFa: "2 صحرا در آفریقا قرار دارد. | 3 آمازون در آمریکای جنوبی قرار دارد. | 4 ووگا ووگا در استرالیا قرار دارد. | 5 ولگا در اروپا قرار دارد. | 6 کوه کلیمانجارو در آفریقا قرار دارد. | 7 میسیسیپی در آمریکای شمالی قرار دارد. | 8 کوه فوجی در آسیا قرار دارد. | 9 دریاچه تیتیکاکا در آمریکای جنوبی قرار دارد."
        },
        {
          en: "4 Wogga Wogga",
          fa: "واگا واگا",
          answerEn: "2 The Sahara is in Africa. | 3 The Amazon is in South America. | 4 Wogga Wogga is in Australia. | 5 The Volga is in Europe. | 6 Mount Kilimanjaro is in Africa. | 7 The Mississippi is in North America. | 8 Mount Fuji is in Asia. | 9 Lake Titicaca is in South America.",
          answerFa: "2 صحرا در آفریقا قرار دارد. | 3 آمازون در آمریکای جنوبی قرار دارد. | 4 ووگا ووگا در استرالیا قرار دارد. | 5 ولگا در اروپا قرار دارد. | 6 کوه کلیمانجارو در آفریقا قرار دارد. | 7 میسیسیپی در آمریکای شمالی قرار دارد. | 8 کوه فوجی در آسیا قرار دارد. | 9 دریاچه تیتیکاکا در آمریکای جنوبی قرار دارد."
        },
        {
          en: "5 The Volga",
          fa: "رود ولگا",
          answerEn: "2 The Sahara is in Africa. | 3 The Amazon is in South America. | 4 Wogga Wogga is in Australia. | 5 The Volga is in Europe. | 6 Mount Kilimanjaro is in Africa. | 7 The Mississippi is in North America. | 8 Mount Fuji is in Asia. | 9 Lake Titicaca is in South America.",
          answerFa: "2 صحرا در آفریقا قرار دارد. | 3 آمازون در آمریکای جنوبی قرار دارد. | 4 ووگا ووگا در استرالیا قرار دارد. | 5 ولگا در اروپا قرار دارد. | 6 کوه کلیمانجارو در آفریقا قرار دارد. | 7 میسیسیپی در آمریکای شمالی قرار دارد. | 8 کوه فوجی در آسیا قرار دارد. | 9 دریاچه تیتیکاکا در آمریکای جنوبی قرار دارد."
        },
        {
          en: "6 Mount Kilimanjaro",
          fa: "کوه کلیمانجارو",
          answerEn: "2 The Sahara is in Africa. | 3 The Amazon is in South America. | 4 Wogga Wogga is in Australia. | 5 The Volga is in Europe. | 6 Mount Kilimanjaro is in Africa. | 7 The Mississippi is in North America. | 8 Mount Fuji is in Asia. | 9 Lake Titicaca is in South America.",
          answerFa: "2 صحرا در آفریقا قرار دارد. | 3 آمازون در آمریکای جنوبی قرار دارد. | 4 ووگا ووگا در استرالیا قرار دارد. | 5 ولگا در اروپا قرار دارد. | 6 کوه کلیمانجارو در آفریقا قرار دارد. | 7 میسیسیپی در آمریکای شمالی قرار دارد. | 8 کوه فوجی در آسیا قرار دارد. | 9 دریاچه تیتیکاکا در آمریکای جنوبی قرار دارد."
        },
        {
          en: "7 The Mississippi",
          fa: "رود میسیسیپی",
          answerEn: "2 The Sahara is in Africa. | 3 The Amazon is in South America. | 4 Wogga Wogga is in Australia. | 5 The Volga is in Europe. | 6 Mount Kilimanjaro is in Africa. | 7 The Mississippi is in North America. | 8 Mount Fuji is in Asia. | 9 Lake Titicaca is in South America.",
          answerFa: "2 صحرا در آفریقا قرار دارد. | 3 آمازون در آمریکای جنوبی قرار دارد. | 4 ووگا ووگا در استرالیا قرار دارد. | 5 ولگا در اروپا قرار دارد. | 6 کوه کلیمانجارو در آفریقا قرار دارد. | 7 میسیسیپی در آمریکای شمالی قرار دارد. | 8 کوه فوجی در آسیا قرار دارد. | 9 دریاچه تیتیکاکا در آمریکای جنوبی قرار دارد."
        },
        {
          en: "8 Mount Fuji",
          fa: "کوه فوجی",
          answerEn: "2 The Sahara is in Africa. | 3 The Amazon is in South America. | 4 Wogga Wogga is in Australia. | 5 The Volga is in Europe. | 6 Mount Kilimanjaro is in Africa. | 7 The Mississippi is in North America. | 8 Mount Fuji is in Asia. | 9 Lake Titicaca is in South America.",
          answerFa: "2 صحرا در آفریقا قرار دارد. | 3 آمازون در آمریکای جنوبی قرار دارد. | 4 ووگا ووگا در استرالیا قرار دارد. | 5 ولگا در اروپا قرار دارد. | 6 کوه کلیمانجارو در آفریقا قرار دارد. | 7 میسیسیپی در آمریکای شمالی قرار دارد. | 8 کوه فوجی در آسیا قرار دارد. | 9 دریاچه تیتیکاکا در آمریکای جنوبی قرار دارد."
        },
        {
          en: "9 Lake Titicaca",
          fa: "دریاچه تیتیکاکا",
          answerEn: "2 The Sahara is in Africa. | 3 The Amazon is in South America. | 4 Wogga Wogga is in Australia. | 5 The Volga is in Europe. | 6 Mount Kilimanjaro is in Africa. | 7 The Mississippi is in North America. | 8 Mount Fuji is in Asia. | 9 Lake Titicaca is in South America.",
          answerFa: "2 صحرا در آفریقا قرار دارد. | 3 آمازون در آمریکای جنوبی قرار دارد. | 4 ووگا ووگا در استرالیا قرار دارد. | 5 ولگا در اروپا قرار دارد. | 6 کوه کلیمانجارو در آفریقا قرار دارد. | 7 میسیسیپی در آمریکای شمالی قرار دارد. | 8 کوه فوجی در آسیا قرار دارد. | 9 دریاچه تیتیکاکا در آمریکای جنوبی قرار دارد."
        },
        {
          en: "1",
          fa: "نقشه شماره ۱",
          answerEn: "China",
          answerFa: "چین"
        },
        {
          en: "2",
          fa: "نقشه شماره ۲",
          answerEn: "Sweden",
          answerFa: "سوئد"
        },
        {
          en: "3",
          fa: "نقشه شماره ۳",
          answerEn: "Thailand",
          answerFa: "تایلند"
        },
        {
          en: "4",
          fa: "نقشه شماره ۴",
          answerEn: "Brazil",
          answerFa: "برزیل"
        },
        {
          en: "5",
          fa: "نقشه شماره ۵",
          answerEn: "Spain",
          answerFa: "اسپانیا"
        },
        {
          en: "6",
          fa: "نقشه شماره ۶",
          answerEn: "Russia",
          answerFa: "روسیه"
        },
        {
          en: "1 Tokyo Tokyo is the capital of Japan.",
          fa: "توکیو پایتخت ژاپن است.",
          answerEn: "2 Rome is the capital of Italy. | 3 Canberra is the capital of Australia. | 4 Bogota is the capital of Colombia. | 5 Cairo is the capital of Egypt. | 6 Vienna is the capital of Austria. | 7 Edinburgh is the capital of Scotland. | 8 Ankara is the capital of Turkey. | 9 Buenos Aires is the capital of Argentina. | 10 Madrid is the capital of Spain.",
          answerFa: "2 رم پایتخت ایتالیا است. | 3 کانبرا پایتخت استرالیا است. | 4 بوگوتا پایتخت کلمبیا است. | 5 قاهره پایتخت مصر است. | 6 وین پایتخت اتریش است. | 7 ادینبورو پایتخت اسکاتلند است. | 8 آنکارا پایتخت ترکیه است. | 9 بوئنوس آیرس پایتخت آرژانتین است. | 10 مادرید پایتخت اسپانیا است."
        },
        {
          en: "2 Rome",
          fa: "رم",
          answerEn: "2 Rome is the capital of Italy. | 3 Canberra is the capital of Australia. | 4 Bogota is the capital of Colombia. | 5 Cairo is the capital of Egypt. | 6 Vienna is the capital of Austria. | 7 Edinburgh is the capital of Scotland. | 8 Ankara is the capital of Turkey. | 9 Buenos Aires is the capital of Argentina. | 10 Madrid is the capital of Spain.",
          answerFa: "2 رم پایتخت ایتالیا است. | 3 کانبرا پایتخت استرالیا است. | 4 بوگوتا پایتخت کلمبیا است. | 5 قاهره پایتخت مصر است. | 6 وین پایتخت اتریش است. | 7 ادینبورو پایتخت اسکاتلند است. | 8 آنکارا پایتخت ترکیه است. | 9 بوئنوس آیرس پایتخت آرژانتین است. | 10 مادرید پایتخت اسپانیا است."
        },
        {
          en: "3 Canberra",
          fa: "کانبرا",
          answerEn: "2 Rome is the capital of Italy. | 3 Canberra is the capital of Australia. | 4 Bogota is the capital of Colombia. | 5 Cairo is the capital of Egypt. | 6 Vienna is the capital of Austria. | 7 Edinburgh is the capital of Scotland. | 8 Ankara is the capital of Turkey. | 9 Buenos Aires is the capital of Argentina. | 10 Madrid is the capital of Spain.",
          answerFa: "2 رم پایتخت ایتالیا است. | 3 کانبرا پایتخت استرالیا است. | 4 بوگوتا پایتخت کلمبیا است. | 5 قاهره پایتخت مصر است. | 6 وین پایتخت اتریش است. | 7 ادینبورو پایتخت اسکاتلند است. | 8 آنکارا پایتخت ترکیه است. | 9 بوئنوس آیرس پایتخت آرژانتین است. | 10 مادرید پایتخت اسپانیا است."
        },
        {
          en: "4 Bogota",
          fa: "بوگوتا",
          answerEn: "2 Rome is the capital of Italy. | 3 Canberra is the capital of Australia. | 4 Bogota is the capital of Colombia. | 5 Cairo is the capital of Egypt. | 6 Vienna is the capital of Austria. | 7 Edinburgh is the capital of Scotland. | 8 Ankara is the capital of Turkey. | 9 Buenos Aires is the capital of Argentina. | 10 Madrid is the capital of Spain.",
          answerFa: "2 رم پایتخت ایتالیا است. | 3 کانبرا پایتخت استرالیا است. | 4 بوگوتا پایتخت کلمبیا است. | 5 قاهره پایتخت مصر است. | 6 وین پایتخت اتریش است. | 7 ادینبورو پایتخت اسکاتلند است. | 8 آنکارا پایتخت ترکیه است. | 9 بوئنوس آیرس پایتخت آرژانتین است. | 10 مادرید پایتخت اسپانیا است."
        },
        {
          en: "5 Cairo",
          fa: "قاهره",
          answerEn: "2 Rome is the capital of Italy. | 3 Canberra is the capital of Australia. | 4 Bogota is the capital of Colombia. | 5 Cairo is the capital of Egypt. | 6 Vienna is the capital of Austria. | 7 Edinburgh is the capital of Scotland. | 8 Ankara is the capital of Turkey. | 9 Buenos Aires is the capital of Argentina. | 10 Madrid is the capital of Spain.",
          answerFa: "2 رم پایتخت ایتالیا است. | 3 کانبرا پایتخت استرالیا است. | 4 بوگوتا پایتخت کلمبیا است. | 5 قاهره پایتخت مصر است. | 6 وین پایتخت اتریش است. | 7 ادینبورو پایتخت اسکاتلند است. | 8 آنکارا پایتخت ترکیه است. | 9 بوئنوس آیرس پایتخت آرژانتین است. | 10 مادرید پایتخت اسپانیا است."
        },
        {
          en: "6 Vienna",
          fa: "وین",
          answerEn: "2 Rome is the capital of Italy. | 3 Canberra is the capital of Australia. | 4 Bogota is the capital of Colombia. | 5 Cairo is the capital of Egypt. | 6 Vienna is the capital of Austria. | 7 Edinburgh is the capital of Scotland. | 8 Ankara is the capital of Turkey. | 9 Buenos Aires is the capital of Argentina. | 10 Madrid is the capital of Spain.",
          answerFa: "2 رم پایتخت ایتالیا است. | 3 کانبرا پایتخت استرالیا است. | 4 بوگوتا پایتخت کلمبیا است. | 5 قاهره پایتخت مصر است. | 6 وین پایتخت اتریش است. | 7 ادینبورو پایتخت اسکاتلند است. | 8 آنکارا پایتخت ترکیه است. | 9 بوئنوس آیرس پایتخت آرژانتین است. | 10 مادرید پایتخت اسپانیا است."
        },
        {
          en: "7 Edinburgh",
          fa: "ادینبرو",
          answerEn: "2 Rome is the capital of Italy. | 3 Canberra is the capital of Australia. | 4 Bogota is the capital of Colombia. | 5 Cairo is the capital of Egypt. | 6 Vienna is the capital of Austria. | 7 Edinburgh is the capital of Scotland. | 8 Ankara is the capital of Turkey. | 9 Buenos Aires is the capital of Argentina. | 10 Madrid is the capital of Spain.",
          answerFa: "2 رم پایتخت ایتالیا است. | 3 کانبرا پایتخت استرالیا است. | 4 بوگوتا پایتخت کلمبیا است. | 5 قاهره پایتخت مصر است. | 6 وین پایتخت اتریش است. | 7 ادینبورو پایتخت اسکاتلند است. | 8 آنکارا پایتخت ترکیه است. | 9 بوئنوس آیرس پایتخت آرژانتین است. | 10 مادرید پایتخت اسپانیا است."
        },
        {
          en: "8 Ankara",
          fa: "آنکارا",
          answerEn: "2 Rome is the capital of Italy. | 3 Canberra is the capital of Australia. | 4 Bogota is the capital of Colombia. | 5 Cairo is the capital of Egypt. | 6 Vienna is the capital of Austria. | 7 Edinburgh is the capital of Scotland. | 8 Ankara is the capital of Turkey. | 9 Buenos Aires is the capital of Argentina. | 10 Madrid is the capital of Spain.",
          answerFa: "2 رم پایتخت ایتالیا است. | 3 کانبرا پایتخت استرالیا است. | 4 بوگوتا پایتخت کلمبیا است. | 5 قاهره پایتخت مصر است. | 6 وین پایتخت اتریش است. | 7 ادینبورو پایتخت اسکاتلند است. | 8 آنکارا پایتخت ترکیه است. | 9 بوئنوس آیرس پایتخت آرژانتین است. | 10 مادرید پایتخت اسپانیا است."
        },
        {
          en: "9 Buenos Aires",
          fa: "بوئنوس آیرس",
          answerEn: "2 Rome is the capital of Italy. | 3 Canberra is the capital of Australia. | 4 Bogota is the capital of Colombia. | 5 Cairo is the capital of Egypt. | 6 Vienna is the capital of Austria. | 7 Edinburgh is the capital of Scotland. | 8 Ankara is the capital of Turkey. | 9 Buenos Aires is the capital of Argentina. | 10 Madrid is the capital of Spain.",
          answerFa: "2 رم پایتخت ایتالیا است. | 3 کانبرا پایتخت استرالیا است. | 4 بوگوتا پایتخت کلمبیا است. | 5 قاهره پایتخت مصر است. | 6 وین پایتخت اتریش است. | 7 ادینبورو پایتخت اسکاتلند است. | 8 آنکارا پایتخت ترکیه است. | 9 بوئنوس آیرس پایتخت آرژانتین است. | 10 مادرید پایتخت اسپانیا است."
        },
        {
          en: "10 Madrid",
          fa: "مادرید",
          answerEn: "2 Rome is the capital of Italy. | 3 Canberra is the capital of Australia. | 4 Bogota is the capital of Colombia. | 5 Cairo is the capital of Egypt. | 6 Vienna is the capital of Austria. | 7 Edinburgh is the capital of Scotland. | 8 Ankara is the capital of Turkey. | 9 Buenos Aires is the capital of Argentina. | 10 Madrid is the capital of Spain.",
          answerFa: "2 رم پایتخت ایتالیا است. | 3 کانبرا پایتخت استرالیا است. | 4 بوگوتا پایتخت کلمبیا است. | 5 قاهره پایتخت مصر است. | 6 وین پایتخت اتریش است. | 7 ادینبورو پایتخت اسکاتلند است. | 8 آنکارا پایتخت ترکیه است. | 9 بوئنوس آیرس پایتخت آرژانتین است. | 10 مادرید پایتخت اسپانیا است."
        },
        {
          en: "1 the name of your country.",
          fa: "نام کشور شما.",
          answerEn: "Check your answers with your teacher if you are not sure.",
          answerFa: "اگر مطمئن نیستید، پاسخ‌های خود را با معلم خود بررسی کنید."
        },
        {
          en: "2 the names of the countries next to your country.",
          fa: "نام کشورهای همسایه کشور شما.",
          answerEn: "Check your answers with your teacher if you are not sure.",
          answerFa: "اگر مطمئن نیستید، پاسخ‌های خود را با معلم خود بررسی کنید."
        },
        {
          en: "3 the names of any other countries which are important for your country in some way.",
          fa: "نام کشورهای دیگری که به نوعی برای کشور شما مهم هستند.",
          answerEn: "Check your answers with your teacher if you are not sure.",
          answerFa: "اگر مطمئن نیستید، پاسخ‌های خود را با معلم خود بررسی کنید."
        },
        {
          en: "4 the word for your language.",
          fa: "واژه زبان شما.",
          answerEn: "Check your answers with your teacher if you are not sure.",
          answerFa: "اگر مطمئن نیستید، پاسخ‌های خود را با معلم خود بررسی کنید."
        },
        {
          en: "5 the name for people from your country.",
          fa: "نام مردم کشور شما.",
          answerEn: "Check your answers with your teacher if you are not sure.",
          answerFa: "اگر مطمئن نیستید، پاسخ‌های خود را با معلم خود بررسی کنید."
        },
        {
          en: "1 England, Canada, Iceland, Australia In England, Canada and Australia they speak English but in Iceland they speak Icelandic.",
          fa: "در انگلستان، کانادا و استرالیا انگلیسی صحبت می‌کنند اما در ایسلند ایسلندی.",
          answerEn: "2 In Mexico, Spain and Chile they speak Spanish but in Brazil they speak Portuguese. | 3 In Austria, Germany and Switzerland they speak German but in Italy they speak Italian. | 4 In Morocco, Egypt and Saudi Arabia they speak Arabic but in China they speak Chinese. | 5 In Switzerland, Canada and France they speak French but in Scotland they speak English.",
          answerFa: "2 در مکزیک، اسپانیا و شیلی اسپانیایی صحبت می‌کنند اما در برزیل پرتغالی صحبت می‌کنند. | 3 در اتریش، آلمان و سوئیس آلمانی صحبت می‌کنند اما در ایتالیایی صحبت می‌کنند. | 4 در مراکش، مصر و عربستان سعودی عربی صحبت می‌کنند اما در چینی صحبت می‌کنند. | 5 در سوئیس، کانادا و فرانسه فرانسوی صحبت می‌کنند اما در اسکاتلند انگلیسی صحبت می‌کنند."
        },
        {
          en: "2 Mexico, Brazil, Spain, Chile",
          fa: "مکزیک، برزیل، اسپانیا، شیلی",
          answerEn: "2 In Mexico, Spain and Chile they speak Spanish but in Brazil they speak Portuguese. | 3 In Austria, Germany and Switzerland they speak German but in Italy they speak Italian. | 4 In Morocco, Egypt and Saudi Arabia they speak Arabic but in China they speak Chinese. | 5 In Switzerland, Canada and France they speak French but in Scotland they speak English.",
          answerFa: "2 در مکزیک، اسپانیا و شیلی اسپانیایی صحبت می‌کنند اما در برزیل پرتغالی صحبت می‌کنند. | 3 در اتریش، آلمان و سوئیس آلمانی صحبت می‌کنند اما در ایتالیایی صحبت می‌کنند. | 4 در مراکش، مصر و عربستان سعودی عربی صحبت می‌کنند اما در چینی صحبت می‌کنند. | 5 در سوئیس، کانادا و فرانسه فرانسوی صحبت می‌کنند اما در اسکاتلند انگلیسی صحبت می‌کنند."
        },
        {
          en: "3 Italy, Austria, Germany, Switzerland",
          fa: "ایتالیا، اتریش، آلمان، سوئیس",
          answerEn: "2 In Mexico, Spain and Chile they speak Spanish but in Brazil they speak Portuguese. | 3 In Austria, Germany and Switzerland they speak German but in Italy they speak Italian. | 4 In Morocco, Egypt and Saudi Arabia they speak Arabic but in China they speak Chinese. | 5 In Switzerland, Canada and France they speak French but in Scotland they speak English.",
          answerFa: "2 در مکزیک، اسپانیا و شیلی اسپانیایی صحبت می‌کنند اما در برزیل پرتغالی صحبت می‌کنند. | 3 در اتریش، آلمان و سوئیس آلمانی صحبت می‌کنند اما در ایتالیایی صحبت می‌کنند. | 4 در مراکش، مصر و عربستان سعودی عربی صحبت می‌کنند اما در چینی صحبت می‌کنند. | 5 در سوئیس، کانادا و فرانسه فرانسوی صحبت می‌کنند اما در اسکاتلند انگلیسی صحبت می‌کنند."
        },
        {
          en: "4 Morocco, Egypt, China, Saudi Arabia",
          fa: "مراکش، مصر، چین، عربستان سعودی",
          answerEn: "2 In Mexico, Spain and Chile they speak Spanish but in Brazil they speak Portuguese. | 3 In Austria, Germany and Switzerland they speak German but in Italy they speak Italian. | 4 In Morocco, Egypt and Saudi Arabia they speak Arabic but in China they speak Chinese. | 5 In Switzerland, Canada and France they speak French but in Scotland they speak English.",
          answerFa: "2 در مکزیک، اسپانیا و شیلی اسپانیایی صحبت می‌کنند اما در برزیل پرتغالی صحبت می‌کنند. | 3 در اتریش، آلمان و سوئیس آلمانی صحبت می‌کنند اما در ایتالیایی صحبت می‌کنند. | 4 در مراکش، مصر و عربستان سعودی عربی صحبت می‌کنند اما در چینی صحبت می‌کنند. | 5 در سوئیس، کانادا و فرانسه فرانسوی صحبت می‌کنند اما در اسکاتلند انگلیسی صحبت می‌کنند."
        },
        {
          en: "5 Switzerland, Canada, Scotland, France",
          fa: "سوئیس، کانادا، اسکاتلند، فرانسه",
          answerEn: "2 In Mexico, Spain and Chile they speak Spanish but in Brazil they speak Portuguese. | 3 In Austria, Germany and Switzerland they speak German but in Italy they speak Italian. | 4 In Morocco, Egypt and Saudi Arabia they speak Arabic but in China they speak Chinese. | 5 In Switzerland, Canada and France they speak French but in Scotland they speak English.",
          answerFa: "2 در مکزیک، اسپانیا و شیلی اسپانیایی صحبت می‌کنند اما در برزیل پرتغالی صحبت می‌کنند. | 3 در اتریش، آلمان و سوئیس آلمانی صحبت می‌کنند اما در ایتالیایی صحبت می‌کنند. | 4 در مراکش، مصر و عربستان سعودی عربی صحبت می‌کنند اما در چینی صحبت می‌کنند. | 5 در سوئیس، کانادا و فرانسه فرانسوی صحبت می‌کنند اما در اسکاتلند انگلیسی صحبت می‌کنند."
        },
        {
          en: "1 Cuba Cuban",
          fa: "کوبا — کوبایی",
          answerEn: "2 Vietnamese | 3 Korean | 4 Thai | 5 Iraqi | 6 German | 7 Egyptian | 8 Argentinian | 9 Dutch | 10 Spanish | 11 Peruvian | 12 Chinese | 13 British | 14 Greek | 15 Australian | 16 Polish | 17 Indian",
          answerFa: "2 ویتنامی | 3 کره‌ای | 4 تایلندی | 5 عراقی | 6 آلمانی | 7 مصری | 8 آرژانتینی | 9 هلندی | 10 اسپانیایی | 11 پرویی | 12 چینی | 13 بریتانیایی | 14 یونانی | 15 استرالیایی | 16 لهستانی | 17 هندی"
        },
        {
          en: "2 Vietnam",
          fa: "ویتنام",
          answerEn: "2 Vietnamese | 3 Korean | 4 Thai | 5 Iraqi | 6 German | 7 Egyptian | 8 Argentinian | 9 Dutch | 10 Spanish | 11 Peruvian | 12 Chinese | 13 British | 14 Greek | 15 Australian | 16 Polish | 17 Indian",
          answerFa: "2 ویتنامی | 3 کره‌ای | 4 تایلندی | 5 عراقی | 6 آلمانی | 7 مصری | 8 آرژانتینی | 9 هلندی | 10 اسپانیایی | 11 پرویی | 12 چینی | 13 بریتانیایی | 14 یونانی | 15 استرالیایی | 16 لهستانی | 17 هندی"
        },
        {
          en: "3 Korea",
          fa: "کره",
          answerEn: "2 Vietnamese | 3 Korean | 4 Thai | 5 Iraqi | 6 German | 7 Egyptian | 8 Argentinian | 9 Dutch | 10 Spanish | 11 Peruvian | 12 Chinese | 13 British | 14 Greek | 15 Australian | 16 Polish | 17 Indian",
          answerFa: "2 ویتنامی | 3 کره‌ای | 4 تایلندی | 5 عراقی | 6 آلمانی | 7 مصری | 8 آرژانتینی | 9 هلندی | 10 اسپانیایی | 11 پرویی | 12 چینی | 13 بریتانیایی | 14 یونانی | 15 استرالیایی | 16 لهستانی | 17 هندی"
        },
        {
          en: "4 Thailand",
          fa: "تایلند",
          answerEn: "2 Vietnamese | 3 Korean | 4 Thai | 5 Iraqi | 6 German | 7 Egyptian | 8 Argentinian | 9 Dutch | 10 Spanish | 11 Peruvian | 12 Chinese | 13 British | 14 Greek | 15 Australian | 16 Polish | 17 Indian",
          answerFa: "2 ویتنامی | 3 کره‌ای | 4 تایلندی | 5 عراقی | 6 آلمانی | 7 مصری | 8 آرژانتینی | 9 هلندی | 10 اسپانیایی | 11 پرویی | 12 چینی | 13 بریتانیایی | 14 یونانی | 15 استرالیایی | 16 لهستانی | 17 هندی"
        },
        {
          en: "5 Iraq",
          fa: "عراق",
          answerEn: "2 Vietnamese | 3 Korean | 4 Thai | 5 Iraqi | 6 German | 7 Egyptian | 8 Argentinian | 9 Dutch | 10 Spanish | 11 Peruvian | 12 Chinese | 13 British | 14 Greek | 15 Australian | 16 Polish | 17 Indian",
          answerFa: "2 ویتنامی | 3 کره‌ای | 4 تایلندی | 5 عراقی | 6 آلمانی | 7 مصری | 8 آرژانتینی | 9 هلندی | 10 اسپانیایی | 11 پرویی | 12 چینی | 13 بریتانیایی | 14 یونانی | 15 استرالیایی | 16 لهستانی | 17 هندی"
        },
        {
          en: "6 Germany",
          fa: "آلمان",
          answerEn: "2 Vietnamese | 3 Korean | 4 Thai | 5 Iraqi | 6 German | 7 Egyptian | 8 Argentinian | 9 Dutch | 10 Spanish | 11 Peruvian | 12 Chinese | 13 British | 14 Greek | 15 Australian | 16 Polish | 17 Indian",
          answerFa: "2 ویتنامی | 3 کره‌ای | 4 تایلندی | 5 عراقی | 6 آلمانی | 7 مصری | 8 آرژانتینی | 9 هلندی | 10 اسپانیایی | 11 پرویی | 12 چینی | 13 بریتانیایی | 14 یونانی | 15 استرالیایی | 16 لهستانی | 17 هندی"
        },
        {
          en: "7 Egypt",
          fa: "مصر",
          answerEn: "2 Vietnamese | 3 Korean | 4 Thai | 5 Iraqi | 6 German | 7 Egyptian | 8 Argentinian | 9 Dutch | 10 Spanish | 11 Peruvian | 12 Chinese | 13 British | 14 Greek | 15 Australian | 16 Polish | 17 Indian",
          answerFa: "2 ویتنامی | 3 کره‌ای | 4 تایلندی | 5 عراقی | 6 آلمانی | 7 مصری | 8 آرژانتینی | 9 هلندی | 10 اسپانیایی | 11 پرویی | 12 چینی | 13 بریتانیایی | 14 یونانی | 15 استرالیایی | 16 لهستانی | 17 هندی"
        },
        {
          en: "8 Argentina",
          fa: "آرژانتین",
          answerEn: "2 Vietnamese | 3 Korean | 4 Thai | 5 Iraqi | 6 German | 7 Egyptian | 8 Argentinian | 9 Dutch | 10 Spanish | 11 Peruvian | 12 Chinese | 13 British | 14 Greek | 15 Australian | 16 Polish | 17 Indian",
          answerFa: "2 ویتنامی | 3 کره‌ای | 4 تایلندی | 5 عراقی | 6 آلمانی | 7 مصری | 8 آرژانتینی | 9 هلندی | 10 اسپانیایی | 11 پرویی | 12 چینی | 13 بریتانیایی | 14 یونانی | 15 استرالیایی | 16 لهستانی | 17 هندی"
        },
        {
          en: "9 Holland",
          fa: "هلند",
          answerEn: "2 Vietnamese | 3 Korean | 4 Thai | 5 Iraqi | 6 German | 7 Egyptian | 8 Argentinian | 9 Dutch | 10 Spanish | 11 Peruvian | 12 Chinese | 13 British | 14 Greek | 15 Australian | 16 Polish | 17 Indian",
          answerFa: "2 ویتنامی | 3 کره‌ای | 4 تایلندی | 5 عراقی | 6 آلمانی | 7 مصری | 8 آرژانتینی | 9 هلندی | 10 اسپانیایی | 11 پرویی | 12 چینی | 13 بریتانیایی | 14 یونانی | 15 استرالیایی | 16 لهستانی | 17 هندی"
        },
        {
          en: "10 Spain",
          fa: "اسپانیا",
          answerEn: "2 Vietnamese | 3 Korean | 4 Thai | 5 Iraqi | 6 German | 7 Egyptian | 8 Argentinian | 9 Dutch | 10 Spanish | 11 Peruvian | 12 Chinese | 13 British | 14 Greek | 15 Australian | 16 Polish | 17 Indian",
          answerFa: "2 ویتنامی | 3 کره‌ای | 4 تایلندی | 5 عراقی | 6 آلمانی | 7 مصری | 8 آرژانتینی | 9 هلندی | 10 اسپانیایی | 11 پرویی | 12 چینی | 13 بریتانیایی | 14 یونانی | 15 استرالیایی | 16 لهستانی | 17 هندی"
        },
        {
          en: "11 Peru",
          fa: "پرو",
          answerEn: "2 Vietnamese | 3 Korean | 4 Thai | 5 Iraqi | 6 German | 7 Egyptian | 8 Argentinian | 9 Dutch | 10 Spanish | 11 Peruvian | 12 Chinese | 13 British | 14 Greek | 15 Australian | 16 Polish | 17 Indian",
          answerFa: "2 ویتنامی | 3 کره‌ای | 4 تایلندی | 5 عراقی | 6 آلمانی | 7 مصری | 8 آرژانتینی | 9 هلندی | 10 اسپانیایی | 11 پرویی | 12 چینی | 13 بریتانیایی | 14 یونانی | 15 استرالیایی | 16 لهستانی | 17 هندی"
        },
        {
          en: "12 China",
          fa: "چین",
          answerEn: "2 Vietnamese | 3 Korean | 4 Thai | 5 Iraqi | 6 German | 7 Egyptian | 8 Argentinian | 9 Dutch | 10 Spanish | 11 Peruvian | 12 Chinese | 13 British | 14 Greek | 15 Australian | 16 Polish | 17 Indian",
          answerFa: "2 ویتنامی | 3 کره‌ای | 4 تایلندی | 5 عراقی | 6 آلمانی | 7 مصری | 8 آرژانتینی | 9 هلندی | 10 اسپانیایی | 11 پرویی | 12 چینی | 13 بریتانیایی | 14 یونانی | 15 استرالیایی | 16 لهستانی | 17 هندی"
        },
        {
          en: "13 Britain",
          fa: "بریتانیا",
          answerEn: "2 Vietnamese | 3 Korean | 4 Thai | 5 Iraqi | 6 German | 7 Egyptian | 8 Argentinian | 9 Dutch | 10 Spanish | 11 Peruvian | 12 Chinese | 13 British | 14 Greek | 15 Australian | 16 Polish | 17 Indian",
          answerFa: "2 ویتنامی | 3 کره‌ای | 4 تایلندی | 5 عراقی | 6 آلمانی | 7 مصری | 8 آرژانتینی | 9 هلندی | 10 اسپانیایی | 11 پرویی | 12 چینی | 13 بریتانیایی | 14 یونانی | 15 استرالیایی | 16 لهستانی | 17 هندی"
        },
        {
          en: "14 Greece",
          fa: "یونان",
          answerEn: "2 Vietnamese | 3 Korean | 4 Thai | 5 Iraqi | 6 German | 7 Egyptian | 8 Argentinian | 9 Dutch | 10 Spanish | 11 Peruvian | 12 Chinese | 13 British | 14 Greek | 15 Australian | 16 Polish | 17 Indian",
          answerFa: "2 ویتنامی | 3 کره‌ای | 4 تایلندی | 5 عراقی | 6 آلمانی | 7 مصری | 8 آرژانتینی | 9 هلندی | 10 اسپانیایی | 11 پرویی | 12 چینی | 13 بریتانیایی | 14 یونانی | 15 استرالیایی | 16 لهستانی | 17 هندی"
        },
        {
          en: "15 Australia",
          fa: "استرالیا",
          answerEn: "2 Vietnamese | 3 Korean | 4 Thai | 5 Iraqi | 6 German | 7 Egyptian | 8 Argentinian | 9 Dutch | 10 Spanish | 11 Peruvian | 12 Chinese | 13 British | 14 Greek | 15 Australian | 16 Polish | 17 Indian",
          answerFa: "2 ویتنامی | 3 کره‌ای | 4 تایلندی | 5 عراقی | 6 آلمانی | 7 مصری | 8 آرژانتینی | 9 هلندی | 10 اسپانیایی | 11 پرویی | 12 چینی | 13 بریتانیایی | 14 یونانی | 15 استرالیایی | 16 لهستانی | 17 هندی"
        },
        {
          en: "16 Poland",
          fa: "لهستان",
          answerEn: "2 Vietnamese | 3 Korean | 4 Thai | 5 Iraqi | 6 German | 7 Egyptian | 8 Argentinian | 9 Dutch | 10 Spanish | 11 Peruvian | 12 Chinese | 13 British | 14 Greek | 15 Australian | 16 Polish | 17 Indian",
          answerFa: "2 ویتنامی | 3 کره‌ای | 4 تایلندی | 5 عراقی | 6 آلمانی | 7 مصری | 8 آرژانتینی | 9 هلندی | 10 اسپانیایی | 11 پرویی | 12 چینی | 13 بریتانیایی | 14 یونانی | 15 استرالیایی | 16 لهستانی | 17 هندی"
        },
        {
          en: "17 India",
          fa: "هند",
          answerEn: "2 Vietnamese | 3 Korean | 4 Thai | 5 Iraqi | 6 German | 7 Egyptian | 8 Argentinian | 9 Dutch | 10 Spanish | 11 Peruvian | 12 Chinese | 13 British | 14 Greek | 15 Australian | 16 Polish | 17 Indian",
          answerFa: "2 ویتنامی | 3 کره‌ای | 4 تایلندی | 5 عراقی | 6 آلمانی | 7 مصری | 8 آرژانتینی | 9 هلندی | 10 اسپانیایی | 11 پرویی | 12 چینی | 13 بریتانیایی | 14 یونانی | 15 استرالیایی | 16 لهستانی | 17 هندی"
        }
      ]
    }
  },
  {
    id: "viu-elem-l37",
    lesson: 37,
    title: "Weather",
    titleFa: "هوا (سرد، باران)",
    source: "VIU Elementary 2nd ed — درس 37 (کتاب ص78-79)",
    paragraphs: [
      {
        en: "It's a sunny day in Tokyo today, but it's cloudy in Hong Kong.",
        fa: "امروز در توکیو روز آفتابی است، اما در هنگ‌کنگ ابری است."
      },
      {
        en: "It's foggy in Sydney and it's snowing / it's snowy in Moscow.",
        fa: "در سیدنی مه‌آلود است و در مسکو برف می‌بارد / هوا برفی است."
      },
      {
        en: "It's raining in Barcelona but the sun is shining in Granada.",
        fa: "در بارسلونا باران می‌بارد اما در گرانادا خورشید می‌درخشد."
      },
      {
        en: "It's lovely weather today, isn't it!",
        fa: "امروز هوا دلپذیری است، این‌طور نیست؟"
      },
      {
        en: "It's a horrible day, isn't it!",
        fa: "روز وحشتناکی است، این‌طور نیست؟"
      },
      {
        en: "You cannot say It's winding / clouding / fogging / sunning.",
        fa: "نمی‌توان گفت It's winding / clouding / fogging / sunning."
      },
      {
        en: "It is very hot in Mexico – it is often 45 degrees there in summer.",
        fa: "در مکزیک هوا خیلی گرم است – تابستان اغلب آنجا ۴۵ درجه است."
      },
      {
        en: "It is very cold in the Arctic – it is often minus 50 degrees there.",
        fa: "در قطب هوا خیلی سرد است – اغلب منفی ۵۰ درجه است."
      },
      {
        en: "It is very wet in London – carry an umbrella when you go sightseeing there.",
        fa: "در لندن هوا خیلی مرطوب است – وقتی برای گردش می‌روید چتر همراه داشته باشید."
      },
      {
        en: "It is very dry in the Sahara – it doesn't often rain there.",
        fa: "در صحرا هوا خیلی خشک است – آنجا اغلب باران نمی‌بارد."
      },
      {
        en: "A hurricane is a very strong wind.",
        fa: "توفان بادی بسیار شدید است."
      },
      {
        en: "A storm is when there is a strong wind and rain together.",
        fa: "طوفان وقتی است که باد شدید و باران با هم باشند."
      },
      {
        en: "A thunderstorm is when there is thunder, lightning, rain and sometimes wind together.",
        fa: "طوفان رعد و برق وقتی است که رعد، برق، باران و گاهی باد با هم باشند."
      },
      {
        en: "Tip: If you are able to see the weather forecast in English on television, watch it as often as you can.",
        fa: "نکته: اگر می‌توانید پیش‌بینی هوا به انگلیسی را در تلویزیون ببینید، هر چه می‌توانید آن را تماشا کنید."
      }
    ],
    exercise: {
      instruction: "37.1 Match the words and the symbols. — 37.2 Look at the types of weather in A. Write them down in order from your most favourite to your least favourite. — 37.3 Look at the chart. Write sentences about the towns in the chart. — 37.5 Are these sentences true about the weather in your country? If not, correct them. — 37.6 Write about the weather where you are today. Use as many words as possible from the opposite page.",
      instructionFa: "کلمات را به نمادها وصل کنید. — به انواع هوا در بخش A نگاه کنید و آن‌ها را از محبوب‌ترین تا کم‌محبوب‌ترین به ترتیب بنویسید. — به جدول نگاه کنید و دربارهٔ شهرهای جدول جمله بنویسید. — آیا این جمله‌ها دربارهٔ هوای کشور شما درست‌اند؟ اگر نه، آن‌ها را اصلاح کنید. — دربارهٔ هوای محل زندگی خود امروز بنویسید. تا حد امکان از کلمات صفحهٔ مقابل استفاده کنید.",
      items: [
        {
          en: "1 snow",
          fa: "برف",
          answerEn: "d",
          answerFa: "د"
        },
        {
          en: "2 sun",
          fa: "خورشید",
          answerEn: "c",
          answerFa: "c"
        },
        {
          en: "3 rain",
          fa: "باران",
          answerEn: "g",
          answerFa: "g"
        },
        {
          en: "4 fog",
          fa: "مه",
          answerEn: "e",
          answerFa: "ه"
        },
        {
          en: "5 lightning",
          fa: "آذرخش",
          answerEn: "a",
          answerFa: "a"
        },
        {
          en: "6 wind",
          fa: "باد",
          answerEn: "f",
          answerFa: "f"
        },
        {
          en: "7 cloud",
          fa: "ابر",
          answerEn: "b",
          answerFa: "ب"
        },
        {
          en: "1 It is sunny in Hanoi.",
          fa: "در هانوی هوا آفتابی است.",
          answerEn: "3 It is windy in La Paz. | 4 It is cloudy in Paris. | 5 It is foggy in Tashkent. | 6 It is sunny in Seoul. or The sun is shining in Seoul. | 7 It is windy in Warsaw. | 8 It is snowing in Washington.",
          answerFa: "3 در لاپاز باد است. | 4 در پاریس ابری است. | 5 در تاشکند مه‌آلود است. | 6 در سئول آفتابی است. یا خورشید در سئول می‌درخشد. | 7 در ورشو باد است. | 8 در واشنگتن برف می‌بارد."
        },
        {
          en: "2 It is raining in Hong Kong.",
          fa: "در هنگ‌کنگ باران می‌بارد.",
          answerEn: "3 It is windy in La Paz. | 4 It is cloudy in Paris. | 5 It is foggy in Tashkent. | 6 It is sunny in Seoul. or The sun is shining in Seoul. | 7 It is windy in Warsaw. | 8 It is snowing in Washington.",
          answerFa: "3 در لاپاز باد است. | 4 در پاریس ابری است. | 5 در تاشکند مه‌آلود است. | 6 در سئول آفتابی است. یا خورشید در سئول می‌درخشد. | 7 در ورشو باد است. | 8 در واشنگتن برف می‌بارد."
        },
        {
          en: "3 It is ________",
          fa: "هوا ________",
          answerEn: "3 It is windy in La Paz. | 4 It is cloudy in Paris. | 5 It is foggy in Tashkent. | 6 It is sunny in Seoul. or The sun is shining in Seoul. | 7 It is windy in Warsaw. | 8 It is snowing in Washington.",
          answerFa: "3 در لاپاز باد است. | 4 در پاریس ابری است. | 5 در تاشکند مه‌آلود است. | 6 در سئول آفتابی است. یا خورشید در سئول می‌درخشد. | 7 در ورشو باد است. | 8 در واشنگتن برف می‌بارد."
        },
        {
          en: "4 It ________",
          fa: "هوا ________",
          answerEn: "3 It is windy in La Paz. | 4 It is cloudy in Paris. | 5 It is foggy in Tashkent. | 6 It is sunny in Seoul. or The sun is shining in Seoul. | 7 It is windy in Warsaw. | 8 It is snowing in Washington.",
          answerFa: "3 در لاپاز باد است. | 4 در پاریس ابری است. | 5 در تاشکند مه‌آلود است. | 6 در سئول آفتابی است. یا خورشید در سئول می‌درخشد. | 7 در ورشو باد است. | 8 در واشنگتن برف می‌بارد."
        },
        {
          en: "5 ________",
          fa: "________",
          answerEn: "3 It is windy in La Paz. | 4 It is cloudy in Paris. | 5 It is foggy in Tashkent. | 6 It is sunny in Seoul. or The sun is shining in Seoul. | 7 It is windy in Warsaw. | 8 It is snowing in Washington.",
          answerFa: "3 در لاپاز باد است. | 4 در پاریس ابری است. | 5 در تاشکند مه‌آلود است. | 6 در سئول آفتابی است. یا خورشید در سئول می‌درخشد. | 7 در ورشو باد است. | 8 در واشنگتن برف می‌بارد."
        },
        {
          en: "6 ________",
          fa: "________",
          answerEn: "3 It is windy in La Paz. | 4 It is cloudy in Paris. | 5 It is foggy in Tashkent. | 6 It is sunny in Seoul. or The sun is shining in Seoul. | 7 It is windy in Warsaw. | 8 It is snowing in Washington.",
          answerFa: "3 در لاپاز باد است. | 4 در پاریس ابری است. | 5 در تاشکند مه‌آلود است. | 6 در سئول آفتابی است. یا خورشید در سئول می‌درخشد. | 7 در ورشو باد است. | 8 در واشنگتن برف می‌بارد."
        },
        {
          en: "7 ________",
          fa: "________",
          answerEn: "3 It is windy in La Paz. | 4 It is cloudy in Paris. | 5 It is foggy in Tashkent. | 6 It is sunny in Seoul. or The sun is shining in Seoul. | 7 It is windy in Warsaw. | 8 It is snowing in Washington.",
          answerFa: "3 در لاپاز باد است. | 4 در پاریس ابری است. | 5 در تاشکند مه‌آلود است. | 6 در سئول آفتابی است. یا خورشید در سئول می‌درخشد. | 7 در ورشو باد است. | 8 در واشنگتن برف می‌بارد."
        },
        {
          en: "8 ________",
          fa: "________",
          answerEn: "3 It is windy in La Paz. | 4 It is cloudy in Paris. | 5 It is foggy in Tashkent. | 6 It is sunny in Seoul. or The sun is shining in Seoul. | 7 It is windy in Warsaw. | 8 It is snowing in Washington.",
          answerFa: "3 در لاپاز باد است. | 4 در پاریس ابری است. | 5 در تاشکند مه‌آلود است. | 6 در سئول آفتابی است. یا خورشید در سئول می‌درخشد. | 7 در ورشو باد است. | 8 در واشنگتن برف می‌بارد."
        },
        {
          en: "1 It often snows in December.",
          fa: "اغلب در ماه دسامبر برف می‌بارد.",
          answerEn: "Possible answers: 1 It sometimes snows in December. | 2 It is usually 20 degrees in summer and 0 (zero) degrees in winter. | 3 There are sometimes thunderstorms in August. | 4 It is not usually very wet in spring. | 5 We almost never have hurricanes. | 6 Summer is my favourite season because it is warm and dry.",
          answerFa: "پاسخ‌های ممکن: 1 گاهی در دسامبر برف می‌بارد. | 2 معمولاً در تابستان ۲۰ درجه و در زمستان ۰ (صفر) درجه است. | 3 گاهی در اوت رعد و برق می‌آید. | ۴ معمولاً بهار خیلی مرطوب نیست. | ۵ تقریباً هرگز طوفان‌های سیکلون نداریم. | ۶ تابستان فصل مورد علاقه من است چون گرم و خشک است."
        },
        {
          en: "2 It is usually 40 degrees in summer and minus 20 degrees in winter.",
          fa: "تابستان معمولاً ۴۰ درجه و زمستان منفی ۲۰ درجه است.",
          answerEn: "Possible answers: 1 It sometimes snows in December. | 2 It is usually 20 degrees in summer and 0 (zero) degrees in winter. | 3 There are sometimes thunderstorms in August. | 4 It is not usually very wet in spring. | 5 We almost never have hurricanes. | 6 Summer is my favourite season because it is warm and dry.",
          answerFa: "پاسخ‌های ممکن: 1 گاهی در دسامبر برف می‌بارد. | 2 معمولاً در تابستان ۲۰ درجه و در زمستان ۰ (صفر) درجه است. | 3 گاهی در اوت رعد و برق می‌آید. | ۴ معمولاً بهار خیلی مرطوب نیست. | ۵ تقریباً هرگز طوفان‌های سیکلون نداریم. | ۶ تابستان فصل مورد علاقه من است چون گرم و خشک است."
        },
        {
          en: "3 There are thunderstorms every day in August.",
          fa: "هر روز در ماه اوت طوفان رعد و برق وجود دارد.",
          answerEn: "Possible answers: 1 It sometimes snows in December. | 2 It is usually 20 degrees in summer and 0 (zero) degrees in winter. | 3 There are sometimes thunderstorms in August. | 4 It is not usually very wet in spring. | 5 We almost never have hurricanes. | 6 Summer is my favourite season because it is warm and dry.",
          answerFa: "پاسخ‌های ممکن: 1 گاهی در دسامبر برف می‌بارد. | 2 معمولاً در تابستان ۲۰ درجه و در زمستان ۰ (صفر) درجه است. | 3 گاهی در اوت رعد و برق می‌آید. | ۴ معمولاً بهار خیلی مرطوب نیست. | ۵ تقریباً هرگز طوفان‌های سیکلون نداریم. | ۶ تابستان فصل مورد علاقه من است چون گرم و خشک است."
        },
        {
          en: "4 It is very wet in spring.",
          fa: "در بهار هوا خیلی مرطوب است.",
          answerEn: "Possible answers: 1 It sometimes snows in December. | 2 It is usually 20 degrees in summer and 0 (zero) degrees in winter. | 3 There are sometimes thunderstorms in August. | 4 It is not usually very wet in spring. | 5 We almost never have hurricanes. | 6 Summer is my favourite season because it is warm and dry.",
          answerFa: "پاسخ‌های ممکن: 1 گاهی در دسامبر برف می‌بارد. | 2 معمولاً در تابستان ۲۰ درجه و در زمستان ۰ (صفر) درجه است. | 3 گاهی در اوت رعد و برق می‌آید. | ۴ معمولاً بهار خیلی مرطوب نیست. | ۵ تقریباً هرگز طوفان‌های سیکلون نداریم. | ۶ تابستان فصل مورد علاقه من است چون گرم و خشک است."
        },
        {
          en: "5 We never have hurricanes.",
          fa: "ما هرگز توفان نداریم.",
          answerEn: "Possible answers: 1 It sometimes snows in December. | 2 It is usually 20 degrees in summer and 0 (zero) degrees in winter. | 3 There are sometimes thunderstorms in August. | 4 It is not usually very wet in spring. | 5 We almost never have hurricanes. | 6 Summer is my favourite season because it is warm and dry.",
          answerFa: "پاسخ‌های ممکن: 1 گاهی در دسامبر برف می‌بارد. | 2 معمولاً در تابستان ۲۰ درجه و در زمستان ۰ (صفر) درجه است. | 3 گاهی در اوت رعد و برق می‌آید. | ۴ معمولاً بهار خیلی مرطوب نیست. | ۵ تقریباً هرگز طوفان‌های سیکلون نداریم. | ۶ تابستان فصل مورد علاقه من است چون گرم و خشک است."
        },
        {
          en: "6 Summer is my favourite season because it is usually hot and dry.",
          fa: "تابستان فصل مورد علاقهٔ من است چون معمولاً گرم و خشک است.",
          answerEn: "Possible answers: 1 It sometimes snows in December. | 2 It is usually 20 degrees in summer and 0 (zero) degrees in winter. | 3 There are sometimes thunderstorms in August. | 4 It is not usually very wet in spring. | 5 We almost never have hurricanes. | 6 Summer is my favourite season because it is warm and dry.",
          answerFa: "پاسخ‌های ممکن: 1 گاهی در دسامبر برف می‌بارد. | 2 معمولاً در تابستان ۲۰ درجه و در زمستان ۰ (صفر) درجه است. | 3 گاهی در اوت رعد و برق می‌آید. | ۴ معمولاً بهار خیلی مرطوب نیست. | ۵ تقریباً هرگز طوفان‌های سیکلون نداریم. | ۶ تابستان فصل مورد علاقه من است چون گرم و خشک است."
        }
      ]
    }
  },
  {
    id: "viu-elem-l38",
    lesson: 38,
    title: "In the town",
    titleFa: "در شهر (ایستگاه قطار، بانک)",
    source: "VIU Elementary 2nd ed — درس 38 (کتاب ص80-81)",
    paragraphs: [
      {
        en: "You can get a train at the railway station.",
        fa: "می‌توانید قطار را در ایستگاه راه‌آهن سوار شوید."
      },
      {
        en: "You can change money at the bank.",
        fa: "می‌توانید پول را در بانک عوض کنید."
      },
      {
        en: "You can read books and newspapers at the library.",
        fa: "می‌توانید کتاب‌ها و روزنامه‌ها را در کتابخانه بخوانید."
      },
      {
        en: "You can park your car in/at the car park.",
        fa: "می‌توانید خودروی خود را در پارکینگ پارک کنید."
      },
      {
        en: "Where is the main square?",
        fa: "میدان اصلی کجاست؟"
      },
      {
        en: "How do I get to X street?",
        fa: "چطور به خیابان X بروم؟"
      },
      {
        en: "Is there a pedestrian area here?",
        fa: "اینجا منطقهٔ پیاده هست؟"
      },
      {
        en: "Can I park here?",
        fa: "آیا می‌توانم اینجا پارک کنم؟"
      },
      {
        en: "Excuse me, I'm looking for the museum.",
        fa: "ببخشید، دنبال موزه می‌گردم."
      }
    ],
    exercise: {
      instruction: "38.1 Answer the questions. — 38.2 Look at the map on the opposite page. Ask questions. — 38.3 What words are these? — 38.4 What are these signs? — 38.5 Write a paragraph about your town. Use the words opposite.",
      instructionFa: "به سؤال‌ها پاسخ دهید. — به نقشهٔ صفحهٔ مقابل نگاه کنید. سؤال بپرسید. — این‌ها چه کلماتی هستند؟ — این تابلوها چیستند؟ — دربارهٔ شهر خود یک بند بنویسید. از کلمات صفحهٔ مقابل استفاده کنید.",
      items: [
        {
          en: "Where can I get a bus to London? At the bus station.",
          fa: "کجا می‌توانم اتوبوس لندن را سوار شوم؟ در ایستگاه اتوبوس.",
          answerEn: "2 At the tourist information office. | 3 At the bank. | 4 In/At the car park. | 5 At the museum. | 6 At the post office.",
          answerFa: "۲ در دفتر اطلاعات گردشگری. | ۳ در بانک. | ۴ در/پارکینگ ماشین. | ۵ در موزه. | ۶ در اداره پست."
        },
        {
          en: "Where can I get information about hotels?",
          fa: "کجا می‌توانم دربارهٔ هتل‌ها اطلاعات بگیرم؟",
          answerEn: "2 At the tourist information office. | 3 At the bank. | 4 In/At the car park. | 5 At the museum. | 6 At the post office.",
          answerFa: "۲ در دفتر اطلاعات گردشگری. | ۳ در بانک. | ۴ در/پارکینگ ماشین. | ۵ در موزه. | ۶ در اداره پست."
        },
        {
          en: "Where can I change money?",
          fa: "کجا می‌توانم پول عوض کنم؟",
          answerEn: "2 At the tourist information office. | 3 At the bank. | 4 In/At the car park. | 5 At the museum. | 6 At the post office.",
          answerFa: "۲ در دفتر اطلاعات گردشگری. | ۳ در بانک. | ۴ در/پارکینگ ماشین. | ۵ در موزه. | ۶ در اداره پست."
        },
        {
          en: "Where can I park?",
          fa: "کجا می‌توانم پارک کنم؟",
          answerEn: "2 At the tourist information office. | 3 At the bank. | 4 In/At the car park. | 5 At the museum. | 6 At the post office.",
          answerFa: "۲ در دفتر اطلاعات گردشگری. | ۳ در بانک. | ۴ در/پارکینگ ماشین. | ۵ در موزه. | ۶ در اداره پست."
        },
        {
          en: "Where can I see very old things?",
          fa: "کجا می‌توانم چیزهای خیلی قدیمی ببینم؟",
          answerEn: "2 At the tourist information office. | 3 At the bank. | 4 In/At the car park. | 5 At the museum. | 6 At the post office.",
          answerFa: "۲ در دفتر اطلاعات گردشگری. | ۳ در بانک. | ۴ در/پارکینگ ماشین. | ۵ در موزه. | ۶ در اداره پست."
        },
        {
          en: "Where can I post a letter?",
          fa: "کجا می‌توانم نامه پستی بفرستم؟",
          answerEn: "2 At the tourist information office. | 3 At the bank. | 4 In/At the car park. | 5 At the museum. | 6 At the post office.",
          answerFa: "۲ در دفتر اطلاعات گردشگری. | ۳ در بانک. | ۴ در/پارکینگ ماشین. | ۵ در موزه. | ۶ در اداره پست."
        },
        {
          en: "________ Near the roundabout.",
          fa: "نزدیک میدان دایره‌ای.",
          answerEn: "Possible questions: 2 Where's the town hall? | 3 How do I get to the museum? | 4 Is there a shopping centre? | 5 Where can I park? | 6 Where can I change money?",
          answerFa: "سؤالات ممکن: ۲ ساختمان شهر کجاست؟ | ۳ چطور به موسه بروم؟ | ۴ مرکز خریدی هست؟ | ۵ کجا می‌توانم ماشینم را پارک کنم؟ | ۶ کجا می‌توانم پولم را عوض کنم؟"
        },
        {
          en: "________ In the square.",
          fa: "در میدان.",
          answerEn: "Possible questions: 2 Where's the town hall? | 3 How do I get to the museum? | 4 Is there a shopping centre? | 5 Where can I park? | 6 Where can I change money?",
          answerFa: "سؤالات ممکن: ۲ ساختمان شهر کجاست؟ | ۳ چطور به موسه بروم؟ | ۴ مرکز خریدی هست؟ | ۵ کجا می‌توانم ماشینم را پارک کنم؟ | ۶ کجا می‌توانم پولم را عوض کنم؟"
        },
        {
          en: "________ Go left at York Street.",
          fa: "در خیابان یورک به چپ بروید.",
          answerEn: "Possible questions: 2 Where's the town hall? | 3 How do I get to the museum? | 4 Is there a shopping centre? | 5 Where can I park? | 6 Where can I change money?",
          answerFa: "سؤالات ممکن: ۲ ساختمان شهر کجاست؟ | ۳ چطور به موسه بروم؟ | ۴ مرکز خریدی هست؟ | ۵ کجا می‌توانم ماشینم را پارک کنم؟ | ۶ کجا می‌توانم پولم را عوض کنم؟"
        },
        {
          en: "________ In the pedestrian area.",
          fa: "در منطقهٔ پیاده.",
          answerEn: "Possible questions: 2 Where's the town hall? | 3 How do I get to the museum? | 4 Is there a shopping centre? | 5 Where can I park? | 6 Where can I change money?",
          answerFa: "سؤالات ممکن: ۲ ساختمان شهر کجاست؟ | ۳ چطور به موسه بروم؟ | ۴ مرکز خریدی هست؟ | ۵ کجا می‌توانم ماشینم را پارک کنم؟ | ۶ کجا می‌توانم پولم را عوض کنم؟"
        },
        {
          en: "________ London Road car park is best.",
          fa: "پارکینگ لندن رود بهترین است.",
          answerEn: "Possible questions: 2 Where's the town hall? | 3 How do I get to the museum? | 4 Is there a shopping centre? | 5 Where can I park? | 6 Where can I change money?",
          answerFa: "سؤالات ممکن: ۲ ساختمان شهر کجاست؟ | ۳ چطور به موسه بروم؟ | ۴ مرکز خریدی هست؟ | ۵ کجا می‌توانم ماشینم را پارک کنم؟ | ۶ کجا می‌توانم پولم را عوض کنم؟"
        },
        {
          en: "________ There's a bank in Queen Street.",
          fa: "بانکی در کوئین استریت هست.",
          answerEn: "Possible questions: 2 Where's the town hall? | 3 How do I get to the museum? | 4 Is there a shopping centre? | 5 Where can I park? | 6 Where can I change money?",
          answerFa: "سؤالات ممکن: ۲ ساختمان شهر کجاست؟ | ۳ چطور به موسه بروم؟ | ۴ مرکز خریدی هست؟ | ۵ کجا می‌توانم ماشینم را پارک کنم؟ | ۶ کجا می‌توانم پولم را عوض کنم؟"
        },
        {
          en: "sumuem",
          fa: "(مؤسسه = museum)",
          answerEn: "2 town hall | 3 library | 4 car park | 5 railway station | 6 pedestrian area | 7 traffic warden",
          answerFa: "۲ ساختمان شهر | ۳ کتابخانه | ۴ پارکینگ | ۵ ایستگاه قطار | ۶ پیاده‌رو | ۷ مأمور ترافیک"
        },
        {
          en: "nowt hlal",
          fa: "(تالار شهر = town hall)",
          answerEn: "2 town hall | 3 library | 4 car park | 5 railway station | 6 pedestrian area | 7 traffic warden",
          answerFa: "۲ ساختمان شهر | ۳ کتابخانه | ۴ پارکینگ | ۵ ایستگاه قطار | ۶ پیاده‌رو | ۷ مأمور ترافیک"
        },
        {
          en: "brilyra",
          fa: "(کتابخانه = library)",
          answerEn: "2 town hall | 3 library | 4 car park | 5 railway station | 6 pedestrian area | 7 traffic warden",
          answerFa: "۲ ساختمان شهر | ۳ کتابخانه | ۴ پارکینگ | ۵ ایستگاه قطار | ۶ پیاده‌رو | ۷ مأمور ترافیک"
        },
        {
          en: "rac prak",
          fa: "(پارکینگ = car park)",
          answerEn: "2 town hall | 3 library | 4 car park | 5 railway station | 6 pedestrian area | 7 traffic warden",
          answerFa: "۲ ساختمان شهر | ۳ کتابخانه | ۴ پارکینگ | ۵ ایستگاه قطار | ۶ پیاده‌رو | ۷ مأمور ترافیک"
        },
        {
          en: "ywrlaai nttoisa",
          fa: "(ایستگاه راه‌آهن = railway station)",
          answerEn: "2 town hall | 3 library | 4 car park | 5 railway station | 6 pedestrian area | 7 traffic warden",
          answerFa: "۲ ساختمان شهر | ۳ کتابخانه | ۴ پارکینگ | ۵ ایستگاه قطار | ۶ پیاده‌رو | ۷ مأمور ترافیک"
        },
        {
          en: "dtaeepsrin raae",
          fa: "(منطقهٔ پیاده = pedestrian area)",
          answerEn: "2 town hall | 3 library | 4 car park | 5 railway station | 6 pedestrian area | 7 traffic warden",
          answerFa: "۲ ساختمان شهر | ۳ کتابخانه | ۴ پارکینگ | ۵ ایستگاه قطار | ۶ پیاده‌رو | ۷ مأمور ترافیک"
        },
        {
          en: "frtafci dnearw",
          fa: "(مأمور راهنمایی = traffic warden)",
          answerEn: "2 town hall | 3 library | 4 car park | 5 railway station | 6 pedestrian area | 7 traffic warden",
          answerFa: "۲ ساختمان شهر | ۳ کتابخانه | ۴ پارکینگ | ۵ ایستگاه قطار | ۶ پیاده‌رو | ۷ مأمور ترافیک"
        },
        {
          en: "Sign 1 (PARKING PROHIBITED)",
          fa: "تابلو ۱ (پارک ممنوع)",
          answerEn: "No parking (do not leave your car here)",
          answerFa: "پارک ممنوع (ماشین خود را اینجا نگذارید)"
        },
        {
          en: "Sign 2",
          fa: "تابلو ۲",
          answerEn: "No entry (you must not drive in)",
          answerFa: "ورود ممنوع (نباید وارد شوید)"
        },
        {
          en: "Sign 3",
          fa: "تابلو ۳",
          answerEn: "Bus stop",
          answerFa: "ایستگاه اتوبوس"
        },
        {
          en: "Sign 4",
          fa: "تابلو ۴",
          answerEn: "Information",
          answerFa: "اطلاعات"
        }
      ]
    }
  },
  {
    id: "viu-elem-l39",
    lesson: 39,
    title: "In the countryside",
    titleFa: "در حومهٔ شهر (تپه، مزرعه)",
    source: "VIU Elementary 2nd ed — درس 39 (کتاب ص82-83)",
    paragraphs: [
      {
        en: "A farmer lives on a farm and works in the fields.",
        fa: "کشاورز در مزرعه زندگی می‌کند و در کشتزارها کار می‌کند."
      },
      {
        en: "My friend lives in a cottage (small house in a village or out in the countryside).",
        fa: "دوست من در یک کلبه زندگی می‌کند (خانهٔ کوچکی در روستا یا بیرون شهر)."
      },
      {
        en: "I love nature. [NOT I love the nature.]",
        fa: "من عاشق طبیعت هستم. [نه I love the nature]"
      },
      {
        en: "I like walking in the countryside. [NOT I like walking in the nature. 'Nature' is not a place.]",
        fa: "من از پیاده‌روی در طبیعت لذت می‌برم. [نه I like walking in the nature. 'Nature' یک مکان نیست.]"
      },
      {
        en: "There is wonderful wildlife in the north of the country.",
        fa: "در شمال کشور حیات وحش شگفت‌انگیزی وجود دارد."
      },
      {
        en: "Near the village there is a conservation area (= place where wildlife and nature are protected).",
        fa: "نزدیک دهکده یک منطقهٔ حفاظت‌شده وجود دارد (مکانی که حیات وحش و طبیعت در آن محافظت می‌شود)."
      },
      {
        en: "In the south of the country, there is a national park (= very big national conservation area).",
        fa: "در جنوب کشور یک پارک ملی وجود دارد (منطقهٔ حفاظت‌شدهٔ ملی بسیار بزرگی)."
      },
      {
        en: "You can take food and drink and have a picnic.",
        fa: "می‌توانید غذا و نوشیدنی ببرید و پیکنیک کنید."
      },
      {
        en: "You can go walking/skiing in the mountains.",
        fa: "می‌توانید در کوه‌ها پیاده‌روی/اسکی کنید."
      }
    ],
    exercise: {
      instruction: "39.1 Cover the left-hand page. How many names of things in the countryside can you remember? — 39.3 Match the beginning of the sentences on the left with the ends of the sentences on the right. Draw lines. — 39.4 Describe the typical countryside where you come from. Write four sentences about it. Use these questions to help you.",
      instructionFa: "صفحهٔ سمت چپ را بپوشانید. چند نام از چیزهای روستا را به یاد دارید؟ — ابتدای جمله‌های سمت چپ را به انتهای جمله‌های سمت راست وصل کنید. خط بکشید. — منطقهٔ روستایی محل زندگی خود را توصیف کنید. چهار جمله دربارهٔ آن بنویسید. از این سؤال‌ها کمک بگیرید.",
      items: [
        {
          en: "1 ________",
          fa: "۱ ________",
          answerEn: "mountains",
          answerFa: "کوه‌ها"
        },
        {
          en: "2 ________",
          fa: "۲ ________",
          answerEn: "forest",
          answerFa: "جنگل"
        },
        {
          en: "3 ________",
          fa: "۳ ________",
          answerEn: "lake",
          answerFa: "دریاچه"
        },
        {
          en: "4 ________",
          fa: "۴ ________",
          answerEn: "hills",
          answerFa: "تپه‌ها"
        },
        {
          en: "5 ________",
          fa: "۵ ________",
          answerEn: "village",
          answerFa: "دهکده"
        },
        {
          en: "6 ________",
          fa: "۶ ________",
          answerEn: "path",
          answerFa: "مسیر"
        },
        {
          en: "7 ________",
          fa: "۷ ________",
          answerEn: "wood",
          answerFa: "چوب"
        },
        {
          en: "8 ________",
          fa: "۸ ________",
          answerEn: "fields",
          answerFa: "زمین‌های کشاورزی"
        },
        {
          en: "9 ________",
          fa: "۹ ________",
          answerEn: "river",
          answerFa: "رودخانه"
        },
        {
          en: "10 ________",
          fa: "۱۰ ________",
          answerEn: "farm",
          answerFa: "کشاورزی"
        },
        {
          en: "11 ________",
          fa: "۱۱ ________",
          answerEn: "country road",
          answerFa: "جاده روستایی"
        },
        {
          en: "We went swimming / sitting by the river.",
          fa: "به شنا رفتیم / کنار رودخانه نشستن.",
          answerEn: "We went swimming in the lake. The water was warm.",
          answerFa: "ما در دریاچه شنا رفتیم. آب گرم بود."
        },
        {
          en: "We went walking / in the national park.",
          fa: "به پیاده‌روی رفتیم / در پارک ملی.",
          answerEn: "We went walking along a 5-kilometre path.",
          answerFa: "ما در یک مسیر ۵ کیلومتری پیاده‌روی کردیم."
        },
        {
          en: "We went skiing / in the lake. The water was warm.",
          fa: "به اسکی رفتیم / در دریاچه. آب گرم بود.",
          answerEn: "We went skiing down the mountain.",
          answerFa: "ما از کوه اسکی کردیم."
        },
        {
          en: "We saw some wonderful wildlife / along a 5-kilometre path.",
          fa: "حیات وحش شگفت‌انگیزی دیدیم / در امتداد مسیری به طول ۵ کیلومتر.",
          answerEn: "We saw some wonderful wildlife in the national park.",
          answerFa: "ما در پارک ملی حیات وحش شگفت‌انگیزی دیدیم."
        },
        {
          en: "We had a picnic / down the mountain.",
          fa: "پیکنیک داشتیم / از کوه پایین.",
          answerEn: "We had a picnic sitting by the river.",
          answerFa: "یک پیک‌نیک داشتیم و کنار رودخانه نشستیم."
        },
        {
          en: "Are there any woods or forests?",
          fa: "آیا بیشه یا جنگلی وجود دارد؟",
          answerEn: "Possible sentences: 1 There are some big forests and a lot of farms. | 2 There are no hills or mountains. The countryside is flat. There are a lot of paths where you can walk. | 3 There is one big river and some small rivers. The wildlife there is very beautiful. | 4 There are a lot of villages and some small towns.",
          answerFa: "جملات ممکن: ۱ چند جنگل بزرگ و خیلی مزرعه وجود دارد. | ۲ تپه یا کوه‌ای وجود ندارد. حومه صاف است. مسیرهای زیادی برای پیاده‌روی وجود دارد. | ۳ یک رودخانه بزرگ و چند رودخانه کوچک وجود دارد. حیات وحش آنجا بسیار زیباست. | ۴ خیلی روستا و چند شهر کوچک وجود دارد."
        },
        {
          en: "Are there any hills or mountains?",
          fa: "آیا تپه یا کوهی وجود دارد؟",
          answerEn: "Possible sentences: 1 There are some big forests and a lot of farms. | 2 There are no hills or mountains. The countryside is flat. There are a lot of paths where you can walk. | 3 There is one big river and some small rivers. The wildlife there is very beautiful. | 4 There are a lot of villages and some small towns.",
          answerFa: "جملات ممکن: ۱ چند جنگل بزرگ و خیلی مزرعه وجود دارد. | ۲ تپه یا کوه‌ای وجود ندارد. حومه صاف است. مسیرهای زیادی برای پیاده‌روی وجود دارد. | ۳ یک رودخانه بزرگ و چند رودخانه کوچک وجود دارد. حیات وحش آنجا بسیار زیباست. | ۴ خیلی روستا و چند شهر کوچک وجود دارد."
        },
        {
          en: "Are there any lakes or rivers?",
          fa: "آیا دریاچه یا رودخانه‌ای وجود دارد؟",
          answerEn: "Possible sentences: 1 There are some big forests and a lot of farms. | 2 There are no hills or mountains. The countryside is flat. There are a lot of paths where you can walk. | 3 There is one big river and some small rivers. The wildlife there is very beautiful. | 4 There are a lot of villages and some small towns.",
          answerFa: "جملات ممکن: ۱ چند جنگل بزرگ و خیلی مزرعه وجود دارد. | ۲ تپه یا کوه‌ای وجود ندارد. حومه صاف است. مسیرهای زیادی برای پیاده‌روی وجود دارد. | ۳ یک رودخانه بزرگ و چند رودخانه کوچک وجود دارد. حیات وحش آنجا بسیار زیباست. | ۴ خیلی روستا و چند شهر کوچک وجود دارد."
        },
        {
          en: "Are there many villages or small towns?",
          fa: "آیا دهکده‌ها یا شهرهای کوچک زیادی وجود دارند؟",
          answerEn: "Possible sentences: 1 There are some big forests and a lot of farms. | 2 There are no hills or mountains. The countryside is flat. There are a lot of paths where you can walk. | 3 There is one big river and some small rivers. The wildlife there is very beautiful. | 4 There are a lot of villages and some small towns.",
          answerFa: "جملات ممکن: ۱ چند جنگل بزرگ و خیلی مزرعه وجود دارد. | ۲ تپه یا کوه‌ای وجود ندارد. حومه صاف است. مسیرهای زیادی برای پیاده‌روی وجود دارد. | ۳ یک رودخانه بزرگ و چند رودخانه کوچک وجود دارد. حیات وحش آنجا بسیار زیباست. | ۴ خیلی روستا و چند شهر کوچک وجود دارد."
        },
        {
          en: "Are there farms?",
          fa: "آیا مزرعه‌هایی وجود دارند؟",
          answerEn: "Possible sentences: 1 There are some big forests and a lot of farms. | 2 There are no hills or mountains. The countryside is flat. There are a lot of paths where you can walk. | 3 There is one big river and some small rivers. The wildlife there is very beautiful. | 4 There are a lot of villages and some small towns.",
          answerFa: "جملات ممکن: ۱ چند جنگل بزرگ و خیلی مزرعه وجود دارد. | ۲ تپه یا کوه‌ای وجود ندارد. حومه صاف است. مسیرهای زیادی برای پیاده‌روی وجود دارد. | ۳ یک رودخانه بزرگ و چند رودخانه کوچک وجود دارد. حیات وحش آنجا بسیار زیباست. | ۴ خیلی روستا و چند شهر کوچک وجود دارد."
        },
        {
          en: "Are there paths where you can walk?",
          fa: "آیا مسیرهایی برای پیاده‌روی وجود دارند؟",
          answerEn: "Possible sentences: 1 There are some big forests and a lot of farms. | 2 There are no hills or mountains. The countryside is flat. There are a lot of paths where you can walk. | 3 There is one big river and some small rivers. The wildlife there is very beautiful. | 4 There are a lot of villages and some small towns.",
          answerFa: "جملات ممکن: ۱ چند جنگل بزرگ و خیلی مزرعه وجود دارد. | ۲ تپه یا کوه‌ای وجود ندارد. حومه صاف است. مسیرهای زیادی برای پیاده‌روی وجود دارد. | ۳ یک رودخانه بزرگ و چند رودخانه کوچک وجود دارد. حیات وحش آنجا بسیار زیباست. | ۴ خیلی روستا و چند شهر کوچک وجود دارد."
        },
        {
          en: "Can you go skiing?",
          fa: "آیا می‌توانید اسکی کنید؟",
          answerEn: "Possible sentences: 1 There are some big forests and a lot of farms. | 2 There are no hills or mountains. The countryside is flat. There are a lot of paths where you can walk. | 3 There is one big river and some small rivers. The wildlife there is very beautiful. | 4 There are a lot of villages and some small towns.",
          answerFa: "جملات ممکن: ۱ چند جنگل بزرگ و خیلی مزرعه وجود دارد. | ۲ تپه یا کوه‌ای وجود ندارد. حومه صاف است. مسیرهای زیادی برای پیاده‌روی وجود دارد. | ۳ یک رودخانه بزرگ و چند رودخانه کوچک وجود دارد. حیات وحش آنجا بسیار زیباست. | ۴ خیلی روستا و چند شهر کوچک وجود دارد."
        },
        {
          en: "Can you see wildlife?",
          fa: "آیا می‌توانید حیات وحش ببینید؟",
          answerEn: "Possible sentences: 1 There are some big forests and a lot of farms. | 2 There are no hills or mountains. The countryside is flat. There are a lot of paths where you can walk. | 3 There is one big river and some small rivers. The wildlife there is very beautiful. | 4 There are a lot of villages and some small towns.",
          answerFa: "جملات ممکن: ۱ چند جنگل بزرگ و خیلی مزرعه وجود دارد. | ۲ تپه یا کوه‌ای وجود ندارد. حومه صاف است. مسیرهای زیادی برای پیاده‌روی وجود دارد. | ۳ یک رودخانه بزرگ و چند رودخانه کوچک وجود دارد. حیات وحش آنجا بسیار زیباست. | ۴ خیلی روستا و چند شهر کوچک وجود دارد."
        }
      ]
    }
  },
  {
    id: "viu-elem-l40",
    lesson: 40,
    title: "Animals and pets",
    titleFa: "جانوران و حیوانات خانگی (اسب، زرافه)",
    source: "VIU Elementary 2nd ed — درس 40 (کتاب ص84-85)",
    paragraphs: [
      {
        en: "Parrots and budgies are birds.",
        fa: "طوطی‌ها و بودژی‌ها پرنده هستند."
      },
      {
        en: "You take your dog for a walk but you don't usually take your cat for a walk.",
        fa: "شما سگتان را برای پیاده‌روی می‌برید اما معمولاً گربه‌تان را برای پیاده‌روی نمی‌برید."
      }
    ],
    exercise: {
      instruction: "40.1 Complete these sentences. — 40.2 Match the animal with its meat and with its young animal. Draw lines. — 40.3 Look at the animals opposite. Which of them ... — 40.4 Look at the pictures and complete the crossword. — 40.5 There are 17 different animals in the pictures on the opposite page. Cover the page. How many of these animals can you remember?",
      instructionFa: "این جملات را کامل کنید. — هر حیوان را به گوشتش و به بچه‌اش وصل کنید. خط بکشید. — به حیوانات صفحه مقابل نگاه کنید. کدام‌یک از آن‌ها… — به تصویرها نگاه کنید و جدول کلمات متقاطع را کامل کنید. — ۱۷ حیوان مختلف در تصویرهای صفحه مقابل هست. صفحه را بپوشانید. از این حیوانات چند تا را می‌توانید به یاد بیاورید؟",
      items: [
        {
          en: "1 A ............ goes to sleep in winter.",
          fa: "…… در زمستان به خواب می‌رود.",
          answerEn: "Possible answers: 2 giraffe | 3 Parrots; budgies; hens | 4 Tigers; lions | 5 horse; elephant | 6 Fish; birds | 7 meat | 8 Hens; cows (or pigs)",
          answerFa: "پاسخ‌های ممکن: ۲ زرافه | ۳ طوطی‌ها; طوطی‌های خوشه‌ای; مرغ‌ها | ۴ ببرها; شیرها | ۵ اسب; فیل | ۶ ماهی‌ها; پرندگان | ۷ گوشت | ۸ مرغ‌ها; گاوها (یا خوک‌ها)"
        },
        {
          en: "2 A ............ has a very long neck.",
          fa: "…… گردن بسیار بلندی دارد.",
          answerEn: "Possible answers: 2 giraffe | 3 Parrots; budgies; hens | 4 Tigers; lions | 5 horse; elephant | 6 Fish; birds | 7 meat | 8 Hens; cows (or pigs)",
          answerFa: "پاسخ‌های ممکن: ۲ زرافه | ۳ طوطی‌ها; طوطی‌های خوشه‌ای; مرغ‌ها | ۴ ببرها; شیرها | ۵ اسب; فیل | ۶ ماهی‌ها; پرندگان | ۷ گوشت | ۸ مرغ‌ها; گاوها (یا خوک‌ها)"
        },
        {
          en: "3 ............, ............ and ............ are birds.",
          fa: "……، …… و …… پرنده هستند.",
          answerEn: "Possible answers: 2 giraffe | 3 Parrots; budgies; hens | 4 Tigers; lions | 5 horse; elephant | 6 Fish; birds | 7 meat | 8 Hens; cows (or pigs)",
          answerFa: "پاسخ‌های ممکن: ۲ زرافه | ۳ طوطی‌ها; طوطی‌های خوشه‌ای; مرغ‌ها | ۴ ببرها; شیرها | ۵ اسب; فیل | ۶ ماهی‌ها; پرندگان | ۷ گوشت | ۸ مرغ‌ها; گاوها (یا خوک‌ها)"
        },
        {
          en: "4 ............ and ............ are large cats.",
          fa: "…… و …… گربه‌های بزرگی هستند.",
          answerEn: "Possible answers: 2 giraffe | 3 Parrots; budgies; hens | 4 Tigers; lions | 5 horse; elephant | 6 Fish; birds | 7 meat | 8 Hens; cows (or pigs)",
          answerFa: "پاسخ‌های ممکن: ۲ زرافه | ۳ طوطی‌ها; طوطی‌های خوشه‌ای; مرغ‌ها | ۴ ببرها; شیرها | ۵ اسب; فیل | ۶ ماهی‌ها; پرندگان | ۷ گوشت | ۸ مرغ‌ها; گاوها (یا خوک‌ها)"
        },
        {
          en: "5 You can ride a ............ and an ............",
          fa: "شما می‌توانید …… و …… سوار شوید.",
          answerEn: "Possible answers: 2 giraffe | 3 Parrots; budgies; hens | 4 Tigers; lions | 5 horse; elephant | 6 Fish; birds | 7 meat | 8 Hens; cows (or pigs)",
          answerFa: "پاسخ‌های ممکن: ۲ زرافه | ۳ طوطی‌ها; طوطی‌های خوشه‌ای; مرغ‌ها | ۴ ببرها; شیرها | ۵ اسب; فیل | ۶ ماهی‌ها; پرندگان | ۷ گوشت | ۸ مرغ‌ها; گاوها (یا خوک‌ها)"
        },
        {
          en: "6 ............ swim and ............ fly.",
          fa: "…… شنا می‌کنند و …… پرواز می‌کنند.",
          answerEn: "Possible answers: 2 giraffe | 3 Parrots; budgies; hens | 4 Tigers; lions | 5 horse; elephant | 6 Fish; birds | 7 meat | 8 Hens; cows (or pigs)",
          answerFa: "پاسخ‌های ممکن: ۲ زرافه | ۳ طوطی‌ها; طوطی‌های خوشه‌ای; مرغ‌ها | ۴ ببرها; شیرها | ۵ اسب; فیل | ۶ ماهی‌ها; پرندگان | ۷ گوشت | ۸ مرغ‌ها; گاوها (یا خوک‌ها)"
        },
        {
          en: "7 You can buy ............ at a butcher's.",
          fa: "شما می‌توانید …… را از قصابی بخرید.",
          answerEn: "Possible answers: 2 giraffe | 3 Parrots; budgies; hens | 4 Tigers; lions | 5 horse; elephant | 6 Fish; birds | 7 meat | 8 Hens; cows (or pigs)",
          answerFa: "پاسخ‌های ممکن: ۲ زرافه | ۳ طوطی‌ها; طوطی‌های خوشه‌ای; مرغ‌ها | ۴ ببرها; شیرها | ۵ اسب; فیل | ۶ ماهی‌ها; پرندگان | ۷ گوشت | ۸ مرغ‌ها; گاوها (یا خوک‌ها)"
        },
        {
          en: "8 ............ and ............ give us things for breakfast.",
          fa: "…… و …… به ما چیزهایی برای صبحانه می‌دهند.",
          answerEn: "Possible answers: 2 giraffe | 3 Parrots; budgies; hens | 4 Tigers; lions | 5 horse; elephant | 6 Fish; birds | 7 meat | 8 Hens; cows (or pigs)",
          answerFa: "پاسخ‌های ممکن: ۲ زرافه | ۳ طوطی‌ها; طوطی‌های خوشه‌ای; مرغ‌ها | ۴ ببرها; شیرها | ۵ اسب; فیل | ۶ ماهی‌ها; پرندگان | ۷ گوشت | ۸ مرغ‌ها; گاوها (یا خوک‌ها)"
        },
        {
          en: "animal / meat / young — sheep, cow, hen, pig / chicken, pork, beef, lamb / piglet, lamb, calf, chick",
          fa: "حیوان / گوشت / بچه — گوسفند، گاو، مرغ، خوک / مرغ، گوشت خوک، گوشت گاو، بره / بچه‌خوک، بره، گوساله، جوجه",
          answerEn: "sheep – lamb – lamb | cow – beef – calf | hen – chicken – chick | pig – pork – piglet",
          answerFa: "گوسفند – بره – بره | گاو – گوشت گاو – گوساله | مرغ – مرغ – جوجه | خوک – گوشت خوک – خوکچه"
        },
        {
          en: "1 eat meat?",
          fa: "گوشت می‌خورند؟",
          answerEn: "Lions, tigers, monkeys, snakes, dogs and cats eat meat.",
          answerFa: "شیرها، ببرها، میمون‌ها، مارها، سگ‌ها و گربه‌ها گوشت می‌خورند."
        },
        {
          en: "2 give us things that we wear?",
          fa: "چیزهایی به ما می‌دهند که می‌پوشیم؟",
          answerEn: "Cows, sheep, pigs, parrots (for feathers), snakes (for snakeskin). (You may think of some other things, e.g. horsehair for wigs for judges.)",
          answerFa: "گاوها، گوسفندها، خوک‌ها، طوطی‌ها (برای پرها)، مارها (برای پوست مار). (شاید چیزهای دیگری را نیز به یاد بیاورید، مثلاً موی اسب برای پیراهن قضات.)"
        },
        {
          en: "3 produce their babies in eggs?",
          fa: "بچه‌هایشان را در تخم به دنیا می‌آورند؟",
          answerEn: "Hen, tortoise, parrot, budgie, snake, fish.",
          answerFa: "مرغ، لاک‌پشت، طوطی، طوطی خوشه‌ای، مار، ماهی."
        },
        {
          en: "Across: 3 lion, 6 lion, 7 horse, 8 elephant; Down: 1 parrot, 2 monkey, 4 sheep, 5 tiger, 9 hen",
          fa: "افقی: ۳ شیر، ۶ شیر، ۷ اسب، ۸ فیل؛ عمودی: ۱ طوطی، ۲ میمون، ۴ گوسفند، ۵ ببر، ۹ مرغ",
          answerEn: "Across: 3 cats | 6 lion | 7 horse | 8 elephant. Down: 1 parrot | 2 monkey | 4 two sheep | 5 tiger | 9 hen",
          answerFa: "افقی: ۳ گربه‌ها | ۶ شیر | ۷ اسب | ۸ فیل. عمودی: ۱ طوطی | ۲ میمون | ۴ دو گوسفند | ۵ ببر | ۹ مرغ"
        }
      ]
    }
  },
  {
    id: "viu-elem-l41",
    lesson: 41,
    title: "Travelling",
    titleFa: "سفر (قطار، نقشه)",
    source: "VIU Elementary 2nd ed — درس 41 (کتاب ص86-87)",
    paragraphs: [
      {
        en: "Can I have a single/return (ticket) to Barcelona please? (single = Madrid → Barcelona; return = Madrid ⇄ Barcelona)",
        fa: "می‌توانم یک بلیط یک‌طرفه/رفت‌وبرگشت به بارسلونا داشته باشم؟"
      },
      {
        en: "I'd like to book/reserve a seat in advance. (to make sure you have a seat)",
        fa: "می‌خواهم از قبل صندلی رزرو کنم. (تا مطمئن شوی صندلی داری)"
      },
      {
        en: "How much is the (train / bus / taxi / air) fare?",
        fa: "کرایه (قطار/اتوبوس/تاکسی/هواپیما) چقدر است؟"
      },
      {
        en: "Was the journey long? [NOT Was the travel long?]",
        fa: "آیا سفر طولانی بود؟"
      },
      {
        en: "The train arriving at platform 3 is the 16:50 train to Paris.",
        fa: "قطاری که به سکوی ۳ می‌رسد، قطار ساعت ۱۶:۵۰ به پاریس است."
      },
      {
        en: "The Edinburgh train departs/leaves from platform 6.",
        fa: "قطار ادینبرو از سکوی ۶ حرکت می‌کند."
      },
      {
        en: "Is there a buffet/restaurant car on this train?",
        fa: "آیا در این قطار واگن بوفه/رستوران وجود دارد؟"
      },
      {
        en: "Do I have to change trains for Toulouse? (= get off one train and go onto another)",
        fa: "آیا باید برای تولوز قطار را عوض کنم؟"
      },
      {
        en: "You have to check in an hour before the plane takes off (= leaves the ground).",
        fa: "باید یک ساعت قبل از برخاستن هواپیما ثبت‌نام پرواز کنی."
      },
      {
        en: "I went through customs but nobody checked my passport. [NOT controlled my passport]",
        fa: "از گمرک گذشتم اما کسی گذرنامه‌ام را بازرسی نکرد."
      },
      {
        en: "Give your boarding card to the flight stewards when you get on the plane.",
        fa: "کارت پروازت را به مهمانداران پرواز بده وقتی سوار هواپیما می‌شوی."
      },
      {
        en: "Have a good flight.",
        fa: "پرواز خوبی داشته باشی."
      },
      {
        en: "The plane landed in New York at 5.30.",
        fa: "هواپیما ساعت ۵:۳۰ در نیویورک فرود آمد."
      },
      {
        en: "We hired a car for a week. We had to fill it up with petrol.",
        fa: "ما یک ماشین برای یک هفته اجاره کردیم. باید بنزین می‌زدیم."
      },
      {
        en: "Can I give you a lift? I'm going into town.",
        fa: "می‌توانم سوارت کنم؟ من به شهر می‌روم."
      }
    ],
    exercise: {
      instruction: "41.1 Match the words on the left with their definitions on the right. Draw lines. — 41.2 Can you answer these questions about the vocabulary of travel? — 41.3 Here are instructions to get to John's house from the airport. — 41.4 Make cards to test yourself. Write the word on one side of the card and a picture (or a definition or translation) on the other side. Look at the pictures (or definitions or translations). Can you remember the English words? — 41.5 Complete the crossword.",
      instructionFa: "کلمات سمت چپ را با تعاریف سمت راست تطبیق دهید. خط بکشید. — آیا می‌توانید به این سؤالات درباره واژگان سفر پاسخ دهید؟ — این دستورالعمل‌ها برای رسیدن به خانه جان از فرودگاه است. — کارت‌هایی برای آزمودن خودت بساز. کلمه را در یک سمت کارت و تصویر (یا تعریف یا ترجمه) را در سمت دیگر بنویس. به تصاویر (یا تعاریف یا ترجمه‌ها) نگاه کن. آیا می‌توانی کلمات انگلیسی را به خاطر بیاوری؟ — جدول کلمات متقاطع را کامل کنید.",
      items: [
        {
          en: "1 land",
          fa: "فرود آمدن",
          answerEn: "e",
          answerFa: "ه"
        },
        {
          en: "2 fare",
          fa: "کرایه",
          answerEn: "d",
          answerFa: "د"
        },
        {
          en: "3 buffet car",
          fa: "واگن بوفه",
          answerEn: "a",
          answerFa: "a"
        },
        {
          en: "4 ship",
          fa: "کشتی",
          answerEn: "f",
          answerFa: "f"
        },
        {
          en: "5 timetable",
          fa: "جدول زمان‌بندی",
          answerEn: "c",
          answerFa: "c"
        },
        {
          en: "6 platform",
          fa: "سکو",
          answerEn: "g",
          answerFa: "g"
        },
        {
          en: "7 luggage",
          fa: "چمدان",
          answerEn: "b",
          answerFa: "ب"
        },
        {
          en: "1 What is the difference between a single ticket and a return ticket?",
          fa: "تفاوت بین بلیط یک‌طرفه و رفت‌وبرگشت چیست؟",
          answerEn: "A single takes you to a place and a return takes you to that place and back again.",
          answerFa: "بلیت تک‌طرفه شما را به یک مکان می‌برد و بلیت رفت‌وبرگشت شما را به آن مکان و دوباره به اینجا می‌برد."
        },
        {
          en: "2 What does a customs officer do?",
          fa: "مأمور گمرک چه کاری انجام می‌دهد؟",
          answerEn: "He or she checks what people bring into a country.",
          answerFa: "او یا او بررسی می‌کند که مردم چه چیزی را به یک کشور وارد می‌کنند."
        },
        {
          en: "3 Does a plane take off at the end of a journey?",
          fa: "آیا هواپیما در پایان سفر برخاستن می‌کند؟",
          answerEn: "No, it lands at the end of a journey and takes off at the beginning of a journey.",
          answerFa: "خیر، آن در پایان یک سفر فرود می‌آید و در ابتدای یک سفر بلند می‌شود."
        },
        {
          en: "4 What do you do with a boarding card?",
          fa: "با کارت پرواز چه می‌کنید؟",
          answerEn: "You can get on a plane or a boat.",
          answerFa: "شما می‌توانید به یک هواپیما یا یک قایق سوار شوید."
        },
        {
          en: "5 What is the difference between hiring a car and buying a car?",
          fa: "تفاوت بین اجاره کردن ماشین و خریدن ماشین چیست؟",
          answerEn: "If you hire a car you have it for a day or a week. If you buy it it is your car.",
          answerFa: "اگر یک ماشین اجاره کنید، آن را برای یک روز یا یک هفته دارید. اگر آن را بخرید، آن ماشین شماست."
        },
        {
          en: "6 If you ask someone for a lift, do you want to go to the top floor?",
          fa: "اگر از کسی تقاضای سوار شدن کنی، آیا می‌خواهی به طبقه بالا بروی؟",
          answerEn: "No, you want to go somewhere in their car.",
          answerFa: "خیر، شما می‌خواهید در ماشین آن‌ها به جایی بروید."
        },
        {
          en: "When you arrive at the airport, take a number 10 bus to the railway station. Then take a train to Bigtown. The journey takes half an hour and you get off the train at the second stop. Take a taxi from the station to John's house.",
          fa: "وقتی به فرودگاه می‌رسی، اتوبوس شماره ۱۰ را به ایستگاه راه‌آهن بگیر. سپس قطاری به بیگ‌تاون بگیر. سفر نیم ساعت طول می‌کشد و در ایستگاه دوم پیاده شو. از ایستگاه تا خانه جان تاکسی بگیر.",
          answerEn: "Possible answer: At the airport, follow the signs to the railway station. Buy a ticket to Cambridge. There are trains every hour. At Cambridge station take a number 5 bus. The stop is just outside the station. Get off the bus at the hospital, cross the road and take the first road on the left. My house is on the corner of the street with a red door.",
          answerFa: "پاسخ ممکن: در فرودگاه، علائم را به سمت ایستگاه راه‌آهن دنبال کنید. بلیطی به کمبریج بخرید. قطارها هر ساعت یک بار حرکت می‌کنند. در ایستگاه کمبریج، اتوبوس شماره ۵ را سوار شوید. ایستگاه دقیقاً بیرون از ایستگاه است. از اتوبوس در بیمارستان پیاده شوید، از خیابار رد شوید و اولین خیابان سمت چپ را بروید. خانه من در گوشه خیابان با در قرمز قرار دارد."
        },
        {
          en: "Now write instructions for someone to get to your house from the airport.",
          fa: "حالا دستورالعمل‌هایی بنویس تا کسی از فرودگاه به خانه تو برسد.",
          answerEn: "Possible answer: At the airport, follow the signs to the railway station. Buy a ticket to Cambridge. There are trains every hour. At Cambridge station take a number 5 bus. The stop is just outside the station. Get off the bus at the hospital, cross the road and take the first road on the left. My house is on the corner of the street with a red door.",
          answerFa: "پاسخ ممکن: در فرودگاه، علائم را به سمت ایستگاه راه‌آهن دنبال کنید. بلیطی به کمبریج بخرید. قطارها هر ساعت یک بار حرکت می‌کنند. در ایستگاه کمبریج، اتوبوس شماره ۵ را سوار شوید. ایستگاه دقیقاً بیرون از ایستگاه است. از اتوبوس در بیمارستان پیاده شوید، از خیابار رد شوید و اولین خیابان سمت چپ را بروید. خانه من در گوشه خیابان با در قرمز قرار دارد."
        },
        {
          en: "3 (map picture)",
          fa: "نقشه",
          answerEn: "Across: 3 map | 6 helicopter | 7 bus | 8 petrol. Down: 1 timetable | 2 taxi | 3 motorcycle | 4 platform | 5 train",
          answerFa: "به صورت افقی: 3 نقشه | 6 بالگرد | 7 اتوبوس | 8 بنزین. به صورت عمودی: 1 جدول زمانی | 2 تاکسی | 3 موتورسیکلت | 4 سکوی قطار | 5 قطار"
        },
        {
          en: "6 (helicopter picture)",
          fa: "بالگرد",
          answerEn: "Across: 3 map | 6 helicopter | 7 bus | 8 petrol. Down: 1 timetable | 2 taxi | 3 motorcycle | 4 platform | 5 train",
          answerFa: "به صورت افقی: 3 نقشه | 6 بالگرد | 7 اتوبوس | 8 بنزین. به صورت عمودی: 1 جدول زمانی | 2 تاکسی | 3 موتورسیکلت | 4 سکوی قطار | 5 قطار"
        },
        {
          en: "7 (bus picture)",
          fa: "اتوبوس",
          answerEn: "Across: 3 map | 6 helicopter | 7 bus | 8 petrol. Down: 1 timetable | 2 taxi | 3 motorcycle | 4 platform | 5 train",
          answerFa: "به صورت افقی: 3 نقشه | 6 بالگرد | 7 اتوبوس | 8 بنزین. به صورت عمودی: 1 جدول زمانی | 2 تاکسی | 3 موتورسیکلت | 4 سکوی قطار | 5 قطار"
        },
        {
          en: "8 (petrol pump picture)",
          fa: "پمپ بنزین",
          answerEn: "Across: 3 map | 6 helicopter | 7 bus | 8 petrol. Down: 1 timetable | 2 taxi | 3 motorcycle | 4 platform | 5 train",
          answerFa: "به صورت افقی: 3 نقشه | 6 بالگرد | 7 اتوبوس | 8 بنزین. به صورت عمودی: 1 جدول زمانی | 2 تاکسی | 3 موتورسیکلت | 4 سکوی قطار | 5 قطار"
        },
        {
          en: "1 (timetable picture)",
          fa: "جدول زمان‌بندی",
          answerEn: "Across: 3 map | 6 helicopter | 7 bus | 8 petrol. Down: 1 timetable | 2 taxi | 3 motorcycle | 4 platform | 5 train",
          answerFa: "به صورت افقی: 3 نقشه | 6 بالگرد | 7 اتوبوس | 8 بنزین. به صورت عمودی: 1 جدول زمانی | 2 تاکسی | 3 موتورسیکلت | 4 سکوی قطار | 5 قطار"
        },
        {
          en: "2 (taxi picture)",
          fa: "تاکسی",
          answerEn: "Across: 3 map | 6 helicopter | 7 bus | 8 petrol. Down: 1 timetable | 2 taxi | 3 motorcycle | 4 platform | 5 train",
          answerFa: "به صورت افقی: 3 نقشه | 6 بالگرد | 7 اتوبوس | 8 بنزین. به صورت عمودی: 1 جدول زمانی | 2 تاکسی | 3 موتورسیکلت | 4 سکوی قطار | 5 قطار"
        },
        {
          en: "3 (motorbike picture)",
          fa: "موتورسیکلت",
          answerEn: "Across: 3 map | 6 helicopter | 7 bus | 8 petrol. Down: 1 timetable | 2 taxi | 3 motorcycle | 4 platform | 5 train",
          answerFa: "به صورت افقی: 3 نقشه | 6 بالگرد | 7 اتوبوس | 8 بنزین. به صورت عمودی: 1 جدول زمانی | 2 تاکسی | 3 موتورسیکلت | 4 سکوی قطار | 5 قطار"
        },
        {
          en: "4 (train picture)",
          fa: "قطار",
          answerEn: "Across: 3 map | 6 helicopter | 7 bus | 8 petrol. Down: 1 timetable | 2 taxi | 3 motorcycle | 4 platform | 5 train",
          answerFa: "به صورت افقی: 3 نقشه | 6 بالگرد | 7 اتوبوس | 8 بنزین. به صورت عمودی: 1 جدول زمانی | 2 تاکسی | 3 موتورسیکلت | 4 سکوی قطار | 5 قطار"
        },
        {
          en: "5 (train picture)",
          fa: "قطار",
          answerEn: "Across: 3 map | 6 helicopter | 7 bus | 8 petrol. Down: 1 timetable | 2 taxi | 3 motorcycle | 4 platform | 5 train",
          answerFa: "به صورت افقی: 3 نقشه | 6 بالگرد | 7 اتوبوس | 8 بنزین. به صورت عمودی: 1 جدول زمانی | 2 تاکسی | 3 موتورسیکلت | 4 سکوی قطار | 5 قطار"
        }
      ]
    }
  },
  {
    id: "viu-elem-l42",
    lesson: 42,
    title: "Notices",
    titleFa: "اعلان‌ها (کشیدن سیگار ممنوع، خراب است)",
    source: "VIU Elementary 2nd ed — درس 42 (کتاب ص88-89)",
    paragraphs: [
      {
        en: "No smoking here.",
        fa: "اینجا سیگار کشیدن ممنوع است."
      },
      {
        en: "You go out here.",
        fa: "از اینجا خارج می‌شوید."
      },
      {
        en: "You go in here.",
        fa: "از اینجا وارد می‌شوید."
      },
      {
        en: "There are lots of different signs for public toilets.",
        fa: "علائم مختلف زیادی برای دستشویی‌های عمومی وجود دارد."
      },
      {
        en: "Tip: Look for other signs in English. Write down any that you see.",
        fa: "نکته: به دنبال علائم دیگری به زبان انگلیسی بگردید و هر کدام را که دیدید یادداشت کنید."
      }
    ],
    exercise: {
      instruction: "42.2 Look at each of the notices on the opposite page. Write down a place where you can see each of them. — 42.3 Look at the pictures and answer the questions. — 42.4 Notices often give you information (for example, that a shop is closed) or give you instructions (for example, that smoking is forbidden). Put the notices on the opposite page into two columns - Information and Instructions. — 42.5 Where can you find examples of signs in English in your country?",
      instructionFa: "به هر یک از علائم صفحهٔ مقابل نگاه کنید و مکانی را بنویسید که می‌توانید هر کدام را آنجا ببینید. — به تصویرها نگاه کنید و به سؤال‌ها پاسخ دهید. — علائم اغلب به شما اطلاعات می‌دهند (مثلاً اینکه مغازه بسته است) یا دستور می‌دهند (مثلاً اینکه سیگار کشیدن ممنوع است). علائم صفحهٔ مقابل را در دو ستون «اطلاعات» و «دستورها» قرار دهید. — در کشور شما کجا می‌توانید نمونه‌هایی از علائم به زبان انگلیسی پیدا کنید؟",
      items: [
        {
          en: "No smoking - in a restaurant.",
          fa: "سیگار ممنوع - در رستوران.",
          answerEn: "Possible answers: Entrance and Way In – cinema, museum, etc. | Exit and Way Out – airport, cinema, etc. | Push and Pull – on doors in public places e.g. shops, railway station, museum | Please ring for attention – at a hotel reception | Open and Closed – on the door of a shop or museum | Sale – on a shop window | Please pay here – in a shop | Queue this side – at a cinema | Please do not walk on the grass – in the garden of a palace, in some parks | Out of order – on a public phone, on a drinks machine, etc. | Toilets – in a restaurant | WC – in a hotel | Women and Men – in a café",
          answerFa: "پاسخ‌های ممکن: ورود و راه ورود – سینما، موزه و غیره | خروج و راه خروج – فرودگاه، سینما و غیره | فشار و کشیدن – روی درهای مکان‌های عمومی مانند فروشگاه‌ها، ایستگاه راه‌آهن، موزه | لطفاً زنگ بزنید برای توجه – در پذیرش هتل | باز و بسته – روی در یک فروشگاه یا موزه | فروش – روی پنجره یک فروشگاه | لطفاً اینجا پرداخت کنید – در یک فروشگاه | صف از این طرف – در یک سینما | لطفاً روی چمن راه نروید – در باغ یک کاخ، در برخی پارک‌ها | از کار افتاده – روی تلفن عمومی، روی دستگاه نوشابه‌فروش و غیره | توالت – در یک رستوران | دستشویی – در یک هتل | زن و مرد – در یک کافه"
        },
        {
          en: "Can you go in now? No",
          fa: "آیا می‌توانید الان وارد شوید؟ نه",
          answerEn: "2 No | 3 No | 4 a | 5 b | 6 Yes",
          answerFa: "2 خیر | 3 خیر | 4 الف | 5 ب | 6 بله"
        },
        {
          en: "Can you use the telephone now?",
          fa: "آیا می‌توانید الان از تلفن استفاده کنید؟",
          answerEn: "2 No | 3 No | 4 a | 5 b | 6 Yes",
          answerFa: "2 خیر | 3 خیر | 4 الف | 5 ب | 6 بله"
        },
        {
          en: "Can you park your car here?",
          fa: "آیا می‌توانید ماشین خود را اینجا پارک کنید؟",
          answerEn: "2 No | 3 No | 4 a | 5 b | 6 Yes",
          answerFa: "2 خیر | 3 خیر | 4 الف | 5 ب | 6 بله"
        },
        {
          en: "How do you open the door - a or b?",
          fa: "چگونه در را باز می‌کنید - a یا b؟",
          answerEn: "2 No | 3 No | 4 a | 5 b | 6 Yes",
          answerFa: "2 خیر | 3 خیر | 4 الف | 5 ب | 6 بله"
        },
        {
          en: "How do you open the door - a or b?",
          fa: "چگونه در را باز می‌کنید - a یا b؟",
          answerEn: "2 No | 3 No | 4 a | 5 b | 6 Yes",
          answerFa: "2 خیر | 3 خیر | 4 الف | 5 ب | 6 بله"
        },
        {
          en: "You haven't got much money. Is this a good time to go shopping?",
          fa: "پول زیادی ندارید. آیا این وقت خوبی برای خرید کردن است؟",
          answerEn: "2 No | 3 No | 4 a | 5 b | 6 Yes",
          answerFa: "2 خیر | 3 خیر | 4 الف | 5 ب | 6 بله"
        }
      ]
    }
  },
  {
    id: "viu-elem-l43",
    lesson: 43,
    title: "Food and drink",
    titleFa: "خوردنی و نوشیدنی (برنج، چای)",
    source: "VIU Elementary 2nd ed — درس 43 (کتاب ص90-91)",
    paragraphs: [
      {
        en: "Do you want some bread? [NOT Do you want a bread?]",
        fa: "کمی نان می‌خواهی؟ (نه: Do you want a bread?)"
      },
      {
        en: "In China, most people eat rice.",
        fa: "در چین بیشتر مردم برنج می‌خورند."
      },
      {
        en: "In Italy, pasta is very popular.",
        fa: "در ایتالیا پاستا بسیار محبوب است."
      },
      {
        en: "Many people eat meat or fish almost every day.",
        fa: "بسیاری از مردم تقریباً هر روز گوشت یا ماهی می‌خورند."
      },
      {
        en: "Most young people love hot-dogs, hamburgers and pizzas.",
        fa: "بیشتر جوانان عاشق هات‌داگ، همبرگر و پیتزا هستند."
      },
      {
        en: "Most British people like fish and chips.",
        fa: "بیشتر انگلیسی‌ها ماهی و سیب‌زمینی سرخ‌کرده دوست دارند."
      },
      {
        en: "Vegetables are good for you. Fruit is also good for you. (singular) [NOT fruits]",
        fa: "سبزیجات برای شما مفیدند. میوه هم مفید است. (مفرد) [نه: fruits]"
      }
    ],
    exercise: {
      instruction: "43.1 Complete the sentences. Use words from A and B opposite. — 43.2 Put these words into two lists: fruit and vegetables, as in the example. — 43.4 Here are the names of some drinks with the letters mixed up. What are they? — 43.5 What are your four favourite foods? And your three favourite drinks? Are they good for you? Use a dictionary if the names are not in this unit.",
      instructionFa: "جملات را کامل کنید. از واژه‌های بخش‌های A و B صفحهٔ مقابل استفاده کنید. — این واژه‌ها را مانند مثال در دو فهرست قرار دهید: میوه و سبزیجات. — نام برخی نوشیدنی‌ها با حروف به‌هم‌ریخته آمده است. آنها چیستند؟ — چهار غذای محبوب شما چیست؟ و سه نوشیدنی محبوب شما؟ آیا برایتان مفیدند؟ اگر نام‌ها در این درس نیست، از فرهنگ لغت استفاده کنید.",
      items: [
        {
          en: "1 Rice is the most important food in Japan.",
          fa: "برنج مهم‌ترین غذای ژاپن است.",
          answerEn: "2 Fish ... chips | 3 potatoes | 4 pasta/pizzas | 5 meat | 6 a hot-dog",
          answerFa: "2 ماهی ... سیب‌زمینی سرخ کرده | 3 سیب‌زمینی | 4 پاستا/پیتزا | 5 گوشت | 6 هات‌داگ"
        },
        {
          en: "2 ________________ and ________________ are very popular in Britain.",
          fa: "________ و ________ در بریتانیا بسیار محبوب هستند.",
          answerEn: "2 Fish ... chips | 3 potatoes | 4 pasta/pizzas | 5 meat | 6 a hot-dog",
          answerFa: "2 ماهی ... سیب‌زمینی سرخ کرده | 3 سیب‌زمینی | 4 پاستا/پیتزا | 5 گوشت | 6 هات‌داگ"
        },
        {
          en: "3 Chips are made from ________________.",
          fa: "سیب‌زمینی سرخ‌کرده از ________ درست می‌شود.",
          answerEn: "2 Fish ... chips | 3 potatoes | 4 pasta/pizzas | 5 meat | 6 a hot-dog",
          answerFa: "2 ماهی ... سیب‌زمینی سرخ کرده | 3 سیب‌زمینی | 4 پاستا/پیتزا | 5 گوشت | 6 هات‌داگ"
        },
        {
          en: "4 Most Italian people love ________________.",
          fa: "بیشتر ایتالیایی‌ها ________ را دوست دارند.",
          answerEn: "2 Fish ... chips | 3 potatoes | 4 pasta/pizzas | 5 meat | 6 a hot-dog",
          answerFa: "2 ماهی ... سیب‌زمینی سرخ کرده | 3 سیب‌زمینی | 4 پاستا/پیتزا | 5 گوشت | 6 هات‌داگ"
        },
        {
          en: "5 Hamburgers are made from ________________.",
          fa: "همبرگر از ________ درست می‌شود.",
          answerEn: "2 Fish ... chips | 3 potatoes | 4 pasta/pizzas | 5 meat | 6 a hot-dog",
          answerFa: "2 ماهی ... سیب‌زمینی سرخ کرده | 3 سیب‌زمینی | 4 پاستا/پیتزا | 5 گوشت | 6 هات‌داگ"
        },
        {
          en: "6 A ________________ is a sausage inside a piece of bread.",
          fa: "________ یک سوسیس داخل تکه‌ای نان است.",
          answerEn: "2 Fish ... chips | 3 potatoes | 4 pasta/pizzas | 5 meat | 6 a hot-dog",
          answerFa: "2 ماهی ... سیب‌زمینی سرخ کرده | 3 سیب‌زمینی | 4 پاستا/پیتزا | 5 گوشت | 6 هات‌داگ"
        },
        {
          en: "fruit / vegetables (example: beans)",
          fa: "میوه / سبزیجات (مثال: beans)",
          answerEn: "fruit: pineapple, grapes, apple, pear. vegetables: beans, onions, carrot, garlic, mushrooms",
          answerFa: "میوه: آنanas، انگور، سیب، گلابی. سبزیجات: لوبیا، پیاز، هویج، سیر، قارچ"
        },
        {
          en: "1 eta (tea)",
          fa: "1 eta (چای)",
          answerEn: "2 beer | 3 milk | 4 coffee | 5 fruit juice | 6 mineral water",
          answerFa: "2 آبجو | 3 شیر | 4 قهوه | 5 آبمیوه | 6 آب معدنی"
        },
        {
          en: "2 rebe",
          fa: "2 rebe",
          answerEn: "2 beer | 3 milk | 4 coffee | 5 fruit juice | 6 mineral water",
          answerFa: "2 آبجو | 3 شیر | 4 قهوه | 5 آبمیوه | 6 آب معدنی"
        },
        {
          en: "3 klim",
          fa: "3 klim",
          answerEn: "2 beer | 3 milk | 4 coffee | 5 fruit juice | 6 mineral water",
          answerFa: "2 آبجو | 3 شیر | 4 قهوه | 5 آبمیوه | 6 آب معدنی"
        },
        {
          en: "4 fecofe",
          fa: "4 fecofe",
          answerEn: "2 beer | 3 milk | 4 coffee | 5 fruit juice | 6 mineral water",
          answerFa: "2 آبجو | 3 شیر | 4 قهوه | 5 آبمیوه | 6 آب معدنی"
        },
        {
          en: "5 rituf eciju",
          fa: "5 rituf eciju",
          answerEn: "2 beer | 3 milk | 4 coffee | 5 fruit juice | 6 mineral water",
          answerFa: "2 آبجو | 3 شیر | 4 قهوه | 5 آبمیوه | 6 آب معدنی"
        },
        {
          en: "6 nilemar retaw",
          fa: "6 nilemar retaw",
          answerEn: "2 beer | 3 milk | 4 coffee | 5 fruit juice | 6 mineral water",
          answerFa: "2 آبجو | 3 شیر | 4 قهوه | 5 آبمیوه | 6 آب معدنی"
        }
      ]
    }
  },
  {
    id: "viu-elem-l44",
    lesson: 44,
    title: "In the kitchen",
    titleFa: "در آشپزخانه (یخچال، لیوان)",
    source: "VIU Elementary 2nd ed — درس 44 (کتاب ص92-93)",
    paragraphs: [
      {
        en: "Where can I find a mug / cloth / some kitchen paper?",
        fa: "کجا می‌توانم یک ماگ / دستمال / کمی دستمال کاغذی پیدا کنم؟"
      },
      {
        en: "Can I help with the washing-up / the cooking?",
        fa: "می‌توانم در ظرف شستن / آشپزی کمک کنم؟"
      },
      {
        en: "Where does this cup / plate / frying pan go? (where do you keep it?)",
        fa: "این فنجان / بشقاب / تابه کجا می‌رود؟ (کجا نگهش می‌دارید؟)"
      },
      {
        en: "Where shall I put this cup / the milk?",
        fa: "این فنجان / شیر را کجا بگذارم؟"
      }
    ],
    exercise: {
      instruction: "44.1 Tick (✓) yes or no. — 44.3 What do you need? — 44.4 Look at the pictures. Answer the questions.",
      instructionFa: "بله یا خیر را تیک بزنید. — به چه نیاز داری؟ — به تصویرها نگاه کنید. به سؤال‌ها پاسخ دهید.",
      items: [
        {
          en: "I use a frying pan to drink out of.",
          fa: "من از تابه برای نوشیدن استفاده می‌کنم.",
          answerEn: "2 yes | 3 yes | 4 no, the freezer is colder than the fridge. | 5 yes | 6 no, a tea towel makes them dry.",
          answerFa: "2 بله | 3 بله | 4 خیر، فریزر سردتر از یخچال است. | 5 بله | 6 خیر، حوله ظرف‌ها را خشک می‌کند."
        },
        {
          en: "Washing-up liquid makes the dishes clean.",
          fa: "مایع ظرفشویی ظرف‌ها را تمیز می‌کند.",
          answerEn: "2 yes | 3 yes | 4 no, the freezer is colder than the fridge. | 5 yes | 6 no, a tea towel makes them dry.",
          answerFa: "2 بله | 3 بله | 4 خیر، فریزر سردتر از یخچال است. | 5 بله | 6 خیر، حوله ظرف‌ها را خشک می‌کند."
        },
        {
          en: "The fridge is cold inside.",
          fa: "داخل یخچال سرد است.",
          answerEn: "2 yes | 3 yes | 4 no, the freezer is colder than the fridge. | 5 yes | 6 no, a tea towel makes them dry.",
          answerFa: "2 بله | 3 بله | 4 خیر، فریزر سردتر از یخچال است. | 5 بله | 6 خیر، حوله ظرف‌ها را خشک می‌کند."
        },
        {
          en: "The freezer is not as cold as the fridge.",
          fa: "فریزر به اندازهٔ یخچال سرد نیست.",
          answerEn: "2 yes | 3 yes | 4 no, the freezer is colder than the fridge. | 5 yes | 6 no, a tea towel makes them dry.",
          answerFa: "2 بله | 3 بله | 4 خیر، فریزر سردتر از یخچال است. | 5 بله | 6 خیر، حوله ظرف‌ها را خشک می‌کند."
        },
        {
          en: "I turn on the tap to get water.",
          fa: "برای گرفتن آب شیر را باز می‌کنم.",
          answerEn: "2 yes | 3 yes | 4 no, the freezer is colder than the fridge. | 5 yes | 6 no, a tea towel makes them dry.",
          answerFa: "2 بله | 3 بله | 4 خیر، فریزر سردتر از یخچال است. | 5 بله | 6 خیر، حوله ظرف‌ها را خشک می‌کند."
        },
        {
          en: "A tea towel is for making plates wet.",
          fa: "دستمال آشپزخانه برای خیس کردن بشقاب‌هاست.",
          answerEn: "2 yes | 3 yes | 4 no, the freezer is colder than the fridge. | 5 yes | 6 no, a tea towel makes them dry.",
          answerFa: "2 بله | 3 بله | 4 خیر، فریزر سردتر از یخچال است. | 5 بله | 6 خیر، حوله ظرف‌ها را خشک می‌کند."
        },
        {
          en: "To make coffee I need ________",
          fa: "برای درست کردن قهوه نیاز دارم به ________",
          answerEn: "Possible answers: 2 tea, a cup, a teapot, a spoon, maybe milk and sugar. | 3 a frying pan, oil, a cooker. | 4 a plate, a knife and fork, or a spoon and fork, or chopsticks. | 5 water and a glass or a cup or a mug. | 6 a microwave.",
          answerFa: "پاسخ‌های ممکن: 2 چای، یک فنجان، یک قوری چای، یک قاشق، شاید شیر و شکر. | 3 یک تابه، روغن، یک اجاق پخت. | 4 یک بشقاب، یک چنگال و چاقو، یا یک قاشق و چنگال، یا چوب‌برگ. | 5 آب و یک لیوان یا یک فنجان یا یک فنجان بزرگ. | 6 یک مایکروویو."
        },
        {
          en: "To make tea I need ________",
          fa: "برای درست کردن چای نیاز دارم به ________",
          answerEn: "Possible answers: 2 tea, a cup, a teapot, a spoon, maybe milk and sugar. | 3 a frying pan, oil, a cooker. | 4 a plate, a knife and fork, or a spoon and fork, or chopsticks. | 5 water and a glass or a cup or a mug. | 6 a microwave.",
          answerFa: "پاسخ‌های ممکن: 2 چای، یک فنجان، یک قوری چای، یک قاشق، شاید شیر و شکر. | 3 یک تابه، روغن، یک اجاق پخت. | 4 یک بشقاب، یک چنگال و چاقو، یا یک قاشق و چنگال، یا چوب‌برگ. | 5 آب و یک لیوان یا یک فنجان یا یک فنجان بزرگ. | 6 یک مایکروویو."
        },
        {
          en: "To fry an egg I need ________",
          fa: "برای سرخ کردن تخم‌مرغ نیاز دارم به ________",
          answerEn: "Possible answers: 2 tea, a cup, a teapot, a spoon, maybe milk and sugar. | 3 a frying pan, oil, a cooker. | 4 a plate, a knife and fork, or a spoon and fork, or chopsticks. | 5 water and a glass or a cup or a mug. | 6 a microwave.",
          answerFa: "پاسخ‌های ممکن: 2 چای، یک فنجان، یک قوری چای، یک قاشق، شاید شیر و شکر. | 3 یک تابه، روغن، یک اجاق پخت. | 4 یک بشقاب، یک چنگال و چاقو، یا یک قاشق و چنگال، یا چوب‌برگ. | 5 آب و یک لیوان یا یک فنجان یا یک فنجان بزرگ. | 6 یک مایکروویو."
        },
        {
          en: "To eat my food I need ________",
          fa: "برای خوردن غذا نیاز دارم به ________",
          answerEn: "Possible answers: 2 tea, a cup, a teapot, a spoon, maybe milk and sugar. | 3 a frying pan, oil, a cooker. | 4 a plate, a knife and fork, or a spoon and fork, or chopsticks. | 5 water and a glass or a cup or a mug. | 6 a microwave.",
          answerFa: "پاسخ‌های ممکن: 2 چای، یک فنجان، یک قوری چای، یک قاشق، شاید شیر و شکر. | 3 یک تابه، روغن، یک اجاق پخت. | 4 یک بشقاب، یک چنگال و چاقو، یا یک قاشق و چنگال، یا چوب‌برگ. | 5 آب و یک لیوان یا یک فنجان یا یک فنجان بزرگ. | 6 یک مایکروویو."
        },
        {
          en: "To drink some water I need ________",
          fa: "برای نوشیدن آب نیاز دارم به ________",
          answerEn: "Possible answers: 2 tea, a cup, a teapot, a spoon, maybe milk and sugar. | 3 a frying pan, oil, a cooker. | 4 a plate, a knife and fork, or a spoon and fork, or chopsticks. | 5 water and a glass or a cup or a mug. | 6 a microwave.",
          answerFa: "پاسخ‌های ممکن: 2 چای، یک فنجان، یک قوری چای، یک قاشق، شاید شیر و شکر. | 3 یک تابه، روغن، یک اجاق پخت. | 4 یک بشقاب، یک چنگال و چاقو، یا یک قاشق و چنگال، یا چوب‌برگ. | 5 آب و یک لیوان یا یک فنجان یا یک فنجان بزرگ. | 6 یک مایکروویو."
        },
        {
          en: "To make my dinner in just two minutes I need ________",
          fa: "برای درست کردن شام فقط در دو دقیقه نیاز دارم به ________",
          answerEn: "Possible answers: 2 tea, a cup, a teapot, a spoon, maybe milk and sugar. | 3 a frying pan, oil, a cooker. | 4 a plate, a knife and fork, or a spoon and fork, or chopsticks. | 5 water and a glass or a cup or a mug. | 6 a microwave.",
          answerFa: "پاسخ‌های ممکن: 2 چای، یک فنجان، یک قوری چای، یک قاشق، شاید شیر و شکر. | 3 یک تابه، روغن، یک اجاق پخت. | 4 یک بشقاب، یک چنگال و چاقو، یا یک قاشق و چنگال، یا چوب‌برگ. | 5 آب و یک لیوان یا یک فنجان یا یک فنجان بزرگ. | 6 یک مایکروویو."
        },
        {
          en: "What's near the cooker?",
          fa: "چه چیزی کنار اجاق است؟",
          answerEn: "a microwave",
          answerFa: "مایکروویو"
        },
        {
          en: "What's on the cooker?",
          fa: "چه چیزی روی اجاق است؟",
          answerEn: "a saucepan",
          answerFa: "قابلمه"
        },
        {
          en: "What's on the shelf?",
          fa: "چه چیزی روی قفسه است؟",
          answerEn: "a frying pan and a glass",
          answerFa: "تابه و لیوان"
        },
        {
          en: "What's in the cupboard?",
          fa: "چه چیزی داخل کابینت است؟",
          answerEn: "a teapot",
          answerFa: "یک قوری چای"
        }
      ]
    }
  },
  {
    id: "viu-elem-l45",
    lesson: 45,
    title: "In the bedroom and bathroom",
    titleFa: "در اتاق‌خواب و حمام (کمد لباس، شامپو)",
    source: "VIU Elementary 2nd ed — درس 45 (کتاب ص94-95)",
    paragraphs: [
      {
        en: "Joel goes to bed at 11 o'clock. He goes upstairs to his bedroom.",
        fa: "جويل ساعت ۱۱ به رختخواب می‌رود. او به طبقهٔ بالا و اتاق خوابش می‌رود."
      },
      {
        en: "He gets undressed and goes to bed.",
        fa: "او لباس‌هایش را درمی‌آورد و به رختخواب می‌رود."
      },
      {
        en: "He reads for a bit. He turns off the light and falls asleep.",
        fa: "او کمی مطالعه می‌کند. چراغ را خاموش می‌کند و به خواب می‌رود."
      },
      {
        en: "He wakes up when his alarm clock rings.",
        fa: "وقتی ساعت زنگ‌دارش زنگ می‌زند، بیدار می‌شود."
      },
      {
        en: "He gets up. He has a shower, cleans his teeth and gets dressed.",
        fa: "او از رختخواب بلند می‌شود. دوش می‌گیرد، مسواک می‌زند و لباس می‌پوشد."
      },
      {
        en: "He goes downstairs to the kitchen for breakfast.",
        fa: "او به طبقهٔ پایین و آشپزخانه می‌رود تا صبحانه بخورد."
      }
    ],
    exercise: {
      instruction: "45.1 Look at the picture and write the words next to the numbers. — 45.2 Write down five more things that you need to take with you if you go to stay with a friend for one night. — 45.3 Look at the pictures. Describe what the people are doing. — 45.4 Write down the words for all the things you have in your bathroom. Use a dictionary to help you, if you need to. — 45.5 Describe your bedroom. Write four or five sentences. — 45.6 Write about your night-time routine. Use the verbs in C opposite.",
      instructionFa: "به تصویر نگاه کن و کلمات را کنار اعداد بنویس. — پنج چیز دیگر بنویس که اگر یک شب نزد دوستی بروی، لازم است همراهت ببری. — به تصاویر نگاه کن. توصیف کن این افراد چه کاری انجام می‌دهند. — کلمات مربوط به تمام چیزهایی که در حمام خود داری را بنویس. در صورت لزوم از فرهنگ لغت کمک بگیر. — اتاق خواب خود را توصیف کن. چهار یا پنج جمله بنویس. — دربارهٔ برنامهٔ شبانهٔ خود بنویس. از افعال بخش C صفحهٔ مقابل استفاده کن.",
      items: [
        {
          en: "1 bed",
          fa: "۱ تخت",
          answerEn: "bed",
          answerFa: "تختخواب"
        },
        {
          en: "2 ________",
          fa: "۲ ________",
          answerEn: "wardrobe",
          answerFa: "کمد"
        },
        {
          en: "3 ________",
          fa: "۳ ________",
          answerEn: "chest of drawers",
          answerFa: "کمد لباس"
        },
        {
          en: "4 ________",
          fa: "۴ ________",
          answerEn: "bedside table",
          answerFa: "عسلی کنار تخت"
        },
        {
          en: "5 ________",
          fa: "۵ ________",
          answerEn: "alarm clock",
          answerFa: "زنگ هشدار"
        },
        {
          en: "6 ________",
          fa: "۶ ________",
          answerEn: "bedside lamp",
          answerFa: "لامپ کنار تخت"
        },
        {
          en: "7 ________",
          fa: "۷ ________",
          answerEn: "brush",
          answerFa: "برس"
        },
        {
          en: "8 ________",
          fa: "۸ ________",
          answerEn: "mirror",
          answerFa: "آینه"
        },
        {
          en: "9 ________",
          fa: "۹ ________",
          answerEn: "comb",
          answerFa: "شانه"
        },
        {
          en: "toothbrush",
          fa: "مسواک (نمونهٔ داده‌شده)",
          answerEn: "Possible answers: toothpaste, brush, comb, pyjamas, soap.",
          answerFa: "پاسخ‌های ممکن: خمیردندان، مسواک، شانه، پیراهن خواب، صابون."
        },
        {
          en: "________",
          fa: "________",
          answerEn: "Possible answers: toothpaste, brush, comb, pyjamas, soap.",
          answerFa: "پاسخ‌های ممکن: خمیردندان، مسواک، شانه، پیراهن خواب، صابون."
        },
        {
          en: "________",
          fa: "________",
          answerEn: "Possible answers: toothpaste, brush, comb, pyjamas, soap.",
          answerFa: "پاسخ‌های ممکن: خمیردندان، مسواک، شانه، پیراهن خواب، صابون."
        },
        {
          en: "________",
          fa: "________",
          answerEn: "Possible answers: toothpaste, brush, comb, pyjamas, soap.",
          answerFa: "پاسخ‌های ممکن: خمیردندان، مسواک، شانه، پیراهن خواب، صابون."
        },
        {
          en: "________",
          fa: "________",
          answerEn: "Possible answers: toothpaste, brush, comb, pyjamas, soap.",
          answerFa: "پاسخ‌های ممکن: خمیردندان، مسواک، شانه، پیراهن خواب، صابون."
        },
        {
          en: "________",
          fa: "________",
          answerEn: "Possible answers: toothpaste, brush, comb, pyjamas, soap.",
          answerFa: "پاسخ‌های ممکن: خمیردندان، مسواک، شانه، پیراهن خواب، صابون."
        },
        {
          en: "1 Anne is cleaning her teeth.",
          fa: "۱ آنن در حال مسواک زدن است.",
          answerEn: "2 Selim and Umit are washing their faces. | 3 Mrs Park is going downstairs. | 4 Mr Park is having a bath. | 5 Jaime is getting dressed. | 6 Lee is turning off the light.",
          answerFa: "2 سلیم و امیت در حال شستن صورتهای خود هستند. | 3 خانم پارک در حال پایین رفتن از پله است. | 4 آقای پارک در حال استحمام کردن است. | 5 خیمه در حال لباس پوشیدن است. | 6 لی در حال خاموش کردن نور است."
        },
        {
          en: "2 Selim and Umit ________",
          fa: "۲ سلیم و اومیت ________",
          answerEn: "2 Selim and Umit are washing their faces. | 3 Mrs Park is going downstairs. | 4 Mr Park is having a bath. | 5 Jaime is getting dressed. | 6 Lee is turning off the light.",
          answerFa: "2 سلیم و امیت در حال شستن صورتهای خود هستند. | 3 خانم پارک در حال پایین رفتن از پله است. | 4 آقای پارک در حال استحمام کردن است. | 5 خیمه در حال لباس پوشیدن است. | 6 لی در حال خاموش کردن نور است."
        },
        {
          en: "3 Mrs Park ________",
          fa: "۳ خانم پارک ________",
          answerEn: "2 Selim and Umit are washing their faces. | 3 Mrs Park is going downstairs. | 4 Mr Park is having a bath. | 5 Jaime is getting dressed. | 6 Lee is turning off the light.",
          answerFa: "2 سلیم و امیت در حال شستن صورتهای خود هستند. | 3 خانم پارک در حال پایین رفتن از پله است. | 4 آقای پارک در حال استحمام کردن است. | 5 خیمه در حال لباس پوشیدن است. | 6 لی در حال خاموش کردن نور است."
        },
        {
          en: "4 Mr Park ________",
          fa: "۴ آقای پارک ________",
          answerEn: "2 Selim and Umit are washing their faces. | 3 Mrs Park is going downstairs. | 4 Mr Park is having a bath. | 5 Jaime is getting dressed. | 6 Lee is turning off the light.",
          answerFa: "2 سلیم و امیت در حال شستن صورتهای خود هستند. | 3 خانم پارک در حال پایین رفتن از پله است. | 4 آقای پارک در حال استحمام کردن است. | 5 خیمه در حال لباس پوشیدن است. | 6 لی در حال خاموش کردن نور است."
        },
        {
          en: "5 Jaime ________",
          fa: "۵ خایمه ________",
          answerEn: "2 Selim and Umit are washing their faces. | 3 Mrs Park is going downstairs. | 4 Mr Park is having a bath. | 5 Jaime is getting dressed. | 6 Lee is turning off the light.",
          answerFa: "2 سلیم و امیت در حال شستن صورتهای خود هستند. | 3 خانم پارک در حال پایین رفتن از پله است. | 4 آقای پارک در حال استحمام کردن است. | 5 خیمه در حال لباس پوشیدن است. | 6 لی در حال خاموش کردن نور است."
        },
        {
          en: "6 Lee ________",
          fa: "۶ لی ________",
          answerEn: "2 Selim and Umit are washing their faces. | 3 Mrs Park is going downstairs. | 4 Mr Park is having a bath. | 5 Jaime is getting dressed. | 6 Lee is turning off the light.",
          answerFa: "2 سلیم و امیت در حال شستن صورتهای خود هستند. | 3 خانم پارک در حال پایین رفتن از پله است. | 4 آقای پارک در حال استحمام کردن است. | 5 خیمه در حال لباس پوشیدن است. | 6 لی در حال خاموش کردن نور است."
        },
        {
          en: "I usually go to bed at ...",
          fa: "من معمولاً ساعت ... به رختخواب می‌روم.",
          answerEn: "Possible answer: I usually go to bed at 10.30. I go upstairs to my bedroom. I get undressed and have a bath. I am usually tired but I always read a bit. I turn off my light after ten minutes. I fall asleep quickly. I wake up before my alarm clock rings. I get up when my alarm clock rings. I wash my face, clean my teeth and get dressed. I go downstairs to the kitchen for breakfast.",
          answerFa: "پاسخ ممکن: من معمولاً ساعت ۱۰:۳۰ شب به رختخواب می‌روم. من به طبقه بالای اتاق خوابم می‌روم. لباس‌هایم را درمی‌آورم و استحمام می‌کنم. من معمولاً خسته هستم اما همیشه کمی می‌خوانم. من بعد از ده دقیقه نورم را خاموش می‌کنم. من سریعاً به خواب می‌روم. من قبل از اینکه ساعت زنگ‌دارم به صدا دربیاید بیدار می‌شوم. من وقتی ساعت زنگ‌دارم به صدا درمی‌آید از خواب بلند می‌شوم. صورتم را می‌شویم، دندان‌هایم را تمیز می‌کنم و لباس می‌پوشم. من به طبقه پایین آشپزخانه برای صبحانه می‌روم."
        }
      ]
    }
  }
];
