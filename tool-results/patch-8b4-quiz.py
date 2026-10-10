# -*- coding: utf-8 -*-
"""Task 8-b4 — quiz-game.tsx bonus-card edits (string-exact, uniqueness-checked)."""
import sys

path = "/home/z/my-project/src/components/book/quiz-game.tsx"
src = open(path, encoding="utf-8").read()

def must_count(hay, needle, expected, label):
    c = hay.count(needle)
    if c != expected:
        print("FAIL [%s]: expected %d, found %d" % (label, expected, c))
        sys.exit(1)

# 1) lucide imports — add Wand2
t1_old = '  Layers,\n} from "lucide-react";'
must_count(src, t1_old, 1, "imports")
t1_new = '  Layers,\n  Wand2,\n} from "lucide-react";'
src = src.replace(t1_old, t1_new)

# 2) SimilarBonus interface after Question interface
t2_old = '  explanation: string | null;\n}\n\ntype Phase = "setup" | "playing" | "result";'
must_count(src, t2_old, 1, "interface")
t2_new = '''  explanation: string | null;
}

/** سؤال مشابهٔ تولیدشده با هوش مصنوعی — کارت بونس تمرین بی‌پایان */
interface SimilarBonus {
  text: string;
  options: string[];
  answer: number;
  note: string;
}

type Phase = "setup" | "playing" | "result";'''
src = src.replace(t2_old, t2_new)

# 3) bonus states next to ai states
t3_old = '''  const [aiExplaining, setAiExplaining] = useState(false);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);'''
must_count(src, t3_old, 1, "states")
t3_new = t3_old + '''
  /** کارت بونس «سؤال مشابه» — تمرین بی‌پایان از روی سؤال جاری */
  const [bonus, setBonus] = useState<SimilarBonus | null>(null);
  const [bonusSelected, setBonusSelected] = useState<number | null>(null);
  const [bonusLoading, setBonusLoading] = useState(false);
  const [bonusRegen, setBonusRegen] = useState(0); // کلید ری‌انیمیشن کارت بونس'''
src = src.replace(t3_old, t3_new)

# 4) six-space setAiExplanation resets (4 occurrences) — must run BEFORE the 4-space pass
t4_old = "      setAiExplanation(null);"
must_count(src, t4_old, 4, "reset6")
t4_new = t4_old + "\n      setBonus(null);\n      setBonusSelected(null);"
src = src.replace(t4_old, t4_new)

# 5) four-space setAiExplanation resets (2 remaining) — newline-anchored so 6-space lines never match
t5_old = "\n    setAiExplanation(null);\n"
must_count(src, t5_old, 2, "reset4")
t5_new = "\n    setAiExplanation(null);\n    setBonus(null);\n    setBonusSelected(null);\n"
src = src.replace(t5_old, t5_new)

# 6) reset() — clear bonus too
t6_old = "    setSelected(null);\n    setElapsed(0);"
must_count(src, t6_old, 1, "resetFn")
t6_new = "    setSelected(null);\n    setBonus(null);\n    setBonusSelected(null);\n    setElapsed(0);"
src = src.replace(t6_old, t6_new)

# 7) generateSimilar() before nextQuestion()
t7_old = "  function nextQuestion() {"
must_count(src, t7_old, 1, "nextQuestion anchor")
t7_new = '''  /** ساخت یک تست مشابه از سؤال جاری با هوش مصنوعی — نمایش به‌صورت کارت بونس */
  async function generateSimilar() {
    if (!current || bonusLoading) return;
    setBonusLoading(true);
    try {
      const res = await fetch("/api/similar-question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: current.text,
          options: current.options,
          answer: current.answer,
          category: current.category,
          book: {
            id: bookId,
            title: bookData?.info.title ?? "",
            grade: meta?.gradeLabel ?? "",
          },
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.question) {
        toast.error(data.error ?? "سؤال مشابه ساخته نشد — دوباره تلاش کن");
        return;
      }
      setBonus(data.question as SimilarBonus);
      setBonusSelected(null);
      setBonusRegen((n) => n + 1);
    } catch {
      toast.error("خطا در ارتباط با هوش مصنوعی");
    } finally {
      setBonusLoading(false);
    }
  }

  function nextQuestion() {'''
src = src.replace(t7_old, t7_new)

# 8) button row — wrap AI button + add similar-question button
t8_old = '''              <div className="flex flex-wrap items-center justify-between gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={askAiExplanation}
                  disabled={aiExplaining}
                  className="gap-1.5 text-[12px]"
                >
                  {aiExplaining ? <Loader2 size={13} className="animate-spin" /> : <Sparkles size={13} className="text-amber-500" />}
                  توضیح با هوش مصنوعی
                </Button>
                <Button onClick={nextQuestion} className="gap-2">'''
must_count(src, t8_old, 1, "button row")
t8_new = '''              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={askAiExplanation}
                    disabled={aiExplaining}
                    className="gap-1.5 text-[12px]"
                  >
                    {aiExplaining ? <Loader2 size={13} className="animate-spin" /> : <Sparkles size={13} className="text-amber-500" />}
                    توضیح با هوش مصنوعی
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={generateSimilar}
                    disabled={bonusLoading}
                    className="gap-1.5 text-[12px]"
                  >
                    {bonusLoading ? <Loader2 size={13} className="animate-spin" /> : <Wand2 size={13} className="text-teal-500" />}
                    سؤال مشابه بساز
                  </Button>
                </div>
                <Button onClick={nextQuestion} className="gap-2">'''
src = src.replace(t8_old, t8_new)

# 9) bonus card after main card (end of playing view)
t9_old = '''      </Card>
    </div>
  );
}'''
must_count(src, t9_old, 1, "playing end")
t9_new = '''      </Card>

      {/* کارت بونس — سؤال مشابه (تمرین بی‌پایان) */}
      {answered && bonus && (
        <Card key={bonusRegen} className="border-amber-500/40 rise-in">
          <CardContent className="space-y-4 p-5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="gap-1 border-amber-500/40 bg-amber-500/15 text-[11px] text-amber-700 dark:text-amber-300">
                <Wand2 size={11} />
                سؤال مشابه ✨
              </Badge>
              <Badge variant="outline" className="text-[10.5px]">
                تمرین بی‌پایان
              </Badge>
              <span className="mr-auto flex items-center gap-1 text-[11px] font-bold text-muted-foreground">
                ساخته‌شده از سؤال {(index + 1).toLocaleString("fa-IR")}
              </span>
            </div>

            <p dir="ltr" className="font-en rounded-xl bg-amber-500/5 p-4 text-[15px] font-semibold leading-8">
              {bonus.text}
            </p>

            <div className="space-y-2">
              {bonus.options.map((opt, i) => {
                const bonusAnswered = bonusSelected !== null;
                const isCorrect = i === bonus.answer;
                const isChosen = i === bonusSelected;
                return (
                  <button
                    key={i}
                    type="button"
                    aria-pressed={isChosen}
                    disabled={bonusAnswered || bonusLoading}
                    onClick={() => setBonusSelected(i)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl border p-3 transition-all",
                      !bonusAnswered && "hover:border-primary/50 hover:bg-primary/5",
                      bonusAnswered && isCorrect && "border-primary bg-primary/10 shadow-sm",
                      bonusAnswered && isChosen && !isCorrect && "border-destructive bg-destructive/10",
                      bonusAnswered && !isChosen && !isCorrect && "opacity-55",
                    )}
                  >
                    <span
                      className={cn(
                        "inline-flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-lg text-[10px] font-black transition-colors",
                        bonusAnswered && isCorrect
                          ? "bg-primary text-primary-foreground"
                          : bonusAnswered && isChosen && !isCorrect
                            ? "bg-destructive text-destructive-foreground"
                            : "bg-primary/10 text-primary",
                      )}
                    >
                      {LETTERS[i]}
                    </span>
                    <span
                      dir="ltr"
                      className={cn(
                        "font-en flex-1 text-[14px] leading-6",
                        bonusAnswered && isCorrect && "font-bold text-primary",
                        bonusAnswered && isChosen && !isCorrect && "text-destructive",
                      )}
                    >
                      {opt}
                    </span>
                    {bonusAnswered && isCorrect && <CheckCircle2 size={17} className="shrink-0 text-primary" />}
                    {bonusAnswered && isChosen && !isCorrect && <XCircle size={17} className="shrink-0 text-destructive" />}
                  </button>
                );
              })}
            </div>

            {bonusSelected !== null && bonus.note && (
              <div className="rounded-xl border border-accent/50 bg-accent/25 p-3 text-[12.5px] leading-7">
                <p className="mb-1 flex items-center gap-1.5 text-[11px] font-black text-accent-foreground">
                  <Sparkles size={12} className="text-amber-500" />
                  نکتهٔ این تست
                </p>
                {bonus.note}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline" size="sm" onClick={generateSimilar} disabled={bonusLoading} className="gap-1.5 text-[12px]">
                {bonusLoading ? <Loader2 size={13} className="animate-spin" /> : <Wand2 size={13} className="text-amber-500" />}
                سؤال مشابه بعدی
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setBonus(null)} disabled={bonusLoading} className="text-[12px]">
                بستن
              </Button>
              {bonusSelected !== null && (
                <span className="mr-auto flex items-center gap-1 text-[11.5px] font-black">
                  {bonusSelected === bonus.answer ? (
                    <>
                      <CheckCircle2 size={13} className="text-primary" />
                      <span className="text-primary">درست بود! 🎉</span>
                    </>
                  ) : (
                    <>
                      <XCircle size={13} className="text-destructive" />
                      <span className="text-destructive">اشتباه بود — نکته را بخوان</span>
                    </>
                  )}
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}'''
src = src.replace(t9_old, t9_new)

open(path, "w", encoding="utf-8").write(src)
print("OK — all 9 replacements applied")
