'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { hitungJumlahHari, formatRupiah } from '@/lib/formatters';
import { prosesWalkIn } from '@/app/actions/staf';
import { CheckCircle, AlertTriangle } from 'lucide-react';

export default function WalkInClient({ kendaraan, pemesanan }: { kendaraan: any[], pemesanan: any[] }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // Ambil tanggal hari ini untuk pembatas input min & default nilai
  const today = new Date().toISOString().split('T')[0];

  // Form States (tanggal_sewa otomatis terisi hari ini)
  const [formData, setFormData] = useState({
    nama: '', email: '', no_hp: '', alamat: '', 
    id_kendaraan: '', tanggal_sewa: today, tanggal_kembali: '', rute_perjalanan: '',
    metode_pembayaran: 'tunai'
  });
  
  const [fileKtp, setFileKtp] = useState<File | null>(null);
  const [fileSim, setFileSim] = useState<File | null>(null);

  const mobilPilihan = kendaraan.find(k => k.id_kendaraan === formData.id_kendaraan);
  const jmlHari = (formData.tanggal_sewa && formData.tanggal_kembali) ? hitungJumlahHari(formData.tanggal_sewa, formData.tanggal_kembali) : 0;
  const total = mobilPilihan ? mobilPilihan.harga_sewa * jmlHari : 0;

  const cekBentrok = () => {
    if (!formData.id_kendaraan || !formData.tanggal_sewa || !formData.tanggal_kembali) return false;
    const start = new Date(formData.tanggal_sewa).getTime();
    const end = new Date(formData.tanggal_kembali).getTime();
    return pemesanan.some(p => {
      if (p.id_kendaraan !== formData.id_kendaraan) return false;
      const bStart = new Date(p.tanggal_sewa).getTime();
      const bEnd = new Date(p.tanggal_kembali).getTime();
      return start <= bEnd && end >= bStart;
    });
  };

  const handleNext = () => {
    if (step === 2 && cekBentrok()) {
      setError("Kendaraan sudah dibooking pada tanggal tersebut!");
      return;
    }
    setError(null);
    setStep(s => s + 1);
  };

  const handleSubmit = async () => {
    setError(null);
    const data = new FormData();
    Object.entries(formData).forEach(([k, v]) => data.append(k, v));
    if (fileKtp) data.append('ktp', fileKtp);
    if (fileSim) data.append('sim', fileSim);

    startTransition(async () => {
      const res = await prosesWalkIn(data);
      if (res.error) setError(res.error);
      else {
        alert("Transaksi Walk-in berhasil diproses!");
        router.push(`/staf/serah-terima/${res.id_pemesanan}`);
      }
    });
  };

  return (
    <div className="max-w-3xl bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-200">
      {error && <div className="mb-4 bg-red-50 text-red-600 p-3 rounded flex"><AlertTriangle className="mr-2" size={20}/> {error}</div>}

      <div className="flex mb-8">
        {[1, 2, 3].map(i => (
          <div key={i} className={`flex-1 text-center font-bold text-sm pb-2 border-b-4 ${step >= i ? 'border-blue-600 text-blue-600' : 'border-gray-200 text-gray-400'}`}>
            Langkah {i}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <h3 className="font-bold text-lg text-gray-900 mb-2">Data Pelanggan Baru / Lama</h3>
          <div><label className="block text-sm mb-1">Nama Lengkap</label><input type="text" value={formData.nama} onChange={e => setFormData({...formData, nama: e.target.value})} className="w-full border p-2 rounded" /></div>
          <div><label className="block text-sm mb-1">Email (Kosongkan jika ingin dibuat otomatis)</label><input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full border p-2 rounded" placeholder="Otomatis dihasilkan jika kosong" /></div>
          <div><label className="block text-sm mb-1">Nomor HP</label><input type="tel" value={formData.no_hp} onChange={e => setFormData({...formData, no_hp: e.target.value})} className="w-full border p-2 rounded" /></div>
          <div><label className="block text-sm mb-1">Alamat</label><textarea value={formData.alamat} onChange={e => setFormData({...formData, alamat: e.target.value})} className="w-full border p-2 rounded"></textarea></div>
          <button onClick={handleNext} disabled={!formData.nama || !formData.no_hp} className="w-full bg-blue-600 text-white py-2 rounded font-bold mt-4 disabled:opacity-50">Lanjut</button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h3 className="font-bold text-lg text-gray-900 mb-2">Pilih Kendaraan & Waktu</h3>
          <div>
            <label className="block text-sm mb-1">Kendaraan Tersedia</label>
            <select value={formData.id_kendaraan} onChange={e => setFormData({...formData, id_kendaraan: e.target.value})} className="w-full border p-2 rounded bg-white">
              <option value="">Pilih Kendaraan</option>
              {kendaraan.filter(k => k.status === 'tersedia').map(k => (
                <option key={k.id_kendaraan} value={k.id_kendaraan}>{k.nama_kendaraan} - {k.plat_nomor}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Tgl Sewa</label>
              <input 
                type="date" 
                min={today}
                value={formData.tanggal_sewa} 
                onChange={e => setFormData({...formData, tanggal_sewa: e.target.value})} 
                className="w-full border p-2 rounded" 
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Tgl Kembali</label>
              <input 
                type="date" 
                min={formData.tanggal_sewa || today}
                value={formData.tanggal_kembali} 
                onChange={e => setFormData({...formData, tanggal_kembali: e.target.value})} 
                className="w-full border p-2 rounded" 
              />
            </div>
          </div>
          <div><label className="block text-sm mb-1">Rute</label><input type="text" value={formData.rute_perjalanan} onChange={e => setFormData({...formData, rute_perjalanan: e.target.value})} className="w-full border p-2 rounded" /></div>
          
          <div className="grid grid-cols-2 gap-4 border-t pt-4">
            <div><label className="block text-sm mb-1">Upload KTP (Opsional)</label><input type="file" accept="image/*,.pdf" onChange={e => setFileKtp(e.target.files?.[0] || null)} className="w-full text-sm" /></div>
            <div><label className="block text-sm mb-1">Upload SIM (Opsional)</label><input type="file" accept="image/*,.pdf" onChange={e => setFileSim(e.target.files?.[0] || null)} className="w-full text-sm" /></div>
          </div>

          <div className="flex justify-between mt-4">
            <button onClick={() => setStep(1)} className="px-4 py-2 bg-gray-200 rounded">Kembali</button>
            <button onClick={handleNext} disabled={!formData.id_kendaraan || !formData.tanggal_sewa || !formData.tanggal_kembali} className="px-4 py-2 bg-blue-600 text-white rounded font-bold disabled:opacity-50">Lanjut</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h3 className="font-bold text-lg text-gray-900 mb-2 border-b pb-2">Konfirmasi & Pembayaran</h3>
          
          <div className="bg-gray-50 p-4 rounded text-sm space-y-2">
            <div className="flex justify-between"><span>Pelanggan</span><span className="font-bold">{formData.nama}</span></div>
            <div className="flex justify-between"><span>Kendaraan</span><span className="font-bold">{mobilPilihan?.nama_kendaraan}</span></div>
            <div className="flex justify-between"><span>Durasi</span><span className="font-bold">{jmlHari} Hari</span></div>
            <div className="flex justify-between text-base pt-2 border-t font-extrabold text-blue-600"><span>Total Tagihan</span><span>{formatRupiah(total)}</span></div>
          </div>

          <div>
            <label className="block text-sm mb-2 font-medium">Metode Pembayaran</label>
            <select value={formData.metode_pembayaran} onChange={e => setFormData({...formData, metode_pembayaran: e.target.value})} className="w-full border p-2 rounded bg-white">
              <option value="tunai">Tunai / Cash</option>
              <option value="transfer_bank">Transfer Bank / EDC</option>
            </select>
          </div>

          <div className="flex justify-between mt-6 pt-4 border-t">
            <button onClick={() => setStep(2)} className="px-4 py-2 bg-gray-200 rounded">Kembali</button>
            <button onClick={handleSubmit} disabled={isPending} className="flex items-center px-6 py-2 bg-blue-600 text-white rounded font-bold shadow disabled:opacity-50">
              {isPending ? 'Memproses...' : <><CheckCircle className="mr-2" size={18}/> Konfirmasi & Selesai</>}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}