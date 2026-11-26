# گزارش آزمون ایزولهٔ مسیر احرازشدهٔ API — `POST /api/attempts` (N1-5.13)

> **شناسهٔ گام:** N1-5.13 · **تاریخ اجرا:** ۱۴۰۵/۸/۸ (۲۰۲۶-۱۰-۳۰) · مخزن: `Sohrab1999/vision-one-backup` · شاخهٔ `main`
> **SHA مبنای گام:** `e551af3110e6d1cca6bc26f4ed9b1e5003dbd8be` (= commit N1-5.12 = `backup/main`؛ درخت پاک)
> **مرجع چک‌لیست:** `نقشه راه ها/نقشه-راه-آزمون-ایزوله-API-attempts-N1-5.13.md` (طبق همان طرح اجرا شد)
> **نتیجهٔ کلی گام:** **آزمون موفق — همهٔ مؤلفه‌ها VERIFIED-PASS، هیچ FAIL و هیچ BLOCKED.** نخستین آزمون مسیر احرازشدهٔ `POST /api/attempts` روی نمونهٔ مستقل: مهمان = 200 + `userId=null` (خط پایهٔ N1-5.11 دقیقاً بازتولید شد)؛ کاربر QA با نشست واقعی = 200 + **`userId == شناسهٔ QA`** + تطبیق ۱۰/۱۰ فیلد؛ کنترل منفی صریح (`total=0`) = 400 بدون نوشتن؛ پایگاه اصلی بایت‌به‌بایت دست‌نخورده (SHA t0=میانه=t2). **معیار پنجم همچنان OPEN؛ فاز ۱ بسته نمی‌شود.**

---

## ۱) نتیجهٔ پیش‌بررسی Git و منابع

- Git: HEAD `e551af3…` = `backup/main` (واگرایی صفر)، درخت پاک، hook = مبنا (`ee679bc1…aed71`)، `.gitignore` فعال؛ سند N1-5.11 و N1-5.12 در HEAD حاضر و خوانده شد؛ روش و اسکریپت‌های همان دو گام بازتولید شد (بدون اختراع روش).
- منابع: available ۱۲۲۸MB در شروع چرخه؛ دیسک ۷٫۳GB؛ پورت ۳۴۵۹ آزاد؛ :3000 = 200 پیش/میانه/پس (فقط پینگ GET؛ هرگز خاموش نشد).

## ۲) شواهد snapshot و ایزوله‌سازی

| لایهٔ شاهد | مقدار ثبت‌شده |
|---|---|
| snapshot سازگار | Python ro backup API (روش 5.5 §B) → `/tmp/n1qa513/custom-qa-attempts.db`؛ integrity ok/ok؛ `journal_mode=delete`؛ نشانگر `run-20261030T015550Z` فقط در کپی |
| نمونهٔ مستقل | کپی سورس whitelist + node_modules کامل (۱٫۱GB — نه symlink) + `.env` → مسیر کپی؛ `next dev -p 3459`، سقف heap env-only 512MB؛ بدون db push/migrate/seed؛ Ready در اولین پروب |
| env فرایندها | لانچر (PID ۱۱۷۹۵) و next-server (PID ۱۱۸۰۹، cwd=appcopy): `DATABASE_URL=file:/tmp/n1qa513/custom-qa-attempts.db` + `NEXTAUTH_URL=http://localhost:3459` + `NEXTAUTH_SECRET` حاضر (فقط شمارش حضور؛ مقدار هرگز چاپ نشد) |
| **فایل‌باز واقعی** | **`open-db-fds=2`** — دو fd باز روی خود فایل کپی در فرایند سروکنندهٔ ۳۴۵۹ (پروب آمادگی `GET /api/attempts?book=vision-one` فقط‌خواندنی و DB-خور، body ثبت نشد) |
| شنوندهٔ پورت | `ss`: `*:3459` = next-server PID ۱۱۸۰۹ — :3000 = فرایند اصلی ۱۱۶۹ |
| اتصال گارد‌دار | verify/cleanup: `GUARD_PASS` + `pragma_database_list` = `[{"seq":0,"name":"main","file":"/tmp/n1qa513/custom-qa-attempts.db"}]` + نشانگر |
| لاگ خود سروکننده | SQL در `server.log`: SELECT/INSERT `main`.`User` (register) و **دو INSERT `main`.`Attempt`** (آزمون‌های A/B) و **بدون INSERT پس از 400** (آزمون C) |
| اثبات منفی مسیر اصلی | dev.log اصلی در بازه: **صفر** `POST /api/attempts` و `/api/auth/callback` و `/api/auth/register` (۵۰۰ خط آخر) |
| SHA-256 اصلی | t0 = میانه = t2 = `0057e27c9a9d5d7d3fbf531aec22ee76c0d6654ecedf465178f7163fcd2bb097` (۱٬۲۳۶٬۹۹۲ بایت) |

- چرخهٔ تک‌فراخوانی در **اولین تلاش** کامل شد (درس N1-5.12: `chmod +x` لانچر پیش‌گیرانه در ابتدای اسکریپت) — هیچ GATE_FAIL و هیچ تلاش مجدد.
- کمینهٔ available مشاهده‌شده: **۹۱۵MB** (بالاتر از قانون سقط ۲۰۰MB).

## ۳) ایجاد کاربر QA و نشست معتبر — بدون افشای Secret

- کاربر QA فقط در کپی و از **endpoint واقعی `POST /api/auth/register`** ساخته شد: `qa_n1513_015550` با PIN تصادفی ۴رقمی ساختگی → **200 `{"ok":true,"id":"cmvubmg8v0000ot41v97h0oiz"}`** — pinHash با همان `hashPin` واقعی (scrypt `salt:hash`) تولید شد؛ بازخوانی گارد‌دار: `QA_USER_FOUND=true`، `PINHASH_FORMAT_OK=true` (فقط تست قالب؛ مقدار چاپ نشد).
- **ورود کاملاً واقعی NextAuth Credentials:** `GET /api/auth/csrf` (200) → `POST /api/auth/callback/credentials` (200، form با csrfToken/username/pin/json=true) → اثبات نشست با `GET /api/auth/session` = `{"user":{"id":"cmvubmg8v0000ot41v97h0oiz","username":"qa_n1513_015550",...},"expires":"2026-11-29T01:56:11.934Z"}` — **id نشست = id رکورد کاربر QA در کپی** ✅.
- بدون JWT جعلی، بدون دورزدن Credentials، بدون دست‌کاری حساب واقعی؛ Secret تصادفی فقط در env نمونهٔ ایزوله؛ کوکی‌ها فقط در jar (perm 600، حذف‌شده در teardown)؛ PIN فقط در حافظهٔ چرخه.

## ۴) نتایج آزمون‌ها A/B/C/D — کد HTTP و شواهد

| # | آزمون | نتیجه | شواهد |
|---|---|---|---|
| R1 | آمادگی + کامپایل مسیر با GET فقط‌خواندنی DB-خور | **VERIFIED-PASS** | `GET /api/attempts?book=vision-one` = 200 (body ثبت نشد) |
| R2 | **ساخت QA از register واقعی + ورود واقعی + اثبات session** | **VERIFIED-PASS** | register 200 {ok,id}؛ callback 200؛ session JSON با id منطبق رکورد کپی |
| R3 | **آزمون A — مهمان** (POST معتبر بدون کوکی؛ name=`qa_n1513_015550_guest`) | **VERIFIED-PASS** | **HTTP 200** + `{"ok":true,"id":"cmvubmgxj0002ot418brlddym"}` (۱۳ms)؛ شمارش گارد‌دار: `ATTEMPT_TOTAL=182 GUEST_NAMED=1 AUTH_NAMED=0`؛ بازخوانی: `userIdNull=true` + book/total/correct/name منطبق — **رفتار مهمان دقیقاً همان خط پایهٔ N1-5.11** (200 + userId=null) |
| R4 | **آزمون B — احرازشده** (همان بدنه با name=`qa_n1513_015550_auth`، با نشست) | **VERIFIED-PASS** | **HTTP 200** + `{"ok":true,"id":"cmvubmh0u0004ot41hmhnuu4c"}` (۱۱ms)؛ `AUTH_ROWS=1`؛ **۱۰/۱۰ فیلد true** شامل **`userIdEqualsQA=true`**، book=vision-one، category=grammar، lesson=1، total=10، correct=7، duration=300، name، detailJson تجزیه‌وتطبیق، createdAt |
| R5 | **آزمون C — کنترل منفی قراردادی با نشست** (`total=0` — رد صریح سطر ۳۱-۳۳ route) | **VERIFIED-PASS** | **HTTP 400** + `{"error":"داده نامعتبر"}` (۵ms)؛ بدون INSERT در لاگ سروکننده؛ Attempt همچنان ۱۸۳ در verify — **اعتبارسنجی حتی برای کاربر احرازشده اعمال می‌شود** |
| R6 | **آزمون D — پاک‌سازی و سلامت** | **VERIFIED-PASS** | `DELETED_ATTEMPTS=2` (فقط دو ردیف نام‌دار همین run) + `DELETED_USER=1` → دقیقاً خط پایه **۳/۲۷/۱۸۱/۱۰**؛ `integrity_check=ok`؛ نشانگر پابرجا |
| R7 | عدم-تخریب اصلی و جمع‌آوری | **VERIFIED-PASS** | SHA t0=میانه=t2؛ teardown فقط PIDهای cwd=appcopy (۱۱۷۹۵/۱۱۸۰۹) → `isolated-stopped`؛ :3000 پس از گام = 200؛ available پایان ۱۲۲۶MB؛ کپی ۱٫۱GB و jarها حذف؛ شواهد ≈۱٫۳MB |

**FAIL: هیچ. BLOCKED: هیچ.** — هیچ POST تکراری انجام نشد: سه درخواست POST با هدف‌های متمایز (A مهمان / B احرازشده / C نامعتبر) — endpoint بدون dedup است و هر سه بدنه متمایز بودند.

## ۵) تعداد رکوردها و تطبیق userId

- خط پایه Attempt کپی = **181** → بعد از A = **182** (مهمان، `userId=null`) → بعد از B = **183** (احرازشده، **`userId = cmvubmg8v0000ot41v97h0oiz` = شناسهٔ QA** ✅) → بعد از C = **183** (بدون نوشتن) → بعد از پاک‌سازی = **181**.
- User: ۳ → **۴** (QA) → ۳ پس از پاک‌سازی. Progress=27 و ReviewState=10 در تمام طول گام خط پایه.
- تفاوت مهمان/احرازشده مشاهده‌شده: **فقط `userId`** (null در برابر شناسهٔ QA) — دقیقاً مطابق سطر ۳۶-۳۷ route؛ سایر رفتارها (اعتبارسنجی، پاسخ، create) یکسان.

## ۶) SHA پایگاه اصلی قبل و بعد

`t0 = میانه = t2 = 0057e27c9a9d5d7d3fbf531aec22ee76c0d6654ecedf465178f7163fcd2bb097` (۱٬۲۳۶٬۹۹۲ بایت) — **بایت‌به‌بایت دست‌نخورده**؛ هم‌راه لاگ منفی صفر روی سرور اصلی و environ صریح فرایندهای ایزوله.

## ۷) پاک‌سازی و سلامت DB کپی‌شده

- پاک‌سازی گارد‌دار فقط داده‌های همین run: دو Attempt نام‌دار (`…_guest`، `…_auth`) و کاربر QA → شمارش‌ها **دقیقاً خط پایه (User=3، Progress=27، Attempt=181، ReviewState=10)**؛ `PRAGMA integrity_check = ok`؛ `_qa_marker = run-20261030T015550Z` پابرجا؛ کپی پاک‌شده (۱٫۲MB) + شواهد در `/tmp/n1qa513/` نگه‌داری شد.

## ۸) مستندات تغییرکرده در مخزن

1. `نقشه راه ها/نقشه-راه-آزمون-ایزوله-API-attempts-N1-5.13.md` (جدید — چک‌لیست)
2. `نقشه راه ها/گزارش-آزمون-ایزوله-API-attempts-N1-5.13.md` (جدید — همین سند)
3. `worklog.md` (فقط الحاق یک ورود)

هیچ کد/Schema/داده/پیکربندی/Git-config تغییر نکرد؛ `roadmap.md` تیک نخورد؛ درخت پس از گام پاک است.

## ۹) Commit و تطبیق ریموت

- Stage فقط سه مسیر فوق؛ `git diff --cached --stat` و `git diff --check` بررسی شد؛ **یک commit مشخص برای N1-5.13**؛ hook خودکار push کرد (بدون push تکراری)؛ `git ls-remote backup refs/heads/main` = HEAD — نتیجه در پیام گفت‌وگویی به مالک اعلام می‌شود (الگوی گام‌های پیشین).

## ۱۰) محدودیت‌ها و آزمون‌های اجرا‌نشده

- **NOT-RUN (خارج از دامنهٔ این گام):** اشباع rate-limit (`attempts:post` 30/60s و login 8/60s)؛ رفتار `name` بلندتر از ۴۰ نویسه (برش — از کد خوانده شد، در اجرا آزمون نشد)؛ مسیرهای پیش‌فرض `category/lesson/duration` و `detail=null` و `book` نامعتبر→vision-one (استنباط کد؛ ارسال نشد)؛ درخواست‌های هم‌زمان؛ صحت‌سنجی دادهٔ `GET /api/attempts` (فقط به‌عنوان پروب آمادگی استفاده شد)؛ رفتار idempotency/duplicate عمدی (به‌صراحت خارج از دامنه — endpoint بدون dedup است).
- **محدودیت‌های ثبت‌شده:** فرایندهای پس‌زمینه بین فراخوانی‌ها کشته می‌شوند → چرخهٔ تک‌فراخوانی الزامی (میراث 5.11/5.12)؛ `sqlite3 CLI` موجود نیست (Python/Node)؛ کپی آزمایشی معادل snapshot است نه DB زندهٔ عملیاتی — موفقیت این گام تأیید محیط عملیاتی/مهاجرت کامل نیست.

## وضعیت معیار پنجم پذیرش فاز ۱ پس از این گام

- مؤلفهٔ NOT-RUN ساختاری ممیزی N1-5.8 «مسیر احرازشدهٔ نوشتن Attempt» اکنون در سطح **HTTP کامل روی کپی ایزوله با نشست واقعی** VERIFIED-PASS است.
- پوشش کامل فعلی لایهٔ داده/ذخیره‌سازی معیار پنجم: Progress (Prisma، 5.5) + Attempt/ReviewState (Prisma، 5.9) + POST /api/attempts مهمان (HTTP، 5.11) + PUT /api/srs احرازشده (HTTP، 5.12) + **POST /api/attempts احرازشده (HTTP، 5.13)** — هر سه مسیر نوشتن مدل‌های Attempt/ReviewState/Progress هم‌اکنون در سطح HTTP پوشش داده شده‌اند.
- **معیار پنجم همچنان OPEN**: جمع‌بندی محیط عملیاتی/مهاجرت و NOT-RUNهای بالا باقی است؛ تصمیم نهایی با مالک؛ فاز ۱ بسته نمی‌شود؛ **N1-5.14 آغاز نمی‌شود.**

> **پایان سند — پس از Commit/Push کنترل‌شده و تطبیق SHA ریموت، گام متوقف می‌شود.**
