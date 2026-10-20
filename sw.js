const CACHE = "nexus-v99";
const FILES = ["./","./index.html","./Nexus.jpg","./manifest.json"];

self.addEventListener("install", e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener("fetch", e=>{
  e.respondWith(
    caches.match(e.request).then(r=> r || fetch(e.request).then(f=>{
      return caches.open(CACHE).then(c=>{c.put(e.request,f.clone()); return f;});
    })).catch(()=>caches.match("./index.html"))
  );
});
