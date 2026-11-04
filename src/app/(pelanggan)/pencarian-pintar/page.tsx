import { ambilKendaraanTersedia } from '@/app/actions/publik-kendaraan';
import CarCard from '@/components/kendaraan/CarCard';
import { Sparkles, Car } from 'lucide-react';

export const revalidate = 30;

export default async function PencarianPintarPage() {
  const semuaMobil = await ambilKendaraanTersedia();

  return (
    <div className="flex flex-col min-h-[calc(100vh-12rem)]">
      {/* 1. KOTAK PLACEHOLDER CBF (Untuk Tahap 7) */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-lg p-6 md:p-10 mb-10 text-white relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center space-x-2 mb-3">
            <Sparkles className="text-yellow-300" size={24} />
            <h1 className="text-2xl md:text-3xl font-bold">Pencarian Pintar Rekomendasi</h1>
          </div>
          <p className="text-blue-100 mb-6">
            Sistem kami akan mencarikan mobil yang paling cocok untuk Anda berdasarkan variabel preferensi menggunakan algoritma Content-Based Filtering.
          </p>
          
          <div className="bg-white/10 border border-white/20 backdrop-blur-sm rounded-xl p-6 text-center border-dashed">
            <p className="text-sm font-medium uppercase tracking-wider text-blue-200">
              [ KOMPONEN FORM CBF AKAN DIISI DI TAHAP 7 ]
            </p>
          </div>
        </div>
        <Car size={200} className="absolute -bottom-10 -right-10 text-white opacity-10" />
      </div>

      {/* 2. DAFTAR SEMUA KATALOG KENDARAAN */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Katalog Semua Kendaraan</h2>
        <p className="text-gray-500 mt-1">Daftar armada yang tersedia saat ini untuk disewa.</p>
      </div>

      <div className="flex-1 mb-16">
        {semuaMobil.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Car className="text-gray-400" size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Tidak ada armada</h3>
            <p className="text-gray-500 text-sm">Mohon maaf, saat ini tidak ada kendaraan yang tersedia.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {semuaMobil.map(mobil => (
              <CarCard key={mobil.id_kendaraan} mobil={mobil} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}