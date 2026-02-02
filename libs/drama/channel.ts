export type DramaChannelSlug =
    | 'dramabox'
    | 'reelshort'
    | 'netshort'
    | 'melolo'
    | 'flickreels'
    | 'freereels'

export const DRAMA_CHANNELS: Array<{
    slug: DramaChannelSlug
    name: string
    description: string
    icon: string
}> = [
        {
            slug: 'dramabox',
            name: 'DramaBox',
            description: 'Drama China viral dan trending dari DramaBox.',
            icon: 'https://pnghdpro.com/wp-content/themes/pnghdpro/download/social-media-and-brands/dramabox-logo-icon-hd.png',
        },
        {
            slug: 'reelshort',
            name: 'ReelShort',
            description: 'Drama China pendek populer dari ReelShort.',
            icon: 'https://cdn.aptoide.com/imgs/7/7/8/778d6297e5e50c6d57fd830979071692_icon.png',
        },
        // {
        //     slug: 'netshort',
        //     name: 'NetShort',
        //     description: 'Koleksi drama China short episode dari NetShort.',
        //     icon: 'https://p16-images-comn-sg.tokopedia-static.net/tos-alisg-i-zr7vqa5nfb-sg/img/elTgOa/2025/3/24/24905721-97bb-4201-a2bc-f985f41b4cdf.png~tplv-zr7vqa5nfb-image.image',
        // },
        {
            slug: 'melolo',
            name: 'Melolo',
            description: 'Drama China terbaru dari platform Melolo.',
            icon: 'https://res09.bignox.com/appcenter/en/gp-game-image/97e7dad4488c9965c815b8b355b654ef',
        },
        {
            slug: 'flickreels',
            name: 'FlickReels',
            description: 'Drama China viral dan episode lengkap dari FlickReels.',
            icon: 'https://cdn.aptoide.com/imgs/7/3/6/7366b6348805d4ed9e82005732d1213f_icon.png',
        },
        // {
        //     slug: 'freereels',
        //     name: 'FreeReels',
        //     description: 'Drama China gratis dan trending dari FreeReels.',
        //     icon: 'https://play-lh.googleusercontent.com/4UD1HiZkmoTR3nzr5Z8qPvKzi7K1JptSmHPZtJ7MN7hi5WE8fNxHumvhRFHZS0r1SQ=w600-h300-pc0xffffff-pd',
        // },
    ]

export function getChannel(slug?: string) {
    return (
        DRAMA_CHANNELS.find((c) => c.slug === slug) ??
        DRAMA_CHANNELS.find((c) => c.slug === 'dramabox')!
    )
}