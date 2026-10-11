"use client";
import { useState } from "react";
import { CalendarClock } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useFetch } from "@/lib/useFetch";
import { PageHeader, BookingRow } from "@/components/dash";
import { Card, Empty, Skeleton, Button } from "@/components/ui";
import { cn, STATUS } from "@/lib/utils";

export default function Bookings() {
    const { role } = useAuth();
    const [filter, setFilter] = useState("");
    const { data, loading } = useFetch("/bookings/", { interval: 30000 });
    const list = (data || []).filter((b) => !filter || b.status === filter);
    const title = role === "E" ? "Job queue" : role === "A" ? "All bookings" : "My bookings";
    return (
        <>
            <PageHeader title={title} subtitle="Updates refresh automatically every 30 seconds." action={role === "C" && <Button href="/services">Book a service</Button>} />
            <div className="mb-4 flex flex-wrap gap-2">
                {[["", "All"], ...Object.entries(STATUS).map(([k, v]) => [k, v.label])].map(([k, l]) => (
                    <button key={k} onClick={() => setFilter(k)} className={cn("rounded-full border px-3 py-1.5 text-xs font-medium cursor-pointer", filter === k ? "border-brand bg-brand text-white" : "border-line hover:border-brand/40")}>
                        {l} {k && data ? <span className="opacity-70">{data.filter((b) => b.status === k).length}</span> : null}
                    </button>
                ))}
            </div>
            <Card className="overflow-hidden">
                {loading ? <Skeleton className="m-5 h-40" /> : list.length ? (
                    <div className="divide-y divide-line">{list.map((b) => <BookingRow key={b.id} b={b} showCustomer={role !== "C"} showEngineer={role === "C"} />)}</div>
                ) : (
                    <div className="p-5"><Empty icon={CalendarClock} title="Nothing here" text="No bookings match this filter." /></div>
                )}
            </Card>
        </>
    );
}
