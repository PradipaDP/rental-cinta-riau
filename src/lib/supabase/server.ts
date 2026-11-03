import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch (error) {
            // Error ini diabaikan jika dipanggil dari Server Component 
            // (karena Server Component tidak bisa mengubah cookie)
          }
        },
      },
    }
  );
}

// KHUSUS SERVER: Client dengan hak akses super (melewati RLS)
// Hanya gunakan ini untuk aksi admin tersembunyi yang benar-benar divalidasi
export async function createAdminClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // Memakai Service Role Key
    {
      cookies: {
        getAll() { return []; },
        setAll() {},
      }
    }
  );
}