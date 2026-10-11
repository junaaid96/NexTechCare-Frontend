import { Suspense } from "react";
import Catalog from "./Catalog";

export const metadata = { title: "Services", description: "Browse technology support services by category, Trust Score, price and SLA." };

export default function Page() {
    return (
        <Suspense>
            <Catalog />
        </Suspense>
    );
}
