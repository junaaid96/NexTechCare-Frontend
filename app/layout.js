"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
// fontawesome icon
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

const UserContext = createContext();

export default function RootLayout({ children }) {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [userType, setUserType] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);

    const [otherUserData, setOtherUserData] = useState({
        phone: "",
        address: "",
        occupation: "",
        skills: "",
        experience: "",
    });

    useEffect(() => {
        document.title = "NexTechCare";
        const metaDescription = document.querySelector(
            'meta[name="description"]'
        );
        if (metaDescription) {
            metaDescription.content =
                "NexTechCare - A seamless IT support experience";
        }

        //removing token after 59mins
        const storedTime = localStorage.getItem("login_time");
        const timeLimit = 59 * 60 * 1000;

        if (storedTime) {
            const currentTime = new Date().getTime();
            const timeDifference = currentTime - parseInt(storedTime);

            if (timeDifference > timeLimit) {
                localStorage.clear();
                setLoggedIn(false);
                router.push("/login");
            }
        }

        let access_token;
        // handling localStorage when SSR
        if (typeof window !== "undefined") {
            access_token = localStorage.getItem("access_token");
            const user_type = localStorage.getItem("user_type");
            setUserType(user_type);
        }

        if (access_token) {
            setLoggedIn(true);
            axios
                .get(
                    "https://nextechcare-backend.onrender.com/profiles/profile/",
                    {
                        headers: {
                            Authorization: `Bearer ${access_token}`,
                        },
                    }
                )
                .then((response) => {
                    console.log(response.data);
                    setUser(response.data);
                    setOtherUserData({
                        phone: response.data.phone,
                        address: response.data.address,
                        occupation: response.data.occupation
                            ? response.data.occupation
                            : null,
                        skills: response.data.skills
                            ? response.data.skills
                            : null,
                        experience: response.data.experience
                            ? response.data.experience
                            : null,
                    });
                    // setUserType(response.data.user.user_type);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                    setLoading(false);
                });
        }
    }, [router, loggedIn]);

    // reload to remove token after 59 mins
    useEffect(() => {
        setTimeout(function () {
            window.location.reload(1);
        }, 3540000);
    }, [router]);

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                otherUserData,
                setOtherUserData,
                userType,
                setUserType,
                loading,
                loggedIn,
                setLoggedIn,
            }}
        >
            <html lang="en" data-theme="emerald">
                <body className={inter.className}>
                    <NavBar />
                    {children}
                    <Footer />
                </body>
            </html>
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}
