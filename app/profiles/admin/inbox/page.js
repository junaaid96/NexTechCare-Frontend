"use client";

import { useUser } from "@/app/layout";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import getAllContactTexts from "@/lib/getAllContactTexts";

export default function AdminInbox() {
    const router = useRouter();
    const userContext = useUser();
    const { userType, loggedIn } = userContext;
    const [messages, setMessages] = useState([]);
    const [messageLoading, setMessageLoading] = useState(true);

    function safeLocalStorage(key) {
        if (typeof window !== "undefined") {
            return localStorage.getItem(key);
        }
        return null;
    }

    const access_token = safeLocalStorage("access_token");

    useEffect(() => {
        document.title = "NexTechCare - Admin Inbox";
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

        if (loggedIn && userType !== "A") {
            router.push("/");
        }

        getAllContactTexts(access_token)
            .then((data) => {
                setMessages(data);
                setMessageLoading(false);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [loggedIn, router, userType, access_token]);

    return (
        <div className="min-h-screen bg-gradient-to-t from-green-50 to-white pt-20 mt-3">
            <div className="max-w-4xl mx-auto bg-green-50 shadow-md rounded-lg overflow-hidden">
                <div className="px-6 py-4">
                    <h2 className="text-2xl font-bold text-gray-800">Inbox</h2>
                    <h2 className="text-gray-500 text-sm">All messages from 'contact us' section</h2>
                </div>
                {messageLoading && (<div className="flex flex-col items-center">
                                <span className="loading loading-spinner text-primary loading-lg"></span>
                                <p className="mb-12">Please wait</p>
                            </div>)}
                <div className="divide-y divide-gray-200">
                    {messages.length === 0 ? (
                        <p className="text-center pb-10">No messages yet.</p>
                    ) : (
                        messages.map((message) => (
                            <div key={message.id} className="px-6 py-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold text-gray-700">
                                        {message.name}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {message.email}
                                    </p>
                                </div>
                                <div className="mt-2">
                                    <h4 className="text-md font-medium text-gray-600">
                                        {message.subject}
                                    </h4>
                                    <p className="text-sm text-gray-600 mt-1">
                                        {message.message}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
