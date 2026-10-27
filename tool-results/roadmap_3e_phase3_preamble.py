# -*- coding: utf-8 -*-
# N1-2 Phase 3E — E12: sync the §9 preamble of the phase-3 roadmap
import io, sys

PATH = "نقشه راه ها/نقشه-راه-فاز-۳-N1-2.md"

with io.open(PATH, encoding="utf-8") as f:
    s = f.read()

old = "> **هیچ‌کدام از موارد این بخش مصوب نیستند (NOT APPROVED).** اعمال هر عدد/سیاست فقط پس از تصمیم صریح مالک و ثبت آن در سند مادر (جدول U) مجاز است."
new = "> **وضعیت این بخش (هماهنگ‌سازی ۳-إ، ۲۰۲۶-۱۰-۲۳):** U2 و U4 برای سه نقطهٔ این فاز با تصمیم صریح مالک مصوب و عیناً اعمال شدند (یادداشت تصمیم زیر هر بخش)؛ **U5 و U6 همچنان NOT APPROVED و بازند.** در زمان ایجاد سند همهٔ موارد NOT APPROVED بودند؛ متن تاریخی کامل هر بخش حفظ شده است."

n = s.count(old)
if n != 1:
    print(f"FAIL preamble anchor count={n}")
    sys.exit(1)
s = s.replace(old, new, 1)

with io.open(PATH, "w", encoding="utf-8", newline="") as f:
    f.write(s)
print("OK — E12 §9 preamble synced")
