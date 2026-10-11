"use client";
import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, SearchX, SlidersHorizontal } from "lucide-react";
import { useFetch } from "@/lib/useFetch";
import { CATEGORIES } from "@/lib/categories";
import ServiceCard from "@/components/ServiceCard";
import { Skeleton, Empty, Button } from "@/components/ui";
import { cn } from "@/lib/utils";

const SORTS = {
    trust: { label: "Trust Score", fn: (a, b) => (b.trust?.score || 0) - (a.trust?.score || 0) },
    rating: { label: "Rating", fn: (a, b) => (b.avg_rating || 0) - (a.avg_rating || 0) },
    price_asc: { label: "Price: low to high", fn: (a, b) => a.price - b.price },
    price_desc: { label: "Price: high to low", fn: (a, b) => b.price - a.price },
    sla: { label: "Fastest SLA", fn: (a, b) => a.sla_hours - b.sla_hours },
};

export default function Catalog() {
    const params = useSearchParams();
    const router = useRouter();
    const category = params.get("category") || "";
    const [q, setQ] = useState(params.get("q") || "");
    const [sort, setSort] = useState("trust");
    const [remote, setRemote] = useState(false);
    const { data, loading, error, reload } = useFetch("/services/?admin_approved=True", { auth: false });

    const counts = useMemo(() => {
        const c = {};
        (data || []).forEach((s) => (c[s.category] = (c[s.category] || 0) + 1));
        return c;
    }, [data]);

    const items = useMemo(() => {
        const t = q.trim().toLowerCase();
        return (data || [])
            .filter((s) => !category || s.category === category)
            .filter((s) => !remote || s.is_remote)
            .filter((s) => !t || `${s.name} ${s.description} ${s.engineer?.user?.first_name} ${s.engineer?.user?.last_name}`.toLowerCase().includes(t))
            .sort(SORTS[sort].fn);
    }, [data, category, q, sort, remote]);

    const setCat = (k) => router.replace(k ? `/services?category=${k}` : "/services", { scroll: false });

    return (
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
            <div className="flex flex-col gap-2">
                <h1 className="font-display text-4xl font-bold">Find the right expert</h1>
                <p className="text-muted">{data ? `${data.length} services from verified engineers` : "Loading the catalog…"}</p>
            </div>

            <div className="sticky top-16 z-30 -mx-4 mt-6 border-b border-line bg-bg/85 px-4 py-3 backdrop-blur-xl sm:mx-0 sm:rounded-2xl sm:border sm:px-3">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                    <label className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
                        <input
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder="Search services or engineers"
                            className="h-10 w-full rounded-xl border border-line bg-surface pl-9 pr-3 text-sm outline-none focus:border-brand focus:ring-4 focus:ring-brand/15"
                        />
                    </label>
                    <div className="flex items-center gap-2">
                        <SlidersHorizontal className="size-4 text-muted" />
                        <select value={sort} onChange={(e) => setSort(e.target.value)} className="h-10 rounded-xl border border-line bg-surface px-3 text-sm" aria-label="Sort">
                            {Object.entries(SORTS).map(([k, v]) => (
                                <option key={k} value={k}>{v.label}</option>
                            ))}
                        </select>
                        <label className="flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-line bg-surface px-3 text-sm">
                            <input type="checkbox" checked={remote} onChange={(e) => setRemote(e.target.checked)} className="accent-[var(--brand)]" /> Remote
                        </label>
                    </div>
                </div>
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
                    <Chip active={!category} onClick={() => setCat("")}>All</Chip>
                    {CATEGORIES.map((c) => (
                        <Chip key={c.key} active={category === c.key} onClick={() => setCat(c.key)}>
                            <c.icon className="size-3.5" /> {c.label}
                            {counts[c.key] ? <span className="text-muted">{counts[c.key]}</span> : null}
                        </Chip>
                    ))}
                </div>
            </div>

            <div className="mt-8">
                {error ? (
                    <Empty title="Couldn't load services" text={error.message} action={<Button onClick={() => reload()}>Retry</Button>} />
                ) : loading ? (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{[...Array(6)].map((_, i) => <Skeleton key={i} className="h-72" />)}</div>
                ) : items.length ? (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{items.map((s) => <ServiceCard key={s.id} service={s} />)}</div>
                ) : (
                    <Empty
                        icon={SearchX}
                        title="No services here yet"
                        text="Try another category, or describe your problem and let AI triage point you in the right direction."
                        action={<Button href="/#triage">Try AI triage</Button>}
                    />
                )}
            </div>
        </div>
    );
}

function Chip({ active, children, ...p }) {
    return (
        <button
            className={cn(
                "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition cursor-pointer",
                active ? "border-brand bg-brand text-white" : "border-line bg-surface text-fg hover:border-brand/40"
            )}
            {...p}
        >
            {children}
        </button>
    );
}
