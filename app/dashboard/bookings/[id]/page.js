"use client";
import { use, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowLeft, Sparkles, User, Wrench, Calendar } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useFetch } from "@/lib/useFetch";
import { api } from "@/lib/api";
import { categoryOf } from "@/lib/categories";
import { fmtDate } from "@/lib/utils";
import { Badge, Button, Card, Input, Skeleton, Empty } from "@/components/ui";
import { StatusBadge } from "@/components/dash";
import { StatusStepper, SlaMeter, EventLog } from "@/components/Timeline";

const ACTIONS = {
    E: { requested: [["accepted", "Accept job", "primary"], ["cancelled", "Decline", "outline"]], accepted: [["in_progress", "Start work", "primary"], ["cancelled", "Cancel", "outline"]], in_progress: [["resolved", "Mark resolved", "success"]] },
    C: { requested: [["cancelled", "Cancel booking", "outline"]], accepted: [["cancelled", "Cancel booking", "outline"]] },
    A: { requested: [["accepted", "Accept", "primary"], ["cancelled", "Cancel", "outline"]], accepted: [["in_progress", "Start", "primary"], ["cancelled", "Cancel", "outline"]], in_progress: [["resolved", "Resolve", "success"], ["cancelled", "Cancel", "outline"]] },
};

export default function BookingTracker({ params }) {
    const { id } = use(params);
    const { role } = useAuth();
    const { data: b, loading, error, setData } = useFetch(`/bookings/${id}/`, { interval: 20000 });
    const [note, setNote] = useState("");
    const [busy, setBusy] = useState("");

    if (loading) return <Skeleton className="h-96" />;
    if (error || !b) return <Empty title="Booking not found" text={error?.message} action={<Button href="/dashboard/bookings">Back</Button>} />;

    const cat = categoryOf(b.service_category);
    const actions = ACTIONS[role]?.[b.status] || [];
    const move = async (status) => {
        setBusy(status);
        try {
            const r = await api(`/bookings/${id}/status/`, { method: "POST", body: { status, note } });
            setData(r);
            setNote("");
            toast.success(`Booking ${status.replace("_", " ")}`);
        } catch (err) {
            toast.error(err.message);
        } finally {
            setBusy("");
        }
    };

    return (
        <>
            <Link href="/dashboard/bookings" className="inline-flex items-center gap-1 text-sm text-muted hover:text-fg"><ArrowLeft className="size-4" /> Bookings</Link>
            <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
                <div>
                    <p className="text-sm text-muted">Booking #{b.id}</p>
                    <h1 className="font-display text-2xl font-bold sm:text-3xl">{b.service_name}</h1>
                    <div className="mt-2 flex flex-wrap gap-2">
                        <Badge tone="brand"><cat.icon className="size-3.5" /> {cat.label}</Badge>
                        <StatusBadge status={b.status} />
                        <Badge tone={b.priority === "critical" ? "rose" : b.priority === "high" ? "amber" : "zinc"}>{b.priority} priority</Badge>
                    </div>
                </div>
                {role === "C" && b.status === "resolved" && <Button href={`/services/${b.service}`} variant="outline">Leave a review</Button>}
            </div>

            <Card className="mt-6 space-y-6 p-6 sm:p-8">
                <StatusStepper status={b.status} />
                <SlaMeter booking={b} />
            </Card>

            <div className="mt-6 grid gap-6 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2">
                    <Card className="p-6">
                        <h2 className="font-semibold">Issue</h2>
                        <p className="mt-2 whitespace-pre-line text-sm">{b.issue || "No details provided."}</p>
                        {b.triage_summary && (
                            <div className="mt-4 flex gap-2 rounded-xl bg-brand/10 p-3 text-sm">
                                <Sparkles className="mt-0.5 size-4 shrink-0 text-brand" />
                                <span><b className="text-brand">AI triage:</b> {b.triage_summary}</span>
                            </div>
                        )}
                    </Card>
                    {actions.length > 0 && (
                        <Card className="space-y-4 p-6">
                            <h2 className="font-semibold">Update status</h2>
                            <Input as="textarea" placeholder="Add a note for the timeline (optional)" value={note} onChange={(e) => setNote(e.target.value)} className="min-h-20" />
                            <div className="flex flex-wrap gap-2">
                                {actions.map(([st, label, v]) => (
                                    <Button key={st} variant={v} loading={busy === st} onClick={() => move(st)}>{label}</Button>
                                ))}
                            </div>
                        </Card>
                    )}
                    <Card className="p-6">
                        <h2 className="mb-5 font-semibold">Timeline</h2>
                        <EventLog events={b.events} />
                    </Card>
                </div>
                <Card className="h-fit space-y-4 p-6 text-sm">
                    <Row icon={User} k="Customer" v={b.customer_name} />
                    <Row icon={Wrench} k="Engineer" v={b.engineer_name} />
                    <Row icon={Calendar} k="Booked" v={fmtDate(b.created_at)} />
                    <Row icon={Calendar} k="Preferred time" v={fmtDate(b.preferred_time)} />
                    <Row icon={Calendar} k="Accepted" v={fmtDate(b.accepted_at)} />
                    <Row icon={Calendar} k="Resolved" v={fmtDate(b.resolved_at)} />
                </Card>
            </div>
        </>
    );
}

function Row({ icon: I, k, v }) {
    return (
        <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-2 text-muted"><I className="size-4" /> {k}</span>
            <span className="text-right font-medium">{v}</span>
        </div>
    );
}
