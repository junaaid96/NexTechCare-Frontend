import { useState, useEffect } from "react";
import getService from "@/lib/getService";

export default function useCheckTaken(serviceId, setTotalCustomer) {
    const [takenCustomer, setTakenCustomer] = useState(false);

    function safeLocalStorage(key) {
        if (typeof window !== "undefined") {
            return localStorage.getItem(key);
        }

        return null;
    }

    useEffect(() => {
        async function checkTaken() {
            try {
                const service = await getService({ id: serviceId });
                const customers = service.customer;
                if (setTotalCustomer) {
                    setTotalCustomer(customers.length);
                }
                const customerIDs = customers.map(
                    (customer) => customer.user.id
                );
                const user_id = safeLocalStorage("user_id");
                if (customerIDs.includes(parseInt(user_id))) {
                    setTakenCustomer(true);
                } else {
                    setTakenCustomer(false);
                }
            } catch (error) {
                console.error(error);
            }
        }

        checkTaken();
    }, [serviceId, setTotalCustomer, takenCustomer]);

    return [takenCustomer, setTakenCustomer];
}
