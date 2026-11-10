import { notFound } from 'next/navigation';
import { ambilDetailSerahTerima } from '@/app/actions/staf';
import SerahTerimaClient from './SerahTerimaClient';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{ id_pemesanan: string }>;
};

export default async function DetailSerahTerimaPage({ params }: PageProps) {
  const resolvedParams = await params;
  const id_pemesanan = resolvedParams.id_pemesanan;

  const data = await ambilDetailSerahTerima(id_pemesanan);
  if (!data) return notFound();

  return (
    <div className="max-w-4xl space-y-6">
      <Link href="/staf/serah-terima" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 mb-2">
        <ArrowLeft size={16} className="mr-1" /> Kembali ke Daftar Serah Terima
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 border-b pb-4">Proses Serah Terima & Validasi</h1>
      
      <SerahTerimaClient pesanan={data} />
    </div>
  );
}