"use client";
import { use } from "react";
import ServiceForm from "@/components/ServiceForm";
import { PageHeader } from "@/components/dash";
import { useFetch } from "@/lib/useFetch";
import { Skeleton } from "@/components/ui";

export default function EditService({ params }) {
    const { id } = use(params);
    const { data } = useFetch(`/services/${id}/`);
    return (
        <>
            <PageHeader title="Edit service" />
            {data ? <ServiceForm initial={data} id={id} /> : <Skeleton className="h-96" />}
        </>
    );
}
