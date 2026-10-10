#!/usr/bin/env python3
"""Reconstruct table cells from pdftotext -bbox XML: cluster words into the 4 columns by x-center."""
import re, sys, html

def parse(path):
    words = []  # (page, xmin, ymin, xmax, ymax, text)
    for m in re.finditer(r'<word xMin="([\d.]+)" yMin="([\d.]+)" xMax="([\d.]+)" yMax="([\d.]+)">([^<]*)</word>', open(path, encoding='utf-8').read()):
        x0, y0, x1, y1, t = float(m.group(1)), float(m.group(2)), float(m.group(3)), float(m.group(4)), html.unescape(m.group(5))
        words.append((x0, y0, x1, y1, t))
    return words

def is_fa(t):
    return any('\u0600' <= c <= '\u06FF' or '\uFB50' <= c <= '\uFEFF' for c in t)

def run(path, bands):
    words = parse(path)
    # group into lines by y-center
    words.sort(key=lambda w: (w[1] + w[3]) / 2)
    lines, cur, cury = [], [], None
    for w in words:
        yc = (w[1] + w[3]) / 2
        if cury is None or abs(yc - cury) < 14:
            cur.append(w); cury = yc if cury is None else (cury + yc) / 2
        else:
            lines.append(cur); cur = [w]; cury = yc
    if cur: lines.append(cur)
    out = []
    for ln in lines:
        cells = [[] for _ in bands]
        for w in sorted(ln, key=lambda w: w[0]):
            xc = (w[0] + w[2]) / 2
            for i, (a, b) in enumerate(bands):
                if a <= xc < b:
                    cells[i].append(w[4]); break
        if any(cells):
            out.append(' | '.join(' '.join(c) if c else '-' for c in cells))
    return '\n'.join(out)

if __name__ == '__main__':
    path = sys.argv[1]
    bands = [(float(x) for x in b.split(',')) for b in sys.argv[2].split(';')]
    print(run(path, bands))
