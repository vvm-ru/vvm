/* VVM demo: сначала сеть (всегда свежая версия), если сети нет — последняя сохранённая копия */
const V="vvm-demo-v53";
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(["./","manifest.webmanifest","icons/icon-192.png"])).catch(()=>{}).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
 const r=e.request;if(r.method!=="GET"||r.headers.has("range"))return;
 const u=new URL(r.url);if(u.origin!==location.origin)return;
 e.respondWith(fetch(r).then(res=>{if(res&&res.ok&&res.type==="basic"){const c=res.clone();caches.open(V).then(ca=>ca.put(r,c)).catch(()=>{})}return res})
  .catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||(r.mode==="navigate"?caches.match("./"):null)).then(m=>m||Response.error())))});
