"use client";

import { useRef, useState } from "react";
import { GraduationCap } from "lucide-react";
import { LessonStudyFlow } from "./lesson-study-flow";
import { LessonProgressMap } from "./lesson-progress-map";

/**
 * سکشن «آموزش درس‌محور» (پایلوت مصوب مالک) — جایگاه: HomeView کتاب viu-elem.
 *
 * دامنهٔ مصوب (پیام مالک ۲۰۲۶-۱۱-۱۴: «همه گزینه ها به جز گزینه 3 رو انتخاب میکنم»):
 *   گزینهٔ ① مسیر یادگیری درس‌محور + ② کارت واژهٔ غنی + ④ مرور درس‌پایه + ⑤ نقشهٔ پیشرفت.
 *   گزینهٔ ③ تصویرسازی تولیدی واژه‌محور = REJECTED ⇒ O2 بدون تغییر می‌ماند.
 * دامنهٔ پایلوت (پ۲ — پیشنهاد §E سند که مالک آن را رد/تغییر نداد): viu-elem · درس‌های ۱-۵.
 *
 * این کامپوننت فقط گیت پایلوت است: هر منطق یادگیری در lesson-study-flow /
 * lesson-progress-map / استورهای lib جدا نگه داشته می‌شود تا گسترش بعدی (کتاب‌های
 * دیگر) با تغییر همین چند ثابت ممکن باشد.
 */

const PILOT_BOOK_ID = "viu-elem";
const PILOT_LESSONS = [1, 2, 3, 4, 5];

export function ViuTeachingSection() {
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);
  const flowRef = useRef<HTMLDivElement | null>(null);

  function openLesson(lesson: number) {
    setSelectedLesson(lesson);
    // اسکرول نرم به پنل جریان پس از رندر — رفتار استاندارد ناوبری درون‌صفحه
    requestAnimationFrame(() => {
      flowRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  return (
    <section className="space-y-4" aria-label="پایلوت آموزش درس‌محور">
      {/* هدر سکشن + گزینه‌های مصوب */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 text-lg font-black">
          <GraduationCap size={20} className="text-primary" />
          مسیر یادگیری درس‌محور
        </h2>
        <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[10.5px] font-black text-primary">
          پایلوت مصوب مالک — درس‌های {PILOT_LESSONS[0].toLocaleString("fa-IR")} تا{" "}
          {PILOT_LESSONS[PILOT_LESSONS.length - 1].toLocaleString("fa-IR")}
        </span>
      </div>
      <p className="text-[12px] leading-6 text-muted-foreground">
        هر درس یک جریان ۴-گامی دارد: <b className="text-foreground">معرفی واژه‌ها → درسنامه → تمرین همان درس → جمع‌بندی</b>.
        پیشرفت هر درس در نقشهٔ کتاب سبز می‌شود و از جمع‌بندی می‌توانی «مرور فقط همین درس» را در SRS اجرا کنی.
      </p>

      {/* نقشهٔ پیشرفت کتاب — گزینهٔ ⑤ */}
      <LessonProgressMap pilotLessons={PILOT_LESSONS} onSelectLesson={openLesson} />

      {/* جریان درس‌محور — گزینهٔ ① */}
      {selectedLesson !== null && (
        <div ref={flowRef}>
          <LessonStudyFlow
            key={selectedLesson}
            lesson={selectedLesson}
            pilotLessons={PILOT_LESSONS}
            onLessonChange={setSelectedLesson}
            onClose={() => setSelectedLesson(null)}
          />
        </div>
      )}
    </section>
  );
}

/** گیت پایلوت — فقط کتاب viu-elem؛ بقیهٔ کتاب‌ها بایت‌به‌بایت بدون تغییر */
export function isViuTeachingPilotBook(bookId: string | null | undefined): boolean {
  return bookId === PILOT_BOOK_ID;
}
