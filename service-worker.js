self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("weather-api-cache-v1").then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/manifest.json",
        "/styles.css",
        "/icon.png",
        "/app.js",
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
