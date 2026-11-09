import { notFound } from 'next/navigation';
import { ambilDetailKendaraan } from '@/app/actions/publik-kendaraan';
import { ambilTanggalTerpesan } from '@/app/actions/pelanggan-transaksi';
import TransaksiFormClient from './TransaksiFormClient';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ id_kendaraan: string }>;
};

export default async function TransaksiPage({ params }: Props) {
  const resolvedParams = await params;
  const id_kendaraan = resolvedParams.id_kendaraan;
  
  const mobil = await ambilDetailKendaraan(id_kendaraan);
  if (!mobil || mobil.status !== 'tersedia') return notFound();

  // Ambil daftar tanggal yang sudah dibooking untuk validasi real-time di antarmuka
  const tanggalTerpesan = await ambilTanggalTerpesan(id_kendaraan);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Formulir Pemesanan Kendaraan</h1>
        <p className="text-gray-500 text-sm mt-1">Lengkapi rute perjalanan, tanggal sewa, dan unggah syarat identitas (KTP & SIM).</p>
      </div>
      
      <TransaksiFormClient mobil={mobil} tanggalTerpesan={tanggalTerpesan} />
    </div>
  );
}