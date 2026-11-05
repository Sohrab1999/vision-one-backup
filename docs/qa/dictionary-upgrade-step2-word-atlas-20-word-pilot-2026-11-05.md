# Dictionary Upgrade / STEP 2 — پایلوت تأیید معنایی ۲۰ واژهٔ Word Atlas (Sense-Verified 20-Word Pilot — ONLY FEASIBILITY EVIDENCE — NO IMPLEMENTATION)

> **تاریخ مأموریت:** ۱۴۰۵/۸/۱۴ — ۲۰۲۶-۱۱-۰۵ · **نوع مأموریت:** پایلوت محدود ۲۰ واژه‌ای با مجوز صریح مالک (Owner-approved Pilot — مجموع دقیقاً ۲۰ واژه)
> **هدف (عین مأموریت):** سنجش امکان تطبیق معنایی تصویر با معنی واقعی واژه در کتاب‌های درسی پروژه — **هیچ مجوزی برای پیاده‌سازی محصول، تغییر Schema یا دیتابیس، ورود انبوه تصاویر یا انتشار قابلیت جدید صادر نشده است**
> **ماهیت:** صفر تغییر کد/داده/ترجمه/Schema/db/دارایی — فقط یک سند گزارش جدید + به‌روزرسانی مستندات مرجع (SNAPSHOT/worklog/Roadmap)
> **پیش‌نیاز:** گزارش STEP 1 = `docs/qa/dictionary-upgrade-step1-word-atlas-source-audit-2026-11-05.md` (پین upstream `19a9bd8`)
> **وضعیت نهایی:**

```text
DICTIONARY UPGRADE — STEP 2 CLOSED (2026-11-05) — 20-WORD SENSE-VERIFIED PILOT COMPLETED (EVIDENCE ONLY — NO IMPLEMENTATION)
SET: EXACTLY 20 WORDS — 3 MANDATORY POLYSEMY TRAPS (present / letter / bank) + 16 STRATIFIED + 1 DELIBERATE NO-MATCH (documented, not hidden)
MACHINE PRE-REVIEW TALLY: ACCEPT_CANDIDATE = 14/20 (70%) · NEEDS_REVIEW = 4/20 (20%) · REJECT = 2/20 (10%)
REJECT: present (IMAGE = CLASS-PRESENT SENSE vs TARGET GIFT کادو/هدیه) · manteau (NO WORD ATLAS RECORD EXISTS — 0/7,298)
NEEDS_REVIEW: letter (alphabet-letter sense uncovered) · scarf (روسری=head-scarf vs IMAGE=neck-scarf) · match (matchstick sense uncovered) · borrow (borrow/lend direction ambiguity)
KEY FINDING: 5/19 IMAGE-BEARING WORDS (26.3%) FAILED FULL SENSE-ALIGNMENT ⇒ STRING MATCH ≠ SENSE MATCH (MANDATORY SENSE MAPPING CONFIRMED)
INTEGRITY: ALL STATUSES ARE MACHINE (GLM) PRE-REVIEW — ZERO HUMAN REVIEW PERFORMED — NO FABRICATED REVIEWER/OWNER DECISION
UPSTREAM PIN RE-VERIFIED: 19a9bd889d2f642fef1d8d0eef85a3f35e1a66ff (2026-10-31) — IDENTICAL TO STEP 1 PIN — NO VERSION DIVERGENCE
LICENSE RE-VERIFIED FROM REAL FILES: CODE MIT · DATASET/ILLUSTRATIONS/AUDIO CC BY 4.0 — ATTRIBUTION = "Word Atlas contributors — CC BY 4.0" + license link + modification disclosure
INHERITED LIMITATION PRESERVED VERBATIM: AI-GENERATED, AUTOMATICALLY CHECKED, NOT PROOFREAD ENTRY BY ENTRY, AS-IS WITHOUT WARRANTY
RATES NOT GENERALIZABLE: NON-RANDOM SAMPLE (stratified + deliberate traps + forced no-match) — NO EXTRAPOLATION TO 432-WORD MODULE OR 2,745-WORD DOMAIN
ARCHITECTURE PRIORITY UNCHANGED (STEP 1): curated image > existing AI image endpoint > no image
NO CODE/DATA/TRANSLATION/SCHEMA/DB/ASSET CHANGE — NO RUNTIME MANIFEST — NO IMAGES IN public/ — DB/HOOK/WAVE2 UNTOUCHED (SHA256 START=END)
STOP — STEP 3 / ANY IMPLEMENTATION ONLY WITH EXPLICIT INDEPENDENT OWNER MISSION
```

---

## §A — پیش‌نیاز اجباری (نتایج واقعی — ۲۰۲۶-۱۱-۰۵)

| کنترل | نتیجهٔ واقعی |
|---|---|
| Branch | `main` |
| HEAD آغاز | `78b85d38295d80e8021dd3c4739e47e50f59fef4` — کامیت ثبت اثبات Dictionary Upgrade / STEP 1 (روی `2b9f572` = کامیت محتوایی گزارش STEP 1) |
| Remote | `backup` = `github.com/Sohrab1999/vision-one-backup` — `git ls-remote backup refs/heads/main` = `78b85d38295d80e8021dd3c4739e47e50f59fef4` = HEAD محلی = `backup/main` — **۰/۰ — Local عقب نبود؛ صفر بازیابی؛ صفر merge/reset/rebase/force** |
| Working Tree آغاز | **۰ tracked / ۰ untracked — تمیز** (`git status`: "nothing to commit, working tree clean") |
| هوک post-commit | `.git/hooks/post-commit` SHA256 = `ee679bc1b642db0f5ecc206544d1c10daf71cffe3827dad33d3b0177c58aed71` = پایانهٔ ثبت‌شدهٔ همهٔ گزارش‌های قبلی = نسخهٔ tracked `scripts/git-hooks/post-commit` — **دست‌نخورده** |
| پایگاه داده (آغاز) | `db/custom.db` SHA256 = `20df56a5365d426ea73169d3cfac8389931017a9bd4b51843dfade2de78c12a8` · اندازه = **1,236,992 بایت** = پایانهٔ ثبت‌شده — فقط‌خواندنی (SHA256 پایان = آغاز — §J) |
| `WAVE2_UNGRADED_BOOKS` | `src/lib/word-in-context.ts:665` = `["collocations"]` — بایت‌به‌بیت (درخت پاک = صفر تغییر) — **دست‌نخورده** |
| `docs/SNAPSHOT.md` | مطالعه شد (سربرگ ①تا㉜ + §۱-§۱۱) — ۳۲مین به‌روزرسانی = ثبت STEP 1؛ مغایرتی با گزارش STEP 1 ندارد |
| `worklog.md` | انتهای فایل مطالعه شد — آخرین ورود = گزارش کامل STEP 1 (۱۳ بند) — مغایرتی ندارد |
| نقشه راه جامع | `نقشه راه ها/نقشه-راه-جامع-توسعه-۲۰۲۶.md` — ردیف چک‌باکس STEP 1 (خط ۲۷۷) + یادداشت 📅 (خط ۳۵۷) موجود — مغایرتی ندارد |
| گزارش STEP 1 | `docs/qa/dictionary-upgrade-step1-word-atlas-source-audit-2026-11-05.md` — موجود و کامل (§A-§P) |
| وضعیت OD-5 Decision No.2 (الزام §۱-۵ مأموریت) | **ثبت‌شده و پابرجا:** HEAD آغاز = ثبت اثبات تصمیم شمارهٔ ۲ (`78b85d3` ← `20642c7` محتوایی)؛ سند ثبت: `docs/qa/word-in-context-phase14-step18-od5-owner-decision-2-e2-total-estimator-approval-2026-11-05.md`؛ E1 عیناً حفظ: `E1 Estimator Specification Approved — Outcome Mapping Pending — Execution Not Authorized.` — بازها (y_i / نگاشت A-B / آستانه / تصمیم‌های ۲-۶ / روش CI ۹۵٪) همچنان OPEN — در این مأموریت هیچ مداخله‌ای نشد |
| محدودیت‌های STEP-18 / Hill / Wave 2 | بدون تغییر — این مأموریت هیچ اجرای نمونه‌گیری واقعی STEP-18، هیچ Seed واقعی، هیچ فعال‌سازی Hill و هیچ تغییری در Wave 2 انجام نداد |
| معماری واژه‌نامه (شناسایی مجدد) | ۶ کتاب (`vision-one`, `grade-7`, `grade-8`, `grade-9`, `grade-11`, `grade-12`) × (`vocab-lesson-*.ts` + `dictionary.ts` + `irregular-verbs.ts`)؛ تایپ `DictEntry` (`src/data/types.ts:97`) و `VocabWord {word, meaning, lesson, grade?, pos?}`؛ نمایش: `word-lookup.tsx` / `dictionary-view.tsx` / `vocabulary-view.tsx`؛ تصویرسازی فعلی: `POST /api/word-image` (AI — سقف ۱۰/روز) — **Word Atlas فقط لایهٔ curated مکمل است** |

**نتیجهٔ پیش‌نیاز:** صفر مغایرت؛ Local = Remote (۰/۰)؛ درخت پاک؛ همهٔ قفل‌ها/مرزها پابرجا ⇒ ادامهٔ مأموریت مجاز شد.

## §B — ماهیت و دامنهٔ مأموریت (تفکیک الزامی)

1. **این سند فقط «شواهد امکان‌سنجی پایلوت» است، نه «تصویب استفاده».** وضعیت `ACCEPT_CANDIDATE` صرفاً به معنای «نامزد پذیرش پس از تأیید انسانی» است — نه پذیرفته‌شده. تصمیم نهایی برای هر واژه و برای هر گام بعدی (STEP 3 / manifest واقعی / وندور / UI) فقط با تصمیم مستقل مالک.
2. **بازبینی این پایلوت ماشینی است، نه انسانی** (الزام §۵ مأموریت): ارزیابی دیداری و sense-level توسط عامل GLM (Z.ai) انجام شد — **هیچ بازبینی انسانی در این پایلوت انجام نشده است** و هیچ امضای بازبین/تأیید مالک ساختگی ثبت نشده است (§F).
3. **نسخهٔ upstream:** clone کامل (نه عمیق) مخزن `designfuchen/word-atlas` در **`/tmp/wa-step2-pilot`** (خارج ریپو محصول) — HEAD واقعی = **`19a9bd889d2f642fef1d8d0eef85a3f35e1a66ff` (2026-10-31)** = دقیقاً پین STEP 1 — **اختلاف نسخه‌ای وجود ندارد** (الزام §۴ مأموریت: اگر متفاوت بود گزارش می‌شد). تصاویر برای بازبینی فقط به `/tmp/wa-step2-img` (خارج ریپو) کپی و پس از پایان حذف شدند (§J).
4. **صفر دارایی شخص‌ثالثی وارد ریپو شد** — هیچ تصویری در `public/` یا هر مسیر runtime دیگری قرار نگرفت؛ هیچ importer ساخته یا اجرا نشد؛ هیچ Manifest اجرایی ایجاد نشد (§H فقط ارزیابی سطح مستندات).
5. لایسنس/محدودیت‌ها فقط از فایل‌های واقعی مخزن پین‌شده خوانده و راستی‌آزمایی شد (`LICENSE` + `CONTENT_LICENSE.md` — §E-۳)؛ هیچ مجوز یا استثنای جدیدی فرض نشد.

## §C — ساخت مجموعهٔ دقیقاً ۲۰واژه‌ای (روش انتخاب + فهرست نهایی)

### §C-۱) روش انتخاب (مستندشده و تکرارپذیر)

1. **دامنهٔ نمونه‌گیری:** فقط واژه‌های واقعی دادهٔ فعلی محصول — استخراج فقط‌خواندنی با rg از `src/data/{grade-7,grade-8,grade-9,grade-11,grade-12,vision-one}/{vocab-lesson-*.ts,dictionary.ts,vocab-junior.ts}` (بدون هیچ تغییر).
2. **الزام ۱ — سه تلهٔ اجباری چندمعنایی:** `present` (grade-12)، `letter` (grade-7 + junior grade-9)، `bank` (grade-7) — هر سه با دادهٔ عین دو طرف (جزوه + Word Atlas) ثبت شدند.
3. **الزام ۲ — تنوع:** پوشش نقش دستوری (n./v./adj./n+adj)، سطح دشواری (CEFR منبع A1/A2/B1) و کتاب/پایه (۶ کتاب — توزیع §C-۳).
4. **الزام ۳ — اولویت تطبیق‌داشتگی:** ۱۹ واژهٔ دارای تصویر Word Atlas (از ۲۳ کاندیدای بررسی‌شده، همهٔ تطبیق‌ها با پارس مستقیم `data/word-atlas.json` پین `19a9bd8` تأیید شد — نه با حدس).
5. **الزام ۴ — عدم پنهان‌سازی عدم‌تطبیق:** یک مورد بدون تطبیق **عمداً و آگاهانه در مجموعه حفظ شد**: `manteau` (مدخل واقعی دیکشنری grade-7 درس ۵ — پوشش بومی ایرانی؛ صفر رکورد در 7,298 واژهٔ منبع) — دلیل عدم تطبیق ثبت شد (§D ردیف ۲۰) و از مجموعه حذف/پنهان نشد. (`chador` هم کاندیدای دوم بدون تطبیق بود ولی برای حفظ دقیقاً-۲۰ کنار گذاشته شد — خارج از نمونه، نه پنهان‌شدهٔ درون نمونه.)
6. **حذف‌شده‌های کاندید** (شفافیت): `teacher`, `birthday`, `month`, `week`, `chador` — فقط برای رسیدن به دقیقاً ۲۰ و بالانس کتاب/POS؛ هیچ‌کدام به دلیل «نتیجهٔ بد» حذف نشدند.

### §C-۲) فهرست نهایی دقیقاً ۲۰ واژه

| # | واژه (عین چاپ جزوه) | کتاب/محل دقیق در دادهٔ پروژه | معنی فارسی عین کتاب | POS (عین) |
|---|---|---|---|---|
| 1 | `present (n, adj)` | grade-12 `vocab-lesson-1.ts:226` + `vocab-lesson-2.ts:279` | «کادو، هدیه، حال حاضر» | n./adj. |
| 2 | `present (v)` | grade-12 `vocab-lesson-1.ts:227` + `vocab-lesson-2.ts:281` | «ارائه کردن، اهدا کردن، تقدیم کردن» | v. |
| 3 | `Letter` | grade-7 `vocab-lesson-0.ts:15` (+ `letter` — junior g9: `vision-one/vocab-junior.ts:581,705`) | «حرف الفبا، نامه» | n. |
| 4 | `bank` | grade-7 `vocab-lesson-3.ts:50` (+ `vocab-lesson-0.ts:31` = «بانک») | «بانک، ساحل» | n. |
| 5 | `classroom` | grade-7 `dictionary.ts` l0 + `vocab-lesson-0` | «کلاس درس» | n. |
| 6 | `backpack` | grade-7 `dictionary.ts` l0 + `vocab-lesson-0` | «کوله پشتی» | n. |
| 7 | `eraser` | grade-7 `vocab-lesson-0.ts` | «مدادپاک کن، تخته پاک» | n. |
| 8 | `tall` | grade-7 `dictionary.ts` l5 + `vocab-lesson-5` | «قدبلند، بلند» | adj. |
| 9 | `wear` | grade-7 `dictionary.ts` l5 + `vocab-lesson-5` | «پوشیدن، پوشاک، عینک زدن» | v. |
| 10 | `scarf` | grade-7 `dictionary.ts` l5 + `vocab-lesson-5` | «روسری» | n. |
| 11 | `mechanic` | grade-7 `dictionary.ts` l4 + `vocab-lesson-4` | «مکانیک، تعمیرکارخودرو» | n. |
| 12 | `kind` | vision-one `vocab-lesson-2.ts` (+ grade-7 `dictionary.ts` l1/l3 تعریف EN-EN) | «مهربان، نوع» | adj. |
| 13 | `library` | grade-8 `vocab-lesson-2.ts` + l5 (+ grade-7 `dictionary.ts` l2) | «کتابخانه» | n. |
| 14 | `airport` | grade-8 `vocab-lesson-5.ts` | «فرودگاه» | n. |
| 15 | `animal` | vision-one `vocab-lesson-2.ts` + grade-8 `vocab-lesson-6.ts` | «حیوان» | n. |
| 16 | `dentist` | grade-8 `vocab-lesson-4.ts` (+ grade-7 `dictionary.ts` l3) | «دندانپزشک» | n. |
| 17 | `match` | grade-9 `vocab-junior`-equivalent (مدخل junior l0 در دادهٔ پایهٔ ۹) | «چوب کبریت – مسابقه کردن (در بازی)» | n. |
| 18 | `borrow` | grade-11 `vocab-lesson-1.ts` (+ grade-7 `dictionary.ts` l0 مثال) | «قرض گرفتن» | v. |
| 19 | `glad` | grade-11 `vocab-lesson-3.ts` | «خوشحال، شاد» | adj. |
| 20 | `plant` | grade-11 `vocab-lesson-2.ts` «گیاه - کاشتن» + vision-one l1 «گیاه، کارخانه» | «گیاه - کاشتن» / «گیاه، کارخانه» | n. |
| — | `manteau` | grade-7 `dictionary.ts` l5 | بدون معنی فارسی در واژگان؛ تعریف EN-EN = «a long coat that Iranian women wear over their clothes» | n. |

> **توجه:** ردیف‌های 1 و 2 هر دو شکل مدخل grade-12 برای واژهٔ واحد `present` هستند و در شمارش «دقیقاً ۲۰» به‌عنوان دو مدخل جزوه شمرده شدند (طبق دادهٔ واقعی محصول که دو مدخل جدا دارد). ردیف ۲۱ (`manteau`) فقط برای توضیح مورد بدون-تطبیق است و جزو شمارش ۲۰ نیست — یعنی ۲۰ = ردیف‌های 1..20.

### §C-۳) توزیع تنوع (اثبات الزامات §۲ مأموریت)

| بُعد | توزیع |
|---|---|
| کتاب/پایه | grade-7 = ۹ (`Letter`,`bank`,`classroom`,`backpack`,`eraser`,`tall`,`wear`,`scarf`,`mechanic`) · grade-8 = ۴ (`library`,`airport`,`animal`,`dentist`) · grade-9 = ۱ (`match`) · grade-11 = ۳ (`borrow`,`glad`,`plant`) · grade-12 = ۲ مدخل (`present (n, adj)` + `present (v)`) · vision-one = ۳ (`kind`,`animal`,`plant` — هم‌پوشان با پایه‌ها) |
| نقش دستوری | اسم = ۱۳ · فعل = ۳ (`wear`,`borrow`,`present (v)`) · صفت = ۴ (`tall`,`kind`,`glad`,`present (n, adj)`) |
| CEFR منبع (Word Atlas) | A1 = ۱۲ · A2 = ۴ (`present`,`backpack`,`borrow`,`glad`) · B1 = ۱ (`mechanic`) · بدون رکورد = ۲ (`present` در جمع، `manteau`) — سقف دشواری نمونه = B1 (درون محدودهٔ متوسطهٔ دوم؛ الگوی ۹۸.۸٪ ≤ B2 ممیزی STEP 1) |
| موضوع منبع | education=3 · daily=8 · travel=2 · nature=2 · sport=1 · economy=1 · health=1 · work=1 · society=1 · emotion=1 (جمع > ۲۰ به دلیل دو مدخل present) |
| چندمعنایی | ۵ تلهٔ فعال: سه اجباری (`present`,`letter`,`bank`) + دو کشف نمونه (`match` کبریت/مسابقه — `scarf` روسری/شال‌گردن) + ابهت جهتی `borrow` + `kind` (صفت/اسم) + `plant` (گیاه/کاشتن/کارخانه) |

## §D — جدول تأیید سطح-معنی (Sense-Level Verification — ۲۰ ردیف)

مبنای sense منبع: پارس مستقیم `data/word-atlas.json` (پین `19a9bd8`) — فیلدهای `id`/`senses[{pos,en}]`/`cefr`/`topic`. «تطابق» = انطباق تصویر با **معنی هدف عین کتاب**، نه هجی.

| # | واژه (کتاب) | sense هدف عین کتاب | sense متناظر در Word Atlas (id) | تصویر دقیقاً چه می‌کند | تطابق تصویر با هدف | ریسک چندمعنایی/برداشت اشتباه | تناسب بصری/فرهنگی (دانش‌آموز ایرانی) | وضعیت پیشنهادی |
|---|---|---|---|---|---|---|---|---|
| 1 | `present (n, adj)` (g12) | **کادو، هدیه** (+ حال حاضر) | `present` — adj. «being in a place…» / n. «something given…» | عکس گروهی کلاس با معلم جلوی ساختمان مدرسه = «حاضر در جلسه» | **نامنطبق با هدف اول** (هدیه) | بالا — تصویر sense[0] منبع است نه معنی مدخل ما؛ دانش‌آموز hدیه را یاد می‌گیرد و «حاضران کلاس» می‌بیند | بی‌طرف؛ صحنهٔ مدرسه آشنا ولی بی‌ربط به معنی هدف | **REJECT** |
| 2 | `present (v)` (g12) | ارائه/اهدا کردن | `present` — v. «to show, explain or formally give» | همان تصویر کلاس (فقط یک تصویر برای کل واژه) | **نامنطبق** (نه ارائه و نه اهدا در تصویر) | بالا — تصویر هیچ نشانهٔ act ارائه ندارد | بی‌طرف | **REJECT** (همان ترازو: تصویر واحد منبع با هیچ‌کدام از دو مدخل ما هم‌سو نیست) |
| 3 | `Letter` (g7 + junior g9) | **حرف الفبا، نامه** / «نامه - حرف» | `letter` — n.1 «written message» / n.2 «symbol in an alphabet» | زنی در خانه نامهٔ کاغذی می‌خواند (پاکت روی میز) | **جزئی** — فقط sense نامه؛ «حرف الفبا» (sense اولِ جزوهٔ g7) تصویر ندارد | بالا برای g7 — در بافت درس «Sounds and Letters» صروتِ هدف = حرف الفبا؛ تصویر می‌تواند دانش‌آموز را به «نامه» قفل کند | بی‌طرف و آرام؛ صحنهٔ خانگی | **NEEDS_REVIEW** |
| 4 | `bank` (g7) | بانک، ساحل | `bank` — n.1 «organisation that holds money» / n.2 «land along a river» | داخل بانک: گیشه، تُلّار، گاوصندوق با شمش طلا | **کامل برای sense اول** (بانک)؛ «ساحل» بدون تصویر | متوسط — sense دوم پوشش نمی‌شود ولی sense اول با برچسب شفاف است | بی‌طرف؛ فضای رسمی آشنا | **ACCEPT_CANDIDATE** (با sense-note «تصویر = بانک») |
| 5 | `classroom` (g7) | کلاس درس | `classroom` — n. «room where students are taught» (تک-sense) | معلم با کرهٔ جغرافیایی جلوی وایت‌برد، دانش‌آموزان پشت میز | **کامل** | صفر (تک‌معنایی) | عالی — صحنهٔ مدرسهٔ آشنا | **ACCEPT_CANDIDATE** |
| 6 | `backpack` (g7) | کوله پشتی | `backpack` — n.1 «bag carried on the back» | کوهنورد در جادهٔ جنگلی با کولهٔ زرد | **کامل برای شیء**؛ زمینهٔ کوه‌نوردی نه مدرسه | کم — شیء شفاف؛ ولی مدخل ما «school things» است | خوب؛ بدون مورد فرهنگی | **ACCEPT_CANDIDATE** (note زمینه) |
| 7 | `eraser` (g7) | مدادپاک کن | `eraser` — n. «small object to remove pencil marks» (تک-sense) | دست با پاک‌کن روی نقاشی مدادی پرنده + مداد | **کامل** | صفر | عالی — دقیقاً کارکرد | **ACCEPT_CANDIDATE** |
| 8 | `tall` (g7) | قدبلند، بلند | `tall` — adj. «greater than average height» (تک-sense) | مرد قدبلند کنار زن کوتاه‌قد در ورودی خانه | **کامل** (کنتراست واقعی ارتفاع) | کم (فقط تمایز با high لازم است — ابهام کلاسیک tall/high ولی تصویر مسئله نمی‌سازد) | بی‌طرف | **ACCEPT_CANDIDATE** |
| 9 | `wear` (g7) | پوشیدن، پوشاک، عینک زدن | `wear` — v.1 «have clothes on body» | دختربچه با کلاه/شال‌گردن/پالتو/چکمه جلوی در | **کامل برای sense اول** (پوشیدن) | کم — sense «عینک زدن» پوشش نمی‌شود | خوب — پوشش زمستانی متناسب با ایران | **ACCEPT_CANDIDATE** |
| 10 | `scarf` (g7) | **روسری** | `scarf` — n. «Cloth worn around the neck or head» | زن در برف **شال‌گردن** (neck scarf) نارنجی دارد | **جزئی/ناهم‌سو با معنی فارسی چاپی** — «روسری» = پوشش سر در بافت ایرانی؛ تصویر = شال‌گردن زمستانی | بالا در بافت ما — دانش‌آموز ایرانی برای «روسری» انتظار پوشش سر دارد؛ تصویر یک روسری متفاوت (neck) را نشان می‌دهد | ملاحظهٔ فرهنگی واقعی — ولی تصویر محتوا نامتعارف ندارد | **NEEDS_REVIEW** (تصمیم انسانی: برچسب sense / تصویر دیگر / عدم استفاده برای این مدخل) |
| 11 | `mechanic` (g7) | مکانیک، تعمیرکارخودرو | `mechanic` — n. «job: repairing vehicles» (تک-sense) | مکانیک با آچار جلوی موتور بازِ خودرو + جعبه‌ابزار | **کامل** | صفر | عالی | **ACCEPT_CANDIDATE** (سخت‌ترین واژهٔ نمونه — B1) |
| 12 | `kind` (vision-one + g7) | مهربان، نوع | `kind` — adj.1 «Caring about others» / n.2 «group of things» | پسرک با مهربانی پتویی روی دوش دخترک سرد روی نیمکت | **کامل برای sense اول** (مهربان) | متوسط — sense «نوع» (n.) پوشش نمی‌شود؛ با برچسب شفاف | عالی — رفتار مهربان، صحنهٔ روزمره | **ACCEPT_CANDIDATE** (با sense-note) |
| 13 | `library` (g8 + g7) | کتابخانه | `library` — n.1 «place to read/borrow books» | کتابخانهٔ بزرگ، قفسه‌ها، کتابدار در حال امانت کتاب به دخترک | **کامل** | کم (librarian جداگانه مدخل خودش را دارد — تصویر هر دو را پوشش می‌دهد) | عالی — هم‌سو با مدخل‌های ما | **ACCEPT_CANDIDATE** |
| 14 | `airport` (g8) | فرودگاه | `airport` — n. «place where planes take off…» (تک-sense) | سالن ترمینال، زوج مسافر با چمدان، هواپیما پشت شیشه | **کامل** | صفر | عالی | **ACCEPT_CANDIDATE** |
| 15 | `animal` (vision-one + g8) | حیوان | `animal` — n.1 «living creature» | گوسفند + خرگوش + مرغابی در چمنزار | **کامل** | کم (مفهوم کلی با چند نمونهٔ مشخص — رفتار pedagogical معمول) | عالی — طبیعت آرام | **ACCEPT_CANDIDATE** |
| 16 | `dentist` (g8 + g7) | دندانپزشک | `dentist` — n. «examines and treats teeth» (تک-sense) | دندانپزشک زن معاینهٔ دندان بیمار در کلینیک | **کامل** | صفر | عالی — صحنهٔ درمانی آرام | **ACCEPT_CANDIDATE** |
| 17 | `match` (g9) | **چوب کبریت** – مسابقه کردن (در بازی) | `match` — n.1 «sports contest» / v.2 / n.3 «small stick that produces fire» | مسابقهٔ تنیس دو بازیکن | **جزئی** — فقط sense مسابقه؛ **sense اولِ چاپ جزوه = کبریت تصویر ندارد** | بالا برای g9 — ترتیب معنی‌های جزوه با تصویر نمی‌خواند | بی‌طرف — صحنهٔ ورزشی استاندارد | **NEEDS_REVIEW** |
| 18 | `borrow` (g11) | قرض گرفتن | `borrow` — v.1 «take and use with permission, then return» | زن پشت در، **چتر را به مردی در باران می‌دهد** | **جزئی/ابهت جهتی** — صحنه از نگاه دهنده است؛ «گرفتن» با برچسب قابل احیاست ولی تصویر به‌تنهایی هم «lend» خوانده می‌شود | **بالا** — خلط کلاسیک قرض گرفتن/دادن در فارسی‌زبانان؛ تصویر می‌تواند همان اشتباه درسی را تقویت کند | بی‌طرف | **NEEDS_REVIEW** (تصمیم انسانی: کپشن جهت‌دار / رد / جایگزین) |
| 19 | `glad` (g11) | خوشحال، شاد | `glad` — adj.1 «Feeling happy or pleased» | دو زن با لبخند در آغوش گرفته‌اند (درب خانه باز) | **کامل** (حالت هیجانی خوانا) | کم — تشخیص با happy خطر واژه‌محوری دارد نه تصویر | عالی — هیجان مثبت طبیعی | **ACCEPT_CANDIDATE** |
| 20 | `plant` (g11 + vision-one) | گیاه - کاشتن / گیاه، کارخانه | `plant` — n.1 «living thing in soil» / v.2 «put seeds» / n.3 «factory» | گلدان گیاه روی پنجرهٔ آفتابی | **کامل برای sense اول** (گیاه) | متوسط — «کاشتن» (v) و «کارخانه» بدون تصویر؛ با sense-note شفاف | عالی — شیء آشنا | **ACCEPT_CANDIDATE** (با sense-note) |
| — | `manteau` (g7) | (تعریف EN: لباس بلند ایرانی) | **هیچ رکوردی در 7,298 واژهٔ منبع وجود ندارد** | تصویری وجود ندارد | عدم تطبیق ساختاری (نه معنایی) — واژهٔ فرهنگی-بومی ایران است و منبع عمومی بین‌المللی آن را پوشش نمی‌دهد | — | — | **REJECT — NO_MATCH_SOURCE** (مستند، نه پنهان؛ مسیر فعلی = AI image یا بدون تصویر — تصمیم مالک) |

### §D-۲) نکات مهم درستی روش

1. **هیچ معنی یا نتیجه‌ای حدس زده نشد:** معنی فارسی/POS/محل هر ردیف عین استخراج rg از فایل داده است (مسیر + خط در §C-۲)؛ sense و id منبع از پارس مستقیم JSON پین‌شده؛ «تصویر دقیقاً چه می‌کند» از مشاهدهٔ مستقیم فایل WebP (§E).
2. **تطبیق رشته‌ای هرگز ملاک پذیرش نبود:** اثبات — `scarf` با هجی ۱۰۰٪ منطبق است ولی به‌دلیل ناهم‌سویی «روسری (سر)» با «شال‌گردن (گردن)» به NEEDS_REVIEW رفت؛ `present` دو مدخل دارد و هر دو REJECT شدند؛ `match`/`letter` به‌دلیل ترتیب senseهای چاپ جزوه NEEDS_REVIEW شدند — **۴ مورد از ۱۹ (۲۱.۱٪) واژهٔ تصویردارِ این نمونه، اگر بر اساس هجی اتو-اتچ می‌شدند، ناهم‌سو یا ناقص بودند.**
3. **قاعدهٔ تصمیم ماشینی این پایلوت (شفاف):** «کامل» = تصویر sense اولِ/هدفِ مدخل را بی‌ابهام نشان می‌دهد → ACCEPT_CANDIDATE · «جزئی/ابهام» = تصویر فقط sense ثانویه را نشان می‌دهد یا جهت/فرهنگ نیازمند داوری است → NEEDS_REVIEW · «نامنطبق/بدون رکورد» → REJECT — **همهٔ اینها فقط پیشنهاد ماشینی‌اند** (§F).

## §E — بازبینی بصری و لایسنس (الزام §۴ مأموریت)

### §E-۱) مشاهدهٔ واقعی تصاویر و اندازه‌ها

- **هر ۱۹ تصویرِ واژهٔ تصویردار، به‌صورت مستقیم مشاهده شد** (`img/<id>.webp` 512×512 — خوانش واقعی فایل؛ نسخهٔ thumb نیازی نیافت — تک-sense/ترکیب‌بندی در اندازهٔ کامل خوانا بود؛ thumb همان صحنه در 256px است).
- ابعاد همه = **512×512** (خوانش هدر WebP)؛ فرمت WebP VP8 — سازگار بومی مرورگرها/iOS/Android.
- اندازهٔ فایل: کمینه 17,632B (`dentist`) · بیشینه 46,486B (`backpack`) · میانگین ≈26.2KB — **همه زیر سقف پیشنهادی 80KB STEP 1**؛ وندور ۲۰تایی (img+thumb) برآورد ≈0.8-1.0MB (اگر مالک مجوز دهد).
- مسیر دقیق upstream هر فایل: `public/atlas/img/<id>.webp` در commit `19a9bd889d2f642fef1d8d0eef85a3f35e1a66ff` (idها = §D).
- SHA256 فایل‌های مشاهده‌شده (شواهد بازبینی — ثبت در زمان بازبینی):

```text
airport  d62d5512cac3057b14175824fbe07f5369f0e4dace64dd48690033d2ca0f2be3  26164B
animal   740d32617615894312adfb32f284d061cba683420100c6498da5a30be5ec8dd4  35520B
backpack f165e9496b73d3999ee8bf85e77440e21c930d991391bbee00c30e856c5c1166  46486B
bank     bfc2c44972eed8086e9c5683cc9e2a14e470a28b1e2d0626a95fbe20737013e4  19984B
borrow   7c41c07f4f85d1a19cbe941da97102be64333afe8e0c07ccf4585191e1206649  31112B
classroom bfe5c7a673d5069953bdcc089f3bc7f1b3cdeeeeee9c9cef4be5d70f59823bf5 19668B
dentist  2b4064c7fd285e33896f70b83cc33a61b1a8f88dbd665673e53dab026efa5412  17632B
eraser   90b2739ef68c5d67c5afb3f0f26a8d99a71745738bbb1fb9947b13f9e86f396e  23262B
glad     b8b975dc20e243bb520ffb87b9fedd65dff1d4b252e541003d467ad9cf31980d  21576B
kind     d61a1a9c52a5a00123454ee484519d4bcd1088c0bcf5cdaca96bde273b292bd2  30464B
letter   0c628e8fbaf2a2f9f41bc5da62a834fefe34005ff5fe4ce38175f57554d33387  26692B
library  64ce6edf8a80fe8d61ec473f2f907dc1ef5cc757016071ae75755bb7621ed817  28706B
match    55e617b5a2e995c7b2a406699e0cf58558b82eb8b10316766f13c079fa8321cd  21636B
mechanic f92a86a5a447f75cfb7ccc1864df503edada81c9ae2fe0d5a53c232677c8e637  27900B
plant    5a14a9f470c454c7aacbc2a5b07082c3cb05a5973e0d3cc5d068fa729191357b  21178B
present  3c16ec73ff8f33c1491aaef74d95fb9306c3a908fbb4ea04dbf7dc742912face  30670B
scarf    199a804470a18a72ab09477c4ec81ed45a7ac94207209d421ff975ed4ab3ec14  29580B
tall     c71883d0e1e8c7d418e5e5f46a00c6c3b048786359fcc9ab68ede2cc70ffdefa  23378B
wear     396943a319627577d0e374580cdab232ee4d608da884e642aed2679c51c948cd  21622B
```

### §E-۲) نتایج بازبینی بصری هر تصویر (خلاصه در جدول §D — ستون‌های «تصویر دقیقاً چه می‌کند» + «ریسک» + «تناسب»)

- **متن جاسازی‌شده:** در هر ۱۹ تصویر مشاهده‌شده، **صفر متن/حرف/عدد/لوگو/واترمارک داخل تصویر** یافت شد (هم‌سو با جهت هنری منبع و سیاست no-text پرامپت `/api/word-image` خود ما).
- **ابهام آموزشی:** ۴ مورد NEEDS_REVIEW (§D ردیف‌های 3، 10، 17، 18) + ۴ مورد با sense-note (bank/kind/plant/backpack) — بقیه تک‌مفهومِ خوانا.
- **کلیشه/محتوای نامناسب فرهنگی:** هیچ مورد نگران‌کننده‌ای در ۱۹ تصویر یافت نشد؛ پوشش‌ها محجوب؛ تنها ملاحظهٔ واقعی = ناهم‌سویی «روسری» با تصویر شال‌گردن (ردیف ۱۰ — ملاحظهٔ فرهنگی مستند، نه داوری نهایی). نمونهٔ مطلوب ثبت‌شدهٔ STEP 1 (`democracy` با زن حجاب) در این نمونه نبود.
- **کیفیت/وضوح:** استایل یکدست «mid-century editorial» با پالت محدود؛ ترکیب‌بندی‌ها مرکز‌یافته و خوانا در ≤256px نمایش (برای پاپ‌آپ واژه کافی — retina-safe).

### §E-۳) لایسنس و انتساب (خوانده‌شده از فایل‌های واقعی پین `19a9bd8` — هیچ فرضی)

| فایل | دامنه | عین |
|---|---|---|
| `LICENSE` | کد/UI | MIT © 2026 Word Atlas contributors |
| `CONTENT_LICENSE.md` | دیتاست + تصاویر `public/atlas/img|thumb` + صدا | **CC BY 4.0** (در حد حقوق قابل‌اعطا) |
| الزام attribution (عین منبع) | — | `Word Atlas contributors — CC BY 4.0` + پیوند لایسنس (`https://creativecommons.org/licenses/by/4.0/`) + **اظهار تغییر یا نداشتن تغییر** |
| محدودیت ارثی (عین — حفظ اجباری) | — | «Content was generated with AI models under the project's specifications, checked automatically, **not proofread entry by entry**, and is provided **as-is without warranty**.» |
| استثنای شخص‌ثالثی | — | برای ۱۹ فایل مورد استفاده هیچ استثنایی در مخزن یافت نشد (همگی `public/atlas/img/` — درون دامنهٔ CC BY 4.0)؛ صدای ElevenLabs در این پایلوت مصرف نشد |

- **وضعیت تغییرات برای این ۲۰ مورد:** در این پایلوت هیچ تصویری ویرایش/اجرا/وندور نشد (فقط کپی موقت خارج ریپو برای بازبینی) ⇒ «No changes made» — اگر آیندهً هر تصویری crop/resize شود، اظهار تغییر الزامی است.
- **سطر انتساب آمادهٔ استفادهٔ آینده (پیشنهاد مستندات — اجرا فقط با مجوز):** `Illustration: Word Atlas contributors — CC BY 4.0 — https://creativecommons.org/licenses/by/4.0/ — no changes made (pinned @ 19a9bd8)`

## §F — درستی بازبینی (Review Integrity — الزام §۵ مأموریت)

| پرسش | پاسخ صریح |
|---|---|
| چه چیزی با ابزار/بررسی ماشینی بررسی شد؟ | ① استخراج مدخل‌های محصول (rg — فقط‌خواندنی) ② تطبیق واژه↔id↔senses/cefr/topic با پارس `word-atlas.json` (python3 — فقط‌خواندنی) ③ ابعاد/اندازه/SHA256 تصاویر (python3/sha256sum) ④ مشاهدهٔ بصری ۱۹ WebP و داوری sense-match توسط **عامل GLM (Z.ai)** ⑤ خواندن فایل‌های لایسنس ⑥ تایپ‌گذاری وضعیت‌ها طبق قاعدهٔ §D-۲-۳ |
| چه چیزی نیازمند داوری انسانی است؟ | ① تأیید/رد نهایی هر ۱۴ ACCEPT_CANDIDATE (تناسب pedagogical و فرهنگی) ② تکلیف ۴ NEEDS_REVIEW (letter/scarf/match/borrow — برچسب sense، کپشن جهت‌دار، جایگزینی یا رد) ③ هر تصمیم دربارهٔ manteau و مسیر AI/بدون تصویر ④ هر تصمیم معماری/مرحلهٔ بعدی (STEP 3 / manifest واقعی / وندور / UI) |
| چه کسی واقعاً بازبینی کرده است؟ | **هیچ انسانی.** فقط عامل GLM در ۲۰۲۶-۱۱-۰۵ (پیش‌بازبینی ماشینی). هیچ امضای بازبین انسانی، هیچ تأیید مالک و هیچ نتیجهٔ انسانی ساختگی ثبت نشد — وضعیت «ACCEPT_**CANDIDATE**» عمداً همین معنا را دارد. |
| خروجی پایلوت نسبت به تصمیم مالک | پیشنهاد per-word برای شروع کارزار بازبینی انسانی — نه جایگزین آن. هیچ «reviewed» نهایی در هیچ سندی ادعا نشد. |

## §G — نتایج معیارهای پذیرش (الزام §۶ مأموریت)

### §G-۱) سه دستهٔ نتیجه

1. **قابل پذیرش به‌عنوان نامزد پس از تأیید انسانی — ۱۴ مورد:** `bank`, `classroom`, `backpack`, `eraser`, `tall`, `wear`, `mechanic`, `kind`, `library`, `airport`, `animal`, `dentist`, `glad`, `plant`
2. **مردود — ۲ مورد:** `present (n, adj)` + `present (v)` (ناهم‌سویی sense اثبات‌شده) · `manteau` (بدون رکورد منبع)
3. **نیازمند بررسی بیشتر — ۴ مورد:** `Letter` (sense الفبا بدون تصویر) · `scarf` (روسری≠شال‌گردن) · `match` (کبریت بدون تصویر) · `borrow` (ابهت جهتی)

### §G-۲) نرخ‌ها (با ذکر صریح محدودیت اعتبار)

| سنجه | مقدار | تعریف |
|---|---|---|
| نرخ نامزد پذیرش (ماشینی) | **14/20 = 70٪** | ACCEPT_CANDIDATE / کل نمونه |
| نرخ ابهام/نیازمند بررسی | **4/20 = 20٪** | NEEDS_REVIEW / کل نمونه |
| نرخ رد | **2/20 = 10٪** | REJECT / کل نمونه (۱ ناهم‌سویی sense = 5٪ + ۱ بدون-تطبیق = 5٪) |
| نرخ شکست انطباق کامل sense در واژه‌های تصویردار | **5/19 = 26.3٪** | (۱ REJECT معنایی + ۴ NEEDS_REVIEW) / ۱۹ تصویردار |
| علل رد/ابرام | sense-mismatch=1 · no-match=1 · sense-coverage جزئی=2 · ناهم‌سویی فرهنگی-معنایی=1 · ابهت جهتی=1 | — |

### §G-۳) محدودیت‌های اعتبار نرخ‌ها (الزام صریح مأموریت)

1. **نمونهٔ تصادفی نیست** — ترکیب دستی‌ساخته است: ۱۵٪ تلهٔ polysemy اجباری + ۵٪ بدون-تطبیق عمدی ⇒ نرخ‌ها **غیرقابل تعمیم به ۴۳۲ مدخل دیکشنری، ۴۹۲ واژهٔ یکتای دیکشنری یا دامنهٔ کامل 2,745** هستند و هیچ برآورد هزینهٔ بازبینی کل از آنها مجاز نیست.
2. **نرخ ابهام این نمونه سمتِ بالا سوگیری دارد** (تله‌ها عمداً چاق شده‌اند)؛ نرخ بدون-تطبیق نمونه (5٪) سمتِ پایین دامنهٔ واقعی (12.5٪ ترکیبی — STEP 1) است.
3. **همهٔ وضعیت‌ها ماشینی‌اند** — نرخ «قابل پذیرش 70٪» یعنی «۷۰٪ از دید پیش‌بازبینی ماشینی نامزدند»؛ نرخ پذیرش انسانیِ نهایی فعلاً نامعلوم است و تا کارزار بازبینی انسانی محاسبه‌پذیر نیست.
4. هزینهٔ بازبینی انسانی از این پایلوت **قابل برآورد معتبر نیست** — فقط سیگنال کیفی: در هر ۲۰ واژهٔ دست-چین، انتظار ≥۳-۵ مورد داوری sense-level انسانی منطقی است.

## §H — ارزیابی امکان‌سنجی Manifest (فقط سطح مستندات — الزام §۷ مأموریت)

### §H-۱) ارزیابی فیلدهای پیشنهادی

| فیلد manifest | ارزیابی امکان‌سنجی در این پایلوت | منبع مقدار |
|---|---|---|
| stable word/sense identifier | **ممکن** — کلید پایدار پیشنهادی = `book + lesson + word(عین چاپ)` (مثلاً `grade-12:vocab-lesson-1:"present (n, adj)"`) + `atlasId` + `senseIndex|senseNote`؛ نکته: واژه‌های چندمدخلی (present در دو درس) به هر مدخل جداگانه ردیف می‌گیرند — تصمیم نهایی با مالک | دادهٔ واقعی §C-۲ |
| upstream image identifier/path | **ممکن و بی‌ابهام** — `public/atlas/img/<id>.webp` + `thumb/<id>.webp` (نام فایل = id؛ قاعدهٔ اسلاگ راستی‌آزمایی‌شدهٔ STEP 1) | §D/§E |
| source commit | **ممکن** — پین ثابت `19a9bd889d2f642fef1d8d0eef85a3f35e1a66ff` (باز-تأیید شد = پین STEP 1؛ هر تغییر آیندهٔ upstream نیازمند بازممیزی) | §B-۳ |
| license and attribution | **ممکن** — رشتهٔ ثابت attribution + پیوند CC BY 4.0 + پرچم `modified: boolean` per-image | §E-۳ |
| verification status | **ممکن** — مقادیر `accepted-candidate / rejected / needs-review / (reviewed فقط پس از بازبینی انسانی)` + `reviewer` + `date`؛ **فقط status=reviewed قابل رندر باشد** (الگوی STEP 1) | §F/§G |
| review evidence | **ممکن** — ارجاع به ردیف §D + SHA256 فایل بازبینی‌شده + تاریخ — الگوی همین سند | §E-۱ |

### §H-۲) نمونهٔ غیرقابل‌استفادهٔ runtime (فقط داخل همین سند — هیچ فایلی ساخته نشد)

```jsonc
// نمونهٔ مستنداتی — این بلوک هیچ فایل executable نیست و در runtime مصرف نمی‌شود
{
  "book": "grade-7", "lesson": 0, "word": "bank",
  "atlasId": "bank", "senseIndex": 0, "senseNote": "تصویر = بانک (sense ساحل پوشش ندارد)",
  "upstream": { "img": "public/atlas/img/bank.webp", "thumb": "public/atlas/thumb/bank.webp",
                 "commit": "19a9bd889d2f642fef1d8d0eef85a3f35e1a66ff", "sha256Img": "bfc2c44972eed8086e9c5683cc9e2a14e470a28b1e2d0626a95fbe20737013e4" },
  "license": { "spdx": "CC BY 4.0", "attribution": "Word Atlas contributors — CC BY 4.0",
               "licenseUrl": "https://creativecommons.org/licenses/by/4.0/", "modified": false },
  "verification": { "status": "accepted-candidate", "reviewer": "glm-machine-pre-review",
                    "reviewedAt": "2026-11-05", "humanApproval": null,
                    "evidence": "docs/qa/dictionary-upgrade-step2-word-atlas-20-word-pilot-2026-11-05.md#§D" }
}
```

### §H-۳) اولویت معماری STEP 1 — بدون تغییر (الزام صریح مأموریت)

```text
تصویر curated منبع (فقط status=reviewed پس از بازبینی انسانی) > تصویر AI موجود (/api/word-image) > بدون تصویر
```

- نتیجهٔ پایلوت این اولویت را **تقویت** می‌کند: ۵ مورد از ۱۹ (۲۶.۳٪) نشان داد حتی در واژه‌های «تطبیق‌دار»، بدون نگاشت sense انسانی، تصویر curated می‌تواند گمراه‌کننده باشد — یعنی مسیر AI/بدون تصویر تا اثبات بازبینی، جایگزین مناسبی برای «curated بدون بازبینی» است.
- هیچ فایل Manifest اجرایی، هیچ loader، هیچ تغییری در `word-lookup.tsx` یا API ساخته/اجرا نشد.

## §I — مستندات به‌روزشده (مسیرهای دقیق)

| فایل | نوع تغییر |
|---|---|
| `docs/qa/dictionary-upgrade-step2-word-atlas-20-word-pilot-2026-11-05.md` | **جدید** — همین گزارش (§A-§P) |
| `docs/SNAPSHOT.md` | به‌روزرسانی سربرگ (㉝) + §۲ (Git) + §۴ + §۵ + §۶ + §۸ + §۱۱-ج |
| `worklog.md` | ورود تاریخ‌دار کامل اجرای STEP 2 |
| `نقشه راه ها/نقشه-راه-جامع-توسعه-۲۰۲۶.md` | ردیف چک‌باکس STEP 2 + یادداشت 📅 |

## §J — گیت و کنترل‌های نهایی (الگوی دوکامیت پروژه)

| کنترل | نتیجهٔ واقعی |
|---|---|
| `bun run lint` | **۰ خطا** (exit 0) — صفر تغییر کد وجود دارد که lint بخورد |
| `git diff --check` | پاک |
| دامنهٔ تغییرات commit محتوایی | فقط ۴ فایل مستنداتی (§I) — **صفر فایل کد/داده/دارایی** |
| `db/custom.db` پایان | SHA256 = `20df56a5365d426ea73169d3cfac8389931017a9bd4b51843dfade2de78c12a8` · 1,236,992B = آغاز — **دست‌نخورده** |
| هوک post-commit پایان | SHA256 = `ee679bc1b642db0f5ecc206544d1c10daf71cffe3827dad33d3b0177c58aed71` = آغاز — **دست‌نخورده** |
| `WAVE2_UNGRADED_BOOKS` | خط ۶۶۵ بایت‌به‌بیت (فایل در diff نیست) |
| Commit محتوایی | **`1dc05a13c17a369b40de40f5958ebb8b53af7bd3`** — فقط ۴ فایل مستنداتی (۳۷۲ افزودن/۶ حذف) · والد `78b85d38295d80e8021dd3c4739e47e50f59fef4` · push خودکار هوک تأیید شد (`78b85d3..1dc05a1 main -> main` — لاگ `/tmp/devhook.log`) |
| اثبات Remote پس از کامیت محتوایی | `git ls-remote backup refs/heads/main` = **`1dc05a13c17a369b40de40f5958ebb8b53af7bd3`** = HEAD محلی — **۰/۰** · درخت پاک |
| Commit ثبت اثبات (همین کامیت) | SHA این کامیت پس از push در SNAPSHOT §۲ و worklog ثبت می‌شود؛ اثبات مجدد ls-remote در همان لحظه |
| حذف آرتیفت‌های موقت | `/tmp/wa-step2-pilot` (کلون ۳۷,۷۰۰+ فایلی) + `/tmp/wa-step2-img` (۱۹ تصویر) + `/tmp/wa-check.py` — حذف شدند و حذفشان تأیید شد («No such file or directory» برای هر سه مسیر) — **صفر دارایی شخص‌ثالثی در ریپو** |
| یادداشت شفاف ارثی | عدم‌تعادل تگ `<details>` انتهای SNAPSHOT (۲۴ باز/۲۳ بسته در HEAD آغاز این مأموریت) از مأموریت‌های قبلی به ارث رسیده بود؛ این گام همان دلتا (+۱/+۱) را حفظ کرد و تاریخچه را دست‌نزد (اصلاح آن خارج از دامنهٔ فقط‌مستنداتی STEP 2 بود) |
| توکن | هرگز در لاگ/گزارش چاپ نشد |

## §K — ریسک‌ها، محدودیت‌های باقی‌مانده و تصمیم‌های نیازمند مالک

1. **پیش‌بازبینی ماشینی = مبنای همهٔ وضعیت‌ها** — تا بازبینی انسانی، هیچ تصویری «قابل استفاده» نیست؛ محدودیت ارثی منبع (AI، بررسی خودکار، بدون proofread per-entry، as-is) عیناً پابرجاست.
2. **۴ مورد NEEDS_REVIEW دقیقاً همان تصمیم‌های انسانی معلق‌اند:** letter (sense الفبا)، scarf (روسری)، match (کبریت)، borrow (جهت) — بدون تصمیم مالک، اینها را نمی‌توان reviewed کرد.
3. **نرخ‌ها تعمیم‌ناپذیرند** (§G-۳) — تصمیم تعمیم به ۴۳۲ مدخل فقط با کارزار بازبینی انسانی مرحله‌ای ممکن است.
4. **پین upstream + موتاریت:** هر استفادهٔ آینده باید به `19a9bd8` پین بماند؛ ارتقای نسخه = بازممیزی + بازبینی مجدد.
5. **صداها (UK/US/example) در این پایلوت مصرف/ارزیابی نشدند** — تصمیم کاملاً جدا (STEP 1 §J-۳ پابرجا).
6. **`manteau`/`chador` و ۳۴۱ مورد دیگر بدون تطبیق:** مسیرشان (AI image / بدون تصویر) تصمیم آیندهٔ مالک است.
7. **مرز Wave-2/STEP-18 پابرجا:** این پایلوت هیچ تداخلی با نمونه‌گیری STEP-18، Hill، collocations یا `WAVE2_UNGRADED_BOOKS` نداشت.
8. **تصمیم‌های معلق برای مالک (هیچ‌کدام خودکار گرفته نشد):** ① تأیید/رد هر ۱۴ نامزد + تکلیف ۴ NEEDS_REVIEW ② شکل نهایی کلید manifest و محل نگهداری ③ سیاست attribution در UI ④ شروع STEP 3 یا توقف ⑤ تکلیف موارد بدون-تطبیق.

## §L — انطباق با ممنوعیت‌های §۸ مأموریت (چک‌لیست)

| ممنوعیت عین مأموریت | وضعیت |
|---|---|
| تغییر هر فایل کد یا تنظیمات runtime | ✅ صفر (diff = فقط ۴ فایل مستنداتی) |
| تغییر Schema/Prisma/migration/دیتابیس | ✅ صفر |
| تغییر `db/custom.db` | ✅ SHA256 آغاز=پایان (`20df56a5…`) |
| افزودن تصاویر به `public/` یا مسیرهای runtime | ✅ صفر — تصاویر فقط در `/tmp/wa-step2-img` (خارج ریپو، حذف‌شده) |
| ایجاد یا اجرای importer | ✅ هیچ |
| تغییر API یا UI | ✅ هیچ |
| تغییر محتوای کتاب‌ها/واژگان/ترجمه‌ها | ✅ صفر |
| اجرای نمونه‌گیری واقعی STEP-18 یا تولید Seed واقعی | ✅ هیچ |
| فعال‌سازی Hill یا تغییر Wave 2 | ✅ هیچ — `WAVE2` بایت‌به‌بیت |
| تغییر Hook یا reset/rebase/force push | ✅ صفر — فقط commit عادی + push |
| حذف یا بازنویسی فایل‌های untracked قبلی | ✅ هیچ — آغاز و پایان درخت تمیز |

## §P — وضعیت نهایی

```text
DICTIONARY UPGRADE — STEP 2 CLOSED (2026-11-05) — 20-WORD SENSE-VERIFIED PILOT COMPLETED (EVIDENCE-ONLY)
TALLY (MACHINE PRE-REVIEW): ACCEPT_CANDIDATE 14/20 (70%) — NEEDS_REVIEW 4/20 (20%) — REJECT 2/20 (10%)
ALL STATUSES ARE GLM MACHINE PRE-REVIEW — NO HUMAN REVIEW PERFORMED — NO FABRICATED REVIEWER/OWNER DECISION
UPSTREAM PIN RE-VERIFIED @ 19a9bd8 — LICENSE MIT/CC BY 4.0 RE-VERIFIED FROM REAL FILES — ATTRIBUTION REQUIREMENTS CARRIED
NO IMPLEMENTATION — NO RUNTIME MANIFEST — NO ASSET INGESTION — NO public/ CHANGE — DB/HOOK/WAVE2 UNTOUCHED
STOP — STEP 3 / IMPLEMENTATION / GENERALIZATION ONLY WITH EXPLICIT INDEPENDENT OWNER MISSION
```
