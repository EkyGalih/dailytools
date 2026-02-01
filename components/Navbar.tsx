'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  Menu, X, ChevronDown, ChevronRight,
  Sparkles, Calculator, Play, Trophy,
  Info, Laptop, Home as HomeIcon, Coffee,
  PlaySquareIcon,
  BookOpenText
} from 'lucide-react'
import { BsFileZip } from 'react-icons/bs'

export default function Navbar() {
  const [open, setOpen] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileMenu, setMobileMenu] = useState<string | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  const toggle = (menu: string) => setOpen((prev) => (prev === menu ? null : menu))
  const toggleMobileMenu = (key: string) => setMobileMenu(prev => (prev === key ? null : key))

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(null)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  useEffect(() => {
    setOpen(null)
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileOpen]);

  const isActive = (path: string) => pathname === path

  return (
    <header className="sticky top-0 z-[100] w-full border-b border-zinc-100 bg-white/80 backdrop-blur-md">
      <div ref={ref} className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 transition hover:opacity-80">
          <Image src="/logo-with-text.png" alt="My Tools Logo" width={140} height={40} className="h-9 w-auto object-contain" priority />
        </Link>

        {/* DESKTOP NAV (Keep as is) */}
        <nav className="hidden items-center gap-1 lg:flex">
          <Link href="/" className={`px-4 py-2 text-sm font-bold transition ${isActive('/') ? 'text-purple-600' : 'text-zinc-600 hover:text-black'}`}>Beranda</Link>

          <DesktopDropdown label="Drama" icon={<Play className="w-4 h-4" />} open={open === 'drama'} onToggle={() => toggle('drama')}>
            <NavItem href="/drama/china/channel/dramabox" label="Drama China" desc="Trending & Viral" />
            <NavItem href="/drama/korea" label="Drama Korea" desc="Update Setiap Hari" />
          </DesktopDropdown>

          <Link
            href="/anime"
            className="px-4 py-2 text-sm font-bold text-zinc-600 hover:text-black flex items-center gap-2 transition-colors"
          >
            <PlaySquareIcon className="w-4 h-4 shrink-0" />
            <span>Anime</span>
          </Link>

          <DesktopDropdown label="Komik" icon={<BookOpenText className="w-4 h-4" />} open={open === 'komik'} onToggle={() => toggle('komik')}>
            <NavItem href="/komik/manga" label="Manga" desc="Manga" />
            <NavItem href="/manga" label="Manga" desc="Manga" />
          </DesktopDropdown>

          <DesktopDropdown label="Tools" icon={<Laptop className="w-4 h-4" />} open={open?.startsWith('tools') ?? false} onToggle={() => toggle('tools')}>
            <NestedDropdown label="Kreator" icon={<Sparkles className="w-3.5 h-3.5" />} isOpen={open === 'tools-kreator'} onToggle={() => toggle('tools-kreator')}>
              <NavItem href="/kreator/calculate-income" label="Income Sosmed" />
              <NavItem href="/kreator/hashtag" label="Hashtag Gen" />
              <NavItem href="/kreator/caption" label="Caption Gen" />
              <NavItem href="/kreator/video-size" label="Video Estimator" />
            </NestedDropdown>
            <NestedDropdown label="Konversi" icon={<BsFileZip className="w-3.5 h-3.5" />} isOpen={open === 'tools-konversi'} onToggle={() => toggle('tools-konversi')}>
              <NavItem href="/kompress/gambar" label="Gambar" />
              <NavItem href="/kompress/pdf" label="PDF" />
            </NestedDropdown>
            <NestedDropdown label="Kalkulator" icon={<Calculator className="w-3.5 h-3.5" />} isOpen={open === 'tools-kalkulator'} onToggle={() => toggle('tools-kalkulator')}>
              <NavItem href="/kalkulator/cicilan" label="Cicilan" />
              <NavItem href="/kalkulator/kpr" label="Simulasi KPR" />
              <NavItem href="/kalkulator/thr" label="THR" />
              <NavItem href="/kalkulator/zakat-fitrah" label="Zakat Fitrah" />
              <NavItem href="/kalkulator/zakat" label="Zakat Mall" />
              <NavItem href="/kalkulator/take-home-pay" label="Gaji Bersih" />
              <NavItem href="/kalkulator/pph21" label="PPH 21" />
              <NavItem href="/kalkulator/fidya" label="Fidya" />
            </NestedDropdown>
          </DesktopDropdown>

          <DesktopDropdown label="Sport" icon={<Trophy className="w-4 h-4" />} open={open === 'sport'} onToggle={() => toggle('sport')}>
            <NavItem href="/bola/livescore" label="Live Score" desc="Skor Real-time Liga Dunia" />
          </DesktopDropdown>

          <Link href="/about" className="px-4 py-2 text-sm font-bold text-zinc-600 hover:text-black">About</Link>
          <a href="https://trakteer.id/god_suru/showcase?menu=open" target="_blank" className="ml-4 flex items-center gap-2 rounded-xl bg-zinc-900 px-5 py-2.5 text-[13px] font-black text-white transition hover:bg-purple-600 active:scale-95 shadow-xl shadow-purple-500/10">☕ Traktir Kopi</a>
        </nav>

        {/* MOBILE TRIGGER */}
        <button onClick={() => setMobileOpen(true)} className="rounded-xl p-2.5 text-zinc-600 hover:bg-zinc-100 lg:hidden"><Menu className="h-6 w-6" /></button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      {mobileOpen && (
        <div className="fixed inset-0 min-h-screen z-[200] bg-white lg:hidden flex flex-col animate-in slide-in-from-right duration-300">

          {/* Header Mobile */}
          <div className="flex items-center justify-between px-8 py-6 border-b border-zinc-50">
            <div className="flex flex-col">
              <span className="text-xl font-black italic tracking-tighter text-purple-600 leading-none">MY TOOLS.</span>
              <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-[0.2em] mt-1">Digital Ecosystem</span>
            </div>
            <button onClick={() => setMobileOpen(false)} className="p-3 bg-zinc-100 text-zinc-600 rounded-2xl active:scale-90"><X className="w-6 h-6" /></button>
          </div>

          {/* Content Mobile */}
          <div className="flex-1 overflow-y-auto px-8 py-10">
            <div className="flex flex-col min-h-full space-y-8 pb-20">

              <MobileLink href="/" icon={<HomeIcon className="w-5 h-5" />} label="Beranda" />

              {/* DRAMA ASIA */}
              <MobileCollapse label="Drama Asia" icon={<Play className="w-5 h-5" />} isOpen={mobileMenu === 'drama'} onToggle={() => toggleMobileMenu('drama')}>
                <div className="mt-4 space-y-4 border-l-2 border-purple-100 ml-3 pl-5">
                  <MobileLink href="/drama/china/channel/dramabox" label="Drama China" sub />
                  <MobileLink href="/drama/korea" label="Drama Korea" sub />
                </div>
              </MobileCollapse>

              <MobileCollapse label="Komik" icon={<BookOpenText className="w-5 h-5" />} isOpen={mobileMenu === 'komik'} onToggle={() => toggleMobileMenu('komik')}>
                <div className="mt-4 space-y-4 border-l-2 border-purple-100 ml-3 pl-5">
                  <MobileLink href="/komik/manga" label="Manga" sub />
                  <MobileLink href="/manga" label="Manga" sub />
                </div>
              </MobileCollapse>

              <MobileLink href="/anime" icon={<PlaySquareIcon className="w-5 h-5" />} label="Anime" />

              {/* SMART TOOLS (Divided by Categories) */}
              <MobileCollapse label="Smart Tools" icon={<Laptop className="w-5 h-5" />} isOpen={mobileMenu === 'tools'} onToggle={() => toggleMobileMenu('tools')}>
                <div className="mt-6 space-y-10 border-l-2 border-purple-100 ml-3 pl-5">

                  {/* Kreator */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="w-3 h-3 text-purple-500" />
                      <p className="text-[10px] font-black text-purple-500 uppercase tracking-widest leading-none">Kreator Suite</p>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      <MobileLink href="/kreator/calculate-income" label="Income Sosmed" sub />
                      <MobileLink href="/kreator/hashtag" label="Hashtag Generator" sub />
                      <MobileLink href="/kreator/caption" label="Caption Generator" sub />
                      <MobileLink href="/kreator/video-size" label="Video Estimator" sub />
                    </div>
                  </div>

                  {/* Konversi */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <BsFileZip className="w-3 h-3 text-blue-500" />
                      <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest leading-none">Konversi & Kompres</p>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      <MobileLink href="/kompress/gambar" label="Kompres Gambar" sub />
                      <MobileLink href="/kompress/pdf" label="Kompres PDF" sub />
                    </div>
                  </div>

                  {/* Kalkulator */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Calculator className="w-3 h-3 text-emerald-500" />
                      <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest leading-none">Kalkulator Finansial</p>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      <MobileLink href="/kalkulator/cicilan" label="Simulasi Cicilan" sub />
                      <MobileLink href="/kalkulator/kpr" label="Simulasi KPR" sub />
                      <MobileLink href="/kalkulator/thr" label="Hitung THR" sub />
                      <MobileLink href="/kalkulator/zakat-fitrah" label="Zakat Fitrah" sub />
                      <MobileLink href="/kalkulator/zakat" label="Zakat Mall" sub />
                      <MobileLink href="/kalkulator/take-home-pay" label="Gaji Bersih (THP)" sub />
                      <MobileLink href="/kalkulator/pph21" label="Pajak PPH 21" sub />
                      <MobileLink href="/kalkulator/fidya" label="Kalkulator Fidya" sub />
                    </div>
                  </div>
                </div>
              </MobileCollapse>

              {/* SPORTS */}
              <MobileCollapse label="Sports Center" icon={<Trophy className="w-5 h-5" />} isOpen={mobileMenu === 'sport'} onToggle={() => toggleMobileMenu('sport')}>
                <div className="mt-4 border-l-2 border-purple-100 ml-3 pl-5">
                  <MobileLink href="/bola/livescore" label="Live Score Bola" sub />
                </div>
              </MobileCollapse>

              <MobileLink href="/about" icon={<Info className="w-5 h-5" />} label="Tentang Kami" />

              {/* Footer Mobile Menu */}
              <div className="mt-12 pt-8 border-t border-zinc-100">
                <a href="https://trakteer.id/god_suru/showcase?menu=open" target="_blank" className="flex w-full items-center justify-center gap-3 rounded-2xl bg-zinc-900 py-5 font-black text-white active:scale-95 transition-all">
                  <Coffee className="w-5 h-5 text-amber-400" /> Traktir Kopi
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

/* ===============================
   COMPONENTS
=============================== */

function DesktopDropdown({ label, icon, open, onToggle, children }: any) {
  return (
    <div className="relative group">
      <button onClick={onToggle} className={`flex items-center gap-1.5 px-4 py-2 text-sm font-bold transition-all rounded-lg hover:bg-zinc-50 ${open ? 'text-purple-600 bg-zinc-50' : 'text-zinc-600'}`}>
        {icon} {label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="absolute left-0 mt-2 w-64 bg-white border border-zinc-100 rounded-2xl shadow-2xl p-2 animate-in fade-in zoom-in-95 duration-200">{children}</div>}
    </div>
  )
}

function NestedDropdown({ label, icon, isOpen, onToggle, children }: any) {
  return (
    <div className="relative">
      <button onClick={(e) => { e.stopPropagation(); onToggle(); }} className="flex w-full items-center justify-between px-4 py-2 text-[13px] font-bold text-zinc-600 hover:bg-zinc-50 rounded-lg">
        <span className="flex items-center gap-2">{icon} {label}</span>
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
      {isOpen && <div className="absolute left-full top-0 ml-1 w-56 bg-white border border-zinc-100 rounded-2xl shadow-2xl p-2 z-50 animate-in slide-in-from-left-2 duration-200">{children}</div>}
    </div>
  )
}

function NavItem({ href, label, desc }: any) {
  return (
    <Link href={href} className="block px-4 py-2.5 rounded-xl hover:bg-purple-50 group transition-all">
      <p className="text-[13px] font-bold text-zinc-900 group-hover:text-purple-700">{label}</p>
      {desc && <p className="text-[10px] text-zinc-400 font-medium">{desc}</p>}
    </Link>
  )
}

function MobileCollapse({ label, icon, isOpen, onToggle, children }: any) {
  return (
    <div className="border-b border-zinc-50 pb-2">
      <button onClick={onToggle} className="flex w-full items-center justify-between py-3 text-lg font-black text-zinc-900 italic tracking-tighter uppercase">
        <span className="flex items-center gap-3">{icon} {label}</span>
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180 text-purple-600' : 'text-zinc-300'}`} />
      </button>
      {isOpen && <div className="pb-4">{children}</div>}
    </div>
  )
}

function MobileLink({ href, label, sub, icon }: any) {
  return (
    <Link href={href} className={`flex items-center gap-3 font-bold transition-colors ${sub ? 'py-1 text-zinc-500 text-[13px] hover:text-purple-600' : 'py-3 text-lg text-zinc-900 italic uppercase tracking-tighter'}`}>
      {icon} {label}
    </Link>
  )
}