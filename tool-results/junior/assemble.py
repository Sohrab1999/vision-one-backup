import json, re, sys, os, unicodedata
from difflib import SequenceMatcher
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from expected import EXPECTED

BASE = os.path.dirname(os.path.abspath(__file__))

# ---------- tolerant VLM parsing ----------
def parse_vlm(page, half):
    d = json.load(open(os.path.join(BASE, f"a{page:03d}{half}.json")))
    c = d["choices"][0]["message"]["content"]
    rows = []
    for raw in c.split("\n"):
        raw = raw.strip()
        if not raw: continue
        parts = re.split(r'\s*(?::+|=+>?)\s*:{1,2}\s*', raw)  # split on ::: ::= :: etc
        parts = re.split(r'\s*[:=]{2,3}\s*', raw)
        if len(parts) >= 2:
            en = parts[0].strip(); fa = ":::".join(parts[1:]).strip()
            rows.append([en, fa])
        else:
            if rows: rows[-1][1] += " " + raw  # wrapped line
            else: rows.append(["", raw])
    return rows

# ---------- OCR per page: lines ----------
def ocr_lines(page):
    raw = open(os.path.join(BASE, "textlayer.txt"), encoding="utf-8").read()
    pg = raw.split("\f")[page - 8]
    lines = []
    for l in pg.split("\n"):
        if l.strip(): lines.append(l)
    return lines

def norm_fa(s):
    s = re.sub(r'[\u064B-\u0652\u0640]', '', s)  # diacritics + tatweel
    s = s.replace('ي','ی').replace('ك','ک').replace('‌',' ')
    s = re.sub(r'[^\u0600-\u06FF]', '', s)  # keep only arabic-script letters
    return s

def latin_tokens(s):
    return re.findall(r"[A-Za-z][A-Za-z'\.\-=\(\),\s]*", s)

PERSIAN = re.compile(r'[\u0600-\u06FF]')

def ocr_persian_for(ocr_line_list, word):
    """Return best-matching OCR Persian fragment for an English word."""
    w = word.lower().replace('.', '').replace("'", "")
    best = (0.0, "")
    for line in ocr_line_list:
        toks = latin_tokens(line)
        toks_low = [t.lower().strip(" ()").replace('.', '').replace("'", "") for t in toks]
        hit = any(t == w or (w in t and len(w) > 3) for t in toks_low)
        if not hit: continue
        # persian runs on that line
        fa = "".join(re.findall(r'[\u0600-\u06FF\u060C\u061B\u061F ()\-–،,]+', 
                     re.sub(r'[A-Za-z0-9"@]+', ' ', line)))
        r = SequenceMatcher(None, norm_fa(fa)[:60], norm_fa(fa)).ratio()  # dummy
        best = (1.0, fa) if not best[1] else best
    return best[1]

# ---------- assemble ----------
result = {}   # (page,half) -> list of [en, fa, flag]
for p in sorted(EXPECTED):
    ocr = ocr_lines(p)
    for h in ("L", "R"):
        rows = parse_vlm(p, h)
        result[(p, h)] = rows

# report English-word multiset comparison with OCR tokens
raw = open(os.path.join(BASE, "textlayer.txt"), encoding="utf-8").read()
for p in sorted(EXPECTED):
    pg = raw.split("\f")[p - 8]
    toks = re.findall(r"[A-Za-z][A-Za-z'\-]*(?:\s[a-z]+)*", pg)
    toks = [t.strip() for t in toks if t.strip()]
    drop = {"Prospect","Persian","Meanings","Words","One","Two","Three","Vision","One","Telegram","Channel","Note","PracticalEnglishInKonkour"}
    toks = [t for t in toks if t.split()[0] not in drop]
    vlm_en = [r[0] for k in ((p,"L"),(p,"R")) for r in result[k]]
    vlm_set = set(re.sub(r"[^a-z]", "", e.lower()) for e in vlm_en)
    ocr_set = set(re.sub(r"[^a-z]", "", t.lower()) for t in toks)
    only_ocr = sorted(t for t in ocr_set if t and t not in vlm_set)
    only_vlm = sorted(t for t in vlm_set if t and t not in ocr_set)
    print(f"page {p}: vlm={len(vlm_en)} words; ocr-only={only_ocr}; vlm-only={only_vlm}")

json.dump({f"{p}{h}": result[(p,h)] for p in EXPECTED for h in "LR"},
          open("assembled.json","w"), ensure_ascii=False, indent=1)
