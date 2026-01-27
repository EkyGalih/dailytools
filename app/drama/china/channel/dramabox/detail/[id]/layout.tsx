import Script from 'next/script'

export default function DetailLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            {/* ✅ MONETAG HANYA DI DETAIL */}
            <Script
                id="monetag-inpage-push"
                strategy="beforeInteractive"
                dangerouslySetInnerHTML={{
                    __html: `(function(s){
            s.dataset.zone='10524194',
            s.src='https://nap5k.com/tag.min.js'
          })(document.head.appendChild(document.createElement('script')))`
                }}
            />

            <Script
                id="monetag-vignette"
                strategy="beforeInteractive"
                dangerouslySetInnerHTML={{
                    __html: `(function(s){
            s.dataset.zone='10524198',
            s.src='https://gizokraijaw.net/vignette.min.js'
          })(document.head.appendChild(document.createElement('script')))`
                }}
            />

            {children}
        </>
    )
}