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

  const linked = tokenData.devices.find(d => d.deviceId === deviceId);
  if (!linked) return Response.json({ premium: false });

  return Response.json({
    premium: true,
    packageId: tokenData.packageId,
    expiresAt: tokenData.expiryDate,
  });
}