"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { User, Wrench } from "lucide-react";
import AuthShell from "@/components/AuthShell";
import { Button, Input } from "@/components/ui";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

export default function RegisterForm() {
    const router = useRouter();
    const { login } = useAuth();
    const initialRole = useSearchParams().get("role") === "E" ? "E" : "C";
    const [f, setF] = useState({ first_name: "", last_name: "", username: "", email: "", password: "", confirm_password: "", user_type: initialRole });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

    const submit = async (e) => {
        e.preventDefault();
        if (f.password !== f.confirm_password) return setErrors({ confirm_password: "Passwords must match" });
        if (f.password.length < 8) return setErrors({ password: "Use at least 8 characters" });
        setErrors({});
        setLoading(true);
        try {
            await api("/profiles/register/", { method: "POST", body: f, auth: false });
            await login(f.username, f.password);
            toast.success("Account created!");
            router.push("/dashboard");
        } catch (err) {
            const d = err.data || {};
            const fe = {};
            Object.entries(d).forEach(([k, v]) => (fe[k] = Array.isArray(v) ? v.join(" ") : String(v)));
            setErrors(Object.keys(fe).length ? fe : { form: err.message });
        } finally {
            setLoading(false);
        }
    };

    const roles = [
        { k: "C", icon: User, t: "I need help", d: "Book engineers" },
        { k: "E", icon: Wrench, t: "I'm an engineer", d: "Offer services" },
    ];

    return (
        <AuthShell title="Create your account" subtitle="Free forever for customers. Engineers are reviewed before going live.">
            <form onSubmit={submit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Account type">
                    {roles.map((r) => (
                        <button
                            type="button"
                            key={r.k}
                            role="radio"
                            aria-checked={f.user_type === r.k}
                            onClick={() => setF({ ...f, user_type: r.k })}
                            className={cn(
                                "flex items-center gap-3 rounded-xl border p-3 text-left transition cursor-pointer",
                                f.user_type === r.k ? "border-brand bg-brand/10 ring-4 ring-brand/10" : "border-line hover:border-brand/40"
                            )}
                        >
                            <r.icon className={cn("size-5", f.user_type === r.k ? "text-brand" : "text-muted")} />
                            <span>
                                <span className="block text-sm font-semibold">{r.t}</span>
                                <span className="block text-xs text-muted">{r.d}</span>
                            </span>
                        </button>
                    ))}
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <Input label="First name" required value={f.first_name} onChange={set("first_name")} error={errors.first_name} />
                    <Input label="Last name" required value={f.last_name} onChange={set("last_name")} error={errors.last_name} />
                </div>
                <Input label="Username" required autoComplete="username" value={f.username} onChange={set("username")} error={errors.username} />
                <Input label="Email" type="email" required autoComplete="email" value={f.email} onChange={set("email")} error={errors.email} />
                <div className="grid grid-cols-2 gap-3">
                    <Input label="Password" type="password" required autoComplete="new-password" value={f.password} onChange={set("password")} error={errors.password} />
                    <Input label="Confirm" type="password" required autoComplete="new-password" value={f.confirm_password} onChange={set("confirm_password")} error={errors.confirm_password} />
                </div>
                {errors.form && <p className="rounded-xl bg-rose-500/10 px-3 py-2 text-sm text-rose-500">{errors.form}</p>}
                <Button type="submit" loading={loading} size="lg" className="w-full">Create account</Button>
            </form>
            <p className="mt-6 text-center text-sm text-muted">
                Already have an account? <Link href="/login" className="font-medium text-brand hover:underline">Log in</Link>
            </p>
        </AuthShell>
    );
}
