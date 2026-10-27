(function () {
  var sleep = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };
  return (async function () {
    var end = Date.now() + 8000;
    var seen = window.__seenKey || null;
    if (!window.__phaseLog) window.__phaseLog = [];
    var out = [];
    while (Date.now() < end) {
      var s = window.__drv && window.__drv.snap ? window.__drv.snap() : null;
      var body = document.body.innerText;
      var msg = "";
      if (body.indexOf("پهپاد شناسایی متخاصم") >= 0) msg = "detected";
      if (body.indexOf("قفس واژه پرتاب شد") >= 0) msg += (msg ? "+" : "") + "thrown";
      if (body.indexOf("به من نزدیک نشو") >= 0) msg += (msg ? "+" : "") + "near";
      var hearts = (body.match(/❤/g) || []).length;
      var dead = Array.prototype.slice.call(document.querySelectorAll("h2")).some(function (h) { return h.offsetParent && h.textContent.indexOf("گزارش") >= 0; });
      var rec = { t: +((Date.now() - window.__t0) / 1000).toFixed(1), ph: s ? s.ph : "?", eta: s ? s.eta : null, hid: s ? s.hid : null, lost: s ? s.lost : null, hearts: hearts };
      if (msg) rec.msg = msg;
      var key = rec.ph + "|" + rec.eta + "|" + rec.hearts + "|" + rec.msg;
      if (key !== seen) { window.__phaseLog.push(rec); out.push(rec); seen = key; window.__seenKey = key; }
      if (dead) { window.__phaseLog.push({ t: rec.t, result: "REPORT" }); out.push({ t: rec.t, result: "REPORT" }); break; }
      await sleep(450);
    }
    return JSON.stringify(out);
  })();
})()
