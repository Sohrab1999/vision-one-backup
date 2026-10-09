#!/usr/bin/env python3
"""Run z-ai vision CLI on half-page crops with anchored expected word lists."""
import json, subprocess, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from expected import EXPECTED

BASE = os.path.dirname(os.path.abspath(__file__))
PROMPT = """This image is ONE HALF of a vocabulary table page from a Persian English-learning textbook (scanned, slightly noisy print). The half contains two columns: the ENGLISH word column and the PERSIAN meaning column next to it.

Here is the expected ordered list of English words in this column, top to bottom:
{words}

TASK: Transcribe EVERY visible row exactly as printed, one line per row, in this format:
ENGLISH ::: PERSIAN

STRICT RULES:
1. English: copy EXACTLY as printed in the image (the expected list is only a hint; if the image shows a different/extra/missing word, follow the IMAGE).
2. Persian: copy EXACTLY character-by-character as printed. Keep Persian letters ی and ک. Do NOT normalize spelling, do NOT fix grammar, do NOT add/remove/reorder synonyms, do NOT paraphrase. Keep separators exactly (e.g. " - " and "،") and the same order of meanings as printed.
3. If a Persian cell is truly unreadable, output the English word followed by ::: ???
4. Do not skip rows, do not merge rows, no numbering, no commentary. Output ONLY the lines."""

def run_one(page, half):
    out = os.path.join(BASE, f"a{page:03d}{half}.json")
    if os.path.exists(out):
        print(f"skip {page}{half} (exists)"); return
    words = "\n".join(EXPECTED[page][half])
    img = os.path.join(BASE, f"{'r' if half=='R' else 'l'}{page:03d}.png")
    p = PROMPT.format(words=words)
    subprocess.run(["z-ai", "vision", "-p", p, "-i", img, "-o", out],
                   cwd=BASE, capture_output=True, timeout=280)

if __name__ == "__main__":
    jobs = sys.argv[1:] or [f"{p}{h}" for p in EXPECTED for h in ("L", "R")]
    for j in jobs:
        run_one(int(j[:-1]), j[-1])
        print("done", j)
