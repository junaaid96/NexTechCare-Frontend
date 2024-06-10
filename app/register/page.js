"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "@/app/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

export default function Register() {
    const router = useRouter();
    const userContext = useUser();
    const { loading, loggedIn, userType } = userContext;
    const [registerLoading, setRegisterLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        document.title = "NexTechCare - Register";
        const metaDescription = document.querySelector(
            'meta[name="description"]'
        );
        if (metaDescription) {
            metaDescription.content =
                "NexTechCare - A seamless IT support experience";
        }

        if (loggedIn && userType) {
            if (userType === "E") {
                router.push("/profiles/engineer");
            } else if (userType === "C") {
                router.push("/profiles/customer");
            } else {
                router.push("/profiles/admin");
            }
        }
    }, [loggedIn, userType, router]);

    async function handleRegister(e) {
        setRegisterLoading(true);
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const username = formData.get("username");
        const first_name = formData.get("first_name");
        const last_name = formData.get("last_name");
        const email = formData.get("email");
        const password = formData.get("password");
        const confirm_password = formData.get("confirm_password");
        const user_type = formData.get("user_type");

        try {
            const response = await axios.post(
                "https://nextechcare-backend.onrender.com/profiles/register/",
                {
                    username,
                    first_name,
                    last_name,
                    email,
                    password,
                    confirm_password,
                    user_type,
                }
            );
            console.log(response);
            setRegisterLoading(false);
            router.push("/login");
        } catch (error) {
            console.error(error);
            let errorMessage = "";
            for (let key in error.response.data) {
                errorMessage += `${key}: ${error.response.data[key][0]}\n`;
            }
            setError(errorMessage);
            setRegisterLoading(false);
        }
    }

    return (
        <div className="hero min-h-screen bg-gradient-to-b from-green-50 to-white pt-20 pb-12">
            <div className="hero-content w-full flex-col">
                <div className="text-center">
                    {registerLoading && (
                        <>
                            <span className="loading loading-spinner text-primary loading-lg"></span>
                            <p className="mb-12">Please wait</p>
                        </>
                    )}
                    {error && (
                        <div role="alert" className="alert alert-error my-6">
                            <FontAwesomeIcon icon={faTriangleExclamation} />
                            <span>{error}</span>
                        </div>
                    )}
                    <h1 className="text-5xl font-bold">Register now!</h1>
                    <p className="py-6">
                        Join us and enjoy a seamless IT support experience. Fill
                        in the form below to create your account.
                    </p>
                </div>
                <div className="card shrink-0 lg:w-1/2 max-sm:w-full shadow-2xl bg-base-100">
                    <form className="card-body" onSubmit={handleRegister}>
                        <div className="form-control">
                            <label className="label" htmlFor="username">
                                <span className="label-text">Username</span>
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Username"
                                className="input input-bordered input-primary"
                                required
                                aria-label="Username"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label" htmlFor="first_name">
                                <span className="label-text">First Name</span>
                            </label>
                            <input
                                type="text"
                                id="first_name"
                                name="first_name"
                                placeholder="First Name"
                                className="input input-bordered input-primary"
                                required
                                aria-label="First Name"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label" htmlFor="last_name">
                                <span className="label-text">Last Name</span>
                            </label>
                            <input
                                type="text"
                                id="last_name"
                                name="last_name"
                                placeholder="Last Name"
                                className="input input-bordered input-primary"
                                required
                                aria-label="Last Name"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label" htmlFor="email">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                className="input input-bordered input-primary"
                                required
                                aria-label="Email"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label" htmlFor="password">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password"
                                className="input input-bordered input-primary"
                                required
                                aria-label="Password"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label" htmlFor="confirm_password">
                                <span className="label-text">
                                    Confirm Password
                                </span>
                            </label>
                            <input
                                type="password"
                                id="confirm_password"
                                name="confirm_password"
                                placeholder="Confirm Password"
                                className="input input-bordered input-primary"
                                required
                                aria-label="Confirm Password"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label" htmlFor="user_type">
                                <span className="label-text">User Type</span>
                            </label>
                            <select
                                id="user_type"
                                name="user_type"
                                className="select select-bordered select-primary"
                                required
                                aria-label="User Type"
                            >
                                <option value="">Select User Type</option>
                                <option value="E">Engineer</option>
                                <option value="C">Customer</option>
                            </select>
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn btn-primary">
                                Register
                            </button>
                        </div>
                    </form>
                    <div className="mb-5 text-center">
                        <p>
                            Already an account? Please,{" "}
                            <Link
                                className="text-primary hover:underline"
                                href="/login"
                            >
                                login.
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
