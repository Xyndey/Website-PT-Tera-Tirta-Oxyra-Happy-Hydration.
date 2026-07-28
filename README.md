# OXYRA — Happy Hydration Era

Monorepo resmi untuk **OXYRA**, brand air minum premium (Mineral, Hexagonal
Oxygen, Alkaline, dan Terahertz) yang melayani pengantaran harian di Batam,
Indonesia.

**Stack:** frontend **Angular 18** (standalone components + signals) dan
backend **Node.js/Express** (in-memory, tanpa database eksternal).

---

## 🧱 Struktur Monorepo

```
oxyra/
├── backend/                        # REST API (Express, in-memory)
│   ├── src/
│   │   ├── config/                 # Konfigurasi terpusat (env, brand, CORS, rate limit)
│   │   ├── controllers/            # Logika request/response tiap domain
│   │   ├── data/                   # "Database" JSON in-memory (produk, testimoni, dll)
│   │   ├── middleware/              # errorHandler, notFound, rateLimiter
│   │   ├── routes/                  # Definisi endpoint REST
│   │   ├── utils/                   # ApiError, asyncHandler, whatsapp helper, logger
│   │   ├── app.js                   # Perakitan Express app
│   │   └── server.js                # Entry point + graceful shutdown
│   └── tests/                       # Jest + Supertest
│
├── frontend/                        # Storefront (Angular 18, standalone components)
│   ├── public/images/                # Foto asli produk & toko
│   └── src/app/
│       ├── core/                     # Services: ApiService, CartService, ThemeService,
│       │                              # I18nService, ToastService, ScrollPhysicsService
│       ├── shared/                   # Navbar, Instruments, SnapDots, Footer,
│       │                              # CartDrawer, CheckoutModal, ToastStack, Icon,
│       │                              # SkeletonCard, RevealDirective
│       └── sections/                 # Hot, Dry, Turn, Relief, Manifesto, WhyOxyra,
│                                       # Products, Club, StoreVisit, Testimonials,
│                                       # LabReport, Delivery, Closing
│
├── .github/workflows/ci.yml          # CI: test backend, build frontend
├── package.json                       # Root workspace (backend + frontend)
└── LICENSE
```

---

## 🚀 Menjalankan Secara Lokal

### Prasyarat
- Node.js ≥ 18.19
- npm ≥ 9

### 1. Clone & install semua dependency sekaligus
```bash
git clone <url-repo-anda>.git oxyra
cd oxyra
npm install
```

### 2. Siapkan file environment backend
```bash
cp backend/.env.example backend/.env
```
Frontend Angular mengatur URL API lewat `frontend/src/environments/environment.ts`
(development) dan `environment.production.ts` (production) — bukan file `.env`.

### 3. Jalankan backend & frontend bersamaan
```bash
npm run dev
```
- Backend API berjalan di `http://localhost:4000`
- Frontend (Angular dev server) berjalan di `http://localhost:4200`

Atau jalankan satu per satu:
```bash
npm run dev:backend
npm run dev:frontend
```

### 4. Build untuk produksi
```bash
npm run build            # build frontend Angular ke frontend/dist/oxyra-frontend/browser
npm start                 # jalankan backend (production mode)
```

---

## 🧪 Testing

```bash
npm test                  # test backend (Jest + Supertest)
cd frontend && npm test    # test frontend (Karma + Jasmine, bawaan Angular CLI)
```

---

## 🔌 Ringkasan Endpoint Backend

| Method | Endpoint                  | Deskripsi                                             |
|--------|----------------------------|----------------------------------------------------------|
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

Format response konsisten: `{ "success": true, "data": { } }` atau
`{ "success": false, "error": { "message": "...", "code": 400 } }`.

---

## 🖥️ Ringkasan Frontend (Angular)

- **Standalone components** (tanpa NgModule) + **Angular Signals** untuk
  state management (`CartService`, `ThemeService`, `I18nService`,
  `ToastService`, `ScrollPhysicsService`).
- **Tanpa backend pun tetap tampil benar** — `ApiService` otomatis memakai
  data cadangan lokal (`core/fallback-data.ts`, di-generate identik dengan
  `backend/src/data/*.json`) jika request API gagal.
- **Keranjang belanja & checkout** — tambah produk ke keranjang, atur
  jumlah, checkout dengan form (nama/HP/alamat/catatan), lalu dapat link
  WhatsApp konfirmasi otomatis.
- **Dark mode** (🌙/☀️) dan **dua bahasa ID/EN** (🇮🇩/🇬🇧), keduanya
  persisten via `localStorage`.
- **Menu mobile (hamburger)**, **skeleton loader** saat memuat data, dan
  **toast notification** saat produk ditambah ke keranjang.
- Seluruh animasi asli dipertahankan: reveal-on-scroll (`RevealDirective`),
  transisi suhu/warna latar saat scroll (`ScrollPhysicsService`), dan
  medan tetesan air yang mengkristal menjadi logo heksagonal OXYRA di
  section "Relief" (`DropfieldAnimation`).
- **Foto asli** produk (galon Aqua/OXYRA/Sanford, botol OXYRA) dan foto
  gerai toko sudah terintegrasi di `public/images/`.

---

## 📦 Deploy

- **Backend**: deploy ke Render, Railway, Fly.io, atau VPS Node.js apa
  pun — set environment variable dari `backend/.env.example`, lalu
  `npm start`.
- **Frontend**: `npm run build` (di folder `frontend/`) menghasilkan
  folder statis `frontend/dist/oxyra-frontend/browser` yang bisa
  di-deploy ke Vercel, Netlify, Cloudflare Pages, atau static hosting apa
  pun. Set `environment.production.ts` ke URL backend produksi sebelum
  build.
- **Docker**: `frontend/Dockerfile` (multi-stage: build Angular → serve
  dengan Nginx) dan `backend/` bisa dijalankan sebagai container Node.js
  standar.

---

## 📄 Lisensi

Didistribusikan di bawah lisensi MIT — lihat berkas [LICENSE](./LICENSE).

---

**OXYRA · Batam, Indonesia** — *Welcome to the Happy Hydration Era.*
