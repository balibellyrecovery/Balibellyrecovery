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


## Penyesuaian SEO halaman area (31 Oktober 2026)
- SEO title seluruh 15 halaman area disederhanakan menjadi format "Bali Belly Doctor in [Area], Bali | Home Doctor Visit".
- Kata "Bali Belly Recovery" dihilangkan dari SEO title halaman area agar fokus pada frasa layanan + lokasi. Nama merek utama "Bali Belly Recovery" tetap dipertahankan pada identitas bisnis/schema dan elemen branding situs.
- Struktur ZIP mengikuti root repository: file halaman utama berada di root; folder `admin/`, `assets/uploads/`, `blog/`, `content/`, dan `workers/` berada pada lokasi masing-masing.


## Revisi SEO title halaman area — 31 Oktober 2026

Seluruh 15 halaman area menggunakan pola title yang konsisten: `Bali Belly Treatment in [Area] | Doctor Home Visit` atau `Bali Belly Treatment in [Area] | Doctor Visit` untuk wilayah gabungan. Kata `Recovery` tidak digunakan dalam SEO title halaman area. URL halaman tidak diubah. Open Graph title dan Twitter title diselaraskan jika tersedia.


## Perbaikan filter paket — 3 November 2026
- Saat website dibuka, hanya paket **Essential Recovery** (package-01) yang tampil; 15 paket lain disembunyikan (termasuk sebelum JavaScript selesai dimuat, lewat CSS `bbr-finder-prehide`).
- Setiap kombinasi filter (B-Complex/Multivitamin + Hydration + Fever Reducer + Oral Medication) kini merekomendasikan tepat 1 paket. 16 kombinasi = 16 paket unik.
- `index.html` sebelumnya tidak memuat `assets/js/package-finder.js`, sehingga beranda menampilkan semua 16 paket. Skrip kini dipasang di seluruh 23 halaman yang memiliki daftar paket.
- Tombol "Clear filters" mengembalikan tampilan ke Essential Recovery.
- Jika paket untuk kombinasi tertentu dinonaktifkan di admin, sistem menampilkan 1 paket terdekat (bukan kosong).


## Pilihan paket otomatis di halaman Appointment — 3 November 2026
- Tombol "BOOK THIS PACKAGE" membuka `appointment.html?package=package-XX` (link statis di 23 halaman sudah membawa ID paket).
- Di halaman appointment, kolom "Choose your package" hanya menampilkan paket yang dipilih (nama + harga promo), tanpa perlu memilih ulang. Ada tautan kecil "Change package" ke halaman packages.
- Jika halaman appointment dibuka langsung (tanpa ?package=) atau paket tidak aktif, daftar lengkap tetap tampil seperti sebelumnya.
- Format pesan WhatsApp tidak berubah (nama paket + harga + info promo).


## Penyeragaman font & layout — 3 November 2026
Skala font tunggal untuk semua halaman (desktop & HP), didefinisikan di bagian bawah `assets/css/site-consistency.css`:
- Judul: H1 56/34px · H2 41/29px · H3 & H4 (judul kartu/paket) 24/21px — Playfair Display.
- Teks: lead 18px · isi 16px · sekunder 15px · kecil 14px · caption 13px · eyebrow 12px — DM Sans.
- Input/select/textarea 16px (mencegah zoom otomatis di iPhone).
Perbaikan:
- Beranda di HP sebelumnya punya 146 aturan font-size khusus (teks 11–13px, H2 22px, H3 13px) sehingga jauh lebih kecil dari halaman lain; aturan font tersebut dihapus, ukuran lain/padding tidak diubah.
- Ukuran font inline yang tidak standar (10/11/17/19px) dirapikan ke skala di atas pada semua halaman.
- Kartu "Why choose us" di HP menjadi 1 kolom agar teks 16px tetap nyaman dibaca.
- Kata miring (em) pada judul di blok CTA hijau gelap tidak lagi berwarna hijau (sebelumnya tidak terbaca).
- Form appointment: label dan tanda * satu baris, isi input tidak lagi tebal; paket terpilih tampil sebagai kartu yang bisa membungkus teks (nama paket panjang tidak terpotong).
- Jarak bawah section 72px → 64px agar ritme layout sama.
