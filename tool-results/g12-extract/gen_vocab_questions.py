#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Generate questions-lesson-N.ts (vocabulary part) for grade-12."""
import json, re

d = json.load(open('/tmp/g12_vocabtests.json'))
LET = {'a': 0, 'b': 1, 'c': 2, 'd': 3}

def clean_text(t):
    t = re.sub(r'\s+', ' ', t).strip()
    t = t.replace('-----------------', '________')
    t = re.sub(r'-{4,}', '________', t)
    t = t.replace('…', '...').replace('’', "'").replace('‘', "'")
    t = t.replace('“', '"').replace('”', '"')
    t = t.rstrip(' .') + '.' if not t.endswith(('.', '?', '!', ':')) else t
    # common text-layer fixes
    t = t.replace(' a / an ', ' a / an ')
    return t

def extract_expl(keyraw, matched):
    # remove the matched key prefix ")b( -1ترجمه تست" etc
    expl = keyraw
    m = re.match(r'^.*?ترجمه تست\s*"?\s*:?\s*', expl)
    if m:
        expl = expl[m.end():]
    else:
        expl = re.sub(r'^\)?\s*\(?[a-d]\)?\s*-\s*\d+\s*', '', expl)
        expl = re.sub(r'^\(\s*[a-d]\s*\)\s*-\s*\d+\s*', '', expl)
    expl = expl.strip().strip('"').strip()
    expl = expl.replace('".', '').replace('" .', '').replace('"', '')
    expl = re.sub(r'\s+', ' ', expl).strip()
    # repairs for layer damage
    fixes = {
        'تالش': 'تلاش', 'اخالقی': 'اخلاقی', 'کالس': 'کلاس',
        'سواالت': 'سؤالات', 'مالقات': 'ملاقات', 'منتیه': 'منتهی',
        'راسن': 'راستی', 'قدرداب': 'قدردان', 'عاقالنه': 'عاقلانه',
        'درسن': 'درستی', 'کاراگاه': 'کارآگاه', 'تصادفأ': 'تصادفاً',
        'میشود': 'می‌شود', 'نمیکند': 'نمی‌کند', 'میکنیم': 'می‌کنیم',
        'میآید': 'می‌آید', 'بازرسی': 'بازرسی',
    }
    for a, b in fixes.items():
        expl = expl.replace(a, b)
    return expl[:150]

LINES = open('/tmp/g12-full.txt', encoding='utf-8').read().split('\n')
BIDI = re.compile(r'[\u200e\u200f\u202a-\u202e\u2066-\u2069\u200b\u200c\u200d]')

def full_expl(line_no, letter, num):
    raw = BIDI.sub('', LINES[line_no - 1]).strip()
    m = re.match(r'^.*?\d+\s*', raw)
    chunk = raw
    buf = [chunk]
    joined = ' '.join(buf)
    # join following lines while the quoted translation is not closed
    i = line_no  # 0-based next line = line_no
    guard = 0
    while joined.count('"') % 2 == 1 and guard < 4 and i < len(LINES):
        nxt = BIDI.sub('', LINES[i]).strip()
        if not nxt or 'Vision Three' in nxt or 'جزوه جامع' in nxt:
            break
        buf.append(nxt)
        joined = ' '.join(buf)
        i += 1
        guard += 1
    return joined

def esc(s):
    return s.replace('\\', '\\\\').replace('"', '\\"')

def select(lesson):
    qs = d[f'L{lesson}']['questions']
    ks = d[f'L{lesson}']['keys']
    picked = []
    step = 4
    start = 1
    n = start
    while len(picked) < 25 and n <= 100:
        q = qs.get(str(n))
        k = ks.get(str(n))
        if q and k and len(q['options']) == 4 and '⟂' not in q['text']:
            opts = [re.sub(r'\s+', ' ', o).strip().rstrip('.') for o in q['options']]
            if all(opts) and len(set(o.lower() for o in opts)) == 4:
                ans = LET[k['letter']]
                rawfull = full_expl(k['line'], k['letter'], n)
                picked.append(dict(
                    no=n, text=clean_text(q['text']), options=opts,
                    answer=ans, expl=extract_expl(rawfull, k['letter'])))
        n += step
        if n > 100 and len(picked) < 25:
            # second pass: fill gaps with remaining unused
            for n2 in range(1, 101):
                if len(picked) >= 25:
                    break
                if n2 % step == start % step:
                    continue
                q = qs.get(str(n2))
                k = ks.get(str(n2))
                if q and k and len(q['options']) == 4 and n2 not in [p['no'] for p in picked] and '⟂' not in q['text']:
                    opts = [re.sub(r'\s+', ' ', o).strip().rstrip('.') for o in q['options']]
                    if all(opts) and len(set(o.lower() for o in opts)) == 4:
                        rawfull = full_expl(k['line'], k['letter'], n2)
                        picked.append(dict(no=n2, text=clean_text(q['text']), options=opts,
                                           answer=LET[k['letter']], expl=extract_expl(rawfull, k['letter'])))
            break
    picked.sort(key=lambda p: p['no'])
    return picked

HEADER = '''import type { QuizQuestionSeed } from "../types";

/**
 * سؤالات واژگان درس {lesson_fa} جزوه جامع پایه دوازدهم (Vision Three — تألیف جمال احمدی و همکاران).
 *
 * منبع (۲۵ سؤال از ۱۰۰): «۱۰۰ تست واژگان درس {lesson_fa}» صفحات {pages} جزوه
 * (سطح چاپ‌شدهٔ بخش: {level_print}) با کلید و ترجمهٔ چاپی در «پاسخنامه کلیدی و ترجمه ۱۰۰ تست واژگان»
 * صفحات {key_pages} — انتخاب به‌صورت پراکنده (هر چهار تست یکی) انجام شد تا پوشش واژگان درس حفظ شود.
 * اندیس پاسخ‌ها عین کلید چاپی جزوه است و توضیح هر سؤال از ترجمهٔ چاپی همان تست در پاسخنامه برگرفته شد.
 *
 * اصلاحیه: آسیب‌های لایه متن (خط‌تیرهٔ جای خالی، نیم‌فاصله و «لا») ترمیم شد؛
 * متن سؤال‌ها و گزینه‌ها عین چاپ جزوه است.
 */
export const QUESTIONS_LESSON_{lesson}: QuizQuestionSeed[] = [
'''

def gen(lesson):
    picked = select(lesson)
    scope = f"۱۰۰ تست واژگان درس {['اول','دوم','سوم'][lesson-1]}"
    pages = {1: "۲۱ تا ۲۵", 2: "۷۴ تا ۷۸", 3: "۱۳۲ تا ۱۳۶"}[lesson]
    key_pages = {1: "۱۸۱ تا ۱۸۴", 2: "۱۹۸ تا ۲۰۲", 3: "۲۱۵ تا ۲۱۸"}[lesson]
    level_print = {1: "استاندارد و کنکوری (بدون برچسب تک‌تست)", 2: "استاندارد", 3: "استاندارد"}[lesson]
    lesson_fa = ['اول', 'دوم', 'سوم'][lesson-1]
    hdr = (HEADER.replace('{lesson_fa}', lesson_fa).replace('{pages}', pages)
           .replace('{level_print}', level_print).replace('{key_pages}', key_pages)
           .replace('{lesson}', str(lesson)))
    lines = [hdr]
    for p in picked:
        opts = ', '.join(f'"{esc(o)}"' for o in p['options'])
        expl = f', explanation: "{esc(p["expl"])}"' if p['expl'] else ''
        lines.append(
            f'  {{ category: "vocabulary", lesson: {lesson}, scope: "{scope}", '
            f'text: "{esc(p["text"])}", options: [{opts}], answer: {p["answer"]}, '
            f'level: "استاندارد"{expl} }},\n')
    lines.append('];\n')
    out = ''.join(lines)
    fn = f'/home/z/my-project/src/data/grade-12/questions-lesson-{lesson}.ts'
    open(fn, 'w', encoding='utf-8').write(out)
    print(f'wrote {fn}: {len(picked)} questions, nos={[p["no"] for p in picked]}')

for L in (1, 2, 3):
    gen(L)
