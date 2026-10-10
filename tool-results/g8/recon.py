#!/usr/bin/env python3
"""Definitive 4-column cell reconstruction for grade-8 vocab pages from pdftotext -bbox XML.

Physical columns (visual left->right): کلمه(2) | معنی(2) | کلمه(1) | معنی(1)
Bands by word x-center: [0,150) w2 | [150,306) m2 | [306,432) w1 | [432,570) m1
Persian tokens are stored visual-reversed -> reverse each token, order tokens right-to-left.
"""
import re, sys, html

FA = lambda t: any('\u0600' <= c <= '\u06FF' or '\uFB50' <= c <= '\uFEFF' for c in t)

def words_of(path):
    W = []
    for m in re.finditer(r'<word xMin="([\d.]+)" yMin="([\d.]+)" xMax="([\d.]+)" yMax="([\d.]+)">([^<]*)</word>', open(path, encoding='utf-8').read()):
        W.append(dict(x0=float(m.group(1)), y0=float(m.group(2)), x1=float(m.group(3)),
                      y1=float(m.group(4)), t=html.unescape(m.group(5))))
    return W

def reconstruct(path):
    W = words_of(path)
    W.sort(key=lambda w: (w['y0'] + w['y1']) / 2)
    lines, cur, cy = [], [], None
    for w in W:
        yc = (w['y0'] + w['y1']) / 2
        if cy is None or abs(yc - cy) <= 7:
            cur.append(w); cy = yc if cy is None else (cy * len(cur) + yc) / (len(cur) + 1)
        else:
            lines.append(cur); cur = [w]; cy = yc
    if cur: lines.append(cur)
    BANDS = [(0, 150), (150, 306), (306, 432), (432, 570)]
    out = []
    for ln in lines:
        cells = [[] for _ in BANDS]
        for w in ln:
            xc = (w['x0'] + w['x1']) / 2
            for i, (a, b) in enumerate(BANDS):
                if a <= xc < b:
                    cells[i].append(w); break
        if not any(cells):
            continue
        parts = []
        for c in cells:
            en = sorted([w for w in c if not FA(w['t'])], key=lambda w: w['x0'])
            fa = sorted([w for w in c if FA(w['t'])], key=lambda w: -w['x0'])
            en_s = ' '.join(w['t'] for w in en)
            fa_s = ' '.join(w['t'][::-1] for w in fa)
            parts.append((en_s + ' ' + fa_s).strip() or '·')
        y = round(ln[0]['y0'])
        out.append(f"y{y:3d} | " + ' ┃ '.join(parts))
    return '\n'.join(out)

if __name__ == '__main__':
    for arg in sys.argv[1:]:
        page = arg.replace('b', '').replace('.xml', '')
        print(f"########## PAGE {page} ##########")
        print(reconstruct(arg))
        print()
