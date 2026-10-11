"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FlaskConical, Loader2, ShieldCheck, UserRound, Wrench } from "lucide-react";
import { useAuth } from "@/lib/auth";

const ROLES = [
    { role: "C", label: "Customer", icon: UserRound },
    { role: "E", label: "Engineer", icon: Wrench },
    { role: "A", label: "Admin", icon: ShieldCheck },
];

// Modeled on HealthOps Connect's "Explore the demo" box: dashed card, one button per role.
export default function DemoLogin({ next }) {
    const { demoLogin } = useAuth();
    const router = useRouter();
    const [busy, setBusy] = useState(null);

    const go = async (role, label) => {
        setBusy(role);
        try {
            await demoLogin(role);
            toast.success(`Signed in as the demo ${label.toLowerCase()}`);
            router.push(next && next.startsWith("/") ? next : "/dashboard");
        } catch (e) {
            toast.error(e.message || "Demo is unavailable right now");
            setBusy(null);
        }
    };

    return (
        <div id="demo" className="mt-8 scroll-mt-24 rounded-2xl border border-dashed border-line p-4">
            <p className="flex items-center gap-2 text-sm font-semibold"><FlaskConical className="size-4 text-brand" />Explore the demo</p>
            <p className="mt-1 text-xs text-muted">One click, no password. Demo data resets every night.</p>
            <div className="mt-3 grid grid-cols-3 gap-2">
                {ROLES.map(({ role, label, icon: Icon }) => (
                    <button key={role} type="button" disabled={!!busy} onClick={() => go(role, label)}
                        className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl border border-line bg-surface px-2 text-sm font-medium transition hover:border-brand/50 hover:text-brand disabled:opacity-60">
                        {busy === role ? <Loader2 className="size-4 animate-spin" /> : <Icon className="size-4" />}{label}
                    </button>
                ))}
            </div>
        </div>
    );
}
