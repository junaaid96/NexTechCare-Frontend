"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { api } from "./api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [profile, setProfile] = useState(null);
    const [role, setRole] = useState(null);
    const [ready, setReady] = useState(false);

    const load = useCallback(async () => {
        const token = localStorage.getItem("ntc_access");
        if (!token) {
            setProfile(null);
            setRole(null);
            setReady(true);
            return;
        }
        setRole(localStorage.getItem("ntc_role"));
        try {
            const p = await api("/profiles/profile/");
            setProfile(p);
            setRole(p?.user?.user_type || localStorage.getItem("ntc_role"));
        } catch {
            setProfile(null);
        } finally {
            setReady(true);
        }
    }, []);

    useEffect(() => {
        load();
        const onLogout = () => {
            setProfile(null);
            setRole(null);
        };
        window.addEventListener("ntc:logout", onLogout);
        return () => window.removeEventListener("ntc:logout", onLogout);
    }, [load]);

    const login = async (username, password) => {
        const r = await api("/profiles/login/", { method: "POST", body: { username, password }, auth: false });
        localStorage.setItem("ntc_access", r.access);
        localStorage.setItem("ntc_refresh", r.refresh);
        localStorage.setItem("ntc_role", r.user_type);
        await load();
        return r.user_type;
    };

    const logout = () => {
        ["ntc_access", "ntc_refresh", "ntc_role"].forEach((k) => localStorage.removeItem(k));
        setProfile(null);
        setRole(null);
    };

    return (
        <AuthContext.Provider value={{ profile, role, ready, login, logout, reload: load, user: profile?.user }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
