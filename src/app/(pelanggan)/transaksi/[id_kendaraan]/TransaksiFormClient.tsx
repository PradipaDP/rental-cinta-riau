'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Kendaraan } from '@/types';
import { formatRupiah, hitungJumlahHari, formatTanggal } from '@/lib/formatters';
import { buatPemesanan } from '@/app/actions/pelanggan-transaksi';
import { FileText, Calendar, Map, CheckCircle2, AlertTriangle, UploadCloud, Image as ImageIcon } from 'lucide-react';

type Props = {
  mobil: Kendaraan;
  tanggalTerpesan: { tanggal_sewa: string; tanggal_kembali: string }[];
};

export default function TransaksiFormClient({ mobil, tanggalTerpesan }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const [tglSewa, setTglSewa] = useState('');
  const [tglKembali, setTglKembali] = useState('');
  
  const [ktpPreview, setKtpPreview] = useState<string | null>(null);
  const [simPreview, setSimPreview] = useState<string | null>(null);

  // Ambil tanggal hari ini untuk membatasi input min
  const today = new Date().toISOString().split('T')[0];
  const besok = tglSewa ? new Date(new Date(tglSewa).getTime() + 86400000).toISOString().split('T')[0] : today;

  // Cek jika tanggal yang dipilih bentrok dengan jadwal yang sudah ada
  const cekBentrokTanggal = () => {
    if (!tglSewa || !tglKembali) return false;
    const start = new Date(tglSewa).getTime();
    const end = new Date(tglKembali).getTime();
    
    return tanggalTerpesan.some(t => {
      const bStart = new Date(t.tanggal_sewa).getTime();
      const bEnd = new Date(t.tanggal_kembali).getTime();
      // Rumus overlap: Start A < End B && End A > Start B
      return start < bEnd && end > bStart;
    });
  };

  const isBentrok = cekBentrokTanggal();
  const jumlahHari = (tglSewa && tglKembali && !isBentrok) ? hitungJumlahHari(tglSewa, tglKembali) : 0;
  const estimasiHarga = jumlahHari * mobil.harga_sewa;

  const handleKtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) setKtpPreview(URL.createObjectURL(file));
    else setKtpPreview(null); // Jika PDF, sembunyikan preview gambar
  };

  const handleSimChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) setSimPreview(URL.createObjectURL(file));
    else setSimPreview(null);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isBentrok) {
      setError("Pemesanan gagal. Tanggal yang Anda pilih bertabrakan dengan jadwal penyewaan yang sudah ada.");
      return;
    }
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    formData.append('id_kendaraan', mobil.id_kendaraan);

    startTransition(async () => {
      const res = await buatPemesanan(formData);
      if (res?.error) setError(res.error);
    });
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Sisi Kiri: Form */}
      <div className="lg:col-span-2 space-y-6">
        {error && (
          <div className="bg-red-50 text-red-600 border border-red-200 p-4 rounded-xl text-sm font-medium flex items-start">
            <AlertTriangle size={18} className="mr-2 shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 space-y-8">
          {/* Section 1: Rute & Tanggal */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center border-b pb-2">
              <Calendar className="mr-2 text-blue-600" size={20} /> Jadwal & Rute
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Rute Perjalanan (Contoh: Pekanbaru - Padang)</label>
                <input name="rute_perjalanan" type="text" required placeholder="Tujuan perjalanan Anda..." className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Mulai Sewa</label>
                <input 
                  name="tanggal_sewa" type="date" required min={today}
                  value={tglSewa} onChange={e => setTglSewa(e.target.value)}
                  className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Pengembalian</label>
                <input 
                  name="tanggal_kembali" type="date" required min={besok}
                  value={tglKembali} onChange={e => setTglKembali(e.target.value)}
                  className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-100" 
                  disabled={!tglSewa}
                />
              </div>
            </div>

            {isBentrok && (
              <div className="mt-4 bg-amber-50 text-amber-700 p-3 rounded-lg text-sm border border-amber-200 flex items-center">
                <AlertTriangle size={16} className="mr-2" />
                Tanggal tidak tersedia! Kendaraan telah disewa pada rentang tanggal tersebut.
              </div>
            )}
            {tanggalTerpesan.length > 0 && (
              <div className="mt-4">
                <p className="text-xs font-semibold text-gray-500 mb-2 uppercase">Jadwal yang sudah terpesan (Tidak Tersedia):</p>
                <div className="flex flex-wrap gap-2">
                  {tanggalTerpesan.map((t, i) => (
                    <span key={i} className="bg-gray-100 text-gray-600 text-[11px] px-2 py-1 rounded border">
                      {formatTanggal(t.tanggal_sewa).split(',')[0]} - {formatTanggal(t.tanggal_kembali).split(',')[0]}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Upload Dokumen */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center border-b pb-2">
              <FileText className="mr-2 text-blue-600" size={20} /> Syarat Identitas Pribadi
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* KTP */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Unggah KTP (JPG/PNG/PDF, Max 2MB)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:bg-gray-50 transition relative">
                  <input type="file" name="ktp" required accept=".jpg,.jpeg,.png,.pdf" onChange={handleKtpChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  {!ktpPreview ? (
                    <div className="flex flex-col items-center">
                      <UploadCloud className="text-gray-400 mb-2" size={32} />
                      <span className="text-sm text-gray-500 font-medium">Klik atau seret KTP</span>
                    </div>
                  ) : (
                    <img src={ktpPreview} alt="KTP" className="h-32 mx-auto object-contain rounded" />
                  )}
                </div>
              </div>

              {/* SIM */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Unggah SIM (JPG/PNG/PDF, Max 2MB)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:bg-gray-50 transition relative">
                  <input type="file" name="sim" required accept=".jpg,.jpeg,.png,.pdf" onChange={handleSimChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  {!simPreview ? (
                    <div className="flex flex-col items-center">
                      <UploadCloud className="text-gray-400 mb-2" size={32} />
                      <span className="text-sm text-gray-500 font-medium">Klik atau seret SIM</span>
                    </div>
                  ) : (
                    <img src={simPreview} alt="SIM" className="h-32 mx-auto object-contain rounded" />
                  )}
                </div>
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isPending || isBentrok}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-4 rounded-xl transition shadow-lg shadow-blue-200 disabled:bg-gray-400 disabled:shadow-none"
          >
            {isPending ? 'Memproses Pemesanan...' : 'Ajukan Pemesanan'}
          </button>
        </form>
      </div>

      {/* Sisi Kanan: Ringkasan Kendaraan */}
      <div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden sticky top-24">
          <div className="bg-gray-50 p-6 flex justify-center items-center border-b min-h-[180px]">
            {mobil.foto_url ? (
              <img src={mobil.foto_url} alt={mobil.nama_kendaraan} className="w-full max-w-[200px] h-32 object-contain drop-shadow-md" />
            ) : (
              <div className="text-center text-gray-400">
                <ImageIcon size={48} className="mx-auto mb-2 opacity-40" />
                <span className="text-xs font-medium">Foto Tidak Tersedia</span>
              </div>
            )}
          </div>
          <div className="p-6">
            <div className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block mb-3 uppercase tracking-wide">
              {mobil.jenis_kendaraan}
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">{mobil.nama_kendaraan}</h2>
            <p className="text-gray-500 text-sm mb-6">{mobil.plat_nomor} • {mobil.transmisi}</p>
            
            <div className="space-y-3 text-sm border-t pt-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Harga Sewa Harian</span>
                <span className="font-semibold text-gray-900">{formatRupiah(mobil.harga_sewa)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Durasi Sewa</span>
                <span className="font-semibold text-gray-900">{jumlahHari} Hari</span>
              </div>
              <div className="flex justify-between text-base pt-3 border-t">
                <span className="font-bold text-gray-900">Estimasi Total</span>
                <span className="font-extrabold text-blue-600">{formatRupiah(estimasiHarga)}</span>
              </div>
            </div>

            <div className="mt-6 bg-green-50 text-green-700 p-3 rounded-lg text-xs flex">
              <CheckCircle2 size={16} className="mr-2 shrink-0 mt-0.5" />
              <span>Pembayaran akan dilakukan di tahap selanjutnya (Menunggu Pembayaran).</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}