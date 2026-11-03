'use server';

// Menggunakan relative path agar VS Code langsung mengenali file
import { createClient } from '../../lib/supabase/server';
import { redirect } from 'next/navigation';
import { loginSchema, registerSchema } from '../../lib/validations';

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // 1. Validasi Zod
  const validasi = loginSchema.safeParse({ email, password });
  if (!validasi.success) {
    return { error: validasi.error.issues[0].message };
  }

  // 2. Proses Login ke Supabase
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    let pesanError = error.message;
    if (pesanError.includes('Invalid login credentials')) {
      pesanError = 'Email atau password salah.';
    } else if (pesanError.toLowerCase().includes('banned')) {
      pesanError = 'Akses Ditolak: Akun Anda telah dinonaktifkan oleh Super Admin.';
    }
    return { error: pesanError };
  }

  // 3. Ambil role dari tabel users
  const { data: userData, error: dbError } = await supabase
    .from('users')
    .select('role')
    .eq('id_user', data.user.id)
    .single();

  if (dbError || !userData) {
    return { error: 'Gagal mengambil data profil pengguna.' };
  }

  // 4. Arahkan sesuai role (Menggunakan return path)
  let redirectPath = '/pencarian-pintar';
  if (userData.role === 'super_admin') redirectPath = '/super-admin';
  else if (userData.role === 'admin') redirectPath = '/admin';
  else if (userData.role === 'staf') redirectPath = '/staf';

  return { success: true, redirectPath };
}

export async function registerAction(prevState: any, formData: FormData) {
  const dataForm = Object.fromEntries(formData.entries());

  // 1. Validasi Zod
  const validasi = registerSchema.safeParse(dataForm);
  if (!validasi.success) {
    return { error: validasi.error.issues[0].message };
  }

  // 2. Proses Register ke Supabase
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email: validasi.data.email,
    password: validasi.data.password,
    options: {
      data: {
        nama: validasi.data.nama,
        no_hp: validasi.data.no_hp,
        alamat: validasi.data.alamat,
      },
    },
  });

  if (error) {
    let pesanError = error.message;
    if (pesanError.includes('already registered')) {
      pesanError = 'Email sudah terdaftar.';
    }
    return { error: pesanError };
  }

  return { success: true, redirectPath: '/pencarian-pintar' };
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/login');
}