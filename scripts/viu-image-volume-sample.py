#!/usr/bin/env python3
# VIU Image Roadmap — Phase 1 (read-only visual census) — real volume estimation.
#
# Renders the ~10 selected diverse census pages (in /tmp only) at 120 and 200 DPI via
# pdftoppm, converts each to WebP (Pillow, quality 80 method 6; plus a quality-70 variant
# at 120 DPI), and records real byte sizes. No image file is committed or stored outside
# /tmp — only the JSON size table is written.
#
# Usage: python3 scripts/viu-image-volume-sample.py <tmpDir> <outJson>
# Expected layout (produced by the census step): <tmpDir>/{elem,preint,upper}/p-NNN.jpg

import json
import os
import subprocess
import sys

from PIL import Image

TMP = sys.argv[1] if len(sys.argv) > 1 else "/tmp/viu-img"
OUT = sys.argv[2] if len(sys.argv) > 2 else os.path.join(TMP, "volume-sample.json")

PDFS = {
    "elem": os.path.join("/home/z/my-project", "upload", "Vocabulary In Use-Elementary 2nd Edition.pdf"),
    "preint": os.path.join("/home/z/my-project", "upload", "Vocabulary In Use-Pre Int & Int 2nd Edition.pdf"),
    "upper": os.path.join("/home/z/my-project", "upload", "Vocabulary In Use-Upper Intermediate 2nd Edition.pdf"),
}

# 10 diverse pages chosen from the census: picture-dictionary / drawing / table / photo / chart / text-only
SAMPLES = [
    ("elem", 31, "picture-dictionary"),
    ("elem", 15, "drawing-large"),
    ("elem", 42, "table"),
    ("elem", 47, "text-only"),
    ("preint", 19, "picture-dictionary"),
    ("preint", 125, "photo"),
    ("preint", 207, "text-only"),
    ("upper", 12, "chart-diagram"),
    ("upper", 20, "drawing-medium"),
    ("upper", 188, "text-only"),
]

rows = []
for key, page, kind in SAMPLES:
    base = f"_vol_{key}_{page}"
    rec = {"book": key, "pdfPage": page, "kind": kind, "sizes": {}}
    for dpi in (120, 200):
        png = os.path.join(TMP, f"{base}-{dpi}.png")
        subprocess.run(
            ["pdftoppm", "-f", str(page), "-l", str(page), "-r", str(dpi), "-png", PDFS[key],
             os.path.join(TMP, f"{base}-{dpi}")],
            check=True, capture_output=True,
        )
        # pdftoppm appends zero-padded page number: _vol_<key>_<page>-<dpi>-<NNN>.png
        import glob
        matches = sorted(glob.glob(os.path.join(TMP, f"{base}-{dpi}-*.png")))
        if not matches:
            raise FileNotFoundError(f"pdftoppm produced no PNG for {key} p{page} @{dpi}")
        img = Image.open(matches[0]).convert("RGB")
        w, h = img.size
        for q in (80, 70):
            webp = os.path.join(TMP, f"{base}-{dpi}-q{q}.webp")
            img.save(webp, "WEBP", quality=q, method=6)
            rec["sizes"][f"webp{dpi}q{q}"] = os.path.getsize(webp)
            os.remove(webp)
        rec["px"] = [w, h]
        os.remove(matches[0])
    rows.append(rec)

with open(OUT, "w") as f:
    json.dump(rows, f, indent=1)

# table + scenario math
def kb(n):
    return round(n / 1024, 1)

print(f"{'book':6} {'page':>5} {'kind':<20} {'px':>12} {'120q80':>9} {'120q70':>9} {'200q80':>9}")
for r in rows:
    s = r["sizes"]
    print(f"{r['book']:6} {r['pdfPage']:>5} {r['kind']:<20} {str(r['px']):>12} {kb(s['webp120q80']):>9} {kb(s['webp120q70']):>9} {kb(s['webp200q80']):>9}")

art = [r for r in rows if r["kind"] != "text-only"]
txt = [r for r in rows if r["kind"] == "text-only"]
avg = {
    "artwork120q80": kb(sum(r["sizes"]["webp120q80"] for r in art) / len(art)),
    "artwork120q70": kb(sum(r["sizes"]["webp120q70"] for r in art) / len(art)),
    "artwork200q80": kb(sum(r["sizes"]["webp200q80"] for r in art) / len(art)),
    "all120q80": kb(sum(r["sizes"]["webp120q80"] for r in rows) / len(rows)),
    "all200q80": kb(sum(r["sizes"]["webp200q80"] for r in rows) / len(rows)),
    "textOnly120q80": kb(sum(r["sizes"]["webp120q80"] for r in txt) / len(txt)),
}
print("\naverages:", json.dumps(avg))

# scenario page counts (from census aggregates)
LESSON_PAGES_ALL = 517          # elem 120 + preint 200 + upper 197 (upper L52 missing, L16 single-page)
ARTWORK_LESSONS = 212           # elem 59 + preint 75 + upper 78 (hasArtwork)
SCENARIOS = {
    "pilot_10_lessons": {"pages": 20, "kb120": round(20 * avg["all120q80"]), "kb200": round(20 * avg["all200q80"])},
    "pilot_5_lessons": {"pages": 10, "kb120": round(10 * avg["all120q80"]), "kb200": round(10 * avg["all200q80"])},
    "artwork_lessons_only": {"pages": ARTWORK_LESSONS * 2, "kb120": round(ARTWORK_LESSONS * 2 * avg["artwork120q80"]), "kb200": round(ARTWORK_LESSONS * 2 * avg["artwork200q80"])},
    "all_lessons": {"pages": LESSON_PAGES_ALL, "kb120": round(LESSON_PAGES_ALL * avg["all120q80"]), "kb200": round(LESSON_PAGES_ALL * avg["all200q80"])},
}
for name, s in SCENARIOS.items():
    print(f"{name}: pages={s['pages']} · ~{s['kb120']} MB@120q80".replace("MB", "KB") + f" · ~{s['kb200']}KB@200q80")

summary = {"rows": rows, "averages": avg, "scenarios": SCENARIOS,
           "assumptions": {"lessonPagesAll": LESSON_PAGES_ALL, "artworkLessons": ARTWORK_LESSONS,
                           "note": "artwork_lessons_only assumes both pages of each artwork lesson rendered at artwork-average size (conservative upper band)"}}
with open(OUT, "w") as f:
    json.dump(summary, f, indent=1)
print(f"\nWROTE {OUT}")
