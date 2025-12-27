const CACHE_NAME = 'eval-tec4-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './CETEC41.html',
  './CETEC42.html',
  './CETEC43.html',
  './CETEC44.html',
  './CETEC45.html',
  './CETEC46.html',
  './manifest.json'
  // Nota: Las librerías externas (Tailwind, FontAwesome) requieren conexión
  // a menos que las descargues y las sirvas localmente.
];

// Instalación del Service Worker y cacheo de recursos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Archivos cacheados correctamente');
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

// Activación y limpieza de caches antiguas
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
});

// Intercepción de peticiones (Estrategia: Cache primero, luego red)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Si está en caché, lo devuelve, si no, lo busca en la red
        return response || fetch(event.request);
      })
  );
});