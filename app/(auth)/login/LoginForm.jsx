"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import AuthShell from "@/components/AuthShell";
import { Button, Input } from "@/components/ui";
import { useAuth } from "@/lib/auth";

export default function LoginForm() {
    const { login } = useAuth();
    const router = useRouter();
    const next = useSearchParams().get("next");
    const [f, setF] = useState({ username: "", password: "" });
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await login(f.username.trim(), f.password);
            toast.success("Welcome back!");
            router.push(next && next.startsWith("/") ? next : "/dashboard");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthShell title="Welcome back" subtitle="Log in to track bookings and manage your services.">
            <form onSubmit={submit} className="space-y-4">
                <Input label="Username" autoComplete="username" required value={f.username} onChange={(e) => setF({ ...f, username: e.target.value })} />
                <div className="relative">
                    <Input label="Password" type={show ? "text" : "password"} autoComplete="current-password" required value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} />
                    <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-9 text-muted hover:text-fg" aria-label={show ? "Hide password" : "Show password"}>
                        {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                </div>
                {error && <p className="rounded-xl bg-rose-500/10 px-3 py-2 text-sm text-rose-500" role="alert">{error}</p>}
                <Button type="submit" loading={loading} size="lg" className="w-full">Log in</Button>
            </form>
            <p className="mt-6 text-center text-sm text-muted">
                New to NexTechCare? <Link href="/register" className="font-medium text-brand hover:underline">Create an account</Link>
            </p>
        </AuthShell>
    );
}
