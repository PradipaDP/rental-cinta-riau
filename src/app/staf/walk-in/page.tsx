import { ambilKetersediaan } from '@/app/actions/staf';
import WalkInClient from './WalkInClient';

export const dynamic = 'force-dynamic';

export default async function WalkInPage() {
  const data = await ambilKetersediaan();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Transaksi Walk-in</h1>
        <p className="text-gray-500 text-sm mt-1">Pembuatan pesanan langsung di tempat (offline) oleh staf.</p>
      </div>
      <WalkInClient kendaraan={data.kendaraan} pemesanan={data.pemesanan} />
    </div>
  );
}