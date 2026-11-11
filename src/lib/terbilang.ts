export function terbilang(angka: number): string {
  const huruf = ["", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas"];
  let hasil = "";

  if (angka < 12) {
    hasil = huruf[angka];
  } else if (angka < 20) {
    hasil = terbilang(angka - 10) + " belas";
  } else if (angka < 100) {
    hasil = terbilang(Math.floor(angka / 10)) + " puluh " + terbilang(angka % 10);
  } else if (angka < 200) {
    hasil = "seratus " + terbilang(angka - 100);
  } else if (angka < 1000) {
    hasil = terbilang(Math.floor(angka / 100)) + " ratus " + terbilang(angka % 100);
  } else if (angka < 2000) {
    hasil = "seribu " + terbilang(angka - 1000);
  } else if (angka < 1000000) {
    hasil = terbilang(Math.floor(angka / 1000)) + " ribu " + terbilang(angka % 1000);
  } else if (angka < 1000000000) {
    hasil = terbilang(Math.floor(angka / 1000000)) + " juta " + terbilang(angka % 1000000);
  }

  return hasil.trim();
}

export function namaHariIndonesia(indexHari: number): string {
  const hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  return hari[indexHari] || "";
}

export function namaBulanIndonesia(indexBulan: number): string {
  const bulan = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni", 
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  return bulan[indexBulan] || "";
}