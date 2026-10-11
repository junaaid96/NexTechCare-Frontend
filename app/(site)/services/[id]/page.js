"use client";
import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft, Clock, Timer, Wifi, MapPin, Sparkles, MessageSquare } from "lucide-react";
import { useFetch } from "@/lib/useFetch";
import { useAuth } from "@/lib/auth";
import { api } from "@/lib/api";
import { categoryOf } from "@/lib/categories";
import { money, fullName, timeAgo } from "@/lib/utils";
import { Avatar, Badge, Button, Card, Input, Select, Skeleton, Stars, Empty } from "@/components/ui";
import { TrustCard } from "@/components/Trust";

export default function ServiceDetail({ params }) {
    const { id } = use(params);
    const { data: s, loading, error } = useFetch(`/services/${id}/`, { auth: false });
    const { data: reviews, reload: reloadReviews } = useFetch(`/reviews/${id}/`, { auth: false });

    if (loading)
        return (
            <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-3">
                <Skeleton className="h-96 lg:col-span-2" />
                <Skeleton className="h-96" />
            </div>
        );
    if (error || !s) return <div className="mx-auto max-w-3xl px-4 py-20"><Empty title="Service not found" text="It may have been removed." action={<Button href="/services">Browse services</Button>} /></div>;

    const cat = categoryOf(s.category);
    return (
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
            <Link href="/services" className="inline-flex items-center gap-1 text-sm text-muted hover:text-fg">
                <ArrowLeft className="size-4" /> All services
            </Link>
            <div className="mt-6 grid gap-6 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2">
                    <Card className="relative overflow-hidden p-8">
                        <div className={`pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b ${cat.hue}`} />
                        <div className="relative">
                            <Badge tone="brand"><cat.icon className="size-3.5" /> {cat.label}</Badge>
                            <h1 className="mt-4 font-display text-3xl font-bold sm:text-4xl">{s.name}</h1>
                            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
                                <Stars value={s.avg_rating} /> <span>{s.review_count} reviews</span>
                                <span className="inline-flex items-center gap-1"><Clock className="size-4" /> ~{s.duration}h job</span>
                                <span className="inline-flex items-center gap-1"><Timer className="size-4" /> {s.sla_hours}h SLA</span>
                                <span className="inline-flex items-center gap-1">{s.is_remote ? <><Wifi className="size-4" /> Remote available</> : <><MapPin className="size-4" /> On-site</>}</span>
                            </div>
                            <p className="mt-6 whitespace-pre-line leading-relaxed">{s.description}</p>
                        </div>
                    </Card>

                    <Card className="p-8">
                        <h2 className="font-display text-xl font-semibold">Your engineer</h2>
                        <div className="mt-5 grid gap-6 sm:grid-cols-2">
                            <div className="flex gap-4">
                                <Avatar user={s.engineer.user} url={s.engineer.avatar_url} size={56} />
                                <div>
                                    <p className="font-semibold">{fullName(s.engineer.user)}</p>
                                    {s.engineer.skills && <p className="mt-1 text-sm text-muted">{s.engineer.skills}</p>}
                                    {s.engineer.experience && <p className="mt-2 text-sm">{s.engineer.experience}</p>}
                                </div>
                            </div>
                            <TrustCard trust={s.trust} />
                        </div>
                    </Card>

                    <Card className="p-8">
                        <h2 className="font-display text-xl font-semibold">Reviews</h2>
                        <ReviewForm serviceId={id} onDone={reloadReviews} />
                        <div className="mt-6 space-y-4">
                            {reviews?.length ? (
                                reviews.map((r) => (
                                    <div key={r.id} className="rounded-xl border border-line p-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">{(r.customer || "Customer").replace(/^Customer - /, "")}</span>
                                            <Stars value={r.rating} />
                                        </div>
                                        <p className="mt-2 text-sm text-muted">{r.comment}</p>
                                        <p className="mt-2 text-xs text-muted">{timeAgo(r.created_at)}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-muted">No reviews yet. Be the first after your job is done.</p>
                            )}
                        </div>
                    </Card>
                </div>

                <div className="lg:sticky lg:top-24 lg:self-start">
                    <BookPanel service={s} />
                </div>
            </div>
        </div>
    );
}

function BookPanel({ service }) {
    const { user, role, ready } = useAuth();
    const router = useRouter();
    const [f, setF] = useState({ issue: "", priority: "normal", preferred_time: "" });
    const [triaged, setTriaged] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        try {
            const t = JSON.parse(sessionStorage.getItem("ntc_triage") || "null");
            if (t) {
                setTriaged(t);
                setF((x) => ({ ...x, issue: t.issue, priority: t.urgency === "critical" ? "critical" : t.urgency === "high" ? "high" : "normal" }));
            }
        } catch {}
    }, []);

    const book = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const b = await api("/bookings/", {
                method: "POST",
                body: {
                    service: service.id,
                    issue: f.issue,
                    priority: f.priority,
                    triage_summary: triaged?.summary || "",
                    preferred_time: f.preferred_time ? new Date(f.preferred_time).toISOString() : null,
                },
            });
            sessionStorage.removeItem("ntc_triage");
            toast.success("Booked! Track it live from your dashboard.");
            router.push(`/dashboard/bookings/${b.id}`);
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="p-6 shadow-[0_30px_70px_-45px_var(--brand)]">
            <div className="flex items-baseline justify-between">
                <span className="font-display text-3xl font-bold">{money(service.price)}</span>
                <span className="text-sm text-muted">fixed price</span>
            </div>
            <p className="mt-1 text-xs text-muted">Resolution target: {service.sla_hours}h from booking</p>
            {!ready ? (
                <Skeleton className="mt-6 h-40" />
            ) : !user ? (
                <div className="mt-6 space-y-3">
                    <Button href={`/login?next=/services/${service.id}`} className="w-full" size="lg">Log in to book</Button>
                    <Button href="/register" variant="outline" className="w-full">Create a free account</Button>
                </div>
            ) : role !== "C" ? (
                <p className="mt-6 rounded-xl bg-surface-2 p-4 text-sm text-muted">Booking is available for customer accounts.</p>
            ) : (
                <form onSubmit={book} className="mt-6 space-y-4">
                    {triaged && (
                        <div className="flex gap-2 rounded-xl bg-brand/10 p-3 text-xs text-brand">
                            <Sparkles className="size-4 shrink-0" /> Your AI triage notes will be shared with the engineer.
                        </div>
                    )}
                    <Input as="textarea" label="What's going on?" required value={f.issue} onChange={(e) => setF({ ...f, issue: e.target.value })} placeholder="Device, error messages, what you've tried" />
                    <div className="grid grid-cols-2 gap-3">
                        <Select label="Priority" value={f.priority} onChange={(e) => setF({ ...f, priority: e.target.value })}>
                            <option value="low">Low</option>
                            <option value="normal">Normal</option>
                            <option value="high">High</option>
                            <option value="critical">Critical</option>
                        </Select>
                        <Input label="Preferred time" type="datetime-local" value={f.preferred_time} onChange={(e) => setF({ ...f, preferred_time: e.target.value })} />
                    </div>
                    <Button type="submit" loading={loading} size="lg" className="w-full">Book now</Button>
                    <p className="text-center text-xs text-muted">Free cancellation until the engineer starts.</p>
                </form>
            )}
        </Card>
    );
}

function ReviewForm({ serviceId, onDone }) {
    const { role } = useAuth();
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(10);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    if (role !== "C") return null;
    if (!open)
        return (
            <Button variant="outline" size="sm" className="mt-4" onClick={() => setOpen(true)}>
                <MessageSquare className="size-4" /> Write a review
            </Button>
        );
    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api(`/reviews/${serviceId}/`, { method: "POST", body: { rating, comment } });
            toast.success("Thanks for the review!");
            setOpen(false);
            setComment("");
            onDone();
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <form onSubmit={submit} className="mt-4 space-y-3 rounded-xl border border-line p-4">
            <div className="flex items-center gap-1" role="radiogroup" aria-label="Rating">
                {[1, 2, 3, 4, 5].map((n) => (
                    <button type="button" key={n} onClick={() => setRating(n * 2)} className={`text-2xl cursor-pointer ${n * 2 <= rating ? "text-amber-400" : "text-line"}`} aria-label={`${n} stars`}>
                        ★
                    </button>
                ))}
            </div>
            <Input as="textarea" required value={comment} onChange={(e) => setComment(e.target.value)} placeholder="How did it go?" />
            <div className="flex gap-2">
                <Button type="submit" size="sm" loading={loading}>Submit</Button>
                <Button type="button" size="sm" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            </div>
        </form>
    );
}
