export default function PrivacyPolicyPage() {
  return (
    <section className="space-y-12">
      {/* HEADER */}
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight">
          Kebijakan Privasi
        </h1>

        <p className="mt-4 text-gray-600">
          Kebijakan privasi ini menjelaskan bagaimana Kalkulator.id
          mengumpulkan, menggunakan, dan melindungi informasi
          pengguna saat mengakses situs kami.
        </p>
      </div>

      {/* CONTENT */}
      <div className="max-w-3xl space-y-6 text-gray-700">
        <section>
          <h2 className="text-lg font-semibold mb-2">
            Informasi yang Kami Kumpulkan
          </h2>
          <p>
            Kalkulator.id tidak mengharuskan pengguna untuk
            melakukan pendaftaran atau memberikan informasi
            pribadi secara langsung. Informasi yang dikumpulkan
            bersifat non-pribadi dan terbatas pada data teknis
            seperti alamat IP, jenis perangkat, browser, dan
            halaman yang diakses.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">
            Penggunaan Informasi
          </h2>
          <p>
            Informasi non-pribadi digunakan untuk keperluan
            analisis statistik, peningkatan kualitas layanan,
            serta memastikan fungsi situs berjalan dengan baik.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">
            Cookie dan Teknologi Pelacakan
          </h2>
          <p>
            Kalkulator.id dapat menggunakan cookie untuk
            meningkatkan pengalaman pengguna. Cookie juga
            digunakan oleh pihak ketiga, termasuk Google,
            untuk menampilkan iklan yang relevan kepada pengguna.
          </p>
          <p className="mt-2">
            Google menggunakan cookie DART yang memungkinkan
            penayangan iklan berdasarkan kunjungan pengguna ke
            situs ini dan situs lainnya. Pengguna dapat memilih
            untuk menonaktifkan penggunaan cookie iklan Google
            melalui pengaturan iklan Google.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">
            Iklan Pihak Ketiga
          </h2>
          <p>
            Kami bekerja sama dengan penyedia iklan pihak ketiga,
            termasuk Google AdSense. Penyedia iklan ini dapat
            menggunakan teknologi seperti cookie atau web beacon
            untuk menampilkan iklan yang relevan.
          </p>
          <p className="mt-2">
            Kalkulator.id tidak memiliki akses atau kontrol
            terhadap cookie yang digunakan oleh pengiklan
            pihak ketiga tersebut.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">
            Privasi Anak-anak
          </h2>
          <p>
            Kalkulator.id tidak secara sadar mengumpulkan
            informasi pribadi dari anak-anak di bawah usia 13
            tahun. Jika Anda merasa bahwa anak Anda telah
            memberikan informasi pribadi di situs ini, silakan
            hubungi kami agar kami dapat segera mengambil
            tindakan yang diperlukan.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">
            Persetujuan
          </h2>
          <p>
            Dengan menggunakan situs Kalkulator.id, Anda
            menyetujui kebijakan privasi ini serta syarat dan
            ketentuan yang berlaku.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">
            Perubahan Kebijakan Privasi
          </h2>
          <p>
            Kebijakan privasi ini dapat diperbarui dari waktu
            ke waktu. Setiap perubahan akan ditampilkan di
            halaman ini.
          </p>
        </section>
      </div>
    </section>
  )
}