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
    var s = { ev: "climb", t: Math.round(performance.now() - t0), jy: +b.jumpY.toFixed(2), x: +b.pos.x.toFixed(2), wz: +(7 + b.pos.z).toFixed(2), vx: +b.vel.x.toFixed(2), vz: +b.vel.z.toFixed(2) };
    L.push(s);
    if (b.jumpY >= 3.1 && !window.__climbDone) {
      window.__climbDone = true;
      clearInterval(iv); send(false);
      L.push({ ev: "climb-ok", t: s.t });
    }
    if (performance.now() - t0 > 14000) { clearInterval(poll); L.push({ ev: "end" }); }
  }, 150);
  return "run-a2-armed";
})()
