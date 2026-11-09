// متن ارائهٔ درس‌های VIU Elementary (پارتیت 1) + تمرین‌های غیرقابل‌تبدیل با پاسخ عین Answer key
// fa همهٔ پاراگراف‌ها = ترجمهٔ ماشینی GLM (کلاس FA-NEW) — هیچ متن فارسی چاپی در کتاب وجود ندارد
import type { Reading } from "../types";

export const READINGS_PART_1: Reading[] = [
  {
    id: "viu-elem-l1",
    lesson: 1,
    title: "Talking about language",
    titleFa: "گفت‌وگو دربارهٔ زبان (اسم، فعل، جمع و…)",
    source: "VIU Elementary 2nd ed — درس 1 (کتاب ص6-7)",
    paragraphs: [
      {
        en: "1 Match the words on the left with the words on the right. Draw lines. orange — ice-cream, chocolate — juice",
        fa: "کلمات سمت چپ را با کلمات سمت راست مطابقت دهید. خط بکشید. پرتقال — بستنی، شکلات — آبمیوه"
      },
      {
        en: "2 Fill the gaps in the sentence. Jack is ...at... home today.",
        fa: "جای خالی‌های جمله را پر کنید. جک امروز ...در... خانه است."
      },
      {
        en: "3 Correct the mistakes in the sentences. Jack is in home today. Jack is at home today.",
        fa: "اشتباهات جمله‌ها را تصحیح کنید. جک امروز در خانه است."
      },
      {
        en: "4 Complete the sentence for yourself. I go to work by ....bus.....",
        fa: "جمله را برای خودتان کامل کنید. من با ...اتوبوس... به سر کار می‌روم."
      },
      {
        en: "5 Add another example. cat, dog, horse ....cow....",
        fa: "یک مثال دیگر اضافه کنید. گربه، سگ، اسب ....گاو...."
      }
    ],
    exercise: {
      instruction: "1.1 Write the grammar words in A opposite in your own language. — 1.2 Look at B opposite. Write the exercise instructions in your own language. — 1.3 Write these words in the correct column. — 1.4 Think of four examples of prepositions. — 1.5 Are these phrases, sentences or questions? — 1.6 Answer these questions. — 1.7 Follow these instructions.",
      instructionFa: "کلمات گرامری بخش A مقابل را به زبان خودتان بنویسید. — به بخش B مقابل نگاه کنید. دستورالعمل‌های تمرین را به زبان خودتان بنویسید. — این کلمات را در ستون درست بنویسید. — چهار مثال از حروف اضافه به ذهن بیاورید. — آیا این‌ها عبارت هستند، جمله یا سؤال؟ — به این سؤال‌ها پاسخ دهید. — این دستورالعمل‌ها را دنبال کنید.",
      items: [
        {
          en: "noun / verb / adjective (book)",
          fa: "اسم / فعل / صفت (کتاب)",
          answerEn: "noun: book house word man | verb: speak have write say | adjective: good new right blue",
          answerFa: "اسم: کتاب، خانه، کلمه، مرد | فعل: صحبت کردن، داشتن، نوشتن، گفتن | صفت: خوب، جدید، راست، آبی"
        },
        {
          en: "1 in the park",
          fa: "در پارک",
          answerEn: "2 question | 3 phrase | 4 sentence | 5 question | 6 sentence",
          answerFa: "۲ سوال | ۳ عبارت | ۴ جمله | ۵ سوال | ۶ جمله"
        },
        {
          en: "2 Do you speak English?",
          fa: "آیا انگلیسی صحبت می‌کنید؟",
          answerEn: "2 question | 3 phrase | 4 sentence | 5 question | 6 sentence",
          answerFa: "۲ سوال | ۳ عبارت | ۴ جمله | ۵ سوال | ۶ جمله"
        },
        {
          en: "3 a black cat",
          fa: "یک گربهٔ سیاه",
          answerEn: "2 question | 3 phrase | 4 sentence | 5 question | 6 sentence",
          answerFa: "۲ سوال | ۳ عبارت | ۴ جمله | ۵ سوال | ۶ جمله"
        },
        {
          en: "4 She's writing a book.",
          fa: "او در حال نوشتن یک کتاب است.",
          answerEn: "2 question | 3 phrase | 4 sentence | 5 question | 6 sentence",
          answerFa: "۲ سوال | ۳ عبارت | ۴ جمله | ۵ سوال | ۶ جمله"
        },
        {
          en: "5 What's your name?",
          fa: "اسم تو چیست؟",
          answerEn: "2 question | 3 phrase | 4 sentence | 5 question | 6 sentence",
          answerFa: "۲ سوال | ۳ عبارت | ۴ جمله | ۵ سوال | ۶ جمله"
        },
        {
          en: "6 I like English.",
          fa: "من انگلیسی را دوست دارم.",
          answerEn: "2 question | 3 phrase | 4 sentence | 5 question | 6 sentence",
          answerFa: "۲ سوال | ۳ عبارت | ۴ جمله | ۵ سوال | ۶ جمله"
        },
        {
          en: "1 What is the plural of book?",
          fa: "جمع کلمهٔ book چیست؟",
          answerEn: "books",
          answerFa: "کتاب‌ها"
        },
        {
          en: "2 What is the singular of men?",
          fa: "مفرد کلمهٔ men چیست؟",
          answerEn: "man",
          answerFa: "مرد"
        },
        {
          en: "3 Is from a verb?",
          fa: "آیا from یک فعل است؟",
          answerEn: "No, it's a preposition.",
          answerFa: "خیر، این یک حرف اضافه است."
        },
        {
          en: "4 Is cat an adjective?",
          fa: "آیا cat یک صفت است؟",
          answerEn: "No, it's a noun.",
          answerFa: "خیر، این یک اسم است."
        },
        {
          en: "5 Is 'Jane loves Hari.' a phrase?",
          fa: "آیا «Jane loves Hari.» یک عبارت است؟",
          answerEn: "No, it's a sentence.",
          answerFa: "خیر، این یک جمله است."
        },
        {
          en: "6 Is bad an adverb?",
          fa: "آیا bad یک قید است؟",
          answerEn: "No, it's an adjective. The adverb is badly.",
          answerFa: "خیر، این یک صفت است. قید آن بد است (badly)."
        },
        {
          en: "1 Fill the gap in the question. What ......is.... your name?",
          fa: "جای خالی سؤال را پر کنید. نام تو ......است....؟",
          answerEn: "Possible answers: 2 black, green, blue, red | 3 speak, English | 4 It depends where you live. | 5 make a mistake; do homework; have a shower",
          answerFa: "پاسخ‌های ممکن: ۲ سیاه، سبز، آبی، قرمز | ۳ صحبت کردن، انگلیسی | ۴ بستگی به این دارد که کجا زندگی می‌کنید. | ۵ اشتباه کردن؛ انجام تکلیف؛ دوش گرفتن"
        },
        {
          en: "2 Add another example of a colour. black, green, blue ...",
          fa: "یک مثال دیگر از رنگ اضافه کنید. سیاه، سبز، آبی ...",
          answerEn: "Possible answers: 2 black, green, blue, red | 3 speak, English | 4 It depends where you live. | 5 make a mistake; do homework; have a shower",
          answerFa: "پاسخ‌های ممکن: ۲ سیاه، سبز، آبی، قرمز | ۳ صحبت کردن، انگلیسی | ۴ بستگی به این دارد که کجا زندگی می‌کنید. | ۵ اشتباه کردن؛ انجام تکلیف؛ دوش گرفتن"
        },
        {
          en: "3 Correct these words. speek, inglish",
          fa: "این کلمات را تصحیح کنید. speek، inglish",
          answerEn: "Possible answers: 2 black, green, blue, red | 3 speak, English | 4 It depends where you live. | 5 make a mistake; do homework; have a shower",
          answerFa: "پاسخ‌های ممکن: ۲ سیاه، سبز، آبی، قرمز | ۳ صحبت کردن، انگلیسی | ۴ بستگی به این دارد که کجا زندگی می‌کنید. | ۵ اشتباه کردن؛ انجام تکلیف؛ دوش گرفتن"
        },
        {
          en: "4 Answer this question. Is there a river in your town?",
          fa: "به این سؤال پاسخ دهید. آیا در شهر شما رودی وجود دارد؟",
          answerEn: "Possible answers: 2 black, green, blue, red | 3 speak, English | 4 It depends where you live. | 5 make a mistake; do homework; have a shower",
          answerFa: "پاسخ‌های ممکن: ۲ سیاه، سبز، آبی، قرمز | ۳ صحبت کردن، انگلیسی | ۴ بستگی به این دارد که کجا زندگی می‌کنید. | ۵ اشتباه کردن؛ انجام تکلیف؛ دوش گرفتن"
        },
        {
          en: "5 Match the verbs on the left with the nouns on the right. Draw lines. make — homework, do — a shower, have — a mistake",
          fa: "فعل‌های سمت چپ را با اسم‌های سمت راست مطابقت دهید. خط بکشید. انجام دادن — تکالیف، گرفتن — دوش، داشتن — اشتباه",
          answerEn: "Possible answers: 2 black, green, blue, red | 3 speak, English | 4 It depends where you live. | 5 make a mistake; do homework; have a shower",
          answerFa: "پاسخ‌های ممکن: ۲ سیاه، سبز، آبی، قرمز | ۳ صحبت کردن، انگلیسی | ۴ بستگی به این دارد که کجا زندگی می‌کنید. | ۵ اشتباه کردن؛ انجام تکلیف؛ دوش گرفتن"
        }
      ]
    }
  },
  {
    id: "viu-elem-l2",
    lesson: 2,
    title: "Learning vocabulary",
    titleFa: "یادگیری واژگان (هم‌نشینی، تصویرها و نمودارها)",
    source: "VIU Elementary 2nd ed — درس 2 (کتاب ص8-9)",
    paragraphs: [
      {
        en: "You do the exercises in this book. Sometimes, you may make mistakes in your English.",
        fa: "شما تمرین‌های این کتاب را انجام می‌دهید. گاهی ممکن است در انگلیسی‌تان اشتباه کنید."
      },
      {
        en: "In your vocabulary book, write down: do an exercise and make a mistake.",
        fa: "در دفترچهٔ واژگان خود بنویسید: do an exercise و make a mistake."
      },
      {
        en: "When words are used together like this, we call it a collocation.",
        fa: "وقتی واژه‌ها به این شکل با هم به کار می‌روند، به آن collocation (هم‌آیی) می‌گوییم."
      },
      {
        en: "You go by train, but on foot (= walking)",
        fa: "شما با قطار می‌روید، اما پیاده (= راه رفتن)"
      },
      {
        en: "Some people are good at languages [NOT good in]",
        fa: "بعضی مردم در زبان‌ها خوب‌اند [نه good in]"
      },
      {
        en: "I saw a very tall man [NOT high man]",
        fa: "من مرد بسیار بلندقدی دیدم [نه high man]"
      }
    ],
    exercise: {
      instruction: "2.1 Look at Unit 3 of this book. How many more collocations for have could you write in your vocabulary notebook? — 2.2 Which words can go with weather? Use a dictionary. — 2.3 There are two word families here. What are they? Put them in the table. Use a dictionary. — 2.4 Draw simple pictures to help you remember these words, as in the example. — 2.5 Put words in the empty circles.",
      instructionFa: "به واحد ۳ این کتاب نگاه کنید. چند هم‌آیی دیگر برای have می‌توانید در دفترچهٔ واژگان خود بنویسید؟ — کدام واژه‌ها با weather به کار می‌روند؟ از فرهنگ لغت استفاده کنید. — در اینجا دو خانوادهٔ واژگانی وجود دارد. آن‌ها چیستند؟ آن‌ها را در جدول قرار دهید. از فرهنگ لغت استفاده کنید. — تصاویر ساده‌ای بکشید تا به یادآوری این واژه‌ها کمک کند، مانند مثال. — واژه‌ها را در دایره‌های خالی قرار دهید.",
      items: [
        {
          en: "have a party, a shower ......................",
          fa: "مثال داده شده: مهمان داشتن، دوش گرفتن ... (ادامه بدهید)",
          answerEn: "Possible answers: have a party, a shower, lunch, a lesson, a cup of tea, a meeting, etc.",
          answerFa: "پاسخ‌های ممکن: برگزاری یک مهمانی، دوش گرفتن، نهار، یک درس،一杯 چای، یک جلسه، و غیره."
        },
        {
          en: "wet ... weather (table with empty rows)",
          fa: "جملهٔ نمونه wet داده شده؛ واژه‌های مناسب را در جدول بنویسید.",
          answerEn: "wet, dry, warm, cool, rainy — weather",
          answerFa: "خیس، خشک، گرم، خنک، بارانی — آب و هوا"
        },
        {
          en: "name of family / words in family (table)",
          fa: "جدول: نام خانواده / واژه‌های خانواده",
          answerEn: "name of family: education — words in family: school teacher exam student | name of family: weather — words in family: rain sun cloud snow ice",
          answerFa: "نام خانواده: آموزش — واژگان در خانواده: مدرسه، معلم، امتحان، دانش‌آموز | نام خانواده: آب و هوا — واژگان در خانواده: باران، آفتاب، ابر، برف، یخ"
        },
        {
          en: "Example: to cry",
          fa: "مثال: گریه کردن",
          answerEn: "Possible pictures: 1 a plane lands | 2 sunny weather | 3 under the table",
          answerFa: "تصاویر ممکن: ۱ یک هواپیما فرود می‌آید | ۲ آب و هوا آفتابی است | ۳ زیر میز"
        },
        {
          en: "1 a plane lands",
          fa: "۱ هواپیما فرود می‌آید",
          answerEn: "Possible pictures: 1 a plane lands | 2 sunny weather | 3 under the table",
          answerFa: "تصاویر ممکن: ۱ یک هواپیما فرود می‌آید | ۲ آب و هوا آفتابی است | ۳ زیر میز"
        },
        {
          en: "2 sunny weather",
          fa: "۲ هوای آفتابی",
          answerEn: "Possible pictures: 1 a plane lands | 2 sunny weather | 3 under the table",
          answerFa: "تصاویر ممکن: ۱ یک هواپیما فرود می‌آید | ۲ آب و هوا آفتابی است | ۳ زیر میز"
        },
        {
          en: "3 under the table",
          fa: "۳ زیر میز",
          answerEn: "Possible pictures: 1 a plane lands | 2 sunny weather | 3 under the table",
          answerFa: "تصاویر ممکن: ۱ یک هواپیما فرود می‌آید | ۲ آب و هوا آفتابی است | ۳ زیر میز"
        },
        {
          en: "furniture: chair, desk, ________, ________",
          fa: "مبلمان: صندلی، میز تحریر، ...",
          answerEn: "Possible words: furniture: chair, desk, table, bed | clothes: dress, hat, jacket, shoes",
          answerFa: "واژگان ممکن: مبلمان: صندلی، میز، تخت، تختخواب | لباس: پیراهن، کلاه، ژاکت، کفش"
        },
        {
          en: "clothes: dress, hat, ________, ________",
          fa: "لباس: پیراهن، کلاه، ...",
          answerEn: "Possible words: furniture: chair, desk, table, bed | clothes: dress, hat, jacket, shoes",
          answerFa: "واژگان ممکن: مبلمان: صندلی، میز، تخت، تختخواب | لباس: پیراهن، کلاه، ژاکت، کفش"
        }
      ]
    }
  },
  {
    id: "viu-elem-l3",
    lesson: 3,
    title: "Have/had/had",
    titleFa: "have و had (صبحانه خوردن، وقت داشتن)",
    source: "VIU Elementary 2nd ed — درس 3 (کتاب ص10-11)",
    paragraphs: [
      {
        en: "1 have lunch",
        fa: "ناهار خوردن"
      },
      {
        en: "2 have a party",
        fa: "مهمانی گرفتن"
      },
      {
        en: "3 have a lesson",
        fa: "درس داشتن"
      },
      {
        en: "4 have a cup of tea/coffee",
        fa: "یک فنجان چای/قهوه نوشیدن"
      },
      {
        en: "5 have a shower",
        fa: "دوش گرفتن"
      },
      {
        en: "Is that your camera? Can I have a look? (= look at it)",
        fa: "آیا این دوربین توست؟ می‌توانم نگاهی بیندازم؟"
      },
      {
        en: "Is that your bicycle? Can I have a go? (= ride it)",
        fa: "آیا این دوچرخه توست؟ می‌توانم یک بار امتحانش کنم؟"
      },
      {
        en: "Goodbye! Have a good journey! (= somebody is going away)",
        fa: "خداحافظ! سفر خوبی داشته باشی!"
      },
      {
        en: "Do you have a moment? (= have some time) Can I have a word with you? (= speak to you)",
        fa: "چند لحظه وقت دارید؟ می‌توانم چند کلمه با شما صحبت کنم؟"
      },
      {
        en: "We always have a good time in our English lessons (= fun; we enjoy them)",
        fa: "ما همیشه در کلاس‌های انگلیسی وقت خوشی داریم."
      },
      {
        en: "I'm going to have my hair cut. See you later. Can you meet me at the hairdresser's?",
        fa: "می‌خواهم موهایم را کوتاه کنم. بعداً می‌بینمت. می‌توانی من را آرایشگاه ملاقات کنی؟"
      },
      {
        en: "I want to learn to ski but I don't have the time.",
        fa: "می‌خواهم اسکی یاد بگیرم اما وقت ندارم."
      },
      {
        en: "I've got three sisters. Have you got any brothers and sisters?",
        fa: "من سه خواهر دارم. تو خواهر یا برادری داری؟"
      },
      {
        en: "My house is big. It's got five bedrooms and three bathrooms.",
        fa: "خانه‌ی من بزرگ است. پنج اتاق خواب و سه حمام دارد."
      },
      {
        en: "We've got ten minutes before the train goes.",
        fa: "ده دقیقه تا حرکت قطار وقت داریم."
      },
      {
        en: "Have you got a pen?",
        fa: "خودکار داری؟"
      },
      {
        en: "(In a shop) A: Do you sell postcards? B: Yes, but we haven't got any at the moment.",
        fa: "(در مغازه) آ: کارت‌پستال می‌فروشید؟ ب: بله، اما فعلاً نداریم."
      },
      {
        en: "I've got a problem. Can I have a word with you?",
        fa: "یک مشکل دارم. می‌توانم چند کلمه با تو صحبت کنم؟"
      },
      {
        en: "I've got a cold / a headache.",
        fa: "سرما خورده‌ام / سردرد دارم."
      },
      {
        en: "We use have to when the situation means you must do something.",
        fa: "از have to وقتی استفاده می‌کنیم که موقعیت ایجاب می‌کند چیزی را انجام دهید."
      },
      {
        en: "The museum's not free. You have to pay $10 to go in.",
        fa: "موزه رایگان نیست. برای ورود باید ۱۰ دلار بپردازی."
      },
      {
        en: "All students have to do the exam.",
        fa: "همه دانش‌آموزان باید امتحان را انجام دهند."
      },
      {
        en: "I haven't got a car, so I have to walk to school every day.",
        fa: "ماشین ندارم، پس هر روز مجبورم پیاده به مدرسه بروم."
      }
    ],
    exercise: {
      instruction: "3.2 Answer the questions about yourself. — 3.3 Do the crossword.",
      instructionFa: "به سؤال‌ها دربارهٔ خودتان پاسخ دهید. — جدول کلمات متقاطع را حل کنید.",
      items: [
        {
          en: "Have you got any brothers or sisters?",
          fa: "آیا خواهر یا برادری داری؟",
          answerEn: "I've got one brother and two sisters.",
          answerFa: "یک برادر و دو خواهر دارم."
        },
        {
          en: "What time do you have English lessons?",
          fa: "چه ساعتی کلاس انگلیسی داری؟",
          answerEn: "I have them at 9.30 every day.",
          answerFa: "من هر روز ساعت ۹:۳۰ آنها را دارم."
        },
        {
          en: "What do you have for lunch?",
          fa: "برای ناهار چه می‌خوری؟",
          answerEn: "I have a sandwich and a cup of tea.",
          answerFa: "من یک ساندویچ و یک فنجان چای دارم."
        },
        {
          en: "Do you have to go to lessons every day?",
          fa: "آیا باید هر روز به کلاس بروی؟",
          answerEn: "No, I have to go on Wednesday and Friday.",
          answerFa: "خیر، من باید روز چهارشنبه و جمعه بروم."
        },
        {
          en: "How many pens have you got with you now?",
          fa: "الان چند مداد/خودکار با خودت داری؟",
          answerEn: "I've got two.",
          answerFa: "من دو تا دارم."
        },
        {
          en: "Do you always have a party on your birthday?",
          fa: "آیا همیشه در تولدت مهمانی می‌گیری؟",
          answerEn: "Yes, I always have a party.",
          answerFa: "بله، همیشه یک مهمانی دارم."
        },
        {
          en: "What do you usually have when you go to a restaurant?",
          fa: "وقتی به رستوران می‌روی معمولاً چه می‌خوری؟",
          answerEn: "I usually have pasta or fish.",
          answerFa: "من معمولاً پاستا یا ماهی می‌خورم."
        },
        {
          en: "Across 1 You have it in a restaurant.",
          fa: "افقی ۱ آن را در رستوران دارید (می‌خورید).",
          answerEn: "Across: 1 meal | 3 party | 5 game | Down: 2 exam | 4 tea",
          answerFa: "افقی: ۱ وعده غذایی | ۳ مهمانی | ۵ بازی | عمودی: ۲ امتحان | ۴ چای"
        },
        {
          en: "3 People often have one on their birthday.",
          fa: "۳ مردم اغلب در تولدشان یکی دارند.",
          answerEn: "Across: 1 meal | 3 party | 5 game | Down: 2 exam | 4 tea",
          answerFa: "افقی: ۱ وعده غذایی | ۳ مهمانی | ۵ بازی | عمودی: ۲ امتحان | ۴ چای"
        },
        {
          en: "5 Do you want to have a ........ of tennis?",
          fa: "۵ می‌خواهی یک ... تنیس داشته باشی؟",
          answerEn: "Across: 1 meal | 3 party | 5 game | Down: 2 exam | 4 tea",
          answerFa: "افقی: ۱ وعده غذایی | ۳ مهمانی | ۵ بازی | عمودی: ۲ امتحان | ۴ چای"
        },
        {
          en: "Down 2 You have it at school or university.",
          fa: "عمودی ۲ آن را در مدرسه یا دانشگاه دارید.",
          answerEn: "Across: 1 meal | 3 party | 5 game | Down: 2 exam | 4 tea",
          answerFa: "افقی: ۱ وعده غذایی | ۳ مهمانی | ۵ بازی | عمودی: ۲ امتحان | ۴ چای"
        },
        {
          en: "4 If you don't like coffee, you can have ..........",
          fa: "۴ اگر قهوه دوست نداری، می‌توانی ... داشته باشی.",
          answerEn: "Across: 1 meal | 3 party | 5 game | Down: 2 exam | 4 tea",
          answerFa: "افقی: ۱ وعده غذایی | ۳ مهمانی | ۵ بازی | عمودی: ۲ امتحان | ۴ چای"
        }
      ]
    }
  },
  {
    id: "viu-elem-l4",
    lesson: 4,
    title: "Go/went/gone",
    titleFa: "go و went (رفتن، خرید رفتن)",
    source: "VIU Elementary 2nd ed — درس 4 (کتاب ص12-13)",
    paragraphs: [
      {
        en: "I go to work by bike. My brother goes by car.",
        fa: "من با دوچرخه سر کار می‌روم. برادرم با ماشین می‌رود."
      },
      {
        en: "We went to Paris last summer.",
        fa: "تابستان گذشته به پاریس رفتیم."
      },
      {
        en: "Shall we go to the swimming pool today?",
        fa: "امروز به استخر برویم؟"
      },
      {
        en: "We're walking to work this morning.",
        fa: "امروز صبح پیاده سر کار می‌رویم."
      },
      {
        en: "Is this train going to Granada?",
        fa: "آیا این قطار به گرانادا می‌رود؟"
      },
      {
        en: "Where does this road go?",
        fa: "این جاده به کجا می‌رود؟"
      },
      {
        en: "Kim went in(to) his room and shut the door.",
        fa: "کیم وارد اتاقش شد و در را بست."
      },
      {
        en: "Yuko went out of the house and into the garden.",
        fa: "یوکو از خانه بیرون رفت و به باغ وارد شد."
      },
      {
        en: "Rani was tired. He went up the stairs slowly.",
        fa: "رانی خسته بود. آرام از پله‌ها بالا رفت."
      },
      {
        en: "The phone was ringing. She went down the stairs quickly.",
        fa: "تلفن داشت زنگ می‌زد. او سریع از پله‌ها پایین رفت."
      },
      {
        en: "Go away.",
        fa: "برو دور."
      },
      {
        en: "I'm going back home this evening.",
        fa: "امروز عصر به خانه برمی‌گردم."
      },
      {
        en: "I hate going shopping.",
        fa: "از خرید کردن متنفرم."
      },
      {
        en: "I usually go swimming in the morning.",
        fa: "معمولاً صبح‌ها شنا می‌روم."
      },
      {
        en: "Let's go dancing.",
        fa: "بریم رقص."
      },
      {
        en: "Do you like going sightseeing when you are on holiday?",
        fa: "وقتی تعطیلات هستی از دیدنی‌ها بازدید کردن را دوست داری؟"
      },
      {
        en: "Hans goes skiing every winter.",
        fa: "هانس هر زمستان اسکی می‌رود."
      },
      {
        en: "Bob is going fishing today.",
        fa: "باب امروز به ماهیگیری می‌رود."
      },
      {
        en: "On Saturday Jan is going to visit his aunt. On Sunday we're going to stay at home. On Monday I'm going to meet Sam at the restaurant.",
        fa: "شنبه جان قصد دارد عمه‌اش را ببیند. یکشنبه می‌خواهیم در خانه بمانیم. دوشنبه قصد دارم سم را در رستوران ملاقات کنم."
      }
    ],
    exercise: {
      instruction: "4.1 Where are these people going? Follow the lines. — 4.2 Correct the mistakes in these sentences. — 4.3 Look at the activities in C opposite. Which do you do on holiday? Write sentences. — 4.4 Write about Alison's plans for next week. — 4.5 Write about where trains, buses and roads go to from your town. — 4.6 Look in a book in English. What examples of go can you find?",
      instructionFa: "این افراد به کجا می‌روند؟ خط‌ها را دنبال کنید. — اشتباهات این جمله‌ها را اصلاح کنید. — به فعالیت‌های بخش C صفحه مقابل نگاه کنید. کدام‌ها را در تعطیلات انجام می‌دهید؟ جمله بنویسید. — درباره برنامه‌های الیسون برای هفته بعد بنویسید. — درباره مقصد قطارها، اتوبوس‌ها و جاده‌های شهر خود بنویسید. — در یک کتاب انگلیسی جست‌وجو کنید. چه مثال‌هایی از go پیدا می‌کنید؟",
      items: [
        {
          en: "1 Pablo ________",
          fa: "پابلو ________",
          answerEn: "2 Soraya and Mehmet are going shopping. | 3 Imran is going to Cairo. | 4 The Patels are going to the beach. | 5 Natasha is going fishing.",
          answerFa: "۲ سورایا و مهدت در حال خرید هستند. | ۳ ایمران به قاهره می‌رود. | ۴ خانواده پاتل به ساحل می‌روند. | ۵ ناتاشا در حال ماهیگیری است."
        },
        {
          en: "2 Soraya and Mehmet ________",
          fa: "سورایا و محمد ________",
          answerEn: "2 Soraya and Mehmet are going shopping. | 3 Imran is going to Cairo. | 4 The Patels are going to the beach. | 5 Natasha is going fishing.",
          answerFa: "۲ سورایا و مهدت در حال خرید هستند. | ۳ ایمران به قاهره می‌رود. | ۴ خانواده پاتل به ساحل می‌روند. | ۵ ناتاشا در حال ماهیگیری است."
        },
        {
          en: "3 Imran ________",
          fa: "عمران ________",
          answerEn: "2 Soraya and Mehmet are going shopping. | 3 Imran is going to Cairo. | 4 The Patels are going to the beach. | 5 Natasha is going fishing.",
          answerFa: "۲ سورایا و مهدت در حال خرید هستند. | ۳ ایمران به قاهره می‌رود. | ۴ خانواده پاتل به ساحل می‌روند. | ۵ ناتاشا در حال ماهیگیری است."
        },
        {
          en: "4 The Patels ________",
          fa: "خانواده پاتل ________",
          answerEn: "2 Soraya and Mehmet are going shopping. | 3 Imran is going to Cairo. | 4 The Patels are going to the beach. | 5 Natasha is going fishing.",
          answerFa: "۲ سورایا و مهدت در حال خرید هستند. | ۳ ایمران به قاهره می‌رود. | ۴ خانواده پاتل به ساحل می‌روند. | ۵ ناتاشا در حال ماهیگیری است."
        },
        {
          en: "5 Natasha ________",
          fa: "ناتاشا ________",
          answerEn: "2 Soraya and Mehmet are going shopping. | 3 Imran is going to Cairo. | 4 The Patels are going to the beach. | 5 Natasha is going fishing.",
          answerFa: "۲ سورایا و مهدت در حال خرید هستند. | ۳ ایمران به قاهره می‌رود. | ۴ خانواده پاتل به ساحل می‌روند. | ۵ ناتاشا در حال ماهیگیری است."
        },
        {
          en: "1 Please, go in. I'm tired.",
          fa: "لطفاً برو داخل. خسته‌ام.",
          answerEn: "2 We're going sightseeing today. | 3 Jo went up to the top of the hill. or Jo went down to the bottom of the hill. | 4 Let's go fishing today. | 5 She went out of the shop.",
          answerFa: "۲ امروز ما در حال دیدن جاذبه‌های تاریخی هستیم. | ۳ جو به بالای تپه رفت. یا جو به پایین تپه رفت. | ۴ بیایید امروز ماهیگیری کنیم. | ۵ او از مغازه خارج شد."
        },
        {
          en: "2 We're going sightsee today.",
          fa: "امروز می‌خواهیم به بازدید برویم.",
          answerEn: "2 We're going sightseeing today. | 3 Jo went up to the top of the hill. or Jo went down to the bottom of the hill. | 4 Let's go fishing today. | 5 She went out of the shop.",
          answerFa: "۲ امروز ما در حال دیدن جاذبه‌های تاریخی هستیم. | ۳ جو به بالای تپه رفت. یا جو به پایین تپه رفت. | ۴ بیایید امروز ماهیگیری کنیم. | ۵ او از مغازه خارج شد."
        },
        {
          en: "3 Jo went down to the top of the hill.",
          fa: "جو به بالای تپه پایین رفت.",
          answerEn: "2 We're going sightseeing today. | 3 Jo went up to the top of the hill. or Jo went down to the bottom of the hill. | 4 Let's go fishing today. | 5 She went out of the shop.",
          answerFa: "۲ امروز ما در حال دیدن جاذبه‌های تاریخی هستیم. | ۳ جو به بالای تپه رفت. یا جو به پایین تپه رفت. | ۴ بیایید امروز ماهیگیری کنیم. | ۵ او از مغازه خارج شد."
        },
        {
          en: "4 Let's go to fish today.",
          fa: "امروز برویم ماهیگیری.",
          answerEn: "2 We're going sightseeing today. | 3 Jo went up to the top of the hill. or Jo went down to the bottom of the hill. | 4 Let's go fishing today. | 5 She went out of the shop.",
          answerFa: "۲ امروز ما در حال دیدن جاذبه‌های تاریخی هستیم. | ۳ جو به بالای تپه رفت. یا جو به پایین تپه رفت. | ۴ بیایید امروز ماهیگیری کنیم. | ۵ او از مغازه خارج شد."
        },
        {
          en: "5 She went out off the shop.",
          fa: "او از مغازه بیرون رفت.",
          answerEn: "2 We're going sightseeing today. | 3 Jo went up to the top of the hill. or Jo went down to the bottom of the hill. | 4 Let's go fishing today. | 5 She went out of the shop.",
          answerFa: "۲ امروز ما در حال دیدن جاذبه‌های تاریخی هستیم. | ۳ جو به بالای تپه رفت. یا جو به پایین تپه رفت. | ۴ بیایید امروز ماهیگیری کنیم. | ۵ او از مغازه خارج شد."
        },
        {
          en: "I usually go shopping on holiday.",
          fa: "معمولاً در تعطیلات خرید می‌روم.",
          answerEn: "I sometimes go swimming. | I sometimes go dancing. | I always go sightseeing. | I never go skiing. | I never go fishing.",
          answerFa: "من گاهی شنا می‌روم. | من گاهی رقص می‌روم. | من همیشه در حال دیدن جاذبه‌های تاریخی هستم. | هرگز اسکی نمی‌روم. | هرگز ماهیگیری نمی‌کنم."
        },
        {
          en: "1 On Monday ________",
          fa: "دوشنبه ________",
          answerEn: "2 On Tuesday Alison is going to write to Juan. | 3 On Wednesday she is going to watch the World Cup on TV. | 4 On Thursday she is going to have a tennis lesson. | 5 On Friday Alison is going to go to the cinema.",
          answerFa: "۲ دوشنبه آلیسون به خواندن نامه به خوان می‌نویسد. | ۳ چهارشنبه او قصد دارد جام جهانی را در تلویزیون تماشا کند. | ۴ پنجشنبه او یک درس تنیس خواهد داشت. | ۵ جمعه آلیسون به سینما می‌رود."
        },
        {
          en: "2 On Tuesday ________",
          fa: "سه‌شنبه ________",
          answerEn: "2 On Tuesday Alison is going to write to Juan. | 3 On Wednesday she is going to watch the World Cup on TV. | 4 On Thursday she is going to have a tennis lesson. | 5 On Friday Alison is going to go to the cinema.",
          answerFa: "۲ دوشنبه آلیسون به خواندن نامه به خوان می‌نویسد. | ۳ چهارشنبه او قصد دارد جام جهانی را در تلویزیون تماشا کند. | ۴ پنجشنبه او یک درس تنیس خواهد داشت. | ۵ جمعه آلیسون به سینما می‌رود."
        },
        {
          en: "3 On Wednesday ________",
          fa: "چهارشنبه ________",
          answerEn: "2 On Tuesday Alison is going to write to Juan. | 3 On Wednesday she is going to watch the World Cup on TV. | 4 On Thursday she is going to have a tennis lesson. | 5 On Friday Alison is going to go to the cinema.",
          answerFa: "۲ دوشنبه آلیسون به خواندن نامه به خوان می‌نویسد. | ۳ چهارشنبه او قصد دارد جام جهانی را در تلویزیون تماشا کند. | ۴ پنجشنبه او یک درس تنیس خواهد داشت. | ۵ جمعه آلیسون به سینما می‌رود."
        },
        {
          en: "4 On Thursday ________",
          fa: "پنج‌شنبه ________",
          answerEn: "2 On Tuesday Alison is going to write to Juan. | 3 On Wednesday she is going to watch the World Cup on TV. | 4 On Thursday she is going to have a tennis lesson. | 5 On Friday Alison is going to go to the cinema.",
          answerFa: "۲ دوشنبه آلیسون به خواندن نامه به خوان می‌نویسد. | ۳ چهارشنبه او قصد دارد جام جهانی را در تلویزیون تماشا کند. | ۴ پنجشنبه او یک درس تنیس خواهد داشت. | ۵ جمعه آلیسون به سینما می‌رود."
        },
        {
          en: "5 On Friday ________",
          fa: "جمعه ________",
          answerEn: "2 On Tuesday Alison is going to write to Juan. | 3 On Wednesday she is going to watch the World Cup on TV. | 4 On Thursday she is going to have a tennis lesson. | 5 On Friday Alison is going to go to the cinema.",
          answerFa: "۲ دوشنبه آلیسون به خواندن نامه به خوان می‌نویسد. | ۳ چهارشنبه او قصد دارد جام جهانی را در تلویزیون تماشا کند. | ۴ پنجشنبه او یک درس تنیس خواهد داشت. | ۵ جمعه آلیسون به سینما می‌رود."
        },
        {
          en: "From Cambridge, trains go to London and to Norwich.",
          fa: "از کمبریج، قطارها به لندن و نوریج می‌روند.",
          answerEn: "From Cambridge, trains go to London, Norwich, Ely and Peterborough. Buses go to Oxford, to Heathrow and to Scotland from Cambridge. From Cambridge roads go to London, to the sea and to Huntingdon.",
          answerFa: "از کمبریج، قطارها به لندن، نورویچ، ایلی و پیتربرو می‌روند. اتوبوس‌ها از کمبریج به آکسفورد، به هیثرو و به اسکاتلند می‌روند. از کمبریج جاده‌ها به لندن، به دریا و به هانتینگدون می‌روند."
        }
      ]
    }
  },
  {
    id: "viu-elem-l5",
    lesson: 5,
    title: "Do/did/done",
    titleFa: "do و did (تمرین انجام دادن، تلاش کردن)",
    source: "VIU Elementary 2nd ed — درس 5 (کتاب ص14-15)",
    paragraphs: [
      {
        en: "Do you like tennis?",
        fa: "تو تنیس را دوست داری؟"
      },
      {
        en: "Did they like the film?",
        fa: "آیا فیلم را دوست داشتند؟"
      },
      {
        en: "Yes, I do.",
        fa: "بله، دوست دارم."
      },
      {
        en: "Yes, they did.",
        fa: "بله، دوست داشتند."
      },
      {
        en: "So does Sinjit.",
        fa: "سینجیت هم همین‌طور."
      },
      {
        en: "So did I.",
        fa: "من هم همین‌طور."
      },
      {
        en: "He doesn't play well.",
        fa: "او خوب بازی نمی‌کند."
      },
      {
        en: "Jo didn't see it.",
        fa: "جو آن را ندید."
      },
      {
        en: "What do you do to relax? I listen to music.",
        fa: "برای استراحت چه می‌کنی؟ به موسیقی گوش می‌دهم."
      },
      {
        en: "Don't do that, Tommy.",
        fa: "آن کار را نکن، تامی."
      },
      {
        en: "What are the people in the picture doing? They're dancing.",
        fa: "مردم در تصویر چه می‌کنند؟ آنها دارند می‌رقصند."
      },
      {
        en: "What do you do? (= What is your job?) I'm a student. or I'm a teacher. or I'm an engineer.",
        fa: "شغل تو چیست؟ من دانش‌آموزم. یا معلمم. یا مهندسم."
      },
      {
        en: "What does your wife do? (= What's your wife's job?) She's a doctor. or She's a secretary. or She's a mechanic.",
        fa: "همسرت شغلش چیست؟ او پزشک است. یا منشی است. یا مکانیک است."
      },
      {
        en: "Did you do the washing this morning? No, I'm going to do it later.",
        fa: "امروز صبح لباس‌شویی کردی؟ نه، بعداً انجامش می‌دهم."
      },
      {
        en: "Our company does a lot of business with the USA.",
        fa: "شرکت ما تجارت زیادی با آمریکا دارد."
      },
      {
        en: "The homework exercise is very difficult – just do your best.",
        fa: "تمرین تکلیف خیلی سخت است – فقط نهایت تلاشت را بکن."
      }
    ],
    exercise: {
      instruction: "5.1 Write questions and answers about the people in the picture. — 5.2 Write questions and answers about the jobs of the people in the pictures. — 5.3 Write questions about what the people in exercise 5.2 did this morning. Answer the questions using the phrases in the box. — 5.4 Look at the do expressions in D. Write sentences about you or your family and these activities. — 5.5 Correct the mistakes in this dialogue.",
      instructionFa: "درباره افراد تصویر سؤال و جواب بنویسید. — درباره شغل افراد در تصاویر سؤال و جواب بنویسید. — درباره اینکه افراد تمرین ۵.۲ امروز صبح چه کردند سؤال بنویسید. با استفاده از عبارت‌های داخل کادر به سؤال‌ها پاسخ دهید. — به عبارت‌های do در بخش D نگاه کنید. درباره خودتان یا خانواده‌تان و این فعالیت‌ها جمله بنویسید. — اشتباهات این گفتگو را اصلاح کنید.",
      items: [
        {
          en: "1 (the boy) ________",
          fa: "پسرچه",
          answerEn: "2 What is the woman doing? She's reading a book. | 3 What are the girls doing? They are playing tennis. | 4 What is the man in the house doing? He's washing-up. / He's doing the washing-up. | 5 What is the dog doing? It's sleeping. | 6 What is the man in the garden doing? He's gardening. / He's doing the gardening.",
          answerFa: "۲ زن چه کاری انجام می‌دهد؟ او کتاب می‌خواند. | ۳ دخترها چه کاری انجام می‌دهند؟ آن‌ها در حال تنیس بازی کردن هستند. | ۴ مرد داخل خانه چه کاری انجام می‌دهد؟ او ظرف‌ها را می‌شوید. / او در حال شستن ظرف‌ها است. | ۵ سگ چه کاری انجام می‌دهد؟ او در حال خوابیدن است. | ۶ مرد داخل باغ چه کاری انجام می‌دهد؟ او در باغبانی است. / او در حال باغبانی است."
        },
        {
          en: "2 (the woman) ________",
          fa: "زن",
          answerEn: "2 What is the woman doing? She's reading a book. | 3 What are the girls doing? They are playing tennis. | 4 What is the man in the house doing? He's washing-up. / He's doing the washing-up. | 5 What is the dog doing? It's sleeping. | 6 What is the man in the garden doing? He's gardening. / He's doing the gardening.",
          answerFa: "۲ زن چه کاری انجام می‌دهد؟ او کتاب می‌خواند. | ۳ دخترها چه کاری انجام می‌دهند؟ آن‌ها در حال تنیس بازی کردن هستند. | ۴ مرد داخل خانه چه کاری انجام می‌دهد؟ او ظرف‌ها را می‌شوید. / او در حال شستن ظرف‌ها است. | ۵ سگ چه کاری انجام می‌دهد؟ او در حال خوابیدن است. | ۶ مرد داخل باغ چه کاری انجام می‌دهد؟ او در باغبانی است. / او در حال باغبانی است."
        },
        {
          en: "3 (the girls) ________",
          fa: "دخترها",
          answerEn: "2 What is the woman doing? She's reading a book. | 3 What are the girls doing? They are playing tennis. | 4 What is the man in the house doing? He's washing-up. / He's doing the washing-up. | 5 What is the dog doing? It's sleeping. | 6 What is the man in the garden doing? He's gardening. / He's doing the gardening.",
          answerFa: "۲ زن چه کاری انجام می‌دهد؟ او کتاب می‌خواند. | ۳ دخترها چه کاری انجام می‌دهند؟ آن‌ها در حال تنیس بازی کردن هستند. | ۴ مرد داخل خانه چه کاری انجام می‌دهد؟ او ظرف‌ها را می‌شوید. / او در حال شستن ظرف‌ها است. | ۵ سگ چه کاری انجام می‌دهد؟ او در حال خوابیدن است. | ۶ مرد داخل باغ چه کاری انجام می‌دهد؟ او در باغبانی است. / او در حال باغبانی است."
        },
        {
          en: "4 (the man in the house) ________",
          fa: "مرد در خانه",
          answerEn: "2 What is the woman doing? She's reading a book. | 3 What are the girls doing? They are playing tennis. | 4 What is the man in the house doing? He's washing-up. / He's doing the washing-up. | 5 What is the dog doing? It's sleeping. | 6 What is the man in the garden doing? He's gardening. / He's doing the gardening.",
          answerFa: "۲ زن چه کاری انجام می‌دهد؟ او کتاب می‌خواند. | ۳ دخترها چه کاری انجام می‌دهند؟ آن‌ها در حال تنیس بازی کردن هستند. | ۴ مرد داخل خانه چه کاری انجام می‌دهد؟ او ظرف‌ها را می‌شوید. / او در حال شستن ظرف‌ها است. | ۵ سگ چه کاری انجام می‌دهد؟ او در حال خوابیدن است. | ۶ مرد داخل باغ چه کاری انجام می‌دهد؟ او در باغبانی است. / او در حال باغبانی است."
        },
        {
          en: "5 (the dog) ________",
          fa: "سگ",
          answerEn: "2 What is the woman doing? She's reading a book. | 3 What are the girls doing? They are playing tennis. | 4 What is the man in the house doing? He's washing-up. / He's doing the washing-up. | 5 What is the dog doing? It's sleeping. | 6 What is the man in the garden doing? He's gardening. / He's doing the gardening.",
          answerFa: "۲ زن چه کاری انجام می‌دهد؟ او کتاب می‌خواند. | ۳ دخترها چه کاری انجام می‌دهند؟ آن‌ها در حال تنیس بازی کردن هستند. | ۴ مرد داخل خانه چه کاری انجام می‌دهد؟ او ظرف‌ها را می‌شوید. / او در حال شستن ظرف‌ها است. | ۵ سگ چه کاری انجام می‌دهد؟ او در حال خوابیدن است. | ۶ مرد داخل باغ چه کاری انجام می‌دهد؟ او در باغبانی است. / او در حال باغبانی است."
        },
        {
          en: "6 (the man in the garden) ________",
          fa: "مرد در باغ",
          answerEn: "2 What is the woman doing? She's reading a book. | 3 What are the girls doing? They are playing tennis. | 4 What is the man in the house doing? He's washing-up. / He's doing the washing-up. | 5 What is the dog doing? It's sleeping. | 6 What is the man in the garden doing? He's gardening. / He's doing the gardening.",
          answerFa: "۲ زن چه کاری انجام می‌دهد؟ او کتاب می‌خواند. | ۳ دخترها چه کاری انجام می‌دهند؟ آن‌ها در حال تنیس بازی کردن هستند. | ۴ مرد داخل خانه چه کاری انجام می‌دهد؟ او ظرف‌ها را می‌شوید. / او در حال شستن ظرف‌ها است. | ۵ سگ چه کاری انجام می‌دهد؟ او در حال خوابیدن است. | ۶ مرد داخل باغ چه کاری انجام می‌دهد؟ او در باغبانی است. / او در حال باغبانی است."
        },
        {
          en: "1 ________",
          fa: "۱",
          answerEn: "2 What does Lara Brown do? She's a secretary. | 3 What does Sophie Hicks do? She's a doctor. | 4 What do Ted and Joe do? They're students.",
          answerFa: "۲ لارا براون چه کاری انجام می‌دهد؟ او منشی است. | ۳ سوفی هیکز چه کاری انجام می‌دهد؟ او پزشک است. | ۴ تد و جو چه کاری انجام می‌دهند؟ آن‌ها دانش‌آموز هستند."
        },
        {
          en: "2 ________",
          fa: "۲",
          answerEn: "2 What does Lara Brown do? She's a secretary. | 3 What does Sophie Hicks do? She's a doctor. | 4 What do Ted and Joe do? They're students.",
          answerFa: "۲ لارا براون چه کاری انجام می‌دهد؟ او منشی است. | ۳ سوفی هیکز چه کاری انجام می‌دهد؟ او پزشک است. | ۴ تد و جو چه کاری انجام می‌دهند؟ آن‌ها دانش‌آموز هستند."
        },
        {
          en: "3 ________",
          fa: "۳",
          answerEn: "2 What does Lara Brown do? She's a secretary. | 3 What does Sophie Hicks do? She's a doctor. | 4 What do Ted and Joe do? They're students.",
          answerFa: "۲ لارا براون چه کاری انجام می‌دهد؟ او منشی است. | ۳ سوفی هیکز چه کاری انجام می‌دهد؟ او پزشک است. | ۴ تد و جو چه کاری انجام می‌دهند؟ آن‌ها دانش‌آموز هستند."
        },
        {
          en: "4 ________",
          fa: "۴",
          answerEn: "2 What does Lara Brown do? She's a secretary. | 3 What does Sophie Hicks do? She's a doctor. | 4 What do Ted and Joe do? They're students.",
          answerFa: "۲ لارا براون چه کاری انجام می‌دهد؟ او منشی است. | ۳ سوفی هیکز چه کاری انجام می‌دهد؟ او پزشک است. | ۴ تد و جو چه کاری انجام می‌دهند؟ آن‌ها دانش‌آموز هستند."
        },
        {
          en: "1 ________",
          fa: "۱",
          answerEn: "2 What did Lara Brown do? She went to a meeting. | 3 What did Sophie Hicks do? She talked to five patients. | 4 What did Ted and Jo do? They wrote an essay.",
          answerFa: "۲ لارا براون چه کاری انجام داد؟ او به یک جلسه رفت. | ۳ سوفی هیکز چه کاری انجام داد؟ او با پنج بیمار صحبت کرد. | ۴ تد و جو چه کاری انجام دادند؟ آن‌مان یک مقاله نوشتند."
        },
        {
          en: "2 ________",
          fa: "۲",
          answerEn: "2 What did Lara Brown do? She went to a meeting. | 3 What did Sophie Hicks do? She talked to five patients. | 4 What did Ted and Jo do? They wrote an essay.",
          answerFa: "۲ لارا براون چه کاری انجام داد؟ او به یک جلسه رفت. | ۳ سوفی هیکز چه کاری انجام داد؟ او با پنج بیمار صحبت کرد. | ۴ تد و جو چه کاری انجام دادند؟ آن‌مان یک مقاله نوشتند."
        },
        {
          en: "3 ________",
          fa: "۳",
          answerEn: "2 What did Lara Brown do? She went to a meeting. | 3 What did Sophie Hicks do? She talked to five patients. | 4 What did Ted and Jo do? They wrote an essay.",
          answerFa: "۲ لارا براون چه کاری انجام داد؟ او به یک جلسه رفت. | ۳ سوفی هیکز چه کاری انجام داد؟ او با پنج بیمار صحبت کرد. | ۴ تد و جو چه کاری انجام دادند؟ آن‌مان یک مقاله نوشتند."
        },
        {
          en: "4 ________",
          fa: "۴",
          answerEn: "2 What did Lara Brown do? She went to a meeting. | 3 What did Sophie Hicks do? She talked to five patients. | 4 What did Ted and Jo do? They wrote an essay.",
          answerFa: "۲ لارا براون چه کاری انجام داد؟ او به یک جلسه رفت. | ۳ سوفی هیکز چه کاری انجام داد؟ او با پنج بیمار صحبت کرد. | ۴ تد و جو چه کاری انجام دادند؟ آن‌مان یک مقاله نوشتند."
        },
        {
          en: "ANNA: Where did you went on your holidays? To London?",
          fa: "آنا: در تعطیلات کجا رفتی؟ به لندن؟",
          answerEn: "ANNA: Where did you go on your holidays? To London? PAVEL: No, we didn't go to London this year. We went to Scotland. ANNA: Does your grandmother live in Scotland? PAVEL: No, she doesn't but my uncle does.",
          answerFa: "آنا: تعطیلاتت کجا بود؟ لندن؟ پاول: نه، امسال ما به لندن نرفتیم. ما به اسکاتلند رفتیم. آنا: مادربزرگت در اسکاتلند زندگی می‌کند؟ پاول: نه، او زندگی نمی‌کند اما عمویم زندگی می‌کند."
        },
        {
          en: "PAVEL: No, we don't go to London this year. We went to Scotland.",
          fa: "پاول: نه، امسال به لندن نرفتیم. به اسکاتلند رفتیم.",
          answerEn: "ANNA: Where did you go on your holidays? To London? PAVEL: No, we didn't go to London this year. We went to Scotland. ANNA: Does your grandmother live in Scotland? PAVEL: No, she doesn't but my uncle does.",
          answerFa: "آنا: تعطیلاتت کجا بود؟ لندن؟ پاول: نه، امسال ما به لندن نرفتیم. ما به اسکاتلند رفتیم. آنا: مادربزرگت در اسکاتلند زندگی می‌کند؟ پاول: نه، او زندگی نمی‌کند اما عمویم زندگی می‌کند."
        },
        {
          en: "ANNA: Do your grandmother lives in Scotland?",
          fa: "آنا: مادربزرگت در اسکاتلند زندگی می‌کند؟",
          answerEn: "ANNA: Where did you go on your holidays? To London? PAVEL: No, we didn't go to London this year. We went to Scotland. ANNA: Does your grandmother live in Scotland? PAVEL: No, she doesn't but my uncle does.",
          answerFa: "آنا: تعطیلاتت کجا بود؟ لندن؟ پاول: نه، امسال ما به لندن نرفتیم. ما به اسکاتلند رفتیم. آنا: مادربزرگت در اسکاتلند زندگی می‌کند؟ پاول: نه، او زندگی نمی‌کند اما عمویم زندگی می‌کند."
        },
        {
          en: "PAVEL: No, she don't but my uncle do.",
          fa: "پاول: نه، او نمی‌کند اما داییم چرا.",
          answerEn: "ANNA: Where did you go on your holidays? To London? PAVEL: No, we didn't go to London this year. We went to Scotland. ANNA: Does your grandmother live in Scotland? PAVEL: No, she doesn't but my uncle does.",
          answerFa: "آنا: تعطیلاتت کجا بود؟ لندن؟ پاول: نه، امسال ما به لندن نرفتیم. ما به اسکاتلند رفتیم. آنا: مادربزرگت در اسکاتلند زندگی می‌کند؟ پاول: نه، او زندگی نمی‌کند اما عمویم زندگی می‌کند."
        }
      ]
    }
  },
  {
    id: "viu-elem-l6",
    lesson: 6,
    title: "Make/made/made",
    titleFa: "make و made (قهوه درست کردن، اشتباه کردن)",
    source: "VIU Elementary 2nd ed — درس 6 (کتاب ص16-17)",
    paragraphs: [
      {
        en: "I'll make some tea/hot chocolate.",
        fa: "چای/شکلات داغ درست می‌کنم."
      },
      {
        en: "I make breakfast/lunch/supper every day. (supper = a meal just before bed)",
        fa: "هر روز صبحانه/ناهار/شام درست می‌کنم. (شام سبک = وعده‌ای درست قبل از خواب)"
      },
      {
        en: "The teacher's making a photocopy.",
        fa: "معلم دارد فتوکپی می‌گیرد."
      },
      {
        en: "He's making a film/video of the class.",
        fa: "او دارد از کلاس فیلم/ویدیو می‌گیرد."
      },
      {
        en: "The children are making a noise.",
        fa: "بچه‌ها دارند سر و صدا می‌کنند."
      },
      {
        en: "I made a mistake in the exercise.",
        fa: "در تمرین اشتباه کردم."
      },
      {
        en: "I have to make my homework.",
        fa: "باید تکالیفم را انجام دهم. (نادرست)"
      },
      {
        en: "I have to do my homework.",
        fa: "باید تکالیفم را انجام دهم."
      },
      {
        en: "I have to make an exam next week.",
        fa: "هفته آینده باید امتحان بدهم. (نادرست)"
      },
      {
        en: "I have to take/do an exam next week.",
        fa: "هفته آینده باید امتحان بدهم."
      },
      {
        en: "When I get up I make my bed.",
        fa: "وقتی از خواب بیدار می‌شوم تخت را مرتب می‌کنم."
      },
      {
        en: "I want to make an appointment with the doctor. (= fix a time to see him/her)",
        fa: "می‌خواهم با دکتر وقت بگیرم. (یعنی زمانی برای دیدن او تعیین کنم)"
      },
      {
        en: "I'd like to make a photo of you.",
        fa: "می‌خواهم از شما عکس بگیرم. (نادرست)"
      },
      {
        en: "I'd like to take a photo of you.",
        fa: "می‌خواهم از شما عکس بگیرم."
      },
      {
        en: "After dinner, I'll help you make the dishes.",
        fa: "بعد از شام کمک می‌کنم ظرف‌ها را بشویی. (نادرست)"
      },
      {
        en: "After dinner I'll help you do the dishes.",
        fa: "بعد از شام کمک می‌کنم ظرف‌ها را بشویی."
      },
      {
        en: "Going by train always makes me (feel) tired.",
        fa: "با قطار رفتن همیشه مرا خسته می‌کند."
      },
      {
        en: "My friend called me stupid. It made me (feel) angry.",
        fa: "دوستم مرا احمق صدا کرد. این مرا عصبانی کرد."
      },
      {
        en: "That film made me (feel) sad.",
        fa: "آن فیلم مرا غمگین کرد."
      }
    ],
    exercise: {
      instruction: "6.4 Correct the mistakes in these sentences. Look at the example.",
      instructionFa: "اشتباهات این جمله‌ها را اصلاح کنید. به مثال نگاه کنید.",
      items: [
        {
          en: "I have to make my homework. (I have to do my homework.)",
          fa: "باید تکالیفم را انجام دهم.",
          answerEn: "1 Can I take a photo of you? | 2 He's 25 but he never does his own washing. He takes his dirty clothes to his mother's. | 3 What do you think, yes or no? We must make a decision today. | 4 I have to make an appointment with the doctor. Do you have her phone number? | 5 I make mistakes when I speak English. | 6 Are you doing/taking an exam tomorrow?",
          answerFa: "۱ می‌توانم از شما عکس بگیرم؟ | ۲ او ۲۵ ساله است اما هرگز لباس‌هایش را خودش شست و روب نمی‌کند. او لباس‌های کثیفش را به خانه مادرش می‌برد. | ۳ شما فکر می‌کنید بله یا خیر؟ ما باید امروز تصمیم بگیریم. | ۴ باید با دکتر قرار بگذارم. شماره تلفنش را داری؟ | ۵ وقتی انگلیسی صحبت می‌کنم اشتباه می‌کنم. | ۶ فردا امتحان می‌دهی / می‌دهی؟"
        },
        {
          en: "Can I make a photo of you?",
          fa: "می‌توانم از تو عکس بگیرم؟",
          answerEn: "1 Can I take a photo of you? | 2 He's 25 but he never does his own washing. He takes his dirty clothes to his mother's. | 3 What do you think, yes or no? We must make a decision today. | 4 I have to make an appointment with the doctor. Do you have her phone number? | 5 I make mistakes when I speak English. | 6 Are you doing/taking an exam tomorrow?",
          answerFa: "۱ می‌توانم از شما عکس بگیرم؟ | ۲ او ۲۵ ساله است اما هرگز لباس‌هایش را خودش شست و روب نمی‌کند. او لباس‌های کثیفش را به خانه مادرش می‌برد. | ۳ شما فکر می‌کنید بله یا خیر؟ ما باید امروز تصمیم بگیریم. | ۴ باید با دکتر قرار بگذارم. شماره تلفنش را داری؟ | ۵ وقتی انگلیسی صحبت می‌کنم اشتباه می‌کنم. | ۶ فردا امتحان می‌دهی / می‌دهی؟"
        },
        {
          en: "He's 25 but he never makes his own washing. He takes his dirty clothes to his mother's.",
          fa: "او ۲۵ ساله است ولی هرگز لباس‌هایش را خودش نمی‌شوید. لباس‌های کثیفش را به خانه مادرش می‌برد.",
          answerEn: "1 Can I take a photo of you? | 2 He's 25 but he never does his own washing. He takes his dirty clothes to his mother's. | 3 What do you think, yes or no? We must make a decision today. | 4 I have to make an appointment with the doctor. Do you have her phone number? | 5 I make mistakes when I speak English. | 6 Are you doing/taking an exam tomorrow?",
          answerFa: "۱ می‌توانم از شما عکس بگیرم؟ | ۲ او ۲۵ ساله است اما هرگز لباس‌هایش را خودش شست و روب نمی‌کند. او لباس‌های کثیفش را به خانه مادرش می‌برد. | ۳ شما فکر می‌کنید بله یا خیر؟ ما باید امروز تصمیم بگیریم. | ۴ باید با دکتر قرار بگذارم. شماره تلفنش را داری؟ | ۵ وقتی انگلیسی صحبت می‌کنم اشتباه می‌کنم. | ۶ فردا امتحان می‌دهی / می‌دهی؟"
        },
        {
          en: "What do you think, yes or no? We must do a decision today.",
          fa: "نظرت چیست، بله یا نه؟ امروز باید تصمیم بگیریم.",
          answerEn: "1 Can I take a photo of you? | 2 He's 25 but he never does his own washing. He takes his dirty clothes to his mother's. | 3 What do you think, yes or no? We must make a decision today. | 4 I have to make an appointment with the doctor. Do you have her phone number? | 5 I make mistakes when I speak English. | 6 Are you doing/taking an exam tomorrow?",
          answerFa: "۱ می‌توانم از شما عکس بگیرم؟ | ۲ او ۲۵ ساله است اما هرگز لباس‌هایش را خودش شست و روب نمی‌کند. او لباس‌های کثیفش را به خانه مادرش می‌برد. | ۳ شما فکر می‌کنید بله یا خیر؟ ما باید امروز تصمیم بگیریم. | ۴ باید با دکتر قرار بگذارم. شماره تلفنش را داری؟ | ۵ وقتی انگلیسی صحبت می‌کنم اشتباه می‌کنم. | ۶ فردا امتحان می‌دهی / می‌دهی؟"
        },
        {
          en: "I have to take an appointment with the doctor. Do you have her phone number?",
          fa: "باید با دکتر وقت بگیرم. شماره تلفن او را داری؟",
          answerEn: "1 Can I take a photo of you? | 2 He's 25 but he never does his own washing. He takes his dirty clothes to his mother's. | 3 What do you think, yes or no? We must make a decision today. | 4 I have to make an appointment with the doctor. Do you have her phone number? | 5 I make mistakes when I speak English. | 6 Are you doing/taking an exam tomorrow?",
          answerFa: "۱ می‌توانم از شما عکس بگیرم؟ | ۲ او ۲۵ ساله است اما هرگز لباس‌هایش را خودش شست و روب نمی‌کند. او لباس‌های کثیفش را به خانه مادرش می‌برد. | ۳ شما فکر می‌کنید بله یا خیر؟ ما باید امروز تصمیم بگیریم. | ۴ باید با دکتر قرار بگذارم. شماره تلفنش را داری؟ | ۵ وقتی انگلیسی صحبت می‌کنم اشتباه می‌کنم. | ۶ فردا امتحان می‌دهی / می‌دهی؟"
        },
        {
          en: "I do mistakes when I speak English.",
          fa: "وقتی انگلیسی صحبت می‌کنم اشتباه می‌کنم.",
          answerEn: "1 Can I take a photo of you? | 2 He's 25 but he never does his own washing. He takes his dirty clothes to his mother's. | 3 What do you think, yes or no? We must make a decision today. | 4 I have to make an appointment with the doctor. Do you have her phone number? | 5 I make mistakes when I speak English. | 6 Are you doing/taking an exam tomorrow?",
          answerFa: "۱ می‌توانم از شما عکس بگیرم؟ | ۲ او ۲۵ ساله است اما هرگز لباس‌هایش را خودش شست و روب نمی‌کند. او لباس‌های کثیفش را به خانه مادرش می‌برد. | ۳ شما فکر می‌کنید بله یا خیر؟ ما باید امروز تصمیم بگیریم. | ۴ باید با دکتر قرار بگذارم. شماره تلفنش را داری؟ | ۵ وقتی انگلیسی صحبت می‌کنم اشتباه می‌کنم. | ۶ فردا امتحان می‌دهی / می‌دهی؟"
        },
        {
          en: "Are you making an exam tomorrow?",
          fa: "فردا امتحان می‌دهی؟",
          answerEn: "1 Can I take a photo of you? | 2 He's 25 but he never does his own washing. He takes his dirty clothes to his mother's. | 3 What do you think, yes or no? We must make a decision today. | 4 I have to make an appointment with the doctor. Do you have her phone number? | 5 I make mistakes when I speak English. | 6 Are you doing/taking an exam tomorrow?",
          answerFa: "۱ می‌توانم از شما عکس بگیرم؟ | ۲ او ۲۵ ساله است اما هرگز لباس‌هایش را خودش شست و روب نمی‌کند. او لباس‌های کثیفش را به خانه مادرش می‌برد. | ۳ شما فکر می‌کنید بله یا خیر؟ ما باید امروز تصمیم بگیریم. | ۴ باید با دکتر قرار بگذارم. شماره تلفنش را داری؟ | ۵ وقتی انگلیسی صحبت می‌کنم اشتباه می‌کنم. | ۶ فردا امتحان می‌دهی / می‌دهی؟"
        }
      ]
    }
  },
  {
    id: "viu-elem-l7",
    lesson: 7,
    title: "Come/came/come",
    titleFa: "come و came (آمدن، اهل جایی بودن)",
    source: "VIU Elementary 2nd ed — درس 7 (کتاب ص18-19)",
    paragraphs: [
      {
        en: "Come in is often the opposite of come out.",
        fa: "«come in» اغلب противополож «come out» است."
      },
      {
        en: "A woman came out of the shop with two big bags. (I was in the street.)",
        fa: "زنی با دو کیف بزرگ از مغازه بیرون آمد. (من در خیابان بودم.)"
      },
      {
        en: "You put your money in and the ticket comes out of the machine.",
        fa: "پولت را داخل می‌گذاری و بلیت از دستگاه بیرون می‌آید."
      },
      {
        en: "She went away for three days. She came back yesterday. (She is here again.)",
        fa: "او سه روز رفت. او دیروز برگشت. (او دوباره اینجاست.)"
      },
      {
        en: "They came back from Italy yesterday.",
        fa: "آن‌ها دیروز از ایتالیا برگشتند."
      },
      {
        en: "What time did you come home last night?",
        fa: "دیشب چه ساعتی به خانه آمدی؟"
      },
      {
        en: "Oh, about eleven o'clock.",
        fa: "اوه، حدود یازده."
      },
      {
        en: "What! Eleven! That's much too late!",
        fa: "چه! یازده! این خیلی دیر است!"
      },
      {
        en: "What country do you come from?",
        fa: "از چه کشوری هستی؟"
      },
      {
        en: "I'm from Norway. (or I come from Norway. or I'm Norwegian.)",
        fa: "من اهل نروژم. (یا: من از نروژ هستم. یا: من نروژی هستم.)"
      },
      {
        en: "We're going to a disco tonight. Do you want to come along? (= come with us)",
        fa: "امشب به دیسکو می‌رویم. می‌خواهی بیایی؟ (= با ما بیایی)"
      },
      {
        en: "Come and see me some time. (= visit me)",
        fa: "یک وقت بیا و من را ببین. (= به من سر بزن)"
      }
    ],
    exercise: {
      instruction: "7.1 Fill the gaps in the sentences. — 7.2 Answer these questions for yourself. — 7.4 Fill the gaps using come in the correct form. — 7.5 Look up these verbs in a dictionary. Write the meaning in your vocabulary book. You may find more than one meaning, but just write down one meaning for each verb. After a week, cover the verbs, look at your notes and see if you can remember the verbs.",
      instructionFa: "جاهای خالی جمله‌ها را پر کنید. — به این سؤال‌ها برای خودتان پاسخ دهید. — جاهای خالی را با شکل درست فعل come پر کنید. — این فعل‌ها را در فرهنگ لغت پیدا کنید و معنی‌شان را در دفتر لغات بنویسید. ممکن است بیش از یک معنی پیدا کنید، اما فقط یک معنی برای هر فعل بنویسید. بعد از یک هفته، فعل‌ها را بپوشانید، به یادداشت‌هایتان نگاه کنید و ببینید آیا فعل‌ها را به یاد می‌آورید.",
      items: [
        {
          en: "I put money in, but the ticket didn't come ________ the machine.",
          fa: "پول گذاشتم اما بلیت از دستگاه بیرون نیامد.",
          answerEn: "2 back home | 3 into | 4 from | 5 see | 6 out of / back from",
          answerFa: "۲ به خانه | ۳ به داخل | ۴ از | ۵ ببین | ۶ از خارج از / به عقب از"
        },
        {
          en: "A: I'm going to Taiwan tomorrow. B: Oh! When are you coming ________? A: Two weeks from now.",
          fa: "الف: فردا به تایوان می‌روم. ب: اوه! کی برمی‌گردی؟ الف: دو هفته دیگر.",
          answerEn: "2 back home | 3 into | 4 from | 5 see | 6 out of / back from",
          answerFa: "۲ به خانه | ۳ به داخل | ۴ از | ۵ ببین | ۶ از خارج از / به عقب از"
        },
        {
          en: "The teacher came ________ the classroom and started the lesson.",
          fa: "معلم وارد کلاس شد و درس را شروع کرد.",
          answerEn: "2 back home | 3 into | 4 from | 5 see | 6 out of / back from",
          answerFa: "۲ به خانه | ۳ به داخل | ۴ از | ۵ ببین | ۶ از خارج از / به عقب از"
        },
        {
          en: "A: Where do you come ________? B: I'm Brazilian.",
          fa: "الف: اهل کجا هستی؟ ب: من برزیلی‌ام.",
          answerEn: "2 back home | 3 into | 4 from | 5 see | 6 out of / back from",
          answerFa: "۲ به خانه | ۳ به داخل | ۴ از | ۵ ببین | ۶ از خارج از / به عقب از"
        },
        {
          en: "Come and ________ me at five o'clock; we can talk about it then.",
          fa: "ساعت پنج بیا و من را ببین؛ آن‌وقت می‌توانیم درباره‌اش صحبت کنیم.",
          answerEn: "2 back home | 3 into | 4 from | 5 see | 6 out of / back from",
          answerFa: "۲ به خانه | ۳ به داخل | ۴ از | ۵ ببین | ۶ از خارج از / به عقب از"
        },
        {
          en: "The children come ________ school at four o'clock.",
          fa: "بچه‌ها ساعت چهار از مدرسه می‌آیند.",
          answerEn: "2 back home | 3 into | 4 from | 5 see | 6 out of / back from",
          answerFa: "۲ به خانه | ۳ به داخل | ۴ از | ۵ ببین | ۶ از خارج از / به عقب از"
        },
        {
          en: "What time do you come home every day?",
          fa: "هر روز چه ساعتی به خانه می‌آیی؟",
          answerEn: "I usually come home at five-thirty.",
          answerFa: "من معمولاً ساعت پنج و نیم به خانه برمی‌گردم."
        },
        {
          en: "What country do you come from?",
          fa: "اهل چه کشوری هستی؟",
          answerEn: "I'm from / I come from Scotland/Jamaica/Pakistan/Latvia/Bolivia, etc.",
          answerFa: "من از اسکاتلند/جامائیکا/پاکستان/لتونی/بولیوی و... هستم/می‌آیم."
        },
        {
          en: "What do you do when you come into your classroom?",
          fa: "وقتی وارد کلاس می‌شوی چه می‌کنی؟",
          answerEn: "I sit down and talk to my friends / take out my books.",
          answerFa: "من می‌نشینم و با دوستام حرف می‌زنم / کتاب‌هایم را بیرون می‌آورم."
        },
        {
          en: "Have you ________ for your letters? They're on the table.",
          fa: "برای نامه‌هایت نیامده‌ای؟ روی میز هستند.",
          answerEn: "come",
          answerFa: "بیا"
        },
        {
          en: "She ________ back yesterday.",
          fa: "او دیروز برگشت.",
          answerEn: "came",
          answerFa: "آمد"
        },
        {
          en: "He ________ here every Tuesday.",
          fa: "او هر سه‌شنبه اینجا می‌آید.",
          answerEn: "comes",
          answerFa: "می‌آید"
        },
        {
          en: "________ you ________ to the school party tonight?",
          fa: "امشب به مهمانی مدرسه می‌آیی؟",
          answerEn: "Are ... coming",
          answerFa: "آیا ... می‌آیند"
        },
        {
          en: "1 come round  2 come across  3 come up",
          fa: "۱ come round ۲ come across ۳ come up",
          answerEn: "1 come round can mean 'come to someone's house/flat'. Do you want to come round this afternoon for a coffee? | 2 come across can mean 'meet/find for the first time'. I come across lots of new words when I read English books. | 3 come up can mean 'be mentioned / occur in conversation'. When new words come up in class, the teacher tells us the meaning.",
          answerFa: "۱ come round می‌تواند به معنی 'آمدن به خانه/آپارتمان کسی' باشد. دوست داری امروز بعد از ظهر برای یک قهوه بیایی؟ | ۲ come across می‌تواند به معنی 'ملاقات/یافتن برای اولین بار' باشد. وقتی کتاب‌های انگلیسی می‌خوانم، با کلمات جدید زیادی مواجه می‌شوم. | ۳ come up می‌تواند به معنی 'ذکر شدن / مطرح شدن در مکالمه' باشد. وقتی کلمات جدید در کلاس مطرح می‌شوند، معنی آن‌ها را به ما می‌گویند."
        }
      ]
    }
  },
  {
    id: "viu-elem-l8",
    lesson: 8,
    title: "Take/took/taken",
    titleFa: "take و took (سوار شدن، عکس گرفتن)",
    source: "VIU Elementary 2nd ed — درس 8 (کتاب ص20-21)",
    paragraphs: [
      {
        en: "It takes Alan 20 minutes to get to work.",
        fa: "الن ۲۰ دقیقه وقت می‌برد تا به سر کار برسد."
      },
      {
        en: "It takes Miriam 45 minutes to get to work.",
        fa: "میریام ۴۵ دقیقه وقت می‌برد تا به سر کار برسد."
      },
      {
        en: "I go to school/university every day. It takes me 30 minutes.",
        fa: "من هر روز به مدرسه/دانشگاه می‌روم. ۳۰ دقیقه برایم وقت می‌برد."
      },
      {
        en: "I do homework every day. It took me two hours yesterday.",
        fa: "من هر روز تکلیف انجام می‌دهم. دیروز دو ساعت وقت برد."
      },
      {
        en: "How long does it take to get to the station? 15 minutes in a taxi.",
        fa: "چقدر طول می‌کشد تا به ایستگاه برسیم؟ ۱۵ دقیقه با تاکسی."
      },
      {
        en: "Are you taking an English course? Yes.",
        fa: "آیا در دورهٔ زبان انگلیسی شرکت می‌کنی؟ بله."
      },
      {
        en: "Do you have to take an exam? Yes, at the end of the course.",
        fa: "آیا باید امتحان بدهی؟ بله، در پایان دوره."
      },
      {
        en: "I want to take some Japanese lessons.",
        fa: "می‌خواهم چند درس ژاپنی بگیرم."
      },
      {
        en: "How do you get to work? I take the bus.",
        fa: "چطور به سر کار می‌روی؟ اتوبوس سوار می‌شوم."
      },
      {
        en: "In Paris you can take the metro to the Eiffel Tower.",
        fa: "در پاریس می‌توانی با مترو به برج ایفل بروی."
      },
      {
        en: "How does Nik get to work? He takes the train.",
        fa: "نیک چطور به سر کار می‌رسد؟ او قطار سوار می‌شود."
      },
      {
        en: "Are you going out? Take an umbrella. It's raining.",
        fa: "می‌خواهی بیرون بروی؟ یک چتر بردار. باران می‌بارد."
      },
      {
        en: "Are you going to the beach? Take some water with you.",
        fa: "می‌خواهی به ساحل بروی؟ کمی آب با خودت بردار."
      },
      {
        en: "Sorry, you can't take your camera into the museum.",
        fa: "متأسفیم، نمی‌توانی دوربینت را به موزه ببری."
      },
      {
        en: "Can I take a photograph here?",
        fa: "آیا می‌توانم اینجا عکس بگیرم؟"
      }
    ],
    exercise: {
      instruction: "8.1 Fill the gaps for yourself. — 8.5 How long did it take you to do this unit?",
      instructionFa: "جای خالی‌ها را برای خودت پر کن. — انجام این درس چقدر برایت وقت برد؟",
      items: [
        {
          en: "1 It ................ me ................ minutes to get to school/university.",
          fa: "................ دقیقه برای رسیدن من به مدرسه/دانشگاه وقت می‌برد.",
          answerEn: "1 It takes me 10 minutes to get to university. | 2 It takes me an hour to go from Cambridge to London. | 3 It takes me an hour to do one unit of this book.",
          answerFa: "۱ من ۱۰ دقیقه طول می‌کشد به دانشگاه برسم. | ۲ من یک ساعت طول می‌کشد از کمبریج به لندن بروم. | ۳ من یک ساعت طول می‌کشد یک واحد از این کتاب را انجام دهم."
        },
        {
          en: "2 It takes me ................ minutes/hours to go from ................ to ................",
          fa: "................ دقیقه/ساعت وقت می‌برد تا از ................ به ................ بروم.",
          answerEn: "1 It takes me 10 minutes to get to university. | 2 It takes me an hour to go from Cambridge to London. | 3 It takes me an hour to do one unit of this book.",
          answerFa: "۱ من ۱۰ دقیقه طول می‌کشد به دانشگاه برسم. | ۲ من یک ساعت طول می‌کشد از کمبریج به لندن بروم. | ۳ من یک ساعت طول می‌کشد یک واحد از این کتاب را انجام دهم."
        },
        {
          en: "3 ................ takes me ................ to do one unit of this book.",
          fa: "................ برای انجام یک درس از این کتاب وقت می‌برد.",
          answerEn: "1 It takes me 10 minutes to get to university. | 2 It takes me an hour to go from Cambridge to London. | 3 It takes me an hour to do one unit of this book.",
          answerFa: "۱ من ۱۰ دقیقه طول می‌کشد به دانشگاه برسم. | ۲ من یک ساعت طول می‌کشد از کمبریج به لندن بروم. | ۳ من یک ساعت طول می‌کشد یک واحد از این کتاب را انجام دهم."
        }
      ]
    }
  },
  {
    id: "viu-elem-l9",
    lesson: 9,
    title: "Bring/brought/brought",
    titleFa: "bring و brought (آوردن، برگرداندن)",
    source: "VIU Elementary 2nd ed — درس 9 (کتاب ص22-23)",
    paragraphs: [
      {
        en: "Are you going to school? Take your books. (from here to the school)",
        fa: "داری به مدرسه می‌روی؟ کتاب‌هایت را ببر. (از اینجا به مدرسه)"
      },
      {
        en: "Are you going to the kitchen? Can you bring me a glass? (from the kitchen to here)",
        fa: "داری به آشپزخانه می‌روی؟ می‌توانی برایم یک لیوان بیاوری؟ (از آشپزخانه به اینجا)"
      },
      {
        en: "Please take this form to the secretary. (the secretary is there)",
        fa: "لطفاً این فرم را به منشی ببر. (منشی آنجاست)"
      },
      {
        en: "Come to my house tomorrow and bring your guitar. (for me, my house is here)",
        fa: "فردا به خانه‌ام بیا و گیتارت را بیاور. (برای من، خانه‌ام اینجاست)"
      },
      {
        en: "A: I've brought you some apples from my garden. B: Oh, thank you!",
        fa: "الف: چند سیب از باغم برایت آورده‌ام. ب: آه، ممنون!"
      },
      {
        en: "When she visits me, she always brings me flowers.",
        fa: "وقتی به دیدنم می‌آید، همیشه برایم گل می‌آورد."
      },
      {
        en: "It's raining. You can take my umbrella and bring it back tomorrow.",
        fa: "باران می‌بارد. می‌توانی چترم را ببری و فردا پس بیاوری."
      },
      {
        en: "TOM: This book is interesting.",
        fa: "تام: این کتاب جالب است."
      },
      {
        en: "ANN: Please take it with you and read it.",
        fa: "آن: لطفاً آن را با خودت ببر و بخوان."
      },
      {
        en: "TOM: Thanks. I'll bring it back on Friday.",
        fa: "تام: ممنون. جمعه پسش می‌آورم."
      },
      {
        en: "ANN: OK. No problem.",
        fa: "آن: باشه. مشکلی نیست."
      }
    ],
    exercise: {
      instruction: "9.1 Fill the gaps with take or bring. — 9.3 Match the words on the left with the words on the right. Draw lines. — 9.5 Are you in your English lesson now? If yes, look at (a). If no, look at (b).",
      instructionFa: "جای خالی‌ها را با take یا bring پر کنید. — کلمات سمت چپ را به کلمات سمت راست وصل کنید. خط بکشید. — آیا الان در کلاس انگلیسی هستی؟ اگر بله، به (a) نگاه کن. اگر نه، به (b) نگاه کن.",
      items: [
        {
          en: "Are you going to the shops? ........... an umbrella. It's raining.",
          fa: "داری به مغازه‌ها می‌روی؟ ........... یک چتر. باران می‌بارد.",
          answerEn: "2 bring 4 Take 6 bring | 3 bring 5 take",
          answerFa: "۲ bring ۴ Take ۶ bring | ۳ bring ۵ take"
        },
        {
          en: "'Don't forget to ................. your books tomorrow!' the teacher said to the class.",
          fa: "«فراموش نکن فردا ................. کتاب‌هایت!» معلم به کلاس گفت.",
          answerEn: "2 bring 4 Take 6 bring | 3 bring 5 take",
          answerFa: "۲ bring ۴ Take ۶ bring | ۳ bring ۵ take"
        },
        {
          en: "Are you going to the kitchen? Can you ................. me some water?",
          fa: "داری به آشپزخانه می‌روی؟ می‌توانی ................. کمی آب برایم؟",
          answerEn: "2 bring 4 Take 6 bring | 3 bring 5 take",
          answerFa: "۲ bring ۴ Take ۶ bring | ۳ bring ۵ take"
        },
        {
          en: "................. your camera with you when you go to Bangkok. It's beautiful there.",
          fa: "................. دوربینت را با خودت ببر وقتی به بانکوک می‌روی. آنجا زیباست.",
          answerEn: "2 bring 4 Take 6 bring | 3 bring 5 take",
          answerFa: "۲ bring ۴ Take ۶ bring | ۳ bring ۵ take"
        },
        {
          en: "Are you going to the secretary's office? Can you ................. these papers, please?",
          fa: "داری به دفتر منشی می‌روی؟ می‌توانی لطفاً ................. این برگه‌ها؟",
          answerEn: "2 bring 4 Take 6 bring | 3 bring 5 take",
          answerFa: "۲ bring ۴ Take ۶ bring | ۳ bring ۵ take"
        },
        {
          en: "Shall I ................. you a present from New York?",
          fa: "برایت یک هدیه از نیویورک .................؟",
          answerEn: "2 bring 4 Take 6 bring | 3 bring 5 take",
          answerFa: "۲ bring ۴ Take ۶ bring | ۳ bring ۵ take"
        },
        {
          en: "1 Yesterday he brought me",
          fa: "دیروز او برایم آورد",
          answerEn: "Yesterday he brought me some flowers.",
          answerFa: "دیروز او برای من چند گل آورد."
        },
        {
          en: "2 You must take",
          fa: "تو باید ببری",
          answerEn: "You must take your passport when you travel.",
          answerFa: "وقتی سفر می‌کنی باید گذرنامه‌ات را با خود ببری."
        },
        {
          en: "3 Come to my house and",
          fa: "به خانه‌ام بیا و",
          answerEn: "Come to my house and bring your guitar.",
          answerFa: "به خانه من بیا و گیتارت را با خود بیار."
        },
        {
          en: "4 Go to the secretary and take",
          fa: "به منشی برو و ببر",
          answerEn: "Go to the secretary and take these papers, please.",
          answerFa: "به منشی برو و لطفاً این اسناد را از او بگیر."
        },
        {
          en: "5 Everybody is going to bring",
          fa: "همه قرار است بیاورند",
          answerEn: "Everybody is going to bring food to the party.",
          answerFa: "همه قرار است برای مهمانی غذا بیاورند."
        },
        {
          en: "(a) Name three things you always bring to the lesson.",
          fa: "سه چیزی را که همیشه به کلاس می‌آوری نام ببر.",
          answerEn: "",
          answerFa: ""
        },
        {
          en: "(b) Name three things you always take to the lesson.",
          fa: "سه چیزی را که همیشه به کلاس می‌بری نام ببر.",
          answerEn: "",
          answerFa: ""
        },
        {
          en: "Name three things someone has brought you recently.",
          fa: "سه چیزی را که اخیراً کسی برایت آورده نام ببر.",
          answerEn: "",
          answerFa: ""
        }
      ]
    }
  },
  {
    id: "viu-elem-l10",
    lesson: 10,
    title: "Get/got/got",
    titleFa: "get و got (کار گرفتن، خسته شدن)",
    source: "VIU Elementary 2nd ed — درس 10 (کتاب ص24-25)",
    paragraphs: [
      {
        en: "It's light. It's getting dark. It's dark.",
        fa: "هوا روشن است. هوا دارد تاریک می‌شود. هوا تاریک است."
      },
      {
        en: "She's ill. She's getting better. She's better. / She's well.",
        fa: "او مریض است. حالش دارد بهتر می‌شود. حالش بهتر است. / او خوب شده است."
      },
      {
        en: "I'm getting tired. I want to go to bed.",
        fa: "دارم خسته می‌شوم. می‌خواهم بروم بخوابم."
      },
      {
        en: "It's raining! I'm getting wet!",
        fa: "دارد باران می‌بارد! دارم خیس می‌شوم!"
      },
      {
        en: "If you don't have something you can get it.",
        fa: "اگر چیزی را ندارید، می‌توانید آن را تهیه کنید."
      },
      {
        en: "I want to send a postcard. I have to get a stamp.",
        fa: "می‌خواهم کارت‌پستال بفرستم. باید تمبر بگیرم."
      },
      {
        en: "I've finished my studies. Now I want to get a job.",
        fa: "تحصیلاتم را تمام کرده‌ام. حالا می‌خواهم کار پیدا کنم."
      },
      {
        en: "My friend is ill! Please get a doctor.",
        fa: "دوستم مریض است! لطفاً دکتر بیاورید."
      },
      {
        en: "Do you want a drink? I can get some coffee.",
        fa: "چیزی می‌خواهید بخورید؟ می‌توانم قهوه بیاورم."
      },
      {
        en: "I'm going to the shop to get a newspaper.",
        fa: "دارم می‌روم مغازه تا روزنامه بخرم."
      },
      {
        en: "Where can I get a taxi?",
        fa: "از کجا می‌توانم تاکسی بگیرم؟"
      },
      {
        en: "How can I get to the airport? Take the airport bus at the bus station.",
        fa: "چطور می‌توانم به فرودگاه بروم؟ در ایستگاه اتوبوس اتوبوس فرودگاه را سوار شوید."
      },
      {
        en: "When you get to New York, ring me. OK, give me your number.",
        fa: "وقتی به نیویورک رسیدی، به من زنگ بزن. باشه، شماره‌ات را به من بده."
      },
      {
        en: "Maria and David are getting married in April.",
        fa: "ماریا و دیوید در ماه آوریل ازدواج می‌کنند."
      },
      {
        en: "When you get back from Hong Kong, ring me. (= return / come home)",
        fa: "وقتی از هنگ‌کنگ برگشتی، به من زنگ بزن. (یعنی بازگشتن / به خانه آمدن)"
      },
      {
        en: "(See also get up in Unit 23.)",
        fa: "(همچنین get up را در واحد ۲۳ ببینید.)"
      },
      {
        en: "When I get home, I have my lunch.",
        fa: "وقتی به خانه می‌رسم، ناهار می‌خورم."
      },
      {
        en: "I get there at 6 o'clock, so please ring me at 6.30.",
        fa: "ساعت ۶ آنجا می‌رسم، پس لطفاً ساعت ۶:۳۰ به من زنگ بزن."
      },
      {
        en: "[NOT get to home or get to there.]",
        fa: "[نادرست: get to home یا get to there.]"
      }
    ],
    exercise: {
      instruction: "10.2 Complete these sentences using get and a word from the box. — 10.3 What/Who do you get if ... — 10.5 Answer the questions.",
      instructionFa: "جمل‌ها را با get و یک کلمه از کادر کامل کنید. — اگر... چه چیزی/چه کسی می‌گیرید؟ — به سوال‌ها پاسخ دهید.",
      items: [
        {
          en: "The sun is going down. It's ________.",
          fa: "خورشید در حال غروب است. هوا دارد تاریک می‌شود.",
          answerEn: "2 it gets light. 4 'm getting wet! | 3 's getting better. 5 'm getting cold.",
          answerFa: "۲ روشن می‌شود. ۴ خیس می‌شوم! | ۳ بهتر می‌شود. ۵ سرد می‌شود."
        },
        {
          en: "When the sun comes up it ________",
          fa: "وقتی خورشید طلوع می‌کند، هوا روشن می‌شود.",
          answerEn: "2 it gets light. 4 'm getting wet! | 3 's getting better. 5 'm getting cold.",
          answerFa: "۲ روشن می‌شود. ۴ خیس می‌شوم! | ۳ بهتر می‌شود. ۵ سرد می‌شود."
        },
        {
          en: "She's in hospital but she ________",
          fa: "او در بیمارستان است اما حالش بهتر می‌شود.",
          answerEn: "2 it gets light. 4 'm getting wet! | 3 's getting better. 5 'm getting cold.",
          answerFa: "۲ روشن می‌شود. ۴ خیس می‌شوم! | ۳ بهتر می‌شود. ۵ سرد می‌شود."
        },
        {
          en: "It's raining! I ________!",
          fa: "باران می‌بارد! دارم خیس می‌شوم!",
          answerEn: "2 it gets light. 4 'm getting wet! | 3 's getting better. 5 'm getting cold.",
          answerFa: "۲ روشن می‌شود. ۴ خیس می‌شوم! | ۳ بهتر می‌شود. ۵ سرد می‌شود."
        },
        {
          en: "Please close the window. I ________",
          fa: "لطفاً پنجره را ببند. دارم سردم می‌شود.",
          answerEn: "2 it gets light. 4 'm getting wet! | 3 's getting better. 5 'm getting cold.",
          answerFa: "۲ روشن می‌شود. ۴ خیس می‌شوم! | ۳ بهتر می‌شود. ۵ سرد می‌شود."
        },
        {
          en: "you want to post a letter?",
          fa: "بخواهید نامه‌ای پست کنید؟",
          answerEn: "2 a doctor | 3 a glass | 4 a pen/pencil and paper | 5 a newspaper | 6 a taxi / a bus / a train | 7 a job",
          answerFa: "۲ یک پزشک | ۳ یک لیوان | ۴ خودکار/مداد و کاغذ | ۵ یک روزنامه | ۶ یک تاکسی / یک اتوبوس / یک قطار | ۷ یک شغل"
        },
        {
          en: "somebody is ill?",
          fa: "کسی مریض باشد؟",
          answerEn: "2 a doctor | 3 a glass | 4 a pen/pencil and paper | 5 a newspaper | 6 a taxi / a bus / a train | 7 a job",
          answerFa: "۲ یک پزشک | ۳ یک لیوان | ۴ خودکار/مداد و کاغذ | ۵ یک روزنامه | ۶ یک تاکسی / یک اتوبوس / یک قطار | ۷ یک شغل"
        },
        {
          en: "you want a drink of water?",
          fa: "بخواهید لیوانی آب بخورید؟",
          answerEn: "2 a doctor | 3 a glass | 4 a pen/pencil and paper | 5 a newspaper | 6 a taxi / a bus / a train | 7 a job",
          answerFa: "۲ یک پزشک | ۳ یک لیوان | ۴ خودکار/مداد و کاغذ | ۵ یک روزنامه | ۶ یک تاکسی / یک اتوبوس / یک قطار | ۷ یک شغل"
        },
        {
          en: "you want to write something down?",
          fa: "بخواهید چیزی بنویسید؟",
          answerEn: "2 a doctor | 3 a glass | 4 a pen/pencil and paper | 5 a newspaper | 6 a taxi / a bus / a train | 7 a job",
          answerFa: "۲ یک پزشک | ۳ یک لیوان | ۴ خودکار/مداد و کاغذ | ۵ یک روزنامه | ۶ یک تاکسی / یک اتوبوس / یک قطار | ۷ یک شغل"
        },
        {
          en: "you want to read the news?",
          fa: "بخواهید اخبار را بخوانید؟",
          answerEn: "2 a doctor | 3 a glass | 4 a pen/pencil and paper | 5 a newspaper | 6 a taxi / a bus / a train | 7 a job",
          answerFa: "۲ یک پزشک | ۳ یک لیوان | ۴ خودکار/مداد و کاغذ | ۵ یک روزنامه | ۶ یک تاکسی / یک اتوبوس / یک قطار | ۷ یک شغل"
        },
        {
          en: "you want to go to the airport?",
          fa: "بخواهید به فرودگاه بروید؟",
          answerEn: "2 a doctor | 3 a glass | 4 a pen/pencil and paper | 5 a newspaper | 6 a taxi / a bus / a train | 7 a job",
          answerFa: "۲ یک پزشک | ۳ یک لیوان | ۴ خودکار/مداد و کاغذ | ۵ یک روزنامه | ۶ یک تاکسی / یک اتوبوس / یک قطار | ۷ یک شغل"
        },
        {
          en: "you want to earn some money?",
          fa: "بخواهید کمی پول دربیاورید؟",
          answerEn: "2 a doctor | 3 a glass | 4 a pen/pencil and paper | 5 a newspaper | 6 a taxi / a bus / a train | 7 a job",
          answerFa: "۲ یک پزشک | ۳ یک لیوان | ۴ خودکار/مداد و کاغذ | ۵ یک روزنامه | ۶ یک تاکسی / یک اتوبوس / یک قطار | ۷ یک شغل"
        },
        {
          en: "In your country, how old are people when they get married?",
          fa: "در کشور شما مردم چند ساله هستند که ازدواج می‌کنند؟",
          answerEn: "Possible answers: 1 In Britain, people get married mostly when they are 20 to 30 years old. | 2 People usually get married at the weekend, mostly on Saturday. April, May and June are very popular months (spring and summer). | 3 I get home at about 5 o'clock. I get there by car. | 4 get",
          answerFa: "پاسخ‌های ممکن: ۱ در بریتانیا، مردم بیشتر وقتی ۲۰ تا ۳۰ ساله هستند ازدواج می‌کنند. | ۲ مردم معمولاً در آخر هفته ازدواج می‌کنند، بیشتر در روز شنبه. آوریل، مه و ژوین ماه‌های بسیار محبوبی هستند (بهار و تابستان). | ۳ من حدود ساعت ۵ به خانه می‌رسم. با ماشین آنجا می‌رسم. | ۴ get"
        },
        {
          en: "When do people get married? Which day? Which month(s)?",
          fa: "مردم چه وقت ازدواج می‌کنند؟ چه روزی؟ چه ماه(هایی)؟",
          answerEn: "Possible answers: 1 In Britain, people get married mostly when they are 20 to 30 years old. | 2 People usually get married at the weekend, mostly on Saturday. April, May and June are very popular months (spring and summer). | 3 I get home at about 5 o'clock. I get there by car. | 4 get",
          answerFa: "پاسخ‌های ممکن: ۱ در بریتانیا، مردم بیشتر وقتی ۲۰ تا ۳۰ ساله هستند ازدواج می‌کنند. | ۲ مردم معمولاً در آخر هفته ازدواج می‌کنند، بیشتر در روز شنبه. آوریل، مه و ژوین ماه‌های بسیار محبوبی هستند (بهار و تابستان). | ۳ من حدود ساعت ۵ به خانه می‌رسم. با ماشین آنجا می‌رسم. | ۴ get"
        },
        {
          en: "What time do you get home every day? How do you get there?",
          fa: "هر روز چه ساعتی به خانه می‌رسید؟ چگونه به آنجا می‌روید؟",
          answerEn: "Possible answers: 1 In Britain, people get married mostly when they are 20 to 30 years old. | 2 People usually get married at the weekend, mostly on Saturday. April, May and June are very popular months (spring and summer). | 3 I get home at about 5 o'clock. I get there by car. | 4 get",
          answerFa: "پاسخ‌های ممکن: ۱ در بریتانیا، مردم بیشتر وقتی ۲۰ تا ۳۰ ساله هستند ازدواج می‌کنند. | ۲ مردم معمولاً در آخر هفته ازدواج می‌کنند، بیشتر در روز شنبه. آوریل، مه و ژوین ماه‌های بسیار محبوبی هستند (بهار و تابستان). | ۳ من حدود ساعت ۵ به خانه می‌رسم. با ماشین آنجا می‌رسم. | ۴ get"
        },
        {
          en: "Fill the gap: Now you can look at the key and ________ the answers!",
          fa: "جای خالی را پر کنید: اکنون می‌توانید به کلید نگاه کنید و پاسخ‌ها را بگیرید!",
          answerEn: "Possible answers: 1 In Britain, people get married mostly when they are 20 to 30 years old. | 2 People usually get married at the weekend, mostly on Saturday. April, May and June are very popular months (spring and summer). | 3 I get home at about 5 o'clock. I get there by car. | 4 get",
          answerFa: "پاسخ‌های ممکن: ۱ در بریتانیا، مردم بیشتر وقتی ۲۰ تا ۳۰ ساله هستند ازدواج می‌کنند. | ۲ مردم معمولاً در آخر هفته ازدواج می‌کنند، بیشتر در روز شنبه. آوریل، مه و ژوین ماه‌های بسیار محبوبی هستند (بهار و تابستان). | ۳ من حدود ساعت ۵ به خانه می‌رسم. با ماشین آنجا می‌رسم. | ۴ get"
        }
      ]
    }
  },
  {
    id: "viu-elem-l11",
    lesson: 11,
    title: "Phrasal verbs",
    titleFa: "فعل‌های عبارتی (put on، turn down)",
    source: "VIU Elementary 2nd ed — درس 11 (کتاب ص26-27)",
    paragraphs: [
      {
        en: "I got up at 6.30 this morning. I'm tired now.",
        fa: "امروز صبح ساعت ۶:۳۰ بیدار شدم. حالا خسته‌ام."
      },
      {
        en: "I hated my sister when I was young but now we get on very well.",
        fa: "وقتی کوچک بودم از خواهرم متنفر بودم ولی حالا خیلی با هم خوب می‌سازیم."
      },
      {
        en: "He soon got over his cold. (= he got better quickly)",
        fa: "او خیلی زود از سرماخوردگی بهبود یافت."
      },
      {
        en: "He always turns on the TV at 9 o'clock to watch the news.",
        fa: "او همیشه ساعت ۹ تلویزیون را روشن می‌کند تا اخبار را ببیند."
      },
      {
        en: "It's a sunny day. Turn the light off.",
        fa: "روز آفتابی است. چراغ را خاموش کن."
      },
      {
        en: "Turn the TV up. I can't hear it.",
        fa: "صدای تلویزیون را بالا ببر. نمی‌شنوم."
      },
      {
        en: "Turn the TV down. It's too loud.",
        fa: "صدای تلویزیون را کم کن. زیادی بلند است."
      },
      {
        en: "Don't stop. Go on talking. It's very interesting.",
        fa: "نایست. به حرف زدن ادامه بده. خیلی جالب است."
      },
      {
        en: "A bomb went off in a London station today. Four people are still in hospital.",
        fa: "امروز بمبی در یک ایستگاه لندن منفجر شد. چهار نفر هنوز در بیمارستان هستند."
      },
      {
        en: "It's cold and windy outside. Put your coat on. or Put on your coat.",
        fa: "بیرون سرد و بادی است. کاپشت را بپوش."
      },
      {
        en: "Come on! We're late.",
        fa: "زود باش! دیر کرده‌ایم."
      },
      {
        en: "She turned down the stereo. (= made it not so loud)",
        fa: "او صدای ضبط را کم کرد."
      },
      {
        en: "She turned down the invitation. (= refused it)",
        fa: "او دعوت را رد کرد."
      },
      {
        en: "She did up her coat.",
        fa: "کاپشتش را بست."
      },
      {
        en: "She did up her flat.",
        fa: "آپارتمانش را بازسازی کرد."
      },
      {
        en: "Our plane takes off at 12.30. (= leaves the ground)",
        fa: "هواپیمای ما ساعت ۱۲:۳۰ بلند می‌شود."
      },
      {
        en: "She took off her shoes. (= removed them from her feet)",
        fa: "کفش‌هایش را درآورد."
      }
    ],
    exercise: {
      instruction: "11.1 Match a sentence on the left with a sentence on the right. Draw lines. — 11.3 What is happening in these pictures? Use one of the phrasal verbs from the opposite page to describe each picture. — 11.4 Organise the words on the opposite page into groups, in any way that makes sense to you, for example, clothes, movement.",
      instructionFa: "جمله‌های سمت چپ را با جمله‌های سمت راست مطابقت دهید و خط بکشید. — در این تصویرها چه اتفاقی می‌افتد؟ برای توصیف هر تصویر از یکی از افعال عبارتی صفحه مقابل استفاده کنید. — واژه‌های صفحه مقابل را به هر شکلی که برایتان معنادار است (مثلاً لباس، حرکت) گروه‌بندی کنید.",
      items: [
        {
          en: "1 It's getting late.",
          fa: "دارد دیر می‌شود.",
          answerEn: "1 c 2 d 3 g 4 f 5 b 6 h 7 e 8 a",
          answerFa: "۱ c ۲ d ۳ g ۴ f ۵ b ۶ h ۷ e ۸ a"
        },
        {
          en: "1 They are doing up the hotel.",
          fa: "آن‌ها در حال بازسازی هتل هستند.",
          answerEn: "2 Someone is doing up a shoe. | 3 A plane is taking off. | 4 Someone is turning on the oven.",
          answerFa: "۲ کسی در حال بستن کفش است. | ۳ یک هواپیما در حال پرواز است. | ۴ کسی در روشن کردن فر است."
        },
        {
          en: "2 ________",
          fa: "۲ ________",
          answerEn: "2 Someone is doing up a shoe. | 3 A plane is taking off. | 4 Someone is turning on the oven.",
          answerFa: "۲ کسی در حال بستن کفش است. | ۳ یک هواپیما در حال پرواز است. | ۴ کسی در روشن کردن فر است."
        },
        {
          en: "3 ________",
          fa: "۳ ________",
          answerEn: "2 Someone is doing up a shoe. | 3 A plane is taking off. | 4 Someone is turning on the oven.",
          answerFa: "۲ کسی در حال بستن کفش است. | ۳ یک هواپیما در حال پرواز است. | ۴ کسی در روشن کردن فر است."
        },
        {
          en: "4 ________",
          fa: "۴ ________",
          answerEn: "2 Someone is doing up a shoe. | 3 A plane is taking off. | 4 Someone is turning on the oven.",
          answerFa: "۲ کسی در حال بستن کفش است. | ۳ یک هواپیما در حال پرواز است. | ۴ کسی در روشن کردن فر است."
        }
      ]
    }
  },
  {
    id: "viu-elem-l12",
    lesson: 12,
    title: "Everyday things",
    titleFa: "کارهای روزمره (تلویزیون تماشا کردن، لباس شستن)",
    source: "VIU Elementary 2nd ed — درس 12 (کتاب ص28-29)",
    paragraphs: [
      {
        en: "How often do you read the newspaper / watch TV? Three times a week / every day, etc.",
        fa: "چند وقت یک‌بار روزنامه می‌خوانید / تلویزیون تماشا می‌کنید؟ سه بار در هفته / هر روز و غیره."
      },
      {
        en: "What time do you get up / go to work? Seven o'clock. / Half past eight. etc.",
        fa: "ساعت چند بیدار می‌شوید / به سر کار می‌روید؟ ساعت هفت. / هشت و نیم. و غیره."
      },
      {
        en: "How do you go to work? By bus/train/car, etc.",
        fa: "چگونه به سر کار می‌روید؟ با اتوبوس/قطار/ماشین و غیره."
      },
      {
        en: "We say I usually/normally get up at eight o'clock, but today I got up at eight-thirty. [NOT I used to / I'm used to get up at eight o'clock!]",
        fa: "می‌گوییم من معمولاً ساعت هشت بیدار می‌شوم، اما امروز ساعت هشت و نیم بیدار شدم. (نه: I used to / I'm used to get up at eight o'clock!)"
      }
    ],
    exercise: {
      instruction: "12.2 What do they usually do? — 12.3 Ask questions.",
      instructionFa: "آن‌ها معمولاً چه کاری می‌کنند؟ — سؤال بسازید.",
      items: [
        {
          en: "He listens to the radio every morning.",
          fa: "او هر روز صبح به رادیو گوش می‌دهد.",
          answerEn: "2 She washes her clothes every Saturday. | 3 He cleans the house every weekend. | 4 He watches TV (or television) every evening. | 5 She goes for a walk every Sunday.",
          answerFa: "۲ او هر شنبه لباس‌هایش را می‌شوید. | ۳ او هر آخر هفته خانه را تمیز می‌کند. | ۴ او هر شب تلویزیون تماشا می‌کند (یا television). | ۵ او هر یکشنبه پیاده‌روی می‌کند."
        },
        {
          en: "She w................ (every Saturday)",
          fa: "او .......... (هر شنبه)",
          answerEn: "2 She washes her clothes every Saturday. | 3 He cleans the house every weekend. | 4 He watches TV (or television) every evening. | 5 She goes for a walk every Sunday.",
          answerFa: "۲ او هر شنبه لباس‌هایش را می‌شوید. | ۳ او هر آخر هفته خانه را تمیز می‌کند. | ۴ او هر شب تلویزیون تماشا می‌کند (یا television). | ۵ او هر یکشنبه پیاده‌روی می‌کند."
        },
        {
          en: "He c................ (every weekend)",
          fa: "او .......... (هر آخر هفته)",
          answerEn: "2 She washes her clothes every Saturday. | 3 He cleans the house every weekend. | 4 He watches TV (or television) every evening. | 5 She goes for a walk every Sunday.",
          answerFa: "۲ او هر شنبه لباس‌هایش را می‌شوید. | ۳ او هر آخر هفته خانه را تمیز می‌کند. | ۴ او هر شب تلویزیون تماشا می‌کند (یا television). | ۵ او هر یکشنبه پیاده‌روی می‌کند."
        },
        {
          en: "He w................ (every evening)",
          fa: "او .......... (هر عصر)",
          answerEn: "2 She washes her clothes every Saturday. | 3 He cleans the house every weekend. | 4 He watches TV (or television) every evening. | 5 She goes for a walk every Sunday.",
          answerFa: "۲ او هر شنبه لباس‌هایش را می‌شوید. | ۳ او هر آخر هفته خانه را تمیز می‌کند. | ۴ او هر شب تلویزیون تماشا می‌کند (یا television). | ۵ او هر یکشنبه پیاده‌روی می‌کند."
        },
        {
          en: "She g................ (every Sunday)",
          fa: "او .......... (هر یکشنبه)",
          answerEn: "2 She washes her clothes every Saturday. | 3 He cleans the house every weekend. | 4 He watches TV (or television) every evening. | 5 She goes for a walk every Sunday.",
          answerFa: "۲ او هر شنبه لباس‌هایش را می‌شوید. | ۳ او هر آخر هفته خانه را تمیز می‌کند. | ۴ او هر شب تلویزیون تماشا می‌کند (یا television). | ۵ او هر یکشنبه پیاده‌روی می‌کند."
        },
        {
          en: "get up — What time do you get up? — Seven-thirty, usually.",
          fa: "بیدار شدن — چه ساعتی بیدار می‌شوید؟ — معمولاً ساعت هفت و نیم.",
          answerEn: "Possible questions: 2 How often do you go for a walk? | 3 How do you go to work? | 4 When do you have dinner?",
          answerFa: "سوالات ممکن: ۲ چقدر پیاده‌روی می‌کنی؟ | ۳ چطور به سر کار می‌روی؟ | ۴ چه زمانی شام می‌خوری؟"
        },
        {
          en: "go for a walk — How ... — Every Saturday.",
          fa: "پیاده‌روی رفتن — چگونه/چه وقت ... — هر شنبه.",
          answerEn: "Possible questions: 2 How often do you go for a walk? | 3 How do you go to work? | 4 When do you have dinner?",
          answerFa: "سوالات ممکن: ۲ چقدر پیاده‌روی می‌کنی؟ | ۳ چطور به سر کار می‌روی؟ | ۴ چه زمانی شام می‌خوری؟"
        },
        {
          en: "go to work — How ... — By train.",
          fa: "رفتن به سر کار — چگونه ... — با قطار.",
          answerEn: "Possible questions: 2 How often do you go for a walk? | 3 How do you go to work? | 4 When do you have dinner?",
          answerFa: "سوالات ممکن: ۲ چقدر پیاده‌روی می‌کنی؟ | ۳ چطور به سر کار می‌روی؟ | ۴ چه زمانی شام می‌خوری؟"
        },
        {
          en: "have dinner — When ... — Between seven and eight o'clock, usually.",
          fa: "شام خوردن — چه وقت ... — معمولاً بین ساعت هفت و هشت.",
          answerEn: "Possible questions: 2 How often do you go for a walk? | 3 How do you go to work? | 4 When do you have dinner?",
          answerFa: "سوالات ممکن: ۲ چقدر پیاده‌روی می‌کنی؟ | ۳ چطور به سر کار می‌روی؟ | ۴ چه زمانی شام می‌خوری؟"
        }
      ]
    }
  },
  {
    id: "viu-elem-l13",
    lesson: 13,
    title: "Talking",
    titleFa: "گفت‌وگو کردن (say، tell)",
    source: "VIU Elementary 2nd ed — درس 13 (کتاب ص30-31)",
    paragraphs: [
      {
        en: "She said 'This is horrible!'",
        fa: "او گفت: «این وحشتناک است!»"
      },
      {
        en: "He said that he wanted a drink.",
        fa: "او گفت که یک نوشیدنی می‌خواهد."
      },
      {
        en: "A: How do you say 'book' in Spanish? B: 'Libro'.",
        fa: "الف: «کتاب» به اسپانیایی چه می‌شود؟ ب: «Libro»."
      },
      {
        en: "He told me his name.",
        fa: "او اسمش را به من گفت."
      },
      {
        en: "Can you tell me where the bus station is, please?",
        fa: "می‌توانید بگویید ایستگاه اتوبوس کجاست، لطفاً؟"
      },
      {
        en: "He told me how to send a fax.",
        fa: "او به من گفت چطور فکس بفرستم."
      },
      {
        en: "Tell me when you want to have dinner.",
        fa: "به من بگو کی می‌خواهی شام بخوری."
      },
      {
        en: "My sister asked me where I was going.",
        fa: "خواهرم از من پرسید کجا می‌رفتم."
      },
      {
        en: "A: Can I ask you a question? B: Yes. A: What day of the week were you born? B: Thursday.",
        fa: "الف: می‌توانم یک سؤال بپرسم؟ ب: بله. الف: چه روزی از هفته به دنیا آمدی؟ ب: پنجشنبه."
      },
      {
        en: "I asked him to turn off his radio.",
        fa: "از او خواستم رادیویش را خاموش کند."
      },
      {
        en: "She asked for the bill.",
        fa: "او صورت‌حساب را خواست."
      },
      {
        en: "Do you speak Japanese?",
        fa: "آیا ژاپنی صحبت می‌کنی؟"
      },
      {
        en: "I like talking to you.",
        fa: "از صحبت با تو خوشم می‌آید."
      },
      {
        en: "Can you answer the telephone / the door, please?",
        fa: "می‌توانی لطفاً تلفن / در را جواب بدهی؟"
      },
      {
        en: "I wrote a letter to him but he did not reply.",
        fa: "به او نامه نوشتم ولی او پاسخ نداد."
      }
    ],
    exercise: {
      instruction: "13.1 Fill the gaps with the correct form of say or tell. — 13.3 Match the verbs on the left with the words on the right. Draw lines. — 13.4 On the left are some things in different languages. Can you match them with the sentences on the right? Draw lines.",
      instructionFa: "جاهای خالی را با شکل درست say یا tell پر کنید. — افعال سمت چپ را با کلمات سمت راست وصل کنید. — عبارات به زبان‌های مختلف سمت چپ را با جملات سمت راست وصل کنید.",
      items: [
        {
          en: "1 Can you ________ me where the Plaza Hotel is, please?",
          fa: "می‌توانی بگویی هتل پلازا کجاست، لطفاً؟",
          answerEn: "2 told 3 said 4 tell; said 5 said 6 said",
          answerFa: "۲ told ۳ said ۴ tell; said ۵ said ۶ said"
        },
        {
          en: "2 She ________ me her name.",
          fa: "او اسمش را به من گفت.",
          answerEn: "2 told 3 said 4 tell; said 5 said 6 said",
          answerFa: "۲ told ۳ said ۴ tell; said ۵ said ۶ said"
        },
        {
          en: "3 I ________ goodbye to her.",
          fa: "من با او خداحافظی کردم.",
          answerEn: "2 told 3 said 4 tell; said 5 said 6 said",
          answerFa: "۲ told ۳ said ۴ tell; said ۵ said ۶ said"
        },
        {
          en: "4 'Please, ________ me a story,' the little boy ________.",
          fa: "«لطفاً برایم قصه بگو،» پسر کوچک گفت.",
          answerEn: "2 told 3 said 4 tell; said 5 said 6 said",
          answerFa: "۲ told ۳ said ۴ tell; said ۵ said ۶ said"
        },
        {
          en: "5 'Come here!' the police officer ________.",
          fa: "«بیا اینجا!» افسر پلیس گفت.",
          answerEn: "2 told 3 said 4 tell; said 5 said 6 said",
          answerFa: "۲ told ۳ said ۴ tell; said ۵ said ۶ said"
        },
        {
          en: "6 The teacher ________ that the students were very good.",
          fa: "معلم گفت که دانش‌آموزان خیلی خوب بودند.",
          answerEn: "2 told 3 said 4 tell; said 5 said 6 said",
          answerFa: "۲ told ۳ said ۴ tell; said ۵ said ۶ said"
        },
        {
          en: "1 Say",
          fa: "بگو",
          answerEn: "Say Happy New Year",
          answerFa: "سال نو مبارک بگو"
        },
        {
          en: "2 Answer",
          fa: "جواب بده",
          answerEn: "Answer the door",
          answerFa: "در را باز کن"
        },
        {
          en: "3 Ask for",
          fa: "درخواست کن",
          answerEn: "Ask for the bill",
          answerFa: "صورت‌حساب را بخواه"
        },
        {
          en: "4 Reply to",
          fa: "پاسخ بده به",
          answerEn: "Reply to a letter",
          answerFa: "نامه‌ای را پاسخ بده"
        },
        {
          en: "5 Tell",
          fa: "بگو به",
          answerEn: "Tell a joke",
          answerFa: "طنز بگو"
        },
        {
          en: "6 Talk to",
          fa: "صحبت کن با",
          answerEn: "Talk to a friend",
          answerFa: "با دوستت حرف بزن"
        },
        {
          en: "7 Ask",
          fa: "بپرس",
          answerEn: "Ask someone to help you. We can also say 'answer a letter', but not 'reply to the door'!",
          answerFa: "از کسی بخواه که به تو کمک کند. ما می‌توانیم 'answer a letter' هم بگوییم، اما نه 'reply to the door'!"
        },
        {
          en: "1 La cuenta, por favor.",
          fa: "صورت‌حساب، لطفاً (اسپانیایی)",
          answerEn: "Ask for the bill in Spanish.",
          answerFa: "صورت‌حساب را به اسپانیایی بخواه."
        },
        {
          en: "2 Berapa ini?",
          fa: "این چند است؟ (مالایی)",
          answerEn: "Ask how much something is in Malay.",
          answerFa: "بپرس که چیزی چقدر است به زبان مالایی."
        },
        {
          en: "3 God jul!",
          fa: "کریسمس مبارک (سوئدی)",
          answerEn: "Say Merry Christmas in Swedish.",
          answerFa: "کریسمس مبارک را به سوئدی بگو."
        },
        {
          en: "4 Kon'nichi wa.",
          fa: "صبح/روز بخیر (ژاپنی)",
          answerEn: "Say good morning in Japanese.",
          answerFa: "صبح بخیر را به ژاپنی بگو."
        },
        {
          en: "5 Shukran.",
          fa: "متشکرم (عربی)",
          answerEn: "Say thank you in Arabic.",
          answerFa: "ممنون را به عربی بگو."
        }
      ]
    }
  },
  {
    id: "viu-elem-l14",
    lesson: 14,
    title: "Moving",
    titleFa: "جابه‌جایی (قدم زدن، حمل کردن)",
    source: "VIU Elementary 2nd ed — درس 14 (کتاب ص32-33)",
    paragraphs: [
      {
        en: "How did you get to Istanbul? We flew there.",
        fa: "چطور به استانبول رفتی؟ آنجا با هواپیما رفتیم."
      },
      {
        en: "If you catch the bus, train or plane, you arrive in time to get it.",
        fa: "اگر به اتوبوس، قطار یا هواپیما برسی، به‌موقع می‌رسی و سوارش می‌شوی."
      },
      {
        en: "If you miss the bus, train or plane, you arrive too late to get it.",
        fa: "اگر اتوبوس، قطار یا هواپیما را از دست بدهی، خیلی دیر می‌رسی و جا می‌مانی."
      },
      {
        en: "You arrive at or in a place [NOT to a place]. The train arrived in Tokyo on time. The plane arrived late at Heathrow.",
        fa: "برای رسیدن به جایی از at یا in استفاده می‌کنیم (نه to). قطار به‌موقع به توکیو رسید. هواپیما دیر در هیثرو به مقصد رسید."
      },
      {
        en: "Tip: When you are travelling you will probably see a lot of notices in English. Make a note of any new words and expressions you see.",
        fa: "نکته: وقتی در سفر هستی احتمالاً اعلان‌های زیادی به انگلیسی می‌بینی. از هر واژه و اصطلاح تازه‌ای که می‌بینی یادداشت بردار."
      },
      {
        en: "See Unit 41 (Travelling) for more words about transport.",
        fa: "برای واژه‌های بیشتر درباره حمل‌ونقل، واحد ۴۱ (سفر) را ببین."
      },
      {
        en: "Please pass the salt.",
        fa: "لطفاً نمک را رد بده."
      },
      {
        en: "Can I help you carry your luggage?",
        fa: "می‌خواهید در حمل چمدانتان کمکتان کنم؟"
      }
    ],
    exercise: {
      instruction: "14.1 Fill the gaps with verbs from A opposite. Write them in the correct form. — 14.3 Answer these questions. Use every day, once a week, once a year or never. — 14.4 What other things do we often ask people to pass at the dinner table? Write down Please pass + a noun six times. — 14.5 Put these sentences into the past tense with the word yesterday.",
      instructionFa: "جاهای خالی را با فعل‌های از بخش A صفحه مقابل پر کنید و آن‌ها را در شکل صحیح بنویسید. — به این سؤال‌ها پاسخ بدهید. از every day، once a week، once a year یا never استفاده کنید. — چه چیزهای دیگری را معمولاً در سر سفره از دیگران می‌خواهیم که رد کنند؟ شش بار Please pass + یک اسم بنویسید. — این جملات را با کلمه yesterday به زمان گذشته ببرید.",
      items: [
        {
          en: "1 Jack likes ________ round the park every morning but Betty prefers ________ round it with her dog.",
          fa: "جک هر روز صبح دویدن (jogging) در پارک را دوست دارد اما بتتی ترجیح می‌دهد با سگش پیاده دور آن بگردد.",
          answerEn: "2 danced 3 swims 4 run 5 climbing 6 fell 7 jumped; swam 8 walk",
          answerFa: "۲ danced ۳ swims ۴ run 5 climbing 6 fell 7 jumped; swam 8 walk"
        },
        {
          en: "2 Everyone ________ at the party last night.",
          fa: "دیشب همه در مهمانی ________ (رقصیدند).",
          answerEn: "2 danced 3 swims 4 run 5 climbing 6 fell 7 jumped; swam 8 walk",
          answerFa: "۲ danced ۳ swims ۴ run 5 climbing 6 fell 7 jumped; swam 8 walk"
        },
        {
          en: "3 Every day Jane ________ ten lengths of the swimming pool before breakfast.",
          fa: "هر روز جانه پیش از صبحانه ________ (شنا) ده طول استخر را می‌پیماید.",
          answerEn: "2 danced 3 swims 4 run 5 climbing 6 fell 7 jumped; swam 8 walk",
          answerFa: "۲ danced ۳ swims ۴ run 5 climbing 6 fell 7 jumped; swam 8 walk"
        },
        {
          en: "4 James can ________ very fast. He has won a lot of races.",
          fa: "جیمز می‌تواند خیلی سریع ________ (بدود). او مسابقه‌های زیادی برده است.",
          answerEn: "2 danced 3 swims 4 run 5 climbing 6 fell 7 jumped; swam 8 walk",
          answerFa: "۲ danced ۳ swims ۴ run 5 climbing 6 fell 7 jumped; swam 8 walk"
        },
        {
          en: "5 Robert loves ________ hills.",
          fa: "رابرت عاشق ________ (کوه‌پیمایی تپه‌ها) است.",
          answerEn: "2 danced 3 swims 4 run 5 climbing 6 fell 7 jumped; swam 8 walk",
          answerFa: "۲ danced ۳ swims ۴ run 5 climbing 6 fell 7 jumped; swam 8 walk"
        },
        {
          en: "6 The old lady ________ on her way home and broke her arm.",
          fa: "پیرزن در راه خانه ________ (زمین خورد) و بازویش شکست.",
          answerEn: "2 danced 3 swims 4 run 5 climbing 6 fell 7 jumped; swam 8 walk",
          answerFa: "۲ danced ۳ swims ۴ run 5 climbing 6 fell 7 jumped; swam 8 walk"
        },
        {
          en: "7 Sandra ________ into the swimming pool and quickly ________ to the other side.",
          fa: "ساندرا ________ (به داخل استخر شیرجه زد) و به‌سرعت ________ تا آن طرف دیگر.",
          answerEn: "2 danced 3 swims 4 run 5 climbing 6 fell 7 jumped; swam 8 walk",
          answerFa: "۲ danced ۳ swims ۴ run 5 climbing 6 fell 7 jumped; swam 8 walk"
        },
        {
          en: "8 It is much better for you to ________ to work than to go by car.",
          fa: "اینکه شما ________ (پیاده) به سر کار بروید خیلی بهتر از رفتن با ماشین است.",
          answerEn: "2 danced 3 swims 4 run 5 climbing 6 fell 7 jumped; swam 8 walk",
          answerFa: "۲ danced ۳ swims ۴ run 5 climbing 6 fell 7 jumped; swam 8 walk"
        },
        {
          en: "1 How often do you walk to work or school?",
          fa: "چند وقت یک‌بار پیاده به سر کار یا مدرسه می‌روی؟",
          answerEn: "Possible answers: 2 I ride my bike once a week. | 3 I swim in the sea once a year. I swim in a pool once a week. | 4 I never jog. | 5 I drive my car every day. | 6 I go dancing once a month. | 7 I go climbing once a year.",
          answerFa: "پاسخ‌های ممکن: ۲ من هفته‌ای یک بار با دوچرخه می‌روم. | ۳ من سالی یک بار در دریا شنا می‌کنم. هفته‌ای یک بار در استخر شنا می‌کنم. | ۴ من هرگز دویدن را نمی‌روم. | ۵ من هر روز با ماشین رانندگی می‌کنم. | ۶ من ماهی یک بار می‌رقصم. | ۷ من سالی یک بار کوهنوردی می‌روم."
        },
        {
          en: "2 Have you got a bike? How often do you ride it?",
          fa: "دوچرخه داری؟ چند وقت یک‌بار آن را می‌رانی؟",
          answerEn: "Possible answers: 2 I ride my bike once a week. | 3 I swim in the sea once a year. I swim in a pool once a week. | 4 I never jog. | 5 I drive my car every day. | 6 I go dancing once a month. | 7 I go climbing once a year.",
          answerFa: "پاسخ‌های ممکن: ۲ من هفته‌ای یک بار با دوچرخه می‌روم. | ۳ من سالی یک بار در دریا شنا می‌کنم. هفته‌ای یک بار در استخر شنا می‌کنم. | ۴ من هرگز دویدن را نمی‌روم. | ۵ من هر روز با ماشین رانندگی می‌کنم. | ۶ من ماهی یک بار می‌رقصم. | ۷ من سالی یک بار کوهنوردی می‌روم."
        },
        {
          en: "3 How often do you go swimming? Do you go in the sea or in a swimming pool?",
          fa: "چند وقت یک‌بار برای شنا می‌روی؟ به دریا می‌روی یا استخر؟",
          answerEn: "Possible answers: 2 I ride my bike once a week. | 3 I swim in the sea once a year. I swim in a pool once a week. | 4 I never jog. | 5 I drive my car every day. | 6 I go dancing once a month. | 7 I go climbing once a year.",
          answerFa: "پاسخ‌های ممکن: ۲ من هفته‌ای یک بار با دوچرخه می‌روم. | ۳ من سالی یک بار در دریا شنا می‌کنم. هفته‌ای یک بار در استخر شنا می‌کنم. | ۴ من هرگز دویدن را نمی‌روم. | ۵ من هر روز با ماشین رانندگی می‌کنم. | ۶ من ماهی یک بار می‌رقصم. | ۷ من سالی یک بار کوهنوردی می‌روم."
        },
        {
          en: "4 How often do you go jogging?",
          fa: "چند وقت یک‌بار دویدن (jogging) می‌روی؟",
          answerEn: "Possible answers: 2 I ride my bike once a week. | 3 I swim in the sea once a year. I swim in a pool once a week. | 4 I never jog. | 5 I drive my car every day. | 6 I go dancing once a month. | 7 I go climbing once a year.",
          answerFa: "پاسخ‌های ممکن: ۲ من هفته‌ای یک بار با دوچرخه می‌روم. | ۳ من سالی یک بار در دریا شنا می‌کنم. هفته‌ای یک بار در استخر شنا می‌کنم. | ۴ من هرگز دویدن را نمی‌روم. | ۵ من هر روز با ماشین رانندگی می‌کنم. | ۶ من ماهی یک بار می‌رقصم. | ۷ من سالی یک بار کوهنوردی می‌روم."
        },
        {
          en: "5 How often do you drive a car?",
          fa: "چند وقت یک‌بار ماشین می‌رانی؟",
          answerEn: "Possible answers: 2 I ride my bike once a week. | 3 I swim in the sea once a year. I swim in a pool once a week. | 4 I never jog. | 5 I drive my car every day. | 6 I go dancing once a month. | 7 I go climbing once a year.",
          answerFa: "پاسخ‌های ممکن: ۲ من هفته‌ای یک بار با دوچرخه می‌روم. | ۳ من سالی یک بار در دریا شنا می‌کنم. هفته‌ای یک بار در استخر شنا می‌کنم. | ۴ من هرگز دویدن را نمی‌روم. | ۵ من هر روز با ماشین رانندگی می‌کنم. | ۶ من ماهی یک بار می‌رقصم. | ۷ من سالی یک بار کوهنوردی می‌روم."
        },
        {
          en: "6 How often do you go dancing?",
          fa: "چند وقت یک‌بار برای رقص می‌روی؟",
          answerEn: "Possible answers: 2 I ride my bike once a week. | 3 I swim in the sea once a year. I swim in a pool once a week. | 4 I never jog. | 5 I drive my car every day. | 6 I go dancing once a month. | 7 I go climbing once a year.",
          answerFa: "پاسخ‌های ممکن: ۲ من هفته‌ای یک بار با دوچرخه می‌روم. | ۳ من سالی یک بار در دریا شنا می‌کنم. هفته‌ای یک بار در استخر شنا می‌کنم. | ۴ من هرگز دویدن را نمی‌روم. | ۵ من هر روز با ماشین رانندگی می‌کنم. | ۶ من ماهی یک بار می‌رقصم. | ۷ من سالی یک بار کوهنوردی می‌روم."
        },
        {
          en: "7 Do you often go climbing?",
          fa: "معمولاً کوه‌نوردی می‌روی؟",
          answerEn: "Possible answers: 2 I ride my bike once a week. | 3 I swim in the sea once a year. I swim in a pool once a week. | 4 I never jog. | 5 I drive my car every day. | 6 I go dancing once a month. | 7 I go climbing once a year.",
          answerFa: "پاسخ‌های ممکن: ۲ من هفته‌ای یک بار با دوچرخه می‌روم. | ۳ من سالی یک بار در دریا شنا می‌کنم. هفته‌ای یک بار در استخر شنا می‌کنم. | ۴ من هرگز دویدن را نمی‌روم. | ۵ من هر روز با ماشین رانندگی می‌کنم. | ۶ من ماهی یک بار می‌رقصم. | ۷ من سالی یک بار کوهنوردی می‌روم."
        },
        {
          en: "Please pass + a noun six times. (Example: Please pass the sugar.)",
          fa: "شش بار «Please pass + اسم» بنویسید. (مثال: لطفاً شکر را بدهید.)",
          answerEn: "Possible answers: Please pass the salt. Please pass the pepper. Please pass the bread. Please pass the water. Please pass the salad. Please pass the sauce.",
          answerFa: "پاسخ‌های ممکن: لطفاً نمک را به من بده. لطفاً فلفل را به من بده. لطفاً نان را به من بده. لطفاً آب را به من بده. لطفاً سالاد را به من بده. لطفاً سس را به من بده."
        },
        {
          en: "1 Jim runs a mile every day.",
          fa: "جیم هر روز یک مایل می‌دود.",
          answerEn: "2 Maria drove her grandmother to the city yesterday. | 3 Bill caught the 9.45 train to London yesterday. | 4 I took a taxi home from the station yesterday. | 5 Jane fell when she rode her bike yesterday.",
          answerFa: "2 دیروز ماریا مادربزرگش را به شهر برد. | 3 دیروز بیل قطار ۹:۴۵ به لندن را سوار شد. | 4 دیروز از ایستگاه تا خانه با تاکسی رفتم. | 5 دیروز جین وقتی با دوچرخهش می‌رفت، افتاد."
        },
        {
          en: "2 Maria often drives her grandmother to the city.",
          fa: "ماریا اغلب مادربزرگش را با ماشین به شهر می‌برد.",
          answerEn: "2 Maria drove her grandmother to the city yesterday. | 3 Bill caught the 9.45 train to London yesterday. | 4 I took a taxi home from the station yesterday. | 5 Jane fell when she rode her bike yesterday.",
          answerFa: "2 دیروز ماریا مادربزرگش را به شهر برد. | 3 دیروز بیل قطار ۹:۴۵ به لندن را سوار شد. | 4 دیروز از ایستگاه تا خانه با تاکسی رفتم. | 5 دیروز جین وقتی با دوچرخهش می‌رفت، افتاد."
        },
        {
          en: "3 Bill catches the 9.45 train to London every day.",
          fa: "بیل هر روز قطار ساعت ۹:۴۵ به لندن را سوار می‌شود.",
          answerEn: "2 Maria drove her grandmother to the city yesterday. | 3 Bill caught the 9.45 train to London yesterday. | 4 I took a taxi home from the station yesterday. | 5 Jane fell when she rode her bike yesterday.",
          answerFa: "2 دیروز ماریا مادربزرگش را به شهر برد. | 3 دیروز بیل قطار ۹:۴۵ به لندن را سوار شد. | 4 دیروز از ایستگاه تا خانه با تاکسی رفتم. | 5 دیروز جین وقتی با دوچرخهش می‌رفت، افتاد."
        },
        {
          en: "4 I sometimes take a taxi home from the station.",
          fa: "من گاهی از ایستگاه تا خانه تاکسی می‌گیرم.",
          answerEn: "2 Maria drove her grandmother to the city yesterday. | 3 Bill caught the 9.45 train to London yesterday. | 4 I took a taxi home from the station yesterday. | 5 Jane fell when she rode her bike yesterday.",
          answerFa: "2 دیروز ماریا مادربزرگش را به شهر برد. | 3 دیروز بیل قطار ۹:۴۵ به لندن را سوار شد. | 4 دیروز از ایستگاه تا خانه با تاکسی رفتم. | 5 دیروز جین وقتی با دوچرخهش می‌رفت، افتاد."
        },
        {
          en: "5 Jane often falls when she rides her bike.",
          fa: "جانه اغلب وقتی دوچرخه‌اش را می‌راند می‌افتد.",
          answerEn: "2 Maria drove her grandmother to the city yesterday. | 3 Bill caught the 9.45 train to London yesterday. | 4 I took a taxi home from the station yesterday. | 5 Jane fell when she rode her bike yesterday.",
          answerFa: "2 دیروز ماریا مادربزرگش را به شهر برد. | 3 دیروز بیل قطار ۹:۴۵ به لندن را سوار شد. | 4 دیروز از ایستگاه تا خانه با تاکسی رفتم. | 5 دیروز جین وقتی با دوچرخهش می‌رفت، افتاد."
        }
      ]
    }
  },
  {
    id: "viu-elem-l15",
    lesson: 15,
    title: "Conjunctions and connecting words",
    titleFa: "حروف ربط و واژه‌های پیوند (because، only)",
    source: "VIU Elementary 2nd ed — درس 15 (کتاب ص34-35)",
    paragraphs: [
      {
        en: "We went home and went straight to bed.",
        fa: "به خانه رفتیم و مستقیم به رختخواب رفتیم."
      },
      {
        en: "They are rich but they aren't happy.",
        fa: "آنها ثروتمندند اما خوشحال نیستند."
      },
      {
        en: "We went home because we were tired.",
        fa: "به خانه رفتیم چون خسته بودیم."
      },
      {
        en: "We went home early, so we missed the end of the concert.",
        fa: "زود به خانه رفتیم، بنابراین پایان کنسرت را از دست دادیم."
      },
      {
        en: "We went home when Jane wanted to.",
        fa: "وقتی جین خواست، به خانه رفتیم."
      },
      {
        en: "We went home before the concert ended.",
        fa: "قبل از اینکه کنسرت تمام شود به خانه رفتیم."
      },
      {
        en: "We went home after Max Jones had sung his first song.",
        fa: "بعد از اینکه مکس جونز اولین آهنگش را خواند، به خانه رفتیم."
      },
      {
        en: "We went home although / though we did not really want to.",
        fa: "با اینکه واقعاً نمی‌خواستیم، به خانه رفتیم."
      },
      {
        en: "We will go home if we are tired.",
        fa: "اگر خسته باشیم به خانه خواهیم رفت."
      },
      {
        en: "He sleeps only 3 hours every night.",
        fa: "او هر شب فقط ۳ ساعت می‌خوابد."
      },
      {
        en: "Even their 10-year-old son works in the shop.",
        fa: "حتی پسر ده‌ساله‌شان در مغازه کار می‌کند."
      },
      {
        en: "She looks like her dad.",
        fa: "او شبیه پدرش است."
      },
      {
        en: "She works harder than he does.",
        fa: "او سخت‌تر از او کار می‌کند."
      },
      {
        en: "He works in the shop and she does also / too / as well.",
        fa: "او در مغازه کار می‌کند و او هم کار می‌کند."
      }
    ],
    exercise: {
      instruction: "15.2 Write down ten sentences from the table. Use each of the conjunctions once. — 15.3 Write each of the conjunctions in A in your own language. — 15.4 Fill in the gaps with words from the table in B. — 15.5 Think about your family and your habits. Write sentences using only, even, than, like, also, too and as well about your habits.",
      instructionFa: "ده جمله از جدول بنویسید. از هر حرف ربط فقط یک بار استفاده کنید. — هر یک از حروف ربط بخش A را به زبان خودتان بنویسید. — جاهای خالی را با کلمات جدول بخش B پر کنید. — به خانواده و عادت‌های خود فکر کنید. جمله‌هایی با کلمات only، even، than، like، also، too و as well درباره عادت‌های خود بنویسید.",
      items: [
        {
          en: "Mary agreed to marry Paul / Mary will marry Paul",
          fa: "مری موافقت کرد با پل ازدواج کند / مری با پل ازدواج خواهد کرد.",
          answerEn: "Possible sentences: Mary agreed to marry Paul after they decided to set up a business together. | Mary will marry Paul although/though she doesn't love him. | Mary agreed to marry Paul and they had two sons. | Mary agreed to marry Paul because he was a pop star. | Mary will marry Paul before he moves to London. | Mary will marry Paul but she doesn't love him. | Mary agreed to marry Paul if he moved to London. | Mary agreed to marry Paul so he moved to London. | Mary will marry Paul when he moves to London.",
          answerFa: "جملات ممکن: مری با پل ازدواج کرد بعد از اینکه تصمیم گرفتند با هم کسب و کار راه بیندازند. | مری با پل ازدواج می‌کند هرچند/با اینکه او را دوست ندارد. | مری با پل ازدواج کرد و آنها دو پسر داشتند. | مری با پل ازدواج کرد چون او یک ستاره پاپ بود. | مری با پل ازدواج می‌کند قبل از اینکه به لندن نقل مکان کند. | مری با پل ازدواج می‌کند اما او را دوست ندارد. | مری با پل ازدواج کرد اگر او به لندن نقل مکان می‌کرد. | مری با پل ازدواج کرد پس او به لندن نقل مکان کرد. | مری با پل ازدواج می‌کند وقتی که به لندن نقل مکان کند."
        },
        {
          en: "Write each of the conjunctions in A in your own language.",
          fa: "هر یک از حروف ربط بخش A را به زبان خودتان بنویسید.",
          answerEn: "Check with a teacher or a dictionary if you are not sure if your answers are correct or not.",
          answerFa: "اگر مطمئن نیستید که جوابتان درست است یا نه، با معلم یا دیکشنری چک کنید."
        },
        {
          en: "I love swimming and my brother loves swimming (1)………………. Almost all my family loves swimming, (2)……………… my grandmother swims every day. She swims (3)……………… a fish. (4)……………… my father doesn't like it very much. I can swim better (5)……………… my father.",
          fa: "من شنا را دوست دارم و برادرم هم شنا را دوست دارد. تقریباً همه خانواده‌ام شنا را دوست دارند، حتی مادربزرگم هر روز شنا می‌کند. او مثل یک ماهی شنا می‌کند. اما پدرم چندان آن را دوست ندارد. من بهتر از پدرم می‌توانم شنا کنم.",
          answerEn: "1 as well / too / also 2 Even 3 like 4 Only 5 than",
          answerFa: "1 هم/نیز/همچنین 2 حتی 3 مثل/مانند 4 فقط 5 از"
        },
        {
          en: "I play tennis and my mother plays as well. My mother plays better than I do.",
          fa: "من تنیس بازی می‌کنم و مادرم هم بازی می‌کند. مادرم بهتر از من بازی می‌کند.",
          answerEn: "Possible answers: I only play tennis in the summer. | It is too cold to swim here even in summer. | She plays the piano better than I do. | He swims like a fish. | I like listening to music and I like reading also. | I like going skiing too. | I often go skiing with the children and sometimes my husband comes as well.",
          answerFa: "جواب‌های ممکن: من فقط در تابستان تنیس بازی می‌کنم. | اینجا حتی در تابستان هم برای شنا سرد است. | او پیانو را بهتر از من می‌زند. | او مثل یک ماهی شنا می‌کند. | من به موسیقی گوش دادن را دوست دارم و خواندن را هم دوست دارم. | من اسکی رفتن را هم دوست دارم. | من اغلب با بچه‌ها اسکی می‌روم و گاهی هم شوهرم می‌آید."
        }
      ]
    }
  }
];
