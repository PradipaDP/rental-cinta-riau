'use server';

import { z } from 'zod';
import { ambilRekomendasiCBF, HasilRekomendasi } from '@/lib/cbf/rekomendasi';
import { UserPreferences } from '@/lib/cbf/vektorisasi';

const cbfSchema = z.object({
  jenis_kendaraan: z.string().min(1, 'Kategori kendaraan wajib dipilih.'),
  kapasitas: z.coerce.number().positive('Kapasitas minimal 1 orang.'),
  bahan_bakar: z.string().min(1, 'Bahan bakar wajib dipilih.'),
  transmisi: z.string().min(1, 'Transmisi wajib dipilih.'),
  rute_peruntukan: z.string().min(1, 'Rute peruntukan wajib dipilih.'),
  tahun_kendaraan: z.coerce.number().min(1990, 'Tahun kendaraan minimal 1990.'),
  harga_sewa: z.coerce.number().positive('Harga sewa harus bernilai positif.'),
  fitur_tambahan: z.array(z.string()).optional(),
});

export type CBFState = {
  success: boolean;
  rekomendasi: HasilRekomendasi[];
  error: string | null;
};

export async function prosesPencarianPintar(prevState: CBFState, formData: FormData): Promise<CBFState> {
  const fiturDipilih = formData.getAll('fitur_tambahan') as string[];
  
  const rawData = {
    jenis_kendaraan: formData.get('jenis_kendaraan'),
    kapasitas: formData.get('kapasitas'),
    bahan_bakar: formData.get('bahan_bakar'),
    transmisi: formData.get('transmisi'),
    rute_peruntukan: formData.get('rute_peruntukan'),
    tahun_kendaraan: formData.get('tahun_kendaraan'),
    harga_sewa: formData.get('harga_sewa'),
    fitur_tambahan: fiturDipilih,
  };

  const validasi = cbfSchema.safeParse(rawData);
  if (!validasi.success) {
    return { success: false, rekomendasi: [], error: validasi.error.issues[0].message };
  }

  try {
    const hasil = await ambilRekomendasiCBF(validasi.data as UserPreferences);
    return { success: true, rekomendasi: hasil, error: null };
  } catch (err: any) {
    return { success: false, rekomendasi: [], error: 'Terjadi kesalahan sistem saat menghitung rekomendasi: ' + err.message };
  }
}