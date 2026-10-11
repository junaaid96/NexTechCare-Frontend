"use client";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const variants = {
    primary: "bg-brand text-white hover:brightness-110 shadow-[0_8px_24px_-8px_var(--brand)]",
    secondary: "bg-surface-2 text-fg hover:bg-line",
    outline: "border border-line bg-transparent text-fg hover:bg-surface-2",
    ghost: "text-muted hover:text-fg hover:bg-surface-2",
    danger: "bg-rose-600 text-white hover:bg-rose-500",
    success: "bg-emerald-600 text-white hover:bg-emerald-500",
};
const sizes = { sm: "h-8 px-3 text-sm", md: "h-10 px-4 text-sm", lg: "h-12 px-6 text-base" };

export function Button({ href, variant = "primary", size = "md", loading, className, children, ...props }) {
    const cls = cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
        variants[variant],
        sizes[size],
        className
    );
    if (href)
        return (
            <Link href={href} className={cls} {...props}>
                {children}
            </Link>
        );
    return (
        <button className={cls} disabled={loading || props.disabled} {...props}>
            {loading && <Loader2 className="size-4 animate-spin" />}
            {children}
        </button>
    );
}

export function Card({ className, ...p }) {
    return <div className={cn("card", className)} {...p} />;
}

const tones = {
    zinc: "bg-zinc-500/10 text-zinc-500 dark:text-zinc-400 ring-zinc-500/20",
    sky: "bg-sky-500/10 text-sky-600 dark:text-sky-400 ring-sky-500/20",
    amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-amber-500/20",
    violet: "bg-violet-500/10 text-violet-600 dark:text-violet-400 ring-violet-500/20",
    emerald: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-emerald-500/20",
    rose: "bg-rose-500/10 text-rose-600 dark:text-rose-400 ring-rose-500/20",
    brand: "bg-brand/10 text-brand ring-brand/20",
};
export function Badge({ tone = "zinc", className, ...p }) {
    return (
        <span
            className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset", tones[tone], className)}
            {...p}
        />
    );
}

export function Input({ label, hint, error, className, as = "input", ...p }) {
    const El = as;
    return (
        <label className="block space-y-1.5">
            {label && <span className="text-sm font-medium">{label}</span>}
            <El
                className={cn(
                    "w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm outline-none transition placeholder:text-muted/70 focus:border-brand focus:ring-4 focus:ring-brand/15",
                    as === "textarea" && "min-h-28 resize-y",
                    error && "border-rose-500",
                    className
                )}
                {...p}
            />
            {(hint || error) && <span className={cn("text-xs", error ? "text-rose-500" : "text-muted")}>{error || hint}</span>}
        </label>
    );
}

export function Select({ label, children, className, ...p }) {
    return (
        <label className="block space-y-1.5">
            {label && <span className="text-sm font-medium">{label}</span>}
            <select
                className={cn("w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm outline-none focus:border-brand focus:ring-4 focus:ring-brand/15", className)}
                {...p}
            >
                {children}
            </select>
        </label>
    );
}

export function Skeleton({ className }) {
    return <div className={cn("animate-pulse rounded-xl bg-surface-2", className)} />;
}

export function Empty({ icon: Icon, title, text, action }) {
    return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line px-6 py-14 text-center">
            {Icon && (
                <div className="mb-4 grid size-12 place-items-center rounded-2xl bg-surface-2 text-muted">
                    <Icon className="size-6" />
                </div>
            )}
            <h3 className="font-semibold">{title}</h3>
            {text && <p className="mt-1 max-w-sm text-sm text-muted">{text}</p>}
            {action && <div className="mt-5">{action}</div>}
        </div>
    );
}

export function Avatar({ user, url, size = 36 }) {
    const name = user ? `${user.first_name || ""} ${user.last_name || ""}`.trim() || user.username : "?";
    const init = name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
    if (url)
        // eslint-disable-next-line @next/next/no-img-element
        return <img src={url} alt={name} width={size} height={size} className="rounded-full object-cover" style={{ width: size, height: size }} />;
    return (
        <span
            className="grid shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand to-brand-2 font-semibold text-white"
            style={{ width: size, height: size, fontSize: size * 0.38 }}
            aria-hidden
        >
            {init}
        </span>
    );
}

export function Stars({ value, outOf = 10 }) {
    if (value == null) return <span className="text-xs text-muted">New</span>;
    const five = (value / outOf) * 5;
    return (
        <span className="inline-flex items-center gap-1 text-sm">
            <span className="text-amber-400">{"★".repeat(Math.round(five))}<span className="text-line">{"★".repeat(5 - Math.round(five))}</span></span>
            <span className="font-medium">{five.toFixed(1)}</span>
        </span>
    );
}
