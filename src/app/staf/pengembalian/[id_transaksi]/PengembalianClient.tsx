'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { formatTanggal, formatRupiah } from '@/lib/formatters';
import { selesaikanTransaksi } from '@/app/actions/staf';
import { DENDA_PERSEN_PER_HARI } from '@/lib/config';
import { CheckCircle2, AlertTriangle, Undo2, Calculator } from 'lucide-react';

export default function PengembalianClient({ transaksi }: { transaksi: any }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const todayWIB = new Date().toLocaleDateString('en-CA'); // Format YYYY-MM-DD
  const [tanggalAktual, setTanggalAktual] = useState(todayWIB);

  // Checkbox kondisi mobil
  const [cekBodi, setCekBodi] = useState(false);
  const [cekInterior, setCekInterior] = useState(false);
  const [cekBahanBakar, setCekBahanBakar] = useState(false);
  const [cekKelengkapan, setCekKelengkapan] = useState(false);

  const semuaDicentang = cekBodi && cekInterior && cekBahanBakar && cekKelengkapan;

  const pesanan = transaksi.pemesanan;
  const mobil = pesanan?.kendaraan;
  const hargaSewaHarian = mobil?.harga_sewa || 0;

  // Hitung selisih hari terlambat secara tepat berdasarkan string YYYY-MM-DD
  const hitungHariTerlambat = () => {
    if (!tanggalAktual || !transaksi.tanggal_kembali) return 0;
    const tglKembaliRencana = new Date(transaksi.tanggal_kembali).getTime();
    const tglKembaliAktual = new Date(tanggalAktual).getTime();
    const diffTime = tglKembaliAktual - tglKembaliRencana;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const hariTerlambat = hitungHariTerlambat();
  const dendaOtomatis = (hariTerlambat * hargaSewaHarian * DENDA_PERSEN_PER_HARI) / 100;
  
  // State denda manual menggunakan string agar tidak ada angka "0" di depan saat diketik
  const [manualDenda, setManualDenda] = useState<string>('');
  
  // Jika manualDenda kosong, gunakan dendaOtomatis; jika diisi, parse ke number
  const finalDenda = manualDenda !== '' ? Number(manualDenda) : dendaOtomatis;

  const handleSelesaikan = () => {
    setError(null);
    if (!semuaDicentang) {
      setError("Semua checklist kondisi fisik dan kelengkapan mobil wajib dicentang!");
      return;
    }
    if (!confirm("Apakah Anda yakin ingin menyelesaikan transaksi dan membebaskan kendaraan ini?")) return;

    startTransition(async () => {
      const res = await selesaikanTransaksi(transaksi.id_transaksi, tanggalAktual, finalDenda);
      if (res.error) {
        setError(res.error);
      } else {
        alert("Pengembalian berhasil diselesaikan! Kendaraan kini berstatus tersedia.");
        router.push('/staf');
      }
    });
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm font-medium flex items-center">
          <AlertTriangle size={18} className="mr-2 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Grid Informasi Ringkas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border shadow-sm space-y-3">
          <h3 className="font-bold border-b pb-2 text-gray-900">Informasi Transaksi & Pelanggan</h3>
          <div className="text-sm space-y-1.5">
            <div className="flex justify-between"><span className="text-gray-500">Nama Pelanggan</span><span className="font-semibold">{pesanan?.users?.nama}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">No HP</span><span className="font-semibold">{pesanan?.users?.no_hp || '-'}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Kendaraan</span><span className="font-semibold">{mobil?.nama_kendaraan} ({mobil?.plat_nomor})</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Rute Perjalanan</span><span className="font-semibold">{pesanan?.rute_perjalanan}</span></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm space-y-3">
          <h3 className="font-bold border-b pb-2 text-gray-900">Jadwal Sewa</h3>
          <div className="text-sm space-y-1.5">
            <div className="flex justify-between"><span className="text-gray-500">Tanggal Mulai Sewa</span><span className="font-semibold">{formatTanggal(transaksi.tanggal_sewa).split(',')[0]}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Batas Tanggal Kembali</span><span className="font-semibold">{formatTanggal(transaksi.tanggal_kembali).split(',')[0]}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Tarif Sewa / Hari</span><span className="font-semibold text-blue-600">{formatRupiah(hargaSewaHarian)}</span></div>
          </div>
        </div>
      </div>

      {/* Input Tanggal Aktual & Hitung Denda */}
      <div className="bg-white p-6 rounded-xl border shadow-sm space-y-6">
        <h3 className="font-bold text-gray-900 border-b pb-2">Input Tanggal Pengembalian & Perhitungan Denda</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Pengembalian Aktual (WIB)</label>
            <input 
              type="date" 
              value={tanggalAktual} 
              onChange={e => setTanggalAktual(e.target.value)}
              className="w-full border border-gray-300 p-2.5 rounded-lg outline-none focus:border-blue-500 font-medium" 
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Hari Terlambat:</span>
              <span className={`font-bold ${hariTerlambat > 0 ? 'text-red-600' : 'text-green-600'}`}>{hariTerlambat} Hari</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Rumus Denda ({DENDA_PERSEN_PER_HARI}% / hari):</span>
              <span className="font-mono text-xs text-gray-500">{hariTerlambat} × {formatRupiah(hargaSewaHarian)} × {DENDA_PERSEN_PER_HARI}%</span>
            </div>
            <div className="flex justify-between text-base font-extrabold pt-2 border-t border-gray-200">
              <span>Estimasi Denda:</span>
              <span className="text-red-600">{formatRupiah(dendaOtomatis)}</span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Koreksi / Nilai Denda Final (Opsional, dapat diubah manual)</label>
          <input 
            type="number" 
            min={0}
            placeholder={String(dendaOtomatis)}
            value={manualDenda} 
            onChange={e => setManualDenda(e.target.value)}
            className="w-full md:w-1/2 border border-gray-300 p-2.5 rounded-lg outline-none focus:border-blue-500 font-bold text-red-600" 
          />
          <p className="text-xs text-gray-400 mt-1">Kosongkan jika ingin menggunakan perhitungan denda otomatis.</p>
        </div>
      </div>

      {/* Checklist Kondisi Fisik */}
      <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4">
        <h3 className="font-bold text-gray-900 border-b pb-2">Cek Kondisi Mobil Kembali (Wajib Dicentang Semua)</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="flex items-center space-x-3 p-3 bg-gray-50 border rounded-xl cursor-pointer hover:bg-gray-100 transition">
            <input type="checkbox" checked={cekBodi} onChange={e => setCekBodi(e.target.checked)} className="w-5 h-5 rounded text-blue-600" />
            <span className="text-sm font-medium text-gray-800">Pemeriksaan Bodi (Tanpa baret/penyok baru)</span>
          </label>
          <label className="flex items-center space-x-3 p-3 bg-gray-50 border rounded-xl cursor-pointer hover:bg-gray-100 transition">
            <input type="checkbox" checked={cekInterior} onChange={e => setCekInterior(e.target.checked)} className="w-5 h-5 rounded text-blue-600" />
            <span className="text-sm font-medium text-gray-800">Pemeriksaan Interior (Kebersihan & fungsi kabin)</span>
          </label>
          <label className="flex items-center space-x-3 p-3 bg-gray-50 border rounded-xl cursor-pointer hover:bg-gray-100 transition">
            <input type="checkbox" checked={cekBahanBakar} onChange={e => setCekBahanBakar(e.target.checked)} className="w-5 h-5 rounded text-blue-600" />
            <span className="text-sm font-medium text-gray-800">Pemeriksaan Bahan Bakar (Sesuai kondisi awal)</span>
          </label>
          <label className="flex items-center space-x-3 p-3 bg-gray-50 border rounded-xl cursor-pointer hover:bg-gray-100 transition">
            <input type="checkbox" checked={cekKelengkapan} onChange={e => setCekKelengkapan(e.target.checked)} className="w-5 h-5 rounded text-blue-600" />
            <span className="text-sm font-medium text-gray-800">Kelengkapan Dokumen (STNK & Kunci Asli)</span>
          </label>
        </div>
      </div>

      {/* Tombol Aksi */}
      <div className="flex justify-end pt-4">
        <button 
          onClick={handleSelesaikan}
          disabled={isPending || !semuaDicentang}
          className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition flex items-center disabled:bg-gray-300 disabled:shadow-none"
        >
          <Undo2 size={18} className="mr-2" />
          {isPending ? 'Menyelesaikan Transaksi...' : 'Selesaikan Transaksi & Bebaskan Kendaraan'}
        </button>
      </div>
    </div>
  );
}