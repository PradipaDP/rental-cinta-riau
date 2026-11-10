import Link from 'next/link';
import { ambilJadwalHariIni } from '@/app/actions/staf';
import { formatTanggal } from '@/lib/formatters';
import { CalendarClock, ArrowRight, AlertTriangle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function DashboardStafPage() {
  const data = await ambilJadwalHariIni();
  const today = new Date().toISOString().split('T')[0];

  const jmlPengambilan = data.pengambilan.length;
  const jmlPengembalian = data.pengembalian.length;
  const jmlTerlambat = data.pengembalian.filter((p: any) => p.tanggal_kembali < today).length;

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
        <div className="p-3 bg-blue-100 text-blue-600 rounded-xl"><CalendarClock size={28} /></div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Staf</h1>
          <p className="text-gray-500 text-sm">Ringkasan aktivitas pengambilan dan pengembalian hari ini.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-gray-500 text-sm font-medium">Jadwal Pengambilan Hari Ini</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{jmlPengambilan}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-gray-500 text-sm font-medium">Jadwal Pengembalian Hari Ini</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{jmlPengembalian}</p>
        </div>
        <div className="bg-red-50 p-6 rounded-xl shadow-sm border border-red-100">
          <p className="text-red-600 text-sm font-medium flex items-center"><AlertTriangle size={16} className="mr-1" /> Terlambat Kembali</p>
          <p className="text-3xl font-bold text-red-700 mt-2">{jmlTerlambat}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Kolom Pengambilan */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b bg-gray-50 font-bold text-gray-900">Pengambilan (Serah Terima)</div>
          <div className="divide-y">
            {data.pengambilan.length === 0 ? (
              <div className="p-6 text-center text-gray-500 text-sm">Tidak ada jadwal pengambilan.</div>
            ) : (
              data.pengambilan.map((p: any) => (
                <div key={p.id_pemesanan} className="p-4 flex justify-between items-center hover:bg-gray-50">
                  <div>
                    <p className="font-semibold text-gray-900">{p.users?.nama}</p>
                    <p className="text-sm text-gray-500">{p.kendaraan?.nama_kendaraan} • {formatTanggal(p.tanggal_sewa).split(',')[0]}</p>
                  </div>
                  <Link href={`/staf/serah-terima/${p.id_pemesanan}`} className="text-blue-600 p-2 hover:bg-blue-50 rounded-lg">
                    <ArrowRight size={20} />
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Kolom Pengembalian */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b bg-gray-50 font-bold text-gray-900">Pengembalian</div>
          <div className="divide-y">
            {data.pengembalian.length === 0 ? (
              <div className="p-6 text-center text-gray-500 text-sm">Tidak ada jadwal pengembalian.</div>
            ) : (
              data.pengembalian.map((p: any) => {
                const isLate = p.tanggal_kembali < today;
                return (
                  <div key={p.id_pemesanan} className={`p-4 flex justify-between items-center ${isLate ? 'bg-red-50 hover:bg-red-100' : 'hover:bg-gray-50'}`}>
                    <div>
                      <p className="font-semibold text-gray-900">{p.users?.nama}</p>
                      <p className={`text-sm ${isLate ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
                        {p.kendaraan?.nama_kendaraan} • {formatTanggal(p.tanggal_kembali).split(',')[0]}
                        {isLate && " (Terlambat)"}
                      </p>
                    </div>
                    <Link href={`/staf/pengembalian/${p.transaksi[0]?.id_transaksi}`} className="text-blue-600 p-2 hover:bg-blue-50 rounded-lg">
                      <ArrowRight size={20} />
                    </Link>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}