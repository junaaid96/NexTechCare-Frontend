"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Mail, MessageSquare, Clock } from "lucide-react";
import { api } from "@/lib/api";
import { Button, Input } from "./ui";

export default function Contact() {
    const [f, setF] = useState({ name: "", email: "", subject: "", message: "" });
    const [loading, setLoading] = useState(false);
    const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api("/contacts/create/", { method: "POST", body: f, auth: false });
            toast.success("Message sent. We'll reply within one business day.");
            setF({ name: "", email: "", subject: "", message: "" });
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <section id="contact" className="mx-auto max-w-7xl scroll-mt-24 px-4 sm:px-6">
            <div className="card grid overflow-hidden md:grid-cols-5">
                <div className="glow relative space-y-6 border-b border-line p-8 md:col-span-2 md:border-b-0 md:border-r">
                    <h2 className="font-display text-3xl font-bold">Talk to a human</h2>
                    <p className="text-muted">Business accounts, partnerships, or anything the AI triage couldn&apos;t answer.</p>
                    <ul className="space-y-4 text-sm">
                        <li className="flex gap-3"><Mail className="size-5 text-brand" /> support@nextechcare.app</li>
                        <li className="flex gap-3"><MessageSquare className="size-5 text-brand" /> Replies from our support desk, not a bot</li>
                        <li className="flex gap-3"><Clock className="size-5 text-brand" /> Sun–Thu, 9:00–18:00</li>
                    </ul>
                </div>
                <form onSubmit={submit} className="grid gap-4 p-8 sm:grid-cols-2 md:col-span-3">
                    <Input label="Name" required value={f.name} onChange={set("name")} />
                    <Input label="Email" type="email" required value={f.email} onChange={set("email")} />
                    <div className="sm:col-span-2"><Input label="Subject" required value={f.subject} onChange={set("subject")} /></div>
                    <div className="sm:col-span-2"><Input as="textarea" label="Message" required value={f.message} onChange={set("message")} /></div>
                    <div className="sm:col-span-2"><Button type="submit" loading={loading} className="w-full sm:w-auto">Send message</Button></div>
                </form>
            </div>
        </section>
    );
}
