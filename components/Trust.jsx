import { BadgeCheck, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export function trustTone(score) {
    if (score >= 85) return { label: "Elite", color: "text-emerald-500", ring: "stroke-emerald-500" };
    if (score >= 70) return { label: "Trusted", color: "text-sky-500", ring: "stroke-sky-500" };
    if (score >= 55) return { label: "Rising", color: "text-amber-500", ring: "stroke-amber-500" };
    return { label: "New", color: "text-muted", ring: "stroke-zinc-400" };
}

export function TrustRing({ score = 0, size = 56, stroke = 5 }) {
    const r = (size - stroke) / 2;
    const c = 2 * Math.PI * r;
    const t = trustTone(score);
    return (
        <div className="relative shrink-0" style={{ width: size, height: size }} title={`Trust Score ${score}/100`}>
            <svg width={size} height={size} className="-rotate-90">
                <circle cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} className="fill-none stroke-line" />
                <circle cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} strokeLinecap="round" className={cn("fill-none transition-all duration-700", t.ring)} strokeDasharray={c} strokeDashoffset={c * (1 - score / 100)} />
            </svg>
            <span className="absolute inset-0 grid place-items-center text-sm font-bold">{score}</span>
        </div>
    );
}

export function TrustPill({ trust }) {
    if (!trust) return null;
    const t = trustTone(trust.score);
    return (
        <span className={cn("inline-flex items-center gap-1 rounded-full bg-surface-2 px-2 py-0.5 text-xs font-semibold", t.color)} title="Engineer Trust Score">
            <ShieldCheck className="size-3.5" /> {trust.score} · {t.label}
            {trust.verified && <BadgeCheck className="size-3.5 text-sky-500" aria-label="Verified" />}
        </span>
    );
}

export function TrustCard({ trust, compact }) {
    if (!trust) return null;
    const t = trustTone(trust.score);
    const rows = [
        { k: "Customer rating", v: trust.avg_rating != null ? `${(trust.avg_rating / 2).toFixed(1)} / 5` : "No reviews yet", w: 45 },
        { k: "Completion rate", v: `${trust.completion_rate}%`, w: 25 },
        { k: "Avg. response", v: trust.avg_response_hours != null ? `${trust.avg_response_hours}h` : "No data yet", w: 20 },
        { k: "Identity verified", v: trust.verified ? "Yes" : "Pending", w: 10 },
    ];
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <TrustRing score={trust.score} size={compact ? 52 : 68} />
                <div>
                    <div className="flex items-center gap-2 font-semibold">
                        Trust Score <span className={cn("text-sm", t.color)}>{t.label}</span>
                    </div>
                    <p className="text-xs text-muted">
                        {trust.jobs_completed} jobs completed · {trust.review_count} reviews
                    </p>
                </div>
            </div>
            {!compact && (
                <dl className="grid gap-2 text-sm">
                    {rows.map((r) => (
                        <div key={r.k} className="flex items-center justify-between rounded-lg bg-surface-2 px-3 py-2">
                            <dt className="text-muted">
                                {r.k} <span className="text-[10px] opacity-70">({r.w}%)</span>
                            </dt>
                            <dd className="font-medium">{r.v}</dd>
                        </div>
                    ))}
                </dl>
            )}
        </div>
    );
}
