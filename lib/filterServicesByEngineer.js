// admin approved services only

export async function filterApprovedServicesByEngineer(engineer) {
    const res = await fetch(
        `https://nextechcare-backend.onrender.com/services/?admin_approved=True&engineer=${engineer}`,
        { cache: "no-store" }
    );
    const data = await res.json();
    return data;
}

// pending services only

export async function filterPendingServicesByEngineer(engineer) {
    const res = await fetch(
        `https://nextechcare-backend.onrender.com/services/?admin_approved=False&engineer=${engineer}`,
        { cache: "no-store" }
    );
    const data = await res.json();
    return data;
}
