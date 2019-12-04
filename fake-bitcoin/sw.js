var cacheName = 'poc-v1'
var contentToCache = [
	'/PWA_Spoofing_PoC/fake-bitcoin/pwa/index.html',
	'/PWA_Spoofing_PoC/fake-bitcoin/pwa/jquery.min.js',
	'/PWA_Spoofing_PoC/fake-bitcoin/pwa/favicon.png',
	'/PWA_Spoofing_PoC/fake-bitcoin/pwa/main.js',
	'/PWA_Spoofing_PoC/fake-bitcoin/pwa/img/main.png',
	'/PWA_Spoofing_PoC/fake-bitcoin/pwa/img/open.png',
	'/PWA_Spoofing_PoC/fake-bitcoin/pwa/img/warning.png'
];

// Installing Service Worker
self.addEventListener('install', function(e) {
  console.log('[Service Worker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[Service Worker] Caching all: app shell and content');
      return cache.addAll(contentToCache);
    })
  );
});

// Fetching content using Service Worker
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(r) {
      console.log('[Service Worker] Fetching resource: '+e.request.url);
      return r || fetch(e.request).then(function(response) {
        return caches.open(cacheName).then(function(cache) {
          console.log('[Service Worker] Caching new resource: '+e.request.url);
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});
