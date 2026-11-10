import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const supabase = await createClient();
  
  // 1. Keluar dari sesi Supabase Auth
  await supabase.auth.signOut();

  // 2. Dialihkan ke halaman login
  const requestUrl = new URL(request.url);
  return NextResponse.redirect(`${requestUrl.origin}/login`, {
    status: 303,
  });
}