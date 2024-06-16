"use client";

import { useUser } from "@/app/layout";
import Image from "next/image";
import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { getAllPendingServices } from "@/lib/getAllServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheckCircle,
    faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

export default function AdminProfile() {
    const router = useRouter();
    const userContext = useUser();
    const { user, loading, loggedIn } = userContext;
    const [customers, setCustomers] = useState([]);
    const [engineers, setEngineers] = useState([]);
    const [activities, setActivities] = useState([]);
    const [allPdServices, setAllPdServices] = useState([]);
    const [error, setError] = useState("");
    const [approvedLoading, setApprovedLoading] = useState(false);
    const [approvedSuccess, setApprovedSuccess] = useState("");

    const divRef = useRef(null);

    function safeLocalStorage(key) {
        if (typeof window !== "undefined") {
            return localStorage.getItem(key);
        }
        return null;
    }

    const access_token = safeLocalStorage("access_token");

    const fetchData = useCallback(async () => {
        try {
            const [activitiesRes, engineersRes, customersRes] =
                await Promise.all([
                    axios.get(
                        "https://nextechcare-backend.onrender.com/activities/",
                        {
                            headers: {
                                Authorization: `Bearer ${access_token}`,
                            },
                        }
                    ),
                    axios.get(
                        "https://nextechcare-backend.onrender.com/profiles/engineers/",
                        {
                            headers: {
                                Authorization: `Bearer ${access_token}`,
                            },
                        }
                    ),
                    axios.get(
                        "https://nextechcare-backend.onrender.com/profiles/customers/",
                        {
                            headers: {
                                Authorization: `Bearer ${access_token}`,
                            },
                        }
                    ),
                ]);

            setActivities(activitiesRes.data);
            setEngineers(engineersRes.data);
            setCustomers(customersRes.data);
        } catch (error) {
            console.error(error);
            setError("An error occurred while fetching data!");
        }
    }, [access_token]);

    useEffect(() => {
        document.title = "NexTechCare - Admin Profile";
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

        getAllPendingServices().then((data) => {
            setAllPdServices(data);
        });
    }, [loggedIn, router, user, fetchData]);

    const handleApprove = async (id) => {
        // Scroll to the top of the div
        divRef.current.scrollTo({ top: 0, behavior: "smooth" });

        setApprovedLoading(true);
        try {
            const res = await axios.post(
                `https://nextechcare-backend.onrender.com/services/approved/${id}/`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                }
            );
            setError("");
            setApprovedSuccess("Service approved successfully!");
            setApprovedLoading(false);
            setAllPdServices((prev) =>
                prev.filter((service) => service.id !== id)
            );
            fetchData();
            setTimeout(() => {
                setApprovedSuccess("");
            }, 3000);
        } catch (error) {
            console.error(error);
            setApprovedSuccess("");
            setError("An error occurred while approving service!");
            setApprovedLoading(false);
        }
    };

    return loading ? (
        <div className="min-h-screen pt-20 flex flex-col items-center">
            <span className="loading loading-ring loading-lg"></span>
        </div>
    ) : (
        <div className="min-h-screen pt-20 pb-10 bg-gradient-to-t from-green-50 to-white">
            <div className="p-4 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
                <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
                    <h4 className="text-xl font-semibold text-gray-800 mb-6">
                        Admin Profile
                    </h4>
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
                            {user.phone}
                        </p>
                        <p className="text-md text-gray-600 mb-1">
                            <span className="font-semibold">Tasks:</span>{" "}
                            {user.task}
                        </p>
                        <p className="text-md text-gray-600">
                            <span className="font-semibold">Address:</span>{" "}
                            {user.address}
                        </p>
                    </div>
                    <Link href="/profiles/admin/inbox">
                        <button className="btn btn-primary w-32 btn-sm mt-12">
                            Inbox
                        </button>
                    </Link>
                </div>
                <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                    <div className="bg-white shadow-lg rounded-lg p-6 h-96 overflow-auto">
                        <h4 className="text-lg font-semibold text-center mb-3 border shadow">
                            Engineers - {engineers.length}
                        </h4>
                        <table className="table-auto w-full">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">ID</th>
                                    <th className="px-4 py-2">Name</th>
                                    <th className="px-4 py-2">Skill</th>
                                    <th className="px-4 py-2">Experience</th>
                                </tr>
                            </thead>
                            <tbody>
                                {engineers.map((engineer) => (
                                    <tr
                                        key={engineer.user.id}
                                        className="border-t text-center"
                                    >
                                        <td className="px-4 py-2">
                                            {engineer.user.id}
                                        </td>
                                        <td className="px-4 py-2">
                                            {engineer.user.first_name}{" "}
                                            {engineer.user.last_name}
                                        </td>
                                        <td className="px-4 py-2">
                                            {engineer.skills}
                                        </td>
                                        <td className="px-4 py-2">
                                            {engineer.experience}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-6 h-96 overflow-auto">
                        <h4 className="text-lg font-semibold text-center mb-3 border shadow">
                            Customers - {customers.length}
                        </h4>
                        <table className="table-auto w-full">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">ID</th>
                                    <th className="px-4 py-2">Name</th>
                                    <th className="px-4 py-2">Occupation</th>
                                    <th className="px-4 py-2">Address</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customers.map((customer) => (
                                    <tr
                                        key={customer.user.id}
                                        className="border-t text-center"
                                    >
                                        <td className="px-4 py-2">
                                            {customer.user.id}
                                        </td>
                                        <td className="px-4 py-2">
                                            {customer.user.first_name}{" "}
                                            {customer.user.last_name}
                                        </td>
                                        <td className="px-4 py-2">
                                            {customer.occupation}
                                        </td>
                                        <td className="px-4 py-2">
                                            {customer.address}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div
                        className="bg-white shadow-lg rounded-lg p-6 h-96 overflow-auto"
                        ref={divRef}
                    >
                        <h4 className="text-lg font-semibold text-center mb-3 border shadow">
                            Service Approval Requests
                        </h4>
                        {approvedLoading && (
                            <div className="flex flex-col items-center">
                                <span className="loading loading-spinner text-primary loading-lg"></span>
                                <p className="mb-12">Please wait</p>
                            </div>
                        )}
                        {approvedSuccess && (
                            <div className="alert alert-success mb-6">
                                <FontAwesomeIcon icon={faCheckCircle} />
                                <span>{approvedSuccess}</span>
                            </div>
                        )}
                        {allPdServices.map((service) => (
                            <div
                                key={service.id}
                                className="mb-4 p-4 border rounded-md"
                            >
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-800">
                                            Name: {service.name}
                                        </p>
                                        <p className="font-medium text-gray-600 text-sm">
                                            Engineer:{" "}
                                            {service.engineer.user.first_name}{" "}
                                            {service.engineer.user.last_name}
                                        </p>
                                        <p className="text-gray-600 text-sm">
                                            Description: {service.description}
                                        </p>
                                        <p className="text-gray-600 text-sm">
                                            Price: ${service.price}
                                        </p>
                                        <p className="text-gray-600 text-sm">
                                            Duration: {service.duration}{" "}
                                            {service.duration > 1
                                                ? "hours"
                                                : "hour"}
                                        </p>
                                    </div>
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() =>
                                            handleApprove(service.id)
                                        }
                                    >
                                        Approve
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white shadow-lg rounded-lg p-6 h-96 overflow-auto">
                        <h4 className="text-lg font-semibold text-center mb-3 border shadow">
                            Activities
                        </h4>
                        {activities.map((activity) => (
                            <div
                                key={activity.id}
                                className="p-3 flex flex-col border-b"
                            >
                                <p className="text-sm">{activity.name}</p>
                                <p className="text-sm text-gray-500 text-end">
                                    {new Date(
                                        activity.created_at
                                    ).toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {error && (
                <div className="fixed bottom-4 left-4 bg-red-500 text-white p-3 rounded-lg">
                    <FontAwesomeIcon icon={faTriangleExclamation} />
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
}
