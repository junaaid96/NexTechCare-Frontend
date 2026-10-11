// Single source of truth for the API base URL.
// Local: .env.local -> NEXT_PUBLIC_API_URL=http://localhost:8000
// Netlify: Site env var NEXT_PUBLIC_API_URL=https://nextechcare-backend.vercel.app
const FALLBACK =
    process.env.NODE_ENV === "production"
        ? "https://nextechcare-backend.vercel.app"
        : "http://localhost:8000";

export const API_BASE = (process.env.NEXT_PUBLIC_API_URL || FALLBACK).replace(/\/+$/, "");

export class ApiError extends Error {
    constructor(message, status, data) {
        super(message);
        this.status = status;
        this.data = data;
    }
}

function flattenError(data) {
    if (!data) return "Something went wrong";
    if (typeof data === "string") return data;
    if (data.error) return data.error;
    if (data.detail) return data.detail;
    const parts = Object.entries(data).map(([k, v]) =>
        `${k === "non_field_errors" ? "" : k.replace(/_/g, " ") + ": "}${Array.isArray(v) ? v.join(" ") : v}`
    );
    return parts.join(" · ") || "Something went wrong";
}

export function getToken() {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("ntc_access");
}

export async function api(path, { method = "GET", body, auth = true, signal } = {}) {
    const headers = { Accept: "application/json" };
    if (body !== undefined) headers["Content-Type"] = "application/json";
    const token = auth ? getToken() : null;
    if (token) headers.Authorization = `Bearer ${token}`;
    let res;
    try {
        res = await fetch(`${API_BASE}${path}`, {
            method,
            headers,
            body: body !== undefined ? JSON.stringify(body) : undefined,
            signal,
        });
    } catch (e) {
        if (e.name === "AbortError") throw e;
        throw new ApiError("Can't reach the server. Check your connection and try again.", 0);
    }
    const text = await res.text();
    let data = null;
    try {
        data = text ? JSON.parse(text) : null;
    } catch {
        data = text;
    }
    if (res.status === 401 && token && typeof window !== "undefined") {
        localStorage.removeItem("ntc_access");
        localStorage.removeItem("ntc_refresh");
        window.dispatchEvent(new Event("ntc:logout"));
    }
    if (!res.ok) throw new ApiError(flattenError(data), res.status, data);
    return data;
}
