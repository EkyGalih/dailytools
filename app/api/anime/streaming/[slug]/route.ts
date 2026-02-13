import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(
    _req: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params; // 🔥 WAJIB await

    if (!slug) {
        return NextResponse.json(
            { message: "Slug tidak ada" },
            { status: 400 }
        );
    }

    const backendUrl = `${process.env.NEXT_PUBLIC_BASE_URL_API}/anime/streaming/${slug}`;

    if (!process.env.NEXT_PUBLIC_BASE_URL_API) {
        return NextResponse.json(
            { message: "NEXT_PUBLIC_BASE_URL_API belum diset" },
            { status: 500 }
        );
    }

    const res = await fetch(backendUrl, {
        headers: {
            "x-api-key": process.env.API_KEY!,
        },
        cache: "no-store",
    });

    const data = await res.json();

    return NextResponse.json(data);
}