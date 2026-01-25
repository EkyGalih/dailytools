import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kebijakan Privasi – MyTools',
  description:
    'Kebijakan privasi MyTools menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pengguna.',
}

export default function PrivacyPolicyPage() {
  return (
    <section className="space-y-12">
      {/* HEADER */}
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight">
          Kebijakan Privasi
        </h1>

        <p className="mt-4 text-gray-600">
          Kebijakan privasi ini menjelaskan bagaimana MyTools
          mengumpulkan, menggunakan, dan melindungi informasi
          pengguna saat mengakses situs kami.
        </p>
      </header>

      {/* CONTENT */}
      <div className="max-w-3xl space-y-8 text-gray-700">
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

        <section>
          <h2 className="text-lg font-semibold mb-2">
            Penggunaan Informasi
          </h2>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
            <li>Menganalisis penggunaan situs dan performa layanan</li>
            <li>Meningkatkan kualitas dan pengalaman pengguna</li>
            <li>Menjaga keamanan dan stabilitas sistem</li>
          </ul>
        </section>

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

        <section>
          <h2 className="text-lg font-semibold mb-2">
            Iklan Pihak Ketiga (Google AdSense)
          </h2>
          <p>
            MyTools menampilkan iklan dari pihak ketiga seperti
            Google AdSense. Google menggunakan cookie untuk
            menayangkan iklan berdasarkan kunjungan pengguna.
          </p>
          <p className="mt-2">
            Pengguna dapat menonaktifkan iklan yang dipersonalisasi
            melalui halaman{' '}
            <a
              href="https://policies.google.com/technologies/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Kebijakan Iklan Google
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">
            Privasi Anak-anak
          </h2>
          <p>
            MyTools tidak secara sadar mengumpulkan informasi pribadi
            dari anak-anak di bawah usia 13 tahun.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">
            Persetujuan
          </h2>
          <p>
            Dengan menggunakan situs MyTools, Anda dianggap telah
            menyetujui kebijakan privasi ini.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">
            Perubahan Kebijakan Privasi
          </h2>
          <p>
            Kebijakan privasi ini dapat diperbarui sewaktu-waktu dan
            berlaku sejak tanggal diperbarui.
          </p>
        </section>
      </div>

      {/* ✅ STRUCTURED DATA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Kebijakan Privasi MyTools',
            url: 'https://mytools.web.id/privacy-policy',
            description:
              'Kebijakan privasi MyTools yang menjelaskan pengumpulan dan penggunaan data pengguna.',
            isPartOf: {
              '@type': 'WebSite',
              name: 'MyTools',
              url: 'https://mytools.web.id',
            },
          }),
        }}
      />
    </section>
  )
}