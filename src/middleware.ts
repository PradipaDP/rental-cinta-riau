import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Perbarui dan dapatkan sesi Auth
  const { data: { user } } = await supabase.auth.getUser();
  const pathname = request.nextUrl.pathname;

  // Rute terproteksi
  const isProtected = pathname.startsWith('/super-admin') || 
                      pathname.startsWith('/admin') || 
                      pathname.startsWith('/staf') || 
                      pathname.startsWith('/transaksi') || 
                      pathname.startsWith('/riwayat');

  // 1. Jika belum login dan masuk rute terproteksi
  if (!user && isProtected) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    // Simpan rute asli agar bisa dikembalikan setelah login (opsional)
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }

  // 2. Jika sudah login
  if (user) {
    const { data: userData } = await supabase.from('users').select('role').eq('id_user', user.id).single();
    const role = userData?.role || 'pelanggan';

    // 2a. Cegah user login masuk ke halaman login/register lagi
    if (pathname === '/login' || pathname === '/register') {
      const url = request.nextUrl.clone();
      if (role === 'super_admin') url.pathname = '/super-admin';
      else if (role === 'admin') url.pathname = '/admin';
      else if (role === 'staf') url.pathname = '/staf';
      else url.pathname = '/pencarian-pintar';
      return NextResponse.redirect(url);
    }

    // 2b. Blokir akses ke role lain
    if (isProtected) {
      if (pathname.startsWith('/super-admin') && role !== 'super_admin') {
        return NextResponse.redirect(new URL('/akses-ditolak', request.url));
      }
      if (pathname.startsWith('/admin') && role !== 'admin') {
        return NextResponse.redirect(new URL('/akses-ditolak', request.url));
      }
      if (pathname.startsWith('/staf') && role !== 'staf') {
        return NextResponse.redirect(new URL('/akses-ditolak', request.url));
      }
      if ((pathname.startsWith('/transaksi') || pathname.startsWith('/riwayat')) && role !== 'pelanggan') {
        return NextResponse.redirect(new URL('/akses-ditolak', request.url));
      }
    }
  }

  return supabaseResponse;
}

// Menentukan file apa saja yang diawasi middleware (mengabaikan aset statis)
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};