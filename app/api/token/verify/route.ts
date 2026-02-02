import { db } from "@/libs/db"
import { NextResponse } from "next/server"


export async function POST(req: Request) {
    const { token } = await req.json()

    const found = await db.query(
        `SELECT * FROM premium_tokens WHERE token=$1`,
        [token]
    )

    if (found.rows.length === 0) {
        return NextResponse.json({ premium: false })
    }

    const data = found.rows[0]

    const expired = new Date(data.expires_at) < new Date()

    return NextResponse.json({
        premium: !expired,
        expires_at: data.expires_at,
    })
}