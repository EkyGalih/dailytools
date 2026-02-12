import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;

    try {
        // ✅ Backend URL (port 3000)
        const backendUrl = `${process.env.NEXT_PUBLIC_BASE_URL_API}/anime/streaming/${slug}`;

        // ✅ Fetch backend + kirim API Key
        const res = await fetch(backendUrl, {
            headers: {
                "x-api-key": process.env.NEXT_PUBLIC_API_KEY!,
            },
            cache: "no-store",
        });

        const data = await res.json();

        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json(
            {
                message: "error",
                error: "Backend fetch failed",
            },
            { status: 500 }
        );
    }
}