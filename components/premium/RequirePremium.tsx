"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

export default function RequirePremium() {
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        const token = localStorage.getItem("premium_token")

        if (!token) {
            // simpan halaman terakhir
            sessionStorage.setItem("last_page", pathname)

            // redirect ke premium
            router.push("/premium")
        }
    }, [])

    return null
}