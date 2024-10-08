"use client";

import getAllServices from "@/lib/getAllServices";
// import { retryFetch } from "@/lib/retryFetch";
import Link from "next/link";
import { useEffect, useState } from "react";

// export const metadata = {
//     title: "NexTechCare - All Services",
//     description: "NexTechCare - A seamless IT support experience",
// };

// export default async function Services() {
//     let services = [];
//     try {
//         services = await getAllServices();
//     } catch (error) {
//         console.error("Error fetching services", error);
//     }
export default function Services() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = "NexTechCare - All Services";
        const metaDescription = document.querySelector(
            'meta[name="description"]'
        );
        if (metaDescription) {
            metaDescription.content =
                "NexTechCare - A seamless IT support experience";
        }

        async function fetchServices() {
            try {
                const servicesData = await getAllServices();
                setServices(servicesData);
            } catch (error) {
                console.error("Error fetching services", error);
            } finally {
                setLoading(false);
            }
        }

        fetchServices();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <span className="loading loading-dots loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-wrap gap-8 mt-16 items-center justify-center bg-gradient-to-b from-green-50 to-white py-10 px-4">
            {services.length === 0 ? (
                <p>No services found.</p>
            ) : (
                services.map((service) => (
                    <div
                        key={service.id}
                        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm transform transition duration-500 hover:scale-105 flex flex-col justify-between h-96"
                    >
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2 border-b pb-2">
                                {service.name}
                            </h2>
                            <p className="mt-4 text-lg font-semibold text-gray-700">
                                Engineer: {service.engineer.user.first_name}{" "}
                                {service.engineer.user.last_name}
                            </p>
                        </div>
                        <div>
                            <p className="mt-4 text-gray-600">
                                <span className="font-semibold">Price:</span> $
                                {service.price}
                            </p>
                            <p className="mt-4 text-gray-600">
                                <span className="font-semibold">Duration:</span>{" "}
                                {service.duration}{" "}
                                {service.duration > 1 ? "hours" : "hour"}
                            </p>
                        </div>
                        <Link
                            className="btn btn-primary btn-outline"
                            href={`/services/${service.id}`}
                        >
                            View
                        </Link>
                    </div>
                ))
            )}
        </div>
    );
}
