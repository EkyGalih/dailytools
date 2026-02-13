import { NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"

export async function GET(req: NextRequest) {
    const q = req.nextUrl.searchParams.get("q")
    const page = req.nextUrl.searchParams.get("page") || "1"

    if (!q) {
        return NextResponse.json(
            { message: "error", error: "Query wajib ada" },
            { status: 400 }
        )
    }

    const backendUrl = `${process.env.NEXT_PUBLIC_BASE_URL_API}/anime/search?q=${encodeURIComponent(
        q
    )}&page=${page}`

    try {
        const res = await fetch(backendUrl, {
            headers: {
                "x-api-key": process.env.API_KEY!,
            },
        })

        const data = await res.json()
        return NextResponse.json(data)
    } catch (err) {
        return NextResponse.json(
            { message: "error", error: "Backend fetch failed" },
            { status: 500 }
        )
    }
}