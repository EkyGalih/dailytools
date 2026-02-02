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
  metadataBase: new URL('https://mytools.web.id'),
  title: {
    default: 'My Tools – Kalkulator & Tools Online Gratis',
    template: '%s | My Tools',
  },
  description:
    'Kumpulan tools online gratis: kalkulator THR, zakat, PPh 21, simulasi KPR, kompres PDF & gambar.',
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
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" // Ganti dengan ID Adsense kamu jika diperlukan
          crossOrigin="anonymous"
        ></script>

        {/* 🔥 MONETAG IN-PAGE PUSH (Baru Ditambahkan) */}
        <Script
          id="monetag-inpage-push"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(s){
              s.dataset.zone='10524194';
              s.src='https://nap5k.com/tag.min.js';
            })([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')));`,
          }}
        />

        {/* 🔥 MONETAG VIGNETTE - Gunakan strategy lazyOnload agar tidak menghambat loading utama */}
        <Script
          id="monetag-vignette"
          strategy="afterInteractive" // Berubah dari beforeInteractive agar DOM siap dulu
          dangerouslySetInnerHTML={{
            __html: `(function(s){
              s.dataset.zone='10524198';
              s.src='https://gizokraijaw.net/vignette.min.js';
            })([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')));`,
          }}
        />
      </head>
      <body className="bg-gray-50 text-gray-900">
        {/* Hapus AdsenseScript jika isinya hanya script client di atas, 
            tapi jika isinya unit iklan (ins), biarkan tetap di sini */}
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

        <footer className="border-t bg-white mt-12">
          <div className="max-w-5xl mx-auto px-4 py-8 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© {new Date().getFullYear()} My Tools • Platform Produktivitas Digital</p>
            <div className="flex gap-6">
              <Link href="/about" className="hover:text-orange-600 transition-colors">Tentang Kami</Link>
              <Link href="/privacy-policy" className="hover:text-orange-600 transition-colors">Privacy Policy</Link>
            </div>
          </div>
        </footer>
        <GoogleAnalytics />
        <GAListener />
      </body>
    </html>
  )
}