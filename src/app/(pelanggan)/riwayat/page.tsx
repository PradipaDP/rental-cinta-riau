import { ambilRiwayatPemesanan } from '@/app/actions/pelanggan-riwayat';
import RiwayatClient from './RiwayatClient';

export const dynamic = 'force-dynamic';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function RiwayatPage({ searchParams }: Props) {
  // Tunggu (await) parameter pencarian sesuai standar Next.js terbaru
  const resolvedParams = await searchParams;
  
  // Tangkap nilai page dan status dari URL (atau gunakan nilai bawaan)
  const page = typeof resolvedParams.page === 'string' ? parseInt(resolvedParams.page) : 1;
  const status = typeof resolvedParams.status === 'string' ? resolvedParams.status : 'semua';

  // Ambil data dari database melalui Server Action
  const data = await ambilRiwayatPemesanan(page, status);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Riwayat Pemesanan</h1>
        <p className="text-gray-500 text-sm mt-1">Pantau status booking, pembayaran, dan dokumen penyewaan Anda di sini.</p>
      </div>
      
      {/* Lempar data ke Komponen Klien untuk dirender */}
      <RiwayatClient initialData={data} filterAktif={status} pageAktif={page} />
    </div>
  );
}