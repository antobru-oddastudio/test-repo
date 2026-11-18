// Shell-only service worker. Never touches cross-origin requests (OSM tiles, maps): no caching, no prefetch.
const CACHE = 'addo-shell-v1'; // bump on release: old caches are deleted on activate
const OFFLINE = '/offline.html';

self.addEventListener('install', (e) =>
  e.waitUntil(
    caches
      .open(CACHE)
      .then((c) => c.addAll(['/', OFFLINE]))
      .then(() => self.skipWaiting()),
  ),
);
self.addEventListener('activate', (e) =>
  e.waitUntil(
    caches
      .keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  ),
);
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin || e.request.mode !== 'navigate') return; // let the browser handle everything else
  e.respondWith(fetch(e.request).catch(() => caches.match(OFFLINE)));
});
