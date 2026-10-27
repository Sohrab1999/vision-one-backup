(function () {
  var b = window.__drv.grab();
  if (!b) return "no-bridge";
  var L = (window.__drv.log = []);
  // ورودی تونل — جنوب درگاه (جهان −6.4, 2.0) رو به شمال
  b.pos.x = -6.4; b.pos.z = 2.0 - 7; b.vel.x = 0; b.vel.z = 0; b.aim.yaw = 0; b.aim.pitch = 0;
  var send = function (down) { window.dispatchEvent(new KeyboardEvent(down ? "keydown" : "keyup", { code: "KeyW", key: "w", bubbles: true })); };
  // فاز ۱: سکون ۲٫۹ث بیرون تونل (نمایان) — شروع تعقیب پهپاد
  L.push({ ev: "phase1-still", t: 0 });
  var t0 = performance.now();
  var poll = setInterval(function () {
    var t = performance.now() - t0;
    if (t < 2950) {
      if (t % 500 < 60) L.push({ ev: "still", t: Math.round(t), ph: b.enemyPhase, hid: b.enemyHidden });
    } else if (t < 2950 + 1300) {
      if (!window.__b2) { window.__b2 = true; L.push({ ev: "walk-in", ph: b.enemyPhase }); send(true); }
      var ivw = window.__b2iv = window.__b2iv || setInterval(function () { send(true); }, 250);
    } else {
      clearInterval(window.__b2iv); send(false);
      window.__b2 = false;
      clearInterval(poll);
      L.push({ ev: "in-tunnel-still", wz: +(7 + b.pos.z).toFixed(2), x: +b.pos.x.toFixed(2) });
      // فاز ۳: سکون درون تونل — پهپاد باید رد را گم کند
      var t1 = performance.now();
      var p2 = setInterval(function () {
        var tt = performance.now() - t1;
        L.push({ ev: "hidden", t: Math.round(tt), ph: b.enemyPhase, hid: b.enemyHidden, lost: b.enemyLost });
        if (tt > 6000) { clearInterval(p2); L.push({ ev: "end" }); }
      }, 300);
    }
  }, 100);
  return "run-b-armed";
})()
