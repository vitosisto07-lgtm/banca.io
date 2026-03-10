self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('view_file', (event) => {
  event.respondWith(fetch(event.request));
});
