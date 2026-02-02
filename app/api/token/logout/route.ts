import { db } from "@/libs/db"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const { token, deviceId } = await req.json()

        if (!token || !deviceId) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Token dan deviceId wajib",
                },
                { status: 400 }
            )
        }

        // ✅ Hapus session aktif device ini
        await db.query(
            `DELETE FROM token_sessions 
       WHERE token=$1 AND device_id=$2`,
            [token, deviceId]
        )

        return NextResponse.json({
            success: true,
            message: "Logout berhasil, session dihapus",
        })
    } catch (err) {
        console.error("Logout error:", err)

        return NextResponse.json(
            {
                success: false,
                error: "Server error",
            },
            { status: 500 }
        )
    }
}