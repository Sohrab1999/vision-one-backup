# نقشه راه Refactoring — Audit جامع کدبیس (نسخه ۱٫۰)

> تاریخ: ۱۲ اکتبر ۲۰۲۶ (۲۱ آبان ۱۴۰۵) · محدوده: src/ + mini-services/ · خط مبنای: ~۹۰k خط سورس پروژه (بدون node_modules)
> روش: شمارش خطوط، ردیابی import، تحلیل ساختار کامپوننت‌ها، بررسی dev.log (perf vitals)، بازبینی امنیتی APIها

---

## خلاصه اجرایی

| سنجه | مقدار | ارزیابی |
|---|---|---|
| فایل بزرگ‌تر سورس | `fps-shooter-game.tsx` = **۴۳۰۴ خط** | 🔴 God component |
| کد مرده | ۱۷ فایل دادهٔ ریشهٔ `src/data/*.ts` = **۹۰۷۹ خط، صفر import** | 🔴 حذف فوری |
| LCP (perf-vitals در dev.log) | ۱۹–۲۵ ثانیه گزارش‌شده | 🔴 خارج بودجه (باندل اولیه + تورم dev) |
| CLS | ۰٫۳۷–۰٫۳۹ | 🟠 بالای آستانهٔ ۰٫۲۵ |
| تایپ | strict ✓ ولی `noImplicitAny:false` + `ignoreBuildErrors:true` | 🟠 دروازهٔ کیفیت نیمه‌باز |
| امنیت | scrypt + rate-limit + validation + هدرها ✓ | 🟢 سالم |
| تکرار DRY | faNum×۹، pick×۸، saveAttempt×۷، scopeOf×۲ | 🟠 |
| artifacts ریپو | ~۱۰۰ png در ریشه + tool-results/ + bak/backup | 🟡 |

---

## یافته‌های تفصیلی (فایل / مشکل / شدت / راه‌حل / الگو / ماژولارسازی / اثر)

### Y1 — کد مردهٔ عظیم: دادهٔ ریشهٔ src/data
- **فایل:** `src/data/{dictionary,vocab,quiz-seed,readings,conversations,grammar,questions-vocab,questions-vocab-2,questions-vocab-3,questions-grammar-lessons,questions-grammar-comprehensive,book-meta,irregular-verbs,vocab-lesson-1..4}.ts`
- **مشکل:** ۹۰۷۹ خط کپیٔ قدیمی دادهٔ «ویژن وان» از پیش از refactor چندجزوه‌ای؛ ردیابی import نشان داد **صفر import مطلق** — همهٔ مصرف‌کننده‌ها فقط `import type` از `@/data/types` می‌گیرند و دادهٔ واقعی از `books/registry → ../vision-one` می‌آید. `vocab-junior.ts` هم ترانزیتیو مرده است (فقط توسط vocab.tsِ مرده import می‌شود).
- **شدت:** 🔴 High
- **راه‌حل:** حذف ۱۷ فایل ریشه (نگه‌داشتن `types.ts` و `whats-new.ts`) + ران `bun run lint` و یک QA دود ساده.
- **الگو:** Single Source of Truth؛ داده فقط از طریق registry لود شود.
- **ماژولارسازی:** بعد از حذف، `src/data/` فقط شامل: `types.ts` (قرارداد)، `whats-new.ts`، `books/`، `vision-one/`، `grade-*/` می‌شود.
- **اثر:** −۹۰۷۹ خط، حذف ابهام «کدام کپی معتبر است»، جلوگیری از ویرایش در نسخهٔ اشتباه (ریسک واقعی برای توسعهٔ آینده). صفر اثر ران‌تایم.

### Y2 — God component شوتر: fps-shooter-game.tsx (۴۳۰۴ خط)
- **فایل:** `src/components/book/games/fps-shooter-game.tsx`
- **مشکل:** ۸ مسئولیت در یک فایل: دادهٔ نقشه‌ها (MAPS + LAYOUTS ≈ ۴۰۰ خط)، سلاح‌ها (WEAPONS)، موتور فیزیک/برخورد (stepPlayer/resolveWorld/applyRig/applyScope)، ۱۵ کامپوننت صحنهٔ R3F (World/Arena/FieldProps/Target/GoldenTarget/Burst/ViewModel/TouchJoystick/StarField/SkyOrb/CloudDrift/Rig/FovTune/DecoShape)، HUD، پنل گزینه‌ها، ورودی کیبورد+لمس+موس، persistence (۶ کلید localStorage). کامپوننت اصلی از خط ۲۲۷۰: ۳۳ useState + ۸۲ useRef + ۳۱ useEffect + ۵۱ memo/callback.
- **شدت:** 🔴 High
- **راه‌حل:** تفکیک بدون تغییر رفتار (refactor مکانیکی، هر گام با QA مرورگریِ موجود در worklog تکرار شود).
- **الگو:** Composition + Separation of Concerns؛ container/presentational؛ data-module جدا از engine.
- **ماژولارسازی (ساختار پیشنهادی):**
  ```
  src/components/book/games/fps/
    index.tsx        ← FpsShooterGame (ارکستراسیون، ~۶۰۰ خط)
    constants.ts     ← ثابت‌های بازی (LANE_X, WEAPONS tuning, keys)
    maps.ts          ← MAPS (پالت/آسمان/مه)
    layouts.ts       ← StructureKind + LAYOUTS + resolveWorld داده
    weapons.ts       ← WeaponConfig + WEAPONS
    physics.ts       ← stepPlayer, resolveWorld, applyRig, applyScope, applyFov (توابع ماژول‌سطح موجود — فقط جابه‌جایی)
    prefs.ts         ← loadPrefNum با گارد null + کلیدهای visionone:game-pref:fps-*
    scene/
      world.tsx      ← World/Arena/FieldProps/DecoShape
      targets.tsx    ← Target/GoldenTarget/Burst
      viewmodel.tsx  ← ViewModel سه سلاح
      sky.tsx        ← StarField/SkyOrb/CloudDrift
      input.tsx      ← TouchJoystick + effectهای کیبورد/موس
    hud.tsx          ← چیپ‌های درون‌قاب + اورلی توقف
  ```
- **اثر:**Maintainability ↑↑ (ادامهٔ فازهای T2/F10 روی فایل‌های ۲۰۰–۴۰۰خطی)، code-review ممکن، ریسک merge صفر می‌شود؛ Performance بی‌تغییر (همه در یک chunk ثابت می‌مانند چون dynamic import سر جای خود است).

### Y3 — باندل اولیهٔ سنگین: page.tsx همهٔ نماها را استاتیک import می‌کند
- **فایل:** `src/app/page.tsx` (+ `app-header.tsx`)
- **مشکل:** ~۲۲ view (Tutor/Stats/Rewards/Speaking/Class/Notebook/Dictionary/…) همگی استاتیک import شده‌اند؛ فقط بازی‌ها dynamic هستند. LCP گزارش‌شده در perf-vitals تا ۲۵s (سهم dev-compile بالاست ولی ریشهٔ ساختاری همین است) و CLS ۰٫۳۹.
- **شدت:** 🔴 High
- **راه‌حل:** تبدیل نماها به `next/dynamic` با skeleton (الگوی موجود `GameChunkLoading`) + prefetch نمای بعدی محتمل در idle.
- **الگو:** Route-level code splitting در SPA تک‌مسیره = view-level chunking.
- **اثر:** باندل اولیهٔ JS به‌طور برآوردی ۳۰–۵۰٪ کم می‌شود؛ LCP/INP واقعی بهبود محسوس روی موبایل.

### Y4 — تکرار منطق بین بازی‌ها (DRY)
- **فایل‌ها:** ۱۷ بازی در `src/components/book/games/`
- **مشکل:** `faNum` در ۹ فایل بازتعریف شده؛ `pick` در ~۸ بازی (در حالی که `shared.ts` همین حالا `pickUnique` دارد)؛ `saveAttempt` محلی در ۷ بازی؛ `scopeOf` در fps + speed-quiz؛ هر بازی طرح «رکورد per-scope + plays + wins» را خودش نوشته.
- **شدت:** 🟠 Medium
- **راه‌حل:** جمع‌کردن در `shared.ts` (+ یک `useGameRecords(bookId, game, scope)` hook) — مهاجرت بازی‌به‌بازی در PRهای کوچک.
- **الگو:** DRY + Custom Hook extraction.
- **اثر:** ~۵۰۰–۸۰۰ خط حذف؛ رفع باگ (مثل گارد `null` در loadPrefNum) یک‌بار برای همهٔ بازی‌ها اعمال می‌شود.

### Y5 — دروازهٔ کیفیت نیمه‌باز
- **فایل:** `next.config.ts`، `tsconfig.json`، `eslint.config.mjs`
- **مشکل:** `typescript.ignoreBuildErrors: true` یعنی build حتی با خطای TS سبز می‌شود؛ `noImplicitAny: false`؛ eslint قواعد `no-unused-vars` و `exhaustive-deps` را خاموش کرده. الان کد تمیز است (فقط ۱ مورد any) ولی این قفل‌ها رگرسیون آینده را مخفی می‌کنند.
- **شدت:** 🟠 Medium
- **راه‌حل:** مرحله‌ای: (۱) `ignoreBuildErrors:false` چون tsc فعلاً صفر است، (۲) فعال‌کردن `no-unused-vars` (warning)، (۳) `noImplicitAny:true`.
- **الگو:** Quality Gates / Fail Fast.
- **اثر:** جلوگیری از بازگشت به وضعیت «۱۶ ارور»؛ اطمینان از سلامت build در CI/Audit‌های بعدی.

### Y6 — prefetch انبوه چانک‌های بازی
- **فایل:** `src/components/book/games/games-hub.tsx` (خط ~۳۰۸)
- **مشکل:** با باز شدن هاب، ۱۵ چانک بازی (از جمله three.js شوتر ~۶۰۰KB) هم‌زمان در idle fetch می‌شوند — روی موبایل ضعیف با رندر اول هاب رقابت می‌کند (INP/LCP).
- **شدت:** 🟠 Medium
- **راه‌حل:** صف prefetch ترتیبی با محدودیت (۲–۳ چانک در هر idle) یا prefetch بر اساس «۳ بازی اخیر کاربر» (کلید موجود در localStorage).
- **الگو:** Budgeted prefetch / Prioritized loading.
- **اثر:** بهبود INP هاب روی موبایل؛ مصرف دادهٔ کمتر.

### Y7 — CLS ۰٫۳۹: پرش چیدمان
- **فایل:** نمای‌ها با اسکلت/دیالوگ (`BookDataLoading`، `WhatsNewDialog`، هدر با وضعیت ورود)
- **مشکل:** جایگزینی اسکلت↔محتوا با ارتفاع متفاوت + باز شدن دیالوگ‌ها → shift.
- **شدت:** 🟠 Medium
- **راه‌حل:** رزرو ارتفاع (min-h) برای نماها هنگام لود داده؛ `size` ثابت برای دیالوگ‌ها؛ `font-display: swap` با fallback متریک.
- **الگو:** Layout stability (reserve space).
- **اثر:** CLS به زیر ۰٫۱؛ حس نرم‌تر در موبایل.

### Y8 — بهداشت ریپو و artifacts
- **فایل:** ریشهٔ پروژه
- **مشکل:** ~۱۰۰ اسکرین‌شات `qa-*.png` و `tool-results/` (صدها فایل QA) داخل ریپو، `dev.log.g4-backup`، `docs/*.bak`، `mini-services/duel-service/node_modules` در ریپو.
- **شدت:** 🟡 Low
- **راه‌حل:** انتقال artifacts به `qa-archive/2026-10/` یا حذف؛ gitignore برای tool-results و node_modules سرویس‌ها.
- **الگو:** Repo hygiene.
- **اثر:** clone/جست‌وجوی سریع‌تر؛ کاهش نویز در audit‌های آینده.

### Y9 — کلاس مجازی: state حافظه‌ای سرور
- **فایل:** `src/app/api/class/_lib/state.ts` (۲۵۹ خط) + `db`
- **مشکل:** برخی وضعیت‌های live کلاس در حافظهٔ فرآیند نگه‌داری می‌شود؛ ری‌استارت سرور (که در این سندباکس بارها رخ داده — OOM) جلسات زنده را می‌بُرد.
- **شدت:** 🟡 Low (تک‌کاربر/دمو) — 🟠 اگر چندنفره شود
- **راه‌حل:** انتقال وضعیت‌های بحرانی live به جدول DB (الگوی موجود Attempt) یا به duel-service (پورت ۳۰۰۳) که همین نقش را دارد.
- **الگو:** Statelessness در API + مالکیت state در سرویس realtime.
- **اثر:** مقاومت به ری‌استارت؛ سازگاری با آیندهٔ چندنفره.

### Y10 — الگوی نانوشتهٔ bridge و قواعد react-hooks v6
- **فایل:** `fps-shooter-game.tsx` (و آیندهٔ adventure-map)
- **مشکل:** الگوی «جهش فقط در تابع ماژول‌سطح» (stepPlayer/applyRig/applyFov) در طول ۱۲ فاز به‌صورت تجربی کشف و ۵ بار خطای lint برای آن رفع شده — هیچ‌جا مستند نیست؛ هر توسعه‌دهنده/ایجنت جدید دوباره به آن برخورد می‌کند.
- **شدت:** 🟡 Low
- **راه‌حل:** یک `docs/adr/ADR-001-fps-bridge-pattern.md` + README کوتاه داخل `games/fps/` + کامنت سرخرِ stepPlayer.
- **الگو:** ADR (Architecture Decision Record) + Knowledge sharing.
- **اثر:** سرعت توسعهٔ فازهای آیندهٔ FPS ×۲؛ جلوگیری از تکرار خطاهای lint.

---

## نقشه راه Refactoring — رتبه‌بندی اجرایی (۱ تا ۱۰)

> **وضعیت اجرا (به‌روزرسانی ۱۲ اکتبر ۲۰۲۶ — اسپرینت ۱، ۲ و ۳ بسته شد؛ گام ۷ نیز تکمیل شد):**
> - ✅ **گام ۱ انجام شد** — ۱۸ فایل مردهٔ ریشه حذف شد (۹۰۷۹ خط؛ `vocab-junior` هم ترانزیتیو مرده بود). `src/data` اکنون فقط `types.ts` + `whats-new.ts` + پوشه‌های کتاب.
> - ✅ **گام ۵ انجام شد** — `ignoreBuildErrors:false` در next.config + tsconfig اکنون فقط `src/**` را چک می‌کند. + **ادامه در اسپرینت ۳**: `@typescript-eslint/no-unused-vars` به «warn» ارتقا یافت و ۱۹ unused import از ۱۱ فایل پاک شد (۴۰→۲۱ warning؛ باقی‌مانده semantic است)؛ tool-results/qa-archive/mini-services/scripts به ignores eslint اضافه شدند. `tsc --noEmit` = ۰ خطا.
> - ✅ **گام ۸ انجام شد** — ۳۶ اسکرین‌شات ریشه + `dev.log.g4-backup` به `qa-archive/2026-10/` منتقل شد؛ `fps-revolution-roadmap.v1.bak` حذف شد.
> - ✅ **گام ۲ انجام شد** — ۱۹ نمای `page.tsx` به `next/dynamic` با اسکلت `min-h-[55vh]` منتقل شد (فقط بوت‌پث eager ماند). QA: Home/هاب/شوتر هر سه چانک داینامیک بی‌خطا رندر شدند.
> - ✅ **گام ۶ انجام شد** — prefetch هاب به صف بودجه‌دار تبدیل شد (۲ چانک در هر تیک idle + فاصلهٔ ۹۰۰ms؛ سبک‌ها اول، شوتر آخر).
> - ✅ **گام ۳ انجام شد (اسپرینت ۳)** — god component ۴۳۰۴خطی به پوشه `games/fps/` تفکیک شد: `index.tsx` (۲۳۳۸خط — فقط کامپوننت اصلی) + `constants/maps/layouts/weapons/prefs/types/helpers/textures/questions/physics` + `scene/{camera,viewmodel,sky,world,targets,input}` (۱۶ فایل، همه <۳۴۰خط). QA مرورگری کامل: setup چهار نقشه ✓ شروع مأموریت + صحنه ✓ چرخهٔ تا ResultScreen با کارت رتبهٔ D ✓ `game_session_end + POST /api/attempts 200` ✓ صفر خطای کنسول.
> - ✅ **گام ۴ انجام شد (اسپرینت ۳ — با یافتهٔ بازبینی)** — بازبینی نشان داد ادعای audit (faNum×۹/pick×۸/saveAttempt×۷ تعریف محلی) از قبل همگرا شده بود: **صفر تعریف محلی** باقی مانده بود؛ فقط `fmtTime` تکراری (fps/helpers در برابر shared) حذف شد → import از shared. `scopeOf` سرعت‌کوییز هم‌نام ولی معنای متفاوت (درس:دسته:زمان) — تعمداً دست‌نخورده. hook رکوردها ساخته نشد تا کد مردهٔ جدید ایجاد نشود (YAGNI) — در صورت نیاز واقعی در فاز بازی جدید ساخته می‌شود.
> - ✅ **گام ۱۰ انجام شد (اسپرینت ۳)** — `docs/adr/ADR-001-fps-bridge-pattern.md` (الگوی جهش bridge در توابع ماژول‌سطح) + `games/fps/README.md` (نقشهٔ ماژول + قراردادهای ثابت + چک‌لیست توسعه) نوشته شد.
> - 🟡 **گام ۷ نیمه‌انجام بود → ✅ تکمیل شد (۱۲ اکتبر ۲۰۲۶)** — علاوه بر اسکلت‌های رزروشده، **فونت Vazirmatn خودمیزبان شد**: `@import` رندربلاک‌کنندهٔ Google Fonts حذف؛ فایل متغیر woff2 (۱۱۱KB) در `public/fonts/` با `@font-face` + `font-display: swap` + `<link rel=preload>`؛ فالبک متریک‌تنظیم‌شده («Vazirmatn Fallback» با ascent-override 102.539% / descent-override 53.711% استخراج‌شده از متیریک واقعی فایل با fontTools) برای خنثی‌کردن پرش خطوط در پنجرهٔ swap؛ نام خانواده عمداً «Vazirmatn» ماند تا canvas کارت‌های اشتراک (result-share/progress-card) نشکند. QA: صفر درخواست شخص ثالث فونت، cls=0 در هر دو لود، INP=48ms، golden path (قفسه→خانه→هاب ۱۵ کارت→setup شوتر) صفر خطای کنسول. نکتهٔ عملیاتی: Turbopack cache بعد از تغییر globals.css کهنه ماند — پاک‌سازی کامل `.next` لازم بود.
> - ⏳ گام ۹ (state کلاس → DB/duel-service) اختیاری — فقط وقتی کلاس مجازی چندنفره جدی شد.

| # | اقدام | فایل/محدوده | شدت | تلاش | الگوی معماری | سود اصلی |
|---|---|---|---|---|---|---|
| **۱** | **حذف کد مردهٔ دادهٔ ریشه** (۱۷ فایل / ۹۰۷۹ خط) | `src/data/*.ts` | 🔴 | ~۳۰د | Single Source of Truth | حذف ابهام + −۹k خط، صفر ریسک |
| **۲** | **داینامیک‌کردن نماها در page.tsx** (+ skeleton رزروشده) | `src/app/page.tsx` | 🔴 | ~۲س | View-level chunking | −۳۰..۵۰٪ باندل اولیه، LCP/CLS |
| **۳** | **تفکیک god component شوتر** به ۱۰ ماژول (`games/fps/…`) — refactor مکانیکی با QA بعد از هر جابه‌جایی | `fps-shooter-game.tsx` | 🔴 | ~۴س | SoC + Composition | ادامهٔ فازها روی فایل‌های کوچک |
| **۴** | **یکجا کردن faNum / pick / saveAttempt / scopeOf** در shared.ts + hook رکوردها | ۱۷ بازی | 🟠 | ~۳س | DRY + Custom Hook | −~۷۰۰ خط، باگ‌فیکس یک‌جا |
| **۵** | **بستن دروازهٔ کیفیت**: `ignoreBuildErrors:false` → فعال‌سازی تدریجی `no-unused-vars` → `noImplicitAny:true` | configها | 🟠 | ~۱س | Fail Fast | جلوگیری از بازگشت «۱۶ ارور» |
| **۶** | **prefetch بودجه‌دار بازی‌ها** (صف ۲–۳تایی / مبتنی بر سابقهٔ کاربر) | `games-hub.tsx` | 🟠 | ~۱س | Budgeted prefetch | INP موبایل، دادهٔ کمتر |
| **۷** | ~~**ثبات چیدمان (CLS)**~~ ✅ تکمیل شد: min-h نماها + فونت خودمیزبان با فالبک متریک | نماها | 🟠→🟢 | ~۲س | Reserve space | CLS → <۰٫۱ (اندازه‌گیری: ۰) |
| **۸** | **پاک‌سازی artifacts**: انتقال/حذف png و tool-results و bak؛ gitignore سرویس‌ها | ریشهٔ ریپو | 🟡 | ~۳۰د | Repo hygiene | clone/جست‌وجوی سریع |
| **۹** | **انتقال state زندهٔ کلاس به DB یا duel-service** | `api/class/_lib` | 🟡 | ~۳س | Statelessness | مقاوم به ری‌استارت |
| **۱۰** | **مستندسازی الگوی bridge + ADR-001** (+ README بازی‌ها) | docs/ + fps/ | 🟡 | ~۱س | ADR / Knowledge sharing | توسعهٔ FPS سریع‌تر |

### ترتیب پیشنهادی اجرا
- **اسپرینت ۱ (سود فوری، ریسک صفر):** گام ۱ + ۵ + ۸ — پروژه سبک‌تر و دروازهٔ کیفیت بسته می‌شود.
- **اسپرینت ۲ (پرفورمنس کاربرمحور):** گام ۲ + ۶ + ۷ — اعداد LCP/CLS/INP واقعی با perf-reporter موجود قبل/بعد مقایسه شود.
- **اسپرینت ۳ (بدهی ساختاری):** گام ۳ (شوتر) → ۴ (بازی‌ها) → ۱۰ — هر گام با QA مرورگریِ استاندارد worklog (صفر خطای کنسول + lint 0 + tsc 0) بسته شود.
- **اختیاری/به‌هنگام:** گام ۹ فقط وقتی کلاس مجازی چندنفره جدی شد.

### معیار پذیرش هر گام
- `bun run lint` = ۰ خطا و `tsc --noEmit` روی src = ۰ خطا
- QA مرورگری فلوی اصلی (shelf → home → games → fps) بدون خطای کنسول
- بعد از گام ۲/۶/۷: مقایسهٔ vitals از `/api/client-log` (هدف: CLS<۰٫۱)
- بعد از گام ۳: رفتار FPS عیناً قبلی (تست QA ده‌مرحله‌ای موجود در worklog: setup/نقشه/شلیک/خشاب/موج/HVT/نتیجه)

---
*این سند مکمل `docs/fps-roadmap.md` (نسخه ۲٫۴ — نقشهٔ محصولی شوتر) و `roadmap.md` (نقشهٔ جامع اپ) است: آن سندها «چه چیزی بسازیم»، این سند «چگونه سالم بزرگ بمانیم» را پوشش می‌دهد.*

> **➡️ جانشین:** Audit دوم (پس از بسته‌شدن همین ۹ گام) در **`docs/refactor-roadmap-2.md`** ثبت شد — یافته‌های تازه (وابستگی‌های مرده، god componentهای دستهٔ دوم، بازتورم fps/index) + نقشهٔ رتبه‌بندی‌شدهٔ جدید ۱..۱۰.
