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

  // ✅ Close on route change
  useEffect(() => {
    setOpen(null)
  }, [pathname])

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div
        ref={ref}
        className="max-w-5xl mx-auto px-2 py-1 flex items-center justify-between"
      >
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-with-text.png"
            alt="My Tools – Kalkulator & Tools Online Gratis"
            width={200}
            height={60}
            className="h-25 w-auto"
            priority
          />
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="text-gray-600 hover:text-black">
            Beranda
          </Link>

          {/* MENU UTAMA: TOOLS */}
          <DropdownMenu
            label="Tools"
            open={open?.startsWith('tools')} // ✅ Tetap terbuka jika open adalah 'tools' atau 'tools-...'
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
            open={!!open && open.startsWith('tools')} // ✅ Tetap terbuka jika open adalah 'sport' atau 'sport-bola'
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

          <Link href="/about" className="text-gray-600 hover:text-black">
            About
          </Link>
        </nav>
      </div>
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