import './globals.css'
import Link from 'next/link'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="bg-gray-50 text-gray-900">
        {/* HEADER */}
        <header className="sticky top-0 z-50 bg-white border-b">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
            {/* BRAND */}
            <Link
              href="/"
              className="text-lg font-semibold tracking-tight"
            >
              Kalkulator.id
            </Link>

            {/* NAV */}
            <nav className="flex items-center gap-6 text-sm font-medium">
              {/* DROPDOWN */}
              <div className="relative group">
                <button
                  className="text-gray-600 hover:text-black cursor-pointer flex items-center gap-1"
                  aria-haspopup="true"
                >
                  Kalkulator
                  <span className="text-xs">▾</span>
                </button>

                {/* DROPDOWN MENU */}
                <div
                  className="absolute right-0 mt-2 w-52 bg-white border rounded-xl shadow-lg
                             opacity-0 invisible group-hover:opacity-100 group-hover:visible
                             transition-all duration-150"
                >
                  <ul className="py-2">
                    <li>
                      <Link
                        href="/kalkulator/cicilan"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Cicilan
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/kalkulator/kpr"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Simulasi KPR
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/kalkulator/thr"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        THR
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/kalkulator/zakat"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Zakat Penghasilan
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/kalkulator/zakat-fitrah"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Zakat Fitrah
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/kalkulator/pph21"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        PPh 21
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/kalkulator/take-home-pay"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Gaji Bersih
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="relative group">
                <button
                  className="text-gray-600 hover:text-black cursor-pointer flex items-center gap-1"
                  aria-haspopup="true"
                >
                  Konverter
                  <span className="text-xs">▾</span>
                </button>

                {/* DROPDOWN MENU */}
                <div
                  className="absolute right-0 mt-2 w-52 bg-white border rounded-xl shadow-lg
                             opacity-0 invisible group-hover:opacity-100 group-hover:visible
                             transition-all duration-150"
                >
                  <ul className="py-2">
                    <li>
                      <Link
                        href="/konverter/image"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Gambar
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="relative group">
                <button
                  className="text-gray-600 hover:text-black cursor-pointer flex items-center gap-1"
                  aria-haspopup="true"
                >
                  Kompress
                  <span className="text-xs">▾</span>
                </button>

                {/* DROPDOWN MENU */}
                <div
                  className="absolute right-0 mt-2 w-52 bg-white border rounded-xl shadow-lg
                             opacity-0 invisible group-hover:opacity-100 group-hover:visible
                             transition-all duration-150"
                >
                  <ul className="py-2">
                    <li>
                      <Link
                        href="/kompress/gambar"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Gambar
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/kompress/pdf"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        PDF
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* STATIC LINKS */}
              <Link
                href="/about"
                className="hover:text-black text-gray-600"
              >
                About
              </Link>
            </nav>
          </div>
        </header>

        {/* MAIN */}
        <main className="max-w-5xl mx-auto px-4 py-8">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="border-t bg-white mt-12">
          <div className="max-w-5xl mx-auto px-4 py-6 text-sm text-gray-500 flex flex-col md:flex-row gap-4 justify-between">
            <p>© {new Date().getFullYear()} Kalkulator.id</p>

            <div className="flex gap-4">
              <Link href="/about" className="hover:text-black">
                About
              </Link>
              <Link
                href="/privacy-policy"
                className="hover:text-black"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}