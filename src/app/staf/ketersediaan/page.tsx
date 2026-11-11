import { ambilKetersediaan } from '@/app/actions/staf';
import KetersediaanClient from './KetersediaanClient';

export const dynamic = 'force-dynamic';

export default async function KetersediaanPage() {
  const data = await ambilKetersediaan();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Pengecekan Ketersediaan</h1>
        <p className="text-gray-500 text-sm mt-1">Cek status ketersediaan armada pada rentang tanggal tertentu.</p>
      </div>
      <KetersediaanClient kendaraan={data.kendaraan} pemesanan={data.pemesanan} />
    </div>
  );
}