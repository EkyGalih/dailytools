'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'

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
        className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between"
      >
        <Link href="/" className="text-lg font-semibold">
          My Tools
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="text-gray-600 hover:text-black">
            Beranda
          </Link>

          {/* KALKULATOR */}
          <DropdownMenu
            label="Kalkulator"
            open={open === 'kalkulator'}
            onToggle={() => toggle('kalkulator')}
          >
            <NavItem href="/kalkulator/cicilan" label="Cicilan" />
            <NavItem href="/kalkulator/kpr" label="Simulasi KPR" />
            <NavItem href="/kalkulator/thr" label="THR" />
            <NavItem href="/kalkulator/zakat" label="Zakat Penghasilan" />
            <NavItem href="/kalkulator/zakat-fitrah" label="Zakat Fitrah" />
            <NavItem href="/kalkulator/pph21" label="PPh 21" />
            <NavItem href="/kalkulator/take-home-pay" label="Gaji Bersih" />
          </DropdownMenu>

          {/* KONVERTER */}
          <DropdownMenu
            label="Konverter"
            open={open === 'konverter'}
            onToggle={() => toggle('konverter')}
          >
            <NavItem href="/konverter/image" label="Gambar" />
          </DropdownMenu>

          {/* KOMPRESS */}
          <DropdownMenu
            label="Kompress"
            open={open === 'kompress'}
            onToggle={() => toggle('kompress')}
          >
            <NavItem href="/kompress/gambar" label="Gambar" />
            <NavItem href="/kompress/pdf" label="PDF" />
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
}: {
  label: string
  open: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="cursor-pointer text-gray-600 hover:text-black flex items-center gap-1"
        aria-expanded={open}
      >
        {label} <span className="text-xs">▾</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-52 bg-white border rounded-xl shadow-lg">
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