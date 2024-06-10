"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "@/app/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

export default function Login() {
    const router = useRouter();
    const userContext = useUser();
    const { loading, loggedIn, setLoggedIn, userType, setUserType } = userContext;
    const [loginLoading, setLoginLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        document.title = "NexTechCare - Login";
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

    async function handleLogin(e) {
        setLoginLoading(true);
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const username = formData.get("username");
        const password = formData.get("password");

        try {
            const response = await axios.post(
                "https://nextechcare-backend.onrender.com/profiles/login/",
                {
                    username,
                    password,
                }
            );
            console.log(response);
            setLoginLoading(false);

            // storing token
            localStorage.setItem("access_token", response.data.access);
            localStorage.setItem("refresh_token", response.data.refresh);
            localStorage.setItem("user_id", response.data.user_id);
            localStorage.setItem("user_type", response.data.user_type);
            localStorage.setItem("login_time", new Date().getTime());

            // update userContext immediately
            setLoggedIn(true);
            setUserType(response.data.user_type);

            // window.location.reload();
        } catch (error) {
            setError(error.response.data.error);
            setLoginLoading(false);
            console.error(error);
        }
    }

    return (
        <div className="hero min-h-screen bg-gradient-to-b from-green-50 to-white mt-14">
            <div className="hero-content w-full flex-col">
                <div className="text-center">
                    {loginLoading && (
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
                    <h1 className="text-5xl font-bold mb-6">Welcome, back!</h1>
                </div>
                <div className="card shrink-0 lg:w-1/2 max-sm:w-full shadow-2xl bg-base-100">
                    <form className="card-body" onSubmit={handleLogin}>
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
                            {/* <label className="label">
                                <a
                                    href="#"
                                    className="label-text-alt link link-hover"
                                >
                                    Forgot password?
                                </a>
                            </label> */}
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    <div className="mb-5 text-center">
                        <p>
                            Don't have an account? Please,{" "}
                            <Link
                                className="text-primary hover:underline"
                                href="/register"
                            >
                                register.
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
