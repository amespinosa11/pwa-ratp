'use strict';

// CODELAB: Update cache names any time any of the cached files change.
//const CACHE_NAME = 'static-cache-v1';
const CACHE_NAME = 'static-cache-v3';
const DATA_CACHE_NAME = 'data-cache-v3';
//console.log('Hello from service-worker.js');
// CODELAB: Add list of files to cache here.
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/scripts/app.js',
  '/scripts/install.js',
  '/styles/inline.css',
  '/images/ic_add_white_24px.svg',
  '/images/ic_refresh_white_24px.svg',
];

self.addEventListener('fetch', (evt) => {
  //console.log('[ServiceWorker] Fetch', evt.request.url);
  if (evt.request.url.includes('/')) {
    //console.log('[Service Worker] Fetch (data)', evt.request.url);
    evt.respondWith(
        caches.open(DATA_CACHE_NAME).then((cache) => {
          return fetch(evt.request)
              .then((response) => {
                console.log(response);
                // If the response was good, clone it and store it in the cache.
                if (response.status === 200) {
                  cache.put(evt.request.url, response.clone());
                }
                return response;
              }).catch((err) => {
                // Network request failed, try to get it from the cache.
                return cache.match(evt.request);
              });
        }));
    return;
  }
  evt.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(evt.request)
            .then((response) => {
              console.log(response);
              return response || fetch(evt.request);
            });
      })
  );
});
