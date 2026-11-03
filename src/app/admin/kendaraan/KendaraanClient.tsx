'use client';

import { useState, useMemo } from 'react';
import { Search, Plus, Edit, Trash2, Image as ImageIcon, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { tambahKendaraan, ubahKendaraan, hapusKendaraan, ubahStatusKendaraan } from '@/app/actions/admin-kendaraan';

type Kendaraan = {
  id_kendaraan: string;
  foto_url: string;
  nama_kendaraan: string;
  jenis_kendaraan: string;
  plat_nomor: string;
  kapasitas: number;
  bahan_bakar: string;
  transmisi: string;
  rute_peruntukan: string;
  tahun_kendaraan: number;
  harga_sewa: number;
  fitur_tambahan: any;
  status: string;
};

// Opsi Kategori / Jenis Kendaraan
const KATEGORI_OPTIONS = ["Sedan", "SUV", "MPV", "Minibus", "Hatchback", "City Car", "Off-Road"];

// Opsi Transmisi (Sinkron dengan database: Manual & Matic)
const TRANSMISI_OPTIONS = ["Manual", "Matic"];

// Opsi Bahan Bakar (Sinkron dengan database: Bensin, Diesel, Hybrid, Listrik)
const BAHAN_BAKAR_OPTIONS = ["Bensin", "Diesel", "Hybrid"];

// Opsi Rute Peruntukan (Sinkron dengan database: Dalam Kota, Luar Kota, Keduanya)
const RUTE_OPTIONS = ["Dalam Kota", "Luar Kota", "Keduanya"];

// Opsi Fitur Tambahan Lengkap
const FITUR_OPTIONS = [
  "AC", 
  "Multimedia", 
  "Bluetooth", 
  "Kamera Mundur", 
  "Sensor Parkir", 
  "Apple CarPlay", 
  "Android Auto", 
  "Kursi Kulit", 
  "Double Blower", 
  "Sunroof", 
  "Cruise Control"
];

export default function KendaraanClient({ initialData }: { initialData: Kendaraan[] }) {
  const [kendaraanList, setKendaraanList] = useState<Kendaraan[]>(initialData);
  const [search, setSearch] = useState('');
  const [filterJenis, setFilterJenis] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 8;

  const [notif, setNotif] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState<{ isOpen: boolean; type: 'tambah' | 'ubah' | 'hapus' | null; data: Kendaraan | null }>({ 
    isOpen: false, 
    type: null, 
    data: null 
  });
  
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);
  const [selectedFitur, setSelectedFitur] = useState<string[]>([]);
  const [customFitur, setCustomFitur] = useState('');

  const filteredData = useMemo(() => {
    return kendaraanList.filter(k => {
      const matchSearch = k.nama_kendaraan.toLowerCase().includes(search.toLowerCase()) || k.plat_nomor.toLowerCase().includes(search.toLowerCase());
      const matchJenis = filterJenis ? k.jenis_kendaraan === filterJenis : true;
      const matchStatus = filterStatus ? k.status === filterStatus : true;
      return matchSearch && matchJenis && matchStatus;
    });
  }, [kendaraanList, search, filterJenis, filterStatus]);

  const paginatedData = filteredData.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filteredData.length / perPage);

  const showNotif = (type: 'success' | 'error', msg: string) => {
    setNotif({ type, msg });
    setTimeout(() => setNotif(null), 5000);
  };

  const resetForm = () => {
    setModal({ isOpen: false, type: null, data: null });
    setFotoPreview(null);
    setSelectedFitur([]);
    setCustomFitur('');
  };

  const openTambah = () => {
    setFotoPreview(null);
    setSelectedFitur([]);
    setCustomFitur('');
    setModal({ isOpen: true, type: 'tambah', data: null });
  };

  const openUbah = (k: Kendaraan) => {
    setFotoPreview(k.foto_url);
    const fiturArr = Array.isArray(k.fitur_tambahan) 
      ? k.fitur_tambahan 
      : (k.fitur_tambahan ? String(k.fitur_tambahan).split(', ') : []);
    const knownFitur = fiturArr.filter((f: string) => FITUR_OPTIONS.includes(f));
    const unknownFitur = fiturArr.filter((f: string) => !FITUR_OPTIONS.includes(f)).join(', ');
    setSelectedFitur(knownFitur);
    setCustomFitur(unknownFitur);
    setModal({ isOpen: true, type: 'ubah', data: k });
  };

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFotoPreview(URL.createObjectURL(file));
  };

  const toggleFitur = (fitur: string) => {
    setSelectedFitur(prev => prev.includes(fitur) ? prev.filter(f => f !== fitur) : [...prev, fitur]);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    const allFitur = [...selectedFitur];
    if (customFitur.trim()) allFitur.push(...customFitur.split(',').map(f => f.trim()));
    formData.set('fitur_tambahan', allFitur.join(', '));

    let res;
    if (modal.type === 'tambah') {
      res = await tambahKendaraan(formData);
    } else if (modal.type === 'ubah' && modal.data) {
      res = await ubahKendaraan(modal.data.id_kendaraan, formData, modal.data.foto_url);
    }

    if (res?.error) {
      showNotif('error', res.error);
      setLoading(false);
    } else {
      showNotif('success', `Kendaraan berhasil di${modal.type}.`);
      resetForm();
      window.location.reload();
    }
  }

  async function handleHapus() {
    if (!modal.data) return;
    setLoading(true);
    const res = await hapusKendaraan(modal.data.id_kendaraan, modal.data.foto_url);
    if (res.error) {
      showNotif('error', res.error);
      setLoading(false);
    } else {
      showNotif('success', 'Kendaraan berhasil dihapus.');
      resetForm();
      window.location.reload();
    }
  }

  async function handleToggleStatus(k: Kendaraan) {
    const newStatus = k.status === 'tersedia' ? 'disewa' : 'tersedia';
    const res = await ubahStatusKendaraan(k.id_kendaraan, newStatus);
    if (res.error) showNotif('error', res.error);
    else {
      showNotif('success', 'Status ketersediaan diubah.');
      window.location.reload();
    }
  }

  return (
    <div className="space-y-6">
      {notif && (
        <div className={`p-4 rounded-lg text-sm font-medium ${notif.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {notif.msg}
        </div>
      )}

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input 
              type="text" placeholder="Cari kendaraan atau plat..." 
              className="pl-10 pr-4 py-2 border rounded-lg outline-none focus:border-blue-500 w-full md:w-64"
              value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            />
          </div>
          <select className="px-4 py-2 border rounded-lg outline-none bg-white" value={filterJenis} onChange={(e) => { setFilterJenis(e.target.value); setPage(1); }}>
            <option value="">Semua Jenis</option>
            {KATEGORI_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <select className="px-4 py-2 border rounded-lg outline-none bg-white" value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }}>
            <option value="">Semua Status</option>
            <option value="tersedia">Tersedia</option>
            <option value="disewa">Disewa</option>
          </select>
        </div>
        <button onClick={openTambah} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus size={18} className="mr-2" /> Tambah Kendaraan
        </button>
      </div>

      {/* Tabel */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3">Kendaraan</th>
                <th className="px-4 py-3">Spesifikasi</th>
                <th className="px-4 py-3">Rute & Harga</th>
                <th className="px-4 py-3">Fitur Tambahan</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500">Belum ada data kendaraan.</td>
                </tr>
              ) : (
                paginatedData.map(k => (
                  <tr key={k.id_kendaraan} className="hover:bg-gray-50">
                    <td className="px-4 py-3 flex items-center space-x-3">
                      {k.foto_url ? <img src={k.foto_url} alt="Foto" className="w-12 h-12 rounded object-cover border" /> : <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center border"><ImageIcon size={20} className="text-gray-400"/></div>}
                      <div>
                        <div className="font-semibold text-gray-900">{k.nama_kendaraan}</div>
                        <div className="text-gray-500 text-xs">{k.jenis_kendaraan} • {k.plat_nomor}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600 space-y-1">
                      <div>Maks: {k.kapasitas} Org</div>
                      <div>{k.transmisi} • {k.bahan_bakar}</div>
                      <div>Thn: {k.tahun_kendaraan}</div>
                    </td>
                    <td className="px-4 py-3 text-xs">
                      <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded font-medium">{k.rute_peruntukan}</span>
                      <div className="mt-2 font-semibold text-gray-900">Rp {Number(k.harga_sewa || 0).toLocaleString('id-ID')}/hari</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1 max-w-[220px]">
                        {k.fitur_tambahan ? (
                          (Array.isArray(k.fitur_tambahan) 
                            ? k.fitur_tambahan 
                            : String(k.fitur_tambahan).split(', ')
                          ).map((f, i) => f && (
                            <span key={i} className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-[10px] border">
                              {f}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-400 text-xs">-</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => handleToggleStatus(k)} className={`px-2.5 py-1 rounded-full text-xs font-medium border ${k.status === 'tersedia' ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'}`}>
                        {k.status?.toUpperCase() || 'TERSEDIA'}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-right space-x-1">
                      <button onClick={() => openUbah(k)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded" title="Ubah"><Edit size={16} /></button>
                      <button onClick={() => setModal({ isOpen: true, type: 'hapus', data: k })} className="p-1.5 text-red-600 hover:bg-red-50 rounded" title="Hapus"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {totalPages > 1 && (
          <div className="flex justify-between items-center px-4 py-3 border-t bg-gray-50 text-sm">
            <span className="text-gray-500">Halaman {page} dari {totalPages}</span>
            <div className="space-x-2">
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="p-1 border bg-white rounded disabled:opacity-50"><ChevronLeft size={16}/></button>
              <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="p-1 border bg-white rounded disabled:opacity-50"><ChevronRight size={16}/></button>
            </div>
          </div>
        )}
      </div>

      {/* MODAL FORM TAMBAH / UBAH */}
      {modal.isOpen && (modal.type === 'tambah' || modal.type === 'ubah') && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleSubmit} className="p-6">
              <div className="flex justify-between items-center mb-4 border-b pb-3">
                <h3 className="text-xl font-bold">{modal.type === 'tambah' ? 'Tambah Kendaraan Baru' : 'Ubah Data Kendaraan'}</h3>
                <button type="button" onClick={resetForm} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div><label className="block text-sm font-medium mb-1">Nama Kendaraan</label><input name="nama_kendaraan" defaultValue={modal.data?.nama_kendaraan} required className="w-full border p-2 rounded" /></div>
                <div>
                  <label className="block text-sm font-medium mb-1">Jenis Kendaraan</label>
                  <select name="jenis_kendaraan" defaultValue={modal.data?.jenis_kendaraan} required className="w-full border p-2 rounded bg-white">
                    <option value="">Pilih Jenis</option>
                    {KATEGORI_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
                <div><label className="block text-sm font-medium mb-1">Plat Nomor (Unik)</label><input name="plat_nomor" defaultValue={modal.data?.plat_nomor} required className="w-full border p-2 rounded uppercase" /></div>
                <div><label className="block text-sm font-medium mb-1">Harga Sewa / Hari (Rp)</label><input type="number" name="harga_sewa" defaultValue={modal.data?.harga_sewa} required min={1} className="w-full border p-2 rounded" /></div>
                
                <div><label className="block text-sm font-medium mb-1">Tahun Kendaraan</label><input type="number" name="tahun_kendaraan" defaultValue={modal.data?.tahun_kendaraan} required min={1990} max={new Date().getFullYear() + 1} className="w-full border p-2 rounded" /></div>
                <div><label className="block text-sm font-medium mb-1">Kapasitas (Orang)</label><input type="number" name="kapasitas" defaultValue={modal.data?.kapasitas} required min={1} className="w-full border p-2 rounded" /></div>
                
                {/* Transmisi (Sinkron dengan database: Manual, Matic, Otomatis) */}
                <div>
                  <label className="block text-sm font-medium mb-1">Transmisi</label>
                  <select name="transmisi" defaultValue={modal.data?.transmisi} required className="w-full border p-2 rounded bg-white">
                    <option value="">Pilih Transmisi</option>
                    {TRANSMISI_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>

                {/* Bahan Bakar (Sinkron dengan database: Bensin, Diesel, Hybrid, Listrik) */}
                <div>
                  <label className="block text-sm font-medium mb-1">Bahan Bakar</label>
                  <select name="bahan_bakar" defaultValue={modal.data?.bahan_bakar} required className="w-full border p-2 rounded bg-white">
                    <option value="">Pilih Bahan Bakar</option>
                    {BAHAN_BAKAR_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>

                {/* Rute Peruntukan (Sinkron dengan database: Dalam Kota, Luar Kota, Keduanya) */}
                <div>
                  <label className="block text-sm font-medium mb-1">Rute Peruntukan</label>
                  <select name="rute_peruntukan" defaultValue={modal.data?.rute_peruntukan} required className="w-full border p-2 rounded bg-white">
                    <option value="">Pilih Rute</option>
                    {RUTE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Status Ketersediaan</label>
                  <select name="status" defaultValue={modal.data?.status || 'tersedia'} required className="w-full border p-2 rounded bg-white">
                    <option value="tersedia">Tersedia</option><option value="disewa">Disewa</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Fitur Tambahan</label>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {FITUR_OPTIONS.map(fitur => (
                      <label key={fitur} className="flex items-center space-x-2 text-sm">
                        <input type="checkbox" checked={selectedFitur.includes(fitur)} onChange={() => toggleFitur(fitur)} className="rounded text-blue-600" />
                        <span>{fitur}</span>
                      </label>
                    ))}
                  </div>
                  <input type="text" placeholder="Fitur lain tambahan (pisahkan dengan koma)" value={customFitur} onChange={(e) => setCustomFitur(e.target.value)} className="w-full border p-2 rounded text-sm" />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Foto Kendaraan {modal.type === 'tambah' && '(Wajib)'}</label>
                  <input type="file" name="foto" accept="image/png, image/jpeg, image/webp" onChange={handleFotoChange} required={modal.type === 'tambah'} className="w-full border p-2 rounded text-sm" />
                  {fotoPreview && <img src={fotoPreview} alt="Preview" className="mt-3 w-full max-w-[200px] h-32 object-cover rounded-lg border" />}
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 border-t pt-4">
                <button type="button" onClick={resetForm} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Batal</button>
                <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50">
                  {loading ? 'Memproses...' : 'Simpan Data'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL HAPUS */}
      {modal.isOpen && modal.type === 'hapus' && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 text-center">
            <Trash2 size={48} className="mx-auto text-red-500 mb-4" />
            <h3 className="text-lg font-bold">Hapus Kendaraan?</h3>
            <p className="text-sm text-gray-500 mt-2 mb-6">Data <b>{modal.data?.nama_kendaraan}</b> tidak dapat dikembalikan. Pastikan tidak ada transaksi aktif.</p>
            <div className="flex justify-center gap-3">
              <button onClick={resetForm} className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg w-full">Batal</button>
              <button onClick={handleHapus} disabled={loading} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 w-full disabled:opacity-50">
                {loading ? 'Menghapus...' : 'Ya, Hapus'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}