(function () {
  var b = window.__drv.grab();
  if (!b) return "no-bridge";
  window.__drv.release("KeyW");
  var L = (window.__drv.log = []);
  // مرحلهٔ ۱: تونل برای چیپ پوشیده
  b.pos.x = -6.6; b.pos.z = -4.0 - 7; b.vel.x = 0; b.vel.z = 0; b.aim.yaw = Math.PI * 0.75; b.aim.pitch = 0;
  var t0 = performance.now();
  var marks = [];
  window.__mark = function (name) { marks.push({ name: name, t: Math.round(performance.now() - t0), chip: (document.body.textContent || "").indexOf("پوشیده") >= 0 }); };
  window.__marks = marks;
  var poll = setInterval(function () {
    var t = performance.now() - t0;
    var chip = (document.body.textContent || "").indexOf("پوشیده") >= 0;
    L.push({ ev: "tunnel", t: Math.round(t), hid: b.enemyHidden, chip: chip, ph: b.enemyPhase });
    if (chip && !window.__chipShot) { window.__chipShot = true; }
    if (t > 3200) {
      clearInterval(poll);
      // مرحلهٔ ۲: گذرگاه برای شیرجهٔ قفس
      b.pos.x = 9.7; b.pos.z = 0 - 7 + 1.7; b.vel.x = 0; b.vel.z = 0; b.jumpY = 3.16; b.floorY = 3.16; b.aim.yaw = Math.PI; b.aim.pitch = -0.1;
      var t1 = performance.now();
      var p2 = setInterval(function () {
        var tt = performance.now() - t1;
        L.push({ ev: "walkway", t: Math.round(tt), jy: +b.jumpY.toFixed(2), ph: b.enemyPhase, eta: +b.cageEta.toFixed(1), ex: +b.enemyPos.x.toFixed(1), ez: +b.enemyPos.z.toFixed(1) });
        if (tt > 13000) { clearInterval(p2); L.push({ ev: "end" }); }
      }, 350);
    }
  }, 300);
  return "run-c-armed";
})()
