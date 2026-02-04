import './globals.css'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import GAListener from '@/components/GAListener'
import Script from 'next/script'
import NextTopLoader from 'nextjs-toploader'
import CoffeePopup from '@/components/drama/ads/CoffePopup'

export const metadata: Metadata = {
  metadataBase: new URL('https://tamanto.web.id'),
  title: {
    default: 'Tamanto – Streaming Drama Asia, Anime & Manga Terlengkap',
    template: '%s | Tamanto',
  },
  other: {
    "google-adsense-account": "ca-pub-4762845598503420",
  },
  verification: {
    google: "Qa7rW4YkK4_ER8nyMVXd5KEXzqSTItCifB4RThCRWeo",
  },
  description:
    'Nonton Drama China viral (Dramabox), Drama Korea terbaru, Anime Ongoing, hingga baca Manga & Manhwa sub Indo kualitas HD.',
  keywords: [
    'Tamanto', 'Nonton Drama China', 'Drama Korea Sub Indo', 'Streaming Anime',
    'Baca Manga', 'Manhwa Indonesia', 'Dramabox Free', 'Hiburan Asia'
  ],
  authors: [{ name: 'Tamanto Team' }],
  openGraph: {
    title: 'Tamanto – Hiburan Tanpa Batas, Kita Nonton Bareng!',
    description: 'Platform streaming Drama Asia, Anime, dan koleksi Manga terlengkap dengan update setiap hari.',
    url: 'https://tamanto.web.id',
    siteName: 'Tamanto',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tamanto – Kita Nonton, Kita Terhibur',
    description: 'Streaming Drama China, Korea, Anime, dan Manga terbaru dalam satu genggaman.',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
    other: [
      {
        rel: 'icon',
        url: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        {/* ✅ FIX ADSENSE: Gunakan native script untuk script utama AdSense agar tidak ada data-nscript */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4762845598503420" // Ganti dengan ID Adsense kamu jika diperlukan
          crossOrigin="anonymous"
        ></script>
        <meta name="monetag" content="13de0a9b9b0974ee549d25adad2492fb"></meta>

        {/* ✅ MONETAG AD ZONE 1 */}
        <Script
          id="monetag-vignette"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(s){
              s.dataset.zone='10559496';
              s.src='https://gizokraijaw.net/vignette.min.js';
            })([document.documentElement, document.body]
              .filter(Boolean)
              .pop()
              .appendChild(document.createElement('script')));`,
          }}
        />
      </head>
      <body className="bg-gray-50 text-gray-900">
        <Navbar />
        <NextTopLoader
          color="#9333ea"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #9333ea,0 0 5px #9333ea"
        />

        <main className="w-full min-h-[80vh]">
          {children}
          <CoffeePopup />
        </main>

        <footer className="bg-white border-t border-zinc-100 pt-20 pb-10 mt-24">
          <div className="max-w-7xl mx-auto px-6">
            {/* Grid Utama */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

              {/* Kolom 1: Brand & Slogan */}
              <div className="space-y-6">
                <h2 className="text-2xl font-black italic tracking-tighter uppercase text-zinc-900">
                  TAMAN<span className="text-indigo-600">TO.</span>
                </h2>
                <p className="text-zinc-500 text-sm leading-relaxed italic">
                  "Kita Nonton, Kita Terhibur." <br />
                  Platform hiburan Asia terlengkap mulai dari Drama, Anime, hingga koleksi Manga dalam satu genggaman.
                </p>
              </div>

              {/* Kolom 2: Hiburan */}
              <div className="space-y-6">
                <h4 className="font-black text-xs uppercase tracking-[0.2em] text-zinc-900 italic">Streaming Hub</h4>
                <ul className="space-y-4 text-sm text-zinc-500 font-medium">
                  <li><Link href="/drama/china" className="hover:text-indigo-600 transition-all">Drama China (Dramabox)</Link></li>
                  <li><Link href="/drama/korea" className="hover:text-indigo-600 transition-all">Drama Korea Terbaru</Link></li>
                  <li><Link href="/anime" className="hover:text-indigo-600 transition-all">Streaming Anime HD</Link></li>
                  <li><Link href="/bola/livescore" className="hover:text-indigo-600 transition-all">Livescore Sepak Bola</Link></li>
                </ul>
              </div>

              {/* Kolom 3: Literasi Visual */}
              <div className="space-y-6">
                <h4 className="font-black text-xs uppercase tracking-[0.2em] text-zinc-900 italic">Manga Universe</h4>
                <ul className="space-y-4 text-sm text-zinc-500 font-medium">
                  <li><Link href="/komik/manga" className="hover:text-indigo-600 transition-all">Manga Japan</Link></li>
                  <li><Link href="/komik/manhwa" className="hover:text-indigo-600 transition-all">Manhwa Korea</Link></li>
                  <li><Link href="/komik/manhua" className="hover:text-indigo-600 transition-all">Manhua China</Link></li>
                </ul>
              </div>

              {/* Kolom 4: Informasi */}
              <div className="space-y-6">
                <h4 className="font-black text-xs uppercase tracking-[0.2em] text-zinc-900 italic">Support</h4>
                <ul className="space-y-4 text-sm text-zinc-500 font-medium">
                  <li><Link href="/about" className="hover:text-indigo-600 transition-all">Tentang Tamanto</Link></li>
                  <li><Link href="/hubungi-kami" className="hover:text-indigo-600 transition-all">Hubungi Kami</Link></li>
                  <li><Link href="/privacy-policy" className="hover:text-indigo-600 transition-all">Privacy Policy</Link></li>
                  <li><Link href="/terms-conditions" className="hover:text-indigo-600 transition-all">Syarat & Ketentuan</Link></li>
                </ul>
              </div>
            </div>

            {/* Baris Bawah: Copyright & Aksen */}
            <div className="pt-8 border-t border-zinc-50 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] font-bold uppercase tracking-widest text-zinc-400">
              <p>© {new Date().getFullYear()} Tamanto • Hiburan Digital Batur Lombok</p>

              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                <span className="italic">Made with Love in Lombok</span>
              </div>
            </div>
          </div>
        </footer>
        <GoogleAnalytics />
        <GAListener />
      </body>
    </html>
  )
}