'use client'

import {
    FaWhatsapp,
    FaFacebook,
    FaXTwitter,
    FaTelegram,
    FaLink,
    FaShareNodes,
} from 'react-icons/fa6'
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

    // Base Style untuk Button/Link
    const itemClass = "group relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 hover:-translate-y-1 active:scale-90"
    const iconClass = "transition-transform duration-300 group-hover:scale-110"

    return (
        <div className="flex items-center gap-3 p-1.5 bg-white/40 backdrop-blur-md rounded-2xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">

            {/* Native Share */}
            <button
                onClick={nativeShare}
                className={`${itemClass} bg-zinc-900 text-white hover:shadow-lg hover:shadow-zinc-200`}
                title="Bagikan"
            >
                <FaShareNodes size={14} className={iconClass} />
            </button>

            <div className="w-[1px] h-6 bg-zinc-200/60 mx-1" /> {/* Divider */}

            {/* WhatsApp */}
            <a
                href={`https://wa.me/?text=${encodedText}%20${encodedUrl}`}
                target="_blank"
                className={`${itemClass} text-green-600 hover:bg-green-50`}
                title="WhatsApp"
            >
                <FaWhatsapp size={18} className={iconClass} />
            </a>

            {/* Facebook */}
            <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                target="_blank"
                className={`${itemClass} text-blue-600 hover:bg-blue-50`}
                title="Facebook"
            >
                <FaFacebook size={18} className={iconClass} />
            </a>

            {/* X / Twitter */}
            <a
                href={`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`}
                target="_blank"
                className={`${itemClass} text-zinc-800 hover:bg-zinc-50`}
                title="X (Twitter)"
            >
                <FaXTwitter size={16} className={iconClass} />
            </a>

            {/* Telegram */}
            <a
                href={`https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`}
                target="_blank"
                className={`${itemClass} text-sky-500 hover:bg-sky-50`}
                title="Telegram"
            >
                <FaTelegram size={18} className={iconClass} />
            </a>

            {/* Copy Link dengan Feedback */}
            <button
                onClick={copyLink}
                className={`${itemClass} ${copied ? 'bg-green-500 text-white' : 'text-zinc-500 hover:bg-zinc-50'}`}
                title="Salin Link"
            >
                {copied ? (
                    <span className="text-[10px] font-bold uppercase tracking-tighter">Copied</span>
                ) : (
                    <FaLink size={16} className={iconClass} />
                )}

                {/* Tooltip sederhana */}
                {!copied && (
                    <span className="absolute -top-10 scale-0 group-hover:scale-100 transition-all bg-zinc-800 text-white text-[10px] py-1 px-2 rounded-md">
                        Copy
                    </span>
                )}
            </button>
        </div>
    )
}