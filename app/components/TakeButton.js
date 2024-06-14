"use client";

import { useState } from "react";
import axios from "axios";
import { useUser } from "@/app/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheckCircle,
    faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

export default function TakeButton({
    serviceId,
    isTaken,
    setIsTaken,
    totalCustomer,
}) {
    const userContext = useUser();
    const { userType } = userContext;
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    async function handleTakeService() {
        try {
            const response = await axios.post(
                `https://nextechcare-backend.onrender.com/services/taken/${serviceId}/`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "access_token"
                        )}`,
                    },
                }
            );
            console.log(response.data);
            setError("");
            setSuccess(response.data.success);
            setIsTaken(true);
            setTimeout(() => {
                setSuccess("");
            }, 3000);
        } catch (error) {
            console.error(error.response);
            setSuccess("");
            setError(error.response.data.error);
        }
    }

    return (
        <>
            {userType === "C" && (
                <div className="flex flex-col items-center bg-white rounded-lg lg:w-2/3 lg:m-auto shadow p-6">
                    <p className="font-semibold">
                        Total Customer: {totalCustomer}
                    </p>
                    {isTaken ? (
                        <button
                            className="py-2 px-4 btn btn-primary font-bold rounded-lg shadow-md mt-3 w-52"
                            disabled
                        >
                            Taken
                        </button>
                    ) : (
                        <button
                            className="py-2 px-4 btn btn-primary font-bold rounded-lg shadow-md mt-3 w-52"
                            onClick={handleTakeService}
                        >
                            Take this service
                        </button>
                    )}
                </div>
            )}
            {error && (
                <div className="toast">
                    <div className="alert alert-error">
                    <FontAwesomeIcon icon={faTriangleExclamation} />
                        <span>{error}</span>
                    </div>
                </div>
            )}
            {success && (
                <div className="toast">
                    <div className="alert alert-success">
                        <FontAwesomeIcon icon={faCheckCircle} />
                        <span>{success}</span>
                    </div>
                </div>
            )}
        </>
    );
}
