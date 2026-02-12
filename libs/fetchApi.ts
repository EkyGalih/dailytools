export async function apiFetch(url: string, revalidate = 60) {
    return fetch(url, {
        headers: {
            accept: "application/json",
            "User-Agent": "mytools-Komik/1.0",
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY!,
        },

        next: { revalidate },
    });
}