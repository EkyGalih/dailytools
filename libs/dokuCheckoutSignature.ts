// @/libs/dokuCheckoutSignature.ts
import crypto from "crypto";

export function generateCheckoutSignature(
    clientId: string,
    requestId: string,
    requestTimestamp: string,
    requestTarget: string,
    secretKey: string,
    body: any // Tambahkan parameter body
) {
    // 1. Buat Digest dari Body
    const bodyString = JSON.stringify(body);
    const digest = crypto
        .createHash("sha256")
        .update(bodyString, "utf8")
        .digest("base64");

    // 2. Susun Komponen sesuai standar DOKU
    const component =
        `Client-Id:${clientId}\n` +
        `Request-Id:${requestId}\n` +
        `Request-Timestamp:${requestTimestamp}\n` +
        `Request-Target:${requestTarget}\n` +
        `Digest:${digest}`; // Digest harus masuk di sini

    const signature = crypto
        .createHmac("sha256", secretKey)
        .update(component)
        .digest("base64");

    return `HMACSHA256=${signature}`;
}