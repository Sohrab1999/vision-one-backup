# آزمون تعاملی (`games/quiz/`)

> تفکیک مکانیکی گام ۴ نقشهٔ `docs/refactor-roadmap-2.md` — از `quiz-game.tsx` (۱,۶۷۹ خط) به پوشهٔ ماژولار،
> طبق پلی‌بوک اثبات‌شدهٔ `games/fps/README.md`. JSX بایت‌به‌بایت منتقل شده؛ رفتار عیناً حفظ شده است.

## نقشهٔ ماژول‌ها

| فایل | نقش |
|---|---|
| `index.tsx` | موتور `QuizGame({ lessonFilter? })` — state/افکت‌ها/منطق پاسخ/ماندگاری (روزانه، هفتگی، زنجیره، دفتر اشتباهات، SRS، گیمیفیکیشن، Attempt آفلاین) + ارکستراسیون سه فاز |
| `setup-panel.tsx` | فاز setup — کامپوننت presentational (کارت‌های چالش روزانه/هفتگی، تمرین پراشتباه/ستاره‌دار/ترکیبی، مرور اشتباهات + ۵ ردیف تنظیم) با props هم‌نام از موتور |
| `result-view.tsx` | فاز result — دایرهٔ درصد، کارنامهٔ قابل چاپ (print-area)، مرور پاسخ‌های نادرست، پیشنهاد مرور اشتباهات |
| `question-card.tsx` | فاز playing — نوار پیشرفت/زمان، نشان‌های حالت، دکمهٔ ستاره، گزینه‌ها، بازخورد پاسخ + جایگاه BonusCard |
| `bonus-card.tsx` | کارت بونس «سؤال مشابه» (تمرین بی‌پایان با هوش مصنوعی) |
| `types.ts` | `Question` / `SimilarBonus` / `Phase` / `Mode` / `PoolMeta` |
| `constants.ts` | گزینه‌های دسته/سطح/درس/تعداد/زمان‌دار + `LETTERS`/`CONFETTI_COLORS`/`levelBadgeClass` + `GAME_KEY = "quiz"` |
| `helpers.tsx` | `Confetti` (کانفتی CSS ≥۸۰٪) + `fmtTime` |

## پذیرش کیت بازی‌ها (فقط در `index.tsx`)

- `kit/sound-engine` → `playSound("correct" / "wrong" / "finish")` — پاسخ درست/غلط/اتمام وقت/پایان دور؛ بی‌صدایی سراسری (`visionone:sound-muted`) خودکار رعایت می‌شود.
- `kit/haptics` → `buzz("success" / "error")` هم‌تراز همان نقاط.
- `kit/telemetry` → `createGameSession({ game: GAME_KEY, level })` در شروع هر دور (normal/practice/daily/weekly)؛ `end("finish")` در `finish()` و `abandon("unmount")` در نگهبان unmount.
- `GameShell` عمداً پذیرفته نشد: هدر فاز playing آزمون سفارشی است (نوار پیشرفت + تایمرها + دکمهٔ گزارش) و آزمون دکمهٔ انصراف میان‌دور ندارد — پذیرش شِل تغییر بصری/رفتاری می‌داد (قرارداد گام ۴: «فقط اگر بدون تغییر»).

## قراردادهای ثابت (دست نزنید بدون QA کامل)

- **امضای Attempt**: `category: normal|review|daily|weekly|starred|combined` + `lesson/total/correct/duration/detail[]/book` — داشبورد/رکوردها به این کلیدها وابسته‌اند.
- **استورها**: daily-store / weekly-store / streak-store / mistakes-store / question-star-store / practice-store / round-counters / srs-store / goal-store / gamification — امضای فراخوانی‌ها دست‌نخورده.
- **آفلاین**: 5xx/شکست شبکه → `enqueueOffline("/api/attempts")` + رویداد `visionone:attempt-saved` در موفقیت.

## افزودن قابلیت جدید — چک‌لیست

1. ثابت جدید → `constants.ts`؛ تایپ جدید → `types.ts`.
2. منطق/ماندگاری → `index.tsx`؛ فقط نمایش → ماژول presentational با props.
3. پس از هر تغییر: `bunx tsc --noEmit` + `bun run lint` + QA مرورگری (setup → شروع → پاسخ → سؤال بعدی → نتیجه → Attempt).
