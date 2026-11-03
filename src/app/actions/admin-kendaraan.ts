'use server';

import { createClient } from '@/lib/supabase/server';
import { wajibRole } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const KendaraanSchema = z.object({
  nama_kendaraan: z.string().min(1, "Nama kendaraan wajib diisi."),
  jenis_kendaraan: z.string().min(1, "Jenis kendaraan wajib diisi."),
  plat_nomor: z.string().min(1, "Plat nomor wajib diisi."),
  kapasitas: z.coerce.number().positive("Kapasitas harus lebih dari 0."),
  bahan_bakar: z.string().min(1, "Bahan bakar wajib diisi."),
  transmisi: z.string().min(1, "Transmisi wajib diisi."),
  rute_peruntukan: z.string().min(1, "Rute peruntukan wajib diisi."),
  tahun_kendaraan: z.coerce.number()
    .min(1990, "Tahun kendaraan minimal 1990.")
    .max(new Date().getFullYear() + 1, "Tahun kendaraan tidak masuk akal."),
  harga_sewa: z.coerce.number().positive("Harga sewa harus lebih dari 0."),
  fitur_tambahan: z.string().optional(),
  status: z.string(),
});

export async function ambilDaftarKendaraan() {
  await wajibRole(['admin', 'super_admin']);
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('kendaraan')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error('Gagal mengambil data kendaraan: ' + error.message);
  return data;
}

export async function tambahKendaraan(formData: FormData) {
  await wajibRole(['admin', 'super_admin']);
  const supabase = await createClient();
  
  const parsed = KendaraanSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const data = parsed.data;

  // Ubah string fitur tambahan menjadi Array agar sesuai dengan tipe data kolom Supabase
  const fiturArray = data.fitur_tambahan 
    ? data.fitur_tambahan.split(',').map(f => f.trim()).filter(Boolean) 
    : [];

  // Upload Foto
  const fotoFile = formData.get('foto') as File | null;
  let foto_url = '';
  
  if (fotoFile && fotoFile.size > 0) {
    if (fotoFile.size > 2 * 1024 * 1024) return { error: "Ukuran foto maksimal 2 MB." };
    const fileExt = fotoFile.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const { error: uploadErr } = await supabase.storage
      .from('foto-kendaraan')
      .upload(fileName, fotoFile);
      
    if (uploadErr) return { error: 'Gagal mengunggah foto: ' + uploadErr.message };
    const { data: publicUrlData } = supabase.storage.from('foto-kendaraan').getPublicUrl(fileName);
    foto_url = publicUrlData.publicUrl;
  }

  const { error: dbErr } = await supabase.from('kendaraan').insert({
    ...data,
    fitur_tambahan: fiturArray,
    foto_url,
  });

  if (dbErr) {
    if (dbErr.code === '23505') return { error: "Plat nomor sudah terdaftar." };
    return { error: dbErr.message };
  }

  revalidatePath('/admin/kendaraan');
  return { success: true };
}

export async function ubahKendaraan(id_kendaraan: string, formData: FormData, oldFotoUrl: string) {
  await wajibRole(['admin', 'super_admin']);
  const supabase = await createClient();
  
  const parsed = KendaraanSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const data = parsed.data;

  const fiturArray = data.fitur_tambahan 
    ? data.fitur_tambahan.split(',').map(f => f.trim()).filter(Boolean) 
    : [];

  let foto_url = oldFotoUrl;
  const fotoFile = formData.get('foto') as File | null;

  if (fotoFile && fotoFile.size > 0) {
    if (fotoFile.size > 2 * 1024 * 1024) return { error: "Ukuran foto maksimal 2 MB." };
    
    if (oldFotoUrl) {
      const oldFileName = oldFotoUrl.split('/').pop();
      if (oldFileName) await supabase.storage.from('foto-kendaraan').remove([oldFileName]);
    }

    const fileExt = fotoFile.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const { error: uploadErr } = await supabase.storage.from('foto-kendaraan').upload(fileName, fotoFile);
    if (uploadErr) return { error: 'Gagal mengunggah foto: ' + uploadErr.message };
    
    const { data: publicUrlData } = supabase.storage.from('foto-kendaraan').getPublicUrl(fileName);
    foto_url = publicUrlData.publicUrl;
  }

  const { error: dbErr } = await supabase.from('kendaraan').update({
    ...data,
    fitur_tambahan: fiturArray,
    foto_url,
  }).eq('id_kendaraan', id_kendaraan);

  if (dbErr) {
    if (dbErr.code === '23505') return { error: "Plat nomor sudah terdaftar." };
    return { error: dbErr.message };
  }

  revalidatePath('/admin/kendaraan');
  return { success: true };
}

export async function ubahStatusKendaraan(id_kendaraan: string, newStatus: string) {
  await wajibRole(['admin', 'super_admin']);
  const supabase = await createClient();
  const { error } = await supabase.from('kendaraan').update({ status: newStatus }).eq('id_kendaraan', id_kendaraan);
  if (error) return { error: error.message };
  revalidatePath('/admin/kendaraan');
  return { success: true };
}

export async function hapusKendaraan(id_kendaraan: string, fotoUrl: string) {
  await wajibRole(['admin', 'super_admin']);
  const supabase = await createClient();
  
  const { error: dbErr } = await supabase.from('kendaraan').delete().eq('id_kendaraan', id_kendaraan);
  
  if (dbErr) {
    if (dbErr.code === '23503') return { error: "Kendaraan tidak bisa dihapus karena memiliki riwayat transaksi/pemesanan aktif." };
    return { error: dbErr.message };
  }

  if (fotoUrl) {
    const fileName = fotoUrl.split('/').pop();
    if (fileName) await supabase.storage.from('foto-kendaraan').remove([fileName]);
  }

  revalidatePath('/admin/kendaraan');
  return { success: true };
}