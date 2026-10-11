# Task G3-05-flappy — full-stack-developer

## خلاصه
حالت «تمرین بی‌پایان ∞» برای بازی فلپی گزینش (G3-05 نقشه راه بازی‌ها) — فقط در `src/components/book/games/flappy-quiz-game.tsx` (+331/−49). speed-quiz عامل دیگری است.

## فایل تغییرکرده (تنها مالکیت)
- `src/components/book/games/flappy-quiz-game.tsx`

## طراحی
- **Setup**: دکمهٔ جدا «تمرین بی‌پایان ∞» (outline، h-12، گرید `sm:grid-cols-2` کنار «شروع پرواز» دست‌نخورده) + توضیح یک‌خطی + بج «بهترین امتیاز بی‌پایان» + خط «🎯 مرکز این دور: N واژهٔ ضعیف تو» وقتی `countWeak > 0`.
- **شروع بی‌پایان** (`startEndless`): همان resetهای `start` عادی؛ استخر سؤال با `smartPick` کیت (G3-02 — اولویت SRS ضعیف؛ مصرف فقط، ویرایش نشد) + تله‌متری `level = "{lesson}:{easy|normal}:endless"`.
- **قانون بی‌پایان** (گارد `endlessRef` داخل rAF): دهانهٔ غلط/برخورد دیوار/زمین-سقف قلب کم نمی‌کند — فقط `registerMiss` (ریست کمبو کیت) + ریست سرعت + فلاش + مصونیت + SRS + صدا/لرزش همان مسیر قبلی؛ liveMsg بی‌پایان معادل دارد؛ گیت پایان tick → `if (!endlessRef.current && heartsRef.current <= 0)`.
- **پایان فقط با خروج صریح** (`finishEndless(reason)`):
  - «پایان پرواز» در اورلی توقف → `session.end("finish")`
  - تأیید نگهبان خروج کیت (props اختصاصی بی‌پایان، پیش‌فرض کیت برای دور عادی) → `session.abandon("exit")` — همان قرارداد خروج وسط دور فایل
  - هر دو: `saveAttempt` با پیشرفت فعلی (امضای عیناً موجود؛ `detail` فقط افزودنی `endless: true`) + ResultScreen کیت («پرواز بی‌پایان تمام شد!»؛ آمار امتیاز/بیشترین کمبو/زمان پرواز؛ ستاره آستانهٔ ۲×: 240/120) + رکورد scope افزودنی `easy:endless` / `normal:endless` (الگوی وردل `infinite:4`) با همان loadBest/saveBest.
  - خروج بی‌پیشرفت (total=0): مثل عادی مستقیم و بدون Attempt. unmount: فقط abandon تله‌متری، بدون Attempt.
- **آموزش**: گام چهارم `ENDLESS_TUTORIAL_STEP` فقط حین دور بی‌پایان با همان TutorialOverlay کیت (`steps=tutorialSteps`).

## تضمین حالت عادی (صفر تغییر رفتار)
- `start`/`finish` عادی عین قبل (فقط +۲ خط ریست حالت بی‌پایان در start)؛ همهٔ گیت‌های بی‌پایان با `endlessRef=false` خنثی؛ رشته‌های liveMsg/نگهبان/ResultScreen عادی همان قبلی؛ استخر دور عادی همان `pickUnique`؛ hearts/پایان/رکورد/Attempt عادی دست‌نخورده.

## کلیدهای جدید (همهٔ افزودنی)
- رکورد: `visionone:game-best:{book}:flappy-quiz:easy:endless` / `:normal:endless`
- Attempt detail: `endless: true` · تله‌متری level پسوند `:endless`

## راستی‌آزمایی
- `bun run lint` → صفر خطا
- `bunx tsc --noEmit | grep '^src/'` → خالی (تنها خطاهای ازپیش‌موجود خارج src)
- `git diff --stat` (فایل مالکیت) → فقط flappy-quiz-game.tsx؛ تغییرات kit/lib/memory/scramble مال عوامل موازی G3-01..04
- dev.log: GET / 200 — کامپایل سالم

## برای QA مرورگری (orchestrator)
1. setup → «تمرین بی‌پایان ∞» → خطای عمدی: قلب نباید کم شود، کمبو صفر، دور ادامه یابد (liveMsg «کمبو ریست شد»)
2. توقف ⏸ → «پایان پرواز» → ResultScreen با زمان پرواز → POST /api/attempts با `detail.endless=true` + `game_session_end(reason=finish, level=…:endless)` در dev.log
3. مسیر دوم: خروج شِل → نگهبان با متن بی‌پایان → «آره، پایان پرواز» → Attempt + `game_session_abandon(reason=exit)`
4. رکورد: دور دوم بهتر → بج/توست «رکورد جدید» + scope `:endless` در localStorage
5. حالت عادی: قلب‌ها تا صفر → پایان مثل قبل (رفتار عین قبل)
