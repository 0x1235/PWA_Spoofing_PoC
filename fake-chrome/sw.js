var cacheName = 'poc-v2';
var contentToCache = [
	'/PWA_Spoofing_PoC/fake-chrome/pwa/index.html',
	'/PWA_Spoofing_PoC/fake-chrome/pwa/jquery.min.js',
	'/PWA_Spoofing_PoC/fake-chrome/pwa/favicon.ico',
	'/PWA_Spoofing_PoC/fake-chrome/pwa/img/256px.png',
	'/PWA_Spoofing_PoC/fake-chrome/pwa/main.js'
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
