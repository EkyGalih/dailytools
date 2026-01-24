import Link from 'next/link'

const tools = [
  {
    title: 'Kalkulator THR',
    desc: 'Hitung Tunjangan Hari Raya berdasarkan gaji dan masa kerja.',
    href: '/thr',
    cta: 'Hitung THR',
  },
  {
    title: 'Kalkulator Zakat',
    desc: 'Hitung zakat penghasilan otomatis berdasarkan nisab emas.',
    href: '/zakat',
    cta: 'Hitung Zakat',
  },
  {
    title: 'Kalkulator PPh 21',
    desc: 'Estimasi pajak penghasilan karyawan dengan tarif progresif.',
    href: '/pph21',
    cta: 'Hitung PPh 21',
  },
  {
    title: 'Kalkulator Gaji Bersih',
    desc: 'Hitung take home pay setelah pajak dan BPJS.',
    href: '/take-home-pay',
    cta: 'Hitung Gaji Bersih',
  },
]

export default function Home() {
  return (
    <section className="space-y-20">
      {/* HERO */}
      <div className="text-center max-w-3xl mx-auto mt-14">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Kalkulator Finansial Online
        </h1>

        <p className="mt-5 text-gray-600 text-lg">
          Kumpulan kalkulator finansial untuk membantu kamu menghitung
          THR, zakat, pajak, dan gaji bersih dengan cepat, akurat,
          dan mudah. Gratis dan tanpa ribet.
        </p>
      </div>

      {/* TOOLS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group border rounded-2xl p-6 bg-white
                       hover:shadow-lg hover:-translate-y-1
                       transition-all duration-200"
          >
            <h2 className="text-xl font-semibold">
              {tool.title}
            </h2>

            <p className="mt-2 text-gray-600">
              {tool.desc}
            </p>

            <span className="mt-4 inline-block text-sm font-medium text-black">
              {tool.cta} →
            </span>
          </Link>
        ))}
      </div>

      {/* TRUST / BENEFITS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-center">
        <div className="border rounded-xl p-6 bg-white">
          <p className="text-lg font-semibold">Cepat</p>
          <p className="text-sm text-gray-600 mt-2">
            Hasil langsung dengan tampilan jelas dan responsif.
          </p>
        </div>

        <div className="border rounded-xl p-6 bg-white">
          <p className="text-lg font-semibold">Akurat</p>
          <p className="text-sm text-gray-600 mt-2">
            Menggunakan rumus umum dan referensi yang berlaku di Indonesia.
          </p>
        </div>

        <div className="border rounded-xl p-6 bg-white">
          <p className="text-lg font-semibold">Gratis</p>
          <p className="text-sm text-gray-600 mt-2">
            Bisa digunakan kapan saja tanpa biaya dan tanpa login.
          </p>
        </div>
      </div>
    </section>
  )
}