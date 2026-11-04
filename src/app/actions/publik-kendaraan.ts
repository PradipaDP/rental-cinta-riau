'use server';

import { createClient } from '@/lib/supabase/server';
import { Kendaraan } from '@/types';

// Mengambil kendaraan yang hanya berstatus 'tersedia'
export async function ambilKendaraanTersedia(limit?: number): Promise<Kendaraan[]> {
  const supabase = await createClient();
  let query = supabase
    .from('kendaraan')
    .select('*')
    .eq('status', 'tersedia')
    .order('created_at', { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;
  if (error) throw new Error('Gagal mengambil data kendaraan: ' + error.message);
  
  return data as Kendaraan[];
}

// Mengambil detail satu kendaraan berdasarkan ID
export async function ambilDetailKendaraan(id_kendaraan: string): Promise<Kendaraan | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('kendaraan')
    .select('*')
    .eq('id_kendaraan', id_kendaraan)
    .single();

  if (error) return null;
  return data as Kendaraan;
}