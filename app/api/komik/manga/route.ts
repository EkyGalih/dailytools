import { NextResponse } from "next/server"

export const runtime = "nodejs"

// ✅ Cache 6 jam
export const revalidate = 21600

export async function GET() {
    try {
        const url =
            "https://api.sansekai.my.id/api/komik/recommended?type=manga"

        const res = await fetch(url, {
            next: { revalidate: 21600 },
        })

        if (!res.ok) {
            return NextResponse.json(
                { message: "error", status: res.status },
                { status: 500 }
            )
        }

        const data = await res.json()

        return NextResponse.json({
            message: "success",
            data: data.data,
            meta: data.meta,
        })
    } catch (err) {
        return NextResponse.json(
            { message: "error", error: String(err) },
            { status: 500 }
        )
    }
}