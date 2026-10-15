# KantinKampus UIN Jakarta - Sistem Pesan-Antar Kuliner Kampus Tanpa Antre

Solusi pesan-antar makanan dan minuman kantin kampus terintegrasi khusus civitas akademika **UIN Syarif Hidayatullah Jakarta**, menghubungkan mahasiswa yang memiliki jeda waktu kuliah terbatas dengan stan kantin kampus ("Ali baput") dan kurir mahasiswa dengan alur pesan, bayar cepat (QRIS Resmi "Ali baput" & Transfer Bank BSI), serta antar langsung ke ruang kuliah atau fakultas di lingkungan UIN Jakarta.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> **Keputusan Terkonfirmasi dari Hasil Klarifikasi & Revisi:**
> - **Identitas & Branding Kampus UIN Jakarta:**
>   - Menampilkan **Logo Resmi UIN Syarif Hidayatullah Jakarta** (Kubah emas & biru akademis ciri khas UIN Jakarta) pada bagian Top Bar / Header, Favicon, dan Struk Pesanan.
>   - Penyesuaian titik pengantaran gedung fakultas kampus UIN Jakarta:
>     * Fakultas Sains dan Teknologi (FST)
>     * Fakultas Tarbiyah dan Keguruan (FITK)
>     * Fakultas Ekonomi dan Bisnis (FEB)
>     * Fakultas Syariah dan Hukum (FSH)
>     * Fakultas Dakwah dan Ilmu Komunikasi (FIDIKOM)
>     * Fakultas Psikologi (FPSI)
>     * Fakultas Kedokteran & Farmasi (FKIK)
>     * Gedung Rektorat & Pusat Pelayanan Terpadu
>     * Perpustakaan Utama UIN Jakarta
>     * Student Center (SC) & Kantin Tarbiyah (Pusat Dapur Stan Ali baput)
> - **Daftar Menu Resmi Lengkap ("Ali baput"):**
>   - **Kategori Makanan:**
>     1. *Ayam Geprek* — **Rp 15.000** (pilihan level pedas 1-5, sambal bawang gurih)
>     2. *Ayam Penyet Cabe Ijo* — **Rp 17.000** (pedas segar cabe rawit hijau khas)
>     3. *Ayam Goreng Bawang Putih* — **Rp 15.000** (menu signature dengan aroma bawang putih renyah)
>     4. *Ayam Ketumbar* — **Rp 17.000** (bumbu rempah ketumbar meresap gurih renyah)
>   - **Kategori Minuman:**
>     1. *Teh Manis / Tawar (Hot / Ice)* — **Rp 5.000** (opsi: Manis/Tawar, Dingin/Hangat)
>     2. *Air Mineral (Normal / Ice)* — **Rp 5.000** (opsi: Suhu Normal atau Dingin Segar)
>     3. *Nutrisari* — **Rp 5.000** (aneka rasa jeruk segar, dingin dengan es batu)
>     4. *Teajus* — **Rp 4.000** (teh seduh rasa buah ekonomis dingin)
> - **Metode Pembayaran Digital Lengkap:**
>   - **1. QRIS Resmi Merchant "Ali baput":**
>     * Kode QRIS resmi ASPI/GPN dengan NMID: `ID1026601593399` (Terminal A01).
>     * Dapat di-scan oleh seluruh mobile banking (BSI, BCA, Mandiri, BRI, BNI) dan dompet digital (GoPay, OVO, ShopeePay, DANA).
>   - **2. Transfer Bank Langsung (Bank Syariah Indonesia / BSI):**
>     * **Bank:** Bank Syariah Indonesia (BSI)
>     * **Nomor Rekening:** `7307464351`
>     * **Atas Nama:** `Muhammad Ali Ikrami`
>     * Dilengkapi tombol salin nomor rekening satu klik dan instruksi konfirmasi transfer.
>   - **3. Tombol Simulasi Pembayaran Berhasil:** Untuk pengujian alur pesanan instan < 2 menit.
> - **Layanan Bantuan & Hotline WhatsApp:**
>   - **Nomor Kontak:** `081385433514`
>   - **Template Pesan Otomatis:** `hai al's,perihal order&pickup(yang kamu ingin keluhkan/sarankan),mohon responnya.`
> - **Nuansa Visual:** Desain minimalis bernuansa biru kampus berwibawa (*academic navy* `#0f2942`) berpadu dengan aksen kuning emas kubah UIN Jakarta (*campus gold* `#f59e0b`).
> - **Sistem Multi-Peran:** Switcher instan antara Mahasiswa UIN Jakarta (Pemesan), Stan Kantin Ali baput, dan Kurir Antar Kampus.

---

### 1. Overview & Core Concept

- **Apa yang Dibangun:** Web app modern kampus yang dirancang khusus untuk memfasilitasi pesanan makanan dan minuman dari stan kuliner kampus UIN Jakarta ("Ali baput") langsung diantar ke ruang kuliah fakultas kampus 1 & kampus 2 tanpa antre.
- **Target Pengguna:** Mahasiswa, dosen, dan staf UIN Jakarta yang menginginkan kemudahan memesan makanan halal berkualitas dengan harga ramah kantong mahasiswa.
- **Proposisi Nilai:** Bebas antre, harga transparan Rp 4.000 - Rp 17.000, pembayaran non-tunai (QRIS & BSI), dan navigasi pengantaran presisi per gedung fakultas UIN Jakarta.

---

### 2. User Experience & Visual Design

#### A. Alur Utama Pengguna (User Flows)
1. **Beranda & Identitas UIN Jakarta:**
   - Top navigation dengan **Logo Resmi UIN Jakarta**, status kantin buka, tombol bantuan WhatsApp `081385433514`, dan keranjang belanja.
   - Banner sambutan khas mahasiswa UIN Jakarta dengan estimasi waktu masak 10–15 menit.
2. **Katalog Menu Stan "Ali baput":**
   - Filter cepat: *Semua Menu*, *Makanan Olahan Ayam*, *Minuman Dingin/Hangat*.
   - Kartu menu dengan detail harga tabular (`Rp 15.000`, `Rp 17.000`, `Rp 5.000`, `Rp 4.000`), kustomisasi level pedas & jenis minuman.
3. **Pemilihan Lokasi Drop-off Kampus UIN Jakarta:**
   - Dropdown terstruktur: Pilih Fakultas/Gedung UIN Jakarta (FST, FEB, FITK, FSH, FIDIKOM, FPSI, FKIK, Rektorat, Perpustakaan Pusat) $\to$ Lantai (1–4) $\to$ Nomor Ruang Kuliah/Lab.
   - Peta visual kampus UIN Jakarta yang menampilkan rute kurir dari Pusat Kantin Student Center ke fakultas tujuan.
4. **Checkout & Pembayaran (QRIS Ali baput / BSI Transfer):**
   - Tampilan voucher QRIS asli merchant "Ali baput" (NMID ID1026601593399).
   - Opsi Transfer BSI ke Rekening `7307464351` a.n Muhammad Ali Ikrami.
5. **Pelacakan Status Pesanan & Kontak Cepat:**
   - Pelacakan 5 tahap: *Diterima $\to$ Dimasak $\to$ Diambil Kurir $\to$ Menuju Gedung Fakultas $\to$ Sampai di Ruangan*.
   - Tombol WhatsApp bantuan langsung ke `081385433514` dengan template otomatis perihal keluhan/saran order & pickup.
6. **Mode Switcher (Mahasiswa, Pemilik Stan, Kurir):**
   - Mode Stan: Manajemen pesanan masuk stan Ali baput dan ketersediaan menu.
   - Mode Kurir: Penerimaan tugas antar ke gedung kampus UIN Jakarta.

#### B. Identitas Visual & Bahasa Desain
- **Palet Warna (60-30-10):**
  - **60% Latar & Kanvas:** Putih bersih (`#FFFFFF`) dan Slate akademis lembut (`#F8FAFC`).
  - **30% Struktur & Teks:** Biru navy UIN Jakarta (`#0F2942` / `#1E3A8A`).
  - **10% Aksen:** Kuning emas kubah UIN Jakarta (`#F59E0B` / `#D97706`).
- **Logo:** Logo UIN Syarif Hidayatullah Jakarta SVG/High-Res vector clean lockup.
- **Tipografi:** Plus Jakarta Sans & Outfit, format angka tabular `tabular-nums`.

---

### 3. Key Product Decisions & Trade-Offs

- **Integrasi Logo & Landmark UIN Jakarta:**
  - *Keputusan:* Menempatkan logo resmi UIN Jakarta yang presisi dan daftar gedung fakultas nyata UIN Syarif Hidayatullah Jakarta (Ciputat).
  - *Alasan:* Menciptakan kedekatan emosional dan relevansi nyata bagi mahasiswa UIN Jakarta saat memilih ruang kelas perkuliahan mereka.
- **Satu Ekosistem Lengkap (QRIS + BSI + Kontak Ali):**
  - *Keputusan:* Mengintegrasikan semua aset pembayaran dan kontak yang diberikan secara harmonis dalam alur pemesanan tanpa friksi.

---

### 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                   KantinKampus UIN Jakarta                             │
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │ Top Bar: [Logo UIN Jakarta] | WA Hotline | Role Switcher | Cart │   │
│   └────────────────────────────────────────────────────────────────┘   │
│                                   │                                    │
│       ┌───────────────────────────┼───────────────────────────┐        │
│       ▼                           ▼                           ▼        │
│ ┌───────────────┐        ┌─────────────────┐        ┌───────────────┐  │
│ │ Mahasiswa View│        │ Stan Ali baput  │        │  Kurir View   │  │
│ │ - Menu Ayam & │        │ - Pesanan Masuk │        │ - Antar ke    │  │
│ │   Minuman     │        │ - Masak / Ready │        │   Fakultas UIN│  │
│ │ - Drop Gedung │        │ - Kelola Menu   │        │ - Peta Kampus │  │
│ │   Fakultas UIN│        └─────────────────┘        │ - Konfirmasi  │  │
│ │ - Bayar QRIS  │                 │                 └───────────────┘  │
│ │   / BSI Transf│                 │                         │          │
│ │ - Lacak Order │                 │                         │          │
│ └───────┬───────┘                 │                         │          │
│         │                         ▼                         │          │
│         └───────────────► ┌───────────────┐ ◄───────────────┘          │
│                           │ App State     │                            │
│                           │ (Orders, Cart,│                            │
│                           │ Menus, Roles) │                            │
│                           └───────────────┘                            │
└────────────────────────────────────────────────────────────────────────┘
```

#### Entitas Data Kampus UIN Jakarta:
- `buildings`:
  - `FST`: Fakultas Sains & Teknologi (Lt 1-4, Lab Komputer, Lab Fisika, R. 201-405)
  - `FITK`: Fakultas Ilmu Tarbiyah dan Keguruan
  - `FEB`: Fakultas Ekonomi dan Bisnis
  - `FSH`: Fakultas Syariah dan Hukum
  - `FIDIKOM`: Fakultas Dakwah dan Ilmu Komunikasi
  - `FPSI`: Fakultas Psikologi
  - `FKIK`: Fakultas Kedokteran dan Ilmu Kesehatan
  - `REKTORAT`: Gedung Rektorat & PPT
  - `PERPUS`: Perpustakaan Utama UIN Jakarta
  - `SC`: Student Center & Kantin Tarbiyah

---

### Verifikasi & Langkah Eksekusi Berikutnya

1. **Aset Visual & Logo:** Memasang logo resmi UIN Syarif Hidayatullah Jakarta dan foto menu kuliner berkualitas tinggi.
2. **Implementasi Komponen:**
   - Header terpadu dengan Logo UIN Jakarta, tombol bantuan WhatsApp 081385433514, dan switcher peran.
   - Modul Checkout dengan tab ganda QRIS Ali baput (NMID ID1026601593399) dan Transfer Bank BSI (7307464351 a.n Muhammad Ali Ikrami).
   - Katalog menu lengkap (4 olahan ayam + 4 minuman) dengan opsi varian level pedas/suhu.
   - Pemilih titik gedung fakultas UIN Jakarta dan peta visual rute kurir.
   - Dashboard Stan Ali baput & Dashboard Kurir Kampus UIN Jakarta.
3. **Penyempurnaan & Build Check:** Menjalankan `compile_applet` untuk memastikan kompilasi 100% lancar dan tanpa error.
