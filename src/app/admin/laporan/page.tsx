import LaporanClient from './LaporanClient';

export const dynamic = 'force-dynamic';

export default function LaporanAnalitikPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Laporan & Analitik</h1>
        <p className="text-gray-500 text-sm mt-1">Hasilkan laporan kinerja keuangan, ekspor ke PDF atau Excel.</p>
      </div>
      <LaporanClient />
    </div>
  );
}