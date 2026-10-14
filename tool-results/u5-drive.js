/**
 * U5 QA — رانندگی تا رئیس واژه با پاسخ‌های درست کلیدی (تکنیک اثبات‌شدهٔ u4-answer.js).
 * هر فراخوانی = یک chunk کوتاه (≤۵ پاسخ) — ضد timeout CDP (درس QA فاز U4).
 * خواندن پیشرفت: window.__u5 = {answered, bossSeen, panSnapshot}.
 */
(() => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const findQ = () => {
    const el = document.querySelector('[aria-label^="میدان سه‌بعدی"]') || document.querySelector('[aria-label^="میدان سهبعدی"]');
    if (!el) return null;
    const fk = Object.keys(el).find((k) => k.startsWith("__reactFiber"));
    if (!fk) return null;
    let f = el[fk];
    for (let up = 0; up < 40 && f; up++) {
      let h = f.memoizedState;
      for (let hn = 0; h && hn < 90; hn++, h = h.next) {
        const v = h.memoizedState;
        if (v && typeof v === "object" && Array.isArray(v.targets) && typeof v.promptMain === "string") return v;
      }
      f = f.return;
    }
    return null;
  };
  const press = (k) => window.dispatchEvent(new KeyboardEvent("keydown", { key: k, bubbles: true }));

  window.__u5 = window.__u5 || { answered: 0, log: [] };
  const st = window.__u5;
  const MAX = 5;

  return (async () => {
    // شروع دور اگر لازم است
    const body0 = document.body.innerText;
    if (body0.includes("گزارش مأموریت")) {
      const again = [...document.querySelectorAll("button")].find((b) => (b.textContent || "").includes("دور جدید"));
      if (again) { again.click(); await sleep(2400); }
    } else if (body0.includes("شروع مأموریت")) {
      const s = [...document.querySelectorAll("button")].find((b) => /شروع مأموریت/.test(b.textContent || ""));
      if (s) { s.click(); await sleep(2400); }
    }

    for (let i = 0; i < MAX; i++) {
      const body = document.body.innerText;
      if (body.includes("گزارش مأموریت")) { st.log.push("DEAD"); break; }
      if (body.includes("رئیس واژه")) { st.log.push("BOSS-SEEN"); break; }
      const q = findQ();
      if (!q || !q.targets) { await sleep(400); continue; }
      const good = q.targets.find((t) => t.correct);
      if (!good) { await sleep(400); continue; }
      const ordered = [...q.targets].sort((a, b) => a.lane - b.lane);
      const key = String(ordered.findIndex((t) => t.id === good.id) + 1);
      press(key);
      st.answered += 1;
      st.log.push("k" + key + "@" + st.answered);
      await sleep(1300); // فریز برخورد + گذار سؤال
    }
    st.panSnapshot = (window.__panLog || []).length;
    return JSON.stringify({ answered: st.answered, log: st.log.slice(-7), pan: st.panSnapshot, boss: document.body.innerText.includes("رئیس واژه") });
  })();
})()
