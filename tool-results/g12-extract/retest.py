#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import re

p1 = re.compile(r'\)\s*([a-d])\s*\(\s*-\s*(\d{1,3})\b')
tests = [
    (')b( -2', 'literal'),
    (')b( -2' + 'ترجمه تست', 'literal+fa'),
]
lines = open('/tmp/g12-full.txt', encoding='utf-8').read().split('\n')
BIDI = re.compile(r'[\u200e\u200f\u202a-\u202e\u2066-\u2069\u200b\u200c\u200d]')
raw = BIDI.sub('', lines[8424]).strip()
tests.append((raw, 'file-line'))
tests.append((raw[:6], 'file-slice6'))
for s, tag in tests:
    m = p1.search(s)
    print(tag, '->', (m.group(0) if m else None))
    if not m:
        print('   cps:', [hex(ord(c)) for c in s[:10]])
