#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Extract grade-12 vocab MCQ tests (questions + printed keys)."""
import re, json

BIDI = re.compile(r'[\u200e\u200f\u202a-\u202e\u2066-\u2069\u200b\u200c\u200d]')

def clean(s):
    return BIDI.sub('', s).replace('\u00a0', ' ').strip()

def parse_questions(lines, lo, hi):
    """parse numbered MCQ questions: 'N. text' + 'a. x b. y c. z d. w'"""
    questions = {}
    cur = None  # dict(no, text, options)
    footer = re.compile(r'Vision Three|جزوه جامع|تألی')
    opt_re = re.compile(r'\ba[.\)]\s*(.*?)\s{2,}b[.\)]\s*(.*?)\s{2,}c[.\)]\s*(.*?)\s{2,}d[.\)]\s*(.*)$')
    for idx in range(lo, hi):
        raw = clean(lines[idx])
        if not raw or footer.search(raw):
            continue
        m = re.match(r'^(\d{1,3})\s*[\.\)]\s*(.*)$', raw)
        if m:
            num = int(m.group(1))
            rest = m.group(2).strip()
            if 1 <= num <= 100:
                # if current question has no options yet and rest is plain text, it's continuation of text
                if cur and not cur['options'] and cur.get('pending_cont'):
                    cur['text'] += ' ' + raw.strip()
                    continue
                cur = dict(no=num, text=rest, options=[], cont=False)
                questions[num] = cur
                continue
        if cur is None:
            continue
        om = opt_re.search(raw)
        if om and not cur['options']:
            cur['options'] = [clean(om.group(i)) for i in range(1, 5)]
        elif not cur['options'] and re.match(r'^a[.\)]', raw):
            # options on separate lines — accumulate
            cur['text'] += ' ⟂OPTS⟂ ' + raw
        elif not cur['options']:
            # continuation of question text
            cur['text'] += ' ' + raw
    return questions

def parse_keys(lines, lo, hi):
    """parse verbose keys: ')b( -1 ترجمه تست : "..."' / '(b) -6' / '(a)-10' / '-3 گزینه (c)'"""
    keys = {}
    pats = [
        re.compile(r'\)\s*([a-d])\s*\(\s*-\s*(\d{1,3})(?!\d)'),      # flipped: )b( -2
        re.compile(r'\(\s*([a-d])\s*\)\s*-\s*(\d{1,3})(?!\d)'),      # normal: (b) -6 / (b)-11
        re.compile(r'(?<!\d)(\d{1,3})\s*\)?\s*-\s*\(\s*([a-d])\s*\)'),  # 10 (a)
        re.compile(r'-(\d{1,3})\s*گزینه\s*\(\s*([a-d])\s*\)'),   # -3 گزینه (c)
    ]
    for idx in range(lo, hi):
        raw = clean(lines[idx])
        if not raw:
            continue
        for pi, pat in enumerate(pats):
            m = pat.search(raw)
            if m:
                g1, g2 = m.group(1), m.group(2)
                if g1 in 'abcd':
                    letter, num = g1, int(g2)
                else:
                    num, letter = int(g1), g2
                if 1 <= num <= 100 and num not in keys:
                    keys[num] = dict(letter=letter, line=idx + 1, raw=raw[:80])
                break
    return keys

def main():
    lines = open('/tmp/g12-full.txt', encoding='utf-8').read().split('\n')
    out = {}
    specs = {
        'L1': dict(q=(857, 1088), k=(8420, 9252)),
        'L2': dict(q=(3398, 3995), k=(9507, 10231)),
        'L3': dict(q=(6163, 6605), k=(10444, 11147)),
    }
    for name, sp in specs.items():
        qs = parse_questions(lines, *sp['q'])
        ks = parse_keys(lines, *sp['k'])
        out[name] = {'questions': qs, 'keys': ks}
        n_opt = sum(1 for q in qs.values() if len(q['options']) == 4)
        matched = sum(1 for n in qs if n in ks)
        print(f'{name}: questions={len(qs)} with4opts={n_opt} keys={len(ks)} matched={matched}')
    json.dump(out, open('/tmp/g12_vocabtests.json', 'w'), ensure_ascii=False)

if __name__ == '__main__':
    main()
