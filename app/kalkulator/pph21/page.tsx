import MarketInfo from '@/components/MarketInfo'
import Pph21Calculator from '@/components/Pph21Calculator'
import Link from 'next/link'

export default function Pph21Page() {
    return (
        <section className="space-y-12">
            {/* HEADER */}
            <div className="max-w-2xl">
                <h1 className="text-3xl font-bold tracking-tight">
                    Kalkulator PPh 21
                </h1>

                <p className="mt-3 text-gray-600">
                    Hitung estimasi pajak penghasilan (PPh 21) untuk
                    karyawan berdasarkan gaji bulanan dan status PTKP.
                    Hasil bersifat perkiraan dan dapat berbeda sesuai
                    kebijakan perusahaan dan komponen gaji.
                </p>
            </div>

            {/* CONTENT: Calculator + MarketInfo */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* CALCULATOR */}
                <div className="lg:col-span-2">
                    <div className="bg-white border rounded-2xl p-6 shadow-sm">
                        <Pph21Calculator />
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
                </div>

                {/* MARKET */}
                <div className="lg:col-span-1">
                    <MarketInfo />
                </div>
            </div>

            {/* SEO / INFO */}
            <section className="max-w-3xl space-y-6 text-gray-700">
                <h2 className="text-xl font-semibold">
                    Cara Menghitung PPh 21
                </h2>

                <p>
                    PPh 21 adalah pajak penghasilan atas penghasilan
                    berupa gaji, upah, honorarium, tunjangan, dan
                    pembayaran lain sehubungan dengan pekerjaan.
                    Perhitungan PPh 21 umumnya menggunakan penghasilan
                    tahunan, pengurang (misalnya biaya jabatan), PTKP,
                    lalu dikenakan tarif progresif.
                </p>

                <p>
                    Kalkulator ini membantu memperkirakan pajak bulanan
                    dan tahunan berdasarkan input yang sederhana. Jika
                    perusahaan memiliki komponen gaji lain (tunjangan,
                    bonus, THR, potongan, iuran, dsb.), maka hasil
                    perhitungan bisa berbeda.
                </p>

                <div>
                    <h3 className="font-semibold mb-3">
                        Pertanyaan yang Sering Diajukan
                    </h3>

                    <ul className="space-y-3">
                        <li>
                            <p className="font-medium">
                                Apakah hasil kalkulator ini pasti sama dengan slip gaji?
                            </p>
                            <p className="text-sm text-gray-600">
                                Tidak selalu. Hasilnya estimasi. Kebijakan perusahaan,
                                komponen gaji, dan potongan dapat memengaruhi pajak.
                            </p>
                        </li>

                        <li>
                            <p className="font-medium">
                                Apakah PPh 21 dihitung per bulan atau per tahun?
                            </p>
                            <p className="text-sm text-gray-600">
                                Umumnya dihitung berdasarkan tahunan lalu dibagi per bulan
                                untuk estimasi pemotongan bulanan.
                            </p>
                        </li>

                        <li>
                            <p className="font-medium">
                                Status PTKP apa saja yang tersedia?
                            </p>
                            <p className="text-sm text-gray-600">
                                Untuk MVP, tersedia beberapa status umum seperti TK/0 dan
                                K/0 sampai K/3.
                            </p>
                        </li>
                    </ul>
                </div>
            </section>
        </section>
    )
}