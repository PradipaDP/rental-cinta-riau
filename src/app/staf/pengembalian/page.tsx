interface PageProps {
  params: Promise<{ id_transaksi: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id_transaksi } = await params;

  return (
    <div className="bg-white p-12 text-center rounded-xl border border-dashed border-gray-300">
      <h2 className="text-xl font-bold text-gray-900 mb-2">Halaman Detail Pengembalian Sementara</h2>
      <p className="text-gray-500 mb-4">Fitur denda keterlambatan dan kerusakan akan dikerjakan pada Tahap 12.</p>
      <div className="inline-block bg-gray-100 text-gray-600 px-3 py-1 rounded-md text-sm font-mono">
        ID Transaksi: {id_transaksi}
      </div>
    </div>
  );
}