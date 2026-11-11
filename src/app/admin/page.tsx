import { ambilDataDashboardBI } from '@/app/actions/admin-bi';
import DashboardBIClient from './DashboardBIClient';

export const dynamic = 'force-dynamic';

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function DashboardBIPage({ searchParams }: PageProps) {
  // Ambil tahun dari URL parameter, jika kosong gunakan tahun saat ini
  const resolvedParams = await searchParams;
  const tahunParam = typeof resolvedParams.tahun === 'string' ? resolvedParams.tahun : new Date().getFullYear().toString();

  // Load data awal di sisi server untuk dikirim ke Client (agar tidak ada delay loading awal)
  const data = await ambilDataDashboardBI(tahunParam);

  return (
    <DashboardBIClient initialData={data} tahunAktif={tahunParam} />
  );
}