# SNAPSHOT PROYEK rental-cinta-riau (2026-11-10 19:29)

Jumlah file dalam snapshot: 61
TIDAK termasuk: node_modules, .next, .env.local (rahasia), package-lock.json, gambar/aset di folder public.

## Daftar file yang ada di snapshot
- CATATAN-STATUS.md
- cbf.test.ts
- eslint.config.mjs
- next.config.ts
- package.json
- README.md
- src\app\(pelanggan)\layout.tsx
- src\app\(pelanggan)\mobil\[id_kendaraan]\page.tsx
- src\app\(pelanggan)\pencarian-pintar\page.tsx
- src\app\(pelanggan)\pencarian-pintar\PencarianPintarClient.tsx
- src\app\(pelanggan)\riwayat\page.tsx
- src\app\(pelanggan)\riwayat\RiwayatClient.tsx
- src\app\(pelanggan)\transaksi\[id_kendaraan]\page.tsx
- src\app\(pelanggan)\transaksi\[id_kendaraan]\TransaksiFormClient.tsx
- src\app\(pelanggan)\transaksi\ringkasan\[id_pemesanan]\page.tsx
- src\app\(pelanggan)\transaksi\ringkasan\[id_pemesanan]\RingkasanClient.tsx
- src\app\(publik)\login\page.tsx
- src\app\(publik)\register\page.tsx
- src\app\actions\admin-kendaraan.ts
- src\app\actions\auth.ts
- src\app\actions\cbf-action.ts
- src\app\actions\pelanggan-riwayat.ts
- src\app\actions\pelanggan-transaksi.ts
- src\app\actions\publik-kendaraan.ts
- src\app\actions\super-admin.ts
- src\app\admin\kendaraan\KendaraanClient.tsx
- src\app\admin\kendaraan\page.tsx
- src\app\admin\layout.tsx
- src\app\admin\page.tsx
- src\app\akses-ditolak\page.tsx
- src\app\api\auth\logout\route.ts
- src\app\api\midtrans\webhook\route.ts
- src\app\api\pembayaran\status\route.ts
- src\app\api\pembayaran\token\route.ts
- src\app\globals.css
- src\app\layout.tsx
- src\app\page.tsx
- src\app\staf\layout.tsx
- src\app\staf\page.tsx
- src\app\super-admin\layout.tsx
- src\app\super-admin\page.tsx
- src\app\super-admin\UserManagementClient.tsx
- src\components\kendaraan\CarCard.tsx
- src\components\layout\DashboardLayout.tsx
- src\components\layout\Footer.tsx
- src\lib\auth.ts
- src\lib\cbf\cosine.ts
- src\lib\cbf\rekomendasi.ts
- src\lib\cbf\urutkan.ts
- src\lib\cbf\vektorisasi.ts
- src\lib\config.ts
- src\lib\formatters.ts
- src\lib\midtrans.ts
- src\lib\supabase\admin.ts
- src\lib\supabase\client.ts
- src\lib\supabase\server.ts
- src\lib\validations.ts
- src\middleware.ts
- src\types\index.ts
- tsconfig.json
- vite.config.ts

## Struktur folder src
```
Folder PATH listing for volume New Volume
Volume serial number is 68C0-8CB7
D:\SKRIPSI\RENTAL-CINTA-RIAU\RENTAL-CINTA-RIAU\SRC
|   middleware.ts
|   
+---app
|   |   favicon.ico
|   |   globals.css
|   |   layout.tsx
|   |   page.tsx
|   |   
|   +---(pelanggan)
|   |   |   layout.tsx
|   |   |   
|   |   +---mobil
|   |   |   \---[id_kendaraan]
|   |   |           page.tsx
|   |   |           
|   |   +---pencarian-pintar
|   |   |       page.tsx
|   |   |       PencarianPintarClient.tsx
|   |   |       
|   |   +---riwayat
|   |   |       page.tsx
|   |   |       RiwayatClient.tsx
|   |   |       
|   |   \---transaksi
|   |       +---ringkasan
|   |       |   \---[id_pemesanan]
|   |       |           page.tsx
|   |       |           RingkasanClient.tsx
|   |       |           
|   |       \---[id_kendaraan]
|   |               page.tsx
|   |               TransaksiFormClient.tsx
|   |               
|   +---(publik)
|   |   +---login
|   |   |       page.tsx
|   |   |       
|   |   \---register
|   |           page.tsx
|   |           
|   +---actions
|   |       admin-kendaraan.ts
|   |       auth.ts
|   |       cbf-action.ts
|   |       pelanggan-riwayat.ts
|   |       pelanggan-transaksi.ts
|   |       publik-kendaraan.ts
|   |       super-admin.ts
|   |       
|   +---admin
|   |   |   layout.tsx
|   |   |   page.tsx
|   |   |   
|   |   \---kendaraan
|   |           KendaraanClient.tsx
|   |           page.tsx
|   |           
|   +---akses-ditolak
|   |       page.tsx
|   |       
|   +---api
|   |   +---auth
|   |   |   \---logout
|   |   |           route.ts
|   |   |           
|   |   +---midtrans
|   |   |   \---webhook
|   |   |           route.ts
|   |   |           
|   |   \---pembayaran
|   |       +---status
|   |       |       route.ts
|   |       |       
|   |       \---token
|   |               route.ts
|   |               
|   +---staf
|   |       layout.tsx
|   |       page.tsx
|   |       
|   \---super-admin
|           layout.tsx
|           page.tsx
|           UserManagementClient.tsx
|           
+---components
|   +---charts
|   +---kendaraan
|   |       CarCard.tsx
|   |       
|   +---layout
|   |       DashboardLayout.tsx
|   |       Footer.tsx
|   |       
|   \---ui
+---lib
|   |   auth.ts
|   |   config.ts
|   |   formatters.ts
|   |   midtrans.ts
|   |   validations.ts
|   |   
|   +---cbf
|   |       cosine.ts
|   |       rekomendasi.ts
|   |       urutkan.ts
|   |       vektorisasi.ts
|   |       
|   +---export
|   +---midtrans
|   \---supabase
|           admin.ts
|           client.ts
|           server.ts
|           
\---types
        index.ts
        
```

### FILE: CATATAN-STATUS.md
```md
Tahap Selesai: Tahap 1 (Setup Next.js) dan Tahap 2 (Database Supabase).

Struktur Folder Terkini: Kerangka awal Next.js dan konfigurasi file .env.local.example sudah siap di lokal.

Environment: Variabel Supabase dan Midtrans siap untuk diisi.

Database: Skema 4 tabel, constraint double-booking, trigger auth otomatis, dan Row Level Security (RLS) sudah diuji dan berjalan sempurna.

Masalah Belum Selesai: Tidak ada.

Tahap Berikutnya: Tahap 3: Konfigurasi Supabase Client (SSR) di Next.js, pembuatan Halaman Autentikasi, dan Middleware proteksi Route.

RINGKASAN STATUS:

Tahap Selesai: Tahap 1, 2, dan 3.

Struktur Folder: Sudah bersih dan sesuai rute Master Brief.

Environment: Berhasil terhubung ke Supabase.

Tahap Berikutnya: Tahap 4 (Manajemen Kendaraan dan Fitur Admin).


Fitur Utama Selesai: Antarmuka Manajemen Pengguna khusus Super Admin dengan tabel dinamis (pencarian, filter role, dan paginasi).

Keamanan & Server Actions: Integrasi klien service_role Supabase untuk mendaftarkan akun internal (tanpa repot konfirmasi email manual), dan memblokir akses login melalui ban_duration di lapisan Auth. Validasi server sukses mencegah Super Admin mendemosi atau memblokir dirinya sendiri.

Perbaikan Skema: Penyelarasan Primary Key dari id menjadi id_user sukses diterapkan pada seluruh operasi CRUD untuk sinkronisasi sempurna antara auth.users dan public.users.

File Dibuat/Diubah: src/lib/supabase/admin.ts, src/app/actions/super-admin.ts, src/app/super-admin/UserManagementClient.tsx, dan src/app/super-admin/page.tsx.

Pengujian Checklist: Lulus 100% (Tambah akun, hapus tuntas, ubah role, dan notifikasi blokir login).

Ringkasan Status: Tahap 5 Selesai (Manajemen Kendaraan Admin)
Fitur Utama Selesai: Antarmuka Manajemen Kendaraan khusus Admin/Super Admin dengan tabel dinamis (pencarian teks, filter jenis kendaraan Hatchback/SUV/MPV, filter status ketersediaan, paginasi, dan pratinjau gambar).

Keamanan & Server Actions: Integrasi penuh pada admin-kendaraan.ts dengan validasi Zod yang ketat, pengelolaan Supabase Storage untuk upload foto kendaraan maksimal 2 MB, serta penanganan error kode database secara aman.

Penyelarasan Skema & Opsi: Sinkronisasi total pilihan formulir (transmisi Manual/Matic, bahan bakar Bensin/Diesel/Hybrid/Listrik, serta rute peruntukan Dalam Kota / Luar Kota / Keduanya) agar selaras 100% dengan struktur tabel database Supabase.

File Dibuat/Diubah: src/app/actions/admin-kendaraan.ts dan src/app/admin/kendaraan/KendaraanClient.tsx.

Pengujian Checklist: Lulus 100% (Tambah kendaraan baru dengan 8 variabel skripsi, upload foto, validasi plat nomor unik, ubah data & fitur, toggle status cepat, serta hapus tuntas beserta file storage).


Ringkasan Status Tahap 6
Landing Page Publik (/)

Berfungsi sebagai gerbang utama saat aplikasi diakses pertama kali (npm run dev).

Menampilkan informasi profil perusahaan, alur pemesanan, serta katalog kendaraan unggulan bagi pengunjung umum.

Dilengkapi tombol navigasi Masuk dan Daftar di bilah atas (header).

Sistem Autentikasi & Registrasi (/login, /register)

Berhasil terintegrasi dengan Supabase Auth dan tabel basis data public.users.

Pendaftaran akun baru otomatis mencatat data profil lengkap (nama, email, no HP, alamat) dengan role default sebagai pelanggan.

Manajemen Role & Pembagian Rute (Middleware)

Middleware dan fungsi wajibRole bekerja optimal mengamankan rute berdasarkan hak akses:

Pelanggan diarahkan ke /pencarian-pintar.

Admin diarahkan ke /admin.

Super Admin diarahkan ke /super-admin.

Staf diarahkan ke /staf.

Manajemen Sesi & Tombol Keluar (Logout)

Penanganan fallback sesi pengguna sudah diperbaiki agar tombol Keluar (Logout) muncul dengan sempurna pada header halaman pelanggan setelah berhasil masuk.

Tahap Selesai: Tahap 1, 2, 3, 4, 5, 6, 7, dan 8.

Struktur Folder Terbaru: src/app/(pelanggan)/transaksi dan folder ringkasan berhasil diintegrasikan.

Variabel Environment (Tanpa Nilai): NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY.

Route Berjalan: /, /login, /register, /super-admin, /admin, /admin/kendaraan, /pencarian-pintar, /mobil/[id], /transaksi/[id], /transaksi/ringkasan/[id].

Perubahan Database: Tidak ada perubahan struktur/skema, hanya memanfaatkan tabel pemesanan dan bucket dokumen-identitas sesuai spesifikasi asli.

Masalah Belum Selesai: Belum ada pembuatan Token Midtrans dan baris transaksi database (akan dikerjakan di Tahap 9).

Tahap Berikutnya: Tahap 9 (Pembayaran Midtrans Snap & Webhook).

Tahap Selesai: Tahap 1 hingga Tahap 9.

Fitur Baru Aktif: Pembayaran Midtrans Snap (Sandbox), verifikasi Webhook SHA512, pemetaan status transaksi, dan proteksi URL.

Masalah Belum Selesai: Riwayat Pemesanan Pelanggan (Tahap 10).

Tahap Berikutnya: Tahap 10 (Halaman Riwayat Pemesanan Pelanggan).

Tahap Selesai: Tahap 1 hingga Tahap 10.

Fitur Baru Aktif: Navigasi (Navbar) Pelanggan terintegrasi, Halaman Riwayat Pemesanan, Filter Status, Modal Linimasa (Timeline), dan pelunasan Midtrans langsung dari menu riwayat.

Fokus Saat Ini: Seluruh alur perjalanan pengguna (pelanggan) dari pencarian hingga pembayaran dan riwayat sudah tuntas 100%.

Tahap Berikutnya: Tahap 11 (Dashboard Admin/Staf & Verifikasi Dokumen).
```

### FILE: cbf.test.ts
```ts
import { describe, it, expect } from 'vitest';
import { hitungCosineSimilarity } from './src/lib/cbf/cosine';
import { hitungRentangNormalisasi, ubahKendaraanKeVektor, ubahPreferensiKeVektor, UserPreferences } from './src/lib/cbf/vektorisasi';
import { urutkanRekomendasi } from './src/lib/cbf/urutkan';
import { Kendaraan } from './src/types';
import { KATEGORI_OPTIONS, BAHAN_BAKAR_OPTIONS, TRANSMISI_OPTIONS, FITUR_OPTIONS, TOP_N_REKOMENDASI } from './src/lib/config';

describe('Pengujian Algoritma Content-Based Filtering (CBF)', () => {
  const mockKendaraan: Kendaraan[] = [
    {
      id_kendaraan: '1',
      nama_kendaraan: 'Avanza',
      jenis_kendaraan: 'MPV',
      plat_nomor: 'BM 1234 AA',
      harga_sewa: 300000,
      tahun_kendaraan: 2022,
      bahan_bakar: 'Bensin',
      transmisi: 'Manual',
      rute_peruntukan: 'dalam_kota',
      kapasitas: 7,
      fitur_tambahan: ['Double Blower'],
      foto_url: null,
      status: 'tersedia',
    },
    {
      id_kendaraan: '2',
      nama_kendaraan: 'Alphard',
      jenis_kendaraan: 'MPV',
      plat_nomor: 'BM 5678 BB',
      harga_sewa: 1500000,
      tahun_kendaraan: 2024,
      bahan_bakar: 'Hybrid',
      transmisi: 'Matic',
      rute_peruntukan: 'keduanya',
      kapasitas: 7,
      fitur_tambahan: ['Double Blower', 'Sunroof', 'Kursi Kulit'],
      foto_url: null,
      status: 'disewa',
    },
    {
      id_kendaraan: '3',
      nama_kendaraan: 'Brio',
      jenis_kendaraan: 'Hatchback',
      plat_nomor: 'BM 9999 CC',
      harga_sewa: 250000,
      tahun_kendaraan: 2020,
      bahan_bakar: 'Bensin',
      transmisi: 'Matic',
      rute_peruntukan: 'dalam_kota',
      kapasitas: 5,
      fitur_tambahan: ['Kamera Mundur'],
      foto_url: null,
      status: 'tersedia',
    },
    {
      id_kendaraan: '4',
      nama_kendaraan: 'Fortuner',
      jenis_kendaraan: 'SUV',
      plat_nomor: 'BM 4444 DD',
      harga_sewa: 800000,
      tahun_kendaraan: 2023,
      bahan_bakar: 'Diesel',
      transmisi: 'Matic',
      rute_peruntukan: 'luar_kota',
      kapasitas: 7,
      fitur_tambahan: ['Sensor Parkir', 'Apple CarPlay'],
      foto_url: null,
      status: 'tersedia',
    },
  ];

  const prefIdentik: UserPreferences = {
    jenis_kendaraan: 'MPV',
    kapasitas: 7,
    bahan_bakar: 'Bensin',
    transmisi: 'Manual',
    rute_peruntukan: 'dalam_kota',
    tahun_kendaraan: 2022,
    harga_sewa: 300000,
    fitur_tambahan: ['Double Blower'],
  };

  const rentang = hitungRentangNormalisasi(mockKendaraan.filter(k => k.status === 'tersedia'));

  it('(a) Vektor identik menghasilkan kemiripan 100% (1.0)', () => {
    // Vektor acak
    const v1 = [1, 0, 0.5, 1, 0, 1, 0.2, 0.8, 1];
    const skor = hitungCosineSimilarity(v1, v1);
    expect(skor).toBe(1.0);
  });

  it('(b) Kendaraan identik dengan preferensi menghasilkan skor mendekati 1.0 lewat ubahKendaraanKeVektor', () => {
    const vPref = ubahPreferensiKeVektor(prefIdentik, rentang);
    const vMobil = ubahKendaraanKeVektor(mockKendaraan[0], rentang);
    const skor = hitungCosineSimilarity(vPref, vMobil);
    expect(skor).toBeCloseTo(1.0, 5);
  });

  it('(c) Preferensi sangat berbeda menghasilkan skor rendah', () => {
    const prefBeda: UserPreferences = {
      jenis_kendaraan: 'Sedan',
      kapasitas: 2,
      bahan_bakar: 'Listrik',
      transmisi: 'Matic',
      rute_peruntukan: 'luar_kota',
      tahun_kendaraan: 1990,
      harga_sewa: 10000,
      fitur_tambahan: [],
    };
    const vPref = ubahPreferensiKeVektor(prefBeda, rentang);
    const vMobil = ubahKendaraanKeVektor(mockKendaraan[0], rentang);
    const skor = hitungCosineSimilarity(vPref, vMobil);
    expect(skor).toBeLessThan(0.3);
  });

  it('(d) Urutan Top-N benar dan jumlahnya tidak melebihi TOP_N_REKOMENDASI', () => {
    // Menggandakan data dummy untuk memicu pembatasan array (slice)
    const banyakKendaraan = [...mockKendaraan, ...mockKendaraan, ...mockKendaraan].map((k, i) => ({...k, id_kendaraan: String(i)}));
    const hasil = urutkanRekomendasi(prefIdentik, banyakKendaraan);
    
    expect(hasil.length).toBeLessThanOrEqual(TOP_N_REKOMENDASI);
    // Avanza harus berada di puncak
    expect(hasil[0].kendaraan.nama_kendaraan).toBe('Avanza');
    
    // Pastikan terurut menurun
    if (hasil.length > 1) {
      expect(hasil[0].skor_similarity).toBeGreaterThanOrEqual(hasil[1].skor_similarity);
    }
  });

  it('(e) Vektor nol (kosong) tidak menyebabkan error dan menghasilkan skor 0', () => {
    const v1 = [0, 0, 0];
    const v2 = [1, 1, 1];
    expect(() => hitungCosineSimilarity(v1, v2)).not.toThrow();
    expect(hitungCosineSimilarity(v1, v2)).toBe(0);
  });

  it('(f) Kendaraan berstatus disewa tidak pernah muncul dari urutkanRekomendasi', () => {
    const hasil = urutkanRekomendasi(prefIdentik, mockKendaraan);
    const adaDisewa = hasil.some(h => h.kendaraan.status === 'disewa');
    expect(adaDisewa).toBe(false);
  });

  it('(g) Panjang vektor sama dengan jumlah opsi config + dimensi normalisasi', () => {
    const vMobil = ubahKendaraanKeVektor(mockKendaraan[0], rentang);
    const panjangHarapan = 
      KATEGORI_OPTIONS.length + // (One-Hot Kategori)
      1 + // (Kapasitas Min-Max)
      BAHAN_BAKAR_OPTIONS.length + // (One-Hot Bahan Bakar)
      TRANSMISI_OPTIONS.length + // (One-Hot Transmisi)
      2 + // (Rute: Dalam/Luar)
      1 + // (Tahun Min-Max)
      1 + // (Harga Min-Max)
      FITUR_OPTIONS.length; // (Multi-Hot Fitur)
      
    expect(vMobil.length).toBe(panjangHarapan);
  });

  it('(h) Perubahan tahun_kendaraan pada preferensi benar-benar mengubah skor', () => {
    const vPrefAsli = ubahPreferensiKeVektor(prefIdentik, rentang);
    const prefTahunBeda = { ...prefIdentik, tahun_kendaraan: 2020 }; // Mengubah tahun menjadi berbeda
    const vPrefBeda = ubahPreferensiKeVektor(prefTahunBeda, rentang);
    
    const vMobil = ubahKendaraanKeVektor(mockKendaraan[0], rentang);
    
    const skorAsli = hitungCosineSimilarity(vPrefAsli, vMobil);
    const skorBeda = hitungCosineSimilarity(vPrefBeda, vMobil);
    
    // Skor kemiripan harus berbeda karena atribut tahun (salah satu variabel) berubah
    expect(skorAsli).not.toBe(skorBeda);
  });
});
```

### FILE: eslint.config.mjs
```mjs
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
```

### FILE: next.config.ts
```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
```

### FILE: package.json
```json
{
  "name": "rental-cinta-riau",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "test": "vitest run"
  },
  "dependencies": {
    "@supabase/ssr": "^0.12.7",
    "@supabase/supabase-js": "^2.118.0",
    "date-fns": "^4.4.0",
    "jspdf": "^4.2.1",
    "jspdf-autotable": "^5.0.9",
    "lucide-react": "^1.67.0",
    "midtrans-client": "^1.4.3",
    "next": "16.4.4",
    "react": "19.3.0",
    "react-dom": "19.3.0",
    "recharts": "^3.10.1",
    "xlsx": "^0.18.5",
    "zod": "^4.6.7"
  },
  "devDependencies": {
    "@tailwindcss/turbopack": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.4.4",
    "tailwindcss": "^4",
    "typescript": "^5",
    "vitest": "^1.6.1"
  }
}
```

### FILE: README.md
```md
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
```

### FILE: src\app\(pelanggan)\layout.tsx
```tsx
import { ReactNode } from 'react';
import Link from 'next/link';
import { LogOut, Car, Clock } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

export default async function PelangganLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let namaPelanggan = '';
  if (user) {
    const { data: profile } = await supabase
      .from('users')
      .select('nama')
      .eq('id_user', user.id)
      .single();
    namaPelanggan = profile?.nama || user.email || '';
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar Atas */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo & Nama PT */}
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition group">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-200 group-hover:bg-blue-700 transition">
                <Car size={22} />
              </div>
              <span className="text-base sm:text-lg font-extrabold text-gray-900 tracking-tight">
                PT Cinta Riau Tour & Travel
              </span>
            </Link>
            
            {/* Menu Navigasi Kanan */}
            <nav className="flex items-center space-x-4 md:space-x-8">
              <Link href="/pencarian-pintar" className="text-gray-600 hover:text-blue-600 font-medium text-sm flex items-center transition">
                <Car size={18} className="mr-1.5" /> <span className="hidden sm:inline">Cari Mobil</span>
              </Link>
              <Link href="/riwayat" className="text-gray-600 hover:text-blue-600 font-medium text-sm flex items-center transition">
                <Clock size={18} className="mr-1.5" /> <span className="hidden sm:inline">Riwayat</span>
              </Link>
              
              {namaPelanggan && (
                <>
                  <div className="h-6 w-px bg-gray-200 mx-1"></div>
                  <span className="text-sm font-semibold text-gray-700 hidden md:inline">
                    {namaPelanggan}
                  </span>
                </>
              )}

              <form action="/api/auth/logout" method="POST">
                <button type="submit" className="text-red-600 hover:text-red-700 font-medium text-sm flex items-center transition">
                  <LogOut size={18} className="mr-1.5" /> <span className="hidden sm:inline">Keluar</span>
                </button>
              </form>
            </nav>
          </div>
        </div>
      </header>

      {/* Konten Halaman */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} PT Cinta Riau Tour & Travel. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
```

### FILE: src\app\(pelanggan)\mobil\[id_kendaraan]\page.tsx
```tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ambilDetailKendaraan } from '@/app/actions/publik-kendaraan';
import { ambilPenggunaSaatIni } from '@/lib/auth';
import { formatRupiah } from '@/lib/formatters';
import { NAMA_PERUSAHAAN } from '@/lib/config';
import { 
  Image as ImageIcon, CheckCircle2, XCircle, ArrowLeft, 
  Car, Users, Fuel, Gauge, Calendar, Settings, ShieldCheck 
} from 'lucide-react';

// Fungsi penyamar Plat Nomor
function samarkanPlat(plat: string) {
  const parts = plat.trim().split(' ');
  if (parts.length === 3) {
    return `${parts[0]} ${parts[1]} **`;
  }
  return plat.slice(0, -2) + '**';
}

function formatRute(rute: string) {
  if (rute === 'dalam_kota') return 'Dalam Kota';
  if (rute === 'luar_kota') return 'Luar Kota';
  if (rute === 'keduanya') return 'Dalam & Luar Kota';
  return rute;
}

type Props = {
  params: Promise<{ id_kendaraan: string }>;
};

export default async function DetailMobilPage({ params }: Props) {
  const resolvedParams = await params;
  const id_kendaraan = resolvedParams.id_kendaraan;
  
  const mobil = await ambilDetailKendaraan(id_kendaraan);
  if (!mobil) return notFound();

  const pengguna = await ambilPenggunaSaatIni();
  
  const rutePemesanan = pengguna 
    ? `/transaksi/${id_kendaraan}` 
    : `/login?next=/mobil/${id_kendaraan}`;

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] pb-12">
      <div className="mb-6">
        <Link href="/pencarian-pintar" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition">
          <ArrowLeft size={16} className="mr-1" /> Kembali ke Katalog
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Sisi Kiri: Foto */}
          <div className="bg-gray-50 border-r border-gray-200 p-8 flex items-center justify-center min-h-[300px] lg:min-h-[500px]">
            {mobil.foto_url ? (
              <img 
                src={mobil.foto_url} 
                alt={mobil.nama_kendaraan} 
                className="w-full max-w-md h-auto object-contain drop-shadow-xl"
              />
            ) : (
              <div className="text-center text-gray-400">
                <ImageIcon size={80} className="mx-auto mb-4 opacity-50" />
                <p>Foto tidak tersedia</p>
              </div>
            )}
          </div>

          {/* Sisi Kanan: Spesifikasi */}
          <div className="p-8 lg:p-10 flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="inline-flex items-center space-x-2 mb-3">
                  <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {mobil.jenis_kendaraan}
                  </span>
                  <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center">
                    <ShieldCheck size={14} className="mr-1" /> {samarkanPlat(mobil.plat_nomor)}
                  </span>
                </div>
                <h1 className="text-3xl font-extrabold text-gray-900">{mobil.nama_kendaraan}</h1>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500 mb-1">Harga Sewa</div>
                <div className="text-2xl font-bold text-blue-600">{formatRupiah(mobil.harga_sewa)}</div>
                <div className="text-xs text-gray-400">/ hari</div>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-8 leading-relaxed">
              Disewakan kendaraan {mobil.nama_kendaraan} kategori {mobil.jenis_kendaraan} tahun {mobil.tahun_kendaraan} 
              dengan kondisi prima dan terawat oleh {NAMA_PERUSAHAAN}. Cocok untuk penggunaan {formatRute(mobil.rute_peruntukan)}.
            </p>

            {/* 8 Variabel CBF Grid */}
            <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Spesifikasi Kendaraan</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 flex-1">
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                <Car className="text-gray-400 mb-2" size={20} />
                <div className="text-xs text-gray-500 mb-0.5">Kategori</div>
                <div className="font-semibold text-gray-900 text-sm">{mobil.jenis_kendaraan}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                <Users className="text-gray-400 mb-2" size={20} />
                <div className="text-xs text-gray-500 mb-0.5">Kapasitas</div>
                <div className="font-semibold text-gray-900 text-sm">{mobil.kapasitas} Kursi</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                <Fuel className="text-gray-400 mb-2" size={20} />
                <div className="text-xs text-gray-500 mb-0.5">Bahan Bakar</div>
                <div className="font-semibold text-gray-900 text-sm">{mobil.bahan_bakar}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                <Gauge className="text-gray-400 mb-2" size={20} />
                <div className="text-xs text-gray-500 mb-0.5">Transmisi</div>
                <div className="font-semibold text-gray-900 text-sm">{mobil.transmisi}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                <div className="text-xs text-gray-500 mb-0.5">Rute Izin</div>
                <div className="font-semibold text-gray-900 text-sm">{formatRute(mobil.rute_peruntukan)}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                <Calendar className="text-gray-400 mb-2" size={20} />
                <div className="text-xs text-gray-500 mb-0.5">Tahun</div>
                <div className="font-semibold text-gray-900 text-sm">{mobil.tahun_kendaraan}</div>
              </div>
            </div>

            {/* Fitur Tambahan */}
            <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider flex items-center">
              <Settings size={16} className="mr-2" /> Fitur Tambahan
            </h3>
            <div className="flex flex-wrap gap-2 mb-8">
              {mobil.fitur_tambahan && mobil.fitur_tambahan.length > 0 ? (
                mobil.fitur_tambahan.map((fitur, i) => (
                  <span key={i} className="bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1.5 rounded-lg text-xs font-medium">
                    {fitur}
                  </span>
                ))
              ) : (
                <span className="text-gray-400 text-sm italic">Tidak ada catatan fitur tambahan.</span>
              )}
            </div>

            {/* Call to Action */}
            <div className="mt-auto pt-6 border-t border-gray-100">
              {mobil.status === 'tersedia' ? (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center text-green-600 text-sm font-medium bg-green-50 px-4 py-2 rounded-lg">
                    <CheckCircle2 size={18} className="mr-2" /> Kendaraan Tersedia
                  </div>
                  <Link 
                    href={rutePemesanan}
                    className="w-full sm:w-auto text-center px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition"
                  >
                    Pesan Sekarang
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center text-red-600 text-sm font-medium bg-red-50 px-4 py-2 rounded-lg">
                    <XCircle size={18} className="mr-2" /> Sedang Disewa
                  </div>
                  <button disabled className="w-full sm:w-auto px-8 py-3.5 bg-gray-300 text-gray-500 font-bold rounded-xl cursor-not-allowed">
                    Pesan Sekarang
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Catatan: Footer dibungkus oleh layout pelanggan, jadi tidak perlu dipanggil manual di sini */}
    </div>
  );
}
```

### FILE: src\app\(pelanggan)\pencarian-pintar\page.tsx
```tsx
import { ambilKendaraanTersedia } from '@/app/actions/publik-kendaraan';
import PencarianPintarClient from './PencarianPintarClient';

export const dynamic = 'force-dynamic';

export default async function PencarianPintarPage() {
  const semuaMobil = await ambilKendaraanTersedia();

  return <PencarianPintarClient semuaKatalog={semuaMobil} />;
}
```

### FILE: src\app\(pelanggan)\pencarian-pintar\PencarianPintarClient.tsx
```tsx
'use client';

import { useActionState } from 'react';
import { prosesPencarianPintar } from '@/app/actions/cbf-action';
import { HasilRekomendasi } from '@/lib/cbf/rekomendasi';
import { KATEGORI_OPTIONS, BAHAN_BAKAR_OPTIONS, TRANSMISI_OPTIONS, FITUR_OPTIONS } from '@/lib/config';
import { Kendaraan } from '@/types';
import CarCard from '@/components/kendaraan/CarCard';
import { Sparkles, Search, SlidersHorizontal, CheckCircle } from 'lucide-react';

export default function PencarianPintarClient({ semuaKatalog }: { semuaKatalog: Kendaraan[] }) {
  // Inisialisasi lengkap dengan properti success, rekomendasi, dan error
  const [state, formAction, isPending] = useActionState(prosesPencarianPintar, {
    success: false,
    rekomendasi: [],
    error: null,
  });

  return (
    <div className="space-y-12">
      {/* 1. Header Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-lg p-6 md:p-10 text-white relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center space-x-2 mb-3">
            <Sparkles className="text-yellow-300" size={24} />
            <h1 className="text-2xl md:text-3xl font-bold">Pencarian Pintar (Content-Based Filtering)</h1>
          </div>
          <p className="text-blue-100 mb-2">
            Masukkan kriteria preferensi kendaraan impian Anda. Sistem kami akan menghitung tingkat kemiripan menggunakan Cosine Similarity dari 8 variabel spesifikasi.
          </p>
        </div>
      </div>

      {/* 2. Form Input 8 Variabel */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
        <div className="flex items-center space-x-2 mb-6 border-b pb-4">
          <SlidersHorizontal className="text-blue-600" size={20} />
          <h2 className="text-lg font-bold text-gray-900">Formulir Preferensi Kendaraan</h2>
        </div>

        {state?.error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-4 rounded-xl mb-6 font-medium">
            {state.error}
          </div>
        )}

        <form action={formAction} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Kategori */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kategori Kendaraan</label>
              <select name="jenis_kendaraan" required className="w-full border border-gray-300 rounded-lg p-2.5 bg-white text-sm outline-none focus:border-blue-500">
                <option value="">Pilih Kategori</option>
                {KATEGORI_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>

            {/* Kapasitas */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kapasitas (Orang)</label>
              <input type="number" name="kapasitas" min={1} required placeholder="Contoh: 7" className="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500" />
            </div>

            {/* Bahan Bakar */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bahan Bakar</label>
              <select name="bahan_bakar" required className="w-full border border-gray-300 rounded-lg p-2.5 bg-white text-sm outline-none focus:border-blue-500">
                <option value="">Pilih Bahan Bakar</option>
                {BAHAN_BAKAR_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>

            {/* Transmisi */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Transmisi</label>
              <select name="transmisi" required className="w-full border border-gray-300 rounded-lg p-2.5 bg-white text-sm outline-none focus:border-blue-500">
                <option value="">Pilih Transmisi</option>
                {TRANSMISI_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>

            {/* Rute Peruntukan */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rute Peruntukan</label>
              <select name="rute_peruntukan" required className="w-full border border-gray-300 rounded-lg p-2.5 bg-white text-sm outline-none focus:border-blue-500">
                <option value="">Pilih Rute</option>
                <option value="dalam_kota">Dalam Kota</option>
                <option value="luar_kota">Luar Kota</option>
                <option value="keduanya">Dalam & Luar Kota (Keduanya)</option>
              </select>
            </div>

            {/* Tahun Kendaraan */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tahun Kendaraan Minimal</label>
              <input type="number" name="tahun_kendaraan" min={1990} max={new Date().getFullYear() + 1} required placeholder="Contoh: 2022" className="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500" />
            </div>

            {/* Harga Sewa */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Maksimal Harga Sewa / Hari (Rp)</label>
              <input type="number" name="harga_sewa" min={10000} required placeholder="Contoh: 500000" className="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500" />
            </div>
          </div>

          {/* Fitur Tambahan (Checkbox) */}
          <div className="pt-4 border-t border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-3">Fitur Tambahan (Boleh pilih lebih dari satu)</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {FITUR_OPTIONS.map(fitur => (
                <label key={fitur} className="flex items-center space-x-2 text-sm text-gray-700 bg-gray-50 p-2.5 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition">
                  <input type="checkbox" name="fitur_tambahan" value={fitur} className="rounded text-blue-600 focus:ring-blue-500" />
                  <span>{fitur}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button 
              type="submit" 
              disabled={isPending}
              className="flex items-center px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition disabled:bg-blue-400"
            >
              <Search size={18} className="mr-2" />
              {isPending ? 'Menghitung Rekomendasi...' : 'Cari Rekomendasi Pintar'}
            </button>
          </div>
        </form>
      </div>

      {/* 3. Hasil Rekomendasi Terurut */}
      {state?.success && state.rekomendasi.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Daftar Rekomendasi Terurut (Top-N)</h2>
              <p className="text-gray-500 text-sm mt-1">Hasil perhitungan Cosine Similarity diurutkan dari tingkat kecocokan tertinggi.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {state.rekomendasi.map((item: HasilRekomendasi, index: number) => (
              <div key={item.kendaraan.id_kendaraan} className="relative flex flex-col">
                {/* Badge Peringkat & Skor Kecocokan */}
                <div className="absolute top-3 left-3 z-20 flex items-center space-x-1.5">
                  <span className="bg-blue-600 text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-md">
                    #{index + 1} Peringkat
                  </span>
                  <span className="bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md flex items-center">
                    <CheckCircle size={12} className="mr-1" /> {item.persentase_kecocokan}% Cocok
                  </span>
                </div>
                <div className="flex-1">
                  <CarCard mobil={item.kendaraan} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {state?.success && state.rekomendasi.length === 0 && (
        <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center shadow-sm">
          <p className="text-gray-600 font-medium">Mohon maaf, tidak ada kendaraan tersedia yang cocok dengan kriteria Anda saat ini.</p>
        </div>
      )}

      {/* 4. Katalog Semua Kendaraan */}
      <div className="space-y-6 pt-8 border-t border-gray-200">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Katalog Semua Kendaraan Tersedia</h2>
          <p className="text-gray-500 text-sm mt-1">Jelajahi seluruh armada yang siap disewa.</p>
        </div>

        {semuaKatalog.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">
            <p className="text-gray-500 text-sm">Tidak ada kendaraan yang tersedia saat ini.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {semuaKatalog.map(mobil => (
              <CarCard key={mobil.id_kendaraan} mobil={mobil} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
```

### FILE: src\app\(pelanggan)\riwayat\page.tsx
```tsx
import { ReactNode } from 'react';
import Link from 'next/link';
import { LogOut, Car, Clock } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

export default async function PelangganLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar Atas */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Car className="text-blue-600 mr-2" size={28} />
              <span className="text-xl font-extrabold text-gray-900 tracking-tight">Cinta Riau</span>
            </div>
            
            <nav className="flex items-center space-x-4 md:space-x-8">
              <Link href="/pencarian-pintar" className="text-gray-600 hover:text-blue-600 font-medium text-sm flex items-center">
                <Car size={18} className="mr-1.5" /> <span className="hidden sm:inline">Cari Mobil</span>
              </Link>
              <Link href="/riwayat" className="text-gray-600 hover:text-blue-600 font-medium text-sm flex items-center">
                <Clock size={18} className="mr-1.5" /> <span className="hidden sm:inline">Riwayat</span>
              </Link>
              <div className="h-6 w-px bg-gray-200 mx-2"></div>
              {user && (
                <span className="text-xs text-gray-500 font-medium hidden md:inline">
                  {user.email}
                </span>
              )}
              <form action="/api/auth/logout" method="POST">
                <button type="submit" className="text-red-600 hover:text-red-700 font-medium text-sm flex items-center">
                  <LogOut size={18} className="mr-1.5" /> <span className="hidden sm:inline">Keluar</span>
                </button>
              </form>
            </nav>
          </div>
        </div>
      </header>

      {/* Konten Halaman */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} PT Cinta Riau Tour & Travel. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
```

### FILE: src\app\(pelanggan)\riwayat\RiwayatClient.tsx
```tsx
'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { formatTanggal, formatRupiah, hitungJumlahHari } from '@/lib/formatters';
import { batalkanPemesanan } from '@/app/actions/pelanggan-transaksi';
import { Car, Calendar, MapPin, Search, ExternalLink, CreditCard, Ban, RefreshCw, X, CheckCircle, Info } from 'lucide-react';

export default function RiwayatClient({ initialData, filterAktif, pageAktif }: any) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isPaying, setIsPaying] = useState(false);
  
  const [modalData, setModalData] = useState<any | null>(null);

  const TABS = [
    { id: 'semua', label: 'Semua Status' },
    { id: 'menunggu_pembayaran', label: 'Menunggu Pembayaran' },
    { id: 'dibayar', label: 'Dibayar' },
    { id: 'diambil', label: 'Sedang Disewa' },
    { id: 'selesai', label: 'Selesai' },
    { id: 'dibatalkan', label: 'Dibatalkan' }
  ];

  const statusPemesananColors: Record<string, string> = {
    'menunggu_pembayaran': 'bg-amber-100 text-amber-800 border-amber-200',
    'dibayar': 'bg-blue-100 text-blue-800 border-blue-200',
    'diambil': 'bg-indigo-100 text-indigo-800 border-indigo-200',
    'selesai': 'bg-green-100 text-green-800 border-green-200',
    'dibatalkan': 'bg-red-100 text-red-800 border-red-200',
  };

  const statusPembayaranColors: Record<string, string> = {
    'settlement': 'bg-emerald-100 text-emerald-800 border-emerald-200',
    'pending': 'bg-amber-100 text-amber-800 border-amber-200',
    'expire': 'bg-rose-100 text-rose-800 border-rose-200',
    'cancel': 'bg-rose-100 text-rose-800 border-rose-200',
    'deny': 'bg-rose-100 text-rose-800 border-rose-200',
    'belum_bayar': 'bg-gray-100 text-gray-700 border-gray-200'
  };

  const statusVerifikasiColors: Record<string, string> = {
    'menunggu': 'bg-yellow-50 text-yellow-700 border-yellow-200',
    'valid': 'bg-green-50 text-green-700 border-green-200',
    'ditolak': 'bg-red-50 text-red-700 border-red-200',
  };

  const gantiFilter = (status: string) => {
    router.push(`/riwayat?status=${status}&page=1`);
  };

  const gantiHalaman = (page: number) => {
    router.push(`/riwayat?status=${filterAktif}&page=${page}`);
  };

  async function handleBayar(pesanan: any) {
    setIsPaying(true);
    try {
      const res = await fetch('/api/pembayaran/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_pemesanan: pesanan.id_pemesanan }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      if (typeof (window as any).snap !== 'undefined') {
        (window as any).snap.pay(data.token, {
          onSuccess: () => { alert('Pembayaran berhasil dikonfirmasi!'); setModalData(null); router.refresh(); },
          onPending: () => { alert('Menunggu konfirmasi pembayaran dari sistem.'); setModalData(null); router.refresh(); },
          onError: () => { alert('Pembayaran gagal atau dibatalkan.'); router.refresh(); },
          onClose: () => { router.refresh(); }
        });
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsPaying(false);
    }
  }

  async function handleCekStatus(id_pemesanan: string) {
    setIsPaying(true);
    try {
      const res = await fetch('/api/pembayaran/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_pemesanan }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      alert(`Status transaksi saat ini: ${data.status.toUpperCase()}`);
      setModalData(null);
      router.refresh();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsPaying(false);
    }
  }

  async function handleBatal(id_pemesanan: string) {
    if (!confirm('Apakah Anda yakin ingin membatalkan pemesanan ini?')) return;
    startTransition(async () => {
      await batalkanPemesanan(id_pemesanan);
      setModalData(null);
      router.refresh();
    });
  }

  return (
    <div className="space-y-6">
      <Script src={process.env.NEXT_PUBLIC_MIDTRANS_SNAP_URL || 'https://app.sandbox.midtrans.com/snap/snap.js'} data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY} strategy="lazyOnload" />

      {/* Tabs Filter */}
      <div className="flex overflow-x-auto hide-scrollbar space-x-2 pb-2">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => gantiFilter(tab.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
              filterAktif === tab.id 
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm' 
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Daftar Pemesanan */}
      {initialData.data.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center shadow-sm">
          <Search className="mx-auto text-gray-300 mb-3" size={48} />
          <h3 className="text-lg font-bold text-gray-900">Belum ada pemesanan</h3>
          <p className="text-gray-500 mt-1 mb-6">Anda tidak memiliki daftar pemesanan pada kategori ini.</p>
          <button onClick={() => router.push('/pencarian-pintar')} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition">
            Mulai Cari Mobil
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {initialData.data.map((p: any) => {
            const mobil = p.kendaraan;
            const jumlahHari = hitungJumlahHari(p.tanggal_sewa, p.tanggal_kembali);
            const totalBayar = p.transaksi?.[0]?.total_harga || (mobil.harga_sewa * jumlahHari);
            const statusPembayaranTrx = p.transaksi?.[0]?.status_pembayaran || 'belum_bayar';

            return (
              <div key={p.id_pemesanan} className="bg-white rounded-2xl border border-gray-200 p-5 md:p-6 shadow-sm hover:shadow-md transition space-y-4">
                
                {/* Header Kartu: Foto, Nama, & 3 Badge */}
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                  <div className="w-full md:w-36 h-24 bg-gray-50 rounded-xl flex items-center justify-center shrink-0 border border-gray-100 p-2">
                    {mobil.foto_url ? (
                      <img src={mobil.foto_url} alt={mobil.nama_kendaraan} className="w-full h-full object-contain" />
                    ) : <Car size={32} className="text-gray-300" />}
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{mobil.nama_kendaraan}</h3>
                        <p className="text-xs text-gray-500 font-mono">ID Booking: {p.id_pemesanan.split('-')[0].toUpperCase()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Total Biaya</p>
                        <p className="text-lg font-extrabold text-blue-600">{formatRupiah(totalBayar)}</p>
                      </div>
                    </div>

                    {/* TIGA BADGE: status_pemesanan, status_pembayaran, status_verifikasi */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase border ${statusPemesananColors[p.status_pemesanan]}`}>
                        Pemesanan: {p.status_pemesanan.replace('_', ' ')}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase border ${statusPembayaranColors[statusPembayaranTrx]}`}>
                        Bayar: {statusPembayaranTrx.replace('_', ' ')}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase border ${statusVerifikasiColors[p.status_verifikasi]}`}>
                        Dokumen: {p.status_verifikasi}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Body Kartu: Info Tanggal & Rute */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm pt-2 border-t border-gray-100">
                  <div className="flex items-center text-gray-600">
                    <Calendar size={16} className="mr-2 text-gray-400 shrink-0" />
                    <span>{formatTanggal(p.tanggal_sewa).split(',')[0]} - {formatTanggal(p.tanggal_kembali).split(',')[0]} ({jumlahHari} Hari)</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin size={16} className="mr-2 text-gray-400 shrink-0" />
                    <span>Rute: {p.rute_perjalanan}</span>
                  </div>
                </div>

                {/* Footer Kartu: Tombol Aksi Sesuai Status */}
                <div className="flex flex-wrap justify-end gap-2 pt-2">
                  <button 
                    onClick={() => setModalData({ ...p, totalBayar, jumlahHari })}
                    className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-xl text-sm font-semibold transition flex items-center"
                  >
                    <Info size={16} className="mr-1.5" /> Detail & Linimasa
                  </button>

                  {p.status_pemesanan === 'menunggu_pembayaran' && (
                    <>
                      <button 
                        onClick={() => handleCekStatus(p.id_pemesanan)} disabled={isPaying || isPending}
                        className="px-4 py-2 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 rounded-xl text-sm font-semibold transition flex items-center disabled:opacity-50"
                      >
                        <RefreshCw size={14} className={`mr-1.5 ${isPaying ? 'animate-spin' : ''}`} /> Perbarui Status
                      </button>
                      <button 
                        onClick={() => handleBatal(p.id_pemesanan)} disabled={isPaying || isPending}
                        className="px-4 py-2 bg-white text-red-600 border border-red-200 hover:bg-red-50 rounded-xl text-sm font-semibold transition flex items-center disabled:opacity-50"
                      >
                        <Ban size={14} className="mr-1.5" /> Batalkan
                      </button>
                      <button 
                        onClick={() => handleBayar(p)} disabled={isPaying || isPending}
                        className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition flex items-center shadow-sm disabled:opacity-50"
                      >
                        <CreditCard size={14} className="mr-1.5" /> Bayar Sekarang
                      </button>
                    </>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Navigasi Paginasi */}
      {initialData.totalPages > 1 && (
        <div className="flex justify-center space-x-2 pt-4">
          {Array.from({ length: initialData.totalPages }).map((_, idx) => (
            <button
              key={idx} onClick={() => gantiHalaman(idx + 1)}
              className={`w-10 h-10 rounded-xl font-bold text-sm transition ${pageAktif === idx + 1 ? 'bg-blue-600 text-white shadow-md' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}

      {/* Modal Detail & Linimasa */}
      {modalData && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
            
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center z-10">
              <h2 className="text-xl font-bold text-gray-900">Detail Pemesanan</h2>
              <button onClick={() => setModalData(null)} className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-8">
              {/* Linimasa Status */}
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Linimasa Status</h4>
                {modalData.status_pemesanan === 'dibatalkan' ? (
                  <div className="bg-red-50 p-4 rounded-xl border border-red-100 flex items-start">
                    <Ban className="text-red-500 mr-3 mt-0.5 shrink-0" size={20} />
                    <div>
                      <p className="font-bold text-red-700">Pemesanan Dibatalkan</p>
                      <p className="text-sm text-red-600 mt-0.5">Jadwal kendaraan telah dibebaskan kembali.</p>
                    </div>
                  </div>
                ) : (
                  <div className="relative flex justify-between px-2">
                    <div className="absolute top-4 left-6 right-6 h-1 bg-gray-200 rounded-full z-0"></div>
                    <div className={`absolute top-4 left-6 h-1 rounded-full z-0 transition-all duration-500 ${
                      modalData.status_pemesanan === 'selesai' ? 'w-[88%] bg-blue-600' :
                      modalData.status_pemesanan === 'diambil' ? 'w-[58%] bg-blue-600' :
                      modalData.status_pemesanan === 'dibayar' ? 'w-[28%] bg-blue-600' : 'w-0 bg-blue-600'
                    }`}></div>
                    
                    {['Menunggu', 'Dibayar', 'Diambil', 'Selesai'].map((step, idx) => {
                      const isActive = 
                        (idx === 0) ||
                        (idx === 1 && ['dibayar','diambil','selesai'].includes(modalData.status_pemesanan)) ||
                        (idx === 2 && ['diambil','selesai'].includes(modalData.status_pemesanan)) ||
                        (idx === 3 && modalData.status_pemesanan === 'selesai');
                        
                      return (
                        <div key={step} className="relative z-10 flex flex-col items-center">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center border-4 border-white shadow-sm transition-colors ${isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                            {isActive ? <CheckCircle size={18} /> : <div className="w-2.5 h-2.5 bg-gray-400 rounded-full"></div>}
                          </div>
                          <span className={`text-xs font-bold mt-2 ${isActive ? 'text-blue-700' : 'text-gray-400'}`}>{step}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Rincian Biaya */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Rincian Biaya</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Sewa ({modalData.jumlahHari} Hari @ {formatRupiah(modalData.kendaraan.harga_sewa)})</span>
                    <span className="font-semibold text-gray-900">{formatRupiah(modalData.kendaraan.harga_sewa * modalData.jumlahHari)}</span>
                  </div>
                  {modalData.transaksi?.[0]?.denda > 0 && (
                    <div className="flex justify-between text-red-600">
                      <span>Denda Keterlambatan / Kerusakan</span>
                      <span className="font-semibold">+ {formatRupiah(modalData.transaksi[0].denda)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-extrabold text-gray-900 pt-3 border-t border-gray-200 mt-2">
                    <span>Total Keseluruhan</span>
                    <span className="text-blue-600">{formatRupiah(modalData.totalBayar + (modalData.transaksi?.[0]?.denda || 0))}</span>
                  </div>
                </div>
              </div>

              {/* Detail Dokumen Verifikasi */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Verifikasi Dokumen Identitas</h4>
                <div className="flex flex-wrap gap-4 text-sm">
                  {modalData.ktp_signed_url ? (
                    <a href={modalData.ktp_signed_url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline flex items-center font-medium">
                      Lihat Foto KTP <ExternalLink size={14} className="ml-1" />
                    </a>
                  ) : <span className="text-gray-400 text-xs">Foto KTP tidak tersedia</span>}
                  
                  {modalData.sim_signed_url ? (
                    <a href={modalData.sim_signed_url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline flex items-center font-medium">
                      Lihat Foto SIM <ExternalLink size={14} className="ml-1" />
                    </a>
                  ) : <span className="text-gray-400 text-xs">Foto SIM tidak tersedia</span>}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

### FILE: src\app\(pelanggan)\transaksi\[id_kendaraan]\page.tsx
```tsx
import { notFound } from 'next/navigation';
import { ambilDetailKendaraan } from '@/app/actions/publik-kendaraan';
import { ambilTanggalTerpesan } from '@/app/actions/pelanggan-transaksi';
import TransaksiFormClient from './TransaksiFormClient';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ id_kendaraan: string }>;
};

export default async function TransaksiPage({ params }: Props) {
  const resolvedParams = await params;
  const id_kendaraan = resolvedParams.id_kendaraan;
  
  const mobil = await ambilDetailKendaraan(id_kendaraan);
  if (!mobil || mobil.status !== 'tersedia') return notFound();

  // Ambil daftar tanggal yang sudah dibooking untuk validasi real-time di antarmuka
  const tanggalTerpesan = await ambilTanggalTerpesan(id_kendaraan);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Formulir Pemesanan Kendaraan</h1>
        <p className="text-gray-500 text-sm mt-1">Lengkapi rute perjalanan, tanggal sewa, dan unggah syarat identitas (KTP & SIM).</p>
      </div>
      
      <TransaksiFormClient mobil={mobil} tanggalTerpesan={tanggalTerpesan} />
    </div>
  );
}
```

### FILE: src\app\(pelanggan)\transaksi\[id_kendaraan]\TransaksiFormClient.tsx
```tsx
'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Kendaraan } from '@/types';
import { formatRupiah, hitungJumlahHari, formatTanggal } from '@/lib/formatters';
import { buatPemesanan } from '@/app/actions/pelanggan-transaksi';
import { FileText, Calendar, Map, CheckCircle2, AlertTriangle, UploadCloud, Image as ImageIcon } from 'lucide-react';

type Props = {
  mobil: Kendaraan;
  tanggalTerpesan: { tanggal_sewa: string; tanggal_kembali: string }[];
};

export default function TransaksiFormClient({ mobil, tanggalTerpesan }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const [tglSewa, setTglSewa] = useState('');
  const [tglKembali, setTglKembali] = useState('');
  
  const [ktpPreview, setKtpPreview] = useState<string | null>(null);
  const [simPreview, setSimPreview] = useState<string | null>(null);

  // Ambil tanggal hari ini untuk membatasi input min
  const today = new Date().toISOString().split('T')[0];
  const besok = tglSewa ? new Date(new Date(tglSewa).getTime() + 86400000).toISOString().split('T')[0] : today;

  // Cek jika tanggal yang dipilih bentrok dengan jadwal yang sudah ada
  const cekBentrokTanggal = () => {
    if (!tglSewa || !tglKembali) return false;
    const start = new Date(tglSewa).getTime();
    const end = new Date(tglKembali).getTime();
    
    return tanggalTerpesan.some(t => {
      const bStart = new Date(t.tanggal_sewa).getTime();
      const bEnd = new Date(t.tanggal_kembali).getTime();
      // Rumus overlap: Start A < End B && End A > Start B
      return start < bEnd && end > bStart;
    });
  };

  const isBentrok = cekBentrokTanggal();
  const jumlahHari = (tglSewa && tglKembali && !isBentrok) ? hitungJumlahHari(tglSewa, tglKembali) : 0;
  const estimasiHarga = jumlahHari * mobil.harga_sewa;

  const handleKtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) setKtpPreview(URL.createObjectURL(file));
    else setKtpPreview(null); // Jika PDF, sembunyikan preview gambar
  };

  const handleSimChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) setSimPreview(URL.createObjectURL(file));
    else setSimPreview(null);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isBentrok) {
      setError("Pemesanan gagal. Tanggal yang Anda pilih bertabrakan dengan jadwal penyewaan yang sudah ada.");
      return;
    }
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    formData.append('id_kendaraan', mobil.id_kendaraan);

    startTransition(async () => {
      const res = await buatPemesanan(formData);
      if (res?.error) setError(res.error);
    });
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Sisi Kiri: Form */}
      <div className="lg:col-span-2 space-y-6">
        {error && (
          <div className="bg-red-50 text-red-600 border border-red-200 p-4 rounded-xl text-sm font-medium flex items-start">
            <AlertTriangle size={18} className="mr-2 shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 space-y-8">
          {/* Section 1: Rute & Tanggal */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center border-b pb-2">
              <Calendar className="mr-2 text-blue-600" size={20} /> Jadwal & Rute
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Rute Perjalanan (Contoh: Pekanbaru - Padang)</label>
                <input name="rute_perjalanan" type="text" required placeholder="Tujuan perjalanan Anda..." className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Mulai Sewa</label>
                <input 
                  name="tanggal_sewa" type="date" required min={today}
                  value={tglSewa} onChange={e => setTglSewa(e.target.value)}
                  className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Pengembalian</label>
                <input 
                  name="tanggal_kembali" type="date" required min={besok}
                  value={tglKembali} onChange={e => setTglKembali(e.target.value)}
                  className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-100" 
                  disabled={!tglSewa}
                />
              </div>
            </div>

            {isBentrok && (
              <div className="mt-4 bg-amber-50 text-amber-700 p-3 rounded-lg text-sm border border-amber-200 flex items-center">
                <AlertTriangle size={16} className="mr-2" />
                Tanggal tidak tersedia! Kendaraan telah disewa pada rentang tanggal tersebut.
              </div>
            )}
            {tanggalTerpesan.length > 0 && (
              <div className="mt-4">
                <p className="text-xs font-semibold text-gray-500 mb-2 uppercase">Jadwal yang sudah terpesan (Tidak Tersedia):</p>
                <div className="flex flex-wrap gap-2">
                  {tanggalTerpesan.map((t, i) => (
                    <span key={i} className="bg-gray-100 text-gray-600 text-[11px] px-2 py-1 rounded border">
                      {formatTanggal(t.tanggal_sewa).split(',')[0]} - {formatTanggal(t.tanggal_kembali).split(',')[0]}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Upload Dokumen */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center border-b pb-2">
              <FileText className="mr-2 text-blue-600" size={20} /> Syarat Identitas Pribadi
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* KTP */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Unggah KTP (JPG/PNG/PDF, Max 2MB)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:bg-gray-50 transition relative">
                  <input type="file" name="ktp" required accept=".jpg,.jpeg,.png,.pdf" onChange={handleKtpChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  {!ktpPreview ? (
                    <div className="flex flex-col items-center">
                      <UploadCloud className="text-gray-400 mb-2" size={32} />
                      <span className="text-sm text-gray-500 font-medium">Klik atau seret KTP</span>
                    </div>
                  ) : (
                    <img src={ktpPreview} alt="KTP" className="h-32 mx-auto object-contain rounded" />
                  )}
                </div>
              </div>

              {/* SIM */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Unggah SIM (JPG/PNG/PDF, Max 2MB)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:bg-gray-50 transition relative">
                  <input type="file" name="sim" required accept=".jpg,.jpeg,.png,.pdf" onChange={handleSimChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  {!simPreview ? (
                    <div className="flex flex-col items-center">
                      <UploadCloud className="text-gray-400 mb-2" size={32} />
                      <span className="text-sm text-gray-500 font-medium">Klik atau seret SIM</span>
                    </div>
                  ) : (
                    <img src={simPreview} alt="SIM" className="h-32 mx-auto object-contain rounded" />
                  )}
                </div>
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isPending || isBentrok}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-4 rounded-xl transition shadow-lg shadow-blue-200 disabled:bg-gray-400 disabled:shadow-none"
          >
            {isPending ? 'Memproses Pemesanan...' : 'Ajukan Pemesanan'}
          </button>
        </form>
      </div>

      {/* Sisi Kanan: Ringkasan Kendaraan */}
      <div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden sticky top-24">
          <div className="bg-gray-50 p-6 flex justify-center items-center border-b min-h-[180px]">
            {mobil.foto_url ? (
              <img src={mobil.foto_url} alt={mobil.nama_kendaraan} className="w-full max-w-[200px] h-32 object-contain drop-shadow-md" />
            ) : (
              <div className="text-center text-gray-400">
                <ImageIcon size={48} className="mx-auto mb-2 opacity-40" />
                <span className="text-xs font-medium">Foto Tidak Tersedia</span>
              </div>
            )}
          </div>
          <div className="p-6">
            <div className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block mb-3 uppercase tracking-wide">
              {mobil.jenis_kendaraan}
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">{mobil.nama_kendaraan}</h2>
            <p className="text-gray-500 text-sm mb-6">{mobil.plat_nomor} • {mobil.transmisi}</p>
            
            <div className="space-y-3 text-sm border-t pt-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Harga Sewa Harian</span>
                <span className="font-semibold text-gray-900">{formatRupiah(mobil.harga_sewa)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Durasi Sewa</span>
                <span className="font-semibold text-gray-900">{jumlahHari} Hari</span>
              </div>
              <div className="flex justify-between text-base pt-3 border-t">
                <span className="font-bold text-gray-900">Estimasi Total</span>
                <span className="font-extrabold text-blue-600">{formatRupiah(estimasiHarga)}</span>
              </div>
            </div>

            <div className="mt-6 bg-green-50 text-green-700 p-3 rounded-lg text-xs flex">
              <CheckCircle2 size={16} className="mr-2 shrink-0 mt-0.5" />
              <span>Pembayaran akan dilakukan di tahap selanjutnya (Menunggu Pembayaran).</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### FILE: src\app\(pelanggan)\transaksi\ringkasan\[id_pemesanan]\page.tsx
```tsx
import { notFound } from 'next/navigation';
import { ambilDetailRingkasan } from '@/app/actions/pelanggan-transaksi';
import RingkasanClient from './RingkasanClient';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ id_pemesanan: string }>;
};

export default async function RingkasanBookingPage({ params }: Props) {
  const resolvedParams = await params;
  
  let pesanan;
  try {
    pesanan = await ambilDetailRingkasan(resolvedParams.id_pemesanan);
  } catch (error) {
    // Menangkap error "Akses Ditolak" jika pelanggan mencoba melihat ID pemesanan milik orang lain
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-red-600">Akses Ditolak</h1>
        <p className="text-gray-600 mt-2">Anda tidak memiliki izin untuk melihat pemesanan ini.</p>
        <Link href="/pencarian-pintar" className="inline-block mt-4 text-blue-600 hover:underline">Kembali ke Beranda</Link>
      </div>
    );
  }

  if (!pesanan) return notFound();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center space-x-2">
        <Link href="/pencarian-pintar" className="text-gray-500 hover:text-blue-600">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Ringkasan Pemesanan</h1>
      </div>
      
      <RingkasanClient pesanan={pesanan} />
    </div>
  );
}
```

### FILE: src\app\(pelanggan)\transaksi\ringkasan\[id_pemesanan]\RingkasanClient.tsx
```tsx
'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { formatTanggal, formatRupiah, hitungJumlahHari } from '@/lib/formatters';
import { batalkanPemesanan } from '@/app/actions/pelanggan-transaksi';
import { Car, MapPin, Calendar, FileCheck, ExternalLink, CreditCard, Ban, RefreshCw } from 'lucide-react';

type Props = {
  pesanan: any;
};

export default function RingkasanClient({ pesanan }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isPaying, setIsPaying] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mobil = pesanan.kendaraan;
  const jumlahHari = hitungJumlahHari(pesanan.tanggal_sewa, pesanan.tanggal_kembali);
  const totalHarga = jumlahHari * mobil.harga_sewa;

  const statusColors: Record<string, string> = {
    'menunggu_pembayaran': 'bg-amber-100 text-amber-800',
    'dibayar': 'bg-blue-100 text-blue-800',
    'diambil': 'bg-indigo-100 text-indigo-800',
    'selesai': 'bg-green-100 text-green-800',
    'dibatalkan': 'bg-red-100 text-red-800',
  };

  const verifikasiColors: Record<string, string> = {
    'menunggu': 'text-amber-600',
    'valid': 'text-green-600',
    'ditolak': 'text-red-600',
  };

  async function handleBatal() {
    if (!confirm('Apakah Anda yakin ingin membatalkan pemesanan ini?')) return;
    
    startTransition(async () => {
      const res = await batalkanPemesanan(pesanan.id_pemesanan);
      if (res.error) setError(res.error);
      else router.refresh();
    });
  }

  // Fungsi memanggil API Token & Membuka Pop-up Midtrans
  async function handleBayar() {
    setIsPaying(true);
    setError(null);
    try {
      // 1. Panggil Token
      const res = await fetch('/api/pembayaran/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_pemesanan: pesanan.id_pemesanan }),
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Gagal mendapatkan token pembayaran.');
      
      // 2. Buka Snap Midtrans
      if (typeof (window as any).snap !== 'undefined') {
        (window as any).snap.pay(data.token, {
          onSuccess: function(result: any) {
            alert('Pembayaran berhasil! Terima kasih.');
            router.refresh(); // Muat ulang data server untuk memunculkan status 'dibayar'
          },
          onPending: function(result: any) {
            alert('Menunggu pembayaran Anda diselesaikan.');
            router.refresh();
          },
          onError: function(result: any) {
            alert('Pembayaran gagal. Silakan coba metode lain.');
            router.refresh();
          },
          onClose: function() {
            alert('Anda menutup pop-up sebelum menyelesaikan pembayaran.');
            router.refresh();
          }
        });
      } else {
        throw new Error('Sistem pembayaran (Snap) gagal dimuat. Silakan muat ulang halaman.');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsPaying(false);
    }
  }

  // Fungsi Manual Cek Status ke Core API
  async function handleCekStatus() {
    setIsChecking(true);
    setError(null);
    try {
      const res = await fetch('/api/pembayaran/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_pemesanan: pesanan.id_pemesanan }),
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Gagal mengecek status.');
      
      alert(`Status transaksi Anda saat ini: ${data.status.toUpperCase()}`);
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsChecking(false);
    }
  }

  return (
    <>
      {/* Script Midtrans diload secara dinamis dengan aman */}
      <Script 
        src={process.env.NEXT_PUBLIC_MIDTRANS_SNAP_URL || 'https://app.sandbox.midtrans.com/snap/snap.js'} 
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
      />

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header Struk */}
        <div className="bg-gray-50 border-b border-gray-200 p-6 md:p-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">ID Booking: <span className="font-mono text-gray-900">{pesanan.id_pemesanan.split('-')[0].toUpperCase()}</span></p>
            <div className="flex items-center space-x-3">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${statusColors[pesanan.status_pemesanan]}`}>
                {pesanan.status_pemesanan.replace('_', ' ')}
              </span>
            </div>
          </div>
          <div className="text-left md:text-right">
            <p className="text-sm text-gray-500 mb-1">Total Tagihan</p>
            <h2 className="text-3xl font-extrabold text-blue-600">{formatRupiah(totalHarga)}</h2>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-600 border-b border-red-100 text-sm font-medium">
            {error}
          </div>
        )}

        {/* Konten Utama */}
        <div className="p-6 md:p-8 space-y-8">
          {/* Detail Mobil */}
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
              <Car size={32} className="text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">{mobil.nama_kendaraan}</h3>
              <p className="text-gray-500 text-sm">{mobil.plat_nomor} • {mobil.jenis_kendaraan}</p>
            </div>
          </div>

          {/* Info Pemesanan Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
            <div>
              <div className="flex items-center text-sm font-medium text-gray-500 mb-1">
                <Calendar size={16} className="mr-2" /> Tanggal Sewa
              </div>
              <p className="text-gray-900 font-semibold">{formatTanggal(pesanan.tanggal_sewa).split(',')[0]} - {formatTanggal(pesanan.tanggal_kembali).split(',')[0]}</p>
              <p className="text-xs text-gray-500 mt-1">Durasi: {jumlahHari} Hari</p>
            </div>
            <div>
              <div className="flex items-center text-sm font-medium text-gray-500 mb-1">
                <MapPin size={16} className="mr-2" /> Rute Perjalanan
              </div>
              <p className="text-gray-900 font-semibold">{pesanan.rute_perjalanan}</p>
            </div>
            
            <div className="md:col-span-2 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm font-medium text-gray-500">
                  <FileCheck size={16} className="mr-2" /> Status Verifikasi Dokumen
                </div>
                <span className={`text-sm font-bold uppercase ${verifikasiColors[pesanan.status_verifikasi]}`}>
                  {pesanan.status_verifikasi}
                </span>
              </div>
              <div className="mt-3 flex space-x-4">
                <a href={pesanan.ktp_signed_url} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline flex items-center">
                  Lihat KTP <ExternalLink size={14} className="ml-1" />
                </a>
                <a href={pesanan.sim_signed_url} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline flex items-center">
                  Lihat SIM <ExternalLink size={14} className="ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Aksi Bawah */}
        <div className="bg-gray-50 p-6 border-t border-gray-200 flex flex-col sm:flex-row justify-end gap-3">
          
          <button 
            onClick={handleCekStatus}
            disabled={isChecking}
            className="px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl border border-gray-300 hover:bg-gray-100 transition flex items-center justify-center disabled:opacity-50 sm:mr-auto"
          >
            <RefreshCw size={18} className={`mr-2 ${isChecking ? 'animate-spin' : ''}`} /> 
            {isChecking ? 'Mengecek...' : 'Perbarui Status'}
          </button>

          {pesanan.status_pemesanan === 'menunggu_pembayaran' && (
            <>
              <button 
                onClick={handleBatal}
                disabled={isPending || isPaying}
                className="px-6 py-3 bg-white text-red-600 font-semibold rounded-xl border border-red-200 hover:bg-red-50 transition flex items-center justify-center disabled:opacity-50"
              >
                <Ban size={18} className="mr-2" /> Batalkan Pemesanan
              </button>

              <button 
                onClick={handleBayar}
                disabled={isPaying || isPending}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition shadow-lg shadow-blue-200 flex items-center justify-center disabled:bg-blue-400 disabled:shadow-none"
              >
                <CreditCard size={18} className="mr-2" /> 
                {isPaying ? 'Memuat Midtrans...' : 'Bayar Sekarang'}
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
```

### FILE: src\app\(publik)\login\page.tsx
```tsx
'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { loginAction } from '@/app/actions/auth';
import { NAMA_PERUSAHAAN } from '@/lib/config';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextUrl = searchParams.get('next'); // Menangkap parameter rute asal jika ada

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const respon = await loginAction(null, formData);

    if (respon?.error) {
      setError(respon.error);
      setLoading(false);
    } else if (respon?.success && respon.redirectPath) {
      // Jika ada parameter 'next' di URL (misal diarahkan dari middleware), prioritaskan itu
      // Asalkan rolenya sesuai, atau biarkan router mengarahkannya
      if (nextUrl) {
        router.push(nextUrl);
      } else {
        router.push(respon.redirectPath);
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Selamat Datang</h1>
          <p className="text-gray-500 text-sm mt-2">Masuk ke sistem {NAMA_PERUSAHAAN}</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm mb-6 border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              name="email" 
              type="email" 
              required 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="nama@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input 
                name="password" 
                type={showPassword ? "text" : "password"} 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="••••••••"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition disabled:bg-blue-400"
          >
            {loading ? 'Memproses...' : 'Masuk'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Belum punya akun? <Link href="/register" className="text-blue-600 hover:underline font-medium">Daftar sekarang</Link>
        </p>
      </div>
    </div>
  );
}
```

### FILE: src\app\(publik)\register\page.tsx
```tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { registerAction } from '@/app/actions/auth';
import { NAMA_PERUSAHAAN } from '@/lib/config';

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const respon = await registerAction(null, formData);

    if (respon?.error) {
      setError(respon.error);
      setLoading(false);
    } else if (respon?.success && respon.redirectPath) {
      router.push(respon.redirectPath);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 my-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Daftar Akun</h1>
          <p className="text-gray-500 text-sm mt-2">Bergabung dengan {NAMA_PERUSAHAAN}</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm mb-6 border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
            <input name="nama" type="text" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input name="email" type="email" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nomor HP</label>
            <input name="no_hp" type="tel" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap</label>
            <textarea name="alamat" required rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input name="password" type={showPassword ? "text" : "password"} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5 text-gray-400">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password</label>
            <input name="konfirmasiPassword" type={showPassword ? "text" : "password"} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition disabled:bg-blue-400 mt-2">
            {loading ? 'Memproses...' : 'Daftar Sekarang'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Sudah punya akun? <Link href="/login" className="text-blue-600 hover:underline font-medium">Masuk di sini</Link>
        </p>
      </div>
    </div>
  );
}
```

### FILE: src\app\actions\admin-kendaraan.ts
```ts
'use server';

import { createClient } from '@/lib/supabase/server';
import { wajibRole } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const KendaraanSchema = z.object({
  nama_kendaraan: z.string().min(1, "Nama kendaraan wajib diisi."),
  jenis_kendaraan: z.string().min(1, "Jenis kendaraan wajib diisi."),
  plat_nomor: z.string().min(1, "Plat nomor wajib diisi."),
  kapasitas: z.coerce.number().positive("Kapasitas harus lebih dari 0."),
  bahan_bakar: z.string().min(1, "Bahan bakar wajib diisi."),
  transmisi: z.string().min(1, "Transmisi wajib diisi."),
  rute_peruntukan: z.string().min(1, "Rute peruntukan wajib diisi."),
  tahun_kendaraan: z.coerce.number()
    .min(1990, "Tahun kendaraan minimal 1990.")
    .max(new Date().getFullYear() + 1, "Tahun kendaraan tidak masuk akal."),
  harga_sewa: z.coerce.number().positive("Harga sewa harus lebih dari 0."),
  fitur_tambahan: z.string().optional(),
  status: z.string(),
});

export async function ambilDaftarKendaraan() {
  await wajibRole(['admin', 'super_admin']);
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('kendaraan')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error('Gagal mengambil data kendaraan: ' + error.message);
  return data;
}

export async function tambahKendaraan(formData: FormData) {
  await wajibRole(['admin', 'super_admin']);
  const supabase = await createClient();
  
  const parsed = KendaraanSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const data = parsed.data;

  // Ubah string fitur tambahan menjadi Array agar sesuai dengan tipe data kolom Supabase
  const fiturArray = data.fitur_tambahan 
    ? data.fitur_tambahan.split(',').map(f => f.trim()).filter(Boolean) 
    : [];

  // Upload Foto
  const fotoFile = formData.get('foto') as File | null;
  let foto_url = '';
  
  if (fotoFile && fotoFile.size > 0) {
    if (fotoFile.size > 2 * 1024 * 1024) return { error: "Ukuran foto maksimal 2 MB." };
    const fileExt = fotoFile.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const { error: uploadErr } = await supabase.storage
      .from('foto-kendaraan')
      .upload(fileName, fotoFile);
      
    if (uploadErr) return { error: 'Gagal mengunggah foto: ' + uploadErr.message };
    const { data: publicUrlData } = supabase.storage.from('foto-kendaraan').getPublicUrl(fileName);
    foto_url = publicUrlData.publicUrl;
  }

  const { error: dbErr } = await supabase.from('kendaraan').insert({
    ...data,
    fitur_tambahan: fiturArray,
    foto_url,
  });

  if (dbErr) {
    if (dbErr.code === '23505') return { error: "Plat nomor sudah terdaftar." };
    return { error: dbErr.message };
  }

  revalidatePath('/admin/kendaraan');
  return { success: true };
}

export async function ubahKendaraan(id_kendaraan: string, formData: FormData, oldFotoUrl: string) {
  await wajibRole(['admin', 'super_admin']);
  const supabase = await createClient();
  
  const parsed = KendaraanSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const data = parsed.data;

  const fiturArray = data.fitur_tambahan 
    ? data.fitur_tambahan.split(',').map(f => f.trim()).filter(Boolean) 
    : [];

  let foto_url = oldFotoUrl;
  const fotoFile = formData.get('foto') as File | null;

  if (fotoFile && fotoFile.size > 0) {
    if (fotoFile.size > 2 * 1024 * 1024) return { error: "Ukuran foto maksimal 2 MB." };
    
    if (oldFotoUrl) {
      const oldFileName = oldFotoUrl.split('/').pop();
      if (oldFileName) await supabase.storage.from('foto-kendaraan').remove([oldFileName]);
    }

    const fileExt = fotoFile.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const { error: uploadErr } = await supabase.storage.from('foto-kendaraan').upload(fileName, fotoFile);
    if (uploadErr) return { error: 'Gagal mengunggah foto: ' + uploadErr.message };
    
    const { data: publicUrlData } = supabase.storage.from('foto-kendaraan').getPublicUrl(fileName);
    foto_url = publicUrlData.publicUrl;
  }

  const { error: dbErr } = await supabase.from('kendaraan').update({
    ...data,
    fitur_tambahan: fiturArray,
    foto_url,
  }).eq('id_kendaraan', id_kendaraan);

  if (dbErr) {
    if (dbErr.code === '23505') return { error: "Plat nomor sudah terdaftar." };
    return { error: dbErr.message };
  }

  revalidatePath('/admin/kendaraan');
  return { success: true };
}

export async function ubahStatusKendaraan(id_kendaraan: string, newStatus: string) {
  await wajibRole(['admin', 'super_admin']);
  const supabase = await createClient();
  const { error } = await supabase.from('kendaraan').update({ status: newStatus }).eq('id_kendaraan', id_kendaraan);
  if (error) return { error: error.message };
  revalidatePath('/admin/kendaraan');
  return { success: true };
}

export async function hapusKendaraan(id_kendaraan: string, fotoUrl: string) {
  await wajibRole(['admin', 'super_admin']);
  const supabase = await createClient();
  
  const { error: dbErr } = await supabase.from('kendaraan').delete().eq('id_kendaraan', id_kendaraan);
  
  if (dbErr) {
    if (dbErr.code === '23503') return { error: "Kendaraan tidak bisa dihapus karena memiliki riwayat transaksi/pemesanan aktif." };
    return { error: dbErr.message };
  }

  if (fotoUrl) {
    const fileName = fotoUrl.split('/').pop();
    if (fileName) await supabase.storage.from('foto-kendaraan').remove([fileName]);
  }

  revalidatePath('/admin/kendaraan');
  return { success: true };
}
```

### FILE: src\app\actions\auth.ts
```ts
'use server';

import { createClient } from '../../lib/supabase/server';
import { redirect } from 'next/navigation';
import { loginSchema, registerSchema } from '../../lib/validations';

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const validasi = loginSchema.safeParse({ email, password });
  if (!validasi.success) {
    return { error: validasi.error.issues[0].message };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    let pesanError = error.message;
    if (pesanError.includes('Invalid login credentials')) {
      pesanError = 'Email atau password salah.';
    } else if (pesanError.toLowerCase().includes('banned')) {
      pesanError = 'Akses Ditolak: Akun Anda telah dinonaktifkan oleh Super Admin.';
    }
    return { error: pesanError };
  }

  const { data: userData } = await supabase
    .from('users')
    .select('role')
    .eq('id_user', data.user.id)
    .single();

  const role = userData?.role || 'pelanggan';

  let redirectPath = '/pencarian-pintar';
  if (role === 'super_admin') redirectPath = '/super-admin';
  else if (role === 'admin') redirectPath = '/admin';
  else if (role === 'staf') redirectPath = '/staf';

  return { success: true, redirectPath };
}

export async function registerAction(prevState: any, formData: FormData) {
  const dataForm = Object.fromEntries(formData.entries());

  const validasi = registerSchema.safeParse(dataForm);
  if (!validasi.success) {
    return { error: validasi.error.issues[0].message };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email: validasi.data.email,
    password: validasi.data.password,
    options: {
      data: {
        nama: validasi.data.nama,
        no_hp: validasi.data.no_hp,
        alamat: validasi.data.alamat,
      },
    },
  });

  if (error) {
    let pesanError = error.message;
    if (pesanError.includes('already registered')) {
      pesanError = 'Email sudah terdaftar.';
    }
    return { error: pesanError };
  }

  if (data.user) {
    await supabase.from('users').insert({
      id_user: data.user.id,
      nama: validasi.data.nama,
      email: validasi.data.email,
      role: 'pelanggan',
      no_hp: validasi.data.no_hp,
      alamat: validasi.data.alamat,
    });
  }

  return { success: true, redirectPath: '/pencarian-pintar' };
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/login');
}
```

### FILE: src\app\actions\cbf-action.ts
```ts
'use server';

import { z } from 'zod';
import { ambilRekomendasiCBF, HasilRekomendasi } from '@/lib/cbf/rekomendasi';
import { UserPreferences } from '@/lib/cbf/vektorisasi';

const cbfSchema = z.object({
  jenis_kendaraan: z.string().min(1, 'Kategori kendaraan wajib dipilih.'),
  kapasitas: z.coerce.number().positive('Kapasitas minimal 1 orang.'),
  bahan_bakar: z.string().min(1, 'Bahan bakar wajib dipilih.'),
  transmisi: z.string().min(1, 'Transmisi wajib dipilih.'),
  rute_peruntukan: z.string().min(1, 'Rute peruntukan wajib dipilih.'),
  tahun_kendaraan: z.coerce.number().min(1990, 'Tahun kendaraan minimal 1990.'),
  harga_sewa: z.coerce.number().positive('Harga sewa harus bernilai positif.'),
  fitur_tambahan: z.array(z.string()).optional(),
});

export type CBFState = {
  success: boolean;
  rekomendasi: HasilRekomendasi[];
  error: string | null;
};

export async function prosesPencarianPintar(prevState: CBFState, formData: FormData): Promise<CBFState> {
  const fiturDipilih = formData.getAll('fitur_tambahan') as string[];
  
  const rawData = {
    jenis_kendaraan: formData.get('jenis_kendaraan'),
    kapasitas: formData.get('kapasitas'),
    bahan_bakar: formData.get('bahan_bakar'),
    transmisi: formData.get('transmisi'),
    rute_peruntukan: formData.get('rute_peruntukan'),
    tahun_kendaraan: formData.get('tahun_kendaraan'),
    harga_sewa: formData.get('harga_sewa'),
    fitur_tambahan: fiturDipilih,
  };

  const validasi = cbfSchema.safeParse(rawData);
  if (!validasi.success) {
    return { success: false, rekomendasi: [], error: validasi.error.issues[0].message };
  }

  try {
    const hasil = await ambilRekomendasiCBF(validasi.data as UserPreferences);
    return { success: true, rekomendasi: hasil, error: null };
  } catch (err: any) {
    return { success: false, rekomendasi: [], error: 'Terjadi kesalahan sistem saat menghitung rekomendasi: ' + err.message };
  }
}
```

### FILE: src\app\actions\pelanggan-riwayat.ts
```ts
'use server';

import { createClient } from '@/lib/supabase/server';
import { wajibRole } from '@/lib/auth';

export async function ambilRiwayatPemesanan(page = 1, statusFilter = 'semua') {
  const pengguna = await wajibRole(['pelanggan']);
  const supabase = await createClient();
  
  const perPage = 5;
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;

  let query = supabase
    .from('pemesanan')
    .select(`
      *,
      kendaraan (*),
      transaksi (*)
    `, { count: 'exact' })
    .eq('id_user', pengguna.id_user)
    .order('created_at', { ascending: false });

  if (statusFilter !== 'semua') {
    query = query.eq('status_pemesanan', statusFilter);
  }

  const { data, count, error } = await query.range(from, to);

  if (error) throw new Error(error.message);

  // Generasi Signed URL untuk KTP dan SIM secara aman dari Supabase Storage
  const dataDenganSignedUrl = await Promise.all((data || []).map(async (item) => {
    let ktpUrl = null;
    let simUrl = null;

    if (item.foto_ktp) {
      const { data: ktpData } = await supabase.storage.from('dokumen').createSignedUrl(item.foto_ktp, 3600);
      ktpUrl = ktpData?.signedUrl || null;
    }
    if (item.foto_sim) {
      const { data: simData } = await supabase.storage.from('dokumen').createSignedUrl(item.foto_sim, 3600);
      simUrl = simData?.signedUrl || null;
    }

    return {
      ...item,
      ktp_signed_url: ktpUrl,
      sim_signed_url: simUrl,
    };
  }));

  return { 
    data: dataDenganSignedUrl, 
    totalCount: count || 0, 
    totalPages: Math.ceil((count || 0) / perPage),
    currentPage: page
  };
}
```

### FILE: src\app\actions\pelanggan-transaksi.ts
```ts
'use server';

import { createClient } from '@/lib/supabase/server';
import { wajibRole } from '@/lib/auth';
import { hitungJumlahHari } from '@/lib/formatters';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const PemesananSchema = z.object({
  id_kendaraan: z.string().min(1),
  tanggal_sewa: z.string().min(1, 'Tanggal sewa wajib diisi.'),
  tanggal_kembali: z.string().min(1, 'Tanggal kembali wajib diisi.'),
  rute_perjalanan: z.string().min(3, 'Rute perjalanan terlalu singkat.'),
});

export async function ambilTanggalTerpesan(id_kendaraan: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('pemesanan')
    .select('tanggal_sewa, tanggal_kembali')
    .eq('id_kendaraan', id_kendaraan)
    .not('status_pemesanan', 'in', '("dibatalkan","selesai")');

  if (error) return [];
  return data;
}

export async function buatPemesanan(formData: FormData) {
  const pengguna = await wajibRole(['pelanggan']);
  const supabase = await createClient();

  const dataInput = {
    id_kendaraan: formData.get('id_kendaraan') as string,
    tanggal_sewa: formData.get('tanggal_sewa') as string,
    tanggal_kembali: formData.get('tanggal_kembali') as string,
    rute_perjalanan: formData.get('rute_perjalanan') as string,
  };

  const ktpFile = formData.get('ktp') as File | null;
  const simFile = formData.get('sim') as File | null;

  // 1. Validasi Zod Dasar
  const parsed = PemesananSchema.safeParse(dataInput);
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const data = parsed.data;

  // 2. Validasi Tanggal
  const tglSewa = new Date(data.tanggal_sewa);
  const tglKembali = new Date(data.tanggal_kembali);
  const hariIni = new Date();
  hariIni.setHours(0, 0, 0, 0);

  if (tglSewa < hariIni) return { error: 'Tanggal sewa tidak boleh sebelum hari ini.' };
  if (tglKembali <= tglSewa) return { error: 'Tanggal kembali harus setelah tanggal sewa.' };

  // 3. Validasi & Hitung Harga (Di Server)
  const { data: kendaraan, error: errK } = await supabase
    .from('kendaraan')
    .select('harga_sewa, status')
    .eq('id_kendaraan', data.id_kendaraan)
    .single();

  if (errK || !kendaraan) return { error: 'Kendaraan tidak ditemukan.' };
  if (kendaraan.status !== 'tersedia') return { error: 'Kendaraan sedang tidak tersedia.' };

  const jumlahHari = hitungJumlahHari(data.tanggal_sewa, data.tanggal_kembali);
  const totalHarga = kendaraan.harga_sewa * jumlahHari; // Dihitung, untuk ditampilkan nanti

  // 4. Validasi File (Maksimal 2MB, harus JPG/PNG/PDF)
  if (!ktpFile || ktpFile.size === 0) return { error: 'KTP wajib diunggah.' };
  if (!simFile || simFile.size === 0) return { error: 'SIM wajib diunggah.' };
  if (ktpFile.size > 2 * 1024 * 1024 || simFile.size > 2 * 1024 * 1024) {
    return { error: 'Ukuran maksimal setiap dokumen adalah 2 MB.' };
  }
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  if (!allowedTypes.includes(ktpFile.type) || !allowedTypes.includes(simFile.type)) {
    return { error: 'Format dokumen harus JPG, PNG, atau PDF.' };
  }

  // 5. Upload Dokumen ke Bucket Privat (dokumen-identitas) di dalam folder id_user
  let ktpUrl = '';
  let simUrl = '';
  const folderPath = `${pengguna.id_user}`;
  
  const ktpExt = ktpFile.name.split('.').pop();
  const simExt = simFile.name.split('.').pop();
  const ktpFileName = `${folderPath}/${Date.now()}_ktp.${ktpExt}`;
  const simFileName = `${folderPath}/${Date.now()}_sim.${simExt}`;

  const { error: errKtp } = await supabase.storage.from('dokumen-identitas').upload(ktpFileName, ktpFile);
  if (errKtp) return { error: 'Gagal mengunggah KTP: ' + errKtp.message };
  ktpUrl = ktpFileName; // Menyimpan path, bukan public URL karena bucket privat

  const { error: errSim } = await supabase.storage.from('dokumen-identitas').upload(simFileName, simFile);
  if (errSim) {
    await supabase.storage.from('dokumen-identitas').remove([ktpFileName]); // Rollback KTP
    return { error: 'Gagal mengunggah SIM: ' + errSim.message };
  }
  simUrl = simFileName;

  // 6. Insert ke Database (Menangani error EXCLUDE CONSTRAINT untuk mencegah double-booking)
  const { data: pesananBaru, error: errInsert } = await supabase
    .from('pemesanan')
    .insert({
      id_user: pengguna.id_user,
      id_kendaraan: data.id_kendaraan,
      tanggal_sewa: data.tanggal_sewa,
      tanggal_kembali: data.tanggal_kembali,
      rute_perjalanan: data.rute_perjalanan,
      ktp_url: ktpUrl,
      sim_url: simUrl,
      status_pemesanan: 'menunggu_pembayaran',
      status_verifikasi: 'menunggu',
    })
    .select('id_pemesanan')
    .single();

  if (errInsert) {
    // Rollback dokumen yang terunggah karena database menolak
    await supabase.storage.from('dokumen-identitas').remove([ktpFileName, simFileName]);

    // 23P01 adalah kode PostgreSQL untuk pelanggaran EXCLUDE constraint (Double-Booking)
    if (errInsert.code === '23P01') {
      return { error: 'Gagal: Tanggal tersebut sudah dipesan oleh pelanggan lain. Silakan pilih tanggal yang berbeda.' };
    }
    return { error: 'Terjadi kesalahan sistem: ' + errInsert.message };
  }

  // Jika sukses, arahkan pelanggan ke halaman ringkasan
  redirect(`/transaksi/ringkasan/${pesananBaru.id_pemesanan}`);
}

export async function ambilDetailRingkasan(id_pemesanan: string) {
  const pengguna = await wajibRole(['pelanggan']);
  const supabase = await createClient();

  const { data: pemesanan, error } = await supabase
    .from('pemesanan')
    .select(`
      *,
      kendaraan (*)
    `)
    .eq('id_pemesanan', id_pemesanan)
    .single();

  if (error || !pemesanan) return null;

  // Proteksi: Pelanggan hanya bisa melihat pemesanannya sendiri
  if (pemesanan.id_user !== pengguna.id_user) {
    throw new Error('Akses Ditolak: Anda tidak dapat melihat pemesanan orang lain.');
  }

  // Buat Signed URL (Tautan Bertanda Tangan, kedaluwarsa dalam 60 detik) untuk melihat pratinjau dokumen privat
  const { data: ktpSigned } = await supabase.storage.from('dokumen-identitas').createSignedUrl(pemesanan.ktp_url, 60);
  const { data: simSigned } = await supabase.storage.from('dokumen-identitas').createSignedUrl(pemesanan.sim_url, 60);

  return {
    ...pemesanan,
    ktp_signed_url: ktpSigned?.signedUrl || null,
    sim_signed_url: simSigned?.signedUrl || null,
  };
}

export async function batalkanPemesanan(id_pemesanan: string) {
  const pengguna = await wajibRole(['pelanggan']);
  const supabase = await createClient();

  const { error } = await supabase
    .from('pemesanan')
    .update({ status_pemesanan: 'dibatalkan' })
    .match({ id_pemesanan: id_pemesanan, id_user: pengguna.id_user, status_pemesanan: 'menunggu_pembayaran' });

  if (error) return { error: error.message };
  
  revalidatePath(`/transaksi/ringkasan/${id_pemesanan}`);
  return { success: true };
}
```

### FILE: src\app\actions\publik-kendaraan.ts
```ts
'use server';

import { createClient } from '@/lib/supabase/server';
import { Kendaraan } from '@/types';

// Mengambil kendaraan yang hanya berstatus 'tersedia'
export async function ambilKendaraanTersedia(limit?: number): Promise<Kendaraan[]> {
  const supabase = await createClient();
  let query = supabase
    .from('kendaraan')
    .select('*')
    .eq('status', 'tersedia')
    .order('created_at', { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;
  if (error) throw new Error('Gagal mengambil data kendaraan: ' + error.message);
  
  return data as Kendaraan[];
}

// Mengambil detail satu kendaraan berdasarkan ID
export async function ambilDetailKendaraan(id_kendaraan: string): Promise<Kendaraan | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('kendaraan')
    .select('*')
    .eq('id_kendaraan', id_kendaraan)
    .single();

  if (error) return null;
  return data as Kendaraan;
}
```

### FILE: src\app\actions\super-admin.ts
```ts
'use server';

import { createAdminClient } from '@/lib/supabase/admin';
import { wajibRole } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function ambilDaftarPengguna() {
  await wajibRole(['super_admin']);
  const supabaseAdmin = createAdminClient();

  const { data: publicUsers, error: dbErr } = await supabaseAdmin
    .from('users')
    .select('*')
    .order('created_at', { ascending: false });

  const { data: authData, error: authErr } = await supabaseAdmin.auth.admin.listUsers();

  if (dbErr || authErr) throw new Error('Gagal mengambil data pengguna');

  const authUsers = authData.users;
  return publicUsers.map((pu) => {
    // Cocokkan id dari auth dengan id_user dari tabel public.users
    const au = authUsers.find((a) => a.id === pu.id_user);
    const isBanned = au?.banned_until ? new Date(au.banned_until) > new Date() : false;
    return { ...pu, isBanned };
  });
}

export async function tambahPenggunaAdmin(formData: FormData) {
  await wajibRole(['super_admin']);
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const nama = formData.get('nama') as string;
  const no_hp = formData.get('no_hp') as string;
  const alamat = formData.get('alamat') as string;
  const role = formData.get('role') as string;

  if (role === 'super_admin') {
    return { error: 'Keamanan: Tidak diizinkan membuat Super Admin baru dari form ini.' };
  }

  const supabaseAdmin = createAdminClient();
  const { data: authData, error: authErr } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (authErr) return { error: authErr.message };

  // Gunakan id_user sesuai nama kolom di database
  const { error: dbErr } = await supabaseAdmin.from('users').upsert({
    id_user: authData.user.id,
    email,
    nama,
    role,
    no_hp,
    alamat,
  });

  if (dbErr) return { error: dbErr.message };
  revalidatePath('/super-admin');
  return { success: true };
}

export async function ubahRolePengguna(id_user: string, newRole: string) {
  const adminSaatIni = (await wajibRole(['super_admin'])) as any;
  
  // Cek validasi menggunakan id_user
  if (id_user === adminSaatIni.id_user) {
    return { error: 'Keamanan: Anda tidak bisa mengubah role Anda sendiri.' };
  }
  if (newRole === 'super_admin') {
    return { error: 'Keamanan: Tidak dapat mengangkat akun menjadi Super Admin.' };
  }

  const supabaseAdmin = createAdminClient();
  const { error } = await supabaseAdmin.from('users').update({ role: newRole }).eq('id_user', id_user);
  
  if (error) return { error: error.message };
  revalidatePath('/super-admin');
  return { success: true };
}

export async function toggleStatusPengguna(id_user: string, isCurrentlyBanned: boolean) {
  const adminSaatIni = (await wajibRole(['super_admin'])) as any;
  
  // Cek validasi menggunakan id_user
  if (id_user === adminSaatIni.id_user) {
    return { error: 'Keamanan: Anda tidak bisa menonaktifkan akun Anda sendiri.' };
  }

  const supabaseAdmin = createAdminClient();
  // Di Supabase Auth, UUID selalu menggunakan 'id'
  const { error } = await supabaseAdmin.auth.admin.updateUserById(id_user, {
    ban_duration: isCurrentlyBanned ? 'none' : '876600h',
  });

  if (error) return { error: error.message };
  revalidatePath('/super-admin');
  return { success: true };
}
```

### FILE: src\app\admin\kendaraan\KendaraanClient.tsx
```tsx
'use client';

import { useState, useMemo } from 'react';
import { Search, Plus, Edit, Trash2, Image as ImageIcon, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { tambahKendaraan, ubahKendaraan, hapusKendaraan, ubahStatusKendaraan } from '@/app/actions/admin-kendaraan';

type Kendaraan = {
  id_kendaraan: string;
  foto_url: string;
  nama_kendaraan: string;
  jenis_kendaraan: string;
  plat_nomor: string;
  kapasitas: number;
  bahan_bakar: string;
  transmisi: string;
  rute_peruntukan: string;
  tahun_kendaraan: number;
  harga_sewa: number;
  fitur_tambahan: any;
  status: string;
};

// Opsi Kategori / Jenis Kendaraan
const KATEGORI_OPTIONS = ["Sedan", "SUV", "MPV", "Minibus", "Hatchback", "City Car", "Off-Road"];

// Opsi Transmisi (Sinkron dengan database: Manual & Matic)
const TRANSMISI_OPTIONS = ["Manual", "Matic"];

// Opsi Bahan Bakar (Sinkron dengan database: Bensin, Diesel, Hybrid, Listrik)
const BAHAN_BAKAR_OPTIONS = ["Bensin", "Diesel", "Hybrid"];

// Opsi Rute Peruntukan (Sinkron dengan database: Dalam Kota, Luar Kota, Keduanya)
const RUTE_OPTIONS = ["Dalam Kota", "Luar Kota", "Keduanya"];

// Opsi Fitur Tambahan Lengkap
const FITUR_OPTIONS = [
  "AC", 
  "Multimedia", 
  "Bluetooth", 
  "Kamera Mundur", 
  "Sensor Parkir", 
  "Apple CarPlay", 
  "Android Auto", 
  "Kursi Kulit", 
  "Double Blower", 
  "Sunroof", 
  "Cruise Control"
];

export default function KendaraanClient({ initialData }: { initialData: Kendaraan[] }) {
  const [kendaraanList, setKendaraanList] = useState<Kendaraan[]>(initialData);
  const [search, setSearch] = useState('');
  const [filterJenis, setFilterJenis] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 8;

  const [notif, setNotif] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState<{ isOpen: boolean; type: 'tambah' | 'ubah' | 'hapus' | null; data: Kendaraan | null }>({ 
    isOpen: false, 
    type: null, 
    data: null 
  });
  
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);
  const [selectedFitur, setSelectedFitur] = useState<string[]>([]);
  const [customFitur, setCustomFitur] = useState('');

  const filteredData = useMemo(() => {
    return kendaraanList.filter(k => {
      const matchSearch = k.nama_kendaraan.toLowerCase().includes(search.toLowerCase()) || k.plat_nomor.toLowerCase().includes(search.toLowerCase());
      const matchJenis = filterJenis ? k.jenis_kendaraan === filterJenis : true;
      const matchStatus = filterStatus ? k.status === filterStatus : true;
      return matchSearch && matchJenis && matchStatus;
    });
  }, [kendaraanList, search, filterJenis, filterStatus]);

  const paginatedData = filteredData.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filteredData.length / perPage);

  const showNotif = (type: 'success' | 'error', msg: string) => {
    setNotif({ type, msg });
    setTimeout(() => setNotif(null), 5000);
  };

  const resetForm = () => {
    setModal({ isOpen: false, type: null, data: null });
    setFotoPreview(null);
    setSelectedFitur([]);
    setCustomFitur('');
  };

  const openTambah = () => {
    setFotoPreview(null);
    setSelectedFitur([]);
    setCustomFitur('');
    setModal({ isOpen: true, type: 'tambah', data: null });
  };

  const openUbah = (k: Kendaraan) => {
    setFotoPreview(k.foto_url);
    const fiturArr = Array.isArray(k.fitur_tambahan) 
      ? k.fitur_tambahan 
      : (k.fitur_tambahan ? String(k.fitur_tambahan).split(', ') : []);
    const knownFitur = fiturArr.filter((f: string) => FITUR_OPTIONS.includes(f));
    const unknownFitur = fiturArr.filter((f: string) => !FITUR_OPTIONS.includes(f)).join(', ');
    setSelectedFitur(knownFitur);
    setCustomFitur(unknownFitur);
    setModal({ isOpen: true, type: 'ubah', data: k });
  };

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFotoPreview(URL.createObjectURL(file));
  };

  const toggleFitur = (fitur: string) => {
    setSelectedFitur(prev => prev.includes(fitur) ? prev.filter(f => f !== fitur) : [...prev, fitur]);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    const allFitur = [...selectedFitur];
    if (customFitur.trim()) allFitur.push(...customFitur.split(',').map(f => f.trim()));
    formData.set('fitur_tambahan', allFitur.join(', '));

    let res;
    if (modal.type === 'tambah') {
      res = await tambahKendaraan(formData);
    } else if (modal.type === 'ubah' && modal.data) {
      res = await ubahKendaraan(modal.data.id_kendaraan, formData, modal.data.foto_url);
    }

    if (res?.error) {
      showNotif('error', res.error);
      setLoading(false);
    } else {
      showNotif('success', `Kendaraan berhasil di${modal.type}.`);
      resetForm();
      window.location.reload();
    }
  }

  async function handleHapus() {
    if (!modal.data) return;
    setLoading(true);
    const res = await hapusKendaraan(modal.data.id_kendaraan, modal.data.foto_url);
    if (res.error) {
      showNotif('error', res.error);
      setLoading(false);
    } else {
      showNotif('success', 'Kendaraan berhasil dihapus.');
      resetForm();
      window.location.reload();
    }
  }

  async function handleToggleStatus(k: Kendaraan) {
    const newStatus = k.status === 'tersedia' ? 'disewa' : 'tersedia';
    const res = await ubahStatusKendaraan(k.id_kendaraan, newStatus);
    if (res.error) showNotif('error', res.error);
    else {
      showNotif('success', 'Status ketersediaan diubah.');
      window.location.reload();
    }
  }

  return (
    <div className="space-y-6">
      {notif && (
        <div className={`p-4 rounded-lg text-sm font-medium ${notif.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {notif.msg}
        </div>
      )}

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input 
              type="text" placeholder="Cari kendaraan atau plat..." 
              className="pl-10 pr-4 py-2 border rounded-lg outline-none focus:border-blue-500 w-full md:w-64"
              value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            />
          </div>
          <select className="px-4 py-2 border rounded-lg outline-none bg-white" value={filterJenis} onChange={(e) => { setFilterJenis(e.target.value); setPage(1); }}>
            <option value="">Semua Jenis</option>
            {KATEGORI_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <select className="px-4 py-2 border rounded-lg outline-none bg-white" value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }}>
            <option value="">Semua Status</option>
            <option value="tersedia">Tersedia</option>
            <option value="disewa">Disewa</option>
          </select>
        </div>
        <button onClick={openTambah} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus size={18} className="mr-2" /> Tambah Kendaraan
        </button>
      </div>

      {/* Tabel */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3">Kendaraan</th>
                <th className="px-4 py-3">Spesifikasi</th>
                <th className="px-4 py-3">Rute & Harga</th>
                <th className="px-4 py-3">Fitur Tambahan</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500">Belum ada data kendaraan.</td>
                </tr>
              ) : (
                paginatedData.map(k => (
                  <tr key={k.id_kendaraan} className="hover:bg-gray-50">
                    <td className="px-4 py-3 flex items-center space-x-3">
                      {k.foto_url ? <img src={k.foto_url} alt="Foto" className="w-12 h-12 rounded object-cover border" /> : <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center border"><ImageIcon size={20} className="text-gray-400"/></div>}
                      <div>
                        <div className="font-semibold text-gray-900">{k.nama_kendaraan}</div>
                        <div className="text-gray-500 text-xs">{k.jenis_kendaraan} • {k.plat_nomor}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600 space-y-1">
                      <div>Maks: {k.kapasitas} Org</div>
                      <div>{k.transmisi} • {k.bahan_bakar}</div>
                      <div>Thn: {k.tahun_kendaraan}</div>
                    </td>
                    <td className="px-4 py-3 text-xs">
                      <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded font-medium">{k.rute_peruntukan}</span>
                      <div className="mt-2 font-semibold text-gray-900">Rp {Number(k.harga_sewa || 0).toLocaleString('id-ID')}/hari</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1 max-w-[220px]">
                        {k.fitur_tambahan ? (
                          (Array.isArray(k.fitur_tambahan) 
                            ? k.fitur_tambahan 
                            : String(k.fitur_tambahan).split(', ')
                          ).map((f, i) => f && (
                            <span key={i} className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-[10px] border">
                              {f}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-400 text-xs">-</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => handleToggleStatus(k)} className={`px-2.5 py-1 rounded-full text-xs font-medium border ${k.status === 'tersedia' ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'}`}>
                        {k.status?.toUpperCase() || 'TERSEDIA'}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-right space-x-1">
                      <button onClick={() => openUbah(k)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded" title="Ubah"><Edit size={16} /></button>
                      <button onClick={() => setModal({ isOpen: true, type: 'hapus', data: k })} className="p-1.5 text-red-600 hover:bg-red-50 rounded" title="Hapus"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {totalPages > 1 && (
          <div className="flex justify-between items-center px-4 py-3 border-t bg-gray-50 text-sm">
            <span className="text-gray-500">Halaman {page} dari {totalPages}</span>
            <div className="space-x-2">
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="p-1 border bg-white rounded disabled:opacity-50"><ChevronLeft size={16}/></button>
              <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="p-1 border bg-white rounded disabled:opacity-50"><ChevronRight size={16}/></button>
            </div>
          </div>
        )}
      </div>

      {/* MODAL FORM TAMBAH / UBAH */}
      {modal.isOpen && (modal.type === 'tambah' || modal.type === 'ubah') && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleSubmit} className="p-6">
              <div className="flex justify-between items-center mb-4 border-b pb-3">
                <h3 className="text-xl font-bold">{modal.type === 'tambah' ? 'Tambah Kendaraan Baru' : 'Ubah Data Kendaraan'}</h3>
                <button type="button" onClick={resetForm} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div><label className="block text-sm font-medium mb-1">Nama Kendaraan</label><input name="nama_kendaraan" defaultValue={modal.data?.nama_kendaraan} required className="w-full border p-2 rounded" /></div>
                <div>
                  <label className="block text-sm font-medium mb-1">Jenis Kendaraan</label>
                  <select name="jenis_kendaraan" defaultValue={modal.data?.jenis_kendaraan} required className="w-full border p-2 rounded bg-white">
                    <option value="">Pilih Jenis</option>
                    {KATEGORI_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
                <div><label className="block text-sm font-medium mb-1">Plat Nomor (Unik)</label><input name="plat_nomor" defaultValue={modal.data?.plat_nomor} required className="w-full border p-2 rounded uppercase" /></div>
                <div><label className="block text-sm font-medium mb-1">Harga Sewa / Hari (Rp)</label><input type="number" name="harga_sewa" defaultValue={modal.data?.harga_sewa} required min={1} className="w-full border p-2 rounded" /></div>
                
                <div><label className="block text-sm font-medium mb-1">Tahun Kendaraan</label><input type="number" name="tahun_kendaraan" defaultValue={modal.data?.tahun_kendaraan} required min={1990} max={new Date().getFullYear() + 1} className="w-full border p-2 rounded" /></div>
                <div><label className="block text-sm font-medium mb-1">Kapasitas (Orang)</label><input type="number" name="kapasitas" defaultValue={modal.data?.kapasitas} required min={1} className="w-full border p-2 rounded" /></div>
                
                {/* Transmisi (Sinkron dengan database: Manual, Matic, Otomatis) */}
                <div>
                  <label className="block text-sm font-medium mb-1">Transmisi</label>
                  <select name="transmisi" defaultValue={modal.data?.transmisi} required className="w-full border p-2 rounded bg-white">
                    <option value="">Pilih Transmisi</option>
                    {TRANSMISI_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>

                {/* Bahan Bakar (Sinkron dengan database: Bensin, Diesel, Hybrid, Listrik) */}
                <div>
                  <label className="block text-sm font-medium mb-1">Bahan Bakar</label>
                  <select name="bahan_bakar" defaultValue={modal.data?.bahan_bakar} required className="w-full border p-2 rounded bg-white">
                    <option value="">Pilih Bahan Bakar</option>
                    {BAHAN_BAKAR_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>

                {/* Rute Peruntukan (Sinkron dengan database: Dalam Kota, Luar Kota, Keduanya) */}
                <div>
                  <label className="block text-sm font-medium mb-1">Rute Peruntukan</label>
                  <select name="rute_peruntukan" defaultValue={modal.data?.rute_peruntukan} required className="w-full border p-2 rounded bg-white">
                    <option value="">Pilih Rute</option>
                    {RUTE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Status Ketersediaan</label>
                  <select name="status" defaultValue={modal.data?.status || 'tersedia'} required className="w-full border p-2 rounded bg-white">
                    <option value="tersedia">Tersedia</option><option value="disewa">Disewa</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Fitur Tambahan</label>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {FITUR_OPTIONS.map(fitur => (
                      <label key={fitur} className="flex items-center space-x-2 text-sm">
                        <input type="checkbox" checked={selectedFitur.includes(fitur)} onChange={() => toggleFitur(fitur)} className="rounded text-blue-600" />
                        <span>{fitur}</span>
                      </label>
                    ))}
                  </div>
                  <input type="text" placeholder="Fitur lain tambahan (pisahkan dengan koma)" value={customFitur} onChange={(e) => setCustomFitur(e.target.value)} className="w-full border p-2 rounded text-sm" />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Foto Kendaraan {modal.type === 'tambah' && '(Wajib)'}</label>
                  <input type="file" name="foto" accept="image/png, image/jpeg, image/webp" onChange={handleFotoChange} required={modal.type === 'tambah'} className="w-full border p-2 rounded text-sm" />
                  {fotoPreview && <img src={fotoPreview} alt="Preview" className="mt-3 w-full max-w-[200px] h-32 object-cover rounded-lg border" />}
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 border-t pt-4">
                <button type="button" onClick={resetForm} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Batal</button>
                <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50">
                  {loading ? 'Memproses...' : 'Simpan Data'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL HAPUS */}
      {modal.isOpen && modal.type === 'hapus' && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 text-center">
            <Trash2 size={48} className="mx-auto text-red-500 mb-4" />
            <h3 className="text-lg font-bold">Hapus Kendaraan?</h3>
            <p className="text-sm text-gray-500 mt-2 mb-6">Data <b>{modal.data?.nama_kendaraan}</b> tidak dapat dikembalikan. Pastikan tidak ada transaksi aktif.</p>
            <div className="flex justify-center gap-3">
              <button onClick={resetForm} className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg w-full">Batal</button>
              <button onClick={handleHapus} disabled={loading} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 w-full disabled:opacity-50">
                {loading ? 'Menghapus...' : 'Ya, Hapus'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

### FILE: src\app\admin\kendaraan\page.tsx
```tsx
import { ambilDaftarKendaraan } from '@/app/actions/admin-kendaraan';
import KendaraanClient from './KendaraanClient';

export const dynamic = 'force-dynamic';

export default async function ManajemenKendaraanPage() {
  const kendaraan = await ambilDaftarKendaraan();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manajemen Kendaraan</h1>
        <p className="text-gray-500 text-sm mt-1">Kelola data inventaris kendaraan, spesifikasi preferensi CBF, dan harga sewa harian.</p>
      </div>
      <KendaraanClient initialData={kendaraan} />
    </div>
  );
}
```

### FILE: src\app\admin\layout.tsx
```tsx
import DashboardLayout from '@/components/layout/DashboardLayout';
import { wajibRole } from '@/lib/auth';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Proteksi server ganda
  const pengguna = await wajibRole(['admin']);

  return (
    <DashboardLayout role={pengguna.role} nama={pengguna.nama}>
      {children}
    </DashboardLayout>
  );
}
```

### FILE: src\app\admin\page.tsx
```tsx
export default function DashboardBIPage() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Statistik & BI</h1>
      <p className="text-gray-500">Halaman ini sedang dibangun. Grafik Recharts akan berada di sini.</p>
    </div>
  );
}
```

### FILE: src\app\akses-ditolak\page.tsx
```tsx
import Link from 'next/link';

export default function AksesDitolak() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-red-500 mb-4">403</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Akses Ditolak</h2>
        <p className="text-gray-600 mb-6">
          Anda tidak memiliki hak akses (role) untuk melihat halaman ini.
        </p>
        <Link 
          href="/"
          className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
```

### FILE: src\app\api\auth\logout\route.ts
```ts
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const supabase = await createClient();
  
  // 1. Keluar dari sesi Supabase Auth
  await supabase.auth.signOut();

  // 2. Dialihkan ke halaman login
  const requestUrl = new URL(request.url);
  return NextResponse.redirect(`${requestUrl.origin}/login`, {
    status: 303,
  });
}
```

### FILE: src\app\api\midtrans\webhook\route.ts
```ts
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { prosesStatusPembayaran } from '@/lib/midtrans';

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    // 1. Verifikasi Keamanan Signature Key (Cegah Hacker memalsukan notifikasi Lunas)
    const orderId = payload.order_id || '';
    const statusCode = payload.status_code || '';
    const grossAmount = payload.gross_amount || '';
    const serverKey = process.env.MIDTRANS_SERVER_KEY || '';

    const expectedSignature = crypto
      .createHash('sha512')
      .update(orderId + statusCode + grossAmount + serverKey)
      .digest('hex');

    if (expectedSignature !== payload.signature_key) {
      console.error('Peringatan: Verifikasi Signature Midtrans Gagal!');
      return NextResponse.json({ error: 'Invalid Signature' }, { status: 403 });
    }

    // 2. Eksekusi Perubahan Status
    await prosesStatusPembayaran(
      payload.transaction_status,
      payload.fraud_status,
      orderId,
      payload.payment_type
    );

    // 3. Wajib membalas 200 OK agar Midtrans tidak menembak webhook berulang-ulang (Idempotent)
    return NextResponse.json({ success: true, message: 'Notifikasi Diterima' }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ error: 'Kesalahan Server: ' + error.message }, { status: 500 });
  }
}
```

### FILE: src\app\api\pembayaran\status\route.ts
```ts
import { NextResponse } from 'next/server';
import { createClient, createAdminClient } from '@/lib/supabase/server';
import { coreApi, prosesStatusPembayaran } from '@/lib/midtrans';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const supabaseAdmin = await createAdminClient(); // Tambahkan hak akses admin
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Akses ditolak.' }, { status: 401 });

    const { id_pemesanan } = await request.json();

    // 1. Tarik dari database MENGGUNAKAN ADMIN CLIENT agar transaksi dengan id_user = null bisa terbaca
    const { data: trx } = await supabaseAdmin
      .from('transaksi')
      .select('id_transaksi_midtrans, pemesanan!inner(id_user)')
      .eq('id_pemesanan', id_pemesanan)
      .single();

    const pemesananIdUser = Array.isArray(trx?.pemesanan) 
      ? trx?.pemesanan[0]?.id_user 
      : (trx?.pemesanan as any)?.id_user;

    if (!trx || pemesananIdUser !== user.id) {
      return NextResponse.json({ error: 'Transaksi tidak ditemukan atau akses ditolak.' }, { status: 404 });
    }
    if (!trx.id_transaksi_midtrans) {
      return NextResponse.json({ error: 'Belum ada percobaan pembayaran.' }, { status: 400 });
    }

    // 2. Tarik Status dari Core API Midtrans
    let statusRes;
    try {
      statusRes = await coreApi.transaction.status(trx.id_transaksi_midtrans);
    } catch (apiError: any) {
      if (apiError.httpStatusCode === 404) {
        return NextResponse.json({ success: true, status: 'pending', note: 'Belum ada pembayaran yang masuk.' });
      }
      throw apiError;
    }

    // 3. Simpan perubahan ke database
    await prosesStatusPembayaran(
      statusRes.transaction_status,
      statusRes.fraud_status,
      statusRes.order_id,
      statusRes.payment_type
    );

    return NextResponse.json({ success: true, status: statusRes.transaction_status });

  } catch (error: any) {
    return NextResponse.json({ error: 'Gagal mengecek status: ' + error.message }, { status: 500 });
  }
}
```

### FILE: src\app\api\pembayaran\token\route.ts
```ts
import { NextResponse } from 'next/server';
import { createClient, createAdminClient } from '@/lib/supabase/server';
import { snap } from '@/lib/midtrans';
import { SNAP_EXPIRY_MENIT } from '@/lib/config';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const supabaseAdmin = await createAdminClient(); // Menggunakan hak akses admin untuk bypass RLS
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Akses ditolak. Silakan login kembali.' }, { status: 401 });

    const { id_pemesanan } = await request.json();

    // 1. Ambil & Validasi Pemesanan (Aman dengan RLS biasa)
    const { data: pesanan } = await supabase
      .from('pemesanan')
      .select('*, kendaraan(nama_kendaraan, harga_sewa)')
      .eq('id_pemesanan', id_pemesanan)
      .eq('id_user', user.id)
      .single();

    if (!pesanan) return NextResponse.json({ error: 'Data pemesanan tidak ditemukan.' }, { status: 404 });
    if (pesanan.status_pemesanan !== 'menunggu_pembayaran') {
      return NextResponse.json({ error: 'Pemesanan sudah dibayar atau dibatalkan.' }, { status: 400 });
    }

    // 2. Hitung Total Harga Secara Aman di Server
    const startDate = new Date(pesanan.tanggal_sewa);
    const endDate = new Date(pesanan.tanggal_kembali);
    let diffDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
    if (diffDays < 1) diffDays = 1;
    const totalHarga = diffDays * pesanan.kendaraan.harga_sewa;

    // 3. Buat Order ID Baru
    const orderId = `TRX-${pesanan.id_pemesanan.split('-')[0]}-${Math.floor(Date.now() / 1000)}`;

    // 4. Siapkan/Update Tabel Transaksi MENGGUNAKAN ADMIN CLIENT
    const { data: existingTrx } = await supabaseAdmin.from('transaksi').select('id_transaksi').eq('id_pemesanan', id_pemesanan).single();

    if (existingTrx) {
      await supabaseAdmin.from('transaksi').update({ 
        id_transaksi_midtrans: orderId, 
        total_harga: totalHarga 
      }).eq('id_transaksi', existingTrx.id_transaksi);
    } else {
      await supabaseAdmin.from('transaksi').insert({
        id_user: null, 
        id_kendaraan: pesanan.id_kendaraan,
        id_pemesanan: id_pemesanan,
        tanggal_sewa: pesanan.tanggal_sewa,
        tanggal_kembali: pesanan.tanggal_kembali,
        total_harga: totalHarga,
        metode_pembayaran: 'belum_memilih',
        status_pembayaran: 'pending',
        status: 'berjalan',
        id_transaksi_midtrans: orderId,
        denda: 0
      });
    }

    // 5. Minta Token ke Midtrans
    const { data: userData } = await supabase.from('users').select('nama, email, no_hp').eq('id_user', user.id).single();

    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: totalHarga
      },
      item_details: [{
        id: pesanan.id_kendaraan,
        price: pesanan.kendaraan.harga_sewa,
        quantity: diffDays,
        name: `Sewa ${pesanan.kendaraan.nama_kendaraan.substring(0, 30)}`
      }],
      customer_details: {
        first_name: userData?.nama || 'Pelanggan',
        email: userData?.email || user.email,
        phone: userData?.no_hp || ''
      },
      custom_expiry: {
        expiry_duration: SNAP_EXPIRY_MENIT,
        unit: 'minute'
      }
    };

    const transaction = await snap.createTransaction(parameter);
    return NextResponse.json({ token: transaction.token });
    
  } catch (error: any) {
    return NextResponse.json({ error: 'Gagal memproses pembayaran: ' + error.message }, { status: 500 });
  }
}
```

### FILE: src\app\globals.css
```css
@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: Arial, Helvetica, sans-serif;
}
```

### FILE: src\app\layout.tsx
```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PT Cinta Riau Tour & Travel",
  description: "Sistem Penyewaan Kendaraan & Pencarian Pintar",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
```

### FILE: src\app\page.tsx
```tsx
import Link from 'next/link';
import { NAMA_PERUSAHAAN } from '@/lib/config';
import { ambilKendaraanTersedia } from '@/app/actions/publik-kendaraan';
import { ambilPenggunaSaatIni } from '@/lib/auth';
import CarCard from '@/components/kendaraan/CarCard';
import Footer from '@/components/layout/Footer';
import { Search, ShieldCheck, CreditCard, Key, LayoutDashboard } from 'lucide-react';

export const dynamic = 'force-dynamic'; 

export default async function BerandaUtama() {
  const [mobilUnggulan, pengguna] = await Promise.all([
    ambilKendaraanTersedia(3),
    ambilPenggunaSaatIni()
  ]);

  let linkDashboard = '/pencarian-pintar';
  if (pengguna) {
    if (pengguna.role === 'super_admin') linkDashboard = '/super-admin';
    else if (pengguna.role === 'admin') linkDashboard = '/admin';
    else if (pengguna.role === 'staf') linkDashboard = '/staf';
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-blue-600 text-xl">{NAMA_PERUSAHAAN}</Link>
          <div className="flex items-center space-x-4">
            {pengguna ? (
              <Link href={linkDashboard} className="flex items-center text-sm font-medium bg-blue-50 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100 transition">
                <LayoutDashboard size={16} className="mr-2" />
                Masuk Dashboard
              </Link>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition my-auto">Masuk</Link>
                <Link href="/register" className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Daftar</Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative bg-blue-50 py-20 lg:py-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center lg:text-left flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
                Sewa Mobil Mudah di <span className="text-blue-600">Pekanbaru</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0">
                Temukan kendaraan yang paling cocok untuk perjalanan dinas maupun liburan Anda menggunakan algoritma Pencarian Pintar (CBF) kami.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <Link href="/pencarian-pintar" className="px-8 py-3.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-200">
                  Cari Mobil Sekarang
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 mt-12 lg:mt-0 flex justify-center">
              <div className="w-72 h-72 md:w-96 md:h-96 bg-blue-200 rounded-full blur-3xl opacity-50 absolute"></div>
              <HeroCarCardIllustration fallbackIllustration className="relative z-10" />
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900">Cara Pesan Kendaraan</h2>
              <p className="text-gray-500 mt-4">Proses pemesanan mandiri 100% online tanpa ribet.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-blue-100">
                  <Search size={28} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">1. Pencarian Pintar</h3>
                <p className="text-sm text-gray-500">Masukkan preferensi Anda, sistem akan merekomendasikan mobil terbaik.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-blue-100">
                  <ShieldCheck size={28} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">2. Upload Syarat</h3>
                <p className="text-sm text-gray-500">Pilih tanggal dan unggah foto KTP serta SIM secara online.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-blue-100">
                  <CreditCard size={28} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">3. Bayar Online</h3>
                <p className="text-sm text-gray-500">Selesaikan pembayaran aman menggunakan Midtrans Snap.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-blue-100">
                  <Key size={28} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">4. Ambil Kendaraan</h3>
                <p className="text-sm text-gray-500">Tunjukkan bukti bayar kepada Staf kami dan bawa mobil Anda.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Kendaraan Unggulan</h2>
                <p className="text-gray-500 mt-2">Armada siap pakai untuk kebutuhan perjalanan Anda.</p>
              </div>
              <Link href="/pencarian-pintar" className="hidden sm:inline-block text-blue-600 font-medium hover:underline">
                Lihat Semua Armada &rarr;
              </Link>
            </div>

            {mobilUnggulan.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
                <p className="text-gray-500">Belum ada armada kendaraan yang tersedia saat ini.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mobilUnggulan.map(mobil => (
                  <CarCard key={mobil.id_kendaraan} mobil={mobil} />
                ))}
              </div>
            )}
            
            <div className="mt-8 text-center sm:hidden">
               <Link href="/pencarian-pintar" className="text-blue-600 font-medium hover:underline">
                Lihat Semua Armada &rarr;
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function HeroCarCardIllustration({ fallbackIllustration, className }: { fallbackIllustration?: boolean, className?: string }) {
  if (!fallbackIllustration) return null;
  return (
    <div className={`bg-white p-6 rounded-2xl shadow-xl shadow-blue-900/5 w-80 transform rotate-3 ${className}`}>
      <div className="h-40 bg-gray-100 rounded-xl mb-4 flex items-center justify-center text-gray-300">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>
      </div>
      <div className="h-4 bg-gray-200 rounded-full w-3/4 mb-3"></div>
      <div className="h-4 bg-gray-200 rounded-full w-1/2 mb-6"></div>
      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <div className="h-6 bg-blue-100 rounded-full w-1/3"></div>
        <div className="h-8 bg-blue-600 rounded-lg w-1/3"></div>
      </div>
    </div>
  );
}
```

### FILE: src\app\staf\layout.tsx
```tsx
import DashboardLayout from '@/components/layout/DashboardLayout';
import { wajibRole } from '@/lib/auth';

export default async function StafLayout({ children }: { children: React.ReactNode }) {
  const pengguna = await wajibRole(['staf']);

  return (
    <DashboardLayout role={pengguna.role} nama={pengguna.nama}>
      {children}
    </DashboardLayout>
  );
}
```

### FILE: src\app\staf\page.tsx
```tsx
export default function DaftarBookingPage() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Daftar Booking Aktif Hari Ini</h1>
      <p className="text-gray-500">Menampilkan daftar pelanggan yang akan mengambil atau mengembalikan mobil hari ini.</p>
    </div>
  );
}
```

### FILE: src\app\super-admin\layout.tsx
```tsx
import DashboardLayout from '@/components/layout/DashboardLayout';
import { wajibRole } from '@/lib/auth';

export default async function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  // Proteksi server ganda
  const pengguna = await wajibRole(['super_admin']);

  return (
    <DashboardLayout role={pengguna.role} nama={pengguna.nama}>
      {children}
    </DashboardLayout>
  );
}
```

### FILE: src\app\super-admin\page.tsx
```tsx
import { ambilDaftarPengguna } from '@/app/actions/super-admin';
import UserManagementClient from './UserManagementClient';

export const dynamic = 'force-dynamic';

export default async function ManajemenPenggunaPage() {
  const users = await ambilDaftarPengguna();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manajemen Pengguna Aplikasi</h1>
        <p className="text-gray-500 text-sm mt-1">Kelola hak akses, tambah staf internal, dan pantau status akun pengguna.</p>
      </div>
      
      <UserManagementClient initialUsers={users} />
    </div>
  );
}
```

### FILE: src\app\super-admin\UserManagementClient.tsx
```tsx
'use client';

import { useState, useMemo } from 'react';
import { Search, Plus, Ban, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { tambahPenggunaAdmin, ubahRolePengguna, toggleStatusPengguna } from '@/app/actions/super-admin';

// Ubah tipe id menjadi id_user
type User = {
  id_user: string;
  nama: string;
  email: string;
  role: string;
  no_hp: string;
  isBanned: boolean;
};

export default function UserManagementClient({ initialUsers }: { initialUsers: User[] }) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 10;

  const [notif, setNotif] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState<{ isOpen: boolean; type: 'tambah' | 'role' | 'status'; user: User | null }>({
    isOpen: false,
    type: 'tambah',
    user: null,
  });

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchSearch = u.nama?.toLowerCase().includes(search.toLowerCase()) || u.email?.toLowerCase().includes(search.toLowerCase());
      const matchRole = roleFilter ? u.role === roleFilter : true;
      return matchSearch && matchRole;
    });
  }, [users, search, roleFilter]);

  const paginatedUsers = filteredUsers.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filteredUsers.length / perPage);

  const showNotif = (type: 'success' | 'error', msg: string) => {
    setNotif({ type, msg });
    setTimeout(() => setNotif(null), 5000);
  };

  const closeModal = () => setModal({ isOpen: false, type: 'tambah', user: null });

  async function handleTambah(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const res = await tambahPenggunaAdmin(formData);
    
    if (res.error) {
      showNotif('error', res.error);
    } else {
      showNotif('success', 'Akun berhasil dibuat dan diaktifkan.');
      window.location.reload();
    }
    setLoading(false);
  }

  async function handleUbahRole(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!modal.user) return;
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const newRole = formData.get('role') as string;
    // Menggunakan id_user
    const res = await ubahRolePengguna(modal.user.id_user, newRole);
    
    if (res.error) showNotif('error', res.error);
    else {
      showNotif('success', 'Role berhasil diperbarui.');
      window.location.reload();
    }
    setLoading(false);
  }

  async function handleToggleStatus() {
    if (!modal.user) return;
    setLoading(true);
    // Menggunakan id_user
    const res = await toggleStatusPengguna(modal.user.id_user, modal.user.isBanned);
    
    if (res.error) showNotif('error', res.error);
    else {
      showNotif('success', `Akun berhasil di${modal.user.isBanned ? 'aktifkan' : 'nonaktifkan'}.`);
      window.location.reload();
    }
    setLoading(false);
  }

  const roleColors: Record<string, string> = {
    super_admin: 'bg-purple-100 text-purple-800',
    admin: 'bg-blue-100 text-blue-800',
    staf: 'bg-amber-100 text-amber-800',
    pelanggan: 'bg-green-100 text-green-800',
  };

  return (
    <div className="space-y-6">
      {notif && (
        <div className={`p-4 rounded-lg text-sm font-medium ${notif.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {notif.msg}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari nama atau email..." 
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 w-full sm:w-64"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            />
          </div>
          <select 
            className="px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 bg-white"
            value={roleFilter}
            onChange={(e) => { setRoleFilter(e.target.value); setPage(1); }}
          >
            <option value="">Semua Role</option>
            <option value="admin">Admin</option>
            <option value="staf">Staf</option>
            <option value="pelanggan">Pelanggan</option>
          </select>
        </div>
        <button 
          onClick={() => setModal({ isOpen: true, type: 'tambah', user: null })}
          className="flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
        >
          <Plus size={18} className="mr-2" /> Tambah Akun Internal
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Nama & Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Kontak</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">Tidak ada data pengguna yang ditemukan.</td>
                </tr>
              ) : (
                paginatedUsers.map((u, index) => (
                  <tr key={u.id_user || `fallback-${index}`} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{u.nama || '-'}</div>
                      <div className="text-gray-500">{u.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${roleColors[u.role] || 'bg-gray-100 text-gray-800'}`}>
                        {u.role.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{u.no_hp || '-'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${u.isBanned ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        {u.isBanned ? 'Nonaktif' : 'Aktif'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button 
                        onClick={() => setModal({ isOpen: true, type: 'role', user: u })}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                        title="Ubah Role"
                      >
                        <ShieldCheck size={18} />
                      </button>
                      <button 
                        onClick={() => setModal({ isOpen: true, type: 'status', user: u })}
                        className={`p-1.5 rounded ${u.isBanned ? 'text-green-600 hover:bg-green-50' : 'text-red-600 hover:bg-red-50'}`}
                        title={u.isBanned ? 'Aktifkan Akun' : 'Blokir Akun'}
                      >
                        <Ban size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-3 border-t border-gray-200 bg-gray-50">
            <span className="text-sm text-gray-500">Halaman {page} dari {totalPages}</span>
            <div className="flex space-x-2">
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))} 
                disabled={page === 1}
                className="p-1.5 rounded bg-white border border-gray-300 disabled:opacity-50"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))} 
                disabled={page === totalPages}
                className="p-1.5 rounded bg-white border border-gray-300 disabled:opacity-50"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      {modal.isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            
            {modal.type === 'tambah' && (
              <form onSubmit={handleTambah}>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Tambah Akun Internal</h3>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                    <input name="nama" type="text" required className="w-full px-3 py-2 border rounded-lg outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input name="email" type="email" required className="w-full px-3 py-2 border rounded-lg outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password Sementara</label>
                    <input name="password" type="text" required minLength={6} className="w-full px-3 py-2 border rounded-lg outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">No HP</label>
                    <input name="no_hp" type="tel" required className="w-full px-3 py-2 border rounded-lg outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
                    <textarea name="alamat" rows={2} className="w-full px-3 py-2 border rounded-lg outline-none focus:border-blue-500"></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pilih Role</label>
                    <select name="role" required className="w-full px-3 py-2 border rounded-lg outline-none focus:border-blue-500 bg-white">
                      <option value="admin">Admin (Laporan & Kendaraan)</option>
                      <option value="staf">Staf (Operasional)</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end space-x-3">
                  <button type="button" onClick={closeModal} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Batal</button>
                  <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
                    {loading ? 'Menyimpan...' : 'Simpan Akun'}
                  </button>
                </div>
              </form>
            )}

            {modal.type === 'role' && modal.user && (
              <form onSubmit={handleUbahRole}>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Ubah Hak Akses</h3>
                <p className="text-sm text-gray-500 mb-4">Pengguna: <span className="font-medium text-gray-900">{modal.user.email}</span></p>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role Baru</label>
                  <select name="role" defaultValue={modal.user.role} className="w-full px-3 py-2 border rounded-lg outline-none focus:border-blue-500 bg-white">
                    <option value="admin">Admin</option>
                    <option value="staf">Staf</option>
                    <option value="pelanggan">Pelanggan</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-3">
                  <button type="button" onClick={closeModal} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Batal</button>
                  <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
                    {loading ? 'Memproses...' : 'Ubah Role'}
                  </button>
                </div>
              </form>
            )}

            {modal.type === 'status' && modal.user && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Konfirmasi Status Akun</h3>
                <p className="text-gray-600 text-sm mb-6">
                  Apakah Anda yakin ingin {modal.user.isBanned ? <span className="font-semibold text-green-600">mengaktifkan kembali</span> : <span className="font-semibold text-red-600">menonaktifkan (blokir)</span>} akun <strong>{modal.user.email}</strong>?
                  {!modal.user.isBanned && " Akun yang diblokir tidak akan bisa login ke dalam sistem."}
                </p>
                <div className="flex justify-end space-x-3">
                  <button type="button" onClick={closeModal} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Batal</button>
                  <button onClick={handleToggleStatus} disabled={loading} className={`px-4 py-2 text-white rounded-lg disabled:opacity-50 ${modal.user.isBanned ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}>
                    {loading ? 'Memproses...' : modal.user.isBanned ? 'Ya, Aktifkan' : 'Ya, Nonaktifkan'}
                  </button>
                </div>
              </div>
            )}
            
          </div>
        </div>
      )}
    </div>
  );
}
```

### FILE: src\components\kendaraan\CarCard.tsx
```tsx
import Link from 'next/link';
import { Users, Gauge, Droplet, Image as ImageIcon } from 'lucide-react';
import { Kendaraan } from '@/types';
import { formatRupiah } from '@/lib/formatters';

export default function CarCard({ mobil }: { mobil: Kendaraan }) {
  return (
    <Link href={`/mobil/${mobil.id_kendaraan}`} className="block group">
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100 overflow-hidden flex flex-col h-full">
        {/* Gambar */}
        <div className="relative h-48 w-full bg-gray-100 flex items-center justify-center overflow-hidden">
          {mobil.foto_url ? (
            <img 
              src={mobil.foto_url} 
              alt={mobil.nama_kendaraan} 
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />
          ) : (
            <ImageIcon size={48} className="text-gray-300" />
          )}
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur text-blue-700 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            {mobil.jenis_kendaraan}
          </div>
        </div>

        {/* Informasi Utama */}
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition">{mobil.nama_kendaraan}</h3>
          
          <div className="grid grid-cols-3 gap-2 mt-4 mb-4 text-xs text-gray-600">
            <div className="flex flex-col items-center justify-center p-2 bg-gray-50 rounded-lg">
              <Users size={16} className="mb-1 text-gray-400" />
              <span>{mobil.kapasitas} Org</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 bg-gray-50 rounded-lg">
              <Gauge size={16} className="mb-1 text-gray-400" />
              <span>{mobil.transmisi}</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 bg-gray-50 rounded-lg">
              <Droplet size={16} className="mb-1 text-gray-400" />
              <span>{mobil.bahan_bakar}</span>
            </div>
          </div>

          <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
            <div>
              <span className="text-gray-500 text-xs">Harga Sewa</span>
              <div className="font-bold text-gray-900">{formatRupiah(mobil.harga_sewa)}<span className="text-xs font-normal text-gray-500">/hari</span></div>
            </div>
            <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium group-hover:bg-blue-600 group-hover:text-white transition">
              Detail
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
```

### FILE: src\components\layout\DashboardLayout.tsx
```tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, LogOut, Users, LayoutDashboard, Car, FileText, Activity, CalendarClock, ClipboardCheck, Store, KeyRound, Undo2, Printer } from 'lucide-react';
import { logoutAction } from '@/app/actions/auth';
import { NAMA_PERUSAHAAN } from '@/lib/config';

// Definisi menu berdasarkan Master Brief
const superAdminMenus = [
  { label: 'Manajemen Pengguna Aplikasi', href: '/super-admin', icon: Users },
];

const adminMenus = [
  { label: 'Dashboard Statistik & BI', href: '/admin', icon: LayoutDashboard },
  { label: 'Manajemen Kendaraan', href: '/admin/kendaraan', icon: Car },
  { label: 'Laporan & Analitik (BI)', href: '/admin/laporan', icon: FileText },
  { label: 'Monitoring Transaksi', href: '/admin/transaksi', icon: Activity },
];

const stafMenus = [
  { label: 'Daftar Booking Aktif Hari Ini', href: '/staf', icon: CalendarClock },
  { label: 'Pengecekan Ketersediaan', href: '/staf/ketersediaan', icon: ClipboardCheck },
  { label: 'Transaksi Walk-in', href: '/staf/walk-in', icon: Store },
  { label: 'Proses Serah Terima', href: '/staf/serah-terima/placeholder', icon: KeyRound },
  { label: 'Proses Pengembalian', href: '/staf/pengembalian/placeholder', icon: Undo2 },
  { label: 'Cetak Dokumen', href: '/staf/cetak/placeholder', icon: Printer },
];

export default function DashboardLayout({ 
  children, role, nama 
}: { 
  children: React.ReactNode; role: string; nama: string; 
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Menentukan menu yang aktif berdasarkan role
  let menuItems: any[] = [];
  if (role === 'super_admin') menuItems = superAdminMenus;
  else if (role === 'admin') menuItems = adminMenus;
  else if (role === 'staf') menuItems = stafMenus;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 bg-white w-64 shadow-lg transform transition-transform duration-200 ease-in-out z-30 lg:translate-x-0 lg:static lg:inset-auto flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-center h-16 border-b border-gray-200 px-4">
          <span className="font-bold text-blue-600 text-lg text-center leading-tight">
            {NAMA_PERUSAHAAN}
          </span>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/admin' && item.href !== '/super-admin' && item.href !== '/staf' && pathname.startsWith(item.href));
            return (
              <Link 
                key={item.label} 
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center px-3 py-2.5 rounded-lg transition text-sm font-medium ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <Icon size={18} className={`mr-3 ${isActive ? 'text-blue-700' : 'text-gray-500'}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button 
            onClick={() => logoutAction()}
            className="flex items-center w-full px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition"
          >
            <LogOut size={18} className="mr-3" />
            Keluar
          </button>
        </div>
      </aside>

      {/* Konten Utama */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header Atas */}
        <header className="bg-white h-16 shadow-sm flex items-center justify-between px-4 lg:px-8 border-b border-gray-200">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <Menu size={24} />
          </button>
          <div className="hidden lg:block" /> {/* Spacer */}
          
          <div className="flex items-center space-x-3 text-sm">
            <span className="text-gray-500 bg-gray-100 px-2 py-1 rounded-md capitalize font-medium">
              {role.replace('_', ' ')}
            </span>
            <span className="font-semibold text-gray-900">{nama}</span>
          </div>
        </header>

        {/* Halaman */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
```

### FILE: src\components\layout\Footer.tsx
```tsx
import Link from 'next/link';
import { NAMA_PERUSAHAAN, ALAMAT_PERUSAHAAN } from '@/lib/config';
import { Car, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 text-white font-bold text-xl mb-4">
              <Car className="text-blue-500" />
              <span>{NAMA_PERUSAHAAN}</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Penyedia layanan penyewaan kendaraan terpercaya di Pekanbaru, Riau. 
              Berkomitmen memberikan kenyamanan dan keamanan untuk perjalanan Anda.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Tautan Cepat</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-blue-400 transition">Beranda</Link></li>
              <li><Link href="/pencarian-pintar" className="hover:text-blue-400 transition">Pencarian Pintar & Katalog</Link></li>
              <li><Link href="/login" className="hover:text-blue-400 transition">Masuk Akun</Link></li>
              <li><Link href="/register" className="hover:text-blue-400 transition">Daftar Akun Baru</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Kontak Kami</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-blue-500 shrink-0" />
                <span>{ALAMAT_PERUSAHAAN}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-blue-500 shrink-0" />
                <span>+62 812 3456 7890</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-blue-500 shrink-0" />
                <span>info@cintariautour.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center text-gray-500">
          © {new Date().getFullYear()} {NAMA_PERUSAHAAN}. Hak Cipta Dilindungi.
        </div>
      </div>
    </footer>
  );
}
```

### FILE: src\lib\auth.ts
```ts
import { createClient } from './supabase/server';
import { redirect } from 'next/navigation';
import { User, Role } from '@/types';

export async function ambilPenggunaSaatIni(): Promise<User | null> {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return null;
  }

  // Mengambil profil dan role dari tabel public.users
  const { data: userData, error: dbError } = await supabase
    .from('users')
    .select('*')
    .eq('id_user', user.id)
    .single();

  // Fallback aman jika data profil di database belum lengkap
  if (dbError || !userData) {
    return {
      id_user: user.id,
      nama: user.user_metadata?.nama || user.email?.split('@')[0] || 'Pengguna',
      email: user.email || '',
      role: 'pelanggan',
      no_hp: user.user_metadata?.no_hp || null,
      alamat: user.user_metadata?.alamat || null,
    } as User;
  }

  return userData as User;
}

export async function wajibRole(rolesDiizinkan: Role[]) {
  const pengguna = await ambilPenggunaSaatIni();

  if (!pengguna) {
    redirect('/login');
  }

  if (!rolesDiizinkan.includes(pengguna.role)) {
    redirect('/akses-ditolak');
  }

  return pengguna;
}
```

### FILE: src\lib\cbf\cosine.ts
```ts
export function hitungCosineSimilarity(vektorA: number[], vektorB: number[]): number {
  if (vektorA.length !== vektorB.length || vektorA.length === 0) return 0;

  let dotProduct = 0;
  let normaA_sq = 0;
  let normaB_sq = 0;

  for (let i = 0; i < vektorA.length; i++) {
    dotProduct += vektorA[i] * vektorB[i];
    normaA_sq += vektorA[i] * vektorA[i];
    normaB_sq += vektorB[i] * vektorB[i];
  }

  // Aman terhadap vektor nol (jika salah satu norma bernilai 0)
  if (normaA_sq === 0 || normaB_sq === 0) {
    return 0;
  }

  const similarity = dotProduct / (Math.sqrt(normaA_sq) * Math.sqrt(normaB_sq));
  
  // Bulatkan atau pastikan dalam rentang [0, 1]
  return Math.max(0, Math.min(1, similarity));
}
```

### FILE: src\lib\cbf\rekomendasi.ts
```ts
import { createClient } from '@/lib/supabase/server';
import { Kendaraan } from '@/types';
import { UserPreferences } from './vektorisasi';
import { urutkanRekomendasi } from './urutkan';

export type HasilRekomendasi = {
  kendaraan: Kendaraan;
  skor_similarity: number;
  persentase_kecocokan: number;
};

export async function ambilRekomendasiCBF(pref: UserPreferences): Promise<HasilRekomendasi[]> {
  const supabase = await createClient();

  // Hanya ambil kendaraan dengan status 'tersedia' dari database
  const { data: semuaTersedia, error } = await supabase
    .from('kendaraan')
    .select('*')
    .eq('status', 'tersedia');

  if (error || !semuaTersedia || semuaTersedia.length === 0) {
    return [];
  }

  // Lempar ke fungsi murni matematika (tanpa query database)
  return urutkanRekomendasi(pref, semuaTersedia as Kendaraan[]);
}
```

### FILE: src\lib\cbf\urutkan.ts
```ts
import { Kendaraan } from '@/types';
import { TOP_N_REKOMENDASI } from '@/lib/config';
import { UserPreferences, hitungRentangNormalisasi, ubahKendaraanKeVektor, ubahPreferensiKeVektor } from './vektorisasi';
import { hitungCosineSimilarity } from './cosine';
import { HasilRekomendasi } from './rekomendasi';

export function urutkanRekomendasi(pref: UserPreferences, semuaKendaraan: Kendaraan[]): HasilRekomendasi[] {
  // Pastikan hanya kendaraan berstatus 'tersedia' yang ikut diperhitungkan
  const tersedia = semuaKendaraan.filter(k => k.status === 'tersedia');

  if (tersedia.length === 0) {
    return [];
  }

  const rentang = hitungRentangNormalisasi(tersedia);
  const vektorPreferensi = ubahPreferensiKeVektor(pref, rentang);

  const hasil: HasilRekomendasi[] = tersedia.map((k) => {
    const vektorKendaraan = ubahKendaraanKeVektor(k, rentang);
    const skor = hitungCosineSimilarity(vektorPreferensi, vektorKendaraan);
    
    return {
      kendaraan: k,
      skor_similarity: skor,
      persentase_kecocokan: Number((skor * 100).toFixed(1)),
    };
  });

  // Urutkan dari skor terbesar (paling mirip) ke terkecil
  hasil.sort((a, b) => b.skor_similarity - a.skor_similarity);

  // Ambil Top-N sesuai batasan dari konfigurasi (misal: 5)
  return hasil.slice(0, TOP_N_REKOMENDASI);
}
```

### FILE: src\lib\cbf\vektorisasi.ts
```ts
import { Kendaraan } from '@/types';
import { KATEGORI_OPTIONS, BAHAN_BAKAR_OPTIONS, TRANSMISI_OPTIONS, FITUR_OPTIONS } from '@/lib/config';

export type UserPreferences = {
  jenis_kendaraan: string;
  kapasitas: number;
  bahan_bakar: string;
  transmisi: string;
  rute_peruntukan: string;
  tahun_kendaraan: number;
  harga_sewa: number;
  fitur_tambahan: string[];
};

export function normalisasiMinMax(val: number, min: number, max: number): number {
  if (max === min) return 0;
  const hasil = (val - min) / (max - min);
  return Math.max(0, Math.min(1, hasil));
}

// Hitung min dan max dari seluruh daftar kendaraan untuk normalisasi
export function hitungRentangNormalisasi(semuaKendaraan: Kendaraan[]) {
  if (semuaKendaraan.length === 0) {
    return {
      kapasitas: { min: 1, max: 10 },
      tahun: { min: 2000, max: new Date().getFullYear() },
      harga: { min: 100000, max: 2000000 },
    };
  }

  let minKapasitas = Infinity, maxKapasitas = -Infinity;
  let minTahun = Infinity, maxTahun = -Infinity;
  let minHarga = Infinity, maxHarga = -Infinity;

  for (const k of semuaKendaraan) {
    if (k.kapasitas < minKapasitas) minKapasitas = k.kapasitas;
    if (k.kapasitas > maxKapasitas) maxKapasitas = k.kapasitas;

    if (k.tahun_kendaraan < minTahun) minTahun = k.tahun_kendaraan;
    if (k.tahun_kendaraan > maxTahun) maxTahun = k.tahun_kendaraan;

    if (k.harga_sewa < minHarga) minHarga = k.harga_sewa;
    if (k.harga_sewa > maxHarga) maxHarga = k.harga_sewa;
  }

  return {
    kapasitas: { min: minKapasitas, max: maxKapasitas === minKapasitas ? minKapasitas + 1 : maxKapasitas },
    tahun: { min: minTahun, max: maxTahun === minTahun ? minTahun + 1 : maxTahun },
    harga: { min: minHarga, max: maxHarga === minHarga ? minHarga + 1 : maxHarga },
  };
}

export function ubahKendaraanKeVektor(k: Kendaraan, rentang: ReturnType<typeof hitungRentangNormalisasi>): number[] {
  const vektor: number[] = [];

  // 1. Kategori (One-Hot)
  for (const opt of KATEGORI_OPTIONS) {
    vektor.push(k.jenis_kendaraan === opt ? 1 : 0);
  }

  // 2. Kapasitas (Min-Max)
  vektor.push(normalisasiMinMax(k.kapasitas, rentang.kapasitas.min, rentang.kapasitas.max));

  // 3. Bahan Bakar (One-Hot)
  for (const opt of BAHAN_BAKAR_OPTIONS) {
    vektor.push(k.bahan_bakar === opt ? 1 : 0);
  }

  // 4. Transmisi (One-Hot)
  for (const opt of TRANSMISI_OPTIONS) {
    vektor.push(k.transmisi === opt ? 1 : 0);
  }

  // 5. Rute Peruntukan (2 Dimensi: [dalam_kota, luar_kota])
  if (k.rute_peruntukan === 'dalam_kota') {
    vektor.push(1, 0);
  } else if (k.rute_peruntukan === 'luar_kota') {
    vektor.push(0, 1);
  } else {
    // 'keduanya' menyalakan kedua dimensi
    vektor.push(1, 1);
  }

  // 6. Tahun Kendaraan (Min-Max)
  vektor.push(normalisasiMinMax(k.tahun_kendaraan, rentang.tahun.min, rentang.tahun.max));

  // 7. Harga Sewa (Min-Max)
  vektor.push(normalisasiMinMax(k.harga_sewa, rentang.harga.min, rentang.harga.max));

  // 8. Fitur Tambahan (Multi-Hot terhadap FITUR_OPTIONS)
  const fiturMobil = Array.isArray(k.fitur_tambahan) ? k.fitur_tambahan : [];
  for (const fitur of FITUR_OPTIONS) {
    vektor.push(fiturMobil.includes(fitur) ? 1 : 0);
  }

  return vektor;
}

export function ubahPreferensiKeVektor(pref: UserPreferences, rentang: ReturnType<typeof hitungRentangNormalisasi>): number[] {
  const vektor: number[] = [];

  // 1. Kategori (One-Hot)
  for (const opt of KATEGORI_OPTIONS) {
    vektor.push(pref.jenis_kendaraan === opt ? 1 : 0);
  }

  // 2. Kapasitas (Min-Max)
  vektor.push(normalisasiMinMax(pref.kapasitas, rentang.kapasitas.min, rentang.kapasitas.max));

  // 3. Bahan Bakar (One-Hot)
  for (const opt of BAHAN_BAKAR_OPTIONS) {
    vektor.push(pref.bahan_bakar === opt ? 1 : 0);
  }

  // 4. Transmisi (One-Hot)
  for (const opt of TRANSMISI_OPTIONS) {
    vektor.push(pref.transmisi === opt ? 1 : 0);
  }

  // 5. Rute Peruntukan
  if (pref.rute_peruntukan === 'dalam_kota') {
    vektor.push(1, 0);
  } else if (pref.rute_peruntukan === 'luar_kota') {
    vektor.push(0, 1);
  } else {
    vektor.push(1, 1);
  }

  // 6. Tahun Kendaraan (Min-Max)
  vektor.push(normalisasiMinMax(pref.tahun_kendaraan, rentang.tahun.min, rentang.tahun.max));

  // 7. Harga Sewa
  vektor.push(normalisasiMinMax(pref.harga_sewa, rentang.harga.min, rentang.harga.max));

  // 8. Fitur Tambahan
  const fiturPref = Array.isArray(pref.fitur_tambahan) ? pref.fitur_tambahan : [];
  for (const fitur of FITUR_OPTIONS) {
    vektor.push(fiturPref.includes(fitur) ? 1 : 0);
  }

  return vektor;
}
```

### FILE: src\lib\config.ts
```ts
// Nilai-nilai ini bisa kamu ubah sesuai kebutuhan skripsi nanti
export const NAMA_PERUSAHAAN = "PT Cinta Riau Tour & Travel";
export const ALAMAT_PERUSAHAAN = "Jl. Sudirman No. 123, Pekanbaru, Riau"; // Silakan sesuaikan dengan alamat asli

export const KATEGORI_OPTIONS = ["MPV", "SUV", "Hatchback", "Sedan", "Minibus"] as const;
export const BAHAN_BAKAR_OPTIONS = ["Bensin", "Diesel", "Hybrid", "Listrik"] as const;
export const TRANSMISI_OPTIONS = ["Manual", "Matic"] as const;

export const RUTE_OPTIONS = [
  { value: "dalam_kota", label: "Dalam Kota" },
  { value: "luar_kota", label: "Luar Kota" },
  { value: "keduanya", label: "Dalam & Luar Kota" }
] as const;

export const FITUR_OPTIONS = [
  "Double Blower", 
  "Apple CarPlay", 
  "Android Auto", 
  "Kamera Mundur", 
  "Sensor Parkir", 
  "Sunroof", 
  "Cruise Control", 
  "Kursi Kulit", 
  "Audio Premium"
] as const;

// Batas rekomendasi mobil (Top-N)
export const TOP_N_REKOMENDASI = 5;

// Denda keterlambatan pengembalian (% dari harga sewa harian per hari keterlambatan)
export const DENDA_PERSEN_PER_HARI = 10;

// Batas waktu kadaluarsa pembayaran Midtrans Snap (dalam menit)
export const SNAP_EXPIRY_MENIT = 60;
```

### FILE: src\lib\formatters.ts
```ts
import { format, differenceInDays } from 'date-fns';
import { id } from 'date-fns/locale';

export const formatRupiah = (angka: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(angka);
};

export const formatTanggal = (tanggal: string | Date): string => {
  // Format contoh: 12 Agustus 2026, 14:30 WIB
  const dateObj = typeof tanggal === 'string' ? new Date(tanggal) : tanggal;
  return format(dateObj, 'd MMMM yyyy, HH:mm', { locale: id }) + ' WIB';
};

export const hitungJumlahHari = (start: string | Date, end: string | Date): number => {
  const startDate = typeof start === 'string' ? new Date(start) : start;
  const endDate = typeof end === 'string' ? new Date(end) : end;
  
  // Minimal sewa dihitung 1 hari walaupun dikembalikan di hari yang sama
  const selisih = differenceInDays(endDate, startDate);
  return selisih < 1 ? 1 : selisih;
};
```

### FILE: src\lib\midtrans.ts
```ts
// @ts-ignore
import midtransClient from 'midtrans-client';
import { createAdminClient } from './supabase/server';

export const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY!,
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!,
});

export const coreApi = new midtransClient.CoreApi({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY!,
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!,
});

// Fungsi sentral untuk mengubah status dari Webhook atau Cek Manual
export async function prosesStatusPembayaran(
  transactionStatus: string, 
  fraudStatus: string | null, 
  orderId: string, 
  paymentType: string
) {
  const supabaseAdmin = await createAdminClient(); // Bypass RLS karena dijalankan oleh sistem/webhook

  let statusPembayaranDb = 'pending';
  let statusPemesananDb = 'menunggu_pembayaran';
  let statusTransaksiDb = 'berjalan';

  // Pemetaan Status sesuai aturan Midtrans
  if (transactionStatus === 'capture') {
    if (fraudStatus === 'challenge') {
      statusPembayaranDb = 'pending';
    } else if (fraudStatus === 'accept') {
      statusPembayaranDb = 'settlement';
      statusPemesananDb = 'dibayar';
    }
  } else if (transactionStatus === 'settlement') {
    statusPembayaranDb = 'settlement';
    statusPemesananDb = 'dibayar';
  } else if (transactionStatus === 'cancel' || transactionStatus === 'deny' || transactionStatus === 'expire') {
    statusPembayaranDb = transactionStatus;
    statusPemesananDb = 'dibatalkan';
    statusTransaksiDb = 'dibatalkan'; // Transaksi dihentikan
  } else if (transactionStatus === 'pending') {
    statusPembayaranDb = 'pending';
    statusPemesananDb = 'menunggu_pembayaran';
  }

  // Cari transaksi berdasarkan order_id dari Midtrans
  const { data: trx } = await supabaseAdmin
    .from('transaksi')
    .select('id_transaksi, id_pemesanan, status_pembayaran')
    .eq('id_transaksi_midtrans', orderId)
    .single();

  if (!trx) return;

  // IDEMPOTEN: Jangan membatalkan status yang sudah lunas (settlement) walau ada ping delay
  if (trx.status_pembayaran === 'settlement' && statusPembayaranDb !== 'settlement') return;

  // 1. Update tabel transaksi
  await supabaseAdmin.from('transaksi').update({
    status_pembayaran: statusPembayaranDb,
    status: statusTransaksiDb,
    metode_pembayaran: paymentType || 'belum_memilih'
  }).eq('id_transaksi', trx.id_transaksi);

  // 2. Update tabel pemesanan
  await supabaseAdmin.from('pemesanan').update({
    status_pemesanan: statusPemesananDb
  }).eq('id_pemesanan', trx.id_pemesanan);
}
```

### FILE: src\lib\supabase\admin.ts
```ts
import { createClient } from '@supabase/supabase-js';

export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
```

### FILE: src\lib\supabase\client.ts
```ts
import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

### FILE: src\lib\supabase\server.ts
```ts
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch (error) {
            // Error ini diabaikan jika dipanggil dari Server Component 
            // (karena Server Component tidak bisa mengubah cookie)
          }
        },
      },
    }
  );
}

// KHUSUS SERVER: Client dengan hak akses super (melewati RLS)
// Hanya gunakan ini untuk aksi admin tersembunyi yang benar-benar divalidasi
export async function createAdminClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // Memakai Service Role Key
    {
      cookies: {
        getAll() { return []; },
        setAll() {},
      }
    }
  );
}
```

### FILE: src\lib\validations.ts
```ts
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: "Format email tidak valid." }),
  password: z.string().min(1, { message: "Password wajib diisi." }),
});

export const registerSchema = z.object({
  nama: z.string().min(3, { message: "Nama minimal 3 karakter." }),
  email: z.string().email({ message: "Format email tidak valid." }),
  password: z.string().min(6, { message: "Password minimal 6 karakter." }),
  konfirmasiPassword: z.string(),
  no_hp: z.string().min(10, { message: "Nomor HP minimal 10 angka." }),
  alamat: z.string().min(10, { message: "Alamat terlalu singkat, mohon lengkapi." }),
}).refine((data) => data.password === data.konfirmasiPassword, {
  message: "Konfirmasi password tidak cocok.",
  path: ["konfirmasiPassword"],
});
```

### FILE: src\middleware.ts
```ts
import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Perbarui dan dapatkan sesi Auth
  const { data: { user } } = await supabase.auth.getUser();
  const pathname = request.nextUrl.pathname;

  // Rute terproteksi
  const isProtected = pathname.startsWith('/super-admin') || 
                      pathname.startsWith('/admin') || 
                      pathname.startsWith('/staf') || 
                      pathname.startsWith('/transaksi') || 
                      pathname.startsWith('/riwayat');

  // 1. Jika belum login dan masuk rute terproteksi
  if (!user && isProtected) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    // Simpan rute asli agar bisa dikembalikan setelah login (opsional)
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }

  // 2. Jika sudah login
  if (user) {
    const { data: userData } = await supabase.from('users').select('role').eq('id_user', user.id).single();
    const role = userData?.role || 'pelanggan';

    // 2a. Cegah user login masuk ke halaman login/register lagi
    if (pathname === '/login' || pathname === '/register') {
      const url = request.nextUrl.clone();
      if (role === 'super_admin') url.pathname = '/super-admin';
      else if (role === 'admin') url.pathname = '/admin';
      else if (role === 'staf') url.pathname = '/staf';
      else url.pathname = '/pencarian-pintar';
      return NextResponse.redirect(url);
    }

    // 2b. Blokir akses ke role lain
    if (isProtected) {
      if (pathname.startsWith('/super-admin') && role !== 'super_admin') {
        return NextResponse.redirect(new URL('/akses-ditolak', request.url));
      }
      if (pathname.startsWith('/admin') && role !== 'admin') {
        return NextResponse.redirect(new URL('/akses-ditolak', request.url));
      }
      if (pathname.startsWith('/staf') && role !== 'staf') {
        return NextResponse.redirect(new URL('/akses-ditolak', request.url));
      }
      if ((pathname.startsWith('/transaksi') || pathname.startsWith('/riwayat')) && role !== 'pelanggan') {
        return NextResponse.redirect(new URL('/akses-ditolak', request.url));
      }
    }
  }

  return supabaseResponse;
}

// Menentukan file apa saja yang diawasi middleware (mengabaikan aset statis)
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
```

### FILE: src\types\index.ts
```ts
export type Role = 'super_admin' | 'admin' | 'staf' | 'pelanggan';

export interface User {
  id_user: string; // Terhubung dengan ID di Supabase Auth
  nama: string;
  email: string;
  role: Role;
  no_hp: string | null; // Diperbaiki: bisa null dari database
  alamat: string | null; // Diperbaiki: bisa null dari database
  created_at?: string;
}

export interface Kendaraan {
  id_kendaraan: string;
  nama_kendaraan: string;
  jenis_kendaraan: string;
  plat_nomor: string;
  harga_sewa: number;
  tahun_kendaraan: number;
  bahan_bakar: string;
  transmisi: string;
  rute_peruntukan: 'dalam_kota' | 'luar_kota' | 'keduanya';
  kapasitas: number;
  fitur_tambahan: string[]; // Disimpan sebagai array teks
  foto_url: string | null; // Diperbaiki: bisa null jika belum diupload
  status: 'tersedia' | 'disewa';
  created_at?: string;
}

export interface Pemesanan {
  id_pemesanan: string;
  id_user: string;
  id_kendaraan: string;
  rute_perjalanan: string;
  tanggal_pesan: string; 
  tanggal_sewa: string;
  tanggal_kembali: string;
  ktp_url: string | null; // Diperbaiki: pelanggan upload belakangan
  sim_url: string | null; // Diperbaiki: pelanggan upload belakangan
  status_verifikasi: 'menunggu' | 'valid' | 'ditolak';
  status_pemesanan: 'menunggu_pembayaran' | 'dibayar' | 'diambil' | 'selesai' | 'dibatalkan';
  created_at?: string;
}

export interface Transaksi {
  id_transaksi: string;
  id_user: string | null; // Staf pemroses, null sampai diproses
  id_kendaraan: string;
  id_pemesanan: string;
  tanggal_sewa: string;
  tanggal_kembali: string;
  tanggal_kembali_aktual: string | null; // Null sampai mobil dikembalikan
  total_harga: number;
  metode_pembayaran: string;
  status_pembayaran: 'pending' | 'settlement' | 'expire' | 'cancel' | 'deny';
  id_transaksi_midtrans: string | null;
  status: 'berjalan' | 'selesai' | 'dibatalkan';
  denda: number;
  created_at?: string;
}
```

### FILE: tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts",
    "**/*.mts"
  ],
  "exclude": ["node_modules"]
}
```

### FILE: vite.config.ts
```ts
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```
