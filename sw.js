// Service worker for Ordliste. Genereres av scripts/build.py, ikke rediger dist/sw.js direkte.
// Versjonen endres ved hvert bygg med nytt innhold, slik at gammel cache byttes ut.
"use strict";

var CACHE = "ordliste-b5880d6c4f46";
var FILES = ["./", "./index.html", "./manifest.webmanifest", "./icon-180.png", "./icon-192.png", "./icon-512.png", "./icon-maskable-512.png"];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE)
      .then(function (cache) {
        // cache: "reload" hopper over nettleserens HTTP-cache, så vi får nyeste versjon.
        return cache.addAll(FILES.map(function (url) { return new Request(url, { cache: "reload" }); }));
      })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(keys.map(function (key) {
          if (key.indexOf("ordliste-") === 0 && key !== CACHE) return caches.delete(key);
        }));
      })
      .then(function () { return self.clients.claim(); })
      .then(function () { return self.clients.matchAll({ type: "window" }); })
      .then(function (clients) {
        // Gi åpne vinduer beskjed, slik at de kan tilby å laste inn den nye versjonen.
        clients.forEach(function (client) { client.postMessage({ type: "aktivert", versjon: "b5880d6c4f46" }); });
      })
  );
});

// Cache først: appen starter umiddelbart og virker helt uten nett.
self.addEventListener("fetch", function (event) {
  var request = event.request;
  if (request.method !== "GET" || new URL(request.url).origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      caches.match("./index.html").then(function (cached) { return cached || fetch(request); })
    );
    return;
  }

  event.respondWith(
    caches.match(request, { ignoreSearch: true }).then(function (cached) { return cached || fetch(request); })
  );
});
