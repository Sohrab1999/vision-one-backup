"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { X, Star, BookOpen, SearchX } from "lucide-react";
import { cn } from "@/lib/utils";
import { DICTIONARY } from "@/data/dictionary";
import { ALL_VOCAB } from "@/data/vocab";
import type { DictEntry, VocabWord } from "@/data/types";
import { SpeakButton } from "./speak-button";
import { useStarredWords, toggleStar } from "@/lib/star-store";

/**
 * Word lookup — کلیک روی هر واژهٔ انگلیسی در متن‌ها، معنی و دیکشنری همان واژه را نشان می‌دهد.
 * داده از دیکشنری ۳۲۶مدخلی + واژگان ۱٬۴۸۸واژهای جزوه (بدون درخواست شبکه).
 */

// ── نگاشت‌های جست‌وجو (lazy singleton) ──
let dictMap: Map<string, DictEntry> | null = null;
let vocabMap: Map<string, VocabWord> | null = null;
let phraseSet: Set<string> | null = null;

function normalize(raw: string): string {
  return raw
    .replace(/[’‘]/g, "'")
    .replace(/[^A-Za-z' \-]/g, "")
    .trim()
    .toLowerCase();
}

function buildMaps() {
  if (dictMap) return;
  dictMap = new Map();
  vocabMap = new Map();
  phraseSet = new Set();
  for (const d of DICTIONARY) {
    const key = normalize(d.word);
    if (key && !dictMap.has(key)) dictMap.set(key, d);
    if (key.includes(" ")) phraseSet!.add(key);
  }
  for (const v of ALL_VOCAB) {
    const key = normalize(v.word);
    if (key && !vocabMap.has(key)) vocabMap.set(key, v);
    if (key.includes(" ")) phraseSet!.add(key);
  }
}

interface LookupHit {
  word: string;
  dict?: DictEntry;
  vocab?: VocabWord;
}

function lookup(norm: string): LookupHit {
  buildMaps();
  const candidates = [norm];
  // ساده‌سازی صرفی: جمع، فعل ساده، «'s»
  if (norm.endsWith("'s")) candidates.push(norm.slice(0, -2));
  if (norm.endsWith("ies")) candidates.push(norm.slice(0, -3) + "y");
  if (norm.endsWith("es")) candidates.push(norm.slice(0, -2));
  if (norm.endsWith("s") && !norm.endsWith("ss")) candidates.push(norm.slice(0, -1));
  if (norm.endsWith("ed")) candidates.push(norm.slice(0, -2), norm.slice(0, -1));
  if (norm.endsWith("ing")) candidates.push(norm.slice(0, -3), norm.slice(0, -3) + "e");
  for (const c of candidates) {
    if (!c) continue;
    const hit = dictMap!.get(c);
    const vocab = vocabMap!.get(c);
    if (hit || vocab) return { word: c, dict: hit, vocab };
  }
  return { word: norm };
}

// ── توکنایز ایندکسمحور: واژه‌ها از regex + عبارت‌های دوتایی مثل "based on" ──
interface WordSpan {
  raw: string;
  norm: string;
  start: number;
  end: number;
}

const WORD_RE = /[A-Za-z]+(?:['’-][A-Za-z]+)*/g;

function extractWords(text: string): WordSpan[] {
  buildMaps();
  const words: WordSpan[] = [];
  for (const m of text.matchAll(WORD_RE)) {
    const start = m.index ?? 0;
    const raw = m[0];
    words.push({ raw, norm: normalize(raw), start, end: start + raw.length });
  }
  // ادغام عبارت دوتایی شناخته‌شده (فقط وقتی بین دو واژه فقط فاصله باشد)
  const merged: WordSpan[] = [];
  let i = 0;
  while (i < words.length) {
    const a = words[i];
    const b = words[i + 1];
    if (
      b &&
      phraseSet!.has(`${a.norm} ${b.norm}`) &&
      /^\s+$/.test(text.slice(a.end, b.start))
    ) {
      merged.push({
        raw: text.slice(a.start, b.end),
        norm: `${a.norm} ${b.norm}`,
        start: a.start,
        end: b.end,
      });
      i += 2;
    } else {
      merged.push(a);
      i += 1;
    }
  }
  return merged;
}

interface Segment {
  kind: "text" | "word";
  raw: string;
  norm?: string;
}

function segmentText(text: string): Segment[] {
  const words = extractWords(text);
  const segs: Segment[] = [];
  let pos = 0;
  for (const w of words) {
    if (w.start > pos) segs.push({ kind: "text", raw: text.slice(pos, w.start) });
    segs.push({ kind: "word", raw: w.raw, norm: w.norm });
    pos = w.end;
  }
  if (pos < text.length) segs.push({ kind: "text", raw: text.slice(pos) });
  return segs;
}

/** متن انگلیسی قابل‌کلیک: هر واژه (و عبارت شناخته‌شده) یک دکمهٔ جست‌وجوست */
export function ClickableEnText({ text, className }: { text: string; className?: string }) {
  const [sel, setSel] = useState<{ hit: LookupHit; x: number; y: number } | null>(null);

  const segs = useMemo(() => segmentText(text), [text]);

  const onWordClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const norm = e.currentTarget.dataset.norm ?? "";
    if (!norm) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setSel({ hit: lookup(norm), x: rect.left + rect.width / 2, y: rect.bottom });
  }, []);

  return (
    <>
      <span dir="ltr" className={className}>
        {segs.map((s, i) =>
          s.kind === "text" ? (
            <span key={i}>{s.raw}</span>
          ) : (
            <button
              key={i}
              type="button"
              data-norm={s.norm}
              onClick={onWordClick}
              className="lookup-word cursor-pointer rounded px-0.5 transition-colors hover:bg-primary/15 hover:text-primary"
              title="معنی این واژه را ببین"
            >
              {s.raw}
            </button>
          ),
        )}
      </span>
      {sel && <LookupPopover sel={sel} onClose={() => setSel(null)} />}
    </>
  );
}

function LookupPopover({ sel, onClose }: { sel: { hit: LookupHit; x: number; y: number }; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const starred = useStarredWords();
  const { hit } = sel;

  // بستن با کلیک بیرون، Escape و اسکرول
  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onClose, { once: true, passive: true });
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onClose);
    };
  }, [onClose]);

  // موقعیت clamp شده به دید
  const W = 300;
  const vw = typeof window !== "undefined" ? window.innerWidth : 400;
  const vh = typeof window !== "undefined" ? window.innerHeight : 600;
  const left = Math.min(Math.max(sel.x - W / 2, 8), vw - W - 8);
  const top = Math.min(sel.y + 8, vh - 200);

  const isStarred = starred.has(hit.word);

  return (
    <div
      ref={ref}
      role="dialog"
      aria-label={`معنی ${hit.word}`}
      className="lookup-pop fixed z-100 w-[300px] rounded-2xl border bg-card p-4 shadow-2xl shadow-black/25"
      style={{ left, top }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="بستن"
        className="absolute left-2.5 top-2.5 flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <X size={13} />
      </button>

      <div className="flex items-start gap-2 pr-1">
        <div className="min-w-0 flex-1">
          <p dir="ltr" className="font-en text-left text-[17px] font-black leading-6 text-primary">
            {hit.word}
          </p>
          {hit.dict?.phonetic && (
            <p dir="ltr" className="font-en mt-0.5 text-left text-[11px] text-muted-foreground">
              {hit.dict.phonetic}
            </p>
          )}
        </div>
        <div className="flex items-center gap-1">
          <SpeakButton text={hit.word} size="md" />
          <button
            type="button"
            onClick={() => toggleStar(hit.word)}
            aria-label={isStarred ? "حذف ستاره" : "ستاره‌دار کردن"}
            title={isStarred ? "حذف ستاره" : "ستاره‌دار کردن"}
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-full transition-all hover:scale-110",
              isStarred ? "text-yellow-500" : "text-muted-foreground hover:text-yellow-500",
            )}
          >
            <Star size={14} className={cn(isStarred && "fill-yellow-500 star-pop")} />
          </button>
        </div>
      </div>

      {hit.vocab && (
        <p className="mt-2 rounded-lg bg-primary/10 px-2.5 py-1.5 text-[13px] font-bold leading-6">
          {hit.vocab.meaning}
        </p>
      )}

      {hit.dict ? (
        <div className="mt-2 space-y-1.5">
          <p className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground">
            <BookOpen size={11} className="text-primary" />
            دیکشنری جزوه
            <span dir="ltr" className="font-en rounded bg-muted px-1 py-px text-[9px]">{hit.dict.pos}</span>
          </p>
          <p dir="ltr" className="font-en text-left text-[12px] leading-5 text-foreground/90">
            {hit.dict.definition}
          </p>
          {hit.dict.examples[0] && (
            <p dir="ltr" className="font-en rounded-lg bg-muted/60 px-2.5 py-1.5 text-left text-[11px] leading-5 text-muted-foreground">
              “{hit.dict.examples[0]}”
            </p>
          )}
        </div>
      ) : !hit.vocab ? (
        <p className="mt-2 flex items-center gap-1.5 text-[11px] leading-5 text-muted-foreground">
          <SearchX size={12} />
          این شکل واژه در دیکشنری و واژگان جزوه پیدا نشد.
        </p>
      ) : null}
    </div>
  );
}
