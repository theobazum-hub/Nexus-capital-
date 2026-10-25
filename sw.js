self.addEventListener('install', e=>{
  e.waitUntil(
    caches.open('nexus-v1').then(c=>c.addAll([
      '/Nexus-capital-/',
      '/Nexus-capital-/index.html',
      '/Nexus-capital-/manifest.json',
      '/Nexus-capital-/icon.png'
    ]))
  )
});
self.addEventListener('fetch', e=>{
  e.respondWith(
    caches.match(e.request).then(r=>r||fetch(e.request))
  )
});
