import DashboardLayout from '@/components/layout/DashboardLayout';
import { wajibRole } from '@/lib/auth';

export default async function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  // Proteksi server ganda
  const pengguna = await wajibRole(['super_admin']);

  return (
    <DashboardLayout role={pengguna.role} nama={pengguna.nama}>
      {children}
    </DashboardLayout>
  );
}