import DashboardLayout from '@/components/layout/DashboardLayout';
import { wajibRole } from '@/lib/auth';

export default async function StafLayout({ children }: { children: React.ReactNode }) {
  const pengguna = await wajibRole(['staf']);

  return (
    <DashboardLayout role={pengguna.role} nama={pengguna.nama}>
      {children}
    </DashboardLayout>
  );
}