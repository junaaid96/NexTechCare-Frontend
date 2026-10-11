import { ShieldCheck, Sparkles, Timer } from "lucide-react";
import { Logo, CodeJBorgCredit } from "./Brand";
import ThemeToggle from "./ThemeToggle";

export default function AuthShell({ title, subtitle, children }) {
    return (
        <div className="grid min-h-dvh lg:grid-cols-2">
            <div className="relative hidden overflow-hidden border-r border-line bg-surface lg:block">
                <div className="bg-grid absolute inset-0" />
                <div className="glow absolute inset-0" />
                <div className="relative flex h-full flex-col justify-between p-12">
                    <Logo />
                    <div className="max-w-md space-y-8">
                        <h2 className="font-display text-4xl font-bold leading-tight">
                            Support that <span className="text-gradient">shows its work.</span>
                        </h2>
                        <ul className="space-y-5">
                            {[
                                { i: Sparkles, t: "AI triage before you even book" },
                                { i: ShieldCheck, t: "Engineers ranked by a transparent Trust Score" },
                                { i: Timer, t: "Live SLA countdown on every job" },
                            ].map(({ i: I, t }) => (
                                <li key={t} className="flex items-center gap-3">
                                    <span className="grid size-9 place-items-center rounded-xl bg-brand/15 text-brand"><I className="size-4" /></span>
                                    <span className="text-sm">{t}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <span />
                </div>
            </div>
            <div className="flex flex-col">
                <div className="flex items-center justify-between p-5 lg:justify-end">
                    <Logo className="lg:hidden" />
                    <ThemeToggle />
                </div>
                <div className="flex flex-1 items-center justify-center px-5 pb-10">
                    <div className="w-full max-w-md animate-fade-up">
                        <h1 className="font-display text-3xl font-bold">{title}</h1>
                        <p className="mt-2 text-muted">{subtitle}</p>
                        <div className="mt-8">{children}</div>
                    </div>
                </div>
                <div className="flex justify-center pb-6">
                    <CodeJBorgCredit />
                </div>
            </div>
        </div>
    );
}
