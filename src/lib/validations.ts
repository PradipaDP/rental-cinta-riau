import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: "Format email tidak valid." }),
  password: z.string().min(1, { message: "Password wajib diisi." }),
});

export const registerSchema = z.object({
  nama: z.string().min(3, { message: "Nama minimal 3 karakter." }),
  email: z.string().email({ message: "Format email tidak valid." }),
  password: z.string().min(6, { message: "Password minimal 6 karakter." }),
  konfirmasiPassword: z.string(),
  no_hp: z.string().min(10, { message: "Nomor HP minimal 10 angka." }),
  alamat: z.string().min(10, { message: "Alamat terlalu singkat, mohon lengkapi." }),
}).refine((data) => data.password === data.konfirmasiPassword, {
  message: "Konfirmasi password tidak cocok.",
  path: ["konfirmasiPassword"],
});