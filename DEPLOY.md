# Panduan Lengkap: Hosting Gratis, Supabase Database & Panel Admin
## UKM Mahalaleel School Supplies (Biaya Operasional Rp 0 / Bulan)

Dokumen ini merangkum seluruh infrastruktur produksi yang telah dirancang dan diimplementasikan:
1. **Hosting Gratis**: Cloudflare Pages (Rekomendasi Utama Bisnis) atau Vercel
2. **Database PostgreSQL & Auth**: Supabase Free Tier ($0/bln)
3. **Panel Admin Pengelolaan**: `/admin`
4. **Anti-Pause Database**: GitHub Actions Cron Job

---

## 1. Menghubungkan Supabase Database (100% Gratis)

Website memiliki **arsitektur fallback pintar**:
- Saat ini website dapat berjalan **100% mandiri** membaca `src/data/products.json` & `localStorage`.
- Begitu Supabase dihubungkan, data produk, leads RAB sekolah, dan login admin otomatis terhubung ke cloud database secara real-time!

### Langkah Mudah Menghubungkan Supabase:
1. Buka [supabase.com](https://supabase.com/) dan buat project baru gratis (misal: `mahalaleel-web`).
2. Masuk ke **SQL Editor** di dashboard Supabase, salin seluruh isi file:
   📁 `supabase/schema.sql` lalu klik **Run**.
   *(Skema otomatis membuat tabel `products`, `rab_inquiries`, `site_settings`, dan bucket `product-images`)*.
3. Masuk ke **Project Settings → API**, salin `Project URL`, `anon public key`, dan `service_role key`.
4. Buat file `.env.local` di folder `web/` (lihat referensi di `.env.example`):
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://PROYEK_ANDA.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...
   ```
5. Jalankan script seeding otomatis di terminal:
   ```bash
   node scripts/seed_supabase.mjs
   ```
   *(Seluruh 137 produk `G1`–`G137` akan otomatis terunggah ke database PostgreSQL Supabase dalam hitungan detik!)*

---

## 2. Fitur Panel Admin (`/admin`)

Buka `http://localhost:3000/admin` (atau `https://domain-anda.pages.dev/admin` setelah live):

### 1. Mode Login:
- **Jika Supabase terhubung**: Login menggunakan akun email & password admin yang Anda buat di *Supabase Auth*.
- **Jika mode offline**: Bisa langsung login dengan email apa saja dan password min. 6 karakter.

### 2. Fitur Utama di Dashboard:
- 📋 **Permintaan RAB Masuk (`rab_inquiries`)**:
  Setiap kali pihak sekolah mengklik *"Kirim Permintaan Penawaran via WhatsApp"* di halaman `/rab`, rincian RAB (nama sekolah, pemohon, item yang dipilih, dan total estimasi) otomatis terekam di sini. Admin dapat mengubah status (`baru` → `diproses` → `deal` → `selesai`) dan langsung membalas via WA.
- 📦 **Kelola 137 Produk**:
  Cari produk berdasarkan kode (`G1`–`G137`) atau nama, ubah harga, ganti spesifikasi, atau aktifkan/nonaktifkan produk.
- 📱 **Pengaturan Kontak WhatsApp**:
  Ubah nomor WhatsApp Dina P atau Elmar S kapan saja tanpa perlu menyentuh kode program.

---

## 3. Mencegah Auto-Pause Supabase (Anti-Sleep)

Paket gratis Supabase otomatis masuk mode *pause* jika tidak ada kueri selama 7 hari. Repositori ini sudah dilengkapi script otomatisasi:
📁 `.github/workflows/keep-supabase-alive.yml`

Setiap 3 hari sekali pada pukul 00:00 UTC, GitHub Actions akan mengirimkan ping ringan ke database Supabase Anda sehingga database **selalu aktif 24/7**.
Cukup tambahkan `SUPABASE_URL` dan `SUPABASE_ANON_KEY` di **GitHub Repository Settings → Secrets and variables → Actions**.

---

## 4. Opsi Deployment Produksi (Pilih Salah Satu)

### Opsi A: Cloudflare Pages (Sangat Direkomendasikan untuk UKM)
- **Kelebihan**: Bandwidth tak terbatas, 500 build gratis per bulan, CDN tercepat di Indonesia.
- **Cara Deploy**:
  ```bash
  npx wrangler pages deploy .next --project-name=mahalaleel-web
  ```
  Atau hubungkan repository GitHub langsung di dashboard Cloudflare Pages.

### Opsi B: Vercel (Paling Mudah 1-Klik)
- **Cara Deploy**:
  ```bash
  npx vercel --prod
  ```
  Atau import repository GitHub di [vercel.com](https://vercel.com).
