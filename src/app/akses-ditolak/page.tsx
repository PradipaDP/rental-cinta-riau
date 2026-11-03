import Link from 'next/link';

export default function AksesDitolak() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-red-500 mb-4">403</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Akses Ditolak</h2>
        <p className="text-gray-600 mb-6">
          Anda tidak memiliki hak akses (role) untuk melihat halaman ini.
        </p>
        <Link 
          href="/"
          className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}