import MarketInfo from '@/components/MarketInfo'
import ZakatFitrahCalculator from '@/components/ZakatFitrahCalculator'
import Link from 'next/link'

export default function ZakatFitrahPage() {
    return (
        <section className="space-y-12">
            {/* HEADER */}
            <div className="max-w-2xl">
                <h1 className="text-3xl font-bold tracking-tight">
                    Kalkulator Zakat Fitrah
                </h1>

                <p className="mt-3 text-gray-600">
                    Hitung zakat fitrah berdasarkan jumlah jiwa dan harga beras
                    per kilogram. Perhitungan menggunakan ketentuan umum zakat
                    fitrah di Indonesia.
                </p>
            </div>

            {/* CONTENT */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* CALCULATOR */}
                <div className="lg:col-span-2">
                    <div className="bg-white border rounded-2xl p-6 shadow-sm">
                        <ZakatFitrahCalculator />
                    </div>
                    <div className="mt-6 text-sm text-gray-600">
                        <p>
                            Perlu menghitung zakat lainnya?
                            <Link href="/zakat" className="ml-1 text-black underline">
                                Zakat Penghasilan
                            </Link>
                            {' '}atau{' '}
                            <Link href="/fidya" className="text-black underline">
                                Fidya Puasa
                            </Link>
                        </p>
                    </div>
                </div>

                {/* MARKET INFO */}
                <div className="lg:col-span-1">
                    <MarketInfo />
                </div>
            </div>

            {/* SEO / INFO */}
            <section className="max-w-3xl space-y-6 text-gray-700">
                <h2 className="text-xl font-semibold">
                    Tentang Zakat Fitrah
                </h2>

                <p>
                    Zakat fitrah adalah zakat yang wajib ditunaikan oleh setiap
                    muslim menjelang Idul Fitri. Besarnya zakat fitrah di Indonesia
                    umumnya setara dengan 2,5 kg atau 3,5 liter beras per jiwa.
                </p>

                <p>
                    Zakat fitrah dapat ditunaikan dalam bentuk beras atau uang
                    yang nilainya setara dengan harga beras yang dikonsumsi
                    sehari-hari.
                </p>

                <div>
                    <h3 className="font-semibold mb-3">
                        Pertanyaan yang Sering Diajukan
                    </h3>

                    <ul className="space-y-3">
                        <li>
                            <p className="font-medium">
                                Berapa zakat fitrah per orang?
                            </p>
                            <p className="text-sm text-gray-600">
                                Sebesar 2,5 kg beras atau nilai uang yang setara.
                            </p>
                        </li>

                        <li>
                            <p className="font-medium">
                                Apakah zakat fitrah bisa dibayar dengan uang?
                            </p>
                            <p className="text-sm text-gray-600">
                                Ya, selama nilainya setara dengan harga beras.
                            </p>
                        </li>
                    </ul>
                </div>
            </section>
        </section>
    )
}