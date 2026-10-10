/*
 * کتابخانه ویژن — Service Worker (vanilla، بدون Workbox)
 *
 * راهبردها:
 *  - ناوبری (HTML): network-first → کش → صفحه آفلاین
 *  - استاتیک‌ها (/_next/static/، آیکون‌ها، فونت‌ها): cache-first با به‌روزرسانی پس‌زمینه (SWR)
 *  - درخواست‌های GET به /api/: فقط شبکه (بدون کش)
 *  - متدهای غیر GET: هیچ‌گاه کش نمی‌شوند
 */
const CACHE_NAME = "visionone-v1";

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
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
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

self.addEventListener("fetch", (event) => {
  const { request } = event;

  // هیچ‌گاه متدهای غیر GET را کش/دستکاری نمی‌کنیم (POST و…)
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // درخواست‌های cross-origin را نادیده می‌گیریم
  if (url.origin !== self.location.origin) return;

  // APIها: فقط شبکه — بدون کش (شکست شبکه همان‌جا به UI می‌رسد)
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
