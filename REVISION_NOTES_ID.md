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


## Penyeragaman top bar, header & footer — 3 November 2026
Audit menemukan 5 gaya header berbeda (beranda, halaman biasa, packages, blog index, artikel blog) plus 404 tanpa header. Kini semua halaman memakai satu markup dan satu CSS.

Struktur tunggal (semua halaman):
`<div class="bbr-promo-banner">` + `<header class="bbr-site-header">` berisi logo · `<nav class="bbr-main-nav">` (Home, Covered Areas, Blog, About) · tombol "Book an Appointment".
- Desktop: logo di kiri, menu + tombol dikelompokkan di kanan. Logo kini sejajar dengan konten di bawahnya (sebelumnya menjorok 32px).
- HP (≤760px): baris 1 = logo + tombol, baris 2 = menu (bisa digeser). Tinggi header sama di semua halaman.
- Menu aktif ditandai otomatis (Home / Covered Areas untuk 14 halaman area / Blog / About).

Perubahan:
- `assets/css/site-consistency.css`: blok header ditulis ulang (satu sumber). CSS footer (baris kontak + bar bawah) dipindah ke sini dari `index.html`. Ditambah reset `box-sizing` untuk header/footer.
- `index.html`: aturan header privat (3 blok `<style>`) dihapus; tombol Book dipindah ke luar `<nav>` mengikuti struktur baru.
- Semua halaman root: top bar dan footer diganti versi seragam. Footer sebelumnya hanya beranda yang memiliki "Accepted payment" dan "© 2026 DRIPWELL BALI"; kini semua halaman sama dengan beranda.
- `packages.html`: menu 9 tautan + "Book an appointment" (huruf kecil) disamakan menjadi menu standar.
- `404.html`: ditambah top bar + footer, tautan memakai path absolut (halaman 404 bisa dibuka dari kedalaman URL mana pun), CSS ganda dihapus.
- `blog/index.html` & `blog/bali-belly-symptoms-test.html`: memakai top bar, footer, font dan CSS bersama (sebelumnya header hijau polos/tanpa banner, tombol dan menu hampir tak terbaca).
- `workers/cms-worker.js`: template `articleHtml` dan `updateBlog` diperbarui agar artikel/daftar blog baru dari Admin otomatis memakai top bar & footer yang sama. **Worker WAJIB di-deploy ulang ke Cloudflare** (bukan hanya GitHub), kalau tidak artikel baru akan kembali ke gaya lama.

Hasil verifikasi (Chromium, desktop 1280px & HP 390px): 27 halaman memiliki geometri top bar identik; 0 error JavaScript; filter paket beranda tetap menampilkan 1 paket.

Catatan:
- `packages.html` tidak ditautkan dari halaman mana pun dan tidak ada di sitemap (halaman yatim). Halaman Treatment, Symptoms, dan Home visit hanya ditautkan 1–2 kali dari halaman lain, tidak dari menu utama.
- Bagian hero beranda memiliki overflow horizontal ±18px di lebar 320px (sudah ada sebelumnya, bukan dari header; tidak diubah).
- Halaman Admin (`/admin/`) sengaja tidak diubah karena berupa dashboard privat dengan sidebar sendiri.


## Penyederhanaan beranda — 3 November 2026
Hanya `index.html` yang diubah:
- Section "HOW IT WORKS" (3 langkah: Message us / We come to you / Doctor-led care plan) dihapus beserta CSS-nya.
- Paragraf "Hydration Support adds Electrolyte Solution (total 1,000 ml). Fever Reducer is for patients with a fever…" di bawah filter paket dihapus. "Need help choosing? Ask our doctor before booking." dan tombol Ask the Doctor tetap ada.
- Halaman lain (packages, about, treatment, 14 halaman area, dll.) tidak diubah dan masih memuat paragraf tersebut.
- Tombol hero "See how it works" tetap mengarah ke halaman doctor-home-visit.html.


## Perbaikan bagian "Pilih paket" di semua halaman — 3 November 2026
Masalah: hanya `index.html` yang memuat CSS kartu pilihan tambahan (Hydration / Fever reducer / Oral medication), tombol "Ask the Doctor", dan aturan badge promo. 22 halaman lain memakai markup yang sama tetapi tanpa CSS itu, sehingga teks pilihan menempel ("Hydration supportAdditional..."), daftar "May include" berantakan, tombol Ask the Doctor tampil seperti teks biasa, dan badge "PROMO PRICE" selalu muncul.
Perbaikan:
- CSS pilihan paket dipindah ke `assets/css/package-catalogue.css` (dimuat semua halaman) — satu sumber.
- Baris kartu pilihan tambahan di beranda kini selebar kotak di atasnya (sebelumnya berhenti ±90%).
- Paragraf penjelasan lama di bawah filter dihapus dari 22 halaman agar sama dengan beranda.
Verifikasi (Chromium, 1280px & 390px, 23 halaman): tampilan identik, 0 error JS, tanpa overflow horizontal, filter Multivitamin + Hydration menampilkan 1 paket yang sama di semua halaman.


## "Why choose us" lebih ringkas di HP — 3 November 2026
- Di layar ≤640px kartu kini 2 kolom (sebelumnya 1 kolom, tinggi ±1.500px → ±560px di lebar 390px).
- Ukuran di HP: judul section 26px, judul kartu 15px, isi 13px, padding kartu 14px; kembali 1 kolom di layar ≤340px.
- Desktop tidak berubah. Perubahan ada di akhir `assets/css/site-consistency.css`.


## Menu & footer untuk SEO / sitelinks — 3 November 2026
- Menu utama (semua halaman, termasuk blog & 404): Home · Packages · Doctor Home Visit · Covered Areas · Blog · About (+ tombol Book an Appointment). Halaman aktif ditandai otomatis.
- Footer: baris tautan baru (Packages, Doctor Home Visit, Treatment, Symptoms, Covered Areas, Blog, About). Symptoms & Treatment hanya di footer, tidak di menu utama.
- `index.html`: ditambah JSON-LD `SiteNavigationElement` (petunjuk bagi Google, bukan jaminan sitelinks).
- `sitemap.xml`: ditambah `packages.html`.
- `workers/cms-worker.js`: template artikel/daftar blog memakai menu & footer baru — **Worker WAJIB di-deploy ulang ke Cloudflare**.
- Setelah publish: kirim ulang sitemap di Google Search Console dan minta indexing untuk halaman utama, packages, dan doctor-home-visit. Sitelinks dipilih otomatis oleh Google dan biasanya baru muncul setelah beberapa minggu, umumnya untuk pencarian nama brand.


## Kecepatan & SEO teknis — 3 November 2026
Kecepatan (diukur dengan Chromium emulasi HP; bobot data per halaman, terkompres):
- Beranda: ±363 KB → ±135 KB (−63%). Halaman lain sudah ringan (±21–24 KB) dan tidak berubah banyak.
- Gambar yang dipakai halaman dikompres dengan nama file tetap (CMS tetap aman): hero 328→100 KB, galeri 309→166, 115→62, 256→133 KB, gambar paket B-Complex 169→134 KB. Original disimpan di luar zip.
- Google Fonts tidak lagi memblokir tampilan (dimuat non-blocking + `<noscript>` cadangan); link font ganda di `blog/index.html` dihapus.
- `assets/js/promo-sync.js`: 3 permintaan data (settings, katalog, API) kini jalan bersamaan, bukan berurutan. Promo dari `site-settings.json` dipakai langsung sehingga harga benar sejak tampilan pertama; API tetap menyegarkan. File JSON lokal memakai revalidasi (`no-cache`) bukan `no-store`.
- Gambar hero beranda: `fetchpriority="high"`; semua gambar lain `decoding="async"`. Template hero di `workers/cms-worker.js` ikut diperbarui.
- `_headers` baru (cache panjang untuk gambar, revalidasi untuk HTML/JSON). Hanya berlaku di Cloudflare Pages/Netlify; GitHub Pages mengabaikannya.
SEO teknis:
- `assets/og-image.jpg` (1200×628) + `og:image`/`twitter:image` di 25 halaman, `twitter:card` = `summary_large_image` (pratinjau tautan di WhatsApp/Google lebih menarik).
- `404.html`: `noindex`.
Catatan:
- Worker WAJIB di-deploy ulang ke Cloudflare.
- Saat upload gambar baru dari Admin, gunakan lebar ≤1280px dan ukuran <200 KB (JPG/WebP). Gambar mentah 1–1,7 MB akan memperlambat halaman lagi.
- Folder `assets/uploads` masih berisi ±17 file lama yang tidak dipakai (±10 MB). Tidak memengaruhi kecepatan pengunjung; hapus lewat Admin/GitHub jika sudah yakin tidak dipakai.
- Ukuran file tidak diukur lewat jaringan nyata; ukur ulang dengan PageSpeed Insights setelah deploy.


## Bagian dokter di halaman About — 3 November 2026
- `about.html`: bagian "Doctor in charge" — dr. Florensa Krismawati, S.Ked; SIP No. 503/3577/DPMPTSP/2026 (berlaku s.d. 21 April 2030); STR MX00000393621454. Ditambah data terstruktur `Physician` (terhubung ke bisnis).
- Sengaja TIDAK dipublikasikan: tanggal lahir, alamat rumah, foto pada dokumen izin, dan data pejabat penerbit.
- Perlu diperbarui saat SIP diperpanjang (21 April 2030) atau jika dokter penanggung jawab berganti.


## Data terstruktur dilengkapi — 3 November 2026
- `BreadcrumbList` ditambah di: About, Packages, Treatment, Symptoms, Doctor Home Visit, Blog (indeks) dan artikel blog.
- `blog/index.html`: skema `Blog` (+ daftar `BlogPosting`).
- `packages.html`: `ItemList` 16 paket (`Service` + `Offer`): harga NORMAL dari `content/packages.json`, dengan keterangan promo SAVE15 s.d. 2026-11-11 di deskripsi penawaran. **Bila harga/paket diubah di Admin, skema ini (statis) harus ikut diperbarui** agar tidak berbeda dengan harga di halaman.
- Artikel: `Article` kini memuat `publisher` dan `reviewedBy` (Physician) bila artikel ditandai "medicalReviewed" dan ada nama reviewer.
- Perbaikan data artikel yang sudah terbit: reviewer yang tampil "Florensakrismawati.gmail.com" → "dr. Florensa Krismawati, S.Ked"; teks alt gambar yang berisi URL → deskripsi gambar. Diterapkan di HTML dan `content/blog/*.json`.
- `workers/cms-worker.js`: artikel & indeks blog baru otomatis memuat skema yang sama (sudah diuji lewat simulasi). **Worker WAJIB di-deploy ulang.**
- Tips Admin: kolom "Reviewer" isi dengan nama dokter yang benar, kolom "Alt gambar" dengan deskripsi singkat (bukan URL).


## Perbaikan cepat: sitemap dan halaman legal — 3 November 2026
Hasil audit. Dua perubahan berdampak langsung, tanpa mengubah desain atau isi halaman lain.

**1. Bug sitemap di Worker (WAJIB deploy ulang `workers/cms-worker.js` ke Cloudflare)**
- Masalah: `sitemap.xml` memakai prefix `ns0:` (`</ns0:urlset>`), sedangkan `updateSitemap` mencari `</urlset>` sehingga artikel baru dari Admin tidak pernah masuk sitemap. Artikel `bali-belly-symptoms-test` pun belum ada di sitemap lama.
- Perbaikan: `updateSitemap` kini membaca prefix dari tag penutup (aman untuk format lama maupun baru), tidak menulis ulang file bila tidak ada perubahan, dan memberi galat jelas jika `sitemap.xml` rusak.
- `sitemap.xml` ditulis ulang dengan format standar (27 URL): artikel blog, Privacy, Terms ditambahkan; `appointment.html` dikeluarkan.
- Diuji dengan Node pada format baru dan format lama (artikel baru masuk, draft tidak masuk, tidak ada commit kosong).
- Setelah publish: kirim ulang sitemap di Google Search Console.

**2. Halaman Privacy Policy dan Terms of Service**
- File baru: `privacy.html`, `terms.html` (header/footer sama dengan halaman lain). Tautan "Privacy" dan "Terms" ditambahkan di footer 27 halaman + template artikel di Worker, dan catatan singkat di bawah tombol form appointment.
- Isi disusun dari cara kerja situs yang sebenarnya: form hanya menyusun pesan WhatsApp di perangkat pengunjung (tidak ada penyimpanan server), tidak ada analytics/cookie iklan saat ini, Google Fonts dan API Cloudflare dimuat browser.
- PERLU DITINJAU sebelum publikasi (bukan nasihat hukum): masa simpan rekam medis, hukum yang berlaku (Indonesia), kebijakan pembatalan/biaya, dan alamat usaha. Jika nanti memasang analytics, perbarui bagian "Cookies, analytics" di Privacy.
- `appointment.html` diubah menjadi `noindex,follow` (halaman form, bukan untuk hasil pencarian).

**3. Tombol WhatsApp melayang — DIBATALKAN**
- Sempat ditambahkan lalu dihapus sepenuhnya atas keputusan pemilik: fokus konversi adalah form appointment, bukan chat WhatsApp kosong. `promo-sync.js` kembali seperti semula.

**Lainnya**
- `llms.txt`: promo SAVE15 kini tertulis berlaku 1–11 Nov 2026; ditambah packages, privacy, terms.
- Belum diuji di browser sungguhan (tidak tersedia di lingkungan ini). Cek di HP dan desktop setelah deploy.

**Masih tersisa dari audit:** bukti sosial/ulasan, profil dokter di homepage, analytics + pelacakan klik WhatsApp, paket visit-only dan harga multi-mata uang, perampingan 15 halaman area (±71% teks identik), perluasan blog.
