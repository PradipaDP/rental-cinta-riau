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