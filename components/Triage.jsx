"use client";
import { useState } from "react";
import { Sparkles, ArrowRight, Wand2, AlertTriangle, CheckCircle2 } from "lucide-react";
import { api } from "@/lib/api";
import { categoryOf } from "@/lib/categories";
import { Button, Badge } from "./ui";
import ServiceCard from "./ServiceCard";
import Link from "next/link";

const EXAMPLES = [
    "My laptop shows a ransomware message and files won't open",
    "Wi-Fi keeps dropping in the bedroom, router is downstairs",
    "Accidentally formatted my external SSD with client photos",
    "Need to move 15 office PCs to Google Workspace backup",
];
const URGENCY = { low: "zinc", normal: "sky", high: "amber", critical: "rose" };

export default function Triage({ compact }) {
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    const run = async (e) => {
        e?.preventDefault();
        if (text.trim().length < 8) return setError("Describe the problem in a few more words.");
        setError("");
        setLoading(true);
        try {
            const r = await api("/triage/", { method: "POST", body: { description: text }, auth: false });
            setResult(r);
            sessionStorage.setItem("ntc_triage", JSON.stringify({ issue: text, summary: r.summary, urgency: r.urgency }));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const cat = result ? categoryOf(result.category) : null;
    return (
        <div className="w-full">
            <form onSubmit={run} className="card relative overflow-hidden p-2 shadow-[0_30px_80px_-40px_var(--brand)]">
                <div className="flex items-start gap-3 p-3">
                    <Sparkles className="mt-1 size-5 shrink-0 text-brand" />
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && (e.metaKey || e.ctrlKey) && run()}
                        rows={compact ? 2 : 3}
                        maxLength={2000}
                        placeholder="Describe your tech problem… e.g. “My printer prints blank pages after the Windows update”"
                        aria-label="Describe your problem"
                        className="w-full resize-none bg-transparent text-base outline-none placeholder:text-muted/70"
                    />
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line px-3 py-2">
                    <div className="flex flex-wrap gap-1.5">
                        {EXAMPLES.slice(0, compact ? 2 : 4).map((ex) => (
                            <button type="button" key={ex} onClick={() => setText(ex)} className="rounded-full bg-surface-2 px-2.5 py-1 text-xs text-muted transition hover:text-fg cursor-pointer">
                                {ex.length > 38 ? ex.slice(0, 38) + "…" : ex}
                            </button>
                        ))}
                    </div>
                    <Button type="submit" loading={loading} className="ml-auto">
                        <Wand2 className="size-4" /> Diagnose
                    </Button>
                </div>
            </form>
            {error && <p className="mt-3 text-sm text-rose-500">{error}</p>}

            {result && (
                <div className="mt-6 grid animate-fade-up gap-5 text-left">
                    <div className="card space-y-4 p-6">
                        <div className="flex flex-wrap items-center gap-2">
                            <Badge tone="brand">
                                <cat.icon className="size-3.5" /> {result.category_label}
                            </Badge>
                            <Badge tone={URGENCY[result.urgency]}>
                                <AlertTriangle className="size-3.5" /> {result.urgency} urgency
                            </Badge>
                            <span className="text-[11px] text-muted">{result.source === "ai" ? "AI triage" : "Instant triage"}</span>
                        </div>
                        <p className="text-sm leading-relaxed">{result.summary}</p>
                        <div>
                            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">Try this first</p>
                            <ol className="grid gap-2 sm:grid-cols-3">
                                {result.diy_steps.map((s, i) => (
                                    <li key={i} className="flex gap-2 text-sm">
                                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" /> {s}
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <p className="text-sm font-semibold">Recommended engineers & services</p>
                        {result.services.length ? (
                            <div className="grid gap-4 sm:grid-cols-2">
                                {result.services.slice(0, 2).map((s, i) => (
                                    <ServiceCard key={s.id} service={s} highlight={i === 0} />
                                ))}
                            </div>
                        ) : (
                            <div className="card p-6 text-sm text-muted">No exact match yet. Browse the category to see who can help.</div>
                        )}
                        <Link href={`/services?category=${result.category}`} className="inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline">
                            See all {result.category_label} services <ArrowRight className="size-4" />
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
