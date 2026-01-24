export const dynamic = 'force-dynamic'

import MarketInfo from '@/components/MarketInfo'
import TakeHomePayCalculator from '@/components/TakeHomePayCalculator'
import Link from 'next/link'

export default function TakeHomePayPage() {
    return (
        <section className="space-y-12">
            <div className="max-w-2xl">
                <h1 className="text-3xl font-bold tracking-tight">
                    Kalkulator Gaji Bersih (Take Home Pay)
                </h1>
                <p className="mt-3 text-gray-600">
                    Hitung estimasi gaji bersih setelah potongan PPh 21 dan BPJS.
                    Hasil bersifat perkiraan dan dapat berbeda sesuai kebijakan perusahaan.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="bg-white border rounded-2xl p-6 shadow-sm">
                        <TakeHomePayCalculator />
                    </div>
                    <div className="mt-6 mb-6 text-sm text-gray-600">
                        <p>
                            Perlu menghitung
                            <Link href="/thr" className="ml-1 text-black underline">
                                THR
                            </Link>
                            {' '}atau{' '}
                            <Link href="/pph21" className="text-black underline">
                                PPh 21
                            </Link>
                            ?
                        </p>
                    </div>
                </div>
                <div className="lg:col-span-1">
                    <MarketInfo />
                </div>
            </div>

            <section className="max-w-3xl text-gray-700 space-y-3">
                <h2 className="text-xl font-semibold">Catatan</h2>
                <p>
                    Perhitungan ini menggunakan asumsi umum potongan karyawan.
                    Jika perusahaan memiliki komponen lain (tunjangan, iuran tambahan),
                    hasil dapat berbeda.
                </p>
            </section>
        </section>
    )
}