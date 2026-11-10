import { Kendaraan } from '@/types';
import { TOP_N_REKOMENDASI } from '@/lib/config';
import { UserPreferences, hitungRentangNormalisasi, ubahKendaraanKeVektor, ubahPreferensiKeVektor } from './vektorisasi';
import { hitungCosineSimilarity } from './cosine';
import { HasilRekomendasi } from './rekomendasi';

export function urutkanRekomendasi(pref: UserPreferences, semuaKendaraan: Kendaraan[]): HasilRekomendasi[] {
  // Pastikan hanya kendaraan berstatus 'tersedia' yang ikut diperhitungkan
  const tersedia = semuaKendaraan.filter(k => k.status === 'tersedia');

  if (tersedia.length === 0) {
    return [];
  }

  const rentang = hitungRentangNormalisasi(tersedia);
  const vektorPreferensi = ubahPreferensiKeVektor(pref, rentang);

  const hasil: HasilRekomendasi[] = tersedia.map((k) => {
    const vektorKendaraan = ubahKendaraanKeVektor(k, rentang);
    const skor = hitungCosineSimilarity(vektorPreferensi, vektorKendaraan);
    
    return {
      kendaraan: k,
      skor_similarity: skor,
      persentase_kecocokan: Number((skor * 100).toFixed(1)),
    };
  });

  // Urutkan dari skor terbesar (paling mirip) ke terkecil
  hasil.sort((a, b) => b.skor_similarity - a.skor_similarity);

  // Ambil Top-N sesuai batasan dari konfigurasi (misal: 5)
  return hasil.slice(0, TOP_N_REKOMENDASI);
}