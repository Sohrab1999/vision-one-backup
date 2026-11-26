# نقشه راه — آزمون ایزولهٔ احرازشدهٔ API مسیر `PUT /api/srs` (N1-5.12)

> **شناسهٔ گام:** N1-5.12 · **تاریخ:** ۱۴۰۵/۸/۸ (۲۰۲۶-۱۰-۳۰) · مخزن: `Sohrab1999/vision-one-backup` · شاخه: `main`
> **SHA مبنای گام:** `4bb5a884f09fd3aee233c057d52b7f52e55b11bf` (= commit N1-5.11 = `backup/main`؛ درخت پاک)
> **اصل غیرقابل‌مذاکره:** هیچ درخواست نوشتنی به :3000؛ هیچ تغییری در کد/Schema/داده/پیکربندی مخزن؛ بدون افشای Secret/Cookie/JWT/PIN در خروجی یا گزارش؛ بدون JWT جعلی یا دورزدن Credentials؛ آزمون فقط پس از برقراری همهٔ گیت‌ها و فقط روی نسخهٔ ایزولهٔ قابل‌بازگشت.
> **مراجع:** گزارش امکان‌سنجی N1-5.10؛ گزارش و چک‌لیست N1-5.11 (چرخهٔ تک‌فراخوانی)؛ روش ایزوله‌سازی N1-5.5 §B و N1-5.9 §C؛ قرارداد مسیر `src/app/api/srs/route.ts` و `src/lib/auth.ts` و `src/app/api/auth/register/route.ts`.

---

## ۰) نتایج پیش‌بررسی (تازه — همگی PASS)

- Git: شاخهٔ `main`، HEAD `4bb5a88…` = `git ls-remote backup refs/heads/main` (واگرایی صفر)، درخت پاک؛ hook سالم (SHA-256 `ee679bc1…aed71`، ۱۳۹۱ بایت = مبنا)؛ `.gitignore:47 dev.log` و قواعد `:57-58` فعال.
- مستندات از مخزن خوانده شد: N1-5.10، N1-5.11 (گزارش + چک‌لیست)، روش 5.5/5.9؛ اسکریپت‌های واقعی N1-5.11 روی دیسک بازخوانی و همان الگو بازتولید شد (بدون اختراع روش جدید).
- منابع: available ۱۲۰۷–۱۲۴۶MB؛ RSS next-server اصلی ≈۲٫۱GB (بزرگ‌ترین فرایند)؛ دیسک آزاد ۷٫۳GB؛ پورت ۳۴۵۸ آزاد (صفر شنونده)؛ node v24.22.1 / Python 3.12.16؛ سرور اصلی :3000 = 200 (زنجیرهٔ PID ۱۱۱۸ → next-server ۱۱۶۹) — در کل گام فقط پینگ سلامت GET.
- قرارداد `PUT /api/srs` (از کد): `checkRate("srs:put", 30/60s)` → **سشن اجباری** (`session?.user?.id` وگرنه **401 «ابتدا وارد شو»**) → body JSON `{states:[…]}` (غیرآرایه = 400؛ >۳۰۰۰ = 413) → اعتبارسنجی سخت هر عضو: `book` از whitelist ۶ جزوه (نامعتبر = skip)، `cardKey` رشتهٔ trim ۱..۱۲۸ (خارج = skip)، `cardType ∈ {word,verb}`، `chapter 0..99`، `ease 1.3..3.5` (پیش‌فرض ۲٫۵)، `interval 0..365`، `reps/lapses/streak 0..99999`، `lastGrade ∈ {0,1,2,null}`، `dueAt` معتبر وگرنه اکنون → upsert تراکنشی تکه‌ای (۶۰تایی) با کلید `userId_book_cardKey` (update فیلدها بدون کلید) → موفق **200 {ok:true, count:len(states)}** (count = تعداد اعضای مجاز، نه ردیف‌ها)؛ خطای سرور = 500.
- قرارداد احراز هویت (از کد): NextAuth v4.24.11 — Credentials با فیلدهای `username`+`pin`؛ `USERNAME_RE ^[a-zA-Z0-9_پ–ی_]{3,20}$`، `PIN_RE ^\d{4}$`؛ rate-limit درون‌حافظه‌ای login 8/60s؛ `db.user.findUnique({username})` + `verifyPin` (scrypt، قالب `salt32hex:hash64hex`، مقایسهٔ زمان‌ثابت)؛ JWT strategy (maxAge ۳۰ روز)؛ secret = `NEXTAUTH_SECRET ?? AUTH_SECRET ?? fallback`؛ callbacks بدون DB؛ کوکی‌های پیش‌فرض v4 روی http (`next-auth.session-token`).
- **حکم امکان‌پذیری:** نشست معتبر از مسیر کاملاً واقعی ممکن است — ساخت کاربر QA فقط در کپی از طریق **همان endpoint واقعی `POST /api/auth/register`** (تولید pinHash با `hashPin` واقعی) و ورود با **جریان واقعی Credentials** (CSRF → callback) روی نمونهٔ ایزوله؛ بدون JWT جعلی و بدون دست‌کاری حساب واقعی.

## ۱) محدودهٔ مجاز (ALLOWED_FILES)

1. `نقشه راه ها/نقشه-راه-آزمون-ایزوله-API-srs-N1-5.12.md` (این چک‌لیست — جدید)
2. `نقشه راه ها/گزارش-آزمون-ایزوله-API-srs-N1-5.12.md` (گزارش نهایی — جدید)
3. `worklog.md` (فقط یک ورود الحاقی)

**ممنوع:** تغییر roadmap.md، کد، Schema، `.env`، `.gitignore`، Git config/hook/remote؛ هر نوشتنی به `db/`، `uploads/`، `qa-shots/`، `tool-results/`، `.zscripts/*`؛ استفاده از حساب/اطلاعات واقعی؛ چاپ هر رمز/توکن/کوکی/JWT/Secret در خروجی یا گزارش؛ JWT جعلی یا دورزدن Credentials؛ `git add -A/. /-u`، `commit -a`، force-push/reset/clean/stash؛ خاموش/بازراه‌اندازی سرور :3000؛ آزمون هر API نوشتنی دیگر.

## ۲) گیت‌های ایمنی پیش از آزمون‌های نوشتنی

| # | گیت | روش اثبات | نتیجه |
|---|---|---|---|
| G1 | پایگاه آزمایشی = نسخهٔ مستقل قابل‌بازگشت | ro-snapshot با backup API → `/tmp/n1qa512/custom-qa-srs.db` + نشانگر `run-20261029T231937Z`؛ integrity ok/ok | PASS |
| G2 | `DATABASE_URL` نمونهٔ آزمایشی صریحاً به همان نسخه | env لانچر + `.env` کپی + `/proc/<pid>/environ` هر دو فرایند (لانچر ۱۰۴۷۴ و next-server ۱۰۴۸۸) | PASS |
| G3 | تأیید مستقل مسیر واقعی DB | `pragma_database_list` از اتصال گارد‌دار دوم = کپی + لاگ `prisma:query` خود فرایند سروکننده (INSERT/upsert روی `main`.`ReviewState`) + رؤیت نهایی رکورد در کپی از فرایند مستقل | PASS* |
| G4 | گارد درون‌اسکریپتی هر فرایند نوشتنی | `guard.js` (verify/cleanup): env ≠ مسیر کپی → `exit 9` پیش از ساخت کلاینت = GUARD_PASS؛ کاربر QA فقط از endpoint واقعی register روی نمونهٔ ایزوله ساخته شد | PASS |
| G5 | نمونهٔ آزمایشی ≠ پورت ۳۰۰۰ | `-p 3458` + `ss` (شنوندهٔ ۳۴۵۸ = next-server ایزوله ۱۰۴۸۸) + grep منفی dev.log اصلی (صفر `PUT /api/srs` و `/api/auth/*` در ۵۰۰ خط آخر) | PASS |
| G6 | مسیرهای پروژه و DB اصلی فقط‌خواندنی | کپی کامل node_modules (۱٫۱GB — نه symlink) + سورس whitelist؛ صفر نوشتن به مخزن (درخت پاک پس از گام)؛ SHA اصلی ثبت و مقایسه | PASS |
| G7 | SHA-256 اصلی پیش از آزمون ثبت | `0057e27c…2bb097` (t0)؛ میانه = t2 = همان | PASS |
| G8 | منابع کافی + پایش فعال | سقف heap نمونهٔ ایزوله env-only (512MB)؛ قانون سقط <۲۰۰MB؛ کمینهٔ مشاهده‌شده ۹۱۷MB | PASS |
| G9 | بدون افشای Secret/توکن | `NEXTAUTH_SECRET` تصادفی ۶۴-nib در زمان اجرا — فقط حضورش در environ شمرده شد (مقدار هرگز چاپ نشد)؛ PIN تصادفی ساختگی فقط در حافظهٔ چرخه؛ کوکی‌ها فقط در jar (perm 600) که در teardown حذف شد؛ pinHash فقط با تست قالب | PASS |

\* نکتهٔ شفاف G3: کاوش fd در پنجرهٔ شواهد = صفر fd باز (پروب آمادگی `/api/auth/session` به DB دست نمی‌زند و اتصال هنوز باز نشده بود) → لایهٔ fd به‌صورت **NOT-OBSERVED** ثبت شد و بار اثبات روی environ فرایند سروکننده + لاگ SQL خود آن + رؤیت داده از فرایند مستقل + SHAها منتقل شد.

**چرخهٔ اجرا:** الگوی محیطی N1-5.11 (sandbox فرایندهای پس‌زمینه را بین فراخوانی‌ها می‌کشد) → **چرخهٔ کامل در یک فراخوانی واحد**. تلاش اول فراخوانی (۲۳:۱۷) در گیت راه‌اندازی متوقف شد: «Permission denied» روی لانچر (فایل ساخته‌شده بدون بیت +x) — مسیر تمیز GATE_FAIL: هیچ سروری شروع نشد، هیچ نوشتنی رخ نداد، teardown اجرا شد؛ پس از chmod +x، فراخوانی دوم (۲۳:۱۹) کامل و موفق بود (t0 هر دو یکسان).

## ۳) طرح اجرای محدود (پس از G1…G9)

1. snapshot سازگار (روش مستند 5.5/5.9/5.11) → کپی + نشانگر.
2. کپی پروژه در `/tmp/n1qa512/appcopy` (سورس whitelist + node_modules کامل؛ `.env` کپی → مسیر کپی؛ دایره‌های خالی؛ بدون db push/migrate/seed).
3. شروع نمونه با `next dev -p 3458` + سقف حافظه + `NEXT_TELEMETRY_DISABLED=1` + `NEXTAUTH_URL=http://localhost:3458` + `NEXTAUTH_SECRET` تصادفی (env-only، هرگز چاپ‌نشده).
4. آمادگی با **GET `/api/auth/session` فقط‌خواندنی** (بدون کوکی).
5. شواهد ایزوله (environ/ss/گارد/pragma/SHA/لاگ منفی اصلی).
6. **ساخت کاربر QA فقط در کپی از endpoint واقعی register** (نام `qa_n1512_<ts>`، PIN تصادفی ۴رقمی ساختگی — هرگز چاپ‌نشده) → 200 {ok,id}.
7. **ورود واقعی NextAuth**: GET `/api/auth/csrf` → POST `/api/auth/callback/credentials` (form: csrfToken/username/pin/json=true) → اثبات نشست با GET `/api/auth/session` (بدون چاپ توکن/کوکی) → GET `/api/srs` فقط‌خواندنی با نشست.
8. **آزمون A** — PUT بدون کوکی با body معتبر → انتظار 401 و بدون نوشتن.
9. **آزمون B** — PUT با نشست، `cardKey` یکتا → انتظار 200 {ok,count:1}؛ شمارش گارد‌دار کلید = ۱.
10. **آزمون C** — همان `userId+book+cardKey` با مقادیر معتبر متغیر → انتظار 200 count:1 و همچنان یک ردیف با مقادیر جدید.
11. **کنترل منفی قراردادی** — `book` نامعتبر → انتظار 200 {ok,count:0} بدون نوشتن (skip طبق سطر ۱۲۳ route).
12. راستی‌آزمایی مستقل گارد‌دار (pragma + نشانگر + کاربر QA + قالب pinHash + ۱۳ بررسی فیلد + شمارش‌ها).
13. SHA اصلی میانه؛ **پاک‌سازی گارد‌دار فقط کاربر QA و ردیف‌هایش**؛ integrity؛ بازگشت شمارش‌ها به خط پایه.
14. SHA اصلی t2؛ teardown هدفمند فقط فرایندهای cwd=appcopy؛ حذف کپی حجیم و jarها؛ نگه‌داری شواهد (≈۱٫۳MB).

## ۴) شرایط توقف

| # | وضعیت | واکنش |
|---|---|---|
| S512-1 | هر گیت PASS نشود | هیچ آزمون نوشتنی؛ BLOCKED با علت |
| S512-2 | available < ۲۰۰MB | توقف فوری + teardown فقط نمونهٔ ایزوله + گزارش |
| S512-3 | هر شواهد اتصال به اصلی (environ/pragma/SHA/لاگ) | توقف فوری، بدون درخواست بیشتر |
| S512-4 | ساخت نشست معتبر ممکن نشود | فقط آزمون A؛ B/C = BLOCKED؛ گزارش صادقانه |
| S512-5 | پاسخ 5xx یا رفتار خارج از قرارداد | ثبت FAIL؛ بدون دورزدن؛ SHA اصلی |
| S512-6 | کُشتی یا خطای سرور اصلی | گزارش؛ بدون ترمیم خودسرانه |

## ۵) دفتر شواهد (`/tmp/n1qa512/` — خارج از مخزن، ≈۱٫۳MB)

`snapshot.log` · `custom-qa-srs.db` (کپی پس از پاک‌سازی) · `environ-evidence.txt` · `fd-evidence.txt` (خالی — NOT-OBSERVED، ثبت شفاف) · `port-evidence.txt` · `main-sha-t0.txt` / `main-sha-t2.txt` · `register-response.txt` · `session-proof.txt` · `get-srs-readonly.txt` · `put-testA-no-session.txt` · `put-testB-insert.txt` · `put-testC-upsert.txt` · `put-neg-invalid-book.txt` · `verify-count-afterB.log` · `verify-full.log` · `cleanup.log` · `server.log` (لاگ نمونهٔ ایزوله با SQL upsert) · `run-test-console.log`. اسکریپت‌های گارد‌دار در `/home/z/tmp/n1qa512/`. jarهای کوکی و PIN و Secret در هیچ فایلی باقی نماندند.

> **پایان سند — roadmap.md تیک نمی‌خورد؛ معیار پنجم تیک نمی‌خورد؛ فاز ۱ بسته نمی‌شود؛ هیچ گام دیگری آغاز نمی‌شود.**
