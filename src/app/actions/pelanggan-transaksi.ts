'use server';

import { createClient } from '@/lib/supabase/server';
import { wajibRole } from '@/lib/auth';
import { hitungJumlahHari } from '@/lib/formatters';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const PemesananSchema = z.object({
  id_kendaraan: z.string().min(1),
  tanggal_sewa: z.string().min(1, 'Tanggal sewa wajib diisi.'),
  tanggal_kembali: z.string().min(1, 'Tanggal kembali wajib diisi.'),
  rute_perjalanan: z.string().min(3, 'Rute perjalanan terlalu singkat.'),
});

export async function ambilTanggalTerpesan(id_kendaraan: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('pemesanan')
    .select('tanggal_sewa, tanggal_kembali')
    .eq('id_kendaraan', id_kendaraan)
    .not('status_pemesanan', 'in', '("dibatalkan","selesai")');

  if (error) return [];
  return data;
}

export async function buatPemesanan(formData: FormData) {
  const pengguna = await wajibRole(['pelanggan']);
  const supabase = await createClient();

  const dataInput = {
    id_kendaraan: formData.get('id_kendaraan') as string,
    tanggal_sewa: formData.get('tanggal_sewa') as string,
    tanggal_kembali: formData.get('tanggal_kembali') as string,
    rute_perjalanan: formData.get('rute_perjalanan') as string,
  };

  const ktpFile = formData.get('ktp') as File | null;
  const simFile = formData.get('sim') as File | null;

  // 1. Validasi Zod Dasar
  const parsed = PemesananSchema.safeParse(dataInput);
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const data = parsed.data;

  // 2. Validasi Tanggal
  const tglSewa = new Date(data.tanggal_sewa);
  const tglKembali = new Date(data.tanggal_kembali);
  const hariIni = new Date();
  hariIni.setHours(0, 0, 0, 0);

  if (tglSewa < hariIni) return { error: 'Tanggal sewa tidak boleh sebelum hari ini.' };
  if (tglKembali <= tglSewa) return { error: 'Tanggal kembali harus setelah tanggal sewa.' };

  // 3. Validasi & Hitung Harga (Di Server)
  const { data: kendaraan, error: errK } = await supabase
    .from('kendaraan')
    .select('harga_sewa, status')
    .eq('id_kendaraan', data.id_kendaraan)
    .single();

  if (errK || !kendaraan) return { error: 'Kendaraan tidak ditemukan.' };
  if (kendaraan.status !== 'tersedia') return { error: 'Kendaraan sedang tidak tersedia.' };

  const jumlahHari = hitungJumlahHari(data.tanggal_sewa, data.tanggal_kembali);
  const totalHarga = kendaraan.harga_sewa * jumlahHari; // Dihitung, untuk ditampilkan nanti

  // 4. Validasi File (Maksimal 2MB, harus JPG/PNG/PDF)
  if (!ktpFile || ktpFile.size === 0) return { error: 'KTP wajib diunggah.' };
  if (!simFile || simFile.size === 0) return { error: 'SIM wajib diunggah.' };
  if (ktpFile.size > 2 * 1024 * 1024 || simFile.size > 2 * 1024 * 1024) {
    return { error: 'Ukuran maksimal setiap dokumen adalah 2 MB.' };
  }
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  if (!allowedTypes.includes(ktpFile.type) || !allowedTypes.includes(simFile.type)) {
    return { error: 'Format dokumen harus JPG, PNG, atau PDF.' };
  }

  // 5. Upload Dokumen ke Bucket Privat (dokumen-identitas) di dalam folder id_user
  let ktpUrl = '';
  let simUrl = '';
  const folderPath = `${pengguna.id_user}`;
  
  const ktpExt = ktpFile.name.split('.').pop();
  const simExt = simFile.name.split('.').pop();
  const ktpFileName = `${folderPath}/${Date.now()}_ktp.${ktpExt}`;
  const simFileName = `${folderPath}/${Date.now()}_sim.${simExt}`;

  const { error: errKtp } = await supabase.storage.from('dokumen-identitas').upload(ktpFileName, ktpFile);
  if (errKtp) return { error: 'Gagal mengunggah KTP: ' + errKtp.message };
  ktpUrl = ktpFileName; // Menyimpan path, bukan public URL karena bucket privat

  const { error: errSim } = await supabase.storage.from('dokumen-identitas').upload(simFileName, simFile);
  if (errSim) {
    await supabase.storage.from('dokumen-identitas').remove([ktpFileName]); // Rollback KTP
    return { error: 'Gagal mengunggah SIM: ' + errSim.message };
  }
  simUrl = simFileName;

  // 6. Insert ke Database (Menangani error EXCLUDE CONSTRAINT untuk mencegah double-booking)
  const { data: pesananBaru, error: errInsert } = await supabase
    .from('pemesanan')
    .insert({
      id_user: pengguna.id_user,
      id_kendaraan: data.id_kendaraan,
      tanggal_sewa: data.tanggal_sewa,
      tanggal_kembali: data.tanggal_kembali,
      rute_perjalanan: data.rute_perjalanan,
      ktp_url: ktpUrl,
      sim_url: simUrl,
      status_pemesanan: 'menunggu_pembayaran',
      status_verifikasi: 'menunggu',
    })
    .select('id_pemesanan')
    .single();

  if (errInsert) {
    // Rollback dokumen yang terunggah karena database menolak
    await supabase.storage.from('dokumen-identitas').remove([ktpFileName, simFileName]);

    // 23P01 adalah kode PostgreSQL untuk pelanggaran EXCLUDE constraint (Double-Booking)
    if (errInsert.code === '23P01') {
      return { error: 'Gagal: Tanggal tersebut sudah dipesan oleh pelanggan lain. Silakan pilih tanggal yang berbeda.' };
    }
    return { error: 'Terjadi kesalahan sistem: ' + errInsert.message };
  }

  // Jika sukses, arahkan pelanggan ke halaman ringkasan
  redirect(`/transaksi/ringkasan/${pesananBaru.id_pemesanan}`);
}

export async function ambilDetailRingkasan(id_pemesanan: string) {
  const pengguna = await wajibRole(['pelanggan']);
  const supabase = await createClient();

  const { data: pemesanan, error } = await supabase
    .from('pemesanan')
    .select(`
      *,
      kendaraan (*)
    `)
    .eq('id_pemesanan', id_pemesanan)
    .single();

  if (error || !pemesanan) return null;

  // Proteksi: Pelanggan hanya bisa melihat pemesanannya sendiri
  if (pemesanan.id_user !== pengguna.id_user) {
    throw new Error('Akses Ditolak: Anda tidak dapat melihat pemesanan orang lain.');
  }

  // Buat Signed URL (Tautan Bertanda Tangan, kedaluwarsa dalam 60 detik) untuk melihat pratinjau dokumen privat
  const { data: ktpSigned } = await supabase.storage.from('dokumen-identitas').createSignedUrl(pemesanan.ktp_url, 60);
  const { data: simSigned } = await supabase.storage.from('dokumen-identitas').createSignedUrl(pemesanan.sim_url, 60);

  return {
    ...pemesanan,
    ktp_signed_url: ktpSigned?.signedUrl || null,
    sim_signed_url: simSigned?.signedUrl || null,
  };
}

export async function batalkanPemesanan(id_pemesanan: string) {
  const pengguna = await wajibRole(['pelanggan']);
  const supabase = await createClient();

  const { error } = await supabase
    .from('pemesanan')
    .update({ status_pemesanan: 'dibatalkan' })
    .match({ id_pemesanan: id_pemesanan, id_user: pengguna.id_user, status_pemesanan: 'menunggu_pembayaran' });

  if (error) return { error: error.message };
  
  revalidatePath(`/transaksi/ringkasan/${id_pemesanan}`);
  return { success: true };
}