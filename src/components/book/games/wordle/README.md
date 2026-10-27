# بازی «وردل ویژن» (`games/wordle/`)

> تفکیک‌شده در **گام ۹ نقشهٔ `docs/refactor-roadmap-2.md` (اسپرینت C)** با پلی‌بوک اثبات‌شدهٔ
> `games/fps/` (نهمین تکرار): جابه‌جایی بایت‌به‌بایت از `wordle-game.tsx` سابق + props هم‌نام
> (۶۳ prop سیم‌کشی‌شده) + اسکریپت صحه‌گذاری `tool-results/t9-c/verify.ts` (**۷۷/۷۷ ✓**).
> صفر تغییر رفتار/رشتهٔ UI؛ seed روزانه و منطق قضاوت بایت‌به‌بایت حفظ شده.

## نقشهٔ ماژول‌ها

| فایل | خط | نقش |
|---|---|---|
| `index.tsx` | ~۶۸۵ | `WordleGame`: موتور — ارکستراسیون، فلیپ پله‌ای، `submitGuess` (اعتبارسنجی poolSet + قضاوت + SRS + رکورد/استریک + تله‌متری)، توقف/نگهبان، کیبورد فیزیکی |
| `playing-view.tsx` | ~۲۹۳ | `GameShell` + گرید فلیپ ۶×N (دو وجه کاشی) + کیبورد QWERTY + راهنمای کیبورد فیزیکی |
| `setup-panel.tsx` | ~۲۶۲ | `TUTORIAL_STEPS` + انتخاب حالت روزانه/بی‌نهایت + طول واژهٔ ۴/۵/۶ حرفی |
| `done-view.tsx` | ~۲۳۵ | `DailyDoneView` (روزانهٔ رفرش‌پذیر) + `InfiniteDoneView` |
| `helpers.ts` | ~۹۲ | `judgeVerdicts` دو-گذره (سبز→زرد/خاکستری با شمارش باقی‌مانده) + `todayKey/shiftDate/hashStr (djb2)` + رنگ/ستارهٔ حکم |
| `daily-store.ts` | ~۶۹ | کلیدهای `visionone:wordle-daily:{bookId}` و `visionone:wordle-streak:{bookId}` — خواندن/نوشتن/parse امن |
| `types.ts` | ~۴۴ | ۹ تایپ/اینترفیس (`WordLevel`, `Verdict`, `DailyState`, …) |
| `constants.ts` | ~۲۶ | `GAME_KEY ("wordle")`، `MAX_ROWS 6`، `FLIP_STAGGER_MS 200`، `FLIP_SETTLE_MS 450`، `MIN_POOL 10`، `LEVELS [4,5,6]` |

## قراردادهای ثابت (دست نزنید بدون QA کامل)

- **واژهٔ روز**: `poolsByLen[5][hashStr(`${bookId}:${todayKey()}`) % len].word.toLowerCase()` —
  استخر ۵حرفی یکتا/مرتب؛ hash روی آرایهٔ مرتب = seed پایدار بین رفرش‌ها (djb2 با `Math.abs`).
- **امضای Attempt**: `category: GAME_KEY` + `detail: {word, rows, mode: "daily"|"infinite", level}` —
  `detail.level` (۴|۵|۶) افزودنی؛ ساختار فعلی دست‌نخورده.
- **تله‌متری**: `createGameSession({game, level: "daily"})` برای روزانه.
- **استریک زنجیرهٔ برد**: فقط از `daily-store.ts`؛ زنجیرهٔ دیروز (`shiftDate`) → +۱، وگرنه ۱.
- **اعتبارسنجی حدس**: حداقل طول + `poolSet.has(guess)` → toast خطا + shake (بدون ثبت).
- **narrowing مجاز تفکیک**: prop `dailyToday: DailyState` (non-null) در `DailyDoneView` +
  گارد `if (dailyDoneView && dailyToday)` در index — رفتار رانتایم یکسان.

## افزودن قابلیت جدید — چک‌لیست

1. قضاوت/تاریخ/هش → فقط `helpers.ts`؛ کلیدهای استور → فقط `daily-store.ts`؛ ثابت → `constants.ts`.
2. تغییر نما → فقط ماژول همان نما (state از props؛ روزانه از گارد non-null index می‌آید).
3. پس از هر تغییر: `bunx tsc --noEmit` + `bun run lint` + QA مرورگری
   (setup → شروع روزانه → حدس نامعتبر (toast+shake) → حدس درست (فلیپ/برند/استریک/کانفتی) → نتیجه → خروج).
