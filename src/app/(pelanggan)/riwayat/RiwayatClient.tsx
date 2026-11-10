'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { formatTanggal, formatRupiah, hitungJumlahHari } from '@/lib/formatters';
import { batalkanPemesanan } from '@/app/actions/pelanggan-transaksi';
import { Car, Calendar, MapPin, Search, ExternalLink, CreditCard, Ban, RefreshCw, X, CheckCircle } from 'lucide-react';

export default function RiwayatClient({ initialData, filterAktif, pageAktif }: any) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isPaying, setIsPaying] = useState(false);
  
  // State untuk Modal Detail
  const [modalData, setModalData] = useState<any | null>(null);

  const TABS = [
    { id: 'semua', label: 'Semua' },
    { id: 'menunggu_pembayaran', label: 'Menunggu Pembayaran' },
    { id: 'dibayar', label: 'Dibayar' },
    { id: 'diambil', label: 'Sedang Disewa' },
    { id: 'selesai', label: 'Selesai' },
    { id: 'dibatalkan', label: 'Dibatalkan' }
  ];

  const statusColors: Record<string, string> = {
    'menunggu_pembayaran': 'bg-amber-100 text-amber-800 border-amber-200',
    'dibayar': 'bg-blue-100 text-blue-800 border-blue-200',
    'diambil': 'bg-indigo-100 text-indigo-800 border-indigo-200',
    'selesai': 'bg-green-100 text-green-800 border-green-200',
    'dibatalkan': 'bg-red-100 text-red-800 border-red-200',
  };

  const gantiFilter = (status: string) => {
    router.push(`/riwayat?status=${status}&page=1`);
  };

  const gantiHalaman = (page: number) => {
    router.push(`/riwayat?status=${filterAktif}&page=${page}`);
  };

  async function handleBayar(pesanan: any) {
    setIsPaying(true);
    try {
      const res = await fetch('/api/pembayaran/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_pemesanan: pesanan.id_pemesanan }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      if (typeof (window as any).snap !== 'undefined') {
        (window as any).snap.pay(data.token, {
          onSuccess: () => { alert('Pembayaran sukses!'); setModalData(null); router.refresh(); },
          onPending: () => { alert('Menunggu konfirmasi pembayaran.'); setModalData(null); router.refresh(); },
          onError: () => { alert('Pembayaran gagal.'); router.refresh(); },
          onClose: () => { router.refresh(); }
        });
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsPaying(false);
    }
  }

  async function handleCekStatus(id_pemesanan: string) {
    setIsPaying(true);
    try {
      const res = await fetch('/api/pembayaran/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_pemesanan }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      alert(`Status transaksi: ${data.status.toUpperCase()}`);
      setModalData(null);
      router.refresh();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsPaying(false);
    }
  }

  async function handleBatal(id_pemesanan: string) {
    if (!confirm('Batalkan pemesanan ini?')) return;
    startTransition(async () => {
      await batalkanPemesanan(id_pemesanan);
      setModalData(null);
      router.refresh();
    });
  }

  return (
    <div className="space-y-6">
      <Script src={process.env.NEXT_PUBLIC_MIDTRANS_SNAP_URL || 'https://app.sandbox.midtrans.com/snap/snap.js'} data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY} strategy="lazyOnload" />

      {/* TABS Filter */}
      <div className="flex overflow-x-auto hide-scrollbar space-x-2 pb-2">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => gantiFilter(tab.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
              filterAktif === tab.id 
                ? 'bg-gray-900 text-white border-gray-900' 
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* List Riwayat */}
      {initialData.data.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center shadow-sm">
          <Search className="mx-auto text-gray-300 mb-3" size={48} />
          <h3 className="text-lg font-bold text-gray-900">Belum ada pemesanan</h3>
          <p className="text-gray-500 mt-1 mb-6">Anda belum memiliki riwayat pemesanan dengan status ini.</p>
          <button onClick={() => router.push('/pencarian-pintar')} className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
            Mulai Cari Mobil
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {initialData.data.map((p: any) => {
            const mobil = p.kendaraan;
            const jumlahHari = hitungJumlahHari(p.tanggal_sewa, p.tanggal_kembali);
            const totalBayar = p.transaksi?.[0]?.total_harga || (mobil.harga_sewa * jumlahHari);

            return (
              <div key={p.id_pemesanan} className="bg-white rounded-2xl border border-gray-200 p-5 md:p-6 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center hover:shadow-md transition">
                <div className="w-full md:w-40 h-28 bg-gray-50 rounded-xl flex items-center justify-center shrink-0 border border-gray-100 p-2">
                  {mobil.foto_url ? (
                    <img src={mobil.foto_url} alt={mobil.nama_kendaraan} className="w-full h-full object-contain" />
                  ) : <Car size={32} className="text-gray-300" />}
                </div>

                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap justify-between items-start gap-2">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{mobil.nama_kendaraan}</h3>
                      <p className="text-xs text-gray-500 font-mono">ID: {p.id_pemesanan.split('-')[0].toUpperCase()}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase border ${statusColors[p.status_pemesanan]}`}>
                      {p.status_pemesanan.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Calendar size={16} className="mr-2 text-gray-400" />
                      {formatTanggal(p.tanggal_sewa).split(',')[0]} - {formatTanggal(p.tanggal_kembali).split(',')[0]}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin size={16} className="mr-2 text-gray-400" />
                      {p.rute_perjalanan.length > 20 ? p.rute_perjalanan.substring(0,20)+'...' : p.rute_perjalanan}
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-auto md:text-right border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 flex flex-row md:flex-col justify-between items-center md:items-end gap-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Total Harga</p>
                    <p className="text-lg font-bold text-blue-600">{formatRupiah(totalBayar)}</p>
                  </div>
                  <button 
                    onClick={() => setModalData({ ...p, totalBayar, jumlahHari })}
                    className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg text-sm font-semibold transition"
                  >
                    Lihat Detail
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {initialData.totalPages > 1 && (
        <div className="flex justify-center space-x-2 pt-4">
          {Array.from({ length: initialData.totalPages }).map((_, idx) => (
            <button
              key={idx} onClick={() => gantiHalaman(idx + 1)}
              className={`w-10 h-10 rounded-lg font-bold text-sm transition ${pageAktif === idx + 1 ? 'bg-blue-600 text-white shadow-md' : 'bg-white border text-gray-600 hover:bg-gray-50'}`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}

      {/* MODAL DETAIL & TIMELINE */}
      {modalData && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
            
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center z-10">
              <h2 className="text-xl font-bold text-gray-900">Detail Pemesanan</h2>
              <button onClick={() => setModalData(null)} className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-8">
              {/* Linimasa (Timeline) */}
              <div>
                <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Status Perjalanan</h4>
                {modalData.status_pemesanan === 'dibatalkan' ? (
                  <div className="bg-red-50 p-4 rounded-xl border border-red-100 flex items-start">
                    <Ban className="text-red-500 mr-3 mt-0.5" size={20} />
                    <div>
                      <p className="font-bold text-red-700">Pemesanan Dibatalkan</p>
                      <p className="text-sm text-red-600 mt-1">Transaksi ini tidak dapat dilanjutkan.</p>
                    </div>
                  </div>
                ) : (
                  <div className="relative flex justify-between">
                    <div className="absolute top-4 left-4 right-4 h-1 bg-gray-200 rounded-full z-0"></div>
                    <div className={`absolute top-4 left-4 h-1 rounded-full z-0 transition-all duration-500 ${
                      modalData.status_pemesanan === 'selesai' ? 'w-[100%] bg-blue-600' :
                      modalData.status_pemesanan === 'diambil' ? 'w-[66%] bg-blue-600' :
                      modalData.status_pemesanan === 'dibayar' ? 'w-[33%] bg-blue-600' : 'w-0 bg-blue-600'
                    }`}></div>
                    
                    {['Menunggu', 'Dibayar', 'Diambil', 'Selesai'].map((step, idx) => {
                      const isActive = 
                        (idx === 0) ||
                        (idx === 1 && ['dibayar','diambil','selesai'].includes(modalData.status_pemesanan)) ||
                        (idx === 2 && ['diambil','selesai'].includes(modalData.status_pemesanan)) ||
                        (idx === 3 && modalData.status_pemesanan === 'selesai');
                        
                      return (
                        <div key={step} className="relative z-10 flex flex-col items-center">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center border-4 border-white shadow-sm transition-colors ${isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                            {isActive ? <CheckCircle size={18} /> : <div className="w-2.5 h-2.5 bg-gray-400 rounded-full"></div>}
                          </div>
                          <span className={`text-xs font-bold mt-2 ${isActive ? 'text-blue-700' : 'text-gray-400'}`}>{step}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Rincian Biaya */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider border-b pb-2">Rincian Tagihan</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Harga Sewa ({modalData.jumlahHari} Hari)</span>
                    <span>{formatRupiah(modalData.kendaraan.harga_sewa)} x {modalData.jumlahHari}</span>
                  </div>
                  {modalData.transaksi?.[0]?.denda > 0 && (
                    <div className="flex justify-between text-red-600">
                      <span>Denda Keterlambatan/Kerusakan</span>
                      <span>+ {formatRupiah(modalData.transaksi[0].denda)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-extrabold text-gray-900 pt-2 border-t mt-2">
                    <span>Total Keseluruhan</span>
                    <span className="text-blue-600">{formatRupiah(modalData.totalBayar + (modalData.transaksi?.[0]?.denda || 0))}</span>
                  </div>
                </div>
              </div>

              {/* Data Kendaraan & Rute */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 mb-1">Kendaraan</p>
                  <p className="font-semibold text-gray-900">{modalData.kendaraan.nama_kendaraan} ({modalData.kendaraan.plat_nomor})</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Rute</p>
                  <p className="font-semibold text-gray-900">{modalData.rute_perjalanan}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Dokumen</p>
                  <p className="font-semibold text-gray-900">
                    Verifikasi: <span className={modalData.status_verifikasi === 'valid' ? 'text-green-600' : 'text-amber-600'}>{modalData.status_verifikasi.toUpperCase()}</span>
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Metode Bayar</p>
                  <p className="font-semibold text-gray-900 uppercase">{modalData.transaksi?.[0]?.metode_pembayaran?.replace('_', ' ') || '-'}</p>
                </div>
              </div>

              {/* Action Buttons */}
              {modalData.status_pemesanan === 'menunggu_pembayaran' && (
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
                  <button 
                    onClick={() => handleCekStatus(modalData.id_pemesanan)} disabled={isPaying || isPending}
                    className="flex-1 px-4 py-3 bg-white text-gray-700 font-semibold rounded-xl border border-gray-300 hover:bg-gray-50 transition flex items-center justify-center disabled:opacity-50"
                  >
                    <RefreshCw size={16} className={`mr-2 ${isPaying ? 'animate-spin' : ''}`} /> Perbarui Status
                  </button>
                  <button 
                    onClick={() => handleBatal(modalData.id_pemesanan)} disabled={isPaying || isPending}
                    className="flex-1 px-4 py-3 bg-white text-red-600 font-semibold rounded-xl border border-red-200 hover:bg-red-50 transition flex items-center justify-center disabled:opacity-50"
                  >
                    <Ban size={16} className="mr-2" /> Batalkan
                  </button>
                  <button 
                    onClick={() => handleBayar(modalData)} disabled={isPaying || isPending}
                    className="flex-[1.5] px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition shadow-lg shadow-blue-200 flex items-center justify-center disabled:bg-blue-400"
                  >
                    <CreditCard size={16} className="mr-2" /> {isPaying ? 'Memuat...' : 'Bayar Sekarang'}
                  </button>
                </div>
              )}
              {modalData.status_pemesanan === 'dibatalkan' && (
                <div className="flex pt-4 border-t border-gray-100">
                  <button 
                    onClick={() => { setModalData(null); router.push('/pencarian-pintar'); }}
                    className="w-full px-4 py-3 bg-blue-50 text-blue-700 font-bold rounded-xl hover:bg-blue-100 transition"
                  >
                    Pesan Kendaraan Baru
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}