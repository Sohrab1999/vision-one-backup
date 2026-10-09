#!/usr/bin/env python3
"""Crop specific table-row regions and ask z-ai vision to transcribe them exactly."""
import subprocess, os, sys
from PIL import Image

BASE = os.path.dirname(os.path.abspath(__file__))
S = 150 / 72.0  # pt -> px at 150 dpi

def img_for(page):
    for cand in (f"pg{page}-0{page}.png", f"pg{page}-{page:03d}.png"):
        p = os.path.join(BASE, cand)
        if os.path.exists(p):
            return p
    raise FileNotFoundError(page)

def crop(page, y0, y1, name, x0=30, x1=580):
    im = Image.open(img_for(page))
    box = (int(x0 * S), int(y0 * S), int(x1 * S), int(y1 * S))
    c = im.crop(box)
    c = c.resize((c.width * 2, c.height * 2), Image.LANCZOS)
    out = os.path.join(BASE, f"crop_{name}.png")
    c.save(out)
    return out

JOBS = [
    # (page, y0pt, y1pt, name, question)
    (51, 400, 430, "p51_capital", "This image shows ONE row of a vocabulary table: an English word, its Persian meaning, another English word, its Persian meaning. Transcribe ALL text exactly, left to right, cell by cell. Copy Persian character-by-character (keep ی and ک)."),
    (9, 257, 287, "p9_persian", "This image shows ONE row of a vocabulary table. Transcribe ALL text exactly, left to right, cell by cell. Copy Persian character-by-character (keep ی and ک)."),
    (9, 535, 565, "p9_cousin", "This image shows ONE row of a vocabulary table. Transcribe ALL text exactly, left to right, cell by cell. Copy Persian character-by-character (keep ی and ک, keep parentheses and commas exactly)."),
    (19, 232, 262, "p19_study", "This image shows ONE row of a vocabulary table. Transcribe ALL text exactly, left to right, cell by cell. Copy Persian character-by-character."),
    (28, 533, 563, "p28_double", "This image shows ONE row of a vocabulary table. Transcribe ALL text exactly, left to right, cell by cell. Copy Persian character-by-character."),
    (36, 299, 329, "p36_allright", "This image shows ONE row of a vocabulary table. Transcribe ALL text exactly, left to right, cell by cell. Copy Persian character-by-character."),
    (61, 559, 589, "p61_pt1", "This image shows ONE row of a vocabulary table. Transcribe ALL text exactly, left to right, cell by cell. Copy Persian character-by-character."),
    (61, 628, 658, "p61_pt2", "This image shows ONE row of a vocabulary table. Transcribe ALL text exactly, left to right, cell by cell. Copy Persian character-by-character."),
    (51, 716, 746, "p51_icy", "This image shows ONE row of a vocabulary table. Transcribe ALL text exactly, left to right, cell by cell. Copy Persian character-by-character."),
]

if __name__ == "__main__":
    only = sys.argv[1:] or None
    for page, y0, y1, name, q in JOBS:
        if only and name not in only:
            continue
        img = crop(page, y0, y1, name)
        out = os.path.join(BASE, f"crop_{name}.json")
        r = subprocess.run(["z-ai", "vision", "-p", q, "-i", img, "-o", out],
                           cwd=BASE, capture_output=True, timeout=280)
        print(name, "OK" if r.returncode == 0 else f"FAIL {r.stderr.decode()[:200]}")
