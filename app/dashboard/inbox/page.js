"use client";
import { useState } from "react";
import { Inbox as InboxIcon, Mail } from "lucide-react";
import { useFetch } from "@/lib/useFetch";
import { timeAgo, cn, fmtDate } from "@/lib/utils";
import { PageHeader } from "@/components/dash";
import { Card, Empty, Skeleton, Button } from "@/components/ui";

export default function Inbox() {
    const { data, loading } = useFetch("/contacts/");
    const [cur, setCur] = useState(0);
    const list = data || [];
    const m = list[cur];
    return (
        <>
            <PageHeader title="Inbox" subtitle="Messages from the public contact form." />
            {loading ? <Skeleton className="h-96" /> : !list.length ? <Empty icon={InboxIcon} title="Inbox zero" text="No messages yet." /> : (
                <Card className="grid overflow-hidden md:grid-cols-5" style={{ minHeight: 480 }}>
                    <ul className="max-h-[560px] divide-y divide-line overflow-y-auto border-b border-line md:col-span-2 md:border-b-0 md:border-r">
                        {list.map((x, i) => (
                            <li key={x.id}>
                                <button onClick={() => setCur(i)} className={cn("w-full px-4 py-3 text-left transition cursor-pointer", i === cur ? "bg-brand/10" : "hover:bg-surface-2")}>
                                    <div className="flex justify-between gap-2"><span className="truncate text-sm font-medium">{x.name}</span><span className="shrink-0 text-xs text-muted">{timeAgo(x.created_at)}</span></div>
                                    <p className="truncate text-sm">{x.subject}</p>
                                    <p className="truncate text-xs text-muted">{x.message}</p>
                                </button>
                            </li>
                        ))}
                    </ul>
                    {m && (
                        <div className="p-6 md:col-span-3">
                            <h2 className="font-display text-xl font-semibold">{m.subject}</h2>
                            <p className="mt-1 text-sm text-muted">{m.name} · {m.email} · {fmtDate(m.created_at)}</p>
                            <p className="mt-6 whitespace-pre-line text-sm leading-relaxed">{m.message}</p>
                            <Button href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject)}`} className="mt-6" variant="outline"><Mail className="size-4" /> Reply by email</Button>
                        </div>
                    )}
                </Card>
            )}
        </>
    );
}
