import json, re, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from expected import EXPECTED

BASE = os.path.dirname(os.path.abspath(__file__))

def get_lines(page, half):
    d = json.load(open(os.path.join(BASE, f"a{page:03d}{half}.json")))
    c = d["choices"][0]["message"]["content"]
    out = []
    for raw in c.split("\n"):
        raw = raw.strip()
        if not raw: continue
        if ":::" not in raw:
            out.append((raw, "___NOSPLIT___")); continue
        en, fa = raw.split(":::", 1)
        out.append((en.strip(), fa.strip()))
    return out

problems = []
for p in sorted(EXPECTED):
    for h in ("L", "R"):
        lines = get_lines(p, h)
        exp = EXPECTED[p][h]
        print(f"=== p{p}{h}: expected {len(exp)}, got {len(lines)} ===")
        # align by sequence
        for i, w in enumerate(exp):
            if i < len(lines):
                en, fa = lines[i]
                en_c = en.lower().replace("’", "'")
                w_c = w.lower()
                match = en_c == w_c or en_c.replace(" ", "") == w_c.replace(" ", "")
                if not match:
                    print(f"  MISMATCH row {i}: expected [{w}] got [{en}] ::: {fa}")
            else:
                print(f"  MISSING row {i}: [{w}]")
        if len(lines) > len(exp):
            for i in range(len(exp), len(lines)):
                print(f"  EXTRA row {i}: {lines[i][0]} ::: {lines[i][1]}")
