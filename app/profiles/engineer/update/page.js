"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "@/app/layout";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

export default function EngineerProfileUpdate() {
    const userContext = useUser();
    const router = useRouter();
    const { user, otherUserData, setOtherUserData, loading, loggedIn } =
        userContext;
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [updateLoading, setUpdateLoading] = useState(false);

    useEffect(() => {
        document.title = "NexTechCare - Engineer Profile Update";
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
    }, [loggedIn, router]);

    function safeLocalStorage(key) {
        if (typeof window !== "undefined") {
            return localStorage.getItem(key);
        }

        return null;
    }

    const access_token = safeLocalStorage("access_token");

    async function handleUpdateProfile(e) {
        e.preventDefault();
        setUpdateLoading(true);
        const form = e.target;
        const formData = new FormData(form);
        const phone = formData.get("phone");
        const address = formData.get("address");
        const skills = formData.get("skills");
        const experience = formData.get("experience");

        try {
            const response = await axios.put(
                "https://nextechcare-backend.onrender.com/profiles/profile/update/",
                {
                    phone,
                    address,
                    skills,
                    experience,
                },
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                }
            );

            if (response.status === 200) {
                setOtherUserData({
                    phone,
                    address,
                    skills,
                    experience,
                });
                setError("");
                setSuccess("Profile updated successfully");
                setTimeout(() => {
                    setSuccess("");
                }, 3000);
                setUpdateLoading(false);
            }
        } catch (error) {
            console.log(error);
            setError("An error occurred. Please try again");
            setSuccess("");
            setUpdateLoading(false);
        }
    }

    return (
        <div className="hero min-h-screen bg-gradient-to-b from-green-50 to-white pt-20 pb-12">
            <div className="hero-content w-full flex-col">
                <div className="text-center">
                    {updateLoading && (
                        <>
                            <span className="loading loading-spinner text-primary loading-lg"></span>
                            <p className="mb-12">Please wait</p>
                        </>
                    )}
                    {success && (
                        <div role="alert" className="alert alert-success my-6">
                            <FontAwesomeIcon icon={faTriangleExclamation} />
                            <span>{success}</span>
                        </div>
                    )}
                    {error && (
                        <div role="alert" className="alert alert-error my-6">
                            <FontAwesomeIcon icon={faTriangleExclamation} />
                            <span>{error}</span>
                        </div>
                    )}
                    <h1 className="text-5xl font-bold">Profile Update</h1>
                </div>
                <div className="card shrink-0 lg:w-1/2 max-sm:w-full shadow-2xl bg-base-100">
                    {user ? (
                        <form
                            className="card-body"
                            onSubmit={handleUpdateProfile}
                        >
                            <div className="form-control">
                                <label className="label" htmlFor="phone">
                                    <span className="label-text">Phone</span>
                                </label>
                                <input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    defaultValue={otherUserData.phone}
                                    placeholder="phone"
                                    className="input input-bordered input-primary"
                                    required
                                    aria-label="phone"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label" htmlFor="address">
                                    <span className="label-text">Address</span>
                                </label>
                                <textarea
                                    id="address"
                                    name="address"
                                    defaultValue={otherUserData.address}
                                    placeholder="address"
                                    className="textarea textarea-bordered textarea-primary"
                                    required
                                    aria-label="address"
                                ></textarea>
                            </div>
                            <div className="form-control">
                                <label className="label" htmlFor="skills">
                                    <span className="label-text">Skills</span>
                                </label>
                                <textarea
                                    type="text"
                                    id="skills"
                                    name="skills"
                                    defaultValue={otherUserData.skills}
                                    placeholder="skills"
                                    className="textarea textarea-bordered textarea-primary"
                                    required
                                    aria-label="skills"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label" htmlFor="experience">
                                    <span className="label-text">
                                        Experience
                                    </span>
                                </label>
                                <textarea
                                    type="text"
                                    id="experience"
                                    name="experience"
                                    defaultValue={otherUserData.experience}
                                    placeholder="experience"
                                    className="textarea textarea-bordered textarea-primary"
                                    required
                                    aria-label="experience"
                                />
                            </div>

                            <div className="form-control mt-6">
                                <button className="btn btn-primary">
                                    Update
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="flex flex-col items-center">
                            <span className="loading loading-spinner text-primary loading-lg"></span>
                            <p className="mb-12">Please wait</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
