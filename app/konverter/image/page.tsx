import ImageConverter from "@/components/konverter/ImageConverter";
import MarketInfo from "@/components/MarketInfo";
import Link from "next/link";

export default function ImageConverterPage() {
    return (
        <section className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="md:col-span-2">
                    <div className="max-w-2xl">
                        <h1 className="text-3xl font-bold tracking-tight">
                            Image Converter
                        </h1>
                        <p className="mt-3 text-gray-600">
                            Konversi gambar JPG, PNG ke WebP atau format lainnya
                            langsung di browser. Aman, cepat, dan tanpa upload
                            ke server.
                        </p>
                    </div>

                    <div className="bg-white border rounded-2xl p-6 shadow-sm max-w-2xl">
                        <ImageConverter />
                    </div>
                    <div className="mt-6 mb-6 text-sm text-gray-600">
                        <p>
                            Perlu Konvert
                            <Link href="/konverter/kompress" className="ml-1 text-black underline">
                                Kompress Gambar (1MB, 2MB atau 5MB)
                            </Link>
                            ?
                        </p>
                    </div>

                    <div className="text-xs text-gray-500 max-w-2xl">
                        Catatan: File diproses langsung di browser Anda,
                        tidak dikirim ke server.
                    </div>
                </div>
                <div>
                    <MarketInfo />
                </div>
            </div>
        </section>
    )
}