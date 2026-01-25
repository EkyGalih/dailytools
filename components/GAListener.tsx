'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function GAListener() {
  const pathname = usePathname()
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID

  useEffect(() => {
    if (!GA_ID || !(window as any).gtag) return

      ; (window as any).gtag('config', GA_ID, {
        page_path: pathname,
      })
  }, [pathname, GA_ID])

  return null
}