// เปลี่ยนเลขเวอร์ชันทุกครั้งที่แก้ไฟล์ เพื่อให้เครื่องผู้ใช้อัปเดต
const CACHE = "medicare-v1";
const CORE = ["./", "./index.html", "./manifest.json",
  "./icons/icon-192.png", "./icons/icon-512.png", "./icons/maskable-512.png", "./icons/apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  // หน้าเว็บ: ลองโหลดใหม่ก่อน ถ้าออฟไลน์ใช้ของที่เก็บไว้
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).then(r => {
      const copy = r.clone(); caches.open(CACHE).then(c => c.put("./index.html", copy)); return r;
    }).catch(() => caches.match("./index.html")));
    return;
  }
  // ไฟล์อื่น (รวมฟอนต์): ใช้ที่เก็บไว้ก่อน แล้วอัปเดตเบื้องหลัง
  e.respondWith(caches.match(req).then(hit => {
    const net = fetch(req).then(r => {
      if (r && (r.ok || r.type === "opaque")) { const copy = r.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return r;
    }).catch(() => hit);
    return hit || net;
  }));
});
