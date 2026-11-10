import { NextResponse } from 'next/server';
import { createClient, createAdminClient } from '@/lib/supabase/server';
import { snap } from '@/lib/midtrans';
import { SNAP_EXPIRY_MENIT } from '@/lib/config';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const supabaseAdmin = await createAdminClient(); // Menggunakan hak akses admin untuk bypass RLS
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Akses ditolak. Silakan login kembali.' }, { status: 401 });

    const { id_pemesanan } = await request.json();

    // 1. Ambil & Validasi Pemesanan (Aman dengan RLS biasa)
    const { data: pesanan } = await supabase
      .from('pemesanan')
      .select('*, kendaraan(nama_kendaraan, harga_sewa)')
      .eq('id_pemesanan', id_pemesanan)
      .eq('id_user', user.id)
      .single();

    if (!pesanan) return NextResponse.json({ error: 'Data pemesanan tidak ditemukan.' }, { status: 404 });
    if (pesanan.status_pemesanan !== 'menunggu_pembayaran') {
      return NextResponse.json({ error: 'Pemesanan sudah dibayar atau dibatalkan.' }, { status: 400 });
    }

    // 2. Hitung Total Harga Secara Aman di Server
    const startDate = new Date(pesanan.tanggal_sewa);
    const endDate = new Date(pesanan.tanggal_kembali);
    let diffDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
    if (diffDays < 1) diffDays = 1;
    const totalHarga = diffDays * pesanan.kendaraan.harga_sewa;

    // 3. Buat Order ID Baru
    const orderId = `TRX-${pesanan.id_pemesanan.split('-')[0]}-${Math.floor(Date.now() / 1000)}`;

    // 4. Siapkan/Update Tabel Transaksi MENGGUNAKAN ADMIN CLIENT
    const { data: existingTrx } = await supabaseAdmin.from('transaksi').select('id_transaksi').eq('id_pemesanan', id_pemesanan).single();

    if (existingTrx) {
      await supabaseAdmin.from('transaksi').update({ 
        id_transaksi_midtrans: orderId, 
        total_harga: totalHarga 
      }).eq('id_transaksi', existingTrx.id_transaksi);
    } else {
      await supabaseAdmin.from('transaksi').insert({
        id_user: null, 
        id_kendaraan: pesanan.id_kendaraan,
        id_pemesanan: id_pemesanan,
        tanggal_sewa: pesanan.tanggal_sewa,
        tanggal_kembali: pesanan.tanggal_kembali,
        total_harga: totalHarga,
        metode_pembayaran: 'belum_memilih',
        status_pembayaran: 'pending',
        status: 'berjalan',
        id_transaksi_midtrans: orderId,
        denda: 0
      });
    }

    // 5. Minta Token ke Midtrans
    const { data: userData } = await supabase.from('users').select('nama, email, no_hp').eq('id_user', user.id).single();

    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: totalHarga
      },
      item_details: [{
        id: pesanan.id_kendaraan,
        price: pesanan.kendaraan.harga_sewa,
        quantity: diffDays,
        name: `Sewa ${pesanan.kendaraan.nama_kendaraan.substring(0, 30)}`
      }],
      customer_details: {
        first_name: userData?.nama || 'Pelanggan',
        email: userData?.email || user.email,
        phone: userData?.no_hp || ''
      },
      custom_expiry: {
        expiry_duration: SNAP_EXPIRY_MENIT,
        unit: 'minute'
      }
    };

    const transaction = await snap.createTransaction(parameter);
    return NextResponse.json({ token: transaction.token });
    
  } catch (error: any) {
    return NextResponse.json({ error: 'Gagal memproses pembayaran: ' + error.message }, { status: 500 });
  }
}