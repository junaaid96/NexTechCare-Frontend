"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";
import { api } from "@/lib/api";
import { fullName, roleName } from "@/lib/utils";
import { PageHeader } from "@/components/dash";
import { Avatar, Badge, Button, Card, Input } from "@/components/ui";

export default function Profile() {
    const { profile, role, reload } = useAuth();
    const [f, setF] = useState({});
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (profile)
            setF({ phone: profile.phone || "", address: profile.address || "", occupation: profile.occupation || "", skills: profile.skills || "", experience: profile.experience || "", avatar_url: profile.avatar_url || "" });
    }, [profile]);
    if (!profile) return null;
    if (role === "A") return <PageHeader title="Profile" subtitle="Admin profiles are managed in Django admin." />;
    const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
    const save = async (e) => {
        e.preventDefault();
        setLoading(true);
        const body = { phone: f.phone, address: f.address, avatar_url: f.avatar_url, ...(role === "E" ? { skills: f.skills, experience: f.experience } : { occupation: f.occupation }) };
        try {
            await api("/profiles/profile/update/", { method: "PATCH", body });
            toast.success("Profile saved");
            reload();
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <PageHeader title="Profile" subtitle="This is what customers and engineers see." />
            <div className="grid gap-6 lg:grid-cols-3">
                <Card className="h-fit p-6 text-center">
                    <div className="flex justify-center"><Avatar user={profile.user} url={f.avatar_url || profile.avatar_url} size={88} /></div>
                    <p className="mt-4 font-display text-lg font-semibold">{fullName(profile.user)}</p>
                    <p className="text-sm text-muted">@{profile.user.username}</p>
                    <div className="mt-3 flex justify-center gap-2"><Badge tone="brand">{roleName[role]}</Badge>{profile.verified && <Badge tone="sky">Verified</Badge>}</div>
                    <p className="mt-4 text-sm text-muted">{profile.user.email}</p>
                </Card>
                <Card className="p-6 lg:col-span-2">
                    <form onSubmit={save} className="grid gap-4 sm:grid-cols-2">
                        <Input label="Phone" value={f.phone || ""} onChange={set("phone")} />
                        {role === "C" ? <Input label="Occupation" value={f.occupation || ""} onChange={set("occupation")} /> : <Input label="Skills" value={f.skills || ""} onChange={set("skills")} placeholder="Networking, Windows, macOS…" />}
                        <div className="sm:col-span-2"><Input label="Avatar image URL" type="url" value={f.avatar_url || ""} onChange={set("avatar_url")} placeholder="https://…" hint="Paste a link to a square photo" /></div>
                        <div className="sm:col-span-2"><Input as="textarea" label="Address" value={f.address || ""} onChange={set("address")} className="min-h-20" /></div>
                        {role === "E" && <div className="sm:col-span-2"><Input as="textarea" label="Experience" value={f.experience || ""} onChange={set("experience")} /></div>}
                        <div className="sm:col-span-2"><Button type="submit" loading={loading}>Save profile</Button></div>
                    </form>
                </Card>
            </div>
        </>
    );
}
