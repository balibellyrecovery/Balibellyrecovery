BALI BELLY RECOVERY — CMS HOMEPAGE INTEGRATION PATCH

Isi paket (overlay ke repository GitHub yang sedang digunakan):
- index.html                         Homepage dengan koneksi data CMS publik
- admin/index.html                  Admin dengan panel Treatment Gallery
- admin/admin.js                    Admin JS (login session, blog, media, promo, gallery)
- admin/admin.css                   Stylesheet Admin
- workers/cms-worker.js             Cloudflare Worker dengan public homepage endpoint + gallery save

CARA PASANG
1. Backup repository GitHub saat ini atau buat branch backup terlebih dahulu.
2. Upload/replace file sesuai path di atas. Jangan menghapus file website lain.
3. Deploy workers/cms-worker.js ke Cloudflare Worker yang saat ini melayani api.balibellyrecovery.com.
4. Pertahankan seluruh Worker secrets/bindings yang sudah digunakan: ADMIN_EMAIL, ADMIN_PASSWORD, SESSION_SECRET, GH_APP_ID, GH_APP_PRIVATE_KEY, GH_INSTALLATION_ID, GH_OWNER, GH_REPO, GH_BRANCH (jika digunakan), dan LOGIN_LIMITER (jika binding tersedia).
5. Pastikan GH_OWNER/GH_REPO/GH_BRANCH menunjuk repository dan branch yang benar. Worker harus dapat membaca/menulis index.html, content/site-settings.json, content/blog/index.json, blog/, assets/uploads/ dan sitemap.xml.
6. Tunggu deployment GitHub Pages selesai. Buka /admin/ lalu login.
7. Tes Treatment Gallery: upload 1 foto, isi caption + ALT text, klik Simpan Galeri. Tunggu deployment, lalu cek homepage.
8. Tes Blog: simpan draft, pastikan belum muncul di homepage; terbitkan artikel (konten medis wajib medical review), tunggu deployment, lalu cek homepage. Maksimal 3 artikel terbaru tampil.
9. Tes Promo: ubah nama promo/kode/catatan lalu simpan. Homepage membaca pengaturan tersebut dari endpoint publik Worker.

CATATAN PROMO PENTING
- Harga pada 16 kartu paket saat ini merupakan harga promo 15% yang sudah tertulis di HTML.
- Untuk mencegah banner menyatakan diskon berbeda dari harga kartu, Admin membatasi promo tetap aktif dan diskon tetap 15%.
- Admin dapat mengubah nama kampanye, kode, tanggal, dan catatan. Harga nominal pada kartu paket belum dihitung ulang otomatis. Untuk mengubah besaran diskon atau menonaktifkan promo, setiap harga normal (base price) dari 16 paket perlu dikonfirmasi terlebih dahulu.

CATATAN GALERI
- Maksimum 8 foto. File gambar diunggah ke assets/uploads/ melalui endpoint Media Library.
- Simpan Galeri akan memperbarui HTML homepage dan content/site-settings.json.

CATATAN BLOG
- Artikel Published dibuat menjadi /blog/{slug}.html, blog/index.html dan sitemap.xml diperbarui oleh Worker yang sudah ada.
- Homepage mengambil 3 artikel Published terbaru dari endpoint publik /api/public/homepage.

KONEKSI
- Homepage publik membaca: https://api.balibellyrecovery.com/api/public/homepage
- Admin menggunakan API: https://api.balibellyrecovery.com
- Endpoint publik hanya mengembalikan promo, galeri, dan artikel Published. Perubahan admin tetap memerlukan sesi login.

PENGUJIAN
File JavaScript sudah diperiksa dengan node --check. Pengujian live belum dilakukan karena tidak ada akses deployment/repository/Cloudflare dari sesi ini. Jangan menganggap perubahan sudah aktif sampai file diunggah dan Worker dideploy.
