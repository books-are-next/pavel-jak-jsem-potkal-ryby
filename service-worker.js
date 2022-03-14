/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-2b90c59';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./favicon.png","./index.html","./jak_jsem_potkal_ryby_002.html","./jak_jsem_potkal_ryby_005.html","./jak_jsem_potkal_ryby_006.html","./jak_jsem_potkal_ryby_007.html","./jak_jsem_potkal_ryby_008.html","./jak_jsem_potkal_ryby_009.html","./jak_jsem_potkal_ryby_010.html","./jak_jsem_potkal_ryby_011.html","./jak_jsem_potkal_ryby_012.html","./jak_jsem_potkal_ryby_013.html","./jak_jsem_potkal_ryby_014.html","./jak_jsem_potkal_ryby_015.html","./jak_jsem_potkal_ryby_016.html","./jak_jsem_potkal_ryby_017.html","./jak_jsem_potkal_ryby_018.html","./jak_jsem_potkal_ryby_019.html","./jak_jsem_potkal_ryby_020.html","./jak_jsem_potkal_ryby_021.html","./jak_jsem_potkal_ryby_022.html","./jak_jsem_potkal_ryby_023.html","./jak_jsem_potkal_ryby_024.html","./jak_jsem_potkal_ryby_025.html","./jak_jsem_potkal_ryby_026.html","./jak_jsem_potkal_ryby_027.html","./jak_jsem_potkal_ryby_028.html","./jak_jsem_potkal_ryby_029.html","./jak_jsem_potkal_ryby_030.html","./manifest.json","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./resources/image001_fmt.png","./resources/image002_fmt.png","./resources/obalka_jak_jsem_potkal__fmt.png","./resources/upoutavka_eknihy_fmt.png","./scripts/bundle.js","./style/style.min.css","./template-images/circles.png"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
