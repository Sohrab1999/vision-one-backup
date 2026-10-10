#!/usr/bin/env python3
"""Parse the cleaned layout text-layer into (english, persian) row pairs, aligned to VLM words."""
import re, sys

def clean(txt):
    txt = re.sub(r'[\u200e\u200f\u202a-\u202e\u2066-\u2069\ufeff]', '', txt)
    lines = [re.sub(r'[ \t]+', ' ', l).strip() for l in txt.splitlines()]
    return [l for l in lines if l]

SKIP_PAT = re.compile(r'(Persian Meanings|لغ|تألی|Vision One|Telegram Channel|^\d{2,3}$)')

ASCII_SEG = re.compile(r"[A-Za-z0-9][A-Za-z0-9 ().,'’/:\-…?!\[\]]*[A-Za-z0-9).,…\-?!\]]|[A-Za-z]")
AR_SEG = re.compile(r'[\u0600-\u06FF][\u0600-\u06FF0-9 ()\.,،؛:\-‑–]*[\u0600-\u06FF\)\.،]|[\u0600-\u06FF]')

def segments(line):
    """Yield ('E'|'P', text) in visual order, roughly."""
    out = []
    i = 0
    n = len(line)
    while i < n:
        ch = line[i]
        if re.match(r'[A-Za-z]', ch):
            m = ASCII_SEG.match(line, i)
            out.append(('E', m.group(0)))
            i = m.end()
        elif re.match(r'[\u0600-\u06FF]', ch):
            m = AR_SEG.match(line, i)
            out.append(('P', m.group(0)))
            i = m.end()
        else:
            i += 1
    return out

def parse_page(txtfile, pagenums):
    txt = open(txtfile, encoding='utf-8').read()
    lines = clean(txt)
    # split into page blocks at footer lines containing page number at end
    blocks = []
    cur = []
    for l in lines:
        cur.append(l)
        m = re.search(r'(\d{2,3})\s*$', l)
        if m and ('تألی' in l or 'Vision' in l or 'جزوه' in l):
            blocks.append((int(m.group(1)), cur))
            cur = []
    if cur: blocks.append((None, cur))
    result = {}
    for pnum, block in blocks:
        if pnum not in pagenums: continue
        rows = []  # list of dicts {w, m, half}
        # halves: left = first E-P pair per line, right = second pair
        pending = {'L': None, 'R': None}
        def push(half, w, m):
            rows.append({'half': half, 'w': w, 'm': m})
        for l in block:
            if SKIP_PAT.search(l): continue
            segs = segments(l)
            es = [s for s in segs if s[0] == 'E']
            ps = [s for s in segs if s[0] == 'P']
            # interleave: E P E P
            if es:
                # pair each E with following P; P before first E belongs to previous row (continuation)
                idx = {i: segs[i] for i in range(len(segs))}
                # find positions
                pairs = []
                cur_e = None
                cur_p = []
                # first, leading Ps (continuation of previous row)
                k = 0
                while k < len(segs) and segs[k][0] == 'P':
                    cur_p.append(segs[k][1]); k += 1
                if cur_p and rows:
                    rows[-1]['m'] += ' ' + ' '.join(cur_p)
                cur_e = None; cur_p = []
                for s in segs[k:]:
                    if s[0] == 'E':
                        if cur_e is not None:
                            pairs.append((cur_e, ' '.join(cur_p)))
                        cur_e = s[1]; cur_p = []
                    else:
                        cur_p.append(s[1])
                if cur_e is not None:
                    pairs.append((cur_e, ' '.join(cur_p)))
                for i, (w, m) in enumerate(pairs):
                    push('L' if i == 0 else 'R', w, m)
            else:
                # pure persian continuation line: append to last row of each half?
                if len(ps) >= 2:
                    if rows: rows[-1]['m'] += ' ' + ps[0][1]
                    # second persian belongs to right half's last row
                    for r in reversed(rows):
                        if r['half'] == 'R':
                            r['m'] += ' ' + ' '.join(p[1] for p in ps[1:])
                            break
                elif ps and rows:
                    rows[-1]['m'] += ' ' + ps[0][1]
        result[pnum] = rows
    return result

if __name__ == '__main__':
    tf = sys.argv[1]
    pagenums = set(int(x) for x in sys.argv[2:])
    res = parse_page(tf, pagenums)
    for pnum in sorted(res):
        print(f'--- page {pnum} ({len(res[pnum])} rows) ---')
        for r in res[pnum]:
            print(f"[{r['half']}] {r['w']} :: {r['m']}")
