# ADR-001 — الگوی «bridge» در موتور FPS (جهش state صحنه فقط در توابع ماژول‌سطح)

- وضعیت: **پذیرفته‌شده** (Active) — از فاز F3 تا T1 به‌صورت تجربی کشف و ۵ بار خطای lint برای آن رفع شد
- تاریخ: ۱۲ اکتبر ۲۰۲۶ (۲۱ آبان ۱۴۰۵)
- دامنه: `src/components/book/games/fps/` (و هر توسعهٔ آیندهٔ سه‌بعدی R3F مثل adventure-map)

## زمینه

بازی شوتر با `@react-three/fiber` (R3F) نوشته شده است. در R3F:

- `useFrame` **هر فریم** (۶۰+ بار در ثانیه) اجرا می‌شود — ری‌استیت React در آن غیرممکن است.
- کامپایلر React (react-compiler) و قاعدهٔ `react-hooks/immutability` جهش‌دادن مقدارهایی را که
  در رندر/افکت‌های کامپوننت «خوانده» شده‌اند رد می‌کند — حتی اگر داخل ref باشد.
- موتور بازی (فیزیک، ورودی، دوربین) به یک شیء وضعیت خامِ پایدار نیاز دارد که بدون ری‌رندر
  هر فریم تغییر کند.

## تصمیم

وضعیت زندهٔ صحنه در یک شیء واحد به نام **SceneBridge** (تعریف در `fps/types.ts`) نگه‌داری می‌شود
و **هر جهش روی bridge فقط داخل توابع ماژول‌سطح** (خارج از کامپوننت‌ها) انجام می‌شود:

| تابع | فایل | مسئولیت |
|---|---|---|
| `stepPlayer(bridge, dt)` | `fps/physics.ts` | حرکت/پرش/خم‌شدن/برخورد + نوشتن `speedKick` |
| `resolveWorld(pos, …, layout, jumpY)` | `fps/physics.ts` | برخورد دایرهٔ بازیکن با AABB سازه‌ها |
| `applyRig / applyFov / applyScope` | `fps/physics.ts` | اعمال دوربین (bob، کیک FOV، اسکوپ) |
| `setStick(bridge, x, y, knob)` | `fps/scene/input.tsx` | نوشتن بردار جوی‌استیک لمسی |
| `initRig(cam)` | `fps/physics.ts` | مقداردهی اولیهٔ دوربین (در `onCreated` کنواس) |

کامپوننت‌های R3F (`Rig`, `FovTune`, `ViewModel`, `Target`, …) فقط **می‌خوانند** و فراخوانی می‌کنند:

```
useFrame((state, dt) => {
  const b = bridge.current;        // خواندن — مجاز
  stepPlayer(b, dt);               // جهش در تابع ماژول‌سطح — مجاز
  applyRig(state.camera, b, …);    // جهش در تابع ماژول‌سطح — مجاز
  b.speedKick = 0.5;               // ❌ جهش مستقیم در کامپوننت — react-hooks/immutability رد می‌کند
});
```

## چرا این الگو (مزایا)

1. **سازگاری با react-compiler/قواعد hooks** — قاعدهٔ `immutability` جهشِ پس از خواندن در
   scope کامپوننت را رد می‌کند؛ توابع ماژول‌سطح خارج از تحلیل کامپوننت‌اند. (این دقیقاً همان
   خطایی است که ۵ بار در فازهای F8/F10/FM تجربه شد.)
2. **صفر ری‌رندر در فریم** — هیچ state Reactی در حلقهٔ بازی نقش ندارد؛ React فقط برای
   UI (HUD/تنظیمات/نتیجه) و three.js فقط برای صحنه.
3. **تست‌پذیری** — فیزیک و حرکت، توابع با ورودی آشکارند (bridge + dt) و بدون رندر قابل استدلال‌اند.
4. **جدایی مؤلفه‌ها** — چون bridge قرارداد واحد است، تفکیک god component به ۱۰ ماژول
   (`fps/` — refactor گام ۳) بدون تغییر رفتار ممکن شد.

## پیامدها / قواعد برای توسعه‌دهنده

- فیلد جدید وضعیت صحنه؟ اول به `SceneBridge` در `fps/types.ts` اضافه کن، بعد در توابع ماژول‌سطح بنویس.
- هرگز state/ref بازی را داخل `useFrame` جهش نده — یک تابع ماژول‌سطح در `physics.ts` بساز.
- جهش‌های UI (امتیاز، قلب، موج) به React تعلق دارند و با setState در `fps/index.tsx` انجام می‌شوند —
  مرز: **bridge = وضعیت پیوستهٔ صحنه؛ state = وضعیت گسستهٔ بازی.**
- QA بعد از هر تغییر فیزیک: فلو ده‌مرحله‌ای موجود در `worklog.md` (setup/نقشه/شلیک/خشاب/موج/HVT/نتیجه).

## ساختار ماژول (بعد از گام ۳ نقشه راه refactor)

```
fps/
  index.tsx       ارکستراسیون + HUD + setup (تنها «سمت React»)
  constants.ts    ثابت‌های تنظیمی
  maps.ts / layouts.ts / weapons.ts   دادهٔ مأموریت
  prefs.ts        ماندگاری گزینه‌ها (localStorage با گارد null)
  types.ts        SceneBridge و قراردادها
  helpers.ts / textures.ts / questions.ts
  physics.ts      موتور حرکت/برخورد/دوربین (توابع ماژول‌سطح)
  scene/          camera · viewmodel · sky · world · targets · input
```
