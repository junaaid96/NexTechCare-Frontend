"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LayoutDashboard } from "lucide-react";
import { Logo } from "./Brand";
import ThemeToggle from "./ThemeToggle";
import { Button, Avatar } from "./ui";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

const links = [
    { href: "/services", label: "Services" },
    { href: "/#triage", label: "AI Triage" },
    { href: "/#how", label: "How it works" },
    { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
    const { user, profile, ready } = useAuth();
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const path = usePathname();
    useEffect(() => {
        const f = () => setScrolled(window.scrollY > 8);
        f();
        window.addEventListener("scroll", f, { passive: true });
        return () => window.removeEventListener("scroll", f);
    }, []);
    useEffect(() => setOpen(false), [path]);

    return (
        <header className={cn("sticky top-0 z-40 transition-all", scrolled ? "border-b border-line bg-bg/80 backdrop-blur-xl" : "bg-transparent")}>
            <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
                <Logo />
                <div className="hidden items-center gap-1 md:flex">
                    {links.map((l) => (
                        <Link key={l.href} href={l.href} className={cn("rounded-lg px-3 py-2 text-sm text-muted transition hover:text-fg", path === l.href && "text-fg")}>
                            {l.label}
                        </Link>
                    ))}
                </div>
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    {ready && user ? (
                        <Link href="/dashboard" className="hidden items-center gap-2 rounded-xl border border-line py-1 pl-1 pr-3 text-sm hover:bg-surface-2 sm:flex">
                            <Avatar user={user} url={profile?.avatar_url} size={28} />
                            <span className="font-medium">Dashboard</span>
                        </Link>
                    ) : (
                        <div className="hidden items-center gap-2 sm:flex">
                            <Button href="/login" variant="ghost" size="sm">Log in</Button>
                            <Button href="/register" size="sm">Get started</Button>
                        </div>
                    )}
                    <button className="grid size-9 place-items-center rounded-xl hover:bg-surface-2 md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
                        {open ? <X className="size-5" /> : <Menu className="size-5" />}
                    </button>
                </div>
            </nav>
            {open && (
                <div className="border-t border-line bg-bg px-4 pb-4 md:hidden">
                    {links.map((l) => (
                        <Link key={l.href} href={l.href} className="block rounded-lg px-3 py-3 text-sm">
                            {l.label}
                        </Link>
                    ))}
                    <div className="mt-2 grid grid-cols-2 gap-2">
                        {user ? (
                            <Button href="/dashboard" className="col-span-2"><LayoutDashboard className="size-4" /> Dashboard</Button>
                        ) : (
                            <>
                                <Button href="/login" variant="outline">Log in</Button>
                                <Button href="/register">Get started</Button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
