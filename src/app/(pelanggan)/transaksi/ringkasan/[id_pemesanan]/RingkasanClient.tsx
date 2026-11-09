'use client';

import { useState, useTransition } from 'react';
import { formatTanggal, formatRupiah, hitungJumlahHari } from '@/lib/formatters';
import { batalkanPemesanan } from '@/app/actions/pelanggan-transaksi';
import { Car, MapPin, Calendar, FileCheck, ExternalLink, CreditCard, Ban } from 'lucide-react';

type Props = {
  pesanan: any;
};

export default function RingkasanClient({ pesanan }: Props) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const mobil = pesanan.kendaraan;
  const jumlahHari = hitungJumlahHari(pesanan.tanggal_sewa, pesanan.tanggal_kembali);
  const totalHarga = jumlahHari * mobil.harga_sewa; // Dihitung di server/komponen dengan aman

  const statusColors: Record<string, string> = {
    'menunggu_pembayaran': 'bg-amber-100 text-amber-800',
    'dibayar': 'bg-blue-100 text-blue-800',
    'diambil': 'bg-indigo-100 text-indigo-800',
    'selesai': 'bg-green-100 text-green-800',
    'dibatalkan': 'bg-red-100 text-red-800',
  };

  const verifikasiColors: Record<string, string> = {
    'menunggu': 'text-amber-600',
    'valid': 'text-green-600',
    'ditolak': 'text-red-600',
  };

  async function handleBatal() {
    if (!confirm('Apakah Anda yakin ingin membatalkan pemesanan ini?')) return;
    
    startTransition(async () => {
      const res = await batalkanPemesanan(pesanan.id_pemesanan);
      if (res.error) setError(res.error);
    });
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header Struk */}
      <div className="bg-gray-50 border-b border-gray-200 p-6 md:p-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <p className="text-sm text-gray-500 mb-1">ID Booking: <span className="font-mono text-gray-900">{pesanan.id_pemesanan.split('-')[0].toUpperCase()}</span></p>
          <div className="flex items-center space-x-3">
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${statusColors[pesanan.status_pemesanan]}`}>
              {pesanan.status_pemesanan.replace('_', ' ')}
            </span>
          </div>
        </div>
        <div className="text-left md:text-right">
          <p className="text-sm text-gray-500 mb-1">Total Tagihan</p>
          <h2 className="text-3xl font-extrabold text-blue-600">{formatRupiah(totalHarga)}</h2>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 border-b border-red-100 text-sm font-medium">
          {error}
        </div>
      )}

      {/* Konten Utama */}
      <div className="p-6 md:p-8 space-y-8">
        {/* Detail Mobil */}
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
            <Car size={32} className="text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">{mobil.nama_kendaraan}</h3>
            <p className="text-gray-500 text-sm">{mobil.plat_nomor} • {mobil.jenis_kendaraan}</p>
          </div>
        </div>

        {/* Info Pemesanan Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
          <div>
            <div className="flex items-center text-sm font-medium text-gray-500 mb-1">
              <Calendar size={16} className="mr-2" /> Tanggal Sewa
            </div>
            <p className="text-gray-900 font-semibold">{formatTanggal(pesanan.tanggal_sewa).split(',')[0]} - {formatTanggal(pesanan.tanggal_kembali).split(',')[0]}</p>
            <p className="text-xs text-gray-500 mt-1">Durasi: {jumlahHari} Hari</p>
          </div>
          <div>
            <div className="flex items-center text-sm font-medium text-gray-500 mb-1">
              <MapPin size={16} className="mr-2" /> Rute Perjalanan
            </div>
            <p className="text-gray-900 font-semibold">{pesanan.rute_perjalanan}</p>
          </div>
          
          <div className="md:col-span-2 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm font-medium text-gray-500">
                <FileCheck size={16} className="mr-2" /> Status Verifikasi Dokumen
              </div>
              <span className={`text-sm font-bold uppercase ${verifikasiColors[pesanan.status_verifikasi]}`}>
                {pesanan.status_verifikasi}
              </span>
            </div>
            <div className="mt-3 flex space-x-4">
              <a href={pesanan.ktp_signed_url} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline flex items-center">
                Lihat KTP <ExternalLink size={14} className="ml-1" />
              </a>
              <a href={pesanan.sim_signed_url} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline flex items-center">
                Lihat SIM <ExternalLink size={14} className="ml-1" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Aksi Bawah */}
      <div className="bg-gray-50 p-6 border-t border-gray-200 flex flex-col sm:flex-row justify-end gap-3">
        {pesanan.status_pemesanan === 'menunggu_pembayaran' && (
          <>
            <button 
              onClick={handleBatal}
              disabled={isPending}
              className="px-6 py-3 bg-white text-red-600 font-semibold rounded-xl border border-red-200 hover:bg-red-50 transition flex items-center justify-center disabled:opacity-50"
            >
              <Ban size={18} className="mr-2" /> Batalkan Pemesanan
            </button>
            <button 
              disabled // DI-DISABLE UNTUK TAHAP 8, DIAKTIFKAN DI TAHAP 9
              className="px-8 py-3 bg-gray-300 text-gray-500 font-bold rounded-xl cursor-not-allowed flex items-center justify-center"
              title="Fitur Pembayaran akan diaktifkan di Tahap 9"
            >
              <CreditCard size={18} className="mr-2" /> Bayar Sekarang
            </button>
          </>
        )}
      </div>
    </div>
  );
}