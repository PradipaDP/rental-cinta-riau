import { ambilDaftarPengguna } from '@/app/actions/super-admin';
import UserManagementClient from './UserManagementClient';

export const dynamic = 'force-dynamic';

export default async function ManajemenPenggunaPage() {
  const users = await ambilDaftarPengguna();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manajemen Pengguna Aplikasi</h1>
        <p className="text-gray-500 text-sm mt-1">Kelola hak akses, tambah staf internal, dan pantau status akun pengguna.</p>
      </div>
      
      <UserManagementClient initialUsers={users} />
    </div>
  );
}