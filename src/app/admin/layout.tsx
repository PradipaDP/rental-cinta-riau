import DashboardLayout from '@/components/layout/DashboardLayout';
import { wajibRole } from '@/lib/auth';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Proteksi server ganda
  const pengguna = await wajibRole(['admin']);

  return (
    <DashboardLayout role={pengguna.role} nama={pengguna.nama}>
      {children}
    </DashboardLayout>
  );
}