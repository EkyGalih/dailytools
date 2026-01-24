import InstallmentCalculator from "@/components/kalkulator/InstallmentCalculator";
import MarketInfo from "@/components/MarketInfo";
import Link from "next/link";


export default function CicilanPage() {
    return (
        <section className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="md:col-span-2">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Kalkulator Cicilan Motor & Mobil
                        </h1>
                        <p className="mt-3 text-gray-600">
                            Hitung estimasi cicilan motor, mobil, atau barang
                            lainnya berdasarkan harga, DP, tenor, dan bunga.
                        </p>
                    </div>

                    <div className="bg-white border rounded-2xl p-6 shadow-sm">
                        <InstallmentCalculator />
                    </div>

                    <div className="mt-6 mb-6 text-sm text-gray-600">
                        <p>
                            Perlu menghitung
                            <Link href="/kalkulator/take-home-pay" className="ml-1 text-black underline">
                                Gaji (Take Home Pay)
                            </Link>
                            {' '}atau{' '}
                            <Link href="/kalkulator/pph21" className="text-black underline">
                                PPH 21
                            </Link>
                            ?
                        </p>
                    </div>

                    <div className="text-sm text-gray-600 space-y-2">
                        <p>
                            💡 Catatan: Perhitungan bersifat estimasi dan dapat
                            berbeda dengan simulasi resmi leasing atau bank.
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