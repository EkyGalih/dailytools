
import { useEffect, useState } from "react";

interface PremiumStatus {
    premium: boolean;
    packageId?: string;
    expiresAt?: string;
    loading: boolean;
}

export function usePremium(): PremiumStatus {
    const [status, setStatus] = useState<PremiumStatus>({ premium: false, loading: true });

    useEffect(() => {
        const token = localStorage.getItem("premium_token"); // ← sama dengan Navbar
        const deviceId = localStorage.getItem("device_id");

        if (!token || !deviceId) {
            setStatus({ premium: false, loading: false });
            return;
        }

        fetch(`/api/auth/status?token=${token}&deviceId=${deviceId}`)
            .then(r => r.json())
            .then(data => setStatus({ ...data, loading: false }))
            .catch(() => setStatus({ premium: false, loading: false }));
    }, []);

    return status;
}