'use client';

import { useState } from 'react';
import { formatTanggal } from '@/lib/formatters';
import { Search, Calendar } from 'lucide-react';

export default function KetersediaanClient({ kendaraan, pemesanan }: { kendaraan: any[], pemesanan: any[] }) {
  const today = new Date().toISOString().split('T')[0];
  const [tglMulai, setTglMulai] = useState(today);
  const [tglSelesai, setTglSelesai] = useState(today);

  // Filter logika: cari yang TIDAK ada di array pemesanan dengan tanggal overlap
  const daftarTersedia = kendaraan.filter(k => {
    if (k.status !== 'tersedia') return false;
    const isBooked = pemesanan.some(p => {
      if (p.id_kendaraan !== k.id_kendaraan) return false;
      const start = new Date(tglMulai).getTime();
      const end = new Date(tglSelesai).getTime();
      const bStart = new Date(p.tanggal_sewa).getTime();
      const bEnd = new Date(p.tanggal_kembali).getTime();
      return start <= bEnd && end >= bStart; // overlapping logic
    });
    return !isBooked;
  });

  const daftarTerpakai = kendaraan.filter(k => !daftarTersedia.includes(k));

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mulai Tanggal</label>
            <input type="date" value={tglMulai} onChange={(e) => setTglMulai(e.target.value)} className="border p-2.5 rounded-lg focus:ring-blue-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sampai Tanggal</label>
            <input type="date" value={tglSelesai} onChange={(e) => setTglSelesai(e.target.value)} className="border p-2.5 rounded-lg focus:ring-blue-500 outline-none" />
          </div>
          <div className="pb-1 text-sm text-gray-500 flex items-center">
            <Calendar size={18} className="mr-1.5" /> Filter Otomatis
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* List Tersedia */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-green-50 p-4 border-b border-green-100">
            <h3 className="font-bold text-green-800">Tersedia ({daftarTersedia.length})</h3>
          </div>
          <div className="divide-y max-h-96 overflow-y-auto">
            {daftarTersedia.map(k => (
              <div key={k.id_kendaraan} className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-900">{k.nama_kendaraan}</p>
                  <p className="text-sm text-gray-500">{k.plat_nomor}</p>
                </div>
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-bold">KOSONG</span>
              </div>
            ))}
          </div>
        </div>

        {/* List Terpakai */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-red-50 p-4 border-b border-red-100">
            <h3 className="font-bold text-red-800">Terpakai / Sedang Disewa ({daftarTerpakai.length})</h3>
          </div>
          <div className="divide-y max-h-96 overflow-y-auto">
            {daftarTerpakai.map(k => {
              // Cari detail penyewa
              const bookedBy = pemesanan.filter(p => p.id_kendaraan === k.id_kendaraan && (
                new Date(tglMulai).getTime() <= new Date(p.tanggal_kembali).getTime() && 
                new Date(tglSelesai).getTime() >= new Date(p.tanggal_sewa).getTime()
              ));
              return (
                <div key={k.id_kendaraan} className="p-4">
                  <p className="font-semibold text-gray-900">{k.nama_kendaraan} <span className="text-gray-400 font-normal text-sm">({k.plat_nomor})</span></p>
                  {bookedBy.length > 0 ? bookedBy.map((b, i) => (
                    <div key={i} className="mt-2 text-xs bg-gray-50 p-2 rounded border">
                      <span className="font-medium text-gray-700">{b.users?.nama}</span> <br/>
                      {formatTanggal(b.tanggal_sewa).split(',')[0]} - {formatTanggal(b.tanggal_kembali).split(',')[0]}
                    </div>
                  )) : (
                    <div className="mt-2 text-xs bg-gray-50 p-2 rounded border text-gray-500">Status Master: Disewa</div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}