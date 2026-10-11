import { Check, CircleDot, Clock, Wrench, X, Inbox } from "lucide-react";
import { cn, fmtDate } from "@/lib/utils";

const STEPS = [
    { key: "requested", label: "Requested", icon: Inbox },
    { key: "accepted", label: "Accepted", icon: Check },
    { key: "in_progress", label: "In progress", icon: Wrench },
    { key: "resolved", label: "Resolved", icon: CircleDot },
];

export function StatusStepper({ status }) {
    const cancelled = status === "cancelled";
    const idx = STEPS.findIndex((s) => s.key === status);
    return (
        <ol className="flex items-center">
            {STEPS.map((s, i) => {
                const done = !cancelled && i <= idx;
                const current = !cancelled && i === idx;
                return (
                    <li key={s.key} className="flex flex-1 items-center last:flex-none">
                        <div className="flex flex-col items-center gap-1.5">
                            <span
                                className={cn(
                                    "grid size-9 place-items-center rounded-full border-2 transition",
                                    done ? "border-brand bg-brand text-white" : "border-line text-muted",
                                    current && s.key !== "resolved" && "animate-pulse-ring"
                                )}
                            >
                                <s.icon className="size-4" />
                            </span>
                            <span className={cn("text-[11px] font-medium", done ? "text-fg" : "text-muted")}>{s.label}</span>
                        </div>
                        {i < STEPS.length - 1 && <div className={cn("mx-1 mb-5 h-0.5 flex-1 rounded", !cancelled && i < idx ? "bg-brand" : "bg-line")} />}
                    </li>
                );
            })}
            {cancelled && (
                <li className="ml-3 flex flex-col items-center gap-1.5">
                    <span className="grid size-9 place-items-center rounded-full border-2 border-rose-500 bg-rose-500 text-white"><X className="size-4" /></span>
                    <span className="text-[11px] font-medium text-rose-500">Cancelled</span>
                </li>
            )}
        </ol>
    );
}

export function SlaMeter({ booking }) {
    const start = new Date(booking.created_at).getTime();
    const due = new Date(booking.sla_due_at).getTime();
    const end = booking.resolved_at ? new Date(booking.resolved_at).getTime() : Date.now();
    const pct = Math.min(100, Math.max(0, ((end - start) / (due - start)) * 100));
    const left = due - Date.now();
    const done = ["resolved", "cancelled"].includes(booking.status);
    const breached = booking.sla_breached;
    const hrs = Math.abs(left) / 36e5;
    const txt = done
        ? breached ? "Resolved after SLA" : booking.status === "resolved" ? "Resolved within SLA" : "Cancelled"
        : left > 0 ? `${hrs >= 1 ? Math.floor(hrs) + "h " : ""}${Math.round((hrs % 1) * 60)}m left in SLA` : `SLA overdue by ${Math.ceil(hrs)}h`;
    return (
        <div>
            <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className={cn("inline-flex items-center gap-1 font-medium", breached ? "text-rose-500" : done ? "text-emerald-500" : "text-fg")}>
                    <Clock className="size-3.5" /> {txt}
                </span>
                <span className="text-muted">Due {fmtDate(booking.sla_due_at)}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-surface-2">
                <div
                    className={cn("h-full rounded-full transition-all", breached ? "bg-rose-500" : pct > 75 && !done ? "bg-amber-500" : "bg-gradient-to-r from-brand to-brand-2")}
                    style={{ width: `${pct}%` }}
                />
            </div>
        </div>
    );
}

export function EventLog({ events = [] }) {
    return (
        <ol className="relative space-y-5 border-l border-line pl-6">
            {[...events].reverse().map((e) => (
                <li key={e.id} className="relative">
                    <span className="absolute -left-[31px] top-1 size-3 rounded-full border-2 border-bg bg-brand" />
                    <p className="text-sm font-medium capitalize">{e.status.replace("_", " ")}</p>
                    <p className="text-xs text-muted">
                        {e.actor_name} · {fmtDate(e.created_at)}
                    </p>
                    {e.note && <p className="mt-1 rounded-lg bg-surface-2 px-3 py-2 text-sm">{e.note}</p>}
                </li>
            ))}
        </ol>
    );
}
