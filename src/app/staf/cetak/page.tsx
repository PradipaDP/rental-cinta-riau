import Link from 'next/link';
import { ambilDaftarCetak } from '@/app/actions/staf';
import { formatTanggal, formatRupiah } from '@/lib/formatters';
import { Printer, Search, FileText, FileCheck2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function CetakDokumenPage() {
  const data = await ambilDaftarCetak();

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Printer size={24} /></div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cetak Dokumen Kwitansi & Surat Perjanjian</h1>
          <p className="text-gray-500 text-sm mt-1">Daftar transaksi lunas (settlement) yang siap dicetak dokumen legalnya.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4">ID Transaksi / Booking</th>
                <th className="px-6 py-4">Pelanggan</th>
                <th className="px-6 py-4">Kendaraan</th>
                <th className="px-6 py-4">Total Harga</th>
                <th className="px-6 py-4">Status Pembayaran</th>
                <th className="px-6 py-4 text-right">Aksi Cetak</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {data.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-500">Tidak ada transaksi lunas (settlement) untuk dicetak.</td></tr>
              ) : (
                data.map((t: any) => (
                  <tr key={t.id_transaksi} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-mono text-gray-600">
                      <div>{t.id_transaksi.split('-')[0].toUpperCase()}</div>
                      <div className="text-xs text-gray-400">Booking: {t.pemesanan?.id_pemesanan.split('-')[0].toUpperCase()}</div>
                    </td>
                    <td className="px-6 py-4 font-semibold">{t.pemesanan?.users?.nama}</td>
                    <td className="px-6 py-4">
                      <div>{t.pemesanan?.kendaraan?.nama_kendaraan}</div>
                      <div className="text-xs text-gray-500">{t.pemesanan?.kendaraan?.plat_nomor}</div>
                    </td>
                    <td className="px-6 py-4 font-bold text-blue-600">{formatRupiah(t.total_harga + (t.denda || 0))}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 uppercase">
                        {t.status_pembayaran}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Link href={`/staf/cetak/${t.id_transaksi}?tab=kwitansi`} className="inline-flex items-center text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 font-medium text-xs">
                        <FileText size={14} className="mr-1" /> Kwitansi
                      </Link>
                      <Link href={`/staf/cetak/${t.id_transaksi}?tab=sp`} className="inline-flex items-center text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 font-medium text-xs">
                        <FileCheck2 size={14} className="mr-1" /> Surat Perjanjian
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}