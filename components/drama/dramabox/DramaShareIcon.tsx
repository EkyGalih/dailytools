'use client'

import {
    FaWhatsapp,
    FaFacebook,
    FaXTwitter,
    FaTelegram,
    FaLink,
    FaShareNodes,
} from 'react-icons/fa6'

export default function DramaShareIcons({
    title,
    url,
}: {
    title: string
    url: string
}) {
    const encodedUrl = encodeURIComponent(url)
    const encodedText = encodeURIComponent(title)

    function copyLink() {
        navigator.clipboard.writeText(url)
        alert('Link berhasil disalin')
    }

    function nativeShare() {
        if (navigator.share) {
            navigator.share({ title, url })
        } else {
            copyLink()
        }
    }

    return (
        <div className="flex items-center gap-2">
            {/* Native Share (TikTok, IG, dll via system share) */}
            <button
                onClick={nativeShare}
                title="Bagikan"
                className="rounded-full border p-2 hover:bg-gray-100"
            >
                <FaShareNodes size={16} />
            </button>

            {/* WhatsApp */}
            <a
                href={`https://wa.me/?text=${encodedText}%20${encodedUrl}`}
                target="_blank"
                title="WhatsApp"
                className="rounded-full border p-2 hover:bg-green-50 text-green-600"
            >
                <FaWhatsapp size={16} />
            </a>

            {/* Facebook */}
            <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                target="_blank"
                title="Facebook"
                className="rounded-full border p-2 hover:bg-blue-50 text-blue-600"
            >
                <FaFacebook size={16} />
            </a>

            {/* X / Twitter */}
            <a
                href={`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`}
                target="_blank"
                title="X (Twitter)"
                className="rounded-full border p-2 hover:bg-gray-100"
            >
                <FaXTwitter size={16} />
            </a>

            {/* Telegram */}
            <a
                href={`https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`}
                target="_blank"
                title="Telegram"
                className="rounded-full border p-2 hover:bg-sky-50 text-sky-600"
            >
                <FaTelegram size={16} />
            </a>

            {/* Copy Link */}
            <button
                onClick={copyLink}
                title="Salin Link"
                className="rounded-full border p-2 hover:bg-gray-100"
            >
                <FaLink size={16} />
            </button>
        </div>
    )
}