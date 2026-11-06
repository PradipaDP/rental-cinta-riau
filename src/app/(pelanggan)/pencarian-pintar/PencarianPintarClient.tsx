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