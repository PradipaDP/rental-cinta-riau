import { createClient } from '@/lib/supabase/server';
import { Kendaraan } from '@/types';
import { UserPreferences } from './vektorisasi';
import { urutkanRekomendasi } from './urutkan';

export type HasilRekomendasi = {
  kendaraan: Kendaraan;
  skor_similarity: number;
  persentase_kecocokan: number;
};

export async function ambilRekomendasiCBF(pref: UserPreferences): Promise<HasilRekomendasi[]> {
  const supabase = await createClient();

  // Hanya ambil kendaraan dengan status 'tersedia' dari database
  const { data: semuaTersedia, error } = await supabase
    .from('kendaraan')
    .select('*')
    .eq('status', 'tersedia');

  if (error || !semuaTersedia || semuaTersedia.length === 0) {
    return [];
  }

  // Lempar ke fungsi murni matematika (tanpa query database)
  return urutkanRekomendasi(pref, semuaTersedia as Kendaraan[]);
}