# Catatan Revisi Bali Belly Recovery — 31 Oktober 2026

## Fokus revisi
Revisi ini hanya mengubah website Bali Belly Recovery. File DripWell Bali tidak disertakan dan tidak diubah.

## Perubahan
1. Mengaktifkan konfigurasi promo CMS: Vacation Saver Promo, diskon 15%, kode SAVE15.
2. Mempertahankan tiga paket dan harga:
   - Essential: Rp 2.025.000 normal; Rp 1.721.250 promo.
   - Bali Belly + Tablet Medication: Rp 2.275.000 normal; Rp 1.933.750 promo.
   - Complete: Rp 2.525.000 normal; Rp 2.146.250 promo.
3. Memperjelas banner promo agar menyatakan diskon berlaku untuk paket Bali Belly Recovery, bukan seluruh layanan medis/IV Drip.
4. Menambahkan panduan pemesanan lokal yang unik pada masing-masing dari 15 halaman area.
5. Memperbarui title, meta description, Open Graph title/description, dan H1 untuk halaman lokasi.
6. Memperbarui jawaban FAQ terstruktur agar mencantumkan ketiga paket dan harga promo.
7. Menghapus properti schema `medicalSpecialty: Gastroenterology` dan `priceRange` yang tidak tepat/berpotensi membingungkan.
8. Memperbaiki klaim waktu kedatangan tetap 30–60 menit menjadi estimasi yang dikonfirmasi berdasarkan alamat dan ketersediaan.
9. Memperbaiki kalimat halaman Tabanan yang menyebut "clinic base in Gubug" menjadi keterangan alamat bisnis tanpa mengklaim fasilitas klinik.
10. Memperbarui `llms.txt` agar menjelaskan paket, promo, dan ketersediaan secara konsisten.
11. Memperbarui sitemap dan menambahkan halaman Blog.
12. Memperjelas keterangan Admin: pengaturan promo disimpan di CMS, tetapi perubahan setting tidak otomatis mengubah banner/harga statis halaman publik.

## Catatan penting sebelum publikasi
- Promo diatur aktif di `content/site-settings.json` dan harga/banner statis saat ini juga menampilkan SAVE15.
- Jika nanti promo diubah dari Admin, harga dan banner pada halaman publik tetap harus diperbarui dan deploy ulang. Sinkronisasi dinamis penuh belum dibuat.
- CMS tetap membutuhkan konfigurasi Cloudflare Worker, GitHub App, dan Cloudflare Access sesuai `ADMIN_SETUP_ID.md`.
- Kode tidak dapat memverifikasi ketersediaan dokter, harga tambahan, atau cakupan aktual; semua informasi operasional harus dikonfirmasi oleh tim.
- Artikel blog belum dibuat/dipublikasikan karena konten medis perlu ditinjau dokter terlebih dahulu.
- Revisi ini belum membuktikan indexing, ranking, Core Web Vitals, atau performa Google Search Console. Pemeriksaan tersebut dilakukan setelah deployment.
