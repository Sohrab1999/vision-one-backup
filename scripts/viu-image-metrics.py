#!/usr/bin/env python3
# VIU Image Roadmap — Phase 1 (read-only visual census) — page-level image-metric prefilter.
#
# Purpose: the three VIU PDFs are pure scans (zero text layer). This script renders NOTHING;
# it reads the pdftoppm renders produced in /tmp (see roadmap فاز ۱: رندر فقط در /tmp) and
# computes cheap per-page statistics that predict "does this lesson page contain non-text
# visual content (illustration / picture panel / photo / drawing)".
#
# Metrics per page (computed on a downscaled RGB copy):
#   colored  — fraction of pixels with channel spread > 30 and value > 60 (color ink)
#   mid      — fraction of pixels with 60 <= luminance <= 215 (mid-tones: grey shades,
#              colored panels — text glyphs are darker than 60, paper is brighter than 215)
#   dark     — fraction of pixels with luminance < 60 (text ink / black drawing lines)
#   bandRows — fraction of pixel rows that contain a contiguous visual run covering >= 12%
#              of the row width (illustrations occupy contiguous row bands; text lines are
#              sparse and thin)
#
# Pages are then scored: candidate = colored>TC or mid>TM or band>TB (thresholds printed as
# the tail of the sorted distributions so the operator can calibrate before choosing).
#
# Usage: python3 scripts/viu-image-metrics.py <imagesDir> <outJson> [width]
# READ-ONLY w.r.t. the repository: writes only the JSON file you point it at (use /tmp during
# the census; commit only the final aggregated census JSON under docs/qa/).

import json
import os
import sys

from PIL import Image

DIR = sys.argv[1] if len(sys.argv) > 1 else "/tmp/viu-img/elem"
OUT = sys.argv[2] if len(sys.argv) > 2 else "/tmp/viu-img/metrics.json"
TARGET_W = int(sys.argv[3]) if len(sys.argv) > 3 else 260

results = []
files = sorted(f for f in os.listdir(DIR) if f.startswith("p-") and f.endswith((".jpg", ".png")))

for name in files:
    page = int(name.split("-")[1].split(".")[0])
    img = Image.open(os.path.join(DIR, name)).convert("RGB")
    w, h = img.size
    if w > TARGET_W:
        img = img.resize((TARGET_W, max(1, int(h * TARGET_W / w))), Image.BILINEAR)
    px = list(img.getdata())
    n = len(px)
    W, H = img.size

    colored = mid = dark = 0
    row_visual = []
    for y in range(H):
        row = px[y * W : (y + 1) * W]
        vcount = 0
        for r, g, b in row:
            mx, mn = max(r, g, b), min(r, g, b)
            lum = (r * 299 + g * 587 + b * 114) // 1000
            if mx - mn > 30 and mx > 60:
                colored += 1
                vcount += 1
            elif 60 <= lum <= 215:
                mid += 1
                vcount += 1
            elif lum < 60:
                dark += 1
        row_visual.append(vcount >= max(2, int(W * 0.12)))

    # merge consecutive visual rows into bands; ignore bands shorter than 3 rows (text ascenders)
    bands = 0
    run = 0
    band_rows = 0
    for v in row_visual:
        if v:
            run += 1
        else:
            if run >= 3:
                bands += 1
                band_rows += run
            run = 0
    if run >= 3:
        bands += 1
        band_rows += run

    results.append(
        {
            "page": page,
            "colored": round(colored / n, 4),
            "mid": round(mid / n, 4),
            "dark": round(dark / n, 4),
            "bands": bands,
            "bandRows": round(band_rows / H, 4),
        }
    )

os.makedirs(os.path.dirname(OUT) or ".", exist_ok=True)
with open(OUT, "w") as f:
    json.dump(results, f)

# --- distribution tails for threshold calibration ---
def tail(key, k=15):
    rows = sorted(results, key=lambda r: r[key])
    print(f"--- lowest {k} by {key} ---")
    for r in rows[:k]:
        print(f"  p{r['page']:>3} {key}={r[key]:.3f} mid={r['mid']:.3f} colored={r['colored']:.3f} bandRows={r['bandRows']:.3f}")
    print(f"--- highest {k} by {key} ---")
    for r in rows[-k:]:
        print(f"  p{r['page']:>3} {key}={r[key]:.3f} mid={r['mid']:.3f} colored={r['colored']:.3f} bandRows={r['bandRows']:.3f}")

tail("mid")
tail("colored")
tail("bandRows")
print(f"WROTE {OUT} ({len(results)} pages)")
