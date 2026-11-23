# Dictionary Upgrade / VIU — گزارش ممیزی ساختاری فاز ۱ (فقط‌خواندنی) هر سه PDF — ۲۰۲۶-۱۱-۰۹

> **ماهیت مأموریت:** فاز ۰ (دروازهٔ مالک — تأیید) + فاز ۱ (ممیزی ساختاری فقط‌خواندنی هر سه PDF) از نقشه راه `نقشه راه ها/نقشه-راه-استخراج-و-افزودن-سه-کتاب-English-Vocabulary-in-Use.md` — **صفر تغییر محصولی** (صفر تغییر کد/UI/API/Runtime/داده/Prisma/Schema/db/تصویر/WAVE2/Hook — صفر استخراج محتوا برای وب‌اپ) · این گزارش مجوز فاز ۲ یا هیچ فاز بعدی نیست.
> **فرمان مالک (عین پیام IM — channel `zai-web` — trace_id `1a1c0d1b87be5269` — ۲۰۲۶-۱۱-۰۹):** «این دو فاز رو شروع کن و بعد از اتمام نقشه راه رو بروز رسانی کن» + متن کامل شش چک‌باکس فاز ۱ + الزام پایداری ده‌بندی
> **الگوی گزارش:** گزارش‌های STEP در `docs/qa/` · **ابزار سرشماری:** `scripts/viu-vlm-census.mjs` (کامیت‌شده) · **شواهد خام سرشماری:** سه JSON در همین پوشه (کامیت‌شده)

---

# §A) پیش‌بررسی (آغاز مأموریت — همه با اجرای واقعی)

| قلم | نتیجه |
|---|---|
| Branch / HEAD | `main` · `aad0bbc6df862a77cbd4aed4aa869df895614f61` (ثبت اثبات مأموریت اصلاحی VIU) = `backup/main` با `git ls-remote` · divergence **۰/۰** |
| Working Tree | پاک — ۰ تغییر |
| منبع ۱ — Elementary | `upload/Vocabulary In Use-Elementary 2nd Edition.pdf` — SHA256 `35ea1b5be92eef4ceed99e7a59fad3099e36c85673b88f3de9c25c2921cd51ab` — ۶,۲۳۲,۱۵۷ bytes — **MATCH با §A نقشه راه** |
| منبع ۲ — Pre-Int & Int | `upload/Vocabulary In Use-Pre Int & Int 2nd Edition.pdf` — SHA256 `0dfdab2ef0730596b56a9a95b534846610319b0bee7f1091233f360178f91a1f` — ۱۰,۲۸۸,۶۴۰ bytes — **MATCH** |
| منبع ۳ — Upper-Intermediate | `upload/Vocabulary In Use-Upper Intermediate 2nd Edition.pdf` — SHA256 `415fc9856e16afb7460376bca5897c894234cffec9e4af0ebb044b93cde6dd13` — ۲۳,۰۲۱,۰۲۷ bytes — **MATCH** |
| Baseline پابرجا | `db/custom.db` `20df56a5…`/1,236,992B · Hook هر دو کپی `ee679bc1…` · WAVE2 `src/lib/word-in-context.ts` `a02945d6…` — آغاز=پایان (اثبات §J) |

# §B) روش‌شناسی — چرا سرشماری بصری و چگونه راستی‌آزمایی شد

## §B-۱) سه اثبات ماشینی مستقل: هر سه PDF «بدون لایهٔ متنی» (اسکن خالص تصویری) هستند

| اثبات | Elementary | Pre-Int & Int | Upper-Intermediate |
|---|---|---|---|
| `pdftotext` (کل کتاب) | ۰ کاراکتر | ۰ کاراکتر | ۰ کاراکتر |
| `pdffonts` (شمارش فونت‌ها) | **صفر فونت** | **صفر فونت** | **صفر فونت** |
| `pdfinfo` → Producer | «Adobe Acrobat 6.0 **Image Conversion Plug-in**» | «Adobe Acrobat 6.0» (AcroForm فقط) | «Adobe Acrobat 8.0 **Image Conversion Plug-in**» |

- صفر فونت در کل PDF ⇒ هیچ شیء متنی‌ای وجود ندارد (متن = تصویر اسکن‌شده) — نتیجه با هر دو موتور مستقل (poppler: pdftotext/pdffonts) یکسان است.

## §B-۲) زنجیرهٔ استخراج ساختار (به‌جای متن صفر)

1. **رندر تک‌تک ۷۵۱ صفحه** با `pdftoppm -jpeg -r 150` به `/tmp/viu/{elem,preint,upper}/p-XXX.jpg` (خارج ریپو — بازتولیدپذیر صددرصدی چون خود PDFها tracked هستند؛ فرمان در §J)
2. **سرشماری بصری صفحه‌به‌صفحه** با VLM (CLI `z-ai vision` — مدل `glm-5.3-flash` — ≈۱۰۵ فراخوانی دسته‌ای ۸تایی + retry/backoff): برای هر صفحه = شمارهٔ درس (سربرگ مربع) + عنوان + پاصفحهٔ چاپ‌شده · خروجی خام = سه JSON کامیت‌شده در همین پوشه
3. **چهار قاعدهٔ راستی‌آزمایی متقاطع:** ① **توالی پاصفحه‌ها** — هر پاصفحهٔ عددی باید = قبلی + ۱ باشد (هر شکست = یافتهٔ ساختاری یا خطای خوانش) ② **فرمول چیدمان کتاب** — «هر درس = ۲ صفحه» (متن خود کتاب‌ها: Elementary ص۶ «This book has 60 units. Each unit has 2 pages» · Pre-Int ص۱ «The book has 100 two-page units» · Upper ص۱ «The book has 100 two-page units») ⇒ درس N در صفحهٔ کتاب ثابتی قرار می‌گیرد ③ **لنگرهای فهرست‌محتوا** (Answer key/Index/آوانگاری) ④ **بازخوانی چشمی GLM** برای هر مورد مبهم/ناسازگار (بخش §I)
4. نتیجهٔ راستی‌آزمایی: ELEM و PREINT **صفر شکست توالی** (پاصفحه‌ها کاملاً پیوسته) · UPPER پنج ناهم‌پیوستگی که چهار موردش یافتهٔ واقعی «صفحهٔ مفقود در اسکن» و یکی خطای خوانش VLM بود (§I)

# §C) شمارش صفحات واقعی (دو ابزار مستقل — pdfinfo + pdftoppm)

| کتاب | صفحات PDF | تأیید دومین ابزار | نتیجه |
|---|---|---|---|
| Elementary | **۱۷۱** | ۱۷۱ فایل رندر | ✓ |
| Pre-Int & Int | **۲۷۱** | ۲۷۱ فایل رندر | ✓ |
| Upper-Intermediate | **۳۰۹** | ۳۰۹ فایل رندر | ✓ |
| **جمع** | **۷۵۱** | ۷۵۱ | ✓ |

# §D) ارزیابی کیفیت متن — شمارش واقعی (نه برآورد)

| کتاب | صفحات با متن (≥۵۰ کاراکتر) | صفحات با متن جزئی (۱-۴۹) | صفحات بی‌متن (۰) | سهم نیازمند OCR/VLM |
|---|---|---|---|---|
| Elementary | ۰ | ۰ | **۱۷۱/۱۷۱** | **۱۰۰٪** |
| Pre-Int & Int | ۰ | ۰ | **۲۷۱/۲۷۱** | **۱۰۰٪** |
| Upper-Intermediate | ۰ | ۰ | **۳۰۹/۳۰۹** | **۱۰۰٪** |
| **جمع** | **۰** | **۰** | **۷۵۱/۷۵۱** | **۱۰۰٪** |

- **نتیجهٔ عملیاتی برای فازهای ۳-۵:** هر گونه استخراج محتوای متنی (واژگان/تعریف/تمرین) نیازمند OCR یا VLM روی تک‌تک صفحات است — یا متن تأمین‌شده از مسیر دیگر با تصمیم مالک. این عدد شمارش ماشینی واقعی است، نه برآورد.

# §E) Elementary — ساختار کامل + فهرست ۶۰ درس (صفحهٔ شروع/پایان واقعی)

**ساختار (هر دو شماره‌گذاری):** PDF ۱ = جلد · PDF ۲ = صفحهٔ عنوان · PDF ۳ = کپی‌رایت (© CUP 1999 · ISBN 0 521 599571 with answers — بازخوانی چشمی ✓ مطابق §B-۱ نقشه راه) · PDF ۴-۵ = Contents (کتاب ۱-۲) · PDF ۶ = Acknowledgements (کتاب ۳) · PDF ۷-۸ = Introduction (کتاب ۴-۵) · **PDF ۹-۱۲۸ = ۶۰ درس × ۲ صفحه (کتاب ۶-۱۲۵)** · PDF ۱۲۹-۱۵۹ = Answer key (کتاب ۱۲۶-۱۵۶) · PDF ۱۶۰ = List of phonetic symbols (کتاب ۱۵۷) · PDF ۱۶۱-۱۷۱ = Index (کتاب ۱۵۸-۱۶۸) · آفست ثابت: PDF = کتاب + ۳ · پاصفحه‌ها ۱→۱۶۸ **بدون هیچ شکست** (اسکن کامل)

**لنگرهای تأییدشده:** درس ۱ @ PDF ۹ (کتاب ۶ — بازخوانی چشمی) · درس ۳۰ @ PDF ۶۷ (کتاب ۶۴ — چشمی) · درس ۶۰ @ PDF ۱۲۷ (کتاب ۱۲۴ — چشمی) · Answer key @ PDF ۱۲۹ (کتاب ۱۲۶ — چشمی، مطابق TOC) · Phonetic symbols @ PDF ۱۶۰ (کتاب ۱۵۷ — چشمی) · Index @ PDF ۱۶۱ (کتاب ۱۵۸ — چشمی) · آخرین صفحهٔ Index = PDF ۱۷۱ (کتاب ۱۶۸ — چشمی)

**اصلاح نام‌گذاری نسبت به نقشه راه §B-۱:** عنوان واقعی بخش ۷ در TOC = «**School and workplace**» است (نقشه راه «School and work» نوشته بود) — ثبت تاریخ‌دار در §K؛ بقیهٔ ۸ بخش عیناً تطبیق دارند.

| # | عنوان درس | شروع (کتاب) | پایان (کتاب) | شروع (PDF) | پایان (PDF) | وضعیت در اسکن |
|---|---|---|---|---|---|---|
| — | **Learner training** | — | — | — | — | — |
| ۱ | Talking about language (noun, verb, plural, etc.) | ۶ | ۷ | ۹ | ۱۰ | کامل |
| ۲ | Learning vocabulary (collocation, pictures and diagrams) | ۸ | ۹ | ۱۱ | ۱۲ | کامل |
| — | **Everyday verbs** | — | — | — | — | — |
| ۳ | Have/had/had (have breakfast, have time) | ۱۰ | ۱۱ | ۱۳ | ۱۴ | کامل |
| ۴ | Go/went/gone (go away, go shopping) | ۱۲ | ۱۳ | ۱۵ | ۱۶ | کامل |
| ۵ | Do/did/done (do an exercise, do your best) | ۱۴ | ۱۵ | ۱۷ | ۱۸ | کامل |
| ۶ | Make/made/made (make coffee, make a mistake) | ۱۶ | ۱۷ | ۱۹ | ۲۰ | کامل |
| ۷ | Come/came/come (come in, come from) | ۱۸ | ۱۹ | ۲۱ | ۲۲ | کامل |
| ۸ | Take/took/taken (take the bus, take a photo) | ۲۰ | ۲۱ | ۲۳ | ۲۴ | کامل |
| ۹ | Bring/brought/brought (bring sth. here, bring back) | ۲۲ | ۲۳ | ۲۵ | ۲۶ | کامل |
| ۱۰ | Get/got/got (get a job, get tired) | ۲۴ | ۲۵ | ۲۷ | ۲۸ | کامل |
| ۱۱ | Phrasal verbs (put on, turn down) | ۲۶ | ۲۷ | ۲۹ | ۳۰ | کامل |
| ۱۲ | Every day things (watch TV, wash clothes) | ۲۸ | ۲۹ | ۳۱ | ۳۲ | کامل |
| ۱۳ | Talking (say, tell) | ۳۰ | ۳۱ | ۳۳ | ۳۴ | کامل |
| ۱۴ | Moving (walk, carry) | ۳۲ | ۳۳ | ۳۵ | ۳۶ | کامل |
| — | **Words and grammar** | — | — | — | — | — |
| ۱۵ | Conjunctions and connecting words (because, only) | ۳۴ | ۳۵ | ۳۷ | ۳۸ | کامل |
| ۱۶ | Time words (1): days, months and seasons (Monday, July, winter) | ۳۶ | ۳۷ | ۳۹ | ۴۰ | کامل |
| ۱۷ | Time words (2): (next year, often) | ۳۸ | ۳۹ | ۴۱ | ۴۲ | کامل |
| ۱۸ | Places (middle, front, abroad) | ۴۰ | ۴۱ | ۴۳ | ۴۴ | کامل |
| ۱۹ | Manner (fast, loud) | ۴۲ | ۴۳ | ۴۵ | ۴۶ | کامل |
| ۲۰ | Irregular verbs (run, drink) | ۴۴ | ۴۵ | ۴۷ | ۴۸ | کامل |
| ۲۱ | Common uncountable words (bread, money) | ۴۶ | ۴۷ | ۴۹ | ۵۰ | کامل |
| ۲۲ | Common adjectives: good and bad things (nice, awful) | ۴۸ | ۴۹ | ۵۱ | ۵۲ | کامل |
| ۲۳ | Common adjectives: people (happy, horrible) | ۵۰ | ۵۱ | ۵۳ | ۵۴ | کامل |
| ۲۴ | Words and prepositions (wait for, good at) | ۵۲ | ۵۳ | ۵۵ | ۵۶ | کامل |
| ۲۵ | Prefixes (impossible, ex-president) | ۵۴ | ۵۵ | ۵۷ | ۵۸ | کامل |
| ۲۶ | Suffixes (useful, useless) | ۵۶ | ۵۷ | ۵۹ | ۶۰ | کامل |
| ۲۷ | Words you may confuse (quick/quiet; lend/borrow) | ۵۸ | ۵۹ | ۶۱ | ۶۲ | کامل |
| — | **People** | — | — | — | — | — |
| ۲۸ | Birth, marriage and death (birthday, married) | ۶۰ | ۶۱ | ۶۳ | ۶۴ | کامل |
| ۲۹ | The family (mother, uncle) | ۶۲ | ۶۳ | ۶۵ | ۶۶ | کامل |
| ۳۰ | Parts of the body (head, foot) | ۶۴ | ۶۵ | ۶۷ | ۶۸ | کامل |
| ۳۱ | Clothes (hat, shirt) | ۶۶ | ۶۷ | ۶۹ | ۷۰ | کامل |
| ۳۲ | Describing people (tall, dark, handsome) | ۶۸ | ۶۹ | ۷۱ | ۷۲ | کامل |
| ۳۳ | Health and illness (headache, heart attack) | ۷۰ | ۷۱ | ۷۳ | ۷۴ | کامل |
| ۳۴ | Feelings (love, tired) | ۷۲ | ۷۳ | ۷۵ | ۷۶ | کامل |
| ۳۵ | Greetings and other useful phrases (Good morning, Happy New Year) | ۷۴ | ۷۵ | ۷۷ | ۷۸ | کامل |
| — | **The world** | — | — | — | — | — |
| ۳۶ | Countries, languages and people (America, Chinese, Greek) | ۷۶ | ۷۷ | ۷۹ | ۸۰ | کامل |
| ۳۷ | Weather (cold, rain) | ۷۸ | ۷۹ | ۸۱ | ۸۲ | کامل |
| ۳۸ | In the town (railway station, bank) | ۸۰ | ۸۱ | ۸۳ | ۸۴ | کامل |
| ۳۹ | In the countryside (hill, farm) | ۸۲ | ۸۳ | ۸۵ | ۸۶ | کامل |
| ۴۰ | Animals and pets (horse, giraffe) | ۸۴ | ۸۵ | ۸۷ | ۸۸ | کامل |
| ۴۱ | Travelling (train, map) | ۸۶ | ۸۷ | ۸۹ | ۹۰ | کامل |
| ۴۲ | Notices (No smoking, Out of order) | ۸۸ | ۸۹ | ۹۱ | ۹۲ | کامل |
| — | **At home** | — | — | — | — | — |
| ۴۳ | Food and drink (rice, tea) | ۹۰ | ۹۱ | ۹۳ | ۹۴ | کامل |
| ۴۴ | In the kitchen (fridge, glass) | ۹۲ | ۹۳ | ۹۵ | ۹۶ | کامل |
| ۴۵ | In the bedroom and bathroom (wardrobe, shampoo) | ۹۴ | ۹۵ | ۹۷ | ۹۸ | کامل |
| ۴۶ | In the living room (bookshelf, lamp) | ۹۶ | ۹۷ | ۹۹ | ۱۰۰ | کامل |
| — | **School and workplace** | — | — | — | — | — |
| ۴۷ | Jobs (secretary, factory) | ۹۸ | ۹۹ | ۱۰۱ | ۱۰۲ | کامل |
| ۴۸ | At school and university (biology, notebook) | ۱۰۰ | ۱۰۱ | ۱۰۳ | ۱۰۴ | کامل |
| ۴۹ | Communications (phone box, computer) | ۱۰۲ | ۱۰۳ | ۱۰۵ | ۱۰۶ | کامل |
| — | **Leisure** | — | — | — | — | — |
| ۵۰ | Holidays (package holiday, phrase book) | ۱۰۴ | ۱۰۵ | ۱۰۷ | ۱۰۸ | کامل |
| ۵۱ | Shops and shopping (butcher's, department store) | ۱۰۶ | ۱۰۷ | ۱۰۹ | ۱۱۰ | کامل |
| ۵۲ | In a hotel (single room, key) | ۱۰۸ | ۱۰۹ | ۱۱۱ | ۱۱۲ | کامل |
| ۵۳ | Eating out (café, menu) | ۱۱۰ | ۱۱۱ | ۱۱۳ | ۱۱۴ | کامل |
| ۵۴ | Sports (table tennis, judo) | ۱۱۲ | ۱۱۳ | ۱۱۵ | ۱۱۶ | کامل |
| ۵۵ | Cinema (western, film star) | ۱۱۴ | ۱۱۵ | ۱۱۷ | ۱۱۸ | کامل |
| ۵۶ | Leisure at home (gardening, listening to CDs) | ۱۱۶ | ۱۱۷ | ۱۱۹ | ۱۲۰ | کامل |
| — | **Social issues** | — | — | — | — | — |
| ۵۷ | Crime (murder, prison) | ۱۱۸ | ۱۱۹ | ۱۲۱ | ۱۲۲ | کامل |
| ۵۸ | The media (TV channel, magazine) | ۱۲۰ | ۱۲۱ | ۱۲۳ | ۱۲۴ | کامل |
| ۵۹ | Everyday problems (untidy, in a bad mood) | ۱۲۲ | ۱۲۳ | ۱۲۵ | ۱۲۶ | کامل |
| ۶۰ | Global problems (war, strike) | ۱۲۴ | ۱۲۵ | ۱۲۷ | ۱۲۸ | کامل |

*(ستون‌ها: شمارهٔ درس · عنوان از فهرست‌محتوای خود کتاب · صفحهٔ شروع/پایان در شماره‌گذاری چاپی کتاب · همان دو صفحه در شماره‌گذاری PDF · وضعیت در اسکن — هر ۶۰ درس کامل؛ «کامل» = هر دو صفحه در اسکن حاضر)*

# §F) Pre-Intermediate & Intermediate — ساختار کامل + فهرست ۱۰۰ درس

**ساختار:** PDF ۱ = جلد · PDF ۲ = صفحهٔ عنوان (Stuart Redman) · PDF ۳ = کپی‌رایت (© CUP 1997, 2003 · Fourth printing 2004 · ISBN 0 521 01171 X paperback — چشمی ✓) · PDF ۴-۶ = Contents (کتاب iii-v) · PDF ۷ = Introduction (کتاب vi) · PDF ۸-۹ = Using this book (کتاب ۱-۲) · PDF ۱۰ = Summary of abbreviations (کتاب ۳ — چشمی) · **PDF ۱۱-۲۱۰ = ۱۰۰ درس × ۲ صفحه (کتاب ۴-۲۰۳)** · PDF ۲۱۱-۲۴۸ = Answer key (کتاب ۲۰۴-۲۴۱) · PDF ۲۴۹ = Phonemic symbols (کتاب ۲۴۲) · PDF ۲۵۰ = Pronunciation problems (کتاب ۲۴۳) · PDF ۲۵۱-۲۶۹ = Index (کتاب ۲۴۴-۲۶۲) · PDF ۲۷۰ = Acknowledgements (کتاب ۲۶۳) · PDF ۲۷۱ = جلد پشت (ISBN 0-521-01171-X — چشمی ✓) · آفست ثابت: PDF = کتاب + ۷ · پاصفحه‌های عربی ۱→۲۶۳ **بدون هیچ شکست** (اسکن کامل)

**لنگرهای تأییدشده:** درس ۱ @ PDF ۱۱ (کتاب ۴ — چشمی) · درس ۵۰ @ PDF ۱۰۹ (کتاب ۱۰۲ — چشمی) · سرشماری: هر ۱۰۰ درس دقیقاً در PDF = 2N+9 (صفر مغایرت با فرمول) · Answer key @ PDF ۲۱۱ (کتاب ۲۰۴ — سرشماری، مطابق TOC) · Phonemic symbols @ ۲۴۹ (۲۴۲ ✓) · Pronunciation problems @ ۲۵۰ (۲۴۳ ✓) · Index @ ۲۵۱ (۲۴۴ ✓) · Acknowledgements @ ۲۷۰ (۲۶۳ ✓)

| # | عنوان درس | شروع (کتاب) | پایان (کتاب) | شروع (PDF) | پایان (PDF) | وضعیت در اسکن |
|---|---|---|---|---|---|---|
| — | **Learning** | — | — | — | — | — |
| ۱ | Learning and revising with this book | ۴ | ۵ | ۱۱ | ۱۲ | کامل |
| ۲ | Keeping a vocabulary notebook | ۶ | ۷ | ۱۳ | ۱۴ | کامل |
| ۳ | Using a dictionary | ۸ | ۹ | ۱۵ | ۱۶ | کامل |
| ۴ | English language words | ۱۰ | ۱۱ | ۱۷ | ۱۸ | کامل |
| ۵ | Classroom language | ۱۲ | ۱۳ | ۱۹ | ۲۰ | کامل |
| — | **Word formation** | — | — | — | — | — |
| ۶ | Prefixes un-, in-, im-, dis- | ۱۴ | ۱۵ | ۲۱ | ۲۲ | کامل |
| ۷ | Noun suffixes -ment, -ity, -ness, -tion | ۱۶ | ۱۷ | ۲۳ | ۲۴ | کامل |
| ۸ | Adjective suffixes -able, -ive, -al, -y | ۱۸ | ۱۹ | ۲۵ | ۲۶ | کامل |
| ۹ | Nouns and verbs with the same form | ۲۰ | ۲۱ | ۲۷ | ۲۸ | کامل |
| ۱۰ | Compound nouns | ۲۲ | ۲۳ | ۲۹ | ۳۰ | کامل |
| ۱۱ | Compound adjectives | ۲۴ | ۲۵ | ۳۱ | ۳۲ | کامل |
| — | **Phrase building** | — | — | — | — | — |
| ۱۲ | Collocation (word partners) | ۲۶ | ۲۷ | ۳۳ | ۳۴ | کامل |
| ۱۳ | Idioms and fixed expressions | ۲۸ | ۲۹ | ۳۵ | ۳۶ | کامل |
| ۱۴ | Verb or adjective + preposition | ۳۰ | ۳۱ | ۳۷ | ۳۸ | کامل |
| ۱۵ | Preposition + noun | ۳۲ | ۳۳ | ۳۹ | ۴۰ | کامل |
| ۱۶ | Apologies, excuses and thanks | ۳۴ | ۳۵ | ۴۱ | ۴۲ | کامل |
| ۱۷ | Requests, invitations and suggestions | ۳۶ | ۳۷ | ۴۳ | ۴۴ | کامل |
| ۱۸ | Opinions, agreeing and disagreeing | ۳۸ | ۳۹ | ۴۵ | ۴۶ | کامل |
| ۱۹ | Likes, preferences and interests | ۴۰ | ۴۱ | ۴۷ | ۴۸ | کامل |
| ۲۰ | Frequently asked questions | ۴۲ | ۴۳ | ۴۹ | ۵۰ | کامل |
| ۲۱ | Common responses | ۴۴ | ۴۵ | ۵۱ | ۵۲ | کامل |
| ۲۲ | Greetings, farewells and special expressions | ۴۶ | ۴۷ | ۵۳ | ۵۴ | کامل |
| ۲۳ | Phrasal verbs (1): form and meaning | ۴۸ | ۴۹ | ۵۵ | ۵۶ | کامل |
| ۲۴ | Phrasal verbs (2): grammar and style | ۵۰ | ۵۱ | ۵۷ | ۵۸ | کامل |
| ۲۵ | Have and have got | ۵۲ | ۵۳ | ۵۹ | ۶۰ | کامل |
| ۲۶ | Make, do and take | ۵۴ | ۵۵ | ۶۱ | ۶۲ | کامل |
| ۲۷ | Give, keep, break, see | ۵۶ | ۵۷ | ۶۳ | ۶۴ | کامل |
| ۲۸ | Leave, catch and let | ۵۸ | ۵۹ | ۶۵ | ۶۶ | کامل |
| ۲۹ | Get: uses and expressions | ۶۰ | ۶۱ | ۶۷ | ۶۸ | کامل |
| ۳۰ | Go: uses and expressions | ۶۲ | ۶۳ | ۶۹ | ۷۰ | کامل |
| ۳۱ | The senses | ۶۴ | ۶۵ | ۷۱ | ۷۲ | کامل |
| ۳۲ | Partitives: a bag of ..., a bit of ... | ۶۶ | ۶۷ | ۷۳ | ۷۴ | کامل |
| — | **Parts of speech (special problems)** | — | — | — | — | — |
| ۳۳ | Uncountable nouns and plural nouns | ۶۸ | ۶۹ | ۷۵ | ۷۶ | کامل |
| ۳۴ | Verbs + -ing form or infinitive | ۷۰ | ۷۱ | ۷۷ | ۷۸ | کامل |
| ۳۵ | Verb patterns | ۷۲ | ۷۳ | ۷۹ | ۸۰ | کامل |
| ۳۶ | Adjectives | ۷۴ | ۷۵ | ۸۱ | ۸۲ | کامل |
| ۳۷ | Prepositions: place | ۷۶ | ۷۷ | ۸۳ | ۸۴ | کامل |
| ۳۸ | Adverbs: frequency and degree | ۷۸ | ۷۹ | ۸۵ | ۸۶ | کامل |
| — | **Connecting and linking** | — | — | — | — | — |
| ۳۹ | Time and sequence | ۸۰ | ۸۱ | ۸۷ | ۸۸ | کامل |
| ۴۰ | Addition and contrast | ۸۲ | ۸۳ | ۸۹ | ۹۰ | کامل |
| ۴۱ | Similarities, differences, comparisons, exceptions | ۸۴ | ۸۵ | ۹۱ | ۹۲ | کامل |
| ۴۲ | Reason, purpose, result, condition | ۸۶ | ۸۷ | ۹۳ | ۹۴ | کامل |
| — | **Topics — The world around us** | — | — | — | — | — |
| ۴۳ | The physical world | ۸۸ | ۸۹ | ۹۵ | ۹۶ | کامل |
| ۴۴ | Weather | ۹۰ | ۹۱ | ۹۷ | ۹۸ | کامل |
| ۴۵ | Animals and insects | ۹۲ | ۹۳ | ۹۹ | ۱۰۰ | کامل |
| ۴۶ | Countries, nationality and language | ۹۴ | ۹۵ | ۱۰۱ | ۱۰۲ | کامل |
| — | **Topics — People** | — | — | — | — | — |
| ۴۷ | The body and what it can do | ۹۶ | ۹۷ | ۱۰۳ | ۱۰۴ | کامل |
| ۴۸ | Describing people's appearance | ۹۸ | ۹۹ | ۱۰۵ | ۱۰۶ | کامل |
| ۴۹ | Describing character | ۱۰۰ | ۱۰۱ | ۱۰۷ | ۱۰۸ | کامل |
| ۵۰ | Human feelings and actions | ۱۰۲ | ۱۰۳ | ۱۰۹ | ۱۱۰ | کامل |
| ۵۱ | Family and friends | ۱۰۴ | ۱۰۵ | ۱۱۱ | ۱۱۲ | کامل |
| ۵۲ | Ages and stages | ۱۰۶ | ۱۰۷ | ۱۱۳ | ۱۱۴ | کامل |
| — | **Topics — Daily life** | — | — | — | — | — |
| ۵۳ | Daily routines | ۱۰۸ | ۱۰۹ | ۱۱۵ | ۱۱۶ | کامل |
| ۵۴ | The place where you live | ۱۱۰ | ۱۱۱ | ۱۱۷ | ۱۱۸ | کامل |
| ۵۵ | Around the home (1) | ۱۱۲ | ۱۱۳ | ۱۱۹ | ۱۲۰ | کامل |
| ۵۶ | Around the home (2) | ۱۱۴ | ۱۱۵ | ۱۲۱ | ۱۲۲ | کامل |
| ۵۷ | Everyday problems | ۱۱۶ | ۱۱۷ | ۱۲۳ | ۱۲۴ | کامل |
| ۵۸ | Money | ۱۱۸ | ۱۱۹ | ۱۲۵ | ۱۲۶ | کامل |
| ۵۹ | Health: illness | ۱۲۰ | ۱۲۱ | ۱۲۷ | ۱۲۸ | کامل |
| ۶۰ | Health: physical injuries | ۱۲۲ | ۱۲۳ | ۱۲۹ | ۱۳۰ | کامل |
| ۶۱ | Clothes | ۱۲۴ | ۱۲۵ | ۱۳۱ | ۱۳۲ | کامل |
| ۶۲ | Shops and shopping | ۱۲۶ | ۱۲۷ | ۱۳۳ | ۱۳۴ | کامل |
| ۶۳ | Food | ۱۲۸ | ۱۲۹ | ۱۳۵ | ۱۳۶ | کامل |
| ۶۴ | Cooking and restaurants | ۱۳۰ | ۱۳۱ | ۱۳۷ | ۱۳۸ | کامل |
| ۶۵ | City life | ۱۳۲ | ۱۳۳ | ۱۳۹ | ۱۴۰ | کامل |
| ۶۶ | Life in the country | ۱۳۴ | ۱۳۵ | ۱۴۱ | ۱۴۲ | کامل |
| ۶۷ | On the road | ۱۳۶ | ۱۳۷ | ۱۴۳ | ۱۴۴ | کامل |
| ۶۸ | Transport | ۱۳۸ | ۱۳۹ | ۱۴۵ | ۱۴۶ | کامل |
| — | **Topics — Work** | — | — | — | — | — |
| ۶۹ | Work: duties, pay and conditions | ۱۴۰ | ۱۴۱ | ۱۴۷ | ۱۴۸ | کامل |
| ۷۰ | Jobs | ۱۴۲ | ۱۴۳ | ۱۴۹ | ۱۵۰ | کامل |
| ۷۱ | The career ladder | ۱۴۴ | ۱۴۵ | ۱۵۱ | ۱۵۲ | کامل |
| ۷۲ | In the office | ۱۴۶ | ۱۴۷ | ۱۵۳ | ۱۵۴ | کامل |
| ۷۳ | Business and finance | ۱۴۸ | ۱۴۹ | ۱۵۵ | ۱۵۶ | کامل |
| — | **Leisure and entertainment** | — | — | — | — | — |
| ۷۴ | Sport: ball games | ۱۵۰ | ۱۵۱ | ۱۵۷ | ۱۵۸ | کامل |
| ۷۵ | Sport and leisure | ۱۵۲ | ۱۵۳ | ۱۵۹ | ۱۶۰ | کامل |
| ۷۶ | Cinema and theatre | ۱۵۴ | ۱۵۵ | ۱۶۱ | ۱۶۲ | کامل |
| ۷۷ | Music | ۱۵۶ | ۱۵۷ | ۱۶۳ | ۱۶۴ | کامل |
| — | **Communication and technology** | — | — | — | — | — |
| ۷۸ | Newspapers | ۱۵۸ | ۱۵۹ | ۱۶۵ | ۱۶۶ | کامل |
| ۷۹ | Television | ۱۶۰ | ۱۶۱ | ۱۶۷ | ۱۶۸ | کامل |
| ۸۰ | On the phone | ۱۶۲ | ۱۶۳ | ۱۶۹ | ۱۷۰ | کامل |
| ۸۱ | Computers and the Internet | ۱۶۴ | ۱۶۵ | ۱۷۱ | ۱۷۲ | کامل |
| — | **Social concerns** | — | — | — | — | — |
| ۸۲ | Education: school | ۱۶۶ | ۱۶۷ | ۱۷۳ | ۱۷۴ | کامل |
| ۸۳ | Education: university | ۱۶۸ | ۱۶۹ | ۱۷۵ | ۱۷۶ | کامل |
| ۸۴ | Law and order | ۱۷۰ | ۱۷۱ | ۱۷۷ | ۱۷۸ | کامل |
| ۸۵ | Crime | ۱۷۲ | ۱۷۳ | ۱۷۹ | ۱۸۰ | کامل |
| ۸۶ | Politics | ۱۷۴ | ۱۷۵ | ۱۸۱ | ۱۸۲ | کامل |
| ۸۷ | Bureaucracy | ۱۷۶ | ۱۷۷ | ۱۸۳ | ۱۸۴ | کامل |
| ۸۸ | Global problems | ۱۷۸ | ۱۷۹ | ۱۸۵ | ۱۸۶ | کامل |
| — | **Tourism** | — | — | — | — | — |
| ۸۹ | Air travel | ۱۸۰ | ۱۸۱ | ۱۸۷ | ۱۸۸ | کامل |
| ۹۰ | Hotels and restaurants | ۱۸۲ | ۱۸۳ | ۱۸۹ | ۱۹۰ | کامل |
| ۹۱ | A sightseeing holiday in the city | ۱۸۴ | ۱۸۵ | ۱۹۱ | ۱۹۲ | کامل |
| ۹۲ | Holidays by the sea | ۱۸۶ | ۱۸۷ | ۱۹۳ | ۱۹۴ | کامل |
| — | **Notional concepts** | — | — | — | — | — |
| ۹۳ | Time | ۱۸۸ | ۱۸۹ | ۱۹۵ | ۱۹۶ | کامل |
| ۹۴ | Numbers | ۱۹۰ | ۱۹۱ | ۱۹۷ | ۱۹۸ | کامل |
| ۹۵ | Distance, size and dimension | ۱۹۲ | ۱۹۳ | ۱۹۹ | ۲۰۰ | کامل |
| ۹۶ | Shapes, colours and patterns | ۱۹۴ | ۱۹۵ | ۲۰۱ | ۲۰۲ | کامل |
| — | **Varieties of English** | — | — | — | — | — |
| ۹۷ | Notices and warnings | ۱۹۶ | ۱۹۷ | ۲۰۳ | ۲۰۴ | کامل |
| ۹۸ | Vague language | ۱۹۸ | ۱۹۹ | ۲۰۵ | ۲۰۶ | کامل |
| ۹۹ | Formal and informal English | ۲۰۰ | ۲۰۱ | ۲۰۷ | ۲۰۸ | کامل |
| ۱۰۰ | Abbreviations and abbreviated words | ۲۰۲ | ۲۰۳ | ۲۰۹ | ۲۱۰ | کامل |

*(ستون‌ها همان §E — هر ۱۰۰ درس کامل)*

# §G) Upper-Intermediate — ساختار کامل + فهرست ۱۰۰ درس + **یافته‌های اسکن (مفقودها)**

**ساختار:** PDF ۱ = جلد (Second Edition — چشمی) · PDF ۲-۴ = Contents (کتاب iii-v — ۱۰۰ درس + Answer key ۲۰۴ · Index ۲۸۱ · Acknowledgements ۳۰۹ ✓ مطابق §B-۳ نقشه راه) · PDF ۵ = Introduction (کتاب vi) · PDF ۶-۷ = Using this book (کتاب ۱-۲) · PDF ۸ = Phonemic symbols (کتاب ۳ — مطابق TOC) · **PDF ۹-۲۰۵ = درس‌ها (کتاب ۴-۲۰۳؛ درس N در کتاب ۲N+2)** · PDF ۲۰۶-۲۸۱ منهای مفقود = Key/Answer key (کتاب ۲۰۴-۲۷۹ حاضر؛ کتاب ۲۸۰ مفقود) · PDF ۲۸۲-۳۰۸ = Index (کتاب ۲۸۱-۳۰۷) · PDF ۳۰۹ = جلد پشت (ISBN 0-521-66435-7 — چشمی ✓)

**⚠️ یافته‌های ساختاری اسکن (شمارش واقعی از شکست‌های توالی پاصفحه — هر مورد با بازخوانی چشمی مرزها تأیید شد):**

| # | صفحهٔ کتاب مفقود در اسکن | موقعیت در PDF | محتوای مفقود | اثر |
|---|---|---|---|---|
| ۱ | **کتاب ۳۵** | بین PDF ۳۹ (=کتاب ۳۴) و PDF ۴۰ (=کتاب ۳۶) | صفحهٔ تمرین درس ۱۶ «Abbreviations and acronyms» | درس ۱۶ در اسکن تک‌صفحه‌ای است |
| ۲ | **کتاب ۱۰۶-۱۰۷** | بین PDF ۱۰۹ (=کتاب ۱۰۵) و PDF ۱۱۰ (=کتاب ۱۰۸) | **تمام درس ۵۲ «Clothes»** (هر دو صفحه) | درس ۵۲ در اسکن مفقود است — شناسهٔ درسی که هر ۱۰۰ درس سرشماری شد جز ۵۲ |
| ۳ | **کتاب ۲۸۰** | بین PDF ۲۸۱ (=کتاب ۲۷۹) و PDF ۲۸۲ (=کتاب ۲۸۱) | آخرین صفحهٔ Key (پاسخ‌نامه) | Key در اسکن تا کتاب ۲۷۹ حاضر است |
| ۴ | **کتاب ۳۰۸ و ۳۰۹** | PDF ۳۰۸ (=کتاب ۳۰۷) ← PDF ۳۰۹ = جلد پشت | پایان Index (کتاب ۳۰۸) + Acknowledgements (کتاب ۳۰۹) | آخرین پاصفحهٔ قابل‌مشاهده = ۳۰۷ |

**ناهنجاری چاپی خودِ کتاب (نه اسکن):** صفحهٔ PDF ۲۷۰ محتوای Key (واحدهای 85.5-87.2) را دارد ولی پاصفحهٔ چاپ‌شده‌اش «**۸**» است (باید ۲۶۸ می‌بود — خطای فولیو در چاپ کتاب؛ با بازخوانی چشمی سه‌باره حل شد و محتوا کاملاً پیوسته است — هیچ صفحه‌ای آنجا مفقود نیست).

**آفست متغیر (پیامد مفقودها):** کتاب ≤۳۴ → آفست ۵ · کتاب ۳۶-۱۰۵ → آفست ۴ · کتاب ۱۰۸-۲۷۹ → آفست ۲ · کتاب ۲۸۱-۳۰۷ → آفست ۱ (به‌همین دلیل جدول زیر شروع/پایان PDF هر درس را از سرشماری واقعی می‌آورد نه فرمول)

**لنگرهای تأییدشده:** درس ۱ @ PDF ۹ (کتاب ۴ — چشمی) · درس ۲۷ @ PDF ۶۰ (کتاب ۵۶ — چشمی) · درس ۷۳ @ PDF ۱۵۰ (کتاب ۱۴۸ — چشمی) · Key @ PDF ۲۰۶ (کتاب ۲۰۴ — چشمی، مطابق TOC) · Index @ PDF ۲۸۲ (کتاب ۲۸۱ — سرشماری، مطابق TOC) · جلد پشت @ PDF ۳۰۹ (چشمی)

| # | عنوان درس | شروع (کتاب) | پایان (کتاب) | شروع (PDF) | پایان (PDF) | وضعیت در اسکن |
|---|---|---|---|---|---|---|
| — | **Effective vocabulary learning** | — | — | — | — | — |
| ۱ | Learning vocabulary – general advice | ۴ | ۵ | ۹ | ۱ | کامل |
| ۲ | Learning vocabulary – aids to learning | ۶ | ۷ | ۱۱ | ۲ | کامل |
| ۳ | Organising a vocabulary notebook | ۸ | ۹ | ۱۳ | ۳ | کامل |
| ۴ | The names of English language words | ۱۰ | ۱۱ | ۱۵ | ۴ | کامل |
| ۵ | Using your dictionary | ۱۲ | ۱۳ | ۱۷ | ۵ | کامل |
| ۶ | Revising vocabulary | ۱۴ | ۱۵ | ۱۹ | ۶ | کامل |
| ۷ | Guessing and explaining meaning | ۱۶ | ۱۷ | ۲۱ | ۷ | کامل |
| — | **Word formation** | — | — | — | — | — |
| ۸ | Suffixes | ۱۸ | ۱۹ | ۲۳ | ۸ | کامل |
| ۹ | Prefixes | ۲۰ | ۲۱ | ۲۵ | ۹ | کامل |
| ۱۰ | Roots | ۲۲ | ۲۳ | ۲۷ | ۱۰ | کامل |
| ۱۱ | Abstract nouns | ۲۴ | ۲۵ | ۲۹ | ۱۱ | کامل |
| ۱۲ | Compound adjectives | ۲۶ | ۲۷ | ۳۱ | ۱۲ | کامل |
| ۱۳ | Compound nouns (1) noun + noun | ۲۸ | ۲۹ | ۳۳ | ۱۳ | کامل |
| ۱۴ | Compound nouns (2) verb + preposition | ۳۰ | ۳۱ | ۳۵ | ۱۴ | کامل |
| ۱۵ | Words from other languages | ۳۲ | ۳۳ | ۳۷ | ۱۵ | کامل |
| ۱۶ | Abbreviations and acronyms | ۳۴ | ۳۵ | ۳۹ | ۱۶ | ناقص — صفحهٔ تمرین (کتاب ۳۵) در اسکن نیست؛ فقط صفحهٔ ارائه |
| ۱۷ | New words in English | ۳۶ | ۳۷ | ۴۰ | ۱۷ | کامل |
| — | **Words and pronunciation** | — | — | — | — | — |
| ۱۸ | Words commonly mispronounced | ۳۸ | ۳۹ | ۴۲ | ۱۸ | کامل |
| ۱۹ | Onomatopoeic words | ۴۰ | ۴۱ | ۴۴ | ۱۹ | کامل |
| ۲۰ | Homonyms | ۴۲ | ۴۳ | ۴۶ | ۲۰ | کامل |
| — | **Connecting and linking words** | — | — | — | — | — |
| ۲۱ | Time | ۴۴ | ۴۵ | ۴۸ | ۲۱ | کامل |
| ۲۲ | Condition | ۴۶ | ۴۷ | ۵۰ | ۲۲ | کامل |
| ۲۳ | Cause, reason, purpose and result | ۴۸ | ۴۹ | ۵۲ | ۲۳ | کامل |
| ۲۴ | Concession and contrast | ۵۰ | ۵۱ | ۵۴ | ۲۴ | کامل |
| ۲۵ | Addition | ۵۲ | ۵۳ | ۵۶ | ۲۵ | کامل |
| ۲۶ | Text-referring words | ۵۴ | ۵۵ | ۵۸ | ۲۶ | کامل |
| ۲۷ | Discourse markers in speech | ۵۶ | ۵۷ | ۶۰ | ۲۷ | کامل |
| ۲۸ | Discourse markers in writing | ۵۸ | ۵۹ | ۶۲ | ۲۸ | کامل |
| — | **Countables and uncountables** | — | — | — | — | — |
| ۲۹ | Uncountable nouns | ۶۰ | ۶۱ | ۶۴ | ۲۹ | کامل |
| ۳۰ | Words that only occur in the plural | ۶۲ | ۶۳ | ۶۶ | ۳۰ | کامل |
| ۳۱ | Countable and uncountable nouns with different meanings | ۶۴ | ۶۵ | ۶۸ | ۳۱ | کامل |
| ۳۲ | Collective nouns | ۶۶ | ۶۷ | ۷۰ | ۳۲ | کامل |
| ۳۳ | Making uncountable nouns countable | ۶۸ | ۶۹ | ۷۲ | ۳۳ | کامل |
| ۳۴ | Containers and contents | ۷۰ | ۷۱ | ۷۴ | ۳۴ | کامل |
| — | **Topics** | — | — | — | — | — |
| ۳۵ | Countries, nationalities and languages | ۷۲ | ۷۳ | ۷۶ | ۳۵ | کامل |
| ۳۶ | The weather | ۷۴ | ۷۵ | ۷۸ | ۳۶ | کامل |
| ۳۷ | Describing people: appearance | ۷۶ | ۷۷ | ۸۰ | ۳۷ | کامل |
| ۳۸ | Describing people: character | ۷۸ | ۷۹ | ۸۲ | ۳۸ | کامل |
| ۳۹ | Relationships | ۸۰ | ۸۱ | ۸۴ | ۳۹ | کامل |
| ۴۰ | At home | ۸۲ | ۸۳ | ۸۶ | ۴۰ | کامل |
| ۴۱ | Everyday problems | ۸۴ | ۸۵ | ۸۸ | ۴۱ | کامل |
| ۴۲ | Global problems | ۸۶ | ۸۷ | ۹۰ | ۴۲ | کامل |
| ۴۳ | Education | ۸۸ | ۸۹ | ۹۲ | ۴۳ | کامل |
| ۴۴ | Work | ۹۰ | ۹۱ | ۹۴ | ۴۴ | کامل |
| ۴۵ | Sport | ۹۲ | ۹۳ | ۹۶ | ۴۵ | کامل |
| ۴۶ | The arts | ۹۴ | ۹۵ | ۹۸ | ۴۶ | کامل |
| ۴۷ | Music | ۹۶ | ۹۷ | ۱۰۰ | ۴۷ | کامل |
| ۴۸ | Food | ۹۸ | ۹۹ | ۱۰۲ | ۴۸ | کامل |
| ۴۹ | The environment | ۱۰۰ | ۱۰۱ | ۱۰۴ | ۴۹ | کامل |
| ۵۰ | Towns | ۱۰۲ | ۱۰۳ | ۱۰۶ | ۵۰ | کامل |
| ۵۱ | The natural world | ۱۰۴ | ۱۰۵ | ۱۰۸ | ۵۲ | کامل |
| ۵۲ | Clothes | ۱۰۶ | ۱۰۷ | — | — | **مفقود در اسکن** (هر دو صفحهٔ کتاب ۱۰۶-۱۰۷ در PDF نیست) |
| ۵۳ | Health and medicine | ۱۰۸ | ۱۰۹ | ۱۱۰ | ۵۳ | کامل |
| ۵۴ | Travel | ۱۱۰ | ۱۱۱ | ۱۱۲ | ۵۴ | کامل |
| ۵۵ | Holidays | ۱۱۲ | ۱۱۳ | ۱۱۴ | ۵۵ | کامل |
| ۵۶ | Numbers and shapes | ۱۱۴ | ۱۱۵ | ۱۱۶ | ۵۶ | کامل |
| ۵۷ | Science and technology | ۱۱۶ | ۱۱۷ | ۱۱۸ | ۵۷ | کامل |
| ۵۸ | Computers and the Internet | ۱۱۸ | ۱۱۹ | ۱۲۰ | ۵۸ | کامل |
| ۵۹ | The press and the media | ۱۲۰ | ۱۲۱ | ۱۲۲ | ۵۹ | کامل |
| ۶۰ | Politics and public institutions | ۱۲۲ | ۱۲۳ | ۱۲۴ | ۶۰ | کامل |
| ۶۱ | Crime | ۱۲۴ | ۱۲۵ | ۱۲۶ | ۶۱ | کامل |
| ۶۲ | Money – buying, selling and paying | ۱۲۶ | ۱۲۷ | ۱۲۸ | ۶۲ | کامل |
| — | **Feelings and actions** | — | — | — | — | — |
| ۶۳ | Belief and opinion | ۱۲۸ | ۱۲۹ | ۱۳۰ | ۶۳ | کامل |
| ۶۴ | Pleasant and unpleasant feelings | ۱۳۰ | ۱۳۱ | ۱۳۲ | ۶۴ | کامل |
| ۶۵ | Like, dislike and desire | ۱۳۲ | ۱۳۳ | ۱۳۴ | ۶۵ | کامل |
| ۶۶ | Speaking | ۱۳۴ | ۱۳۵ | ۱۳۶ | ۶۶ | کامل |
| ۶۷ | The six senses | ۱۳۶ | ۱۳۷ | ۱۳۸ | ۶۷ | کامل |
| ۶۸ | What your body does | ۱۳۸ | ۱۳۹ | ۱۴۰ | ۶۸ | کامل |
| — | **Basic concepts** | — | — | — | — | — |
| ۶۹ | Number, quantity, degree and intensity | ۱۴۰ | ۱۴۱ | ۱۴۲ | ۶۹ | کامل |
| ۷۰ | Time | ۱۴۲ | ۱۴۳ | ۱۴۴ | ۷۰ | کامل |
| ۷۱ | Distances and dimensions | ۱۴۴ | ۱۴۵ | ۱۴۶ | ۷۱ | کامل |
| ۷۲ | Obligation, need, possibility and probability | ۱۴۶ | ۱۴۷ | ۱۴۸ | ۷۲ | کامل |
| ۷۳ | Sound and light | ۱۴۸ | ۱۴۹ | ۱۵۰ | ۷۳ | کامل |
| ۷۴ | Possession, giving and lending | ۱۵۰ | ۱۵۱ | ۱۵۲ | ۷۴ | کامل |
| ۷۵ | Movement and speed | ۱۵۲ | ۱۵۳ | ۱۵۴ | ۷۵ | کامل |
| ۷۶ | Texture, brightness, weight and density | ۱۵۴ | ۱۵۵ | ۱۵۶ | ۷۶ | کامل |
| ۷۷ | Success, failure and difficulty | ۱۵۶ | ۱۵۷ | ۱۵۸ | ۷۷ | کامل |
| — | **Idiomatic expressions** | — | — | — | — | — |
| ۷۸ | Idioms and fixed expressions – general | ۱۵۸ | ۱۵۹ | ۱۶۰ | ۷۸ | کامل |
| ۷۹ | Everyday expressions | ۱۶۰ | ۱۶۱ | ۱۶۲ | ۷۹ | کامل |
| ۸۰ | Similes | ۱۶۲ | ۱۶۳ | ۱۶۴ | ۸۰ | کامل |
| ۸۱ | Binomials | ۱۶۴ | ۱۶۵ | ۱۶۶ | ۸۱ | کامل |
| ۸۲ | Idioms describing people | ۱۶۶ | ۱۶۷ | ۱۶۸ | ۸۲ | کامل |
| ۸۳ | Idioms describing feelings or mood | ۱۶۸ | ۱۶۹ | ۱۷۰ | ۸۳ | کامل |
| ۸۴ | Idioms describing problematic situations | ۱۷۰ | ۱۷۱ | ۱۷۲ | ۸۴ | کامل |
| ۸۵ | Idioms connected with praise and criticism | ۱۷۲ | ۱۷۳ | ۱۷۴ | ۸۵ | کامل |
| ۸۶ | Idioms connected with using language | ۱۷۴ | ۱۷۵ | ۱۷۶ | ۸۶ | کامل |
| ۸۷ | Miscellaneous idioms | ۱۷۶ | ۱۷۷ | ۱۷۸ | ۸۷ | کامل |
| ۸۸ | Proverbs | ۱۷۸ | ۱۷۹ | ۱۸۰ | ۸۸ | کامل |
| — | **Phrasal verbs and verb-based expressions** | — | — | — | — | — |
| ۸۹ | Expressions with do and make | ۱۸۰ | ۱۸۱ | ۱۸۲ | ۸۹ | کامل |
| ۹۰ | Expressions with bring and take | ۱۸۲ | ۱۸۳ | ۱۸۴ | ۹۰ | کامل |
| ۹۱ | Expressions with get | ۱۸۴ | ۱۸۵ | ۱۸۶ | ۹۱ | کامل |
| ۹۲ | Expressions with set and put | ۱۸۶ | ۱۸۷ | ۱۸۸ | ۹۲ | کامل |
| ۹۳ | Expressions with come and go | ۱۸۸ | ۱۸۹ | ۱۹۰ | ۹۳ | کامل |
| ۹۴ | Miscellaneous expressions | ۱۹۰ | ۱۹۱ | ۱۹۲ | ۹۴ | کامل |
| — | **Varieties of English** | — | — | — | — | — |
| ۹۵ | Formal and informal words (1) | ۱۹۲ | ۱۹۳ | ۱۹۴ | ۹۵ | کامل |
| ۹۶ | Formal and informal words (2) | ۱۹۴ | ۱۹۵ | ۱۹۶ | ۹۶ | کامل |
| ۹۷ | US English | ۱۹۶ | ۱۹۷ | ۱۹۸ | ۹۷ | کامل |
| ۹۸ | Other Englishes | ۱۹۸ | ۱۹۹ | ۲۰۰ | ۹۸ | کامل |
| ۹۹ | Headline English | ۲۰۰ | ۲۰۱ | ۲۰۲ | ۹۹ | کامل |
| ۱۰۰ | The language of signs and notices | ۲۰۲ | ۲۰۳ | ۲۰۴ | ۲۰۵ | کامل |

*(ستون‌ها همان §E — ۹۹ درس در اسکن حاضر؛ درس ۵۲ «Clothes» با برچسب مفقود ثبت شد)*

# §H) مکان‌یابی Answer key / Index / جدول نمادهای آوانگاری (صفحهٔ واقعی در هر PDF)

| کتاب | Answer key | نمادهای آوانگاری | Index | روش تأیید |
|---|---|---|---|---|
| Elementary | **PDF ۱۲۹-۱۵۹** (کتاب ۱۲۶-۱۵۶ — ۳۱ صفحه) | **PDF ۱۶۰** (کتاب ۱۵۷ — «Phonetic symbols» تک‌صفحه) | **PDF ۱۶۱-۱۷۱** (کتاب ۱۵۸-۱۶۸ — ۱۱ صفحه) | TOC + بازخوانی چشمی هر سه صفحهٔ آغازین + سرشماری |
| Pre-Int & Int | **PDF ۲۱۱-۲۴۸** (کتاب ۲۰۴-۲۴۱ — ۳۸ صفحه) | **PDF ۲۴۹** (کتاب ۲۴۲ — «Phonemic symbols») + **PDF ۲۵۰** (کتاب ۲۴۳ — «Pronunciation problems») | **PDF ۲۵۱-۲۶۹** (کتاب ۲۴۴-۲۶۲ — ۱۹ صفحه) | TOC + سرشماری (پاصفحه‌های ۲۰۴/۲۴۲/۲۴۳/۲۴۴/۲۶۳ همه رؤیت‌شده) |
| Upper-Intermediate | **PDF ۲۰۶-۲۸۱** (کتاب ۲۰۴-۲۷۹ حاضر + ۲۶۸ با فولیو چاپی «۸»؛ کتاب ۲۸۰ مفقود) | **PDF ۸** (کتاب ۳ — «Phonemic symbols» — **در ابتدای کتاب** طبق TOC) | **PDF ۲۸۲-۳۰۸** (کتاب ۲۸۱-۳۰۷ حاضر؛ کتاب ۳۰۸ مفقود) | TOC + بازخوانی چشمی Key/Index + سرشماری |

- نکتهٔ Upper: برخلاف دو کتاب دیگر، جدول Phonemic symbols در **ابتدای کتاب (کتاب ۳ = PDF ۸)** است و TOC آن را صریحاً «Phonemic symbols 3» ثبت کرده — تطبیق کامل.
- Acknowledgements: ELEM @ کتاب ۳ (PDF ۶) · PREINT @ کتاب ۲۶۳ (PDF ۲۷۰) · UPPER @ کتاب ۳۰۹ — **در اسکن حاضر نیست** (§G).

# §I) خطاهای خوانش VLM که کشف و حل شدند (برچسب صداقت — الگوی D7 پروژه)

1. **PDF ۲۷۱ UPPER:** سرشماری ابتدا پاصفحهٔ «۸» گزارش کرد؛ بازخوانی چشمی = «**۲۶۹**» (در همان دسته، صفحهٔ PDF ۲۷۰ واقعاً فولیو چاپی «۸» دارد — §G؛ دو صفحهٔ متوالی با اعداد گیج‌کننده) → در JSON نهایی اصلاح شد.
2. **PDF ۲۶ UPPER:** پاصفحه در خود اسکن بریده/ناخواناست (حاشیهٔ پایین «English Vocabulary in Use (Upper-inte…» بدون شماره) → null در سرشماری **صحیح** است؛ محتوا = تمرین‌های درس ۹ (بازخوانی چشمی) — ساختار را خراب نمی‌کند.
3. **دستهٔ ناموفق API (UPPER PDF ۲۴۹-۲۵۶):** یک دسته سه‌بار شکست خورد (محدودیت نرخ) → با resume + backoff مجدد اجرا و کامل شد (null-نهایی فقط صفحات ۱/۲۶/۳۰۹ = جلدها و صفحهٔ بی‌فولیو).
4. **سربرگ‌های درونی Answer key:** VLM در بخش پاسخ‌نامه سربرگ‌های «Unit N» را «شروع درس» گزارش کرد → در تحلیل نهایی فقط رکوردهای ناحیهٔ درس‌ها (PDF ≤ ۲۱۰) شمرده شدند؛ این رکوردها عملاً شاهدِ پوشش کامل پاسخ‌نامه‌اند (مثلاً PREINT: Units 80..99 مرئی در PDF ۲۴۱-۲۴۷).
5. هیچ شمارش/صفحه‌ای «ساختگی» تولید نشد: هر عدد جدول‌ها یا از سرشماری JSON کامیت‌شده است یا از فرمول چیدمانی که خود با متن کتاب و لنگرها اثبات شد، یا از بازخوانی چشمی مستقیم GLM.

# §J) شواهد، آرتیفت‌ها و بازیابی‌پذیری

| قلم | وضعیت | بازیابی |
|---|---|---|
| این گزارش + سه JSON سرشماری + `scripts/viu-vlm-census.mjs` | **در ریپو کامیت می‌شوند** (docs/qa/ + scripts/) | Clone مستقیم |
| خود سه PDF | tracked (کامیت `5a02fa8`) — SHA256 §A بازتأیید | Clone مستقیم + راستی‌آزمایی SHA256 |
| ۷۵۱ رندر JPEG (۱۵۰DPI) در `/tmp/viu/` | **خارج ریپو** (حجم ≈۱۹۰MB — موقت) | بازتولید کامل با: `pdftoppm -jpeg -r 150 -jpegopt quality=80 "upload/<PDF>" /tmp/viu/<key>/p` (سه کتاب) — چون PDFها tracked هستند، شواهد بصری صددرصد بازیابی‌پذیر است |
| پاسخ‌های خام API سرشماری (به‌جز JSON نهایی) | خارج ریپو — فقط آخرین پاسخ در `/tmp/viu/_last_response.json` | JSON نهایی کامیت‌شده = خروجی استانداردشدهٔ همان پاسخ‌ها؛ بازتولید با اجرای دوبارهٔ اسکریپت (مقرون‌به‌صرفه نیست ولی ممکن) |

# §K) تطبیق با چک‌باکس‌های نقشه راه (فاز ۰ و فاز ۱) + اصلاحات ثبت‌شده

| چک‌باکس نقشه راه | وضعیت | شواهد |
|---|---|---|
| فاز ۰ — فرمان مالک برای شروع فاز ۱ | ✅ [x] | پیام IM مالک ۲۰۲۶-۱۱-۰۹ (trace `1a1c0d1b87be5269`) — «این دو فاز رو شروع کن» |
| فاز ۱-الف — شمارش صفحه‌به‌صفحهٔ Elementary + فهرست ۶۰ درس | ✅ [x] | §C + §E (۱۷۱ صفحه؛ ۶۰/۶۰ درس؛ صفر شکست توالی) |
| فاز ۱-ب — Pre-Int & Int + فهرست ۱۰۰ درس | ✅ [x] | §C + §F (۲۷۱ صفحه؛ ۱۰۰/۱۰۰؛ صفر شکست) |
| فاز ۱-ج — Upper-Intermediate + فهرست ۱۰۰ درس | ✅ [x] | §C + §G (۳۰۹ صفحه؛ ۹۹ درس حاضر + درس ۵۲ مفقود با برچسب صریح) |
| فاز ۱-د — ارزیابی text layer vs اسکن + سهم OCR/VLM با شمارش واقعی | ✅ [x] | §B-۱ + §D (۰/۷۵۱ متن؛ ۱۰۰٪ نیازمند OCR/VLM — شمارش واقعی) |
| فاز ۱-هـ — مکان‌یابی Answer key / Index / آوانگاری | ✅ [x] | §H (هر سه کتاب، صفحهٔ کتاب + صفحهٔ PDF) |
| فاز ۱-و — گزارش در docs/qa/ + SNAPSHOT/worklog/Roadmap جامع + Git دو-کامیتی | ✅ [x] | همین سند + §L SNAPSHOT ۵۱مین + worklog ۱۴۰۵/۸/۱۸ + جامع سطر جدید + دو کامیت §۱۰-۷ |

**اصلاحات تاریخ‌دار به متن نقشه راه (الگوی پیوست §I — اصلاح ثبت می‌شود، متن اولیه حذف نمی‌شود):**
1. §B-۱ «School and work» → عنوان واقعی TOC = «**School and workplace**» (§E این گزارش).
2. §B-۳ افزودن واقعیت اسکن: درس ۵۲ «Clothes» و صفحات کتاب ۳۵/۲۸۰/۳۰۸/۳۰۹ در PDF حاضر نیستند + فولیو چاپی «۸» در PDF ۲۷۰ (§G).
3. §B-۳: «Acknowledgements ص۳۰۹» در اسکن حاضر نیست (آخرین پاصفحهٔ قابل‌مشاهده = ۳۰۷؛ جلد پشت = PDF ۳۰۹).

# §L) وضعیت نهایی و شرط توقف

```text
VIU PHASE 0 — PASSED (owner command 2026-11-09)
VIU PHASE 1 — DONE (read-only structural audit — this report)
VIU PHASE 2 — NOT AUTHORIZED (نیازمند فرمان مستقل مالک)
VIU EXTRACTION (فازهای ۳-۵) — NOT STARTED
O1..O6 — APPROVED & DOCUMENTED · O7..O10 — OPEN
STEP 5 — CLOSED · STEP 6 — NOT AUTHORIZED
```

- این مأموریت فقط-ممیزی بود: صفر تغییر کد/UI/API/Runtime/داده/Prisma/Schema/db/تصویر/WAVE2/Hook (اثبات SHA256 در SNAPSHOT §۲/§۸).
- **گام بعدی مجاز:** اعلام فرمان مالک برای فاز ۲ (طراحی مدل داده و تصمیم‌های مالک — فقط مستندات + پیشنهاد GLM). تا آن زمان توقف اجباری.

---

*گزارش ممیزی فاز ۱ VIU — ۱۴۰۵/۸/۱۸ — ۲۰۲۶-۱۱-۰۹ · سرشماری: ۷۵۱/۷۵۱ صفحه · صفر تغییر محصولی · پایان.*
