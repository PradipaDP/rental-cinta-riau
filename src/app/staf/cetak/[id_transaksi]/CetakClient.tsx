'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { NAMA_PERUSAHAAN, ALAMAT_PERUSAHAAN, PENANDATANGAN_NAMA, PENANDATANGAN_PEKERJAAN, PENANDATANGAN_JABATAN, PENANDATANGAN_ALAMAT, PENANDATANGAN_KTP, PENANDATANGAN_TELEPON, BATAS_HARI_PENARIKAN, PENGADILAN_NEGERI, TEMPAT_PENANDATANGANAN, DENDA_PERSEN_PER_HARI } from '@/lib/config';
import { formatRupiah, hitungJumlahHari, formatTanggal } from '@/lib/formatters';
import { terbilang, namaHariIndonesia, namaBulanIndonesia } from '@/lib/terbilang';
import { TEMPLATE_SURAT_PERJANJIAN } from '@/lib/surat-perjanjian';
import { Printer, ArrowLeft, FileText, FileCheck2 } from 'lucide-react';

export default function CetakClient({ transaksi, initialTab }: { transaksi: any; initialTab: string }) {
  const router = useRouter();
  const [tab, setTab] = useState(initialTab);
  const [jumlahRangkap, setJumlahRangkap] = useState(1);

  const pesanan = transaksi.pemesanan;
  const mobil = pesanan?.kendaraan;
  const pelanggan = pesanan?.users;

  const jumlahHari = hitungJumlahHari(transaksi.tanggal_sewa, transaksi.tanggal_kembali);
  const hargaPerHari = mobil?.harga_sewa || 0;
  const totalHarga = transaksi.total_harga;
  const denda = transaksi.denda || 0;
  const totalKeseluruhan = totalHarga + denda;

  // Format Nomor Kwitansi: KW-<YYYYMM>-<8 Karakter Pertama ID Transaksi UPPERCASE>
  const tglObj = new Date(transaksi.created_at);
  const ymStr = `${tglObj.getFullYear()}${String(tglObj.getMonth() + 1).padStart(2, '0')}`;
  const noKwitansi = `KW-${ymStr}-${transaksi.id_transaksi.replace(/-/g, '').substring(0, 8).toUpperCase()}`;

  // Mapping Metode Pembayaran
  const formatMetodeBayar = (metode: string) => {
    if (!metode || metode === 'tunai') return 'Tunai / Cash';
    if (metode === 'transfer_bank') return 'Transfer Bank / Virtual Account';
    if (metode === 'qris') return 'QRIS';
    if (metode === 'gopay') return 'GoPay';
    return metode.charAt(0).toUpperCase() + metode.slice(1);
  };

  // Persiapan Data Template Surat Perjanjian
  const dateSewa = new Date(pesanan.tanggal_sewa);
  const dateKembali = new Date(pesanan.tanggal_kembali);

  const renderSuratHtml = () => {
    let html = TEMPLATE_SURAT_PERJANJIAN;

    const replacements: Record<string, string> = {
      '{{hari_surat}}': namaHariIndonesia(dateSewa.getDay()),
      '{{tanggal_angka}}': String(dateSewa.getDate()),
      '{{tanggal_huruf}}': terbilang(dateSewa.getDate()),
      '{{bulan_surat}}': namaBulanIndonesia(dateSewa.getMonth()),
      '{{tahun_angka}}': String(dateSewa.getFullYear()),
      '{{tahun_huruf}}': terbilang(dateSewa.getFullYear()),
      '{{tanggal_sewa_lengkap}}': `${dateSewa.getDate()} ${namaBulanIndonesia(dateSewa.getMonth())} ${dateSewa.getFullYear()}`,
      '{{tanggal_kembali_lengkap}}': `${dateKembali.getDate()} ${namaBulanIndonesia(dateKembali.getMonth())} ${dateKembali.getFullYear()}`,

      '{{p1_nama}}': PENANDATANGAN_NAMA || '..................................................................',
      '{{p1_pekerjaan}}': PENANDATANGAN_PEKERJAAN || '..................................................................',
      '{{p1_jabatan}}': PENANDATANGAN_JABATAN || '..................................................................',
      '{{p1_alamat}}': PENANDATANGAN_ALAMAT || '..................................................................',
      '{{p1_ktp}}': PENANDATANGAN_KTP || '..................................................................',
      '{{p1_telepon}}': PENANDATANGAN_TELEPON || '..................................................................',
      '{{perusahaan_nama}}': NAMA_PERUSAHAAN,
      '{{perusahaan_alamat}}': ALAMAT_PERUSAHAAN,

      '{{p2_nama}}': pelanggan?.nama || '..................................................................',
      '{{p2_pekerjaan}}': '..................................................................',
      '{{p2_jabatan}}': '..................................................................',
      '{{p2_alamat}}': pelanggan?.alamat || '..................................................................',
      '{{p2_ktp}}': '..................................................................',
      '{{p2_telepon}}': pelanggan?.no_hp || '..................................................................',

      '{{kendaraan_merek}}': `${mobil?.nama_kendaraan || ''} (${mobil?.jenis_kendaraan || ''})`,
      '{{kendaraan_tahun}}': String(mobil?.tahun_kendaraan || '.....................'),
      '{{kendaraan_plat}}': mobil?.plat_nomor || '.....................',
      '{{kendaraan_bpkb}}': '..................................................................',
      '{{kendaraan_rangka}}': '..................................................................',
      '{{kendaraan_mesin}}': '..................................................................',
      '{{kendaraan_warna}}': '..................................................................',
      '{{kendaraan_kondisi}}': 'Baik, lengkap, dan siap jalan',

      '{{jumlah_hari}}': String(jumlahHari),
      '{{jumlah_hari_huruf}}': terbilang(jumlahHari),
      '{{rute_perjalanan}}': pesanan.rute_perjalanan,
      '{{rute_peruntukan_label}}': mobil?.rute_peruntukan === 'dalam_kota' ? 'Dalam Kota' : mobil?.rute_peruntukan === 'luar_kota' ? 'Luar Kota' : 'Dalam & Luar Kota',

      '{{harga_per_hari}}': Number(hargaPerHari).toLocaleString('id-ID'),
      '{{harga_per_hari_huruf}}': terbilang(hargaPerHari) + ' rupiah',
      '{{total_harga}}': Number(totalHarga).toLocaleString('id-ID'),
      '{{total_harga_huruf}}': terbilang(totalHarga) + ' rupiah',
      '{{metode_pembayaran_label}}': formatMetodeBayar(transaksi.metode_pembayaran),

      '{{denda_persen}}': String(DENDA_PERSEN_PER_HARI),
      '{{denda_persen_huruf}}': terbilang(DENDA_PERSEN_PER_HARI),
      '{{denda_per_hari}}': Number((hargaPerHari * DENDA_PERSEN_PER_HARI) / 100).toLocaleString('id-ID'),
      '{{denda_per_hari_huruf}}': terbilang((hargaPerHari * DENDA_PERSEN_PER_HARI) / 100) + ' rupiah',

      '{{batas_hari_penarikan}}': BATAS_HARI_PENARIKAN || '3',
      '{{batas_hari_penarikan_huruf}}': terbilang(Number(BATAS_HARI_PENARIKAN || '3')),
      '{{pengadilan_negeri}}': PENGADILAN_NEGERI || 'Pengadilan Negeri Setempat',
      '{{tempat_penandatanganan}}': TEMPAT_PENANDATANGANAN || 'Pekanbaru',
    };

    for (const [key, val] of Object.entries(replacements)) {
      html = html.split(key).join(val);
    }
    return html;
  };

  const handleCetak = (rangkap: number) => {
    setJumlahRangkap(rangkap);
    setTimeout(() => {
      window.print();
    }, 200);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Sembunyikan Navigasi saat Print */}
      <div className="print:hidden space-y-4">
        <button onClick={() => router.push('/staf/cetak')} className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600">
          <ArrowLeft size={16} className="mr-1" /> Kembali ke Daftar Cetak
        </button>

        <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-xl border shadow-sm gap-4">
          <div className="flex space-x-2">
            <button 
              onClick={() => setTab('kwitansi')} 
              className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center transition ${tab === 'kwitansi' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              <FileText size={16} className="mr-1.5" /> Kwitansi Pembayaran
            </button>
            <button 
              onClick={() => setTab('sp')} 
              className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center transition ${tab === 'sp' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              <FileCheck2 size={16} className="mr-1.5" /> Surat Perjanjian Sewa
            </button>
          </div>

          <div className="flex gap-2">
            <button onClick={() => handleCetak(1)} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-sm flex items-center shadow transition">
              <Printer size={16} className="mr-1.5" /> Cetak 1 Rangkap
            </button>
            <button onClick={() => handleCetak(2)} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-sm flex items-center shadow transition">
              <Printer size={16} className="mr-1.5" /> Cetak 2 Rangkap
            </button>
          </div>
        </div>
      </div>

      {/* AREA DOKUMEN CETAK */}
      <div className="space-y-12">
        {Array.from({ length: jumlahRangkap }).map((_, indexRangkap) => (
          <div key={indexRangkap} className="bg-white p-10 md:p-14 rounded-2xl shadow-sm border border-gray-200 print:shadow-none print:border-none print:p-0 page-break">
            
            {/* 1. KODE DOKUMEN KWITANSI */}
            {tab === 'kwitansi' && (
              <div className="space-y-8 font-serif">
                {/* Kop Perusahaan */}
                <div className="text-center border-b-2 border-gray-900 pb-6">
                  <h2 className="text-2xl font-extrabold uppercase tracking-wide">{NAMA_PERUSAHAAN}</h2>
                  <p className="text-sm text-gray-600 mt-1">{ALAMAT_PERUSAHAAN}</p>
                </div>

                <div className="text-center">
                  <h3 className="text-xl font-bold uppercase tracking-wider underline">KWITANSI PEMBAYARAN SEWA KENDARAAN</h3>
                  <p className="text-sm text-gray-500 font-mono mt-1">No. Kwitansi: {noKwitansi}</p>
                </div>

                <div className="space-y-4 text-base">
                  <div className="grid grid-cols-3 border-b border-dashed border-gray-300 pb-3">
                    <span className="font-semibold text-gray-600">Sudah Terima Dari:</span>
                    <span className="col-span-2 font-bold text-gray-900">{pelanggan?.nama}</span>
                  </div>
                  <div className="grid grid-cols-3 border-b border-dashed border-gray-300 pb-3">
                    <span className="font-semibold text-gray-600">Banyaknya Uang:</span>
                    <span className="col-span-2 font-bold italic bg-gray-50 p-2 rounded text-blue-800">
                      # {terbilang(totalKeseluruhan).toUpperCase()} RUPIAH #
                    </span>
                  </div>
                  <div className="grid grid-cols-3 border-b border-dashed border-gray-300 pb-3">
                    <span className="font-semibold text-gray-600">Untuk Pembayaran:</span>
                    <span className="col-span-2 text-gray-900">
                      Sewa kendaraan <b>{mobil?.nama_kendaraan} ({mobil?.plat_nomor})</b> untuk periode {jumlahHari} hari ({formatTanggal(transaksi.tanggal_sewa).split(',')[0]} s.d. {formatTanggal(transaksi.tanggal_kembali).split(',')[0]}). Rute: {pesanan.rute_perjalanan}.
                    </span>
                  </div>
                  {denda > 0 && (
                    <div className="grid grid-cols-3 border-b border-dashed border-gray-300 pb-3 text-red-600">
                      <span className="font-semibold">Denda Keterlambatan:</span>
                      <span className="col-span-2 font-bold">{formatRupiah(denda)}</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-end pt-8">
                  <div>
                    <div className="bg-gray-100 border-2 border-gray-800 p-4 rounded-xl text-xl font-extrabold text-gray-900 inline-block font-mono">
                      {formatRupiah(totalKeseluruhan)}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Metode Pembayaran: {formatMetodeBayar(transaksi.metode_pembayaran)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm">{TEMPAT_PENANDATANGANAN || 'Pekanbaru'}, {new Date().getDate()} {namaBulanIndonesia(new Date().getMonth())} {new Date().getFullYear()}</p>
                    <p className="font-bold mb-20">Petugas / Kasir PT Cinta Riau Tour & Travel</p>
                    <p className="font-bold underline">[ _____________________________ ]</p>
                  </div>
                </div>
              </div>
            )}

            {/* 2. KODE DOKUMEN SURAT PERJANJIAN */}
            {tab === 'sp' && (
              <div className="space-y-6">
                <div className="text-center border-b-2 border-gray-900 pb-6 mb-8 font-serif">
                  <h2 className="text-2xl font-extrabold uppercase tracking-wide">{NAMA_PERUSAHAAN}</h2>
                  <p className="text-sm text-gray-600 mt-1">{ALAMAT_PERUSAHAAN}</p>
                </div>

                <div className="text-center mb-8 font-serif">
                  <h3 className="text-xl font-extrabold uppercase tracking-wider underline">SURAT PERJANJIAN SEWA MOBIL</h3>
                </div>

                {/* Render Template HTML Aman */}
                <div dangerouslySetInnerHTML={{ __html: renderSuratHtml() }} />
              </div>
            )}

            {/* Kaki Halaman / Rangkap */}
            {jumlahRangkap > 1 && (
              <div className="mt-12 pt-4 border-t text-right text-xs text-gray-400 font-mono print:block">
                Rangkap {indexRangkap + 1} - {indexRangkap === 0 ? 'untuk PIHAK PERTAMA' : 'untuk PIHAK KEDUA'}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}