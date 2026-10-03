MEDICARE PWA — วิธีนำขึ้นใช้งาน
1) อัปโหลดทั้งโฟลเดอร์นี้ (index.html, manifest.json, sw.js, icons/) ไปยังโฮสต์ที่เป็น HTTPS
   เช่น GitHub Pages / Netlify / Cloudflare Pages / เซิร์ฟเวอร์ รพ.
   (ทดสอบในเครื่อง: python3 -m http.server แล้วเปิด http://localhost:8000)
2) เปิดลิงก์บนมือถือ
   - Android (Chrome): เมนู ⋮ > ติดตั้งแอป / เพิ่มลงในหน้าจอหลัก
   - iPhone (Safari): ปุ่มแชร์ > เพิ่มลงในหน้าจอโฮม
3) เปิดครั้งแรกขณะออนไลน์ 1 ครั้ง จากนั้นใช้งานออฟไลน์ได้
4) เมื่อแก้ไฟล์ ให้เปลี่ยน CACHE = "medicare-v1" ใน sw.js เป็น v2, v3, ...
