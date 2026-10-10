# -*- coding: utf-8 -*-
"""Task 8-b4 — append worklog entry (single append, UTF-8)."""

entry = """---
Task ID: 8-b4
Agent: full-stack-developer
Task: سؤال مشابه بساز — /api/similar-question + کارت بونس در quiz-game

Work Log:
- زمینه خوانده شد: worklog (فاز ۸ بخش A و قرارداد ai-guard)، الگوی مسیرهای /api/ai-teacher (سیستم‌پرامپت به‌صورت اولین پیام assistant + thinking disabled) و /api/ai-story (استخراج JSON با regex + retry یک‌باره) و /api/explain (اعتبارسنجی ورودی) + bookPromptLine از _lib/book؛ quiz-game.tsx هر ۱۴۷۲ خط خوانده شد (ناحیه «توضیح هوشمند» ~۴۲۷-۴۶۵ و UI دکمه‌ها ~۱۴۳۵-۱۴۶۵).
- مسیر جدید src/app/api/similar-question/route.ts ساخته شد (dynamic=force-dynamic، maxDuration=60، try/catch کامل): ورودی {text, options[2..6], answer, category?, book?} با پیام‌های ۴۰۰ فارسی؛ شکست JSON.parse بدنه → ۴۰۰ فارسی؛ کش LRU BoundedCache(200) با کلید sha1(text|answer|bookId) → {question, cached:true} (فقط برای تکرار همان سؤال)؛ سقف روزانه consumeDailyQuota(userKeyOf(req,"similar-question"), 25) → ۴۲۹ فارسی؛ پرامپت «طراح تست زبان انگلیسی پایهٔ دهم» + bookPromptLine: تست جدید هم‌الگو ولی متفاوت، گزینهٔ درست یکتا و عین نمونه نباشد، ۳ گزینهٔ غلط هم‌خانواده، خروجی فقط JSON خالص ۴گزینه‌ای با note فارسی؛ اعتبارسنجی سخت خروجی (متن ≠ نمونه، گزینهٔ درست ≠ نمونه، ۴ گزینهٔ یکتا، answer عددی ۰..۳، note ≥۲ نویسه) با retry یک‌باره و پیام تصحیحی → ۵۰۲ فارسی.
- UI در src/components/book/quiz-game.tsx فقط با python3 (replace رشتهٔ دقیق + assert یکتایی قبل از هر replace؛ صفر U+FFFD): آیکون Wand2، interface SimilarBonus، ۴ state بونس (bonus/bonusSelected/bonusLoading/bonusRegen برای کلید ری‌انیمیشن)، ریست بونس در هر ۶ نقطهٔ setAiExplanation(null) (شروع راند عادی/تمرین/روزانه/هفتگی، handleTimeout، nextQuestion) + reset()؛ تابع generateSimilar با منبع دوگانه: دکمهٔ اصلی «سؤال مشابه بساز» همیشه از سؤال اصلی (تکرار → پاسخ کش‌شدهٔ همان سؤال) و «سؤال مشابه بعدی» از روی سؤال مشابهٔ فعلی زنجیر می‌شود تا تولید واقعاً بی‌نهایت و هر POST کلید کش تازه بگیرد؛ دکمه‌ها onClick با آرگومان صریح (false/true) تا MouseEvent به‌جای fromBonus نشت نکند.
- کارت بونس زیر کارت اصلی (فقط answered && bonus): Badge «سؤال مشابه ✨» + «تمرین بی‌پایان»، متن dir=ltr font-en، ۴ دکمهٔ عمودی هم‌استایل سبز/قرمز با aria-pressed و قفل پس از پاسخ (disabled)، نمایش note فارسی پس از پاسخ + پیام درست/اشتباه، ردیف «سؤال مشابه بعدی» / «بستن» (setBonus(null))؛ خطا → toast.error پیام فارسی سرور؛ هیچ تغییری در منطق آزمون اصلی/recordMistake/XP/تایمر.
- نکتهٔ عملیاتی: حین QA مرورگری پروسهٔ dev-server یک‌باره از کار افتاد (dev.log صفر بایت شد) — با nohup bun run dev بازیابی شد (Ready در ۱.۶ث) و همهٔ تست‌ها روی نمونهٔ تازه تکرار شد.
- راستی‌آزمایی: curl معتبر (گرامر) → 200 با «My father ___ a new car last month.» (۴ گزینه، answer=2، متن و گزینهٔ درست متفاوت از نمونه، note فارسی)؛ تکرار همان بدنه → cached:true (کش کار می‌کند، بدون LLM)؛ curl واژگانی با book → 200؛ بدنهٔ خراب/بدون متن/گزینهٔ غیرآرایه/answer خارج از بازه → 400 فارسی؛ bun run lint → خروجی خالی؛ bunx tsc --noEmit | grep ^(src|components|lib|app)/ → CLEAN؛ QA مرورگری (agent-browser): پاسخ سؤال → دکمهٔ «سؤال مشابه بساز» کنار «توضیح با هوش مصنوعی» → کارت بونس با ۴ گزینه → پاسخ بونس (قفل + aria-pressed + note) → دو بار «سؤال مشابه بعدی» سه سؤال یکتای متوالی (renderهای ~۰.۹-۱.۴ث در dev.log = فراخوانی واقعی LLM نه کش) → «سؤال بعدی» اصلی → کارت بونس حذف می‌شود.

Stage Summary:
- ویژگی «سؤال مشابه بساز» کامل است: بعد از هر پاسخ، دانش‌آموز می‌تواند بی‌نهایت تست هم‌الگو از همان نکته بسازد و همان‌جا پاسخ دهد — نیمهٔ «توضیح‌دهندهٔ تست» از قبل موجود بود و اکنون حلقهٔ تمرین بی‌پایان فاز ۸ بسته شد.
- فایل‌ها: src/app/api/similar-question/route.ts (جدید) + src/components/book/quiz-game.tsx (۴ state + generateSimilar + دکمهٔ کنار توضیح هوشمند + کارت بونس + ریست‌ها) — قرارداد «افزودن مسیر AI جدید» با ai-guard رعایت شد (BoundedCache + consumeDailyQuota + userKeyOf + bookPromptLine).
- تصمیم‌ها: زنجیره‌کردن «بعدی» از خود سؤال مشابه (کلید کش تازه در هر گام = تولید بی‌نهایت واقعی)؛ کش فقط برای تکرار همان سؤال مبدأ؛ اعتبارسنجی دوطرفهٔ «متن و گزینهٔ درست نباید عین نمونه باشد» با retry — در بدترین حالت ۵۰۲ فارسی و toast محترمانه.
- تست‌ها: 4×curl (200/cached/400×2)، lint 0، tsc-src 0، QA مرورگری کامل + بازگشت سالم به جریان آزمون اصلی؛ dev-server سالم (پورت 3000).
"""

with open("/home/z/my-project/worklog.md", "a", encoding="utf-8") as f:
    f.write(entry)

print("worklog appended")
