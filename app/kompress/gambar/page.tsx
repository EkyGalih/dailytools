import ImageSizeCompressor from "@/components/konverter/ImageSizeCompressor";
import MarketInfo from "@/components/MarketInfo";
import Link from "next/link";


export default function ImageCompressPage() {
  return (
    <section className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2">
          {/* HEADER */}
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold tracking-tight">
              Compress Gambar ke 1 MB, 2 MB, atau 5 MB
            </h1>

            <p className="mt-3 text-gray-600">
              Kompres gambar JPG, PNG, atau WebP ke ukuran file
              tertentu secara otomatis. Diproses langsung di
              browser, tanpa upload ke server.
            </p>
          </div>

          {/* TOOL CARD */}
          <div className="max-w-2xl bg-white border rounded-2xl p-6 shadow-sm">
            <ImageSizeCompressor />
          </div>

          <div className="mt-6 mb-6 text-sm text-gray-600">
            <p>
              Perlu Konvert
              <Link href="/konverter/image" className="ml-1 text-black underline">
                Ektensi Gambar (PNG, JPG atau WEBP)
              </Link>
              ?
            </p>
          </div>

          {/* INFO */}
          <div className="max-w-2xl text-sm text-gray-500 space-y-2">
            <p>
              💡 Tips: Untuk foto, gunakan WebP agar ukuran file
              lebih kecil dengan kualitas tetap baik.
            </p>
            <p>
              Catatan: Hasil kompresi mendekati target ukuran,
              bukan angka yang benar-benar sama persis.
            </p>
          </div>
        </div>
        <div>
          <MarketInfo />
        </div>
      </div>
    </section>
  )
}