"use client";

/**
 * DeepLinkGate — مصرف یک‌بارهٔ لینک عمیق (فاز ۱۲) — بدون UI.
 *
 * یک‌بار در mount (گارد ماژولی؛ در StrictMode دوبار اجرا نمی‌شود):
 *   ۱. parse پارامترها با اعتبارسنجی سخت (parseDeepLink)
 *   ۲. اگر book بود → setActiveBookId (سوییچ جزوه)
 *   ۳. اگر lesson بود → کلید «درس جاری» با writeScoped ثبت می‌شود (بعد از
 *      setActiveBookId تا scoped به کتاب درست شود)
 *   ۴. ناوبری با requestView (در کانتکست timeout — مجاز طبق قرارداد nav-store)
 *   ۵. پاک‌سازی URL با history.replaceState تا refresh دوباره jump نکند
 *
 * مسیر باز شدن درس خواسته‌شده:
 *   chapter-view درس را از state داخلی page.tsx می‌گیرد (کلید localStorage برای
 *   «درس جاری» وجود ندارد — تنها API عمومی برای openChapter کارت درس در نمای
 *   «فهرست» است). پس gate همان مسیر انسانی را می‌رود:
 *   requestView("contents") → انتظار برای کارت درس → dispatch کلیک بومی →
 *   openChapter(lesson) در page.tsx اجرا می‌شود. اگر کارت تا ۴ ثانیه پیدا نشد
 *   (درس خارج از فهرست یا خطا)، به‌جایش نمای chapter پیش‌فرض باز می‌شود.
 */

import { useEffect } from "react";
import { parseDeepLink, markDeepLinkUsed } from "@/lib/deep-link";
import { setActiveBookId, writeScoped } from "@/lib/book-storage";
import { requestView } from "@/lib/nav-store";

/** گارد ماژولی — اجرای دوباره در StrictMode/HMR بی‌اثر است */
let consumed = false;

/** نام کلید scoped «درس جاری» — مستندشده برای سازگاری آیندهٔ chapter-view */
const CHAPTER_KEY = "chapter";

/** مهلت انتظار برای ظاهر شدن کارت درس در فهرست (بارگذاری تنبل جزوه) */
const HUNT_TIMEOUT_MS = 4000;

/** یافتن کارت درس در نمای فهرست — قرارداد پایدار ContentsView: role=button + aria-label «باز کردن فصل …» + بج شمارهٔ درس */
function findChapterCard(lesson: number): HTMLElement | null {
  const faNum = lesson.toLocaleString("fa-IR");
  const cards = document.querySelectorAll<HTMLElement>(
    'main [role="button"][aria-label^="باز کردن فصل"]',
  );
  for (const card of Array.from(cards)) {
    if (!card.isConnected) continue;
    // اولین span هر کارت = بج شمارهٔ درس (faNum) یا «مرور»
    const badge = card.querySelector("span");
    if (badge?.textContent?.trim() === faNum) return card;
  }
  return null;
}

/** راندن مسیر انسانی «فهرست → کارت درس» — در پایان ChapterView با درس خواسته‌شده باز است */
function openLessonViaContents(lesson: number): void {
  requestView("contents");
  const deadline = Date.now() + HUNT_TIMEOUT_MS;
  const hunt = () => {
    const card = findChapterCard(lesson);
    if (card) {
      // کلیک بومی حبابی — handler onClick کتاب در openChapter(lesson) اجرا می‌شود
      card.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
      return;
    }
    if (Date.now() > deadline) {
      // کارت پیدا نشد (درس نامعتبر برای این جزوه) — نمای پیش‌فرض درس
      requestView("chapter");
      return;
    }
    setTimeout(hunt, 120);
  };
  setTimeout(hunt, 200);
}

export function DeepLinkGate() {
  useEffect(() => {
    if (consumed) return;
    consumed = true;

    const link = parseDeepLink(window.location.search);
    if (!link.book && !link.lesson && !link.view) return;
    markDeepLinkUsed();

    if (link.book) setActiveBookId(link.book);
    if (link.lesson) writeScoped(CHAPTER_KEY, String(link.lesson));

    const lesson = link.lesson;
    const target = link.view ?? (lesson ? "chapter" : undefined);
    if (target) {
      setTimeout(() => {
        if (lesson && (!link.view || link.view === "chapter")) {
          openLessonViaContents(lesson);
        } else {
          requestView(target);
        }
      }, 120);
    }

    // پاک‌سازی URL — refresh دوباره jump نمی‌کند
    setTimeout(() => {
      try {
        window.history.replaceState(null, "", window.location.pathname);
      } catch {
        /* noop */
      }
    }, 160);
  }, []);

  return null;
}

export default DeepLinkGate;
