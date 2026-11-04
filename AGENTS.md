# AGENTS.md - Context & Instruction Manual for AI Coding Agents

> **File Purpose:** This document serves as the persistent context, architecture reference, and instruction manual for AI coding assistants working on the **Rental Cinta Riau** codebase. Always read and adhere to this file before modifying or extending the application.

---

## 1. Project Context

- **Application Name:** Sistem Informasi Rental Mobil PT Cinta Riau Tour & Travel
- **Domain:** Web-based Car Rental System & Recommendation Engine for an Undergraduate Thesis (Skripsi).
- **Core Purpose:** Automate vehicle booking, provide intelligent car recommendations using Content-Based Filtering (CBF) based on 8 vehicle preference variables, manage fleet inventory, streamline front-desk operations (check-in/check-out/fines), process online payments via Midtrans Snap, and provide business intelligence reporting.
- **Target Users & Roles:**
  1. `super_admin`: Internal system administrator. Manages user accounts (Admin, Staf, Pelanggan), sets roles, and disables/bans accounts.
  2. `admin`: Fleet manager & business analyst. Manages vehicle inventory, updates CBF attributes, tracks rentals, and views BI analytics/financial reports.
  3. `staf`: Front-office operations. Handles daily booking pickups, car handovers, vehicle return inspections, late return penalty calculations, walk-in rentals, and document printing.
  4. `pelanggan`: End-user customers. Searches fleet, uses the 8-variable CBF Smart Search, books cars, uploads identity verification documents (KTP & SIM), pays via Midtrans, and tracks booking history.
- **Current Development Status:** Tahap 1 through 5 completed (Next.js foundation, Supabase database & auth triggers, SSR auth & middleware route protection, Super Admin user management, Admin vehicle fleet management). Tahap 6+ (CBF engine, booking flow, Midtrans integration, staff operations, and BI dashboard) are pending.
- **Key Decisions Made:**
  - Database primary key for user table is `id_user` (UUID matching Supabase `auth.users.id`).
  - Next.js Server Actions are preferred over REST API endpoints for internal mutations, except for the Midtrans webhook callback which requires a Next.js Route Handler (`/api/midtrans/notification`).
  - Passwords and auth sessions are exclusively managed via Supabase Auth.
  - Image uploads for vehicles use Supabase Storage (`foto-kendaraan` bucket).

---

## 2. Technology Stack

- **Framework:** Next.js 16.4.4 (App Router, Turbopack enabled, React 19.3.0)
- **Language:** TypeScript 5.x (`strict: true`)
- **Styling:** Tailwind CSS v4 (`@tailwindcss/turbopack`), Lucide React icons (`lucide-react`)
- **Backend & Database:** Supabase (PostgreSQL 15+, Supabase Auth, Supabase Storage, Row Level Security)
- **Supabase SDKs:**
  - `@supabase/ssr` (v0.12.7) for cookie-based auth in Server Components, Server Actions, and Middleware.
  - `@supabase/supabase-js` (v2.118.0) for service-role administrative operations.
- **Validation:** Zod v4.6.7 for form and action schemas.
- **Date Handling:** `date-fns` v4.4.0 (Indonesian locale `id`).
- **Payment Gateway:** Midtrans Snap (`midtrans-client` v1.4.3).
- **Data Visualization (BI):** `recharts` v3.10.1.
- **Document & Spreadsheet Export:** `jspdf` v4.2.1, `jspdf-autotable` v5.0.9, `xlsx` v0.18.5.
- **Environment Variables (.env.local):**
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `NEXT_PUBLIC_MIDTRANS_CLIENT_KEY`
  - `MIDTRANS_SERVER_KEY`
  - `NEXT_PUBLIC_MIDTRANS_SNAP_URL`
  - `NEXT_PUBLIC_SITE_URL`

---

## 3. Architecture & Structure

### Directory Organization
```
rental-cinta-riau/
├── .env.local                     # Environment secrets (Supabase, Midtrans)
├── CATATAN-STATUS.md              # Progress log of completed development phases
├── src/
│   ├── middleware.ts              # Edge middleware for session & role-based routing
│   ├── types/
│   │   └── index.ts               # Core TypeScript interfaces (User, Kendaraan, Pemesanan, Transaksi)
│   ├── lib/
│   │   ├── auth.ts                # Server-side auth helpers (ambilPenggunaSaatIni, wajibRole)
│   │   ├── config.ts              # Global constants (options, company info, TOP_N_REKOMENDASI, etc.)
│   │   ├── formatters.ts          # formatRupiah, formatTanggal, hitungJumlahHari
│   │   ├── validations.ts         # Zod schemas (login, register)
│   │   ├── supabase/
│   │   │   ├── client.ts          # Browser client (createBrowserClient)
│   │   │   ├── server.ts          # Server client with cookies (createServerClient)
│   │   │   └── admin.ts           # Service-role admin client (createAdminClient)
│   │   ├── cbf/                   # [Pending] Content-Based Filtering algorithm
│   │   ├── midtrans/              # [Pending] Midtrans Snap token & transaction utilities
│   │   └── export/                # [Pending] PDF & Excel report generators
│   ├── components/
│   │   ├── layout/
│   │   │   └── DashboardLayout.tsx # Responsive sidebar for internal roles (super_admin, admin, staf)
│   │   ├── charts/                # [Pending] Recharts dashboard components
│   │   ├── kendaraan/             # [Pending] Reusable vehicle cards / preview components
│   │   └── ui/                    # [Pending] Shared UI components (modals, buttons, badges)
│   └── app/
│       ├── layout.tsx             # Root layout with Geist fonts
│       ├── page.tsx               # Public landing page
│       ├── akses-ditolak/page.tsx # 403 Forbidden page
│       ├── (publik)/              # Public auth routes
│       │   ├── login/page.tsx     # Login form
│       │   └── register/page.tsx  # Customer registration form
│       ├── (pelanggan)/           # Customer portal
│       │   ├── layout.tsx         # Pelanggan header & navigation
│       │   └── pencarian-pintar/page.tsx # CBF recommendation search
│       ├── super-admin/           # Super Admin portal
│       │   ├── layout.tsx         # Super admin layout with wajibRole(['super_admin'])
│       │   ├── page.tsx           # User management server component
│       │   └── UserManagementClient.tsx # User CRUD, role switch, ban toggle
│       ├── admin/                 # Admin portal
│       │   ├── layout.tsx         # Admin layout with wajibRole(['admin'])
│       │   ├── page.tsx           # BI analytics dashboard placeholder
│       │   └── kendaraan/         # Vehicle management
│       │       ├── page.tsx       # Server component fetching fleet
│       │       └── KendaraanClient.tsx # Vehicle CRUD & photo upload
│       ├── staf/                  # Staff portal
│       │   ├── layout.tsx         # Staff layout with wajibRole(['staf'])
│       │   └── page.tsx           # Daily active booking list placeholder
│       ├── actions/               # Next.js Server Actions
│       │   ├── auth.ts            # loginAction, registerAction, logoutAction
│       │   ├── super-admin.ts     # User management server actions
│       │   └── admin-kendaraan.ts # Vehicle fleet server actions
│       └── api/                   # [Pending] API routes (Midtrans webhook notification)
```

### Component & Routing Architecture
- **Server Components by Default:** Page entries (`page.tsx`) are Server Components responsible for verifying role permissions (`wajibRole`), querying initial data from Supabase, and passing typed data into Client Components.
- **Client Components for Interactivity:** Interactive tables, forms, modals, and filters are marked with `'use client'` (e.g., `UserManagementClient.tsx`, `KendaraanClient.tsx`).
- **Data Mutations via Server Actions:** Form submissions invoke Server Actions defined in `src/app/actions/`. Mutations revalidate cache using `revalidatePath()`.

---

## 4. Development Guidelines

### Coding Conventions & Patterns
1. **Language & Types:** Write clean TypeScript. Avoid using `any` (violates ESLint rule `@typescript-eslint/no-explicit-any`). Always use or extend types defined in `@/types`.
2. **Naming Conventions:**
   - Database columns & schema fields: Indonesian `snake_case` (e.g., `id_user`, `id_kendaraan`, `nama_kendaraan`, `harga_sewa`, `rute_peruntukan`).
   - TypeScript variables & functions: camelCase (e.g., `ambilDaftarKendaraan`, `tambahPenggunaAdmin`).
   - React Components: PascalCase (e.g., `UserManagementClient`, `DashboardLayout`).
   - Route segments: kebab-case in Indonesian (e.g., `pencarian-pintar`, `akses-ditolak`).
3. **Data Mutation & Refresh Pattern:**
   - In Server Actions, validate inputs using Zod, execute the database operation, and call `revalidatePath()`.
   - In Client Components, do **NOT** use `window.location.reload()`. Instead, use `router.refresh()` from `next/navigation` combined with local state updates or toast notifications.
4. **Image Handling:**
   - Always use `next/image` (`<Image />`) rather than plain `<img>` tags for optimal performance and to satisfy Next.js linting rules. Ensure Supabase storage hostname is configured in `next.config.ts`.
5. **Styling & Theme:**
   - Maintain the established corporate blue palette (`bg-blue-600`, `text-blue-700`, `border-gray-200`, `bg-gray-50`).
   - Do not break light-mode styling. Note that `src/app/globals.css` includes a dark mode media query; ensure backgrounds and text have consistent explicit contrast.

---

## 5. Database Guidelines

### Schema & Table Structure
The database consists of 4 main tables in the `public` schema of Supabase PostgreSQL:

1. **`users`**:
   - `id_user` (UUID, PK, references `auth.users.id` ON DELETE CASCADE)
   - `nama` (TEXT), `email` (TEXT), `role` (`super_admin` | `admin` | `staf` | `pelanggan`)
   - `no_hp` (TEXT, nullable), `alamat` (TEXT, nullable), `created_at` (TIMESTAMPTZ)
2. **`kendaraan`**:
   - `id_kendaraan` (UUID, PK, default `gen_random_uuid()`)
   - `nama_kendaraan` (TEXT), `jenis_kendaraan` (TEXT), `plat_nomor` (TEXT, UNIQUE)
   - `harga_sewa` (NUMERIC), `tahun_kendaraan` (INT), `bahan_bakar` (TEXT), `transmisi` (TEXT)
   - `rute_peruntukan` (TEXT), `kapasitas` (INT), `fitur_tambahan` (TEXT[]), `foto_url` (TEXT, nullable)
   - `status` (`tersedia` | `disewa`), `created_at` (TIMESTAMPTZ)
3. **`pemesanan`**:
   - `id_pemesanan` (UUID, PK), `id_user` (UUID, FK -> `users.id_user`), `id_kendaraan` (UUID, FK -> `kendaraan.id_kendaraan`)
   - `rute_perjalanan` (TEXT), `tanggal_pesan` (TIMESTAMPTZ), `tanggal_sewa` (DATE/TIMESTAMPTZ), `tanggal_kembali` (DATE/TIMESTAMPTZ)
   - `ktp_url` (TEXT, nullable), `sim_url` (TEXT, nullable)
   - `status_verifikasi` (`menunggu` | `valid` | `ditolak`)
   - `status_pemesanan` (`menunggu_pembayaran` | `dibayar` | `diambil` | `selesai` | `dibatalkan`)
   - `created_at` (TIMESTAMPTZ)
4. **`transaksi`**:
   - `id_transaksi` (UUID, PK), `id_user` (UUID, FK -> `users.id_user`, staff processing, nullable)
   - `id_kendaraan` (UUID, FK), `id_pemesanan` (UUID, FK)
   - `tanggal_sewa` (TIMESTAMPTZ), `tanggal_kembali` (TIMESTAMPTZ), `tanggal_kembali_aktual` (TIMESTAMPTZ, nullable)
   - `total_harga` (NUMERIC), `metode_pembayaran` (TEXT)
   - `status_pembayaran` (`pending` | `settlement` | `expire` | `cancel` | `deny`)
   - `id_transaksi_midtrans` (TEXT, nullable), `status` (`berjalan` | `selesai` | `dibatalkan`), `denda` (NUMERIC, default 0)
   - `created_at` (TIMESTAMPTZ)

### Database Rules & Constraints
- **Primary Key Alignment:** Always query `users` by `id_user`, never `id`.
- **Unique License Plates:** `plat_nomor` is strictly unique. PostgreSQL error `23505` must be caught and presented as a user-friendly error message.
- **Foreign Key Protection:** Deleting a vehicle with existing bookings/transactions triggers error `23503`. Always check references or handle this gracefully.
- **Double-Booking Prevention:** A vehicle must not be booked for overlapping date ranges. Verify availability via database queries before confirming reservations.
- **Storage Buckets:**
  - `foto-kendaraan`: Public bucket for car gallery photos. File size limit: 2 MB.
  - Document uploads (KTP & SIM): Must use a secure, private bucket with RLS or signed URLs.

---

## 6. Important Rules for AI Agents

1. **Inspect Before Modifying:** Always read relevant files before making edits. Verify column names, types, and existing patterns.
2. **Preserve Existing Implementations:** Do not rewrite or replace working modules unless explicitly instructed.
3. **Reuse Existing Patterns:** Follow existing conventions from `super-admin.ts` and `admin-kendaraan.ts` (Zod validation, `wajibRole` security check, `revalidatePath`).
4. **Zero Unjustified Dependencies:** Do not install additional npm packages without explicit rationale and user agreement. The current dependencies (`date-fns`, `recharts`, `jspdf`, `jspdf-autotable`, `xlsx`, `midtrans-client`, `zod`, `lucide-react`) are sufficient for all planned features.
5. **Clean Type Checking:** Ensure all code passes `npm run lint` and `tsc --noEmit`. No untyped `any` or dangling unused variables.
6. **No Fake / Mock Logic in Production:** When implementing features, connect directly to Supabase and real server actions. Clearly flag any temporary placeholders.
7. **Security First:** Never bypass RLS or expose `SUPABASE_SERVICE_ROLE_KEY` to client-side code. Use `createAdminClient()` only inside protected Server Actions.

---

## 7. Current Progress & Remaining Work

### Completed Features (Tahap 1 - 5)
- [x] Project infrastructure: Next.js 16 + Tailwind CSS v4 + TypeScript.
- [x] Supabase integration: Database schema, triggers, RLS, auth helpers, storage bucket `foto-kendaraan`.
- [x] Authentication & Route Protection: Login, register, logout, and middleware-based role guards.
- [x] Super Admin: User management dashboard (`/super-admin`) with search, filter, role editing, internal user creation, and ban/unban toggling.
- [x] Admin: Vehicle fleet management (`/admin/kendaraan`) with 8-variable form, photo upload, validation, search, filter, edit, and deletion.

### Known Inconsistencies & Bugs to Fix
- [ ] **Role Access Mismatch in Middleware:** `middleware.ts` (line 70) and `src/app/admin/layout.tsx` restrict `/admin/*` strictly to `role === 'admin'`. However, `admin-kendaraan.ts` allows both `['admin', 'super_admin']`. Clarify and align Super Admin access permissions.
- [ ] **Enum / Config Inconsistency:** `rute_peruntukan` is typed as `'dalam_kota' | 'luar_kota' | 'keduanya'` in `types/index.ts`, but the form in `KendaraanClient.tsx` submits `"Dalam Kota"`, `"Luar Kota"`, `"Keduanya"`. Align types, configs (`lib/config.ts`), and form options.
- [ ] **Client Reload Anti-Pattern:** Replace `window.location.reload()` in `UserManagementClient.tsx` and `KendaraanClient.tsx` with `router.refresh()` to preserve notification toasts.
- [ ] **ESLint Warnings & Any Types:** 6 explicit `any` usages need proper typing in `auth.ts`, `super-admin.ts`, `KendaraanClient.tsx`, and `DashboardLayout.tsx`.

### Outstanding Phases & Priorities
1. **Priority 1 (CBF Recommendation Engine & Smart Search):**
   - Implement CBF algorithm in `src/lib/cbf/` using the 8 vehicle preference variables (category, price, year, fuel, transmission, route, capacity, features).
   - Build customer UI on `/pencarian-pintar` with input preference form and Top-N recommendation results.
2. **Priority 2 (Customer Booking & Midtrans Payment):**
   - Implement date picker with real-time double-booking availability checks.
   - Implement KTP and SIM document upload to Supabase Storage.
   - Implement Midtrans Snap payment checkout and webhook handler route (`/api/midtrans/notification`).
   - Build customer booking history page (`/riwayat`).
3. **Priority 3 (Staff Front-Desk Operations):**
   - Build `/staf`: today's bookings dashboard, car handover (check-in), car return (check-out) with late penalty calculation (`DENDA_PERSEN_PER_HARI`), and walk-in order creation.
   - Build document generation (`/staf/cetak`) using `jspdf` and `jspdf-autotable`.
4. **Priority 4 (Admin Business Intelligence & Reporting):**
   - Build `/admin`: dashboard metrics with Recharts graphs (revenue, fleet utilization, popular models).
   - Build `/admin/laporan`: financial & operational reports with Excel (`xlsx`) and PDF (`jspdf`) export.

---

## 8. Instructions for Maintaining AGENTS.md

- **Keep Up-to-Date:** Update this file whenever new routes, database tables, schemas, or architectural conventions are added or modified.
- **Never Overwrite Blindly:** Review existing instructions and append/refine rather than wiping context.
- **Keep Actionable:** Maintain concise, concrete code examples, table names, and paths.
- **No Secrets:** NEVER commit API keys, service role secrets, or passwords into this file.

