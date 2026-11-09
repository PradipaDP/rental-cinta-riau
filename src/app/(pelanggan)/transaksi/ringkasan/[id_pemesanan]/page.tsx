import { notFound } from 'next/navigation';
import { ambilDetailRingkasan } from '@/app/actions/pelanggan-transaksi';
import RingkasanClient from './RingkasanClient';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ id_pemesanan: string }>;
};

export default async function RingkasanBookingPage({ params }: Props) {
  const resolvedParams = await params;
  
  let pesanan;
  try {
    pesanan = await ambilDetailRingkasan(resolvedParams.id_pemesanan);
  } catch (error) {
    // Menangkap error "Akses Ditolak" jika pelanggan mencoba melihat ID pemesanan milik orang lain
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-red-600">Akses Ditolak</h1>
        <p className="text-gray-600 mt-2">Anda tidak memiliki izin untuk melihat pemesanan ini.</p>
        <Link href="/pencarian-pintar" className="inline-block mt-4 text-blue-600 hover:underline">Kembali ke Beranda</Link>
      </div>
    );
  }

  if (!pesanan) return notFound();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center space-x-2">
        <Link href="/pencarian-pintar" className="text-gray-500 hover:text-blue-600">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Ringkasan Pemesanan</h1>
      </div>
      
      <RingkasanClient pesanan={pesanan} />
    </div>
  );
}