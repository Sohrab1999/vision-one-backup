#!/usr/bin/env python3
"""Assemble lesson vocabulary lists from VLM quadrant transcriptions."""
import json, re, sys, glob

def load(f):
    raw = json.load(open(f, encoding='utf-8'))
    c = raw['choices'][0]['message']['content'].strip()
    c = re.sub(r'^```(json)?\s*|\s*```$', '', c, flags=re.M).strip()
    i, j = c.find('['), c.rfind(']')
    return json.loads(c[i:j+1])

def norm_w(w):
    return re.sub(r'\s+', ' ', w.replace('\u200c', ' ').replace('\u200f', ' ').replace('\u200e', ' ')).strip().lower()

def merge_overlap(top, bottom):
    """Drop rows from `bottom` that duplicate the tail of `top` (matched by english word)."""
    if not top or not bottom:
        return top + bottom
    maxk = min(len(top), len(bottom), 4)
    for k in range(maxk, 0, -1):
        if [norm_w(r['w']) for r in top[-k:]] == [norm_w(r['w']) for r in bottom[:k]]:
            return top + bottom[k:]
    return top + bottom

def assemble(prefix):
    lt = load(f'vlm-{prefix}-LT.json')
    lb = load(f'vlm-{prefix}-LB.json')
    rt = load(f'vlm-{prefix}-RT.json')
    rb = load(f'vlm-{prefix}-RB.json')
    left = merge_overlap(lt, lb)
    right = merge_overlap(rt, rb)
    return left, right

def clean_row(r):
    w = re.sub(r'\s+', ' ', r.get('w', '')).strip()
    m = re.sub(r'\s+', ' ', r.get('m', '')).strip()
    return {'w': w, 'm': m}

if __name__ == '__main__':
    pages = sys.argv[1:]
    for p in pages:
        left, right = assemble(p)
        print(f'===== PAGE {p} : LEFT ({len(left)}) =====')
        for r in left:
            r = clean_row(r)
            print(f"{r['w']} :: {r['m']}")
        print(f'===== PAGE {p} : RIGHT ({len(right)}) =====')
        for r in right:
            r = clean_row(r)
            print(f"{r['w']} :: {r['m']}")
