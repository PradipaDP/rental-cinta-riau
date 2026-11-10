'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { formatTanggal } from '@/lib/formatters';
import { ubahStatusVerifikasi, prosesSerahkanKendaraan } from '@/app/actions/staf';
import { CheckCircle, XCircle, FileText, KeyRound, Printer, AlertCircle } from 'lucide-react';

export default function SerahTerimaClient({ pesanan }: { pesanan: any }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const trx = Array.isArray(pesanan?.transaksi) ? pesanan.transaksi[0] : pesanan?.transaksi;
  const isSettlement = trx?.status_pembayaran === 'settlement';
  const isValid = pesanan?.status_verifikasi === 'valid';

  const handleVerifikasi = (status: 'valid' | 'ditolak') => {
    setError(null);
    startTransition(async () => {
      const res = await ubahStatusVerifikasi(pesanan.id_pemesanan, status);
      if (res.error) setError(res.error);
      else router.refresh();
    });
  };

  const handleSerahkan = () => {
    setError(null);

    // 1. Cek Verifikasi Pembayaran
    if (!isSettlement) {
      setError('Penyerahan ditolak: Pembayaran belum lunas (settlement).');
      return;
    }

    // 2. Cek Verifikasi Dokumen
    if (!isValid) {
      setError('Penyerahan ditolak: Dokumen identitas (KTP/SIM) belum divalidasi (Valid).');
      return;
    }

    if (!confirm('Tandai mobil diserahkan ke pelanggan dan transaksi mulai berjalan?')) return;

    startTransition(async () => {
      const res = await prosesSerahkanKendaraan(pesanan.id_pemesanan);
      if (res.error) setError(res.error);
      else {
        alert('Kendaraan berhasil diserahkan!');
        router.push('/staf');
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Box Notifikasi Error / Peringatan */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm font-medium flex items-center">
          <AlertCircle size={18} className="mr-2 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="font-bold mb-4 border-b pb-2">Informasi Pemesanan</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Pelanggan</span>
              <span className="font-semibold">{pesanan?.users?.nama || '-'} ({pesanan?.users?.no_hp || '-'})</span>
            </div>
            <div className="flex justify-between">
              <span>Kendaraan</span>
              <span className="font-semibold">{pesanan?.kendaraan?.nama_kendaraan || '-'}</span>
            </div>
            <div className="flex justify-between">
              <span>Tgl Sewa</span>
              <span className="font-semibold">{pesanan?.tanggal_sewa ? formatTanggal(pesanan.tanggal_sewa).split(',')[0] : '-'}</span>
            </div>
            <div className="flex justify-between">
              <span>Tgl Kembali</span>
              <span className="font-semibold">{pesanan?.tanggal_kembali ? formatTanggal(pesanan.tanggal_kembali).split(',')[0] : '-'}</span>
            </div>
            <div className="flex justify-between mt-2 pt-2 border-t">
              <span>Status Pembayaran</span>
              <span className={`font-bold ${isSettlement ? 'text-green-600' : 'text-red-600'}`}>
                {isSettlement ? 'LUNAS (Settlement)' : (trx?.status_pembayaran?.toUpperCase() || 'BELUM ADA')}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm flex flex-col">
          <h3 className="font-bold mb-4 border-b pb-2 flex items-center"><FileText size={18} className="mr-2"/> Validasi Dokumen</h3>
          
          <div className="flex space-x-4 mb-4">
            {pesanan?.ktp_signed_url ? (
              <a href={pesanan.ktp_signed_url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline text-sm font-medium">Cek KTP</a>
            ) : (
              <span className="text-gray-400 text-sm">File KTP Tidak Ada</span>
            )}
            {pesanan?.sim_signed_url ? (
              <a href={pesanan.sim_signed_url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline text-sm font-medium">Cek SIM</a>
            ) : (
              <span className="text-gray-400 text-sm">File SIM Tidak Ada</span>
            )}
          </div>

          <div className="mt-auto pt-4 flex gap-2">
            <button onClick={() => handleVerifikasi('valid')} disabled={isPending || isValid} className="flex-1 bg-green-100 hover:bg-green-200 text-green-700 font-bold py-2 rounded-lg flex justify-center items-center disabled:opacity-50">
              <CheckCircle size={18} className="mr-1"/> Valid
            </button>
            <button onClick={() => handleVerifikasi('ditolak')} disabled={isPending || pesanan?.status_verifikasi === 'ditolak'} className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 font-bold py-2 rounded-lg flex justify-center items-center disabled:opacity-50">
              <XCircle size={18} className="mr-1"/> Tolak
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-xl border flex flex-col sm:flex-row justify-end gap-3">
        <button disabled className="px-6 py-3 bg-white text-gray-500 border rounded-xl flex items-center justify-center font-medium opacity-50 cursor-not-allowed">
          <Printer size={18} className="mr-2"/> Cetak Surat Perjanjian
        </button>
        <button 
          onClick={handleSerahkan}
          disabled={isPending}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center disabled:opacity-50 shadow-md transition"
        >
          <KeyRound size={18} className="mr-2"/> Serahkan Kendaraan
        </button>
      </div>
    </div>
  );
}