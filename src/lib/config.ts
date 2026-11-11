// Nilai-nilai ini bisa kamu ubah sesuai kebutuhan skripsi nanti
export const NAMA_PERUSAHAAN = "PT Cinta Riau Tour & Travel";
export const ALAMAT_PERUSAHAAN = "Jl. Sudirman No. 123, Pekanbaru, Riau"; // Silakan sesuaikan dengan alamat asli

export const KATEGORI_OPTIONS = ["MPV", "SUV", "Hatchback", "Sedan", "Minibus"] as const;
export const BAHAN_BAKAR_OPTIONS = ["Bensin", "Diesel", "Hybrid", "Listrik"] as const;
export const TRANSMISI_OPTIONS = ["Manual", "Matic"] as const;

export const RUTE_OPTIONS = [
  { value: "dalam_kota", label: "Dalam Kota" },
  { value: "luar_kota", label: "Luar Kota" },
  { value: "keduanya", label: "Dalam & Luar Kota" }
] as const;

export const FITUR_OPTIONS = [
  "Double Blower", 
  "Apple CarPlay", 
  "Android Auto", 
  "Kamera Mundur", 
  "Sensor Parkir", 
  "Sunroof", 
  "Cruise Control", 
  "Kursi Kulit", 
  "Audio Premium"
] as const;

// Batas rekomendasi mobil (Top-N)
export const TOP_N_REKOMENDASI = 5;

// Denda keterlambatan pengembalian (% dari harga sewa harian per hari keterlambatan)
export const DENDA_PERSEN_PER_HARI = 10;

// Batas waktu kadaluarsa pembayaran Midtrans Snap (dalam menit)
export const SNAP_EXPIRY_MENIT = 60;

// ------------------------------------------------------------------
// KONSTANTA TEMPLATE SURAT PERJANJIAN (TAHAP 12)
// Silakan isi nilai kosong ("") di bawah ini dengan data asli perusahaan
// ------------------------------------------------------------------
export const PENANDATANGAN_NAMA = "Susiana Retno Wulandari"; // Contoh: "Budi Santoso"
export const PENANDATANGAN_PEKERJAAN = "Wiraswasta"; // Contoh: "Wiraswasta"
export const PENANDATANGAN_JABATAN = "Direktur Utama"; // Contoh: "Manajer Operasional"
export const PENANDATANGAN_ALAMAT = "Jl. Sisingamangaraja No. 35b, Pekanbaru, Riau"; // Contoh: "Jl. Sudirman No. 123, Pekanbaru"
export const PENANDATANGAN_KTP = "1471234567890001"; // Contoh: "1471234567890001"
export const PENANDATANGAN_TELEPON = "081234567890"; // Contoh: "081234567890"

export const BATAS_HARI_PENARIKAN = "3"; // Contoh: "3"
export const PENGADILAN_NEGERI = "Pengadilan Negeri Pekanbaru"; // Contoh: "Pengadilan Negeri Pekanbaru"
export const TEMPAT_PENANDATANGANAN = "Pekanbaru"; // Contoh: "Pekanbaru"