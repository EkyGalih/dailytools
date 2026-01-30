import { NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = params

    const tag = req.nextUrl.searchParams.get("tag")

    if (!tag) {
        return NextResponse.json(
            { message: "error", error: "tag wajib ada" },
            { status: 400 }
        )
    }

    // 🔥 Forward ke backend asli (port 3000 / vercel API)
    const backendUrl = `${process.env.NEXT_PUBLIC_BASE_URL_API}/drakorkita/episode/${id}?tag=${encodeURIComponent(tag)}`

    const res = await fetch(backendUrl, {
        headers: {
            "x-api-key": process.env.API_KEY!,
        },
    })

    const data = await res.json()

    return NextResponse.json(data)
}