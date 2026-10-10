# -*- coding: utf-8 -*-
"""Task 8-b4 follow-up — chain «سؤال مشابه بعدی» from the bonus question (endless),
keep main «بساز» button on the main question (cache-hit retry case)."""
import sys

path = "/home/z/my-project/src/components/book/quiz-game.tsx"
src = open(path, encoding="utf-8").read()

def must_count(hay, needle, expected, label):
    c = hay.count(needle)
    if c != expected:
        print("FAIL [%s]: expected %d, found %d" % (label, expected, c))
        sys.exit(1)

# 1) generateSimilar signature + source selection (bonus chains, main stays)
t1_old = '''  async function generateSimilar() {
    if (!current || bonusLoading) return;
    setBonusLoading(true);'''
must_count(src, t1_old, 1, "fn head")
t1_new = '''  async function generateSimilar(fromBonus = false) {
    if (!current || bonusLoading) return;
    // «سؤال مشابه بعدی» از روی سؤالِ مشابهٔ فعلی زنجیر می‌شود (تولید بی‌نهایت)؛
    // دکمهٔ اصلی همیشه از سؤال اصلی منبع می‌گیرد (تکرار همان سؤال → پاسخ کش‌شده).
    const src = fromBonus && bonus ? bonus : current;
    setBonusLoading(true);'''
src = src.replace(t1_old, t1_new)

# 2) payload source — disambiguated by the category line unique to this block
t2_old = '''          text: current.text,
          options: current.options,
          answer: current.answer,
          category: current.category,'''
must_count(src, t2_old, 1, "payload")
t2_new = '''          text: src.text,
          options: src.options,
          answer: src.answer,
          category: current.category,'''
src = src.replace(t2_old, t2_new)

# 3) main button — explicit false (avoid MouseEvent leaking into fromBonus)
t3_old = '''                    onClick={generateSimilar}
                    disabled={bonusLoading}
                    className="gap-1.5 text-[12px]"
                  >
                    {bonusLoading ? <Loader2 size={13} className="animate-spin" /> : <Wand2 size={13} className="text-teal-500" />}'''
must_count(src, t3_old, 1, "main button")
t3_new = '''                    onClick={() => generateSimilar(false)}
                    disabled={bonusLoading}
                    className="gap-1.5 text-[12px]"
                  >
                    {bonusLoading ? <Loader2 size={13} className="animate-spin" /> : <Wand2 size={13} className="text-teal-500" />}'''
src = src.replace(t3_old, t3_new)

# 4) bonus «next» button — chains from the displayed bonus
t4_old = '''              <Button variant="outline" size="sm" onClick={generateSimilar} disabled={bonusLoading} className="gap-1.5 text-[12px]">
                {bonusLoading ? <Loader2 size={13} className="animate-spin" /> : <Wand2 size={13} className="text-amber-500" />}
                سؤال مشابه بعدی'''
must_count(src, t4_old, 1, "next button")
t4_new = '''              <Button variant="outline" size="sm" onClick={() => generateSimilar(true)} disabled={bonusLoading} className="gap-1.5 text-[12px]">
                {bonusLoading ? <Loader2 size={13} className="animate-spin" /> : <Wand2 size={13} className="text-amber-500" />}
                سؤال مشابه بعدی'''
src = src.replace(t4_old, t4_new)

open(path, "w", encoding="utf-8").write(src)
print("OK — chaining patch applied (4 replacements)")
