(function () {
  if (!window.__fpsBridge) return "no-cached-bridge";
  window.__fpsBridge.__marker = 42;
  // آیا بازی زنده است؟ canvas بازی
  var cs = Array.prototype.slice.call(document.querySelectorAll("canvas"));
  var gc = cs.filter(function (c) { return c.className.indexOf("pointer-events-none") === -1; }).length;
  // dispatch و خواندن فوری
  window.dispatchEvent(new KeyboardEvent("keydown", { code: "KeyW", key: "w", bubbles: true, cancelable: true }));
  var res = {
    gameCanvases: gc,
    markerSeen: window.__fpsBridge.__marker,
    hasW: window.__fpsBridge.keys.has("w"),
    pausedBadge: !!document.querySelector("[data-paused]"),
    overlayText: (document.querySelector("[role=dialog]") || {}).textContent ? document.querySelector("[role=dialog]").textContent.slice(0, 60) : null,
  };
  window.dispatchEvent(new KeyboardEvent("keyup", { code: "KeyW", key: "w", bubbles: true }));
  return JSON.stringify(res);
})()
