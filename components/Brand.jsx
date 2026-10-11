import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const CODEJBORG_URL = "https://junaidul.pro.bd/codejborg";

export function LogoMark({ className }) {
    return (
        <svg viewBox="0 0 32 32" className={cn("size-8", className)} aria-hidden>
            <defs>
                <linearGradient id="ntc-g" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="var(--brand)" />
                    <stop offset="1" stopColor="var(--brand-2)" />
                </linearGradient>
            </defs>
            <rect width="32" height="32" rx="9" fill="url(#ntc-g)" />
            <path d="M10 22V10l12 12V10" stroke="#fff" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="22" cy="10" r="2.2" fill="#fff" />
            <circle cx="10" cy="22" r="2.2" fill="#fff" />
        </svg>
    );
}

export function Logo({ className }) {
    return (
        <Link href="/" className={cn("flex items-center gap-2.5 font-display text-lg font-bold tracking-tight", className)} aria-label="NexTechCare home">
            <LogoMark />
            <span>
                NexTech<span className="text-gradient">Care</span>
            </span>
        </Link>
    );
}

/** CodeJBorg credit. variant: "footer" | "sidebar" | "inline" */
export function CodeJBorgCredit({ variant = "inline", className }) {
    if (variant === "sidebar")
        return (
            <a
                href={CODEJBORG_URL}
                target="_blank"
                rel="noopener"
                className={cn(
                    "group flex items-center gap-2.5 rounded-xl border border-borg/20 bg-borg/5 p-2.5 transition hover:border-borg/40 hover:bg-borg/10",
                    className
                )}
            >
                <Image src="/codejborg-mark.png" alt="" width={28} height={28} className="rounded-md" />
                <span className="leading-tight">
                    <span className="block text-[10px] uppercase tracking-wider text-muted">Crafted by</span>
                    <span className="block text-sm font-semibold">
                        Code<span className="text-borg">J</span>Borg
                    </span>
                </span>
            </a>
        );
    return (
        <a
            href={CODEJBORG_URL}
            target="_blank"
            rel="noopener"
            className={cn("inline-flex items-center gap-1.5 text-sm text-muted transition hover:text-fg", className)}
        >
            <span>{variant === "footer" ? "Designed & engineered by" : "Crafted by"}</span>
            <Image src="/codejborg-mark.png" alt="" width={18} height={18} className="rounded" />
            <span className="font-semibold text-fg">
                Code<span className="text-borg">J</span>Borg
            </span>
        </a>
    );
}
