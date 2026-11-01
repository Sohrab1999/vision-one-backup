# گزارش شواهد — اصلاح بودجهٔ کارایی، دور ۱ (بوت CLS + LCP بازگشت‌کنندگان)

> Task ID: **P-PERF-1-boot-cls-lcp** · تاریخ: ۱۴۰۵/۸/۱۱ (۲۰۲۶-۱۱-۰۱) · اجرا: Z.ai Code (main agent)
> مرجع معیار: نقشه-راه-جامع-توسعه-۲۰۲۶ — فاز ۱۱ («بودجهٔ کارایی: LCP < 2.5s · CLS < 0.1 — اندازه‌گیری خودکار») + قانون طلایی ۲.

---

## ۱) مبنای شواهد — تله‌متری واقعی کاربران (dev.log، پیش از اصلاح)

| زمان (UTC) | LCP | CLS | INP | بودجه |
|---|---|---|---|---|
| ۲۰۲۶-۱۱-۰۱ ۱۷:۵۳ | **4996ms ✗** | 0 ✓ | 0 ✓ | `lcp:0,cls:1,inp:1` |
| ۲۰۲۶-۱۱-۰۱ ۱۸:۰۶ | **10472ms ✗** | **0.375 ✗** | 0 ✓ | `lcp:0,cls:0,inp:1` |
| ۲۰۲۶-۱۱-۰۱ ۱۸:۱۱ | **9992ms ✗** | **0.375 ✗** | 0 ✓ | `lcp:0,cls:0,inp:1` |

سه نشست واقعی همان روز (همه با کتاب فعال `hill-adv` = الگوی «کاربر بازگشته»)، نقض آشکار معیار ایستادهٔ فاز ۱۱.

## ۲) تحلیل ریشه (فقط‌خواندنی، از کد)

1. **CLS 0.375 — swap تمام‌صفحهٔ بوت:** SSR با snapshot سرور (`bookId=null`) قفسه را رندر می‌کند؛ پس از هیدریشن `useSyncExternalStore` کتاب ذخیره‌شده را برمی‌گرداند → قفسه → اسکلت ۵۵vh → HomeView؛ تعویض مرئی تمام‌viewport = شیفت ۰٫۳۷۵. (فایل‌ها: `book-storage.ts` ACTIVE_KEY=`visionone:active-book`، `page.tsx` effectiveView.)
2. **LCP ~۱۰ ثانیه — زنجیرهٔ سری‌شدهٔ chunk:** رندر `HomeView` پشت گیت `hasData` است؛ یعنی دانلود/کامپایل chunk «خانه» تا تمام‌شدن chunk «داده کتاب» صبر می‌کرد (سریال، نه موازی). + رندر صرفاً کلاینتی (ssr:false) روی سرور dev.
3. **CLS 0.088 — فاصلهٔ «داده آماده» تا «مونت خانه»** (در اولین دور اصلاح دیده شد): فوتر به‌محض آماده‌شدن داده آشکار می‌شد، اما مونت HomeView ~۳۰۰ms بعد بود → فوتر از جایگاه اسکلت به پایین هل خورد (`FOOTER y=817,h=83 → خارج از دید`، لِیو تله‌متری t=1967).

## ۳) تغییرات اعمال‌شده (۴ فایل)

| فایل | تغییر |
|---|---|
| `src/app/layout.tsx` | اسکریپت درون‌خطی `BOOT_CLS_GUARD` در head — **قبل از اولین رنگ‌آمیزی** اگر `visionone:active-book` موجود باشد `data-boot-book="1"` می‌گذارد؛ فالبک مستقل ۸ ثانیه‌ای (حتی اگر React بالا نیاید) |
| `src/app/globals.css` | قانون `html[data-boot-book="1"] [data-boot-shelf/footer] { visibility:hidden }` — عنصر نامرئی جای چیدمان را نگه می‌دارد و در layout-shift اندازه‌گیری نمی‌شود |
| `src/app/page.tsx` | ① wrapper `data-boot-shelf` با `display:contents` ② برداشتن پرچم فقط وقتی نمای واقعی مونت شده باشد (rAF تا نبودِ `[data-boot-loading]`، نه صرفاً hasData) ③ گرم‌کردن موازی chunk «خانه» هم‌زمان با chunk داده (`void import()` — dedupe توسط dynamic) |
| `src/components/book/app-footer.tsx` | صفت `data-boot-footer` روی `<footer>` |

کاربر تازه (بدون کتاب ذخیره‌شده): پرچم هرگز گذاشته نمی‌شود — قفسه از فریم اول مرئی (رفتار پیشین دست‌نخورده).

## ۴) شواهد پس از اصلاح (agent-browser + تله‌متری خود اپ)

**لِیو چرخهٔ گارد — نشست بازگشته (hill-adv)، جلسهٔ مرورگر تازه:**
```
clsTotal: 0   shifts: []   (PerformanceObserver layout-shift)
footer: t=1649ms vis=hidden attr="1"  →  t=1994ms vis=visible attr=null
```
**سناریوی کاربر تازه:** `attr=null` از ابتدا؛ قفسهٔ «قفسه کتاب» و فوتر از فریم اول مرئی ✓

**تله‌متری خود اپ پس از اصلاح (dev.log):**
| زمان (UTC) | LCP | CLS | INP | بودجه |
|---|---|---|---|---|
| ۱۸:۴۷:۳۵ (دور ۱) | 2152ms ✓ | 0.089 ✓ | 0 ✓ | `lcp:1,cls:1,inp:1` |
| **۱۸:۵۲:۵۰ (نهایی)** | **2216ms ✓** | **0 ✓** | **0 ✓** | `lcp:1,cls:1,inp:1` |
| **۱۸:۵۳:۰۶ (نهایی)** | **2112ms ✓** | **0.002 ✓** | **0 ✓** | `lcp:1,cls:1,inp:1` |

**اسناد تصویری:** `qa-shots/p13-returning-home-1440.png` (دسکتاپ) · `qa-shots/p13-returning-home-390.png` (موبایل — بدون اسکرول افقی) · `qa-shots/p13-boot-guard-desktop-1440.png` / `p13-boot-guard-mobile-390.png` (دور ۱).

**دروازه‌های قانون طلایی ۲:** `bun run lint` = ۰ خطا ✓ · `tsc --noEmit` = ۶ خطای **پیش‌موجود** در ۵ فایل خارج از محدودهٔ این تسک (فهرست §۶) — فایل‌های تغییرکردهٔ این تسک صفر خطا ✓ · dev.log: بدون خطای runtime، کامپایل تمیز ✓

## ۵) طبقه‌بندی فایل‌ها (قرارداد Durable State)

- **A — Durable:** ۴ فایل کد + این گزارش + SNAPSHOT.md + ورود worklog + ۲ اسکرین‌شات `p13-*` (شواهد)
- **B — Reproducible:** چرخهٔ QA همین گزارش (seed localStorage → reload → PerformanceObserver → انتظار ۱۵ث → grep dev.log)
- **C — Ephemeral:** پاسخ‌های curl موقت (`/home/z/v1.html`، `tsc-out.txt`) — پس از ثبت حذف شدند
- **D — Sensitive:** ندارد (بدون توکن/کلید در شواهد)

## ۶) مسائل شناخته‌شدهٔ حل‌نشده (پنهان نمی‌شود)

- **P2 — ۶ خطای tsc پیش‌موجود** (خارج از محدودهٔ این تسک، پیش از آن هم روی main بودند):
  `games/wordle/done-view.tsx` و `games/flappy-quiz/done-view.tsx` و `games/speed-quiz/done-view.tsx` (پراپ `game` روی ResultScreenProps) · `games/fps/survive.ts` · `ui/form.tsx` (`react-hook-form` نصب نیست — کامپوننت استفاده‌نشده). پیشنهاد: تسک مستقل «بازگردانی tsc-src=0».
- **LCP روی سرور dev** کامپایل on-demand دارد؛ اعداد prَوداکشن (استندالون) بهتر خواهد بود — حدود واقعی پس از build سنجیده شود.
- نشست‌های با لود سرد >۸ ثانیه: فالبک اسکریپت فوتر را زودتر آشکار می‌کند → شیفت کوچکِ احتمالی (معاملهٔ عمدی پایداری > صفرمطلق).
