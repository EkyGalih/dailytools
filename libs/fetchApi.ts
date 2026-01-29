export async function apiFetch(url: string, revalidate = 60) {
    return fetch(url, {
        headers: {
            "x-api-key": process.env.API_KEY!,
        },
        next: { revalidate },
    });
}