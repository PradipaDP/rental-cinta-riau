import Link from 'next/link';
import { NAMA_PERUSAHAAN } from '@/lib/config';

export default function BerandaUtama() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-2xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
          Sistem Informasi Rental Mobil<br />
          <span className="text-blue-600">{NAMA_PERUSAHAAN}</span>
        </h1>
        <p className="text-lg text-gray-600">
          Platform penyewaan kendaraan dengan rekomendasi cerdas dan pemesanan mandiri.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Link 
            href="/login"
            className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition shadow-sm"
          >
            Masuk
          </Link>
          <Link 
            href="/register"
            className="w-full sm:w-auto px-8 py-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition shadow-sm"
          >
            Daftar Akun
          </Link>
        </div>
      </div>
    </div>
  );
}