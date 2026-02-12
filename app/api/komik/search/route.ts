import { headers } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const q = searchParams.get("q")

    if (!q) {
        return NextResponse.json({ datas: [] })
    }

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL_API}/komik/search?q=${encodeURIComponent(q)}`,
            {
                headers: {
                    "x-api-key": process.env.NEXT_PUBLIC_API_KEY as string,
                },
                cache: "no-store"
            }
        )

        const data = await res.json()

        return NextResponse.json(data)
    } catch (err) {
        return NextResponse.json({ datas: [] })
    }
}