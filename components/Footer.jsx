import Link from "next/link";
import { Logo, CodeJBorgCredit } from "./Brand";
import { CATEGORIES } from "@/lib/categories";

export default function Footer() {
    return (
        <footer className="mt-24 border-t border-line">
            <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
                <div className="space-y-4 md:col-span-2">
                    <Logo />
                    <p className="max-w-sm text-sm text-muted">
                        The technology support marketplace. Describe the problem, get an instant AI triage, and book a verified engineer with a live, SLA-backed tracker.
                    </p>
                </div>
                <div>
                    <h4 className="mb-3 text-sm font-semibold">Categories</h4>
                    <ul className="grid gap-2 text-sm text-muted">
                        {CATEGORIES.slice(0, 6).map((c) => (
                            <li key={c.key}>
                                <Link className="hover:text-fg" href={`/services?category=${c.key}`}>{c.label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="mb-3 text-sm font-semibold">Platform</h4>
                    <ul className="grid gap-2 text-sm text-muted">
                        <li><Link className="hover:text-fg" href="/services">Browse services</Link></li>
                        <li><Link className="hover:text-fg" href="/#triage">AI issue triage</Link></li>
                        <li><Link className="hover:text-fg" href="/register?role=E">Become an engineer</Link></li>
                        <li><Link className="hover:text-fg" href="/#contact">Contact</Link></li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-line">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-muted sm:flex-row sm:px-6">
                    <p>© {new Date().getFullYear()} NexTechCare. All rights reserved.</p>
                    <CodeJBorgCredit variant="footer" />
                </div>
            </div>
        </footer>
    );
}
