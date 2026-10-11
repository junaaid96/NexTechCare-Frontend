"use client";
import { useState } from "react";
import { toast } from "sonner";
import { CheckCheck, X } from "lucide-react";
import { useFetch } from "@/lib/useFetch";
import { api } from "@/lib/api";
import { categoryOf } from "@/lib/categories";
import { money, fullName } from "@/lib/utils";
import { PageHeader } from "@/components/dash";
import { Badge, Button, Card, Empty, Skeleton } from "@/components/ui";
import { TrustPill } from "@/components/Trust";

export default function Approvals() {
    const { data, loading, reload } = useFetch("/services/?admin_approved=False");
    const [sel, setSel] = useState([]);
    const [busy, setBusy] = useState(false);
    const toggle = (id) => setSel((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
    const approve = async (ids) => {
        setBusy(true);
        try {
            const r = await api("/services/approved/bulk/", { method: "POST", body: { ids } });
            toast.success(`${r.approved} service(s) approved`);
            setSel([]);
            reload();
        } catch (e) {
            toast.error(e.message);
        } finally {
            setBusy(false);
        }
    };
    const reject = async (s) => {
        if (!confirm(`Reject and remove "${s.name}"?`)) return;
        try {
            await api(`/services/rejected/${s.id}/`, { method: "POST" });
            toast.success("Service rejected");
            reload();
        } catch (e) {
            toast.error(e.message);
        }
    };
    const list = data || [];
    return (
        <>
            <PageHeader
                title="Approvals"
                subtitle="Review services submitted by engineers before they go live."
                action={list.length > 0 && (
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => setSel(sel.length === list.length ? [] : list.map((s) => s.id))}>{sel.length === list.length ? "Clear" : "Select all"}</Button>
                        <Button disabled={!sel.length} loading={busy} onClick={() => approve(sel)}><CheckCheck className="size-4" /> Approve {sel.length || ""}</Button>
                    </div>
                )}
            />
            {loading ? <Skeleton className="h-48" /> : list.length ? (
                <div className="space-y-3">
                    {list.map((s) => {
                        const cat = categoryOf(s.category);
                        return (
                            <Card key={s.id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
                                <input type="checkbox" checked={sel.includes(s.id)} onChange={() => toggle(s.id)} className="size-4 accent-[var(--brand)]" aria-label={`Select ${s.name}`} />
                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <p className="font-semibold">{s.name}</p>
                                        <Badge tone="brand"><cat.icon className="size-3.5" /> {cat.label}</Badge>
                                        <span className="text-sm font-medium">{money(s.price)}</span>
                                        <span className="text-xs text-muted">{s.sla_hours}h SLA</span>
                                    </div>
                                    <p className="mt-1 line-clamp-2 text-sm text-muted">{s.description}</p>
                                    <p className="mt-2 flex items-center gap-2 text-xs text-muted">by {fullName(s.engineer.user)} <TrustPill trust={s.trust} /></p>
                                </div>
                                <div className="flex gap-2">
                                    <Button size="sm" variant="success" onClick={() => approve([s.id])}><CheckCheck className="size-4" /> Approve</Button>
                                    <Button size="sm" variant="outline" onClick={() => reject(s)}><X className="size-4" /> Reject</Button>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            ) : (
                <Empty icon={CheckCheck} title="All caught up" text="No services waiting for review." />
            )}
        </>
    );
}
