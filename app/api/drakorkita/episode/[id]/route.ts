import { NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params

    const tag = req.nextUrl.searchParams.get("tag")

    if (!tag) {
        return NextResponse.json(
            { message: "error", error: "tag wajib ada" },
            { status: 400 }
        )
    }

    // ✅ Backend URL (port 3000 / vercel backend)
    const backendUrl = `${process.env.NEXT_PUBLIC_BASE_URL_API}/drakorkita/episode/${id}?tag=${encodeURIComponent(
        tag
    )}`

    try {
        const res = await fetch(backendUrl, {
            headers: {
                "x-api-key": process.env.NEXT_PUBLIC_API_KEY!,
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