"use client";

import { BookOpen, Heart, Send, Library } from "lucide-react";
import { useBook } from "@/lib/book-context";
import { SurveyGate } from "./survey-gate";

export function AppFooter() {
  const { data, meta } = useBook();

  return (
    <>
      {/* data-boot-footer (گام CLS دور ۱): دستگیرهٔ گارد بوت — فوترِ SSR کاربر بازگشته
          تا نشستن نمای نهایی نامرئی است تا پرش فوتر در layout-shift ثبت نشود */}
      <footer data-boot-footer className="mt-auto w-full border-t bg-card/50">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
          {data ? (
            <>
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <BookOpen size={16} />
                </span>
                <div className="leading-tight">
                  <p className="text-sm font-bold">{data.info.title}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {data.info.author} • {data.info.edition}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
                <Send size={13} className="text-primary" />
                <span dir="ltr" className="font-en font-semibold text-primary">
                  {data.info.telegram}
                </span>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Library size={16} />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-bold">کتابخانه ویژن — جزوه‌های زبان انگلیسی</p>
                <p className="text-[11px] text-muted-foreground">
                  {meta ? meta.gradeLabel : "یک جزوه را از قفسه انتخاب کن"}
                </p>
              </div>
            </div>
          )}

          <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            ساخته‌شده با <Heart size={12} className="text-rose-500 fill-rose-500" /> برای دانش‌آموزان ایران
          </p>
        </div>

        {/* بخش «منابع» — تصمیم مصوب مالک O4 (Attribution Level — Resources-Section-Only):
            کامل‌ترین attribution منابع فقط همین‌جا نمایش داده می‌شود تا رابط اصلی برنامه تمیز بماند؛
            هیچ attribution/برچسب/نشانِ منبع کنار تصاویر یا در رابط اصلی نیست. */}
        <div className="mt-6 border-t pt-4">
          <h2 className="flex items-center gap-1.5 text-[12px] font-black text-foreground/80">
            <Library size={13} aria-hidden />
            منابع
          </h2>
          <div className="mt-3 grid gap-3 text-[11px] leading-5 text-muted-foreground lg:grid-cols-2">
            {/* attribution منبع تصاویر Word Atlas — پنج جزء مصوب O2 با محل مصوب O4 */}
            <div className="rounded-xl border bg-background/60 p-3">
              <p className="font-bold text-foreground/75">تصاویر واژه‌نامه (Word Atlas)</p>
              <p className="mt-1">
                <span dir="ltr" className="font-en">Word Atlas contributors</span> — مجوز{" "}
                <span dir="ltr" className="font-en">CC BY 4.0</span>
              </p>
              <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5">
                <a
                  href="https://github.com/designfuchen/word-atlas"
                  target="_blank"
                  rel="noopener noreferrer"
                  dir="ltr"
                  className="font-en font-semibold text-primary underline decoration-dotted underline-offset-4 hover:text-primary/80"
                >
                  github.com/designfuchen/word-atlas
                </a>
                <a
                  href="https://creativecommons.org/licenses/by/4.0/"
                  target="_blank"
                  rel="noopener noreferrer"
                  dir="ltr"
                  className="font-en font-semibold text-primary underline decoration-dotted underline-offset-4 hover:text-primary/80"
                >
                  creativecommons.org/licenses/by/4.0
                </a>
              </p>
              <p className="mt-1.5">
                افشای تغییرات تصاویر (Resize یا تبدیل فرمت): تا امروز هیچ تصویری از Word Atlas وارد برنامه نشده است؛
                هر تغییر آینده در تصاویر، همین‌جا افشا می‌شود.
              </p>
            </div>

            {/* attribution کتاب‌های VIU — نویسنده/ناشر/ISBN/کپی‌رایت (فقط همین بخش — عین O4/§G-۳ فاز ۲) */}
            <div className="rounded-xl border bg-background/60 p-3">
              <p className="font-bold text-foreground/75">مجموعهٔ English Vocabulary in Use — انتشارات Cambridge University Press</p>
              <ul className="mt-1 space-y-1.5">
                <li dir="ltr" className="text-left font-en">
                  Vocabulary in Use — Elementary (2nd Edition) · Michael McCarthy &amp; Felicity O&apos;Dell ·
                  ISBN 0 521 599571 (with answers) / 0 521 656257 (without) · © Cambridge University Press 1999
                </li>
                <li dir="ltr" className="text-left font-en">
                  Vocabulary in Use — Pre-intermediate &amp; intermediate (2nd Edition) · Stuart Redman ·
                  ISBN 0 521 01171 X · © Cambridge University Press 1997, 2003
                </li>
                <li dir="ltr" className="text-left font-en">
                  Vocabulary in Use — Upper-intermediate (2nd Edition) · Michael McCarthy &amp; Felicity O&apos;Dell ·
                  ISBN 0-521-66435-7 · © Cambridge University Press — first edition 1994, this edition 2002
                </li>
              </ul>
              <p className="mt-1.5">
                محتوای این کتاب‌ها صرفاً به‌صورت پردازش شخصی در همین وب‌اپ مالک به‌کار رفته است؛
                ترجمه‌های فارسی تولیدی هستند و بازخوانی انسانی نشده‌اند.
              </p>
            </div>
          </div>
        </div>
      </div>
      </footer>
      {/* گیت نظرسنجی (فاز ۱۲) — بدون UI تا فعال شود */}
      <SurveyGate />
    </>
  );
}
