'use client';

import { useState, useEffect, useCallback } from 'react';
import { formatTanggal, formatRupiah } from '@/lib/formatters';
import { ambilMonitoringTransaksi } from '@/app/actions/admin-bi';
import { Search, Filter, Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function TransaksiClient({ initialData }: { initialData: any }) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [tahunFilter, setTahunFilter] = useState('');
  
  const [modalData, setModalData] = useState<any | null>(null);

  const tahunSekarang = new Date().getFullYear();
  const pilihanTahun = Array.from({ length: 5 }, (_, i) => (tahunSekarang - i).toString());

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await ambilMonitoringTransaksi(page, 10, search, statusFilter, tahunFilter);
      setData(res);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }, [page, search, statusFilter, tahunFilter]);

  // Efek debounce untuk pencarian teks
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 500);
    return () => clearTimeout(timer);
  }, [fetchData]);

  // Reset page ke 1 kalau filter berubah
  useEffect(() => { setPage(1); }, [search, statusFilter, tahunFilter]);

  const getStatusColor = (status: string) => {
    if (status === 'settlement' || status === 'selesai') return 'bg-green-100 text-green-800';
    if (status === 'pending' || status === 'berjalan') return 'bg-amber-100 text-amber-800';
    if (status === 'cancel' || status === 'deny' || status === 'dibatalkan') return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Toolbar Filter */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input 
            type="text" placeholder="Cari ID, Pelanggan, Kendaraan..." 
            value={search} onChange={e => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex gap-3">
          <div className="flex items-center bg-gray-50 border border-gray-300 rounded-lg px-3">
            <Filter size={16} className="text-gray-400 mr-2" />
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="bg-transparent py-2 outline-none text-sm text-gray-700">
              <option value="">Semua Status</option>
              <option value="berjalan">Berjalan (Disewa)</option>
              <option value="selesai">Selesai</option>
              <option value="dibatalkan">Dibatalkan</option>
            </select>
          </div>
          <select value={tahunFilter} onChange={e => setTahunFilter(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 outline-none text-sm text-gray-700 bg-white">
            <option value="">Semua Tahun</option>
            {pilihanTahun.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      {/* Tabel */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4">ID Transaksi / Pelanggan</th>
                <th className="px-6 py-4">Kendaraan</th>
                <th className="px-6 py-4">Total & Denda</th>
                <th className="px-6 py-4">Status Pembayaran</th>
                <th className="px-6 py-4">Status Sewa</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y relative">
              {loading && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-blue-600 bg-white/50 backdrop-blur-sm absolute inset-0 z-10 flex items-center justify-center">
                    Memuat data...
                  </td>
                </tr>
              )}
              {data.data.length === 0 && !loading ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-500">Tidak ada transaksi ditemukan.</td></tr>
              ) : (
                data.data.map((t: any) => (
                  <tr key={t.id_transaksi} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-mono text-gray-900 font-medium">{t.id_transaksi.split('-')[0].toUpperCase()}</div>
                      <div className="text-gray-500 text-xs mt-0.5">{t.pemesanan?.users?.nama}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold">{t.kendaraan?.nama_kendaraan}</div>
                      <div className="text-gray-500 text-xs">{t.kendaraan?.plat_nomor}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-blue-600">{formatRupiah(t.total_harga + t.denda)}</div>
                      {t.denda > 0 && <div className="text-xs text-red-500 font-medium mt-0.5">+ Denda {formatRupiah(t.denda)}</div>}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase ${getStatusColor(t.status_pembayaran)}`}>
                        {t.status_pembayaran}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase ${getStatusColor(t.status)}`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button onClick={() => setModalData(t)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition" title="Lihat Detail">
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Paginasi */}
        {data.totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-3 border-t bg-gray-50">
            <span className="text-sm text-gray-500">Halaman {data.currentPage} dari {data.totalPages}</span>
            <div className="flex space-x-2">
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="p-1.5 border bg-white rounded disabled:opacity-50 hover:bg-gray-100"><ChevronLeft size={16}/></button>
              <button disabled={page === data.totalPages} onClick={() => setPage(p => p + 1)} className="p-1.5 border bg-white rounded disabled:opacity-50 hover:bg-gray-100"><ChevronRight size={16}/></button>
            </div>
          </div>
        )}
      </div>

      {/* Modal Detail */}
      {modalData && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
              <h3 className="font-bold text-gray-900">Detail Transaksi</h3>
              <button onClick={() => setModalData(null)} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>
            </div>
            <div className="p-6 space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-y-3">
                <div className="text-gray-500">ID Transaksi</div><div className="font-mono font-medium text-right">{modalData.id_transaksi}</div>
                <div className="text-gray-500">Pelanggan</div><div className="font-medium text-right">{modalData.pemesanan?.users?.nama}</div>
                <div className="text-gray-500">Kendaraan</div><div className="font-medium text-right">{modalData.kendaraan?.nama_kendaraan} ({modalData.kendaraan?.plat_nomor})</div>
                <div className="col-span-2 border-t my-1"></div>
                <div className="text-gray-500">Tanggal Sewa</div><div className="text-right">{formatTanggal(modalData.tanggal_sewa).split(',')[0]}</div>
                <div className="text-gray-500">Jadwal Kembali</div><div className="text-right">{formatTanggal(modalData.tanggal_kembali).split(',')[0]}</div>
                <div className="text-gray-500">Kembali Aktual</div><div className="text-right">{modalData.tanggal_kembali_aktual ? formatTanggal(modalData.tanggal_kembali_aktual).split(',')[0] : '-'}</div>
                <div className="col-span-2 border-t my-1"></div>
                <div className="text-gray-500">Total Harga Sewa</div><div className="font-medium text-right">{formatRupiah(modalData.total_harga)}</div>
                <div className="text-gray-500">Denda Keterlambatan</div><div className="font-medium text-red-600 text-right">{formatRupiah(modalData.denda)}</div>
                <div className="text-gray-900 font-bold">Total Tagihan Akhir</div><div className="font-bold text-blue-600 text-right text-lg">{formatRupiah(modalData.total_harga + modalData.denda)}</div>
                <div className="col-span-2 border-t my-1"></div>
                <div className="text-gray-500">Metode Bayar</div><div className="uppercase font-medium text-right">{modalData.metode_pembayaran}</div>
                <div className="text-gray-500">ID Midtrans</div><div className="font-mono text-xs text-right break-all">{modalData.id_transaksi_midtrans || '-'}</div>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-4 border-t flex justify-end">
              <button onClick={() => setModalData(null)} className="px-6 py-2 bg-gray-200 hover:bg-gray-300 font-medium rounded-lg transition">Tutup</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}