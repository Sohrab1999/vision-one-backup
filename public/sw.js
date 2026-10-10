/*
 * کتابخانه ویژن — Service Worker (vanilla، بدون Workbox) — نسخهٔ ۲
 *
 * راهبردها:
 *  - ناوبری (HTML): network-first → کش → صفحه آفلاین
 *  - استاتیک‌ها (/_next/static/، آیکون‌ها، فونت‌ها): cache-first با به‌روزرسانی پس‌زمینه (SWR)
 *  - GET /api/questions: network-first + کش ملایم (سقف ۳۰ کلید) — آفلاین هم واژه/گرامر جواب می‌دهد
 *    (پاسخ از کش با هدر «x-from-cache: 1» علامت می‌خورد)
 *  - سایر GETهای /api/: فقط شبکه (بدون کش)
 *  - متدهای غیر GET: هیچ‌گاه کش نمی‌شوند (صف آفلاین سمت صفحه مدیریت می‌شود)
 *  - پیام CACHE_BOOK از صفحه: پیش‌بارگذاری هوشمند chunkهای JS دیده‌شده —
 *    کش واژگان/گرامر هر جزوه برای مطالعهٔ کامل آفلاین
 */
const CACHE_NAME = "visionone-v2";
// کش سؤال‌ها بین نسخه‌های SW حفظ می‌شود (در activate پاک نمی‌شود)
const QUESTIONS_CACHE = "visionone-api-questions";
const QUESTIONS_CACHE_LIMIT = 30;

const PRECACHE_URLS = [
  "/",
  "/offline.html",
  "/manifest.webmanifest",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/maskable-512.png",
  "/icons/apple-touch-icon.png",
  "/icons/icon-32.png",
  "/icons/icon-16.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      // addAll اتمی است؛ اگر منبعی نبود، هر منبع جداگانه کش می‌شود تا نصب نشکند
      await Promise.all(
        PRECACHE_URLS.map(async (url) => {
          try {
            await cache.add(new Request(url, { cache: "reload" }));
          } catch (err) {
            console.warn("[SW] precache skip:", url, err);
          }
        })
      );
      await self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME && key !== QUESTIONS_CACHE)
          .map((key) => caches.delete(key))
      );
      await self.clients.claim();
    })()
  );
});

/** آیا این درخواست یک استاتیک قابل‌کش است؟ */
function isStaticAsset(url) {
  if (url.pathname.startsWith("/_next/static/")) return true;
  if (url.pathname.startsWith("/icons/")) return true;
  if (url.pathname === "/manifest.webmanifest") return true;
  if (url.pathname.startsWith("/_next/image")) return true;
  if (url.pathname.startsWith("/fonts/")) return true;
  return /\.(?:png|jpe?g|gif|webp|avif|svg|ico|bmp|woff2?|ttf|otf|eot)$/i.test(
    url.pathname
  );
}

/** network-first برای ناوبری‌ها؛ در نبود شبکه → کش → صفحه آفلاین */
async function handleNavigation(request) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const fresh = await fetch(request);
    if (fresh && fresh.ok) {
      cache.put(request, fresh.clone()).catch(() => {});
    }
    return fresh;
  } catch (err) {
    const cached =
      (await cache.match(request, { ignoreSearch: true })) ||
      (await cache.match("/"));
    if (cached) return cached;
    const offline = await cache.match("/offline.html");
    if (offline) return offline;
    return new Response("<h1>آفلاین</h1>", {
      status: 503,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }
}

/** cache-first (به سبک stale-while-revalidate) برای استاتیک‌ها */
async function handleStatic(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  if (cached) {
    // به‌روزرسانی پس‌زمینه (بدون توقف پاسخ)
    fetch(request)
      .then((fresh) => {
        if (fresh && fresh.ok) cache.put(request, fresh.clone()).catch(() => {});
      })
      .catch(() => {});
    return cached;
  }
  try {
    const fresh = await fetch(request);
    if (fresh && fresh.ok) {
      cache.put(request, fresh.clone()).catch(() => {});
    }
    return fresh;
  } catch (err) {
    return new Response("", { status: 504, statusText: "Offline" });
  }
}

// ─── کش ملایم سؤال‌ها (آفلاین واقعی واژه/گرامر) ───

/** سقف ۳۰ کلید — قدیمی‌ترها از کش سؤال‌ها حذف می‌شوند */
async function pruneQuestionsCache(cache) {
  try {
    const keys = await cache.keys();
    if (keys.length <= QUESTIONS_CACHE_LIMIT) return;
    const extra = keys.slice(0, keys.length - QUESTIONS_CACHE_LIMIT);
    await Promise.all(extra.map((key) => cache.delete(key)));
  } catch (err) {
    /* noop */
  }
}

/** network-first برای GET /api/questions؛ در نبود شبکه → کش (کلید = pathname + search) */
async function handleQuestions(request) {
  const cache = await caches.open(QUESTIONS_CACHE);
  try {
    const fresh = await fetch(request);
    if (fresh && fresh.ok) {
      cache.put(request, fresh.clone()).catch(() => {});
      pruneQuestionsCache(cache);
    }
    return fresh;
  } catch (err) {
    const cached = await cache.match(request);
    if (cached) {
      const headers = new Headers(cached.headers);
      headers.set("x-from-cache", "1");
      const body = await cached.arrayBuffer();
      return new Response(body, { status: 200, statusText: "OK (offline)", headers });
    }
    return new Response(
      JSON.stringify({ error: "آفلاین هستید و نسخهٔ کش‌شدهٔ این سؤال‌ها موجود نیست" }),
      { status: 503, headers: { "Content-Type": "application/json; charset=utf-8" } }
    );
  }
}

// ─── پیش‌بارگذاری هوشمند کتاب (پیام CACHE_BOOK از صفحه) ───

/** فهرست chunkهای JS دیده‌شدهٔ صفحات باز — از performance resource entries همان صفحات */
function collectScriptUrlsFromClients() {
  const collected = [];
  return self.clients
    .matchAll({ type: "window", includeUncontrolled: true })
    .then((clientList) =>
      Promise.all(
        clientList.map((client) => {
          return new Promise((resolve) => {
            let settled = false;
            const finish = (urls) => {
              if (settled) return;
              settled = true;
              (Array.isArray(urls) ? urls : []).forEach((u) => collected.push(u));
              resolve();
            };
            try {
              const channel = new MessageChannel();
              channel.port1.onmessage = (ev) => finish(ev.data && ev.data.urls);
              // گارد تایم‌اوت — اگر صفحه‌ای جواب نداد، با بقیه ادامه بده
              setTimeout(() => finish(null), 1500);
              client.postMessage({ type: "COLLECT_SCRIPTS" }, [channel.port2]);
            } catch (err) {
              finish(null);
            }
          });
        })
      )
    )
    .then(() => collected);
}

/** پیش‌بارگذاری همهٔ chunkهای JS دیده‌شده — کش واژگان/گرامر برای مطالعهٔ آفلاین */
async function cacheBookChunks() {
  try {
    const raw = await collectScriptUrlsFromClients();
    const urls = [...new Set(raw)].filter((url) => {
      try {
        const parsed = new URL(url, self.location.origin);
        return (
          parsed.origin === self.location.origin &&
          parsed.pathname.startsWith("/_next/static/chunks/") &&
          parsed.pathname.endsWith(".js")
        );
      } catch (err) {
        return false;
      }
    });
    if (!urls.length) return;
    const cache = await caches.open(CACHE_NAME);
    // addAll-safe: هر فایل جداگانه کش می‌شود؛ شکست یکی بقیه را نمی‌شکند
    await Promise.all(
      urls.map(async (url) => {
        try {
          const hit = await cache.match(url);
          if (hit) return;
          await cache.add(url);
        } catch (err) {
          console.warn("[SW] chunk precache skip:", url);
        }
      })
    );
  } catch (err) {
    /* noop */
  }
}

self.addEventListener("message", (event) => {
  const data = event.data || {};
  if (data.type === "SKIP_WAITING") {
    self.skipWaiting();
    return;
  }
  if (data.type === "CACHE_BOOK") {
    event.waitUntil(cacheBookChunks());
  }
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  // هیچ‌گاه متدهای غیر GET را کش/دستکاری نمی‌کنیم (POST و…)
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // درخواست‌های cross-origin را نادیده می‌گیریم
  if (url.origin !== self.location.origin) return;

  // سؤال‌ها: network-first با کش ملایم — آفلاین هم بانک سؤال در دسترس است
  if (url.pathname === "/api/questions") {
    event.respondWith(handleQuestions(request));
    return;
  }

  // بقیهٔ APIها: فقط شبکه — بدون کش (شکست شبکه همان‌جا به UI می‌رسد)
  if (url.pathname.startsWith("/api/")) return;

  // ناوبری‌های HTML: network-first با fallback کش و صفحه آفلاین
  if (request.mode === "navigate") {
    event.respondWith(handleNavigation(request));
    return;
  }

  // استاتیک‌ها: cache-first + به‌روزرسانی پس‌زمینه
  if (isStaticAsset(url)) {
    event.respondWith(handleStatic(request));
  }
});
