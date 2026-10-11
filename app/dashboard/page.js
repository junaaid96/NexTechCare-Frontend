"use client";
import Link from "next/link";
import { AlertTriangle, CalendarClock, CheckCheck, Clock, Gauge, ShieldCheck, Sparkles, Star, Users, Wrench, Hourglass, ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useFetch } from "@/lib/useFetch";
import { PageHeader, Stat, BookingRow } from "@/components/dash";
import { Button, Card, Empty, Skeleton, Badge } from "@/components/ui";
import { AreaChart, BarList } from "@/components/Charts";
import { TrustCard, TrustRing } from "@/components/Trust";
import Triage from "@/components/Triage";

export default function Overview() {
    const { role, user } = useAuth();
    const hello = `Hi ${user?.first_name || user?.username || "there"}`;
    if (role === "A") return <AdminOverview hello={hello} />;
    if (role === "E") return <EngineerOverview hello={hello} />;
    return <CustomerOverview hello={hello} />;
}

const OPEN = ["requested", "accepted", "in_progress"];

function CustomerOverview({ hello }) {
    const { data, loading } = useFetch("/bookings/", { interval: 30000 });
    const open = (data || []).filter((b) => OPEN.includes(b.status));
    const toReview = (data || []).filter((b) => b.status === "resolved").slice(0, 3);
    return (
        <>
            <PageHeader title={hello} subtitle="Here's what's happening with your tech support." action={<Button href="/services">Book a service</Button>} />
            <div className="grid gap-4 sm:grid-cols-3">
                <Stat label="Open requests" value={loading ? "…" : open.length} icon={CalendarClock} />
                <Stat label="Resolved" value={loading ? "…" : (data || []).filter((b) => b.status === "resolved").length} icon={CheckCheck} tone="emerald" />
                <Stat label="SLA breaches" value={loading ? "…" : (data || []).filter((b) => b.sla_breached).length} icon={AlertTriangle} tone="rose" hint="We flag these to admins automatically" />
            </div>
            {toReview.length > 0 && (
                <Card className="mt-6 border-amber-500/30 p-5">
                    <p className="flex items-center gap-2 font-semibold"><Star className="size-4 text-amber-500" /> Pending actions</p>
                    <ul className="mt-3 space-y-2 text-sm">
                        {toReview.map((b) => (
                            <li key={b.id} className="flex items-center justify-between gap-3">
                                <span>Rate your experience with <b>{b.service_name}</b></span>
                                <Button href={`/services/${b.service}`} size="sm" variant="outline">Review</Button>
                            </li>
                        ))}
                    </ul>
                </Card>
            )}
            <Card className="mt-6 overflow-hidden">
                <div className="flex items-center justify-between border-b border-line px-5 py-4">
                    <h2 className="font-semibold">Open requests</h2>
                    <Link href="/dashboard/bookings" className="text-sm text-brand hover:underline">View all</Link>
                </div>
                {loading ? <Skeleton className="m-5 h-24" /> : open.length ? (
                    <div className="divide-y divide-line">{open.map((b) => <BookingRow key={b.id} b={b} showEngineer />)}</div>
                ) : (
                    <div className="p-5"><Empty icon={CalendarClock} title="No open requests" text="When you book a service, you'll track it live here." /></div>
                )}
            </Card>
            <div className="mt-8">
                <h2 className="mb-3 flex items-center gap-2 font-semibold"><Sparkles className="size-4 text-brand" /> Something new broke?</h2>
                <Triage compact />
            </div>
        </>
    );
}

function EngineerOverview({ hello }) {
    const { profile } = useAuth();
    const { data, loading } = useFetch("/bookings/", { interval: 30000 });
    const { data: trust } = useFetch(profile?.id ? `/bookings/engineers/${profile.id}/trust/` : null, { auth: false });
    const list = data || [];
    const newReq = list.filter((b) => b.status === "requested");
    const active = list.filter((b) => ["accepted", "in_progress"].includes(b.status));
    return (
        <>
            <PageHeader title={hello} subtitle="Your queue, SLA risk and Trust Score at a glance." action={<Button href="/dashboard/services/new">New service</Button>} />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Stat label="New requests" value={loading ? "…" : newReq.length} icon={Hourglass} tone="amber" hint="Accept quickly to boost your score" />
                <Stat label="In progress" value={loading ? "…" : active.length} icon={Wrench} />
                <Stat label="Completed" value={loading ? "…" : list.filter((b) => b.status === "resolved").length} icon={CheckCheck} tone="emerald" />
                <Stat label="SLA at risk" value={loading ? "…" : list.filter((b) => b.sla_breached && OPEN.includes(b.status)).length} icon={AlertTriangle} tone="rose" />
            </div>
            <div className="mt-6 grid gap-6 lg:grid-cols-3">
                <Card className="overflow-hidden lg:col-span-2">
                    <div className="flex items-center justify-between border-b border-line px-5 py-4">
                        <h2 className="font-semibold">Needs your attention</h2>
                        <Link href="/dashboard/bookings" className="text-sm text-brand hover:underline">Full queue</Link>
                    </div>
                    {loading ? <Skeleton className="m-5 h-24" /> : [...newReq, ...active].length ? (
                        <div className="divide-y divide-line">{[...newReq, ...active].slice(0, 6).map((b) => <BookingRow key={b.id} b={b} showCustomer />)}</div>
                    ) : (
                        <div className="p-5"><Empty icon={CalendarClock} title="Queue is clear" text="New bookings appear here in real time." /></div>
                    )}
                </Card>
                <Card className="p-6">
                    {trust ? <TrustCard trust={trust} /> : <Skeleton className="h-48" />}
                    <p className="mt-4 text-xs text-muted">Customers see this score on every service you list. Get verified by an admin for +10 points.</p>
                </Card>
            </div>
        </>
    );
}

function AdminOverview({ hello }) {
    const { data, loading } = useFetch("/bookings/stats/", { interval: 60000 });
    if (loading || !data)
        return (
            <>
                <PageHeader title={hello} subtitle="Platform health" />
                <div className="grid gap-4 sm:grid-cols-4">{[0, 1, 2, 3].map((i) => <Skeleton key={i} className="h-28" />)}</div>
            </>
        );
    const k = data.kpis;
    return (
        <>
            <PageHeader title={hello} subtitle="Platform health and what needs a decision." action={k.pending_approvals ? <Button href="/dashboard/approvals">{k.pending_approvals} pending approvals <ArrowRight className="size-4" /></Button> : null} />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Stat label="Open bookings" value={k.open_bookings} icon={CalendarClock} />
                <Stat label="SLA breaches" value={k.sla_breaches} icon={AlertTriangle} tone="rose" hint="Open bookings past due" />
                <Stat label="Avg. resolution" value={k.avg_resolution_hours != null ? `${k.avg_resolution_hours}h` : "—"} icon={Clock} tone="emerald" />
                <Stat label="Avg. rating" value={k.avg_rating ? `${(k.avg_rating / 2).toFixed(1)}★` : "—"} icon={Star} tone="amber" hint={`${k.customers} customers · ${k.engineers} engineers`} />
            </div>
            <div className="mt-6 grid gap-6 lg:grid-cols-3">
                <Card className="p-6 lg:col-span-2">
                    <div className="flex items-center justify-between">
                        <h2 className="font-semibold">Bookings, last 14 days</h2>
                        <Badge tone="brand"><Gauge className="size-3.5" /> {data.trend.reduce((a, d) => a + d.bookings, 0)} total</Badge>
                    </div>
                    <div className="mt-4"><AreaChart data={data.trend.map((d) => ({ label: d.date, value: d.bookings }))} /></div>
                </Card>
                <Card className="p-6">
                    <h2 className="mb-4 font-semibold">Demand by category</h2>
                    <BarList items={data.by_category.filter((c) => c.count).sort((a, b) => b.count - a.count).slice(0, 6).map((c) => ({ label: c.label, value: c.count }))} />
                    {!data.by_category.some((c) => c.count) && <p className="text-sm text-muted">No bookings yet.</p>}
                </Card>
            </div>
            <Card className="mt-6 overflow-hidden">
                <div className="flex items-center justify-between border-b border-line px-5 py-4">
                    <h2 className="flex items-center gap-2 font-semibold"><ShieldCheck className="size-4 text-brand" /> Engineer leaderboard & workload</h2>
                    <Link href="/dashboard/users" className="text-sm text-brand hover:underline">Manage</Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="text-left text-xs uppercase tracking-wider text-muted">
                            <tr><th className="px-5 py-3">Engineer</th><th className="px-5 py-3">Trust</th><th className="px-5 py-3">Completed</th><th className="px-5 py-3">Response</th><th className="px-5 py-3">Open load</th></tr>
                        </thead>
                        <tbody className="divide-y divide-line">
                            {data.engineers.map((e) => (
                                <tr key={e.id}>
                                    <td className="px-5 py-3 font-medium">{e.name} {e.verified && <ShieldCheck className="inline size-4 text-sky-500" />}</td>
                                    <td className="px-5 py-3"><TrustRing score={e.score} size={36} stroke={4} /></td>
                                    <td className="px-5 py-3 tabular-nums">{e.jobs_completed}</td>
                                    <td className="px-5 py-3 tabular-nums">{e.avg_response_hours != null ? `${e.avg_response_hours}h` : "—"}</td>
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-2">
                                            <div className="h-2 w-24 rounded-full bg-surface-2"><div className={`h-full rounded-full ${e.open > 4 ? "bg-rose-500" : e.open > 2 ? "bg-amber-500" : "bg-emerald-500"}`} style={{ width: `${Math.min(100, e.open * 20)}%` }} /></div>
                                            <span className="tabular-nums text-muted">{e.open}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Card className="flex items-center justify-between p-5"><span className="flex items-center gap-2 text-sm"><Users className="size-4 text-brand" /> {k.customers} customers, {k.engineers} engineers</span><Button href="/dashboard/users" size="sm" variant="outline">Users</Button></Card>
                <Card className="flex items-center justify-between p-5"><span className="flex items-center gap-2 text-sm"><CheckCheck className="size-4 text-brand" /> {k.pending_approvals} services awaiting review</span><Button href="/dashboard/approvals" size="sm" variant="outline">Review</Button></Card>
            </div>
        </>
    );
}
