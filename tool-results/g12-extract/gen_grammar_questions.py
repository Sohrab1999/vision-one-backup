#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Extract grade-12 grammar MCQ tests and append to questions-lesson-N.ts."""
import re

BIDI = re.compile(r'[\u200e\u200f\u202a-\u202e\u2066-\u2069\u200b\u200c\u200d]')
LINES = open('/tmp/g12-full.txt', encoding='utf-8').read().split('\n')
LET = {'a': 0, 'b': 1, 'c': 2, 'd': 3}

def clean(s):
    return BIDI.sub('', s).replace('\u00a0', ' ').strip()

def parse_questions(lo, hi, maxno=100):
    questions = {}
    cur = None
    footer = re.compile(r'Vision Three|جزوه جامع|تألی')
    opt_re = re.compile(r'\ba[.\)]\s*(.*?)\s{2,}b[.\)]\s*(.*?)\s{2,}c[.\)]\s*(.*?)\s{2,}d[.\)]\s*(.*)$')
    for idx in range(lo, hi):
        raw = clean(LINES[idx])
        if not raw or footer.search(raw):
            continue
        m = re.match(r'^(\d{1,3})\s*[\.\)]\s*(.*)$', raw)
        if m:
            num = int(m.group(1))
            if 1 <= num <= maxno:
                cur = dict(no=num, text=m.group(2).strip(), options=[])
                questions[num] = cur
                continue
        if cur is None or cur['options']:
            continue
        om = opt_re.search(raw)
        if om:
            cur['options'] = [clean(om.group(i)) for i in range(1, 5)]
        elif not raw.startswith('-') and 'گزینه' not in raw[:14]:
            cur['text'] += ' ' + raw
    return questions

def parse_keys(lo, hi, fmt):
    keys = {}
    if fmt == 'compact':
        pat = re.compile(r'(?<![\da-z])(\d{1,2})\s+([a-d])(?![a-z])')
    else:  # gozineh
        pat = re.compile(r'-(\d{1,2})\s*گزینه\s*\(\s*\)?\s*([a-d])')
        pat2 = re.compile(r'-(\d{1,2})\s*گزینه\s*\(\s*([a-d])\s*\)?')
    for idx in range(lo, hi):
        raw = clean(LINES[idx])
        if not raw:
            continue
        if fmt == 'compact':
            for m in pat.finditer(raw):
                num, letter = int(m.group(1)), m.group(2)
                if 1 <= num <= 100 and num not in keys:
                    keys[num] = dict(letter=letter, line=idx + 1)
        else:
            m = pat.search(raw) or pat2.search(raw)
            if m:
                num, letter = int(m.group(1)), m.group(2)
                if 1 <= num <= 100 and num not in keys:
                    keys[num] = dict(letter=letter, line=idx + 1)
    return keys

def clean_text(t):
    t = re.sub(r'\s+', ' ', t).strip()
    t = re.sub(r'-{4,}', '________', t)
    t = t.replace('…', '...').replace('’', "'").replace('“', '"').replace('”', '"')
    return t

def esc(s):
    return s.replace('\\', '\\\\').replace('"', '\\"')

def full_expl(line_no):
    buf = [clean(LINES[line_no - 1])]
    joined = buf[0]
    i, guard = line_no, 0
    while joined.count('"') % 2 == 1 and guard < 3 and i < len(LINES):
        nxt = clean(LINES[i])
        if not nxt or 'Vision Three' in nxt or 'جزوه جامع' in nxt:
            break
        buf.append(nxt)
        joined = ' '.join(buf)
        i += 1
        guard += 1
    return joined

SPECS = [
    # (lesson, q_lo, q_hi, k_lo, k_hi, fmt, take, scope, level, note)
    (1, 1609, 1700, 8873, 8892, 'compact', 12, 'تست گرامر جملات معلوم و مجهول — بخش دوم', 'کنکوری', 'ص۳۷-۳۸، کلید ص۱۸۷'),
    (1, 2156, 2240, 9241, 9252, 'compact', 8, 'تست گرامر کلمات ربط همپایه‌ساز', 'متوسط', 'ص۴۹، کلید ص۱۹۲'),
    (2, 3995, 4040, 9769, 9870, 'gozineh', 10, 'تست دستگریمی گرامر ضمایر موصولی', 'متوسط', 'ص۸۴، کلید ص۲۰۳-۲۰۴'),
    (2, 4476, 4833, 9963, 10231, 'gozineh', 10, 'تست گرامر جملات شرطی (نوع اول و دوم)', 'متوسط', 'ص۹۶-۹۹، سطح چاپی: آموزش و کنکوری، کلید ص۲۰۷-۲۱۰'),
    (3, 6639, 6708, 10784, 11011, 'gozineh', 10, 'تست مرور زمان‌ها — بخش اول', 'متوسط', 'ص۱۴۲، کلید ص۲۲۰-۲۲۳'),
    (3, 7012, 7056, 11011, 11020, 'compact', 5, 'تست کاربردهای افعال ناقص', 'متوسط', 'ص۱۴۹، کلید ص۲۲۴'),
    (3, 7056, 7101, 11020, 11029, 'compact', 5, 'تست گرامر جملات معلوم و مجهول', 'کنکوری', 'ص۱۵۰، کلید ص۲۲۴'),
]

by_lesson = {1: [], 2: [], 3: []}
report = []
for (lesson, qlo, qhi, klo, khi, fmt, take, scope, level, note) in SPECS:
    qs = parse_questions(qlo, qhi)
    ks = parse_keys(klo, khi, fmt)
    matched = [(n, qs[n], ks[n]) for n in sorted(qs) if n in ks and len(qs[n]['options']) == 4]
    # spread selection
    if len(matched) > take:
        step = len(matched) / take
        sel = [matched[int(i * step)] for i in range(take)]
    else:
        sel = matched
    by_lesson[lesson].extend((lesson, scope, level, note, s) for s in sel)
    report.append(f'L{lesson} [{scope[:38]}]: Q={len(qs)} K={len(ks)} matched={len(matched)} take={len(sel)}')

print('\n'.join(report))

APPEND = '''
  // ─── {scope} ({note}) — سطح: {level} ───
'''
for lesson in (1, 2, 3):
    items = by_lesson[lesson]
    if not items:
        continue
    fn = f'/home/z/my-project/src/data/grade-12/questions-lesson-{lesson}.ts'
    txt = open(fn, encoding='utf-8').read()
    add = []
    seen_scopes = set()
    for (l, scope, level, note, (no, q, k)) in items:
        opts = [re.sub(r'\s+', ' ', o).strip().rstrip('.') for o in q['options']]
        if not all(opts) or len(set(o.lower() for o in opts)) != 4:
            continue
        text = clean_text(q['text'])
        if '________' not in text and '?' not in text and not text.endswith('.'):
            text += '.'
        expl = ''
        if level != 'کنکوری' or True:
            raw = full_expl(k['line'])
            m = re.match(r'^.*?گزینه\s*\(\s*\)?\s*[a-d]\)?', raw)
            if m:
                rest = raw[m.end():].strip()
                rest = re.sub(r'^[^"«]{0,120}?"', '"', rest) if '"' in rest else rest
                mm = re.search(r'ترجمه"\s*:\s*"([^"]+)"', raw)
                if mm:
                    expl = mm.group(1)
                else:
                    expl = re.sub(r'".*', '', rest).strip()[:110]
        if scope not in seen_scopes:
            add.append(APPEND.format(scope=scope, note=note, level=level))
            seen_scopes.add(scope)
        expl_s = f', explanation: "{esc(expl)}"' if expl else ''
        add.append(
            f'  {{ category: "grammar", lesson: {lesson}, scope: "{esc(scope)}", '
            f'text: "{esc(text)}", options: [{", ".join(chr(34)+esc(o)+chr(34) for o in opts)}], '
            f'answer: {LET[k["letter"]]}, level: "{level}"{expl_s} }},\n')
    txt = txt.replace('];\n', ''.join(add) + '];\n', 1) if txt.rstrip().endswith('];') else txt + ''.join(add)
    open(fn, 'w', encoding='utf-8').write(txt)
    print(f'appended {len([a for a in add if a.startswith("  {")])} grammar questions to L{lesson}')
