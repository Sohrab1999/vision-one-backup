# گزارش آزمون ایزولهٔ احرازشدهٔ API — مسیر واقعی `PUT /api/srs` (N1-5.12)

> **شناسهٔ گام:** N1-5.12 · **تاریخ اجرا:** ۱۴۰۵/۸/۸ (۲۰۲۶-۱۰-۳۰) · مخزن: `Sohrab1999/vision-one-backup` · شاخهٔ `main`
> **SHA مبنای گام:** `4bb5a884f09fd3aee233c057d52b7f52e55b11bf` (= commit N1-5.11 = `backup/main`؛ درخت پاک)
> **مرجع چک‌لیست:** `نقشه راه ها/نقشه-راه-آزمون-ایزوله-API-srs-N1-5.12.md` (طبق همان طرح اجرا شد)
> **نتیجهٔ کلی گام:** **آزمون موفق** — نخستین آزمون «مسیر واقعی HTTP **احرازشده**» روی نمونهٔ مستقل برنامه: ورود واقعی NextAuth Credentials با کاربر QA ساخته‌شده از endpoint واقعی register در کپی؛ بدون نشست = **401** دقیق؛ با نشست = ثبت اولیه **200 count:1**؛ همان کلید = **upsert بدون تکرار** با مقادیر جدید؛ کنترل منفی قراردادی = **200 count:0** بدون نوشتن؛ پایگاه اصلی بایت‌به‌بایت دست‌نخورده (SHA t0=میانه=t2). **معیار پنجم همچنان OPEN؛ فاز ۱ بسته نمی‌شود.**

---

## ۱) پیش‌بررسی Git و منابع سیستم

- Git: HEAD `4bb5a88…` = `backup/main` (واگرایی صفر)، درخت پاک، hook = مبنا (`ee679bc1…aed71`، ۱۳۹۱ بایت)، `.gitignore:47 dev.log` و `:57-58` فعال — مستندات N1-5.10/N1-5.11 و روش 5.5/5.9 از مخزن خوانده شد؛ اسکریپت‌های واقعی N1-5.11 بازخوانی و الگوی همان روش بازتولید شد.
- منابع در لحظهٔ تصمیم: available = ۱۲۰۷MB (شروع چرخه)؛ RSS next-server اصلی ≈ ۲۱۲۱MB؛ دیسک آزاد = ۷٫۳GB؛ پورت ۳۴۵۸ آزاد (صفر شنونده)؛ node v24.22.1 / Python 3.12.16 (sqlite3 CLI موجود نیست — قائم).
- سرور اصلی :3000 = 200 پیش/میانه/پس از گام (فقط پینگ سلامت GET)؛ در هیچ لحظه‌ای خاموش/بازراه‌اندازی نشد.

## ۲) روش و شواهد snapshot و ایزوله‌سازی

- **snapshot سازگار:** Python ro backup API (روش مستند N1-5.5 §B، بازاستفاده‌شده در 5.9/5.11) → `/tmp/n1qa512/custom-qa-srs.db`؛ `source_integrity=ok`، `copy_integrity=ok`، `journal_mode=delete`، نشانگر `run-20261029T231937Z` فقط در کپی.
- **نمونهٔ مستقل:** کپی پروژه = سورس whitelist + **node_modules کامل (۱٫۱GB — نه symlink)** + `.env` → مسیر کپی؛ `next dev -p 3458` با `NODE_OPTIONS=--max-old-space-size=512` و `NEXT_TELEMETRY_DISABLED=1` و `NEXTAUTH_URL=http://localhost:3458` (همه env-only، بدون تغییر کد)؛ **بدون db push/migrate/seed**؛ Ready در اولین پروب.
- **شواهد اتصال (چندلایه):**

| لایهٔ شاهد | مقدار ثبت‌شده |
|---|---|
| environ لانچر (PID ۱۰۴۷۴) | `DATABASE_URL=file:/tmp/n1qa512/custom-qa-srs.db` + `NEXTAUTH_URL=http://localhost:3458` + `NEXTAUTH_SECRET` حاضر (فقط شمارش حضور) |
| environ next-server (PID ۱۰۴۸۸، cwd=appcopy) | همان `DATABASE_URL` کپی + حضور Secret |
| شنوندهٔ پورت | `ss`: `*:3458` = next-server PID ۱۰۴۸۸ (cwd=`/tmp/n1qa512/appcopy`) — :3000 = فرایند اصلی ۱۱۶۹ |
| لاگ خود فرایند سروکننده | `prisma:query` در `server.log` نمونهٔ ایزوله: `INSERT INTO \`main\`.\`ReviewState\` … ON CONFLICT (\`userId\`,\`book\`,\`cardKey\`) DO UPDATE …` (upsert واقعی) |
| اتصال گارد‌دار مستقل | verify/cleanup: `GUARD_PASS` + `pragma_database_list` = `[{"seq":0,"name":"main","file":"/tmp/n1qa512/custom-qa-srs.db"}]` + نشانگر خوانده شد |
| اثبات منفی مسیر اصلی | dev.log اصلی: **صفر** `PUT /api/srs` و `/api/auth/callback` و `/api/auth/register` در ۵۰۰ خط آخر |
| SHA-256 اصلی | t0 = میانه = t2 = `0057e27c9a9d5d7d3fbf531aec22ee76c0d6654ecedf465178f7163fcd2bb097` (۱٬۲۳۶٬۹۹۲ بایت) |

- **ثبت شفاف لایهٔ fd:** کاوش fd در پنجرهٔ شواهد = **صفر fd باز** — زیرا پروب آمادگی `GET /api/auth/session` به DB دست نمی‌زند و در آن لحظه هنوز هیچ اتصالی باز نشده بود (در N1-5.11 پروب آمادگی یک مسیر DB-خور بود). این لایه به‌جای PASS با برچسب **NOT-OBSERVED** ثبت شد و بار اثبات جداسازی بر دوش environ فرایند سروکننده + لاگ SQL خودِ آن + رؤیت داده از فرایند مستقل + SHAهاست — که همگی جمعاً قاطع‌اند.
- **گزارش حادثهٔ فراخوانی اول (۲۳:۱۷):** راه‌اندازی لانچر با «Permission denied» شکست خورد (فایل ساخته‌شده بدون بیت +x) → مسیر تمیز `GATE_FAIL`: هیچ سروری شروع نشد، هیچ نوشتنی رخ نداد، teardown اجرا شد؛ پس از `chmod +x`، فراخوانی دوم (۲۳:۱۹) کامل بود؛ SHA t0 هر دو یکسان. بدون پیامد داده‌ای.

## ۳) ساخت کاربر QA و احراز هویت واقعی — بدون افشای Secret

- کاربر QA فقط در کپی و **از مسیر کاملاً واقعی برنامه** ساخته شد: `POST /api/auth/register` روی نمونهٔ ایزوله با نام ساختگی `qa_n1512_231937` و PIN تصادفی ۴رقمی ساختگی → **200 `{"ok":true,"id":"cmvu61qs40000ot3chrwgi0bu"}`** — یعنی `pinHash` با همان `hashPin` واقعی (scrypt، `salt32hex:hash64hex`) تولید شد؛ هیچ حساب واقعی دست‌کاری نشد.
- **ورود واقعی NextAuth Credentials:** `GET /api/auth/csrf` (200) → `POST /api/auth/callback/credentials` با form (`csrfToken`, `username`, `pin`, `json=true`) → **200** → اثبات نشست از سازوکار واقعی: `GET /api/auth/session` = `{"user":{"name":"qa_n1512_231937","id":"cmvu61qs40000ot3chrwgi0bu","username":"qa_n1512_231937","avatar":null,"grade":null},"expires":"2026-11-28T23:20:07.058Z"}` — هم‌خوان کامل id با رکورد DB کپی (بازخوانی گارد‌دار: `QA_USER_ID_MATCH=true`، `PINHASH_FORMAT_OK=true` — فقط تست قالب، مقدار چاپ نشد).
- **بدون دورزدن:** نه JWT جعلی، نه امضای دستی، نه تغییر Middleware/Credentials/سیاست امنیتی؛ Secret تصادفی زمان‌اجرا فقط در env نمونهٔ ایزوله (حضورش شمرده شد، مقدار هرگز چاپ/ذخیره نشد)؛ کوکی‌ها فقط در jar با perm 600 که در teardown حذف شد؛ PIN فقط در حافظهٔ چرخهٔ تک‌فراخوانی.
- GET فقط‌خواندنی با نشست: `GET /api/srs` → **200 `{"ok":true,"states":[],"count":0}`** — عبور سشن تا لایهٔ API (کپی خالی از ردیف SRS).

## ۴) نتایج آزمون‌ها — کد HTTP و شواهد (آزمون API واقعی ≠ Prisma مستقیم ≠ استنباط)

| # | آزمون | نتیجه | شواهد |
|---|---|---|---|
| R1 | آمادگی + کامپایل مسیرها با GET فقط‌خواندنی (session، csrf، srs) | **VERIFIED-PASS** | `GET /api/auth/session` 200؛ `GET /api/srs` با نشست 200 count:0 (بدون نوشتن) |
| R2 | **احراز هویت واقعی از مسیر Credentials** (register واقعی + ورود واقعی + اثبات session) | **VERIFIED-PASS** | register 200 {ok,id}؛ callback 200؛ session-proof JSON با id/QA منطبق؛ توکن/کوکی/Secret چاپ نشد |
| R3 | **آزمون A — PUT بدون نشست** (body معتبر، بدون کوکی) | **VERIFIED-PASS** | **HTTP 401** + `{"error":"ابتدا وارد شو"}` (۹ms) — دقیقاً قرارداد سطر ۹۷-۹۹ route؛ لاگ نمونه: `PUT /api/srs 401`؛ **بدون نوشتن** (شمارش‌ها خط پایه در verify) |
| R4 | **آزمون B — ثبت اولیه با نشست معتبر** (book=vision-one، cardKey=`qa_231937_c1`، cardType=verb، chapter=3، ease=2.5، interval=0، reps=1، lapses=0، streak=1، lastGrade=2، dueAt=2026-11-15T10:00:00.000Z) | **VERIFIED-PASS** | **HTTP 200** + `{"ok":true,"count":1}` (۱۶ms)؛ شمارش گارد‌دار کلید = **1**؛ لاگ نمونه: SQL INSERT + `PUT /api/srs 200` |
| R5 | **آزمون C — Upsert** (همان userId+book+cardKey؛ ease 2.5→**3.1**، interval 0→**7**، streak 1→**2**، lastGrade 2→**1**) | **VERIFIED-PASS** | **HTTP 200** + `{"ok":true,"count":1}` (۲۵ms)؛ SQL = `ON CONFLICT (userId,book,cardKey) DO UPDATE`؛ `QA_ROWS_FOR_KEY=1` (**بدون ردیف تکراری**)؛ بازخوانی مستقل: **۱۳/۱۳ بررسی فیلد true** شامل `easeUpdated/intervalUpdated/streakUpdated/lastGradeUpdated` و `dueAt` و `userIdMatch` و `updatedAt≥createdAt` |
| R6 | **کنترل منفی قراردادی** — `book:"nope-book"` خارج از whitelist | **VERIFIED-PASS** | **HTTP 200** + `{"ok":true,"count":0}` (۱۱ms) — عضو skip طبق سطر ۱۲۳ route؛ تراکنش خالی (BEGIN/COMMIT بدون INSERT در لاگ نمونه)؛ **بدون نوشتن** (ReviewState برای QA همچنان ۱) |
| R7 | **آزمون D — جداسازی و پاک‌سازی** | **VERIFIED-PASS** | شمارش‌های حین: User=4 · Progress=27 · Attempt=181 · **ReviewState=11**؛ پاک‌سازی گارد‌دار: `DELETED_REVIEWSTATE=1`، `DELETED_USER=1` → دقیقاً خط پایه (**۳/۲۷/۱۸۱/۱۰**)؛ `integrity_check=ok`؛ نشانگر پابرجا |
| R8 | عدم-تخریب اصلی و جمع‌آوری | **VERIFIED-PASS** | SHA t0=میانه=t2؛ teardown فقط PIDهای cwd=appcopy (۱۰۴۷۴/۱۰۴۸۸) → `isolated-stopped`؛ :3000 پس از گام = 200؛ available پایان = ۱۲۲۳MB؛ کپی ۱٫۱GB و jarها حذف؛ شواهد ≈۱٫۳MB نگه‌داری شد |

**FAIL: هیچ. BLOCKED: هیچ.** — کمینهٔ available مشاهده‌شده: **۹۱۷MB** (بالاتر از قانون سقط ۲۰۰MB).

## ۵) تعداد رکوردها قبل و بعد از Upsert

- قبل از آزمون B (کلید `qa_231937_c1`): **0** ردیف (کپی خالی از SRS — GET count:0).
- بعد از آزمون B: **1** ردیف (شمارش گارد‌دار: `QA_RS_COUNT_FOR_KEY=1`).
- بعد از آزمون C (upsert): **همچنان 1** ردیف — بدون تکرار (`QA_ROWS_FOR_KEY=1`) با مقادیر به‌روز (ease 3.1 / interval 7 / streak 2 / lastGrade 1) — رفتار upsert قرارداد سطر ۱۷۷-۲۰۶ route دقیقاً مشاهده شد.
- بعد از کنترل منفی: **همچنان 1** ردیف (عضو نامعتبر skip شد).
- بعد از پاک‌سازی: **0** ردیفِ این آزمون؛ کل ReviewState کپی = 10 (خط پایه).

## ۶) SHA پایگاه اصلی t0 و t2

- t0 (پیش از هر چیز): `0057e27c9a9d5d7d3fbf531aec22ee76c0d6654ecedf465178f7163fcd2bb097` (۱٬۲۳۶٬۹۹۲ بایت)
- میانه (بعد از آزمون‌ها، پیش از پاک‌سازی): همان
- t2 (پس از پاک‌سازی و teardown): همان — **پایگاه اصلی بایت‌به‌بایت دست‌نخورده**؛ همراه با لاگ منفی صفرِ درخواست نوشتنی/احراز در dev.log اصلی و environ صریحِ فرایندهای ایزوله.

## ۷) سلامت و پاک‌سازی DB آزمایشی

- در جریان آزمون: User=4 (۳+QA) · ReviewState=11 (۱۰+۱) · Progress/Attempt در خط پایه (۲۷/۱۸۱).
- پاک‌سازی گارد‌دار (فقط همین run): حذف ردیف‌های ReviewState کاربر QA = ۱، حذف کاربر QA = ۱ (Cascade قراردادی schema — حذف مستقل نیز انجام شد و بی‌فایدهٔ اضافی بود) → شمارش‌ها **دقیقاً خط پایه (۳/۲۷/۱۸۱/۱۰)**؛ `PRAGMA integrity_check = ok`؛ `_qa_marker = run-20261029T231937Z` پابرجا؛ کپی پاک‌شده (۱٫۲MB) در `/tmp/n1qa512/custom-qa-srs.db` به‌عنوان شاهد نگه‌داری شد.

## ۸) فایل‌های مستنداتی تغییرکرده در مخزن

1. `نقشه راه ها/نقشه-راه-آزمون-ایزوله-API-srs-N1-5.12.md` (جدید — چک‌لیست)
2. `نقشه راه ها/گزارش-آزمون-ایزوله-API-srs-N1-5.12.md` (جدید — همین سند)
3. `worklog.md` (فقط الحاق یک ورود)

هیچ کد/Schema/داده/پیکربندی/Git-config تغییر نکرد؛ `roadmap.md` تیک نخورد؛ درخت پس از گام پاک است؛ SHA کامیت این گام طبق الگوی مستقر در گزارش گفت‌وگویی اعلام می‌شود؛ اعتبار انتشار فقط با `git ls-remote backup refs/heads/main` پس از push.

## ۹) Commit و تطبیق ریموت

- Stage فقط سه مسیر فوق؛ بررسی `git diff --cached --stat` و `git diff --check`؛ **یک commit مشخص برای N1-5.12**؛ hook خودکار push کرد (بدون push تکراری)؛ `git ls-remote backup refs/heads/main` = HEAD — نتیجهٔ نهایی در همین سند و در پیام گفته‌شده به مالک ثبت می‌شود (الگوی گام‌های پیشین).

## ۱۰) محدودیت‌ها و آزمون‌های NOT-RUN

- **آزمون‌های NOT-RUN (خارج از دامنهٔ این گام):** اشباع rate-limit (`srs:put` 30/60s و login 8/60s)؛ سقف ۳۰۰۰ وضعیت (413)؛ درخواست چندتکه‌ای >۶۰ عضو (مسیر chunk)؛ درخواست‌های هم‌زمان؛ مسیر احرازشدهٔ `POST /api/attempts` (پیوند attempt به کاربر)؛ import/export؛ رفتار با NEXTAUTH_SECRET تنظیم‌نشده.
- **محدودیت‌های ثبت‌شده:** لایهٔ fd در پنجرهٔ شواهد NOT-OBSERVED بود (صفر fd — پروب آمادگی DB-بود)؛ فرایندهای پس‌زمینه بین فراخوانی‌ها کشته می‌شوند → چرخهٔ تک‌فراخوانی الزامی (میراث N1-5.11)؛ تلاش اول فراخوانی به‌دلیل بیت +x شکست خورد (تمیز، بدون پیامد)؛ `sqlite3 CLI` موجود نیست (Python/Node)؛ کپی آزمایشی معادل snapshot است، نه DB زندهٔ عملیاتی — موفقیت این آزمون مساوی تأیید محیط عملیاتی/مهاجرت کامل نیست.
- **نکتهٔ `count` پاسخ:** طبق کد، `count` تعداد اعضای مجازِ سنجیده‌شده است نه تعداد ردیف‌های DB — در آزمون C هر دو = ۱ بودند (سازگار).

## وضعیت معیار پنجم پذیرش فاز ۱ پس از این گام

- مؤلفهٔ دیگرِ NOT-RUNهای ساختاری ممیزی N1-5.8 بسته شد: «مسیر نوشتنی احرازشده (PUT /api/srs) با نشست واقعی» اکنون در سطح **HTTP کامل روی کپی ایزوله** VERIFIED-PASS است.
- پوشش فعلی لایهٔ داده/ذخیره‌سازی معیار پنجم: Progress (Prisma، 5.5) + Attempt/ReviewState (Prisma، 5.9) + POST /api/attempts مهمان (HTTP، 5.11) + **PUT /api/srs احرازشده با ورود واقعی (HTTP، 5.12)**.
- **معیار پنجم همچنان OPEN**: مسیر احرازشدهٔ POST /api/attempts، جمع‌بندی محیط عملیاتی/مهاجرت و آزمون‌های NOT-RUN بالا باقی است؛ تصمیم نهایی با مالک؛ فاز ۱ بسته نمی‌شود؛ N1-5.13 آغاز نمی‌شود.

> **پایان سند — پس از Commit/Push کنترل‌شده و تطبیق SHA ریموت، گام متوقف می‌شود.**
