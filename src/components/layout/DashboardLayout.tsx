'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, LogOut, Users, LayoutDashboard, Car, FileText, Activity, CalendarClock, ClipboardCheck, Store, KeyRound, Undo2, Printer } from 'lucide-react';
import { logoutAction } from '@/app/actions/auth';
import { NAMA_PERUSAHAAN } from '@/lib/config';

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
  { label: 'Proses Serah Terima', href: '/staf/serah-terima', icon: KeyRound },
  { label: 'Proses Pengembalian', href: '/staf/pengembalian', icon: Undo2 },
  { label: 'Cetak Dokumen', href: '/staf/cetak', icon: Printer },
];

export default function DashboardLayout({ 
  children, role, nama 
}: { 
  children: React.ReactNode; role: string; nama: string; 
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  let menuItems: any[] = [];
  if (role === 'super_admin') menuItems = superAdminMenus;
  else if (role === 'admin') menuItems = adminMenus;
  else if (role === 'staf') menuItems = stafMenus;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

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

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white h-16 shadow-sm flex items-center justify-between px-4 lg:px-8 border-b border-gray-200">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <Menu size={24} />
          </button>
          <div className="hidden lg:block" />
          
          <div className="flex items-center space-x-3 text-sm">
            <span className="text-gray-500 bg-gray-100 px-2 py-1 rounded-md capitalize font-medium">
              {role.replace('_', ' ')}
            </span>
            <span className="font-semibold text-gray-900">{nama}</span>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}