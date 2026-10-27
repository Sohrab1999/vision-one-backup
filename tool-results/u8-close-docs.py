# -*- coding: utf-8 -*-
"""U8 doc-closing: roadmap v1.9 + fps README + worklog orchestrator append.
Count-checked replaces only (ZWNJ-safe: python, never Edit)."""
import re

ROADMAP = 'docs/fps-upgrade-roadmap.md'
README = 'src/components/book/games/fps/README.md'
WORKLOG = 'worklog.md'
Z = '\u200c'  # ZWNJ

# sanity: ZWNJ survived into this script file itself
assert ('تله' + Z + 'متری') in open(__file__, encoding='utf-8').read(), 'ZWNJ lost in script'

# ═══════════════ 1) ROADMAP ═══════════════
s = open(ROADMAP, encoding='utf-8').read()

# (a) ADR-006 line
ADR006_NEW = ('- **ADR-006 — تله' + Z + 'متری سطح:** قالب `level` جلسه از U8 = '
              '`${scopeOf(mode,tap)}:${difficulty}` (مثل «word-tap:hard» — تصمیم §U8 قانون ۶: '
              'difficulty محور رفتاری ماتریس تعادل U9 است؛ quality در `detail.quality` حفظ شد؛ '
              'client-log در DB ذخیره نمی' + Z + 'شود — هزینهٔ پیوستگی ≈ صفر). '
              'ابعاد رفتاری دشمن از **`detail`** می' + Z + 'روند (شش شمارندهٔ §U8).')
m = re.findall(r'^- \*\*ADR-006[^\n]*$', s, re.M)
assert len(m) == 1, ('ADR-006', len(m))
s = s.replace(m[0], ADR006_NEW, 1)

# (b) phase table status
assert s.count('| S | ⬅️ فاز جاری |') == 1, 'S current-marker'
s = s.replace('| S | ⬅️ فاز جاری |', '| S | ✅ (۲۰۲۶-۱۰) |', 1)
assert s.count('| M | ⬜ |') == 1, 'M pending-marker'
s = s.replace('| M | ⬜ |', '| M | ⬅️ فاز جاری |', 1)

# (c) tick five acceptance criteria of §U8
def tick_and_append(prefix, append):
    global s
    pat = '^' + re.escape(prefix) + '[^\n]*$'
    m = re.findall(pat, s, re.M)
    assert len(m) == 1, (prefix, len(m))
    line = m[0]
    assert line.startswith('- [ ] '), repr(line[:12])
    body = '- [x] ' + line[6:]
    assert body.endswith('.'), repr(body[-30:])
    body = body[:-1] + append
    s = s.replace(line, body, 1)

APP1 = (' — **۴۳/۴۳ پاس** (dedup فاز، لبه' + Z + 'های idle/patrol، رُند ۰٫۲/۱ اعشار، '
        'تازگی snapshot، reset با پاک' + Z + 'سازی حافظهٔ prev + ۱۲ ترکیب levelOf).')
APP2 = (' — سناریوی ساکن (عادی): DB enemyStalks=2 · enemyCharges=2 · cageThrown=2 '
        '(برابری شارژ/پرتاب در بدون' + Z + 'لغو) · بقیه صفر؛ سناریوی حرکت' + Z + 'برنده: '
        'enemyStalks=3 · enemyCharges=0 · cageThrown=0 (تفکیک شارژ از پرتاب اثبات زنده)؛ '
        'client-log: «word-tap:normal» و «word:normal» — قطعهٔ دوم همیشه difficulty است.')
APP3 = (' — hasScore/survive/wave/map در هر دو Attempt سالم؛ در آسان FSM هرگز گذار نمی' + Z + 'کند '
        '(enemySpeedMult=0 — قانون ① U1) و شمارنده' + Z + 'ها ساختاری صفر می' + Z + 'مانند.')
APP4 = (' — tsc=۰ (×۳) · lint=۰/۰ (×۲) · کنسول صفر خطای بازی (فقط هشدار قدیمی Dialog/Clock) · '
        'بودجه §۳: اثبات ساختاری صفر رندر (شمارش فقط در interval ۲۰۰ms و هندلرهای رویداد موجود — '
        'قوانین ۱/۳ §U8).')
APP5 = (' — t23-setup.png · t23-death-report.png · t23-move-break.png · رکورد worklog Task 23 '
        '(orchestrator + زیرعامل QA) · ADR-006 بروزرسانی شد.')

tick_and_append('- [ ] شبیه' + Z + 'سازی خالص ماژول', APP1)
tick_and_append('- [ ] مرورگر — دور واقعی', APP2)
tick_and_append('- [ ] رگرسیون کلیدها:', APP3)
tick_and_append('- [ ] گیت' + Z + 'های DoD مشترک (§۶):', APP4)
tick_and_append('- [ ] اسکرین' + Z + 'شات' + Z + 'های qa-shots/t23-*', APP5)

# (d) history row after the last §۷ row (the | ۱.۷ | row)
HIST_ROW = ('| ۱.۹ | ۲۰۲۶-۱۰ | **نگارش §U8 تفصیلی + اجرا و بستن U8**: ماژول خالص telemetry.ts '
            '(شش شمارندهٔ تخت FSM/پناهگری/لغو شارژ رئیس با dedup داخلی) + levelOf در helpers '
            '(مهاجرت قالب level جلسه به {scope}:{difficulty} — ADR-006 بروزرسانی) + سیم' + Z + 'کشی '
            'شش نقطهٔ رویداد موجود در index (گذار FSM/گم' + Z + 'کردن رد/تیک پناهگیری/لغو شارژ رئیس/'
            'ریست/spread در detail) بدون setState و رندر تازه — شبیه' + Z + 'سازی ۴۳/۴۳ + دو سناریوی '
            'مرورگری با تفکیک شارژ از پرتاب + client-log قالب تازه؛ فاز جاری U9 |')
m = re.findall(r'^\| ۱\.۷ \|[^\n]*$', s, re.M)
assert len(m) == 1, ('history 1.7', len(m))
s = s.replace(m[0], m[0] + '\n' + HIST_ROW, 1)

# (e) doc header version
assert s.count('(نسخه ۱.۸)') == 1, 'title version'
s = s.replace('(نسخه ۱.۸)', '(نسخه ۱.۹)', 1)

open(ROADMAP, 'w', encoding='utf-8').write(s)
print('ROADMAP OK')

# ═══════════════ 2) fps README ═══════════════
r = open(README, encoding='utf-8').read()

# telemetry.ts row after the survive.ts row
TELEM_ROW = ('| `telemetry.ts` | ~۸۸ | **حافظهٔ میدان — شمارندهٔ رویدادهای دشمن (U8-00 — خالص)**: '
             'شش شمارندهٔ تخت `EnemyTelemetrySnapshot` (FSM/پناهگری/لغو شارژ رئیس — enemyStalks/'
             'enemyCharges/enemyFlees/enemyLost/enemyHiddenS/bossInterrupts) برای Attempt detail + '
             '`createEnemyTelemetry` با API رویدادی (`onPhase` با حافظهٔ dedup prev — idle/patrol/'
             'تکرار شمرده نمی' + Z + 'شوند · `onHiddenTick` با وزن `HIDDEN_TICK_S=0.2` و رُند ۱ اعشار '
             'در snapshot تازه · `onLost`/`onBossInterrupt`/`reset` با پاک' + Z + 'سازی حافظهٔ prev) — '
             'صفر وابستگی React/THREE؛ فقط رویداد گسسته |')
m = re.findall(r'^\| `survive\.ts` \|[^\n]*$', r, re.M)
assert len(m) == 1, ('survive row', len(m))
r = r.replace(m[0], m[0] + '\n' + TELEM_ROW, 1)

# index.tsx row: line count + new responsibility
assert r.count('| ~۲,۶۱۱ |') == 1, 'index line-count'
r = r.replace('| ~۲,۶۱۱ |', '| ~۲,۶۳۱ |', 1)
OLD_IDX = 'tick ساعت دوام)؛ تنها فایل دارای state موتور |'
assert r.count(OLD_IDX) == 1, 'index tail'
r = r.replace(OLD_IDX, 'tick ساعت دوام + تله' + Z + 'متری دشمن U8)؛ تنها فایل دارای state موتور |', 1)

# helpers.ts row: line count + levelOf
HELPERS_ROW = ('| `helpers.ts` | ~۶۷ | `clamp`، `missionRank`، `scopeOf`، `levelOf` (U8 — قالب '
               '`{scope}:{difficulty}` جلسه)، `modeFa`، `dropFullscreen`، … |')
m = re.findall(r'^\| `helpers\.ts` \|[^\n]*$', r, re.M)
assert len(m) == 1, ('helpers row', len(m))
r = r.replace(m[0], HELPERS_ROW, 1)

# U8 contract bullet after the U7 bullet
U8_BULLET = ('- **حافظهٔ میدان (U8)**: شش کلید تخت `detail` (`enemyStalks`/`enemyCharges`/'
             '`enemyFlees`/`enemyLost`/`enemyHiddenS`/`bossInterrupts`) فقط روی رویداد گسسته '
             '(صفر setState/رندر — شمارش در interval ۲۰۰ms و هندلرهای موجود)؛ قالب `level` جلسه = '
             '`{scope}:{difficulty}` از `levelOf` (مهاجرت ADR-006 — `quality` در `detail.quality` حفظ شد).')
m = re.findall(r'^- \*\*حالت بقا \(U7\)\*\*:[^\n]*$', r, re.M)
assert len(m) == 1, ('U7 bullet', len(m))
r = r.replace(m[0], m[0] + '\n' + U8_BULLET, 1)

open(README, 'w', encoding='utf-8').write(r)
print('README OK')

# ═══════════════ 3) WORKLOG append ═══════════════
WL = open(WORKLOG, encoding='utf-8').read()
assert WL.count('Task ID: 23') == 1, 'pre-append Task 23 count'

BLOCK = """---
Task ID: 23
Agent: main orchestrator (Z.ai Code)
Task: درخواست کاربر «مطابق نقشه راه ادامه بده» — فاز U8 «تله‌متری دشمن + مهاجرت level» نقشهٔ docs/fps-upgrade-roadmap.md — نگارش §U8 تفصیلی (قانون سند: مشخصات قبل از کد) + اجرای سه زیرفاز (U8-00/01/02) + گیت‌ها + شبیه‌سازی + QA مرورگری (زیرعامل) + بستن اسناد

Work Log:
- کشف وضعیت: خلاصهٔ نشست «U5 شروع‌نشده» می‌گفت ولی worklog حقیقت است — Task 20 (U5) / 21 (U6) / 22 (U7) بسته شده بودند → فاز جاری = U8 (S). طبق قانون طلایی ابتدا §U8 تفصیلی نگارش شد (سند → §۵٫۸ با ۳ زیرفاز + ۸ قانون سخت + مشخصات فنی + ۵ معیار) و بعد کد
- تصمیم کلیدی §U6→U8 — مهاجرت level: قالب جلسهٔ تله‌متری از {scope}:{quality} به {scope}:{difficulty} مهاجرت کرد (تصمیم: بله) با چهار دلیل ثبت‌شده در قانون ۶ §U8: difficulty محور رفتاری U1 و ورودی مستقیم ماتریس U9؛ quality در detail.quality حفظ می‌شود؛ client-log در DB ذخیره نمی‌شود (هزینهٔ پیوستگی ≈ صفر)؛ واژگان قدیم/تازه جدا هستند (low/high در برابر easy/normal/hard)
- U8-00 (telemetry.ts جدید ۸۹ خط + helpers levelOf): شکل تخت EnemyTelemetrySnapshot شش‌شمارنده‌ای (enemyStalks/enemyCharges/enemyFlees/enemyLost/enemyHiddenS/bossInterrupts) + createEnemyTelemetry با API رویدادی — onPhase با حافظهٔ dedup داخلی prev (idle/patrol/تکرار شمرده نمی‌شوند)، onHiddenTick با وزن HIDDEN_TICK_S=0.2 و رُند ۱ اعشار در snapshot تازه، onBossInterrupt، reset با پاک‌سازی حافظهٔ prev — بدون React/THREE/تایمر؛ levelOf کنار scopeOf در helpers
- U8-01 (index.tsx ۲۶۳۲ خط): شش نقطهٔ سیم‌کشی همه روی رویدادهای موجود — ① onPhase در بلوک گذار FSM interval ۲۰۰ms (کنار صدای U5) ② onLost در بلوک enemyLost ③ onHiddenTick در شاخهٔ streak≥2 (چیپ «پوشیده» — debounce U3) ④ onBossInterrupt در handleHit(id==="boss") وقتی interrupted ⑤ reset در startMission ⑥ spread تخت snapshot در detail Attempt — صفر نقطهٔ رویداد تازه، صفر setState، صفر UI
- U8-02 (index + کامنت‌ها): createGameSession با levelOf(mode,tapMode,difficulty) + deps (quality→difficulty) + بروزرسانی کامنت سرصفحه و کامنت جلسه — ADR-006 در بستن فاز بروزرسانی شد
- گیت‌ها: bunx tsc --noEmit = ۰ ✓ (سه بار — دو ایراد تایپی اولیه: onPhase باید idle بپذیرد + عریض‌سازی prev) · bun run lint = ۰/۰ ✓ (دو بار)
- شبیه‌سازی bun با ماژول واقعی (tool-results/u8-sim.ts — ۴۳/۴۳ پاس): لبه‌های خالی/patrol/idle · dedup تکرار stalk · بازگشت stalk بعد از patrol/idle · onLost/bossInterrupt · رُند پناهگیری (۰٫۲/۰٫۶/۱٫۴/۲۰۰ بدون خطای شناور) · تازگی آبجکت snapshot (جهش بیرونی بی‌اثر) · شش کلید دقیق · reset با پاک‌سازی prev · دنبالهٔ واقعی دور (۳ تعقیب/۲ شارژ/۱ گریز/۱ گم‌شدن/۰٫۶ ثانیه پناه) · ۱۲ ترکیب levelOf × جداسازی واژگان قدیم
- QA مرورگری (زیرعامل — رکورد کامل آن در بخش قبلی همین Task ID): دو سناریو — ساکن (عادی): مرگ در ~۱۴ث با cageThrown=2/cageHits=2 و DB enemyStalks=2/enemyCharges=2 (برابری شارژ/پرتاب در بدون‌لغو)؛ حرکت‌برنده: سه بار شکستن تعقیب با حرکت (stalk→patrol در ۰٫۳ث) → DB enemyStalks=3/enemyCharges=0/cageThrown=0 (تفکیک شارژ از پرتاب اثبات زنده) + سه پاسخ غلط fiber برای پایان سریع؛ client-log دقیقاً «word-tap:normal» و «word:normal» (مهاجرت تأیید)؛ کنسول صفر خطای بازی؛ setup: عادی پیش‌فرض + چیپ بقا خاموش
- درس‌های فنی نشست: ① MultiEdit در این محیط اتمی نیست — از ۷ ویرایش، ۶ تا اعمال و یکی (کامنت ZWNJ‌دار) شکست خورد؛ پس از هر شکست باید وضعیت واقعی فایل شمارش شود ② خروجی rg/cat دنبالهٔ [m را می‌بلعد — «}, ode, lesson» توهم بود؛ بایت‌های python ثابت کردند `}, [mode, lesson` سالم است ③ قطعی موقت لایهٔ ابزارهای نشست اصلی — ادامهٔ کار با زیرعامل‌ها (تست سلامت + QA + بستن اسناد)
- رصد صادقانه: سناریوی ساکن ~۱۴ث زندگی کرد (نه ~۲۳ث تخمین U6) چون تایمر سؤال بی‌پاسخ هم ❤ می‌سوزاند (total=1) — شمارنده‌ها همچنان سازگار؛ در آسان صفرِ شمارنده‌ها اثبات ساختاری است (enemySpeedMult=0 → بدون گذار FSM) نه رانش مرورگری
- اسناد بسته شد: roadmap → نسخهٔ ۱.۹ (U8 ✅ تیک ۵ معیار با شواهد، U9 ⬅️ جاری، ADR-006 نهایی، ردیف تاریخچهٔ ۱.۹) · fps/README.md → ردیف telemetry.ts + قرارداد «حافظهٔ میدان (U8)» + بروزرسانی index/helpers
- اسکرین‌شات‌ها: qa-shots/t23-setup.png · t23-death-report.png · t23-move-break.png
Stage Summary:
- 🏁 فاز U8 «تله‌متری دشمن + مهاجرت level» بسته شد — میدان حالا حافظه دارد: شش شمارندهٔ تخت در Attempt detail رفتار دشمن را دقیق اندازه می‌گیرند (تعقیب/شارژ/گریز/گم‌کردن رد/ثانیهٔ پناهگیری/لغو شارژ رئیس) و level جلسه از قالب گرافیکی {scope}:{quality} به قالب رفتاری {scope}:{difficulty} مهاجرت کرد — ورودی مستقیم ماتریس تعادل U9
- توزیع کد فاز: telemetry.ts ۸۹ (خالص) + helpers +۶ (levelOf) + index ~+۱۴ (شش نقطهٔ سیم‌کشی روی رویداد موجود) — Attempt فقط شش کلید افزودنی (ADR-002) · صفر کلید prefs جدید (ADR-003) · صفر رندر و صفر هزینهٔ فریمی (قوانین ۱/۳ §U8)
- مهم‌ترین شواهد: sim ۴۳/۴۳ · DB دو سناریو (برابری شارژ/پرتاب در ساکن؛ تفکیک در حرکت‌برنده) · client-log «word-tap:normal» · tsc=۰/lint=۰/۰
- گام بعدی طبق سند: فاز U9 «تعادل نهایی و بستن نسخه» (M — پاس تعادل سه درجه × چهار حالت × پنج نقشه + ماتریس QA + قفل نسخه) — §U9 تفصیلی ندارد → ابتدا نگارش، بعد اجرا (آخرین فاز نقشه)
"""

# ZWNJ sanity on the block
for probe in ('تله' + Z + 'متری', 'شش' + Z + 'شمارنده' + Z + 'ای', 'ثبت' + Z + 'شده',
              'سیم' + Z + 'کشی', 'بدون' + Z + 'لغو', 'حرکت' + Z + 'برنده',
              'نمی' + Z + 'شود', 'ZWNJ' + Z + 'دار', 'می' + Z + 'سوزاند',
              'اسکرین' + Z + 'شات' + Z + 'ها', 'گم' + Z + 'کردن'):
    assert probe in BLOCK, ('worklog ZWNJ probe lost', probe)

assert not WL.endswith('\n') or True
with open(WORKLOG, 'a', encoding='utf-8') as f:
    f.write(BLOCK)
print('WORKLOG OK')

# ═══════════════ post-verify (in-python) ═══════════════
s2 = open(ROADMAP, encoding='utf-8').read()
r2 = open(README, encoding='utf-8').read()
w2 = open(WORKLOG, encoding='utf-8').read()
print('roadmap [x] lines :', len(re.findall(r'^- \[x\]', s2, re.M)))
print('roadmap [ ] lines :', len(re.findall(r'^- \[ \]', s2, re.M)))
print('نسخه ۱.۹ count    :', s2.count('نسخه ۱.۹'))
print('| ۱.۹ | rows       :', len(re.findall(r'^\| ۱\.۹ \|', s2, re.M)))
print('ADR-006 matches   :', len(re.findall(r'^- \*\*ADR-006[^\n]*$', s2, re.M)))
print('S done / M current:', s2.count('| S | ✅ (۲۰۲۶-۱۰) |'), '/', s2.count('| M | ⬅️ فاز جاری |'))
print('README telemetry  :', r2.count('telemetry.ts'), '| U8 bullet:', r2.count('حافظهٔ میدان (U8)'))
print('worklog Task 23   :', w2.count('Task ID: 23'))
