import { Kendaraan } from '@/types';
import { KATEGORI_OPTIONS, BAHAN_BAKAR_OPTIONS, TRANSMISI_OPTIONS, FITUR_OPTIONS } from '@/lib/config';

export type UserPreferences = {
  jenis_kendaraan: string;
  kapasitas: number;
  bahan_bakar: string;
  transmisi: string;
  rute_peruntukan: string;
  tahun_kendaraan: number;
  harga_sewa: number;
  fitur_tambahan: string[];
};

export function normalisasiMinMax(val: number, min: number, max: number): number {
  if (max === min) return 0;
  const hasil = (val - min) / (max - min);
  return Math.max(0, Math.min(1, hasil));
}

// Hitung min dan max dari seluruh daftar kendaraan untuk normalisasi
export function hitungRentangNormalisasi(semuaKendaraan: Kendaraan[]) {
  if (semuaKendaraan.length === 0) {
    return {
      kapasitas: { min: 1, max: 10 },
      tahun: { min: 2000, max: new Date().getFullYear() },
      harga: { min: 100000, max: 2000000 },
    };
  }

  let minKapasitas = Infinity, maxKapasitas = -Infinity;
  let minTahun = Infinity, maxTahun = -Infinity;
  let minHarga = Infinity, maxHarga = -Infinity;

  for (const k of semuaKendaraan) {
    if (k.kapasitas < minKapasitas) minKapasitas = k.kapasitas;
    if (k.kapasitas > maxKapasitas) maxKapasitas = k.kapasitas;

    if (k.tahun_kendaraan < minTahun) minTahun = k.tahun_kendaraan;
    if (k.tahun_kendaraan > maxTahun) maxTahun = k.tahun_kendaraan;

    if (k.harga_sewa < minHarga) minHarga = k.harga_sewa;
    if (k.harga_sewa > maxHarga) maxHarga = k.harga_sewa;
  }

  return {
    kapasitas: { min: minKapasitas, max: maxKapasitas === minKapasitas ? minKapasitas + 1 : maxKapasitas },
    tahun: { min: minTahun, max: maxTahun === minTahun ? minTahun + 1 : maxTahun },
    harga: { min: minHarga, max: maxHarga === minHarga ? minHarga + 1 : maxHarga },
  };
}

export function ubahKendaraanKeVektor(k: Kendaraan, rentang: ReturnType<typeof hitungRentangNormalisasi>): number[] {
  const vektor: number[] = [];

  // 1. Kategori (One-Hot)
  for (const opt of KATEGORI_OPTIONS) {
    vektor.push(k.jenis_kendaraan === opt ? 1 : 0);
  }

  // 2. Kapasitas (Min-Max)
  vektor.push(normalisasiMinMax(k.kapasitas, rentang.kapasitas.min, rentang.kapasitas.max));

  // 3. Bahan Bakar (One-Hot)
  for (const opt of BAHAN_BAKAR_OPTIONS) {
    vektor.push(k.bahan_bakar === opt ? 1 : 0);
  }

  // 4. Transmisi (One-Hot)
  for (const opt of TRANSMISI_OPTIONS) {
    vektor.push(k.transmisi === opt ? 1 : 0);
  }

  // 5. Rute Peruntukan (2 Dimensi: [dalam_kota, luar_kota])
  if (k.rute_peruntukan === 'dalam_kota') {
    vektor.push(1, 0);
  } else if (k.rute_peruntukan === 'luar_kota') {
    vektor.push(0, 1);
  } else {
    // 'keduanya' menyalakan kedua dimensi
    vektor.push(1, 1);
  }

  // 6. Tahun Kendaraan (Min-Max)
  vektor.push(normalisasiMinMax(k.tahun_kendaraan, rentang.tahun.min, rentang.tahun.max));

  // 7. Harga Sewa (Min-Max)
  vektor.push(normalisasiMinMax(k.harga_sewa, rentang.harga.min, rentang.harga.max));

  // 8. Fitur Tambahan (Multi-Hot terhadap FITUR_OPTIONS)
  const fiturMobil = Array.isArray(k.fitur_tambahan) ? k.fitur_tambahan : [];
  for (const fitur of FITUR_OPTIONS) {
    vektor.push(fiturMobil.includes(fitur) ? 1 : 0);
  }

  return vektor;
}

export function ubahPreferensiKeVektor(pref: UserPreferences, rentang: ReturnType<typeof hitungRentangNormalisasi>): number[] {
  const vektor: number[] = [];

  // 1. Kategori (One-Hot)
  for (const opt of KATEGORI_OPTIONS) {
    vektor.push(pref.jenis_kendaraan === opt ? 1 : 0);
  }

  // 2. Kapasitas (Min-Max)
  vektor.push(normalisasiMinMax(pref.kapasitas, rentang.kapasitas.min, rentang.kapasitas.max));

  // 3. Bahan Bakar (One-Hot)
  for (const opt of BAHAN_BAKAR_OPTIONS) {
    vektor.push(pref.bahan_bakar === opt ? 1 : 0);
  }

  // 4. Transmisi (One-Hot)
  for (const opt of TRANSMISI_OPTIONS) {
    vektor.push(pref.transmisi === opt ? 1 : 0);
  }

  // 5. Rute Peruntukan
  if (pref.rute_peruntukan === 'dalam_kota') {
    vektor.push(1, 0);
  } else if (pref.rute_peruntukan === 'luar_kota') {
    vektor.push(0, 1);
  } else {
    vektor.push(1, 1);
  }

  // 6. Tahun Kendaraan (Min-Max)
  vektor.push(normalisasiMinMax(pref.tahun_kendaraan, rentang.tahun.min, rentang.tahun.max));

  // 7. Harga Sewa
  vektor.push(normalisasiMinMax(pref.harga_sewa, rentang.harga.min, rentang.harga.max));

  // 8. Fitur Tambahan
  const fiturPref = Array.isArray(pref.fitur_tambahan) ? pref.fitur_tambahan : [];
  for (const fitur of FITUR_OPTIONS) {
    vektor.push(fiturPref.includes(fitur) ? 1 : 0);
  }

  return vektor;
}