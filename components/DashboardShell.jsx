"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard, CalendarClock, Wrench, CheckCheck, Users, Inbox, Activity, UserCog, LogOut, Menu, X, Search, Plus,
} from "lucide-react";
import { Logo, CodeJBorgCredit } from "./Brand";
import ThemeToggle from "./ThemeToggle";
import { Avatar, Skeleton } from "./ui";
import { useAuth } from "@/lib/auth";
import { cn, fullName, roleName } from "@/lib/utils";

const NAV = {
    C: [
        { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
        { href: "/dashboard/bookings", label: "My bookings", icon: CalendarClock },
        { href: "/services", label: "Find services", icon: Search },
        { href: "/dashboard/profile", label: "Profile", icon: UserCog },
    ],
    E: [
        { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
        { href: "/dashboard/bookings", label: "Job queue", icon: CalendarClock },
        { href: "/dashboard/services", label: "My services", icon: Wrench },
        { href: "/dashboard/services/new", label: "New service", icon: Plus },
        { href: "/dashboard/profile", label: "Profile", icon: UserCog },
    ],
    A: [
        { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
        { href: "/dashboard/approvals", label: "Approvals", icon: CheckCheck },
        { href: "/dashboard/bookings", label: "All bookings", icon: CalendarClock },
        { href: "/dashboard/users", label: "Users", icon: Users },
        { href: "/dashboard/inbox", label: "Inbox", icon: Inbox },
        { href: "/dashboard/activity", label: "Activity", icon: Activity },
    ],
};

export default function DashboardShell({ children }) {
    const { user, role, profile, ready, logout } = useAuth();
    const router = useRouter();
    const path = usePathname();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (ready && !localStorage.getItem("ntc_access")) router.replace(`/login?next=${encodeURIComponent(path)}`);
    }, [ready, user, router, path]);
    useEffect(() => setOpen(false), [path]);

    const nav = NAV[role] || [];
    const isActive = (h) =>
        h === "/dashboard" ? path === h : path.startsWith(h) && !(h === "/dashboard/services" && path.endsWith("/new"));

    const sidebar = (
        <div className="flex h-full flex-col">
            <div className="flex h-16 items-center px-5">
                <Logo />
            </div>
            <nav className="flex-1 space-y-1 px-3 py-4" aria-label="Dashboard">
                <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted">{roleName[role] || "Account"}</p>
                {nav.map((n) => (
                    <Link
                        key={n.href}
                        href={n.href}
                        className={cn(
                            "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition",
                            isActive(n.href) ? "bg-brand/10 font-medium text-brand" : "text-muted hover:bg-surface-2 hover:text-fg"
                        )}
                    >
                        <n.icon className="size-4" /> {n.label}
                    </Link>
                ))}
            </nav>
            <div className="space-y-3 p-3">
                <div className="flex items-center gap-3 rounded-xl border border-line p-2.5">
                    <Avatar user={user} url={profile?.avatar_url} size={34} />
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{fullName(user)}</p>
                        <p className="truncate text-xs text-muted">{user?.email}</p>
                    </div>
                    <button
                        onClick={() => {
                            logout();
                            router.push("/");
                        }}
                        className="grid size-8 place-items-center rounded-lg text-muted hover:bg-surface-2 hover:text-rose-500 cursor-pointer"
                        aria-label="Log out"
                        title="Log out"
                    >
                        <LogOut className="size-4" />
                    </button>
                </div>
                <CodeJBorgCredit variant="sidebar" />
            </div>
        </div>
    );

    return (
        <div className="min-h-dvh lg:grid lg:grid-cols-[260px_1fr]">
            <aside className="sticky top-0 hidden h-dvh border-r border-line bg-surface lg:block">{sidebar}</aside>
            {open && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
                    <aside className="absolute inset-y-0 left-0 w-72 border-r border-line bg-surface">{sidebar}</aside>
                </div>
            )}
            <div className="min-w-0">
                <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-line bg-bg/80 px-4 backdrop-blur-xl sm:px-8">
                    <button className="grid size-9 place-items-center rounded-xl hover:bg-surface-2 lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
                        {open ? <X className="size-5" /> : <Menu className="size-5" />}
                    </button>
                    <p className="hidden text-sm text-muted lg:block">
                        {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                    </p>
                    <div className="flex items-center gap-2">
                        <Link href="/" className="rounded-xl px-3 py-2 text-sm text-muted hover:bg-surface-2 hover:text-fg">View site</Link>
                        <ThemeToggle />
                    </div>
                </header>
                <main className="mx-auto max-w-6xl px-4 py-8 sm:px-8">{!ready || !role ? <Skeleton className="h-64" /> : children}</main>
            </div>
        </div>
    );
}
