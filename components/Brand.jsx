import Link from "next/link";
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

/** CodeJBorg credit, same pattern as other CodeJBorg projects: "Developed by <CodeJBorg />". */
export function CodeJBorgCredit({ className }) {
    return (
        <a
            href={CODEJBORG_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Developed by CodeJBorg — visit developer website"
            className={cn(
                "group inline-flex shrink-0 items-center gap-2 rounded-full border border-line bg-surface/60 py-1.5 pr-3 pl-1.5 font-mono text-[11px] tracking-wide text-muted transition-colors duration-300 hover:border-muted hover:bg-surface hover:text-fg",
                className
            )}
        >
            <span className="flex size-6 items-center justify-center rounded-full bg-brand text-white">
                <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m18 16 4-4-4-4" /><path d="m6 8-4 4 4 4" /><path d="m14.5 4-5 16" /></svg>
            </span>
            <span>Developed by</span>
            <span className="font-semibold text-fg">
                <span className="text-brand">&lt;</span>CodeJBorg<span className="text-brand"> /&gt;</span>
            </span>
            <span aria-hidden="true" className="inline-block h-3.5 w-[2px] bg-brand motion-safe:animate-pulse" />
            <svg className="size-3.5 opacity-40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>
        </a>
    );
}
