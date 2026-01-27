'use client'

import { usePathname } from 'next/navigation'
import AffiliateMiniPopup from './AffiliateMiniPopup'

export default function AffiliatePopupWrapper() {
  const pathname = usePathname()

  return <AffiliateMiniPopup key={pathname} />
}