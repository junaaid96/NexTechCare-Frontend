"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "@/app/layout";
import getService from "@/lib/getService";

export default function TakeButton({ serviceId }) {
    const userContext = useUser();
    const { userType } = userContext;
    const [isTaken, setIsTaken] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        async function checkTaken() {
            try {
                const service = await getService({ id: serviceId });
                const customers = service.customer;
                const customerIDs = customers.map(
                    (customer) => customer.user.id
                );
                const user_id = localStorage.getItem("user_id");
                if (customerIDs.includes(parseInt(user_id))) {
                    setIsTaken(true);
                } else {
                    setIsTaken(false);
                }
            } catch (error) {
                console.error(error);
            }
        }
        checkTaken();
    }, [serviceId, isTaken]);

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
        } catch (error) {
            console.error(error.response);
            setSuccess("");
            setError(error.response.data.error);
        }
    }

    return (
        <>
            {userType === "C" && (
                <>
                    {isTaken ? (
                        <button
                            className="py-2 px-4 btn btn-primary font-bold rounded-lg shadow-md"
                            disabled
                        >
                            Taken
                        </button>
                    ) : (
                        <button
                            className="py-2 px-4 btn btn-primary font-bold rounded-lg shadow-md"
                            onClick={handleTakeService}
                        >
                            Take
                        </button>
                    )}
                </>
            )}
            {error && (
                <div className="toast">
                    <div className="alert alert-error">
                        <span>{error}</span>
                    </div>
                </div>
            )}
            {success && (
                <div className="toast">
                    <div className="alert alert-success">
                        <span>{success}</span>
                    </div>
                </div>
            )}
        </>
    );
}
