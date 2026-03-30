/* service-worker.js
   Cache completo para o site da Edfor
*/

const CACHE_NAME = 'edfor-cache-v3';

const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/PaginaPrincipal.html',
  '/politica_de_privacidade.html',
  '/missao_e_valores.html',
  '/carrocel.html',
  '/animacao1.html',
  '/animacao-politica.html',
  '/animacao-missao.html',
  '/animacao-catalogo.html',


  // HERO IMAGES
  '/assets/homem_cadeira_de_rodas.jpg',
  '/assets/hospital.avif',
  '/assets/locamed_3d.gif',
  '/assets/icon/logo_3.jpeg',
  '/assets/icon/LocaMed-192x192.png',
  '/assets/icon/LocaMed-512-512.png',
  '/assets/icon/Logo_introdução.png',
  '/assets/icon/unimed_com_br_logo.jpg',
];

// INSTALAÇÃO — adiciona tudo no cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// ATIVAÇÃO — limpa cache antigo
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// FETCH — Cache first com fallback para rede
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
