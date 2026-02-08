"use client";

export default function PayButton() {
    const pay = async () => {
        const res = await fetch("/api/pay", { method: "POST" });
        const data = await res.json();

        if (!data?.response?.payment?.url) {
            console.error("INVALID RESPONSE:", data);
            alert("Response DOKU tidak valid");
            return;
        }

        window.location.href = data.response.payment.url;
    };

    return (
        <button
            onClick={pay}
            className="px-4 py-2 bg-black text-white rounded"
        >
            Bayar Sekarang
        </button>
    );
}