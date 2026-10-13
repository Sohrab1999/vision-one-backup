# بازی «نقشه ماجراجویی» (`games/adventure-map/`)

> تفکیک‌شده در **گام ۷ نقشهٔ `docs/refactor-roadmap-2.md` (اسپرینت C)** با پلی‌بوک اثبات‌شدهٔ
> `games/fps/` (گام ۴/۵): جابه‌جایی بایت‌به‌بایت از `adventure-map-game.tsx` سابق + props هم‌نام
> شناسه‌ها + اسکریپت صحه‌گذاری `tool-results/t7/verify.ts` (۱۴/۱۴ ✓). صفر تغییر رفتار/رشتهٔ UI.

## نقشهٔ ماژول‌ها

| فایل | خط | نقش |
|---|---|---|
| `index.tsx` | ~۸۴۸ | `AdventureMapGame`: ارکستراسیون — state/refs، effectهای تایمر (گیت توقف + visibility)، stores پیشرفت/رکورد (`useSyncExternalStore`)، موتور ۸ مرحله (`beginAdventure`/`beginChallenge`/`startStage`/`completeStage`)، ۵ هندلر پاسخ مینی‌چالش‌ها، تله‌متری per-مرحله، ۳ گارد دفاعی + گارد نهایی؛ تنها فایل دارای state |
| `types.ts` | ~۸۶ | `Phase`، `StageType`، ثابت‌ها (`GAME_KEY`، `TOTAL_STAGES`، `MAX_STARS`، `DEFAULT_ORDER`، `STAGE_META`، `WORD_RE`) و اینترفیس‌ها (`QuizQ`، `Tile`، `MatchCard`، `BestRec`، `AdventureProgress`، `ChallengeState`) — خالص .ts |
| `helpers.ts` | ~۹۳ | شش تابع خالص: `baseWord`، `starsOf`، `blankChallenge`، `readProgress` (اعتبارسنجی کامل شکل)، `writeProgress` (+`notifyGameData`)، `orderOf` |
| `setup-panel.tsx` | ~۲۴۲ | نمای راه‌اندازی (presentational): معرفی، چیپ‌های درس، بج رکورد، کارت پیشرفت ذخیره‌شده، دکمه‌های ادامه/از اول/شروع + `TUTORIAL_STEPS` ۳گامی (صادرشده برای بقیهٔ نماها) |
| `stage-map.tsx` | ~۲۱۰ | نمای نقشه: ستون مارپیچ ۸ گره با آفست متناوب + خط‌چین میانی، باز/قفل/ستارهٔ هر گره، نوار پیشرفت، کادر «ماجراجویی کامل شد» + آموزش یک‌بارنمایش |
| `challenge-view.tsx` | ~۴۶۲ | نمای مرحلهٔ فعال: نتیجهٔ per-مرحله روی `ResultScreen` کیت + هدر `GameShell` (بج‌های خطا/ستاره/پیشرفت) + رندر ۴ مینی‌چالش (آزمون/حروف جابه‌جا/جفت‌سازی/شنیداری) + اورلی توقف + `GameExitGuard` + آموزش |
| `done-view.tsx` | ~۱۶۸ | مراسم پایان دور کامل: رتبهٔ کاشف بر ستارهٔ جمع، ستارهٔ هر مرحله، رکورد جدید، دکمه‌های ماجراجویی جدید/نقشه |

## قراردادهای ثابت (دست نزنید بدون QA کامل)

- **امضای Attempt** (در `completeStage` داخل index): `category: GAME_KEY ("adventure-map")` +
  `{lesson, total: 8, correct: perfect, duration, detail: {stars}}` — داشبورد/رکوردها وابسته‌اند.
- **کلید پیشرفت**: `visionone:adventure:{bookId}:{lesson|all}` — فقط از طریق `readProgress`/`writeProgress`
  در `helpers.ts` (شکلِ `stars[8]/done[8]/order?` با اعتبارسنجی کامل؛ ذخیرهٔ قدیمی بدون `order` → چرخهٔ پیش‌فرض).
- **رکورد «بیشترین ستاره»**: `saveBest/loadBest` با scope `all|N` و رکورد `{score}` — کانفتی رکورد فقط از همین مسیر.
- **تله‌متری per-مرحله**: `createGameSession({game, level: "stage:N"})` — start در ورود مرحله،
  `end("finish")` در برد/باخت، `abandon("exit"|"unmount")` در نگهبان/Un-mount. دورِ کل نقشه جلسهٔ جدا ندارد.
- **صدا/لرزش**: درست=`correct`+`success` · غلط=`wrong`+`error` · کلیک=`click`+`light` ·
  ۳ ستاره=`record`+`record` · ۲ ستاره=`win`+`record` · ۱ ستاره=`wrong` — فقط نام‌های موجود GameSound.
- **واژه‌های مصرف‌شدهٔ دور**: `usedWords` ref در index — مرحله‌های مختلف یک دور واژهٔ تکراری نمی‌گیرند
  (تا خالی‌شدن استخر، بعد fallback به کل استخر).

## افزودن قابلیت جدید — چک‌لیست

1. نوع چالش پنجم → `StageType` گسترش + ردیف `STAGE_META` + شاخهٔ سازنده در `startStage` (index) + شاخهٔ رندر در `challenge-view.tsx` + هندلر پاسخ در index.
2. ثابت جدید → `types.ts` (نه عدد جادویی در index).
3. هر تغییر نما → فقط ماژول همان نما؛ state از props می‌آید (presentational خالص، بدون `useBookData` دوباره).
4. پس از هر تغییر: `bunx tsc --noEmit` + `bun run lint` + QA مرورگری فلو استاندارد
   (setup → شروع/ادامه → نقشه → گرهٔ باز → پاسخ مینی‌چالش → `ResultScreen` با ستاره → مرحلهٔ بعد → نگهبان خروج (Esc=ادامه) → خروج به نقشه → پایان دور → مراسم).
