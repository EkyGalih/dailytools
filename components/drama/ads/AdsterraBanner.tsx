"use client"

import { useEffect } from "react"

export default function AdsterraBanner() {
    useEffect(() => {
        // Hindari double load
        if (document.getElementById("adsterra-banner")) return

        // Inject script options
        const scriptOptions = document.createElement("script")
        scriptOptions.innerHTML = `
      atOptions = {
        'key' : 'f26d7d1eb10f9c59c831bce1a130697a',
        'format' : 'iframe',
        'height' : 250,
        'width' : 300,
        'params' : {}
      };
    `

        // Inject invoke.js
        const scriptInvoke = document.createElement("script")
        scriptInvoke.src =
            "https://www.highperformanceformat.com/f26d7d1eb10f9c59c831bce1a130697a/invoke.js"
        scriptInvoke.async = true
        scriptInvoke.id = "adsterra-banner"

        // Append ke container
        const container = document.getElementById("adsterra-container")
        if (container) {
            container.appendChild(scriptOptions)
            container.appendChild(scriptInvoke)
        }
    }, [])

    return (
        <div
            id="adsterra-container"
            className="w-full flex justify-center my-6"
        />
    )
}