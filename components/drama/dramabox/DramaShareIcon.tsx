'use client'

import {
    FaWhatsapp,
    FaXTwitter,
    FaTelegram,
} from 'react-icons/fa6'
import { LuLink2, LuShare2, LuCheck } from "react-icons/lu"
import { useState } from 'react'

export default function DramaShareIcons({
    title,
    url,
    tags,
}: {
    title: string
    url: string
    tags?: string[]
}) {
    const [copied, setCopied] = useState(false)
    const hashtag = tags?.length ? tags.map(t => `#${t}`).join(' ') : ''
    const encodedUrl = encodeURIComponent(url)
    const encodedText = encodeURIComponent(
        hashtag ? `${title} ${hashtag}` : title
    )

    function copyLink() {
        navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    function nativeShare() {
        if (navigator.share) {
            navigator.share({ title, url }).catch(() => null)
        } else {
            copyLink()
        }
    }

    // Base Style: Squircle design ala Flickreels
    const itemClass = "group relative flex items-center justify-center w-11 h-11 rounded-[1.2rem] transition-all duration-500 hover:-translate-y-1.5 active:scale-90 overflow-hidden"
    const glassClass = "bg-white/5 border border-white/10 backdrop-blur-xl"

    return (
        <div className="flex items-center gap-3 p-2 bg-zinc-900/40 backdrop-blur-2xl rounded-[1.8rem] border border-white/5 shadow-2xl">

            {/* Native Share - The Primary Button */}
            <button
                onClick={nativeShare}
                className={`${itemClass} bg-gradient-to-tr from-indigo-600 to-pink-500 text-white shadow-lg shadow-indigo-500/20`}
                title="Bagikan"
            >
                <LuShare2 size={18} className="relative z-10 transition-transform group-hover:rotate-12" />
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>

            <div className="w-[1px] h-6 bg-white/10 mx-1" />

            {/* WhatsApp */}
            <a
                href={`https://wa.me/?text=${encodedText}%20${encodedUrl}`}
                target="_blank"
                className={`${itemClass} ${glassClass} text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/50`}
                title="WhatsApp"
            >
                <FaWhatsapp size={20} />
            </a>

            {/* X / Twitter */}
            <a
                href={`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`}
                target="_blank"
                className={`${itemClass} ${glassClass} text-white hover:bg-white/10 hover:border-white/30`}
                title="X (Twitter)"
            >
                <FaXTwitter size={18} />
            </a>

            {/* Telegram */}
            <a
                href={`https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`}
                target="_blank"
                className={`${itemClass} ${glassClass} text-sky-400 hover:bg-sky-500/20 hover:border-sky-500/50`}
                title="Telegram"
            >
                <FaTelegram size={20} />
            </a>

            {/* Copy Link dengan Visual Feedback */}
            <button
                onClick={copyLink}
                className={`${itemClass} ${glassClass} transition-all duration-500
                    ${copied ? 'border-emerald-500/50 bg-emerald-500/20 text-emerald-400' : 'text-zinc-400 hover:text-indigo-400 hover:border-indigo-500/50'}`}
                title="Salin Link"
            >
                {copied ? (
                    <LuCheck size={20} className="animate-in zoom-in duration-300" />
                ) : (
                    <LuLink2 size={20} className="transition-transform group-hover:rotate-45" />
                )}

                {/* Animated Background on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
        </div>
    )
}