import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { prosesStatusPembayaran } from '@/lib/midtrans';

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    // 1. Verifikasi Keamanan Signature Key (Cegah Hacker memalsukan notifikasi Lunas)
    const orderId = payload.order_id || '';
    const statusCode = payload.status_code || '';
    const grossAmount = payload.gross_amount || '';
    const serverKey = process.env.MIDTRANS_SERVER_KEY || '';

    const expectedSignature = crypto
      .createHash('sha512')
      .update(orderId + statusCode + grossAmount + serverKey)
      .digest('hex');

    if (expectedSignature !== payload.signature_key) {
      console.error('Peringatan: Verifikasi Signature Midtrans Gagal!');
      return NextResponse.json({ error: 'Invalid Signature' }, { status: 403 });
    }

    // 2. Eksekusi Perubahan Status
    await prosesStatusPembayaran(
      payload.transaction_status,
      payload.fraud_status,
      orderId,
      payload.payment_type
    );

    // 3. Wajib membalas 200 OK agar Midtrans tidak menembak webhook berulang-ulang (Idempotent)
    return NextResponse.json({ success: true, message: 'Notifikasi Diterima' }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ error: 'Kesalahan Server: ' + error.message }, { status: 500 });
  }
}