import PdfCompressor from "@/components/konverter/PdfCompressor";


export default function PdfCompressPage() {
  return (
    <section className="space-y-10 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Compress PDF Online
        </h1>
        <p className="mt-3 text-gray-600">
          Perkecil ukuran file PDF dengan aman langsung di
          browser. Cocok untuk upload formulir, dokumen, dan
          kebutuhan administrasi.
        </p>
      </div>

      <div className="bg-white border rounded-2xl p-6 shadow-sm">
        <PdfCompressor />
      </div>
    </section>
  )
}