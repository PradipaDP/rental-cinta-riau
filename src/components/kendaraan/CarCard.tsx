import Link from 'next/link';
import { Users, Gauge, Droplet, Image as ImageIcon } from 'lucide-react';
import { Kendaraan } from '@/types';
import { formatRupiah } from '@/lib/formatters';

export default function CarCard({ mobil }: { mobil: Kendaraan }) {
  return (
    <Link href={`/mobil/${mobil.id_kendaraan}`} className="block group">
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100 overflow-hidden flex flex-col h-full">
        {/* Gambar */}
        <div className="relative h-48 w-full bg-gray-100 flex items-center justify-center overflow-hidden">
          {mobil.foto_url ? (
            <img 
              src={mobil.foto_url} 
              alt={mobil.nama_kendaraan} 
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />
          ) : (
            <ImageIcon size={48} className="text-gray-300" />
          )}
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur text-blue-700 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            {mobil.jenis_kendaraan}
          </div>
        </div>

        {/* Informasi Utama */}
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition">{mobil.nama_kendaraan}</h3>
          
          <div className="grid grid-cols-3 gap-2 mt-4 mb-4 text-xs text-gray-600">
            <div className="flex flex-col items-center justify-center p-2 bg-gray-50 rounded-lg">
              <Users size={16} className="mb-1 text-gray-400" />
              <span>{mobil.kapasitas} Org</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 bg-gray-50 rounded-lg">
              <Gauge size={16} className="mb-1 text-gray-400" />
              <span>{mobil.transmisi}</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 bg-gray-50 rounded-lg">
              <Droplet size={16} className="mb-1 text-gray-400" />
              <span>{mobil.bahan_bakar}</span>
            </div>
          </div>

          <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
            <div>
              <span className="text-gray-500 text-xs">Harga Sewa</span>
              <div className="font-bold text-gray-900">{formatRupiah(mobil.harga_sewa)}<span className="text-xs font-normal text-gray-500">/hari</span></div>
            </div>
            <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium group-hover:bg-blue-600 group-hover:text-white transition">
              Detail
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}