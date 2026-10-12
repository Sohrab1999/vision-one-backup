(async () => {
  const norm = s => (s || "").replace(/\u200c/g, "");
  const vis = t => [...document.querySelectorAll("button,a")].filter(e => e.offsetParent && norm(e.textContent).includes(t));
  const step = async (t, ms = 1400) => { const e = vis(t)[0]; if (e) { e.click(); await new Promise(r => setTimeout(r, ms)); return true; } return false; };
  const dlg = document.querySelector("[role=dialog] button[aria-label=Close]");
  if (dlg) { dlg.click(); await new Promise(r => setTimeout(r, 700)); }
  await step("پایه هفتم");
  await step("بازیها");
  const card = [...document.querySelectorAll("button")].find(x => x.offsetParent && x.className.includes("rise-in") && norm(x.textContent).startsWith("دوئل آنلاین"));
  if (!card) return "no-card";
  card.click();
  await new Promise(r => setTimeout(r, 2200));
  const inp = [...document.querySelectorAll("input")].find(e => e.offsetParent);
  if (inp && !inp.value) {
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
    setter.call(inp, "QA تست");
    inp.dispatchEvent(new Event("input", { bubbles: true }));
    await new Promise(r => setTimeout(r, 400));
  }
  const bot = [...document.querySelectorAll("button")].find(e => e.offsetParent && norm(e.textContent).includes("تمرین با ربات"));
  if (!bot || bot.disabled) return "bot-disabled";
  bot.click();
  await new Promise(r => setTimeout(r, 2500));
  const startBtn = [...document.querySelectorAll("[role=dialog] button")].find(e => e.offsetParent && norm(e.textContent).trim().startsWith("شروع دوئل"));
  if (startBtn) startBtn.click();
  let ov = null;
  for (let i = 0; i < 60; i++) {
    await new Promise(r => setTimeout(r, 60));
    ov = document.querySelector(".fs-enter");
    if (ov && i > 6) break;
  }
  if (!ov) return "no-overlay";
  const pe = getComputedStyle(ov).pointerEvents;
  const opt1 = [...ov.querySelectorAll("button")].find(b => /گزینه/.test(b.getAttribute("aria-label") || ""));
  let clicked = false;
  if (opt1) { opt1.click(); clicked = true; }
  await new Promise(r => setTimeout(r, 1500));
  const after = ov.innerText.replace(/\s+/g, " ");
  return JSON.stringify({
    pointerEvents: pe,
    clicked,
    scrollLocked: document.documentElement.style.overflow === "hidden",
    myChoiceMarked: /۱/.test((opt1 && opt1.className) || "") || after.includes("سؤال"),
    hudAfter: after.slice(0, 170),
  });
})()
