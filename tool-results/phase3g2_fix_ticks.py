# -*- coding: utf-8 -*-
"""Phase 3G-2 — corrective fix: '- [x]]' double-bracket bug (head[4:] instead of head[5:])
introduced by edit script on ticked criterion lines. Replace '- [x]]' -> '- [x]' with
strict per-file count assertions (expected: 3 in phase-3 doc, 2 in mother doc)."""
import io

def load(p):
    with io.open(p, 'r', encoding='utf-8') as f:
        return f.read()

def save(p, s):
    with io.open(p, 'w', encoding='utf-8') as f:
        f.write(s)

P3 = 'نقشه راه ها/نقشه-راه-فاز-۳-N1-2.md'
MO = 'نقشه راه ها/نقشه-راه-قدم-بعدی-N1-2.md'

for path, expected, tag in [(P3, 3, 'P3'), (MO, 2, 'MO')]:
    c = load(path)
    n = c.count('- [x]]')
    assert n == expected, "%s: '- [x]]' count=%d (expected %d)" % (tag, n, expected)
    # safety: ensure no pre-existing '- [x]]' beyond our five lines and no '[x]]]' chains
    assert c.count(']]]') == 0, "%s: unexpected ']]]' found" % tag
    c = c.replace('- [x]]', '- [x]')
    assert c.count('- [x]]') == 0
    # each corrected line must now be a proper criterion tick
    save(path, c)
    print("%s: fixed %d occurrences OK" % (tag, expected))

# final verification: ticked criterion lines are well-formed
for path, tag, exp in [(P3, 'P3', 3), (MO, 'MO', 2)]:
    c = load(path)
    good = c.count('- [x] 429 روزانه دقیقاً طبق U3') + c.count('- [x] 429ها طبق قرارداد') + c.count('- [x] معیار پذیرش')
    assert good == exp, "%s: well-formed tick count=%d (expected %d)" % (tag, good, exp)
    print("%s: well-formed ticks verified = %d" % (tag, exp))
print('FIX OK')
