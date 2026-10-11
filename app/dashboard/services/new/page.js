"use client";
import ServiceForm from "@/components/ServiceForm";
import { PageHeader } from "@/components/dash";

export default function NewService() {
    return (
        <>
            <PageHeader title="New service" subtitle="Clear titles and honest SLAs earn higher Trust Scores." />
            <ServiceForm />
        </>
    );
}
