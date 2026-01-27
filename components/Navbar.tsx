'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

export default function Navbar() {
  const [open, setOpen] = useState<string | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  const toggle = (menu: string) => {
    setOpen((prev) => (prev === menu ? null : menu))
  }

  // ✅ Close when click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () =>
      document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileMenu, setMobileMenu] = useState<string | null>(null)

  const toggleMobileMenu = (key: string) => {
    setMobileMenu(prev => (prev === key ? null : key))
  }

  // ✅ Close on route change
  useEffect(() => {
    setOpen(null)
  }, [pathname])

  return (
    <header className="sticky top-0 z-50 bg-white text-indigo-950 border-b">
      <div
        ref={ref}
        className="max-w-5xl mx-auto px-2 py-1 flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          {/* LOGO */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-with-text.png"
              alt="My Tools – Kalkulator & Tools Online Gratis"
              width={160}
              height={48}
              className="h-10 w-auto"
              priority
            />
          </Link>
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          aria-label="Buka menu"
        >
          ☰
        </button>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="text-indigo-950 hover:text-black">
            Beranda
          </Link>

          <DropdownMenu
            label="Drama"
            open={!!open && open.startsWith('drama')} // ✅ Tetap terbuka jika open adalah 'sport' atau 'sport-bola'
            onToggle={() => toggle('drama')}
          >
            <NavItem href="/drama/china/channel/dramabox" label="Drama China" />
            <NavItem href="/drama/korea" label="Drama Korea" />
          </DropdownMenu>
          {/* MENU UTAMA: TOOLS */}
          <DropdownMenu
            label="Tools"
            open={!!open && open.startsWith('tools')}// ✅ Tetap terbuka jika open adalah 'tools' atau 'tools-...'
            onToggle={() => toggle('tools')}
          >
            {/* SUB MENU: KREATOR */}
            <DropdownMenu
              label="Kreator"
              open={open === 'tools-kreator'}
              onToggle={() => toggle('tools-kreator')}
              direction="right"
            >
              <NavItem href="/kreator/calculate-income" label="Penghasilan Sosial Media" />
              <NavItem href="/kreator/hashtag" label="Generator Hashtag" />
              <NavItem href="/kreator/caption" label="Generator Caption" />
              <NavItem href="/kreator/video-size" label="Estimasi Ukuran Video" />
              <NavItem href="/kreator/auto-clipper" label="Auto Clipper Video" />
            </DropdownMenu>

            {/* SUB MENU: KALKULATOR */}
            <DropdownMenu
              label="Kalkulator"
              open={open === 'tools-kalkulator'}
              onToggle={() => toggle('tools-kalkulator')}
              direction="right"
            >
              <NavItem href="/kalkulator/cicilan" label="Cicilan" />
              <NavItem href="/kalkulator/kpr" label="Simulasi KPR" />
              <NavItem href="/kalkulator/thr" label="THR" />
              <NavItem href="/kalkulator/zakat" label="Zakat Penghasilan" />
              <NavItem href="/kalkulator/zakat-fitrah" label="Zakat Fitrah" />
              <NavItem href="/kalkulator/pph21" label="PPh 21" />
              <NavItem href="/kalkulator/take-home-pay" label="Gaji Bersih" />
            </DropdownMenu>

            {/* SUB MENU: KONVERTER */}
            <DropdownMenu
              label="Konverter"
              open={open === 'tools-konverter'}
              onToggle={() => toggle('tools-konverter')}
              direction="right"
            >
              <NavItem href="/konverter/image" label="Gambar" />
            </DropdownMenu>

            {/* SUB MENU: KOMPRESS */}
            <DropdownMenu
              label="Kompress"
              open={open === 'tools-kompress'}
              onToggle={() => toggle('tools-kompress')}
              direction="right"
            >
              <NavItem href="/kompress/gambar" label="Gambar" />
              <NavItem href="/kompress/pdf" label="PDF" />
            </DropdownMenu>
          </DropdownMenu>
          {/* Ganti kondisi open pada menu induk yang punya sub-menu */}
          <DropdownMenu
            label="Sport"
            open={!!open && open.startsWith('sport')} // ✅ Tetap terbuka jika open adalah 'sport' atau 'sport-bola'
            onToggle={() => toggle('sport')}
          >
            <DropdownMenu
              label="Sepak Bola"
              open={open === 'sport-bola'}
              onToggle={() => toggle('sport-bola')}
              direction="right"
            >
              <NavItem href="/bola/livescore" label="Live Score" />
              {/* <NavItem href="/bola/liga" label="Liga Dunia" />
              <NavItem href="/bola/jadwal" label="Jadwal" /> */}
            </DropdownMenu>
          </DropdownMenu>

          <Link
            href="https://trakteer.id/eky_galih_gunanda/showcase?menu=open"
            target="_blank"
            rel="noopener sponsored nofollow"
            className="ml-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 px-4 py-2 text-sm font-semibold text-white shadow hover:opacity-90 transition"
            aria-label="Dukung kami lewat Trakteer"
          >
            ☕ Traktir Kopi
          </Link>

          <Link href="/about" className="text-gray-600 hover:text-black">
            About
          </Link>
        </nav>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-[100] bg-white overflow-y-auto">
          {/* HEADER */}
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <span className="font-semibold">Menu</span>
            <button
              onClick={() => setMobileOpen(false)}
              className="text-xl"
              aria-label="Tutup menu"
            >
              ✕
            </button>
          </div>

          <div className="px-4 py-4 text-sm space-y-1">

            {/* BERANDA */}
            <Link href="/" onClick={() => setMobileOpen(false)} className="block py-2">
              Beranda
            </Link>

            {/* DRAMA */}
            <button
              onClick={() => toggleMobileMenu('drama')}
              className="flex w-full justify-between items-center py-2 font-medium"
            >
              Drama
              <span>{mobileMenu === 'drama' ? '▲' : '▼'}</span>
            </button>

            {mobileMenu === 'drama' && (
              <div className="ml-4 border-l pl-4">
                <Link
                  href="/drama/china/channel/dramabox"
                  onClick={() => setMobileOpen(false)}
                  className="block py-2"
                >
                  Drama China
                </Link>
                <Link
                  href="/drama/korea"
                  onClick={() => setMobileOpen(false)}
                  className="block py-2"
                >
                  Drama Korea
                </Link>
              </div>
            )}

            {/* TOOLS */}
            <button
              onClick={() => toggleMobileMenu('tools')}
              className="flex w-full justify-between items-center py-2 font-medium"
            >
              Tools
              <span>{mobileMenu === 'tools' ? '▲' : '▼'}</span>
            </button>

            {mobileMenu === 'tools' && (
              <div className="ml-4 border-l pl-4 space-y-1">

                {/* KREATOR */}
                <button
                  onClick={() => toggleMobileMenu('kreator')}
                  className="flex w-full justify-between py-2"
                >
                  Kreator
                  <span>{mobileMenu === 'tools' ? '▲' : '▼'}</span>
                </button>

                {mobileMenu === 'tools' && (
                  <div className="ml-4 border-l pl-4 space-y-1">
                    <NavLinkMobile href="/kreator/calculate-income" close={setMobileOpen}>
                      Penghasilan Sosial Media
                    </NavLinkMobile>
                    <NavLinkMobile href="/kreator/hashtag" close={setMobileOpen}>
                      Generator Hashtag
                    </NavLinkMobile>
                    <NavLinkMobile href="/kreator/caption" close={setMobileOpen}>
                      Generator Caption
                    </NavLinkMobile>
                    <NavLinkMobile href="/kreator/video-size" close={setMobileOpen}>
                      Estimasi Ukuran Video
                    </NavLinkMobile>
                    <NavLinkMobile href="/kreator/auto-clipper" close={setMobileOpen}>
                      Auto Clipper Video
                    </NavLinkMobile>
                  </div>
                )}

                {/* KALKULATOR */}
                <button
                  onClick={() => toggleMobileMenu('kalkulator')}
                  className="flex w-full justify-between py-2"
                >
                  Kalkulator
                  <span>{mobileMenu === 'tools' ? '▲' : '▼'}</span>
                </button>

                {mobileMenu === 'tools' && (
                  <div className="ml-4 border-l pl-4 space-y-1">
                    <NavLinkMobile href="/kalkulator/cicilan" close={setMobileOpen}>Cicilan</NavLinkMobile>
                    <NavLinkMobile href="/kalkulator/kpr" close={setMobileOpen}>Simulasi KPR</NavLinkMobile>
                    <NavLinkMobile href="/kalkulator/thr" close={setMobileOpen}>THR</NavLinkMobile>
                    <NavLinkMobile href="/kalkulator/zakat" close={setMobileOpen}>Zakat Penghasilan</NavLinkMobile>
                    <NavLinkMobile href="/kalkulator/zakat-fitrah" close={setMobileOpen}>Zakat Fitrah</NavLinkMobile>
                    <NavLinkMobile href="/kalkulator/pph21" close={setMobileOpen}>PPh 21</NavLinkMobile>
                    <NavLinkMobile href="/kalkulator/take-home-pay" close={setMobileOpen}>Gaji Bersih</NavLinkMobile>
                  </div>
                )}

                {/* KONVERTER */}
                <NavLinkMobile href="/konverter/image" close={setMobileOpen}>
                  Konverter Gambar
                </NavLinkMobile>

                {/* KOMPRESS */}
                <NavLinkMobile href="/kompress/gambar" close={setMobileOpen}>
                  Kompress Gambar
                </NavLinkMobile>
                <NavLinkMobile href="/kompress/pdf" close={setMobileOpen}>
                  Kompress PDF
                </NavLinkMobile>
              </div>
            )}

            {/* SPORT */}
            <button
              onClick={() => toggleMobileMenu('sport')}
              className="flex w-full justify-between items-center py-2 font-medium"
            >
              Sport
              <span>{mobileMenu === 'sport' ? '▲' : '▼'}</span>
            </button>

            {mobileMenu === 'sport' && (
              <div className="ml-4 border-l pl-4">
                <NavLinkMobile href="/bola/livescore" close={setMobileOpen}>
                  Live Score
                </NavLinkMobile>
              </div>
            )}

            {/* ABOUT */}
            <Link href="/about" onClick={() => setMobileOpen(false)} className="block py-2">
              About
            </Link>

            {/* TRAKTEER */}
            <a
              href="https://trakteer.id/eky_galih_gunanda/showcase?menu=open"
              target="_blank"
              rel="noopener sponsored nofollow"
              className="mt-6 flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-pink-500 py-3 font-semibold text-white"
            >
              ☕ Traktir Kopi
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

function DropdownMenu({
  label,
  open,
  onToggle,
  children,
  direction = 'down', // Default ke bawah
}: {
  label: string
  open: boolean
  onToggle: () => void
  children: React.ReactNode
  direction?: 'down' | 'right'
}) {
  const isRight = direction === 'right';

  return (
    <div className={isRight ? "relative w-full" : "relative"}>
      <button
        onClick={(e) => {
          e.stopPropagation(); // ✅ Penting: Agar klik sub-menu tidak mentrigger parent
          onToggle();
        }}
        className={`w-full text-left cursor-pointer text-gray-600 hover:text-black flex items-center justify-between gap-1 px-4 py-2 ${isRight ? "hover:bg-gray-100" : ""
          }`}
        aria-expanded={open}
      >
        <span className="flex items-center gap-1">
          {label}
        </span>
        <span className="text-[10px]">{isRight ? '▶' : '▾'}</span>
      </button>

      {open && (
        <div
          className={`absolute z-[60] min-w-52 bg-white border rounded-xl shadow-lg 
            ${isRight
              ? 'left-full top-0 -mt-2 ml-1' // ✅ Posisi ke samping kanan
              : 'right-0 mt-2'               // Posisi standar ke bawah
            }`}
        >
          <ul className="py-2">{children}</ul>
        </div>
      )}
    </div>
  )
}

function NavItem({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
      >
        {label}
      </Link>
    </li>
  )
}

function NavLinkMobile({
  href,
  children,
  close,
}: {
  href: string
  children: React.ReactNode
  close: (v: boolean) => void
}) {
  return (
    <Link
      href={href}
      onClick={() => close(false)}
      className="block py-2 text-gray-600 hover:text-black"
    >
      {children}
    </Link>
  )
}