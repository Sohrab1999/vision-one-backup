(async () => {
  try {
    let frames = 0;
    let done = false;
    const tick = () => { frames++; if (!done) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
    const t0 = performance.now();
    while (performance.now() - t0 < 3000) await sleep2(100);
    done = true;
    function sleep2(ms) { return new Promise((r) => setTimeout(r, ms)); }
    return JSON.stringify({ fps: Math.round((frames / 3) * 10) / 10 });
  } catch (e) {
    return JSON.stringify({ err: String((e && e.message) || e) });
  }
})()
