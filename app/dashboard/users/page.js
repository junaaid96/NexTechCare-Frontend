"use client";
import { useState } from "react";
import { toast } from "sonner";
import { BadgeCheck, Search } from "lucide-react";
import { useFetch } from "@/lib/useFetch";
import { api } from "@/lib/api";
import { fullName, cn } from "@/lib/utils";
import { PageHeader } from "@/components/dash";
import { Avatar, Badge, Button, Card, Skeleton } from "@/components/ui";

export default function UsersPage() {
    const [tab, setTab] = useState("engineers");
    const [q, setQ] = useState("");
    const eng = useFetch("/profiles/engineers/");
    const cus = useFetch("/profiles/customers/");
    const src = tab === "engineers" ? eng : cus;
    const list = (src.data || []).filter((p) => `${fullName(p.user)} ${p.user.email} ${p.user.username}`.toLowerCase().includes(q.toLowerCase()));

    const verify = async (p) => {
        try {
            const r = await api(`/profiles/engineers/${p.id}/verify/`, { method: "POST" });
            toast.success(r.verified ? "Engineer verified" : "Verification removed");
            eng.reload(true);
        } catch (e) {
            toast.error(e.message);
        }
    };

    return (
        <>
            <PageHeader title="Users" subtitle="Verify engineers to give customers extra confidence." />
            <div className="mb-4 flex flex-wrap items-center gap-3">
                <div className="flex rounded-xl border border-line p-1">
                    {[["engineers", `Engineers ${eng.data?.length ?? ""}`], ["customers", `Customers ${cus.data?.length ?? ""}`]].map(([k, l]) => (
                        <button key={k} onClick={() => setTab(k)} className={cn("rounded-lg px-3 py-1.5 text-sm cursor-pointer", tab === k ? "bg-brand text-white" : "text-muted")}>{l}</button>
                    ))}
                </div>
                <label className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
                    <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name or email" className="h-10 w-full rounded-xl border border-line bg-surface pl-9 pr-3 text-sm outline-none focus:border-brand" />
                </label>
            </div>
            <Card className="overflow-x-auto">
                {src.loading ? <Skeleton className="m-5 h-40" /> : (
                    <table className="w-full text-sm">
                        <thead className="text-left text-xs uppercase tracking-wider text-muted">
                            <tr><th className="px-5 py-3">Name</th><th className="px-5 py-3">Contact</th><th className="px-5 py-3">{tab === "engineers" ? "Skills" : "Occupation"}</th><th className="px-5 py-3" /></tr>
                        </thead>
                        <tbody className="divide-y divide-line">
                            {list.map((p) => (
                                <tr key={p.id}>
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-3">
                                            <Avatar user={p.user} url={p.avatar_url} size={32} />
                                            <div>
                                                <p className="font-medium">{fullName(p.user)} {p.verified && <BadgeCheck className="inline size-4 text-sky-500" />}</p>
                                                <p className="text-xs text-muted">@{p.user.username}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3 text-muted">{p.user.email}<br />{p.phone}</td>
                                    <td className="px-5 py-3 text-muted">{(tab === "engineers" ? p.skills : p.occupation) || "—"}</td>
                                    <td className="px-5 py-3 text-right">
                                        {tab === "engineers" ? (
                                            <Button size="sm" variant={p.verified ? "outline" : "primary"} onClick={() => verify(p)}>{p.verified ? "Unverify" : "Verify"}</Button>
                                        ) : <Badge>{p.user.is_active ? "Active" : "Inactive"}</Badge>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </Card>
        </>
    );
}
