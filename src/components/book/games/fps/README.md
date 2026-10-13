# بازی شوتر آموزشی اول‌شخص (`games/fps/`)

> **قواعد طلایی این پوشه در `docs/adr/ADR-001-fps-bridge-pattern.md` مستند است — قبل از تغییر فیزیک/صحنه بخوان.**
> خلاصه: جهش `SceneBridge` فقط در توابع ماژول‌سطح (`physics.ts` و `scene/input.tsx`)؛
> کامپوننت‌های R3F فقط می‌خوانند.

## نقشهٔ ماژول‌ها (بعد از refactor گام ۳ سند refactor-roadmap + گام ۵ سند refactor-roadmap-2)

| فایل | خط | نقش |
|---|---|---|
| `index.tsx` | ~۱,۹۶۰ | `FpsShooterGame`: ارکستراسیون — موتور مأموریت (موج/HVT/Attempt/پایان) + Canvas و ترکیب صحنه + سیم‌کشی HUD + نتیجه؛ تنها فایل دارای state موتور |
| `setup-panel.tsx` | ~۵۳۰ | پنل setup (presentational): حالت/سلاح/نقشه/درس/کیفیت/گزینه‌های نگاه + آموزش ۵گامی (`TUTORIAL_STEPS`) — props هم‌نام از index |
| `use-fps-prefs.ts` | ~۱۲۲ | هوک ترجیحات ماندگار: mode/quality/sens/fov/invert/map/weapon + setterهای ماندگار (فقط از طریق `prefs.ts`) |
| `hud-question.tsx` | ~۷۷ | کارت سؤال روی HUD (presentational): متن سؤال + پخش دوبارهٔ شنیداری + نوار زمان + شمارندهٔ HVT |
| `constants.ts` | ~۱۱۱ | ثابت‌های تنظیمی: لِین‌ها، کمبو، موج/فرار/طلایی، حرکت (ACCEL/JUMP/…)، اسکوپ، کیفیت |
| `maps.ts` | ~۱۵۷ | `MapId`/`MapConfig`/`MAPS` — پالت کامل ۴ نقشه (جنگل/کویر/شب/دروازهٔ دو در) |
| `layouts.ts` | ~۱۷۹ | `StructureKind` + `LAYOUTS` — چیدمان سازه‌های هر نقشه (دیوار/در/طاق/…) |
| `weapons.ts` | ~۸۴ | `WEAPONS` — کلت/سنگین/پمپ با خشاب/لگد/پخش/انفجار |
| `prefs.ts` | ~۷۳ | لودر/سیور گزینه‌ها با گارد null (`visionone:game-pref:fps-*`) |
| `types.ts` | ~۱۰۲ | `SceneBridge` (قرارداد وضعیت صحنه)، `Question`، `TargetSpec`، … |
| `helpers.ts` | ~۴۵ | `clamp`، `missionRank`، `scopeOf`، `dropFullscreen`، … |
| `textures.ts` | ~۸۹ | بافت بیلبورد اهداف و برچسب HVT (Canvas 2D) |
| `questions.ts` | ~۸۲ | سازندهٔ سؤال واژه/گرامر + چیدمان هدف‌ها روی لِین‌ها |
| `physics.ts` | ~۱۵۲ | `stepPlayer`/`resolveWorld`/`applyRig`/`applyScope`/`initRig` — موتور حرکت نرم FPS |
| `scene/camera.tsx` | ~۴۵ | `Rig` (گام فیزیک در فریم) + `FovTune` (اسکوپ/کیک دویدن) |
| `scene/viewmodel.tsx` | ~۲۳۱ | مدل سه‌بعدی سه سلاح + ریلود/تعویض/لگد/جرقهٔ دهانه |
| `scene/sky.tsx` | ~۹۴ | `StarField`/`SkyOrb`/`CloudDrift` — آسمان هر نقشه |
| `scene/world.tsx` | ~۲۶۵ | `Arena`+`FieldProps`+`DecoShape` (رندر سازه‌ها) + `World` (ری‌کست شلیک/والی پمپ) |
| `scene/targets.tsx` | ~۳۳۵ | `Target` (پهپاد متخاصم + فرار)، `GoldenTarget` (HVT)، `Burst` (انفجار آتش/دود) |
| `scene/input.tsx` | ~۱۰۱ | `TouchJoystick` لمسی + `setStick` (تابع ماژول‌سطح قاعدهٔ bridge) |

## قراردادهای ثابت (دست نزنید بدون QA کامل)

- **امضای Attempt**: `category: GAME_KEY ("fps-shooter")` + `detail.{mode,quality,map,weapon,wave}` —
  داشبورد/رکوردها به این کلیدها وابسته‌اند.
- **کلیدهای localStorage**: `visionone:game-pref:fps-{weapon,map,quality,sens,fov,invert}` — فقط از طریق `prefs.ts`.
- **`scopeOf(mode, tap)`**: قالب `"word|grammar[-tap]"` — کلید رکورد شخصی per-scope.
- **registry هدف‌ها**: هر mesh شلیک‌پذیر با `userData.id` وارد `registry.current` می‌شود؛ عناصر دکوری
  هرگز وارد registry نمی‌شوند (قانون «شلیک فقط به هدف»).

## افزودن قابلیت جدید — چک‌لیست

1. وضعیت پیوستهٔ صحنه → فیلد جدید در `SceneBridge` + نویسندهٔ ماژول‌سطح (ADR-001).
2. ثابت جدید → `constants.ts` (نه عدد جادویی در `index.tsx`).
3. سؤال/آموزش جدید → `questions.ts` / `TUTORIAL_STEPS` در `setup-panel.tsx`.
4. پس از هر تغییر: `bunx tsc --noEmit` + `bun run lint` + QA مرورگری فلو استاندارد
   (setup → شروع → شلیک با کلید ۱..۴ در تپ ساده → خشاب/ریلود → موج ۲ → HVT → نتیجه → دور جدید).
