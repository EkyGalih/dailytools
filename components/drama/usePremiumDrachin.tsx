import { useEffect, useState } from "react";
import { getDeviceId } from "@/libs/device";

export function usePremiumDracinStatus() {
    const [premium, setPremium] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("premium_token");
        const deviceId = getDeviceId();

        if (!token) {
            setPremium(false);
            setLoading(false);
            return;
        }

        fetch(
            `https://api-payment-tamanto.vercel.app/auth/status?token=${token}&deviceId=${deviceId}`
        )
            .then(r => r.json())
            .then(j => {
                setPremium(j.premium === true);
            })
            .finally(() => setLoading(false));
    }, []);

    return { premium, loading };
}