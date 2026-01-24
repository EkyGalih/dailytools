export default function PrivacyPolicyPage() {
  return (
    <section className="space-y-12">
      {/* HEADER */}
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight">
          Kebijakan Privasi
        </h1>

        <p className="mt-4 text-gray-600">
          Kebijakan privasi ini menjelaskan bagaimana MyTools
          mengumpulkan, menggunakan, dan melindungi informasi
          pengguna saat mengakses situs kami.
        </p>
      </div>

      {/* CONTENT */}
      <div className="max-w-3xl space-y-8 text-gray-700">
        {/* INFORMASI */}
        <section>
          <h2 className="text-lg font-semibold mb-2">
            Informasi yang Kami Kumpulkan
          </h2>
          <p>
            MyTools tidak mewajibkan pengguna untuk melakukan
            pendaftaran atau memberikan informasi pribadi secara
            langsung. Kami tidak mengumpulkan data sensitif seperti
            nama, alamat, email, atau nomor telepon.
          </p>
          <p className="mt-2">
            Informasi yang dikumpulkan bersifat non-pribadi dan
            terbatas pada data teknis, seperti alamat IP, jenis
            perangkat, browser, sistem operasi, serta halaman yang
            diakses untuk keperluan analisis dan peningkatan layanan.
          </p>
        </section>

        {/* PENGGUNAAN */}
        <section>
          <h2 className="text-lg font-semibold mb-2">
            Penggunaan Informasi
          </h2>
          <p>
            Informasi non-pribadi digunakan untuk:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
            <li>Menganalisis penggunaan situs dan performa layanan</li>
            <li>Meningkatkan kualitas dan pengalaman pengguna</li>
            <li>Menjaga keamanan dan stabilitas sistem</li>
          </ul>
        </section>

        {/* COOKIE */}
        <section>
          <h2 className="text-lg font-semibold mb-2">
            Cookie dan Teknologi Pelacakan
          </h2>
          <p>
            MyTools menggunakan cookie untuk meningkatkan pengalaman
            pengguna dan mengumpulkan data statistik kunjungan.
            Cookie adalah file kecil yang disimpan di perangkat
            pengguna dan tidak mengandung informasi pribadi.
          </p>
          <p className="mt-2">
            Kami juga menggunakan layanan pihak ketiga, termasuk
            Google, yang dapat menggunakan cookie atau teknologi
            serupa untuk menampilkan iklan yang relevan kepada
            pengguna.
          </p>
        </section>

        {/* IKLAN */}
        <section>
          <h2 className="text-lg font-semibold mb-2">
            Iklan Pihak Ketiga (Google AdSense)
          </h2>
          <p>
            MyTools menampilkan iklan dari pihak ketiga seperti
            Google AdSense. Google menggunakan cookie DART untuk
            menayangkan iklan kepada pengguna berdasarkan kunjungan
            mereka ke situs ini dan situs lainnya di internet.
          </p>
          <p className="mt-2">
            Pengguna dapat memilih untuk menonaktifkan penggunaan
            cookie iklan Google dengan mengunjungi halaman
            <a
              href="https://policies.google.com/technologies/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="underline ml-1"
            >
              Kebijakan Iklan Google
            </a>.
          </p>
          <p className="mt-2">
            MyTools tidak memiliki akses atau kontrol atas cookie
            yang digunakan oleh pengiklan pihak ketiga.
          </p>
        </section>

        {/* ANAK */}
        <section>
          <h2 className="text-lg font-semibold mb-2">
            Privasi Anak-anak
          </h2>
          <p>
            MyTools tidak secara sadar mengumpulkan informasi
            pribadi dari anak-anak di bawah usia 13 tahun. Jika
            Anda meyakini bahwa anak Anda telah memberikan informasi
            pribadi di situs ini, silakan hubungi kami agar dapat
            segera ditindaklanjuti.
          </p>
        </section>

        {/* PERSETUJUAN */}
        <section>
          <h2 className="text-lg font-semibold mb-2">
            Persetujuan
          </h2>
          <p>
            Dengan menggunakan situs MyTools, Anda dianggap telah
            menyetujui kebijakan privasi ini beserta syarat dan
            ketentuan yang berlaku.
          </p>
        </section>

        {/* PERUBAHAN */}
        <section>
          <h2 className="text-lg font-semibold mb-2">
            Perubahan Kebijakan Privasi
          </h2>
          <p>
            Kebijakan privasi ini dapat diperbarui sewaktu-waktu.
            Setiap perubahan akan ditampilkan di halaman ini dan
            berlaku sejak tanggal diperbarui.
          </p>
        </section>
      </div>
    </section>
  )
}