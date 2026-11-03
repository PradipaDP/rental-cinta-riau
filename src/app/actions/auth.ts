'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    if (error.message.toLowerCase().includes('banned')) {
      return { error: 'Akses Ditolak: Akun Anda telah dinonaktifkan oleh Super Admin.' };
    }
    if (error.message.includes('Invalid login credentials')) {
      return { error: 'Email atau password yang Anda masukkan salah.' };
    }
    return { error: error.message };
  }

  const { data: userData } = await supabase
    .from('users')
    .select('role')
    .eq('id_user', data.user.id)
    .single();

  const role = userData?.role || 'pelanggan';

  if (role === 'super_admin') redirect('/super-admin');
  if (role === 'admin') redirect('/admin');
  if (role === 'staf') redirect('/staf');
  redirect('/pencarian-pintar');
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/login');
}

export async function registerAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const nama = formData.get('nama') as string;
  
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) return { error: error.message };

  if (data.user) {
    const { error: dbErr } = await supabase.from('users').upsert({
      id_user: data.user.id,
      email,
      nama,
      role: 'pelanggan',
    });
    if (dbErr) return { error: dbErr.message };
  }

  return { success: true };
}