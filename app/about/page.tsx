export default function AboutPage() {
  return (
    <section className="space-y-12">
      {/* HEADER */}
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight">
          Tentang Kalkulator.id
        </h1>

        <p className="mt-4 text-gray-600">
          Kalkulator.id adalah situs penyedia berbagai kalkulator
          finansial dan ibadah yang dirancang untuk membantu
          masyarakat Indonesia menghitung kebutuhan sehari-hari
          secara cepat, mudah, dan gratis.
        </p>
      </div>

      {/* CONTENT */}
      <div className="max-w-3xl space-y-6 text-gray-700">
        <p>
          Kami menyediakan alat bantu seperti kalkulator THR,
          zakat penghasilan, zakat fitrah, fidya puasa, pajak
          penghasilan (PPh 21), hingga gaji bersih (take home pay).
          Semua perhitungan menggunakan rumus umum yang berlaku
          dan ditujukan sebagai estimasi.
        </p>

        <p>
          Kalkulator.id dibuat dengan tujuan memberikan kemudahan
          bagi siapa pun yang membutuhkan perhitungan cepat tanpa
          harus memahami rumus yang rumit. Seluruh fitur dapat
          digunakan tanpa pendaftaran dan tanpa biaya.
        </p>

        <p>
          Kami berkomitmen untuk menyajikan antarmuka yang bersih,
          sederhana, dan mudah digunakan di berbagai perangkat,
          baik desktop maupun mobile.
        </p>
      </div>

      {/* DISCLAIMER */}
      <div className="max-w-3xl border rounded-xl p-5 bg-gray-50">
        <h2 className="text-lg font-semibold">
          Catatan Penting
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Hasil perhitungan yang ditampilkan di Kalkulator.id
          bersifat estimasi dan tidak menggantikan perhitungan
          resmi dari instansi terkait, lembaga zakat, atau
          kebijakan perusahaan. Untuk keputusan finansial dan
          ibadah yang bersifat penting, kami menyarankan untuk
          berkonsultasi dengan pihak yang berwenang.
        </p>
      </div>

      {/* VALUES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
        <div className="border rounded-xl p-5">
          <p className="text-lg font-semibold">Mudah</p>
          <p className="text-sm text-gray-600 mt-1">
            Dirancang agar dapat digunakan oleh siapa saja
            tanpa keahlian teknis.
          </p>
        </div>

        <div className="border rounded-xl p-5">
          <p className="text-lg font-semibold">Transparan</p>
          <p className="text-sm text-gray-600 mt-1">
            Menampilkan hasil dan logika perhitungan secara
            jelas dan terbuka.
          </p>
        </div>

        <div className="border rounded-xl p-5">
          <p className="text-lg font-semibold">Gratis</p>
          <p className="text-sm text-gray-600 mt-1">
            Semua fitur dapat digunakan tanpa biaya dan tanpa
            registrasi.
          </p>
        </div>
      </div>
    </section>
  )
}