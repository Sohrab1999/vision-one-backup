#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Parse grade-12 vocab tables from /tmp/g12-full.txt (4-column RTL layout)."""
import re, json, sys

BIDI = re.compile(r'[\u200e\u200f\u202a-\u202e\u2066-\u2069\u200b\u200c\u200d]')

def clean(s):
    return BIDI.sub('', s).replace('\u00a0', ' ').strip()

LATIN = re.compile(r'[A-Za-z]')
PERSIAN = re.compile(r'[\u0600-\u06FF]')

def spans(line):
    """return list of (start, end, text, kind) for latin and persian runs"""
    out = []
    n = len(line)
    cur_kind = None
    start = 0
    for i in range(n + 1):
        ch = line[i] if i < n else ' '
        if LATIN.match(ch):
            k = 'L'
        elif PERSIAN.match(ch):
            k = 'P'
        else:
            k = None
        if k != cur_kind:
            if cur_kind in ('L', 'P'):
                out.append((start, i, line[start:i], cur_kind))
            cur_kind = k
            start = i
    return out

def skip_line(t):
    return any(m in t for m in [
        'تألی', 'Vision Three', 'جزوه جامع', 'لغات کلیدی', 'لغ ـ ـات',
        'Persian Meanings', 'Words', 'کلی', 'و تکمی',
    ])

def parse_range(lines, lo, hi):
    rows = []
    pending = []
    skipped = []
    for idx in range(lo, hi):
        raw = lines[idx]
        raw = BIDI.sub('', raw)  # strip bidi first so gaps are real
        t = clean(raw)
        if not t:
            continue
        sp = spans(raw)
        lats = [s for s in sp if s[3] == 'L']
        pers = [s for s in sp if s[3] == 'P']
        if skip_line(t):
            skipped.append((idx + 1, 'skip', t[:60]))
            continue
        if not lats and pers:
            if rows:
                frag = ' '.join(clean(p[2]) for p in pers)
                fx = pers[0][0]
                pending.append((idx + 1, fx, frag))
            continue
        if not lats and not pers:
            continue
        w1 = clean(lats[0][2]) if lats else ''
        w2 = ''
        w1x = lats[0][0] if lats else 0
        w2x = None
        # cluster latin runs into words: gap <= 4 chars => same word (handles "at all", "A.D.", "a set of")
        clusters = []
        for l in lats:
            if clusters and l[0] - clusters[-1][1] <= 4:
                clusters[-1] = (clusters[-1][0], l[1])
            else:
                clusters.append((l[0], l[1]))
        # rebuild cluster texts from original line
        texts = []
        for (a, b) in clusters:
            seg = raw[a:b]
            texts.append((a, b, clean(re.sub(r'[\s]+', ' ', seg))))
        w1 = texts[0][2] if texts else ''
        w1x = texts[0][0] if texts else 0
        if len(texts) > 1:
            w2 = texts[1][2]
            w2x = texts[1][0]
        extra_latin = [t[2] for t in texts[2:]]
        chunks = []
        for p in pers:
            if chunks and p[0] - chunks[-1][1] <= 6:
                chunks[-1] = (chunks[-1][0], p[1], chunks[-1][2] + ' ' + clean(p[2]))
            else:
                chunks.append((p[0], p[1], clean(p[2])))
        m1 = chunks[0][2] if len(chunks) > 0 else ''
        m1x = chunks[0][0] if len(chunks) > 0 else None
        m2 = chunks[1][2] if len(chunks) > 1 else ''
        m2x = chunks[1][0] if len(chunks) > 1 else None
        rows.append(dict(no=idx + 1, w1=w1, m1=m1, m1x=m1x, w2=w2, m2=m2, m2x=m2x, w2x=w2x,
                         extra_latin=[clean(l[2]) for l in lats[2:]],
                         extra_chunks=[c[2] for c in chunks[2:]]))
    for (no, fx, frag) in pending:
        if not rows:
            continue
        r = rows[-1]
        if r['w2']:
            target = 'm2' if (r['m2x'] is None or fx >= (r['w2x'] or 0) + 30) else 'm1'
        else:
            target = 'm1'
        r[target] = (r[target] + ' ' + frag).strip() if r[target] else frag
        r.setdefault('cont', []).append((no, target, frag))
    return rows, skipped, pending

def main():
    with open('/tmp/g12-full.txt', encoding='utf-8') as f:
        lines = f.read().split('\n')
    ranges = {'L1': (242, 428), 'L2': (2656, 2922), 'L3': (5335, 5551)}
    result = {}
    for name, (lo, hi) in ranges.items():
        rows, skipped, pending = parse_range(lines, lo, hi)
        result[name] = rows
        print(f'== {name}: {len(rows)} rows, {len(skipped)} skipped, {len(pending)} continuations')
        with open(f'/tmp/vocab_{name}.tsv', 'w', encoding='utf-8') as f:
            for r in rows:
                flags = []
                if not r['w1'] or not r['m1']:
                    flags.append('MISS1')
                if not r['w2'] or not r['m2']:
                    flags.append('MISS2')
                if r['extra_latin']:
                    flags.append('EXTRA_L:' + '|'.join(r['extra_latin']))
                if r['extra_chunks']:
                    flags.append('EXTRA_P:' + '|'.join(r['extra_chunks']))
                if r.get('cont'):
                    flags.append('CONT:' + ';'.join(f"{c[1]}@{c[0]}:{c[2][:25]}" for c in r['cont']))
                f.write(f"{r['no']}\t{r['w1']}\t{r['m1']}\t{r['w2']}\t{r['m2']}\t{' '.join(flags)}\n")
    json.dump(result, open('/tmp/vocab_raw.json', 'w', encoding='utf-8'), ensure_ascii=False)

if __name__ == '__main__':
    main()
