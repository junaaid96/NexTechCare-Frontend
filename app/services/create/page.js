"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "@/app/layout";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheckCircle,
    faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

export default function CreateService() {
    const router = useRouter();
    const userContext = useUser();
    const { loading, loggedIn, userType } = userContext;
    const [serviceCreationLoading, setServiceCreationLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        document.title = "NexTechCare - Service Creation";
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

        if (loggedIn && userType !== "E") {
            router.push("/services");
        }
    }, [loggedIn, userType, router]);

    function safeLocalStorage(key) {
        if (typeof window !== "undefined") {
            return localStorage.getItem(key);
        }

        return null;
    }

    const access_token = safeLocalStorage("access_token");

    async function createService(e) {
        // Scroll to the top of the page
        window.scrollTo({ top: 0, behavior: "smooth" });

        setServiceCreationLoading(true);
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const name = formData.get("name");
        const description = formData.get("description");
        const price = formData.get("price");
        const duration = formData.get("duration");

        setServiceCreationLoading(true);
        try {
            const response = await axios.post(
                "https://nextechcare-backend.onrender.com/services/",
                {
                    name,
                    description,
                    price,
                    duration,
                },
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                }
            );
            setServiceCreationLoading(false);
            setError("");
            setSuccess("Service created and waiting for admin approval.");
            setTimeout(() => {
                setSuccess("");
            }, 3000);
        } catch (error) {
            setServiceCreationLoading(false);
            setSuccess("");
            setError("An error occurred while creating the service.");
        }
    }

    return (
        <div className="hero min-h-screen bg-gradient-to-b from-green-50 to-white pt-20 pb-12">
            <div className="hero-content w-full flex-col">
                <div className="text-center">
                    {serviceCreationLoading && (
                        <div className="flex flex-col items-center">
                            <span className="loading loading-spinner text-primary loading-lg"></span>
                            <p className="mb-12">Please wait</p>
                        </div>
                    )}
                    {error && (
                        <div role="alert" className="alert alert-error my-6">
                            <FontAwesomeIcon icon={faTriangleExclamation} />
                            <span>{error}</span>
                        </div>
                    )}
                    {success && (
                        <div role="alert" className="alert alert-success my-6">
                            <FontAwesomeIcon icon={faCheckCircle} />
                            <span>{success}</span>
                        </div>
                    )}
                    <h1 className="text-5xl font-bold">Create A Service</h1>
                    <p className="py-6">
                        Fill in the form below to create a service.
                    </p>
                </div>
                <div className="card shrink-0 lg:w-1/2 max-sm:w-full shadow-2xl bg-base-100">
                    <form className="card-body" onSubmit={createService}>
                        <div className="form-control">
                            <label className="label" htmlFor="name">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="name"
                                className="input input-bordered input-primary"
                                required
                                aria-label="name"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label" htmlFor="description">
                                <span className="label-text">Description</span>
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                placeholder="description"
                                className="textarea textarea-bordered textarea-primary"
                                required
                                aria-label="description"
                            ></textarea>
                        </div>
                        <div className="form-control">
                            <label className="label" htmlFor="price">
                                <span className="label-text">Price</span>
                            </label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                placeholder="price"
                                className="input input-bordered input-primary"
                                required
                                aria-label="price"
                                step="0.01"
                                min="0"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label" htmlFor="duration">
                                <span className="label-text">Duration</span>
                            </label>
                            <input
                                type="number"
                                id="duration"
                                name="duration"
                                placeholder="duration"
                                className="input input-bordered input-primary"
                                required
                                aria-label="duration"
                                min="0"
                            />
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
