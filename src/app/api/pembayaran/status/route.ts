import { NextResponse } from 'next/server';
import { createClient, createAdminClient } from '@/lib/supabase/server';
import { coreApi, prosesStatusPembayaran } from '@/lib/midtrans';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const supabaseAdmin = await createAdminClient(); // Tambahkan hak akses admin
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Akses ditolak.' }, { status: 401 });

    const { id_pemesanan } = await request.json();

    // 1. Tarik dari database MENGGUNAKAN ADMIN CLIENT agar transaksi dengan id_user = null bisa terbaca
    const { data: trx } = await supabaseAdmin
      .from('transaksi')
      .select('id_transaksi_midtrans, pemesanan!inner(id_user)')
      .eq('id_pemesanan', id_pemesanan)
      .single();

    const pemesananIdUser = Array.isArray(trx?.pemesanan) 
      ? trx?.pemesanan[0]?.id_user 
      : (trx?.pemesanan as any)?.id_user;

    if (!trx || pemesananIdUser !== user.id) {
      return NextResponse.json({ error: 'Transaksi tidak ditemukan atau akses ditolak.' }, { status: 404 });
    }
    if (!trx.id_transaksi_midtrans) {
      return NextResponse.json({ error: 'Belum ada percobaan pembayaran.' }, { status: 400 });
    }

    // 2. Tarik Status dari Core API Midtrans
    let statusRes;
    try {
      statusRes = await coreApi.transaction.status(trx.id_transaksi_midtrans);
    } catch (apiError: any) {
      if (apiError.httpStatusCode === 404) {
        return NextResponse.json({ success: true, status: 'pending', note: 'Belum ada pembayaran yang masuk.' });
      }
      throw apiError;
    }

    // 3. Simpan perubahan ke database
    await prosesStatusPembayaran(
      statusRes.transaction_status,
      statusRes.fraud_status,
      statusRes.order_id,
      statusRes.payment_type
    );

    return NextResponse.json({ success: true, status: statusRes.transaction_status });

  } catch (error: any) {
    return NextResponse.json({ error: 'Gagal mengecek status: ' + error.message }, { status: 500 });
  }
}