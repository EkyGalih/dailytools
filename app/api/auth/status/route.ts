export const dynamic = "force-dynamic";

import prisma from "@/libs/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const token = req.nextUrl.searchParams.get("token");
    const deviceId = req.nextUrl.searchParams.get("deviceId");
    if (!token || !deviceId) {
        return Response.json({ premium: false });
    }

    const tokenData = await prisma.token.findUnique({
        where: { code: token },
        include: { devices: true },
    });

    if (!tokenData || new Date() > tokenData.expiryDate) {
        return Response.json({ premium: false });
    }

    const alreadyLinked = tokenData.devices.find((d: { deviceId: string; id: string; tokenId: string }) => d.deviceId === deviceId);

    if (!alreadyLinked && tokenData.devices.length >= 2) {
        return Response.json({
            error: "Token sudah digunakan di 2 perangkat. Logout dari salah satu device dulu."
        }, { status: 403 });
    }

    // Baru lanjut daftarkan device
    if (!alreadyLinked) {
        await prisma.device.create({
            data: { deviceId, tokenId: tokenData.id },
        });
    }

    return Response.json({
        premium: true,
        packageId: tokenData.packageId,
        expiresAt: tokenData.expiryDate,
        deviceCount: tokenData.devices.length,
    });
}