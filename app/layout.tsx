import './globals.css'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import GAListener from '@/components/GAListener'
import Script from 'next/script'

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
        {/* ✅ GOOGLE ADSENSE */}
        <Script
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4762845598503420"
          crossOrigin="anonymous"
        />
        {/* 🔥 MONETAG IN-PAGE PUSH — WAJIB DI HEAD */}
        {/* <Script
          id="monetag-inpage-push"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(s){
            s.dataset.zone='10524194';
            s.src='https://nap5k.com/tag.min.js';
          })(document.head.appendChild(document.createElement('script')));`,
          }}
        /> */}

        {/* 🔥 MONETAG VIGNETTE */}
        {/* <Script
          id="monetag-vignette"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(s){
          s.dataset.zone='10524198';
          s.src='https://gizokraijaw.net/vignette.min.js';
        })([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')));`,
          }}
        /> */}
      </head>
      <body className="bg-gray-50 text-gray-900">
        <Navbar />

        <main className="w-full">
          {children}
        </main>

        <footer className="border-t bg-white mt-12">
          <div className="max-w-5xl mx-auto px-4 py-6 text-sm text-gray-500 flex justify-between">
            <p>© {new Date().getFullYear()} My Tools</p>
            <Link href="/privacy-policy" className="hover:text-black">
              Privacy Policy
            </Link>
          </div>
        </footer>
        <GoogleAnalytics />
        <GAListener />
      </body>
    </html>
  )
}