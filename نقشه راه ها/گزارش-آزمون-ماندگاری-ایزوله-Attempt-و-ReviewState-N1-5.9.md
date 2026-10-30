# گزارش آزمون ایزولهٔ ماندگاری Attempt و ReviewState (N1-5.9)

> **شناسهٔ گام:** N1-5.9 · **تاریخ اجرا:** ۱۴۰۵/۸/۸ (۲۰۲۶-۱۰-۳۰) · مخزن: `Sohrab1999/vision-one-backup` · شاخه: `main`
> **SHA مبنای گام:** `7351227540ef6f6f7cc5a575cb3a6be2606131b0` (= commit ممیزی مستند N1-5.8 = `backup/main`؛ درخت پاک)
> **مرجع چک‌لیست:** `نقشه راه ها/نقشه-راه-آزمون-ماندگاری-ایزوله-Attempt-و-ReviewState-N1-5.9.md` (طبق همان طرح اجرا شد)
> **نتیجهٔ کلی گام:** **آزمون موفق** — ثبت و بازخوانی `Attempt` و `ReviewState` روی نسخهٔ ایزوله با شواهد کامل؛ قیدهای واقعی Schema (`@@unique`، SetNull، Cascade) مشاهده‌شده نه فرض‌شده؛ عدم تغییر پایگاه اصلی با SHA-256 تأیید شد. **معیار پنجم همچنان OPEN و فاز ۱ بسته نمی‌شود.**

---

## A) وضعیت اولیهٔ Git و پیش‌بررسی

- شاخهٔ `main`، HEAD `7351227…`، `git status --porcelain` خالی، `git ls-remote backup refs/heads/main` = همان SHA (واگرایی صفر)؛ بدون stash/merge نیمه‌تمام؛ hook دست‌نخورده (SHA-256 `ee679bc1…aed71`، ۱۳۹۱ بایت = مبنا)؛ قواعد `.gitignore` سطر ۵۷/۵۸ فعال؛ هیچ auto-commit جدیدی پس از N1-5.8.
- dev server فعال (PID ۱۱۱۸؛ :3000 = HTTP ۲۰۰) — در طول گام خاموش نشد و هیچ فراخوانی نوشتنی به آن انجام نشد.
- پایگاه اصلی: `db/custom.db` — ۱٬۲۳۶٬۹۹۲ بایت، mtime 2026-10-28 20:13:19، `journal_mode=delete`، بدون `-wal/-shm`.

## B) مدل‌ها و مسیرهای کد بررسی‌شده (فقط‌خواندنی)

| مورد | مکان | واقعیت استخراج‌شده (منبع: Schema/کد) |
|---|---|---|
| مدل `Attempt` | `prisma/schema.prisma:75-98` | بدون `@@unique` به‌جز PK؛ `userId?` با FK `onDelete: SetNull`؛ indexهای category/book/userId |
| مدل `ReviewState` | `prisma/schema.prisma:101-130` | **`@@unique([userId, book, cardKey])`**؛ `userId` اجباری با FK `onDelete: Cascade`؛ indexهای `[userId,dueAt]`/`[userId,book]`؛ پیش‌فرض‌های SM-2 (`ease=2.5` و …) |
| نوشتن Attempt | `src/app/api/attempts/route.ts:39` | **create ساده — قرارداد dedup/idempotency تعریف نشده** (هر POST = ردیف جدید) |
| نوشتن Attempt (bulk) | `src/app/api/import/route.ts:319` | `createMany` در تراکنش (در این گام آزمون نشد) |
| نوشتن ReviewState | `src/app/api/srs/route.ts:177` | **`upsert` با کلید `userId_book_cardKey` — قرارداد رفتار تکرار صریحاً در کد تعریف شده** |
| خواندن ReviewState | `src/app/api/srs/route.ts:72` | findMany بر اساس `userId` |
| خواندن Attempt | `attempts/`، `leaderboard:84`، `export:45`، `class/[code]/challenge:85`، `class/_lib/state.ts:144`، `compare:69,81` | findManyهای فقط‌خواندنی |

**نتیجه:** هر دو مدل واقعاً در Schema و مسیرهای ذخیره‌سازی فعلی موجودند → شرط گام برای آزمون هر دو برقرار است.

## C) روش ایزوله‌سازی و شواهد اتصال به نسخهٔ مستقل

- **کپی سازگار:** با SQLite online backup API از یک اتصال `mode=ro` (Python 3.12.16) به `/tmp/n1qa59/custom-qa.db` — منبع فقط-خواندنی باز شد (از این مسیر نوشتن به اصلی غیرممکن است)؛ dev server خاموش نشد. روش عیناً روش مستند N1-5.5 §B است.
- **نشانگر:** جدول `_qa_marker` با مقدار `run-20261029T213241Z` فقط در کپی ساخته شد.
- **جداسازی فرایندی (هر ۶ فرایند):** snapshot (Python) + probe + W1 + W2 + W3 + W4 (هر پنج اسکریپت Node) با الگوی واحد: cwd=`/tmp/n1qa59` (بدون `.env`) + `DATABASE_URL` صریح در خط فرمان + **گارد درون‌اسکریپتی** (`exit 9` اگر env عیناً مسیر کپی نباشد، پیش از ساخت هر کلاینت) + `new PrismaClient({ datasourceUrl })` (Prisma 6.11.1). هر پنج لاگ = `GUARD_PASS`.
- **ممنوعیت‌های رعایت‌شده:** بدون `db push`/migrate/seed/backfill (کپی schema را به ارث برد)؛ بدون فراخوانی API زنده؛ بدون دسترسی نوشتن به `db/`، `uploads/`، `qa-shots/`، `tool-results/`، `.zscripts/*` و فایل‌های محیطی.

| شاهد اتصال واقعی | مقدار ثبت‌شده |
|---|---|
| `pragma_database_list` (اتصال Prisma) | `{"seq":0,"name":"main","file":"/tmp/n1qa59/custom-qa.db"}` |
| `SELECT run FROM _qa_marker` | `run-20261029T213241Z` |
| گارد ۵ فرایند Node | همه `GUARD_PASS` |
| شمارش‌های probe (خط پایه) | User=3 · Progress=27 · **Attempt=181** · **ReviewState=10** (= عین خط پایهٔ N1-5.5) |
| اثبات رفتاری پس از آزمون | SHA کپی تغییر کرد (→ `7ea76b08…`) ولی SHA اصلی ثابت ماند — نوشتن‌ها فقط در کپی فرود آمدند |

## D) SHA-256 فایل اصلی قبل و بعد

| لحظه | SHA-256 `db/custom.db` | حجم / mtime |
|---|---|---|
| **t0** (پیش از هر نوشتنی) | `0057e27c9a9d5d7d3fbf531aec22ee76c0d6654ecedf465178f7163fcd2bb097` | ۱٬۲۳۶٬۹۹۲ بایت / 2026-10-28 20:13:19 |
| **t2** (پس از W1…W4) | **همان `0057e27c…2bb097` — بدون تغییر** | ۱٬۲۳۶٬۹۹۲ بایت / 2026-10-28 20:13:19 |
| کپی آزمایشی (پس از آزمون و پاک‌سازی) | `7ea76b0804fc3f967edfbdf2fc5c9f3a71fef2ce4e56838b89bb94a16194fc91` | تغییر SHA نسبت به snapshot اولیه = اثبات رفتاری فرود نوشتن‌ها فقط در کپی |

نکته: t0 این گام عین خط پایهٔ N1-5.5 است → از ۲۰۲۶-۱۰-۲۸ هیچ نوشتنی به پایگاه اصلی فرود نیامده (ادامهٔ زنجیرهٔ عدم-تخریب).

## E) نتایج آزمون‌ها — Attempt و ReviewState جداگانه

### E-1) Attempt — VERIFIED-PASS (ثبت/بازخوانی/رفتار تکرار/قیدهای Schema)

| آزمون | نتیجه | شواهد (`/tmp/n1qa59/w1-attempt.log`) |
|---|---|---|
| create با همهٔ فیلدها + FK کاربر مصنوعی | **PASS** | `ATTEMPT_CREATED id=cmvu28t2o0002otw5flf55z95` |
| بازخوانی مستقل میدان‌به‌میدان (۱۰ فیلد: book/category/lesson/total/correct/duration/name/userId/detail/createdAt) | **PASS** | `readbackMatch=true` |
| رفتار تکرار create | **PASS (مشاهدهٔ قرارداد واقعی)** | create تکراری → بدون خطا، `rows=2` — تطبیق با Schema (نبود `@@unique`) و قرارداد create سادهٔ `attempts/route.ts:39` |
| FK `onDelete: SetNull` | **PASS (مشاهده‌شده)** | پس از حذف کاربر مصنوعی: هر ۲ ردیف باقی ماندند و `userId → null` (`FK_SetNull_Observed=true`) |

### E-2) ReviewState — VERIFIED-PASS (upsert طبق قرارداد کد/بازخوانی/رفتار تکرار/قید یکتا)

| آزمون | نتیجه | شواهد (`/tmp/n1qa59/w2-reviewstate.log`) |
|---|---|---|
| upsert ایجاد با کلید `userId_book_cardKey` (عین قرارداد `srs/route.ts:177`) | **PASS** | `UPSERT_CREATE done` |
| بازخوانی مستقل میدان‌به‌میدان (۱۳ فیلد شامل پیش‌فرض‌ها، `dueAt`، `lastGrade`) | **PASS** | `readbackMatch=true` |
| رفتار تکرار upsert (قرارداد صریح کد) | **PASS** | upsert تکراری با `ease 2.8→3.1` و `reps 2→3` → `rows=1`، update نه insert (`dupUpsertIsUpdate=true`) |
| قید یکتای `@@unique([userId, book, cardKey])` | **PASS (مشاهده‌شده)** | create مستقیم با سه‌تایی تکراری → خطای **P2002**، `rows=1` ماند (`uniqueConstraintEnforced=true`) |
| FK `onDelete: Cascade` | **PASS (مشاهده‌شده)** | با حذف کاربر مصنوعی، ردیف ReviewState خودکار حذف شد (`FK_Cascade_Observed=true`) |

### E-3) پایداری و پاک‌سازی

| آزمون | نتیجه | شواهد |
|---|---|---|
| پایداری (W3): فرایند/اتصال کاملاً تازه | **PASS** | `persistedAndIdentical=true` برای هر دو مدل (Attempt: ۲ ردیف با مقادیر عینی؛ ReviewState: `ease=3.1`، `reps=3`، `dueAt` عین مقدار) — `w3-reopen.log` |
| پاک‌سازی (W4): حذف فقط ردیف‌های ساختگی همین run از کپی | **PASS** | حذف کاربر → مشاهدهٔ SetNull/Cascade → حذف ۲ Attempt یتیم؛ `deleted=2` — `w4-cleanup.log` |
| بازگشت شمارش‌ها به خط پایه | **PASS** | User=3 · Progress=27 · **Attempt=181** · **ReviewState=10** — دقیقاً برابر probe اولیه |
| سلامت نهایی کپی | **PASS** | `PRAGMA integrity_check` = `ok`؛ نشانگر `run-20261029T213241Z` پابرجا |
| عدم-تخریب اصلی (پایان) | **PASS** | t2 = t0 (بخش D)؛ سرور پس از گام هم زنده (:3000 = HTTP ۲۰۰)؛ درخت کاری پاک |

**FAIL: هیچ. BLOCKED: هیچ.**

## F) آزمون‌های اجرانشده و محدودیت‌ها

- **APIهای زنده (`POST /api/attempts`، `PUT /api/srs`) NOT-RUN** — عمداً: هر فراخوانی از سرور dev به پایگاه اصلی می‌نویسد و ممنوع صریح دستور است؛ مسیر نوشتن فقط در سطح Prisma/کپی آزموده شد.
- مسیر `import` (`createMany`/`upsert` تراکنشی) NOT-RUN — دامنهٔ گام فقط اثبات ذخیره/بازخوانی هر مدل بود.
- رفتار هم‌زمانی/بار، محیط عملیاتی، مهاجرت واقعی و جریان کامل کاربر NOT-RUN — خارج از دامنهٔ این گام.
- `sqlite3 CLI` در محیط موجود نیست (محدودیت ابزاری ثبت‌شدهٔ 5.5 قائم) — Python/Node جایگزین شدند.
- حادثهٔ ابزاری بی‌اثر: نخستین اجرای probe با خطای سریال BigInt متوقف شد (فقط‌خواندنی، هیچ داده‌ای درگیر نشد) — اصلاح و اجرای مجدد موفق.
- کپی و آرتیفکت‌ها در `/tmp` و `/home/z/tmp` ماندگاری بلندمدت ندارند؛ خروجی‌های کلیدی در همین گزارش نقل‌قول شده است.
- **آزمون موفق روی کپی مساوی تأیید کامل مهاجرت، API زنده یا محیط عملیاتی نیست.**

## G) تفکیک شواهد از استنتاج‌ها

- **شواهد مستقیم همین گام:** خروجی‌های نقل‌قول‌شدهٔ بخش‌های C–F (snapshot، pragma، نشانگر، گاردها، شمارش‌ها، چهار لاگ W، سه‌باره sha256sum اصلی + یک‌باره کپی) — همگی اجرای واقعی همین گام.
- **ادعاهای منتقل‌شده (برچسب «طبق سند پیشین»):** تطبیق خط پایه با N1-5.5 (بخش D)؛ قراردادهای کد مستقیماً در همین گام از منبع خوانده شدند (`attempts/route.ts:20-70`، `srs/route.ts:60-100,160-200`).
- **هیچ نتیجهٔ تأییدنشده‌ای PASS اعلام نشد؛** رفتارهای «مشاهده‌شده» (P2002، SetNull، Cascade، create تکراری بدون خطا) همگی اجرای واقعی روی کپی‌اند، نه استنتاج از Schema.

## H) فایل‌ها و داده‌های تغییرکرده

- **در مخزن (فقط مستندات، مطابق ALLOWED_FILES):** ① این گزارش (جدید) ② چک‌لیست N1-5.9 (جدید) ③ `worklog.md` (فقط الحاق یک ورود). هیچ فایل دیگری — کد، schema، `.env`، `.gitignore`، roadmap.md، Git config/hook/remote — تغییر نکرد.
- **خارج از مخزن:** `/tmp/n1qa59/` (کپی + لاگ‌ها + فایل‌های SHA) و `/home/z/tmp/n1qa59/` (اسکریپت‌ها) — آرتیفکت‌های آزمون.
- **پایگاه اصلی و همهٔ داده‌های runtime:** دست‌نخورده (SHA t0 = t2؛ حجم/mtime ثابت).
- SHA کامیت این گام طبق الگوی مستقر در خود سند ثبت نمی‌شود و در گزارش گفت‌وگویی به مالک اعلام می‌گردد؛ اعتبار انتشار فقط با `git ls-remote backup refs/heads/main` پس از push اثبات می‌شود.

## I) وضعیت معیار پنجم پذیرش فاز ۱ پس از این گام

- پیش از این گام (طبق ممیزی N1-5.8): لایهٔ localStorage = PASS ایزوله؛ آزمون DB ایزولهٔ 5.5 = موفق ولی فقط `Progress`؛ «نوشتن Attempt/ReviewState حتی روی کپی» = NOT-RUN ساختاری.
- **پس از این گام:** مؤلفهٔ NOT-RUN مذکور بسته شد — ثبت/بازخوانی `Attempt` و `ReviewState` روی نسخهٔ ایزوله با مشاهدهٔ قیدهای واقعی Schema (یکتایی/upsert/SetNull/Cascade) **VERIFIED-PASS** است؛ پوشش آزمون ایزولهٔ لایهٔ دادهٔ معیار پنجم اکنون سه‌مدله است (Progress + Attempt + ReviewState).
- **معیار پنجم همچنان OPEN می‌ماند:** جمع‌بندی سراسری (APIهای زنده، محیط عملیاتی، مهاجرت واقعی) هنوز اجرا/تأیید نشده و تصمیم نهایی با مالک است؛ `roadmap.md` تیک نمی‌خورد و فاز ۱ بسته نمی‌شود.
- پیشنهاد گام بعدی (بدون اجرا): آزمون API زندهٔ نوشتنی در محیط کنترل‌شدهٔ مالک، یا تکمیل NOT-RUNهای ساختاری باقی‌مانده (TTS/AI، پایان آزمون مهمان، کلاس مجازی، بازی‌ها).

> **پایان سند — پس از Commit/Push کنترل‌شده و تطبیق SHA ریموت، گام متوقف می‌شود؛ N1-5.10 آغاز نمی‌شود.**
