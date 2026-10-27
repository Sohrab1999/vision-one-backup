# -*- coding: utf-8 -*-
"""درج §U8 تفصیلی در سند راه — قبل از «## ۶) گیت‌های هر فاز» (قانون طلایی: اول سند، بعد کد)"""
import io, sys

PATH = "/home/z/my-project/docs/fps-upgrade-roadmap.md"
ANCHOR = "## ۶) گیت‌های هر فاز (DoD مشترک)"

SECTION = """## ۵٫۸) §U8 — «تله‌متری دشمن + مهاجرت level»

دو فاز آخر رفتار میدان را می‌بندند و U8 «حافظهٔ میدان» است: تا اینجا هر موجودیت دشمن (تعقیب U1، قفس U2، پناهگاه U3، رئیس U4) فقط خروجی آموزشی ثبت می‌کرد — تله‌متری قفس/رئیس در detail هست، ولی **رفتار خود دشمن** هیچ‌جا اندازه گرفته نمی‌شود: چند بار تعقیب شروع شد، چند شارژ قفس آغاز شد (و چندبارش با شلیک لغو شد)، چند بار پهپاد گریخت، چند بار رد گم شد، بازیکن چند ثانیه در پناهگاه ماند. U8 این رویدادها را به Attempt detail می‌برد تا ماتریس تعادل U9 (سه درجه × چهار حالت × پنج نقشه) با دادهٔ واقعی تیون شود، نه حدس. تصمیم دوم فاز، **مهاجرت قالب level جلسهٔ تله‌متری** از `${scope}:${quality}` به `${scope}:${difficulty}` است.

### زیرفازها

| کد | کار | فایل |
|---|---|---|
| **U8-00** | **ماژول خالص `telemetry.ts`**: شکل تخت `EnemyTelemetrySnapshot` (شش شمارنده) + کارخانهٔ `createEnemyTelemetry()` با API رویدادی (onPhase با حافظهٔ فاز قبلی / onLost / onHiddenTick / onBossInterrupt / snapshot / reset) — بدون React/THREE و تایمر؛ dedup و رُند اینجاست + **کمک‌خالص `levelOf(mode,tap,difficulty)`** در helpers (کنار scopeOf) | `telemetry.ts` (جدید) · `helpers.ts` |
| **U8-01** | **سیم‌کشی ارکستراسیون**: اتصال چهار نقطهٔ رویداد موجود (بلوک گذار FSM در interval ۲۰۰ms + بلوک enemyLost + شاخهٔ پناهگیری streak≥2 + لغو شارژ رئیس در handleHit) + ریست کامل در start + پخش snapshot تخت در detail Attempt — صفر نقطهٔ رویداد تازه، صفر setState، صفر UI | `index.tsx` |
| **U8-02** | **مهاجرت level**: قالب جلسهٔ تله‌متری با `levelOf` → `${scope}:${difficulty}` + بروزرسانی ADR-006 و کامنت‌های سرصفحه در بستن فاز | `index.tsx` · docs/fps-upgrade-roadmap.md |

### قوانین سخت رفتاری U8 (قابل مذاکره نیستند)

1. **صفر رابط و صفر رندر.** U8 فقط تله‌متری است — هیچ چیپ/بج/صفحهٔ تازه‌ای؛ بودجهٔ فریمی به‌ساختاری صفر است (شمارش فقط در رویداد گسستهٔ موجود — interval ۲۰۰ms و هندلرهای رویداد).
2. **تله‌متری فقط افزودنی (ADR-002).** شش کلید تازهٔ detail: `enemyStalks/enemyCharges/enemyFlees/enemyLost/enemyHiddenS/bossInterrupts` — صفر تغییر یا حذف کلیدهای موجود؛ snapshot تخت است (بدون تو در تو) تا grep/پارس ساده بماند.
3. **شمارش فقط روی رویداد گسسته.** هیچ شمارشی در useFrame؛ صفر تایمر خام (ADR-004) — فریز حین توقف/نگهبان خروج رایگان می‌ماند چون interval گارد paused دارد.
4. **پیوستگی آموزشی (ADR-005).** تله‌متری هیچ اثر رفتاری ندارد — تشخیص پاسخ همچنان فقط با واژه؛ هیچ سنجه‌ای به بازیکن نشان داده نمی‌شود.
5. **پناهگیری واقعی شمرده می‌شود.** onHiddenTick فقط وقتی debounce دو‌تایی U3 روشن است (chips «پوشیده» = پنهانی واقعی، نه فلیکر درز دید)؛ حین توقف شمرده نمی‌شود.
6. **مهاجرت level — تصمیم: بله.** قالب تازه `${scope}:{difficulty}` (مثل «word-tap:hard»): ① difficulty محور رفتاری U1 و ورودی مستقیم ماتریس تعادل U9 است ② quality در detail.quality حفظ می‌شود — چیزی گم نمی‌شود ③ client-log در DB ذخیره نمی‌شود (فقط خط کنسول) — هزینهٔ پیوستگی داده ≈ صفر ④ واژگان قدیم و تازه جدا هستند (low/high در برابر easy/normal/hard) — ابهام تحلیلی ندارد. زمان برش = U8 (تاریخچهٔ سند).
7. **prefs دست‌نخورده (ADR-003).** صفر کلید ترجیح تازه — U8 هیچ انتخاب کاربری تازه‌ای ندارد.
8. **ماژول خالص و آزمون‌پذیر.** telemetry.ts بدون React/THREE؛ dedup فاز با حافظهٔ داخلی prev (در برابر فراخوانی تکراری مقاوم — idle/patrol هرگز شمرده نمی‌شوند)؛ snapshot آبجکت تازه برمی‌گرداند و فقط در finish خوانده می‌شود.

### مشخصات فنی

- **telemetry.ts (خالص):** `HIDDEN_TICK_S = 0.2` (وزن تیک = دورهٔ interval) · `interface EnemyTelemetrySnapshot { enemyStalks: number; enemyCharges: number; enemyFlees: number; enemyLost: number; enemyHiddenS: number; bossInterrupts: number }` · `createEnemyTelemetry()` → `{ onPhase(phase) — شمارش گذار به stalk/charge/flee با dedup داخلی · onLost() · onHiddenTick() (+۰٫۲) · onBossInterrupt() · snapshot() — enemyHiddenS رُند ۱ اعشار · reset() — حافظهٔ prev هم پاک می‌شود }`.
- **سیم‌کشی (index.tsx):** `enemyTelRef = useRef(createEnemyTelemetry())` — الگوی شمارنده‌های U2 · ریست کامل در startMission · `onPhase(ep)` داخل بلوک گذار FSM (کنار صدای U5 — همان شرط ep !== enemyPhaseRef) · `onLost()` در بلوک enemyLost · `onHiddenTick()` در شاخهٔ streak≥2 · `onBossInterrupt()` در handleHit(id==="boss") وقتی interrupted=true · finish: `...enemyTelRef.current.snapshot()` در detail.
- **مهاجرت level:** `levelOf(mode, tapMode, difficulty)` در helpers.ts — `return \`${scopeOf(mode, tap)}:${difficulty}\`` · مصرف در createGameSession (index.tsx) — difficulty همان ترجیح setup انتخابی است و در طول دور ثابت است.
- **آموزش/رابط:** هیچ — طبق قانون ۱.

### معیار پذیرش U8

- [ ] شبیه‌سازی خالص ماژول (`tool-results/u8-sim.ts`): دنبالهٔ فازها با dedup، لبه‌های idle/patrol، رُند ۰٫۲/۱ اعشار پناهگاه، تازگی آبجکت snapshot، reset — **۲۰+/۲۰+ پاس** (شامل levelOf برای چهار اسکوپ × سه درجه).
- [ ] مرورگر — دور واقعی با تعقیب/قفس: Attempt در DB شش کلید تازه را با مقادیر درست دارد (تفکیک charges در برابر throws — شارژ لغوشده شمرده می‌شود ولی پرتاب نه)؛ client-log خط `game_session_end` با قالب تازهٔ level (مثل «word-tap:normal»).
- [ ] رگرسیون کلیدها: بقیهٔ detail (score..survive) دست‌نخورده؛ در دشواری آسان همهٔ شمارنده‌های دشمن صفر هستند (پهپاد خاموش — قانون ① U1).
- [ ] گیت‌های DoD مشترک (§۶): tsc=۰ · lint=۰/۰ · کنسول صفر خطای بازی · بودجه §۳ (اثبات ساختاری صفر رندر — شمارش فقط در interval/هندلر موجود؛ بدون A/B).
- [ ] اسکرین‌شات‌های qa-shots/t23-* + رکورد worklog + بستن سند (ADR-006 بروزرسانی + تاریخچهٔ ۱.۹ + وضعیت فاز).

"""

with io.open(PATH, "r", encoding="utf-8") as f:
    text = f.read()

if "§U8" in text and "۵٫۸" in text:
    print("ALREADY-INSERTED")
    sys.exit(0)
if ANCHOR not in text:
    print("ANCHOR-NOT-FOUND")
    sys.exit(1)

text = text.replace(ANCHOR, SECTION + ANCHOR, 1)

with io.open(PATH, "w", encoding="utf-8") as f:
    f.write(text)

print("OK — §U8 inserted before section 6")
