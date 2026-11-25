# دروازهٔ G2 کتاب چهارم AVU-3 — داوری مستقل روی اسکیمای پارس A2 — ۱۴۰۵/۹/۱ (۲۰۲۶-۱۱-۲۱)

> **نوع سند:** رکورد دروازهٔ G2 نقشه راه استخراج باکیفیت کتاب چهارم (`نقشه راه ها/نقشه-راه-استخراج-باکیفیت-Advanced-Vocabulary-in-Use-ویرایش-سوم-2026-11-20.md`)
> **موضوع داوری:** اسکیمای پارس ساختاری فاز A2 (`scripts/viu-adv-parse.mjs` → `docs/qa/viu-adv-capture/unit-001..101.json`) با نمونهٔ مرورِ آمادهٔ ۲ واحد کنار رندر PDF:
> - **نمونهٔ مرور:** `docs/qa/viu-adv-g2-sample-2026-11-21.html` (خودکفا — ۱٬۲۶۲٬۷۶۳ بایت — واحد ۱ و ۲۱ پارس‌شده کنار رندر ۱۱۰dpi با راهنمای اسکیما) — tracked در گیت
> - **اسکرین‌شات‌های مرورگر:** `qa-shots/avu-g2-01-units-sample-full.png` · `avu-g2-02-top.png` · `avu-g2-03-exercises-u1.png` · `avu-g2-04-unit21.png` · `avu-g2-05-app-regression-home.png` — tracked در گیت
> - **نمونه‌های JSON داوری‌شده:** `docs/qa/viu-adv-capture/unit-001.json` (PDF 10/11 · چاپی 8/9) · `docs/qa/viu-adv-capture/unit-021.json` (PDF 50/51 — صفحهٔ de-dup ثبت‌شدهٔ G1)
> **فرمان مالک (trace `1a1fee98c92fd521`):** «گام بعدی مجاز (بدون تغییر): دروازهٔ G2 = تأیید شما روی اسکیما — نمونهٔ پارس‌شدهٔ ۲ واحد (۱ و ۲۱) کنار رندر PDF آمادهٔ مرور است (اسکرین‌شات‌ها در qa-shots/avu-g2-* و فایل HTML کامل در ریپو). پس از تأیید شما ⇒ A3 (کلید پاسخ و Index) با فرمان شما. هیچ گام دیگری آغاز نمی‌شود» + الزام حیاتی پایداری ۱۰بندی (ابلاغ مجدد یازدهم) — تفسیر گیت (عین الگوی تفسیر G1 در trace `1a1feb704efa1a55`): فرمان مالک = بازکنندهٔ G2 (با راستی‌آزمایی مستقلِ واگذارشده به مجری). **A3 با فرمان مالک آغاز می‌شود — نه با PASS این دروازه.**

## ۰) راستی‌آزمایی آغاز — صفر عقب‌گرد

- HEAD `1ef5b3157abaf44bf4a466795cf891ccb8e03131` = `backup/main` (اثبات `git ls-remote` — divergence ۰/۰) — درخت پاک (`git status --porcelain` = صفر) — صفر ریست این بار.
- هر ۷ آرتیافت داوری (HTML + ۵ اسکرین‌شات + ۲ JSON نمونه) tracked و بایت‌به‌بیت = ریموت.

## ۱) روش راستی‌آزمایی (سه‌لایه — مستقل از منطق پارسر)

| لایه | روش | اثبات |
|---|---|---|
| بصری — کل صفحه | خوانش مستقیم ۵ اسکرین‌شات مرورگر (رندر واقعی HTML خودکفا در مرورگر) | ۵ PNG در `qa-shots/` — بنر، راهنما، هر دو واحد، تمرین‌ها، رگرسیون برنامه |
| ساختاری — JSON | بازخوانی مستقل `unit-001.json` + `unit-021.json` و تطبیق فیلد-به-فیلد با اسکیما و بنر HTML | خروجی بازرسی در §۲ همین سند |
| مکانیکی — تازه | بازاجرای همین‌لحظه‌ای `npm run audit:viu-adv` (Z1..Z8) | `ok=true` · `issues: []` · سرشماری سراسری = بنر HTML |

## ۲) نتایج — همه‌سبز

| چک | نتیجه |
|---|---|
| اسکیمای سطح بالا (هر دو نمونه) | ✅ — `unit · title · bookId=viu-advanced · provenance{rawFile, pdfPages, printedPages, sha256=08c8bf18…(SHA واقعی PDF ثبت A0), generator=scripts/viu-adv-parse.mjs} · leftPage{sections[{letter,title,y,blocks[{kind,y,text}],marginNotes}]} · rightPage{exercises[{no,y,instruction,items[{n,y,text,blankCount}],refs,bank,keyed,kind}]} · imageEvidence · imageDependentCandidates · queuedChars · runtimeMapping{VocabWord,QuizQuestionSeed,Reading,ChapterMeta} · census` |
| وفاداری verbatim صف‌شده (u1) | ✅ — `queuedChars = [U+001F×1, U+0019×1 (leftPage)]` — دقیقاً دو مورد G1-KA-4 در خط IPA پانوشت ۳؛ متن `/ˌpleɪd\u001fərɪzəm/` دست‌نخورده در بلوک بخش B — صفر حدس |
| وفاداری verbatim صف‌شده (u21) | ✅ — `queuedChars = []` («u21: none» برابر راهنمای HTML) |
| keyed=null صادقانه | ✅ — هر ۱۱ تمرین هر دو نمونه (`1.1..1.4` + `21.1..21.7`) `keyed=null` — برابر قرارداد «تا A3 لینک کلید چاپی» |
| تمرین‌ها (u1) | ✅ — `1.1 open 7 آیتم` · `1.2 instruction (بازنویسی متن زیرخط‌دار)` · `1.3 open 10 آیتم` · `1.4 fillin 8 آیتم/8 جای‌خالی refs=[opposite]` — برابر اسکرین‌شات ۳ (badgeهای `open/fillin/refs:opposite` + `___` نرمال‌شده) |
| تمرین‌ها (u21) | ✅ — `21.1 open 6 refs=[opposite]` · `21.2 open 4` · `21.3 instruction refs=[opposite]` · `21.4 instruction refs=[opposite]` · `21.5 open 6` · `21.6 bank refs=[C]` · `21.7 instruction` — برابر اسکرین‌شات ۴ |
| census درون‌فایلی | ✅ — u1: `vocabCandidates=8 · marginNotes=9 · proseBlocks=3 · exercises=4 · exerciseItems=25 · blanks=8 · imageDependentCandidates=3` · u21: `dropCaps=1 (known artifact KA-2) · exercises=7 · exerciseItems=16 · banks=1 · imageDependentCandidates=2` |
| تناظر بصری بخش‌ها | ✅ — هر دو واحد: بخش‌های A/B/C پارس‌شده (چپ) با رندر ۱۱۰dpi همان صفحه (راست — ground truth) هم‌تراز و کامل؛ u1 «Cramming for success…» · u21 «The visual arts» |
| نمونهٔ de-dup صفحهٔ ۵۰ (u21) | ✅ — پاراگراف «centuries,» تک‌نسخه · مراجع متنی («suspicious of the new art movements» · «shocked by Impressionism1» · «as careless daubers2» · «with Cubist3») حاضر — حل مؤثرِ محدودیت ثبت‌شدهٔ G1 |
| سرشماری سراسری تازه (audit همین‌لحظه) | ✅ — `ok=true · issues=[]` · `vocabCandidates=68 · marginNotes=183 · proseBlocks=309 · languageHelp=28 · dropCaps=1 · exercises=455 · exerciseItems=2364 · blanks=1332 · banks=47 · mixedLineSplits=54 · imageDependentCandidates=56 · queuedChars=3` — **برابر بایت‌به‌بیت بنر HTML** («68 vocab candidates · 455 exercises · 2,364 items · 1,332 blanks · audit:viu-adv = all-green») |
| رگرسیون برنامه (اسکرین‌شات ۵) | ✅ — صفحهٔ اصلی قفسهٔ کامل با صفر خطای کنسول/صفحه — صفر تغییر کد محصولی سه کتاب |

## ۳) یافته‌های داوری (دو مورد — هر دو ثبت‌شده، نه نقص اسکیما)

1. **محدودیت ثبت‌شدهٔ خطوط مخلوط در بلوک‌های نثر (حل‌شده در A2):** در u1 بخش B، مدخل‌های واژه‌نامهٔ مینی (composition/essay/assignment/…) درون همان بلوک نثر حاضرند و اسپلیت مخلوط ناحیه (۲ مورد در u1 — `mixedLineSplits=2`) آن‌ها را با دنبالهٔ هم‌تراز جدا کرده است؛ مدخل‌های استاندارد به `vocabCandidates=8` (با لنگر refMarkers + IPA) رفته‌اند. صفر تلفات — جداکنندهٔ معناییِ کامل باقی‌مانده دامنهٔ A3/واژه-سطح است (ثبت‌شده در diagnostics پارسر).
2. **صحنهٔ تصویروابسته صادقانه:** u1 ۳ کاندید · u21 ۲ کاندید (سراسری ۵۶) — فقط شواهد متنی + شمارش `pdfimages`، هیچ حذف خاموشی رخ نداده؛ منوی تصمیم مالک در A5-5 پابرجاست.

## ۴) داوری نهایی

> **G2 = PASS ⇒ باز شد.** اسکیمای پارس A2 با نمونهٔ مرور خودکفا (HTML + ۵ اسکرین‌شات) و ۲ نمونهٔ JSON داوری‌شده تأیید می‌شود — ساختار، وفاداری verbatim، صف‌های صادقانه، `keyed=null`، census درون‌فایلی، سرشماری سراسری تازه و تناظر بصری همه‌سبز.
> **گام بعدی مجاز:** فاز A3 (کلید پاسخ و Index) — **فقط با فرمان صریح مالک** («⇒ A3 … با فرمان شما»). هیچ گام دیگر (A4 به بعد، R3-e، FA-REVIEWED، هر نقشه راه دیگر) بدون فرمان مالک آغاز نمی‌شود.
