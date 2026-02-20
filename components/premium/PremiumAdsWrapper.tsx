"use client"

import { usePremium } from "@/components/premium/usePremium"
import CoffeePopup from "@/components/drama/ads/CoffePopup"

export default function PremiumAdsWrapper() {
    const { premium, loading } = usePremium()

    if (loading || premium) return null

    return <CoffeePopup />
}