var CACHE = "mathstudio-samuelito-v3";
var ARCHIVOS = [
  "./",
  "./index.html",
  "./docente.html",
  "./engine.js",
  "./manifest.json",
  "./icon.svg",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", function (evento) {
  evento.waitUntil(caches.open(CACHE).then(function (cache) { return cache.addAll(ARCHIVOS); }));
  self.skipWaiting();
});

self.addEventListener("activate", function (evento) {
  evento.waitUntil(caches.keys().then(function (claves) {
    return Promise.all(claves.filter(function (c) { return c !== CACHE; }).map(function (c) { return caches.delete(c); }));
  }));
  self.clients.claim();
});

self.addEventListener("fetch", function (evento) {
  if (evento.request.method !== "GET") return;
  evento.respondWith(
    fetch(evento.request).then(function (respuesta) {
      var copia = respuesta.clone();
      caches.open(CACHE).then(function (cache) { cache.put(evento.request, copia); });
      return respuesta;
    }).catch(function () {
      return caches.match(evento.request);
    })
  );
});
