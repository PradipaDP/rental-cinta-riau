export type Role = 'super_admin' | 'admin' | 'staf' | 'pelanggan';

export interface User {
  id_user: string; // Terhubung dengan ID di Supabase Auth
  nama: string;
  email: string;
  role: Role;
  no_hp: string | null; // Diperbaiki: bisa null dari database
  alamat: string | null; // Diperbaiki: bisa null dari database
  created_at?: string;
}

export interface Kendaraan {
  id_kendaraan: string;
  nama_kendaraan: string;
  jenis_kendaraan: string;
  plat_nomor: string;
  harga_sewa: number;
  tahun_kendaraan: number;
  bahan_bakar: string;
  transmisi: string;
  rute_peruntukan: 'dalam_kota' | 'luar_kota' | 'keduanya';
  kapasitas: number;
  fitur_tambahan: string[]; // Disimpan sebagai array teks
  foto_url: string | null; // Diperbaiki: bisa null jika belum diupload
  status: 'tersedia' | 'disewa';
  created_at?: string;
}

export interface Pemesanan {
  id_pemesanan: string;
  id_user: string;
  id_kendaraan: string;
  rute_perjalanan: string;
  tanggal_pesan: string; 
  tanggal_sewa: string;
  tanggal_kembali: string;
  ktp_url: string | null; // Diperbaiki: pelanggan upload belakangan
  sim_url: string | null; // Diperbaiki: pelanggan upload belakangan
  status_verifikasi: 'menunggu' | 'valid' | 'ditolak';
  status_pemesanan: 'menunggu_pembayaran' | 'dibayar' | 'diambil' | 'selesai' | 'dibatalkan';
  created_at?: string;
}

export interface Transaksi {
  id_transaksi: string;
  id_user: string | null; // Staf pemroses, null sampai diproses
  id_kendaraan: string;
  id_pemesanan: string;
  tanggal_sewa: string;
  tanggal_kembali: string;
  tanggal_kembali_aktual: string | null; // Null sampai mobil dikembalikan
  total_harga: number;
  metode_pembayaran: string;
  status_pembayaran: 'pending' | 'settlement' | 'expire' | 'cancel' | 'deny';
  id_transaksi_midtrans: string | null;
  status: 'berjalan' | 'selesai' | 'dibatalkan';
  denda: number;
  created_at?: string;
}