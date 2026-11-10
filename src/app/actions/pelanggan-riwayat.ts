'use server';

import { createClient } from '@/lib/supabase/server';
import { wajibRole } from '@/lib/auth';

export async function ambilRiwayatPemesanan(page = 1, statusFilter = 'semua') {
  const pengguna = await wajibRole(['pelanggan']);
  const supabase = await createClient();
  
  const perPage = 5;
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;

  let query = supabase
    .from('pemesanan')
    .select(`
      *,
      kendaraan (*),
      transaksi (*)
    `, { count: 'exact' })
    .eq('id_user', pengguna.id_user)
    .order('created_at', { ascending: false });

  if (statusFilter !== 'semua') {
    query = query.eq('status_pemesanan', statusFilter);
  }

  const { data, count, error } = await query.range(from, to);

  if (error) throw new Error(error.message);

  return { 
    data: data || [], 
    totalCount: count || 0, 
    totalPages: Math.ceil((count || 0) / perPage),
    currentPage: page
  };
}