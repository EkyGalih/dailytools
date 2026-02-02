import { NextResponse } from "next/server"

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const videoId = searchParams.get("videoId")

    if (!videoId) {
        return NextResponse.json(
            { error: "videoId is required" },
            { status: 400 }
        )
    }

    try {
        // ✅ Cached fetch (Revalidate)
        const res = await fetch(
            `https://api.sansekai.my.id/api/melolo/stream?videoId=${videoId}`,
            {
                next: {
                    revalidate: 180, // cache 60 detik
                },
            }
        )

        if (!res.ok) {
            return NextResponse.json(
                { error: "Failed to fetch stream source" },
                { status: 502 }
            )
        }

        const json = await res.json()

        const streamUrl = json?.data?.main_url

        return NextResponse.json({
            url: streamUrl || null,
        })
    } catch (err) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        )
    }
}