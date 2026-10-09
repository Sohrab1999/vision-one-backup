#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import re
BIDI = re.compile(r'[\u200e\u200f\u202a-\u202e\u2066-\u2069\u200b\u200c\u200d]')
LINES = open('/tmp/g12-full.txt', encoding='utf-8').read().split('\n')
for n in (8226, 8227, 8230):
    raw = BIDI.sub('', LINES[n-1])
    print(n, 'repr:', repr(raw[:80]))
    lat = re.findall(r"[A-Za-z][A-Za-z'/ ]*[A-Za-z]", raw)
    print('   lat:', lat)
