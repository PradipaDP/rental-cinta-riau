import { createClient } from './supabase/server';
import { redirect } from 'next/navigation';
import { User, Role } from '@/types';

export async function ambilPenggunaSaatIni(): Promise<User | null> {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return null;
  }

  // Mengambil profil dan role dari tabel public.users
  const { data: userData, error: dbError } = await supabase
    .from('users')
    .select('*')
    .eq('id_user', user.id)
    .single();

  if (dbError || !userData) {
    return null;
  }

  return userData as User;
}

export async function wajibRole(rolesDiizinkan: Role[]) {
  const pengguna = await ambilPenggunaSaatIni();

  if (!pengguna) {
    redirect('/login');
  }

  if (!rolesDiizinkan.includes(pengguna.role)) {
    redirect('/akses-ditolak');
  }

  return pengguna;
}