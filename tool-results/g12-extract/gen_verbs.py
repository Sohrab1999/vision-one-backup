#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Parse irregular verbs appendix table (grade-12) and generate TS."""
import re

BIDI = re.compile(r'[\u200e\u200f\u202a-\u202e\u2066-\u2069\u200b\u200c\u200d]')
LINES = open('/tmp/g12-full.txt', encoding='utf-8').read().split('\n')

def clean(s):
    return BIDI.sub('', s).replace('\u00a0', ' ').strip()

REPAIRS = [
    ('رشط بسی', 'شرط بستن'),
    ('ساخی ،بنا نهادن', 'ساختن، بنا نهادن'),
    ('سوخی ،سوزاندن', 'سوختن، سوزاندن'),
    ('دستگی کردن', 'دستگیر کردن'),
    ('رشوع کردن', 'شروع کردن'),
    ('زمی خوردن', 'زمین خوردن'),
    ('رانندیک کردن', 'رانندگی کردن'),
    ('قیمت داشی', 'قیمت داشتن'),
    ('ریختن', 'ریختن'),
    ('مالیدن', 'مالیدن'),
]

verbs = []
for idx in range(8225, 8352):
    raw = clean(LINES[idx])
    if not raw or 'Vision' in raw or 'جزوه جامع' in raw:
        continue
    if 'شکل' in raw and 'معنی' not in raw:
        continue
    # latin runs may include spaces (was / were) — capture runs, then split on big gaps
    runs = re.findall(r"[A-Za-z][A-Za-z'/ ]*[A-Za-z]", raw)
    words = []
    for r in runs:
        for piece in re.split(r'\s{2,}', r.strip()):
            p = piece.strip()
            if p and re.search(r'[A-Za-z]', p):
                words.append(p)
    per = re.findall(r'[\u0600-\u06FF][\u0600-\u06FF\s،,\-]*', raw)
    if len(words) >= 3:
        base, past, pp = words[0], words[1], words[2]
        meaning = '، '.join(p.strip().strip('،') for p in per if p.strip())
        for a, b in REPAIRS:
            meaning = meaning.replace(a, b)
        meaning = re.sub(r'\s+', ' ', meaning).strip()
        verbs.append((base, past, pp, meaning))

print('verbs:', len(verbs))
print('first 8:', verbs[:8])
print('last 5:', verbs[-5:])
bases = [v[0] for v in verbs]
dupes = sorted(set(b for b in bases if bases.count(b) > 1))
print('dup bases:', dupes)

def esc(s):
    return s.replace('\\', '\\\\').replace('"', '\\"')

out = []
out.append('''import type { IrregularVerb } from "../types";

/**
 * جدول «افعال بی‌قاعده (Irregular Verbs)» ضمیمه جزوه دوازدهم — صفحات ۱۷۶ تا ۱۷۸ (Vision Three).
 * سه شکل فعل و معنی فارسی عین جدول چاپی جزوه است؛ ترتیب الفبایی جدول حفظ شد.
 *
 * اصلاحیه (آسیب‌های لایه متن که ترمیم شد): شرط بسی←شرط بستن، ساخی←ساختن، سوخی←سوختن،
 * دستگی←دستگیر، رشوع←شروع، زمی←زمین، رانندیک←رانندگی، داشی←داشتن و… (لیگاتور «لا» و جابه‌جایی حروف).
 */
export const IRREGULAR_VERBS: IrregularVerb[] = [
''')
for (base, past, pp, meaning) in verbs:
    out.append(f'  {{ base: "{esc(base)}", past: "{esc(past)}", participle: "{esc(pp)}", meaning: "{esc(meaning)}" }},\n')
out.append('];\n')
open('/home/z/my-project/src/data/grade-12/irregular-verbs.ts', 'w', encoding='utf-8').write(''.join(out))
print('written')
