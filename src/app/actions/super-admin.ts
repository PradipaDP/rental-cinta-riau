'use server';

import { createAdminClient } from '@/lib/supabase/admin';
import { wajibRole } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function ambilDaftarPengguna() {
  await wajibRole(['super_admin']);
  const supabaseAdmin = createAdminClient();

  const { data: publicUsers, error: dbErr } = await supabaseAdmin
    .from('users')
    .select('*')
    .order('created_at', { ascending: false });

  const { data: authData, error: authErr } = await supabaseAdmin.auth.admin.listUsers();

  if (dbErr || authErr) throw new Error('Gagal mengambil data pengguna');

  const authUsers = authData.users;
  return publicUsers.map((pu) => {
    // Cocokkan id dari auth dengan id_user dari tabel public.users
    const au = authUsers.find((a) => a.id === pu.id_user);
    const isBanned = au?.banned_until ? new Date(au.banned_until) > new Date() : false;
    return { ...pu, isBanned };
  });
}

export async function tambahPenggunaAdmin(formData: FormData) {
  await wajibRole(['super_admin']);
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const nama = formData.get('nama') as string;
  const no_hp = formData.get('no_hp') as string;
  const alamat = formData.get('alamat') as string;
  const role = formData.get('role') as string;

  if (role === 'super_admin') {
    return { error: 'Keamanan: Tidak diizinkan membuat Super Admin baru dari form ini.' };
  }

  const supabaseAdmin = createAdminClient();
  const { data: authData, error: authErr } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (authErr) return { error: authErr.message };

  // Gunakan id_user sesuai nama kolom di database
  const { error: dbErr } = await supabaseAdmin.from('users').upsert({
    id_user: authData.user.id,
    email,
    nama,
    role,
    no_hp,
    alamat,
  });

  if (dbErr) return { error: dbErr.message };
  revalidatePath('/super-admin');
  return { success: true };
}

export async function ubahRolePengguna(id_user: string, newRole: string) {
  const adminSaatIni = (await wajibRole(['super_admin'])) as any;
  
  // Cek validasi menggunakan id_user
  if (id_user === adminSaatIni.id_user) {
    return { error: 'Keamanan: Anda tidak bisa mengubah role Anda sendiri.' };
  }
  if (newRole === 'super_admin') {
    return { error: 'Keamanan: Tidak dapat mengangkat akun menjadi Super Admin.' };
  }

  const supabaseAdmin = createAdminClient();
  const { error } = await supabaseAdmin.from('users').update({ role: newRole }).eq('id_user', id_user);
  
  if (error) return { error: error.message };
  revalidatePath('/super-admin');
  return { success: true };
}

export async function toggleStatusPengguna(id_user: string, isCurrentlyBanned: boolean) {
  const adminSaatIni = (await wajibRole(['super_admin'])) as any;
  
  // Cek validasi menggunakan id_user
  if (id_user === adminSaatIni.id_user) {
    return { error: 'Keamanan: Anda tidak bisa menonaktifkan akun Anda sendiri.' };
  }

  const supabaseAdmin = createAdminClient();
  // Di Supabase Auth, UUID selalu menggunakan 'id'
  const { error } = await supabaseAdmin.auth.admin.updateUserById(id_user, {
    ban_duration: isCurrentlyBanned ? 'none' : '876600h',
  });

  if (error) return { error: error.message };
  revalidatePath('/super-admin');
  return { success: true };
}