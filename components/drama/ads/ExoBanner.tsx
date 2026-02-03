"use client"

import { useEffect } from "react"

export default function ExoBanner() {
  useEffect(() => {
    // jangan load dua kali
    if (document.getElementById("exo-provider")) return

    // load provider script
    const s = document.createElement("script")
    s.id = "exo-provider"
    s.src = "https://a.magsrv.com/ad-provider.js"
    s.async = true
    document.body.appendChild(s)

    // push render banner
    const pushScript = document.createElement("script")
    pushScript.innerHTML = `
      (AdProvider = window.AdProvider || []).push({"serve": {}});
    `
    document.body.appendChild(pushScript)
  }, [])

  return (
    <div className="w-full flex justify-center my-8">
      <ins
        className="eas6a97888e2"
        data-zoneid="5844610"
        data-keywords="drama,anime,streaming"
        style={{ display: "block" }}
      />
    </div>
  )
}