"use client";

/**
 * deep-link — لینک اشتراک درس (فاز ۱۲ «انتشار و رشد»)
 *
 * فرمت لینک:  /?book=<bookId>&lesson=<n>&view=<NavView>
 *   - هر سه پارامتر اختیاری‌اند؛ «فقط book» هم کافی است (سوییچ جزوه)
 *   - book: باید عضو BOOKS و available باشد
 *   - lesson: عدد ۱..۳۰ (سقف امن؛ جزوه‌های فعلی ۳ تا ۸ درس دارند)
 *   - view: باید عضو union بومی NavView باشد
 * اعتبارسنجی سخت: هر پارامتر نامعتبر بی‌صدا نادیده گرفته می‌شود (بدون any) —
 * صفحه هرگز با لینک خراب کرش نمی‌کند.
 *
 * مصرف لینک با DeepLinkGate انجام می‌شود (src/components/book/deep-link-gate.tsx).
 * اگر لینک عمیقی در جریان بود، WhatsNewDialog باز شدن خودکارش را عقب می‌اندازد
 * (کاربری که با لینک درس آمده نباید با دیالوگ خبری روبه‌رو شود).
 */

import type { BookId } from "@/data/books/types";
import { BOOKS } from "@/data/books/registry";
import type { NavView } from "./nav-store";

export interface DeepLink {
  book?: BookId;
  lesson?: number;
  view?: NavView;
}

/** فهرست runtime نمایهای مجاز — هم‌راستا با union بومی NavView در nav-store */
const NAV_VIEWS: readonly NavView[] = [
  "shelf",
  "home",
  "contents",
  "chapter",
  "vocab",
  "grammar",
  "quiz",
  "games",
  "texts",
  "dict",
  "verbs",
  "flashcards",
  "review",
  "notebook",
  "stats",
  "tutor",
  "compare",
  "speaking",
  "class",
];

/** سقف امن شماره درس در لینک (اعتبارسنجی سخت، مستقل از کتاب فعال) */
export const MAX_LESSON = 30;

/** تجزیه و اعتبارسنجی سخت query رشتهٔ لینک عمیق — همیشه آبجکت سالم برمی‌گرداند */
export function parseDeepLink(search: string): DeepLink {
  if (typeof search !== "string" || search.length === 0 || search.length > 500) return {};
  try {
    const qs = search.startsWith("?") ? search.slice(1) : search;
    if (!qs) return {};
    const params = new URLSearchParams(qs);
    const out: DeepLink = {};

    const book = params.get("book");
    if (book && BOOKS.some((b) => b.id === book && b.available)) {
      out.book = book as BookId;
    }

    const lesson = params.get("lesson");
    if (lesson !== null && /^[0-9]{1,2}$/.test(lesson)) {
      const n = Number(lesson);
      if (n >= 1 && n <= MAX_LESSON) out.lesson = n;
    }

    const view = params.get("view");
    if (view && (NAV_VIEWS as readonly string[]).includes(view)) {
      out.view = view as NavView;
    }

    return out;
  } catch {
    return {};
  }
}

// ─── پرچم «لینک عمیق در جریان است» — مصرف‌کننده: WhatsNewDialog ───

let linkUsed = false;

/** فقط DeepLinkGate صدا می‌زند (وقتی پارامتر معتبری در URL بود) */
export function markDeepLinkUsed(): void {
  linkUsed = true;
}

/** آیا این بارگذاری با لینک عمیق آمده؟ (برای عقب انداختن دیالوگ خودکار) */
export function wasDeepLinkUsed(): boolean {
  return linkUsed;
}
