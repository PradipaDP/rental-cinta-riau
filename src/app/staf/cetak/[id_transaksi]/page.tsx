import { notFound } from 'next/navigation';
import { createAdminClient } from '@/lib/supabase/admin';
import { wajibRole } from '@/lib/auth';
import CetakClient from './CetakClient';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{ id_transaksi: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function CetakDokumenDetailPage({ params, searchParams }: PageProps) {
  await wajibRole(['staf']);
  const resolvedParams = await params;
  const resolvedSearch = await searchParams;
  const tab = typeof resolvedSearch.tab === 'string' ? resolvedSearch.tab : 'kwitansi';

  const supabase = createAdminClient();
  const { data: trx, error } = await supabase
    .from('transaksi')
    .select('*, pemesanan(*, users(*), kendaraan(*))')
    .eq('id_transaksi', resolvedParams.id_transaksi)
    .single();

  if (error || !trx) return notFound();

  // Hanya izinkan cetak jika status_pembayaran = settlement
  if (trx.status_pembayaran !== 'settlement') {
    return (
      <div className="max-w-xl mx-auto my-20 p-8 bg-red-50 border border-red-200 rounded-2xl text-center space-y-3">
        <h1 className="text-xl font-bold text-red-700">Pencetakan Ditolak</h1>
        <p className="text-sm text-red-600">Dokumen hanya dapat dicetak apabila status pembayaran transaksi telah lunas (<code className="font-mono bg-red-100 px-1 py-0.5 rounded">settlement</code>).</p>
      </div>
    );
  }

  return <CetakClient transaksi={trx} initialTab={tab} />;
}