import Link from 'next/link';
import { ambilDaftarSerahTerima } from '@/app/actions/staf';
import { formatTanggal } from '@/lib/formatters';
import { KeyRound, ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function SerahTerimaPage() {
  const data = await ambilDaftarSerahTerima();

  return (
    <div>
      <div className="mb-6 flex items-center space-x-3">
        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><KeyRound size={24} /></div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Daftar Serah Terima Kendaraan</h1>
          <p className="text-gray-500 text-sm mt-1">Daftar pesanan lunas yang siap diserahkan kepada pelanggan.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4">ID Booking</th>
              <th className="px-6 py-4">Pelanggan</th>
              <th className="px-6 py-4">Kendaraan</th>
              <th className="px-6 py-4">Tanggal Pengambilan</th>
              <th className="px-6 py-4">Status Dokumen</th>
              <th className="px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {data.length === 0 ? (
              <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-500">Tidak ada jadwal serah terima.</td></tr>
            ) : (
              data.map((p: any) => (
                <tr key={p.id_pemesanan} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-mono text-gray-600">{p.id_pemesanan.split('-')[0].toUpperCase()}</td>
                  <td className="px-6 py-4 font-semibold">{p.users?.nama}</td>
                  <td className="px-6 py-4">{p.kendaraan?.nama_kendaraan}</td>
                  <td className="px-6 py-4">{formatTanggal(p.tanggal_sewa).split(',')[0]}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${p.status_verifikasi === 'valid' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      {p.status_verifikasi?.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/staf/serah-terima/${p.id_pemesanan}`} className="inline-flex items-center text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 font-medium">
                      Proses <ArrowRight size={16} className="ml-1" />
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}