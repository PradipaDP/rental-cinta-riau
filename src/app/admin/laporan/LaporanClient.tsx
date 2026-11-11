'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { ambilDataEksporLaporan } from '@/app/actions/admin-bi';
import { formatRupiah, formatTanggal } from '@/lib/formatters';
import { namaBulanIndonesia } from '@/lib/terbilang';
import { NAMA_PERUSAHAAN } from '@/lib/config';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import { FileText, Download, Filter, Loader2, Sparkles, TrendingUp, ShieldAlert, Award, AlertTriangle } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function LaporanClient() {
  const tahunSekarang = new Date().getFullYear();
  const pilihanTahun = Array.from({ length: 5 }, (_, i) => (tahunSekarang - i).toString());
  
  const [tahun, setTahun] = useState(tahunSekarang.toString());
  const [bulan, setBulan] = useState('');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await ambilDataEksporLaporan(tahun, bulan);
      setData(res);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }, [tahun, bulan]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 1. Analisis Finansial & Makro (KPIs)
  const rekap = useMemo(() => {
    const totalTransaksi = data.length;
    let totalPendapatan = 0;
    let totalDenda = 0;
    let totalSewaMurni = 0;
    
    data.forEach(t => {
      if (t.status_pembayaran === 'settlement' || t.status_pembayaran === 'capture') {
        totalSewaMurni += Number(t.total_harga);
        totalDenda += Number(t.denda || 0);
      }
    });

    totalPendapatan = totalSewaMurni + totalDenda;
    const rataRata = totalTransaksi > 0 ? totalPendapatan / totalTransaksi : 0;
    const rasioDendaTerhadapSewa = totalSewaMurni > 0 ? (totalDenda / totalSewaMurni) * 100 : 0;

    return { totalTransaksi, totalSewaMurni, totalDenda, totalPendapatan, rataRata, rasioDendaTerhadapSewa };
  }, [data]);

  // 2. Analisis BI: Kinerja & Portofolio Armada
  const analisisArmada = useMemo(() => {
    const map: Record<string, { nama: string; totalPendapatan: number; frekuensi: number }> = {};

    data.forEach(t => {
      if (t.status_pembayaran === 'settlement' || t.status_pembayaran === 'capture') {
        const nama = t.kendaraan?.nama_kendaraan || 'Lainnya';
        if (!map[nama]) {
          map[nama] = { nama, totalPendapatan: 0, frekuensi: 0 };
        }
        map[nama].totalPendapatan += Number(t.total_harga) + Number(t.denda || 0);
        map[nama].frekuensi += 1;
      }
    });

    return Object.values(map).sort((a, b) => b.totalPendapatan - a.totalPendapatan);
  }, [data]);

  // 3. Analisis BI: Preferensi Metode Pembayaran dengan Normalisasi
  const analisisPembayaran = useMemo(() => {
    const map: Record<string, number> = {};
    let totalCount = 0;
    
    data.forEach(t => {
      let metodeRaw = (t.metode_pembayaran || 'unknown').toLowerCase().trim();
      let metodeBaku = 'Lainnya';
      if (metodeRaw.includes('transfer') || metodeRaw.includes('bank') || metodeRaw.includes('va')) {
        metodeBaku = 'Virtual Account & Transfer Bank';
      } else if (metodeRaw.includes('qris')) {
        metodeBaku = 'QRIS';
      } else if (metodeRaw.includes('gopay') || metodeRaw.includes('shopeepay') || metodeRaw.includes('ewallet')) {
        metodeBaku = 'E-Wallet (GoPay/Lainnya)';
      } else if (metodeRaw.includes('cash') || metodeRaw.includes('tunai')) {
        metodeBaku = 'Tunai / Walk-in';
      } else {
        metodeBaku = metodeRaw.toUpperCase();
      }

      map[metodeBaku] = (map[metodeBaku] || 0) + 1;
      totalCount += 1;
    });

    return Object.entries(map).map(([name, value]) => ({ 
      name, 
      value,
      persen: totalCount > 0 ? ((value / totalCount) * 100).toFixed(1) : 0 
    }));
  }, [data]);

  // 4. Pemetaan Grafik Tren Pendapatan
  const chartData = useMemo(() => {
    if (!bulan) {
      const map: Record<string, number> = {};
      for (let i = 0; i < 12; i++) {
        map[namaBulanIndonesia(i).substring(0, 3)] = 0;
      }
      data.forEach(t => {
        if (t.status_pembayaran === 'settlement' || t.status_pembayaran === 'capture') {
          const parts = t.tanggal_sewa.split('-');
          if (parts.length === 3) {
            const blnIdx = parseInt(parts[1]) - 1;
            const key = namaBulanIndonesia(blnIdx).substring(0, 3);
            if (map[key] !== undefined) {
              map[key] += Number(t.total_harga) + Number(t.denda || 0);
            }
          }
        }
      });
      return Object.entries(map).map(([name, value]) => ({ name, Pendapatan: value }));
    } else {
      const daysInMonth = new Date(parseInt(tahun), parseInt(bulan), 0).getDate();
      const map: Record<string, number> = {};
      for (let d = 1; d <= daysInMonth; d++) {
        map[String(d).padStart(2, '0')] = 0;
      }
      data.forEach(t => {
        if (t.status_pembayaran === 'settlement' || t.status_pembayaran === 'capture') {
          const parts = t.tanggal_sewa.split('-');
          if (parts.length === 3 && map[parts[2]] !== undefined) {
            map[parts[2]] += Number(t.total_harga) + Number(t.denda || 0);
          }
        }
      });
      return Object.entries(map).map(([name, value]) => ({ name: `Tgl ${name}`, Pendapatan: value }));
    }
  }, [data, bulan, tahun]);

  // ============================================================================
  // TRUE BUSINESS INTELLIGENCE: ADVANCED DECISION ENGINE
  // ============================================================================
  const businessIntelligenceReport = useMemo(() => {
    const namaPeriode = bulan ? `${namaBulanIndonesia(parseInt(bulan) - 1)} ${tahun}` : `Tahun ${tahun}`;
    
    if (rekap.totalTransaksi === 0) {
      return {
        statusKritis: true,
        judul: "Peringatan Minimnya Aktivitas Transaksi",
        diagnosa: `Tidak ada transaksi yang berhasil diselesaikan pada periode ${namaPeriode}. Ini menunjukkan potensi hambatan pemasaran atau libur operasional.`,
        rekomendasi: "Manajemen perlu mengevaluasi efektivitas kampanye promosi digital dan memastikan fungsionalitas sistem pembayaran online berjalan normal."
      };
    }

    const armAndalan = analisisArmada.length > 0 ? analisisArmada[0] : null;
    const jumlahArmadaUnik = analisisArmada.length;
    
    let diagnosa = "";
    let rekomendasi = "";
    let statusKritis = false;

    if (rekap.rasioDendaTerhadapSewa > 8) {
      statusKritis = true;
      diagnosa = `Terdeteksi risiko operasional berupa tingginya tingkat keterlambatan pengembalian unit pada periode ${namaPeriode} (Rasio denda mencapai ${rekap.rasioDendaTerhadapSewa.toFixed(1)}% dari nilai sewa murni). Hal ini dapat memicu konflik penjadwalan dengan penyewa berikutnya.`;
      rekomendasi = `Manajemen disarankan untuk memperketat Standard Operating Procedure (SOP) pengecekan keterlambatan dan memberlakukan penalti progresif otomatis lewat sistem.`;
    } else if (armAndalan && armAndalan.frekuensi >= 3) {
      diagnosa = `Analisis portofolio menunjukkan konsentrasi permintaan yang tinggi pada unit [${armAndalan.nama}] dengan frekuensi ${armAndalan.frekuensi} kali sewa. Dinamika preferensi pelanggan ini mengindikasikan pergeseran tren pasar musiman pada periode ${namaPeriode}.`;
      rekomendasi = `Alih-alih menambah unit secara permanen, manajemen disarankan menerapkan strategi **Dynamic Pricing (Penyesuaian Tarif Dinamis)** sebesar 5-10% khusus pada unit [${armAndalan.nama}] saat peak season, serta menawarkan opsi cross-selling (bundling) unit alternatif untuk mendistribusikan beban permintaan.`;
    } else if (jumlahArmadaUnik > 1) {
      diagnosa = `Distribusi permintaan sewa pada periode ${namaPeriode} terpantau cukup merata di antara ${jumlahArmadaUnik} jenis armada yang berbeda, dengan total perolehan bersih ${formatRupiah(rekap.totalPendapatan)}.`;
      rekomendasi = `Pertahankan struktur tarif saat ini. Fokuskan strategi pemasaran bulanan pada kampanye tematik (seperti paket liburan keluarga atau kendaraan bisnis) untuk menjaga keseimbangan utilisasi seluruh aset kendaraan perusahaan.`;
    } else {
      diagnosa = `Kinerja finansial stabil dengan perolehan ${formatRupiah(rekap.totalPendapatan)} dari ${rekap.totalTransaksi} transaksi sukses.`;
      rekomendasi = `Evaluasi efisiensi biaya perawatan berkala armada guna memaksimalkan margin laba bersih perusahaan pada siklus operasional berikutnya.`;
    }

    return { statusKritis, judul: statusKritis ? "Atensi Eksekutif: Evaluasi Risiko Operasional" : "Analisis Strategis & Rekomendasi Taktis (BI)", diagnosa, rekomendasi };
  }, [rekap, analisisArmada, bulan, tahun]);

  // Ekspor PDF
  const eksporPDF = () => {
    const doc = new jsPDF('landscape');
    const judul = `Laporan Analisis Eksekutif & BI - ${NAMA_PERUSAHAAN}`;
    const periode = bulan ? `Periode: ${namaBulanIndonesia(parseInt(bulan)-1)} ${tahun}` : `Periode: Tahun ${tahun}`;
    doc.setFontSize(16); doc.setFont("helvetica", "bold"); doc.text(judul, 14, 20);
    doc.setFontSize(10); doc.setFont("helvetica", "normal"); doc.text(periode, 14, 28);
    
    const tableColumn = ["No", "ID Transaksi", "Tanggal", "Pelanggan", "Kendaraan", "Metode", "Harga Sewa", "Denda", "Total"];
    const tableRows: any[] = [];
    data.forEach((t, i) => {
      tableRows.push([
        i + 1, t.id_transaksi.split('-')[0].toUpperCase(), t.tanggal_sewa,
        t.pemesanan?.users?.nama, t.kendaraan?.nama_kendaraan, t.metode_pembayaran,
        formatRupiah(t.total_harga), formatRupiah(t.denda || 0), formatRupiah(Number(t.total_harga) + Number(t.denda || 0))
      ]);
    });
    autoTable(doc, { head: [tableColumn], body: tableRows, startY: 36, theme: 'grid', styles: { fontSize: 8 }, headStyles: { fillColor: [37, 99, 235] } });
    doc.save(`Laporan_BI_${bulan ? bulan+'-' : ''}${tahun}.pdf`);
  };

  // Ekspor Excel
  const eksporExcel = () => {
    const dataExcel = data.map((t, i) => ({
      'No': i + 1, 'ID Transaksi': t.id_transaksi, 'Tanggal Sewa': t.tanggal_sewa,
      'Pelanggan': t.pemesanan?.users?.nama, 'Kendaraan': t.kendaraan?.nama_kendaraan,
      'Metode Bayar': t.metode_pembayaran, 'Status': t.status_pembayaran,
      'Harga Sewa': Number(t.total_harga), 'Denda': Number(t.denda || 0), 'Total Pendapatan': Number(t.total_harga) + Number(t.denda || 0)
    }));
    const ws = XLSX.utils.json_to_sheet(dataExcel);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Rekap BI");
    XLSX.writeFile(wb, `Laporan_BI_${bulan ? bulan+'-' : ''}${tahun}.xlsx`);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Toolbar Filter */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-6 justify-between items-center">
        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          <div className="flex items-center text-gray-500"><Filter size={18} className="mr-2"/> Filter Periode BI:</div>
          <select value={tahun} onChange={e => setTahun(e.target.value)} className="border border-gray-300 rounded-lg px-4 py-2 outline-none font-semibold text-gray-700 bg-white">
            {pilihanTahun.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <select value={bulan} onChange={e => setBulan(e.target.value)} className="border border-gray-300 rounded-lg px-4 py-2 outline-none font-semibold text-gray-700 bg-white">
            <option value="">Semua Bulan (Tahunan)</option>
            {Array.from({length: 12}).map((_, i) => (
              <option key={i} value={i+1}>{namaBulanIndonesia(i)}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <button onClick={eksporPDF} disabled={data.length === 0} className="flex-1 md:flex-none flex items-center justify-center px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition disabled:opacity-50 font-medium shadow-sm text-sm">
            <FileText size={16} className="mr-2"/> Ekspor PDF
          </button>
          <button onClick={eksporExcel} disabled={data.length === 0} className="flex-1 md:flex-none flex items-center justify-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition disabled:opacity-50 font-medium shadow-sm text-sm">
            <Download size={16} className="mr-2"/> Ekspor Excel
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-blue-600">
          <Loader2 size={40} className="animate-spin mb-4" />
          <p className="font-medium">Menghitung model analitik Business Intelligence...</p>
        </div>
      ) : (
        <>
          {/* Modul 1: True Business Intelligence (Decision Engine) */}
          <div className={`p-6 rounded-2xl shadow-xl text-white relative overflow-hidden bg-gradient-to-br ${businessIntelligenceReport.statusKritis ? 'from-slate-900 via-rose-950 to-red-950' : 'from-slate-900 via-blue-950 to-indigo-950'}`}>
            <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 opacity-10 pointer-events-none">
              <Sparkles size={240} />
            </div>
            
            <div className="flex items-center space-x-3 mb-4">
              <div className={`p-2.5 rounded-xl border ${businessIntelligenceReport.statusKritis ? 'bg-red-500/20 text-red-300 border-red-400/20' : 'bg-blue-500/20 text-amber-300 border-blue-400/20'}`}>
                {businessIntelligenceReport.statusKritis ? <AlertTriangle size={22} /> : <Sparkles size={22} />}
              </div>
              <div>
                <h2 className="text-lg font-bold">{businessIntelligenceReport.judul}</h2>
                <p className="text-xs text-blue-200">Sistem Pendukung Keputusan Berbasis Analisis Portofolio Dinamis.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10">
                <div className="flex items-center text-blue-200 text-xs mb-1 font-medium"><Award size={14} className="mr-1 text-amber-400" /> Armada Terfavorit Bulan Ini</div>
                <p className="font-bold text-base truncate">{analisisArmada.length > 0 ? analisisArmada[0].nama : 'Belum ada data'}</p>
                <p className="text-[11px] text-gray-300 mt-0.5">Memimpin volume transaksi tertinggi.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10">
                <div className="flex items-center text-blue-200 text-xs mb-1 font-medium"><ShieldAlert size={14} className="mr-1 text-red-400" /> Rasio Denda Keterlambatan</div>
                <p className="font-bold text-base">{rekap.rasioDendaTerhadapSewa.toFixed(1)}% dari total sewa</p>
                <p className="text-[11px] text-gray-300 mt-0.5">
                  {rekap.rasioDendaTerhadapSewa > 8 ? 'Perlu tindakan disipliner operasional.' : 'Tingkat kepatuhan sewa normal.'}
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10">
                <div className="flex items-center text-blue-200 text-xs mb-1 font-medium"><TrendingUp size={14} className="mr-1 text-emerald-400" /> Rata-Rata Nilai Transaksi (AOV)</div>
                <p className="font-bold text-base">{formatRupiah(rekap.rataRata)}</p>
                <p className="text-[11px] text-gray-300 mt-0.5">Nilai ekonomis per pemesanan sukses.</p>
              </div>
            </div>

            {/* Kotak Diagnosa & Rekomendasi Preskriptif */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-white/10 text-xs sm:text-sm">
              <div className="bg-black/20 p-4 rounded-xl border border-white/10 space-y-1.5">
                <p className="text-amber-300 font-bold uppercase text-[11px] tracking-wider">1. Analisis Diagnostik Permintaan Pasar</p>
                <p className="text-gray-200 leading-relaxed">{businessIntelligenceReport.diagnosa}</p>
              </div>
              <div className="bg-black/20 p-4 rounded-xl border border-white/10 space-y-1.5">
                <p className="text-emerald-300 font-bold uppercase text-[11px] tracking-wider">2. Kebijakan Taktis Eksekutif (Prescriptive Policy)</p>
                <p className="text-gray-200 leading-relaxed">{businessIntelligenceReport.rekomendasi}</p>
              </div>
            </div>
          </div>

          {/* Modul 2: Kartu KPI Finansial */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm text-center">
              <p className="text-sm text-gray-500 mb-1">Total Transaksi Lunas</p>
              <p className="text-2xl font-bold text-gray-900">{rekap.totalTransaksi}</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm text-center">
              <p className="text-sm text-gray-500 mb-1">Pendapatan Sewa Murni</p>
              <p className="text-xl font-bold text-blue-600">{formatRupiah(rekap.totalSewaMurni)}</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm text-center">
              <p className="text-sm text-gray-500 mb-1">Akumulasi Denda</p>
              <p className="text-xl font-bold text-red-500">{formatRupiah(rekap.totalDenda)}</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm text-center bg-blue-50/40">
              <p className="text-sm text-blue-700 font-semibold mb-1">Total Pendapatan Bersih</p>
              <p className="text-xl font-extrabold text-blue-800">{formatRupiah(rekap.totalPendapatan)}</p>
            </div>
          </div>

          {/* Modul 3: Visualisasi Grafik & Preferensi Pembayaran */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Grafik Tren Pendapatan (2 Kolom) */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm lg:col-span-2 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-gray-900">
                    Tren Analisis Pendapatan ({bulan ? `Harian - ${namaBulanIndonesia(parseInt(bulan)-1)} ${tahun}` : `Bulanan - Tahun ${tahun}`})
                  </h3>
                  <span className="text-xs text-blue-600 bg-blue-50 px-2.5 py-1 rounded border border-blue-200 font-medium">Time-Series Analytics</span>
                </div>
                <div className="h-64 w-full">
                  {chartData.length === 0 ? (
                    <div className="w-full h-full flex items-center justify-center border-2 border-dashed rounded-xl text-gray-400 text-sm">Tidak ada data pendapatan pada periode ini.</div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: bulan ? 10 : 12, fill: '#64748b'}} interval={bulan ? 2 : 0} />
                        <YAxis tickFormatter={(val) => `Rp${(val/1000000).toFixed(0)}Jt`} axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                        <Tooltip cursor={{fill: '#f8fafc'}} formatter={(val: any) => [formatRupiah(Number(val)), 'Pendapatan']} labelStyle={{color: 'black', fontWeight: 'bold'}} />
                        <Bar dataKey="Pendapatan" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={bulan ? 12 : 30} />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>
            </div>

            {/* Komposisi Metode Pembayaran */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Preferensi Pembayaran</h3>
                <p className="text-xs text-gray-500 mb-2">Distribusi kanal transaksi pelanggan.</p>
                
                <div className="h-64 w-full relative">
                  {analisisPembayaran.length === 0 ? (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs border border-dashed rounded-lg">Belum ada data pembayaran.</div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Tooltip formatter={(val: any, name: any, item: any) => [`${val} Transaksi (${item.payload.persen}%)`, name]} />
                        <Pie
                          data={analisisPembayaran}
                          cx="50%" cy="45%"
                          innerRadius={45} outerRadius={75}
                          paddingAngle={4}
                          dataKey="value"
                        >
                          {analisisPembayaran.map((entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Legend 
                          verticalAlign="bottom" 
                          height={36} 
                          iconSize={10}
                          formatter={(value, entry: any) => <span className="text-xs text-gray-700 font-medium">{value} ({entry.payload.persen}%)</span>}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Modul 4: Tabel Peringkat Kinerja Armada (Portfolio BI) */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="font-bold text-gray-900">Analisis Portofolio Kinerja Armada</h3>
              <p className="text-xs text-gray-500 mt-0.5">Peringkat kontribusi finansial dan frekuensi sewa kendaraan pada periode terpilih.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-gray-50 border-b text-gray-600 font-semibold text-xs uppercase">
                  <tr>
                    <th className="px-6 py-3.5">Peringkat</th>
                    <th className="px-6 py-3.5">Nama Kendaraan</th>
                    <th className="px-6 py-3.5 text-center">Frekuensi Disewa</th>
                    <th className="px-6 py-3.5 text-right">Total Kontribusi Pendapatan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {analisisArmada.length === 0 ? (
                    <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-400">Tidak ada data portofolio armada pada periode ini.</td></tr>
                  ) : (
                    analisisArmada.map((item, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/60">
                        <td className="px-6 py-3.5 font-bold text-gray-500">#{idx + 1}</td>
                        <td className="px-6 py-3.5 font-semibold text-gray-900">{item.nama}</td>
                        <td className="px-6 py-3.5 text-center">
                          <span className="bg-blue-50 text-blue-700 font-bold px-2.5 py-1 rounded-md text-xs">{item.frekuensi}x Sewa</span>
                        </td>
                        <td className="px-6 py-3.5 text-right font-extrabold text-blue-600">{formatRupiah(item.totalPendapatan)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}