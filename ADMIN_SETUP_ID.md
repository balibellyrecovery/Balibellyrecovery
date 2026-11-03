# BALI BELLY RECOVERY — CMS ADMIN (Tanpa OpenAI API)

Paket ini mempertahankan website sumber `bali-belly-recovery-github.zip` (31 file asli) dan menambahkan dashboard Admin serta backend Cloudflare Worker. Homepage `index.html` dan seluruh halaman SEO lokasi dipertahankan tanpa perubahan.

## Fitur yang tersedia dalam paket

- Dashboard ringkasan artikel.
- Blog: tambah artikel, edit artikel, simpan Draft, terbitkan, preview, SEO title, meta description, slug, keyword, kategori, bahasa, excerpt, author, reviewer, featured image dan ALT text.
- Media Library: upload JPG, PNG, WebP, GIF maksimum 4 MB ke `assets/uploads/`.
- Homepage Image Manager: unggah dan atur foto Hero, Essential Package, Tablet Medication Package, dan Complete Package langsung dari Admin. ALT text dapat diatur untuk setiap gambar. Saat disimpan, Worker memperbarui `index.html` dan `content/site-settings.json` di GitHub.
- Promo Manager: simpan status, nama promo, diskon, kode, tanggal mulai/akhir dan catatan ke `content/site-settings.json`.
- Package Manager (CRUD): tambah, lihat, edit, dan hapus paket; kelola nama, kategori, harga normal, deskripsi, komposisi, vitamin boosters, additional components, service includes, foto/ALT text, status aktif, dan urutan. Katalog pusat disimpan di `content/packages.json`.
- Cloudflare Worker API + GitHub App untuk menyimpan konten ke repository.
- Tidak ada AI Article Assistant, OpenAI API key, atau biaya API OpenAI.

## Status kesiapan — mohon dibaca

ZIP berisi kode dashboard dan backend, tetapi CMS **belum dapat login atau menulis ke GitHub sampai akun GitHub dan Cloudflare Anda dikonfigurasi**. Saya tidak memiliki akses ke akun tersebut, jadi belum dapat membuat GitHub App, mengisi secret, atau menguji deployment langsung.

Pengaturan gambar homepage terhubung melalui endpoint `/api/homepage/images/save`. Setelah upload gambar di tab Media / Gambar, klik **Simpan Gambar Homepage**. Worker akan memperbarui homepage di GitHub; tampilan publik berubah setelah GitHub Pages selesai deploy. Pengaturan promo disimpan di `content/site-settings.json` dan disinkronkan ke harga/banner serta formulir booking melalui script publik. Katalog paket pusat disimpan di `content/packages.json` dan dibaca oleh seluruh halaman yang memuat paket.

Artikel yang diterbitkan menghasilkan `blog/<slug>.html`, memperbarui `blog/index.html`, `content/blog/index.json`, dan menambahkan URL ke `sitemap.xml`. Tambahkan tautan Blog ke navigasi publik bila diperlukan.

## Instalasi ringkas

### 1. Buat branch staging

1. Buka repository GitHub website.
2. Buat branch `cms-staging` dari `main`.
3. Ekstrak ZIP ini di komputer.
4. Upload **isi folder ZIP** ke root repository pada branch `cms-staging` (jangan upload folder induk sebagai satu folder bertingkat).
5. Pastikan homepage `index.html`, CNAME, semua halaman lokasi dan file website lama tetap ada.
6. Jangan timpa branch utama sebelum staging lolos tes.

### 2. Buat GitHub App

GitHub → Settings → Developer settings → GitHub Apps → New GitHub App.

- Repository permissions: Contents **Read and write**, Metadata **Read-only**.
- Install hanya pada repository Bali Belly Recovery.
- Catat App ID dan Installation ID.
- Generate private key dan simpan file PEM dengan aman.

Jangan pernah mengirim private key ke chat atau memasukkannya ke HTML/JavaScript browser.

### 3. Konfigurasi Cloudflare Worker

Edit `workers/wrangler.toml`:

- `GH_OWNER`: username/organisasi GitHub.
- `GH_REPO`: nama repository.
- `GH_BRANCH`: `cms-staging` untuk pengujian.
- `GH_APP_ID`: App ID.
- `GH_INSTALLATION_ID`: Installation ID.
- `CF_ACCESS_TEAM_DOMAIN`: domain team Cloudflare, misalnya `nama-team.cloudflareaccess.com`.

Instal Node.js. Jalankan terminal dari folder `workers`:

```bash
npm install -g wrangler
wrangler login
wrangler secret put GH_APP_PRIVATE_KEY
wrangler secret put ADMIN_EMAIL
wrangler secret put ADMIN_PASSWORD
wrangler secret put SESSION_SECRET
wrangler deploy
```

Saat diminta `GH_APP_PRIVATE_KEY`, tempel seluruh isi file PEM. Isi `ADMIN_EMAIL` dengan email login admin, `ADMIN_PASSWORD` dengan password yang kuat, dan `SESSION_SECRET` dengan string acak rahasia minimal 32 karakter. Jangan kirim atau simpan nilai-nilai rahasia ini di HTML/JavaScript. Catat URL Worker yang diberikan setelah deploy.

Tidak ada secret OpenAI dan tidak ada `OPENAI_MODEL`.

### 4. Keamanan Admin dan API

Worker memiliki login admin sendiri. Endpoint login memeriksa `ADMIN_EMAIL` dan `ADMIN_PASSWORD`, lalu membuat cookie sesi bertanda tangan menggunakan `SESSION_SECRET`. Endpoint pengelolaan konten memerlukan cookie sesi tersebut dan permintaan dari origin website.

Anda dapat menambahkan Cloudflare Access sebagai lapisan perlindungan tambahan pada `balibellyrecovery.com/admin/*`. Jangan memasang proteksi Access pada hostname API tanpa menguji alur `fetch` lintas-origin terlebih dahulu, karena browser admin harus dapat memanggil API dan mengirim cookie sesi. Worker pada paket ini tidak memvalidasi header JWT Cloudflare Access secara langsung.

### 5. Hubungkan dashboard

1. Deploy file website ke branch staging sesuai alur repository.
2. Buka `https://balibellyrecovery.com/admin/` (atau URL staging yang Anda gunakan) dan login melalui Cloudflare Access.
3. Di menu Pengaturan, masukkan URL Worker, misalnya `https://nama-worker.nama-team.workers.dev`.
4. Klik Simpan Koneksi lalu Tes Koneksi.
5. Jika berhasil, dashboard dapat memuat artikel/pengaturan repository.

### 6. Uji dan pindah ke produksi

1. Buka Admin → Manajemen Paket, edit satu paket uji, lalu simpan.
2. Periksa commit `content/packages.json` pada branch `cms-staging`.
3. Pastikan nama, harga, deskripsi, komposisi dan service includes berubah pada homepage, halaman Packages, halaman lokasi, dan formulir Appointment setelah GitHub Pages selesai deployment.
4. Tambah satu paket uji, pastikan paket baru muncul pada halaman paket dan pilihan booking, lalu hapus kembali paket uji tersebut.
5. Uji promo aktif dan nonaktif untuk memastikan harga promo dihitung dari harga normal yang baru.
6. Uji upload gambar dan artikel, lalu periksa file terkait di repository.
7. Setelah staging lolos, ubah `GH_BRANCH` ke `main`, deploy ulang Worker, lalu merge staging melalui Pull Request sesuai alur repository.

## Batasan dan catatan

1. Website utama dan halaman SEO lokasi dipertahankan, tidak diganti.
2. Paket yang diedit melalui Manajemen Paket disinkronkan ke semua halaman yang menampilkan kartu paket dan pilihan paket pada formulir booking setelah Worker dan GitHub Pages selesai deploy.
3. Editor homepage umum dan pengaturan kontak belum tersedia.
4. Draft dan Published tersedia; penjadwalan otomatis belum tersedia.
5. Tombol hapus artikel/media belum tersedia. Paket dapat dihapus dari katalog aktif melalui Manajemen Paket.
6. Pemeriksaan reviewer adalah kontrol alur kerja, bukan validasi klinis. Konten medis tetap harus diperiksa profesional.
7. Perubahan publik membutuhkan GitHub Pages deployment yang sukses.
8. Jangan menanam GitHub token/private key di JavaScript browser. Gunakan GitHub App dan Cloudflare Access.

## Troubleshooting

- **401 / Access token missing**: Worker belum dilindungi Access atau header JWT tidak diteruskan.
- **GitHub API 401/403**: periksa App ID, Installation ID, private key, permission Contents Read/Write dan instalasi App.
- **GitHub API 404**: periksa owner, repository, branch dan path.
- **Dashboard gagal memuat**: periksa URL Worker, CORS, login Access dan log Worker.
- **Artikel tersimpan tetapi belum live**: pastikan GitHub Pages menerbitkan branch yang ditulis Worker dan deployment berhasil.
