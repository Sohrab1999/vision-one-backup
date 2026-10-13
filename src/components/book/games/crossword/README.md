# بازی «جدول کلمات متقاطع» (`games/crossword/`)

> تفکیک‌شده در **گام ۸ نقشهٔ `docs/refactor-roadmap-2.md` (اسپرینت C — بخش الف)** با پلی‌بوک اثبات‌شدهٔ
> `games/fps/` (پنجمین تکرار پس از quiz/fps/adventure-map): جابه‌جایی بایت‌به‌بایت از
> `crossword-game.tsx` سابق + props هم‌نام شناسه‌ها + اسکریپت صحه‌گذاری `tool-results/t8a/verify.ts`.
> صفر تغییر رفتار/رشتهٔ UI.

## نقشهٔ ماژول‌ها

| فایل | خط | نقش |
|---|---|---|
| `index.tsx` | ~۸۳۰ | `CrosswordGame`: ارکستراسیون — state/refs (آینه‌های سنکرون `lettersRef`/`puzzleRef`/`lessonRef`)، جریان دور (`start`/`resumeDraft`/`deleteDraft`)، منطق تایپ (`typeLetter` با پیشروی خودکار + `backspace`)، `hint`/`check`/`onCellTap`/`focusWord`، `activeWord` مشتق، `finish` (Attempt/رکورد/تله‌متری) + سیم‌کشی سه نما؛ تنها فایل دارای state |
| `generator.ts` | ~۲۶۰ | الگوریتم خالص تولید جدول: تایپ‌های دامنه (`CrosswordDir/Entry/Cell/Placement/Puzzle/GenerateOptions`) + `cellKey`/`parseKey`/`draftCellKey`/`canPlace`/`tryBuild`/`finalize` + `generateCrossword` (خروجی export شده برای اسکریپت تست فشار) + `cellsOf` |
| `draft.ts` | ~۱۷۴ | سیستم draft جدول نیمه‌کاره (کار اختصاصی G2-d): `CrosswordDraft`، کلید `visionone:game-draft:crossword`، خواندن/ذخیره/پاک‌سازی ساکت + `parseDraft` (اعتبارسنجی سخت‌گیرانهٔ حرف‌به‌حرف جدول با placements) |
| `setup-panel.tsx` | ~۲۲۳ | نمای راه‌اندازی (presentational): نوار «ادامهٔ جدول نیمه‌کاره؟» (ادامه/حذف)، چیپ‌های درس، چیپ‌های تعداد واژه، بج رکورد + `TUTORIAL_STEPS` ۳گامی (صادرشده) |
| `playing-view.tsx` | ~۳۶۴ | نمای بازی: هدر `GameShell` (زمان/واژه/راهنما)، سرنخ فعال، جدول (سلول‌های قفل/فعال/مسیر + pop/shake)، فهرست سرنخ‌های افقی/عمودی، دکمه‌های بررسی/راهنما، کیبورد A-Z + Backspace، اورلی توقف، `GameExitGuard` (تأیید = ذخیرهٔ draft)، کارت مدرس G5-01 |
| `done-view.tsx` | ~۶۳ | نتیجهٔ استاندارد کیت: ستاره‌بندی per-game (بدون خطا/راهنما=۳)، آمار زمان/واژه/راهنما، مرور خطاها |
| `types.ts` | ~۱۹ | `Phase`، `BestRecord`، ثابت‌ها (`GAME_KEY`، `ALL_LESSONS`، `COUNT_OPTIONS`، `MIN_PLACED`، `SHAKE_MS`، `POP_MS`، `FINISH_MS`) — خالص .ts |

## قراردادهای ثابت (دست نزنید بدون QA کامل)

- **امضای Attempt** (در `finish` داخل index): `category: GAME_KEY ("crossword")` +
  `{lesson, total: placed, correct: placed, duration, detail: {hints}}` — رکورد «سریع‌ترین حل» فقط بدون راهنما.
- **کلید draft**: `visionone:game-draft:crossword` (افزودنی؛ bookId داخل JSON scope می‌شود) —
  فقط از طریق توابع `draft.ts`؛ رویداد `visionone:game-draft-change` + شنوندهٔ storage بین-تب.
- **رکورد شخصی**: `saveBest/loadBest` با scope `{lesson|all}:{wordCount}` و رکورد `{time}` (کمتر = بهتر).
- **تله‌متری**: `createGameSession({game, level: bestScope})` — start در شروع/ادامه، `end("finish")`، `abandon("exit"/"unmount")`.
- **کیبورد فیزیکی**: الگوی latest-ref (`keyRef`) + آینه‌های ref (`lettersRef`/`exitAskRef`/`pausedRef`) —
  گارد تایپ حین توقف/نگهبان خروج؛ تایپ بدون صدا (تصمیم G2-d).
- **مدرس بازی G5-01**: هر حرف غلط «بررسی» یک `recordMistake` — کل شیء `hintCoach` به‌صورت prop به playing-view.

## افزودن قابلیت جدید — چک‌لیست

1. الگوریتم/تایپ جدول → فقط `generator.ts`؛ ثابت → `types.ts`؛ هر دست‌کاری draft → `draft.ts` با اجرای دوبارهٔ QA کامل حلقهٔ draft.
2. هر تغییر نما → فقط ماژول همان نما؛ state از props می‌آید (presentational خالص).
3. پس از هر تغییر: `bunx tsc --noEmit` + `bun run lint` + QA مرورگری فلو استاندارد
   (setup → شروع → تایپ حروف درست/غلط → بررسی (قفل/لرزش) → راهنما → نگهبان خروج (تأیید = ذخیرهٔ draft) → ادامهٔ draft از setup → حل کامل → نتیجه).
