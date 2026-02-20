import prisma from "@/libs/prisma";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const { token, deviceId }: { token: string; deviceId: string } = await req.json();

    if (!token || !deviceId) {
        return Response.json({ error: "token dan deviceId wajib" }, { status: 400 });
    }

    const tokenData = await prisma.token.findUnique({
        where: { code: token },
        include: { devices: true },
    });

    if (!tokenData) {
        return Response.json({ error: "Token tidak valid" }, { status: 404 });
    }

    if (new Date() > tokenData.expiryDate) {
        return Response.json({ error: "Token sudah kedaluwarsa" }, { status: 403 });
    }

    const alreadyLinked = tokenData.devices.find(d => d.deviceId === deviceId);

    if (!alreadyLinked && tokenData.devices.length >= 2) {
        return Response.json({ error: "Token sudah digunakan di 2 perangkat" }, { status: 403 });
    }

    if (!alreadyLinked) {
        await prisma.device.create({
            data: { deviceId, tokenId: tokenData.id },
        });
    }

    return Response.json({
        success: true,
        packageId: tokenData.packageId,
        expiresAt: tokenData.expiryDate,
    });
}