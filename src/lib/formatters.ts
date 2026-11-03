import { format, differenceInDays } from 'date-fns';
import { id } from 'date-fns/locale';

export const formatRupiah = (angka: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(angka);
};

export const formatTanggal = (tanggal: string | Date): string => {
  // Format contoh: 12 Agustus 2026, 14:30 WIB
  const dateObj = typeof tanggal === 'string' ? new Date(tanggal) : tanggal;
  return format(dateObj, 'd MMMM yyyy, HH:mm', { locale: id }) + ' WIB';
};

export const hitungJumlahHari = (start: string | Date, end: string | Date): number => {
  const startDate = typeof start === 'string' ? new Date(start) : start;
  const endDate = typeof end === 'string' ? new Date(end) : end;
  
  // Minimal sewa dihitung 1 hari walaupun dikembalikan di hari yang sama
  const selisih = differenceInDays(endDate, startDate);
  return selisih < 1 ? 1 : selisih;
};