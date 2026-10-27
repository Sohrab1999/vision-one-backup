(async () => {
  // پروب rAF ده‌ثانیه‌ای — بودجه §۳ (بقا قاعدهٔ خالص است — انتظار صفر هزینه)
  const el = document.querySelector('[aria-label^="میدان سه"]');
  if (!el) return "no-scene";
  let frames = 0;
  let last = performance.now();
  const start = last;
  const tick = () => { frames++; const n = performance.now(); if (n - start < 10000) requestAnimationFrame(tick); };
  requestAnimationFrame(tick);
  await new Promise((r) => setTimeout(r, 10500));
  const fps = Math.round((frames / (performance.now() - start)) * 1000);
  return JSON.stringify({ fps, note: "SwiftShader headless — عدد نسبی" });
})()
