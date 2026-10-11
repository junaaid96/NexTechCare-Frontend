"use client";
import { useFetch } from "@/lib/useFetch";
import ServiceCard from "./ServiceCard";
import { Skeleton } from "./ui";

export default function FeaturedServices() {
    const { data, loading } = useFetch("/services/?admin_approved=True", { auth: false });
    const items = (data || []).slice().sort((a, b) => (b.trust?.score || 0) - (a.trust?.score || 0)).slice(0, 3);
    if (!loading && !items.length) return null;
    return (
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
            <h2 className="font-display text-3xl font-bold">Top-rated right now</h2>
            <p className="mt-2 text-muted">Sorted by Trust Score.</p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
                {loading ? [0, 1, 2].map((i) => <Skeleton key={i} className="h-72" />) : items.map((s) => <ServiceCard key={s.id} service={s} />)}
            </div>
        </section>
    );
}
