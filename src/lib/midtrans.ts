// @ts-ignore
import midtransClient from 'midtrans-client';
import { createAdminClient } from './supabase/server';

export const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY!,
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!,
});

export const coreApi = new midtransClient.CoreApi({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY!,
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!,
});

// Fungsi sentral untuk mengubah status dari Webhook atau Cek Manual
export async function prosesStatusPembayaran(
  transactionStatus: string, 
  fraudStatus: string | null, 
  orderId: string, 
  paymentType: string
) {
  const supabaseAdmin = await createAdminClient(); // Bypass RLS karena dijalankan oleh sistem/webhook

  let statusPembayaranDb = 'pending';
  let statusPemesananDb = 'menunggu_pembayaran';
  let statusTransaksiDb = 'berjalan';

  // Pemetaan Status sesuai aturan Midtrans
  if (transactionStatus === 'capture') {
    if (fraudStatus === 'challenge') {
      statusPembayaranDb = 'pending';
    } else if (fraudStatus === 'accept') {
      statusPembayaranDb = 'settlement';
      statusPemesananDb = 'dibayar';
    }
  } else if (transactionStatus === 'settlement') {
    statusPembayaranDb = 'settlement';
    statusPemesananDb = 'dibayar';
  } else if (transactionStatus === 'cancel' || transactionStatus === 'deny' || transactionStatus === 'expire') {
    statusPembayaranDb = transactionStatus;
    statusPemesananDb = 'dibatalkan';
    statusTransaksiDb = 'dibatalkan'; // Transaksi dihentikan
  } else if (transactionStatus === 'pending') {
    statusPembayaranDb = 'pending';
    statusPemesananDb = 'menunggu_pembayaran';
  }

  // Cari transaksi berdasarkan order_id dari Midtrans
  const { data: trx } = await supabaseAdmin
    .from('transaksi')
    .select('id_transaksi, id_pemesanan, status_pembayaran')
    .eq('id_transaksi_midtrans', orderId)
    .single();

  if (!trx) return;

  // IDEMPOTEN: Jangan membatalkan status yang sudah lunas (settlement) walau ada ping delay
  if (trx.status_pembayaran === 'settlement' && statusPembayaranDb !== 'settlement') return;

  // 1. Update tabel transaksi
  await supabaseAdmin.from('transaksi').update({
    status_pembayaran: statusPembayaranDb,
    status: statusTransaksiDb,
    metode_pembayaran: paymentType || 'belum_memilih'
  }).eq('id_transaksi', trx.id_transaksi);

  // 2. Update tabel pemesanan
  await supabaseAdmin.from('pemesanan').update({
    status_pemesanan: statusPemesananDb
  }).eq('id_pemesanan', trx.id_pemesanan);
}