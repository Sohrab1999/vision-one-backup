#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Extractor v4 for "1000 English Collocations" — four quiz formats:
  A) slash-inline options  -> exact reconstruction match
  B) lettered a) b) c)     -> stem + options on separate lines
  C) word-box cloze        -> sentence pairing via difflib
Output: /home/z/my-project/tool-results/collo-extract.json
"""
import json, re, difflib

SRC = "/tmp/collo.txt"
OUT = "/home/z/my-project/tool-results/collo-extract.json"

raw = open(SRC, encoding="utf-8").read()
t = raw.replace("\x0c", "\n")
t = t.replace("\u2019", "'").replace("\u2018", "'").replace("\u201c", '"').replace("\u201d", '"')
t = t.replace("\u2013", "\u2014")
t = re.sub(r"^\s*\d+\s*\|\s*P\s*a\s*g\s*e\s*$", "", t, flags=re.M)
t = re.sub(r"[ \t]+", " ", t)
lines = [ln.strip() for ln in t.split("\n")]

D = r"[-\u2014]?"
re_lesson = re.compile(rf"^Lesson\s+(\d+)\s*{D}\s*(.+)$")
re_quiz   = re.compile(rf"^Lesson\s+(\d+)\s*{D}\s*Quiz\s*$")
re_ans    = re.compile(rf"^Lesson\s+(\d+)\s*{D}\s*Quiz\s+Answers\s*$")

lessons = {}
cur, sec, para = None, None, []

def flush_para():
    global para
    if cur is not None and sec == "prose" and para:
        p = " ".join(para).strip()
        if len(p) > 25:
            lessons[cur]["paragraphs"].append(p)
    para = []

def ensure(n):
    return lessons.setdefault(n, {"num": n, "topic": None, "paragraphs": [], "quiz_lines": [], "answers_lines": []})

for ln in lines:
    m_a, m_q = re_ans.match(ln), re_quiz.match(ln)
    m_l = re_lesson.match(ln)
    if m_a:
        flush_para(); cur = int(m_a.group(1)); ensure(cur); sec = "answers"; continue
    if m_q:
        flush_para(); cur = int(m_q.group(1)); ensure(cur); sec = "quiz"; continue
    if m_l and not m_q and not m_a:
        flush_para(); cur = int(m_l.group(1)); L = ensure(cur)
        if L["topic"] is None:
            L["topic"] = m_l.group(2).strip()
        sec = "prose"; continue
    if cur is None:
        continue
    if sec == "prose":
        if ln:
            para.append(ln)
        else:
            flush_para()
    elif sec == "quiz" and ln:
        lessons[cur]["quiz_lines"].append(ln)
    elif sec == "answers" and ln:
        lessons[cur]["answers_lines"].append(ln)
flush_para()

def to_paragraphs(paras, per=3):
    out = []
    for p in paras:
        sents = re.split(r"(?<=[.!?]) (?=[A-Z\"'])", p)
        for i in range(0, len(sents), per):
            g = " ".join(sents[i:i+per]).strip()
            if g:
                out.append(g)
    return out

re_item = re.compile(r"^(\d{1,2})\.\s*(.*)$")
def numbered_items(ls):
    items, cur_n, cur_txt = [], None, ""
    for ln in ls:
        m = re_item.match(ln)
        if m:
            if cur_n is not None:
                items.append((cur_n, cur_txt.strip()))
            cur_n, cur_txt = int(m.group(1)), m.group(2)
        elif cur_n is not None and ln:
            cur_txt += " " + ln.strip()
    if cur_n is not None:
        items.append((cur_n, cur_txt.strip()))
    return items

def norm(s):
    s = re.sub(r"\s+", " ", s).strip()
    s = s.replace("\u2014", "-").replace("\u2212", "-").replace("\u2026", "...")
    return s

GLUE_L = re.compile(r"(_+)(?=[A-Za-z])")
GLUE_R = re.compile(r"([A-Za-z.,;:!?])(_+)")
def unglue(s):
    s = GLUE_L.sub(r"\1 ", s)
    s = GLUE_R.sub(r"\1 \2", s)
    return s

BLANK = re.compile(r"_+")

def parse_box_v4(q, a, box):
    """Single numbered item with a __ blank + word box."""
    q, a = norm(unglue(q)), norm(unglue(a))
    if len(BLANK.findall(q)) != 1:
        return None
    qw, aw = q.split(), a.split()
    bi = next((i for i, w in enumerate(qw) if BLANK.search(w)), None)
    if bi is None:
        return None
    p = 0
    while p < bi and p < len(aw) and qw[p] == aw[p]:
        p += 1
    if p < bi:
        return None
    q_rest, a_rest = qw[bi+1:], aw[p+1:]
    s = 0
    while s < len(q_rest) and s < len(a_rest) and q_rest[len(q_rest)-1-s] == a_rest[len(a_rest)-1-s]:
        s += 1
    inserted = a_rest[:len(a_rest)-s]
    if len(inserted) == 0 or len(inserted) > 3:
        return None
    ans_word = re.sub(r"[\s,.;:]+$", "", " ".join(inserted))
    if not ans_word:
        return None
    opts = (box_distractors(box, ans_word) if box else []) + [ans_word]
    return (norm(q), opts, len(opts) - 1)

# ── A) slash-inline ──
def parse_mc(q, a):
    q, a = norm(q), norm(a)
    parts = q.split(" / ")
    if len(parts) < 2:
        return None
    w0, wl = parts[0].split(), parts[-1].split()
    k1_order = list(range(1, min(5, len(w0)) + 1)) + [0]
    k2_order = list(range(1, min(5, len(wl)) + 1)) + [0]
    for k1 in k1_order:
        prefix = " ".join(w0[:len(w0)-k1]).strip() if k1 else ""
        opt1 = " ".join(w0[len(w0)-k1:]).strip() if k1 else ""
        for k2 in k2_order:
            if k2:
                suffix = " ".join(wl[k2:]).strip()
                optN = " ".join(wl[:k2]).strip()
            else:
                suffix = ""
                optN = parts[-1].strip()
            mids = [norm(x) for x in parts[1:-1]]
            opts = ([opt1] if opt1 else []) + mids + ([optN] if optN else [])
            opts = [o for o in opts if o]
            if len(opts) < 2 or len(opts) > 5:
                continue
            opts = [re.sub(r"[,.;:]+$", "", o) for o in opts]
            for i, o in enumerate(opts):
                if norm((prefix + " " + o + " " + suffix).strip()) == norm(re.sub(r"[,.;:]+$", "", a)) or norm((prefix + " " + o + " " + suffix).strip()) == a:
                    return (norm((prefix + " ________ " + suffix).strip()), opts, i)
    return None

# ── B) lettered ──
def parse_lettered(quiz_lines, a_items):
    questions, cur_n = {}, None
    for ln in quiz_lines:
        m = re_item.match(ln)
        mo = re.match(r"^([a-e])\)\s*(.*)$", ln)
        if m:
            cur_n = int(m.group(1))
            questions[cur_n] = {"stem": m.group(2).strip(), "options": []}
        elif mo and cur_n is not None:
            questions[cur_n]["options"].append([mo.group(1), mo.group(2).strip()])
        elif cur_n is not None and ln:
            q = questions[cur_n]
            if q["options"]:
                q["options"][-1][1] += " " + ln
            else:
                q["stem"] += " " + ln
    out = []
    for n, q in questions.items():
        a = a_items.get(n)
        if not a or not q["options"]:
            continue
        letters = [l for l, _ in q["options"]]
        m = re.findall(r"([a-e])\)", a)
        if not m or m[-1] not in letters:
            continue
        opts = [re.sub(r"[,.;:]+$", "", norm(x)) for _, x in q["options"]]
        stem = norm(q["stem"])
        if not stem or len(opts) < 2:
            continue
        out.append({"n": n, "text": stem + " ________", "options": opts, "answer": letters.index(m[-1])})
    return out

# ── C) word-box cloze ──
def sentences_from(ls):
    txt = norm(" ".join(ls))
    out = [s.strip() for s in re.split(r"(?<=[.!?]) (?=[A-Z\"'\d])", txt) if s.strip()]
    return [re.sub(r"^\d{1,2}\.\s+", "", s) for s in out]

def box_distractors(box, ans_word, k=3):
    clean = [re.sub(r"[,.;:]+$,", "", b).rstrip(" ,.;:") for b in box]
    clean = [b for b in clean if b]
    others = sorted([b for b in clean if b.lower() != ans_word.lower()], key=str.lower)
    seq = sorted(others + [ans_word], key=str.lower)
    pos = seq.index(ans_word)
    picks = []
    j = pos
    for _ in range(len(seq)):
        j = (j + 1) % len(seq)
        w = seq[j]
        if w != ans_word and w not in picks:
            picks.append(w)
        if len(picks) >= k:
            break
    return picks

def parse_cloze(quiz_lines, answers_lines, box):
    qs = [unglue(q) for q in sentences_from(quiz_lines)]
    as_ = [unglue(a) for a in sentences_from(answers_lines)]
    out = []
    for q, a in zip(qs, as_):
        if not BLANK.search(q):
            continue
        qw, aw = q.split(), a.split()
        sm = difflib.SequenceMatcher(None, [w.lower() for w in qw], [w.lower() for w in aw], autojunk=False)
        blanks_idx = [i for i, w in enumerate(qw) if BLANK.search(w)]
        if not blanks_idx:
            continue
        # map each blank to inserted answer words via opcodes
        per_blank = {}
        bi = 0
        ok = True
        for tag, i1, i2, j1, j2 in sm.get_opcodes():
            if tag in ("replace", "insert"):
                seg = qw[i1:i2]
                if all(BLANK.search(w) for w in seg) and seg:
                    if bi >= len(blanks_idx):
                        ok = False; break
                    per_blank[blanks_idx[bi]] = aw[j1:j2]
                    bi += 1
                elif not seg:
                    continue
                else:
                    ok = False; break
            elif tag == "delete":
                if any(BLANK.search(w) for w in qw[i1:i2]):
                    ok = False; break
        if not ok or bi != len(blanks_idx):
            continue
        if len(blanks_idx) != 1:
            continue  # v1: single-blank sentences only
        words = per_blank[blanks_idx[0]]
        if len(words) == 0 or len(words) > 3:
            continue
        ans_word = " ".join(words)
        ans_word = re.sub(r"[\s,.;:]+$", "", ans_word)
        if not ans_word:
            continue
        opts = (box_distractors(box, ans_word) if box else []) + [ans_word]
        out.append({"n": len(out) + 1, "text": re.sub(r"_+", "________", norm(q)), "options": opts, "answer": len(opts) - 1})
    return out

for L in lessons.values():
    L["paragraphs"] = to_paragraphs(L["paragraphs"])
    q_items = dict(numbered_items(L["quiz_lines"]))
    a_items = dict(numbered_items(L["answers_lines"]))
    # word box: vertical single-word lines OR a one-line list "a / b / c" or "a, b, c"
    box = []
    for ln in L["quiz_lines"]:
        if re_item.match(ln):
            break
        if ln and " " not in ln and not ln.endswith((".", ":", ";", "?", "!")) and len(ln) < 25:
            box.append(ln)
    for ln in L["quiz_lines"]:
        low = ln.lower()
        if re_item.match(ln) or low.startswith(("complete", "circle", "fill", "match", "read", "choose", "write", "put")):
            break
        if " / " in ln or ", " in ln or re.search(r"[a-z]\s+[a-z]", ln):
            cand = [re.sub(r"[,.;:]+$", "", w.strip(" ,.")) for w in re.split(r"\s/\s|,|\s+", ln)]
            cand = [w for w in cand if w]
            if len(cand) >= 3 and all(re.fullmatch(r"[A-Za-z][A-Za-z-]{0,20}", w or "x") for w in cand):
                box = cand
                break
    # inline list inside the instruction line: "Complete the sentences with a, b, c, or d."
    if L["quiz_lines"] and L["quiz_lines"][0].lower().startswith(("complete", "fill")):
        m_list = re.search(r"\bwith\s+(.+?)\.?\s*$", L["quiz_lines"][0], flags=re.I)
        if m_list:
            seg = m_list.group(1)
            parts_w = [w.strip(" ,") for w in re.split(r",|\bor\b|\s/\s", seg)]
            inline_words = [w for w in parts_w if re.fullmatch(r"[A-Za-z][A-Za-z-]{0,20}", w or "")]
            if len(inline_words) > len(box):
                box = inline_words
    parsed, failed, fmt = [], [], "-"
    if any(re.match(r"^[a-e]\)", ln) for ln in L["quiz_lines"]):
        fmt = "lettered"
        parsed = parse_lettered(L["quiz_lines"], a_items)
    else:
        joined = " ".join(L["quiz_lines"])
        has_slash_items = any(" / " in txt for _, txt in q_items.items()) if q_items else False
        has_blanks_free = bool(BLANK.search(joined))
        if has_slash_items and q_items:
            fmt = "slash"
            for n, qtext in q_items.items():
                atext = a_items.get(n)
                if not atext:
                    failed.append({"n": n, "reason": "no-answer"}); continue
                r = parse_mc(unglue(qtext), atext) if " / " in qtext else None
                if r is None and BLANK.search(qtext) and box:
                    r = parse_box_v4(qtext, atext, box)
                if r is None:
                    failed.append({"n": n, "reason": "parse"}); continue
                bt, opts, ai = r
                bt = re.sub(r"_+", "________", bt)
                parsed.append({"n": n, "text": bt, "options": opts, "answer": ai})
        elif has_blanks_free and box:
            fmt = "cloze"
            # drop instruction/box lines: body starts at the first line containing a blank
            body = L["quiz_lines"]
            fi = next((i for i, ln in enumerate(body) if BLANK.search(ln)), None)
            if fi is not None and fi > 0:
                body = body[fi:]
            parsed = parse_cloze(body, L["answers_lines"], box)
        else:
            fmt = "lost"
    L["quiz"] = parsed
    L["quiz_failed"] = failed if fmt == "slash" else []
    L["quiz_total"] = len(q_items) if q_items else len(L["quiz"])
    L["format"] = fmt
    del L["quiz_lines"]; del L["answers_lines"]

out = {"lessons": [lessons[k] for k in sorted(lessons)]}
json.dump(out, open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=1)

total_q = sum(len(L["quiz"]) for L in lessons.values())
fmts = {}
for L in lessons.values():
    fmts[L["format"]] = fmts.get(L["format"], 0) + 1
print(f"lessons={len(lessons)} questions={total_q} formats={fmts}")
for L in lessons.values():
    flag = []
    if not L["quiz"]:
        flag.append("NO-Q")
    if not L["paragraphs"]:
        flag.append("NO-PROSE")
    if L["topic"] is None:
        flag.append("NO-TOPIC")
    if flag:
        print(f"  L{L['num']:>2} {str(L['topic'])[:26]:<28} {L['format']:<9} ok={len(L['quiz']):>2} {' '.join(flag)}")
