// PERLU DITINJAU AHLI HUKUM pada:
// - Pasal 1 ayat 2
// - Pasal 3 ayat 3
// - Pasal 4 ayat 3
// - Pasal 5 ayat 2
// - Pasal 6
// - Pasal 8 ayat 5
// - Pasal 10
// - Pasal 12 ayat 1

export const TEMPLATE_SURAT_PERJANJIAN = `
<div class="text-justify text-[12pt] leading-relaxed font-serif">
  <p class="mb-4">
    Pada hari ini ({{hari_surat}}), tanggal [({{tanggal_angka}}) ({{tanggal_huruf}})] bulan ({{bulan_surat}}) tahun [({{tahun_angka}}) ({{tahun_huruf}})], yang bertanda tangan di bawah ini:
  </p>

  <table class="w-full mb-4">
    <tr><td class="w-8 align-top">1.</td><td class="w-40 align-top">Nama</td><td class="w-4 align-top">:</td><td>{{p1_nama}}</td></tr>
    <tr><td></td><td class="align-top">Pekerjaan</td><td class="align-top">:</td><td>{{p1_pekerjaan}}</td></tr>
    <tr><td></td><td class="align-top">Jabatan</td><td class="align-top">:</td><td>{{p1_jabatan}}</td></tr>
    <tr><td></td><td class="align-top">Alamat</td><td class="align-top">:</td><td>{{p1_alamat}}</td></tr>
    <tr><td></td><td class="align-top">Nomor KTP / SIM</td><td class="align-top">:</td><td>{{p1_ktp}}</td></tr>
    <tr><td></td><td class="align-top">Telepon</td><td class="align-top">:</td><td>{{p1_telepon}}</td></tr>
  </table>
  <p class="mb-6 ml-8">
    Dalam hal ini bertindak untuk dan atas nama perusahaan ({{perusahaan_nama}}) yang berkedudukan di ({{perusahaan_alamat}}) dan selanjutnya disebut <b>PIHAK PERTAMA</b>.
  </p>

  <table class="w-full mb-4">
    <tr><td class="w-8 align-top">2.</td><td class="w-40 align-top">Nama</td><td class="w-4 align-top">:</td><td>{{p2_nama}}</td></tr>
    <tr><td></td><td class="align-top">Pekerjaan</td><td class="align-top">:</td><td>{{p2_pekerjaan}}</td></tr>
    <tr><td></td><td class="align-top">Jabatan</td><td class="align-top">:</td><td>{{p2_jabatan}}</td></tr>
    <tr><td></td><td class="align-top">Alamat</td><td class="align-top">:</td><td>{{p2_alamat}}</td></tr>
    <tr><td></td><td class="align-top">Nomor KTP / SIM</td><td class="align-top">:</td><td>{{p2_ktp}}</td></tr>
    <tr><td></td><td class="align-top">Telepon</td><td class="align-top">:</td><td>{{p2_telepon}}</td></tr>
  </table>
  <p class="mb-6 ml-8">
    Dalam hal ini bertindak untuk dan atas nama diri pribadi dan selanjutnya disebut <b>PIHAK KEDUA</b>.
  </p>

  <p class="mb-4">
    Kedua belah pihak dengan ini menerangkan bahwa <b>PIHAK PERTAMA</b> selaku pemilik sah telah setuju untuk menyewakan kepada <b>PIHAK KEDUA</b>, dan <b>PIHAK KEDUA</b> telah setuju untuk menyewa dari <b>PIHAK PERTAMA</b>, berupa:
  </p>

  <table class="w-full mb-6 ml-4">
    <tr><td class="w-6 align-top">1.</td><td class="w-48 align-top">Jenis kendaraan</td><td class="w-4 align-top">:</td><td>MOBIL</td></tr>
    <tr><td class="align-top">2.</td><td class="align-top">Merek / Type</td><td class="align-top">:</td><td>{{kendaraan_merek}}</td></tr>
    <tr><td class="align-top">3.</td><td class="align-top">Tahun pembuatan</td><td class="align-top">:</td><td>{{kendaraan_tahun}}</td></tr>
    <tr><td class="align-top">4.</td><td class="align-top">Nomor Polisi</td><td class="align-top">:</td><td>{{kendaraan_plat}}</td></tr>
    <tr><td class="align-top">5.</td><td class="align-top">Nomor BPKB</td><td class="align-top">:</td><td>{{kendaraan_bpkb}}</td></tr>
    <tr><td class="align-top">6.</td><td class="align-top">Nomor rangka</td><td class="align-top">:</td><td>{{kendaraan_rangka}}</td></tr>
    <tr><td class="align-top">7.</td><td class="align-top">Nomor mesin</td><td class="align-top">:</td><td>{{kendaraan_mesin}}</td></tr>
    <tr><td class="align-top">8.</td><td class="align-top">Warna</td><td class="align-top">:</td><td>{{kendaraan_warna}}</td></tr>
    <tr><td class="align-top">9.</td><td class="align-top">Kondisi barang</td><td class="align-top">:</td><td>{{kendaraan_kondisi}}</td></tr>
  </table>
  <p class="mb-6">Untuk selanjutnya disebut <b>KENDARAAN</b>.</p>

  <p class="mb-8">
    Selanjutnya kedua belah pihak bersepakat bahwa perjanjian sewa-menyewa <b>KENDARAAN</b> antara <b>PIHAK PERTAMA</b> dan <b>PIHAK KEDUA</b> ini berlaku sejak tanggal penandatanganan surat perjanjian ini, dimana syarat-syarat serta ketentuan-ketentuan dalam surat perjanjian ini diatur dalam 12 (dua belas) pasal, sebagai berikut:
  </p>

  <div class="break-inside-avoid mb-6">
    <div class="text-center font-bold mb-2">PASAL 1 - MASA BERLAKUNYA PERJANJIAN SEWA</div>
    <div class="flex"><div class="w-20 font-bold shrink-0">Ayat 1:</div><div>Sewa-menyewa ini dilangsungkan dan diterima untuk jangka waktu [({{jumlah_hari}}) ({{jumlah_hari_huruf}})] hari, terhitung sejak tanggal ({{tanggal_sewa_lengkap}}) dan berakhir pada tanggal ({{tanggal_kembali_lengkap}}).</div></div>
    <div class="flex mt-2"><div class="w-20 font-bold shrink-0">Ayat 2:</div><div><b>KENDARAAN</b> digunakan oleh <b>PIHAK KEDUA</b> untuk perjalanan dengan rute ({{rute_perjalanan}}). <b>KENDARAAN</b> diperuntukkan bagi penggunaan ({{rute_peruntukan_label}}), dan penggunaan di luar rute atau peruntukan tersebut hanya diperbolehkan dengan persetujuan <b>PIHAK PERTAMA</b>.</div></div>
    <div class="flex mt-2"><div class="w-20 font-bold shrink-0">Ayat 3:</div><div>Perpanjangan masa sewa hanya dapat dilakukan atas persetujuan <b>PIHAK PERTAMA</b> dan wajib diajukan sebelum masa sewa berakhir, dengan jangka waktu serta ketentuan yang dituangkan dalam kesepakatan tertulis tersendiri.</div></div>
  </div>

  <div class="break-inside-avoid mb-6">
    <div class="text-center font-bold mb-2">PASAL 2 - HARGA SEWA DAN PEMBAYARAN</div>
    <div class="flex"><div class="w-20 font-bold shrink-0">Ayat 1:</div><div>Harga sewa <b>KENDARAAN</b> adalah [(Rp {{harga_per_hari}},00) ({{harga_per_hari_huruf}})] per hari, sehingga untuk seluruh jangka waktu sewa berjumlah [(Rp {{total_harga}},00) ({{total_harga_huruf}})].</div></div>
    <div class="flex mt-2"><div class="w-20 font-bold shrink-0">Ayat 2:</div><div>Harga sewa tersebut telah dibayarkan lunas oleh <b>PIHAK KEDUA</b> kepada <b>PIHAK PERTAMA</b> sebelum penyerahan <b>KENDARAAN</b> melalui ({{metode_pembayaran_label}}) dan tercatat pada sistem pencatatan transaksi <b>PIHAK PERTAMA</b>.</div></div>
    <div class="flex mt-2"><div class="w-20 font-bold shrink-0">Ayat 3:</div><div>Kwitansi pembayaran yang diterbitkan <b>PIHAK PERTAMA</b> berlaku sebagai bukti pelunasan yang sah atas sejumlah uang sewa <b>KENDARAAN</b> termaksud.</div></div>
  </div>

  <div class="break-inside-avoid mb-6">
    <div class="text-center font-bold mb-2">PASAL 3 - PENYERAHAN KENDARAAN</div>
    <div class="flex"><div class="w-20 font-bold shrink-0">Ayat 1:</div><div><b>PIHAK PERTAMA</b> menyerahkan <b>KENDARAAN</b> kepada <b>PIHAK KEDUA</b> setelah <b>PIHAK PERTAMA</b> memverifikasi Kartu Tanda Penduduk dan Surat Izin Mengemudi asli milik <b>PIHAK KEDUA</b> serta setelah Surat Perjanjian ini ditandatangani oleh kedua belah pihak.</div></div>
    <div class="flex mt-2"><div class="w-20 font-bold shrink-0">Ayat 2:</div><div>Penyerahan dilakukan berikut Surat Tanda Nomor Kendaraan (STNK) atau salinannya yang sah, dan kondisi <b>KENDARAAN</b> diperiksa bersama oleh kedua belah pihak serta dicatat pada bagian "Kondisi barang" dalam Surat Perjanjian ini.</div></div>
    <div class="flex mt-2"><div class="w-20 font-bold shrink-0">Ayat 3:</div><div><b>KENDARAAN</b> hanya boleh dikemudikan oleh <b>PIHAK KEDUA</b> atau pengemudi lain yang memiliki Surat Izin Mengemudi yang masih berlaku dan sepengetahuan <b>PIHAK PERTAMA</b>, dan <b>PIHAK KEDUA</b> bertanggung jawab penuh atas setiap pengemudi yang ditunjuknya.</div></div>
  </div>

  <div class="break-inside-avoid mb-6">
    <div class="text-center font-bold mb-2">PASAL 4 - KETENTUAN-KETENTUAN KHUSUS</div>
    <div class="flex"><div class="w-20 font-bold shrink-0">Ayat 1:</div><div><b>PIHAK PERTAMA</b> wajib menyerahkan <b>KENDARAAN</b> dalam keadaan layak jalan dan sesuai dengan data yang tercantum dalam Surat Perjanjian ini.</div></div>
    <div class="flex mt-2"><div class="w-20 font-bold shrink-0">Ayat 2:</div><div>Sebelum jangka waktu sewa berakhir, <b>PIHAK PERTAMA</b> tidak dibenarkan meminta <b>PIHAK KEDUA</b> untuk mengakhiri sewa atau mengembalikan <b>KENDARAAN</b>, kecuali terdapat kesepakatan kedua belah pihak atau terjadi pelanggaran sebagaimana dimaksud dalam Pasal 9.</div></div>
    <div class="flex mt-2"><div class="w-20 font-bold shrink-0">Ayat 3:</div><div><b>PIHAK PERTAMA</b> tidak diperbolehkan memungut uang sewa tambahan dari <b>PIHAK KEDUA</b> dengan alasan atau dalih apa pun, kecuali denda keterlambatan sebagaimana diatur dalam Pasal 6 serta biaya kerusakan, kehilangan, dan penarikan <b>KENDARAAN</b> sebagaimana diatur dalam Pasal 8 dan Pasal 9.</div></div>
  </div>

  <div class="break-inside-avoid mb-6">
    <div class="text-center font-bold mb-2">PASAL 5 - HAK DAN TANGGUNG JAWAB PIHAK KEDUA</div>
    <div class="flex"><div class="w-20 font-bold shrink-0">Ayat 1:</div><div><b>PIHAK KEDUA</b> berhak sepenuhnya untuk menggunakan <b>KENDARAAN</b> yang disewanya selama jangka waktu sewa sesuai dengan Perjanjian ini.</div></div>
    <div class="flex mt-2"><div class="w-20 font-bold shrink-0">Ayat 2:</div><div>Mengingat <b>KENDARAAN</b> dipegang oleh <b>PIHAK KEDUA</b> sebagai penyewa, <b>PIHAK KEDUA</b> bertanggung jawab penuh untuk merawat dan menjaga keutuhan serta kebaikan kondisi <b>KENDARAAN</b> sebaik-baiknya atas biaya <b>PIHAK KEDUA</b> sendiri, termasuk biaya bahan bakar dan biaya operasional selama masa sewa seperti tol dan parkir.</div></div>
    <div class="flex mt-2"><div class="w-20 font-bold shrink-0">Ayat 3:</div><div>Apabila perjanjian sewa-menyewa ini berakhir, <b>PIHAK KEDUA</b> wajib mengembalikan <b>KENDARAAN</b> kepada <b>PIHAK PERTAMA</b> dalam keadaan jalan, terawat baik, dan kondisinya lengkap seperti ketika <b>PIHAK KEDUA</b> menerimanya dari <b>PIHAK PERTAMA</b>.</div></div>
  </div>

  <div class="break-inside-avoid mb-6">
    <div class="text-center font-bold mb-2">PASAL 6 - KETERLAMBATAN PENGEMBALIAN DAN DENDA</div>
    <div class="flex"><div class="w-20 font-bold shrink-0">Ayat 1:</div><div><b>PIHAK KEDUA</b> wajib mengembalikan <b>KENDARAAN</b> paling lambat pada tanggal ({{tanggal_kembali_lengkap}}).</div></div>
    <div class="flex mt-2"><div class="w-20 font-bold shrink-0">Ayat 2:</div><div>Apabila <b>PIHAK KEDUA</b> terlambat mengembalikan <b>KENDARAAN</b>, <b>PIHAK KEDUA</b> dikenakan denda keterlambatan sebesar [({{denda_persen}}%) ({{denda_persen_huruf}} persen)] dari harga sewa harian, yaitu [(Rp {{denda_per_hari}},00) ({{denda_per_hari_huruf}})] untuk setiap hari keterlambatan.</div></div>
    <div class="flex mt-2"><div class="w-20 font-bold shrink-0">Ayat 3:</div><div>Jumlah hari keterlambatan dihitung berdasarkan selisih antara tanggal pengembalian sebenarnya yang dicatat oleh petugas <b>PIHAK PERTAMA</b> dan tanggal berakhirnya masa sewa, dan denda dibayarkan oleh <b>PIHAK KEDUA</b> pada saat pengembalian <b>KENDARAAN</b>.</div></div>
  </div>

  <div class="break-inside-avoid mb-6">
    <div class="text-center font-bold mb-2">PASAL 7 - LARANGAN-LARANGAN</div>
    <div class="flex"><div class="w-20 font-bold shrink-0">Ayat 1:</div><div>Status kepemilikan <b>KENDARAAN</b> sepenuhnya tetap berada di tangan <b>PIHAK PERTAMA</b>, sehingga <b>PIHAK KEDUA</b> dilarang melakukan perbuatan yang bertujuan untuk memindahtangankan kepemilikan atau penguasaan <b>KENDARAAN</b>, seperti:
      <ol class="list-decimal pl-6 mt-1">
        <li>menjual;</li>
        <li>menggadaikan;</li>
        <li>menyewakan kembali atau meminjamkan kepada pihak lain tanpa persetujuan <b>PIHAK PERTAMA</b>;</li>
        <li>memindahtangankan atau melakukan perbuatan lain yang bertujuan untuk memindahtangankan kepemilikannya.</li>
      </ol>
    </div></div>
    <div class="flex mt-2"><div class="w-20 font-bold shrink-0">Ayat 2:</div><div><b>PIHAK KEDUA</b> dilarang menggunakan <b>KENDARAAN</b> untuk perbuatan yang melanggar hukum serta dilarang mengubah bentuk atau komponen <b>KENDARAAN</b> tanpa persetujuan <b>PIHAK PERTAMA</b>.</div></div>
    <div class="flex mt-2"><div class="w-20 font-bold shrink-0">Ayat 3:</div><div>Pelanggaran <b>PIHAK KEDUA</b> atas pasal ini merupakan tindak pidana sesuai dengan ketentuan hukum pidana yang berlaku, dan <b>PIHAK PERTAMA</b> berhak menempuh upaya hukum.</div></div>
  </div>

  <div class="break-inside-avoid mb-6">
    <div class="text-center font-bold mb-2">PASAL 8 - KERUSAKAN, KEHILANGAN, DAN PELANGGARAN LALU LINTAS</div>
    <div class="flex"><div class="w-20 font-bold shrink-0">Ayat 1:</div><div>Apabila terjadi kerusakan pada <b>KENDARAAN</b> selama masa sewa, <b>PIHAK KEDUA</b> diharuskan memperbaiki atau menanggung biaya perbaikan atas kerusakan tersebut sehubungan dengan pemakaiannya.</div></div>
    <div class="flex mt-2"><div class="w-20 font-bold shrink-0">Ayat 2:</div><div><b>PIHAK KEDUA</b> diwajibkan mengganti suku cadang (spare part) <b>KENDARAAN</b> yang rusak akibat pemakaian sehingga tidak dapat digunakan lagi dengan suku cadang yang sama.</div></div>
    <div class="flex mt-2"><div class="w-20 font-bold shrink-0">Ayat 3:</div><div><b>PIHAK KEDUA</b> dibebaskan dari segala ganti rugi atau tuntutan <b>PIHAK PERTAMA</b> akibat kerusakan pada <b>KENDARAAN</b> yang diakibatkan oleh force majeure. Yang dimaksud dengan force majeure adalah:
      <ol class="list-decimal pl-6 mt-1">
        <li>bencana alam, seperti banjir, gempa bumi, tanah longsor, petir, angin topan, serta kebakaran yang disebabkan oleh faktor eksternal di luar kendali <b>PIHAK KEDUA</b>;</li>
        <li>huru-hara, kerusuhan, pemberontakan, dan perang.</li>
      </ol>
    </div></div>
    <div class="flex mt-2"><div class="w-20 font-bold shrink-0">Ayat 4:</div><div>Apabila terjadi kehilangan <b>KENDARAAN</b> karena kelalaian <b>PIHAK KEDUA</b> sendiri, <b>PIHAK KEDUA</b> diharuskan mengganti dengan <b>KENDARAAN</b> sejenis dengan tahun pembuatan dan kondisi yang sesuai atau sebanding dengan <b>KENDARAAN</b> yang disewanya.</div></div>
    <div class="flex mt-2"><div class="w-20 font-bold shrink-0">Ayat 5:</div><div>Segala denda, tilang, atau sanksi atas pelanggaran lalu lintas yang terjadi selama masa sewa menjadi tanggung jawab <b>PIHAK KEDUA</b>, dan <b>PIHAK KEDUA</b> wajib segera memberitahukan <b>PIHAK PERTAMA</b> apabila terjadi kecelakaan, kerusakan berat, atau kehilangan.</div></div>
  </div>

  <div class="break-inside-avoid mb-6">
    <div class="text-center font-bold mb-2">PASAL 9 - PEMBATALAN</div>
    <div class="flex"><div class="w-20 font-bold shrink-0">Ayat 1:</div><div>Apabila <b>PIHAK KEDUA</b> melakukan pelanggaran atau tidak menaati Perjanjian ini, <b>PIHAK PERTAMA</b> berhak meminta perjanjian ini dibatalkan.</div></div>
    <div class="flex mt-2"><div class="w-20 font-bold shrink-0">Ayat 2:</div><div><b>PIHAK PERTAMA</b> diharuskan memberitahukan pembatalan tersebut secara tertulis kepada <b>PIHAK KEDUA</b>, dan <b>PIHAK KEDUA</b> diwajibkan menyerahkan kembali <b>KENDARAAN</b> yang disewanya selambat-lambatnya [({{batas_hari_penarikan}}) ({{batas_hari_penarikan_huruf}})] hari setelah pemberitahuan pembatalan diterima.</div></div>
    <div class="flex mt-2"><div class="w-20 font-bold shrink-0">Ayat 3:</div><div><b>PIHAK KEDUA</b> memberi kuasa penuh kepada <b>PIHAK PERTAMA</b>, dengan hak substitusi, untuk mengambil <b>KENDARAAN</b> milik <b>PIHAK PERTAMA</b>, baik yang berada di tempat <b>PIHAK KEDUA</b> maupun di tempat pihak lain yang mendapat hak darinya.</div></div>
    <div class="flex mt-2"><div class="w-20 font-bold shrink-0">Ayat 4:</div><div><b>PIHAK PERTAMA</b> berhak meminta bantuan pihak berwajib untuk menarik kembali <b>KENDARAAN</b> tersebut, dan segala biaya pengambilan <b>KENDARAAN</b> sepenuhnya menjadi beban dan tanggung jawab <b>PIHAK KEDUA</b>.</div></div>
    <div class="flex mt-2"><div class="w-20 font-bold shrink-0">Ayat 5:</div><div><b>PIHAK KEDUA</b> membebaskan <b>PIHAK PERTAMA</b> dari tuntutan kerugian dari <b>PIHAK KEDUA</b> atas pembatalan Perjanjian ini yang diakibatkan oleh pelanggaran <b>PIHAK KEDUA</b>.</div></div>
  </div>

  <div class="break-inside-avoid mb-6">
    <div class="text-center font-bold mb-2">PASAL 10 - PELANGGARAN DARI PIHAK PERTAMA</div>
    <div class="flex"><div class="w-20 font-bold shrink-0">Ayat 1:</div><div>Apabila <b>PIHAK PERTAMA</b> melakukan pelanggaran atau tidak menaati Perjanjian ini, <b>PIHAK PERTAMA</b> wajib memberikan atau membayar ganti rugi kepada <b>PIHAK KEDUA</b>.</div></div>
    <div class="flex mt-2"><div class="w-20 font-bold shrink-0">Ayat 2:</div><div>Besarnya ganti rugi sesuai ayat 1 pasal ini ditetapkan secara musyawarah untuk mufakat oleh kedua belah pihak berdasarkan kerugian nyata yang dialami <b>PIHAK KEDUA</b>.</div></div>
  </div>

  <div class="break-inside-avoid mb-6">
    <div class="text-center font-bold mb-2">PASAL 11 - LAIN-LAIN</div>
    <p>Hal-hal yang belum tercantum dalam Perjanjian ini akan diselesaikan secara kekeluargaan atau musyawarah untuk mufakat oleh kedua belah pihak, dan setiap perubahan atas Perjanjian ini hanya sah apabila dibuat secara tertulis serta disetujui oleh kedua belah pihak.</p>
  </div>

  <div class="break-inside-avoid mb-8">
    <div class="text-center font-bold mb-2">PASAL 12 - PENYELESAIAN PERSELISIHAN DAN PENUTUP</div>
    <div class="flex"><div class="w-20 font-bold shrink-0">Ayat 1:</div><div>Apabila terjadi perselisihan dan tidak dapat diselesaikan secara kekeluargaan atau musyawarah untuk mufakat, kedua belah pihak bersepakat untuk menyelesaikannya secara hukum dan telah sepakat memilih tempat kedudukan hukum yang umum dan tetap di Kantor Kepaniteraan ({{pengadilan_negeri}}).</div></div>
    <div class="flex mt-2"><div class="w-20 font-bold shrink-0">Ayat 2:</div><div>Surat Perjanjian ini dibuat rangkap 2 (dua) dengan dibubuhi meterai secukupnya, yang masing-masing mempunyai kekuatan hukum yang sama dan dipegang oleh <b>PIHAK PERTAMA</b> dan <b>PIHAK KEDUA</b>, serta mulai berlaku sejak ditandatangani oleh kedua belah pihak.</div></div>
  </div>

  <div class="break-inside-avoid mt-8 pt-4">
    <div class="text-center mb-8">({{tempat_penandatanganan}}, {{tanggal_sewa_lengkap}})</div>
    <div class="grid grid-cols-2 text-center">
      <div>
        <p class="font-bold mb-24">PIHAK PERTAMA</p>
        <p>[ {{p1_nama}} ]</p>
      </div>
      <div>
        <p class="font-bold mb-4">PIHAK KEDUA</p>
        <div class="mx-auto border border-dashed border-gray-400 w-28 h-12 flex items-center justify-center text-[10px] text-gray-500 mb-8">
          Meterai<br/>Rp10.000
        </div>
        <p>[ {{p2_nama}} ]</p>
      </div>
    </div>
  </div>
</div>
`;