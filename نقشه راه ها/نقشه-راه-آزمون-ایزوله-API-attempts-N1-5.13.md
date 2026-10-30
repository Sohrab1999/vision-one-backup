# نقشه راه — آزمون ایزولهٔ مسیر احرازشدهٔ `POST /api/attempts` (N1-5.13)

> **شناسهٔ گام:** N1-5.13 · **تاریخ:** ۱۴۰۵/۸/۸ (۲۰۲۶-۱۰-۳۰) · مخزن: `Sohrab1999/vision-one-backup` · شاخه: `main`
> **SHA مبنای گام:** `e551af3110e6d1cca6bc26f4ed9b1e5003dbd8be` (= commit N1-5.12 = `backup/main`؛ درخت پاک)
> **اصل غیرقابل‌مذاکره:** هیچ درخواست نوشتنی به :3000؛ هیچ تغییری در کد/Schema/داده/پیکربندی مخزن؛ فقط کاربر QA ساختگی در کپی؛ بدون JWT/Cookie/نشست جعلی و بدون دورزدن احراز هویت؛ بدون چاپ Secret/PIN/Cookie/JWT؛ endpoint idempotent نیست → هیچ POST تکراری جز سه آزمون متمایز A/B/C.
> **مراجع:** چک‌لیست و گزارش N1-5.11 (رفتار مهمان) و N1-5.12 (نشست واقعی)؛ روش ایزوله‌سازی N1-5.5 §B؛ قرارداد مسیر `src/app/api/attempts/route.ts` و `src/lib/auth.ts`.

---

## ۰) نتایج پیش‌بررسی (تازه — همگی PASS)

- Git: شاخهٔ `main`، HEAD `e551af3…` = `git ls-remote backup refs/heads/main` (واگرایی صفر)، درخت پاک؛ hook سالم (SHA-256 `ee679bc1…aed71`، ۱۳۹۱ بایت = مبنا)؛ `.gitignore` (dev.log، `.zscripts/dev.pid`، `tool-results/`) فعال؛ سند N1-5.11 و N1-5.12 در HEAD حاضر و خوانده شد.
- منابع: available ۱۲۲۵–۱۲۲۹MB؛ دیسک آزاد ۷٫۳GB؛ پورت ۳۴۵۹ آزاد (صفر شنونده)؛ سرور اصلی :3000 = 200 (next-server PID ۱۱۶۹) — فقط پینگ سلامت GET در کل گام.
- قرارداد `POST /api/attempts` (از کد، تازه): `checkRate("attempts:post", 30/60s)` → **بدون گیت سشن**؛ `book = normalizeBookId(body.book)` (نامعتبر/خالی → `vision-one`)؛ **کنترل منفی صریح سطر ۳۱-۳۳: `!total || total <= 0` → 400 «داده نامعتبر» بدون نوشتن**؛ سشن اختیاری سطر ۳۶-۳۷: `userId = session?.user?.id ?? null` — **تنها تفاوت مهمان/احرازشده همین `userId` است** (اعتبارسنجی یکسان)؛ `db.attempt.create` خالص (بدون dedup — قید یگانگی ندارد طبق N1-5.9) با `category ?? "all"`، `lesson/duration ?? 0`، `name` بریده به ۴۰ نویسه (وگرنه null)، `detail` → `JSON.stringify` (وگرنه null)؛ موفق → **200 `{ok:true, id}`**؛ خطای سرور → 500.
- **حکم امکان‌پذیری:** نشست معتبر از مسیر کاملاً واقعی (register واقعی + ورود واقعی Credentials) روی نمونهٔ ایزوله — همان الگوی اثبات‌شدهٔ N1-5.12 → ادامه.

## ۱) محدودهٔ مجاز (ALLOWED_FILES)

1. `نقشه راه ها/نقشه-راه-آزمون-ایزوله-API-attempts-N1-5.13.md` (این چک‌لیست — جدید)
2. `نقشه راه ها/گزارش-آزمون-ایزوله-API-attempts-N1-5.13.md` (گزارش نهایی — جدید)
3. `worklog.md` (فقط یک ورود الحاقی)

**ممنوع:** تغییر roadmap.md، کد، Schema، `.env`، `.gitignore`، Git config/hook/remote؛ دست‌کاری حساب/دادهٔ واقعی؛ چاپ مقادیر محرمانه؛ JWT جعلی/دورزدن احراز؛ `git add -A/. /-u`، `commit -a`، force-push/reset/clean/stash؛ خاموش/بازراه‌اندازی :3000؛ هر API نوشتنی دیگر (srs و …).

## ۲) گیت‌های ایمنی پیش از آزمون‌های نوشتنی

| # | گیت | روش اثبات | نتیجه |
|---|---|---|---|
| G1 | پایگاه آزمایشی = نسخهٔ مستقل قابل‌بازگشت | ro-snapshot با backup API → `/tmp/n1qa513/custom-qa-attempts.db` + نشانگر `run-20261030T015550Z`؛ integrity ok/ok | PASS |
| G2 | `DATABASE_URL` نمونهٔ آزمایشی صریحاً به همان نسخه | env لانچر (۱۱۷۹۵) + next-server (۱۱۸۰۹) از `/proc/<pid>/environ` + `.env` کپی | PASS |
| G3 | تأیید مستقل مسیر واقعی DB | **`open-db-fds=2`** — دو fd باز روی خود فایل کپی در فرایند سروکنندهٔ ۳۴۵۹ (پروب آمادگی DB-خور طبق الگوی 5.11) + `pragma_database_list` اتصال گارد‌دار = کپی + لاگ SQL خود سروکننده + رؤیت داده از فرایند مستقل | PASS |
| G4 | گارد درون‌اسکریپتی هر فرایند نوشتنی | verify/cleanup: `GUARD_PASS` (env ≠ کپی → `exit 9` پیش از کلاینت)؛ کاربر QA فقط از endpoint واقعی register | PASS |
| G5 | نمونهٔ آزمایشی ≠ پورت ۳۰۰۰ | `-p 3459` + `ss` (شنوندهٔ ۳۴۵۹ = next-server ایزوله) + grep منفی dev.log اصلی = **صفر** `POST /api/attempts` و `/api/auth/*` در ۵۰۰ خط آخر | PASS |
| G6 | مسیرهای پروژه و DB اصلی فقط‌خواندنی | کپی کامل node_modules (۱٫۱GB — نه symlink) + whitelist؛ درخت مخزن پاک پس از گام | PASS |
| G7 | SHA-256 اصلی ثبت (t0/میانه/t2) | `0057e27c…2bb097` — هر سه برابر | PASS |
| G8 | منابع کافی + پایش فعال | سقف heap env-only (512MB)؛ قانون سقط <۲۰۰MB؛ کمینهٔ مشاهده‌شده **۹۱۵MB** | PASS |
| G9 | بدون افشای Secret/توکن | `NEXTAUTH_SECRET` تصادفی زمان‌اجرا (فقط شمارش حضور در environ)؛ PIN تصادفی فقط در حافظهٔ چرخه؛ jarها perm 600 و حذف در teardown؛ pinHash فقط تست قالب | PASS |

**چرخهٔ اجرا:** تک‌فراخوانی کامل (میراث N1-5.11/5.12) — این بار **در همان فراخوانی نخست موفق** (درس بیت +x لانچر از 5.12 پیش‌گیرانه اعمال شد: chmod در ابتدای اسکریپت).

## ۳) طرح اجرای محدود (پس از G1…G9)

1. snapshot سازگار → کپی + نشانگر.
2. کپی پروژه در `/tmp/n1qa513/appcopy` (سورس whitelist + node_modules کامل؛ `.env` → مسیر کپی؛ بدون db push/migrate/seed).
3. شروع نمونه با `next dev -p 3459` + سقف حافظه + `NEXTAUTH_URL` + `NEXTAUTH_SECRET` تصادفی (env-only).
4. آمادگی با **GET فقط‌خواندنی DB-خور** `GET /api/attempts?book=vision-one` (body ثبت نشد — شامل دادهٔ واقعی کپی) → اتصال باز → شواهد fd.
5. شواهد ایزوله (environ/ss/fd/گارد/pragma/SHA/لاگ منفی اصلی).
6. کاربر QA فقط در کپی از **endpoint واقعی register** (`qa_n1513_<ts>`، PIN تصادفی ساختگی) → 200 {ok,id}.
7. ورود واقعی NextAuth (csrf → callback) + اثبات نشست با `GET /api/auth/session` و تطبیق id با رکورد کپی.
8. **آزمون A — مهمان:** POST معتبر بدون کوکی → انتظار 200 {ok,id} و رکورد `userId=null` (خط پایهٔ N1-5.11) + شمارش گارد‌دار (کل=+۱).
9. **آزمون B — احرازشده:** POST معتبر یکتا با نشست → انتظار 200 {ok,id}، دقیقاً یک رکورد، `userId == QA_ID`، تطبیق فیلدها، بازخوانی از اتصال مستقل.
10. **آزمون C — کنترل منفی قراردادی:** POST با نشست و `total=0` (رد صریح سطر ۳۱-۳۳) → انتظار 400 و بدون رکورد جدید.
11. راستی‌آزمایی مستقل گارد‌دار (pragma + نشانگر + کاربر QA + ردیف احرازشده ۱۰ فیلد + ردیف مهمان userIdNull + شمارش‌ها).
12. SHA میانه؛ **پاک‌سازی گارد‌دار فقط دو ردیف نام‌دار همین run + کاربر QA**؛ integrity؛ خط پایه؛ SHA t2؛ teardown هدفمند.

## ۴) شرایط توقف

| # | وضعیت | واکنش |
|---|---|---|
| S513-1 | هر گیت PASS نشود | هیچ آزمون نوشتنی؛ BLOCKED با علت |
| S513-2 | available < ۲۰۰MB | توقف فوری + teardown فقط نمونهٔ ایزوله |
| S513-3 | هر شواهد اتصال به اصلی | توقف فوری، بدون درخواست بیشتر |
| S513-4 | نشست معتبر از مسیر واقعی ممکن نشود | آزمون B/C = BLOCKED؛ فقط A و پاک‌سازی |
| S513-5 | پاسخ 5xx یا رفتار خارج از قرارداد | ثبت FAIL؛ بدون دورزدن |
| S513-6 | کُشتی یا خطای سرور اصلی | گزارش؛ بدون ترمیم خودسرانه |

## ۵) دفتر شواهد (`/tmp/n1qa513/` — خارج از مخزن، ≈۱٫۳MB)

`snapshot.log` · `custom-qa-attempts.db` (کپی پس از پاک‌سازی) · `environ-evidence.txt` · `fd-evidence.txt` (۲ fd) · `port-evidence.txt` · `main-sha-t0.txt` / `main-sha-t2.txt` · `register-response.txt` · `session-proof.txt` · `post-testA-guest.txt` · `post-testB-auth.txt` · `post-testC-negative.txt` · `verify-count-afterA.log` · `verify-full.log` · `cleanup.log` · `server.log` (SQL ثبت User و دو INSERT Attempt) · `run-test-console.log`. اسکریپت‌های گارد‌دار در `/home/z/tmp/n1qa513/`. jarها و PIN و Secret باقی نماندند.

> **پایان سند — roadmap.md تیک نمی‌خورد؛ معیار پنجم تیک نمی‌خورد؛ فاز ۱ بسته نمی‌شود؛ N1-5.14 آغاز نمی‌شود.**
