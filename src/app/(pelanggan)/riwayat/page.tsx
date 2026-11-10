import { ambilRiwayatPemesanan } from '@/app/actions/pelanggan-riwayat';
import RiwayatClient from './RiwayatClient';

export const dynamic = 'force-dynamic';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function RiwayatPage({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  
  const page = typeof resolvedParams.page === 'string' ? parseInt(resolvedParams.page) : 1;
  const statusFilter = typeof resolvedParams.status === 'string' ? resolvedParams.status : 'semua';

  const riwayat = await ambilRiwayatPemesanan(page, statusFilter);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Riwayat Pemesanan</h1>
        <p className="text-gray-500 text-sm mt-1">Pantau status, detail pembayaran, dan riwayat perjalanan Anda di sini.</p>
      </div>
      
      <RiwayatClient initialData={riwayat} filterAktif={statusFilter} pageAktif={page} />
    </div>
  );
}