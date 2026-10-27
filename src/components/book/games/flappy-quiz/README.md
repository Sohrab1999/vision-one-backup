# بازی «فلپی گزینش» (`games/flappy-quiz/`)

> تفکیک‌شده در **گام ۹ نقشهٔ `docs/refactor-roadmap-2.md` (اسپرینت C)** با پلی‌بوک اثبات‌شدهٔ
> `games/fps/` (هشتمین تکرار): جابه‌جایی بایت‌به‌بایت از `flappy-quiz-game.tsx` سابق +
> props هم‌نام شناسه‌ها (شامل refs ساختاری `endlessRef/overRef/sessionRef/canvasRef`) +
> اسکریپت صحه‌گذاری `tool-results/t9-b/verify.ts` (**۲۲/۲۲ ✓** — ۱۵ برش بایت‌به‌بایت + شمارش خط فارسی).
> صفر تغییر رفتار/رشتهٔ UI.

## نقشهٔ ماژول‌ها

| فایل | خط | نقش |
|---|---|---|
| `index.tsx` | ~۸۴۱ | `FlappyQuizGame`: موتور — state/refs، بلوک توقف/آموزش/تله‌متری، جریان (`start/finish/startEndless/finishEndless/exit`)، حلقهٔ rAF، سیم‌کشی سه شاخه |
| `render.ts` | ~۱۳۷ | رسم canvas 2D خالص: `drawSky/drawGround/drawWall/drawBird` + `roundRectPath` خصوصی |
| `use-flappy-data.ts` | ~۸۵ | هوک دادهٔ مشتق: `vocabSeed/lessons/countFor/pool/meaningOf/best/bestEndless/weakCount` — پارامترهای هم‌نام، بدنه عیناً |
| `setup-panel.tsx` | ~۱۹۸ | `TUTORIAL_STEPS` + `ENDLESS_TUTORIAL_STEP` (export) + `chipCls` + نمای راه‌اندازی |
| `playing-view.tsx` | ~۲۵۵ | JSX بازی: `GameShell` + canvas + اورلی توقف + نگهبان خروج — **بدون dedent** |
| `done-view.tsx` | ~۱۱۷ | ستاره‌بندی + `ResultScreen` کیت (امتیاز/بیشترین کمبو/زمان پرواز) |
| `types.ts` | ~۷۳ | `Cfg/NORMAL_CFG/EASY_CFG/FlappyWall` + ثابت‌های فیزیک (`H 480/WALL_W 84/BIRD_R 13/GROUND_H 24`) |
| `helpers.ts` | ~۴۰ | `qLabel/lessonLabel/layoutGaps` |

## قراردادهای ثابت (دست نزنید بدون QA کامل)

- **امضای Attempt**: در لحظهٔ پایان ثبت می‌شود (نه حین پرواز)؛ حالت بی‌پایان `detail.endless=true`
  **فقط افزودنی** — `saveAttempt/saveBest/bumpPlays` و کلیدهای localStorage عیناً موجود.
- **حالت بی‌پایان**: آموزش جدا (`ENDLESS_TUTORIAL_STEP`)، رکورد جدا (`bestEndless`)، Attempt با پیشرفت فعلی هنگام خروج.
- **تله‌متری**: `createGameSession` در شروع (sessionRef) — end/abandon طبق کیت.
- **فیزیک**: ثابت‌ها در `types.ts`؛ رسم کاملاً در `render.ts` — موتور نباید GL را لمس کند.
- **دلتای مجاز تفکیک**: پسوند `export` روی ۲۹ اعلان مهاجرت‌کرده + dedent ۲ فقط برای سه نمای JSX-درون-if.

## افزودن قابلیت جدید — چک‌لیست

1. رسم/ظاهر → فقط `render.ts`؛ فیزیک/ثابت → `types.ts`؛ داده → `use-flappy-data.ts`.
2. تغییر نما → فقط ماژول همان نما (state از props).
3. پس از هر تغییر: `bunx tsc --noEmit` + `bun run lint` + QA مرورگری
   (setup → شروع → پرواز/دروازه → پایان → نتیجه → دور جدید → خروج).
