(function () {
  var b = window.__drv.grab();
  if (!b) return "no-bridge";
  window.__drv.release("KeyW");
  var L = (window.__drv.log = []);
  // نگه‌داشتن گام روی dust — بازیکن در حرکت می‌ماند (ساکن نمی‌میرد)
  var send = function (down) { window.dispatchEvent(new KeyboardEvent(down ? "keydown" : "keyup", { code: "KeyW", key: "w", bubbles: true })); };
  send(true);
  var iv = setInterval(function () { send(true); }, 280);
  window.__probeIv = iv;
  // سنجهٔ rAF — ۱۰ ثانیه
  var frames = 0, t0 = performance.now(), raf = function () { frames++; if (performance.now() - t0 < 10000) requestAnimationFrame(raf); };
  requestAnimationFrame(raf);
  b.aim.yaw = 0.4;
  setTimeout(function () { window.__fps = +(frames / ((performance.now() - t0) / 1000)).toFixed(1); }, 10500);
  setTimeout(function () { clearInterval(iv); send(false); }, 9500);
  return "probe-armed";
})()
