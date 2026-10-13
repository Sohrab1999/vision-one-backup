# نقشه راه Refactoring — Audit دوم (نسخهٔ ۱.۰)

> تاریخ: ۱۴۰۵-۰۸-۲۲ (۱۳ اکتبر ۲۰۲۶) · محدوده: src/ + mini-services/ · خط مبنای: **۸۸,۹۳۰ خط** src
> پیش‌زمینه: Audit اول (AUDIT-1) ۱۰ یافته داشت؛ ۹/۹ گام عملیاتی آن بسته شد (REFACTOR-1..3). این سند وضعیت **پس از آن** را می‌سنجد — هم بدهیِ باقی‌مانده و هم بدهیِ تازه‌ای که رشد محصول (F10 و…) ساخته است.
> روش: شمارش خطوط، ردیابی import، پایش وابستگی‌ها در برابر مصرف واقعی، اسکن امنیتی، vitals در dev.log، سرشماری hookها و پذیرش کیت بازی‌ها

---

## خلاصه اجرایی

| سنجه | مقدار | ارزیابی |
|---|---|---|
| صفر خطای تایپ / lint | tsc=۰ · lint=۰ خطا (۲۱ warning) | 🟢 |
| LCP / CLS / INP (لود تمیز) | ۲٫۴–۴٫۲s · **۰** · ۴۸–۵۶ms | 🟢 (اسپایک CLS فقط در HMR دِو — پایش در build واقعی) |
| بزرگ‌ترین کامپوننت | `fps/index.tsx` = **۲,۴۳۸ خط** (بازتورم پس از F10) | 🟠 روند صعودی |
| دستهٔ دوم god component | ۷ بازی ۱,۳۰۰–۱,۷۸۶ خط (adventure-map, quiz-game, …) | 🟠 |
| وابستگی مرده | **۱۳ پکیج صفر-consumption** از ۷۰ | 🟡 |
| امنیت | بدون secret/eval؛ `dangerouslySetInnerHTML` فقط CSS ثابت؛ ۱۹/۳۷ روت rate-limit | 🟢 |
| `any` صریح در src | ۱ مورد | 🟢 |
| دروازهٔ کیفیت | `ignoreBuildErrors:false` ✓ ولی `noImplicitAny:false` + ۲۱ unused-vars | 🟠 نیمه‌باز |

---

## یافته‌های تفصیلی (فایل / مشکل / شدت / راه‌حل / الگو / ماژولارسازی / اثر)

### A1 — وابستگی‌های مرده: ۱۳ پکیج بدون هیچ import
- **فایل:** `package.json`
- **مشکل:** این پکیج‌ها در کل src و mini-services **صفر مصرف** دارند: `@dnd-kit/core` `@dnd-kit/sortable` `@dnd-kit/utilities` `@tanstack/react-query` `@tanstack/react-table` `zod` `@mdxeditor/editor` `date-fns` `next-intl` `react-syntax-highlighter` `@reactuses/core` `react-markdown` (+`@hookform/resolvers` که فقط `ui/form.tsx` بلااستفاده مصرفش می‌کند). برای ایجنت/توسعه‌دهندهٔ جدید هم گمراه‌کننده است («state سرور با react-query؟» — نه، هیچ‌کدام استفاده نمی‌شود).
- **شدت:** 🟡 Low
- **راه‌حل:** `bun remove` هر ۱۳ مورد. **نگه‌داشتن:** `sharp` (بهینه‌ساز تصویر Next — نیاز runtime، بدون import)، `uuid` (مصرف در api/class)، و پکیج‌هایی که فقط کیت ui/shadcn مصرف می‌کند (`vaul`/`embla`/`input-otp`/`react-day-picker`/`react-hook-form`/`next-themes`) تا هم‌زمان با حذفشان کامپوننت ui هم حذف نشود.
- **الگو:** Lean dependency manifest — هر وابستگی باید یک مصرف‌کنندهٔ زنده داشته باشد.
- **اثر:** نصب/CI سریع‌تر، سطح حملهٔ supply-chain کمتر، حذف ابهام معماری state/data.

### A2 — دستهٔ دوم god component: هفت بازی ۱,۳۰۰–۱,۷۸۶ خطی
- **فایل:** `games/adventure-map-game.tsx` (۱,۷۸۶)، `quiz-game.tsx` (۱,۶۸۰)، `games/crossword-game.tsx` (۱,۶۷۵)، `games/snakes-ladders-game.tsx` (۱,۶۳۷)، `games/speed-quiz-game.tsx` (۱,۴۹۵)، `games/flappy-quiz-game.tsx` (۱,۴۵۲)، `games/wordle-game.tsx` (۱,۳۴۰)
- **مشکل:** همان بیماری‌ای که شوتر داشت — داده + موتور + صحنه + HUD + ورودی + persistence در یک فایل. کیت بازی‌ها (GameShell/ResultScreen/sound-engine) تقریباً همه‌جا پذیرفته شده (۷–۱۴ رفرنس در هر بازی) ولی تفکیک ساختاری نشده؛ code-review و ادامهٔ فازها روی این‌ها سخت است.
- **استثنای بدتر:** `src/components/book/quiz-game.tsx` هم بزرگ‌ترین مصرف‌کنندهٔ ۳ کیلویی بعدی است، هم **صفر پذیرش کیت** دارد، هم خارج از پوشهٔ `games/` است (نقض ساختار).
- **شدت:** 🟠 Medium
- **راه‌حل:** تفکیک مکانیکی بازی‌به‌بازی با پلی‌بوک اثبات‌شدهٔ `games/fps/` (فایل داده/موتور/scene/hud + index نازک؛ هر جابه‌جایی = tsc + QA ده‌مرحله‌ای همان بازی). اولویت: quiz-game (جابه‌جایی به games/ + پذیرش کیت) → adventure-map → crossword/snakes → speed-quiz/flappy/wordle.
- **الگو:** SoC + Composition — همان الگوی REFACTOR گام ۳، این‌بار به‌صورت بک‌لاگ قابل‌زمان‌بندی.
- **ماژولارسازی:** هر بازی به پوشهٔ `games/<name>/` با ماژول‌های <۴۰۰ خطی؛ قرارداد Attempt/localStorage طبق `games/fps/README.md`.
- **اثر:** ادامهٔ فازهای محصولی (F11/F12، توسعهٔ دوئل) روی فایل‌های قابل‌بازبینی؛ ریسک merge conflict صفر؛ تازگی کد برای ایجنت‌های بعدی.

### A3 — بازتورم `fps/index.tsx`: ۲,۴۳۸ خط (بزرگ‌ترین کامپوننت src)
- **فایل:** `games/fps/index.tsx` — ۲۳ useState + ۲۱ useEffect + ۱۴۹ خط hook
- **مشکل:** پس از تفکیک موفق (۴,۳۰۴→۲,۳۳۸) فازهای F10 دوباره ۱۰۰+ خط اضافه کرد (حالت شنیداری، effect پخش، دکمهٔ HUD، گزارش AI). اگر F10-ب (موتور توالی) هم داخل index پیاده شود از ۲,۶۰۰ عبور می‌کند — روند برگشت به god component.
- **شدت:** 🟠 Medium (روند؛ قبل از فاز بعدی باید لاغر شود)
- **راه‌حل:** استخراج سه بخش کم‌جنب‌وجوش که هنوز داخل index‌اند: ① `fps/setup-panel.tsx` (JSX Setup ~۵۰۰ خط — کامپوننت presentational با props) ② `fps/use-fps-prefs.ts` (حالت‌ها/کیفیت/سلاح/نقشه + loadPref + ماندگاری) ③ `fps/hud-question.tsx` (کارت سؤال + دکمهٔ پخش). هدف: index = ارکستراسیون خالص ~۱,۲۰۰–۱,۴۰۰.
- **الگو:** Container/Presentational + Custom Hook — بدون تغییر رفتار، با tsc/QA بعد از هر جابه‌جایی.
- **اثر:** فازهای بعدی شوتر (F10-ب، F11 نشان‌ها) روی فایل‌های کوچک؛ کاهش ریسک رگرسیون در فایل پرتکرارترین بازی.

### A4 — دروازهٔ کیفیت نیمه‌باز: ۲۱ unused-vars + `noImplicitAny:false`
- **فایل:** ۱۱ فایل (asr/route، kit/smart-pick، grammar-library، profile-button، quiz-game، say-it، shadowing-view، use-toast، daily-store، **lib/speak.ts**، weekly-store) + `tsconfig.json`
- **مشکل:** قاعدهٔ `no-unused-vars` هنوز «warn» است چون ۲۱ مورد مانده (بیشتر «assigned-but-unused» معنایی)؛ `noImplicitAny` هم خاموش است. ignoreBuildErrors بسته شد ولی این دو لایهٔ بعدی گیت هنوز بازند.
- **شدت:** 🟠 Medium
- **راه‌حل:** سه‌مرحله‌ای: ① پاک‌سازی ۲۱ warning (تصمیم صریح: حذف یا underline کردن عمدی با `_`) ② `no-unused-vars:"error"` ③ `noImplicitAny:true` + رفع موارد جزئی. نکتهٔ حساس: مورد speak.ts (پارامتر onEnd در مسیر قطع عمدی) با تصمیم طراحی همراه است — biome eskiz نه، حذف نه.
- **الگو:** Quality Gates / Fail Fast (تکمیل مسیر گام ۵ Audit اول)
- **اثر:** رگرسیون‌های تایپ/متغیر بی‌مصرف دیگر حتی در warning هم دیده نمی‌شوند چون اصلاً ساخته نمی‌شوند.

### A5 — آرتیفکت «Hello, world!» در API ریشه
- **فایل:** `src/app/api/route.ts` (کل فایل: GET → `{message:"Hello, world!"}`)
- **مشکل:** باقی‌ماندهٔ قالب اولیه؛ سطح API بی‌مصرف که در مستندات/تست‌های خارجی هم می‌تواند سؤال‌برانگیز باشد. `/api/health` واقعی از قبل موجود است.
- **شدت:** 🟡 Low
- **راه‌حل:** حذف فایل.
- **الگو:** Repo hygiene.
- **اثر:** سطح API تمیز؛ حذف رفتار نامستند.

### A6 — پسماند DRY خارج از بازی‌ها: faNum محلی ×۶ + pick محلی ×۳
- **فایل:** `compare-view`، `progress-card-generator`، `activity-heatmap`، `survey-gate`، `srs-stats-section`، `print-flashcards` (faNum محلی)؛ `fps/scene/targets.tsx`، `duel-game`، `adventure-map-game` (pick محلی در حالی که `shared.pickUnique` هست)
- **مشکل:** Audit اول بازی‌ها را همگرا کرد ولی همین تکرار در کامپوننت‌های غیربازی باقی مانده (~۶۰ خط).
- **شدت:** 🟡 Low
- **راه‌حل:** import از `shared.ts`؛ حذف تعریف‌های محلی.
- **الگو:** Single Source of Truth.
- **اثر:** فیکس آینده (مثلاً ارقام فارسی) یک‌جا اعمال می‌شود.

### A7 — state زندهٔ کلاس در حافظهٔ فرآیند (گام ۹ معلق Audit اول)
- **فایل:** `api/class/_lib/state.ts` (۲۵۹ خط) — ری‌استارت سرور (OOM سندباکس) جلسهٔ زنده را می‌بُرد؛ duel-service (:3003) مالک realtime است ولی state کلاس هنوز داخل Next است.
- **شدت:** 🟡 Low (تک‌کاربر/دمو) — 🟠 اگر کلاس مجازی چندنفره جدی شود
- **راه‌حل:** انتقال وضعیت live به duel-service یا جدول DB (الگوی Attempt) — فقط هنگام جدی‌شدن چندنفره.
- **الگو:** Statelessness API + مالکیت state در سرویس realtime.

### A8 — هم‌نامی محصولی: «شکار صدا» (بازی hub) در برابر «شنیداری» (حالت شوتر)
- **فایل:** `games/listening-hunt-game.tsx` در برابر `games/fps/` حالت `listening-hunt`
- **مشکل:** دو تجربهٔ شنیداری با نام‌های نزدیک — ریسک سردرگمی انتخابی در هاب/کپی‌رایتینگ (بازی = تطبیق صدا↔واژه؛ حالت شوتر = مأموریت سه‌بعدی با سؤال صوتی).
- **شدت:** 🟡 Low
- **راه‌حل:** تفکیک کپی کارت هاب (زیرنویس صریح «مینی‌بازی» در برابر «مأموریت سه‌بعدی»)؛ هیچ تغییر کد لازم نیست.
- **الگو:** IA clarity.

### A9 — رصد پرفورمنس: 🟢 پس از refactor (با یک هشدار پایشی)
- **شواهد:** لود تمیز LCP ۲٫۴–۴٫۲s / CLS 0 / INP ۴۸–۵۶ms؛ prefetch هاب بودجه‌دار؛ باندل اولیه فقط بوت‌پث؛ فونت خودمیزبان با فالبک متریک.
- **هشدار:** در یک ریلود HMR دِو، CLS=۰٫۳۰۴ و LCP=۱۷٫۵s ثبت شد (artifact کامپایل دِو و remount). در build پروداکشن دوباره سنجیده شود — اگر در پروداکشن CLS>۰٫۱ دیدیم، مظنون اول: ورود/خروج تمام‌صفحهٔ بازی‌ها.
- **شدت:** 🟢 (فعلاً سالم — آیتم پایش، نه کار)

---

## نقشه راه Refactoring دوم — رتبه‌بندی اجرایی (۱ تا ۱۰)

| # | اقدام | فایل/محدوده | شدت | تلاش | الگوی معماری | سود اصلی |
|---|---|---|---|---|---|---|
| **۱** | ~~**حذف ۱۳ وابستگی مرده**~~ ✅ **انجام شد (۱۴۰۵-۰۸-۲۳ — ۱۴ پکیج)** | `package.json` | 🟡 | ~۱۵د | Lean manifest | نصب/CI سریع‌تر، حذف ابهام معماری |
| **۲** | ~~**حذف آرتیفکت Hello-world + پاک‌سازی ۲۱ unused-vars**~~ ✅ **انجام شد — lint ۰/۰ + `noImplicitAny:true`** | `api/route.ts` + ۱۱ فایل + tsconfig | 🟠 | ~۲س | Fail Fast (تکمیل گیت) | رگرسیون آینده ناممکن |
| **۳** | ~~**همگرایی faNum/pick خارج از بازی‌ها**~~ ✅ **انجام شد — faNum×۶ به shared؛ ادعای pick×۳ outdated بود** | ۹ فایل | 🟡 | ~۱س | SSOT | فیکس یک‌جا |
| **۴** | ~~**نجات quiz-game**: جابه‌جایی به `games/quiz/` + پذیرش کیت + تفکیک~~ ✅ **انجام شد (۱۴۰۵-۰۸-۲۳ — ۸ ماژول؛ موتور ۶۹۴ خط + ۷ ماژول <۵۱۰؛ ۱۶ رفرنس کیت)** | `quiz-game.tsx` ۱,۶۸۰ | 🟠 | ~۳س | SoC + Kit adoption | بزرگ‌ترین استثنای ساختاری حذف می‌شود |
| **۵** | ~~**رژیم fps/index**: استخراج setup-panel + use-fps-prefs + hud-question (قبل از F10-ب)~~ ✅ **انجام شد (۱۴۰۵-۰۸-۲۳ — index ۲,۴۳۸→۱,۹۵۹ خط + ۳ ماژول جدید: setup-panel ۵۲۹ / use-fps-prefs ۱۲۲ / hud-question ۷۷؛ جابه‌جایی بایت‌به‌بایت با اسکریپت صحه‌گذاری و QA ده‌مرحله‌ای)** | `fps/index.tsx` ۲,۴۳۸ | 🟠 | ~۲٫۵س | Container/Presentational | ماندن زیر ~۱,۴۰۰ خط |
| **۶** | **F10-ب موتور «جملهٔ زنجیره‌ای»** — روی index لاغرشده، با جمله‌های واقعی مکالمه‌های جزوه | fps + questions | 🟠 | ~۴س | توالی در Question + handleHit ترتیبی | زیرفاز بسته‌نشدهٔ محصولی |
| **۷** | **تفکیک adventure-map** (بزرگ‌ترین باقی‌مانده) | ۱,۷۸۶ خط | 🟠 | ~۲٫۵س | پلی‌بوک fps/ | بک‌لاگ god component −۱ |
| **۸** | **تفکیک crossword + snakes-ladders** | ۱,۶۷۵+۱,۶۳۷ | 🟠 | ~۳س | پلی‌بوک fps/ | بک‌لاگ −۲ |
| **۹** | **تفکیک speed-quiz + flappy + wordle** | ~۴,۳۰۰ خط جمع | 🟡 | ~۳س | پلی‌بوک fps/ | بک‌لاگ −۳ |
| **۱۰** | **انتقال state زندهٔ کلاس** به duel-service/DB (شرطی: فقط با چندنفره‌شدن جدی) + ثبت ADR-002 | api/class/_lib | 🟡 | ~۳س | Statelessness | مقاوم به ری‌استارت |

### ترتیب و اسپرینت پیشنهادی
- **اسپرینت A (بهداشت، ریسک صفر):** گام ۱ + ۲ + ۳ — ✅ **بسته شد (۱۴۰۵-۰۸-۲۳)** — جزئیات در worklog (SPRINT-A): ۱۴ پکیج حذف (۱۳ سند + react-hook-form چون تنها مصرف‌کننده‌اش ui/form.tsx بلااستفاده بود و حذف شد)، ui/form.tsx و api/route.ts حذف، ۲۱ warning صفر شد (شامل ۹ catch سرویس‌ورکر + __dirname کانفیگ) و قاعدهٔ no-unused-vars به **error** ارتقا یافت (با args/vars/caught IgnorePattern `^_` برای رزروهای عمدی مثل _weakRatio/_onChange)، tsconfig `noImplicitAny:true` (آزمایش اولیه: صفر خطا). نکتهٔ A6: سه مورد «pick محلی» outdated بود — adventure-map از قبل pickUnique مصرف می‌کند و pick در duel/targets هم‌نام محلی است نه کمکی تکراری؛ فقط faNum×۶ همگرا شد.
- **اسپرینت B (ساختار پیش از فEATURE):** گام ۴ + ۵ → بعد **گام ۶** (فاز محصولی F10-ب روی زمین آماده).
- **اسپرینت C (بک‌لاگ):** گام ۷ → ۸ → ۹ (بازی‌به‌بازی، هر کدام PR مستقل با QA همان بازی).
- **شرطی:** گام ۱۰ فقط با نیاز واقعی چندنفره.

### معیار پذیرش هر گام
- `bunx tsc --noEmit` = ۰ و `bun run lint` = ۰ خطا
- بعد از گام‌های تفکیک: QA مرورگری همان بازی (شروع→بازی→پایان→Attempt) صفر خطای کنسول
- بعد از گام ۲: lint دیگر warning هم نباید داشته باشد (۰/۰)
- بعد از گام ۵/۶: چرخهٔ کامل FPS ده‌مرحله‌ای worklog + `detail` Attempt دست‌نخورده

---
*این سند جانشین `docs/refactor-roadmap.md` (Audit اول — بسته‌شده ۹/۹) است؛ آن سند به‌عنوان سوابق پذیرش باقی می‌ماند. سند محصولی شوتر: `docs/fps-roadmap.md` نسخهٔ ۲.۴.*
