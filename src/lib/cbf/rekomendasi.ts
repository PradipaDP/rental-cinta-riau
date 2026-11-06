'use server';

import { createClient } from '@/lib/supabase/server';
import { Kendaraan } from '@/types';
import { TOP_N_REKOMENDASI } from '@/lib/config';
import { UserPreferences, hitungRentangNormalisasi, ubahKendaraanKeVektor, ubahPreferensiKeVektor } from './vektorisasi';
import { hitungCosineSimilarity } from './cosine';

export type HasilRekomendasi = {
  kendaraan: Kendaraan;
  skor_similarity: number;
  persentase_kecocokan: number;
};

export async function ambilRekomendasiCBF(pref: UserPreferences): Promise<HasilRekomendasi[]> {
  const supabase = await createClient();

  // Hanya ambil kendaraan dengan status 'tersedia' (kendaraan disewa tidak pernah muncul)
  const { data: semuaTersedia, error } = await supabase
    .from('kendaraan')
    .select('*')
    .eq('status', 'tersedia');

  if (error || !semuaTersedia || semuaTersedia.length === 0) {
    return [];
  }

  const rentang = hitungRentangNormalisasi(semuaTersedia as Kendaraan[]);
  const vektorPreferensi = ubahPreferensiKeVektor(pref, rentang);

  const hasil: HasilRekomendasi[] = semuaTersedia.map((k) => {
    const vektorKendaraan = ubahKendaraanKeVektor(k as Kendaraan, rentang);
    const skor = hitungCosineSimilarity(vektorPreferensi, vektorKendaraan);
    
    return {
      kendaraan: k as Kendaraan,
      skor_similarity: skor,
      persentase_kecocokan: Number((skor * 100).toFixed(1)),
    };
  });

  // Urutkan dari skor terbesar ke terkecil
  hasil.sort((a, b) => b.skor_similarity - a.skor_similarity);

  // Ambil Top-N
  return hasil.slice(0, TOP_N_REKOMENDASI);
}