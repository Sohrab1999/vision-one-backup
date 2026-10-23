# N1-2 Phase 3H-2B — exact-once annotations (assert count==1) + worklog append
# Authorized docs only: 3H-1 roadmap (§5-1 margin, §5-4 margin), phase-3 doc (§6-1 margin),
# mother doc (phase-7 checklist row margin), worklog (append). All ticks stay [ ].

import io, sys

def patch(path, anchor, addition, label):
    with io.open(path, "r", encoding="utf-8") as f:
        content = f.read()
    n = content.count(anchor)
    assert n == 1, f"ANCHOR COUNT {label} = {n} (expected 1) in {path}"
    new_content = content.replace(anchor, anchor + addition)
    with io.open(path, "w", encoding="utf-8") as f:
        f.write(new_content)
    print(f"OK {label}: patched 1 line in {path}")

BASE = "/home/z/my-project/"

# ── 1) 3H-1 roadmap §5-1: recurring preflight margin (tick stays [x] from 3H-2A) ──
anchor_51 = "گام تکرارشوندهٔ هر نوبت — نوبت‌های بعدی حاشیه اضافه می‌کنند**"
add_51 = (" ← **نوبت ۳-ه-۲B (۲۰۲۶-۱۰-۲۳ ~۱۶:۰۳ تهران): پیش‌پرواز تکرار سبز — main @ `728ba3f4c90af210172b151547c897d3dededc57` = tip ریموت "
          "(`git ls-remote` مستقیم)؛ درخت کاملاً تمیز؛ `728ba3f`/`fc538a5`/`fd2bb5e` ancestor سبز؛ بدون auto-commit جدیدتر از HEAD "
          "(بازبینی مجدد `55510fe6`: فقط ۲ آرتیفکت `tool-results/`)؛ hook sha256 بدون تغییر؛ سرور در اجرا بدون restart**")
patch(BASE + "نقشه راه ها/نقشه-راه-فاز-۳-ه-۱-پذیرش-باقیمانده-فاز-۳-N1-2.md", anchor_51, add_51, "R51")

# ── 2) 3H-1 roadmap §5-4: Item B progress margin (tick stays [ ]) ──
anchor_54 = "- [ ] ۵-۴ **کار B** — تأیید مالک چک‌لیست ← ایجاد فایل چک‌لیست ← اجرای فقط پروب‌های مصوب + ثبت تاریخی/تازه"
add_54 = (" ← **نوبت ۳-ه-۲B (۲۰۲۶-۱۰-۲۳): فایل چک‌لیست `نقشه راه ها/چک-لیست-پذیرش-curl-چهار-نقطه-N1-2.md` ایجاد شد "
          "(نام پیشنهادی §۴-B؛ تأیید نهایی نام با مالک) — ردیف‌های برچسب‌دار تاریخی/تازه + شواهد موجود عیناً ارجاع‌شده + پروتکل اجرای ایمن + "
          "پیشنهاد فهرست پروب/هویت QA در §۶ همان فایل؛ در نوبت ایجاد صفر فراخوانی endpoint انجام شد (پیش‌نیاز «تأیید صریح مالک روی فهرست پروب‌ها و "
          "هویت QA پیش از هر فراخوانی» هنوز برآورده نشده)؛ تیک این گام عمداً باز می‌ماند تا اجرای پروب‌های مصوب**")
patch(BASE + "نقشه راه ها/نقشه-راه-فاز-۳-ه-۱-پذیرش-باقیمانده-فاز-۳-N1-2.md", anchor_54, add_54, "R54")

# ── 3) Phase-3 doc §6-1: checklist row margin (tick stays [ ]) ──
anchor_p361 = "- [ ] چک‌لیست curl تکرارپذیر هر سه نقطه: 200 عادی، 400 طبق جدول، 429 نرخ + `Retry-After`، 429 روزانه طبق U3، (asr: 413/422)"
add_p361 = (" ← **[نوبت ۳-ه-۲B، ۲۰۲۶-۱۰-۲۳]: چک‌لیست تلفیقی چهار نقطه (هر سه نقطهٔ این سند + tutor) ایجاد شد: "
            "«نقشه راه ها/چک-لیست-پذیرش-curl-چهار-نقطه-N1-2.md» — هر ردیف برچسب «تاریخی/تازه/سطح ۳» دارد و شواهد موجود عیناً ارجاع شده‌اند؛ "
            "اجرای پروب‌های تازه در انتظار تأیید فهرست پروب‌ها و هویت QA توسط مالک (پیش‌نیاز §۴-B نقشهٔ ۳-ه-۱)؛ تیک این سطر عمداً باز می‌ماند**")
patch(BASE + "نقشه راه ها/نقشه-راه-فاز-۳-N1-2.md", anchor_p361, add_p361, "P361")

# ── 4) Mother doc phase-7 checklist row margin (tick stays [ ]) ──
anchor_m7 = "- [ ] چک‌لیست تکرارپذیر curl برای هر چهار نقطه: 200 عادی، 400/413/422 طبق جدول هر نقطه، 429 نرخ + `Retry-After`، 429 روزانه طبق قرارداد"
add_m7 = (" ← **[نوبت ۳-ه-۲B، ۲۰۲۶-۱۰-۲۳]: چک‌لیست مرجع ایجاد شد: «نقشه راه ها/چک-لیست-پذیرش-curl-چهار-نقطه-N1-2.md» "
          "(چهار نقطه؛ ردیف‌های برچسب‌دار تاریخی/تازه + پروتکل اجرای ایمن + پیشنهاد فهرست پروب/هویت QA برای تأیید مالک) — "
          "در نوبت ایجاد صفر فراخوانی انجام شد؛ تیک باز تا اجرای پروب‌های مصوب**")
patch(BASE + "نقشه راه ها/نقشه-راه-قدم-بعدی-N1-2.md", anchor_m7, add_m7, "M7")

print("ALL ANNOTATIONS DONE")
