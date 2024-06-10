"use client";

import { useUser } from "@/app/layout";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import filterServicesByCustomer from "@/lib/filterServicesByCustomer";
import Link from "next/link";

export default function CustomerProfile() {
    const router = useRouter();
    const userContext = useUser();
    const { user, loading, loggedIn } = userContext;
    const [myServices, setMyServices] = useState([]);
    const [servicesLoading, setServicesLoading] = useState(true);

    useEffect(() => {
        document.title = "NexTechCare - Customer Profile";
        const metaDescription = document.querySelector(
            'meta[name="description"]'
        );
        if (metaDescription) {
            metaDescription.content =
                "NexTechCare - A seamless IT support experience";
        }
    
        if (!loggedIn) {
            router.push("/login");
        }
    
        if (user && user.user) {
            filterServicesByCustomer(user.user.username).then((data) => {
                setMyServices(data);
                setServicesLoading(false);
            });
        }
    }, [loggedIn, router, user]);

    return loading ? (
        <div className="min-h-screen pt-20 flex flex-col items-center">
            <span className="loading loading-ring loading-lg"></span>
        </div>
    ) : (
        <div className="min-h-screen pt-20 bg-gradient-to-t from-green-50 to-white">
            <div className="bg-white p-10 rounded-lg shadow w-full lg:w-1/2 lg:m-auto">
                <div className="flex flex-col items-center">
                    <h2 className="text-4xl font-semibold text-gray-800 mb-6">
                        Customer Profile
                    </h2>
                    <Image
                        src="/avatar.png"
                        alt={user.user.username}
                        width={150}
                        height={150}
                        className="rounded-full object-cover mb-4"
                    />
                    <p className="text-lg font-medium text-gray-700 mb-2">
                        {user.user.username}
                    </p>
                    <p className="text-lg text-gray-600 mb-2">
                        {user.user.email}
                    </p>
                    <div className="text-center mt-4">
                        <p className="text-lg font-semibold text-gray-700 mb-1">
                            {user.user.first_name} {user.user.last_name}
                        </p>
                        <p className="text-md text-gray-600 mb-1">
                            <span className="font-semibold">Phone:</span>{" "}
                            {user.phone}
                        </p>
                        <p className="text-md text-gray-600 mb-1">
                            <span className="font-semibold">Occupation:</span>{" "}
                            {user.occupation}
                        </p>
                        <p className="text-md text-gray-600">
                            <span className="font-semibold">Address:</span>{" "}
                            {user.address}
                        </p>
                    </div>
                </div>
            </div>
            <div>
                <h3 className="text-2xl font-semibold text-center my-10">
                    All Taken Services
                </h3>
                {loading || servicesLoading ? (
                    <div className="min-h-screen w-24 m-auto">
                        <span className="loading loading-infinity loading-lg"></span>
                    </div>
                ) : myServices.length === 0 ? (
                    <p>No services found.</p>
                ) : (
                    <div className="flex flex-wrap gap-6 items-center justify-center pb-10">
                        {myServices.map((service) => (
                            <div
                                key={service.id}
                                className="bg-white rounded-lg shadow p-6 w-96 h-72 flex flex-col justify-evenly"
                            >
                                <h3 className="text-xl font-semibold text-gray-800">
                                    {service.name}
                                </h3>
                                <p className="text-md text-gray-600">
                                    <span className="font-semibold">
                                        Description:
                                    </span>{" "}
                                    {service.description}
                                </p>
                                <p className="text-md text-gray-600">
                                    <span className="font-semibold">
                                        Price:
                                    </span>{" "}
                                    ${service.price}
                                </p>
                                <p className="text-md text-gray-600">
                                    <span className="font-semibold">
                                        Duration:
                                    </span>{" "}
                                    {service.duration} Hrs
                                </p>
                                <Link
                        className="btn btn-primary btn-outline btn-sm mt-3 w-32"
                        href={`/services/${service.id}`}
                    >
                        View
                    </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
