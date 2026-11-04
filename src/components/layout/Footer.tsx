import Link from 'next/link';
import { NAMA_PERUSAHAAN, ALAMAT_PERUSAHAAN } from '@/lib/config';
import { Car, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 text-white font-bold text-xl mb-4">
              <Car className="text-blue-500" />
              <span>{NAMA_PERUSAHAAN}</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Penyedia layanan penyewaan kendaraan terpercaya di Pekanbaru, Riau. 
              Berkomitmen memberikan kenyamanan dan keamanan untuk perjalanan Anda.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Tautan Cepat</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-blue-400 transition">Beranda</Link></li>
              <li><Link href="/pencarian-pintar" className="hover:text-blue-400 transition">Pencarian Pintar & Katalog</Link></li>
              <li><Link href="/login" className="hover:text-blue-400 transition">Masuk Akun</Link></li>
              <li><Link href="/register" className="hover:text-blue-400 transition">Daftar Akun Baru</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Kontak Kami</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-blue-500 shrink-0" />
                <span>{ALAMAT_PERUSAHAAN}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-blue-500 shrink-0" />
                <span>+62 812 3456 7890</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-blue-500 shrink-0" />
                <span>info@cintariautour.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center text-gray-500">
          © {new Date().getFullYear()} {NAMA_PERUSAHAAN}. Hak Cipta Dilindungi.
        </div>
      </div>
    </footer>
  );
}