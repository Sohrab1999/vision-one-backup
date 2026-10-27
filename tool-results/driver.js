(function () {
  // درایور درون‌صفحه‌ای: نگه‌داشتن کلید با تپ مجدد + گزارش وضعیت
  window.__drv = {
    keys: {},
    iv: null,
    log: [],
    hold: function (code) {
      var self = this;
      this.keys[code] = true;
      var send = function () {
        if (!self.keys[code]) return;
        window.dispatchEvent(new KeyboardEvent("keydown", { code: code, key: code.replace("Key", "").toLowerCase(), bubbles: true, cancelable: true }));
      };
      send();
      clearInterval(self.iv);
      self.iv = setInterval(send, 300);
    },
    release: function (code) {
      this.keys[code] = false;
      clearInterval(this.iv);
      this.iv = null;
      window.dispatchEvent(new KeyboardEvent("keyup", { code: code, key: code.replace("Key", "").toLowerCase(), bubbles: true }));
    },
    grab: function () {
      var cs = Array.prototype.slice.call(document.querySelectorAll("canvas"));
      var game = cs.filter(function (c) { return c.className.indexOf("pointer-events-none") === -1; })[0];
      if (!game) return null;
      var key = Object.keys(game).find(function (k) { return k.indexOf("__reactFiber") === 0; });
      var f = game[key], hops = 0;
      while (f && hops < 30) {
        var hook = f.memoizedState, n = 0;
        while (hook && n < 120) {
          var m = hook.memoizedState;
          if (m && m.current && typeof m.current === "object" && m.current.aim && m.current.pos && m.current.layout && m.current.keys) {
            window.__fpsBridge = m.current;
            return m.current;
          }
          hook = hook.next; n++;
        }
        f = f.return; hops++;
      }
      return null;
    },
    snap: function () {
      var b = window.__fpsBridge;
      if (!b) return null;
      return { wz: +(7 + b.pos.z).toFixed(2), x: +b.pos.x.toFixed(2), jy: +b.jumpY.toFixed(2), fy: +b.floorY.toFixed(2), ph: b.enemyPhase, eta: b.cageEta, hid: b.enemyHidden, lost: b.enemyLost, hearts: null };
    },
  };
  return "driver-installed";
})()
