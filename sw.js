/* ============================================================
   FINFLOW MW - PWA OFFLINE ACCELERATION RUNTIME ENGINE
   ============================================================ */
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

// Lock down core system assets on installation
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

// Stream network rows live but fallback to cached styles if connection drops
self.addEventListener('fetch', (e) => {
  // Let Supabase live data bypass the cache completely so balances are always accurate
  if (e.request.url.includes('supabase.co')) {
    return;
  }
  
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    })
  );
});