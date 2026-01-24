import MarketInfo from '@/components/MarketInfo'
import ThrCalculator from '@/components/ThrCalculator'
import Link from 'next/link'

export default function ThrPage() {
    return (
        <section className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="md:col-span-2">
                    {/* HEADER */}
                    <div className="max-w-2xl">
                        <h1 className="text-3xl font-bold tracking-tight">
                            Kalkulator THR
                        </h1>

                        <p className="mt-3 text-gray-600">
                            Hitung Tunjangan Hari Raya (THR) berdasarkan gaji
                            bulanan dan masa kerja sesuai ketentuan umum di
                            Indonesia.
                        </p>
                    </div>

                    {/* CALCULATOR CARD */}
                    <div className="bg-white border rounded-2xl p-6 shadow-sm">
                        <ThrCalculator />
                    </div>
                    <div className="mt-6 mb-6 text-sm text-gray-600">
                        <p>
                            Perlu menghitung
                            <Link href="/take-home-pay" className="ml-1 text-black underline">
                                Gaji (Take Home Pay)
                            </Link>
                            {' '}atau{' '}
                            <Link href="/zakat" className="text-black underline">
                                Zakat Penghasilan
                            </Link>
                            ?
                        </p>
                    </div>

                    {/* SEO / INFO */}
                    <section className="max-w-3xl space-y-6 text-gray-700">
                        <h2 className="text-xl font-semibold">
                            Cara Menghitung THR
                        </h2>

                        <p>
                            THR atau Tunjangan Hari Raya merupakan hak karyawan
                            yang telah bekerja minimal satu bulan secara terus
                            menerus. Besaran THR dihitung berdasarkan gaji
                            bulanan dan lama masa kerja.
                        </p>

                        <p>
                            Karyawan dengan masa kerja 12 bulan atau lebih
                            berhak menerima THR sebesar satu bulan gaji.
                            Sedangkan bagi karyawan dengan masa kerja kurang
                            dari 12 bulan, THR dihitung secara proporsional.
                        </p>

                        <div>
                            <h3 className="font-semibold mb-3">
                                Pertanyaan yang Sering Diajukan
                            </h3>

                            <ul className="space-y-3">
                                <li>
                                    <p className="font-medium">
                                        Apakah karyawan kontrak dapat THR?
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Ya, selama telah bekerja minimal satu bulan
                                        secara terus menerus.
                                    </p>
                                </li>

                                <li>
                                    <p className="font-medium">
                                        Apakah THR dihitung dari gaji pokok?
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Umumnya dihitung dari gaji pokok dan tunjangan
                                        tetap.
                                    </p>
                                </li>

                                <li>
                                    <p className="font-medium">
                                        Kapan THR harus dibayarkan?
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Paling lambat 7 hari sebelum hari raya.
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