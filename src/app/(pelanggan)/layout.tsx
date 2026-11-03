import Link from 'next/link';
import { ambilPenggunaSaatIni } from '@/lib/auth';
import { logoutAction } from '@/app/actions/auth';
import { LogOut, User as UserIcon } from 'lucide-react';
import { NAMA_PERUSAHAAN } from '@/lib/config';

export default async function PelangganLayout({ children }: { children: React.ReactNode }) {
  const pengguna = await ambilPenggunaSaatIni();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link href={pengguna ? "/pencarian-pintar" : "/"} className="font-bold text-blue-600 text-lg">
                {NAMA_PERUSAHAAN}
              </Link>
              <nav className="hidden md:flex space-x-6 text-sm font-medium">
                <Link href={pengguna ? "/pencarian-pintar" : "/"} className="text-gray-600 hover:text-blue-600 transition">Beranda</Link>
                <Link href="/pencarian-pintar" className="text-gray-600 hover:text-blue-600 transition">Pencarian Pintar</Link>
                {pengguna?.role === 'pelanggan' && (
                  <Link href="/riwayat" className="text-gray-600 hover:text-blue-600 transition">Riwayat Pemesanan</Link>
                )}
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              {pengguna ? (
                <div className="flex items-center space-x-4">
                  <div className="hidden md:flex items-center text-sm text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full">
                    <UserIcon size={16} className="mr-2 text-gray-500" />
                    {pengguna.nama}
                  </div>
                  <form action={logoutAction}>
                    <button type="submit" className="text-sm font-medium text-red-600 hover:text-red-700 flex items-center transition">
                      <LogOut size={16} className="mr-1.5" />
                      Keluar
                    </button>
                  </form>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">Masuk</Link>
                  <Link href="/register" className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Daftar</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}