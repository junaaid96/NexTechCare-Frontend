"use client";

import { useUser } from "@/app/layout";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function AdminProfile() {
    const router = useRouter();
    const userContext = useUser();
    const { user, loading, loggedIn } = userContext;
    const [customers, setCustomers] = useState([]);
    const [engineers, setEngineers] = useState([]);
    const [activities, setActivities] = useState([]);
    const [error, setError] = useState("");

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

        function safeLocalStorage(key) {
            if (typeof window !== "undefined") {
                return localStorage.getItem(key);
            }
            return null;
        }

        const access_token = safeLocalStorage("access_token");

        const fetchUsers = async () => {
            try {
                const [customersRes, engineersRes] = await Promise.all([
                    axios.get(
                        "https://nextechcare-backend.onrender.com/profiles/customers/",
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
                ]);

                setCustomers(customersRes.data);
                setEngineers(engineersRes.data);
            } catch (error) {
                console.error(error);
                setError("An error occurred while fetching data!");
            }
        };

        fetchUsers();
    }, [loggedIn, router, user]);

    return loading ? (
        <div className="min-h-screen pt-20 flex flex-col items-center">
            <span className="loading loading-ring loading-lg"></span>
        </div>
    ) : (
        <div className="min-h-screen pt-20 bg-gradient-to-t from-green-50 to-white">
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
                </div>
                <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                    <div className="bg-white shadow-lg rounded-lg p-6 h-96 overflow-auto">
                        <h4 className="text-lg font-semibold text-center mb-3 border-b w-full">
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
                                        key={engineer.id}
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
                        <h4 className="text-lg font-semibold text-center mb-3 border-b w-full">
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
                                        key={customer.id}
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
                    <div className="bg-white shadow-lg rounded-lg p-6 h-96 overflow-auto">
                        <h4 className="text-lg font-semibold text-center mb-3 border-b w-full">
                            Requests
                        </h4>
                        {/* requests content */}
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-6 h-96 overflow-auto">
                        <h4 className="text-lg font-semibold text-center mb-3 border-b w-full">
                            Activities
                        </h4>
                        {/* activities content */}
                    </div>
                </div>
            </div>
            {error && (
                <div className="fixed bottom-4 left-4 bg-red-500 text-white p-3 rounded-lg">
                    {error}
                </div>
            )}
        </div>
    );
}
