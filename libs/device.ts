export function getDeviceId() {
    if (typeof window === "undefined") return "server"
    const key = "device_id"
    let id = localStorage.getItem(key)
    if (!id) {
        id = crypto.randomUUID()
        localStorage.setItem(key, id)
    }
    return id
}