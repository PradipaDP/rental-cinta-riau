'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { ambilDataDashboardBI } from '@/app/actions/admin-bi';
import { formatRupiah } from '@/lib/formatters';
import { namaBulanIndonesia } from '@/lib/terbilang';
import { 
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, 
  XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell 
} from 'recharts';
import { LayoutDashboard, TrendingUp, Car, CreditCard, Activity, Calendar, Lightbulb, CheckCircle2, AlertCircle } from 'lucide-react';

const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function DashboardBIClient({ initialData, tahunAktif }: { initialData: any, tahunAktif: string }) {
  const router = useRouter();
  const [data, setData] = useState(initialData);
  const [isUpdating, setIsUpdating] = useState(false);
  const supabase = createClient();

  const tahunSekarang = new Date().getFullYear();
  const pilihanTahun = Array.from({ length: 5 }, (_, i) => (tahunSekarang - i).toString());

  const formatDataBulanan = data.bulanan.map((d: any) => {
    const bulanIndex = parseInt(d.bulan.split('-')[1]) - 1;
    return {
      ...d,
      namaBulan: namaBulanIndonesia(bulanIndex).substring(0, 3),
      pendapatan: Number(d.total_pendapatan),
      jumlah: Number(d.jumlah_transaksi)
    };
  });

  const formatDataPopuler = data.kendaraanPopuler.map((d: any) => ({
    name: d.nama_kendaraan.length > 15 ? d.nama_kendaraan.substring(0, 15) + '...' : d.nama_kendaraan,
    jumlah: Number(d.jumlah_disewa),
    pendapatan: Number(d.sumbangan_pendapatan)
  }));

  const formatDataStatus = data.statusKomposisi.map((d: any) => ({
    name: d.status.toUpperCase(),
    value: Number(d.jumlah)
  }));

  // TRUE BI: ANALISIS DINAMIS BERDASARKAN VOLUME & PERFORMA TAHUN TERSEBUT
  const businessInsights = useMemo(() => {
    if (!formatDataBulanan.length) {
      return { 
        puncakBulan: '-', 
        kendaraanUnggulan: '-', 
        saranManajemen: 'Belum cukup data untuk melakukan analisis prediktif pada tahun ini.' 
      };
    }
    
    const bulanTerlaris = [...formatDataBulanan].sort((a, b) => b.pendapatan - a.pendapatan)[0];
    const mobilTop = formatDataPopuler.length > 0 ? formatDataPopuler[0].name : 'Belum ada data';
    const totalTransaksiTahunIni = data.ringkasan.totalTransaksi;
    const totalPendapatanTahunIni = data.ringkasan.totalPendapatan;

    let saran = '';

    // Logika Keputusan Dinamis Berdasarkan Volume Transaksi & Performa
    if (totalTransaksiTahunIni > 50) {
      saran = `Volume transaksi tahun ${tahunAktif} tergolong tinggi (${totalTransaksiTahunIni} transaksi) dengan perolehan ${formatRupiah(totalPendapatanTahunIni)}. Manajemen direkomendasikan untuk menjadwalkan perawatan berkala (*preventive maintenance*) secara ketat pada unit ${mobilTop} guna menghindari down-time saat lonjakan permintaan.`;
    } else if (totalTransaksiTahunIni > 0 && totalTransaksiTahunIni <= 50) {
      saran = `Volume transaksi pada periode ${tahunAktif} berada pada kisaran moderat (${totalTransaksiTahunIni} transaksi). Fokus strategis manajemen adalah meningkatkan konversi pelanggan melalui program loyalitas serta promosi bundling di hari kerja (*weekday*).`;
    } else {
      saran = `Belum tercatat aktivitas transaksi yang signifikan pada tahun ${tahunAktif}. Direkomendasikan untuk meninjau kembali strategi pemasaran digital dan mengevaluasi struktur harga sewa kompetitif di wilayah Pekanbaru.`;
    }

    return {
      puncakBulan: bulanTerlaris ? bulanTerlaris.namaBulan : '-',
      kendaraanUnggulan: mobilTop,
      saranManajemen: saran
    };
  }, [formatDataBulanan, formatDataPopuler, data, tahunAktif]);

  const fetchLatestData = useCallback(async () => {
    setIsUpdating(true);
    try {
      const newData = await ambilDataDashboardBI(tahunAktif);
      setData(newData);
    } catch (error) {
      console.error("Gagal memuat data realtime", error);
    }
    setTimeout(() => setIsUpdating(false), 800);
  }, [tahunAktif]);

  useEffect(() => {
    setData(initialData);
    const channel = supabase.channel('dashboard-bi-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'transaksi' }, fetchLatestData)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'pemesanan' }, fetchLatestData)
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [initialData, fetchLatestData, supabase]);

  const CustomTooltipRupiah = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-lg text-sm">
          <p className="font-bold text-gray-900 mb-1">{label}</p>
          <p className="text-blue-600 font-semibold">
            {payload[0].name === 'pendapatan' || payload[0].name === 'Sumbangan' 
              ? formatRupiah(payload[0].value) 
              : `${payload[0].value} Transaksi`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Filter Tahun */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <LayoutDashboard className="mr-2 text-blue-600" size={24} /> Dashboard Business Intelligence & Analitik
          </h1>
          <p className="text-gray-500 text-sm mt-1">Pusat analisis data operasional dan rekomendasi keputusan strategis perusahaan.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <span className="relative flex h-3 w-3">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isUpdating ? 'bg-amber-400' : 'bg-green-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-3 w-3 ${isUpdating ? 'bg-amber-500' : 'bg-green-500'}`}></span>
            </span>
            <span className={isUpdating ? 'text-amber-600' : 'text-green-600'}>
              {isUpdating ? 'Memperbarui...' : 'Live Data'}
            </span>
          </div>
          
          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5">
            <Calendar size={16} className="text-gray-500 mr-2" />
            <select 
              value={tahunAktif} 
              onChange={(e) => router.push(`/admin?tahun=${e.target.value}`)}
              className="bg-transparent text-sm font-bold text-gray-700 outline-none cursor-pointer"
            >
              {pilihanTahun.map(t => <option key={t} value={t}>Tahun {t}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* MODUL BI: KOTAK REKOMENDASI KEPUTUSAN BISNIS DINAMIS */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-6 rounded-2xl shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 opacity-10 pointer-events-none">
          <Lightbulb size={200} />
        </div>
        <div className="flex items-center space-x-3 mb-3">
          <div className="p-2 bg-blue-500/30 rounded-lg text-amber-300">
            <Lightbulb size={24} />
          </div>
          <h2 className="text-lg font-bold">Rekomendasi Keputusan Eksekutif ({tahunAktif})</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4 text-sm">
          <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
            <p className="text-blue-200 text-xs">Bulan Puncak Pendapatan</p>
            <p className="font-bold text-lg mt-0.5">{businessInsights.puncakBulan} ({tahunAktif})</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
            <p className="text-blue-200 text-xs">Armada Unggulan Tahun Ini</p>
            <p className="font-bold text-lg mt-0.5 truncate">{businessInsights.kendaraanUnggulan}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
            <p className="text-blue-200 text-xs">Total Transaksi Sukses</p>
            <p className="font-bold text-lg mt-0.5">{data.ringkasan.totalTransaksi} Penyewaan</p>
          </div>
        </div>

        <div className="bg-blue-950/60 p-3.5 rounded-xl border border-blue-400/20 text-sm text-blue-100 flex items-start space-x-3">
          <CheckCircle2 size={18} className="text-emerald-400 mt-0.5 flex-shrink-0" />
          <div>
            <strong className="text-white">Saran Kebijakan Manajemen:</strong> {businessInsights.saranManajemen}
          </div>
        </div>
      </div>

      {/* 4 Kartu Ringkasan (KPIs) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Pendapatan ({tahunAktif})</p>
              <p className="text-2xl font-extrabold text-gray-900 mt-1">{formatRupiah(data.ringkasan.totalPendapatan)}</p>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><TrendingUp size={24} /></div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Transaksi Selesai</p>
              <p className="text-2xl font-extrabold text-gray-900 mt-1">{data.ringkasan.totalTransaksi} <span className="text-sm font-normal text-gray-500">penyewaan</span></p>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><Activity size={24} /></div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Status Armada Saat Ini</p>
              <div className="flex items-baseline space-x-2 mt-1">
                <p className="text-2xl font-extrabold text-green-600">{data.ringkasan.mobilTersedia}</p>
                <p className="text-sm font-medium text-gray-500">Tersedia /</p>
                <p className="text-lg font-bold text-amber-500">{data.ringkasan.mobilDisewa}</p>
                <p className="text-sm font-medium text-gray-500">Disewa</p>
              </div>
            </div>
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl"><Car size={24} /></div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Menunggu Pembayaran</p>
              <p className="text-2xl font-extrabold text-gray-900 mt-1">{data.ringkasan.pesananPending} <span className="text-sm font-normal text-gray-500">pesanan</span></p>
            </div>
            <div className="p-3 bg-rose-50 text-rose-600 rounded-xl"><CreditCard size={24} /></div>
          </div>
        </div>
      </div>

      {/* Grafik */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Tren Pendapatan ({tahunAktif})</h3>
          <div className="h-72 w-full">
            {formatDataBulanan.length === 0 ? (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm border-2 border-dashed rounded-xl">Belum ada data pendapatan tahun ini.</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={formatDataBulanan} margin={{ top: 10, right: 10, left: 20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPendapatan" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="namaBulan" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                  <YAxis tickFormatter={(val) => `Rp ${(val/1000000).toFixed(0)} Jt`} axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                  <Tooltip content={<CustomTooltipRupiah />} />
                  <Area type="monotone" dataKey="pendapatan" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorPendapatan)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Tren Jumlah Penyewaan ({tahunAktif})</h3>
          <div className="h-72 w-full">
            {formatDataBulanan.length === 0 ? (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm border-2 border-dashed rounded-xl">Belum ada data transaksi tahun ini.</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={formatDataBulanan} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="namaBulan" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} allowDecimals={false} />
                  <Tooltip content={<CustomTooltipRupiah />} cursor={{fill: '#f8fafc'}} />
                  <Bar dataKey="jumlah" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Top 5 Kendaraan Terpopuler</h3>
          <p className="text-xs text-gray-500 mb-6">Berdasarkan total transaksi penyewaan (All Time).</p>
          <div className="h-72 w-full">
            {formatDataPopuler.length === 0 ? (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm border-2 border-dashed rounded-xl">Belum ada data popularitas kendaraan.</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={formatDataPopuler} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} allowDecimals={false} />
                  <YAxis dataKey="name" type="category" width={100} axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#475569', fontWeight: 600}} />
                  <Tooltip content={<CustomTooltipRupiah />} cursor={{fill: '#f8fafc'}} />
                  <Bar dataKey="jumlah" name="Transaksi" fill="#f59e0b" radius={[0, 4, 4, 0]} barSize={24}>
                    {formatDataPopuler.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Komposisi Status Transaksi</h3>
          <p className="text-xs text-gray-500 mb-2">Perbandingan seluruh riwayat status transaksi.</p>
          <div className="h-64 w-full flex-1 relative">
            {formatDataStatus.length === 0 ? (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm border-2 border-dashed rounded-xl mt-4">Belum ada data status.</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ color: '#1e293b', fontWeight: 600 }}
                  />
                  <Pie
                    data={formatDataStatus}
                    cx="50%" cy="50%"
                    innerRadius={70} outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({name, percent = 0}) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    labelLine={false}
                  >
                    {formatDataStatus.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}