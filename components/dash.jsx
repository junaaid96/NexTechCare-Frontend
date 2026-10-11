"use client";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Badge, Card } from "./ui";
import { STATUS, timeAgo, cn } from "@/lib/utils";
import { categoryOf } from "@/lib/categories";

export function PageHeader({ title, subtitle, action }) {
    return (
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
                <h1 className="font-display text-2xl font-bold sm:text-3xl">{title}</h1>
                {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
            </div>
            {action}
        </div>
    );
}

export function Stat({ label, value, icon: Icon, hint, tone = "brand" }) {
    const tones = { brand: "text-brand bg-brand/10", rose: "text-rose-500 bg-rose-500/10", amber: "text-amber-500 bg-amber-500/10", emerald: "text-emerald-500 bg-emerald-500/10" };
    return (
        <Card className="p-5">
            <div className="flex items-center justify-between">
                <p className="text-sm text-muted">{label}</p>
                {Icon && <span className={cn("grid size-8 place-items-center rounded-lg", tones[tone])}><Icon className="size-4" /></span>}
            </div>
            <p className="mt-3 font-display text-3xl font-bold tabular-nums">{value ?? "—"}</p>
            {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
        </Card>
    );
}

export function StatusBadge({ status }) {
    const s = STATUS[status] || STATUS.requested;
    return <Badge tone={s.tone}>{s.label}</Badge>;
}

export function BookingRow({ b, showCustomer, showEngineer }) {
    const cat = categoryOf(b.service_category);
    return (
        <Link href={`/dashboard/bookings/${b.id}`} className="flex items-center gap-4 px-5 py-4 transition hover:bg-surface-2">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-surface-2 text-brand"><cat.icon className="size-5" /></span>
            <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{b.service_name}</p>
                <p className="truncate text-xs text-muted">
                    #{b.id} · {showCustomer ? b.customer_name : showEngineer ? b.engineer_name : cat.label} · {timeAgo(b.created_at)}
                </p>
            </div>
            {b.sla_breached && <Badge tone="rose">SLA breached</Badge>}
            {b.priority !== "normal" && <Badge tone={b.priority === "critical" ? "rose" : b.priority === "high" ? "amber" : "zinc"} className="hidden sm:inline-flex">{b.priority}</Badge>}
            <StatusBadge status={b.status} />
            <ChevronRight className="size-4 text-muted" />
        </Link>
    );
}
