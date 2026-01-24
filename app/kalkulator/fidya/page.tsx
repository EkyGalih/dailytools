import MarketInfo from '@/components/MarketInfo'
import FidyaCalculator from '@/components/FidyaCalculator'
import Link from 'next/link'

export default function FidyaPage() {
    return (
        <section className="space-y-12">
            {/* HEADER */}
            <div className="max-w-2xl">
                <h1 className="text-3xl font-bold tracking-tight">
                    Kalkulator Fidya Puasa
                </h1>

                <p className="mt-3 text-gray-600">
                    Hitung fidya puasa berdasarkan jumlah hari puasa
                    yang ditinggalkan dan estimasi biaya makan per hari.
                </p>
            </div>

            {/* CONTENT */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="bg-white border rounded-2xl p-6 shadow-sm">
                        <FidyaCalculator />
                    </div>

                    {/* CROSS LINK */}
                    <div className="mt-6 text-sm text-gray-600">
                        <p>
                            Perlu menghitung zakat?
                            <Link href="/zakat" className="ml-1 text-black underline">
                                Zakat Penghasilan
                            </Link>
                            {' '}atau{' '}
                            <Link href="/zakat-fitrah" className="text-black underline">
                                Zakat Fitrah
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <MarketInfo />
                </div>
            </div>

            {/* SEO */}
            <section className="max-w-3xl space-y-6 text-gray-700">
                <h2 className="text-xl font-semibold">
                    Tentang Fidya
                </h2>

                <p>
                    Fidya adalah kewajiban mengganti puasa Ramadan
                    dengan memberi makan orang miskin bagi mereka
                    yang tidak mampu berpuasa dan tidak dapat
                    menggantinya di hari lain.
                </p>

                <p>
                    Besaran fidya umumnya setara dengan satu porsi
                    makan per hari puasa yang ditinggalkan.
                </p>
            </section>
        </section>
    )
}