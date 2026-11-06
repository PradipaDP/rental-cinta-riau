import { ambilKendaraanTersedia } from '@/app/actions/publik-kendaraan';
import PencarianPintarClient from './PencarianPintarClient';

export const dynamic = 'force-dynamic';

export default async function PencarianPintarPage() {
  const semuaMobil = await ambilKendaraanTersedia();

  return <PencarianPintarClient semuaKatalog={semuaMobil} />;
}