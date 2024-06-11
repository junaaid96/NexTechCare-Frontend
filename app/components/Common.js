"use client"

import { useState } from "react";
import ReviewPost from "./ReviewPost";
import TakeButton from "./TakeButton";
import useCheckTaken from "../hooks/CheckTaken";

export default function ServiceCommonComponent({ serviceId }) {
    const [totalCustomer, setTotalCustomer] = useState(0);
    const [isTaken, setIsTaken] = useCheckTaken(serviceId, setTotalCustomer);

    return (
        <>
            <TakeButton serviceId={serviceId} isTaken={isTaken} setIsTaken={setIsTaken} totalCustomer={totalCustomer}
                setTotalCustomer={setTotalCustomer} />
            <ReviewPost serviceId={serviceId} isTaken={isTaken} />
        </>
    );
}
