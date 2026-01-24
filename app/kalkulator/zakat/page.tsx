import MarketInfo from '@/components/MarketInfo'
import ZakatCalculator from '@/components/ZakatCalculator'
import Link from 'next/link'

export default function ZakatPage() {
    return (
        <section className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="md:col-span-2">
                    {/* HEADER */}
                    <div className="max-w-2xl">
                        <h1 className="text-3xl font-bold tracking-tight">
                            Kalkulator Zakat Penghasilan
                        </h1>

                        <p className="mt-3 text-gray-600">
                            Hitung zakat penghasilan berdasarkan pendapatan
                            bulanan dan nisab sesuai ketentuan yang berlaku.
                        </p>
                    </div>

                    {/* CALCULATOR CARD */}
                    <div className="bg-white border rounded-2xl p-6 shadow-sm">
                        <ZakatCalculator />
                    </div>
                    <div className="mt-6 mb-6 text-sm text-gray-600">
                        <p>
                            Perlu menghitung zakat lainnya?
                            <Link href="/zakat-fitrah" className="ml-1 text-black underline">
                                Zakat Fitrah
                            </Link>
                            {' '}atau{' '}
                            <Link href="/fidya" className="text-black underline">
                                Fidya Puasa
                            </Link>
                        </p>
                    </div>

                    {/* SEO / INFO */}
                    <section className="max-w-3xl space-y-6 text-gray-700">
                        <h2 className="text-xl font-semibold">
                            Cara Menghitung Zakat Penghasilan
                        </h2>

                        <p>
                            Zakat penghasilan wajib ditunaikan apabila pendapatan
                            seseorang telah mencapai nisab. Nisab zakat
                            penghasilan setara dengan nilai 85 gram emas.
                        </p>

                        <p>
                            Jika penghasilan bulanan telah memenuhi nisab,
                            maka zakat yang harus dikeluarkan sebesar 2,5%
                            dari total penghasilan.
                        </p>

                        <div>
                            <h3 className="font-semibold mb-3">
                                Pertanyaan yang Sering Diajukan
                            </h3>

                            <ul className="space-y-3">
                                <li>
                                    <p className="font-medium">
                                        Apakah zakat dihitung per bulan?
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Bisa dihitung bulanan atau tahunan, tergantung
                                        kebiasaan.
                                    </p>
                                </li>

                                <li>
                                    <p className="font-medium">
                                        Apakah pengeluaran dikurangkan?
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Pada perhitungan sederhana, zakat dihitung dari
                                        penghasilan kotor.
                                    </p>
                                </li>

                                <li>
                                    <p className="font-medium">
                                        Siapa yang wajib membayar zakat?
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Muslim yang penghasilannya mencapai nisab.
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </section>
                </div>
                <div>
                    <MarketInfo />
                </div>
            </div>
        </section>
    )
}