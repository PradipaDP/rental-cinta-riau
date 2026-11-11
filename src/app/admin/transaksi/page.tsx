import { ambilMonitoringTransaksi } from '@/app/actions/admin-bi';
import TransaksiClient from './TransaksiClient';

export const dynamic = 'force-dynamic';

export default async function MonitoringTransaksiPage() {
  // Ambil data awal halaman 1
  const initialData = await ambilMonitoringTransaksi(1, 10, '', '', '');

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Monitoring Transaksi</h1>
        <p className="text-gray-500 text-sm mt-1">Pantau seluruh riwayat transaksi, status pembayaran, dan denda secara real-time.</p>
      </div>
      <TransaksiClient initialData={initialData} />
    </div>
  );
}