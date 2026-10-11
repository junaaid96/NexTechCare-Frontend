"use client";
import { useEffect } from "react";
import { Toaster } from "sonner";
import { AuthProvider } from "@/lib/auth";

export default function Providers({ children }) {
    // Re-apply the saved theme after hydration. If React ever re-renders <html>
    // (e.g. a host-injected comment causes a hydration retry), the "dark" class
    // set by the inline script would otherwise be lost.
    useEffect(() => {
        const t = localStorage.getItem("ntc_theme");
        document.documentElement.classList.toggle("dark", t !== "light");
    }, []);
    return (
        <AuthProvider>
            {children}
            <Toaster richColors position="top-right" closeButton />
        </AuthProvider>
    );
}
