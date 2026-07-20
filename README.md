# OXYRA — Happy Hydration Era

Monorepo resmi untuk **OXYRA**, brand air minum premium (Mineral, Hexagonal
Oxygen, Alkaline, dan Terahertz) yang melayani pengantaran harian di Batam,
Indonesia. Repositori ini berisi **frontend** (React + Vite) dan **backend**
(Node.js + Express) dalam satu monorepo berbasis npm workspaces.

Proyek ini adalah hasil konversi dari prototipe statis `index_v0_11.html`
menjadi aplikasi full-stack yang modular, teruji, dan siap dikembangkan lebih
lanjut — dengan seluruh konten (produk, harga, testimoni, komunitas, laporan
uji lab) dipertahankan persis sesuai versi aslinya.

---

## 🧱 Struktur Monorepo

```
oxyra/
├── backend/                 # REST API (Express)
│   ├── src/
│   │   ├── config/          # Konfigurasi terpusat (env, brand, CORS, rate limit)
│   │   ├── controllers/     # Logika request/response tiap domain
│   │   ├── data/            # "Database" JSON in-memory + repositori order/contact
│   │   ├── middleware/      # errorHandler, notFound, rateLimiter
│   │   ├── routes/          # Definisi endpoint REST
│   │   ├── utils/           # ApiError, asyncHandler, validators, whatsapp helper, logger
│   │   ├── app.js           # Perakitan Express app
│   │   └── server.js        # Entry point + graceful shutdown
│   └── tests/               # Jest + Supertest
│
├── frontend/                 # Storefront (React + Vite)
│   └── src/
│       ├── api/              # Klien fetch ke backend + data cadangan lokal
│       ├── hooks/            # useReveal, useScrollPhysics, useDropfieldCanvas
│       ├── components/
│       │   ├── common/       # Navbar, Instruments, SnapDots, Footer, Icon
│       │   └── sections/     # Hot, Dry, Turn, Relief, Manifesto, WhyOxyra,
│       │                      # Products, Club, Testimonials, LabReport,
│       │                      # Delivery, Closing
│       ├── styles/           # global.css (design tokens & animasi asli)
│       └── assets/           # Aset gambar (logo kristal OXYRA, base64)
│
├── .github/workflows/ci.yml  # CI: lint, test backend, build frontend
├── package.json               # Root workspace (backend + frontend)
└── LICENSE
```

---

## 🚀 Menjalankan Secara Lokal

### Prasyarat
- Node.js ≥ 18
- npm ≥ 9

### 1. Clone & install semua dependency sekaligus
```bash
git clone <url-repo-anda>.git oxyra
cd oxyra
npm install
```

### 2. Siapkan file environment
```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

### 3. Jalankan backend & frontend bersamaan
```bash
npm run dev
```
- Backend API berjalan di `http://localhost:4000`
- Frontend (Vite dev server) berjalan di `http://localhost:5173`

Atau jalankan satu per satu:
```bash
npm run dev:backend
npm run dev:frontend
```

### 4. Build untuk produksi
```bash
npm run build            # build frontend ke frontend/dist
npm start                 # jalankan backend (production mode)
```

---

## 🧪 Testing

```bash
npm test                  # menjalankan seluruh test backend (Jest + Supertest)
```

Test mencakup: health check, brand metadata, daftar & filter produk, alur
pemesanan (create/list order beserta validasinya), testimoni, why-oxyra, club,
laporan lab, dan formulir kontak/kemitraan.

---

## 🔌 Ringkasan Endpoint Backend

| Method | Endpoint                  | Deskripsi                                             |
|--------|----------------------------|--------------------------------------------------------|
| GET    | `/api/health`               | Status kesehatan server                                |
| GET    | `/api/brand`                 | Metadata brand (nama, WhatsApp, Instagram, logo)        |
| GET    | `/api/products`              | Daftar produk (`?category=`, `?q=` untuk filter/cari)   |
| GET    | `/api/products/categories`   | Daftar kategori/tab filter produk                       |
| GET    | `/api/products/:id`          | Detail satu produk                                     |
| GET    | `/api/why`                   | Kartu "Kenapa Oxyra"                                    |
| GET    | `/api/club`                  | Konten Happy Hydration Club                             |
| GET    | `/api/testimonials`          | Daftar testimoni pelanggan                               |
| GET    | `/api/lab-report`            | Data laporan uji lab (ilustratif)                        |
| POST   | `/api/orders`                | Membuat pesanan baru → link WhatsApp konfirmasi          |
| GET    | `/api/orders`                | Daftar seluruh pesanan                                  |
| GET    | `/api/orders/:id`            | Detail satu pesanan                                     |
| POST   | `/api/contact`               | Kirim pesan kemitraan/grosir/umum → link WhatsApp        |
| GET    | `/api/contact`               | Daftar pesan kontak yang masuk                          |

Setiap response mengikuti format konsisten:
```json
{ "success": true, "data": { } }
```
atau untuk error:
```json
{ "success": false, "error": { "message": "...", "code": 400 } }
```

---

## 🖥️ Ringkasan Frontend

- **Tanpa backend pun tetap tampil benar** — setiap section melakukan fetch
  ke API, tetapi otomatis memakai data cadangan lokal (`src/api/fallbackData.js`)
  yang identik dengan data backend jika request gagal (mis. backend belum
  dijalankan).
- Seluruh animasi asli dipertahankan: reveal-on-scroll (`useReveal`), transisi
  suhu/warna latar saat scroll (`useScrollPhysics`), dan medan tetesan air yang
  mengkristal menjadi logo heksagonal OXYRA di section "Relief"
  (`useDropfieldCanvas`).
- Tombol pemesanan tiap produk menghasilkan tautan `wa.me` yang sudah terisi
  pesan otomatis, persis seperti perilaku prototipe asli.

---

## 📦 Deploy

- **Backend**: dapat di-deploy ke Render, Railway, Fly.io, atau VPS mana pun
  yang mendukung Node.js — cukup set environment variable dari
  `backend/.env.example` dan jalankan `npm start`.
- **Frontend**: `npm run build` menghasilkan folder statis `frontend/dist`
  yang bisa di-deploy ke Vercel, Netlify, Cloudflare Pages, atau static
  hosting apa pun. Jangan lupa set `VITE_API_URL` ke URL backend produksi.

---

## 📄 Lisensi

Didistribusikan di bawah lisensi MIT — lihat berkas [LICENSE](./LICENSE).

---

**OXYRA · Batam, Indonesia** — *Welcome to the Happy Hydration Era.*
