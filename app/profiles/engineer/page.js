"use client";

import { useUser } from "@/app/layout";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
    filterApprovedServicesByEngineer,
    filterPendingServicesByEngineer,
} from "@/lib/filterServicesByEngineer";
import { ServiceList } from "@/app/components/ServiceCard";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheckCircle,
    faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function EngineerProfile() {
    const router = useRouter();
    const userContext = useUser();
    const { user, otherUserData, loading, loggedIn } = userContext;
    const [myApprovedServices, setMyApprovedServices] = useState([]);
    const [myPendingServices, setMyPendingServices] = useState([]);
    const [servicesLoading, setServicesLoading] = useState(true);
    const [successDeleted, setSuccessDeleted] = useState("");

    function safeLocalStorage(key) {
        if (typeof window !== "undefined") {
            return localStorage.getItem(key);
        }
        return null;
    }

    const access_token = safeLocalStorage("access_token");

    const fetchData = useCallback(async () => {
        if (user && user.user) {
            filterApprovedServicesByEngineer(user.user.username).then(
                (data) => {
                    setMyApprovedServices(data);
                    setServicesLoading(false);
                }
            );
            filterPendingServicesByEngineer(user.user.username).then((data) => {
                setMyPendingServices(data);
                setServicesLoading(false);
            });
        }
    }, [user]);

    useEffect(() => {
        document.title = "NexTechCare - Engineer Profile";
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

        fetchData();
    }, [loggedIn, router, fetchData]);

    const handleDeleteService = async (id) => {
        const res = await axios.delete(
            `https://nextechcare-backend.onrender.com/services/${id}/`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );
        if (res.status === 200) {
            fetchData();
            setSuccessDeleted(res.data.success);
            setTimeout(() => {
                setSuccessDeleted("");
            }, 3000);
        } else {
            console.error(res);
        }
    };

    return loading ? (
        <div className="min-h-screen pt-20 flex flex-col items-center">
            <span className="loading loading-ring loading-lg"></span>
        </div>
    ) : (
        <div className="min-h-screen pt-20 pb-10 bg-gradient-to-t from-green-50 to-white">
            <div className="bg-white p-10 rounded-lg shadow w-full lg:w-1/2 lg:m-auto">
                <div className="flex flex-col items-center">
                    <h2 className="text-4xl font-semibold text-gray-800 mb-6">
                        Engineer Profile
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
                    <div className="text-start mt-4">
                        <p className="text-lg font-semibold text-gray-700 mb-1">
                            Name: {user.user.first_name} {user.user.last_name}
                        </p>
                        <p className="text-md text-gray-600 mb-1">
                            <span className="font-semibold">Phone:</span>{" "}
                            {otherUserData.phone}
                        </p>
                        <p className="text-md text-gray-600 mb-1">
                            <span className="font-semibold">Skills:</span>{" "}
                            {otherUserData.skills}
                        </p>
                        <p className="text-md text-gray-600 mb-1">
                            <span className="font-semibold">Experience:</span>{" "}
                            {otherUserData.experience}
                        </p>
                        <p className="text-md text-gray-600">
                            <span className="font-semibold">Address:</span>{" "}
                            {otherUserData.address}
                        </p>

                        <div className="flex items-center justify-between mt-10 gap-6">
                            <Link href="/services/create">
                                <button className="btn btn-primary btn-sm w-30">
                                    Create Service
                                </button>
                            </Link>
                            <Link href="/profiles/engineer/update">
                                <button className="btn btn-primary btn-sm w-30">
                                    Update Profile
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h3 className="text-2xl font-semibold text-center mb-6 mt-10">
                    All Created Services
                </h3>
                {successDeleted && (
                    <div className="toast toast-end">
                        <div className="alert alert-success">
                            <FontAwesomeIcon icon={faCheckCircle} />
                            <span>{successDeleted}</span>
                        </div>
                    </div>
                )}
                <ServiceList
                    title="Approved Services"
                    services={myApprovedServices}
                    loading={loading}
                    servicesLoading={servicesLoading}
                    onDelete={handleDeleteService}
                />
                <ServiceList
                    title="Pending Services"
                    services={myPendingServices}
                    loading={loading}
                    servicesLoading={servicesLoading}
                    onDelete={handleDeleteService}
                />
            </div>
        </div>
    );
}
