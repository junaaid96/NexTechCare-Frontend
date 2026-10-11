"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { CATEGORIES } from "@/lib/categories";
import { Button, Card, Input, Select } from "./ui";

export default function ServiceForm({ initial, id }) {
    const router = useRouter();
    const [f, setF] = useState({
        name: initial?.name || "",
        description: initial?.description || "",
        category: initial?.category || "software",
        price: initial?.price || "",
        duration: initial?.duration || 1,
        sla_hours: initial?.sla_hours || 24,
        is_remote: initial?.is_remote ?? true,
    });
    const [loading, setLoading] = useState(false);
    const set = (k) => (e) => setF({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value });

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api(id ? `/services/${id}/` : "/services/", { method: id ? "PUT" : "POST", body: { ...f, price: Number(f.price), duration: Number(f.duration), sla_hours: Number(f.sla_hours) } });
            toast.success(id ? "Service updated" : "Submitted for admin approval");
            router.push("/dashboard/services");
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="p-6 sm:p-8">
            <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2"><Input label="Service name" required maxLength={100} value={f.name} onChange={set("name")} placeholder="e.g. Home Wi-Fi dead-zone fix" /></div>
                <Select label="Category" value={f.category} onChange={set("category")}>
                    {CATEGORIES.map((c) => <option key={c.key} value={c.key}>{c.label}</option>)}
                </Select>
                <Input label="Price (USD)" type="number" min="1" step="0.01" required value={f.price} onChange={set("price")} />
                <Input label="Typical duration (hours)" type="number" min="1" required value={f.duration} onChange={set("duration")} />
                <Input label="SLA: resolve within (hours)" type="number" min="1" required value={f.sla_hours} onChange={set("sla_hours")} hint="Shown to customers as a countdown" />
                <div className="sm:col-span-2"><Input as="textarea" label="Description" required value={f.description} onChange={set("description")} placeholder="What's included, what you need from the customer, tools you use…" /></div>
                <label className="flex items-center gap-2 text-sm sm:col-span-2">
                    <input type="checkbox" checked={f.is_remote} onChange={set("is_remote")} className="size-4 accent-[var(--brand)]" /> Can be delivered remotely
                </label>
                <div className="flex gap-2 sm:col-span-2">
                    <Button type="submit" loading={loading}>{id ? "Save changes" : "Submit for approval"}</Button>
                    <Button type="button" variant="ghost" onClick={() => router.back()}>Cancel</Button>
                </div>
            </form>
        </Card>
    );
}
