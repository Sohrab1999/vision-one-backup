# -*- coding: utf-8 -*-
"""Phase 3G-2 — tick §5 steps 5-1..5-8 + update header status of the 3G-1 roadmap."""
import io

def load(p):
    with io.open(p, 'r', encoding='utf-8') as f:
        return f.read()

def save(p, s):
    with io.open(p, 'w', encoding='utf-8') as f:
        f.write(s)

R = 'نقشه راه ها/نقشه-راه-فاز-۳-گ-۱-پذیرش-شواهد-جایگزین-N1-2.md'
c = load(R)

def replace_sub(content, old_sub, new_sub, tag):
    n = content.count(old_sub)
    assert n == 1, "%s: count=%d (expected 1)" % (tag, n)
    print("%s: OK" % tag)
    return content.replace(old_sub, new_sub, 1)

# 1) header status sentence
HDR_OLD = '**هیچ تیکی از §۵ اجرا نشده و اجرای آن (گام آیندهٔ «۳-گ-۲») نیازمند دستور کار صریح مالک است.** تصمیم مالک دربارهٔ *پذیرش شواهد جایگزین* در دستور کار 3G-1 صریحاً داده شده و عین آن در §۲ ثبت است؛ مستندسازیِ پیامد آن هنوز انجام نشده.'
HDR_NEW = '**اجرا در ۳-گ-۲ (۲۰۲۶-۱۰-۲۳) با دستور صریح مالک — گزینهٔ ب:** هر ۸ گام §۵ اجرا و مستندسازی پذیرش در دو سند + worklog در کامیت همین نوبت (۳-گ-۲؛ SHA در worklog و گزارش نوبت ثبت شد) منتشر شد؛ صفر تغییر کد؛ کارهای باز §۷ عیناً حفظ شد؛ تصمیم مالک دربارهٔ *پذیرش شواهد جایگزین* عیناً در §۲ ثبت است.'
c = replace_sub(c, HDR_OLD, HDR_NEW, 'R-header')

# 2) tick the eight §5 steps
for n in ['۵-۱', '۵-۲', '۵-۳', '۵-۴', '۵-۵', '۵-۶', '۵-۷', '۵-۸']:
    old = '- [ ] ' + n
    new = '- [x] ' + n
    c = replace_sub(c, old, new, 'R-' + n)

save(R, c)
print('Roadmap saved. ALL OK')
