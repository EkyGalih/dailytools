export default function SchemaMarkup({
    data,
    type = 'TVSeries',
    category // Gunakan prop category untuk menentukan struktur URL
}: {
    data: any,
    type?: 'Movie' | 'TVSeries' | 'Book',
    category?: 'drama-china' | 'drama-korea' | 'anime' | 'manga' | 'manhwa' | 'manhua' | 'reelshort' | 'flickreels'
}) {
    const siteUrl = 'https://tamanto.web.id';
    let canonicalUrl = siteUrl;

    // Logika penentuan URL berdasarkan kategori di Tamanto
    switch (category) {
        case 'anime':
            canonicalUrl = `${siteUrl}/anime/${data.endpoint}`;
            break;
        case 'drama-korea':
            canonicalUrl = `${siteUrl}/drama/korea/detail/${data.id || data.endpoint}`;
            break;
        case 'manga':
        case 'manhwa':
        case 'manhua':
            canonicalUrl = `${siteUrl}/komik/${category}/${data.id || data.endpoint}`;
            break;
        case 'reelshort':
        case 'flickreels':
            canonicalUrl = `${siteUrl}/drama/china/channel/${category}/detail/${data.id || data.bookId}`;
            break;
        default:
            // Fallback untuk Drama China / Lainnya
            canonicalUrl = `${siteUrl}/drama/china/detail/${data.id || data.bookId}`;
    }

    const schema = {
        "@context": "https://schema.org",
        "@type": type === 'Book' ? 'VisualArtwork' : type, // VisualArtwork lebih cocok untuk Komik/Manga
        "name": data.title || data.bookName || data.series_title || data.name,
        "description": data.synopsis || data.introduction || data.series_intro || data.description,
        "image": data.thumbnail || data.cover || data.coverWap || data.series_cover || `${siteUrl}/og-fallback.jpg`,
        "url": canonicalUrl,
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": data.score || data.rating || "8.5",
            "bestRating": "10",
            "worstRating": "1",
            "ratingCount": "100"
        },
        "genre": data.genres?.map((g: any) => g.title || g.name).join(', ') || "Entertainment",
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}