# BALI BELLY RECOVERY — CMS ADMIN (Tanpa OpenAI API)

Paket ini mempertahankan website sumber `bali-belly-recovery-github.zip` (31 file asli) dan menambahkan dashboard Admin serta backend Cloudflare Worker. Homepage `index.html` dan seluruh halaman SEO lokasi dipertahankan tanpa perubahan.

## Fitur yang tersedia dalam paket

- Dashboard ringkasan artikel.
- Blog: tambah artikel, edit artikel, simpan Draft, terbitkan, preview, SEO title, meta description, slug, keyword, kategori, bahasa, excerpt, author, reviewer, featured image dan ALT text.
- Media Library: upload JPG, PNG, WebP, GIF maksimum 4 MB ke `assets/uploads/`.
- Promo Manager: simpan status, nama promo, diskon, kode, tanggal mulai/akhir dan catatan ke `content/site-settings.json`.
- Package Manager: simpan nama paket, harga dan deskripsi ke file pengaturan.
- Cloudflare Worker API + GitHub App untuk menyimpan konten ke repository.
- Tidak ada AI Article Assistant, OpenAI API key, atau biaya API OpenAI.

## Status kesiapan — mohon dibaca

ZIP berisi kode dashboard dan backend, tetapi CMS **belum dapat login atau menulis ke GitHub sampai akun GitHub dan Cloudflare Anda dikonfigurasi**. Saya tidak memiliki akses ke akun tersebut, jadi belum dapat membuat GitHub App, mengisi secret, atau menguji deployment langsung.

Promo dan paket disimpan ke `content/site-settings.json`, tetapi homepage dan halaman paket publik **belum terhubung untuk membaca pengaturan itu secara otomatis**. Jadi perubahan melalui Promo/Paket Manager belum otomatis mengubah tampilan website. Integrasi tampilan publik perlu tahap lanjutan. Penjadwalan artikel dan tombol hapus belum tersedia.

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
wrangler secret put CF_ACCESS_AUD
wrangler deploy
```

Saat diminta `GH_APP_PRIVATE_KEY`, tempel seluruh isi file PEM. Untuk `CF_ACCESS_AUD`, gunakan Audience Tag aplikasi Cloudflare Access yang melindungi Worker. Catat URL Worker yang diberikan setelah deploy.

Tidak ada secret OpenAI dan tidak ada `OPENAI_MODEL`.

### 4. Lindungi Admin dan API

Buat aplikasi Self-hosted Cloudflare Access untuk:

- `balibellyrecovery.com/admin/*`
- hostname Worker API.

Buat policy Allow hanya untuk email administrator. Catat Audience Tag yang sesuai dan masukkan sebagai secret `CF_ACCESS_AUD`. Pastikan Worker menerima header `Cf-Access-Jwt-Assertion` dari Cloudflare Access. Jangan gunakan dashboard sebelum perlindungan Access aktif.

### 5. Hubungkan dashboard

1. Deploy file website ke branch staging sesuai alur repository.
2. Buka `https://balibellyrecovery.com/admin/` (atau URL staging yang Anda gunakan) dan login melalui Cloudflare Access.
3. Di menu Pengaturan, masukkan URL Worker, misalnya `https://nama-worker.nama-team.workers.dev`.
4. Klik Simpan Koneksi lalu Tes Koneksi.
5. Jika berhasil, dashboard dapat memuat artikel/pengaturan repository.

### 6. Uji dan pindah ke produksi

- Simpan satu artikel Draft dan periksa commit pada `cms-staging`.
- Upload gambar uji dan periksa `assets/uploads/`.
- Terbitkan artikel uji setelah memastikan isi dan persetujuan reviewer.
- Periksa `blog/<slug>.html`, `blog/index.html`, `content/blog/index.json`, `sitemap.xml` dan GitHub Pages deployment.
- GitHub Pages hanya menampilkan branch/source yang dipilih di Settings → Pages. Untuk staging, gunakan preview branch/deployment terpisah atau ubah sementara source Pages. Setelah lolos, ubah `GH_BRANCH` ke `main`, deploy ulang Worker, lalu merge staging melalui Pull Request.

## Batasan dan catatan

1. Website utama dan halaman SEO lokasi dipertahankan, tidak diganti.
2. Promo/Paket Manager menyimpan JSON, belum mengubah tampilan homepage/packages secara otomatis.
3. Editor homepage dan pengaturan kontak belum tersedia.
4. Draft dan Published tersedia; penjadwalan otomatis belum tersedia.
5. Tombol hapus artikel/media belum tersedia.
6. Pemeriksaan reviewer adalah kontrol alur kerja, bukan validasi klinis. Konten medis tetap harus diperiksa profesional.
7. Perubahan publik membutuhkan GitHub Pages deployment yang sukses.
8. Jangan menanam GitHub token/private key di JavaScript browser. Gunakan GitHub App dan Cloudflare Access.

## Troubleshooting

- **401 / Access token missing**: Worker belum dilindungi Access atau header JWT tidak diteruskan.
- **Audience tidak cocok**: `CF_ACCESS_AUD` tidak sama dengan Audience Tag aplikasi Access yang melindungi Worker.
- **GitHub API 401/403**: periksa App ID, Installation ID, private key, permission Contents Read/Write dan instalasi App.
- **GitHub API 404**: periksa owner, repository, branch dan path.
- **Dashboard gagal memuat**: periksa URL Worker, CORS, login Access dan log Worker.
- **Artikel tersimpan tetapi belum live**: pastikan GitHub Pages menerbitkan branch yang ditulis Worker dan deployment berhasil.
