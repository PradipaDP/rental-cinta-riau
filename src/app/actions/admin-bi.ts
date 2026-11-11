'use server';

import { createAdminClient } from '@/lib/supabase/admin';
import { wajibRole } from '@/lib/auth';

async function pastikanAdminBI() {
  const pengguna = await wajibRole(['admin']);
  return pengguna;
}

export async function ambilDataDashboardBI(tahun: string) {
  await pastikanAdminBI();
  const supabase = createAdminClient();

  const { data: dataBulanan } = await supabase
    .from('view_bi_bulanan')
    .select('*')
    .like('bulan', `${tahun}-%`)
    .order('bulan', { ascending: true });

  const { data: kendaraanPopuler } = await supabase
    .from('view_bi_kendaraan_populer')
    .select('*')
    .limit(5);

  const { data: statusKomposisi } = await supabase
    .from('view_bi_status_transaksi')
    .select('*');

  const { data: armadaTersedia } = await supabase.from('kendaraan').select('id_kendaraan', { count: 'exact' }).eq('status', 'tersedia');
  const { data: armadaDisewa } = await supabase.from('kendaraan').select('id_kendaraan', { count: 'exact' }).eq('status', 'disewa');
  const { data: pesananPending } = await supabase.from('pemesanan').select('id_pemesanan', { count: 'exact' }).eq('status_pemesanan', 'menunggu_pembayaran');
  
  const totalPendapatan = dataBulanan?.reduce((sum, row) => sum + Number(row.total_pendapatan), 0) || 0;
  const totalTransaksi = dataBulanan?.reduce((sum, row) => sum + Number(row.jumlah_transaksi), 0) || 0;

  return {
    bulanan: dataBulanan || [],
    kendaraanPopuler: kendaraanPopuler || [],
    statusKomposisi: statusKomposisi || [],
    ringkasan: {
      totalPendapatan,
      totalTransaksi,
      mobilTersedia: armadaTersedia?.length || 0,
      mobilDisewa: armadaDisewa?.length || 0,
      pesananPending: pesananPending?.length || 0
    }
  };
}

export async function ambilMonitoringTransaksi(page = 1, limit = 10, search = '', status = '', tahun = '') {
  await pastikanAdminBI();
  const supabase = createAdminClient();
  
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from('transaksi')
    .select(`
      *,
      pemesanan(users(nama)),
      kendaraan(nama_kendaraan, plat_nomor)
    `, { count: 'exact' })
    .order('created_at', { ascending: false });

  if (status) {
    query = query.eq('status', status);
  }
  if (tahun) {
    query = query.gte('tanggal_sewa', `${tahun}-01-01`).lte('tanggal_sewa', `${tahun}-12-31`);
  }

  const { data, count, error } = await query.range(from, to);
  if (error) throw new Error(error.message);

  let finalData = data;
  if (search) {
    const s = search.toLowerCase();
    finalData = data.filter((t: any) => 
      t.id_transaksi.toLowerCase().includes(s) ||
      (t.pemesanan?.users?.nama || '').toLowerCase().includes(s) ||
      (t.kendaraan?.nama_kendaraan || '').toLowerCase().includes(s)
    );
  }

  return {
    data: finalData || [],
    totalCount: count || 0,
    totalPages: Math.ceil((count || 0) / limit),
    currentPage: page
  };
}

export async function ambilDataEksporLaporan(tahun: string, bulan: string) {
  await pastikanAdminBI();
  const supabase = createAdminClient();

  let query = supabase
    .from('transaksi')
    .select(`
      id_transaksi, tanggal_sewa, tanggal_kembali, total_harga, denda, metode_pembayaran, status_pembayaran, status,
      pemesanan(users(nama)),
      kendaraan(nama_kendaraan)
    `)
    .order('tanggal_sewa', { ascending: true });

  if (tahun && bulan) {
    const b = bulan.padStart(2, '0');
    // Hitung tanggal akhir bulan secara presisi (misal: Jan -> 31, Feb -> 28/29)
    const lastDay = new Date(parseInt(tahun), parseInt(bulan), 0).getDate();
    const startStr = `${tahun}-${b}-01`;
    const endStr = `${tahun}-${b}-${lastDay}`;
    
    query = query.gte('tanggal_sewa', startStr).lte('tanggal_sewa', endStr);
  } else if (tahun) {
    query = query.gte('tanggal_sewa', `${tahun}-01-01`).lte('tanggal_sewa', `${tahun}-12-31`);
  }

  const { data, error } = await query;
  if (error) throw new Error(error.message);

  return data || [];
}