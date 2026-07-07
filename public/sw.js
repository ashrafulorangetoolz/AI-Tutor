/* AI Tutor — service worker
 * Strategy:
 *   - Navigations (HTML): network-first, fall back to cache, then /offline.
 *   - Static assets (_next/static, images, fonts): stale-while-revalidate.
 *   - Never caches API routes or non-GET requests.
 */
const VERSION = "v1";
const STATIC_CACHE = `aitutor-static-${VERSION}`;
const PAGES_CACHE = `aitutor-pages-${VERSION}`;
const OFFLINE_URL = "/offline";

const PRECACHE = ["/", OFFLINE_URL, "/manifest.webmanifest", "/icon.svg"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(PAGES_CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => ![STATIC_CACHE, PAGES_CACHE].includes(k))
            .map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});

function isStaticAsset(url) {
  return (
    url.pathname.startsWith("/_next/static/") ||
    /\.(?:css|js|woff2?|ttf|otf|png|jpg|jpeg|gif|svg|webp|avif|ico)$/.test(
      url.pathname,
    )
  );
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin GET requests; never cache the API.
  if (
    request.method !== "GET" ||
    url.origin !== self.location.origin ||
    url.pathname.startsWith("/api/")
  ) {
    return;
  }

  // Navigations → network-first with offline fallback.
  if (request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(request);
          const cache = await caches.open(PAGES_CACHE);
          cache.put(request, fresh.clone());
          return fresh;
        } catch {
          const cached = await caches.match(request);
          return cached || (await caches.match(OFFLINE_URL));
        }
      })(),
    );
    return;
  }

  // Static assets → stale-while-revalidate.
  if (isStaticAsset(url)) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(STATIC_CACHE);
        const cached = await cache.match(request);
        const network = fetch(request)
          .then((res) => {
            if (res && res.status === 200) cache.put(request, res.clone());
            return res;
          })
          .catch(() => cached);
        return cached || network;
      })(),
    );
  }
});
