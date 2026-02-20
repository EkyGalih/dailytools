export const dynamic = "force-dynamic";

import prisma from "@/libs/prisma";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const { token, deviceId }: { token: string; deviceId: string } = await req.json();

    if (!token || !deviceId) {
        return Response.json({ error: "token dan deviceId wajib" }, { status: 400 });
    }

    const tokenData = await prisma.token.findUnique({
        where: { code: token },
    });

    if (!tokenData) {
        return Response.json({ error: "Token tidak valid" }, { status: 404 });
    }

    await prisma.device.deleteMany({
        where: { tokenId: tokenData.id, deviceId },
    });

    return Response.json({ success: true });
}