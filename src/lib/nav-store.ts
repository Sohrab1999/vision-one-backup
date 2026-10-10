"use client";

/**
 * Cross-view navigation request — اجازه می‌دهد از عمق درخت (مثل پاپ‌اور
 * جست‌وجوی واژه در متن‌ها) ناوبری به یک نما درخواست شود، بدون prop-drilling.
 *
 * page.tsx یک handler ثبت می‌کند (useEffect یک‌بار)؛ requestView از داخل
 * handlerهای کلیک صدا زده می‌شود، پس setView همیشه در کانتکست رویداد اجرا می‌شود
 * (نه در رندر و نه در effect) — سازگار با قوانین سخت‌گیرانه react-hooks.
 */

export type NavView =
  | "shelf"
  | "home"
  | "contents"
  | "chapter"
  | "vocab"
  | "grammar"
  | "quiz"
  | "games"
  | "texts"
  | "dict"
  | "verbs"
  | "flashcards"
  | "review"
  | "notebook"
  | "stats"
  | "tutor"
  | "compare"
  | "speaking"
  | "class";

let handler: ((v: NavView) => void) | null = null;

/** Register the navigation handler (page.tsx does this once on mount). */
export function registerNavHandler(fn: (v: NavView) => void): () => void {
  handler = fn;
  return () => {
    if (handler === fn) handler = null;
  };
}

/** Request navigation to a view (call from event handlers only). */
export function requestView(view: NavView) {
  window.scrollTo({ top: 0, behavior: "smooth" });
  handler?.(view);
}
