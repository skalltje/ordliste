// Avviklings-service worker for den gamle adressen skalltje.github.io/ordliste/.
// Nettleseren henter denne når den sjekker etter oppdateringer av den gamle appen. Den sletter
// ordlistens cache, avregistrerer seg selv og laster åpne vinduer på nytt, slik at flyttesiden vises.
"use strict";

self.addEventListener("install", function () { self.skipWaiting(); });

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(keys.filter(function (k) { return k.indexOf("ordliste-") === 0; })
          .map(function (k) { return caches.delete(k); }));
      })
      .then(function () { return self.clients.matchAll({ type: "window" }); })
      .then(function (clients) {
        return Promise.all(clients.map(function (client) { return client.navigate(client.url).catch(function () {}); }));
      })
      .then(function () { return self.registration.unregister(); })
  );
});
