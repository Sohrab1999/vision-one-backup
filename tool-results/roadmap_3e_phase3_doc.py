# -*- coding: utf-8 -*-
# N1-2 Phase 3E — reconciliation edits for «نقشه راه ها/نقشه-راه-فاز-۳-N1-2.md»
# Every anchor must appear exactly once (count==1) before replacement.
import io, sys

PATH = "نقشه راه ها/نقشه-راه-فاز-۳-N1-2.md"

with io.open(PATH, encoding="utf-8") as f:
    s = f.read()

edits = []

def rep(old, new, tag):
    global s
    n = s.count(old)
    if n != 1:
        print(f"FAIL [{tag}] anchor count={n}")
        sys.exit(1)
    s = s.replace(old, new, 1)
    edits.append(tag)

# E1 — header status line (was stale: "no implementation, no numbers approved")
rep(
"> **وضعیت سند:** پیش‌نویس مستقل برای بازبینی مالک. **هیچ پیاده‌سازی‌ای مجاز نشده؛ هیچ عددی مصوب نیست؛ هیچ رفتاری تغییر نکرده است.**",
"> **وضعیت سند (به‌روزرسانی ۳-إ — هماهنگ‌سازی مستندات، ۲۰۲۶-۱۰-۲۳):** سه زیرگام ۳-الف/۳-ب/۳-ج با مصوبات صریح مالک (U2 = گزینهٔ a؛ U4: explain ۳۰/۳۰، tts ۲۰/۶۰ با «هر POST = یک واحد» و استثنای کش‌خورد، asr ۲۰/۳۰) پیاده‌سازی، آزمون و منتشر شدند (کامیت‌های `c76b31d6` · `99b4539a` · `7d5c8350` — انتشار با `git ls-remote` مستقیم تأیید شده). وضعیت معیارها: همه بسته به‌جز **چهار معیار باز** (سه 429 روزانهٔ explain/tts/asr + ضبط واقعی میکروفن ASR) و چک‌لیست رگرسیون §۶ — هیچ معیاری ظاهری بسته نشده است.",
"E1-header")

# E2a — un-tick the two-part 3B criterion so the open daily part is visually explicit
rep(
"- [x] 429ها طبق قرارداد (نرخ با",
"- [ ] 429ها طبق قرارداد (نرخ با",
"E2a-B2-checkbox")

# E2b — annotate the un-tick as a 3E reconciliation (no semantic change vs 3B record)
# NOTE: the shorter prefix also occurs at line 112 (3C C2), so extend with
# the "۶۰ فراخوانی" segment which is unique to line 91 (3B B2).
rep(
"← **باز — به‌صورت دو بخشی: نرخ بسته با شواهد (حلقهٔ ۲۲ نامعتبر: ۲۰×400 سپس 429 با `retry-after: 60`)؛ روزانه: مشاهدهٔ مستقیم باز — نیازمند ۶۰ فراخوانی واقعی upstream",
"← **باز (هماهنگ‌سازی ۳-إ: تیک پیشین برای صراحتِ «بخش روزانه باز» به `[ ]` برگشت — ثبت دو-بخشی از نوبت ۳-ب موجود بود؛ تغییر معنایی رخ نداد) — به‌صورت دو بخشی: نرخ بسته با شواهد (حلقهٔ ۲۲ نامعتبر: ۲۰×400 سپس 429 با `retry-after: 60`)؛ روزانه: مشاهدهٔ مستقیم باز — نیازمند ۶۰ فراخوانی واقعی upstream",
"E2b-B2-annotation")

# E3 — §7 item 1: append the missing 3B diff-scope evidence
rep(
"(+35) + دو سند مجاز (این سند + worklog)**",
"(+35) + دو سند مجاز (این سند + worklog)** ← **۳-ب (تکمیل ثبت در ۳-إ، ۲۰۲۶-۱۰-۲۳): حاشیهٔ این سطر برای ۳-ب در نوبت خودش ثبت نشده بود (نقص ثبت مستند — خودِ کار و آزمون در worklog ثبت بود)؛ با `git show --stat 99b4539a` مستقلاً تأیید شد: diff = فقط `src/app/api/tts/route.ts` (+36) + دو سند مجاز (این سند + worklog)**",
"E3-s7-3b-diff")

# E4 — §7 item 2: close with real SHAs from actual git history + auto-commit separation
rep(
"- [ ] ثبت SHA هر زیرگام؛ تفکیک auto-commit پلتفرم (پیام UUID) با `git show`",
"- [x] ثبت SHA هر زیرگام؛ تفکیک auto-commit پلتفرم (پیام UUID) با `git show` ← **بسته در ۳-إ (۲۰۲۶-۱۰-۲۳) از تاریخچهٔ واقعی گیت (نه حدس): ۳-الف = `c76b31d6f775cabe019c6e84d84b8090c451a690` · ۳-ب = `99b4539a502867ea8e06b9981bc35809ee57b602` · ۳-ج = `7d5c8350b368eec2467ff83cd807e7f6b6888c36`. تفکیک auto-commit (git show مستقیم): `b966d6e` = فقط `.zscripts/dev.pid`؛ `ad899e1` و `4e0e1de` = فقط آرتیفکت‌های `tool-results/` — صفر خط کد اپلیکیشن در هر سه**",
"E4-s7-shas")

# E5 — §7 item 3: close publication evidence (three independent ls-remote verifications)
rep(
"- [ ] انتشار فقط با شواهد مستقیم: `git ls-remote backup refs/heads/main` مطابق SHA مورد انتظار؛ بدون force-push؛ فرض «کامیت محلی = منتشر» ممنوع",
"- [x] انتشار فقط با شواهد مستقیم: `git ls-remote backup refs/heads/main` مطابق SHA مورد انتظار؛ بدون force-push؛ فرض «کامیت محلی = منتشر» ممنوع ← **بسته در ۳-إ (۲۰۲۶-۱۰-۲۳): ۳-الف با ls-remote مستقیم در پیش‌پرواز ۳-ب؛ ۳-ب با ls-remote مستقیم در پیش‌پرواز ۳-ج؛ ۳-ج (`7d5c8350`) در ممیزی ۳-د — tip ریموت `ad899e1` و `git merge-base --is-ancestor 7d5c8350 ad899e1` سبز (والد مستقیم)؛ هر سه در پیش‌پرواز ۳-إ مجدداً تأیید شدند**",
"E5-s7-publication")

# E6 — §7 item 4: close with evidence review from 3D audit
rep(
"- [ ] بستن تیک‌های این سند فقط با شواهد؛ جمع‌بندی در worklog",
"- [x] بستن تیک‌های این سند فقط با شواهد؛ جمع‌بندی در worklog ← **بسته در ۳-إ (۲۰۲۶-۱۰-۲۳): بازبینی ممیزی ۳-د — هر تیک بسته‌شده در §۲–§۵ حاشیهٔ شواهد دارد و جمع‌بندی هر زیرگام در worklog ثبت است؛ تیک معیار دو-بخشی ۳-ب در همین نوبت برای صراحت به `[ ]` برگشت؛ معیارهای باز (A3، B2-روزانه، C1، C2-روزانه، §۶) عمداً باز مانده‌اند — بدون بستن ظاهری**",
"E6-s7-closure")

# E7 — §9 U2 header: sync with recorded owner decision (option a, applied)
rep(
"### U2 — هویت و باکت سقف وقتی هدر هویت غایب/غیرقابل‌اعتماد است — **باز / NOT APPROVED**",
"### U2 — هویت و باکت سقف وقتی هدر هویت غایب/غیرقابل‌اعتماد است — **برای سه نقطهٔ این فاز: مصوب و اعمال‌شده (گزینهٔ a، ۲۰۲۶-۱۰-۲۳) — برای نقاط دیگر/آینده: باز**",
"E7-U2-header")

# E8 — §9 U2: append decision note
rep(
"- **نیاز مالک:** انتخاب گزینه برای هر سه نقطه؛ هر گزینه غیر از (a) یعنی دامنه/پروژهٔ جدید.",
"- **نیاز مالک:** انتخاب گزینه برای هر سه نقطه؛ هر گزینه غیر از (a) یعنی دامنه/پروژهٔ جدید.\n- **تصمیم مالک (۲۰۲۶-۱۰-۲۳ — ثبت در گیت‌های §۲ و اعمال در کد):** برای explain و tts و asr گزینهٔ (a) — باکت IP با محدودیت‌های شناخته‌شدهٔ مستند؛ بدون هدر/احراز جدید؛ tutor نیز از فاز ۲ با همان هویت باکت مصوب است. گزینه‌های (b)/(c) برای نقاط این فاز رد شدند؛ پرسش برای نقاط دیگر یا آینده باز می‌ماند. (هماهنگ‌سازی ۳-إ: سرفصل پیشین «باز / NOT APPROVED» با این تصمیم هماهنگ شد.)",
"E8-U2-decision")

# E9 — §9 U4 header
rep(
"### U4 — اعداد نرخ و سقف روزانهٔ explain/tts/asr — **باز / NOT APPROVED**",
"### U4 — اعداد نرخ و سقف روزانهٔ explain/tts/asr — **برای سه نقطهٔ این فاز: مصوب و اعمال‌شده (۲۰۲۶-۱۰-۲۳) — برای نقاط دیگر: باز**",
"E9-U4-header")

# E10 — §9 U4 intro line
rep(
"- **پیشنهاد صرف برای تصمیم‌گیری (هیچ‌کدام اعمال/تصویب نشده):**",
"- **پیشنهاد صرف برای تصمیم‌گیری — پس از تصمیم مالک (۲۰۲۶-۱۰-۲۳) دقیقاً همین اعداد مصوب و اعمال شدند:**",
"E10-U4-intro")

# E11 — §9 U4: append decision note
rep(
"- **نیاز مالک:** تصویب عدد per-minute و daily برای هر سه نقطه + تأیید معنای واحد tts + تأیید مستثنا بودن یا نبودن کش‌خورد tts (پرسش فاز ۴ سند مادر).",
"- **نیاز مالک:** تصویب عدد per-minute و daily برای هر سه نقطه + تأیید معنای واحد tts + تأیید مستثنا بودن یا نبودن کش‌خورد tts (پرسش فاز ۴ سند مادر).\n- **تصمیم مالک (۲۰۲۶-۱۰-۲۳):** explain ۳۰/دقیقه + ۳۰/روز؛ tts ۲۰/دقیقه + ۶۰/روز + «هر POST = یک واحد، مستقل از تعداد قطعه» + «کش‌خورد مستثنا از سقف روزانه و مشمول نرخ دقیقه‌ای»؛ asr ۲۰/دقیقه + ۳۰/روز — عیناً در کد اعمال شد (کامیت‌های `c76b31d6` / `99b4539a` / `7d5c8350`) و در گیت‌های §۲ ثبت است. (هماهنگ‌سازی ۳-إ: سرفصل پیشین «باز / NOT APPROVED» با این تصمیم هماهنگ شد؛ U4 برای نقاط بیرون این فاز باز می‌ماند.)",
"E11-U4-decision")

with io.open(PATH, "w", encoding="utf-8", newline="") as f:
    f.write(s)

print(f"OK — {len(edits)} edits applied: {', '.join(edits)}")
