'use client';

import { useState, useMemo } from 'react';
import { Search, Plus, Ban, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { tambahPenggunaAdmin, ubahRolePengguna, toggleStatusPengguna } from '@/app/actions/super-admin';

// Ubah tipe id menjadi id_user
type User = {
  id_user: string;
  nama: string;
  email: string;
  role: string;
  no_hp: string;
  isBanned: boolean;
};

export default function UserManagementClient({ initialUsers }: { initialUsers: User[] }) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 10;

  const [notif, setNotif] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState<{ isOpen: boolean; type: 'tambah' | 'role' | 'status'; user: User | null }>({
    isOpen: false,
    type: 'tambah',
    user: null,
  });

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchSearch = u.nama?.toLowerCase().includes(search.toLowerCase()) || u.email?.toLowerCase().includes(search.toLowerCase());
      const matchRole = roleFilter ? u.role === roleFilter : true;
      return matchSearch && matchRole;
    });
  }, [users, search, roleFilter]);

  const paginatedUsers = filteredUsers.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filteredUsers.length / perPage);

  const showNotif = (type: 'success' | 'error', msg: string) => {
    setNotif({ type, msg });
    setTimeout(() => setNotif(null), 5000);
  };

  const closeModal = () => setModal({ isOpen: false, type: 'tambah', user: null });

  async function handleTambah(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const res = await tambahPenggunaAdmin(formData);
    
    if (res.error) {
      showNotif('error', res.error);
    } else {
      showNotif('success', 'Akun berhasil dibuat dan diaktifkan.');
      window.location.reload();
    }
    setLoading(false);
  }

  async function handleUbahRole(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!modal.user) return;
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const newRole = formData.get('role') as string;
    // Menggunakan id_user
    const res = await ubahRolePengguna(modal.user.id_user, newRole);
    
    if (res.error) showNotif('error', res.error);
    else {
      showNotif('success', 'Role berhasil diperbarui.');
      window.location.reload();
    }
    setLoading(false);
  }

  async function handleToggleStatus() {
    if (!modal.user) return;
    setLoading(true);
    // Menggunakan id_user
    const res = await toggleStatusPengguna(modal.user.id_user, modal.user.isBanned);
    
    if (res.error) showNotif('error', res.error);
    else {
      showNotif('success', `Akun berhasil di${modal.user.isBanned ? 'aktifkan' : 'nonaktifkan'}.`);
      window.location.reload();
    }
    setLoading(false);
  }

  const roleColors: Record<string, string> = {
    super_admin: 'bg-purple-100 text-purple-800',
    admin: 'bg-blue-100 text-blue-800',
    staf: 'bg-amber-100 text-amber-800',
    pelanggan: 'bg-green-100 text-green-800',
  };

  return (
    <div className="space-y-6">
      {notif && (
        <div className={`p-4 rounded-lg text-sm font-medium ${notif.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {notif.msg}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari nama atau email..." 
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 w-full sm:w-64"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            />
          </div>
          <select 
            className="px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 bg-white"
            value={roleFilter}
            onChange={(e) => { setRoleFilter(e.target.value); setPage(1); }}
          >
            <option value="">Semua Role</option>
            <option value="admin">Admin</option>
            <option value="staf">Staf</option>
            <option value="pelanggan">Pelanggan</option>
          </select>
        </div>
        <button 
          onClick={() => setModal({ isOpen: true, type: 'tambah', user: null })}
          className="flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
        >
          <Plus size={18} className="mr-2" /> Tambah Akun Internal
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Nama & Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Kontak</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">Tidak ada data pengguna yang ditemukan.</td>
                </tr>
              ) : (
                paginatedUsers.map((u, index) => (
                  <tr key={u.id_user || `fallback-${index}`} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{u.nama || '-'}</div>
                      <div className="text-gray-500">{u.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${roleColors[u.role] || 'bg-gray-100 text-gray-800'}`}>
                        {u.role.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{u.no_hp || '-'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${u.isBanned ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        {u.isBanned ? 'Nonaktif' : 'Aktif'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button 
                        onClick={() => setModal({ isOpen: true, type: 'role', user: u })}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                        title="Ubah Role"
                      >
                        <ShieldCheck size={18} />
                      </button>
                      <button 
                        onClick={() => setModal({ isOpen: true, type: 'status', user: u })}
                        className={`p-1.5 rounded ${u.isBanned ? 'text-green-600 hover:bg-green-50' : 'text-red-600 hover:bg-red-50'}`}
                        title={u.isBanned ? 'Aktifkan Akun' : 'Blokir Akun'}
                      >
                        <Ban size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-3 border-t border-gray-200 bg-gray-50">
            <span className="text-sm text-gray-500">Halaman {page} dari {totalPages}</span>
            <div className="flex space-x-2">
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))} 
                disabled={page === 1}
                className="p-1.5 rounded bg-white border border-gray-300 disabled:opacity-50"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))} 
                disabled={page === totalPages}
                className="p-1.5 rounded bg-white border border-gray-300 disabled:opacity-50"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      {modal.isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            
            {modal.type === 'tambah' && (
              <form onSubmit={handleTambah}>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Tambah Akun Internal</h3>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                    <input name="nama" type="text" required className="w-full px-3 py-2 border rounded-lg outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input name="email" type="email" required className="w-full px-3 py-2 border rounded-lg outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password Sementara</label>
                    <input name="password" type="text" required minLength={6} className="w-full px-3 py-2 border rounded-lg outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">No HP</label>
                    <input name="no_hp" type="tel" required className="w-full px-3 py-2 border rounded-lg outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
                    <textarea name="alamat" rows={2} className="w-full px-3 py-2 border rounded-lg outline-none focus:border-blue-500"></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pilih Role</label>
                    <select name="role" required className="w-full px-3 py-2 border rounded-lg outline-none focus:border-blue-500 bg-white">
                      <option value="admin">Admin (Laporan & Kendaraan)</option>
                      <option value="staf">Staf (Operasional)</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end space-x-3">
                  <button type="button" onClick={closeModal} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Batal</button>
                  <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
                    {loading ? 'Menyimpan...' : 'Simpan Akun'}
                  </button>
                </div>
              </form>
            )}

            {modal.type === 'role' && modal.user && (
              <form onSubmit={handleUbahRole}>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Ubah Hak Akses</h3>
                <p className="text-sm text-gray-500 mb-4">Pengguna: <span className="font-medium text-gray-900">{modal.user.email}</span></p>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role Baru</label>
                  <select name="role" defaultValue={modal.user.role} className="w-full px-3 py-2 border rounded-lg outline-none focus:border-blue-500 bg-white">
                    <option value="admin">Admin</option>
                    <option value="staf">Staf</option>
                    <option value="pelanggan">Pelanggan</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-3">
                  <button type="button" onClick={closeModal} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Batal</button>
                  <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
                    {loading ? 'Memproses...' : 'Ubah Role'}
                  </button>
                </div>
              </form>
            )}

            {modal.type === 'status' && modal.user && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Konfirmasi Status Akun</h3>
                <p className="text-gray-600 text-sm mb-6">
                  Apakah Anda yakin ingin {modal.user.isBanned ? <span className="font-semibold text-green-600">mengaktifkan kembali</span> : <span className="font-semibold text-red-600">menonaktifkan (blokir)</span>} akun <strong>{modal.user.email}</strong>?
                  {!modal.user.isBanned && " Akun yang diblokir tidak akan bisa login ke dalam sistem."}
                </p>
                <div className="flex justify-end space-x-3">
                  <button type="button" onClick={closeModal} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Batal</button>
                  <button onClick={handleToggleStatus} disabled={loading} className={`px-4 py-2 text-white rounded-lg disabled:opacity-50 ${modal.user.isBanned ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}>
                    {loading ? 'Memproses...' : modal.user.isBanned ? 'Ya, Aktifkan' : 'Ya, Nonaktifkan'}
                  </button>
                </div>
              </div>
            )}
            
          </div>
        </div>
      )}
    </div>
  );
}