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

  const [isPremium, setIsPremium] = useState(false)

  useEffect(() => {
    function checkPremium() {
      const token = localStorage.getItem("premium_token")
      setIsPremium(!!token)
    }

    checkPremium()

    window.addEventListener("premium_updated", checkPremium)

    return () => {
      window.removeEventListener("premium_updated", checkPremium)
    }
  }, [])

  return (
    <>
      <header className="sticky top-0 z-[100] w-full border-b border-zinc-100 bg-white/80 backdrop-blur-md">
        <div ref={ref} className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">

          {/* LOGO & BRAND */}
          <Link href="/" className="flex items-center gap-3 transition-all hover:opacity-80 group">
            {/* Logo Image - Background Hitam Dihapus */}
            <div className="relative h-11 w-11 md:h-12 md:w-12 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
              <Image
                src="/logo.png"
                alt="Tamanto Logo"
                width={120}
                height={120}
                className="h-full w-full object-contain"
                priority
              />
            </div>

            {/* Text Branding */}
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black italic tracking-tighter uppercase leading-none text-zinc-900">
                <span className="text-indigo-600">TA</span>MANTO
              </span>
              <span className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-400 leading-none mt-1">
                Kita Nonton
              </span>
            </div>
          </Link>

          {/* MOBILE PREMIUM STATUS */}
          <div className="lg:hidden">
            {isPremium ? (
              <Link
                href="/paket"
                className="group relative flex items-center gap-2 px-4 py-2 rounded-full bg-[#0c0c0e] border border-emerald-500/30 text-white overflow-hidden shadow-[0_0_20px_rgba(16,185,129,0.15)] active:scale-95 transition-all duration-300"
              >
                {/* Animasi Cahaya Berjalan (Shimmer) */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                <div className="relative flex items-center gap-2">
                  <div className="relative">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                    <div className="absolute inset-0 bg-emerald-400 blur-sm opacity-50" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.15em] bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-300">
                    Premium
                  </span>
                </div>
              </Link>
            ) : (
              <Link
                href="/paket"
                className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md text-zinc-400 text-[10px] font-black uppercase tracking-[0.15em] hover:border-purple-500/50 hover:text-purple-400 transition-all active:scale-95 shadow-xl"
              >
                <div className="relative flex items-center justify-center w-4 h-4 rounded-full bg-zinc-900 border border-white/5 group-hover:border-purple-500/30 transition-colors">
                  <span className="text-[8px] group-hover:scale-110 transition-transform">🔓</span>
                </div>
                Free
              </Link>
            )}
          </div>

          {/* DESKTOP NAV (Keep as is) */}
          <nav className="hidden items-center gap-1 lg:flex">
            <Link href="/" className={`px-4 py-2 text-sm font-bold transition ${isActive('/') ? 'text-purple-600' : 'text-zinc-600 hover:text-black'}`}>Beranda</Link>

            <DesktopDropdown label="Drama" icon={<Play className="w-4 h-4" />} open={open === 'drama'} onToggle={() => toggle('drama')}>
              <NavItem href="/drama/china" label="Drama China" desc="Trending & Viral" />
              <NavItem href="/drama/korea" label="Drama Korea" desc="Update Setiap Hari" />
            </DesktopDropdown>

            <Link
              href="/anime"
              className="px-4 py-2 text-sm font-bold text-zinc-600 hover:text-black flex items-center gap-2 transition-colors"
            >
              <PlaySquareIcon className="w-4 h-4 shrink-0" />
              <span>Anime</span>
            </Link>

            <Link href="/komik"
              className="px-4 py-2 text-sm font-bold text-zinc-600 hover:text-black flex items-center gap-2 transition-colors"
            >
              <BookOpenText className="w-4 h-4 shrink-0" />
              <span>Komik</span>
            </Link>

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
            <Link
              href="/paket"
              className={`group relative ml-4 flex items-center justify-center w-10 h-10 rounded-2xl transition-all duration-500 overflow-hidden
    ${isPremium
                  ? "bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-lg shadow-emerald-500/30 rotate-[10deg] hover:rotate-0"
                  : "bg-white text-zinc-400 border border-zinc-100 shadow-sm hover:border-indigo-400 hover:text-indigo-600 hover:-translate-y-1"
                }`}
              aria-label={isPremium ? "Premium Active" : "Unlock Premium"}
            >
              {/* Efek Kilau / Shine (Hanya Premium) */}
              {isPremium && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              )}

              {isPremium ? (
                <div className="relative">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 fill-current drop-shadow-md"
                  >
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                  {/* Red Dot Notification (Status Active) */}
                  <span className="absolute -top-1 -right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                  </span>
                </div>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 fill-none stroke-current stroke-[2.5] transition-transform group-hover:scale-110"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              )}

              {/* Background Glow (Outer) */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10
    ${isPremium ? "bg-emerald-500" : "bg-indigo-500"}`}
              />
            </Link>
            <a href="https://trakteer.id/god_suru/showcase?menu=open" target="_blank" className="ml-4 flex items-center gap-2 rounded-xl bg-zinc-900 px-5 py-2.5 text-[13px] font-black text-white transition hover:bg-purple-600 active:scale-95 shadow-xl shadow-purple-500/10">☕ Traktir Kopi</a>
          </nav>
        </div>

        {/* MOBILE MENU OVERLAY */}
        {mobileOpen && (
          <div className="fixed inset-0 min-h-screen z-[200] bg-white lg:hidden flex flex-col animate-in slide-in-from-right duration-300">

            {/* Header Mobile */}
            {/* Header Mobile Menu */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-zinc-50">
              <div className="flex flex-col">
                {/* Perbaikan Branding Tamanto: Black Italic & Uppercase */}
                <span className="text-xl md:text-2xl font-black italic tracking-tighter uppercase leading-none text-zinc-900">
                  <span className="text-indigo-600">TA</span>MANTO
                </span>
                {/* Slogan disesuaikan dengan identitas lokal Sasak kamu */}
                <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-[0.2em] mt-1">
                  Kita Nonton
                </span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-3 bg-zinc-100 text-zinc-600 rounded-2xl active:scale-90 transition-transform"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content Mobile */}
            <div className="flex-1 overflow-y-auto px-8 py-10">
              <div className="flex flex-col min-h-full space-y-8 pb-20">

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
                <Link
                  href="/paket"
                  className={`group relative flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300 active:scale-90
    ${isPremium
                      ? "bg-gradient-to-tr from-rose-500 to-orange-400 text-white shadow-lg shadow-rose-500/30"
                      : "bg-white/80 backdrop-blur-md text-zinc-400 border border-zinc-200 shadow-sm"
                    }`}
                  aria-label={isPremium ? "Premium Active" : "Upgrade to Premium"}
                >
                  {/* 1. EFEK GLOW RADIUS (Latar belakang yang menyala) */}
                  <div className={`absolute inset-0 rounded-2xl opacity-0 group-active:opacity-100 transition-opacity duration-500 blur-xl -z-10
    ${isPremium ? "bg-rose-500" : "bg-indigo-500"}`}
                  />

                  {/* 2. IKON STATE */}
                  {isPremium ? (
                    <div className="relative">
                      {/* Ikon Mahkota/Star yang Modern */}
                      <svg
                        viewBox="0 0 24 24"
                        className="w-6 h-6 fill-current drop-shadow-sm animate-in zoom-in duration-300"
                      >
                        <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5ZM19 19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V18H19V19Z" />
                      </svg>

                      {/* Live Active Pulse (Indikator Premium Aktif) */}
                      <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white border border-rose-500"></span>
                      </span>
                    </div>
                  ) : (
                    <div className="relative flex flex-col items-center">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-5 h-5 fill-none stroke-current stroke-[2.5] transition-all group-active:scale-110"
                      >
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      {/* Label Kecil untuk Mobile agar User Paham */}
                      <span className="text-[7px] font-black uppercase tracking-tighter mt-0.5 opacity-60">Pro</span>
                    </div>
                  )}

                  {/* 3. SHINE ANIMATION (Hanya Premium) */}
                  {isPremium && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_3s_infinite] transition-transform" />
                  )}

                  <style jsx>{`
    @keyframes shimmer {
      100% { transform: translateX(100%); }
    }
  `}</style>
                </Link>
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
      {/* ===============================
   MOBILE BOTTOM NAVIGATION
=============================== */}
      <div className="fixed bottom-0 left-0 right-0 z-[150] bg-white border-t border-zinc-100 shadow-lg lg:hidden">
        <div className="flex items-center justify-around py-2">

          <BottomNavItem
            href="/"
            icon={<HomeIcon className="w-5 h-5" />}
            label="Home"
            active={pathname === "/"}
          />

          <BottomNavItem
            href="/drama"
            icon={
              isPremium ? (
                <Sparkles className="w-5 h-5 text-emerald-500" />
              ) : (
                <Sparkles className="w-5 h-5" />
              )
            }
            label="Drama"
            active={pathname.startsWith("/drama")}
          />

          <BottomNavItem
            href="/anime"
            icon={<PlaySquareIcon className="w-5 h-5" />}
            label="Anime"
            active={pathname.startsWith("/anime")}
          />

          <BottomNavItem
            href="/komik"
            icon={<BookOpenText className="w-5 h-5" />}
            label="Komik"
            active={pathname.startsWith("/komik")}
          />

          <button
            onClick={() => setMobileOpen(true)}
            className="flex flex-col items-center text-zinc-500"
          >
            <Menu className="w-5 h-5" />
            <span className="text-[10px] font-bold mt-1">Menu</span>
          </button>
        </div>
      </div>
    </>
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
    <Link href={href} prefetch={false} className="block px-4 py-2.5 rounded-xl hover:bg-purple-50 group transition-all">
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
    <Link href={href} prefetch={false} className={`flex items-center gap-3 font-bold transition-colors ${sub ? 'py-1 text-zinc-500 text-[13px] hover:text-purple-600' : 'py-3 text-lg text-zinc-900 italic uppercase tracking-tighter'}`}>
      {icon} {label}
    </Link>
  )
}

function BottomNavItem({
  href,
  icon,
  label,
  active,
}: any) {
  return (
    <Link
      href={href}
      className={`flex flex-col items-center transition-all ${active
        ? "text-purple-600"
        : "text-zinc-500 hover:text-purple-600"
        }`}
    >
      {icon}
      <span className="text-[10px] font-bold mt-1">
        {label}
      </span>
    </Link>
  )
}