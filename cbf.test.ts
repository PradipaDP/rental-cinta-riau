import { describe, it, expect } from 'vitest';
import { hitungCosineSimilarity } from './src/lib/cbf/cosine';
import { hitungRentangNormalisasi, ubahKendaraanKeVektor, ubahPreferensiKeVektor, UserPreferences } from './src/lib/cbf/vektorisasi';
import { urutkanRekomendasi } from './src/lib/cbf/urutkan';
import { Kendaraan } from './src/types';
import { KATEGORI_OPTIONS, BAHAN_BAKAR_OPTIONS, TRANSMISI_OPTIONS, FITUR_OPTIONS, TOP_N_REKOMENDASI } from './src/lib/config';

describe('Pengujian Algoritma Content-Based Filtering (CBF)', () => {
  const mockKendaraan: Kendaraan[] = [
    {
      id_kendaraan: '1',
      nama_kendaraan: 'Avanza',
      jenis_kendaraan: 'MPV',
      plat_nomor: 'BM 1234 AA',
      harga_sewa: 300000,
      tahun_kendaraan: 2022,
      bahan_bakar: 'Bensin',
      transmisi: 'Manual',
      rute_peruntukan: 'dalam_kota',
      kapasitas: 7,
      fitur_tambahan: ['Double Blower'],
      foto_url: null,
      status: 'tersedia',
    },
    {
      id_kendaraan: '2',
      nama_kendaraan: 'Alphard',
      jenis_kendaraan: 'MPV',
      plat_nomor: 'BM 5678 BB',
      harga_sewa: 1500000,
      tahun_kendaraan: 2024,
      bahan_bakar: 'Hybrid',
      transmisi: 'Matic',
      rute_peruntukan: 'keduanya',
      kapasitas: 7,
      fitur_tambahan: ['Double Blower', 'Sunroof', 'Kursi Kulit'],
      foto_url: null,
      status: 'disewa',
    },
    {
      id_kendaraan: '3',
      nama_kendaraan: 'Brio',
      jenis_kendaraan: 'Hatchback',
      plat_nomor: 'BM 9999 CC',
      harga_sewa: 250000,
      tahun_kendaraan: 2020,
      bahan_bakar: 'Bensin',
      transmisi: 'Matic',
      rute_peruntukan: 'dalam_kota',
      kapasitas: 5,
      fitur_tambahan: ['Kamera Mundur'],
      foto_url: null,
      status: 'tersedia',
    },
    {
      id_kendaraan: '4',
      nama_kendaraan: 'Fortuner',
      jenis_kendaraan: 'SUV',
      plat_nomor: 'BM 4444 DD',
      harga_sewa: 800000,
      tahun_kendaraan: 2023,
      bahan_bakar: 'Diesel',
      transmisi: 'Matic',
      rute_peruntukan: 'luar_kota',
      kapasitas: 7,
      fitur_tambahan: ['Sensor Parkir', 'Apple CarPlay'],
      foto_url: null,
      status: 'tersedia',
    },
  ];

  const prefIdentik: UserPreferences = {
    jenis_kendaraan: 'MPV',
    kapasitas: 7,
    bahan_bakar: 'Bensin',
    transmisi: 'Manual',
    rute_peruntukan: 'dalam_kota',
    tahun_kendaraan: 2022,
    harga_sewa: 300000,
    fitur_tambahan: ['Double Blower'],
  };

  const rentang = hitungRentangNormalisasi(mockKendaraan.filter(k => k.status === 'tersedia'));

  it('(a) Vektor identik menghasilkan kemiripan 100% (1.0)', () => {
    // Vektor acak
    const v1 = [1, 0, 0.5, 1, 0, 1, 0.2, 0.8, 1];
    const skor = hitungCosineSimilarity(v1, v1);
    expect(skor).toBe(1.0);
  });

  it('(b) Kendaraan identik dengan preferensi menghasilkan skor mendekati 1.0 lewat ubahKendaraanKeVektor', () => {
    const vPref = ubahPreferensiKeVektor(prefIdentik, rentang);
    const vMobil = ubahKendaraanKeVektor(mockKendaraan[0], rentang);
    const skor = hitungCosineSimilarity(vPref, vMobil);
    expect(skor).toBeCloseTo(1.0, 5);
  });

  it('(c) Preferensi sangat berbeda menghasilkan skor rendah', () => {
    const prefBeda: UserPreferences = {
      jenis_kendaraan: 'Sedan',
      kapasitas: 2,
      bahan_bakar: 'Listrik',
      transmisi: 'Matic',
      rute_peruntukan: 'luar_kota',
      tahun_kendaraan: 1990,
      harga_sewa: 10000,
      fitur_tambahan: [],
    };
    const vPref = ubahPreferensiKeVektor(prefBeda, rentang);
    const vMobil = ubahKendaraanKeVektor(mockKendaraan[0], rentang);
    const skor = hitungCosineSimilarity(vPref, vMobil);
    expect(skor).toBeLessThan(0.3);
  });

  it('(d) Urutan Top-N benar dan jumlahnya tidak melebihi TOP_N_REKOMENDASI', () => {
    // Menggandakan data dummy untuk memicu pembatasan array (slice)
    const banyakKendaraan = [...mockKendaraan, ...mockKendaraan, ...mockKendaraan].map((k, i) => ({...k, id_kendaraan: String(i)}));
    const hasil = urutkanRekomendasi(prefIdentik, banyakKendaraan);
    
    expect(hasil.length).toBeLessThanOrEqual(TOP_N_REKOMENDASI);
    // Avanza harus berada di puncak
    expect(hasil[0].kendaraan.nama_kendaraan).toBe('Avanza');
    
    // Pastikan terurut menurun
    if (hasil.length > 1) {
      expect(hasil[0].skor_similarity).toBeGreaterThanOrEqual(hasil[1].skor_similarity);
    }
  });

  it('(e) Vektor nol (kosong) tidak menyebabkan error dan menghasilkan skor 0', () => {
    const v1 = [0, 0, 0];
    const v2 = [1, 1, 1];
    expect(() => hitungCosineSimilarity(v1, v2)).not.toThrow();
    expect(hitungCosineSimilarity(v1, v2)).toBe(0);
  });

  it('(f) Kendaraan berstatus disewa tidak pernah muncul dari urutkanRekomendasi', () => {
    const hasil = urutkanRekomendasi(prefIdentik, mockKendaraan);
    const adaDisewa = hasil.some(h => h.kendaraan.status === 'disewa');
    expect(adaDisewa).toBe(false);
  });

  it('(g) Panjang vektor sama dengan jumlah opsi config + dimensi normalisasi', () => {
    const vMobil = ubahKendaraanKeVektor(mockKendaraan[0], rentang);
    const panjangHarapan = 
      KATEGORI_OPTIONS.length + // (One-Hot Kategori)
      1 + // (Kapasitas Min-Max)
      BAHAN_BAKAR_OPTIONS.length + // (One-Hot Bahan Bakar)
      TRANSMISI_OPTIONS.length + // (One-Hot Transmisi)
      2 + // (Rute: Dalam/Luar)
      1 + // (Tahun Min-Max)
      1 + // (Harga Min-Max)
      FITUR_OPTIONS.length; // (Multi-Hot Fitur)
      
    expect(vMobil.length).toBe(panjangHarapan);
  });

  it('(h) Perubahan tahun_kendaraan pada preferensi benar-benar mengubah skor', () => {
    const vPrefAsli = ubahPreferensiKeVektor(prefIdentik, rentang);
    const prefTahunBeda = { ...prefIdentik, tahun_kendaraan: 2020 }; // Mengubah tahun menjadi berbeda
    const vPrefBeda = ubahPreferensiKeVektor(prefTahunBeda, rentang);
    
    const vMobil = ubahKendaraanKeVektor(mockKendaraan[0], rentang);
    
    const skorAsli = hitungCosineSimilarity(vPrefAsli, vMobil);
    const skorBeda = hitungCosineSimilarity(vPrefBeda, vMobil);
    
    // Skor kemiripan harus berbeda karena atribut tahun (salah satu variabel) berubah
    expect(skorAsli).not.toBe(skorBeda);
  });
});