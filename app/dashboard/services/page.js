"use client";
import Link from "next/link";
import { toast } from "sonner";
import { Pencil, Trash2, Wrench } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useFetch } from "@/lib/useFetch";
import { api } from "@/lib/api";
import { categoryOf } from "@/lib/categories";
import { money } from "@/lib/utils";
import { PageHeader } from "@/components/dash";
import { Badge, Button, Card, Empty, Skeleton, Stars } from "@/components/ui";

export default function MyServices() {
    const { user } = useAuth();
    const { data, loading, reload } = useFetch(user ? `/services/?engineer=${encodeURIComponent(user.username)}` : null);
    const del = async (s) => {
        if (!confirm(`Delete "${s.name}"? This cannot be undone.`)) return;
        try {
            await api(`/services/${s.id}/`, { method: "DELETE" });
            toast.success("Service deleted");
            reload();
        } catch (err) {
            toast.error(err.message);
        }
    };
    return (
        <>
            <PageHeader title="My services" subtitle="New services go live after an admin approves them." action={<Button href="/dashboard/services/new">New service</Button>} />
            {loading ? <Skeleton className="h-48" /> : data?.length ? (
                <div className="grid gap-4 md:grid-cols-2">
                    {data.map((s) => {
                        const cat = categoryOf(s.category);
                        return (
                            <Card key={s.id} className="p-5">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                        <div className="flex flex-wrap gap-2">
                                            <Badge tone="brand"><cat.icon className="size-3.5" /> {cat.label}</Badge>
                                            {s.admin_approved ? <Badge tone="emerald">Live</Badge> : <Badge tone="amber">Pending approval</Badge>}
                                        </div>
                                        <Link href={`/services/${s.id}`} className="mt-3 block truncate font-semibold hover:text-brand">{s.name}</Link>
                                        <p className="mt-1 line-clamp-2 text-sm text-muted">{s.description}</p>
                                    </div>
                                    <p className="font-display text-xl font-bold">{money(s.price)}</p>
                                </div>
                                <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
                                    <span className="text-xs text-muted"><Stars value={s.avg_rating} /> · {s.customer?.length || 0} customers</span>
                                    <div className="flex gap-1">
                                        <Button href={`/dashboard/services/${s.id}/edit`} size="sm" variant="ghost" aria-label="Edit"><Pencil className="size-4" /></Button>
                                        <Button size="sm" variant="ghost" onClick={() => del(s)} aria-label="Delete" className="hover:text-rose-500"><Trash2 className="size-4" /></Button>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            ) : (
                <Empty icon={Wrench} title="No services yet" text="Create your first service. Triage sends matching customers straight to it." action={<Button href="/dashboard/services/new">Create service</Button>} />
            )}
        </>
    );
}
