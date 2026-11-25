"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2, Eye, RotateCcw, Shuffle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { SpeakButton } from "./speak-button";
import type {
  CompletionExercise,
  ConstructionExercise,
  ContextMeaningExercise,
  ExerciseKind,
  FillBlankExercise,
  GeneratedExercise,
  MatchExercise,
  RecallExercise,
} from "@/lib/viu-exercise-engine";
import { EXERCISE_OBJECTIVES, isFillBlankCorrect } from "@/lib/viu-exercise-engine";

/**
 * اجراکنندهٔ تمرین‌های داده‌محور درس — رندر آیتم‌های تولیدی موتور (viu-exercise-engine)
 * با بازخورد فوری و گزارش نتیجه به جریان درس (برای ثبت وضعیت یادگیری/SRS).
 *
 * مرزها: هیچ استوری مستقیم مصرف نمی‌کند (فقط callback) — نمره‌گذاری SRS با onGrade
 * به جریان سپرده می‌شود؛ صفر تولید محتوا؛ صفر تغییر دادهٔ متنی.
 */

const fa = (n: number) => n.toLocaleString("fa-IR");

export interface ExerciseRunnerCallbacks {
  /** نتیجهٔ هر آیتم — برای وضعیت یادگیری (پاسخ صحیح در تمرین) و شمارش دقت */
  onResult: (kind: ExerciseKind, word: string | undefined, correct: boolean) => void;
  /** خودارزیابی یادآوری فعال — فقط active-recall — اتصال مستقیم به gradeSrs در جریان */
  onGrade?: (word: string, grade: 0 | 1 | 2) => void;
  /** پایان همهٔ آیتم‌ها */
  onComplete: () => void;
}

export function LessonExerciseRunner({
  items,
  onResult,
  onGrade,
  onComplete,
}: {
  items: GeneratedExercise[];
} & ExerciseRunnerCallbacks) {
  const [idx, setIdx] = useState(0);
  const item = items[idx];
  const isLast = idx + 1 >= items.length;

  if (!item) return null;

  function advance() {
    if (isLast) onComplete();
    else setIdx((i) => i + 1);
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <ProgressDots total={items.length} current={idx} />
        <Badge variant="secondary" className="shrink-0 text-[10px]">
          {EXERCISE_OBJECTIVES[item.kind].title}
        </Badge>
      </div>
      <div key={idx} className="rise-in">
        {item.kind === "word-meaning-match" && <MatchView item={item} onResult={onResult} onDone={advance} />}
        {item.kind === "contextual-meaning" && (
          <ContextMeaningView item={item} onResult={onResult} onDone={advance} />
        )}
        {item.kind === "fill-blank" && <FillBlankView item={item} onResult={onResult} onDone={advance} />}
        {item.kind === "sentence-completion" && (
          <CompletionView item={item} onResult={onResult} onDone={advance} />
        )}
        {item.kind === "sentence-construction" && (
          <ConstructionView item={item} onResult={onResult} onDone={advance} />
        )}
        {item.kind === "active-recall" && <RecallView item={item} onResult={onResult} onGrade={onGrade} onDone={advance} />}
      </div>
    </div>
  );
}

function ProgressDots({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex flex-1 items-center gap-1" aria-label={`تمرین ${fa(current + 1)} از ${fa(total)}`}>
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          aria-hidden
          className={cn(
            "h-1.5 flex-1 rounded-full transition-colors",
            i < current ? "bg-primary" : i === current ? "bg-primary/50" : "bg-muted",
          )}
        />
      ))}
    </div>
  );
}

/** جمله با واژهٔ هدف برجسته‌شده (بازهٔ عین word-in-context) */
function HighlightedSentence({
  en,
  spanStart,
  spanEnd,
  blank = false,
}: {
  en: string;
  spanStart: number;
  spanEnd: number;
  blank?: boolean;
}) {
  return (
    <p dir="ltr" className="font-en text-left text-[14.5px] font-bold leading-7 text-foreground">
      {en.slice(0, spanStart)}
      {blank ? (
        <span aria-label="جای خالی" className="mx-1 inline-block min-w-16 rounded border-b-2 border-primary/60 bg-muted/50 px-2 text-center align-baseline text-muted-foreground">
          &nbsp;
        </span>
      ) : (
        <span className="rounded bg-primary/15 px-1 font-black text-primary">{en.slice(spanStart, spanEnd)}</span>
      )}
      {en.slice(spanEnd)}
    </p>
  );
}

function Feedback({ correct, children }: { correct: boolean; children?: React.ReactNode }) {
  return (
    <div className="space-y-2 rise-in">
      {correct ? (
        <p className="flex items-center gap-1.5 text-[12.5px] font-black text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 size={15} />
          درست بود!
        </p>
      ) : (
        <p className="flex items-center gap-1.5 text-[12.5px] font-black text-destructive">
          <XCircle size={15} />
          درست نبود.
        </p>
      )}
      {children}
    </div>
  );
}

function NextButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <Button size="lg" className="h-11 w-full gap-2 text-[13.5px]" onClick={onClick}>
      {label}
      <ArrowLeft size={15} />
    </Button>
  );
}

// ─── ۱) تطبیق واژه با معنی ───
function MatchView({
  item,
  onResult,
  onDone,
}: {
  item: MatchExercise;
  onResult: ExerciseRunnerCallbacks["onResult"];
  onDone: () => void;
}) {
  const meanings = useMemo(
    () => item.pairs.map((p, i) => ({ id: i, meaning: p.meaning })).sort((a, b) => a.id - b.id),
    [item],
  );
  const [pickedWord, setPickedWord] = useState<string | null>(null);
  const [matched, setMatched] = useState<Record<string, boolean>>({});
  const [attempts, setAttempts] = useState<Record<string, number>>({});
  const [wrongFlash, setWrongFlash] = useState<string | null>(null);
  const doneCount = Object.keys(matched).length;
  const allDone = doneCount === item.pairs.length;

  function pickMeaning(meaning: string) {
    if (!pickedWord || matched[pickedWord]) return;
    const pair = item.pairs.find((p) => p.word === pickedWord);
    if (!pair) return;
    if (pair.meaning === meaning) {
      const correct = (attempts[pickedWord] ?? 0) === 0;
      setMatched((m) => ({ ...m, [pickedWord]: true }));
      onResult("word-meaning-match", pickedWord, correct);
      setPickedWord(null);
      // آخرین جفت هم با همان الگوی سایر تمرین‌ها بسته می‌شود: بازخورد + دکمهٔ ادامه
      // (بدون advance خودکار — جلوگیری از دوبار پرش درصدهای پس‌زمینه)
    } else {
      setAttempts((a) => ({ ...a, [pickedWord]: (a[pickedWord] ?? 0) + 1 }));
      setWrongFlash(meaning);
      setTimeout(() => setWrongFlash(null), 500);
    }
  }

  return (
    <div className="space-y-3 rounded-2xl border bg-card p-4 shadow-sm">
      <p className="text-[12px] font-bold text-muted-foreground">
        واژه را بزن و بعد معنی درستش را انتخاب کن — {fa(item.pairs.length)} جفت.
      </p>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2" role="group" aria-label="واژه‌ها">
          {item.pairs.map((p) => (
            <button
              key={p.word}
              type="button"
              disabled={matched[p.word]}
              onClick={() => setPickedWord(p.word)}
              className={cn(
                "flex min-h-11 w-full min-w-0 items-center gap-2 rounded-xl border px-3 py-2 text-left transition-all",
                matched[p.word]
                  ? "border-emerald-500/50 bg-emerald-500/10"
                  : pickedWord === p.word
                    ? "border-primary bg-primary/10"
                    : "border-border bg-muted/30 hover:border-primary/40",
              )}
            >
              <span dir="ltr" className="font-en min-w-0 flex-1 truncate text-[13.5px] font-black text-primary">
                {p.word}
              </span>
              {matched[p.word] && <CheckCircle2 size={14} className="shrink-0 text-emerald-600 dark:text-emerald-400" />}
            </button>
          ))}
        </div>
        <div className="space-y-2" role="group" aria-label="معنی‌ها">
          {meanings.map((m) => {
            const isMatched = Object.values(matched).length > 0 && item.pairs.some((p) => p.meaning === m.meaning && matched[p.word]);
            return (
              <button
                key={m.id}
                type="button"
                disabled={isMatched}
                onClick={() => pickMeaning(m.meaning)}
                className={cn(
                  "flex min-h-11 w-full min-w-0 items-center rounded-xl border px-3 py-2 text-right text-[12.5px] font-bold leading-5 transition-all",
                  isMatched
                    ? "border-emerald-500/50 bg-emerald-500/10 opacity-70"
                    : wrongFlash === m.meaning
                      ? "border-destructive/60 bg-destructive/10"
                      : "border-border bg-muted/30 hover:border-primary/40",
                )}
              >
                <span className="min-w-0 flex-1 truncate">{m.meaning}</span>
              </button>
            );
          })}
        </div>
      </div>
      {allDone && (
        <Feedback correct>
          <p className="text-[12px] font-bold text-muted-foreground">همهٔ جفت‌ها تطبیق شد — خوب پیش رفت!</p>
          <NextButton label="تمرین بعدی" onClick={onDone} />
        </Feedback>
      )}
    </div>
  );
}

// ─── ۲) معنی در بافت ───
function ContextMeaningView({
  item,
  onResult,
  onDone,
}: {
  item: ContextMeaningExercise;
  onResult: ExerciseRunnerCallbacks["onResult"];
  onDone: () => void;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const correct = picked === item.answer;

  return (
    <div className="space-y-3 rounded-2xl border bg-card p-4 shadow-sm">
      <p className="text-[12px] font-bold text-muted-foreground">
        معنی واژهٔ برجسته را از روی جملهٔ واقعی کتاب انتخاب کن.
      </p>
      <HighlightedSentence en={item.en} spanStart={item.spanStart} spanEnd={item.spanEnd} />
      <p className="rounded-xl bg-muted/50 p-2.5 text-[12px] leading-6 text-muted-foreground">{item.fa}</p>
      <div className="grid gap-2" role="group" aria-label="گزینه‌های معنی">
        {item.options.map((opt, i) => (
          <button
            key={i}
            type="button"
            disabled={picked !== null}
            onClick={() => {
              setPicked(i);
              onResult("contextual-meaning", item.word, i === item.answer);
            }}
            className={cn(
              "flex min-h-11 items-center gap-2 rounded-xl border px-3 py-2 text-right text-[13px] font-bold transition-all",
              picked === null && "border-border bg-muted/30 hover:border-primary/50",
              picked !== null && i === item.answer && "border-emerald-500/60 bg-emerald-500/10",
              picked === i && i !== item.answer && "border-destructive/60 bg-destructive/10",
              picked !== null && i !== item.answer && picked !== i && "opacity-55 border-border",
            )}
          >
            <span className="min-w-0 flex-1">{opt}</span>
          </button>
        ))}
      </div>
      {picked !== null && (
        <Feedback correct={correct}>
          <NextButton label="تمرین بعدی" onClick={onDone} />
        </Feedback>
      )}
    </div>
  );
}

// ─── ۳) جای خالی ───
function FillBlankView({
  item,
  onResult,
  onDone,
}: {
  item: FillBlankExercise;
  onResult: ExerciseRunnerCallbacks["onResult"];
  onDone: () => void;
}) {
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState(false);
  const correct = checked && isFillBlankCorrect(value, item.answer);
  const spanStart = item.enWithBlank.indexOf("______");
  const spanEnd = spanStart >= 0 ? spanStart + 6 : -1;

  return (
    <div className="space-y-3 rounded-2xl border bg-card p-4 shadow-sm">
      <p className="text-[12px] font-bold text-muted-foreground">
        شکل درست واژهٔ <span dir="ltr" className="font-en font-black text-primary">{item.word}</span> را در جای خالی بنویس.
      </p>
      {spanStart >= 0 ? (
        <p dir="ltr" className="font-en text-left text-[14.5px] font-bold leading-7 text-foreground">
          {item.enWithBlank.slice(0, spanStart)}
          <span className="mx-1 inline-block min-w-20 rounded border-b-2 border-primary/60 bg-muted/50 px-2 text-center align-baseline text-[13px] font-black text-foreground/60">
            {checked ? item.answer : value || "…"}
          </span>
          {item.enWithBlank.slice(spanEnd)}
        </p>
      ) : (
        <p dir="ltr" className="font-en text-left text-[14.5px] font-bold leading-7">{item.enWithBlank}</p>
      )}
      <p className="rounded-xl bg-muted/50 p-2.5 text-[12px] leading-6 text-muted-foreground">{item.fa}</p>
      {!checked ? (
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (!value.trim()) return;
            setChecked(true);
            onResult("fill-blank", item.word, isFillBlankCorrect(value, item.answer));
          }}
        >
          <input
            dir="ltr"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="پاسخ را انگلیسی بنویس…"
            aria-label="پاسخ جای خالی"
            className="font-en h-11 min-w-0 flex-1 rounded-xl border bg-muted/30 px-3 text-left text-[14px] font-bold outline-none focus:border-primary/60"
          />
          <Button type="submit" className="h-11 shrink-0 gap-2" disabled={!value.trim()}>
            <CheckCircle2 size={15} />
            بررسی
          </Button>
        </form>
      ) : (
        <Feedback correct={correct}>
          <p className="text-[12px] font-bold text-muted-foreground">
            پاسخ درست: <span dir="ltr" className="font-en font-black text-foreground">{item.answer}</span>
          </p>
          <NextButton label="تمرین بعدی" onClick={onDone} />
        </Feedback>
      )}
    </div>
  );
}

// ─── ۴) تکمیل جمله ───
function CompletionView({
  item,
  onResult,
  onDone,
}: {
  item: CompletionExercise;
  onResult: ExerciseRunnerCallbacks["onResult"];
  onDone: () => void;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const correct = picked === item.answer;
  const spanStart = item.enWithBlank.indexOf("______");
  const spanEnd = spanStart >= 0 ? spanStart + 6 : -1;

  return (
    <div className="space-y-3 rounded-2xl border bg-card p-4 shadow-sm">
      <p className="text-[12px] font-bold text-muted-foreground">واژهٔ درست را برای جای خالی انتخاب کن.</p>
      {spanStart >= 0 ? (
        <HighlightedSentence en={item.enWithBlank} spanStart={spanStart} spanEnd={spanEnd} blank />
      ) : (
        <p dir="ltr" className="font-en text-left text-[14.5px] font-bold leading-7">{item.enWithBlank}</p>
      )}
      <p className="rounded-xl bg-muted/50 p-2.5 text-[12px] leading-6 text-muted-foreground">{item.fa}</p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4" role="group" aria-label="گزینه‌های واژه">
        {item.options.map((opt, i) => (
          <button
            key={i}
            type="button"
            disabled={picked !== null}
            onClick={() => {
              setPicked(i);
              onResult("sentence-completion", item.word, i === item.answer);
            }}
            className={cn(
              "flex min-h-11 items-center justify-center gap-1.5 rounded-xl border px-2 py-2 transition-all",
              picked === null && "border-border bg-muted/30 hover:border-primary/50",
              picked !== null && i === item.answer && "border-emerald-500/60 bg-emerald-500/10",
              picked === i && i !== item.answer && "border-destructive/60 bg-destructive/10",
              picked !== null && picked !== i && "opacity-55 border-border",
            )}
          >
            <span dir="ltr" className="font-en truncate text-[13px] font-black">
              {opt}
            </span>
          </button>
        ))}
      </div>
      {picked !== null && (
        <Feedback correct={correct}>
          <NextButton label="تمرین بعدی" onClick={onDone} />
        </Feedback>
      )}
    </div>
  );
}

// ─── ۵) ساخت جمله ───
function ConstructionView({
  item,
  onResult,
  onDone,
}: {
  item: ConstructionExercise;
  onResult: ExerciseRunnerCallbacks["onResult"];
  onDone: () => void;
}) {
  const [built, setBuilt] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const pool = item.shuffled.filter((t) => {
    const used = built.filter((b) => b === t).length;
    const inShuffled = item.shuffled.filter((s) => s === t).length;
    return used < inShuffled;
  });
  const correct = built.join(" ") === item.tokens.join(" ");

  return (
    <div className="space-y-3 rounded-2xl border bg-card p-4 shadow-sm">
      <p className="text-[12px] font-bold text-muted-foreground">
        جملهٔ واقعی کتاب را با قطعه‌ها بساز — واژهٔ کلیدی: <span dir="ltr" className="font-en font-black text-primary">{item.word}</span>
      </p>
      <div
        dir="ltr"
        className="font-en flex min-h-14 flex-wrap items-center gap-1.5 rounded-xl border border-dashed border-primary/40 bg-primary/5 p-2.5 text-left"
        aria-label="جملهٔ ساخته‌شده"
      >
        {built.length === 0 && <span className="text-[12px] font-bold text-muted-foreground">روی قطعه‌ها بزن…</span>}
        {built.map((t, i) => (
          <button
            key={`${t}-${i}`}
            type="button"
            disabled={checked}
            onClick={() => setBuilt((b) => b.filter((_, j) => j !== i))}
            className="font-en rounded-lg border border-primary/40 bg-card px-2 py-1 text-[13px] font-bold hover:border-destructive/50"
            aria-label={`حذف قطعه ${t}`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-1.5" role="group" aria-label="قطعه‌های جمله">
        {item.shuffled.map((t, i) => {
          const stillAvailable = pool.includes(t);
          return (
            <button
              key={`${t}-${i}`}
              type="button"
              disabled={!stillAvailable || checked}
              onClick={() => {
                if (!stillAvailable) return;
                setBuilt((b) => [...b, t]);
              }}
              className={cn(
                "font-en rounded-lg border px-2.5 py-1.5 text-[13px] font-bold transition-all active:scale-95",
                stillAvailable && !checked
                  ? "border-border bg-muted/40 hover:border-primary/50"
                  : "border-border bg-muted/20 opacity-35",
              )}
            >
              {t}
            </button>
          );
        })}
      </div>
      {!checked ? (
        <div className="flex gap-2">
          <Button
            className="h-11 flex-1 gap-2"
            disabled={built.length !== item.tokens.length}
            onClick={() => {
              setChecked(true);
              onResult("sentence-construction", item.word, correct);
            }}
          >
            <Shuffle size={15} />
            بررسی جمله
          </Button>
          <Button
            variant="outline"
            className="h-11 shrink-0 gap-2"
            onClick={() => {
              setBuilt([]);
              setChecked(false);
            }}
            aria-label="پاک کردن و شروع دوباره"
          >
            <RotateCcw size={15} />
          </Button>
        </div>
      ) : (
        <Feedback correct={correct}>
          <p dir="ltr" className="font-en rounded-xl bg-muted/50 p-2.5 text-left text-[13.5px] font-bold leading-6">
            {item.tokens.join(" ")}
          </p>
          <p className="text-[12px] leading-6 text-muted-foreground">{item.fa}</p>
          <NextButton label="تمرین بعدی" onClick={onDone} />
        </Feedback>
      )}
    </div>
  );
}

// ─── ۶) یادآوری فعال (اتصال SRS) ───
function RecallView({
  item,
  onResult,
  onGrade,
  onDone,
}: {
  item: RecallExercise;
  onResult: ExerciseRunnerCallbacks["onResult"];
  onGrade?: ExerciseRunnerCallbacks["onGrade"];
  onDone: () => void;
}) {
  const [revealed, setRevealed] = useState(false);
  const [graded, setGraded] = useState<0 | 1 | 2 | null>(null);

  return (
    <div className="space-y-3 rounded-2xl border bg-card p-4 shadow-sm">
      <p className="text-[12px] font-bold text-muted-foreground">
        اول خودت معنی را به یاد بیاور، بعد معنی را ببین و صادقانه خودت را ارزیابی کن — نتیجه در مرور SRS ثبت می‌شود.
      </p>
      <div className="flex items-center justify-between gap-2 rounded-2xl border border-primary/30 bg-primary/5 p-4">
        <div className="min-w-0">
          <p dir="ltr" className="font-en truncate text-left text-[19px] font-black text-primary">
            {item.word}
          </p>
          {item.pos && (
            <Badge variant="outline" dir="ltr" className="font-en mt-1 text-[9.5px]">
              {item.pos}
            </Badge>
          )}
        </div>
        <SpeakButton text={item.word} size="lg" />
      </div>
      {!revealed ? (
        <Button size="lg" variant="outline" className="h-12 w-full gap-2" onClick={() => setRevealed(true)}>
          <Eye size={16} />
          معنی را نشانم بده
        </Button>
      ) : (
        <div className="space-y-3 rise-in">
          <p className="rounded-xl bg-muted/50 p-3 text-center text-[14px] font-black leading-7">{item.meaning}</p>
          {graded === null ? (
            <div className="grid grid-cols-3 gap-2" role="group" aria-label="ارزیابی خود">
              <button
                type="button"
                onClick={() => {
                  setGraded(0);
                  onGrade?.(item.word, 0);
                  onResult("active-recall", item.word, false);
                }}
                className="flex min-h-11 items-center justify-center rounded-xl border border-destructive/50 bg-destructive/10 px-2 text-[12px] font-black text-destructive transition-all active:scale-95"
              >
                نمی‌دونستم
              </button>
              <button
                type="button"
                onClick={() => {
                  setGraded(1);
                  onGrade?.(item.word, 1);
                  onResult("active-recall", item.word, false);
                }}
                className="flex min-h-11 items-center justify-center rounded-xl border border-amber-500/50 bg-amber-500/10 px-2 text-[12px] font-black text-amber-700 transition-all active:scale-95 dark:text-amber-400"
              >
                سخت بود
              </button>
              <button
                type="button"
                onClick={() => {
                  setGraded(2);
                  onGrade?.(item.word, 2);
                  onResult("active-recall", item.word, true);
                }}
                className="flex min-h-11 items-center justify-center rounded-xl border border-emerald-500/50 bg-emerald-500/10 px-2 text-[12px] font-black text-emerald-700 transition-all active:scale-95 dark:text-emerald-400"
              >
                بلد بودم
              </button>
            </div>
          ) : (
            <Feedback correct={graded === 2}>
              <p className="text-[11.5px] leading-5 text-muted-foreground">
                {graded === 2
                  ? "این واژه در چرخهٔ مرور SRS تثبیت شد."
                  : "این واژه به صف مرور SRS برگشت — در «مرور امروز» دوباره می‌بینی‌اش."}
              </p>
              <NextButton label={graded === 2 ? "واژهٔ بعدی" : "واژهٔ بعدی"} onClick={onDone} />
            </Feedback>
          )}
        </div>
      )}
    </div>
  );
}
