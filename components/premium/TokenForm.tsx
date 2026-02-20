"use client";

import { useState } from "react";

interface Props {
    onSuccess: () => void;
}

export default function TokenForm({ onSuccess }: Props) {
    const [tokenCode, setTokenCode] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleRedeem() {
        if (!tokenCode.trim()) return;
        setLoading(true);
        setError("");

        let deviceId = localStorage.getItem("device_id");
        if (!deviceId) {
            deviceId = crypto.randomUUID();
            localStorage.setItem("device_id", deviceId);
        }

        const res = await fetch("/api/redeem", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: tokenCode.trim(), deviceId }),
        });

        const data = await res.json();
        setLoading(false);

        if (!res.ok) {
            setError(data.error);
            return;
        }

        localStorage.setItem("premium_token", tokenCode.trim());
        localStorage.setItem("premium_expires", data.expiresAt);
        window.dispatchEvent(new Event("premium_updated"));
        onSuccess();
    }

    return (
        <div className="space-y-4">
            <input
                type="text"
                placeholder="Masukkan token kamu..."
                value={tokenCode}
                onChange={e => setTokenCode(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 text-white text-sm focus:outline-none focus:border-rose-600 transition-colors"
            />

            {error && (
                <p className="text-rose-500 text-xs font-bold">{error}</p>
            )}

            <button
                onClick={handleRedeem}
                disabled={loading || !tokenCode.trim()}
                className="w-full bg-rose-600 hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black uppercase tracking-widest text-xs py-4 rounded-2xl transition-colors"
            >
                {loading ? "Memproses..." : "Redeem Token"}
            </button>
        </div>
    );
}