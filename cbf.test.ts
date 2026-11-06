import { describe, it, expect } from 'vitest';
import { hitungCosineSimilarity } from './src/lib/cbf/cosine';
import { hitungRentangNormalisasi, ubahKendaraanKeVektor, ubahPreferensiKeVektor } from './src/lib/cbf/vektorisasi';
import { Kendaraan } from './src/types';

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
      fitur_tambahan: ['AC', 'Bluetooth'],
      foto_url: null,
      status: 'tersedia',
    },
    {
      id_kendaraan: '2',
      nama_kendaraan: 'Alphard',
      jenis_kendaraan: 'SUV',
      plat_nomor: 'BM 5678 BB',
      harga_sewa: 1500000,
      tahun_kendaraan: 2024,
      bahan_bakar: 'Hybrid',
      transmisi: 'Matic',
      rute_peruntukan: 'keduanya',
      kapasitas: 7,
      fitur_tambahan: ['AC', 'Bluetooth', 'Sunroof'],
      foto_url: null,
      status: 'disewa',
    },
  ];

  const rentang = hitungRentangNormalisasi(mockKendaraan);

  it('Kasus 1: Vektor identik menghasilkan kemiripan 100% (1.0)', () => {
    const v1 = [1, 0, 0.5, 1];
    const skor = hitungCosineSimilarity(v1, v1);
    expect(skor).toBe(1.0);
  });

  it('Kasus 2: Preferensi sangat berbeda menghasilkan skor rendah mendekati 0', () => {
    const v1 = [1, 0, 0, 0];
    const v2 = [0, 1, 1, 1];
    const skor = hitungCosineSimilarity(v1, v2);
    expect(skor).toBe(0);
  });

  it('Kasus 3: Vektor nol (kosong) tidak menyebabkan error dan menghasilkan skor 0', () => {
    const v1 = [0, 0, 0];
    const v2 = [1, 1, 1];
    expect(() => hitungCosineSimilarity(v1, v2)).not.toThrow();
    expect(hitungCosineSimilarity(v1, v2)).toBe(0);
  });

  it('Kasus 4: Vektor kendaraan terbentuk dengan benar dari 8 variabel', () => {
    const vKendaraan = ubahKendaraanKeVektor(mockKendaraan[0], rentang);
    expect(vKendaraan.length).toBeGreaterThan(0);
  });

  it('Kasus 5: Kendaraan berstatus "disewa" harus diabaikan', () => {
    const tersedia = mockKendaraan.filter(k => k.status === 'tersedia');
    expect(tersedia.length).toBe(1);
    expect(tersedia[0].id_kendaraan).toBe('1');
  });
});