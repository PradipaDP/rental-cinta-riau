import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ambilDetailKendaraan } from '@/app/actions/publik-kendaraan';
import { ambilPenggunaSaatIni } from '@/lib/auth';
import { formatRupiah } from '@/lib/formatters';
import { NAMA_PERUSAHAAN } from '@/lib/config';
import Footer from '@/components/layout/Footer';
import { 
  Image as ImageIcon, CheckCircle2, XCircle, ArrowLeft, 
  Car, Users, Fuel, Gauge, Map, Calendar, Settings, ShieldCheck 
} from 'lucide-react';

// Fungsi penyamar Plat Nomor
function samarkanPlat(plat: string) {
  const parts = plat.trim().split(' ');
  // Jika format BM 1234 AB -> BM 1234 **
  if (parts.length === 3) {
    return `${parts[0]} ${parts[1]} **`;
  }
  // Fallback sederhana jika format berbeda
  return plat.slice(0, -2) + '**';
}

function formatRute(rute: string) {
  if (rute === 'dalam_kota') return 'Dalam Kota';
  if (rute === 'luar_kota') return 'Luar Kota';
  if (rute === 'keduanya') return 'Dalam & Luar Kota';
  return rute;
}

// Mendefinisikan tipe untuk Props halaman dinamis Next.js
type Props = {
  params: Promise<{ id_kendaraan: string }>;
};

export default async function DetailMobilPage({ params }: Props) {
  // Await params untuk keamanan di Next.js 15+ 
  const resolvedParams = await params;
  const id_kendaraan = resolvedParams.id_kendaraan;
  
  const mobil = await ambilDetailKendaraan(id_kendaraan);
  if (!mobil) return notFound();

  // Cek apakah user login untuk tombol Pesan
  const pengguna = await ambilPenggunaSaatIni();
  
  // Rute tombol Pesan
  const rutePemesanan = pengguna 
    ? `/transaksi/${id_kendaraan}` 
    : `/login?next=/mobil/${id_kendaraan}`;

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <div className="mb-6">
        <Link href="/pencarian-pintar" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition">
          <ArrowLeft size={16} className="mr-1" /> Kembali ke Katalog
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Sisi Kiri: Foto */}
          <div className="bg-gray-50 border-r border-gray-200 p-8 flex items-center justify-center min-h-[300px] lg:min-h-[500px]">
            {mobil.foto_url ? (
              <img 
                src={mobil.foto_url} 
                alt={mobil.nama_kendaraan} 
                className="w-full max-w-md h-auto object-contain drop-shadow-xl"
              />
            ) : (
              <div className="text-center text-gray-400">
                <ImageIcon size={80} className="mx-auto mb-4 opacity-50" />
                <p>Foto tidak tersedia</p>
              </div>
            )}
          </div>

          {/* Sisi Kanan: Spesifikasi */}
          <div className="p-8 lg:p-10 flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="inline-flex items-center space-x-2 mb-3">
                  <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {mobil.jenis_kendaraan}
                  </span>
                  <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center">
                    <ShieldCheck size={14} className="mr-1" /> {samarkanPlat(mobil.plat_nomor)}
                  </span>
                </div>
                <h1 className="text-3xl font-extrabold text-gray-900">{mobil.nama_kendaraan}</h1>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500 mb-1">Harga Sewa</div>
                <div className="text-2xl font-bold text-blue-600">{formatRupiah(mobil.harga_sewa)}</div>
                <div className="text-xs text-gray-400">/ hari</div>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-8 leading-relaxed">
              Disewakan kendaraan {mobil.nama_kendaraan} kategori {mobil.jenis_kendaraan} tahun {mobil.tahun_kendaraan} 
              dengan kondisi prima dan terawat oleh {NAMA_PERUSAHAAN}. Cocok untuk penggunaan {formatRute(mobil.rute_peruntukan)}.
            </p>

            {/* 8 Variabel CBF Grid */}
            <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Spesifikasi Kendaraan</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 flex-1">
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                <Car className="text-gray-400 mb-2" size={20} />
                <div className="text-xs text-gray-500 mb-0.5">Kategori</div>
                <div className="font-semibold text-gray-900 text-sm">{mobil.jenis_kendaraan}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                <Users className="text-gray-400 mb-2" size={20} />
                <div className="text-xs text-gray-500 mb-0.5">Kapasitas</div>
                <div className="font-semibold text-gray-900 text-sm">{mobil.kapasitas} Kursi</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                <Fuel className="text-gray-400 mb-2" size={20} />
                <div className="text-xs text-gray-500 mb-0.5">Bahan Bakar</div>
                <div className="font-semibold text-gray-900 text-sm">{mobil.bahan_bakar}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                <Gauge className="text-gray-400 mb-2" size={20} />
                <div className="text-xs text-gray-500 mb-0.5">Transmisi</div>
                <div className="font-semibold text-gray-900 text-sm">{mobil.transmisi}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                <div className="text-xs text-gray-500 mb-0.5">Rute Izin</div>
                <div className="font-semibold text-gray-900 text-sm">{formatRute(mobil.rute_peruntukan)}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                <Calendar className="text-gray-400 mb-2" size={20} />
                <div className="text-xs text-gray-500 mb-0.5">Tahun</div>
                <div className="font-semibold text-gray-900 text-sm">{mobil.tahun_kendaraan}</div>
              </div>
            </div>

            {/* Fitur Tambahan (Variabel 8) */}
            <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider flex items-center">
              <Settings size={16} className="mr-2" /> Fitur Tambahan
            </h3>
            <div className="flex flex-wrap gap-2 mb-8">
              {mobil.fitur_tambahan && mobil.fitur_tambahan.length > 0 ? (
                mobil.fitur_tambahan.map((fitur, i) => (
                  <span key={i} className="bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1.5 rounded-lg text-xs font-medium">
                    {fitur}
                  </span>
                ))
              ) : (
                <span className="text-gray-400 text-sm italic">Tidak ada catatan fitur tambahan.</span>
              )}
            </div>

            {/* Call to Action */}
            <div className="mt-auto pt-6 border-t border-gray-100">
              {mobil.status === 'tersedia' ? (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center text-green-600 text-sm font-medium bg-green-50 px-4 py-2 rounded-lg">
                    <CheckCircle2 size={18} className="mr-2" /> Kendaraan Tersedia
                  </div>
                  <Link 
                    href={rutePemesanan}
                    className="w-full sm:w-auto text-center px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition"
                  >
                    Pesan Sekarang
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center text-red-600 text-sm font-medium bg-red-50 px-4 py-2 rounded-lg">
                    <XCircle size={18} className="mr-2" /> Sedang Disewa
                  </div>
                  <button disabled className="w-full sm:w-auto px-8 py-3.5 bg-gray-300 text-gray-500 font-bold rounded-xl cursor-not-allowed">
                    Pesan Sekarang
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="-mx-4 md:-mx-6 lg:-mx-8">
        <Footer />
      </div>
    </div>
  );
}