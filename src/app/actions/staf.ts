'use server';

import { createAdminClient } from '@/lib/supabase/admin';
import { wajibRole } from '@/lib/auth';
import { hitungJumlahHari } from '@/lib/formatters';
import { revalidatePath } from 'next/cache';

// 1. Dashboard: Jadwal Hari Ini
export async function ambilJadwalHariIni() {
  await wajibRole(['staf']);
  const supabase = createAdminClient();
  const today = new Date().toISOString().split('T')[0];

  const { data: pengambilan } = await supabase
    .from('pemesanan')
    .select('*, kendaraan(*), users(nama, no_hp)')
    .eq('status_pemesanan', 'dibayar')
    .lte('tanggal_sewa', today)
    .order('tanggal_sewa', { ascending: true });

  const { data: pengembalian } = await supabase
    .from('pemesanan')
    .select('*, kendaraan(*), users(nama, no_hp), transaksi(*)')
    .eq('status_pemesanan', 'diambil')
    .lte('tanggal_kembali', today)
    .order('tanggal_kembali', { ascending: true });

  return { pengambilan: pengambilan || [], pengembalian: pengembalian || [] };
}

// 2. Ketersediaan
export async function ambilKetersediaan() {
  await wajibRole(['staf']);
  const supabase = createAdminClient();
  
  const { data: kendaraan } = await supabase.from('kendaraan').select('*').order('nama_kendaraan');
  const { data: pemesanan } = await supabase
    .from('pemesanan')
    .select('id_kendaraan, tanggal_sewa, tanggal_kembali, status_pemesanan, users(nama)')
    .in('status_pemesanan', ['menunggu_pembayaran', 'dibayar', 'diambil']);

  return { kendaraan: kendaraan || [], pemesanan: pemesanan || [] };
}

// 3. Proses Transaksi Walk-in
export async function prosesWalkIn(formData: FormData) {
  const staf = await wajibRole(['staf']);
  const supabase = createAdminClient();

  const nama = formData.get('nama') as string;
  const no_hp = formData.get('no_hp') as string;
  const alamat = formData.get('alamat') as string;
  let email = formData.get('email') as string;

  let id_pelanggan = '';
  if (!email) email = `walkin-${Date.now()}@cintariau.local`;
  
  const { data: existingUser } = await supabase.from('users').select('id_user').eq('email', email).single();
  if (existingUser) {
    id_pelanggan = existingUser.id_user;
  } else {
    const password = Math.random().toString(36).slice(-8) + 'Aa1!';
    const { data: authData, error: authErr } = await supabase.auth.admin.createUser({
      email, password, email_confirm: true,
    });
    if (authErr) return { error: 'Gagal membuat akun pelanggan: ' + authErr.message };
    id_pelanggan = authData.user.id;
    await supabase.from('users').insert({
      id_user: id_pelanggan, nama, email, role: 'pelanggan', no_hp, alamat
    });
  }

  const id_kendaraan = formData.get('id_kendaraan') as string;
  const tgl_sewa = formData.get('tanggal_sewa') as string;
  const tgl_kembali = formData.get('tanggal_kembali') as string;
  const rute = formData.get('rute_perjalanan') as string;
  const metode_bayar = formData.get('metode_pembayaran') as string;

  const { data: mobil } = await supabase.from('kendaraan').select('*').eq('id_kendaraan', id_kendaraan).single();
  if (!mobil || mobil.status !== 'tersedia') return { error: 'Kendaraan tidak tersedia.' };

  let ktpUrl = null;
  let simUrl = null;
  const ktpFile = formData.get('ktp') as File | null;
  const simFile = formData.get('sim') as File | null;
  
  if (ktpFile && ktpFile.size > 0) {
    const ktpExt = ktpFile.name.split('.').pop();
    const fileName = `${id_pelanggan}/${Date.now()}_ktp_walkin.${ktpExt}`;
    await supabase.storage.from('dokumen-identitas').upload(fileName, ktpFile);
    ktpUrl = fileName;
  }
  if (simFile && simFile.size > 0) {
    const simExt = simFile.name.split('.').pop();
    const fileName = `${id_pelanggan}/${Date.now()}_sim_walkin.${simExt}`;
    await supabase.storage.from('dokumen-identitas').upload(fileName, simFile);
    simUrl = fileName;
  }

  const { data: pesanan, error: errP } = await supabase.from('pemesanan').insert({
    id_user: id_pelanggan,
    id_kendaraan,
    tanggal_sewa: tgl_sewa,
    tanggal_kembali: tgl_kembali,
    rute_perjalanan: rute,
    ktp_url: ktpUrl,
    sim_url: simUrl,
    status_pemesanan: 'dibayar',
    status_verifikasi: ktpUrl ? 'menunggu' : 'valid',
  }).select('id_pemesanan').single();

  if (errP) return { error: errP.message };

  const total_harga = hitungJumlahHari(tgl_sewa, tgl_kembali) * mobil.harga_sewa;

  const { error: errT } = await supabase.from('transaksi').insert({
    id_user: staf.id_user,
    id_kendaraan,
    id_pemesanan: pesanan.id_pemesanan,
    tanggal_sewa: tgl_sewa,
    tanggal_kembali: tgl_kembali,
    total_harga,
    metode_pembayaran: metode_bayar,
    status_pembayaran: 'settlement',
    status: 'berjalan',
  });

  if (errT) return { error: errT.message };

  revalidatePath('/staf');
  revalidatePath('/staf/serah-terima');
  return { success: true, id_pemesanan: pesanan.id_pemesanan };
}

// 4. Proses Serah Terima (Read List)
export async function ambilDaftarSerahTerima() {
  await wajibRole(['staf']);
  const supabase = createAdminClient();
  const { data } = await supabase
    .from('pemesanan')
    .select('*, kendaraan(*), users(*)')
    .eq('status_pemesanan', 'dibayar')
    .order('tanggal_sewa', { ascending: true });
  return data || [];
}

// 5. Proses Serah Terima (Read Detail & Signed URL)
export async function ambilDetailSerahTerima(id_pemesanan: string) {
  await wajibRole(['staf']);
  const supabase = createAdminClient();
  
  const { data: pesanan, error } = await supabase
    .from('pemesanan')
    .select('*, kendaraan(*), users(*), transaksi(*)')
    .eq('id_pemesanan', id_pemesanan)
    .single();

  if (error) {
    console.error('Gagal mengambil detail serah terima:', error);
    return null;
  }
  if (!pesanan) return null;

  let ktpSigned = null, simSigned = null;
  if (pesanan.ktp_url) {
    const { data } = await supabase.storage.from('dokumen-identitas').createSignedUrl(pesanan.ktp_url, 3600);
    ktpSigned = data?.signedUrl || null;
  }
  if (pesanan.sim_url) {
    const { data } = await supabase.storage.from('dokumen-identitas').createSignedUrl(pesanan.sim_url, 3600);
    simSigned = data?.signedUrl || null;
  }

  return { ...pesanan, ktp_signed_url: ktpSigned, sim_signed_url: simSigned };
}

// 6. Validasi Dokumen
export async function ubahStatusVerifikasi(id_pemesanan: string, status_verifikasi: 'valid' | 'ditolak') {
  await wajibRole(['staf']);
  const supabase = createAdminClient();
  const { error } = await supabase.from('pemesanan').update({ status_verifikasi }).eq('id_pemesanan', id_pemesanan);
  if (error) return { error: error.message };
  revalidatePath(`/staf/serah-terima/${id_pemesanan}`);
  return { success: true };
}

// 7. Serahkan Kendaraan (Aksi Inti)
export async function prosesSerahkanKendaraan(id_pemesanan: string) {
  const staf = await wajibRole(['staf']);
  const supabase = createAdminClient();

  const { data: pesanan } = await supabase.from('pemesanan').select('*, transaksi(*)').eq('id_pemesanan', id_pemesanan).single();
  if (!pesanan) return { error: 'Pesanan tidak ditemukan' };
  
  const trx = Array.isArray(pesanan.transaksi) ? pesanan.transaksi[0] : pesanan.transaksi;
  if (!trx || trx.status_pembayaran !== 'settlement') return { error: 'Pembayaran belum lunas (settlement).' };
  if (pesanan.status_verifikasi !== 'valid') return { error: 'Dokumen belum divalidasi (Valid).' };

  await supabase.from('pemesanan').update({ status_pemesanan: 'diambil' }).eq('id_pemesanan', id_pemesanan);
  await supabase.from('kendaraan').update({ status: 'disewa' }).eq('id_kendaraan', pesanan.id_kendaraan);
  await supabase.from('transaksi').update({ 
    id_user: staf.id_user, 
    status: 'berjalan' 
  }).eq('id_transaksi', trx.id_transaksi);

  revalidatePath('/staf/serah-terima');
  revalidatePath('/staf');
  return { success: true };
}

// 8. Pengembalian List
export async function ambilDaftarPengembalian() {
  await wajibRole(['staf']);
  const supabase = createAdminClient();
  const { data } = await supabase
    .from('transaksi')
    .select('*, pemesanan(*, users(nama)), kendaraan(nama_kendaraan)')
    .eq('status', 'berjalan')
    .order('tanggal_kembali', { ascending: true });
  return data || [];
}