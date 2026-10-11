import Link from "next/link";
import { ArrowRight, BadgeCheck, Gauge, MessageSquareText, Radar, ShieldCheck, Sparkles, Timer, Wrench, FlaskConical } from "lucide-react";
import Triage from "@/components/Triage";
import Contact from "@/components/Contact";
import FeaturedServices from "@/components/FeaturedServices";
import { CATEGORIES } from "@/lib/categories";
import { Button } from "@/components/ui";

const steps = [
    { icon: MessageSquareText, title: "Describe it", text: "Type the problem in plain words. No jargon, no forms." },
    { icon: Sparkles, title: "AI triage", text: "We classify it, rate urgency, suggest safe first steps and match engineers." },
    { icon: BadgeCheck, title: "Book a trusted pro", text: "Pick an engineer by Trust Score, price and SLA. Remote or on-site." },
    { icon: Radar, title: "Track it live", text: "Watch every step with an SLA countdown, from request to resolved." },
];

const features = [
    {
        icon: Sparkles,
        title: "AI Issue Triage",
        text: "Describe the problem and get the category, urgency, safe first steps and the best-matched services in seconds.",
    },
    {
        icon: Timer,
        title: "Live SLA Tracker",
        text: "Each booking has a timeline and SLA countdown with notes from the engineer, so you never have to ask “any update?”.",
    },
    {
        icon: ShieldCheck,
        title: "Engineer Trust Score",
        text: "A transparent 0–100 score from ratings, completion rate, response speed and verification. No guesswork.",
    },
];

export default function Home() {
    return (
        <>
            <section className="relative overflow-hidden">
                <div className="bg-grid absolute inset-0" />
                <div className="glow absolute inset-0" />
                <div className="relative mx-auto max-w-5xl px-4 pb-16 pt-16 text-center sm:px-6 sm:pt-24">
                    <Link href="/services" className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1 text-xs text-muted backdrop-blur hover:text-fg">
                        <span className="size-1.5 rounded-full bg-emerald-500" /> 10 categories · verified engineers · live tracking
                        <ArrowRight className="size-3" />
                    </Link>
                    <h1 className="mx-auto mt-6 max-w-4xl animate-fade-up font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
                        Tech problems, <span className="text-gradient">diagnosed in seconds</span>. Fixed by people you can trust.
                    </h1>
                    <p className="mx-auto mt-5 max-w-2xl text-base text-muted sm:text-lg">
                        NexTechCare is the support marketplace for software, hardware, networking, cybersecurity, data recovery and more. Start by telling us what&apos;s wrong.
                    </p>
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                        <Button href="/login#demo" variant="outline" size="sm"><FlaskConical className="size-4" /> Explore demo</Button>
                        <span className="text-xs text-muted">One-click customer, engineer &amp; admin accounts</span>
                    </div>
                    <div id="triage" className="mx-auto mt-10 max-w-3xl scroll-mt-24 text-left">
                        <Triage />
                    </div>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted">
                        <span className="inline-flex items-center gap-1.5"><ShieldCheck className="size-4 text-emerald-500" /> Verified engineers</span>
                        <span className="inline-flex items-center gap-1.5"><Gauge className="size-4 text-brand" /> SLA on every job</span>
                        <span className="inline-flex items-center gap-1.5"><Wrench className="size-4 text-amber-500" /> Remote & on-site</span>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
                <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <h2 className="font-display text-3xl font-bold">Every kind of tech help</h2>
                        <p className="mt-2 text-muted">From a crashed app to a company-wide cloud migration.</p>
                    </div>
                    <Button href="/services" variant="outline">All services <ArrowRight className="size-4" /></Button>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                    {CATEGORIES.map((c) => (
                        <Link
                            key={c.key}
                            href={`/services?category=${c.key}`}
                            className="card group relative overflow-hidden p-4 transition hover:-translate-y-0.5 hover:border-brand/40"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${c.hue} opacity-0 transition group-hover:opacity-100`} />
                            <c.icon className={`relative size-6 ${c.hue.split(" ").pop()}`} />
                            <p className="relative mt-3 text-sm font-semibold">{c.label}</p>
                            <p className="relative mt-0.5 text-xs text-muted">{c.blurb}</p>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
                <div className="grid gap-4 md:grid-cols-3">
                    {features.map((f) => (
                        <div key={f.title} className="card relative overflow-hidden p-7">
                            <div className="absolute -right-10 -top-10 size-40 rounded-full bg-brand/10 blur-2xl" />
                            <span className="relative grid size-11 place-items-center rounded-xl bg-gradient-to-br from-brand to-brand-2 text-white">
                                <f.icon className="size-5" />
                            </span>
                            <h3 className="relative mt-5 font-display text-xl font-semibold">{f.title}</h3>
                            <p className="relative mt-2 text-sm leading-relaxed text-muted">{f.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            <FeaturedServices />

            <section id="how" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6">
                <h2 className="text-center font-display text-3xl font-bold">How it works</h2>
                <ol className="mt-10 grid gap-4 md:grid-cols-4">
                    {steps.map((s, i) => (
                        <li key={s.title} className="card relative p-6">
                            <span className="absolute right-5 top-4 font-display text-4xl font-extrabold text-line">{i + 1}</span>
                            <s.icon className="size-6 text-brand" />
                            <h3 className="mt-4 font-semibold">{s.title}</h3>
                            <p className="mt-1 text-sm text-muted">{s.text}</p>
                        </li>
                    ))}
                </ol>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand to-brand-2 p-10 text-white sm:p-14">
                    <div className="bg-grid absolute inset-0 opacity-30" />
                    <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                        <div>
                            <h2 className="font-display text-3xl font-bold">Are you an engineer?</h2>
                            <p className="mt-2 max-w-xl text-white/85">List your services, take bookings from customers who were already triaged, and grow your Trust Score with every job.</p>
                        </div>
                        <Link href="/register?role=E" className="inline-flex h-12 items-center gap-2 rounded-xl bg-white px-6 font-semibold text-slate-900 hover:bg-white/90">
                            Join as engineer <ArrowRight className="size-4" />
                        </Link>
                    </div>
                </div>
            </section>

            <div className="pt-16">
                <Contact />
            </div>
        </>
    );
}
