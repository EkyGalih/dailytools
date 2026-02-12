export async function apiFetch(
    url: string,
    options?: {
        revalidate?: number
        noStore?: boolean
    }
) {
    return fetch(url, {
        headers: {
            accept: "application/json",
            "User-Agent": "tamanto-client/1.0",
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY!,
        },
        ...(options?.noStore
            ? { cache: "no-store" }
            : { next: { revalidate: options?.revalidate ?? 60 } }),
    });
}