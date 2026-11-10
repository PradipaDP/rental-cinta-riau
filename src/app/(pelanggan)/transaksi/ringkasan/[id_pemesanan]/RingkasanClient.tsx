'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { formatTanggal, formatRupiah, hitungJumlahHari } from '@/lib/formatters';
import { batalkanPemesanan } from '@/app/actions/pelanggan-transaksi';
import { Car, MapPin, Calendar, FileCheck, ExternalLink, CreditCard, Ban, RefreshCw } from 'lucide-react';

type Props = {
  pesanan: any;
};

export default function RingkasanClient({ pesanan }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isPaying, setIsPaying] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mobil = pesanan.kendaraan;
  const jumlahHari = hitungJumlahHari(pesanan.tanggal_sewa, pesanan.tanggal_kembali);
  const totalHarga = jumlahHari * mobil.harga_sewa;

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
      else router.refresh();
    });
  }

  // Fungsi memanggil API Token & Membuka Pop-up Midtrans
  async function handleBayar() {
    setIsPaying(true);
    setError(null);
    try {
      // 1. Panggil Token
      const res = await fetch('/api/pembayaran/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_pemesanan: pesanan.id_pemesanan }),
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Gagal mendapatkan token pembayaran.');
      
      // 2. Buka Snap Midtrans
      if (typeof (window as any).snap !== 'undefined') {
        (window as any).snap.pay(data.token, {
          onSuccess: function(result: any) {
            alert('Pembayaran berhasil! Terima kasih.');
            router.refresh(); // Muat ulang data server untuk memunculkan status 'dibayar'
          },
          onPending: function(result: any) {
            alert('Menunggu pembayaran Anda diselesaikan.');
            router.refresh();
          },
          onError: function(result: any) {
            alert('Pembayaran gagal. Silakan coba metode lain.');
            router.refresh();
          },
          onClose: function() {
            alert('Anda menutup pop-up sebelum menyelesaikan pembayaran.');
            router.refresh();
          }
        });
      } else {
        throw new Error('Sistem pembayaran (Snap) gagal dimuat. Silakan muat ulang halaman.');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsPaying(false);
    }
  }

  // Fungsi Manual Cek Status ke Core API
  async function handleCekStatus() {
    setIsChecking(true);
    setError(null);
    try {
      const res = await fetch('/api/pembayaran/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_pemesanan: pesanan.id_pemesanan }),
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Gagal mengecek status.');
      
      alert(`Status transaksi Anda saat ini: ${data.status.toUpperCase()}`);
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsChecking(false);
    }
  }

  return (
    <>
      {/* Script Midtrans diload secara dinamis dengan aman */}
      <Script 
        src={process.env.NEXT_PUBLIC_MIDTRANS_SNAP_URL || 'https://app.sandbox.midtrans.com/snap/snap.js'} 
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
      />

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
          
          <button 
            onClick={handleCekStatus}
            disabled={isChecking}
            className="px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl border border-gray-300 hover:bg-gray-100 transition flex items-center justify-center disabled:opacity-50 sm:mr-auto"
          >
            <RefreshCw size={18} className={`mr-2 ${isChecking ? 'animate-spin' : ''}`} /> 
            {isChecking ? 'Mengecek...' : 'Perbarui Status'}
          </button>

          {pesanan.status_pemesanan === 'menunggu_pembayaran' && (
            <>
              <button 
                onClick={handleBatal}
                disabled={isPending || isPaying}
                className="px-6 py-3 bg-white text-red-600 font-semibold rounded-xl border border-red-200 hover:bg-red-50 transition flex items-center justify-center disabled:opacity-50"
              >
                <Ban size={18} className="mr-2" /> Batalkan Pemesanan
              </button>

              <button 
                onClick={handleBayar}
                disabled={isPaying || isPending}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition shadow-lg shadow-blue-200 flex items-center justify-center disabled:bg-blue-400 disabled:shadow-none"
              >
                <CreditCard size={18} className="mr-2" /> 
                {isPaying ? 'Memuat Midtrans...' : 'Bayar Sekarang'}
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}