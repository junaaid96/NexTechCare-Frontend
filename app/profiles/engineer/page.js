"use client";

import { useUser } from "@/app/layout";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function EngineerProfile() {
    const router = useRouter();
    const userContext = useUser();
    const { user, loading, loggedIn } = userContext;

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
                    <div className="text-center mt-4">
                        <p className="text-lg font-semibold text-gray-700 mb-1">
                            {user.user.first_name} {user.user.last_name}
                        </p>
                        <p className="text-md text-gray-600 mb-1">
                            <span className="font-semibold">Phone:</span>{" "}
                            {user.phone}
                        </p>
                        <p className="text-md text-gray-600 mb-1">
                            <span className="font-semibold">Skills:</span>{" "}
                            {user.skills}
                        </p>
                        <p className="text-md text-gray-600 mb-1">
                            <span className="font-semibold">Experience:</span>{" "}
                            {user.experience}
                        </p>
                        <p className="text-md text-gray-600">
                            <span className="font-semibold">Address:</span>{" "}
                            {user.address}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
