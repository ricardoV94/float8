// float8 trainer — offline cache, stale-while-revalidate.
// Bump the version to force clients onto a fresh cache after a deploy.
const CACHE = "f8-v2";
const ASSETS = ["./", "./index.html", "./app.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// serve from cache immediately, refresh the cache from the network in the
// background — updates land on the next visit
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    caches.open(CACHE).then(async cache => {
      const cached = await cache.match(e.request);
      const fresh = fetch(e.request)
        .then(r => { if (r.ok) cache.put(e.request, r.clone()); return r; })
        .catch(() => cached);
      return cached || fresh;
    })
  );
});
