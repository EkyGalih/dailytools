import { NextResponse } from "next/server"
import crypto from "crypto"
import { db } from "@/libs/db"

export async function POST(req: Request) {
    const { packageType } = await req.json()

    let days = 1
    if (packageType === "3_days") days = 3
    if (packageType === "7_days") days = 7

    const token = "ML-" + crypto.randomBytes(4).toString("hex").toUpperCase()

    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + days)

    await db.query(
        `INSERT INTO premium_tokens (token, package, expires_at)
     VALUES ($1, $2, $3)`,
        [token, packageType, expiresAt]
    )

    return NextResponse.json({
        token,
        expires_at: expiresAt,
    })
}