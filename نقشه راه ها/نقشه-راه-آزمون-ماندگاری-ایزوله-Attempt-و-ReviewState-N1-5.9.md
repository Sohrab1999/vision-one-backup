# نقشه راه — آزمون ایزولهٔ ماندگاری Attempt و ReviewState (N1-5.9)

> **شناسهٔ گام:** N1-5.9 · **تاریخ:** ۱۴۰۵/۸/۸ (۲۰۲۶-۱۰-۳۰) · مخزن: `Sohrab1999/vision-one-backup` · شاخه: `main`
> **SHA مبنای گام (پیش‌بررسی تازه):** `7351227540ef6f6f7cc5a575cb3a6be2606131b0` = commit ممیزی مستند نهایی فاز ۱ (N1-5.8) = `backup/main` — درخت کاری پاک.
> **اصل غیرقابل‌مذاکره:** هیچ نوشتنی به `db/custom.db` فعال یا هر نسخهٔ اصلی؛ آزمون نوشتنی فقط پس از اثبات کامل جداسازی و فقط روی کپی قابل‌بازگشت. رفتار موردانتظار فقط از Schema و کد موجود استخراج می‌شود؛ قرارداد جدید ساخته نمی‌شود.
> **ارتباط با گام‌های پیشین:** توسعهٔ مستقیم N1-5.5 (که فقط `Progress` را نوشت) و پاسخ به «NOT-RUN» ثبت‌شدهٔ ممیزی N1-5.8 («نوشتن Attempt/ReviewState حتی روی کپی») برای روشن‌کردن معیار پنجم پذیرش فاز ۱.

---

## ۰) نتایج پیش‌بررسی (مرحلهٔ ۱ دستور — همگی تازه)

- Git: شاخهٔ `main`، HEAD `7351227…`، `git status --porcelain` خالی، `git ls-remote backup refs/heads/main` = همان SHA (واگرایی صفر)؛ بدون stash و بدون merge/rebase نیمه‌تمام؛ هیچ auto-commit پیش‌بینی‌شده‌ای پس از کامیت N1-5.8 وجود نداشت.
- Hook: SHA-256 `.git/hooks/post-commit` = `ee679bc1b642db0f5ecc206544d1c10daf71cffe3827dad33d3b0177c58aed71` (۱۳۹۱ بایت) = دقیقاً مبنا؛ بدون تغییر و بدون غیرفعال‌سازی.
- `.gitignore`: قواعد `.zscripts/dev.pid` (سطر ۵۷) و `tool-results/` (سطر ۵۸) فعال (`git check-ignore -v` هر دو مسیر) — میراث SYNC2.
- محیط: dev server فعال (PID ۱۱۱۸ = `bun run dev`، PPID=۱؛ پورت ۳۰۰۰ = HTTP ۲۰۰) → نویسندهٔ هم‌زمان بالقوهٔ اصلی؛ **sqlite3 CLI موجود نیست**؛ Python 3.12.16 و Node موجود (Node برای اجرای فرایندهای Prisma).
- پایگاه اصلی (مشاهدهٔ مستقیم): SQLite در `db/custom.db` — **SHA-256 t0 = `0057e27c9a9d5d7d3fbf531aec22ee76c0d6654ecedf465178f7163fcd2bb097`** (عین خط پایهٔ t0/t2 گام N1-5.5 → از ۲۰۲۶-۱۰-۲۸ هیچ نوشتنی به اصلی فرود نیامده)، ۱٬۲۳۶٬۹۹۲ بایت، mtime 2026-10-28 20:13:19، `journal_mode=delete`، فایل‌های `-wal/-shm` وجود ندارند؛ `.env:1` = `DATABASE_URL=file:/home/z/my-project/db/custom.db`؛ `prisma/schema.prisma:7-10` = datasource sqlite با `env("DATABASE_URL")`.
- مدل‌های آزمون (هر دو در Schema موجودند — شرط گام برقرار):
  - `Attempt` (`schema.prisma:75-98`): PK cuid؛ **بدون `@@unique` به‌جز PK**؛ سه index (`category`، `book`، `userId`)؛ `userId?` اختیاری با FK به `User` و **`onDelete: SetNull`**؛ فیلدهای اجباری: `category`، `lesson`، `total`، `correct`، `duration`؛ اختیاری: `name`، `detail` (JSON رشته‌ای)، `userId`؛ `createdAt @default(now())`.
  - `ReviewState` (`schema.prisma:101-130`): PK cuid؛ **قید یکتا `@@unique([userId, book, cardKey])`**؛ `userId` اجباری با FK و **`onDelete: Cascade`**؛ indexهای `[userId, dueAt]` و `[userId, book]`؛ پیش‌فرض‌ها: `cardType="word"`، `chapter=0`، `ease=2.5`، `interval=0`، `reps=0`، `lapses=0`، `streak=0`، `dueAt=now()`؛ `lastGrade?`؛ `updatedAt @updatedAt`.
- مسیرهای نوشتن واقعی در کد (قرارداد رفتار — از کد استخراج شد، نه حدس):
  - Attempt: `src/app/api/attempts/route.ts:39` = **create ساده بدون قرارداد dedup/idempotency** (هر POST = ردیف جدید)؛ `src/app/api/import/route.ts:319` = `createMany` در تراکنش.
  - ReviewState: `src/app/api/srs/route.ts:177` = **`upsert` با کلید `userId_book_cardKey` — قرارداد رفتار تکرار صریحاً در کد تعریف شده** (تکرار = update نه insert)؛ `src/app/api/import/route.ts:206` = `upsert` مشابه.
- مسیرهای خواندن: `attempts/route.ts` (GET)، `leaderboard/route.ts:84`، `export/route.ts:45,61`، `class/[code]/challenge/route.ts:85`، `class/_lib/state.ts:144`، `compare/route.ts:69,81`، `srs/route.ts:72` (GET بر اساس userId).
- روش ایزوله‌سازی: از گزارش N1-5.5 (بخش B) عیناً استخراج شد — کپی سازگار با SQLite online backup API از اتصال `mode=ro`؛ حدس زدن مسیر/روش لازم نشد.

## ۱) محدودهٔ مجاز (ALLOWED_FILES — پیش از هر ویرایش)

1. `نقشه راه ها/نقشه-راه-آزمون-ماندگاری-ایزوله-Attempt-و-ReviewState-N1-5.9.md` (این چک‌لیست — جدید)
2. `نقشه راه ها/گزارش-آزمون-ماندگاری-ایزوله-Attempt-و-ReviewState-N1-5.9.md` (گزارش نهایی — جدید)
3. `worklog.md` (فقط یک ورود الحاقی تاریخ‌دار)

**ممنوع:** تغییر `roadmap.md` (معیار پنجم تیک نمی‌خورد و فاز ۱ بسته نمی‌شود)، هر کد/schema، مهاجرت/seed/backfill، تنظیمات Git/remote/hook، `.env`، `.gitignore`؛ تغییر `db/`، `uploads/`، `qa-shots/`، `tool-results/`، `.zscripts/*` و فایل‌های محیطی؛ `git add -A/. /-u`، `git commit -a`، force-push/reset/clean/stash. فراخوانی هر API زنده‌ای که امکان نوشتن به اصلی دارد ممنوع است (سرور فقط برای بررسی سلامت پینگ می‌شود). همهٔ آرتیفکت‌ها فقط در `/tmp/n1qa59/` و `/home/z/tmp/n1qa59/` (خارج از مخزن).

## ۲) طرح اثبات جداسازی (مرحلهٔ ۳ — پیش‌نیاز هر نوشتنی)

| # | گام | روش (الگوی مستند N1-5.5 §B) | شاهد موردانتظار |
|---|---|---|---|
| I-1 | خط پایهٔ اصلی | `sha256sum db/custom.db` + `stat` | SHA-256 **t0** = `0057e27c…2bb097` |
| I-2 | کپی سازگار | Python 3.12: `sqlite3.connect('file:…db/custom.db?mode=ro', uri=True)` → `src.backup(dst)` به `/tmp/n1qa59/custom-qa.db` — منبع فقط-خواندنی؛ dev server خاموش نمی‌شود | `SNAPSHOT_OK`؛ فایل اصلی جابه‌جا/overwrite نشده |
| I-3 | سلامت کپی و اصلی | `PRAGMA integrity_check` هر دو اتصال | `ok` / `ok` |
| I-4 | نشانگر فقط در کپی | جدول `_qa_marker(run)` با مقدار `run-<UTC-ts>` | نشانگر فقط از کپی خوانده شود |
| I-5 | گارد فرایندی برای «تمام» فرایندهای آزمون | هر اسکریپت (probe/W1/W2/W3/W4): cwd=`/tmp/n1qa59` (بدون `.env`) + `DATABASE_URL` صریح در خط فرمان + گارد درون‌اسکریپتی (env ≠ مسیر کپی → `exit 9` پیش از ساخت هر کلاینت) + `new PrismaClient({ datasourceUrl })` — runtime: Node؛ require مطلق از `node_modules` پروژه | هر ۵ لاگ = `GUARD_PASS` |
| I-6 | اثبات اتصال فقط-خواندنی | probe با: `SELECT * FROM pragma_database_list` (ستون file = مسیر کپی) + خواندن نشانگر + شمارش User/Progress/Attempt/ReviewState؛ بدون هیچ create/update/delete | `PROBE_OK` + مسیر کپی + نشانگر + شمارش‌ها = خط پایه |
| I-7 | کنترل اصلی پس از probe و پیش از نوشتن | `sha256sum` اصلی دوباره | برابر t0 |
| I-8 | ممنوعیت ابزارهای تغییردهندهٔ Schema | `prisma db push` / migrate / seed / backfill در هیچ مرحله‌ای اجرا نمی‌شود؛ کپی schema را از اصلی به ارث می‌برد | — |

**گِیت پیش از نوشتن (G1…G5):** G1 کپی مستقل و قابل‌بازگشت خارج از مخزن، اصلی دست‌نخورده · G2 مسیر مؤثر اتصال فرایند آزمون = کپی (pragma + نشانگر + گارد) · G3 هیچ مسیر نوشتنی به اصلی (منبع ro + گارد env + datasourceUrl صریح + I-7) · G4 مقصد نوشتن فقط `/tmp/n1qa59/` · G5 مقایسهٔ SHA-256 اصلی قبل/بعد آماده. **اگر حتی یک شرط اثبات نشود → هیچ نوشتنی؛ BLOCKED با علت دقیق؛ بدون دورزدن.**

## ۳) طرح آزمون محدود Attempt/ReviewState (مرحلهٔ ۴ — فقط پس از PASS کامل گِیت)

- دادهٔ مصنوعی با شناسهٔ یکتای همین اجرا: یک `User` ساختگی (`username = qa-n159-<ts>`، `pinHash` ساختگی عمداً غیرمعتبر — هرگز credential واقعی).
- **W1 (Attempt — ثبت + بازخوانی + مشاهدهٔ رفتار تکرار):** create با `userId` FK و همهٔ فیلدهای واقعی‌نما (`book="vision-one"`، `category="grammar"`، `lesson=1`، `total=10`، `correct=7`، `duration=300`، `name`، `detail` JSON) → بازخوانی مستقل میدان‌به‌میدان → تکرار همان create با ثبت رفتار واقعی: Schema قید یکتایی ندارد و قرارداد کد (`attempts/route.ts:39`) create ساده است → انتظار «بدون خطا و ردیف دوم» (مشاهدهٔ واقعیت Schema، نه قرارداد جدید).
- **W2 (ReviewState — upsert طبق قرارداد `srs/route.ts:177` + بازخوانی + رفتار تکرار + قید یکتا):** upsert با کلید `userId_book_cardKey` → بازخوانی میدان‌به‌میدان (۱۳ فیلد) → upsert تکراری با مقدار تغییر‌یافته (انتظار: update نه insert — قرارداد صریح کد) → create مستقیم با سه‌تایی تکراری (انتظار: P2002 — مشاهدهٔ واقعی `@@unique`).
- **W3 (پایداری):** فرایند/اتصال کاملاً تازه → بازخوانی هر دو مدل → تطبیق مقدارها (ماندگاری روی دیسک، نه حافظهٔ اتصال).
- **W4 (مشاهدهٔ FK + پاک‌سازی محدود + سلامت):** حذف کاربر ساختگی → مشاهدهٔ رفتار اعلام‌شدهٔ Schema: `Attempt.userId → NULL` (SetNull) و حذف خودکار `ReviewState` (Cascade) → حذف ردیف‌های یتیمِ Attempt همین run → شمارش‌های هر چهار جدول دقیقاً = خط پایه → `integrity_check` کپی = `ok` و نشانگر پابرجا.
- **پایان:** `sha256sum` اصلی (t2) — اگر ≠ t0 → توقف + گزارش رخداد؛ هیچ ترمیم خودکاری. SHA کپی پس از آزمون ثبت می‌شود (تغییرش = اثبات رفتاری فرود نوشتن‌ها فقط در کپی).
- **ممنوع در کل گام:** نوشتن روی اصلی، تغییر Schema/کد/Runtime، فراخوانی API زندهٔ نوشتنی، دسترسی به دادهٔ واقعی کاربران.

## ۴) شرایط توقف مخصوص این گام

| # | وضعیت | واکنش |
|---|---|---|
| S59-1 | درخت کاری کثیف / ریموت ناهمگام / hook تغییرکرده / وضعیت مبهم | بدون تغییر؛ گزارش و توقف |
| S59-2 | تهیهٔ کپی سازگار ممکن نشود | BLOCKED؛ dev server بدون مجوز خاموش نمی‌شود |
| S59-3 | هر شرط G1…G5 یا هر گارد فرایندی اثبات نشود | هیچ نوشتنی؛ BLOCKED با علت دقیق |
| S59-4 | SHA اصلی پس از probe یا پس از آزمون ≠ t0 | توقف فوری + گزارش رخداد؛ بدون ترمیم خودکار |
| S59-5 | نیاز آزمون به تغییر کد/Schema/Runtime | آن بخش اجرا نمی‌شود؛ محدودیت ثبت می‌شود |
| S59-6 | خطای Prisma در آزمون نوشتنی | ثبت FAIL با جزئیات؛ کنترل SHA اصلی؛ بدون ترمیم |

## ۵) دفتر شواهد (همه در خارج از مخزن)

- `/tmp/n1qa59/`: `snapshot.log`، `probe.log`، `w1-attempt.log`، `w2-reviewstate.log`، `w3-reopen.log`، `w4-cleanup.log`، `main-sha-t0.txt`، `main-sha-t2.txt`، `custom-qa.db` (کپی آزمایشی).
- `/home/z/tmp/n1qa59/`: `snapshot.py`، `guard.js`، `probe.js`، `w1-attempt.js`، `w2-reviewstate.js`، `w3-reopen.js`، `w4-cleanup.js`.
- خروجی‌های کلیدی در گزارش نهایی همین گام نقل‌قول می‌شوند (ماندگاری آرتیفکت‌های /tmp بلندمدت نیست — محدودیت ثبت‌شدهٔ 5.5 نیز قائم است).

> **پایان سند — معیار پنجم پذیرش فاز ۱ تیک نمی‌خورد؛ `roadmap.md` تغییر نمی‌کند؛ فاز ۱ بسته نمی‌شود؛ آزمون موفق روی کپی مساوی تأیید مهاجرت/API زنده/محیط عملیاتی نیست.**
