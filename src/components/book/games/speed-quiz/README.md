# بازی «تست برقی» (`games/speed-quiz/`)

> تفکیک‌شده در **گام ۹ نقشهٔ `docs/refactor-roadmap-2.md` (اسپرینت C)** با پلی‌بوک اثبات‌شدهٔ
> `games/fps/` (هفتمین تکرار پس از quiz/fps/adventure-map/crossword/snakes-ladders):
> جابه‌جایی بایت‌به‌بایت از `speed-quiz-game.tsx` سابق + props هم‌نام شناسه‌ها +
> اسکریپت صحه‌گذاری `tool-results/t9-a/verify.ts` (**۶۰/۶۰ ✓** شامل شمارش خط‌های فارسی هر برش).
> صفر تغییر رفتار/رشتهٔ UI.

## نقشهٔ ماژول‌ها

| فایل | خط | نقش |
|---|---|---|
| `index.tsx` | ~۸۲۹ | `SpeedQuizGame`: ارکستراسیون — state/refs، جریان دور (`start`/پایان تایمر)، موتور سؤال پیاپی، کمبو/امتیاز، `finish` (Attempt/رکورد/تله‌متری) + سیم‌کشی سه نما؛ تنها فایل دارای state |
| `ai.ts` | ~۱۵۱ | فاز G5-02 سؤال هوشمند — انتخاب سؤال از بانک خطاهای کاربر (دفتر خطاها) با same-name exports |
| `helpers.ts` | ~۱۱۴ | منطق خالص: `scopeOf/scopeFor/quizKeyOf/shapeOptions/smartOrderDeck/rankOf/lessonLabel` |
| `setup-panel.tsx` | ~۳۰۳ | نمای راه‌اندازی (presentational، ۱۹ prop): `TUTORIAL_STEPS` + چیپ درس + انتخاب مدت (۳۰/۶۰/۹۰ ثانیه) + بج رکورد |
| `playing-view.tsx` | ~۳۱۷ | نمای بازی (۲۸ prop): هدر زمان/امتیاز/کمبو، سؤال و گزینه‌ها، افکت آتش کمبو (`COMBO_FIRE_CSS`)، اورلی توقف، نگهبان خروج |
| `done-view.tsx` | ~۶۳ | نتیجهٔ کیت (۱۰ prop): امتیاز/دقت/بهترین کمبو + پیام رتبه |
| `types.ts` | ~۲۶ | `GAME_KEY ("speed-quiz")`، `DURATIONS [30,60,90]`، `MIN_POOL`، تایپ‌ها — خالص .ts |

## قراردادهای ثابت (دست نزنید بدون QA کامل)

- **امضای Attempt**: `category: GAME_KEY` + امتیاز/دقت/کمبو در فیلدهای استاندارد؛
  دورِ دارای سؤال هوشمند `detail.source:"ai"` (افزودنی)؛ حالت بی‌پایان `detail.endless=true`.
- **تله‌متری**: `createGameSession({game, level: scopeOf(...)})` — `end("finish")` / `abandon("exit"/"unmount")`؛
  `detail.level` افزودنی بدون تغییر کلیدهای قدیمی.
- **رکورد**: scope درس/کل کتاب × مدت (توسط `scopeFor/quizKeyOf`) — ساختار کلید دست‌نخورده.
- **کمبو**: امتیاز ×۲/×۳ با پاسخ پیاپی درست؛ افکت `COMBO_FIRE_CSS` فقط در playing-view.
- **دلتای مجاز تفکیک**: `stopSpeaking` در playing-view مستقیم از `@/lib/speak` import شده (تابع خالص lib) — JSX صفر تغییر شناسه؛
  `overRef`/`setPhase` به props نگهبان اضافه شدند (هم‌نام).

## افزودن قابلیت جدید — چک‌لیست

1. منطق سؤال هوشمند → فقط `ai.ts`؛ محاسبات خالص → `helpers.ts`؛ ثابت → `types.ts`.
2. تغییر نما → فقط ماژول همان نما (presentational خالص؛ state از props).
3. پس از هر تغییر: `bunx tsc --noEmit` + `bun run lint` + QA مرورگری
   (setup → شروع → پاسخ درست (کمبو/سؤال بعد) → پاسخ غلط → اتمام تایمر → نتیجه → خروج).
