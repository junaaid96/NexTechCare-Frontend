"use client";
import { Activity as Icon } from "lucide-react";
import { useFetch } from "@/lib/useFetch";
import { timeAgo } from "@/lib/utils";
import { PageHeader } from "@/components/dash";
import { Card, Empty, Skeleton } from "@/components/ui";

export default function ActivityPage() {
    const { data, loading } = useFetch("/activities/", { interval: 30000 });
    return (
        <>
            <PageHeader title="Activity" subtitle="Everything happening on the platform, newest first." />
            {loading ? <Skeleton className="h-96" /> : !data?.length ? <Empty icon={Icon} title="No activity yet" /> : (
                <Card className="p-6">
                    <ol className="relative space-y-4 border-l border-line pl-6">
                        {data.slice(0, 100).map((a) => (
                            <li key={a.id} className="relative">
                                <span className="absolute -left-[29px] top-1.5 size-2.5 rounded-full bg-brand" />
                                <p className="text-sm first-letter:uppercase">{a.name}</p>
                                <p className="text-xs text-muted">{timeAgo(a.created_at)}</p>
                            </li>
                        ))}
                    </ol>
                </Card>
            )}
        </>
    );
}
