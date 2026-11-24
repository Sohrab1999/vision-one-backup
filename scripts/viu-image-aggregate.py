#!/usr/bin/env python3
# VIU Image Roadmap — Phase 1 (read-only visual census) — aggregate page census into per-lesson data.
#
# Reads the /tmp page-level census JSONs produced by scripts/viu-image-census.mjs and the
# validated lesson→PDF-page layout rules from the VIU Phase-1 structural audit
# (docs/qa/viu-phase1-structural-audit-2026-11-09.md — "هر درس = ۲ صفحه"، فرمول‌های
# راستی‌آزمایی‌شده ۹۹/۹۹ + جدول سرشماری واقعی Upper با درس ۱۶ تک‌صفحه‌ای و درس ۵۲ مفقود).
#
# Layout rules (validated in the audit):
#   ELEM   lesson N = PDF [2N+7, 2N+8]                       (N = 1..60)
#   PREINT lesson N = PDF [2N+9, 2N+10]                      (N = 1..100)
#   UPPER  lesson N = PDF [2N+7, 2N+8]  (N = 1..15)
#          lesson 16 = PDF [39, 39]      (scan: exercise page missing)
#          lesson N = PDF [2N+6, 2N+7]  (N = 17..51)
#          lesson 52 = MISSING in scan  (both pages absent)
#          lesson N = PDF [2N+4, 2N+5]  (N = 53..100)
#
# Usage: python3 scripts/viu-image-aggregate.py /tmp/viu-img <outDir>
# Writes per-book JSON: <outDir>/viu-images-phase1-census-<book>-2026-11-14.json

import json
import os
import sys

TMP = sys.argv[1] if len(sys.argv) > 1 else "/tmp/viu-img"
OUTDIR = sys.argv[2] if len(sys.argv) > 2 else "docs/qa"

ARTWORK = {"picture-dictionary", "drawing", "photo", "chart-diagram"}
AREA_ORDER = {"none": 0, "small": 1, "medium": 2, "large": 3}
AREA_NAME = {0: "none", 1: "small", 2: "medium", 3: "large"}

BOOKS = {
    "elem": {
        "pdf": "upload/Vocabulary In Use-Elementary 2nd Edition.pdf",
        "rule": "lesson N = PDF pages [2N+7, 2N+8] (audit 2026-11-09)",
        "n": 60,
        "ranges": {n: (2 * n + 7, 2 * n + 8) for n in range(1, 61)},
    },
    "preint": {
        "pdf": "upload/Vocabulary In Use-Pre Int & Int 2nd Edition.pdf",
        "rule": "lesson N = PDF pages [2N+9, 2N+10] (audit 2026-11-09)",
        "n": 100,
        "ranges": {n: (2 * n + 9, 2 * n + 10) for n in range(1, 101)},
    },
    "upper": {
        "pdf": "upload/Vocabulary In Use-Upper Intermediate 2nd Edition.pdf",
        "rule": "N=1..15: [2N+7,2N+8] · 16: [39,39] · N=17..51: [2N+6,2N+7] · 52: MISSING · N=53..100: [2N+4,2N+5] (audit 2026-11-09)",
        "n": 100,
        "ranges": {**{n: (2 * n + 7, 2 * n + 8) for n in range(1, 16)},
                   16: (39, 39),
                   **{n: (2 * n + 6, 2 * n + 7) for n in range(17, 52)},
                   **{n: (2 * n + 4, 2 * n + 5) for n in range(53, 101)}},
    },
}

os.makedirs(OUTDIR, exist_ok=True)
summary_all = {}
for key, cfg in BOOKS.items():
    page_census = json.load(open(os.path.join(TMP, f"census-images-{key}.json")))
    by_page = {r["pdfPage"]: r for r in page_census}
    lessons = []
    for n in range(1, cfg["n"] + 1):
        rng = cfg["ranges"].get(n)
        if rng is None:
            lessons.append({
                "lesson": n, "pdfPages": None, "status": "missing-in-scan",
                "hasArtwork": None, "hasTable": None, "hasImage": None, "imageTypes": [], "maxArea": None,
                "pages": [], "descs": [],
            })
            continue
        s, e = rng
        recs = [by_page[p] for p in range(s, e + 1) if p in by_page]
        missing = [p for p in range(s, e + 1) if p not in by_page]
        types, artwork, table, descs = set(), False, False, []
        max_area = 0
        failed = 0
        for r in recs:
            if r["visual"] is None:
                failed += 1
                continue
            if r["visual"]:
                types.update(r["kinds"])
                if set(r["kinds"]) - {"table"}:
                    artwork = True
                if "table" in r["kinds"]:
                    table = True
                max_area = max(max_area, AREA_ORDER.get(r["area"], 0))
                if r["desc"]:
                    descs.append(r["desc"])
        lessons.append({
            "lesson": n,
            "pdfPages": [s, e],
            "status": "complete" if not missing else f"pages-missing:{missing}",
            "hasArtwork": artwork,
            "hasTable": table,
            "hasImage": artwork or table,
            "imageTypes": sorted(types),
            "maxArea": AREA_NAME[max_area],
            "pages": recs,
            "descs": descs,
            **({"censusFailedPages": failed} if failed else {}),
        })
    n_art = sum(1 for l in lessons if l["hasArtwork"])
    n_tbl_only = sum(1 for l in lessons if l["hasTable"] and not l["hasArtwork"])
    n_text = sum(1 for l in lessons if l.get("hasImage") is False and l["status"] == "complete")
    kind_lessons = {}
    for l in lessons:
        for k in l["imageTypes"]:
            kind_lessons[k] = kind_lessons.get(k, 0) + 1
    out = {
        "book": key,
        "sourcePdf": cfg["pdf"],
        "censusDate": "2026-11-14",
        "method": "VLM census of EVERY lesson page (pdftoppm 120 DPI renders in /tmp; z-ai vision batch=8) + pixel-metric cross-check (scripts/viu-image-metrics.py) + focus-probe verification of suspect pages",
        "layoutRule": cfg["rule"],
        "summary": {
            "lessons": cfg["n"],
            "lessonPages": sum(len(l["pdfPages"]) if l["pdfPages"] else 0 for l in lessons),
            "lessonsArtwork": n_art,
            "lessonsTableOnly": n_tbl_only,
            "lessonsTextOnly": n_text,
            "lessonsMissingInScan": sum(1 for l in lessons if l["status"] == "missing-in-scan"),
            "pageVisualCount": sum(1 for r in page_census if r["visual"] is True),
            "pageTextOnlyCount": sum(1 for r in page_census if r["visual"] is False),
            "pageFailedCount": sum(1 for r in page_census if r["visual"] is None),
            "lessonsByKind": kind_lessons,
        },
        "lessons": lessons,
    }
    path = os.path.join(OUTDIR, f"viu-images-phase1-census-{key}-2026-11-14.json")
    with open(path, "w") as f:
        json.dump(out, f, indent=1, ensure_ascii=False)
    summary_all[key] = out["summary"]
    print(f"{key}: lessons={out['summary']['lessons']} artwork={n_art} tableOnly={n_tbl_only} textOnly={n_text} missing={out['summary']['lessonsMissingInScan']} · pages visual={out['summary']['pageVisualCount']} text={out['summary']['pageTextOnlyCount']} failed={out['summary']['pageFailedCount']} · byKind={kind_lessons}")

with open(os.path.join(TMP, "aggregate-summary.json"), "w") as f:
    json.dump(summary_all, f, indent=1)
print("WROTE per-book census JSONs to", OUTDIR)
