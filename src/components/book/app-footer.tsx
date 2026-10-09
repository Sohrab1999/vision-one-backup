"use client";

import { BookOpen, Heart, Send } from "lucide-react";
import { BOOK_INFO } from "@/data/book-meta";

export function AppFooter() {
  return (
    <footer className="mt-auto w-full border-t bg-card/50">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <BookOpen size={16} />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-bold">{BOOK_INFO.title}</p>
              <p className="text-[11px] text-muted-foreground">
                {BOOK_INFO.author} • {BOOK_INFO.edition}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
            <Send size={13} className="text-primary" />
            <span dir="ltr" className="font-en font-semibold text-primary">
              {BOOK_INFO.telegram}
            </span>
          </div>

          <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            ساخته‌شده با <Heart size={12} className="text-rose-500 fill-rose-500" /> برای دانش‌آموزان ایران
          </p>
        </div>
      </div>
    </footer>
  );
}
