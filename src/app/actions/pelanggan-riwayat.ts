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

  // Generasi Signed URL untuk KTP dan SIM secara aman dari Supabase Storage
  const dataDenganSignedUrl = await Promise.all((data || []).map(async (item) => {
    let ktpUrl = null;
    let simUrl = null;

    // PERBAIKAN: Menggunakan kolom ktp_url dan sim_url, serta bucket dokumen-identitas
    if (item.ktp_url) {
      const { data: ktpData } = await supabase.storage.from('dokumen-identitas').createSignedUrl(item.ktp_url, 3600);
      ktpUrl = ktpData?.signedUrl || null;
    }
    if (item.sim_url) {
      const { data: simData } = await supabase.storage.from('dokumen-identitas').createSignedUrl(item.sim_url, 3600);
      simUrl = simData?.signedUrl || null;
    }

    return {
      ...item,
      ktp_signed_url: ktpUrl,
      sim_signed_url: simUrl,
    };
  }));

  return { 
    data: dataDenganSignedUrl, 
    totalCount: count || 0, 
    totalPages: Math.ceil((count || 0) / perPage),
    currentPage: page
  };
}