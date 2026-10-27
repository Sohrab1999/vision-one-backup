import io

section = """
---
Task ID: 23
Agent: browser QA subagent (U8)
Task: QA مرورگری فاز U8 «تله‌متری دشمن + مهاجرت level» — صرفاً مرورگر (کد از قبل بسته شده بود: tsc=0، lint=0/0، sim 43/43) — سناریوی مرگ ساکن (عادی) + سناریوی دوم شکستن تعقیب با حرکت + راستی‌آزمایی DB و قالب تازهٔ level در dev.log

Work Log:
- مسیر مرورگر: بستن دیالوگ خبر → «قفسه کتاب» → «📙پایه هفتم» → «بازی‌ها» → کارت «شوتر آموزشی» (rise-in؛ توضیح «میدان سه‌بعدی») → بستن خودکار آموزش با «رد کردن — دیگر نشانم نده» (آموزش «قدم ۱ از ۱۱») → پنل راه‌اندازی با «شروع مأموریت» ✓
- setup: بخش «درجهٔ دشواری» سه چیپ aria-pressed = آسان false / **عادی true (پیش‌فرض)** / سخت false — دست نخورد · ردیف «حالت بقا (اختیاری)» با چیپ «بقا (بی‌پایان)» = **false (خاموش پیش‌فرض)** — دست نخورد · اسکرین‌شات t23-setup.png (full)
- درایور درون‌صفحه‌ای (tool-results/u8-driver.js — الگوی u4/u6: hold/release با keydown تکرار ۳۰۰ms + grab فایبر hop≤30/hook≤120 + snap فازها) پیش از شروع مأموریت نصب شد؛ bridge پس از هر شروع دوباره grab شد
- **سناریوی ۱ — مرگ بازیکن ساکن (عادی، پهپاد فعال)**: نکتهٔ صادقانه — نخستین مأموریت حین نگارش اسکریپت پایش (بین دو eval) بدون ناظر مُرد و Attempt ثبت کرد؛ با «دور جدید» ری‌استارت شد و تایم‌لاین کامل زیر با پایش ۴۵۰ms گرفته شد (t=۰ لحظهٔ کلیک دور جدید، شروع دور ≈+۳ث):
  patrol تا ۳٫۳ → **stalk@۳٫۳** (+پیام «پهپاد شناسایی متخاصم» در ۳٫۷ — aria-live) → **charge@۴٫۷** → **پرتاب@۵٫۷** (پیام «قفس واژه پرتاب شد» + eta ۰٫۳-۰٫۴ حین پرواز) → برخورد#۱@۶٫۲ (❤−۱، eta→۰) → stalk دوباره@۸٫۱-۸٫۶ → charge@۱۴٫۹ → پرتاب@۱۵٫۹ → برخورد#۲@۱۶٫۴ → **گزارش مأموریت@۱۷٫۳** — قلب سوم به تایم‌اوت سؤال رفت (Q_TIME_SHOOT=۱۲ث؛ DB: total=1/correct=0 + «مرور ۱ خطا») → عمر دور ساکن ≈۱۴ث (کوتاه‌تر از برآورد ۲۳-۳۰ث چون تایمر سؤال ساکن هم ❤ می‌خورد)
- DB سناریوی ۱ (آخرین Attempt در زمان خودش): {"id":"cmv8f2vyj000iq5744gt5ajua","correct":0,"total":1,"diff":"normal","cageThrown":2,"cageHits":2,"enemyStalks":2,"enemyCharges":2,"enemyFlees":0,"enemyLost":0,"enemyHiddenS":0,"bossInterrupts":0,"survive":false,"hasScore":true,"wave":1,"map":"forest"} — **هر ۹ انتظار پاس**: stalks≥1 ✓ · charges≥1 ✓ · **charges===cageThrown (۲=۲ — سناریوی بدون وقفه)** ✓ · flees=0 ✓ · lost=0 ✓ · hiddenS=0 ✓ · bossInterrupts=0 ✓ · hasScore ✓ · survive=false ✓ · (رگبار ساکن دو بار تکرار شد: مأموریت اولِ بی‌ناظر هم ردیف یکسان cageThrown=2/cageHits=2/stalks=2/charges=2 — ثبات شمارنده‌ها)
- **سناریوی ۲ — شکستن تعقیب با حرکت (اختیاری، اجرا شد)**: از صفحهٔ گزارش «تنظیمات» → چیپ «تپ ساده» aria-pressed=true → شروع مأموریت · درایور واکنشی (u8-reactive.js): لحظهٔ ورود فاز به stalk کلید KeyW گرفته و با بازگشت به patrol رها شد — **سه شکست پیاپی: stalk@۳٫۳→patrol@۳٫۶ / stalk@۶٫۵→patrol@۶٫۸ / stalk@۹٫۶→patrol@۹٫۹ (هر هولد فقط ۰٫۳ث تا شکست؛ صفر charge)** · سپس سه پاسخ غلط با فایبر-ریدر (الگوی u4-answer.js — اهداف sort بر اساس lane، کلیدِ هدفِ نادرست): q1:key2 / q2:key1 / q3:key1 → مرگ (بدون تایم‌اوت؛ همه داخل Q_TIME_TAP=۱۵ث) · اسکرین‌شات حین درایو t23-move-break.png
- DB سناریوی ۲ (آخرین Attempt فعلی): {"id":"cmv8fcmnm000kq574fhrpuab7","correct":0,"total":3,"diff":"normal","cageThrown":0,"cageHits":0,"enemyStalks":3,"enemyCharges":0,"enemyFlees":0,"enemyLost":0,"enemyHiddenS":0,"bossInterrupts":0,"survive":false,"hasScore":true,"wave":1,"map":"forest"} — **جداسازی charges از throws اثبات میدانی شد**: سه stalk و صفر charge و صفر پرتاب در همان دور
- قالب تازهٔ level در dev.log (rg '"game_session_end"' — فقط دو ردیف، هر دو این نشست): آخرین ردیف دقیقاً فالبک سند = {"t":"2026-10-14T18:09:35.389Z",...,"extra":{"game":"fps-shooter","level":"word-tap:normal","duration":"14","reason":"finish"}} و ردیف قبل {"level":"word:normal","duration":"17"} (تپ خاموش) — قطعهٔ دوم = دشواری (normal) نه کیفیت (low/high) ✓ مهاجرت {scope}:{difficulty} تأیید در هر دو واریانس scope
- کنسول: **صفر خطای صفحه/بازی در هر دو درایو** — فقط هشدار Dialog aria (قدیمی، مجاز) + THREE.Clock deprecation (محیطی) + HMR؛ حتی TTS 429 هم رخ نداد · dev.log بدون error مرتبط
- درس‌های فنی QA: ① «گزارش مأموریت» در body.innerText صفحهٔ نتیجه حاضر است — تشخیص مرگ با زیررشتهٔ خام مثبت کاذب می‌دهد (اولین پایش بلافاصله result=true دید)؛ تشخیص درست = h2 قابل‌مشاهده یا مرور ctx ② شمارش ❤ از body.innerText ناپایدار بود (۰/۱ نوسان می‌کرد) — DB مرجع است ③ eval واکنشی کوتاه (۸ث) با state در window.__drive امکان درایو واکنش‌محور بدون تایم‌اوت داد ④ دور بی‌ناظر هم Attempt ثبت می‌کند — بین شروع و پایش نباید فاصله انداخت (تکرار درس U6/U7)
- اسکرین‌شات‌ها: qa-shots/t23-setup.png (پنل راه‌اندازی با چیپ‌های پیش‌فرض) · t23-death-report.png (گزارش مأموریت D — مرگ ساکن) · t23-move-break.png (حین درایو سناریوی ۲)
- اسکریپت‌های ابزار: tool-results/u8-driver.js (درایور) · u8-poll.js (پایش فاز/پیام/مرگ) · u8-reactive.js (شکستن stalk با حرکت) · u8-wrong.js (پاسخ غلط با فایبر-ریدر) · u8-db.ts (پرس‌وجوی Attempt با شش کلید تازهٔ U8)
Stage Summary:
- 🏁 QA مرورگری U8 بسته شد — شش شمارندهٔ تازهٔ تله‌متری دشمن (enemyStalks/Charges/Flees/Lost/HiddenS/bossInterrupts) در دو سناریوی متضاد میدانی راستی‌آزمایی شد: ساکنِ مُرده = stalks=2/charges=2/cageThrown=2 (تساوی charges با پرتاب‌ها = بدون وقفه) و فرّارِ تیزپا = stalks=3/charges=0/cageThrown=0 (جداسازی شمارش شارژ از پرتاب) — صفر flees/lost/hiddenS/bossInterrupts در هر دو (درست: هیچ گلوله/گم‌شدگی/پنهانی/رئیسی در کار نبود)
- مهاجرت قالب level به {scope}:{difficulty} در dev.log با هر دو واریانس scope تأیید شد («word:normal» و «word-tap:normal» — دیگر :low/:high نیست) · کنسول در هر دو درایو صفر خطا
- صفر تغییر در src/ (فقط qa-shots/t23-*.png و tool-results/u8-*.js|ts افزوده شد؛ db/custom.db با سه Attempt واقعی بازی به‌روز شد)
- گام بعدی طبق سند: فاز U9 «تعادل نهایی» (M) — §U9 تفصیلی ندارد → ابتدا نگارش، بعد کد؛ این فاز آخرین ردیف نقشهٔ fps-upgrade-roadmap است
"""

with io.open("/home/z/my-project/worklog.md", "a", encoding="utf-8") as f:
    f.write(section)
print("appended", len(section), "chars")
