import type { Reading } from "../types";

/**
 * متن‌های کوتاه (ریدینگ) جزوه «جزوه جامع کمک آموزش زبان انگلیسی پایه یازدهم» (Vision Two — تألیف جمال احمدی و همکاران).
 * هر ریدینگ از بخش Reading خود جزوه استخراج شده و ترجمه فارسی هر پاراگراف، ترجمه چاپی خود جزوه است (نه ترجمه‌ی ما):
 * - درس ۱: «Languages of the world» (جزوه ص ۱۲ — کتاب درسی ص ۲۴ و ۲۵) و «Hints for learning a language better» (جزوه ص ۱۳ — کتاب کار ص ۱۰ و ۱۱)
 * - درس ۲: «Having a Healthier and Longer Life» (جزوه ص ۵۰ — کتاب درسی ص ۵۸ و ۵۹) و «The Positive and Negative Effects of the Modern lifestyle» (جزوه ص ۵۱ — کتاب کار ص ۲۷ و ۲۸)
 * - درس ۳: «Art, Culture and Society» (جزوه ص ۸۵ — کتاب درسی ص ۹۰ و ۹۱) و «Cultures and Lifestyles» (جزوه ص ۸۶ — کتاب کار ص ۴۶ و ۴۷)
 * در ریدینگ دوم درس ۱، هر «توصیه» (hint) یک پاراگراف جداگانه ثبت شده است.
 *
 * نکات وفاداری به متن جزوه:
 * - ترجمه‌های فارسی عین جزوه است؛ فقط نویسه‌های جابه‌جاشده لایه متن PDF ترمیم شده‌اند (فهرست پایین).
 * - اعداد داخل متن فارسی فارسی‌اند (۷۰۰۰، ۲۲۵۰، ۱۹۰ و…) مطابق چاپ جزوه.
 * - «junk food» جزوه «غذاهای بی‌ارزش (هله هوله)» ترجمه کرده و «artifacts» را «صنایع دستی» برگردانده — عیناً حفظ شد.
 *
 * اصلاحیه (کلمه‌های شکسته/جابه‌جای لایه متن PDF که در این فایل ترمیم شده‌اند):
 * - لیگاتور «لا»: اسالیم ← اسلامی، عالوه ← علاوه، باال ← بالا، مشکال ت ← مشکلات، تعطیالت ← تعطیلات، خالق ← خلاق
 * - حروف جابه‌جا: بئر الملیل ← بین‌المللی، مالقات ← ملاقات، می ر ان ← میزان، برریس ← بررسی، رص بان قلب ← ضربان قلب،
 *   رص وری ← ضروری، سیی ی ← سبزیجات / سپری کنند، چاف ← چاق، عصنی ← عصبی، آسنی ← آسیب، شنواتی ← شنوایی،
 *   شتاش/بشاش ← سراسر، چئر ← چنین، احی ← احترام، عیل رغم ← علی‌رغم، منحرص به فرد ← منحصربه‌فرد،
 *   گوناگوت ← گوناگون، زندگا ت ← زندگی‌ها، «تأثیر ا ت منف» ← «تأثیرات منفی»، «رادیوتی» ← «رادیو را»
 * - جزوه برای واژه‌ی customs در ریدینگ آخر واژه‌ی «سنت‌ها» را چاپ کرده است — عیناً حفظ شد.
 */
export const READING_LIST: Reading[] = [
  // ─── درس اول ───
  {
    id: "r11-1",
    lesson: 1,
    title: "Languages of the world",
    titleFa: "زبان‌های دنیا",
    source: "کتاب درسی — صفحه ۲۴ و ۲۵ (جزوه ص ۱۲)",
    paragraphs: [
      {
        en: "Language is a system of communication. It uses written and spoken forms. People use language to communicate with each other in a society. They exchange knowledge, beliefs, wishes, and feelings through it.",
        fa: "زبان سیستم برقراری ارتباط است. آن از شکل‌های نوشتاری و گفتاری استفاده می‌کند. مردم در جامعه از زبان استفاده می‌کنند تا با یکدیگر ارتباط برقرار کنند. آن‌ها (از طریق آن زبان) تبادل دانش، عقاید، آرزوها و احساسات می‌کنند.",
      },
      {
        en: "Languages vary greatly from region to region. They are so different that a person may not understand the language of someone from another region, country or continent. It is not surprising to hear that today about 7000 languages exist in the world. There are more than 2000 languages in Africa, 1000 in the Americas, more than 2250 in Asia, about 230 in Europe, and more than 1300 in Oceania.",
        fa: "زبان‌ها از یک منطقه به منطقه‌ی دیگر خیلی فرق می‌کنند. آن‌ها آنقدر متفاوت هستند که یک شخص ممکن است زبان یک نفر از یک منطقه، کشور یا قاره‌ی دیگر را درک نکند. تعجب ندارد که بشنویم امروزه حدود ۷۰۰۰ زبان در دنیا وجود دارند. در آفریقا بیش از ۲۰۰۰ (زبان)، در آمریکا ۱۰۰۰ (زبان)، در آسیا بیش از ۲۲۵۰ (زبان)، در اروپا حدود ۲۳۰ (زبان) و در اقیانوسیه بیش از ۱۳۰۰ (زبان) وجود دارند.",
      },
      {
        en: "Native speakers of these languages range in number from very large, with hundreds of millions of speakers, to very small, with fewer than 10 speakers. The most popular language in the world is Chinese. More than one billion people in the world speak Chinese.",
        fa: "صحبت‌کننده‌های بومی این زبان‌ها از نظر تعداد از خیلی زیاد، با صدها میلیون صحبت‌کننده، تا خیلی کم، با کمتر از ۱۰ صحبت‌کننده متغیر هستند. پرطرفدارترین زبان دنیا چینی است. بیش از یک میلیارد نفر در دنیا چینی صحبت می‌کنند.",
      },
      {
        en: "Interestingly, English has fewer native speakers than Chinese, but there are about one billion learners of English all around the world. They learn English as an international language.",
        fa: "جالب این که انگلیسی صحبت‌کننده‌های بومی کمتری از چینی دارد اما در سراسر جهان حدود یک میلیارد فراگیر انگلیسی وجود دارد. آنها زبان انگلیسی را به عنوان یک زبان بین‌المللی یاد می‌گیرند.",
      },
      {
        en: "About fifty percent of the world's languages have fewer than 5000 speakers. In the beginning of the twenty-first century, 204 languages had fewer than 10 speakers and 344 languages had between 10 and 99 speakers. The 548 languages with fewer than 99 speakers make up nearly 8 percent of the world's languages. We call them 'endangered languages'. As the speakers of such languages grow old and die, their languages will die, too.",
        fa: "حدود ۵۰ درصد از زبان‌های دنیا کمتر از ۵۰۰۰ صحبت‌کننده دارند. در ابتدای این قرن، ۲۰۴ زبان کمتر از ۱۰ صحبت‌کننده و ۳۴۴ زبان بین ۱۰ تا ۹۹ صحبت‌کننده داشتند. ۵۴۸ زبان با کمتر از ۹۹ صحبت‌کننده حدود ۸ درصد زبان‌های دنیا را تشکیل می‌دهند. ما آنها را زبان‌های «در معرض خطر» می‌نامیم. همچنان که صحبت‌کننده‌های چنین زبان‌هایی پیر می‌شوند و می‌میرند، زبان‌هایشان هم خواهند مرد.",
      },
      {
        en: "All languages are really valuable, despite their differences. Every language is an amazing means of communication that meets the needs of its own speakers. It is impossible to imagine the world without language. Therefore, we should respect all languages, no matter how different they are and how many speakers they have.",
        fa: "همه‌ی زبان‌ها علی‌رغم تفاوت‌هایشان واقعاً باارزش هستند. هر زبان یک وسیله‌ی ارتباطی شگفت‌انگیز است که نیازهای صحبت‌کننده‌هایش را برآورده می‌کند. غیر ممکن است که دنیا را بدون زبان تصور کرد. بنابراین، ما باید به همه‌ی زبان‌ها احترام بگذاریم، مهم نیست که آنها چقدر متفاوت هستند و چه تعداد صحبت‌کننده دارند.",
      },
    ],
  },
  {
    id: "r11-2",
    lesson: 1,
    title: "Hints for learning a language better",
    titleFa: "نکاتی برای یادگیری بهتر یک زبان",
    source: "کتاب کار — صفحه ۱۰ و ۱۱ (جزوه ص ۱۳)",
    paragraphs: [
      {
        en: "Learning a new language doesn't always mean sitting in the classroom and studying language books. In fact, language teachers suggest that you do plenty of extra learning outside of school, places like your home or a library near you. There are a number of ways to improve your understanding of the language. For example, if you want to improve your English or any other foreign languages, you should consider some of these hints. If you add a few of these ideas to your day-to-day language learning, you'll certainly see some improvement.",
        fa: "آموختن یک زبان تازه همیشه به معنای نشستن در کلاس درس و مطالعه کتاب‌های زبان نیست. در واقع، معلم‌های زبان به شما توصیه می‌کنند میزان زیادی از آموختن اضافی را در مکان‌هایی خارج از مدرسه، همانند خانه خود یا در یک کتابخانه نزدیک (خانه) خودتان انجام دهید. شیوه‌هایی برای بهبود بخشیدن فهم شما از زبان وجود دارد. برای مثال، اگر شما می‌خواهید زبان انگلیسی‌تان یا هر زبان خارجی دیگری را بهبود ببخشید، باید بعضی از این توصیه‌ها را در نظر بگیرید. اگر شما تعدادی از این ایده‌ها را به یادگیری روزانه زبانتان اضافه کنید، مطمئناً تا حدودی پیشرفت خواهید داشت.",
      },
      {
        en: "Get a good dictionary. A dictionary is your best friend while you're learning English.",
        fa: "یک فرهنگ لغت خوب بخرید. یک فرهنگ لغت بهترین دوست شماست، درحالیکه مشغول یادگیری زبان انگلیسی هستید.",
      },
      {
        en: "Read a lot. Reading is a great way of practicing your English in your own time. Books and newspapers are useful to improve your English.",
        fa: "زیاد بخوانید. خواندن شیوه‌ای عالی برای تمرین کردن زبان انگلیسی شما در وقت آزادتان است. کتاب‌ها و روزنامه‌ها برای بهبود زبان انگلیسی‌تان سودمند می‌باشد.",
      },
      {
        en: "Label things in your house. Buy a pack of labels and then write the name of items on them, such as phone, window, etc. This is great for beginners.",
        fa: "بر روی وسائل منزل خود برچسب بزنید. یک بسته برچسب خریداری کرده و سپس نام وسائل را بر روی آنها بنویسید، همانند تلفن، پنجره و غیره. این (برچسب زدن) برای مبتدی‌ها عالی است.",
      },
      {
        en: "Practice English whenever you can. It's important that you don't leave your English learning inside the classroom. Make sure you never escape learning.",
        fa: "زبان انگلیسی را هر زمان که توانستید تمرین کنید. اینکه شما یادگیری انگلیسی خود را داخل کلاس رها نکنید، مهم است. مطمئن شوید که هیچ وقت از یادگیری فرار نمی‌کنید.",
      },
      {
        en: "Write every day. Try and write something every day using new words and grammar that you've learned.",
        fa: "همه روزه بنویسید. هر روز سعی کنید چیزی را با استفاده از واژگان جدید و گرامری که آموخته‌اید بنویسید.",
      },
      {
        en: "Watch television and movies and listen to good radio programs.",
        fa: "تلویزیون و فیلم تماشا کرده و به برنامه‌های خوب رادیو گوش دهید.",
      },
      {
        en: "Practice every day. Make yourself a study plan. Decide how much time a week you are going to study.",
        fa: "هر روز تمرین کنید. یک برنامه مطالعه برای خود بسازید. تصمیم‌گیری کنید که قصد دارید چه مقدار زمان در یک هفته مطالعه کنید.",
      },
      {
        en: "Don't be afraid to make mistakes. Be confident when speaking or writing in English.",
        fa: "از اشتباه کردن نترسید. در هنگام صحبت کردن یا نوشتن به زبان انگلیسی، اعتماد به نفس داشته باشید.",
      },
      {
        en: "Practice all four language skills: Reading, writing, speaking and listening.",
        fa: "همه چهار مهارت زبان را تمرین کنید: خواندن، نوشتن، صحبت کردن و گوش دادن.",
      },
    ],
  },

  // ─── درس دوم ───
  {
    id: "r11-3",
    lesson: 2,
    title: "Having a Healthier and Longer Life",
    titleFa: "داشتن یک زندگی سالم‌تر و طولانی‌تر",
    source: "کتاب درسی — صفحه ۵۸ و ۵۹ (جزوه ص ۵۰)",
    paragraphs: [
      {
        en: "Have you ever thought of a healthy lifestyle to live longer? People can do many things to have a healthier life. Most people have a special diet or do lots of exercise; however, without a careful plan they may hurt themselves.",
        fa: "آیا تا کنون به یک سبک زندگی سالم برای طولانی‌تر زندگی کردن فکر کرده‌اید؟ مردم می‌توانند چیزهای زیادی انجام دهند تا زندگی سالم‌تری داشته باشند. بیشتر مردم رژیم خاصی دارند یا زیاد ورزش می‌کنند؛ اما بدون یک برنامه‌ی دقیق، آنها ممکن است به خودشان صدمه بزنند.",
      },
      {
        en: "To have a healthier lifestyle, people need to do certain things. First, they should check their general health. Measuring blood pressure and heartbeat is the most important thing to do. They also need to check their family health history. In this way, they understand if anyone in the family has had a special illness.",
        fa: "برای داشتن یک سبک زندگی سالم‌تر، مردم باید کارهای خاصی را انجام دهند. ابتدا، آنها باید سلامت عمومی‌شان را چک کنند. اندازه‌گیری فشار خون و ضربان قلب مهم‌ترین چیز (کار) برای انجام دادن است. آنها همچنین باید سابقه‌ی سلامت خانواده‌ی خود را بررسی کنند. به این طریق، آنها می‌فهمند که آیا هیچ‌کس در خانواده بیماری خاص داشته است یا نه.",
      },
      {
        en: "Another thing is paying attention to physical health. For example, eating healthy food helps people live longer and prevents diseases. Eating junk food makes people gain weight, and increases the risk of heart attack. Eating balanced servings of bread, vegetables, fruits, protein, and oil is necessary for everyone. Also, daily exercises improve people's health condition.",
        fa: "مطلب دیگر، توجه کردن به سلامت جسم است. برای مثال، خوردن غذای سالم به مردم کمک می‌کند طولانی‌تر عمر کنند و از بیماری‌ها پیشگیری می‌کند. خوردن غذاهای بی‌ارزش (هله هوله) باعث چاقی افراد می‌شود و خطر سکته‌ی قلبی را افزایش می‌دهد. خوردن وعده‌های متعادل از نان، سبزیجات، میوه، پروتئین و روغن برای همه ضروری است. هم چنین، ورزش روزانه وضعیت سلامت افراد را بهبود می‌بخشد.",
      },
      {
        en: "An effective way to enjoy a better lifestyle is having healthy relationships with others. Recent research has shown that a good social life decreases the risk of death. Sadly, some people do not visit their relatives very often these days. They are really busy with their work and usually use technology to communicate.",
        fa: "یک روش مؤثر برای لذت بردن از سبک زندگی بهتر، داشتن روابط سالم با دیگران است. تحقیق اخیر نشان داده است که زندگی اجتماعی خوب خطر مرگ را کاهش می‌دهد. متأسفانه این روزها بعضی از مردم خیلی اوقات خویشاوندان‌شان را ملاقات نمی‌کنند. آنها خیلی مشغول کارشان هستند و معمولاً برای ارتباط برقرار کردن از فناوری استفاده می‌کنند.",
      },
      {
        en: "Bad habits and addiction can be harmful to health. One day of smoking can take around 5 hours away from the smoker's life. Addiction to technology such as using computers for a long time is also dangerous.",
        fa: "عادت‌های بد و اعتیاد می‌تواند برای سلامت مضر باشد. یک روز سیگار کشیدن می‌تواند ۵ ساعت از عمر فردی که سیگار می‌کشد را بگیرد. اعتیاد به فناوری مانند استفاده از رایانه به مدت طولانی نیز خطرناک است.",
      },
      {
        en: "Above all, the most important thing to enjoy a good life is having emotional health. Praying decreases stress and gives people a calm and balanced life. People with this lifestyle have had a better life.",
        fa: "در رأس همه، مهم‌ترین چیز برای لذت بردن از یک زندگی خوب، داشتن سلامت عاطفی است. نماز خواندن (دعا کردن) اضطراب را کاهش می‌دهد و به افراد یک زندگی آرام و متعادل می‌دهد. افراد با این سبک زندگی، زندگی بهتری داشته‌اند.",
      },
      {
        en: "There are many other things people can do to live healthier and longer. The key point, however, is having a plan for the way they want to live and take care of their physical and emotional health.",
        fa: "چیزهای (کارهای) بسیاری دیگری وجود دارند که مردم می‌توانند انجام دهند تا زندگی سالم‌تر و طولانی‌تر داشته باشند. نکته‌ی کلیدی، به هر حال، داشتن یک برنامه برای رویه‌ای است که آنها می‌خواهند زندگی کنند و از سلامت عاطفی و جسمی‌شان مراقبت نمایند.",
      },
    ],
  },
  {
    id: "r11-4",
    lesson: 2,
    title: "The Positive and Negative Effects of the Modern lifestyle",
    titleFa: "تأثیرات مثبت و منفی شیوه زندگی امروزی",
    source: "کتاب کار — صفحه ۲۷ و ۲۸ (جزوه ص ۵۱)",
    paragraphs: [
      {
        en: "The modern lifestyle has had both positive and negative effects on people's lives. Modern technologies have enabled us to have easy access to information, become more creative, experience fast communication, travel easier, and have a more comfortable life. Have you ever imagined a world without the Internet, tablets, mobile phones, airplanes, and vacuum cleaners? Most people cannot do that, as technology is the miracle of our time.",
        fa: "شیوه‌ی زندگی مدرن، هم تأثیرات مثبت و هم تأثیرات منفی بر روی زندگی افراد داشته است. فن‌آوری‌های مدرن ما را قادر ساخته که دسترسی راحت به اطلاعات داشته باشیم، خلاق شویم، ارتباطات سریع را تجربه کنیم، راحت‌تر سفر کنیم و زندگی آسوده‌ای داشته باشیم. آیا تا به حال دنیا را بدون اینترنت، تبلت‌ها، موبایل‌ها، هواپیماها و جاروبرق‌ها تصور کرده‌اید؟ اکثریت مردم نمی‌توانند این کار را انجام دهند، زیرا فن‌آوری معجزه‌ی عصر ما می‌باشد.",
      },
      {
        en: "But using new technologies has changed people's lifestyle in a harmful way in this century as well. Some technologies are dangerous to our health and can harm our body. Using mobile phones or surfing the Internet for long hours can increase people's blood pressure and cause sleep problems. Playing video games for long hours makes people nervous and harm their heart and nervous system. Listening to music by headsets can be harmful to one's hearing and even brain.",
        fa: "اما استفاده از تکنولوژی‌های تازه در این قرن، همچنین شیوه‌ی زندگی مردم را به شیوه‌ای مضر تغییر داده است. برخی از فن‌آوری‌ها برای سلامت ما خطرناک هستند و می‌توانند به بدن ما صدمه بزنند. استفاده از موبایل‌ها یا جستجو در اینترنت برای ساعات طولانی می‌تواند فشار خون افراد را بالا برده و سبب مشکلات خواب شود. انجام بازی‌های ویدیویی برای ساعات طولانی، افراد را عصبی کرده و به قلب و سیستم عصبی آنها آسیب می‌رساند. گوش کردن به موسیقی با هدفون‌ها می‌تواند برای شنوایی فرد و حتی مغز مضر باشد.",
      },
      {
        en: "Using technology in a wrong way has created bad habits and new types of addictions. It is not strange now to call someone an Internet or mobile addict. Technology addicts are people with serious problems to control themselves to use various kinds of technology, in particular the Internet, smartphones, tablets and laptops. Technology addicts do not like to socialize with people; instead, they prefer to be alone and spend lots of their time working with their devices. This makes them depressed and impatient.",
        fa: "بهره گرفتن از تکنولوژی به طور غلط، عادات بد و انواع تازه‌ای از اعتیادها را به وجود آورده است. این که الان کسی را معتاد به موبایل یا اینترنت بنامیم، عجیب نیست. معتادهای تکنولوژی، افرادی با مشکلات جدی در بازداشتن خودشان برای استفاده از انواع مختلف فن‌آوری، مخصوصاً اینترنت، موبایل‌های هوشمند، تبلت‌ها و لپ‌تاپ‌ها هستند. معتادهای تکنولوژی دوست ندارند با افراد معاشرت داشته باشند. در عوض آن، ترجیح می‌دهند که تنها باشند و مدت زمان زیادی از وقت‌شان را صرف کار کردن با وسایل‌شان کنند. این کار، آنها را افسرده و بی‌حوصله می‌کند.",
      },
      {
        en: "Specialists have found different ways to cure technology addicts. To avoid this type of addiction, people should spend more time with their friends and family members, do daily exercise, and limit the time of working with technologies. They also need to enjoy nature more and have regular plans to travel.",
        fa: "کارشناسان راه‌های مختلفی را برای درمان معتادهای تکنولوژی پیدا کرده‌اند. برای جلوگیری از این نوع اعتیاد، افراد می‌بایست وقت بیشتری را با دوستان و اعضای خانواده خود سپری کنند، ورزش روزانه انجام داده و مدت زمان کار با فن‌آوری‌ها را محدود کنند. همچنین باید از طبیعت بیشتر لذت برده و برنامه‌ریزی‌های منظم برای سفر کردن داشته باشند.",
      },
    ],
  },

  // ─── درس سوم ───
  {
    id: "r11-5",
    lesson: 3,
    title: "Art, Culture and Society",
    titleFa: "هنر، فرهنگ و جامعه",
    source: "کتاب درسی — صفحه ۹۰ و ۹۱ (جزوه ص ۸۵)",
    paragraphs: [
      {
        en: "Art is what people create with imagination and skill. As a part of culture, it shows the way of life and identity of a nation and reflects the history of a society. In fact, the history of humankind is the history of art. If we want to know a country or a nation well, we should study its art.",
        fa: "هنر چیزی است که افراد با تخیل و مهارت خلق می‌کنند. آن، به عنوان بخشی از فرهنگ، روش زندگی و هویت ملت را نشان می‌دهد و تاریخ یک جامعه را منعکس می‌کند. در حقیقت، تاریخ بشر، تاریخ هنر است. اگر ما بخواهیم یک کشور یا یک ملت را به خوبی بشناسیم، باید هنر آن را مطالعه کنیم.",
      },
      {
        en: "Handicrafts are good examples of the art and culture of a country. By handicrafts, we mean making decorative items in a skillful way using our hands. Each country and culture has its own handicrafts.",
        fa: "صنایع دستی مثال‌های خوبی از هنر و فرهنگ یک کشور هستند. منظور از صنایع دستی، ساختن اشیاء تزئینی به رویه‌ای ماهرانه با استفاده از دست‌هایمان است. هر کشور و فرهنگ صنایع دستی خودش را دارد.",
      },
      {
        en: "Making and selling handicrafts are good ways to help a country's economy and introduce its culture to other nations. Many people of the world produce handicrafts and sell them to tourists. In some Asian countries a part of the country's income comes from making and selling handicrafts.",
        fa: "ساختن و فروختن صنایع دستی روش‌های خوبی برای کمک کردن به اقتصاد کشور و معرفی کردن فرهنگش به ملت‌های دیگر هستند. بسیاری از مردم دنیا صنایع دستی تولید می‌کنند و آنها را به گردشگرها می‌فروشند. در بعضی از کشورهای آسیایی، بخشی از درآمد یک کشور از درست کردن و فروختن صنایع دستی (به دست می‌آید).",
      },
      {
        en: "Iran has a five-thousand-year-old history of artistic works and handicrafts including pottery, painting, calligraphy, rugs and carpets, etc. If you travel across Iran, you'll get back home with excellent handicrafts as souvenirs for your family and friends.",
        fa: "ایران تاریخ پنج‌هزارساله‌ای از آثار هنری و صنایع دستی شامل سفال، نقاشی، خطاطی، قالیچه، فرش و غیره دارد. اگر در سراسر ایران سفر کنید، با صنایع دستی عالی به عنوان سوغات برای خانواده و دوستانتان به خانه برمی‌گردید.",
      },
      {
        en: "Iranian art is also quite famous all around the world. There are very excellent collections of Persian art in many important museums of the world. If we want to name countries with richest art and cultural diversity, Iran is among them. Persian art is famous in the world for reflecting moral and social values of Iranian people and the natural beauty of this vast country.",
        fa: "هنر ایران هم چنین در سراسر دنیا کاملاً معروف است. در تعداد زیادی از موزه‌های مهم دنیا کلکسیون‌های خیلی عالی از هنر ایرانی وجود دارد. اگر بخواهیم کشورهایی با غنی‌ترین تنوع هنری و فرهنگی را نام ببریم، ایران از جمله‌ی آنها است. هنر ایران به خاطر منعکس کردن ارزش‌های معنوی و اجتماعی مردم ایران و زیبایی طبیعی این کشور پهناور، در دنیا معروف است.",
      },
      {
        en: "Iranian craftsmen and craftswomen are famous for producing very unique artworks from wood, metal and other simple materials around them. Many people of the world appreciate the art and skill of a young Iranian girl who weaves a beautiful silk carpet in a small village of Azarbaijan or Kordistan. When tourists buy Persian rugs or carpets, they take a part of Iranian art and culture to their homelands.",
        fa: "استادکاران مرد و زن ایرانی به خاطر تولید کردن آثار هنری خیلی منحصربه‌فرد از چوب، فلز و مواد ساده‌ی دیگر در دور و اطرافشان، معروف هستند. بسیاری از مردم دنیا قدر هنر و مهارت یک دختر جوان ایرانی که یک فرش ابریشمی زیبا را در یک روستای کوچک در آذربایجان یا کردستان می‌بافد را می‌دانند. وقتی گردشگرها قالیچه یا فرش‌های ایرانی را می‌خرند، بخشی از هنر و فرهنگ ایرانی را به میهن‌شان می‌برند.",
      },
    ],
  },
  {
    id: "r11-6",
    lesson: 3,
    title: "Cultures and Lifestyles",
    titleFa: "فرهنگ‌ها و سبک‌های زندگی",
    source: "کتاب کار — صفحه ۴۶ و ۴۷ (جزوه ص ۸۶)",
    paragraphs: [
      {
        en: "Culture is a system of shared beliefs that are common in a society. Often, we think of the food, music, clothing, and holidays that are common in a society as its culture, but these are only some of the elements. Other elements include customs, values, behaviors, and artifacts. Culture is, therefore, a combination of thoughts, feelings, attitudes, and beliefs.",
        fa: "فرهنگ، سیستمی از عقاید به اشتراک گذاشته شده است که در یک جامعه متداول هستند. اغلب، ما غذا، موسیقی، پوشاک و تعطیلات (مراسمات) که در یک جامعه رایج اند را به عنوان فرهنگ آن (جامعه) در نظر می‌گیریم، اما اینها تنها برخی از اجزا هستند. سایر اجزا شامل سنت‌ها، ارزش‌ها، رفتارها و صنایع دستی هستند. بنابراین، فرهنگ ترکیبی از افکار، احساسات، نگرش‌ها و عقاید می‌باشد.",
      },
      {
        en: "With more than 190 countries and 7 billion people on earth, it is not hard to imagine that many cultures exist. No matter where you go around the world, you will face people, lifestyles and cultures that are different to what you have. People around the world have very different lives and ways of living. They have different beliefs and customs. So, they usually live and behave according to what they believe to be right and wrong.",
        fa: "با بیش از ۱۹۰ کشور و ۷ میلیارد انسان بر روی کره زمین، تصور کردن اینکه فرهنگ‌های زیادی وجود داشته باشد، سخت نیست. این که کجای دنیا می‌روید (اهمیت ندارد، اما) با مردم، دارای سبک‌های زندگی و فرهنگ‌هایی مواجه می‌شوید که با آنچه دارید، فرق دارد. مردم سراسر دنیا زندگی‌ها و شیوه‌ی زندگی خیلی متفاوتی دارند. آنها دارای عقاید و رسومات گوناگونی هستند. بنابراین، آنها معمولاً با توجه به آنچه به درست و غلط بودن آن ایمان دارند، زندگی و رفتار می‌کنند.",
      },
      {
        en: "Learning to respect other cultures is important for having new experiences and learning about the world. One of the first steps to learn about other cultures is to simply accept that there are many different cultures exist other than our own culture. One of the most important ways to learn to become respectful of other cultures is to spend some time reflecting on our own. Then it is important to understand something about other cultures.",
        fa: "آموختن احترام به سایر فرهنگ‌ها، برای داشتن تجربیات تازه و مطلع شدن در مورد جهان اهمیت دارد. یکی از اولین قدم‌ها برای یادگیری (مطلع شدن) در مورد سایر فرهنگ‌ها، این است که به سادگی بپذیریم که فرهنگ‌های مختلف زیادی به غیر از فرهنگ ما وجود دارند. یکی از مهم‌ترین شیوه‌های محترم بودن در برابر (احترام گذاشتن) سایر فرهنگ‌ها، این است که وقتی بیشتری را صرف منعکس کردن آن (فرهنگ) به فرهنگ خودمان کنیم. بنابراین، مهم است که (مطابق چیزهایی) در مورد سایر فرهنگ‌ها بفهمیم (بدانیم).",
      },
      {
        en: "For those who want to learn about other cultures, but do not know where to start, a great place to start is reading about the cultures that interest them. In today's world if we all are able to know about other cultures, and respect them, life would be easier for most of us.",
        fa: "برای آنهایی که می‌خواهند در مورد سایر فرهنگ‌ها یاد بگیرند اما نمی‌دانند از کجا شروع کنند، یک مکان عالی برای شروع، خواندن در مورد فرهنگ‌هایی است که آنها را (به خود) علاقمند می‌کند. در دنیای امروز، اگر همه ما قادر باشیم در مورد سایر فرهنگ‌ها بدانیم و به آنها احترام بگذاریم، زندگی برای بیشتر ما آسان‌تر خواهد بود.",
      },
    ],
  },
];
