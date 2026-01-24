export default function AboutPage() {
  return (
    <section className="space-y-14">
      {/* HEADER */}
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight">
          Tentang MyTools
        </h1>

        <p className="mt-4 text-gray-600">
          MyTools adalah platform penyedia berbagai tools online
          yang dirancang untuk membantu kebutuhan harian masyarakat
          Indonesia, mulai dari perhitungan finansial hingga
          konversi dan kompresi file secara cepat, mudah, dan gratis.
        </p>
      </div>

      {/* CONTENT */}
      <div className="max-w-3xl space-y-6 text-gray-700">
        <p>
          Di MyTools, kamu dapat menemukan berbagai alat bantu seperti
          kalkulator THR, zakat penghasilan dan zakat fitrah, pajak
          penghasilan (PPh 21), gaji bersih (take home pay), simulasi
          cicilan, serta tools konversi dan kompresi file seperti
          kompres gambar dan dokumen.
        </p>

        <p>
          Seluruh tools di MyTools dibuat dengan tujuan memberikan
          solusi praktis tanpa proses yang rumit. Kamu tidak perlu
          mendaftar atau memasang aplikasi tambahan untuk menggunakan
          layanan kami — cukup buka halaman tool yang dibutuhkan dan
          gunakan secara langsung.
        </p>

        <p>
          MyTools berkomitmen untuk menghadirkan antarmuka yang bersih,
          modern, dan mudah digunakan di berbagai perangkat, baik
          desktop maupun mobile. Setiap fitur dikembangkan dengan
          fokus pada kenyamanan pengguna dan kejelasan hasil.
        </p>
      </div>

      {/* DISCLAIMER */}
      <div className="max-w-3xl border rounded-xl p-6 bg-gray-50">
        <h2 className="text-lg font-semibold">
          Catatan Penting
        </h2>
        <p className="mt-3 text-sm text-gray-600">
          Hasil perhitungan dan proses yang ditampilkan di MyTools
          bersifat estimasi dan tidak menggantikan perhitungan resmi
          dari instansi terkait, lembaga keuangan, lembaga zakat,
          atau kebijakan perusahaan. Untuk keputusan finansial,
          administratif, dan ibadah yang bersifat penting, kami
          menyarankan untuk berkonsultasi dengan pihak yang berwenang.
        </p>
      </div>

      {/* VALUES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
        <div className="border rounded-xl p-6 bg-white">
          <p className="text-lg font-semibold">Mudah Digunakan</p>
          <p className="text-sm text-gray-600 mt-2">
            Dirancang agar dapat digunakan oleh siapa saja tanpa
            keahlian teknis atau proses yang rumit.
          </p>
        </div>

        <div className="border rounded-xl p-6 bg-white">
          <p className="text-lg font-semibold">Praktis & Transparan</p>
          <p className="text-sm text-gray-600 mt-2">
            Menyajikan hasil dengan logika perhitungan dan proses
            yang jelas serta mudah dipahami.
          </p>
        </div>

        <div className="border rounded-xl p-6 bg-white">
          <p className="text-lg font-semibold">Gratis & Aksesibel</p>
          <p className="text-sm text-gray-600 mt-2">
            Semua tools dapat digunakan tanpa biaya, tanpa
            registrasi, dan dapat diakses kapan saja.
          </p>
        </div>
      </div>
    </section>
  )
}