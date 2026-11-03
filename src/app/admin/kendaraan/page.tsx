import { ambilDaftarKendaraan } from '@/app/actions/admin-kendaraan';
import KendaraanClient from './KendaraanClient';

export const dynamic = 'force-dynamic';

export default async function ManajemenKendaraanPage() {
  const kendaraan = await ambilDaftarKendaraan();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manajemen Kendaraan</h1>
        <p className="text-gray-500 text-sm mt-1">Kelola data inventaris kendaraan, spesifikasi preferensi CBF, dan harga sewa harian.</p>
      </div>
      <KendaraanClient initialData={kendaraan} />
    </div>
  );
}