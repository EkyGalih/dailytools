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
    <html lang="id">
      <head>
        {/* ✅ GOOGLE ADSENSE */}
        <Script
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4762845598503420"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-gray-50 text-gray-900">
        <Navbar />

        <main className="max-w-5xl mx-auto px-4 py-8">
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