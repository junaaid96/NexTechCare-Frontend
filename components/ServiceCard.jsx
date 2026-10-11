import Link from "next/link";
import { Clock, Timer, Wifi } from "lucide-react";
import { categoryOf } from "@/lib/categories";
import { money, fullName } from "@/lib/utils";
import { Avatar, Stars } from "./ui";
import { TrustPill } from "./Trust";

export default function ServiceCard({ service, highlight }) {
    const cat = categoryOf(service.category);
    const Icon = cat.icon;
    const eng = service.engineer;
    return (
        <Link
            href={`/services/${service.id}`}
            className="card group relative flex flex-col overflow-hidden p-5 transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-[0_18px_40px_-24px_var(--brand)]"
        >
            <div className={`pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${cat.hue} opacity-60`} />
            <div className="relative flex items-start justify-between gap-3">
                <span className={`grid size-10 place-items-center rounded-xl bg-surface-2 ${cat.hue.split(" ").pop()}`}>
                    <Icon className="size-5" />
                </span>
                {service.is_demo && !highlight && <span className="rounded-full border border-dashed border-line px-2 py-0.5 text-[11px] font-medium text-muted">Demo</span>}
                {highlight && <span className="rounded-full bg-brand px-2 py-0.5 text-[11px] font-semibold text-white">Best match</span>}
            </div>
            <p className="relative mt-4 text-xs font-medium uppercase tracking-wider text-muted">{cat.label}</p>
            <h3 className="relative mt-1 line-clamp-1 font-display text-lg font-semibold group-hover:text-brand">{service.name}</h3>
            <p className="relative mt-1.5 line-clamp-2 text-sm text-muted">{service.description}</p>
            <div className="h-4" />
            <div className="relative mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
                <span className="inline-flex items-center gap-1"><Clock className="size-3.5" /> {service.duration}h job</span>
                <span className="inline-flex items-center gap-1"><Timer className="size-3.5" /> {service.sla_hours}h SLA</span>
                {service.is_remote && <span className="inline-flex items-center gap-1"><Wifi className="size-3.5" /> Remote</span>}
                <span className="ml-auto"><Stars value={service.avg_rating} /></span>
            </div>
            <div className="relative mt-auto flex items-center justify-between gap-3 border-t border-line pt-4">
                <div className="flex min-w-0 items-center gap-2">
                    <Avatar user={eng?.user} url={eng?.avatar_url} size={30} />
                    <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{fullName(eng?.user)}</p>
                        <TrustPill trust={service.trust} />
                    </div>
                </div>
                <p className="shrink-0 font-display text-xl font-bold">{money(service.price)}</p>
            </div>
        </Link>
    );
}
