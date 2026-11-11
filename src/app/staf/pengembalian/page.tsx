import Link from 'next/link';
import { ambilDaftarPengembalian } from '@/app/actions/staf';
import { formatTanggal } from '@/lib/formatters';
import { Undo2, ArrowRight, AlertTriangle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function PengembalianPage() {
  const data = await ambilDaftarPengembalian();
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Undo2 size={24} /></div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Proses Pengembalian Kendaraan</h1>
          <p className="text-gray-500 text-sm mt-1">Daftar transaksi berjalan yang harus dikembalikan atau diperiksa dendanya.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4">ID Transaksi</th>
              <th className="px-6 py-4">Pelanggan</th>
              <th className="px-6 py-4">Kendaraan</th>
              <th className="px-6 py-4">Jadwal Kembali</th>
              <th className="px-6 py-4">Status Keterlambatan</th>
              <th className="px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {data.length === 0 ? (
              <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-500">Tidak ada kendaraan yang sedang disewa (berjalan).</td></tr>
            ) : (
              data.map((t: any) => {
                const isLate = t.tanggal_kembali < today;
                return (
                  <tr key={t.id_transaksi} className={`hover:bg-gray-50 ${isLate ? 'bg-red-50/50' : ''}`}>
                    <td className="px-6 py-4 font-mono text-gray-600">{t.id_transaksi.split('-')[0].toUpperCase()}</td>
                    <td className="px-6 py-4 font-semibold">{t.pemesanan?.users?.nama}</td>
                    <td className="px-6 py-4">{t.kendaraan?.nama_kendaraan}</td>
                    <td className="px-6 py-4">{formatTanggal(t.tanggal_kembali).split(',')[0]}</td>
                    <td className="px-6 py-4">
                      {isLate ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">
                          <AlertTriangle size={12} className="mr-1" /> Terlambat
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                          Tepat Waktu / Aktif
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/staf/pengembalian/${t.id_transaksi}`} className="inline-flex items-center text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 font-medium">
                        Proses <ArrowRight size={16} className="ml-1" />
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}