#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Fix L3 grammar keys: strip grammar entries, re-append with correct key ranges."""
import re

fn = '/home/z/my-project/src/data/grade-12/questions-lesson-3.ts'
txt = open(fn, encoding='utf-8').read()
# remove appended grammar comment headers + grammar entries
txt2 = re.sub(r'\n  // ─── [^\n]*تست گرامر[^\n]*───\n', '\n', txt)
txt2 = re.sub(r'\n  \{ category: "grammar"[^\n]*\},', '', txt2)
# collapse extra blank lines
txt2 = re.sub(r'\n{3,}', '\n\n', txt2)
open(fn, 'w', encoding='utf-8').write(txt2)
print('stripped grammar from L3:', txt.count('category: "grammar"'), '->', txt2.count('category: "grammar"'))
