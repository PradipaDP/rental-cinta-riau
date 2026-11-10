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