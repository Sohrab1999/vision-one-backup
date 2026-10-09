#!/usr/bin/env python3
"""Verify vocab table pairing on grade-8 جزوه pages via z-ai vision CLI."""
import subprocess, sys, os

BASE = os.path.dirname(os.path.abspath(__file__))
PAGES = [9, 19, 28, 29, 36, 37, 42, 43, 51, 52, 61]

PROMPT = """This is a page from a Persian English-learning textbook (جزوه زبان انگلیسی پایه هشتم). It contains a two-column vocabulary TABLE: each table row holds TWO word-meaning pairs. The table is RTL: the RIGHT pair is کلمه(1)/معنی(1) and the LEFT pair is کلمه(2)/معنی(2). Some rows also continue a section titled «کلمات مربوط به آخر کتاب (دیکشنری تصاویر)» — transcribe those rows too, they are regular pairs.

TASK: Transcribe EVERY visible table row exactly as printed, one line per row, in this format (right pair first, then left pair):
WORD_1 ::: MEANING_1 ::: WORD_2 ::: MEANING_2

STRICT RULES:
1. If a row has only ONE pair (the other cell is a section header or empty), output: WORD_1 ::: MEANING_1 ::: - :::
2. Copy English words EXACTLY as printed (keep capitalization, punctuation like ? and …, parentheses).
3. Copy Persian meanings EXACTLY character-by-character. Keep ی and ک. Do NOT fix spelling, do NOT reorder synonyms, keep separators (، , -) exactly.
4. Skip the page header, the intro paragraphs, conversation translations, and dotted lines. Only the vocabulary table.
5. Do not skip rows, do not merge rows, no numbering, no commentary. Output ONLY the lines."""

def run(page):
    out = os.path.join(BASE, f"v{page:03d}.json")
    if os.path.exists(out):
        print(f"skip {page} (exists)"); return
    img = os.path.join(BASE, f"pg{page}-0{page}.png")
    p = subprocess.run(["z-ai", "vision", "-p", PROMPT, "-i", img, "-o", out],
                       cwd=BASE, capture_output=True, timeout=280)
    if p.returncode != 0:
        print(f"FAIL {page}: {p.stderr.decode()[:300]}")
    else:
        print(f"done {page}")

if __name__ == "__main__":
    pages = [int(x) for x in sys.argv[1:]] or PAGES
    for pg in pages:
        run(pg)
