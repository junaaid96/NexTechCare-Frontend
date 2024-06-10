"use client";

import { useUser } from "@/app/layout";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function NavBar() {
    const router = useRouter();
    const userContext = useUser();
    const { user, loading, loggedIn, setLoggedIn } = userContext;

    async function handleLogout() {
        const access_token = localStorage.getItem("access_token");
        axios
            .post(
                "https://nextechcare-backend.onrender.com/profiles/logout/",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                }
            )
            .then((res) => {
                setLoggedIn(false);
                localStorage.clear();
                router.push("/login");
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <nav className="navbar bg-primary font-semibold fixed top-0 w-full z-50 shadow">
            <div className="navbar-start">
                <details className="dropdown">
                    <summary className="btn btn-ghost lg:hidden">
                        <FontAwesomeIcon icon={faBars} size="xl" />
                    </summary>
                    <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-green-100 rounded-box w-52 lg:hidden">
                        <li>
                            <Link href={"/"}>Home</Link>
                        </li>
                        <li>
                            <Link href={"/services"}>Services</Link>
                        </li>
                        <li>
                            <Link href={"/#features"}>Features</Link>
                        </li>
                        <li>
                            <Link href={"/#plans"}>Plans</Link>
                        </li>
                        <li>
                            <Link href={"/#about"}>About</Link>
                        </li>
                        <li>
                            <Link href={"/#contact"}>Contact</Link>
                        </li>
                        {loggedIn && (
                            <>
                                <hr />
                                <li className="rounded-lg shadow">
                                    <a>Profile</a>
                                    <ul className="p-2 bg-green-50 rounded-lg shadow text-center">
                                        <li>
                                            {loading
                                                ? "Loading..."
                                                : user.user.username}
                                        </li>
                                        <button
                                            className="btn btn-sm mt-3"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </button>
                                    </ul>
                                </li>
                            </>
                        )}
                    </ul>
                </details>
                <Link href={"/"} className="btn btn-ghost text-xl font-bold">
                    NexTechCare
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <Link href={"/"}>Home</Link>
                    </li>
                    <li>
                        <Link href={"/services"}>Services</Link>
                    </li>
                    <li>
                        <Link href={"/#features"}>Features</Link>
                    </li>
                    <li>
                        <Link href={"/#plans"}>Plans</Link>
                    </li>
                    <li>
                        <Link href={"/#about"}>About</Link>
                    </li>
                    <li>
                        <Link href={"/#contact"}>Contact</Link>
                    </li>
                </ul>
            </div>
            <div className="navbar-end">
                {loggedIn ? (
                    <details className="dropdown dropdown-bottom dropdown-end hidden lg:block">
                        <summary className="m-1 btn btn-outline">
                            Profile
                        </summary>
                        <ul className="p-2 shadow menu dropdown-content z-[1] bg-green-50 rounded-box w-52 text-center">
                            <li>
                                {loading ? "Loading..." : user.user.username}
                            </li>

                            <button
                                className="btn btn-sm mt-3"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </ul>
                    </details>
                ) : (
                    <Link href={"/login"} className="btn btn-black btn-outline">
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
}
