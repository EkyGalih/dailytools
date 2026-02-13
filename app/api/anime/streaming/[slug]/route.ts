import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    context: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await context.params; // ✅ WAJIB await

        const res = await fetch(
            `https://api.sansekai.my.id/api/anime/getvideo?chapterUrlId=${slug}&reso=720p`,
            { cache: "no-store" }
        );

        if (!res.ok) {
            return NextResponse.json(
                { error: "Gagal mengambil video" },
                { status: 500 }
            );
        }

        const text = await res.text();

        if (!text) {
            return NextResponse.json(
                { error: "Response kosong dari API" },
                { status: 500 }
            );
        }

        const data = JSON.parse(text);

        return NextResponse.json(data);
    } catch (error) {
        console.error("STREAM ROUTE ERROR:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}