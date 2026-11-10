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