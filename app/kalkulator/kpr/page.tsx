import KprCalculator from "@/components/kalkulator/KprClculator";


export default function KprPage() {
    return (
        <section className="space-y-10 max-w-3xl">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">
                    Kalkulator KPR Rumah
                </h1>
                <p className="mt-3 text-gray-600">
                    Simulasi cicilan Kredit Pemilikan Rumah (KPR)
                    berdasarkan harga rumah, DP, tenor, serta bunga
                    fixed dan floating.
                </p>
            </div>

            <div className="bg-white border rounded-2xl p-6 shadow-sm">
                <KprCalculator />
            </div>

            <p className="text-xs text-gray-500">
                Perhitungan bersifat estimasi dan dapat berbeda
                dengan simulasi resmi bank.
            </p>
        </section>
    )
}