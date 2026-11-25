#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
VIU IMAGE ROADMAP — فاز ۳ — پایلوت (استخراج تصاویر ۶ درس منتخب مالک — ۱۰ صفحهٔ آرت‌ورک‌دار)

فرمان مالک فاز ۳ (پیام IM channel `zai-web` — trace `1a1dbbb24436f159` — session
`web-db5d9cf8-c8eb-44ee-996c-ef41ac30f574` — ۲۰۲۶-۱۱-۱۴):
  «فاز ۳ — پایلوت (۵-۱۰ درس منتخب مالک): استخراج تصاویر پایلوت از PDFهای tracked
   (گزینهٔ مصوب فاز ۲) + WebP + lazy-load در جایگاه‌های مصوب / حفظ O6 برای مدخل‌های
   بی‌تصویر + O4 attribution بدون تغییر + صفر تغییر دادهٔ متنی موجود (اتصال فقط افزودنی)»

گزینهٔ اجرایی = ① (تصویر صفحهٔ کامل ارائهٔ درس — رندر کامل صفحهٔ PDF؛ بدون گذر مختصات VLM).
  چرا ①؟ پ۶ سند فاز ۲ (هزینهٔ گذر مختصات VLM) صراحتاً فقط برای گزینهٔ ②/③ گشوده شده و در
  فرمان مالک پاسخ/مجوزی ندارد ⇒ ②/③ قابل اجرا نیستند؛ جمع‌بندی فاز ۲ نیز برای «ارائهٔ درس»
  گزینهٔ ① را پیش می‌گذارد. استدلال کامل در گزارش فاز ۳ §B.
دامنه = ۶ درس پیشنهادی پ۲ سند فاز ۲ (بدون تغییر): ELEM ۴/۱۲ · PREINT ۵/۵۸ · UPPER ۲/۶.
نقاط اتصال = پاپ‌آپ واژه (جایگاه O6) + صفحهٔ متن درس (§D سند فاز ۲) — کارت واژه فقط با ②/③.

سیاست §E سند فاز ۲ (پیش‌فرض‌های مصوب فرمان فاز ۳):
  - رندر pdftoppm @120DPI از سه PDF tracked مالک (SHA256 35ea1b5b…/0dfdab2e…/415fc985…)
  - WebP با Pillow method=6 — نردبان کیفیت q80 → q70 → تطبیقی (q60..q40) تا سقف ≤۱۲۰KB
  - منبع تصویر فقط سه PDF مالک — © Cambridge University Press — نمایش صرفاً در وب‌اپ شخصی مالک
  - صفر تغییر Prisma/Schema/db/WAVE2/Hook — ورود تصویر فقط در فاز ۳ با فرمان صریح مالک (O2-V-۳)

صفحات آرت‌ورک‌دار هر درس پایلوت — مرجع: docs/qa/viu-images-phase1-census-*-2026-11-14.json
  (صفحات فقط‌متن حذف — یافتهٔ فاز ۱: بزرگ‌تر از نقاشی + بی‌ارزش ارائه‌ای؛ tiny-icons حذف — §I-۵ فاز ۲)
    ELEM  درس ۴  → p15 (drawing/large) · p16 (drawing/medium)
    ELEM  درس ۱۲ → p31 (picture-dictionary/large) · p32 (drawing/medium)
    PREINT درس ۵  → p19 (picture-dictionary+drawing/large) · p20 (drawing/medium)
    PREINT درس ۵۸ → p125 (photo+table/medium)  — p126 فقط‌متن
    UPPER درس ۲  → p11 (drawing+chart-diagram/large) · p12 (chart-diagram+table/large)
    UPPER درس ۶  → p20 (drawing/medium) — p19 فقط tiny-icons (area=small)

خروجی: public/viu-images/{book}/lesson-NN-pK.webp  (K = ترتیب صفحهٔ آرت‌ورک در درس — ۱مبنا)
بازتولید کامل: `python3 scripts/viu-image-pilot-extract.py` — idempotent (خروجی قطعی، حذف و بازساخت)
خروجی فرعی: /tmp/viu-pilot3/manifest.json (ابعاد/حجم/کیفیت/sha256 هر تصویر — ورودی گزارش فاز ۳)
"""

import hashlib
import json
import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUT_ROOT = ROOT / "public" / "viu-images"
DPI = 120
CAP = 120 * 1024  # ≤۱۲۰KB — سیاست §E سند فاز ۲
QUALITY_LADDER = [80, 70, 60, 55, 50, 45, 40]  # q80 → q70 → تطبیقی

PDFS = {
    "viu-elem": ROOT / "upload" / "Vocabulary In Use-Elementary 2nd Edition.pdf",
    "viu-preint": ROOT / "upload" / "Vocabulary In Use-Pre Int & Int 2nd Edition.pdf",
    "viu-upper": ROOT / "upload" / "Vocabulary In Use-Upper Intermediate 2nd Edition.pdf",
}

# (book, lesson, [pdfPages آرت‌ورک‌دار به ترتیب صعودی]) — مبنای naming p1/p2/…
PILOT = [
    ("viu-elem", 4, [15, 16]),
    ("viu-elem", 12, [31, 32]),
    ("viu-preint", 5, [19, 20]),
    ("viu-preint", 58, [125]),
    ("viu-upper", 2, [11, 12]),
    ("viu-upper", 6, [20]),
]


def render_page(pdf: Path, page: int, tmpdir: Path) -> Path:
    prefix = tmpdir / f"pg{page}"
    subprocess.run(
        ["pdftoppm", "-f", str(page), "-l", str(page), "-r", str(DPI), "-png", str(pdf), str(prefix)],
        check=True,
        capture_output=True,
    )
    hits = sorted(tmpdir.glob(f"pg{page}-*.png"))
    if len(hits) != 1:
        raise RuntimeError(f"pdftoppm output ambiguous for page {page}: {hits}")
    return hits[0]


def encode_webp(png: Path, dest: Path) -> tuple[int, int, tuple[int, int]]:
    """نردبان q80→q70→تطبیقی تا عبور از سقف ≤۱۲۰KB — آخرین تلاش حتی اگر بالای سقف بماند (ثبت صادقانه)."""
    img = Image.open(png)
    w, h = img.size
    dest.parent.mkdir(parents=True, exist_ok=True)
    if dest.exists():
        dest.unlink()
    chosen_q, size = QUALITY_LADDER[-1], -1
    for q in QUALITY_LADDER:
        img.save(dest, "WEBP", quality=q, method=6)
        size = dest.stat().st_size
        chosen_q = q
        if size <= CAP:
            break
    return chosen_q, size, (w, h)


def main() -> int:
    # گیت بایتی: سه PDF مبدأ باید عین خط پایهٔ tracked باشند (الگوی §A گزارش فاز ۱)
    for book, pdf in PDFS.items():
        if not pdf.exists():
            raise RuntimeError(f"missing source PDF: {pdf}")
    print("— گیت ورودی: سه PDF tracked حاضر — SHA256:")
    for book, pdf in PDFS.items():
        digest = hashlib.sha256(pdf.read_bytes()).hexdigest()
        print(f"  {book}: {digest[:8]}…")
    if [hashlib.sha256(PDFS[b].read_bytes()).hexdigest()[:8] for b in PDFS] != [
        "35ea1b5b", "0dfdab2e", "415fc985"
    ]:
        raise RuntimeError("source PDF hash mismatch — baseline tracked PDFs changed")

    rows = []
    with tempfile.TemporaryDirectory(prefix="viu-pilot3-") as tmp:
        tmpdir = Path(tmp)
        for book, lesson, pages in PILOT:
            for idx, page in enumerate(pages, start=1):
                png = render_page(PDFS[book], page, tmpdir)
                fname = f"lesson-{lesson:02d}-p{idx}.webp"
                dest = OUT_ROOT / book / fname
                q, size, (w, h) = encode_webp(png, dest)
                sha = hashlib.sha256(dest.read_bytes()).hexdigest()[:8]
                rows.append({
                    "book": book,
                    "lesson": lesson,
                    "file": f"viu-images/{book}/{fname}",
                    "srcPdfPage": page,
                    "quality": q,
                    "bytes": size,
                    "kb": round(size / 1024, 1),
                    "px": [w, h],
                    "sha256_8": sha,
                    "withinCap": size <= CAP,
                })
                flag = "OK" if size <= CAP else "OVER-CAP!"
                print(f"  {book} درس {lesson} → pdf p{page} → {fname}  q{q}  {size/1024:.1f}KB  {w}x{h}  {flag}")

    manifest = {"dpi": DPI, "capKB": CAP // 1024, "qualityLadder": QUALITY_LADDER, "rows": rows}
    mdir = Path("/tmp/viu-pilot3")
    mdir.mkdir(parents=True, exist_ok=True)
    (mdir / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")

    total = sum(r["bytes"] for r in rows)
    over = [r for r in rows if not r["withinCap"]]
    print(f"— جمع: {len(rows)} تصویر · {total/1024:.1f}KB · میانگین {total/1024/len(rows):.1f}KB")
    if over:
        print(f"— هشدار صادقانه: {len(over)} تصویر بالای سقف حتی در کف نردبان — ثبت در گزارش فاز ۳")
        return 2
    return 0


if __name__ == "__main__":
    sys.exit(main())
