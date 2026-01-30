"use client"

import Script from "next/script"

export default function AdsenseScript() {
    return (
        <Script
            id="adsense-init"
            strategy="afterInteractive"
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4762845598503420"
            crossOrigin="anonymous"
        />
    )
}