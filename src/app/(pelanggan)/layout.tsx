import Link from 'next/link';
import { NAMA_PERUSAHAAN } from '@/lib/config';
import { ambilPenggunaSaatIni } from '@/lib/auth';
import Footer from '@/components/layout/Footer';
import { LogOut } from 'lucide-react';
import { logoutAction } from '@/app/actions/auth';

export const dynamic = 'force-dynamic';

export default async function PelangganLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pengguna = await ambilPenggunaSaatIni();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header Khusus Pelanggan / Dashboard */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-blue-600 text-xl">
            {NAMA_PERUSAHAAN}
          </Link>
          
          <div className="flex items-center space-x-4">
            {pengguna ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-700 hidden sm:inline-block">
                  Halo, {pengguna.nama}
                </span>
                <form action={logoutAction}>
                  <button 
                    type="submit" 
                    className="flex items-center text-sm font-medium bg-red-50 text-red-600 px-3 py-2 rounded-lg hover:bg-red-100 transition"
                  >
                    <LogOut size={16} className="mr-1.5" />
                    Keluar
                  </button>
                </form>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-blue-600 px-3 py-2">
                  Masuk
                </Link>
                <Link href="/register" className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                  Daftar
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Konten Utama */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <Footer />
    </div>
  );
}