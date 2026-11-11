import { notFound } from 'next/navigation';
import { ambilDetailPengembalian } from '@/app/actions/staf';
import PengembalianClient from './PengembalianClient';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{ id_transaksi: string }>;
};

export default async function DetailPengembalianPage({ params }: PageProps) {
  const resolvedParams = await params;
  const data = await ambilDetailPengembalian(resolvedParams.id_transaksi);
  if (!data) return notFound();

  return (
    <div className="max-w-4xl space-y-6">
      <Link href="/staf/pengembalian" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 mb-2">
        <ArrowLeft size={16} className="mr-1" /> Kembali ke Daftar Pengembalian
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 border-b pb-4">Formulir Pemeriksaan & Pengembalian</h1>
      
      <PengembalianClient transaksi={data} />
    </div>
  );
}