'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { formatTanggal, formatRupiah, hitungJumlahHari } from '@/lib/formatters';
import { batalkanPemesanan } from '@/app/actions/pelanggan-transaksi';
import { Car, Calendar, MapPin, Search, ExternalLink, CreditCard, Ban, RefreshCw, X, CheckCircle, Info } from 'lucide-react';

export default function RiwayatClient({ initialData, filterAktif, pageAktif }: any) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isPaying, setIsPaying] = useState(false);
  
  const [modalData, setModalData] = useState<any | null>(null);

  const TABS = [
    { id: 'semua', label: 'Semua Status' },
    { id: 'menunggu_pembayaran', label: 'Menunggu Pembayaran' },
    { id: 'dibayar', label: 'Dibayar' },
    { id: 'diambil', label: 'Sedang Disewa' },
    { id: 'selesai', label: 'Selesai' },
    { id: 'dibatalkan', label: 'Dibatalkan' }
  ];

  const statusPemesananColors: Record<string, string> = {
    'menunggu_pembayaran': 'bg-amber-100 text-amber-800 border-amber-200',
    'dibayar': 'bg-blue-100 text-blue-800 border-blue-200',
    'diambil': 'bg-indigo-100 text-indigo-800 border-indigo-200',
    'selesai': 'bg-green-100 text-green-800 border-green-200',
    'dibatalkan': 'bg-red-100 text-red-800 border-red-200',
  };

  const statusPembayaranColors: Record<string, string> = {
    'settlement': 'bg-emerald-100 text-emerald-800 border-emerald-200',
    'pending': 'bg-amber-100 text-amber-800 border-amber-200',
    'expire': 'bg-rose-100 text-rose-800 border-rose-200',
    'cancel': 'bg-rose-100 text-rose-800 border-rose-200',
    'deny': 'bg-rose-100 text-rose-800 border-rose-200',
    'belum_bayar': 'bg-gray-100 text-gray-700 border-gray-200'
  };

  const statusVerifikasiColors: Record<string, string> = {
    'menunggu': 'bg-yellow-50 text-yellow-700 border-yellow-200',
    'valid': 'bg-green-50 text-green-700 border-green-200',
    'ditolak': 'bg-red-50 text-red-700 border-red-200',
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
          onSuccess: () => { alert('Pembayaran berhasil dikonfirmasi!'); setModalData(null); router.refresh(); },
          onPending: () => { alert('Menunggu konfirmasi pembayaran dari sistem.'); setModalData(null); router.refresh(); },
          onError: () => { alert('Pembayaran gagal atau dibatalkan.'); router.refresh(); },
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
      alert(`Status transaksi saat ini: ${data.status.toUpperCase()}`);
      setModalData(null);
      router.refresh();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsPaying(false);
    }
  }

  async function handleBatal(id_pemesanan: string) {
    if (!confirm('Apakah Anda yakin ingin membatalkan pemesanan ini?')) return;
    startTransition(async () => {
      await batalkanPemesanan(id_pemesanan);
      setModalData(null);
      router.refresh();
    });
  }

  return (
    <div className="space-y-6">
      <Script src={process.env.NEXT_PUBLIC_MIDTRANS_SNAP_URL || 'https://app.sandbox.midtrans.com/snap/snap.js'} data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY} strategy="lazyOnload" />

      {/* Tabs Filter */}
      <div className="flex overflow-x-auto hide-scrollbar space-x-2 pb-2">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => gantiFilter(tab.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
              filterAktif === tab.id 
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm' 
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Daftar Pemesanan */}
      {initialData.data.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center shadow-sm">
          <Search className="mx-auto text-gray-300 mb-3" size={48} />
          <h3 className="text-lg font-bold text-gray-900">Belum ada pemesanan</h3>
          <p className="text-gray-500 mt-1 mb-6">Anda tidak memiliki daftar pemesanan pada kategori ini.</p>
          <button onClick={() => router.push('/pencarian-pintar')} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition">
            Mulai Cari Mobil
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {initialData.data.map((p: any) => {
            const mobil = p.kendaraan;
            const jumlahHari = hitungJumlahHari(p.tanggal_sewa, p.tanggal_kembali);
            const totalBayar = p.transaksi?.[0]?.total_harga || (mobil.harga_sewa * jumlahHari);
            const statusPembayaranTrx = p.transaksi?.[0]?.status_pembayaran || 'belum_bayar';

            return (
              <div key={p.id_pemesanan} className="bg-white rounded-2xl border border-gray-200 p-5 md:p-6 shadow-sm hover:shadow-md transition space-y-4">
                
                {/* Header Kartu: Foto, Nama, & 3 Badge */}
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                  <div className="w-full md:w-36 h-24 bg-gray-50 rounded-xl flex items-center justify-center shrink-0 border border-gray-100 p-2">
                    {mobil.foto_url ? (
                      <img src={mobil.foto_url} alt={mobil.nama_kendaraan} className="w-full h-full object-contain" />
                    ) : <Car size={32} className="text-gray-300" />}
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{mobil.nama_kendaraan}</h3>
                        <p className="text-xs text-gray-500 font-mono">ID Booking: {p.id_pemesanan.split('-')[0].toUpperCase()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Total Biaya</p>
                        <p className="text-lg font-extrabold text-blue-600">{formatRupiah(totalBayar)}</p>
                      </div>
                    </div>

                    {/* TIGA BADGE: status_pemesanan, status_pembayaran, status_verifikasi */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase border ${statusPemesananColors[p.status_pemesanan]}`}>
                        Pemesanan: {p.status_pemesanan.replace('_', ' ')}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase border ${statusPembayaranColors[statusPembayaranTrx]}`}>
                        Bayar: {statusPembayaranTrx.replace('_', ' ')}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase border ${statusVerifikasiColors[p.status_verifikasi]}`}>
                        Dokumen: {p.status_verifikasi}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Body Kartu: Info Tanggal & Rute */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm pt-2 border-t border-gray-100">
                  <div className="flex items-center text-gray-600">
                    <Calendar size={16} className="mr-2 text-gray-400 shrink-0" />
                    <span>{formatTanggal(p.tanggal_sewa).split(',')[0]} - {formatTanggal(p.tanggal_kembali).split(',')[0]} ({jumlahHari} Hari)</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin size={16} className="mr-2 text-gray-400 shrink-0" />
                    <span>Rute: {p.rute_perjalanan}</span>
                  </div>
                </div>

                {/* Footer Kartu: Tombol Aksi Sesuai Status */}
                <div className="flex flex-wrap justify-end gap-2 pt-2">
                  <button 
                    onClick={() => setModalData({ ...p, totalBayar, jumlahHari })}
                    className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-xl text-sm font-semibold transition flex items-center"
                  >
                    <Info size={16} className="mr-1.5" /> Detail & Linimasa
                  </button>

                  {p.status_pemesanan === 'menunggu_pembayaran' && (
                    <>
                      <button 
                        onClick={() => handleCekStatus(p.id_pemesanan)} disabled={isPaying || isPending}
                        className="px-4 py-2 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 rounded-xl text-sm font-semibold transition flex items-center disabled:opacity-50"
                      >
                        <RefreshCw size={14} className={`mr-1.5 ${isPaying ? 'animate-spin' : ''}`} /> Perbarui Status
                      </button>
                      <button 
                        onClick={() => handleBatal(p.id_pemesanan)} disabled={isPaying || isPending}
                        className="px-4 py-2 bg-white text-red-600 border border-red-200 hover:bg-red-50 rounded-xl text-sm font-semibold transition flex items-center disabled:opacity-50"
                      >
                        <Ban size={14} className="mr-1.5" /> Batalkan
                      </button>
                      <button 
                        onClick={() => handleBayar(p)} disabled={isPaying || isPending}
                        className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition flex items-center shadow-sm disabled:opacity-50"
                      >
                        <CreditCard size={14} className="mr-1.5" /> Bayar Sekarang
                      </button>
                    </>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Navigasi Paginasi */}
      {initialData.totalPages > 1 && (
        <div className="flex justify-center space-x-2 pt-4">
          {Array.from({ length: initialData.totalPages }).map((_, idx) => (
            <button
              key={idx} onClick={() => gantiHalaman(idx + 1)}
              className={`w-10 h-10 rounded-xl font-bold text-sm transition ${pageAktif === idx + 1 ? 'bg-blue-600 text-white shadow-md' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}

      {/* Modal Detail & Linimasa */}
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
              {/* Linimasa Status */}
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Linimasa Status</h4>
                {modalData.status_pemesanan === 'dibatalkan' ? (
                  <div className="bg-red-50 p-4 rounded-xl border border-red-100 flex items-start">
                    <Ban className="text-red-500 mr-3 mt-0.5 shrink-0" size={20} />
                    <div>
                      <p className="font-bold text-red-700">Pemesanan Dibatalkan</p>
                      <p className="text-sm text-red-600 mt-0.5">Jadwal kendaraan telah dibebaskan kembali.</p>
                    </div>
                  </div>
                ) : (
                  <div className="relative flex justify-between px-2">
                    <div className="absolute top-4 left-6 right-6 h-1 bg-gray-200 rounded-full z-0"></div>
                    <div className={`absolute top-4 left-6 h-1 rounded-full z-0 transition-all duration-500 ${
                      modalData.status_pemesanan === 'selesai' ? 'w-[88%] bg-blue-600' :
                      modalData.status_pemesanan === 'diambil' ? 'w-[58%] bg-blue-600' :
                      modalData.status_pemesanan === 'dibayar' ? 'w-[28%] bg-blue-600' : 'w-0 bg-blue-600'
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
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Rincian Biaya</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Sewa ({modalData.jumlahHari} Hari @ {formatRupiah(modalData.kendaraan.harga_sewa)})</span>
                    <span className="font-semibold text-gray-900">{formatRupiah(modalData.kendaraan.harga_sewa * modalData.jumlahHari)}</span>
                  </div>
                  {modalData.transaksi?.[0]?.denda > 0 && (
                    <div className="flex justify-between text-red-600">
                      <span>Denda Keterlambatan / Kerusakan</span>
                      <span className="font-semibold">+ {formatRupiah(modalData.transaksi[0].denda)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-extrabold text-gray-900 pt-3 border-t border-gray-200 mt-2">
                    <span>Total Keseluruhan</span>
                    <span className="text-blue-600">{formatRupiah(modalData.totalBayar + (modalData.transaksi?.[0]?.denda || 0))}</span>
                  </div>
                </div>
              </div>

              {/* Detail Dokumen Verifikasi */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Verifikasi Dokumen Identitas</h4>
                <div className="flex flex-wrap gap-4 text-sm">
                  {modalData.ktp_signed_url ? (
                    <a href={modalData.ktp_signed_url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline flex items-center font-medium">
                      Lihat Foto KTP <ExternalLink size={14} className="ml-1" />
                    </a>
                  ) : <span className="text-gray-400 text-xs">Foto KTP tidak tersedia</span>}
                  
                  {modalData.sim_signed_url ? (
                    <a href={modalData.sim_signed_url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline flex items-center font-medium">
                      Lihat Foto SIM <ExternalLink size={14} className="ml-1" />
                    </a>
                  ) : <span className="text-gray-400 text-xs">Foto SIM tidak tersedia</span>}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}