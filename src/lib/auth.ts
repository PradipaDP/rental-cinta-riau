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

  // Fallback aman jika data profil di database belum lengkap
  if (dbError || !userData) {
    return {
      id_user: user.id,
      nama: user.user_metadata?.nama || user.email?.split('@')[0] || 'Pengguna',
      email: user.email || '',
      role: 'pelanggan',
      no_hp: user.user_metadata?.no_hp || null,
      alamat: user.user_metadata?.alamat || null,
    } as User;
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