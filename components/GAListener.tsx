'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function GAListener() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID

  useEffect(() => {
    if (!GA_ID || !(window as any).gtag) return

    const url =
      pathname +
      (searchParams.toString()
        ? `?${searchParams.toString()}`
        : '')

    ;(window as any).gtag('config', GA_ID, {
      page_path: url,
    })
  }, [pathname, searchParams, GA_ID])

  return null
}