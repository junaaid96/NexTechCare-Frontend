"use client";
import { Toaster } from "sonner";
import { AuthProvider } from "@/lib/auth";

export default function Providers({ children }) {
    return (
        <AuthProvider>
            {children}
            <Toaster richColors position="top-right" closeButton />
        </AuthProvider>
    );
}
