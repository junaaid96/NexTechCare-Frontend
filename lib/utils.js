import { clsx } from "clsx";

export const cn = (...a) => clsx(...a);

export const money = (v) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Number(v || 0));

export const fullName = (u) => (u ? `${u.first_name || ""} ${u.last_name || ""}`.trim() || u.username : "");

export const initials = (u) => {
    const n = fullName(u) || "?";
    return n.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
};

export function timeAgo(date) {
    if (!date) return "";
    const s = Math.round((Date.now() - new Date(date).getTime()) / 1000);
    const abs = Math.abs(s);
    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
    const units = [["year", 31536000], ["month", 2592000], ["day", 86400], ["hour", 3600], ["minute", 60]];
    for (const [u, sec] of units) if (abs >= sec) return rtf.format(-Math.round(s / sec), u);
    return "just now";
}

export const fmtDate = (d) =>
    d ? new Date(d).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }) : "—";

export const STATUS = {
    requested: { label: "Requested", tone: "amber" },
    accepted: { label: "Accepted", tone: "sky" },
    in_progress: { label: "In progress", tone: "violet" },
    resolved: { label: "Resolved", tone: "emerald" },
    cancelled: { label: "Cancelled", tone: "zinc" },
};

export const roleName = { A: "Admin", C: "Customer", E: "Engineer" };
