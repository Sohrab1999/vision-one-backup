(function () {
  var b = window.__drv.grab();
  if (!b) return "no-bridge";
  var L = (window.__drv.log = []);
  b.pos.x = 9.7; b.pos.z = 8.9 - 7; b.vel.x = 0; b.vel.z = 0; b.aim.yaw = 0; b.aim.pitch = 0;
  var send = function (down) { window.dispatchEvent(new KeyboardEvent(down ? "keydown" : "keyup", { code: "KeyW", key: "w", bubbles: true })); };
  send(true);
  var iv = setInterval(function () { send(true); }, 250);
  var t0 = performance.now();
  var poll = setInterval(function () {
    if (b.jumpY >= 3.1) {
      clearInterval(iv); clearInterval(poll); send(false);
      L.push({ ev: "climb", jy: +b.jumpY.toFixed(2), wz: +(7 + b.pos.z).toFixed(2), ms: Math.round(performance.now() - t0) });
      var t1 = performance.now();
      var rep = setInterval(function () {
        L.push({ ev: "stand", t: Math.round(performance.now() - t1), jy: +b.jumpY.toFixed(2), ph: b.enemyPhase, eta: +b.cageEta.toFixed(2), ex: +b.enemyPos.x.toFixed(1), ez: +b.enemyPos.z.toFixed(1) });
        if (performance.now() - t1 > 11000) { clearInterval(rep); L.push({ ev: "stand-end" }); }
      }, 400);
    }
    if (performance.now() - t0 > 8000) { clearInterval(iv); clearInterval(poll); send(false); L.push({ ev: "climb-timeout", jy: +b.jumpY.toFixed(2), wz: +(7 + b.pos.z).toFixed(2) }); }
  }, 150);
  return "run-a-armed";
})()
