"use client";

/**
 * جست‌وجوی سراسری کتابخانه (فاز ۷) — پالت فرمان با میان‌بر ⌘K / Ctrl+K.
 *
 * جست‌وجو بین همه ۶ جزوه (واژه / فعل / دیکشنری / گرامر / بانک تست) از طریق
 * /api/search انجام می‌شود؛ انتخاب نتیجه = سوییچ به آن جزوه (setBook) + باز شدن
 * نمای مربوطه (requestView) — همه در کانتکست رویداد کلیک.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import {
  BookOpen,
  ClipboardList,
  FileSearch,
  GraduationCap,
  Library,
  Loader2,
  Repeat,
  Search,
} from "lucide-react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { useBook } from "@/lib/book-context";
import { requestView } from "@/lib/nav-store";
import type { BookId } from "@/data/books/types";

interface SearchHit {
  type: "vocab" | "verb" | "dict" | "grammar" | "quiz";
  title: string;
  subtitle: string;
  view: "vocab" | "verbs" | "dict" | "grammar" | "quiz";
}

interface BookSearchResult {
  id: BookId;
  title: string;
  emoji: string;
  gradeLabel: string;
  hits: SearchHit[];
}

const TYPE_ICON: Record<SearchHit["type"], React.ComponentType<{ size?: number; className?: string }>> = {
  vocab: BookOpen,
  verb: Repeat,
  dict: Library,
  grammar: GraduationCap,
  quiz: ClipboardList,
};

const TYPE_LABEL: Record<SearchHit["type"], string> = {
  vocab: "واژه",
  verb: "فعل",
  dict: "دیکشنری",
  grammar: "گرامر",
  quiz: "تست",
};

export function GlobalSearchButton() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<BookSearchResult[]>([]);
  const seqRef = useRef(0);
  const { setBook, bookId } = useBook();

  // میان‌بر کیبورد ⌘K / Ctrl+K
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // جست‌وجو با debounce سبک — هیچ setState همزمان در بدن effect نیست؛
  // حالت خالی/کوتاه بودن عبارت در رندر با شرط طول مدیریت می‌شود.
  useEffect(() => {
    const q = query.trim();
    if (!open || q.length < 2) return;
    const seq = ++seqRef.current;
    const t = setTimeout(() => {
      setLoading(true);
      fetch(`/api/search?q=${encodeURIComponent(q)}`)
        .then((r) => r.json())
        .then((data: { books?: BookSearchResult[] }) => {
          if (seqRef.current === seq) setResults(data.books ?? []);
        })
        .catch(() => {
          if (seqRef.current === seq) setResults([]);
        })
        .finally(() => {
          if (seqRef.current === seq) setLoading(false);
        });
    }, 250);
    return () => clearTimeout(t);
  }, [query, open]);

  // نتایج فقط برای عبارت معتبر ≥۲ حرف نمایش داده می‌شود (بدون ریست همزمان)
  const trimmed = query.trim();
  const visibleResults = trimmed.length >= 2 ? results : [];

  const openHit = useCallback(
    (hit: SearchHit, id: BookId) => {
      setOpen(false);
      if (bookId !== id) setBook(id);
      requestView(hit.view);
    },
    [bookId, setBook],
  );

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(true)}
        aria-label="جست‌وجوی سراسری در همه جزوه‌ها"
        title="جست‌وجوی سراسری (Ctrl+K)"
        className="rounded-full h-11 w-11 shrink-0 sm:h-9 sm:w-9"
      >
        <Search size={17} />
      </Button>

      <CommandDialog
        open={open}
        onOpenChange={(v) => {
          setOpen(v);
          if (!v) {
            setQuery("");
            setResults([]);
          }
        }}
        aria-label="جست‌وجوی سراسری"
      >
        <CommandInput
          value={query}
          onValueChange={setQuery}
          placeholder="جست‌وجو در همه جزوه‌ها — واژه، گرامر، تست…"
        />
        <CommandList className="min-h-72">
          {loading && trimmed.length >= 2 && (
            <div className="flex items-center justify-center gap-2 py-8 text-sm text-muted-foreground" role="status" aria-live="polite">
              <Loader2 size={15} className="animate-spin" aria-hidden />
              در حال جست‌وجو…
            </div>
          )}
          {!loading && trimmed.length < 2 && (
            <div className="flex flex-col items-center gap-2 py-10 text-center text-sm text-muted-foreground">
              <FileSearch size={26} className="text-muted-foreground/50" aria-hidden />
              حداقل ۲ حرف بنویسید — جست‌وجو در واژگان، گرامر، تست‌ها، افعال و دیکشنری هر ۶ جزوه
            </div>
          )}
          {!loading && trimmed.length >= 2 && visibleResults.length === 0 && (
            <CommandEmpty>نتیجه‌ای یافت نشد.</CommandEmpty>
          )}
          {!loading &&
            visibleResults.map((book) => (
              <CommandGroup
                key={book.id}
                heading={
                  <span className="flex items-center gap-1.5 text-xs font-bold">
                    <span aria-hidden>{book.emoji}</span>
                    {book.gradeLabel}
                  </span>
                }
              >
                {book.hits.map((hit, i) => {
                  const Icon = TYPE_ICON[hit.type];
                  return (
                    <CommandItem
                      key={`${hit.type}-${i}`}
                      value={`${book.id}-${hit.type}-${i}-${hit.title}`}
                      onSelect={() => openHit(hit, book.id)}
                      className="gap-2.5 py-2.5"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                        <Icon size={15} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[13px] font-bold" dir="auto">
                          {hit.title}
                        </span>
                        <span className="block truncate text-[11px] text-muted-foreground" dir="auto">
                          {hit.subtitle}
                        </span>
                      </span>
                      <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
                        {TYPE_LABEL[hit.type]}
                      </span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            ))}
        </CommandList>
        <div className="flex items-center justify-between border-t px-3 py-2 text-[10px] text-muted-foreground">
          <span>انتخاب نتیجه، همان جزوه و نمای مربوطه را باز می‌کند</span>
          <span className="hidden gap-1.5 sm:flex" aria-hidden>
            <kbd className="rounded border bg-muted px-1.5 py-0.5">↑↓</kbd>
            <kbd className="rounded border bg-muted px-1.5 py-0.5">Enter</kbd>
            <kbd className="rounded border bg-muted px-1.5 py-0.5">Esc</kbd>
          </span>
        </div>
      </CommandDialog>
    </>
  );
}
