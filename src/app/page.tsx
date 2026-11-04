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