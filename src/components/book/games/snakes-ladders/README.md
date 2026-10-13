# بازی «مار و پله واژگانی» (`games/snakes-ladders/`)

> تفکیک‌شده در **گام ۸ نقشهٔ `docs/refactor-roadmap-2.md` (اسپرینت C — بخش ب)** با پلی‌بوک اثبات‌شدهٔ
> `games/fps/` (ششمین تکرار پس از quiz/fps/adventure-map/crossword): استخراج مکانیکی با اسکریپت
> `tool-results/t8b/extract.ts` (برش خطی از `snakes-ladders-game.tsx` سابق — نه کپی دستی) +
> props هم‌نام شناسه‌ها + اسکریپت صحه‌گذاری `tool-results/t8b/verify.ts` (۳۰/۳۰ ✓ شامل شمارش
> خط‌های فارسی هر برش). صفر تغییر رفتار/رشتهٔ UI.

## نقشهٔ ماژول‌ها

| فایل | خط | نقش |
|---|---|---|
| `index.tsx` | ~۸۳۰ | `SnakesLaddersGame`: ارکستراسیون — state/refs، زنجیرهٔ بی‌توقف G2-e-1 (جریان سؤال/تاس/حرکت/نوبت)، effectها (تایمر/تله‌متری)، `finish` (Attempt/رکورد/استریک) + گارد نهایی + سیم‌کشی سه نما (۱۷+۱۰+۲۷ prop)؛ تنها فایل دارای state |
| `types.ts` | ~۶۹ | ثابت‌ها (`GAME_KEY`، `ALL_LESSON`، `MIN_POOL`، `STEP_MS/JUMP_MS`، `BOT_*`، `DICE_FLIPS`، `SNAKES/LADDERS`) + تایپ‌های دامنه (`Phase/Mode/CatKey/Player/PStats/Journey/BestRecord`) + `TOKEN_BG`/`DICE_ICONS` — خالص .ts |
| `helpers.ts` | ~۱۸۴ | ربات تطبیقی G5-03 (`computeAdaptiveBotSkill`/`recordVsBotSessionResult` + خصوصی‌ها)، هندسهٔ SVG تخته SL1-01 (`CELL_POS`، `SNAKE_PATHS`/`LADDER_GEOMS` + خصوصی‌ها)، تاس سه‌بعدی SL1-04 (`CUBE_FACES`/`cubeTransform`)، `CONFETTI` SL1-03، `lessonLabel`/`wrongIndexOf` |
| `setup-panel.tsx` | ~۲۶۸ | `TUTORIAL_STEPS` (export) + `SetupPanel` presentational: حالت (تک‌نفره/دونفره/با ربات)، تعداد/نام بازیکن‌ها، بانک سؤال با شمار واقعی، دسته‌ها — ۱۷ prop هم‌نام |
| `playing-view.tsx` | ~۴۴۸ | نمای بازی: `GameShell` + کارت سؤال + تاس سه‌بعدی + تختهٔ SVG (مار و پله + لایهٔ مهرهٔ متحرک) + اورلی توقف + نگهبان خروج + کارت مدرس G5-01 (`hint: HintCoach`) — ۲۷ prop هم‌نام |
| `done-view.tsx` | ~۱۲۶ | confetti برد + `ResultScreen` کیت + کارنامهٔ بازیکن‌ها — ۱۰ prop هم‌نام |

## قراردادهای ثابت (دست نزنید بدون QA کامل)

- **امضای Attempt** (در `finish` داخل index): `category: GAME_KEY ("snakes-ladders")` +
  `detail` خودِ دور — داشبورد/رکوردها وابسته‌اند؛ `touchStreak`/`recordStudySession`/`bumpPlays` همان‌جا.
- **تله‌متری**: `createGameSession({game, level: "players:N"})` — تأییدشده در dev.log.
- **جغرافیای تخته**: `SNAKES/LADDERS` (نگاشت خانه‌ها) و `CELL_POS`/مسیرهای SVG در `types.ts`/`helpers.ts` —
  تغییر مختصات = تغییر هم‌زمان هندسهٔ مسیرها؛ حرکت مهره با `STEP_MS`/`JUMP_MS`.
- **ربات تطبیقی G5-03**: مهارت ربات از `vsBotSession` (خصوصی) محاسبه می‌شود — نتیجه فقط از
  `recordVsBotSessionResult` ثبت شود.
- **سؤال‌ها**: فقط از بانک واقعی جزوه (بدون دادهٔ ساختگی) — شمار چیپ «کل بانک (۵۳۰ سؤال)» از دامنهٔ واقعی می‌آید.

## افزودن قابلیت جدید — چک‌لیست

1. ثابت/تایپ جدید → `types.ts`؛ هندسه یا منطق خالص → `helpers.ts` (بدون اثر جانبی).
2. هر تغییر نما → فقط ماژول همان نما؛ state از props می‌آید (presentational خالص).
3. پس از هر تغییر: `bunx tsc --noEmit` + `bun run lint` + QA مرورگری فلو استاندارد
   (setup → شروع → پاسخ سؤال → تاس + حرکت مهره (پله/مار) → نوبت اضافه با ۶ → نگهبان خروج (Esc=ادامه) → پایان دور → نتیجه).
