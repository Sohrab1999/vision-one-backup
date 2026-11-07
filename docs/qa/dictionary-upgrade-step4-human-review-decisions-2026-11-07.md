# Dictionary Upgrade / STEP 4 — ثبت تصمیم‌های بازبینی انسانی مالک برای ۲۰ واژهٔ پایلوت Word Atlas (Human Review Decisions Registration — OWNER DECISIONS AT SENSE LEVEL — DOCUMENTATION ONLY)

> **تاریخ مأموریت:** ۱۴۰۵/۸/۱۶ — ۲۰۲۶-۱۱-۰۷ · **نوع مأموریت:** ثبت مستند تصمیم‌های صریح بازبینی انسانی مالک (OWNER DECISION REGISTRATION — مأموریت مستقل مالک)
> **ماهیت:** صفر تغییر کد / API / UI / Runtime / Schema / Prisma / دیتابیس / تصویر / سهمیهٔ تولید تصویر / `WAVE2_UNGRADED_BOOKS` / Hill / Wave 2 / STEP-18 — فقط یک سند گزارش جدید + به‌روزرسانی مستندات مرجع (SNAPSHOT/worklog/Roadmap)
> **هدف (عین مأموریت):** ثبت تصمیم‌های صریح بازبینی انسانی مالک برای پایلوت ۲۰ واژهٔ Word Atlas به‌عنوان مستندات پایدار پروژه — در سطح درستِ معنی (sense level) — مأموریت فقط‌مستنداتی
> **ورودی تصمیم:** متن عین مالک در مأموریت STEP 4 — بایت‌به‌بیت نقل شده در §D-۰ (صفر بازنویسی، صفر تفسیر افزوده، صفر باز-برچسب‌زنی)
> **پیش‌نیازها:** گزارش STEP 1 = `docs/qa/dictionary-upgrade-step1-word-atlas-source-audit-2026-11-05.md` (پین `19a9bd8`) · گزارش STEP 2 = `docs/qa/dictionary-upgrade-step2-word-atlas-20-word-pilot-2026-11-05.md` (+ اصلاحیهٔ شمارش §C-۴، ۲۰۲۶-۱۱-۰۶) · بستهٔ STEP 3 = `docs/qa/dictionary-upgrade-step3-human-review-package-2026-11-07.md`
> **وضعیت نهایی:**

```text
STEP 4 — OWNER HUMAN-REVIEW DECISIONS REGISTERED (2026-11-07)
SCOPE: EXACTLY THE 20 PILOT WORDS — SENSE-LEVEL OWNER DECISIONS: 19 SENSE / 2 REJECT / 1 NO-IMAGE (= 22 SENSE-LEVEL DECISION ROWS)
present = 3 SENSE-LEVEL DECISIONS (NOUN = GIFT → REJECT · ADJECTIVE = حاضر در کلاس → SENSE · VERB = ارائه کردن → REJECT)
letter = SENSE FOR MAIL / WRITTEN LETTER ONLY — NOT GENERALIZED TO THE ALPHABET-LETTER SENSE
manteau = NO IMAGE / NO_MATCH_SOURCE PRESERVED — NOT A HUMAN-REJECTED IMAGE
STEP 2 MACHINE PRE-REVIEW (2026-11-05) PRESERVED UNCHANGED AS HISTORICAL RECORD — SUPERSEDED AS DECISION AUTHORITY ONLY, NOT ERASED
NO IMPLEMENTATION — NO PRODUCT INTEGRATION AUTHORIZED — NO MANIFEST — NO IMAGE IMPORT — NO CODE/API/UI/SCHEMA/DB/QUOTA/WAVE2 CHANGE
STOP — STEP 5 ONLY WITH EXPLICIT INDEPENDENT OWNER MISSION
```

---

## §A — پیش‌نیازهای اجباری مأموریت (نتایج واقعی — ۲۰۲۶-۱۱-۰۷)

| الزام مأموریت §۱ | نتیجهٔ واقعی |
|---|---|
| وضعیت Git (branch/HEAD/Working Tree/Remote) | Branch = `main` · HEAD آغاز = **`cadb4198ba409d44d09ac496b72032f70882537d`** (کامیت ثبت اثبات Dictionary Upgrade / STEP 3، روی `ef5aae1` = کامیت محتوایی بستهٔ بازبینی انسانی) · Working Tree آغاز = **۰ tracked / ۰ untracked — پاک** · `git ls-remote backup refs/heads/main` = `cadb4198ba409d44d09ac496b72032f70882537d` = HEAD محلی · `git rev-list --left-right --count main...backup/main` = **۰/۰** — صفر بازیابی لازم نشد (صفر reset/rebase/force) |
| خواندن اسناد مرجع (۶ سند) | ✅ همه خوانده شد: `docs/SNAPSHOT.md` (سربرگ ۳۶مین ㊱ + §۲ + §۳ + §۶ + §۱۱-ج) · `worklog.md` (آخرین ورود = ثبت اثبات STEP 3) · Comprehensive Roadmap = `نقشه راه ها/نقشه-راه-جامع-توسعه-۲۰۲۶.md` (چک‌باکس‌های Dictionary Upgrade خطوط ۲۷۷/۲۷۸/۲۷۹ + یادداشت 📅 خط ۳۶۱) · گزارش STEP 1 · گزارش STEP 2 (+ §C-۴ اصلاحیهٔ شمارش) · بستهٔ STEP 3 (§A-§P) |
| تطبیق صحت آخرین وضعیت با Remote | ✅ `git ls-remote backup refs/heads/main` = `cadb4198…` = HEAD محلی — انطباق کامل؛ صفر ناسازگاری با اسناد |
| تطبیق دامنهٔ دقیق پایلوت (الزام §۱ مأموریت) | ✅ **۲۰ واژهٔ یکتا** عین §C-۴ گزارش STEP 2: `present, letter, bank, classroom, backpack, eraser, tall, wear, scarf, mechanic, kind, library, airport, animal, dentist, match, borrow, glad, plant, manteau` · **۱۹ واژهٔ تصویردار یکتا** = ۲۰ − `manteau` · **۱۹ تصویر یکتا** = idهای جدول §C-۲ بستهٔ STEP 3 (airport, animal, backpack, bank, borrow, classroom, dentist, eraser, glad, kind, letter, library, match, mechanic, plant, present, scarf, tall, wear) · **ردیف‌های کارت = ۲۱** (۲۰ شماره‌دار + manteau) — عین §D بستهٔ STEP 3 |
| حفظ همهٔ شواهد و سوابق تاریخی (الزام §۱ مأموریت) | ✅ گزارش‌های STEP 1/2/3 و SNAPSHOT/worklog/Roadmap در بخش‌های تاریخی **بایت‌به‌بیت دست‌نخورده** — این مأموریت فقط «لایهٔ تصمیم انسانی» را به‌عنوان سند جدید می‌افزاید و هیچ سابقه‌ای را بازنویسی/حذف نمی‌کند |

**کنترل‌های بایتی آغاز مأموریت (عین ثبت اسناد):**

| قلم | SHA256 / وضعیت |
|---|---|
| `db/custom.db` | `20df56a5365d426ea73169d3cfac8389931017a9bd4b51843dfade2de78c12a8` · 1,236,992B — فقط‌خواندنی (آغاز = پایان در §K) |
| هوک post-commit | `.git/hooks/post-commit` = `scripts/git-hooks/post-commit` = `ee679bc1b642db0f5ecc206544d1c10daf71cffe3827dad33d3b0177c58aed71` — دست‌نخورده |
| `WAVE2_UNGRADED_BOOKS` | خط ۶۶۵ بایت‌به‌بیت (فایل در diff این مأموریت نیست) |
| `git diff --check` | پاک |

**نتیجهٔ پیش‌نیاز:** صفر ناسازگاری؛ Local = Remote (۰/۰)؛ درخت پاک؛ دامنهٔ پایلوت دقیقاً تطبیق داده شد ⇒ ادامهٔ مأموریت مجاز شد.

## §B — ماهیت و دامنهٔ این ثبت (تفکیک الزامی)

| این سند **هست** | این سند **نیست** |
|---|---|
| ثبت مستند و پایدار تصمیم‌های صریح **انسانی مالک** برای ۲۰ واژهٔ پایلوت — عین متن مأموریت، در سطح درستِ معنی | بازبینی انسانیِ انجام‌شده توسط GLM — **GLM هیچ داوری انسانی‌ای انجام یا ادعا نکرده و نمی‌کند** |
| لایهٔ تصمیم انسانی روی زنجیرهٔ شواهد STEP 1 (ممیزی منبع) → STEP 2 (پیش‌بازبینی ماشینی) → STEP 3 (بستهٔ بازبینی) | تغییر یا بازنویسی هیچ گزارش تاریخی، وضعیت ماشینی، تالی یا نرخ (سوابق عیناً حفظ شدند) |
| تفکیک صریح واحدهای شمارش (تصویر یکتا / واژهٔ یکتا / ردیف کارت / سطر تصمیم سطح-معنی) | پیاده‌سازی، ورود به محصول، ساخت Manifest اجرایی، وندور یا ورود تصویر به `public/` |
| تعریف دامنهٔ دقیق و محدودیت هر تصمیم SENSE | مجوز STEP 5 یا هر گام/کارزار/Rollout بعدی — **صفر مجوز ضمنی** |

**قاعدهٔ طلایی این ثبت:** متن تصمیم‌ها عین مالک است (§D-۰)؛ GLM فقط مُنقِبِ مستند است. هر جا مشاهدهٔ ماشینیِ تاریخی با تصمیم مالک کنار می‌آید، هر دو ثبت شده‌اند (§H) — تصمیم مالک مرجع حاکم است و تقدم دارد؛ مشاهدهٔ ماشینی به‌عنوان سابقهٔ تاریخی زنجیرهٔ شواهد حفظ می‌شود.

## §C — واژگان تصمیم این ثبت (تعریف دقیق — پاسخ الزام «سطح درست معنی»)

مالک در مأموریت STEP 4 سه برچسب تصمیم به کار برد. این برچسب‌ها عیناً ثبت می‌شوند و تعریف عملیاتی‌شان برای خوانندهٔ آینده صریح می‌شود:

| برچسب مالک | تعریف عملیاتی در این ثبت | نسبت با برچسب‌های ماشینی STEP 2 | نزدیک‌ترین معادل در واژگان پیشنهادی §F سند STEP 3 |
|---|---|---|---|
| **SENSE** | تصویر مذکور برای **sense نام‌برده‌شده فقط** به‌صورت انسانی تصویب شد — تصمیم سطح-معنی با محدودهٔ صریح؛ تعمیم به هر sense/مدخل دیگرِ خارج از محدودهٔ نام‌برده مجاز نیست (§G) | `ACCEPT_CANDIDATE` و/یا `NEEDS_REVIEW` ماشینی را با داوری انسانی قطعی می‌بندد (نگاشت واژه‌به‌واژه: §H-۷) | `approved` با محدودهٔ sense (در صورت نیاز آینده، برچسب sense موضوع پیاده‌سازی است — در این مأموریت ممنوع) |
| **REJECT** | تصویر مذکور برای sense نام‌برده به‌صورت انسانی مردود اعلام شد | وضعیت `REJECT` ماشینی را تأیید/تثبیت می‌کند (فقط present) | `rejected` |
| **NO IMAGE** | تصویری وجود ندارد؛ وضعیت ساختاری `NO IMAGE / NO_MATCH_SOURCE` حفظ می‌شود — **هرگز «تصویر مردود انسانی» طبقه‌بندی نمی‌شود** (عین مقررهٔ مالک) | برچسب ماشینی تاریخی `REJECT — NO_MATCH_SOURCE` (ساختاری) را شفاف می‌کند | `no-image` |

- ثبت‌ها **verbatim**‌اند: هیچ برچسبی باز-برچسب‌زنی، ادغام، حذف یا تفسیر نشد.
- تصمیم‌های مالک در **سطح معنی**‌اند؛ بنابراین یک واژهٔ یکتا می‌تواند چند سطر تصمیم داشته باشد (عیناً مثل present — §D-۱).

## §D — ثبت تصمیم‌های مالک (سطح معنی)

### §D-۰) متن عین مالک (بایت‌به‌بیت — عین مأموریت STEP 4)

> ### present.webp
> - Noun: present = gift → REJECT.
> - Adjective: present = حاضر در کلاس → SENSE.
> - Verb: present = ارائه کردن → REJECT.
>
> ### letter.webp
> - Mail / written letter sense → SENSE.
> - Do not generalize this approval to the alphabet-letter sense.
>
> ### Other six-image review scope
> - `bank.webp` → SENSE for financial institution.
> - `scarf.webp` → SENSE for headscarf.
> - `match.webp` → SENSE for matchstick.
> - `borrow.webp` → SENSE for borrow.
> - `present.webp` and `letter.webp` retain their separate sense-level decisions above.
>
> ### Remaining 13 images
> The owner explicitly confirmed SENSE for all 13 remaining images:
> `classroom.webp`, `backpack.webp`, `eraser.webp`, `tall.webp`, `wear.webp`, `mechanic.webp`, `kind.webp`, `library.webp`, `airport.webp`, `animal.webp`, `dentist.webp`, `glad.webp`, `plant.webp`.
>
> ### manteau
> - No source image exists.
> - Preserve `NO IMAGE` / `NO_MATCH_SOURCE`.
> - Do not classify it as a human-rejected image.

### §D-۱) `present.webp` — سه سطر تصمیم سطح-معنی (یک واژهٔ یکتا · یک تصویر منبع مشترک · دو مدخل واقعی grade-12)

| سطر | سطح تصمیم (sense) | تصمیم مالک | نگاشت به دادهٔ واقعی محصول (STEP 2 §C-۲ / STEP 3 §D) |
|---|---|---|---|
| ۱ | اسم = gift (کادو/هدیه) | **REJECT** | برداشت اسمی مدخل `present (n, adj)` — g12 درس ۱ (`vocab-lesson-1.ts:226`) + درس ۲ (`vocab-lesson-2.ts:279`) — معنی کتابی «کادو، هدیه، حال حاضر» |
| ۲ | صفت = حاضر در کلاس | **SENSE** | برداشت صفتی همان مدخل (n, adj) — عین نگاشتی که تصویر منبع نشان می‌دهد (عکس گروهی کلاس = «حاضر در جلسه») |
| ۳ | فعل = ارائه کردن | **REJECT** | مدخل مستقل `present (v)` — g12 درس ۱ (`vocab-lesson-1.ts:227`) + درس ۲ (`vocab-lesson-2.ts:281`) — معنی کتابی «ارائه کردن، اهدا کردن، تقدیم کردن» |

- تصویر منبع: id = `present` · `public/atlas/img/present.webp` @ پین `19a9bd8` · 30,670B · SHA256 `3c16ec73…` (جدول §C-۲ بستهٔ STEP 3) — **یک تصویر برای هر سه سطر**؛ تفکیک تصمیم‌ها در سطح معنی است نه در سطح فایل.
- **تلهٔ چندمعنایی اثبات‌شدهٔ STEP 1 اکنون در سطح تصمیم انسانی حل شد:** تصویر برای «کادو/هدیه» (اسم) مردود است و هرگز نباید برای آن معنی استفاده شود؛ تنها برداشت صفتی («حاضر در کلاس») تصویب شد.

### §D-۲) `letter.webp` — تصویب سطح-معنی با محدودهٔ صریح

| سطر | سطح تصمیم (sense) | تصمیم مالک | نگاشت به دادهٔ واقعی محصول |
|---|---|---|---|
| ۴ | نامه / نامهٔ کاغذی (mail / written letter) | **SENSE** | `Letter` — grade-7 درس ۰ (`vocab-lesson-0.ts:15`) معنی دوم «نامه» + `letter` junior grade-9 (`vision-one/vocab-junior.ts:581,705`) معنی اول «نامه - حرف» |
| — | حرف الفبا (alphabet letter) | **خارج از محدودهٔ تصویب — تعمیم ممنوع** (عین مالک: «Do not generalize this approval to the alphabet-letter sense») | معنی اول جزوهٔ grade-7 — این sense هرگز تصویر نداشته است؛ این تصمیم «رد تصویر» نیست (تصویری وجود نداشت) بلکه محروم‌سازی صریح از تصویب است |

- تصویر منبع: id = `letter` · `public/atlas/img/letter.webp` @ پین `19a9bd8` · 26,692B · SHA256 `0c628e8f…`.

### §D-۳) چهار تصویر دیگر از شش‌تاییِ حوزهٔ بازبینی — تصویب سطح-معنی

| سطر | تصویر | سطح تصمیم (sense) | تصمیم مالک | نگاشت به دادهٔ واقعی محصول |
|---|---|---|---|---|
| ۵ | `bank.webp` | مؤسسهٔ مالی (financial institution) | **SENSE** | `bank` — grade-7 درس ۳ (`vocab-lesson-3.ts:50`) + درس ۰ (`vocab-lesson-0.ts:31`) — معنی «بانک» (sense دوم کتابی «ساحل» خارج از پوشش — §G) |
| ۶ | `scarf.webp` | روسری (headscarf) | **SENSE** | `scarf` — grade-7 `dictionary.ts` درس ۵ + `vocab-lesson-5` — معنی کتابی «روسری» |
| ۷ | `match.webp` | چوب کبریت (matchstick) | **SENSE** | `match` — grade-9 مدخل junior-equivalent — معنی اولِ چاپ جزوه «چوب کبریت» |
| ۸ | `borrow.webp` | قرض گرفتن (borrow) | **SENSE** | `borrow` — grade-11 درس ۱ (`vocab-lesson-1.ts:41`) — معنی «قرض گرفتن» (جهت معنایی — §H-۲) |

- مطابق مالک، `present.webp` و `letter.webp` تصمیم‌های مستقل سطح-معنی خودشان را حفظ می‌کنند (§D-۱ و §D-۲) — عیناً ثبت شد.
- تصویرهای منبع: bank `bfc2c449…`/19,984B · scarf `199a8044…`/29,580B · match `55e617b5…`/21,636B · borrow `7c41c07f…`/31,112B (همه @ پین `19a9bd8` — جدول §C-۲ بستهٔ STEP 3).

### §D-۴) سیزده تصویر باقی‌مانده — تأیید صریح مالک

مالک صریحاً SENSE را برای هر ۱۳ تصویر باقی‌مانده تأیید کرد (عین فهرست مأموریت):

`classroom.webp` · `backpack.webp` · `eraser.webp` · `tall.webp` · `wear.webp` · `mechanic.webp` · `kind.webp` · `library.webp` · `airport.webp` · `animal.webp` · `dentist.webp` · `glad.webp` · `plant.webp`

| سطر | تصویر | تصمیم مالک | معنی کتابی هدف (عین §C-۲ STEP 2) |
|---|---|---|---|
| ۹ | `classroom.webp` | **SENSE** | «کلاس درس» |
| ۱۰ | `backpack.webp` | **SENSE** | «کوله پشتی» |
| ۱۱ | `eraser.webp` | **SENSE** | «مدادپاک کن، تخته پاک» |
| ۱۲ | `tall.webp` | **SENSE** | «قدبلند، بلند» |
| ۱۳ | `wear.webp` | **SENSE** | «پوشیدن، پوشاک، عینک زدن» (هدف = پوشیدن) |
| ۱۴ | `mechanic.webp` | **SENSE** | «مکانیک، تعمیرکارخودرو» |
| ۱۵ | `kind.webp` | **SENSE** | «مهربان، نوع» (هدف = مهربان) |
| ۱۶ | `library.webp` | **SENSE** | «کتابخانه» |
| ۱۷ | `airport.webp` | **SENSE** | «فرودگاه» |
| ۱۸ | `animal.webp` | **SENSE** | «حیوان» |
| ۱۹ | `dentist.webp` | **SENSE** | «دندانپزشک» |
| ۲۰ | `glad.webp` | **SENSE** | «خوشحال، شاد» |
| ۲۱ | `plant.webp` | **SENSE** | «گیاه - کاشتن» (g11) / «گیاه، کارخانه» (vision-one) — هدف = گیاه |

### §D-۵) `manteau` — NO IMAGE حفظ شد (نه تصویر مردود)

| سطر | موضوع | ثبت عین مالک | توضیح ثبت |
|---|---|---|---|
| ۲۲ | `manteau` | **NO IMAGE / NO_MATCH_SOURCE حفظ می‌شود؛ به‌عنوان تصویر مردودِ انسانی طبقه‌بندی نمی‌شود** | هیچ تصویر منبعی وجود ندارد (۰ رکورد از 7,298 در پین `19a9bd8` — STEP 2 §D سطر آخر). برچسب ماشینی تاریخی `REJECT — NO_MATCH_SOURCE` ماهیت **ساختاری** داشت؛ مالک صریحاً مقرر کرد این مورد هیچ‌گاه «تصویر مردود انسانی» شمرده نشود. مسیر آیندهٔ تصویرگذاری (تولید AI / بدون تصویر / هر مسیر دیگر) کاملاً باز و منحصراً تصمیم مالک در مأموریتی مستقل است |

### §D-۶) جدول کامل ۲۲ سطر تصمیم سطح-معنی (خلاصهٔ §D-۱ تا §D-۵)

| # | واژهٔ یکتا | تصویر منبع | سطح تصمیم | برچسب مالک |
|---|---|---|---|---|
| ۱ | present | `present.webp` | اسم = gift (کادو/هدیه) | **REJECT** |
| ۲ | present | `present.webp` | صفت = حاضر در کلاس | **SENSE** |
| ۳ | present | `present.webp` | فعل = ارائه کردن | **REJECT** |
| ۴ | letter | `letter.webp` | نامه (mail) | **SENSE** |
| ۵ | bank | `bank.webp` | مؤسسهٔ مالی | **SENSE** |
| ۶ | scarf | `scarf.webp` | روسری (headscarf) | **SENSE** |
| ۷ | match | `match.webp` | چوب کبریت (matchstick) | **SENSE** |
| ۸ | borrow | `borrow.webp` | قرض گرفتن (borrow) | **SENSE** |
| ۹ | classroom | `classroom.webp` | کلاس درس | **SENSE** |
| ۱۰ | backpack | `backpack.webp` | کوله پشتی | **SENSE** |
| ۱۱ | eraser | `eraser.webp` | مدادپاک کن | **SENSE** |
| ۱۲ | tall | `tall.webp` | قدبلند، بلند | **SENSE** |
| ۱۳ | wear | `wear.webp` | پوشیدن | **SENSE** |
| ۱۴ | mechanic | `mechanic.webp` | مکانیک | **SENSE** |
| ۱۵ | kind | `kind.webp` | مهربان | **SENSE** |
| ۱۶ | library | `library.webp` | کتابخانه | **SENSE** |
| ۱۷ | airport | `airport.webp` | فرودگاه | **SENSE** |
| ۱۸ | animal | `animal.webp` | حیوان | **SENSE** |
| ۱۹ | dentist | `dentist.webp` | دندانپزشک | **SENSE** |
| ۲۰ | glad | `glad.webp` | خوشحال، شاد | **SENSE** |
| ۲۱ | plant | `plant.webp` | گیاه | **SENSE** |
| ۲۲ | manteau | — (وجود ندارد) | — (وضعیت ساختاری) | **NO IMAGE** (حفظ — نه تصویر مردود) |

### §D-۷) جمع برچسب‌های تصمیم

| برچسب مالک | تعداد سطر تصمیم سطح-معنی | سطرها |
|---|---|---|
| **SENSE** | **۱۹** | ۲ (present صفت) + ۴ (letter نامه) + ۵..۸ (bank/scarf/match/borrow) + ۹..۲۱ (۱۳ تصویر باقی‌مانده) |
| **REJECT** | **۲** | ۱ (present اسم=gift) + ۳ (present فعل=ارائه کردن) |
| **NO IMAGE** | **۱** | ۲۲ (manteau — حفظ وضعیت ساختاری) |
| **جمع** | **۲۲** | ✓ |

## §E — واحدهای شمارش و سازگاری جمع‌ها (پاسخ الزام §۳ مأموریت — تفکیک «تعداد تصویر یکتا / تعداد واژگان / ردیف‌های کارت»)

| واحد | تعریف | تعداد | سازگاری |
|---|---|---|---|
| **تصویر یکتا** | فایل WebP یکتا در پین `19a9bd8` برای پایلوت | **۱۹** | = idهای جدول §C-۲ بستهٔ STEP 3 (شامل `present.webp` یک‌بار با سه سطر تصمیم) |
| **واژهٔ یکتا (مخرج رسمی تالی STEP 2)** | هر لِمّای انگلیسی یک‌بار | **۲۰** = ۱۹ تصویردار + ۱ بدون تصویر (`manteau`) | بر حسب برچسب مالک: ۱۸ واژه فقط-Sense (`bank, scarf, match, borrow, letter, classroom, backpack, eraser, tall, wear, mechanic, kind, library, airport, animal, dentist, glad, plant`) + ۱ واژهٔ مختلط (present = ۱ SENSE + ۲ REJECT) + ۱ NO IMAGE (`manteau`) = ۲۰ ✓ |
| **ردیف کارت/مدخل (واحد §D گزارش STEP 2 و بستهٔ STEP 3)** | هر «مدخل جزوه × تصویر منبع» | **۲۱** = ۲۰ شماره‌دار + ۱ `manteau` | ردیف ۱ و ۲ = دو مدخل واقعی grade-12 واژهٔ واحد `present` — عین §C-۴ گزارش STEP 2؛ بدون تغییر تاریخی |
| **سطر تصمیم سطح-معنی (واحد این ثبت — STEP 4)** | هر sense داوری‌شدهٔ صریح مالک | **۲۲** = ۲۱ ردیف کارت + ۱ (تفکیک برداشت صفتی present از کارت واحد (n, adj)) | ۱۹ SENSE + ۲ REJECT + ۱ NO IMAGE = ۲۲ ✓ |

- **نکتهٔ کلیدی سازگاری:** واحد مالک (سطح معنی) ریزتر از همهٔ واحدهای قبلی است؛ کارت واحد `present (n, adj)` در STEP 2 یک ردیف بود ولی در سطح تصمیم دو سطر مستقل می‌شود (اسم REJECT / صفت SENSE) — همان الگویی که مأموریت STEP 3 با «دو کارت مستقل» برای دو مدخل آغاز کرده بود، اکنون مالک درون کارت (n, adj) هم تفکیک کرد.
- **صفر تغییر در سوابق تاریخی:** تالی `14/4/2` (واژه‌محور) و `14/4/3` (ردیف‌محور) و نرخ‌های `70/20/10%` همچنان عین §C-۴/§G گزارش STEP 2 و بخش تاریخی‌اند — این ثبت هیچ نرخ یا تالی جدیدی تولید نمی‌کند و هیچ رکورد ماشینی را بازنویسی نمی‌کند.

## §F — تفکیک پیش‌بازبینی ماشینی STEP 2 از بازبینی انسانی مالک STEP 4 (پاسخ الزام §۳ مأموریت)

| بُعد | STEP 2 — پیش‌بازبینی ماشینی (۲۰۲۶-۱۱-۰۵) | STEP 4 — ثبت تصمیم بازبینی انسانی مالک (۲۰۲۶-۱۱-۰۷) |
|---|---|---|
| عامل | عامل GLM (Z.ai) — **ماشینی** | **مالک پروژه — انسانی** (تنها مرجع داوری انسانی) |
| ماهیت | نامزدسازی/پیش‌داوری برای تسهیل بازبینی انسانی | داوری صریح و قطعی انسانی در سطح معنی |
| برچسب‌ها | `ACCEPT_CANDIDATE` / `NEEDS_REVIEW` / `REJECT` (واژگان نامزدی — صریحاً غیرتصویبی) | `SENSE` / `REJECT` / `NO IMAGE` (واژگان تصمیم مالک) |
| اعتبار تصمیم | هیچ اعتبار تأییدی — «CANDIDATE» عمداً همین معنا را داشت | مرجع تصمیم انسانی ثبت‌شده و حاکم |
| خروجی | گزارش پایلوت §D (۲۱ ردیف) + تالی 14/4/2 | همین سند (۲۲ سطر تصمیم سطح-معنی) |
| رابطهٔ دو لایه | **سابقهٔ تاریخی حفظ‌شده** — گزارش STEP 2 بایت‌به‌بیت دست‌نخورده | تصمیم مالک بر پیش‌بازبینی ماشینی **تقدم دارد**؛ اما سابقهٔ ماشینی را پاک/بازنویسی نمی‌کند (حفظ شواهد — §A) |

**نگاشت بستن وضعیت‌های ماشینی با تصمیم مالک (تطبیق کامل ۲۰/۲۰):**

| وضعیت ماشینی STEP 2 (واژهٔ یکتا) | تعداد | پوشش با تصمیم STEP 4 |
|---|---|---|
| `ACCEPT_CANDIDATE` | ۱۴ (bank + ۱۳ تصویر باقی‌مانده) | **۱۴/۱۴** → SENSE سطح-معنی مالک |
| `NEEDS_REVIEW` | ۴ (`letter`,`scarf`,`match`,`borrow`) | **۴/۴** → SENSE سطح-معنی با محدودهٔ صریح (§G) |
| `REJECT` | ۲ (`present` + `manteau`) | present → تفکیک ۳ سطر معنی (۱ SENSE + ۲ REJECT) · manteau → **NO IMAGE حفظ شد** (صریحاً نه تصویر مردود انسانی) |

## §G — دامنه و محدودیت دقیق هر تصمیم SENSE (پاسخ الزام §۳ مأموریت)

**قاعدهٔ عمومی محدوده:** هر تصمیم SENSE فقط sense نام‌برده را می‌پوشاند؛ تعمیم به sense دوم/سوم، مدخل دیگر، کتاب/درس دیگر یا واژهٔ دیگرِ خارج از ۲۰ واژهٔ پایلوت مجاز نیست. هر گام آینده (هرگز-اگر-مجوز بگیرد) باید تصمیم را همراه همین محدوده حمل کند.

| # | واژه | sense تصویب‌شده (کل محدودهٔ تصمیم) | صریحاً خارج از پوشش این تصمیم |
|---|---|---|---|
| ۲ | present | صفت = حاضر در کلاس | اسم = gift (REJECT صریح سطر ۱) · فعل = ارائه کردن (REJECT صریح سطر ۳) · هر برداشت/مدخل دیگر |
| ۴ | letter | نامه / نامهٔ کاغذی (mail) | **حرف الفبا — تعمیم ممنوع (عین مالک)**؛ هر sense دیگر |
| ۵ | bank | مؤسسهٔ مالی (بانک) | ساحل (رود) — معنی دوم کتابی، بدون تصویر و خارج از تصویب |
| ۶ | scarf | روسری (headscarf) | — (تک معنی کتابی مدخل) — مشاهدهٔ ثبت‌شدهٔ محتوای تصویر: §H-۲ |
| ۷ | match | چوب کبریت (matchstick — معنی اول چاپ) | مسابقه — در تصویب نیامده — مشاهدهٔ ثبت‌شدهٔ محتوای تصویر: §H-۲ |
| ۸ | borrow | قرض گرفتن (borrow) | lend (دادن) — خارج از تصویب؛ مشاهدهٔ جهتی: §H-۲ |
| ۹ | classroom | کلاس درس | — (تک-sense مستند) |
| ۱۰ | backpack | کوله پشتی (شیء) | — |
| ۱۱ | eraser | مدادپاک کن | — (تک-sense مستند) |
| ۱۲ | tall | قدبلند، بلند | — (تک-sense مستند) |
| ۱۳ | wear | پوشیدن (sense اول) | «عینک زدن» (sense سوم) — بدون تصویر، خارج از پوشش |
| ۱۴ | mechanic | مکانیک، تعمیرکار خودرو | — (تک-sense مستند) |
| ۱۵ | kind | مهربان (sense اول صفت) | «نوع» (n.) — خارج از پوشش |
| ۱۶ | library | کتابخانه | — (مدخل جدا `librarian` مشمول این تصمیم نیست) |
| ۱۷ | airport | فرودگاه | — (تک-sense مستند) |
| ۱۸ | animal | حیوان | — |
| ۱۹ | dentist | دندانپزشک | — (تک-sense مستند) |
| ۲۰ | glad | خوشحال، شاد | — (تشخیص glad/happy سمت واژه است نه تصویر) |
| ۲۱ | plant | گیاه (sense اول) | «کاشتن» (v) و «کارخانه» — خارج از پوشش |

- سطرهای REJECT (۱ و ۳) و NO IMAGE (۲۲) در این جدول نیستند چون محدوده‌شان عین §D-۱/§D-۵ است.
- **هیچ تصمیمی دربارهٔ موارد زیر گرفته نشد (باز و منحصراً مالکی):** شکل فنی برچسب sense در UI، سیاست attribution در رندر، مسیر تصویر `manteau`، پوشش senseهای خارج از پوشش بالا، تعمیم به ۴۳۲ مدخل دیکشنری یا دامنهٔ 2,745واژه‌ای.

## §H — یادداشت‌های تطبیق (Reconciliation Notes — شفاف کامل)

1. **تطبیق‌های کامل تصمیم↔مشاهدهٔ ثبت‌شده:** `bank` (تصویر = داخل شعبهٔ بانک ↔ مؤسسهٔ مالی) و `present` صفت (تصویر = عکس گروهی کلاس ↔ «حاضر در کلاس») — تصمیم مالک دقیقاً با مشاهدهٔ مستند STEP 2 §D/STEP 3 §D هم‌سوست؛ تلهٔ اثبات‌شدهٔ STEP 1 با تفکیک سطح-معنی حل شد (هشدار بستهٔ STEP 3: «این تصویر نباید برای کادو/هدیه تأیید شود» — اکنون با REJECT صریح مالک تثبیت شد).
2. **حفظ مشاهده‌های ماشینی تاریخی در کنار تصمیم مالک (الزام «حفظ شواهد» §۱ مأموریت):** برای چهار واژهٔ `NEEDS_REVIEW` سابق، مشاهدهٔ مستندِ محتوای تصویر عیناً در گزارش‌های تاریخی باقی است و بخشی از زنجیرهٔ شواهد می‌ماند: `scarf` (تصویر = شال‌گردن زمستانی در برف — STEP 2 §D ردیف ۱۰ / STEP 3 §D-۱۰) · `match` (تصویر = مسابقهٔ تنیس؛ انطباق با کبریت = صفر — STEP 2 §D ردیف ۱۷ / STEP 3 §D-۱۷) · `borrow` (صحنه از نگاه دهنده — ابهت جهتی — STEP 2 §D ردیف ۱۸ / STEP 3 §D-۱۸) · `letter` (حرف الفبا = معنی اول g7 بدون تصویر — STEP 2 §D ردیف ۳ / STEP 3 §D-۳). **تقدم تصمیم:** داوری انسانی مالک مرجع حاکم است و بر پیش‌بازبینی ماشینی تقدم دارد؛ با این حال هر گام آیندهٔ هرگز-اگر-پیاده‌سازی باید هم تصمیم مالک و هم مشاهدهٔ ثبت‌شده را با هم حمل کند (مثلاً از طریق برچسب sense یا تصمیم جایگزینی) — **هیچ پیاده‌سازی‌ای در STEP 4 مجاز یا انجام نشد.**
3. **تفاوت واحدهای شمارش:** ۲۱ ردیف کارت (STEP 2/3) ↔ ۲۲ سطر تصمیم (STEP 4) — تنها تفاوت = تفکیک برداشت صفتی present از کارت واحد (n, adj) (§E). ردیف تاریخی STEP 2 بدون تغییر مانده است.
4. **letter-الفبا «رد» نیست:** تصمیم «تعمیم ممنوع» = محروم‌سازی از محدودهٔ تصویب است؛ آن sense هرگز تصویر نداشته و هیچ تصویری رد نشده است.
5. **manteau:** برچسب تاریخی `REJECT — NO_MATCH_SOURCE` ماشینی/ساختاری بود؛ مقررهٔ صریح مالک (حفظ NO IMAGE / NO_MATCH_SOURCE؛ عدم طبقه‌بندی به‌عنوان تصویر مردود انسانی) عیناً ثبت شد (§D-۵) — از این پس هر سند آینده باید از این تفکیک پیروی کند.
6. **نگاشت به واژگان پیشنهادی §F سند STEP 3:** آن واژگان (approved/rejected/needs-sense-label/needs-alternative-image/no-image) «پیشنهاد» بود نه قالب الزامی؛ مالک برچسب‌های خودش را به کار برد (`SENSE`/`REJECT`/`NO IMAGE`) — عیناً ثبت شد؛ نزدیک‌ترین نگاشت: SENSE ≈ approved با محدودهٔ sense · REJECT ≈ rejected · NO IMAGE ≈ no-image. صفر باز-برچسب‌زنی انجام شد.
7. **صفر تغییر نتیجه/وضعیت/نرخ STEP 2:** همهٔ رکوردهای ماشینی (تالی 14/4/2، ردیف‌ها ۲۱، نرخ‌های 70/20/10%) عین سابق حفظ شدند؛ این ثبت لایهٔ انسانی را می‌افزاید نه اینکه لایهٔ ماشینی را ویرایش کند.
8. **زنجیرهٔ نسخهٔ تصاویر پابرجا:** تصمیم‌ها به نسخهٔ پین‌شدهٔ `19a9bd8` تعلق دارند (بایت-راستی‌آزمایی‌شدهٔ ۱۹/۱۹ در STEP 3 §C-۲)؛ هر ارتقای نسخهٔ upstream = بازممیزی + بازبینی/باز-تصمیم لازم.

## §I — آنچه این ثبت مجاز نمی‌داند (پاسخ الزام §۳ مأموریت — صریح)

| مورد | وضعیت |
|---|---|
| پیاده‌سازی در محصول (کد/UI/API/Runtime) | **مجاز نیست و انجام نشد** — تصمیم‌های این سند فقط ثبت مستنداتی‌اند |
| ورود/وندور/انتشار هر تصویری در ریپو یا `public/` | **مجاز نیست و انجام نشد** — صفر فایل تصویری در diff |
| ساخت Manifest اجرایی (executable) | **مجاز نیست و انجام نشد** — هیچ فایل JSON/JS/TS اجرایی ساخته نشد |
| تغییر Schema/Prisma/دیتابیس/سهمیهٔ `/api/word-image` | **مجاز نیست و انجام نشد** |
| تغییر `WAVE2_UNGRADED_BOOKS` / Hill / Wave 2 / STEP-18 | **مجاز نیست و انجام نشد** — بایت‌به‌بیت |
| تبدیل خودکار تصمیم‌ها به رفتار محصول یا قابلیت جدید | **مجاز نیست** — هر گام آینده فقط با مأموریت مستقل صریح مالک باز می‌شود (STEP 5 آغاز نشد) |

## §J — مستندات به‌روزشده (مسیرهای دقیق — بدون placeholder)

| فایل | نوع تغییر |
|---|---|
| `docs/qa/dictionary-upgrade-step4-human-review-decisions-2026-11-07.md` | **جدید** — همین سند ثبت تصمیم‌ها (§A-§P) |
| `docs/SNAPSHOT.md` | سربرگ (۳۷مین ㊲) + §۲ (Git) + §۳ + §۴ + §۵ + §۶ + §۷ + §۸ + §۱۱-ج |
| `worklog.md` | ورود تاریخ‌دار کامل اجرای STEP 4 |
| `نقشه راه ها/نقشه-راه-جامع-توسعه-۲۰۲۶.md` | ردیف چک‌باکس STEP 4 + یادداشت 📅 |

فقط همین ۴ فایل مستنداتی مجاز به تغییر بودند — صفر فایل دیگر.

## §K — گیت و کنترل‌های نهایی (الگوی دوکامیت پروژه)

| کنترل | نتیجهٔ واقعی |
|---|---|
| `bun run lint` | **۰ خطا** (exit 0) — صفر تغییر کد وجود دارد که lint بخورد |
| `git diff --check` | پاک |
| دامنهٔ تغییرات commit محتوایی | فقط ۴ فایل مستنداتی (§J) — **صفر فایل کد/داده/دارایی** |
| `db/custom.db` پایان | SHA256 = `20df56a5365d426ea73169d3cfac8389931017a9bd4b51843dfade2de78c12a8` · 1,236,992B = آغاز — **دست‌نخورده** |
| هوک post-commit پایان | SHA256 = `ee679bc1b642db0f5ecc206544d1c10daf71cffe3827dad33d3b0177c58aed71` = آغاز — **دست‌نخورده** |
| `WAVE2_UNGRADED_BOOKS` | خط ۶۶۵ بایت‌به‌بیت (فایل در diff نیست) |
| Commit محتوایی | SHA این کامیت پس از push در SNAPSHOT §۲ و worklog ثبت می‌شود (قاعدهٔ §۱۰-۷ — ثبت SHA ثبت-اثبات «یکی بعدتر» طبق الگوی مستقر) |
| اثبات Remote پس از کامیت محتوایی | `git ls-remote backup refs/heads/main` = SHA محلی — **۰/۰** · درخت پاک |
| Commit ثبت اثبات | SHA این کامیت پس از push در SNAPSHOT §۲ و worklog ثبت می‌شود؛ اثبات مجدد ls-remote در همان لحظه |
| حذف آرتیفت‌های موقت | این مأموریت هیچ آرتیفت موقتی (کلون/دانلود/اسکریپت) تولید نکرد — صفر مورد |
| توکن | هرگز در لاگ/گزارش چاپ نشد |

## §L — انطباق با ممنوعیت‌های §۴ مأموریت (چک‌لیست)

| ممنوعیت عین مأموریت | وضعیت |
|---|---|
| تغییر کد، UI، API، Prisma Schema یا دیتابیس | ✅ صفر — diff فقط ۴ فایل مستنداتی (§J)؛ `db/custom.db` آغاز=پایان |
| وارد کردن، کپی، وندور یا انتشار هر تصویری | ✅ صفر — صفر فایل تصویری در diff؛ تصاویر فقط با URL پین‌شده در اسناد قبلی ارجاع دارند |
| ساخت Manifest اجرایی | ✅ هیچ — هیچ فایل اجرایی ساخته/اجرا نشد |
| تغییر سهمیه، رفتار Runtime، Wave 2، Hill یا STEP-18 | ✅ صفر — `WAVE2_UNGRADED_BOOKS` بایت‌به‌بیت (خط ۶۶۵) |
| آغاز STEP 5 یا هر مأموریت اضافی | ✅ صفر — توقف اجباری پس از این ثبت |
| دست‌کاری فایل‌های untracked بی‌ربط | ✅ صفر — آغاز و پایان درخت پاک |

## §M — ریسک‌ها، محدودیت‌ها و تصمیم‌های آیندهٔ منحصراً مالکی (هیچ‌کدام خودکار گرفته نشد)

1. **تصمیم ≠ پیاده‌سازی:** تصویب‌های سطح-معنی هیچ رفتار محصولی فعال نمی‌کنند؛ فاصلهٔ تصمیم‌تا-رندر (manifest واقعی، وندور، attribution، برچسب sense در UI، اولویت curated > AI > بدون تصویر) همگی نیازمند مأموریت مستقل آینده‌اند.
2. **محدودیت‌های ارثی منبع پابرجاست:** محتوای AI، بررسی خودکار، بدون proofread per-entry، as-is (STEP 1 §B-۴) — تصمیم‌های این ثبت نیز با همین محدودیت حمل می‌شوند.
3. **پین upstream پابرجا:** هر استفادهٔ آینده باید به `19a9bd8` پین بماند؛ ارتقای نسخه = بازممیزی + باز-تصمیم.
4. **بازهای تصمیم برای مالک:** ① شکل فنی برچسب sense و سیاست attribution ② مسیر تصویر `manteau` ③ پوشش senseهای خارج از پوشش (§G) ④ کارزار بازبینی کامل ۴۳۲ مدخل دیکشنری ⑤ هر گام STEP 5+ — هیچ‌کدام در این مأموریت آغاز یا پیش‌فرض‌گذاری نشد.
5. **مرز Wave-2/STEP-18 پابرجا:** این ثبت هیچ تداخلی با نمونه‌گیری STEP-18، Hill، collocations یا `WAVE2_UNGRADED_BOOKS` نداشت.

## §P — وضعیت نهایی

```text
STEP 4 — OWNER HUMAN-REVIEW DECISIONS REGISTERED (2026-11-07)
SCOPE: EXACTLY THE 20 PILOT WORDS — SENSE-LEVEL DECISIONS: 19 SENSE / 2 REJECT / 1 NO-IMAGE (= 22 SENSE-LEVEL ROWS = 21 CARD ROWS + present ADJECTIVE SPLIT)
present: NOUN GIFT → REJECT · ADJ حاضر در کلاس → SENSE · VERB ارائه کردن → REJECT (ONE UNIQUE WORD, ONE SHARED IMAGE, TWO REAL GRADE-12 ENTRIES)
letter: SENSE FOR MAIL ONLY — ALPHABET-LETTER SENSE EXCLUDED FROM APPROVAL (VERBATIM OWNER RULE)
manteau: NO IMAGE / NO_MATCH_SOURCE PRESERVED — NOT A HUMAN-REJECTED IMAGE
STEP 2 MACHINE PRE-REVIEW PRESERVED UNCHANGED (HISTORICAL) — OWNER DECISIONS AUTHORITATIVE — NO RECORD REWRITTEN — NO FABRICATED REVIEW
NO IMPLEMENTATION — NO PRODUCT INTEGRATION AUTHORIZED — NO MANIFEST — NO IMAGE IMPORT — NO CODE/API/UI/SCHEMA/DB/QUOTA/WAVE2 CHANGE — DB/HOOK UNTOUCHED
STOP — STEP 5 ONLY WITH EXPLICIT INDEPENDENT OWNER MISSION
```
