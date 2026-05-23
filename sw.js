const CACHE_NAME = 'finflow-v1';
const STATIC_ASSETS = [
  'index.html',
  'login.html',
  'signup.html',
  'dashboard.html',
  'transactions.html',
  'reports.html',
  'style.css',
  'main.js',
  'auth.js',
  'signup.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.url.includes('supabase.co')) {
    return;
  }
  
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    })
  );
});